/*!
 * Inspire Tree v1.7.0
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

	var _difference2 = __webpack_require__(1);

	var _difference3 = _interopRequireDefault(_difference2);

	var _isRegExp2 = __webpack_require__(65);

	var _isRegExp3 = _interopRequireDefault(_isRegExp2);

	var _isEmpty2 = __webpack_require__(66);

	var _isEmpty3 = _interopRequireDefault(_isEmpty2);

	var _tail2 = __webpack_require__(84);

	var _tail3 = _interopRequireDefault(_tail2);

	var _head2 = __webpack_require__(87);

	var _head3 = _interopRequireDefault(_head2);

	var _transform2 = __webpack_require__(88);

	var _transform3 = _interopRequireDefault(_transform2);

	var _assign2 = __webpack_require__(133);

	var _assign3 = _interopRequireDefault(_assign2);

	var _isString2 = __webpack_require__(75);

	var _isString3 = _interopRequireDefault(_isString2);

	var _castArray2 = __webpack_require__(138);

	var _castArray3 = _interopRequireDefault(_castArray2);

	var _sortBy2 = __webpack_require__(139);

	var _sortBy3 = _interopRequireDefault(_sortBy2);

	var _map2 = __webpack_require__(148);

	var _map3 = _interopRequireDefault(_map2);

	var _isNumber2 = __webpack_require__(149);

	var _isNumber3 = _interopRequireDefault(_isNumber2);

	var _sortedIndexBy2 = __webpack_require__(150);

	var _sortedIndexBy3 = _interopRequireDefault(_sortedIndexBy2);

	var _remove2 = __webpack_require__(152);

	var _remove3 = _interopRequireDefault(_remove2);

	var _slice2 = __webpack_require__(156);

	var _slice3 = _interopRequireDefault(_slice2);

	var _findIndex2 = __webpack_require__(157);

	var _findIndex3 = _interopRequireDefault(_findIndex2);

	var _find2 = __webpack_require__(159);

	var _find3 = _interopRequireDefault(_find2);

	var _findLast2 = __webpack_require__(162);

	var _findLast3 = _interopRequireDefault(_findLast2);

	var _indexOf2 = __webpack_require__(164);

	var _indexOf3 = _interopRequireDefault(_indexOf2);

	var _isArrayLike2 = __webpack_require__(53);

	var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

	var _cloneDeep2 = __webpack_require__(165);

	var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

	var _each2 = __webpack_require__(188);

	var _each3 = _interopRequireDefault(_each2);

	var _defaults2 = __webpack_require__(190);

	var _defaults3 = _interopRequireDefault(_defaults2);

	var _isObject2 = __webpack_require__(12);

	var _isObject3 = _interopRequireDefault(_isObject2);

	var _get2 = __webpack_require__(118);

	var _get3 = _interopRequireDefault(_get2);

	var _isFunction2 = __webpack_require__(11);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _isArray2 = __webpack_require__(58);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _isBoolean2 = __webpack_require__(197);

	var _isBoolean3 = _interopRequireDefault(_isBoolean2);

	var _defaultsDeep2 = __webpack_require__(198);

	var _defaultsDeep3 = _interopRequireDefault(_defaultsDeep2);

	var _cuid = __webpack_require__(206);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _eventemitter = __webpack_require__(207);

	var _eventemitter2 = _interopRequireDefault(_eventemitter);

	var _es6Promise = __webpack_require__(208);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// CSS
	__webpack_require__(212);

	function InspireTree(opts) {
	    var initialized = false;
	    var noop = function noop() {};
	    var tree = this;
	    var lastSelectedNode;
	    var muted = false;
	    var preventDeselection = false;

	    if (!opts.data) {
	        throw new TypeError('Invalid data loader.');
	    }

	    // Assign defaults
	    tree.config = (0, _defaultsDeep3.default)({}, opts, {
	        allowLoadEvents: [],
	        contextMenu: false,
	        dragTargets: false,
	        nodes: {
	            resetStateOnRestore: true
	        },
	        renderer: false,
	        search: false,
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
	        sort: false,
	        tabindex: -1
	    });

	    // If checkbox mode, we must force auto-selecting children
	    if (tree.config.selection.mode === 'checkbox') {
	        tree.config.selection.autoSelectChildren = true;
	        tree.config.selection.autoDeselect = false;

	        if (!(0, _isBoolean3.default)(opts.showCheckboxes)) {
	            tree.config.showCheckboxes = true;
	        }
	    }

	    // If auto-selecting children, we must force multiselect
	    if (tree.config.selection.autoSelectChildren) {
	        tree.config.selection.multiple = true;
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

	    // Override emitter so we can better control flow
	    var emit = tree.emit;
	    tree.emit = function () {
	        if (!muted) {
	            // Duck-type for a DOM event
	            if ((0, _isFunction3.default)((0, _get3.default)(arguments, '[1].preventDefault'))) {
	                var event = arguments[1];
	                event.treeDefaultPrevented = false;
	                event.preventTreeDefault = function () {
	                    event.treeDefaultPrevented = true;
	                };
	            }

	            emit.apply(tree, arguments);
	        }
	    };

	    // Webpack has a DOM boolean that when false,
	    // allows us to exclude this library from our build.
	    // For those doing their own rendering, it's useless.
	    if (false) {
	        dom = new (require('./dom'))(tree);
	    }

	    // Validation
	    if (dom && (!(0, _isObject3.default)(opts) || !opts.target)) {
	        throw new TypeError('Property "target" is required, either an element or a selector.');
	    }

	    // Load custom/empty renderer
	    if (!dom) {
	        var renderer = (0, _isFunction3.default)(tree.config.renderer) ? tree.config.renderer(tree) : {};
	        dom = (0, _defaults3.default)(renderer, {
	            applyChanges: noop,
	            attach: noop,
	            batch: noop,
	            end: noop
	        });
	    }

	    /**
	     * Represents a singe node object within the tree.
	     *
	     * @category TreeNode
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
	        if ((0, _isArray3.default)(this.children) || !(0, _isArrayLike3.default)(this.children)) {
	            this.children = new TreeNodes();
	            this.children._context = this;
	        }

	        return this.children.addNode(child);
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
	            var clone = (0, _cloneDeep3.default)(node);
	            delete clone.itree.parent;
	            delete clone.children;

	            nodes.push(clone);
	        });

	        parents = nodes.reverse();

	        if (!excludeNode) {
	            var clone = (0, _cloneDeep3.default)(node);

	            // Filter out hidden children
	            if (node.hasChildren()) {
	                clone.children = node.children.filter(function (n) {
	                    return !n.itree.state.hidden;
	                }).clone();

	                clone.children._context = clone;
	            }

	            nodes.push(clone);
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
	     * If selection.require is true and this is the last selected
	     * node, the node will remain in a selected state.
	     *
	     * @category TreeNode
	     * @param {boolean} skipParentIndeterminate Skip refreshing parent indeterminate states.
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.deselect = function (skipParentIndeterminate) {
	        if (this.selected() && (!tree.config.selection.require || tree.selected().length > 1)) {
	            var node = this;
	            dom.batch();

	            node.itree.state.indeterminate = false;
	            baseStateChange('selected', false, 'deselected', this);

	            // If children were auto-selected
	            if (tree.config.selection.autoSelectChildren) {
	                // Deselect all children
	                if (node.hasChildren()) {
	                    node.children.each(function (child) {
	                        child.deselect(true);
	                    });
	                }

	                if (node.hasParent()) {
	                    // Set indeterminate state for parent
	                    if (tree.config.showCheckboxes && !skipParentIndeterminate) {
	                        node.getParent().refreshIndeterminateState();
	                    } else {
	                        // Deselect parent node
	                        baseStateChange('selected', false, 'deselected', node.getParent());
	                    }
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
	     * Get if node expanded.
	     *
	     * @category TreeNode
	     * @return {boolean} If expanded.
	     */
	    TreeNode.prototype.expanded = function () {
	        return !this.collapsed();
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
	        var clone = (0, _cloneDeep3.default)(this);
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
	            tree.blurDeep();
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
	            hasVisibleChildren = this.children.filter('available').length > 0;
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
	     * Get if node is indeterminately selected.
	     *
	     * @category TreeNode
	     * @return {boolean} If indeterminately selected.
	     */
	    TreeNode.prototype.indeterminate = function () {
	        return this.itree.state.indeterminate;
	    };

	    /**
	     * Returns a "path" of indices, values which map this node's location within all parent contexts.
	     *
	     * @category TreeNode
	     * @return {string} Index path
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

	            var complete = function complete(results) {
	                dom.batch();
	                node.itree.state.loading = false;
	                node.children = collectionToModel(results, node);
	                node.markDirty();
	                dom.end();

	                resolve(node.children);

	                tree.emit('children.loaded', node);
	            };

	            var error = function error(err) {
	                node.itree.state.loading = false;
	                node.children = new TreeNodes();
	                node.children._context = node;
	                node.markDirty();
	                dom.applyChanges();

	                reject(err);

	                tree.emit('tree.loaderror', err);
	            };

	            var loader = tree.config.data(node, complete, error);

	            // Data loader is likely a promise
	            if ((0, _isObject3.default)(loader)) {
	                standardizePromise(loader).then(complete).catch(error);
	            }
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
	        var oldValue = node.itree.state.indeterminate;
	        node.itree.state.indeterminate = false;

	        if (tree.config.showCheckboxes) {
	            if (node.hasChildren()) {
	                var childrenCount = node.children.length;
	                var indeterminate = 0;
	                var selected = 0;

	                node.children.each(function (n) {
	                    if (n.selected()) {
	                        selected++;
	                    }

	                    if (n.indeterminate()) {
	                        indeterminate++;
	                    }
	                });

	                // Set selected if all children are
	                node.itree.state.selected = selected === childrenCount;

	                // Set indeterminate if any children are, or some children are selected
	                if (!node.selected()) {
	                    node.itree.state.indeterminate = indeterminate > 0 || childrenCount > 0 && selected > 0 && selected < childrenCount;
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
	     * @return {object} Removed tree node object.
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

	        var exported = node.export();
	        tree.emit('node.removed', exported);

	        dom.applyChanges();

	        return exported;
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

	            if (tree.canAutoDeselect()) {
	                var oldVal = tree.config.selection.require;
	                tree.config.selection.require = false;
	                tree.deselectDeep();
	                tree.config.selection.require = oldVal;
	            }

	            node.itree.state.selected = true;

	            if (tree.config.selection.autoSelectChildren) {
	                if (node.hasChildren()) {
	                    node.children.recurseDown(function (child) {
	                        baseStateChange('selected', true, 'selected', child);
	                    });
	                }

	                if (tree.config.showCheckboxes && node.hasParent()) {
	                    node.getParent().refreshIndeterminateState();
	                }
	            }

	            // Cache as the last selected node
	            lastSelectedNode = node;

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
	        var allow = tree.config.selection.allow(this);
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
	     * Adds a new node to this collection. If a sort
	     * method is configured, the node will be added
	     * in the appropriate order.
	     *
	     * @category TreeNodes
	     * @param {object} object Node
	     * @return {TreeNode} Node object.
	     */
	    TreeNodes.prototype.addNode = function (object) {
	        // Base insertion index
	        var index = this.length;

	        // If tree is sorted, insert in correct position
	        if (tree.config.sort) {
	            index = (0, _sortedIndexBy3.default)(this, object, tree.config.sort);
	        }

	        return this.insertAt(index, object);
	    };

	    /**
	     * Clones (deep) the array of nodes.
	     *
	     * Note: Cloning will *not* clone the context pointer.
	     *
	     * @category TreeNodes
	     * @return {TreeNodes} Array of cloned nodes.
	     */
	    TreeNodes.prototype.clone = function () {
	        var newNodes = new TreeNodes();

	        (0, _each3.default)(this, function (node) {
	            newNodes.push(node.clone());
	        });

	        return newNodes;
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
	        newNodes._context = this._context;

	        var pusher = function pusher(node) {
	            newNodes.push(node);
	        };

	        (0, _each3.default)(this, pusher);
	        (0, _each3.default)(nodes, pusher);

	        return newNodes;
	    };

	    /**
	     * Get the context of this collection. If a collection
	     * of children, context is the parent node. Otherwise
	     * the context is the tree itself.
	     *
	     * @category TreeNodes
	     * @return {TreeNode|object} Node object or tree instance.
	     */
	    TreeNodes.prototype.context = function () {
	        return this._context || tree;
	    };

	    /**
	     * Copies nodes to a new tree instance.
	     *
	     * @category TreeNodes
	     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
	     * @return {object} Methods to perform action on copied nodes.
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
	     * Returns deepest nodes from this array.
	     *
	     * @category TreeNodes
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
	     * Iterate every TreeNode in this collection.
	     *
	     * @category TreeNodes
	     * @param {function} iteratee Iteratee invoke for each node.
	     * @return {TreeNodes} Array of node objects.
	     */
	    TreeNodes.prototype.each = function (iteratee) {
	        (0, _each3.default)(this, iteratee);

	        return this;
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
	            matches.addNode(node.copyHierarchy());
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
	     * Insert a new node at a given position.
	     *
	     * @category TreeNodes
	     * @param {integer} index Index at which to insert the node.
	     * @param {object} object Raw node object or TreeNode.
	     * @return {TreeNode} Node object.
	     */
	    TreeNodes.prototype.insertAt = function (index, object) {
	        // If node has a pre-existing ID
	        if (object.id) {
	            // Is it already in the tree?
	            var existingNode = this.node(object.id);
	            if (existingNode) {
	                existingNode.restore().show();

	                // Merge children
	                if ((0, _isArrayLike3.default)(object.children)) {
	                    // Setup existing node's children property if needed
	                    if (!(0, _isArrayLike3.default)(existingNode.children)) {
	                        existingNode.children = new TreeNodes();
	                        existingNode.children._context = existing;
	                    }

	                    // Copy each child (using addNode, which uses insertAt)
	                    (0, _each3.default)(object.children, function (child) {
	                        existingNode.children.addNode(child);
	                    });
	                }

	                // Merge truthy children
	                else if (object.children && (0, _isBoolean3.default)(existingNode.children)) {
	                        existingNode.children = object.children;
	                    }

	                existingNode.markDirty();
	                dom.applyChanges();

	                // Node merged, return it.
	                return existingNode;
	            }
	        }

	        // Node is new, insert at given location.
	        var node = tree.isNode(object) ? object : objectToModel(object);

	        // Insert
	        this.splice(index, 0, node);

	        // Refresh parent state and mark dirty
	        if (this._context) {
	            node.itree.parent = this._context;
	            this._context.refreshIndeterminateState().markDirty();
	        }

	        // Event
	        tree.emit('node.added', node);

	        node.markDirty();
	        dom.applyChanges();

	        return node;
	    };

	    /**
	     * Invoke method(s) on each node.
	     *
	     * @category TreeNodes
	     * @param {string|array} methods Method name(s).
	     * @return {TreeNodes} Array of node objects.
	     */
	    TreeNodes.prototype.invoke = function (methods) {
	        return baseInvoke(this, methods);
	    };

	    /**
	     * Invoke method(s) deeply.
	     *
	     * @category TreeNodes
	     * @param {string|array} methods Method name(s).
	     * @return {TreeNodes} Array of node objects.
	     */
	    TreeNodes.prototype.invokeDeep = function (methods) {
	        return baseInvoke(this, methods, true);
	    };

	    /**
	     * Get a node.
	     *
	     * @category TreeNodes
	     * @param {string|number} id ID of node.
	     * @return {TreeNode} Node object.
	     */
	    TreeNodes.prototype.node = function (id) {
	        var match;

	        if ((0, _isNumber3.default)(id)) {
	            id = id.toString();
	        }

	        this.recurseDown(function (node) {
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
	    TreeNodes.prototype.nodes = function (refs) {
	        var results = this;

	        if ((0, _isArray3.default)(refs)) {
	            // Ensure incoming IDs are strings
	            refs = (0, _map3.default)(refs, function (element) {
	                if ((0, _isNumber3.default)(element)) {
	                    element = element.toString();
	                }

	                return element;
	            });

	            results = new TreeNodes();

	            this.recurseDown(function (node) {
	                if (refs.indexOf(node.id) > -1) {
	                    results.push(node);
	                }
	            });
	        }

	        return results;
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
	        sorter = sorter || tree.config.sort;

	        // Only apply sort if one provided
	        if (sorter) {
	            var sorted = (0, _sortBy3.default)(nodes, sorter);

	            nodes.length = 0;
	            (0, _each3.default)(sorted, function (node) {
	                nodes.push(node);
	            });
	        }

	        return nodes;
	    };

	    /**
	     * Chained method for returning a chain to the tree context.
	     *
	     * @category TreeNodes
	     * @return {[type]} [description]
	     */
	    TreeNodes.prototype.tree = function () {
	        return tree;
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
	            return this.invoke(method);
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
	            return this.invokeDeep(method);
	        };
	    }

	    // Methods we can map to each/deeply TreeNode
	    var mapped = ['blur', 'collapse', 'deselect', 'hide', 'restore', 'select', 'setSelectable', 'show'];
	    (0, _each3.default)(mapped, function (method) {
	        mapToEach(method);
	        mapToEachDeeply(method);
	    });

	    // Methods we can map to each TreeNode
	    (0, _each3.default)(['clean', 'expand', 'expandParents', 'softRemove'], mapToEach);

	    // Predicate methods we can map
	    (0, _each3.default)(['available', 'collapsed', 'expanded', 'focused', 'hidden', 'removed', 'selectable', 'selected', 'visible'], function (state) {
	        TreeNodes.prototype[state] = function (full) {
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
	        };
	    });

	    /**
	     * Invoke given method(s) on tree nodes.
	     *
	     * @private
	     * @param {TreeNodes} nodes Array of node objects.
	     * @param {string|array} methods Method names.
	     * @param {boolean} deep Invoke deeply.
	     * @return {TreeNodes} Array of node objects.
	     */
	    function baseInvoke(nodes, methods, deep) {
	        methods = (0, _castArray3.default)(methods);

	        dom.batch();

	        nodes[deep ? 'recurseDown' : 'each'](function (node) {
	            (0, _each3.default)(methods, function (method) {
	                if ((0, _isFunction3.default)(node[method])) {
	                    node[method]();
	                }
	            });
	        });

	        dom.end();

	        return nodes;
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
	        if (node.itree.state[prop] !== value) {
	            if (tree.config.nodes.resetStateOnRestore && verb === 'restored') {
	                resetState(node);
	            }

	            node.itree.state[prop] = value;

	            tree.emit('node.' + verb, node);

	            if (deep && node.hasChildren()) {
	                node.getChildren().invokeDeep(deep);
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

	        collection._context = parent;

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
	        if ((0, _isString3.default)(predicate)) {
	            fn = function fn(node) {
	                return (0, _isFunction3.default)(node[predicate]) ? node[predicate]() : node[predicate];
	            };
	        }

	        return fn;
	    }

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

	    /**
	     * Resolve promise-like objects consistently.
	     *
	     * @private
	     * @param {object} promise Promise-like object.
	     * @returns {Promise} Promise
	     */
	    function standardizePromise(promise) {
	        return new _es6Promise.Promise(function (resolve, reject) {
	            if (!(0, _isObject3.default)(promise)) {
	                return reject(new Error('Invalid Promise'));
	            }

	            if ((0, _isFunction3.default)(promise.then)) {
	                promise.then(resolve);
	            }

	            // jQuery promises use "error"
	            if ((0, _isFunction3.default)(promise.error)) {
	                promise.error(reject);
	            } else if ((0, _isFunction3.default)(promise.catch)) {
	                promise.catch(reject);
	            }
	        });
	    };

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
	     * Get if the tree will auto-deselect currently selected nodes
	     * when a new selection is made.
	     *
	     * @category Tree
	     * @return {boolean} If tree will auto-deselect nodes.
	     */
	    tree.canAutoDeselect = function () {
	        return tree.config.selection.autoDeselect && !preventDeselection;
	    };

	    /**
	     * Shows all nodes and collapses parents.
	     *
	     * @category Tree
	     * @return {Tree} Tree instance.
	     */
	    tree.clearSearch = function () {
	        return tree.showDeep().collapseDeep().tree();
	    };

	    /**
	     * Disable auto-deselection of currently selected nodes.
	     *
	     * @category Tree
	     * @return {Tree} Tree instance.
	     */
	    tree.disableDeselection = function () {
	        if (tree.config.selection.multiple) {
	            preventDeselection = true;
	        }

	        return tree;
	    };

	    /**
	     * Enable auto-deselection of currently selected nodes.
	     *
	     * @category Tree
	     * @return {Tree} Tree instance.
	     */
	    tree.enableDeselection = function () {
	        preventDeselection = false;

	        return tree;
	    };

	    /**
	     * Check if an object is a TreeNode.
	     *
	     * @category Tree
	     * @param {object} object Object
	     * @return {boolean} If object is a TreeNode.
	     */
	    tree.isNode = function (object) {
	        if (object.constructor) {
	            return object.constructor.name === 'TreeNode';
	        }

	        return false;
	    };

	    /**
	     * Get the most recently selected node, if any.
	     *
	     * @category Tree
	     * @return {TreeNode} Last selected node, or undefined.
	     */
	    tree.lastSelectedNode = function () {
	        return lastSelectedNode;
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

	                if (tree.config.selection.require && !tree.selected().length) {
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
	                    var resp = loader(null, complete, error);

	                    // Loader returned its own object
	                    if (resp) {
	                        loader = resp;
	                    }
	                }

	            // Data loader is likely a promise
	            if ((0, _isObject3.default)(loader)) {
	                standardizePromise(loader).then(complete).catch(error);
	            } else {
	                throw new Error('Invalid data loader.');
	            }
	        });
	    };

	    /*
	     * Pause events.
	     *
	     * @category Tree
	     * @param {array} events Event names to mute.
	     * @return {Tree} Tree instance.
	     */
	    tree.mute = function (events) {
	        if ((0, _isString3.default)(events) || (0, _isArray3.default)(events)) {
	            muted = (0, _castArray3.default)(events);
	        } else {
	            muted = true;
	        }

	        return tree;
	    };

	    /**
	     * Get current mute settings.
	     *
	     * @category Tree
	     * @return {boolean|array} Muted events. If all, true.
	     */
	    tree.muted = function () {
	        return muted;
	    };

	    /**
	     * Reloads/re-executes the original data loader.
	     *
	     * @category Tree
	     * @return {Promise} Load method promise.
	     */
	    tree.reload = function () {
	        return tree.load(opts.data || tree.config.data);
	    };

	    /**
	     * Removes all nodes.
	     *
	     * @category Tree
	     * @return {Tree} Tree instance.
	     */
	    tree.removeAll = function () {
	        model = new TreeNodes();
	        dom.applyChanges();

	        return tree;
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

	                tree.hideDeep();
	                (0, _each3.default)(nodes, function (node) {
	                    tree.addNode(node);
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
	            if (!node.removed()) {
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
	     * @return {Tree} Tree instance.
	     */
	    tree.selectBetween = function (startNode, endNode) {
	        dom.batch();

	        var node = startNode.nextVisibleNode();
	        while (node) {
	            if (node.id === endNode.id) {
	                break;
	            }

	            node.select();

	            node = node.nextVisibleNode();
	        }

	        dom.end();

	        return tree;
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

	    /**
	     * Resume events.
	     *
	     * @category Tree
	     * @param {array} events Events to unmute.
	     * @return {Tree} Tree instance.
	     */
	    tree.unmute = function (events) {
	        // Diff array and set to false if we're now empty
	        if ((0, _isString3.default)(events) || (0, _isArray3.default)(events)) {
	            muted = (0, _difference3.default)(muted, (0, _castArray3.default)(events));
	            if (!muted.length) {
	                muted = false;
	            }
	        } else {
	            muted = false;
	        }

	        return tree;
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

	var baseDifference = __webpack_require__(2),
	    baseFlatten = __webpack_require__(48),
	    isArrayLikeObject = __webpack_require__(52),
	    rest = __webpack_require__(59);

	/**
	 * Creates an array of unique `array` values not included in the other given
	 * arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons. The order of result values is determined by the
	 * order they occur in the first array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...Array} [values] The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 * @see _.without, _.xor
	 * @example
	 *
	 * _.difference([2, 1], [2, 3]);
	 * // => [1]
	 */
	var difference = rest(function (array, values) {
	    return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : [];
	});

	module.exports = difference;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SetCache = __webpack_require__(3),
	    arrayIncludes = __webpack_require__(41),
	    arrayIncludesWith = __webpack_require__(44),
	    arrayMap = __webpack_require__(45),
	    baseUnary = __webpack_require__(46),
	    cacheHas = __webpack_require__(47);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of methods like `_.difference` without support
	 * for excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;

	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  } else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer: while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    value = comparator || value !== 0 ? value : 0;
	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    } else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MapCache = __webpack_require__(4),
	    setCacheAdd = __webpack_require__(39),
	    setCacheHas = __webpack_require__(40);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	    var index = -1,
	        length = values ? values.length : 0;

	    this.__data__ = new MapCache();
	    while (++index < length) {
	        this.add(values[index]);
	    }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mapCacheClear = __webpack_require__(5),
	    mapCacheDelete = __webpack_require__(33),
	    mapCacheGet = __webpack_require__(36),
	    mapCacheHas = __webpack_require__(37),
	    mapCacheSet = __webpack_require__(38);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	    var index = -1,
	        length = entries ? entries.length : 0;

	    this.clear();
	    while (++index < length) {
	        var entry = entries[index];
	        this.set(entry[0], entry[1]);
	    }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Hash = __webpack_require__(6),
	    ListCache = __webpack_require__(24),
	    Map = __webpack_require__(32);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash(),
	    'map': new (Map || ListCache)(),
	    'string': new Hash()
	  };
	}

	module.exports = mapCacheClear;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hashClear = __webpack_require__(7),
	    hashDelete = __webpack_require__(20),
	    hashGet = __webpack_require__(21),
	    hashHas = __webpack_require__(22),
	    hashSet = __webpack_require__(23);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	    var index = -1,
	        length = entries ? entries.length : 0;

	    this.clear();
	    while (++index < length) {
	        var entry = entries[index];
	        this.set(entry[0], entry[1]);
	    }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(8);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	module.exports = hashClear;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(9);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsNative = __webpack_require__(10),
	    getValue = __webpack_require__(19);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(11),
	    isHostObject = __webpack_require__(13),
	    isMasked = __webpack_require__(14),
	    isObject = __webpack_require__(12),
	    toSource = __webpack_require__(18);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
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
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(12);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var coreJsData = __webpack_require__(15);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = function () {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? 'Symbol(src)_1.' + uid : '';
	}();

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && maskSrcKey in func;
	}

	module.exports = isMasked;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(16);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var checkGlobal = __webpack_require__(17);

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal((typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal((typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(_typeof(undefined) == 'object' && undefined);

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

	module.exports = root;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 17 */
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
/* 18 */
/***/ function(module, exports) {

	'use strict';

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return func + '';
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}

	module.exports = hashDelete;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(8);

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
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(8);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(8);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var listCacheClear = __webpack_require__(25),
	    listCacheDelete = __webpack_require__(26),
	    listCacheGet = __webpack_require__(29),
	    listCacheHas = __webpack_require__(30),
	    listCacheSet = __webpack_require__(31);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	    var index = -1,
	        length = entries ? entries.length : 0;

	    this.clear();
	    while (++index < length) {
	        var entry = entries[index];
	        this.set(entry[0], entry[1]);
	    }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	module.exports = listCacheClear;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(27);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	module.exports = listCacheDelete;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eq = __webpack_require__(28);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
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
/* 28 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(27);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(27);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(27);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(9),
	    root = __webpack_require__(16);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getMapData = __webpack_require__(34);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}

	module.exports = mapCacheDelete;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isKeyable = __webpack_require__(35);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
	}

	module.exports = getMapData;

/***/ },
/* 35 */
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
	  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
	}

	module.exports = isKeyable;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getMapData = __webpack_require__(34);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getMapData = __webpack_require__(34);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getMapData = __webpack_require__(34);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}

	module.exports = mapCacheSet;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIndexOf = __webpack_require__(42);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to search.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var indexOfNaN = __webpack_require__(43);

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
/* 43 */
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
	      index = fromIndex + (fromRight ? 1 : -1);

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
/* 44 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to search.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arrayIncludesWith;

/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.unary` without support for storing wrapper metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function (value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Checks if a cache value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayPush = __webpack_require__(49),
	    isFlattenable = __webpack_require__(50);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
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
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(51),
	    isArray = __webpack_require__(58);

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value);
	}

	module.exports = isFlattenable;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLikeObject = __webpack_require__(52);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
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
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(53),
	    isObjectLike = __webpack_require__(57);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getLength = __webpack_require__(54),
	    isFunction = __webpack_require__(11),
	    isLength = __webpack_require__(56);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(55);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
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
/* 57 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 58 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(60),
	    toInteger = __webpack_require__(61);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as
	 * an array.
	 *
	 * **Note:** This method is based on the
	 * [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 60 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toFinite = __webpack_require__(62);

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? remainder ? result - remainder : result : 0;
	}

	module.exports = toInteger;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toNumber = __webpack_require__(63);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = value < 0 ? -1 : 1;
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	module.exports = toFinite;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(11),
	    isObject = __webpack_require__(12),
	    isSymbol = __webpack_require__(64);

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
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
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
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isObjectLike = __webpack_require__(57);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(12);

	/** `Object#toString` result references. */
	var regexpTag = '[object RegExp]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `RegExp` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getTag = __webpack_require__(67),
	    isArguments = __webpack_require__(51),
	    isArray = __webpack_require__(58),
	    isArrayLike = __webpack_require__(53),
	    isBuffer = __webpack_require__(72),
	    isFunction = __webpack_require__(11),
	    isObjectLike = __webpack_require__(57),
	    isString = __webpack_require__(75),
	    keys = __webpack_require__(76);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

	/**
	 * Checks if `value` is an empty object, collection, map, or set.
	 *
	 * Objects are considered empty if they have no own enumerable string keyed
	 * properties.
	 *
	 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	 * jQuery-like collections are considered empty if they have a `length` of `0`.
	 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
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
	  if (isArrayLike(value) && (isArray(value) || isString(value) || isFunction(value.splice) || isArguments(value) || isBuffer(value))) {
	    return !value.length;
	  }
	  if (isObjectLike(value)) {
	    var tag = getTag(value);
	    if (tag == mapTag || tag == setTag) {
	      return !value.size;
	    }
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return !(nonEnumShadows && keys(value).length);
	}

	module.exports = isEmpty;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DataView = __webpack_require__(68),
	    Map = __webpack_require__(32),
	    Promise = __webpack_require__(69),
	    Set = __webpack_require__(70),
	    WeakMap = __webpack_require__(71),
	    toSource = __webpack_require__(18);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

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

	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge, and promises in Node.js.
	if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
	  getTag = function getTag(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString:
	          return dataViewTag;
	        case mapCtorString:
	          return mapTag;
	        case promiseCtorString:
	          return promiseTag;
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(9),
	    root = __webpack_require__(16);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(9),
	    root = __webpack_require__(16);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(9),
	    root = __webpack_require__(16);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(9),
	    root = __webpack_require__(16);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var root = __webpack_require__(16),
	    stubFalse = __webpack_require__(74);

	/** Detect free variable `exports`. */
	var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
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
	var isBuffer = !Buffer ? stubFalse : function (value) {
	  return value instanceof Buffer;
	};

	module.exports = isBuffer;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(73)(module)))

/***/ },
/* 73 */
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
/* 74 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A method that returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(58),
	    isObjectLike = __webpack_require__(57);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHas = __webpack_require__(77),
	    baseKeys = __webpack_require__(79),
	    indexKeys = __webpack_require__(80),
	    isArrayLike = __webpack_require__(53),
	    isIndex = __webpack_require__(82),
	    isPrototype = __webpack_require__(83);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var getPrototype = __webpack_require__(78);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return object != null && (hasOwnProperty.call(object, key) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && key in object && getPrototype(object) === null);
	}

	module.exports = baseHas;

/***/ },
/* 78 */
/***/ function(module, exports) {

	"use strict";

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;

/***/ },
/* 79 */
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseTimes = __webpack_require__(81),
	    isArguments = __webpack_require__(51),
	    isArray = __webpack_require__(58),
	    isLength = __webpack_require__(56),
	    isString = __webpack_require__(75);

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
/* 81 */
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
/* 82 */
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
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;

/***/ },
/* 83 */
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var drop = __webpack_require__(85);

	/**
	 * Gets all but the first element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseSlice = __webpack_require__(86),
	    toInteger = __webpack_require__(61);

	/**
	 * Creates a slice of `array` with `n` elements dropped from the beginning.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @param {number} [n=1] The number of elements to drop.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
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
/* 86 */
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
/* 87 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Gets the first element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
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
	  return array && array.length ? array[0] : undefined;
	}

	module.exports = head;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayEach = __webpack_require__(89),
	    baseCreate = __webpack_require__(90),
	    baseForOwn = __webpack_require__(91),
	    baseIteratee = __webpack_require__(94),
	    getPrototype = __webpack_require__(78),
	    isArray = __webpack_require__(58),
	    isFunction = __webpack_require__(11),
	    isObject = __webpack_require__(12),
	    isTypedArray = __webpack_require__(113);

	/**
	 * An alternative to `_.reduce`; this method transforms `object` to a new
	 * `accumulator` object which is the result of running each of its own
	 * enumerable string keyed properties thru `iteratee`, with each invocation
	 * potentially mutating the `accumulator` object. If `accumulator` is not
	 * provided, a new object with the same `[[Prototype]]` will be used. The
	 * iteratee is invoked with four arguments: (accumulator, value, key, object).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.3.0
	 * @category Object
	 * @param {Object} object The object to iterate over.
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
	        accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
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
/* 89 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(12);

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
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFor = __webpack_require__(92),
	    keys = __webpack_require__(76);

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
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createBaseFor = __webpack_require__(93);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
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
/* 93 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
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
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var baseMatches = __webpack_require__(95),
	    baseMatchesProperty = __webpack_require__(117),
	    identity = __webpack_require__(130),
	    isArray = __webpack_require__(58),
	    property = __webpack_require__(131);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
	    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsMatch = __webpack_require__(96),
	    getMatchData = __webpack_require__(114),
	    matchesStrictComparable = __webpack_require__(116);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function (object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(97),
	    baseIsEqual = __webpack_require__(103);

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
	      var stack = new Stack();
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ListCache = __webpack_require__(24),
	    stackClear = __webpack_require__(98),
	    stackDelete = __webpack_require__(99),
	    stackGet = __webpack_require__(100),
	    stackHas = __webpack_require__(101),
	    stackSet = __webpack_require__(102);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ListCache = __webpack_require__(24);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache();
	}

	module.exports = stackClear;

/***/ },
/* 99 */
/***/ function(module, exports) {

	'use strict';

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
	  return this.__data__['delete'](key);
	}

	module.exports = stackDelete;

