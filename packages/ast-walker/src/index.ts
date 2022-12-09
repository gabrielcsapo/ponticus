import { type PluginEvent } from "@ponticus/plugin-manager";

import ASTWalker from "@ponticus/ast-walker/ASTWalker";

export { ASTWalker };

/**
 * Default walker instance.
 */
const walker = new ASTWalker();

/**
 * Provides a default ASTWalker instance.
 */
export default walker;

/**
 * Wires up walker on the plugin eventbus.
 *
 * @param ev - The plugin event.
 *
 */
export function onPluginLoad(ev: PluginEvent) {
  let eventPrepend = "typhonjs";

  const options = ev.pluginOptions;

  // Apply any plugin options.
  if (typeof options === "object") {
    // If `eventPrepend` is defined then it is prepended before all event bindings.
    if (typeof options.eventPrepend === "string") {
      eventPrepend = `${options.eventPrepend}:`;
    }
  }

  ev.eventbus?.on(`${eventPrepend}:ast:walker:traverse`, walker.traverse);
}
