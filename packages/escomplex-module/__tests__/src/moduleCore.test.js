import { test, describe, expect, afterEach, beforeEach } from "vitest";

import parsers from "./parsers";
import * as testconfig from "./testconfig";

if (testconfig.modules["moduleCore"]) {
  parsers.forEach((parser) => {
    describe(`(${parser.name}): module (Core):`, () => {
      describe("function call:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('parseInt("10", 10);');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct physical lines of code", () => {
          expect(report.aggregate.sloc.physical).toBe(1);
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(1);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(1);
        });

        test("aggregate has correct cyclomatic complexity density", () => {
          expect(report.aggregate.cyclomaticDensity).toBe(100);
        });

        test("methods is empty", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(1);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(1);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(3);
        });

        test("aggregate has correct Halstead operator identifier length", () => {
          expect(report.aggregate.halstead.operators.identifiers.length).toBe(report.aggregate.halstead.operators.distinct);
        });

        test("aggregate has correct Halstead operand identifier length", () => {
          expect(report.aggregate.halstead.operands.identifiers.length).toBe(report.aggregate.halstead.operands.distinct);
        });

        test("aggregate has correct Halstead length", () => {
          expect(report.aggregate.halstead.length).toBe(4);
        });

        test("aggregate has correct Halstead vocabulary", () => {
          expect(report.aggregate.halstead.vocabulary).toBe(4);
        });

        test("aggregate has correct Halstead difficulty", () => {
          expect(report.aggregate.halstead.difficulty).toBe(0.5);
        });

        test("aggregate has correct Halstead volume", () => {
          expect(report.aggregate.halstead.volume).toBe(8);
        });

        test("aggregate has correct Halstead effort", () => {
          expect(report.aggregate.halstead.effort).toBe(4);
        });

        test("aggregate has correct Halstead bugs", () => {
          expect(report.aggregate.halstead.bugs).toBe(0.003);
        });

        test("aggregate has correct Halstead time", () => {
          expect(report.aggregate.halstead.time).toBe(0.222);
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(166.259);
        });

        test("aggregate has correct parameter count", () => {
          expect(report.aggregate.paramCount).toBe(0);
        });

        test("mean logical LOC is correct", () => {
          expect(report.aggregateAverage.sloc.logical).toBe(1);
          expect(report.methodAverage.sloc.logical).toBe(0);
        });

        test("mean cyclomatic complexity is correct", () => {
          expect(report.aggregateAverage.cyclomatic).toBe(1);
          expect(report.methodAverage.cyclomatic).toBe(0);
        });

        test("mean Halstead effort is correct", () => {
          expect(report.aggregateAverage.halstead.effort).toBe(4);
          expect(report.methodAverage.halstead.effort).toBe(0);
        });

        test("mean parameter count is correct", () => {
          expect(report.aggregateAverage.paramCount).toBe(0);
          expect(report.methodAverage.paramCount).toBe(0);
        });

        test("dependencies is correct", () => {
          expect(report.dependencies.length).toBe(0);
        });
      });

      describe("condition:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('if (true) { "foo"; }');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct physical lines of code", () => {
          expect(report.aggregate.sloc.physical).toBe(1);
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(2);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("aggregate has correct cyclomatic complexity density", () => {
          expect(report.aggregate.cyclomaticDensity).toBe(100);
        });

        test("methods is empty", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(1);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(1);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });

        test("aggregate has correct Halstead operator identifier length", () => {
          expect(report.aggregate.halstead.operators.identifiers.length).toBe(report.aggregate.halstead.operators.distinct);
        });

        test("aggregate has correct Halstead operand identifier length", () => {
          expect(report.aggregate.halstead.operands.identifiers.length).toBe(report.aggregate.halstead.operands.distinct);
        });

        test("aggregate has correct Halstead length", () => {
          expect(report.aggregate.halstead.length).toBe(3);
        });

        test("aggregate has correct Halstead vocabulary", () => {
          expect(report.aggregate.halstead.vocabulary).toBe(3);
        });

        test("aggregate has correct Halstead difficulty", () => {
          expect(report.aggregate.halstead.difficulty).toBe(0.5);
        });

        test("aggregate has correct Halstead volume", () => {
          expect(report.aggregate.halstead.volume).toBe(4.755);
        });

        test("aggregate has correct Halstead effort", () => {
          expect(report.aggregate.halstead.effort).toBe(2.377);
        });

        test("aggregate has correct Halstead bugs", () => {
          expect(report.aggregate.halstead.bugs).toBe(0.002);
        });

        test("aggregate has correct Halstead time", () => {
          expect(report.aggregate.halstead.time).toBe(0.132);
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(156.116);
        });

        test("mean logical LOC is correct", () => {
          expect(report.aggregateAverage.sloc.logical).toBe(2);
          expect(report.methodAverage.sloc.logical).toBe(0);
        });

        test("mean cyclomatic complexity is correct", () => {
          expect(report.aggregateAverage.cyclomatic).toBe(2);
          expect(report.methodAverage.cyclomatic).toBe(0);
        });

        test("mean Halstead effort is correct", () => {
          expect(report.aggregateAverage.halstead.effort).toBe(2.377);
          expect(report.methodAverage.halstead.effort).toBe(0);
        });

        test("mean parameter count is correct", () => {
          expect(report.aggregateAverage.paramCount).toBe(0);
          expect(report.methodAverage.paramCount).toBe(0);
        });

        test("dependencies is correct", () => {
          expect(report.dependencies.length).toBe(0);
        });
      });

      describe("condition with alternate:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('if (true) { "foo"; } else { "bar"; }');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct physical lines of code", () => {
          expect(report.aggregate.sloc.physical).toBe(1);
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(4);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("methods is empty", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(3);
        });

        test("aggregate has correct Halstead operator identifier length", () => {
          expect(report.aggregate.halstead.operators.identifiers.length).toBe(report.aggregate.halstead.operators.distinct);
        });

        test("aggregate has correct Halstead operand identifier length", () => {
          expect(report.aggregate.halstead.operands.identifiers.length).toBe(report.aggregate.halstead.operands.distinct);
        });

        test("aggregate has correct Halstead length", () => {
          expect(report.aggregate.halstead.length).toBe(5);
        });

        test("aggregate has correct Halstead vocabulary", () => {
          expect(report.aggregate.halstead.vocabulary).toBe(5);
        });

        test("aggregate has correct Halstead difficulty", () => {
          expect(report.aggregate.halstead.difficulty).toBe(1);
        });

        test("aggregate has correct Halstead volume", () => {
          expect(report.aggregate.halstead.volume).toBe(11.61);
        });

        test("aggregate has correct Halstead effort", () => {
          expect(report.aggregate.halstead.effort).toBe(11.61);
        });

        test("aggregate has correct Halstead bugs", () => {
          expect(report.aggregate.halstead.bugs).toBe(0.004);
        });

        test("aggregate has correct Halstead time", () => {
          expect(report.aggregate.halstead.time).toBe(0.645);
        });
      });

      describe("dual condition:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('if (true) { "foo"; } if (false) { "bar"; }');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(4);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(1);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(4);
        });

        test("aggregate has correct Halstead operator identifier length", () => {
          expect(report.aggregate.halstead.operators.identifiers.length).toBe(report.aggregate.halstead.operators.distinct);
        });

        test("aggregate has correct Halstead operand identifier length", () => {
          expect(report.aggregate.halstead.operands.identifiers.length).toBe(report.aggregate.halstead.operands.distinct);
        });

        test("aggregate has correct Halstead length", () => {
          expect(report.aggregate.halstead.length).toBe(6);
        });

        test("aggregate has correct Halstead vocabulary", () => {
          expect(report.aggregate.halstead.vocabulary).toBe(5);
        });

        test("aggregate has correct Halstead difficulty", () => {
          expect(report.aggregate.halstead.difficulty).toBe(0.5);
        });
      });

      describe("alternate dual condition:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'if (true) { "foo"; } else if (false) { "bar"; }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(5);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(4);
        });

        test("aggregate has correct Halstead operator identifier length", () => {
          expect(report.aggregate.halstead.operators.identifiers.length).toBe(report.aggregate.halstead.operators.distinct);
        });

        test("aggregate has correct Halstead operand identifier length", () => {
          expect(report.aggregate.halstead.operands.identifiers.length).toBe(report.aggregate.halstead.operands.distinct);
        });
      });

      describe("nested condition:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('if (true) { "foo"; if (false) { "bar"; } }');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(4);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });
      });

      describe("switch statement:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'switch (Date.now()) { case 1: "foo"; break; case 2: "bar"; break; default: "baz"; }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(10);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });

        test("aggregate has correct cyclomatic complexity density", () => {
          expect(report.aggregate.cyclomaticDensity).toBe(30);
        });

        test("methods is empty", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(8);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(6);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(7);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(7);
        });
      });

      describe("switch statement with fall-through case:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'switch (Date.now()) { case 1: case 2: "foo"; break; default: "bar"; }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(8);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });

        test("methods is empty", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(7);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(6);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(6);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(6);
        });
      });

      describe("switch statement containing condition:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            "switch (Date.now()) { " +
              '    case 1: "foo"; break; ' +
              '    case 2: "bar"; break; ' +
              '    default: if (true) { "baz"; } ' +
              "}"
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(11);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(4);
        });

        test("methods is empty", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(9);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(7);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(8);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(8);
        });
      });

      describe("for loop:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'var i; for (i = 0; i < 10; i += 1) { "foo"; }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct Halstead operand identifiers", () => {
          expect(JSON.stringify(report.aggregate.halstead.operands.identifiers)).toBe('["i","0","10","1","\\"foo\\""]');
        });

        test("aggregate has correct Halstead operator identifiers", () => {
          expect(JSON.stringify(report.aggregate.halstead.operators.identifiers)).toBe('["var","for","=","<","+="]');
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(3);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("methods is empty", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(5);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(5);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(8);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(5);
        });

        test("aggregate has correct Halstead length", () => {
          expect(report.aggregate.halstead.length).toBe(13);
        });

        test("aggregate has correct Halstead vocabulary", () => {
          expect(report.aggregate.halstead.vocabulary).toBe(10);
        });

        test("aggregate has correct Halstead difficulty", () => {
          expect(report.aggregate.halstead.difficulty).toBe(4);
        });
      });

      describe("for loop containing condition:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'var i; for (i = 0; i < 10; i += 1) { if (true) { "foo"; } }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(6);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(6);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(9);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(6);
        });
      });

      describe("for...in loop:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'var property; for (property in { foo: "bar", baz: "qux" }) { "wibble"; }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(3);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(1);
        });

        test("methods is empty", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(5);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(4);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(7);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(6);
        });

        test("aggregate has correct Halstead length", () => {
          expect(report.aggregate.halstead.length).toBe(12);
        });

        test("aggregate has correct Halstead vocabulary", () => {
          expect(report.aggregate.halstead.vocabulary).toBe(10);
        });

        test("aggregate has correct Halstead difficulty", () => {
          expect(report.aggregate.halstead.difficulty).toBe(2.333);
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(137.7);
        });
      });

      describe("for...in loop containing condition:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'var property, object = { foo: "bar", baz: "qux" }; ' +
              'for (property in object) { if (object.hasOwnProperty(property)) { "wibble"; } }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(9);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(8);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(12);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(8);
        });
      });

      describe("while loop:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('while (true) { "foo"; }');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(2);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("methods is empty", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(1);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(1);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });
      });

      describe("while loop containing condition:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('while (true) { if (true) { "foo"; } }');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });
      });

      describe("do...while loop:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('do { "foo"; } while (true)');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(3);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("methods is empty", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(1);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(1);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });
      });

      describe("do...while loop containing condition:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('do { if (true) { "foo"; } } while (true)');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });
      });

      describe("try...catch:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('try { "foo"; } catch (e) { e.message; }');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(4);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(1);
        });

        test("methods is empty", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(3);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(3);
        });
      });

      describe("try containing condition", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'try { if (true) { "foo"; } } catch (e) { "bar"; }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(3);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(4);
        });
      });

      describe("catch containing condition", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'try { "foo"; } catch (e) { if (true) { "bar"; } }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(3);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(4);
        });
      });

      describe("catch with finally containing condition", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'try { "foo"; } catch (e) { } finally { if (true) { "bar"; } }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(4);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(4);
        });
      });

      describe("function declaration:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('function foo () { "bar"; }');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(2);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(1);
        });

        test("method has correct name", () => {
          expect(report.methods[0].name).toBe("foo");
        });

        test("method has correct physical lines of code", () => {
          expect(report.methods[0].sloc.physical).toBe(1);
        });

        test("method has correct logical lines of code", () => {
          expect(report.methods[0].sloc.logical).toBe(1);
        });

        test("method has correct cyclomatic complexity", () => {
          expect(report.methods[0].cyclomatic).toBe(1);
        });

        test("method has correct parameter count", () => {
          expect(report.methods[0].paramCount).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(1);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(1);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });

        test("aggregate has correct Halstead length", () => {
          expect(report.aggregate.halstead.length).toBe(3);
        });

        test("aggregate has correct Halstead vocabulary", () => {
          expect(report.aggregate.halstead.vocabulary).toBe(3);
        });

        test("aggregate has correct Halstead difficulty", () => {
          expect(report.aggregate.halstead.difficulty).toBe(0.5);
        });

        test("method has correct Halstead length", () => {
          expect(report.methods[0].halstead.length).toBe(1);
        });

        test("method has correct Halstead vocabulary", () => {
          expect(report.methods[0].halstead.vocabulary).toBe(1);
        });

        test("method has correct Halstead difficulty", () => {
          expect(report.methods[0].halstead.difficulty).toBe(0);
        });

        test("method has correct Halstead volume", () => {
          expect(report.methods[0].halstead.volume).toBe(0);
        });

        test("method has correct Halstead effort", () => {
          expect(report.methods[0].halstead.effort).toBe(0);
        });

        test("method has correct Halstead bugs", () => {
          expect(report.methods[0].halstead.bugs).toBe(0);
        });

        test("method has correct Halstead time", () => {
          expect(report.methods[0].halstead.time).toBe(0);
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(170.409);
        });

        test("aggregate has correct parameter count", () => {
          expect(report.aggregate.paramCount).toBe(0);
        });
      });

      describe("nested function declaration:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'function foo () { bar(); function bar () { "baz"; } }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(4);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(2);
        });

        test("first method has correct logical lines of code", () => {
          expect(report.methods[0].sloc.logical).toBe(2);
        });

        test("second method has correct logical lines of code", () => {
          expect(report.methods[1].sloc.logical).toBe(1);
        });

        test("first method has correct name", () => {
          expect(report.methods[0].name).toBe("foo");
        });

        test("second method has correct name", () => {
          expect(report.methods[1].name).toBe("bar");
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(3);
        });
      });

      describe("function declaration containing condition:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('function foo () { if (true) { "bar"; } }');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });

        test("method has correct cyclomatic complexity", () => {
          expect(report.methods[0].cyclomatic).toBe(2);
        });

        test("method has correct cyclomatic complexity", () => {
          expect(report.methods[0].cyclomaticDensity).toBe(100);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(3);
        });
      });

      describe("assignment expression", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('var foo = "bar";');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(1);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(1);
        });

        test("methods is empty", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });
      });

      describe("member expression computed (literal)", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('var foo = this["bar"];');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(1);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(1);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(4);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });

        test("aggregate has correct Halstead operator identifier `[]`", () => {
          expect(report.aggregate.halstead.operators.identifiers.indexOf("[]")).toBeGreaterThanOrEqual(0);
        });

        test("aggregate does not have Halstead operator identifier `.`", () => {
          expect(report.aggregate.halstead.operators.identifiers.indexOf(".")).toBe(-1);
        });
      });

      describe("member expression computed (binary expression)", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze("var foo = this[bar + biz + baz];");
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(1);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(1);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(6);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(5);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(4);
        });

        test("aggregate has correct Halstead operator identifier `[]`", () => {
          expect(report.aggregate.halstead.operators.identifiers.indexOf("[]")).toBeGreaterThanOrEqual(0);
          expect(report.aggregate.halstead.operators.identifiers.indexOf("+")).toBeGreaterThanOrEqual(0);
        });

        test("aggregate does not have Halstead operator identifier `.`", () => {
          expect(report.aggregate.halstead.operators.identifiers.indexOf(".")).toBe(-1);
        });

        test(
          "aggregate has correct Halstead operand identifier `bar, biz, baz`",
          () => {
            expect(report.aggregate.halstead.operands.identifiers.indexOf("bar")).toBeGreaterThanOrEqual(0);
            expect(report.aggregate.halstead.operands.identifiers.indexOf("biz")).toBeGreaterThanOrEqual(0);
            expect(report.aggregate.halstead.operands.identifiers.indexOf("baz")).toBeGreaterThanOrEqual(0);
          }
        );
      });

      describe("regexp expression", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze("var foo = /bar/g;");
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(1);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(1);
        });

        test("functions has correct length", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });

        test("aggregate has regex operand identifier", () => {
          expect(report.aggregate.halstead.operands.identifiers.indexOf("/bar/g")).toBeGreaterThanOrEqual(0);
        });

        test("aggregate has correct Halstead length", () => {
          expect(report.aggregate.halstead.length).toBe(4);
        });

        test("aggregate has correct Halstead vocabulary", () => {
          expect(report.aggregate.halstead.vocabulary).toBe(4);
        });

        test("aggregate has correct Halstead difficulty", () => {
          expect(report.aggregate.halstead.difficulty).toBe(1);
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(163.888);
        });

        test("aggregate has correct parameter count", () => {
          expect(report.aggregate.paramCount).toBe(0);
        });
      });

      describe("ternary condtional expression assigned to variable:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('var foo = true ? "bar" : "baz";');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(1);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(3);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(4);
        });
      });

      describe("nested ternary condtional expression:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'var foo = true ? "bar" : (false ? "baz" : "qux");'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(1);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(3);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(6);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(6);
        });
      });

      describe("logical or expression assigned to variable:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze("var foo = true || false;");
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(1);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(3);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(3);
        });
      });

      describe("anonymous function assigned to variable:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('var foo = function () { "bar"; }');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(3);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(1);
        });

        test("method has correct name", () => {
          expect(report.methods[0].name).toBe("<anon method-1>");
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(3);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });
      });

      describe("named function assigned to variable:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('var foo = function bar () { "baz"; }');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(3);
        });

        test("method has correct name", () => {
          expect(report.methods[0].name).toBe("bar");
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(3);
        });
      });

      describe("ternary condtional expression returned from function:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'function foo () { return true ? "bar" : "baz"; }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(2);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });

        test("method has correct cyclomatic complexity", () => {
          expect(report.methods[0].cyclomatic).toBe(2);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(3);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(4);
        });
      });

      describe("logical or expression returned from function:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze("function foo () { return true || false; }");
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(2);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });

        test("method has correct cyclomatic complexity", () => {
          expect(report.methods[0].cyclomatic).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(3);
        });
      });

      describe("anonymous function returned from function:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'function foo () { return function () { "bar"; }; }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(4);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(2);
        });

        test("first method has correct name", () => {
          expect(report.methods[0].name).toBe("foo");
        });

        test("second method is anonymous", () => {
          expect(report.methods[1].name).toBe("<anon method-1>");
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });
      });

      describe("named function returned from function:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'function foo () { return function bar () { "baz"; }; }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("second method has correct name", () => {
          expect(report.methods[1].name).toBe("bar");
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(3);
        });
      });

      describe("ternary condtional expression passed as argument:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('parseInt("10", true ? 10 : 8);');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(5);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(5);
        });
      });

      describe("logical or expression passed as argument:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('parseInt("10", 10 || 8);');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });
      });

      describe("anonymous function passed as argument:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('setTimeout(function () { "foo"; }, 1000);');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(3);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(1);
        });

        test("method is anonymous", () => {
          expect(report.methods[0].name).toBe("<anon method-1>");
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(3);
        });
      });

      describe("named function passed as argument:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'setTimeout(function foo () { "bar"; }, 1000);'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("method has correct name", () => {
          expect(report.methods[0].name).toBe("foo");
        });
      });

      describe("logical AND expression:", () => {
        test("aggregate has correct cyclomatic complexity", () => {
          const report = parser.analyze("var foo = true && false;", {});
          expect(report.aggregate.cyclomatic).toBe(2);
          expect(report.methodAverage.cyclomatic).toBe(0);
        });
      });

      describe("logical OR expression with logicalor false:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze("var foo = true || false;", {
            logicalor: false,
          });
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(1);
        });
      });

      describe("switch statement with switchcase false:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'switch (Date.now()) { case 1: "foo"; break; case 2: "bar"; break; default: "baz"; }',
            { switchcase: false }
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(1);
        });
      });

      describe("for...in loop with forin true:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'var property; for (property in { foo: "bar", baz: "qux" }) { "wibble"; }',
            { forin: true }
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct Halstead operand identifiers", () => {
          expect(JSON.stringify(report.aggregate.halstead.operands.identifiers)).toBe('["property","foo","\\"bar\\"","baz","\\"qux\\"","\\"wibble\\""]');
        });

        test("aggregate has correct Halstead operator identifiers", () => {
          expect(JSON.stringify(report.aggregate.halstead.operators.identifiers)).toBe('["var","forin","{}",":"]');
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(3);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(137.007);
        });
      });

      describe("try...catch with trycatch true:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('try { "foo"; } catch (e) { e.message; }', {
            trycatch: true,
          });
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });
      });

      describe("IIFE:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            '(function (foo) { if (foo === "foo") { console.log(foo); return; } "bar"; }("foo"));'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(6);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(1);
        });

        test("method has correct cyclomatic complexity", () => {
          expect(report.methods[0].cyclomatic).toBe(2);
        });

        test("method has correct parameter count", () => {
          expect(report.methods[0].paramCount).toBe(1);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(7);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(6);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(8);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(5);
        });

        test("aggregate has correct parameter count", () => {
          expect(report.aggregate.paramCount).toBe(1);
        });
      });

      describe("logical and condition:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('if ("foo" && "bar") { "baz"; }');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(2);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(3);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(3);
        });
      });

      describe("call on function object:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('(function () { "foo"; }).call(this);');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(3);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(1);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(4);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });
      });

      describe("anonymous function assigned to property:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'var foo = {}; foo.bar = function () { "foobar"; };'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(4);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(1);
        });

        test("method has correct name", () => {
          expect(report.methods[0].name).toBe("<anon method-1>");
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(6);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(5);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(3);
        });
      });

      describe("anonymous function assigned to property of literal:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('"".bar = function () { "bar"; };');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(3);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(1);
        });

        test("method has correct name", () => {
          expect(report.methods[0].name).toBe("<anon method-1>");
        });
      });

      describe("empty object literal:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze("var foo = {};");
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(1);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(1);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(3);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(3);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(1);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(1);
        });
      });

      describe("function property of literal object:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'var foo = { bar: "bar", baz: function () { "baz"; } };'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(5);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(1);
        });

        test("method has correct name", () => {
          expect(report.methods[0].name).toBe("<anon method-1>");
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(6);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(5);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(5);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(5);
        });
      });

      describe("duplicate function properties of literal object:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'var foo = { bar: function () { if (true) { "bar"; } }, bar: function () { "bar"; } };'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(2);
        });

        test("first method has correct name", () => {
          expect(report.methods[0].name).toBe("<anon method-1>");
        });

        test("second method has correct name", () => {
          expect(report.methods[1].name).toBe("<anon method-2>");
        });

        test("first method has correct cyclomatic complexity", () => {
          expect(report.methods[0].cyclomatic).toBe(2);
        });

        test("second method has correct cyclomatic complexity", () => {
          expect(report.methods[1].cyclomatic).toBe(1);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(4);
        });
      });

      describe("throw exception:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'try { throw new Error("foo"); } catch (e) { alert(error.message); }'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(4);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(6);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(6);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(6);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(6);
        });
      });

      describe("prefix and postfix increment:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze("var a = 0; ++a; a++;");
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(3);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(1);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(4);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(4);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });
      });

      describe("array literal:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('[ "foo", "bar" ];');
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(1);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(0);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(1);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(2);
        });
      });

      describe("multiple physical lines:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            "// This is a\n// multi-line\n// comment.\nparseInt(\n\t(function () {\n\t\t// Moar\n\t\t" +
              '// commentz!\n\t\treturn [\n\t\t\t"1",\n\t\t\t"0"\n\t\t].join("");\n\t}()),\n\t10\n);'
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("report has correct line start / end", () => {
          switch (parser.name) {
            // acorn, babelParser & babylon sets the start location at line 1 (first comment) instead of
            // line 4 (first line of code).
            case "acorn":
            case "babelParser":
            case "babylon":
              expect(report.lineStart).toBe(1);
              expect(report.lineEnd).toBe(14);
              break;
            default:
              expect(report.lineStart).toBe(4);
              expect(report.lineEnd).toBe(14);
          }
        });

        test("aggregate has correct physical lines of code", () => {
          switch (parser.name) {
            // acorn, babelParser & babylon sets the start location at line 1 (first comment) instead of
            // line 4 (first line of code).
            case "acorn":
            case "babelParser":
            case "babylon":
              expect(report.aggregate.sloc.physical).toBe(14);
              break;
            default:
              expect(report.aggregate.sloc.physical).toBe(11);
          }
        });

        test("aggregate has correct Halstead operand identifiers", () => {
          expect(JSON.stringify(report.aggregate.halstead.operands.identifiers)).toBe('["parseInt","\\"1\\"","\\"0\\"","join","\\"\\"","10"]');
        });

        test("aggregate has correct Halstead operator identifiers", () => {
          expect(JSON.stringify(report.aggregate.halstead.operators.identifiers)).toBe('["()","function","return",".","[]",","]');
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(5);
        });

        test("methods has correct length", () => {
          expect(report.methods.length).toBe(1);
        });

        test("method has correct physical lines of code", () => {
          expect(report.methods[0].sloc.physical).toBe(8);
        });

        test("method has correct logical lines of code", () => {
          expect(report.methods[0].sloc.logical).toBe(2);
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(141.377);
        });
      });

      describe("multiple functions:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            "function foo (a, b) { if (a) { b(a); } else { a(b); } } " +
              "function bar (c, d) { var i; for (i = 0; i < c.length; i += 1) { d += 1; } console.log(d); }"
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(129.225);
        });

        test("first method has correct parameter count", () => {
          expect(report.methods[0].paramCount).toBe(2);
        });

        test("second method has correct parameter count", () => {
          expect(report.methods[1].paramCount).toBe(2);
        });

        test("aggregate has correct parameter count", () => {
          expect(report.aggregate.paramCount).toBe(4);
        });

        test("mean logical LOC is correct", () => {
          expect(report.methodAverage.sloc.logical).toBe(4);
        });

        test("mean cyclomatic complexity is correct", () => {
          expect(report.methodAverage.cyclomatic).toBe(2);
        });

        test("mean Halstead effort is correct", () => {
          expect(report.methodAverage.halstead.effort).toBe(283.607);
        });

        test("mean parameter count is correct", () => {
          expect(report.methodAverage.paramCount).toBe(2);
        });
      });

      describe("issue 3 / reddit.ISV_Damocles:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            "var callback = arguments[arguments.length-1] instanceof Function ? " +
              "arguments[arguments.length-1] : function() {};"
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(150.966);
        });
      });

      describe("empty return:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze("function foo () { return; }");
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(2);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(2);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(1);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(1);
        });

        test("aggregate has correct Halstead difficulty", () => {
          expect(report.aggregate.halstead.difficulty).toBe(1);
        });

        test("method has correct Halstead difficulty", () => {
          expect(report.methods[0].halstead.difficulty).toBe(0.5);
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(168.038);
        });
      });

      describe("Empty nested functions", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze("function foo () { function bar () {} }");
        });

        afterEach(() => {
          report = undefined;
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(171);
        });
      });

      describe("Microsoft variant maintainability index:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            "function foo (a, b) { if (a) { b(a); } else { a(b); } }" +
              "function bar (c, d) { var i; for (i = 0; i < c.length; i += 1) { d += 1; } console.log(d); }",
            { newmi: true }
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(75.57);
        });
      });

      describe("Functions with consistent parameter counts:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            "function foo (a) {} function bar (b) {} function baz (c) {}"
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct parameter count", () => {
          expect(report.aggregate.paramCount).toBe(3);
        });

        test("mean parameter count is correct", () => {
          expect(report.methodAverage.paramCount).toBe(1);
        });
      });

      describe("Functions with inconsistent parameter counts:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            "function foo (a, b, c, d, e) {} function bar (a, b, c, d, e) {} function baz (a) {}"
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct parameter count", () => {
          expect(report.aggregate.paramCount).toBe(11);
        });

        test("mean parameter count is correct", () => {
          expect(report.methodAverage.paramCount).toBe(3.667);
        });
      });

      describe("CommonJS require literal:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('require("./foo");', { commonjs: true });
        });

        afterEach(() => {
          report = undefined;
        });

        test("dependencies has correct length", () => {
          expect(report.dependencies.length).toBe(1);
        });

        test("dependencies are correct", () => {
          expect(typeof report.dependencies[0]).toBe("object");
          expect(report.dependencies[0].line).toBe(1);
          expect(report.dependencies[0].path).toBe("./foo");
          expect(report.dependencies[0].type).toBe("cjs");
        });
      });

      describe("alternative CommonJS require literal:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('require("./bar");', { commonjs: true });
        });

        afterEach(() => {
          report = undefined;
        });

        test("dependencies are correct", () => {
          expect(report.dependencies[0].path).toBe("./bar");
        });
      });

      describe("CommonJS require multiple:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            'require("./foo");\nrequire("./bar");\n\nrequire("./baz");',
            { commonjs: true }
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("dependencies has correct length", () => {
          expect(report.dependencies.length).toBe(3);
        });

        test("dependencies are correct", () => {
          expect(report.dependencies[0].line).toBe(1);
          expect(report.dependencies[0].path).toBe("./foo");
          expect(report.dependencies[1].line).toBe(2);
          expect(report.dependencies[1].path).toBe("./bar");
          expect(report.dependencies[2].line).toBe(4);
          expect(report.dependencies[2].path).toBe("./baz");
        });
      });

      describe("CommonJS require variable:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze('var foo = "./foo";require(foo);', {
            commonjs: true,
          });
        });

        afterEach(() => {
          report = undefined;
        });

        test("dependencies has correct length", () => {
          expect(report.dependencies.length).toBe(1);
        });

        test("dependencies are correct", () => {
          expect(typeof report.dependencies[0]).toBe("object");
          expect(report.dependencies[0].line).toBe(1);
          expect(report.dependencies[0].path).toBe("* dynamic dependency *");
          expect(report.dependencies[0].type).toBe("cjs");
        });
      });
    });
  });
}
