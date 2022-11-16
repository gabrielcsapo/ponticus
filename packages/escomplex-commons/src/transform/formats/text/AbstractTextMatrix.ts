import ObjectUtil from "../../../utils/ObjectUtil.js";
import ReportType from "../../../types/ReportType.js";
import ProjectReport from "../../../project/report/ProjectReport.js";

type Header = {
  entryPrepend?: string; // A string to prepend all entries.
  entryWrapper?: string; // A string to wrap output entries between.
  textHeader?: string; // A string to prepend output providing a leading header.
};

type Keys = {
  matrixFilePath?: boolean; // If true the module `filePath` is serialized.
  matrixList?: string; // An entry key to lookup a given matrix list in a ProjectReport.
  zeroIndex?: boolean; // If true module report indexes are zero indexed.
};

/**
 * Provides the base text format transform for ProjectReport matrix list entries.
 */
export default class AbstractTextMatrix {
  _headers: Header;
  _keys: Keys;

  /**
   * Initializes instance storing default headers / keys.
   *
   * @param headers - An object hash containing the following entries.
   * @param keys - An object hash containing the following entries.
   */
  constructor(headers: Header = {}, keys: Keys = {}) {
    this._headers = headers;
    this._keys = keys;
  }

  /**
   * Formats a report as plain text.
   *
   * @param report - A report to format.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   */
  formatReport(
    report: ProjectReport,
    options: {
      spacing?: number; // An integer defining the JSON output spacing.
    } = {}
  ) {
    switch (report.type) {
      case ReportType.PROJECT:
        return this._formatProject(report, options as any);

      default:
        console.warn(
          `formatReport '${
            (report as any).name
          }' warning: unsupported report type '${report.type}'.`
        );
        return "";
    }
  }

  /**
   * Returns whether a given ReportType is supported by this format transform.
   *
   * @param reportType - A given report type.
   *
   */
  isSupported(reportType: ReportType): boolean {
    switch (reportType) {
      case ReportType.PROJECT:
        return true;

      default:
        return false;
    }
  }

  /**
   * Formats a matrix list stored in a ProjectReport.
   *
   * @param projectReport - A project report.
   * @param options - (Optional) An object hash containing the following entries.
   *
   * @internal
   */
  _formatProject(projectReport: ProjectReport, options: Keys = {}) {
    const localOptions = Object.assign({}, this._keys, options);

    if (!localOptions.matrixList) {
      throw new TypeError(
        `formatProject error: could not locate matrixList '${localOptions.matrixList}'.`
      );
    }

    const matrixList = ObjectUtil.safeAccess(
      projectReport,
      localOptions.matrixList
    );

    if (!Array.isArray(matrixList)) {
      throw new TypeError(
        `formatProject error: could not locate matrixList '${localOptions.matrixList}'.`
      );
    }

    if (!Array.isArray(projectReport.modules)) {
      throw new TypeError(
        `formatProject error: could not locate 'projectReport.modules'.`
      );
    }

    if (typeof this._headers.entryPrepend !== "string") {
      throw new TypeError(
        `formatProject error: 'this._headers.entryPrepend' is not a 'string'.`
      );
    }

    if (typeof this._headers.entryWrapper !== "string") {
      throw new TypeError(
        `formatProject error: 'this._headers.entryWrapper' is not a 'string'.`
      );
    }

    let output = "";

    // Add any defined text header.
    if (typeof this._headers.textHeader === "string") {
      output += this._headers.textHeader;
    }

    output += this._formatMatrixList(projectReport, matrixList, localOptions);

    return output;
  }

  /**
   * Returns a string representing the adjacency relationships by printing out the report index followed by
   * dependent ModuleReport indices / `srcPaths`.
   *
   * @param projectReport - A project report containing the matrix list.
   * @param matrixList - The matrix list to be serialized.
   * @param options - (Optional) An object hash of options.
   *
   * @internal
   */
  _formatMatrixList(
    projectReport: ProjectReport,
    matrixList: Array<{ row: number; cols: number[] }>,
    options: {
      zeroIndex?: boolean; // If true module report indexes are zero indexed.
      matrixFilePath?: boolean; // If true the module `filePath` is serialized.
    }
  ) {
    let output = "";

    const plus1 =
      typeof options.zeroIndex === "boolean" && options.zeroIndex ? 0 : 1;
    const path =
      typeof options.matrixFilePath === "boolean" && options.matrixFilePath
        ? "filePath"
        : "srcPath";

    const entryPrepend = this._headers.entryPrepend;
    const entryWrapper = this._headers.entryWrapper;

    matrixList.forEach((entry) => {
      output += `${entryPrepend}${
        entry.row + plus1
      }:\t${entryWrapper}${ObjectUtil.safeAccess(
        projectReport.modules[entry.row],
        path,
        "unknown"
      )}${entryWrapper}\n`;

      entry.cols.forEach((colIndex) => {
        output += `\t${entryPrepend}${
          colIndex + plus1
        }:\t${entryWrapper}${ObjectUtil.safeAccess(
          projectReport.modules[colIndex],
          path,
          "unknown"
        )}${entryWrapper}\n`;
      });

      output += "\n";
    });

    return output;
  }
}
