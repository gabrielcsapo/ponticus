import path from "path";

import { test, describe, expect } from "vitest";

import { ProjectReport } from "@ponticus/escomplex-commons";

import PluginMetricsProject from "../../src/PluginMetricsProject.js";

const pluginData = [{ name: "ESM", PluginClass: PluginMetricsProject }];

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

      test("plugin function onProjectCalculate is exported", () => {
        expect(typeof instance.onProjectCalculate).toBe("function");
      });

      test("plugin function onProjectAverage is exported", () => {
        expect(typeof instance.onProjectAverage).toBe("function");
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
        expect(event.data.settings.noCoreSize).toBe(false);
      });
    });

    describe("project results:", () => {
      const instance = new plugin.PluginClass();

      const resultsAfter = require("@ponticus/escomplex-test-data/files/large-project/json/project");

      const resultsBefore = ProjectReport.parse(
        require("@ponticus/escomplex-test-data/files/large-project/json/project-no-calculation")
      );

      /**
       * Bootstraps the ESComplexProject runtime and fudges processing project results.
       *
       * Note: That the control flow below exactly replicates typhonjs-escomplex-project / ESComplexProject. If there
       * are any future changes to ESComplexProject the below control flow will need to be modified accordingly.
       */
      test("verify calculation results", () => {
        let event = { data: { options: {}, settings: {} } };

        instance.onConfigure(event);

        const settings = event.data.settings;

        event = {
          data: { pathModule: path, projectReport: resultsBefore, settings },
        };

        // Allow all plugins to have a calculation pass at the project report.
        instance.onProjectCalculate(event);

        // Allow all plugins to have a pass at the project report to calculate any averaged data.
        instance.onProjectAverage(event);

        // ESComplexProject on processing results will set skipCalculation to false.
        resultsBefore.settings.skipCalculation = false;

        resultsBefore.finalize();

        expect(JSON.stringify(resultsBefore)).toStrictEqual(
          JSON.stringify(resultsAfter)
        );
      });
    });
  });
});
