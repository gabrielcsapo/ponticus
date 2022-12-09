#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).options({
  a: { type: "boolean", default: false },
  b: { type: "string", demandOption: true },
  c: { type: "number", alias: "chill" },
  d: { type: "array" },
  e: { type: "count" },
  f: { choices: ["1", "2", "3"] },
}).argv;

console.log(argv);
