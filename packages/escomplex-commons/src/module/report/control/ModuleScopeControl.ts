import ClassReport from "../ClassReport.js";
import ClassMethodReport from "../ClassMethodReport.js";
import ModuleMethodReport from "../ModuleMethodReport.js";
import ModuleReport from "../ModuleReport.js";

/**
 * ModuleScopeControl
 */
export default class ModuleScopeControl {
  _report: ModuleReport;
  _anonClassCntr: number;
  _anonMethodCntr: number;
  /**
   * Stores the current class report scope stack which is lazily created in `createScope`.}
   */
  _scopeStackClass: ClassReport[];
  /**
   * Stores the current method report scope stack which is lazily created in `createScope`.
   */
  _scopeStackMethod: Array<ClassMethodReport | ModuleMethodReport>;
  /**
   * Stores the current nested method report scope stack which is lazily created in `createScope`.
   */
  _scopeStackNestedMethod: Array<ClassMethodReport | ModuleMethodReport>;
  /**
   * Creates ModuleScopeControl instance with given ModuleReport.
   *
   * @param moduleReport - An associated module report.
   */
  constructor(moduleReport: ModuleReport) {
    this._report = moduleReport;
    this._anonClassCntr = 1;
    this._anonMethodCntr = 1;
    this._scopeStackClass = [];
    this._scopeStackMethod = [];
    this._scopeStackNestedMethod = [];
  }

  /**
   * Creates a report scope when a class or method is entered.
   *
   * @param newScope - An object hash defining the new scope including:
   * ```
   * (string) type - Type of report to create.
   * (string) name - Name of the class or method.
   * (number) lineStart - Start line of method.
   * (number) lineEnd - End line of method.
   * (Array<string>) paramNames - (For method scopes) An array of parameters names for method.
   * ```
   *
   */
  createScope(
    newScope: {
      type?: string;
      name?: string;
      lineStart?: number;
      lineEnd?: number;
      paramNames?: string[];
      superClassName?: string;
    } = {}
  ) {
    let report;

    if (typeof newScope !== "object") {
      throw new TypeError(`createScope error: 'newScope' is not an 'object'.`);
    }

    if (typeof newScope.type !== "string") {
      throw new TypeError(
        `createScope error: 'newScope.type' is not a 'string'.`
      );
    }

    if (typeof newScope.name !== "string") {
      throw new TypeError(
        `createScope error: 'newScope.name' is not a 'string'.`
      );
    }

    if (!Number.isInteger(newScope.lineStart)) {
      throw new TypeError(
        `createScope error: 'newScope.lineStart' is not an 'integer'.`
      );
    }

    if (!Number.isInteger(newScope.lineEnd)) {
      throw new TypeError(
        `createScope error: 'newScope.lineEnd' is not an 'integer'.`
      );
    }

    switch (newScope.type) {
      case "class": {
        // Create a specific anonymous class name if applicable.
        const className =
          newScope.name !== "<anonymous>"
            ? newScope.name
            : `<anon class-${this._anonClassCntr++}>`;

        const superClassName =
          newScope.superClassName !== "<anonymous>"
            ? newScope.superClassName
            : `<anon class-${this._anonClassCntr++}>`;

        report = new ClassReport(
          className,
          superClassName,
          newScope.lineStart,
          newScope.lineEnd
        );
        this._report.classes.push(report);
        this._scopeStackClass.push(report);
        break;
      }

      case "method": {
        if (!Array.isArray(newScope.paramNames)) {
          throw new TypeError(
            `createScope error: 'newScope.paramNames' is not an 'array'.`
          );
        }

        // Create a specific anonymous method name if applicable.
        const methodName =
          newScope.name !== "<anonymous>"
            ? newScope.name
            : `<anon method-${this._anonMethodCntr++}>`;

        // If an existing class report / scope exists also push the method to the class report.
        const classReport = this.getCurrentClassReport();

        if (classReport) {
          report = new ClassMethodReport(
            methodName,
            newScope.paramNames,
            newScope.lineStart,
            newScope.lineEnd
          );
          classReport.methods.push(report);
        } else {
          report = new ModuleMethodReport(
            methodName,
            newScope.paramNames,
            newScope.lineStart,
            newScope.lineEnd
          );

          // Add this report to the module methods as there is no current class report.
          this._report.methods.push(report);
        }

        this._scopeStackMethod.push(report);

        break;
      }

      default:
        throw new Error(
          `createScope error: Unknown scope type (${newScope.type}).`
        );
    }

    return report;
  }

  /**
   * Returns the current class report.
   */
  getCurrentClassReport(): ClassReport | undefined {
    if (!Array.isArray(this._scopeStackClass)) {
      return void 0;
    }
    return this._scopeStackClass.length > 0
      ? this._scopeStackClass[this._scopeStackClass.length - 1]
      : void 0;
  }

  /**
   * Returns the current method report.
   */
  getCurrentMethodReport(): ClassMethodReport | ModuleMethodReport | undefined {
    if (!Array.isArray(this._scopeStackMethod)) {
      return void 0;
    }
    return this._scopeStackMethod.length > 0
      ? this._scopeStackMethod[this._scopeStackMethod.length - 1]
      : void 0;
  }

  /**
   * Pops a report scope.
   *
   * @param scope - An object hash defining the scope including:
   * ```
   * (string) type - Type of report scope to pop off the stack.
   * ```
   */
  popScope(
    scope: {
      type?: string;
    } = {}
  ) {
    if (typeof scope !== "object") {
      throw new TypeError(`popScope error: 'scope' is not an 'object'.`);
    }

    if (typeof scope.type !== "string") {
      throw new TypeError(`popScope error: 'scope.type' is not a 'string'.`);
    }

    switch (scope.type) {
      case "class":
        this._scopeStackClass.pop();
        break;

      case "method":
        this._scopeStackMethod.pop();
        break;

      default:
        throw new Error(`popScope error: Unknown scope type (${scope.type}).`);
    }
  }
}
