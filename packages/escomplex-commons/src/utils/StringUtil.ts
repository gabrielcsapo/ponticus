import ObjectUtil from "./ObjectUtil";

/**
 * Provides common string utilities.
 */
export default class StringUtil {
  /**
   * Compares two strings.
   *
   * @param lhs - Left-hand side.
   * @param rhs - Right-hand side.
   *
   */
  static compare(lhs: string, rhs: string): number {
    return lhs.toLowerCase().localeCompare(rhs.toLowerCase());
  }

  /**
   * Increments the indentation amount.
   *
   * @param indentation - Current indentation amount.
   * @param amount - (Optional) indentation amount; default: 3.
   *
   */
  static incrementIndent(indentation: number, amount: number = 3): number {
    return indentation + amount;
  }

  /**
   * Creates an indentation string given the indentation amount.
   *
   * @param indentation - Current indentation amount.
   * @param string - A string to append.
   *
   */
  static indent(indentation: number, string: string = "") {
    return new Array(indentation + 1).join(" ") + string;
  }

  /**
   * Returns the SafeEntry constructor which is used by `safeStringsObject` and `safeStringsPrependObject`.
   *
   */
  static get SafeEntry() {
    return SafeEntry;
  }

  /**
   * Provides a way to output a given string value with concatenated data from safely accessing an objects data /
   * entries given an accessor string which describes the entries to walk. To access deeper entries into the object
   * format the accessor string with `.` between entries to walk.
   *
   * @param string - A string to prepend to the object data received.
   * @param object - An object to access entry data.
   * @param accessor - A string describing the entries to access.
   * @param newLine - (Optional) A number of new line characters to append; default: `1`.
   * @param appendString - (Optional) A string to potentially append; default: `''`;
   * @param tagFunction - (Optional) A template tag function to apply; default: `void 0`;
   *
   */
  static safeStringObject(
    string: string,
    object: any,
    accessor: string,
    newLine: number = 1,
    appendString: string = "",
    tagFunction: any = void 0
  ): string {
    const value = ObjectUtil.safeAccess(object, accessor);

    if (
      typeof value === "undefined" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return "";
    }

    let end = "\n";

    // Create the ending new line result if it is not the default of `1`.
    if (newLine === 0 || newLine > 1) {
      end = new Array(newLine + 1).join("\n");
    }

    return typeof tagFunction === "function"
      ? tagFunction`${string}${value}${appendString}${end}`
      : `${string}${value}${appendString}${end}`;
  }

  /**
   * Provides a convenience method producing a block of `safeStringObject` results.
   *
   * @param object - An object to access entry data.
   * @param entries - Multiple arrays or strings. If an entry is not a SafeEntry it will simply be appended. If the entry is an array then entries in this array correspond to the following parameters which are forwarded onto `safeStringObject`.
   *
   */
  static safeStringsObject(
    object: any,
    ...entries: Array<string | SafeEntry>
  ): string {
    return StringUtil.safeStringsPrependObject("", object, ...entries);
  }

  /**
   * Provides a convenience method producing a block of `safeStringObject` results with the option to prepend a
   * given string.
   *
   * @param origPrepend - An additional value to prepend to all results.
   * @param object - An object to access entry data.
   * @param entries - Multiple arrays or strings. If an entry is not a SafeEntry it will simply be appended. If the entry is an array then entries in this array correspond to the following parameters which are forwarded onto `safeStringObject`.
   *
   */
  static safeStringsPrependObject(
    origPrepend: any,
    object: any,
    ...entries: Array<string | SafeEntry>
  ): string {
    if (typeof object !== "object") {
      return "";
    }

    const output = [];

    let skipPrepend = false;

    for (let cntr = 0; cntr < entries.length; cntr++) {
      const entry = entries[cntr];

      // Skip prepend action if last entry did not include a new line.
      const prepend = skipPrepend ? "" : origPrepend;

      // Process an array entry otherwise simply append `entry` to output if it is a string.
      if (entry instanceof SafeEntry) {
        skipPrepend = entry.newLine === 0;

        output.push(
          StringUtil.safeStringObject(
            `${prepend}${entry.prependString}`,
            object,
            entry.accessor,
            entry.newLine,
            entry.appendString,
            entry.tagFunction
          )
        );
      } else if (typeof entry === "string" && entry !== "") {
        output.push(`${prepend}${entry}`);
      } else if (typeof entry.toString === "function") {
        const stringValue = entry.toString();

        if (stringValue !== "") {
          output.push(`${prepend}${stringValue}`);
        }
      }
    }

    return output.join("");
  }