/***/ },
/* 100 */
/***/ function(module, exports) {

	"use strict";

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
	  return this.__data__.get(key);
	}

	module.exports = stackGet;

/***/ },
/* 101 */
/***/ function(module, exports) {

	"use strict";

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
	  return this.__data__.has(key);
	}

	module.exports = stackHas;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ListCache = __webpack_require__(24),
	    MapCache = __webpack_require__(4);

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
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache && cache.__data__.length == LARGE_ARRAY_SIZE) {
	    cache = this.__data__ = new MapCache(cache.__data__);
	  }
	  cache.set(key, value);
	  return this;
	}

	module.exports = stackSet;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqualDeep = __webpack_require__(104),
	    isObject = __webpack_require__(12),
	    isObjectLike = __webpack_require__(57);

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
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(97),
	    equalArrays = __webpack_require__(105),
	    equalByTag = __webpack_require__(107),
	    equalObjects = __webpack_require__(112),
	    getTag = __webpack_require__(67),
	    isArray = __webpack_require__(58),
	    isHostObject = __webpack_require__(13),
	    isTypedArray = __webpack_require__(113);

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
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
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
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack());
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
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
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SetCache = __webpack_require__(3),
	    arraySome = __webpack_require__(106);

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
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
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
	  var index = -1,
	      result = true,
	      seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache() : undefined;

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
	    if (seen) {
	      if (!arraySome(other, function (othValue, othIndex) {
	        if (!seen.has(othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	          return seen.add(othIndex);
	        }
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
/* 106 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(108),
	    Uint8Array = __webpack_require__(109),
	    equalArrays = __webpack_require__(105),
	    mapToArray = __webpack_require__(110),
	    setToArray = __webpack_require__(111);

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

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

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
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and
	      // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
	      // not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return object != +object ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
	      // for more details.
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
	      bitmask |= UNORDERED_COMPARE_FLAG;
	      stack.set(object, other);

	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(16);

	/** Built-in value references. */
	var _Symbol = root.Symbol;

	module.exports = _Symbol;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(16);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;

/***/ },
/* 110 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
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
/* 111 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
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
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHas = __webpack_require__(77),
	    keys = __webpack_require__(76);

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
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
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
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isLength = __webpack_require__(56),
	    isObjectLike = __webpack_require__(57);

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
	    dataViewTag = '[object DataView]',
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
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isStrictComparable = __webpack_require__(115),
	    keys = __webpack_require__(76);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	    var result = keys(object),
	        length = result.length;

	    while (length--) {
	        var key = result[length],
	            value = object[key];

	        result[length] = [key, value, isStrictComparable(value)];
	    }
	    return result;
	}

	module.exports = getMatchData;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(12);

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
/* 116 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function (object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
	  };
	}

	module.exports = matchesStrictComparable;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqual = __webpack_require__(103),
	    get = __webpack_require__(118),
	    hasIn = __webpack_require__(127),
	    isKey = __webpack_require__(125),
	    isStrictComparable = __webpack_require__(115),
	    matchesStrictComparable = __webpack_require__(116),
	    toKey = __webpack_require__(126);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function (object) {
	    var objValue = get(object, path);
	    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(119);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
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
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var castPath = __webpack_require__(120),
	    isKey = __webpack_require__(125),
	    toKey = __webpack_require__(126);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return index && index == length ? object : undefined;
	}

	module.exports = baseGet;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(58),
	    stringToPath = __webpack_require__(121);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = castPath;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var memoize = __webpack_require__(122),
	    toString = __webpack_require__(123);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function (string) {
	  var result = [];
	  toString(string).replace(rePropName, function (match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
	  });
	  return result;
	});

	module.exports = stringToPath;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MapCache = __webpack_require__(4);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function memoized() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache)();
	  return memoized;
	}

	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;

	module.exports = memoize;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseToString = __webpack_require__(124);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(108),
	    isSymbol = __webpack_require__(64);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	module.exports = baseToString;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isArray = __webpack_require__(58),
	    isSymbol = __webpack_require__(64);

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
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
	}

	module.exports = isKey;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSymbol = __webpack_require__(64);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	module.exports = toKey;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHasIn = __webpack_require__(128),
	    hasPath = __webpack_require__(129);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;

/***/ },
/* 128 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var castPath = __webpack_require__(120),
	    isArguments = __webpack_require__(51),
	    isArray = __webpack_require__(58),
	    isIndex = __webpack_require__(82),
	    isKey = __webpack_require__(125),
	    isLength = __webpack_require__(56),
	    isString = __webpack_require__(75),
	    toKey = __webpack_require__(126);

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
	  path = isKey(path, object) ? [path] : castPath(path);

	  var result,
	      index = -1,
	      length = path.length;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result) {
	    return result;
	  }
	  var length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isString(object) || isArguments(object));
	}

	module.exports = hasPath;

/***/ },
/* 130 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(55),
	    basePropertyDeep = __webpack_require__(132),
	    isKey = __webpack_require__(125),
	    toKey = __webpack_require__(126);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(119);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function (object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assignValue = __webpack_require__(134),
	    copyObject = __webpack_require__(135),
	    createAssigner = __webpack_require__(136),
	    isArrayLike = __webpack_require__(53),
	    isPrototype = __webpack_require__(83),
	    keys = __webpack_require__(76);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
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
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eq = __webpack_require__(28);

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
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assignValue = __webpack_require__(134);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
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

	module.exports = copyObject;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isIterateeCall = __webpack_require__(137),
	    rest = __webpack_require__(59);

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

	    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

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
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var eq = __webpack_require__(28),
	    isArrayLike = __webpack_require__(53),
	    isIndex = __webpack_require__(82),
	    isObject = __webpack_require__(12);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
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
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(58);

	/**
	 * Casts `value` as an array if it's not one.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.4.0
	 * @category Lang
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast array.
	 * @example
	 *
	 * _.castArray(1);
	 * // => [1]
	 *
	 * _.castArray({ 'a': 1 });
	 * // => [{ 'a': 1 }]
	 *
	 * _.castArray('abc');
	 * // => ['abc']
	 *
	 * _.castArray(null);
	 * // => [null]
	 *
	 * _.castArray(undefined);
	 * // => [undefined]
	 *
	 * _.castArray();
	 * // => []
	 *
	 * var array = [1, 2, 3];
	 * console.log(_.castArray(array) === array);
	 * // => true
	 */
	function castArray() {
	  if (!arguments.length) {
	    return [];
	  }
	  var value = arguments[0];
	  return isArray(value) ? value : [value];
	}

	module.exports = castArray;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFlatten = __webpack_require__(48),
	    baseOrderBy = __webpack_require__(140),
	    isArray = __webpack_require__(58),
	    isFlattenableIteratee = __webpack_require__(147),
	    isIterateeCall = __webpack_require__(137),
	    rest = __webpack_require__(59);

	/**
	 * Creates an array of elements, sorted in ascending order by the results of
	 * running each element in a collection thru each iteratee. This method
	 * performs a stable sort, that is, it preserves the original sort order of
	 * equal elements. The iteratees are invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[])}
	 *  [iteratees=[_.identity]] The iteratees to sort by.
	 * @returns {Array} Returns the new sorted array.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'fred',   'age': 48 },
	 *   { 'user': 'barney', 'age': 36 },
	 *   { 'user': 'fred',   'age': 40 },
	 *   { 'user': 'barney', 'age': 34 }
	 * ];
	 *
	 * _.sortBy(users, function(o) { return o.user; });
	 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	 *
	 * _.sortBy(users, ['user', 'age']);
	 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
	 *
	 * _.sortBy(users, 'user', function(o) {
	 *   return Math.floor(o.age / 10);
	 * });
	 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	 */
	var sortBy = rest(function (collection, iteratees) {
	  if (collection == null) {
	    return [];
	  }
	  var length = iteratees.length;
	  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
	    iteratees = [];
	  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
	    iteratees = [iteratees[0]];
	  }
	  iteratees = iteratees.length == 1 && isArray(iteratees[0]) ? iteratees[0] : baseFlatten(iteratees, 1, isFlattenableIteratee);

	  return baseOrderBy(collection, iteratees, []);
	});

	module.exports = sortBy;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(45),
	    baseIteratee = __webpack_require__(94),
	    baseMap = __webpack_require__(141),
	    baseSortBy = __webpack_require__(144),
	    baseUnary = __webpack_require__(46),
	    compareMultiple = __webpack_require__(145),
	    identity = __webpack_require__(130);

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
	  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

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
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseEach = __webpack_require__(142),
	    isArrayLike = __webpack_require__(53);

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
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForOwn = __webpack_require__(91),
	    createBaseEach = __webpack_require__(143);

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
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(53);

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
/* 144 */
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
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var compareAscending = __webpack_require__(146);

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
	  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
	  return object.index - other.index;
	}

	module.exports = compareMultiple;

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSymbol = __webpack_require__(64);

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
	    var valIsDefined = value !== undefined,
	        valIsNull = value === null,
	        valIsReflexive = value === value,
	        valIsSymbol = isSymbol(value);

	    var othIsDefined = other !== undefined,
	        othIsNull = other === null,
	        othIsReflexive = other === other,
	        othIsSymbol = isSymbol(other);

	    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
	      return 1;
	    }
	    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
	      return -1;
	    }
	  }
	  return 0;
	}

	module.exports = compareAscending;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(58),
	    isFunction = __webpack_require__(11);

	/**
	 * Checks if `value` is a flattenable array and not a `_.matchesProperty`
	 * iteratee shorthand.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenableIteratee(value) {
	  return isArray(value) && !(value.length == 2 && !isFunction(value[0]));
	}

	module.exports = isFlattenableIteratee;

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(45),
	    baseIteratee = __webpack_require__(94),
	    baseMap = __webpack_require__(141),
	    isArray = __webpack_require__(58);

	/**
	 * Creates an array of values by running each element in `collection` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
	 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
	 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
	 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Array|Function|Object|string} [iteratee=_.identity]
	 *  The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * _.map([4, 8], square);
	 * // => [16, 64]
	 *
	 * _.map({ 'a': 4, 'b': 8 }, square);
	 * // => [16, 64] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(collection, baseIteratee(iteratee, 3));
	}

	module.exports = map;

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObjectLike = __webpack_require__(57);

	/** `Object#toString` result references. */
	var numberTag = '[object Number]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	 * classified as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIteratee = __webpack_require__(94),
	    baseSortedIndexBy = __webpack_require__(151);

	/**
	 * This method is like `_.sortedIndex` except that it accepts `iteratee`
	 * which is invoked for `value` and each element of `array` to compute their
	 * sort ranking. The iteratee is invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The sorted array to inspect.
	 * @param {*} value The value to evaluate.
	 * @param {Array|Function|Object|string} [iteratee=_.identity]
	 *  The iteratee invoked per element.
	 * @returns {number} Returns the index at which `value` should be inserted
	 *  into `array`.
	 * @example
	 *
	 * var objects = [{ 'x': 4 }, { 'x': 5 }];
	 *
	 * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
	 * // => 0
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
	 * // => 0
	 */
	function sortedIndexBy(array, value, iteratee) {
	  return baseSortedIndexBy(array, value, baseIteratee(iteratee));
	}

	module.exports = sortedIndexBy;

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSymbol = __webpack_require__(64);

	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295,
	    MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeFloor = Math.floor,
	    nativeMin = Math.min;

	/**
	 * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
	 * which invokes `iteratee` for `value` and each element of `array` to compute
	 * their sort ranking. The iteratee is invoked with one argument; (value).
	 *
	 * @private
	 * @param {Array} array The sorted array to inspect.
	 * @param {*} value The value to evaluate.
	 * @param {Function} iteratee The iteratee invoked per element.
	 * @param {boolean} [retHighest] Specify returning the highest qualified index.
	 * @returns {number} Returns the index at which `value` should be inserted
	 *  into `array`.
	 */
	function baseSortedIndexBy(array, value, iteratee, retHighest) {
	  value = iteratee(value);

	  var low = 0,
	      high = array ? array.length : 0,
	      valIsNaN = value !== value,
	      valIsNull = value === null,
	      valIsSymbol = isSymbol(value),
	      valIsUndefined = value === undefined;

	  while (low < high) {
	    var mid = nativeFloor((low + high) / 2),
	        computed = iteratee(array[mid]),
	        othIsDefined = computed !== undefined,
	        othIsNull = computed === null,
	        othIsReflexive = computed === computed,
	        othIsSymbol = isSymbol(computed);

	    if (valIsNaN) {
	      var setLow = retHighest || othIsReflexive;
	    } else if (valIsUndefined) {
	      setLow = othIsReflexive && (retHighest || othIsDefined);
	    } else if (valIsNull) {
	      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
	    } else if (valIsSymbol) {
	      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
	    } else if (othIsNull || othIsSymbol) {
	      setLow = false;
	    } else {
	      setLow = retHighest ? computed <= value : computed < value;
	    }
	    if (setLow) {
	      low = mid + 1;
	    } else {
	      high = mid;
	    }
	  }
	  return nativeMin(high, MAX_ARRAY_INDEX);
	}

	module.exports = baseSortedIndexBy;

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIteratee = __webpack_require__(94),
	    basePullAt = __webpack_require__(153);

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
	 * @since 2.0.0
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @param {Array|Function|Object|string} [predicate=_.identity]
	 *  The function invoked per iteration.
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
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var castPath = __webpack_require__(120),
	    isIndex = __webpack_require__(82),
	    isKey = __webpack_require__(125),
	    last = __webpack_require__(154),
	    parent = __webpack_require__(155),
	    toKey = __webpack_require__(126);

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
	    if (length == lastIndex || index !== previous) {
	      var previous = index;
	      if (isIndex(index)) {
	        splice.call(array, index, 1);
	      } else if (!isKey(index, array)) {
	        var path = castPath(index),
	            object = parent(array, path);

	        if (object != null) {
	          delete object[toKey(last(path))];
	        }
	      } else {
	        delete array[toKey(index)];
	      }
	    }
	  }
	  return array;
	}

	module.exports = basePullAt;

