import type ClassReport from "../../../module/report/ClassReport.js";
import type MethodReport from "../../../module/report/MethodReport.js";
import type ModuleReport from "../../../module/report/ModuleReport.js";
import type ProjectReport from "../../../project/report/ProjectReport.js";

/**
 * Provides a format transform for ESComplex report instances converting them to a JSON string.
 */
export default class FormatJSON {
  /**
   * Formats a report as a JSON string.
   *
   * @param  report - A report to format.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   *
   */
  formatReport(
    report: ClassReport | MethodReport | ModuleReport | ProjectReport,
    options: {
      // (Optional) An integer defining the JSON output spacing.
      spacing?: number;
    } = {}
  ): string {
    return typeof options === "object" && Number.isInteger(options.spacing)
      ? JSON.stringify(report, void 0, options.spacing)
      : JSON.stringify(report);
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
    return "json";
  }

  /**
   * Gets the format type.
   */
  get type() {
    return "full";
  }

  /**
   * Returns whether a given ReportType is supported by this format transform.
   */
  isSupported() {
    return true;
  }
}
