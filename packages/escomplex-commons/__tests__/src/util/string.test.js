import { test, describe, expect } from "vitest";

import StringUtil from "../../../src/utils/StringUtil";

import * as testconfig from "../testconfig";

const s_TEST_OBJECT = { lineStart: 1, lineEnd: 2, sloc: { params: 3 } };

const s_TEST_CONFIRM = "Line start: 1\n\nLine end: 2\nParameter count: 3\n";

if (testconfig.modules["utilString"]) {
  describe("utils:", () => {
    describe("StringUtil", () => {
      describe("compare:", () => {
        test("basic test", () => {
          expect(-1).toBe(StringUtil.compare("./a/a.js", "./b/b.js"));
          expect(0).toBe(StringUtil.compare("./a/a.js", "./a/a.js"));
          expect(1).toBe(StringUtil.compare("./b/a.js", "./a/b.js"));
        });
      });

      describe("incrementIndent:", () => {
        test("basic test", () => {
          expect(3).toBe(StringUtil.incrementIndent(0));
          expect(6).toBe(StringUtil.incrementIndent(3));
          expect(8).toBe(StringUtil.incrementIndent(6, 2));
        });
      });

      describe("indent:", () => {
        test("basic test", () => {
          expect("   TEST").toBe(StringUtil.indent(3, "TEST"));
        });
      });

      describe("safeStringObject:", () => {
        test("output is correct", () => {
          const output = [
            StringUtil.safeStringObject(
              "Line start: ",
              s_TEST_OBJECT,
              "lineStart",
              2
            ),
            StringUtil.safeStringObject("Line end: ", s_TEST_OBJECT, "lineEnd"),
            StringUtil.safeStringObject(
              "Physical LOC: ",
              s_TEST_OBJECT,
              "sloc.physical"
            ),
            StringUtil.safeStringObject(
              "Logical LOC: ",
              s_TEST_OBJECT,
              "sloc.logical"
            ),
            StringUtil.safeStringObject(
              "Parameter count: ",
              s_TEST_OBJECT,
              "sloc.params"
            ),
          ].join("");

          expect(output).toBe(s_TEST_CONFIRM);
        });
      });

      describe("safeStringsObject:", () => {
        test("output is correct (individual entries)", () => {
          const output = StringUtil.safeStringsObject(
            s_TEST_OBJECT,
            new StringUtil.SafeEntry("Line start: ", "lineStart", 2),
            new StringUtil.SafeEntry("Line end: ", "lineEnd"),
            new StringUtil.SafeEntry("Physical LOC: ", "sloc.physical"),
            new StringUtil.SafeEntry("Logical LOC: ", "sloc.logical"),
            new StringUtil.SafeEntry("Parameter count: ", "sloc.params")
          );

          expect(output).toBe(s_TEST_CONFIRM);
        });

        test("output is correct (spread array of entries)", () => {
          const output = StringUtil.safeStringsObject(
            s_TEST_OBJECT,
            ...[
              new StringUtil.SafeEntry("Line start: ", "lineStart", 2),
              new StringUtil.SafeEntry("Line end: ", "lineEnd"),
              new StringUtil.SafeEntry("Physical LOC: ", "sloc.physical"),
              new StringUtil.SafeEntry("Logical LOC: ", "sloc.logical"),
              new StringUtil.SafeEntry("Parameter count: ", "sloc.params"),
            ]
          );

          expect(output).toBe(s_TEST_CONFIRM);
        });
      });
    });
  });
}
