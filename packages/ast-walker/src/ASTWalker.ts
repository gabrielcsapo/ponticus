/**
 * ASTWalker - Provides a simple AST traversal utility that traverses all nodes / children regardless of type.
 *
 * A callback object is provided in `traverse` which may contain two methods `enterNode` and `exitNode` which are
 * invoked with the current node and the parent node respectively when entering and exiting a given node.
 *
 * `enterNode` may return a array of strings which provide a set of children keys to ignore.
 *
 * `enterNode` may also return null to skip traversing children keys entirely.
 */
export default class ASTWalker {
  /**
   * Traverses the ast tree provided and invokes `callbacks.enterNode` / `callbacks.exitNode`
   *
   * @param ast - An AST Tree object hash or an array of nodes.
   * @param callbacks - An object hash containing a function for `enterNode` and / or `exitNode` keys.
   */
  traverse(ast: any | any[], callbacks: any) {
    if (typeof callbacks !== "object") {
      throw new TypeError("Invalid callbacks");
    }
    if (
      typeof callbacks.enterNode !== "function" &&
      typeof callbacks.exitNode !== "function"
    ) {
      throw new TypeError(
        "Invalid callbacks - missing `enterNode` and / or `exitNode`."
      );
    }

    if (Array.isArray(ast)) {
      this._visitNodes(ast, undefined, callbacks);
    } else if (typeof ast === "object") {
      this._visitNode(ast, undefined, callbacks);
    } else {
      throw new TypeError("Invalid syntax tree");
    }
  }

  /**
   * Performs the main node visit invoking the callbacks for entering / exiting the node.
   *
   * `enterNode` may return an array of strings indicating children keys to ignore / skip. If `enterNode` returns
   * `null` children nodes are skipped entirely.
   *
   * @param node - AST node being visited.
   * @param parent - The parent node.
   * @param callbacks - An object hash containing a function for `enterNode` and / or `exitNode` keys.
   *
   * @internal
   */
  _visitNode(node: any, parent: any, callbacks: any) {
    if (
      node !== null &&
      typeof node === "object" &&
      typeof node.type === "string"
    ) {
      const ignoreNodeKeys =
        typeof callbacks.enterNode === "function"
          ? callbacks.enterNode(node, parent)
          : [];

      // If `enterNode` returns null then traversal of children is aborted.
      if (ignoreNodeKeys !== null) {
        this._visitChildren(node, ignoreNodeKeys, callbacks);
      }

      if (typeof callbacks.exitNode === "function") {
        callbacks.exitNode(node, parent);
      }
    }
  }

  /**
   * Visits all nodes in the given array.
   *
   * @param nodes - An array of nodes to visit.
   * @param parent - The parent node.
   * @param callbacks - An object hash containing a function for `enterNode` and / or `exitNode` keys.
   *
   * @internal
   */
  _visitNodes(nodes: any[], parent: any, callbacks: any) {
    nodes.forEach((node) => {
      this._visitNode(node, parent, callbacks);
    }, this);
  }

  /**
   * Visits all children nodes from a given node.
   *
   * @param node - Current AST node being visited.
   * @param ignoreNodeKeys - A set of keys to ignore.
   * @param callbacks - An object hash containing a function for `enterNode` and / or `exitNode` keys.
   *
   * @internal
   */
  _visitChildren(node: any, ignoreNodeKeys: any[], callbacks: any) {
    ignoreNodeKeys = Array.isArray(ignoreNodeKeys) ? ignoreNodeKeys : [];

    // Visit all node keys which are an array or an object.
    Object.keys(node).forEach((key) => {
      // Potentially ignore the given key if it is in the `ignoreNodeKeys` array.
      if (ignoreNodeKeys.indexOf(key) >= 0) {
        return;
      }

      if (Array.isArray(node[key]) || typeof node[key] === "object") {
        this._visitChild(node[key], node, callbacks);
      }
    });
  }

  /**
   * Visits all children nodes from the given child object or array.
   *
   * @param child - Child key to visit.
   * @param  parent - The parent node.
   * @param callbacks - An object hash containing a function for `enterNode` and / or `exitNode` keys.
   *
   * @internal
   */
  _visitChild(child: any | any[], parent: any, callbacks: any) {
    const visitor = Array.isArray(child) ? this._visitNodes : this._visitNode;
    visitor.call(this, child, parent, callbacks);
  }
}
