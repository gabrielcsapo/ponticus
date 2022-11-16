import AbstractTextMatrix from "./AbstractTextMatrix.js";

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting a matrix list into plain text.
 */
export default class FormatTextVisibility extends AbstractTextMatrix {
  /**
   * Initializes text visibility format.
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
    return "text-visibility";
  }

  /**
   * Gets the format type.
   */
  get type() {
    return "visibility";
  }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines the default matrix list key accessed.
 */
const s_DEFAULT_KEYS = {
  matrixList: "visibilityList",
};

/**
 * Defines the default headers added to any output strings..
 */
const s_DEFAULT_HEADERS = {
  entryPrepend: "",
  entryWrapper: "",
  textHeader:
    "Visibility (reverse dependents / numerical indices correspond to ProjectReport modules):\n",
};
