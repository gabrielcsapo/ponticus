import FormatText from "../text/FormatText.js";
import SU from "../../../utils/StringUtil.js";

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting them to a markdown string.
 */
export default class FormatMarkdown extends FormatText {
  /**
   * Initializes markdown format.
   *
   * @param headers -
   * @param keys -
   * @param adjacencyFormatName -
   * @param visibilityFormatName -
   */
  constructor(
    headers = {},
    keys = {},
    adjacencyFormatName = "markdown-adjacency",
    visibilityFormatName = "markdown-visibility"
  ) {
    super(
      Object.assign({}, s_DEFAULT_HEADERS, headers),
      keys,
      adjacencyFormatName,
      visibilityFormatName
    );
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
    return "markdown";
  }
}

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
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
    "\n",
    new SU.SafeEntry("* Class method: **", "name", 1, "**", SU.tagEscapeHTML),
  ],

  classReport: [
    "\n",
    new SU.SafeEntry("* Class: **", "name", 1, "**", SU.tagEscapeHTML),
  ],

  entryPrepend: "* ",

  entryTemplateTag: SU.tagEscapeHTML,

  moduleMethod: [
    "\n",
    new SU.SafeEntry("* Module method: **", "name", 1, "**", SU.tagEscapeHTML),
  ],

  moduleReport: [
    "\n",
    new SU.SafeEntry("* Module ", "___modulecntrplus1___", 1, ":"),
    new SU.SafeEntry("   * File path: `", "filePath", 1, "`"),
    new SU.SafeEntry("   * Source path: `", "srcPath", 1, "`"),
    new SU.SafeEntry("   * Source alias: `", "srcPathAlias", 1, "`"),
  ],

  projectReport: ["* Project: \n"],
};
