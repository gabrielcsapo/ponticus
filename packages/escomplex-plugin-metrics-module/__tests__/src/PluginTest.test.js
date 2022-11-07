import fs from "fs";
import path from "path";

import { test, describe, expect } from "vitest";

import { PluginSyntaxBabylon } from "@ponticus/escomplex-plugin-syntax-babylon";
import { ModuleReport, ModuleScopeControl } from "@ponticus/escomplex-commons";

import { ASTWalker } from "@ponticus/ast-walker";

import PluginMetricsModule from "../../dist/PluginMetricsModule";

const pluginData = [{ name: "ESM", PluginClass: PluginMetricsModule }];

pluginData.forEach((plugin) => {
  describe(`(${plugin.name}) plugin:`, () => {
    describe("initialize:", () => {
      const instance = new plugin.PluginClass();

      test("plugin was object", () => {
        expect(typeof instance).toBe("object");
      });

      test("plugin function onConfigure is exported", () => {
        expect(typeof instance.onConfigure).toBe("function");
      });

      test("plugin function onEnterNode is exported", () => {
        expect(typeof instance.onEnterNode).toBe("function");
      });

      test("plugin function onModuleAverage is exported", () => {
        expect(typeof instance.onModuleAverage).toBe("function");
      });

      test("plugin function onModuleCalculate is exported", () => {
        expect(typeof instance.onModuleCalculate).toBe("function");
      });

      test("plugin function onModuleCalculate is exported", () => {
        expect(typeof instance.onModulePostAverage).toBe("function");
      });

      test("plugin function onModulePreScopeCreated is exported", () => {
        expect(typeof instance.onModulePreScopeCreated).toBe("function");
      });

      test("plugin function onModulePostScopeCreated is exported", () => {
        expect(typeof instance.onModulePostScopeCreated).toBe("function");
      });
    });

    describe("method invocation:", () => {
      const instance = new plugin.PluginClass();

      test("plugin throws on empty event data", () => {
        expect(() => {
          instance.onConfigure();
        }).toThrow();
      });

      test("plugin does not throw on proper event data", () => {
        expect(() => {
          instance.onConfigure({ data: { options: {}, settings: {} } });
        }).not.toThrow();
      });

      test("plugin passes back syntax data", () => {
        const event = { data: { options: {}, settings: {} } };
        instance.onConfigure(event);
        expect(event.data.settings.newmi).toBe(false);
      });
    });

    describe("module results:", () => {
      const syntaxInstance = new PluginSyntaxBabylon();
      const instance = new plugin.PluginClass();

      const ast = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, "../fixture/espree-estree.json"),
          "utf8"
        )
      );

      /**
       * Bootstraps the ESComplexModule runtime and fudges traversing the AST with the Babylon trait syntaxes.
       *
       * Note: That the control flow below exactly replicates typhonjs-escomplex-module / ESComplexModule. If there
       * are any future changes to ESComplexModule the below control flow will need to be modified accordingly.
       */
      test("verify calculated results", () => {
        const moduleReport = new ModuleReport(
          ast.loc.start.line,
          ast.loc.end.line
        );
        const scopeControl = new ModuleScopeControl(moduleReport);

        let event = { data: { options: {}, settings: {} } };

        instance.onConfigure(event);
        syntaxInstance.onConfigure(event);

        const settings = event.data.settings;

        event = { data: { settings, syntaxes: {} } };

        syntaxInstance.onLoadSyntax(event);

        const syntaxes = event.data.syntaxes;

        // Completely traverse the provided AST and defer to plugins to process node traversal.
        new ASTWalker().traverse(ast, {
          enterNode: (node, parent) => {
            const syntax = syntaxes[node.type];

            let ignoreKeys = [];

            // Process node syntax / ignore keys.
            if (typeof syntax === "object") {
              if (syntax.ignoreKeys) {
                ignoreKeys = syntax.ignoreKeys.valueOf(node, parent);
              }
            }

            ignoreKeys = instance.onEnterNode({
              data: {
                moduleReport,
                scopeControl,
                ignoreKeys,
                syntaxes,
                settings,
                node,
                parent,
              },
            });

            // Process node syntax / create scope.
            if (typeof syntax === "object") {
              if (syntax.ignoreKeys) {
                ignoreKeys = syntax.ignoreKeys.valueOf(node, parent);
              }

              if (syntax.newScope) {
                const newScope = syntax.newScope.valueOf(node, parent);

                if (newScope) {
                  // TODO: new code
                  instance.onModulePreScopeCreated({
                    data: {
                      moduleReport,
                      scopeControl,
                      newScope,
                      node,
                      parent,
                    },
                  });
                  scopeControl.createScope(newScope);
                  instance.onModulePostScopeCreated({
                    data: { moduleReport, scopeControl, newScope },
                  });

                  // TODO: old code
                  // scopeControl.createScope(newScope);
                  // instance.onModuleScopeCreated({ data: { moduleReport, scopeControl, newScope } });
                }
              }
            }

            return ignoreKeys;
          },

          exitNode: (node, parent) => {
            const syntax = syntaxes[node.type];

            // Process node syntax / pop scope.
            if (typeof syntax === "object" && syntax.newScope) {
              const newScope = syntax.newScope.valueOf(node, parent);

              if (newScope) {
                scopeControl.popScope(newScope);
              }
            }
          },
        });

        instance.onModuleCalculate({
          data: { moduleReport, syntaxes, settings },
        });
        instance.onModuleAverage({
          data: { moduleReport, syntaxes, settings },
        });
        instance.onModulePostAverage({
          data: { moduleReport, syntaxes, settings },
        });

        moduleReport.finalize();

        expect(JSON.stringify(moduleReport)).toMatchSnapshot();
      });
    });
  });
});
