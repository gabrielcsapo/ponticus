# @ponticus/escomplex-project

Provides project oriented AST processing for typhonjs-escomplex complexity reports. The following JS AST generators are supported / tested: [acorn](https://www.npmjs.com/package/acorn), [babel parser](https://www.npmjs.com/package/@babel/parser), [babylon](https://www.npmjs.com/package/babylon), [espree](https://www.npmjs.com/package/espree), [esprima](https://www.npmjs.com/package/esprima). Any compliant JS parser that supports Babylon or ESTree AST should work as well.

More information forthcoming. This NPM module can be installed as a dependency in `package.json` as follows:

```json
"dependencies": {
  "@ponticus/escomplex-project": "^0.1.0"
}
```

An example follows:

```js
import escomplexProject from '@ponticus/escomplex-project';

const modules = [
   { ast: "<some parsed AST>", srcPath: 'a/file/path/1' },
   { ast: "<some parsed AST>", srcPath: 'a/file/path/2' }
];

const results = escomplexProject.analyze(modules);
```