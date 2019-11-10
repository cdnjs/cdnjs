/*!
 * Inspire Tree v1.3.0
 * https://github.com/helion3/inspire-tree
 * 
 * Copyright 2015 Helion3, and other contributors
 * Licensed under MIT. https://github.com/helion3/inspire-tree/blob/master/LICENSE
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else if(typeof exports === 'object')
		exports["InspireTree"] = factory(require("lodash"));
	else
		root["InspireTree"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
	var _ = __webpack_require__(1);
	var cuid = __webpack_require__(2);
	var EventEmitter = __webpack_require__(3);
	var Promise = __webpack_require__(4).Promise;

	// CSS
	__webpack_require__(9);

	function InspireTree(opts) {
	    var initialized = false;
	    var noop = function() {};
	    var tree = this;
	    tree.preventDeselection = false;

	    if (!opts.data) {
	        throw new TypeError('Invalid data loader.');
	    }

	    // Assign defaults
	    tree.config = _.defaults(opts, {
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
	    var allowsLoadEvents = _.isArray(tree.config.allowLoadEvents) && tree.config.allowLoadEvents.length > 0;
	    var isDynamic = _.isFunction(tree.config.data);

	    // Rendering
	    var dom;

	    // Webpack has a DOM boolean that when false,
	    // allows us to exclude this library from our build.
	    // For those doing their own rendering, it's useless.
	    if (false) {
	        dom = new (require('./dom'))(tree);
	    }

	    // Validation
	    if (dom && (!_.isObject(opts) || !opts.target)) {
	        throw new TypeError('Property "target" is required, either an element or a selector.');
	    }

	    // Load custom/empty renderer
	    if (!dom) {
	        dom = _.isFunction(tree.config.renderer) ? tree.config.renderer(tree) : {
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

	        _.each(source, function(value, key) {
	            if (_.isObject(value)) {
	                if (_.isFunction(value.clone)) {
	                    node[key] = value.clone();
	                }
	                else {
	                    node[key] = _.cloneDeep(value);
	                }
	            }
	            else {
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
	    TreeNode.prototype.addChild = function(child) {
	        child = objectToModel(child);

	        if (_.isArray(this.children) || !_.isArrayLike(this.children)) {
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
	    TreeNode.prototype.available = function() {
	        return (!this.hidden() && !this.removed());
	    };

	    /**
	     * Blur focus from this node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.blur = function() {
	        return baseStateChange('focused', false, 'blurred', this);
	    };

	    /**
	     * Hides parents without any visible children.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.clean = function() {
	        this.recurseUp(function(node) {
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
	    TreeNode.prototype.clone = function() {
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
	    TreeNode.prototype.collapse = function() {
	        return baseStateChange('collapsed', true, 'collapsed', this);
	    };

	    /**
	     * Get if node collapsed.
	     *
	     * @category TreeNode
	     * @return {boolean} If collapsed.
	     */
	    TreeNode.prototype.collapsed = function() {
	        return this.itree.state.collapsed;
	    };

	    /**
	     * Copies node to a new tree instance.
	     *
	     * @category TreeNode
	     * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
	     * @return {object} Property "to" for defining destination.
	     */
	    TreeNode.prototype.copy = function(hierarchy) {
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
	            to: function(dest) {
	                if (!_.isFunction(dest.addNode)) {
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
	    TreeNode.prototype.copyHierarchy = function(excludeNode) {
	        var node = this;
	        var parents = node.getParents().clone();

	        // Remove old hierarchy data
	        _.each(parents, function(node) {
	            delete node.itree.parent;
	            delete node.children;
	        });

	        parents = parents.reverse();

	        if (!excludeNode) {
	            parents.push(node);
	        }

	        var hierarchy = parents[0];
	        var pointer = hierarchy;
	        var l = parents.length;
	        _.each(parents, function(parent, key) {
	            var children = new TreeNodes();

	            if (key + 1 < l) {
	                children.push(parents[key + 1]);
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
	    TreeNode.prototype.deselect = function(skipParentIndeterminate) {
	        if (!tree.config.requireSelection || tree.selected().length > 1) {
	            var node = this;
	            dom.batch();

	            node.itree.state.indeterminate = false;
	            baseStateChange('selected', false, 'deselected', this);

	            // If using checkbox model
	            if (tree.config.checkbox) {
	                // Deselect all children
	                if (node.hasChildren()) {
	                    node.children.recurseDown(function(child) {
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
	    TreeNode.prototype.expand = function() {
	        var node = this;

	        return new Promise(function(resolve, reject) {
	            var allow = (node.hasChildren() || (isDynamic && node.children === true));

	            if (allow && (node.collapsed() || node.hidden())) {
	                node.itree.state.collapsed = false;
	                node.itree.state.hidden = false;

	                tree.emit('node.expanded', node);

	                if (isDynamic && node.children === true) {
	                    node.loadChildren().then(resolve).catch(reject);
	                }
	                else {
	                    node.markDirty();
	                    dom.applyChanges();
	                    resolve(node);
	                }
	            }
	        });
	    };

	    /**
	     * Expand parent nodes.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.expandParents = function() {
	        if (this.hasParent()) {
	            this.getParent().recurseUp(function(node) {
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
	    TreeNode.prototype.expanded = function() {
	        return !this.collapsed();
	    };

	    /**
	     * Clones a node, removes itree property, and returns it
	     * as a native object.
	     *
	     * @category TreeNode
	     * @return {object} Cloned/modified node object.
	     */
	    TreeNode.prototype.export = function() {
	        var nodeClone = this.clone();
	        delete nodeClone.itree;

	        if (nodeClone.hasChildren()) {
	            nodeClone.children = nodeClone.children.export();
	        }

	        return nodeClone.toObject();
	    };

	    /**
	     * Focus a node without changing its selection.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.focus = function() {
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
	    TreeNode.prototype.focused = function() {
	        return this.itree.state.focused;
	    };

	    /**
	     * Get children for this node. If no children exist, an empty TreeNodes
	     * collection is returned for safe chaining.
	     *
	     * @category TreeNode
	     * @return {TreeNodes} Array of node objects.
	     */
	    TreeNode.prototype.getChildren = function() {
	        return this.hasChildren() ? this.children : new TreeNodes();
	    };

	    /**
	     * Get the immediate parent, if any.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.getParent = function() {
	        return this.itree.parent;
	    };

	    /**
	     * Returns parent nodes. Excludes any siblings.
	     *
	     * @category TreeNode
	     * @return {TreeNodes} Node objects.
	     */
	    TreeNode.prototype.getParents = function() {
	        var parents = new TreeNodes();

	        if (this.hasParent()) {
	            this.getParent().recurseUp(function(node) {
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
	    TreeNode.prototype.getTextualHierarchy = function() {
	        var paths = [];

	        this.recurseUp(function(node) {
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
	    TreeNode.prototype.hasChildren = function() {
	        return (_.isArrayLike(this.children) && this.children.length > 0);
	    };

	    /**
	     * If node has a parent.
	     *
	     * @category TreeNode
	     * @return {boolean} If parent.
	     */
	    TreeNode.prototype.hasParent = function() {
	        return Boolean(this.itree.parent);
	    };

	    /**
	     * If node has any visible children.
	     *
	     * @category TreeNode
	     * @return {boolean} If visible children.
	     */
	    TreeNode.prototype.hasVisibleChildren = function() {
	        var hasVisibleChildren = false;

	        if (this.hasChildren()) {
	            // Count visible children
	            // http://jsperf.com/count-subdoc-state/2
	            var visibleCount = 0;
	            _.each(this.children, function(child) {
	                if (!child.hidden() && !child.removed()) {
	                    visibleCount++;
	                }
	            });

	            hasVisibleChildren = (visibleCount > 0);
	        }

	        return hasVisibleChildren;
	    };

	    /**
	     * Get if node hidden.
	     *
	     * @category TreeNode
	     * @return {boolean} If hidden.
	     */
	    TreeNode.prototype.hidden = function() {
	        return this.itree.state.hidden;
	    };

	    /**
	     * Hide this node.
	     *
	     * @category TreeNode
	     * @return {object} Node object.
	     */
	    TreeNode.prototype.hide = function() {
	        var node = baseStateChange('hidden', true, 'hidden', this);

	        // Update children
	        if (node.hasChildren()) {
	            node.children.hide();
	        }

	        return node;
	    };

	    /**
	     * Find the last + deepest visible child of the previous sibling.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.lastDeepestVisibleChild = function() {
	        var found;

	        if (this.hasChildren() && !this.collapsed()) {
	            found = _.findLast(this.children, function(node) {
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
	    TreeNode.prototype.loadChildren = function() {
	        var node = this;

	        return new Promise(function(resolve, reject) {
	            if (!isDynamic || node.children !== true) {
	                reject(new Error('Node does not have or support dynamic children.'));
	            }

	            node.itree.state.loading = true;
	            node.markDirty();
	            dom.applyChanges();

	            tree.config.data(
	                node,
	                function resolver(results) {
	                    dom.batch();
	                    node.itree.state.loading = false;
	                    node.children = collectionToModel(results, node);
	                    node.markDirty();
	                    dom.end();

	                    resolve(node.children);

	                    tree.emit('children.loaded', node);
	                },
	                function rejecter(err) {
	                    node.itree.state.loading = false;
	                    node.children = new TreeNodes();
	                    node.markDirty();
	                    dom.applyChanges();

	                    reject(err);

	                    tree.emit('tree.loaderror', err);
	                }
	            );
	        });
	    };

	    /**
	     * Mark a node as dirty, rebuilding this node in the virtual DOM
	     * and rerendering to the live DOM, next time applyChanges is called.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.markDirty = function() {
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
	    TreeNode.prototype.nextVisibleChildNode = function() {
	        var startingNode = this;
	        var next;

	        if (startingNode.hasChildren()) {
	            next = _.find(startingNode.children, function(child) {
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
	    TreeNode.prototype.nextVisibleNode = function() {
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
	    TreeNode.prototype.nextVisibleAncestralSiblingNode = function() {
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
	    TreeNode.prototype.nextVisibleSiblingNode = function() {
	        var startingNode = this;
	        var context = (startingNode.hasParent() ? startingNode.getParent().children : tree.nodes());
	        var i = _.findIndex(context, { id: startingNode.id });

	        return _.find(_.slice(context, i + 1), function(node) {
	            return node.visible();
	        });
	    };

	    /**
	     * Find the previous visible node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object, if any.
	     */
	    TreeNode.prototype.previousVisibleNode = function() {
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
	    TreeNode.prototype.previousVisibleSiblingNode = function() {
	        var context = (this.hasParent() ? this.getParent().children : tree.nodes());
	        var i = _.findIndex(context, { id: this.id });
	        return _.findLast(_.slice(context, 0, i), function(node) {
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
	    TreeNode.prototype.recurseUp = function(iteratee) {
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
	    TreeNode.prototype.recurseDown = function(iteratee) {
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
	    TreeNode.prototype.refreshIndeterminateState = function() {
	        var node = this;
	        node.itree.state.indeterminate = false;

	        if (tree.config.checkbox) {
	            var childrenCount = node.children.length;
	            var oldValue = node.itree.state.indeterminate;

	            if (node.hasChildren()) {
	                var selected = 0;

	                _.each(node.children, function(child) {
	                    if (child.itree.state.indeterminate) {
	                        node.itree.state.indeterminate = true;
	                        return false;
	                    }
	                    else if (child.selected()) {
	                        selected++;
	                    }
	                });

	                if (!selected) {
	                    node.itree.state.selected = false;
	                }
	                else if (selected === childrenCount) {
	                    node.itree.state.selected = true;
	                }
	                else if (!node.itree.state.indeterminate) {
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
	    TreeNode.prototype.remove = function() {
	        var node = this;

	        var parent;
	        if (node.hasParent()) {
	            parent = node.getParent();
	        }

	        var context = (parent ? parent.children : model);
	        _.remove(context, { id: node.id });

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
	    TreeNode.prototype.removed = function() {
	        return this.itree.state.removed;
	    };

	    /**
	     * Restore state if soft-removed.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.restore = function() {
	        return baseStateChange('removed', false, 'restored', this);
	    };

	    /**
	     * Select this node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.select = function() {
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
	                    node.children.recurseDown(function(child) {
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
	    TreeNode.prototype.selectable = function() {
	        var allow = tree.config.allowSelection(this);
	        return typeof allow === 'boolean' ? allow : this.itree.state.selectable;
	    };

	    /**
	     * Get if node selected.
	     *
	     * @category TreeNode
	     * @return {boolean} If selected.
	     */
	    TreeNode.prototype.selected = function() {
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
	    TreeNode.prototype.set = function(property, value) {
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
	    TreeNode.prototype.setSelectable = function(selectable) {
	        return baseStateChange('selectable', selectable, 'selectability-changed', this);
	    };

	    /**
	     * Show this node.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.show = function() {
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
	    TreeNode.prototype.softRemove = function() {
	        return baseStateChange('removed', true, 'softremoved', this, 'softRemove');
	    };

	    /**
	     * Toggles collapsed state.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.toggleCollapse = function() {
	        return (this.collapsed() ? this.expand() : this.collapse());
	    };

	    /**
	     * Toggles selected state.
	     *
	     * @category TreeNode
	     * @return {TreeNode} Node object.
	     */
	    TreeNode.prototype.toggleSelect = function() {
	        return (this.selected() ? this.deselect() : this.select());
	    };

	    /**
	     * Export this node as a native Object.
	     *
	     * @category TreeNode
	     * @return {object} Node object.
	     */
	    TreeNode.prototype.toObject = function() {
	        var object = {};

	        _.each(this, function(value, property) {
	            object[property] = value;
	        });

	        if (this.hasChildren() && _.isFunction(this.children.toArray)) {
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
	    TreeNode.prototype.visible = function() {
	        var node = this;

	        var isVisible = true;
	        if (node.hidden() || node.removed()) {
	            isVisible = false;
	        }
	        else if (node.hasParent()) {
	            if (node.getParent().collapsed()) {
	                isVisible = false;
	            }
	            else {
	                isVisible = node.getParent().visible();
	            }
	        }
	        else {
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

	        if (_.isArray(array)) {
	            _.each(array, function(node) {
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
	    TreeNodes.prototype.clone = function() {
	        var newArray = new TreeNodes();

	        _.each(this, function(node) {
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
	    TreeNodes.prototype.copy = function(hierarchy) {
	        var nodes = this;

	        return {

	            /**
	             * Sets a destination.
	             *
	             * @category CopyNode
	             * @param {object} dest Destination Inspire Tree.
	             * @return {array} Array of new nodes.
	             */
	            to: function(dest) {
	                if (!_.isFunction(dest.addNodes)) {
	                    throw new Error('Destination must be an Inspire Tree instance.');
	                }

	                var newNodes = new TreeNodes();

	                _.each(nodes, function(node) {
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
	    TreeNodes.prototype.concat = function(nodes) {
	        var newNodes = new TreeNodes();

	        var pusher = function(node) {
	            newNodes.push(node);
	        };

	        _.each(this, pusher);
	        _.each(nodes, pusher);

	        return newNodes;
	    };

	    /**
	     * Returns deepest nodes from this array.
	     *
	     * @return {TreeNodes} Array of node objects.
	     */
	    TreeNodes.prototype.deepest = function() {
	        var matches = new TreeNodes();

	        this.recurseDown(function(node) {
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
	    TreeNodes.prototype.expandDeep = function() {
	        var nodes = this;

	        return new Promise(function(resolve) {
	            var waitCount = 0;

	            var done = function() {
	                if (--waitCount === 0) {
	                    resolve(nodes);
	                }
	            };

	            nodes.recurseDown(function(node) {
	                waitCount++;

	                // Ignore nodes without children
	                if (node.children) {
	                    node.expand().catch(done).then(function() {
	                        // Manually trigger expansion on newly loaded children
	                        node.children.expandDeep().catch(done).then(done);
	                    });
	                }
	                else {
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
	    TreeNodes.prototype.export = function() {
	        var clones = [];

	        _.each(this, function(node) {
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
	    TreeNodes.prototype.extract = function(predicate) {
	        var flat = this.flatten(predicate);
	        var matches = new TreeNodes();

	        _.each(flat, function(node) {
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
	    TreeNodes.prototype.filter = function(predicate) {
	        var fn = getPredicateFunction(predicate);
	        var matches = new TreeNodes();

	        _.each(this, function(node) {
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
	    TreeNodes.prototype.flatten = function(predicate) {
	        var flat = new TreeNodes();

	        var fn = getPredicateFunction(predicate);
	        this.recurseDown(function(node) {
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
	    TreeNodes.prototype.get = function(index) {
	        return this[index];
	    };

	    /**
	     * Iterate down all nodes and any children.
	     *
	     * @category TreeNodes
	     * @param {function} iteratee Iteratee function.
	     * @return {TreeNodes} Resulting nodes.
	     */
	    TreeNodes.prototype.recurseDown = function(iteratee) {
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
	    TreeNodes.prototype.sort = function(sorter) {
	        var nodes = this;

	        if (tree.config.sort && !sorter) {
	            sorter = tree.config.sort;
	        }

	        var sorted = _.sortBy(nodes, sorter);

	        nodes.length = 0;
	        _.each(sorted, function(node) {
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
	    TreeNodes.prototype.toArray = function() {
	        var array = [];

	        _.each(this, function(node) {
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
	        TreeNodes.prototype[method] = function() {
	            dom.batch();
	            _.each(this, function(node) {
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
	        TreeNodes.prototype[method + 'Deep'] = function() {
	            dom.batch();
	            this.recurseDown(function(node) {
	                node[method]();
	            });
	            dom.end();

	            return this;
	        };
	    }

	    // Methods we can map to each/deeply TreeNode
	    var mapped = ['blur', 'collapse', 'deselect', 'hide', 'restore', 'select', 'show'];
	    _.each(mapped, function(method) {
	        mapToEach(method);
	        mapToEachDeeply(method);
	    });

	    // Methods we can map to each TreeNode
	    _.each(['expand', 'expandParents', 'clean', 'softRemove'], mapToEach);

	    // Predicate methods we can map
	    _.each(['available', 'collapsed', 'focused', 'hidden', 'removed', 'selected'], function(state) {
	        TreeNodes.prototype[state] = function(full) {
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
	                node.getChildren().recurseDown(function(child) {
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
	            array = _.sortBy(array, tree.config.sort);
	        }

	        _.each(array, function(node) {
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
	            fn = function(node) {
	                return _.isFunction(node[predicate]) ? node[predicate]() : node[predicate];
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
	    var mergeNode = function(context, node) {
	        var newNodes = new TreeNodes();

	        if (node.id) {
	            // Does node already exist
	            var existing = tree.node(node.id);
	            if (existing) {
	                existing.restore();
	                existing.show();

	                // Merge children
	                if (node.hasChildren()) {
	                    if (!_.isArrayLike(existing.children)) {
	                        existing.children = new TreeNodes();
	                    }

	                    _.each(node.children, function(child) {
	                        newNodes.concat(mergeNode(existing, child));
	                    });
	                }

	                // Merge truthy
	                else if (node.children) {
	                    existing.children = node.children;
	                }
	            }
	            else {
	                if (context instanceof TreeNode) {
	                    node.itree.parent = context;
	                    context.children.push(node);
	                }
	                else {
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
	        object.id = object.id || cuid();
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
	        object = _.assign(new TreeNode(), object);

	        if (object.hasChildren()) {
	            object.children = collectionToModel(object.children, object);
	        }

	        // Fire events for pre-set states, if enabled
	        if (allowsLoadEvents) {
	            _.each(tree.config.allowLoadEvents, function(eventName) {
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

	        if (_.isArrayLike(obj)) {
	            _.each(obj, function(node) {
	                res = recurseDown(node, iteratee);

	                return res;
	            });
	        }
	        else {
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
	        _.each(defaultState, function(val, prop) {
	            node.itree.state[prop] = val;
	        });

	        return node;
	    }

	    var model = new TreeNodes();

	    // Map some model.TreeNodes method to the tree to make life easier for users
	    for (var method in TreeNodes.prototype) {
	        if (method !== 'constructor' && !tree[method] && _.isFunction(TreeNodes.prototype[method])) {
	            (function(methodName) {
	                tree[methodName] = function() {
	                    return model[methodName].apply(model, arguments);
	                };
	            }(method));
	        }
	    }

	    /**
	     * Add a node.
	     *
	     * @category Tree
	     * @param {object} node Node object.
	     * @return {object} Node object.
	     */
	    tree.addNode = function(node) {
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
	    tree.addNodes = function(nodes) {
	        dom.batch();

	        var newNodes = new TreeNodes();
	        _.each(nodes, function(node) {
	            newNodes.push(tree.addNode(node));
	        });

	        dom.end();

	        return newNodes;
	    };

	    /**
	     * Shows all nodes and collapses parents.
	     *
	     * @category Tree
	     * @return {void}
	     */
	    tree.clearSearch = function() {
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
	    tree.node = function(id, nodes) {
	        var match;

	        if (_.isNumber(id)) {
	            id = id.toString();
	        }

	        (nodes || model).recurseDown(function(node) {
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
	    tree.nodes = function(refs) {
	        var nodes = model;

	        if (_.isArray(refs)) {
	            nodes = new TreeNodes();

	            _.each(refs, function(ref) {
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
	    tree.load = function(loader) {
	        return new Promise(function(resolve, reject) {
	            var complete = function(nodes) {
	                // Delay event for synchronous loader. Otherwise it fires
	                // before the user has a chance to listen.
	                if (!initialized && _.isArray(nodes)) {
	                    setTimeout(function() {
	                        tree.emit('data.loaded', nodes);
	                    });
	                }
	                else {
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
	                if (!initialized && _.isArray(nodes)) {
	                    setTimeout(function() {
	                        tree.emit('model.loaded', model);
	                    });
	                }
	                else {
	                    tree.emit('model.loaded', model);
	                }

	                resolve(model);

	                dom.applyChanges();

	                if (_.isFunction(dom.scrollSelectedIntoView)) {
	                    dom.scrollSelectedIntoView();
	                }
	            };

	            var error = function(err) {
	                tree.emit('data.loaderror', err);
	                reject(err);
	            };

	            // Data given already as an array
	            if (_.isArrayLike(loader)) {
	                complete(loader);
	            }

	            // Data loader requires a caller/callback
	            else if (_.isFunction(loader)) {
	                loader(null, complete, error);
	            }

	            // Data loader is likely a promise
	            else if (_.isObject(loader)) {
	                // Promise
	                if (_.isFunction(loader.then)) {
	                    loader.then(complete);
	                }

	                // jQuery promises use "error".
	                if (_.isFunction(loader.error)) {
	                    loader.error(error);
	                }
	                else if (_.isFunction(loader.catch)) {
	                    loader.catch(error);
	                }
	            }

	            else {
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
	    tree.reload = function() {
	        tree.load(tree.config.data);
	    };

	    /**
	     * Removes all nodes.
	     *
	     * @category Tree
	     * @return {void}
	     */
	    tree.removeAll = function() {
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
	    tree.search = function(query) {
	        var matches = new TreeNodes();

	        var custom = tree.config.search;
	        if (_.isFunction(custom)) {
	            return custom(
	                query,
	                function resolver(nodes) {
	                    dom.batch();

	                    tree.nodes().hideDeep();
	                    _.each(nodes, function(node) {
	                        mergeNode(model, node);
	                    });

	                    dom.end();
	                },
	                function rejecter(err) {
	                    tree.emit('tree.loaderror', err);
	                }
	            );
	        }

	        // Don't search if query empty
	        if (_.isString(query) && _.isEmpty(query)) {
	            return tree.clearSearch();
	        }

	        if (_.isString(query)) {
	            query = new RegExp(query, 'i');
	        }

	        var predicate;
	        if (_.isRegExp(query)) {
	            predicate = function(node) {
	                return query.test(node.text);
	            };
	        }
	        else {
	            predicate = query;
	        }

	        if (!_.isFunction(predicate)) {
	            throw new TypeError('Search predicate must be a string, RegExp, or function.');
	        }

	        dom.batch();

	        model.recurseDown(function(node) {
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
	     * Select the first available node at the root level.
	     *
	     * @category Tree
	     * @return {TreeNode} Selected node object.
	     */
	    tree.selectFirstAvailableNode = function() {
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
	InspireTree.prototype = Object.create(EventEmitter.prototype);

	module.exports = InspireTree;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
	      return s.substr(s.length-size);
	    },

	    randomBlock = function randomBlock() {
	      return pad((Math.random() *
	            discreteValues << 0)
	            .toString(base), blockSize);
	    },

	    safeCounter = function () {
	      c = (c < discreteValues) ? c : 0;
	      c++; // this is not subliminal
	      return c - 1;
	    },

	    api = function cuid() {
	      // Starting with a lowercase letter makes
	      // it HTML element ID friendly.
	      var letter = 'c', // hard-coded allows for sequential access

	        // timestamp
	        // warning: this exposes the exact date and time
	        // that the uid was created.
	        timestamp = (new Date().getTime()).toString(base),

	        // Prevent same-machine collisions.
	        counter,

	        // A few chars to generate distinct ids for different
	        // clients (so different computers are far less
	        // likely to generate the same id)
	        fingerprint = api.fingerprint(),

	        // Grab some more chars from Math.random()
	        random = randomBlock() + randomBlock();

	        counter = pad(safeCounter().toString(base), blockSize);

	      return  (letter + timestamp + counter + fingerprint + random);
	    };

	  api.slug = function slug() {
	    var date = new Date().getTime().toString(36),
	      counter,
	      print = api.fingerprint().slice(0,1) +
	        api.fingerprint().slice(-1),
	      random = randomBlock().slice(-2);

	      counter = safeCounter().toString(36).slice(-4);

	    return date.slice(-2) +
	      counter + print + random;
	  };

	  api.globalCount = function globalCount() {
	    // We want to cache the results of this
	    var cache = (function calc() {
	        var i,
	          count = 0;

	        for (i in window) {
	          count++;
	        }

	        return count;
	      }());

	    api.globalCount = function () { return cache; };
	    return cache;
	  };

	  api.fingerprint = function browserPrint() {
	    return pad((navigator.mimeTypes.length +
	      navigator.userAgent.length).toString(36) +
	      api.globalCount().toString(36), 4);
	  };

	  // don't change anything from here down.
	  if (app.register) {
	    app.register(namespace, api);
	  } else if (true) {
	    module.exports = api;
	  } else {
	    app[namespace] = api;
	  }

	}(this.applitude || this));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * EventEmitter2
	 * https://github.com/hij1nx/EventEmitter2
	 *
	 * Copyright (c) 2013 hij1nx
	 * Licensed under the MIT license.
	 */
	;!function(undefined) {

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
	    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
	        typeLength = type.length, currentType = type[i], nextType = type[i+1];
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

	    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
	      //
	      // If the event emitted is '*' at this part
	      // or there is a concrete match at this patch
	      //
	      if (currentType === '*') {
	        for (branch in tree) {
	          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
	            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
	          }
	        }
	        return listeners;
	      } else if(currentType === '**') {
	        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
	        if(endReached && tree._listeners) {
	          // The next element has a _listeners, add it to the handlers.
	          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
	        }

	        for (branch in tree) {
	          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
	            if(branch === '*' || branch === '**') {
	              if(tree[branch]._listeners && !endReached) {
	                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
	              }
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
	            } else if(branch === nextType) {
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
	            } else {
	              // No match on this one, shift into the tree but not in the type array.
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
	            }
	          }
	        }
	        return listeners;
	      }

	      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
	    }

	    xTree = tree['*'];
	    if (xTree) {
	      //
	      // If the listener tree will allow any match for this part,
	      // then recursively explore all branches of the tree
	      //
	      searchListenerTree(handlers, type, xTree, i+1);
	    }

	    xxTree = tree['**'];
	    if(xxTree) {
	      if(i < typeLength) {
	        if(xxTree._listeners) {
	          // If we have a listener on a '**', it will catch all, so add its handler.
	          searchListenerTree(handlers, type, xxTree, typeLength);
	        }

	        // Build arrays of matching next branches and others.
	        for(branch in xxTree) {
	          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
	            if(branch === nextType) {
	              // We know the next element will match, so jump twice.
	              searchListenerTree(handlers, type, xxTree[branch], i+2);
	            } else if(branch === currentType) {
	              // Current node matches, move into the tree.
	              searchListenerTree(handlers, type, xxTree[branch], i+1);
	            } else {
	              isolatedBranch = {};
	              isolatedBranch[branch] = xxTree[branch];
	              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
	            }
	          }
	        }
	      } else if(xxTree._listeners) {
	        // We have reached the end and still on a '**'
	        searchListenerTree(handlers, type, xxTree, typeLength);
	      } else if(xxTree['*'] && xxTree['*']._listeners) {
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
	    for(var i = 0, len = type.length; i+1 < len; i++) {
	      if(type[i] === '**' && type[i+1] === '**') {
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
	        }
	        else if(typeof tree._listeners === 'function') {
	          tree._listeners = [tree._listeners, listener];
	        }
	        else if (isArray(tree._listeners)) {

	          tree._listeners.push(listener);

	          if (!tree._listeners.warned) {

	            var m = defaultMaxListeners;

	            if (typeof this._events.maxListeners !== 'undefined') {
	              m = this._events.maxListeners;
	            }

	            if (m > 0 && tree._listeners.length > m) {

	              tree._listeners.warned = true;
	              console.error('(node) warning: possible EventEmitter memory ' +
	                            'leak detected. %d listeners added. ' +
	                            'Use emitter.setMaxListeners() to increase limit.',
	                            tree._listeners.length);
	              if(console.trace){
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

	  EventEmitter.prototype.setMaxListeners = function(n) {
	    this._events || init.call(this);
	    this._events.maxListeners = n;
	    if (!this._conf) this._conf = {};
	    this._conf.maxListeners = n;
	  };

	  EventEmitter.prototype.event = '';

	  EventEmitter.prototype.once = function(event, fn) {
	    this.many(event, 1, fn);
	    return this;
	  };

	  EventEmitter.prototype.many = function(event, ttl, fn) {
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

	  EventEmitter.prototype.emit = function() {

	    this._events || init.call(this);

	    var type = arguments[0];

	    if (type === 'newListener' && !this.newListener) {
	      if (!this._events.newListener) { return false; }
	    }

	    // Loop through the *_all* functions and invoke them.
	    if (this._all) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
	      for (i = 0, l = this._all.length; i < l; i++) {
	        this.event = type;
	        this._all[i].apply(this, [type].concat(args));
	      }
	    }

	    // If there is no 'error' event listener then throw.
	    if (type === 'error') {

	      if (!this._all &&
	        !this._events.error &&
	        !(this.wildcard && this.listenerTree.error)) {

	        if (arguments[1] instanceof Error) {
	          throw arguments[1]; // Unhandled 'error' event
	        } else {
	          throw new Error("Uncaught, unspecified 'error' event.");
	        }
	        return false;
	      }
	    }

	    var handler;

	    if(this.wildcard) {
	      handler = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
	    }
	    else {
	      handler = this._events[type];
	    }

	    if (typeof handler === 'function') {
	      this.event = type;
	      if (arguments.length === 1) {
	        handler.call(this);
	      }
	      else if (arguments.length > 1)
	        switch (arguments.length) {
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
	            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
	            handler.apply(this, args);
	        }
	      return true;
	    }
	    else if (handler) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

	      var listeners = handler.slice();
	      for (var i = 0, l = listeners.length; i < l; i++) {
	        this.event = type;
	        listeners[i].apply(this, args);
	      }
	      return (listeners.length > 0) || !!this._all;
	    }
	    else {
	      return !!this._all;
	    }

	  };

	  EventEmitter.prototype.emitAsync = function() {

	    this._events || init.call(this);

	    var type = arguments[0];

	    if (type === 'newListener' && !this.newListener) {
	      if (!this._events.newListener) { return Promise.resolve([false]); }
	    }

	    var promises= [];

	    // Loop through the *_all* functions and invoke them.
	    if (this._all) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
	      for (i = 0, l = this._all.length; i < l; i++) {
	        this.event = type;
	        promises.push(this._all[i].apply(this, args));
	      }
	    }

	    // If there is no 'error' event listener then throw.
	    if (type === 'error') {

	      if (!this._all &&
	        !this._events.error &&
	        !(this.wildcard && this.listenerTree.error)) {

	        if (arguments[1] instanceof Error) {
	          return Promise.reject(arguments[1]); // Unhandled 'error' event
	        } else {
	          return Promise.reject("Uncaught, unspecified 'error' event.");
	        }
	      }
	    }

	    var handler;

	    if(this.wildcard) {
	      handler = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
	    }
	    else {
	      handler = this._events[type];
	    }

	    if (typeof handler === 'function') {
	      this.event = type;
	      if (arguments.length === 1) {
	        promises.push(handler.call(this));
	      }
	      else if (arguments.length > 1) {
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
	            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
	            promises.push(handler.apply(this, args));
	        }
	      }
	    }
	    else if (handler) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

	      var listeners = handler.slice();
	      for (var i = 0, l = listeners.length; i < l; i++) {
	        this.event = type;
	        promises.push(listeners[i].apply(this, args));
	      }
	    }
	    return Promise.all(promises);
	  };

	  EventEmitter.prototype.on = function(type, listener) {

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

	    if(this.wildcard) {
	      growListenerTree.call(this, type, listener);
	      return this;
	    }

	    if (!this._events[type]) {
	      // Optimize the case of one listener. Don't need the extra array object.
	      this._events[type] = listener;
	    }
	    else if(typeof this._events[type] === 'function') {
	      // Adding the second element, need to change to array.
	      this._events[type] = [this._events[type], listener];
	    }
	    else if (isArray(this._events[type])) {
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
	          console.error('(node) warning: possible EventEmitter memory ' +
	                        'leak detected. %d listeners added. ' +
	                        'Use emitter.setMaxListeners() to increase limit.',
	                        this._events[type].length);
	          if(console.trace){
	            console.trace();
	          }
	        }
	      }
	    }
	    return this;
	  };

	  EventEmitter.prototype.onAny = function(fn) {

	    if (typeof fn !== 'function') {
	      throw new Error('onAny only accepts instances of Function');
	    }

	    if(!this._all) {
	      this._all = [];
	    }

	    // Add the function to the event listener collection.
	    this._all.push(fn);
	    return this;
	  };

	  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	  EventEmitter.prototype.off = function(type, listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('removeListener only takes instances of Function');
	    }

	    var handlers,leafs=[];

	    if(this.wildcard) {
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
	    }
	    else {
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
	        if ((obj instanceof Function) || (typeof obj !== "object"))
	          continue;
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

	  EventEmitter.prototype.offAny = function(fn) {
	    var i = 0, l = 0, fns;
	    if (fn && this._all && this._all.length > 0) {
	      fns = this._all;
	      for(i = 0, l = fns.length; i < l; i++) {
	        if(fn === fns[i]) {
	          fns.splice(i, 1);
	          this.emit("removeListenerAny", fn);
	          return this;
	        }
	      }
	    } else {
	      fns = this._all;
	      for(i = 0, l = fns.length; i < l; i++)
	        this.emit("removeListenerAny", fns[i]);
	      this._all = [];
	    }
	    return this;
	  };

	  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

	  EventEmitter.prototype.removeAllListeners = function(type) {
	    if (arguments.length === 0) {
	      !this._events || init.call(this);
	      return this;
	    }

	    if(this.wildcard) {
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

	      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
	        var leaf = leafs[iLeaf];
	        leaf._listeners = null;
	      }
	    }
	    else {
	      if (!this._events || !this._events[type]) return this;
	      this._events[type] = null;
	    }
	    return this;
	  };

	  EventEmitter.prototype.listeners = function(type) {
	    if(this.wildcard) {
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

	  EventEmitter.prototype.listenersAny = function() {

	    if(this._all) {
	      return this._all;
	    }
	    else {
	      return [];
	    }

	  };

	  if (true) {
	     // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return EventEmitter;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // CommonJS
	    module.exports = EventEmitter;
	  }
	  else {
	    // Browser global.
	    window.EventEmitter2 = EventEmitter;
	  }
	}();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.1.2
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
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
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
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
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(7);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
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
	        lib$es6$promise$asap$$asap(function(){
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

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

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
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
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
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
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
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
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
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

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
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

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
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
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
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (Array.isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
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

	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;

	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;

	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);

	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
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

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
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
	    if ("function" === 'function' && __webpack_require__(8)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), (function() { return this; }()), __webpack_require__(6)(module)))

/***/ },
/* 5 */
/***/ function(module, exports) {

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
	    while(len) {
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

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;