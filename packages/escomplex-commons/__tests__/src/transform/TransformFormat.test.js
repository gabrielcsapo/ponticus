import { test, describe, expect } from "vitest";

import ClassReport from "../../../src/module/report/ClassReport";
import ClassMethodReport from "../../../src/module/report/ClassMethodReport";
import ModuleMethodReport from "../../../src/module/report/ModuleMethodReport";
import ModuleReport from "../../../src/module/report/ModuleReport";
import ProjectReport from "../../../src/project/report/ProjectReport";

import TransformFormat from "../../../src/transform/TransformFormat";

import ReportType from "../../../src/types/ReportType";

describe("TransformFormat:", () => {
  test("should be able to return a list of report formats for all report types", () => {
    expect(TransformFormat.getFormats(ReportType.CLASS).map((r) => r.name))
      .toMatchInlineSnapshot(`
        [
          "json",
          "json-minimal",
          "markdown",
          "markdown-minimal",
          "text",
          "text-minimal",
        ]
      `);
    expect(
      TransformFormat.getFormats(ReportType.CLASS_METHOD).map((r) => r.name)
    ).toMatchInlineSnapshot(`
        [
          "json",
          "json-minimal",
          "markdown",
          "markdown-minimal",
          "text",
          "text-minimal",
        ]
      `);
    expect(
      TransformFormat.getFormats(ReportType.MODULE_METHOD).map((r) => r.name)
    ).toMatchInlineSnapshot(`
        [
          "json",
          "json-minimal",
          "markdown",
          "markdown-minimal",
          "text",
          "text-minimal",
        ]
      `);
    expect(TransformFormat.getFormats(ReportType.MODULE).map((r) => r.name))
      .toMatchInlineSnapshot(`
        [
          "json",
          "json-checkstyle",
          "json-minimal",
          "json-modules",
          "markdown",
          "markdown-minimal",
          "markdown-modules",
          "text",
          "text-minimal",
          "text-modules",
        ]
      `);
    expect(
      TransformFormat.getFormats(ReportType.NESTED_METHOD).map((r) => r.name)
    ).toMatchInlineSnapshot(`
        [
          "json",
          "json-minimal",
          "markdown",
          "markdown-minimal",
          "text",
          "text-minimal",
        ]
      `);
    expect(TransformFormat.getFormats(ReportType.PROJECT).map((r) => r.name))
      .toMatchInlineSnapshot(`
        [
          "json",
          "json-checkstyle",
          "json-minimal",
          "json-modules",
          "markdown",
          "markdown-adjacency",
          "markdown-minimal",
          "markdown-modules",
          "markdown-visibility",
          "text",
          "text-adjacency",
          "text-minimal",
          "text-modules",
          "text-visibility",
        ]
      `);
  });
});

describe("ClassReport:", () => {
  describe("toFormat (large-class/class):", () => {
    const largeClassJSON = require("@ponticus/escomplex-test-data/files/large-class/json/class");

    const classReport = ClassReport.parse(largeClassJSON);

    ClassReport.getFormats().forEach((format) => {
      test(`formatName: ${format.name}`, () => {
        const output = classReport.toFormat(format.name);

        expect(output).toMatchSnapshot();
      });
    });
  });

  describe("toFormat (large-module/class-with-errors):", () => {
    const largeClassJSON = require("@ponticus/escomplex-test-data/files/large-class/json/class-with-errors");

    const classReport = ClassReport.parse(largeClassJSON);

    ClassReport.getFormats().forEach((format) => {
      test(`formatName: ${format.name}`, () => {
        const output = classReport.toFormat(format.name);

        expect(output).toMatchSnapshot();
      });
    });
  });
});

