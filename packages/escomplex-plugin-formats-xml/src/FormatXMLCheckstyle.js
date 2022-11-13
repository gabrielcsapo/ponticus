import { TransformFormat } from "@ponticus/escomplex-commons";

import js2xmlparser from "js2xmlparser";

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to Checkstyle XML.
 *
 * The checkstyle XML format outputs error elements for each file / module. This format depends on the output of
 * `FormatJSONCheckstyle`. The essential implementation below converts various entries in the JSON output to parameters
 * that are understood by `js2xmlparser` as attribute values when serializing XML to be conformant with the checkstyle
 * XML format.
 *
 * @see http://checkstyle.sourceforge.net/
 * @see https://github.com/checkstyle/checkstyle
 * @see https://github.com/checkstyle/checkstyle/blob/master/src/main/java/com/puppycrawl/tools/checkstyle/XMLLogger.java
 */
export default class FormatXMLCheckstyle {
  /**
   * Instantiates FormatXML with a given formatName which should start with `xml` and an associated JSON format
   * type name to use to create the intermediate data to be serialized to XML.
   *
   * @param {string}   formatName -
   * @param {string}   formatType -
   * @param {string}   jsonFormatName -
   */
  constructor(formatName, formatType, jsonFormatName) {
    this._formatName = formatName;
    this._formatType = formatType;
    this._jsonFormatName = jsonFormatName;
  }

  /**
   * Formats a module report as a JSON string.
   *
   * @param {ModuleReport}   report - A module report.
   *
   * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
   *
   * @returns {string}
   */
  formatReport(report, options) {
    const jsonString = TransformFormat.format(
      report,
      this._jsonFormatName,
      options
    );

    const jsonObject = JSON.parse(jsonString);

    // Reformat JSON checkstyle format moving data to `@` entries which `js2xmlparser` converts to element attributes.
    if (Array.isArray(jsonObject.file)) {
      jsonObject.file.forEach((entry) => {
        // Convert name to an attribute.
        entry["@"] = { name: entry.name };
        delete entry.name;

        // Map any error entries to error attributes.
        if (Array.isArray(entry.error)) {
          entry.error = entry.error.map((errorEntry) => {
            return { "@": errorEntry };
          });
        }
      });
    }

    // Convert version to a root attribute.
    if (typeof jsonObject.version === "string") {
      jsonObject["@"] = { version: jsonObject.version };
      delete jsonObject.version;
    }

    return js2xmlparser("checkstyle", jsonObject);
  }

  /**
   * Formats a project result as XML.
   *
   * @param {ProjectResult}  result - A project result.
   *
   * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
   *
   * @returns {string}
   */
  formatResult(result, options) {
    const jsonString = TransformFormat.format(
      result,
      this._jsonFormatName,
      options
    );

    const jsonObject = JSON.parse(jsonString);

    // Reformat JSON checkstyle format moving data to `@` entries which `js2xmlparser` converts to element attributes.
    if (Array.isArray(jsonObject.file)) {
      jsonObject.file.forEach((entry) => {
        // Convert name to an attribute.
        entry["@"] = { name: entry.name };
        delete entry.name;

        // Map any error entries to error attributes.
        if (Array.isArray(entry.error)) {
          entry.error = entry.error.map((errorEntry) => {
            return { "@": errorEntry };
          });
        }
      });
    }

    // Convert version to a root attribute.
    if (typeof jsonObject.version === "string") {
      jsonObject["@"] = { version: jsonObject.version };
      delete jsonObject.version;
    }

    return js2xmlparser("checkstyle", jsonObject);
  }

  /**
   * Gets the file extension.
   *
   * @returns {string}
   */
  get extension() {
    return "xml";
  }

  /**
   * Gets the format name.
   *
   * @returns {string}
   */
  get name() {
    return this._formatName;
  }

  /**
   * Gets the format type.
   *
   * @returns {string}
   */
  get type() {
    return "checkstyle";
  }

  /**
   * Returns whether a given ReportType is supported by this format transform.
   *
   * @returns {boolean}
   */
  isSupported() {
    return true;
  }
}
