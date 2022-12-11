#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import analyze from "@ponticus/cli/cmds/analyze";
import report from "@ponticus/cli/cmds/report";

yargs(hideBin(process.argv))
  .usage("Ponticus complexity analyzer/reporter.")
  .epilogue(
    "For more information, see https://gabrielcsapo.github.io/ponticus/"
  )
  .command(analyze)
  .command(report)
  .strictCommands()
  .strictOptions()
  .version()
  .parseAsync()
  .then((args) => {
    console.log(args);
  });
