import { suite, test, setup, teardown } from 'mocha';
import { assert }       from 'chai';

import HalsteadArray    from '../../../src/module/traits/HalsteadArray';
import Trait            from '../../../src/module/traits/Trait';
import TraitHalstead    from '../../../src/module/traits/TraitHalstead';

import TraitUtil        from '../../../src/module/traits/TraitUtil';

import actualize        from '../../../src/module/traits/actualize';

import * as testconfig  from '../testconfig';

if (testconfig.modules['moduleTraits'])
{
   suite('traits:', () =>
   {
      suite('actualize:', () =>
      {
         suite('string arguments:', () =>
         {
            let result;

            setup(() => { result = actualize('koda', 'basanda', 'bosoya', 'umahasha', 'tikki', 'ottobo', 'boshatta'); });
            teardown(() => { result = undefined; });

            test('result was object', () =>
            {
               assert.isObject(result);
            });

            test('lloc was correct', () =>
            {
               assert.instanceOf(result.lloc, Trait);
               assert.strictEqual(result.lloc.metric, 'lloc');
               assert.strictEqual(result.lloc.type, 'string');
               assert.strictEqual(result.lloc.valueOf(), 'koda');
            });

            test('cyclomatic was correct', () =>
            {
               assert.instanceOf(result.cyclomatic, Trait);
               assert.strictEqual(result.cyclomatic.metric, 'cyclomatic');
               assert.strictEqual(result.cyclomatic.type, 'string');
               assert.strictEqual(result.cyclomatic.valueOf(), 'basanda');
            });

            test('operators was correct', () =>
            {
               assert.instanceOf(result.operators, HalsteadArray);
               assert.strictEqual(result.operators.length, 1);
               assert.strictEqual(result.operators.metric, 'operators');
               assert.strictEqual(result.operators.type, 'object');
               assert.instanceOf(result.operators.get(0), TraitHalstead);
               assert.strictEqual(result.operators.get(0).type, 'object');
               assert.strictEqual(result.operators.get(0).valueOf(), 'bosoya');
               assert.strictEqual(result.operators.get(0).filter(), true);
            });

            test('operands was correct', () =>
            {
               assert.instanceOf(result.operands, HalsteadArray);
               assert.strictEqual(result.operands.length, 1);
               assert.strictEqual(result.operands.metric, 'operands');
               assert.strictEqual(result.operands.type, 'object');
               assert.instanceOf(result.operands.get(0), TraitHalstead);
               assert.strictEqual(result.operands.get(0).type, 'object');
               assert.strictEqual(result.operands.get(0).valueOf(), 'umahasha');
               assert.strictEqual(result.operands.get(0).filter(), true);
            });

            test('ignoreKeys was correct', () =>
            {
               assert.instanceOf(result.ignoreKeys, Trait);
               assert.strictEqual(result.ignoreKeys.metric, 'ignoreKeys');
               assert.strictEqual(result.ignoreKeys.type, 'object');
               assert.isArray(result.ignoreKeys.valueOf());
               assert.lengthOf(result.ignoreKeys.valueOf(), 1);
               assert.strictEqual(result.ignoreKeys.valueOf()[0], 'tikki');
            });

            test('newScope was correct', () =>
            {
               assert.instanceOf(result.newScope, Trait);
               assert.strictEqual(result.newScope.metric, 'newScope');
               assert.strictEqual(result.newScope.type, 'string');
               assert.strictEqual(result.newScope.valueOf(), 'ottobo');
            });

            test('dependencies was correct', () =>
            {
               assert.instanceOf(result.dependencies, Trait);
               assert.strictEqual(result.dependencies.metric, 'dependencies');
               assert.strictEqual(result.dependencies.type, 'string');
               assert.strictEqual(result.dependencies.valueOf(), 'boshatta');
            });
         });

         suite('array arguments:', () =>
         {
            let result;

            setup(() => { result = actualize('1', '2', ['3'], ['4'], ['5'], '6', '7'); });
            teardown(() => { result = undefined; });

            test('lloc was correct', () =>
            {
               assert.strictEqual(result.lloc.valueOf(), '1');
            });

            test('cyclomatic was correct', () =>
            {
               assert.strictEqual(result.cyclomatic.valueOf(), '2');
            });

            test('ignoreKeys was correct', () =>
            {
               assert.isArray(result.ignoreKeys.valueOf());
               assert.lengthOf(result.ignoreKeys.valueOf(), 1);
               assert.strictEqual(result.ignoreKeys.valueOf()[0], '5');
            });

            test('newScope was correct', () =>
            {
               assert.strictEqual(result.newScope.valueOf(), '6');
            });

            test('dependencies was correct', () =>
            {
               assert.strictEqual(result.dependencies.valueOf(), '7');
            });
         });

         suite('no arguments:', () =>
         {
            let result;

            setup(() => { result = actualize(); });

            teardown(() => { result = undefined; });

            test('ignoreKeys was correct', () =>
            {
               assert.isArray(result.ignoreKeys.valueOf());
               assert.lengthOf(result.ignoreKeys.valueOf(), 0);
            });
         });
      });

      suite('TraitUtil:', () =>
      {
         suite('safeName:', () =>
         {
            test('result with no parameters return `<anonymous>`', () =>
            {
               const result = TraitUtil.safeName();
               assert.strictEqual(result, '<anonymous>');
            });

            test('result with null data and default value', () =>
            {
               const result = TraitUtil.safeName(null, 'default');
               assert.strictEqual(result, 'default');
            });

            test('result with `object.name`', () =>
            {
               const result = TraitUtil.safeName({ name: 'safe!' }, 'default');
               assert.strictEqual(result, 'safe!');
            });
         });
      });

      suite('HalsteadArray:', () =>
      {
         suite('no identifiers:', () =>
         {
            let result;

            setup(() => { result = new HalsteadArray('operators', []); });
            teardown(() => { result = undefined; });

            test('result was empty', () =>
            {
               assert.strictEqual(result.length, 0);
            });

            test('result metric is correct', () =>
            {
               assert.strictEqual(result.metric, 'operators');
            });
         });

         suite('one identifier:', () =>
         {
            let result;

            setup(() => { result = new HalsteadArray('operators', ['foo']); });
            teardown(() => { result = undefined; });

            test('result contained one item', () =>
            {
               assert.strictEqual(result.length, 1);
            });

            test('result forEach', () =>
            {
               result.forEach((traitHalstead) => { assert.strictEqual(traitHalstead.valueOf(), 'foo'); });
            });

            test('first item was correct', () =>
            {
               assert.instanceOf(result.get(0), TraitHalstead);
               assert.strictEqual(result.get(0).valueOf('unused'), 'foo');
            });
         });

         suite('two identifiers:', () =>
         {
            let result;

            setup(() => { result = new HalsteadArray('operators', ['bar', 'baz']); });
            teardown(() => { result = undefined; });

            test('result contained two items', () =>
            {
               assert.strictEqual(result.length, 2);
            });

            test('first item was correct', () =>
            {
               assert.instanceOf(result.get(0), TraitHalstead);
               assert.strictEqual(result.get(0).metric, 'operators');
               assert.strictEqual(result.get(0).valueOf(), 'bar');
            });

            suite('filter and array entries are correct:', () =>
            {
               test('contains correct operator identifiers', () =>
               {
                  // Note the 3rd identifier has a filter method to skip processing.
                  const halsteadArray = new HalsteadArray('operators',
                   ['foo', 'bar', ['baz', 'biz'], { identifier: 'ignored', filter: () => { return false; } }]);

                  const values = halsteadArray.valueOf('unused');

                  assert.lengthOf(values, 4);
                  assert.strictEqual(values[0], 'foo');
                  assert.strictEqual(values[1], 'bar');
                  assert.strictEqual(values[2], 'baz');
                  assert.strictEqual(values[3], 'biz');
               });
            });

            test('second item was correct', () =>
            {
               assert.instanceOf(result.get(1), TraitHalstead);
               assert.strictEqual(result.get(1).metric, 'operators');
               assert.strictEqual(result.get(1).valueOf(), 'baz');
            });
         });

         suite('multiple identifiers / raw TraitHalstead function data (undefined data posts warning!):', () =>
         {
            let result;

            setup(() =>
            {
               result = new HalsteadArray('operators',
                [() => { return null; }, () => { return 222; }, 'foo', () => { return [undefined, true]; }]);
            });

            teardown(() => { result = undefined; });

            test('result contained two items', () =>
            {
               assert.strictEqual(result.length, 4);
            });

            test('1st item was correct', () =>
            {
               assert.instanceOf(result.get(0), TraitHalstead);
               assert.strictEqual(result.get(0).metric, 'operators');
               assert.strictEqual(result.get(0).valueOf(), null);
            });

            test('2nd item was correct', () =>
            {
               assert.instanceOf(result.get(1), TraitHalstead);
               assert.strictEqual(result.get(1).metric, 'operators');
               assert.strictEqual(result.get(1).valueOf(), 222);
            });

            test('3rd item was correct', () =>
            {
               assert.instanceOf(result.get(2), TraitHalstead);
               assert.strictEqual(result.get(2).metric, 'operators');
               assert.strictEqual(result.get(2).valueOf(), 'foo');
            });

            test('4th item was correct', () =>
            {
               assert.instanceOf(result.get(3), TraitHalstead);
               assert.strictEqual(result.get(3).metric, 'operators');
               assert.isArray(result.get(3).valueOf());
               assert.strictEqual(result.get(3).valueOf()[0], undefined);
               assert.strictEqual(result.get(3).valueOf()[1], true);
            });

            test('HalsteadArray valueOf converts raw data to strings', () =>
            {
               const halsteadItems = result.valueOf();

               assert.isArray(halsteadItems);
               assert.lengthOf(halsteadItems, 5);
               assert.strictEqual(halsteadItems[0], 'null');
               assert.strictEqual(halsteadItems[1], '222');
               assert.strictEqual(halsteadItems[2], 'foo');
               assert.strictEqual(halsteadItems[3], 'undefined');
               assert.strictEqual(halsteadItems[4], 'true');
            });
         });

         suite('valueOf:', () =>
         {
            test('HalsteadArray valueOf contains correct operator identifiers', () =>
            {
               // Note the 3rd identifier has a filter method to skip processing.
               const halsteadArray = new HalsteadArray('operators',
                ['foo', 'bar', ['baz', 'biz'], { identifier: 'ignored', filter: () => { return false; } }]);

               const result = halsteadArray.valueOf('unused');

               assert.lengthOf(result, 4);
               assert.strictEqual(result[0], 'foo');
               assert.strictEqual(result[1], 'bar');
               assert.strictEqual(result[2], 'baz');
               assert.strictEqual(result[3], 'biz');
            });

            test('HalsteadArray valueOf contains correct operator identifiers w/ function values as strings', () =>
            {
               // Note the 3rd identifier has a filter method to skip processing.
               const halsteadArray = new HalsteadArray('operators',
                ['foo', 'bar', ['baz', 'biz'], () => { return null; }, () => { return [111, 222]; }]);

               const result = halsteadArray.valueOf();

               assert.lengthOf(result, 7);
               assert.strictEqual(result[0], 'foo');
               assert.strictEqual(result[1], 'bar');
               assert.strictEqual(result[2], 'baz');
               assert.strictEqual(result[3], 'biz');
               assert.strictEqual(result[4], 'null');
               assert.strictEqual(result[5], '111');
               assert.strictEqual(result[6], '222');
            });
         });
      });

      suite('Trait:', () =>
      {
         suite('with function / params:', () =>
         {
            let result;

            setup(() => { result = new Trait('a trait', (value) => { return value; }); });
            teardown(() => { result = undefined; });

            test('result with function / params is correct', () =>
            {
               assert.strictEqual(result.valueOf('foobar'), 'foobar');
            });
         });
      });
   });
}