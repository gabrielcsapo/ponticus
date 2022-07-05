# @ponticus/escomplex

`@ponticus/escomplex` provides next generation Javascript and Typescript complexity reports by utilizing [babel parser](https://www.npmjs.com/package/@babel/parser) w/ all plugins enabled to parse JS / TS source code feeding the rest of the AST / processing modules which are available separately. Please review the [typhonjs-node-escomplex](https://github.com/typhonjs-node-escomplex) organization for all of the separate components which may be used independently if direct AST processing is required. `typhonjs-escomplex` simply provides a shim using `babel parser` to produce the AST.

Work is swiftly being finished.

More information forthcoming. This NPM module can be installed as a dependency in `package.json` as follows:

```json
"dependencies": {
  "@ponticus/escomplex": "^0.1.0"
}
```


An example follows:

```js
import escomplex from '@ponticus/escomplex';

const source = "<some JS source code>";

const report = escomplex.analyzeModule(source);
```