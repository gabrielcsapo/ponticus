import { ASTWalker } from "@ponticus/ast-walker";
import {
  type ModuleReport,
  ModuleScopeControl,
} from "@ponticus/escomplex-commons";

import {
  ComplexityReporterOptions,
  DefaultComplexityReporterOptions,
} from "@ponticus/types";

import { type File } from "@babel/types";

import Plugins from "@ponticus/escomplex-module/Plugins";

/**
 * Provides a runtime to invoke ESComplexModule plugins for processing / metrics calculations of independent modules.
 */
export default class ESComplexModule {
  /**
   * Provides dispatch methods to all module plugins.
   * @internal
   */
  _plugins: Plugins;

  /**
   * Initializes ESComplexModule.
   *
   * @param options - module options including user plugins to load including:
   */
  constructor(
    options: { loadDefaultPlugins: boolean; plugins: Plugins[] } = {
      loadDefaultPlugins: true,
      plugins: [],
    }
  ) {
    /* istanbul ignore if */
    if (typeof options !== "object") {
      throw new TypeError("ctor error: `options` is not an `object`.");
    }

    this._plugins = new Plugins(options);
  }

  /**
   * Processes the given ast and calculates metrics via plugins.
   *
   * @param ast - Javascript AST.
   * @param options - (Optional) module analyze options.
   *
   * @returns A single module report.
   */
  analyze(
    ast: File,
    options: ComplexityReporterOptions = DefaultComplexityReporterOptions
  ): ModuleReport {
    if (typeof ast !== "object" || Array.isArray(ast)) {
      throw new TypeError(
        "analyze error: `ast` is not an `object` or `array`."
      );
    }

    /* istanbul ignore if */
    if (typeof options !== "object") {
      throw new TypeError("analyze error: `options` is not an `object`.");
    }

    const settings = this._plugins.onConfigure(options);

    const syntaxes = this._plugins.onLoadSyntax(settings);

    const moduleReport = this._plugins.onModuleStart(ast, syntaxes, settings);

    const scopeControl = new ModuleScopeControl(moduleReport);

    // Completely traverse the provided AST and defer to plugins to process node traversal.
    new ASTWalker().traverse(ast, {
      enterNode: (node: any, parent: any) => {
        const syntax = syntaxes[node.type];

        // Process node syntax / ignore keys.
        let ignoreKeys =
          typeof syntax === "object" && syntax.ignoreKeys
            ? syntax.ignoreKeys.valueOf(node, parent)
            : [];

        ignoreKeys = this._plugins.onEnterNode(
          moduleReport,
          scopeControl,
          ignoreKeys,
          syntaxes,
          settings,
          node,
          parent
        );

        // Process node syntax / create scope.
        if (typeof syntax === "object") {
          if (syntax.newScope) {
            const newScope = syntax.newScope.valueOf(node, parent);

            if (newScope) {
              this._plugins.onModulePreScopeCreated(
                moduleReport,
                scopeControl,
                newScope,
                settings,
                node,
                parent
              );

              scopeControl.createScope(newScope);

              this._plugins.onModulePostScopeCreated(
                moduleReport,
                scopeControl,
                newScope,
                settings,
                node,
                parent
              );
            }
          }
        }

        return ignoreKeys;
      },

      exitNode: (node: any, parent: any) => {
        const syntax = syntaxes[node.type];

        // Process node syntax / pop scope.
        if (typeof syntax === "object" && syntax.newScope) {
          const newScope = syntax.newScope.valueOf(node, parent);

          if (newScope) {
            this._plugins.onModulePreScopePopped(
              moduleReport,
              scopeControl,
              newScope,
              settings,
              node,
              parent
            );

            scopeControl.popScope(newScope);

            this._plugins.onModulePostScopePopped(
              moduleReport,
              scopeControl,
              newScope,
              settings,
              node,
              parent
            );
          }
        }

        return this._plugins.onExitNode(
          moduleReport,
          scopeControl,
          syntaxes,
          settings,
          node,
          parent
        );
      },
    });

    // Allow all plugins to have a calculation pass at the module report.
    this._plugins.onModuleCalculate(moduleReport, syntaxes, settings);

    // Allow all plugins to have a pass at the module report to calculate any averaged data.
    this._plugins.onModuleAverage(moduleReport, syntaxes, settings);

    // Allow all plugins to have a pass at the module report to calculate any metrics that depend on averaged data.
    this._plugins.onModulePostAverage(moduleReport, syntaxes, settings);

    // Allow all plugins to clean up any resources as necessary.
    this._plugins.onModuleEnd(moduleReport, syntaxes, settings);

    return moduleReport.finalize();
  }

  // Asynchronous Promise based methods ----------------------------------------------------------------------------

  /**
   * Wraps in a Promise processing the given ast and calculates metrics via plugins.
   *
   * @param ast - Javascript AST.
   * @param options - (Optional) module analyze options.
   *
   * @returns A single module report.
   */
  analyzeAsync(ast: File, options): Promise<ModuleReport> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.analyze(ast, options));
      } catch (err) {
        /* istanbul ignore next */ reject(err);
      }
    });
  }
}
