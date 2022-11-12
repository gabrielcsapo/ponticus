import { test, describe, expect } from "vitest";

import MathUtil from "../../../src/utils/MathUtil";

import * as testconfig from "../testconfig";

if (testconfig.modules["utilMath"]) {
  describe("utils:", () => {
    describe("StringUtil", () => {
      describe("compactMatrix:", () => {
        test("matrix is compacted", () => {
          // Identity matrix.
          let matrix = MathUtil.create2DArray(4, 0);
          matrix[0][0] = 1;
          matrix[1][1] = 1;
          matrix[2][2] = 1;
          matrix[3][3] = 1;

          let testString =
            '[{"row":0,"cols":[0]},{"row":1,"cols":[1]},{"row":2,"cols":[2]},{"row":3,"cols":[3]}]';

          expect(JSON.stringify(MathUtil.compactMatrix(matrix))).toBe(
            testString
          );

          // Matrix with no column entries for row (3).
          matrix = MathUtil.create2DArray(4, 0);
          matrix[0][0] = 1;
          matrix[0][2] = 1;
          matrix[1][1] = 1;
          matrix[1][3] = 1;
          matrix[2][0] = 1;
          matrix[2][1] = 1;
          matrix[2][2] = 1;
          matrix[2][3] = 1;

          testString =
            '[{"row":0,"cols":[0,2]},{"row":1,"cols":[1,3]},{"row":2,"cols":[0,1,2,3]}]';

          expect(JSON.stringify(MathUtil.compactMatrix(matrix))).toBe(
            testString
          );

          // Large sparse matrix with few row / column entries.
          matrix = MathUtil.create2DArray(1024, 0);
          matrix[1][1] = 1;
          matrix[1][3] = 1;
          matrix[120][0] = 1;
          matrix[350][22] = 1;
          matrix[350][230] = 1;
          matrix[350][330] = 1;
          matrix[600][45] = 1;
          matrix[1023][320] = 1;

          testString =
            '[{"row":1,"cols":[1,3]},{"row":120,"cols":[0]},{"row":350,"cols":[22,230,330]},' +
            '{"row":600,"cols":[45]},{"row":1023,"cols":[320]}]';

          expect(JSON.stringify(MathUtil.compactMatrix(matrix))).toBe(
            testString
          );
        });
      });

      describe("getMedian:", () => {
        test("median is returned", () => {
          expect(MathUtil.getMedian([100, 20, 80, 60, 50])).toBe(60);
          expect(MathUtil.getMedian([100, 20, 80, 60, 50, 120])).toBe(70);
        });
      });

      describe("getPercent:", () => {
        test("percent is returned", () => {
          expect(MathUtil.getPercent(0.2, 1)).toBe(20);
          expect(MathUtil.getPercent(100, 1000)).toBe(10);
        });
      });

      describe("toFixed:", () => {
        test("correct float rounding", () => {
          expect(MathUtil.toFixed(0.1545839578)).toBe(0.155);

          expect(MathUtil.toFixed(0.15)).toBe(0.15);
          expect(MathUtil.toFixed(0.1)).toBe(0.1);

          expect(MathUtil.toFixed(20.1545839578)).toBe(20.155);
          expect(MathUtil.toFixed(20.1544392842)).toBe(20.154);
        });

        test("pass-through of non-float data", () => {
          expect(MathUtil.toFixed(20)).toBe(20);
          expect(MathUtil.toFixed("test")).toBe("test");
          expect(MathUtil.toFixed(true)).toBe(true);
        });

        test("correct JSON stringify results", () => {
          const testString = '{"data":20.155,"data2":{"data3":20.154}}';

          const result = JSON.stringify(
            { data: 20.1545839578, data2: { data3: 20.1544392842 } },
            (key, val) => {
              return MathUtil.toFixed(val);
            }
          );

          expect(result).toBe(testString);
        });
      });
    });
  });
}
