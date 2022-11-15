import TransformFormat from "../../transform/TransformFormat";
import type AggregateReport from "./AggregateReport.js";

/**
 * Provides several helper methods to work with method oriented data stored as `this.aggregate` in `ClassReport` /
 * `ModuleReport` and directly in `ClassMethodReport` / `ModuleMethodReport`.
 */
export default class AbstractReport {
  /**
   * Stores any associated `AggregateReport`.
   */
  aggregate?: AggregateReport;

  /**
   * If given assigns the method report to an internal variable. This is used by `ClassReport` and `ModuleReport`
   * which stores a `AggregateReport` respectively in `this.aggregate`. This is not set when AggregateReport uses this.
   *
   * @param aggregateReport - An AggregateReport to associate with this report.
   */
  constructor(aggregateReport?: AggregateReport) {
    this.aggregate = aggregateReport;
  }

  /**
   * Returns the associated `AggregateReport` or `this`. Both ClassReport and ModuleReport have an
   * `aggregate` AggregateReport.
   *
   */
  get aggregateReport(): AggregateReport {
    return typeof this.aggregate !== "undefined"
      ? this.aggregate
      : (this as unknown as AggregateReport);
  }

  /**
   * Formats this report given the type.
   *
   * @param name - The name of formatter to use.
   * @param options - (Optional) One or more optional parameters to pass to the formatter.
   *
   */
  toFormat(name: string, options = void 0): string {
    return TransformFormat.format(this as any, name, options);
  }
}
