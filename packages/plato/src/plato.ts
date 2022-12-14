/*
 * plato
 * https://github.com/es-analysis/plato
 *
 * Copyright (c) 2012 Jarrod Overson
 * Licensed under the MIT license.
 *
 * es6-plato
 * https://github.com/es-analysis/es6-plato
 * updated from plato, by the-simian (Jesse Harlin)
 * Licensed under the MIT license.
 */

"use strict";

import path from "path";
import fs from "fs";

import _ from "lodash";
import fastglob from "fast-glob";
import debug from "debug";

import { DefaultECMAFeatures } from "./ecmafeatures";
import { DefaultESLintBase } from "./eslintbase";

// local lib
import util from "./util.js";
import OverviewHistory from "./models/OverviewHistory.js";
import FileHistory from "./models/FileHistory";

import ComplexityReporter from "./reporters/complexity/index";
import ESLintReporter from "./reporters/eslint/index";

import { type InspectOptions, type ReportFlags } from "@ponticus/types";

const reporters: {
  eslint?: any;
  complexity?: any;
} = {};

let _ESLINT_FILE: any;
let _BABEL_OPTIONS_JSON_FILE: any;

var overviewTemplate = path.resolve(
  __dirname,
  "..",
  "templates",
  "overview.html"
);
var displayTemplate = path.resolve(
  __dirname,
  "..",
  "templates",
  "display.html"
);
var fileTemplate = path.resolve(__dirname, "..", "templates", "file.html");
var assets = path.resolve(__dirname, "..", "assets");
var fileDir = "files";

const log = debug("ponticus:plato");



async function inspect(
  inputFiles: string[] | string,
  outputDir: string,
  options: InspectOptions
) {
  if (!inputFiles) {
    throw new Error("Please specify input files");
  }

  let files = (
    await Promise.all(
      (Array.isArray(inputFiles) ? inputFiles : [inputFiles]).map(
        async (pattern) => await fastglob(pattern, {
          ignore: options.exclude
        })
      )
    )
  ).flat();

  if (!files.length) {
    console.log(
      "No files were found, check your glob," +
        inputFiles +
        ". ( You may need to put it in quotes if you are on Windows )"
    );
    return;
  }

  console.log(`Processing ${files.length} files from ${inputFiles}`);

  var flags: ReportFlags = {
    complexity: {
      ecmaFeatures: DefaultECMAFeatures,
      sourceType: "module",
      ecmaVersion: 6,
      loc: true,
      newmi: true,
      range: true,
    },
    eslint: options.eslintrc ? path.resolve(options.eslintrc) : DefaultESLintBase,
  };

  if (options.eslintrc) {
    _ESLINT_FILE = require(`${process.cwd()}/${options.eslintrc}`);
    const _eslint = _ESLINT_FILE;
    if (_eslint.parserOptions) {
      delete flags.complexity.ecmaFeatures;
      flags.complexity.parserOptions = Object.assign({}, _eslint.parserOptions);
      let babelOptions;
      if (_eslint.parserOptions?.babelOptions?.configFile) {
        if (!_BABEL_OPTIONS_JSON_FILE) {
          _BABEL_OPTIONS_JSON_FILE = require(`${process.cwd()}/${path.dirname(
            options.eslintrc
          )}/${_eslint.parserOptions.babelOptions.configFile}`);
        }
        let _babelOptionsJSON = _BABEL_OPTIONS_JSON_FILE;
        babelOptions = JSON.parse(JSON.stringify(_babelOptionsJSON));
        babelOptions.plugins.push("classProperties");
        babelOptions.plugins.push("classPrivateProperties");
        babelOptions.plugins.push("@babel/plugin-proposal-class-properties");
        babelOptions.plugins.push([
          "decorators",
          { decoratorsBeforeExport: true },
        ]);
        babelOptions.plugins.push("transform-class-properties");
        babelOptions.plugins.push([
          "@babel/plugin-proposal-decorators",
          { legacy: true },
        ]);
      } else {
        babelOptions = _eslint.parserOptions?.babelOptions;
      }

      if (flags.complexity.parserOptions) {
        flags.complexity.parserOptions.babelOptions = babelOptions;
      }
    } else if (_eslint.ecmaFeatures) {
      flags.complexity.ecmaFeatures = _eslint.ecmaFeatures;
    }

    // create the eslint reporter once
    reporters.eslint = new ESLintReporter(_eslint);
  }
  reporters.complexity = new ComplexityReporter(flags.complexity);

  if (options.date) {
    // if we think we were given seconds
    if (options.date < 10000000000) {
      options.date = options.date * 1000;
    }

    (options as any).date = new Date(options.date);
  }

  var fileOutputDir = outputDir ? path.join(outputDir, fileDir) : false;

  let reports;
  if (!fileOutputDir) {
    reports = await runReports(files, options, flags, outputDir);
  } else {
    fs.mkdirSync(fileOutputDir, { recursive: true });

    reports = await runReports(files, options, flags, fileOutputDir);
    var reportFilePrefix = path.join(outputDir, "report");
    var overview = path.join(outputDir, "index.html");
    var wallDisplay = path.join(outputDir, "display.html");
    fs.cpSync(assets, path.join(outputDir, "assets"), { recursive: true });
    if (!Array.isArray(reports)) {
      throw new Error("reprts did not return array");
    }
    var overviewReport = getOverviewReport(reports);
    await updateHistoricalOverview(reportFilePrefix, overviewReport, options);
    await writeReport(reportFilePrefix, overviewReport);
    await writeOverview(
      overview,
      overviewReport,
      {
        title: options.title,
        flags: flags,
      },
      overviewTemplate
    );
    await writeOverview(
      wallDisplay,
      overviewReport,
      {
        title: options.title,
        flags: flags,
      },
      displayTemplate
    );
  }

  return reports;
}

