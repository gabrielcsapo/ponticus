import ClassMethodReport from "../module/report/ClassMethodReport.js";
import ClassReport from "../module/report/ClassReport.js";
import ModuleMethodReport from "../module/report/ModuleMethodReport.js";
import ModuleReport from "../module/report/ModuleReport.js";
import ProjectReport from "../project/report/ProjectReport.js";
import ReportType from "../types/ReportType.js";

/**
 * Provides a wrapper for analysis errors stored in the `errors` array for each report type.
 */
export default class AnalyzeError {
  /**
   * Provides the line number where the error starts.
   */
  lineStart: number;
  /**
   * Provides the line number where the error starts.
   */
  lineEnd: number;
  /**
   * Provides the severity level.
   */
  severity: string;
  /**
   * Provides the error message.
   */
  message: string;
  /**
   * Attempt to find the `name` then try `srcPath` for modules.
   */
  name: string | undefined;
  /**
   * Provides a type of report where the error is found.
   */
  type: any;
  /**
   * Initializes an instance.
   *
   * @param severity - Provides the severity level.
   * @param message - Provides the error message.
   * @param sourceReport - The source report of the error.
   */
  constructor(
    severity = "<unknown>",
    message = "",
    sourceReport:
      | ClassMethodReport
      | ClassReport
      | ModuleMethodReport
      | ModuleReport
      | ProjectReport
      | undefined = void 0
  ) {
    // TODO: this is wrong, ProjectReport doesn't have lineStart or lineEnd
    this.lineStart =
      typeof sourceReport === "object" ? (sourceReport as any)?.lineStart : 0;
    this.lineEnd =
      typeof sourceReport === "object" ? (sourceReport as any).lineEnd : 0;
    this.severity = severity;
    this.message = message;
    this.name = typeof sourceReport === "object" ? sourceReport.getName() : "";
    this.type = typeof sourceReport === "object" ? sourceReport.type : void 0;
  }

  /**
   * Deserializes a JSON object representing a AnalyzeError.
   *
   * @param object - A JSON object of a AnalyzeError that was previously serialized.
   */
  static parse(object: any): AnalyzeError {
    if (typeof object !== "object") {
      throw new TypeError(`parse error: 'object' is not an 'object'.`);
    }

    const error = Object.assign(new AnalyzeError(), object);

    // Deserialize the associated enum type.
    error.type = ReportType.enumValueOf(object.type.name);

    return error;
  }

  /**
   * Returns a verbose string about the error.
   */
  toString(): string {
    return `(${this.severity}) ${this.message} @ ${this.type.description} ${
      this.name !== "" ? `- ${this.name} ` : ""
    }(${this.lineStart} - ${this.lineEnd})`;
  }
}
