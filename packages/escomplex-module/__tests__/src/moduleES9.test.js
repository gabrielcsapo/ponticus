import { test, describe, expect, beforeEach, afterEach } from "vitest";

import parsers from "./parsers";
import * as testconfig from "./testconfig";

/**
 * Pending further testing:
 * - Lifting template literal restriction
 */
if (testconfig.modules["moduleES9"]) {
  parsers.forEach((parser) => {
    if (parser.name !== "babylon" && parser.name !== "babelParser") {
      return;
    }

    describe(`(${parser.name}): module (ES9):`, () => {
      // https://github.com/tc39/proposal-async-iteration
      // Only including for-await-of for parsing
      describe("Asynchronous Iteration", () => {
        beforeEach(() => {
          parser.analyze(
            'async function f() { for await (const x of createAsyncIterable(["a", "b"])) {} }'
          );
        });

        test("parses!", () => {});
      });

      // https://github.com/tc39/proposal-promise-finally
      describe("Promise.prototype.finally", () => {
        beforeEach(() => {
          parser.analyze("Promise.resolve(2).finally(() => {})");
        });

        test("parses!", () => {});
      });

      // https://github.com/tc39/proposal-regexp-unicode-property-escapes
      describe("RegExp Unicode Property Escapes", () => {
        beforeEach(() => {
          parser.analyze(
            'const regexGreekSymbol = /p{Script=Greek}/u; regexGreekSymbol.test("π");'
          );
        });

        test("parses!", () => {});
      });

      // https://github.com/tc39/proposal-regexp-lookbehind
      describe("RegExp Lookbehind Assertions", () => {
        beforeEach(() => {
          parser.analyze(
            'const RE_DOLLAR_PREFIX = /(?<=$)foo/g; "$foo %foo foo".replace(RE_DOLLAR_PREFIX, "bar");'
          );
        });

        test("parses!", () => {});
      });

      // https://github.com/tc39/proposal-regexp-lookbehind
      describe("RegExp Lookbehind Assertions", () => {
        beforeEach(() => {
          parser.analyze(
            'const RE_DOLLAR_PREFIX = /(?<=$)foo/g; "$foo %foo foo".replace(RE_DOLLAR_PREFIX, "bar");'
          );
        });

        test("parses!", () => {});
      });

      // https://github.com/tc39/proposal-regexp-named-groups
      describe("RegExp named capture groups", () => {
        beforeEach(() => {
          parser.analyze(
            'let re = /(?<year>d{4})-(?<month>d{2})-(?<day>d{2})/u; let result = re.exec("2015-01-02");'
          );
        });

        test("parses!", () => {});
      });

      // https://github.com/tc39/proposal-regexp-named-groups
      describe("RegExp named capture groups", () => {
        beforeEach(() => {
          parser.analyze(
            'let re = /(?<year>d{4})-(?<month>d{2})-(?<day>d{2})/u; let result = re.exec("2015-01-02");'
          );
        });

        test("parses!", () => {});
      });

      // https://github.com/tc39/proposal-regexp-dotall-flag
      describe("s (dotAll) flag for regular expressions", () => {
        beforeEach(() => {
          parser.analyze("const re = /foo.bar/s;");
        });

        test("parses!", () => {});
      });

      // TODO verify parsing soon. Appears to fail.
      // https://github.com/tc39/proposal-template-literal-revision
      // suite('Lifting template literal restriction', () =>
      // {
      //    setup(() =>
      //    {
      //       parser.analyze('tagFunc`\unicode`;');
      //    });
      //
      //    test('parses!', () => {});
      // });

      describe("Rest/Spread - object pattern function", () => {
        beforeEach(() => {
          parser.analyze("function foo({ name, ...others }) { }");
        });

        test("parses!", () => {});
      });

      // https://github.com/tc39/proposal-object-rest-spread
      describe("Rest/Spread Properties", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            "let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };"
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(7);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(1);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(9);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(5);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(13);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(9);
        });

        test("aggregate has correct Halstead length", () => {
          expect(report.aggregate.halstead.length).toBe(22);
        });

        test("aggregate has correct Halstead vocabulary", () => {
          expect(report.aggregate.halstead.vocabulary).toBe(14);
        });

        test("aggregate has correct Halstead difficulty", () => {
          expect(report.aggregate.halstead.difficulty).toBe(3.611);
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(119.941);
        });

        test("aggregate has correct parameter count", () => {
          expect(report.aggregate.paramCount).toBe(0);
        });
      });

      // https://github.com/tc39/proposal-object-rest-spread
      describe("Rest/Spread Properties (abbreviated React example):", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            "function expectTree(rootID, expectedTree, parentPath) {\n" +
              "    var childIDs = [];\n" +
              '    var path = "TEST";\n' +
              "    if (expectedTree.children !== undefined) {\n" +
              "        for (var i = 0; i < childIDs.length; i++) {\n" +
              "           expectTree(\n" +
              "               childIDs[i],\n" +
              "               { parentID: rootID, ...expectedTree.children[i] },\n" +
              "               path,\n" +
              "           );\n" +
              "        }\n" +
              "    }\n" +
              "}\n"
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(7);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(4);
        });

        test("functions has correct length", () => {
          expect(report.methods.length).toBe(1);
        });

        test("method has correct name", () => {
          expect(report.methods[0].name).toBe("expectTree");
        });

        test("method has correct physical lines of code", () => {
          expect(report.methods[0].sloc.physical).toBe(13);
        });

        test("method has correct logical lines of code", () => {
          expect(report.methods[0].sloc.logical).toBe(6);
        });

        test("method has correct cyclomatic complexity", () => {
          expect(report.methods[0].cyclomatic).toBe(3);
        });

        test("method has correct parameter count", () => {
          expect(report.methods[0].paramCount).toBe(3);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(22);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(14);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(25);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(13);
        });

        test("aggregate has correct Halstead length", () => {
          expect(report.aggregate.halstead.length).toBe(47);
        });

        test("aggregate has correct Halstead vocabulary", () => {
          expect(report.aggregate.halstead.vocabulary).toBe(27);
        });

        test("aggregate has correct Halstead difficulty", () => {
          expect(report.aggregate.halstead.difficulty).toBe(13.462);
        });

        test("method has correct Halstead length", () => {
          expect(report.methods[0].halstead.length).toBe(42);
        });

        test("method has correct Halstead vocabulary", () => {
          expect(report.methods[0].halstead.vocabulary).toBe(25);
        });

        test("method has correct Halstead difficulty", () => {
          expect(report.methods[0].halstead.difficulty).toBe(11.375);
        });

        test("method has correct Halstead volume", () => {
          expect(report.methods[0].halstead.volume).toBe(195.042);
        });

        test("method has correct Halstead effort", () => {
          expect(report.methods[0].halstead.effort).toBe(2218.602);
        });

        test("method has correct Halstead bugs", () => {
          expect(report.methods[0].halstead.bugs).toBe(0.065);
        });

        test("method has correct Halstead time", () => {
          expect(report.methods[0].halstead.time).toBe(123.256);
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(124.991);
        });

        test("aggregate has correct parameter count", () => {
          expect(report.aggregate.paramCount).toBe(3);
        });
      });
    });
  });
}
