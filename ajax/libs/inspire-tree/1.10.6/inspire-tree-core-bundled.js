/*!
 * Inspire Tree v1.10.6
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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _difference2 = __webpack_require__(1);

	var _difference3 = _interopRequireDefault(_difference2);

	var _isRegExp2 = __webpack_require__(30);

	var _isRegExp3 = _interopRequireDefault(_isRegExp2);

	var _isEmpty2 = __webpack_require__(34);

	var _isEmpty3 = _interopRequireDefault(_isEmpty2);

	var _castArray2 = __webpack_require__(41);

	var _castArray3 = _interopRequireDefault(_castArray2);

	var _isString2 = __webpack_require__(42);

	var _isString3 = _interopRequireDefault(_isString2);

	var _isArrayLike2 = __webpack_require__(24);

	var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

	var _tail2 = __webpack_require__(43);

	var _tail3 = _interopRequireDefault(_tail2);

	var _head2 = __webpack_require__(45);

	var _head3 = _interopRequireDefault(_head2);

	var _sortBy2 = __webpack_require__(46);

	var _sortBy3 = _interopRequireDefault(_sortBy2);

	var _transform2 = __webpack_require__(96);

	var _transform3 = _interopRequireDefault(_transform2);

	var _each2 = __webpack_require__(100);

	var _each3 = _interopRequireDefault(_each2);

	var _defaults2 = __webpack_require__(103);

	var _defaults3 = _interopRequireDefault(_defaults2);

	var _isObject2 = __webpack_require__(27);

	var _isObject3 = _interopRequireDefault(_isObject2);

	var _isFunction2 = __webpack_require__(25);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _isArray2 = __webpack_require__(4);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _get2 = __webpack_require__(70);

	var _get3 = _interopRequireDefault(_get2);

	var _isBoolean2 = __webpack_require__(113);

	var _isBoolean3 = _interopRequireDefault(_isBoolean2);

	var _noop2 = __webpack_require__(114);

	var _noop3 = _interopRequireDefault(_noop2);

	var _defaultsDeep2 = __webpack_require__(115);

	var _defaultsDeep3 = _interopRequireDefault(_defaultsDeep2);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _collectionToModel = __webpack_require__(129);

	var _eventemitter = __webpack_require__(174);

	var _es6Promise = __webpack_require__(164);

	var _standardizePromise = __webpack_require__(173);

	var _treenode = __webpack_require__(134);

	var _treenodes = __webpack_require__(168);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// CSS
	__webpack_require__(175);

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

	        var _this = _possibleConstructorReturn(this, (InspireTree.__proto__ || Object.getPrototypeOf(InspireTree)).call(this));

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

	        // Assign defaults
	        tree.config = (0, _defaultsDeep3.default)({}, opts, {
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
	                allow: _noop3.default,
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

	        // Treat editable as full edit mode
	        if (opts.editable && !opts.editing) {
	            tree.config.editing.add = true;
	            tree.config.editing.edit = true;
	            tree.config.editing.remove = true;
	        }

	        // Init the default state for nodes
	        tree.defaultState = {
	            collapsed: true,
	            editable: (0, _get3.default)(tree, 'config.editing.edit'),
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
	        tree.allowsLoadEvents = (0, _isArray3.default)(tree.config.allowLoadEvents) && tree.config.allowLoadEvents.length > 0;
	        tree.isDynamic = (0, _isFunction3.default)(tree.config.data);

	        // Override emitter so we can better control flow
	        var emit = tree.emit;
	        tree.emit = function () {
	            if (!tree.muted()) {
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
	            tree.dom = new (require('./dom'))(tree);
	        }

	        // Validation
	        if (tree.dom && (!(0, _isObject3.default)(opts) || !opts.target)) {
	            throw new TypeError('Property "target" is required, either an element or a selector.');
	        }

	        // Load custom/empty renderer
	        if (!tree.dom) {
	            var renderer = (0, _isFunction3.default)(tree.config.renderer) ? tree.config.renderer(tree) : {};
	            tree.dom = (0, _defaults3.default)(renderer, {
	                applyChanges: _noop3.default,
	                attach: _noop3.default,
	                batch: _noop3.default,
	                end: _noop3.default
	            });
	        }

	        // Connect to our target DOM element
	        tree.dom.attach(tree.config.target);

	        // Load initial user data
	        if (tree.config.data) {
	            tree.load(tree.config.data).catch(function (err) {
	                // Proxy initial errors. At this point we should never consume them
	                setTimeout(function () {
	                    throw err;
	                });
	            });
	        }

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
	            (0, _each3.default)(nodes, function (node) {
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
	            var pathMap = (0, _transform3.default)(arguments, function (map, node) {
	                map[node.indexPath().replace(/\./g, '')] = node;
	            }, {});

	            var paths = (0, _sortBy3.default)(Object.keys(pathMap));
	            return [(0, _get3.default)(pathMap, (0, _head3.default)(paths)), (0, _get3.default)(pathMap, (0, _tail3.default)(paths))];
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
	         * Recursively expands all nodes, loading all dynamic calls.
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
	         * Query for all expanded nodes.
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

	            var promise = new _es6Promise.Promise(function (resolve, reject) {
	                var complete = function complete(nodes) {
	                    // Delay event for synchronous loader. Otherwise it fires
	                    // before the user has a chance to listen.
	                    if (!tree.initialized && (0, _isArray3.default)(nodes)) {
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
	                    if (!tree.initialized && (0, _isArray3.default)(nodes)) {
	                        setTimeout(function () {
	                            tree.emit('model.loaded', tree.model);
	                        });
	                    } else {
	                        tree.emit('model.loaded', tree.model);
	                    }

	                    resolve(tree.model);

	                    tree.dom.applyChanges();

	                    if ((0, _isFunction3.default)(tree.dom.scrollSelectedIntoView)) {
	                        tree.dom.scrollSelectedIntoView();
	                    }
	                };

	                // Data given already as an array
	                if ((0, _isArrayLike3.default)(loader)) {
	                    complete(loader);
	                }

	                // Data loader requires a caller/callback
	                else if ((0, _isFunction3.default)(loader)) {
	                        var resp = loader(null, complete, reject);

	                        // Loader returned its own object
	                        if (resp) {
	                            loader = resp;
	                        }
	                    }

	                // Data loader is likely a promise
	                if ((0, _isObject3.default)(loader)) {
	                    (0, _standardizePromise.standardizePromise)(loader).then(complete).catch(reject);
	                } else {
	                    error(new Error('Invalid data loader.'));
	                }
	            });

	            // Copy to event listeners
	            promise.catch(function (err) {
	                tree.emit('data.loaderror', err);
	            });

	            return promise;
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
	            if ((0, _isString3.default)(events) || (0, _isArray3.default)(events)) {
	                this._muted = (0, _castArray3.default)(events);
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
	         * @param {function} iteratee Iteratee function
	         * @return {TreeNodes} Resulting nodes.
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
	            if ((0, _isFunction3.default)(custom)) {
	                return custom(query, function resolver(nodes) {
	                    tree.dom.batch();

	                    tree.hideDeep();
	                    (0, _each3.default)(nodes, function (node) {
	                        tree.addNode(node);
	                    });

	                    tree.dom.end();
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
	         * @param {string} name Property name.
	         * @param {boolean} newVal New value, if setting.
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
	         * @param {string} name Property name.
	         * @param {boolean} newVal New value, if setting.
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
	            if ((0, _isString3.default)(events) || (0, _isArray3.default)(events)) {
	                this._muted = (0, _difference3.default)(this._muted, (0, _castArray3.default)(events));
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseDifference = __webpack_require__(2),
	    baseFlatten = __webpack_require__(11),
	    baseRest = __webpack_require__(18),
	    isArrayLikeObject = __webpack_require__(23);

	/**
	 * Creates an array of `array` values not included in the other given arrays
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons. The order and references of result values are
	 * determined by the first array.
	 *
	 * **Note:** Unlike `_.pullAll`, this method returns a new array.
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
	var difference = baseRest(function (array, values) {
	    return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : [];
	});

	module.exports = difference;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SetCache = __webpack_require__(3),
	    arrayIncludes = __webpack_require__(5),
	    arrayIncludesWith = __webpack_require__(7),
	    arrayMap = __webpack_require__(8),
	    baseUnary = __webpack_require__(9),
	    cacheHas = __webpack_require__(10);

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
	        computed = iteratee == null ? value : iteratee(value);

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

	var isArray = __webpack_require__(4);

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
/* 4 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIndexOf = __webpack_require__(6);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array == null ? 0 : array.length;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arrayIncludesWith;

/***/ },
/* 8 */
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
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIndexOf = __webpack_require__(6);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array == null ? 0 : array.length;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayPush = __webpack_require__(12),
	    isFlattenable = __webpack_require__(13);

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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(14),
	    isArguments = __webpack_require__(17),
	    isArray = __webpack_require__(4);

	/** Built-in value references. */
	var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	    return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	module.exports = isFlattenable;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(15);

	/** Built-in value references. */
	var _Symbol = root.Symbol;

	module.exports = _Symbol;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var freeGlobal = __webpack_require__(16);

	/** Detect free variable `self`. */
	var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;

