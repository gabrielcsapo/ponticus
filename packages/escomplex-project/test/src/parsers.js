import BabelParser      from '@typhonjs/babel-parser';

import * as acorn       from 'acorn';
import * as babylon     from 'babylon';
import * as espree      from 'espree';
import * as esprima     from 'esprima';

import * as testconfig  from './testconfig';

import escomplex        from '../../src';

const s_ESM_REGEX = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s* (\{|default|function|class|var|const|let|async\s+function))/;

const s_ACORN_OPTIONS = { locations: true };

const s_BABYLON_OPTIONS =
{
   plugins: ['asyncFunctions', 'asyncGenerators', 'classConstructorCall', 'classProperties', 'decorators',
    'doExpressions', 'exportExtensions', 'exponentiationOperator', 'flow', 'functionBind', 'functionSent',
     'jsx', 'objectRestSpread', 'trailingFunctionCommas']
};

const s_ESPRIMA_OPTIONS = { loc: true };

const s_ESPREE_OPTIONS = { loc: true, ecmaVersion: 6, ecmaFeatures: { jsx: true } };

/**
 * Provides a debug logger.
 * @param {string}   message - log message
 */
function log(message)
{
   if (testconfig.parserDebug) { console.log(message); }
}

const parsers = [];

if (testconfig.parsers.acorn)
{
   parsers.push(
   {
      analyze: function(code, options, parserOptions)
      {
         const report = escomplex.analyze(this.parse(code, parserOptions), options);
         log(`!! (acorn): analyze - report: ${JSON.stringify(report)}`);
         return report;
      },
      name: 'acorn',
      parse: function(code, options)
      {
         options = typeof options === 'object' ? options : s_ACORN_OPTIONS;
         options.sourceType = s_ESM_REGEX.test(code) ? 'module' : 'script';
         const ast = acorn.parse(code, options);
         log(`!! (acorn): parse - ast: ${JSON.stringify(ast)}`);
         return ast;
      }
   });
}


if (testconfig.parsers.babelParser)
{
   parsers.push(
   {
      analyze: function(code, options, parserOptions, parserOverrides)
      {
         const report = escomplex.analyze(this.parse(code, parserOptions, parserOverrides), options);
         log(`!! (babelParser): analyze - report: ${JSON.stringify(report)}`);
         return report;
      },
      name: 'babelParser',
      parse: function(code, options, overrides)
      {
         const ast = BabelParser.parse(code, options, overrides);
         log(`!! (babelParser): parse - ast: ${JSON.stringify(ast)}`);
         return ast;
      }
   });
}

if (testconfig.parsers.babylon)
{
   parsers.push(
   {
      analyze: function(code, options, parserOptions)
      {
         const report = escomplex.analyze(this.parse(code, parserOptions), options);
         log(`!! (babylon): analyze - report: ${JSON.stringify(report)}`);
         return report;
      },
      name: 'babylon',
      parse: function(code, options)
      {
         options = typeof options === 'object' ? options : s_BABYLON_OPTIONS;
         options.sourceType = s_ESM_REGEX.test(code) ? 'module' : 'script';
         const ast = babylon.parse(code, options);
         log(`!! (babylon): parse - ast: ${JSON.stringify(ast)}`);
         return ast;
      }
   });
}

if (testconfig.parsers.espree)
{
   parsers.push(
   {
      analyze: function(code, options, parserOptions)
      {
         const report = escomplex.analyze(this.parse(code, parserOptions), options);
         log(`!! (espree): analyze - report: ${JSON.stringify(report)}`);
         return report;
      },
      name: 'espree',
      parse: function(code, options)
      {
         options = typeof options === 'object' ? options : s_ESPREE_OPTIONS;
         options.sourceType = s_ESM_REGEX.test(code) ? 'module' : 'script';
         const ast = espree.parse(code, options);
         log(`!! (espree): parse - ast: ${JSON.stringify(ast)}`);
         return ast;
      }
   });
}

if (testconfig.parsers.esprima)
{
   parsers.push(
   {
      analyze: function(code, options, parserOptions)
      {
         const report = escomplex.analyze(this.parse(code, parserOptions), options);
         log(`!! (esprima): analyze - report: ${JSON.stringify(report)}`);
         return report;
      },
      name: 'esprima',
      parse: function(code, options)
      {
         options = typeof options === 'object' ? options : s_ESPRIMA_OPTIONS;
         options.sourceType = s_ESM_REGEX.test(code) ? 'module' : 'script';
         const ast = esprima.parse(code, s_ESPRIMA_OPTIONS);
         log(`!! (esprima): parse - ast: ${JSON.stringify(ast)}`);
         return ast;
      }
   });
}


export default parsers;
