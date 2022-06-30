import fs from "fs-extra";
import { test, describe, expect } from "vitest";

import ClassReport from "../../../src/module/report/ClassReport";
import ClassMethodReport from "../../../src/module/report/ClassMethodReport";
import ModuleMethodReport from "../../../src/module/report/ModuleMethodReport";
import ModuleReport from "../../../src/module/report/ModuleReport";
import ProjectReport from "../../../src/project/report/ProjectReport";

import TransformFormat from "../../../src/transform/TransformFormat";

import * as testconfig from "../testconfig";

// Uncomment to generate matching format test data.
// generateFormatData();
runTests();

/**
 * Runs the tests
 */
function runTests() {
  if (testconfig.modules["transformFormat"]) {
    describe("transform:", () => {
      describe("TransformFormat:", () => {
        describe("forEach / formatReport (large-module/module):", () => {
          const largeModuleJSON = require("@ponticus/escomplex-test-data/files/large-module/json/module");

          const moduleReport = ModuleReport.parse(largeModuleJSON);

          TransformFormat.forEach((format, formatName) => {
            if (TransformFormat.isSupported(formatName, moduleReport.type)) {
              test(`formatName: ${formatName}`, () => {
                const output = format.formatReport(moduleReport);

                const original = fs.readFileSync(
                  `./__tests__/fixture/files/large-module/module/module-${formatName}.${format.extension}`,
                  "utf8"
                );

                expect(output).toBe(original);
              });
            }
          });
        });

        describe("forEach / formatReport (large-project/project-no-modules):", () => {
          const largeProjectJSON = require("@ponticus/escomplex-test-data/files/large-project/json/project-no-modules");

          const projectResult = ProjectReport.parse(largeProjectJSON);

          TransformFormat.forEach((format, formatName) => {
            if (TransformFormat.isSupported(formatName, projectResult.type)) {
              test(`formatName: ${formatName}`, () => {
                const output = format.formatReport(projectResult);

                const original = fs.readFileSync(
                  `./__tests__/fixture/files/large-project/project-no-modules/project-${formatName}.${format.extension}`,
                  "utf8"
                );

                expect(output).toBe(original);
              });
            }
          });
        });
      });

      describe("ClassReport:", () => {
        describe("toFormat (large-class/class):", () => {
          const largeClassJSON = require("@ponticus/escomplex-test-data/files/large-class/json/class");

          const classReport = ClassReport.parse(largeClassJSON);

          ClassReport.getFormats().forEach((format) => {
            test(`formatName: ${format.name}`, () => {
              const output = classReport.toFormat(format.name);

              const original = fs.readFileSync(
                `./__tests__/fixture/files/large-class/class/class-${format.name}.${format.extension}`,
                "utf8"
              );

              expect(output).toBe(original);
            });
          });
        });

        describe("toFormat (large-module/class-with-errors):", () => {
          const largeClassJSON = require("@ponticus/escomplex-test-data/files/large-class/json/class-with-errors");

          const classReport = ClassReport.parse(largeClassJSON);

          ClassReport.getFormats().forEach((format) => {
            test(`formatName: ${format.name}`, () => {
              const output = classReport.toFormat(format.name);

              const original = fs.readFileSync(
                `./__tests__/fixture/files/large-class/class-with-errors/class-${format.name}.${format.extension}`,
                "utf8"
              );

              expect(output).toBe(original);
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

              const original = fs.readFileSync(
                `./__tests__/fixture/files/large-method/classmethod/classmethod-${format.name}.${format.extension}`,
                "utf8"
              );

              expect(output).toBe(original);
            });
          });
        });

        describe("toFormat (large-method/classmethod-with-errors):", () => {
          const largeMethodJSON = require("@ponticus/escomplex-test-data/files/large-method/json/classmethod-with-errors");

          const methodReport = ClassMethodReport.parse(largeMethodJSON);

          ClassMethodReport.getFormats().forEach((format) => {
            test(`formatName: ${format.name}`, () => {
              const output = methodReport.toFormat(format.name);

              const original = fs.readFileSync(
                `./__tests__/fixture/files/large-method/classmethod-with-errors/classmethod-${format.name}.${format.extension}`,
                "utf8"
              );

              expect(output).toBe(original);
            });
          });
        });

        describe("toFormat (large-method/modulemethod):", () => {
          const largeMethodJSON = require("@ponticus/escomplex-test-data/files/large-method/json/modulemethod");

          const methodReport = ModuleMethodReport.parse(largeMethodJSON);

          ModuleMethodReport.getFormats().forEach((format) => {
            test(`formatName: ${format.name}`, () => {
              const output = methodReport.toFormat(format.name);

              const original = fs.readFileSync(
                `./__tests__/fixture/files/large-method/modulemethod/modulemethod-${format.name}.${format.extension}`,
                "utf8"
              );

              expect(output).toBe(original);
            });
          });
        });

        describe("toFormat (large-method/modulemethod-with-errors):", () => {
          const largeMethodJSON = require("@ponticus/escomplex-test-data/files/large-method/json/modulemethod-with-errors");

          const methodReport = ModuleMethodReport.parse(largeMethodJSON);

          ModuleMethodReport.getFormats().forEach((format) => {
            test(`formatName: ${format.name}`, () => {
              const output = methodReport.toFormat(format.name);

              const original = fs.readFileSync(
                `./__tests__/fixture/files/large-method/modulemethod-with-errors/modulemethod-${format.name}.${format.extension}`,
                "utf8"
              );

              expect(output).toBe(original);
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

              const original = fs.readFileSync(
                `./__tests__/fixture/files/large-module/module/module-${format.name}.${format.extension}`,
                "utf8"
              );

              expect(output).toBe(original);
            });
          });
        });

        describe("toFormat (large-module/module-with-errors):", () => {
          const largeModuleJSON = require("@ponticus/escomplex-test-data/files/large-module/json/module-with-errors");

          const moduleReport = ModuleReport.parse(largeModuleJSON);

          ModuleReport.getFormats().forEach((format) => {
            test(`formatName: ${format.name}`, () => {
              const output = moduleReport.toFormat(format.name);

              const original = fs.readFileSync(
                `./__tests__/fixture/files/large-module/module-with-errors/module-${format.name}.${format.extension}`,
                "utf8"
              );

              expect(output).toBe(original);
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

              const original = fs.readFileSync(
                `./__tests__/fixture/files/large-project/project/project-${format.name}.${format.extension}`,
                "utf8"
              );

              expect(output).toBe(original);
            });
          });
        });

        describe("toFormat (large-project/project-no-modules):", () => {
          const largeProjectJSON = require("@ponticus/escomplex-test-data/files/large-project/json/project-no-modules");

          const projectResult = ProjectReport.parse(largeProjectJSON);

          ProjectReport.getFormats().forEach((format) => {
            test(`formatName: ${format.name}`, () => {
              const output = projectResult.toFormat(format.name);

              const original = fs.readFileSync(
                `./__tests__/fixture/files/large-project/project-no-modules/project-${format.name}.${format.extension}`,
                "utf8"
              );

              expect(output).toBe(original);
            });
          });
        });

        describe("toFormat (large-project/project-with-errors):", () => {
          const largeProjectJSON = require("@ponticus/escomplex-test-data/files/large-project/json/project-with-errors");

          const projectResult = ProjectReport.parse(largeProjectJSON);

          ProjectReport.getFormats().forEach((format) => {
            test(`formatName: ${format.name}`, () => {
              const output = projectResult.toFormat(format.name);

              const original = fs.readFileSync(
                `./__tests__/fixture/files/large-project/project-with-errors/project-${format.name}.${format.extension}`,
                "utf8"
              );

              expect(output).toBe(original);
            });
          });
        });
      });
    });
  }
}

