/**
 * Defines the output data from parsing an AST tree.
 */
export default class ASTData {
  source: string;
  operands: any[];
  operators: any[];

  /**
   * Initializes ASTData
   */
  constructor() {
    this.source = "";
    this.operands = [];
    this.operators = [];
  }

  /**
   * Appends a string.
   *
   * @param string - A string to append.
   */
  write(string: string) {
    this.source += string;
  }

  /**
   * Convert to string
   */
  toString(): string {
    return this.source;
  }
}
