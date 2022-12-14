import { type CommandModule } from "yargs";
import { AnalyzeAndReportCommandArgs } from "@ponticus/types";
import RunPlatoAnalysis from "../utils/plato/analyzer";
import CreatePlatoReport from "../utils/plato/reporter";

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
    const start = Date.now();
    console.log("Gonna report so much of a generated report!");
    if (args.analyzer === "plato") {
      console.log("Bug first, let us performan an analysis using Plato");
      await RunPlatoAnalysis(args);
    }
    if (args.format === "plato") {
      // use the outputDir from the analysis if present, otherwise use the inputDir
      console.log("Now, let us provide a plato report!");
      await CreatePlatoReport(args.outputDir ?? args.inputDir);
    } else {
      console.log("I have literally nothing to do");
    }
    console.log(Date.now() - start);
  },
};

export default GenerateCommand;