async function runReports(
  files: string[],
  options?: any,
  flags?: any,
  fileOutputDir?: string
): Promise<void | any[]> {
  var commonBasePath = util.findCommonBase(files);
  let reports: any[] = files.map(async function reportEachFile(file) {
    log("processing", file);

    let fileState = fs.statSync(file);

    if (options.recurse && fileState.isDirectory()) {
      log("traversing directory" + " " + fileState);
      files = fs
        .readdirSync(file)
        .map((innerFile) => path.join(file, innerFile));
      return runReports(files);
    } else if (file.match(/\.(js|jsx|mjs|es6|ts|tsx)$/)) {
      log('Reading "%s"', file);

      var fileShort = file.replace(commonBasePath, "");
      var fileSafe = fileShort.replace(/[^a-zA-Z0-9]/g, "_");
      var source = fs.readFileSync(file, "utf8");

      var trimmedSource = source.trim();
      if (!trimmedSource) {
        log('Not parsing empty file "%s"', file);
        return;
      }

      if (options.recurse && fs.statSync(file).isDirectory()) {
        log("traversing directory" + " " + fileState);
        files = fs.readdirSync(file).map(function resolveFile(innerFile) {
          return path.join(file, innerFile);
        });
        await runReports(files);
      } else if (file.match(/\.(js|jsx|mjs|es6|ts|tsx)$/)) {
        log('Reading "%s"', file);

        // eslint-disable-next-line no-redeclare
        var fileShort = file.replace(commonBasePath, "");
        // eslint-disable-next-line no-redeclare
        var fileSafe = fileShort.replace(/[^a-zA-Z0-9]/g, "_");
        // eslint-disable-next-line no-redeclare
        var source = fs.readFileSync(file).toString();
        // eslint-disable-next-line no-redeclare
        var trimmedSource = source.trim();
        if (!trimmedSource) {
          log('Not parsing empty file "%s"', file);
          return;
        }

        // if skip empty line option
        if (options.noempty) {
          source = source.replace(/^\s*[\r\n]/gm, "");
        }

        // if begins with shebang
        if (source[0] === "#" && source[1] === "!") {
          source = "//" + source;
        }
        var report = {
          info: {
            file: file,
            fileShort: fileShort,
            fileSafe: fileSafe,
            link: fileDir + "/" + fileSafe + "/index.html",
          },
        };

        for await (let name of Object.keys(reporters)) {
          if (!flags[name]) {
            return;
          }
          try {
            (report as any)[name] = await (reporters as any)[name].process(
              source,
              flags[name],
              report.info
            );
          } catch (e: any) {
            log("Error reading file %s: ", file, e.toString());
            log(e.stack);
          }
        }

        if (fileOutputDir) {
          var outdir = path.join(fileOutputDir, report.info.fileSafe);
          if (!fs.existsSync(outdir)) {
            await fs.mkdirSync(outdir, { recursive: true });
          }
          await writeFileReport(outdir, report, source, options);
        }
        return report;
      }
    }
  });

  const finalReports = Promise.all(reports)
    .then((r) => r.filter((r) => !!r))
    .catch((e) => console.log(e));

  return finalReports;
}

async function updateHistoricalOverviewJSON(
  outfilePrefix: string,
  overview: any,
  options: any
) {
  var existingData =
    (await util.readJSON(outfilePrefix + ".history.json")) || {};
  var history = new OverviewHistory(existingData);
  history.addReport(overview, options.date);
  await writeReportJSON(outfilePrefix + ".history", history.toJSON());
}
async function updateHistoricalOverviewModule(
  outfilePrefix: string,
  overview: any,
  options: any
) {
  var existingData =
    (await util.readJSON(outfilePrefix + ".history.json")) || {};
  var history = new OverviewHistory(existingData);
  history.addReport(overview, options.date);
  await writeReport(outfilePrefix + ".history", history.toJSON(), "__history");
}
async function updateHistoricalOverview(
  outfilePrefix: string,
  overview: any,
  options: any
) {
  await updateHistoricalOverviewJSON(outfilePrefix, overview, options);
  await updateHistoricalOverviewModule(outfilePrefix, overview, options);
}

