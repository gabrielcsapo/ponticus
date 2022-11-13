// @ts-ignore
import { TransformFormat } from "@ponticus/escomplex-commons";
// TODO: import ModuleReport, ProjectResult from escomplex-commons when that is converted
type ModuleReport = any;
type ProjectResult = any;

import { parse } from "js2xmlparser";

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
   * @internal
   */
  _formatName: string;
  /**
   * @internal
   */
  _formatType: string;
  /**
   * @internal
   */
  _jsonFormatName: string;

  /**
   * Instantiates FormatXML with a given formatName which should start with `xml` and an associated JSON format
   * type name to use to create the intermediate data to be serialized to XML.
   *
   * @param formatName
   * @param formatType
   * @param jsonFormatName
   */
  constructor(formatName: string, formatType: string, jsonFormatName: string) {
    this._formatName = formatName;
    this._formatType = formatType;
    this._jsonFormatName = jsonFormatName;
  }

  /**
   * Formats a module report as a JSON string.
   *
   * @param report - A module report.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   *
   */
  formatReport(report: ModuleReport, options?: any): string {
    const jsonString = TransformFormat.format(
      report,
      this._jsonFormatName,
      options
    );

    const jsonObject = JSON.parse(jsonString);

    // Reformat JSON checkstyle format moving data to `@` entries which `js2xmlparser` converts to element attributes.
    if (Array.isArray(jsonObject.file)) {
      jsonObject.file.forEach((entry: any) => {
        // Convert name to an attribute.
        entry["@"] = { name: entry.name };
        delete entry.name;

        // Map any error entries to error attributes.
        if (Array.isArray(entry.error)) {
          entry.error = entry.error.map((errorEntry: any) => {
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

    return parse("checkstyle", jsonObject);
  }

  /**
   * Formats a project result as XML.
   *
   * @param result - A project result.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   *
   */
  formatResult(result: ProjectResult, options?: any): string {
    const jsonString = TransformFormat.format(
      result,
      this._jsonFormatName,
      options
    );

    const jsonObject = JSON.parse(jsonString);

    // Reformat JSON checkstyle format moving data to `@` entries which `js2xmlparser` converts to element attributes.
    if (Array.isArray(jsonObject.file)) {
      jsonObject.file.forEach((entry: any) => {
        // Convert name to an attribute.
        entry["@"] = { name: entry.name };
        delete entry.name;

        // Map any error entries to error attributes.
        if (Array.isArray(entry.error)) {
          entry.error = entry.error.map((errorEntry: any) => {
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

    return parse("checkstyle", jsonObject);
  }

  /**
   * Gets the file extension.
   */
  get extension(): string {
    return "xml";
  }

  /**
   * Gets the format name.
   */
  get name(): string {
    return this._formatName;
  }

  /**
   * Gets the format type.
   */
  get type(): string {
    return "checkstyle";
  }

  /**
   * Returns whether a given ReportType is supported by this format transform.
   */
  isSupported(): boolean {
    return true;
  }
}
