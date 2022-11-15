import MethodReport from "./MethodReport.js";

import ReportType from "../../types/ReportType.js";
import TransformFormat from "../../transform/TransformFormat.js";
import ModuleMethodReport from "./ModuleMethodReport.js";

/**
 * Provides the module method report object which stores data pertaining to a single method / function.
 */
export default class NestedMethodReport extends MethodReport {
  /**
   * Stores the nested depth.
   */
  nestedDepth: number;

  /**
   * Initializes nested method report.
   *
   * @param name - Name of the method.
   * @param paramNames - Array of any associated parameter names.
   * @param lineStart - Start line of method.
   * @param lineEnd - End line of method.
   * @param nestedDepth - Depth of nested methods
   */
  constructor(
    name?: string,
    paramNames?: string[],
    lineStart?: number,
    lineEnd?: number,
    nestedDepth?: number
  ) {
    super(name, paramNames, lineStart, lineEnd);

    this.nestedDepth = nestedDepth || 0;
  }

  /**
   * Returns the enum for the report type.
   */
  get type(): ReportType {
    return ReportType.NESTED_METHOD;
  }

  /**
   * Returns the supported transform formats.
   */
  static getFormats() {
    return TransformFormat.getFormats(ReportType.NESTED_METHOD);
  }

  /**
   * Deserializes a JSON object representing a ModuleMethodReport.
   *
   * @param object - A JSON object of a ModuleMethodReport that was previously serialized.
   *
   */
  static parse(object: any): ModuleMethodReport {
    return this._parse(new ModuleMethodReport(), object) as any;
  }
}
