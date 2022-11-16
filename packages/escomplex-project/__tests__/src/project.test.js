import fs from "fs";
import path from "path";

import { test, describe, expect, beforeEach, afterEach } from "vitest";

import parsers from "../util/parsers";

import { ProjectReport } from "@ponticus/escomplex-commons";

import escomplexProject from "../../src";

parsers.forEach((Parser) => {
  /**
   * Load project source and local test files from NPM module @ponticus/escomplex-commons and
   * typhonjs-escomplex-module. The order is purposely out of order to test sorting of `srcPath`.
   * @type {string[]}
   */
  const s_LOCAL_TEST_FILES = [
    "escomplex-module/src/ESComplexModule.ts",
    "escomplex-module/src/index.ts",
    "escomplex-module/src/Plugins.ts",
    "escomplex-commons/src/utils/Enum.ts",
    "escomplex-commons/src/utils/MathUtil.ts",
    "escomplex-commons/src/utils/StringUtil.ts",
    "escomplex-commons/src/utils/ObjectUtil.ts",
    "escomplex-commons/src/project/report/ProjectReport.ts",
    "escomplex-commons/src/types/ReportType.ts",
    "escomplex-commons/src/transform/TransformFormat.ts",
    "escomplex-commons/src/transform/formats/markdown/FormatMarkdown.ts",
    "escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.ts",
    "escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.ts",
    "escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.ts",
    "escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.ts",
    "escomplex-commons/src/transform/formats/text/AbstractFormatText.ts",
    "escomplex-commons/src/transform/formats/text/AbstractTextMatrix.ts",
    "escomplex-commons/src/transform/formats/text/FormatText.ts",
    "escomplex-commons/src/transform/formats/text/FormatTextAdjacency.ts",
    "escomplex-commons/src/transform/formats/text/FormatTextMinimal.ts",
    "escomplex-commons/src/transform/formats/text/FormatTextModules.ts",
    "escomplex-commons/src/transform/formats/text/FormatTextVisibility.ts",
    "escomplex-commons/src/transform/formats/json/FormatJSON.ts",
    "escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.ts",
    "escomplex-commons/src/transform/formats/json/FormatJSONMinimal.ts",
    "escomplex-commons/src/transform/formats/json/FormatJSONModules.ts",
    "escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.ts",
    "escomplex-commons/src/module/report/AbstractReport.ts",
    "escomplex-commons/src/module/report/AggregateReport.ts",
    "escomplex-commons/src/module/report/ClassReport.ts",
    "escomplex-commons/src/module/report/HalsteadData.ts",
    "escomplex-commons/src/module/report/MethodReport.ts",
    "escomplex-commons/src/module/report/ModuleReport.ts",
    "escomplex-commons/src/module/report/averages/ModuleAverage.ts",
    "escomplex-commons/src/module/report/averages/HalsteadAverage.ts",
    "escomplex-commons/src/module/report/averages/MethodAverage.ts",
    "escomplex-commons/src/module/traits/actualize.ts",
    "escomplex-commons/src/module/traits/HalsteadArray.ts",
    "escomplex-commons/src/module/traits/TraitUtil.ts",
    "escomplex-commons/src/module/traits/Trait.ts",
    "escomplex-commons/src/module/traits/TraitHalstead.ts",
    "escomplex-commons/src/analyze/AnalyzeError.ts",

    "escomplex-project/__tests__/fixture/testImportNPMAlias.js",
    "escomplex-project/__tests__/fixture/testRequireNPMAlias.js",
  ];

  const s_LOCAL_TEST_DATA = s_LOCAL_TEST_FILES.map((filePath) => {
    let srcPath = filePath;
    let srcPathAlias = undefined;

    // Remove leading `./node_modules/` from file path for the source path which is what is referenced in the code.
    if (filePath.startsWith("./node_modules/")) {
      srcPath = filePath.replace(/^\.\/node_modules\//, "");
    }

    // Add srcPathAlias for typhonjs-escomplex-module NPM main alias.
    if (filePath === "./node_modules/escomplex-module/src/index.js") {
      srcPathAlias = "escomplex-module";
    }

    const ast = Parser.parse(
      fs.readFileSync(
        path.resolve(__dirname, "..", "..", "..", filePath),
        "utf8"
      )
    );

    return {
      ast,
      filePath,
      srcPath,
      srcPathAlias,
    };
  });

  describe(`(${Parser.name}) project:`, () => {
    test("require returns object", () => {
      expect(typeof escomplexProject).toBe("object");
    });

    test("analyze function is exported", () => {
      expect(typeof escomplexProject.analyze).toBe("function");
    });

    test("process function is exported", () => {
      expect(typeof escomplexProject.process).toBe("function");
    });

    test("analyzeAsync function is exported", () => {
      expect(typeof escomplexProject.analyzeAsync).toBe("function");
    });

    test("processAsync function is exported", () => {
      expect(typeof escomplexProject.processAsync).toBe("function");
    });

    test("analyze throws when modules is object", () => {
      expect(() => {
        escomplexProject.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        });
      }).toThrow();
    });

    test("analyze does not throw when modules is array", () => {
      expect(() => {
        escomplexProject.analyze([]);
      }).not.toThrow();
    });

    test("analyzeAsync does not throw when modules is array", () => {
      expect(() => {
        escomplexProject.analyzeAsync([]);
      }).not.toThrow();
    });

    test("analyze throws when modules is not an array", () => {
      expect(() => {
        escomplexProject.analyze({});
      }).toThrow();
    });

    test("analyze throws when `srcPath` is missing", () => {
      expect(() => {
        escomplexProject.analyze([
          { ast: Parser.parse('if (true) { "foo"; } else { "bar"; }') },
        ]);
      }).toThrow();
    });

    describe("no modules:", () => {
      let result;

      beforeEach(() => {
        result = escomplexProject.analyze([]);
      });

      afterEach(() => {
        result = undefined;
      });

      test("object was returned", () => {
        expect(typeof result).toBe("object");
      });

      test("modules array exists", () => {
        expect(Array.isArray(result.modules)).toBe(true);
      });

      test("modules array has zero length", () => {
        expect(result.modules.length).toBe(0);
      });

      test("adjacency list exists", () => {
        expect(Array.isArray(result.adjacencyList)).toBe(true);
      });

      test("adjacency list has zero length", () => {
        expect(result.adjacencyList.length).toBe(0);
      });

      test("first-order density is correct", () => {
        expect(result.firstOrderDensity).toBe(0);
      });

      test("change cost is correct", () => {
        expect(result.changeCost).toBe(0);
      });

      test("core size is correct", () => {
        expect(result.coreSize).toBe(0);
      });

      test("mean per-function logical LOC is correct", () => {
        expect(result.moduleAverage.methodAverage.sloc.logical).toBe(0);
      });

      test("mean per-function cyclomatic complexity is correct", () => {
        expect(result.moduleAverage.methodAverage.cyclomatic).toBe(0);
      });

      test("mean per-function Halstead effort is correct", () => {
        expect(result.moduleAverage.methodAverage.halstead.effort).toBe(0);
      });

      test("mean per-function parameter count is correct", () => {
        expect(result.moduleAverage.methodAverage.paramCount).toBe(0);
      });

      test("mean per-function maintainability index is correct", () => {
        expect(result.moduleAverage.maintainability).toBe(0);
      });
    });

    describe("one module:", () => {
      let result;

      beforeEach(() => {
        result = escomplexProject.analyze([
          {
            ast: Parser.parse('if (true) { "foo"; } else { "bar"; }'),
            srcPath: "a",
          },
        ]);
      });

      afterEach(() => {
        result = undefined;
      });

      test("modules is correct length", () => {
        expect(result.modules.length).toBe(1);
      });

      test("first module aggregate has correct physical lines of code", () => {
        expect(result.modules[0].aggregate.sloc.physical).toBe(1);
      });

      test("first module aggregate has correct logical lines of code", () => {
        expect(result.modules[0].aggregate.sloc.logical).toBe(4);
      });

      test("first module aggregate has correct cyclomatic complexity", () => {
        expect(result.modules[0].aggregate.cyclomatic).toBe(2);
      });

      test("first module aggregate has correct cyclomatic complexity density", () => {
        expect(result.modules[0].aggregate.cyclomaticDensity).toBe(50);
      });

      test("first module methods is empty", () => {
        expect(result.modules[0].methods.length).toBe(0);
      });

      test("first module aggregate has correct Halstead total operators", () => {
        expect(result.modules[0].aggregate.halstead.operators.total).toBe(2);
      });

      test("first module aggregate has correct Halstead distinct operators", () => {
        expect(result.modules[0].aggregate.halstead.operators.distinct).toBe(2);
      });

      test("first module aggregate has correct Halstead total operands", () => {
        expect(result.modules[0].aggregate.halstead.operands.total).toBe(3);
      });

      test("first module aggregate has correct Halstead distinct operands", () => {
        expect(result.modules[0].aggregate.halstead.operands.distinct).toBe(3);
      });

      test("first module aggregate has correct Halstead operator identifier length", () => {
        expect(
          result.modules[0].aggregate.halstead.operators.identifiers.length
        ).toBe(result.modules[0].aggregate.halstead.operators.distinct);
      });

      test("first module aggregate has correct Halstead operand identifier length", () => {
        expect(
          result.modules[0].aggregate.halstead.operands.identifiers.length
        ).toBe(result.modules[0].aggregate.halstead.operands.distinct);
      });

      test("first module aggregate has correct Halstead length", () => {
        expect(result.modules[0].aggregate.halstead.length).toBe(5);
      });

      test("first module aggregate has correct Halstead vocabulary", () => {
        expect(result.modules[0].aggregate.halstead.vocabulary).toBe(5);
      });

      test("first module aggregate has correct Halstead difficulty", () => {
        expect(result.modules[0].aggregate.halstead.difficulty).toBe(1);
      });

      test("first module aggregate has correct Halstead volume", () => {
        expect(result.modules[0].aggregate.halstead.volume).toBe(11.61);
      });

      test("first module aggregate has correct Halstead effort", () => {
        expect(result.modules[0].aggregate.halstead.effort).toBe(11.61);
      });

      test("first module aggregate has correct Halstead bugs", () => {
        expect(result.modules[0].aggregate.halstead.bugs).toBe(0.004);
      });

      test("first module aggregate has correct Halstead time", () => {
        expect(result.modules[0].aggregate.halstead.time).toBe(0.645);
      });

      test("first module has correct srcPath", () => {
        expect(result.modules[0].srcPath).toBe("a");
      });

      test("first-order density is correct", () => {
        expect(result.firstOrderDensity).toBe(0);
      });

      test("change cost is correct", () => {
        expect(result.changeCost).toBe(100);
      });

      test("core size is correct", () => {
        expect(result.coreSize).toBe(0);
      });

      test("mean per-function logical LOC is correct", () => {
        expect(result.moduleAverage.methodAverage.sloc.logical).toBe(0);
      });

      test("mean per-function cyclomatic complexity is correct", () => {
        expect(result.moduleAverage.methodAverage.cyclomatic).toBe(0);
      });

      test("mean per-function Halstead effort is correct", () => {
        expect(result.moduleAverage.methodAverage.halstead.effort).toBe(0);
      });

      test("mean per-function parameter count is correct", () => {
        expect(result.moduleAverage.methodAverage.paramCount).toBe(0);
      });

      test("mean per-function maintainability index is correct", () => {
        expect(result.moduleAverage.maintainability).toBe(139.464);
      });
    });

    describe("two modules:", () => {
      let result;

      beforeEach(() => {
        result = escomplexProject.analyze([
          {
            ast: Parser.parse(
              "function foo (a, b) { if (a) { b(a); } else { a(b); } } function bar (c, d) { var i; for (i = 0; i < c.length; i += 1) { d += 1; } console.log(d); }"
            ),
            srcPath: "b",
          },
          {
            ast: Parser.parse('if (true) { "foo"; } else { "bar"; }'),
            srcPath: "a",
          },
        ]);
      });

      afterEach(() => {
        result = undefined;
      });

      test("modules is correct length", () => {
        expect(result.modules.length).toBe(2);
      });

      test("first module aggregate has correct physical lines of code", () => {
        expect(result.modules[0].aggregate.sloc.physical).toBe(1);
      });

      test("first module aggregate has correct logical lines of code", () => {
        expect(result.modules[0].aggregate.sloc.logical).toBe(4);
      });

      test("first module aggregate has correct cyclomatic complexity", () => {
        expect(result.modules[0].aggregate.cyclomatic).toBe(2);
      });

      test("first module aggregate has correct cyclomatic complexity density", () => {
        expect(result.modules[0].aggregate.cyclomaticDensity).toBe(50);
      });

      test("first module methods is empty", () => {
        expect(result.modules[0].methods.length).toBe(0);
      });

      test("first module aggregate has correct Halstead total operators", () => {
        expect(result.modules[0].aggregate.halstead.operators.total).toBe(2);
      });

      test("first module aggregate has correct Halstead distinct operators", () => {
        expect(result.modules[0].aggregate.halstead.operators.distinct).toBe(2);
      });

      test("first module aggregate has correct Halstead total operands", () => {
        expect(result.modules[0].aggregate.halstead.operands.total).toBe(3);
      });

      test("first module aggregate has correct Halstead distinct operands", () => {
        expect(result.modules[0].aggregate.halstead.operands.distinct).toBe(3);
      });

      test("first module aggregate has correct Halstead operator identifier length", () => {
        expect(
          result.modules[0].aggregate.halstead.operators.identifiers.length
        ).toBe(result.modules[0].aggregate.halstead.operators.distinct);
      });

      test("first module aggregate has correct Halstead operand identifier length", () => {
        expect(
          result.modules[0].aggregate.halstead.operands.identifiers.length
        ).toBe(result.modules[0].aggregate.halstead.operands.distinct);
      });

      test("first module aggregate has correct Halstead length", () => {
        expect(result.modules[0].aggregate.halstead.length).toBe(5);
      });

      test("first module aggregate has correct Halstead vocabulary", () => {
        expect(result.modules[0].aggregate.halstead.vocabulary).toBe(5);
      });

      test("first module aggregate has correct Halstead difficulty", () => {
        expect(result.modules[0].aggregate.halstead.difficulty).toBe(1);
      });

      test("first module aggregate has correct Halstead volume", () => {
        expect(result.modules[0].aggregate.halstead.volume).toBe(11.61);
      });

      test("first module aggregate has correct Halstead effort", () => {
        expect(result.modules[0].aggregate.halstead.effort).toBe(11.61);
      });

      test("first module aggregate has correct Halstead bugs", () => {
        expect(result.modules[0].aggregate.halstead.bugs).toBe(0.004);
      });

      test("first module aggregate has correct Halstead time", () => {
        expect(result.modules[0].aggregate.halstead.time).toBe(0.645);
      });

      test("first module has correct srcPath", () => {
        expect(result.modules[0].srcPath).toBe("a");
      });

      test("second module maintainability index is correct", () => {
        expect(result.modules[1].maintainability).toBe(129.225);
      });

      test("second module first method has correct parameter count", () => {
        expect(result.modules[1].methods[0].paramCount).toBe(2);
      });

      test("second module second method has correct parameter count", () => {
        expect(result.modules[1].methods[1].paramCount).toBe(2);
      });

      test("second module aggregate has correct parameter count", () => {
        expect(result.modules[1].aggregate.paramCount).toBe(4);
      });

      test("second module mean parameter count is correct", () => {
        expect(result.modules[1].methodAverage.paramCount).toBe(2);
      });

      test("second module has correct srcPath", () => {
        expect(result.modules[1].srcPath).toBe("b");
      });

      test("first-order density is correct", () => {
        expect(result.firstOrderDensity).toBe(0);
      });

      test("change cost is correct", () => {
        expect(result.changeCost).toBe(50);
      });

      test("core size is correct", () => {
        expect(result.coreSize).toBe(0);
      });

      test("mean per-function logical LOC is correct", () => {
        expect(result.moduleAverage.methodAverage.sloc.logical).toBe(2);
      });

      test("mean per-function cyclomatic complexity is correct", () => {
        expect(result.moduleAverage.methodAverage.cyclomatic).toBe(1);
      });

      test("mean per-function Halstead effort is correct", () => {
        expect(result.moduleAverage.methodAverage.halstead.effort).toBe(
          141.804
        );
      });

      test("mean per-function parameter count is correct", () => {
        expect(result.moduleAverage.methodAverage.paramCount).toBe(1);
      });

      test("mean per-function maintainability index is correct", () => {
        expect(result.moduleAverage.maintainability).toBe(134.344);
      });
    });

    describe("two modules with different options:", () => {
      const modules = [
        {
          ast: Parser.parse(
            "function foo (a, b) { if (a) { b(a); } else { a(b); } } function bar (c, d) { var i; for (i = 0; i < c.length; i += 1) { d += 1; } console.log(d); }"
          ),
          srcPath: "b",
        },
        {
          ast: Parser.parse('if (true) { "foo"; } else { "bar"; }'),
          srcPath: "a",
        },
      ];

      let reportsOnly;

      beforeEach(() => {
        reportsOnly = escomplexProject.analyze(modules, {
          skipCalculation: true,
        });
      });

      test("should have default values if we call with skipCalculation", () => {
        expect(reportsOnly.modules.length).toBe(2);
        expect(reportsOnly.moduleAverage.methodAverage.sloc.logical).toBe(0);
        expect(reportsOnly.moduleAverage.maintainability).toBe(0);
        expect(reportsOnly.coreSize).toBe(0);
        expect(reportsOnly.adjacencyList).toStrictEqual([]);
        expect(reportsOnly.visibilityList).toStrictEqual([]);
      });

      test("should have default coreSize and visibilityMatrix if we call with noCoreSize", () => {
        const results = escomplexProject.analyze(modules, {
          noCoreSize: true,
        });

        expect(results.coreSize).toBe(0);
        expect(results.visibilityList).toStrictEqual([]);

        // make sure we still have a few things though
        expect(results.adjacencyList).toBeTruthy();
        expect(results.moduleAverage.methodAverage.sloc.logical).toBeTruthy();
      });

      test("should be able to run process", () => {
        const fullReport = escomplexProject.analyze(modules);
        const calcReport = escomplexProject.process(reportsOnly);

        expect(calcReport).toEqual(fullReport);
      });

      test("should be able to run process without calculating coreSize", () => {
        const results = escomplexProject.process(reportsOnly, {
          noCoreSize: true,
        });
        expect(results.coreSize).toBe(0);
        expect(results.visibilityList).toStrictEqual([]);

        // make sure we still have a few things though
        expect(results.adjacencyList).toBeTruthy();
        expect(results.moduleAverage.methodAverage.sloc.logical).toBeTruthy();
      });

      test("should be able to run processAsync", () => {
        const fullReport = escomplexProject.analyze(modules);

        escomplexProject.processAsync(reportsOnly).then((calcReport) => {
          expect(calcReport).toEqual(fullReport);
        });
      });
    });

    describe("local source + NPM module @ponticus/escomplex-commons test w/ serializeModules false:", () => {
      let result;

      beforeEach(() => {
        result = escomplexProject.analyze(s_LOCAL_TEST_DATA, {
          serializeModules: false,
        });
      });

      afterEach(() => {
        result = undefined;
      });

      test("modules are in correct order", () => {
        expect(result.modules).toMatchSnapshot();
      });
    });

    describe("local source + NPM module @ponticus/escomplex-commons and escomplex-module test w/ dependencies:", () => {
      let result;

      beforeEach(() => {
        result = escomplexProject.analyze(s_LOCAL_TEST_DATA, {
          commonjs: true,
          serializeModules: false,
        });
      });

      afterEach(() => {
        result = undefined;
      });

      test("modules are in correct order", () => {
        expect(result.modules).toMatchSnapshot();
      });

      test("adjacency list is correct", () => {
        expect(JSON.stringify(result.adjacencyList)).toMatchSnapshot();
      });

      test("visibility list is correct", () => {
        expect(JSON.stringify(result.visibilityList)).toMatchSnapshot();
      });
    });

    describe("cjs modules with dependencies:", () => {
      let result;

      beforeEach(() => {
        result = escomplexProject.analyze(
          [
            { ast: Parser.parse('require("./a");'), srcPath: "/d.js" },
            { ast: Parser.parse('require("./b");'), srcPath: "/a/c.js" },
            { ast: Parser.parse('require("./c");'), srcPath: "/a/b.js" },
            {
              ast: Parser.parse('require("./a/b");require("./a/c");'),
              srcPath: "/a.js",
            },
          ],
          { commonjs: true }
        );
      });

      afterEach(() => {
        result = undefined;
      });

      test("modules are in correct order", () => {
        expect(result.modules[0].srcPath).toBe("/a.js");
        expect(result.modules[1].srcPath).toBe("/a/b.js");
        expect(result.modules[2].srcPath).toBe("/a/c.js");
        expect(result.modules[3].srcPath).toBe("/d.js");
      });

      test("adjacency list is correct", () => {
        const testString =
          '[{"row":0,"cols":[1,2]},{"row":1,"cols":[2]},{"row":2,"cols":[1]},{"row":3,"cols":[0]}]';

        expect(JSON.stringify(result.adjacencyList)).toBe(testString);
      });

      test("visibility list is correct", () => {
        const testString =
          '[{"row":0,"cols":[0,1,2]},{"row":1,"cols":[1,2]},{"row":2,"cols":[1,2]},{"row":3,"cols":[0,1,2,3]}]';

        expect(JSON.stringify(result.visibilityList)).toBe(testString);
      });

      test("first order density is correct", () => {
        expect(result.firstOrderDensity).toBe(31.25);
      });

      test("change cost is correct", () => {
        expect(result.changeCost).toBe(68.75);
      });

      test("core size is correct", () => {
        expect(result.coreSize).toBe(0);
      });
    });

    describe("cjs modules with dynamic dependencies:", () => {
      let result;

      beforeEach(() => {
        result = escomplexProject.analyze(
          [
            { ast: Parser.parse('require("dynamic_a");'), srcPath: "/d.js" },
            {
              ast: Parser.parse('require("dynamic_b");'),
              srcPath: "/a/c.js",
            },
            {
              ast: Parser.parse('require("dynamic_c");'),
              srcPath: "/a/b.js",
            },
            {
              ast: Parser.parse('require("./a/b");require("./a/c");'),
              srcPath: "/a.js",
            },
          ],
          {
            commonjs: true,
            dependencyResolver: (dependency) => {
              switch (dependency) {
                case "dynamic_a":
                  return "./a";
                case "dynamic_b":
                  return "./b";
                case "dynamic_c":
                  return "./c";
                default:
                  return dependency;
              }
            },
          }
        );
      });

      afterEach(() => {
        result = undefined;
      });

      test("modules are in correct order", () => {
        expect(result.modules[0].srcPath).toBe("/a.js");
        expect(result.modules[1].srcPath).toBe("/a/b.js");
        expect(result.modules[2].srcPath).toBe("/a/c.js");
        expect(result.modules[3].srcPath).toBe("/d.js");
      });

      test("adjacency list is correct", () => {
        const testString =
          '[{"row":0,"cols":[1,2]},{"row":1,"cols":[2]},{"row":2,"cols":[1]},{"row":3,"cols":[0]}]';

        expect(JSON.stringify(result.adjacencyList)).toBe(testString);
      });

      test("visibility list is correct", () => {
        const testString =
          '[{"row":0,"cols":[0,1,2]},{"row":1,"cols":[1,2]},{"row":2,"cols":[1,2]},{"row":3,"cols":[0,1,2,3]}]';

        expect(JSON.stringify(result.visibilityList)).toBe(testString);
      });

      test("first order density is correct", () => {
        expect(result.firstOrderDensity).toBe(31.25);
      });

      test("change cost is correct", () => {
        expect(result.changeCost).toBe(68.75);
      });

      test("core size is correct", () => {
        expect(result.coreSize).toBe(0);
      });
    });

    describe("esm modules with dependencies:", () => {
      let result;

      beforeEach(() => {
        result = escomplexProject.analyze([
          { ast: Parser.parse('import d from "./a";'), srcPath: "/d.js" },
          { ast: Parser.parse('import c from "./b";'), srcPath: "/a/c.js" },
          { ast: Parser.parse('import b from "./c";'), srcPath: "/a/b.js" },
          {
            ast: Parser.parse('import a from "./a/b"; import aa from "./a/c";'),
            srcPath: "/a.js",
          },
        ]);
      });

      afterEach(() => {
        result = undefined;
      });

      test("modules are in correct order", () => {
        expect(result.modules[0].srcPath).toBe("/a.js");
        expect(result.modules[1].srcPath).toBe("/a/b.js");
        expect(result.modules[2].srcPath).toBe("/a/c.js");
        expect(result.modules[3].srcPath).toBe("/d.js");
      });

      test("adjacency list is correct", () => {
        const testString =
          '[{"row":0,"cols":[1,2]},{"row":1,"cols":[2]},{"row":2,"cols":[1]},{"row":3,"cols":[0]}]';

        expect(JSON.stringify(result.adjacencyList)).toBe(testString);
      });

      test("visibility list is correct", () => {
        const testString =
          '[{"row":0,"cols":[0,1,2]},{"row":1,"cols":[1,2]},{"row":2,"cols":[1,2]},{"row":3,"cols":[0,1,2,3]}]';

        expect(JSON.stringify(result.visibilityList)).toBe(testString);
      });

      test("first order density is correct", () => {
        expect(result.firstOrderDensity).toBe(31.25);
      });

      test("change cost is correct", () => {
        expect(result.changeCost).toBe(68.75);
      });

      test("core size is correct", () => {
        expect(result.coreSize).toBe(0);
      });
    });

    describe("esm modules with dynamic dependencies:", () => {
      let result;

      beforeEach(() => {
        result = escomplexProject.analyze(
          [
            {
              ast: Parser.parse('import d from "dynamic_a";'),
              srcPath: "/d.js",
            },
            {
              ast: Parser.parse('import c from "dynamic_b";'),
              srcPath: "/a/c.js",
            },
            {
              ast: Parser.parse('import b from "dynamic_c";'),
              srcPath: "/a/b.js",
            },
            {
              ast: Parser.parse(
                'import a from "./a/b"; import aa from "./a/c";'
              ),
              srcPath: "/a.js",
            },
          ],
          {
            dependencyResolver: (dependency) => {
              switch (dependency) {
                case "dynamic_a":
                  return "./a";
                case "dynamic_b":
                  return "./b";
                case "dynamic_c":
                  return "./c";
                default:
                  return dependency;
              }
            },
          }
        );
      });

      afterEach(() => {
        result = undefined;
      });

      test("modules are in correct order", () => {
        expect(result.modules[0].srcPath).toBe("/a.js");
        expect(result.modules[1].srcPath).toBe("/a/b.js");
        expect(result.modules[2].srcPath).toBe("/a/c.js");
        expect(result.modules[3].srcPath).toBe("/d.js");
      });

      test("adjacency list is correct", () => {
        const testString =
          '[{"row":0,"cols":[1,2]},{"row":1,"cols":[2]},{"row":2,"cols":[1]},{"row":3,"cols":[0]}]';

        expect(JSON.stringify(result.adjacencyList)).toBe(testString);
      });

      test("visibility list is correct", () => {
        const testString =
          '[{"row":0,"cols":[0,1,2]},{"row":1,"cols":[1,2]},{"row":2,"cols":[1,2]},{"row":3,"cols":[0,1,2,3]}]';

        expect(JSON.stringify(result.visibilityList)).toBe(testString);
      });

      test("first order density is correct", () => {
        expect(result.firstOrderDensity).toBe(31.25);
      });

      test("change cost is correct", () => {
        expect(result.changeCost).toBe(68.75);
      });

      test("core size is correct", () => {
        expect(result.coreSize).toBe(0);
      });
    });

    describe("MacCormack, Rusnak & Baldwin example:", () => {
      let result;

      beforeEach(() => {
        result = escomplexProject.analyze(
          [
            { ast: Parser.parse('"f";'), srcPath: "/a/c/f.js" },
            {
              ast: Parser.parse('require("./f");"e";'),
              srcPath: "/a/c/e.js",
            },
            { ast: Parser.parse('"d";'), srcPath: "/a/b/d.js" },
            {
              ast: Parser.parse('require("./c/e");"c";'),
              srcPath: "/a/c.js",
            },
            {
              ast: Parser.parse('require("./b/d");"b";'),
              srcPath: "/a/b.js",
            },
            {
              ast: Parser.parse('require("./a/b");require("./a/c");"a";'),
              srcPath: "/a.js",
            },
          ],
          { commonjs: true }
        );
      });

      afterEach(() => {
        result = undefined;
      });

      test("modules are in correct order", () => {
        expect(result.modules[0].srcPath).toBe("/a.js");
        expect(result.modules[1].srcPath).toBe("/a/b.js");
        expect(result.modules[2].srcPath).toBe("/a/b/d.js");
        expect(result.modules[3].srcPath).toBe("/a/c.js");
        expect(result.modules[4].srcPath).toBe("/a/c/e.js");
        expect(result.modules[5].srcPath).toBe("/a/c/f.js");
      });

      test("adjacency list is correct", () => {
        const testString =
          '[{"row":0,"cols":[1,3]},{"row":1,"cols":[2]},{"row":3,"cols":[4]},{"row":4,"cols":[5]}]';

        expect(JSON.stringify(result.adjacencyList)).toBe(testString);
      });

      test("visibility list is correct", () => {
        const testString =
          '[{"row":0,"cols":[0,1,2,3,4,5]},{"row":1,"cols":[1,2]},{"row":2,"cols":[2]},{"row":3,"cols":[3,4,5]},{"row":4,"cols":[4,5]},{"row":5,"cols":[5]}]';

        expect(JSON.stringify(result.visibilityList)).toBe(testString);
      });

      test("first order density is correct", () => {
        expect(result.firstOrderDensity > 13.88).toBe(true);
        expect(result.firstOrderDensity < 13.89).toBe(true);
      });

      test("change cost is correct", () => {
        expect(result.changeCost > 41.66).toBe(true);
        expect(result.changeCost < 41.67).toBe(true);
      });

      test("core size is correct", () => {
        expect(result.coreSize > 16.66).toBe(true);
        expect(result.coreSize < 16.67).toBe(true);
      });
    });

    describe("large project calculation performance", () => {
      const resultFixture = require("@ponticus/escomplex-test-data/files/large-project/json/project-with-errors");
      const resultSkipCalc = escomplexProject.analyze(s_LOCAL_TEST_DATA, {
        skipCalculation: true,
      });

      test("deserialize JSON object should be sufficiently fast", () => {
        ProjectReport.parse(resultFixture);
      });

      test("running calculations should be sufficiently fast", () => {
        escomplexProject.process(resultSkipCalc);
      });

      test("running analyze should be sufficiently fast", () => {
        escomplexProject.analyze(s_LOCAL_TEST_DATA);
      });
    });
  });
});
