import { test, describe, expect } from "vitest";

import ModuleReport from "../../../../src/module/report/ModuleReport";
import ProjectReport from "../../../../src/project/report/ProjectReport";

import FormatMarkdown from "../../../../src/transform/formats/markdown/FormatMarkdown";
import FormatMarkdownAdjacency from "../../../../src/transform/formats/markdown/FormatMarkdownAdjacency.js";
import FormatMarkdownMinimal from "../../../../src/transform/formats/markdown/FormatMarkdownMinimal.js";
import FormatMarkdownModules from "../../../../src/transform/formats/markdown/FormatMarkdownModules.js";
import FormatMarkdownVisibility from "../../../../src/transform/formats/markdown/FormatMarkdownVisibility.js";

const formats = [
  new FormatMarkdown(),
  new FormatMarkdownAdjacency(),
  new FormatMarkdownMinimal(),
  new FormatMarkdownModules(),
  new FormatMarkdownVisibility(),
];

describe("markdown formatter", () => {
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
