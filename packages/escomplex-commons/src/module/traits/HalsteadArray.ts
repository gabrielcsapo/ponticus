import TraitHalstead from "./TraitHalstead.js";

/**
 * Provides a wrapper around an array of Halstead property object hashes which should contain an
 * `identifier` field and potentially a `filter` field.
 */
export default class HalsteadArray {
  /**
   * Stores an array of normalized Halstead property data to an object hash that has an `identifier` entry.
   * @internal
   */
  _data: TraitHalstead[];
  /**
   * Stores the Halstead metric type.
   * @internal
   */
  _metric: string;
  /**
   * Initializes HalsteadArray by normalizing any Halstead properties converting them into TraitHalstead instances.
   *
   * @param  metric - The name of Halstead metric being stored.
   * @param data - An array of Halstead properties.
   */
  constructor(metric: string, data: any) {
    if (typeof metric !== "string") {
      throw new TypeError("ctor error: metric is not a `string`.");
    }

    if (!Array.isArray(data)) {
      throw new TypeError("ctor error: data is not an `Array`.");
    }

    this._data = data.map((property) =>
      property && typeof property.identifier !== "undefined"
        ? new TraitHalstead(metric, property)
        : new TraitHalstead(metric, { identifier: property })
    );
    this._metric = metric;
  }

  /**
   * Allows custom processing of TraitHalstead data.
   *
   * @param callback - A custom method to process each TraitHalstead data.
   * @param thisArg - The this `this` scope to run callback with.
   */
  forEach(callback: () => void, thisArg: any) {
    this._data.forEach(callback, thisArg);
  }

  /**
   * Returns a TraitHalstead entry at the given index.
   *
   * @param index - Index to access.
   *
   */
  get(index: number): TraitHalstead {
    return this._data[index];
  }

  /**
   * Returns the length of wrapped TraitHalstead data
   */
  get length() {
    return this._data.length;
  }

  /**
   * Returns the associated metric type.
   */
  get metric() {
    return this._metric;
  }

  /**
   * Returns the typeof data being wrapped.
   */
  get type() {
    return typeof this._data;
  }

  /**
   * Returns an array of evaluated TraitHalstead data as the value of the `identifier` field of the wrapped data.
   * Additionally the TraitHalstead filter function is invoked with the given parameters removing any values that
   * fail the filter test.
   *
   * @param params - Provides parameters which are forwarded onto any data stored as a function. Normally `params` should be the `current AST node, parent AST node, ... optional data`.
   *
   */
  valueOf(...params: any): Array<string> {
    const filtered = this._data.filter((traitHalstead) => {
      return (
        typeof traitHalstead.valueOf(...params) !== "undefined" &&
        traitHalstead.filter(...params)
      );
    });

    // Map all TraitHalstead data and flatten any array of identifiers returned from `valueOf` and finally convert
    // all flattened identifier entries to strings as necessary.
    return []
      .concat(
        ...filtered.map((traitHalstead) => traitHalstead.valueOf(...params))
      )
      .map((entry) => {
        // Convert any `undefined` entry to a text string. This should only occur when a TraitHalstead defined
        // as a function returns an array containing `undefined`; in this case there is an issue with a syntax trait
        // definition not properly verifying data.

        if (entry === void 0) {
          console.warn(
            `HalsteadArray valueOf warning: undefined TraitHalstead item entry converted to a 'string'.`
          );
          return "undefined";
        }

        // Convert any entries to strings as necessary.
        return typeof entry !== "string" ? JSON.stringify(entry) : entry;
      });
  }
}
