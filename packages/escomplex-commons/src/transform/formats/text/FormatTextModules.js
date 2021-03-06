import AbstractFormatTest from "./AbstractFormatText.js";

import ReportType from "../../../types/ReportType.js";
import SU from "../../../utils/StringUtil.js";

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting them to plain text with just
 * modules.
 */
export default class FormatTextModules extends AbstractFormatTest {
  /**
   * Initializes text modules format.
   *
   * @param {object} headers -
   * @param {object} keys -
   */
  constructor(headers = {}, keys = {}) {
    super(Object.assign({}, s_DEFAULT_HEADERS, headers), keys);
  }

  /**
   * Gets the file extension.
   *
   * @returns {string}
   */
  get extension() {
    return "txt";
  }

  /**
   * Gets the format name.
   *
   * @returns {string}
   */
  get name() {
    return "text-modules";
  }

  /**
   * Gets the format type.
   *
   * @returns {string}
   */
  get type() {
    return "modules";
  }

  /**
   * Returns whether a given ReportType is supported by this format transform.
   *
   * @param {ReportType}  reportType - A given report type.
   *
   * @returns {boolean}
   */
  isSupported(reportType) {
    switch (reportType) {
      case ReportType.MODULE:
      case ReportType.PROJECT:
        return true;

      default:
        return false;
    }
  }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines markdown headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{moduleReport: *[]}}
 * @ignore
 */
const s_DEFAULT_HEADERS = {
  moduleReport: [
    new SU.SafeEntry("Module ", "___modulecntrplus1___", 1, ":"),
    new SU.SafeEntry("filePath: ", "filePath"),
    new SU.SafeEntry("srcPath: ", "srcPath"),
    new SU.SafeEntry("srcPathAlias: ", "srcPathAlias"),
    "\n",
  ],
};
