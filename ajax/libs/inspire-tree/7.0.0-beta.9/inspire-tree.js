/* Inspire Tree
 * @version 7.0.0-beta.9
 * https://github.com/helion3/inspire-tree
 * @copyright Copyright 2015 Helion3, and other contributors
 * @license Licensed under MIT
 *          see https://github.com/helion3/inspire-tree/blob/master/LICENSE
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash/map.js'), require('lodash/castArray.js'), require('lodash/defaultsDeep.js'), require('lodash/difference.js'), require('lodash/each.js'), require('lodash/get.js'), require('lodash/includes.js'), require('lodash/isArray.js'), require('lodash/isArrayLike.js'), require('lodash/isBoolean.js'), require('lodash/isEmpty.js'), require('lodash/isFunction.js'), require('lodash/isObject.js'), require('lodash/isRegExp.js'), require('lodash/isString.js'), require('lodash/noop.js'), require('lodash/sortBy.js'), require('lodash/tail.js'), require('lodash/transform.js'), require('lodash/assign.js'), require('lodash/cloneDeep.js'), require('lodash/find.js'), require('lodash/findIndex.js'), require('lodash/findLast.js'), require('lodash/indexOf.js'), require('lodash/pull.js'), require('lodash/slice.js'), require('lodash/invoke.js'), require('lodash/isArrayLikeObject.js'), require('lodash/remove.js'), require('lodash/sortedIndexBy.js')) :
  typeof define === 'function' && define.amd ? define(['lodash/map.js', 'lodash/castArray.js', 'lodash/defaultsDeep.js', 'lodash/difference.js', 'lodash/each.js', 'lodash/get.js', 'lodash/includes.js', 'lodash/isArray.js', 'lodash/isArrayLike.js', 'lodash/isBoolean.js', 'lodash/isEmpty.js', 'lodash/isFunction.js', 'lodash/isObject.js', 'lodash/isRegExp.js', 'lodash/isString.js', 'lodash/noop.js', 'lodash/sortBy.js', 'lodash/tail.js', 'lodash/transform.js', 'lodash/assign.js', 'lodash/cloneDeep.js', 'lodash/find.js', 'lodash/findIndex.js', 'lodash/findLast.js', 'lodash/indexOf.js', 'lodash/pull.js', 'lodash/slice.js', 'lodash/invoke.js', 'lodash/isArrayLikeObject.js', 'lodash/remove.js', 'lodash/sortedIndexBy.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.InspireTree = factory(global._.map, global._.castArray, global._.defaultsDeep, global._.difference, global._.each, global._.get, global._.includes, global._.isArray, global._.isArrayLike, global._.isBoolean, global._.isEmpty, global._.isFunction, global._.isObject, global._.isRegExp, global._.isString, global._.noop, global._.sortBy, global._.tail, global._.transform, global._.assign, global._.cloneDeep, global._.find, global._.findIndex, global._.findLast, global._.indexOf, global._.pull, global._.slice, global._.invoke, global._.isArrayLikeObject, global._.remove, global._.sortedIndexBy));
})(this, (function (_map, castArray, defaultsDeep, difference, each, get, includes, isArray, isArrayLike, isBoolean, isEmpty, isFunction, isObject, isRegExp, isString, noop, _sortBy, tail, transform_js, _assign, cloneDeep, find, findIndex, findLast, indexOf, pull, slice, invoke, isArrayLikeObject, _remove, sortedIndexBy) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }

  /**
   * Reset a node's state to the tree default.
   *
   * @private
   * @param {TreeNode} node Node object.
   * @returns {TreeNode} Node object.
   */
  function resetState(node) {
    each(node._tree.defaultState, function (val, prop) {
      node.state(prop, val);
    });
    return node;
  }

  /**
   * Stores repetitive state change logic for most state methods.
   *
   * @private
   * @param {string} prop State property name.
   * @param {boolean} value New state value.
   * @param {string} verb Verb used for events.
   * @param {TreeNode} node Node object.
   * @param {string} deep Optional name of state method to call recursively.
   * @return {TreeNode} Node object.
   */
  function baseStateChange(prop, value, verb, node, deep) {
    if (node.state(prop) !== value) {
      node.context().batch();
      if (node._tree.config.nodes.resetStateOnRestore && verb === 'restored') {
        resetState(node);
      }

      // indeterminate may never be true if checked is
      if (value && prop === 'checked') {
        node.state('indeterminate', false);
      }
      node.state(prop, value);
      node._tree.emit('node.' + verb, node, false);
      if (deep && node.hasChildren()) {
        node.children.recurseDown(function (child) {
          baseStateChange(prop, value, verb, child);
        });
      }

      // This node's "renderability" has changed, so we should
      // trigger a re-cache in the parent context.
      if (prop === 'hidden' || prop === 'removed') {
        node.context().indicesDirty = true;
        node.context().calculateRenderablePositions();
      }
      node.markDirty();
      node.context().end();
    }
    return node;
  }

  function _extendableBuiltin(cls) {
    function ExtendableBuiltin() {
      cls.apply(this, arguments);
    }
    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
      constructor: {
        value: cls,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(ExtendableBuiltin, cls);
    } else {
      ExtendableBuiltin.__proto__ = cls;
    }
    return ExtendableBuiltin;
  }

  /**
   * Base function to invoke given method(s) on tree nodes.
   *
   * @private
   * @param {TreeNode} nodes Array of node objects.
   * @param {string|array} methods Method names.
   * @param {array|Arguments} args Array of arguments to proxy.
   * @param {boolean} deep Invoke deeply.
   * @return {TreeNodes} Array of node objects.
   */
  function baseInvoke(nodes, methods, args, deep) {
    methods = castArray(methods);
    nodes._tree.batch();
    nodes[deep ? 'recurseDown' : 'each'](function (node) {
      each(methods, function (method) {
        if (isFunction(node[method])) {
          node[method].apply(node, args);
        }
      });
    });
    nodes._tree.end();
    return nodes;
  }

  /**
   * Creates a predicate function.
   *
   * @private
   * @param {string|function} predicate Property name or custom function.
   * @return {function} Predicate function.
   */
  function getPredicateFunction(predicate) {
    var fn = predicate;
    if (isString(predicate)) {
      fn = function fn(node) {
        return isFunction(node[predicate]) ? node[predicate]() : node[predicate];
      };
    }
    return fn;
  }

  /**
   * Base function to filter nodes by state value.
   *
   * @private
   * @param {string} state State property
   * @param {boolean} full Return a non-flat hierarchy
   * @return {TreeNodes} Array of matching nodes.
   */
  function baseStatePredicate(state, full) {
    if (full) {
      return this.extract(state);
    }

    // Cache a state predicate function
    var fn = getPredicateFunction(state);
    return this.flatten(function (node) {
      // Never include removed nodes unless specifically requested
      if (state !== 'removed' && node.removed()) {
        return false;
      }
      return fn(node);
    });
  }

  /**
   * An Array-like collection of TreeNodes.
   *
   * Note: Due to issue in many javascript environments,
   * native objects are problematic to extend correctly
   * so we mimic it, not actually extend it.
   *
   * @param {InspireTree} tree Context tree.
   * @param {array} array Array of TreeNode objects.
   * @param {object} opts Configuration object.
   * @return {TreeNodes} Collection of TreeNode
   */
  var TreeNodes = /*#__PURE__*/function (_extendableBuiltin2) {
    _inherits(TreeNodes, _extendableBuiltin2);
    var _super = _createSuper(TreeNodes);
    function TreeNodes(tree, array, opts) {
      var _this;
      _classCallCheck(this, TreeNodes);
      _this = _super.call(this);
      if (isFunction(get(tree, 'isTree')) && !tree.isTree(tree)) {
        throw new TypeError('Invalid tree instance.');
      }
      _this._tree = tree;
      _this.length = 0;
      _this.batching = 0;

      // A custom dirty flag to indicate when an index-altering
      // change has occured. Avoids re-caching when unnecessary.
      _this.indicesDirty = false;
      _this.config = defaultsDeep({}, opts, {
        calculateRenderablePositions: false
      });

      // Init pagination
      _this._pagination = {
        limit: tree.config.pagination.limit,
        total: 0
      };
      if (isArray(array) || array instanceof TreeNodes) {
        each(array, function (node) {
          if (node instanceof TreeNode) {
            _this.push(node.clone());
          } else {
            _this.addNode(node);
          }
        });
      }
      return _this;
    }

    /**
     * Adds a new node. If a sort method is configured,
     * the node will be added in the appropriate order.
     *
     * @param {object} object Node
     * @return {TreeNode} Node object.
     */
    _createClass(TreeNodes, [{
      key: "addNode",
      value: function addNode(object) {
        // Base insertion index
        var index = this.length;

        // If tree is sorted, insert in correct position
        if (this._tree.config.sort) {
          index = sortedIndexBy(this, object, this._tree.config.sort);
        }
        return this.insertAt(index, object);
      }

      /**
       * Release pending data changes to any listeners.
       *
       * Will skip rendering as long as any calls
       * to `batch` have yet to be resolved,
       *
       * @private
       * @return {void}
       */
    }, {
      key: "applyChanges",
      value: function applyChanges() {
        if (this.batching === 0) {
          this.calculateRenderablePositions();
          this._tree.emit('changes.applied', this.context());
        }
      }

      /**
       * Batch multiple changes for listeners (i.e. DOM)
       *
       * @private
       * @return {void}
       */
    }, {
      key: "batch",
      value: function batch() {
        if (this.batching < 0) {
          this.batching = 0;
        }
        this.batching++;
      }

      /**
       * Query for all available nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "available",
      value: function available(full) {
        return baseStatePredicate.call(this, 'available', full);
      }

      /**
       * Blur nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "blur",
      value: function blur() {
        return this.invoke('blur');
      }

      /**
       * Blur (deeply) all nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "blurDeep",
      value: function blurDeep() {
        return this.invokeDeep('blur');
      }

      /**
       * Calculate and cache the first/last renderable nodes.
       *
       * Primarily useful for rendering engines, since hidden DOM
       * nodes may still be present and CSS :first/:last selectors
       * would fail.
       *
       * @private
       * @return {void}
       */
    }, {
      key: "calculateRenderablePositions",
      value: function calculateRenderablePositions() {
        if (!this.indicesDirty || this.batching > 0 || !this.config.calculateRenderablePositions) {
          return;
        }
        var first;
        var last;
        this.each(function (node) {
          if (node.renderable()) {
            // Cache first node if none yet
            first = first || node;

            // Always update last node on match
            last = node;
          }
        });
        if (this.firstRenderableNode && this.firstRenderableNode !== first) {
          this.firstRenderableNode.markDirty();
        }
        if (first && first !== this.firstRenderableNode) {
          first.markDirty();
        }
        if (this.lastRenderableNode && this.lastRenderableNode !== last) {
          this.lastRenderableNode.markDirty();
        }
        if (last && last !== this.lastRenderableNode) {
          last.markDirty();
        }
        this.firstRenderableNode = first;
        this.lastRenderableNode = last;
        this.indicesDirty = false;
      }

      /**
       * Query for all checked nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "checked",
      value: function checked(full) {
        return baseStatePredicate.call(this, 'checked', full);
      }

      /**
       * Clean nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "clean",
      value: function clean() {
        return this.invoke('clean');
      }

      /**
       * Clones (deeply) the array of nodes.
       *
       * Note: Cloning will *not* clone the context pointer.
       *
       * @return {TreeNodes} Array of cloned nodes.
       */
    }, {
      key: "clone",
      value: function clone() {
        return new TreeNodes(this._tree, this);
      }

      /**
       * Collapse nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "collapse",
      value: function collapse() {
        return this.invoke('collapse');
      }

      /**
       * Query for all collapsed nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "collapsed",
      value: function collapsed(full) {
        return baseStatePredicate.call(this, 'collapsed', full);
      }

      /**
       * Collapse (deeply) all children.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "collapseDeep",
      value: function collapseDeep() {
        return this.invokeDeep('collapse');
      }

      /**
       * Concat multiple TreeNodes arrays.
       *
       * @param {TreeNodes} nodes Array of nodes.
       * @return {TreeNodes} Resulting node array.
       */
    }, {
      key: "concat",
      value: function concat(nodes) {
        var newNodes = new TreeNodes(this._tree);
        newNodes._context = this._context;
        var pusher = function pusher(node) {
          if (node instanceof TreeNode) {
            newNodes.push(node);
          }
        };
        each(this, pusher);
        each(nodes, pusher);

        // Copy pagination limit
        newNodes._pagination.limit = this._pagination.limit;
        return newNodes;
      }

      /**
       * Get the context of this collection. If a collection
       * of children, context is the parent node. Otherwise
       * the context is the tree itself.
       *
       * @return {TreeNode|object} Node object or tree instance.
       */
    }, {
      key: "context",
      value: function context() {
        return this._context || this._tree;
      }

      /**
       * Copy nodes to another tree instance.
       *
       * @param {object} dest Destination Inspire Tree.
       * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
       * @param {boolean} includeState Include itree.state object.
       * @return {object} Methods to perform action on copied nodes.
       */
    }, {
      key: "copy",
      value: function copy(dest, hierarchy, includeState) {
        var newNodes = new TreeNodes(this._tree);
        each(this, function (node) {
          newNodes.push(node.copy(dest, hierarchy, includeState));
        });
        return newNodes;
      }

      /**
       * Return deepest nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "deepest",
      value: function deepest() {
        var matches = new TreeNodes(this._tree);
        this.recurseDown(function (node) {
          if (!node.children) {
            matches.push(node);
          }
        });
        return matches;
      }

      /**
       * Deselect nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "deselect",
      value: function deselect() {
        return this.invoke('deselect');
      }

      /**
       * Deselect (deeply) all nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "deselectDeep",
      value: function deselectDeep() {
        return this.invokeDeep('deselect');
      }

      /**
       * Iterate each TreeNode.
       *
       * @param {function} iteratee Iteratee invoke for each node.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "each",
      value: function each$1(iteratee) {
        each(this, iteratee);
        return this;
      }

      /**
       * Query for all editable nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "editable",
      value: function editable(full) {
        return baseStatePredicate.call(this, 'editable', full);
      }

      /**
       * Query for all nodes in editing mode.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "editing",
      value: function editing(full) {
        return baseStatePredicate.call(this, 'editing', full);
      }

      /**
       * Release the current batch.
       *
       * @private
       * @return {void}
       */
    }, {
      key: "end",
      value: function end() {
        this.batching--;
        if (this.batching === 0) {
          this.applyChanges();
        }
      }

      /**
       * Expand nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "expand",
      value: function expand() {
        return this.invoke('expand');
      }

      /**
       * Query for all expanded nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "expanded",
      value: function expanded(full) {
        return baseStatePredicate.call(this, 'expanded', full);
      }

      /**
       * Expand (deeply) all nodes.
       *
       * @return {Promise<TreeNodes>} Promise resolved when all children have loaded and expanded.
       */
    }, {
      key: "expandDeep",
      value: function expandDeep() {
        var _this2 = this;
        return new Promise(function (resolve) {
          var waitCount = 0;
          var done = function done() {
            if (--waitCount === 0) {
              resolve(_this2);
            }
          };
          _this2.recurseDown(function (node) {
            waitCount++;

            // Ignore nodes without children
            if (node.children) {
              node.expand()["catch"](done).then(function () {
                // Manually trigger expansion on newly loaded children
                node.children.expandDeep()["catch"](done).then(done);
              });
            } else {
              done();
            }
          });
        });
      }

      /**
       * Expand parents.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "expandParents",
      value: function expandParents() {
        return this.invoke('expandParents');
      }

      /**
       * Clone a hierarchy of all nodes matching a predicate.
       *
       * Because it filters deeply, we must clone all nodes so that we
       * don't affect the actual node array.
       *
       * @param {string|function} predicate State flag or custom function.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "extract",
      value: function extract(predicate) {
        var flat = this.flatten(predicate);
        var matches = new TreeNodes(this._tree);
        each(flat, function (node) {
          return matches.addNode(node.copyHierarchy());
        });
        return matches;
      }

      /**
       * Filter all nodes matching the given predicate.
       *
       * @param {string|function} predicate State flag or custom function.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "filterBy",
      value: function filterBy(predicate) {
        var fn = getPredicateFunction(predicate);
        var matches = new TreeNodes(this._tree);
        each(this, function (node) {
          if (fn(node)) {
            matches.push(node);
          }
        });
        return matches;
      }

      /**
       * Returns the first node matching predicate.
       *
       * @param {function} predicate Predicate function, accepts a single node and returns a boolean.
       * @return {TreeNode} First matching TreeNode, or undefined.
       */
    }, {
      key: "find",
      value: function find(predicate) {
        var match;
        this.recurseDown(function (node) {
          if (predicate(node)) {
            match = node;
            return false;
          }
        });
        return match;
      }

      /**
       * Returns the first shallow node matching predicate.
       *
       * @param {function} predicate Predicate function, accepts a single node and returns a boolean.
       * @return {TreeNode} First matching TreeNode, or undefined.
       */
    }, {
      key: "first",
      value: function first(predicate) {
        for (var i = 0, l = this.length; i < l; i++) {
          if (predicate(this[i])) {
            return this[i];
          }
        }
      }

      /**
       * Flatten and get only node(s) matching the expected state or predicate function.
       *
       * @param {string|function} predicate State property or custom function.
       * @return {TreeNodes} Flat array of matching nodes.
       */
    }, {
      key: "flatten",
      value: function flatten(predicate) {
        var flat = new TreeNodes(this._tree);
        var fn = getPredicateFunction(predicate);
        this.recurseDown(function (node) {
          if (fn(node)) {
            flat.push(node);
          }
        });
        return flat;
      }

      /**
       * Query for all focused nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "focused",
      value: function focused(full) {
        return baseStatePredicate.call(this, 'focused', full);
      }

      /**
       * Iterate each TreeNode.
       *
       * @param {function} iteratee Iteratee invoke for each node.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "forEach",
      value: function forEach(iteratee) {
        return this.each(iteratee);
      }

      /**
       * Get a specific node by its index, or undefined if it doesn't exist.
       *
       * @param {int} index Numeric index of requested node.
       * @return {TreeNode} Node object. Undefined if invalid index.
       */
    }, {
      key: "get",
      value: function get(index) {
        return this[index];
      }

      /**
       * Query for all hidden nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "hidden",
      value: function hidden(full) {
        return baseStatePredicate.call(this, 'hidden', full);
      }

      /**
       * Hide nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "hide",
      value: function hide() {
        return this.invoke('hide');
      }

      /**
       * Hide (deeply) all nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "hideDeep",
      value: function hideDeep() {
        return this.invokeDeep('hide');
      }

      /**
       * Query for all indeterminate nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "indeterminate",
      value: function indeterminate(full) {
        return baseStatePredicate.call(this, 'indeterminate', full);
      }

      /**
       * Insert a new node at a given position.
       *
       * @param {integer} index Index at which to insert the node.
       * @param {object} object Raw node object or TreeNode.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "insertAt",
      value: function insertAt(index, object) {
        // If node has a pre-existing ID
        if (object.id) {
          // Is it already in the tree?
          var existingNode = this.node(object.id);
          if (existingNode) {
            existingNode.restore().show();

            // Merge children
            if (isArrayLike(object.children)) {
              // Setup existing node's children property if needed
              if (!isArrayLike(existingNode.children)) {
                existingNode.children = new TreeNodes(this._tree);
                existingNode.children._context = existingNode;
              }

              // Copy each child (using addNode, which uses insertAt)
              each(object.children, function (child) {
                existingNode.children.addNode(child);
              });
            }

            // Merge truthy children
            else if (object.children && isBoolean(existingNode.children)) {
              existingNode.children = object.children;
            }
            existingNode.markDirty();
            this.applyChanges();

            // Node merged, return it.
            return existingNode;
          }
        }

        // Node is new, insert at given location.
        var node = this._tree.constructor.isTreeNode(object) ? object : objectToNode(this._tree, object);

        // Grab remaining nodes
        this.splice(index, 0, node);

        // Refresh parent state and mark dirty
        if (this._context) {
          node.itree.parent = this._context;
          this._context.refreshIndeterminateState().markDirty();
        }

        // Event
        this._tree.emit('node.added', node);

        // Always mark this node as dirty
        node.markDirty();

        // If pushing this node anywhere but the end, other nodes may change.
        if (this.length - 1 !== index) {
          this.invoke('markDirty');
        }
        this.applyChanges();
        return node;
      }

      /**
       * Invoke method(s) on each node.
       *
       * @param {string|array} methods Method name(s).
       * @param {array|Arguments} args Array of arguments to proxy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "invoke",
      value: function invoke(methods, args) {
        return baseInvoke(this, methods, args);
      }

      /**
       * Invoke method(s) deeply.
       *
       * @param {string|array} methods Method name(s).
       * @param {array|Arguments} args Array of arguments to proxy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "invokeDeep",
      value: function invokeDeep(methods, args) {
        if (!isArrayLikeObject(args) || arguments.length > 2) {
          args = tail(arguments);
        }
        return baseInvoke(this, methods, args, true);
      }

      /**
       * Returns the last shallow node matching predicate.
       *
       * @param {function} predicate Predicate function, accepts a single node and returns a boolean.
       * @return {TreeNode} Last matching shallow TreeNode, or undefined.
       */
    }, {
      key: "last",
      value: function last(predicate) {
        for (var i = this.length - 1; i >= 0; i--) {
          if (predicate(this[i])) {
            return this[i];
          }
        }
      }

      /**
       * Query for all nodes currently loading children.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "loading",
      value: function loading(full) {
        return baseStatePredicate.call(this, 'loading', full);
      }

      /**
       * Loads additional nodes for this context.
       *
       * @param {Event} event Click or scroll event if DOM interaction triggered this call.
       * @return {Promise<TreeNodes>} Resolves with request results.
       */
    }, {
      key: "loadMore",
      value: function loadMore(event) {
        var _this3 = this;
        // Never refire if node is loading
        if (this._loading) {
          return Promise.reject(new Error('Pending loadMore call must complete before being invoked again.'));
        }
        var promise;

        // If no records remain, immediately resolve
        if (this._pagination.limit === this._pagination.total) {
          return Promise.resolve();
        }

        // Set loading flag, prevents repeat requests
        this._loading = true;
        this.batch();

        // Mark this context as dirty since we'll update text/tree nodes
        invoke(this._context, 'markDirty');

        // Increment the pagination
        this._pagination.limit += this._tree.config.pagination.limit;

        // Emit an event
        this._tree.emit('node.paginated', this._context || this._tree, this.pagination, event);
        if (this._tree.config.deferredLoading) {
          if (this._context) {
            promise = this._context.loadChildren();
          } else {
            promise = this._tree.load(this._tree.config.data);
          }
        } else {
          this._loading = false;
          promise = Promise.resolve();
        }
        this.end();

        // Clear the loading flag
        if (this._tree.config.deferredLoading) {
          promise.then(function () {
            _this3._loading = false;
            _this3.applyChanges();
          })["catch"](function () {
            _this3._loading = false;
            _this3.applyChanges();
          });
        }
        return promise;
      }

      /**
       * Query for all nodes matched in the last search.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "matched",
      value: function matched(full) {
        return baseStatePredicate.call(this, 'matched', full);
      }

      /**
       * Move node at a given index to a new index.
       *
       * @param {int} index Current index.
       * @param {int} newIndex New index.
       * @param {TreeNodes} target Target TreeNodes array. Defaults to this.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "move",
      value: function move(index, newIndex) {
        var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
        var oldNode = this[index].remove();
        var node = target.insertAt(newIndex, oldNode);
        this._tree.emit('node.moved', node, this, index, target, newIndex);
        return node;
      }

      /**
       * Get a node.
       *
       * @param {string|number} id ID of node.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "node",
      value: function node(id) {
        var match;
        this.recurseDown(function (node) {
          if (node.id === id) {
            match = node;
            return false;
          }
        });
        return match;
      }

      /**
       * Get all nodes in a tree, or nodes for an array of IDs.
       *
       * @param {array} refs Array of ID references.
       * @return {TreeNodes} Array of node objects.
       * @example
       *
       * const all = tree.nodes()
       * const some = tree.nodes([1, 2, 3])
       */
    }, {
      key: "nodes",
      value: function nodes(refs) {
        var results;
        if (isArray(refs)) {
          results = new TreeNodes(this._tree);
          this.recurseDown(function (node) {
            if (refs.indexOf(node.id) > -1) {
              results.push(node);
            }
          });
        }
        return isArray(refs) ? results : this;
      }

      /**
       * Get the pagination.
       *
       * @return {object} Pagination configuration object.
       */
    }, {
      key: "pagination",
      value: function pagination() {
        return this._pagination;
      }

      /**
       * Removes the last node.
       *
       * @return {TreeNode} Last tree node.
       */
    }, {
      key: "pop",
      value: function pop() {
        var result = _get(_getPrototypeOf(TreeNodes.prototype), "pop", this).call(this);
        this.indicesDirty = true;
        this.calculateRenderablePositions();
        return result;
      }

      /**
       * Push a new TreeNode onto the collection.
       *
       * @param {TreeNode} node Node objext.
       * @returns {number} The new length.
       */
    }, {
      key: "push",
      value: function push(node) {
        var result = _get(_getPrototypeOf(TreeNodes.prototype), "push", this).call(this, node);
        this.indicesDirty = true;
        this.calculateRenderablePositions();
        return result;
      }

      /**
       * Iterate down all nodes and any children.
       *
       * Return false to stop execution.
       *
       * @param {function} iteratee Iteratee function.
       * @return {TreeNodes} Resulting nodes.
       */
    }, {
      key: "recurseDown",
      value: function recurseDown$1(iteratee) {
        recurseDown(this, iteratee);
        return this;
      }

      /**
       * Remove a node.
       *
       * @param {TreeNode} node Node object.
       * @return {TreeNodes} Resulting nodes.
       */
    }, {
      key: "remove",
      value: function remove(node) {
        _remove(this, {
          id: node.id
        });
        invoke(this._context, 'markDirty');
        this.indicesDirty = true;
        this.applyChanges();
        return this;
      }

      /**
       * Query for all soft-removed nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "removed",
      value: function removed(full) {
        return baseStatePredicate.call(this, 'removed', full);
      }

      /**
       * Restore nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "restore",
      value: function restore() {
        return this.invoke('restore');
      }

      /**
       * Restore (deeply) all nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "restoreDeep",
      value: function restoreDeep() {
        return this.invokeDeep('restore');
      }

      /**
       * Select nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "select",
      value: function select() {
        return this.invoke('select');
      }

      /**
       * Query for all selectable nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "selectable",
      value: function selectable(full) {
        return baseStatePredicate.call(this, 'selectable', full);
      }

      /**
       * Select (deeply) all nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "selectDeep",
      value: function selectDeep() {
        return this.invokeDeep('select');
      }

      /**
       * Query for all selected nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "selected",
      value: function selected(full) {
        return baseStatePredicate.call(this, 'selected', full);
      }

      /**
       * Removes the first node.
       *
       * @param {TreeNode} node Node object.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "shift",
      value: function shift(node) {
        var result = _get(_getPrototypeOf(TreeNodes.prototype), "shift", this).call(this, node);
        this.indicesDirty = true;
        this.calculateRenderablePositions();
        return result;
      }

      /**
       * Show nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "show",
      value: function show() {
        return this.invoke('show');
      }

      /**
       * Show (deeply) all nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "showDeep",
      value: function showDeep() {
        return this.invokeDeep('show');
      }

      /**
       * Soft-remove nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "softRemove",
      value: function softRemove() {
        return this.invoke('softRemove');
      }

      /**
       * Sorts all TreeNode objects in this collection.
       *
       * If no custom sorter given, the configured "sort" value will be used.
       *
       * @param {string|function} sorter Sort function or property name.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "sortBy",
      value: function sortBy(sorter) {
        var _this4 = this;
        sorter = sorter || this._tree.config.sort;

        // Only apply sort if one provided
        if (sorter) {
          this.batch();
          var sorted = _sortBy(this, sorter);
          this.length = 0;
          each(sorted, function (node) {
            _this4.push(node);
          });
          this.indicesDirty = true;
          this.end();
        }
        return this;
      }

      /**
       * Sorts (deeply) all nodes in this collection.
       *
       * @param {function} comparator [description]
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "sortDeep",
      value: function sortDeep(comparator) {
        this.sort(comparator);
        this.each(function (node) {
          if (node.hasChildren()) {
            node.children.sortDeep(comparator);
          }
        });
        return this;
      }

      /**
       * Changes array contents by removing existing nodes and/or adding new nodes.
       *
       * @param {number} start Start index.
       * @param {number} deleteCount Number of nodes to delete.
       * @param {TreeNode} ...nodes One or more nodes.
       * @return {array} Array of deleted elements.
       */
    }, {
      key: "splice",
      value: function splice() {
        var result = _get(_getPrototypeOf(TreeNodes.prototype), "splice", this).apply(this, arguments);
        this.indicesDirty = true;
        this.calculateRenderablePositions();
        return result;
      }

      /**
       * Set nodes' state values.
       *
       * @param {string} name Property name.
       * @param {boolean} newVal New value, if setting.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "state",
      value: function state() {
        return this.invoke('state', arguments);
      }

      /**
       * Set (deeply) nodes' state values.
       *
       * @param {string} name Property name.
       * @param {boolean} newVal New value, if setting.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "stateDeep",
      value: function stateDeep() {
        return this.invokeDeep('state', arguments);
      }

      /**
       * Swaps two node positions.
       *
       * @param {TreeNode} node1 Node 1.
       * @param {TreeNode} node2 Node 2.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "swap",
      value: function swap(node1, node2) {
        this._tree.batch();
        var n1Context = node1.context();
        var n2Context = node2.context();

        // Cache. Note: n2Index is only usable once
        var n1Index = n1Context.indexOf(node1);
        var n2Index = n2Context.indexOf(node2);

        // If contexts match, we can simply re-assign them
        if (n1Context === n2Context) {
          this[n1Index] = node2;
          this[n2Index] = node1;

          // Emit move events for each node
          this._tree.emit('node.moved', node1, n1Context, n1Index, n2Context, n2Index);
          this._tree.emit('node.moved', node2, n2Context, n2Index, n1Context, n1Index);
        } else {
          // Otherwise, we have to move between contexts
          // Move node 1 to node 2's index
          n1Context.move(n1Index, n2Context.indexOf(node2), n2Context);

          // Move node 2 to node 1s original index
          n2Context.move(n2Context.indexOf(node2), n1Index, n1Context);
        }
        this.indicesDirty = true;
        this._tree.end();
        this._tree.emit('node.swapped', node1, n1Context, n1Index, node2, n2Context, n2Index);
        return this;
      }

      /**
       * Get the tree instance.
       *
       * @return {InspireTree} Tree instance.
       */
    }, {
      key: "tree",
      value: function tree() {
        return this._tree;
      }

      /**
       * Get a native node Array.
       *
       * @return {array} Array of node objects.
       */
    }, {
      key: "toArray",
      value: function toArray() {
        var array = [];
        each(this, function (node) {
          array.push(node.toObject());
        });
        return array;
      }

      /**
       * Adds a node to beginning of the collection.
       *
       * @param {TreeNode} node Node object.
       * @return {number} New length of collection.
       */
    }, {
      key: "unshift",
      value: function unshift(node) {
        var result = _get(_getPrototypeOf(TreeNodes.prototype), "unshift", this).call(this, node);
        this.indicesDirty = true;
        this.calculateRenderablePositions();
        return result;
      }

      /**
       * Query for all visible nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "visible",
      value: function visible(full) {
        return baseStatePredicate.call(this, 'visible', full);
      }
    }]);
    return TreeNodes;
  }(_extendableBuiltin(Array));

  /**
   * Base recursion function for a collection or node.
   *
   * Returns false if execution should cease.
   *
   * @private
   * @param {TreeNode|TreeNodes} obj Node or collection.
   * @param {function} iteratee Iteratee function
   * @return {boolean} Cease iteration.
   */
  function recurseDown(obj, iteratee) {
    var res;
    if (obj instanceof TreeNodes) {
      each(obj, function (node) {
        res = recurseDown(node, iteratee);
        return res;
      });
    } else if (obj instanceof TreeNode) {
      res = iteratee(obj);

      // Recurse children
      if (res !== false && obj.hasChildren()) {
        res = recurseDown(obj.children, iteratee);
      }
    }
    return res;
  }

  /**
   * Resolve promise-like objects consistently.
   *
   * @private
   * @param {object} promise Promise-like object.
   * @returns {Promise} Promise
   */
  function standardizePromise(promise) {
    return new Promise(function (resolve, reject) {
      if (!isObject(promise)) {
        return reject(new Error('Invalid Promise'));
      }
      if (isFunction(promise.then)) {
        promise.then(resolve);
      }

      // jQuery promises use "error"
      if (isFunction(promise.error)) {
        promise.error(reject);
      } else if (isFunction(promise["catch"])) {
        promise["catch"](reject);
      }
    });
  }

  /**
   * Helper method to clone an ITree config object.
   *
   * Rejects non-clonable properties like ref.
   *
   * @private
   * @param {object} itree ITree configuration object
   * @param {array} excludeKeys Keys to exclude, if any
   * @return {object} Cloned ITree.
   */
  function cloneItree(itree, excludeKeys) {
    var clone = {};
    excludeKeys = castArray(excludeKeys);
    excludeKeys.push('ref');
    each(itree, function (v, k) {
      if (!includes(excludeKeys, k)) {
        clone[k] = cloneDeep(v);
      }
    });
    return clone;
  }

  /**
   * Get or set a state value.
   *
   * This is a base method and will not invoke related changes, for example
   * setting selected=false will not trigger any deselection logic.
   *
   * @private
   * @param {TreeNode} node Tree node.
   * @param {string} property Property name.
   * @param {boolean} val New value, if setting.
   * @return {boolean} Current value on read, old value on set.
   */
  function baseState(node, property, val) {
    var currentVal = node.itree.state[property];
    if (typeof val !== 'undefined' && currentVal !== val) {
      // Update values
      node.itree.state[property] = val;
      if (property !== 'rendered') {
        node.markDirty();
      }

      // Emit an event
      node._tree.emit('node.state.changed', node, property, currentVal, val);
    }
    return currentVal;
  }

  /**
   * Represents a singe node object within the tree.
   *
   * @param {TreeNode} source TreeNode to copy.
   * @return {TreeNode} Tree node object.
   */
  var TreeNode = /*#__PURE__*/function () {
    function TreeNode(tree, source, excludeKeys) {
      var _this = this;
      _classCallCheck(this, TreeNode);
      this._tree = tree;
      if (source instanceof TreeNode) {
        excludeKeys = castArray(excludeKeys);
        excludeKeys.push('_tree');

        // Iterate manually for better perf
        each(source, function (value, key) {
          // Skip properties
          if (!includes(excludeKeys, key)) {
            if (isObject(value)) {
              if (value instanceof TreeNodes) {
                _this[key] = value.clone();
              } else if (key === 'itree') {
                _this[key] = cloneItree(value);
              } else {
                _this[key] = cloneDeep(value);
              }
            } else {
              // Copy primitives
              _this[key] = value;
            }
          }
        });
      }
    }

    /**
     * Add a child to this node.
     *
     * @param {object} child Node object.
     * @return {TreeNode} Node object.
     */
    _createClass(TreeNode, [{
      key: "addChild",
      value: function addChild(child) {
        if (isArray(this.children) || !isArrayLike(this.children)) {
          this.children = new TreeNodes(this._tree);
          this.children._context = this;
        }
        return this.children.addNode(child);
      }

      /**
       * Add multiple children to this node.
       *
       * @param {object} children Array of nodes.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "addChildren",
      value: function addChildren(children) {
        var _this2 = this;
        var nodes = new TreeNodes(this._tree);
        if (isArray(this.children) || !isArrayLike(this.children)) {
          this.children = new TreeNodes(this._tree);
          this.children._context = this;
        }
        this.children.batch();
        each(children, function (child) {
          nodes.push(_this2.addChild(child));
        });
        this.children.end();
        return nodes;
      }

      /**
       * Ensure this node allows dynamic children.
       *
       * @private
       * @return {boolean} True if tree/node allows dynamic children.
       */
    }, {
      key: "allowDynamicLoad",
      value: function allowDynamicLoad() {
        return this._tree.isDynamic && (isArrayLike(this.children) || this.children === true);
      }

      /**
       * Assign source object(s) to this node.
       *
       * @param {object} source Source object(s)
       * @return {TreeNode} Node object.
       */
    }, {
      key: "assign",
      value: function assign() {
        _assign.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
        this.markDirty();
        this.context().applyChanges();
        return this;
      }

      /**
       * Check if node available.
       *
       * @return {boolean} True if available.
       */
    }, {
      key: "available",
      value: function available() {
        return !this.hidden() && !this.removed();
      }

      /**
       * Blur focus from this node.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "blur",
      value: function blur() {
        this.state('editing', false);
        return baseStateChange('focused', false, 'blurred', this);
      }

      /**
       * Mark node as checked.
       *
       * @param {boolean} shallow Skip auto-checking children.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "check",
      value: function check(shallow) {
        this._tree.batch();

        // Will we automatically apply state changes to our children
        var deep = !shallow && this._tree.config.checkbox.autoCheckChildren;
        baseStateChange('checked', true, 'checked', this, deep);

        // Refresh parent
        if (this.hasParent()) {
          this.getParent().refreshIndeterminateState();
        }
        this._tree.end();
        return this;
      }

      /**
       * Get whether this node is checked.
       *
       * @return {boolean} True if node checked.
       */
    }, {
      key: "checked",
      value: function checked() {
        return this.state('checked');
      }

      /**
       * Hide parents without any visible children.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "clean",
      value: function clean() {
        this.recurseUp(function (node) {
          if (node.hasParent()) {
            var parent = node.getParent();
            if (!parent.hasVisibleChildren()) {
              parent.hide();
            }
          }
        });
        return this;
      }

      /**
       * Clone this node.
       *
       * @param {array} excludeKeys Keys to exclude from the clone.
       * @return {TreeNode} New node object.
       */
    }, {
      key: "clone",
      value: function clone(excludeKeys) {
        return new TreeNode(this._tree, this, excludeKeys);
      }

      /**
       * Collapse this node.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "collapse",
      value: function collapse() {
        return baseStateChange('collapsed', true, 'collapsed', this);
      }

      /**
       * Get whether this node is collapsed.
       *
       * @return {boolean} True if node collapsed.
       */
    }, {
      key: "collapsed",
      value: function collapsed() {
        return this.state('collapsed');
      }

      /**
       * Get the containing context. If no parent present, the root context is returned.
       *
       * @return {TreeNodes} Node array object.
       */
    }, {
      key: "context",
      value: function context() {
        return this.hasParent() ? this.getParent().children : this._tree.model;
      }

      /**
       * Copy node to another tree instance.
       *
       * @param {object} dest Destination Inspire Tree.
       * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
       * @param {boolean} includeState Include itree.state object.
       * @return {object} Property "to" for defining destination.
       */
    }, {
      key: "copy",
      value: function copy(dest, hierarchy, includeState) {
        if (!dest || !isFunction(dest.addNode)) {
          throw new Error('Destination must be an Inspire Tree instance.');
        }
        var node = this;
        if (hierarchy) {
          node = node.copyHierarchy(false, includeState);
        }
        return dest.addNode(cloneDeep(node.toObject(false, includeState)));
      }

      /**
       * Copy all parents of a node.
       *
       * @param {boolean} excludeNode Exclude given node from hierarchy.
       * @param {boolean} includeState Include itree.state object.
       * @return {TreeNode} Root node object with hierarchy.
       */
    }, {
      key: "copyHierarchy",
      value: function copyHierarchy(excludeNode, includeState) {
        var nodes = [];
        var parents = this.getParents();

        // Remove old hierarchy data
        each(parents, function (node) {
          nodes.push(node.toObject(excludeNode, includeState));
        });
        parents = nodes.reverse();
        if (!excludeNode) {
          var clone = this.toObject(true, includeState);

          // Filter out hidden children
          if (this.hasChildren()) {
            clone.children = this.children.filterBy(function (n) {
              return !n.state('hidden');
            }).toArray();
            clone.children._context = clone;
          }
          nodes.push(clone);
        }
        var hierarchy = nodes[0];
        var l = nodes.length;
        var pointer = hierarchy;
        each(nodes, function (parent, key) {
          var children = [];
          if (key + 1 < l) {
            children.push(nodes[key + 1]);
            pointer.children = children;
            pointer = pointer.children[0];
          }
        });
        return objectToNode(this._tree, hierarchy);
      }

      /**
       * Deselect this node.
       *
       * If selection.require is true and this is the last selected
       * node, the node will remain in a selected state.
       *
       * @param {boolean} shallow Skip auto-deselecting children.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "deselect",
      value: function deselect(shallow) {
        if (this.selected() && (!this._tree.config.selection.require || this._tree.selected().length > 1)) {
          this.context().batch();

          // Will we apply this state change to our children?
          var deep = !shallow && this._tree.config.selection.autoSelectChildren;
          baseStateChange('selected', false, 'deselected', this, deep);
          this.context().end();
        }
        return this;
      }

      /**
       * Get whether node editable. Required editing.edit to be enable via config.
       *
       * @return {boolean} True if node editable.
       */
    }, {
      key: "editable",
      value: function editable() {
        return this._tree.config.editable && this._tree.config.editing.edit && this.state('editable');
      }

      /**
       * Get whether node is currently in edit mode.
       *
       * @return {boolean} True if node in edit mode.
       */
    }, {
      key: "editing",
      value: function editing() {
        return this.state('editing');
      }

      /**
       * Expand this node.
       *
       * @return {Promise<TreeNode>} Promise resolved on successful load and expand of children.
       */
    }, {
      key: "expand",
      value: function expand() {
        var _this3 = this;
        return new Promise(function (resolve, reject) {
          var allow = _this3.hasChildren() || _this3._tree.isDynamic && _this3.children === true;
          if (allow && (_this3.collapsed() || _this3.hidden())) {
            _this3.state('collapsed', false);
            _this3.state('hidden', false);
            _this3._tree.emit('node.expanded', _this3);
            if (_this3._tree.isDynamic && _this3.children === true) {
              _this3.loadChildren().then(resolve)["catch"](reject);
            } else {
              _this3.context().applyChanges();
              resolve(_this3);
            }
          } else {
            // Resolve immediately
            resolve(_this3);
          }
        });
      }

      /**
       * Get whether node expanded.
       *
       * @return {boolean} True if expanded.
       */
    }, {
      key: "expanded",
      value: function expanded() {
        return !this.collapsed();
      }

      /**
       * Expand parent nodes.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "expandParents",
      value: function expandParents() {
        if (this.hasParent()) {
          this.getParent().recurseUp(function (node) {
            node.expand();
          });
        }
        return this;
      }

      /**
       * Focus a node without changing its selection.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "focus",
      value: function focus() {
        if (!this.focused()) {
          // Batch selection changes
          this._tree.batch();
          this._tree.blurDeep();
          this.state('focused', true);

          // Emit this event
          this._tree.emit('node.focused', this);

          // Mark hierarchy dirty and apply
          this.markDirty();
          this._tree.end();
        }
        return this;
      }

      /**
       * Get whether this node is focused.
       *
       * @return {boolean} True if node focused.
       */
    }, {
      key: "focused",
      value: function focused() {
        return this.state('focused');
      }

      /**
       * Get children for this node. If no children exist, an empty TreeNodes
       * collection is returned for safe chaining.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "getChildren",
      value: function getChildren() {
        return this.hasChildren() ? this.children : new TreeNodes(this._tree);
      }

      /**
       * Get the immediate parent, if any.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "getParent",
      value: function getParent() {
        return this.itree.parent;
      }

      /**
       * Get parent nodes. Excludes any siblings.
       *
       * @return {TreeNodes} Node objects.
       */
    }, {
      key: "getParents",
      value: function getParents() {
        var parents = new TreeNodes(this._tree);
        if (this.hasParent()) {
          this.getParent().recurseUp(function (node) {
            parents.push(node);
          });
        }
        return parents;
      }

      /**
       * Get a textual hierarchy for a given node. An array
       * of text from this node's root ancestor to the given node.
       *
       * @return {array} Array of node texts.
       */
    }, {
      key: "getTextualHierarchy",
      value: function getTextualHierarchy() {
        var paths = [];
        this.recurseUp(function (node) {
          paths.unshift(node.text);
        });
        return paths;
      }

      /**
       * Get whether the given node is an ancestor of this node.
       *
       * @param {TreeNode} node Node object.
       * @return {boolean} True if node is an ancestor or the given node
       */
    }, {
      key: "hasAncestor",
      value: function hasAncestor(node) {
        var hasAncestor = false;
        this.recurseUp(function (n) {
          return !(hasAncestor = n.id === node.id);
        });
        return hasAncestor;
      }

      /**
       * Get whether node has any children.
       *
       * @return {boolean} True if has loaded children.
       */
    }, {
      key: "hasChildren",
      value: function hasChildren() {
        return isArrayLike(this.children) && this.children.length > 0;
      }

      /**
       * Get whether children have been loaded. Will always be true for non-dynamic nodes.
       *
       * @return {boolean} True if we've attempted to load children.
       */
    }, {
      key: "hasLoadedChildren",
      value: function hasLoadedChildren() {
        return isArrayLike(this.children);
      }

      /**
       * Get whether node has any children, or allows dynamic loading.
       *
       * @return {boolean} True if node has, or will have children.
       */
    }, {
      key: "hasOrWillHaveChildren",
      value: function hasOrWillHaveChildren() {
        return isArrayLike(this.children) ? Boolean(this.children.length) : this.allowDynamicLoad();
      }

      /**
       * Get whether node has a parent.
       *
       * @return {boolean} True if has a parent.
       */
    }, {
      key: "hasParent",
      value: function hasParent() {
        return Boolean(this.itree.parent);
      }

      /**
       * Get whether node has any visible children.
       *
       * @return {boolean} True if children are visible.
       */
    }, {
      key: "hasVisibleChildren",
      value: function hasVisibleChildren() {
        var hasVisibleChildren = false;
        if (this.hasChildren()) {
          hasVisibleChildren = this.children.filterBy('available').length > 0;
        }
        return hasVisibleChildren;
      }

      /**
       * Hide this node.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "hide",
      value: function hide() {
        var node = baseStateChange('hidden', true, 'hidden', this);

        // Update children
        if (node.hasChildren()) {
          node.children.hide();
        }
        return node;
      }

      /**
       * Get whether this node is hidden.
       *
       * @return {boolean} True if node hidden.
       */
    }, {
      key: "hidden",
      value: function hidden() {
        return this.state('hidden');
      }

      /**
       * Get an array of indices, values which map this node's location within all parent contexts.
       *
       * @return {string} Index path
       */
    }, {
      key: "indexList",
      value: function indexList() {
        var indices = [];
        this.recurseUp(function (node) {
          indices.push(indexOf(node.context(), node));
        });
        return indices.reverse();
      }

      /**
       * Get a "path" of indices, values which map this node's location within all parent contexts.
       *
       * @return {string} Index path
       */
    }, {
      key: "indexPath",
      value: function indexPath() {
        return this.indexList().join('.');
      }

      /**
       * Get whether this node is indeterminate.
       *
       * @return {boolean} True if node indeterminate.
       */
    }, {
      key: "indeterminate",
      value: function indeterminate() {
        return this.state('indeterminate');
      }

      /**
       * Get whether this node is the first renderable in its context.
       *
       * @return {boolean} True if node is first renderable
       */
    }, {
      key: "isFirstRenderable",
      value: function isFirstRenderable() {
        return this === this.context().firstRenderableNode;
      }

      /**
       * Get whether this node is the last renderable in its context.
       *
       * @return {boolean} True if node is last renderable
       */
    }, {
      key: "isLastRenderable",
      value: function isLastRenderable() {
        return this === this.context().lastRenderableNode;
      }

      /**
       * Get whether this node is the only renderable in its context.
       *
       * @return {boolean} True if node is only renderable
       */
    }, {
      key: "isOnlyRenderable",
      value: function isOnlyRenderable() {
        return this.isFirstRenderable() && this.isLastRenderable();
      }

      /**
       * Find the last + deepest visible child of the previous sibling.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "lastDeepestVisibleChild",
      value: function lastDeepestVisibleChild() {
        var found;
        if (this.hasChildren() && !this.collapsed()) {
          found = findLast(this.children, function (node) {
            return node.visible();
          });
          var res = found.lastDeepestVisibleChild();
          if (res) {
            found = res;
          }
        }
        return found;
      }

      /**
       * Initiate a dynamic load of children for a given node.
       *
       * This requires `tree.config.data` to be a function which accepts
       * three arguments: node, resolve, reject.
       *
       * Use the `node` to filter results.
       *
       * On load success, pass the result array to `resolve`.
       * On error, pass the Error to `reject`.
       *
       * @return {Promise<TreeNodes>} Promise resolving children nodes.
       */
    }, {
      key: "loadChildren",
      value: function loadChildren() {
        var _this4 = this;
        return new Promise(function (resolve, reject) {
          if (!_this4.allowDynamicLoad()) {
            return reject(new Error('Node does not have or support dynamic children.'));
          }
          _this4.state('loading', true);
          _this4.markDirty();
          _this4.context().applyChanges();
          var complete = function complete(nodes, totalNodes) {
            // A little type-safety for silly situations
            if (!isArrayLike(nodes)) {
              return reject(new TypeError('Loader requires an array-like `nodes` parameter.'));
            }
            _this4.context().batch();
            _this4.state('loading', false);
            var model = collectionToModel(_this4._tree, nodes, _this4);
            if (isArrayLike(_this4.children)) {
              _this4.children = _this4.children.concat(model);
            } else {
              _this4.children = model;
            }
            if (parseInt(totalNodes, 10) > nodes.length) {
              _this4.children._pagination.total = parseInt(totalNodes, 10);
            }

            // If using checkbox mode, share selection with newly loaded children
            if (_this4._tree.config.selection.mode === 'checkbox' && _this4.selected()) {
              _this4.children.select();
            }
            _this4.markDirty();
            _this4.context().end();
            resolve(_this4.children);
            _this4._tree.emit('children.loaded', _this4);
          };
          var error = function error(err) {
            _this4.state('loading', false);
            _this4.children = new TreeNodes(_this4._tree);
            _this4.children._context = _this4;
            _this4.markDirty();
            _this4.context().applyChanges();
            reject(err);
            _this4._tree.emit('tree.loaderror', err);
          };
          var pagination = _this4._tree.constructor.isTreeNodes(_this4.children) ? _this4.children.pagination() : null;
          var loader = _this4._tree.config.data(_this4, complete, error, pagination);

          // Data loader is likely a promise
          if (isObject(loader)) {
            standardizePromise(loader).then(complete)["catch"](error);
          }
        });
      }

      /**
       * Get whether this node is loading child data.
       *
       * @return {boolean} True if node's children are loading.
       */
    }, {
      key: "loading",
      value: function loading() {
        return this.state('loading');
      }

      /**
       * Load additional children.
       *
       * @param {Event} event Click or scroll event if DOM interaction triggered this call.
       * @return {Promise<TreeNodes>} Resolves with request results.
       */
    }, {
      key: "loadMore",
      value: function loadMore() {
        if (!this.children || this.children === true) {
          return Promise.reject(new Error('Children have not yet been loaded.'));
        }
        return this.children.loadMore();
      }

      /**
       * Mark node as dirty. For some systems this assists with rendering tracking.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "markDirty",
      value: function markDirty() {
        if (!this.itree.dirty) {
          this.itree.dirty = true;
          if (this.hasParent()) {
            this.getParent().markDirty();
          }
        }
        return this;
      }

      /**
       * Get whether this node was matched during the last search.
       *
       * @return {boolean} True if node matched.
       */
    }, {
      key: "matched",
      value: function matched() {
        return this.state('matched');
      }

      /**
       * Find the next visible sibling of our ancestor. Continues
       * seeking up the tree until a valid node is found or we
       * reach the root node.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "nextVisibleAncestralSiblingNode",
      value: function nextVisibleAncestralSiblingNode() {
        var next;
        if (this.hasParent()) {
          var parent = this.getParent();
          next = parent.nextVisibleSiblingNode();
          if (!next) {
            next = parent.nextVisibleAncestralSiblingNode();
          }
        }
        return next;
      }

      /**
       * Find next visible child node.
       *
       * @return {TreeNode} Node object, if any.
       */
    }, {
      key: "nextVisibleChildNode",
      value: function nextVisibleChildNode() {
        var next;
        if (this.hasChildren()) {
          next = find(this.children, function (child) {
            return child.visible();
          });
        }
        return next;
      }

      /**
       * Get the next visible node.
       *
       * @return {TreeNode} Node object if any.
       */
    }, {
      key: "nextVisibleNode",
      value: function nextVisibleNode() {
        var next;

        // 1. Any visible children
        next = this.nextVisibleChildNode();

        // 2. Any Siblings
        if (!next) {
          next = this.nextVisibleSiblingNode();
        }

        // 3. Find sibling of ancestor(s)
        if (!next) {
          next = this.nextVisibleAncestralSiblingNode();
        }
        return next;
      }

      /**
       * Find the next visible sibling node.
       *
       * @return {TreeNode} Node object, if any.
       */
    }, {
      key: "nextVisibleSiblingNode",
      value: function nextVisibleSiblingNode() {
        var context = this.hasParent() ? this.getParent().children : this._tree.nodes();
        var i = findIndex(context, {
          id: this.id
        });
        return find(slice(context, i + 1), function (node) {
          return node.visible();
        });
      }

      /**
       * Get pagination object for this tree node.
       *
       * @return {object} Pagination configuration object.
       */
    }, {
      key: "pagination",
      value: function pagination() {
        return get(this, 'children._pagination');
      }

      /**
       * Find the previous visible node.
       *
       * @return {TreeNode} Node object, if any.
       */
    }, {
      key: "previousVisibleNode",
      value: function previousVisibleNode() {
        var prev;

        // 1. Any Siblings
        prev = this.previousVisibleSiblingNode();

        // 2. If that sibling has children though, go there
        if (prev && prev.hasChildren() && !prev.collapsed()) {
          prev = prev.lastDeepestVisibleChild();
        }

        // 3. Parent
        if (!prev && this.hasParent()) {
          prev = this.getParent();
        }
        return prev;
      }

      /**
       * Find the previous visible sibling node.
       *
       * @return {TreeNode} Node object, if any.
       */
    }, {
      key: "previousVisibleSiblingNode",
      value: function previousVisibleSiblingNode() {
        var context = this.hasParent() ? this.getParent().children : this._tree.nodes();
        var i = findIndex(context, {
          id: this.id
        });
        return findLast(slice(context, 0, i), function (node) {
          return node.visible();
        });
      }

      /**
       * Iterate down node and any children.
       *
       * @param {function} iteratee Iteratee function.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "recurseDown",
      value: function recurseDown$1(iteratee) {
        recurseDown(this, iteratee);
        return this;
      }

      /**
       * Iterate up a node and its parents.
       *
       * @param {function} iteratee Iteratee function.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "recurseUp",
      value: function recurseUp(iteratee) {
        var result = iteratee(this);
        if (result !== false && this.hasParent()) {
          this.getParent().recurseUp(iteratee);
        }
        return this;
      }

      /**
       * Update the indeterminate state of this node by scanning states of children.
       *
       * True if some, but not all children are checked.
       * False if no children are checked.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "refreshIndeterminateState",
      value: function refreshIndeterminateState() {
        var oldValue = this.indeterminate();
        this.state('indeterminate', false);
        if (this.hasChildren()) {
          var childrenCount = this.children.length;
          var indeterminate = 0;
          var checked = 0;
          this.children.each(function (n) {
            if (n.checked()) {
              checked++;
            }
            if (n.indeterminate()) {
              indeterminate++;
            }
          });

          // Set selected if all children are
          if (checked === childrenCount) {
            baseStateChange('checked', true, 'checked', this);
          } else {
            baseStateChange('checked', false, 'unchecked', this);
          }

          // Set indeterminate if any children are, or some children are selected
          if (!this.checked()) {
            this.state('indeterminate', indeterminate > 0 || childrenCount > 0 && checked > 0 && checked < childrenCount);
          }
        }
        if (this.hasParent()) {
          this.getParent().refreshIndeterminateState();
        }
        if (oldValue !== this.state('indeterminate')) {
          this.markDirty();
        }
        return this;
      }

      /**
       * Remove all current children and re-execute a loadChildren call.
       *
       * @return {Promise<TreeNodes>} Promise resolved on load.
       */
    }, {
      key: "reload",
      value: function reload() {
        var _this5 = this;
        return new Promise(function (resolve, reject) {
          if (!_this5.allowDynamicLoad()) {
            return reject(new Error('Node or tree does not support dynamic children.'));
          }

          // Reset children
          _this5.children = true;

          // Collapse
          _this5.collapse();

          // Load and the proxy the promise
          _this5.loadChildren().then(resolve)["catch"](reject);
        });
      }

      /**
       * Remove a node from the tree.
       *
       * @param {boolean} includeState Include itree.state object.
       * @return {object} Removed tree node object.
       */
    }, {
      key: "remove",
      value: function remove() {
        var includeState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        // Cache parent before we remove the node
        var parent = this.getParent();

        // Remove self
        this.context().remove(this);

        // Refresh parent states
        if (parent) {
          parent.refreshIndeterminateState();
          parent.markDirty();
        }
        var pagination = parent ? parent.pagination() : this._tree.pagination();
        pagination.total--;

        // Export/event
        var exported = this.toObject(false, includeState);
        this._tree.emit('node.removed', exported, parent);
        this.context().applyChanges();
        return exported;
      }

      /**
       * Get whether this node is soft-removed.
       *
       * @return {boolean} True if node soft-removed.
       */
    }, {
      key: "removed",
      value: function removed() {
        return this.state('removed');
      }

      /**
       * Get whether this node can be "rendered" when the context is.
       * Hidden and removed nodes may still be included in the DOM,
       * but not "rendered" in a sense they'll be visible.
       *
       * @return {boolean} If not hidden or removed
       */
    }, {
      key: "renderable",
      value: function renderable() {
        return !this.hidden() && !this.removed();
      }

      /**
       * Get whether this node has been rendered.
       *
       * Will be false if deferred rendering is enable and the node has
       * not yet been loaded, or if a custom DOM renderer is used.
       *
       * @return {boolean} True if node rendered.
       */
    }, {
      key: "rendered",
      value: function rendered() {
        return this.state('rendered');
      }

      /**
       * Restore state if soft-removed.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "restore",
      value: function restore() {
        return baseStateChange('removed', false, 'restored', this);
      }

      /**
       * Select this node.
       *
       * @param {boolean} shallow Skip auto-selecting children.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "select",
      value: function select(shallow) {
        if (!this.selected() && this.selectable()) {
          // Batch selection changes
          this._tree.batch();
          if (this._tree.canAutoDeselect()) {
            var oldVal = this._tree.config.selection.require;
            this._tree.config.selection.require = false;
            this._tree.deselectDeep();
            this._tree.config.selection.require = oldVal;
          }

          // Will we apply this state change to our children?
          var deep = !shallow && this._tree.config.selection.autoSelectChildren;
          baseStateChange('selected', true, 'selected', this, deep);

          // Cache as the last selected node
          this._tree._lastSelectedNode = this;

          // Mark hierarchy dirty and apply
          this.markDirty();
          this._tree.end();
        }
        return this;
      }

      /**
       * Get whether node selectable.
       *
       * @return {boolean} True if node selectable.
       */
    }, {
      key: "selectable",
      value: function selectable() {
        var allow = this._tree.config.selection.allow(this);
        return typeof allow === 'boolean' ? allow : this.state('selectable');
      }

      /**
       * Get whether this node is selected.
       *
       * @return {boolean} True if node selected.
       */
    }, {
      key: "selected",
      value: function selected() {
        return this.state('selected');
      }

      /**
       * Set a root property on this node.
       *
       * @param {string|number} property Property name.
       * @param {*} value New value.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "set",
      value: function set(property, value) {
        this[property] = value;
        this.markDirty();
        this.context().applyChanges();
        return this;
      }

      /**
       * Show this node.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "show",
      value: function show() {
        return baseStateChange('hidden', false, 'shown', this);
      }

      /**
       * Mark this node as "removed" without actually removing it.
       *
       * Expand/show methods will never reveal this node until restored.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "softRemove",
      value: function softRemove() {
        return baseStateChange('removed', true, 'softremoved', this, 'softRemove');
      }

      /**
       * Get or set a state value.
       *
       * This is a base method and will not invoke related changes, for example
       * setting selected=false will not trigger any deselection logic.
       *
       * @param {string|object} obj Property name or Key/Value state object.
       * @param {boolean} val New value, if setting.
       * @return {boolean|object} Old state object, or old value if property name used.
       */
    }, {
      key: "state",
      value: function state(obj, val) {
        var _this6 = this;
        if (isString(obj)) {
          return baseState(this, obj, val);
        }
        this.context().batch();
        var oldState = {};
        each(obj, function (value, prop) {
          oldState[prop] = baseState(_this6, prop, value);
        });
        this.context().end();
        return oldState;
      }

      /**
       * Get or set multiple state values to a single value.
       *
       * @param {Array} names Property names.
       * @param {boolean} newVal New value, if setting.
       * @return {Array} Array of state booleans
       */
    }, {
      key: "states",
      value: function states(names, newVal) {
        var _this7 = this;
        var results = [];
        this.context().batch();
        each(names, function (name) {
          results.push(_this7.state(name, newVal));
        });
        this.context().end();
        return results;
      }

      /**
       * Swap position with the given node.
       *
       * @param {TreeNode} node Node.
       * @return {TreeNode} Node objects.
       */
    }, {
      key: "swap",
      value: function swap(node) {
        this.context().swap(this, node);
        return this;
      }

      /**
       * Toggle checked state.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "toggleCheck",
      value: function toggleCheck() {
        return this.checked() ? this.uncheck() : this.check();
      }

      /**
       * Toggle collapsed state.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "toggleCollapse",
      value: function toggleCollapse() {
        return this.collapsed() ? this.expand() : this.collapse();
      }

      /**
       * Toggle editing state.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "toggleEditing",
      value: function toggleEditing() {
        this.state('editing', !this.state('editing'));
        this.markDirty();
        this.context().applyChanges();
        return this;
      }

      /**
       * Toggle selected state.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "toggleSelect",
      value: function toggleSelect() {
        return this.selected() ? this.deselect() : this.select();
      }

      /**
       * Export this node as a native Object.
       *
       * @param {boolean} excludeChildren Exclude children.
       * @param {boolean} includeState Include itree.state object.
       * @return {object} Node object.
       */
    }, {
      key: "toObject",
      value: function toObject() {
        var _this8 = this;
        var excludeChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var includeState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var exported = {};
        var keys = pull(Object.keys(this), '_tree', 'children', 'itree');

        // Map keys
        each(keys, function (keyName) {
          exported[keyName] = _this8[keyName];
        });

        // Copy over whitelisted itree data
        // Excludes internal-use junk like parent, dirty, ref
        var itree = exported.itree = {};
        itree.a = this.itree.a;
        itree.icon = this.itree.icon;
        itree.li = this.itree.li;
        if (includeState) {
          itree.state = this.itree.state;
        }

        // If including children, export them
        if (!excludeChildren && this.hasChildren() && isFunction(this.children.toArray)) {
          exported.children = this.children.toArray();
        }
        return exported;
      }

      /**
       * Get the text content of this tree node.
       *
       * @return {string} Text content.
       */
    }, {
      key: "toString",
      value: function toString() {
        return this.text;
      }

      /**
       * Get the tree this node ultimately belongs to.
       *
       * @return {InspireTree} Tree instance.
       */
    }, {
      key: "tree",
      value: function tree() {
        return this.context().tree();
      }

      /**
       * Uncheck this node.
       *
       * @param {boolean} shallow Skip auto-unchecking children.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "uncheck",
      value: function uncheck(shallow) {
        this._tree.batch();

        // Will we apply this state change to our children?
        var deep = !shallow && this._tree.config.checkbox.autoCheckChildren;
        baseStateChange('checked', false, 'unchecked', this, deep);

        // Reset indeterminate state
        this.state('indeterminate', false);

        // Refresh our parent
        if (this.hasParent()) {
          this.getParent().refreshIndeterminateState();
        }
        this._tree.end();
        return this;
      }

      /**
       * Get whether node is visible to a user. Returns false
       * if it's hidden, or if any ancestor is hidden or collapsed.
       *
       * @return {boolean} Whether visible.
       */
    }, {
      key: "visible",
      value: function visible() {
        var isVisible = true;
        if (this.hidden() || this.removed() || this._tree.usesNativeDOM && !this.rendered()) {
          isVisible = false;
        } else if (this.hasParent()) {
          if (this.getParent().collapsed()) {
            isVisible = false;
          } else {
            isVisible = this.getParent().visible();
          }
        } else {
          isVisible = true;
        }
        return isVisible;
      }
    }]);
    return TreeNode;
  }();

  // Unique ID creation requires a high quality random # generator. In the browser we therefore
  // require the crypto API and do not support built-in fallback to lower quality random number
  // generators (like Math.random()).
  let getRandomValues;
  const rnds8 = new Uint8Array(16);
  function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
      // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
      getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

      if (!getRandomValues) {
        throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
      }
    }

    return getRandomValues(rnds8);
  }

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */

  const byteToHex = [];

  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
  }

  function unsafeStringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }

  const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native = {
    randomUUID
  };

  function v4(options, buf, offset) {
    if (native.randomUUID && !buf && !options) {
      return native.randomUUID();
    }

    options = options || {};
    const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }

      return buf;
    }

    return unsafeStringify(rnds);
  }

  /**
   * Parse a raw object into a TreeNode used within a tree.
   *
   * Note: Uses native js over lodash where performance
   * benefits most, since this handles every node.
   *
   * @private
   * @param {object} tree Tree instance.
   * @param {object} object Source object
   * @param {object} parent Pointer to parent object.
   * @return {object} Final object
   */
  function objectToNode(tree, object, parent) {
    // Create or type-ensure ID
    object.id = object.id || v4();
    if (typeof object.id !== 'string' && typeof object.id !== 'number') {
      object.id = object.id.toString();
    }

    // High-performance default assignments
    var itree = object.itree = object.itree || {};
    itree.icon = itree.icon || false;
    itree.dirty = false;
    var li = itree.li = itree.li || {};
    li.attributes = li.attributes || {};
    var a = itree.a = itree.a || {};
    a.attributes = a.attributes || {};
    var state = itree.state = itree.state || {};

    // Enabled by default
    state.collapsed = typeof state.collapsed === 'boolean' ? state.collapsed : tree.defaultState.collapsed;
    state.selectable = typeof state.selectable === 'boolean' ? state.selectable : tree.defaultState.selectable;
    state.draggable = typeof state.draggable === 'boolean' ? state.draggable : tree.defaultState.draggable;
    state['drop-target'] = typeof state['drop-target'] === 'boolean' ? state['drop-target'] : tree.defaultState['drop-target'];

    // Disabled by default
    state.checked = typeof state.checked === 'boolean' ? state.checked : false;
    state.editable = typeof state.editable === 'boolean' ? state.editable : tree.defaultState.editable;
    state.editing = typeof state.editing === 'boolean' ? state.editing : tree.defaultState.editing;
    state.focused = state.focused || tree.defaultState.focused;
    state.hidden = state.hidden || tree.defaultState.hidden;
    state.indeterminate = state.indeterminate || tree.defaultState.indeterminate;
    state.loading = state.loading || tree.defaultState.loading;
    state.removed = state.removed || tree.defaultState.removed;
    state.rendered = state.rendered || tree.defaultState.rendered;
    state.selected = state.selected || tree.defaultState.selected;

    // Save parent, if any.
    object.itree.parent = parent;

    // Wrap
    object = _assign(new TreeNode(tree), object);
    if (isArrayLike(object.children)) {
      object.children = collectionToModel(tree, object.children, object);
    }

    // Fire events for pre-set states, if enabled
    if (tree.allowsLoadEvents) {
      each(tree.config.allowLoadEvents, function (eventName) {
        if (state[eventName]) {
          tree.emit('node.' + eventName, object, true);
        }
      });
    }
    return object;
  }

  /**
   * Parses a raw collection of objects into a model used
   * within a tree. Adds state and other internal properties.
   *
   * @private
   * @param {object} tree Tree instance.
   * @param {array} array Array of nodes
   * @param {object} parent Pointer to parent object
   * @return {array|object} Object model.
   */
  function collectionToModel(tree, array, parent) {
    var collection = new TreeNodes(tree, null, {
      calculateRenderablePositions: true
    });
    collection.batch();

    // Sort
    if (tree.config.sort) {
      array = _sortBy(array, tree.config.sort);
    }
    each(array, function (node) {
      collection.push(objectToNode(tree, node, parent));
    });
    collection._context = parent;
    collection.end();
    return collection;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var eventemitter2 = createCommonjsModule(function (module, exports) {
  !function(undefined$1) {
    var hasOwnProperty= Object.hasOwnProperty;
    var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    };
    var defaultMaxListeners = 10;
    var nextTickSupported= typeof process=='object' && typeof process.nextTick=='function';
    var symbolsSupported= typeof Symbol==='function';
    var reflectSupported= typeof Reflect === 'object';
    var setImmediateSupported= typeof setImmediate === 'function';
    var _setImmediate= setImmediateSupported ? setImmediate : setTimeout;
    var ownKeys= symbolsSupported? (reflectSupported && typeof Reflect.ownKeys==='function'? Reflect.ownKeys : function(obj){
      var arr= Object.getOwnPropertyNames(obj);
      arr.push.apply(arr, Object.getOwnPropertySymbols(obj));
      return arr;
    }) : Object.keys;

    function init() {
      this._events = {};
      if (this._conf) {
        configure.call(this, this._conf);
      }
    }

    function configure(conf) {
      if (conf) {
        this._conf = conf;

        conf.delimiter && (this.delimiter = conf.delimiter);

        if(conf.maxListeners!==undefined$1){
            this._maxListeners= conf.maxListeners;
        }

        conf.wildcard && (this.wildcard = conf.wildcard);
        conf.newListener && (this._newListener = conf.newListener);
        conf.removeListener && (this._removeListener = conf.removeListener);
        conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);
        conf.ignoreErrors && (this.ignoreErrors = conf.ignoreErrors);

        if (this.wildcard) {
          this.listenerTree = {};
        }
      }
    }

    function logPossibleMemoryLeak(count, eventName) {
      var errorMsg = '(node) warning: possible EventEmitter memory ' +
          'leak detected. ' + count + ' listeners added. ' +
          'Use emitter.setMaxListeners() to increase limit.';

      if(this.verboseMemoryLeak){
        errorMsg += ' Event name: ' + eventName + '.';
      }

      if(typeof process !== 'undefined' && process.emitWarning){
        var e = new Error(errorMsg);
        e.name = 'MaxListenersExceededWarning';
        e.emitter = this;
        e.count = count;
        process.emitWarning(e);
      } else {
        console.error(errorMsg);

        if (console.trace){
          console.trace();
        }
      }
    }

    var toArray = function (a, b, c) {
      var n = arguments.length;
      switch (n) {
        case 0:
          return [];
        case 1:
          return [a];
        case 2:
          return [a, b];
        case 3:
          return [a, b, c];
        default:
          var arr = new Array(n);
          while (n--) {
            arr[n] = arguments[n];
          }
          return arr;
      }
    };

    function toObject(keys, values) {
      var obj = {};
      var key;
      var len = keys.length;
      var valuesCount = values ? values.length : 0;
      for (var i = 0; i < len; i++) {
        key = keys[i];
        obj[key] = i < valuesCount ? values[i] : undefined$1;
      }
      return obj;
    }

    function TargetObserver(emitter, target, options) {
      this._emitter = emitter;
      this._target = target;
      this._listeners = {};
      this._listenersCount = 0;

      var on, off;

      if (options.on || options.off) {
        on = options.on;
        off = options.off;
      }

      if (target.addEventListener) {
        on = target.addEventListener;
        off = target.removeEventListener;
      } else if (target.addListener) {
        on = target.addListener;
        off = target.removeListener;
      } else if (target.on) {
        on = target.on;
        off = target.off;
      }

      if (!on && !off) {
        throw Error('target does not implement any known event API');
      }

      if (typeof on !== 'function') {
        throw TypeError('on method must be a function');
      }

      if (typeof off !== 'function') {
        throw TypeError('off method must be a function');
      }

      this._on = on;
      this._off = off;

      var _observers= emitter._observers;
      if(_observers){
        _observers.push(this);
      }else {
        emitter._observers= [this];
      }
    }

    Object.assign(TargetObserver.prototype, {
      subscribe: function(event, localEvent, reducer){
        var observer= this;
        var target= this._target;
        var emitter= this._emitter;
        var listeners= this._listeners;
        var handler= function(){
          var args= toArray.apply(null, arguments);
          var eventObj= {
            data: args,
            name: localEvent,
            original: event
          };
          if(reducer){
            var result= reducer.call(target, eventObj);
            if(result!==false){
              emitter.emit.apply(emitter, [eventObj.name].concat(args));
            }
            return;
          }
          emitter.emit.apply(emitter, [localEvent].concat(args));
        };


        if(listeners[event]){
          throw Error('Event \'' + event + '\' is already listening');
        }

        this._listenersCount++;

        if(emitter._newListener && emitter._removeListener && !observer._onNewListener){

          this._onNewListener = function (_event) {
            if (_event === localEvent && listeners[event] === null) {
              listeners[event] = handler;
              observer._on.call(target, event, handler);
            }
          };

          emitter.on('newListener', this._onNewListener);

          this._onRemoveListener= function(_event){
            if(_event === localEvent && !emitter.hasListeners(_event) && listeners[event]){
              listeners[event]= null;
              observer._off.call(target, event, handler);
            }
          };

          listeners[event]= null;

          emitter.on('removeListener', this._onRemoveListener);
        }else {
          listeners[event]= handler;
          observer._on.call(target, event, handler);
        }
      },

      unsubscribe: function(event){
        var observer= this;
        var listeners= this._listeners;
        var emitter= this._emitter;
        var handler;
        var events;
        var off= this._off;
        var target= this._target;
        var i;

        if(event && typeof event!=='string'){
          throw TypeError('event must be a string');
        }

        function clearRefs(){
          if(observer._onNewListener){
            emitter.off('newListener', observer._onNewListener);
            emitter.off('removeListener', observer._onRemoveListener);
            observer._onNewListener= null;
            observer._onRemoveListener= null;
          }
          var index= findTargetIndex.call(emitter, observer);
          emitter._observers.splice(index, 1);
        }

        if(event){
          handler= listeners[event];
          if(!handler) return;
          off.call(target, event, handler);
          delete listeners[event];
          if(!--this._listenersCount){
            clearRefs();
          }
        }else {
          events= ownKeys(listeners);
          i= events.length;
          while(i-->0){
            event= events[i];
            off.call(target, event, listeners[event]);
          }
          this._listeners= {};
          this._listenersCount= 0;
          clearRefs();
        }
      }
    });

    function resolveOptions(options, schema, reducers, allowUnknown) {
      var computedOptions = Object.assign({}, schema);

      if (!options) return computedOptions;

      if (typeof options !== 'object') {
        throw TypeError('options must be an object')
      }

      var keys = Object.keys(options);
      var length = keys.length;
      var option, value;
      var reducer;

      function reject(reason) {
        throw Error('Invalid "' + option + '" option value' + (reason ? '. Reason: ' + reason : ''))
      }

      for (var i = 0; i < length; i++) {
        option = keys[i];
        if (!allowUnknown && !hasOwnProperty.call(schema, option)) {
          throw Error('Unknown "' + option + '" option');
        }
        value = options[option];
        if (value !== undefined$1) {
          reducer = reducers[option];
          computedOptions[option] = reducer ? reducer(value, reject) : value;
        }
      }
      return computedOptions;
    }

    function constructorReducer(value, reject) {
      if (typeof value !== 'function' || !value.hasOwnProperty('prototype')) {
        reject('value must be a constructor');
      }
      return value;
    }

    function makeTypeReducer(types) {
      var message= 'value must be type of ' + types.join('|');
      var len= types.length;
      var firstType= types[0];
      var secondType= types[1];

      if (len === 1) {
        return function (v, reject) {
          if (typeof v === firstType) {
            return v;
          }
          reject(message);
        }
      }

      if (len === 2) {
        return function (v, reject) {
          var kind= typeof v;
          if (kind === firstType || kind === secondType) return v;
          reject(message);
        }
      }

      return function (v, reject) {
        var kind = typeof v;
        var i = len;
        while (i-- > 0) {
          if (kind === types[i]) return v;
        }
        reject(message);
      }
    }

    var functionReducer= makeTypeReducer(['function']);

    var objectFunctionReducer= makeTypeReducer(['object', 'function']);

    function makeCancelablePromise(Promise, executor, options) {
      var isCancelable;
      var callbacks;
      var timer= 0;
      var subscriptionClosed;

      var promise = new Promise(function (resolve, reject, onCancel) {
        options= resolveOptions(options, {
          timeout: 0,
          overload: false
        }, {
          timeout: function(value, reject){
            value*= 1;
            if (typeof value !== 'number' || value < 0 || !Number.isFinite(value)) {
              reject('timeout must be a positive number');
            }
            return value;
          }
        });

        isCancelable = !options.overload && typeof Promise.prototype.cancel === 'function' && typeof onCancel === 'function';

        function cleanup() {
          if (callbacks) {
            callbacks = null;
          }
          if (timer) {
            clearTimeout(timer);
            timer = 0;
          }
        }

        var _resolve= function(value){
          cleanup();
          resolve(value);
        };

        var _reject= function(err){
          cleanup();
          reject(err);
        };

        if (isCancelable) {
          executor(_resolve, _reject, onCancel);
        } else {
          callbacks = [function(reason){
            _reject(reason || Error('canceled'));
          }];
          executor(_resolve, _reject, function (cb) {
            if (subscriptionClosed) {
              throw Error('Unable to subscribe on cancel event asynchronously')
            }
            if (typeof cb !== 'function') {
              throw TypeError('onCancel callback must be a function');
            }
            callbacks.push(cb);
          });
          subscriptionClosed= true;
        }

        if (options.timeout > 0) {
          timer= setTimeout(function(){
            var reason= Error('timeout');
            reason.code = 'ETIMEDOUT';
            timer= 0;
            promise.cancel(reason);
            reject(reason);
          }, options.timeout);
        }
      });

      if (!isCancelable) {
        promise.cancel = function (reason) {
          if (!callbacks) {
            return;
          }
          var length = callbacks.length;
          for (var i = 1; i < length; i++) {
            callbacks[i](reason);
          }
          // internal callback to reject the promise
          callbacks[0](reason);
          callbacks = null;
        };
      }

      return promise;
    }

    function findTargetIndex(observer) {
      var observers = this._observers;
      if(!observers){
        return -1;
      }
      var len = observers.length;
      for (var i = 0; i < len; i++) {
        if (observers[i]._target === observer) return i;
      }
      return -1;
    }

    // Attention, function return type now is array, always !
    // It has zero elements if no any matches found and one or more
    // elements (leafs) if there are matches
    //
    function searchListenerTree(handlers, type, tree, i, typeLength) {
      if (!tree) {
        return null;
      }

      if (i === 0) {
        var kind = typeof type;
        if (kind === 'string') {
          var ns, n, l = 0, j = 0, delimiter = this.delimiter, dl = delimiter.length;
          if ((n = type.indexOf(delimiter)) !== -1) {
            ns = new Array(5);
            do {
              ns[l++] = type.slice(j, n);
              j = n + dl;
            } while ((n = type.indexOf(delimiter, j)) !== -1);

            ns[l++] = type.slice(j);
            type = ns;
            typeLength = l;
          } else {
            type = [type];
            typeLength = 1;
          }
        } else if (kind === 'object') {
          typeLength = type.length;
        } else {
          type = [type];
          typeLength = 1;
        }
      }

      var listeners= null, branch, xTree, xxTree, isolatedBranch, endReached, currentType = type[i],
          nextType = type[i + 1], branches, _listeners;

      if (i === typeLength) {
        //
        // If at the end of the event(s) list and the tree has listeners
        // invoke those listeners.
        //

        if(tree._listeners) {
          if (typeof tree._listeners === 'function') {
            handlers && handlers.push(tree._listeners);
            listeners = [tree];
          } else {
            handlers && handlers.push.apply(handlers, tree._listeners);
            listeners = [tree];
          }
        }
      } else {

        if (currentType === '*') {
          //
          // If the event emitted is '*' at this part
          // or there is a concrete match at this patch
          //
          branches = ownKeys(tree);
          n = branches.length;
          while (n-- > 0) {
            branch = branches[n];
            if (branch !== '_listeners') {
              _listeners = searchListenerTree(handlers, type, tree[branch], i + 1, typeLength);
              if (_listeners) {
                if (listeners) {
                  listeners.push.apply(listeners, _listeners);
                } else {
                  listeners = _listeners;
                }
              }
            }
          }
          return listeners;
        } else if (currentType === '**') {
          endReached = (i + 1 === typeLength || (i + 2 === typeLength && nextType === '*'));
          if (endReached && tree._listeners) {
            // The next element has a _listeners, add it to the handlers.
            listeners = searchListenerTree(handlers, type, tree, typeLength, typeLength);
          }

          branches = ownKeys(tree);
          n = branches.length;
          while (n-- > 0) {
            branch = branches[n];
            if (branch !== '_listeners') {
              if (branch === '*' || branch === '**') {
                if (tree[branch]._listeners && !endReached) {
                  _listeners = searchListenerTree(handlers, type, tree[branch], typeLength, typeLength);
                  if (_listeners) {
                    if (listeners) {
                      listeners.push.apply(listeners, _listeners);
                    } else {
                      listeners = _listeners;
                    }
                  }
                }
                _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
              } else if (branch === nextType) {
                _listeners = searchListenerTree(handlers, type, tree[branch], i + 2, typeLength);
              } else {
                // No match on this one, shift into the tree but not in the type array.
                _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
              }
              if (_listeners) {
                if (listeners) {
                  listeners.push.apply(listeners, _listeners);
                } else {
                  listeners = _listeners;
                }
              }
            }
          }
          return listeners;
        } else if (tree[currentType]) {
          listeners = searchListenerTree(handlers, type, tree[currentType], i + 1, typeLength);
        }
      }

        xTree = tree['*'];
      if (xTree) {
        //
        // If the listener tree will allow any match for this part,
        // then recursively explore all branches of the tree
        //
        searchListenerTree(handlers, type, xTree, i + 1, typeLength);
      }

      xxTree = tree['**'];
      if (xxTree) {
        if (i < typeLength) {
          if (xxTree._listeners) {
            // If we have a listener on a '**', it will catch all, so add its handler.
            searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
          }

          // Build arrays of matching next branches and others.
          branches= ownKeys(xxTree);
          n= branches.length;
          while(n-->0){
            branch= branches[n];
            if (branch !== '_listeners') {
              if (branch === nextType) {
                // We know the next element will match, so jump twice.
                searchListenerTree(handlers, type, xxTree[branch], i + 2, typeLength);
              } else if (branch === currentType) {
                // Current node matches, move into the tree.
                searchListenerTree(handlers, type, xxTree[branch], i + 1, typeLength);
              } else {
                isolatedBranch = {};
                isolatedBranch[branch] = xxTree[branch];
                searchListenerTree(handlers, type, {'**': isolatedBranch}, i + 1, typeLength);
              }
            }
          }
        } else if (xxTree._listeners) {
          // We have reached the end and still on a '**'
          searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
        } else if (xxTree['*'] && xxTree['*']._listeners) {
          searchListenerTree(handlers, type, xxTree['*'], typeLength, typeLength);
        }
      }

      return listeners;
    }

    function growListenerTree(type, listener, prepend) {
      var len = 0, j = 0, i, delimiter = this.delimiter, dl= delimiter.length, ns;

      if(typeof type==='string') {
        if ((i = type.indexOf(delimiter)) !== -1) {
          ns = new Array(5);
          do {
            ns[len++] = type.slice(j, i);
            j = i + dl;
          } while ((i = type.indexOf(delimiter, j)) !== -1);

          ns[len++] = type.slice(j);
        }else {
          ns= [type];
          len= 1;
        }
      }else {
        ns= type;
        len= type.length;
      }

      //
      // Looks for two consecutive '**', if so, don't add the event at all.
      //
      if (len > 1) {
        for (i = 0; i + 1 < len; i++) {
          if (ns[i] === '**' && ns[i + 1] === '**') {
            return;
          }
        }
      }



      var tree = this.listenerTree, name;

      for (i = 0; i < len; i++) {
        name = ns[i];

        tree = tree[name] || (tree[name] = {});

        if (i === len - 1) {
          if (!tree._listeners) {
            tree._listeners = listener;
          } else {
            if (typeof tree._listeners === 'function') {
              tree._listeners = [tree._listeners];
            }

            if (prepend) {
              tree._listeners.unshift(listener);
            } else {
              tree._listeners.push(listener);
            }

            if (
                !tree._listeners.warned &&
                this._maxListeners > 0 &&
                tree._listeners.length > this._maxListeners
            ) {
              tree._listeners.warned = true;
              logPossibleMemoryLeak.call(this, tree._listeners.length, name);
            }
          }
          return true;
        }
      }

      return true;
    }

    function collectTreeEvents(tree, events, root, asArray){
       var branches= ownKeys(tree);
       var i= branches.length;
       var branch, branchName, path;
       var hasListeners= tree['_listeners'];
       var isArrayPath;

       while(i-->0){
           branchName= branches[i];

           branch= tree[branchName];

           if(branchName==='_listeners'){
               path= root;
           }else {
               path = root ? root.concat(branchName) : [branchName];
           }

           isArrayPath= asArray || typeof branchName==='symbol';

           hasListeners && events.push(isArrayPath? path : path.join(this.delimiter));

           if(typeof branch==='object'){
               collectTreeEvents.call(this, branch, events, path, isArrayPath);
           }
       }

       return events;
    }

    function recursivelyGarbageCollect(root) {
      var keys = ownKeys(root);
      var i= keys.length;
      var obj, key, flag;
      while(i-->0){
        key = keys[i];
        obj = root[key];

        if(obj){
            flag= true;
            if(key !== '_listeners' && !recursivelyGarbageCollect(obj)){
               delete root[key];
            }
        }
      }

      return flag;
    }

    function Listener(emitter, event, listener){
      this.emitter= emitter;
      this.event= event;
      this.listener= listener;
    }

    Listener.prototype.off= function(){
      this.emitter.off(this.event, this.listener);
      return this;
    };

    function setupListener(event, listener, options){
        if (options === true) {
          promisify = true;
        } else if (options === false) {
          async = true;
        } else {
          if (!options || typeof options !== 'object') {
            throw TypeError('options should be an object or true');
          }
          var async = options.async;
          var promisify = options.promisify;
          var nextTick = options.nextTick;
          var objectify = options.objectify;
        }

        if (async || nextTick || promisify) {
          var _listener = listener;
          var _origin = listener._origin || listener;

          if (nextTick && !nextTickSupported) {
            throw Error('process.nextTick is not supported');
          }

          if (promisify === undefined$1) {
            promisify = listener.constructor.name === 'AsyncFunction';
          }

          listener = function () {
            var args = arguments;
            var context = this;
            var event = this.event;

            return promisify ? (nextTick ? Promise.resolve() : new Promise(function (resolve) {
              _setImmediate(resolve);
            }).then(function () {
              context.event = event;
              return _listener.apply(context, args)
            })) : (nextTick ? process.nextTick : _setImmediate)(function () {
              context.event = event;
              _listener.apply(context, args);
            });
          };

          listener._async = true;
          listener._origin = _origin;
        }

      return [listener, objectify? new Listener(this, event, listener): this];
    }

    function EventEmitter(conf) {
      this._events = {};
      this._newListener = false;
      this._removeListener = false;
      this.verboseMemoryLeak = false;
      configure.call(this, conf);
    }

    EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

    EventEmitter.prototype.listenTo= function(target, events, options){
      if(typeof target!=='object'){
        throw TypeError('target musts be an object');
      }

      var emitter= this;

      options = resolveOptions(options, {
        on: undefined$1,
        off: undefined$1,
        reducers: undefined$1
      }, {
        on: functionReducer,
        off: functionReducer,
        reducers: objectFunctionReducer
      });

      function listen(events){
        if(typeof events!=='object'){
          throw TypeError('events must be an object');
        }

        var reducers= options.reducers;
        var index= findTargetIndex.call(emitter, target);
        var observer;

        if(index===-1){
          observer= new TargetObserver(emitter, target, options);
        }else {
          observer= emitter._observers[index];
        }

        var keys= ownKeys(events);
        var len= keys.length;
        var event;
        var isSingleReducer= typeof reducers==='function';

        for(var i=0; i<len; i++){
          event= keys[i];
          observer.subscribe(
              event,
              events[event] || event,
              isSingleReducer ? reducers : reducers && reducers[event]
          );
        }
      }

      isArray(events)?
          listen(toObject(events)) :
          (typeof events==='string'? listen(toObject(events.split(/\s+/))): listen(events));

      return this;
    };

    EventEmitter.prototype.stopListeningTo = function (target, event) {
      var observers = this._observers;

      if(!observers){
        return false;
      }

      var i = observers.length;
      var observer;
      var matched= false;

      if(target && typeof target!=='object'){
        throw TypeError('target should be an object');
      }

      while (i-- > 0) {
        observer = observers[i];
        if (!target || observer._target === target) {
          observer.unsubscribe(event);
          matched= true;
        }
      }

      return matched;
    };

    // By default EventEmitters will print a warning if more than
    // 10 listeners are added to it. This is a useful default which
    // helps finding memory leaks.
    //
    // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.

    EventEmitter.prototype.delimiter = '.';

    EventEmitter.prototype.setMaxListeners = function(n) {
      if (n !== undefined$1) {
        this._maxListeners = n;
        if (!this._conf) this._conf = {};
        this._conf.maxListeners = n;
      }
    };

    EventEmitter.prototype.getMaxListeners = function() {
      return this._maxListeners;
    };

    EventEmitter.prototype.event = '';

    EventEmitter.prototype.once = function(event, fn, options) {
      return this._once(event, fn, false, options);
    };

    EventEmitter.prototype.prependOnceListener = function(event, fn, options) {
      return this._once(event, fn, true, options);
    };

    EventEmitter.prototype._once = function(event, fn, prepend, options) {
      return this._many(event, 1, fn, prepend, options);
    };

    EventEmitter.prototype.many = function(event, ttl, fn, options) {
      return this._many(event, ttl, fn, false, options);
    };

    EventEmitter.prototype.prependMany = function(event, ttl, fn, options) {
      return this._many(event, ttl, fn, true, options);
    };

    EventEmitter.prototype._many = function(event, ttl, fn, prepend, options) {
      var self = this;

      if (typeof fn !== 'function') {
        throw new Error('many only accepts instances of Function');
      }

      function listener() {
        if (--ttl === 0) {
          self.off(event, listener);
        }
        return fn.apply(this, arguments);
      }

      listener._origin = fn;

      return this._on(event, listener, prepend, options);
    };

    EventEmitter.prototype.emit = function() {
      if (!this._events && !this._all) {
        return false;
      }

      this._events || init.call(this);

      var type = arguments[0], ns, wildcard= this.wildcard;
      var args,l,i,j, containsSymbol;

      if (type === 'newListener' && !this._newListener) {
        if (!this._events.newListener) {
          return false;
        }
      }

      if (wildcard) {
        ns= type;
        if(type!=='newListener' && type!=='removeListener'){
          if (typeof type === 'object') {
            l = type.length;
            if (symbolsSupported) {
              for (i = 0; i < l; i++) {
                if (typeof type[i] === 'symbol') {
                  containsSymbol = true;
                  break;
                }
              }
            }
            if (!containsSymbol) {
              type = type.join(this.delimiter);
            }
          }
        }
      }

      var al = arguments.length;
      var handler;

      if (this._all && this._all.length) {
        handler = this._all.slice();

        for (i = 0, l = handler.length; i < l; i++) {
          this.event = type;
          switch (al) {
          case 1:
            handler[i].call(this, type);
            break;
          case 2:
            handler[i].call(this, type, arguments[1]);
            break;
          case 3:
            handler[i].call(this, type, arguments[1], arguments[2]);
            break;
          default:
            handler[i].apply(this, arguments);
          }
        }
      }

      if (wildcard) {
        handler = [];
        searchListenerTree.call(this, handler, ns, this.listenerTree, 0, l);
      } else {
        handler = this._events[type];
        if (typeof handler === 'function') {
          this.event = type;
          switch (al) {
          case 1:
            handler.call(this);
            break;
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          default:
            args = new Array(al - 1);
            for (j = 1; j < al; j++) args[j - 1] = arguments[j];
            handler.apply(this, args);
          }
          return true;
        } else if (handler) {
          // need to make copy of handlers because list can change in the middle
          // of emit call
          handler = handler.slice();
        }
      }

      if (handler && handler.length) {
        if (al > 3) {
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        }
        for (i = 0, l = handler.length; i < l; i++) {
          this.event = type;
          switch (al) {
          case 1:
            handler[i].call(this);
            break;
          case 2:
            handler[i].call(this, arguments[1]);
            break;
          case 3:
            handler[i].call(this, arguments[1], arguments[2]);
            break;
          default:
            handler[i].apply(this, args);
          }
        }
        return true;
      } else if (!this.ignoreErrors && !this._all && type === 'error') {
        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
      }

      return !!this._all;
    };

    EventEmitter.prototype.emitAsync = function() {
      if (!this._events && !this._all) {
        return false;
      }

      this._events || init.call(this);

      var type = arguments[0], wildcard= this.wildcard, ns, containsSymbol;
      var args,l,i,j;

      if (type === 'newListener' && !this._newListener) {
          if (!this._events.newListener) { return Promise.resolve([false]); }
      }

      if (wildcard) {
        ns= type;
        if(type!=='newListener' && type!=='removeListener'){
          if (typeof type === 'object') {
            l = type.length;
            if (symbolsSupported) {
              for (i = 0; i < l; i++) {
                if (typeof type[i] === 'symbol') {
                  containsSymbol = true;
                  break;
                }
              }
            }
            if (!containsSymbol) {
              type = type.join(this.delimiter);
            }
          }
        }
      }

      var promises= [];

      var al = arguments.length;
      var handler;

      if (this._all) {
        for (i = 0, l = this._all.length; i < l; i++) {
          this.event = type;
          switch (al) {
          case 1:
            promises.push(this._all[i].call(this, type));
            break;
          case 2:
            promises.push(this._all[i].call(this, type, arguments[1]));
            break;
          case 3:
            promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
            break;
          default:
            promises.push(this._all[i].apply(this, arguments));
          }
        }
      }

      if (wildcard) {
        handler = [];
        searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
      } else {
        handler = this._events[type];
      }

      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(handler.call(this));
          break;
        case 2:
          promises.push(handler.call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler.call(this, arguments[1], arguments[2]));
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          promises.push(handler.apply(this, args));
        }
      } else if (handler && handler.length) {
        handler = handler.slice();
        if (al > 3) {
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        }
        for (i = 0, l = handler.length; i < l; i++) {
          this.event = type;
          switch (al) {
          case 1:
            promises.push(handler[i].call(this));
            break;
          case 2:
            promises.push(handler[i].call(this, arguments[1]));
            break;
          case 3:
            promises.push(handler[i].call(this, arguments[1], arguments[2]));
            break;
          default:
            promises.push(handler[i].apply(this, args));
          }
        }
      } else if (!this.ignoreErrors && !this._all && type === 'error') {
        if (arguments[1] instanceof Error) {
          return Promise.reject(arguments[1]); // Unhandled 'error' event
        } else {
          return Promise.reject("Uncaught, unspecified 'error' event.");
        }
      }

      return Promise.all(promises);
    };

    EventEmitter.prototype.on = function(type, listener, options) {
      return this._on(type, listener, false, options);
    };

    EventEmitter.prototype.prependListener = function(type, listener, options) {
      return this._on(type, listener, true, options);
    };

    EventEmitter.prototype.onAny = function(fn) {
      return this._onAny(fn, false);
    };

    EventEmitter.prototype.prependAny = function(fn) {
      return this._onAny(fn, true);
    };

    EventEmitter.prototype.addListener = EventEmitter.prototype.on;

    EventEmitter.prototype._onAny = function(fn, prepend){
      if (typeof fn !== 'function') {
        throw new Error('onAny only accepts instances of Function');
      }

      if (!this._all) {
        this._all = [];
      }

      // Add the function to the event listener collection.
      if(prepend){
        this._all.unshift(fn);
      }else {
        this._all.push(fn);
      }

      return this;
    };

    EventEmitter.prototype._on = function(type, listener, prepend, options) {
      if (typeof type === 'function') {
        this._onAny(type, listener);
        return this;
      }

      if (typeof listener !== 'function') {
        throw new Error('on only accepts instances of Function');
      }
      this._events || init.call(this);

      var returnValue= this, temp;

      if (options !== undefined$1) {
        temp = setupListener.call(this, type, listener, options);
        listener = temp[0];
        returnValue = temp[1];
      }

      // To avoid recursion in the case that type == "newListeners"! Before
      // adding it to the listeners, first emit "newListeners".
      if (this._newListener) {
        this.emit('newListener', type, listener);
      }

      if (this.wildcard) {
        growListenerTree.call(this, type, listener, prepend);
        return returnValue;
      }

      if (!this._events[type]) {
        // Optimize the case of one listener. Don't need the extra array object.
        this._events[type] = listener;
      } else {
        if (typeof this._events[type] === 'function') {
          // Change to array.
          this._events[type] = [this._events[type]];
        }

        // If we've already got an array, just add
        if(prepend){
          this._events[type].unshift(listener);
        }else {
          this._events[type].push(listener);
        }

        // Check for listener leak
        if (
          !this._events[type].warned &&
          this._maxListeners > 0 &&
          this._events[type].length > this._maxListeners
        ) {
          this._events[type].warned = true;
          logPossibleMemoryLeak.call(this, this._events[type].length, type);
        }
      }

      return returnValue;
    };

    EventEmitter.prototype.off = function(type, listener) {
      if (typeof listener !== 'function') {
        throw new Error('removeListener only takes instances of Function');
      }

      var handlers,leafs=[];

      if(this.wildcard) {
        var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
        leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
        if(!leafs) return this;
      } else {
        // does not use listeners(), so no side effect of creating _events[type]
        if (!this._events[type]) return this;
        handlers = this._events[type];
        leafs.push({_listeners:handlers});
      }

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        handlers = leaf._listeners;
        if (isArray(handlers)) {

          var position = -1;

          for (var i = 0, length = handlers.length; i < length; i++) {
            if (handlers[i] === listener ||
              (handlers[i].listener && handlers[i].listener === listener) ||
              (handlers[i]._origin && handlers[i]._origin === listener)) {
              position = i;
              break;
            }
          }

          if (position < 0) {
            continue;
          }

          if(this.wildcard) {
            leaf._listeners.splice(position, 1);
          }
          else {
            this._events[type].splice(position, 1);
          }

          if (handlers.length === 0) {
            if(this.wildcard) {
              delete leaf._listeners;
            }
            else {
              delete this._events[type];
            }
          }
          if (this._removeListener)
            this.emit("removeListener", type, listener);

          return this;
        }
        else if (handlers === listener ||
          (handlers.listener && handlers.listener === listener) ||
          (handlers._origin && handlers._origin === listener)) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
          if (this._removeListener)
            this.emit("removeListener", type, listener);
        }
      }

      this.listenerTree && recursivelyGarbageCollect(this.listenerTree);

      return this;
    };

    EventEmitter.prototype.offAny = function(fn) {
      var i = 0, l = 0, fns;
      if (fn && this._all && this._all.length > 0) {
        fns = this._all;
        for(i = 0, l = fns.length; i < l; i++) {
          if(fn === fns[i]) {
            fns.splice(i, 1);
            if (this._removeListener)
              this.emit("removeListenerAny", fn);
            return this;
          }
        }
      } else {
        fns = this._all;
        if (this._removeListener) {
          for(i = 0, l = fns.length; i < l; i++)
            this.emit("removeListenerAny", fns[i]);
        }
        this._all = [];
      }
      return this;
    };

    EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

    EventEmitter.prototype.removeAllListeners = function (type) {
      if (type === undefined$1) {
        !this._events || init.call(this);
        return this;
      }

      if (this.wildcard) {
        var leafs = searchListenerTree.call(this, null, type, this.listenerTree, 0), leaf, i;
        if (!leafs) return this;
        for (i = 0; i < leafs.length; i++) {
          leaf = leafs[i];
          leaf._listeners = null;
        }
        this.listenerTree && recursivelyGarbageCollect(this.listenerTree);
      } else if (this._events) {
        this._events[type] = null;
      }
      return this;
    };

    EventEmitter.prototype.listeners = function (type) {
      var _events = this._events;
      var keys, listeners, allListeners;
      var i;
      var listenerTree;

      if (type === undefined$1) {
        if (this.wildcard) {
          throw Error('event name required for wildcard emitter');
        }

        if (!_events) {
          return [];
        }

        keys = ownKeys(_events);
        i = keys.length;
        allListeners = [];
        while (i-- > 0) {
          listeners = _events[keys[i]];
          if (typeof listeners === 'function') {
            allListeners.push(listeners);
          } else {
            allListeners.push.apply(allListeners, listeners);
          }
        }
        return allListeners;
      } else {
        if (this.wildcard) {
          listenerTree= this.listenerTree;
          if(!listenerTree) return [];
          var handlers = [];
          var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
          searchListenerTree.call(this, handlers, ns, listenerTree, 0);
          return handlers;
        }

        if (!_events) {
          return [];
        }

        listeners = _events[type];

        if (!listeners) {
          return [];
        }
        return typeof listeners === 'function' ? [listeners] : listeners;
      }
    };

    EventEmitter.prototype.eventNames = function(nsAsArray){
      var _events= this._events;
      return this.wildcard? collectTreeEvents.call(this, this.listenerTree, [], null, nsAsArray) : (_events? ownKeys(_events) : []);
    };

    EventEmitter.prototype.listenerCount = function(type) {
      return this.listeners(type).length;
    };

    EventEmitter.prototype.hasListeners = function (type) {
      if (this.wildcard) {
        var handlers = [];
        var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
        searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
        return handlers.length > 0;
      }

      var _events = this._events;
      var _all = this._all;

      return !!(_all && _all.length || _events && (type === undefined$1 ? ownKeys(_events).length : _events[type]));
    };

    EventEmitter.prototype.listenersAny = function() {

      if(this._all) {
        return this._all;
      }
      else {
        return [];
      }

    };

    EventEmitter.prototype.waitFor = function (event, options) {
      var self = this;
      var type = typeof options;
      if (type === 'number') {
        options = {timeout: options};
      } else if (type === 'function') {
        options = {filter: options};
      }

      options= resolveOptions(options, {
        timeout: 0,
        filter: undefined$1,
        handleError: false,
        Promise: Promise,
        overload: false
      }, {
        filter: functionReducer,
        Promise: constructorReducer
      });

      return makeCancelablePromise(options.Promise, function (resolve, reject, onCancel) {
        function listener() {
          var filter= options.filter;
          if (filter && !filter.apply(self, arguments)) {
            return;
          }
          self.off(event, listener);
          if (options.handleError) {
            var err = arguments[0];
            err ? reject(err) : resolve(toArray.apply(null, arguments).slice(1));
          } else {
            resolve(toArray.apply(null, arguments));
          }
        }

        onCancel(function(){
          self.off(event, listener);
        });

        self._on(event, listener, false);
      }, {
        timeout: options.timeout,
        overload: options.overload
      })
    };

    function once(emitter, name, options) {
      options= resolveOptions(options, {
        Promise: Promise,
        timeout: 0,
        overload: false
      }, {
        Promise: constructorReducer
      });

      var _Promise= options.Promise;

      return makeCancelablePromise(_Promise, function(resolve, reject, onCancel){
        var handler;
        if (typeof emitter.addEventListener === 'function') {
          handler=  function () {
            resolve(toArray.apply(null, arguments));
          };

          onCancel(function(){
            emitter.removeEventListener(name, handler);
          });

          emitter.addEventListener(
              name,
              handler,
              {once: true}
          );
          return;
        }

        var eventListener = function(){
          errorListener && emitter.removeListener('error', errorListener);
          resolve(toArray.apply(null, arguments));
        };

        var errorListener;

        if (name !== 'error') {
          errorListener = function (err){
            emitter.removeListener(name, eventListener);
            reject(err);
          };

          emitter.once('error', errorListener);
        }

        onCancel(function(){
          errorListener && emitter.removeListener('error', errorListener);
          emitter.removeListener(name, eventListener);
        });

        emitter.once(name, eventListener);
      }, {
        timeout: options.timeout,
        overload: options.overload
      });
    }

    var prototype= EventEmitter.prototype;

    Object.defineProperties(EventEmitter, {
      defaultMaxListeners: {
        get: function () {
          return prototype._maxListeners;
        },
        set: function (n) {
          if (typeof n !== 'number' || n < 0 || Number.isNaN(n)) {
            throw TypeError('n must be a non-negative number')
          }
          prototype._maxListeners = n;
        },
        enumerable: true
      },
      once: {
        value: once,
        writable: true,
        configurable: true
      }
    });

    Object.defineProperties(prototype, {
        _maxListeners: {
            value: defaultMaxListeners,
            writable: true,
            configurable: true
        },
        _observers: {value: null, writable: true, configurable: true}
    });

    if (typeof undefined$1 === 'function' && undefined$1.amd) {
       // AMD. Register as an anonymous module.
      undefined$1(function() {
        return EventEmitter;
      });
    } else {
      // CommonJS
      module.exports = EventEmitter;
    }
  }();
  });
  var eventemitter2_1 = eventemitter2.EventEmitter2;

  /**
   * Maps a method to the root TreeNodes collection.
   *
   * @private
   * @param {InspireTree} tree Tree instance.
   * @param {string} method Method name.
   * @param {arguments} args Proxied arguments.
   * @return {mixed} Proxied return value.
   */
  function _map2(tree, method, args) {
    return tree.model[method].apply(tree.model, args);
  }

  /**
   * Represents a singe tree instance.
   *
   * @return {InspireTree} Tree instance.
   */
  var InspireTree = /*#__PURE__*/function (_EventEmitter) {
    _inherits(InspireTree, _EventEmitter);
    var _super = _createSuper(InspireTree);
    function InspireTree(opts) {
      var _this;
      _classCallCheck(this, InspireTree);
      _this = _super.call(this);

      // Init properties
      _this._lastSelectedNode;
      _this._muted = false;
      _this.allowsLoadEvents = false;
      _this.id = v4();
      _this.initialized = false;
      _this.isDynamic = false;
      _this.opts = opts;
      _this.preventDeselection = false;

      // Assign defaults
      _this.config = defaultsDeep({}, opts, {
        allowLoadEvents: [],
        checkbox: {
          autoCheckChildren: true
        },
        contextMenu: false,
        data: false,
        editable: false,
        editing: {
          add: false,
          edit: false,
          remove: false
        },
        nodes: {
          resetStateOnRestore: true
        },
        pagination: {
          limit: -1
        },
        search: {
          matcher: false,
          matchProcessor: false
        },
        selection: {
          allow: noop,
          autoDeselect: true,
          autoSelectChildren: false,
          disableDirectDeselection: false,
          mode: 'default',
          multiple: false,
          require: false
        },
        showCheckboxes: false,
        sort: false
      });

      // If checkbox mode, we must force auto-selecting children
      if (_this.config.selection.mode === 'checkbox') {
        _this.config.selection.autoSelectChildren = true;

        // In checkbox mode, checked=selected
        _this.on('node.checked', function (node) {
          if (!node.selected()) {
            node.select(true);
          }
        });
        _this.on('node.selected', function (node) {
          if (!node.checked()) {
            node.check(true);
          }
        });
        _this.on('node.unchecked', function (node) {
          if (node.selected()) {
            node.deselect(true);
          }
        });
        _this.on('node.deselected', function (node) {
          if (node.checked()) {
            node.uncheck(true);
          }
        });
      }

      // If auto-selecting children, we must force multiselect
      if (_this.config.selection.autoSelectChildren) {
        _this.config.selection.multiple = true;
        _this.config.selection.autoDeselect = false;
      }

      // Treat editable as full edit mode
      if (opts.editable && !opts.editing) {
        _this.config.editing.add = true;
        _this.config.editing.edit = true;
        _this.config.editing.remove = true;
      }

      // Support simple config for search
      if (isFunction(opts.search)) {
        _this.config.search = {
          matcher: opts.search,
          matchProcessor: false
        };
      }

      // Init the default state for nodes
      _this.defaultState = {
        collapsed: true,
        editable: get(_assertThisInitialized(_this), 'config.editing.edit'),
        editing: false,
        draggable: true,
        'drop-target': true,
        focused: false,
        hidden: false,
        indeterminate: false,
        loading: false,
        matched: false,
        removed: false,
        rendered: false,
        selectable: true,
        selected: false
      };

      // Cache some configs
      _this.allowsLoadEvents = isArray(_this.config.allowLoadEvents) && _this.config.allowLoadEvents.length > 0;
      _this.isDynamic = isFunction(_this.config.data);

      // Override emitter so we can better control flow
      var emit = _this.emit;
      _this.emit = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (!_this.isEventMuted(args[0])) {
          // Duck-type for a DOM event
          if (isFunction(get(args, '[0].preventDefault'))) {
            var event = args[0];
            event.treeDefaultPrevented = false;
            event.preventTreeDefault = function () {
              event.treeDefaultPrevented = true;
            };
          }
          emit.apply(_assertThisInitialized(_this), args);
        }
      };

      // Init the model
      _this.model = new TreeNodes(_assertThisInitialized(_this));

      // Load initial user data
      if (_this.config.data) {
        _this.load(_this.config.data);
      }
      _this.initialized = true;
      return _this;
    }

    /**
     * Adds a new node. If a sort method is configured,
     * the node will be added in the appropriate order.
     *
     * @param {object} node Node
     * @return {TreeNode} Node object.
     */
    _createClass(InspireTree, [{
      key: "addNode",
      value: function addNode() {
        return _map2(this, 'addNode', arguments);
      }

      /**
       * Add nodes.
       *
       * @param {array} nodes Array of node objects.
       * @return {TreeNodes} Added node objects.
       */
    }, {
      key: "addNodes",
      value: function addNodes(nodes) {
        var _this2 = this;
        this.batch();
        var newNodes = new TreeNodes(this);
        each(nodes, function (node) {
          return newNodes.push(_this2.addNode(node));
        });
        this.end();
        return newNodes;
      }

      /**
       * Release pending data changes to any listeners.
       *
       * Will skip rendering as long as any calls
       * to `batch` have yet to be resolved,
       *
       * @private
       * @return {void}
       */
    }, {
      key: "applyChanges",
      value: function applyChanges() {
        return this.model.applyChanges();
      }

      /**
       * Query for all available nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "available",
      value: function available() {
        return _map2(this, 'available', arguments);
      }

      /**
       * Batch multiple changes for listeners (i.e. DOM)
       *
       * @private
       * @return {void}
       */
    }, {
      key: "batch",
      value: function batch() {
        return this.model.batch();
      }

      /**
       * Blur children in this collection.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "blur",
      value: function blur() {
        return _map2(this, 'blur', arguments);
      }

      /**
       * Blur (deeply) all nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "blurDeep",
      value: function blurDeep() {
        return _map2(this, 'blurDeep', arguments);
      }

      /**
       * Compares any number of TreeNode objects and returns
       * the minimum and maximum (starting/ending) nodes.
       *
       * @return {array} Array with two TreeNode objects.
       */
    }, {
      key: "boundingNodes",
      value: function boundingNodes(firstNode, secondNode) {
        // Sorts nodes by comparing each index in their index lists
        var sort = function sort(arr1, arr2) {
          if (arr1[0] === arr2[0]) {
            if (arr1.length > 1 && arr2.length > 1) {
              return sort(tail(arr1), tail(arr2));
            } else {
              return 0;
            }
          } else {
            return arr1[0] > arr2[0] ? 1 : -1;
          }
        };
        return sort(firstNode.indexList(), secondNode.indexList()) === 1 ? [secondNode, firstNode] : [firstNode, secondNode];
      }

      /**
       * Check if the tree will auto-deselect currently selected nodes
       * when a new selection is made.
       *
       * @return {boolean} If tree will auto-deselect nodes.
       */
    }, {
      key: "canAutoDeselect",
      value: function canAutoDeselect() {
        return this.config.selection.autoDeselect && !this.preventDeselection;
      }

      /**
       * Query for all checked nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "checked",
      value: function checked() {
        return _map2(this, 'checked', arguments);
      }

      /**
       * Clean nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "clean",
      value: function clean() {
        return _map2(this, 'clean', arguments);
      }

      /**
       * Clear nodes matched by previous search, restore all nodes and collapse parents.
       *
       * @return {Tree} Tree instance.
       */
    }, {
      key: "clearSearch",
      value: function clearSearch() {
        this.batch();
        this.recurseDown(function (node) {
          // Reset search effects (show node, collapse, reset matched)
          node.show().collapse().state('matched', false);
        });
        this.end();
        return this;
      }

      /**
       * Clones (deeply) the array of nodes.
       *
       * Note: Cloning will *not* clone the context pointer.
       *
       * @return {TreeNodes} Array of cloned nodes.
       */
    }, {
      key: "clone",
      value: function clone() {
        return _map2(this, 'clone', arguments);
      }

      /**
       * Collapse nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "collapse",
      value: function collapse() {
        return _map2(this, 'collapse', arguments);
      }

      /**
       * Query for all collapsed nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "collapsed",
      value: function collapsed() {
        return _map2(this, 'collapsed', arguments);
      }

      /**
       * Collapse (deeply) all children.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "collapseDeep",
      value: function collapseDeep() {
        return _map2(this, 'collapseDeep', arguments);
      }

      /**
       * Concat multiple TreeNodes arrays.
       *
       * @param {TreeNodes} nodes Array of nodes.
       * @return {TreeNodes} Resulting node array.
       */
    }, {
      key: "concat",
      value: function concat() {
        return _map2(this, 'concat', arguments);
      }

      /**
       * Copy nodes to another tree instance.
       *
       * @param {object} dest Destination Inspire Tree.
       * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
       * @param {boolean} includeState Include itree.state object.
       * @return {object} Methods to perform action on copied nodes.
       */
    }, {
      key: "copy",
      value: function copy() {
        return _map2(this, 'copy', arguments);
      }

      /**
       * Creates a TreeNode without adding it. If the obj is already a TreeNode it's returned without modification.
       *
       * @param {object} obj Source node object.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "createNode",
      value: function createNode(obj) {
        return InspireTree.isTreeNode(obj) ? obj : objectToNode(this, obj);
      }

      /**
       * Return deepest nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "deepest",
      value: function deepest() {
        return _map2(this, 'deepest', arguments);
      }

      /**
       * Deselect nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "deselect",
      value: function deselect() {
        return _map2(this, 'deselect', arguments);
      }

      /**
       * Deselect (deeply) all nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "deselectDeep",
      value: function deselectDeep() {
        return _map2(this, 'deselectDeep', arguments);
      }

      /**
       * Disable auto-deselection of currently selected nodes.
       *
       * @return {Tree} Tree instance.
       */
    }, {
      key: "disableDeselection",
      value: function disableDeselection() {
        if (this.config.selection.multiple) {
          this.preventDeselection = true;
        }
        return this;
      }

      /**
       * Iterate each TreeNode.
       *
       * @param {function} iteratee Iteratee invoke for each node.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "each",
      value: function each() {
        return _map2(this, 'each', arguments);
      }

      /**
       * Query for all editable nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "editable",
      value: function editable() {
        return _map2(this, 'editable', arguments);
      }

      /**
       * Query for all nodes in editing mode.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "editing",
      value: function editing() {
        return _map2(this, 'editing', arguments);
      }

      /**
       * Enable auto-deselection of currently selected nodes.
       *
       * @return {Tree} Tree instance.
       */
    }, {
      key: "enableDeselection",
      value: function enableDeselection() {
        this.preventDeselection = false;
        return this;
      }

      /**
       * Release the current batch.
       *
       * @private
       * @return {void}
       */
    }, {
      key: "end",
      value: function end() {
        return this.model.end();
      }

      /**
       * Check if every node passes the given test.
       *
       * @param {function} tester Test each node in this collection,
       * @return {boolean} True if every node passes the test.
       */
    }, {
      key: "every",
      value: function every() {
        return _map2(this, 'every', arguments);
      }

      /**
       * Expand children.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "expand",
      value: function expand() {
        return _map2(this, 'expand', arguments);
      }

      /**
       * Expand (deeply) all nodes.
       *
       * @return {Promise<TreeNodes>} Promise resolved when all children have loaded and expanded.
       */
    }, {
      key: "expandDeep",
      value: function expandDeep() {
        return _map2(this, 'expandDeep', arguments);
      }

      /**
       * Query for all expanded nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "expanded",
      value: function expanded() {
        return _map2(this, 'expanded', arguments);
      }

      /**
       * Clone a hierarchy of all nodes matching a predicate.
       *
       * Because it filters deeply, we must clone all nodes so that we
       * don't affect the actual node array.
       *
       * @param {string|function} predicate State flag or custom function.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "extract",
      value: function extract() {
        return _map2(this, 'extract', arguments);
      }

      /**
       * Filter all nodes matching the given predicate.
       *
       * @param {function} predicate Test function.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "filter",
      value: function filter() {
        return _map2(this, 'filter', arguments);
      }

      /**
       * Filter all nodes matching the given predicate.
       *
       * @param {string|function} predicate State flag or custom function.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "filterBy",
      value: function filterBy() {
        return _map2(this, 'filterBy', arguments);
      }

      /**
       * Returns the first node matching predicate.
       *
       * @param {function} predicate Predicate function, accepts a single node and returns a boolean.
       * @return {TreeNode} First matching TreeNode, or undefined.
       */
    }, {
      key: "find",
      value: function find() {
        return _map2(this, 'find', arguments);
      }

      /**
       * Returns the first shallow node matching predicate.
       *
       * @param {function} predicate Predicate function, accepts a single node and returns a boolean.
       * @return {TreeNode} First matching TreeNode, or undefined.
       */
    }, {
      key: "first",
      value: function first() {
        return _map2(this, 'first', arguments);
      }

      /**
       * Flatten and get only node(s) matching the expected state or predicate function.
       *
       * @param {string|function} predicate State property or custom function.
       * @return {TreeNodes} Flat array of matching nodes.
       */
    }, {
      key: "flatten",
      value: function flatten() {
        return _map2(this, 'flatten', arguments);
      }

      /**
       * Query for all focused nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "focused",
      value: function focused() {
        return _map2(this, 'focused', arguments);
      }

      /**
       * Iterate each TreeNode.
       *
       * @param {function} iteratee Iteratee invoke for each node.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "forEach",
      value: function forEach() {
        return _map2(this, 'each', arguments);
      }

      /**
       * Get a specific node by its index, or undefined if it doesn't exist.
       *
       * @param {int} index Numeric index of requested node.
       * @return {TreeNode} Node object. Undefined if invalid index.
       */
    }, {
      key: "get",
      value: function get() {
        return _map2(this, 'get', arguments);
      }

      /**
       * Query for all hidden nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "hidden",
      value: function hidden() {
        return _map2(this, 'hidden', arguments);
      }

      /**
       * Hide nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "hide",
      value: function hide() {
        return _map2(this, 'hide', arguments);
      }

      /**
       * Hide (deeply) all nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "hideDeep",
      value: function hideDeep() {
        return _map2(this, 'hideDeep', arguments);
      }

      /**
       * Query for all indeterminate nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "indeterminate",
      value: function indeterminate() {
        return _map2(this, 'indeterminate', arguments);
      }

      /**
       * Get the index of the given node.
       *
       * @param {TreeNode} node Root tree node.
       * @return {int} Index of the node.
       */
    }, {
      key: "indexOf",
      value: function indexOf() {
        return _map2(this, 'indexOf', arguments);
      }

      /**
       * Insert a new node at the given position.
       *
       * @param {integer} index Index at which to insert the node.
       * @param {object} object Raw node object or TreeNode.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "insertAt",
      value: function insertAt() {
        return _map2(this, 'insertAt', arguments);
      }

      /**
       * Invoke method(s) on each node.
       *
       * @param {string|array} methods Method name(s).
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "invoke",
      value: function invoke() {
        return _map2(this, 'invoke', arguments);
      }

      /**
       * Invoke method(s) deeply.
       *
       * @param {string|array} methods Method name(s).
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "invokeDeep",
      value: function invokeDeep() {
        return _map2(this, 'invokeDeep', arguments);
      }

      /**
       * Check if an event is currently muted.
       *
       * @param {string} eventName Event name.
       * @return {boolean} If event is muted.
       */
    }, {
      key: "isEventMuted",
      value: function isEventMuted(eventName) {
        if (isBoolean(this.muted())) {
          return this.muted();
        }
        return includes(this.muted(), eventName);
      }

      /**
       * Check if an object is a Tree.
       *
       * @param {object} object Object
       * @return {boolean} If object is a Tree.
       */
    }, {
      key: "isTree",
      value: function isTree(object) {
        return object instanceof InspireTree;
      }

      /**
       * Check if an object is a TreeNode.
       *
       * @param {object} obj Object
       * @return {boolean} If object is a TreeNode.
       */
    }, {
      key: "join",
      value:
      /**
       * Join nodes into a resulting string.
       *
       * @param {string} separator Separator, defaults to a comma
       * @return {string} Strings from root node objects.
       */
      function join() {
        return _map2(this, 'join', arguments);
      }

      /**
       * Returns the last shallow node matching predicate.
       *
       * @param {function} predicate Predicate function, accepts a single node and returns a boolean.
       * @return {TreeNode} Last matching shallow TreeNode, or undefined.
       */
    }, {
      key: "last",
      value: function last() {
        return _map2(this, 'last', arguments);
      }

      /**
       * Get the most recently selected node, if any.
       *
       * @return {TreeNode} Last selected node, or undefined.
       */
    }, {
      key: "lastSelectedNode",
      value: function lastSelectedNode() {
        return this._lastSelectedNode;
      }

      /**
       * Load data. Accepts an array, function, or promise.
       *
       * @param {array|function|Promise} loader Array of nodes, function, or promise resolving an array of nodes.
       * @return {Promise<TreeNodes>} Promise resolved upon successful load, rejected on error.
       * @example
       *
       * tree.load($.getJSON('nodes.json'));
       */
    }, {
      key: "load",
      value: function load(loader) {
        var _this3 = this;
        var promise = new Promise(function (resolve, reject) {
          var complete = function complete(nodes, totalNodes) {
            // A little type-safety for silly situations
            if (!isArrayLike(nodes)) {
              return reject(new TypeError('Loader requires an array-like `nodes` parameter.'));
            }

            // Delay event for synchronous loader. Otherwise it fires
            // before the user has a chance to listen.
            if (!_this3.initialized && isArrayLike(nodes)) {
              setTimeout(function () {
                _this3.emit('data.loaded', nodes);
              });
            } else {
              _this3.emit('data.loaded', nodes);
            }

            // Parse newly-loaded nodes
            var newModel = collectionToModel(_this3, nodes);

            // Concat only if loading is deferred
            if (_this3.config.deferredLoading) {
              _this3.model = _this3.model.concat(newModel);
            } else {
              _this3.model = newModel;
            }

            // Set pagination
            _this3.model._pagination.total = nodes.length;
            if (parseInt(totalNodes, 10) > nodes.length) {
              _this3.model._pagination.total = parseInt(totalNodes, 10);
            }

            // Set pagination totals if resolver failed to provide them
            if (!totalNodes) {
              _this3.model.recurseDown(function (node) {
                if (node.hasChildren()) {
                  node.children._pagination.total = node.children.length;
                }
              });
            }
            if (_this3.config.selection.require && !_this3.selected().length) {
              _this3.selectFirstAvailableNode();
            }
            var init = function init() {
              _this3.emit('model.loaded', _this3.model);
              resolve(_this3.model);
              _this3.model.applyChanges();
            };

            // Delay event for synchronous loader
            if (!_this3.initialized && isArray(nodes)) {
              setTimeout(init);
            } else {
              init();
            }
          };

          // Data given already as an array
          if (isArrayLike(loader)) {
            complete(loader);
          }

          // Data loader requires a caller/callback
          else if (isFunction(loader)) {
            var resp = loader(null, complete, reject, _this3.pagination());

            // Loader returned its own object
            if (resp) {
              loader = resp;
            }
          }

          // Data loader is likely a promise
          if (isObject(loader)) {
            standardizePromise(loader).then(complete)["catch"](reject);
          } else {
            reject(new Error('Invalid data loader.'));
          }
        });

        // Copy to event listeners
        promise["catch"](function (err) {
          _this3.emit('data.loaderror', err);
        });

        // Cache to allow access after tree instantiation
        this._loader = {
          promise: promise
        };
        return promise;
      }

      /**
       * Query for all nodes currently loading children.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "loading",
      value: function loading() {
        return _map2(this, 'loading', arguments);
      }

      /**
       * Load additional nodes for the root context.
       *
       * @param {Event} event Click or scroll event if DOM interaction triggered this call.
       * @return {Promise<TreeNodes>} Resolves with request results.
       */
    }, {
      key: "loadMore",
      value: function loadMore() {
        return _map2(this, 'loadMore', arguments);
      }

      /**
       * Create a new collection after passing every node through iteratee.
       *
       * @param {function} iteratee Node iteratee.
       * @return {TreeNodes} New array of node objects.
       */
    }, {
      key: "map",
      value: function map() {
        return _map2(this, 'map', arguments);
      }

      /**
       * Query for all nodes matched in the last search.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "matched",
      value: function matched() {
        return _map2(this, 'matched', arguments);
      }

      /**
       * Move node at a given index to a new index.
       *
       * @param {int} index Current index.
       * @param {int} newIndex New index.
       * @param {TreeNodes} target Target TreeNodes array. Defaults to this.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "move",
      value: function move() {
        return _map2(this, 'move', arguments);
      }

      /**
       * Pause events.
       *
       * @param {array} events Event names to mute.
       * @return {Tree} Tree instance.
       */
    }, {
      key: "mute",
      value: function mute(events) {
        if (isString(events) || isArray(events)) {
          this._muted = castArray(events);
        } else {
          this._muted = true;
        }
        return this;
      }

      /**
       * Get current mute settings.
       *
       * @return {boolean|array} Muted events. If all, true.
       */
    }, {
      key: "muted",
      value: function muted() {
        return this._muted;
      }

      /**
       * Get a node.
       *
       * @param {string|number} id ID of node.
       * @return {TreeNode} Node object.
       */
    }, {
      key: "node",
      value: function node() {
        return _map2(this, 'node', arguments);
      }

      /**
       * Get all nodes in a tree, or nodes for an array of IDs.
       *
       * @param {array} refs Array of ID references.
       * @return {TreeNodes} Array of node objects.
       * @example
       *
       * const all = tree.nodes()
       * const some = tree.nodes([1, 2, 3])
       */
    }, {
      key: "nodes",
      value: function nodes() {
        return _map2(this, 'nodes', arguments);
      }

      /**
       * Get the root TreeNodes pagination.
       *
       * @return {object} Pagination configuration object.
       */
    }, {
      key: "pagination",
      value: function pagination() {
        return _map2(this, 'pagination', arguments);
      }

      /**
       * Pop node in the final index position.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "pop",
      value: function pop() {
        return _map2(this, 'pop', arguments);
      }

      /**
       * Add a TreeNode to the end of the root collection.
       *
       * @param {TreeNode} node Node object.
       * @return {int} The new length
       */
    }, {
      key: "push",
      value: function push() {
        return _map2(this, 'push', arguments);
      }

      /**
       * Iterate down all nodes and any children.
       *
       * Return false to stop execution.
       *
       * @private
       * @param {function} iteratee Iteratee function
       * @return {TreeNodes} Resulting nodes.
       */
    }, {
      key: "recurseDown",
      value: function recurseDown() {
        return _map2(this, 'recurseDown', arguments);
      }

      /**
       * Reduce nodes.
       *
       * @param {function} iteratee Iteratee function
       * @return {any} Resulting data.
       */
    }, {
      key: "reduce",
      value: function reduce() {
        return _map2(this, 'reduce', arguments);
      }

      /**
       * Right-reduce root nodes.
       *
       * @param {function} iteratee Iteratee function
       * @return {any} Resulting data.
       */
    }, {
      key: "reduceRight",
      value: function reduceRight() {
        return _map2(this, 'reduceRight', arguments);
      }

      /**
       * Reload/re-execute the original data loader.
       *
       * @return {Promise<TreeNodes>} Load method promise.
       */
    }, {
      key: "reload",
      value: function reload() {
        this.reset();
        return this.load(this.opts.data || this.config.data);
      }

      /**
       * Remove a node.
       *
       * @param {TreeNode} node Node object.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "remove",
      value: function remove() {
        return _map2(this, 'remove', arguments);
      }

      /**
       * Remove all nodes.
       *
       * @return {Tree} Tree instance.
       */
    }, {
      key: "removeAll",
      value: function removeAll() {
        this.reset().applyChanges();
        return this;
      }

      /**
       * Query for all soft-removed nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "removed",
      value: function removed() {
        return _map2(this, 'removed', arguments);
      }

      /**
       * Resets the root model and associated information like pagination.
       *
       * Note: This method does *not* apply changes because it assumes
       * futher changes will occur to the model.
       *
       * @private
       * @return {Tree} Tree instance.
       */
    }, {
      key: "reset",
      value: function reset() {
        this.model = new TreeNodes(this);
        return this;
      }

      /**
       * Restore nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "restore",
      value: function restore() {
        return _map2(this, 'restore', arguments);
      }

      /**
       * Restore (deeply) all nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "restoreDeep",
      value: function restoreDeep() {
        return _map2(this, 'restoreDeep', arguments);
      }

      /**
       * Reverse node order.
       *
       * @return {TreeNodes} Reversed array of node objects.
       */
    }, {
      key: "reverse",
      value: function reverse() {
        return _map2(this, 'reverse', arguments);
      }

      /**
       * Search nodes, showing only those that match and the necessary hierarchy.
       *
       * @param {*} query Search string, RegExp, or function.
       * @return {Promise<TreeNodes>} Promise resolved with an array of matching node objects.
       */
    }, {
      key: "search",
      value: function search(query) {
        var _this4 = this;
        var _this$config$search = this.config.search,
          matcher = _this$config$search.matcher,
          matchProcessor = _this$config$search.matchProcessor;

        // Don't search if query empty
        if (!query || isString(query) && isEmpty(query)) {
          return Promise.resolve(this.clearSearch());
        }
        this.batch();

        // Reset states
        this.recurseDown(function (node) {
          node.state('hidden', true);
          node.state('matched', false);
        });
        this.end();

        // Query nodes for any matching the query
        matcher = isFunction(matcher) ? matcher : function (matchQuery, resolve) {
          var matches = new TreeNodes(_this4);

          // Convery the query into a usable predicate
          if (isString(matchQuery)) {
            matchQuery = new RegExp(matchQuery, 'i');
          }
          var predicate;
          if (isRegExp(matchQuery)) {
            predicate = function predicate(node) {
              return matchQuery.test(node.text);
            };
          } else {
            predicate = matchQuery;
          }

          // Recurse down and find all matches
          _this4.model.recurseDown(function (node) {
            if (!node.removed()) {
              if (predicate(node)) {
                // Return as a match
                matches.push(node);
              }
            }
          });
          resolve(matches);
        };

        // Process all matching nodes.
        matchProcessor = isFunction(matchProcessor) ? matchProcessor : function (matches) {
          matches.each(function (node) {
            node.show().state('matched', true);
            node.expandParents().collapse();
            if (node.hasChildren()) {
              node.children.showDeep();
            }
          });
        };

        // Wrap the search matcher with a promise since it could require async requests
        return new Promise(function (resolve, reject) {
          // Execute the matcher and pipe results to the processor
          matcher(query, function (matches) {
            // Convert to a TreeNodes array if we're receiving external nodes
            if (!InspireTree.isTreeNodes(matches)) {
              matches = _this4.nodes(_map(matches, 'id'));
            }
            _this4.batch();
            matchProcessor(matches);
            _this4.end();
            resolve(matches);
          }, reject);
        });
      }

      /**
       * Select nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "select",
      value: function select() {
        return _map2(this, 'select', arguments);
      }

      /**
       * Query for all selectable nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "selectable",
      value: function selectable() {
        return _map2(this, 'selectable', arguments);
      }

      /**
       * Select all nodes between a start and end node.
       * Starting node must have a higher index path so we can work down to endNode.
       *
       * @param {TreeNode} startNode Starting node
       * @param {TreeNode} endNode Ending node
       * @return {Tree} Tree instance.
       */
    }, {
      key: "selectBetween",
      value: function selectBetween(startNode, endNode) {
        this.batch();
        var node = startNode.nextVisibleNode();
        while (node.id !== endNode.id) {
          node.select();
          node = node.nextVisibleNode();
        }
        this.end();
        return this;
      }

      /**
       * Select (deeply) all nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "selectDeep",
      value: function selectDeep() {
        return _map2(this, 'selectDeep', arguments);
      }

      /**
       * Query for all selected nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "selected",
      value: function selected() {
        return _map2(this, 'selected', arguments);
      }

      /**
       * Select the first available node.
       *
       * @return {TreeNode} Selected node object.
       */
    }, {
      key: "selectFirstAvailableNode",
      value: function selectFirstAvailableNode() {
        var node = this.model.filterBy('available').get(0);
        if (node) {
          node.select();
        }
        return node;
      }

      /**
       * Shift node in the first index position.
       *
       * @return {TreeNode} Node object.
       */
    }, {
      key: "shift",
      value: function shift() {
        return _map2(this, 'shift', arguments);
      }

      /**
       * Show nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "show",
      value: function show() {
        return _map2(this, 'show', arguments);
      }

      /**
       * Show (deeply) all nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "showDeep",
      value: function showDeep() {
        return _map2(this, 'showDeep', arguments);
      }

      /**
       * Get a shallow copy of a portion of nodes.
       *
       * @param {int} begin Starting index.
       * @param {int} end End index.
       * @return {Array} Array of selected subset.
       */
    }, {
      key: "slice",
      value: function slice() {
        return _map2(this, 'slice', arguments);
      }

      /**
       * Soft-remove nodes.
       *
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "softRemove",
      value: function softRemove() {
        return _map2(this, 'softRemove', arguments);
      }

      /**
       * Check if at least one node passes the given test.
       *
       * @param {function} tester Test each node in this collection,
       * @return {boolean} True if at least one node passes the test.
       */
    }, {
      key: "some",
      value: function some() {
        return _map2(this, 'some', arguments);
      }

      /**
       * Sort nodes using a function.
       *
       * @param {function} compareFn Comparison function.
       * @return {TreeNodes} Root array of node objects.
       */
    }, {
      key: "sort",
      value: function sort() {
        return _map2(this, 'sort', arguments);
      }

      /**
       * Sort nodes using a function or key name.
       *
       * If no custom sorter given, the configured "sort" value will be used.
       *
       * @param {string|function} sorter Sort function or property name.
       * @return {TreeNodes} Array of node obejcts.
       */
    }, {
      key: "sortBy",
      value: function sortBy() {
        return _map2(this, 'sortBy', arguments);
      }

      /**
       * Deeply sort nodes.
       *
       * @param {function} compareFn Comparison function.
       * @return {TreeNodes} Root array of node objects.
       */
    }, {
      key: "sortDeep",
      value: function sortDeep() {
        return _map2(this, 'sortDeep', arguments);
      }

      /**
       * Remove and/or add new TreeNodes into the root collection.
       *
       * @param {int} start Starting index.
       * @param {int} deleteCount Count of nodes to delete.
       * @param {TreeNode} node Node(s) to insert.
       * @return {Array} Array of selected subset.
       */
    }, {
      key: "splice",
      value: function splice() {
        return _map2(this, 'slice', arguments);
      }

      /**
       * Set nodes' state values.
       *
       * @param {string} name Property name.
       * @param {boolean} newVal New value, if setting.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "state",
      value: function state() {
        return _map2(this, 'state', arguments);
      }

      /**
       * Set (deeply) nodes' state values.
       *
       * @param {string} name Property name.
       * @param {boolean} newVal New value, if setting.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "stateDeep",
      value: function stateDeep() {
        return _map2(this, 'stateDeep', arguments);
      }

      /**
       * Swap two node positions.
       *
       * @param {TreeNode} node1 Node 1.
       * @param {TreeNode} node2 Node 2.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "swap",
      value: function swap() {
        return _map2(this, 'swap', arguments);
      }

      /**
       * Get a native node Array.
       *
       * @return {array} Array of node objects.
       */
    }, {
      key: "toArray",
      value: function toArray() {
        return _map2(this, 'toArray', arguments);
      }

      /**
       * Get a string representation of node objects.
       *
       * @return {string} Strings from root node objects.
       */
    }, {
      key: "toString",
      value: function toString() {
        return _map2(this, 'toString', arguments);
      }

      /**
       * Resume events.
       *
       * @param {array} events Events to unmute.
       * @return {Tree} Tree instance.
       */
    }, {
      key: "unmute",
      value: function unmute(events) {
        // Diff array and set to false if we're now empty
        if (isString(events) || isArray(events)) {
          this._muted = difference(this._muted, castArray(events));
          if (!this._muted.length) {
            this._muted = false;
          }
        } else {
          this._muted = false;
        }
        return this;
      }

      /**
       * Add a TreeNode in the first index position.
       *
       * @return {number} The new length
       */
    }, {
      key: "unshift",
      value: function unshift() {
        return _map2(this, 'unshift', arguments);
      }

      /**
       * Query for all visible nodes.
       *
       * @param {boolean} full Retain full hiearchy.
       * @return {TreeNodes} Array of node objects.
       */
    }, {
      key: "visible",
      value: function visible() {
        return _map2(this, 'visible', arguments);
      }
    }], [{
      key: "isTreeNode",
      value: function isTreeNode(obj) {
        return obj instanceof TreeNode;
      }

      /**
       * Check if an object is a TreeNodes array.
       *
       * @param {object} obj Object
       * @return {boolean} If object is a TreeNodes array.
       */
    }, {
      key: "isTreeNodes",
      value: function isTreeNodes(obj) {
        return obj instanceof TreeNodes;
      }
    }]);
    return InspireTree;
  }(eventemitter2_1);

  return InspireTree;

}));
