import { test, describe, expect } from "vitest";

import BabelParser from "../../src/BabelParser";

describe("babel-parser:", () => {
  describe("BabelParser:", () => {
    test("parse function is exported", () => {
      expect(typeof BabelParser.parse).toBe("function");
    });

    test("parse - ES6", () => {
      const ast = BabelParser.parse(
        "export default class Foo { constructor() { } }"
      );
      expect(typeof ast).toBe("object");
      expect(ast.type).toBe("File");
    });

    test("parse - Typescript", () => {
      const ast = BabelParser.parse(
        "function fooGood<T extends { x: number }>(obj: T): T { console.log(Math.abs(obj.x)); return obj; }"
      );
      expect(typeof ast).toBe("object");
      expect(ast.type).toBe("File");
    });

    test("parse - Decorator before export throws", () => {
      expect(() => {
        BabelParser.parse("@decorator export class MyClass {}");
      }).toThrow();
    });

    test("parse - Decorator before export with override", () => {
      const ast = BabelParser.parse(
        "@decorator export class MyClass {}",
        void 0,
        { decoratorsBeforeExport: true }
      );
      expect(typeof ast).toBe("object");
      expect(ast.type).toBe("File");
    });

    test("parse - No decorators legacy override", () => {
      expect(() => {
        BabelParser.parse(
          "class MyClass { @getDecorators().methods[name] foo() {} }"
        );
      }).toThrow();
    });

    test("parse - Decorators legacy override", () => {
      const ast = BabelParser.parse(
        "class MyClass { @getDecorators().methods[name] foo() {} }",
        void 0,
        { decoratorsLegacy: true }
      );
      expect(typeof ast).toBe("object");
      expect(ast.type).toBe("File");
    });

    test("parse - No flow override", () => {
      expect(() => {
        BabelParser.parse(
          "function fooGood<T: { x: number }>(obj: T): T { console.log(Math.abs(obj.x)); return obj; }"
        );
      }).toThrow();
    });

    test("parse - Flow override", () => {
      const ast = BabelParser.parse(
        "function fooGood<T: { x: number }>(obj: T): T { console.log(Math.abs(obj.x)); return obj; }",
        void 0,
        { flow: true }
      );
      expect(typeof ast).toBe("object");
      expect(ast.type).toBe("File");
    });
  });
});
