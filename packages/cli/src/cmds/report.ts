import { type CommandModule } from "yargs";
import {
  AnalyzeAndReportCommandArgs,
  ReportCommandArgs,
} from "@ponticus/types";
import RunPlatoAnalysis from "../utils/plato/analyzer";

const GenerateCommand: CommandModule = {
  command: "report",
  describe: "Report a complexity report from the raw analysis.",
  builder: (_yargs) => {
    return (
      _yargs
        .option("analysis", {
          alias: "input",
          type: "string",
          default: "./analysis.json",
          description: "The raw data from the analysis",
        })
        // default to current directory
        .option("outputDir", {
          alias: "o",
          type: "string",
          default: ".",
        })
        // the type of report: these should be pluggable, ideally specififed in a "ponticus" section of the consumer's package.json
        // for now this is hidden while we continue to use Plato
        .option("format", {
          default: "plato",
          hidden: true,
          choices: ["stdout", "plato", "xml", "html"],
        })
    );
  },
  handler: async (args: ReportCommandArgs | AnalyzeAndReportCommandArgs) => {
    console.log("Gonna report so much of a generated report!");
    if (args.analyzer === "plato") {
      return RunPlatoAnalysis(args as AnalyzeAndReportCommandArgs);
    }
  },
};

export default GenerateCommand;
