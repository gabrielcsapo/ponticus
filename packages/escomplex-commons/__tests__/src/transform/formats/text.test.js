import { test, describe, expect } from "vitest";

import ModuleReport from "../../../../src/module/report/ModuleReport";
import ProjectReport from "../../../../src/project/report/ProjectReport";

import FormatText from "../../../../src/transform/formats/text/FormatText.js";
import FormatTextAdjacency from "../../../../src/transform/formats/text/FormatTextAdjacency.js";
import FormatTextMinimal from "../../../../src/transform/formats/text/FormatTextMinimal.js";
import FormatTextModules from "../../../../src/transform/formats/text/FormatTextModules.js";
import FormatTextVisibility from "../../../../src/transform/formats/text/FormatTextVisibility.js";

const formats = [
  new FormatText(),
  new FormatTextAdjacency(),
  new FormatTextMinimal(),
  new FormatTextModules(),
  new FormatTextVisibility(),
];

describe("text formatter", () => {
  describe("forEach / formatReport (large-module/module):", () => {
    const largeModuleJSON = require("@ponticus/escomplex-test-data/files/large-module/json/module");

    const moduleReport = ModuleReport.parse(largeModuleJSON);

    formats.forEach((format) => {
      if (format.isSupported(moduleReport.type)) {
        test(`formatName: ${format.name}`, () => {
          const output = format.formatReport(moduleReport);

          expect(output).toMatchSnapshot();
        });
      }
    });
  });

  describe("forEach / formatReport (large-project/project-no-modules):", () => {
    const largeProjectJSON = require("@ponticus/escomplex-test-data/files/large-project/json/project-no-modules");

    const projectResult = ProjectReport.parse(largeProjectJSON);

    formats.forEach((format) => {
      if (format.isSupported(projectResult.type)) {
        test(`formatName: ${format.name}`, () => {
          const output = format.formatReport(projectResult);

          expect(output).toMatchSnapshot();
        });
      }
    });
  });
});
