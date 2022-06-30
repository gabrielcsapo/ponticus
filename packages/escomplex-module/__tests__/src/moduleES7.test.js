import { test, describe, beforeEach } from "vitest";

import parsers from "./parsers";
import * as testconfig from "./testconfig";

if (testconfig.modules["moduleES7"]) {
  parsers.forEach((parser) => {
    describe(`(${parser.name}): module (ES7):`, () => {
      // https://github.com/tc39/Array.prototype.includes
      describe("Array.prototype.includes", () => {
        beforeEach(() => {
          parser.analyze("const array = []; array.includes(123);");
        });

        test("parses!", () => {});
      });

      // https://github.com/rwaldron/exponentiation-operator
      describe("Exponentiation operator", () => {
        beforeEach(() => {
          parser.analyze("let squared = 2 ** 2; let a = 2; a **= 2;");
        });

        test("parses!", () => {});
      });
    });
  });
}