/***/ },
/* 154 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
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
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(119),
	    baseSlice = __webpack_require__(86);

	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	}

	module.exports = parent;

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseSlice = __webpack_require__(86),
	    isIterateeCall = __webpack_require__(137),
	    toInteger = __webpack_require__(61);

	/**
	 * Creates a slice of `array` from `start` up to, but not including, `end`.
	 *
	 * **Note:** This method is used instead of
	 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
	 * returned.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
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
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFindIndex = __webpack_require__(158),
	    baseIteratee = __webpack_require__(94),
	    toInteger = __webpack_require__(61);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.1.0
	 * @category Array
	 * @param {Array} array The array to search.
	 * @param {Array|Function|Object|string} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
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
	function findIndex(array, predicate, fromIndex) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return -1;
	  }
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseFindIndex(array, baseIteratee(predicate, 3), index);
	}

	module.exports = findIndex;

/***/ },
/* 158 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while (fromRight ? index-- : ++index < length) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var findIndex = __webpack_require__(157),
	    isArrayLike = __webpack_require__(53),
	    values = __webpack_require__(160);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to search.
	 * @param {Array|Function|Object|string} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
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
	function find(collection, predicate, fromIndex) {
	  collection = isArrayLike(collection) ? collection : values(collection);
	  var index = findIndex(collection, predicate, fromIndex);
	  return index > -1 ? collection[index] : undefined;
	}

	module.exports = find;

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseValues = __webpack_require__(161),
	    keys = __webpack_require__(76);

	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object ? baseValues(object, keys(object)) : [];
	}

	module.exports = values;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(45);

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function (key) {
	    return object[key];
	  });
	}

	module.exports = baseValues;

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var findLastIndex = __webpack_require__(163),
	    isArrayLike = __webpack_require__(53),
	    values = __webpack_require__(160);

	/**
	 * This method is like `_.find` except that it iterates over elements of
	 * `collection` from right to left.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.0.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to search.
	 * @param {Array|Function|Object|string} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=collection.length-1] The index to search from.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * _.findLast([1, 2, 3, 4], function(n) {
	 *   return n % 2 == 1;
	 * });
	 * // => 3
	 */
	function findLast(collection, predicate, fromIndex) {
	  collection = isArrayLike(collection) ? collection : values(collection);
	  var index = findLastIndex(collection, predicate, fromIndex);
	  return index > -1 ? collection[index] : undefined;
	}

	module.exports = findLast;

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFindIndex = __webpack_require__(158),
	    baseIteratee = __webpack_require__(94),
	    toInteger = __webpack_require__(61);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * This method is like `_.findIndex` except that it iterates over elements
	 * of `collection` from right to left.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.0.0
	 * @category Array
	 * @param {Array} array The array to search.
	 * @param {Array|Function|Object|string} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=array.length-1] The index to search from.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': true },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': false }
	 * ];
	 *
	 * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
	 * // => 2
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findLastIndex(users, { 'user': 'barney', 'active': true });
	 * // => 0
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findLastIndex(users, ['active', false]);
	 * // => 2
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findLastIndex(users, 'active');
	 * // => 0
	 */
	function findLastIndex(array, predicate, fromIndex) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return -1;
	  }
	  var index = length - 1;
	  if (fromIndex !== undefined) {
	    index = toInteger(fromIndex);
	    index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
	  }
	  return baseFindIndex(array, baseIteratee(predicate, 3), index, true);
	}

	module.exports = findLastIndex;

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIndexOf = __webpack_require__(42),
	    toInteger = __webpack_require__(61);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Gets the index at which the first occurrence of `value` is found in `array`
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons. If `fromIndex` is negative, it's used as the
	 * offset from the end of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
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
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseIndexOf(array, value, index);
	}

	module.exports = indexOf;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseClone = __webpack_require__(166);

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
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
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(97),
	    arrayEach = __webpack_require__(89),
	    assignValue = __webpack_require__(134),
	    baseAssign = __webpack_require__(167),
	    cloneBuffer = __webpack_require__(168),
	    copyArray = __webpack_require__(169),
	    copySymbols = __webpack_require__(170),
	    getAllKeys = __webpack_require__(173),
	    getTag = __webpack_require__(67),
	    initCloneArray = __webpack_require__(175),
	    initCloneByTag = __webpack_require__(176),
	    initCloneObject = __webpack_require__(187),
	    isArray = __webpack_require__(58),
	    isBuffer = __webpack_require__(72),
	    isHostObject = __webpack_require__(13),
	    isObject = __webpack_require__(12),
	    keys = __webpack_require__(76);

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
	    dataViewTag = '[object DataView]',
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
	cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
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
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack());
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (!isArr) {
	    var props = isFull ? getAllKeys(value) : keys(value);
	  }
	  // Recursively populate clone (susceptible to call stack limits).
	  arrayEach(props || value, function (subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return result;
	}

	module.exports = baseClone;

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(135),
	    keys = __webpack_require__(76);

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
/* 168 */
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
/* 169 */
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
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(135),
	    getSymbols = __webpack_require__(171);

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
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var stubArray = __webpack_require__(172);

	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	function getSymbols(object) {
	  // Coerce `object` to an object to avoid non-object errors in V8.
	  // See https://bugs.chromium.org/p/v8/issues/detail?id=3443 for more details.
	  return getOwnPropertySymbols(Object(object));
	}

	// Fallback for IE < 11.
	if (!getOwnPropertySymbols) {
	  getSymbols = stubArray;
	}

	module.exports = getSymbols;

/***/ },
/* 172 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A method that returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGetAllKeys = __webpack_require__(174),
	    getSymbols = __webpack_require__(171),
	    keys = __webpack_require__(76);

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	module.exports = getAllKeys;

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayPush = __webpack_require__(49),
	    isArray = __webpack_require__(58);

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;

/***/ },
/* 175 */
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
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cloneArrayBuffer = __webpack_require__(177),
	    cloneDataView = __webpack_require__(178),
	    cloneMap = __webpack_require__(179),
	    cloneRegExp = __webpack_require__(182),
	    cloneSet = __webpack_require__(183),
	    cloneSymbol = __webpack_require__(185),
	    cloneTypedArray = __webpack_require__(186);

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
	    dataViewTag = '[object DataView]',
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
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag:case float64Tag:
	    case int8Tag:case int16Tag:case int32Tag:
	    case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	module.exports = initCloneByTag;

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Uint8Array = __webpack_require__(109);

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
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cloneArrayBuffer = __webpack_require__(177);

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	module.exports = cloneDataView;

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var addMapEntry = __webpack_require__(180),
	    arrayReduce = __webpack_require__(181),
	    mapToArray = __webpack_require__(110);

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor());
	}

	module.exports = cloneMap;

