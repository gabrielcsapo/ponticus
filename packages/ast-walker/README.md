# @ponticus/ast-walker

Provides a simple Javascript AST traversal utility that traverses all nodes / children regardless of type.

A single method `traverse` takes an AST object or array of nodes and a callback object which may contain two methods `enterNode` and `exitNode` which are invoked with the current node and the parent node respectively when entering and exiting a given node during traversal.

`enterNode` may return a array of strings which provide a set of children keys to ignore or `null` to skip traversing children keys entirely.

To install `@ponticus/ast-walker` provide this entry in `package.json`:

```json
{
  ...
  "dependencies": {
    "@ponticus/ast-walker": "^0.2.0"
  }
}
```  

A simple example follows:

```js
import walker from '@ponticus/ast-walker';

const ast = .... // An AST tree.

walker.traverse(ast, {
   enterNode: (node, parent) => {
      console.log(`walker - enterNode: ${node.type}`);

      // Optional return statement to ignore specific children keys.
      // return node.type === 'ClassBody' ? ['body'] : undefined;

      // Optional return statement to ignore specific children keys or skip traversal entirely.
      // return node.type === 'ClassBody' ? null : undefined;
   },
   
   exitNode: (node, parent) => {
      console.log(`walker - exitNode: ${node.type}`);
   }
});
 
```

Support for [@ponticus/plugin-manager](https://www.npmjs.com/package/@ponticus/plugin-manager) is also available and
when loading `@ponticus/ast-walker` as a plugin it will automatically register event bindings on the plugin eventbus
with these event categories:

`ast:walker:traverse` - invokes `traverse` of the default walker.

Example `@ponticus/plugin-manager` usage:

```js
import PluginManager    from '@ponticus/plugin-manager';
import eventbus         from '@ponticus/backbone-esnext-eventbus';

const pluginManager = new PluginManager({ eventbus });

pluginManager.add({ name: @ponticus/ast-walker });

// This will automatically wire up @ponticus/ast-walker to the eventbus. 

eventbus.trigger('ast:walker:traverse', ast, {
   enterNode: (node, parent) => {
      console.log(`walker - enterNode: ${node.type}`);
   },
   exitNode: (node, parent) => {
      console.log(`walker - exitNode: ${node.type}`);
   }
});
```