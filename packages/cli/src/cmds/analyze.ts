import { type CommandModule } from "yargs";
import report from "./report";

const AnalyzeCommand: CommandModule = {
  command: "analyze",
  describe: "Perform a complexity analysis for the given input",
  builder: (_yargs) => {
    console.log(report);
    return (
      _yargs
        .option("exclude", {
          alias: "x",
          description: "File exclusion globs",
          type: "array",
        })
        .option("files", {
          alias: "f",
          type: "array",
          description: "A comma separated list of globs",
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
          description: "Lunchbox",
        })
        // true if present
        .option("recursive", {
          alias: "r",
          type: "boolean",
          default: true,
        })
        .demandOption("files")
        .command(report)
    );
  },
  handler: async (args) => {
    console.log("Gonna analyze so much stuff!", args);
    return Promise.resolve();
  },
};

export default AnalyzeCommand;
