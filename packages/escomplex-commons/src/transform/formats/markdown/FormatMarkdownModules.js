import FormatTextModules from "../text/FormatTextModules.js";

import SU from "../../../utils/StringUtil.js";

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting them to markdown with just modules.
 */
export default class FormatMarkdownModules extends FormatTextModules {
  /**
   * Initializes minimal markdown modules format.
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
    return "md";
  }

  /**
   * Gets the format name.
   *
   * @returns {string}
   */
  get name() {
    return "markdown-modules";
  }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines markdown headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{moduleReport: string[]}}
 * @ignore
 */
const s_DEFAULT_HEADERS = {
  moduleReport: [
    new SU.SafeEntry("* Module ", "___modulecntrplus1___", 1, ":"),
    new SU.SafeEntry("   * filePath: `", "filePath", 1, "`"),
    new SU.SafeEntry("   * srcPath: `", "srcPath", 1, "`"),
    new SU.SafeEntry("   * srcPathAlias: `", "srcPathAlias", 1, "`"),
    "\n",
  ],
};
