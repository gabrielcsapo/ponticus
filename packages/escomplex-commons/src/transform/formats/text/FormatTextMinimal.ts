import AbstractFormatTest from "./AbstractFormatText.js";

import ReportType from "../../../types/ReportType.js";
import { SafeEntry } from "../../../utils/StringUtil.js";

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting them to plain text with just
 * modules.
 */
export default class FormatTextMinimal extends AbstractFormatTest {
  /**
   * Initializes minimal text format.
   *
   * @param headers -
   * @param keys -
   */
  constructor(headers = {}, keys = {}) {
    super(
      Object.assign({}, s_DEFAULT_HEADERS, headers),
      Object.assign({}, s_DEFAULT_KEYS, keys)
    );
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
    return "text-minimal";
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
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines the default keys to include in a minimal text representation of class, class method, module method, module,
 * project reports.
 */
const s_DEFAULT_KEYS = {
  classReport: ["maintainability", "errors"],
  methodReport: ["cyclomatic", "halstead.difficulty", "errors"],
  moduleReport: ["maintainability", "errors"],
  projectReport: ["moduleAverage.maintainability", "errors"],
};

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 */
const s_DEFAULT_HEADERS = {
  classMethod: [
    new SafeEntry("Class method: ", "name", 0),
    new SafeEntry(" (", "lineStart", 1, ")"),
  ],

  classReport: [
    new SafeEntry("Class: ", "name", 0),
    new SafeEntry(" (", "lineStart", 1, ")"),
  ],

  entryPrepend: "",

  moduleMethod: [
    new SafeEntry("Module method: ", "name", 0),
    new SafeEntry(" (", "lineStart", 1, ")"),
  ],

  moduleReport: [
    "\n",
    new SafeEntry("Module ", "___modulecntrplus1___", 1, ":"),
    new SafeEntry("   filePath: ", "filePath", 1),
    new SafeEntry("   srcPath: ", "srcPath", 1),
    new SafeEntry("   srcPathAlias: ", "srcPathAlias", 1),
  ],

  projectReport: ["Project:\n"],
};
