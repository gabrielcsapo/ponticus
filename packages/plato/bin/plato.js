#!/usr/bin/env node

"use strict";

import cli from "../lib/cli.js";
import info from "../lib/info.js";

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
