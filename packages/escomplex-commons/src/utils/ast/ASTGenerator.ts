import ASTData from "./ASTData.js";
import ASTState from "./ASTState.js";

/**
 * `ASTGenerator` is a fork of `Astring`. The original author is David Bonnet and `Astring` is released under an MIT
 * license. This version is only available by the MPLv2.0 license. Please see the original source.
 * @see  https://github.com/davidbonnet/astring.git
 *
 * Eventually once ASTGenerator is feature complete for Babylon & ESTree AST and further modularized it will be released
 * as a separate NPM module supporting plugins.
 *
 * Please note that not all of the Babylon AST nodes are currently supported. `astParser` is currently only used by
 * `typhonjs-escomplex` for realizing computed method names and associated Halstead operands and operators.
 */
export default class ASTGenerator {
  /**
   * ASTGenerator returns an instance of ParserData containing a string representing the rendered code of the provided
   * AST `node`. In addition Halstead operators and operands are available via ParserData.
   *
   * @param node - An ESTree or Babylon AST node.
   *
   * @param options - Optional parameters for source code formatting.
   *
   */
  static parse(
    node: any,
    options: {
      // A string to use for indentation (defaults to `\t`)
      indent: string;
      // A string to use for line endings (defaults to `\n`)
      lineEnd: string;
      // Indent level to start from (default to `0`)
      startingIndentLevel: number;
    } = {
      indent: "\t",
      lineEnd: "\n",
      startingIndentLevel: 0,
    }
  ): ASTData {
    const state = new ASTState(options);

    // Travel through the AST node and generate the code.
    if (Array.isArray(node)) {
      node.forEach((entry) => {
        (state.generator as any)[entry.type](entry, state);
      });
    } else if (typeof node === "object") {
      (state.generator as any)[node.type](node, state);
    } else {
      throw new TypeError(
        `parse error: 'node' is not an 'object' or an 'array'.`
      );
    }

    return state.output;
  }

  /**
   * ASTGenerator returns an instance of ParserData containing a string representing the rendered code of the provided
   * AST `nodes`. In addition Halstead operators and operands are available via ParserData.
   *
   * @param nodes - An array of ESTree or Babylon AST nodes to parse.
   *
   * @param options - Optional parameters for source code formatting.
   *
   */
  static parseNodes(
    nodes: any[],
    options: {
      // A string to use for indentation (defaults to `\t`)
      indent: string;
      // A string to use for line endings (defaults to `\n`)
      lineEnd: string;
      // Indent level to start from (default to `0`)
      startingIndentLevel: number;
    } = {
      indent: "\t",
      lineEnd: "\n",
      startingIndentLevel: 0,
    }
  ): ASTData {
    if (!Array.isArray(nodes)) {
      throw new TypeError(`parseNodes error: 'nodes' is not an 'array'.`);
    }

    const state = new ASTState(options);

    nodes.forEach((node) => {
      // Travel through the AST node and generate the code.
      if (Array.isArray(node)) {
        node.forEach((entry) => {
          (state.generator as any)[entry.type](entry, state);
        });
      } else if (typeof node === "object") {
        (state.generator as any)[node.type](node, state);
      } else {
        throw new TypeError(
          `parse error: 'node' is not an 'object' or an 'array'.`
        );
      }
    });

    return state.output;
  }
}
