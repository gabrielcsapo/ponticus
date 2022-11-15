import FormatTextModules from "../text/FormatTextModules.js";

import { SafeEntry } from "../../../utils/StringUtil";

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting them to markdown with just modules.
 */
export default class FormatMarkdownModules extends FormatTextModules {
  /**
   * Initializes minimal markdown modules format.
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
    return "markdown-modules";
  }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines markdown headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 */
const s_DEFAULT_HEADERS: { moduleReport: Array<SafeEntry | string> } = {
  moduleReport: [
    new SafeEntry("* Module ", "___modulecntrplus1___", 1, ":"),
    new SafeEntry("   * filePath: `", "filePath", 1, "`"),
    new SafeEntry("   * srcPath: `", "srcPath", 1, "`"),
    new SafeEntry("   * srcPathAlias: `", "srcPathAlias", 1, "`"),
    "\n",
  ],
};
