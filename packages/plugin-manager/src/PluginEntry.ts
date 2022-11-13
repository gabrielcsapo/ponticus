import { type EventEmitter } from "events";

/**
 * Defines a class holding the data associated with a plugin including its instance.
 */
export default class PluginEntry {
  /**
   * Data describing the plugin, manager, and optional module data.
   * @internal
   */
  _data: any;

  /**
   * The plugin enabled state.
   * @internal
   */
  _enabled: boolean;

  /**
   * The plugin name.
   * @internal
   */
  _name: string;

  /**
   * The loaded plugin instance.
   * @internal
   */
  _instance: any;

  /**
   * An EventEmitter associated with the plugin wrapping the plugin manager eventbus.
   * @internal
   */
  _eventProxy: EventEmitter | undefined;

  /**
   * Instantiates a PluginEntry.
   *
   * @param  name - The plugin name.
   *
   * @param data - Data describing the plugin, manager, and optional module data.
   *
   * @param instance - The loaded plugin instance.
   *
   * @param eventProxy - An EventEmitter associated with the plugin wrapping the plugin manager eventbus.
   */
  constructor(
    name: string,
    data: any,
    instance: any,
    eventProxy: EventEmitter | undefined
  ) {
    this._data = data;
    this._enabled = true;
    this._name = name;
    this._instance = instance;
    this._eventProxy = eventProxy;
  }

  /**
   * Provides a convenience method to escape file paths.
   *
   * @param value - A string to escape.
   *
   */
  static escape(value: string): string {
    if (typeof value !== "string") {
      throw new TypeError(`'value' is not a 'string'`);
    }

    // Remove any leading relative directory paths.
    let escaped = value.replace(/^(\.\.|\.)/, "");

    // Escape any forward / reverse slashes for RegExp creation.
    escaped = escaped.replace(/[\\]/g, "\\");
    // eslint-disable-next-line no-useless-escape
    escaped = escaped.replace(/[\/]/g, "\\/");

    return escaped;
  }

  /**
   * Get plugin data.
   */
  get data() {
    return this._data;
  }

  /**
   * Get enabled.
   */
  get enabled() {
    return this._enabled;
  }

  /**
   * Set enabled.
   *
   * @param enabled - New enabled state.
   */
  set enabled(enabled: boolean) {
    this._enabled = enabled;
  }

  /**
   * Get associated EventProxy.
   */
  get eventProxy(): EventEmitter | undefined {
    return this._eventProxy;
  }

  set eventProxy(eventProxy: EventEmitter | undefined) {
    this._eventProxy = eventProxy;
  }

  /**
   * Get plugin instance.
   */
  get instance() {
    return this._instance;
  }

  /**
   * Get plugin name.
   */
  get name(): string {
    return this._name;
  }
}
