import { type PluginEvent } from "@ponticus/plugin-manager";

type ValidateArrayOptions = {
  type?: string; // Tests with a typeof check.
  expected?: any; // Optional function or set of expected values to test against
  message?: string; // Optional message to include
  required?: boolean; // When false if the accessor is missing validation is skipped.
  error?: boolean; // When true and error is thrown otherwise a boolean is returned. (true)
};

/**
 * Provides common object manipulation utilities including depth traversal, obtaining accessors, safely setting values /
 * equality tests, and validation.
 *
 * Support for \@ponticus/plugin-manager is enabled.
 */
export default class ObjectUtil {
  /**
   * Performs a naive depth traversal of an object / array. The data structure _must not_ have circular references.
   * The result of the callback function is used to modify in place the given data.
   *
   * @param data - An object or array.
   *
   * @param func - A callback function to process leaf values in children arrays or object members.
   *
   * @param  modify - If true then the result of the callback function is used to modify in place the given data.
   *
   */
  static depthTraverse(data: any | any[], func: any, modify = false) {
    /* istanbul ignore if */
    if (typeof data !== "object") {
      throw new TypeError("depthTraverse error: 'data' is not an 'object'.");
    }

    /* istanbul ignore if */
    if (typeof func !== "function") {
      throw new TypeError("depthTraverse error: 'func' is not a 'function'.");
    }

    return _depthTraverse(data, func, modify);
  }

  /**
   * Returns a list of accessor keys by traversing the given object.
   *
   * @param data - An object to traverse for accessor keys.
   *
   */
  static getAccessorList(data: any): any[] {
    if (typeof data !== "object") {
      throw new TypeError(`getAccessorList error: 'data' is not an 'object'.`);
    }

    return _getAccessorList(data);
  }

  /**
   * Provides a way to safely access an objects data / entries given an accessor string which describes the
   * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
   * to walk.
   *
   * @param data - An object to access entry data.
   *
   * @param accessor - A string describing the entries to access.
   *
   * @param defaultValue - (Optional) A default value to return if an entry for accessor is not found.
   *
   */
  static safeAccess(data: any, accessor: string, defaultValue?: any) {
    if (typeof data !== "object") {
      return defaultValue;
    }
    if (typeof accessor !== "string") {
      return defaultValue;
    }

    const access = accessor.split(".");

    // Walk through the given object by the accessor indexes.
    for (let cntr = 0; cntr < access.length; cntr++) {
      // If the next level of object access is undefined or null then return the empty string.
      if (
        typeof data[access[cntr]] === "undefined" ||
        data[access[cntr]] === null
      ) {
        return defaultValue;
      }

      data = data[access[cntr]];
    }

    return data;
  }

  /**
   * Provides a way to safely batch set an objects data / entries given an array of accessor strings which describe the
   * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
   * to walk. If value is an object the accessor will be used to access a target value from `value` which is
   * subsequently set to `data` by the given operation. If `value` is not an object it will be used as the target
   * value to set across all accessors.
   *
   * @param data - An object to access entry data.
   * @param accessors - A string describing the entries to access.
   * @param value - A new value to set if an entry for accessor is found.
   * @param operation - Operation to perform including: 'add', 'div', 'mult', 'set', 'set-undefined', 'sub'.
   * @param defaultAccessValue - A new value to set if an entry for accessor is found.
   * @param createMissing - If true missing accessor entries will be created as objects automatically.
   *
   */
  static safeBatchSet(
    data: any,
    accessors: Array<string>,
    value: any,
    operation: string = "set",
    defaultAccessValue: any = 0,
    createMissing: boolean = true
  ) {
    if (typeof data !== "object") {
      throw new TypeError(`safeBatchSet Error: 'data' is not an 'object'.`);
    }
    if (!Array.isArray(accessors)) {
      throw new TypeError(`safeBatchSet Error: 'accessors' is not an 'array'.`);
    }

    if (typeof value === "object") {
      accessors.forEach((accessor) => {
        const targetValue = ObjectUtil.safeAccess(
          value,
          accessor,
          defaultAccessValue
        );
        ObjectUtil.safeSet(
          data,
          accessor,
          targetValue,
          operation,
          createMissing
        );
      });
    } else {
      accessors.forEach((accessor) => {
        ObjectUtil.safeSet(data, accessor, value, operation, createMissing);
      });
    }
  }

