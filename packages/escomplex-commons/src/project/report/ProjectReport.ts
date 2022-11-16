import TransformFormat from "../../transform/TransformFormat.js";

import ModuleAverage from "../../module/report/averages/ModuleAverage.js";
import ModuleReport from "../../module/report/ModuleReport.js";

import ReportType from "../../types/ReportType.js";

import MathUtil from "../../utils/MathUtil.js";
import ObjectUtil from "../../utils/ObjectUtil.js";
import StringUtil from "../../utils/StringUtil.js";
import Enum from "../../utils/Enum.js";
import AnalyzeError from "../../analyze/AnalyzeError.js";

/**
 * Provides the default project report object which stores data pertaining to all modules / files contained.
 *
 * All modules are stored in the `modules` member variable as ModuleReports.
 *
 * Various helper methods found in ModuleReport and AbstractReport help increment associated data during collection.
 */
export default class ProjectReport {
  /**
   * Stores the settings used to generate the project report.
   */
  settings: { serializeModules: boolean } & { [name: string]: any };
  /**
   * Stores a compacted form of the adjacency matrix. Each row index corresponds to the same report index.
   * Each row entry corresponds to a report index. These relationships dictate the dependencies between all
   * report ModuleReports given the source paths.
   *
   */
  adjacencyList: Array<Array<number>>;
  /**
   * Measures the average percentage of modules affected when one module / file in the project is changed.
   * Lower is better.
   */
  changeCost: number;
  /**
   * Measures the percentage of modules that are widely depended on which also depend on other modules.
   * Lower is better.
   */
  coreSize: number;
  /**
   * Stores any analysis errors.
   */
  errors: any[];
  /**
   * Measures the percentage of all possible internal dependencies that are actually realized in the project.
   * Lower is better.
   */
  firstOrderDensity: number;
  /**
   * Stores the average module metric data.
   */
  moduleAverage: ModuleAverage;
  /**
   * Stores all ModuleReport data for the project sorted by the module / files `srcPath`.
   */
  modules: ModuleReport[] | any[];
  /**
   * Stores a compacted form of the visibility matrix. Each row index corresponds to the same report index.
   * Each row entry corresponds to a report index. These relationships dictate the reverse visibility between all
   * report ModuleReports which may indirectly impact the given module / file.
   *
   */
  visibilityList: Array<Array<number>>;
  /**
   * Returns the enum for the report type.
   */
  get type(): Enum {
    return ReportType.PROJECT;
  }

  /**
   * Initializes ProjectReport with default values.
   *
   * @param moduleReports - An array of ModuleReports for each module / file processed.
   *
   * @param settings - An object hash of the settings used in generating this report via ESComplexProject.
   */
  constructor(
    moduleReports?: ModuleReport[],
    settings: { serializeModules: boolean } & { [name: string]: any } = {
      serializeModules: true,
    }
  ) {
    this.settings =
      typeof settings === "object"
        ? Object.assign({}, settings)
        : { serializeModules: true };
    this.adjacencyList = [];
    this.changeCost = 0;
    this.coreSize = 0;
    this.errors = [];
    this.firstOrderDensity = 0;
    this.moduleAverage = new ModuleAverage();
    this.modules = Array.isArray(moduleReports)
      ? moduleReports.sort((lhs, rhs) => {
          return StringUtil.compare(lhs?.srcPath || "", rhs?.srcPath || "");
        })
      : [];
    this.visibilityList = [];
  }

  /**
   * Clears all errors stored in the project report and by default any module reports.
   *
   * @param clearChildren - (Optional) If false then class and module method errors are not cleared; default (true).
   */
  clearErrors(clearChildren = true) {
    this.errors = [];

    if (clearChildren) {
      this.modules.forEach((report) => {
        report.clearErrors();
      });
    }
  }

  /**
   * Finalizes the ProjectReport. If `settings.serializeModules` is false output just `filePath`, `srcPath` &
   * `srcPathAlias` entries of modules.
   *
   * @param options - (Optional) Allows overriding of ModuleReport serialization.
   *
   */
  finalize(
    options: {
      serializeModules: boolean;
    } = {
      serializeModules: true,
    }
  ): ProjectReport {
    if (typeof options !== "object") {
      throw new TypeError(`finalize error: 'options' is not an 'object'.`);
    }

    let serializeModules = this.getSetting("serializeModules", true);

    // Allow an override opportunity.
    if (typeof options.serializeModules === "boolean") {
      serializeModules = options.serializeModules;
    }

    if (serializeModules) {
      this.modules.forEach((report) => {
        report.finalize();
      });
    } else {
      this.modules = this.modules.map((report) => {
        return {
          filePath: report.filePath,
          srcPath: report.srcPath,
          srcPathAlias: report.srcPathAlias,
        };
      });
    }

    return MathUtil.toFixedTraverse(this);
  }

  /**
   * Gets all errors stored in the project report and by default any module reports.
   *
   * @param options - Optional parameters.
   *
   */
  getErrors(
    options: {
      query?: any;
      // If false then module errors are not included; default (true).
      includeChildren: boolean;
      // If true then the result will be an array of object hashes containing `source` (the source report object of the error) and `error` (an AnalyzeError instance) keys and related `module`, `class` entries as; default (false).
      includeReports: boolean;
    } = { includeChildren: true, includeReports: false }
  ): Array<AnalyzeError | { error: AnalyzeError; source: string }> {
    /* istanbul ignore if */
    if (typeof options !== "object") {
      throw new TypeError(`getErrors error: 'options' is not an 'object'.`);
    }

    // By default set includeChildren to true if not already defined.
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
      this.modules.forEach((report) => {
        errors.push(...report.getErrors(options));
      });
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
    return TransformFormat.getFormats(ReportType.PROJECT);
  }

  /**
   * Returns the name / id associated with this report.
   */
  getName(): any {
    return "";
  }

  /**
   * Returns the setting indexed by the given key.
   *
   * @param  key - A key used to store the setting parameter.
   * @param  defaultValue - A default value to return if no setting for the given key is currently stored.
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
   * Deserializes a JSON object representing a ProjectReport.
   *
   * @param object - A JSON object of a ProjectReport that was previously serialized.
   * @param options - Optional parameters.
   *
   */
  static parse(
    object: any,
    options: {
      // If true then automatic finalization is skipped where applicable.
      skipFinalize: boolean;
    } = { skipFinalize: false }
  ): ProjectReport {
    if (typeof object !== "object") {
      throw new TypeError(`parse error: 'object' is not an 'object'.`);
    }

    if (typeof options !== "object") {
      throw new TypeError(`parse error: 'options' is not an 'object'.`);
    }

    const projectReport: ProjectReport = Object.assign(
      new ProjectReport(),
      object
    );

    if (projectReport.modules.length > 0) {
      projectReport.modules = projectReport.modules.map((report) =>
        ModuleReport.parse(report)
      );
    }

    // Must automatically finalize if serializeModules is false.
    if (
      !options.skipFinalize &&
      !projectReport.getSetting("serializeModules", true)
    ) {
      projectReport.finalize();
    }

    return projectReport;
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

    if (typeof this.settings === "object") {
      this.settings[key] = value;
      return true;
    }

    return false;
  }

  /**
   * Formats this ProjectReport given the type.
   *
   * @param name - The name of formatter to use.
   * @param  options - (Optional) One or more optional parameters to pass to the formatter.
   *
   */
  toFormat(name: string, options?: any): string {
    return TransformFormat.format(this, name, options);
  }
}