/***/ },
/* 180 */
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
/* 181 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;

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
/* 182 */
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
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var addSetEntry = __webpack_require__(184),
	    arrayReduce = __webpack_require__(181),
	    setToArray = __webpack_require__(111);

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor());
	}

	module.exports = cloneSet;

/***/ },
/* 184 */
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
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(108);

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
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cloneArrayBuffer = __webpack_require__(177);

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
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCreate = __webpack_require__(90),
	    getPrototype = __webpack_require__(78),
	    isPrototype = __webpack_require__(83);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	    return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
	}

	module.exports = initCloneObject;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(189);

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayEach = __webpack_require__(89),
	    baseEach = __webpack_require__(142),
	    baseIteratee = __webpack_require__(94),
	    isArray = __webpack_require__(58);

	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _([1, 2]).forEach(function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, baseIteratee(iteratee, 3));
	}

	module.exports = forEach;

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(60),
	    assignInDefaults = __webpack_require__(191),
	    assignInWith = __webpack_require__(192),
	    rest = __webpack_require__(59);

	/**
	 * Assigns own and inherited enumerable string keyed properties of source
	 * objects to the destination object for all destination properties that
	 * resolve to `undefined`. Source objects are applied from left to right.
	 * Once a property is set, additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaultsDeep
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
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eq = __webpack_require__(28);

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
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(135),
	    createAssigner = __webpack_require__(136),
	    keysIn = __webpack_require__(193);

	/**
	 * This method is like `_.assignIn` except that it accepts `customizer`
	 * which is invoked to produce the assigned values. If `customizer` returns
	 * `undefined`, assignment is handled by the method instead. The `customizer`
	 * is invoked with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @see _.assignWith
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
	  copyObject(source, keysIn(source), object, customizer);
	});

	module.exports = assignInWith;

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseKeysIn = __webpack_require__(194),
	    indexKeys = __webpack_require__(80),
	    isIndex = __webpack_require__(82),
	    isPrototype = __webpack_require__(83);

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
	 * @since 3.0.0
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
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Reflect = __webpack_require__(195),
	    iteratorToArray = __webpack_require__(196);

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
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(16);

	/** Built-in value references. */
	var Reflect = root.Reflect;

	module.exports = Reflect;

