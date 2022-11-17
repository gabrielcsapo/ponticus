import path from "path";

import { BabelParser } from "@ponticus/babel-parser";
import { ESComplexModule } from "@ponticus/escomplex-module";
import { ESComplexProject } from "@ponticus/escomplex-project";

/**
 * Next generation code complexity reporting for Javascript abstract syntax trees (AST). ESComplex exposes all methods
 * available via ESComplexModule & ESComplexProject modules which process AST. Several methods available below accept
 * source code which is translated via Babel Parser w/ all plugins enabled allowing any ES6/ES7/edge JS and Typescript
 * to be parsed. Asynchronous versions with the `Async` suffix of all methods are available as well.
 *
 * @see https://www.npmjs.com/package/\@ponticus/escomplex-module
 * @see https://www.npmjs.com/package/\@ponticus/escomplex-project
 * @see https://www.npmjs.com/package/babylon
 */
export class ESComplex {
  /**
   * An instance of ESComplexModule.
   * @internal
   */
  #escomplexModule: ESComplexModule;

  /**
   * An instance of ESComplexProject.
   * @internal
   */
  #escomplexProject: ESComplexProject;

  /**
   * Initializes ESComplex.
   *
   * @param      options - module and project options including user plugins to load including:
   * ```
   * (object)             module - Provides an object hash of the following options for the module runtime:
   *    (boolean)         loadDefaultPlugins - When false ESComplexModule will not load any default plugins.
   *    (Array<Object>)   plugins - A list of ESComplexModule plugins that have already been instantiated.
   *
   * (object)             project - Provides an object hash of the following options for the project runtime:
   *    (boolean)         loadDefaultPlugins - When false ESComplexProject will not load any default plugins.
   *    (Array<Object>)   plugins - A list of ESComplexProject plugins that have already been instantiated.
   * ```
   */
  constructor(
    options: {
      module: {
        loadDefaultPlugins: boolean;
        plugins: any[];
      };
      project: {
        loadDefaultPlugins: boolean;
        plugins: any[];
      };
    } = {
      module: {
        loadDefaultPlugins: true,
        plugins: [],
      },
      project: {
        loadDefaultPlugins: true,
        plugins: [],
      },
    }
  ) {
    /* istanbul ignore if */
    if (typeof options !== "object") {
      throw new TypeError(`ctor error: 'options' is not an 'object'.`);
    }

    this.#escomplexModule = new ESComplexModule(options.module);
    this.#escomplexProject = new ESComplexProject(path, options);
  }

