import AbstractFormatTest from "./AbstractFormatText.js";

import ReportType from "../../../types/ReportType";
import { SafeEntry } from "../../../utils/StringUtil";

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting them to plain text with just
 * modules.
 */
export default class FormatTextModules extends AbstractFormatTest {
  /**
   * Initializes text modules format.
   *
   * @param headers -
   * @param keys -
   */
  constructor(headers = {}, keys = {}) {
    super(Object.assign({}, s_DEFAULT_HEADERS, headers), keys);
  }

  /**
   * Gets the file extension.
   */
  get extension() {
    return "txt";
  }

  /**
   * Gets the format name.
   */
  get name() {
    return "text-modules";
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
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines markdown headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 */
const s_DEFAULT_HEADERS = {
  moduleReport: [
    new SafeEntry("Module ", "___modulecntrplus1___", 1, ":"),
    new SafeEntry("filePath: ", "filePath"),
    new SafeEntry("srcPath: ", "srcPath"),
    new SafeEntry("srcPathAlias: ", "srcPathAlias"),
    "\n",
  ],
};
