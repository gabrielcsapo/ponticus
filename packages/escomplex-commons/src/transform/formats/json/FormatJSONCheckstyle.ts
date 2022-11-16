import ObjectUtil from "../../../utils/ObjectUtil.js";
import ReportType from "../../../types/ReportType.js";
import ModuleReport from "../../../module/report/ModuleReport.js";
import ProjectReport from "../../../project/report/ProjectReport.js";

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectReport instances converting them to JSON that
 * corresponds to the XML checkstyle format.
 *
 * The checkstyle XML format outputs error elements for each file / module. This format depends on the output of
 * `FormatJSONCheckstyle`. The implementation below outputs a `file` array that contains an `error` array entries.
 *
 * There is a corresponding `FormatXMLCheckstyle` format loaded when `escomplex-plugin-formats-xml` during plugin
 * loading which converts the JSON output of this format transform to the official XML checkstyle format.
 *
 * @see http://checkstyle.sourceforge.net/
 * @see https://github.com/checkstyle/checkstyle
 * @see https://github.com/checkstyle/checkstyle/blob/master/src/main/java/com/puppycrawl/tools/checkstyle/XMLLogger.java
 */
export default class FormatJSONCheckstyle {
  _thresholds: typeof s_DEFAULT_THRESHOLDS;
  /**
   * Initializes
   *
   * @param thresholds - Defines thresholds.
   */
  constructor(thresholds = s_DEFAULT_THRESHOLDS) {
    this._thresholds = thresholds;
  }

  /**
   * Formats a module report as JSON / checkstyle.
   *
   * @param report - A module or project report to format.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   *
   */
  formatReport(
    report: ModuleReport | ProjectReport,
    options: {
      // (Optional) An integer defining the JSON output spacing.
      spacing?: number;
    } = {}
  ) {
    let reports: any;
    let reportsAvailable: any;

    switch (report.type) {
      case ReportType.MODULE:
        reports = [report];
        reportsAvailable = true;
        break;

      case ReportType.PROJECT:
        // @ts-ignore
        reports = report.modules;
        reportsAvailable = report.getSetting("serializeModules", false);
        break;

      default:
        console.warn(
          `formatReport '${this.name}' warning: unsupported report type '${report.type}'.`
        );
        return "";
    }

    const localOptions = Object.assign({}, this._thresholds, options);

    const output: { version: string; file: any[] } = {
      version: "7.0",
      file: [],
    };

    reports.forEach((report: any) => {
      output.file.push(
        this._formatModule(report, reportsAvailable, localOptions)
      );
    });

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
    return "json-checkstyle";
  }

  /**
   * Gets the format type.
   */
  get type() {
    return "checkstyle";
  }

  /**
   * Returns whether a given ReportType is supported by this format transform.
   *
   * @param reportType - A given report type.
   *
   */
  isSupported(reportType: ReportType): boolean {
    switch (reportType) {
      case ReportType.MODULE:
      case ReportType.PROJECT:
        return true;

      default:
        return false;
    }
  }

  /**
   * Formats a module report.
   *
   * @param report - A module report.
   * @param reportsAvailable - Indicates that the report metric data is available.
   * @param options - (Optional) One or more optional entries defining threshold parameters.
   *
   */
  _formatModule(report: ModuleReport, reportsAvailable: boolean, options: any) {
    const output: any = {};

    output.name = report.filePath ? report.filePath : "<unknown>";

    output.error = [];

    if (reportsAvailable) {
      if (typeof options.moduleReport === "object") {
        this._parseErrors(report, options.moduleReport, output.error);
      }

      for (let cntr = 0; cntr < report.methods.length; cntr++) {
        if (typeof options.methodReport === "object") {
          this._parseErrors(
            report.methods[cntr],
            options.methodReport,
            output.error
          );
        }
      }

      for (let cntr = 0; cntr < report.classes.length; cntr++) {
        const classReport = report.classes[cntr];

        if (typeof options.classReport === "object") {
          this._parseErrors(classReport, options.classReport, output.error);
        }

        for (let cntr2 = 0; cntr2 < classReport.methods.length; cntr2++) {
          if (typeof options.methodReport === "object") {
            this._parseErrors(
              classReport.methods[cntr2],
              options.methodReport,
              output.error
            );
          }
        }
      }
    }

    return output;
  }

  /**
   * Parses errors from report
   *
   * @param sourceObject - A report object
   * @param options - Options
   * @param errors - An array to accumulate errors.
   *
   * @internal
   */
  _parseErrors(sourceObject: any, options: any, errors: any[]) {
    for (const key in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (!options.hasOwnProperty(key)) {
        continue;
      }

      const sourceObjectValue = ObjectUtil.safeAccess(sourceObject, key);

      if (typeof sourceObjectValue === "number") {
        let severity = undefined;
        let mapEntryValue;
        let testSign;

        const map = options[key];

        for (const entryKey in map) {
          // eslint-disable-next-line no-prototype-builtins
          if (!map.hasOwnProperty(entryKey)) {
            continue;
          }

          // Skip `_test` entry.
          if (entryKey === "_test") {
            continue;
          }

          switch (map._test) {
            case "<":
              if (sourceObjectValue < map[entryKey]) {
                severity = entryKey;
                mapEntryValue = map[entryKey];
                testSign = " < ";
              }
              break;

            case "<=":
              if (sourceObjectValue <= map[entryKey]) {
                severity = entryKey;
                mapEntryValue = map[entryKey];
                testSign = " <= ";
              }
              break;

            case ">=":
              if (sourceObjectValue >= map[entryKey]) {
                severity = entryKey;
                mapEntryValue = map[entryKey];
                testSign = " >= ";
              }
              break;

            default:
              if (sourceObjectValue > map[entryKey]) {
                severity = entryKey;
                mapEntryValue = map[entryKey];
                testSign = " > ";
              }
              break;
          }
        }

        if (typeof severity === "string") {
          const sourceName = sourceObject.getName();

          errors.push({
            line: sourceObject.lineStart,
            severity,
            message: `${key}: ${sourceObjectValue}${testSign}${mapEntryValue}`,
            source: `${sourceObject.type.description} ${
              sourceName !== "" ? `- ${sourceName}` : ""
            }`,
          });
        }
      }
    }
  }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines default thresholds for severity levels matching the XML checkstyle format.
 * error levels: info, warning, error
 *
 * Entries may include `classReport`, `methodReport`, `moduleReport` that each define an object hash of threshold
 * object hashes. The key of each threshold hash is the entry key to compare against the `info, warning, error` values.
 * By default the order flows left to right using greater than comparisons. An optional entry is `_test` which is a
 * string defining the comparison operations with the following supported options, `<`, `<=`, `>`, and `>=`.
 *
 */
const s_DEFAULT_THRESHOLDS: {
  classReport: {
    maintainability: {
      _test: string;
      info: number;
      warning: number;
      error: number;
    };
  };
  methodReport: {
    cyclomatic: { info: number; warning: number; error: number };
    "halstead.difficulty": { info: number; warning: number; error: number };
  };
  moduleReport: {
    maintainability: {
      _test: string;
      info: number;
      warning: number;
      error: number;
    };
  };
} = {
  classReport: {
    maintainability: { _test: "<", info: 115, warning: 100, error: 90 },
  },
  methodReport: {
    cyclomatic: { info: 3, warning: 7, error: 12 },
    "halstead.difficulty": { info: 8, warning: 13, error: 20 },
  },
  moduleReport: {
    maintainability: { _test: "<", info: 115, warning: 100, error: 90 },
  },
};
