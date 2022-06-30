import { test, describe, expect } from "vitest";

import MethodAverage from "../../../src/module/report/averages/MethodAverage";
import ObjectUtil from "../../../src/utils/ObjectUtil";

import * as testconfig from "../testconfig";

const s_TEST_OBJECT = new MethodAverage();

const s_TEST_CONFIRM =
  '["cyclomatic","cyclomaticDensity","halstead.bugs","halstead.difficulty","halstead.effort","halstead.length","halstead.time","halstead.vocabulary","halstead.volume","halstead.operands.distinct","halstead.operands.total","halstead.operators.distinct","halstead.operators.total","paramCount","sloc.logical","sloc.physical"]';

if (testconfig.modules["utilObject"]) {
  describe("utils:", () => {
    describe("ObjectUtil", () => {
      describe("getAccessorList:", () => {
        test("MethodAverage accessors correct", () => {
          const result = ObjectUtil.getAccessorList(s_TEST_OBJECT);

          expect(JSON.stringify(result)).toBe(s_TEST_CONFIRM);
        });
      });

      describe("safeEqual:", () => {
        test("safeEqual matches", () => {
          const source = { severity: "info", test: { severity: "info" } };
          const targetTrue = {
            severity: "info",
            test: { severity: "info" },
            value: 123,
          };

          expect(ObjectUtil.safeEqual(source, targetTrue)).toBe(true);
        });

        test("safeEqual does not match", () => {
          const source = { severity: "info", test: { severity: "info" } };
          const targetFalse = {
            severity: "info",
            test: { severity: "error" },
            value: 123,
          };

          expect(ObjectUtil.safeEqual(source, targetFalse)).toBe(false);
        });
      });
    });
  });
}
