import ModuleMetricAverage from "./ModuleMetricAverage.js";
import ModuleMetricCalculate from "./ModuleMetricCalculate.js";
import ModuleMetricPostAverage from "./ModuleMetricPostAverage.js";
import ModuleMetricProcess from "./ModuleMetricProcess.js";

/**
 * Provides a typhonjs-escomplex-module / ESComplexModule plugin which gathers and calculates all default metrics.
 *
 * @see https://www.npmjs.com/package/@ponticus/escomplex-commons
 * @see https://www.npmjs.com/package/typhonjs-escomplex-module
 */
export default class PluginMetricsModule {
  /**
   * Loads any default settings that are not already provided by any user options.
   *
   * @param {object}   ev - escomplex plugin event data.
   *
   * The following options are:
   * ```
   * (boolean)   newmi - Boolean indicating whether the maintainability index should be rebased on a scale from
   *                     0 to 100; defaults to false.
   * ```
   */
  onConfigure(ev) {
    ev.data.settings.newmi =
      typeof ev.data.options.newmi === "boolean"
        ? ev.data.options.newmi
        : false;
  }

  /**
   * During AST traversal when a node is entered it is processed immediately if the node type corresponds to a
   * loaded trait syntax. This is the main metric capture and processing location.
   *
   * @param {object}   ev - escomplex plugin event data.
   */
  onEnterNode(ev) {
    const moduleReport = ev.data.moduleReport;
    const scopeControl = ev.data.scopeControl;
    const node = ev.data.node;
    const parent = ev.data.parent;
    const syntax = ev.data.syntaxes[node.type];

    // Process node syntax.
    if (typeof syntax === "object") {
      ModuleMetricProcess.processSyntax(
        moduleReport,
        scopeControl,
        syntax,
        node,
        parent
      );
    }
  }

  /**
   * Performs average calculations based on collected report data.
   *
   * @param {object}   ev - escomplex plugin event data.
   */
  onModuleAverage(ev) {
    ModuleMetricAverage.calculate(ev.data.moduleReport);
  }

  /**
   * Performs initial calculations based on collected report data.
   *
   * @param {object}   ev - escomplex plugin event data.
   */
  onModuleCalculate(ev) {
    ModuleMetricCalculate.calculate(ev.data.moduleReport);
  }

  /**
   * Performs any calculations that depend on averaged data. This is where the maintainability index is calculated.
   *
   * @param {object}   ev - escomplex plugin event data.
   */
  onModulePostAverage(ev) {
    ModuleMetricPostAverage.calculate(ev.data.moduleReport, ev.data.settings);
  }

  /**
   * A new module report scope has been created. Update any associated metrics processing regarding the new scope.
   *
   * @param {object}   ev - escomplex plugin event data.
   */
  onModulePostScopeCreated(ev) {
    ModuleMetricProcess.postScopeCreated(
      ev.data.moduleReport,
      ev.data.scopeControl,
      ev.data.newScope
    );
  }

  /**
   * A new module report scope has been created. Update any associated metrics processing regarding the new scope.
   *
   * @param {object}   ev - escomplex plugin event data.
   */
  onModulePreScopeCreated(ev) {
    ModuleMetricProcess.preScopeCreated(
      ev.data.moduleReport,
      ev.data.scopeControl,
      ev.data.newScope,
      ev.data.node,
      ev.data.parent
    );
  }
}
