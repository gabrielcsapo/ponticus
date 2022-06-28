'use strict';

/**
 * build -- Initiates the Babel build process. A valid `.npmscriptrc` configuration file must be located in the
 * root path. This configuration file must contain a `build` hash with a `babel` hash entry that contains the
 * following options:
 * ```
 * (string)          source - The source directory.
 * (string)          destination - The destination directory.
 * (Array<string>)   options - An array of optional parameters which are appended to the invocation of Babel. Please
 *                             run `./node_modules/.bin/babel --help` for all available options.
 * ```
 *
 * Optionally in the `build` hash additional actions to complete after transpiling are available that are executed in
 * the order described below.
 *
 * Add a `copy` hash entry to copy files or directories. The copy entry must be an array of object hashes with the
 * following options:
 * ```
 * (string)          source - The source file or directory.
 * (string)          destination - The destination file or directory.
 * ```
 *
 * Add a `scripts` hash entry to execute a series of commands / scripts. The scripts entry must be an array of strings
 * to execute via `child_process->execSync`:
 * ```
 * (string)          A command to execute.
 * ```
 *
 * Add a `chmod` hash entry to execute a mode change on files. The chmod entry must be an array of object hashes with
 * the following options:
 * ```
 * (string)          path - A path to a file.
 * (string)          mode - The new mode for the file.
 * ```
 */

var cp =                require('child_process');
var fs =                require('fs-extra');
var path =              require('path');
var stripJsonComments = require('strip-json-comments');

var buildEntry = 'build';

// Potentially set a new testEntry.
if (typeof process.argv[2] === 'string')
{
   buildEntry = process.argv[2];
}

// Verify that `Babel` exists.
/* istanbul ignore next */
try
{
   if (!fs.statSync(require.resolve('babel-core')).isFile())
   {
      throw new Error("could not locate Babel at 'babel-core'.");
   }
}
catch(err)
{
   throw new Error("typhonjs-npm-scripts-build-babel error: " + err);
}

var configInfo;

// Attempt to require `.npmscriptrc.js`
/* istanbul ignore next */
try
{
   if (fs.statSync('./.npmscriptrc.js').isFile())
   {
      configInfo = require(path.resolve('./.npmscriptrc.js'));
   }
}
catch (err)
{
   // Attempt to load `.npmscriptrc` and strip comments.
   /* istanbul ignore next */
   try
   {
      if (fs.statSync('./.npmscriptrc').isFile())
      {
         configInfo = JSON.parse(stripJsonComments(fs.readFileSync('./.npmscriptrc', 'utf-8')));
      }
   }
   catch (err) { /* nop */ }
}

// Exit now if no configInfo object has been loaded.
if (typeof configInfo !== 'object')
{
   throw new Error("TyphonJS NPM script (build-babel) could not load `./npmscriptrc.js` or `./npmscriptrc`.");
}

// Verify that `build` entry is an object.
/* istanbul ignore if */
if (typeof configInfo[buildEntry] !== 'object')
{
   throw new Error(
    "typhonjs-npm-scripts-build-babel error: '" + buildEntry +
     "' entry is not an object or is missing in config file.");
}

// Verify that `build.babel` entry is an object.
/* istanbul ignore if */
if (typeof configInfo[buildEntry].babel !== 'object')
{
   throw new Error(
    "typhonjs-npm-scripts-build-babel error: '" + buildEntry +
     ".babel' entry is not an object or is missing in config file.");
}

var babelConfig = configInfo[buildEntry].babel;

// Verify that source entry is a string.
/* istanbul ignore if */
if (typeof babelConfig.source !== 'string')
{
   throw new Error(
    "typhonjs-npm-scripts-build-babel error: '" + buildEntry + ".babel.source' entry is not a string or is missing in "
    + "config file.");
}

// Verify that destination entry is a string.
/* istanbul ignore if */
if (typeof babelConfig.destination !== 'string')
{
   throw new Error(
    "typhonjs-npm-scripts-build-babel error: 'build.babel.destination' entry is not a string or is missing in "
     + "config file.");
}

// Verify that source entry is a directory.
/* istanbul ignore next */
try
{
   if (!fs.statSync(babelConfig.source).isDirectory())
   {
      throw new Error("'" + buildEntry + ".babel.source' entry is not a directory: " + babelConfig.source);
   }
}
catch(err)
{
   throw new Error("typhonjs-npm-scripts-build-babel error: " + err);
}