async function updateHistoricalJSON(
  outfilePrefix: string,
  overview: any,
  options: any) {
  var existingData =
    (await util.readJSON(outfilePrefix + ".history.json")) || {};
  var history = new FileHistory(existingData);
  overview.date = options.date;
  history.addReport(overview, options.date);
  await writeReportJSON(outfilePrefix + ".history", history.toJSON());
}
async function updateHistoricalModule(
  outfilePrefix: string,
  overview: any,
  options: any) {
  var existingData =
    (await util.readJSON(outfilePrefix + ".history.json")) || {};
  var history = new FileHistory(existingData);
  await writeReportModule(outfilePrefix + ".history", history.toJSON(), "__history");
}
async function updateHistoricalReport(
  outfilePrefix: string,
  overview: any,
  options: any
) {
  updateHistoricalJSON(outfilePrefix, overview, options);
  updateHistoricalModule(outfilePrefix, overview, options);

}

async function writeReportJSON(
  outfilePrefix: string,
  report: any,
) {
  const formatted = util.formatJSON(report);
  writeFile(outfilePrefix + ".json", formatted);
}
async function writeReportModule(
  outfilePrefix: string,
  report: any,
  exportName?: string
) {

  const formatted = util.formatJSON(report);
  exportName = exportName || "__report";
  const module = exportName + " = " + formatted;
  writeFile(outfilePrefix + ".js", module);
}
async function writeReport(
  outfilePrefix: string,
  report: any,
  exportName?: string
) {

  await writeReportJSON(outfilePrefix, report);
  await writeReportModule(outfilePrefix,
    report,
    exportName)
}

async function writeOverview(
  outfile: string,
  report: any,
  options: any,
  templatePath: string
) {
  var overviewSource = fs.readFileSync(templatePath, "utf8");

  var parsed = _.template(overviewSource)({
    report: report,
    options: options,
  });

  writeFile(outfile, parsed);
}

async function writeFileReport(
  outdir: string,
  report: any,
  source: string,
  options: any
) {
  var overviewSource = fs.readFileSync(fileTemplate, "utf8");

  var parsed = _.template(overviewSource)({
    source: util.escapeHTML(source),
    report: report,
  });
  var indexPath = path.join(outdir, "index.html");
  var outfilePrefix = path.join(outdir, "report");

  writeFile(indexPath, parsed);
  await updateHistoricalReport(outfilePrefix, report, options);
  await writeReport(outfilePrefix, report);
}

// Filters out information unused in the overview for space/performance
function getOverviewReport(reports: any[]) {
  var culledReports: any[] = [];
  var summary = {
    total: {
      eslint: 0,
      sloc: 0,
      maintainability: 0,
    },
    average: {
      sloc: 0,
      maintainability: "",
      eslint: "",
    },
  };

  reports.forEach(function (report) {
    // clone objects so we don't have to worry about side effects
    summary.total.sloc += report.complexity.aggregate.sloc.physical;
    summary.total.maintainability += report.complexity.maintainability;

    var aggregate = _.cloneDeep(report.complexity.aggregate);
    var reportItem: any = {};
    reportItem.info = report.info;
    if (report.eslint) {
      summary.total.eslint += report.eslint.messages.length;
      reportItem.eslint = {
        messages: report.eslint.messages.length,
      };
    }
    if (report.complexity) {
      reportItem.complexity = {
        aggregate: aggregate,
        module: report.complexity.module,
        module_safe: report.complexity.module_safe,
        maintainability: _.cloneDeep(report.complexity.maintainability),
      };
    }
    culledReports.push(reportItem);
  });

  summary.average.sloc = Math.round(summary.total.sloc / reports.length);
  summary.average.eslint = (summary.total.eslint / reports.length).toFixed(2);
  summary.average.maintainability = (
    summary.total.maintainability / reports.length
  ).toFixed(2);

  return {
    summary: summary,
    reports: culledReports,
  };
}

function writeFile(file: string, source: string) {
  log(`Writing file ${file} to  ${path.dirname(file)}`);
  fs.mkdirSync(path.dirname(file), { recursive: true });

  return fs.writeFileSync(file, source);
}

export default {
  getOverviewReport,
  updateHistoricalOverviewJSON,
  updateHistoricalOverviewModule,
  updateHistoricalOverview,
  updateHistoricalJSON,
  updateHistoricalModule,
  updateHistoricalReport,
  writeReport,
  writeReportJSON,
  writeReportModule,
  writeFile,
  writeOverview,
  inspect,
};
