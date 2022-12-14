import { type CommandModule } from "yargs";
import { AnalyzeAndReportCommandArgs } from "@ponticus/types";
import RunPlatoAnalysis from "../utils/plato/analyzer";
import CreatePlatoReport from "../utils/plato/reporter";

import { performance } from "node:perf_hooks";

const GenerateCommand: CommandModule = {
  command: "report",
  describe: "Report a complexity report from the raw analysis.",
  builder: (_yargs) => {
    return (
      _yargs
        // the type of report: these should be pluggable, ideally specififed in a "ponticus" section of the consumer's package.json
        // for now this is hidden while we continue to use Plato
        .option("format", {
          choices: ["stdout", "plato", "xml", "html"],
          default: "plato",
          hidden: true,
          type: "string",
        })
        .option("inputDir", {
          default: ".",
          type: "string",
        })
    );
  },
  handler: async (args: AnalyzeAndReportCommandArgs) => {
    console.log("Gonna report so much of a generated report!");
    if (args.analyzer === "plato") {
      console.log("Bug first, let us perform an analysis using Plato");
      performance.mark("ponticus:plato:analysis:start");
      await RunPlatoAnalysis(args);
      performance.mark("ponticus:plato:analysis:stop");
    }
    if (args.format === "plato") {
      // use the outputDir from the analysis if present, otherwise use the inputDir
      console.log("Now, let us provide a plato report!");
      performance.mark("ponticus:plato:report:start");
      await CreatePlatoReport(args.outputDir ?? args.inputDir);
      performance.mark("ponticus:plato:report:stop");
      performance.measure(
        "ponticus:plato:analysis",
        "ponticus:plato:analysis:start",
        "ponticus:plato:analysis:stop"
      );
      performance.measure(
        "ponticus:plato:report",
        "ponticus:plato:report:start",
        "ponticus:plato:report:stop"
      );
    } else {
      console.log("I have literally nothing to do");
    }
  },
};

export default GenerateCommand;
