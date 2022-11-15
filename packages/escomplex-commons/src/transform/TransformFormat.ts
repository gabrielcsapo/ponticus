import FormatJSON from "./formats/json/FormatJSON.js";
import FormatJSONCheckstyle from "./formats/json/FormatJSONCheckstyle.js";
import FormatJSONMinimal from "./formats/json/FormatJSONMinimal.js";
import FormatJSONModules from "./formats/json/FormatJSONModules.js";
import FormatMarkdown from "./formats/markdown/FormatMarkdown.js";
import FormatMarkdownAdjacency from "./formats/markdown/FormatMarkdownAdjacency.js";
import FormatMarkdownMinimal from "./formats/markdown/FormatMarkdownMinimal.js";
import FormatMarkdownModules from "./formats/markdown/FormatMarkdownModules.js";
import FormatMarkdownVisibility from "./formats/markdown/FormatMarkdownVisibility.js";
import FormatText from "./formats/text/FormatText.js";
import FormatTextAdjacency from "./formats/text/FormatTextAdjacency.js";
import FormatTextMinimal from "./formats/text/FormatTextMinimal.js";
import FormatTextModules from "./formats/text/FormatTextModules.js";
import FormatTextVisibility from "./formats/text/FormatTextVisibility.js";

import ReportType from "../types/ReportType.js";

import type ClassReport from "../module/report/ClassReport.js";
import type ModuleReport from "../module/report/ModuleReport.js";
import type ProjectReport from "../project/report/ProjectReport.js";

/**
 * Stores all transform formats.
 */
const s_FORMATTERS: Map<string, any> = new Map();

/**
 * TransformFormat
 */
export default class TransformFormat {
  /**
   * Adds a formatter to the static Map by type: `format.type`.
   *
   * @param format - An instance of an object conforming to the module / project transform format API.
   */
  static addFormat(format: any) {
    if (typeof format !== "object") {
      throw new TypeError(`addFormat error: 'format' is not an 'object'.`);
    }

    if (typeof format.name !== "string") {
      throw new TypeError(`addFormat error: 'format.name' is not a 'string'.`);
    }

    if (typeof format.extension !== "string") {
      throw new TypeError(
        `addFormat error: 'format.extension' is not a 'string' for '${format.name}'.`
      );
    }

    if (typeof format.type !== "string") {
      throw new TypeError(
        `addFormat error: 'format.type' is not a 'string' for '${format.name}'.`
      );
    }

    if (typeof format.formatReport !== "function") {
      throw new TypeError(
        `addFormat error: 'format.formatReport' is not a 'function' for '${format.name}'.`
      );
    }

    if (typeof format.isSupported !== "function") {
      throw new TypeError(
        `addFormat error: 'format.isSupported' is not a 'function' for '${format.name}'.`
      );
    }

    s_FORMATTERS.set(format.name, format);
  }

  /**
   * Invokes the callback for each stored formatter.
   *
   * @param callback - A callback function.
   * @param thisArg - (Optional) this context.
   */
  static forEach(callback: any, thisArg?: any) {
    s_FORMATTERS.forEach(callback, thisArg);
  }

  /**
   * Provides a `forEach` variation that invokes the callback if the given extension matches that of a stored
   * formatter.
   *
   * @param extension - A format extension.
   * @param callback - A callback function.
   * @param thisArg - (Optional) this context.
   */
  static forEachExt(extension: string, callback: any, thisArg?: any) {
    for (const format of s_FORMATTERS.values()) {
      if (format.extension === extension) {
        callback.call(thisArg, format, format.name);
      }
    }
  }

  /**
   * Provides a `forEach` variation that invokes the callback if the given type matches that of a stored
   * formatter.
   *
   * @param type - A format type.
   * @param callback - A callback function.
   * @param thisArg - (Optional) this context.
   */
  static forEachType(type: string, callback: any, thisArg?: any) {
    for (const format of s_FORMATTERS.values()) {
      if (format.type === type) {
        callback.call(thisArg, format, format.name);
      }
    }
  }

  /**
   * Formats a given ModuleReport or ProjectReport via the formatter of the requested type.
   *
   * @param report - A report to format.
   * @param name - The name of formatter to invoke.
   * @param options - (Optional) One or more optional parameters to pass to the formatter.
   *
   */
  static format(
    report: ClassReport | ModuleReport | ProjectReport,
    name: string,
    options?: any
  ) {
    const formatter = s_FORMATTERS.get(name);

    if (typeof formatter === "undefined") {
      throw new Error(`format error: unknown formatter name '${name}'.`);
    }

    switch (report.type) {
      case ReportType.CLASS:
      case ReportType.CLASS_METHOD:
      case ReportType.MODULE_METHOD:
      case ReportType.MODULE:
      case ReportType.NESTED_METHOD:
      case ReportType.PROJECT:
        return formatter.formatReport(report, options);

      default:
        throw new TypeError(
          `format error: unknown report type '${report.type}'.`
        );
    }
  }

  /**
   * Returns the supported format file extension types.
   *
   * @param reportType - (Optional) A ReportType to filter supported formats.
   *
   */
  static getFormats(reportType?: ReportType): string[] {
    // Return all file extensions
    if (typeof reportType === "undefined") {
      return Array.from(s_FORMATTERS.values());
    }

    if (!(reportType instanceof ReportType)) {
      throw new TypeError(
        `getFormats error: 'reportType' is not an instance of 'ReportType'.`
      );
    }

    // Return a filtered array of formats that are supported by the given ReportType.
    return Array.from(s_FORMATTERS.values()).filter((format) =>
      format.isSupported(reportType)
    );
  }

  /**
   * Returns whether a given formatter by name is available.
   *
   * @param name - The name of the formatter: `format.name`.
   *
   */
  static isFormat(name: string): boolean {
    return s_FORMATTERS.has(name);
  }

  /**
   * Returns whether a given formatter by name is supports a given report.
   *
   * @param name - The name of the formatter: `format.name`.
   * @param reportType - A ReportType to check for support.
   *
   */
  static isSupported(name: string, reportType: ReportType): boolean {
    if (!s_FORMATTERS.has(name)) {
      return false;
    }

    return s_FORMATTERS.get(name).isSupported(reportType);
  }

  /**
   * Removes a formatter from the static Map by name.
   *
   * @param name - The name of the formatter: `format.name`.
   */
  static removeFormat(name: string) {
    s_FORMATTERS.delete(name);
  }
}

/**
 * Load all integrated format transforms.
 */
TransformFormat.addFormat(new FormatJSON());
TransformFormat.addFormat(new FormatJSONCheckstyle());
TransformFormat.addFormat(new FormatJSONMinimal());
TransformFormat.addFormat(new FormatJSONModules());
TransformFormat.addFormat(new FormatMarkdown());
TransformFormat.addFormat(new FormatMarkdownAdjacency());
TransformFormat.addFormat(new FormatMarkdownMinimal());
TransformFormat.addFormat(new FormatMarkdownModules());
TransformFormat.addFormat(new FormatMarkdownVisibility());
TransformFormat.addFormat(new FormatText());
TransformFormat.addFormat(new FormatTextAdjacency());
TransformFormat.addFormat(new FormatTextMinimal());
TransformFormat.addFormat(new FormatTextModules());
TransformFormat.addFormat(new FormatTextVisibility());
