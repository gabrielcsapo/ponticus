import AbstractTextMatrix from "./AbstractTextMatrix.js";

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting a matrix list into plain text.
 */
export default class FormatTextAdjacency extends AbstractTextMatrix {
  /**
   * Initializes text adjacency format.
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
    return "text-adjacency";
  }

  /**
   * Gets the format type.
   */
  get type() {
    return "adjacency";
  }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines the default matrix list key accessed.
 */
const s_DEFAULT_KEYS = {
  matrixList: "adjacencyList",
};

/**
 * Defines the default headers added to any output strings..
 */
const s_DEFAULT_HEADERS = {
  entryPrepend: "",
  entryWrapper: "",
  textHeader:
    "Adjacency (dependencies / numerical indices correspond to ProjectReport modules / reports):\n",
};
