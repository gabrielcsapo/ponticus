/**
 * This is an abstract class that is not intended to be used directly. Extend it to turn your class into an enum
 * (initialization is performed via `MyClass.initEnum()`).
 *
 * Modified from source provided by enumify (license unlisted / public domain)
 * @see https://github.com/rauschma/enumify
 */
export default class Enum {
  name?: string;
  ordinal: any;
  static enumValues: Enum[];

  /**
   * `initEnum()` closes the class. Then calling this constructor throws an exception.
   *
   * If your subclass has a constructor then you can control what properties are added to `this` via the argument you
   * pass to `super()`. No arguments are fine, too.
   *
   * @param instanceProperties - Provides initial properties.
   */
  constructor(instanceProperties: any = void 0) {
    // new.target would be better than this.constructor, but isn’t supported by Babel
    if ({}.hasOwnProperty.call(this.constructor, INITIALIZED)) {
      throw new Error("Enum classes can’t be instantiated");
    }

    if (typeof instanceProperties === "object" && instanceProperties !== null) {
      s_COPY_PROPERTIES(this, instanceProperties);
    }
  }

  /**
   * Set up the enum, close the class.
   *
   * @param arg - Either an object whose properties provide the names and values (which must be
   * mutable objects) of the enum constants. Or an Array whose elements are used as the names of the enum constants.
   * The values are create by instantiating the current class.
   *
   */
  static initEnum(arg: any | any[]): Enum {
    Object.defineProperty(this, "enumValues", {
      value: [],
      configurable: false,
      writable: false,
      enumerable: true,
    });

    if (Array.isArray(arg)) {
      this._enumValuesFromArray(arg);
    } else {
      this._enumValuesFromObject(arg);
    }

    Object.freeze((this as any).enumValues);
    (this as any)[INITIALIZED] = true;

    return this as any;
  }

  /**
   * Extracts enum values from an array.
   *
   * @param arr -
   * @internal
   */
  static _enumValuesFromArray(arr: any[]) {
    for (const key of arr) {
      this._pushEnumValue(new this(), key);
    }
  }

  /**
   * Extracts enum values from an object.
   *
   * @param  obj -
   * @internal
   */
  static _enumValuesFromObject(obj: any) {
    for (const key of Object.keys(obj)) {
      const value = new this(obj[key]);
      this._pushEnumValue(value, key);
    }
  }

  /**
   * Pushes enum value.
   *
   * @param enumValue -
   * @param name -
   *
   * @internal
   */
  static _pushEnumValue(enumValue: Enum, name: string) {
    enumValue.name = name;
    enumValue.ordinal = this.enumValues.length;

    Object.defineProperty(this, name, {
      value: enumValue,
      configurable: false,
      writable: false,
      enumerable: true,
    });

    this.enumValues.push(enumValue);
  }

  /**
   * Given the name of an enum constant, return its value.
   *
   * @param  name - An enum name.
   *
   */
  static enumValueOf(name: string) {
    return this.enumValues.find((x) => x.name === name);
  }

  /**
   * Make enum classes iterable
   *
   */
  static [Symbol.iterator]() {
    return this.enumValues[Symbol.iterator]();
  }

  /**
   * Default `toString()` method for enum constant.
   *
   */
  toString(): string {
    return `${this.constructor.name}.${this.name}`;
  }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Provides a Symbol to track initialized state.
 * @internal
 */
const INITIALIZED = Symbol();

/**
 * Copies an objects properties.
 *
 * @param target - Target object.
 * @param source - Source object.
 *
 * @internal
 */
function s_COPY_PROPERTIES(target: any, source: any) {
  // Ideally, we’d use Reflect.ownKeys() here, but I don’t want to depend on a polyfill.
  for (const key of Object.getOwnPropertyNames(source)) {
    const desc = Object.getOwnPropertyDescriptor(source, key);
    Object.defineProperty(target, key, desc!);
  }

  return target;
}
