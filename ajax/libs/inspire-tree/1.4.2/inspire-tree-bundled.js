/*!
 * Inspire Tree v1.4.2
 * https://github.com/helion3/inspire-tree
 * 
 * Copyright 2015 Helion3, and other contributors
 * Licensed under MIT. https://github.com/helion3/inspire-tree/blob/master/LICENSE
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["InspireTree"] = factory();
	else
		root["InspireTree"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Libs

	var _isRegExp2 = __webpack_require__(1);

	var _isRegExp3 = _interopRequireDefault(_isRegExp2);

	var _isEmpty2 = __webpack_require__(3);

	var _isEmpty3 = _interopRequireDefault(_isEmpty2);

	var _isString2 = __webpack_require__(13);

	var _isString3 = _interopRequireDefault(_isString2);

	var _isNumber2 = __webpack_require__(14);

	var _isNumber3 = _interopRequireDefault(_isNumber2);

	var _tail2 = __webpack_require__(15);

	var _tail3 = _interopRequireDefault(_tail2);

	var _head2 = __webpack_require__(20);

	var _head3 = _interopRequireDefault(_head2);

	var _get2 = __webpack_require__(21);

	var _get3 = _interopRequireDefault(_get2);

	var _transform2 = __webpack_require__(32);

	var _transform3 = _interopRequireDefault(_transform2);

	var _assign2 = __webpack_require__(104);

	var _assign3 = _interopRequireDefault(_assign2);

	var _sortBy2 = __webpack_require__(112);

	var _sortBy3 = _interopRequireDefault(_sortBy2);

	var _remove2 = __webpack_require__(122);

	var _remove3 = _interopRequireDefault(_remove2);

	var _slice2 = __webpack_require__(124);

	var _slice3 = _interopRequireDefault(_slice2);

	var _findIndex2 = __webpack_require__(125);

	var _findIndex3 = _interopRequireDefault(_findIndex2);

	var _find2 = __webpack_require__(127);

	var _find3 = _interopRequireDefault(_find2);

	var _findLast2 = __webpack_require__(129);

	var _findLast3 = _interopRequireDefault(_findLast2);

	var _indexOf2 = __webpack_require__(133);

	var _indexOf3 = _interopRequireDefault(_indexOf2);

	var _clone2 = __webpack_require__(136);

	var _clone3 = _interopRequireDefault(_clone2);

	var _isArrayLike2 = __webpack_require__(6);

	var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

	var _cloneDeep2 = __webpack_require__(157);

	var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

	var _each2 = __webpack_require__(158);

	var _each3 = _interopRequireDefault(_each2);

	var _isObject2 = __webpack_require__(2);

	var _isObject3 = _interopRequireDefault(_isObject2);

	var _isFunction2 = __webpack_require__(9);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _isArray2 = __webpack_require__(12);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _defaults2 = __webpack_require__(161);

	var _defaults3 = _interopRequireDefault(_defaults2);

	var _cuid = __webpack_require__(168);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _eventemitter = __webpack_require__(169);

	var _eventemitter2 = _interopRequireDefault(_eventemitter);

	var _es6Promise = __webpack_require__(170);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// CSS
	__webpack_require__(174);

	function InspireTree(opts) {
	    var initialized = false;
	    var noop = function noop() {};
	    var tree = this;
	    tree.preventDeselection = false;

	    if (!opts.data) {
	        throw new TypeError('Invalid data loader.');
	    }

	    // Assign defaults
	    tree.config = (0, _defaults3.default)(opts, {
	        allowLoadEvents: [],
	        allowSelection: noop,
	        checkbox: false,
	        contextMenu: false,
	        dragTargets: false,
	        multiselect: false,
	        renderer: false,
	        requireSelection: false,
	        search: false,
	        sort: false,
	        tabindex: -1
	    });

	    if (tree.config.checkbox) {
	        tree.config.multiselect = true;
	        tree.preventDeselection = true;
	    }

	    // Default node state values
	    var defaultState = {
	        collapsed: true,
	        focused: false,
	        hidden: false,
	        indeterminate: false,
	        loading: false,
	        removed: false,
	        selectable: true,
	        selected: false
	    };

	    // Cache some configs
	    var allowsLoadEvents = (0, _isArray3.default)(tree.config.allowLoadEvents) && tree.config.allowLoadEvents.length > 0;
	    var isDynamic = (0, _isFunction3.default)(tree.config.data);

	    // Rendering
	    var dom;

	    // Webpack has a DOM boolean that when false,
	    // allows us to exclude this library from our build.
	    // For those doing their own rendering, it's useless.
	    if (true) {
	        dom = new (__webpack_require__(179))(tree);
	    }

	    // Validation
	    if (dom && (!(0, _isObject3.default)(opts) || !opts.target)) {
	        throw new TypeError('Property "target" is required, either an element or a selector.');
	    }

	    // Load custom/empty renderer
	    if (!dom) {
	        dom = (0, _isFunction3.default)(tree.config.renderer) ? tree.config.renderer(tree) : {
	            applyChanges: noop,
	            attach: noop,
	            batch: noop,
	            end: noop
	        };
	    }

	    /**
	     * Represents a singe node object within the tree.
	     *
	     * @param {TreeNode} source TreeNode to copy.
	     * @return {TreeNode} Tree node object.
	     */
	    function TreeNode(source) {
	        var node = this;

	        (0, _each3.default)(source, function (value, key) {
	            if ((0, _isObject3.default)(value)) {
	                if ((0, _isFunction3.default)(value.clone)) {
	                    node[key] = value.clone();
	                } else {
	                    node[key] = (0, _cloneDeep3.default)(value);
	                }
	            } else {
	                node[key] = value;
	            }
	        });
	    };

	    /**
	     * Add a child to this node.
	     *
	     * @category TreeNode
	     * @param {object} child Node object.
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.addChild = function (child) {
	        child = objectToModel(child);

	        if ((0, _isArray3.default)(this.children) || !(0, _isArrayLike3.default)(this.children)) {
	            this.children = new TreeNodes();
	        }

	        child.itree.parent = this;
	        this.children.push(child);
	        this.refreshIndeterminateState();

	        child.markDirty();
	        dom.applyChanges();

	        return child;
	    };

	    /**
	     * Get if node available.
	     *
	     * @category TreeNode
	     * @return {boolean} If available.
	     */
	    TreeNode.prototype.available = function () {
	        return !this.hidden() && !this.removed();
	    };

	    /**
	     * Blur focus from this node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.blur = function () {
	        return baseStateChange('focused', false, 'blurred', this);
	    };

	    /**
	     * Hides parents without any visible children.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.clean = function () {
	        this.recurseUp(function (node) {
	            if (node.hasParent()) {
	                var parent = node.getParent();
	                if (!parent.hasVisibleChildren()) {
	                    parent.hide();
	                }
	            }
	        });

	        return this;
	    };

	    /**
	     * Clones this node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} New node object.
	     */
	    TreeNode.prototype.clone = function () {
	        var newClone = new TreeNode(this);

	        if (this.hasChildren()) {
	            newClone.children = this.children.clone();
	        }

	        return newClone;
	    };

	    /**
	     * Collapse this node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.collapse = function () {
	        return baseStateChange('collapsed', true, 'collapsed', this);
	    };

	    /**
	     * Get if node collapsed.
	     *
	     * @category TreeNode
	     * @return {boolean} If collapsed.
	     */
	    TreeNode.prototype.collapsed = function () {
	        return this.itree.state.collapsed;
	    };

	    /**
	     * Get the containing context. If no parent present, the root context is returned.
	     *
	     * @category TreeNode
	     * @return {TreeNodes} Node array object.
	     */
	    TreeNode.prototype.context = function () {
	        return this.hasParent() ? this.getParent().children : model;
	    };

	    /**
	     * Copies node to a new tree instance.
	     *
	     * @category TreeNode
	     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
	     * @return {object} Property "to" for defining destination.
	     */
	    TreeNode.prototype.copy = function (hierarchy) {
	        var node = this;

	        if (hierarchy) {
	            node = node.copyHierarchy();
	        }

	        return {

	            /**
	             * Sets a destination.
	             *
	             * @category CopyNode
	             * @param {object} dest Destination Inspire Tree.
	             * @return {object} New node object.
	             */
	            to: function to(dest) {
	                if (!(0, _isFunction3.default)(dest.addNode)) {
	                    throw new Error('Destination must be an Inspire Tree instance.');
	                }

	                return dest.addNode(node.export());
	            }
	        };
	    };

	    /**
	     * Copies all parents of a node.
	     *
	     * @category TreeNode
	     * @param {boolean} excludeNode Exclude given node from hierarchy.
	     * @return {TreeNode} Root node object with hierarchy.
	     */
	    TreeNode.prototype.copyHierarchy = function (excludeNode) {
	        var node = this;
	        var parents = node.getParents();

	        var nodes = [];

	        // Remove old hierarchy data
	        (0, _each3.default)(parents, function (node) {
	            var clone = (0, _clone3.default)(node);
	            delete clone.itree.parent;
	            delete clone.children;

	            nodes.push(clone);
	        });

	        parents = nodes.reverse();

	        if (!excludeNode) {
	            nodes.push(node);
	        }

	        var hierarchy = nodes[0];
	        var pointer = hierarchy;
	        var l = nodes.length;
	        (0, _each3.default)(nodes, function (parent, key) {
	            var children = new TreeNodes();

	            if (key + 1 < l) {
	                children.push(nodes[key + 1]);
	                pointer.children = children;

	                pointer = pointer.children[0];
	            }
	        });

	        return hierarchy;
	    };

	    /**
	     * Deselect this node.
	     *
	     * If requireSelection is true and this is the last selected
	     * node, the node will remain in a selected state.
	     *
	     * @category TreeNode
	     * @param {boolean} skipParentIndeterminate Skip refreshing parent indeterminate states.
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.deselect = function (skipParentIndeterminate) {
	        if (!tree.config.requireSelection || tree.selected().length > 1) {
	            var node = this;
	            dom.batch();

	            node.itree.state.indeterminate = false;
	            baseStateChange('selected', false, 'deselected', this);

	            // If using checkbox model
	            if (tree.config.checkbox) {
	                // Deselect all children
	                if (node.hasChildren()) {
	                    node.children.recurseDown(function (child) {
	                        child.deselect(true);
	                    });
	                }

	                if (!skipParentIndeterminate && node.hasParent()) {
	                    node.getParent().refreshIndeterminateState();
	                }
	            }

	            dom.end();
	        }

	        return this;
	    };

	    /**
	     * Expand this node.
	     *
	     * @category TreeNode
	     * @return {Promise} Promise resolved on successful load and expand of children.
	     */
	    TreeNode.prototype.expand = function () {
	        var node = this;

	        return new _es6Promise.Promise(function (resolve, reject) {
	            var allow = node.hasChildren() || isDynamic && node.children === true;

	            if (allow && (node.collapsed() || node.hidden())) {
	                node.itree.state.collapsed = false;
	                node.itree.state.hidden = false;

	                tree.emit('node.expanded', node);

	                if (isDynamic && node.children === true) {
	                    node.loadChildren().then(resolve).catch(reject);
	                } else {
	                    node.markDirty();
	                    dom.applyChanges();
	                    resolve(node);
	                }
	            } else {
	                // Resolve immediately
	                resolve(node);
	            }
	        });
	    };

	    /**
	     * Expand parent nodes.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.expandParents = function () {
	        if (this.hasParent()) {
	            this.getParent().recurseUp(function (node) {
	                node.expand();
	            });
	        }

	        return this;
	    };

	    /**
	     * Get if node expanded.
	     *
	     * @category TreeNode
	     * @return {boolean} If expanded.
	     */
	    TreeNode.prototype.expanded = function () {
	        return !this.collapsed();
	    };

	    /**
	     * Clones a node, removes itree property, and returns it
	     * as a native object.
	     *
	     * Note: does not use node.clone() because we don't want a
	     * TreeNode and we need to avoid redundant cloning children.
	     *
	     * @category TreeNode
	     * @return {object} Cloned/modified node object.
	     */
	    TreeNode.prototype.export = function () {
	        var clone = (0, _clone3.default)(this);
	        delete clone.itree;

	        if (clone.hasChildren()) {
	            clone.children = clone.children.export();
	        }

	        return clone.toObject();
	    };

	    /**
	     * Focus a node without changing its selection.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.focus = function () {
	        var node = this;

	        if (!node.focused()) {
	            // Batch selection changes
	            dom.batch();
	            tree.nodes().blurDeep();
	            node.itree.state.focused = true;

	            // Emit this event
	            tree.emit('node.focused', node);

	            // Mark hierarchy dirty and apply
	            node.markDirty();
	            dom.end();
	        }

	        return node;
	    };

	    /**
	     * Get whether node has focus or not.
	     *
	     * @category TreeNode
	     * @return {boolean} If focused.
	     */
	    TreeNode.prototype.focused = function () {
	        return this.itree.state.focused;
	    };

	    /**
	     * Get children for this node. If no children exist, an empty TreeNodes
	     * collection is returned for safe chaining.
	     *
	     * @category TreeNode
	     * @return {TreeNodes} Array of node objects.
	     */
	    TreeNode.prototype.getChildren = function () {
	        return this.hasChildren() ? this.children : new TreeNodes();
	    };

	    /**
	     * Get the immediate parent, if any.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.getParent = function () {
	        return this.itree.parent;
	    };

	    /**
	     * Returns parent nodes. Excludes any siblings.
	     *
	     * @category TreeNode
	     * @return {TreeNodes} Node objects.
	     */
	    TreeNode.prototype.getParents = function () {
	        var parents = new TreeNodes();

	        if (this.hasParent()) {
	            this.getParent().recurseUp(function (node) {
	                parents.push(node);
	            });
	        }

	        return parents;
	    };

	    /**
	     * Get a textual hierarchy for a given node. An array
	     * of text from this node's root ancestor to the given node.
	     *
	     * @category TreeNode
	     * @return {array} Array of node texts.
	     */
	    TreeNode.prototype.getTextualHierarchy = function () {
	        var paths = [];

	        this.recurseUp(function (node) {
	            paths.unshift(node.text);
	        });

	        return paths;
	    };

	    /**
	     * If node has any children.
	     *
	     * @category TreeNode
	     * @return {boolean} If children.
	     */
	    TreeNode.prototype.hasChildren = function () {
	        return (0, _isArrayLike3.default)(this.children) && this.children.length > 0;
	    };

	    /**
	     * If node has a parent.
	     *
	     * @category TreeNode
	     * @return {boolean} If parent.
	     */
	    TreeNode.prototype.hasParent = function () {
	        return Boolean(this.itree.parent);
	    };

	    /**
	     * If node has any visible children.
	     *
	     * @category TreeNode
	     * @return {boolean} If visible children.
	     */
	    TreeNode.prototype.hasVisibleChildren = function () {
	        var hasVisibleChildren = false;

	        if (this.hasChildren()) {
	            // Count visible children
	            // http://jsperf.com/count-subdoc-state/2
	            var visibleCount = 0;
	            (0, _each3.default)(this.children, function (child) {
	                if (!child.hidden() && !child.removed()) {
	                    visibleCount++;
	                }
	            });

	            hasVisibleChildren = visibleCount > 0;
	        }

	        return hasVisibleChildren;
	    };

	    /**
	     * Get if node hidden.
	     *
	     * @category TreeNode
	     * @return {boolean} If hidden.
	     */
	    TreeNode.prototype.hidden = function () {
	        return this.itree.state.hidden;
	    };

	    /**
	     * Hide this node.
	     *
	     * @category TreeNode
	     * @return {object} Node object.
	     */
	    TreeNode.prototype.hide = function () {
	        var node = baseStateChange('hidden', true, 'hidden', this);

	        // Update children
	        if (node.hasChildren()) {
	            node.children.hide();
	        }

	        return node;
	    };

	    /**
	     * Returns a "path" of indices, values which map this node's location within all parent contexts.
	     *
	     * @return {string} [description]
	     */
	    TreeNode.prototype.indexPath = function () {
	        var indices = [];

	        this.recurseUp(function (node) {
	            indices.push((0, _indexOf3.default)(node.context(), node));
	        });

	        return indices.reverse().join('.');
	    };

	    /**
	     * Find the last + deepest visible child of the previous sibling.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.lastDeepestVisibleChild = function () {
	        var found;

	        if (this.hasChildren() && !this.collapsed()) {
	            found = (0, _findLast3.default)(this.children, function (node) {
	                return node.visible();
	            });

	            var res = found.lastDeepestVisibleChild();
	            if (res) {
	                found = res;
	            }
	        }

	        return found;
	    };

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
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.loadChildren = function () {
	        var node = this;

	        return new _es6Promise.Promise(function (resolve, reject) {
	            if (!isDynamic || node.children !== true) {
	                reject(new Error('Node does not have or support dynamic children.'));
	            }

	            node.itree.state.loading = true;
	            node.markDirty();
	            dom.applyChanges();

	            tree.config.data(node, function resolver(results) {
	                dom.batch();
	                node.itree.state.loading = false;
	                node.children = collectionToModel(results, node);
	                node.markDirty();
	                dom.end();

	                resolve(node.children);

	                tree.emit('children.loaded', node);
	            }, function rejecter(err) {
	                node.itree.state.loading = false;
	                node.children = new TreeNodes();
	                node.markDirty();
	                dom.applyChanges();

	                reject(err);

	                tree.emit('tree.loaderror', err);
	            });
	        });
	    };

	    /**
	     * Mark a node as dirty, rebuilding this node in the virtual DOM
	     * and rerendering to the live DOM, next time applyChanges is called.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.markDirty = function () {
	        if (!this.itree.dirty) {
	            this.itree.dirty = true;

	            if (this.hasParent()) {
	                this.getParent().markDirty();
	            }
	        }

	        return this;
	    };

	    /**
	     * Find next visible child node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object, if any.
	     */
	    TreeNode.prototype.nextVisibleChildNode = function () {
	        var startingNode = this;
	        var next;

	        if (startingNode.hasChildren()) {
	            next = (0, _find3.default)(startingNode.children, function (child) {
	                return child.visible();
	            });
	        }

	        return next;
	    };

	    /**
	     * Get the next visible node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object if any.
	     */
	    TreeNode.prototype.nextVisibleNode = function () {
	        var startingNode = this;
	        var next;

	        // 1. Any visible children
	        next = startingNode.nextVisibleChildNode();

	        // 2. Any Siblings
	        if (!next) {
	            next = startingNode.nextVisibleSiblingNode();
	        }

	        // 3. Find sibling of ancestor(s)
	        if (!next) {
	            next = startingNode.nextVisibleAncestralSiblingNode();
	        }

	        return next;
	    };

	    /**
	     * Find the next visible sibling of our ancestor. Continues
	     * seeking up the tree until a valid node is found or we
	     * reach the root node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.nextVisibleAncestralSiblingNode = function () {
	        var next;

	        if (this.hasParent()) {
	            var parent = this.getParent();
	            next = parent.nextVisibleSiblingNode();

	            if (!next) {
	                next = parent.nextVisibleAncestralSiblingNode();
	            }
	        }

	        return next;
	    };

	    /**
	     * Find the next visible sibling node.
	     *
	     * @category TreeNode
	     * @return {object} Node object, if any.
	     */
	    TreeNode.prototype.nextVisibleSiblingNode = function () {
	        var startingNode = this;
	        var context = startingNode.hasParent() ? startingNode.getParent().children : tree.nodes();
	        var i = (0, _findIndex3.default)(context, { id: startingNode.id });

	        return (0, _find3.default)((0, _slice3.default)(context, i + 1), function (node) {
	            return node.visible();
	        });
	    };

	    /**
	     * Find the previous visible node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object, if any.
	     */
	    TreeNode.prototype.previousVisibleNode = function () {
	        var startingNode = this;
	        var prev;

	        // 1. Any Siblings
	        prev = startingNode.previousVisibleSiblingNode();

	        // 2. If that sibling has children though, go there
	        if (prev && prev.hasChildren() && !prev.collapsed()) {
	            prev = prev.lastDeepestVisibleChild();
	        }

	        // 3. Parent
	        if (!prev && startingNode.hasParent()) {
	            prev = startingNode.getParent();
	        }

	        return prev;
	    };

	    /**
	     * Find the previous visible sibling node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object, if any.
	     */
	    TreeNode.prototype.previousVisibleSiblingNode = function () {
	        var context = this.hasParent() ? this.getParent().children : tree.nodes();
	        var i = (0, _findIndex3.default)(context, { id: this.id });
	        return (0, _findLast3.default)((0, _slice3.default)(context, 0, i), function (node) {
	            return node.visible();
	        });
	    };

	    /**
	     * Iterate up a node and its parents.
	     *
	     * @category TreeNode
	     * @param {function} iteratee Iteratee function.
	     * @return {TreeNode} Resulting node.
	     */
	    TreeNode.prototype.recurseUp = function (iteratee) {
	        var result = iteratee(this);

	        if (result !== false && this.hasParent()) {
	            this.getParent().recurseUp(iteratee);
	        }

	        return this;
	    };

	    /**
	     * Iterate down node and any children.
	     *
	     * @category TreeNode
	     * @param {function} iteratee Iteratee function.
	     * @return {TreeNode} Resulting node.
	     */
	    TreeNode.prototype.recurseDown = function (iteratee) {
	        recurseDown(this, iteratee);

	        return this;
	    };

	    /**
	     * Updates the indeterminate state of this node.
	     *
	     * Only available when checkbox=true.
	     * True if some, but not all children are selected.
	     * False if no children are selected.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.refreshIndeterminateState = function () {
	        var node = this;
	        node.itree.state.indeterminate = false;

	        if (tree.config.checkbox) {
	            var childrenCount = node.children.length;
	            var oldValue = node.itree.state.indeterminate;

	            if (node.hasChildren()) {
	                var selected = 0;

	                (0, _each3.default)(node.children, function (child) {
	                    if (child.itree.state.indeterminate) {
	                        node.itree.state.indeterminate = true;
	                        return false;
	                    } else if (child.selected()) {
	                        selected++;
	                    }
	                });

	                if (!selected) {
	                    node.itree.state.selected = false;
	                } else if (selected === childrenCount) {
	                    node.itree.state.selected = true;
	                } else if (!node.itree.state.indeterminate) {
	                    node.itree.state.indeterminate = selected > 0 && selected < childrenCount;
	                }
	            }

	            if (node.hasParent()) {
	                node.getParent().refreshIndeterminateState();
	            }

	            if (oldValue !== node.itree.state.indeterminate) {
	                node.markDirty();
	            }
	        }

	        return node;
	    };

	    /**
	     * Remove a node from the tree.
	     *
	     * @category TreeNode
	     * @return {void}
	     */
	    TreeNode.prototype.remove = function () {
	        var node = this;

	        var parent;
	        if (node.hasParent()) {
	            parent = node.getParent();
	        }

	        var context = parent ? parent.children : model;
	        (0, _remove3.default)(context, { id: node.id });

	        if (parent) {
	            parent.refreshIndeterminateState();
	        }

	        tree.emit('node.removed', node.export());

	        dom.applyChanges();
	    };

	    /**
	     * Get if node soft-removed.
	     *
	     * @category TreeNode
	     * @return {boolean} If soft-removed.
	     */
	    TreeNode.prototype.removed = function () {
	        return this.itree.state.removed;
	    };

	    /**
	     * Restore state if soft-removed.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.restore = function () {
	        return baseStateChange('removed', false, 'restored', this);
	    };

	    /**
	     * Select this node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.select = function () {
	        var node = this;

	        if (!node.selected() && node.selectable()) {
	            // Batch selection changes
	            dom.batch();

	            node.focus();

	            if (!tree.preventDeselection) {
	                var oldVal = tree.config.requireSelection;
	                tree.config.requireSelection = false;
	                tree.nodes().deselectDeep();
	                tree.config.requireSelection = oldVal;
	            }

	            node.itree.state.selected = true;

	            // If using checkbox model and we have children
	            if (tree.config.checkbox) {
	                if (node.hasChildren()) {
	                    node.children.recurseDown(function (child) {
	                        child.select();
	                    });
	                }

	                if (node.hasParent()) {
	                    node.getParent().refreshIndeterminateState();
	                }
	            }

	            // Emit this event
	            tree.emit('node.selected', node);

	            // Mark hierarchy dirty and apply
	            node.markDirty();
	            dom.end();
	        }

	        return node;
	    };

	    /**
	     * Get if node selectable.
	     *
	     * @category TreeNode
	     * @return {boolean} If node selectable.
	     */
	    TreeNode.prototype.selectable = function () {
	        var allow = tree.config.allowSelection(this);
	        return typeof allow === 'boolean' ? allow : this.itree.state.selectable;
	    };

	    /**
	     * Get if node selected.
	     *
	     * @category TreeNode
	     * @return {boolean} If selected.
	     */
	    TreeNode.prototype.selected = function () {
	        return this.itree.state.selected;
	    };

	    /**
	     * Set a root property on this node.
	     *
	     * @category TreeNode
	     * @param {string|number} property Property name.
	     * @param {*} value New value.
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.set = function (property, value) {
	        this[property] = value;
	        this.markDirty();

	        return this;
	    };

	    /**
	     * Show this node.
	     *
	     * @category TreeNode
	     * @param {boolean} selectable Selectable state.
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.setSelectable = function (selectable) {
	        return baseStateChange('selectable', selectable, 'selectability-changed', this);
	    };

	    /**
	     * Show this node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.show = function () {
	        return baseStateChange('hidden', false, 'shown', this);
	    };

	    /**
	     * Mark this node as "removed" without actually removing it.
	     *
	     * Expand/show methods will never reveal this node until restored.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.softRemove = function () {
	        return baseStateChange('removed', true, 'softremoved', this, 'softRemove');
	    };

	    /**
	     * Toggles collapsed state.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.toggleCollapse = function () {
	        return this.collapsed() ? this.expand() : this.collapse();
	    };

	    /**
	     * Toggles selected state.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.toggleSelect = function () {
	        return this.selected() ? this.deselect() : this.select();
	    };

	    /**
	     * Export this node as a native Object.
	     *
	     * @category TreeNode
	     * @return {object} Node object.
	     */
	    TreeNode.prototype.toObject = function () {
	        var object = {};

	        (0, _each3.default)(this, function (value, property) {
	            object[property] = value;
	        });

	        if (this.hasChildren() && (0, _isFunction3.default)(this.children.toArray)) {
	            object.children = this.children.toArray();
	        }

	        return object;
	    };

	    /**
	     * Checks whether a node is visible to a user. Returns false
	     * if it's hidden, or if any ancestor is hidden or collapsed.
	     *
	     * @category TreeNode
	     * @param {object} node Node object.
	     * @return {boolean} Whether visible.
	     */
	    TreeNode.prototype.visible = function () {
	        var node = this;

	        var isVisible = true;
	        if (node.hidden() || node.removed()) {
	            isVisible = false;
	        } else if (node.hasParent()) {
	            if (node.getParent().collapsed()) {
	                isVisible = false;
	            } else {
	                isVisible = node.getParent().visible();
	            }
	        } else {
	            isVisible = true;
	        }

	        return isVisible;
	    };

	    /**
	     * An Array-like collection of TreeNodes.
	     *
	     * @category TreeNodes
	     * @param {array} array Array of TreeNode objects.
	     * @return {TreeNodes} Collection of TreeNode
	     */
	    function TreeNodes(array) {
	        var treeNodes = this;

	        if ((0, _isArray3.default)(array)) {
	            (0, _each3.default)(array, function (node) {
	                treeNodes.push(node);
	            });
	        }
	    };
	    TreeNodes.prototype = Object.create(Array.prototype);
	    TreeNodes.prototype.constructor = TreeNodes;

	    /**
	     * Clones (deep) the array of nodes.
	     *
	     * @category TreeNodes
	     * @return {TreeNodes} Array of cloned nodes.
	     */
	    TreeNodes.prototype.clone = function () {
	        var newArray = new TreeNodes();

	        (0, _each3.default)(this, function (node) {
	            newArray.push(node.clone());
	        });

	        return newArray;
	    };

	    /**
	     * Copies nodes to a new tree instance.
	     *
	     * @category TreeNodes
	     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
	     * @return {void}
	     */
	    TreeNodes.prototype.copy = function (hierarchy) {
	        var nodes = this;

	        return {

	            /**
	             * Sets a destination.
	             *
	             * @category CopyNode
	             * @param {object} dest Destination Inspire Tree.
	             * @return {array} Array of new nodes.
	             */
	            to: function to(dest) {
	                if (!(0, _isFunction3.default)(dest.addNodes)) {
	                    throw new Error('Destination must be an Inspire Tree instance.');
	                }

	                var newNodes = new TreeNodes();

	                (0, _each3.default)(nodes, function (node) {
	                    newNodes.push(node.copy(hierarchy).to(dest));
	                });

	                return newNodes;
	            }
	        };
	    };

	    /**
	     * Concat nodes like an Array would.
	     *
	     * @category TreeNodes
	     * @param {TreeNodes} nodes Array of nodes.
	     * @return {TreeNodes} Resulting node array.
	     */
	    TreeNodes.prototype.concat = function (nodes) {
	        var newNodes = new TreeNodes();

	        var pusher = function pusher(node) {
	            newNodes.push(node);
	        };

	        (0, _each3.default)(this, pusher);
	        (0, _each3.default)(nodes, pusher);

	        return newNodes;
	    };

	    /**
	     * Returns deepest nodes from this array.
	     *
	     * @return {TreeNodes} Array of node objects.
	     */
	    TreeNodes.prototype.deepest = function () {
	        var matches = new TreeNodes();

	        this.recurseDown(function (node) {
	            if (!node.children) {
	                matches.push(node);
	            }
	        });

	        return matches;
	    };

	    /**
	     * Recursively expands all nodes, loading all dynamic calls.
	     *
	     * @category TreeNodes
	     * @return {Promise} Promise resolved only when all children have loaded and expanded.
	     */
	    TreeNodes.prototype.expandDeep = function () {
	        var nodes = this;

	        return new _es6Promise.Promise(function (resolve) {
	            var waitCount = 0;

	            var done = function done() {
	                if (--waitCount === 0) {
	                    resolve(nodes);
	                }
	            };

	            nodes.recurseDown(function (node) {
	                waitCount++;

	                // Ignore nodes without children
	                if (node.children) {
	                    node.expand().catch(done).then(function () {
	                        // Manually trigger expansion on newly loaded children
	                        node.children.expandDeep().catch(done).then(done);
	                    });
	                } else {
	                    done();
	                }
	            });
	        });
	    };

	    /**
	     * Clones an array of node objects and removes any
	     * itree instance information/state.
	     *
	     * @category TreeNodes
	     * @return {array} Array of node objects.
	     */
	    TreeNodes.prototype.export = function () {
	        var clones = [];

	        (0, _each3.default)(this, function (node) {
	            clones.push(node.export());
	        });

	        return clones;
	    };

	    /**
	     * Returns a cloned hierarchy of all nodes matching a predicate.
	     *
	     * Because it filters deeply, we must clone all nodes so that we
	     * don't affect the actual node array.
	     *
	     * @category TreeNodes
	     * @param {string|function} predicate State flag or custom function.
	     * @return {TreeNodes} Array of node objects.
	     */
	    TreeNodes.prototype.extract = function (predicate) {
	        var flat = this.flatten(predicate);
	        var matches = new TreeNodes();

	        (0, _each3.default)(flat, function (node) {
	            matches.push(node.copyHierarchy());
	        });

	        return matches;
	    };

	    /**
	     * Returns nodes which match a predicate.
	     *
	     * @category TreeNodes
	     * @param {string|function} predicate State flag or custom function.
	     * @return {TreeNodes} Array of node objects.
	     */
	    TreeNodes.prototype.filter = function (predicate) {
	        var fn = getPredicateFunction(predicate);
	        var matches = new TreeNodes();

	        (0, _each3.default)(this, function (node) {
	            if (fn(node)) {
	                matches.push(node);
	            }
	        });

	        return matches;
	    };

	    /**
	     * Flattens a hierarchy, returning only node(s) matching the
	     * expected state or predicate function.
	     *
	     * @category TreeNodes
	     * @param {string|function} predicate State property or custom function.
	     * @return {TreeNodes} Flat array of matching nodes.
	     */
	    TreeNodes.prototype.flatten = function (predicate) {
	        var flat = new TreeNodes();

	        var fn = getPredicateFunction(predicate);
	        this.recurseDown(function (node) {
	            if (fn(node)) {
	                flat.push(node);
	            }
	        });

	        return flat;
	    };

	    /**
	     * Get a specific node in the collection, or undefined if it doesn't exist.
	     *
	     * @category TreeNodes
	     * @param {int} index Numeric index of requested node.
	     * @return {TreeNode} Node object. Undefined if invalid index.
	     */
	    TreeNodes.prototype.get = function (index) {
	        return this[index];
	    };

	    /**
	     * Iterate down all nodes and any children.
	     *
	     * @category TreeNodes
	     * @param {function} iteratee Iteratee function.
	     * @return {TreeNodes} Resulting nodes.
	     */
	    TreeNodes.prototype.recurseDown = function (iteratee) {
	        recurseDown(this, iteratee);

	        return this;
	    };

	    /**
	     * Sorts all TreeNode objects in this collection.
	     *
	     * If no custom sorter given, the configured "sort" value will be used.
	     *
	     * @category TreeNodes
	     * @param {string|function} sorter Sort function or property name.
	     * @return {TreeNodes} Array of node obejcts.
	     */
	    TreeNodes.prototype.sort = function (sorter) {
	        var nodes = this;

	        if (tree.config.sort && !sorter) {
	            sorter = tree.config.sort;
	        }

	        var sorted = (0, _sortBy3.default)(nodes, sorter);

	        nodes.length = 0;
	        (0, _each3.default)(sorted, function (node) {
	            nodes.push(node);
	        });

	        return nodes;
	    };

	    /**
	     * Returns a native Array of nodes.
	     *
	     * @category TreeNodes
	     * @return {array} Array of node objects.
	     */
	    TreeNodes.prototype.toArray = function () {
	        var array = [];

	        (0, _each3.default)(this, function (node) {
	            array.push(node.toObject());
	        });

	        return array;
	    };

	    /**
	     * Map shallow to each TreeNode
	     *
	     * @private
	     * @param {string} method Method name.
	     * @return {void}
	     */
	    function mapToEach(method) {
	        TreeNodes.prototype[method] = function () {
	            dom.batch();
	            (0, _each3.default)(this, function (node) {
	                node[method]();
	            });
	            dom.end();

	            return this;
	        };
	    }

	    /**
	     * Map deeply to all TreeNodes and children
	     *
	     * @private
	     * @param {string} method Method name.
	     * @return {void}
	     */
	    function mapToEachDeeply(method) {
	        TreeNodes.prototype[method + 'Deep'] = function () {
	            dom.batch();
	            this.recurseDown(function (node) {
	                node[method]();
	            });
	            dom.end();

	            return this;
	        };
	    }

	    // Methods we can map to each/deeply TreeNode
	    var mapped = ['blur', 'collapse', 'deselect', 'hide', 'restore', 'select', 'setSelectable', 'show'];
	    (0, _each3.default)(mapped, function (method) {
	        mapToEach(method);
	        mapToEachDeeply(method);
	    });

	    // Methods we can map to each TreeNode
	    (0, _each3.default)(['expand', 'expandParents', 'clean', 'softRemove'], mapToEach);

	    // Predicate methods we can map
	    (0, _each3.default)(['available', 'collapsed', 'focused', 'hidden', 'removed', 'selected'], function (state) {
	        TreeNodes.prototype[state] = function (full) {
	            if (full) {
	                return this.extract(state);
	            }

	            return this.flatten(state);
	        };
	    });

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
	        if (node.itree.state[prop] !== value) {
	            if (prop === 'removed') {
	                resetState(node);
	            }

	            node.itree.state[prop] = value;

	            tree.emit('node.' + verb, node);

	            if (deep && node.hasChildren()) {
	                node.getChildren().recurseDown(function (child) {
	                    child[deep]();
	                });
	            }

	            node.markDirty();
	            dom.applyChanges();
	        }

	        return node;
	    }

	    /**
	     * Parses a raw collection of objects into a model used
	     * within a tree. Adds state and other internal properties.
	     *
	     * @private
	     * @param {array|object} array Array of nodes
	     * @param {object} parent Pointer to parent object
	     * @return {array|object} Object model.
	     */
	    function collectionToModel(array, parent) {
	        var collection = new TreeNodes();

	        // Sort
	        if (tree.config.sort) {
	            array = (0, _sortBy3.default)(array, tree.config.sort);
	        }

	        (0, _each3.default)(array, function (node) {
	            collection.push(objectToModel(node, parent));
	        });

	        return collection;
	    };

	    /**
	     * Creates a predicate function.
	     *
	     * @private
	     * @param {string|function} predicate Property name or custom function.
	     * @return {function} Predicate function.
	     */
	    function getPredicateFunction(predicate) {
	        var fn = predicate;
	        if (typeof predicate === 'string') {
	            fn = function fn(node) {
	                return (0, _isFunction3.default)(node[predicate]) ? node[predicate]() : node[predicate];
	            };
	        }

	        return fn;
	    }

	    /**
	     * Merge a node into an existing context - a model
	     * or another node's children. If the ID exists
	     * the node is skipped and we try its children.
	     *
	     * @private
	     * @param {array} context Array of node objects.
	     * @param {object} node Node object.
	     * @return {array} Array of new nodes.
	     */
	    var mergeNode = function mergeNode(context, node) {
	        var newNodes = new TreeNodes();

	        if (node.id) {
	            // Does node already exist
	            var existing = tree.node(node.id);
	            if (existing) {
	                existing.restore();
	                existing.show();

	                // Merge children
	                if (node.hasChildren()) {
	                    if (!(0, _isArrayLike3.default)(existing.children)) {
	                        existing.children = new TreeNodes();
	                    }

	                    (0, _each3.default)(node.children, function (child) {
	                        newNodes.concat(mergeNode(existing, child));
	                    });
	                }

	                // Merge truthy
	                else if (node.children) {
	                        existing.children = node.children;
	                    }
	            } else {
	                if (context instanceof TreeNode) {
	                    node.itree.parent = context;
	                    context.children.push(node);
	                } else {
	                    context.push(node);
	                }

	                node.markDirty();
	                newNodes.push(node);
	            }
	        }

	        return newNodes;
	    };

	    /**
	     * Parse a raw object into a model used within a tree.
	     *
	     * Note: Uses native js over lodash where performance
	     * benefits most, since this handles every node.
	     *
	     * @private
	     * @param {object} object Source object
	     * @param {object} parent Pointer to parent object.
	     * @return {object} Final object
	     */
	    function objectToModel(object, parent) {
	        // Create or type-ensure ID
	        object.id = object.id || (0, _cuid2.default)();
	        if (typeof object.id !== 'string') {
	            object.id = object.id.toString();
	        }

	        // High-performance default assignments
	        var itree = object.itree = object.itree || {};
	        itree.icon = itree.icon || false;

	        var li = itree.li = itree.li || {};
	        li.attributes = li.attributes || {};

	        var state = itree.state = itree.state || {};

	        // Enabled by default
	        state.collapsed = typeof state.collapsed === 'boolean' ? state.collapsed : defaultState.collapsed;
	        state.selectable = typeof state.selectable === 'boolean' ? state.selectable : defaultState.selectable;

	        // Disabled by default
	        state.focused = state.focused || defaultState.focused;
	        state.hidden = state.hidden || defaultState.hidden;
	        state.indeterminate = state.indeterminate || defaultState.indeterminate;
	        state.loading = state.loading || defaultState.loading;
	        state.removed = state.removed || defaultState.removed;
	        state.selected = state.selected || defaultState.selected;

	        // Save parent, if any.
	        object.itree.parent = parent;

	        // Wrap
	        object = (0, _assign3.default)(new TreeNode(), object);

	        if (object.hasChildren()) {
	            object.children = collectionToModel(object.children, object);
	        }

	        // Fire events for pre-set states, if enabled
	        if (allowsLoadEvents) {
	            (0, _each3.default)(tree.config.allowLoadEvents, function (eventName) {
	                if (state[eventName]) {
	                    tree.emit('node.' + eventName, object);
	                }
	            });
	        }

	        return object;
	    };

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

	        if ((0, _isArrayLike3.default)(obj)) {
	            (0, _each3.default)(obj, function (node) {
	                res = recurseDown(node, iteratee);

	                return res;
	            });
	        } else {
	            res = iteratee(obj);

	            // Recurse children
	            if (res !== false && obj.hasChildren()) {
	                res = recurseDown(obj.children, iteratee);
	            }
	        }

	        return res;
	    }

	    /**
	     * Reset a node's state to the tree default.
	     *
	     * @private
	     * @param {TreeNode} node Node object.
	     * @returns {TreeNode} Node object.
	     */
	    function resetState(node) {
	        (0, _each3.default)(defaultState, function (val, prop) {
	            node.itree.state[prop] = val;
	        });

	        return node;
	    }

	    var model = new TreeNodes();

	    // Map some model.TreeNodes method to the tree to make life easier for users
	    for (var method in TreeNodes.prototype) {
	        if (method !== 'constructor' && !tree[method] && (0, _isFunction3.default)(TreeNodes.prototype[method])) {
	            (function (methodName) {
	                tree[methodName] = function () {
	                    return model[methodName].apply(model, arguments);
	                };
	            })(method);
	        }
	    }

	    /**
	     * Add a node.
	     *
	     * @category Tree
	     * @param {object} node Node object.
	     * @return {object} Node object.
	     */
	    tree.addNode = function (node) {
	        node = objectToModel(node);
	        var newNodes = mergeNode(model, node);

	        if (newNodes.length) {
	            tree.emit('node.added', node);
	            node.markDirty();
	            dom.applyChanges();
	        }

	        return node;
	    };

	    /**
	     * Add nodes.
	     *
	     * @category Tree
	     * @param {array} nodes Array of node objects.
	     * @return {TreeNodes} Added node objects.
	     */
	    tree.addNodes = function (nodes) {
	        dom.batch();

	        var newNodes = new TreeNodes();
	        (0, _each3.default)(nodes, function (node) {
	            newNodes.push(tree.addNode(node));
	        });

	        dom.end();

	        return newNodes;
	    };

	    /**
	     * Compares any number of TreeNode objects and returns
	     * the minimum and maximum (starting/ending) nodes.
	     *
	     * @category Tree
	     * @return {array} Array with two TreeNode objects.
	     */
	    tree.boundingNodes = function () {
	        var pathMap = (0, _transform3.default)(arguments, function (map, node) {
	            map[node.indexPath().replace(/\./g, '')] = node;
	        }, {});

	        var paths = (0, _sortBy3.default)(Object.keys(pathMap));
	        return [(0, _get3.default)(pathMap, (0, _head3.default)(paths)), (0, _get3.default)(pathMap, (0, _tail3.default)(paths))];
	    };

	    /**
	     * Shows all nodes and collapses parents.
	     *
	     * @category Tree
	     * @return {void}
	     */
	    tree.clearSearch = function () {
	        tree.nodes().showDeep();
	        tree.nodes().collapseDeep();
	    };

	    /**
	     * Get a node.
	     *
	     * @category Tree
	     * @param {string|number} id ID of node.
	     * @param {TreeNodes} nodes Base collection to search in.
	     * @return {TreeNode} Node object.
	     */
	    tree.node = function (id, nodes) {
	        var match;

	        if ((0, _isNumber3.default)(id)) {
	            id = id.toString();
	        }

	        (nodes || model).recurseDown(function (node) {
	            if (node.id === id) {
	                match = node;

	                return false;
	            }
	        });

	        return match;
	    };

	    /**
	     * Get all nodes in a tree, or nodes for an array of IDs.
	     *
	     * @category Tree
	     * @param {array} refs Array of ID references.
	     * @return {TreeNodes} Array of node objects.
	     * @example
	     *
	     * var all = tree.nodes()
	     * var some = tree.nodes([1, 2, 3])
	     */
	    tree.nodes = function (refs) {
	        var nodes = model;

	        if ((0, _isArray3.default)(refs)) {
	            nodes = new TreeNodes();

	            (0, _each3.default)(refs, function (ref) {
	                var node = tree.node(ref);
	                if (node) {
	                    nodes.push(node);
	                }
	            });
	        }

	        return nodes;
	    };

	    /**
	     * Loads tree. Accepts an array or a promise.
	     *
	     * @category Tree
	     * @param {array|function} loader Array of nodes, or promise resolving an array of nodes.
	     * @return {Promise} Promise resolved upon successful load, rejected on error.
	     * @example
	     *
	     * tree.load($.getJSON('nodes.json'));
	     */
	    tree.load = function (loader) {
	        return new _es6Promise.Promise(function (resolve, reject) {
	            var complete = function complete(nodes) {
	                // Delay event for synchronous loader. Otherwise it fires
	                // before the user has a chance to listen.
	                if (!initialized && (0, _isArray3.default)(nodes)) {
	                    setTimeout(function () {
	                        tree.emit('data.loaded', nodes);
	                    });
	                } else {
	                    tree.emit('data.loaded', nodes);
	                }

	                // Clear and call rendering on existing data
	                if (model.length > 0) {
	                    tree.removeAll();
	                }

	                model = collectionToModel(nodes);

	                if (tree.config.requireSelection && !tree.selected().length) {
	                    tree.selectFirstAvailableNode();
	                }

	                // Delay event for synchronous loader
	                if (!initialized && (0, _isArray3.default)(nodes)) {
	                    setTimeout(function () {
	                        tree.emit('model.loaded', model);
	                    });
	                } else {
	                    tree.emit('model.loaded', model);
	                }

	                resolve(model);

	                dom.applyChanges();

	                if ((0, _isFunction3.default)(dom.scrollSelectedIntoView)) {
	                    dom.scrollSelectedIntoView();
	                }
	            };

	            var error = function error(err) {
	                tree.emit('data.loaderror', err);
	                reject(err);
	            };

	            // Data given already as an array
	            if ((0, _isArrayLike3.default)(loader)) {
	                complete(loader);
	            }

	            // Data loader requires a caller/callback
	            else if ((0, _isFunction3.default)(loader)) {
	                    loader(null, complete, error);
	                }

	                // Data loader is likely a promise
	                else if ((0, _isObject3.default)(loader)) {
	                        // Promise
	                        if ((0, _isFunction3.default)(loader.then)) {
	                            loader.then(complete);
	                        }

	                        // jQuery promises use "error".
	                        if ((0, _isFunction3.default)(loader.error)) {
	                            loader.error(error);
	                        } else if ((0, _isFunction3.default)(loader.catch)) {
	                            loader.catch(error);
	                        }
	                    } else {
	                        throw new Error('Invalid data loader.');
	                    }
	        });
	    };

	    /**
	     * Reloads/re-executes the original data loader.
	     *
	     * @category Tree
	     * @return {void}
	     */
	    tree.reload = function () {
	        tree.load(tree.config.data);
	    };

	    /**
	     * Removes all nodes.
	     *
	     * @category Tree
	     * @return {void}
	     */
	    tree.removeAll = function () {
	        model = new TreeNodes();
	        dom.applyChanges();
	    };

	    /**
	     * Search nodes, showing only those that match and the necessary hierarchy.
	     *
	     * @category Tree
	     * @param {*} query Search string, RegExp, or function.
	     * @return {TreeNodes} Array of matching node objects.
	     */
	    tree.search = function (query) {
	        var matches = new TreeNodes();

	        var custom = tree.config.search;
	        if ((0, _isFunction3.default)(custom)) {
	            return custom(query, function resolver(nodes) {
	                dom.batch();

	                tree.nodes().hideDeep();
	                (0, _each3.default)(nodes, function (node) {
	                    mergeNode(model, node);
	                });

	                dom.end();
	            }, function rejecter(err) {
	                tree.emit('tree.loaderror', err);
	            });
	        }

	        // Don't search if query empty
	        if (!query || (0, _isString3.default)(query) && (0, _isEmpty3.default)(query)) {
	            return tree.clearSearch();
	        }

	        if ((0, _isString3.default)(query)) {
	            query = new RegExp(query, 'i');
	        }

	        var predicate;
	        if ((0, _isRegExp3.default)(query)) {
	            predicate = function predicate(node) {
	                return query.test(node.text);
	            };
	        } else {
	            predicate = query;
	        }

	        dom.batch();

	        model.recurseDown(function (node) {
	            var match = predicate(node);
	            var wasHidden = node.hidden();
	            node.itree.state.hidden = !match;

	            // If hidden state will change
	            if (wasHidden !== node.hidden()) {
	                node.markDirty();
	            }

	            if (match) {
	                matches.push(node);
	                node.expandParents();
	            }
	        });

	        dom.end();

	        return matches;
	    };

	    /**
	     * Select all nodes between a start and end node.
	     * Starting node must have a higher index path so we can work down to endNode.
	     *
	     * @category Tree
	     * @param {TreeNode} startNode Starting node
	     * @param {TreeNode} endNode Ending node
	     * @return {void}
	     */
	    tree.selectBetween = function (startNode, endNode) {
	        dom.batch();

	        var node = startNode.nextVisibleNode();
	        while (node) {
	            node.select();

	            if (node && node.id === endNode.id) {
	                break;
	            }

	            node = node.nextVisibleNode();
	        }

	        dom.end();
	    };

	    /**
	     * Select the first available node at the root level.
	     *
	     * @category Tree
	     * @return {TreeNode} Selected node object.
	     */
	    tree.selectFirstAvailableNode = function () {
	        var node = model.filter('available').get(0);
	        if (node) {
	            node.select();
	        }

	        return node;
	    };

	    // Connect to our target DOM element
	    dom.attach(tree.config.target);

	    // Load initial user data
	    tree.load(tree.config.data);

	    initialized = true;

	    return tree;
	};

	// Mixin EventEmitter
	InspireTree.prototype = Object.create(_eventemitter2.default.prototype);

	module.exports = InspireTree;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(2);

	/** `Object#toString` result references. */
	var regexpTag = '[object RegExp]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `RegExp` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isRegExp(/abc/);
	 * // => true
	 *
	 * _.isRegExp('/abc/');
	 * // => false
	 */
	function isRegExp(value) {
	  return isObject(value) && objectToString.call(value) == regexpTag;
	}

	module.exports = isRegExp;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(4),
	    isArray = __webpack_require__(12),
	    isArrayLike = __webpack_require__(6),
	    isFunction = __webpack_require__(9),
	    isString = __webpack_require__(13);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if `value` is an empty collection or object. A value is considered
	 * empty if it's an `arguments` object, array, string, or jQuery-like collection
	 * with a length of `0` or has no own enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (isArrayLike(value) && (isArray(value) || isString(value) || isFunction(value.splice) || isArguments(value))) {
	    return !value.length;
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = isEmpty;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLikeObject = __webpack_require__(5);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(6),
	    isObjectLike = __webpack_require__(11);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getLength = __webpack_require__(7),
	    isFunction = __webpack_require__(9),
	    isLength = __webpack_require__(10);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	module.exports = isArrayLike;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(8);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(2);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	module.exports = isObjectLike;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(12),
	    isObjectLike = __webpack_require__(11);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
	}

	module.exports = isString;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObjectLike = __webpack_require__(11);

	/** `Object#toString` result references. */
	var numberTag = '[object Number]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	 * as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' || isObjectLike(value) && objectToString.call(value) == numberTag;
	}

	module.exports = isNumber;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var drop = __webpack_require__(16);

	/**
	 * Gets all but the first element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * _.tail([1, 2, 3]);
	 * // => [2, 3]
	 */
	function tail(array) {
	  return drop(array, 1);
	}

	module.exports = tail;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseSlice = __webpack_require__(17),
	    toInteger = __webpack_require__(18);

	/**
	 * Creates a slice of `array` with `n` elements dropped from the beginning.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @param {number} [n=1] The number of elements to drop.
	 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * _.drop([1, 2, 3]);
	 * // => [2, 3]
	 *
	 * _.drop([1, 2, 3], 2);
	 * // => [3]
	 *
	 * _.drop([1, 2, 3], 5);
	 * // => []
	 *
	 * _.drop([1, 2, 3], 0);
	 * // => [1, 2, 3]
	 */
	function drop(array, n, guard) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return [];
	  }
	  n = guard || n === undefined ? 1 : toInteger(n);
	  return baseSlice(array, n < 0 ? 0 : n, length);
	}

	module.exports = drop;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : length + start;
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : end - start >>> 0;
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toNumber = __webpack_require__(19);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = value < 0 ? -1 : 1;
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? remainder ? value - remainder : value : 0;
	}

	module.exports = toInteger;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(9),
	    isObject = __webpack_require__(2);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? other + '' : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}

	module.exports = toNumber;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Gets the first element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @alias first
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the first element of `array`.
	 * @example
	 *
	 * _.head([1, 2, 3]);
	 * // => 1
	 *
	 * _.head([]);
	 * // => undefined
	 */
	function head(array) {
	  return array ? array[0] : undefined;
	}

	module.exports = head;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(22);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined` the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCastPath = __webpack_require__(23),
	    isKey = __webpack_require__(31);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path + ''] : baseCastPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return index && index == length ? object : undefined;
	}

	module.exports = baseGet;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(12),
	    stringToPath = __webpack_require__(24);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function baseCastPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = baseCastPath;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toString = __webpack_require__(25);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	function stringToPath(string) {
	  var result = [];
	  toString(string).replace(rePropName, function (match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
	  });
	  return result;
	}

	module.exports = stringToPath;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(26),
	    isSymbol = __webpack_require__(30);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	module.exports = toString;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(27);

	/** Built-in value references. */
	var _Symbol = root.Symbol;

	module.exports = _Symbol;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var checkGlobal = __webpack_require__(29);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = objectTypes[ false ? 'undefined' : _typeof(exports)] && exports && !exports.nodeType ? exports : undefined;

	/** Detect free variable `module`. */
	var freeModule = objectTypes[ false ? 'undefined' : _typeof(module)] && module && !module.nodeType ? module : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self === 'undefined' ? 'undefined' : _typeof(self)] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[_typeof(undefined)] && undefined);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function('return this')();

	module.exports = root;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module), (function() { return this; }())))

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return value && value.Object === Object ? value : null;
	}

	module.exports = checkGlobal;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isObjectLike = __webpack_require__(11);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}

	module.exports = isSymbol;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(12);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (typeof value == 'number') {
	    return true;
	  }
	  return !isArray(value) && (reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object));
	}

	module.exports = isKey;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayEach = __webpack_require__(33),
	    baseCreate = __webpack_require__(34),
	    baseForOwn = __webpack_require__(35),
	    baseIteratee = __webpack_require__(45),
	    isArray = __webpack_require__(12),
	    isFunction = __webpack_require__(9),
	    isObject = __webpack_require__(2),
	    isTypedArray = __webpack_require__(89);

	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;

	/**
	 * An alternative to `_.reduce`; this method transforms `object` to a new
	 * `accumulator` object which is the result of running each of its own enumerable
	 * properties through `iteratee`, with each invocation potentially mutating
	 * the `accumulator` object. The iteratee is invoked with four arguments:
	 * (accumulator, value, key, object). Iteratee functions may exit iteration
	 * early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Array|Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [accumulator] The custom accumulator value.
	 * @returns {*} Returns the accumulated value.
	 * @example
	 *
	 * _.transform([2, 3, 4], function(result, n) {
	 *   result.push(n *= n);
	 *   return n % 2 == 0;
	 * }, []);
	 * // => [4, 9]
	 *
	 * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	 *   (result[value] || (result[value] = [])).push(key);
	 * }, {});
	 * // => { '1': ['a', 'c'], '2': ['b'] }
	 */
	function transform(object, iteratee, accumulator) {
	  var isArr = isArray(object) || isTypedArray(object);
	  iteratee = baseIteratee(iteratee, 4);

	  if (accumulator == null) {
	    if (isArr || isObject(object)) {
	      var Ctor = object.constructor;
	      if (isArr) {
	        accumulator = isArray(object) ? new Ctor() : [];
	      } else {
	        accumulator = isFunction(Ctor) ? baseCreate(getPrototypeOf(object)) : {};
	      }
	    } else {
	      accumulator = {};
	    }
	  }
	  (isArr ? arrayEach : baseForOwn)(object, function (value, index, object) {
	    return iteratee(accumulator, value, index, object);
	  });
	  return accumulator;
	}

	module.exports = transform;

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(2);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}

	module.exports = baseCreate;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFor = __webpack_require__(36),
	    keys = __webpack_require__(38);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createBaseFor = __webpack_require__(37);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function (object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHas = __webpack_require__(39),
	    baseKeys = __webpack_require__(40),
	    indexKeys = __webpack_require__(41),
	    isArrayLike = __webpack_require__(6),
	    isIndex = __webpack_require__(43),
	    isPrototype = __webpack_require__(44);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (baseHas(object, key) && !(skipIndexes && (key == 'length' || isIndex(key, length))) && !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && key in object && getPrototypeOf(object) === null;
	}

	module.exports = baseHas;

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	module.exports = baseKeys;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseTimes = __webpack_require__(42),
	    isArguments = __webpack_require__(4),
	    isArray = __webpack_require__(12),
	    isLength = __webpack_require__(10),
	    isString = __webpack_require__(13);

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) && (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	module.exports = indexKeys;

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var baseMatches = __webpack_require__(46),
	    baseMatchesProperty = __webpack_require__(95),
	    identity = __webpack_require__(101),
	    isArray = __webpack_require__(12),
	    property = __webpack_require__(102);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  if (type == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsMatch = __webpack_require__(47),
	    getMatchData = __webpack_require__(90);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function (object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || key in Object(object));
	    };
	  }
	  return function (object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(48),
	    baseIsEqual = __webpack_require__(77);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack(),
	          result = customizer ? customizer(objValue, srcValue, key, object, source, stack) : undefined;

	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var stackClear = __webpack_require__(49),
	    stackDelete = __webpack_require__(50),
	    stackGet = __webpack_require__(54),
	    stackHas = __webpack_require__(56),
	    stackSet = __webpack_require__(58);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	    var index = -1,
	        length = values ? values.length : 0;

	    this.clear();
	    while (++index < length) {
	        var entry = values[index];
	        this.set(entry[0], entry[1]);
	    }
	}

	// Add functions to the `Stack` cache.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}

	module.exports = stackClear;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocDelete = __webpack_require__(51);

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocDelete(array, key) : data.map['delete'](key);
	}

	module.exports = stackDelete;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(52);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}

	module.exports = assocDelete;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eq = __webpack_require__(53);

	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;

/***/ },
/* 53 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || value !== value && other !== other;
	}

	module.exports = eq;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocGet = __webpack_require__(55);

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocGet(array, key) : data.map.get(key);
	}

	module.exports = stackGet;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(52);

	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}

	module.exports = assocGet;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocHas = __webpack_require__(57);

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocHas(array, key) : data.map.has(key);
	}

	module.exports = stackHas;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(52);

	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}

	module.exports = assocHas;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MapCache = __webpack_require__(59),
	    assocSet = __webpack_require__(75);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache object.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;

	  if (array) {
	    if (array.length < LARGE_ARRAY_SIZE - 1) {
	      assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}

	module.exports = stackSet;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mapClear = __webpack_require__(60),
	    mapDelete = __webpack_require__(67),
	    mapGet = __webpack_require__(71),
	    mapHas = __webpack_require__(73),
	    mapSet = __webpack_require__(74);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	    var index = -1,
	        length = values ? values.length : 0;

	    this.clear();
	    while (++index < length) {
	        var entry = values[index];
	        this.set(entry[0], entry[1]);
	    }
	}

	// Add functions to the `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;

	module.exports = MapCache;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Hash = __webpack_require__(61),
	    Map = __webpack_require__(66);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new Hash(),
	    'map': Map ? new Map() : [],
	    'string': new Hash()
	  };
	}

	module.exports = mapClear;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(62);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}

	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

	module.exports = Hash;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(63);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isNative = __webpack_require__(64);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(9),
	    isHostObject = __webpack_require__(65),
	    isObjectLike = __webpack_require__(11);

	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}

	module.exports = isNative;