  /**
   * Compares a source object and values of entries against a target object. If the entries in the source object match
   * the target object then `true` is returned otherwise `false`. If either object is undefined or null then false
   * is returned.
   *
   * @param source - Source object.
   * @param target - Target object.
   *
   */
  static safeEqual(source: any, target: any): boolean {
    if (
      typeof source === "undefined" ||
      source === null ||
      typeof target === "undefined" ||
      target === null
    ) {
      return false;
    }

    const sourceAccessors = ObjectUtil.getAccessorList(source);

    for (let cntr = 0; cntr < sourceAccessors.length; cntr++) {
      const accessor = sourceAccessors[cntr];

      const sourceObjectValue = ObjectUtil.safeAccess(source, accessor);
      const targetObjectValue = ObjectUtil.safeAccess(target, accessor);

      if (sourceObjectValue !== targetObjectValue) {
        return false;
      }
    }

    return true;
  }

  /**
   * Provides a way to safely set an objects data / entries given an accessor string which describes the
   * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
   * to walk.
   *
   * @param  data - An object to access entry data.
   * @param accessor - A string describing the entries to access.
   * @param value - A new value to set if an entry for accessor is found.
   * @param operation - Operation to perform including: 'add', 'div', 'mult', 'set', 'set-undefined', 'sub'.
   * @param createMissing - If true missing accessor entries will be created as objects automatically.
   *
   */
  static safeSet(
    data: any,
    accessor: string,
    value: any,
    operation: string = "set",
    createMissing: boolean = true
  ): boolean {
    if (typeof data !== "object") {
      throw new TypeError(`safeSet Error: 'data' is not an 'object'.`);
    }
    if (typeof accessor !== "string") {
      throw new TypeError(`safeSet Error: 'accessor' is not a 'string'.`);
    }

    const access = accessor.split(".");

    // Walk through the given object by the accessor indexes.
    for (let cntr = 0; cntr < access.length; cntr++) {
      // If data is an array perform validation that the accessor is a positive integer otherwise quit.
      if (Array.isArray(data)) {
        const number = +access[cntr];

        if (!Number.isInteger(number) || number < 0) {
          return false;
        }
      }

      if (cntr === access.length - 1) {
        switch (operation) {
          case "add":
            data[access[cntr]] += value;
            break;

          case "div":
            data[access[cntr]] /= value;
            break;

          case "mult":
            data[access[cntr]] *= value;
            break;

          case "set":
            data[access[cntr]] = value;
            break;

          case "set-undefined":
            if (typeof data[access[cntr]] === "undefined") {
              data[access[cntr]] = value;
            }
            break;

          case "sub":
            data[access[cntr]] -= value;
            break;
        }
      } else {
        // If createMissing is true and the next level of object access is undefined then create a new object entry.
        if (createMissing && typeof data[access[cntr]] === "undefined") {
          data[access[cntr]] = {};
        }

        // Abort if the next level is null or not an object and containing a value.
        if (
          data[access[cntr]] === null ||
          typeof data[access[cntr]] !== "object"
        ) {
          return false;
        }

        data = data[access[cntr]];
      }
    }

    return true;
  }

