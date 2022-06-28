import { suite, test } from 'mocha';
import { assert }       from 'chai';

import StringUtil       from '../../../src/utils/StringUtil';

import * as testconfig  from '../testconfig';

const s_TEST_OBJECT = { lineStart: 1, lineEnd: 2, sloc: { params: 3 } };

const s_TEST_CONFIRM = 'Line start: 1\n\nLine end: 2\nParameter count: 3\n';

if (testconfig.modules['utilString'])
{
   suite('utils:', () =>
   {
      suite('StringUtil', () =>
      {
         suite('compare:', () =>
         {
            test('basic test', () =>
            {
               assert.strictEqual(-1, StringUtil.compare('./a/a.js', './b/b.js'));
               assert.strictEqual(0, StringUtil.compare('./a/a.js', './a/a.js'));
               assert.strictEqual(1, StringUtil.compare('./b/a.js', './a/b.js'));
            });
         });

         suite('incrementIndent:', () =>
         {
            test('basic test', () =>
            {
               assert.strictEqual(3, StringUtil.incrementIndent(0));
               assert.strictEqual(6, StringUtil.incrementIndent(3));
               assert.strictEqual(8, StringUtil.incrementIndent(6, 2));
            });
         });

         suite('indent:', () =>
         {
            test('basic test', () =>
            {
               assert.strictEqual('   TEST', StringUtil.indent(3, 'TEST'));
            });
         });

         suite('safeStringObject:', () =>
         {
            test('output is correct', () =>
            {
               const output =
               [
                  StringUtil.safeStringObject('Line start: ',        s_TEST_OBJECT, 'lineStart', 2),
                  StringUtil.safeStringObject('Line end: ',          s_TEST_OBJECT, 'lineEnd'),
                  StringUtil.safeStringObject('Physical LOC: ',      s_TEST_OBJECT, 'sloc.physical'),
                  StringUtil.safeStringObject('Logical LOC: ',       s_TEST_OBJECT, 'sloc.logical'),
                  StringUtil.safeStringObject('Parameter count: ',   s_TEST_OBJECT, 'sloc.params')
               ].join('');

               assert.strictEqual(output, s_TEST_CONFIRM);
            });
         });

         suite('safeStringsObject:', () =>
         {
            test('output is correct (individual entries)', () =>
            {
               const output = StringUtil.safeStringsObject(s_TEST_OBJECT,
                  new StringUtil.SafeEntry('Line start: ',        'lineStart', 2),
                  new StringUtil.SafeEntry('Line end: ',          'lineEnd'),
                  new StringUtil.SafeEntry('Physical LOC: ',      'sloc.physical'),
                  new StringUtil.SafeEntry('Logical LOC: ',       'sloc.logical'),
                  new StringUtil.SafeEntry('Parameter count: ',   'sloc.params')
               );

               assert.strictEqual(output, s_TEST_CONFIRM);
            });

            test('output is correct (spread array of entries)', () =>
            {
               const output = StringUtil.safeStringsObject(s_TEST_OBJECT, ...[
                  new StringUtil.SafeEntry('Line start: ',        'lineStart', 2),
                  new StringUtil.SafeEntry('Line end: ',          'lineEnd'),
                  new StringUtil.SafeEntry('Physical LOC: ',      'sloc.physical'),
                  new StringUtil.SafeEntry('Logical LOC: ',       'sloc.logical'),
                  new StringUtil.SafeEntry('Parameter count: ',   'sloc.params')
               ]);

               assert.strictEqual(output, s_TEST_CONFIRM);
            });
         });
      });
   });
}

