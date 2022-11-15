import AbstractFormatText from "./AbstractFormatText.js";

import ReportType from "../../../types/ReportType.js";
import { SafeEntry } from "../../../utils/StringUtil.js";
import TransformFormat from "../../TransformFormat.js";
import ProjectReport from "../../../project/report/ProjectReport.js";

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting them to plain text.
 */
export default class FormatText extends AbstractFormatText {
  _adjacencyFormatName: string;
  _visibilityFormatName: string;

  /**
   * Initializes text format.
   *
   * @param headers -
   * @param keys -
   * @param adjacencyFormatName -
   * @param visibilityFormatName -
   */
  constructor(
    headers = {},
    keys = {},
    adjacencyFormatName = "text-adjacency",
    visibilityFormatName = "text-visibility"
  ) {
    super(
      Object.assign({}, s_DEFAULT_HEADERS, headers),
      Object.assign({}, s_DEFAULT_KEYS, keys)
    );

    this._adjacencyFormatName = adjacencyFormatName;
    this._visibilityFormatName = visibilityFormatName;
  }

  /**
   * Gets the file extension.
   */
  get extension() {
    return "txt";
  }

  /**
   * Gets the format name.
   */
  get name() {
    return "text";
  }

  /**
   * Gets the format type.
   */
  get type() {
    return "full";
  }

  /**
   * Returns whether a given ReportType is supported by this format transform.
   *
   * @param reportType - A given report type.
   *
   */
  isSupported(reportType: ReportType): boolean {
    switch (reportType) {
      case ReportType.CLASS:
      case ReportType.CLASS_METHOD:
      case ReportType.MODULE_METHOD:
      case ReportType.MODULE:
      case ReportType.NESTED_METHOD:
      case ReportType.PROJECT:
        return true;

      default:
        return false;
    }
  }

  /**
   * Formats a project report as plain text.
   *
   * @param projectReport - A project report.
   * @param options - (Optional) One or more optional parameters passed to the formatter.
   *
   */
  _formatProject(
    projectReport: ProjectReport,
    options: {
      classReport?: any; //An entry key found in the class report to output.
      methodReport?: any; //An entry key found in the method report to output.
      moduleReport?: any; //An entry key found in the module report to output.
    } = {}
  ) {
    let output = super._formatProject(projectReport, options);

    const localOptions = Object.assign({}, this._keys, options);

    const adjacency =
      typeof localOptions.adjacency === "boolean"
        ? localOptions.adjacency
        : true;
    const visibility =
      typeof localOptions.visibility === "boolean"
        ? localOptions.visibility
        : true;

    // Add adjacency matrix output
    if (adjacency && TransformFormat.isFormat(this._adjacencyFormatName)) {
      output += `\n\n${TransformFormat.format(
        projectReport,
        this._adjacencyFormatName,
        options
      )}`;
    }

    // Add visibility matrix output
    if (visibility && TransformFormat.isFormat(this._visibilityFormatName)) {
      output += `\n\n${TransformFormat.format(
        projectReport,
        this._visibilityFormatName,
        options
      )}`;
    }

    return output;
  }
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Provides shared method data.
 */
const s_SHARED_METHOD_DATA = [
  new SafeEntry("Line start: ", "lineStart"),
  new SafeEntry("Line end: ", "lineEnd"),
  new SafeEntry("Physical LOC: ", "sloc.physical"),
  new SafeEntry("Logical LOC: ", "sloc.logical"),
  new SafeEntry("Cyclomatic complexity: ", "cyclomatic"),
  new SafeEntry("Cyclomatic complexity density: ", "cyclomaticDensity", 1, "%"),
  new SafeEntry("Halstead difficulty: ", "halstead.difficulty"),
  new SafeEntry("Halstead volume: ", "halstead.volume"),
  new SafeEntry("Halstead effort: ", "halstead.effort"),
  new SafeEntry("Parameter count: ", "params"),
  new SafeEntry("Error: ", "errors"),
];

/**
 * Provides shared average method data.
 */
const s_SHARED_METHOD_AVERAGE_DATA = [
  new SafeEntry(
    "Average per-function physical LOC: ",
    "methodAverage.sloc.physical"
  ),
  new SafeEntry(
    "Average per-function logical LOC: ",
    "methodAverage.sloc.logical"
  ),
  new SafeEntry(
    "Average per-function cyclomatic complexity: ",
    "methodAverage.cyclomatic"
  ),
  new SafeEntry(
    "Average per-function cyclomatic density: ",
    "methodAverage.cyclomaticDensity",
    1,
    "%"
  ),
  new SafeEntry(
    "Average per-function halstead difficulty: ",
    "methodAverage.halstead.difficulty"
  ),
  new SafeEntry(
    "Average per-function halstead volume: ",
    "methodAverage.halstead.volume"
  ),
  new SafeEntry(
    "Average per-function halstead effort: ",
    "methodAverage.halstead.effort"
  ),
];

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 */
const s_DEFAULT_KEYS = {
  classMethod: [...s_SHARED_METHOD_DATA],

  classReport: [
    new SafeEntry("Line start: ", "lineStart"),
    new SafeEntry("Line end: ", "lineEnd"),
    ...s_SHARED_METHOD_AVERAGE_DATA,
    new SafeEntry("Error: ", "errors"),
  ],

  methodReport: [...s_SHARED_METHOD_DATA],

  moduleReport: [
    new SafeEntry("Total lines: ", "lineEnd"),
    new SafeEntry("Maintainability index: ", "maintainability"),
    new SafeEntry("Dependency count: ", "dependencies.length"),
    ...s_SHARED_METHOD_AVERAGE_DATA,
    new SafeEntry("Error: ", "errors"),
  ],

  projectReport: [
    new SafeEntry("First-order density: ", "firstOrderDensity", 1, "%"),
    new SafeEntry("Change cost: ", "changeCost", 1, "%"),
    new SafeEntry("Core size: ", "coreSize", 1, "%"),
    new SafeEntry(
      "Average per-module maintainability index: ",
      "moduleAverage.maintainability"
    ),
    new SafeEntry(
      "Average per-function physical LOC: ",
      "moduleAverage.methodAverage.sloc.physical"
    ),
    new SafeEntry(
      "Average per-function logical LOC: ",
      "moduleAverage.methodAverage.sloc.logical"
    ),
    new SafeEntry(
      "Average per-function parameter count: ",
      "moduleAverage.methodAverage.params"
    ),
    new SafeEntry(
      "Average per-function cyclomatic complexity: ",
      "moduleAverage.methodAverage.cyclomatic"
    ),
    new SafeEntry(
      "Average per-function halstead difficulty: ",
      "moduleAverage.methodAverage.halstead.difficulty"
    ),
    new SafeEntry(
      "Average per-function halstead effort: ",
      "moduleAverage.methodAverage.halstead.effort"
    ),
    new SafeEntry("Error: ", "errors"),
  ],
};

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 */
const s_DEFAULT_HEADERS = {
  classMethod: ["\n", new SafeEntry("Class method: ", "name")],

  classReport: ["\n", new SafeEntry("Class: ", "name")],

  entryPrepend: "",

  moduleMethod: ["\n", new SafeEntry("Module method: ", "name")],

  moduleReport: [
    "\n",
    new SafeEntry("Module ", "___modulecntrplus1___", 1, ":"),
    new SafeEntry("   File path: ", "filePath"),
    new SafeEntry("   Source path: ", "srcPath"),
    new SafeEntry("   Source alias: ", "srcPathAlias"),
  ],

  projectReport: ["Project: \n"],
};
