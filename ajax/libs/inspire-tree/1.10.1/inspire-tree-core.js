/*!
 * Inspire Tree v1.10.0
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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _lodash = __webpack_require__(1);

	var _ = _interopRequireWildcard(_lodash);

	var _collectionToModel = __webpack_require__(2);

	var _eventemitter = __webpack_require__(14);

	var _es6Promise = __webpack_require__(6);

	var _standardizePromise = __webpack_require__(13);

	var _treenode = __webpack_require__(5);

	var _treenodes = __webpack_require__(12);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// CSS
	__webpack_require__(15);

	/**
	 * Maps a method to the root TreeNodes collection.
	 *
	 * @private
	 * @param {InspireTree} tree Tree instance.
	 * @param {string} method Method name.
	 * @param {arguments} args Proxied arguments.
	 * @return {mixed} Proxied return value.
	 */
	function map(tree, method, args) {
	    return tree.model[method].apply(tree.model, args);
	}

	/**
	 * Represents a singe tree instance.
	 *
	 * @category Tree
	 * @return {InspireTree} Tree instance.
	 */

	var InspireTree = function (_EventEmitter) {
	    _inherits(InspireTree, _EventEmitter);

	    function InspireTree(opts) {
	        _classCallCheck(this, InspireTree);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InspireTree).call(this));

	        var tree = _this;

	        // Init properties
	        tree._lastSelectedNode;
	        tree._muted = false;
	        tree.allowsLoadEvents = false;
	        tree.dom = false;
	        tree.initialized = false;
	        tree.isDynamic = false;
	        tree.model = new _treenodes.TreeNodes(tree);
	        tree.opts = opts;
	        tree.preventDeselection = false;

	        if (!opts.data) {
	            throw new TypeError('Invalid data loader.');
	        }

	        // Assign defaults
	        tree.config = _.defaultsDeep({}, opts, {
	            allowLoadEvents: [],
	            contextMenu: false,
	            dragTargets: false,
	            editable: false,
	            editing: {
	                add: false,
	                edit: false,
	                remove: false
	            },
	            nodes: {
	                resetStateOnRestore: true
	            },
	            renderer: false,
	            search: false,
	            selection: {
	                allow: _.noop,
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

	            if (!_.isBoolean(opts.showCheckboxes)) {
	                tree.config.showCheckboxes = true;
	            }
	        }

	        // If auto-selecting children, we must force multiselect
	        if (tree.config.selection.autoSelectChildren) {
	            tree.config.selection.multiple = true;
	        }

	        // Treat editable as full edit mode
	        if (opts.editable && !opts.editing) {
	            tree.config.editing.add = true;
	            tree.config.editing.edit = true;
	            tree.config.editing.remove = true;
	        }

	        // Init the default state for nodes
	        tree.defaultState = {
	            collapsed: true,
	            editable: _.get(tree, 'config.editing.edit'),
	            editing: false,
	            focused: false,
	            hidden: false,
	            indeterminate: false,
	            loading: false,
	            removed: false,
	            selectable: true,
	            selected: false
	        };

	        // Cache some configs
	        tree.allowsLoadEvents = _.isArray(tree.config.allowLoadEvents) && tree.config.allowLoadEvents.length > 0;
	        tree.isDynamic = _.isFunction(tree.config.data);

	        // Override emitter so we can better control flow
	        var emit = tree.emit;
	        tree.emit = function () {
	            if (!tree.muted()) {
	                // Duck-type for a DOM event
	                if (_.isFunction(_.get(arguments, '[1].preventDefault'))) {
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
	            tree.dom = new (require('./dom'))(tree);
	        }

	        // Validation
	        if (tree.dom && (!_.isObject(opts) || !opts.target)) {
	            throw new TypeError('Property "target" is required, either an element or a selector.');
	        }

	        // Load custom/empty renderer
	        if (!tree.dom) {
	            var renderer = _.isFunction(tree.config.renderer) ? tree.config.renderer(tree) : {};
	            tree.dom = _.defaults(renderer, {
	                applyChanges: _.noop,
	                attach: _.noop,
	                batch: _.noop,
	                end: _.noop
	            });
	        }

	        // Connect to our target DOM element
	        tree.dom.attach(tree.config.target);

	        // Load initial user data
	        tree.load(tree.config.data);

	        tree.initialized = true;
	        return _this;
	    }

	    /**
	     * Adds a new node to this collection. If a sort
	     * method is configured, the node will be added
	     * in the appropriate order.
	     *
	     * @category Tree
	     * @param {object} node Node
	     * @return {TreeNode} Node object.
	     */


	    _createClass(InspireTree, [{
	        key: 'addNode',
	        value: function addNode() {
	            return map(this, 'addNode', arguments);
	        }

	        /**
	         * Add nodes.
	         *
	         * @category Tree
	         * @param {array} nodes Array of node objects.
	         * @return {TreeNodes} Added node objects.
	         */

	    }, {
	        key: 'addNodes',
	        value: function addNodes(nodes) {
	            var tree = this;
	            tree.dom.batch();

	            var newNodes = new _treenodes.TreeNodes(this);
	            _.each(nodes, function (node) {
	                newNodes.push(tree.addNode(node));
	            });

	            tree.dom.end();

	            return newNodes;
	        }

	        /**
	         * Query for all available nodes.
	         *
	         * @category Tree
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'available',
	        value: function available() {
	            return map(this, 'available', arguments);
	        }

	        /**
	         * Blur children in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'blur',
	        value: function blur() {
	            return map(this, 'blur', arguments);
	        }

	        /**
	         * Blur all children (deeply) in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'blurDeep',
	        value: function blurDeep() {
	            return map(this, 'blurDeep', arguments);
	        }

	        /**
	         * Compares any number of TreeNode objects and returns
	         * the minimum and maximum (starting/ending) nodes.
	         *
	         * @category Tree
	         * @return {array} Array with two TreeNode objects.
	         */

	    }, {
	        key: 'boundingNodes',
	        value: function boundingNodes() {
	            var pathMap = _.transform(arguments, function (map, node) {
	                map[node.indexPath().replace(/\./g, '')] = node;
	            }, {});

	            var paths = _.sortBy(Object.keys(pathMap));
	            return [_.get(pathMap, _.head(paths)), _.get(pathMap, _.tail(paths))];
	        }

	        /**
	         * Get if the tree will auto-deselect currently selected nodes
	         * when a new selection is made.
	         *
	         * @category Tree
	         * @return {boolean} If tree will auto-deselect nodes.
	         */

	    }, {
	        key: 'canAutoDeselect',
	        value: function canAutoDeselect() {
	            return this.config.selection.autoDeselect && !this.preventDeselection;
	        }

	        /**
	         * Clean children in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'clean',
	        value: function clean() {
	            return map(this, 'clean', arguments);
	        }

	        /**
	         * Shows all nodes and collapses parents.
	         *
	         * @category Tree
	         * @return {Tree} Tree instance.
	         */

	    }, {
	        key: 'clearSearch',
	        value: function clearSearch() {
	            return this.showDeep().collapseDeep().tree();
	        }

	        /**
	         * Clones (deep) the array of nodes.
	         *
	         * Note: Cloning will *not* clone the context pointer.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of cloned nodes.
	         */

	    }, {
	        key: 'clone',
	        value: function clone() {
	            return map(this, 'clone', arguments);
	        }

	        /**
	         * Collapse children in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'collapse',
	        value: function collapse() {
	            return map(this, 'collapse', arguments);
	        }

	        /**
	         * Query for all collapsed nodes.
	         *
	         * @category Tree
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'collapsed',
	        value: function collapsed() {
	            return map(this, 'collapsed', arguments);
	        }

	        /**
	         * Collapse all children (deeply) in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'collapseDeep',
	        value: function collapseDeep() {
	            return map(this, 'collapseDeep', arguments);
	        }

	        /**
	         * Concat nodes like an Array would.
	         *
	         * @category Tree
	         * @param {TreeNodes} nodes Array of nodes.
	         * @return {TreeNodes} Resulting node array.
	         */

	    }, {
	        key: 'concat',
	        value: function concat() {
	            return map(this, 'concat', arguments);
	        }

	        /**
	         * Copies nodes to a new tree instance.
	         *
	         * @category Tree
	         * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
	         * @return {object} Methods to perform action on copied nodes.
	         */

	    }, {
	        key: 'copy',
	        value: function copy() {
	            return map(this, 'copy', arguments);
	        }

	        /**
	         * Returns deepest nodes from this array.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'deepest',
	        value: function deepest() {
	            return map(this, 'deepest', arguments);
	        }

	        /**
	         * Deselect children in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'deselect',
	        value: function deselect() {
	            return map(this, 'deselect', arguments);
	        }

	        /**
	         * Deselect all children (deeply) in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'deselectDeep',
	        value: function deselectDeep() {
	            return map(this, 'deselectDeep', arguments);
	        }

	        /**
	         * Disable auto-deselection of currently selected nodes.
	         *
	         * @category Tree
	         * @return {Tree} Tree instance.
	         */

	    }, {
	        key: 'disableDeselection',
	        value: function disableDeselection() {
	            if (this.config.selection.multiple) {
	                this.preventDeselection = true;
	            }

	            return this;
	        }

	        /**
	         * Iterate every TreeNode in this collection.
	         *
	         * @category Tree
	         * @param {function} iteratee Iteratee invoke for each node.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'each',
	        value: function each() {
	            return map(this, 'each', arguments);
	        }

	        /**
	         * Query for all editable nodes.
	         *
	         * @category Tree
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'editable',
	        value: function editable() {
	            return map(this, 'editable', arguments);
	        }

	        /**
	         * Query for all nodes in editing mode.
	         *
	         * @category Tree
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'editing',
	        value: function editing() {
	            return map(this, 'editing', arguments);
	        }

	        /**
	         * Enable auto-deselection of currently selected nodes.
	         *
	         * @category Tree
	         * @return {Tree} Tree instance.
	         */

	    }, {
	        key: 'enableDeselection',
	        value: function enableDeselection() {
	            this.preventDeselection = false;

	            return this;
	        }

	        /**
	         * Expand children in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'expand',
	        value: function expand() {
	            return map(this, 'expand', arguments);
	        }

	        /**
	         * Query for all expanded nodes.
	         *
	         * @category Tree
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'expandDeep',
	        value: function expandDeep() {
	            return map(this, 'expandDeep', arguments);
	        }

	        /**
	         * Recursively expands all nodes, loading all dynamic calls.
	         *
	         * @category Tree
	         * @return {Promise} Promise resolved only when all children have loaded and expanded.
	         */

	    }, {
	        key: 'expanded',
	        value: function expanded() {
	            return map(this, 'expanded', arguments);
	        }

	        /**
	         * Returns a cloned hierarchy of all nodes matching a predicate.
	         *
	         * Because it filters deeply, we must clone all nodes so that we
	         * don't affect the actual node array.
	         *
	         * @category Tree
	         * @param {string|function} predicate State flag or custom function.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'extract',
	        value: function extract() {
	            return map(this, 'extract', arguments);
	        }

	        /**
	         * Returns nodes which match a predicate.
	         *
	         * @category Tree
	         * @param {string|function} predicate State flag or custom function.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'filter',
	        value: function filter() {
	            return map(this, 'filter', arguments);
	        }

	        /**
	         * Flattens a hierarchy, returning only node(s) matching the
	         * expected state or predicate function.
	         *
	         * @category Tree
	         * @param {string|function} predicate State property or custom function.
	         * @return {TreeNodes} Flat array of matching nodes.
	         */

	    }, {
	        key: 'flatten',
	        value: function flatten() {
	            return map(this, 'flatten', arguments);
	        }

	        /**
	         * Query for all focused nodes.
	         *
	         * @category Tree
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'focused',
	        value: function focused() {
	            return map(this, 'focused', arguments);
	        }

	        /**
	         * Get a specific node in the collection, or undefined if it doesn't exist.
	         *
	         * @category Tree
	         * @param {int} index Numeric index of requested node.
	         * @return {TreeNode} Node object. Undefined if invalid index.
	         */

	    }, {
	        key: 'get',
	        value: function get() {
	            return map(this, 'get', arguments);
	        }

	        /**
	         * Query for all hidden nodes.
	         *
	         * @category Tree
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'hidden',
	        value: function hidden() {
	            return map(this, 'hidden', arguments);
	        }

	        /**
	         * Hide children in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'hide',
	        value: function hide() {
	            return map(this, 'hide', arguments);
	        }

	        /**
	         * Hide all children (deeply) in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'hideDeep',
	        value: function hideDeep() {
	            return map(this, 'hideDeep', arguments);
	        }

	        /**
	         * Query for all indeterminate nodes.
	         *
	         * @category Tree
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'indeterminate',
	        value: function indeterminate() {
	            return map(this, 'indeterminate', arguments);
	        }

	        /**
	         * Insert a new node at a given position.
	         *
	         * @category Tree
	         * @param {integer} index Index at which to insert the node.
	         * @param {object} object Raw node object or TreeNode.
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'insertAt',
	        value: function insertAt() {
	            return map(this, 'insertAt', arguments);
	        }

	        /**
	         * Invoke method(s) on each node.
	         *
	         * @category Tree
	         * @param {string|array} methods Method name(s).
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'invoke',
	        value: function invoke() {
	            return map(this, 'invoke', arguments);
	        }

	        /**
	         * Invoke method(s) deeply.
	         *
	         * @category Tree
	         * @param {string|array} methods Method name(s).
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'invokeDeep',
	        value: function invokeDeep() {
	            return map(this, 'invokeDeep', arguments);
	        }

	        /**
	         * Check if an object is a TreeNode.
	         *
	         * @category Tree
	         * @param {object} object Object
	         * @return {boolean} If object is a TreeNode.
	         */

	    }, {
	        key: 'isNode',
	        value: function isNode(object) {
	            return object instanceof _treenode.TreeNode;
	        }

	        /**
	         * Get the most recently selected node, if any.
	         *
	         * @category Tree
	         * @return {TreeNode} Last selected node, or undefined.
	         */

	    }, {
	        key: 'lastSelectedNode',
	        value: function lastSelectedNode() {
	            return this._lastSelectedNode;
	        }

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

	    }, {
	        key: 'load',
	        value: function load(loader) {
	            var tree = this;

	            return new _es6Promise.Promise(function (resolve, reject) {
	                var complete = function complete(nodes) {
	                    // Delay event for synchronous loader. Otherwise it fires
	                    // before the user has a chance to listen.
	                    if (!tree.initialized && _.isArray(nodes)) {
	                        setTimeout(function () {
	                            tree.emit('data.loaded', nodes);
	                        });
	                    } else {
	                        tree.emit('data.loaded', nodes);
	                    }

	                    // Clear and call rendering on existing data
	                    if (tree.model.length > 0) {
	                        tree.removeAll();
	                    }

	                    tree.model = (0, _collectionToModel.collectionToModel)(tree, nodes);

	                    if (tree.config.selection.require && !tree.selected().length) {
	                        tree.selectFirstAvailableNode();
	                    }

	                    // Delay event for synchronous loader
	                    if (!tree.initialized && _.isArray(nodes)) {
	                        setTimeout(function () {
	                            tree.emit('model.loaded', tree.model);
	                        });
	                    } else {
	                        tree.emit('model.loaded', tree.model);
	                    }

	                    resolve(tree.model);

	                    tree.dom.applyChanges();

	                    if (_.isFunction(tree.dom.scrollSelectedIntoView)) {
	                        tree.dom.scrollSelectedIntoView();
	                    }
	                };

	                var error = function error(err) {
	                    tree.emit('data.loaderror', err);
	                    reject(err);
	                };

	                // Data given already as an array
	                if (_.isArrayLike(loader)) {
	                    complete(loader);
	                }

	                // Data loader requires a caller/callback
	                else if (_.isFunction(loader)) {
	                        var resp = loader(null, complete, error);

	                        // Loader returned its own object
	                        if (resp) {
	                            loader = resp;
	                        }
	                    }

	                // Data loader is likely a promise
	                if (_.isObject(loader)) {
	                    (0, _standardizePromise.standardizePromise)(loader).then(complete).catch(error);
	                } else {
	                    throw new Error('Invalid data loader.');
	                }
	            });
	        }

	        /**
	         * Query for all loading nodes.
	         *
	         * @category Tree
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'loading',
	        value: function loading() {
	            return map(this, 'loading', arguments);
	        }

	        /*
	         * Pause events.
	         *
	         * @category Tree
	         * @param {array} events Event names to mute.
	         * @return {Tree} Tree instance.
	         */

	    }, {
	        key: 'mute',
	        value: function mute(events) {
	            if (_.isString(events) || _.isArray(events)) {
	                this._muted = _.castArray(events);
	            } else {
	                this._muted = true;
	            }

	            return this;
	        }

	        /**
	         * Get current mute settings.
	         *
	         * @category Tree
	         * @return {boolean|array} Muted events. If all, true.
	         */

	    }, {
	        key: 'muted',
	        value: function muted() {
	            return this._muted;
	        }

	        /**
	         * Get a node.
	         *
	         * @category Tree
	         * @param {string|number} id ID of node.
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'node',
	        value: function node() {
	            return map(this, 'node', arguments);
	        }

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

	    }, {
	        key: 'nodes',
	        value: function nodes() {
	            return map(this, 'nodes', arguments);
	        }

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

	    }, {
	        key: 'recurseDown',
	        value: function recurseDown() {
	            return map(this, 'recurseDown', arguments);
	        }

	        /**
	         * Reloads/re-executes the original data loader.
	         *
	         * @category Tree
	         * @return {Promise} Load method promise.
	         */

	    }, {
	        key: 'reload',
	        value: function reload() {
	            return this.load(this.opts.data || this.config.data);
	        }

	        /**
	         * Removes all nodes.
	         *
	         * @category Tree
	         * @return {Tree} Tree instance.
	         */

	    }, {
	        key: 'removeAll',
	        value: function removeAll() {
	            this.model = new _treenodes.TreeNodes(this);
	            this.dom.applyChanges();

	            return this;
	        }

	        /**
	         * Query for all soft-removed nodes.
	         *
	         * @category Tree
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'removed',
	        value: function removed() {
	            return map(this, 'removed', arguments);
	        }

	        /**
	         * Restore children in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'restore',
	        value: function restore() {
	            return map(this, 'restore', arguments);
	        }

	        /**
	         * Restore all children (deeply) in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'restoreDeep',
	        value: function restoreDeep() {
	            return map(this, 'restoreDeep', arguments);
	        }

	        /**
	         * Search nodes, showing only those that match and the necessary hierarchy.
	         *
	         * @category Tree
	         * @param {*} query Search string, RegExp, or function.
	         * @return {TreeNodes} Array of matching node objects.
	         */

	    }, {
	        key: 'search',
	        value: function search(query) {
	            var tree = this;
	            var matches = new _treenodes.TreeNodes(this);

	            var custom = tree.config.search;
	            if (_.isFunction(custom)) {
	                return custom(query, function resolver(nodes) {
	                    tree.dom.batch();

	                    tree.hideDeep();
	                    _.each(nodes, function (node) {
	                        tree.addNode(node);
	                    });

	                    tree.dom.end();
	                }, function rejecter(err) {
	                    tree.emit('tree.loaderror', err);
	                });
	            }

	            // Don't search if query empty
	            if (!query || _.isString(query) && _.isEmpty(query)) {
	                return tree.clearSearch();
	            }

	            if (_.isString(query)) {
	                query = new RegExp(query, 'i');
	            }

	            var predicate;
	            if (_.isRegExp(query)) {
	                predicate = function predicate(node) {
	                    return query.test(node.text);
	                };
	            } else {
	                predicate = query;
	            }

	            tree.dom.batch();

	            tree.model.recurseDown(function (node) {
	                if (!node.removed()) {
	                    var match = predicate(node);
	                    var wasHidden = node.hidden();
	                    node.state('hidden', !match);

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

	            tree.dom.end();

	            return matches;
	        }

	        /**
	         * Select children in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'select',
	        value: function select() {
	            return map(this, 'select', arguments);
	        }

	        /**
	         * Query for all selectable nodes.
	         *
	         * @category Tree
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'selectable',
	        value: function selectable() {
	            return map(this, 'selectable', arguments);
	        }

	        /**
	         * Select all nodes between a start and end node.
	         * Starting node must have a higher index path so we can work down to endNode.
	         *
	         * @category Tree
	         * @param {TreeNode} startNode Starting node
	         * @param {TreeNode} endNode Ending node
	         * @return {Tree} Tree instance.
	         */

	    }, {
	        key: 'selectBetween',
	        value: function selectBetween(startNode, endNode) {
	            this.dom.batch();

	            var node = startNode.nextVisibleNode();
	            while (node) {
	                if (node.id === endNode.id) {
	                    break;
	                }

	                node.select();

	                node = node.nextVisibleNode();
	            }

	            this.dom.end();

	            return this;
	        }
	    }, {
	        key: 'selectDeep',


	        /**
	         * Select all children (deeply) in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */
	        value: function selectDeep() {
	            return map(this, 'selectDeep', arguments);
	        }

	        /**
	         * Query for all selected nodes.
	         *
	         * @category Tree
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'selected',
	        value: function selected() {
	            return map(this, 'selected', arguments);
	        }

	        /**
	         * Select the first available node at the root level.
	         *
	         * @category Tree
	         * @return {TreeNode} Selected node object.
	         */

	    }, {
	        key: 'selectFirstAvailableNode',
	        value: function selectFirstAvailableNode() {
	            var node = this.model.filter('available').get(0);
	            if (node) {
	                node.select();
	            }

	            return node;
	        }
	    }, {
	        key: 'show',


	        /**
	         * Show children in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */
	        value: function show() {
	            return map(this, 'show', arguments);
	        }

	        /**
	         * Show all children (deeply) in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'showDeep',
	        value: function showDeep() {
	            return map(this, 'showDeep', arguments);
	        }

	        /**
	         * Soft-remove children in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'softRemove',
	        value: function softRemove() {
	            return map(this, 'softRemove', arguments);
	        }

	        /**
	         * Sorts all TreeNode objects in this collection.
	         *
	         * If no custom sorter given, the configured "sort" value will be used.
	         *
	         * @category Tree
	         * @param {string|function} sorter Sort function or property name.
	         * @return {TreeNodes} Array of node obejcts.
	         */

	    }, {
	        key: 'sort',
	        value: function sort() {
	            return map(this, 'sort', arguments);
	        }

	        /**
	         * Set state values for nodes in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'state',
	        value: function state() {
	            return map(this, 'state', arguments);
	        }

	        /**
	         * Set state values for nodes in this collection.
	         *
	         * @category Tree
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'stateDeep',
	        value: function stateDeep() {
	            return map(this, 'stateDeep', arguments);
	        }

	        /**
	         * Returns a native Array of nodes.
	         *
	         * @category Tree
	         * @return {array} Array of node objects.
	         */

	    }, {
	        key: 'toArray',
	        value: function toArray() {
	            return map(this, 'toArray', arguments);
	        }

	        /**
	         * Resume events.
	         *
	         * @category Tree
	         * @param {array} events Events to unmute.
	         * @return {Tree} Tree instance.
	         */

	    }, {
	        key: 'unmute',
	        value: function unmute(events) {
	            // Diff array and set to false if we're now empty
	            if (_.isString(events) || _.isArray(events)) {
	                this._muted = _.difference(this._muted, _.castArray(events));
	                if (!this._muted.length) {
	                    this._muted = false;
	                }
	            } else {
	                this._muted = false;
	            }

	            return this;
	        }
	    }, {
	        key: 'visible',


	        /**
	         * Query for all visible nodes.
	         *
	         * @category Tree
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */
	        value: function visible() {
	            return map(this, 'visible', arguments);
	        }
	    }]);

	    return InspireTree;
	}(_eventemitter.EventEmitter2);

	exports.default = InspireTree;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.collectionToModel = collectionToModel;

	var _lodash = __webpack_require__(1);

	var _ = _interopRequireWildcard(_lodash);

	var _objectToNode = __webpack_require__(3);

	var _treenodes = __webpack_require__(12);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
	    var collection = new _treenodes.TreeNodes(tree);

	    // Sort
	    if (tree.config.sort) {
	        array = _.sortBy(array, tree.config.sort);
	    }

	    _.each(array, function (node) {
	        collection.push((0, _objectToNode.objectToNode)(tree, node, parent));
	    });

	    collection._context = parent;

	    return collection;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.objectToNode = objectToNode;

	var _lodash = __webpack_require__(1);

	var _ = _interopRequireWildcard(_lodash);

	var _collectionToModel = __webpack_require__(2);

	var _cuid = __webpack_require__(4);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _treenode = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
	    object.id = object.id || (0, _cuid2.default)();
	    if (typeof object.id !== 'string') {
	        object.id = object.id.toString();
	    }

	    // High-performance default assignments
	    var itree = object.itree = object.itree || {};
	    itree.icon = itree.icon || false;

	    var li = itree.li = itree.li || {};
	    li.attributes = li.attributes || {};

	    var a = itree.a = itree.a || {};
	    a.attributes = a.attributes || {};

	    var state = itree.state = itree.state || {};

	    // Enabled by default
	    state.collapsed = typeof state.collapsed === 'boolean' ? state.collapsed : tree.defaultState.collapsed;
	    state.selectable = typeof state.selectable === 'boolean' ? state.selectable : tree.defaultState.selectable;

	    // Disabled by default
	    state.editable = typeof state.editable === 'boolean' ? state.editable : tree.defaultState.editable;
	    state.editing = typeof state.editing === 'boolean' ? state.editing : tree.defaultState.editing;
	    state.focused = state.focused || tree.defaultState.focused;
	    state.hidden = state.hidden || tree.defaultState.hidden;
	    state.indeterminate = state.indeterminate || tree.defaultState.indeterminate;
	    state.loading = state.loading || tree.defaultState.loading;
	    state.removed = state.removed || tree.defaultState.removed;
	    state.selected = state.selected || tree.defaultState.selected;

	    // Save parent, if any.
	    object.itree.parent = parent;

	    // Wrap
	    object = _.assign(new _treenode.TreeNode(tree), object);

	    if (object.hasChildren()) {
	        object.children = (0, _collectionToModel.collectionToModel)(tree, object.children, object);
	    }

	    // Fire events for pre-set states, if enabled
	    if (tree.allowsLoadEvents) {
	        _.each(tree.config.allowLoadEvents, function (eventName) {
	            if (state[eventName]) {
	                tree.emit('node.' + eventName, object);
	            }
	        });
	    }

	    return object;
	};

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Libs

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TreeNode = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _lodash = __webpack_require__(1);

	var _ = _interopRequireWildcard(_lodash);

	var _collectionToModel = __webpack_require__(2);

	var _objectToNode = __webpack_require__(3);

	var _es6Promise = __webpack_require__(6);

	var _recurseDown2 = __webpack_require__(11);

	var _standardizePromise = __webpack_require__(13);

	var _treenodes = __webpack_require__(12);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	        if (node._tree.config.nodes.resetStateOnRestore && verb === 'restored') {
	            resetState(node);
	        }

	        node.state(prop, value);

	        node._tree.emit('node.' + verb, node);

	        if (deep && node.hasChildren()) {
	            node.getChildren().invokeDeep(deep);
	        }

	        node.markDirty();
	        node._tree.dom.applyChanges();
	    }

	    return node;
	};

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
	    excludeKeys = _.castArray(excludeKeys);
	    excludeKeys.push('ref');

	    _.each(itree, function (v, k) {
	        if (!_.includes(excludeKeys, k)) {
	            clone[k] = _.cloneDeep(v);
	        }
	    });

	    return clone;
	}

	/**
	 * Reset a node's state to the tree default.
	 *
	 * @private
	 * @param {TreeNode} node Node object.
	 * @returns {TreeNode} Node object.
	 */
	function resetState(node) {
	    _.each(node._tree.defaultState, function (val, prop) {
	        node.state(prop, val);
	    });

	    return node;
	}

	/**
	 * Represents a singe node object within the tree.
	 *
	 * @category TreeNode
	 * @param {TreeNode} source TreeNode to copy.
	 * @return {TreeNode} Tree node object.
	 */

	var TreeNode = exports.TreeNode = function () {
	    function TreeNode(tree, source, excludeKeys) {
	        _classCallCheck(this, TreeNode);

	        var node = this;
	        node._tree = tree;

	        if (source instanceof TreeNode) {
	            excludeKeys = _.castArray(excludeKeys);
	            excludeKeys.push('_tree');

	            // Iterate manually for better perf
	            _.each(source, function (value, key) {
	                // Skip vars
	                if (!_.includes(excludeKeys, key)) {
	                    if (_.isObject(value)) {
	                        if (value instanceof _treenodes.TreeNodes) {
	                            node[key] = value.clone();
	                        } else if (key === 'itree') {
	                            node[key] = cloneItree(value);
	                        } else {
	                            node[key] = _.cloneDeep(value);
	                        }
	                    } else {
	                        // Copy primitives
	                        node[key] = value;
	                    }
	                }
	            });
	        }
	    }

	    /**
	     * Add a child to this node.
	     *
	     * @category TreeNode
	     * @param {object} child Node object.
	     * @return {TreeNode} Node object.
	     */


	    _createClass(TreeNode, [{
	        key: 'addChild',
	        value: function addChild(child) {
	            if (_.isArray(this.children) || !_.isArrayLike(this.children)) {
	                this.children = new _treenodes.TreeNodes(this._tree);
	                this.children._context = this;
	            }

	            return this.children.addNode(child);
	        }

	        /**
	         * Get if node available.
	         *
	         * @category TreeNode
	         * @return {boolean} If available.
	         */

	    }, {
	        key: 'available',
	        value: function available() {
	            return !this.hidden() && !this.removed();
	        }

	        /**
	         * Blur focus from this node.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'blur',
	        value: function blur() {
	            this.state('editing', false);

	            return baseStateChange('focused', false, 'blurred', this);
	        }
	    }, {
	        key: 'clean',


	        /**
	         * Hides parents without any visible children.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */
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
	         * Clones this node.
	         *
	         * @category TreeNode
	         * @param {array} excludeKeys Keys to exclude from the clone.
	         * @return {TreeNode} New node object.
	         */

	    }, {
	        key: 'clone',
	        value: function clone(excludeKeys) {
	            return new TreeNode(this._tree, this, excludeKeys);
	        }

	        /**
	         * Collapse this node.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'collapse',
	        value: function collapse() {
	            return baseStateChange('collapsed', true, 'collapsed', this);
	        }

	        /**
	         * Get whether this node is collapsed.
	         *
	         * @category TreeNode
	         * @return {boolean} Get if node collapsed.
	         */

	    }, {
	        key: 'collapsed',
	        value: function collapsed() {
	            return this.state('collapsed');
	        }

	        /**
	         * Get the containing context. If no parent present, the root context is returned.
	         *
	         * @category TreeNode
	         * @return {TreeNodes} Node array object.
	         */

	    }, {
	        key: 'context',
	        value: function context() {
	            return this.hasParent() ? this.getParent().children : this._tree.model;
	        }

	        /**
	         * Copies node to a new tree instance.
	         *
	         * @category TreeNode
	         * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
	         * @return {object} Property "to" for defining destination.
	         */

	    }, {
	        key: 'copy',
	        value: function copy(hierarchy) {
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
	                    if (!_.isFunction(dest.addNode)) {
	                        throw new Error('Destination must be an Inspire Tree instance.');
	                    }

	                    return dest.addNode(node.toObject());
	                }
	            };
	        }

	        /**
	         * Copies all parents of a node.
	         *
	         * @category TreeNode
	         * @param {boolean} excludeNode Exclude given node from hierarchy.
	         * @return {TreeNode} Root node object with hierarchy.
	         */

	    }, {
	        key: 'copyHierarchy',
	        value: function copyHierarchy(excludeNode) {
	            var node = this;
	            var nodes = [];
	            var parents = node.getParents();

	            // Remove old hierarchy data
	            _.each(parents, function (node) {
	                nodes.push(node.toObject(excludeNode));
	            });

	            parents = nodes.reverse();

	            if (!excludeNode) {
	                var clone = node.toObject(true);

	                // Filter out hidden children
	                if (node.hasChildren()) {
	                    clone.children = node.children.filter(function (n) {
	                        return !n.state('hidden');
	                    }).toArray();

	                    clone.children._context = clone;
	                }

	                nodes.push(clone);
	            }

	            var hierarchy = nodes[0];
	            var pointer = hierarchy;
	            var l = nodes.length;
	            _.each(nodes, function (parent, key) {
	                var children = [];

	                if (key + 1 < l) {
	                    children.push(nodes[key + 1]);
	                    pointer.children = children;

	                    pointer = pointer.children[0];
	                }
	            });

	            return (0, _objectToNode.objectToNode)(this._tree, hierarchy);
	        }
	    }, {
	        key: 'deselect',


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
	        value: function deselect(skipParentIndeterminate) {
	            if (this.selected() && (!this._tree.config.selection.require || this._tree.selected().length > 1)) {
	                var node = this;
	                this._tree.dom.batch();

	                this.state('indeterminate', false);
	                baseStateChange('selected', false, 'deselected', this);

	                // If children were auto-selected
	                if (this._tree.config.selection.autoSelectChildren) {
	                    // Deselect all children
	                    if (node.hasChildren()) {
	                        node.children.each(function (child) {
	                            child.deselect(true);
	                        });
	                    }

	                    if (node.hasParent()) {
	                        // Set indeterminate state for parent
	                        if (this._tree.config.showCheckboxes && !skipParentIndeterminate) {
	                            node.getParent().refreshIndeterminateState();
	                        } else {
	                            // Deselect parent node
	                            baseStateChange('selected', false, 'deselected', node.getParent());
	                        }
	                    }
	                }

	                this._tree.dom.end();
	            }

	            return this;
	        }

	        /**
	         * Get if node editable. Required editing.edit to be enable via config.
	         *
	         * @category TreeNode
	         * @return {boolean} If node editable.
	         */

	    }, {
	        key: 'editable',
	        value: function editable() {
	            return this._tree.config.editable && this._tree.config.editing.edit && this.state('editable');
	        }

	        /**
	         * Get if node is currently in edit mode.
	         *
	         * @category TreeNode
	         * @return {boolean} If node in edit mode.
	         */

	    }, {
	        key: 'editing',
	        value: function editing() {
	            return this.state('editing');
	        }

	        /**
	         * Expand this node.
	         *
	         * @category TreeNode
	         * @return {Promise} Promise resolved on successful load and expand of children.
	         */

	    }, {
	        key: 'expand',
	        value: function expand() {
	            var node = this;

	            return new _es6Promise.Promise(function (resolve, reject) {
	                var allow = node.hasChildren() || node._tree.isDynamic && node.children === true;

	                if (allow && (node.collapsed() || node.hidden())) {
	                    node.state('collapsed', false);
	                    node.state('hidden', false);

	                    node._tree.emit('node.expanded', node);

	                    if (node._tree.isDynamic && node.children === true) {
	                        node.loadChildren().then(resolve).catch(reject);
	                    } else {
	                        node.markDirty();
	                        node._tree.dom.applyChanges();
	                        resolve(node);
	                    }
	                } else {
	                    // Resolve immediately
	                    resolve(node);
	                }
	            });
	        }

	        /**
	         * Get if node expanded.
	         *
	         * @category TreeNode
	         * @return {boolean} If expanded.
	         */

	    }, {
	        key: 'expanded',
	        value: function expanded() {
	            return !this.collapsed();
	        }

	        /**
	         * Expand parent nodes.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'expandParents',
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
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'focus',
	        value: function focus() {
	            var node = this;

	            if (!node.focused()) {
	                // Batch selection changes
	                this._tree.dom.batch();
	                this._tree.blurDeep();
	                node.state('focused', true);

	                // Emit this event
	                this._tree.emit('node.focused', node);

	                // Mark hierarchy dirty and apply
	                node.markDirty();
	                this._tree.dom.end();
	            }

	            return node;
	        }

	        /**
	         * Get whether this node is focused.
	         *
	         * @category TreeNode
	         * @return {boolean} Get if node focused.
	         */

	    }, {
	        key: 'focused',
	        value: function focused() {
	            return this.state('focused');
	        }

	        /**
	         * Get children for this node. If no children exist, an empty TreeNodes
	         * collection is returned for safe chaining.
	         *
	         * @category TreeNode
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'getChildren',
	        value: function getChildren() {
	            return this.hasChildren() ? this.children : new _treenodes.TreeNodes(this._tree);
	        }

	        /**
	         * Get the immediate parent, if any.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'getParent',
	        value: function getParent() {
	            return this.itree.parent;
	        }

	        /**
	         * Returns parent nodes. Excludes any siblings.
	         *
	         * @category TreeNode
	         * @return {TreeNodes} Node objects.
	         */

	    }, {
	        key: 'getParents',
	        value: function getParents() {
	            var parents = new _treenodes.TreeNodes(this._tree);

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
	         * @category TreeNode
	         * @return {array} Array of node texts.
	         */

	    }, {
	        key: 'getTextualHierarchy',
	        value: function getTextualHierarchy() {
	            var paths = [];

	            this.recurseUp(function (node) {
	                paths.unshift(node.text);
	            });

	            return paths;
	        }

	        /**
	         * If node has any children.
	         *
	         * @category TreeNode
	         * @return {boolean} If children.
	         */

	    }, {
	        key: 'hasChildren',
	        value: function hasChildren() {
	            return _.isArrayLike(this.children) && this.children.length > 0;
	        }

	        /**
	         * If node has a parent.
	         *
	         * @category TreeNode
	         * @return {boolean} If parent.
	         */

	    }, {
	        key: 'hasParent',
	        value: function hasParent() {
	            return Boolean(this.itree.parent);
	        }

	        /**
	         * If node has any visible children.
	         *
	         * @category TreeNode
	         * @return {boolean} If visible children.
	         */

	    }, {
	        key: 'hasVisibleChildren',
	        value: function hasVisibleChildren() {
	            var hasVisibleChildren = false;

	            if (this.hasChildren()) {
	                hasVisibleChildren = this.children.filter('available').length > 0;
	            }

	            return hasVisibleChildren;
	        }

	        /**
	         * Hide this node.
	         *
	         * @category TreeNode
	         * @return {object} Node object.
	         */

	    }, {
	        key: 'hide',
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
	         * @category TreeNode
	         * @return {boolean} Get if node hidden.
	         */

	    }, {
	        key: 'hidden',
	        value: function hidden() {
	            return this.state('hidden');
	        }

	        /**
	         * Returns a "path" of indices, values which map this node's location within all parent contexts.
	         *
	         * @category TreeNode
	         * @return {string} Index path
	         */

	    }, {
	        key: 'indexPath',
	        value: function indexPath() {
	            var indices = [];

	            this.recurseUp(function (node) {
	                indices.push(_.indexOf(node.context(), node));
	            });

	            return indices.reverse().join('.');
	        }

	        /**
	         * Get whether this node is indeterminate.
	         *
	         * @category TreeNode
	         * @return {boolean} Get if node indeterminate.
	         */

	    }, {
	        key: 'indeterminate',
	        value: function indeterminate() {
	            return this.state('indeterminate');
	        }

	        /**
	         * Find the last + deepest visible child of the previous sibling.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'lastDeepestVisibleChild',
	        value: function lastDeepestVisibleChild() {
	            var found;

	            if (this.hasChildren() && !this.collapsed()) {
	                found = _.findLast(this.children, function (node) {
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
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'loadChildren',
	        value: function loadChildren() {
	            var node = this;

	            return new _es6Promise.Promise(function (resolve, reject) {
	                if (!node._tree.isDynamic || node.children !== true) {
	                    reject(new Error('Node does not have or support dynamic children.'));
	                }

	                node.state('loading', true);
	                node.markDirty();
	                node._tree.dom.applyChanges();

	                var complete = function complete(results) {
	                    node._tree.dom.batch();
	                    node.state('loading', false);
	                    node.children = (0, _collectionToModel.collectionToModel)(node._tree, results, node);
	                    node.markDirty();
	                    node._tree.dom.end();

	                    resolve(node.children);

	                    node._tree.emit('children.loaded', node);
	                };

	                var error = function error(err) {
	                    node.state('loading', false);
	                    node.children = new _treenodes.TreeNodes(node._tree);
	                    node.children._context = node;
	                    node.markDirty();
	                    node._tree.dom.applyChanges();

	                    reject(err);

	                    node._tree.emit('tree.loaderror', err);
	                };

	                var loader = node._tree.config.data(node, complete, error);

	                // Data loader is likely a promise
	                if (_.isObject(loader)) {
	                    (0, _standardizePromise.standardizePromise)(loader).then(complete).catch(error);
	                }
	            });
	        }

	        /**
	         * Get whether this node is loading child data.
	         *
	         * @category TreeNode
	         * @return {boolean} Get if node loading.
	         */

	    }, {
	        key: 'loading',
	        value: function loading() {
	            return this.state('loading');
	        }

	        /**
	         * Mark a node as dirty, rebuilding this node in the virtual DOM
	         * and rerendering to the live DOM, next time applyChanges is called.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'markDirty',
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
	         * Find the next visible sibling of our ancestor. Continues
	         * seeking up the tree until a valid node is found or we
	         * reach the root node.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'nextVisibleAncestralSiblingNode',
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
	         * @category TreeNode
	         * @return {TreeNode} Node object, if any.
	         */

	    }, {
	        key: 'nextVisibleChildNode',
	        value: function nextVisibleChildNode() {
	            var startingNode = this;
	            var next;

	            if (startingNode.hasChildren()) {
	                next = _.find(startingNode.children, function (child) {
	                    return child.visible();
	                });
	            }

	            return next;
	        }

	        /**
	         * Get the next visible node.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object if any.
	         */

	    }, {
	        key: 'nextVisibleNode',
	        value: function nextVisibleNode() {
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
	        }

	        /**
	         * Find the next visible sibling node.
	         *
	         * @category TreeNode
	         * @return {object} Node object, if any.
	         */

	    }, {
	        key: 'nextVisibleSiblingNode',
	        value: function nextVisibleSiblingNode() {
	            var startingNode = this;
	            var context = startingNode.hasParent() ? startingNode.getParent().children : this._tree.nodes();
	            var i = _.findIndex(context, { id: startingNode.id });

	            return _.find(_.slice(context, i + 1), function (node) {
	                return node.visible();
	            });
	        }

	        /**
	         * Find the previous visible node.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object, if any.
	         */

	    }, {
	        key: 'previousVisibleNode',
	        value: function previousVisibleNode() {
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
	        }

	        /**
	         * Find the previous visible sibling node.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object, if any.
	         */

	    }, {
	        key: 'previousVisibleSiblingNode',
	        value: function previousVisibleSiblingNode() {
	            var context = this.hasParent() ? this.getParent().children : this._tree.nodes();
	            var i = _.findIndex(context, { id: this.id });
	            return _.findLast(_.slice(context, 0, i), function (node) {
	                return node.visible();
	            });
	        }

	        /**
	         * Iterate down node and any children.
	         *
	         * @category TreeNode
	         * @param {function} iteratee Iteratee function.
	         * @return {TreeNode} Resulting node.
	         */

	    }, {
	        key: 'recurseDown',
	        value: function recurseDown(iteratee) {
	            (0, _recurseDown2.recurseDown)(this, iteratee);

	            return this;
	        }

	        /**
	         * Iterate up a node and its parents.
	         *
	         * @category TreeNode
	         * @param {function} iteratee Iteratee function.
	         * @return {TreeNode} Resulting node.
	         */

	    }, {
	        key: 'recurseUp',
	        value: function recurseUp(iteratee) {
	            var result = iteratee(this);

	            if (result !== false && this.hasParent()) {
	                this.getParent().recurseUp(iteratee);
	            }

	            return this;
	        }

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

	    }, {
	        key: 'refreshIndeterminateState',
	        value: function refreshIndeterminateState() {
	            var node = this;
	            var oldValue = node.state('indeterminate');
	            node.state('indeterminate', false);

	            if (this._tree.config.showCheckboxes) {
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
	                    node.state('selected', selected === childrenCount);

	                    // Set indeterminate if any children are, or some children are selected
	                    if (!node.selected()) {
	                        node.state('indeterminate', indeterminate > 0 || childrenCount > 0 && selected > 0 && selected < childrenCount);
	                    }
	                }

	                if (node.hasParent()) {
	                    node.getParent().refreshIndeterminateState();
	                }

	                if (oldValue !== node.state('indeterminate')) {
	                    node.markDirty();
	                }
	            }

	            return node;
	        }

	        /**
	         * Remove a node from the tree.
	         *
	         * @category TreeNode
	         * @return {object} Removed tree node object.
	         */

	    }, {
	        key: 'remove',
	        value: function remove() {
	            var node = this;

	            var parent;
	            if (node.hasParent()) {
	                parent = node.getParent();
	            }

	            var context = parent ? parent.children : this._tree.model;
	            _.remove(context, { id: node.id });

	            if (parent) {
	                parent.refreshIndeterminateState();
	            }

	            var exported = node.toObject();
	            this._tree.emit('node.removed', exported);

	            this._tree.dom.applyChanges();

	            return exported;
	        }

	        /**
	         * Get whether this node is soft-removed.
	         *
	         * @category TreeNode
	         * @return {boolean} Get if node removed.
	         */

	    }, {
	        key: 'removed',
	        value: function removed() {
	            return this.state('removed');
	        }

	        /**
	         * Restore state if soft-removed.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'restore',
	        value: function restore() {
	            return baseStateChange('removed', false, 'restored', this);
	        }

	        /**
	         * Select this node.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'select',
	        value: function select() {
	            var node = this;

	            if (!node.selected() && node.selectable()) {
	                // Batch selection changes
	                node._tree.dom.batch();

	                if (node._tree.canAutoDeselect()) {
	                    var oldVal = node._tree.config.selection.require;
	                    node._tree.config.selection.require = false;
	                    node._tree.deselectDeep();
	                    node._tree.config.selection.require = oldVal;
	                }

	                node.state('selected', true);

	                if (node._tree.config.selection.autoSelectChildren) {
	                    if (node.hasChildren()) {
	                        node.children.recurseDown(function (child) {
	                            baseStateChange('selected', true, 'selected', child);
	                        });
	                    }

	                    if (node._tree.config.showCheckboxes && node.hasParent()) {
	                        node.getParent().refreshIndeterminateState();
	                    }
	                }

	                // Cache as the last selected node
	                node._tree._lastSelectedNode = node;

	                // Emit this event
	                node._tree.emit('node.selected', node);

	                // Mark hierarchy dirty and apply
	                node.markDirty();
	                node._tree.dom.end();
	            }

	            return node;
	        }

	        /**
	         * Get if node selectable.
	         *
	         * @category TreeNode
	         * @return {boolean} If node selectable.
	         */

	    }, {
	        key: 'selectable',
	        value: function selectable() {
	            var allow = this._tree.config.selection.allow(this);
	            return typeof allow === 'boolean' ? allow : this.state('selectable');
	        }

	        /**
	         * Get whether this node is selected.
	         *
	         * @category TreeNode
	         * @return {boolean} Get if node selected.
	         */

	    }, {
	        key: 'selected',
	        value: function selected() {
	            return this.state('selected');
	        }

	        /**
	         * Set a root property on this node.
	         *
	         * @category TreeNode
	         * @param {string|number} property Property name.
	         * @param {*} value New value.
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'set',
	        value: function set(property, value) {
	            this[property] = value;
	            this.markDirty();

	            return this;
	        }

	        /**
	         * Show this node.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'show',
	        value: function show() {
	            return baseStateChange('hidden', false, 'shown', this);
	        }

	        /**
	         * Get or set a state value.
	         *
	         * This is a base method and will not invoke related changes, for example
	         * setting selected=false will not trigger any deselection logic.
	         *
	         * @category TreeNode
	         * @param {string} name Property name.
	         * @param {boolean} newVal New value, if setting.
	         * @return {boolean} Current value on read, old value on set.
	         */

	    }, {
	        key: 'state',
	        value: function state(name, newVal) {
	            var currentVal = this.itree.state[name];

	            if (typeof newVal !== 'undefined' && currentVal !== newVal) {
	                // Update values
	                this.itree.state[name] = newVal;
	                this.markDirty();

	                // Emit an event
	                this._tree.emit('node.state.changed', this, name, currentVal, newVal);
	            }

	            return currentVal;
	        }

	        /**
	         * Mark this node as "removed" without actually removing it.
	         *
	         * Expand/show methods will never reveal this node until restored.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'softRemove',
	        value: function softRemove() {
	            return baseStateChange('removed', true, 'softremoved', this, 'softRemove');
	        }

	        /**
	         * Toggles collapsed state.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'toggleCollapse',
	        value: function toggleCollapse() {
	            return this.collapsed() ? this.expand() : this.collapse();
	        }
	    }, {
	        key: 'toggleEditing',
	        value: function toggleEditing() {
	            this.state('editing', !this.state('editing'));

	            this.markDirty();
	            this._tree.dom.applyChanges();
	        }

	        /**
	         * Toggles selected state.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'toggleSelect',
	        value: function toggleSelect() {
	            return this.selected() ? this.deselect() : this.select();
	        }

	        /**
	         * Export this node as a native Object.
	         *
	         * @category TreeNode
	         * @param {boolean} excludeChildren Exclude children.
	         * @return {object} Node object.
	         */

	    }, {
	        key: 'toObject',
	        value: function toObject(excludeChildren) {
	            var object = {};

	            _.each(this, function (v, k) {
	                if (k !== '_tree' && k !== 'children' && k !== 'itree') {
	                    object[k] = v;
	                }
	            });

	            if (!excludeChildren && this.hasChildren() && _.isFunction(this.children.toArray)) {
	                object.children = this.children.toArray();
	            }

	            return object;
	        }

	        /**
	         * Checks whether a node is visible to a user. Returns false
	         * if it's hidden, or if any ancestor is hidden or collapsed.
	         *
	         * @category TreeNode
	         * @param {object} node Node object.
	         * @return {boolean} Whether visible.
	         */

	    }, {
	        key: 'visible',
	        value: function visible() {
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
	        }
	    }]);

	    return TreeNode;
	}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
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
	  var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

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
	      var vertx = __webpack_require__(9);
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

	    var child = new this.constructor(lib$es6$promise$$internal$$noop);

	    if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
	      lib$es6$promise$$internal$$makePromise(child);
	    }

	    var state = parent._state;

	    if (state) {
	      var callback = arguments[state - 1];
	      lib$es6$promise$asap$$asap(function () {
	        lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
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
	  var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);

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

	  var lib$es6$promise$$internal$$id = 0;
	  function lib$es6$promise$$internal$$nextId() {
	    return lib$es6$promise$$internal$$id++;
	  }

	  function lib$es6$promise$$internal$$makePromise(promise) {
	    promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
	    promise._state = undefined;
	    promise._result = undefined;
	    promise._subscribers = [];
	  }

	  function lib$es6$promise$promise$all$$all(entries) {
	    return new lib$es6$promise$enumerator$$default(this, entries).promise;
	  }
	  var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	  function lib$es6$promise$promise$race$$race(entries) {
	    /*jshint validthis:true */
	    var Constructor = this;

	    if (!lib$es6$promise$utils$$isArray(entries)) {
	      return new Constructor(function (resolve, reject) {
	        reject(new TypeError('You must pass an array to race.'));
	      });
	    } else {
	      return new Constructor(function (resolve, reject) {
	        var length = entries.length;
	        for (var i = 0; i < length; i++) {
	          Constructor.resolve(entries[i]).then(resolve, reject);
	        }
	      });
	    }
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
	    this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
	    this._result = this._state = undefined;
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

	    if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
	      lib$es6$promise$$internal$$makePromise(this.promise);
	    }

	    if (lib$es6$promise$utils$$isArray(input)) {
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
	      lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
	    }
	  }

	  function lib$es6$promise$enumerator$$validationError() {
	    return new Error('Array Methods must be provided an Array');
	  }

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
	  if ("function" === 'function' && __webpack_require__(10)['amd']) {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), (function() { return this; }()), __webpack_require__(8)(module)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function cachedSetTimeout() {
	            throw new Error('setTimeout is not defined');
	        };
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function cachedClearTimeout() {
	            throw new Error('clearTimeout is not defined');
	        };
	    }
	})();
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
	    var timeout = cachedSetTimeout(cleanUpNextTick);
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
	    cachedClearTimeout(timeout);
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
	        cachedSetTimeout(drainQueue, 0);
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
/* 8 */
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
/* 9 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.recurseDown = recurseDown;

	var _lodash = __webpack_require__(1);

	var _ = _interopRequireWildcard(_lodash);

	var _treenode = __webpack_require__(5);

	var _treenodes = __webpack_require__(12);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

	    if (obj instanceof _treenodes.TreeNodes) {
	        _.each(obj, function (node) {
	            res = recurseDown(node, iteratee);

	            return res;
	        });
	    } else if (obj instanceof _treenode.TreeNode) {
	        res = iteratee(obj);

	        // Recurse children
	        if (res !== false && obj.hasChildren()) {
	            res = recurseDown(obj.children, iteratee);
	        }
	    }

	    return res;
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Libs

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TreeNodes = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _lodash = __webpack_require__(1);

	var _ = _interopRequireWildcard(_lodash);

	var _objectToNode = __webpack_require__(3);

	var _es6Promise = __webpack_require__(6);

	var _recurseDown2 = __webpack_require__(11);

	var _treenode = __webpack_require__(5);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	};

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
	    methods = _.castArray(methods);

	    nodes._tree.dom.batch();

	    nodes[deep ? 'recurseDown' : 'each'](function (node) {
	        _.each(methods, function (method) {
	            if (_.isFunction(node[method])) {
	                node[method].apply(node, args);
	            }
	        });
	    });

	    nodes._tree.dom.end();

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
	    if (_.isString(predicate)) {
	        fn = function fn(node) {
	            return _.isFunction(node[predicate]) ? node[predicate]() : node[predicate];
	        };
	    }

	    return fn;
	}

	/**
	 * An Array-like collection of TreeNodes.
	 *
	 * Note: Due to issue in many javascript environments,
	 * native objects are problematic to extend correctly
	 * so we mimic it, not actually extend it.
	 *
	 * @category TreeNodes
	 * @param {array} array Array of TreeNode objects.
	 * @return {TreeNodes} Collection of TreeNode
	 */

	var TreeNodes = exports.TreeNodes = function (_extendableBuiltin2) {
	    _inherits(TreeNodes, _extendableBuiltin2);

	    function TreeNodes(tree, array) {
	        _classCallCheck(this, TreeNodes);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TreeNodes).call(this));

	        _this._tree = tree;
	        _this.length = 0;

	        var treeNodes = _this;
	        if (_.isArray(array) || array instanceof TreeNodes) {
	            _.each(array, function (node) {
	                if (node instanceof _treenode.TreeNode) {
	                    treeNodes.push(node.clone());
	                }
	            });
	        }
	        return _this;
	    }

	    /**
	     * Adds a new node to this collection. If a sort
	     * method is configured, the node will be added
	     * in the appropriate order.
	     *
	     * @category TreeNodes
	     * @param {object} object Node
	     * @return {TreeNode} Node object.
	     */


	    _createClass(TreeNodes, [{
	        key: 'addNode',
	        value: function addNode(object) {
	            // Base insertion index
	            var index = this.length;

	            // If tree is sorted, insert in correct position
	            if (this._tree.config.sort) {
	                index = _.sortedIndexBy(this, object, this._tree.config.sort);
	            }

	            return this.insertAt(index, object);
	        }

	        /**
	         * Query for all available nodes.
	         *
	         * @category TreeNodes
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'available',
	        value: function available(full) {
	            return baseStatePredicate.call(this._tree, 'available', full);
	        }

	        /**
	         * Blur children in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'blur',
	        value: function blur() {
	            return this.invoke('blur');
	        }

	        /**
	         * Blur all children (deeply) in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'blurDeep',
	        value: function blurDeep() {
	            return this.invokeDeep('blur');
	        }

	        /**
	         * Clean children in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'clean',
	        value: function clean() {
	            return this.invoke('clean');
	        }

	        /**
	         * Clones (deep) the array of nodes.
	         *
	         * Note: Cloning will *not* clone the context pointer.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of cloned nodes.
	         */

	    }, {
	        key: 'clone',
	        value: function clone() {
	            return new TreeNodes(this._tree, this);
	        }

	        /**
	         * Collapse children in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'collapse',
	        value: function collapse() {
	            return this.invoke('collapse');
	        }

	        /**
	         * Query for all collapsed nodes.
	         *
	         * @category TreeNodes
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'collapsed',
	        value: function collapsed(full) {
	            return baseStatePredicate.call(this._tree, 'collapsed', full);
	        }

	        /**
	         * Collapse all children (deeply) in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'collapseDeep',
	        value: function collapseDeep() {
	            return this.invokeDeep('collapse');
	        }

	        /**
	         * Concat nodes like an Array would.
	         *
	         * @category TreeNodes
	         * @param {TreeNodes} nodes Array of nodes.
	         * @return {TreeNodes} Resulting node array.
	         */

	    }, {
	        key: 'concat',
	        value: function concat(nodes) {
	            var newNodes = new TreeNodes(this._tree);
	            newNodes._context = this._context;

	            var pusher = function pusher(node) {
	                if (node instanceof _treenode.TreeNode) {
	                    newNodes.push(node);
	                }
	            };

	            _.each(this, pusher);
	            _.each(nodes, pusher);

	            return newNodes;
	        }

	        /**
	         * Get the context of this collection. If a collection
	         * of children, context is the parent node. Otherwise
	         * the context is the tree itself.
	         *
	         * @category TreeNodes
	         * @return {TreeNode|object} Node object or tree instance.
	         */

	    }, {
	        key: 'context',
	        value: function context() {
	            return this._context || this._tree;
	        }

	        /**
	         * Copies nodes to a new tree instance.
	         *
	         * @category TreeNodes
	         * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
	         * @return {object} Methods to perform action on copied nodes.
	         */

	    }, {
	        key: 'copy',
	        value: function copy(hierarchy) {
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
	                    if (!_.isFunction(dest.addNodes)) {
	                        throw new Error('Destination must be an Inspire Tree instance.');
	                    }

	                    var newNodes = new TreeNodes(this._tree);

	                    _.each(nodes, function (node) {
	                        newNodes.push(node.copy(hierarchy).to(dest));
	                    });

	                    return newNodes;
	                }
	            };
	        }

	        /**
	         * Returns deepest nodes from this array.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'deepest',
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
	         * Deselect children in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'deselect',
	        value: function deselect() {
	            return this.invoke('deselect');
	        }

	        /**
	         * Deselect all children (deeply) in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'deselectDeep',
	        value: function deselectDeep() {
	            return this.invokeDeep('deselect');
	        }

	        /**
	         * Iterate every TreeNode in this collection.
	         *
	         * @category TreeNodes
	         * @param {function} iteratee Iteratee invoke for each node.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'each',
	        value: function each(iteratee) {
	            _.each(this, iteratee);

	            return this;
	        }

	        /**
	         * Query for all editable nodes.
	         *
	         * @category TreeNodes
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'editable',
	        value: function editable(full) {
	            return baseStatePredicate.call(this._tree, 'editable', full);
	        }

	        /**
	         * Query for all nodes in editing mode.
	         *
	         * @category TreeNodes
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'editing',
	        value: function editing(full) {
	            return baseStatePredicate.call(this._tree, 'editing', full);
	        }

	        /**
	         * Expand children in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'expand',
	        value: function expand() {
	            return this.invoke('expand');
	        }

	        /**
	         * Query for all expanded nodes.
	         *
	         * @category TreeNodes
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'expanded',
	        value: function expanded(full) {
	            return baseStatePredicate.call(this._tree, 'expanded', full);
	        }

	        /**
	         * Recursively expands all nodes, loading all dynamic calls.
	         *
	         * @category TreeNodes
	         * @return {Promise} Promise resolved only when all children have loaded and expanded.
	         */

	    }, {
	        key: 'expandDeep',
	        value: function expandDeep() {
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
	        }

	        /**
	         * Expand parents of children in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'expandParents',
	        value: function expandParents() {
	            return this.invoke('expandParents');
	        }

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

	    }, {
	        key: 'extract',
	        value: function extract(predicate) {
	            var flat = this.flatten(predicate);
	            var matches = new TreeNodes(this._tree);

	            _.each(flat, function (node) {
	                matches.addNode(node.copyHierarchy());
	            });

	            return matches;
	        }

	        /**
	         * Returns nodes which match a predicate.
	         *
	         * @category TreeNodes
	         * @param {string|function} predicate State flag or custom function.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'filter',
	        value: function filter(predicate) {
	            var fn = getPredicateFunction(predicate);
	            var matches = new TreeNodes(this._tree);

	            _.each(this, function (node) {
	                if (fn(node)) {
	                    matches.push(node);
	                }
	            });

	            return matches;
	        }

	        /**
	         * Flattens a hierarchy, returning only node(s) matching the
	         * expected state or predicate function.
	         *
	         * @category TreeNodes
	         * @param {string|function} predicate State property or custom function.
	         * @return {TreeNodes} Flat array of matching nodes.
	         */

	    }, {
	        key: 'flatten',
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
	         * @category TreeNodes
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'focused',
	        value: function focused(full) {
	            return baseStatePredicate.call(this._tree, 'focused', full);
	        }

	        /**
	         * Get a specific node in the collection, or undefined if it doesn't exist.
	         *
	         * @category TreeNodes
	         * @param {int} index Numeric index of requested node.
	         * @return {TreeNode} Node object. Undefined if invalid index.
	         */

	    }, {
	        key: 'get',
	        value: function get(index) {
	            return this[index];
	        }

	        /**
	         * Query for all hidden nodes.
	         *
	         * @category TreeNodes
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'hidden',
	        value: function hidden(full) {
	            return baseStatePredicate.call(this._tree, 'hidden', full);
	        }

	        /**
	         * Hide children in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'hide',
	        value: function hide() {
	            return this.invoke('hide');
	        }

	        /**
	         * Hide all children (deeply) in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'hideDeep',
	        value: function hideDeep() {
	            return this.invokeDeep('hide');
	        }

	        /**
	         * Query for all indeterminate nodes.
	         *
	         * @category TreeNodes
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'indeterminate',
	        value: function indeterminate(full) {
	            return baseStatePredicate.call(this._tree, 'indeterminate', full);
	        }

	        /**
	         * Insert a new node at a given position.
	         *
	         * @category TreeNodes
	         * @param {integer} index Index at which to insert the node.
	         * @param {object} object Raw node object or TreeNode.
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'insertAt',
	        value: function insertAt(index, object) {
	            // If node has a pre-existing ID
	            if (object.id) {
	                // Is it already in the tree?
	                var existingNode = this.node(object.id);
	                if (existingNode) {
	                    existingNode.restore().show();

	                    // Merge children
	                    if (_.isArrayLike(object.children)) {
	                        // Setup existing node's children property if needed
	                        if (!_.isArrayLike(existingNode.children)) {
	                            existingNode.children = new TreeNodes(this._tree);
	                            existingNode.children._context = existingNode;
	                        }

	                        // Copy each child (using addNode, which uses insertAt)
	                        _.each(object.children, function (child) {
	                            existingNode.children.addNode(child);
	                        });
	                    }

	                    // Merge truthy children
	                    else if (object.children && _.isBoolean(existingNode.children)) {
	                            existingNode.children = object.children;
	                        }

	                    existingNode.markDirty();
	                    this._tree.dom.applyChanges();

	                    // Node merged, return it.
	                    return existingNode;
	                }
	            }

	            // Node is new, insert at given location.
	            var node = this._tree.isNode(object) ? object : (0, _objectToNode.objectToNode)(this._tree, object);

	            // Grab remaining nodes
	            this.splice(index, 0, node);

	            // Refresh parent state and mark dirty
	            if (this._context) {
	                node.itree.parent = this._context;
	                this._context.refreshIndeterminateState().markDirty();
	            }

	            // Event
	            this._tree.emit('node.added', node);

	            node.markDirty();
	            this._tree.dom.applyChanges();

	            return node;
	        }

	        /**
	         * Invoke method(s) on each node.
	         *
	         * @category TreeNodes
	         * @param {string|array} methods Method name(s).
	         * @param {array|Arguments} args Array of arguments to proxy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'invoke',
	        value: function invoke(methods, args) {
	            return baseInvoke(this, methods, args);
	        }

	        /**
	         * Invoke method(s) deeply.
	         *
	         * @category TreeNodes
	         * @param {string|array} methods Method name(s).
	         *  @param {array|Arguments} args Array of arguments to proxy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'invokeDeep',
	        value: function invokeDeep(methods, args) {
	            return baseInvoke(this, methods, args, true);
	        }

	        /**
	         * Query for all loading nodes.
	         *
	         * @category TreeNodes
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'loading',
	        value: function loading(full) {
	            return baseStatePredicate.call(this._tree, 'loading', full);
	        }

	        /**
	         * Get a node.
	         *
	         * @category TreeNodes
	         * @param {string|number} id ID of node.
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'node',
	        value: function node(id) {
	            var match;

	            if (_.isNumber(id)) {
	                id = id.toString();
	            }

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
	         * @category TreeNodes
	         * @param {array} refs Array of ID references.
	         * @return {TreeNodes} Array of node objects.
	         * @example
	         *
	         * var all = tree.nodes()
	         * var some = tree.nodes([1, 2, 3])
	         */

	    }, {
	        key: 'nodes',
	        value: function nodes(refs) {
	            var results;

	            if (_.isArray(refs)) {
	                // Ensure incoming IDs are strings
	                refs = _.map(refs, function (element) {
	                    if (_.isNumber(element)) {
	                        element = element.toString();
	                    }

	                    return element;
	                });

	                results = new TreeNodes(this._tree);

	                this.recurseDown(function (node) {
	                    if (refs.indexOf(node.id) > -1) {
	                        results.push(node);
	                    }
	                });
	            }

	            return _.isArray(refs) ? results : this;
	        }

	        /**
	         * Iterate down all nodes and any children.
	         *
	         * @category TreeNodes
	         * @param {function} iteratee Iteratee function.
	         * @return {TreeNodes} Resulting nodes.
	         */

	    }, {
	        key: 'recurseDown',
	        value: function recurseDown(iteratee) {
	            (0, _recurseDown2.recurseDown)(this, iteratee);

	            return this;
	        }

	        /**
	         * Query for all soft-removed nodes.
	         *
	         * @category TreeNodes
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'removed',
	        value: function removed(full) {
	            return baseStatePredicate.call(this._tree, 'removed', full);
	        }

	        /**
	         * Restore children in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'restore',
	        value: function restore() {
	            return this.invoke('restore');
	        }

	        /**
	         * Restore all children (deeply) in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'restoreDeep',
	        value: function restoreDeep() {
	            return this.invokeDeep('restore');
	        }

	        /**
	         * Select children in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'select',
	        value: function select() {
	            return this.invoke('select');
	        }

	        /**
	         * Query for all selectable nodes.
	         *
	         * @category TreeNodes
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'selectable',
	        value: function selectable(full) {
	            return baseStatePredicate.call(this._tree, 'selectable', full);
	        }

	        /**
	         * Select all children (deeply) in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'selectDeep',
	        value: function selectDeep() {
	            return this.invokeDeep('select');
	        }

	        /**
	         * Query for all selected nodes.
	         *
	         * @category TreeNodes
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'selected',
	        value: function selected(full) {
	            return baseStatePredicate.call(this._tree, 'selected', full);
	        }

	        /**
	         * Show children in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'show',
	        value: function show() {
	            return this.invoke('show');
	        }

	        /**
	         * Show all children (deeply) in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'showDeep',
	        value: function showDeep() {
	            return this.invokeDeep('show');
	        }

	        /**
	         * Soft-remove children in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'softRemove',
	        value: function softRemove() {
	            return this.invoke('softRemove');
	        }

	        /**
	         * Sorts all TreeNode objects in this collection.
	         *
	         * If no custom sorter given, the configured "sort" value will be used.
	         *
	         * @category TreeNodes
	         * @param {string|function} sorter Sort function or property name.
	         * @return {TreeNodes} Array of node obejcts.
	         */

	    }, {
	        key: 'sort',
	        value: function sort(sorter) {
	            var nodes = this;
	            sorter = sorter || this._tree.config.sort;

	            // Only apply sort if one provided
	            if (sorter) {
	                var sorted = _.sortBy(nodes, sorter);

	                nodes.length = 0;
	                _.each(sorted, function (node) {
	                    nodes.push(node);
	                });
	            }

	            return nodes;
	        }

	        /**
	         * Set state values for nodes in this collection.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'state',
	        value: function state() {
	            return this.invoke('state', arguments);
	        }

	        /**
	         * Set state values recursively.
	         *
	         * @category TreeNodes
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'stateDeep',
	        value: function stateDeep() {
	            return this.invokeDeep('state', arguments);
	        }

	        /**
	         * Chained method for returning a chain to the tree context.
	         *
	         * @category TreeNodes
	         * @return {[type]} [description]
	         */

	    }, {
	        key: 'tree',
	        value: function tree() {
	            return this._tree;
	        }

	        /**
	         * Returns a native Array of nodes.
	         *
	         * @category TreeNodes
	         * @return {array} Array of node objects.
	         */

	    }, {
	        key: 'toArray',
	        value: function toArray() {
	            var array = [];

	            _.each(this, function (node) {
	                array.push(node.toObject());
	            });

	            return array;
	        }

	        /**
	         * Query for all visible nodes.
	         *
	         * @category TreeNodes
	         * @param {boolean} full Retain full hiearchy.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'visible',
	        value: function visible(full) {
	            return baseStatePredicate.call(this._tree, 'visible', full);
	        }
	    }]);

	    return TreeNodes;
	}(_extendableBuiltin(Array));

	;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.standardizePromise = standardizePromise;

	var _lodash = __webpack_require__(1);

	var _ = _interopRequireWildcard(_lodash);

	var _es6Promise = __webpack_require__(6);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/**
	 * Resolve promise-like objects consistently.
	 *
	 * @private
	 * @param {object} promise Promise-like object.
	 * @returns {Promise} Promise
	 */
	function standardizePromise(promise) {
	    return new _es6Promise.Promise(function (resolve, reject) {
	        if (!_.isObject(promise)) {
	            return reject(new Error('Invalid Promise'));
	        }

	        if (_.isFunction(promise.then)) {
	            promise.then(resolve);
	        }

	        // jQuery promises use "error"
	        if (_.isFunction(promise.error)) {
	            promise.error(reject);
	        } else if (_.isFunction(promise.catch)) {
	            promise.catch(reject);
	        }
	    });
	};

/***/ },
/* 14 */
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
	        for (j = 0; j < al; j++) {
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
/* 15 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	"use strict";

/***/ }
/******/ ])
});
;