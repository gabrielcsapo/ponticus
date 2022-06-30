import { test, describe, expect, beforeEach } from "vitest";

import TyphonEvents from "../../src/TyphonEvents";

/* eslint-disable no-undef */

const s_CREATE_TIMED_FUNC = (func, timeout = 1000) => {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => func(resolve, reject), timeout);
    });
  };
};

describe("Events", () => {
  let callbacks, eventbus;

  beforeEach(() => {
    callbacks = {};
    eventbus = new TyphonEvents();
  });

  test("set / get name", () => {
    eventbus.setEventbusName("testname");
    expect(eventbus.getEventbusName()).toBe("testname");

    eventbus = new TyphonEvents("testname2");
    expect(eventbus.getEventbusName()).toBe("testname2");
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

    eventbus.on("test:trigger", callback1, context1);
    eventbus.on("test:trigger2", callback2, context2);
    eventbus.on("test:trigger3", callback3, context3);
    eventbus.on("test:trigger3", callback3A, context3A);

    let cntr = 0;

    eventbus.forEachEvent((name, callback, context) => {
      expect(name).toBe(allNames[cntr]);
      expect(callback).toBe(allCallbacks[cntr]);
      expect(context).toBe(allContexts[cntr]);
      cntr++;
    });
  });

  test("getEventNames", () => {
    eventbus.on("test:trigger", () => {});
    eventbus.on("test:trigger2", () => {});
    eventbus.on("test:trigger3", () => {});
    eventbus.on("test:trigger3", () => {});

    const eventNames = eventbus.getEventNames();

    expect(JSON.stringify(eventNames)).toBe(
      '["test:trigger","test:trigger2","test:trigger3"]'
    );
  });

  test("trigger", () => {
    eventbus.on("test:trigger", () => {
      callbacks.testTrigger = true;
    });
    eventbus.trigger("test:trigger");

    expect(eventbus.eventCount).toBe(1);

    expect(callbacks.testTrigger).toBe(true);
  });

  test("object composition - trigger (on / off)", () => {
    const anObject = {
      events: new TyphonEvents(),
      register: function () {
        this.events.on("test:trigger", this.handler, this);
      },
      testTrigger: 0,
      triggerTest: function () {
        this.events.trigger("test:trigger");
      },
      handler: function () {
        this.testTrigger++;
      },
    };

    anObject.register();
    anObject.triggerTest();

    expect(anObject.events.eventCount).toBe(1);

    expect(anObject.testTrigger).toBe(1);

    anObject.events.off();

    expect(anObject.events.eventCount).toBe(0);

    anObject.triggerTest();
    anObject.triggerTest();

    expect(anObject.testTrigger).toBe(1);
  });

  test("trigger (on / off)", () => {
    callbacks.testTrigger = 0;
    eventbus.on("test:trigger", () => {
      callbacks.testTrigger++;
    });
    eventbus.trigger("test:trigger");

    expect(eventbus.eventCount).toBe(1);

    expect(callbacks.testTrigger).toBe(1);

    eventbus.off();

    expect(eventbus.eventCount).toBe(0);

    eventbus.trigger("test:trigger");
    eventbus.trigger("test:trigger");

    expect(callbacks.testTrigger).toBe(1);
  });

  test("trigger (once)", () => {
    callbacks.testTriggerOnce = 0;
    eventbus.once("test:trigger:once", () => {
      callbacks.testTriggerOnce++;
    });

    expect(eventbus.eventCount).toBe(1);

    eventbus.trigger("test:trigger:once");

    expect(eventbus.eventCount).toBe(0);

    eventbus.trigger("test:trigger:once");

    expect(eventbus.eventCount).toBe(0);

    expect(callbacks.testTriggerOnce).toBe(1);
  });

  test("trigger (listenTo)", () => {
    const test = new TyphonEvents();

    callbacks.testTriggerCount = 0;

    test.listenTo(eventbus, "test:trigger", () => {
      callbacks.testTriggerCount++;
    });

    eventbus.trigger("test:trigger");

    expect(eventbus.eventCount).toBe(1);

    expect(callbacks.testTriggerCount).toBe(1);

    // Test stop listening such that `test:trigger` is no longer registered.
    test.stopListening(eventbus, "test:trigger");

    eventbus.trigger("test:trigger");

    expect(eventbus.eventCount).toBe(0);

    expect(callbacks.testTriggerCount).toBe(1);
  });

  test("trigger (listenToOnce)", () => {
    const test = new TyphonEvents();

    callbacks.testTriggerOnce = 0;

    test.listenToOnce(eventbus, "test:trigger", () => {
      callbacks.testTriggerOnce++;
    });

    expect(eventbus.eventCount).toBe(1);

    eventbus.trigger("test:trigger");

    expect(eventbus.eventCount).toBe(0);

    expect(callbacks.testTriggerOnce).toBe(1);

    eventbus.trigger("test:trigger");

    expect(eventbus.eventCount).toBe(0);

    expect(callbacks.testTriggerOnce).toBe(1);
  });

  test("triggerDefer", (done) => {
    eventbus.on("test:trigger:defer", () => {
      expect(eventbus.eventCount).toBe(1);

      done();
    });

    expect(eventbus.eventCount).toBe(1);

    eventbus.triggerDefer("test:trigger:defer");
  });

  test("triggerDefer (once)", (done) => {
    callbacks.testTriggerOnce = 0;

    eventbus.once("test:trigger:once", () => {
      callbacks.testTriggerOnce++;
    });

    expect(eventbus.eventCount).toBe(1);

    eventbus.on("test:trigger:verify", () => {
      expect(callbacks.testTriggerOnce).toBe(1);

      expect(eventbus.eventCount).toBe(1);

      done();
    });

    expect(eventbus.eventCount).toBe(2);

    eventbus.triggerDefer("test:trigger:once");

    expect(eventbus.eventCount).toBe(2); // Trigger is deferred so 2 events still exist.

    eventbus.triggerDefer("test:trigger:once");

    expect(eventbus.eventCount).toBe(2); // Trigger is deferred so 2 events still exist.

    eventbus.triggerDefer("test:trigger:verify");
  });

  test("triggerDefer (listenTo)", (done) => {
    const test = new TyphonEvents();

    callbacks.testTriggerCount = 0;

    test.listenTo(eventbus, "test:trigger", () => {
      callbacks.testTriggerCount++;
    });

    expect(eventbus.eventCount).toBe(1);

    eventbus.on("test:trigger:verify", () => {
      expect(callbacks.testTriggerCount).toBe(1);

      // Test stop listening such that `test:trigger` is no longer registered.
      test.stopListening(eventbus, "test:trigger");

      expect(eventbus.eventCount).toBe(2);
    });

    expect(eventbus.eventCount).toBe(2);

    eventbus.on("test:trigger:verify:done", () => {
      expect(callbacks.testTriggerCount).toBe(1);

      expect(eventbus.eventCount).toBe(2);

      done();
    });

    expect(eventbus.eventCount).toBe(3);

    eventbus.triggerDefer("test:trigger");

    eventbus.triggerDefer("test:trigger:verify");

    eventbus.triggerDefer("test:trigger");

    eventbus.triggerDefer("test:trigger:verify:done");

    expect(eventbus.eventCount).toBe(3);
  });

  test("triggerDefer (listenToOnce)", (done) => {
    const test = new TyphonEvents();

    callbacks.testTriggerOnce = 0;

    test.listenToOnce(eventbus, "test:trigger", () => {
      callbacks.testTriggerOnce++;

      expect(eventbus.eventCount).toBe(1);
    });

    expect(eventbus.eventCount).toBe(1);

    eventbus.on("test:trigger:verify", () => {
      expect(callbacks.testTriggerOnce).toBe(1);

      expect(eventbus.eventCount).toBe(1);

      done();
    });

    expect(eventbus.eventCount).toBe(2);

    eventbus.triggerDefer("test:trigger");
    eventbus.triggerDefer("test:trigger");
    eventbus.triggerDefer("test:trigger:verify");

    expect(eventbus.eventCount).toBe(2);
  });

  test("triggerSync-0", () => {
    const result = eventbus.triggerSync("test:trigger:sync0");

    expect(eventbus.eventCount).toBe(0);

    expect(Array.isArray(result)).not.toBe(true);
    expect(result).not.toBeDefined();
  });

  test("triggerSync-1", () => {
    eventbus.on("test:trigger:sync1", () => {
      callbacks.testTriggerSync1 = true;
      return "foo";
    });

    expect(eventbus.eventCount).toBe(1);

    const result = eventbus.triggerSync("test:trigger:sync1");

    expect(callbacks.testTriggerSync1).toBe(true);
    expect(Array.isArray(result)).not.toBe(true);
    expect(result).toBe("foo");
  });

  test("triggerSync-2", () => {
    eventbus.on("test:trigger:sync2", () => {
      callbacks.testTriggerSync2A = true;
      return "foo";
    });
    eventbus.on("test:trigger:sync2", () => {
      callbacks.testTriggerSync2B = true;
      return "bar";
    });

    expect(eventbus.eventCount).toBe(2);

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

    eventbus.on("test:trigger:sync:off", () => {
      callbacks.testTriggerSyncOff = true;
      return true;
    });

    expect(eventbus.eventCount).toBe(1);

    eventbus.off("test:trigger:sync:off");

    expect(eventbus.eventCount).toBe(0);

    expect(eventbus.triggerSync("test:trigger:sync:off")).not.toBeDefined();
    expect(callbacks.testTriggerSyncOff).not.toBeDefined();
  });

  test("triggerSync-1 (once)", () => {
    callbacks.testTriggerOnce = 0;

    eventbus.once("test:trigger:once", () => {
      callbacks.testTriggerOnce++;
      return "foo";
    });

    expect(eventbus.eventCount).toBe(1);

    let result = eventbus.triggerSync("test:trigger:once");

    expect(eventbus.eventCount).toBe(0);

    expect(callbacks.testTriggerOnce).toBe(1);
    expect(Array.isArray(result)).not.toBe(true);
    expect(result).toBe("foo");

    result = eventbus.triggerSync("test:trigger:once");

    expect(callbacks.testTriggerOnce).toBe(1);
    expect(result).not.toBeDefined();
  });

  test("triggerSync-1 (listenTo)", () => {
    const test = new TyphonEvents();

    callbacks.testTriggerCount = 0;

    test.listenTo(eventbus, "test:trigger:sync", () => {
      callbacks.testTriggerCount++;
      return "foo";
    });

    expect(eventbus.eventCount).toBe(1);

    let result = eventbus.triggerSync("test:trigger:sync");

    expect(callbacks.testTriggerCount).toBe(1);
    expect(Array.isArray(result)).not.toBe(true);
    expect(result).toBe("foo");

    expect(eventbus.eventCount).toBe(1);

    test.stopListening(eventbus, "test:trigger:sync");

    expect(eventbus.eventCount).toBe(0);

    result = eventbus.triggerSync("test:trigger:sync");

    expect(callbacks.testTriggerCount).toBe(1);
    expect(result).not.toBeDefined();
  });

  test("triggerSync-1 (listenToOnce)", () => {
    const test = new TyphonEvents();

    callbacks.testTriggerOnce = 0;

    test.listenToOnce(eventbus, "test:trigger:once", () => {
      callbacks.testTriggerOnce++;
      return "foo";
    });

    expect(eventbus.eventCount).toBe(1);

    let result = eventbus.triggerSync("test:trigger:once");

    expect(eventbus.eventCount).toBe(0);

    expect(callbacks.testTriggerOnce).toBe(1);
    expect(Array.isArray(result)).not.toBe(true);
    expect(result).toBe("foo");

    result = eventbus.triggerSync("test:trigger:once");

    expect(callbacks.testTriggerOnce).toBe(1);
    expect(result).not.toBeDefined();
  });

  test("triggerSync (Promise)", (done) => {
    eventbus.on("test:trigger:sync:then", () => {
      callbacks.testTriggerSyncThen = true;

      return Promise.resolve("foobar");
    });

    expect(eventbus.eventCount).toBe(1);

    const promise = eventbus.triggerSync("test:trigger:sync:then");

    expect(promise instanceof Promise).toBeTruthy();

    promise.then((result) => {
      expect(callbacks.testTriggerSyncThen).toBe(true);
      expect(result).toBe("foobar");
      done();
    });
  });

  test("promise - triggerAsync", (done) => {
    eventbus.on(
      "test:trigger:async",
      s_CREATE_TIMED_FUNC((resolve) => {
        callbacks.testTriggerAsync = true;
        resolve("foo");
      })
    );

    eventbus.on(
      "test:trigger:async",
      s_CREATE_TIMED_FUNC((resolve) => {
        callbacks.testTriggerAsync2 = true;
        resolve("bar");
      })
    );

    expect(eventbus.eventCount).toBe(2);

    const promise = eventbus.triggerAsync("test:trigger:async");

    expect(promise instanceof Promise).toBeTruthy();

    // triggerAsync resolves all Promises by Promise.all() so result is an array.
    promise.then((result) => {
      expect(callbacks.testTriggerAsync).toBe(true);
      expect(callbacks.testTriggerAsync2).toBe(true);
      expect(result[0]).toBe("foo");
      expect(result[1]).toBe("bar");
      done();
    });
  });

  test("promise - triggerAsync (once)", (done) => {
    callbacks.testTriggerOnce = 0;

    expect(eventbus.eventCount).toBe(0);

    eventbus.once(
      "test:trigger:once",
      s_CREATE_TIMED_FUNC((resolve) => {
        callbacks.testTriggerOnce++;
        resolve("foo");
      })
    );

    expect(eventbus.eventCount).toBe(1);

    const promise = eventbus.triggerAsync("test:trigger:once");

    expect(eventbus.eventCount).toBe(0);

    expect(promise instanceof Promise).toBeTruthy();

    const promise2 = eventbus.triggerAsync("test:trigger:once");

    expect(promise2 instanceof Promise).toBeTruthy();

    // triggerAsync resolves all Promises by Promise.all() or Promise.resolve() so result is a string.
    promise.then((result) => {
      expect(callbacks.testTriggerOnce).toBe(1);
      expect(result).toBe("foo");
      done();
    });
  });

  test("promise - triggerAsync (listenTo)", (done) => {
    const test = new TyphonEvents();

    callbacks.testTriggerCount = 0;

    test.listenTo(
      eventbus,
      "test:trigger:async",
      s_CREATE_TIMED_FUNC((resolve) => {
        callbacks.testTriggerCount++;
        resolve("foo");
      })
    );

    expect(eventbus.eventCount).toBe(1);

    let promise = eventbus.triggerAsync("test:trigger:async");

    expect(promise instanceof Promise).toBeTruthy();

    promise
      .then((result) => {
        expect(callbacks.testTriggerCount).toBe(1);
        expect(result).toBe("foo");
      })
      .then(() => {
        test.stopListening(eventbus, "test:trigger:async");

        expect(eventbus.eventCount).toBe(0);

        promise = eventbus.triggerAsync("test:trigger:async");
        expect(promise instanceof Promise).toBeTruthy();

        promise.then((result) => {
          expect(result).not.toBeDefined();
          expect(callbacks.testTriggerCount).toBe(1);
          done();
        });
      });
  });

  test("promise - triggerAsync (listenToOnce)", (done) => {
    const test = new TyphonEvents();

    callbacks.testTriggerOnce = 0;

    expect(eventbus.eventCount).toBe(0);

    test.listenToOnce(
      eventbus,
      "test:trigger:once",
      s_CREATE_TIMED_FUNC((resolve) => {
        callbacks.testTriggerOnce++;
        resolve("foo");
      })
    );

    expect(eventbus.eventCount).toBe(1);

    const promise = eventbus.triggerAsync("test:trigger:once");

    expect(promise instanceof Promise).toBeTruthy();
    expect(eventbus.eventCount).toBe(0);

    const promise2 = eventbus.triggerAsync("test:trigger:once");

    expect(promise2 instanceof Promise).toBeTruthy();

    // triggerAsync resolves all Promises by Promise.all() or Promise.resolve() so result is a string.
    promise.then((result) => {
      expect(callbacks.testTriggerOnce).toBe(1);
      expect(result).toBe("foo");
      done();
    });
  });

  test("async / await - triggerAsync", async () => {
    eventbus.on(
      "test:trigger:async",
      s_CREATE_TIMED_FUNC((resolve) => {
        callbacks.testTriggerAsync = true;
        resolve("foo");
      })
    );

    eventbus.on(
      "test:trigger:async",
      s_CREATE_TIMED_FUNC((resolve) => {
        callbacks.testTriggerAsync2 = true;
        resolve("bar");
      })
    );

    expect(eventbus.eventCount).toBe(2);

    const result = await eventbus.triggerAsync("test:trigger:async");

    expect(callbacks.testTriggerAsync).toBe(true);
    expect(callbacks.testTriggerAsync2).toBe(true);
    expect(result[0]).toBe("foo");
    expect(result[1]).toBe("bar");
  });

  test("async / await - triggerAsync (once)", async () => {
    callbacks.testTriggerOnce = 0;

    expect(eventbus.eventCount).toBe(0);

    eventbus.once(
      "test:trigger:once",
      s_CREATE_TIMED_FUNC((resolve) => {
        callbacks.testTriggerOnce++;
        resolve("foo");
      })
    );

    expect(eventbus.eventCount).toBe(1);

    const result = await eventbus.triggerAsync("test:trigger:once");

    expect(eventbus.eventCount).toBe(0);

    expect(callbacks.testTriggerOnce).toBe(1);

    const result2 = await eventbus.triggerAsync("test:trigger:once");

    expect(callbacks.testTriggerOnce).toBe(1);

    expect(result2).not.toBeDefined();

    expect(callbacks.testTriggerOnce).toBe(1);
    expect(result).toBe("foo");
  });

  test("async / await - triggerAsync (listenTo)", async () => {
    const test = new TyphonEvents();

    callbacks.testTriggerCount = 0;

    test.listenTo(
      eventbus,
      "test:trigger:async",
      s_CREATE_TIMED_FUNC((resolve) => {
        callbacks.testTriggerCount++;
        resolve("foo");
      })
    );

    expect(eventbus.eventCount).toBe(1);

    let result = await eventbus.triggerAsync("test:trigger:async");

    expect(callbacks.testTriggerCount).toBe(1);
    expect(result).toBe("foo");

    test.stopListening(eventbus, "test:trigger:async");

    expect(eventbus.eventCount).toBe(0);

    result = await eventbus.triggerAsync("test:trigger:async");

    expect(result).not.toBeDefined();
    expect(callbacks.testTriggerCount).toBe(1);
  });

  test("async / await - triggerAsync (listenToOnce)", async () => {
    const test = new TyphonEvents();

    callbacks.testTriggerOnce = 0;

    expect(eventbus.eventCount).toBe(0);

    // test.listenToOnce(eventbus, 'test:trigger:once', () => { callbacks.testTriggerOnce++; return 'foo'; });
    test.listenToOnce(
      eventbus,
      "test:trigger:once",
      s_CREATE_TIMED_FUNC((resolve) => {
        callbacks.testTriggerOnce++;
        resolve("foo");
      })
    );

    expect(eventbus.eventCount).toBe(1);

    const result = await eventbus.triggerAsync("test:trigger:once");

    expect(eventbus.eventCount).toBe(0);

    expect(callbacks.testTriggerOnce).toBe(1);

    const result2 = await eventbus.triggerAsync("test:trigger:once");

    expect(callbacks.testTriggerOnce).toBe(1);
    expect(result2).not.toBeDefined();

    // triggerAsync resolves all Promises by Promise.all() or Promise.resolve() so result is a string.
    expect(callbacks.testTriggerOnce).toBe(1);
    expect(result).toBe("foo");
  });

  test("async / await - triggerAsync - try / catch reject error", async () => {
    eventbus.on(
      "test:trigger:async",
      s_CREATE_TIMED_FUNC((resolve) => {
        callbacks.testTriggerAsync = true;
        resolve("foo");
      })
    );

    eventbus.on(
      "test:trigger:async",
      s_CREATE_TIMED_FUNC((resolve, reject) => {
        reject(new Error("An Error!"));
      })
    );

    expect(eventbus.eventCount).toBe(2);

    try {
      await eventbus.triggerAsync("test:trigger:async");

      throw new Error("No error thrown: should not reach here!");
    } catch (err) {
      /* nop */
    }
  });

  test("async / await - triggerAsync - try / catch sync error", async () => {
    eventbus.on(
      "test:trigger:async",
      s_CREATE_TIMED_FUNC((resolve) => {
        callbacks.testTriggerAsync = true;
        resolve("foo");
      })
    );

    eventbus.on("test:trigger:async", () => {
      throw new Error("An Error!");
    });

    expect(eventbus.eventCount).toBe(2);

    try {
      await eventbus.triggerAsync("test:trigger:async");

      throw new Error("No error thrown: should not reach here!");
    } catch (err) {
      /* nop */
    }
  });
});
