import { test, describe, expect, beforeEach } from "vitest";

import { EventEmitter } from "events";

import PluginManager from "../../src/PluginManager.ts";

/**
 * A plugin class
 */
class PluginTest {
  /**
   * Increments a result count.
   * @param event - A plugin event (PluginEvent).
   */
  test(event) {
    event.data.result.count++;
    expect(event.pluginName).toBe("PluginTest");
  }

  /**
   * Register event bindings
   * @param ev - A plugin event (PluginEvent).
   */
  onPluginLoad(ev) {
    if (ev.eventbus) {
      ev.eventbus.on("test:trigger", () => {});
      ev.eventbus.on("test:trigger2", () => {});
      ev.eventbus.on("test:trigger3", () => {});
    }
  }
}

/**
 * A plugin object
 */
const pluginTest = {
  test: (event) => {
    event.data.result.count++;
    expect(event.pluginName).toBe("pluginTest");
  },

  onPluginLoad: (ev) => {
    if (ev.eventbus) {
      ev.eventbus.on("test:trigger", () => {});
      ev.eventbus.on("test:trigger4", () => {});
      ev.eventbus.on("test:trigger5", () => {});
    }
  },
};

/**
 * Increments a result count.
 */
class PluginTestNoName2 {
  /**
   * Increments a result count.
   * @param event - A plugin event (PluginEvent).
   */
  test2(event) {
    event.data.result.count++;
  }
}

/**
 * Defines an asynchronous test class.
 */
class PluginTestAsync {
  /**
   * A ctor
   */
  constructor() {
    this.c = 3;
  }

  /**
   * Provides a delayed promise.
   */
  onPluginLoad() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  }

  /**
   * Returns a number result.
   * @param a - A number.
   * @param b - A number.
   */
  test(a, b) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(a + b + this.c), 1000);
    });
  }

  /**
   * Increments a result count after a 1 second delay.
   * @param event - A plugin event (PluginEvent).
   */
  test2(event) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(event.data.result.count++), 1000);
    });
  }
}

/**
 * Defines a synchronous test class.
 */
class PluginTestSync {
  /**
   * A ctor
   */
  constructor() {
    this.c = 3;
  }

  /**
   * Returns a number result.
   * @param a - A number.
   * @param b - A number.
   */
  test(a, b) {
    return a + b + this.c;
  }
}

