import HalsteadArray from "./HalsteadArray.js";
import Trait from "./Trait.js";
import TraitUtil from "./TraitUtil.js";

/**
 * Provides a helper method to format core traits for escomplex processing.
 *
 * @param lloc - Logical lines of code
 * @param cyclomatic - The number of linearly independent paths through source code.
 * @param operators - An operator carries out an action.
 * @param operands - An operand participates in such an action (operator).
 * @param ignoreKeys - Provides a list of AST node children keys to skip traversal.
 * @param newScope - Creates a new `class` or `method` scope for report generation.
 * @param dependencies - An import / require dependency.
 *
 */
export default function (
  lloc = 0,
  cyclomatic = 0,
  operators = void 0,
  operands = void 0,
  ignoreKeys = void 0,
  newScope = void 0,
  dependencies = void 0
): {
  lloc: Trait;
  cyclomatic: Trait;
  operators: HalsteadArray;
  operands: HalsteadArray;
  ignoreKeys: Trait;
  newScope: Trait;
  dependencies: Trait;
} {
  // Do not wrap ignoreKeys in an array if it is `null` or a `function`. For functions this allows Trait evaluation
  // via `Trait->valueOf` to return `null` and not `null` wrapped in an `array`.
  const ignoreKeysPassthru =
    ignoreKeys === null || typeof ignoreKeys === "function";

  return {
    lloc: new Trait("lloc", lloc),
    cyclomatic: new Trait("cyclomatic", cyclomatic),
    operators: new HalsteadArray("operators", TraitUtil.safeArray(operators)),
    operands: new HalsteadArray("operands", TraitUtil.safeArray(operands)),
    ignoreKeys: new Trait(
      "ignoreKeys",
      ignoreKeysPassthru ? ignoreKeys : TraitUtil.safeArray(ignoreKeys)
    ),
    newScope: new Trait("newScope", newScope),
    dependencies: new Trait("dependencies", dependencies),
  };
}
