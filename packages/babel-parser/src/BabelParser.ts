import { type ParserOptions, parse as babelParse } from "@babel/parser";
import { type PluginEvent } from "@ponticus/plugin-manager";

/**
 * Default babel parser options applying most available plugins.
 *
 * Caveats include:
 * - that both decorators and decorators-legacy can not be used simultaneously.
 * - that both 'flow' and 'typescript' can not be used simultaneously
 *
 */
const s_DEFAULT_BABELPARSER_OPTIONS: ParserOptions = {
  plugins: [
    "asyncGenerators",
    "bigInt",
    "classProperties",
    "classPrivateProperties",
    "classPrivateMethods",
    ["decorators", { decoratorsBeforeExport: false }],
    "doExpressions",
    "dynamicImport",
    "exportDefaultFrom",
    "exportNamespaceFrom",
    "functionBind",
    "functionSent",
    "importMeta",
    "jsx",
    "logicalAssignment",
    "nullishCoalescingOperator",
    "numericSeparator",
    "objectRestSpread",
    "optionalCatchBinding",
    "optionalChaining",
    ["pipelineOperator", { proposal: "minimal" }],
    "throwExpressions",
    "typescript",
  ],
};

/**
 * Provides a convenience wrapper around Babel parser.
 */
export default class BabelParser {
  /**
   * Parses the given source with Babel parser.
   *
   * @param source - Javascript source code to parse.
   * @param options - Overrides default babel parser options.
   * @param override - Provides helper directives to override options to simplify modification of default Babel parser options.
   *
   */
  static parse(source: string, options?: ParserOptions, override?: any) {
    // Make a copy of the default options.
    const defaultOptions = JSON.parse(
      JSON.stringify(s_DEFAULT_BABELPARSER_OPTIONS)
    );

    if (typeof override === "object") {
      // If decoratorsBeforeExport is defined as an override then set that value.
      if (typeof override.decoratorsBeforeExport === "boolean") {
        defaultOptions.plugins[5][1].decoratorsBeforeExport =
          override.decoratorsBeforeExport;
      }

      // If decoratorsLegacy is enabled as an override then the actual implementation is swapped for
      // decorators-legacy.
      if (
        typeof override.decoratorsLegacy === "boolean" &&
        override.decoratorsLegacy
      ) {
        defaultOptions.plugins[5] = "decorators-legacy";
      }

      // If pipelineOperatorProposal is defined as an override then set that value.
      if (typeof override.pipelineOperatorProposal === "string") {
        defaultOptions.plugins[20][1].proposal =
          override.pipelineOperatorProposal;
      }

      // If flow is enabled as an override 'typescript' must be removed and 'flow' added.
      if (typeof override.flow === "boolean" && override.flow) {
        const index = defaultOptions.plugins.indexOf("typescript");
        if (index > -1) {
          defaultOptions.plugins.splice(index, 1);
        }

        defaultOptions.plugins.push("flow");
      }
    }

    let compiledOptions =
      typeof options === "object" ? options : defaultOptions;

    compiledOptions.sourceType =
      typeof compiledOptions.sourceType === "string"
        ? compiledOptions.sourceType
        : "unambiguous";

    return babelParse(source, compiledOptions);
  }
}

/**
 * Wires up BabelParser on the plugin eventbus. The following event bindings are available:
 *
 * `typhonjs:babel:parser:file:parse`: Invokes `parseFile`.
 * `typhonjs:babel:parser:source:parse`: Invokes `parseSource`.
 *
 * @param  ev - The plugin event.
 */
export function onPluginLoad(ev: PluginEvent) {
  ev.eventbus?.on("typhonjs:babel:parser:parse", BabelParser.parse);
}
