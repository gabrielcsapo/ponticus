import { test, describe, expect, beforeEach, afterEach } from "vitest";

import ClassReport from "../../../src/module/report/ClassReport";
import MethodReport from "../../../src/module/report/MethodReport";
import ModuleReport from "../../../src/module/report/ModuleReport";
import ModuleScopeControl from "../../../src/module/report/control/ModuleScopeControl";

import * as testconfig from "../testconfig";

if (testconfig.modules["moduleReport"]) {
  describe("report:", () => {
    describe("ModuleReport:", () => {
      describe("instantiation:", () => {
        let report;

        beforeEach(() => {
          report = new ModuleReport(10, 100);
        });
        afterEach(() => {
          report = undefined;
        });

        test("report has correct line start / end", () => {
          expect(report.lineStart).toBe(10);
          expect(report.lineEnd).toBe(100);
        });
      });

      describe("createScope / popScope:", () => {
        let report, scopeControl;

        beforeEach(() => {
          report = new ModuleReport(10, 100);
          scopeControl = new ModuleScopeControl(report);
        });

        afterEach(() => {
          report = void 0;
        });

        test("report has correct class scope", () => {
          expect(scopeControl.getCurrentClassReport()).not.toBeDefined();

          let classReport = scopeControl.createScope({
            type: "class",
            name: "aclass",
            lineStart: 100,
            lineEnd: 200,
          });
          let classReport2 = scopeControl.getCurrentClassReport();

          expect(classReport).toBeInstanceOf(ClassReport);
          expect(classReport2).toBeInstanceOf(ClassReport);

          expect(report.classes.length).toBe(1);

          expect(classReport).toBe(classReport2);

          classReport = scopeControl.popScope({ type: "class" });
          classReport2 = scopeControl.getCurrentClassReport();

          expect(classReport).not.toBeDefined();
          expect(classReport2).not.toBeDefined();
        });

        test("report has correct method scope", () => {
          expect(scopeControl.getCurrentMethodReport()).not.toBeDefined();

          let methodReport = scopeControl.createScope({
            type: "method",
            name: "amethod",
            lineStart: 100,
            lineEnd: 200,
            paramCount: 1,
            paramNames: ["aParam"],
          });

          let methodReport2 = scopeControl.getCurrentMethodReport();

          expect(methodReport).toBeInstanceOf(MethodReport);
          expect(methodReport2).toBeInstanceOf(MethodReport);

          expect(report.methods.length).toBe(1);

          expect(methodReport).toBe(methodReport2);

          methodReport = scopeControl.popScope({ type: "method" });
          methodReport2 = scopeControl.getCurrentMethodReport();

          expect(methodReport).not.toBeDefined();
          expect(methodReport2).not.toBeDefined();
        });

        test("report has correct class w/ method scope", () => {
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

          expect(report.classes.length).toBe(1);
          expect(report.classes[0].methods.length).toBe(1);

          expect(report.methods.length).toBe(0);
        });

        test("error thrown for unknown scope type", () => {
          expect(() => {
            report.createScope({
              type: "unknown",
              name: "?",
              lineStart: 100,
              lineEnd: 200,
            });
          }).toThrow();

          expect(() => {
            scopeControl.createScope();
          }).toThrow();

          expect(() => {
            scopeControl.createScope("unknown");
          }).toThrow();

          expect(() => {
            scopeControl.popScope();
          }).toThrow();

          expect(() => {
            scopeControl.popScope("unknown");
          }).toThrow();
        });
      });
    });

    describe("HalsteadData:", () => {
      let report;

      beforeEach(() => {
        report = new ModuleReport(10, 100);
      });
      afterEach(() => {
        report = undefined;
      });

      test("report aggregate halstead data is reset", () => {
        report.aggregate.halstead.bugs = 1000;
        report.aggregate.halstead.operands.distinct = 1000;
        report.aggregate.halstead.operands.identifiers.push("test");
        report.aggregate.halstead.reset(true);
        expect(report.aggregate.halstead.bugs).toBe(0);
        expect(report.aggregate.halstead.operands.distinct).toBe(0);
        expect(report.aggregate.halstead.operands.identifiers.length).toBe(0);
      });
    });
  });
}
