import { test, describe, expect } from "vitest";

import { analyse } from "../src/index";

describe("Basic Test", () => {
  test("the test runner should run tests", () => {
    expect(true).toBe(true);
  });

  test("calling analyse has the expected output", () => {
    expect(analyse("const x=5;")).toEqual({
      aggregate: {
        aggregate: undefined,
        cyclomatic: 1,
        cyclomaticDensity: 100,
        halstead: {
          bugs: 0.003,
          difficulty: 1,
          effort: 8,
          length: 4,
          operands: {
            distinct: 2,
            identifiers: ["x", "5"],
            total: 2,
          },
          operators: {
            distinct: 2,
            identifiers: ["const", "="],
            total: 2,
          },
          time: 0.444,
          vocabulary: 4,
          volume: 8,
        },
        paramCount: 0,
        sloc: {
          logical: 1,
          physical: 1,
        },
      },
      aggregateAverage: {
        cyclomatic: 1,
        cyclomaticDensity: 100,
        halstead: {
          bugs: 0.003,
          difficulty: 1,
          effort: 8,
          length: 4,
          operands: {
            distinct: 2,
            total: 2,
          },
          operators: {
            distinct: 2,
            total: 2,
          },
          time: 0.444,
          vocabulary: 4,
          volume: 8,
        },
        paramCount: 0,
        sloc: {
          logical: 1,
          physical: 1,
        },
      },
      classes: [],
      dependencies: [],
      errors: [],
      filePath: undefined,
      lineEnd: 1,
      lineStart: 1,
      maintainability: 163.888,
      methodAverage: {
        cyclomatic: 0,
        cyclomaticDensity: 0,
        halstead: {
          bugs: 0,
          difficulty: 0,
          effort: 0,
          length: 0,
          operands: {
            distinct: 0,
            total: 0,
          },
          operators: {
            distinct: 0,
            total: 0,
          },
          time: 0,
          vocabulary: 0,
          volume: 0,
        },
        paramCount: 0,
        sloc: {
          logical: 0,
          physical: 0,
        },
      },
      methods: [],
      settings: {
        commonjs: false,
        dependencyResolver: undefined,
        esmImportExport: {
          halstead: false,
          lloc: false,
        },
        forin: false,
        logicalor: true,
        newmi: false,
        switchcase: true,
        templateExpression: {
          halstead: true,
          lloc: true,
        },
        trycatch: false,
      },
      srcPath: undefined,
      srcPathAlias: undefined,
    });
  });
});
