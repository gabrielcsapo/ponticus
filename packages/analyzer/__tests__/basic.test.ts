import { test, describe, expect } from "vitest";

import { analyse } from "../src/index";

describe("Basic Test", () => {
  test("the test runner should run tests", () => {
    expect(true).toBe(true);
  });

  test("calling analyse has the expected output", () => {
    expect(analyse("const x=5;")).toMatchSnapshot();
  });
});
