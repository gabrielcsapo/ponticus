#!/usr/bin/env node

"use strict";
import { Command } from "commander";

import fs from "fs";
import path from "path";

import plato from "../plato.js";

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "..", "..", "package.json"), "utf8")
);

function commaSeparatedList(value: string) {
  // ensure we trim the whitespace on the string
  return value.split(",").map((option) => option.trim());
}

const program = new Command();

program.version(pkg.version);
program.helpOption("-h, --help", "read more information");
program.option("-t, --title <title>", "Title of the report");
program.option("-q, --quiet", "Reduce output to errors only");
program.option(
  "-x, --exclude <list>",
  "File exclusion globs",
  commaSeparatedList
);
program.option("-o, --outputDir <directory>", "The output directory");
program.option("-r, --recurse", "Recursively search directories");
program.option(
  "-d, --date",
  "Time to use as the report date (seconds, > 9999999999 assumed to be ms)"
);
program.option("-n, --noempty", "Skips empty lines from line count");
program.option(
  "-f, --files <list>",
  "Files to process globs",
  commaSeparatedList
);

program.option("-e, --eslint", "Specify a eslintrc file for ESLint linting");

program.parse(process.argv);

const options = program.opts();
const start = Date.now();
plato
  .inspect(options.files, options.outputDir, {
    recurse: !!options.recurse,
    q: !!options.quiet,
    title: options.title,
    exclude: options.exclude,
    date: options.date,
    eslintrc: options.eslint,
  })
  .then(() => {
    console.log("done!");
    console.log(Date.now() - start);
  })
  .catch((ex) => {
    console.log(ex);
  });
