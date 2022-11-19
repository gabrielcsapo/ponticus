import { PlatformPath } from 'path';
import { ESComplexModule } from "@ponticus/escomplex-module";
import { ModuleReport, ProjectReport } from "@ponticus/escomplex-commons";

import Plugins, { PluginOptions } from "./Plugins";

export interface ProjectOptions {
  module: PluginOptions;
  project: PluginOptions;
}

/**
 * Provides a runtime to invoke ESComplexProject plugins for processing / metrics calculations of projects.
 */
export default class ESComplexProject {
  /**
   * Stores a module which matches the NodeJS path module API.
   */
  #pathModule: PlatformPath;

  /**
   * Provides dispatch methods to all module plugins.
   * @type {Plugins}
   * @private
   */
  #plugins: Plugins;

  /**
     * Stores the ESComplexModule instance used for generating module reports.
     * @type {ESComplexModule}
     * @private
     */
  #escomplexModule: ESComplexModule;

  /**
   * Initializes ESComplexProject.
   *
   * @param {PlatformPath} pathModule - Provides an object which matches the Node path module. In particular the following
   *                                entries must be provided:
   * ```
   * (string)    sep - Provides the platform-specific path segment separator: `/` on POSIX & `\` on Windows.
   *
   * (function)  dirname - Returns the directory name of a path, similar to the Unix dirname command.
   *
   * (function)  extname - Returns the extension of the path, from the last occurance of the . (period) character to
   *                       end of string in the last portion of the path.
   *
   * (function)  relative - Returns the relative path from from to to.
   *
   * (function)  resolve - Resolves a sequence of paths or path segments into an absolute path.
   * ```
   *
   * @param {ProjectOptions}   options - module and project options including user plugins to load including:
   * ```
   * (object)             module - Provides an object hash of the following options for the module runtime:
   *    (boolean)         loadDefaultPlugins - When false ESComplexModule will not load any default plugins.
   *    (Array<Object>)   plugins - A list of ESComplexModule plugins that have already been instantiated.
   *
   * (object)             project - Provides an object hash of the following options for the project runtime:
   *    (boolean)         loadDefaultPlugins - When false ESComplexProject will not load any default plugins.
   *    (Array<Object>)   plugins - A list of ESComplexProject plugins that have already been instantiated.
   * ```
   *
   * @see https://nodejs.org/api/path.html
   */
  constructor(pathModule: PlatformPath, options: ProjectOptions = {
    module: {
      loadDefaultPlugins: true,
      plugins: [],
    },
    project: {
      loadDefaultPlugins: true,
      plugins: [],
    },
  }) {
    // Verify essential Node path module API.
    /* istanbul ignore if */
    if (typeof pathModule !== "object") {
      throw new TypeError("ctor error: `pathModule` is not an `object`.");
    }

    /* istanbul ignore if */
    if (typeof pathModule.sep !== "string") {
      throw new TypeError("ctor error: `pathModule.sep` is not a `string`.");
    }

    /* istanbul ignore if */
    if (typeof pathModule.dirname !== "function") {
      throw new TypeError(
        "ctor error: `pathModule.dirname` is not a `function`."
      );
    }

    /* istanbul ignore if */
    if (typeof pathModule.extname !== "function") {
      throw new TypeError(
        "ctor error: `pathModule.extname` is not a `function`."
      );
    }

    /* istanbul ignore if */
    if (typeof pathModule.relative !== "function") {
      throw new TypeError(
        "ctor error: `pathModule.relative` is not a `function`."
      );
    }

    /* istanbul ignore if */
    if (typeof pathModule.resolve !== "function") {
      throw new TypeError(
        "ctor error: `pathModule.resolve` is not a `function`."
      );
    }

    /* istanbul ignore if */
    if (typeof options !== "object") {
      throw new TypeError("ctor error: `options` is not an `object`.");
    }

    this.#pathModule = pathModule;

    this.#plugins = new Plugins(options.project);

    // @ts-ignore
    this.#escomplexModule = new ESComplexModule(options.module);
  }

