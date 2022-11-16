"use strict";

// Project metadata.
import fs from "fs-extra";
import path from "path";

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pkg = fs.readJSONSync(path.resolve(__dirname, "../package.json"));

const options = {
  h: {
    long: "help",
    desc: "Display this help text.",
    type: "Boolean",
    modal: true,
  },
  q: {
    long: "quiet",
    desc: "Reduce output to errors only",
    type: "Boolean",
  },
  v: {
    long: "version",
    desc: "Print the version.",
    type: "Boolean",
    modal: true,
  },
  x: {
    long: "exclude",
    desc: "File exclusion regex",
    type: "String",
  },
  d: {
    long: "dir",
    desc: "The output directory",
    type: "String",
    required: true,
  },
  r: {
    long: "recurse",
    desc: "Recursively search directories",
    type: "Boolean",
  },
  t: {
    long: "title",
    desc: "Title of the report",
    type: "String",
  },
  D: {
    long: "date",
    desc: "Time to use as the report date (seconds, > 9999999999 assumed to be ms)",
    type: "String",
  },
  n: {
    long: "noempty",
    desc: "Skips empty lines from line count",
    type: "Boolean",
  },
  e: {
    long: "eslint",
    desc: "Specify a eslintrc file for ESLint linting",
    type: "String",
  },
};

function version() {
  console.log(pkg.version);
}

function help() {
  console.log(
    "\nUsage : %s [options] file1.js file2.js ... fileN.js",
    pkg.name
  );

  function displayOptionInCli(shortOption) {
    var option = options[shortOption];
    console.log(
      "  -%s%s%s%s",
      shortOption,
      option.long ? ", --" + option.long : "",
      option.type !== "Boolean" ? " : " + option.type : "",
      option.required ? " *required*" : ""
    );

    console.log("      %s", option.desc);
  }

  Object.keys(options).forEach(displayOptionInCli);
}

export default {
  name: pkg.name,
  version,
  help,
};
