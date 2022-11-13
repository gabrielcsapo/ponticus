import { BabelParser } from "@ponticus/babel-parser";

import * as babylon from "babylon";

import * as testconfig from "./testconfig";

import escomplex from "../../src";

const s_ESM_REGEX =
  // eslint-disable-next-line no-useless-escape
  /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s* (\{|default|function|class|var|const|let|async\s+function))/;

const s_BABYLON_OPTIONS = {
  plugins: [
    "asyncFunctions",
    "asyncGenerators",
    "classConstructorCall",
    "classProperties",
    "decorators",
    "doExpressions",
    "exportExtensions",
    "exponentiationOperator",
    "flow",
    "functionBind",
    "functionSent",
    "jsx",
    "objectRestSpread",
    "trailingFunctionCommas",
  ],
};

/**
 * Provides a debug logger.
 * @param {string}   message - log message
 */
function log(message) {
  if (testconfig.parserDebug) {
    console.log(message);
  }
}

const parsers = [];

if (testconfig.parsers.babelParser) {
  parsers.push({
    analyze: function (code, options, parserOptions, parserOverrides) {
      const report = escomplex.analyze(
        this.parse(code, parserOptions, parserOverrides),
        options
      );
      log(`!! (babelParser): analyze - report: ${JSON.stringify(report)}`);
      return report;
    },
    name: "babelParser",
    parse: function (code, options, overrides) {
      const ast = BabelParser.parse(code, options, overrides);
      log(`!! (babelParser): parse - ast: ${JSON.stringify(ast)}`);
      return ast;
    },
  });
}

if (testconfig.parsers.babylon) {
  parsers.push({
    analyze: function (code, options, parserOptions) {
      const report = escomplex.analyze(
        this.parse(code, parserOptions),
        options
      );
      log(`!! (babylon): analyze - report: ${JSON.stringify(report)}`);
      return report;
    },
    name: "babylon",
    parse: function (code, options) {
      options = typeof options === "object" ? options : s_BABYLON_OPTIONS;
      options.sourceType = s_ESM_REGEX.test(code) ? "module" : "script";
      const ast = babylon.parse(code, options);
      log(`!! (babylon): parse - ast: ${JSON.stringify(ast)}`);
      return ast;
    },
  });
}

export default parsers;
