import { test, describe, expect, beforeEach, afterEach } from "vitest";

import ModuleReport from "../../../src/module/report/ModuleReport";
import ProjectReport from "../../../src/project/report/ProjectReport";

import ModuleScopeControl from "../../../src/module/report/control/ModuleScopeControl";

import * as testconfig from "../testconfig";

if (testconfig.modules["projectReport"]) {
  describe("result:", () => {
    describe("ProjectReport:", () => {
      describe("instantiation:", () => {
        let result;

        beforeEach(() => {
          const report = new ModuleReport(10, 100);
          const report2 = new ModuleReport(10, 100);
          const report3 = new ModuleReport(10, 100);
          const scopeControl = new ModuleScopeControl(report);

          report.srcPath = "./c.js";
          report2.srcPath = "./a.js";
          report3.srcPath = "./b.js";

          scopeControl.createScope({
            type: "method",
            name: "amethod",
            lineStart: 100,
            lineEnd: 200,
            paramCount: 0,
            paramNames: [],
          });
          scopeControl.popScope({ type: "method" });
          scopeControl.createScope({
            type: "class",
            name: "aclass",
            lineStart: 100,
            lineEnd: 200,
          });
          scopeControl.createScope({
            type: "method",
            name: "amethod",
            lineStart: 100,
            lineEnd: 200,
            paramCount: 0,
            paramNames: [],
          });
          scopeControl.popScope({ type: "method" });
          scopeControl.popScope({ type: "class" });

          result = new ProjectReport([report, report2, report3]);

          // Fake the adjacency / visibility lists; a depends on b / b depends on a / c depends on a & b
          result.adjacencyList = [
            { row: 0, cols: [1] },
            { row: 1, cols: [0] },
            { row: 2, cols: [0, 1] },
          ];
          result.visibilityList = [
            { row: 0, cols: [2] },
            { row: 1, cols: [0] },
            { row: 2, cols: [0, 1, 2] },
          ];
        });

        afterEach(() => {
          result = undefined;
        });

        test("result has correct number of reports", () => {
          expect(result.modules.length).toBe(3);
        });

        test("result has correct report `srcPath` order", () => {
          expect(result.modules[0].srcPath).toBe("./a.js");
          expect(result.modules[1].srcPath).toBe("./b.js");
          expect(result.modules[2].srcPath).toBe("./c.js");
        });

        test("finalize w/ serializeModules === false is correct", () => {
          const report = new ModuleReport(10, 100);
          report.srcPath = "./a.js";
          result = new ProjectReport([report], { serializeModules: false });

          expect(Array.isArray(result.modules[0]._scopeStackClass)).not.toBe(true);
          expect(Array.isArray(result.modules[0]._scopeStackMethod)).not.toBe(true);

          result.finalize();

          expect(typeof result.modules[0]).toBe("object");

          const reportKeys = Object.keys(result.modules[0]);

          expect(reportKeys.length).toBe(3);
          expect(reportKeys[0]).toBe("filePath");
          expect(reportKeys[1]).toBe("srcPath");
          expect(reportKeys[2]).toBe("srcPathAlias");

          expect(result.modules[0].filePath).not.toBeDefined();
          expect(result.modules[0].srcPath).toBe("./a.js");
          expect(result.modules[0].srcPathAlias).not.toBeDefined();
        });
      });

      describe("project with errors", () => {
        const largeProjectJSON = require("@ponticus/escomplex-test-data/files/large-project/json/project-with-errors");

        let projectReport;

        beforeEach(() => {
          projectReport = ProjectReport.parse(largeProjectJSON);
        });

        afterEach(() => {
          projectReport = void 0;
        });

        test("getErrors count is correct", () => {
          const errors = projectReport.getErrors();

          expect(errors.length).toBe(154);

          /*
               console.log('!!!! getErrors - errors: ' + JSON.stringify(errors));

               errors.forEach((error) =>
               {
                  // console.log('!!! - result error: ' + JSON.stringify(error));
                  console.log('\n!!! - result error: ' + error.error);
                  console.log('!!! - result source: ' + (typeof error.source !== 'undefined' ? error.source.getName() : 'undefined'));
                  console.log('!!! - result class: ' + (typeof error.class !== 'undefined' ? error.class.getName() : 'undefined'));
                  console.log('!!! - result module: ' + (typeof error.module !== 'undefined' ? error.module.getName() : 'undefined'));
               });
*/
        });

        test("getErrors (only warnings) count is correct", () => {
          const errors = projectReport.getErrors({
            query: { severity: "warning" },
          });

          expect(errors.length).toBe(38);

          /*
               console.log('!!!! getErrors - errors: ' + JSON.stringify(errors));

               errors.forEach((error) =>
               {
                  // console.log('!!! - result error: ' + JSON.stringify(error));
                  console.log('\n!!! - result error: ' + error.error);
                  console.log('!!! - result source: ' + (typeof error.source !== 'undefined' ? error.source.getName() : 'undefined'));
                  console.log('!!! - result class: ' + (typeof error.class !== 'undefined' ? error.class.getName() : 'undefined'));
                  console.log('!!! - result module: ' + (typeof error.module !== 'undefined' ? error.module.getName() : 'undefined'));
               });
*/
        });
      });

      describe("large project parsing performance", () => {
        const largeProjectJSON = require("@ponticus/escomplex-test-data/files/large-project/json/project");

        test("deserialize JSON object should be sufficiently fast", () => {
          ProjectReport.parse(largeProjectJSON);
        });
      });
    });
  });
}