  /**
   * Processes the given modules and calculates project metrics via plugins.
   *
   * @param {Array<object>}  modules - Array of object hashes containing `ast` and `srcPath` entries. Optionally
   *                                   `srcPathAlias` and `filePath` entries may also be provided.
   *
   * @param {object}         options - (Optional) project processing options.
   *
   * @returns {ProjectReport}
   */
  // @ts-ignore
  analyze(modules: any[], options: ProjectOptions = {}) {
    if (!Array.isArray(modules)) {
      throw new TypeError("analyze error: `modules` is not an `array`.");
    }

    /* istanbul ignore if */
    if (typeof options !== "object") {
      throw new TypeError("analyze error: `options` is not an `object`.");
    }

    const settings = this.#plugins.onConfigure(options);

    this.#plugins.onProjectStart(this.#pathModule, settings);

    const moduleReports = modules.map((m) => {
      let moduleReport;

      if (typeof m.srcPath !== "string" || m.srcPath === "") {
        throw new Error("analyze error: Invalid `srcPath`");
      }

      try {
        moduleReport = this.#escomplexModule.analyze(m.ast, options);

        // Set any supplied filePath / srcPath / srcPathAlias data.
        moduleReport.filePath = m.filePath;
        moduleReport.srcPath = m.srcPath;
        moduleReport.srcPathAlias = m.srcPathAlias;

        return moduleReport;
      } catch (error) {
        if (error instanceof Error) {
          // Include the module srcPath to distinguish the actual offending entry.

          /* istanbul ignore next */
          error.message = `${m.srcPath}: ${error.message}`;
        }

        /* istanbul ignore next */
        throw error;
      }
    }, []);

    const projectReport = new ProjectReport(moduleReports, settings);

    if (settings.skipCalculation) {
      return projectReport;
    }

    // Allow all plugins to have a calculation pass at the project report.
    this.#plugins.onProjectCalculate(projectReport, this.#pathModule, settings);

    // Allow all plugins to have a pass at the project report to calculate any averaged data.
    this.#plugins.onProjectAverage(projectReport, this.#pathModule, settings);

    // Allow all plugins to have a pass at the project report to calculate any metrics that depend on averaged data.
    this.#plugins.onProjectPostAverage(
      projectReport,
      this.#pathModule,
      settings
    );

    // Allow all plugins to clean up any resources as necessary.
    this.#plugins.onProjectEnd(projectReport, this.#pathModule, settings);

    return projectReport.finalize();
  }

  /**
   * Processes an existing ProjectReport instance and calculates metrics via plugins.
   *
   * @param {ProjectReport}  projectReport - An instance of ProjectReport with a `modules` entry that is an Array of
   *                                         ModuleReports.
   *
   * @param {object}         options - (Optional) project processing options.
   *
   * @returns {ProjectReport}
   */
  process(projectReport: ProjectReport, options = {}) {
    /* istanbul ignore if */
    if (!(projectReport instanceof ProjectReport)) {
      throw new TypeError(
        "process error: `projectReport` is not an instance of ProjectReport."
      );
    }

    /* istanbul ignore if */
    if (typeof options !== "object") {
      throw new TypeError("process error: `options` is not an `object`.");
    }

    /* istanbul ignore if */
    if (
      projectReport.modules.length > 0 &&
      !(projectReport.modules[0] instanceof ModuleReport)
    ) {
      throw new TypeError(
        "process error: `projectReport.modules` does not appear to contain `ModuleReport` entries."
      );
    }

    const settings = this.#plugins.onConfigure(options);

    // Override any stored settings given new options / settings set during processing reports.
    projectReport.settings = settings;

    this.#plugins.onProjectStart(this.#pathModule, settings);

    // Allow all plugins to have a calculation pass at the project report.
    this.#plugins.onProjectCalculate(projectReport, this.#pathModule, settings);

    // Allow all plugins to have a pass at the project report to calculate any averaged data.
    this.#plugins.onProjectAverage(projectReport, this.#pathModule, settings);

    // Allow all plugins to have a pass at the project report to calculate any metrics that depend on averaged data.
    this.#plugins.onProjectPostAverage(
      projectReport,
      this.#pathModule,
      settings
    );

    // Allow all plugins to clean up any resources as necessary.
    this.#plugins.onProjectEnd(projectReport, this.#pathModule, settings);

    return projectReport.finalize();
  }

  // Asynchronous Promise based methods ----------------------------------------------------------------------------

  /**
   * Wraps in a Promise processing the given modules and calculates metrics via plugins.
   *
   * @param {Array<object>}  modules - Array of object hashes containing `ast` and `srcPath` entries. Optionally
   *                                   `srcPathAlias` and `filePath` entries may also be provided.
   *
   * @param {object}         options - project processing options
   *
   * @returns {Promise<ProjectReport>}
   */
  analyzeAsync(modules: any[], options = {}) {
    return new Promise((resolve, reject) => {
      try {
        // @ts-ignore
        resolve(this.analyze(modules, options));
      } catch (err) {
        /* istanbul ignore next */ reject(err);
      }
    });
  }

  /**
   * Wraps in a Promise processing of existing ProjectReport instance and calculates metrics via plugins.
   *
   * @param {ProjectReport}  projectReport - An instance of ProjectReport.
   * @param {object}         options - (Optional) project processing options.
   *
   * @returns {Promise<ProjectReport>}
   */
  processAsync(projectReport: ProjectReport, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.process(projectReport, options));
      } catch (err) {
        /* istanbul ignore next */ reject(err);
      }
    });
  }
}