/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(63),
	    root = __webpack_require__(27);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(66),
	    assocDelete = __webpack_require__(51),
	    hashDelete = __webpack_require__(68),
	    isKeyable = __webpack_require__(70);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}

	module.exports = mapDelete;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hashHas = __webpack_require__(69);

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}

	module.exports = hashDelete;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(62);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}

	module.exports = hashHas;

/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return type == 'number' || type == 'boolean' || type == 'string' && value != '__proto__' || value == null;
	}

	module.exports = isKeyable;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(66),
	    assocGet = __webpack_require__(55),
	    hashGet = __webpack_require__(72),
	    isKeyable = __webpack_require__(70);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}

	module.exports = mapGet;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(62);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}

	module.exports = hashGet;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(66),
	    assocHas = __webpack_require__(57),
	    hashHas = __webpack_require__(69),
	    isKeyable = __webpack_require__(70);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}

	module.exports = mapHas;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(66),
	    assocSet = __webpack_require__(75),
	    hashSet = __webpack_require__(76),
	    isKeyable = __webpack_require__(70);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}

	module.exports = mapSet;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(52);

	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}

	module.exports = assocSet;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(62);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
	}

	module.exports = hashSet;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqualDeep = __webpack_require__(78),
	    isObject = __webpack_require__(2),
	    isObjectLike = __webpack_require__(11);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(48),
	    equalArrays = __webpack_require__(79),
	    equalByTag = __webpack_require__(81),
	    equalObjects = __webpack_require__(85),
	    getTag = __webpack_require__(86),
	    isArray = __webpack_require__(12),
	    isHostObject = __webpack_require__(65),
	    isTypedArray = __webpack_require__(89);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack());
	    return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      stack || (stack = new Stack());
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack());
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arraySome = __webpack_require__(80);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var index = -1,
	      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(array, other);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isUnordered) {
	      if (!arraySome(other, function (othValue) {
	        return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
	      })) {
	        result = false;
	        break;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}

	module.exports = equalArrays;

/***/ },
/* 80 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(26),
	    Uint8Array = __webpack_require__(82),
	    equalArrays = __webpack_require__(79),
	    mapToArray = __webpack_require__(83),
	    setToArray = __webpack_require__(84);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case arrayBufferTag:
	      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return object != +object ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == other + '';

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask | UNORDERED_COMPARE_FLAG, stack.set(object, other));

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(27);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;

/***/ },
/* 83 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function (value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;

/***/ },
/* 84 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function (value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHas = __webpack_require__(39),
	    keys = __webpack_require__(38);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}

	module.exports = equalObjects;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(66),
	    Set = __webpack_require__(87),
	    WeakMap = __webpack_require__(88);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var mapCtorString = Map ? funcToString.call(Map) : '',
	    setCtorString = Set ? funcToString.call(Set) : '',
	    weakMapCtorString = WeakMap ? funcToString.call(WeakMap) : '';

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}

	// Fallback for IE 11 providing `toStringTag` values for maps, sets, and weakmaps.
	if (Map && getTag(new Map()) != mapTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
	  getTag = function getTag(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : null,
	        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case mapCtorString:
	          return mapTag;
	        case setCtorString:
	          return setTag;
	        case weakMapCtorString:
	          return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(63),
	    root = __webpack_require__(27);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(63),
	    root = __webpack_require__(27);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isLength = __webpack_require__(10),
	    isObjectLike = __webpack_require__(11);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = isTypedArray;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isStrictComparable = __webpack_require__(91),
	    toPairs = __webpack_require__(92);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = toPairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(2);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseToPairs = __webpack_require__(93),
	    keys = __webpack_require__(38);

	/**
	 * Creates an array of own enumerable key-value pairs for `object` which
	 * can be consumed by `_.fromPairs`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.toPairs(new Foo);
	 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	 */
	function toPairs(object) {
	  return baseToPairs(object, keys(object));
	}

	module.exports = toPairs;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(94);

	/**
	 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	 * of key-value pairs for `object` corresponding to the property names of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the new array of key-value pairs.
	 */
	function baseToPairs(object, props) {
	  return arrayMap(props, function (key) {
	    return [key, object[key]];
	  });
	}

	module.exports = baseToPairs;

