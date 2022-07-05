# @ponticus/babel-parser

Provides a front end for Javascript / Typescript AST generation by Babel parser with TyphonJS plugin support. By default all Babel parser plugins are enabled except for `flow` and there is a handy override mechanism to change relevant defaults without having to provide a full set of options to the parser. 

This NPM module can be installed as a dependency in `package.json` as follows:

```json
"dependencies": {
  "@ponticus/babel-parser": "^0.2.0"
}
```

Please see [Babel Parser Docs](https://babeljs.io/docs/en/babel-parser) for specific plugin information. By default `babel-parser` enables all plugins except for `flow` as it is incompatible with the `typescript` plugin. Also by default the `decorators` plugins is enabled and not compatible with `decorators-legacy`. 

The default Babel parser options is as follows:

```js
const s_DEFAULT_BABELPARSER_OPTIONS =
{
   plugins: ['asyncGenerators', 'bigInt', 'classProperties', 'classPrivateProperties', 'classPrivateMethods',
    ['decorators', { decoratorsBeforeExport: false }], 'doExpressions', 'dynamicImport',
     'exportDefaultFrom', 'exportNamespaceFrom',  'functionBind', 'functionSent', 'importMeta',
      'jsx', 'logicalAssignment', 'nullishCoalescingOperator', 'numericSeparator', 'objectRestSpread',
       'optionalCatchBinding', 'optionalChaining', ['pipelineOperator', { proposal: 'minimal' }], 'throwExpressions',
        'typescript']
};
```

There is a way to provide additional override directives to `babel-parser` which modifies the default babel parser options above. This only activates when no manual parser options are provided. A third parameter can be passed into `parse` which will modify the default parameters above. For example Flow is supported by passing in `{ flow: true }` as the override object. This allows flow to be enabled and typescript to be disabled without providing the full babel parser options manually. A few other optional overrides are available:

```json
{
   decoratorsBeforeExport: <boolean>,   // Sets the associated configuration value
   decoratorsLegacy: true,              // Removes the proposal decorators plugin for `decorators-legacy`
   flow: true,                          // Enables flow / disables typescript plugins
   pipelineOperatorProposal: <string>   // Sets the proposal field of pipelineOperator plugin
}
```


An example follows:

```js
import BabelParser from '@ponticus/babel-parser';

// Basic usage to parse text / source code with default options.
const ast = BabelParser.parse(`<some JS or Typescript source code>`);

// Providing custom options
const parserOptions = { plugins: [<any parser options desired to be enabled>] };
const ast = BabelParser.parse(`<some JS or Typescript source code>`, parserOptions);

// Basic usage with default options, but with an override to disable Typescript and enable Flow plugins
const ast = BabelParser.parse(`<some JS w/ Flow typing>`, void 0, { flow: true });
```

`@ponticus/babel-parser` may be loaded as a TyphonJS plugin with [@ponticus/plugin-manager](https://www.npmjs.com/package/@ponticus/plugin-manager) and if an eventbus is associated the following event categories are registered:

`typhonjs:babel:parser:parse` - invokes `BabelParser.parse`
