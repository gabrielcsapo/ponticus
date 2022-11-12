import { test, describe, expect } from "vitest";

import { readFileSync } from "fs";

import walker from "../../src/index.js";

describe("AST Walker:", () => {
  describe("walker:", () => {
    describe("successfully parses ast tree (fixture):", () => {
      test("result has proper node counts", () => {
        const nodeCounts = {};
        const nodeResults = JSON.parse(
          readFileSync("./__tests__/fixture/espree-estree-results.json", "utf8")
        );

        walker.traverse(
          JSON.parse(
            readFileSync("./__tests__/fixture/espree-estree.json", "utf8")
          ),
          {
            enterNode: (node) => {
              nodeCounts[node.type] =
                typeof nodeCounts[node.type] === "undefined"
                  ? 1
                  : nodeCounts[node.type] + 1;
            },
          }
        );

        Object.keys(nodeResults).forEach((key) => {
          expect(nodeCounts[key]).toBe(nodeResults[key]);
        });
      });

      test("result has proper node counts (ignoreKeys)", () => {
        const nodeCounts = {};
        const nodeResults = JSON.parse(
          readFileSync(
            "./__tests__/fixture/espree-estree-results-ignorekeys.json",
            "utf8"
          )
        );

        walker.traverse(
          JSON.parse(
            readFileSync("./__tests__/fixture/espree-estree.json", "utf8")
          ),
          {
            enterNode: (node) => {
              nodeCounts[node.type] =
                typeof nodeCounts[node.type] === "undefined"
                  ? 1
                  : nodeCounts[node.type] + 1;

              // Ignore all declaration keys.
              return node.type === "VariableDeclaration"
                ? ["declarations"]
                : [];
            },
          }
        );

        Object.keys(nodeResults).forEach((key) => {
          expect(nodeCounts[key]).toBe(nodeResults[key]);
        });
      });

      test("result has proper node counts (break / null)", () => {
        const nodeCounts = {};
        const nodeResults = JSON.parse(
          readFileSync(
            "./__tests__/fixture/espree-estree-results-breaknull.json",
            "utf8"
          )
        );

        walker.traverse(
          JSON.parse(
            readFileSync("./__tests__/fixture/espree-estree.json", "utf8")
          ),
          {
            enterNode: (node) => {
              nodeCounts[node.type] =
                typeof nodeCounts[node.type] === "undefined"
                  ? 1
                  : nodeCounts[node.type] + 1;

              // By returning null all children keys are skipped.
              return node.type === "VariableDeclaration" ? null : [];
            },
          }
        );

        Object.keys(nodeResults).forEach((key) => {
          expect(nodeCounts[key]).toBe(nodeResults[key]);
        });
      });
    });
  });
});
