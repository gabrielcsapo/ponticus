"use strict";


export interface Rules {
    quotes: any[];
    semi: any[];
    curly: string[];
    "no-dupe-keys": number;
    "func-names": any[];
}

export interface Env {
    es6: boolean;
    browser: boolean;
}

export interface EcmaFeatures {
    jsx: boolean;
    experimentalObjectRestSpread: boolean;
    modules: boolean;
}

export interface ParserOptions {
    sourceType: string;
    ecmaFeatures: EcmaFeatures;
    babelOptions?: object;
}

export interface ESLintBase {
    rules: Rules;
    env: Env;
    globals: string[];
    parserOptions: ParserOptions;
}


const DefaultESLintBase: ESLintBase = {
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
};
export default DefaultESLintBase;