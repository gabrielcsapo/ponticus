import MethodReport from "./MethodReport.js";

import ReportType from "../../types/ReportType.js";
import TransformFormat from "../../transform/TransformFormat.js";

import type NestedMethodReport from "./NestedMethodReport.js";
import type Enum from "../../utils/Enum.js";

/**
 * Provides the module method report object which stores data pertaining to a single method / function.
 */
export default class ModuleMethodReport extends MethodReport {
  /**
   * Stores the max nested method depth.
   */
  maxNestedMethodDepth: number;

  /**
   * Initializes module method report.
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

    this.maxNestedMethodDepth = 0;
    this.nestedMethods = [];
  }

  /**
   * Returns the enum for the report type.
   */
  get type(): Enum {
    return ReportType.MODULE_METHOD;
  }

  /**
   * Returns the supported transform formats.
   *
   */
  static getFormats() {
    return TransformFormat.getFormats(ReportType.MODULE_METHOD);
  }

  /**
   * Deserializes a JSON object representing a ModuleMethodReport.
   *
   * @param  object - A JSON object of a ModuleMethodReport that was previously serialized.
   *
   */
  static parse(object: any): ModuleMethodReport {
    return this._parse(new ModuleMethodReport(), object) as any;
  }
}
