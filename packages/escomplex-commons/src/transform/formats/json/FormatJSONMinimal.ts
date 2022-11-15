import ObjectUtil from "../../../utils/ObjectUtil";
import ReportType from "../../../types/ReportType";

import type ClassReport from "../../../module/report/ClassReport";
import type MethodReport from "../../../module/report/MethodReport";
import type ModuleReport from "../../../module/report/ModuleReport";
import type ProjectReport from "../../../project/report/ProjectReport";

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectReport instances converting them to JSON with
 * minimal metrics.
 */
export default class FormatJSONMinimal {
  _keys: any;

  /**
   * Initializes format.
   *
   * @param keys - Defines the keys to include in a minimal JSON representation of class / class method / module method / module / project reports.
   */
  constructor(keys = s_DEFAULT_KEYS) {
    this._keys = keys;
  }

  /**
   * Formats a report as a JSON string with minimal metrics.
   *
   * @param report - A report to format.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   *
   */
  formatReport(
    report: ClassReport | ModuleReport | ProjectReport,
    options: {
      // (Optional) An integer defining the JSON output spacing.
      spacing?: number;
    } = {}
  ) {
    const localOptions = Object.assign({}, this._keys, options);

    let output;

    switch (report.type) {
      case ReportType.CLASS:
        output = this._formatClass(report as ClassReport, localOptions);
        break;

      case ReportType.CLASS_METHOD:
      case ReportType.MODULE_METHOD:
      case ReportType.NESTED_METHOD:
        output = this._formatMethod(report as any, localOptions);
        break;

      case ReportType.MODULE:
        output = this._formatModule(report as ModuleReport, true, localOptions);
        break;

      case ReportType.PROJECT:
        output = this._formatProject(report as ProjectReport, localOptions);
        break;

      default:
        console.warn(
          `formatReport '${this.name}' warning: unsupported report type '${report.type}'.`
        );
        return "";
    }

    return typeof localOptions === "object" &&
      Number.isInteger(localOptions.spacing)
      ? JSON.stringify(output, void 0, localOptions.spacing)
      : JSON.stringify(output);
  }

  /**
   * Gets the file extension.
   */
  get extension() {
    return "json";
  }

  /**
   * Gets the format name.
   */
  get name() {
    return "json-minimal";
  }

  /**
   * Gets the format type.
   */
  get type() {
    return "minimal";
  }

  /**
   * Returns whether a given ReportType is supported by this format transform.
   *
   * @param reportType - A given report type.
   *
   */
  isSupported(reportType: ReportType): boolean {
    switch (reportType) {
      case ReportType.CLASS:
      case ReportType.CLASS_METHOD:
      case ReportType.MODULE_METHOD:
      case ReportType.MODULE:
      case ReportType.NESTED_METHOD:
      case ReportType.PROJECT:
        return true;

      default:
        return false;
    }
  }

  /**
   * Formats a module reports methods array.
   *
   * @param classReport - A ClassReport instance to format.
   * @param options - (Optional) One or more optional parameters passed to the formatter.

   */
  _formatClass(
    classReport: ClassReport,
    options: {
      // An entry key found in the class report to output.
      classReport?: string;
      // An entry key found in the method report to output.
      methodReport?: string;
    }
  ) {
    const entry: any = {};

    if (classReport.name) {
      entry.name = classReport.name;
    }
    if (classReport.lineStart) {
      entry.lineStart = classReport.lineStart;
    }
    if (classReport.lineEnd) {
      entry.lineEnd = classReport.lineEnd;
    }

    if (Array.isArray(options.classReport)) {
      options.classReport.forEach((classEntry) => {
        const entryValue = ObjectUtil.safeAccess(classReport, classEntry);
        if (entryValue) {
          ObjectUtil.safeSet(entry, classEntry, entryValue);
        }
      });
    }

    entry.methods = classReport.methods.map((methodReport) =>
      this._formatMethod(methodReport, options)
    );

    return entry;
  }

