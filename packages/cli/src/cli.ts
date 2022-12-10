#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import generate from "./cmds/generate";

const x = yargs(hideBin(process.argv))
  .usage("Ponticus complexity analyzer/reporter.")
  .command(generate)
  .version()
  .showHelp()
  .parse();

console.log(x);
