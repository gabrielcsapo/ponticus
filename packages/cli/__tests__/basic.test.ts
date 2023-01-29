import { test, describe, expect, beforeEach, afterEach, vi } from "vitest";
import yargs from "yargs";
import AnalyzeCommand from "@ponticus/cli/cmds/analyze";

describe("analyer command", () => {
  let originalArgv;

  beforeEach(() => {
    // Remove all cached modules. The cache needs to be cleared before running
    // each command, otherwise you will see the same results from the command
    // run in your first test in subsequent tests.
    vi.resetModules();

    // Each test overwrites process arguments so store the original arguments
    originalArgv = process.argv;
  });

  afterEach(() => {
    vi.resetAllMocks();

    // Set process arguments back to the original value
    process.argv = originalArgv;
  });

  test("the test runner should run tests", () => {
    expect(true).toBe(true);
  });

  test("returns help output", async () => {
    // Initialize parser using the command module
    const parser = yargs([]).command(AnalyzeCommand);

    // Run the command module with --help as argument
    const output = await new Promise((resolve) => {
      parser.parse("--help", (err, argv, output) => {
        resolve(output);
      });
    });

    // Verify the output is correct
    expect(output).toContain(
      "analyze  Perform a complexity analysis for the given input"
    );
  });
});