describe("MethodReport:", () => {
  describe("toFormat (large-method/classmethod):", () => {
    const largeMethodJSON = require("@ponticus/escomplex-test-data/files/large-method/json/classmethod");

    const methodReport = ClassMethodReport.parse(largeMethodJSON);

    ClassMethodReport.getFormats().forEach((format) => {
      test(`formatName: ${format.name}`, () => {
        const output = methodReport.toFormat(format.name);

        expect(output).toMatchSnapshot();
      });
    });
  });

  describe("toFormat (large-method/classmethod-with-errors):", () => {
    const largeMethodJSON = require("@ponticus/escomplex-test-data/files/large-method/json/classmethod-with-errors");

    const methodReport = ClassMethodReport.parse(largeMethodJSON);

    ClassMethodReport.getFormats().forEach((format) => {
      test(`formatName: ${format.name}`, () => {
        const output = methodReport.toFormat(format.name);

        expect(output).toMatchSnapshot();
      });
    });
  });

  describe("toFormat (large-method/modulemethod):", () => {
    const largeMethodJSON = require("@ponticus/escomplex-test-data/files/large-method/json/modulemethod");

    const methodReport = ModuleMethodReport.parse(largeMethodJSON);

    ModuleMethodReport.getFormats().forEach((format) => {
      test(`formatName: ${format.name}`, () => {
        const output = methodReport.toFormat(format.name);

        expect(output).toMatchSnapshot();
      });
    });
  });

  describe("toFormat (large-method/modulemethod-with-errors):", () => {
    const largeMethodJSON = require("@ponticus/escomplex-test-data/files/large-method/json/modulemethod-with-errors");

    const methodReport = ModuleMethodReport.parse(largeMethodJSON);

    ModuleMethodReport.getFormats().forEach((format) => {
      test(`formatName: ${format.name}`, () => {
        const output = methodReport.toFormat(format.name);

        expect(output).toMatchSnapshot();
      });
    });
  });
});

describe("ModuleReport:", () => {
  describe("toFormat (large-module/module):", () => {
    const largeModuleJSON = require("@ponticus/escomplex-test-data/files/large-module/json/module");

    const moduleReport = ModuleReport.parse(largeModuleJSON);

    ModuleReport.getFormats().forEach((format) => {
      test(`formatName: ${format.name}`, () => {
        const output = moduleReport.toFormat(format.name);

        expect(output).toMatchSnapshot();
      });
    });
  });

  describe("toFormat (large-module/module-with-errors):", () => {
    const largeModuleJSON = require("@ponticus/escomplex-test-data/files/large-module/json/module-with-errors");

    const moduleReport = ModuleReport.parse(largeModuleJSON);

    ModuleReport.getFormats().forEach((format) => {
      test(`formatName: ${format.name}`, () => {
        const output = moduleReport.toFormat(format.name);

        expect(output).toMatchSnapshot();
      });
    });
  });
});

describe("ProjectReport:", () => {
  describe("toFormat (large-project/project):", () => {
    const largeProjectJSON = require("@ponticus/escomplex-test-data/files/large-project/json/project");

    const projectResult = ProjectReport.parse(largeProjectJSON);

    ProjectReport.getFormats().forEach((format) => {
      test(`formatName: ${format.name}`, () => {
        const output = projectResult.toFormat(format.name);

        expect(output).toMatchSnapshot();
      });
    });
  });

  describe("toFormat (large-project/project-no-modules):", () => {
    const largeProjectJSON = require("@ponticus/escomplex-test-data/files/large-project/json/project-no-modules");

    const projectResult = ProjectReport.parse(largeProjectJSON);

    ProjectReport.getFormats().forEach((format) => {
      test(`formatName: ${format.name}`, () => {
        const output = projectResult.toFormat(format.name);

        expect(output).toMatchSnapshot();
      });
    });
  });

  describe("toFormat (large-project/project-with-errors):", () => {
    const largeProjectJSON = require("@ponticus/escomplex-test-data/files/large-project/json/project-with-errors");

    const projectResult = ProjectReport.parse(largeProjectJSON);

    ProjectReport.getFormats().forEach((format) => {
      test(`formatName: ${format.name}`, () => {
        const output = projectResult.toFormat(format.name);

        expect(output).toMatchSnapshot();
      });
    });
  });
});
