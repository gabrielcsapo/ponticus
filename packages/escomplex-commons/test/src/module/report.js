import { suite, test, setup, teardown } from "mocha";
import { assert } from "chai";

import ClassReport from "../../../src/module/report/ClassReport";
import MethodReport from "../../../src/module/report/MethodReport";
import ModuleReport from "../../../src/module/report/ModuleReport";
import ModuleScopeControl from "../../../src/module/report/control/ModuleScopeControl";

import * as testconfig from "../testconfig";

if (testconfig.modules["moduleReport"]) {
  suite("report:", () => {
    suite("ModuleReport:", () => {
      suite("instantiation:", () => {
        let report;

        setup(() => {
          report = new ModuleReport(10, 100);
        });
        teardown(() => {
          report = undefined;
        });

        test("report has correct line start / end", () => {
          assert.strictEqual(report.lineStart, 10);
          assert.strictEqual(report.lineEnd, 100);
        });
      });

      suite("createScope / popScope:", () => {
        let report, scopeControl;

        setup(() => {
          report = new ModuleReport(10, 100);
          scopeControl = new ModuleScopeControl(report);
        });

        teardown(() => {
          report = void 0;
        });

        test("report has correct class scope", () => {
          assert.isUndefined(scopeControl.getCurrentClassReport());

          let classReport = scopeControl.createScope({
            type: "class",
            name: "aclass",
            lineStart: 100,
            lineEnd: 200,
          });
          let classReport2 = scopeControl.getCurrentClassReport();

          assert.instanceOf(classReport, ClassReport);
          assert.instanceOf(classReport2, ClassReport);

          assert.lengthOf(report.classes, 1);

          assert.strictEqual(classReport, classReport2);

          classReport = scopeControl.popScope({ type: "class" });
          classReport2 = scopeControl.getCurrentClassReport();

          assert.isUndefined(classReport);
          assert.isUndefined(classReport2);
        });

        test("report has correct method scope", () => {
          assert.isUndefined(scopeControl.getCurrentMethodReport());

          let methodReport = scopeControl.createScope({
            type: "method",
            name: "amethod",
            lineStart: 100,
            lineEnd: 200,
            paramCount: 1,
            paramNames: ["aParam"],
          });

          let methodReport2 = scopeControl.getCurrentMethodReport();

          assert.instanceOf(methodReport, MethodReport);
          assert.instanceOf(methodReport2, MethodReport);

          assert.lengthOf(report.methods, 1);

          assert.strictEqual(methodReport, methodReport2);

          methodReport = scopeControl.popScope({ type: "method" });
          methodReport2 = scopeControl.getCurrentMethodReport();

          assert.isUndefined(methodReport);
          assert.isUndefined(methodReport2);
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

          assert.lengthOf(report.classes, 1);
          assert.lengthOf(report.classes[0].methods, 1);

          assert.lengthOf(report.methods, 0);
        });

        test("error thrown for unknown scope type", () => {
          assert.throws(() => {
            report.createScope({
              type: "unknown",
              name: "?",
              lineStart: 100,
              lineEnd: 200,
            });
          });

          assert.throws(() => {
            scopeControl.createScope();
          });

          assert.throws(() => {
            scopeControl.createScope("unknown");
          });

          assert.throws(() => {
            scopeControl.popScope();
          });

          assert.throws(() => {
            scopeControl.popScope("unknown");
          });
        });
      });
    });

    suite("HalsteadData:", () => {
      let report;

      setup(() => {
        report = new ModuleReport(10, 100);
      });
      teardown(() => {
        report = undefined;
      });

      test("report aggregate halstead data is reset", () => {
        report.aggregate.halstead.bugs = 1000;
        report.aggregate.halstead.operands.distinct = 1000;
        report.aggregate.halstead.operands.identifiers.push("test");
        report.aggregate.halstead.reset(true);
        assert.strictEqual(report.aggregate.halstead.bugs, 0);
        assert.strictEqual(report.aggregate.halstead.operands.distinct, 0);
        assert.lengthOf(report.aggregate.halstead.operands.identifiers, 0);
      });
    });
  });
}
