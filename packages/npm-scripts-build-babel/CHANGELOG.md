## 0.7.0 (2017-04-01)
- Added [babel-preset-env](https://www.npmjs.com/package/babel-preset-env)
- Added [babel-plugin-transform-export-extensions](https://www.npmjs.com/package/babel-plugin-transform-export-extensions)
- Removed babel-preset-latest; please use babel-preset-env (simply swap preset from `latest` with `env`)
and see [http://babeljs.io/docs/plugins/preset-env/](http://babeljs.io/docs/plugins/preset-env/) for more info.

## 0.6.0 (2017-02-25)
- Added support for `.npmscriptrc.js` and optional argument handling to pass in a string to target a different 
  entry in `.npmscriptrc` for test running. 
- Upgraded typhonjs-npm-scripts-runner - ^0.4.0
  
## 0.5.0 (2017-02-18)
- Upgraded fs-extra - ^2.0.0
- Upgraded typhonjs-npm-scripts-runner - ^0.3.0
- Added babel-eslint - ^7.0.0
- Added babel-preset-stage-2 - ^6.0.0
- Removed babel-plugin-module-alias

## 0.4.0 (2017-01-10)
- Upgraded fs-extra - ^1.0.0
- Added babel-preset-latest - ^6.0.0 to pull in all the latest presets / removed just the 2015 preset.
- Added babel-plugin-transform-runtime - ^6.0.0
- Added babel-plugin-module-resolver - ^2.0.0 which is a replacement for babel-plugin-module-alias for the time being
babel-plugin-module-alias will also remain as a dependency for this release, but will be removed in the next release.

## 0.3.0 (2016-06-03)
Added extra actions to run after babel transpilation including copying files, running commands / scripts, and chmod of files.

## 0.2.0 (2016-06-02)
Added the following Babel sub-modules that are handy for ES6 NPM modules:
- [babel-plugin-add-module-exports](https://www.npmjs.com/package/babel-plugin-add-module-exports)
- [babel-plugin-module-alias](https://www.npmjs.com/package/babel-plugin-module-alias)

## 0.1.0 (2016-03-13)
- Initial stable release.
