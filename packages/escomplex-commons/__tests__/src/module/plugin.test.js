import { test, describe, expect } from "vitest";

import AbstractSyntaxLoader from "../../../src/module/plugin/syntax/AbstractSyntaxLoader";

import * as testconfig from "../testconfig";

/**
 *  Parent
 */
class Parent extends AbstractSyntaxLoader {
  ParentOne() {
    return {};
  }
  ParentTwo() {
    return {};
  }
}

/**
 * Child
 */
class Child extends Parent {
  onConfigure() {
    return {};
  } // This is ignored by AbstractSyntaxLoader.
  ChildThree() {
    return {};
  }
  ChildFour() {
    return {};
  }
}

if (testconfig.modules["modulePlugin"]) {
  describe("plugin:", () => {
    /**
     * Verifies that AbstractSyntaxLoader can find all child / parent inheritance methods
     */
    describe("syntax (AbstractSyntaxLoader):", () => {
      const instance = new Child();

      test("verify child / parent syntax loading", () => {
        const event = { data: { settings: {}, syntaxes: {} } };
        instance.onLoadSyntax(event);

        expect(event.data.syntaxes["onConfigure"]).not.toBeDefined();

        expect(typeof event.data.syntaxes["ChildThree"]).toBe("object");
        expect(typeof event.data.syntaxes["ChildFour"]).toBe("object");
        expect(typeof event.data.syntaxes["ParentOne"]).toBe("object");
        expect(typeof event.data.syntaxes["ParentTwo"]).toBe("object");
      });
    });
  });
}
