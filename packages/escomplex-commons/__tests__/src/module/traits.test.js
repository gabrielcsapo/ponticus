import { test, describe, expect, beforeEach, afterEach } from "vitest";

import HalsteadArray from "../../../src/module/traits/HalsteadArray";
import Trait from "../../../src/module/traits/Trait";
import TraitHalstead from "../../../src/module/traits/TraitHalstead";

import TraitUtil from "../../../src/module/traits/TraitUtil";

import actualize from "../../../src/module/traits/actualize";

import * as testconfig from "../testconfig";

if (testconfig.modules["moduleTraits"]) {
  describe("traits:", () => {
    describe("actualize:", () => {
      describe("string arguments:", () => {
        let result;

        beforeEach(() => {
          result = actualize(
            "koda",
            "basanda",
            "bosoya",
            "umahasha",
            "tikki",
            "ottobo",
            "boshatta"
          );
        });
        afterEach(() => {
          result = undefined;
        });

        test("result was object", () => {
          expect(typeof result).toBe("object");
        });

        test("lloc was correct", () => {
          expect(result.lloc).toBeInstanceOf(Trait);
          expect(result.lloc.metric).toBe("lloc");
          expect(result.lloc.type).toBe("string");
          expect(result.lloc.valueOf()).toBe("koda");
        });

        test("cyclomatic was correct", () => {
          expect(result.cyclomatic).toBeInstanceOf(Trait);
          expect(result.cyclomatic.metric).toBe("cyclomatic");
          expect(result.cyclomatic.type).toBe("string");
          expect(result.cyclomatic.valueOf()).toBe("basanda");
        });

        test("operators was correct", () => {
          expect(result.operators).toBeInstanceOf(HalsteadArray);
          expect(result.operators.length).toBe(1);
          expect(result.operators.metric).toBe("operators");
          expect(result.operators.type).toBe("object");
          expect(result.operators.get(0)).toBeInstanceOf(TraitHalstead);
          expect(result.operators.get(0).type).toBe("object");
          expect(result.operators.get(0).valueOf()).toBe("bosoya");
          expect(result.operators.get(0).filter()).toBe(true);
        });

        test("operands was correct", () => {
          expect(result.operands).toBeInstanceOf(HalsteadArray);
          expect(result.operands.length).toBe(1);
          expect(result.operands.metric).toBe("operands");
          expect(result.operands.type).toBe("object");
          expect(result.operands.get(0)).toBeInstanceOf(TraitHalstead);
          expect(result.operands.get(0).type).toBe("object");
          expect(result.operands.get(0).valueOf()).toBe("umahasha");
          expect(result.operands.get(0).filter()).toBe(true);
        });

        test("ignoreKeys was correct", () => {
          expect(result.ignoreKeys).toBeInstanceOf(Trait);
          expect(result.ignoreKeys.metric).toBe("ignoreKeys");
          expect(result.ignoreKeys.type).toBe("object");
          expect(Array.isArray(result.ignoreKeys.valueOf())).toBe(true);
          expect(result.ignoreKeys.valueOf().length).toBe(1);
          expect(result.ignoreKeys.valueOf()[0]).toBe("tikki");
        });

        test("newScope was correct", () => {
          expect(result.newScope).toBeInstanceOf(Trait);
          expect(result.newScope.metric).toBe("newScope");
          expect(result.newScope.type).toBe("string");
          expect(result.newScope.valueOf()).toBe("ottobo");
        });

        test("dependencies was correct", () => {
          expect(result.dependencies).toBeInstanceOf(Trait);
          expect(result.dependencies.metric).toBe("dependencies");
          expect(result.dependencies.type).toBe("string");
          expect(result.dependencies.valueOf()).toBe("boshatta");
        });
      });

      describe("array arguments:", () => {
        let result;

        beforeEach(() => {
          result = actualize("1", "2", ["3"], ["4"], ["5"], "6", "7");
        });
        afterEach(() => {
          result = undefined;
        });

        test("lloc was correct", () => {
          expect(result.lloc.valueOf()).toBe("1");
        });

        test("cyclomatic was correct", () => {
          expect(result.cyclomatic.valueOf()).toBe("2");
        });

        test("ignoreKeys was correct", () => {
          expect(Array.isArray(result.ignoreKeys.valueOf())).toBe(true);
          expect(result.ignoreKeys.valueOf().length).toBe(1);
          expect(result.ignoreKeys.valueOf()[0]).toBe("5");
        });

        test("newScope was correct", () => {
          expect(result.newScope.valueOf()).toBe("6");
        });

        test("dependencies was correct", () => {
          expect(result.dependencies.valueOf()).toBe("7");
        });
      });

      describe("no arguments:", () => {
        let result;

        beforeEach(() => {
          result = actualize();
        });

        afterEach(() => {
          result = undefined;
        });

        test("ignoreKeys was correct", () => {
          expect(Array.isArray(result.ignoreKeys.valueOf())).toBe(true);
          expect(result.ignoreKeys.valueOf().length).toBe(0);
        });
      });
    });

    describe("TraitUtil:", () => {
      describe("safeName:", () => {
        test("result with no parameters return `<anonymous>`", () => {
          const result = TraitUtil.safeName();
          expect(result).toBe("<anonymous>");
        });

        test("result with null data and default value", () => {
          const result = TraitUtil.safeName(null, "default");
          expect(result).toBe("default");
        });

        test("result with `object.name`", () => {
          const result = TraitUtil.safeName({ name: "safe!" }, "default");
          expect(result).toBe("safe!");
        });
      });
    });

    describe("HalsteadArray:", () => {
      describe("no identifiers:", () => {
        let result;

        beforeEach(() => {
          result = new HalsteadArray("operators", []);
        });
        afterEach(() => {
          result = undefined;
        });

        test("result was empty", () => {
          expect(result.length).toBe(0);
        });

        test("result metric is correct", () => {
          expect(result.metric).toBe("operators");
        });
      });

      describe("one identifier:", () => {
        let result;

        beforeEach(() => {
          result = new HalsteadArray("operators", ["foo"]);
        });
        afterEach(() => {
          result = undefined;
        });

        test("result contained one item", () => {
          expect(result.length).toBe(1);
        });

        test("result forEach", () => {
          result.forEach((traitHalstead) => {
            expect(traitHalstead.valueOf()).toBe("foo");
          });
        });

        test("first item was correct", () => {
          expect(result.get(0)).toBeInstanceOf(TraitHalstead);
          expect(result.get(0).valueOf("unused")).toBe("foo");
        });
      });

      describe("two identifiers:", () => {
        let result;

        beforeEach(() => {
          result = new HalsteadArray("operators", ["bar", "baz"]);
        });
        afterEach(() => {
          result = undefined;
        });

        test("result contained two items", () => {
          expect(result.length).toBe(2);
        });

        test("first item was correct", () => {
          expect(result.get(0)).toBeInstanceOf(TraitHalstead);
          expect(result.get(0).metric).toBe("operators");
          expect(result.get(0).valueOf()).toBe("bar");
        });

        describe("filter and array entries are correct:", () => {
          test("contains correct operator identifiers", () => {
            // Note the 3rd identifier has a filter method to skip processing.
            const halsteadArray = new HalsteadArray("operators", [
              "foo",
              "bar",
              ["baz", "biz"],
              {
                identifier: "ignored",
                filter: () => {
                  return false;
                },
              },
            ]);

            const values = halsteadArray.valueOf("unused");

            expect(values.length).toBe(4);
            expect(values[0]).toBe("foo");
            expect(values[1]).toBe("bar");
            expect(values[2]).toBe("baz");
            expect(values[3]).toBe("biz");
          });
        });

        test("second item was correct", () => {
          expect(result.get(1)).toBeInstanceOf(TraitHalstead);
          expect(result.get(1).metric).toBe("operators");
          expect(result.get(1).valueOf()).toBe("baz");
        });
      });

      describe("multiple identifiers / raw TraitHalstead function data (undefined data posts warning!):", () => {
        let result;

        beforeEach(() => {
          result = new HalsteadArray("operators", [
            () => {
              return null;
            },
            () => {
              return 222;
            },
            "foo",
            () => {
              return [undefined, true];
            },
          ]);
        });

        afterEach(() => {
          result = undefined;
        });

        test("result contained two items", () => {
          expect(result.length).toBe(4);
        });

        test("1st item was correct", () => {
          expect(result.get(0)).toBeInstanceOf(TraitHalstead);
          expect(result.get(0).metric).toBe("operators");
          expect(result.get(0).valueOf()).toBe(null);
        });

        test("2nd item was correct", () => {
          expect(result.get(1)).toBeInstanceOf(TraitHalstead);
          expect(result.get(1).metric).toBe("operators");
          expect(result.get(1).valueOf()).toBe(222);
        });

        test("3rd item was correct", () => {
          expect(result.get(2)).toBeInstanceOf(TraitHalstead);
          expect(result.get(2).metric).toBe("operators");
          expect(result.get(2).valueOf()).toBe("foo");
        });

        test("4th item was correct", () => {
          expect(result.get(3)).toBeInstanceOf(TraitHalstead);
          expect(result.get(3).metric).toBe("operators");
          expect(Array.isArray(result.get(3).valueOf())).toBe(true);
          expect(result.get(3).valueOf()[0]).toBe(undefined);
          expect(result.get(3).valueOf()[1]).toBe(true);
        });

        test("HalsteadArray valueOf converts raw data to strings", () => {
          const halsteadItems = result.valueOf();

          expect(Array.isArray(halsteadItems)).toBe(true);
          expect(halsteadItems.length).toBe(5);
          expect(halsteadItems[0]).toBe("null");
          expect(halsteadItems[1]).toBe("222");
          expect(halsteadItems[2]).toBe("foo");
          expect(halsteadItems[3]).toBe("undefined");
          expect(halsteadItems[4]).toBe("true");
        });
      });

      describe("valueOf:", () => {
        test("HalsteadArray valueOf contains correct operator identifiers", () => {
          // Note the 3rd identifier has a filter method to skip processing.
          const halsteadArray = new HalsteadArray("operators", [
            "foo",
            "bar",
            ["baz", "biz"],
            {
              identifier: "ignored",
              filter: () => {
                return false;
              },
            },
          ]);

          const result = halsteadArray.valueOf("unused");

          expect(result.length).toBe(4);
          expect(result[0]).toBe("foo");
          expect(result[1]).toBe("bar");
          expect(result[2]).toBe("baz");
          expect(result[3]).toBe("biz");
        });

        test("HalsteadArray valueOf contains correct operator identifiers w/ function values as strings", () => {
          // Note the 3rd identifier has a filter method to skip processing.
          const halsteadArray = new HalsteadArray("operators", [
            "foo",
            "bar",
            ["baz", "biz"],
            () => {
              return null;
            },
            () => {
              return [111, 222];
            },
          ]);

          const result = halsteadArray.valueOf();

          expect(result.length).toBe(7);
          expect(result[0]).toBe("foo");
          expect(result[1]).toBe("bar");
          expect(result[2]).toBe("baz");
          expect(result[3]).toBe("biz");
          expect(result[4]).toBe("null");
          expect(result[5]).toBe("111");
          expect(result[6]).toBe("222");
        });
      });
    });

    describe("Trait:", () => {
      describe("with function / params:", () => {
        let result;

        beforeEach(() => {
          result = new Trait("a trait", (value) => {
            return value;
          });
        });
        afterEach(() => {
          result = undefined;
        });

        test("result with function / params is correct", () => {
          expect(result.valueOf("foobar")).toBe("foobar");
        });
      });
    });
  });
}
