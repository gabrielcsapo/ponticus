#!/usr/bin/env node

"use strict";

const cli = require("../dist/cli.js").default;
const info = require("../dist/info.js").default;

if (cli.args.v) {
  info.version();
  process.exit();
}

if (cli.args.h) {
  info.help();
  process.exit();
}

cli.exec(function runPlatoViaCLI() {
  console.log("Done!");
});