/***/ },
/* 94 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqual = __webpack_require__(77),
	    get = __webpack_require__(21),
	    hasIn = __webpack_require__(96);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	    return function (object) {
	        var objValue = get(object, path);
	        return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	    };
	}

	module.exports = baseMatchesProperty;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHasIn = __webpack_require__(97),
	    hasPath = __webpack_require__(98);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b.c');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b', 'c']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;

/***/ },
/* 97 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return key in Object(object);
	}

	module.exports = baseHasIn;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCastPath = __webpack_require__(23),
	    isArguments = __webpack_require__(4),
	    isArray = __webpack_require__(12),
	    isIndex = __webpack_require__(43),
	    isKey = __webpack_require__(31),
	    isLength = __webpack_require__(10),
	    isString = __webpack_require__(13),
	    last = __webpack_require__(99),
	    parent = __webpack_require__(100);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  if (object == null) {
	    return false;
	  }
	  var result = hasFunc(object, path);
	  if (!result && !isKey(path)) {
	    path = baseCastPath(path);
	    object = parent(object, path);
	    if (object != null) {
	      path = last(path);
	      result = hasFunc(object, path);
	    }
	  }
	  var length = object ? object.length : undefined;
	  return result || !!length && isLength(length) && isIndex(path, length) && (isArray(object) || isString(object) || isArguments(object));
	}

	module.exports = hasPath;

/***/ },
/* 99 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseSlice = __webpack_require__(17),
	    get = __webpack_require__(21);

	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length == 1 ? object : get(object, baseSlice(path, 0, -1));
	}

	module.exports = parent;

/***/ },
/* 101 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(8),
	    basePropertyDeep = __webpack_require__(103),
	    isKey = __webpack_require__(31);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(22);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  return function (object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assignValue = __webpack_require__(105),
	    copyObject = __webpack_require__(106),
	    createAssigner = __webpack_require__(108),
	    isArrayLike = __webpack_require__(6),
	    isPrototype = __webpack_require__(44),
	    keys = __webpack_require__(38);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

	/**
	 * Assigns own enumerable properties of source objects to the destination
	 * object. Source objects are applied from left to right. Subsequent sources
	 * overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.c = 3;
	 * }
	 *
	 * function Bar() {
	 *   this.e = 5;
	 * }
	 *
	 * Foo.prototype.d = 4;
	 * Bar.prototype.f = 6;
	 *
	 * _.assign({ 'a': 1 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3, 'e': 5 }
	 */
	var assign = createAssigner(function (object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});

	module.exports = assign;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eq = __webpack_require__(53);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
	    object[key] = value;
	  }
	}

	module.exports = assignValue;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObjectWith = __webpack_require__(107);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object) {
	  return copyObjectWith(source, props, object);
	}

	module.exports = copyObject;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assignValue = __webpack_require__(105);

	/**
	 * This function is like `copyObject` except that it accepts a function to
	 * customize copied values.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObjectWith(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];

	    assignValue(object, key, newValue);
	  }
	  return object;
	}

	module.exports = copyObjectWith;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isIterateeCall = __webpack_require__(109),
	    rest = __webpack_require__(110);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest(function (object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = typeof customizer == 'function' ? (length--, customizer) : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var eq = __webpack_require__(53),
	    isArrayLike = __webpack_require__(6),
	    isIndex = __webpack_require__(43),
	    isObject = __webpack_require__(2);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
	  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(111),
	    toInteger = __webpack_require__(18);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? func.length - 1 : toInteger(start), 0);
	  return function () {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0:
	        return func.call(this, array);
	      case 1:
	        return func.call(this, args[0], array);
	      case 2:
	        return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = rest;

/***/ },
/* 111 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0:
	      return func.call(thisArg);
	    case 1:
	      return func.call(thisArg, args[0]);
	    case 2:
	      return func.call(thisArg, args[0], args[1]);
	    case 3:
	      return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFlatten = __webpack_require__(113),
	    baseOrderBy = __webpack_require__(115),
	    isIterateeCall = __webpack_require__(109),
	    rest = __webpack_require__(110);

	/**
	 * Creates an array of elements, sorted in ascending order by the results of
	 * running each element in a collection through each iteratee. This method
	 * performs a stable sort, that is, it preserves the original sort order of
	 * equal elements. The iteratees are invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {...(Function|Function[]|Object|Object[]|string|string[])} [iteratees=[_.identity]]
	 *  The iteratees to sort by, specified individually or in arrays.
	 * @returns {Array} Returns the new sorted array.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'fred',   'age': 48 },
	 *   { 'user': 'barney', 'age': 36 },
	 *   { 'user': 'fred',   'age': 42 },
	 *   { 'user': 'barney', 'age': 34 }
	 * ];
	 *
	 * _.sortBy(users, function(o) { return o.user; });
	 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
	 *
	 * _.sortBy(users, ['user', 'age']);
	 * // => objects for [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
	 *
	 * _.sortBy(users, 'user', function(o) {
	 *   return Math.floor(o.age / 10);
	 * });
	 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
	 */
	var sortBy = rest(function (collection, iteratees) {
	  if (collection == null) {
	    return [];
	  }
	  var length = iteratees.length;
	  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
	    iteratees = [];
	  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
	    iteratees.length = 1;
	  }
	  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
	});

	module.exports = sortBy;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayPush = __webpack_require__(114),
	    isArguments = __webpack_require__(4),
	    isArray = __webpack_require__(12),
	    isArrayLikeObject = __webpack_require__(5);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, isStrict, result) {
	  result || (result = []);

	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && isArrayLikeObject(value) && (isStrict || isArray(value) || isArguments(value))) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;

/***/ },
/* 114 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(94),
	    baseIteratee = __webpack_require__(45),
	    baseMap = __webpack_require__(116),
	    baseSortBy = __webpack_require__(119),
	    compareMultiple = __webpack_require__(120);

	/**
	 * The base implementation of `_.orderBy` without param guards.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	 * @param {string[]} orders The sort orders of `iteratees`.
	 * @returns {Array} Returns the new sorted array.
	 */
	function baseOrderBy(collection, iteratees, orders) {
	  var index = -1;
	  iteratees = arrayMap(iteratees.length ? iteratees : Array(1), baseIteratee);

	  var result = baseMap(collection, function (value, key, collection) {
	    var criteria = arrayMap(iteratees, function (iteratee) {
	      return iteratee(value);
	    });
	    return { 'criteria': criteria, 'index': ++index, 'value': value };
	  });

	  return baseSortBy(result, function (object, other) {
	    return compareMultiple(object, other, orders);
	  });
	}

	module.exports = baseOrderBy;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseEach = __webpack_require__(117),
	    isArrayLike = __webpack_require__(6);

	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function (value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}

	module.exports = baseMap;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForOwn = __webpack_require__(35),
	    createBaseEach = __webpack_require__(118);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(6);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function (collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while (fromRight ? index-- : ++index < length) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;

/***/ },
/* 119 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.sortBy` which uses `comparer` to define the
	 * sort order of `array` and replaces criteria objects with their corresponding
	 * values.
	 *
	 * @private
	 * @param {Array} array The array to sort.
	 * @param {Function} comparer The function to define sort order.
	 * @returns {Array} Returns `array`.
	 */
	function baseSortBy(array, comparer) {
	  var length = array.length;

	  array.sort(comparer);
	  while (length--) {
	    array[length] = array[length].value;
	  }
	  return array;
	}

	module.exports = baseSortBy;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var compareAscending = __webpack_require__(121);

	/**
	 * Used by `_.orderBy` to compare multiple properties of a value to another
	 * and stable sort them.
	 *
	 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
	 * specify an order of "desc" for descending or "asc" for ascending sort order
	 * of corresponding values.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {boolean[]|string[]} orders The order to sort by for each property.
	 * @returns {number} Returns the sort order indicator for `object`.
	 */
	function compareMultiple(object, other, orders) {
	  var index = -1,
	      objCriteria = object.criteria,
	      othCriteria = other.criteria,
	      length = objCriteria.length,
	      ordersLength = orders.length;

	  while (++index < length) {
	    var result = compareAscending(objCriteria[index], othCriteria[index]);
	    if (result) {
	      if (index >= ordersLength) {
	        return result;
	      }
	      var order = orders[index];
	      return result * (order == 'desc' ? -1 : 1);
	    }
	  }
	  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	  // that causes it, under certain circumstances, to provide the same value for
	  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
	  // for more details.
	  //
	  // This also ensures a stable sort in V8 and other engines.
	  // See https://code.google.com/p/v8/issues/detail?id=90 for more details.
	  return object.index - other.index;
	}

	module.exports = compareMultiple;

