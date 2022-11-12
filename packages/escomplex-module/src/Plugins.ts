// @ts-ignore
import { PluginMetricsModule } from "@ponticus/escomplex-plugin-metrics-module";
// @ts-ignore
import { PluginSyntaxBabylon } from "@ponticus/escomplex-plugin-syntax-babylon";
// @ts-ignore
import { ModuleReport } from "@ponticus/escomplex-commons";
// TODO: import ModuleScopeControl from escomplex-commons
type ModuleScopeControl = any;
// @ts-ignore
import { PluginManager } from "@ponticus/plugin-manager";

type Scope = {
  /**
   * Type of report to create
   */
  type: string;
  /**
   * Name of the class or method
   */
  name: string;
  /**
   * Start line of method
   */
  lineStart: number;
  /**
   *  End line of method
   */
  lineEnd: number;
  /**
   * (For method scopes) Number of parameters for method
   */
  paramCount: number;
};

/**
 * Provides a wrapper around PluginManager for ESComplexModule. Several convenience methods for the plugin callbacks
 * properly manage and or create initial data that are processed by the plugins.
 *
 * The default plugins loaded include:
 * @see https://www.npmjs.com/package/escomplex-plugin-metrics-module
 * @see https://www.npmjs.com/package/escomplex-plugin-syntax-babylon
 */
export default class Plugins {
  /**
   * Provides a generic plugin manager for dispatching events to module plugins.
   * @internal
   */
  _pluginManager: PluginManager;

  /**
   * Initializes Plugins.
   *
   * @param options - module options including user plugins to load including:
   * ```
   * (boolean)         loadDefaultPlugins - When false ESComplexModule will not load any default plugins.
   * (Array<Object>)   plugins - A list of ESComplexModule plugins that have already been instantiated.
   * ```
   */
  constructor(
    options: { loadDefaultPlugins: boolean } = {
      loadDefaultPlugins: false,
    }
  ) {
    this._pluginManager = new PluginManager();

    if (
      typeof options.loadDefaultPlugins === "boolean" &&
      !options.loadDefaultPlugins
    ) {
      /* nop */
    } else {
      this._pluginManager.add({
        name: "escomplex-plugin-syntax-babylon",
        instance: new PluginSyntaxBabylon(),
      });
      this._pluginManager.add({
        name: "escomplex-plugin-metrics-module",
        instance: new PluginMetricsModule(),
      });
    }
  }

  /**
   * Initializes the default `settings` object hash and then invokes the `onConfigure` plugin callback for all loaded
   * plugins.
   *
   * @param options - (Optional) module processing options.
   *
   */
  onConfigure(options: any) {
    let settings = {};
    const event = this._pluginManager.invokeSyncEvent("onConfigure", void 0, {
      options,
      settings,
    });

    settings = event !== null ? event.settings : settings;
    Object.freeze(settings);
    return event !== null ? event.settings : settings;
  }

  /**
   * Invokes the `onEnterNode` plugin callback during AST traversal when a node is entered.
   *
   * @param moduleReport - The ModuleReport being processed.
   * @param scopeControl - The associated module report scope control.
   * @param ignoreKeys - Any syntax assigned ignore keys for AST traversal.
   * @param syntaxes - All loaded trait syntaxes for AST nodes.
   * @param settings - Settings for module processing.
   * @param node - The node being entered.
   * @param parent - The parent node of the node being entered.
   *
   * @returns A directive indicating children keys to be skipped or if null all keys entirely.
   */
  onEnterNode(
    moduleReport: ModuleReport,
    scopeControl: ModuleScopeControl,
    ignoreKeys: string[],
    syntaxes,
    settings,
    node,
    parent
  ): string[] | null {
    const event = this._pluginManager.invokeSyncEvent("onEnterNode", void 0, {
      moduleReport,
      scopeControl,
      ignoreKeys,
      syntaxes,
      settings,
      node,
      parent,
    });

    return event !== null ? event.ignoreKeys : [];
  }

