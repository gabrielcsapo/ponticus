import type { Plugin, PluginOptions } from '@ponticus/types';
import { PlatformPath } from 'path';
import { PluginManager } from "@ponticus/plugin-manager";

import { PluginMetricsProject } from "@ponticus/escomplex-plugin-metrics-project";
import { ProjectReport } from "@ponticus/escomplex-commons";

/**
 * Provides a wrapper around PluginManager for ESComplexProject. Several convenience methods for the plugin callbacks
 * properly manage and or create initial data that are processed by the plugins.
 *
 * The default plugins loaded include:
 * @see PluginMetricsProject
 * @link https://www.npmjs.com/package/@ponticus/escomplex-plugin-metrics-project
 */
export default class Plugins implements Plugin {

  /**
   * Provides a generic plugin manager for dispatching events to module plugins.
   * @type {PluginManager}
   * @private
   */
  #pluginManager: PluginManager;

  /**
   * Initializes Plugins.
   *
   * @param {object}   options - module options including user plugins to load including:
   * ```
   * (boolean)         loadDefaultPlugins - When false ESComplexProject will not load any default plugins.
   * (Array<Object>)   plugins - A list of ESComplexProject plugins that have already been instantiated.
   * ```
   */
  constructor(options: PluginOptions = {
    loadDefaultPlugins: false,
    plugins: []
  }) {

    this.#pluginManager = new PluginManager();

    if (!options.loadDefaultPlugins) {
      /* nop */
    } else {
      this.#pluginManager.add({
        name: "@ponticus/escomplex-plugin-metrics-project",
        instance: new PluginMetricsProject(),
      });
    }
  }

  /**
   * Initializes the default `settings` object hash and then invokes the `onConfigure` plugin callback for all loaded
   * plugins.
   *
   * @param {object} options - (Optional) project processing options.
   *
   * @returns {object}
   */
  onConfigure(options: any /* ProjectOptions */) {
    /**
     * Default settings with potential user override of `serializeModules` and `skipCalculation`.
     * @type {{serializeModules: boolean, skipCalculation: boolean}}
     */
    const settings = {
      // @ts-ignore
      serializeModules: typeof options.serializeModules === "boolean" ? options.serializeModules : true,
      // @ts-ignore
      skipCalculation: typeof options.skipCalculation === "boolean" ? options.skipCalculation : false,
    };

    const event = this.#pluginManager.invokeSyncEvent("onConfigure", {
      options,
      settings,
    });
    return event?.settings ?? settings;
  }

  /**
   * Invokes the `onProjectAverage` plugin callback for all loaded plugins such they might average any calculated
   * results.
   *
   * @param {ProjectReport}  projectReport - An instance of ProjectReport.
   * @param {object}         pathModule - Provides an object which matches the Node path module.
   * @param {object}         settings - Settings for project processing.
   *
   * @returns {ProjectReport}
   */
  onProjectAverage(projectReport: ProjectReport, pathModule: PlatformPath, settings: any) {
    const event = this.#pluginManager.invokeSyncEvent(
      "onProjectAverage",
      void 0,
      { projectReport, pathModule, settings }
    );

    return event?.projectReport ?? projectReport;
  }

  /**
   * Invokes the `onProjectCalculate` plugin callback for all loaded plugins such they might finish calculating
   * results.
   *
   * @param {ProjectReport}  projectReport - An instance of ProjectReport.
   * @param {object}         pathModule - Provides an object which matches the Node path module.
   * @param {object}         settings - Settings for project processing.
   *
   * @returns {ProjectReport}
   */
  onProjectCalculate(projectReport: ProjectReport, pathModule: PlatformPath, settings: any) {
    const event = this.#pluginManager.invokeSyncEvent(
      "onProjectCalculate",
      void 0,
      { projectReport, pathModule, settings }
    );

    return event?.projectReport ?? projectReport;
  }

  /**
   * Invokes the `onProjectEnd` plugin callback for all loaded plugins at the end of module processing.
   *
   * @param {ProjectReport}  projectReport - An instance of ProjectReport.
   * @param {object}         pathModule - Provides an object which matches the Node path module.
   * @param {object}         settings - Settings for project processing.
   *
   * @returns {ProjectReport}
   */
  onProjectEnd(projectReport: ProjectReport, pathModule: PlatformPath, settings: any) {
    const event = this.#pluginManager.invokeSyncEvent("onProjectEnd", void 0, {
      projectReport,
      pathModule,
      settings,
    });

    return event?.projectReport ?? projectReport;
  }

  /**
   * Invokes the `onProjectPostAverage` plugin callback for all loaded plugins such they might finish any calculations
   * that involve averaged results.
   *
   * @param {ProjectReport}  projectReport - An instance of ProjectReport.
   * @param {object}         pathModule - Provides an object which matches the Node path module.
   * @param {object}         settings - Settings for project processing.
   *
   * @returns {ProjectReport}
   */
  onProjectPostAverage(projectReport: ProjectReport, pathModule: PlatformPath, settings: any) {
    const event = this.#pluginManager.invokeSyncEvent(
      "onProjectPostAverage",
      void 0,
      { projectReport, pathModule, settings }
    );

    return event?.projectReport ?? projectReport;
  }

  /**
   * Initializes the default `report` object hash and then invokes the `onProjectStart` plugin callback for all loaded
   * plugins.
   *
   * @param {object}   pathModule - Provides an object which matches the Node path module.
   * @param {object}   settings - Settings for project processing.
   */
  onProjectStart(pathModule: PlatformPath, settings: any) {
    this.#pluginManager.invokeSyncEvent("onProjectStart", void 0, {
      pathModule,
      settings,
    });
  }
}
