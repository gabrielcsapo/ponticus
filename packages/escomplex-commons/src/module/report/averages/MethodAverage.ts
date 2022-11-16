import HalsteadAverage from "./HalsteadAverage.js";

import ObjectUtil from "../../../utils/ObjectUtil.js";

/**
 * Provides all the averaged method metric data.
 */
export default class MethodAverage {
  /**
   * Measures the average method cyclomatic complexity of the module / class.
   */
  cyclomatic: number;
  /**
   * Measures the average method cyclomatic density of the module / class.
   */
  cyclomaticDensity: number;
  /**
   * Stores the averaged Halstead metric data.
   */
  halstead: HalsteadAverage;
  /**
   * Measures the average number of method parameters for the module / class.
   */
  paramCount: number;
  /**
   * Measures the average source lines of code for the module / class.
   */
  sloc: { logical: number; physical: number };

  constructor() {
    this.cyclomatic = 0;
    this.cyclomaticDensity = 0;
    this.halstead = new HalsteadAverage();
    this.paramCount = 0;
    this.sloc = { logical: 0, physical: 0 };
  }

  /**
   * Returns the object accessor list / keys for MethodAverage.
   */
  get keys(): string[] {
    return s_AVERAGE_KEYS;
  }
}

/**
 * Defines the default method average accessor list / keys.
 */
const s_AVERAGE_KEYS: string[] = ObjectUtil.getAccessorList(
  new MethodAverage()
);
