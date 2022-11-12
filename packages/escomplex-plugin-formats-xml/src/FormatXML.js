import { TransformFormat } from "@ponticus/escomplex-commons";

import js2xmlparser from "js2xmlparser";

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to XML.
 */
export default class FormatXML {
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
   * @param {object}         options - TransformFormat options.
   *
   * @returns {string}
   */
  formatReport(report, options) {
    const jsonObject = TransformFormat.format(
      report,
      this._jsonFormatName,
      options
    );

    return js2xmlparser("module", jsonObject);
  }

  /**
   * Formats a project result as XML.
   *
   * @param {ProjectResult}  result - A project result.
   * @param {object}         options - TransformFormat options.
   *
   * @returns {string}
   */
  formatResult(result, options) {
    const jsonObject = TransformFormat.format(
      result,
      this._jsonFormatName,
      options
    );

    return js2xmlparser("project", jsonObject);
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
    return this._formatType;
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
