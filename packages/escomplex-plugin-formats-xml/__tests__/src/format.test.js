import { test, describe, expect } from "vitest";

import {
  ModuleReport,
  ProjectReport,
  TransformFormat,
} from "@ponticus/escomplex-commons";

import "../../src";

describe("transform:", () => {
  describe("TransformFormat:", () => {
    describe("forEachExt / formatReport (large-module/report):", () => {
      const largeModuleJSON = require("@ponticus/escomplex-test-data/files/large-module/json/module");

      const moduleReport = ModuleReport.parse(largeModuleJSON).finalize();

      TransformFormat.forEachExt("xml", (format, formatName) => {
        test(`formatName: ${formatName}`, () => {
          const output = format.formatReport(moduleReport);

          expect(output).toMatchSnapshot();
        });
      });
    });

    describe("forEachExt / formatResult (large-project/results):", () => {
      const largeProjectJSON = require("@ponticus/escomplex-test-data/files/large-project/json/project");

      const projectResult = ProjectReport.parse(largeProjectJSON).finalize();

      TransformFormat.forEachExt("xml", (format, formatName) => {
        test(`formatName: ${formatName}`, () => {
          const output = format.formatResult(projectResult);

          expect(output).toMatchSnapshot();
        });
      });
    });

    describe("forEachExt / formatResult (large-project/results-no-reports):", () => {
      const largeProjectJSON = require("@ponticus/escomplex-test-data/files/large-project/json/project-no-modules");

      const projectResult = ProjectReport.parse(largeProjectJSON).finalize();

      TransformFormat.forEachExt("xml", (format, formatName) => {
        test(`formatName: ${formatName}`, () => {
          const output = format.formatResult(projectResult);

          expect(output).toMatchSnapshot();
        });
      });
    });
  });
});
