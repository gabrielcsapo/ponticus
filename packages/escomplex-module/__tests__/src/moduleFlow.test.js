import parsers from "./parsers";
import * as testconfig from "./testconfig";

if (testconfig.modules["moduleFlow"]) {
  parsers.forEach((parser) => {
    if (parser.name !== "babylon" && parser.name !== "babelParser") {
      return;
    }

    describe(`(${parser.name}): module (Flow Typing):`, () => {
      describe("basic function:", () => {
        let report;

        beforeEach(() => {
          report = parser.analyze(
            "function foo<T: { x: number }>(obj: T): T { console.log(Math.abs(obj.x)); return obj; }",
            void 0,
            void 0,
            { flow: true }
          );
        });

        afterEach(() => {
          report = undefined;
        });

        test("aggregate has correct logical lines of code", () => {
          expect(report.aggregate.sloc.logical).toBe(4);
        });

        test("aggregate has correct cyclomatic complexity", () => {
          expect(report.aggregate.cyclomatic).toBe(2);
        });

        test("functions has correct length", () => {
          expect(report.methods.length).toBe(1);
        });

        test("method has correct name", () => {
          expect(report.methods[0].name).toBe("foo");
        });

        test("method has correct physical lines of code", () => {
          expect(report.methods[0].sloc.physical).toBe(1);
        });

        test("method has correct logical lines of code", () => {
          expect(report.methods[0].sloc.logical).toBe(3);
        });

        test("method has correct cyclomatic complexity", () => {
          expect(report.methods[0].cyclomatic).toBe(1);
        });

        test("method has correct parameter count", () => {
          expect(report.methods[0].paramCount).toBe(1);
        });

        test("aggregate has correct Halstead total operators", () => {
          expect(report.aggregate.halstead.operators.total).toBe(7);
        });

        test("aggregate has correct Halstead distinct operators", () => {
          expect(report.aggregate.halstead.operators.distinct).toBe(4);
        });

        test("aggregate has correct Halstead total operands", () => {
          expect(report.aggregate.halstead.operands.total).toBe(11);
        });

        test("aggregate has correct Halstead distinct operands", () => {
          expect(report.aggregate.halstead.operands.distinct).toBe(8);
        });

        test("aggregate has correct Halstead length", () => {
          expect(report.aggregate.halstead.length).toBe(18);
        });

        test("aggregate has correct Halstead vocabulary", () => {
          expect(report.aggregate.halstead.vocabulary).toBe(12);
        });

        test("aggregate has correct Halstead difficulty", () => {
          expect(report.aggregate.halstead.difficulty).toBe(2.75);
        });

        test("method has correct Halstead length", () => {
          expect(report.methods[0].halstead.length).toBe(15);
        });

        test("method has correct Halstead vocabulary", () => {
          expect(report.methods[0].halstead.vocabulary).toBe(10);
        });

        test("method has correct Halstead difficulty", () => {
          expect(report.methods[0].halstead.difficulty).toBe(1.929);
        });

        test("method has correct Halstead volume", () => {
          expect(report.methods[0].halstead.volume).toBe(49.829);
        });

        test("method has correct Halstead effort", () => {
          expect(report.methods[0].halstead.effort).toBe(96.099);
        });

        test("method has correct Halstead bugs", () => {
          expect(report.methods[0].halstead.bugs).toBe(0.017);
        });

        test("method has correct Halstead time", () => {
          expect(report.methods[0].halstead.time).toBe(5.339);
        });

        test("maintainability index is correct", () => {
          expect(report.maintainability).toBe(144.43);
        });

        test("aggregate has correct parameter count", () => {
          expect(report.aggregate.paramCount).toBe(1);
        });
      });
    });
  });
}
