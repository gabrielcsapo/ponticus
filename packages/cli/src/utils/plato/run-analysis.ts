import { type AnalyzeCommandArgs, type ReportFlags } from "@ponticus/types";

import util from "@ponticus/plato/util";
import FileHistory from "@ponticus/plato/models/FileHistory";
import { DefaultECMAFeatures } from "@ponticus/plato/ecmafeatures";
import { DefaultESLintBase } from "@ponticus/plato/eslintbase";
import ComplexityReporter from "@ponticus/plato/reporters/complexity/index";

import debug from "debug";
import fastglob from "fast-glob";
import fs from "fs";
import path from "path";

// src files are copied here for reference in the report
const fileDir = "files";
const log = debug("ponticus:cli:plato");
const reporters: {
  eslint?: any;
  complexity?: any;
} = {};

export default async function runAnalysis(commandArgs: AnalyzeCommandArgs) {
  const { files, exclude, outputDir } = commandArgs;

  let filesToAnalyze = (
    await Promise.all(
      [files].map(
        async (pattern) =>
          await fastglob(pattern, {
            ignore: exclude,
          })
      )
    )
  ).flat();

  if (!filesToAnalyze.length) {
    console.log(
      "No files were found, check your glob," +
        files +
        ". ( You may need to put it in quotes if you are on Windows )"
    );
    return;
  }

  console.log(`Processing ${filesToAnalyze.length} files from ${files}`);
  var flags: ReportFlags = {
    complexity: {
      ecmaFeatures: DefaultECMAFeatures,
      sourceType: "module",
      ecmaVersion: 6,
      loc: true,
      newmi: true,
      range: true,
    },
    eslint: DefaultESLintBase,
  };
  reporters.complexity = new ComplexityReporter(flags.complexity);

  await runReports(filesToAnalyze, commandArgs, flags, outputDir);
}

async function runReports(
  files: string[],
  options?: any,
  flags?: any,
  fileOutputDir?: string
): Promise<void | any[]> {
  const commonBasePath = util.findCommonBase(files);
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

      let fileShort = file.replace(commonBasePath, "");
      let fileSafe = file.replace(/[^a-zA-Z0-9]/g, "_");
      let source = fs.readFileSync(file, "utf8");

      let trimmedSource = source.trim();
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

        fileShort = file.replace(commonBasePath, "");
        fileSafe = file.replace(/[^a-zA-Z0-9]/g, "_");
        source = fs.readFileSync(file).toString();
        trimmedSource = source.trim();
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
          await writeFileAnalysis(outdir, report, options);
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

async function updateHistoricalAnalysis(
  outfilePrefix: string,
  overview: any,
  options: any
) {
  var existingData =
    (await util.readJSON(outfilePrefix + ".history.json")) || {};
  var history = new FileHistory(existingData);
  overview.date = options.date;
  history.addReport(overview, options.date);
  await writeAnalysisFiles(
    outfilePrefix + ".history",
    history.toJSON(),
    "__history"
  );
}

async function writeFileAnalysis(outdir: string, report: any, options: any) {
  const outfilePrefix = path.join(outdir, "report");

  console.log(report);

  await updateHistoricalAnalysis(outfilePrefix, report, options);
  await writeAnalysisFiles(outfilePrefix, report);
}

async function writeAnalysisFiles(
  outfilePrefix: string,
  report: any,
  exportName?: string
) {
  const formatted = util.formatJSON(report);

  writeFile(outfilePrefix + ".json", formatted);

  // used for the Plato report
  exportName = exportName || "__report";
  const module = exportName + " = " + formatted;

  writeFile(outfilePrefix + ".js", module);
}

function writeFile(file: string, source: string) {
  log(`Writing file ${file} to  ${path.dirname(file)}`);
  fs.mkdirSync(path.dirname(file), { recursive: true });

  return fs.writeFileSync(file, source);
}
