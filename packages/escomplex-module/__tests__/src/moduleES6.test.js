import { test, describe, expect, beforeEach, afterEach } from "vitest";

import parsers from "./parsers";
import * as testconfig from "./testconfig";

if (testconfig.modules["moduleES6"]) {
  parsers.forEach((parser) => {
    describe(`(${parser.name}): module (ES6):`, () => {
      describe("Functions", () => {
        describe("generator functions:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("function* foo(param1) {}");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","param1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["function*"]');
          });

          test("method has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("method has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(1);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("foo");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe(
              '["param1"]'
            );
          });

          test("method has correct physical lines of code", () => {
            expect(report.methods[0].sloc.physical).toBe(1);
          });

          test("method has correct logical lines of code", () => {
            expect(report.methods[0].sloc.logical).toBe(0);
          });

          test("method has correct cyclomatic complexity", () => {
            expect(report.methods[0].cyclomatic).toBe(1);
          });

          test("method has correct parameter count", () => {
            expect(report.methods[0].paramCount).toBe(1);
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
            expect(report.methods[0].halstead.length).toBe(0);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(0);
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
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(1);
          });
        });
      });

      describe("Statements", () => {
        describe("for...of:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("for (let value of [10, 20, 30]) {}");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["value","10","20","30"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["forof","let","[]",","]');
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
            expect(report.aggregate.halstead.operators.total).toBe(5);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(9);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(157.358);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });
      });

      describe("Declarations", () => {
        describe("let / const variable declarations", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('let foo = "bar"; const bar = "foo";');
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","\\"bar\\"","bar","\\"foo\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["let","=","const"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(2);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(4);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(8);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(7);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1.5);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(147.742);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });
      });

      describe("Expressions", () => {
        describe("CallExpression (super):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "class Foo {}; class Bar extends Foo { constructor() { super(); } }"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","Bar","constructor"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","extends","()","super"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
            expect(
              JSON.stringify(
                report.classes[1].aggregate.halstead.operands.identifiers
              )
            ).toBe('["constructor"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
            expect(
              JSON.stringify(
                report.classes[1].aggregate.halstead.operators.identifiers
              )
            ).toBe('["()","super"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[1].methods[0].halstead.operands.identifiers
              )
            ).toBe("[]");
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[1].methods[0].halstead.operators.identifiers
              )
            ).toBe('["()","super"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(0);
            expect(report.classes[1].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(0);
            expect(report.classes[1].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(0);
          });

          test("class methods has correct length", () => {
            expect(report.classes[1].methods.length).toBe(1);
          });

          test("class method names are correct", () => {
            expect(report.classes[1].methods[0].name).toBe("constructor");

            expect(
              JSON.stringify(report.classes[1].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class method has correct physical lines of code", () => {
            expect(report.classes[1].methods[0].sloc.physical).toBe(1);
          });

          test("class method has correct logical lines of code", () => {
            expect(report.classes[1].methods[0].sloc.logical).toBe(1);
          });

          test("class method has correct cyclomatic complexity", () => {
            expect(report.classes[1].methods[0].cyclomatic).toBe(1);
          });

          test("class method has correct parameter count", () => {
            expect(report.classes[1].methods[0].paramCount).toBe(0);
          });

          test("class method has correct Halstead length", () => {
            expect(report.classes[1].methods[0].halstead.length).toBe(2);
          });

          test("class method has correct Halstead vocabulary", () => {
            expect(report.classes[1].methods[0].halstead.vocabulary).toBe(2);
          });

          test("class method has correct Halstead difficulty", () => {
            expect(report.classes[1].methods[0].halstead.difficulty).toBe(1);
          });

          test("class method has correct Halstead volume", () => {
            expect(report.classes[1].methods[0].halstead.volume).toBe(2);
          });

          test("class method has correct Halstead effort", () => {
            expect(report.classes[1].methods[0].halstead.effort).toBe(2);
          });

          test("class method has correct Halstead bugs", () => {
            expect(report.classes[1].methods[0].halstead.bugs).toBe(0.001);
          });

          test("class method has correct Halstead time", () => {
            expect(report.classes[1].methods[0].halstead.time).toBe(0.111);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(4);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(4);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(3);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(9);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(7);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.667);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(25.266);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(67.377);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.008);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(3.743);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(147.742);
            expect(report.classes[0].maintainability).toBe(171);
            expect(report.classes[1].maintainability).toBe(168.629);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("MemberExpression (super):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'class Foo { constructor() { this.foobar = "foobar"; } }; ' +
                "class Bar extends Foo { constructor() { let test = super.foobar; } }"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe(
              '["Foo","constructor","foobar","\\"foobar\\"","Bar","test"]'
            );
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","=",".","this","extends","let","super"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["constructor","foobar","\\"foobar\\""]');
            expect(
              JSON.stringify(
                report.classes[1].aggregate.halstead.operands.identifiers
              )
            ).toBe('["constructor","test","foobar"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
            expect(
              JSON.stringify(
                report.classes[1].aggregate.halstead.operators.identifiers
              )
            ).toBe('["let","=",".","super"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["foobar","\\"foobar\\""]');
            expect(
              JSON.stringify(
                report.classes[1].methods[0].halstead.operands.identifiers
              )
            ).toBe('["test","foobar"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
            expect(
              JSON.stringify(
                report.classes[1].methods[0].halstead.operators.identifiers
              )
            ).toBe('["let","=",".","super"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(6);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(3);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
            expect(report.classes[1].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
            expect(report.classes[1].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
            expect(report.classes[1].methods.length).toBe(1);
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("constructor");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class method has correct physical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.physical).toBe(1);
          });

          test("class method has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class method has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class method has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(0);
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("constructor");
            expect(report.classes[1].methods[0].name).toBe("constructor");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
            expect(
              JSON.stringify(report.classes[1].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class method has correct physical lines of code", () => {
            expect(report.classes[1].methods[0].sloc.physical).toBe(1);
          });

          test("class method has correct logical lines of code", () => {
            expect(report.classes[1].methods[0].sloc.logical).toBe(1);
          });

          test("class method has correct cyclomatic complexity", () => {
            expect(report.classes[1].methods[0].cyclomatic).toBe(1);
          });

          test("class method has correct parameter count", () => {
            expect(report.classes[1].methods[0].paramCount).toBe(0);
          });

          test("class method has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(5);
          });

          test("class method has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(5);
          });

          test("class method has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(1.5);
          });

          test("class method has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(11.61);
          });

          test("class method has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(17.414);
          });

          test("class method has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.004);
          });

          test("class method has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.967);
          });

          test("class method has correct Halstead length", () => {
            expect(report.classes[1].methods[0].halstead.length).toBe(6);
          });

          test("class method has correct Halstead vocabulary", () => {
            expect(report.classes[1].methods[0].halstead.vocabulary).toBe(6);
          });

          test("class method has correct Halstead difficulty", () => {
            expect(report.classes[1].methods[0].halstead.difficulty).toBe(2);
          });

          test("class method has correct Halstead volume", () => {
            expect(report.classes[1].methods[0].halstead.volume).toBe(15.51);
          });

          test("class method has correct Halstead effort", () => {
            expect(report.classes[1].methods[0].halstead.effort).toBe(31.02);
          });

          test("class method has correct Halstead bugs", () => {
            expect(report.classes[1].methods[0].halstead.bugs).toBe(0.005);
          });

          test("class method has correct Halstead time", () => {
            expect(report.classes[1].methods[0].halstead.time).toBe(1.723);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(10);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(7);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(9);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(6);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(19);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(13);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(5.25);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(70.308);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(369.119);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.023);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(20.507);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(143.312);
            expect(report.classes[0].maintainability).toBe(161.228);
            expect(report.classes[1].maintainability).toBe(159.254);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("ArrayExpression (spread)", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["iter","2","3","4","spreadTest","1","5"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","[]",",","... (spread)"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(2);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has `... (spread)` Halstead operator identifier", () => {
            expect(
              report.aggregate.halstead.operators.identifiers.indexOf(
                "... (spread)"
              )
            ).toBeGreaterThanOrEqual(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(11);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(5);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(8);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(7);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(19);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(12);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.857);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(68.114);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(194.612);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.023);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(10.812);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(141.744);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("CallExpression (spread):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const iter = [2, 3, 4]; const foo = function(b, a, r) {}; foo(...iter);"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["iter","2","3","4","foo","b","a","r"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","[]",",","function","()","... (spread)"]');
          });

          test("module method has Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("module method has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("<anon method-1>");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe(
              '["b","a","r"]'
            );
          });

          test("method has correct physical lines of code", () => {
            expect(report.methods[0].sloc.physical).toBe(1);
          });

          test("method has correct logical lines of code", () => {
            expect(report.methods[0].sloc.logical).toBe(0);
          });

          test("method has correct cyclomatic complexity", () => {
            expect(report.methods[0].cyclomatic).toBe(1);
          });

          test("method has correct parameter count", () => {
            expect(report.methods[0].paramCount).toBe(3);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(0);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(0);
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

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(10);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(7);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(10);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(8);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(20);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(15);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(4.375);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(78.138);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(341.853);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.026);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(18.992);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(142.188);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(3);
          });
        });

        describe("ArrowFunctionExpression (explicit):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const s_FOO = (x, y) => { return x + y; };"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["s_FOO","x","y"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","function=>","return","+"]');
          });

          test("module method has Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["x","y"]');
          });

          test("module method has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["return","+"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("<anon method-1>");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe(
              '["x","y"]'
            );
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
            expect(report.methods[0].paramCount).toBe(2);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(4);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(4);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(1);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(8);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(8);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.003);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.444);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(5);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(3);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(10);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(4.167);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(30);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(125);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.01);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(6.944);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(150.289);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(2);
          });
        });

        describe("ArrowFunctionExpression (explicit with default values):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const s_FOO = (x = 1, y = 2) => { return x + y; };"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            // Fails for esprima; see below.
            // assert.strictEqual(JSON.stringify(report.aggregate.halstead.operands.identifiers),
            //  '["s_FOO","x","1","y","2"]');

            const identifiers = report.aggregate.halstead.operands.identifiers;

            // Must test individually as esprima default values don't use AssignmentPattern.
            expect(identifiers.length).toBe(5);
            expect(identifiers.indexOf("s_FOO")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("x")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("1")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("y")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("2")).toBeGreaterThanOrEqual(0);
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","function=>","return","+"]');
          });

          test("module method has Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["x","y"]');
          });

          test("module method has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["return","+"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("<anon method-1>");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe(
              '["x","y"]'
            );
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
            expect(report.methods[0].paramCount).toBe(2);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(4);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(4);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(1);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(8);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(8);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.003);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.444);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(7);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(5);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(7);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(5);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(14);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(10);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(3.5);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(46.507);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(162.774);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.016);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(9.043);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(149.386);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(2);
          });
        });

        describe("ArrowFunctionExpression (implicit):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("array.forEach((entry) => !entry);");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["array","forEach","entry"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["()",".","function=>","! (prefix)"]');
          });

          test("module method has Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["entry"]');
          });

          test("module method has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["! (prefix)"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("<anon method-1>");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe(
              '["entry"]'
            );
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
            expect(report.methods[0].paramCount).toBe(1);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(2);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(2);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(0.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(2);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(1);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.001);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.056);
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
            expect(report.aggregate.halstead.operands.distinct).toBe(3);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(8);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(7);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.667);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(22.459);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(59.89);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.007);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(3.327);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(152.806);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(1);
          });
        });

        describe("ArrowFunctionExpression (implicit with default values):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("array.forEach((entry = true) => !entry);");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["array","forEach","entry","true"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["()",".","function=>","=","! (prefix)"]');
          });

          test("module method has Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["entry"]');
          });

          test("module method has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["! (prefix)"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("<anon method-1>");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe(
              '["entry"]'
            );
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
            expect(report.methods[0].paramCount).toBe(1);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(2);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(2);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(0.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(2);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(1);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.001);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.056);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(5);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(4);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(10);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(9);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(3.125);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(31.699);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(99.06);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.011);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(5.503);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(151.085);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(1);
          });
        });

        // To be valid an ArrowFunctionExpression must be part of an assignment or call expression.
        // ESComplex will not parse the ArrowFunctionExpression for metrics when invalid, but will still
        // contain a method / nestedMethod entry.
        describe("Invalid ArrowFunctionExpression (explicit):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("(x, y) => { return x + y; };");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("module method has Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("module method has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(0);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("<anon method-1>");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
          });

          test("method has correct physical lines of code", () => {
            expect(report.methods[0].sloc.physical).toBe(1);
          });

          test("method has correct logical lines of code", () => {
            expect(report.methods[0].sloc.logical).toBe(0);
          });

          test("method has correct cyclomatic complexity", () => {
            expect(report.methods[0].cyclomatic).toBe(1);
          });

          test("method has correct parameter count", () => {
            expect(report.methods[0].paramCount).toBe(0);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(0);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(0);
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

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(0);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(0);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(0);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(0);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(0);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(0);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(0);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(0);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        // To be valid an ArrowFunctionExpression must be part of an assignment or call expression.
        // ESComplex will not parse the ArrowFunctionExpression for metrics when invalid, but will still
        // contain a method / nestedMethod entry.
        describe("Invalid ArrowFunctionExpression (implicit):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("(x, y) => x + y;");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("module method has Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("module method has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(0);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("<anon method-1>");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
          });

          test("method has correct physical lines of code", () => {
            expect(report.methods[0].sloc.physical).toBe(1);
          });

          test("method has correct logical lines of code", () => {
            expect(report.methods[0].sloc.logical).toBe(0);
          });

          test("method has correct cyclomatic complexity", () => {
            expect(report.methods[0].cyclomatic).toBe(1);
          });

          test("method has correct parameter count", () => {
            expect(report.methods[0].paramCount).toBe(0);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(0);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(0);
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

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(0);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(0);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(0);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(0);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(0);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(0);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(0);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(0);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("YieldExpression (yield):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "function* foo() { let index = 0; yield index++; }"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","index","0"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["function*","let","=","yield","++ (postfix)"]');
          });

          test("module method has Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["index","0"]');
          });

          test("module method has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["let","=","yield","++ (postfix)"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("foo");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
          });

          test("method has correct physical lines of code", () => {
            expect(report.methods[0].sloc.physical).toBe(1);
          });

          test("method has correct logical lines of code", () => {
            expect(report.methods[0].sloc.logical).toBe(2);
          });

          test("method has correct cyclomatic complexity", () => {
            expect(report.methods[0].cyclomatic).toBe(1);
          });

          test("method has correct parameter count", () => {
            expect(report.methods[0].paramCount).toBe(0);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(7);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(6);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(3);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(18.095);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(54.284);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.006);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(3.016);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(5);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(9);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(3.333);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(27);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(90);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.009);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(5);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(151.413);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("YieldExpression (yield*):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("function* foo() { yield* [1, 2, 3]; }");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","1","2","3"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["function*","yield*","[]",","]');
          });

          test("module method has Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["1","2","3"]');
          });

          test("module method has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["yield*","[]",","]');
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

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("foo");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
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

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(7);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(6);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(1.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(18.095);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(27.142);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.006);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(1.508);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(5);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(9);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(27);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(54);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.009);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(3);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(159.728);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });
      });

      describe("Template Literals", () => {
        describe("TemplateLiteral / TemplateElement (basic):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("const foo = `bar`;");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","bar"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","``"]');
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
            expect(report.aggregate.halstead.operands.total).toBe(2);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(2);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(5);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(5);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1.5);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(11.61);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(17.414);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.004);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(0.967);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(161.228);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("TemplateLiteral / TemplateElement (variable):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const baz = "bar"; const foo = `fuz${baz + "biz"}`;'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            // Fails for esprima; see below.
            // assert.strictEqual(JSON.stringify(report.aggregate.halstead.operands.identifiers),
            //  '["baz","\\"bar\\"","foo","\\"biz\\"","fuz"]');

            const identifiers = report.aggregate.halstead.operands.identifiers;

            // Must test individually as esprima has child nodes out of order (quasis before expressions)
            expect(identifiers.length).toBe(5);
            expect(identifiers.indexOf("baz")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf('"bar"')).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("foo")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf('"biz"')).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("fuz")).toBeGreaterThanOrEqual(0);
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","``","${}","+"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(2);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(7);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(5);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(6);
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
            expect(report.aggregate.halstead.difficulty).toBe(3);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(43.185);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(129.555);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.014);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(7.198);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(143.136);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("TemplateLiteral / TemplateElement (function):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const baz = "bar"; const foo = `fuz${JSON.stringify(baz)}`;'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            // Fails for esprima; see below.
            // assert.strictEqual(JSON.stringify(report.aggregate.halstead.operands.identifiers),
            //  '["baz","\\"bar\\"","foo","JSON","stringify","fuz"]');

            const identifiers = report.aggregate.halstead.operands.identifiers;

            // Must test individually as esprima has child nodes out of order (quasis before expressions)
            expect(identifiers.length).toBe(6);
            expect(identifiers.indexOf("baz")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf('"bar"')).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("foo")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("JSON")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("stringify")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("fuz")).toBeGreaterThanOrEqual(0);
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","``","${}","()","."]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
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
            expect(report.aggregate.halstead.operands.distinct).toBe(6);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(15);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(12);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(3.5);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(53.774);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(188.211);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.018);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(10.456);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(135.29);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("TaggedTemplateExpression:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("const foo = tagged`bar`;");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            // Fails for esprima; see below.
            // assert.strictEqual(JSON.stringify(report.aggregate.halstead.operands.identifiers),
            //  '["foo","tagged","bar"]');

            const identifiers = report.aggregate.halstead.operands.identifiers;

            // Must test individually as esprima has child nodes out of order (quasis before expressions)
            expect(identifiers.length).toBe(3);
            expect(identifiers.indexOf("foo")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("tagged")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("bar")).toBeGreaterThanOrEqual(0);
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","``"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(2);
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
            expect(report.aggregate.halstead.operands.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(3);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(6);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(6);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1.5);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(15.51);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(23.265);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.005);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(1.292);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(149.008);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });
      });

      describe("Template Literals (exclude template elements from lloc and halstead)", () => {
        describe("TemplateLiteral / TemplateElement (basic):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("const foo = `bar`;", {
              templateExpression: false,
            });
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","bar"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","="]');
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(4);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(4);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(8);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(8);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.003);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(0.444);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(163.888);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("TemplateLiteral / TemplateElement (variable):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const baz = "bar"; const foo = `fuz${baz + "biz"}`;',
              { templateExpression: false }
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            // Fails for esprima; see below.
            // assert.strictEqual(JSON.stringify(report.aggregate.halstead.operands.identifiers),
            //  '["baz","\\"bar\\"","foo","\\"biz\\"","fuz"]');

            const identifiers = report.aggregate.halstead.operands.identifiers;

            // Must test individually as esprima has child nodes out of order (quasis before expressions)
            expect(identifiers.length).toBe(5);
            expect(identifiers.indexOf("baz")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf('"bar"')).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("foo")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf('"biz"')).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("fuz")).toBeGreaterThanOrEqual(0);
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","+"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(2);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(3);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(6);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(5);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(11);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1.8);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(33);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(59.4);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.011);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(3.3);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(145.803);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("TemplateLiteral / TemplateElement (function):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const baz = "bar"; const foo = `fuz${JSON.stringify(baz)}`;',
              { templateExpression: false }
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            // Fails for esprima; see below.
            // assert.strictEqual(JSON.stringify(report.aggregate.halstead.operands.identifiers),
            //  '["baz","\\"bar\\"","foo","JSON","stringify","fuz"]');

            const identifiers = report.aggregate.halstead.operands.identifiers;

            // Must test individually as esprima has child nodes out of order (quasis before expressions)
            expect(identifiers.length).toBe(6);
            expect(identifiers.indexOf("baz")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf('"bar"')).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("foo")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("JSON")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("stringify")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("fuz")).toBeGreaterThanOrEqual(0);
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","()","."]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(6);
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
            expect(report.aggregate.halstead.length).toBe(13);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(10);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.333);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(43.185);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(100.765);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.014);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(5.598);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(137.427);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("TaggedTemplateExpression:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("const foo = tagged`bar`;", {
              templateExpression: false,
            });
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            // Fails for esprima; see below.
            // assert.strictEqual(JSON.stringify(report.aggregate.halstead.operands.identifiers),
            //  '["foo","tagged","bar"]');

            const identifiers = report.aggregate.halstead.operands.identifiers;

            // Must test individually as esprima has child nodes out of order (quasis before expressions)
            expect(identifiers.length).toBe(3);
            expect(identifiers.indexOf("foo")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("tagged")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("bar")).toBeGreaterThanOrEqual(0);
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","="]');
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

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(162.615);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });
      });

      describe("Patterns", () => {
        describe("ObjectPattern (destructuring assignment):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const bar = { a: 1, b: 2, c: 3 }; const { a, b, c } = bar;"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["bar","a","1","b","2","c","3"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","{}",":"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(8);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(9);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(4);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(14);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(7);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(23);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(11);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(4);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(79.567);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(318.268);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.027);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(17.682);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(117.604);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("ObjectPattern (anonymous destructuring assignment):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const { a, b, c } = { a: 1, b: 2, c: 3 };"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["a","b","c","1","2","3"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","{}",":"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(7);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(7);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(4);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(12);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(6);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(19);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(10);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(4);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(63.117);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(252.467);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.021);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(14.026);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(120.559);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("ObjectPattern (computed object property names and anonymous destructuring assignment):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const id = "z"; const { [id]: foo } = { z: "bar" };'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["id","\\"z\\"","foo","z","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","{}",":"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(8);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(4);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(6);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(5);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(14);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(9);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.4);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(44.379);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(106.509);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.015);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(5.917);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(132.577);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("ObjectPattern (computed object property names and anonymous destructuring assignment):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const id = "z"; const { [id + "biz"]: foo } = { z: "bar" };'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["id","\\"z\\"","\\"biz\\"","foo","z","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","{}",":","+"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(9);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(5);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(7);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(6);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(16);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(11);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.917);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(55.351);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(161.44);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.018);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(8.969);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(131.154);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("ObjectPattern 2 (anonymous destructuring assignment):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("let a, b; ({a, b} = { a:1, b:2 });");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["a","b","1","2"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["let","=","{}",":"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(7);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(6);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(4);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(10);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(4);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(16);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(5);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(48);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(240);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.016);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(13.333);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(120.732);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("ArrayPattern (destructuring assignment):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("const foo = [1, 2]; let [a, b] = foo;");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","1","2","a","b"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","[]",",","let"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(2);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(8);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(5);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(6);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(5);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(14);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(10);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(3);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(46.507);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(139.521);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.016);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(7.751);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(142.882);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("ArrayPattern (anonymous destructuring assignment):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("let [a, b] = [1, 2];");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["a","b","1","2"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["let","=","[]",","]');
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
            expect(report.aggregate.halstead.operators.total).toBe(6);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(10);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(30);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(60);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.01);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(3.333);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(156.997);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("ArrayPattern / RestElement (anonymous destructuring assignment):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const [a, b, ...restTest] = [1, 2, 3, 4, 5];"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["a","b","restTest","1","2","3","4","5"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","[]",",","... (rest)"]');
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
            expect(report.aggregate.halstead.operators.total).toBe(11);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(5);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(8);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(8);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(19);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(13);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.5);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(70.308);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(175.771);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.023);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(9.765);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(153.321);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("FunctionDeclaration `defaults` (esprima) / AssignmentPattern (acorn, babylon, espree):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'function foo(first, bar = "baz", ...items) {}'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            // Fails for esprima; see below.
            // assert.strictEqual(JSON.stringify(report.aggregate.halstead.operands.identifiers),
            //  '["foo","first","bar","\\"baz\\"","items"]');

            const identifiers = report.aggregate.halstead.operands.identifiers;

            // Must test individually as esprima default values don't use AssignmentPattern.
            expect(identifiers.length).toBe(5);
            expect(identifiers.indexOf("foo")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("first")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("bar")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf('"baz"')).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("items")).toBeGreaterThanOrEqual(0);
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            // Fails for esprima; see below.
            // assert.strictEqual(JSON.stringify(report.aggregate.halstead.operators.identifiers),
            //  '["function","=","... (rest)"]');

            const identifiers = report.aggregate.halstead.operators.identifiers;

            // Must test individually as esprima default values don't use AssignmentPattern.
            expect(identifiers.length).toBe(3);
            expect(identifiers.indexOf("function")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("=")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("... (rest)")).toBeGreaterThanOrEqual(0);
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(1);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("foo");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe(
              '["first","bar","items"]'
            );
          });

          test("method has correct physical lines of code", () => {
            expect(report.methods[0].sloc.physical).toBe(1);
          });

          test("method has correct logical lines of code", () => {
            expect(report.methods[0].sloc.logical).toBe(0);
          });

          test("method has correct cyclomatic complexity", () => {
            expect(report.methods[0].cyclomatic).toBe(1);
          });

          test("method has correct parameter count", () => {
            expect(report.methods[0].paramCount).toBe(3);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(0);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(0);
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

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(3);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(5);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(8);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1.5);
          });

          test("aggregate has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(24);
          });

          test("aggregate has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(36);
          });

          test("aggregate has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.008);
          });

          test("aggregate has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(2);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(3);
          });
        });
      });

      describe("Classes", () => {
        describe("class declaration:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("class Foo {}");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
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
            expect(report.aggregate.halstead.operators.total).toBe(1);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(1);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(1);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(1);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(2);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(2);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(0.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(2);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(1);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.001);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(0.056);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Foo");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(0);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(0);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(0);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(0);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(0);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(0);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(0);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(0);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(0);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(0);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(171);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });
        });

        describe("class declaration with super class (member expression):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("class Foo extends Bar.Baz {}");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","Bar","Baz"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","extends","."]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
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
            expect(report.aggregate.halstead.operands.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(3);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(6);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(6);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(15.51);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(23.265);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.005);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(1.292);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(160.237);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Foo");
            expect(report.classes[0].superClassName).toBe("<computed~Bar.Baz>");
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(0);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(0);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(0);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(0);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(0);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(0);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(0);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(0);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(0);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(0);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(171);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });
        });

        describe("class declaration w/ superclass:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("class Bar {} class Foo extends Bar {}");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Bar","Foo"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","extends"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
            expect(
              JSON.stringify(
                report.classes[1].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(2);
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
            expect(report.aggregate.halstead.operators.distinct).toBe(2);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(2);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(6);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(4);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(12);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(18);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.004);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(1);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(149.886);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Bar");
            expect(report.classes[1].name).toBe("Foo");

            expect(report.classes[0].superClassName).not.toBeDefined();
            expect(report.classes[1].superClassName).toBe("Bar");
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(0);
            expect(report.classes[1].aggregate.sloc.logical).toBe(0);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(0);
            expect(report.classes[1].aggregate.cyclomatic).toBe(0);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(0);
            expect(report.classes[1].methods.length).toBe(0);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              0
            );
            expect(report.classes[1].aggregate.halstead.operators.total).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(0);
            expect(
              report.classes[1].aggregate.halstead.operators.distinct
            ).toBe(0);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(0);
            expect(report.classes[1].aggregate.halstead.operands.total).toBe(0);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              0
            );
            expect(report.classes[1].aggregate.halstead.operands.distinct).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(0);
            expect(report.classes[1].aggregate.halstead.length).toBe(0);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(0);
            expect(report.classes[1].aggregate.halstead.vocabulary).toBe(0);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(0);
            expect(report.classes[1].aggregate.halstead.difficulty).toBe(0);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(0);
            expect(report.classes[1].aggregate.halstead.volume).toBe(0);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(0);
            expect(report.classes[1].aggregate.halstead.effort).toBe(0);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0);
            expect(report.classes[1].aggregate.halstead.bugs).toBe(0);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0);
            expect(report.classes[1].aggregate.halstead.time).toBe(0);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(171);
            expect(report.classes[1].maintainability).toBe(171);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
            expect(report.classes[1].aggregate.paramCount).toBe(0);
          });
        });

        describe("class declaration w/ constructor:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "class Foo { constructor(ctorParam) { this.bar = 1; } }"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","constructor","ctorParam","bar","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","=",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["constructor","ctorParam","bar","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["bar","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(4);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(4);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(5);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(9);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(9);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(28.529);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(57.059);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.01);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(3.17);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(152.971);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(1);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Foo");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              3
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(3);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(4);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              4
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(7);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(7);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(1.5);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(19.651);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(29.477);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.007);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(1.638);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(161.228);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(1);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("constructor");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe('["ctorParam"]');
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              3
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(3);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              2
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(2);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(5);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(5);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(1.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(11.61);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(17.414);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.004);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.967);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(1);
          });
        });

        describe("class declaration w/ method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("class Foo { bar() { this.baz = 1; } }");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","bar","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","=",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["bar","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(8);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(24);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(48);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.008);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(2.667);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(153.563);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Foo");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              3
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(3);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(3);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              3
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(6);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(6);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(1.5);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(15.51);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(23.265);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.005);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(1.292);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(161.228);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("bar");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              3
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(3);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              2
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(2);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(5);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(5);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(1.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(11.61);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(17.414);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.004);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.967);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(0);
          });
        });

        describe("class declaration w/ computed generator function method and computed delegated yield:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              `class Foo { *[foo + baz]() { yield 'x'; yield* [bar.biz](); yield 'y'; } }`
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","foo","baz","\\"x\\"","bar","biz","\\"y\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","function*","+","yield","yield*","()","[]","."]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["foo","baz","\\"x\\"","bar","biz","\\"y\\""]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["function*","+","yield","yield*","()","[]","."]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["\\"x\\"","bar","biz","\\"y\\""]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["yield","yield*","()","[]","."]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(5);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(9);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(8);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(7);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(7);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(16);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(15);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(4);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(62.51);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(250.041);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.021);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(13.891);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(139.643);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Foo");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(4);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              8
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(7);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(6);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              6
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(14);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(13);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(3.5);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(51.806);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(181.322);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.017);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(10.073);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(138.248);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe(
              "<computed~foo + baz>"
            );

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(3);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              6
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(5);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              4
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(4);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(10);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(9);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(2.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(31.699);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(79.248);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.011);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(4.403);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(0);
          });
        });

        describe("class declaration w/ computed (string) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              `class Foo { ['bar']() { this.baz = 1; } }`
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","bar","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","=",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["bar","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(8);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(24);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(48);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.008);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(2.667);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(153.563);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Foo");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              3
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(3);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(3);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              3
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(6);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(6);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(1.5);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(15.51);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(23.265);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.005);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(1.292);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(161.228);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("bar");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              3
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(3);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              2
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(2);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(5);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(5);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(1.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(11.61);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(17.414);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.004);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.967);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(0);
          });
        });

        describe("class declaration w/ computed (variable) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(`class Foo { [bar]() { this.baz = 1; } }`);
          });

          afterEach(() => {
            report = undefined;
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("<computed~bar>");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","bar","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","=",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["bar","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });
        });

        describe("class declaration w/ computed (2 variable concatenation) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              `class Foo { [foo+bar]() { this.baz = 1; } }`
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe(
              "<computed~foo + bar>"
            );

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","foo","bar","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","+","=",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["foo","bar","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["+","=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });
        });

        describe("class declaration w/ computed (3 variable concatenation) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              `class Foo { [foo+bar+biz]() { this.baz = 1; } }`
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe(
              "<computed~foo + bar + biz>"
            );

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","foo","bar","biz","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","+","=",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["foo","bar","biz","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["+","=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });
        });

        describe("class declaration w/ computed (2 variable + literal concatenation) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              `class Foo { [foo+bar+'biz']() { this.baz = 1; } }`
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe(
              `<computed~foo + bar + 'biz'>`
            );

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe(`["Foo","foo","bar","'biz'","baz","1"]`);
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","+","=",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe(`["foo","bar","'biz'","baz","1"]`);
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["+","=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });
        });

        describe("class declaration w/ computed (2 variable + numerical concatenation) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              `class Foo { [foo+bar+2]() { this.baz = 1; } }`
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe(
              `<computed~foo + bar + 2>`
            );

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","foo","bar","2","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","+","=",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["foo","bar","2","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["+","=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });
        });

        describe("class declaration w/ computed (2 variable + numerical concatenation) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              `class Foo { [foo+bar+true]() { this.baz = 1; } }`
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe(
              `<computed~foo + bar + true>`
            );

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","foo","bar","true","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","+","=",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["foo","bar","true","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["+","=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });
        });

        describe("class declaration w/ computed (2 variable + null concatenation) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              `class Foo { [foo+bar+null]() { this.baz = 1; } }`
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe(
              `<computed~foo + bar + null>`
            );

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","foo","bar","null","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","+","=",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["foo","bar","null","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["+","=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });
        });

        describe("class declaration w/ computed (Symbol / 2 member expression) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              `class Foo { [Symbol.iterator]() { this.baz = 1; } }`
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe(
              "<computed~Symbol.iterator>"
            );

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","Symbol","iterator","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class",".","=","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["Symbol","iterator","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('[".","=","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });
        });

        describe("class declaration w/ computed (3 member expression) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              `class Foo { [foo.bar.biz]() { this.baz = 1; } }`
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe(
              "<computed~foo.bar.biz>"
            );

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","foo","bar","biz","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class",".","=","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["foo","bar","biz","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('[".","=","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });
        });

        describe("class declaration w/ computed (2 member expression + concatenation) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              `class Foo { [foo.bar+biz]() { this.baz = 1; } }`
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe(
              "<computed~foo.bar + biz>"
            );

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","foo","bar","biz","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","+",".","=","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["foo","bar","biz","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["+",".","=","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });
        });

        describe("class declaration w/ computed (2 member expression + concatenation with method called) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              `class Foo { [foo.bar+biz.toLowerCase()]() { this.baz = 1; } }`
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe(
              "<computed~foo.bar + biz.toLowerCase()>"
            );

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","foo","bar","biz","toLowerCase","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","+",".","=","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["foo","bar","biz","toLowerCase","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["+",".","=","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });
        });

        describe("class declaration w/ computed (template literal) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "class Foo { [`${foo}`]() { this.baz = 1; } }"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe(
              "<computed~`${foo}`>"
            );
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","foo","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","=",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["foo","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });
        });

        describe("class declaration w/ computed (template literal + concatenation) method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "class Foo { [`${foo}`+bar]() { this.baz = 1; } }"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe(
              "<computed~`${foo}` + bar>"
            );

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","foo","bar","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","+","=",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["foo","bar","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["+","=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });
        });

        describe("class declaration w/ getter method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'class Foo { get bar() { return "bar"; } }'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","bar","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","get","return"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["bar","\\"bar\\""]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["get","return"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["\\"bar\\""]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["return"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
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
            expect(report.aggregate.halstead.operands.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(3);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(6);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(6);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(15.51);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(23.265);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.005);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(1.292);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(156.04);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Foo");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              2
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(2);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(2);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              2
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(4);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(4);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(1);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(8);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(8);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.003);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0.444);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(171);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("bar");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              1
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(1);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              1
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(1);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(2);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(2);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(0.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(2);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(1);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.001);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.056);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(0);
          });
        });

        describe("class declaration w/ setter method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "class Foo { set bar(data) { this._bar = data; } }"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","bar","data","_bar"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","set","=",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["bar","data","_bar"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["set","=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["_bar","data"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(5);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(4);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(10);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(9);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(3.125);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(31.699);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(99.06);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.011);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(5.503);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(151.085);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(1);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Foo");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              4
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(4);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(4);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              3
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(8);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(7);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(2.667);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(22.459);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(59.89);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.007);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(3.327);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(161.228);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(1);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("bar");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe('["data"]');
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              3
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(3);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              2
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(2);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(5);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(5);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(1.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(11.61);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(17.414);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.004);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.967);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(1);
          });
        });

        describe("class declaration w/ static method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'class Foo { static bar() { return "bar"; } }'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","bar","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","static","return"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["bar","\\"bar\\""]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["static","return"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["\\"bar\\""]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["return"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
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
            expect(report.aggregate.halstead.operands.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(3);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(6);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(6);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(15.51);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(23.265);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.005);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(1.292);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(156.04);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Foo");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              2
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(2);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(2);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              2
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(4);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(4);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(1);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(8);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(8);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.003);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0.444);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(171);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("bar");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              1
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(1);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              1
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(1);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(2);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(2);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(0.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(2);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(1);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.001);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.056);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(0);
          });
        });

        describe("class declaration w/ constructor + meta property:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "class Foo { constructor() { new.target.name; } }"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","constructor","new","target","name"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class","."]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["constructor","new","target","name"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["."]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["new","target","name"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["."]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(3);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(8);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(7);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(22.459);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(22.459);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.007);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(1.248);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(156.16);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Foo");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              2
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(1);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(4);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              4
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(6);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(5);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(0.5);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(13.932);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(6.966);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.005);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0.387);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(165.496);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("constructor");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              2
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(1);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              3
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(3);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(5);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(4);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(0.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(10);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(5);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.003);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.278);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(0);
          });
        });

        describe("all together - module method, class declaration, class method, nested methods:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              `function methodFoo(value1) {` +
                `  this.bar = [value1];` +
                `  this.bar.forEach((entry1) => { return !entry1; });` +
                `};` +
                `class Foo {` +
                `  constructor(value2 = "biz") {` +
                `    this.bar = [value2];` +
                `    this.bar.forEach((entry2) => !entry2);` +
                `  }` +
                `}` +
                ``
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe(
              '["methodFoo","value1","bar","forEach","entry1","Foo","constructor","value2","\\"biz\\"","entry2"]'
            );
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe(
              '["function","=",".","this","[]","()","function=>","return","! (prefix)","class"]'
            );
          });

          test("module methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["bar","value1","forEach","entry1"]');
            expect(
              JSON.stringify(report.methods[1].halstead.operands.identifiers)
            ).toBe('["entry1"]');
          });

          test("module methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["=",".","this","[]","()","function=>"]');
            expect(
              JSON.stringify(report.methods[1].halstead.operators.identifiers)
            ).toBe('["return","! (prefix)"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe(
              '["constructor","value2","\\"biz\\"","bar","forEach","entry2"]'
            );
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["=",".","this","[]","()","function=>","! (prefix)"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["bar","value2","forEach","entry2"]');
            expect(
              JSON.stringify(
                report.classes[0].methods[1].halstead.operands.identifiers
              )
            ).toBe('["entry2"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this","[]","()","function=>"]');
            expect(
              JSON.stringify(
                report.classes[0].methods[1].halstead.operators.identifiers
              )
            ).toBe('["! (prefix)"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(11);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(5);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(2);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(24);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(10);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(18);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(10);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(42);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(20);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(9);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(181.521);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(1633.689);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.061);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(90.76);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(138.428);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(4);
          });

          // module methods ---

          test("module methods name is correct", () => {
            expect(report.methods[0].name).toBe("methodFoo");
            expect(report.methods[1].name).toBe("<anon method-1>");
          });

          test("module methods has correct logical lines of code", () => {
            expect(report.methods[0].sloc.logical).toBe(3);
            expect(report.methods[1].sloc.logical).toBe(1);
          });

          test("module methods has correct cyclomatic complexity", () => {
            expect(report.methods[0].cyclomatic).toBe(1);
            expect(report.methods[1].cyclomatic).toBe(1);
          });

          test("module methods has correct length", () => {
            expect(report.methods[0].nestedMethods.length).toBe(0);
            expect(report.methods[1].nestedMethods.length).toBe(0);
          });

          test("module methods has correct Halstead total operators", () => {
            expect(report.methods[0].halstead.operators.total).toBe(9);
            expect(report.methods[1].halstead.operators.total).toBe(2);
          });

          test("module methods has correct Halstead distinct operators", () => {
            expect(report.methods[0].halstead.operators.distinct).toBe(6);
            expect(report.methods[1].halstead.operators.distinct).toBe(2);
          });

          test("module methods has correct Halstead total operands", () => {
            expect(report.methods[0].halstead.operands.total).toBe(5);
            expect(report.methods[1].halstead.operands.total).toBe(1);
          });

          test("module methods has correct Halstead distinct operands", () => {
            expect(report.methods[0].halstead.operands.distinct).toBe(4);
            expect(report.methods[1].halstead.operands.distinct).toBe(1);
          });

          test("module methods has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(14);
            expect(report.methods[1].halstead.length).toBe(3);
          });

          test("module methods has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(10);
            expect(report.methods[1].halstead.vocabulary).toBe(3);
          });

          test("module methods has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(3.75);
            expect(report.methods[1].halstead.difficulty).toBe(1);
          });

          test("module methods has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(46.507);
            expect(report.methods[1].halstead.volume).toBe(4.755);
          });

          test("module methods has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(174.401);
            expect(report.methods[1].halstead.effort).toBe(4.755);
          });

          test("module methods has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.016);
            expect(report.methods[1].halstead.bugs).toBe(0.002);
          });

          test("module methods has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(9.689);
            expect(report.methods[1].halstead.time).toBe(0.264);
          });

          test("module methods has correct parameter count", () => {
            expect(report.methods[0].paramCount).toBe(1);
            expect(report.methods[1].paramCount).toBe(1);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Foo");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(5);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(2);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(2);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              11
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(7);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(9);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              6
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(20);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(13);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(5.25);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(74.009);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(388.546);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.025);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(21.586);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(144.47);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(2);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("constructor");
            expect(report.classes[0].methods[1].name).toBe("<anon method-2>");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe('["value2"]');
            expect(
              JSON.stringify(report.classes[0].methods[1].paramNames)
            ).toBe('["entry2"]');
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(3);
            expect(report.classes[0].methods[1].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
            expect(report.classes[0].methods[1].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
            expect(report.classes[0].methods[1].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              9
            );
            expect(report.classes[0].methods[1].halstead.operators.total).toBe(
              1
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(6);
            expect(
              report.classes[0].methods[1].halstead.operators.distinct
            ).toBe(1);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              5
            );
            expect(report.classes[0].methods[1].halstead.operands.total).toBe(
              1
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(4);
            expect(
              report.classes[0].methods[1].halstead.operands.distinct
            ).toBe(1);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(14);
            expect(report.classes[0].methods[1].halstead.length).toBe(2);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(10);
            expect(report.classes[0].methods[1].halstead.vocabulary).toBe(2);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(3.75);
            expect(report.classes[0].methods[1].halstead.difficulty).toBe(0.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(46.507);
            expect(report.classes[0].methods[1].halstead.volume).toBe(2);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(174.401);
            expect(report.classes[0].methods[1].halstead.effort).toBe(1);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.016);
            expect(report.classes[0].methods[1].halstead.bugs).toBe(0.001);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(9.689);
            expect(report.classes[0].methods[1].halstead.time).toBe(0.056);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(1);
            expect(report.classes[0].methods[1].paramCount).toBe(1);
          });
        });

        describe("class expression (anonymous):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("const Foo = class {}");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","class"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(2);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(4);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(4);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(8);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(12);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.003);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(0.667);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(151.273);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("<anon class-1>");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(0);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(0);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(0);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(0);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(0);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(0);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(0);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(0);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(0);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(0);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(171);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });
        });

        describe("class expression (named):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("const FooClass = class Foo {}");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["FooClass","Foo"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","class"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(2);
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
            expect(report.aggregate.halstead.operands.total).toBe(2);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(2);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(5);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(5);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(11.61);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(17.414);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.004);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(0.967);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(149.999);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Foo");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(0);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(0);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(0);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(0);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(0);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(0);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(0);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(0);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(0);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(0);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(171);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });
        });

        describe("class expression with super class (member expression):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const FooClass = class Foo extends Bar.Baz {}"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["FooClass","Foo","Bar","Baz"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","class","extends","."]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(2);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(5);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(9);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(9);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(28.529);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(71.323);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.01);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(3.962);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(145.177);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Foo");
            expect(report.classes[0].superClassName).toBe("<computed~Bar.Baz>");
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(0);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(0);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(0);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(0);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(0);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(0);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(0);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(0);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(0);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(0);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(171);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });
        });

        describe("class expression w/ superclass:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const BarClass = class {}; const FooClass = class extends BarClass {};"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["BarClass","FooClass"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","class","extends"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
            expect(
              JSON.stringify(
                report.classes[1].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
            expect(
              JSON.stringify(
                report.classes[1].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(7);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(4);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(2);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(10);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(6);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(3);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(25.85);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(77.549);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.009);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(4.308);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(133.662);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("<anon class-1>");
            expect(report.classes[1].name).toBe("<anon class-2>");
            expect(report.classes[0].superClassName).not.toBeDefined();
            expect(report.classes[1].superClassName).toBe("BarClass");
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(0);
            expect(report.classes[1].aggregate.sloc.logical).toBe(0);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(0);
            expect(report.classes[1].aggregate.cyclomatic).toBe(0);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(0);
            expect(report.classes[1].methods.length).toBe(0);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              0
            );
            expect(report.classes[1].aggregate.halstead.operators.total).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(0);
            expect(
              report.classes[1].aggregate.halstead.operators.distinct
            ).toBe(0);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(0);
            expect(report.classes[1].aggregate.halstead.operands.total).toBe(0);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              0
            );
            expect(report.classes[1].aggregate.halstead.operands.distinct).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(0);
            expect(report.classes[1].aggregate.halstead.length).toBe(0);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(0);
            expect(report.classes[1].aggregate.halstead.vocabulary).toBe(0);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(0);
            expect(report.classes[1].aggregate.halstead.difficulty).toBe(0);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(0);
            expect(report.classes[1].aggregate.halstead.volume).toBe(0);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(0);
            expect(report.classes[1].aggregate.halstead.effort).toBe(0);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0);
            expect(report.classes[1].aggregate.halstead.bugs).toBe(0);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0);
            expect(report.classes[1].aggregate.halstead.time).toBe(0);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(171);
            expect(report.classes[1].maintainability).toBe(171);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
            expect(report.classes[1].aggregate.paramCount).toBe(0);
          });
        });

        describe("class expression (named) w/ superclass:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const BarClass = class Bar {}; const FooClass = class Foo extends BarClass {};"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["BarClass","Bar","FooClass","Foo"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","class","extends"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
            expect(
              JSON.stringify(
                report.classes[1].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
            expect(
              JSON.stringify(
                report.classes[1].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(7);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(4);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(4);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(12);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(36);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(90);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.012);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(5);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(133.153);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("Bar");
            expect(report.classes[1].name).toBe("Foo");
            expect(report.classes[0].superClassName).not.toBeDefined();
            expect(report.classes[1].superClassName).toBe("BarClass");
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(0);
            expect(report.classes[1].aggregate.sloc.logical).toBe(0);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(0);
            expect(report.classes[1].aggregate.cyclomatic).toBe(0);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(0);
            expect(report.classes[1].methods.length).toBe(0);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              0
            );
            expect(report.classes[1].aggregate.halstead.operators.total).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(0);
            expect(
              report.classes[1].aggregate.halstead.operators.distinct
            ).toBe(0);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(0);
            expect(report.classes[1].aggregate.halstead.operands.total).toBe(0);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              0
            );
            expect(report.classes[1].aggregate.halstead.operands.distinct).toBe(
              0
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(0);
            expect(report.classes[1].aggregate.halstead.length).toBe(0);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(0);
            expect(report.classes[1].aggregate.halstead.vocabulary).toBe(0);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(0);
            expect(report.classes[1].aggregate.halstead.difficulty).toBe(0);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(0);
            expect(report.classes[1].aggregate.halstead.volume).toBe(0);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(0);
            expect(report.classes[1].aggregate.halstead.effort).toBe(0);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0);
            expect(report.classes[1].aggregate.halstead.bugs).toBe(0);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0);
            expect(report.classes[1].aggregate.halstead.time).toBe(0);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(171);
            expect(report.classes[1].maintainability).toBe(171);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
            expect(report.classes[1].aggregate.paramCount).toBe(0);
          });
        });

        describe("class expression w/ constructor:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const Foo = class { constructor() { this.bar = 1; } }"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","constructor","bar","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","class",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["constructor","bar","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["bar","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(10);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(9);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(31.699);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(79.248);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.011);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(4.403);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(147.187);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("<anon class-1>");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              3
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(3);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(3);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              3
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(6);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(6);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(1.5);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(15.51);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(23.265);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.005);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(1.292);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(161.228);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("constructor");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              3
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(3);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              2
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(2);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(5);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(5);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(1.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(11.61);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(17.414);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.004);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.967);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(0);
          });
        });

        describe("class expression w/ method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const Foo = class { bar() { this.baz = 1; } }"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","bar","baz","1"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","class",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["bar","baz","1"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["baz","1"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(10);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(9);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(31.699);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(79.248);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.011);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(4.403);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(147.187);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("<anon class-1>");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              3
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(3);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(3);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              3
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(6);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(6);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(1.5);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(15.51);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(23.265);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.005);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(1.292);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(161.228);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("bar");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              3
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(3);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              2
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(2);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(5);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(5);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(1.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(11.61);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(17.414);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.004);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.967);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(0);
          });
        });

        describe("class expression w/ getter method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const Foo = class { get bar() { return "bar"; } }'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","bar","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","class","get","return"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["bar","\\"bar\\""]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["get","return"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["\\"bar\\""]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["return"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(5);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(3);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(8);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(24);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(60);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.008);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(3.333);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(148.139);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("<anon class-1>");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              2
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(2);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(2);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              2
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(4);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(4);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(1);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(8);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(8);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.003);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0.444);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(171);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("bar");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              1
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(1);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              1
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(1);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(2);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(2);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(0.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(2);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(1);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.001);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.056);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(0);
          });
        });

        describe("class expression w/ setter method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const Foo = class { set bar(data) { this._bar = data; } }"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","bar","data","_bar"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","class","set",".","this"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["bar","data","_bar"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["set","=",".","this"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["_bar","data"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["=",".","this"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(7);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(6);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(4);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(12);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(10);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(3.75);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(39.863);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(149.487);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.013);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(8.305);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(145.017);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(1);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("<anon class-1>");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              4
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(4);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(4);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              3
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(8);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(7);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(2.667);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(22.459);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(59.89);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.007);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(3.327);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(161.228);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(1);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("bar");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe('["data"]');
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              3
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(3);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              2
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(2);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(5);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(5);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(1.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(11.61);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(17.414);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.004);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.967);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(1);
          });
        });

        describe("class expression w/ static method:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const Foo = class { static bar() { return "bar"; } }'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","bar","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","class","static","return"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["bar","\\"bar\\""]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["static","return"]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["\\"bar\\""]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["return"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(5);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(3);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(8);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(24);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(60);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.008);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(3.333);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(148.139);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("<anon class-1>");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              2
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(2);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(2);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              2
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(4);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(4);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(1);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(8);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(8);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.003);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0.444);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(171);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("bar");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              1
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(1);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              1
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(1);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(2);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(2);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(0.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(2);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(1);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.001);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.056);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(0);
          });
        });

        describe("class expression w/ constructor + meta property:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              "const Foo = class { constructor() { new.target.name; } }"
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo","constructor","new","target","name"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","class","."]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe('["constructor","new","target","name"]');
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe('["."]');
          });

          test("class methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operands.identifiers
              )
            ).toBe('["new","target","name"]');
          });

          test("class methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].methods[0].halstead.operators.identifiers
              )
            ).toBe('["."]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(4);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(5);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(5);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(10);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(9);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2);
          });

          test("method has correct Halstead volume", () => {
            expect(report.aggregate.halstead.volume).toBe(31.699);
          });

          test("method has correct Halstead effort", () => {
            expect(report.aggregate.halstead.effort).toBe(63.399);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.aggregate.halstead.bugs).toBe(0.011);
          });

          test("method has correct Halstead time", () => {
            expect(report.aggregate.halstead.time).toBe(3.522);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(147.95);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });

          // classes ---

          test("class names are correct", () => {
            expect(report.classes[0].name).toBe("<anon class-1>");
            expect(report.classes[0].superClassName).not.toBeDefined();
          });

          test("class aggregate has correct logical lines of code", () => {
            expect(report.classes[0].aggregate.sloc.logical).toBe(2);
          });

          test("class aggregate has correct cyclomatic complexity", () => {
            expect(report.classes[0].aggregate.cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods.length).toBe(1);
          });

          test("class aggregate has correct Halstead total operators", () => {
            expect(report.classes[0].aggregate.halstead.operators.total).toBe(
              2
            );
          });

          test("class aggregate has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].aggregate.halstead.operators.distinct
            ).toBe(1);
          });

          test("class aggregate has correct Halstead total operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.total).toBe(4);
          });

          test("class aggregate has correct Halstead distinct operands", () => {
            expect(report.classes[0].aggregate.halstead.operands.distinct).toBe(
              4
            );
          });

          test("class aggregate has correct Halstead length", () => {
            expect(report.classes[0].aggregate.halstead.length).toBe(6);
          });

          test("class aggregate has correct Halstead vocabulary", () => {
            expect(report.classes[0].aggregate.halstead.vocabulary).toBe(5);
          });

          test("class aggregate has correct Halstead difficulty", () => {
            expect(report.classes[0].aggregate.halstead.difficulty).toBe(0.5);
          });

          test("class has correct Halstead volume", () => {
            expect(report.classes[0].aggregate.halstead.volume).toBe(13.932);
          });

          test("class has correct Halstead effort", () => {
            expect(report.classes[0].aggregate.halstead.effort).toBe(6.966);
          });

          test("class has correct Halstead bugs", () => {
            expect(report.classes[0].aggregate.halstead.bugs).toBe(0.005);
          });

          test("class has correct Halstead time", () => {
            expect(report.classes[0].aggregate.halstead.time).toBe(0.387);
          });

          test("class maintainability index is correct", () => {
            expect(report.classes[0].maintainability).toBe(165.496);
          });

          test("class aggregate has correct parameter count", () => {
            expect(report.classes[0].aggregate.paramCount).toBe(0);
          });

          // class methods ---

          test("class method names are correct", () => {
            expect(report.classes[0].methods[0].name).toBe("constructor");

            expect(
              JSON.stringify(report.classes[0].methods[0].paramNames)
            ).toBe("[]");
          });

          test("class methods has correct logical lines of code", () => {
            expect(report.classes[0].methods[0].sloc.logical).toBe(1);
          });

          test("class methods has correct cyclomatic complexity", () => {
            expect(report.classes[0].methods[0].cyclomatic).toBe(1);
          });

          test("class methods has correct length", () => {
            expect(report.classes[0].methods[0].nestedMethods.length).toBe(0);
          });

          test("class methods has correct Halstead total operators", () => {
            expect(report.classes[0].methods[0].halstead.operators.total).toBe(
              2
            );
          });

          test("class methods has correct Halstead distinct operators", () => {
            expect(
              report.classes[0].methods[0].halstead.operators.distinct
            ).toBe(1);
          });

          test("class methods has correct Halstead total operands", () => {
            expect(report.classes[0].methods[0].halstead.operands.total).toBe(
              3
            );
          });

          test("class methods has correct Halstead distinct operands", () => {
            expect(
              report.classes[0].methods[0].halstead.operands.distinct
            ).toBe(3);
          });

          test("class methods has correct Halstead length", () => {
            expect(report.classes[0].methods[0].halstead.length).toBe(5);
          });

          test("class methods has correct Halstead vocabulary", () => {
            expect(report.classes[0].methods[0].halstead.vocabulary).toBe(4);
          });

          test("class methods has correct Halstead difficulty", () => {
            expect(report.classes[0].methods[0].halstead.difficulty).toBe(0.5);
          });

          test("class methods has correct Halstead volume", () => {
            expect(report.classes[0].methods[0].halstead.volume).toBe(10);
          });

          test("class methods has correct Halstead effort", () => {
            expect(report.classes[0].methods[0].halstead.effort).toBe(5);
          });

          test("class methods has correct Halstead bugs", () => {
            expect(report.classes[0].methods[0].halstead.bugs).toBe(0.003);
          });

          test("class methods has correct Halstead time", () => {
            expect(report.classes[0].methods[0].halstead.time).toBe(0.278);
          });

          test("class methods has correct parameter count", () => {
            expect(report.classes[0].methods[0].paramCount).toBe(0);
          });
        });
      });

      describe("Modules / settings.esmImportExport = true (include as module Halstead data)", () => {
        describe("export all from import:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('export * from "module";', {
              esmImportExport: true,
            });
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["\\"module\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["export","*"]');
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(3);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(3);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(165.668);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export default class declaration:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("export default class Foo {}", {
              esmImportExport: true,
            });
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["export","default","class"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(2);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(4);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(4);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1.5);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(151.273);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export default function declaration:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'export default function foo () { return "bar"; }',
              { esmImportExport: true }
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["export","default","function","return"]');
          });

          test("module methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["\\"bar\\""]');
          });

          test("module methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["return"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("foo");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(6);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(6);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(2);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(2);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(0.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(2);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(1);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.001);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.056);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(155.056);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export named from import:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('export { foo, bar } from "module";', {
              esmImportExport: true,
            });
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","bar","\\"module\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["export","{}"]');
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(5);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(5);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(162.615);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export named function declaration:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'export function foo () { return "bar"; }',
              { esmImportExport: true }
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["export","{}","function","return"]');
          });

          test("module methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["\\"bar\\""]');
          });

          test("module methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["return"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("foo");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(6);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(6);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(2);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(2);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(0.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(2);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(1);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.001);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.056);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(155.056);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export default arrow function declaration:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const s_FOO = () => { return "bar"; }; export default s_FOO;',
              { esmImportExport: true }
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["s_FOO","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","function=>","return","export","default"]');
          });

          test("module methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["\\"bar\\""]');
          });

          test("module methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["return"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("<anon method-1>");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
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
            expect(report.aggregate.halstead.operators.total).toBe(6);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(6);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(2);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(9);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(4.5);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(2);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(2);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(0.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(2);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(1);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.001);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.056);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(145.726);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export named arrow function declaration:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const s_FOO = () => { return "bar"; }; export { s_FOO };',
              { esmImportExport: true }
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["s_FOO","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","function=>","return","export","{}"]');
          });

          test("module methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["\\"bar\\""]');
          });

          test("module methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["return"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("<anon method-1>");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
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
            expect(report.aggregate.halstead.operators.total).toBe(6);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(6);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(2);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(9);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(4.5);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(2);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(2);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(0.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(2);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(1);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.001);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.056);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(145.726);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export named arrow function declaration (aliased):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const s_FOO = () => { return "bar"; }; export { s_FOO as s_BAR };',
              { esmImportExport: true }
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["s_FOO","\\"bar\\"","s_BAR"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","function=>","return","export","{}","as"]');
          });

          test("module methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["\\"bar\\""]');
          });

          test("module methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["return"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("<anon method-1>");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
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
            expect(report.aggregate.halstead.operators.total).toBe(7);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(7);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(4);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(3);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(11);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(10);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(4.667);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(2);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(2);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(0.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(2);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(1);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.001);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.056);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(144.567);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("import default (1):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('import foo from "module";', {
              esmImportExport: true,
            });
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","\\"module\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["import","from"]');
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

          test("aggregate has correct dependency length", () => {
            expect(report.dependencies.length).toBe(1);
          });

          test("aggregate has correct dependency entry[0] line", () => {
            expect(report.dependencies[0].line).toBe(1);
          });

          test("aggregate has correct dependency entry[0] path", () => {
            expect(report.dependencies[0].path).toBe("module");
          });

          test("aggregate has correct dependency entry[0] type", () => {
            expect(report.dependencies[0].type).toBe("esm");
          });
        });

        describe("import default (3):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'import foo from "./foo.js";\nimport bar from "./bar.js";\nimport baz from "./baz.js";',
              { esmImportExport: true }
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe(
              '["foo","\\"./foo.js\\"","bar","\\"./bar.js\\"","baz","\\"./baz.js\\""]'
            );
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["import","from"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(6);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(2);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(6);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(6);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(12);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(8);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(140.947);
          });

          test("aggregate has correct dependency length", () => {
            expect(report.dependencies.length).toBe(3);
          });

          test("aggregate has correct dependency entry[0] line", () => {
            expect(report.dependencies[0].line).toBe(1);
          });

          test("aggregate has correct dependency entry[0] path", () => {
            expect(report.dependencies[0].path).toBe("./foo.js");
          });

          test("aggregate has correct dependency entry[0] type", () => {
            expect(report.dependencies[0].type).toBe("esm");
          });

          test("aggregate has correct dependency entry[1] line", () => {
            expect(report.dependencies[1].line).toBe(2);
          });

          test("aggregate has correct dependency entry[1] path", () => {
            expect(report.dependencies[1].path).toBe("./bar.js");
          });

          test("aggregate has correct dependency entry[1] type", () => {
            expect(report.dependencies[1].type).toBe("esm");
          });

          test("aggregate has correct dependency entry[2] line", () => {
            expect(report.dependencies[2].line).toBe(3);
          });

          test("aggregate has correct dependency entry[2] path", () => {
            expect(report.dependencies[2].path).toBe("./baz.js");
          });

          test("aggregate has correct dependency entry[2] type", () => {
            expect(report.dependencies[2].type).toBe("esm");
          });
        });

        describe("import named (1):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('import {baz} from "module";', {
              esmImportExport: true,
            });
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["baz","\\"module\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["import","from","{}"]');
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
            expect(report.aggregate.halstead.operands.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(2);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(6);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(5);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2.25);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(159.218);
          });

          test("aggregate has correct dependency length", () => {
            expect(report.dependencies.length).toBe(1);
          });

          test("aggregate has correct dependency entry[0] line", () => {
            expect(report.dependencies[0].line).toBe(1);
          });

          test("aggregate has correct dependency entry[0] path", () => {
            expect(report.dependencies[0].path).toBe("module");
          });

          test("aggregate has correct dependency entry[0] type", () => {
            expect(report.dependencies[0].type).toBe("esm");
          });
        });

        describe("import named as (1):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('import {foo as bar} from "module";', {
              esmImportExport: true,
            });
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            // Fails for esprima; see below.
            // assert.strictEqual(JSON.stringify(report.aggregate.halstead.operands.identifiers),
            //  '["foo","bar","\\"module\\""]');

            const identifiers = report.aggregate.halstead.operands.identifiers;

            // Must test individually as esprima `local` node comes before `imported`.
            expect(identifiers.length).toBe(3);
            expect(identifiers.indexOf("foo")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf("bar")).toBeGreaterThanOrEqual(0);
            expect(identifiers.indexOf('"module"')).toBeGreaterThanOrEqual(0);
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["import","from","{}","as"]');
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
            expect(report.aggregate.halstead.operators.total).toBe(4);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(4);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(3);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(7);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(7);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(158.444);
          });

          test("aggregate has correct dependency length", () => {
            expect(report.dependencies.length).toBe(1);
          });

          test("aggregate has correct dependency entry[0] line", () => {
            expect(report.dependencies[0].line).toBe(1);
          });

          test("aggregate has correct dependency entry[0] path", () => {
            expect(report.dependencies[0].path).toBe("module");
          });

          test("aggregate has correct dependency entry[0] type", () => {
            expect(report.dependencies[0].type).toBe("esm");
          });
        });

        describe("import namespace (1):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('import * as foo from "mod.js";', {
              esmImportExport: true,
            });
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","\\"mod.js\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["import","from","*","as"]');
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
            expect(report.aggregate.halstead.operators.total).toBe(5);
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(7);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(6);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(158.726);
          });

          test("aggregate has correct dependency length", () => {
            expect(report.dependencies.length).toBe(1);
          });

          test("aggregate has correct dependency entry[0] line", () => {
            expect(report.dependencies[0].line).toBe(1);
          });

          test("aggregate has correct dependency entry[0] path", () => {
            expect(report.dependencies[0].path).toBe("mod.js");
          });

          test("aggregate has correct dependency entry[0] type", () => {
            expect(report.dependencies[0].type).toBe("esm");
          });
        });

        describe("import mixed (4):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'import foo from "./foo.js";\nimport {bar} from "./bar.js";\n' +
                'import {bar as baz} from "./bar.js";\nimport * as bam from "./bam.js";',
              { esmImportExport: true }
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe(
              '["foo","\\"./foo.js\\"","bar","\\"./bar.js\\"","baz","bam","\\"./bam.js\\""]'
            );
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["import","from","{}","as","*"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(4);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(14);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(5);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(10);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(7);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(24);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(12);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(3.571);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(128.953);
          });

          test("aggregate has correct dependency length", () => {
            expect(report.dependencies.length).toBe(4);
          });

          test("aggregate has correct dependency entry[0] line", () => {
            expect(report.dependencies[0].line).toBe(1);
          });

          test("aggregate has correct dependency entry[0] path", () => {
            expect(report.dependencies[0].path).toBe("./foo.js");
          });

          test("aggregate has correct dependency entry[0] type", () => {
            expect(report.dependencies[0].type).toBe("esm");
          });

          test("aggregate has correct dependency entry[1] line", () => {
            expect(report.dependencies[1].line).toBe(2);
          });

          test("aggregate has correct dependency entry[1] path", () => {
            expect(report.dependencies[1].path).toBe("./bar.js");
          });

          test("aggregate has correct dependency entry[1] type", () => {
            expect(report.dependencies[1].type).toBe("esm");
          });

          test("aggregate has correct dependency entry[2] line", () => {
            expect(report.dependencies[2].line).toBe(3);
          });

          test("aggregate has correct dependency entry[2] path", () => {
            expect(report.dependencies[2].path).toBe("./bar.js");
          });

          test("aggregate has correct dependency entry[2] type", () => {
            expect(report.dependencies[2].type).toBe("esm");
          });

          test("aggregate has correct dependency entry[3] line", () => {
            expect(report.dependencies[3].line).toBe(4);
          });

          test("aggregate has correct dependency entry[3] path", () => {
            expect(report.dependencies[3].path).toBe("./bam.js");
          });

          test("aggregate has correct dependency entry[3] type", () => {
            expect(report.dependencies[3].type).toBe("esm");
          });
        });
      });

      describe("Modules / settings.esmImportExport = false (default, exclude as Halstead data)", () => {
        describe("export all from import:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('export * from "module";');
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(0);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(0);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(0);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(0);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(0);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(0);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export default class declaration:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze("export default class Foo {}");
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["Foo"]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["class"]');
          });

          test("class aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operands.identifiers
              )
            ).toBe("[]");
          });

          test("class aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(
                report.classes[0].aggregate.halstead.operators.identifiers
              )
            ).toBe("[]");
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
            expect(report.aggregate.halstead.operators.total).toBe(1);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(1);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(1);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(1);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(2);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(2);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(0.5);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export default function declaration:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'export default function foo () { return "bar"; }'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["function","return"]');
          });

          test("module methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["\\"bar\\""]');
          });

          test("module methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["return"]');
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

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("foo");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(4);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(4);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(2);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(2);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(0.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(2);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(1);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.001);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.056);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(166.259);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export named from import:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('export { foo, bar } from "module";');
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(0);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(0);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(0);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(0);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(0);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(0);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export named function declaration:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('export function foo () { return "bar"; }');
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["foo","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["function","return"]');
          });

          test("module methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["\\"bar\\""]');
          });

          test("module methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["return"]');
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

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("foo");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(4);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(4);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(1);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(2);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(2);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(0.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(2);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(1);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.001);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.056);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(166.259);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export default arrow function declaration:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const s_FOO = () => { return "bar"; }; export default s_FOO;'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["s_FOO","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","function=>","return"]');
          });

          test("module methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["\\"bar\\""]');
          });

          test("module methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["return"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("<anon method-1>");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
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
            expect(report.aggregate.halstead.operators.total).toBe(4);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(4);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(3);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(2);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(7);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(6);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(3);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(2);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(2);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(0.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(2);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(1);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.001);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.056);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(153.142);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export named arrow function declaration:", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const s_FOO = () => { return "bar"; }; export { s_FOO };'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["s_FOO","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","function=>","return"]');
          });

          test("module methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["\\"bar\\""]');
          });

          test("module methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["return"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("<anon method-1>");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(6);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(6);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(2);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(2);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(0.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(2);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(1);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.001);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.056);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(155.056);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("export named arrow function declaration (aliased):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'const s_FOO = () => { return "bar"; }; export { s_FOO as s_BAR };'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe('["s_FOO","\\"bar\\""]');
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe('["const","=","function=>","return"]');
          });

          test("module methods has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operands.identifiers)
            ).toBe('["\\"bar\\""]');
          });

          test("module methods has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.methods[0].halstead.operators.identifiers)
            ).toBe('["return"]');
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(3);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(2);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(1);
          });

          test("method names are correct", () => {
            expect(report.methods[0].name).toBe("<anon method-1>");
            expect(JSON.stringify(report.methods[0].paramNames)).toBe("[]");
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

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(6);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(6);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(2);
          });

          test("method has correct Halstead length", () => {
            expect(report.methods[0].halstead.length).toBe(2);
          });

          test("method has correct Halstead vocabulary", () => {
            expect(report.methods[0].halstead.vocabulary).toBe(2);
          });

          test("method has correct Halstead difficulty", () => {
            expect(report.methods[0].halstead.difficulty).toBe(0.5);
          });

          test("method has correct Halstead volume", () => {
            expect(report.methods[0].halstead.volume).toBe(2);
          });

          test("method has correct Halstead effort", () => {
            expect(report.methods[0].halstead.effort).toBe(1);
          });

          test("method has correct Halstead bugs", () => {
            expect(report.methods[0].halstead.bugs).toBe(0.001);
          });

          test("method has correct Halstead time", () => {
            expect(report.methods[0].halstead.time).toBe(0.056);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(155.056);
          });

          test("aggregate has correct parameter count", () => {
            expect(report.aggregate.paramCount).toBe(0);
          });
        });

        describe("import default (1):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('import foo from "module";');
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(0);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(0);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(0);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(0);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(0);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(0);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct dependency length", () => {
            expect(report.dependencies.length).toBe(1);
          });

          test("aggregate has correct dependency entry[0] line", () => {
            expect(report.dependencies[0].line).toBe(1);
          });

          test("aggregate has correct dependency entry[0] path", () => {
            expect(report.dependencies[0].path).toBe("module");
          });

          test("aggregate has correct dependency entry[0] type", () => {
            expect(report.dependencies[0].type).toBe("esm");
          });
        });

        describe("import default (3):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'import foo from "./foo.js";\nimport bar from "./bar.js";\nimport baz from "./baz.js";'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(0);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(0);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(0);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(0);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(0);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(0);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct dependency length", () => {
            expect(report.dependencies.length).toBe(3);
          });

          test("aggregate has correct dependency entry[0] line", () => {
            expect(report.dependencies[0].line).toBe(1);
          });

          test("aggregate has correct dependency entry[0] path", () => {
            expect(report.dependencies[0].path).toBe("./foo.js");
          });

          test("aggregate has correct dependency entry[0] type", () => {
            expect(report.dependencies[0].type).toBe("esm");
          });

          test("aggregate has correct dependency entry[1] line", () => {
            expect(report.dependencies[1].line).toBe(2);
          });

          test("aggregate has correct dependency entry[1] path", () => {
            expect(report.dependencies[1].path).toBe("./bar.js");
          });

          test("aggregate has correct dependency entry[1] type", () => {
            expect(report.dependencies[1].type).toBe("esm");
          });

          test("aggregate has correct dependency entry[2] line", () => {
            expect(report.dependencies[2].line).toBe(3);
          });

          test("aggregate has correct dependency entry[2] path", () => {
            expect(report.dependencies[2].path).toBe("./baz.js");
          });

          test("aggregate has correct dependency entry[2] type", () => {
            expect(report.dependencies[2].type).toBe("esm");
          });
        });

        describe("import named (1):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('import {baz} from "module";');
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(0);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(0);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(0);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(0);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(0);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(0);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct dependency length", () => {
            expect(report.dependencies.length).toBe(1);
          });

          test("aggregate has correct dependency entry[0] line", () => {
            expect(report.dependencies[0].line).toBe(1);
          });

          test("aggregate has correct dependency entry[0] path", () => {
            expect(report.dependencies[0].path).toBe("module");
          });

          test("aggregate has correct dependency entry[0] type", () => {
            expect(report.dependencies[0].type).toBe("esm");
          });
        });

        describe("import named as (1):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('import {foo as bar} from "module";');
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(0);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(0);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(0);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(0);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(0);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(0);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct dependency length", () => {
            expect(report.dependencies.length).toBe(1);
          });

          test("aggregate has correct dependency entry[0] line", () => {
            expect(report.dependencies[0].line).toBe(1);
          });

          test("aggregate has correct dependency entry[0] path", () => {
            expect(report.dependencies[0].path).toBe("module");
          });

          test("aggregate has correct dependency entry[0] type", () => {
            expect(report.dependencies[0].type).toBe("esm");
          });
        });

        describe("import namespace (1):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze('import * as foo from "mod.js";');
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(0);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(0);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(0);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(0);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(0);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(0);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct dependency length", () => {
            expect(report.dependencies.length).toBe(1);
          });

          test("aggregate has correct dependency entry[0] line", () => {
            expect(report.dependencies[0].line).toBe(1);
          });

          test("aggregate has correct dependency entry[0] path", () => {
            expect(report.dependencies[0].path).toBe("mod.js");
          });

          test("aggregate has correct dependency entry[0] type", () => {
            expect(report.dependencies[0].type).toBe("esm");
          });
        });

        describe("import mixed (4):", () => {
          let report;

          beforeEach(() => {
            report = parser.analyze(
              'import foo from "./foo.js";\nimport {bar} from "./bar.js";\n' +
                'import {bar as baz} from "./bar.js";\nimport * as bam from "./bam.js";'
            );
          });

          afterEach(() => {
            report = undefined;
          });

          test("aggregate has correct Halstead operand identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operands.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct Halstead operator identifiers", () => {
            expect(
              JSON.stringify(report.aggregate.halstead.operators.identifiers)
            ).toBe("[]");
          });

          test("aggregate has correct logical lines of code", () => {
            expect(report.aggregate.sloc.logical).toBe(0);
          });

          test("aggregate has correct cyclomatic complexity", () => {
            expect(report.aggregate.cyclomatic).toBe(1);
          });

          test("methods has correct length", () => {
            expect(report.methods.length).toBe(0);
          });

          test("aggregate has correct Halstead total operators", () => {
            expect(report.aggregate.halstead.operators.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operators", () => {
            expect(report.aggregate.halstead.operators.distinct).toBe(0);
          });

          test("aggregate has correct Halstead total operands", () => {
            expect(report.aggregate.halstead.operands.total).toBe(0);
          });

          test("aggregate has correct Halstead distinct operands", () => {
            expect(report.aggregate.halstead.operands.distinct).toBe(0);
          });

          test("aggregate has correct Halstead length", () => {
            expect(report.aggregate.halstead.length).toBe(0);
          });

          test("aggregate has correct Halstead vocabulary", () => {
            expect(report.aggregate.halstead.vocabulary).toBe(0);
          });

          test("aggregate has correct Halstead difficulty", () => {
            expect(report.aggregate.halstead.difficulty).toBe(0);
          });

          test("maintainability index is correct", () => {
            expect(report.maintainability).toBe(171);
          });

          test("aggregate has correct dependency length", () => {
            expect(report.dependencies.length).toBe(4);
          });

          test("aggregate has correct dependency entry[0] line", () => {
            expect(report.dependencies[0].line).toBe(1);
          });

          test("aggregate has correct dependency entry[0] path", () => {
            expect(report.dependencies[0].path).toBe("./foo.js");
          });

          test("aggregate has correct dependency entry[0] type", () => {
            expect(report.dependencies[0].type).toBe("esm");
          });

          test("aggregate has correct dependency entry[1] line", () => {
            expect(report.dependencies[1].line).toBe(2);
          });

          test("aggregate has correct dependency entry[1] path", () => {
            expect(report.dependencies[1].path).toBe("./bar.js");
          });

          test("aggregate has correct dependency entry[1] type", () => {
            expect(report.dependencies[1].type).toBe("esm");
          });

          test("aggregate has correct dependency entry[2] line", () => {
            expect(report.dependencies[2].line).toBe(3);
          });

          test("aggregate has correct dependency entry[2] path", () => {
            expect(report.dependencies[2].path).toBe("./bar.js");
          });

          test("aggregate has correct dependency entry[2] type", () => {
            expect(report.dependencies[2].type).toBe("esm");
          });

          test("aggregate has correct dependency entry[3] line", () => {
            expect(report.dependencies[3].line).toBe(4);
          });

          test("aggregate has correct dependency entry[3] path", () => {
            expect(report.dependencies[3].path).toBe("./bam.js");
          });

          test("aggregate has correct dependency entry[3] type", () => {
            expect(report.dependencies[3].type).toBe("esm");
          });
        });
      });
    });
  });
}