describe("PluginManager:", () => {
  let pluginManager, testData;

  beforeEach(() => {
    pluginManager = new PluginManager({ eventbus: new EventEmitter() });
    testData = { result: { count: 0 } };
  });

  test("PluginManager constructor function is exported", () => {
    expect(typeof PluginManager).toBe("function");
  });

  test("PluginManager instance is object", () => {
    expect(typeof pluginManager).toBe("object");
  });

  test("invokeAsyncEvent - PluginManager throws when called with empty parameters", async () => {
    try {
      await pluginManager.invokeAsyncEvent();
    } catch (err) {
      return;
    }

    throw new Error("invokeAsyncEvent should have thrown an error");
  });

  test("invokeSyncEvent - PluginManager throws when called with empty parameters", () => {
    expect(() => {
      pluginManager.invokeSyncEvent();
    }).toThrow();
  });

  test("PluginManager throws w/ add (no options)", async () => {
    try {
      await pluginManager.add();
    } catch (err) {
      return;
    }

    throw new Error("No error thrown: should not reach here!");
  });

  test("PluginManager return undefined for createEventProxy when no eventbus is assigned", () => {
    pluginManager = new PluginManager();
    expect(pluginManager.createEventProxy()).not.toBeDefined();
  });

  test("PluginManager returns EventProxy for createEventProxy when eventbus is assigned", () => {
    expect(pluginManager.createEventProxy() instanceof EventEmitter).toBe(true);
  });

  test("invokeAsyncEvent - PluginManager has empty result", async () => {
    const event = await pluginManager.invokeAsyncEvent("test");

    expect(typeof event).toBe("object");
    expect(Object.keys(event).length).toBe(2);
    expect(event.$$plugin_invoke_count).toBe(0);
  });

  test("invokeSyncEvent - PluginManager has empty result", () => {
    const event = pluginManager.invokeSyncEvent("test");

    expect(typeof event).toBe("object");
    expect(Object.keys(event).length).toBe(2);
    expect(event.$$plugin_invoke_count).toBe(0);
  });

  test("invokeAsyncEvent - PluginManager w/ plugin and missing method has empty event result", async () => {
    pluginManager.add({ name: "PluginTest", instance: new PluginTest() });

    const event = await pluginManager.invokeAsyncEvent("nop");

    expect(typeof event).toBe("object");
    expect(Object.keys(event).length).toBe(2);
    expect(event.$$plugin_invoke_count).toBe(0);
  });

  test("invokeSyncEvent - PluginManager w/ plugin and missing method has empty event result", () => {
    pluginManager.add({ name: "PluginTest", instance: new PluginTest() });

    const event = pluginManager.invokeSyncEvent("nop");

    expect(typeof event).toBe("object");
    expect(Object.keys(event).length).toBe(2);
    expect(event.$$plugin_invoke_count).toBe(0);
  });

  test("invokeAsyncEvent - PluginManager has valid test / class result (pass through)", async () => {
    pluginManager.add({ name: "PluginTest", instance: new PluginTest() });

    const event = await pluginManager.invokeAsyncEvent(
      "test",
      void 0,
      testData
    );

    expect(typeof event).toBe("object");
    expect(event.result.count).toBe(1);
    expect(testData.result.count).toBe(1);
    expect(event.$$plugin_invoke_count).toBe(1);
  });

  test("invokeSyncEvent - PluginManager has valid test / class result (pass through)", () => {
    pluginManager.add({ name: "PluginTest", instance: new PluginTest() });

    const event = pluginManager.invokeSyncEvent("test", void 0, testData);

    expect(typeof event).toBe("object");
    expect(event.result.count).toBe(1);
    expect(testData.result.count).toBe(1);
    expect(event.$$plugin_invoke_count).toBe(1);
  });

  test("invokeAsyncEvent - PluginManager has valid test / object result (pass through)", async () => {
    pluginManager.add({ name: "pluginTest", instance: pluginTest });

    const event = await pluginManager.invokeAsyncEvent(
      "test",
      void 0,
      testData
    );

    expect(typeof event).toBe("object");
    expect(event.result.count).toBe(1);
    expect(testData.result.count).toBe(1);
  });

  test("invokeSyncEvent - PluginManager has valid test / object result (pass through)", () => {
    pluginManager.add({ name: "pluginTest", instance: pluginTest });

    const event = pluginManager.invokeSyncEvent("test", void 0, testData);

    expect(typeof event).toBe("object");
    expect(event.result.count).toBe(1);
    expect(testData.result.count).toBe(1);
  });

  test("invokeAsyncEvent - PluginManager has invoked both plugins (pass through)", async () => {
    pluginManager.add({ name: "PluginTest", instance: new PluginTest() });
    pluginManager.add({ name: "pluginTest", instance: pluginTest });

    const event = await pluginManager.invokeAsyncEvent(
      "test",
      void 0,
      testData
    );

    expect(typeof event).toBe("object");
    expect(event.result.count).toBe(2);
    expect(testData.result.count).toBe(2);
  });

  test("invokeSyncEvent - PluginManager has invoked both plugins (pass through)", () => {
    pluginManager.add({ name: "PluginTest", instance: new PluginTest() });
    pluginManager.add({ name: "pluginTest", instance: pluginTest });

    const event = pluginManager.invokeSyncEvent("test", void 0, testData);

    expect(typeof event).toBe("object");
    expect(event.result.count).toBe(2);
    expect(testData.result.count).toBe(2);
  });

  test("invokeAsyncEvent - PluginManager has valid test / class result (copy)", async () => {
    pluginManager.add({ name: "PluginTest", instance: new PluginTest() });

    const event = await pluginManager.invokeAsyncEvent("test", testData);

    expect(typeof event).toBe("object");
    expect(event.result.count).toBe(1);
    expect(testData.result.count).toBe(0);
    expect(event.$$plugin_invoke_count).toBe(1);
    expect(event.$$plugin_invoke_names[0]).toBe("PluginTest");
  });

  test("invokeSyncEvent - PluginManager has valid test / class result (copy)", () => {
    pluginManager.add({ name: "PluginTest", instance: new PluginTest() });

    const event = pluginManager.invokeSyncEvent("test", testData);

    expect(typeof event).toBe("object");
    expect(event.result.count).toBe(1);
    expect(testData.result.count).toBe(0);
    expect(event.$$plugin_invoke_count).toBe(1);
    expect(event.$$plugin_invoke_names[0]).toBe("PluginTest");
  });

  test("invokeAsyncEvent - PluginManager has valid test / object result (copy)", async () => {
    pluginManager.add({ name: "pluginTest", instance: pluginTest });

    const event = await pluginManager.invokeAsyncEvent("test", testData);

    expect(typeof event).toBe("object");
    expect(event.result.count).toBe(1);
    expect(testData.result.count).toBe(0);
  });

  test("invokeSyncEvent - PluginManager has valid test / object result (copy)", () => {
    pluginManager.add({ name: "pluginTest", instance: pluginTest });

    const event = pluginManager.invokeSyncEvent("test", testData);

    expect(typeof event).toBe("object");
    expect(event.result.count).toBe(1);
    expect(testData.result.count).toBe(0);
  });

  test("invokeAsyncEvent - PluginManager has invoked both plugins (copy)", async () => {
    pluginManager.add({ name: "PluginTest", instance: new PluginTest() });
    pluginManager.add({ name: "pluginTest", instance: pluginTest });

    const event = await pluginManager.invokeAsyncEvent("test", testData);

    expect(typeof event).toBe("object");
    expect(event.result.count).toBe(2);
    expect(testData.result.count).toBe(0);
  });

  test("invokeSyncEvent - PluginManager has invoked both plugins (copy)", () => {
    pluginManager.add({ name: "PluginTest", instance: new PluginTest() });
    pluginManager.add({ name: "pluginTest", instance: pluginTest });

    const event = pluginManager.invokeSyncEvent("test", testData);

    expect(typeof event).toBe("object");
    expect(event.result.count).toBe(2);
    expect(testData.result.count).toBe(0);
  });

  test("invokeAsyncEvent - PluginManager has invoked both plugins (copy)", async () => {
    await pluginManager.addAsync({
      name: "PluginTestAsync",
      instance: new PluginTestAsync(),
    });
    await pluginManager.addAsync({
      name: "PluginTestAsync2",
      instance: new PluginTestAsync(),
    });

    const event = await pluginManager.invokeAsyncEvent("test2", testData);

    expect(typeof event).toBe("object");
    expect(event.result.count).toBe(2);
    expect(testData.result.count).toBe(0);
  });

  test("invoke - PluginManager has invoked with no results", () => {
    let invoked = false;

    pluginManager.add({
      name: "PluginTestSync",
      instance: {
        test: () => {
          invoked = true;
        },
      },
    });

    pluginManager.invoke("test", void 0, "PluginTestSync");

    expect(invoked).toBe(true);
  });

  test("promise - invokeAsync - PluginManager has invoked one result (async)", async () => {
    return pluginManager
      .addAsync({ name: "PluginTestAsync", instance: new PluginTestAsync() })
      .then(() => {
        return pluginManager
          .invokeAsync("test", [1, 2], "PluginTestAsync")
          .then((results) => {
            expect(typeof results).toBe("number");
            expect(results).toBe(6);
          });
      });
  });

  test("promise - invokeAsync - PluginManager has invoked two results (async)", async () => {
    return pluginManager
      .addAllAsync([
        { name: "PluginTestAsync", instance: new PluginTestAsync() },
        { name: "PluginTestAsync2", instance: new PluginTestAsync() },
      ])
      .then(() => {
        return pluginManager.invokeAsync("test", [1, 2]).then((results) => {
          expect(Array.isArray(results)).toBe(true);
          expect(typeof results[0]).toBe("number");
          expect(typeof results[1]).toBe("number");
          expect(results[0]).toBe(6);
          expect(results[1]).toBe(6);
        });
      });
  });

  test("async / await - invokeAsync - PluginManager has invoked one result (async)", async () => {
    await pluginManager.addAsync({
      name: "PluginTestAsync",
      instance: new PluginTestAsync(),
    });

    const results = await pluginManager.invokeAsync(
      "test",
      [1, 2],
      "PluginTestAsync"
    );

    expect(typeof results).toBe("number");
    expect(results).toBe(6);
  });

  test("async / await - invokeAsync - PluginManager has invoked two results (async)", async () => {
    await pluginManager.addAsync({
      name: "PluginTestAsync",
      instance: new PluginTestAsync(),
    });
    await pluginManager.addAsync({
      name: "PluginTestAsync2",
      instance: new PluginTestAsync(),
    });

    const results = await pluginManager.invokeAsync("test", [1, 2]);

    expect(Array.isArray(results)).toBe(true);
    expect(typeof results[0]).toBe("number");
    expect(typeof results[1]).toBe("number");
    expect(results[0]).toBe(6);
    expect(results[1]).toBe(6);
  });

  test("invokeSync - PluginManager has invoked one result (sync)", () => {
    pluginManager.add({
      name: "PluginTestSync",
      instance: new PluginTestSync(),
    });

    const result = pluginManager.invokeSync("test", [1, 2], "PluginTestSync");

    expect(typeof result).toBe("number");
    expect(result).toBe(6);
  });

  test("invokeSync - PluginManager has invoked two results (sync)", () => {
    pluginManager.add({
      name: "PluginTestSync",
      instance: new PluginTestSync(),
    });
    pluginManager.add({
      name: "PluginTestSync2",
      instance: new PluginTestSync(),
    });

    const result = pluginManager.invokeSync("test", [1, 2]);

    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toBe(6);
    expect(result[1]).toBe(6);
  });

  test("PluginConfig is valid", () => {
    expect(pluginManager.isValidConfig({ name: "test" })).toBe(true);
    expect(
      pluginManager.isValidConfig({ name: "test", target: "target" })
    ).toBe(true);
    expect(
      pluginManager.isValidConfig({
        name: "test",
        target: "target",
        options: {},
      })
    ).toBe(true);
    expect(pluginManager.isValidConfig({ name: "test", options: {} })).toBe(
      true
    );
  });

  test("PluginConfig is invalid", () => {
    expect(pluginManager.isValidConfig()).toBe(false);
    expect(pluginManager.isValidConfig({})).toBe(false);
    expect(pluginManager.isValidConfig({ name: 123 })).toBe(false);
    expect(pluginManager.isValidConfig({ target: "target" })).toBe(false);
    expect(pluginManager.isValidConfig({ options: {} })).toBe(false);
    expect(pluginManager.isValidConfig({ name: "test", target: 123 })).toBe(
      false
    );
    expect(
      pluginManager.isValidConfig({
        name: "test",
        target: "target",
        options: 123,
      })
    ).toBe(false);
    expect(pluginManager.isValidConfig({ name: "test", options: 123 })).toBe(
      false
    );
  });

  test("PluginManager get unique method names", () => {
    pluginManager.add({
      name: "PluginTestSync",
      instance: new PluginTestSync(),
    });
    pluginManager.add({
      name: "PluginTestNoName2",
      instance: new PluginTestNoName2(),
    });

    const results = pluginManager.getMethodNames();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(2);
    expect(results[0]).toBe("test");
    expect(results[1]).toBe("test2");
  });

  test("PluginManager get plugin data", () => {
    pluginManager.add(
      { name: "PluginTestSync", instance: new PluginTestSync() },
      { name: "modulename" }
    );

    const results = pluginManager.getPluginData("PluginTestSync");

    expect(typeof results).toBe("object");

    expect(JSON.stringify(results)).toBeTruthy();
  });

  test("PluginManager get all plugin data", () => {
    pluginManager.addAll(
      [
        { name: "PluginTestSync", instance: new PluginTestSync() },
        { name: "PluginTestNoName2", instance: new PluginTestNoName2() },
      ],
      { name: "modulename" }
    );

    const results = pluginManager.getAllPluginData();

    expect(Array.isArray(results)).toBe(true);

    expect(JSON.stringify(results)).toBeTruthy();
  });

  test("PluginManager get plugin event names", () => {
    pluginManager.add({ name: "PluginTest", instance: new PluginTest() });
    pluginManager.add({ name: "pluginTest", instance: pluginTest });

    let results = pluginManager.getPluginsEventNames();

    expect(JSON.stringify(results)).toBeTruthy();

    results = pluginManager.getPluginsEventNames("PluginTest");

    expect(JSON.stringify(results)).toBeTruthy();

    results = pluginManager.getPluginsEventNames("pluginTest");

    expect(JSON.stringify(results)).toBeTruthy();
  });

  test("PluginManager get plugin name from event name", () => {
    pluginManager.add({ name: "PluginTest", instance: new PluginTest() });
    pluginManager.add({ name: "pluginTest", instance: pluginTest });

    expect(() => pluginManager.getPluginsByEventName()).toThrow();

    let results = pluginManager.getPluginsByEventName("test:trigger");

    expect(JSON.stringify(results)).toBeTruthy();

    results = pluginManager.getPluginsByEventName("test:trigger2");

    expect(JSON.stringify(results)).toBeTruthy();

    results = pluginManager.getPluginsByEventName("test:trigger4");

    expect(JSON.stringify(results)).toBeTruthy();
  });

  test("PluginManager get plugin names", () => {
    pluginManager.add({
      name: "PluginTestSync",
      instance: new PluginTestSync(),
    });
    pluginManager.add({
      name: "PluginTestSync2",
      instance: new PluginTestSync(),
    });

    const results = pluginManager.getPluginNames();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(2);
    expect(results[0]).toBe("PluginTestSync");
    expect(results[1]).toBe("PluginTestSync2");
  });

  test("PluginManager get plugin event names", () => {
    pluginManager.add({
      name: "PluginTestSync",
      instance: new PluginTestSync(),
    });
    pluginManager.add({
      name: "PluginTestSync2",
      instance: new PluginTestSync(),
    });

    const results = pluginManager.getPluginNames();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(2);
    expect(results[0]).toBe("PluginTestSync");
    expect(results[1]).toBe("PluginTestSync2");
  });

  test("PluginManager get plugin / method names", () => {
    pluginManager.add({
      name: "PluginTestSync",
      instance: new PluginTestSync(),
    });
    pluginManager.add({
      name: "PluginTestNoName2",
      instance: new PluginTestNoName2(),
    });

    const results = pluginManager.getPluginMethodNames();

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(2);
    expect(results[0].plugin).toBe("PluginTestSync");
    expect(results[0].method).toBe("test");
    expect(results[1].plugin).toBe("PluginTestNoName2");
    expect(results[1].method).toBe("test2");
  });
});