/***/ },
/* 196 */
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
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObjectLike = __webpack_require__(57);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a boolean primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isBoolean(false);
	 * // => true
	 *
	 * _.isBoolean(null);
	 * // => false
	 */
	function isBoolean(value) {
	  return value === true || value === false || isObjectLike(value) && objectToString.call(value) == boolTag;
	}

	module.exports = isBoolean;

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(60),
	    mergeDefaults = __webpack_require__(199),
	    mergeWith = __webpack_require__(205),
	    rest = __webpack_require__(59);

	/**
	 * This method is like `_.defaults` except that it recursively assigns
	 * default properties.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaults
	 * @example
	 *
	 * _.defaultsDeep({ 'user': { 'name': 'barney' } }, { 'user': { 'name': 'fred', 'age': 36 } });
	 * // => { 'user': { 'name': 'barney', 'age': 36 } }
	 *
	 */
	var defaultsDeep = rest(function (args) {
	  args.push(undefined, mergeDefaults);
	  return apply(mergeWith, undefined, args);
	});

	module.exports = defaultsDeep;

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseMerge = __webpack_require__(200),
	    isObject = __webpack_require__(12);

	/**
	 * Used by `_.defaultsDeep` to customize its `_.merge` use.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to merge.
	 * @param {Object} object The parent object of `objValue`.
	 * @param {Object} source The parent object of `srcValue`.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 * @returns {*} Returns the value to assign.
	 */
	function mergeDefaults(objValue, srcValue, key, object, source, stack) {
	  if (isObject(objValue) && isObject(srcValue)) {
	    baseMerge(objValue, srcValue, undefined, mergeDefaults, stack.set(srcValue, objValue));
	  }
	  return objValue;
	}

	module.exports = mergeDefaults;

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(97),
	    arrayEach = __webpack_require__(89),
	    assignMergeValue = __webpack_require__(201),
	    baseMergeDeep = __webpack_require__(202),
	    isArray = __webpack_require__(58),
	    isObject = __webpack_require__(12),
	    isTypedArray = __webpack_require__(113),
	    keysIn = __webpack_require__(193);

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  if (!(isArray(source) || isTypedArray(source))) {
	    var props = keysIn(source);
	  }
	  arrayEach(props || source, function (srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack());
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    } else {
	      var newValue = customizer ? customizer(object[key], srcValue, key + '', object, source, stack) : undefined;

	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  });
	}

	module.exports = baseMerge;

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eq = __webpack_require__(28);

	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if (value !== undefined && !eq(object[key], value) || typeof key == 'number' && value === undefined && !(key in object)) {
	    object[key] = value;
	  }
	}

	module.exports = assignMergeValue;

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assignMergeValue = __webpack_require__(201),
	    baseClone = __webpack_require__(166),
	    copyArray = __webpack_require__(169),
	    isArguments = __webpack_require__(51),
	    isArray = __webpack_require__(58),
	    isArrayLikeObject = __webpack_require__(52),
	    isFunction = __webpack_require__(11),
	    isObject = __webpack_require__(12),
	    isPlainObject = __webpack_require__(203),
	    isTypedArray = __webpack_require__(113),
	    toPlainObject = __webpack_require__(204);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);

	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    newValue = srcValue;
	    if (isArray(srcValue) || isTypedArray(srcValue)) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      } else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      } else {
	        isCommon = false;
	        newValue = baseClone(srcValue, true);
	      }
	    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
	        isCommon = false;
	        newValue = baseClone(srcValue, true);
	      } else {
	        newValue = objValue;
	      }
	    } else {
	      isCommon = false;
	    }
	  }
	  stack.set(srcValue, newValue);

	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	  }
	  stack['delete'](srcValue);
	  assignMergeValue(object, key, newValue);
	}

	module.exports = baseMergeDeep;

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getPrototype = __webpack_require__(78),
	    isHostObject = __webpack_require__(13),
	    isObjectLike = __webpack_require__(57);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(135),
	    keysIn = __webpack_require__(193);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}

	module.exports = toPlainObject;

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseMerge = __webpack_require__(200),
	    createAssigner = __webpack_require__(136);

	/**
	 * This method is like `_.merge` except that it accepts `customizer` which
	 * is invoked to produce the merged values of the destination and source
	 * properties. If `customizer` returns `undefined`, merging is handled by the
	 * method instead. The `customizer` is invoked with seven arguments:
	 * (objValue, srcValue, key, object, source, stack).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   if (_.isArray(objValue)) {
	 *     return objValue.concat(srcValue);
	 *   }
	 * }
	 *
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.mergeWith(object, other, customizer);
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
	  baseMerge(object, source, srcIndex, customizer);
	});

	module.exports = mergeWith;

/***/ },
/* 206 */
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
/* 207 */
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

	    var al = arguments.length;
	    var args, l, i, j;
	    var handler;

	    if (this._all && this._all.length) {
	      handler = this._all.slice();
	      if (al > 3) {
	        args = new Array(al);
	        for (j = 1; j < al; j++) {
	          args[j] = arguments[j];
	        }
	      }

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
	            handler[i].apply(this, args);
	        }
	      }
	    }

	    if (this.wildcard) {
	      handler = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
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
	            for (j = 1; j < al; j++) {
	              args[j - 1] = arguments[j];
	            }handler.apply(this, args);
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
	        for (j = 1; j < al; j++) {
	          args[j - 1] = arguments[j];
	        }
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
	    } else if (!this._all && type === 'error') {
	      if (arguments[1] instanceof Error) {
	        throw arguments[1]; // Unhandled 'error' event
	      } else {
	          throw new Error("Uncaught, unspecified 'error' event.");
	        }
	      return false;
	    }

	    return !!this._all;
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

	    var al = arguments.length;
	    var args, l, i, j;
	    var handler;

	    if (this._all) {
	      if (al > 3) {
	        args = new Array(al);
	        for (j = 1; j < al; j++) {
	          args[j] = arguments[j];
	        }
	      }
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
	            promises.push(this._all[i].apply(this, args));
	        }
	      }
	    }

	    if (this.wildcard) {
	      handler = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
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
	          for (j = 1; j < al; j++) {
	            args[j - 1] = arguments[j];
	          }promises.push(handler.apply(this, args));
	      }
	    } else if (handler && handler.length) {
	      if (al > 3) {
	        args = new Array(al - 1);
	        for (j = 1; j < al; j++) {
	          args[j - 1] = arguments[j];
	        }
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
	    } else if (!this._all && type === 'error') {
	      if (arguments[1] instanceof Error) {
	        return Promise.reject(arguments[1]); // Unhandled 'error' event
	      } else {
	          return Promise.reject("Uncaught, unspecified 'error' event.");
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
/* 208 */
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
	      var vertx = __webpack_require__(210);
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
	  if ("function" === 'function' && __webpack_require__(211)['amd']) {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(209), (function() { return this; }()), __webpack_require__(73)(module)))

/***/ },
/* 209 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
/* 210 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 211 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 212 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	"use strict";

/***/ }
/******/ ])
});
;