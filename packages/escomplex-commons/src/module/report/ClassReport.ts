import AbstractReport from "./AbstractReport.js";
import AggregateReport from "./AggregateReport.js";
import ClassMethodReport from "./ClassMethodReport.js";
import MethodAverage from "./averages/MethodAverage.js";

import AnalyzeError from "../../analyze/AnalyzeError.js";
import ReportType from "../../types/ReportType.js";
import ObjectUtil from "../../utils/ObjectUtil.js";
import TransformFormat from "../../transform/TransformFormat.js";
import type Enum from "../../utils/Enum.js";

/**
 * Provides the class report object which stores data pertaining to a single ES6 class.
 *
 * Methods that are stored as ClassMethodReport instances in the `methods` member variable.
 */
export default class ClassReport extends AbstractReport {
  /**
   * Stores any analysis errors.
   */
  errors: any[];
  /**
   * Stores the end line for the class.
   */
  lineEnd: number;
  /**
   * Stores the start line for the class.
   */
  lineStart: number;
  /**
   * Stores all method data.
   */
  methods: ClassMethodReport[];
  /**
   * Stores the average class aggregate & method metric data.
   */
  aggregateAverage: MethodAverage;
  /**
   * Stores the average method metric data.
   */
  methodAverage: MethodAverage;
  /**
   * The name of the class.
   */
  name: string | undefined;
  /**
   * The name of any associated super class.
   */
  superClassName: string | undefined;
  /**
   * Returns the enum for the report type.
   */
  get type(): Enum {
    return ReportType.CLASS;
  }

  /**
   * Initializes class report.
   *
   * @param name - Name of the class.
   * @param superClassName - Name of any associated super class.
   * @param lineStart - Start line of class.
   * @param lineEnd - End line of class.
   */
  constructor(
    name?: string,
    superClassName?: string,
    lineStart = 0,
    lineEnd = 0
  ) {
    super(new AggregateReport(lineStart, lineEnd, 0));

    this.errors = [];
    this.lineEnd = lineEnd;
    this.lineStart = lineStart;
    this.methods = [];
    this.aggregateAverage = new MethodAverage();
    this.methodAverage = new MethodAverage();
    this.name = name;
    this.superClassName = superClassName;
  }

  /**
   * Clears all errors stored in the class report and by default any class methods.
   *
   * @param clearChildren - (Optional) If false then class method errors are not cleared; default (true).
   */
  clearErrors(clearChildren: boolean = true) {
    this.errors = [];

    if (clearChildren) {
      this.methods.forEach((report) => {
        report.clearErrors();
      });
    }
  }

  /**
   * Gets all errors stored in the class report and by default any class methods.
   *
   * @param options - Optional parameters.
   *
   */
  getErrors(
    options: {
      // filter errors against the query object.
      query?: any;
      // If false then module errors are not included; default (true)
      includeChildren: boolean;
      // If true then results will be an array of object hashes containing `source` (the source report object of the error) and `error` (an AnalyzeError instance) keys; default (false).
      includeReports: boolean;
    } = { includeChildren: true, includeReports: false }
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
    if (options.includeChildren) {
      // Add class to all children errors.
      if (options.includeReports) {
        const childErrors: any[] = [];

        this.methods.forEach((report) => {
          childErrors.push(...report.getErrors(options));
        });

        // Add module to object hash.
        childErrors.forEach((error) => {
          error.class = this;
        });

        // Push to all module errors.
        errors.push(...childErrors);
      } else {
        this.methods.forEach((report) => {
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
   * Returns the supported transform formats.
   *
   */
  static getFormats() {
    return TransformFormat.getFormats(ReportType.CLASS);
  }

  /**
   * Returns the name / id associated with this report.
   */
  getName() {
    return this.name;
  }

  /**
   * Deserializes a JSON object representing a ClassReport.
   *
   * @param object - A JSON object of a ClassReport that was previously serialized.
   *
   */
  static parse(object: any): ClassReport {
    /* istanbul ignore if */
    if (typeof object !== "object") {
      throw new TypeError(`parse error: 'object' is not an 'object'.`);
    }

    const classReport = Object.assign(new ClassReport(), object);

    if (classReport.errors.length > 0) {
      classReport.errors = classReport.errors.map((error: any) =>
        AnalyzeError.parse(error)
      );
    }

    if (classReport.methods.length > 0) {
      classReport.methods = classReport.methods.map((methodReport: any) =>
        ClassMethodReport.parse(methodReport)
      );
    }

    return classReport;
  }
}
