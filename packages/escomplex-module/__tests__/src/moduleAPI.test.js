import { test, describe, expect } from "vitest";

import * as testconfig from "./testconfig";

import escomplex from "../../src";

if (testconfig.modules["moduleAPI"]) {
  describe("module (API): ", () => {
    test("analyze function is exported", () => {
      expect(typeof escomplex.analyze).toBe("function");
    });

    test("analyze does not throw with valid arguments", () => {
      expect(() => {
        escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        });
      }).not.toThrow();
    });

    test("analyze throws when ast is string", () => {
      expect(() => {
        escomplex.analyze('console.log("foo");');
      }).toThrow();
    });

    test("analyze throws when ast is array", () => {
      expect(() => {
        escomplex.analyze([]);
      }).toThrow();
    });

    test("analyze returns object", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        })
      ).toBe("object");
    });

    test("analyzeAsync returns object", () => {
      const promise = escomplex.analyzeAsync({
        body: [],
        loc: {
          start: {
            line: 0,
          },
          end: {
            line: 0,
          },
        },
      });

      promise.then((report) => {
        expect(typeof report).toBe("object");
      });
    });

    test("analyze returns aggregate object", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).aggregate
      ).toBe("object");
    });

    test("analyze returns aggregate lines of code property", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).aggregate.sloc
      ).toBe("object");
    });

    test("analyze returns aggregate physical lines of code property", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).aggregate.sloc.physical
      ).toBe("number");
    });

    test("analyze returns aggregate logical lines of code property", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).aggregate.sloc.logical
      ).toBe("number");
    });

    test("analyze returns aggregate cyclomatic complexity property", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).aggregate.cyclomatic
      ).toBe("number");
    });

    test("analyze returns aggregate cyclomatic complexity density property", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).aggregate.cyclomaticDensity
      ).toBe("number");
    });

    test("analyze returns aggregate halstead property", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).aggregate.halstead
      ).toBe("object");
    });

    test("analyze returns aggregate halstead operators property", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).aggregate.halstead.operators
      ).toBe("object");
    });

    test("analyze returns aggregate halstead total operators property", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).aggregate.halstead.operators.total
      ).toBe("number");
    });

    test("analyze returns aggregate halstead distinct operators property", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).aggregate.halstead.operators.distinct
      ).toBe("number");
    });

    test("analyze returns aggregate halstead operator identifiers property", () => {
      expect(
        Array.isArray(
          escomplex.analyze({
            body: [],
            loc: {
              start: {
                line: 0,
              },
              end: {
                line: 0,
              },
            },
          }).aggregate.halstead.operators.identifiers
        )
      ).toBe(true);
    });

    test("analyze returns aggregate halstead operands property", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).aggregate.halstead.operands
      ).toBe("object");
    });

    test("analyze returns aggregate halstead total operands property", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).aggregate.halstead.operands.total
      ).toBe("number");
    });

    test("analyze returns aggregate halstead distinct operands property", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).aggregate.halstead.operands.distinct
      ).toBe("number");
    });

    test("analyze returns aggregate halstead operand identifiers property", () => {
      expect(
        Array.isArray(
          escomplex.analyze({
            body: [],
            loc: {
              start: {
                line: 0,
              },
              end: {
                line: 0,
              },
            },
          }).aggregate.halstead.operands.identifiers
        )
      ).toBe(true);
    });

    test("analyze returns maintainability property", () => {
      expect(
        typeof escomplex.analyze({
          body: [],
          loc: {
            start: {
              line: 0,
            },
            end: {
              line: 0,
            },
          },
        }).maintainability
      ).toBe("number");
    });

    test("analyze returns methods property", () => {
      expect(
        Array.isArray(
          escomplex.analyze({
            body: [],
            loc: {
              start: {
                line: 0,
              },
              end: {
                line: 0,
              },
            },
          }).methods
        )
      ).toBe(true);
    });

    test("analyze returns dependencies property", () => {
      expect(
        Array.isArray(
          escomplex.analyze({
            body: [],
            loc: {
              start: {
                line: 0,
              },
              end: {
                line: 0,
              },
            },
          }).dependencies
        )
      ).toBe(true);
    });
  });
}