  /**
   * Invokes the `onExitNode` plugin callback during AST traversal when a node is exited.
   *
   * @param moduleReport - The ModuleReport being processed.
   * @param scopeControl - The associated module report scope control.
   * @param syntaxes - All loaded trait syntaxes for AST nodes.
   * @param settings - Settings for module processing.
   * @param node - The node being entered.
   * @param parent - The parent node of the node being entered.
   */
  onExitNode(
    moduleReport: ModuleReport,
    scopeControl: ModuleScopeControl,
    syntaxes,
    settings,
    node,
    parent
  ) {
    this._pluginManager.invokeSyncEvent("onExitNode", void 0, {
      moduleReport,
      scopeControl,
      syntaxes,
      settings,
      node,
      parent,
    });
  }

  /**
   * Initializes the trait `syntaxes` object hash and then invokes the `onLoadSyntax` plugin callback for all loaded
   * plugins.
   *
   * @param settings - Settings for module processing.
   *
   * @returns Loaded trait `syntaxes` for AST nodes.
   */
  onLoadSyntax(settings: any) {
    const syntaxes = {};
    const event = this._pluginManager.invokeSyncEvent("onLoadSyntax", void 0, {
      settings,
      syntaxes,
    });
    return event !== null ? event.syntaxes : syntaxes;
  }

  /**
   * Initializes the default ModuleReport and then invokes the `onModuleStart` plugin callback for all loaded plugins.
   *
   * @param ast - Settings for module processing.
   * @param syntaxes - All loaded trait syntaxes for AST nodes.
   * @param settings - Settings for module processing.
   *
   * @returns The ModuleReport being processed.
   */
  onModuleStart(ast, syntaxes, settings): ModuleReport {
    const moduleReport = new ModuleReport(
      ast.loc.start.line,
      ast.loc.end.line,
      settings
    );
    this._pluginManager.invokeSyncEvent("onModuleStart", void 0, {
      ast,
      moduleReport,
      syntaxes,
      settings,
    });
    return moduleReport;
  }

  /**
   * Invokes the `onModuleAverage` plugin callback for all loaded plugins such they might average any calculated
   * results.
   *
   * @param moduleReport - The ModuleReport being processed.
   * @param syntaxes - All loaded trait syntaxes for AST nodes.
   * @param settings - Settings for module processing.
   *
   * @returns The ModuleReport being processed.
   */
  onModuleAverage(
    moduleReport: ModuleReport,
    syntaxes,
    settings
  ): ModuleReport {
    this._pluginManager.invokeSyncEvent("onModuleAverage", void 0, {
      moduleReport,
      syntaxes,
      settings,
    });
    return moduleReport;
  }

  /**
   * Invokes the `onModuleCalculate` plugin callback for all loaded plugins such they might finish calculating results.
   *
   * @param moduleReport - The ModuleReport being processed.
   * @param syntaxes - All loaded trait syntaxes for AST nodes.
   * @param settings - Settings for module processing.
   *
   * @returns The ModuleReport being processed.
   */
  onModuleCalculate(
    moduleReport: ModuleReport,
    syntaxes,
    settings
  ): ModuleReport {
    this._pluginManager.invokeSyncEvent("onModuleCalculate", void 0, {
      moduleReport,
      syntaxes,
      settings,
    });
    return moduleReport;
  }

  /**
   * Invokes the `onModuleEnd` plugin callback for all loaded plugins at the end of module processing.
   *
   * @param moduleReport - The ModuleReport being processed.
   * @param syntaxes - All loaded trait syntaxes for AST nodes.
   * @param settings - Settings for module processing.
   *
   * @returns The ModuleReport being processed.
   */
  onModuleEnd(moduleReport: ModuleReport, syntaxes, settings): ModuleReport {
    this._pluginManager.invokeSyncEvent("onModuleEnd", void 0, {
      moduleReport,
      syntaxes,
      settings,
    });
    return moduleReport;
  }