/***/ },
/* 16 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns `false`.
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var identity = __webpack_require__(19),
	    overRest = __webpack_require__(20),
	    setToString = __webpack_require__(22);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(21);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
	  return function () {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;

/***/ },
/* 21 */
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
	  switch (args.length) {
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
/* 22 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(24),
	    isObjectLike = __webpack_require__(29);

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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(25),
	    isLength = __webpack_require__(28);

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
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGetTag = __webpack_require__(26),
	    isObject = __webpack_require__(27);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	    if (!isObject(value)) {
	        return false;
	    }
	    // The use of `Object#toString` avoids issues with the `typeof` operator
	    // in Safari 9 which returns 'object' for typed arrays and other constructors.
	    var tag = baseGetTag(value);
	    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
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
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
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
/* 29 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
	  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	module.exports = isObjectLike;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsRegExp = __webpack_require__(31),
	    baseUnary = __webpack_require__(9),
	    nodeUtil = __webpack_require__(32);

	/* Node.js helper references. */
	var nodeIsRegExp = nodeUtil && nodeUtil.isRegExp;

	/**
	 * Checks if `value` is classified as a `RegExp` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
	 * @example
	 *
	 * _.isRegExp(/abc/);
	 * // => true
	 *
	 * _.isRegExp('/abc/');
	 * // => false
	 */
	var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

	module.exports = isRegExp;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGetTag = __webpack_require__(26),
	    isObjectLike = __webpack_require__(29);

	/** `Object#toString` result references. */
	var regexpTag = '[object RegExp]';

	/**
	 * The base implementation of `_.isRegExp` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
	 */
	function baseIsRegExp(value) {
	  return isObjectLike(value) && baseGetTag(value) == regexpTag;
	}

	module.exports = baseIsRegExp;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var freeGlobal = __webpack_require__(16);

	/** Detect free variable `exports`. */
	var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = function () {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}();

	module.exports = nodeUtil;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)(module)))

/***/ },
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseKeys = __webpack_require__(35),
	    getTag = __webpack_require__(37),
	    isArguments = __webpack_require__(17),
	    isArray = __webpack_require__(4),
	    isArrayLike = __webpack_require__(24),
	    isBuffer = __webpack_require__(38),
	    isPrototype = __webpack_require__(39),
	    isTypedArray = __webpack_require__(40);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

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
	  if (value == null) {
	    return true;
	  }
	  if (isArrayLike(value) && (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
	    return !value.length;
	  }
	  var tag = getTag(value);
	  if (tag == mapTag || tag == setTag) {
	    return !value.size;
	  }
	  if (isPrototype(value)) {
	    return !baseKeys(value).length;
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var overArg = __webpack_require__(36);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function (arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns `false`.
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
/* 39 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns `false`.
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
/* 40 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns `false`.
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(4);

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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGetTag = __webpack_require__(26),
	    isArray = __webpack_require__(4),
	    isObjectLike = __webpack_require__(29);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	    return typeof value == 'string' || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
	}

	module.exports = isString;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseSlice = __webpack_require__(44);

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
	  var length = array == null ? 0 : array.length;
	  return length ? baseSlice(array, 1, length) : [];
	}

	module.exports = tail;

/***/ },
/* 44 */
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
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFlatten = __webpack_require__(11),
	    baseOrderBy = __webpack_require__(47),
	    baseRest = __webpack_require__(18),
	    isIterateeCall = __webpack_require__(95);

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
	 * @param {...(Function|Function[])} [iteratees=[_.identity]]
	 *  The iteratees to sort by.
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
	 * _.sortBy(users, [function(o) { return o.user; }]);
	 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	 *
	 * _.sortBy(users, ['user', 'age']);
	 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
	 */
	var sortBy = baseRest(function (collection, iteratees) {
	  if (collection == null) {
	    return [];
	  }
	  var length = iteratees.length;
	  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
	    iteratees = [];
	  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
	    iteratees = [iteratees[0]];
	  }
	  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
	});

	module.exports = sortBy;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(8),
	    baseIteratee = __webpack_require__(48),
	    baseMap = __webpack_require__(86),
	    baseSortBy = __webpack_require__(92),
	    baseUnary = __webpack_require__(9),
	    compareMultiple = __webpack_require__(93),
	    identity = __webpack_require__(19);

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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var baseMatches = __webpack_require__(49),
	    baseMatchesProperty = __webpack_require__(69),
	    identity = __webpack_require__(19),
	    isArray = __webpack_require__(4),
	    property = __webpack_require__(83);

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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsMatch = __webpack_require__(50),
	    getMatchData = __webpack_require__(66),
	    matchesStrictComparable = __webpack_require__(68);

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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(51),
	    baseIsEqual = __webpack_require__(59);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

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
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var listCacheClear = __webpack_require__(52),
	    listCacheDelete = __webpack_require__(53),
	    listCacheGet = __webpack_require__(56),
	    listCacheHas = __webpack_require__(57),
	    listCacheSet = __webpack_require__(58);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	    var index = -1,
	        length = entries == null ? 0 : entries.length;

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
/* 52 */
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
	  this.size = 0;
	}

	module.exports = listCacheClear;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(54);

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
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eq = __webpack_require__(55);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
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
/* 55 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
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
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(54);

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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(54);

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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(54);

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
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqualDeep = __webpack_require__(60),
	    isObject = __webpack_require__(27),
	    isObjectLike = __webpack_require__(29);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	module.exports = baseIsEqual;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(51),
	    equalArrays = __webpack_require__(61),
	    equalByTag = __webpack_require__(63),
	    equalObjects = __webpack_require__(64),
	    getTag = __webpack_require__(37),
	    isArray = __webpack_require__(4),
	    isBuffer = __webpack_require__(38),
	    isTypedArray = __webpack_require__(40);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

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
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
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
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack());
	    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack());
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack());
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	module.exports = baseIsEqualDeep;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SetCache = __webpack_require__(3),
	    arraySome = __webpack_require__(62),
	    cacheHas = __webpack_require__(10);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

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
	        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	          return seen.push(othIndex);
	        }
	      })) {
	        result = false;
	        break;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;

/***/ },
/* 62 */
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
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;

