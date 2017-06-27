
/**
 * @license
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.IncrementalDOM = {});
})(this, function (exports) {
  'use strict';

  /**
   * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS-IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** */
  exports.notifications = {
    /**
     * Called after patch has compleated with any Nodes that have been created
     * and added to the DOM.
     * @type {?function(Array<!Node>)}
     */
    nodesCreated: null,

    /**
     * Called after patch has compleated with any Nodes that have been removed
     * from the DOM.
     * Note it's an applications responsibility to handle any childNodes.
     * @type {?function(Array<!Node>)}
     */
    nodesDeleted: null
  };

  /**
   * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS-IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Similar to the built-in Treewalker class, but simplified and allows direct
   * access to modify the currentNode property.
   * @param {!Element|!DocumentFragment} node The root Node of the subtree the
   *     walker should start traversing.
   * @constructor
   */
  function TreeWalker(node) {
    /**
     * Keeps track of the current parent node. This is necessary as the traversal
     * methods may traverse past the last child and we still need a way to get
     * back to the parent.
     * @const @private {!Array<!Node>}
     */
    this.stack_ = [];

    /**
     * @const {!Element|!DocumentFragment}
     */
    this.root = node;

    /**
     * @type {?Node}
     */
    this.currentNode = node;
  }

  /**
   * @return {!Node} The current parent of the current location in the subtree.
   */
  TreeWalker.prototype.getCurrentParent = function () {
    return this.stack_[this.stack_.length - 1];
  };

  /**
   * Changes the current location the firstChild of the current location.
   */
  TreeWalker.prototype.firstChild = function () {
    this.stack_.push(this.currentNode);
    this.currentNode = this.currentNode.firstChild;
  };

  /**
   * Changes the current location the nextSibling of the current location.
   */
  TreeWalker.prototype.nextSibling = function () {
    this.currentNode = this.currentNode.nextSibling;
  };

  /**
   * Changes the current location the parentNode of the current location.
   */
  TreeWalker.prototype.parentNode = function () {
    this.currentNode = this.stack_.pop();
  };

  /**
   * Keeps track of the state of a patch.
   * @param {!Element|!DocumentFragment} node The root Node of the subtree the
   *     is for.
   * @param {?Context} prevContext The previous context.
   * @constructor
   */
  function Context(node, prevContext) {
    /**
     * @const {TreeWalker}
     */
    this.walker = new TreeWalker(node);

    /**
     * @const {Document}
     */
    this.doc = node.ownerDocument;

    /**
     * Keeps track of what namespace to create new Elements in.
     * @private
     * @const {!Array<(string|undefined)>}
     */
    this.nsStack_ = [undefined];

    /**
     * @const {?Context}
     */
    this.prevContext = prevContext;

    /**
     * @type {(Array<!Node>|undefined)}
     */
    this.created = exports.notifications.nodesCreated && [];

    /**
     * @type {(Array<!Node>|undefined)}
     */
    this.deleted = exports.notifications.nodesDeleted && [];
  }

  /**
   * @return {(string|undefined)} The current namespace to create Elements in.
   */
  Context.prototype.getCurrentNamespace = function () {
    return this.nsStack_[this.nsStack_.length - 1];
  };

  /**
   * @param {string=} namespace The namespace to enter.
   */
  Context.prototype.enterNamespace = function (namespace) {
    this.nsStack_.push(namespace);
  };

  /**
   * Exits the current namespace
   */
  Context.prototype.exitNamespace = function () {
    this.nsStack_.pop();
  };

  /**
   * @param {!Node} node
   */
  Context.prototype.markCreated = function (node) {
    if (this.created) {
      this.created.push(node);
    }
  };

  /**
   * @param {!Node} node
   */
  Context.prototype.markDeleted = function (node) {
    if (this.deleted) {
      this.deleted.push(node);
    }
  };

  /**
   * Notifies about nodes that were created during the patch opearation.
   */
  Context.prototype.notifyChanges = function () {
    if (this.created && this.created.length > 0) {
      exports.notifications.nodesCreated(this.created);
    }

    if (this.deleted && this.deleted.length > 0) {
      exports.notifications.nodesDeleted(this.deleted);
    }
  };

  /**
   * The current context.
   * @type {?Context}
   */
  var context;

  /**
   * Enters a new patch context.
   * @param {!Element|!DocumentFragment} node
   */
  var enterContext = function (node) {
    context = new Context(node, context);
  };

  /**
   * Restores the previous patch context.
   */
  var restoreContext = function () {
    context = context.prevContext;
  };

  /**
   * Gets the current patch context.
   * @return {?Context}
   */
  var getContext = function () {
    return context;
  };

  /**
   * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS-IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * A cached reference to the hasOwnProperty function.
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  /**
   * A cached reference to the create function.
   */
  var create = Object.create;

  /**
   * Used to prevent property collisions between our "map" and its prototype.
   * @param {!Object<string, *>} map The map to check.
   * @param {string} property The property to check.
   * @return {boolean} Whether map has property.
   */
  var has = function (map, property) {
    return hasOwnProperty.call(map, property);
  };

  /**
   * Creates an map object without a prototype.
   * @return {!Object}
   */
  var createMap = function () {
    return create(null);
  };

  /**
   * Keeps track of information needed to perform diffs for a given DOM node.
   * @param {!string} nodeName
   * @param {?string=} key
   * @constructor
   */
  function NodeData(nodeName, key) {
    /**
     * The attributes and their values.
     * @const
     */
    this.attrs = createMap();

    /**
     * An array of attribute name/value pairs, used for quickly diffing the
     * incomming attributes to see if the DOM node's attributes need to be
     * updated.
     * @const {Array<*>}
     */
    this.attrsArr = [];

    /**
     * The incoming attributes for this Node, before they are updated.
     * @const {!Object<string, *>}
     */
    this.newAttrs = createMap();

    /**
     * The key used to identify this node, used to preserve DOM nodes when they
     * move within their parent.
     * @const
     */
    this.key = key;

    /**
     * Keeps track of children within this node by their key.
     * {?Object<string, !Element>}
     */
    this.keyMap = null;

    /**
     * Whether or not the keyMap is currently valid.
     * {boolean}
     */
    this.keyMapValid = true;

    /**
     * The last child to have been visited within the current pass.
     * @type {?Node}
     */
    this.lastVisitedChild = null;

    /**
     * The node name for this node.
     * @const {string}
     */
    this.nodeName = nodeName;

    /**
     * @type {?string}
     */
    this.text = null;
  }

  /**
   * Initializes a NodeData object for a Node.
   *
   * @param {Node} node The node to initialize data for.
   * @param {string} nodeName The node name of node.
   * @param {?string=} key The key that identifies the node.
   * @return {!NodeData} The newly initialized data object
   */
  var initData = function (node, nodeName, key) {
    var data = new NodeData(nodeName, key);
    node['__incrementalDOMData'] = data;
    return data;
  };

  /**
   * Retrieves the NodeData object for a Node, creating it if necessary.
   *
   * @param {Node} node The node to retrieve the data for.
   * @return {!NodeData} The NodeData for this Node.
   */
  var getData = function (node) {
    var data = node['__incrementalDOMData'];

    if (!data) {
      var nodeName = node.nodeName.toLowerCase();
      var key = null;

      if (node instanceof Element) {
        key = node.getAttribute('key');
      }

      data = initData(node, nodeName, key);
    }

    return data;
  };

  /**
   * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS-IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  exports.symbols = {
    default: '__default',

    placeholder: '__placeholder'
  };

  /**
   * Applies an attribute or property to a given Element. If the value is null
   * or undefined, it is removed from the Element. Otherwise, the value is set
   * as an attribute.
   * @param {!Element} el
   * @param {string} name The attribute's name.
   * @param {?(boolean|number|string)=} value The attribute's value.
   */
  exports.applyAttr = function (el, name, value) {
    if (value == null) {
      el.removeAttribute(name);
    } else {
      el.setAttribute(name, value);
    }
  };

  /**
   * Applies a property to a given Element.
   * @param {!Element} el
   * @param {string} name The property's name.
   * @param {*} value The property's value.
   */
  exports.applyProp = function (el, name, value) {
    el[name] = value;
  };

  /**
   * Applies a style to an Element. No vendor prefix expansion is done for
   * property names/values.
   * @param {!Element} el
   * @param {string} name The attribute's name.
   * @param {string|Object<string,string>} style The style to set. Either a
   *     string of css or an object containing property-value pairs.
   */
  var applyStyle = function (el, name, style) {
    if (typeof style === 'string') {
      el.style.cssText = style;
    } else {
      el.style.cssText = '';
      var elStyle = el.style;

      for (var prop in style) {
        if (has(style, prop)) {
          elStyle[prop] = style[prop];
        }
      }
    }
  };

  /**
   * Updates a single attribute on an Element.
   * @param {!Element} el
   * @param {string} name The attribute's name.
   * @param {*} value The attribute's value. If the value is an object or
   *     function it is set on the Element, otherwise, it is set as an HTML
   *     attribute.
   */
  var applyAttributeTyped = function (el, name, value) {
    var type = typeof value;

    if (type === 'object' || type === 'function') {
      exports.applyProp(el, name, value);
    } else {
      exports.applyAttr(el, name, /** @type {?(boolean|number|string)} */value);
    }
  };

  /**
   * Calls the appropriate attribute mutator for this attribute.
   * @param {!Element} el
   * @param {string} name The attribute's name.
   * @param {*} value The attribute's value.
   */
  var updateAttribute = function (el, name, value) {
    var data = getData(el);
    var attrs = data.attrs;

    if (attrs[name] === value) {
      return;
    }

    var mutator = exports.attributes[name] || exports.attributes[exports.symbols.default];
    mutator(el, name, value);

    attrs[name] = value;
  };

  /**
   * A publicly mutable object to provide custom mutators for attributes.
   * @const {!Object<string, function(!Element, string, *)>}
   */
  exports.attributes = createMap();

  // Special generic mutator that's called for any attribute that does not
  // have a specific mutator.
  exports.attributes[exports.symbols.default] = applyAttributeTyped;

  exports.attributes[exports.symbols.placeholder] = function () {};

  exports.attributes['style'] = applyStyle;

  var SVG_NS = 'http://www.w3.org/2000/svg';

  /**
   * Enters a tag, checking to see if it is a namespace boundary, and if so,
   * updates the current namespace.
   * @param {string} tag The tag to enter.
   */
  var enterTag = function (tag) {
    if (tag === 'svg') {
      getContext().enterNamespace(SVG_NS);
    } else if (tag === 'foreignObject') {
      getContext().enterNamespace(undefined);
    }
  };

  /**
   * Exits a tag, checking to see if it is a namespace boundary, and if so,
   * updates the current namespace.
   * @param {string} tag The tag to enter.
   */
  var exitTag = function (tag) {
    if (tag === 'svg' || tag === 'foreignObject') {
      getContext().exitNamespace();
    }
  };

  /**
   * Gets the namespace to create an element (of a given tag) in.
   * @param {string} tag The tag to get the namespace for.
   * @return {(string|undefined)} The namespace to create the tag in.
   */
  var getNamespaceForTag = function (tag) {
    if (tag === 'svg') {
      return SVG_NS;
    }

    return getContext().getCurrentNamespace();
  };

  /**
   * Creates an Element.
   * @param {Document} doc The document with which to create the Element.
   * @param {string} tag The tag for the Element.
   * @param {?string=} key A key to identify the Element.
   * @param {?Array<*>=} statics An array of attribute name/value pairs of
   *     the static attributes for the Element.
   * @return {!Element}
   */
  var createElement = function (doc, tag, key, statics) {
    var namespace = getNamespaceForTag(tag);
    var el;

    if (namespace) {
      el = doc.createElementNS(namespace, tag);
    } else {
      el = doc.createElement(tag);
    }

    initData(el, tag, key);

    if (statics) {
      for (var i = 0; i < statics.length; i += 2) {
        updateAttribute(el, /** @type {!string}*/statics[i], statics[i + 1]);
      }
    }

    return el;
  };

  /**
   * Creates a Node, either a Text or an Element depending on the node name
   * provided.
   * @param {Document} doc The document with which to create the Node.
   * @param {string} nodeName The tag if creating an element or #text to create
   *     a Text.
   * @param {?string=} key A key to identify the Element.
   * @param {?Array<*>=} statics The static data to initialize the Node
   *     with. For an Element, an array of attribute name/value pairs of
   *     the static attributes for the Element.
   * @return {!Node}
   */
  var createNode = function (doc, nodeName, key, statics) {
    if (nodeName === '#text') {
      return doc.createTextNode('');
    }

    return createElement(doc, nodeName, key, statics);
  };

  /**
   * Creates a mapping that can be used to look up children using a key.
   * @param {!Node} el
   * @return {!Object<string, !Element>} A mapping of keys to the children of the
   *     Element.
   */
  var createKeyMap = function (el) {
    var map = createMap();
    var children = el.children;
    var count = children.length;

    for (var i = 0; i < count; i += 1) {
      var child = children[i];
      var key = getData(child).key;

      if (key) {
        map[key] = child;
      }
    }

    return map;
  };

  /**
   * Retrieves the mapping of key to child node for a given Element, creating it
   * if necessary.
   * @param {!Node} el
   * @return {!Object<string, !Node>} A mapping of keys to child Elements
   */
  var getKeyMap = function (el) {
    var data = getData(el);

    if (!data.keyMap) {
      data.keyMap = createKeyMap(el);
    }

    return data.keyMap;
  };

  /**
   * Retrieves a child from the parent with the given key.
   * @param {!Node} parent
   * @param {?string=} key
   * @return {?Element} The child corresponding to the key.
   */
  var getChild = function (parent, key) {
    return (/** @type {?Element} */key && getKeyMap(parent)[key]
    );
  };

  /**
   * Registers an element as being a child. The parent will keep track of the
   * child using the key. The child can be retrieved using the same key using
   * getKeyMap. The provided key should be unique within the parent Element.
   * @param {!Node} parent The parent of child.
   * @param {string} key A key to identify the child with.
   * @param {!Node} child The child to register.
   */
  var registerChild = function (parent, key, child) {
    getKeyMap(parent)[key] = child;
  };

  if ('production' !== 'production') {
    /**
    * Makes sure that keyed Element matches the tag name provided.
    * @param {!Element} node The node that is being matched.
    * @param {string=} tag The tag name of the Element.
    * @param {?string=} key The key of the Element.
    */
    var assertKeyedTagMatches = function (node, tag, key) {
      var nodeName = getData(node).nodeName;
      if (nodeName !== tag) {
        throw new Error('Was expecting node with key "' + key + '" to be a ' + tag + ', not a ' + nodeName + '.');
      }
    };
  }

  /**
   * Checks whether or not a given node matches the specified nodeName and key.
   *
   * @param {!Node} node An HTML node, typically an HTMLElement or Text.
   * @param {?string} nodeName The nodeName for this node.
   * @param {?string=} key An optional key that identifies a node.
   * @return {boolean} True if the node matches, false otherwise.
   */
  var matches = function (node, nodeName, key) {
    var data = getData(node);

    // Key check is done using double equals as we want to treat a null key the
    // same as undefined. This should be okay as the only values allowed are
    // strings, null and undefined so the == semantics are not too weird.
    return key == data.key && nodeName === data.nodeName;
  };

  /**
   * Aligns the virtual Element definition with the actual DOM, moving the
   * corresponding DOM node to the correct location or creating it if necessary.
   * @param {string} nodeName For an Element, this should be a valid tag string.
   *     For a Text, this should be #text.
   * @param {?string=} key The key used to identify this element.
   * @param {?Array<*>=} statics For an Element, this should be an array of
   *     name-value pairs.
   * @return {!Node} The matching node.
   */
  var alignWithDOM = function (nodeName, key, statics) {
    var context = getContext();
    var walker = context.walker;
    var currentNode = walker.currentNode;
    var parent = walker.getCurrentParent();
    var matchingNode;

    // Check to see if we have a node to reuse
    if (currentNode && matches(currentNode, nodeName, key)) {
      matchingNode = currentNode;
    } else {
      var existingNode = getChild(parent, key);

      // Check to see if the node has moved within the parent or if a new one
      // should be created
      if (existingNode) {
        if ('production' !== 'production') {
          assertKeyedTagMatches(existingNode, nodeName, key);
        }

        matchingNode = existingNode;
      } else {
        matchingNode = createNode(context.doc, nodeName, key, statics);

        if (key) {
          registerChild(parent, key, matchingNode);
        }

        context.markCreated(matchingNode);
      }

      // If the node has a key, remove it from the DOM to prevent a large number
      // of re-orders in the case that it moved far or was completely removed.
      // Since we hold on to a reference through the keyMap, we can always add it
      // back.
      if (currentNode && getData(currentNode).key) {
        parent.replaceChild(matchingNode, currentNode);
        getData(parent).keyMapValid = false;
      } else {
        parent.insertBefore(matchingNode, currentNode);
      }

      walker.currentNode = matchingNode;
    }

    return matchingNode;
  };

  /**
   * Clears out any unvisited Nodes, as the corresponding virtual element
   * functions were never called for them.
   * @param {Node} node
   */
  var clearUnvisitedDOM = function (node) {
    var context = getContext();
    var walker = context.walker;
    var data = getData(node);
    var keyMap = data.keyMap;
    var keyMapValid = data.keyMapValid;
    var lastVisitedChild = data.lastVisitedChild;
    var child = node.lastChild;
    var key;

    data.lastVisitedChild = null;

    if (child === lastVisitedChild && keyMapValid) {
      return;
    }

    if (data.attrs[exports.symbols.placeholder] && walker.currentNode !== walker.root) {
      return;
    }

    while (child !== lastVisitedChild) {
      node.removeChild(child);
      context.markDeleted( /** @type {!Node}*/child);

      key = getData(child).key;
      if (key) {
        delete keyMap[key];
      }
      child = node.lastChild;
    }

    // Clean the keyMap, removing any unusued keys.
    for (key in keyMap) {
      child = keyMap[key];
      if (!child.parentNode) {
        context.markDeleted(child);
        delete keyMap[key];
      }
    }

    data.keyMapValid = true;
  };

  /**
   * Enters an Element, setting the current namespace for nested elements.
   * @param {Node} node
   */
  var enterNode = function (node) {
    var data = getData(node);
    enterTag(data.nodeName);
  };

  /**
   * Exits an Element, unwinding the current namespace to the previous value.
   * @param {Node} node
   */
  var exitNode = function (node) {
    var data = getData(node);
    exitTag(data.nodeName);
  };

  /**
   * Marks node's parent as having visited node.
   * @param {Node} node
   */
  var markVisited = function (node) {
    var context = getContext();
    var walker = context.walker;
    var parent = walker.getCurrentParent();
    var data = getData(parent);
    data.lastVisitedChild = node;
  };

  /**
   * Changes to the first child of the current node.
   */
  var firstChild = function () {
    var context = getContext();
    var walker = context.walker;
    enterNode(walker.currentNode);
    walker.firstChild();
  };

  /**
   * Changes to the next sibling of the current node.
   */
  var nextSibling = function () {
    var context = getContext();
    var walker = context.walker;
    markVisited(walker.currentNode);
    walker.nextSibling();
  };

  /**
   * Changes to the parent of the current node, removing any unvisited children.
   */
  var parentNode = function () {
    var context = getContext();
    var walker = context.walker;
    walker.parentNode();
    exitNode(walker.currentNode);
  };

  if ('production' !== 'production') {
    var assertNoUnclosedTags = function (root) {
      var openElement = getContext().walker.getCurrentParent();
      if (!openElement) {
        return;
      }

      var openTags = [];
      while (openElement && openElement !== root) {
        openTags.push(openElement.nodeName.toLowerCase());
        openElement = openElement.parentNode;
      }

      throw new Error('One or more tags were not closed:\n' + openTags.join('\n'));
    };
  }

  /**
   * Patches the document starting at el with the provided function. This function
   * may be called during an existing patch operation.
   * @param {!Element|!DocumentFragment} node The Element or Document
   *     to patch.
   * @param {!function(T)} fn A function containing elementOpen/elementClose/etc.
   *     calls that describe the DOM.
   * @param {T=} data An argument passed to fn to represent DOM state.
   * @template T
   */
  exports.patch = function (node, fn, data) {
    enterContext(node);

    firstChild();
    fn(data);
    parentNode();
    clearUnvisitedDOM(node);

    if ('production' !== 'production') {
      assertNoUnclosedTags(node);
    }

    getContext().notifyChanges();
    restoreContext();
  };

  /**
   * The offset in the virtual element declaration where the attributes are
   * specified.
   * @const
   */
  var ATTRIBUTES_OFFSET = 3;

  /**
   * Builds an array of arguments for use with elementOpenStart, attr and
   * elementOpenEnd.
   * @const {Array<*>}
   */
  var argsBuilder = [];

  if ('production' !== 'production') {
    /**
     * Keeps track whether or not we are in an attributes declaration (after
     * elementOpenStart, but before elementOpenEnd).
     * @type {boolean}
     */
    var inAttributes = false;

    /** Makes sure that the caller is not where attributes are expected. */
    var assertNotInAttributes = function () {
      if (inAttributes) {
        throw new Error('Was not expecting a call to attr or elementOpenEnd, ' + 'they must follow a call to elementOpenStart.');
      }
    };

    /** Makes sure that the caller is where attributes are expected. */
    var assertInAttributes = function () {
      if (!inAttributes) {
        throw new Error('Was expecting a call to attr or elementOpenEnd. ' + 'elementOpenStart must be followed by zero or more calls to attr, ' + 'then one call to elementOpenEnd.');
      }
    };

    /**
     * Makes sure that placeholders have a key specified. Otherwise, conditional
     * placeholders and conditional elements next to placeholders will cause
     * placeholder elements to be re-used as non-placeholders and vice versa.
     * @param {string} key
     */
    var assertPlaceholderKeySpecified = function (key) {
      if (!key) {
        throw new Error('Placeholder elements must have a key specified.');
      }
    };

    /**
     * Makes sure that tags are correctly nested.
     * @param {string} tag
     */
    var assertCloseMatchesOpenTag = function (tag) {
      var context = getContext();
      var walker = context.walker;
      var closingNode = walker.getCurrentParent();
      var data = getData(closingNode);

      if (tag !== data.nodeName) {
        throw new Error('Received a call to close ' + tag + ' but ' + data.nodeName + ' was open.');
      }
    };

    /** Updates the state to being in an attribute declaration. */
    var setInAttributes = function () {
      inAttributes = true;
    };

    /** Updates the state to not being in an attribute declaration. */
    var setNotInAttributes = function () {
      inAttributes = false;
    };
  }

  /**
   * @param {string} tag The element's tag.
   * @param {?string=} key The key used to identify this element. This can be an
   *     empty string, but performance may be better if a unique value is used
   *     when iterating over an array of items.
   * @param {?Array<*>=} statics An array of attribute name/value pairs of the
   *     static attributes for the Element. These will only be set once when the
   *     Element is created.
   * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
   *     for the Element.
   * @return {!Element} The corresponding Element.
   */
  exports.elementOpen = function (tag, key, statics, var_args) {
    if ('production' !== 'production') {
      assertNotInAttributes();
    }

    var node = /** @type {!Element}*/alignWithDOM(tag, key, statics);
    var data = getData(node);

    /*
     * Checks to see if one or more attributes have changed for a given Element.
     * When no attributes have changed, this is much faster than checking each
     * individual argument. When attributes have changed, the overhead of this is
     * minimal.
     */
    var attrsArr = data.attrsArr;
    var attrsChanged = false;
    var i = ATTRIBUTES_OFFSET;
    var j = 0;

    for (; i < arguments.length; i += 1, j += 1) {
      if (attrsArr[j] !== arguments[i]) {
        attrsChanged = true;
        break;
      }
    }

    for (; i < arguments.length; i += 1, j += 1) {
      attrsArr[j] = arguments[i];
    }

    if (j < attrsArr.length) {
      attrsChanged = true;
      attrsArr.length = j;
    }

    /*
     * Actually perform the attribute update.
     */
    if (attrsChanged) {
      var attr,
          newAttrs = data.newAttrs;

      for (attr in newAttrs) {
        newAttrs[attr] = undefined;
      }

      for (i = ATTRIBUTES_OFFSET; i < arguments.length; i += 2) {
        newAttrs[arguments[i]] = arguments[i + 1];
      }

      for (attr in newAttrs) {
        updateAttribute(node, attr, newAttrs[attr]);
      }
    }

    firstChild();
    return node;
  };

  /**
   * Declares a virtual Element at the current location in the document. This
   * corresponds to an opening tag and a elementClose tag is required. This is
   * like elementOpen, but the attributes are defined using the attr function
   * rather than being passed as arguments. Must be folllowed by 0 or more calls
   * to attr, then a call to elementOpenEnd.
   * @param {string} tag The element's tag.
   * @param {?string=} key The key used to identify this element. This can be an
   *     empty string, but performance may be better if a unique value is used
   *     when iterating over an array of items.
   * @param {?Array<*>=} statics An array of attribute name/value pairs of the
   *     static attributes for the Element. These will only be set once when the
   *     Element is created.
   */
  exports.elementOpenStart = function (tag, key, statics) {
    if ('production' !== 'production') {
      assertNotInAttributes();
      setInAttributes();
    }

    argsBuilder[0] = tag;
    argsBuilder[1] = key;
    argsBuilder[2] = statics;
  };

  /***
   * Defines a virtual attribute at this point of the DOM. This is only valid
   * when called between elementOpenStart and elementOpenEnd.
   *
   * @param {string} name
   * @param {*} value
   */
  exports.attr = function (name, value) {
    if ('production' !== 'production') {
      assertInAttributes();
    }

    argsBuilder.push(name, value);
  };

  /**
   * Closes an open tag started with elementOpenStart.
   * @return {!Element} The corresponding Element.
   */
  exports.elementOpenEnd = function () {
    if ('production' !== 'production') {
      assertInAttributes();
      setNotInAttributes();
    }

    var node = exports.elementOpen.apply(null, argsBuilder);
    argsBuilder.length = 0;
    return node;
  };

  /**
   * Closes an open virtual Element.
   *
   * @param {string} tag The element's tag.
   * @return {!Element} The corresponding Element.
   */
  exports.elementClose = function (tag) {
    if ('production' !== 'production') {
      assertNotInAttributes();
      assertCloseMatchesOpenTag(tag);
    }

    parentNode();

    var node = /** @type {!Element} */getContext().walker.currentNode;

    clearUnvisitedDOM(node);

    nextSibling();
    return node;
  };

  /**
   * Declares a virtual Element at the current location in the document that has
   * no children.
   * @param {string} tag The element's tag.
   * @param {?string=} key The key used to identify this element. This can be an
   *     empty string, but performance may be better if a unique value is used
   *     when iterating over an array of items.
   * @param {?Array<*>=} statics An array of attribute name/value pairs of the
   *     static attributes for the Element. These will only be set once when the
   *     Element is created.
   * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
   *     for the Element.
   * @return {!Element} The corresponding Element.
   */
  exports.elementVoid = function (tag, key, statics, var_args) {
    var node = exports.elementOpen.apply(null, arguments);
    exports.elementClose.apply(null, arguments);
    return node;
  };

  /**
   * Declares a virtual Element at the current location in the document that is a
   * placeholder element. Children of this Element can be manually managed and
   * will not be cleared by the library.
   *
   * A key must be specified to make sure that this node is correctly preserved
   * across all conditionals.
   *
   * @param {string} tag The element's tag.
   * @param {string} key The key used to identify this element.
   * @param {?Array<*>=} statics An array of attribute name/value pairs of the
   *     static attributes for the Element. These will only be set once when the
   *     Element is created.
   * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
   *     for the Element.
   * @return {!Element} The corresponding Element.
   */
  exports.elementPlaceholder = function (tag, key, statics, var_args) {
    if ('production' !== 'production') {
      assertPlaceholderKeySpecified(key);
    }

    var node = exports.elementOpen.apply(null, arguments);
    updateAttribute(node, exports.symbols.placeholder, true);
    exports.elementClose.apply(null, arguments);
    return node;
  };

  /**
   * Declares a virtual Text at this point in the document.
   *
   * @param {string|number|boolean} value The value of the Text.
   * @param {...(function((string|number|boolean)):string)} var_args
   *     Functions to format the value which are called only when the value has
   *     changed.
   * @return {!Text} The corresponding text node.
   */
  exports.text = function (value, var_args) {
    if ('production' !== 'production') {
      assertNotInAttributes();
    }

    var node = /** @type {!Text}*/alignWithDOM('#text', null);
    var data = getData(node);

    if (data.text !== value) {
      data.text = /** @type {string} */value;

      var formatted = value;
      for (var i = 1; i < arguments.length; i += 1) {
        formatted = arguments[i](formatted);
      }

      node.data = formatted;
    }

    nextSibling();
    return node;
  };
});
//# sourceMappingURL=incremental-dom.js.map