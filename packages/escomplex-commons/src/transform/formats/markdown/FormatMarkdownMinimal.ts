import FormatTextMinimal from "../text/FormatTextMinimal.js";

import SU from "../../../utils/StringUtil.js";

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting them to markdown with
 * minimal metrics.
 */
export default class FormatMarkdownMinimal extends FormatTextMinimal {
  /**
   * Initializes minimal markdown format.
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
    return "md";
  }

  /**
   * Gets the format name.
   */
  get name() {
    return "markdown-minimal";
  }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines the default headers as markdown which are inserted via spread into `StringUtil.safeStringsObject`.
 */
const s_DEFAULT_HEADERS: {
  classMethod: any[];
  classReport: any[];
  entryPrepend: string;
  entryTemplateTag: any;
  moduleMethod: any[];
  moduleReport: any[];
  projectReport: string[];
} = {
  classMethod: [
    new SU.SafeEntry("* Class method: **", "name", 0, "", SU.tagEscapeHTML),
    new SU.SafeEntry("** (", "lineStart", 1, ")"),
  ],

  classReport: [
    new SU.SafeEntry("* Class: **", "name", 0, "", SU.tagEscapeHTML),
    new SU.SafeEntry("** (", "lineStart", 1, ")"),
  ],

  entryPrepend: "* ",

  entryTemplateTag: SU.tagEscapeHTML,

  moduleMethod: [
    new SU.SafeEntry("* Module method: **", "name", 0, "", SU.tagEscapeHTML),
    new SU.SafeEntry("** (", "lineStart", 1, ")"),
  ],

  moduleReport: [
    "\n",
    new SU.SafeEntry("* Module ", "___modulecntrplus1___", 1, ":"),
    new SU.SafeEntry("   * filePath: `", "filePath", 1, "`"),
    new SU.SafeEntry("   * srcPath: `", "srcPath", 1, "`"),
    new SU.SafeEntry("   * srcPathAlias: `", "srcPathAlias", 1, "`"),
  ],

  projectReport: ["* Project:\n"],
};
