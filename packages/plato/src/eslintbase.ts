"use strict";

import { ESLintBase } from "@ponticus/types";

export const DefaultESLintBase: ESLintBase = {
  rules: {
    quotes: [2, "single"],
    semi: [2, "always"],
    curly: ["error"],
    "no-dupe-keys": 2,
    "func-names": [1, "always"],
  },
  env: {
    es6: true,
    browser: true,
  },
  globals: ["__dirname", "module", "exports", "process", "require"],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      modules: true,
    },
  },
};;