import { assert }             from 'chai';

import AbstractSyntaxLoader   from '../../../src/module/plugin/syntax/AbstractSyntaxLoader';

import * as testconfig        from '../testconfig';

/**
 *  Parent
 */
class Parent extends AbstractSyntaxLoader
{
   /**
    * @returns {{}}
    * @constructor
    */
   ParentOne() { return {}; }

   /**
    * @returns {{}}
    * @constructor
    */
   ParentTwo() { return {}; }
}

/**
 * Child
 */
class Child extends Parent
{
   /**
    * @returns {{}}
    */
   onConfigure() { return {}; } // This is ignored by AbstractSyntaxLoader.

   /**
    * @returns {{}}
    * @constructor
    */
   ChildThree() { return {}; }

   /**
    * @returns {{}}
    * @constructor
    */
   ChildFour() { return {}; }
}

if (testconfig.modules['modulePlugin'])
{
   suite('plugin:', () =>
   {
      /**
       * Verifies that AbstractSyntaxLoader can find all child / parent inheritance methods
       */
      suite('syntax (AbstractSyntaxLoader):', () =>
      {
         const instance = new Child();

         test('verify child / parent syntax loading', () =>
         {
            const event = { data: { settings: {}, syntaxes: {} } };
            instance.onLoadSyntax(event);

            assert.isUndefined(event.data.syntaxes['onConfigure']);

            assert.isObject(event.data.syntaxes['ChildThree']);
            assert.isObject(event.data.syntaxes['ChildFour']);
            assert.isObject(event.data.syntaxes['ParentOne']);
            assert.isObject(event.data.syntaxes['ParentTwo']);
         });
      });
   });
}