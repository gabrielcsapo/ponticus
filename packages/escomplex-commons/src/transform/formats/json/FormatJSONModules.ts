import ClassReport from "../../../module/report/ClassReport";
import MethodReport from "../../../module/report/MethodReport";
import ModuleReport from "../../../module/report/ModuleReport";
import ProjectReport from "../../../project/report/ProjectReport";
import ReportType from "../../../types/ReportType";

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectReport instances converting them to JSON that
 * includes only the `filePath`, `srcPath`, and / or `srcPathAlias` of module report entries.
 */
export default class FormatJSONModules {
  /**
   * Formats a report as a JSON string with just module data.
   *
   * @param report - A report to format.
   * @param options - One or more optional parameters passed to the formatter.
   *
   */
  formatReport(
    report: ModuleReport | ProjectReport,
    options: {
      spacing?: number; // An integer defining the JSON output spacing.
    } = {}
  ) {
    let output;

    switch (report.type) {
      case ReportType.MODULE:
        output = this._formatModule(report as ModuleReport);
        break;

      case ReportType.PROJECT:
        output = this._formatProject(report as ProjectReport);
        break;

      default:
        console.warn(
          `formatReport '${this.name}' warning: unsupported report type '${report.type}'.`
        );
        return "";
    }

    return typeof options === "object" && Number.isInteger(options.spacing)
      ? JSON.stringify(output, void 0, options.spacing)
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
    return "json-modules";
  }

  /**
   * Gets the format type.
   */
  get type() {
    return "modules";
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
   * Formats a module report as a JSON string. Please note that the exported JSON only contains data for ModuleReport
   * instances contained in a ProjectReport.
   *
   * @param moduleReport - A module report.
   */
  _formatModule(moduleReport: ModuleReport) {
    const output: any = {};

    if (moduleReport.filePath) {
      output.filePath = moduleReport.filePath;
    }
    if (moduleReport.srcPath) {
      output.srcPath = moduleReport.srcPath;
    }
    if (moduleReport.srcPathAlias) {
      output.srcPathAlias = moduleReport.srcPathAlias;
    }

    return output;
  }

  /**
   * Formats a project report modules as a JSON string.
   *
   * @param projectReport - A project report.
   *
   */
  _formatProject(projectReport: ProjectReport) {
    const output: any = { modules: [] };

    projectReport.modules.forEach((moduleReport) => {
      output.modules.push(this._formatModule(moduleReport));
    });

    return output;
  }
}
