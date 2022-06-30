import { test, describe, expect, beforeEach } from "vitest";

import TyphonEvents from "../../src/TyphonEvents";

/* eslint-disable no-undef */

describe("EventProxy", () => {
  let callbacks, eventbus, proxy;

  beforeEach(() => {
    callbacks = {};
    eventbus = new TyphonEvents();
    proxy = eventbus.createEventProxy();
  });

  test("get name", () => {
    eventbus.setEventbusName("testname");

    expect(proxy.getEventbusName() === "testname").toBeTruthy();
  });

  test("forEachEvent", () => {
    const callback1 = () => {};
    const callback2 = () => {};
    const callback3 = () => {};
    const callback3A = () => {};

    const context1 = {};
    const context2 = {};
    const context3 = {};
    const context3A = {};

    const allCallbacks = [callback1, callback2, callback3, callback3A];
    const allContexts = [context1, context2, context3, context3A];
    const allNames = [
      "test:trigger",
      "test:trigger2",
      "test:trigger3",
      "test:trigger3",
    ];

    // Proxy will not list this event on the main eventbus.
    eventbus.on("can:not:see:this", () => {});

    proxy.on("test:trigger", callback1, context1);
    proxy.on("test:trigger2", callback2, context2);
    proxy.on("test:trigger3", callback3, context3);
    proxy.on("test:trigger3", callback3A, context3A);

    let cntr = 0;

    proxy.forEachEvent((name, callback, context) => {
      expect(name).toBe(allNames[cntr]);
      expect(callback).toBe(allCallbacks[cntr]);
      expect(context).toBe(allContexts[cntr]);
      cntr++;
    });
  });

  test("getEventNames", () => {
    eventbus.on("can:not:see:this", () => {});

    proxy.on("test:trigger", () => {});
    proxy.on("test:trigger2", () => {});
    proxy.on("test:trigger3", () => {});
    proxy.on("test:trigger3", () => {});

    const eventNames = proxy.getEventNames();

    expect(JSON.stringify(eventNames)).toBe(
      '["test:trigger","test:trigger2","test:trigger3"]'
    );
  });

  test("trigger (on / off)", () => {
    callbacks.testTriggerCount = 0;

    proxy.on("test:trigger", () => {
      callbacks.testTriggerCount++;
    });
    eventbus.on("test:trigger2", () => {
      callbacks.testTriggerCount++;
    });

    proxy.trigger("test:trigger");
    proxy.trigger("test:trigger2");
    eventbus.trigger("test:trigger2");

    expect(callbacks.testTriggerCount).toBe(3);

    proxy.off();

    expect(proxy.eventCount).toBe(0);

    eventbus.trigger("test:trigger");
    eventbus.trigger("test:trigger2");

    expect(callbacks.testTriggerCount).toBe(4);
  });

  test("trigger (on / off - name)", () => {
    callbacks.testTriggerCount = 0;

    eventbus.on("test:trigger", () => {
      callbacks.testTriggerCount++;
    });
    proxy.on("test:trigger", () => {
      callbacks.testTriggerCount++;
    });
    proxy.on("test:trigger2", () => {
      callbacks.testTriggerCount++;
    });

    eventbus.trigger("test:trigger");
    proxy.trigger("test:trigger");
    proxy.trigger("test:trigger2");

    expect(callbacks.testTriggerCount).toBe(5);

    proxy.off("test:trigger");

    expect(proxy.eventCount).toBe(1);

    proxy.trigger("test:trigger");
    eventbus.trigger("test:trigger");

    proxy.trigger("test:trigger2");

    proxy.off("test:trigger2");

    expect(proxy.eventCount).toBe(0);

    proxy.trigger("test:trigger2");
    eventbus.trigger("test:trigger2");

    expect(callbacks.testTriggerCount).toBe(6);
  });

  test("trigger (on / off - callback)", () => {
    callbacks.testTriggerCount = 0;

    const callback1 = () => {
      callbacks.testTriggerCount++;
    };
    const callback2 = () => {
      callbacks.testTriggerCount++;
    };

    eventbus.on("test:trigger", callback1);
    proxy.on("test:trigger", callback1);
    proxy.on("test:trigger2", callback2);

    eventbus.trigger("test:trigger");
    proxy.trigger("test:trigger");
    proxy.trigger("test:trigger2");

    expect(callbacks.testTriggerCount).toBe(5);

    proxy.off(void 0, callback1);

    expect(proxy.eventCount).toBe(1);

    proxy.trigger("test:trigger");
    eventbus.trigger("test:trigger");

    proxy.trigger("test:trigger2");

    proxy.off(void 0, callback2);

    expect(proxy.eventCount).toBe(0);

    proxy.trigger("test:trigger2");
    eventbus.trigger("test:trigger2");

    expect(callbacks.testTriggerCount).toBe(6);
  });

  test("trigger (on / off - callback)", () => {
    callbacks.testTriggerCount = 0;

    const context = {};

    eventbus.on(
      "test:trigger",
      () => {
        callbacks.testTriggerCount++;
      },
      context
    );
    proxy.on(
      "test:trigger",
      () => {
        callbacks.testTriggerCount++;
      },
      context
    );
    proxy.on(
      "test:trigger2",
      () => {
        callbacks.testTriggerCount++;
      },
      callbacks
    );

    eventbus.trigger("test:trigger");
    proxy.trigger("test:trigger");
    proxy.trigger("test:trigger2");

    expect(callbacks.testTriggerCount).toBe(5);

    proxy.off(void 0, void 0, context);

    expect(proxy.eventCount).toBe(1);

    proxy.trigger("test:trigger");
    eventbus.trigger("test:trigger");

    proxy.trigger("test:trigger2");

    proxy.off(void 0, void 0, callbacks);

    expect(proxy.eventCount).toBe(0);

    proxy.trigger("test:trigger2");
    eventbus.trigger("test:trigger2");

    expect(callbacks.testTriggerCount).toBe(6);
  });

  test("trigger (destroy)", () => {
    callbacks.testTriggerCount = 0;

    proxy.on("test:trigger", () => {
      callbacks.testTriggerCount++;
    });
    proxy.on("test:trigger2", () => {
      callbacks.testTriggerCount++;
    });
    eventbus.on("test:trigger3", () => {
      callbacks.testTriggerCount++;
    });

    expect(eventbus.eventCount).toBe(3);
    expect(proxy.eventCount).toBe(2);

    proxy.trigger("test:trigger");
    proxy.trigger("test:trigger2");
    proxy.trigger("test:trigger3");
    eventbus.trigger("test:trigger");
    eventbus.trigger("test:trigger2");
    eventbus.trigger("test:trigger3");

    expect(callbacks.testTriggerCount).toBe(6);

    proxy.destroy();

    expect(eventbus.eventCount).toBe(1);
    expect(proxy.eventCount).toBe(0);

    eventbus.trigger("test:trigger");
    eventbus.trigger("test:trigger2");
    eventbus.trigger("test:trigger3");

    expect(callbacks.testTriggerCount).toBe(7);

    const testError = (err) => {
      expect(err instanceof ReferenceError).toBeTruthy();
      expect(err.message).toBe("This EventProxy instance has been destroyed.");
    };

    // Ensure that proxy is destroyed and all methods throw a ReferenceError.
    try {
      proxy.destroy();
    } catch (err) {
      testError(err);
    }

    try {
      proxy.getEventbusName();
    } catch (err) {
      testError(err);
    }

    try {
      proxy.off();
    } catch (err) {
      testError(err);
    }

    try {
      proxy.on("test:bogus", testError);
    } catch (err) {
      testError(err);
    }

    try {
      proxy.trigger("test:trigger");
    } catch (err) {
      testError(err);
    }

    try {
      proxy.triggerAsync("test:trigger");
    } catch (err) {
      testError(err);
    }

    try {
      proxy.triggerDefer("test:trigger");
    } catch (err) {
      testError(err);
    }

    try {
      proxy.triggerSync("test:trigger");
    } catch (err) {
      testError(err);
    }

    expect(callbacks.testTriggerCount).toBe(7);
  });

  test("triggerDefer", (done) => {
    callbacks.testTriggerCount = 0;

    proxy.on("test:trigger", () => {
      callbacks.testTriggerCount++;
    });
    proxy.on("test:trigger2", () => {
      callbacks.testTriggerCount++;
    });

    expect(eventbus.eventCount).toBe(2);
    expect(proxy.eventCount).toBe(2);

    proxy.triggerDefer("test:trigger");
    eventbus.triggerDefer("test:trigger2");

    setTimeout(() => {
      expect(callbacks.testTriggerCount).toBe(2);
      done();
    }, 0);
  });

  test("triggerSync-0", () => {
    const result = proxy.triggerSync("test:trigger:sync0");

    expect(Array.isArray(result)).not.toBe(true);
    expect(result).not.toBeDefined();
  });

  test("triggerSync-1", () => {
    proxy.on("test:trigger:sync1", () => {
      callbacks.testTriggerSync1 = true;
      return "foo";
    });

    expect(eventbus.eventCount).toBe(1);
    expect(proxy.eventCount).toBe(1);

    const result = eventbus.triggerSync("test:trigger:sync1");

    expect(callbacks.testTriggerSync1).toBe(true);
    expect(Array.isArray(result)).not.toBe(true);
    expect(result).toBe("foo");
  });

  test("triggerSync-2", () => {
    proxy.on("test:trigger:sync2", () => {
      callbacks.testTriggerSync2A = true;
      return "foo";
    });
    proxy.on("test:trigger:sync2", () => {
      callbacks.testTriggerSync2B = true;
      return "bar";
    });

    expect(eventbus.eventCount).toBe(2);
    expect(proxy.eventCount).toBe(2);

    const results = eventbus.triggerSync("test:trigger:sync2");

    expect(callbacks.testTriggerSync2A).toBe(true);
    expect(callbacks.testTriggerSync2B).toBe(true);
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(2);
    expect(results[0]).toBe("foo");
    expect(results[1]).toBe("bar");
  });

  test("triggerSync (on / off)", () => {
    expect(eventbus.eventCount).toBe(0);
    expect(proxy.eventCount).toBe(0);

    proxy.on("test:trigger:sync:off", () => {
      callbacks.testTriggerSyncOff = true;
      return true;
    });

    expect(eventbus.eventCount).toBe(1);
    expect(proxy.eventCount).toBe(1);

    proxy.off("test:trigger:sync:off");

    expect(eventbus.eventCount).toBe(0);
    expect(proxy.eventCount).toBe(0);

    expect(eventbus.triggerSync("test:trigger:sync:off")).not.toBeDefined();
    expect(callbacks.testTriggerSyncOff).not.toBeDefined();
  });

  test("triggerSync (Promise)", async () => {
    proxy.on("test:trigger:sync:then", () => {
      callbacks.testTriggerSyncThen = true;
      return Promise.resolve("foobar");
    });

    expect(eventbus.eventCount).toBe(1);
    expect(proxy.eventCount).toBe(1);

    const promise = eventbus.triggerSync("test:trigger:sync:then");

    expect(promise instanceof Promise).toBeTruthy();

    await promise.then((result) => {
      expect(callbacks.testTriggerSyncThen).toBe(true);
      expect(result).toBe("foobar");
    });
  });

  test("triggerAsync", async () => {
    proxy.on("test:trigger:async", () => {
      callbacks.testTriggerAsync = true;
      return "foo";
    });
    proxy.on("test:trigger:async", () => {
      callbacks.testTriggerAsync2 = true;
      return "bar";
    });

    expect(eventbus.eventCount).toBe(2);
    expect(proxy.eventCount).toBe(2);

    const promise = eventbus.triggerAsync("test:trigger:async");

    expect(promise instanceof Promise).toBeTruthy();

    // triggerAsync resolves all Promises by Promise.all() so result is an array.
    await promise.then((result) => {
      expect(callbacks.testTriggerAsync).toBe(true);
      expect(callbacks.testTriggerAsync2).toBe(true);
      expect(result[0]).toBe("foo");
      expect(result[1]).toBe("bar");
    });
  });
});