/**
 * Generates the original module report / project result test data.
 */
/*
function generateFormatData()
{
   // Empty formatted result / report matching test data.
   fs.emptyDirSync('./__tests__/fixture/files/large-class/class');
   fs.emptyDirSync('./__tests__/fixture/files/large-class/class-with-errors');
   fs.emptyDirSync('./__tests__/fixture/files/large-method/classmethod');
   fs.emptyDirSync('./__tests__/fixture/files/large-method/classmethod-with-errors');
   fs.emptyDirSync('./__tests__/fixture/files/large-method/modulemethod');
   fs.emptyDirSync('./__tests__/fixture/files/large-method/modulemethod-with-errors');
   fs.emptyDirSync('./__tests__/fixture/files/large-module/module');
   fs.emptyDirSync('./__tests__/fixture/files/large-module/module-with-errors');
   fs.emptyDirSync('./__tests__/fixture/files/large-project/project');
   fs.emptyDirSync('./__tests__/fixture/files/large-project/project-no-modules');
   fs.emptyDirSync('./__tests__/fixture/files/large-project/project-with-errors');

   // Generate project result formatted test data.

   const largeClassJSON = require('@ponticus/escomplex-test-data/files/large-class/json/class');
   const classReport = ClassReport.parse(largeClassJSON);

   ClassReport.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(classReport);

         fs.writeFileSync(
          `./__tests__/fixture/files/large-class/class/class-${format.name}.${format.extension}`, output, 'utf8');
      });
   });

   const largeClassJSON2 = require('@ponticus/escomplex-test-data/files/large-class/json/class-with-errors');
   const classReport2 = ClassReport.parse(largeClassJSON2);

   ClassReport.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(classReport2);

         fs.writeFileSync(
          `./__tests__/fixture/files/large-class/class-with-errors/class-${format.name}.${format.extension}`, output,
           'utf8');
      });
   });

   const largeClassMethodJSON = require('@ponticus/escomplex-test-data/files/large-method/json/classmethod');
   const classMethodReport = ClassMethodReport.parse(largeClassMethodJSON);

   ClassMethodReport.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(classMethodReport);

         fs.writeFileSync(
          `./__tests__/fixture/files/large-method/classmethod/classmethod-${format.name}.${format.extension}`, output,
           'utf8');
      });
   });

   const largeClassMethodJSON2 = require(
    '@ponticus/escomplex-test-data/files/large-method/json/classmethod-with-errors');
   const classMethodReport2 = ClassMethodReport.parse(largeClassMethodJSON2);

   ClassMethodReport.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(classMethodReport2);

         fs.writeFileSync(
          `./__tests__/fixture/files/large-method/classmethod-with-errors/classmethod-${format.name}.${format.extension}`,
           output, 'utf8');
      });
   });

   const largeModuleMethodJSON = require('@ponticus/escomplex-test-data/files/large-method/json/modulemethod');
   const moduleMethodReport = ModuleMethodReport.parse(largeModuleMethodJSON);

   ModuleMethodReport.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(moduleMethodReport);

         fs.writeFileSync(
          `./__tests__/fixture/files/large-method/modulemethod/modulemethod-${format.name}.${format.extension}`, output,
           'utf8');
      });
   });

   const largeModuleMethodJSON2 = require(
    '@ponticus/escomplex-test-data/files/large-method/json/modulemethod-with-errors');
   const moduleMethodReport2 = ModuleMethodReport.parse(largeModuleMethodJSON2);

   ModuleMethodReport.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(moduleMethodReport2);

         fs.writeFileSync(
          `./__tests__/fixture/files/large-method/modulemethod-with-errors/modulemethod-${format.name}.${format.extension}`,
           output, 'utf8');
      });
   });

   const largeModuleJSON = require('@ponticus/escomplex-test-data/files/large-module/json/module');
   const moduleReport = ModuleReport.parse(largeModuleJSON);

   ModuleReport.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(moduleReport);

         fs.writeFileSync(
          `./__tests__/fixture/files/large-module/module/module-${format.name}.${format.extension}`, output, 'utf8');
      });
   });

   const largeModuleJSON2 = require('@ponticus/escomplex-test-data/files/large-module/json/module-with-errors');
   const moduleReport2 = ModuleReport.parse(largeModuleJSON2);

   ModuleReport.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(moduleReport2);

         fs.writeFileSync(
          `./__tests__/fixture/files/large-module/module-with-errors/module-${format.name}.${format.extension}`, output,
           'utf8');
      });
   });

   // Generate module report formatted test data.

   const largeProjectJSON = require('@ponticus/escomplex-test-data/files/large-project/json/project');
   const projectResult = ProjectReport.parse(largeProjectJSON);

   ProjectReport.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(projectResult);

         fs.writeFileSync(
          `./__tests__/fixture/files/large-project/project/project-${format.name}.${format.extension}`, output, 'utf8');
      });
   });

   const largeProjectJSON2 = require('@ponticus/escomplex-test-data/files/large-project/json/project-no-modules');
   const projectResult2 = ProjectReport.parse(largeProjectJSON2);

   ProjectReport.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(projectResult2);

         fs.writeFileSync(
          `./__tests__/fixture/files/large-project/project-no-modules/project-${format.name}.${format.extension}`, output,
           'utf8');
      });
   });

   const largeProjectJSON3 = require('@ponticus/escomplex-test-data/files/large-project/json/project-with-errors');
   const projectResult3 = ProjectReport.parse(largeProjectJSON3);

   ProjectReport.getFormats().forEach((format) =>
   {
      test(`generate formatName: ${format.name}`, () =>
      {
         const output = format.formatReport(projectResult3);

         fs.writeFileSync(
          `./__tests__/fixture/files/large-project/project-with-errors/project-${format.name}.${format.extension}`, output,
           'utf8');
      });
   });
}
*/
