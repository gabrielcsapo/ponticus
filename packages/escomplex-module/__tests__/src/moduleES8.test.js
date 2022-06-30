import parsers from "./parsers";
import * as testconfig from "./testconfig";

if (testconfig.modules["moduleES8"]) {
  parsers.forEach((parser) => {
    describe(`(${parser.name}): module (ES8):`, () => {
      // https://github.com/tc39/ecmascript-asyncawait
      describe("Async functions", () => {
        beforeEach(() => {
          parser.analyze("async function foo() { await bar(); }");
        });

        test("parses!", () => {});
      });

      // https://github.com/tc39/proposal-trailing-function-commas
      describe("Trailing commas in function parameter lists and calls", () => {
        beforeEach(() => {
          parser.analyze("function foo(a, b, c,) {} foo(1, 2, 3,);");
        });

        test("parses!", () => {});
      });

      // https://github.com/tc39/proposal-object-getownpropertydescriptors
      describe("Object.getOwnPropertyDescriptors", () => {
        beforeEach(() => {
          parser.analyze("Object.getOwnPropertyDescriptors(object);");
        });

        test("parses!", () => {});
      });

      // https://github.com/tc39/proposal-string-pad-start-end
      describe("String padding", () => {
        beforeEach(() => {
          parser.analyze('"foo".padEnd(4, "12"); "bar".padStart(4, "12");');
        });

        test("parses!", () => {});
      });

      // https://github.com/tc39/proposal-object-values-entries
      describe("Object.values/Object.entries", () => {
        beforeEach(() => {
          parser.analyze("Object.values(object); Object.entries(object);");
        });

        test("parses!", () => {});
      });
    });
  });
}
