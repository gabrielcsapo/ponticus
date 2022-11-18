import MethodReport from "./MethodReport.js";

import ReportType from "../../types/ReportType.js";
import TransformFormat from "../../transform/TransformFormat.js";

import type NestedMethodReport from "./NestedMethodReport.js";

/**
 * Provides the class method report object which stores data pertaining to a single method / function.
 */
export default class ClassMethodReport extends MethodReport {
  /**
   * Stores the max nested method depth.
   */
  maxNestedMethodDepth: number = 0;
  
  /**
   * Initializes class module method report.
   *
   * @param name - Name of the method.
   * @param paramNames - Array of any associated parameter names.
   * @param lineStart - Start line of method.
   * @param lineEnd - End line of method.
   */
  constructor(
    name?: string,
    paramNames?: string[],
    lineStart?: number,
    lineEnd?: number
  ) {
    super(name, paramNames, lineStart, lineEnd);

    this.nestedMethods = [];
  }

  /**
   * Returns the enum for the report type.
   */
  get type() {
    return ReportType.CLASS_METHOD;
  }

  /**
   * Returns the supported transform formats.
   *
   */
  static getFormats(): any[] {
    return TransformFormat.getFormats(ReportType.CLASS_METHOD);
  }

  /**
   * Deserializes a JSON object representing a ClassMethodReport.
   *
   * @param object - A JSON object of a ClassMethodReport that was previously serialized.
   *
   */
  static parse(object: any): ClassMethodReport {
    return this._parse(new ClassMethodReport(), object);
  }
}
