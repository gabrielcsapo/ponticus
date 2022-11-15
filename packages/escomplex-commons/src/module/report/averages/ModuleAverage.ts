import MethodAverage from "./MethodAverage.js";

import ObjectUtil from "../../../utils/ObjectUtil.js";

/**
 * Provides all the averaged module metric data.
 */
export default class ModuleAverage {
  methodAverage: MethodAverage;
  /**
   * Measures the average method maintainability index for the module / file.
   */
  maintainability: number;
  /**
   * Initializes the default averaged module data.
   */
  constructor() {
    this.methodAverage = new MethodAverage();
    this.maintainability = 0;
  }

  /**
   * Returns the object accessor list / keys for ModuleAverage.
   */
  get keys(): string[] {
    return s_AVERAGE_KEYS;
  }
}

/**
 * Defines the default module average accessor list / keys.
 */
const s_AVERAGE_KEYS: string[] = ObjectUtil.getAccessorList(
  new ModuleAverage()
);
