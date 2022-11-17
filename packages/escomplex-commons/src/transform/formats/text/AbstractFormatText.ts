import ObjectUtil from "../../../utils/ObjectUtil.js";
import ReportType from "../../../types/ReportType.js";
import StringUtil, { SafeEntry } from "../../../utils/StringUtil.js";
import ClassReport from "../../../module/report/ClassReport.js";
import ModuleReport from "../../../module/report/ModuleReport.js";
import ProjectReport from "../../../project/report/ProjectReport.js";
import MethodReport from "../../../module/report/MethodReport.js";
import ClassMethodReport from "../../../module/report/ClassMethodReport.js";

/**
 * Provides the base text format transform for ModuleReport / ProjectReport instances.
 */
export default class AbstractFormatText {
  /**
   * An object hash of header entries formatted for `StringUtil.safeStringsObject`
   */
  _headers: any;
  /**
   * An object hash of key entries formatted for `StringUtil.safeStringsObject`
   */
  _keys: any;

  /**
   * Initializes instance storing default headers / keys.
   *
   * @param headers - An object hash of header entries formatted for `StringUtil.safeStringsObject`.
   *
   * @param keys - An object hash of key entries formatted for `StringUtil.safeStringsObject`.
   */
  constructor(headers = {}, keys = {}) {
    this._headers = headers;
    this._keys = keys;
  }

  /**
   * Formats a report as plain text.
   *
   * @param report - A report to format.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   *
   */
  formatReport(
    report: ClassReport | ModuleReport | ProjectReport,
    options: {
      spacing?: number; // An integer defining the JSON output spacing.
    } = {}
  ) {
    const localOptions = Object.assign({}, this._keys, options);

    let output;

    switch (report.type) {
      case ReportType.CLASS:
        output = this._formatClass(report, localOptions).replace(/^[\n]/, "");
        break;

      case ReportType.CLASS_METHOD:
        output = this._formatMethod(
          report as any, // MethodReport doesn't work because it doesn't have type
          localOptions,
          "",
          false
        ).replace(/^[\n]/, "");
        break;

      case ReportType.MODULE_METHOD:
        output = this._formatMethod(report as any, localOptions).replace(
          /^[\n]/,
          ""
        );
        break;

      case ReportType.MODULE:
        output = this._formatModule(report as ModuleReport, localOptions);
        break;

      case ReportType.NESTED_METHOD:
        output = this._formatMethod(
          report as any,
          localOptions,
          "",
          false
        ).replace(/^[\n]/, "");
        break;

      case ReportType.PROJECT:
        output = this._formatProject(report as ProjectReport, localOptions);
        break;

      default:
        console.warn(
          `formatReport '${
            (report as any).name
          }' warning: unsupported report type '${report.type}'.`
        );
        return "";
    }

    return output;
  }

  /**
   * Formats a class report.
   *
   * @param classReport - A class report.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   * @param prepend - (Optional) A string to prepend; default: `''`.
   *
   * @internal
   */
  _formatClass(
    classReport: any,
    options: {
      classReport?: any; // An entry key found in the class report to output.
      methodReport?: string; // An entry key found in the method report to output.
      indent?: boolean;
    },
    prepend = ""
  ) {
    if (!Array.isArray(this._headers.classReport)) {
      return "";
    }

    const indent =
      typeof options.indent === "boolean" && !options.indent ? "" : "   ";
    const indent2 =
      typeof options.indent === "boolean" && !options.indent ? "" : "      ";

    // Must concatenate class methods so that the initial prepend isn't displayed twice.
    return `${StringUtil.safeStringsPrependObject(
      prepend,
      classReport,
      ...this._headers.classReport,
      ...this._formatEntries(classReport, options.classReport, indent)
    )}${this._formatMethods(classReport.methods, options, indent2, false)}`;
  }

  /**
   * Formats a module reports methods array.
   *
   * @param classReports - An array of ClassReport instances to format.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   * @param prepend - (Optional) A string to prepend; default: `''`.
   *
   * @internal
   */
  _formatClasses(
    classReports: ClassReport[],
    options: {
      classReport?: string; // An entry key found in the class report to output.
      methodReport?: string; // An entry key found in the method report to output.
    },
    prepend = ""
  ) {
    if (!Array.isArray(classReports)) {
      return "";
    }

    return classReports.reduce((formatted, classReport) => {
      return `${formatted}${this._formatClass(classReport, options, prepend)}`;
    }, "");
  }

