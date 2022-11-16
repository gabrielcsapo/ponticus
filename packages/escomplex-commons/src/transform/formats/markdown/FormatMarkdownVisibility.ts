import FormatTextVisibility from "../text/FormatTextVisibility.js";

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting a matrix list into markdown.
 */
export default class FormatMarkdownVisibility extends FormatTextVisibility {
  /**
   * Initializes visibility markdown format.
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
    return "markdown-visibility";
  }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines the default headers added to any output strings..
 */
const s_DEFAULT_HEADERS: {
  entryPrepend: string;
  entryWrapper: string;
  textHeader: string;
} = {
  entryPrepend: "* ",
  entryWrapper: "`",
  textHeader:
    "* Visibility (reverse dependents / numerical indices correspond to ProjectReport modules / reports):\n",
};
