import { PluginEvent } from "@ponticus/plugin-manager";

/**
 * Provides the base implementation for all syntax loader plugins which automatically associates member methods
 * to syntax definitions invoking the method with escomplex settings and assigning the result to the same name as
 * the method.
 */
export default class AbstractSyntaxLoader {
  /**
   * Loads all member methods including from child classes that do not start with a lowercase letter.
   *
   * @param ev - Escomplex plugin event data.
   */
  onLoadSyntax(ev: PluginEvent) {
    for (const name of s_GET_ALL_PROPERTY_NAMES(Object.getPrototypeOf(this))) {
      const first = name.charAt(0);

      // Skip any names that are not a function or are lowercase.
      if (
        !((this as any)[name] instanceof Function) ||
        (first === first.toLowerCase() && first !== first.toUpperCase())
      ) {
        continue;
      }

      // If an existing syntax exists for the given name then combine the results.
      ev.data.syntaxes[name] = Object.assign(
        typeof ev.data.syntaxes[name] === "object"
          ? ev.data.syntaxes[name]
          : {},
        (this as any)[name](ev.data.settings)
      );
    }
  }
}

/**
 * Walks an objects inheritance tree collecting property names stopping before `AbstractSyntaxLoader` is reached.
 *
 * @param obj - object to walks.
 */
const s_GET_ALL_PROPERTY_NAMES = (obj: any) => {
  const props: string[] = [];

  do {
    Object.getOwnPropertyNames(obj).forEach((prop) => {
      if (props.indexOf(prop) === -1) {
        props.push(prop);
      }
    });
    obj = Object.getPrototypeOf(obj);
  } while (
    typeof obj !== "undefined" &&
    obj !== null &&
    !(obj === AbstractSyntaxLoader.prototype)
  );

  return props;
};