  /**
   * Formats entries for a given report based on an array of accessor entries.
   *
   * @param report - A class / method report.
   * @param entries - (Optional) One or more optional entries to format.
   * @param prepend - (Optional) A string to prepend; default: `''`.
   * @param parentPrepend - (Optional) The parent prepend string used for entries that are arrays with more than one entry; default: `''`.
   *
   * @internal
   */
  _formatEntries(
    report: any,
    entries: Array<string> | Array<string | SafeEntry>,
    prepend = "",
    parentPrepend = ""
  ): string | Array<string> {
    if (!Array.isArray(entries)) {
      return "";
    }

    const entryPrepend =
      typeof this._headers.entryPrepend === "string"
        ? this._headers.entryPrepend
        : "";

    const entryTag =
      typeof this._headers.entryTemplateTag === "function"
        ? this._headers.entryTemplateTag
        : void 0;

    const output: any[] = [];

    // Admittedly the following block is a bit obtuse.
    entries.forEach((entry:any) => {
      // Obtain the accessor field for SafeEntry or accept the bare entry.
      const accessor =
        entry instanceof StringUtil.SafeEntry ? entry.accessor : entry;

      // Use the accessor to access to value in the report. If accessor is not a string `undefined` is returned.
      let value = ObjectUtil.safeAccess(report, accessor);

      // Early out if the value is not retrieved.
      if (typeof value === "undefined") {
        return;
      }

      // Convert all values to an array.
      value = Array.isArray(value) ? value : [value];

      let result = "";

      // Skip any arrays that have no entries.
      if (value.length > 0) {
        // Provides a temporary object to store each array entry via the given accessor.
        const temp = {};

        value.forEach((valueEntry: any, index: number) => {
          // An array with more than one entry must add the parent prepend string to maintain alignment.
          if (index > 0) {
            result += parentPrepend;
          }

          // The abbreviated / minimal transform formats will only contain strings defining the accessor lookup
          // so this accessor key is used as the description.
          if (typeof entry === "string") {
            result += `${prepend}${entryPrepend}${entry}: ${valueEntry}\n`;
          } else {
            // Store the entry via the given accessor which is then dereferenced by `safeStringsPrependObject`.
            ObjectUtil.safeSet(temp, accessor, valueEntry);

            result += StringUtil.safeStringsPrependObject(
              `${prepend}${entryPrepend}`,
              temp,
              entry
            );
          }
        });
      }

      // Apply entry template tag if it is defined.
      result = entryTag ? entryTag`${result}` : result;

      if (result !== "") {
        output.push(result);
      }
    });

    return output;
  }

  /**
   * Formats a method report.
   *
   * @param methodReport - A method report.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   * @param prepend - (Optional) A string to prepend; default: `''`.
   * @param isModule - (Optional) Indicates module scope; default: `true`.
   * @internal
   */
  _formatMethod(
    methodReport: MethodReport,
    options: {
      methodReport?: any; // An entry key found in the method report to output.
      indent?: boolean;
    },
    prepend = "",
    isModule = true
  ) {
    // Skip processing if there are no headers.
    if (
      !Array.isArray(this._headers.classMethod) ||
      !Array.isArray(this._headers.moduleMethod)
    ) {
      return "";
    }

    const indent =
      typeof options.indent === "boolean" && !options.indent ? "" : "   ";

    return StringUtil.safeStringsPrependObject(
      prepend,
      methodReport,
      ...(isModule ? this._headers.moduleMethod : this._headers.classMethod),
      ...this._formatEntries(
        methodReport,
        options.methodReport,
        indent,
        prepend
      )
    );
  }

  /**
   * Formats a module reports methods array.
   *
   * @param methodReports - An array of method report instances to format.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   * @param prepend - (Optional) A string to prepend; default: `''`.
   * @param isModule - (Optional) Indicates module scope; default: `true`.
   *
   * @internal
   */
  _formatMethods(
    methodReports: Array<ClassMethodReport>,
    options: {
      methodReport?: any; // An entry key found in the method report to output.
      indent?: boolean;
    },
    prepend = "",
    isModule = true
  ) {
    if (!Array.isArray(methodReports)) {
      return "";
    }

    return methodReports.reduce((formatted, methodReport) => {
      return `${formatted}${this._formatMethod(
        methodReport,
        options,
        prepend,
        isModule
      )}`;
    }, "");
  }

