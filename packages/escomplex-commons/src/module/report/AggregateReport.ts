import AbstractReport from "./AbstractReport.js";
import HalsteadData from "./HalsteadData.js";

type SLOC = { logical: number; physical: number };

/**
 * Provides the aggregate report object which stores base data pertaining to a single method / function or cumulative
 * aggregate data for a ModuleReport / ClassReport.
 */
export default class AggregateReport extends AbstractReport {
  /**
   * The cyclomatic complexity of the method / report.
   */
  cyclomatic: number;
  /**
   * The cyclomatic density of the method.
   */
  cyclomaticDensity: number;
  /**
   * Stores the Halstead data instance.
   */
  halstead: HalsteadData;
  /**
   * The number of parameters for the method or aggregate report.
   */
  paramCount: number;
  /**
   * The source lines of code for the method.
   */

  sloc: SLOC;
  /**
   * Initializes aggregate report.
   *
   * @param lineStart - Start line of method.
   * @param lineEnd - End line of method.
   * @param baseCyclomatic - The initial base cyclomatic complexity of the report. Module and class reports
   *                                    start at 0.
   */
  constructor(
    lineStart: number = 0,
    lineEnd: number = 0,
    baseCyclomatic: number = 1
  ) {
    super();

    this.cyclomatic = baseCyclomatic;
    this.cyclomaticDensity = 0;
    this.halstead = new HalsteadData();
    this.paramCount = 0;
    this.sloc = { logical: 0, physical: lineEnd - lineStart + 1 };
  }
}
