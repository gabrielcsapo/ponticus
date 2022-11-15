export default class TraitUtil {
  /**
   * Provides safe array creation from a given input.
   *
   * @param value - A value to potentially convert into a safe array.
   *
   */
  static safeArray(value: any): any[] {
    return typeof value === "undefined" || value === null
      ? []
      : Array.isArray(value)
      ? value
      : [value];
  }

  /**
   * Provides a utility method that defers to `object.name` if it exists or fallback to `defaultName` or `anonymous`.
   *
   * @param object - The target object to provide safe name coverage.
   * @param defaultName - A default name to fallback to if `object.name` is missing.
   *
   */
  static safeName(object: any, defaultName = ""): string {
    if (
      object !== null &&
      typeof object === "object" &&
      typeof object.name === "string" &&
      object.name !== ""
    ) {
      return object.name;
    }

    if (typeof defaultName === "string" && defaultName !== "") {
      return defaultName;
    }

    return "<anonymous>";
  }

  /**
   * Provides a utility method that defers to `object.value` if it exists or fallback to `defaultValue` or `anonymous`.
   *
   * @param object - The target object to provide safe name coverage.
   * @param defaultValue - A default value to fallback to if `object.value` is missing.
   *
   */
  static safeValue(object: any, defaultValue = ""): string {
    if (
      object !== null &&
      typeof object === "object" &&
      typeof object.value === "string" &&
      object.value !== ""
    ) {
      return object.value;
    }

    if (typeof defaultValue === "string" && defaultValue !== "") {
      return defaultValue;
    }

    return "<anonymous>";
  }
}