/***/ },
/* 121 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Compares values to sort them in ascending order.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {number} Returns the sort order indicator for `value`.
	 */
	function compareAscending(value, other) {
	  if (value !== other) {
	    var valIsNull = value === null,
	        valIsUndef = value === undefined,
	        valIsReflexive = value === value;

	    var othIsNull = other === null,
	        othIsUndef = other === undefined,
	        othIsReflexive = other === other;

	    if (value > other && !othIsNull || !valIsReflexive || valIsNull && !othIsUndef && othIsReflexive || valIsUndef && othIsReflexive) {
	      return 1;
	    }
	    if (value < other && !valIsNull || !othIsReflexive || othIsNull && !valIsUndef && valIsReflexive || othIsUndef && valIsReflexive) {
	      return -1;
	    }
	  }
	  return 0;
	}

	module.exports = compareAscending;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIteratee = __webpack_require__(45),
	    basePullAt = __webpack_require__(123);

	/**
	 * Removes all elements from `array` that `predicate` returns truthy for
	 * and returns an array of the removed elements. The predicate is invoked
	 * with three arguments: (value, index, array).
	 *
	 * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
	 * to pull elements from an array by value.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new array of removed elements.
	 * @example
	 *
	 * var array = [1, 2, 3, 4];
	 * var evens = _.remove(array, function(n) {
	 *   return n % 2 == 0;
	 * });
	 *
	 * console.log(array);
	 * // => [1, 3]
	 *
	 * console.log(evens);
	 * // => [2, 4]
	 */
	function remove(array, predicate) {
	  var result = [];
	  if (!(array && array.length)) {
	    return result;
	  }
	  var index = -1,
	      indexes = [],
	      length = array.length;

	  predicate = baseIteratee(predicate, 3);
	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result.push(value);
	      indexes.push(index);
	    }
	  }
	  basePullAt(array, indexes);
	  return result;
	}

	module.exports = remove;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCastPath = __webpack_require__(23),
	    isIndex = __webpack_require__(43),
	    isKey = __webpack_require__(31),
	    last = __webpack_require__(99),
	    parent = __webpack_require__(100);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * The base implementation of `_.pullAt` without support for individual
	 * indexes or capturing the removed elements.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {number[]} indexes The indexes of elements to remove.
	 * @returns {Array} Returns `array`.
	 */
	function basePullAt(array, indexes) {
	  var length = array ? indexes.length : 0,
	      lastIndex = length - 1;

	  while (length--) {
	    var index = indexes[length];
	    if (lastIndex == length || index != previous) {
	      var previous = index;
	      if (isIndex(index)) {
	        splice.call(array, index, 1);
	      } else if (!isKey(index, array)) {
	        var path = baseCastPath(index),
	            object = parent(array, path);

	        if (object != null) {
	          delete object[last(path)];
	        }
	      } else {
	        delete array[index];
	      }
	    }
	  }
	  return array;
	}

	module.exports = basePullAt;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseSlice = __webpack_require__(17),
	    isIterateeCall = __webpack_require__(109),
	    toInteger = __webpack_require__(18);

	/**
	 * Creates a slice of `array` from `start` up to, but not including, `end`.
	 *
	 * **Note:** This method is used instead of [`Array#slice`](https://mdn.io/Array/slice)
	 * to ensure dense arrays are returned.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function slice(array, start, end) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return [];
	  }
	  if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
	    start = 0;
	    end = length;
	  } else {
	    start = start == null ? 0 : toInteger(start);
	    end = end === undefined ? length : toInteger(end);
	  }
	  return baseSlice(array, start, end);
	}

	module.exports = slice;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFindIndex = __webpack_require__(126),
	    baseIteratee = __webpack_require__(45);

	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.findIndex(users, function(o) { return o.user == 'barney'; });
	 * // => 0
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findIndex(users, { 'user': 'fred', 'active': false });
	 * // => 1
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findIndex(users, ['active', false]);
	 * // => 0
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findIndex(users, 'active');
	 * // => 2
	 */
	function findIndex(array, predicate) {
	    return array && array.length ? baseFindIndex(array, baseIteratee(predicate, 3)) : -1;
	}

	module.exports = findIndex;

/***/ },
/* 126 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromRight) {
	  var length = array.length,
	      index = fromRight ? length : -1;

	  while (fromRight ? index-- : ++index < length) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseEach = __webpack_require__(117),
	    baseFind = __webpack_require__(128),
	    baseFindIndex = __webpack_require__(126),
	    baseIteratee = __webpack_require__(45),
	    isArray = __webpack_require__(12);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	function find(collection, predicate) {
	  predicate = baseIteratee(predicate, 3);
	  if (isArray(collection)) {
	    var index = baseFindIndex(collection, predicate);
	    return index > -1 ? collection[index] : undefined;
	  }
	  return baseFind(collection, predicate, baseEach);
	}

	module.exports = find;

/***/ },
/* 128 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of methods like `_.find` and `_.findKey`, without
	 * support for iteratee shorthands, which iterates over `collection` using
	 * `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @param {boolean} [retKey] Specify returning the key of the found element instead of the element itself.
	 * @returns {*} Returns the found element or its key, else `undefined`.
	 */
	function baseFind(collection, predicate, eachFunc, retKey) {
	  var result;
	  eachFunc(collection, function (value, key, collection) {
	    if (predicate(value, key, collection)) {
	      result = retKey ? key : value;
	      return false;
	    }
	  });
	  return result;
	}

	module.exports = baseFind;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseEachRight = __webpack_require__(130),
	    baseFind = __webpack_require__(128),
	    baseFindIndex = __webpack_require__(126),
	    baseIteratee = __webpack_require__(45),
	    isArray = __webpack_require__(12);

	/**
	 * This method is like `_.find` except that it iterates over elements of
	 * `collection` from right to left.
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * _.findLast([1, 2, 3, 4], function(n) {
	 *   return n % 2 == 1;
	 * });
	 * // => 3
	 */
	function findLast(collection, predicate) {
	  predicate = baseIteratee(predicate, 3);
	  if (isArray(collection)) {
	    var index = baseFindIndex(collection, predicate, true);
	    return index > -1 ? collection[index] : undefined;
	  }
	  return baseFind(collection, predicate, baseEachRight);
	}

	module.exports = findLast;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForOwnRight = __webpack_require__(131),
	    createBaseEach = __webpack_require__(118);

	/**
	 * The base implementation of `_.forEachRight` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEachRight = createBaseEach(baseForOwnRight, true);

	module.exports = baseEachRight;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForRight = __webpack_require__(132),
	    keys = __webpack_require__(38);

	/**
	 * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwnRight(object, iteratee) {
	  return object && baseForRight(object, iteratee, keys);
	}

	module.exports = baseForOwnRight;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createBaseFor = __webpack_require__(37);

	/**
	 * This function is like `baseFor` except that it iterates over properties
	 * in the opposite order.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseForRight = createBaseFor(true);

	module.exports = baseForRight;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIndexOf = __webpack_require__(134),
	    toInteger = __webpack_require__(18);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Gets the index at which the first occurrence of `value` is found in `array`
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons. If `fromIndex` is negative, it's used as the offset
	 * from the end of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 * @example
	 *
	 * _.indexOf([1, 2, 1, 2], 2);
	 * // => 1
	 *
	 * // Search from the `fromIndex`.
	 * _.indexOf([1, 2, 1, 2], 2, 2);
	 * // => 3
	 */
	function indexOf(array, value, fromIndex) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return -1;
	  }
	  fromIndex = toInteger(fromIndex);
	  if (fromIndex < 0) {
	    fromIndex = nativeMax(length + fromIndex, 0);
	  }
	  return baseIndexOf(array, value, fromIndex);
	}

	module.exports = indexOf;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var indexOfNaN = __webpack_require__(135);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseIndexOf;

/***/ },
/* 135 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);

	  while (fromRight ? index-- : ++index < length) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = indexOfNaN;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseClone = __webpack_require__(137);

	/**
	 * Creates a shallow clone of `value`.
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
	 * and supports cloning arrays, array buffers, booleans, date objects, maps,
	 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
	 * arrays. The own enumerable properties of `arguments` objects are cloned
	 * as plain objects. An empty object is returned for uncloneable values such
	 * as error objects, functions, DOM nodes, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to clone.
	 * @returns {*} Returns the cloned value.
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var shallow = _.clone(objects);
	 * console.log(shallow[0] === objects[0]);
	 * // => true
	 */
	function clone(value) {
	  return baseClone(value, false, true);
	}

	module.exports = clone;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(48),
	    arrayEach = __webpack_require__(33),
	    assignValue = __webpack_require__(105),
	    baseAssign = __webpack_require__(138),
	    baseForOwn = __webpack_require__(35),
	    cloneBuffer = __webpack_require__(139),
	    copyArray = __webpack_require__(140),
	    copySymbols = __webpack_require__(141),
	    getTag = __webpack_require__(86),
	    initCloneArray = __webpack_require__(143),
	    initCloneByTag = __webpack_require__(144),
	    initCloneObject = __webpack_require__(154),
	    isArray = __webpack_require__(12),
	    isBuffer = __webpack_require__(155),
	    isHostObject = __webpack_require__(65),
	    isObject = __webpack_require__(2);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {boolean} [isFull] Specify a clone including symbols.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || isFunc && !object) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        result = baseAssign(result, value);
	        return isFull ? copySymbols(value, result) : result;
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack());
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function (subValue, key) {
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return isFull && !isArr ? copySymbols(value, result) : result;
	}

	module.exports = baseClone;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(106),
	    keys = __webpack_require__(38);

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;

/***/ },
/* 139 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var result = new buffer.constructor(buffer.length);
	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;

/***/ },
/* 140 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(106),
	    getSymbols = __webpack_require__(142);

	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	module.exports = copySymbols;

/***/ },
/* 142 */
/***/ function(module, exports) {

	"use strict";

	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = getOwnPropertySymbols || function () {
	  return [];
	};

	module.exports = getSymbols;

/***/ },
/* 143 */
/***/ function(module, exports) {

	'use strict';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cloneArrayBuffer = __webpack_require__(145),
	    cloneMap = __webpack_require__(146),
	    cloneRegExp = __webpack_require__(149),
	    cloneSet = __webpack_require__(150),
	    cloneSymbol = __webpack_require__(152),
	    cloneTypedArray = __webpack_require__(153);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case float32Tag:case float64Tag:
	    case int8Tag:case int16Tag:case int32Tag:
	    case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	module.exports = initCloneByTag;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Uint8Array = __webpack_require__(82);

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var addMapEntry = __webpack_require__(147),
	    arrayReduce = __webpack_require__(148),
	    mapToArray = __webpack_require__(83);

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map) {
	  return arrayReduce(mapToArray(map), addMapEntry, new map.constructor());
	}

	module.exports = cloneMap;

/***/ },
/* 147 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `Map#set` because it doesn't return the map instance in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}

	module.exports = addMapEntry;

/***/ },
/* 148 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;

/***/ },
/* 149 */
/***/ function(module, exports) {

	"use strict";

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	module.exports = cloneRegExp;

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var addSetEntry = __webpack_require__(151),
	    arrayReduce = __webpack_require__(148),
	    setToArray = __webpack_require__(84);

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set) {
	  return arrayReduce(setToArray(set), addSetEntry, new set.constructor());
	}

	module.exports = cloneSet;

/***/ },
/* 151 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  set.add(value);
	  return set;
	}

	module.exports = addSetEntry;

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(26);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	module.exports = cloneSymbol;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cloneArrayBuffer = __webpack_require__(145);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCreate = __webpack_require__(34),
	    isPrototype = __webpack_require__(44);

	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	    return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototypeOf(object)) : {};
	}

	module.exports = initCloneObject;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var constant = __webpack_require__(156),
	    root = __webpack_require__(27);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = objectTypes[ false ? 'undefined' : _typeof(exports)] && exports && !exports.nodeType ? exports : undefined;

	/** Detect free variable `module`. */
	var freeModule = objectTypes[ false ? 'undefined' : _typeof(module)] && module && !module.nodeType ? module : undefined;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports ? freeExports : undefined;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = !Buffer ? constant(false) : function (value) {
	  return value instanceof Buffer;
	};

	module.exports = isBuffer;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 156 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var getter = _.constant(object);
	 *
	 * getter() === object;
	 * // => true
	 */
	function constant(value) {
	  return function () {
	    return value;
	  };
	}

	module.exports = constant;

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseClone = __webpack_require__(137);

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, true, true);
	}

	module.exports = cloneDeep;

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(159);

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayEach = __webpack_require__(33),
	    baseCastFunction = __webpack_require__(160),
	    baseEach = __webpack_require__(117),
	    isArray = __webpack_require__(12);

	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
	 * for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(value) {
	 *   console.log(value);
	 * });
	 * // => logs `1` then `2`
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' then 'b' (iteration order is not guaranteed)
	 */
	function forEach(collection, iteratee) {
	    return typeof iteratee == 'function' && isArray(collection) ? arrayEach(collection, iteratee) : baseEach(collection, baseCastFunction(iteratee));
	}

	module.exports = forEach;

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var identity = __webpack_require__(101);

	/**
	 * Casts `value` to `identity` if it's not a function.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the array-like object.
	 */
	function baseCastFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}

	module.exports = baseCastFunction;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(111),
	    assignInDefaults = __webpack_require__(162),
	    assignInWith = __webpack_require__(163),
	    rest = __webpack_require__(110);

	/**
	 * Assigns own and inherited enumerable properties of source objects to the
	 * destination object for all destination properties that resolve to `undefined`.
	 * Source objects are applied from left to right. Once a property is set,
	 * additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var defaults = rest(function (args) {
	  args.push(undefined, assignInDefaults);
	  return apply(assignInWith, undefined, args);
	});

	module.exports = defaults;

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eq = __webpack_require__(53);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used by `_.defaults` to customize its `_.assignIn` use.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to assign.
	 * @param {Object} object The parent object of `objValue`.
	 * @returns {*} Returns the value to assign.
	 */
	function assignInDefaults(objValue, srcValue, key, object) {
	  if (objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
	    return srcValue;
	  }
	  return objValue;
	}

	module.exports = assignInDefaults;

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObjectWith = __webpack_require__(107),
	    createAssigner = __webpack_require__(108),
	    keysIn = __webpack_require__(164);

	/**
	 * This method is like `_.assignIn` except that it accepts `customizer` which
	 * is invoked to produce the assigned values. If `customizer` returns `undefined`
	 * assignment is handled by the method instead. The `customizer` is invoked
	 * with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   return _.isUndefined(objValue) ? srcValue : objValue;
	 * }
	 *
	 * var defaults = _.partialRight(_.assignInWith, customizer);
	 *
	 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var assignInWith = createAssigner(function (object, source, srcIndex, customizer) {
	  copyObjectWith(source, keysIn(source), object, customizer);
	});

	module.exports = assignInWith;

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseKeysIn = __webpack_require__(165),
	    indexKeys = __webpack_require__(41),
	    isIndex = __webpack_require__(43),
	    isPrototype = __webpack_require__(44);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  var index = -1,
	      isProto = isPrototype(object),
	      props = baseKeysIn(object),
	      propsLength = props.length,
	      indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  while (++index < propsLength) {
	    var key = props[index];
	    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Reflect = __webpack_require__(166),
	    iteratorToArray = __webpack_require__(167);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Built-in value references. */
	var enumerate = Reflect ? Reflect.enumerate : undefined,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * The base implementation of `_.keysIn` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  object = object == null ? object : Object(object);

	  var result = [];
	  for (var key in object) {
	    result.push(key);
	  }
	  return result;
	}

	// Fallback for IE < 9 with es6-shim.
	if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	  baseKeysIn = function baseKeysIn(object) {
	    return iteratorToArray(enumerate(object));
	  };
	}

	module.exports = baseKeysIn;

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(27);

	/** Built-in value references. */
	var Reflect = root.Reflect;

	module.exports = Reflect;