/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
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
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
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
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys = __webpack_require__(65);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
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
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
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
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var overArg = __webpack_require__(36);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isStrictComparable = __webpack_require__(67),
	    keys = __webpack_require__(65);

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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(27);

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
/* 68 */
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqual = __webpack_require__(59),
	    get = __webpack_require__(70),
	    hasIn = __webpack_require__(79),
	    isKey = __webpack_require__(73),
	    isStrictComparable = __webpack_require__(67),
	    matchesStrictComparable = __webpack_require__(68),
	    toKey = __webpack_require__(78);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

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
	    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(71);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var castPath = __webpack_require__(72),
	    toKey = __webpack_require__(78);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return index && index == length ? object : undefined;
	}

	module.exports = baseGet;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(4),
	    isKey = __webpack_require__(73),
	    stringToPath = __webpack_require__(75),
	    toString = __webpack_require__(77);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}

	module.exports = castPath;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var isArray = __webpack_require__(4),
	    isSymbol = __webpack_require__(74);

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
/* 74 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns `false`.
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

	var memoizeCapped = __webpack_require__(76);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function (string) {
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function (match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
	  });
	  return result;
	});

	module.exports = stringToPath;

/***/ },
/* 76 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 77 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 78 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHasIn = __webpack_require__(80),
	    hasPath = __webpack_require__(81);

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
/* 80 */
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var castPath = __webpack_require__(72),
	    isArguments = __webpack_require__(17),
	    isArray = __webpack_require__(4),
	    isIndex = __webpack_require__(82),
	    isLength = __webpack_require__(28),
	    toKey = __webpack_require__(78);

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
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object == null ? 0 : object.length;
	  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(84),
	    basePropertyDeep = __webpack_require__(85),
	    isKey = __webpack_require__(73),
	    toKey = __webpack_require__(78);

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
/* 84 */
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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(71);

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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseEach = __webpack_require__(87),
	    isArrayLike = __webpack_require__(24);

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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForOwn = __webpack_require__(88),
	    createBaseEach = __webpack_require__(91);

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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFor = __webpack_require__(89),
	    keys = __webpack_require__(65);

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
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createBaseFor = __webpack_require__(90);

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
/* 90 */
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
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(24);

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
/* 92 */
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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var compareAscending = __webpack_require__(94);

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
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSymbol = __webpack_require__(74);

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
/* 95 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns `false`.
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
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayEach = __webpack_require__(97),
	    baseCreate = __webpack_require__(98),
	    baseForOwn = __webpack_require__(88),
	    baseIteratee = __webpack_require__(48),
	    getPrototype = __webpack_require__(99),
	    isArray = __webpack_require__(4),
	    isBuffer = __webpack_require__(38),
	    isFunction = __webpack_require__(25),
	    isObject = __webpack_require__(27),
	    isTypedArray = __webpack_require__(40);

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
	  var isArr = isArray(object),
	      isArrLike = isArr || isBuffer(object) || isTypedArray(object);

	  iteratee = baseIteratee(iteratee, 4);
	  if (accumulator == null) {
	    var Ctor = object && object.constructor;
	    if (isArrLike) {
	      accumulator = isArr ? new Ctor() : [];
	    } else if (isObject(object)) {
	      accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
	    } else {
	      accumulator = {};
	    }
	  }
	  (isArrLike ? arrayEach : baseForOwn)(object, function (value, index, object) {
	    return iteratee(accumulator, value, index, object);
	  });
	  return accumulator;
	}

	module.exports = transform;

/***/ },
/* 97 */
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
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(27);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = function () {
	  function object() {}
	  return function (proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object();
	    object.prototype = undefined;
	    return result;
	  };
	}();

	module.exports = baseCreate;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var overArg = __webpack_require__(36);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(101);

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayEach = __webpack_require__(97),
	    baseEach = __webpack_require__(87),
	    castFunction = __webpack_require__(102),
	    isArray = __webpack_require__(4);

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
	 * _.forEach([1, 2], function(value) {
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
	  return func(collection, castFunction(iteratee));
	}

	module.exports = forEach;

/***/ },
/* 102 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(21),
	    assignInDefaults = __webpack_require__(104),
	    assignInWith = __webpack_require__(105),
	    baseRest = __webpack_require__(18);

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
	 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var defaults = baseRest(function (args) {
	  args.push(undefined, assignInDefaults);
	  return apply(assignInWith, undefined, args);
	});

	module.exports = defaults;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eq = __webpack_require__(55);

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
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(106),
	    createAssigner = __webpack_require__(111),
	    keysIn = __webpack_require__(112);

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
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assignValue = __webpack_require__(107),
	    baseAssignValue = __webpack_require__(108);

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
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseAssignValue = __webpack_require__(108),
	    eq = __webpack_require__(55);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
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
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defineProperty = __webpack_require__(109);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(110);

	var defineProperty = function () {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}();

	module.exports = defineProperty;

/***/ },
/* 110 */
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
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseRest = __webpack_require__(18),
	    isIterateeCall = __webpack_require__(95);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function (object, sources) {
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
/* 112 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGetTag = __webpack_require__(26),
	    isObjectLike = __webpack_require__(29);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]';

	/**
	 * Checks if `value` is classified as a boolean primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
	 * @example
	 *
	 * _.isBoolean(false);
	 * // => true
	 *
	 * _.isBoolean(null);
	 * // => false
	 */
	function isBoolean(value) {
	    return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
	}

	module.exports = isBoolean;

/***/ },
/* 114 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(21),
	    baseRest = __webpack_require__(18),
	    mergeDefaults = __webpack_require__(116),
	    mergeWith = __webpack_require__(128);

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
	 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
	 * // => { 'a': { 'b': 2, 'c': 3 } }
	 */
	var defaultsDeep = baseRest(function (args) {
	  args.push(undefined, mergeDefaults);
	  return apply(mergeWith, undefined, args);
	});

	module.exports = defaultsDeep;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseMerge = __webpack_require__(117),
	    isObject = __webpack_require__(27);

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
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, objValue);
	    baseMerge(objValue, srcValue, undefined, mergeDefaults, stack);
	    stack['delete'](srcValue);
	  }
	  return objValue;
	}

	module.exports = mergeDefaults;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(51),
	    assignMergeValue = __webpack_require__(118),
	    baseFor = __webpack_require__(89),
	    baseMergeDeep = __webpack_require__(119),
	    isObject = __webpack_require__(27),
	    keysIn = __webpack_require__(112);

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
	  baseFor(source, function (srcValue, key) {
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
	  }, keysIn);
	}

	module.exports = baseMerge;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseAssignValue = __webpack_require__(108),
	    eq = __webpack_require__(55);

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
	  if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignMergeValue;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assignMergeValue = __webpack_require__(118),
	    cloneBuffer = __webpack_require__(120),
	    cloneTypedArray = __webpack_require__(121),
	    copyArray = __webpack_require__(124),
	    initCloneObject = __webpack_require__(125),
	    isArguments = __webpack_require__(17),
	    isArray = __webpack_require__(4),
	    isArrayLikeObject = __webpack_require__(23),
	    isBuffer = __webpack_require__(38),
	    isFunction = __webpack_require__(25),
	    isObject = __webpack_require__(27),
	    isPlainObject = __webpack_require__(126),
	    isTypedArray = __webpack_require__(40),
	    toPlainObject = __webpack_require__(127);

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
	    var isArr = isArray(srcValue),
	        isBuff = !isArr && isBuffer(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      } else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      } else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      } else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      } else {
	        newValue = [];
	      }
	    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
	        newValue = initCloneObject(srcValue);
	      }
	    } else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}

	module.exports = baseMergeDeep;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var root = __webpack_require__(15);

	/** Detect free variable `exports`. */
	var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

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
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)(module)))

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cloneArrayBuffer = __webpack_require__(122);

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
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Uint8Array = __webpack_require__(123);

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
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(15);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;

/***/ },
/* 124 */
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
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCreate = __webpack_require__(98),
	    getPrototype = __webpack_require__(99),
	    isPrototype = __webpack_require__(39);

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
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGetTag = __webpack_require__(26),
	    getPrototype = __webpack_require__(99),
	    isObjectLike = __webpack_require__(29);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
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
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
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
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(106),
	    keysIn = __webpack_require__(112);

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
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseMerge = __webpack_require__(117),
	    createAssigner = __webpack_require__(111);

	/**
	 * This method is like `_.merge` except that it accepts `customizer` which
	 * is invoked to produce the merged values of the destination and source
	 * properties. If `customizer` returns `undefined`, merging is handled by the
	 * method instead. The `customizer` is invoked with six arguments:
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
	 * var object = { 'a': [1], 'b': [2] };
	 * var other = { 'a': [3], 'b': [4] };
	 *
	 * _.mergeWith(object, other, customizer);
	 * // => { 'a': [1, 3], 'b': [2, 4] }
	 */
	var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
	  baseMerge(object, source, srcIndex, customizer);
	});

	module.exports = mergeWith;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _each2 = __webpack_require__(100);

	var _each3 = _interopRequireDefault(_each2);

	var _sortBy2 = __webpack_require__(46);

	var _sortBy3 = _interopRequireDefault(_sortBy2);

	exports.collectionToModel = collectionToModel;

	var _objectToNode = __webpack_require__(130);

	var _treenodes = __webpack_require__(168);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	        array = (0, _sortBy3.default)(array, tree.config.sort);
	    }

	    (0, _each3.default)(array, function (node) {
	        collection.push((0, _objectToNode.objectToNode)(tree, node, parent));
	    });

	    collection._context = parent;

	    return collection;
	}

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _each2 = __webpack_require__(100);

	var _each3 = _interopRequireDefault(_each2);

	var _assign2 = __webpack_require__(131);

	var _assign3 = _interopRequireDefault(_assign2);

	exports.objectToNode = objectToNode;

	var _collectionToModel = __webpack_require__(129);

	var _uuid = __webpack_require__(132);

	var _uuid2 = _interopRequireDefault(_uuid);

	var _treenode = __webpack_require__(134);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    object.id = object.id || _uuid2.default.v4();
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
	    object = (0, _assign3.default)(new _treenode.TreeNode(tree), object);

	    if (object.hasChildren()) {
	        object.children = (0, _collectionToModel.collectionToModel)(tree, object.children, object);
	    }

	    // Fire events for pre-set states, if enabled
	    if (tree.allowsLoadEvents) {
	        (0, _each3.default)(tree.config.allowLoadEvents, function (eventName) {
	            if (state[eventName]) {
	                tree.emit('node.' + eventName, object);
	            }
	        });
	    }

	    return object;
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assignValue = __webpack_require__(107),
	    copyObject = __webpack_require__(106),
	    createAssigner = __webpack_require__(111),
	    isArrayLike = __webpack_require__(24),
	    isPrototype = __webpack_require__(39),
	    keys = __webpack_require__(65);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

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
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var assign = createAssigner(function (object, source) {
	  if (isPrototype(source) || isArrayLike(source)) {
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
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(133);

	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; ++i) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}

	function buff_to_string(buf, offset) {
	  var i = offset || 0;
	  var bth = _byteToHex;
	  return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
	}

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [_seedBytes[0] | 0x01, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0,
	    _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; ++n) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : buff_to_string(b);
	}

	// **`v4()` - Generate random UUID**

	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;

	  if (typeof options == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || _rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = rnds[6] & 0x0f | 0x40;
	  rnds[8] = rnds[8] & 0x3f | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ++ii) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || buff_to_string(rnds);
	}

	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;

	module.exports = uuid;