  /**
   * Parses the given source code then processes the generated AST and calculates metrics via plugins.
   *
   * @param source - Javascript source code.
   *
   * @param options - Module analyze options.
   *
   * @param parserOptions - Overrides default Babel parser options.
   *
   * @param parserOverride - Provides helper directives to override options to simplify modification of
   *                                      default Babel parser options.
   *
   * @returns - A single module report.
   */
  analyzeModule(
    source: string,
    options = {},
    parserOptions = void 0,
    parserOverride = void 0
  ) {
    /* istanbul ignore if */
    if (typeof source !== "string") {
      throw new TypeError(`analyze error: 'source' is not a 'string'.`);
    }

    return this.#escomplexModule.analyze(
      BabelParser.parse(source, parserOptions, parserOverride),
      options
    );
  }

  /**
   * Processes the given ast and calculates metrics via plugins.
   *
   * @param ast - Javascript AST.
   *
   * @param options - Module analyze options.
   *
   * @returns - A single module report.
   */
  analyzeModuleAST(ast: any | any[], options = {}) {
    return this.#escomplexModule.analyze(ast, options);
  }

  /**
   * Processes the given sources and calculates project metrics via plugins.
   *
   * @param  sources - Array of object hashes containing `code` and `srcPath` entries with optional
   *                                   entries include `filePath` and `srcPathAlias`.
   *
   * @param options - Project processing options.
   *
   * @param parserOptions - Overrides default Babel parser options.
   *
   * @param parserOverride - Provides helper directives to override options to simplify modification
   *                                            of default Babel parser options.
   *
   * @returns - An object hash with a `reports` entry that is an Array of module results.
   */
  analyzeProject(
    sources: any[],
    options: any = {},
    parserOptions = void 0,
    parserOverride = void 0
  ) {
    // Parse sources and map entries to include `ast` entry from `code`.
    const modules = sources
      .map((source) => {
        try {
          return {
            ast: BabelParser.parse(source.code, parserOptions, parserOverride),
            filePath: source.filePath,
            srcPath: source.srcPath,
            srcPathAlias: source.srcPathAlias,
          };
        } catch (error: any) {
          /* istanbul ignore if */
          if (options.ignoreErrors) {
            return null;
          }

          /* istanbul ignore next */
          error.message = `${source.path}: ${error.message}`;

          /* istanbul ignore next */
          throw error;
        }
      })
      .filter((source) => !!source);

    return this.#escomplexProject.analyze(modules, options);
  }

  /**
   * Processes the given modules and calculates project metrics via plugins.
   *
   * @param modules - Array of object hashes containing `ast` and `srcPath` entries with optional
   *                                   entries include `filePath` and `srcPathAlias`.
   *
   * @param options - (Optional) project processing options.
   *
   * @returns - An object hash with a `reports` entry that is an Array of module results.
   */
  analyzeProjectAST(modules: any[], options = {}) {
    return this.#escomplexProject.analyze(modules, options);
  }

  /**
   * Provides a convenience method to parse the given source code and return the Babel parser AST.
   *
   * @param source - Javascript source code.
   *
   * @param parserOptions - Overrides default babylon parser options.
   *
   * @param parserOverride - Provides helper directives to override options to simplify modification
   *                                      of default Babel parser options.
   *
   * @returns - babylon generated AST.
   */
  parse(source: string, parserOptions = void 0, parserOverride = void 0) {
    return BabelParser.parse(source, parserOptions, parserOverride);
  }

  /**
   * Processes existing project results and calculates metrics via plugins.
   *
   * @param results - An object hash with a `reports` entry that is an Array of module results.
   *
   * @param options - (Optional) project processing options.
   *
   * @returns - An object hash with a `reports` entry that is an Array of module results.
   */
  processProject(results: any, options = {}) {
    return this.#escomplexProject.process(results, options);
  }

  // Asynchronous Promise based methods ----------------------------------------------------------------------------

  /**
   * Wraps in a Promise parsing of the given source code then processes the generated AST and calculates metrics via
   * plugins.
   *
   * @param source - Javascript source code.
   *
   * @param options - Module analyze options.
   *
   * @param parserOptions - Overrides default babylon parser options.
   *
   * @param parserOverride - Provides helper directives to override options to simplify modification
   *                                      of default Babel parser options.
   *
   * @returns - A single module report.
   */
  analyzeModuleAsync(
    source: string,
    options = {},
    parserOptions = void 0,
    parserOverride = void 0
  ) {
    return new Promise((resolve, reject) => {
      try {
        resolve(
          this.analyzeModule(source, options, parserOptions, parserOverride)
        );
      } catch (err) {
        /* istanbul ignore next */ reject(err);
      }
    });
  }

  /**
   * Wraps in a Promise processing the given ast and calculates metrics via plugins.
   *
   * @param ast - Javascript AST.
   *
   * @param options - Module analyze options.
   *
   * @returns - A single module report.
   */
  analyzeModuleASTAsync(ast: any | any[], options = {}) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.analyzeModuleAST(ast, options));
      } catch (err) {
        /* istanbul ignore next */ reject(err);
      }
    });
  }

  /**
   * Wraps in a Promise processing the given sources and calculates project metrics via plugins.
   *
   * @param sources - Array of object hashes containing `code` and `path` entries.
   *
   * @param options - Project processing options.
   *
   * @param parserOptions - Overrides default babylon parser options.
   *
   * @param parserOverride - Provides helper directives to override options to simplify modification
   *                                            of default Babel parser options.
   *
   * @returns - An object hash with a `reports` entry that is an Array of module
   *                                            results.
   */
  analyzeProjectAsync(
    sources: any[],
    options = {},
    parserOptions = void 0,
    parserOverride = void 0
  ) {
    return new Promise((resolve, reject) => {
      try {
        resolve(
          this.analyzeProject(sources, options, parserOptions, parserOverride)
        );
      } catch (err) {
        /* istanbul ignore next */ reject(err);
      }
    });
  }

  /**
   * Wraps in a Promise processing the given modules and calculates project metrics via plugins.
   *
   * @param modules - Array of object hashes containing `ast` and `path` entries.
   *
   * @param options - Project processing options.
   *
   * @returns - An object hash with a `reports` entry that is an Array of module
   *                                            results.
   */
  analyzeProjectASTAsync(modules: any[], options = {}) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.analyzeProjectAST(modules, options));
      } catch (err) {
        /* istanbul ignore next */ reject(err);
      }
    });
  }

  /**
   * Wraps in a Promise a convenience method to parse the given source code and return the babylon AST.
   *
   * @param source - Javascript source code.
   *
   * @param parserOptions - Overrides default babylon parser options.
   *
   * @param parserOverride - Provides helper directives to override options to simplify modification
   *                                      of default Babel parser options.
   *
   * @returns - babylon generated AST.
   */
  parseAsync(source: string, parserOptions = void 0, parserOverride = void 0) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.parse(source, parserOptions, parserOverride));
      } catch (err) {
        /* istanbul ignore next */ reject(err);
      }
    });
  }

  /**
   * Wraps in a Promise processing existing project results and calculates metrics via plugins.
   *
   * @param results - An object hash with a `reports` entry that is an Array of module results.
   * @param options - (Optional) project processing options.
   *
   * @returns - An object hash with a `reports` entry that is an Array of module
   *                                            results.
   */
  processProjectAsync(results: any, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.processProject(results, options));
      } catch (err) {
        /* istanbul ignore next */ reject(err);
      }
    });
  }
}
