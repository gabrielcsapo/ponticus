/**
 * Provides all the averaged Halstead metric data.
 * @see https://en.wikipedia.org/wiki/Halstead_complexity_measures
 */
export default class HalsteadAverage {
  /**
   * Measures an estimate for the number of potential errors.
   */
  bugs: number;
  /**
   * Measures the difficulty of the program to write or understand.
   */
  difficulty: number;
  /**
   * Measures the maintenance effort of the program.
   */
  effort: number;
  /**
   * Defines the number of operands and operators.
   */
  length: number;
  /**
   * Measures potential coding time.
   */
  time: number;
  /**
   * Defines the unique number of operands and operators.
   */
  vocabulary: number;
  /**
   * Measures how much information a reader of the code potential has to absorb to understand its meaning.
   */
  volume: number;
  /**
   * In general an operand participates in actions associated with operators. A distinct and total count of
   * identifiers.
   */
  operands: { distinct: number; total: number };
  /**
   * In general an operator carries out an action. A distinct and total count of identifiers.
   */
  operators: { distinct: number; total: number };
  /**
   * Initializes the default Halstead data.
   */
  constructor() {
    this.bugs = 0;
    this.difficulty = 0;
    this.effort = 0;
    this.length = 0;
    this.time = 0;
    this.vocabulary = 0;
    this.volume = 0;
    this.operands = { distinct: 0, total: 0 };
    this.operators = { distinct: 0, total: 0 };
  }
}