/***/ },
/* 167 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Converts `iterator` to an array.
	 *
	 * @private
	 * @param {Object} iterator The iterator to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function iteratorToArray(iterator) {
	  var data,
	      result = [];

	  while (!(data = iterator.next()).done) {
	    result.push(data.value);
	  }
	  return result;
	}

	module.exports = iteratorToArray;

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * cuid.js
	 * Collision-resistant UID generator for browsers and node.
	 * Sequential for fast db lookups and recency sorting.
	 * Safe for element IDs and server-side lookups.
	 *
	 * Extracted from CLCTR
	 *
	 * Copyright (c) Eric Elliott 2012
	 * MIT License
	 */

	/*global window, navigator, document, require, process, module */
	(function (app) {
	  'use strict';

	  var namespace = 'cuid',
	      c = 0,
	      blockSize = 4,
	      base = 36,
	      discreteValues = Math.pow(base, blockSize),
	      pad = function pad(num, size) {
	    var s = "000000000" + num;
	    return s.substr(s.length - size);
	  },
	      randomBlock = function randomBlock() {
	    return pad((Math.random() * discreteValues << 0).toString(base), blockSize);
	  },
	      safeCounter = function safeCounter() {
	    c = c < discreteValues ? c : 0;
	    c++; // this is not subliminal
	    return c - 1;
	  },
	      api = function cuid() {
	    // Starting with a lowercase letter makes
	    // it HTML element ID friendly.
	    var letter = 'c',
	        // hard-coded allows for sequential access

	    // timestamp
	    // warning: this exposes the exact date and time
	    // that the uid was created.
	    timestamp = new Date().getTime().toString(base),


	    // Prevent same-machine collisions.
	    counter,


	    // A few chars to generate distinct ids for different
	    // clients (so different computers are far less
	    // likely to generate the same id)
	    fingerprint = api.fingerprint(),


	    // Grab some more chars from Math.random()
	    random = randomBlock() + randomBlock();

	    counter = pad(safeCounter().toString(base), blockSize);

	    return letter + timestamp + counter + fingerprint + random;
	  };

	  api.slug = function slug() {
	    var date = new Date().getTime().toString(36),
	        counter,
	        print = api.fingerprint().slice(0, 1) + api.fingerprint().slice(-1),
	        random = randomBlock().slice(-2);

	    counter = safeCounter().toString(36).slice(-4);

	    return date.slice(-2) + counter + print + random;
	  };

	  api.globalCount = function globalCount() {
	    // We want to cache the results of this
	    var cache = function calc() {
	      var i,
	          count = 0;

	      for (i in window) {
	        count++;
	      }

	      return count;
	    }();

	    api.globalCount = function () {
	      return cache;
	    };
	    return cache;
	  };

	  api.fingerprint = function browserPrint() {
	    return pad((navigator.mimeTypes.length + navigator.userAgent.length).toString(36) + api.globalCount().toString(36), 4);
	  };

	  // don't change anything from here down.
	  if (app && app.register) {
	    app.register(namespace, api);
	  } else if (true) {
	    module.exports = api;
	  } else {
	    app[namespace] = api;
	  }
	})(undefined);

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*!
	 * EventEmitter2
	 * https://github.com/hij1nx/EventEmitter2
	 *
	 * Copyright (c) 2013 hij1nx
	 * Licensed under the MIT license.
	 */
	;!function (undefined) {

	  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
	    return Object.prototype.toString.call(obj) === "[object Array]";
	  };
	  var defaultMaxListeners = 10;

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
	      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
	      conf.wildcard && (this.wildcard = conf.wildcard);
	      conf.newListener && (this.newListener = conf.newListener);

	      if (this.wildcard) {
	        this.listenerTree = {};
	      }
	    }
	  }

	  function EventEmitter(conf) {
	    this._events = {};
	    this.newListener = false;
	    configure.call(this, conf);
	  }
	  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

	  //
	  // Attention, function return type now is array, always !
	  // It has zero elements if no any matches found and one or more
	  // elements (leafs) if there are matches
	  //
	  function searchListenerTree(handlers, type, tree, i) {
	    if (!tree) {
	      return [];
	    }
	    var listeners = [],
	        leaf,
	        len,
	        branch,
	        xTree,
	        xxTree,
	        isolatedBranch,
	        endReached,
	        typeLength = type.length,
	        currentType = type[i],
	        nextType = type[i + 1];
	    if (i === typeLength && tree._listeners) {
	      //
	      // If at the end of the event(s) list and the tree has listeners
	      // invoke those listeners.
	      //
	      if (typeof tree._listeners === 'function') {
	        handlers && handlers.push(tree._listeners);
	        return [tree];
	      } else {
	        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
	          handlers && handlers.push(tree._listeners[leaf]);
	        }
	        return [tree];
	      }
	    }

	    if (currentType === '*' || currentType === '**' || tree[currentType]) {
	      //
	      // If the event emitted is '*' at this part
	      // or there is a concrete match at this patch
	      //
	      if (currentType === '*') {
	        for (branch in tree) {
	          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
	            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 1));
	          }
	        }
	        return listeners;
	      } else if (currentType === '**') {
	        endReached = i + 1 === typeLength || i + 2 === typeLength && nextType === '*';
	        if (endReached && tree._listeners) {
	          // The next element has a _listeners, add it to the handlers.
	          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
	        }

	        for (branch in tree) {
	          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
	            if (branch === '*' || branch === '**') {
	              if (tree[branch]._listeners && !endReached) {
	                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
	              }
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
	            } else if (branch === nextType) {
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 2));
	            } else {
	              // No match on this one, shift into the tree but not in the type array.
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
	            }
	          }
	        }
	        return listeners;
	      }

	      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i + 1));
	    }

	    xTree = tree['*'];
	    if (xTree) {
	      //
	      // If the listener tree will allow any match for this part,
	      // then recursively explore all branches of the tree
	      //
	      searchListenerTree(handlers, type, xTree, i + 1);
	    }

	    xxTree = tree['**'];
	    if (xxTree) {
	      if (i < typeLength) {
	        if (xxTree._listeners) {
	          // If we have a listener on a '**', it will catch all, so add its handler.
	          searchListenerTree(handlers, type, xxTree, typeLength);
	        }

	        // Build arrays of matching next branches and others.
	        for (branch in xxTree) {
	          if (branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
	            if (branch === nextType) {
	              // We know the next element will match, so jump twice.
	              searchListenerTree(handlers, type, xxTree[branch], i + 2);
	            } else if (branch === currentType) {
	              // Current node matches, move into the tree.
	              searchListenerTree(handlers, type, xxTree[branch], i + 1);
	            } else {
	              isolatedBranch = {};
	              isolatedBranch[branch] = xxTree[branch];
	              searchListenerTree(handlers, type, { '**': isolatedBranch }, i + 1);
	            }
	          }
	        }
	      } else if (xxTree._listeners) {
	        // We have reached the end and still on a '**'
	        searchListenerTree(handlers, type, xxTree, typeLength);
	      } else if (xxTree['*'] && xxTree['*']._listeners) {
	        searchListenerTree(handlers, type, xxTree['*'], typeLength);
	      }
	    }

	    return listeners;
	  }

	  function growListenerTree(type, listener) {

	    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

	    //
	    // Looks for two consecutive '**', if so, don't add the event at all.
	    //
	    for (var i = 0, len = type.length; i + 1 < len; i++) {
	      if (type[i] === '**' && type[i + 1] === '**') {
	        return;
	      }
	    }

	    var tree = this.listenerTree;
	    var name = type.shift();

	    while (name) {

	      if (!tree[name]) {
	        tree[name] = {};
	      }

	      tree = tree[name];

	      if (type.length === 0) {

	        if (!tree._listeners) {
	          tree._listeners = listener;
	        } else if (typeof tree._listeners === 'function') {
	          tree._listeners = [tree._listeners, listener];
	        } else if (isArray(tree._listeners)) {

	          tree._listeners.push(listener);

	          if (!tree._listeners.warned) {

	            var m = defaultMaxListeners;

	            if (typeof this._events.maxListeners !== 'undefined') {
	              m = this._events.maxListeners;
	            }

	            if (m > 0 && tree._listeners.length > m) {

	              tree._listeners.warned = true;
	              console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', tree._listeners.length);
	              if (console.trace) {
	                console.trace();
	              }
	            }
	          }
	        }
	        return true;
	      }
	      name = type.shift();
	    }
	    return true;
	  }

	  // By default EventEmitters will print a warning if more than
	  // 10 listeners are added to it. This is a useful default which
	  // helps finding memory leaks.
	  //
	  // Obviously not all Emitters should be limited to 10. This function allows
	  // that to be increased. Set to zero for unlimited.

	  EventEmitter.prototype.delimiter = '.';

	  EventEmitter.prototype.setMaxListeners = function (n) {
	    this._events || init.call(this);
	    this._events.maxListeners = n;
	    if (!this._conf) this._conf = {};
	    this._conf.maxListeners = n;
	  };

	  EventEmitter.prototype.event = '';

	  EventEmitter.prototype.once = function (event, fn) {
	    this.many(event, 1, fn);
	    return this;
	  };

	  EventEmitter.prototype.many = function (event, ttl, fn) {
	    var self = this;

	    if (typeof fn !== 'function') {
	      throw new Error('many only accepts instances of Function');
	    }

	    function listener() {
	      if (--ttl === 0) {
	        self.off(event, listener);
	      }
	      fn.apply(this, arguments);
	    }

	    listener._origin = fn;

	    this.on(event, listener);

	    return self;
	  };

	  EventEmitter.prototype.emit = function () {

	    this._events || init.call(this);

	    var type = arguments[0];

	    if (type === 'newListener' && !this.newListener) {
	      if (!this._events.newListener) {
	        return false;
	      }
	    }

	    // Loop through the *_all* functions and invoke them.
	    if (this._all) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) {
	        args[i - 1] = arguments[i];
	      }for (i = 0, l = this._all.length; i < l; i++) {
	        this.event = type;
	        this._all[i].apply(this, [type].concat(args));
	      }
	    }

	    // If there is no 'error' event listener then throw.
	    if (type === 'error') {

	      if (!this._all && !this._events.error && !(this.wildcard && this.listenerTree.error)) {

	        if (arguments[1] instanceof Error) {
	          throw arguments[1]; // Unhandled 'error' event
	        } else {
	            throw new Error("Uncaught, unspecified 'error' event.");
	          }
	        return false;
	      }
	    }

	    var handler;

	    if (this.wildcard) {
	      handler = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
	    } else {
	      handler = this._events[type];
	    }

	    if (typeof handler === 'function') {
	      this.event = type;
	      if (arguments.length === 1) {
	        handler.call(this);
	      } else if (arguments.length > 1) switch (arguments.length) {
	        case 2:
	          handler.call(this, arguments[1]);
	          break;
	        case 3:
	          handler.call(this, arguments[1], arguments[2]);
	          break;
	        // slower
	        default:
	          var l = arguments.length;
	          var args = new Array(l - 1);
	          for (var i = 1; i < l; i++) {
	            args[i - 1] = arguments[i];
	          }handler.apply(this, args);
	      }
	      return true;
	    } else if (handler) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) {
	        args[i - 1] = arguments[i];
	      }var listeners = handler.slice();
	      for (var i = 0, l = listeners.length; i < l; i++) {
	        this.event = type;
	        listeners[i].apply(this, args);
	      }
	      return listeners.length > 0 || !!this._all;
	    } else {
	      return !!this._all;
	    }
	  };

	  EventEmitter.prototype.emitAsync = function () {

	    this._events || init.call(this);

	    var type = arguments[0];

	    if (type === 'newListener' && !this.newListener) {
	      if (!this._events.newListener) {
	        return Promise.resolve([false]);
	      }
	    }

	    var promises = [];

	    // Loop through the *_all* functions and invoke them.
	    if (this._all) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) {
	        args[i - 1] = arguments[i];
	      }for (i = 0, l = this._all.length; i < l; i++) {
	        this.event = type;
	        promises.push(this._all[i].apply(this, args));
	      }
	    }

	    // If there is no 'error' event listener then throw.
	    if (type === 'error') {

	      if (!this._all && !this._events.error && !(this.wildcard && this.listenerTree.error)) {

	        if (arguments[1] instanceof Error) {
	          return Promise.reject(arguments[1]); // Unhandled 'error' event
	        } else {
	            return Promise.reject("Uncaught, unspecified 'error' event.");
	          }
	      }
	    }

	    var handler;

	    if (this.wildcard) {
	      handler = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
	    } else {
	      handler = this._events[type];
	    }

	    if (typeof handler === 'function') {
	      this.event = type;
	      if (arguments.length === 1) {
	        promises.push(handler.call(this));
	      } else if (arguments.length > 1) {
	        switch (arguments.length) {
	          case 2:
	            promises.push(handler.call(this, arguments[1]));
	            break;
	          case 3:
	            promises.push(handler.call(this, arguments[1], arguments[2]));
	            break;
	          // slower
	          default:
	            var l = arguments.length;
	            var args = new Array(l - 1);
	            for (var i = 1; i < l; i++) {
	              args[i - 1] = arguments[i];
	            }promises.push(handler.apply(this, args));
	        }
	      }
	    } else if (handler) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) {
	        args[i - 1] = arguments[i];
	      }var listeners = handler.slice();
	      for (var i = 0, l = listeners.length; i < l; i++) {
	        this.event = type;
	        promises.push(listeners[i].apply(this, args));
	      }
	    }
	    return Promise.all(promises);
	  };

	  EventEmitter.prototype.on = function (type, listener) {

	    if (typeof type === 'function') {
	      this.onAny(type);
	      return this;
	    }

	    if (typeof listener !== 'function') {
	      throw new Error('on only accepts instances of Function');
	    }
	    this._events || init.call(this);

	    // To avoid recursion in the case that type == "newListeners"! Before
	    // adding it to the listeners, first emit "newListeners".
	    this.emit('newListener', type, listener);

	    if (this.wildcard) {
	      growListenerTree.call(this, type, listener);
	      return this;
	    }

	    if (!this._events[type]) {
	      // Optimize the case of one listener. Don't need the extra array object.
	      this._events[type] = listener;
	    } else if (typeof this._events[type] === 'function') {
	      // Adding the second element, need to change to array.
	      this._events[type] = [this._events[type], listener];
	    } else if (isArray(this._events[type])) {
	      // If we've already got an array, just append.
	      this._events[type].push(listener);

	      // Check for listener leak
	      if (!this._events[type].warned) {

	        var m = defaultMaxListeners;

	        if (typeof this._events.maxListeners !== 'undefined') {
	          m = this._events.maxListeners;
	        }

	        if (m > 0 && this._events[type].length > m) {

	          this._events[type].warned = true;
	          console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	          if (console.trace) {
	            console.trace();
	          }
	        }
	      }
	    }
	    return this;
	  };

	  EventEmitter.prototype.onAny = function (fn) {

	    if (typeof fn !== 'function') {
	      throw new Error('onAny only accepts instances of Function');
	    }

	    if (!this._all) {
	      this._all = [];
	    }

	    // Add the function to the event listener collection.
	    this._all.push(fn);
	    return this;
	  };

	  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	  EventEmitter.prototype.off = function (type, listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('removeListener only takes instances of Function');
	    }

	    var handlers,
	        leafs = [];

	    if (this.wildcard) {
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
	    } else {
	      // does not use listeners(), so no side effect of creating _events[type]
	      if (!this._events[type]) return this;
	      handlers = this._events[type];
	      leafs.push({ _listeners: handlers });
	    }

	    for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
	      var leaf = leafs[iLeaf];
	      handlers = leaf._listeners;
	      if (isArray(handlers)) {

	        var position = -1;

	        for (var i = 0, length = handlers.length; i < length; i++) {
	          if (handlers[i] === listener || handlers[i].listener && handlers[i].listener === listener || handlers[i]._origin && handlers[i]._origin === listener) {
	            position = i;
	            break;
	          }
	        }

	        if (position < 0) {
	          continue;
	        }

	        if (this.wildcard) {
	          leaf._listeners.splice(position, 1);
	        } else {
	          this._events[type].splice(position, 1);
	        }

	        if (handlers.length === 0) {
	          if (this.wildcard) {
	            delete leaf._listeners;
	          } else {
	            delete this._events[type];
	          }
	        }

	        this.emit("removeListener", type, listener);

	        return this;
	      } else if (handlers === listener || handlers.listener && handlers.listener === listener || handlers._origin && handlers._origin === listener) {
	        if (this.wildcard) {
	          delete leaf._listeners;
	        } else {
	          delete this._events[type];
	        }

	        this.emit("removeListener", type, listener);
	      }
	    }

	    function recursivelyGarbageCollect(root) {
	      if (root === undefined) {
	        return;
	      }
	      var keys = Object.keys(root);
	      for (var i in keys) {
	        var key = keys[i];
	        var obj = root[key];
	        if (obj instanceof Function || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== "object") continue;
	        if (Object.keys(obj).length > 0) {
	          recursivelyGarbageCollect(root[key]);
	        }
	        if (Object.keys(obj).length === 0) {
	          delete root[key];
	        }
	      }
	    }
	    recursivelyGarbageCollect(this.listenerTree);

	    return this;
	  };

	  EventEmitter.prototype.offAny = function (fn) {
	    var i = 0,
	        l = 0,
	        fns;
	    if (fn && this._all && this._all.length > 0) {
	      fns = this._all;
	      for (i = 0, l = fns.length; i < l; i++) {
	        if (fn === fns[i]) {
	          fns.splice(i, 1);
	          this.emit("removeListenerAny", fn);
	          return this;
	        }
	      }
	    } else {
	      fns = this._all;
	      for (i = 0, l = fns.length; i < l; i++) {
	        this.emit("removeListenerAny", fns[i]);
	      }this._all = [];
	    }
	    return this;
	  };

	  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

	  EventEmitter.prototype.removeAllListeners = function (type) {
	    if (arguments.length === 0) {
	      !this._events || init.call(this);
	      return this;
	    }

	    if (this.wildcard) {
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

	      for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
	        var leaf = leafs[iLeaf];
	        leaf._listeners = null;
	      }
	    } else {
	      if (!this._events || !this._events[type]) return this;
	      this._events[type] = null;
	    }
	    return this;
	  };

	  EventEmitter.prototype.listeners = function (type) {
	    if (this.wildcard) {
	      var handlers = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
	      return handlers;
	    }

	    this._events || init.call(this);

	    if (!this._events[type]) this._events[type] = [];
	    if (!isArray(this._events[type])) {
	      this._events[type] = [this._events[type]];
	    }
	    return this._events[type];
	  };

	  EventEmitter.prototype.listenersAny = function () {

	    if (this._all) {
	      return this._all;
	    } else {
	      return [];
	    }
	  };

	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return EventEmitter;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
	    // CommonJS
	    module.exports = EventEmitter;
	  } else {
	    // Browser global.
	    window.EventEmitter2 = EventEmitter;
	  }
	}();

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.1.2
	 */

	(function () {
	  "use strict";

	  function lib$es6$promise$utils$$objectOrFunction(x) {
	    return typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
	  }

	  function lib$es6$promise$utils$$isFunction(x) {
	    return typeof x === 'function';
	  }

	  function lib$es6$promise$utils$$isMaybeThenable(x) {
	    return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
	  }

	  var lib$es6$promise$utils$$_isArray;
	  if (!Array.isArray) {
	    lib$es6$promise$utils$$_isArray = function lib$es6$promise$utils$$_isArray(x) {
	      return Object.prototype.toString.call(x) === '[object Array]';
	    };
	  } else {
	    lib$es6$promise$utils$$_isArray = Array.isArray;
	  }

	  var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	  var lib$es6$promise$asap$$len = 0;
	  var lib$es6$promise$asap$$vertxNext;
	  var lib$es6$promise$asap$$customSchedulerFn;

	  var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	    lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	    lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	    lib$es6$promise$asap$$len += 2;
	    if (lib$es6$promise$asap$$len === 2) {
	      // If len is 2, that means that we need to schedule an async flush.
	      // If additional callbacks are queued before the queue is flushed, they
	      // will be processed by this flush that we are scheduling.
	      if (lib$es6$promise$asap$$customSchedulerFn) {
	        lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	      } else {
	        lib$es6$promise$asap$$scheduleFlush();
	      }
	    }
	  };

	  function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	    lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	  }

	  function lib$es6$promise$asap$$setAsap(asapFn) {
	    lib$es6$promise$asap$$asap = asapFn;
	  }

	  var lib$es6$promise$asap$$browserWindow = typeof window !== 'undefined' ? window : undefined;
	  var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	  var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	  var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	  // test for web worker but not in IE10
	  var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	  // node
	  function lib$es6$promise$asap$$useNextTick() {
	    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	    // see https://github.com/cujojs/when/issues/410 for details
	    return function () {
	      process.nextTick(lib$es6$promise$asap$$flush);
	    };
	  }

	  // vertx
	  function lib$es6$promise$asap$$useVertxTimer() {
	    return function () {
	      lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	    };
	  }

	  function lib$es6$promise$asap$$useMutationObserver() {
	    var iterations = 0;
	    var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	    var node = document.createTextNode('');
	    observer.observe(node, { characterData: true });

	    return function () {
	      node.data = iterations = ++iterations % 2;
	    };
	  }

	  // web worker
	  function lib$es6$promise$asap$$useMessageChannel() {
	    var channel = new MessageChannel();
	    channel.port1.onmessage = lib$es6$promise$asap$$flush;
	    return function () {
	      channel.port2.postMessage(0);
	    };
	  }

	  function lib$es6$promise$asap$$useSetTimeout() {
	    return function () {
	      setTimeout(lib$es6$promise$asap$$flush, 1);
	    };
	  }

	  var lib$es6$promise$asap$$queue = new Array(1000);
	  function lib$es6$promise$asap$$flush() {
	    for (var i = 0; i < lib$es6$promise$asap$$len; i += 2) {
	      var callback = lib$es6$promise$asap$$queue[i];
	      var arg = lib$es6$promise$asap$$queue[i + 1];

	      callback(arg);

	      lib$es6$promise$asap$$queue[i] = undefined;
	      lib$es6$promise$asap$$queue[i + 1] = undefined;
	    }

	    lib$es6$promise$asap$$len = 0;
	  }

	  function lib$es6$promise$asap$$attemptVertx() {
	    try {
	      var r = require;
	      var vertx = __webpack_require__(172);
	      lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	      return lib$es6$promise$asap$$useVertxTimer();
	    } catch (e) {
	      return lib$es6$promise$asap$$useSetTimeout();
	    }
	  }

	  var lib$es6$promise$asap$$scheduleFlush;
	  // Decide what async method to use to triggering processing of queued callbacks:
	  if (lib$es6$promise$asap$$isNode) {
	    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	  } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	  } else if (lib$es6$promise$asap$$isWorker) {
	    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	  } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	  } else {
	    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	  }
	  function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	    var parent = this;
	    var state = parent._state;

	    if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	      return this;
	    }

	    var child = new this.constructor(lib$es6$promise$$internal$$noop);
	    var result = parent._result;

	    if (state) {
	      var callback = arguments[state - 1];
	      lib$es6$promise$asap$$asap(function () {
	        lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	      });
	    } else {
	      lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	    }

	    return child;
	  }
	  var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	  function lib$es6$promise$promise$resolve$$resolve(object) {
	    /*jshint validthis:true */
	    var Constructor = this;

	    if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {
	      return object;
	    }

	    var promise = new Constructor(lib$es6$promise$$internal$$noop);
	    lib$es6$promise$$internal$$resolve(promise, object);
	    return promise;
	  }
	  var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;

	  function lib$es6$promise$$internal$$noop() {}

	  var lib$es6$promise$$internal$$PENDING = void 0;
	  var lib$es6$promise$$internal$$FULFILLED = 1;
	  var lib$es6$promise$$internal$$REJECTED = 2;

	  var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	  function lib$es6$promise$$internal$$selfFulfillment() {
	    return new TypeError("You cannot resolve a promise with itself");
	  }

	  function lib$es6$promise$$internal$$cannotReturnOwn() {
	    return new TypeError('A promises callback cannot return that same promise.');
	  }

	  function lib$es6$promise$$internal$$getThen(promise) {
	    try {
	      return promise.then;
	    } catch (error) {
	      lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	      return lib$es6$promise$$internal$$GET_THEN_ERROR;
	    }
	  }

	  function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	    try {
	      then.call(value, fulfillmentHandler, rejectionHandler);
	    } catch (e) {
	      return e;
	    }
	  }

	  function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	    lib$es6$promise$asap$$asap(function (promise) {
	      var sealed = false;
	      var error = lib$es6$promise$$internal$$tryThen(then, thenable, function (value) {
	        if (sealed) {
	          return;
	        }
	        sealed = true;
	        if (thenable !== value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, value);
	        }
	      }, function (reason) {
	        if (sealed) {
	          return;
	        }
	        sealed = true;

	        lib$es6$promise$$internal$$reject(promise, reason);
	      }, 'Settle: ' + (promise._label || ' unknown promise'));

	      if (!sealed && error) {
	        sealed = true;
	        lib$es6$promise$$internal$$reject(promise, error);
	      }
	    }, promise);
	  }

	  function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	    if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	      lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	    } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	      lib$es6$promise$$internal$$reject(promise, thenable._result);
	    } else {
	      lib$es6$promise$$internal$$subscribe(thenable, undefined, function (value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }, function (reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      });
	    }
	  }

	  function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	    if (maybeThenable.constructor === promise.constructor && then === lib$es6$promise$then$$default && constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	      lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	    } else {
	      if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	      } else if (then === undefined) {
	        lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	      } else if (lib$es6$promise$utils$$isFunction(then)) {
	        lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	      }
	    }
	  }

	  function lib$es6$promise$$internal$$resolve(promise, value) {
	    if (promise === value) {
	      lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	    } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	      lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	    } else {
	      lib$es6$promise$$internal$$fulfill(promise, value);
	    }
	  }

	  function lib$es6$promise$$internal$$publishRejection(promise) {
	    if (promise._onerror) {
	      promise._onerror(promise._result);
	    }

	    lib$es6$promise$$internal$$publish(promise);
	  }

	  function lib$es6$promise$$internal$$fulfill(promise, value) {
	    if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	      return;
	    }

	    promise._result = value;
	    promise._state = lib$es6$promise$$internal$$FULFILLED;

	    if (promise._subscribers.length !== 0) {
	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	    }
	  }

	  function lib$es6$promise$$internal$$reject(promise, reason) {
	    if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	      return;
	    }
	    promise._state = lib$es6$promise$$internal$$REJECTED;
	    promise._result = reason;

	    lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	  }

	  function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	    var subscribers = parent._subscribers;
	    var length = subscribers.length;

	    parent._onerror = null;

	    subscribers[length] = child;
	    subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	    subscribers[length + lib$es6$promise$$internal$$REJECTED] = onRejection;

	    if (length === 0 && parent._state) {
	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	    }
	  }

	  function lib$es6$promise$$internal$$publish(promise) {
	    var subscribers = promise._subscribers;
	    var settled = promise._state;

	    if (subscribers.length === 0) {
	      return;
	    }

	    var child,
	        callback,
	        detail = promise._result;

	    for (var i = 0; i < subscribers.length; i += 3) {
	      child = subscribers[i];
	      callback = subscribers[i + settled];

	      if (child) {
	        lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	      } else {
	        callback(detail);
	      }
	    }

	    promise._subscribers.length = 0;
	  }

	  function lib$es6$promise$$internal$$ErrorObject() {
	    this.error = null;
	  }

	  var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	  function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	    try {
	      return callback(detail);
	    } catch (e) {
	      lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	      return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	    }
	  }

	  function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	    var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	        value,
	        error,
	        succeeded,
	        failed;

	    if (hasCallback) {
	      value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	      if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	        failed = true;
	        error = value.error;
	        value = null;
	      } else {
	        succeeded = true;
	      }

	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	        return;
	      }
	    } else {
	      value = detail;
	      succeeded = true;
	    }

	    if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	      // noop
	    } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	  }

	  function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	    try {
	      resolver(function resolvePromise(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }, function rejectPromise(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      });
	    } catch (e) {
	      lib$es6$promise$$internal$$reject(promise, e);
	    }
	  }

	  function lib$es6$promise$promise$all$$all(entries) {
	    return new lib$es6$promise$enumerator$$default(this, entries).promise;
	  }
	  var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	  function lib$es6$promise$promise$race$$race(entries) {
	    /*jshint validthis:true */
	    var Constructor = this;

	    var promise = new Constructor(lib$es6$promise$$internal$$noop);

	    if (!lib$es6$promise$utils$$isArray(entries)) {
	      lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	      return promise;
	    }

	    var length = entries.length;

	    function onFulfillment(value) {
	      lib$es6$promise$$internal$$resolve(promise, value);
	    }

	    function onRejection(reason) {
	      lib$es6$promise$$internal$$reject(promise, reason);
	    }

	    for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	      lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	    }

	    return promise;
	  }
	  var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	  function lib$es6$promise$promise$reject$$reject(reason) {
	    /*jshint validthis:true */
	    var Constructor = this;
	    var promise = new Constructor(lib$es6$promise$$internal$$noop);
	    lib$es6$promise$$internal$$reject(promise, reason);
	    return promise;
	  }
	  var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

	  var lib$es6$promise$promise$$counter = 0;

	  function lib$es6$promise$promise$$needsResolver() {
	    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	  }

	  function lib$es6$promise$promise$$needsNew() {
	    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	  }

	  var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	  /**
	    Promise objects represent the eventual result of an asynchronous operation. The
	    primary way of interacting with a promise is through its `then` method, which
	    registers callbacks to receive either a promise's eventual value or the reason
	    why the promise cannot be fulfilled.
	     Terminology
	    -----------
	     - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	    - `thenable` is an object or function that defines a `then` method.
	    - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	    - `exception` is a value that is thrown using the throw statement.
	    - `reason` is a value that indicates why a promise was rejected.
	    - `settled` the final resting state of a promise, fulfilled or rejected.
	     A promise can be in one of three states: pending, fulfilled, or rejected.
	     Promises that are fulfilled have a fulfillment value and are in the fulfilled
	    state.  Promises that are rejected have a rejection reason and are in the
	    rejected state.  A fulfillment value is never a thenable.
	     Promises can also be said to *resolve* a value.  If this value is also a
	    promise, then the original promise's settled state will match the value's
	    settled state.  So a promise that *resolves* a promise that rejects will
	    itself reject, and a promise that *resolves* a promise that fulfills will
	    itself fulfill.
	      Basic Usage:
	    ------------
	     ```js
	    var promise = new Promise(function(resolve, reject) {
	      // on success
	      resolve(value);
	       // on failure
	      reject(reason);
	    });
	     promise.then(function(value) {
	      // on fulfillment
	    }, function(reason) {
	      // on rejection
	    });
	    ```
	     Advanced Usage:
	    ---------------
	     Promises shine when abstracting away asynchronous interactions such as
	    `XMLHttpRequest`s.
	     ```js
	    function getJSON(url) {
	      return new Promise(function(resolve, reject){
	        var xhr = new XMLHttpRequest();
	         xhr.open('GET', url);
	        xhr.onreadystatechange = handler;
	        xhr.responseType = 'json';
	        xhr.setRequestHeader('Accept', 'application/json');
	        xhr.send();
	         function handler() {
	          if (this.readyState === this.DONE) {
	            if (this.status === 200) {
	              resolve(this.response);
	            } else {
	              reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	            }
	          }
	        };
	      });
	    }
	     getJSON('/posts.json').then(function(json) {
	      // on fulfillment
	    }, function(reason) {
	      // on rejection
	    });
	    ```
	     Unlike callbacks, promises are great composable primitives.
	     ```js
	    Promise.all([
	      getJSON('/posts'),
	      getJSON('/comments')
	    ]).then(function(values){
	      values[0] // => postsJSON
	      values[1] // => commentsJSON
	       return values;
	    });
	    ```
	     @class Promise
	    @param {function} resolver
	    Useful for tooling.
	    @constructor
	  */
	  function lib$es6$promise$promise$$Promise(resolver) {
	    this._id = lib$es6$promise$promise$$counter++;
	    this._state = undefined;
	    this._result = undefined;
	    this._subscribers = [];

	    if (lib$es6$promise$$internal$$noop !== resolver) {
	      typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	      this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	    }
	  }

	  lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	  lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	  lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	  lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	  lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	  lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	  lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	  lib$es6$promise$promise$$Promise.prototype = {
	    constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	       ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	       Chaining
	      --------
	       The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	       ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	       findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	       ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	       Assimilation
	      ------------
	       Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	       ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	       If the assimliated promise rejects, then the downstream promise will also reject.
	       ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	       Simple Example
	      --------------
	       Synchronous Example
	       ```javascript
	      var result;
	       try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	       Errback Example
	       ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	       Promise Example;
	       ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	       Advanced Example
	      --------------
	       Synchronous Example
	       ```javascript
	      var author, books;
	       try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	       Errback Example
	       ```js
	       function foundBooks(books) {
	       }
	       function failure(reason) {
	       }
	       findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	       Promise Example;
	       ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	       @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	    then: lib$es6$promise$then$$default,

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	       ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	       // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	       // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	       @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	    'catch': function _catch(onRejection) {
	      return this.then(null, onRejection);
	    }
	  };
	  var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	  function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	    this._instanceConstructor = Constructor;
	    this.promise = new Constructor(lib$es6$promise$$internal$$noop);

	    if (Array.isArray(input)) {
	      this._input = input;
	      this.length = input.length;
	      this._remaining = input.length;

	      this._result = new Array(this.length);

	      if (this.length === 0) {
	        lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	      } else {
	        this.length = this.length || 0;
	        this._enumerate();
	        if (this._remaining === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        }
	      }
	    } else {
	      lib$es6$promise$$internal$$reject(this.promise, this._validationError());
	    }
	  }

	  lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function () {
	    return new Error('Array Methods must be provided an Array');
	  };

	  lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function () {
	    var length = this.length;
	    var input = this._input;

	    for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	      this._eachEntry(input[i], i);
	    }
	  };

	  lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function (entry, i) {
	    var c = this._instanceConstructor;
	    var resolve = c.resolve;

	    if (resolve === lib$es6$promise$promise$resolve$$default) {
	      var then = lib$es6$promise$$internal$$getThen(entry);

	      if (then === lib$es6$promise$then$$default && entry._state !== lib$es6$promise$$internal$$PENDING) {
	        this._settledAt(entry._state, i, entry._result);
	      } else if (typeof then !== 'function') {
	        this._remaining--;
	        this._result[i] = entry;
	      } else if (c === lib$es6$promise$promise$$default) {
	        var promise = new c(lib$es6$promise$$internal$$noop);
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	        this._willSettleAt(promise, i);
	      } else {
	        this._willSettleAt(new c(function (resolve) {
	          resolve(entry);
	        }), i);
	      }
	    } else {
	      this._willSettleAt(resolve(entry), i);
	    }
	  };

	  lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function (state, i, value) {
	    var promise = this.promise;

	    if (promise._state === lib$es6$promise$$internal$$PENDING) {
	      this._remaining--;

	      if (state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      } else {
	        this._result[i] = value;
	      }
	    }

	    if (this._remaining === 0) {
	      lib$es6$promise$$internal$$fulfill(promise, this._result);
	    }
	  };

	  lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function (promise, i) {
	    var enumerator = this;

	    lib$es6$promise$$internal$$subscribe(promise, undefined, function (value) {
	      enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	    }, function (reason) {
	      enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	    });
	  };
	  function lib$es6$promise$polyfill$$polyfill() {
	    var local;

	    if (typeof global !== 'undefined') {
	      local = global;
	    } else if (typeof self !== 'undefined') {
	      local = self;
	    } else {
	      try {
	        local = Function('return this')();
	      } catch (e) {
	        throw new Error('polyfill failed because global object is unavailable in this environment');
	      }
	    }

	    var P = local.Promise;

	    if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	      return;
	    }

	    local.Promise = lib$es6$promise$promise$$default;
	  }
	  var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	  var lib$es6$promise$umd$$ES6Promise = {
	    'Promise': lib$es6$promise$promise$$default,
	    'polyfill': lib$es6$promise$polyfill$$default
	  };

	  /* global define:true module:true window: true */
	  if ("function" === 'function' && __webpack_require__(173)['amd']) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return lib$es6$promise$umd$$ES6Promise;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module !== 'undefined' && module['exports']) {
	    module['exports'] = lib$es6$promise$umd$$ES6Promise;
	  } else if (typeof this !== 'undefined') {
	    this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	  }

	  lib$es6$promise$polyfill$$default();
	}).call(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(171), (function() { return this; }()), __webpack_require__(28)(module)))

/***/ },
/* 171 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 172 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 173 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 174 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	"use strict";

/***/ },
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Libs

	var _isEmpty2 = __webpack_require__(3);

	var _isEmpty3 = _interopRequireDefault(_isEmpty2);

	var _isArrayLike2 = __webpack_require__(6);

	var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

	var _isString2 = __webpack_require__(13);

	var _isString3 = _interopRequireDefault(_isString2);

	var _isObject2 = __webpack_require__(2);

	var _isObject3 = _interopRequireDefault(_isObject2);

	var _first2 = __webpack_require__(180);

	var _first3 = _interopRequireDefault(_first2);

	var _each2 = __webpack_require__(158);

	var _each3 = _interopRequireDefault(_each2);

	var _transform2 = __webpack_require__(32);

	var _transform3 = _interopRequireDefault(_transform2);

	var _isFunction2 = __webpack_require__(9);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _createElement = __webpack_require__(182);

	var _createElement2 = _interopRequireDefault(_createElement);

	var _diff = __webpack_require__(195);

	var _diff2 = _interopRequireDefault(_diff);

	var _h = __webpack_require__(200);

	var _h2 = _interopRequireDefault(_h);

	var _keyCodes = __webpack_require__(211);

	var _keyCodes2 = _interopRequireDefault(_keyCodes);

	var _patch = __webpack_require__(212);

	var _patch2 = _interopRequireDefault(_patch);

	var _VCache = __webpack_require__(217);

	var _VCache2 = _interopRequireDefault(_VCache);

	var _VArrayDirtyCompare = __webpack_require__(218);

	var _VArrayDirtyCompare2 = _interopRequireDefault(_VArrayDirtyCompare);

	var _VDirtyCompare = __webpack_require__(219);

	var _VDirtyCompare2 = _interopRequireDefault(_VDirtyCompare);

	var _VStateCompare = __webpack_require__(220);

	var _VStateCompare2 = _interopRequireDefault(_VStateCompare);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function InspireDOM(tree) {
	    var $activeDropTarget;
	    var $dragElement;
	    var $dragNode;
	    var $target;
	    var dragHandleOffset;
	    var dropTargets = [];
	    var isDragDropEnabled = false;
	    var isMouseHeld = false;

	    // Cache because we use in loops
	    var isDynamic = (0, _isFunction3.default)(tree.config.data);
	    var contextMenuChoices = tree.config.contextMenu;

	    /**
	     * Clear page text selection, primarily after a click event which
	     * nativelt selects a range of text.
	     *
	     * @category DOM
	     * @private
	     * @return {void}
	     */
	    function clearSelection() {
	        if (document.selection && document.selection.empty) {
	            document.selection.empty();
	        } else if (window.getSelection) {
	            window.getSelection().removeAllRanges();
	        }
	    }

	    /**
	     * Closes any open context menu.
	     *
	     * @category DOM
	     * @private
	     * @return {void}
	     */
	    function closeContextMenu() {
	        if (contextMenuNode) {
	            contextMenuNode.parentNode.removeChild(contextMenuNode);
	            contextMenuNode = null;
	        }
	    };

	    /**
	     * Creates a tri-state checkbox input.
	     *
	     * @param {TreeNode} node Node object.
	     * @return {object} Input node element.
	     */
	    function createCheckbox(node) {
	        return new _VCache2.default({
	            selected: node.selected(),
	            indeterminate: node.itree.state.indeterminate
	        }, _VStateCompare2.default, function () {
	            var attributes = {
	                type: 'checkbox',
	                checked: node.selected() ? 'checked' : undefined // eslint-disable-line no-undefined
	            };

	            return (0, _h2.default)('input', {
	                attributes: attributes,
	                indeterminate: node.itree.state.indeterminate,
	                onclick: function onclick(event) {
	                    node.toggleSelect();

	                    // Emit
	                    tree.emit('node.click', event, node);
	                }
	            });
	        });
	    }

	    /**
	     * Creates a context menu unordered list.
	     *
	     * @private
	     * @param {array} choices Array of choice objects.
	     * @param {object} node Clicked node.
	     * @return {object} Unordered list node.
	     */
	    function createContextMenu(choices, node) {
	        return (0, _h2.default)('ul.itree-menu', {
	            onclick: function onclick(event) {
	                event.stopPropagation();
	            }
	        }, (0, _transform3.default)(choices, function (contents, choice) {
	            contents.push(createContextMenuListItem(choice, node));
	        }));
	    }

	    /**
	     * Creates a context menu list item.
	     *
	     * @private
	     * @param {object} choice Choice object.
	     * @param {object} node Node object.
	     * @return {object} List item node.
	     */
	    function createContextMenuListItem(choice, node) {
	        return (0, _h2.default)('li', [[(0, _h2.default)('a', {
	            onclick: function onclick(event) {
	                choice.handler(event, node, closeContextMenu);
	            }
	        }, choice.text)]]);
	    }

	    /**
	     * Creates a draggable element by cloning a target,
	     * registers a listener for mousemove.
	     *
	     * @private
	     * @param {HTMLElement} element DOM Element.
	     * @param {Event} event Click event to use.
	     * @return {void}
	     */
	    function createDraggableElement(element, event) {
	        $dragNode = nodeFromTitleDOMElement(element);

	        var offset = getAbsoluteOffset(element);
	        var diffX = event.clientX - offset.left;
	        var diffY = event.clientY - offset.top;

	        dragHandleOffset = { left: diffX, top: diffY };

	        $dragElement = element.cloneNode(true);
	        $dragElement.className += ' dragging';
	        $dragElement.style.top = offset.top + 'px';
	        $dragElement.style.left = offset.left + 'px';
	        $target.appendChild($dragElement);
	    }

	    /**
	     * Creates a list item node when a dynamic node returns no children.
	     *
	     * Cannot be clicked or expanded.
	     *
	     * @private
	     * @return {object} List Item node.
	     */
	    function createEmptyListItemNode() {
	        return new _VCache2.default({}, _VStateCompare2.default, function () {
	            return (0, _h2.default)('ol', [(0, _h2.default)('li', [(0, _h2.default)('span.title.icon.icon-file-empty.empty', ['No Results'])])]);
	        });
	    };

	    /**
	     * Creates a list item node for a specific data node.
	     *
	     * @private
	     * @param {object} node Data node.
	     * @return {object} List Item node.
	     */
	    function createListItemNode(node) {
	        return new _VCache2.default({
	            dirty: node.itree.dirty
	        }, _VDirtyCompare2.default, function () {
	            node.itree.dirty = false;

	            var contents = [createTitleContainer(node), (0, _h2.default)('div.wholerow')];

	            if (node.hasChildren()) {
	                contents.push(createOrderedList(node.children));
	            } else if (isDynamic) {
	                contents.push(createEmptyListItemNode());
	            }

	            // Add classes for any enabled states
	            // http://jsperf.com/object-keys-to-classnames
	            var classNames = '.';
	            var state = node.itree.state;
	            (0, _each3.default)(Object.keys(state), function (key) {
	                if (state[key]) {
	                    classNames += '.' + key;
	                }
	            });

	            if (!node.hidden() && node.removed()) {
	                classNames += '.hidden';
	            }

	            var attributes = node.itree.li.attributes || {};

	            // Force internal-use attributes
	            attributes['data-uid'] = node.id;

	            return (0, _h2.default)('li' + classNames, { attributes: attributes }, contents);
	        });
	    };

	    /**
	     * Creates list item nodes for an array of data nodes.
	     *
	     * @private
	     * @param {array} nodes Data nodes.
	     * @return {array} Array of List Item nodes.
	     */
	    function createListItemNodes(nodes) {
	        var domNodes = [];

	        (0, _each3.default)(nodes, function (node) {
	            // We can't just remove the node if soft-removed
	            // https://github.com/Matt-Esch/virtual-dom/issues/333
	            domNodes.push(createListItemNode(node));
	        });

	        return domNodes;
	    };

	    /**
	     * Creates an ordered list containing list item for
	     * provided data nodes.
	     *
	     * @private
	     * @param {array} nodes Data nodes.
	     * @return {object} Oredered List node.
	     */
	    function createOrderedList(nodes) {
	        return new _VCache2.default({
	            nodes: nodes,
	            nodeCount: nodes.length
	        }, _VArrayDirtyCompare2.default, function () {
	            return (0, _h2.default)('ol', createListItemNodes(nodes));
	        });
	    };

	    /**
	     * Creates an anchor around the node title.
	     *
	     * @private
	     * @param {object} node Node object.
	     * @param {boolean} hasVisibleChildren If this node has visible children.
	     * @return {object} Anchor node.
	     */
	    function createTitleAnchor(node, hasVisibleChildren) {
	        return new _VCache2.default({
	            icon: node.itree.icon,
	            text: node.text,
	            hasVisibleChildren: hasVisibleChildren
	        }, _VStateCompare2.default, function (previous, current) {
	            var classNames = ['title', 'icon'];

	            if (!tree.config.checkbox) {
	                classNames.push(current.state.icon || (hasVisibleChildren ? 'icon-folder' : 'icon-file-empty'));
	            }

	            return (0, _h2.default)('a.' + classNames.join('.'), {
	                oncontextmenu: function oncontextmenu(event) {
	                    if (contextMenuChoices) {
	                        renderContextMenu(event, node);

	                        // Emit
	                        tree.emit('node.contextmenu', event, node);
	                    }
	                },
	                onclick: function onclick(event) {
	                    tree.preventDeselection = tree.config.checkbox || event.metaKey || event.ctrlKey || event.shiftKey;

	                    if (event.shiftKey) {
	                        clearSelection();

	                        var selected = tree.selected();
	                        if (selected.length) {
	                            tree.selectBetween.apply(tree, tree.boundingNodes((0, _first3.default)(selected), node));
	                        }
	                    }

	                    node.toggleSelect();

	                    // Emit
	                    tree.emit('node.click', event, node);
	                },
	                ondblclick: function ondblclick(event) {
	                    // // Clear text selection which occurs on double click
	                    clearSelection();

	                    node.toggleCollapse();

	                    // Emit
	                    tree.emit('node.dblclick', event, node);
	                },
	                onmousedown: function onmousedown() {
	                    if (isDragDropEnabled) {
	                        isMouseHeld = true;
	                    }
	                }
	            }, [current.state.text]);
	        });
	    }

	    /**
	     * Creates a container element for the title/toggle/icons.
	     *
	     * @private
	     * @param {string} node Node object.
	     * @return {object} Container node.
	     */
	    function createTitleContainer(node) {
	        var hasVisibleChildren = !isDynamic ? node.hasVisibleChildren() : Boolean(node.children);

	        return new _VCache2.default({
	            hasVisibleChildren: hasVisibleChildren,
	            collapsed: node.collapsed(),
	            selected: node.selected(),
	            indeterminate: node.itree.state.indeterminate
	        }, _VStateCompare2.default, function () {
	            var contents = [];

	            if (hasVisibleChildren) {
	                contents.push(createToggleAnchor(node));
	            }

	            if (tree.config.checkbox) {
	                contents.push(createCheckbox(node));
	            }

	            contents.push(createTitleAnchor(node, hasVisibleChildren));

	            return (0, _h2.default)('div.title-wrap', contents);
	        });
	    };

	    /**
	     * Creates an anchor used for expanding and collapsing a node.
	     *
	     * @private
	     * @param {object} node Node object.
	     * @return {object} Anchor node.
	     */
	    function createToggleAnchor(node) {
	        return new _VCache2.default({
	            collapsed: node.collapsed()
	        }, _VStateCompare2.default, function (previous, current) {
	            var caret = current.state.collapsed ? '.icon-caret' : '.icon-caret-down';

	            return (0, _h2.default)('a.toggle.icon' + caret, { onclick: function onclick() {
	                    node.toggleCollapse();
	                } });
	        });
	    }

	    /**
	     * Calculcates the absolute offset values of an element.
	     *
	     * @private
	     * @param {HTMLElement} element HTML Element.
	     * @return {object} Object with top/left values.
	     */
	    function getAbsoluteOffset(element) {
	        var x = 0;
	        var y = 0;

	        while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
	            x += element.offsetLeft - element.scrollLeft;
	            y += element.offsetTop - element.scrollTop;
	            element = element.offsetParent;
	        }

	        // IE10 stores scroll values on documentElement instead.
	        // Due to unit testing, document may not always exist
	        if (typeof document !== 'undefined') {
	            x -= document.documentElement.scrollLeft;
	            y -= document.documentElement.scrollTop;
	        }

	        return { top: y, left: x };
	    }

	    /**
	     * Get an HTMLElement through various means:
	     * An element, jquery object, or a selector.
	     *
	     * @private
	     * @param {mixed} target Element, jQuery selector, selector.
	     * @return {HTMLElement} Matching element.
	     */
	    function getElement(target) {
	        var $element;

	        if (target instanceof HTMLElement) {
	            $element = target;
	        } else if ((0, _isObject3.default)(target) && (0, _isObject3.default)(target[0])) {
	            $element = target[0];
	        } else if ((0, _isString3.default)(target)) {
	            var match = document.querySelector(target);
	            if (match) {
	                $element = match;
	            }
	        }

	        return $element;
	    }

	    /**
	     * Helper method for obtaining the data-uid from a DOM element.
	     *
	     * @private
	     * @param {HTMLElement} element HTML Element.
	     * @return {object} Node object
	     */
	    function nodeFromTitleDOMElement(element) {
	        var uid = element.parentNode.parentNode.getAttribute('data-uid');
	        return tree.node(uid);
	    }

	    /**
	     * Helper method to find a scrollable ancestor element.
	     *
	     * @param  {HTMLElement} $element Starting element.
	     * @return {HTMLElement} Scrollable element.
	     */
	    function getScrollableAncestor($element) {
	        if ($element instanceof Element) {
	            var style = getComputedStyle($element);
	            if (style.overflow !== 'auto' && $element.parentNode) {
	                $element = getScrollableAncestor($element.parentNode);
	            }
	        }

	        return $element;
	    }

	    /**
	     * Listen to keyboard event for navigation.
	     *
	     * @private
	     * @param {Event} event Keyboard event.
	     * @return {void}
	     */
	    function keyboardListener(event) {
	        // Navigation
	        var focusedNode = tree.focused();
	        if (focusedNode) {
	            focusedNode = focusedNode[0];
	            switch (event.which) {
	                case _keyCodes2.default.DOWN:
	                    moveFocusDownFrom(focusedNode);
	                    break;
	                case _keyCodes2.default.ENTER:
	                    focusedNode.toggleSelect();
	                    break;
	                case _keyCodes2.default.LEFT:
	                    focusedNode.collapse();
	                    moveFocusUpFrom(focusedNode);
	                    break;
	                case _keyCodes2.default.RIGHT:
	                    focusedNode.expand();
	                    moveFocusDownFrom(focusedNode);
	                    break;
	                case _keyCodes2.default.UP:
	                    moveFocusUpFrom(focusedNode);
	                    break;
	                default:
	            }
	        }
	    }

	    /**
	     * Listener for mouse move events for drag and drop.
	     * Is removed automatically on mouse up.
	     *
	     * @private
	     * @param {Event} event Mouse move event.
	     * @return {void}
	     */
	    function mouseMoveListener(event) {
	        if (isMouseHeld && !$dragElement) {
	            createDraggableElement(event.target, event);
	        } else if ($dragElement) {
	            event.preventDefault();
	            event.stopPropagation();

	            var x = event.clientX - dragHandleOffset.left;
	            var y = event.clientY - dragHandleOffset.top;

	            $dragElement.style.left = x + 'px';
	            $dragElement.style.top = y + 'px';

	            var validTarget;
	            (0, _each3.default)(dropTargets, function (target) {
	                var rect = target.getBoundingClientRect();

	                if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
	                    validTarget = target;
	                    return false;
	                }
	            });

	            // If new target found for the first time
	            if (!$activeDropTarget && validTarget && validTarget.className.indexOf('drop-target') === -1) {
	                validTarget.className += ' drop-target';
	            }

	            $activeDropTarget = validTarget;
	        }
	    };

	    /**
	     * Handle mouse up events for dragged elements.
	     *
	     * @return {void}
	     */
	    function mouseUpListener() {
	        isMouseHeld = false;

	        if ($dragElement) {
	            $dragElement.parentNode.removeChild($dragElement);

	            if ($activeDropTarget && $activeDropTarget.inspireTree) {
	                var newNode = $activeDropTarget.inspireTree.addNode($dragNode.copyHierarchy().export());

	                tree.emit('node.dropout', $dragNode, $activeDropTarget);
	                $activeDropTarget.inspireTree.emit('node.dropin', newNode);
	            }
	        }

	        if ($activeDropTarget) {
	            $activeDropTarget.className = $activeDropTarget.className.replace('drop-target', '');
	        }

	        $dragNode = null;
	        $dragElement = null;
	        $activeDropTarget = null;
	    }

	    /**
	     * Move select down the visible tree from a starting node.
	     *
	     * @private
	     * @param {object} startingNode Node object.
	     * @return {void}
	     */
	    function moveFocusDownFrom(startingNode) {
	        var next = startingNode.nextVisibleNode();
	        if (next) {
	            next.focus();
	        }
	    }

	    /**
	     * Move select up the visible tree from a starting node.
	     *
	     * @private
	     * @param {object} startingNode Node object.
	     * @return {void}
	     */
	    function moveFocusUpFrom(startingNode) {
	        var prev = startingNode.previousVisibleNode();
	        if (prev) {
	            prev.focus();
	        }
	    }

	    var contextMenuNode;

	    /**
	     * Renders a context menu for a given contextmenu click and node.
	     *
	     * @private
	     * @param {object} event Click event.
	     * @param {object} node Clicked node object.
	     * @return {void}
	     */
	    function renderContextMenu(event, node) {
	        var choices = contextMenuChoices;

	        if ((0, _isArrayLike3.default)(choices)) {
	            event.preventDefault();

	            if (!contextMenuNode) {
	                var ul = createContextMenu(choices, node);
	                contextMenuNode = (0, _createElement2.default)(ul);
	                document.body.appendChild(contextMenuNode);
	            }

	            contextMenuNode.style.top = event.clientY + 'px';
	            contextMenuNode.style.left = event.clientX + 'px';
	        }
	    }

	    // Cache our root node, so we can patch re-render in the future.
	    var rootNode;
	    var ol;

	    /**
	     * Triggers rendering for the given node array.
	     *
	     * @category DOM
	     * @private
	     * @param {array} nodes Array of node objects.
	     * @return {void}
	     */
	    function renderNodes(nodes) {
	        var newOl = createOrderedList(nodes || tree.nodes(), true);

	        if (!rootNode) {
	            rootNode = (0, _createElement2.default)(newOl);
	            $target.appendChild(rootNode);
	        } else {
	            var patches = (0, _diff2.default)(ol, newOl);
	            rootNode = (0, _patch2.default)(rootNode, patches);
	        }

	        ol = newOl;
	    };

	    var dom = this;
	    var batching = 0;

	    /**
	     * Apply pending data changes to the DOM.
	     *
	     * Will skip rendering as long as any calls
	     * to `batch` have yet to be resolved,
	     *
	     * @category DOM
	     * @private
	     * @return {void}
	     */
	    dom.applyChanges = function () {
	        // Never rerender when until batch complete
	        if (batching > 0) {
	            return;
	        }

	        renderNodes();
	    };

	    /**
	     * Attaches to the DOM element for rendering.
	     *
	     * @category DOM
	     * @private
	     * @param {HTMLElement} target Element, selector, or jQuery-like object.
	     * @return {void}
	     */
	    dom.attach = function (target) {
	        $target = getElement(target);

	        if (!$target) {
	            throw new Error('No valid element to attach to.');
	        }

	        $target.className += ' inspire-tree';
	        $target.setAttribute('tabindex', tree.config.tabindex || -1);

	        // Handle keyboard interaction
	        $target.addEventListener('keyup', keyboardListener);

	        if (contextMenuChoices) {
	            document.body.addEventListener('click', function () {
	                closeContextMenu();
	            });
	        }

	        var dragTargetSelectors = tree.config.dragTargets;
	        if (!(0, _isEmpty3.default)(dragTargetSelectors)) {
	            (0, _each3.default)(dragTargetSelectors, function (selector) {
	                var dropTarget = getElement(selector);

	                if (dropTarget) {
	                    dropTargets.push(dropTarget);
	                } else {
	                    throw new Error('No valid element found for drop target ' + selector);
	                }
	            });
	        }

	        isDragDropEnabled = dropTargets.length > 0;

	        if (isDragDropEnabled) {
	            document.addEventListener('mouseup', mouseUpListener);
	            document.addEventListener('mousemove', mouseMoveListener);
	        }

	        $target.inspireTree = tree;
	    };

	    /**
	     * Disable rendering in preparation for multiple changes.
	     *
	     * @category DOM
	     * @private
	     * @return {void}
	     */
	    dom.batch = function () {
	        if (batching < 0) {
	            batching = 0;
	        }

	        batching++;
	    };

	    /**
	     * Permit rerendering of batched changes.
	     *
	     * @category DOM
	     * @private
	     * @return {void}
	     */
	    dom.end = function () {
	        batching--;

	        if (batching === 0) {
	            dom.applyChanges();
	        }
	    };

	    /**
	     * Scroll the first selected node into view.
	     *
	     * @category DOM
	     * @private
	     * @return {void}
	     */
	    dom.scrollSelectedIntoView = function () {
	        var $tree = document.querySelector('.inspire-tree');
	        var $selected = $tree.querySelector('.selected');

	        if ($selected) {
	            var $container = getScrollableAncestor($tree);

	            if ($container) {
	                $container.scrollTop = $selected.offsetTop;
	            }
	        }
	    };

	    return dom;
	};

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(181);

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(20);

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var createElement = __webpack_require__(183);

	module.exports = createElement;

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var document = __webpack_require__(184);

	var applyProperties = __webpack_require__(186);

	var isVNode = __webpack_require__(189);
	var isVText = __webpack_require__(191);
	var isWidget = __webpack_require__(192);
	var handleThunk = __webpack_require__(193);

	module.exports = createElement;

	function createElement(vnode, opts) {
	    var doc = opts ? opts.document || document : document;
	    var warn = opts ? opts.warn : null;

	    vnode = handleThunk(vnode).a;

	    if (isWidget(vnode)) {
	        return vnode.init();
	    } else if (isVText(vnode)) {
	        return doc.createTextNode(vnode.text);
	    } else if (!isVNode(vnode)) {
	        if (warn) {
	            warn("Item is not a valid virtual dom node", vnode);
	        }
	        return null;
	    }

	    var node = vnode.namespace === null ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);

	    var props = vnode.properties;
	    applyProperties(node, props);

	    var children = vnode.children;

	    for (var i = 0; i < children.length; i++) {
	        var childNode = createElement(children[i], opts);
	        if (childNode) {
	            node.appendChild(childNode);
	        }
	    }

	    return node;
	}

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var topLevel = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
	var minDoc = __webpack_require__(185);

	if (typeof document !== 'undefined') {
	    module.exports = document;
	} else {
	    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

	    if (!doccy) {
	        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
	    }

	    module.exports = doccy;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 185 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isObject = __webpack_require__(187);
	var isHook = __webpack_require__(188);

	module.exports = applyProperties;

	function applyProperties(node, props, previous) {
	    for (var propName in props) {
	        var propValue = props[propName];

	        if (propValue === undefined) {
	            removeProperty(node, propName, propValue, previous);
	        } else if (isHook(propValue)) {
	            removeProperty(node, propName, propValue, previous);
	            if (propValue.hook) {
	                propValue.hook(node, propName, previous ? previous[propName] : undefined);
	            }
	        } else {
	            if (isObject(propValue)) {
	                patchObject(node, props, previous, propName, propValue);
	            } else {
	                node[propName] = propValue;
	            }
	        }
	    }
	}

	function removeProperty(node, propName, propValue, previous) {
	    if (previous) {
	        var previousValue = previous[propName];

	        if (!isHook(previousValue)) {
	            if (propName === "attributes") {
	                for (var attrName in previousValue) {
	                    node.removeAttribute(attrName);
	                }
	            } else if (propName === "style") {
	                for (var i in previousValue) {
	                    node.style[i] = "";
	                }
	            } else if (typeof previousValue === "string") {
	                node[propName] = "";
	            } else {
	                node[propName] = null;
	            }
	        } else if (previousValue.unhook) {
	            previousValue.unhook(node, propName, propValue);
	        }
	    }
	}

	function patchObject(node, props, previous, propName, propValue) {
	    var previousValue = previous ? previous[propName] : undefined;

	    // Set attributes
	    if (propName === "attributes") {
	        for (var attrName in propValue) {
	            var attrValue = propValue[attrName];

	            if (attrValue === undefined) {
	                node.removeAttribute(attrName);
	            } else {
	                node.setAttribute(attrName, attrValue);
	            }
	        }

	        return;
	    }

	    if (previousValue && isObject(previousValue) && getPrototype(previousValue) !== getPrototype(propValue)) {
	        node[propName] = propValue;
	        return;
	    }

	    if (!isObject(node[propName])) {
	        node[propName] = {};
	    }

	    var replacer = propName === "style" ? "" : undefined;

	    for (var k in propValue) {
	        var value = propValue[k];
	        node[propName][k] = value === undefined ? replacer : value;
	    }
	}

	function getPrototype(value) {
	    if (Object.getPrototypeOf) {
	        return Object.getPrototypeOf(value);
	    } else if (value.__proto__) {
	        return value.__proto__;
	    } else if (value.constructor) {
	        return value.constructor.prototype;
	    }
	}

/***/ },
/* 187 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	module.exports = function isObject(x) {
		return (typeof x === "undefined" ? "undefined" : _typeof(x)) === "object" && x !== null;
	};

/***/ },
/* 188 */
/***/ function(module, exports) {

	"use strict";

	module.exports = isHook;

	function isHook(hook) {
	  return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
	}

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var version = __webpack_require__(190);

	module.exports = isVirtualNode;

	function isVirtualNode(x) {
	    return x && x.type === "VirtualNode" && x.version === version;
	}

/***/ },
/* 190 */
/***/ function(module, exports) {

	"use strict";

	module.exports = "2";

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var version = __webpack_require__(190);

	module.exports = isVirtualText;

	function isVirtualText(x) {
	    return x && x.type === "VirtualText" && x.version === version;
	}

/***/ },
/* 192 */
/***/ function(module, exports) {

	"use strict";

	module.exports = isWidget;

	function isWidget(w) {
	    return w && w.type === "Widget";
	}

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isVNode = __webpack_require__(189);
	var isVText = __webpack_require__(191);
	var isWidget = __webpack_require__(192);
	var isThunk = __webpack_require__(194);

	module.exports = handleThunk;

	function handleThunk(a, b) {
	    var renderedA = a;
	    var renderedB = b;

	    if (isThunk(b)) {
	        renderedB = renderThunk(b, a);
	    }

	    if (isThunk(a)) {
	        renderedA = renderThunk(a, null);
	    }

	    return {
	        a: renderedA,
	        b: renderedB
	    };
	}

	function renderThunk(thunk, previous) {
	    var renderedThunk = thunk.vnode;

	    if (!renderedThunk) {
	        renderedThunk = thunk.vnode = thunk.render(previous);
	    }

	    if (!(isVNode(renderedThunk) || isVText(renderedThunk) || isWidget(renderedThunk))) {
	        throw new Error("thunk did not return a valid node");
	    }

	    return renderedThunk;
	}

/***/ },
/* 194 */
/***/ function(module, exports) {

	"use strict";

	module.exports = isThunk;

	function isThunk(t) {
	    return t && t.type === "Thunk";
	}

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var diff = __webpack_require__(196);

	module.exports = diff;

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isArray = __webpack_require__(197);

	var VPatch = __webpack_require__(198);
	var isVNode = __webpack_require__(189);
	var isVText = __webpack_require__(191);
	var isWidget = __webpack_require__(192);
	var isThunk = __webpack_require__(194);
	var handleThunk = __webpack_require__(193);

	var diffProps = __webpack_require__(199);

	module.exports = diff;

	function diff(a, b) {
	    var patch = { a: a };
	    walk(a, b, patch, 0);
	    return patch;
	}

	function walk(a, b, patch, index) {
	    if (a === b) {
	        return;
	    }

	    var apply = patch[index];
	    var applyClear = false;

	    if (isThunk(a) || isThunk(b)) {
	        thunks(a, b, patch, index);
	    } else if (b == null) {

	        // If a is a widget we will add a remove patch for it
	        // Otherwise any child widgets/hooks must be destroyed.
	        // This prevents adding two remove patches for a widget.
	        if (!isWidget(a)) {
	            clearState(a, patch, index);
	            apply = patch[index];
	        }

	        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b));
	    } else if (isVNode(b)) {
	        if (isVNode(a)) {
	            if (a.tagName === b.tagName && a.namespace === b.namespace && a.key === b.key) {
	                var propsPatch = diffProps(a.properties, b.properties);
	                if (propsPatch) {
	                    apply = appendPatch(apply, new VPatch(VPatch.PROPS, a, propsPatch));
	                }
	                apply = diffChildren(a, b, patch, apply, index);
	            } else {
	                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
	                applyClear = true;
	            }
	        } else {
	            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
	            applyClear = true;
	        }
	    } else if (isVText(b)) {
	        if (!isVText(a)) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
	            applyClear = true;
	        } else if (a.text !== b.text) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
	        }
	    } else if (isWidget(b)) {
	        if (!isWidget(a)) {
	            applyClear = true;
	        }

	        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b));
	    }

	    if (apply) {
	        patch[index] = apply;
	    }

	    if (applyClear) {
	        clearState(a, patch, index);
	    }
	}

	function diffChildren(a, b, patch, apply, index) {
	    var aChildren = a.children;
	    var orderedSet = reorder(aChildren, b.children);
	    var bChildren = orderedSet.children;

	    var aLen = aChildren.length;
	    var bLen = bChildren.length;
	    var len = aLen > bLen ? aLen : bLen;

	    for (var i = 0; i < len; i++) {
	        var leftNode = aChildren[i];
	        var rightNode = bChildren[i];
	        index += 1;

	        if (!leftNode) {
	            if (rightNode) {
	                // Excess nodes in b need to be added
	                apply = appendPatch(apply, new VPatch(VPatch.INSERT, null, rightNode));
	            }
	        } else {
	            walk(leftNode, rightNode, patch, index);
	        }

	        if (isVNode(leftNode) && leftNode.count) {
	            index += leftNode.count;
	        }
	    }

	    if (orderedSet.moves) {
	        // Reorder nodes last
	        apply = appendPatch(apply, new VPatch(VPatch.ORDER, a, orderedSet.moves));
	    }

	    return apply;
	}

	function clearState(vNode, patch, index) {
	    // TODO: Make this a single walk, not two
	    unhook(vNode, patch, index);
	    destroyWidgets(vNode, patch, index);
	}

	// Patch records for all destroyed widgets must be added because we need
	// a DOM node reference for the destroy function
	function destroyWidgets(vNode, patch, index) {
	    if (isWidget(vNode)) {
	        if (typeof vNode.destroy === "function") {
	            patch[index] = appendPatch(patch[index], new VPatch(VPatch.REMOVE, vNode, null));
	        }
	    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
	        var children = vNode.children;
	        var len = children.length;
	        for (var i = 0; i < len; i++) {
	            var child = children[i];
	            index += 1;

	            destroyWidgets(child, patch, index);

	            if (isVNode(child) && child.count) {
	                index += child.count;
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index);
	    }
	}

	// Create a sub-patch for thunks
	function thunks(a, b, patch, index) {
	    var nodes = handleThunk(a, b);
	    var thunkPatch = diff(nodes.a, nodes.b);
	    if (hasPatches(thunkPatch)) {
	        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch);
	    }
	}

	function hasPatches(patch) {
	    for (var index in patch) {
	        if (index !== "a") {
	            return true;
	        }
	    }

	    return false;
	}

	// Execute hooks when two nodes are identical
	function unhook(vNode, patch, index) {
	    if (isVNode(vNode)) {
	        if (vNode.hooks) {
	            patch[index] = appendPatch(patch[index], new VPatch(VPatch.PROPS, vNode, undefinedKeys(vNode.hooks)));
	        }

	        if (vNode.descendantHooks || vNode.hasThunks) {
	            var children = vNode.children;
	            var len = children.length;
	            for (var i = 0; i < len; i++) {
	                var child = children[i];
	                index += 1;

	                unhook(child, patch, index);

	                if (isVNode(child) && child.count) {
	                    index += child.count;
	                }
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index);
	    }
	}

	function undefinedKeys(obj) {
	    var result = {};

	    for (var key in obj) {
	        result[key] = undefined;
	    }

	    return result;
	}

	// List diff, naive left to right reordering
	function reorder(aChildren, bChildren) {
	    // O(M) time, O(M) memory
	    var bChildIndex = keyIndex(bChildren);
	    var bKeys = bChildIndex.keys;
	    var bFree = bChildIndex.free;

	    if (bFree.length === bChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        };
	    }

	    // O(N) time, O(N) memory
	    var aChildIndex = keyIndex(aChildren);
	    var aKeys = aChildIndex.keys;
	    var aFree = aChildIndex.free;

	    if (aFree.length === aChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        };
	    }

	    // O(MAX(N, M)) memory
	    var newChildren = [];

	    var freeIndex = 0;
	    var freeCount = bFree.length;
	    var deletedItems = 0;

	    // Iterate through a and match a node in b
	    // O(N) time,
	    for (var i = 0; i < aChildren.length; i++) {
	        var aItem = aChildren[i];
	        var itemIndex;

	        if (aItem.key) {
	            if (bKeys.hasOwnProperty(aItem.key)) {
	                // Match up the old keys
	                itemIndex = bKeys[aItem.key];
	                newChildren.push(bChildren[itemIndex]);
	            } else {
	                // Remove old keyed items
	                itemIndex = i - deletedItems++;
	                newChildren.push(null);
	            }
	        } else {
	            // Match the item in a with the next free item in b
	            if (freeIndex < freeCount) {
	                itemIndex = bFree[freeIndex++];
	                newChildren.push(bChildren[itemIndex]);
	            } else {
	                // There are no free items in b to match with
	                // the free items in a, so the extra free nodes
	                // are deleted.
	                itemIndex = i - deletedItems++;
	                newChildren.push(null);
	            }
	        }
	    }

	    var lastFreeIndex = freeIndex >= bFree.length ? bChildren.length : bFree[freeIndex];

	    // Iterate through b and append any new keys
	    // O(M) time
	    for (var j = 0; j < bChildren.length; j++) {
	        var newItem = bChildren[j];

	        if (newItem.key) {
	            if (!aKeys.hasOwnProperty(newItem.key)) {
	                // Add any new keyed items
	                // We are adding new items to the end and then sorting them
	                // in place. In future we should insert new items in place.
	                newChildren.push(newItem);
	            }
	        } else if (j >= lastFreeIndex) {
	            // Add any leftover non-keyed items
	            newChildren.push(newItem);
	        }
	    }

	    var simulate = newChildren.slice();
	    var simulateIndex = 0;
	    var removes = [];
	    var inserts = [];
	    var simulateItem;

	    for (var k = 0; k < bChildren.length;) {
	        var wantedItem = bChildren[k];
	        simulateItem = simulate[simulateIndex];

	        // remove items
	        while (simulateItem === null && simulate.length) {
	            removes.push(remove(simulate, simulateIndex, null));
	            simulateItem = simulate[simulateIndex];
	        }

	        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	            // if we need a key in this position...
	            if (wantedItem.key) {
	                if (simulateItem && simulateItem.key) {
	                    // if an insert doesn't put this key in place, it needs to move
	                    if (bKeys[simulateItem.key] !== k + 1) {
	                        removes.push(remove(simulate, simulateIndex, simulateItem.key));
	                        simulateItem = simulate[simulateIndex];
	                        // if the remove didn't put the wanted item in place, we need to insert it
	                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	                            inserts.push({ key: wantedItem.key, to: k });
	                        }
	                        // items are matching, so skip ahead
	                        else {
	                                simulateIndex++;
	                            }
	                    } else {
	                        inserts.push({ key: wantedItem.key, to: k });
	                    }
	                } else {
	                    inserts.push({ key: wantedItem.key, to: k });
	                }
	                k++;
	            }
	            // a key in simulate has no matching wanted key, remove it
	            else if (simulateItem && simulateItem.key) {
	                    removes.push(remove(simulate, simulateIndex, simulateItem.key));
	                }
	        } else {
	            simulateIndex++;
	            k++;
	        }
	    }

	    // remove all the remaining nodes from simulate
	    while (simulateIndex < simulate.length) {
	        simulateItem = simulate[simulateIndex];
	        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key));
	    }

	    // If the only moves we have are deletes then we can just
	    // let the delete patch remove these items.
	    if (removes.length === deletedItems && !inserts.length) {
	        return {
	            children: newChildren,
	            moves: null
	        };
	    }

	    return {
	        children: newChildren,
	        moves: {
	            removes: removes,
	            inserts: inserts
	        }
	    };
	}

	function remove(arr, index, key) {
	    arr.splice(index, 1);

	    return {
	        from: index,
	        key: key
	    };
	}

	function keyIndex(children) {
	    var keys = {};
	    var free = [];
	    var length = children.length;

	    for (var i = 0; i < length; i++) {
	        var child = children[i];

	        if (child.key) {
	            keys[child.key] = i;
	        } else {
	            free.push(i);
	        }
	    }

	    return {
	        keys: keys, // A hash of key name to index
	        free: free // An array of unkeyed item indices
	    };
	}

	function appendPatch(apply, patch) {
	    if (apply) {
	        if (isArray(apply)) {
	            apply.push(patch);
	        } else {
	            apply = [apply, patch];
	        }

	        return apply;
	    } else {
	        return patch;
	    }
	}

/***/ },
/* 197 */
/***/ function(module, exports) {

	"use strict";

	var nativeIsArray = Array.isArray;
	var toString = Object.prototype.toString;

	module.exports = nativeIsArray || isArray;

	function isArray(obj) {
	    return toString.call(obj) === "[object Array]";
	}

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var version = __webpack_require__(190);

	VirtualPatch.NONE = 0;
	VirtualPatch.VTEXT = 1;
	VirtualPatch.VNODE = 2;
	VirtualPatch.WIDGET = 3;
	VirtualPatch.PROPS = 4;
	VirtualPatch.ORDER = 5;
	VirtualPatch.INSERT = 6;
	VirtualPatch.REMOVE = 7;
	VirtualPatch.THUNK = 8;

	module.exports = VirtualPatch;

	function VirtualPatch(type, vNode, patch) {
	    this.type = Number(type);
	    this.vNode = vNode;
	    this.patch = patch;
	}

	VirtualPatch.prototype.version = version;
	VirtualPatch.prototype.type = "VirtualPatch";

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isObject = __webpack_require__(187);
	var isHook = __webpack_require__(188);

	module.exports = diffProps;

	function diffProps(a, b) {
	    var diff;

	    for (var aKey in a) {
	        if (!(aKey in b)) {
	            diff = diff || {};
	            diff[aKey] = undefined;
	        }

	        var aValue = a[aKey];
	        var bValue = b[aKey];

	        if (aValue === bValue) {
	            continue;
	        } else if (isObject(aValue) && isObject(bValue)) {
	            if (getPrototype(bValue) !== getPrototype(aValue)) {
	                diff = diff || {};
	                diff[aKey] = bValue;
	            } else if (isHook(bValue)) {
	                diff = diff || {};
	                diff[aKey] = bValue;
	            } else {
	                var objectDiff = diffProps(aValue, bValue);
	                if (objectDiff) {
	                    diff = diff || {};
	                    diff[aKey] = objectDiff;
	                }
	            }
	        } else {
	            diff = diff || {};
	            diff[aKey] = bValue;
	        }
	    }

	    for (var bKey in b) {
	        if (!(bKey in a)) {
	            diff = diff || {};
	            diff[bKey] = b[bKey];
	        }
	    }

	    return diff;
	}

	function getPrototype(value) {
	    if (Object.getPrototypeOf) {
	        return Object.getPrototypeOf(value);
	    } else if (value.__proto__) {
	        return value.__proto__;
	    } else if (value.constructor) {
	        return value.constructor.prototype;
	    }
	}

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var h = __webpack_require__(201);

	module.exports = h;

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(197);

	var VNode = __webpack_require__(202);
	var VText = __webpack_require__(203);
	var isVNode = __webpack_require__(189);
	var isVText = __webpack_require__(191);
	var isWidget = __webpack_require__(192);
	var isHook = __webpack_require__(188);
	var isVThunk = __webpack_require__(194);

	var parseTag = __webpack_require__(204);
	var softSetHook = __webpack_require__(206);
	var evHook = __webpack_require__(207);

	module.exports = h;

	function h(tagName, properties, children) {
	    var childNodes = [];
	    var tag, props, key, namespace;

	    if (!children && isChildren(properties)) {
	        children = properties;
	        props = {};
	    }

	    props = props || properties || {};
	    tag = parseTag(tagName, props);

	    // support keys
	    if (props.hasOwnProperty('key')) {
	        key = props.key;
	        props.key = undefined;
	    }

	    // support namespace
	    if (props.hasOwnProperty('namespace')) {
	        namespace = props.namespace;
	        props.namespace = undefined;
	    }

	    // fix cursor bug
	    if (tag === 'INPUT' && !namespace && props.hasOwnProperty('value') && props.value !== undefined && !isHook(props.value)) {
	        props.value = softSetHook(props.value);
	    }

	    transformProperties(props);

	    if (children !== undefined && children !== null) {
	        addChild(children, childNodes, tag, props);
	    }

	    return new VNode(tag, props, childNodes, key, namespace);
	}

	function addChild(c, childNodes, tag, props) {
	    if (typeof c === 'string') {
	        childNodes.push(new VText(c));
	    } else if (typeof c === 'number') {
	        childNodes.push(new VText(String(c)));
	    } else if (isChild(c)) {
	        childNodes.push(c);
	    } else if (isArray(c)) {
	        for (var i = 0; i < c.length; i++) {
	            addChild(c[i], childNodes, tag, props);
	        }
	    } else if (c === null || c === undefined) {
	        return;
	    } else {
	        throw UnexpectedVirtualElement({
	            foreignObject: c,
	            parentVnode: {
	                tagName: tag,
	                properties: props
	            }
	        });
	    }
	}

	function transformProperties(props) {
	    for (var propName in props) {
	        if (props.hasOwnProperty(propName)) {
	            var value = props[propName];

	            if (isHook(value)) {
	                continue;
	            }

	            if (propName.substr(0, 3) === 'ev-') {
	                // add ev-foo support
	                props[propName] = evHook(value);
	            }
	        }
	    }
	}

	function isChild(x) {
	    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
	}

	function isChildren(x) {
	    return typeof x === 'string' || isArray(x) || isChild(x);
	}

	function UnexpectedVirtualElement(data) {
	    var err = new Error();

	    err.type = 'virtual-hyperscript.unexpected.virtual-element';
	    err.message = 'Unexpected virtual child passed to h().\n' + 'Expected a VNode / Vthunk / VWidget / string but:\n' + 'got:\n' + errorString(data.foreignObject) + '.\n' + 'The parent vnode is:\n' + errorString(data.parentVnode);
	    '\n' + 'Suggested fix: change your `h(..., [ ... ])` callsite.';
	    err.foreignObject = data.foreignObject;
	    err.parentVnode = data.parentVnode;

	    return err;
	}

	function errorString(obj) {
	    try {
	        return JSON.stringify(obj, null, '    ');
	    } catch (e) {
	        return String(obj);
	    }
	}

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var version = __webpack_require__(190);
	var isVNode = __webpack_require__(189);
	var isWidget = __webpack_require__(192);
	var isThunk = __webpack_require__(194);
	var isVHook = __webpack_require__(188);

	module.exports = VirtualNode;

	var noProperties = {};
	var noChildren = [];

	function VirtualNode(tagName, properties, children, key, namespace) {
	    this.tagName = tagName;
	    this.properties = properties || noProperties;
	    this.children = children || noChildren;
	    this.key = key != null ? String(key) : undefined;
	    this.namespace = typeof namespace === "string" ? namespace : null;

	    var count = children && children.length || 0;
	    var descendants = 0;
	    var hasWidgets = false;
	    var hasThunks = false;
	    var descendantHooks = false;
	    var hooks;

	    for (var propName in properties) {
	        if (properties.hasOwnProperty(propName)) {
	            var property = properties[propName];
	            if (isVHook(property) && property.unhook) {
	                if (!hooks) {
	                    hooks = {};
	                }

	                hooks[propName] = property;
	            }
	        }
	    }

	    for (var i = 0; i < count; i++) {
	        var child = children[i];
	        if (isVNode(child)) {
	            descendants += child.count || 0;

	            if (!hasWidgets && child.hasWidgets) {
	                hasWidgets = true;
	            }

	            if (!hasThunks && child.hasThunks) {
	                hasThunks = true;
	            }

	            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
	                descendantHooks = true;
	            }
	        } else if (!hasWidgets && isWidget(child)) {
	            if (typeof child.destroy === "function") {
	                hasWidgets = true;
	            }
	        } else if (!hasThunks && isThunk(child)) {
	            hasThunks = true;
	        }
	    }

	    this.count = count + descendants;
	    this.hasWidgets = hasWidgets;
	    this.hasThunks = hasThunks;
	    this.hooks = hooks;
	    this.descendantHooks = descendantHooks;
	}

	VirtualNode.prototype.version = version;
	VirtualNode.prototype.type = "VirtualNode";

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var version = __webpack_require__(190);

	module.exports = VirtualText;

	function VirtualText(text) {
	    this.text = String(text);
	}

	VirtualText.prototype.version = version;
	VirtualText.prototype.type = "VirtualText";

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var split = __webpack_require__(205);

	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;

	module.exports = parseTag;

	function parseTag(tag, props) {
	    if (!tag) {
	        return 'DIV';
	    }

	    var noId = !props.hasOwnProperty('id');

	    var tagParts = split(tag, classIdSplit);
	    var tagName = null;

	    if (notClassId.test(tagParts[1])) {
	        tagName = 'DIV';
	    }

	    var classes, part, type, i;

	    for (i = 0; i < tagParts.length; i++) {
	        part = tagParts[i];

	        if (!part) {
	            continue;
	        }

	        type = part.charAt(0);

	        if (!tagName) {
	            tagName = part;
	        } else if (type === '.') {
	            classes = classes || [];
	            classes.push(part.substring(1, part.length));
	        } else if (type === '#' && noId) {
	            props.id = part.substring(1, part.length);
	        }
	    }

	    if (classes) {
	        if (props.className) {
	            classes.push(props.className);
	        }

	        props.className = classes.join(' ');
	    }

	    return props.namespace ? tagName : tagName.toUpperCase();
	}

/***/ },
/* 205 */
/***/ function(module, exports) {

	"use strict";

	/*!
	 * Cross-Browser Split 1.1.1
	 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
	 * Available under the MIT License
	 * ECMAScript compliant, uniform cross-browser split method
	 */

	/**
	 * Splits a string into an array of strings using a regex or string separator. Matches of the
	 * separator are not included in the result array. However, if `separator` is a regex that contains
	 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
	 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
	 * cross-browser.
	 * @param {String} str String to split.
	 * @param {RegExp|String} separator Regex or string to use for separating the string.
	 * @param {Number} [limit] Maximum number of items to include in the result array.
	 * @returns {Array} Array of substrings.
	 * @example
	 *
	 * // Basic use
	 * split('a b c d', ' ');
	 * // -> ['a', 'b', 'c', 'd']
	 *
	 * // With limit
	 * split('a b c d', ' ', 2);
	 * // -> ['a', 'b']
	 *
	 * // Backreferences in result array
	 * split('..word1 word2..', /([a-z]+)(\d+)/i);
	 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
	 */
	module.exports = function split(undef) {

	  var nativeSplit = String.prototype.split,
	      compliantExecNpcg = /()??/.exec("")[1] === undef,

	  // NPCG: nonparticipating capturing group
	  self;

	  self = function self(str, separator, limit) {
	    // If `separator` is not a regex, use `nativeSplit`
	    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
	      return nativeSplit.call(str, separator, limit);
	    }
	    var output = [],
	        flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + ( // Proposed for ES6
	    separator.sticky ? "y" : ""),

	    // Firefox 3+
	    lastLastIndex = 0,

	    // Make `global` and avoid `lastIndex` issues by working with a copy
	    separator = new RegExp(separator.source, flags + "g"),
	        separator2,
	        match,
	        lastIndex,
	        lastLength;
	    str += ""; // Type-convert
	    if (!compliantExecNpcg) {
	      // Doesn't need flags gy, but they don't hurt
	      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
	    }
	    /* Values for `limit`, per the spec:
	     * If undefined: 4294967295 // Math.pow(2, 32) - 1
	     * If 0, Infinity, or NaN: 0
	     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	     * If other: Type-convert, then use the above rules
	     */
	    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
	    limit >>> 0; // ToUint32(limit)
	    while (match = separator.exec(str)) {
	      // `separator.lastIndex` is not reliable cross-browser
	      lastIndex = match.index + match[0].length;
	      if (lastIndex > lastLastIndex) {
	        output.push(str.slice(lastLastIndex, match.index));
	        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	        // nonparticipating capturing groups
	        if (!compliantExecNpcg && match.length > 1) {
	          match[0].replace(separator2, function () {
	            for (var i = 1; i < arguments.length - 2; i++) {
	              if (arguments[i] === undef) {
	                match[i] = undef;
	              }
	            }
	          });
	        }
	        if (match.length > 1 && match.index < str.length) {
	          Array.prototype.push.apply(output, match.slice(1));
	        }
	        lastLength = match[0].length;
	        lastLastIndex = lastIndex;
	        if (output.length >= limit) {
	          break;
	        }
	      }
	      if (separator.lastIndex === match.index) {
	        separator.lastIndex++; // Avoid an infinite loop
	      }
	    }
	    if (lastLastIndex === str.length) {
	      if (lastLength || !separator.test("")) {
	        output.push("");
	      }
	    } else {
	      output.push(str.slice(lastLastIndex));
	    }
	    return output.length > limit ? output.slice(0, limit) : output;
	  };

	  return self;
	}();

/***/ },
/* 206 */
/***/ function(module, exports) {

	'use strict';

	module.exports = SoftSetHook;

	function SoftSetHook(value) {
	    if (!(this instanceof SoftSetHook)) {
	        return new SoftSetHook(value);
	    }

	    this.value = value;
	}

	SoftSetHook.prototype.hook = function (node, propertyName) {
	    if (node[propertyName] !== this.value) {
	        node[propertyName] = this.value;
	    }
	};

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EvStore = __webpack_require__(208);

	module.exports = EvHook;

	function EvHook(value) {
	    if (!(this instanceof EvHook)) {
	        return new EvHook(value);
	    }

	    this.value = value;
	}

	EvHook.prototype.hook = function (node, propertyName) {
	    var es = EvStore(node);
	    var propName = propertyName.substr(3);

	    es[propName] = this.value;
	};

	EvHook.prototype.unhook = function (node, propertyName) {
	    var es = EvStore(node);
	    var propName = propertyName.substr(3);

	    es[propName] = undefined;
	};

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var OneVersionConstraint = __webpack_require__(209);

	var MY_VERSION = '7';
	OneVersionConstraint('ev-store', MY_VERSION);

	var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

	module.exports = EvStore;

	function EvStore(elem) {
	    var hash = elem[hashKey];

	    if (!hash) {
	        hash = elem[hashKey] = {};
	    }

	    return hash;
	}

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Individual = __webpack_require__(210);

	module.exports = OneVersion;

	function OneVersion(moduleName, version, defaultValue) {
	    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
	    var enforceKey = key + '_ENFORCE_SINGLETON';

	    var versionValue = Individual(enforceKey, version);

	    if (versionValue !== version) {
	        throw new Error('Can only have one copy of ' + moduleName + '.\n' + 'You already have version ' + versionValue + ' installed.\n' + 'This means you cannot install version ' + version);
	    }

	    return Individual(key, defaultValue);
	}

/***/ },
/* 210 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/*global window, global*/

	var root = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};

	module.exports = Individual;

	function Individual(key, value) {
	    if (key in root) {
	        return root[key];
	    }

	    root[key] = value;

	    return value;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!function () {
	  "use strict";
	  var E = __webpack_require__(173);!(__WEBPACK_AMD_DEFINE_RESULT__ = function (E) {
	    var N = function N(E, _N, U) {
	      Object.defineProperty(E, _N, { value: U, enumerable: !1, configurable: !1, writable: !1 });
	    },
	        U = {};return N(U, "BACKSPACE", 8), N(U, "TAB", 9), N(U, "NUM_CENTER", 12), N(U, "ENTER", 13), N(U, "RETURN", 13), N(U, "SHIFT", 16), N(U, "CTRL", 17), N(U, "ALT", 18), N(U, "PAUSE", 19), N(U, "CAPS_LOCK", 20), N(U, "ESC", 27), N(U, "SPACE", 32), N(U, "PAGE_UP", 33), N(U, "PAGE_DOWN", 34), N(U, "END", 35), N(U, "HOME", 36), N(U, "LEFT", 37), N(U, "UP", 38), N(U, "RIGHT", 39), N(U, "DOWN", 40), N(U, "PRINT_SCREEN", 44), N(U, "INSERT", 45), N(U, "DELETE", 46), N(U, "ZERO", 48), N(U, "ONE", 49), N(U, "TWO", 50), N(U, "THREE", 51), N(U, "FOUR", 52), N(U, "FIVE", 53), N(U, "SIX", 54), N(U, "SEVEN", 55), N(U, "EIGHT", 56), N(U, "NINE", 57), N(U, "A", 65), N(U, "B", 66), N(U, "C", 67), N(U, "D", 68), N(U, "E", 69), N(U, "F", 70), N(U, "G", 71), N(U, "H", 72), N(U, "I", 73), N(U, "J", 74), N(U, "K", 75), N(U, "L", 76), N(U, "M", 77), N(U, "N", 78), N(U, "O", 79), N(U, "P", 80), N(U, "Q", 81), N(U, "R", 82), N(U, "S", 83), N(U, "T", 84), N(U, "U", 85), N(U, "V", 86), N(U, "W", 87), N(U, "X", 88), N(U, "Y", 89), N(U, "Z", 90), N(U, "CONTEXT_MENU", 93), N(U, "NUM_ZERO", 96), N(U, "NUM_ONE", 97), N(U, "NUM_TWO", 98), N(U, "NUM_THREE", 99), N(U, "NUM_FOUR", 100), N(U, "NUM_FIVE", 101), N(U, "NUM_SIX", 102), N(U, "NUM_SEVEN", 103), N(U, "NUM_EIGHT", 104), N(U, "NUM_NINE", 105), N(U, "NUM_MULTIPLY", 106), N(U, "NUM_PLUS", 107), N(U, "NUM_MINUS", 109), N(U, "NUM_PERIOD", 110), N(U, "NUM_DIVISION", 111), N(U, "F1", 112), N(U, "F2", 113), N(U, "F3", 114), N(U, "F4", 115), N(U, "F5", 116), N(U, "F6", 117), N(U, "F7", 118), N(U, "F8", 119), N(U, "F9", 120), N(U, "F10", 121), N(U, "F11", 122), N(U, "F12", 123), U;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}();

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var patch = __webpack_require__(213);

	module.exports = patch;

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var document = __webpack_require__(184);
	var isArray = __webpack_require__(197);

	var render = __webpack_require__(183);
	var domIndex = __webpack_require__(214);
	var patchOp = __webpack_require__(215);
	module.exports = patch;

	function patch(rootNode, patches, renderOptions) {
	    renderOptions = renderOptions || {};
	    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch ? renderOptions.patch : patchRecursive;
	    renderOptions.render = renderOptions.render || render;

	    return renderOptions.patch(rootNode, patches, renderOptions);
	}

	function patchRecursive(rootNode, patches, renderOptions) {
	    var indices = patchIndices(patches);

	    if (indices.length === 0) {
	        return rootNode;
	    }

	    var index = domIndex(rootNode, patches.a, indices);
	    var ownerDocument = rootNode.ownerDocument;

	    if (!renderOptions.document && ownerDocument !== document) {
	        renderOptions.document = ownerDocument;
	    }

	    for (var i = 0; i < indices.length; i++) {
	        var nodeIndex = indices[i];
	        rootNode = applyPatch(rootNode, index[nodeIndex], patches[nodeIndex], renderOptions);
	    }

	    return rootNode;
	}

	function applyPatch(rootNode, domNode, patchList, renderOptions) {
	    if (!domNode) {
	        return rootNode;
	    }

	    var newNode;

	    if (isArray(patchList)) {
	        for (var i = 0; i < patchList.length; i++) {
	            newNode = patchOp(patchList[i], domNode, renderOptions);

	            if (domNode === rootNode) {
	                rootNode = newNode;
	            }
	        }
	    } else {
	        newNode = patchOp(patchList, domNode, renderOptions);

	        if (domNode === rootNode) {
	            rootNode = newNode;
	        }
	    }

	    return rootNode;
	}

	function patchIndices(patches) {
	    var indices = [];

	    for (var key in patches) {
	        if (key !== "a") {
	            indices.push(Number(key));
	        }
	    }

	    return indices;
	}

/***/ },
/* 214 */
/***/ function(module, exports) {

	"use strict";

	// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
	// We don't want to read all of the DOM nodes in the tree so we use
	// the in-order tree indexing to eliminate recursion down certain branches.
	// We only recurse into a DOM node if we know that it contains a child of
	// interest.

	var noChild = {};

	module.exports = domIndex;

	function domIndex(rootNode, tree, indices, nodes) {
	    if (!indices || indices.length === 0) {
	        return {};
	    } else {
	        indices.sort(ascending);
	        return recurse(rootNode, tree, indices, nodes, 0);
	    }
	}

	function recurse(rootNode, tree, indices, nodes, rootIndex) {
	    nodes = nodes || {};

	    if (rootNode) {
	        if (indexInRange(indices, rootIndex, rootIndex)) {
	            nodes[rootIndex] = rootNode;
	        }

	        var vChildren = tree.children;

	        if (vChildren) {

	            var childNodes = rootNode.childNodes;

	            for (var i = 0; i < tree.children.length; i++) {
	                rootIndex += 1;

	                var vChild = vChildren[i] || noChild;
	                var nextIndex = rootIndex + (vChild.count || 0);

	                // skip recursion down the tree if there are no nodes down here
	                if (indexInRange(indices, rootIndex, nextIndex)) {
	                    recurse(childNodes[i], vChild, indices, nodes, rootIndex);
	                }

	                rootIndex = nextIndex;
	            }
	        }
	    }

	    return nodes;
	}

	// Binary search for an index in the interval [left, right]
	function indexInRange(indices, left, right) {
	    if (indices.length === 0) {
	        return false;
	    }

	    var minIndex = 0;
	    var maxIndex = indices.length - 1;
	    var currentIndex;
	    var currentItem;

	    while (minIndex <= maxIndex) {
	        currentIndex = (maxIndex + minIndex) / 2 >> 0;
	        currentItem = indices[currentIndex];

	        if (minIndex === maxIndex) {
	            return currentItem >= left && currentItem <= right;
	        } else if (currentItem < left) {
	            minIndex = currentIndex + 1;
	        } else if (currentItem > right) {
	            maxIndex = currentIndex - 1;
	        } else {
	            return true;
	        }
	    }

	    return false;
	}

	function ascending(a, b) {
	    return a > b ? 1 : -1;
	}

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var applyProperties = __webpack_require__(186);

	var isWidget = __webpack_require__(192);
	var VPatch = __webpack_require__(198);

	var updateWidget = __webpack_require__(216);

	module.exports = applyPatch;

	function applyPatch(vpatch, domNode, renderOptions) {
	    var type = vpatch.type;
	    var vNode = vpatch.vNode;
	    var patch = vpatch.patch;

	    switch (type) {
	        case VPatch.REMOVE:
	            return removeNode(domNode, vNode);
	        case VPatch.INSERT:
	            return insertNode(domNode, patch, renderOptions);
	        case VPatch.VTEXT:
	            return stringPatch(domNode, vNode, patch, renderOptions);
	        case VPatch.WIDGET:
	            return widgetPatch(domNode, vNode, patch, renderOptions);
	        case VPatch.VNODE:
	            return vNodePatch(domNode, vNode, patch, renderOptions);
	        case VPatch.ORDER:
	            reorderChildren(domNode, patch);
	            return domNode;
	        case VPatch.PROPS:
	            applyProperties(domNode, patch, vNode.properties);
	            return domNode;
	        case VPatch.THUNK:
	            return replaceRoot(domNode, renderOptions.patch(domNode, patch, renderOptions));
	        default:
	            return domNode;
	    }
	}

	function removeNode(domNode, vNode) {
	    var parentNode = domNode.parentNode;

	    if (parentNode) {
	        parentNode.removeChild(domNode);
	    }

	    destroyWidget(domNode, vNode);

	    return null;
	}

	function insertNode(parentNode, vNode, renderOptions) {
	    var newNode = renderOptions.render(vNode, renderOptions);

	    if (parentNode) {
	        parentNode.appendChild(newNode);
	    }

	    return parentNode;
	}

	function stringPatch(domNode, leftVNode, vText, renderOptions) {
	    var newNode;

	    if (domNode.nodeType === 3) {
	        domNode.replaceData(0, domNode.length, vText.text);
	        newNode = domNode;
	    } else {
	        var parentNode = domNode.parentNode;
	        newNode = renderOptions.render(vText, renderOptions);

	        if (parentNode && newNode !== domNode) {
	            parentNode.replaceChild(newNode, domNode);
	        }
	    }

	    return newNode;
	}

	function widgetPatch(domNode, leftVNode, widget, renderOptions) {
	    var updating = updateWidget(leftVNode, widget);
	    var newNode;

	    if (updating) {
	        newNode = widget.update(leftVNode, domNode) || domNode;
	    } else {
	        newNode = renderOptions.render(widget, renderOptions);
	    }

	    var parentNode = domNode.parentNode;

	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode);
	    }

	    if (!updating) {
	        destroyWidget(domNode, leftVNode);
	    }

	    return newNode;
	}

	function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
	    var parentNode = domNode.parentNode;
	    var newNode = renderOptions.render(vNode, renderOptions);

	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode);
	    }

	    return newNode;
	}

	function destroyWidget(domNode, w) {
	    if (typeof w.destroy === "function" && isWidget(w)) {
	        w.destroy(domNode);
	    }
	}

	function reorderChildren(domNode, moves) {
	    var childNodes = domNode.childNodes;
	    var keyMap = {};
	    var node;
	    var remove;
	    var insert;

	    for (var i = 0; i < moves.removes.length; i++) {
	        remove = moves.removes[i];
	        node = childNodes[remove.from];
	        if (remove.key) {
	            keyMap[remove.key] = node;
	        }
	        domNode.removeChild(node);
	    }

	    var length = childNodes.length;
	    for (var j = 0; j < moves.inserts.length; j++) {
	        insert = moves.inserts[j];
	        node = keyMap[insert.key];
	        // this is the weirdest bug i've ever seen in webkit
	        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
	    }
	}

	function replaceRoot(oldRoot, newRoot) {
	    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
	        oldRoot.parentNode.replaceChild(newRoot, oldRoot);
	    }

	    return newRoot;
	}

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isWidget = __webpack_require__(192);

	module.exports = updateWidget;

	function updateWidget(a, b) {
	    if (isWidget(a) && isWidget(b)) {
	        if ("name" in a && "name" in b) {
	            return a.id === b.id;
	        } else {
	            return a.init === b.init;
	        }
	    }

	    return false;
	}

/***/ },
/* 217 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Used for caching VNodes.
	 *
	 * If a given state fails comparison with the previous state,
	 * the node will be created via the provided rendering method.
	 *
	 * @param {object} state State object.
	 * @param {function} cmpFn Comparison function.
	 * @param {function} renderFn Rendering function. Must return a VNode.
	 * @return {VNode} New or cached node.
	 */

	var VCache = function VCache(state, cmpFn, renderFn) {
	    this.renderFn = renderFn;
	    this.cmpFn = cmpFn;
	    this.state = state;
	};

	VCache.prototype.type = 'Thunk';

	VCache.prototype.render = function (previous) {
	    // The first time the Thunk renders, there will be no previous state
	    var previousState = previous ? previous.state : null;

	    // We run the comparison function to see if the state has changed enough
	    // for us to re-render. If it returns truthy, then we call the render
	    // function to give us a new VNode
	    if (!previousState || !this.state || this.cmpFn(previousState, this.state)) {
	        return this.renderFn(previous, this);
	    } else {
	        // vnode will be set automatically when a thunk has been created
	        // it contains the VNode, VText, Thunk, or Widget generated by
	        // our render function.
	        return previous.vnode;
	    }
	};

	module.exports = VCache;

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _find2 = __webpack_require__(127);

	var _find3 = _interopRequireDefault(_find2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Returns whether or not a state is marked as dirty in
	 * any object inside the given currentState.nodes collection.
	 *
	 * @private
	 * @category DOM
	 * @param {object} previousState Previous state.
	 * @param {object} currentState  Current state.
	 * @return {boolean} Any state is dirty.
	 */
	module.exports = function VDirtyCompare(previousState, currentState) {
	    var diff = false;

	    if (previousState.nodeCount !== currentState.nodeCount) {
	        diff = true;
	    } else {
	        diff = (0, _find3.default)(currentState.nodes, 'itree.dirty', true);
	    }

	    return diff;
	};

/***/ },
/* 219 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Returns whether or not a state is marked as dirty.
	 *
	 * @private
	 * @category DOM
	 * @param {object} previousState Previous state.
	 * @param {object} currentState  Current state.
	 * @return {boolean} State is dirty.
	 */

	module.exports = function VDirtyCompare(previousState, currentState) {
	  return currentState.dirty;
	};

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _each2 = __webpack_require__(158);

	var _each3 = _interopRequireDefault(_each2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Compares all keys on the given state. Returns true if any difference exists.
	 *
	 * @private
	 * @category DOM
	 * @param {object} previousState Previous state.
	 * @param {object} currentState  Current state.
	 * @return {boolean} Difference was found.
	 */
	module.exports = function VStateCompare(previousState, currentState) {
	    var isDirty = false;

	    (0, _each3.default)(currentState, function (val, key) {
	        if (val !== previousState[key]) {
	            isDirty = true;
	            return false;
	        }
	    });

	    return isDirty;
	};

/***/ }
/******/ ])
});
;