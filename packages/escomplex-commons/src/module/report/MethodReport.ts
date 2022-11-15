import AggregateReport from "./AggregateReport.js";
import AnalyzeError from "../../analyze/AnalyzeError.js";

import ObjectUtil from "../../utils/ObjectUtil";
import ClassMethodReport from "./ClassMethodReport.js";
import ModuleMethodReport from "./ModuleMethodReport.js";
import ReportType from "../../types/ReportType.js";
import Enum from "../../utils/Enum.js";

/**
 * Provides the method report object which stores data pertaining to a single method / function.
 */
export default class MethodReport extends AggregateReport {
  /**
   * Stores any analysis errors.
   */
  errors: any[];
  /**
   * Stores the end line for the method.
   */
  lineEnd: number;
  /**
   * Stores the start line for the method.
   */
  lineStart: number;
  /**
   * The name of the method.
   */
  name: string;
  /**
   * Stores any parameter names.
   */
  paramNames: string[];

  /**
   * The number of parameters for the method.
   */
  paramCount: number;

  nestedMethods?: any[];
  /**
   * Initializes method report.
   *
   * @param name - Name of the method.
   * @param paramNames - Array of any associated parameter names.
   * @param lineStart - Start line of method.
   * @param lineEnd - End line of method.
   */
  constructor(
    name: string = "",
    paramNames: string[] = [],
    lineStart = 0,
    lineEnd = 0
  ) {
    super(lineStart, lineEnd);

    this.errors = [];
    this.lineEnd = lineEnd;
    this.lineStart = lineStart;
    this.name = name;
    this.paramNames = paramNames;
    this.paramCount = paramNames.length;
  }

  /**
   * Clears all errors stored in the method report.
   *
   * @param clearChildren - (Optional) If false then nested method errors are not cleared; default (true).
   */
  clearErrors(clearChildren: boolean = true) {
    this.errors = [];

    if (clearChildren && Array.isArray(this.nestedMethods)) {
      this.nestedMethods.forEach((report) => {
        report.clearErrors();
      });
    }
  }

  /**
   * Gets all errors stored in the method report and by default any nested methods.
   *
   * @param options - Optional parameters.
   *
   */
  getErrors(
    options: {
      query?: any;
      // If false then module errors are not included; default (true)
      includeChildren: boolean;
      // If true then results will be an array of object hashes containing `source` (the source report object of the error) and `error` (an AnalyzeError instance) keys; default (false).
      includeReports: boolean;
    } = {
      includeChildren: true,
      includeReports: false,
    }
  ): Array<AnalyzeError | { error: AnalyzeError; source: string }> {
    /* istanbul ignore if */
    if (typeof options !== "object") {
      throw new TypeError(`getErrors error: 'options' is not an 'object'.`);
    }

    // By default set includeChildren to true.
    /* istanbul ignore if */
    if (typeof options.includeChildren !== "boolean") {
      options.includeChildren = true;
    }

    // If `includeReports` is true then return an object hash with the source and error otherwise return the error.
    let errors: any[] = options.includeReports
      ? this.errors.map((entry) => {
          return { error: entry, source: this };
        })
      : [].concat(...this.errors);

    // If `includeChildren` is true then traverse all children reports for errors.
    if (options.includeChildren && Array.isArray(this.nestedMethods)) {
      // Add class to all children errors.
      if (options.includeReports) {
        const childErrors: any[] = [];

        this.nestedMethods.forEach((report) => {
          childErrors.push(...report.getErrors(options));
        });

        // Add module to object hash.
        childErrors.forEach((error) => {
          error.method = this;
        });

        // Push to all module errors.
        errors.push(...childErrors);
      } else {
        this.nestedMethods.forEach((report) => {
          errors.push(...report.getErrors(options));
        });
      }
    }

    // If `options.query` is defined then filter errors against the query object.
    if (typeof options.query === "object") {
      errors = errors.filter((error) =>
        ObjectUtil.safeEqual(options.query, error)
      );
    }

    return errors;
  }

  /**
   * Returns the name / id associated with this report.
   */
  getName() {
    return this.name;
  }

  /**
   * Deserializes a JSON object representing a ClassMethodReport.
   *
   * @param targetObject - A target object to hydrate.
   * @param jsonObject - A JSON object of a class or module method report that was previously serialized.
   *
   */
  static _parse(
    targetObject: ClassMethodReport | ModuleMethodReport,
    jsonObject: any
  ): ClassMethodReport | ModuleMethodReport {
    if (typeof jsonObject !== "object") {
      throw new TypeError(`parse error: 'jsonObject' is not an 'object'.`);
    }

    const methodReport = Object.assign(targetObject, jsonObject);

    if (methodReport.errors.length > 0) {
      methodReport.errors = methodReport.errors.map((error: any) =>
        AnalyzeError.parse(error)
      );
    }

    // TODO unimplemented yet!
    // if (methodReport.nestedMethods.length > 0)
    // {
    //    methodReport.nestedMethods = methodReport.nestedMethods.map((method) => NestedMethodReport.parse(method));
    // }

    return methodReport;
  }
}
