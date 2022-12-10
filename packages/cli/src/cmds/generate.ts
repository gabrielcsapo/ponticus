import { type CommandModule } from "yargs";

const GenerateCommand: CommandModule = {
  aliases: "g",
  command: "generate",
  describe: "Generate a complexity report for the given input",
  builder: (_yargs) =>
    _yargs
      .option("title", {
        alias: "t",
        type: "string",
        description: "Lunchbox",
      })
      // default to current director
      .option("outputDir", {
        alias: "o",
        type: "string",
        default: ".",
      })
      // true if present
      .option("recursive", {
        alias: "r",
        type: "boolean",
        default: true,
      })
      .option("files", {
        alias: "f",
        type: "array",
        description: "A comma separated list of globs",
      })
      .demandOption("files"),
  handler: (/* args */) => {
    console.log("Gonna generate so much stuff!");
  },
};

export default GenerateCommand;
