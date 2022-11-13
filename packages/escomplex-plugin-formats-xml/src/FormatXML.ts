// @ts-ignore
import { TransformFormat } from "@ponticus/escomplex-commons";
// TODO: import ModuleReport, ProjectResult from escomplex-commons when that is converted
type ModuleReport = any;
type ProjectResult = any;

import { parse } from "js2xmlparser";

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectResult instances converting them to XML.
 */
export default class FormatXML {
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
   * @param options - TransformFormat options.
   */
  formatReport(report: ModuleReport, options: any): string {
    const jsonObject = TransformFormat.format(
      report,
      this._jsonFormatName,
      options
    );

    return parse("module", jsonObject);
  }

  /**
   * Formats a project result as XML.
   *
   * @param result - A project result.
   * @param options - TransformFormat options.
   */
  formatResult(result: ProjectResult, options: any): string {
    const jsonObject = TransformFormat.format(
      result,
      this._jsonFormatName,
      options
    );

    return parse("project", jsonObject);
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
    return this._formatType;
  }

  /**
   * Returns whether a given ReportType is supported by this format transform.
   */
  isSupported(): boolean {
    return true;
  }
}
