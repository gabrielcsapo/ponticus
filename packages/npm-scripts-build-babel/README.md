![typhonjs-npm-scripts-build-babel](https://i.imgur.com/g6jTz6E.png)

[![NPM](https://img.shields.io/npm/v/typhonjs-npm-scripts-build-babel.svg?label=npm)](https://www.npmjs.com/package/typhonjs-npm-scripts-build-babel)
[![Code Style](https://img.shields.io/badge/code%20style-allman-yellowgreen.svg?style=flat)](https://en.wikipedia.org/wiki/Indent_style#Allman_style)
[![License](https://img.shields.io/badge/license-MPLv2-yellowgreen.svg?style=flat)](https://github.com/typhonjs-node-npm-scripts/typhonjs-npm-scripts-build-babel/blob/master/LICENSE)
[![Gitter](https://img.shields.io/gitter/room/typhonjs/TyphonJS.svg)](https://gitter.im/typhonjs/TyphonJS)

[![Build Status](https://travis-ci.org/typhonjs-node-npm-scripts/typhonjs-npm-scripts-build-babel.svg?branch=master)](https://travis-ci.org/typhonjs-node-npm-scripts/typhonjs-npm-scripts-build-babel)
[![Dependency Status](https://www.versioneye.com/user/projects/56e5a006df573d00472cd43c/badge.svg?style=flat)](https://www.versioneye.com/user/projects/56e5a006df573d00472cd43c)

Requirements: Node v5+ / NPM 3+

Provides NPM scripts for building ES6 projects using Babel for all TyphonJS NPM modules and beyond.

This NPM module uses entries defined in the `build.babel` entry located in `.npmscriptrc` or `.npmscriptrc.js` in the 
root path of a project. An optional argument may be supplied to change the entry from `build.babel` to `<custom>.babel`.

In addition the following Babel modules are installed that are handy for ES6+ development:
- [babel-eslint](https://www.npmjs.com/package/babel-eslint)
- [babel-plugin-add-module-exports](https://www.npmjs.com/package/babel-plugin-add-module-exports)
- [babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver)
- [babel-plugin-transform-export-extensions](https://www.npmjs.com/package/babel-plugin-transform-export-extensions)
- [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime)
- [babel-preset-env](https://www.npmjs.com/package/babel-preset-env)
- [babel-preset-stage-2](https://www.npmjs.com/package/babel-preset-stage-2)

Breaking changes: 
- `0.7.0` - babel-preset-latest was swapped out for babel-preset-env. To fix you babel config simply switch `latest` for `env` and see [http://babeljs.io/docs/plugins/preset-env/](http://babeljs.io/docs/plugins/preset-env/) for more info. 

For the latest significant changes please see the [CHANGELOG](https://github.com/typhonjs-node-npm-scripts/typhonjs-npm-scripts-build-babel/blob/master/CHANGELOG.md).

For a comprehensive ES6 build / testing / publishing NPM module please see [typhonjs-npm-build-test](https://www.npmjs.com/package/typhonjs-npm-build-test) as it combines this module along with transpiling ES6 sources with Babel, pre-publish script detection, ESDoc dependencies, testing with Mocha / Istanbul and an Istanbul instrumentation hook for JSPM / SystemJS tests. For a full listing of all TyphonJS NPM script modules available please see [typhonjs-node-npm-scripts](https://github.com/typhonjs-node-npm-scripts) organization on GitHub.

------

To configure the build script provide this entry in `package.json` scripts entry:

```
  "devDependencies": {
    "typhonjs-npm-scripts-build-babel": "^0.7.0"
  },
  "scripts": {
    "build": "babel-node ./node_modules/typhonjs-npm-scripts-build-babel/scripts/build.js <optional custom build entry>"
  },
```

`.npmscriptrc` must be defined in the root path and contain a JSON formatted object hash `build` with a `babel` hash
with the following options:
```
(string)          source - The source directory.
(string)          destination - The destination directory.
(Array<string>)   options - An array of optional parameters which are appended to the invocation of Babel. Please
                            run `./node_modules/.bin/babel --help` for all available options.
```

Please note that you need a [.babelrc](https://babeljs.io/docs/usage/babelrc/) file in the root path for Babel configurations. Or you can provide any of these runtime options in the options entry. 

------

Optionally in the `build` hash additional actions to complete after transpiling are available that are executed in
the order described below.

Add a `copy` hash entry to copy files or directories. The copy entry must be an array of object hashes with the
following options:
```
(string)          source - The source file or directory.
(string)          destination - The destination file or directory.
```

Add a `scripts` hash entry to execute a series of commands / scripts. The scripts entry must be an array of strings
to execute via `child_process->execSync`:
```
(string)          A command to execute.
```

Add a `chmod` hash entry to execute a mode change on files. The chmod entry must be an array of object hashes with
the following options:
```
(string)          path - A path to a file.
(string)          mode - The new mode for the file.
```

------

A basic configuration for transpiling ES6 NPM modules is designating the source directory and the destination directory.  An example of defining these parameters in `.npmscriptrc` follows:
```
{
   "build":
   {
      "babel": { "source": "src", "destination": "dist" }
   }
}
```

The basic configuration with optional actions follows:
```
{
   "build":
   {
      "babel": { "source": "src", "destination": "dist" },

      // Copy templates
      "copy": [{ "source": "./src/templates", "destination": "./dist/templates" }],

      // Run an NPM script (defined in `package.json`).
      "scripts": ["npm run ascript"],

      // chmod the CLI entry point to executable.
      "chmod": [{ "path": "./dist/ModuleCLI.js", "mode": "755" }]
   }
}
```

Please note that you can add comments to `.npmscriptrc` and that `.npmscriptrc.js` is required and needs to use `module.exports`. Also please note that the build script performs a final sanity check to ensure that there are files / directories in the destination directory otherwise an exception is thrown. 