  /**
   * Performs bulk setting of values to the given data object.
   *
   * @param data - The data object to set data.
   * @param accessorValues - Object of accessor keys to values to set.
   * @param operation - Operation to perform including: 'add', 'div', 'mult', 'set', 'sub'; default (`set`).
   * @param createMissing - If true missing accessor entries will be created as objects automatically.
   *
   */
  static safeSetAll(
    data: any,
    accessorValues: { [key: string]: any },
    operation: string = "set",
    createMissing: boolean = true
  ) {
    if (typeof data !== "object") {
      throw new TypeError(`'data' is not an 'object'.`);
    }
    if (typeof accessorValues !== "object") {
      throw new TypeError(`'accessorValues' is not an 'object'.`);
    }

    for (const accessor of Object.keys(accessorValues)) {
      // eslint-disable-next-line no-prototype-builtins
      if (!accessorValues.hasOwnProperty(accessor)) {
        continue;
      }

      ObjectUtil.safeSet(
        data,
        accessor,
        accessorValues[accessor],
        operation,
        createMissing
      );
    }
  }

  /**
   * Performs bulk validation of data given an object, `validationData`, which describes all entries to test.
   *
   * @param data - The data object to test.
   * @param validationData - Key is the accessor / value is a validation entry. (object<string, ValidationEntry>)
   * @param dataName - Optional name of data.
   *
   */
  static validate(
    data: any,
    validationData: any = {},
    dataName: string = "data"
  ): boolean {
    if (typeof data !== "object") {
      throw new TypeError(`'${dataName}' is not an 'object'.`);
    }
    if (typeof validationData !== "object") {
      throw new TypeError(`'validationData' is not an 'object'.`);
    }

    let result = false;

    for (const key of Object.keys(validationData)) {
      // eslint-disable-next-line no-prototype-builtins
      if (!validationData.hasOwnProperty(key)) {
        continue;
      }

      const entry = validationData[key];

      switch (entry.test) {
        case "array":
          result = ObjectUtil.validateArray(data, key, entry, dataName);
          break;

        case "entry":
          result = ObjectUtil.validateEntry(data, key, entry, dataName);
          break;

        case "entry|array":
          result = ObjectUtil.validateEntryOrArray(data, key, entry, dataName);
          break;
      }
    }

    return result;
  }

  /**
   * Validates all array entries against potential type and expected tests.
   *
   * @param data - The data object to test.
   * @param accessor - A string describing the entries to access.
   * @param options - ?
   * @param dataName - Optional name of data. ("data")
   *
   */
  static validateArray(
    data: any,
    accessor: string,
    {
      type,
      expected,
      message,
      required = false,
      error = true,
    }: ValidateArrayOptions = {},
    dataName: string = "data"
  ) {
    const dataArray = ObjectUtil.safeAccess(data, accessor);

    // A non-required entry is missing so return without validation.
    if (!required && typeof dataArray === "undefined") {
      return true;
    }

    if (!Array.isArray(dataArray)) {
      if (error) {
        throw _validateError(
          TypeError,
          `'${dataName}.${accessor}' is not an 'array'.`
        );
      } else {
        return false;
      }
    }

    if (typeof type === "string") {
      for (let cntr = 0; cntr < dataArray.length; cntr++) {
        if (!(typeof dataArray[cntr] === type)) {
          if (error) {
            const dataEntryString =
              typeof dataArray[cntr] === "object"
                ? JSON.stringify(dataArray[cntr])
                : dataArray[cntr];

            throw _validateError(
              TypeError,
              `'${dataName}.${accessor}[${cntr}]': '${dataEntryString}' is not a '${type}'.`
            );
          } else {
            return false;
          }
        }
      }
    }

    // If expected is a function then test all array entries against the test function. If expected is a Set then
    // test all array entries for inclusion in the set. Otherwise if expected is a string then test that all array
    // entries as a `typeof` test against expected.
    if (Array.isArray(expected)) {
      for (let cntr = 0; cntr < dataArray.length; cntr++) {
        if (expected.indexOf(dataArray[cntr]) < 0) {
          if (error) {
            const dataEntryString =
              typeof dataArray[cntr] === "object"
                ? JSON.stringify(dataArray[cntr])
                : dataArray[cntr];

            throw _validateError(
              Error,
              `'${dataName}.${accessor}[${cntr}]': '${dataEntryString}' is not an expected value: ${JSON.stringify(
                expected
              )}.`
            );
          } else {
            return false;
          }
        }
      }
    } else if (expected instanceof Set) {
      for (let cntr = 0; cntr < dataArray.length; cntr++) {
        if (!expected.has(dataArray[cntr])) {
          if (error) {
            const dataEntryString =
              typeof dataArray[cntr] === "object"
                ? JSON.stringify(dataArray[cntr])
                : dataArray[cntr];

            throw _validateError(
              Error,
              `'${dataName}.${accessor}[${cntr}]': '${dataEntryString}' is not an expected value: ${JSON.stringify(
                expected
              )}.`
            );
          } else {
            return false;
          }
        }
      }
    } else if (typeof expected === "function") {
      for (let cntr = 0; cntr < dataArray.length; cntr++) {
        try {
          const result = expected(dataArray[cntr]);

          if (typeof result === "undefined" || !result) {
            throw new Error(message);
          }
        } catch (err: any) {
          if (error) {
            const dataEntryString =
              typeof dataArray[cntr] === "object"
                ? JSON.stringify(dataArray[cntr])
                : dataArray[cntr];

            throw _validateError(
              Error,
              `'${dataName}.${accessor}[${cntr}]': '${dataEntryString}' failed validation: ${err.message}.`
            );
          } else {
            return false;
          }
        }
      }
    }

    return true;
  }

