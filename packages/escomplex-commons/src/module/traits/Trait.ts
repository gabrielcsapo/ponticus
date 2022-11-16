/**
 * Provides a wrapper around a data field which may be an array, function or other primitive value.
 */
export default class Trait {
  /**
   * Stores the data to wrap.
   * @internal
   */
  _data: any;
  /**
   * Stores the Trait metric type.
   * @internal
   */
  _metric: string;

  /**
   * Initializes trait data.
   *
   * @param metric - The name of Halstead metric being stored.
   * @param data - Data to wrap.
   */
  constructor(metric: string, data: any) {
    /* istanbul ignore if */
    if (typeof metric !== "string") {
      throw new TypeError("ctor error: metric is not a `string`.");
    }

    this._data = data;
    this._metric = metric;
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
   * Returns the value of the given data. If the wrapped data is a function it is invoked with the given `params`
   * otherwise the data is returned directly. If the wrapped data is an array a mapped version is returned
   * with each entry that is a function being invoked with the given `params`.
   *
   * @param params - Provides parameters which are forwarded onto any data stored as a function. Normally `params` should be the `current AST node, parent AST node, ... optional data`.
   *
   */
  valueOf(...params: any[]) {
    if (Array.isArray(this._data)) {
      return this._data.map((entry) =>
        typeof entry === "function" ? entry(...params) : entry
      );
    }

    return typeof this._data === "function"
      ? this._data(...params)
      : this._data;
  }
}
