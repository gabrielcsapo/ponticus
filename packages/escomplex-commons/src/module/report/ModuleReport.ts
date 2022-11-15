import AbstractReport from "./AbstractReport.js";
import AggregateReport from "./AggregateReport.js";
import ClassReport from "./ClassReport.js";
import MethodAverage from "./averages/MethodAverage.js";
import ModuleMethodReport from "./ModuleMethodReport.js";

import AnalyzeError from "../../analyze/AnalyzeError.js";
import MathUtil from "../../utils/MathUtil.js";
import ObjectUtil from "../../utils/ObjectUtil.js";
import ReportType from "../../types/ReportType.js";
import TransformFormat from "../../transform/TransformFormat.js";

import type Enum from "../../utils/Enum.js";

/**
 * Provides the module report object which stores data pertaining to a single file / module being processed.
 *
 * All ES Module classes are stored in the `classes` member variable as ClassReports. Methods that are not part of a
 * class are stored as ModuleMethodReport instances in the `methods` member variable.
 *
 * Various helper methods found in ModuleReport and AbstractReport help increment associated data during collection.
 */
export default class ModuleReport extends AbstractReport {
  /**
   * Stores the settings used to generate the module report.
   */
  settings: any;
  /**
   * Stores all ClassReport data for the module.
   */
  classes: ClassReport[];
  /**
   * Stores all parsed dependencies.
   */
  dependencies: never[];
  /**
   * Stores any analysis errors.
   */
  errors: never[];
  /**
   * Stores the file path of the module / file. The file path is only defined as supplied when processing projects.
   */
  filePath: string | undefined;
  /**
   * Stores the end line for the module / file.
   */
  lineEnd: number;
  /**
   * Stores the start line for the module / file.
   */
  lineStart: number;
  /**
   * Measures the average maintainability index for the module / file.
   */
  maintainability: number;
  /**
   * Stores all module ModuleMethodReport data found outside of any ES6 classes.
   */
  methods: ModuleMethodReport[];
  /**
   * Stores the average module / class aggregate & method metric data.
   */
  aggregateAverage: MethodAverage;
  /**
   * Stores just the average method metric data.
   */
  methodAverage: MethodAverage;
  /**
   * Stores the active source path of the module / file. This path is respective of how the file is referenced in
   * the source code itself. `srcPath` is only defined as supplied when processing projects.
   */
  srcPath: string | undefined;
  /**
   * Stores the active source path alias of the module / file. This path is respective of how the file is
   * referenced in the source code itself when aliased including NPM and JSPM modules which provide a `main` entry.
   * `srcPathAlias` is only defined as supplied when processing projects.
   */
  srcPathAlias: string | undefined;

  /**
   * Returns the enum for the report type.
   */
  get type(): Enum {
    return ReportType.MODULE;
  }

  /**
   * Initializes the report.
   *
   * @param lineStart - Start line of file / module.
   * @param lineEnd - End line of file / module.
   * @param settings - An object hash of the settings used in generating this report via ESComplexModule.
   */
  constructor(lineStart = 0, lineEnd = 0, settings?: any) {
    super(new AggregateReport(lineStart, lineEnd));

    this.settings =
      typeof settings === "object" ? Object.assign({}, settings) : {};

    this.classes = [];
    this.dependencies = [];
    this.errors = [];
    this.filePath = void 0;
    this.lineEnd = lineEnd;
    this.lineStart = lineStart;
    this.maintainability = 0;
    this.methods = [];
    this.aggregateAverage = new MethodAverage();
    this.methodAverage = new MethodAverage();
    this.srcPath = void 0;
    this.srcPathAlias = void 0;
  }

  /**
   * Clears all errors stored in the module report and by default any class reports and module methods.
   *
   * @param clearChildren - (Optional) If false then class and module method errors are not cleared; default (true).
   */
  clearErrors(clearChildren: boolean = true) {
    this.errors = [];

    if (clearChildren) {
      this.classes.forEach((report) => {
        report.clearErrors();
      });
      this.methods.forEach((report) => {
        report.clearErrors();
      });
    }
  }

  /**
   * Cleans up any house keeping member variables.
   */
  finalize(): ModuleReport {
    return MathUtil.toFixedTraverse(this);
  }

  /**
   * Gets all errors stored in the module report and by default any module methods and class reports.
   *
   * @param options - Optional parameters.
   *
   */
  getErrors(
    options: {
      query?: any;
      // If false then module errors are not included; default (true).
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
      // Add module to all children errors.
      if (options.includeReports) {
        const childErrors: any[] = [];

        this.methods.forEach((report) => {
          childErrors.push(...report.getErrors(options));
        });
        this.classes.forEach((report) => {
          childErrors.push(...report.getErrors(options));
        });

        // Add module to object hash.
        childErrors.forEach((error) => {
          (error as any).module = this;
        });

        // Push to all module errors.
        errors.push(...childErrors);
      } else {
        this.methods.forEach((report) => {
          errors.push(...report.getErrors(options));
        });
        this.classes.forEach((report) => {
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
   */
  static getFormats() {
    return TransformFormat.getFormats(ReportType.MODULE);
  }

  /**
   * Returns the name / id associated with this report.
   */
  getName() {
    return typeof this.srcPath === "string" ? this.srcPath : "";
  }

  /**
   * Returns the setting indexed by the given key.
   *
   * @param key - A key used to store the setting parameter.
   * @param defaultValue - A default value to return if no setting for the given key is currently stored.
   *
   */
  getSetting(key: string, defaultValue: any = undefined) {
    /* istanbul ignore if */
    if (typeof key !== "string" || key === "") {
      throw new TypeError(
        `getSetting error: 'key' is not a 'string' or is empty.`
      );
    }

    return typeof this.settings === "object" &&
      typeof this.settings[key] !== "undefined"
      ? this.settings[key]
      : defaultValue;
  }

  /**
   * Deserializes a JSON object representing a ModuleReport.
   *
   * @param object - A JSON object of a ModuleReport that was previously serialized.
   *
   */
  static parse(object: any): ModuleReport {
    /* istanbul ignore if */
    if (typeof object !== "object") {
      throw new TypeError(`parse error: 'object' is not an 'object'.`);
    }

    const report = Object.assign(new ModuleReport(), object);

    if (report.classes.length > 0) {
      report.classes = report.classes.map((classReport: any) =>
        ClassReport.parse(classReport)
      );
    }

    if (report.errors.length > 0) {
      report.errors = report.errors.map((error: any) =>
        AnalyzeError.parse(error)
      );
    }

    if (report.methods.length > 0) {
      report.methods = report.methods.map((methodReport: any) =>
        ModuleMethodReport.parse(methodReport)
      );
    }

    return report;
  }

  /**
   * Sets the setting indexed by the given key and returns true if successful.
   *
   * @param key - A key used to store the setting parameter.
   * @param value - A value to set to `this.settings[key]`.
   *
   */
  setSetting(key: string, value: any): boolean {
    /* istanbul ignore if */
    if (typeof key !== "string" || key === "") {
      throw new TypeError(
        `setSetting error: 'key' is not a 'string' or is empty.`
      );
    }

    if (this.settings === "object") {
      this.settings[key] = value;
      return true;
    }

    return false;
  }
}