  /**
   * Validates data entry with a typeof check and potentially tests against the values in any given expected set.
   *
   * @param data - The object data to validate.
   *
   * @param accessor - A string describing the entries to access.
   * @param options - ?
   * @param dataName - Optional name of data.
   *
   */
  static validateEntry(
    data: any,
    accessor: string,
    {
      type = void 0,
      expected = void 0,
      message = void 0,
      required = true,
      error = true,
    }: ValidateArrayOptions,
    dataName = "data"
  ): boolean {
    const dataEntry = ObjectUtil.safeAccess(data, accessor);

    // A non-required entry is missing so return without validation.
    if (!required && typeof dataEntry === "undefined") {
      return true;
    }

    if (type && typeof dataEntry !== type) {
      if (error) {
        throw _validateError(
          TypeError,
          `'${dataName}.${accessor}' is not a '${type}'.`
        );
      } else {
        return false;
      }
    }

    if (
      (expected instanceof Set && !expected.has(dataEntry)) ||
      (Array.isArray(expected) && expected.indexOf(dataEntry) < 0)
    ) {
      if (error) {
        const dataEntryString =
          typeof dataEntry === "object" ? JSON.stringify(dataEntry) : dataEntry;

        throw _validateError(
          Error,
          `'${dataName}.${accessor}': '${dataEntryString}' is not an expected value: ${JSON.stringify(
            expected
          )}.`
        );
      } else {
        return false;
      }
    } else if (typeof expected === "function") {
      try {
        const result = expected(dataEntry);

        if (typeof result === "undefined" || !result) {
          throw new Error(message);
        }
      } catch (err: any) {
        if (error) {
          const dataEntryString =
            typeof dataEntry === "object"
              ? JSON.stringify(dataEntry)
              : dataEntry;

          throw _validateError(
            Error,
            `'${dataName}.${accessor}': '${dataEntryString}' failed to validate: ${err.message}.`
          );
        } else {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Dispatches validation of data entry to string or array validation depending on data entry type.
   *
   * @param data - The data object to test.
   * @param accessor - A string describing the entries to access.
   * @param entry - A validation entry.
   * @param dataName - Optional name of data.
   *
   */
  static validateEntryOrArray(
    data: any,
    accessor: string,
    entry: ValidateArrayOptions,
    dataName: string = "data"
  ): boolean {
    const dataEntry = ObjectUtil.safeAccess(data, accessor);

    let result;

    if (Array.isArray(dataEntry)) {
      result = ObjectUtil.validateArray(data, accessor, entry, dataName);
    } else {
      result = ObjectUtil.validateEntry(data, accessor, entry, dataName);
    }

    return result;
  }
}

/**
 * Wires up ObjectUtil on the plugin eventbus. The following event bindings are available:
 *
 * `typhonjs:object:util:depth:traverse`: Invokes `depthTraverse`.
 * `typhonjs:object:util:get:accessor:list`: Invokes `getAccessorList`.
 * `typhonjs:object:util:safe:access`: Invokes `safeAccess`.
 * `typhonjs:object:util:safe:equal`: Invokes `safeEqual`.
 * `typhonjs:object:util:safe:set`: Invokes `safeSet`.
 * `typhonjs:object:util:safe:set:all`: Invokes `safeSetAll`.
 * `typhonjs:object:util:validate`: Invokes `validate`.
 * `typhonjs:object:util:validate:array`: Invokes `validateArray`.
 * `typhonjs:object:util:validate:entry`: Invokes `validateEntry`.
 *
 *  @param ev - PluginEvent
 */
export function onPluginLoad(ev: PluginEvent) {
  ev.eventbus?.on(
    "typhonjs:object:util:depth:traverse",
    ObjectUtil.depthTraverse
  );
  ev.eventbus?.on(
    "typhonjs:object:util:get:accessor:list",
    ObjectUtil.getAccessorList
  );
  ev.eventbus?.on("typhonjs:object:util:safe:access", ObjectUtil.safeAccess);
  ev.eventbus?.on("typhonjs:object:util:safe:equal", ObjectUtil.safeEqual);
  ev.eventbus?.on("typhonjs:object:util:safe:set", ObjectUtil.safeSet);
  ev.eventbus?.on("typhonjs:object:util:safe:set:all", ObjectUtil.safeSetAll);
  ev.eventbus?.on("typhonjs:object:util:validate", ObjectUtil.validate);
  ev.eventbus?.on(
    "typhonjs:object:util:validate:array",
    ObjectUtil.validateArray
  );
  ev.eventbus?.on(
    "typhonjs:object:util:validate:entry",
    ObjectUtil.validateEntry
  );
  ev.eventbus?.on(
    "typhonjs:object:util:validate:entry|array",
    ObjectUtil.validateEntryOrArray
  );
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Creates a new error of type `clazz` adding the field `_objectValidateError` set to true.
 *
 * @param clazz - Error class to instantiate.
 * @param message - An error message.
 *
 * @internal
 */
function _validateError(clazz: any, message: string) {
  const error = new clazz(message);
  error._objectValidateError = true;
  return error;
}

/**
 * Private implementation of depth traversal.
 *
 * @param data - An object or array.
 * @param func - A callback function to process leaf values in children arrays or object members.
 * @param modify - If true then the result of the callback function is used to modify in place the given data.
 *
 * @internal
 */
function _depthTraverse(data: any, func: any, modify: boolean) {
  if (modify) {
    if (Array.isArray(data)) {
      for (let cntr = 0; cntr < data.length; cntr++) {
        data[cntr] = _depthTraverse(data[cntr], func, modify);
      }
    } else if (typeof data === "object") {
      for (const key in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(key)) {
          data[key] = _depthTraverse(data[key], func, modify);
        }
      }
    } else {
      data = func(data);
    }
  } else {
    if (Array.isArray(data)) {
      for (let cntr = 0; cntr < data.length; cntr++) {
        _depthTraverse(data[cntr], func, modify);
      }
    } else if (typeof data === "object") {
      for (const key in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(key)) {
          _depthTraverse(data[key], func, modify);
        }
      }
    } else {
      func(data);
    }
  }

  return data;
}

/**
 * Private implementation of `getAccessorList`.
 *
 * @param data - An object to traverse.
 *
 * @internal
 */
function _getAccessorList(data: any): any[] {
  const accessors = [];

  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      if (typeof data[key] === "object") {
        const childKeys = _getAccessorList(data[key]);

        childKeys.forEach((childKey) => {
          accessors.push(
            Array.isArray(childKey)
              ? `${key}.${childKey.join(".")}`
              : `${key}.${childKey}`
          );
        });
      } else {
        accessors.push(key);
      }
    }
  }

  return accessors;
}
