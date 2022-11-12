import { test, describe, expect } from "vitest";

import escomplex from "../../src";

describe("escomplex:", () => {
  test("analyzeModule function is exported", () => {
    expect(typeof escomplex.analyzeModule).toBe("function");
  });

  test("analyzeModuleAST function is exported", () => {
    expect(typeof escomplex.analyzeModuleAST).toBe("function");
  });

  test("analyzeProject function is exported", () => {
    expect(typeof escomplex.analyzeProject).toBe("function");
  });

  test("analyzeProjectAST function is exported", () => {
    expect(typeof escomplex.analyzeProjectAST).toBe("function");
  });

  test("parse function is exported", () => {
    expect(typeof escomplex.parse).toBe("function");
  });

  test("processProject function is exported", () => {
    expect(typeof escomplex.processProject).toBe("function");
  });

  test("analyzeModuleAsync function is exported", () => {
    expect(typeof escomplex.analyzeModuleAsync).toBe("function");
  });

  test("analyzeModuleASTAsync function is exported", () => {
    expect(typeof escomplex.analyzeModuleASTAsync).toBe("function");
  });

  test("analyzeProjectAsync function is exported", () => {
    expect(typeof escomplex.analyzeProjectAsync).toBe("function");
  });

  test("analyzeProjectASTAsync function is exported", () => {
    expect(typeof escomplex.analyzeProjectASTAsync).toBe("function");
  });

  test("parseAsync function is exported", () => {
    expect(typeof escomplex.parseAsync).toBe("function");
  });

  test("processProjectAsync function is exported", () => {
    expect(typeof escomplex.processProjectAsync).toBe("function");
  });

  test("sanity test - analyzeModule", () => {
    const result = escomplex.analyzeModule(
      "class Foo {}; class Bar extends Foo { constructor() { super(); } }"
    );

    expect(typeof result).toBe("object");
    expect(result.aggregate.sloc.logical).toBe(4);
  });

  test("sanity test - analyzeModuleAST", () => {
    const ast = escomplex.parse(
      "class Foo {}; class Bar extends Foo { constructor() { super(); } }"
    );

    expect(typeof ast).toBe("object");
    expect(ast.type).toBe("File");
    expect(typeof ast.program).toBe("object");

    const result = escomplex.analyzeModuleAST(ast);

    expect(typeof result).toBe("object");
    expect(result.aggregate.sloc.logical).toBe(4);
  });

  test("sanity test - analyzeProject", () => {
    const sources = [
      {
        code: "class Foo {}; class Bar extends Foo { constructor() { super(); } }",
        srcPath: "/path/to/file/a",
      },
      {
        code: "const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];",
        srcPath: "/path/to/file/b",
      },
    ];

    const results = escomplex.analyzeProject(sources);

    expect(typeof results).toBe("object");
    expect(Array.isArray(results.modules)).toBe(true);
    expect(results.modules.length).toBe(2);
    expect(typeof results.modules[0]).toBe("object");
    expect(results.modules[0].aggregate.sloc.logical).toBe(4);
    expect(results.modules[1].aggregate.sloc.logical).toBe(2);
  });

  test("sanity test - analyzeProjectAST", () => {
    const modules = [
      {
        ast: escomplex.parse(
          "class Foo {}; class Bar extends Foo { constructor() { super(); } }"
        ),
        srcPath: "/path/to/file/a",
      },
      {
        ast: escomplex.parse(
          "const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];"
        ),
        srcPath: "/path/to/file/b",
      },
    ];

    const results = escomplex.analyzeProjectAST(modules);

    expect(typeof results).toBe("object");
    expect(Array.isArray(results.modules)).toBe(true);
    expect(results.modules.length).toBe(2);
    expect(typeof results.modules[0]).toBe("object");
    expect(results.modules[0].aggregate.sloc.logical).toBe(4);
    expect(results.modules[1].aggregate.sloc.logical).toBe(2);
  });

  test("sanity test - parse", () => {
    const ast = escomplex.parse(
      "class Foo {}; class Bar extends Foo { constructor() { super(); } }"
    );

    expect(typeof ast).toBe("object");
    expect(ast.type).toBe("File");
    expect(typeof ast.program).toBe("object");
  });

  test("sanity test - processProject", () => {
    const sources = [
      {
        code: "class Foo {}; class Bar extends Foo { constructor() { super(); } }",
        srcPath: "/path/to/file/a",
      },
      {
        code: "const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];",
        srcPath: "/path/to/file/b",
      },
    ];

    let results = escomplex.analyzeProject(sources, {
      skipCalculation: true,
    });

    results = escomplex.processProject(results);

    expect(typeof results).toBe("object");
    expect(Array.isArray(results.modules)).toBe(true);
    expect(results.modules.length).toBe(2);
    expect(typeof results.modules[0]).toBe("object");
    expect(results.modules[0].aggregate.sloc.logical).toBe(4);
    expect(results.modules[1].aggregate.sloc.logical).toBe(2);
  });

  test("sanity test - analyzeModuleAsync", () => {
    const promise = escomplex.analyzeModuleAsync(
      "class Foo {}; class Bar extends Foo { constructor() { super(); } }"
    );

    promise.then((result) => {
      expect(typeof result).toBe("object");
      expect(result.aggregate.sloc.logical).toBe(4);
    });
  });

  test("sanity test - analyzeModuleASTAsync", () => {
    const ast = escomplex.parse(
      "class Foo {}; class Bar extends Foo { constructor() { super(); } }"
    );

    expect(typeof ast).toBe("object");
    expect(ast.type).toBe("File");
    expect(typeof ast.program).toBe("object");

    const promise = escomplex.analyzeModuleASTAsync(ast);

    promise.then((result) => {
      expect(typeof result).toBe("object");
      expect(result.aggregate.sloc.logical).toBe(4);
    });
  });

  test("sanity test - analyzeProjectAsync", () => {
    const sources = [
      {
        code: "class Foo {}; class Bar extends Foo { constructor() { super(); } }",
        srcPath: "/path/to/file/a",
      },
      {
        code: "const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];",
        srcPath: "/path/to/file/b",
      },
    ];

    const promise = escomplex.analyzeProjectAsync(sources);

    promise.then((results) => {
      expect(typeof results).toBe("object");
      expect(Array.isArray(results.modules)).toBe(true);
      expect(results.modules.length).toBe(2);
      expect(typeof results.modules[0]).toBe("object");
      expect(results.modules[0].aggregate.sloc.logical).toBe(4);
      expect(results.modules[1].aggregate.sloc.logical).toBe(2);
    });
  });

  test("sanity test - analyzeProjectASTAsync", () => {
    const modules = [
      {
        ast: escomplex.parse(
          "class Foo {}; class Bar extends Foo { constructor() { super(); } }"
        ),
        srcPath: "/path/to/file/a",
      },
      {
        ast: escomplex.parse(
          "const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];"
        ),
        srcPath: "/path/to/file/b",
      },
    ];

    const promise = escomplex.analyzeProjectASTAsync(modules);

    promise.then((results) => {
      expect(typeof results).toBe("object");
      expect(Array.isArray(results.modules)).toBe(true);
      expect(results.modules.length).toBe(2);
      expect(typeof results.modules[0]).toBe("object");
      expect(results.modules[0].aggregate.sloc.logical).toBe(4);
      expect(results.modules[1].aggregate.sloc.logical).toBe(2);
    });
  });

  test("sanity test - parseAsync", () => {
    const promise = escomplex.parseAsync(
      "class Foo {}; class Bar extends Foo { constructor() { super(); } }"
    );

    promise.then((ast) => {
      expect(typeof ast).toBe("object");
      expect(ast.type).toBe("File");
      expect(typeof ast.program).toBe("object");
    });
  });

  test("sanity test - processProjectAsync", () => {
    const sources = [
      {
        code: "class Foo {}; class Bar extends Foo { constructor() { super(); } }",
        srcPath: "/path/to/file/a",
      },
      {
        code: "const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];",
        srcPath: "/path/to/file/b",
      },
    ];

    escomplex
      .analyzeProjectAsync(sources, { skipCalculation: true })
      .then((results) => {
        return escomplex.processProjectAsync(results);
      })
      .then((results) => {
        expect(typeof results).toBe("object");
        expect(Array.isArray(results.modules)).toBe(true);
        expect(results.modules.length).toBe(2);
        expect(typeof results.modules[0]).toBe("object");
        expect(results.modules[0].aggregate.sloc.logical).toBe(4);
        expect(results.modules[1].aggregate.sloc.logical).toBe(2);
      });
  });
});
