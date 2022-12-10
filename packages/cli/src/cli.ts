#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import analyze from "./cmds/analyze";
import report from "./cmds/report";

yargs(hideBin(process.argv))
  .usage("Ponticus complexity analyzer/reporter.")
  .epilogue(
    "For more information, see https://gabrielcsapo.github.io/ponticus/"
  )
  .command(analyze)
  .command(report)
  .version()
  .parseAsync()
  .then((args) => {
    console.log(args);
  });
