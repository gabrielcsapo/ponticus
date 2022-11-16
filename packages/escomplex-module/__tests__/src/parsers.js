import { BabelParser } from "@ponticus/babel-parser";

import * as testconfig from "./testconfig";

import escomplex from "../../src";

/**
 * Provides a debug logger.
 * @param message - log message
 */
function log(message) {
  if (testconfig.parserDebug) {
    console.log(message);
  }
}

const parsers = [];

parsers.push({
  analyze: function (
    code,
    options,
    parserOptions = void 0,
    parserOverrides = void 0
  ) {
    const report = escomplex.analyze(
      this.parse(code, parserOptions, parserOverrides),
      options
    );
    log(`!! (babelParser): analyze - report: ${JSON.stringify(report)}`);
    return report;
  },
  name: "babelParser",
  parse: function (code, options = void 0, overrides = void 0) {
    const ast = BabelParser.parse(code, options, overrides);
    log(`!! (babelParser): parse - ast: ${JSON.stringify(ast)}`);
    return ast;
  },
});

export default parsers;
