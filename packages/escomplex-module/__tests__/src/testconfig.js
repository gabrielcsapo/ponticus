/**
 * Defines which modules to run tests.
 */
export const modules = {
  moduleAPI: true,
  moduleCore: true,
  moduleES6: true,
  moduleES7: true,
  moduleES8: true,
  moduleES9: true,
  moduleES10: true,
  moduleFlow: true,
  moduleStage2: true,
  moduleStage3: true,
  moduleTypescript: true,
};

/**
 * Defines which parsers to use in testing.
 */
export const parsers = {
  acorn: true,
  babelParser: true,
  babylon: true,
  espree: true,
  esprima: true,
};

/**
 * Potentially enables extra debug statements to output AST and report JSON in `./parsers.js`
 */
export const parserDebug = false;