  /**
   * Formats a module report as plain text.
   *
   * @param report - A module report.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   *
   * @internal
   */
  _formatModule(
    report: ModuleReport,
    options: {
      classReport?: any; // An entry key found in the class report to output.
      methodReport?: any; // An entry key found in the method report to output.
      moduleReport?: any; // An entry key found in the module report to output.
    }
  ) {
    let output = "";

    // Add / remove a temporary entries for the current module index.
    try {
      (report as any).___modulecntr___ = 0;
      (report as any).___modulecntrplus1___ = 1;

      output = this._formatModuleReport(report, true, options);
    } finally {
      delete (report as any).___modulecntr___;
      delete (report as any).___modulecntrplus1___;
    }

    // For reports remove any existing new line at the beginning.
    return output.replace(/^[\n]/, "");
  }

  /**
   * Formats a module report.
   *
   * @param moduleReport - A module report.
   * @param reportsAvailable - Indicates that the report metric data is available.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   *
   * @internal
   */
  _formatModuleReport(
    moduleReport: ModuleReport,
    reportsAvailable: boolean,
    options: {
      classReport?: any; // Entry keys found in the class report to output.
      methodReport?: any; // Entry keys found in the method report to output.
      moduleReport?: any; // Entry keys found in the module report to output.
      indent?: boolean;
    }
  ) {
    // Skip processing if there are no headers.
    if (!Array.isArray(this._headers.moduleReport)) {
      return "";
    }

    const indent =
      typeof options.indent === "boolean" && !options.indent ? "" : "   ";

    if (reportsAvailable) {
      return StringUtil.safeStringsObject(
        moduleReport,
        ...this._headers.moduleReport,
        ...this._formatEntries(moduleReport, options.moduleReport, indent),
        this._formatMethods(moduleReport.methods, options, indent, true),
        this._formatClasses(moduleReport.classes, options, indent)
      );
    } else {
      return StringUtil.safeStringsObject(
        moduleReport,
        ...this._headers.moduleReport
      );
    }
  }

  /**
   * Formats a project report as plain text.
   *
   * @param projectReport - A project report.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   *
   */
  _formatProject(
    projectReport: ProjectReport,
    options: {
      classReport?: any; // An entry key found in the class report to output.
      methodReport?: any; // An entry key found in the method report to output.
      moduleReport?: any; // An entry key found in the module report to output.
      projectReport?: any;
      indent?: boolean;
    }
  ) {
    const reportsAvailable = projectReport.getSetting(
      "serializeModules",
      false
    );

    return (projectReport.modules as any).reduce(
      (formatted: any, moduleReport: any, index: any) => {
        let current = "";

        // Add / remove a temporary entries for the current module index.
        try {
          moduleReport.___modulecntr___ = index;
          moduleReport.___modulecntrplus1___ = index + 1;

          current = `${formatted}${this._formatModuleReport(
            moduleReport,
            reportsAvailable,
            options
          )}`;
        } finally {
          delete moduleReport.___modulecntr___;
          delete moduleReport.___modulecntrplus1___;
        }

        return current;
      },
      `${this._formatProjectReport(projectReport, options)}`
    );
  }

  /**
   * Formats a project report.
   *
   * @param projectReport - A project report.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   *
   * @internal
   */
  _formatProjectReport(
    projectReport: ProjectReport,
    options: {
      projectReport?: any; // Entry keys found in the ProjectReport to output.
      indent?: boolean;
    }
  ) {
    // Skip processing if there are no headers.
    if (!Array.isArray(this._headers.projectReport)) {
      return "";
    }

    const indent =
      typeof options.indent === "boolean" && !options.indent ? "" : "   ";

    return StringUtil.safeStringsObject(
      projectReport,
      ...this._headers.projectReport,
      ...this._formatEntries(projectReport, options.projectReport, indent)
    );
  }
}