// Create or empty destination directory.
fs.emptyDirSync(babelConfig.destination);

// Verify that destination entry is a directory.
/* istanbul ignore next */
try
{
   if (!fs.statSync(babelConfig.destination).isDirectory())
   {
      throw new Error("'" + buildEntry + "babel.destination' entry is not a directory: " + babelConfig.destination);
   }
}
catch(err)
{
   throw new Error("typhonjs-npm-scripts-build-babel error: " + err);
}

// Build base execution command.
var exec = `${path.resolve(__dirname, '../../../node_modules/.bin/babel')} ` + babelConfig.source + ' -d ' + babelConfig.destination;

// Add any optional parameters.
if (typeof babelConfig.options !== 'undefined')
{
   /* istanbul ignore if */
   if (!Array.isArray(babelConfig.options))
   {
      throw new Error(
       "typhonjs-npm-scripts-build-babel error: '" + buildEntry +
        ".babel.options' entry is not an `array` in '.npmscriptrc'.");
   }

   exec += ' ' + babelConfig.options.join(' ');
}

// Notify what command is being executed then execute it.
process.stdout.write('typhonjs-npm-scripts-build-babel executing: ' + exec + '\n');
cp.execSync(exec, { stdio: 'inherit' });


var cntr;

// Copy files -------------------------------------------------------------------------------------------------------

// Potentially copy files if a copy array is present
if (Array.isArray(configInfo[buildEntry].copy))
{
   for (cntr = 0; cntr < configInfo[buildEntry].copy.length; cntr++)
   {
      var copyEntry = configInfo[buildEntry].copy[cntr];

      /* istanbul ignore if */
      if (typeof copyEntry !== 'object')
      {
         throw new Error(
          "typhonjs-npm-scripts-build-babel error: '" + buildEntry + ".copy' entry `" +cntr
           +"` is not an `object` in config file.");
      }

      /* istanbul ignore if */
      if (typeof copyEntry.source !== 'string' || typeof copyEntry.destination !== 'string')
      {
         throw new Error(
          "typhonjs-npm-scripts-build-babel error: '" + buildEntry + ".copy' entry `" +cntr
           + "` has improperly formatted `source` or `destination` fields in config file.");
      }

      console.log('typhonjs-npm-scripts-build-babel copy: ' + copyEntry.source + ' ' + copyEntry.destination);

      fs.copySync(copyEntry.source, copyEntry.destination);
   }
}

// Commands / scripts -----------------------------------------------------------------------------------------------

// Potentially run commands or scripts if a scripts array is present
if (Array.isArray(configInfo[buildEntry].scripts))
{
   var runner = require('typhonjs-npm-scripts-runner');

   runner.run(['.npmscriptrc', '.npmscriptrc.js'], buildEntry + '.scripts', 'typhonjs-npm-scripts-build-babel');
}

// Chmod files ------------------------------------------------------------------------------------------------------

// Potentially chmod files if a chmod array is present
if (Array.isArray(configInfo[buildEntry].chmod))
{
   for (cntr = 0; cntr < configInfo[buildEntry].chmod.length; cntr++)
   {
      var chmodEntry = configInfo[buildEntry].chmod[cntr];

      /* istanbul ignore if */
      if (typeof chmodEntry !== 'object')
      {
         throw new Error(
          "typhonjs-npm-scripts-build-babel error: '" + buildEntry + ".chmod' `" +cntr
           +"` is not an `object` in config file.");
      }

      /* istanbul ignore if */
      if (typeof chmodEntry.path !== 'string' || typeof chmodEntry.mode !== 'string')
      {
         throw new Error(
          "typhonjs-npm-scripts-build-babel error: '" + buildEntry + ".chmod' entry `" +cntr
           + "` has improperly formatted `path` or `mode` fields in config file.");
      }

      console.log('typhonjs-npm-scripts-build-babel chmod: ' + chmodEntry.path + ' ' + chmodEntry.mode);

      fs.chmodSync(chmodEntry.path, chmodEntry.mode);
   }
}



// Verify that there are files / dirs in destination directory. If the directory is empty then fail.
var files = fs.readdirSync(babelConfig.destination);
if (files.length === 0)
{
   throw new Error(
    "typhonjs-npm-scripts-build-babel error: empty destination directory: " + babelConfig.destination);
}
