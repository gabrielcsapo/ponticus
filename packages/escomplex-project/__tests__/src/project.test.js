import fs from "fs";
import path from "path";

import { test, describe, expect, beforeEach, afterEach } from "vitest";

import parsers from "../util/parsers";
import * as testconfig from "../util/testconfig";

import ProjectReport from "@ponticus/escomplex-commons/dist/project/report/ProjectReport";

import escomplexProject from "../../src";

if (testconfig.modules["project"]) {
  parsers.forEach((Parser) => {
    /**
     * Load project source and local test files from NPM module @ponticus/escomplex-commons and
     * typhonjs-escomplex-module. The order is purposely out of order to test sorting of `srcPath`.
     * @type {string[]}
     */
    const s_LOCAL_TEST_FILES = [
      "./node_modules/escomplex-module/src/ESComplexModule.js",
      "./node_modules/escomplex-module/src/index.js",
      "./node_modules/escomplex-module/src/Plugins.js",

      "./node_modules/escomplex-commons/src/utils/Enum.js",
      "./node_modules/escomplex-commons/src/utils/MathUtil.js",
      "./node_modules/escomplex-commons/src/utils/StringUtil.js",
      "./node_modules/escomplex-commons/src/utils/ObjectUtil.js",
      "./node_modules/escomplex-commons/src/project/report/ProjectReport.js",
      "./node_modules/escomplex-commons/src/types/ReportType.js",
      "./node_modules/escomplex-commons/src/transform/TransformFormat.js",
      "./node_modules/escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js",
      "./node_modules/escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js",
      "./node_modules/escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js",
      "./node_modules/escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js",
      "./node_modules/escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js",
      "./node_modules/escomplex-commons/src/transform/formats/text/AbstractFormatText.js",
      "./node_modules/escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js",
      "./node_modules/escomplex-commons/src/transform/formats/text/FormatText.js",
      "./node_modules/escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js",
      "./node_modules/escomplex-commons/src/transform/formats/text/FormatTextMinimal.js",
      "./node_modules/escomplex-commons/src/transform/formats/text/FormatTextModules.js",
      "./node_modules/escomplex-commons/src/transform/formats/text/FormatTextVisibility.js",
      "./node_modules/escomplex-commons/src/transform/formats/json/FormatJSON.js",
      "./node_modules/escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js",
      "./node_modules/escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js",
      "./node_modules/escomplex-commons/src/transform/formats/json/FormatJSONModules.js",
      "./node_modules/escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js",
      "./node_modules/escomplex-commons/src/module/report/AbstractReport.js",
      "./node_modules/escomplex-commons/src/module/report/AggregateMethodReport.js",
      "./node_modules/escomplex-commons/src/module/report/ClassReport.js",
      "./node_modules/escomplex-commons/src/module/report/HalsteadData.js",
      "./node_modules/escomplex-commons/src/module/report/MethodReport.js",
      "./node_modules/escomplex-commons/src/module/report/ModuleReport.js",
      "./node_modules/escomplex-commons/src/module/report/averages/ModuleAverage.js",
      "./node_modules/escomplex-commons/src/module/report/averages/HalsteadAverage.js",
      "./node_modules/escomplex-commons/src/module/report/averages/MethodAverage.js",
      "./node_modules/escomplex-commons/src/module/traits/actualize.js",
      "./node_modules/escomplex-commons/src/module/traits/HalsteadArray.js",
      "./node_modules/escomplex-commons/src/module/traits/TraitUtil.js",
      "./node_modules/escomplex-commons/src/module/traits/Trait.js",
      "./node_modules/escomplex-commons/src/module/traits/TraitHalstead.js",
      "./node_modules/escomplex-commons/src/analyze/AnalyzeError.js",

      "./test/fixture/testImportNPMAlias.js",
      "./test/fixture/testRequireNPMAlias.js",

      "./src/ESComplexProject.js",
      "./src/index.js",
      "./src/Plugins.js",
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
        srcPathAlias = "typhonjs-escomplex-module";
      }

      // Load the project data from the test module / files.
      const testDataFilePath = filePath.replace(
        /^\.\//,
        "./escomplex-test-data/project/"
      );

      return {
        ast: Parser.parse(
          fs.readFileSync(
            path.resolve(__dirname, "..", "..", "..", testDataFilePath),
            "utf8"
          )
        ),
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

        beforeEach,
          afterEach(() => {
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
          expect(result.modules[0].aggregate.halstead.operators.distinct).toBe(
            2
          );
        });

        test("first module aggregate has correct Halstead total operands", () => {
          expect(result.modules[0].aggregate.halstead.operands.total).toBe(3);
        });

        test("first module aggregate has correct Halstead distinct operands", () => {
          expect(result.modules[0].aggregate.halstead.operands.distinct).toBe(
            3
          );
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
          expect(result.modules[0].aggregate.halstead.operators.distinct).toBe(
            2
          );
        });

        test("first module aggregate has correct Halstead total operands", () => {
          expect(result.modules[0].aggregate.halstead.operands.total).toBe(3);
        });

        test("first module aggregate has correct Halstead distinct operands", () => {
          expect(result.modules[0].aggregate.halstead.operands.distinct).toBe(
            3
          );
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
          expect(reportsOnly.adjacencyList).not.toBeDefined();
          expect(reportsOnly.visibilityList).not.toBeDefined();
        });

        test("should have default coreSize and visibilityMatrix if we call with noCoreSize", () => {
          const results = escomplexProject.analyze(modules, {
            noCoreSize: true,
          });

          expect(results.coreSize).toBe(0);
          expect(results.visibilityList).not.toBeDefined();

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
          expect(results.visibilityList).not.toBeDefined();

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
          // TODO REMOVE
          // fs.writeFileSync(process.cwd() + '/test/fixture/project-no-modules.json', result.toFormat('json', { spacing: 3 }), 'utf8');

          // TODO REMOVE
          /*
result.modules.forEach((module, index) =>
{
   console.log(`assert.strictEqual(result.modules[${index}].filePath, '${module.filePath}');`);
});

result.modules.forEach((module, index) =>
{
   console.log(`assert.strictEqual(result.modules[${index}].srcPath, '${module.srcPath}');`);
});
*/
          expect(result.modules[0].filePath).toBe("./src/ESComplexProject.js");
          expect(result.modules[1].filePath).toBe("./src/index.js");
          expect(result.modules[2].filePath).toBe("./src/Plugins.js");
          expect(result.modules[3].filePath).toBe(
            "./test/fixture/testImportNPMAlias.js"
          );
          expect(result.modules[4].filePath).toBe(
            "./test/fixture/testRequireNPMAlias.js"
          );
          expect(result.modules[5].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/analyze/AnalyzeError.js"
          );
          expect(result.modules[6].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js"
          );
          expect(result.modules[7].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/report/AbstractReport.js"
          );
          expect(result.modules[8].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/report/AggregateMethodReport.js"
          );
          expect(result.modules[9].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/report/averages/HalsteadAverage.js"
          );
          expect(result.modules[10].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/report/averages/MethodAverage.js"
          );
          expect(result.modules[11].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/report/averages/ModuleAverage.js"
          );
          expect(result.modules[12].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/report/ClassReport.js"
          );
          expect(result.modules[13].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/report/HalsteadData.js"
          );
          expect(result.modules[14].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/report/MethodReport.js"
          );
          expect(result.modules[15].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/report/ModuleReport.js"
          );
          expect(result.modules[16].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/traits/actualize.js"
          );
          expect(result.modules[17].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/traits/HalsteadArray.js"
          );
          expect(result.modules[18].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/traits/Trait.js"
          );
          expect(result.modules[19].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/traits/TraitHalstead.js"
          );
          expect(result.modules[20].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/module/traits/TraitUtil.js"
          );
          expect(result.modules[21].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/project/report/ProjectReport.js"
          );
          expect(result.modules[22].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSON.js"
          );
          expect(result.modules[23].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js"
          );
          expect(result.modules[24].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js"
          );
          expect(result.modules[25].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONModules.js"
          );
          expect(result.modules[26].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js"
          );
          expect(result.modules[27].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js"
          );
          expect(result.modules[28].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js"
          );
          expect(result.modules[29].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js"
          );
          expect(result.modules[30].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js"
          );
          expect(result.modules[31].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/AbstractFormatText.js"
          );
          expect(result.modules[32].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js"
          );
          expect(result.modules[33].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatText.js"
          );
          expect(result.modules[34].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js"
          );
          expect(result.modules[35].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextMinimal.js"
          );
          expect(result.modules[36].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextModules.js"
          );
          expect(result.modules[37].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextVisibility.js"
          );
          expect(result.modules[38].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/transform/TransformFormat.js"
          );
          expect(result.modules[39].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/types/ReportType.js"
          );
          expect(result.modules[40].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/utils/Enum.js"
          );
          expect(result.modules[41].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/utils/MathUtil.js"
          );
          expect(result.modules[42].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/utils/ObjectUtil.js"
          );
          expect(result.modules[43].filePath).toBe(
            "./node_modules/@ponticus/escomplex-commons/src/utils/StringUtil.js"
          );
          expect(result.modules[44].filePath).toBe(
            "./node_modules/typhonjs-escomplex-module/src/ESComplexModule.js"
          );
          expect(result.modules[45].filePath).toBe(
            "./node_modules/typhonjs-escomplex-module/src/index.js"
          );
          expect(result.modules[46].filePath).toBe(
            "./node_modules/typhonjs-escomplex-module/src/Plugins.js"
          );

          expect(result.modules[0].srcPath).toBe("./src/ESComplexProject.js");
          expect(result.modules[1].srcPath).toBe("./src/index.js");
          expect(result.modules[2].srcPath).toBe("./src/Plugins.js");
          expect(result.modules[3].srcPath).toBe(
            "./test/fixture/testImportNPMAlias.js"
          );
          expect(result.modules[4].srcPath).toBe(
            "./test/fixture/testRequireNPMAlias.js"
          );
          expect(result.modules[5].srcPath).toBe(
            "@ponticus/escomplex-commons/src/analyze/AnalyzeError.js"
          );
          expect(result.modules[6].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js"
          );
          expect(result.modules[7].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/AbstractReport.js"
          );
          expect(result.modules[8].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/AggregateMethodReport.js"
          );
          expect(result.modules[9].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/averages/HalsteadAverage.js"
          );
          expect(result.modules[10].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/averages/MethodAverage.js"
          );
          expect(result.modules[11].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/averages/ModuleAverage.js"
          );
          expect(result.modules[12].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/ClassReport.js"
          );
          expect(result.modules[13].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/HalsteadData.js"
          );
          expect(result.modules[14].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/MethodReport.js"
          );
          expect(result.modules[15].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/ModuleReport.js"
          );
          expect(result.modules[16].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/traits/actualize.js"
          );
          expect(result.modules[17].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/traits/HalsteadArray.js"
          );
          expect(result.modules[18].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/traits/Trait.js"
          );
          expect(result.modules[19].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/traits/TraitHalstead.js"
          );
          expect(result.modules[20].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/traits/TraitUtil.js"
          );
          expect(result.modules[21].srcPath).toBe(
            "@ponticus/escomplex-commons/src/project/report/ProjectReport.js"
          );
          expect(result.modules[22].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/json/FormatJSON.js"
          );
          expect(result.modules[23].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js"
          );
          expect(result.modules[24].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js"
          );
          expect(result.modules[25].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONModules.js"
          );
          expect(result.modules[26].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js"
          );
          expect(result.modules[27].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js"
          );
          expect(result.modules[28].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js"
          );
          expect(result.modules[29].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js"
          );
          expect(result.modules[30].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js"
          );
          expect(result.modules[31].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/AbstractFormatText.js"
          );
          expect(result.modules[32].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js"
          );
          expect(result.modules[33].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/FormatText.js"
          );
          expect(result.modules[34].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js"
          );
          expect(result.modules[35].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/FormatTextMinimal.js"
          );
          expect(result.modules[36].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/FormatTextModules.js"
          );
          expect(result.modules[37].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/FormatTextVisibility.js"
          );
          expect(result.modules[38].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/TransformFormat.js"
          );
          expect(result.modules[39].srcPath).toBe(
            "@ponticus/escomplex-commons/src/types/ReportType.js"
          );
          expect(result.modules[40].srcPath).toBe(
            "@ponticus/escomplex-commons/src/utils/Enum.js"
          );
          expect(result.modules[41].srcPath).toBe(
            "@ponticus/escomplex-commons/src/utils/MathUtil.js"
          );
          expect(result.modules[42].srcPath).toBe(
            "@ponticus/escomplex-commons/src/utils/ObjectUtil.js"
          );
          expect(result.modules[43].srcPath).toBe(
            "@ponticus/escomplex-commons/src/utils/StringUtil.js"
          );
          expect(result.modules[44].srcPath).toBe(
            "typhonjs-escomplex-module/src/ESComplexModule.js"
          );
          expect(result.modules[45].srcPath).toBe(
            "typhonjs-escomplex-module/src/index.js"
          );
          expect(result.modules[46].srcPath).toBe(
            "typhonjs-escomplex-module/src/Plugins.js"
          );

          expect(result.modules[45].srcPathAlias).toBe(
            "typhonjs-escomplex-module"
          );
        });

        test("modules only contains object hash w/ filePath, srcPath and srcPathAlias entries", () => {
          const testString =
            '[{"filePath":"./src/ESComplexProject.js","srcPath":"./src/ESComplexProject.js"},{"filePath":"./src/index.js","srcPath":"./src/index.js"},{"filePath":"./src/Plugins.js","srcPath":"./src/Plugins.js"},{"filePath":"./test/fixture/testImportNPMAlias.js","srcPath":"./test/fixture/testImportNPMAlias.js"},{"filePath":"./test/fixture/testRequireNPMAlias.js","srcPath":"./test/fixture/testRequireNPMAlias.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/analyze/AnalyzeError.js","srcPath":"@ponticus/escomplex-commons/src/analyze/AnalyzeError.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js","srcPath":"@ponticus/escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/AbstractReport.js","srcPath":"@ponticus/escomplex-commons/src/module/report/AbstractReport.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/AggregateMethodReport.js","srcPath":"@ponticus/escomplex-commons/src/module/report/AggregateMethodReport.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/averages/HalsteadAverage.js","srcPath":"@ponticus/escomplex-commons/src/module/report/averages/HalsteadAverage.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/averages/MethodAverage.js","srcPath":"@ponticus/escomplex-commons/src/module/report/averages/MethodAverage.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/averages/ModuleAverage.js","srcPath":"@ponticus/escomplex-commons/src/module/report/averages/ModuleAverage.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/ClassReport.js","srcPath":"@ponticus/escomplex-commons/src/module/report/ClassReport.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/HalsteadData.js","srcPath":"@ponticus/escomplex-commons/src/module/report/HalsteadData.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/MethodReport.js","srcPath":"@ponticus/escomplex-commons/src/module/report/MethodReport.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/ModuleReport.js","srcPath":"@ponticus/escomplex-commons/src/module/report/ModuleReport.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/traits/actualize.js","srcPath":"@ponticus/escomplex-commons/src/module/traits/actualize.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/traits/HalsteadArray.js","srcPath":"@ponticus/escomplex-commons/src/module/traits/HalsteadArray.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/traits/Trait.js","srcPath":"@ponticus/escomplex-commons/src/module/traits/Trait.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/traits/TraitHalstead.js","srcPath":"@ponticus/escomplex-commons/src/module/traits/TraitHalstead.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/traits/TraitUtil.js","srcPath":"@ponticus/escomplex-commons/src/module/traits/TraitUtil.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/project/report/ProjectReport.js","srcPath":"@ponticus/escomplex-commons/src/project/report/ProjectReport.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSON.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/json/FormatJSON.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONModules.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONModules.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/AbstractFormatText.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/AbstractFormatText.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatText.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/FormatText.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextMinimal.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/FormatTextMinimal.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextModules.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/FormatTextModules.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextVisibility.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/FormatTextVisibility.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/TransformFormat.js","srcPath":"@ponticus/escomplex-commons/src/transform/TransformFormat.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/types/ReportType.js","srcPath":"@ponticus/escomplex-commons/src/types/ReportType.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/utils/Enum.js","srcPath":"@ponticus/escomplex-commons/src/utils/Enum.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/utils/MathUtil.js","srcPath":"@ponticus/escomplex-commons/src/utils/MathUtil.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/utils/ObjectUtil.js","srcPath":"@ponticus/escomplex-commons/src/utils/ObjectUtil.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/utils/StringUtil.js","srcPath":"@ponticus/escomplex-commons/src/utils/StringUtil.js"},{"filePath":"./node_modules/typhonjs-escomplex-module/src/ESComplexModule.js","srcPath":"typhonjs-escomplex-module/src/ESComplexModule.js"},{"filePath":"./node_modules/typhonjs-escomplex-module/src/index.js","srcPath":"typhonjs-escomplex-module/src/index.js","srcPathAlias":"typhonjs-escomplex-module"},{"filePath":"./node_modules/typhonjs-escomplex-module/src/Plugins.js","srcPath":"typhonjs-escomplex-module/src/Plugins.js"}]';

          expect(JSON.stringify(result.modules)).toBe(testString);
        });
      });

      describe("local source + NPM module @ponticus/escomplex-commons and typhonjs-escomplex-module test w/ dependencies:", () => {
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
          expect(result.modules[0].srcPath).toBe("./src/ESComplexProject.js");
          expect(result.modules[1].srcPath).toBe("./src/index.js");
          expect(result.modules[2].srcPath).toBe("./src/Plugins.js");
          expect(result.modules[3].srcPath).toBe(
            "./test/fixture/testImportNPMAlias.js"
          );
          expect(result.modules[4].srcPath).toBe(
            "./test/fixture/testRequireNPMAlias.js"
          );
          expect(result.modules[5].srcPath).toBe(
            "@ponticus/escomplex-commons/src/analyze/AnalyzeError.js"
          );
          expect(result.modules[6].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js"
          );
          expect(result.modules[7].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/AbstractReport.js"
          );
          expect(result.modules[8].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/AggregateMethodReport.js"
          );
          expect(result.modules[9].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/averages/HalsteadAverage.js"
          );
          expect(result.modules[10].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/averages/MethodAverage.js"
          );
          expect(result.modules[11].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/averages/ModuleAverage.js"
          );
          expect(result.modules[12].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/ClassReport.js"
          );
          expect(result.modules[13].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/HalsteadData.js"
          );
          expect(result.modules[14].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/MethodReport.js"
          );
          expect(result.modules[15].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/report/ModuleReport.js"
          );
          expect(result.modules[16].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/traits/actualize.js"
          );
          expect(result.modules[17].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/traits/HalsteadArray.js"
          );
          expect(result.modules[18].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/traits/Trait.js"
          );
          expect(result.modules[19].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/traits/TraitHalstead.js"
          );
          expect(result.modules[20].srcPath).toBe(
            "@ponticus/escomplex-commons/src/module/traits/TraitUtil.js"
          );
          expect(result.modules[21].srcPath).toBe(
            "@ponticus/escomplex-commons/src/project/report/ProjectReport.js"
          );
          expect(result.modules[22].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/json/FormatJSON.js"
          );
          expect(result.modules[23].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js"
          );
          expect(result.modules[24].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js"
          );
          expect(result.modules[25].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONModules.js"
          );
          expect(result.modules[26].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js"
          );
          expect(result.modules[27].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js"
          );
          expect(result.modules[28].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js"
          );
          expect(result.modules[29].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js"
          );
          expect(result.modules[30].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js"
          );
          expect(result.modules[31].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/AbstractFormatText.js"
          );
          expect(result.modules[32].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js"
          );
          expect(result.modules[33].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/FormatText.js"
          );
          expect(result.modules[34].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js"
          );
          expect(result.modules[35].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/FormatTextMinimal.js"
          );
          expect(result.modules[36].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/FormatTextModules.js"
          );
          expect(result.modules[37].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/formats/text/FormatTextVisibility.js"
          );
          expect(result.modules[38].srcPath).toBe(
            "@ponticus/escomplex-commons/src/transform/TransformFormat.js"
          );
          expect(result.modules[39].srcPath).toBe(
            "@ponticus/escomplex-commons/src/types/ReportType.js"
          );
          expect(result.modules[40].srcPath).toBe(
            "@ponticus/escomplex-commons/src/utils/Enum.js"
          );
          expect(result.modules[41].srcPath).toBe(
            "@ponticus/escomplex-commons/src/utils/MathUtil.js"
          );
          expect(result.modules[42].srcPath).toBe(
            "@ponticus/escomplex-commons/src/utils/ObjectUtil.js"
          );
          expect(result.modules[43].srcPath).toBe(
            "@ponticus/escomplex-commons/src/utils/StringUtil.js"
          );
          expect(result.modules[44].srcPath).toBe(
            "typhonjs-escomplex-module/src/ESComplexModule.js"
          );
          expect(result.modules[45].srcPath).toBe(
            "typhonjs-escomplex-module/src/index.js"
          );
          expect(result.modules[46].srcPath).toBe(
            "typhonjs-escomplex-module/src/Plugins.js"
          );
        });

        test("adjacency list is correct", () => {
          const testString =
            '[{"row":0,"cols":[2,15,21,44]},{"row":1,"cols":[0]},{"row":3,"cols":[45]},{"row":4,"cols":[45]},{"row":5,"cols":[39]},{"row":7,"cols":[38]},{"row":8,"cols":[7,13]},{"row":10,"cols":[9]},{"row":11,"cols":[10]},{"row":12,"cols":[5,7,8,10,38,39,42]},{"row":14,"cols":[5,8]},{"row":15,"cols":[5,7,8,10,12,38,39,41,42]},{"row":16,"cols":[17,18,20]},{"row":17,"cols":[19]},{"row":21,"cols":[11,15,38,39,41,42,43]},{"row":23,"cols":[39,42]},{"row":24,"cols":[39,42]},{"row":25,"cols":[39]},{"row":26,"cols":[33,43]},{"row":27,"cols":[34]},{"row":28,"cols":[35,43]},{"row":29,"cols":[36,43]},{"row":30,"cols":[37]},{"row":31,"cols":[39,42,43]},{"row":32,"cols":[39,42]},{"row":33,"cols":[31,38,39,43]},{"row":34,"cols":[32]},{"row":35,"cols":[31,39,43]},{"row":36,"cols":[31,39,43]},{"row":37,"cols":[32]},{"row":38,"cols":[22,23,24,25,26,27,28,29,30,33,34,35,36,37,39]},{"row":39,"cols":[40]},{"row":41,"cols":[42]},{"row":43,"cols":[42]},{"row":44,"cols":[46]},{"row":45,"cols":[44]},{"row":46,"cols":[15]}]';

          expect(JSON.stringify(result.adjacencyList)).toBe(testString);
        });

        test("visibility list is correct", () => {
          const testString =
            '[{"row":0,"cols":[0,2,5,7,8,9,10,11,12,13,15,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,46]},{"row":1,"cols":[0,1,2,5,7,8,9,10,11,12,13,15,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,46]},{"row":2,"cols":[2]},{"row":3,"cols":[3,5,7,8,9,10,12,13,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]},{"row":4,"cols":[4,5,7,8,9,10,12,13,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]},{"row":5,"cols":[5,39,40]},{"row":6,"cols":[6]},{"row":7,"cols":[7,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":8,"cols":[7,8,13,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":9,"cols":[9]},{"row":10,"cols":[9,10]},{"row":11,"cols":[9,10,11]},{"row":12,"cols":[5,7,8,9,10,12,13,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":13,"cols":[13]},{"row":14,"cols":[5,7,8,13,14,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":15,"cols":[5,7,8,9,10,12,13,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43]},{"row":16,"cols":[16,17,18,19,20]},{"row":17,"cols":[17,19]},{"row":18,"cols":[18]},{"row":19,"cols":[19]},{"row":20,"cols":[20]},{"row":21,"cols":[5,7,8,9,10,11,12,13,15,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43]},{"row":22,"cols":[22]},{"row":23,"cols":[23,39,40,42]},{"row":24,"cols":[24,39,40,42]},{"row":25,"cols":[25,39,40]},{"row":26,"cols":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":27,"cols":[27,32,34,39,40,42]},{"row":28,"cols":[28,31,35,39,40,42,43]},{"row":29,"cols":[29,31,36,39,40,42,43]},{"row":30,"cols":[30,32,37,39,40,42]},{"row":31,"cols":[31,39,40,42,43]},{"row":32,"cols":[32,39,40,42]},{"row":33,"cols":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":34,"cols":[32,34,39,40,42]},{"row":35,"cols":[31,35,39,40,42,43]},{"row":36,"cols":[31,36,39,40,42,43]},{"row":37,"cols":[32,37,39,40,42]},{"row":38,"cols":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":39,"cols":[39,40]},{"row":40,"cols":[40]},{"row":41,"cols":[41,42]},{"row":42,"cols":[42]},{"row":43,"cols":[42,43]},{"row":44,"cols":[5,7,8,9,10,12,13,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,46]},{"row":45,"cols":[5,7,8,9,10,12,13,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]},{"row":46,"cols":[5,7,8,9,10,12,13,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,46]}]';

          expect(JSON.stringify(result.visibilityList)).toBe(testString);
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
              ast: Parser.parse(
                'import a from "./a/b"; import aa from "./a/c";'
              ),
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
}
