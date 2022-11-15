import ASTData from "./ASTData.js";

import AstSyntax from "./AstSyntax.js";

/**
 * ASTState
 */
export default class ASTState {
  output: ASTData;
  generator = AstSyntax;

  /**
   * A string to use for indentation (defaults to `\t`)
   */
  indent: string = "\t";

  /**
   * A string to use for line endings (defaults to `\n`)
   */
  lineEnd: string = "\n";

  /**
   * Indent level to start from (default to `0`)
   */
  indentLevel: number = 0;

  /**
   * @internal
   */
  noTrailingSemicolon: boolean;

  /**
   * Creates an instance of ASTState.
   *
   * @param options - Optional parameters for source code formatting.
   */
  constructor(
    options: {
      indent?: string;
      lineEnd?: string;
      startingIndentLevel?: number;
    } = {}
  ) {
    if (typeof options !== "object") {
      throw new TypeError(`ctor error: 'options' is not an 'object'.`);
    }

    this.output = new ASTData();

    // Formatting options
    this.indent = typeof options.indent === "string" ? options.indent : "\t";

    this.lineEnd = typeof options.lineEnd === "string" ? options.lineEnd : "\n";

    this.indentLevel =
      options.startingIndentLevel &&
      Number.isInteger(options.startingIndentLevel)
        ? options.startingIndentLevel
        : 0;

    // Internal state
    this.noTrailingSemicolon = false;
  }
}
