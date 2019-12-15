/*!
 * JqTree 1.4.12
 * 
 * Copyright 2019 Marco Braak
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Position;
(function (Position) {
    Position[Position["Before"] = 1] = "Before";
    Position[Position["After"] = 2] = "After";
    Position[Position["Inside"] = 3] = "Inside";
    Position[Position["None"] = 4] = "None";
})(Position = exports.Position || (exports.Position = {}));
var positionNames = {
    before: Position.Before,
    after: Position.After,
    inside: Position.Inside,
    none: Position.None
};
exports.getPositionName = function (position) {
    for (var name_1 in positionNames) {
        if (positionNames.hasOwnProperty(name_1)) {
            if (positionNames[name_1] === position) {
                return name_1;
            }
        }
    }
    return "";
};
exports.getPosition = function (name) { return positionNames[name]; };
var Node = /** @class */ (function () {
    function Node(o, isRoot, nodeClass) {
        if (isRoot === void 0) { isRoot = false; }
        if (nodeClass === void 0) { nodeClass = Node; }
        this.name = "";
        this.isEmptyFolder = false;
        this.setData(o);
        this.children = [];
        this.parent = null;
        if (isRoot) {
            this.idMapping = {};
            this.tree = this;
            this.nodeClass = nodeClass;
        }
    }
    /*
    Set the data of this node.

    setData(string): set the name of the node
    setdata(object): set attributes of the node

    Examples:
        setdata('node1')

        setData({ name: 'node1', id: 1});

        setData({ name: 'node2', id: 2, color: 'green'});

    * This is an internal function; it is not in the docs
    * Does not remove existing node values
    */
    Node.prototype.setData = function (o) {
        var _this = this;
        var setName = function (name) {
            if (name != null) {
                _this.name = name;
            }
        };
        if (!o) {
            return;
        }
        else if (typeof o !== "object") {
            setName(o);
        }
        else {
            for (var key in o) {
                if (o.hasOwnProperty(key)) {
                    var value = o[key];
                    if (key === "label") {
                        // You can use the 'label' key instead of 'name'; this is a legacy feature
                        setName(value);
                    }
                    else if (key !== "children") {
                        // You can't update the children using this function
                        this[key] = value;
                    }
                }
            }
        }
    };
    /*
    Create tree from data.

    Structure of data is:
    [
        {
            name: 'node1',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'node2'
        }
    ]
    */
    Node.prototype.loadFromData = function (data) {
        this.removeChildren();
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var o = data_1[_i];
            var node = new this.tree.nodeClass(o);
            this.addChild(node);
            if (typeof o === "object" && o["children"]) {
                if (o["children"].length === 0) {
                    node.isEmptyFolder = true;
                }
                else {
                    node.loadFromData(o["children"]);
                }
            }
        }
    };
    /*
    Add child.

    tree.addChild(
        new Node('child1')
    );
    */
    Node.prototype.addChild = function (node) {
        this.children.push(node);
        node._setParent(this);
    };
    /*
    Add child at position. Index starts at 0.

    tree.addChildAtPosition(
        new Node('abc'),
        1
    );
    */
    Node.prototype.addChildAtPosition = function (node, index) {
        this.children.splice(index, 0, node);
        node._setParent(this);
    };
    /*
    Remove child. This also removes the children of the node.

    tree.removeChild(tree.children[0]);
    */
    Node.prototype.removeChild = function (node) {
        // remove children from the index
        node.removeChildren();
        this._removeChild(node);
    };
    /*
    Get child index.

    var index = getChildIndex(node);
    */
    Node.prototype.getChildIndex = function (node) {
        return jQuery.inArray(node, this.children);
    };
    /*
    Does the tree have children?

    if (tree.hasChildren()) {
        //
    }
    */
    Node.prototype.hasChildren = function () {
        return this.children.length !== 0;
    };
    Node.prototype.isFolder = function () {
        return this.hasChildren() || this.load_on_demand;
    };
    /*
    Iterate over all the nodes in the tree.

    Calls callback with (node, level).

    The callback must return true to continue the iteration on current node.

    tree.iterate(
        function(node, level) {
           console.log(node.name);

           // stop iteration after level 2
           return (level <= 2);
        }
    );

    */
    Node.prototype.iterate = function (callback) {
        var _iterate = function (node, level) {
            if (node.children) {
                for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    var result = callback(child, level);
                    if (result && child.hasChildren()) {
                        _iterate(child, level + 1);
                    }
                }
            }
        };
        _iterate(this, 0);
    };
    /*
    Move node relative to another node.

    Argument position: Position.BEFORE, Position.AFTER or Position.Inside

    // move node1 after node2
    tree.moveNode(node1, node2, Position.AFTER);
    */
    Node.prototype.moveNode = function (movedNode, targetNode, position) {
        if (!movedNode.parent || movedNode.isParentOf(targetNode)) {
            // - Node is parent of target node
            // - Or, parent is empty
            return;
        }
        else {
            movedNode.parent._removeChild(movedNode);
            if (position === Position.After) {
                if (targetNode.parent) {
                    targetNode.parent.addChildAtPosition(movedNode, targetNode.parent.getChildIndex(targetNode) + 1);
                }
            }
            else if (position === Position.Before) {
                if (targetNode.parent) {
                    targetNode.parent.addChildAtPosition(movedNode, targetNode.parent.getChildIndex(targetNode));
                }
            }
            else if (position === Position.Inside) {
                // move inside as first child
                targetNode.addChildAtPosition(movedNode, 0);
            }
        }
    };
    /*
    Get the tree as data.
    */
    Node.prototype.getData = function (includeParent) {
        if (includeParent === void 0) { includeParent = false; }
        function getDataFromNodes(nodes) {
            return nodes.map(function (node) {
                var tmpNode = {};
                for (var k in node) {
                    if (["parent", "children", "element", "tree", "isEmptyFolder"].indexOf(k) === -1 &&
                        Object.prototype.hasOwnProperty.call(node, k)) {
                        var v = node[k];
                        tmpNode[k] = v;
                    }
                }
                if (node.hasChildren()) {
                    tmpNode["children"] = getDataFromNodes(node.children);
                }
                return tmpNode;
            });
        }
        if (includeParent) {
            return getDataFromNodes([this]);
        }
        else {
            return getDataFromNodes(this.children);
        }
    };
    Node.prototype.getNodeByName = function (name) {
        return this.getNodeByCallback(function (node) { return node.name === name; });
    };
    Node.prototype.getNodeByCallback = function (callback) {
        var result = null;
        this.iterate(function (node) {
            if (callback(node)) {
                result = node;
                return false;
            }
            else {
                return true;
            }
        });
        return result;
    };
    Node.prototype.addAfter = function (nodeInfo) {
        if (!this.parent) {
            return null;
        }
        else {
            var node = new this.tree.nodeClass(nodeInfo);
            var childIndex = this.parent.getChildIndex(this);
            this.parent.addChildAtPosition(node, childIndex + 1);
            if (typeof nodeInfo === "object" && nodeInfo["children"] && nodeInfo["children"].length) {
                node.loadFromData(nodeInfo["children"]);
            }
            return node;
        }
    };
    Node.prototype.addBefore = function (nodeInfo) {
        if (!this.parent) {
            return null;
        }
        else {
            var node = new this.tree.nodeClass(nodeInfo);
            var childIndex = this.parent.getChildIndex(this);
            this.parent.addChildAtPosition(node, childIndex);
            if (typeof nodeInfo === "object" && nodeInfo["children"] && nodeInfo["children"].length) {
                node.loadFromData(nodeInfo["children"]);
            }
            return node;
        }
    };
    Node.prototype.addParent = function (nodeInfo) {
        if (!this.parent) {
            return null;
        }
        else {
            var newParent = new this.tree.nodeClass(nodeInfo);
            newParent._setParent(this.tree);
            var originalParent = this.parent;
            for (var _i = 0, _a = originalParent.children; _i < _a.length; _i++) {
                var child = _a[_i];
                newParent.addChild(child);
            }
            originalParent.children = [];
            originalParent.addChild(newParent);
            return newParent;
        }
    };
    Node.prototype.remove = function () {
        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = null;
        }
    };
    Node.prototype.append = function (nodeInfo) {
        var node = new this.tree.nodeClass(nodeInfo);
        this.addChild(node);
        if (typeof nodeInfo === "object" && nodeInfo["children"] && nodeInfo["children"].length) {
            node.loadFromData(nodeInfo["children"]);
        }
        return node;
    };
    Node.prototype.prepend = function (nodeInfo) {
        var node = new this.tree.nodeClass(nodeInfo);
        this.addChildAtPosition(node, 0);
        if (typeof nodeInfo === "object" && nodeInfo["children"] && nodeInfo["children"].length) {
            node.loadFromData(nodeInfo["children"]);
        }
        return node;
    };
    Node.prototype.isParentOf = function (node) {
        var parent = node.parent;
        while (parent) {
            if (parent === this) {
                return true;
            }
            parent = parent.parent;
        }
        return false;
    };
    Node.prototype.getLevel = function () {
        var level = 0;
        var node = this; // eslint-disable-line @typescript-eslint/no-this-alias
        while (node.parent) {
            level += 1;
            node = node.parent;
        }
        return level;
    };
    Node.prototype.getNodeById = function (nodeId) {
        return this.idMapping[nodeId];
    };
    Node.prototype.addNodeToIndex = function (node) {
        if (node.id != null) {
            this.idMapping[node.id] = node;
        }
    };
    Node.prototype.removeNodeFromIndex = function (node) {
        if (node.id != null) {
            delete this.idMapping[node.id];
        }
    };
    Node.prototype.removeChildren = function () {
        var _this = this;
        this.iterate(function (child) {
            _this.tree.removeNodeFromIndex(child);
            return true;
        });
        this.children = [];
    };
    Node.prototype.getPreviousSibling = function () {
        if (!this.parent) {
            return null;
        }
        else {
            var previousIndex = this.parent.getChildIndex(this) - 1;
            if (previousIndex >= 0) {
                return this.parent.children[previousIndex];
            }
            else {
                return null;
            }
        }
    };
    Node.prototype.getNextSibling = function () {
        if (!this.parent) {
            return null;
        }
        else {
            var nextIndex = this.parent.getChildIndex(this) + 1;
            if (nextIndex < this.parent.children.length) {
                return this.parent.children[nextIndex];
            }
            else {
                return null;
            }
        }
    };
    Node.prototype.getNodesByProperty = function (key, value) {
        return this.filter(function (node) { return node[key] === value; });
    };
    Node.prototype.filter = function (f) {
        var result = [];
        this.iterate(function (node) {
            if (f(node)) {
                result.push(node);
            }
            return true;
        });
        return result;
    };
    Node.prototype.getNextNode = function (includeChildren) {
        if (includeChildren === void 0) { includeChildren = true; }
        if (includeChildren && this.hasChildren() && this.is_open) {
            // First child
            return this.children[0];
        }
        else {
            if (!this.parent) {
                return null;
            }
            else {
                var nextSibling = this.getNextSibling();
                if (nextSibling) {
                    // Next sibling
                    return nextSibling;
                }
                else {
                    // Next node of parent
                    return this.parent.getNextNode(false);
                }
            }
        }
    };
    Node.prototype.getPreviousNode = function () {
        if (!this.parent) {
            return null;
        }
        else {
            var previousSibling = this.getPreviousSibling();
            if (previousSibling) {
                if (!previousSibling.hasChildren() || !previousSibling.is_open) {
                    // Previous sibling
                    return previousSibling;
                }
                else {
                    // Last child of previous sibling
                    return previousSibling.getLastChild();
                }
            }
            else {
                return this.getParent();
            }
        }
    };
    Node.prototype.getParent = function () {
        // Return parent except if it is the root node
        if (!this.parent) {
            return null;
        }
        else if (!this.parent.parent) {
            // Root node -> null
            return null;
        }
        else {
            return this.parent;
        }
    };
    Node.prototype.getLastChild = function () {
        if (!this.hasChildren()) {
            return null;
        }
        else {
            var lastChild = this.children[this.children.length - 1];
            if (!lastChild.hasChildren() || !lastChild.is_open) {
                return lastChild;
            }
            else {
                return lastChild.getLastChild();
            }
        }
    };
    // Init Node from data without making it the root of the tree
    Node.prototype.initFromData = function (data) {
        var _this = this;
        var addNode = function (nodeData) {
            _this.setData(nodeData);
            if (nodeData["children"]) {
                addChildren(nodeData["children"]);
            }
        };
        var addChildren = function (childrenData) {
            for (var _i = 0, childrenData_1 = childrenData; _i < childrenData_1.length; _i++) {
                var child = childrenData_1[_i];
                var node = new _this.tree.nodeClass("");
                node.initFromData(child);
                _this.addChild(node);
            }
        };
        addNode(data);
    };
    Node.prototype._setParent = function (parent) {
        this.parent = parent;
        this.tree = parent.tree;
        this.tree.addNodeToIndex(this);
    };
    Node.prototype._removeChild = function (node) {
        this.children.splice(this.getChildIndex(node), 1);
        this.tree.removeNodeFromIndex(node);
    };
    return Node;
}());
exports.Node = Node;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.isInt = function (n) { return typeof n === "number" && n % 1 === 0; };
exports.isFunction = function (v) { return typeof v === "function"; };
// Escape a string for HTML interpolation; copied from underscore js
exports.htmlEscape = function (text) {
    return ("" + text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
};
exports.getBoolString = function (value) { return (value ? "true" : "false"); };


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SimpleWidget = /** @class */ (function () {
    function SimpleWidget(el, options) {
        this.$el = jQuery(el);
        var defaults = this.constructor.defaults;
        this.options = jQuery.extend({}, defaults, options);
    }
    SimpleWidget.register = function (widgetClass, widgetName) {
        var getDataKey = function () { return "simple_widget_" + widgetName; };
        function getWidgetData(el, dataKey) {
            var widget = jQuery.data(el, dataKey);
            if (widget && widget instanceof SimpleWidget) {
                return widget;
            }
            else {
                return null;
            }
        }
        function createWidget($el, options) {
            var dataKey = getDataKey();
            for (var _i = 0, _a = $el.get(); _i < _a.length; _i++) {
                var el = _a[_i];
                var existingWidget = getWidgetData(el, dataKey);
                if (!existingWidget) {
                    var widget = new widgetClass(el, options);
                    if (!jQuery.data(el, dataKey)) {
                        jQuery.data(el, dataKey, widget);
                    }
                    // Call init after setting data, so we can call methods
                    widget._init();
                }
            }
            return $el;
        }
        function destroyWidget($el) {
            var dataKey = getDataKey();
            for (var _i = 0, _a = $el.get(); _i < _a.length; _i++) {
                var el = _a[_i];
                var widget = getWidgetData(el, dataKey);
                if (widget) {
                    widget.destroy();
                }
                jQuery.removeData(el, dataKey);
            }
        }
        function callFunction($el, functionName, args) {
            var result = null;
            for (var _i = 0, _a = $el.get(); _i < _a.length; _i++) {
                var el = _a[_i];
                var widget = jQuery.data(el, getDataKey());
                if (widget && widget instanceof SimpleWidget) {
                    var widgetFunction = widget[functionName];
                    if (widgetFunction && typeof widgetFunction === "function") {
                        result = widgetFunction.apply(widget, args);
                    }
                }
            }
            return result;
        }
        jQuery.fn[widgetName] = function (argument1) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (argument1 === undefined || typeof argument1 === "object") {
                var options = argument1;
                return createWidget(this, options);
            }
            else if (typeof argument1 === "string" && argument1[0] !== "_") {
                var functionName = argument1;
                if (functionName === "destroy") {
                    return destroyWidget(this);
                }
                else if (functionName === "get_widget_class") {
                    return widgetClass;
                }
                else {
                    return callFunction(this, functionName, args);
                }
            }
        };
    };
    SimpleWidget.prototype.destroy = function () {
        this._deinit();
    };
    SimpleWidget.prototype._init = function () {
        //
    };
    SimpleWidget.prototype._deinit = function () {
        //
    };
    SimpleWidget.defaults = {};
    return SimpleWidget;
}());
exports["default"] = SimpleWidget;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var version_1 = __webpack_require__(5);
var jQuery = __webpack_require__(2);
var drag_and_drop_handler_1 = __webpack_require__(6);
var elements_renderer_1 = __webpack_require__(7);
var data_loader_1 = __webpack_require__(8);
var key_handler_1 = __webpack_require__(9);
var mouse_widget_1 = __webpack_require__(10);
var save_state_handler_1 = __webpack_require__(11);
var scroll_handler_1 = __webpack_require__(12);
var select_node_handler_1 = __webpack_require__(13);
var simple_widget_1 = __webpack_require__(3);
var node_1 = __webpack_require__(0);
var util_1 = __webpack_require__(1);
var node_element_1 = __webpack_require__(14);
var NODE_PARAM_IS_EMPTY = "Node parameter is empty";
var PARAM_IS_EMPTY = "Parameter is empty: ";
var JqTreeWidget = /** @class */ (function (_super) {
    __extends(JqTreeWidget, _super);
    function JqTreeWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._handleClick = function (e) {
            var clickTarget = _this._getClickTarget(e.target);
            if (clickTarget) {
                if (clickTarget.type === "button") {
                    _this.toggle(clickTarget.node, _this.options.slide);
                    e.preventDefault();
                    e.stopPropagation();
                }
                else if (clickTarget.type === "label") {
                    var node = clickTarget.node;
                    var event_1 = _this._triggerEvent("tree.click", {
                        node: node,
                        click_event: e // eslint-disable-line @typescript-eslint/camelcase
                    });
                    if (!event_1.isDefaultPrevented()) {
                        _this._selectNode(node);
                    }
                }
            }
        };
        _this._handleDblclick = function (e) {
            var clickTarget = _this._getClickTarget(e.target);
            if (clickTarget && clickTarget.type === "label") {
                _this._triggerEvent("tree.dblclick", {
                    node: clickTarget.node,
                    click_event: e // eslint-disable-line @typescript-eslint/camelcase
                });
            }
        };
        _this._handleContextmenu = function (e) {
            var $div = jQuery(e.target).closest("ul.jqtree-tree .jqtree-element");
            if ($div.length) {
                var node = _this._getNode($div);
                if (node) {
                    e.preventDefault();
                    e.stopPropagation();
                    _this._triggerEvent("tree.contextmenu", {
                        node: node,
                        click_event: e // eslint-disable-line @typescript-eslint/camelcase
                    });
                    return false;
                }
            }
            return null;
        };
        return _this;
    }
    JqTreeWidget.prototype.toggle = function (node, slideParam) {
        if (!node) {
            throw Error(NODE_PARAM_IS_EMPTY);
        }
        var slide = slideParam == null ? this.options.slide : slideParam;
        if (node.is_open) {
            this.closeNode(node, slide);
        }
        else {
            this.openNode(node, slide);
        }
        return this.element;
    };
    JqTreeWidget.prototype.getTree = function () {
        return this.tree;
    };
    JqTreeWidget.prototype.selectNode = function (node, optionsParam) {
        this._selectNode(node, optionsParam);
        return this.element;
    };
    JqTreeWidget.prototype.getSelectedNode = function () {
        if (this.selectNodeHandler) {
            return this.selectNodeHandler.getSelectedNode();
        }
        else {
            return false;
        }
    };
    JqTreeWidget.prototype.toJson = function () {
        return JSON.stringify(this.tree.getData());
    };
    JqTreeWidget.prototype.loadData = function (data, parentNode) {
        this._loadData(data, parentNode);
        return this.element;
    };
    /*
    signatures:
    - loadDataFromUrl(url, parent_node=null, on_finished=null)
        loadDataFromUrl('/my_data');
        loadDataFromUrl('/my_data', node1);
        loadDataFromUrl('/my_data', node1, function() { console.log('finished'); });
        loadDataFromUrl('/my_data', null, function() { console.log('finished'); });

    - loadDataFromUrl(parent_node=null, on_finished=null)
        loadDataFromUrl();
        loadDataFromUrl(node1);
        loadDataFromUrl(null, function() { console.log('finished'); });
        loadDataFromUrl(node1, function() { console.log('finished'); });
    */
    JqTreeWidget.prototype.loadDataFromUrl = function (param1, param2, param3) {
        if (typeof param1 === "string") {
            // first parameter is url
            this._loadDataFromUrl(param1, param2, param3);
        }
        else {
            // first parameter is not url
            this._loadDataFromUrl(null, param1, param2);
        }
        return this.element;
    };
    JqTreeWidget.prototype.reload = function (onFinished) {
        this._loadDataFromUrl(null, null, onFinished);
        return this.element;
    };
    JqTreeWidget.prototype.getNodeById = function (nodeId) {
        return this.tree.getNodeById(nodeId);
    };
    JqTreeWidget.prototype.getNodeByName = function (name) {
        return this.tree.getNodeByName(name);
    };
    JqTreeWidget.prototype.getNodesByProperty = function (key, value) {
        return this.tree.getNodesByProperty(key, value);
    };
    JqTreeWidget.prototype.getNodeByHtmlElement = function (element) {
        return this._getNode(jQuery(element));
    };
    JqTreeWidget.prototype.getNodeByCallback = function (callback) {
        return this.tree.getNodeByCallback(callback);
    };
    JqTreeWidget.prototype.openNode = function (node, param1, param2) {
        var _this = this;
        if (!node) {
            throw Error(NODE_PARAM_IS_EMPTY);
        }
        var parseParams = function () {
            var onFinished;
            var slide;
            if (util_1.isFunction(param1)) {
                onFinished = param1;
                slide = null;
            }
            else {
                slide = param1;
                onFinished = param2;
            }
            if (slide == null) {
                slide = _this.options.slide;
            }
            return [slide, onFinished];
        };
        var _a = parseParams(), slide = _a[0], onFinished = _a[1];
        this._openNode(node, slide, onFinished);
        return this.element;
    };
    JqTreeWidget.prototype.closeNode = function (node, slideParam) {
        if (!node) {
            throw Error(NODE_PARAM_IS_EMPTY);
        }
        var slide = slideParam == null ? this.options.slide : slideParam;
        if (node.isFolder() || node.isEmptyFolder) {
            new node_element_1.FolderElement(node, this).close(slide, this.options.animationSpeed);
            this._saveState();
        }
        return this.element;
    };
    JqTreeWidget.prototype.isDragging = function () {
        if (this.dndHandler) {
            return this.dndHandler.isDragging;
        }
        else {
            return false;
        }
    };
    JqTreeWidget.prototype.refreshHitAreas = function () {
        if (this.dndHandler) {
            this.dndHandler.refresh();
        }
        return this.element;
    };
    JqTreeWidget.prototype.addNodeAfter = function (newNodeInfo, existingNode) {
        var newNode = existingNode.addAfter(newNodeInfo);
        if (newNode) {
            this._refreshElements(existingNode.parent);
        }
        return newNode;
    };
    JqTreeWidget.prototype.addNodeBefore = function (newNodeInfo, existingNode) {
        if (!existingNode) {
            throw Error(PARAM_IS_EMPTY + "existingNode");
        }
        var newNode = existingNode.addBefore(newNodeInfo);
        if (newNode) {
            this._refreshElements(existingNode.parent);
        }
        return newNode;
    };
    JqTreeWidget.prototype.addParentNode = function (newNodeInfo, existingNode) {
        if (!existingNode) {
            throw Error(PARAM_IS_EMPTY + "existingNode");
        }
        var newNode = existingNode.addParent(newNodeInfo);
        if (newNode) {
            this._refreshElements(newNode.parent);
        }
        return newNode;
    };
    JqTreeWidget.prototype.removeNode = function (inode) {
        if (!inode) {
            throw Error(NODE_PARAM_IS_EMPTY);
        }
        var node = inode;
        if (node.parent && this.selectNodeHandler) {
            this.selectNodeHandler.removeFromSelection(node, true); // including children
            var parent_1 = node.parent;
            node.remove();
            this._refreshElements(parent_1);
        }
        return this.element;
    };
    JqTreeWidget.prototype.appendNode = function (newNodeInfo, parentNodeParam) {
        var parentNode = parentNodeParam || this.tree;
        var node = parentNode.append(newNodeInfo);
        this._refreshElements(parentNode);
        return node;
    };
    JqTreeWidget.prototype.prependNode = function (newNodeInfo, parentNodeParam) {
        var parentNode = !parentNodeParam ? this.tree : parentNodeParam;
        var node = parentNode.prepend(newNodeInfo);
        this._refreshElements(parentNode);
        return node;
    };
    JqTreeWidget.prototype.updateNode = function (node, data) {
        if (!node) {
            throw Error(NODE_PARAM_IS_EMPTY);
        }
        var idIsChanged = data.id && data.id !== node.id;
        if (idIsChanged) {
            this.tree.removeNodeFromIndex(node);
        }
        node.setData(data);
        if (idIsChanged) {
            this.tree.addNodeToIndex(node);
        }
        if (typeof data === "object" && data.children) {
            node.removeChildren();
            if (data.children.length) {
                node.loadFromData(data.children);
            }
        }
        this._refreshElements(node);
        this._selectCurrentNode();
        return this.element;
    };
    JqTreeWidget.prototype.moveNode = function (node, targetNode, position) {
        if (!node) {
            throw Error(NODE_PARAM_IS_EMPTY);
        }
        if (!targetNode) {
            throw Error(PARAM_IS_EMPTY + "targetNode");
        }
        var positionIndex = node_1.getPosition(position);
        this.tree.moveNode(node, targetNode, positionIndex);
        this._refreshElements(null);
        return this.element;
    };
    JqTreeWidget.prototype.getStateFromStorage = function () {
        if (this.saveStateHandler) {
            return this.saveStateHandler.getStateFromStorage();
        }
    };
    JqTreeWidget.prototype.addToSelection = function (inode, mustSetFocus) {
        if (!inode) {
            throw Error(NODE_PARAM_IS_EMPTY);
        }
        var node = inode;
        if (this.selectNodeHandler) {
            this.selectNodeHandler.addToSelection(node);
            this._getNodeElementForNode(node).select(mustSetFocus === undefined ? true : mustSetFocus);
            this._saveState();
        }
        return this.element;
    };
    JqTreeWidget.prototype.getSelectedNodes = function () {
        if (!this.selectNodeHandler) {
            return [];
        }
        else {
            return this.selectNodeHandler.getSelectedNodes();
        }
    };
    JqTreeWidget.prototype.isNodeSelected = function (node) {
        if (!node) {
            throw Error(NODE_PARAM_IS_EMPTY);
        }
        if (!this.selectNodeHandler) {
            return false;
        }
        else {
            return this.selectNodeHandler.isNodeSelected(node);
        }
    };
    JqTreeWidget.prototype.removeFromSelection = function (node) {
        if (!node) {
            throw Error(NODE_PARAM_IS_EMPTY);
        }
        if (this.selectNodeHandler) {
            this.selectNodeHandler.removeFromSelection(node);
            this._getNodeElementForNode(node).deselect();
            this._saveState();
        }
        return this.element;
    };
    JqTreeWidget.prototype.scrollToNode = function (node) {
        if (!node) {
            throw Error(NODE_PARAM_IS_EMPTY);
        }
        if (this.scrollHandler) {
            var nodeOffset = jQuery(node.element).offset();
            var nodeTop = nodeOffset ? nodeOffset.top : 0;
            var treeOffset = this.$el.offset();
            var treeTop = treeOffset ? treeOffset.top : 0;
            var top_1 = nodeTop - treeTop;
            this.scrollHandler.scrollToY(top_1);
        }
        return this.element;
    };
    JqTreeWidget.prototype.getState = function () {
        if (this.saveStateHandler) {
            return this.saveStateHandler.getState();
        }
    };
    JqTreeWidget.prototype.setState = function (state) {
        if (this.saveStateHandler) {
            this.saveStateHandler.setInitialState(state);
            this._refreshElements(null);
        }
        return this.element;
    };
    JqTreeWidget.prototype.setOption = function (option, value) {
        this.options[option] = value;
        return this.element;
    };
    JqTreeWidget.prototype.moveDown = function () {
        if (this.keyHandler) {
            this.keyHandler.moveDown();
        }
        return this.element;
    };
    JqTreeWidget.prototype.moveUp = function () {
        if (this.keyHandler) {
            this.keyHandler.moveUp();
        }
        return this.element;
    };
    JqTreeWidget.prototype.getVersion = function () {
        return version_1["default"];
    };
    JqTreeWidget.prototype.testGenerateHitAreas = function (movingNode) {
        if (!this.dndHandler) {
            return [];
        }
        else {
            this.dndHandler.currentItem = this._getNodeElementForNode(movingNode);
            this.dndHandler.generateHitAreas();
            return this.dndHandler.hitAreas;
        }
    };
    JqTreeWidget.prototype._triggerEvent = function (eventName, values) {
        var event = jQuery.Event(eventName);
        jQuery.extend(event, values);
        this.element.trigger(event);
        return event;
    };
    JqTreeWidget.prototype._openNode = function (node, slide, onFinished) {
        var _this = this;
        if (slide === void 0) { slide = true; }
        var doOpenNode = function (_node, _slide, _onFinished) {
            var folderElement = new node_element_1.FolderElement(_node, _this);
            folderElement.open(_onFinished, _slide, _this.options.animationSpeed);
        };
        if (node.isFolder() || node.isEmptyFolder) {
            if (node.load_on_demand) {
                this._loadFolderOnDemand(node, slide, onFinished);
            }
            else {
                var parent_2 = node.parent;
                while (parent_2) {
                    // nb: do not open root element
                    if (parent_2.parent) {
                        doOpenNode(parent_2, false, null);
                    }
                    parent_2 = parent_2.parent;
                }
                doOpenNode(node, slide, onFinished);
                this._saveState();
            }
        }
    };
    /*
    Redraw the tree or part of the tree.
     from_node: redraw this subtree
    */
    JqTreeWidget.prototype._refreshElements = function (fromNode) {
        this.renderer.render(fromNode);
        this._triggerEvent("tree.refresh");
    };
    JqTreeWidget.prototype._getNodeElementForNode = function (node) {
        if (node.isFolder()) {
            return new node_element_1.FolderElement(node, this);
        }
        else {
            return new node_element_1.NodeElement(node, this);
        }
    };
    JqTreeWidget.prototype._getNodeElement = function ($element) {
        var node = this._getNode($element);
        if (node) {
            return this._getNodeElementForNode(node);
        }
        else {
            return null;
        }
    };
    JqTreeWidget.prototype._containsElement = function (element) {
        var node = this._getNode(jQuery(element));
        return node != null && node.tree === this.tree;
    };
    JqTreeWidget.prototype._getScrollLeft = function () {
        return (this.scrollHandler && this.scrollHandler.getScrollLeft()) || 0;
    };
    JqTreeWidget.prototype._init = function () {
        _super.prototype._init.call(this);
        this.element = this.$el;
        this.mouseDelay = 300;
        this.isInitialized = false;
        this.options.rtl = this._getRtlOption();
        if (this.options.closedIcon === null) {
            this.options.closedIcon = this._getDefaultClosedIcon();
        }
        this.renderer = new elements_renderer_1["default"](this);
        this.dataLoader = new data_loader_1["default"](this);
        if (save_state_handler_1["default"] != null) {
            this.saveStateHandler = new save_state_handler_1["default"](this);
        }
        else {
            this.options.saveState = false;
        }
        if (select_node_handler_1["default"] != null) {
            this.selectNodeHandler = new select_node_handler_1["default"](this);
        }
        if (drag_and_drop_handler_1.DragAndDropHandler != null) {
            this.dndHandler = new drag_and_drop_handler_1.DragAndDropHandler(this);
        }
        else {
            this.options.dragAndDrop = false;
        }
        if (scroll_handler_1["default"] != null) {
            this.scrollHandler = new scroll_handler_1["default"](this);
        }
        if (key_handler_1["default"] != null && select_node_handler_1["default"] != null) {
            this.keyHandler = new key_handler_1["default"](this);
        }
        this._initData();
        this.element.click(this._handleClick);
        this.element.dblclick(this._handleDblclick);
        if (this.options.useContextMenu) {
            this.element.on("contextmenu", this._handleContextmenu);
        }
    };
    JqTreeWidget.prototype._deinit = function () {
        this.element.empty();
        this.element.off();
        if (this.keyHandler) {
            this.keyHandler.deinit();
        }
        this.tree = new node_1.Node({}, true);
        _super.prototype._deinit.call(this);
    };
    JqTreeWidget.prototype._mouseCapture = function (positionInfo) {
        if (this.options.dragAndDrop && this.dndHandler) {
            return this.dndHandler.mouseCapture(positionInfo);
        }
        else {
            return false;
        }
    };
    JqTreeWidget.prototype._mouseStart = function (positionInfo) {
        if (this.options.dragAndDrop && this.dndHandler) {
            return this.dndHandler.mouseStart(positionInfo);
        }
        else {
            return false;
        }
    };
    JqTreeWidget.prototype._mouseDrag = function (positionInfo) {
        if (this.options.dragAndDrop && this.dndHandler) {
            var result = this.dndHandler.mouseDrag(positionInfo);
            if (this.scrollHandler) {
                this.scrollHandler.checkScrolling();
            }
            return result;
        }
        else {
            return false;
        }
    };
    JqTreeWidget.prototype._mouseStop = function (positionInfo) {
        if (this.options.dragAndDrop && this.dndHandler) {
            return this.dndHandler.mouseStop(positionInfo);
        }
        else {
            return false;
        }
    };
    JqTreeWidget.prototype._initData = function () {
        if (this.options.data) {
            this._loadData(this.options.data, null);
        }
        else {
            var dataUrl = this._getDataUrlInfo(null);
            if (dataUrl) {
                this._loadDataFromUrl(null, null, null);
            }
            else {
                this._loadData([], null);
            }
        }
    };
    JqTreeWidget.prototype._getDataUrlInfo = function (node) {
        var _this = this;
        var dataUrl = this.options.dataUrl || this.element.data("url");
        var getUrlFromString = function () {
            var urlInfo = { url: dataUrl };
            setUrlInfoData(urlInfo);
            return urlInfo;
        };
        var setUrlInfoData = function (urlInfo) {
            if (node && node.id) {
                // Load on demand of a subtree; add node parameter
                var data = { node: node.id };
                urlInfo["data"] = data;
            }
            else {
                // Add selected_node parameter
                var selectedNodeId = _this._getNodeIdToBeSelected();
                if (selectedNodeId) {
                    var data = { selected_node: selectedNodeId }; // eslint-disable-line @typescript-eslint/camelcase
                    urlInfo["data"] = data;
                }
            }
        };
        if (typeof dataUrl === "function") {
            return dataUrl(node);
        }
        else if (typeof dataUrl === "string") {
            return getUrlFromString();
        }
        else if (typeof dataUrl === "object") {
            setUrlInfoData(dataUrl);
            return dataUrl;
        }
        else {
            return dataUrl;
        }
    };
    JqTreeWidget.prototype._getNodeIdToBeSelected = function () {
        if (this.options.saveState && this.saveStateHandler) {
            return this.saveStateHandler.getNodeIdToBeSelected();
        }
        else {
            return null;
        }
    };
    JqTreeWidget.prototype._initTree = function (data) {
        var _this = this;
        var doInit = function () {
            if (!_this.isInitialized) {
                _this.isInitialized = true;
                _this._triggerEvent("tree.init");
            }
        };
        this.tree = new this.options.nodeClass(null, true, this.options.nodeClass);
        if (this.selectNodeHandler) {
            this.selectNodeHandler.clear();
        }
        this.tree.loadFromData(data);
        var mustLoadOnDemand = this._setInitialState();
        this._refreshElements(null);
        if (!mustLoadOnDemand) {
            doInit();
        }
        else {
            // Load data on demand and then init the tree
            this._setInitialStateOnDemand(doInit);
        }
    };
    // Set initial state, either by restoring the state or auto-opening nodes
    // result: must load nodes on demand?
    JqTreeWidget.prototype._setInitialState = function () {
        var _this = this;
        var restoreState = function () {
            // result: is state restored, must load on demand?
            if (!(_this.options.saveState && _this.saveStateHandler)) {
                return [false, false];
            }
            else {
                var state = _this.saveStateHandler.getStateFromStorage();
                if (!state) {
                    return [false, false];
                }
                else {
                    var mustLoadOnDemand_1 = _this.saveStateHandler.setInitialState(state);
                    // return true: the state is restored
                    return [true, mustLoadOnDemand_1];
                }
            }
        };
        var autoOpenNodes = function () {
            // result: must load on demand?
            if (_this.options.autoOpen === false) {
                return false;
            }
            var maxLevel = _this._getAutoOpenMaxLevel();
            var mustLoadOnDemand = false;
            _this.tree.iterate(function (node, level) {
                if (node.load_on_demand) {
                    mustLoadOnDemand = true;
                    return false;
                }
                else if (!node.hasChildren()) {
                    return false;
                }
                else {
                    node.is_open = true; // eslint-disable-line @typescript-eslint/camelcase
                    return level !== maxLevel;
                }
            });
            return mustLoadOnDemand;
        };
        var _a = restoreState(), isRestored = _a[0], mustLoadOnDemand = _a[1]; // eslint-disable-line prefer-const
        if (!isRestored) {
            mustLoadOnDemand = autoOpenNodes();
        }
        return mustLoadOnDemand;
    };
    // Set the initial state for nodes that are loaded on demand
    // Call cb_finished when done
    JqTreeWidget.prototype._setInitialStateOnDemand = function (cbFinished) {
        var _this = this;
        var restoreState = function () {
            if (!(_this.options.saveState && _this.saveStateHandler)) {
                return false;
            }
            else {
                var state = _this.saveStateHandler.getStateFromStorage();
                if (!state) {
                    return false;
                }
                else {
                    _this.saveStateHandler.setInitialStateOnDemand(state, cbFinished);
                    return true;
                }
            }
        };
        var autoOpenNodes = function () {
            var maxLevel = _this._getAutoOpenMaxLevel();
            var loadingCount = 0;
            var loadAndOpenNode = function (node) {
                loadingCount += 1;
                _this._openNode(node, false, function () {
                    loadingCount -= 1;
                    openNodes();
                });
            };
            var openNodes = function () {
                _this.tree.iterate(function (node, level) {
                    if (node.load_on_demand) {
                        if (!node.is_loading) {
                            loadAndOpenNode(node);
                        }
                        return false;
                    }
                    else {
                        _this._openNode(node, false, null);
                        return level !== maxLevel;
                    }
                });
                if (loadingCount === 0) {
                    cbFinished();
                }
            };
            openNodes();
        };
        if (!restoreState()) {
            autoOpenNodes();
        }
    };
    JqTreeWidget.prototype._getAutoOpenMaxLevel = function () {
        if (this.options.autoOpen === true) {
            return -1;
        }
        else {
            return parseInt(this.options.autoOpen, 10);
        }
    };
    JqTreeWidget.prototype._getClickTarget = function (element) {
        var $target = jQuery(element);
        var $button = $target.closest(".jqtree-toggler");
        if ($button.length) {
            var node = this._getNode($button);
            if (node) {
                return {
                    type: "button",
                    node: node
                };
            }
        }
        else {
            var $el = $target.closest(".jqtree-element");
            if ($el.length) {
                var node = this._getNode($el);
                if (node) {
                    return {
                        type: "label",
                        node: node
                    };
                }
            }
        }
        return null;
    };
    JqTreeWidget.prototype._getNode = function ($element) {
        var $li = $element.closest("li.jqtree_common");
        if ($li.length === 0) {
            return null;
        }
        else {
            return $li.data("node");
        }
    };
    JqTreeWidget.prototype._saveState = function () {
        if (this.options.saveState && this.saveStateHandler) {
            this.saveStateHandler.saveState();
        }
    };
    JqTreeWidget.prototype._selectCurrentNode = function () {
        var node = this.getSelectedNode();
        if (node) {
            var nodeElement = this._getNodeElementForNode(node);
            if (nodeElement) {
                nodeElement.select(true);
            }
        }
    };
    JqTreeWidget.prototype._deselectCurrentNode = function () {
        var node = this.getSelectedNode();
        if (node) {
            this.removeFromSelection(node);
        }
    };
    JqTreeWidget.prototype._getDefaultClosedIcon = function () {
        if (this.options.rtl) {
            // triangle to the left
            return "&#x25c0;";
        }
        else {
            // triangle to the right
            return "&#x25ba;";
        }
    };
    JqTreeWidget.prototype._getRtlOption = function () {
        if (this.options.rtl != null) {
            return this.options.rtl;
        }
        else {
            var dataRtl = this.element.data("rtl");
            if (dataRtl != null && dataRtl !== false) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    JqTreeWidget.prototype._selectNode = function (inode, optionsParam) {
        var _this = this;
        if (!this.selectNodeHandler) {
            return;
        }
        var defaultOptions = { mustSetFocus: true, mustToggle: true };
        var selectOptions = __assign(__assign({}, defaultOptions), (optionsParam || {}));
        var canSelect = function () {
            if (_this.options.onCanSelectNode) {
                return _this.options.selectable && _this.options.onCanSelectNode(inode);
            }
            else {
                return _this.options.selectable;
            }
        };
        var openParents = function () {
            var parent = inode.parent;
            if (parent && parent.parent && !parent.is_open) {
                _this.openNode(parent, false);
            }
        };
        var saveState = function () {
            if (_this.options.saveState && _this.saveStateHandler) {
                _this.saveStateHandler.saveState();
            }
        };
        if (!inode) {
            // Called with empty node -> deselect current node
            this._deselectCurrentNode();
            saveState();
            return;
        }
        if (!canSelect()) {
            return;
        }
        var node = inode;
        if (this.selectNodeHandler.isNodeSelected(node)) {
            if (selectOptions.mustToggle) {
                this._deselectCurrentNode();
                this._triggerEvent("tree.select", {
                    node: null,
                    previous_node: node // eslint-disable-line @typescript-eslint/camelcase
                });
            }
        }
        else {
            var deselectedNode = this.getSelectedNode();
            this._deselectCurrentNode();
            this.addToSelection(node, selectOptions.mustSetFocus);
            this._triggerEvent("tree.select", {
                node: node,
                deselected_node: deselectedNode // eslint-disable-line @typescript-eslint/camelcase
            });
            openParents();
        }
        saveState();
    };
    JqTreeWidget.prototype._loadData = function (data, parentNode) {
        if (!data) {
            return;
        }
        else {
            this._triggerEvent("tree.load_data", { tree_data: data }); // eslint-disable-line @typescript-eslint/camelcase
            if (parentNode) {
                this._deselectNodes(parentNode);
                this._loadSubtree(data, parentNode);
            }
            else {
                this._initTree(data);
            }
            if (this.isDragging() && this.dndHandler) {
                this.dndHandler.refresh();
            }
        }
    };
    JqTreeWidget.prototype._deselectNodes = function (parentNode) {
        if (this.selectNodeHandler) {
            var selectedNodesUnderParent = this.selectNodeHandler.getSelectedNodesUnder(parentNode);
            for (var _i = 0, selectedNodesUnderParent_1 = selectedNodesUnderParent; _i < selectedNodesUnderParent_1.length; _i++) {
                var n = selectedNodesUnderParent_1[_i];
                this.selectNodeHandler.removeFromSelection(n);
            }
        }
    };
    JqTreeWidget.prototype._loadSubtree = function (data, parentNode) {
        parentNode.loadFromData(data);
        parentNode.load_on_demand = false; // eslint-disable-line @typescript-eslint/camelcase
        parentNode.is_loading = false; // eslint-disable-line @typescript-eslint/camelcase
        this._refreshElements(parentNode);
    };
    JqTreeWidget.prototype._loadDataFromUrl = function (urlInfoParam, parentNode, onFinished) {
        var urlInfo = urlInfoParam || this._getDataUrlInfo(parentNode);
        this.dataLoader.loadFromUrl(urlInfo, parentNode, onFinished);
    };
    JqTreeWidget.prototype._loadFolderOnDemand = function (node, slide, onFinished) {
        var _this = this;
        if (slide === void 0) { slide = true; }
        node.is_loading = true; // eslint-disable-line @typescript-eslint/camelcase
        this._loadDataFromUrl(null, node, function () {
            _this._openNode(node, slide, onFinished);
        });
    };
    JqTreeWidget.defaults = {
        animationSpeed: "fast",
        autoOpen: false,
        saveState: false,
        dragAndDrop: false,
        selectable: true,
        useContextMenu: true,
        onCanSelectNode: null,
        onSetStateFromStorage: null,
        onGetStateFromStorage: null,
        onCreateLi: null,
        onIsMoveHandle: null,
        // Can this node be moved?
        onCanMove: null,
        // Can this node be moved to this position? function(moved_node, target_node, position)
        onCanMoveTo: null,
        onLoadFailed: null,
        autoEscape: true,
        dataUrl: null,
        // The symbol to use for a closed node - ► BLACK RIGHT-POINTING POINTER
        // http://www.fileformat.info/info/unicode/char/25ba/index.htm
        closedIcon: null,
        // The symbol to use for an open node - ▼ BLACK DOWN-POINTING TRIANGLE
        // http://www.fileformat.info/info/unicode/char/25bc/index.htm
        openedIcon: "&#x25bc;",
        slide: true,
        nodeClass: node_1.Node,
        dataFilter: null,
        keyboardSupport: true,
        openFolderDelay: 500,
        rtl: false,
        onDragMove: null,
        onDragStop: null,
        buttonLeft: true,
        onLoading: null,
        showEmptyFolder: false,
        tabIndex: 0
    };
    return JqTreeWidget;
}(mouse_widget_1["default"]));
simple_widget_1["default"].register(JqTreeWidget, "tree");


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var version = "1.4.12";
exports["default"] = version;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var jQuery = __webpack_require__(2);
var node_1 = __webpack_require__(0);
var util_1 = __webpack_require__(1);
var DragAndDropHandler = /** @class */ (function () {
    function DragAndDropHandler(treeWidget) {
        this.treeWidget = treeWidget;
        this.hoveredArea = null;
        this.hitAreas = [];
        this.isDragging = false;
        this.currentItem = null;
        this.positionInfo = null;
    }
    DragAndDropHandler.prototype.mouseCapture = function (positionInfo) {
        var $element = jQuery(positionInfo.target);
        if (!this.mustCaptureElement($element)) {
            return null;
        }
        if (this.treeWidget.options.onIsMoveHandle && !this.treeWidget.options.onIsMoveHandle($element)) {
            return null;
        }
        var nodeElement = this.treeWidget._getNodeElement($element);
        if (nodeElement && this.treeWidget.options.onCanMove) {
            if (!this.treeWidget.options.onCanMove(nodeElement.node)) {
                nodeElement = null;
            }
        }
        this.currentItem = nodeElement;
        return this.currentItem != null;
    };
    DragAndDropHandler.prototype.generateHitAreas = function () {
        if (!this.currentItem) {
            this.hitAreas = [];
        }
        else {
            var hitAreasGenerator = new HitAreasGenerator(this.treeWidget.tree, this.currentItem.node, this.getTreeDimensions().bottom);
            this.hitAreas = hitAreasGenerator.generate();
        }
    };
    DragAndDropHandler.prototype.mouseStart = function (positionInfo) {
        if (!this.currentItem || positionInfo.pageX === undefined || positionInfo.pageY === undefined) {
            return false;
        }
        else {
            this.refresh();
            var offset = jQuery(positionInfo.target).offset();
            var left = offset ? offset.left : 0;
            var top_1 = offset ? offset.top : 0;
            var node = this.currentItem.node;
            var nodeName = this.treeWidget.options.autoEscape ? util_1.htmlEscape(node.name) : node.name;
            this.dragElement = new DragElement(nodeName, positionInfo.pageX - left, positionInfo.pageY - top_1, this.treeWidget.element);
            this.isDragging = true;
            this.positionInfo = positionInfo;
            this.currentItem.$element.addClass("jqtree-moving");
            return true;
        }
    };
    DragAndDropHandler.prototype.mouseDrag = function (positionInfo) {
        if (!this.currentItem ||
            !this.dragElement ||
            positionInfo.pageX === undefined ||
            positionInfo.pageY === undefined) {
            return false;
        }
        else {
            this.dragElement.move(positionInfo.pageX, positionInfo.pageY);
            this.positionInfo = positionInfo;
            var area = this.findHoveredArea(positionInfo.pageX, positionInfo.pageY);
            var canMoveTo = this.canMoveToArea(area);
            if (canMoveTo && area) {
                if (!area.node.isFolder()) {
                    this.stopOpenFolderTimer();
                }
                if (this.hoveredArea !== area) {
                    this.hoveredArea = area;
                    // If this is a closed folder, start timer to open it
                    if (this.mustOpenFolderTimer(area)) {
                        this.startOpenFolderTimer(area.node);
                    }
                    else {
                        this.stopOpenFolderTimer();
                    }
                    this.updateDropHint();
                }
            }
            else {
                this.removeHover();
                this.removeDropHint();
                this.stopOpenFolderTimer();
            }
            if (!area) {
                if (this.treeWidget.options.onDragMove) {
                    this.treeWidget.options.onDragMove(this.currentItem.node, positionInfo.originalEvent);
                }
            }
            return true;
        }
    };
    DragAndDropHandler.prototype.mouseStop = function (positionInfo) {
        this.moveItem(positionInfo);
        this.clear();
        this.removeHover();
        this.removeDropHint();
        this.removeHitAreas();
        var currentItem = this.currentItem;
        if (this.currentItem) {
            this.currentItem.$element.removeClass("jqtree-moving");
            this.currentItem = null;
        }
        this.isDragging = false;
        this.positionInfo = null;
        if (!this.hoveredArea && currentItem) {
            if (this.treeWidget.options.onDragStop) {
                this.treeWidget.options.onDragStop(currentItem.node, positionInfo.originalEvent);
            }
        }
        return false;
    };
    DragAndDropHandler.prototype.refresh = function () {
        this.removeHitAreas();
        if (this.currentItem) {
            this.generateHitAreas();
            this.currentItem = this.treeWidget._getNodeElementForNode(this.currentItem.node);
            if (this.isDragging) {
                this.currentItem.$element.addClass("jqtree-moving");
            }
        }
    };
    DragAndDropHandler.prototype.mustCaptureElement = function ($element) {
        return !$element.is("input,select,textarea");
    };
    DragAndDropHandler.prototype.canMoveToArea = function (area) {
        if (!area || !this.currentItem) {
            return false;
        }
        else if (this.treeWidget.options.onCanMoveTo) {
            var positionName = node_1.getPositionName(area.position);
            return this.treeWidget.options.onCanMoveTo(this.currentItem.node, area.node, positionName);
        }
        else {
            return true;
        }
    };
    DragAndDropHandler.prototype.removeHitAreas = function () {
        this.hitAreas = [];
    };
    DragAndDropHandler.prototype.clear = function () {
        if (this.dragElement) {
            this.dragElement.remove();
            this.dragElement = null;
        }
    };
    DragAndDropHandler.prototype.removeDropHint = function () {
        if (this.previousGhost) {
            this.previousGhost.remove();
        }
    };
    DragAndDropHandler.prototype.removeHover = function () {
        this.hoveredArea = null;
    };
    DragAndDropHandler.prototype.findHoveredArea = function (x, y) {
        var dimensions = this.getTreeDimensions();
        if (x < dimensions.left || y < dimensions.top || x > dimensions.right || y > dimensions.bottom) {
            return null;
        }
        var low = 0;
        var high = this.hitAreas.length;
        while (low < high) {
            var mid = (low + high) >> 1;
            var area = this.hitAreas[mid];
            if (y < area.top) {
                high = mid;
            }
            else if (y > area.bottom) {
                low = mid + 1;
            }
            else {
                return area;
            }
        }
        return null;
    };
    DragAndDropHandler.prototype.mustOpenFolderTimer = function (area) {
        var node = area.node;
        return node.isFolder() && !node.is_open && area.position === node_1.Position.Inside;
    };
    DragAndDropHandler.prototype.updateDropHint = function () {
        if (!this.hoveredArea) {
            return;
        }
        // remove previous drop hint
        this.removeDropHint();
        // add new drop hint
        var nodeElement = this.treeWidget._getNodeElementForNode(this.hoveredArea.node);
        this.previousGhost = nodeElement.addDropHint(this.hoveredArea.position);
    };
    DragAndDropHandler.prototype.startOpenFolderTimer = function (folder) {
        var _this = this;
        var openFolder = function () {
            _this.treeWidget._openNode(folder, _this.treeWidget.options.slide, function () {
                _this.refresh();
                _this.updateDropHint();
            });
        };
        this.stopOpenFolderTimer();
        this.openFolderTimer = window.setTimeout(openFolder, this.treeWidget.options.openFolderDelay);
    };
    DragAndDropHandler.prototype.stopOpenFolderTimer = function () {
        if (this.openFolderTimer) {
            clearTimeout(this.openFolderTimer);
            this.openFolderTimer = null;
        }
    };
    DragAndDropHandler.prototype.moveItem = function (positionInfo) {
        var _this = this;
        if (this.currentItem &&
            this.hoveredArea &&
            this.hoveredArea.position !== node_1.Position.None &&
            this.canMoveToArea(this.hoveredArea)) {
            var movedNode_1 = this.currentItem.node;
            var targetNode_1 = this.hoveredArea.node;
            var position_1 = this.hoveredArea.position;
            var previousParent = movedNode_1.parent;
            if (position_1 === node_1.Position.Inside) {
                this.hoveredArea.node.is_open = true; // eslint-disable-line @typescript-eslint/camelcase
            }
            var doMove = function () {
                _this.treeWidget.tree.moveNode(movedNode_1, targetNode_1, position_1);
                _this.treeWidget.element.empty();
                _this.treeWidget._refreshElements(null);
            };
            /* eslint-disable @typescript-eslint/camelcase */
            var event_1 = this.treeWidget._triggerEvent("tree.move", {
                move_info: {
                    moved_node: movedNode_1,
                    target_node: targetNode_1,
                    position: node_1.getPositionName(position_1),
                    previous_parent: previousParent,
                    do_move: doMove,
                    original_event: positionInfo.originalEvent
                }
            });
            /* eslint-enable @typescript-eslint/camelcase */
            if (!event_1.isDefaultPrevented()) {
                doMove();
            }
        }
    };
    DragAndDropHandler.prototype.getTreeDimensions = function () {
        // Return the dimensions of the tree. Add a margin to the bottom to allow
        // to drag-and-drop after the last element.
        var offset = this.treeWidget.element.offset();
        if (!offset) {
            return { left: 0, top: 0, right: 0, bottom: 0 };
        }
        else {
            var el = this.treeWidget.element;
            var width = el.width() || 0;
            var height = el.height() || 0;
            var left = offset.left + this.treeWidget._getScrollLeft();
            return {
                left: left,
                top: offset.top,
                right: left + width,
                bottom: offset.top + height + 16
            };
        }
    };
    return DragAndDropHandler;
}());
exports.DragAndDropHandler = DragAndDropHandler;
var VisibleNodeIterator = /** @class */ (function () {
    function VisibleNodeIterator(tree) {
        this.tree = tree;
    }
    VisibleNodeIterator.prototype.iterate = function () {
        var _this = this;
        var isFirstNode = true;
        var _iterateNode = function (node, nextNode) {
            var mustIterateInside = (node.is_open || !node.element) && node.hasChildren();
            var $element = null;
            if (node.element) {
                $element = jQuery(node.element);
                if (!$element.is(":visible")) {
                    return;
                }
                if (isFirstNode) {
                    _this.handleFirstNode(node);
                    isFirstNode = false;
                }
                if (!node.hasChildren()) {
                    _this.handleNode(node, nextNode, $element);
                }
                else if (node.is_open) {
                    if (!_this.handleOpenFolder(node, $element)) {
                        mustIterateInside = false;
                    }
                }
                else {
                    _this.handleClosedFolder(node, nextNode, $element);
                }
            }
            if (mustIterateInside) {
                var childrenLength_1 = node.children.length;
                node.children.forEach(function (_, i) {
                    if (i === childrenLength_1 - 1) {
                        _iterateNode(node.children[i], null);
                    }
                    else {
                        _iterateNode(node.children[i], node.children[i + 1]);
                    }
                });
                if (node.is_open && $element) {
                    _this.handleAfterOpenFolder(node, nextNode);
                }
            }
        };
        _iterateNode(this.tree, null);
    };
    return VisibleNodeIterator;
}());
var HitAreasGenerator = /** @class */ (function (_super) {
    __extends(HitAreasGenerator, _super);
    function HitAreasGenerator(tree, currentNode, treeBottom) {
        var _this = _super.call(this, tree) || this;
        _this.currentNode = currentNode;
        _this.treeBottom = treeBottom;
        return _this;
    }
    HitAreasGenerator.prototype.generate = function () {
        this.positions = [];
        this.lastTop = 0;
        this.iterate();
        return this.generateHitAreas(this.positions);
    };
    HitAreasGenerator.prototype.generateHitAreas = function (positions) {
        var previousTop = -1;
        var group = [];
        var hitAreas = [];
        for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
            var position = positions_1[_i];
            if (position.top !== previousTop && group.length) {
                if (group.length) {
                    this.generateHitAreasForGroup(hitAreas, group, previousTop, position.top);
                }
                previousTop = position.top;
                group = [];
            }
            group.push(position);
        }
        this.generateHitAreasForGroup(hitAreas, group, previousTop, this.treeBottom);
        return hitAreas;
    };
    HitAreasGenerator.prototype.handleOpenFolder = function (node, $element) {
        if (node === this.currentNode) {
            // Cannot move inside current item
            // Stop iterating
            return false;
        }
        // Cannot move before current item
        if (node.children[0] !== this.currentNode) {
            this.addPosition(node, node_1.Position.Inside, this.getTop($element));
        }
        // Continue iterating
        return true;
    };
    HitAreasGenerator.prototype.handleClosedFolder = function (node, nextNode, $element) {
        var top = this.getTop($element);
        if (node === this.currentNode) {
            // Cannot move after current item
            this.addPosition(node, node_1.Position.None, top);
        }
        else {
            this.addPosition(node, node_1.Position.Inside, top);
            // Cannot move before current item
            if (nextNode !== this.currentNode) {
                this.addPosition(node, node_1.Position.After, top);
            }
        }
    };
    HitAreasGenerator.prototype.handleFirstNode = function (node) {
        if (node !== this.currentNode) {
            this.addPosition(node, node_1.Position.Before, this.getTop(jQuery(node.element)));
        }
    };
    HitAreasGenerator.prototype.handleAfterOpenFolder = function (node, nextNode) {
        if (node === this.currentNode || nextNode === this.currentNode) {
            // Cannot move before or after current item
            this.addPosition(node, node_1.Position.None, this.lastTop);
        }
        else {
            this.addPosition(node, node_1.Position.After, this.lastTop);
        }
    };
    HitAreasGenerator.prototype.handleNode = function (node, nextNode, $element) {
        var top = this.getTop($element);
        if (node === this.currentNode) {
            // Cannot move inside current item
            this.addPosition(node, node_1.Position.None, top);
        }
        else {
            this.addPosition(node, node_1.Position.Inside, top);
        }
        if (nextNode === this.currentNode || node === this.currentNode) {
            // Cannot move before or after current item
            this.addPosition(node, node_1.Position.None, top);
        }
        else {
            this.addPosition(node, node_1.Position.After, top);
        }
    };
    HitAreasGenerator.prototype.getTop = function ($element) {
        var offset = $element.offset();
        return offset ? offset.top : 0;
    };
    HitAreasGenerator.prototype.addPosition = function (node, position, top) {
        var area = {
            top: top,
            bottom: 0,
            node: node,
            position: position
        };
        this.positions.push(area);
        this.lastTop = top;
    };
    HitAreasGenerator.prototype.generateHitAreasForGroup = function (hitAreas, positionsInGroup, top, bottom) {
        // limit positions in group
        var positionCount = Math.min(positionsInGroup.length, 4);
        var areaHeight = Math.round((bottom - top) / positionCount);
        var areaTop = top;
        var i = 0;
        while (i < positionCount) {
            var position = positionsInGroup[i];
            hitAreas.push({
                top: areaTop,
                bottom: areaTop + areaHeight,
                node: position.node,
                position: position.position
            });
            areaTop += areaHeight;
            i += 1;
        }
    };
    return HitAreasGenerator;
}(VisibleNodeIterator));
exports.HitAreasGenerator = HitAreasGenerator;
var DragElement = /** @class */ (function () {
    function DragElement(nodeName, offsetX, offsetY, $tree) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.$element = jQuery("<span class=\"jqtree-title jqtree-dragging\">" + nodeName + "</span>");
        this.$element.css("position", "absolute");
        $tree.append(this.$element);
    }
    DragElement.prototype.move = function (pageX, pageY) {
        this.$element.offset({
            left: pageX - this.offsetX,
            top: pageY - this.offsetY
        });
    };
    DragElement.prototype.remove = function () {
        this.$element.remove();
    };
    return DragElement;
}());


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var util_1 = __webpack_require__(1);
var ElementsRenderer = /** @class */ (function () {
    function ElementsRenderer(treeWidget) {
        this.treeWidget = treeWidget;
        this.openedIconElement = this.createButtonElement(treeWidget.options.openedIcon);
        this.closedIconElement = this.createButtonElement(treeWidget.options.closedIcon);
    }
    ElementsRenderer.prototype.render = function (fromNode) {
        if (fromNode && fromNode.parent) {
            this.renderFromNode(fromNode);
        }
        else {
            this.renderFromRoot();
        }
    };
    ElementsRenderer.prototype.renderFromRoot = function () {
        var $element = this.treeWidget.element;
        $element.empty();
        this.createDomElements($element[0], this.treeWidget.tree.children, true, 1);
    };
    ElementsRenderer.prototype.renderFromNode = function (node) {
        // remember current li
        var $previousLi = jQuery(node.element);
        // create element
        var li = this.createLi(node, node.getLevel());
        this.attachNodeData(node, li);
        // add element to dom
        $previousLi.after(li);
        // remove previous li
        $previousLi.remove();
        // create children
        if (node.children) {
            this.createDomElements(li, node.children, false, node.getLevel() + 1);
        }
    };
    ElementsRenderer.prototype.createDomElements = function (element, children, isRootNode, level) {
        var ul = this.createUl(isRootNode);
        element.appendChild(ul);
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            var li = this.createLi(child, level);
            ul.appendChild(li);
            this.attachNodeData(child, li);
            if (child.hasChildren()) {
                this.createDomElements(li, child.children, false, level + 1);
            }
        }
    };
    ElementsRenderer.prototype.attachNodeData = function (node, li) {
        node.element = li;
        jQuery(li).data("node", node);
    };
    ElementsRenderer.prototype.createUl = function (isRootNode) {
        var classString;
        var role;
        if (!isRootNode) {
            classString = "";
            role = "group";
        }
        else {
            classString = "jqtree-tree";
            role = "tree";
            if (this.treeWidget.options.rtl) {
                classString += " jqtree-rtl";
            }
        }
        var ul = document.createElement("ul");
        ul.className = "jqtree_common " + classString;
        ul.setAttribute("role", role);
        return ul;
    };
    ElementsRenderer.prototype.createLi = function (node, level) {
        var isSelected = Boolean(this.treeWidget.selectNodeHandler && this.treeWidget.selectNodeHandler.isNodeSelected(node));
        var mustShowFolder = node.isFolder() || (node.isEmptyFolder && this.treeWidget.options.showEmptyFolder);
        var li = mustShowFolder
            ? this.createFolderLi(node, level, isSelected)
            : this.createNodeLi(node, level, isSelected);
        if (this.treeWidget.options.onCreateLi) {
            this.treeWidget.options.onCreateLi(node, jQuery(li), isSelected);
        }
        return li;
    };
    ElementsRenderer.prototype.createFolderLi = function (node, level, isSelected) {
        var buttonClasses = this.getButtonClasses(node);
        var folderClasses = this.getFolderClasses(node, isSelected);
        var iconElement = node.is_open ? this.openedIconElement : this.closedIconElement;
        // li
        var li = document.createElement("li");
        li.className = "jqtree_common " + folderClasses;
        li.setAttribute("role", "presentation");
        // div
        var div = document.createElement("div");
        div.className = "jqtree-element jqtree_common";
        div.setAttribute("role", "presentation");
        li.appendChild(div);
        // button link
        var buttonLink = document.createElement("a");
        buttonLink.className = buttonClasses;
        buttonLink.appendChild(iconElement.cloneNode(true));
        buttonLink.setAttribute("role", "presentation");
        buttonLink.setAttribute("aria-hidden", "true");
        if (this.treeWidget.options.buttonLeft) {
            div.appendChild(buttonLink);
        }
        // title span
        div.appendChild(this.createTitleSpan(node.name, level, isSelected, node.is_open, true));
        if (!this.treeWidget.options.buttonLeft) {
            div.appendChild(buttonLink);
        }
        return li;
    };
    ElementsRenderer.prototype.createNodeLi = function (node, level, isSelected) {
        var liClasses = ["jqtree_common"];
        if (isSelected) {
            liClasses.push("jqtree-selected");
        }
        var classString = liClasses.join(" ");
        // li
        var li = document.createElement("li");
        li.className = classString;
        li.setAttribute("role", "presentation");
        // div
        var div = document.createElement("div");
        div.className = "jqtree-element jqtree_common";
        div.setAttribute("role", "presentation");
        li.appendChild(div);
        // title span
        div.appendChild(this.createTitleSpan(node.name, level, isSelected, node.is_open, false));
        return li;
    };
    ElementsRenderer.prototype.createTitleSpan = function (nodeName, level, isSelected, isOpen, isFolder) {
        var titleSpan = document.createElement("span");
        var classes = "jqtree-title jqtree_common";
        if (isFolder) {
            classes += " jqtree-title-folder";
        }
        titleSpan.className = classes;
        titleSpan.setAttribute("role", "treeitem");
        titleSpan.setAttribute("aria-level", "" + level);
        titleSpan.setAttribute("aria-selected", util_1.getBoolString(isSelected));
        titleSpan.setAttribute("aria-expanded", util_1.getBoolString(isOpen));
        if (isSelected) {
            titleSpan.setAttribute("tabindex", this.treeWidget.options.tabIndex);
        }
        titleSpan.innerHTML = this.escapeIfNecessary(nodeName);
        return titleSpan;
    };
    ElementsRenderer.prototype.getButtonClasses = function (node) {
        var classes = ["jqtree-toggler", "jqtree_common"];
        if (!node.is_open) {
            classes.push("jqtree-closed");
        }
        if (this.treeWidget.options.buttonLeft) {
            classes.push("jqtree-toggler-left");
        }
        else {
            classes.push("jqtree-toggler-right");
        }
        return classes.join(" ");
    };
    ElementsRenderer.prototype.getFolderClasses = function (node, isSelected) {
        var classes = ["jqtree-folder"];
        if (!node.is_open) {
            classes.push("jqtree-closed");
        }
        if (isSelected) {
            classes.push("jqtree-selected");
        }
        if (node.is_loading) {
            classes.push("jqtree-loading");
        }
        return classes.join(" ");
    };
    ElementsRenderer.prototype.escapeIfNecessary = function (value) {
        if (this.treeWidget.options.autoEscape) {
            return util_1.htmlEscape(value);
        }
        else {
            return value;
        }
    };
    ElementsRenderer.prototype.createButtonElement = function (value) {
        if (typeof value === "string") {
            // convert value to html
            var div = document.createElement("div");
            div.innerHTML = value;
            return document.createTextNode(div.innerHTML);
        }
        else {
            return jQuery(value)[0];
        }
    };
    return ElementsRenderer;
}());
exports["default"] = ElementsRenderer;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var DataLoader = /** @class */ (function () {
    function DataLoader(treeWidget) {
        this.treeWidget = treeWidget;
    }
    DataLoader.prototype.loadFromUrl = function (urlInfo, parentNode, onFinished) {
        var _this = this;
        if (!urlInfo) {
            return;
        }
        var $el = this.getDomElement(parentNode);
        this.addLoadingClass($el);
        this.notifyLoading(true, parentNode, $el);
        var stopLoading = function () {
            _this.removeLoadingClass($el);
            _this.notifyLoading(false, parentNode, $el);
        };
        var handleSuccess = function (data) {
            stopLoading();
            _this.treeWidget.loadData(_this.parseData(data), parentNode);
            if (onFinished && typeof onFinished === "function") {
                onFinished();
            }
        };
        var handleError = function (jqXHR) {
            stopLoading();
            var onLoadFailed = _this.treeWidget.options.onLoadFailed;
            if (onLoadFailed) {
                onLoadFailed(jqXHR);
            }
        };
        this.submitRequest(urlInfo, handleSuccess, handleError);
    };
    DataLoader.prototype.addLoadingClass = function ($el) {
        if ($el) {
            $el.addClass("jqtree-loading");
        }
    };
    DataLoader.prototype.removeLoadingClass = function ($el) {
        if ($el) {
            $el.removeClass("jqtree-loading");
        }
    };
    DataLoader.prototype.getDomElement = function (parentNode) {
        if (parentNode) {
            return jQuery(parentNode.element);
        }
        else {
            return this.treeWidget.element;
        }
    };
    DataLoader.prototype.notifyLoading = function (isLoading, node, $el) {
        var onLoading = this.treeWidget.options.onLoading;
        if (onLoading) {
            onLoading(isLoading, node, $el);
        }
        this.treeWidget._triggerEvent("tree.loading_data", {
            isLoading: isLoading,
            node: node,
            $el: $el
        });
    };
    DataLoader.prototype.submitRequest = function (urlInfo, handleSuccess, handleError) {
        var ajaxSettings = jQuery.extend({ method: "GET" }, typeof urlInfo === "string" ? { url: urlInfo } : urlInfo, {
            cache: false,
            dataType: "json",
            success: handleSuccess,
            error: handleError
        });
        ajaxSettings.method = ajaxSettings.method.toUpperCase();
        jQuery.ajax(ajaxSettings);
    };
    DataLoader.prototype.parseData = function (data) {
        var dataFilter = this.treeWidget.options.dataFilter;
        var parsedData = data instanceof Array || typeof data === "object" ? data : data != null ? jQuery.parseJSON(data) : [];
        return dataFilter ? dataFilter(parsedData) : parsedData;
    };
    return DataLoader;
}());
exports["default"] = DataLoader;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var KeyHandler = /** @class */ (function () {
    function KeyHandler(treeWidget) {
        var _this = this;
        this.handleKeyDown = function (e) {
            if (!_this.canHandleKeyboard()) {
                return true;
            }
            else {
                var key = e.which;
                switch (key) {
                    case KeyHandler.DOWN:
                        return _this.moveDown();
                    case KeyHandler.UP:
                        return _this.moveUp();
                    case KeyHandler.RIGHT:
                        return _this.moveRight();
                    case KeyHandler.LEFT:
                        return _this.moveLeft();
                    default:
                        return true;
                }
            }
        };
        this.treeWidget = treeWidget;
        if (treeWidget.options.keyboardSupport) {
            jQuery(document).on("keydown.jqtree", this.handleKeyDown);
        }
    }
    KeyHandler.prototype.deinit = function () {
        jQuery(document).off("keydown.jqtree");
    };
    KeyHandler.prototype.moveDown = function () {
        var node = this.treeWidget.getSelectedNode();
        if (node) {
            return this.selectNode(node.getNextNode());
        }
        else {
            return false;
        }
    };
    KeyHandler.prototype.moveUp = function () {
        var node = this.treeWidget.getSelectedNode();
        if (node) {
            return this.selectNode(node.getPreviousNode());
        }
        else {
            return false;
        }
    };
    KeyHandler.prototype.moveRight = function () {
        var node = this.treeWidget.getSelectedNode();
        if (!node) {
            return true;
        }
        else if (!node.isFolder()) {
            return true;
        }
        else {
            // folder node
            if (node.is_open) {
                // Right moves to the first child of an open node
                return this.selectNode(node.getNextNode());
            }
            else {
                // Right expands a closed node
                this.treeWidget.openNode(node);
                return false;
            }
        }
    };
    KeyHandler.prototype.moveLeft = function () {
        var node = this.treeWidget.getSelectedNode();
        if (!node) {
            return true;
        }
        else if (node.isFolder() && node.is_open) {
            // Left on an open node closes the node
            this.treeWidget.closeNode(node);
            return false;
        }
        else {
            // Left on a closed or end node moves focus to the node's parent
            return this.selectNode(node.getParent());
        }
    };
    KeyHandler.prototype.selectNode = function (node) {
        if (!node) {
            return true;
        }
        else {
            this.treeWidget.selectNode(node);
            if (this.treeWidget.scrollHandler &&
                !this.treeWidget.scrollHandler.isScrolledIntoView(jQuery(node.element).find(".jqtree-element"))) {
                this.treeWidget.scrollToNode(node);
            }
            return false;
        }
    };
    KeyHandler.prototype.canHandleKeyboard = function () {
        return (this.treeWidget.options.keyboardSupport && this.isFocusOnTree() && this.treeWidget.getSelectedNode() != null);
    };
    KeyHandler.prototype.isFocusOnTree = function () {
        var activeElement = document.activeElement;
        return Boolean(activeElement && activeElement.tagName === "SPAN" && this.treeWidget._containsElement(activeElement));
    };
    KeyHandler.LEFT = 37;
    KeyHandler.UP = 38;
    KeyHandler.RIGHT = 39;
    KeyHandler.DOWN = 40;
    return KeyHandler;
}());
exports["default"] = KeyHandler;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
/*
This widget does the same a the mouse widget in jqueryui.
*/
var simple_widget_1 = __webpack_require__(3);
var MouseWidget = /** @class */ (function (_super) {
    __extends(MouseWidget, _super);
    function MouseWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mouseDown = function (e) {
            // Is left mouse button?
            if (e.which !== 1) {
                return;
            }
            var result = _this._handleMouseDown(_this._getPositionInfo(e));
            if (result) {
                e.preventDefault();
            }
            return result;
        };
        _this.mouseMove = function (e) { return _this._handleMouseMove(e, _this._getPositionInfo(e)); };
        _this.mouseUp = function (e) { return _this._handleMouseUp(_this._getPositionInfo(e)); };
        _this.touchStart = function (e) {
            var touchEvent = e.originalEvent;
            if (touchEvent.touches.length > 1) {
                return;
            }
            var touch = touchEvent.changedTouches[0];
            return _this._handleMouseDown(_this._getPositionInfo(touch));
        };
        _this.touchMove = function (e) {
            var touchEvent = e.originalEvent;
            if (touchEvent.touches.length > 1) {
                return;
            }
            var touch = touchEvent.changedTouches[0];
            return _this._handleMouseMove(e, _this._getPositionInfo(touch));
        };
        _this.touchEnd = function (e) {
            var touchEvent = e.originalEvent;
            if (touchEvent.touches.length > 1) {
                return;
            }
            var touch = touchEvent.changedTouches[0];
            return _this._handleMouseUp(_this._getPositionInfo(touch));
        };
        return _this;
    }
    MouseWidget.prototype.setMouseDelay = function (mouseDelay) {
        this.mouseDelay = mouseDelay;
    };
    MouseWidget.prototype._init = function () {
        this.$el.on("mousedown.mousewidget", this.mouseDown);
        this.$el.on("touchstart.mousewidget", this.touchStart);
        this.isMouseStarted = false;
        this.mouseDelay = 0;
        this.mouseDelayTimer = null;
        this.isMouseDelayMet = true;
        this.mouseDownInfo = null;
    };
    MouseWidget.prototype._deinit = function () {
        this.$el.off("mousedown.mousewidget");
        this.$el.off("touchstart.mousewidget");
        var $document = jQuery(document);
        $document.off("mousemove.mousewidget");
        $document.off("mouseup.mousewidget");
    };
    MouseWidget.prototype._handleMouseDown = function (positionInfo) {
        // We may have missed mouseup (out of window)
        if (this.isMouseStarted) {
            this._handleMouseUp(positionInfo);
        }
        this.mouseDownInfo = positionInfo;
        if (!this._mouseCapture(positionInfo)) {
            return;
        }
        this._handleStartMouse();
        return true;
    };
    MouseWidget.prototype._handleStartMouse = function () {
        var $document = jQuery(document);
        $document.on("mousemove.mousewidget", this.mouseMove);
        $document.on("touchmove.mousewidget", this.touchMove);
        $document.on("mouseup.mousewidget", this.mouseUp);
        $document.on("touchend.mousewidget", this.touchEnd);
        if (this.mouseDelay) {
            this._startMouseDelayTimer();
        }
    };
    MouseWidget.prototype._startMouseDelayTimer = function () {
        var _this = this;
        if (this.mouseDelayTimer) {
            clearTimeout(this.mouseDelayTimer);
        }
        this.mouseDelayTimer = window.setTimeout(function () {
            _this.isMouseDelayMet = true;
        }, this.mouseDelay);
        this.isMouseDelayMet = false;
    };
    MouseWidget.prototype._handleMouseMove = function (e, positionInfo) {
        if (this.isMouseStarted) {
            this._mouseDrag(positionInfo);
            return e.preventDefault();
        }
        if (this.mouseDelay && !this.isMouseDelayMet) {
            return true;
        }
        if (this.mouseDownInfo) {
            this.isMouseStarted = this._mouseStart(this.mouseDownInfo) !== false;
        }
        if (this.isMouseStarted) {
            this._mouseDrag(positionInfo);
        }
        else {
            this._handleMouseUp(positionInfo);
        }
        return !this.isMouseStarted;
    };
    MouseWidget.prototype._getPositionInfo = function (e) {
        return {
            pageX: e.pageX,
            pageY: e.pageY,
            target: e.target,
            originalEvent: e
        };
    };
    MouseWidget.prototype._handleMouseUp = function (positionInfo) {
        var $document = jQuery(document);
        $document.off("mousemove.mousewidget");
        $document.off("touchmove.mousewidget");
        $document.off("mouseup.mousewidget");
        $document.off("touchend.mousewidget");
        if (this.isMouseStarted) {
            this.isMouseStarted = false;
            this._mouseStop(positionInfo);
        }
    };
    return MouseWidget;
}(simple_widget_1["default"]));
exports["default"] = MouseWidget;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var util_1 = __webpack_require__(1);
var SaveStateHandler = /** @class */ (function () {
    function SaveStateHandler(treeWidget) {
        this.treeWidget = treeWidget;
    }
    SaveStateHandler.prototype.saveState = function () {
        var state = JSON.stringify(this.getState());
        if (this.treeWidget.options.onSetStateFromStorage) {
            this.treeWidget.options.onSetStateFromStorage(state);
        }
        else if (this.supportsLocalStorage()) {
            localStorage.setItem(this.getKeyName(), state);
        }
    };
    SaveStateHandler.prototype.getStateFromStorage = function () {
        var jsonData = this._loadFromStorage();
        if (jsonData) {
            return this._parseState(jsonData);
        }
        else {
            return null;
        }
    };
    SaveStateHandler.prototype.getState = function () {
        var _this = this;
        var getOpenNodeIds = function () {
            var openNodes = [];
            _this.treeWidget.tree.iterate(function (node) {
                if (node.is_open && node.id && node.hasChildren()) {
                    openNodes.push(node.id);
                }
                return true;
            });
            return openNodes;
        };
        var getSelectedNodeIds = function () { return _this.treeWidget.getSelectedNodes().map(function (n) { return n.id; }); };
        /* eslint-disable @typescript-eslint/camelcase */
        return {
            open_nodes: getOpenNodeIds(),
            selected_node: getSelectedNodeIds()
        };
        /* eslint-enable @typescript-eslint/camelcase */
    };
    /*
    Set initial state
    Don't handle nodes that are loaded on demand

    result: must load on demand
    */
    SaveStateHandler.prototype.setInitialState = function (state) {
        if (!state) {
            return false;
        }
        else {
            var mustLoadOnDemand = false;
            if (state.open_nodes) {
                mustLoadOnDemand = this._openInitialNodes(state.open_nodes);
            }
            if (state.selected_node) {
                this._resetSelection();
                this._selectInitialNodes(state.selected_node);
            }
            return mustLoadOnDemand;
        }
    };
    SaveStateHandler.prototype.setInitialStateOnDemand = function (state, cbFinished) {
        if (state) {
            this._setInitialStateOnDemand(state.open_nodes, state.selected_node, cbFinished);
        }
        else {
            cbFinished();
        }
    };
    SaveStateHandler.prototype.getNodeIdToBeSelected = function () {
        var state = this.getStateFromStorage();
        if (state && state.selected_node) {
            return state.selected_node[0];
        }
        else {
            return null;
        }
    };
    SaveStateHandler.prototype._parseState = function (jsonData) {
        var state = jQuery.parseJSON(jsonData);
        // Check if selected_node is an int (instead of an array)
        if (state && state.selected_node && util_1.isInt(state.selected_node)) {
            // Convert to array
            state.selected_node = [state.selected_node]; // eslint-disable-line @typescript-eslint/camelcase
        }
        return state;
    };
    SaveStateHandler.prototype._loadFromStorage = function () {
        if (this.treeWidget.options.onGetStateFromStorage) {
            return this.treeWidget.options.onGetStateFromStorage();
        }
        else if (this.supportsLocalStorage()) {
            return localStorage.getItem(this.getKeyName());
        }
    };
    SaveStateHandler.prototype._openInitialNodes = function (nodeIds) {
        var mustLoadOnDemand = false;
        for (var _i = 0, nodeIds_1 = nodeIds; _i < nodeIds_1.length; _i++) {
            var nodeDd = nodeIds_1[_i];
            var node = this.treeWidget.getNodeById(nodeDd);
            if (node) {
                if (!node.load_on_demand) {
                    node.is_open = true; // eslint-disable-line @typescript-eslint/camelcase
                }
                else {
                    mustLoadOnDemand = true;
                }
            }
        }
        return mustLoadOnDemand;
    };
    SaveStateHandler.prototype._selectInitialNodes = function (nodeIds) {
        var selectCount = 0;
        for (var _i = 0, nodeIds_2 = nodeIds; _i < nodeIds_2.length; _i++) {
            var nodeId = nodeIds_2[_i];
            var node = this.treeWidget.getNodeById(nodeId);
            if (node) {
                selectCount += 1;
                if (this.treeWidget.selectNodeHandler) {
                    this.treeWidget.selectNodeHandler.addToSelection(node);
                }
            }
        }
        return selectCount !== 0;
    };
    SaveStateHandler.prototype._resetSelection = function () {
        var selectNodeHandler = this.treeWidget.selectNodeHandler;
        if (selectNodeHandler) {
            var selectedNodes = selectNodeHandler.getSelectedNodes();
            selectedNodes.forEach(function (node) {
                selectNodeHandler.removeFromSelection(node);
            });
        }
    };
    SaveStateHandler.prototype._setInitialStateOnDemand = function (nodeIdsParam, selectedNodes, cbFinished) {
        var _this = this;
        var loadingCount = 0;
        var nodeIds = nodeIdsParam;
        var openNodes = function () {
            var newNodesIds = [];
            for (var _i = 0, nodeIds_3 = nodeIds; _i < nodeIds_3.length; _i++) {
                var nodeId = nodeIds_3[_i];
                var node = _this.treeWidget.getNodeById(nodeId);
                if (!node) {
                    newNodesIds.push(nodeId);
                }
                else {
                    if (!node.is_loading) {
                        if (node.load_on_demand) {
                            loadAndOpenNode(node);
                        }
                        else {
                            _this.treeWidget._openNode(node, false, null);
                        }
                    }
                }
            }
            nodeIds = newNodesIds;
            if (_this._selectInitialNodes(selectedNodes)) {
                _this.treeWidget._refreshElements(null);
            }
            if (loadingCount === 0) {
                cbFinished();
            }
        };
        var loadAndOpenNode = function (node) {
            loadingCount += 1;
            _this.treeWidget._openNode(node, false, function () {
                loadingCount -= 1;
                openNodes();
            });
        };
        openNodes();
    };
    SaveStateHandler.prototype.getKeyName = function () {
        if (typeof this.treeWidget.options.saveState === "string") {
            return this.treeWidget.options.saveState;
        }
        else {
            return "tree";
        }
    };
    SaveStateHandler.prototype.supportsLocalStorage = function () {
        var testSupport = function () {
            // Is local storage supported?
            if (localStorage == null) {
                return false;
            }
            else {
                // Check if it's possible to store an item. Safari does not allow this in private browsing mode.
                try {
                    var key = "_storage_test";
                    sessionStorage.setItem(key, "value");
                    sessionStorage.removeItem(key);
                }
                catch (error) {
                    return false;
                }
                return true;
            }
        };
        if (this._supportsLocalStorage == null) {
            this._supportsLocalStorage = testSupport();
        }
        return this._supportsLocalStorage;
    };
    return SaveStateHandler;
}());
exports["default"] = SaveStateHandler;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ScrollHandler = /** @class */ (function () {
    function ScrollHandler(treeWidget) {
        this.treeWidget = treeWidget;
        this.previousTop = -1;
        this.isInitialized = false;
    }
    ScrollHandler.prototype.checkScrolling = function () {
        this.ensureInit();
        this.checkVerticalScrolling();
        this.checkHorizontalScrolling();
    };
    ScrollHandler.prototype.scrollToY = function (top) {
        this.ensureInit();
        if (this.$scrollParent) {
            this.$scrollParent[0].scrollTop = top;
        }
        else {
            var offset = this.treeWidget.$el.offset();
            var treeTop = offset ? offset.top : 0;
            jQuery(document).scrollTop(top + treeTop);
        }
    };
    ScrollHandler.prototype.isScrolledIntoView = function ($element) {
        this.ensureInit();
        var elementBottom;
        var viewBottom;
        var elementTop;
        var viewTop;
        var elHeight = $element.height() || 0;
        if (this.$scrollParent) {
            viewTop = 0;
            viewBottom = this.$scrollParent.height() || 0;
            var offset = $element.offset();
            var originalTop = offset ? offset.top : 0;
            elementTop = originalTop - this.scrollParentTop;
            elementBottom = elementTop + elHeight;
        }
        else {
            viewTop = jQuery(window).scrollTop() || 0;
            var windowHeight = jQuery(window).height() || 0;
            viewBottom = viewTop + windowHeight;
            var offset = $element.offset();
            elementTop = offset ? offset.top : 0;
            elementBottom = elementTop + elHeight;
        }
        return elementBottom <= viewBottom && elementTop >= viewTop;
    };
    ScrollHandler.prototype.getScrollLeft = function () {
        if (!this.$scrollParent) {
            return 0;
        }
        else {
            return this.$scrollParent.scrollLeft() || 0;
        }
    };
    ScrollHandler.prototype.initScrollParent = function () {
        var _this = this;
        var getParentWithOverflow = function () {
            var cssAttributes = ["overflow", "overflow-y"];
            var hasOverFlow = function ($el) {
                for (var _i = 0, cssAttributes_1 = cssAttributes; _i < cssAttributes_1.length; _i++) {
                    var attr = cssAttributes_1[_i];
                    var overflowValue = $el.css(attr);
                    if (overflowValue === "auto" || overflowValue === "scroll") {
                        return true;
                    }
                }
                return false;
            };
            if (hasOverFlow(_this.treeWidget.$el)) {
                return _this.treeWidget.$el;
            }
            for (var _i = 0, _a = _this.treeWidget.$el.parents().get(); _i < _a.length; _i++) {
                var el = _a[_i];
                var $el = jQuery(el);
                if (hasOverFlow($el)) {
                    return $el;
                }
            }
            return null;
        };
        var setDocumentAsScrollParent = function () {
            _this.scrollParentTop = 0;
            _this.$scrollParent = null;
        };
        if (this.treeWidget.$el.css("position") === "fixed") {
            setDocumentAsScrollParent();
        }
        var $scrollParent = getParentWithOverflow();
        if ($scrollParent && $scrollParent.length && $scrollParent[0].tagName !== "HTML") {
            this.$scrollParent = $scrollParent;
            var offset = this.$scrollParent.offset();
            this.scrollParentTop = offset ? offset.top : 0;
        }
        else {
            setDocumentAsScrollParent();
        }
        this.isInitialized = true;
    };
    ScrollHandler.prototype.ensureInit = function () {
        if (!this.isInitialized) {
            this.initScrollParent();
        }
    };
    ScrollHandler.prototype.handleVerticalScrollingWithScrollParent = function (area) {
        var scrollParent = this.$scrollParent && this.$scrollParent[0];
        if (!scrollParent) {
            return;
        }
        var distanceBottom = this.scrollParentTop + scrollParent.offsetHeight - area.bottom;
        if (distanceBottom < 20) {
            scrollParent.scrollTop += 20;
            this.treeWidget.refreshHitAreas();
            this.previousTop = -1;
        }
        else if (area.top - this.scrollParentTop < 20) {
            scrollParent.scrollTop -= 20;
            this.treeWidget.refreshHitAreas();
            this.previousTop = -1;
        }
    };
    ScrollHandler.prototype.handleVerticalScrollingWithDocument = function (area) {
        var scrollTop = jQuery(document).scrollTop() || 0;
        var distanceTop = area.top - scrollTop;
        if (distanceTop < 20) {
            jQuery(document).scrollTop(scrollTop - 20);
        }
        else {
            var windowHeight = jQuery(window).height() || 0;
            if (windowHeight - (area.bottom - scrollTop) < 20) {
                jQuery(document).scrollTop(scrollTop + 20);
            }
        }
    };
    ScrollHandler.prototype.checkVerticalScrolling = function () {
        var hoveredArea = this.treeWidget.dndHandler && this.treeWidget.dndHandler.hoveredArea;
        if (hoveredArea && hoveredArea.top !== this.previousTop) {
            this.previousTop = hoveredArea.top;
            if (this.$scrollParent) {
                this.handleVerticalScrollingWithScrollParent(hoveredArea);
            }
            else {
                this.handleVerticalScrollingWithDocument(hoveredArea);
            }
        }
    };
    ScrollHandler.prototype.checkHorizontalScrolling = function () {
        var positionInfo = this.treeWidget.dndHandler && this.treeWidget.dndHandler.positionInfo;
        if (!positionInfo) {
            return;
        }
        if (this.$scrollParent) {
            this.handleHorizontalScrollingWithParent(positionInfo);
        }
        else {
            this.handleHorizontalScrollingWithDocument(positionInfo);
        }
    };
    ScrollHandler.prototype.handleHorizontalScrollingWithParent = function (positionInfo) {
        if (positionInfo.pageX === undefined || positionInfo.pageY === undefined) {
            return;
        }
        var $scrollParent = this.$scrollParent;
        var scrollParentOffset = $scrollParent && $scrollParent.offset();
        if (!($scrollParent && scrollParentOffset)) {
            return;
        }
        var scrollParent = $scrollParent[0];
        var canScrollRight = scrollParent.scrollLeft + scrollParent.clientWidth < scrollParent.scrollWidth;
        var canScrollLeft = scrollParent.scrollLeft > 0;
        var rightEdge = scrollParentOffset.left + scrollParent.clientWidth;
        var leftEdge = scrollParentOffset.left;
        var isNearRightEdge = positionInfo.pageX > rightEdge - 20;
        var isNearLeftEdge = positionInfo.pageX < leftEdge + 20;
        if (isNearRightEdge && canScrollRight) {
            scrollParent.scrollLeft = Math.min(scrollParent.scrollLeft + 20, scrollParent.scrollWidth);
        }
        else if (isNearLeftEdge && canScrollLeft) {
            scrollParent.scrollLeft = Math.max(scrollParent.scrollLeft - 20, 0);
        }
    };
    ScrollHandler.prototype.handleHorizontalScrollingWithDocument = function (positionInfo) {
        if (positionInfo.pageX === undefined || positionInfo.pageY === undefined) {
            return;
        }
        var $document = jQuery(document);
        var scrollLeft = $document.scrollLeft() || 0;
        var windowWidth = jQuery(window).width() || 0;
        var canScrollLeft = scrollLeft > 0;
        var isNearRightEdge = positionInfo.pageX > windowWidth - 20;
        var isNearLeftEdge = positionInfo.pageX - scrollLeft < 20;
        if (isNearRightEdge) {
            $document.scrollLeft(scrollLeft + 20);
        }
        else if (isNearLeftEdge && canScrollLeft) {
            $document.scrollLeft(Math.max(scrollLeft - 20, 0));
        }
    };
    return ScrollHandler;
}());
exports["default"] = ScrollHandler;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SelectNodeHandler = /** @class */ (function () {
    function SelectNodeHandler(treeWidget) {
        this.treeWidget = treeWidget;
        this.clear();
    }
    SelectNodeHandler.prototype.getSelectedNode = function () {
        var selectedNodes = this.getSelectedNodes();
        if (selectedNodes.length) {
            return selectedNodes[0];
        }
        else {
            return false;
        }
    };
    SelectNodeHandler.prototype.getSelectedNodes = function () {
        if (this.selectedSingleNode) {
            return [this.selectedSingleNode];
        }
        else {
            var selectedNodes = [];
            for (var id in this.selectedNodes) {
                if (this.selectedNodes.hasOwnProperty(id)) {
                    var node = this.treeWidget.getNodeById(id);
                    if (node) {
                        selectedNodes.push(node);
                    }
                }
            }
            return selectedNodes;
        }
    };
    SelectNodeHandler.prototype.getSelectedNodesUnder = function (parent) {
        if (this.selectedSingleNode) {
            if (parent.isParentOf(this.selectedSingleNode)) {
                return [this.selectedSingleNode];
            }
            else {
                return [];
            }
        }
        else {
            var selectedNodes = [];
            for (var id in this.selectedNodes) {
                if (this.selectedNodes.hasOwnProperty(id)) {
                    var node = this.treeWidget.getNodeById(id);
                    if (node && parent.isParentOf(node)) {
                        selectedNodes.push(node);
                    }
                }
            }
            return selectedNodes;
        }
    };
    SelectNodeHandler.prototype.isNodeSelected = function (node) {
        if (!node) {
            return false;
        }
        else if (node.id != null) {
            if (this.selectedNodes[node.id]) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (this.selectedSingleNode) {
            return this.selectedSingleNode.element === node.element;
        }
        else {
            return false;
        }
    };
    SelectNodeHandler.prototype.clear = function () {
        this.selectedNodes = {};
        this.selectedSingleNode = null;
    };
    SelectNodeHandler.prototype.removeFromSelection = function (node, includeChildren) {
        var _this = this;
        if (includeChildren === void 0) { includeChildren = false; }
        if (node.id == null) {
            if (this.selectedSingleNode && node.element === this.selectedSingleNode.element) {
                this.selectedSingleNode = null;
            }
        }
        else {
            delete this.selectedNodes[node.id];
            if (includeChildren) {
                node.iterate(function () {
                    delete _this.selectedNodes[node.id];
                    return true;
                });
            }
        }
    };
    SelectNodeHandler.prototype.addToSelection = function (node) {
        if (node.id != null) {
            this.selectedNodes[node.id] = true;
        }
        else {
            this.selectedSingleNode = node;
        }
    };
    return SelectNodeHandler;
}());
exports["default"] = SelectNodeHandler;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var node_1 = __webpack_require__(0);
var NodeElement = /** @class */ (function () {
    function NodeElement(node, treeWidget) {
        this.init(node, treeWidget);
    }
    NodeElement.prototype.init = function (node, treeWidget) {
        this.node = node;
        this.treeWidget = treeWidget;
        if (!node.element) {
            node.element = this.treeWidget.element.get(0);
        }
        this.$element = jQuery(node.element);
    };
    NodeElement.prototype.addDropHint = function (position) {
        if (this.mustShowBorderDropHint(position)) {
            return new BorderDropHint(this.$element, this.treeWidget._getScrollLeft());
        }
        else {
            return new GhostDropHint(this.node, this.$element, position);
        }
    };
    NodeElement.prototype.select = function (mustSetFocus) {
        var $li = this.getLi();
        $li.addClass("jqtree-selected");
        $li.attr("aria-selected", "true");
        var $span = this.getSpan();
        $span.attr("tabindex", this.treeWidget.options.tabIndex);
        if (mustSetFocus) {
            $span.focus();
        }
    };
    NodeElement.prototype.deselect = function () {
        var $li = this.getLi();
        $li.removeClass("jqtree-selected");
        $li.attr("aria-selected", "false");
        var $span = this.getSpan();
        $span.removeAttr("tabindex");
        $span.blur();
    };
    NodeElement.prototype.getUl = function () {
        return this.$element.children("ul:first");
    };
    NodeElement.prototype.getSpan = function () {
        return this.$element.children(".jqtree-element").find("span.jqtree-title");
    };
    NodeElement.prototype.getLi = function () {
        return this.$element;
    };
    NodeElement.prototype.mustShowBorderDropHint = function (position) {
        return position === node_1.Position.Inside;
    };
    return NodeElement;
}());
exports.NodeElement = NodeElement;
var FolderElement = /** @class */ (function (_super) {
    __extends(FolderElement, _super);
    function FolderElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FolderElement.prototype.open = function (onFinished, slide, animationSpeed) {
        var _this = this;
        if (slide === void 0) { slide = true; }
        if (animationSpeed === void 0) { animationSpeed = "fast"; }
        if (this.node.is_open) {
            return;
        }
        this.node.is_open = true; // eslint-disable-line @typescript-eslint/camelcase
        var $button = this.getButton();
        $button.removeClass("jqtree-closed");
        $button.html("");
        var buttonEl = $button.get(0);
        if (buttonEl) {
            var icon = this.treeWidget.renderer.openedIconElement.cloneNode(true);
            buttonEl.appendChild(icon);
        }
        var doOpen = function () {
            var $li = _this.getLi();
            $li.removeClass("jqtree-closed");
            var $span = _this.getSpan();
            $span.attr("aria-expanded", "true");
            if (onFinished) {
                onFinished(_this.node);
            }
            _this.treeWidget._triggerEvent("tree.open", {
                node: _this.node
            });
        };
        if (slide) {
            this.getUl().slideDown(animationSpeed, doOpen);
        }
        else {
            this.getUl().show();
            doOpen();
        }
    };
    FolderElement.prototype.close = function (slide, animationSpeed) {
        var _this = this;
        if (slide === void 0) { slide = true; }
        if (animationSpeed === void 0) { animationSpeed = "fast"; }
        if (!this.node.is_open) {
            return;
        }
        this.node.is_open = false; // eslint-disable-line @typescript-eslint/camelcase
        var $button = this.getButton();
        $button.addClass("jqtree-closed");
        $button.html("");
        var buttonEl = $button.get(0);
        if (buttonEl) {
            var icon = this.treeWidget.renderer.closedIconElement.cloneNode(true);
            buttonEl.appendChild(icon);
        }
        var doClose = function () {
            var $li = _this.getLi();
            $li.addClass("jqtree-closed");
            var $span = _this.getSpan();
            $span.attr("aria-expanded", "false");
            _this.treeWidget._triggerEvent("tree.close", {
                node: _this.node
            });
        };
        if (slide) {
            this.getUl().slideUp(animationSpeed, doClose);
        }
        else {
            this.getUl().hide();
            doClose();
        }
    };
    FolderElement.prototype.mustShowBorderDropHint = function (position) {
        return !this.node.is_open && position === node_1.Position.Inside;
    };
    FolderElement.prototype.getButton = function () {
        return this.$element.children(".jqtree-element").find("a.jqtree-toggler");
    };
    return FolderElement;
}(NodeElement));
exports.FolderElement = FolderElement;
var BorderDropHint = /** @class */ (function () {
    function BorderDropHint($element, scrollLeft) {
        var $div = $element.children(".jqtree-element");
        var elWidth = $element.width() || 0;
        var width = Math.max(elWidth + scrollLeft - 4, 0);
        var elHeight = $div.outerHeight() || 0;
        var height = Math.max(elHeight - 4, 0);
        this.$hint = jQuery('<span class="jqtree-border"></span>');
        $div.append(this.$hint);
        this.$hint.css({ width: width, height: height });
    }
    BorderDropHint.prototype.remove = function () {
        this.$hint.remove();
    };
    return BorderDropHint;
}());
exports.BorderDropHint = BorderDropHint;
var GhostDropHint = /** @class */ (function () {
    function GhostDropHint(node, $element, position) {
        this.$element = $element;
        this.node = node;
        this.$ghost = jQuery("<li class=\"jqtree_common jqtree-ghost\"><span class=\"jqtree_common jqtree-circle\"></span>\n            <span class=\"jqtree_common jqtree-line\"></span></li>");
        if (position === node_1.Position.After) {
            this.moveAfter();
        }
        else if (position === node_1.Position.Before) {
            this.moveBefore();
        }
        else if (position === node_1.Position.Inside) {
            if (node.isFolder() && node.is_open) {
                this.moveInsideOpenFolder();
            }
            else {
                this.moveInside();
            }
        }
    }
    GhostDropHint.prototype.remove = function () {
        this.$ghost.remove();
    };
    GhostDropHint.prototype.moveAfter = function () {
        this.$element.after(this.$ghost);
    };
    GhostDropHint.prototype.moveBefore = function () {
        this.$element.before(this.$ghost);
    };
    GhostDropHint.prototype.moveInsideOpenFolder = function () {
        jQuery(this.node.children[0].element).before(this.$ghost);
    };
    GhostDropHint.prototype.moveInside = function () {
        this.$element.after(this.$ghost);
        this.$ghost.addClass("jqtree-inside");
    };
    return GhostDropHint;
}());


/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);