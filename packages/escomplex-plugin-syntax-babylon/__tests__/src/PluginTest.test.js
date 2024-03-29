import fs from "fs";
import path from "path";

import { test, describe, expect } from "vitest";

import { ASTWalker } from "@ponticus/ast-walker";

import PluginSyntaxBabylon from "../../src/PluginSyntaxBabylon";

const pluginData = [{ name: "ESM", PluginClass: PluginSyntaxBabylon }];

pluginData.forEach((plugin) => {
  describe(`(${plugin.name}) plugin:`, () => {
    describe("initialize:", () => {
      const instance = new plugin.PluginClass();

      test("plugin was object", () => {
        expect(typeof instance).toBe("object");
      });

      test("plugin function is exported", () => {
        expect(typeof instance.onLoadSyntax).toBe("function");
      });
    });

    describe("method invocation:", () => {
      const instance = new plugin.PluginClass();

      test("plugin throws on empty event data", () => {
        expect(() => {
          instance.onLoadSyntax();
        }).toThrow();
      });

      test("plugin does not throw on proper event data", () => {
        // Sets default configuration data.
        const event = { data: { settings: {}, options: {}, syntaxes: {} } };
        instance.onConfigure(event);

        expect(() => {
          instance.onLoadSyntax(event);
        }).not.toThrow();
      });

      test("plugin passes back syntax data", () => {
        // Sets default configuration data.
        const event = { data: { settings: {}, options: {}, syntaxes: {} } };
        instance.onConfigure(event);

        instance.onLoadSyntax(event);
        expect(typeof event.data.syntaxes).toBe("object");
      });

      test("plugin has correct syntax data length", () => {
        // Sets default configuration data.
        const event = { data: { settings: {}, options: {}, syntaxes: {} } };
        instance.onConfigure(event);

        instance.onLoadSyntax(event);

        // Note: that 60+ definitions are from `escomplex-plugin-syntax-estree`.
        expect(Object.keys(event.data.syntaxes).length).toBe(77);
      });

      test("plugin has correct syntax properties", () => {
        // Sets default configuration data.
        const event = { data: { settings: {}, options: {}, syntaxes: {} } };
        instance.onConfigure(event);

        instance.onLoadSyntax(event);

        for (const type in event.data.syntaxes) {
          expect(JSON.stringify(Object.keys(event.data.syntaxes[type]))).toBe(
            '["lloc","cyclomatic","operators","operands","ignoreKeys","newScope","dependencies"]'
          );
        }
      });
    });

    describe("AST Walker:", () => {
      const instance = new plugin.PluginClass();

      test("verify espree results", () => {
        const results = {};

        // Sets default configuration data.
        const event = { data: { settings: {}, options: {}, syntaxes: {} } };
        instance.onConfigure(event);

        instance.onLoadSyntax(event);

        new ASTWalker().traverse(
          JSON.parse(
            fs.readFileSync(
              path.resolve(__dirname, "../fixture/espree-estree.json"),
              "utf8"
            )
          ),
          {
            enterNode: (node, parent) => {
              const syntax = event.data.syntaxes[node.type];

              if (syntax !== null && typeof syntax === "object") {
                if (typeof results[node.type] === "undefined") {
                  results[node.type] = {};
                }

                for (const metric in syntax) {
                  if (typeof results[node.type][metric] === "undefined") {
                    results[node.type][metric] = {};
                  }

                  const value = syntax[metric].valueOf(node, parent);

                  const valueKey = JSON.stringify(value);

                  if (
                    typeof results[node.type][metric][valueKey] === "undefined"
                  ) {
                    results[node.type][metric][valueKey] = 1;
                  } else {
                    results[node.type][metric][valueKey]++;
                  }
                }

                return syntax.ignoreKeys.valueOf();
              }
            },
          }
        );

        expect(results).toMatchSnapshot();
      });
    });
  });
});
