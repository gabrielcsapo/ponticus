import { type EventEmitter } from "events";

/**
 * Provides the data / event passed to all invoked methods in {@link PluginManager#invokeSyncEvent}. The
 * `event.data` field is returned to the caller. Before returning though additional the following additional metadata
 * is attached:
 *
 * (number)          `$$plugin_invoke_count` - The count of plugins invoked.
 *
 * (Array<string>)   `$$plugin_invoke_names` - The names of plugins invoked.
 */
export default class PluginEvent {
  /**
   * Provides the unified event data assigning any pass through data to the copied data supplied.
   */
  data: any;

  /**
   * Stores any extra event data added to all PluginEvents.
   */
  extra: any;

  /**
   * The active EventProxy for that particular plugin.
   */
  eventbus: EventEmitter | undefined;

  /**
   * The active plugin name.
   */
  pluginName: string | undefined;

  /**
   * The active plugin options.
   */
  pluginOptions: any;

  /**
   * settings for the plugin instance
   */
  settings: any;

  /**
   * list of keys to ignore
   */
  ignoreKeys: any;

  /**
   * All loaded trait syntaxes for AST nodes
   */
  syntaxes: any;

  /**
   * Initializes PluginEvent.
   *
   * @param copyProps - Event data to copy.
   * @param passthruProps - Event data to pass through.
   * @param extraEventData - Extra event data attached to `extra`.
   */
  constructor(copyProps = {}, passthruProps = {}, extraEventData = void 0) {
    this.data = Object.assign(
      JSON.parse(JSON.stringify(copyProps)),
      passthruProps
    );
    this.extra = extraEventData;
    this.eventbus = void 0;
    this.pluginName = void 0;
    this.pluginOptions = void 0;
  }
}
