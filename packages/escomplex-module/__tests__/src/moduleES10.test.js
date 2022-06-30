import parsers from "./parsers";
import * as testconfig from "./testconfig";

if (testconfig.modules["moduleES10"]) {
  parsers.forEach((parser) => {
    if (parser.name !== "babelParser") {
      return;
    }

    describe(`(${parser.name}): module (ES10):`, () => {
      // https://github.com/tc39/proposal-Symbol-description
      describe("Symbol.prototype.description", () => {
        beforeEach(() => {
          parser.analyze('Symbol("desc").description');
        });

        test("parses!", () => {});
      });

      // https://github.com/tc39/proposal-optional-catch-binding
      describe("Optional catch binding", () => {
        beforeEach(() => {
          parser.analyze("try {} catch {}");
        });

        test("parses!", () => {});
      });
    });
  });
}
