import { type CommandModule } from "yargs";

const GenerateCommand: CommandModule = {
  command: "report",
  describe: "Report a complexity report from the raw analysis.",
  builder: (_yargs) => {
    console.log("reporter");
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
        .option("format", {
          type: "boolean",
          default: "stdout",
          choices: ["stdout", "xml", "html"],
        })
    );
  },
  handler: async (args) => {
    console.log("Gonna report so much of a generated report!", args);
    return Promise.resolve();
  },
};

export default GenerateCommand;
