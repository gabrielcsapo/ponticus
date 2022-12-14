import { type AnalyzeCommandArgs, type ReportFlags } from "@ponticus/types";

import util from "@ponticus/plato/util";
import { DefaultECMAFeatures } from "@ponticus/plato/ecmafeatures";
import { DefaultESLintBase } from "@ponticus/plato/eslintbase";
import ComplexityReporter from "@ponticus/plato/reporters/complexity/index";
import Plato from "@ponticus/plato/plato";

import debug from "debug";
import fastglob from "fast-glob";
import fs from "fs";
import path from "path";

const {
  writeReport: writeAnalysis,
  updateHistoricalReport: updateHistoricalAnalysis,
  getOverviewReport: getOverviewAnalysis,
  updateHistoricalOverview: updateHistoricalOverviewAnalysis,
} = Plato;

const log = debug("ponticus:cli:plato:analyzer");

export default async function runAnalysis(commandArgs: AnalyzeCommandArgs) {
  const { files, exclude, outputDir } = commandArgs;

  const filesToAnalyze = (
    await Promise.all(
      [files].map(
        async (pattern) =>
          await fastglob(pattern, {
            onlyFiles: true,
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
  const flags: ReportFlags = {
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

  const reports = await runReports(
    filesToAnalyze,
    commandArgs,
    flags,
    outputDir
  );

  if (reports) {
    const reportFilePrefix = path.join(outputDir, "report");
    const overviewReport = getOverviewAnalysis(reports);
    await writeAnalysis(reportFilePrefix, overviewReport);
    await updateHistoricalOverviewAnalysis(
      reportFilePrefix,
      overviewReport,
      commandArgs
    );
  }
}

async function runReports(
  files: string[],
  options: AnalyzeCommandArgs,
  flags: ReportFlags,
  fileOutputDir?: string
): Promise<void | any[]> {
  // src files are copied here for reference in the report
  const fileDir = "files";
  const commonBasePath = util.findCommonBase(files);
  let reports: any[] = files.map(async function reportEachFile(file) {
    log("processing", file);

    if (file.match(/\.(js|jsx|mjs|es6|ts|tsx)$/)) {
      log('Reading "%s"', file);

      let fileShort = file.replace(commonBasePath, "");
      let fileSafe = file.replace(/[^a-zA-Z0-9]/g, "_");
      let source = fs.readFileSync(file, "utf8");

      let trimmedSource = source.trim();
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

      // there's really only 1 reporter that's done in Plato unless the eslintrc is specified
      const reporters = {
        complexity: new ComplexityReporter(flags.complexity),
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
  });

  const finalReports = Promise.all(reports)
    .then((r) => r.filter((r) => !!r))
    .catch((e) => console.log(e));

  return finalReports;
}

async function writeFileAnalysis(outdir: string, report: any, options: any) {
  const outfilePrefix = path.join(outdir, "report");
  await updateHistoricalAnalysis(outfilePrefix, report, options);
  await writeAnalysis(outfilePrefix, report);
}