  /**
   * Formats a module or class reports methods array.
   *
   * @param methodReport - A method report instance to format.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   */
  _formatMethod(
    methodReport: MethodReport,
    options: {
      // An entry key found in the method report to output.
      methodReport?: string;
    }
  ) {
    const entry: any = {};

    if (methodReport.name) {
      entry.name = methodReport.name;
    }
    if (methodReport.lineStart) {
      entry.lineStart = methodReport.lineStart;
    }
    if (methodReport.lineEnd) {
      entry.lineEnd = methodReport.lineEnd;
    }

    if (Array.isArray(options.methodReport)) {
      options.methodReport.forEach((methodEntry) => {
        const entryValue = ObjectUtil.safeAccess(methodReport, methodEntry);
        if (entryValue) {
          ObjectUtil.safeSet(entry, methodEntry, entryValue);
        }
      });
    }

    return entry;
  }

  /**
   * Formats a module report.
   *
   * @param report - A module report.
   * @param reportsAvailable - Indicates that the report metric data is available.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   *
   */
  _formatModule(
    report: ModuleReport,
    reportsAvailable: boolean,
    options: {
      classReport?: any; // An entry key found in the class report to output.
      methodReport?: any; // An entry key found in the method report to output.
      moduleReport?: any; // An entry key found in the module report to output.
    }
  ) {
    const output: any = {};

    if (reportsAvailable) {
      if (report.filePath) {
        output.filePath = report.filePath;
      }
      if (report.srcPath) {
        output.srcPath = report.srcPath;
      }
      if (report.srcPathAlias) {
        output.srcPathAlias = report.srcPathAlias;
      }
      if (report.lineStart) {
        output.lineStart = report.lineStart;
      }
      if (report.lineEnd) {
        output.lineEnd = report.lineEnd;
      }

      if (Array.isArray(options.moduleReport)) {
        options.moduleReport.forEach((moduleEntry) => {
          const entryValue = ObjectUtil.safeAccess(report, moduleEntry);
          if (entryValue) {
            ObjectUtil.safeSet(output, moduleEntry, entryValue);
          }
        });
      }

      output.classes = report.classes.map((classReport) =>
        this._formatClass(classReport, options)
      );
      output.methods = report.methods.map((methodReport) =>
        this._formatMethod(methodReport, options)
      );
    } else {
      if (report.filePath) {
        output.filePath = report.filePath;
      }
      if (report.srcPath) {
        output.srcPath = report.srcPath;
      }
      if (report.srcPathAlias) {
        output.srcPathAlias = report.srcPathAlias;
      }
      if (report.lineStart) {
        output.lineStart = report.lineStart;
      }
      if (report.lineEnd) {
        output.lineEnd = report.lineEnd;
      }

      output.classes = [];
      output.methods = [];
    }

    return output;
  }

  /**
   * Formats a project report with minimal metrics.
   *
   * @param report - A project report.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   *
   */
  _formatProject(
    report: ProjectReport,
    options: {
      classReport?: any; // An array of entry keys found in the class report to output.
      methodReport?: any; // An array of entry keys found in the method report to output.
      moduleReport?: any; // An array of entry keys found in the module report to output.
      projectReport?: any; // An array of entry keys found in the project report to output.
    }
  ) {
    const output: any = {};

    if (Array.isArray(options.projectReport)) {
      options.projectReport.forEach((projectEntry) => {
        const entryValue = ObjectUtil.safeAccess(report, projectEntry);
        if (entryValue) {
          ObjectUtil.safeSet(output, projectEntry, entryValue);
        }
      });
    }

    output.modules = [];

    const reportsAvailable = report.getSetting("serializeModules", false);

    report.modules.forEach((report) => {
      output.modules.push(
        this._formatModule(report, reportsAvailable, options)
      );
    });

    return output;
  }
}

/**
 * Defines the default keys to include in a minimal JSON representation of class / class method/ module method /
 * module / project reports.
 */
const s_DEFAULT_KEYS: {
  classReport: string[];
  methodReport: string[];
  moduleReport: string[];
  projectReport: string[];
} = {
  classReport: ["maintainability", "errors"],
  methodReport: ["cyclomatic", "halstead.difficulty", "errors"],
  moduleReport: ["maintainability", "errors"],
  projectReport: ["changeCost", "errors"],
};
