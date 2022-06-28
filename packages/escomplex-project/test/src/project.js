import { suite, test, teardown, setup } from 'mocha';

import fs               from 'fs';
import path from 'path';

import { assert }       from 'chai';

import parsers          from './parsers';
import * as testconfig  from './testconfig';

import ProjectReport    from '@ponticus/escomplex-commons/dist/project/report/ProjectReport';

import escomplexProject from '../../src';

if (testconfig.modules['project'])
{
   parsers.forEach((Parser) =>
   {
      /**
       * Load project source and local test files from NPM module @ponticus/escomplex-commons and
       * typhonjs-escomplex-module. The order is purposely out of order to test sorting of `srcPath`.
       * @type {string[]}
       */
      const s_LOCAL_TEST_FILES =
      [
         './node_modules/escomplex-module/src/ESComplexModule.js',
         './node_modules/escomplex-module/src/index.js',
         './node_modules/escomplex-module/src/Plugins.js',

         './node_modules/escomplex-commons/src/utils/Enum.js',
         './node_modules/escomplex-commons/src/utils/MathUtil.js',
         './node_modules/escomplex-commons/src/utils/StringUtil.js',
         './node_modules/escomplex-commons/src/utils/ObjectUtil.js',
         './node_modules/escomplex-commons/src/project/report/ProjectReport.js',
         './node_modules/escomplex-commons/src/types/ReportType.js',
         './node_modules/escomplex-commons/src/transform/TransformFormat.js',
         './node_modules/escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js',
         './node_modules/escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js',
         './node_modules/escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js',
         './node_modules/escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js',
         './node_modules/escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js',
         './node_modules/escomplex-commons/src/transform/formats/text/AbstractFormatText.js',
         './node_modules/escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js',
         './node_modules/escomplex-commons/src/transform/formats/text/FormatText.js',
         './node_modules/escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js',
         './node_modules/escomplex-commons/src/transform/formats/text/FormatTextMinimal.js',
         './node_modules/escomplex-commons/src/transform/formats/text/FormatTextModules.js',
         './node_modules/escomplex-commons/src/transform/formats/text/FormatTextVisibility.js',
         './node_modules/escomplex-commons/src/transform/formats/json/FormatJSON.js',
         './node_modules/escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js',
         './node_modules/escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js',
         './node_modules/escomplex-commons/src/transform/formats/json/FormatJSONModules.js',
         './node_modules/escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js',
         './node_modules/escomplex-commons/src/module/report/AbstractReport.js',
         './node_modules/escomplex-commons/src/module/report/AggregateMethodReport.js',
         './node_modules/escomplex-commons/src/module/report/ClassReport.js',
         './node_modules/escomplex-commons/src/module/report/HalsteadData.js',
         './node_modules/escomplex-commons/src/module/report/MethodReport.js',
         './node_modules/escomplex-commons/src/module/report/ModuleReport.js',
         './node_modules/escomplex-commons/src/module/report/averages/ModuleAverage.js',
         './node_modules/escomplex-commons/src/module/report/averages/HalsteadAverage.js',
         './node_modules/escomplex-commons/src/module/report/averages/MethodAverage.js',
         './node_modules/escomplex-commons/src/module/traits/actualize.js',
         './node_modules/escomplex-commons/src/module/traits/HalsteadArray.js',
         './node_modules/escomplex-commons/src/module/traits/TraitUtil.js',
         './node_modules/escomplex-commons/src/module/traits/Trait.js',
         './node_modules/escomplex-commons/src/module/traits/TraitHalstead.js',
         './node_modules/escomplex-commons/src/analyze/AnalyzeError.js',

         './test/fixture/testImportNPMAlias.js',
         './test/fixture/testRequireNPMAlias.js',

         './src/ESComplexProject.js',
         './src/index.js',
         './src/Plugins.js'
      ];

      const s_LOCAL_TEST_DATA = s_LOCAL_TEST_FILES.map((filePath) =>
      {
         let srcPath = filePath;
         let srcPathAlias = undefined;

         // Remove leading `./node_modules/` from file path for the source path which is what is referenced in the code.
         if (filePath.startsWith('./node_modules/'))
         {
            srcPath = filePath.replace(/^\.\/node_modules\//, '');
         }

         // Add srcPathAlias for typhonjs-escomplex-module NPM main alias.
         if (filePath === './node_modules/escomplex-module/src/index.js')
         {
            srcPathAlias = 'typhonjs-escomplex-module';
         }

         // Load the project data from the test module / files.
         const testDataFilePath = filePath.replace(/^\.\//, './escomplex-test-data/project/');

         return {
            ast: Parser.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', '..', testDataFilePath), 'utf8')),
            filePath,
            srcPath,
            srcPathAlias
         };
      });

      suite(`(${Parser.name}) project:`, () =>
      {
         test('require returns object', () =>
         {
            assert.isObject(escomplexProject);
         });

         test('analyze function is exported', () =>
         {
            assert.isFunction(escomplexProject.analyze);
         });

         test('process function is exported', () =>
         {
            assert.isFunction(escomplexProject.process);
         });

         test('analyzeAsync function is exported', () =>
         {
            assert.isFunction(escomplexProject.analyzeAsync);
         });

         test('processAsync function is exported', () =>
         {
            assert.isFunction(escomplexProject.processAsync);
         });

         test('analyze throws when modules is object', () =>
         {
            assert.throws(() =>
            {
               escomplexProject.analyze({
                  body: [],
                  loc: {
                     start: {
                        line: 0
                     },
                     end: {
                        line: 0
                     }
                  }
               });
            });
         });

         test('analyze does not throw when modules is array', () =>
         {
            assert.doesNotThrow(() =>
            {
               escomplexProject.analyze([]);
            });
         });

         test('analyzeAsync does not throw when modules is array', () =>
         {
            assert.doesNotThrow(() =>
            {
               escomplexProject.analyzeAsync([]);
            });
         });

         test('analyze throws when modules is not an array', () =>
         {
            assert.throws(() =>
            {
               escomplexProject.analyze({});
            });
         });

         test('analyze throws when `srcPath` is missing', () =>
         {
            assert.throws(() =>
            {
               escomplexProject.analyze([{ ast: Parser.parse('if (true) { "foo"; } else { "bar"; }') }]);
            });
         });

         suite('no modules:', () =>
         {
            let result;

            setup(() =>
            {
               result = escomplexProject.analyze([]);
            });

            teardown(() =>
            {
               result = undefined;
            });

            test('object was returned', () =>
            {
               assert.isObject(result);
            });

            test('modules array exists', () =>
            {
               assert.isArray(result.modules);
            });

            test('modules array has zero length', () =>
            {
               assert.lengthOf(result.modules, 0);
            });

            test('adjacency list exists', () =>
            {
               assert.isArray(result.adjacencyList);
            });

            test('adjacency list has zero length', () =>
            {
               assert.lengthOf(result.adjacencyList, 0);
            });

            test('first-order density is correct', () =>
            {
               assert.strictEqual(result.firstOrderDensity, 0);
            });

            test('change cost is correct', () =>
            {
               assert.strictEqual(result.changeCost, 0);
            });

            test('core size is correct', () =>
            {
               assert.strictEqual(result.coreSize, 0);
            });

            test('mean per-function logical LOC is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.methodAverage.sloc.logical, 0);
            });

            test('mean per-function cyclomatic complexity is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.methodAverage.cyclomatic, 0);
            });

            test('mean per-function Halstead effort is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.methodAverage.halstead.effort, 0);
            });

            test('mean per-function parameter count is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.methodAverage.paramCount, 0);
            });

            test('mean per-function maintainability index is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.maintainability, 0);
            });
         });

         suite('one module:', () =>
         {
            let result;

            setup(() =>
            {
               result = escomplexProject.analyze([{ ast: Parser.parse('if (true) { "foo"; } else { "bar"; }'), srcPath: 'a' }]);
            });

            teardown(() =>
            {
               result = undefined;
            });

            test('modules is correct length', () =>
            {
               assert.lengthOf(result.modules, 1);
            });

            test('first module aggregate has correct physical lines of code', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.sloc.physical, 1);
            });

            test('first module aggregate has correct logical lines of code', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.sloc.logical, 4);
            });

            test('first module aggregate has correct cyclomatic complexity', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.cyclomatic, 2);
            });

            test('first module aggregate has correct cyclomatic complexity density', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.cyclomaticDensity, 50);
            });

            test('first module methods is empty', () =>
            {
               assert.lengthOf(result.modules[0].methods, 0);
            });

            test('first module aggregate has correct Halstead total operators', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.operators.total, 2);
            });

            test('first module aggregate has correct Halstead distinct operators', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.operators.distinct, 2);
            });

            test('first module aggregate has correct Halstead total operands', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.operands.total, 3);
            });

            test('first module aggregate has correct Halstead distinct operands', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.operands.distinct, 3);
            });

            test('first module aggregate has correct Halstead operator identifier length', () =>
            {
               assert.lengthOf(
                  result.modules[0].aggregate.halstead.operators.identifiers,
                  result.modules[0].aggregate.halstead.operators.distinct
               );
            });

            test('first module aggregate has correct Halstead operand identifier length', () =>
            {
               assert.lengthOf(
                  result.modules[0].aggregate.halstead.operands.identifiers,
                  result.modules[0].aggregate.halstead.operands.distinct
               );
            });

            test('first module aggregate has correct Halstead length', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.length, 5);
            });

            test('first module aggregate has correct Halstead vocabulary', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.vocabulary, 5);
            });

            test('first module aggregate has correct Halstead difficulty', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.difficulty, 1);
            });

            test('first module aggregate has correct Halstead volume', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.volume, 11.61);
            });

            test('first module aggregate has correct Halstead effort', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.effort, 11.61);
            });

            test('first module aggregate has correct Halstead bugs', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.bugs, 0.004);
            });

            test('first module aggregate has correct Halstead time', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.time, 0.645);
            });

            test('first module has correct srcPath', () =>
            {
               assert.strictEqual(result.modules[0].srcPath, 'a');
            });

            test('first-order density is correct', () =>
            {
               assert.strictEqual(result.firstOrderDensity, 0);
            });

            test('change cost is correct', () =>
            {
               assert.strictEqual(result.changeCost, 100);
            });

            test('core size is correct', () =>
            {
               assert.strictEqual(result.coreSize, 0);
            });

            test('mean per-function logical LOC is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.methodAverage.sloc.logical, 0);
            });

            test('mean per-function cyclomatic complexity is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.methodAverage.cyclomatic, 0);
            });

            test('mean per-function Halstead effort is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.methodAverage.halstead.effort, 0);
            });

            test('mean per-function parameter count is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.methodAverage.paramCount, 0);
            });

            test('mean per-function maintainability index is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.maintainability, 139.464);
            });
         });

         suite('two modules:', () =>
         {
            let result;

            setup(() =>
            {
               result = escomplexProject.analyze([
                  {
                     ast: Parser.parse('function foo (a, b) { if (a) { b(a); } else { a(b); } } function bar (c, d) { var i; for (i = 0; i < c.length; i += 1) { d += 1; } console.log(d); }'),
                     srcPath: 'b'
                  },
                  { ast: Parser.parse('if (true) { "foo"; } else { "bar"; }'), srcPath: 'a' }
               ]);
            });

            teardown(() =>
            {
               result = undefined;
            });

            test('modules is correct length', () =>
            {
               assert.lengthOf(result.modules, 2);
            });

            test('first module aggregate has correct physical lines of code', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.sloc.physical, 1);
            });

            test('first module aggregate has correct logical lines of code', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.sloc.logical, 4);
            });

            test('first module aggregate has correct cyclomatic complexity', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.cyclomatic, 2);
            });

            test('first module aggregate has correct cyclomatic complexity density', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.cyclomaticDensity, 50);
            });

            test('first module methods is empty', () =>
            {
               assert.lengthOf(result.modules[0].methods, 0);
            });

            test('first module aggregate has correct Halstead total operators', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.operators.total, 2);
            });

            test('first module aggregate has correct Halstead distinct operators', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.operators.distinct, 2);
            });

            test('first module aggregate has correct Halstead total operands', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.operands.total, 3);
            });

            test('first module aggregate has correct Halstead distinct operands', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.operands.distinct, 3);
            });

            test('first module aggregate has correct Halstead operator identifier length', () =>
            {
               assert.lengthOf(
                  result.modules[0].aggregate.halstead.operators.identifiers,
                  result.modules[0].aggregate.halstead.operators.distinct
               );
            });

            test('first module aggregate has correct Halstead operand identifier length', () =>
            {
               assert.lengthOf(
                  result.modules[0].aggregate.halstead.operands.identifiers,
                  result.modules[0].aggregate.halstead.operands.distinct
               );
            });

            test('first module aggregate has correct Halstead length', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.length, 5);
            });

            test('first module aggregate has correct Halstead vocabulary', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.vocabulary, 5);
            });

            test('first module aggregate has correct Halstead difficulty', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.difficulty, 1);
            });

            test('first module aggregate has correct Halstead volume', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.volume, 11.61);
            });

            test('first module aggregate has correct Halstead effort', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.effort, 11.61);
            });

            test('first module aggregate has correct Halstead bugs', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.bugs, 0.004);
            });

            test('first module aggregate has correct Halstead time', () =>
            {
               assert.strictEqual(result.modules[0].aggregate.halstead.time, 0.645);
            });

            test('first module has correct srcPath', () =>
            {
               assert.strictEqual(result.modules[0].srcPath, 'a');
            });

            test('second module maintainability index is correct', () =>
            {
               assert.strictEqual(result.modules[1].maintainability, 129.225);
            });

            test('second module first method has correct parameter count', () =>
            {
               assert.strictEqual(result.modules[1].methods[0].paramCount, 2);
            });

            test('second module second method has correct parameter count', () =>
            {
               assert.strictEqual(result.modules[1].methods[1].paramCount, 2);
            });

            test('second module aggregate has correct parameter count', () =>
            {
               assert.strictEqual(result.modules[1].aggregate.paramCount, 4);
            });

            test('second module mean parameter count is correct', () =>
            {
               assert.strictEqual(result.modules[1].methodAverage.paramCount, 2);
            });

            test('second module has correct srcPath', () =>
            {
               assert.strictEqual(result.modules[1].srcPath, 'b');
            });

            test('first-order density is correct', () =>
            {
               assert.strictEqual(result.firstOrderDensity, 0);
            });

            test('change cost is correct', () =>
            {
               assert.strictEqual(result.changeCost, 50);
            });

            test('core size is correct', () =>
            {
               assert.strictEqual(result.coreSize, 0);
            });

            test('mean per-function logical LOC is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.methodAverage.sloc.logical, 2);
            });

            test('mean per-function cyclomatic complexity is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.methodAverage.cyclomatic, 1);
            });

            test('mean per-function Halstead effort is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.methodAverage.halstead.effort, 141.804);
            });

            test('mean per-function parameter count is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.methodAverage.paramCount, 1);
            });

            test('mean per-function maintainability index is correct', () =>
            {
               assert.strictEqual(result.moduleAverage.maintainability, 134.344);
            });
         });

         suite('two modules with different options:', () =>
         {
            const modules =
            [
               {
                  ast: Parser.parse('function foo (a, b) { if (a) { b(a); } else { a(b); } } function bar (c, d) { var i; for (i = 0; i < c.length; i += 1) { d += 1; } console.log(d); }'),
                  srcPath: 'b'
               },
               {
                  ast: Parser.parse('if (true) { "foo"; } else { "bar"; }'),
                  srcPath: 'a'
               }
            ];

            let reportsOnly;

            setup(() =>
            {
               reportsOnly = escomplexProject.analyze(modules, { skipCalculation: true });
            });

            test('should have default values if we call with skipCalculation', () =>
            {
               assert.lengthOf(reportsOnly.modules, 2);
               assert.strictEqual(reportsOnly.moduleAverage.methodAverage.sloc.logical, 0);
               assert.strictEqual(reportsOnly.moduleAverage.maintainability, 0);
               assert.strictEqual(reportsOnly.coreSize, 0);
               assert.isUndefined(reportsOnly.adjacencyList);
               assert.isUndefined(reportsOnly.visibilityList);
            });

            test('should have default coreSize and visibilityMatrix if we call with noCoreSize', () =>
            {
               const results = escomplexProject.analyze(modules, { noCoreSize: true });

               assert.strictEqual(results.coreSize, 0);
               assert.isUndefined(results.visibilityList);

               // make sure we still have a few things though
               assert.ok(results.adjacencyList);
               assert.ok(results.moduleAverage.methodAverage.sloc.logical);
            });

            test('should be able to run process', () =>
            {
               const fullReport = escomplexProject.analyze(modules);
               const calcReport = escomplexProject.process(reportsOnly);

               assert.deepEqual(calcReport, fullReport);
            });

            test('should be able to run process without calculating coreSize', () =>
            {
               const results = escomplexProject.process(reportsOnly, { noCoreSize: true });
               assert.strictEqual(results.coreSize, 0);
               assert.isUndefined(results.visibilityList);

               // make sure we still have a few things though
               assert.ok(results.adjacencyList);
               assert.ok(results.moduleAverage.methodAverage.sloc.logical);
            });

            test('should be able to run processAsync', () =>
            {
               const fullReport = escomplexProject.analyze(modules);

               escomplexProject.processAsync(reportsOnly).then((calcReport) =>
               {
                  assert.deepEqual(calcReport, fullReport);
               });
            });
         });

         suite('local source + NPM module @ponticus/escomplex-commons test w/ serializeModules false:', () =>
         {
            let result;

            setup(() =>
            {
               result = escomplexProject.analyze(s_LOCAL_TEST_DATA, { serializeModules: false });
            });

            teardown(() =>
            {
               result = undefined;
            });

            test('modules are in correct order', () =>
            {
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
               assert.strictEqual(result.modules[0].filePath, './src/ESComplexProject.js');
               assert.strictEqual(result.modules[1].filePath, './src/index.js');
               assert.strictEqual(result.modules[2].filePath, './src/Plugins.js');
               assert.strictEqual(result.modules[3].filePath, './test/fixture/testImportNPMAlias.js');
               assert.strictEqual(result.modules[4].filePath, './test/fixture/testRequireNPMAlias.js');
               assert.strictEqual(result.modules[5].filePath, './node_modules/@ponticus/escomplex-commons/src/analyze/AnalyzeError.js');
               assert.strictEqual(result.modules[6].filePath, './node_modules/@ponticus/escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js');
               assert.strictEqual(result.modules[7].filePath, './node_modules/@ponticus/escomplex-commons/src/module/report/AbstractReport.js');
               assert.strictEqual(result.modules[8].filePath, './node_modules/@ponticus/escomplex-commons/src/module/report/AggregateMethodReport.js');
               assert.strictEqual(result.modules[9].filePath, './node_modules/@ponticus/escomplex-commons/src/module/report/averages/HalsteadAverage.js');
               assert.strictEqual(result.modules[10].filePath, './node_modules/@ponticus/escomplex-commons/src/module/report/averages/MethodAverage.js');
               assert.strictEqual(result.modules[11].filePath, './node_modules/@ponticus/escomplex-commons/src/module/report/averages/ModuleAverage.js');
               assert.strictEqual(result.modules[12].filePath, './node_modules/@ponticus/escomplex-commons/src/module/report/ClassReport.js');
               assert.strictEqual(result.modules[13].filePath, './node_modules/@ponticus/escomplex-commons/src/module/report/HalsteadData.js');
               assert.strictEqual(result.modules[14].filePath, './node_modules/@ponticus/escomplex-commons/src/module/report/MethodReport.js');
               assert.strictEqual(result.modules[15].filePath, './node_modules/@ponticus/escomplex-commons/src/module/report/ModuleReport.js');
               assert.strictEqual(result.modules[16].filePath, './node_modules/@ponticus/escomplex-commons/src/module/traits/actualize.js');
               assert.strictEqual(result.modules[17].filePath, './node_modules/@ponticus/escomplex-commons/src/module/traits/HalsteadArray.js');
               assert.strictEqual(result.modules[18].filePath, './node_modules/@ponticus/escomplex-commons/src/module/traits/Trait.js');
               assert.strictEqual(result.modules[19].filePath, './node_modules/@ponticus/escomplex-commons/src/module/traits/TraitHalstead.js');
               assert.strictEqual(result.modules[20].filePath, './node_modules/@ponticus/escomplex-commons/src/module/traits/TraitUtil.js');
               assert.strictEqual(result.modules[21].filePath, './node_modules/@ponticus/escomplex-commons/src/project/report/ProjectReport.js');
               assert.strictEqual(result.modules[22].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSON.js');
               assert.strictEqual(result.modules[23].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js');
               assert.strictEqual(result.modules[24].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js');
               assert.strictEqual(result.modules[25].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONModules.js');
               assert.strictEqual(result.modules[26].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js');
               assert.strictEqual(result.modules[27].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js');
               assert.strictEqual(result.modules[28].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js');
               assert.strictEqual(result.modules[29].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js');
               assert.strictEqual(result.modules[30].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js');
               assert.strictEqual(result.modules[31].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/text/AbstractFormatText.js');
               assert.strictEqual(result.modules[32].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js');
               assert.strictEqual(result.modules[33].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatText.js');
               assert.strictEqual(result.modules[34].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js');
               assert.strictEqual(result.modules[35].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextMinimal.js');
               assert.strictEqual(result.modules[36].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextModules.js');
               assert.strictEqual(result.modules[37].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextVisibility.js');
               assert.strictEqual(result.modules[38].filePath, './node_modules/@ponticus/escomplex-commons/src/transform/TransformFormat.js');
               assert.strictEqual(result.modules[39].filePath, './node_modules/@ponticus/escomplex-commons/src/types/ReportType.js');
               assert.strictEqual(result.modules[40].filePath, './node_modules/@ponticus/escomplex-commons/src/utils/Enum.js');
               assert.strictEqual(result.modules[41].filePath, './node_modules/@ponticus/escomplex-commons/src/utils/MathUtil.js');
               assert.strictEqual(result.modules[42].filePath, './node_modules/@ponticus/escomplex-commons/src/utils/ObjectUtil.js');
               assert.strictEqual(result.modules[43].filePath, './node_modules/@ponticus/escomplex-commons/src/utils/StringUtil.js');
               assert.strictEqual(result.modules[44].filePath, './node_modules/typhonjs-escomplex-module/src/ESComplexModule.js');
               assert.strictEqual(result.modules[45].filePath, './node_modules/typhonjs-escomplex-module/src/index.js');
               assert.strictEqual(result.modules[46].filePath, './node_modules/typhonjs-escomplex-module/src/Plugins.js');

               assert.strictEqual(result.modules[0].srcPath, './src/ESComplexProject.js');
               assert.strictEqual(result.modules[1].srcPath, './src/index.js');
               assert.strictEqual(result.modules[2].srcPath, './src/Plugins.js');
               assert.strictEqual(result.modules[3].srcPath, './test/fixture/testImportNPMAlias.js');
               assert.strictEqual(result.modules[4].srcPath, './test/fixture/testRequireNPMAlias.js');
               assert.strictEqual(result.modules[5].srcPath, '@ponticus/escomplex-commons/src/analyze/AnalyzeError.js');
               assert.strictEqual(result.modules[6].srcPath, '@ponticus/escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js');
               assert.strictEqual(result.modules[7].srcPath, '@ponticus/escomplex-commons/src/module/report/AbstractReport.js');
               assert.strictEqual(result.modules[8].srcPath, '@ponticus/escomplex-commons/src/module/report/AggregateMethodReport.js');
               assert.strictEqual(result.modules[9].srcPath, '@ponticus/escomplex-commons/src/module/report/averages/HalsteadAverage.js');
               assert.strictEqual(result.modules[10].srcPath, '@ponticus/escomplex-commons/src/module/report/averages/MethodAverage.js');
               assert.strictEqual(result.modules[11].srcPath, '@ponticus/escomplex-commons/src/module/report/averages/ModuleAverage.js');
               assert.strictEqual(result.modules[12].srcPath, '@ponticus/escomplex-commons/src/module/report/ClassReport.js');
               assert.strictEqual(result.modules[13].srcPath, '@ponticus/escomplex-commons/src/module/report/HalsteadData.js');
               assert.strictEqual(result.modules[14].srcPath, '@ponticus/escomplex-commons/src/module/report/MethodReport.js');
               assert.strictEqual(result.modules[15].srcPath, '@ponticus/escomplex-commons/src/module/report/ModuleReport.js');
               assert.strictEqual(result.modules[16].srcPath, '@ponticus/escomplex-commons/src/module/traits/actualize.js');
               assert.strictEqual(result.modules[17].srcPath, '@ponticus/escomplex-commons/src/module/traits/HalsteadArray.js');
               assert.strictEqual(result.modules[18].srcPath, '@ponticus/escomplex-commons/src/module/traits/Trait.js');
               assert.strictEqual(result.modules[19].srcPath, '@ponticus/escomplex-commons/src/module/traits/TraitHalstead.js');
               assert.strictEqual(result.modules[20].srcPath, '@ponticus/escomplex-commons/src/module/traits/TraitUtil.js');
               assert.strictEqual(result.modules[21].srcPath, '@ponticus/escomplex-commons/src/project/report/ProjectReport.js');
               assert.strictEqual(result.modules[22].srcPath, '@ponticus/escomplex-commons/src/transform/formats/json/FormatJSON.js');
               assert.strictEqual(result.modules[23].srcPath, '@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js');
               assert.strictEqual(result.modules[24].srcPath, '@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js');
               assert.strictEqual(result.modules[25].srcPath, '@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONModules.js');
               assert.strictEqual(result.modules[26].srcPath, '@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js');
               assert.strictEqual(result.modules[27].srcPath, '@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js');
               assert.strictEqual(result.modules[28].srcPath, '@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js');
               assert.strictEqual(result.modules[29].srcPath, '@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js');
               assert.strictEqual(result.modules[30].srcPath, '@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js');
               assert.strictEqual(result.modules[31].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/AbstractFormatText.js');
               assert.strictEqual(result.modules[32].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js');
               assert.strictEqual(result.modules[33].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/FormatText.js');
               assert.strictEqual(result.modules[34].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js');
               assert.strictEqual(result.modules[35].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/FormatTextMinimal.js');
               assert.strictEqual(result.modules[36].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/FormatTextModules.js');
               assert.strictEqual(result.modules[37].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/FormatTextVisibility.js');
               assert.strictEqual(result.modules[38].srcPath, '@ponticus/escomplex-commons/src/transform/TransformFormat.js');
               assert.strictEqual(result.modules[39].srcPath, '@ponticus/escomplex-commons/src/types/ReportType.js');
               assert.strictEqual(result.modules[40].srcPath, '@ponticus/escomplex-commons/src/utils/Enum.js');
               assert.strictEqual(result.modules[41].srcPath, '@ponticus/escomplex-commons/src/utils/MathUtil.js');
               assert.strictEqual(result.modules[42].srcPath, '@ponticus/escomplex-commons/src/utils/ObjectUtil.js');
               assert.strictEqual(result.modules[43].srcPath, '@ponticus/escomplex-commons/src/utils/StringUtil.js');
               assert.strictEqual(result.modules[44].srcPath, 'typhonjs-escomplex-module/src/ESComplexModule.js');
               assert.strictEqual(result.modules[45].srcPath, 'typhonjs-escomplex-module/src/index.js');
               assert.strictEqual(result.modules[46].srcPath, 'typhonjs-escomplex-module/src/Plugins.js');

               assert.strictEqual(result.modules[45].srcPathAlias, 'typhonjs-escomplex-module');
            });

            test('modules only contains object hash w/ filePath, srcPath and srcPathAlias entries', () =>
            {
               const testString = '[{"filePath":"./src/ESComplexProject.js","srcPath":"./src/ESComplexProject.js"},{"filePath":"./src/index.js","srcPath":"./src/index.js"},{"filePath":"./src/Plugins.js","srcPath":"./src/Plugins.js"},{"filePath":"./test/fixture/testImportNPMAlias.js","srcPath":"./test/fixture/testImportNPMAlias.js"},{"filePath":"./test/fixture/testRequireNPMAlias.js","srcPath":"./test/fixture/testRequireNPMAlias.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/analyze/AnalyzeError.js","srcPath":"@ponticus/escomplex-commons/src/analyze/AnalyzeError.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js","srcPath":"@ponticus/escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/AbstractReport.js","srcPath":"@ponticus/escomplex-commons/src/module/report/AbstractReport.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/AggregateMethodReport.js","srcPath":"@ponticus/escomplex-commons/src/module/report/AggregateMethodReport.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/averages/HalsteadAverage.js","srcPath":"@ponticus/escomplex-commons/src/module/report/averages/HalsteadAverage.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/averages/MethodAverage.js","srcPath":"@ponticus/escomplex-commons/src/module/report/averages/MethodAverage.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/averages/ModuleAverage.js","srcPath":"@ponticus/escomplex-commons/src/module/report/averages/ModuleAverage.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/ClassReport.js","srcPath":"@ponticus/escomplex-commons/src/module/report/ClassReport.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/HalsteadData.js","srcPath":"@ponticus/escomplex-commons/src/module/report/HalsteadData.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/MethodReport.js","srcPath":"@ponticus/escomplex-commons/src/module/report/MethodReport.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/report/ModuleReport.js","srcPath":"@ponticus/escomplex-commons/src/module/report/ModuleReport.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/traits/actualize.js","srcPath":"@ponticus/escomplex-commons/src/module/traits/actualize.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/traits/HalsteadArray.js","srcPath":"@ponticus/escomplex-commons/src/module/traits/HalsteadArray.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/traits/Trait.js","srcPath":"@ponticus/escomplex-commons/src/module/traits/Trait.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/traits/TraitHalstead.js","srcPath":"@ponticus/escomplex-commons/src/module/traits/TraitHalstead.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/module/traits/TraitUtil.js","srcPath":"@ponticus/escomplex-commons/src/module/traits/TraitUtil.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/project/report/ProjectReport.js","srcPath":"@ponticus/escomplex-commons/src/project/report/ProjectReport.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSON.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/json/FormatJSON.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONModules.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONModules.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/AbstractFormatText.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/AbstractFormatText.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatText.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/FormatText.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextMinimal.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/FormatTextMinimal.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextModules.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/FormatTextModules.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/formats/text/FormatTextVisibility.js","srcPath":"@ponticus/escomplex-commons/src/transform/formats/text/FormatTextVisibility.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/transform/TransformFormat.js","srcPath":"@ponticus/escomplex-commons/src/transform/TransformFormat.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/types/ReportType.js","srcPath":"@ponticus/escomplex-commons/src/types/ReportType.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/utils/Enum.js","srcPath":"@ponticus/escomplex-commons/src/utils/Enum.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/utils/MathUtil.js","srcPath":"@ponticus/escomplex-commons/src/utils/MathUtil.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/utils/ObjectUtil.js","srcPath":"@ponticus/escomplex-commons/src/utils/ObjectUtil.js"},{"filePath":"./node_modules/@ponticus/escomplex-commons/src/utils/StringUtil.js","srcPath":"@ponticus/escomplex-commons/src/utils/StringUtil.js"},{"filePath":"./node_modules/typhonjs-escomplex-module/src/ESComplexModule.js","srcPath":"typhonjs-escomplex-module/src/ESComplexModule.js"},{"filePath":"./node_modules/typhonjs-escomplex-module/src/index.js","srcPath":"typhonjs-escomplex-module/src/index.js","srcPathAlias":"typhonjs-escomplex-module"},{"filePath":"./node_modules/typhonjs-escomplex-module/src/Plugins.js","srcPath":"typhonjs-escomplex-module/src/Plugins.js"}]';

               assert.strictEqual(JSON.stringify(result.modules), testString);
            });
         });

         suite('local source + NPM module @ponticus/escomplex-commons and typhonjs-escomplex-module test w/ dependencies:', () =>
         {
            let result;

            setup(() =>
            {
               result = escomplexProject.analyze(s_LOCAL_TEST_DATA, { commonjs: true, serializeModules: false });
            });

            teardown(() =>
            {
               result = undefined;
            });

            test('modules are in correct order', () =>
            {
               assert.strictEqual(result.modules[0].srcPath, './src/ESComplexProject.js');
               assert.strictEqual(result.modules[1].srcPath, './src/index.js');
               assert.strictEqual(result.modules[2].srcPath, './src/Plugins.js');
               assert.strictEqual(result.modules[3].srcPath, './test/fixture/testImportNPMAlias.js');
               assert.strictEqual(result.modules[4].srcPath, './test/fixture/testRequireNPMAlias.js');
               assert.strictEqual(result.modules[5].srcPath, '@ponticus/escomplex-commons/src/analyze/AnalyzeError.js');
               assert.strictEqual(result.modules[6].srcPath, '@ponticus/escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js');
               assert.strictEqual(result.modules[7].srcPath, '@ponticus/escomplex-commons/src/module/report/AbstractReport.js');
               assert.strictEqual(result.modules[8].srcPath, '@ponticus/escomplex-commons/src/module/report/AggregateMethodReport.js');
               assert.strictEqual(result.modules[9].srcPath, '@ponticus/escomplex-commons/src/module/report/averages/HalsteadAverage.js');
               assert.strictEqual(result.modules[10].srcPath, '@ponticus/escomplex-commons/src/module/report/averages/MethodAverage.js');
               assert.strictEqual(result.modules[11].srcPath, '@ponticus/escomplex-commons/src/module/report/averages/ModuleAverage.js');
               assert.strictEqual(result.modules[12].srcPath, '@ponticus/escomplex-commons/src/module/report/ClassReport.js');
               assert.strictEqual(result.modules[13].srcPath, '@ponticus/escomplex-commons/src/module/report/HalsteadData.js');
               assert.strictEqual(result.modules[14].srcPath, '@ponticus/escomplex-commons/src/module/report/MethodReport.js');
               assert.strictEqual(result.modules[15].srcPath, '@ponticus/escomplex-commons/src/module/report/ModuleReport.js');
               assert.strictEqual(result.modules[16].srcPath, '@ponticus/escomplex-commons/src/module/traits/actualize.js');
               assert.strictEqual(result.modules[17].srcPath, '@ponticus/escomplex-commons/src/module/traits/HalsteadArray.js');
               assert.strictEqual(result.modules[18].srcPath, '@ponticus/escomplex-commons/src/module/traits/Trait.js');
               assert.strictEqual(result.modules[19].srcPath, '@ponticus/escomplex-commons/src/module/traits/TraitHalstead.js');
               assert.strictEqual(result.modules[20].srcPath, '@ponticus/escomplex-commons/src/module/traits/TraitUtil.js');
               assert.strictEqual(result.modules[21].srcPath, '@ponticus/escomplex-commons/src/project/report/ProjectReport.js');
               assert.strictEqual(result.modules[22].srcPath, '@ponticus/escomplex-commons/src/transform/formats/json/FormatJSON.js');
               assert.strictEqual(result.modules[23].srcPath, '@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js');
               assert.strictEqual(result.modules[24].srcPath, '@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js');
               assert.strictEqual(result.modules[25].srcPath, '@ponticus/escomplex-commons/src/transform/formats/json/FormatJSONModules.js');
               assert.strictEqual(result.modules[26].srcPath, '@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js');
               assert.strictEqual(result.modules[27].srcPath, '@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js');
               assert.strictEqual(result.modules[28].srcPath, '@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js');
               assert.strictEqual(result.modules[29].srcPath, '@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js');
               assert.strictEqual(result.modules[30].srcPath, '@ponticus/escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js');
               assert.strictEqual(result.modules[31].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/AbstractFormatText.js');
               assert.strictEqual(result.modules[32].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js');
               assert.strictEqual(result.modules[33].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/FormatText.js');
               assert.strictEqual(result.modules[34].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js');
               assert.strictEqual(result.modules[35].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/FormatTextMinimal.js');
               assert.strictEqual(result.modules[36].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/FormatTextModules.js');
               assert.strictEqual(result.modules[37].srcPath, '@ponticus/escomplex-commons/src/transform/formats/text/FormatTextVisibility.js');
               assert.strictEqual(result.modules[38].srcPath, '@ponticus/escomplex-commons/src/transform/TransformFormat.js');
               assert.strictEqual(result.modules[39].srcPath, '@ponticus/escomplex-commons/src/types/ReportType.js');
               assert.strictEqual(result.modules[40].srcPath, '@ponticus/escomplex-commons/src/utils/Enum.js');
               assert.strictEqual(result.modules[41].srcPath, '@ponticus/escomplex-commons/src/utils/MathUtil.js');
               assert.strictEqual(result.modules[42].srcPath, '@ponticus/escomplex-commons/src/utils/ObjectUtil.js');
               assert.strictEqual(result.modules[43].srcPath, '@ponticus/escomplex-commons/src/utils/StringUtil.js');
               assert.strictEqual(result.modules[44].srcPath, 'typhonjs-escomplex-module/src/ESComplexModule.js');
               assert.strictEqual(result.modules[45].srcPath, 'typhonjs-escomplex-module/src/index.js');
               assert.strictEqual(result.modules[46].srcPath, 'typhonjs-escomplex-module/src/Plugins.js');
            });

            test('adjacency list is correct', () =>
            {
               const testString = '[{"row":0,"cols":[2,15,21,44]},{"row":1,"cols":[0]},{"row":3,"cols":[45]},{"row":4,"cols":[45]},{"row":5,"cols":[39]},{"row":7,"cols":[38]},{"row":8,"cols":[7,13]},{"row":10,"cols":[9]},{"row":11,"cols":[10]},{"row":12,"cols":[5,7,8,10,38,39,42]},{"row":14,"cols":[5,8]},{"row":15,"cols":[5,7,8,10,12,38,39,41,42]},{"row":16,"cols":[17,18,20]},{"row":17,"cols":[19]},{"row":21,"cols":[11,15,38,39,41,42,43]},{"row":23,"cols":[39,42]},{"row":24,"cols":[39,42]},{"row":25,"cols":[39]},{"row":26,"cols":[33,43]},{"row":27,"cols":[34]},{"row":28,"cols":[35,43]},{"row":29,"cols":[36,43]},{"row":30,"cols":[37]},{"row":31,"cols":[39,42,43]},{"row":32,"cols":[39,42]},{"row":33,"cols":[31,38,39,43]},{"row":34,"cols":[32]},{"row":35,"cols":[31,39,43]},{"row":36,"cols":[31,39,43]},{"row":37,"cols":[32]},{"row":38,"cols":[22,23,24,25,26,27,28,29,30,33,34,35,36,37,39]},{"row":39,"cols":[40]},{"row":41,"cols":[42]},{"row":43,"cols":[42]},{"row":44,"cols":[46]},{"row":45,"cols":[44]},{"row":46,"cols":[15]}]';

               assert.strictEqual(JSON.stringify(result.adjacencyList), testString);
            });

            test('visibility list is correct', () =>
            {
               const testString = '[{"row":0,"cols":[0,2,5,7,8,9,10,11,12,13,15,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,46]},{"row":1,"cols":[0,1,2,5,7,8,9,10,11,12,13,15,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,46]},{"row":2,"cols":[2]},{"row":3,"cols":[3,5,7,8,9,10,12,13,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]},{"row":4,"cols":[4,5,7,8,9,10,12,13,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]},{"row":5,"cols":[5,39,40]},{"row":6,"cols":[6]},{"row":7,"cols":[7,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":8,"cols":[7,8,13,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":9,"cols":[9]},{"row":10,"cols":[9,10]},{"row":11,"cols":[9,10,11]},{"row":12,"cols":[5,7,8,9,10,12,13,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":13,"cols":[13]},{"row":14,"cols":[5,7,8,13,14,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":15,"cols":[5,7,8,9,10,12,13,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43]},{"row":16,"cols":[16,17,18,19,20]},{"row":17,"cols":[17,19]},{"row":18,"cols":[18]},{"row":19,"cols":[19]},{"row":20,"cols":[20]},{"row":21,"cols":[5,7,8,9,10,11,12,13,15,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43]},{"row":22,"cols":[22]},{"row":23,"cols":[23,39,40,42]},{"row":24,"cols":[24,39,40,42]},{"row":25,"cols":[25,39,40]},{"row":26,"cols":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":27,"cols":[27,32,34,39,40,42]},{"row":28,"cols":[28,31,35,39,40,42,43]},{"row":29,"cols":[29,31,36,39,40,42,43]},{"row":30,"cols":[30,32,37,39,40,42]},{"row":31,"cols":[31,39,40,42,43]},{"row":32,"cols":[32,39,40,42]},{"row":33,"cols":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":34,"cols":[32,34,39,40,42]},{"row":35,"cols":[31,35,39,40,42,43]},{"row":36,"cols":[31,36,39,40,42,43]},{"row":37,"cols":[32,37,39,40,42]},{"row":38,"cols":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43]},{"row":39,"cols":[39,40]},{"row":40,"cols":[40]},{"row":41,"cols":[41,42]},{"row":42,"cols":[42]},{"row":43,"cols":[42,43]},{"row":44,"cols":[5,7,8,9,10,12,13,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,46]},{"row":45,"cols":[5,7,8,9,10,12,13,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]},{"row":46,"cols":[5,7,8,9,10,12,13,15,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,46]}]';

               assert.strictEqual(JSON.stringify(result.visibilityList), testString);
            });
         });

         suite('cjs modules with dependencies:', () =>
         {
            let result;

            setup(() =>
            {
               result = escomplexProject.analyze([
                  { ast: Parser.parse('require("./a");'), srcPath: '/d.js' },
                  { ast: Parser.parse('require("./b");'), srcPath: '/a/c.js' },
                  { ast: Parser.parse('require("./c");'), srcPath: '/a/b.js' },
                  { ast: Parser.parse('require("./a/b");require("./a/c");'), srcPath: '/a.js' }
               ], { commonjs: true });
            });

            teardown(() =>
            {
               result = undefined;
            });

            test('modules are in correct order', () =>
            {
               assert.strictEqual(result.modules[0].srcPath, '/a.js');
               assert.strictEqual(result.modules[1].srcPath, '/a/b.js');
               assert.strictEqual(result.modules[2].srcPath, '/a/c.js');
               assert.strictEqual(result.modules[3].srcPath, '/d.js');
            });

            test('adjacency list is correct', () =>
            {
               const testString = '[{"row":0,"cols":[1,2]},{"row":1,"cols":[2]},{"row":2,"cols":[1]},{"row":3,"cols":[0]}]';

               assert.strictEqual(JSON.stringify(result.adjacencyList), testString);
            });

            test('visibility list is correct', () =>
            {
               const testString = '[{"row":0,"cols":[0,1,2]},{"row":1,"cols":[1,2]},{"row":2,"cols":[1,2]},{"row":3,"cols":[0,1,2,3]}]';

               assert.strictEqual(JSON.stringify(result.visibilityList), testString);
            });

            test('first order density is correct', () =>
            {
               assert.strictEqual(result.firstOrderDensity, 31.25);
            });

            test('change cost is correct', () =>
            {
               assert.strictEqual(result.changeCost, 68.75);
            });

            test('core size is correct', () =>
            {
               assert.strictEqual(result.coreSize, 0);
            });
         });

         suite('cjs modules with dynamic dependencies:', () =>
         {
            let result;

            setup(() =>
            {
               result = escomplexProject.analyze([
                  { ast: Parser.parse('require("dynamic_a");'), srcPath: '/d.js' },
                  { ast: Parser.parse('require("dynamic_b");'), srcPath: '/a/c.js' },
                  { ast: Parser.parse('require("dynamic_c");'), srcPath: '/a/b.js' },
                  { ast: Parser.parse('require("./a/b");require("./a/c");'), srcPath: '/a.js' }
               ],
               { commonjs: true, dependencyResolver: (dependency) =>
                  {
                     switch (dependency)
                     {
                        case 'dynamic_a': return './a';
                        case 'dynamic_b': return './b';
                        case 'dynamic_c': return './c';
                        default: return dependency;
                     }
                  }
               });
            });

            teardown(() =>
            {
               result = undefined;
            });

            test('modules are in correct order', () =>
            {
               assert.strictEqual(result.modules[0].srcPath, '/a.js');
               assert.strictEqual(result.modules[1].srcPath, '/a/b.js');
               assert.strictEqual(result.modules[2].srcPath, '/a/c.js');
               assert.strictEqual(result.modules[3].srcPath, '/d.js');
            });

            test('adjacency list is correct', () =>
            {
               const testString = '[{"row":0,"cols":[1,2]},{"row":1,"cols":[2]},{"row":2,"cols":[1]},{"row":3,"cols":[0]}]';

               assert.strictEqual(JSON.stringify(result.adjacencyList), testString);
            });

            test('visibility list is correct', () =>
            {
               const testString = '[{"row":0,"cols":[0,1,2]},{"row":1,"cols":[1,2]},{"row":2,"cols":[1,2]},{"row":3,"cols":[0,1,2,3]}]';

               assert.strictEqual(JSON.stringify(result.visibilityList), testString);
            });

            test('first order density is correct', () =>
            {
               assert.strictEqual(result.firstOrderDensity, 31.25);
            });

            test('change cost is correct', () =>
            {
               assert.strictEqual(result.changeCost, 68.75);
            });

            test('core size is correct', () =>
            {
               assert.strictEqual(result.coreSize, 0);
            });
         });

         suite('esm modules with dependencies:', () =>
         {
            let result;

            setup(() =>
            {
               result = escomplexProject.analyze([
                  { ast: Parser.parse('import d from "./a";'), srcPath: '/d.js' },
                  { ast: Parser.parse('import c from "./b";'), srcPath: '/a/c.js' },
                  { ast: Parser.parse('import b from "./c";'), srcPath: '/a/b.js' },
                  { ast: Parser.parse('import a from "./a/b"; import aa from "./a/c";'), srcPath: '/a.js' }
               ]);
            });

            teardown(() =>
            {
               result = undefined;
            });

            test('modules are in correct order', () =>
            {
               assert.strictEqual(result.modules[0].srcPath, '/a.js');
               assert.strictEqual(result.modules[1].srcPath, '/a/b.js');
               assert.strictEqual(result.modules[2].srcPath, '/a/c.js');
               assert.strictEqual(result.modules[3].srcPath, '/d.js');
            });

            test('adjacency list is correct', () =>
            {
               const testString = '[{"row":0,"cols":[1,2]},{"row":1,"cols":[2]},{"row":2,"cols":[1]},{"row":3,"cols":[0]}]';

               assert.strictEqual(JSON.stringify(result.adjacencyList), testString);
            });

            test('visibility list is correct', () =>
            {
               const testString = '[{"row":0,"cols":[0,1,2]},{"row":1,"cols":[1,2]},{"row":2,"cols":[1,2]},{"row":3,"cols":[0,1,2,3]}]';

               assert.strictEqual(JSON.stringify(result.visibilityList), testString);
            });

            test('first order density is correct', () =>
            {
               assert.strictEqual(result.firstOrderDensity, 31.25);
            });

            test('change cost is correct', () =>
            {
               assert.strictEqual(result.changeCost, 68.75);
            });

            test('core size is correct', () =>
            {
               assert.strictEqual(result.coreSize, 0);
            });
         });

         suite('esm modules with dynamic dependencies:', () =>
         {
            let result;

            setup(() =>
            {
               result = escomplexProject.analyze([
                  { ast: Parser.parse('import d from "dynamic_a";'), srcPath: '/d.js' },
                  { ast: Parser.parse('import c from "dynamic_b";'), srcPath: '/a/c.js' },
                  { ast: Parser.parse('import b from "dynamic_c";'), srcPath: '/a/b.js' },
                  { ast: Parser.parse('import a from "./a/b"; import aa from "./a/c";'), srcPath: '/a.js' }
               ],
               {
                  dependencyResolver: (dependency) =>
                  {
                     switch (dependency)
                     {
                        case 'dynamic_a': return './a';
                        case 'dynamic_b': return './b';
                        case 'dynamic_c': return './c';
                        default: return dependency;
                     }
                  }
               });
            });

            teardown(() =>
            {
               result = undefined;
            });

            test('modules are in correct order', () =>
            {
               assert.strictEqual(result.modules[0].srcPath, '/a.js');
               assert.strictEqual(result.modules[1].srcPath, '/a/b.js');
               assert.strictEqual(result.modules[2].srcPath, '/a/c.js');
               assert.strictEqual(result.modules[3].srcPath, '/d.js');
            });

            test('adjacency list is correct', () =>
            {
               const testString = '[{"row":0,"cols":[1,2]},{"row":1,"cols":[2]},{"row":2,"cols":[1]},{"row":3,"cols":[0]}]';

               assert.strictEqual(JSON.stringify(result.adjacencyList), testString);
            });

            test('visibility list is correct', () =>
            {
               const testString = '[{"row":0,"cols":[0,1,2]},{"row":1,"cols":[1,2]},{"row":2,"cols":[1,2]},{"row":3,"cols":[0,1,2,3]}]';

               assert.strictEqual(JSON.stringify(result.visibilityList), testString);
            });

            test('first order density is correct', () =>
            {
               assert.strictEqual(result.firstOrderDensity, 31.25);
            });

            test('change cost is correct', () =>
            {
               assert.strictEqual(result.changeCost, 68.75);
            });

            test('core size is correct', () =>
            {
               assert.strictEqual(result.coreSize, 0);
            });
         });

         suite('MacCormack, Rusnak & Baldwin example:', () =>
         {
            let result;

            setup(() =>
            {
               result = escomplexProject.analyze([
                  { ast: Parser.parse('"f";'), srcPath: '/a/c/f.js' },
                  { ast: Parser.parse('require("./f");"e";'), srcPath: '/a/c/e.js' },
                  { ast: Parser.parse('"d";'), srcPath: '/a/b/d.js' },
                  { ast: Parser.parse('require("./c/e");"c";'), srcPath: '/a/c.js' },
                  { ast: Parser.parse('require("./b/d");"b";'), srcPath: '/a/b.js' },
                  { ast: Parser.parse('require("./a/b");require("./a/c");"a";'), srcPath: '/a.js' }
               ], { commonjs: true });
            });

            teardown(() =>
            {
               result = undefined;
            });

            test('modules are in correct order', () =>
            {
               assert.strictEqual(result.modules[0].srcPath, '/a.js');
               assert.strictEqual(result.modules[1].srcPath, '/a/b.js');
               assert.strictEqual(result.modules[2].srcPath, '/a/b/d.js');
               assert.strictEqual(result.modules[3].srcPath, '/a/c.js');
               assert.strictEqual(result.modules[4].srcPath, '/a/c/e.js');
               assert.strictEqual(result.modules[5].srcPath, '/a/c/f.js');
            });

            test('adjacency list is correct', () =>
            {
               const testString = '[{"row":0,"cols":[1,3]},{"row":1,"cols":[2]},{"row":3,"cols":[4]},{"row":4,"cols":[5]}]';

               assert.strictEqual(JSON.stringify(result.adjacencyList), testString);
            });

            test('visibility list is correct', () =>
            {
               const testString = '[{"row":0,"cols":[0,1,2,3,4,5]},{"row":1,"cols":[1,2]},{"row":2,"cols":[2]},{"row":3,"cols":[3,4,5]},{"row":4,"cols":[4,5]},{"row":5,"cols":[5]}]';

               assert.strictEqual(JSON.stringify(result.visibilityList), testString);
            });

            test('first order density is correct', () =>
            {
               assert.isTrue(result.firstOrderDensity > 13.88);
               assert.isTrue(result.firstOrderDensity < 13.89);
            });

            test('change cost is correct', () =>
            {
               assert.isTrue(result.changeCost > 41.66);
               assert.isTrue(result.changeCost < 41.67);
            });

            test('core size is correct', () =>
            {
               assert.isTrue(result.coreSize > 16.66);
               assert.isTrue(result.coreSize < 16.67);
            });
         });

         suite('large project calculation performance', () =>
         {
            const resultFixture = require('@ponticus/escomplex-test-data/files/large-project/json/project-with-errors');
            const resultSkipCalc = escomplexProject.analyze(s_LOCAL_TEST_DATA, { skipCalculation: true });

            test('deserialize JSON object should be sufficiently fast', function()
            {
               this.timeout(200);
               ProjectReport.parse(resultFixture);
            });

            test('running calculations should be sufficiently fast', function()
            {
               this.timeout(300);
               escomplexProject.process(resultSkipCalc);
            });

            test('running analyze should be sufficiently fast', function()
            {
               this.timeout(1400);  // Relatively high for slower CI configurations.
               escomplexProject.analyze(s_LOCAL_TEST_DATA);
            });
         });
      });
   });
}

