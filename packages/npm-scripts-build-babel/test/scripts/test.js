'use strict';

/**
 * build (test) -- Runs the build script with the npm-build.json which transpiles `./test/src` to `./test/dist`. Loads
 * TestDummy from `./test/dist` and verifies that the build worked.
 */

var cp =    require('child_process');
var fs =    require('fs-extra');
var util =  require('util');

// Empty './test/dist'.
fs.emptyDirSync('./test/dist');

// Build base execution command.
var exec = 'node ./scripts/build.js';

// Notify what command is being executed then execute it.
process.stdout.write('typhonjs-npm-scripts-build-babel executing: ' + exec + '\n');
cp.execSync(exec, { stdio: 'inherit' });

verifyOutput('dist');

// Build dev base execution command.
exec = 'node ./scripts/build.js build-dev';

// Notify what command is being executed then execute it.
process.stdout.write('\n\ntyphonjs-npm-scripts-build-babel executing: ' + exec + '\n');
cp.execSync(exec, { stdio: 'inherit' });

verifyOutput('dist-dev');

function verifyOutput(distDir)
{
   // Attempt to load transpiled test.
   var TestDummy = require('../' + distDir +'/TestDummy').default;

   // Verify results
   if ('Test Success' !== new TestDummy().test())
   {
      throw new Error("typhonjs-npm-scripts-build-babel test error: transpiling failed.");
   }

   // Verify that source maps file was generated. ----------------------------------------------------------------------
   try
   {
      if (!fs.statSync('./test/' + distDir +'/TestDummy.js.map').isFile())
      {
         throw new Error("'./test/" + distDir + "/TestDummy.js.map' not found.");
      }
   }
   catch(err)
   {
      throw new Error("typhonjs-npm-scripts-build-babel test error: " + err);
   }

   // Verify that copy directory was executed. -------------------------------------------------------------------------
   try
   {
      if (!fs.statSync('./test/' + distDir +'/subdir/test2.json').isFile())
      {
         throw new Error("'./test/" + distDir +"/subdir/test2.json' not found. (copy failed)");
      }
   }
   catch(err)
   {
      throw new Error("typhonjs-npm-scripts-build-babel test error: " + err);
   }

   // Verify that script (copy) was executed ---------------------------------------------------------------------------
   try
   {
      if (!fs.statSync('./test/' + distDir +'/test.json').isFile())
      {
         throw new Error("'./test/" + distDir +"/test.json' not found. (script failed)");
      }
   }
   catch(err)
   {
      throw new Error("typhonjs-npm-scripts-build-babel test error: " + err);
   }

   // Verify that chmod was executed -----------------------------------------------------------------------------------
   try
   {
      var utilResult = util.inspect(fs.statSync('./test/' + distDir +'/TestDummy.js'));

      if (utilResult.indexOf('mode: 33261') < 0)
      {
         throw new Error('./test/' + distDir +'/TestDummy.js chmod failed.');
      }
   }
   catch(err)
   {
      throw new Error("typhonjs-npm-scripts-build-babel test error: " + err);
   }

   // Empty './test/dist'; comment out to view transpiled result.
   fs.emptyDirSync('./test/' + distDir);
}