/***/ },
/* 133 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var rng;

	var crypto = global.crypto || global.msCrypto; // for IE 11
	if (crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var _rnds = new Array(16);
	  rng = function rng() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return _rnds;
	  };
	}

	module.exports = rng;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Libs

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TreeNode = undefined;

	var _remove2 = __webpack_require__(135);

	var _remove3 = _interopRequireDefault(_remove2);

	var _slice2 = __webpack_require__(140);

	var _slice3 = _interopRequireDefault(_slice2);

	var _findIndex2 = __webpack_require__(142);

	var _findIndex3 = _interopRequireDefault(_findIndex2);

	var _find2 = __webpack_require__(144);

	var _find3 = _interopRequireDefault(_find2);

	var _findLast2 = __webpack_require__(146);

	var _findLast3 = _interopRequireDefault(_findLast2);

	var _indexOf2 = __webpack_require__(148);

	var _indexOf3 = _interopRequireDefault(_indexOf2);

	var _isFunction2 = __webpack_require__(25);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _isArrayLike2 = __webpack_require__(24);

	var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

	var _isArray2 = __webpack_require__(4);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _isObject2 = __webpack_require__(27);

	var _isObject3 = _interopRequireDefault(_isObject2);

	var _cloneDeep2 = __webpack_require__(149);

	var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

	var _includes2 = __webpack_require__(161);

	var _includes3 = _interopRequireDefault(_includes2);

	var _each2 = __webpack_require__(100);

	var _each3 = _interopRequireDefault(_each2);

	var _castArray2 = __webpack_require__(41);

	var _castArray3 = _interopRequireDefault(_castArray2);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _collectionToModel = __webpack_require__(129);

	var _objectToNode = __webpack_require__(130);

	var _es6Promise = __webpack_require__(164);

	var _recurseDown2 = __webpack_require__(167);

	var _standardizePromise = __webpack_require__(173);

	var _treenodes = __webpack_require__(168);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    excludeKeys = (0, _castArray3.default)(excludeKeys);
	    excludeKeys.push('ref');

	    (0, _each3.default)(itree, function (v, k) {
	        if (!(0, _includes3.default)(excludeKeys, k)) {
	            clone[k] = (0, _cloneDeep3.default)(v);
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
	    (0, _each3.default)(node._tree.defaultState, function (val, prop) {
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
	            excludeKeys = (0, _castArray3.default)(excludeKeys);
	            excludeKeys.push('_tree');

	            // Iterate manually for better perf
	            (0, _each3.default)(source, function (value, key) {
	                // Skip vars
	                if (!(0, _includes3.default)(excludeKeys, key)) {
	                    if ((0, _isObject3.default)(value)) {
	                        if (value instanceof _treenodes.TreeNodes) {
	                            node[key] = value.clone();
	                        } else if (key === 'itree') {
	                            node[key] = cloneItree(value);
	                        } else {
	                            node[key] = (0, _cloneDeep3.default)(value);
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
	            if ((0, _isArray3.default)(this.children) || !(0, _isArrayLike3.default)(this.children)) {
	                this.children = new _treenodes.TreeNodes(this._tree);
	                this.children._context = this;
	            }

	            return this.children.addNode(child);
	        }

	        /**
	         * Add multiple children to this node.
	         *
	         * @category TreeNode
	         * @param {object} children Array of nodes.
	         * @return {TreeNodes} Array of node objects.
	         */

	    }, {
	        key: 'addChildren',
	        value: function addChildren(children) {
	            var _this = this;

	            var nodes = new _treenodes.TreeNodes();

	            this._tree.dom.batch();
	            (0, _each3.default)(children, function (child) {
	                nodes.push(_this.addChild(child));
	            });
	            this._tree.dom.end();

	            return nodes;
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
	                    if (!(0, _isFunction3.default)(dest.addNode)) {
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
	            (0, _each3.default)(parents, function (node) {
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
	            (0, _each3.default)(nodes, function (parent, key) {
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
	            return (0, _isArrayLike3.default)(this.children) && this.children.length > 0;
	        }

	        /**
	         * If children loading method has completed. Will always be true for non-dynamic nodes.
	         *
	         * @category TreeNode
	         * @return {boolean} If we've attempted to load children.
	         */

	    }, {
	        key: 'hasLoadedChildren',
	        value: function hasLoadedChildren() {
	            return (0, _isArrayLike3.default)(this.children);
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
	         * @return {TreeNode} Node object.
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
	                indices.push((0, _indexOf3.default)(node.context(), node));
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
	                found = (0, _findLast3.default)(this.children, function (node) {
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
	         * @return {Promise} Promise resolving children nodes.
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

	                    // If using checkbox mode, share selection with newly loaded children
	                    if (node._tree.config.selection.mode === 'checkbox' && node.selected()) {
	                        node.children.select();
	                    }

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
	                if ((0, _isObject3.default)(loader)) {
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
	                next = (0, _find3.default)(startingNode.children, function (child) {
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
	         * @return {TreeNode} Node object, if any.
	         */

	    }, {
	        key: 'nextVisibleSiblingNode',
	        value: function nextVisibleSiblingNode() {
	            var startingNode = this;
	            var context = startingNode.hasParent() ? startingNode.getParent().children : this._tree.nodes();
	            var i = (0, _findIndex3.default)(context, { id: startingNode.id });

	            return (0, _find3.default)((0, _slice3.default)(context, i + 1), function (node) {
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
	            var i = (0, _findIndex3.default)(context, { id: this.id });
	            return (0, _findLast3.default)((0, _slice3.default)(context, 0, i), function (node) {
	                return node.visible();
	            });
	        }

	        /**
	         * Iterate down node and any children.
	         *
	         * @category TreeNode
	         * @param {function} iteratee Iteratee function.
	         * @return {TreeNode} Node object.
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
	         * @return {TreeNode} Node object.
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
	            (0, _remove3.default)(context, { id: node.id });

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

	        /**
	         * Toggles editing state.
	         *
	         * @category TreeNode
	         * @return {TreeNode} Node object.
	         */

	    }, {
	        key: 'toggleEditing',
	        value: function toggleEditing() {
	            this.state('editing', !this.state('editing'));

	            this.markDirty();
	            this._tree.dom.applyChanges();

	            return this;
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

	            (0, _each3.default)(this, function (v, k) {
	                if (k !== '_tree' && k !== 'children' && k !== 'itree') {
	                    object[k] = v;
	                }
	            });

	            if (!excludeChildren && this.hasChildren() && (0, _isFunction3.default)(this.children.toArray)) {
	                object.children = this.children.toArray();
	            }

	            return object;
	        }

	        /**
	         * Checks whether a node is visible to a user. Returns false
	         * if it's hidden, or if any ancestor is hidden or collapsed.
	         *
	         * @category TreeNode
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
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIteratee = __webpack_require__(48),
	    basePullAt = __webpack_require__(136);

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
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
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
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseUnset = __webpack_require__(137),
	    isIndex = __webpack_require__(82);

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
	      } else {
	        baseUnset(array, index);
	      }
	    }
	  }
	  return array;
	}

	module.exports = basePullAt;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var castPath = __webpack_require__(72),
	    last = __webpack_require__(138),
	    parent = __webpack_require__(139),
	    toKey = __webpack_require__(78);

	/**
	 * The base implementation of `_.unset`.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The property path to unset.
	 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
	 */
	function baseUnset(object, path) {
	  path = castPath(path, object);
	  object = parent(object, path);
	  return object == null || delete object[toKey(last(path))];
	}

	module.exports = baseUnset;

/***/ },
/* 138 */
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
	  var length = array == null ? 0 : array.length;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(71),
	    baseSlice = __webpack_require__(44);

	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
	}

	module.exports = parent;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseSlice = __webpack_require__(44),
	    isIterateeCall = __webpack_require__(95),
	    toInteger = __webpack_require__(141);

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
	  var length = array == null ? 0 : array.length;
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
/* 141 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFindIndex = __webpack_require__(143),
	    baseIteratee = __webpack_require__(48),
	    toInteger = __webpack_require__(141);

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
	 * @param {Array} array The array to inspect.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
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
	  var length = array == null ? 0 : array.length;
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
/* 143 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
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
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createFind = __webpack_require__(145),
	    findIndex = __webpack_require__(142);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to inspect.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
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
	var find = createFind(findIndex);

	module.exports = find;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIteratee = __webpack_require__(48),
	    isArrayLike = __webpack_require__(24),
	    keys = __webpack_require__(65);

	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} findIndexFunc The function to find the collection index.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(findIndexFunc) {
	  return function (collection, predicate, fromIndex) {
	    var iterable = Object(collection);
	    if (!isArrayLike(collection)) {
	      var iteratee = baseIteratee(predicate, 3);
	      collection = keys(collection);
	      predicate = function predicate(key) {
	        return iteratee(iterable[key], key, iterable);
	      };
	    }
	    var index = findIndexFunc(collection, predicate, fromIndex);
	    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
	  };
	}

	module.exports = createFind;

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createFind = __webpack_require__(145),
	    findLastIndex = __webpack_require__(147);

	/**
	 * This method is like `_.find` except that it iterates over elements of
	 * `collection` from right to left.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.0.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to inspect.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param {number} [fromIndex=collection.length-1] The index to search from.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * _.findLast([1, 2, 3, 4], function(n) {
	 *   return n % 2 == 1;
	 * });
	 * // => 3
	 */
	var findLast = createFind(findLastIndex);

	module.exports = findLast;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFindIndex = __webpack_require__(143),
	    baseIteratee = __webpack_require__(48),
	    toInteger = __webpack_require__(141);

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
	 * @param {Array} array The array to inspect.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
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
	  var length = array == null ? 0 : array.length;
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
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIndexOf = __webpack_require__(6),
	    toInteger = __webpack_require__(141);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Gets the index at which the first occurrence of `value` is found in `array`
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons. If `fromIndex` is negative, it's used as the
	 * offset from the end of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
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
	  var length = array == null ? 0 : array.length;
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
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseClone = __webpack_require__(150);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_SYMBOLS_FLAG = 4;

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
	  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
	}

	module.exports = cloneDeep;

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(51),
	    arrayEach = __webpack_require__(97),
	    assignValue = __webpack_require__(107),
	    baseAssign = __webpack_require__(151),
	    baseAssignIn = __webpack_require__(152),
	    cloneBuffer = __webpack_require__(120),
	    copyArray = __webpack_require__(124),
	    copySymbols = __webpack_require__(153),
	    copySymbolsIn = __webpack_require__(155),
	    getAllKeys = __webpack_require__(157),
	    getAllKeysIn = __webpack_require__(158),
	    getTag = __webpack_require__(37),
	    initCloneArray = __webpack_require__(159),
	    initCloneByTag = __webpack_require__(160),
	    initCloneObject = __webpack_require__(125),
	    isArray = __webpack_require__(4),
	    isBuffer = __webpack_require__(38),
	    isObject = __webpack_require__(27),
	    keys = __webpack_require__(65);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;

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
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG;

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
	      result = isFlat || isFunc ? {} : initCloneObject(value);
	      if (!isDeep) {
	        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
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

	  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;

	  var props = isArr ? undefined : keysFunc(value);
	  arrayEach(props || value, function (subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	module.exports = baseClone;

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(106),
	    keys = __webpack_require__(65);

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
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(106),
	    keysIn = __webpack_require__(112);

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && copyObject(source, keysIn(source), object);
	}

	module.exports = baseAssignIn;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(106),
	    getSymbols = __webpack_require__(154);

	/**
	 * Copies own symbols of `source` to `object`.
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
/* 154 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns a new empty array.
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
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copyObject = __webpack_require__(106),
	    getSymbolsIn = __webpack_require__(156);

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return copyObject(source, getSymbolsIn(source), object);
	}

	module.exports = copySymbolsIn;

/***/ },
/* 156 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns a new empty array.
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
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var overArg = __webpack_require__(36);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;

/***/ },
/* 158 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;

/***/ },
/* 159 */
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
/* 160 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIndexOf = __webpack_require__(6),
	    isArrayLike = __webpack_require__(24),
	    isString = __webpack_require__(42),
	    toInteger = __webpack_require__(141),
	    values = __webpack_require__(162);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Checks if `value` is in `collection`. If `collection` is a string, it's
	 * checked for a substring of `value`, otherwise
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * is used for equality comparisons. If `fromIndex` is negative, it's used as
	 * the offset from the end of `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
	 * @returns {boolean} Returns `true` if `value` is found, else `false`.
	 * @example
	 *
	 * _.includes([1, 2, 3], 1);
	 * // => true
	 *
	 * _.includes([1, 2, 3], 1, 2);
	 * // => false
	 *
	 * _.includes({ 'a': 1, 'b': 2 }, 1);
	 * // => true
	 *
	 * _.includes('abcd', 'bc');
	 * // => true
	 */
	function includes(collection, value, fromIndex, guard) {
	  collection = isArrayLike(collection) ? collection : values(collection);
	  fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;

	  var length = collection.length;
	  if (fromIndex < 0) {
	    fromIndex = nativeMax(length + fromIndex, 0);
	  }
	  return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
	}

	module.exports = includes;

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseValues = __webpack_require__(163),
	    keys = __webpack_require__(65);

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
	  return object == null ? [] : baseValues(object, keys(object));
	}

	module.exports = values;

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(8);

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
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.0.5
	 */

	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.ES6Promise = factory();
	})(undefined, function () {
	  'use strict';

	  function objectOrFunction(x) {
	    return typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
	  }

	  function isFunction(x) {
	    return typeof x === 'function';
	  }

	  var _isArray = undefined;
	  if (!Array.isArray) {
	    _isArray = function _isArray(x) {
	      return Object.prototype.toString.call(x) === '[object Array]';
	    };
	  } else {
	    _isArray = Array.isArray;
	  }

	  var isArray = _isArray;

	  var len = 0;
	  var vertxNext = undefined;
	  var customSchedulerFn = undefined;

	  var asap = function asap(callback, arg) {
	    queue[len] = callback;
	    queue[len + 1] = arg;
	    len += 2;
	    if (len === 2) {
	      // If len is 2, that means that we need to schedule an async flush.
	      // If additional callbacks are queued before the queue is flushed, they
	      // will be processed by this flush that we are scheduling.
	      if (customSchedulerFn) {
	        customSchedulerFn(flush);
	      } else {
	        scheduleFlush();
	      }
	    }
	  };

	  function setScheduler(scheduleFn) {
	    customSchedulerFn = scheduleFn;
	  }

	  function setAsap(asapFn) {
	    asap = asapFn;
	  }

	  var browserWindow = typeof window !== 'undefined' ? window : undefined;
	  var browserGlobal = browserWindow || {};
	  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	  var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	  // test for web worker but not in IE10
	  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	  // node
	  function useNextTick() {
	    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	    // see https://github.com/cujojs/when/issues/410 for details
	    return function () {
	      return process.nextTick(flush);
	    };
	  }

	  // vertx
	  function useVertxTimer() {
	    if (typeof vertxNext !== 'undefined') {
	      return function () {
	        vertxNext(flush);
	      };
	    }

	    return useSetTimeout();
	  }

	  function useMutationObserver() {
	    var iterations = 0;
	    var observer = new BrowserMutationObserver(flush);
	    var node = document.createTextNode('');
	    observer.observe(node, { characterData: true });

	    return function () {
	      node.data = iterations = ++iterations % 2;
	    };
	  }

	  // web worker
	  function useMessageChannel() {
	    var channel = new MessageChannel();
	    channel.port1.onmessage = flush;
	    return function () {
	      return channel.port2.postMessage(0);
	    };
	  }

	  function useSetTimeout() {
	    // Store setTimeout reference so es6-promise will be unaffected by
	    // other code modifying setTimeout (like sinon.useFakeTimers())
	    var globalSetTimeout = setTimeout;
	    return function () {
	      return globalSetTimeout(flush, 1);
	    };
	  }

	  var queue = new Array(1000);
	  function flush() {
	    for (var i = 0; i < len; i += 2) {
	      var callback = queue[i];
	      var arg = queue[i + 1];

	      callback(arg);

	      queue[i] = undefined;
	      queue[i + 1] = undefined;
	    }

	    len = 0;
	  }

	  function attemptVertx() {
	    try {
	      var r = require;
	      var vertx = __webpack_require__(166);
	      vertxNext = vertx.runOnLoop || vertx.runOnContext;
	      return useVertxTimer();
	    } catch (e) {
	      return useSetTimeout();
	    }
	  }

	  var scheduleFlush = undefined;
	  // Decide what async method to use to triggering processing of queued callbacks:
	  if (isNode) {
	    scheduleFlush = useNextTick();
	  } else if (BrowserMutationObserver) {
	    scheduleFlush = useMutationObserver();
	  } else if (isWorker) {
	    scheduleFlush = useMessageChannel();
	  } else if (browserWindow === undefined && "function" === 'function') {
	    scheduleFlush = attemptVertx();
	  } else {
	    scheduleFlush = useSetTimeout();
	  }

	  function then(onFulfillment, onRejection) {
	    var _arguments = arguments;

	    var parent = this;

	    var child = new this.constructor(noop);

	    if (child[PROMISE_ID] === undefined) {
	      makePromise(child);
	    }

	    var _state = parent._state;

	    if (_state) {
	      (function () {
	        var callback = _arguments[_state - 1];
	        asap(function () {
	          return invokeCallback(_state, child, callback, parent._result);
	        });
	      })();
	    } else {
	      subscribe(parent, child, onFulfillment, onRejection);
	    }

	    return child;
	  }

	  /**
	    `Promise.resolve` returns a promise that will become resolved with the
	    passed `value`. It is shorthand for the following:
	  
	    ```javascript
	    let promise = new Promise(function(resolve, reject){
	      resolve(1);
	    });
	  
	    promise.then(function(value){
	      // value === 1
	    });
	    ```
	  
	    Instead of writing the above, your code now simply becomes the following:
	  
	    ```javascript
	    let promise = Promise.resolve(1);
	  
	    promise.then(function(value){
	      // value === 1
	    });
	    ```
	  
	    @method resolve
	    @static
	    @param {Any} value value that the returned promise will be resolved with
	    Useful for tooling.
	    @return {Promise} a promise that will become fulfilled with the given
	    `value`
	  */
	  function resolve(object) {
	    /*jshint validthis:true */
	    var Constructor = this;

	    if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {
	      return object;
	    }

	    var promise = new Constructor(noop);
	    _resolve(promise, object);
	    return promise;
	  }

	  var PROMISE_ID = Math.random().toString(36).substring(16);

	  function noop() {}

	  var PENDING = void 0;
	  var FULFILLED = 1;
	  var REJECTED = 2;

	  var GET_THEN_ERROR = new ErrorObject();

	  function selfFulfillment() {
	    return new TypeError("You cannot resolve a promise with itself");
	  }

	  function cannotReturnOwn() {
	    return new TypeError('A promises callback cannot return that same promise.');
	  }

	  function getThen(promise) {
	    try {
	      return promise.then;
	    } catch (error) {
	      GET_THEN_ERROR.error = error;
	      return GET_THEN_ERROR;
	    }
	  }

	  function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	    try {
	      then.call(value, fulfillmentHandler, rejectionHandler);
	    } catch (e) {
	      return e;
	    }
	  }

	  function handleForeignThenable(promise, thenable, then) {
	    asap(function (promise) {
	      var sealed = false;
	      var error = tryThen(then, thenable, function (value) {
	        if (sealed) {
	          return;
	        }
	        sealed = true;
	        if (thenable !== value) {
	          _resolve(promise, value);
	        } else {
	          fulfill(promise, value);
	        }
	      }, function (reason) {
	        if (sealed) {
	          return;
	        }
	        sealed = true;

	        _reject(promise, reason);
	      }, 'Settle: ' + (promise._label || ' unknown promise'));

	      if (!sealed && error) {
	        sealed = true;
	        _reject(promise, error);
	      }
	    }, promise);
	  }

	  function handleOwnThenable(promise, thenable) {
	    if (thenable._state === FULFILLED) {
	      fulfill(promise, thenable._result);
	    } else if (thenable._state === REJECTED) {
	      _reject(promise, thenable._result);
	    } else {
	      subscribe(thenable, undefined, function (value) {
	        return _resolve(promise, value);
	      }, function (reason) {
	        return _reject(promise, reason);
	      });
	    }
	  }

	  function handleMaybeThenable(promise, maybeThenable, then$$) {
	    if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	      handleOwnThenable(promise, maybeThenable);
	    } else {
	      if (then$$ === GET_THEN_ERROR) {
	        _reject(promise, GET_THEN_ERROR.error);
	      } else if (then$$ === undefined) {
	        fulfill(promise, maybeThenable);
	      } else if (isFunction(then$$)) {
	        handleForeignThenable(promise, maybeThenable, then$$);
	      } else {
	        fulfill(promise, maybeThenable);
	      }
	    }
	  }

	  function _resolve(promise, value) {
	    if (promise === value) {
	      _reject(promise, selfFulfillment());
	    } else if (objectOrFunction(value)) {
	      handleMaybeThenable(promise, value, getThen(value));
	    } else {
	      fulfill(promise, value);
	    }
	  }

	  function publishRejection(promise) {
	    if (promise._onerror) {
	      promise._onerror(promise._result);
	    }

	    publish(promise);
	  }

	  function fulfill(promise, value) {
	    if (promise._state !== PENDING) {
	      return;
	    }

	    promise._result = value;
	    promise._state = FULFILLED;

	    if (promise._subscribers.length !== 0) {
	      asap(publish, promise);
	    }
	  }

	  function _reject(promise, reason) {
	    if (promise._state !== PENDING) {
	      return;
	    }
	    promise._state = REJECTED;
	    promise._result = reason;

	    asap(publishRejection, promise);
	  }

	  function subscribe(parent, child, onFulfillment, onRejection) {
	    var _subscribers = parent._subscribers;
	    var length = _subscribers.length;

	    parent._onerror = null;

	    _subscribers[length] = child;
	    _subscribers[length + FULFILLED] = onFulfillment;
	    _subscribers[length + REJECTED] = onRejection;

	    if (length === 0 && parent._state) {
	      asap(publish, parent);
	    }
	  }

	  function publish(promise) {
	    var subscribers = promise._subscribers;
	    var settled = promise._state;

	    if (subscribers.length === 0) {
	      return;
	    }

	    var child = undefined,
	        callback = undefined,
	        detail = promise._result;

	    for (var i = 0; i < subscribers.length; i += 3) {
	      child = subscribers[i];
	      callback = subscribers[i + settled];

	      if (child) {
	        invokeCallback(settled, child, callback, detail);
	      } else {
	        callback(detail);
	      }
	    }

	    promise._subscribers.length = 0;
	  }

	  function ErrorObject() {
	    this.error = null;
	  }

	  var TRY_CATCH_ERROR = new ErrorObject();

	  function tryCatch(callback, detail) {
	    try {
	      return callback(detail);
	    } catch (e) {
	      TRY_CATCH_ERROR.error = e;
	      return TRY_CATCH_ERROR;
	    }
	  }

	  function invokeCallback(settled, promise, callback, detail) {
	    var hasCallback = isFunction(callback),
	        value = undefined,
	        error = undefined,
	        succeeded = undefined,
	        failed = undefined;

	    if (hasCallback) {
	      value = tryCatch(callback, detail);

	      if (value === TRY_CATCH_ERROR) {
	        failed = true;
	        error = value.error;
	        value = null;
	      } else {
	        succeeded = true;
	      }

	      if (promise === value) {
	        _reject(promise, cannotReturnOwn());
	        return;
	      }
	    } else {
	      value = detail;
	      succeeded = true;
	    }

	    if (promise._state !== PENDING) {
	      // noop
	    } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	  }

	  function initializePromise(promise, resolver) {
	    try {
	      resolver(function resolvePromise(value) {
	        _resolve(promise, value);
	      }, function rejectPromise(reason) {
	        _reject(promise, reason);
	      });
	    } catch (e) {
	      _reject(promise, e);
	    }
	  }

	  var id = 0;
	  function nextId() {
	    return id++;
	  }

	  function makePromise(promise) {
	    promise[PROMISE_ID] = id++;
	    promise._state = undefined;
	    promise._result = undefined;
	    promise._subscribers = [];
	  }

	  function Enumerator(Constructor, input) {
	    this._instanceConstructor = Constructor;
	    this.promise = new Constructor(noop);

	    if (!this.promise[PROMISE_ID]) {
	      makePromise(this.promise);
	    }

	    if (isArray(input)) {
	      this._input = input;
	      this.length = input.length;
	      this._remaining = input.length;

	      this._result = new Array(this.length);

	      if (this.length === 0) {
	        fulfill(this.promise, this._result);
	      } else {
	        this.length = this.length || 0;
	        this._enumerate();
	        if (this._remaining === 0) {
	          fulfill(this.promise, this._result);
	        }
	      }
	    } else {
	      _reject(this.promise, validationError());
	    }
	  }

	  function validationError() {
	    return new Error('Array Methods must be provided an Array');
	  };

	  Enumerator.prototype._enumerate = function () {
	    var length = this.length;
	    var _input = this._input;

	    for (var i = 0; this._state === PENDING && i < length; i++) {
	      this._eachEntry(_input[i], i);
	    }
	  };

	  Enumerator.prototype._eachEntry = function (entry, i) {
	    var c = this._instanceConstructor;
	    var resolve$$ = c.resolve;

	    if (resolve$$ === resolve) {
	      var _then = getThen(entry);

	      if (_then === then && entry._state !== PENDING) {
	        this._settledAt(entry._state, i, entry._result);
	      } else if (typeof _then !== 'function') {
	        this._remaining--;
	        this._result[i] = entry;
	      } else if (c === Promise) {
	        var promise = new c(noop);
	        handleMaybeThenable(promise, entry, _then);
	        this._willSettleAt(promise, i);
	      } else {
	        this._willSettleAt(new c(function (resolve$$) {
	          return resolve$$(entry);
	        }), i);
	      }
	    } else {
	      this._willSettleAt(resolve$$(entry), i);
	    }
	  };

	  Enumerator.prototype._settledAt = function (state, i, value) {
	    var promise = this.promise;

	    if (promise._state === PENDING) {
	      this._remaining--;

	      if (state === REJECTED) {
	        _reject(promise, value);
	      } else {
	        this._result[i] = value;
	      }
	    }

	    if (this._remaining === 0) {
	      fulfill(promise, this._result);
	    }
	  };

	  Enumerator.prototype._willSettleAt = function (promise, i) {
	    var enumerator = this;

	    subscribe(promise, undefined, function (value) {
	      return enumerator._settledAt(FULFILLED, i, value);
	    }, function (reason) {
	      return enumerator._settledAt(REJECTED, i, reason);
	    });
	  };

	  /**
	    `Promise.all` accepts an array of promises, and returns a new promise which
	    is fulfilled with an array of fulfillment values for the passed promises, or
	    rejected with the reason of the first passed promise to be rejected. It casts all
	    elements of the passed iterable to promises as it runs this algorithm.
	  
	    Example:
	  
	    ```javascript
	    let promise1 = resolve(1);
	    let promise2 = resolve(2);
	    let promise3 = resolve(3);
	    let promises = [ promise1, promise2, promise3 ];
	  
	    Promise.all(promises).then(function(array){
	      // The array here would be [ 1, 2, 3 ];
	    });
	    ```
	  
	    If any of the `promises` given to `all` are rejected, the first promise
	    that is rejected will be given as an argument to the returned promises's
	    rejection handler. For example:
	  
	    Example:
	  
	    ```javascript
	    let promise1 = resolve(1);
	    let promise2 = reject(new Error("2"));
	    let promise3 = reject(new Error("3"));
	    let promises = [ promise1, promise2, promise3 ];
	  
	    Promise.all(promises).then(function(array){
	      // Code here never runs because there are rejected promises!
	    }, function(error) {
	      // error.message === "2"
	    });
	    ```
	  
	    @method all
	    @static
	    @param {Array} entries array of promises
	    @param {String} label optional string for labeling the promise.
	    Useful for tooling.
	    @return {Promise} promise that is fulfilled when all `promises` have been
	    fulfilled, or rejected if any of them become rejected.
	    @static
	  */
	  function all(entries) {
	    return new Enumerator(this, entries).promise;
	  }

	  /**
	    `Promise.race` returns a new promise which is settled in the same way as the
	    first passed promise to settle.
	  
	    Example:
	  
	    ```javascript
	    let promise1 = new Promise(function(resolve, reject){
	      setTimeout(function(){
	        resolve('promise 1');
	      }, 200);
	    });
	  
	    let promise2 = new Promise(function(resolve, reject){
	      setTimeout(function(){
	        resolve('promise 2');
	      }, 100);
	    });
	  
	    Promise.race([promise1, promise2]).then(function(result){
	      // result === 'promise 2' because it was resolved before promise1
	      // was resolved.
	    });
	    ```
	  
	    `Promise.race` is deterministic in that only the state of the first
	    settled promise matters. For example, even if other promises given to the
	    `promises` array argument are resolved, but the first settled promise has
	    become rejected before the other promises became fulfilled, the returned
	    promise will become rejected:
	  
	    ```javascript
	    let promise1 = new Promise(function(resolve, reject){
	      setTimeout(function(){
	        resolve('promise 1');
	      }, 200);
	    });
	  
	    let promise2 = new Promise(function(resolve, reject){
	      setTimeout(function(){
	        reject(new Error('promise 2'));
	      }, 100);
	    });
	  
	    Promise.race([promise1, promise2]).then(function(result){
	      // Code here never runs
	    }, function(reason){
	      // reason.message === 'promise 2' because promise 2 became rejected before
	      // promise 1 became fulfilled
	    });
	    ```
	  
	    An example real-world use case is implementing timeouts:
	  
	    ```javascript
	    Promise.race([ajax('foo.json'), timeout(5000)])
	    ```
	  
	    @method race
	    @static
	    @param {Array} promises array of promises to observe
	    Useful for tooling.
	    @return {Promise} a promise which settles in the same way as the first passed
	    promise to settle.
	  */
	  function race(entries) {
	    /*jshint validthis:true */
	    var Constructor = this;

	    if (!isArray(entries)) {
	      return new Constructor(function (_, reject) {
	        return reject(new TypeError('You must pass an array to race.'));
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

	  /**
	    `Promise.reject` returns a promise rejected with the passed `reason`.
	    It is shorthand for the following:
	  
	    ```javascript
	    let promise = new Promise(function(resolve, reject){
	      reject(new Error('WHOOPS'));
	    });
	  
	    promise.then(function(value){
	      // Code here doesn't run because the promise is rejected!
	    }, function(reason){
	      // reason.message === 'WHOOPS'
	    });
	    ```
	  
	    Instead of writing the above, your code now simply becomes the following:
	  
	    ```javascript
	    let promise = Promise.reject(new Error('WHOOPS'));
	  
	    promise.then(function(value){
	      // Code here doesn't run because the promise is rejected!
	    }, function(reason){
	      // reason.message === 'WHOOPS'
	    });
	    ```
	  
	    @method reject
	    @static
	    @param {Any} reason value that the returned promise will be rejected with.
	    Useful for tooling.
	    @return {Promise} a promise rejected with the given `reason`.
	  */
	  function reject(reason) {
	    /*jshint validthis:true */
	    var Constructor = this;
	    var promise = new Constructor(noop);
	    _reject(promise, reason);
	    return promise;
	  }

	  function needsResolver() {
	    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	  }

	  function needsNew() {
	    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	  }

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
	    let promise = new Promise(function(resolve, reject) {
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
	        let xhr = new XMLHttpRequest();
	  
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
	  function Promise(resolver) {
	    this[PROMISE_ID] = nextId();
	    this._result = this._state = undefined;
	    this._subscribers = [];

	    if (noop !== resolver) {
	      typeof resolver !== 'function' && needsResolver();
	      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	    }
	  }

	  Promise.all = all;
	  Promise.race = race;
	  Promise.resolve = resolve;
	  Promise.reject = reject;
	  Promise._setScheduler = setScheduler;
	  Promise._setAsap = setAsap;
	  Promise._asap = asap;

	  Promise.prototype = {
	    constructor: Promise,

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
	      let result;
	    
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
	      let author, books;
	    
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
	    then: then,

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

	  function polyfill() {
	    var local = undefined;

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

	    if (P) {
	      var promiseToString = null;
	      try {
	        promiseToString = Object.prototype.toString.call(P.resolve());
	      } catch (e) {
	        // silently ignored
	      }

	      if (promiseToString === '[object Promise]' && !P.cast) {
	        return;
	      }
	    }

	    local.Promise = Promise;
	  }

	  // Strange compat..
	  Promise.polyfill = polyfill;
	  Promise.Promise = Promise;

	  return Promise;
	});
	//# sourceMappingURL=es6-promise.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165), (function() { return this; }())))

/***/ },
/* 165 */
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

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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
/* 166 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _each2 = __webpack_require__(100);

	var _each3 = _interopRequireDefault(_each2);

	exports.recurseDown = recurseDown;

	var _treenode = __webpack_require__(134);

	var _treenodes = __webpack_require__(168);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	        (0, _each3.default)(obj, function (node) {
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
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Libs

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TreeNodes = undefined;

	var _sortBy2 = __webpack_require__(46);

	var _sortBy3 = _interopRequireDefault(_sortBy2);

	var _map2 = __webpack_require__(169);

	var _map3 = _interopRequireDefault(_map2);

	var _isNumber2 = __webpack_require__(170);

	var _isNumber3 = _interopRequireDefault(_isNumber2);

	var _isBoolean2 = __webpack_require__(113);

	var _isBoolean3 = _interopRequireDefault(_isBoolean2);

	var _isArrayLike2 = __webpack_require__(24);

	var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

	var _sortedIndexBy2 = __webpack_require__(171);

	var _sortedIndexBy3 = _interopRequireDefault(_sortedIndexBy2);

	var _isArray2 = __webpack_require__(4);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _isString2 = __webpack_require__(42);

	var _isString3 = _interopRequireDefault(_isString2);

	var _isFunction2 = __webpack_require__(25);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _each2 = __webpack_require__(100);

	var _each3 = _interopRequireDefault(_each2);

	var _castArray2 = __webpack_require__(41);

	var _castArray3 = _interopRequireDefault(_castArray2);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _objectToNode = __webpack_require__(130);

	var _es6Promise = __webpack_require__(164);

	var _recurseDown2 = __webpack_require__(167);

	var _treenode = __webpack_require__(134);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    methods = (0, _castArray3.default)(methods);

	    nodes._tree.dom.batch();

	    nodes[deep ? 'recurseDown' : 'each'](function (node) {
	        (0, _each3.default)(methods, function (method) {
	            if ((0, _isFunction3.default)(node[method])) {
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
	    if ((0, _isString3.default)(predicate)) {
	        fn = function fn(node) {
	            return (0, _isFunction3.default)(node[predicate]) ? node[predicate]() : node[predicate];
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

	        var _this = _possibleConstructorReturn(this, (TreeNodes.__proto__ || Object.getPrototypeOf(TreeNodes)).call(this));

	        _this._tree = tree;
	        _this.length = 0;

	        var treeNodes = _this;
	        if ((0, _isArray3.default)(array) || array instanceof TreeNodes) {
	            (0, _each3.default)(array, function (node) {
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
	                index = (0, _sortedIndexBy3.default)(this, object, this._tree.config.sort);
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
	            return baseStatePredicate.call(this, 'available', full);
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
	            return baseStatePredicate.call(this, 'collapsed', full);
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

	            (0, _each3.default)(this, pusher);
	            (0, _each3.default)(nodes, pusher);

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
	                    if (!(0, _isFunction3.default)(dest.addNodes)) {
	                        throw new Error('Destination must be an Inspire Tree instance.');
	                    }

	                    var newNodes = new TreeNodes(this._tree);

	                    (0, _each3.default)(nodes, function (node) {
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
	            (0, _each3.default)(this, iteratee);

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
	            return baseStatePredicate.call(this, 'editable', full);
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
	            return baseStatePredicate.call(this, 'editing', full);
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
	            return baseStatePredicate.call(this, 'expanded', full);
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

	            (0, _each3.default)(flat, function (node) {
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

	            (0, _each3.default)(this, function (node) {
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
	            return baseStatePredicate.call(this, 'focused', full);
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
	            return baseStatePredicate.call(this, 'hidden', full);
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
	            return baseStatePredicate.call(this, 'indeterminate', full);
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
	                    if ((0, _isArrayLike3.default)(object.children)) {
	                        // Setup existing node's children property if needed
	                        if (!(0, _isArrayLike3.default)(existingNode.children)) {
	                            existingNode.children = new TreeNodes(this._tree);
	                            existingNode.children._context = existingNode;
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

	            // Always mark this node as dirty
	            node.markDirty();

	            // If pushing this node anywhere but the end, other nodes may change.
	            if (this.length - 1 !== index) {
	                this.invoke('markDirty');
	            }

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
	            return baseStatePredicate.call(this, 'loading', full);
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

	            if ((0, _isArray3.default)(refs)) {
	                // Ensure incoming IDs are strings
	                refs = (0, _map3.default)(refs, function (element) {
	                    if ((0, _isNumber3.default)(element)) {
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

	            return (0, _isArray3.default)(refs) ? results : this;
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
	            return baseStatePredicate.call(this, 'removed', full);
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
	            return baseStatePredicate.call(this, 'selectable', full);
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
	            return baseStatePredicate.call(this, 'selected', full);
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
	                var sorted = (0, _sortBy3.default)(nodes, sorter);

	                nodes.length = 0;
	                (0, _each3.default)(sorted, function (node) {
	                    nodes.push(node);
	                });
	            }

	            return nodes;
	        }

	        /**
	         * Set state values for nodes in this collection.
	         *
	         * @category TreeNodes
	         * @param {string} name Property name.
	         * @param {boolean} newVal New value, if setting.
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
	         * @param {string} name Property name.
	         * @param {boolean} newVal New value, if setting.
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

	            (0, _each3.default)(this, function (node) {
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
	            return baseStatePredicate.call(this, 'visible', full);
	        }
	    }]);

	    return TreeNodes;
	}(_extendableBuiltin(Array));

	;

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(8),
	    baseIteratee = __webpack_require__(48),
	    baseMap = __webpack_require__(86),
	    isArray = __webpack_require__(4);

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
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
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
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGetTag = __webpack_require__(26),
	    isObjectLike = __webpack_require__(29);

	/** `Object#toString` result references. */
	var numberTag = '[object Number]';

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
	 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
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
	    return typeof value == 'number' || isObjectLike(value) && baseGetTag(value) == numberTag;
	}

	module.exports = isNumber;

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIteratee = __webpack_require__(48),
	    baseSortedIndexBy = __webpack_require__(172);

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
	 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
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
	  return baseSortedIndexBy(array, value, baseIteratee(iteratee, 2));
	}

	module.exports = sortedIndexBy;

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSymbol = __webpack_require__(74);

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
	      high = array == null ? 0 : array.length,
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
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _isFunction2 = __webpack_require__(25);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _isObject2 = __webpack_require__(27);

	var _isObject3 = _interopRequireDefault(_isObject2);

	exports.standardizePromise = standardizePromise;

	var _es6Promise = __webpack_require__(164);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
	      this._events.maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;
	      conf.wildcard && (this.wildcard = conf.wildcard);
	      conf.newListener && (this.newListener = conf.newListener);
	      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);

	      if (this.wildcard) {
	        this.listenerTree = {};
	      }
	    } else {
	      this._events.maxListeners = defaultMaxListeners;
	    }
	  }

	  function logPossibleMemoryLeak(count, eventName) {
	    var errorMsg = '(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.';

	    if (this.verboseMemoryLeak) {
	      errorMsg += ' Event name: %s.';
	      console.error(errorMsg, count, eventName);
	    } else {
	      console.error(errorMsg, count);
	    }

	    if (console.trace) {
	      console.trace();
	    }
	  }

	  function EventEmitter(conf) {
	    this._events = {};
	    this.newListener = false;
	    this.verboseMemoryLeak = false;
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

	    while (name !== undefined) {

	      if (!tree[name]) {
	        tree[name] = {};
	      }

	      tree = tree[name];

	      if (type.length === 0) {

	        if (!tree._listeners) {
	          tree._listeners = listener;
	        } else {
	          if (typeof tree._listeners === 'function') {
	            tree._listeners = [tree._listeners];
	          }

	          tree._listeners.push(listener);

	          if (!tree._listeners.warned && this._events.maxListeners > 0 && tree._listeners.length > this._events.maxListeners) {
	            tree._listeners.warned = true;
	            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
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
	    if (n !== undefined) {
	      this._events || init.call(this);
	      this._events.maxListeners = n;
	      if (!this._conf) this._conf = {};
	      this._conf.maxListeners = n;
	    }
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
	    } else {
	      if (typeof this._events[type] === 'function') {
	        // Change to array.
	        this._events[type] = [this._events[type]];
	      }

	      // If we've already got an array, just append.
	      this._events[type].push(listener);

	      // Check for listener leak
	      if (!this._events[type].warned && this._events.maxListeners > 0 && this._events[type].length > this._events.maxListeners) {
	        this._events[type].warned = true;
	        logPossibleMemoryLeak.call(this, this._events[type].length, type);
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
	        if (obj instanceof Function || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== "object" || obj === null) continue;
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
	    } else if (this._events) {
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

	  EventEmitter.prototype.listenerCount = function (type) {
	    return this.listeners(type).length;
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
/* 175 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	"use strict";

/***/ }
/******/ ])
});
;