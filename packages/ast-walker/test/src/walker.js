const {
   suite,
   test,
   teardown,
   setup
} = require('mocha');

const {
   assert
} = require('chai');
const fs = require('fs');

const walker = require('../../dist/index.js').default;

const walkerPath = '../../dist/index';

suite('AST Walker:', () => {
   suite('require walker:', () => {
      let requireWalker;

      setup(() => {
         requireWalker = require(walkerPath);
      });
      teardown(() => {
         requireWalker = undefined;
      });

      test('require does not throw', () => {
         assert.doesNotThrow(() => {
            require(walkerPath);
         });
      });

      test('walker object is exported', () => {
         assert.isObject(requireWalker);
      });

      test('walker throws when traverse is called with empty parameters', () => {
         assert.throws(() => {
            requireWalker.traverse();
         });
      });
   });

   suite('walker:', () => {
      suite('successfully parses ast tree (fixture):', () => {
         test('result has proper node counts', () => {
            const nodeCounts = {};
            const nodeResults = JSON.parse(fs.readFileSync('./test/fixture/espree-estree-results.json', 'utf8'));

            walker.traverse(JSON.parse(fs.readFileSync('./test/fixture/espree-estree.json', 'utf8')), {
               enterNode: (node) => {
                  nodeCounts[node.type] = typeof nodeCounts[node.type] === 'undefined' ? 1 : nodeCounts[node.type] + 1;
               }
            });

            Object.keys(nodeResults).forEach((key) => {
               assert.strictEqual(nodeCounts[key], nodeResults[key]);
            });
         });

         test('result has proper node counts (ignoreKeys)', () => {
            const nodeCounts = {};
            const nodeResults = JSON.parse(fs.readFileSync(
               './test/fixture/espree-estree-results-ignorekeys.json', 'utf8'));

            walker.traverse(JSON.parse(fs.readFileSync('./test/fixture/espree-estree.json', 'utf8')), {
               enterNode: (node) => {
                  nodeCounts[node.type] = typeof nodeCounts[node.type] === 'undefined' ? 1 : nodeCounts[node.type] + 1;

                  // Ignore all declaration keys.
                  return node.type === 'VariableDeclaration' ? ['declarations'] : [];
               }
            });

            Object.keys(nodeResults).forEach((key) => {
               assert.strictEqual(nodeCounts[key], nodeResults[key]);
            });
         });

         test('result has proper node counts (break / null)', () => {
            const nodeCounts = {};
            const nodeResults = JSON.parse(fs.readFileSync(
               './test/fixture/espree-estree-results-breaknull.json', 'utf8'));

            walker.traverse(JSON.parse(fs.readFileSync('./test/fixture/espree-estree.json', 'utf8')), {
               enterNode: (node) => {
                  nodeCounts[node.type] = typeof nodeCounts[node.type] === 'undefined' ? 1 : nodeCounts[node.type] + 1;

                  // By returning null all children keys are skipped.
                  return node.type === 'VariableDeclaration' ? null : [];
               }
            });

            Object.keys(nodeResults).forEach((key) => {
               assert.strictEqual(nodeCounts[key], nodeResults[key]);
            });
         });
      });
   });
});