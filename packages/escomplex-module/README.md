# @ponticus/escomplex-module

Provides module / individual file oriented AST processing for typhonjs-escomplex complexity reports. The following JS AST generators are supported / tested: [babel parser](https://www.npmjs.com/package/@babel/parser), [babylon](https://www.npmjs.com/package/babylon), Any compliant JS parser that supports Babylon or ESTree AST should work as well.

More information forthcoming. This NPM module can be installed as a dependency in `package.json` as follows:

```json
"dependencies": {
  "@ponticus/escomplex-module": "^0.1.0"
}
```

An example follows:

```js
import escomplexModule from "@ponticus/escomplex-module";

const ast = "<some parsed AST>";

const report = escomplexModule.analyze(ast);
```
