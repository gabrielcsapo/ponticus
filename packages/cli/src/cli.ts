#!/usr/bin/env node
import debug from "debug";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import analyze from "@ponticus/cli/cmds/analyze";
import report from "@ponticus/cli/cmds/report";

import { performance, PerformanceObserver } from "node:perf_hooks";

const log = debug("ponticus:cli");

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    log(entry);
  });
});
obs.observe({ entryTypes: ["measure"] });

performance.mark("ponticus:plato:start");

yargs(hideBin(process.argv))
  .usage("Ponticus complexity analyzer/reporter.")
  .epilogue(
    "For more information, see https://gabrielcsapo.github.io/ponticus/"
  )
  .command(analyze)
  .command(report)
  .strict()
  .version()
  .parseAsync()
  .then(() => {
    performance.mark("ponticus:plato:end");
    performance.measure(
      "ponticus:plato",
      "ponticus:plato:start",
      "ponticus:plato:end"
    );
    console.log("done");
  });