  /**
   * Provides a tagged template method to escape HTML elements.
   *
   * @param literal - Literal components of template string.
   * @param values - Values to substitute.
   *
   */
  static tagEscapeHTML(literal: string[], ...values: any[]): string {
    return values.reduce((previous, value, index) => {
      return (
        previous +
        String(value).replace(/</g, "&lt;").replace(/>/g, "&gt;") +
        literal[index + 1]
      );
    }, literal[0]);
  }
}

/**
 * Defines the parameters for a safe string object lookup. If the accessor resolves against a given object then
 * a string is created by combining the prepend / append strings between the value with optional new lines appended
 * at the end. If a template tag function is defined it is applied to the template string.
 */
export class SafeEntry {
  /**
   * The string to prepend.
   * @internal
   */
  _prependString: string;
  /**
   * The accessor string describing the lookup operation.
   * @internal
   */
  _accessor: string;
  /**
   * The number of newlines characters to append.
   * @internal
   */
  _newLine: number;
  /**
   * A string to append to the end.
   * @internal
   */
  _appendString: string;
  /**
   * A template tag function to apply.
   * @internal
   */
  _tagFunction: any;

  /**
   * Initializes SafeEntry instance.
   *
   * @param prependString - The string to prepend.
   * @param accessor - The accessor string describing the lookup operation.
   * @param newLine - (Optional) The number of newlines characters to append.
   * @param appendString - (Optional) A string to append to the end.
   * @param tagFunction - (Optional) A template tag function to apply.
   */
  constructor(
    prependString: string,
    accessor: string,
    newLine = 1,
    appendString = "",
    tagFunction: any = void 0
  ) {
    if (typeof prependString !== "string") {
      throw new TypeError(`ctor error: 'prependString' is not a 'string'.`);
    }
    if (typeof accessor !== "string") {
      throw new TypeError(`ctor error: 'accessor' is not a 'string'.`);
    }
    if (typeof appendString !== "string") {
      throw new TypeError(`ctor error: 'appendString' is not a 'string'.`);
    }

    if (
      typeof tagFunction !== "function" &&
      typeof tagFunction !== "undefined"
    ) {
      throw new TypeError(
        `ctor error: 'tagFunction' is not a 'function' or 'undefined'.`
      );
    }

    if (Number.isInteger(newLine) && newLine < 0) {
      throw new TypeError(
        `ctor error: 'newLine' is not a positive 'integer' (${newLine}).`
      );
    }

    this._prependString = prependString;
    this._accessor = accessor;
    this._newLine = newLine;
    this._appendString = appendString;
    this._tagFunction = tagFunction;
  }

  /**
   * Returns the accessor string describing the lookup operation.
   */
  get accessor() {
    return this._accessor;
  }

  /**
   * Returns a string to append to the end if any.
   */
  get appendString() {
    return this._appendString;
  }

  /**
   * Returns the new line count.
   */
  get newLine() {
    return this._newLine;
  }

  /**
   * Returns the string to prepend.
   */
  get prependString() {
    return this._prependString;
  }

  /**
   * Returns a template tag function to apply if any.
   */
  get tagFunction() {
    return this._tagFunction;
  }
}