  /**
   * Invokes the `onModulePostAverage` plugin callback for all loaded plugins such they might finish any calculations
   * that involve averaged results.
   *
   * @param moduleReport - The ModuleReport being processed.
   * @param syntaxes - All loaded trait syntaxes for AST nodes.
   * @param settings - Settings for module processing.
   *
   * @returns The ModuleReport being processed.
   */
  onModulePostAverage(
    moduleReport: ModuleReport,
    syntaxes,
    settings
  ): ModuleReport {
    this._pluginManager.invokeSyncEvent("onModulePostAverage", void 0, {
      moduleReport,
      syntaxes,
      settings,
    });
    return moduleReport;
  }

  /**
   * Invokes the `onModulePostScopeCreated` plugin callback during AST traversal after a new module report scope is
   * created.
   *
   * @param moduleReport - The ModuleReport being processed.
   * @param scopeControl - The associated module report scope control.
   * @param newScope - An object hash defining the new scope including:
   * @param settings - Settings for module processing.
   * @param node - The node being entered.
   * @param parent - The parent node of the node being entered.
   */
  onModulePostScopeCreated(
    moduleReport: ModuleReport,
    scopeControl: ModuleScopeControl,
    newScope: Scope,
    settings,
    node,
    parent
  ) {
    this._pluginManager.invokeSyncEvent("onModulePostScopeCreated", void 0, {
      moduleReport,
      scopeControl,
      newScope,
      settings,
      node,
      parent,
    });
  }

  /**
   * Invokes the `onModulePostScopePopped` plugin callback during AST traversal after a module report scope is
   * popped / exited.
   *
   * @param moduleReport - The ModuleReport being processed.
   * @param scopeControl - The associated module report scope control.
   * @param scope - An object hash defining the new scope including:
   * @param settings - Settings for module processing.
   * @param node - The node being entered.
   * @param parent - The parent node of the node being entered.
   */
  onModulePostScopePopped(
    moduleReport: ModuleReport,
    scopeControl: ModuleScopeControl,
    scope: Scope,
    settings,
    node,
    parent
  ) {
    this._pluginManager.invokeSyncEvent("onModulePostScopePopped", void 0, {
      moduleReport,
      scopeControl,
      scope,
      settings,
      node,
      parent,
    });
  }

  /**
   * Invokes the `onModulePreScopeCreated` plugin callback during AST traversal before a new module report scope is
   * created.
   *
   * @param moduleReport - The ModuleReport being processed.
   * @param scopeControl - The associated module report scope control.
   * @param newScope - An object hash defining the new scope including:
   * @param settings - Settings for module processing.
   * @param node - The node being entered.
   * @param parent - The parent node of the node being entered.
   */
  onModulePreScopeCreated(
    moduleReport: ModuleReport,
    scopeControl: ModuleScopeControl,
    newScope: Scope,
    settings,
    node,
    parent
  ) {
    this._pluginManager.invokeSyncEvent("onModulePreScopeCreated", void 0, {
      moduleReport,
      scopeControl,
      newScope,
      settings,
      node,
      parent,
    });
  }

  /**
   * Invokes the `onModulePreScopePopped` plugin callback during AST traversal before a module report scope is
   * popped / exited.
   *
   * @param moduleReport - The ModuleReport being processed.
   * @param scopeControl - The associated module report scope control.
   * @param scope - An object hash defining the new scope including:
   * @param settings - Settings for module processing.
   * @param node - The node being entered.
   * @param parent - The parent node of the node being entered.
   */
  onModulePreScopePopped(
    moduleReport: ModuleReport,
    scopeControl: ModuleScopeControl,
    scope: Scope,
    settings,
    node,
    parent
  ) {
    this._pluginManager.invokeSyncEvent("onModulePreScopePopped", void 0, {
      moduleReport,
      scopeControl,
      scope,
      settings,
      node,
      parent,
    });
  }
}
