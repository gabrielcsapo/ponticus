# @ponticus/backbone-esnext-events

For essential information pertaining to backbone-esnext please refer to [backbone-esnext](https://github.com/typhonjs-backbone-esnext/backbone-esnext) and the main [issues forum](https://github.com/typhonjs-backbone-esnext/backbone-esnext/issues).

`@ponticus/backbone-esnext-events` separates 'Events' support from [backbone-esnext](https://github.com/typhonjs-backbone-esnext) in addition to adding TyphonJS extensions found in [TyphonEvents](https://github.com/typhonjs-backbone-esnext/backbone-esnext-events/blob/master/src/TyphonEvents.js). The events dispatch functionality is useful well outside the context of Backbone and is utilized across several TyphonJS repos. It should be noted that there are no dependencies with backbone-esnext-events and it can be used independently in any project without pulling in Underscore like Backbone does. 

The default trigger mechanism work justs as it does with Backbone:
- `trigger` - Invokes all targets matched with a one way message. 

TyphonEvents adds new functionality for triggering events. The following are new trigger mechanisms:

- `triggerDefer` - Defers invoking `trigger` to the next clock tick.
- `triggerSync` - Synchronously invokes all targets matched and passes back a single value or an array of results to the callee.
- `triggerAsync` - Asynchronously invokes all targets matched and passes back a promise resolved with a single value or an array of results through `Promise.all` which returns a single promise to the callee.

To import TyphonEvents and create a new instance: 
```
import Events from 'backbone-esnext-events';

const eventbus = new Events();

// or extend a class to add event functionality
 
export default class MyThing extends Events {}
```

Please see [backbone-esnext-eventbus](https://www.npmjs.com/package/backbone-esnext-eventbus) for a module which provides a default main eventbus instance for ease of use across modules.
