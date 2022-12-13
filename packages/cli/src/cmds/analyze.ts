import { type CommandModule } from "yargs";
import { type AnalyzeCommandArgs } from "@ponticus/types";
import RunPlatoAnalysis from "@ponticus/cli/utils/plato/run-analysis";
import report from "@ponticus/cli/cmds/report";

const AnalyzeCommand: CommandModule = {
  command: "analyze",
  describe: "Perform a complexity analysis for the given input",
  builder: (_yargs) => {
    return (
      _yargs
        .usage("Analyze the source code and run the report.")
        .option("exclude", {
          alias: "x",
          description: "File exclusion globs",
          type: "array",
        })
        .option("files", {
          alias: "f",
          type: "array",
          description: "A comma separated list of globs",
          demandOption: true,
        })
        .option("noEmpty", {
          type: "boolean",
          default: false,
        })
        // default to current directory
        .option("outputDir", {
          alias: "o",
          type: "string",
          default: ".",
        })
        .option("title", {
          alias: "t",
          type: "string",
          description: "The title of the report",
        })
        // true if present
        .option("recursive", {
          alias: "r",
          type: "boolean",
          default: true,
        })
        // the report subcommand
        // NOTE: Run by default until plato functionality can be separated
        .command("$0", "report", report)
    );
  },
  handler: async (args: AnalyzeCommandArgs) => {
    console.log("Gonna analyze so much stuff!");
    return RunPlatoAnalysis(args);
  },
};

export default AnalyzeCommand;
