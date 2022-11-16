import Enum from "../utils/Enum.js";

/**
 * Defines ReportType enum.
 */
class ReportType extends Enum {
  static CLASS_METHOD: any;
  static CLASS: Enum;
  static MODULE_METHOD: any;
  static MODULE: Enum;
  static NESTED_METHOD: ReportType;
  static PROJECT: Enum;
}

ReportType.initEnum({
  CLASS: { description: "Class" },
  CLASS_METHOD: { description: "Class Method" },
  MODULE_METHOD: { description: "Module Method" },
  MODULE: { description: "Module" },
  NESTED_METHOD: { description: "Nested Method" },
  PROJECT: { description: "Project" },
});

export default ReportType;
