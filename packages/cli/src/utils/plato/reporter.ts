import fs from "fs/promises";
import path from "path";
import debug from "debug";
import fastglob from "fast-glob";

import Plato from "@ponticus/plato/plato";

const {
  writeReportModule,
  writeFileReportUI,
  writeOverallReportUI,
  updateHistoricalModule,
  updateHistoricalOverviewModule,
} = Plato;

const log = debug("ponticus:cli:plato:reporter");

/**
 * Use the existing Plato stuff to create the "report".
 *
 * This is contrived because Plato doesn't really separate the concerns, and requires some
 * assumptions re: which files the report creates (i.e. report.json and report.history.json) and where they live (files/__filename__/)
 */
export default async function generateReport(inputDir: string) {
  console.log(inputDir);
  // find all the report.json and report.history.json
  const analysisFiles = await fastglob(
    ["**/report.json", "**/report.history.json"],
    {
      cwd: inputDir,
      onlyFiles: true,
    }
  );
  log(analysisFiles);
  const reporting = Promise.allSettled(
    analysisFiles.map(async (f) => {
      const reportDir = path.join(inputDir, path.dirname(f));
      const reportSource = await fs.readFile(path.join(inputDir, f), "utf8");
      const report = JSON.parse(reportSource);
      const reportPrefix = path.join(reportDir, "report");
      if (f.includes("files")) {
        if (!f.includes("history")) {
          const source = await fs.readFile(report.info.file, "utf-8");
          writeFileReportUI(reportDir, report, source, {});
          writeReportModule(reportPrefix, report);
        } else {
          updateHistoricalModule(reportPrefix);
        }
      } else {
        if (!f.includes("history")) {
          writeOverallReportUI(report, reportDir, {});
          writeReportModule(reportPrefix, report);
          updateHistoricalOverviewModule(reportPrefix, report, {});
        }
      }
    })
  );
  log(reporting);
  return reporting;
  // write
}
