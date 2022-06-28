import { suite, test } from 'mocha';
import { assert }       from 'chai';

import MathUtil         from '../../../src/utils/MathUtil';

import * as testconfig  from '../testconfig';

if (testconfig.modules['utilMath'])
{
   suite('utils:', () =>
   {
      suite('StringUtil', () =>
      {
         suite('compactMatrix:', () =>
         {
            test('matrix is compacted', () =>
            {
               // Identity matrix.
               let matrix = MathUtil.create2DArray(4, 0);
               matrix[0][0] = 1;
               matrix[1][1] = 1;
               matrix[2][2] = 1;
               matrix[3][3] = 1;

               let testString = '[{"row":0,"cols":[0]},{"row":1,"cols":[1]},{"row":2,"cols":[2]},{"row":3,"cols":[3]}]';

               assert.strictEqual(JSON.stringify(MathUtil.compactMatrix(matrix)), testString);

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

               testString = '[{"row":0,"cols":[0,2]},{"row":1,"cols":[1,3]},{"row":2,"cols":[0,1,2,3]}]';

               assert.strictEqual(JSON.stringify(MathUtil.compactMatrix(matrix)), testString);

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

               testString = '[{"row":1,"cols":[1,3]},{"row":120,"cols":[0]},{"row":350,"cols":[22,230,330]},'
                + '{"row":600,"cols":[45]},{"row":1023,"cols":[320]}]';

               assert.strictEqual(JSON.stringify(MathUtil.compactMatrix(matrix)), testString);
            });
         });

         suite('getMedian:', () =>
         {
            test('median is returned', () =>
            {
               assert.strictEqual(MathUtil.getMedian([100, 20, 80, 60, 50]), 60);
               assert.strictEqual(MathUtil.getMedian([100, 20, 80, 60, 50, 120]), 70);
            });
         });

         suite('getPercent:', () =>
         {
            test('percent is returned', () =>
            {
               assert.strictEqual(MathUtil.getPercent(.2, 1), 20);
               assert.strictEqual(MathUtil.getPercent(100, 1000), 10);
            });
         });

         suite('toFixed:', () =>
         {
            test('correct float rounding', () =>
            {
               assert.strictEqual(MathUtil.toFixed(.1545839578), .155);

               assert.strictEqual(MathUtil.toFixed(.15), .15);
               assert.strictEqual(MathUtil.toFixed(.1), .1);

               assert.strictEqual(MathUtil.toFixed(20.1545839578), 20.155);
               assert.strictEqual(MathUtil.toFixed(20.1544392842), 20.154);
            });

            test('pass-through of non-float data', () =>
            {
               assert.strictEqual(MathUtil.toFixed(20), 20);
               assert.strictEqual(MathUtil.toFixed('test'), 'test');
               assert.strictEqual(MathUtil.toFixed(true), true);
            });

            test('correct JSON stringify results', () =>
            {
               const testString = '{"data":20.155,"data2":{"data3":20.154}}';

               const result = JSON.stringify({ data: 20.1545839578, data2: { data3: 20.1544392842 } }, (key, val) =>
               {
                  return MathUtil.toFixed(val);
               });

               assert.strictEqual(result, testString);
            });
         });
      });
   });
}