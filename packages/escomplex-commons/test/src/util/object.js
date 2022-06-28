import { assert }       from 'chai';

import MethodAverage    from '../../../src/module/report/averages/MethodAverage';
import ObjectUtil       from '../../../src/utils/ObjectUtil';

import * as testconfig  from '../testconfig';

const s_TEST_OBJECT = new MethodAverage();

const s_TEST_CONFIRM = '["cyclomatic","cyclomaticDensity","halstead.bugs","halstead.difficulty","halstead.effort","halstead.length","halstead.time","halstead.vocabulary","halstead.volume","halstead.operands.distinct","halstead.operands.total","halstead.operators.distinct","halstead.operators.total","paramCount","sloc.logical","sloc.physical"]';

if (testconfig.modules['utilObject'])
{
   suite('utils:', () =>
   {
      suite('ObjectUtil', () =>
      {
         suite('getAccessorList:', () =>
         {
            test('MethodAverage accessors correct', () =>
            {
               const result = ObjectUtil.getAccessorList(s_TEST_OBJECT);

               assert.strictEqual(JSON.stringify(result), s_TEST_CONFIRM);
            });
         });

         suite('safeEqual:', () =>
         {
            test('safeEqual matches', () =>
            {
               const source = { severity: 'info', test: { severity: 'info' } };
               const targetTrue = { severity: 'info', test: { severity: 'info' }, value: 123 };

               assert.strictEqual(ObjectUtil.safeEqual(source, targetTrue), true);
            });

            test('safeEqual does not match', () =>
            {
               const source = { severity: 'info', test: { severity: 'info' } };
               const targetFalse = { severity: 'info', test: { severity: 'error' }, value: 123 };

               assert.strictEqual(ObjectUtil.safeEqual(source, targetFalse), false);
            });
         });
      });
   });
}

