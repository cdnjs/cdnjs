/*
JqTree 1.6.0

Copyright 2021 Marco Braak

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
@license

*/
var jqtree = (function (exports, jQueryProxy) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var jQueryProxy__default = /*#__PURE__*/_interopDefaultLegacy(jQueryProxy);
    var jQueryProxy__namespace = /*#__PURE__*/_interopNamespace(jQueryProxy);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var version = "1.6.0";

    var Position;
    (function (Position) {
        Position[Position["Before"] = 1] = "Before";
        Position[Position["After"] = 2] = "After";
        Position[Position["Inside"] = 3] = "Inside";
        Position[Position["None"] = 4] = "None";
    })(Position || (Position = {}));
    var positionNames = {
        before: Position.Before,
        after: Position.After,
        inside: Position.Inside,
        none: Position.None
    };
    var getPositionName = function (position) {
        for (var name_1 in positionNames) {
            if (Object.prototype.hasOwnProperty.call(positionNames, name_1)) {
                if (positionNames[name_1] === position) {
                    return name_1;
                }
            }
        }
        return "";
    };
    var getPosition = function (name) {
        return positionNames[name];
    };
    var Node = /** @class */ (function () {
        function Node(o, isRoot, nodeClass) {
            if (o === void 0) { o = null; }
            if (isRoot === void 0) { isRoot = false; }
            if (nodeClass === void 0) { nodeClass = Node; }
            this.name = "";
            this.isEmptyFolder = false;
            this.load_on_demand = false;
            this.setData(o);
            this.children = [];
            this.parent = null;
            if (isRoot) {
                this.idMapping = new Map();
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
            if (!o) {
                return;
            }
            else if (typeof o === "string") {
                this.name = o;
            }
            else if (typeof o === "object") {
                for (var key in o) {
                    if (Object.prototype.hasOwnProperty.call(o, key)) {
                        var value = o[key];
                        if (key === "label" || key === "name") {
                            // You can use the 'label' key instead of 'name'; this is a legacy feature
                            if (typeof value === "string") {
                                this.name = value;
                            }
                        }
                        else if (key !== "children" && key !== "parent") {
                            // You can't update the children or the parent using this function
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
                var node = this.createNode(o);
                this.addChild(node);
                if (typeof o === "object" &&
                    o["children"] &&
                    o["children"] instanceof Array) {
                    if (o["children"].length === 0) {
                        node.isEmptyFolder = true;
                    }
                    else {
                        node.loadFromData(o["children"]);
                    }
                }
            }
            return this;
        };
        /*
        Add child.

        tree.addChild(
            new Node('child1')
        );
        */
        Node.prototype.addChild = function (node) {
            this.children.push(node);
            node.setParent(this);
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
            node.setParent(this);
        };
        /*
        Remove child. This also removes the children of the node.

        tree.removeChild(tree.children[0]);
        */
        Node.prototype.removeChild = function (node) {
            // remove children from the index
            node.removeChildren();
            this.doRemoveChild(node);
        };
        /*
        Get child index.

        var index = getChildIndex(node);
        */
        Node.prototype.getChildIndex = function (node) {
            return this.children.indexOf(node);
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
                return false;
            }
            else {
                movedNode.parent.doRemoveChild(movedNode);
                switch (position) {
                    case Position.After: {
                        if (targetNode.parent) {
                            targetNode.parent.addChildAtPosition(movedNode, targetNode.parent.getChildIndex(targetNode) + 1);
                            return true;
                        }
                        return false;
                    }
                    case Position.Before: {
                        if (targetNode.parent) {
                            targetNode.parent.addChildAtPosition(movedNode, targetNode.parent.getChildIndex(targetNode));
                            return true;
                        }
                        return false;
                    }
                    case Position.Inside: {
                        // move inside as first child
                        targetNode.addChildAtPosition(movedNode, 0);
                        return true;
                    }
                    default:
                        return false;
                }
            }
        };
        /*
        Get the tree as data.
        */
        Node.prototype.getData = function (includeParent) {
            if (includeParent === void 0) { includeParent = false; }
            var getDataFromNodes = function (nodes) {
                return nodes.map(function (node) {
                    var tmpNode = {};
                    for (var k in node) {
                        if ([
                            "parent",
                            "children",
                            "element",
                            "idMapping",
                            "load_on_demand",
                            "nodeClass",
                            "tree",
                            "isEmptyFolder",
                        ].indexOf(k) === -1 &&
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
            };
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
        Node.prototype.getNodeByNameMustExist = function (name) {
            var node = this.getNodeByCallback(function (n) { return n.name === name; });
            if (!node) {
                throw "Node with name " + name + " not found";
            }
            return node;
        };
        Node.prototype.getNodeByCallback = function (callback) {
            var result = null;
            this.iterate(function (node) {
                if (result) {
                    return false;
                }
                else if (callback(node)) {
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
                var node = this.createNode(nodeInfo);
                var childIndex = this.parent.getChildIndex(this);
                this.parent.addChildAtPosition(node, childIndex + 1);
                if (typeof nodeInfo === "object" &&
                    nodeInfo["children"] &&
                    nodeInfo["children"] instanceof Array &&
                    nodeInfo["children"].length) {
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
                var node = this.createNode(nodeInfo);
                var childIndex = this.parent.getChildIndex(this);
                this.parent.addChildAtPosition(node, childIndex);
                if (typeof nodeInfo === "object" &&
                    nodeInfo["children"] &&
                    nodeInfo["children"] instanceof Array &&
                    nodeInfo["children"].length) {
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
                var newParent = this.createNode(nodeInfo);
                if (this.tree) {
                    newParent.setParent(this.tree);
                }
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
            var node = this.createNode(nodeInfo);
            this.addChild(node);
            if (typeof nodeInfo === "object" &&
                nodeInfo["children"] &&
                nodeInfo["children"] instanceof Array &&
                nodeInfo["children"].length) {
                node.loadFromData(nodeInfo["children"]);
            }
            return node;
        };
        Node.prototype.prepend = function (nodeInfo) {
            var node = this.createNode(nodeInfo);
            this.addChildAtPosition(node, 0);
            if (typeof nodeInfo === "object" &&
                nodeInfo["children"] &&
                nodeInfo["children"] instanceof Array &&
                nodeInfo["children"].length) {
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
            return this.idMapping.get(nodeId) || null;
        };
        Node.prototype.addNodeToIndex = function (node) {
            if (node.id != null) {
                this.idMapping.set(node.id, node);
            }
        };
        Node.prototype.removeNodeFromIndex = function (node) {
            if (node.id != null) {
                this.idMapping["delete"](node.id);
            }
        };
        Node.prototype.removeChildren = function () {
            var _this = this;
            this.iterate(function (child) {
                var _a;
                (_a = _this.tree) === null || _a === void 0 ? void 0 : _a.removeNodeFromIndex(child);
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
                    if (!previousSibling.hasChildren() ||
                        !previousSibling.is_open) {
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
                if (!(lastChild.hasChildren() && lastChild.is_open)) {
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
                if (typeof nodeData === "object" &&
                    nodeData["children"] &&
                    nodeData["children"] instanceof Array &&
                    nodeData["children"].length) {
                    addChildren(nodeData["children"]);
                }
            };
            var addChildren = function (childrenData) {
                for (var _i = 0, childrenData_1 = childrenData; _i < childrenData_1.length; _i++) {
                    var child = childrenData_1[_i];
                    var node = _this.createNode();
                    node.initFromData(child);
                    _this.addChild(node);
                }
            };
            addNode(data);
        };
        Node.prototype.setParent = function (parent) {
            var _a;
            this.parent = parent;
            this.tree = parent.tree;
            (_a = this.tree) === null || _a === void 0 ? void 0 : _a.addNodeToIndex(this);
        };
        Node.prototype.doRemoveChild = function (node) {
            var _a;
            this.children.splice(this.getChildIndex(node), 1);
            (_a = this.tree) === null || _a === void 0 ? void 0 : _a.removeNodeFromIndex(node);
        };
        Node.prototype.getNodeClass = function () {
            var _a;
            return this.nodeClass || ((_a = this === null || this === void 0 ? void 0 : this.tree) === null || _a === void 0 ? void 0 : _a.nodeClass) || Node;
        };
        Node.prototype.createNode = function (nodeData) {
            var nodeClass = this.getNodeClass();
            return new nodeClass(nodeData);
        };
        return Node;
    }());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    var jQuery$1 = jQueryProxy__default['default'] || jQueryProxy__namespace;
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
            var $element = jQuery$1(positionInfo.target);
            if (!this.mustCaptureElement($element)) {
                return null;
            }
            if (this.treeWidget.options.onIsMoveHandle &&
                !this.treeWidget.options.onIsMoveHandle($element)) {
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
        DragAndDropHandler.prototype.mouseStart = function (positionInfo) {
            var _a;
            if (!this.currentItem ||
                positionInfo.pageX === undefined ||
                positionInfo.pageY === undefined) {
                return false;
            }
            this.refresh();
            var offset = jQuery$1(positionInfo.target).offset();
            var left = offset ? offset.left : 0;
            var top = offset ? offset.top : 0;
            var node = this.currentItem.node;
            this.dragElement = new DragElement(node.name, positionInfo.pageX - left, positionInfo.pageY - top, this.treeWidget.element, (_a = this.treeWidget.options.autoEscape) !== null && _a !== void 0 ? _a : true);
            this.isDragging = true;
            this.positionInfo = positionInfo;
            this.currentItem.$element.addClass("jqtree-moving");
            return true;
        };
        DragAndDropHandler.prototype.mouseDrag = function (positionInfo) {
            if (!this.currentItem ||
                !this.dragElement ||
                positionInfo.pageX === undefined ||
                positionInfo.pageY === undefined) {
                return false;
            }
            this.dragElement.move(positionInfo.pageX, positionInfo.pageY);
            this.positionInfo = positionInfo;
            var area = this.findHoveredArea(positionInfo.pageX, positionInfo.pageY);
            if (area && this.canMoveToArea(area)) {
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
                this.removeDropHint();
                this.stopOpenFolderTimer();
                this.hoveredArea = area;
            }
            if (!area) {
                if (this.treeWidget.options.onDragMove) {
                    this.treeWidget.options.onDragMove(this.currentItem.node, positionInfo.originalEvent);
                }
            }
            return true;
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
        DragAndDropHandler.prototype.generateHitAreas = function () {
            if (!this.currentItem) {
                this.hitAreas = [];
            }
            else {
                var hitAreasGenerator = new HitAreasGenerator(this.treeWidget.tree, this.currentItem.node, this.getTreeDimensions().bottom);
                this.hitAreas = hitAreasGenerator.generate();
            }
        };
        DragAndDropHandler.prototype.mustCaptureElement = function ($element) {
            return !$element.is("input,select,textarea");
        };
        DragAndDropHandler.prototype.canMoveToArea = function (area) {
            if (!this.treeWidget.options.onCanMoveTo) {
                return true;
            }
            if (!this.currentItem) {
                return false;
            }
            var positionName = getPositionName(area.position);
            return this.treeWidget.options.onCanMoveTo(this.currentItem.node, area.node, positionName);
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
            if (x < dimensions.left ||
                y < dimensions.top ||
                x > dimensions.right ||
                y > dimensions.bottom) {
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
            return (node.isFolder() &&
                !node.is_open &&
                area.position === Position.Inside);
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
                this.hoveredArea.position !== Position.None &&
                this.canMoveToArea(this.hoveredArea)) {
                var movedNode_1 = this.currentItem.node;
                var targetNode_1 = this.hoveredArea.node;
                var position_1 = this.hoveredArea.position;
                var previousParent = movedNode_1.parent;
                if (position_1 === Position.Inside) {
                    this.hoveredArea.node.is_open = true;
                }
                var doMove = function () {
                    _this.treeWidget.tree.moveNode(movedNode_1, targetNode_1, position_1);
                    _this.treeWidget.element.empty();
                    _this.treeWidget._refreshElements(null);
                };
                var event_1 = this.treeWidget._triggerEvent("tree.move", {
                    move_info: {
                        moved_node: movedNode_1,
                        target_node: targetNode_1,
                        position: getPositionName(position_1),
                        previous_parent: previousParent,
                        do_move: doMove,
                        original_event: positionInfo.originalEvent
                    }
                });
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
                    $element = jQuery$1(node.element);
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
                this.addPosition(node, Position.Inside, this.getTop($element));
            }
            // Continue iterating
            return true;
        };
        HitAreasGenerator.prototype.handleClosedFolder = function (node, nextNode, $element) {
            var top = this.getTop($element);
            if (node === this.currentNode) {
                // Cannot move after current item
                this.addPosition(node, Position.None, top);
            }
            else {
                this.addPosition(node, Position.Inside, top);
                // Cannot move before current item
                if (nextNode !== this.currentNode) {
                    this.addPosition(node, Position.After, top);
                }
            }
        };
        HitAreasGenerator.prototype.handleFirstNode = function (node) {
            if (node !== this.currentNode) {
                this.addPosition(node, Position.Before, this.getTop(jQuery$1(node.element)));
            }
        };
        HitAreasGenerator.prototype.handleAfterOpenFolder = function (node, nextNode) {
            if (node === this.currentNode || nextNode === this.currentNode) {
                // Cannot move before or after current item
                this.addPosition(node, Position.None, this.lastTop);
            }
            else {
                this.addPosition(node, Position.After, this.lastTop);
            }
        };
        HitAreasGenerator.prototype.handleNode = function (node, nextNode, $element) {
            var top = this.getTop($element);
            if (node === this.currentNode) {
                // Cannot move inside current item
                this.addPosition(node, Position.None, top);
            }
            else {
                this.addPosition(node, Position.Inside, top);
            }
            if (nextNode === this.currentNode || node === this.currentNode) {
                // Cannot move before or after current item
                this.addPosition(node, Position.None, top);
            }
            else {
                this.addPosition(node, Position.After, top);
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
    var DragElement = /** @class */ (function () {
        function DragElement(nodeName, offsetX, offsetY, $tree, autoEscape) {
            this.offsetX = offsetX;
            this.offsetY = offsetY;
            this.$element = jQuery$1("<span>").addClass("jqtree-title jqtree-dragging");
            if (autoEscape) {
                this.$element.text(nodeName);
            }
            else {
                this.$element.html(nodeName);
            }
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

    var isInt = function (n) {
        return typeof n === "number" && n % 1 === 0;
    };
    var isFunction = function (v) { return typeof v === "function"; };
    var getBoolString = function (value) {
        return value ? "true" : "false";
    };

    var ElementsRenderer = /** @class */ (function () {
        function ElementsRenderer(treeWidget) {
            this.treeWidget = treeWidget;
            this.openedIconElement = this.createButtonElement(treeWidget.options.openedIcon || "+");
            this.closedIconElement = this.createButtonElement(treeWidget.options.closedIcon || "-");
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
            if (this.treeWidget.options.dragAndDrop) {
                classString += " jqtree-dnd";
            }
            var ul = document.createElement("ul");
            ul.className = "jqtree_common " + classString;
            ul.setAttribute("role", role);
            return ul;
        };
        ElementsRenderer.prototype.createLi = function (node, level) {
            var isSelected = Boolean(this.treeWidget.selectNodeHandler.isNodeSelected(node));
            var mustShowFolder = node.isFolder() ||
                (node.isEmptyFolder && this.treeWidget.options.showEmptyFolder);
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
            var iconElement = node.is_open
                ? this.openedIconElement
                : this.closedIconElement;
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
            titleSpan.setAttribute("aria-selected", getBoolString(isSelected));
            titleSpan.setAttribute("aria-expanded", getBoolString(isOpen));
            if (isSelected) {
                var tabIndex = this.treeWidget.options.tabIndex;
                if (tabIndex !== undefined) {
                    titleSpan.setAttribute("tabindex", "" + tabIndex);
                }
            }
            if (this.treeWidget.options.autoEscape) {
                titleSpan.textContent = nodeName;
            }
            else {
                titleSpan.innerHTML = nodeName;
            }
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
                if (_this.treeWidget.options.onLoadFailed) {
                    _this.treeWidget.options.onLoadFailed(jqXHR);
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
            if (this.treeWidget.options.onLoading) {
                this.treeWidget.options.onLoading(isLoading, node, $el);
            }
            this.treeWidget._triggerEvent("tree.loading_data", {
                isLoading: isLoading,
                node: node,
                $el: $el
            });
        };
        DataLoader.prototype.submitRequest = function (urlInfoInput, handleSuccess, handleError) {
            var _a;
            var urlInfo = typeof urlInfoInput === "string"
                ? { url: urlInfoInput }
                : urlInfoInput;
            var ajaxSettings = __assign({ method: "GET", cache: false, dataType: "json", success: handleSuccess, error: handleError }, urlInfo);
            ajaxSettings.method = ((_a = ajaxSettings.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || "GET";
            void jQuery.ajax(ajaxSettings);
        };
        DataLoader.prototype.parseData = function (data) {
            var dataFilter = this.treeWidget.options.dataFilter;
            var getParsedData = function () {
                if (typeof data === "string") {
                    return JSON.parse(data);
                }
                else {
                    return data;
                }
            };
            var parsedData = getParsedData();
            if (dataFilter) {
                return dataFilter(parsedData);
            }
            else {
                return parsedData;
            }
        };
        return DataLoader;
    }());

    var KeyHandler = /** @class */ (function () {
        function KeyHandler(treeWidget) {
            var _this = this;
            this.handleKeyDown = function (e) {
                if (!_this.canHandleKeyboard()) {
                    return true;
                }
                var selectedNode = _this.treeWidget.getSelectedNode();
                if (!selectedNode) {
                    return true;
                }
                var key = e.which;
                switch (key) {
                    case KeyHandler.DOWN:
                        return _this.moveDown(selectedNode);
                    case KeyHandler.UP:
                        return _this.moveUp(selectedNode);
                    case KeyHandler.RIGHT:
                        return _this.moveRight(selectedNode);
                    case KeyHandler.LEFT:
                        return _this.moveLeft(selectedNode);
                    default:
                        return true;
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
        KeyHandler.prototype.moveDown = function (selectedNode) {
            return this.selectNode(selectedNode.getNextNode());
        };
        KeyHandler.prototype.moveUp = function (selectedNode) {
            return this.selectNode(selectedNode.getPreviousNode());
        };
        KeyHandler.prototype.moveRight = function (selectedNode) {
            if (!selectedNode.isFolder()) {
                return true;
            }
            else {
                // folder node
                if (selectedNode.is_open) {
                    // Right moves to the first child of an open node
                    return this.selectNode(selectedNode.getNextNode());
                }
                else {
                    // Right expands a closed node
                    this.treeWidget.openNode(selectedNode);
                    return false;
                }
            }
        };
        KeyHandler.prototype.moveLeft = function (selectedNode) {
            if (selectedNode.isFolder() && selectedNode.is_open) {
                // Left on an open node closes the node
                this.treeWidget.closeNode(selectedNode);
                return false;
            }
            else {
                // Left on a closed or end node moves focus to the node's parent
                return this.selectNode(selectedNode.getParent());
            }
        };
        KeyHandler.prototype.selectNode = function (node) {
            if (!node) {
                return true;
            }
            else {
                this.treeWidget.selectNode(node);
                if (!this.treeWidget.scrollHandler.isScrolledIntoView(jQuery(node.element).find(".jqtree-element"))) {
                    this.treeWidget.scrollToNode(node);
                }
                return false;
            }
        };
        KeyHandler.prototype.canHandleKeyboard = function () {
            return ((this.treeWidget.options.keyboardSupport || false) &&
                this.treeWidget.selectNodeHandler.isFocusOnTree());
        };
        KeyHandler.LEFT = 37;
        KeyHandler.UP = 38;
        KeyHandler.RIGHT = 39;
        KeyHandler.DOWN = 40;
        return KeyHandler;
    }());

    var register = function (widgetClass, widgetName) {
        var getDataKey = function () { return "simple_widget_" + widgetName; };
        var getWidgetData = function (el, dataKey) {
            var widget = jQuery.data(el, dataKey);
            if (widget && widget instanceof SimpleWidget) {
                return widget;
            }
            else {
                return null;
            }
        };
        var createWidget = function ($el, options) {
            var dataKey = getDataKey();
            for (var _i = 0, _a = $el.get(); _i < _a.length; _i++) {
                var el = _a[_i];
                var existingWidget = getWidgetData(el, dataKey);
                if (!existingWidget) {
                    var simpleWidgetClass = widgetClass;
                    var widget = new simpleWidgetClass(el, options);
                    if (!jQuery.data(el, dataKey)) {
                        jQuery.data(el, dataKey, widget);
                    }
                    // Call init after setting data, so we can call methods
                    widget.init();
                }
            }
            return $el;
        };
        var destroyWidget = function ($el) {
            var dataKey = getDataKey();
            for (var _i = 0, _a = $el.get(); _i < _a.length; _i++) {
                var el = _a[_i];
                var widget = getWidgetData(el, dataKey);
                if (widget) {
                    widget.destroy();
                }
                jQuery.removeData(el, dataKey);
            }
        };
        var callFunction = function ($el, functionName, args) {
            var result = null;
            for (var _i = 0, _a = $el.get(); _i < _a.length; _i++) {
                var el = _a[_i];
                var widget = jQuery.data(el, getDataKey());
                if (widget && widget instanceof SimpleWidget) {
                    var simpleWidget = widget;
                    var widgetFunction = simpleWidget[functionName];
                    if (widgetFunction && typeof widgetFunction === "function") {
                        result = widgetFunction.apply(widget, args);
                    }
                }
            }
            return result;
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        jQuery.fn[widgetName] = function (argument1) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!argument1) {
                return createWidget(this, null);
            }
            else if (typeof argument1 === "object") {
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
    var SimpleWidget = /** @class */ (function () {
        function SimpleWidget(el, options) {
            this.$el = jQuery(el);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            var defaults = this.constructor["defaults"];
            this.options = __assign(__assign({}, defaults), options);
        }
        SimpleWidget.register = function (widgetClass, widgetName) {
            register(widgetClass, widgetName);
        };
        SimpleWidget.prototype.destroy = function () {
            this.deinit();
        };
        SimpleWidget.prototype.init = function () {
            //
        };
        SimpleWidget.prototype.deinit = function () {
            //
        };
        SimpleWidget.defaults = {};
        return SimpleWidget;
    }());

    var getPositionInfoFromMouseEvent = function (e) { return ({
        pageX: e.pageX,
        pageY: e.pageY,
        target: e.target,
        originalEvent: e
    }); };
    var getPositionInfoFromTouch = function (touch, e) { return ({
        pageX: touch.pageX,
        pageY: touch.pageY,
        target: touch.target,
        originalEvent: e
    }); };
    var MouseWidget = /** @class */ (function (_super) {
        __extends(MouseWidget, _super);
        function MouseWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.mouseDown = function (e) {
                // Left mouse button?
                if (e.button !== 0) {
                    return;
                }
                var result = _this.handleMouseDown(getPositionInfoFromMouseEvent(e));
                if (result && e.cancelable) {
                    e.preventDefault();
                }
            };
            _this.mouseMove = function (e) {
                _this.handleMouseMove(e, getPositionInfoFromMouseEvent(e));
            };
            _this.mouseUp = function (e) {
                _this.handleMouseUp(getPositionInfoFromMouseEvent(e));
            };
            _this.touchStart = function (e) {
                if (!e) {
                    return;
                }
                if (e.touches.length > 1) {
                    return;
                }
                var touch = e.changedTouches[0];
                _this.handleMouseDown(getPositionInfoFromTouch(touch, e));
            };
            _this.touchMove = function (e) {
                if (!e) {
                    return;
                }
                if (e.touches.length > 1) {
                    return;
                }
                var touch = e.changedTouches[0];
                _this.handleMouseMove(e, getPositionInfoFromTouch(touch, e));
            };
            _this.touchEnd = function (e) {
                if (!e) {
                    return;
                }
                if (e.touches.length > 1) {
                    return;
                }
                var touch = e.changedTouches[0];
                _this.handleMouseUp(getPositionInfoFromTouch(touch, e));
            };
            return _this;
        }
        MouseWidget.prototype.init = function () {
            var element = this.$el.get(0);
            element.addEventListener("mousedown", this.mouseDown, {
                passive: false
            });
            element.addEventListener("touchstart", this.touchStart, {
                passive: false
            });
            this.isMouseStarted = false;
            this.mouseDelayTimer = null;
            this.isMouseDelayMet = false;
            this.mouseDownInfo = null;
        };
        MouseWidget.prototype.deinit = function () {
            var el = this.$el.get(0);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            el.removeEventListener("mousedown", this.mouseDown, {
                passive: false
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            el.removeEventListener("touchstart", this.touchStart, {
                passive: false
            });
            this.removeMouseMoveEventListeners();
        };
        MouseWidget.prototype.handleMouseDown = function (positionInfo) {
            // We may have missed mouseup (out of window)
            if (this.isMouseStarted) {
                this.handleMouseUp(positionInfo);
            }
            this.mouseDownInfo = positionInfo;
            if (!this.mouseCapture(positionInfo)) {
                return false;
            }
            this.handleStartMouse();
            return true;
        };
        MouseWidget.prototype.handleStartMouse = function () {
            document.addEventListener("mousemove", this.mouseMove, {
                passive: false
            });
            document.addEventListener("touchmove", this.touchMove, {
                passive: false
            });
            document.addEventListener("mouseup", this.mouseUp, { passive: false });
            document.addEventListener("touchend", this.touchEnd, {
                passive: false
            });
            var mouseDelay = this.getMouseDelay();
            if (mouseDelay) {
                this.startMouseDelayTimer(mouseDelay);
            }
            else {
                this.isMouseDelayMet = true;
            }
        };
        MouseWidget.prototype.startMouseDelayTimer = function (mouseDelay) {
            var _this = this;
            if (this.mouseDelayTimer) {
                clearTimeout(this.mouseDelayTimer);
            }
            this.mouseDelayTimer = window.setTimeout(function () {
                if (_this.mouseDownInfo) {
                    _this.isMouseDelayMet = true;
                }
            }, mouseDelay);
            this.isMouseDelayMet = false;
        };
        MouseWidget.prototype.handleMouseMove = function (e, positionInfo) {
            if (this.isMouseStarted) {
                this.mouseDrag(positionInfo);
                if (e.cancelable) {
                    e.preventDefault();
                }
                return;
            }
            if (!this.isMouseDelayMet) {
                return;
            }
            if (this.mouseDownInfo) {
                this.isMouseStarted = this.mouseStart(this.mouseDownInfo) !== false;
            }
            if (this.isMouseStarted) {
                this.mouseDrag(positionInfo);
                if (e.cancelable) {
                    e.preventDefault();
                }
            }
            else {
                this.handleMouseUp(positionInfo);
            }
        };
        MouseWidget.prototype.handleMouseUp = function (positionInfo) {
            this.removeMouseMoveEventListeners();
            this.isMouseDelayMet = false;
            this.mouseDownInfo = null;
            if (this.isMouseStarted) {
                this.isMouseStarted = false;
                this.mouseStop(positionInfo);
            }
        };
        MouseWidget.prototype.removeMouseMoveEventListeners = function () {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            document.removeEventListener("mousemove", this.mouseMove, {
                passive: false
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            document.removeEventListener("touchmove", this.touchMove, {
                passive: false
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            document.removeEventListener("mouseup", this.mouseUp, {
                passive: false
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            document.removeEventListener("touchend", this.touchEnd, {
                passive: false
            });
        };
        return MouseWidget;
    }(SimpleWidget));

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
            var jsonData = this.loadFromStorage();
            if (jsonData) {
                return this.parseState(jsonData);
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
            var getSelectedNodeIds = function () {
                var selectedNodeIds = [];
                _this.treeWidget.getSelectedNodes().forEach(function (node) {
                    if (node.id != null) {
                        selectedNodeIds.push(node.id);
                    }
                });
                return selectedNodeIds;
            };
            return {
                open_nodes: getOpenNodeIds(),
                selected_node: getSelectedNodeIds()
            };
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
                    mustLoadOnDemand = this.openInitialNodes(state.open_nodes);
                }
                if (state.selected_node) {
                    this.resetSelection();
                    this.selectInitialNodes(state.selected_node);
                }
                return mustLoadOnDemand;
            }
        };
        SaveStateHandler.prototype.setInitialStateOnDemand = function (state, cbFinished) {
            if (state) {
                this.doSetInitialStateOnDemand(state.open_nodes, state.selected_node, cbFinished);
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
        SaveStateHandler.prototype.parseState = function (jsonData) {
            var state = JSON.parse(jsonData);
            // Check if selected_node is an int (instead of an array)
            if (state && state.selected_node && isInt(state.selected_node)) {
                // Convert to array
                state.selected_node = [state.selected_node];
            }
            return state;
        };
        SaveStateHandler.prototype.loadFromStorage = function () {
            if (this.treeWidget.options.onGetStateFromStorage) {
                return this.treeWidget.options.onGetStateFromStorage();
            }
            else if (this.supportsLocalStorage()) {
                return localStorage.getItem(this.getKeyName());
            }
            else {
                return null;
            }
        };
        SaveStateHandler.prototype.openInitialNodes = function (nodeIds) {
            var mustLoadOnDemand = false;
            for (var _i = 0, nodeIds_1 = nodeIds; _i < nodeIds_1.length; _i++) {
                var nodeDd = nodeIds_1[_i];
                var node = this.treeWidget.getNodeById(nodeDd);
                if (node) {
                    if (!node.load_on_demand) {
                        node.is_open = true;
                    }
                    else {
                        mustLoadOnDemand = true;
                    }
                }
            }
            return mustLoadOnDemand;
        };
        SaveStateHandler.prototype.selectInitialNodes = function (nodeIds) {
            var selectCount = 0;
            for (var _i = 0, nodeIds_2 = nodeIds; _i < nodeIds_2.length; _i++) {
                var nodeId = nodeIds_2[_i];
                var node = this.treeWidget.getNodeById(nodeId);
                if (node) {
                    selectCount += 1;
                    this.treeWidget.selectNodeHandler.addToSelection(node);
                }
            }
            return selectCount !== 0;
        };
        SaveStateHandler.prototype.resetSelection = function () {
            var selectNodeHandler = this.treeWidget.selectNodeHandler;
            var selectedNodes = selectNodeHandler.getSelectedNodes();
            selectedNodes.forEach(function (node) {
                selectNodeHandler.removeFromSelection(node);
            });
        };
        SaveStateHandler.prototype.doSetInitialStateOnDemand = function (nodeIdsParam, selectedNodes, cbFinished) {
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
                if (_this.selectInitialNodes(selectedNodes)) {
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
                        if (overflowValue === "auto" ||
                            overflowValue === "scroll") {
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
            if ($scrollParent &&
                $scrollParent.length &&
                $scrollParent[0].tagName !== "HTML") {
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
            var hoveredArea = this.treeWidget.dndHandler.hoveredArea;
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
            var positionInfo = this.treeWidget.dndHandler.positionInfo;
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
            if (positionInfo.pageX === undefined ||
                positionInfo.pageY === undefined) {
                return;
            }
            var $scrollParent = this.$scrollParent;
            var scrollParentOffset = $scrollParent && $scrollParent.offset();
            if (!($scrollParent && scrollParentOffset)) {
                return;
            }
            var scrollParent = $scrollParent[0];
            var canScrollRight = scrollParent.scrollLeft + scrollParent.clientWidth <
                scrollParent.scrollWidth;
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
            if (positionInfo.pageX === undefined ||
                positionInfo.pageY === undefined) {
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

    var SelectNodeHandler = /** @class */ (function () {
        function SelectNodeHandler(treeWidget) {
            this.treeWidget = treeWidget;
            this.selectedNodes = new Set();
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
            var _this = this;
            if (this.selectedSingleNode) {
                return [this.selectedSingleNode];
            }
            else {
                var selectedNodes_1 = [];
                this.selectedNodes.forEach(function (id) {
                    var node = _this.treeWidget.getNodeById(id);
                    if (node) {
                        selectedNodes_1.push(node);
                    }
                });
                return selectedNodes_1;
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
                    if (Object.prototype.hasOwnProperty.call(this.selectedNodes, id)) {
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
            if (node.id != null) {
                return this.selectedNodes.has(node.id);
            }
            else if (this.selectedSingleNode) {
                return this.selectedSingleNode.element === node.element;
            }
            else {
                return false;
            }
        };
        SelectNodeHandler.prototype.clear = function () {
            this.selectedNodes.clear();
            this.selectedSingleNode = null;
        };
        SelectNodeHandler.prototype.removeFromSelection = function (node, includeChildren) {
            var _this = this;
            if (includeChildren === void 0) { includeChildren = false; }
            if (node.id == null) {
                if (this.selectedSingleNode &&
                    node.element === this.selectedSingleNode.element) {
                    this.selectedSingleNode = null;
                }
            }
            else {
                this.selectedNodes["delete"](node.id);
                if (includeChildren) {
                    node.iterate(function () {
                        if (node.id != null) {
                            _this.selectedNodes["delete"](node.id);
                        }
                        return true;
                    });
                }
            }
        };
        SelectNodeHandler.prototype.addToSelection = function (node) {
            if (node.id != null) {
                this.selectedNodes.add(node.id);
            }
            else {
                this.selectedSingleNode = node;
            }
        };
        SelectNodeHandler.prototype.isFocusOnTree = function () {
            var activeElement = document.activeElement;
            return Boolean(activeElement &&
                activeElement.tagName === "SPAN" &&
                this.treeWidget._containsElement(activeElement));
        };
        return SelectNodeHandler;
    }());

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
            var _a;
            var $li = this.getLi();
            $li.addClass("jqtree-selected");
            $li.attr("aria-selected", "true");
            var $span = this.getSpan();
            $span.attr("tabindex", (_a = this.treeWidget.options.tabIndex) !== null && _a !== void 0 ? _a : null);
            if (mustSetFocus) {
                $span.trigger("focus");
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
            return this.$element
                .children(".jqtree-element")
                .find("span.jqtree-title");
        };
        NodeElement.prototype.getLi = function () {
            return this.$element;
        };
        NodeElement.prototype.mustShowBorderDropHint = function (position) {
            return position === Position.Inside;
        };
        return NodeElement;
    }());
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
            this.node.is_open = true;
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
            this.node.is_open = false;
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
            return !this.node.is_open && position === Position.Inside;
        };
        FolderElement.prototype.getButton = function () {
            return this.$element
                .children(".jqtree-element")
                .find("a.jqtree-toggler");
        };
        return FolderElement;
    }(NodeElement));
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
    var GhostDropHint = /** @class */ (function () {
        function GhostDropHint(node, $element, position) {
            this.$element = $element;
            this.node = node;
            this.$ghost = jQuery("<li class=\"jqtree_common jqtree-ghost\"><span class=\"jqtree_common jqtree-circle\"></span>\n            <span class=\"jqtree_common jqtree-line\"></span></li>");
            if (position === Position.After) {
                this.moveAfter();
            }
            else if (position === Position.Before) {
                this.moveBefore();
            }
            else if (position === Position.Inside) {
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    var jQuery$2 = jQueryProxy__default['default'] || jQueryProxy__namespace;
    var NODE_PARAM_IS_EMPTY = "Node parameter is empty";
    var PARAM_IS_EMPTY = "Parameter is empty: ";
    var JqTreeWidget = /** @class */ (function (_super) {
        __extends(JqTreeWidget, _super);
        function JqTreeWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.handleClick = function (e) {
                var clickTarget = _this.getClickTarget(e.target);
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
                            click_event: e
                        });
                        if (!event_1.isDefaultPrevented()) {
                            _this.doSelectNode(node);
                        }
                    }
                }
            };
            _this.handleDblclick = function (e) {
                var clickTarget = _this.getClickTarget(e.target);
                if ((clickTarget === null || clickTarget === void 0 ? void 0 : clickTarget.type) === "label") {
                    _this._triggerEvent("tree.dblclick", {
                        node: clickTarget.node,
                        click_event: e
                    });
                }
            };
            _this.handleContextmenu = function (e) {
                var $div = jQuery$2(e.target).closest("ul.jqtree-tree .jqtree-element");
                if ($div.length) {
                    var node = _this.getNode($div);
                    if (node) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this._triggerEvent("tree.contextmenu", {
                            node: node,
                            click_event: e
                        });
                        return false;
                    }
                }
                return null;
            };
            return _this;
        }
        JqTreeWidget.prototype.toggle = function (node, slideParam) {
            if (slideParam === void 0) { slideParam = null; }
            if (!node) {
                throw Error(NODE_PARAM_IS_EMPTY);
            }
            var slide = slideParam !== null && slideParam !== void 0 ? slideParam : this.options.slide;
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
            this.doSelectNode(node, optionsParam);
            return this.element;
        };
        JqTreeWidget.prototype.getSelectedNode = function () {
            return this.selectNodeHandler.getSelectedNode();
        };
        JqTreeWidget.prototype.toJson = function () {
            return JSON.stringify(this.tree.getData());
        };
        JqTreeWidget.prototype.loadData = function (data, parentNode) {
            this.doLoadData(data, parentNode);
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
                this.doLoadDataFromUrl(param1, param2, param3 !== null && param3 !== void 0 ? param3 : null);
            }
            else {
                // first parameter is not url
                this.doLoadDataFromUrl(null, param1, param2);
            }
            return this.element;
        };
        JqTreeWidget.prototype.reload = function (onFinished) {
            this.doLoadDataFromUrl(null, null, onFinished);
            return this.element;
        };
        JqTreeWidget.prototype.getNodeById = function (nodeId) {
            return this.tree.getNodeById(nodeId);
        };
        JqTreeWidget.prototype.getNodeByName = function (name) {
            return this.tree.getNodeByName(name);
        };
        JqTreeWidget.prototype.getNodeByNameMustExist = function (name) {
            return this.tree.getNodeByNameMustExist(name);
        };
        JqTreeWidget.prototype.getNodesByProperty = function (key, value) {
            return this.tree.getNodesByProperty(key, value);
        };
        JqTreeWidget.prototype.getNodeByHtmlElement = function (element) {
            return this.getNode(jQuery$2(element));
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
                var _a;
                var onFinished;
                var slide;
                if (isFunction(param1)) {
                    onFinished = param1;
                    slide = null;
                }
                else {
                    slide = param1;
                    onFinished = param2;
                }
                if (slide == null) {
                    slide = (_a = _this.options.slide) !== null && _a !== void 0 ? _a : false;
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
            var slide = slideParam !== null && slideParam !== void 0 ? slideParam : this.options.slide;
            if (node.isFolder() || node.isEmptyFolder) {
                new FolderElement(node, this).close(slide, this.options.animationSpeed);
                this.saveState();
            }
            return this.element;
        };
        JqTreeWidget.prototype.isDragging = function () {
            return this.dndHandler.isDragging;
        };
        JqTreeWidget.prototype.refreshHitAreas = function () {
            this.dndHandler.refresh();
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
        JqTreeWidget.prototype.removeNode = function (node) {
            if (!node) {
                throw Error(NODE_PARAM_IS_EMPTY);
            }
            if (!node.parent) {
                throw Error("Node has no parent");
            }
            this.selectNodeHandler.removeFromSelection(node, true); // including children
            var parent = node.parent;
            node.remove();
            this._refreshElements(parent);
            return this.element;
        };
        JqTreeWidget.prototype.appendNode = function (newNodeInfo, parentNodeParam) {
            var parentNode = parentNodeParam || this.tree;
            var node = parentNode.append(newNodeInfo);
            this._refreshElements(parentNode);
            return node;
        };
        JqTreeWidget.prototype.prependNode = function (newNodeInfo, parentNodeParam) {
            var parentNode = parentNodeParam !== null && parentNodeParam !== void 0 ? parentNodeParam : this.tree;
            var node = parentNode.prepend(newNodeInfo);
            this._refreshElements(parentNode);
            return node;
        };
        JqTreeWidget.prototype.updateNode = function (node, data) {
            if (!node) {
                throw Error(NODE_PARAM_IS_EMPTY);
            }
            var idIsChanged = typeof data === "object" && data.id && data.id !== node.id;
            if (idIsChanged) {
                this.tree.removeNodeFromIndex(node);
            }
            node.setData(data);
            if (idIsChanged) {
                this.tree.addNodeToIndex(node);
            }
            if (typeof data === "object" &&
                data["children"] &&
                data["children"] instanceof Array) {
                node.removeChildren();
                if (data.children.length) {
                    node.loadFromData(data.children);
                }
            }
            var mustSetFocus = this.selectNodeHandler.isFocusOnTree();
            var mustSelect = this.isSelectedNodeInSubtree(node);
            this._refreshElements(node);
            if (mustSelect) {
                this.selectCurrentNode(mustSetFocus);
            }
            return this.element;
        };
        JqTreeWidget.prototype.isSelectedNodeInSubtree = function (subtree) {
            var selectedNode = this.getSelectedNode();
            if (!selectedNode) {
                return false;
            }
            else {
                return subtree === selectedNode || subtree.isParentOf(selectedNode);
            }
        };
        JqTreeWidget.prototype.moveNode = function (node, targetNode, position) {
            if (!node) {
                throw Error(NODE_PARAM_IS_EMPTY);
            }
            if (!targetNode) {
                throw Error(PARAM_IS_EMPTY + "targetNode");
            }
            var positionIndex = getPosition(position);
            if (positionIndex !== undefined) {
                this.tree.moveNode(node, targetNode, positionIndex);
                this._refreshElements(null);
            }
            return this.element;
        };
        JqTreeWidget.prototype.getStateFromStorage = function () {
            return this.saveStateHandler.getStateFromStorage();
        };
        JqTreeWidget.prototype.addToSelection = function (node, mustSetFocus) {
            if (!node) {
                throw Error(NODE_PARAM_IS_EMPTY);
            }
            this.selectNodeHandler.addToSelection(node);
            this._getNodeElementForNode(node).select(mustSetFocus === undefined ? true : mustSetFocus);
            this.saveState();
            return this.element;
        };
        JqTreeWidget.prototype.getSelectedNodes = function () {
            return this.selectNodeHandler.getSelectedNodes();
        };
        JqTreeWidget.prototype.isNodeSelected = function (node) {
            if (!node) {
                throw Error(NODE_PARAM_IS_EMPTY);
            }
            return this.selectNodeHandler.isNodeSelected(node);
        };
        JqTreeWidget.prototype.removeFromSelection = function (node) {
            if (!node) {
                throw Error(NODE_PARAM_IS_EMPTY);
            }
            this.selectNodeHandler.removeFromSelection(node);
            this._getNodeElementForNode(node).deselect();
            this.saveState();
            return this.element;
        };
        JqTreeWidget.prototype.scrollToNode = function (node) {
            if (!node) {
                throw Error(NODE_PARAM_IS_EMPTY);
            }
            var nodeOffset = jQuery$2(node.element).offset();
            var nodeTop = nodeOffset ? nodeOffset.top : 0;
            var treeOffset = this.$el.offset();
            var treeTop = treeOffset ? treeOffset.top : 0;
            var top = nodeTop - treeTop;
            this.scrollHandler.scrollToY(top);
            return this.element;
        };
        JqTreeWidget.prototype.getState = function () {
            return this.saveStateHandler.getState();
        };
        JqTreeWidget.prototype.setState = function (state) {
            this.saveStateHandler.setInitialState(state);
            this._refreshElements(null);
            return this.element;
        };
        JqTreeWidget.prototype.setOption = function (option, value) {
            this.options[option] = value;
            return this.element;
        };
        JqTreeWidget.prototype.moveDown = function () {
            var selectedNode = this.getSelectedNode();
            if (selectedNode) {
                this.keyHandler.moveDown(selectedNode);
            }
            return this.element;
        };
        JqTreeWidget.prototype.moveUp = function () {
            var selectedNode = this.getSelectedNode();
            if (selectedNode) {
                this.keyHandler.moveUp(selectedNode);
            }
            return this.element;
        };
        JqTreeWidget.prototype.getVersion = function () {
            return version;
        };
        JqTreeWidget.prototype._triggerEvent = function (eventName, values) {
            var event = jQuery$2.Event(eventName, values);
            this.element.trigger(event);
            return event;
        };
        JqTreeWidget.prototype._openNode = function (node, slide, onFinished) {
            var _this = this;
            if (slide === void 0) { slide = true; }
            var doOpenNode = function (_node, _slide, _onFinished) {
                var folderElement = new FolderElement(_node, _this);
                folderElement.open(_onFinished, _slide, _this.options.animationSpeed);
            };
            if (node.isFolder() || node.isEmptyFolder) {
                if (node.load_on_demand) {
                    this.loadFolderOnDemand(node, slide, onFinished);
                }
                else {
                    var parent_1 = node.parent;
                    while (parent_1) {
                        // nb: do not open root element
                        if (parent_1.parent) {
                            doOpenNode(parent_1, false, null);
                        }
                        parent_1 = parent_1.parent;
                    }
                    doOpenNode(node, slide, onFinished);
                    this.saveState();
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
                return new FolderElement(node, this);
            }
            else {
                return new NodeElement(node, this);
            }
        };
        JqTreeWidget.prototype._getNodeElement = function ($element) {
            var node = this.getNode($element);
            if (node) {
                return this._getNodeElementForNode(node);
            }
            else {
                return null;
            }
        };
        JqTreeWidget.prototype._containsElement = function (element) {
            var node = this.getNode(jQuery$2(element));
            return node != null && node.tree === this.tree;
        };
        JqTreeWidget.prototype._getScrollLeft = function () {
            return this.scrollHandler.getScrollLeft();
        };
        JqTreeWidget.prototype.init = function () {
            _super.prototype.init.call(this);
            this.element = this.$el;
            this.isInitialized = false;
            this.options.rtl = this.getRtlOption();
            if (this.options.closedIcon == null) {
                this.options.closedIcon = this.getDefaultClosedIcon();
            }
            this.renderer = new ElementsRenderer(this);
            this.dataLoader = new DataLoader(this);
            this.saveStateHandler = new SaveStateHandler(this);
            this.selectNodeHandler = new SelectNodeHandler(this);
            this.dndHandler = new DragAndDropHandler(this);
            this.scrollHandler = new ScrollHandler(this);
            this.keyHandler = new KeyHandler(this);
            this.initData();
            this.element.on("click", this.handleClick);
            this.element.on("dblclick", this.handleDblclick);
            if (this.options.useContextMenu) {
                this.element.on("contextmenu", this.handleContextmenu);
            }
        };
        JqTreeWidget.prototype.deinit = function () {
            this.element.empty();
            this.element.off();
            this.keyHandler.deinit();
            this.tree = new Node({}, true);
            _super.prototype.deinit.call(this);
        };
        JqTreeWidget.prototype.mouseCapture = function (positionInfo) {
            if (this.options.dragAndDrop) {
                return this.dndHandler.mouseCapture(positionInfo);
            }
            else {
                return false;
            }
        };
        JqTreeWidget.prototype.mouseStart = function (positionInfo) {
            if (this.options.dragAndDrop) {
                return this.dndHandler.mouseStart(positionInfo);
            }
            else {
                return false;
            }
        };
        JqTreeWidget.prototype.mouseDrag = function (positionInfo) {
            if (this.options.dragAndDrop) {
                var result = this.dndHandler.mouseDrag(positionInfo);
                this.scrollHandler.checkScrolling();
                return result;
            }
            else {
                return false;
            }
        };
        JqTreeWidget.prototype.mouseStop = function (positionInfo) {
            if (this.options.dragAndDrop) {
                return this.dndHandler.mouseStop(positionInfo);
            }
            else {
                return false;
            }
        };
        JqTreeWidget.prototype.getMouseDelay = function () {
            var _a;
            return (_a = this.options.startDndDelay) !== null && _a !== void 0 ? _a : 0;
        };
        JqTreeWidget.prototype.initData = function () {
            if (this.options.data) {
                this.doLoadData(this.options.data, null);
            }
            else {
                var dataUrl = this.getDataUrlInfo(null);
                if (dataUrl) {
                    this.doLoadDataFromUrl(null, null, null);
                }
                else {
                    this.doLoadData([], null);
                }
            }
        };
        JqTreeWidget.prototype.getDataUrlInfo = function (node) {
            var _this = this;
            var dataUrl = this.options.dataUrl || this.element.data("url");
            var getUrlFromString = function (url) {
                var urlInfo = { url: url };
                setUrlInfoData(urlInfo);
                return urlInfo;
            };
            var setUrlInfoData = function (urlInfo) {
                if (node === null || node === void 0 ? void 0 : node.id) {
                    // Load on demand of a subtree; add node parameter
                    var data = { node: node.id };
                    urlInfo["data"] = data;
                }
                else {
                    // Add selected_node parameter
                    var selectedNodeId = _this.getNodeIdToBeSelected();
                    if (selectedNodeId) {
                        var data = { selected_node: selectedNodeId };
                        urlInfo["data"] = data;
                    }
                }
            };
            if (typeof dataUrl === "function") {
                return dataUrl(node);
            }
            else if (typeof dataUrl === "string") {
                return getUrlFromString(dataUrl);
            }
            else if (dataUrl && typeof dataUrl === "object") {
                setUrlInfoData(dataUrl);
                return dataUrl;
            }
            else {
                return null;
            }
        };
        JqTreeWidget.prototype.getNodeIdToBeSelected = function () {
            if (this.options.saveState) {
                return this.saveStateHandler.getNodeIdToBeSelected();
            }
            else {
                return null;
            }
        };
        JqTreeWidget.prototype.initTree = function (data) {
            var _this = this;
            var doInit = function () {
                if (!_this.isInitialized) {
                    _this.isInitialized = true;
                    _this._triggerEvent("tree.init");
                }
            };
            if (!this.options.nodeClass) {
                return;
            }
            this.tree = new this.options.nodeClass(null, true, this.options.nodeClass);
            this.selectNodeHandler.clear();
            this.tree.loadFromData(data);
            var mustLoadOnDemand = this.setInitialState();
            this._refreshElements(null);
            if (!mustLoadOnDemand) {
                doInit();
            }
            else {
                // Load data on demand and then init the tree
                this.setInitialStateOnDemand(doInit);
            }
        };
        // Set initial state, either by restoring the state or auto-opening nodes
        // result: must load nodes on demand?
        JqTreeWidget.prototype.setInitialState = function () {
            var _this = this;
            var restoreState = function () {
                // result: is state restored, must load on demand?
                if (!_this.options.saveState) {
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
                var maxLevel = _this.getAutoOpenMaxLevel();
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
                        node.is_open = true;
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
        JqTreeWidget.prototype.setInitialStateOnDemand = function (cbFinished) {
            var _this = this;
            var restoreState = function () {
                if (!_this.options.saveState) {
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
                var maxLevel = _this.getAutoOpenMaxLevel();
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
        JqTreeWidget.prototype.getAutoOpenMaxLevel = function () {
            if (this.options.autoOpen === true) {
                return -1;
            }
            else if (typeof this.options.autoOpen === "number") {
                return this.options.autoOpen;
            }
            else if (typeof this.options.autoOpen === "string") {
                return parseInt(this.options.autoOpen, 10);
            }
            else {
                return 0;
            }
        };
        JqTreeWidget.prototype.getClickTarget = function (element) {
            var $target = jQuery$2(element);
            var $button = $target.closest(".jqtree-toggler");
            if ($button.length) {
                var node = this.getNode($button);
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
                    var node = this.getNode($el);
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
        JqTreeWidget.prototype.getNode = function ($element) {
            var $li = $element.closest("li.jqtree_common");
            if ($li.length === 0) {
                return null;
            }
            else {
                return $li.data("node");
            }
        };
        JqTreeWidget.prototype.saveState = function () {
            if (this.options.saveState) {
                this.saveStateHandler.saveState();
            }
        };
        JqTreeWidget.prototype.selectCurrentNode = function (mustSetFocus) {
            var node = this.getSelectedNode();
            if (node) {
                var nodeElement = this._getNodeElementForNode(node);
                if (nodeElement) {
                    nodeElement.select(mustSetFocus);
                }
            }
        };
        JqTreeWidget.prototype.deselectCurrentNode = function () {
            var node = this.getSelectedNode();
            if (node) {
                this.removeFromSelection(node);
            }
        };
        JqTreeWidget.prototype.getDefaultClosedIcon = function () {
            if (this.options.rtl) {
                // triangle to the left
                return "&#x25c0;";
            }
            else {
                // triangle to the right
                return "&#x25ba;";
            }
        };
        JqTreeWidget.prototype.getRtlOption = function () {
            if (this.options.rtl != null) {
                return this.options.rtl;
            }
            else {
                var dataRtl = this.element.data("rtl");
                if (dataRtl !== null &&
                    dataRtl !== false &&
                    dataRtl !== undefined) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        JqTreeWidget.prototype.doSelectNode = function (node, optionsParam) {
            var _this = this;
            var saveState = function () {
                if (_this.options.saveState) {
                    _this.saveStateHandler.saveState();
                }
            };
            if (!node) {
                // Called with empty node -> deselect current node
                this.deselectCurrentNode();
                saveState();
                return;
            }
            var defaultOptions = { mustSetFocus: true, mustToggle: true };
            var selectOptions = __assign(__assign({}, defaultOptions), (optionsParam || {}));
            var canSelect = function () {
                if (_this.options.onCanSelectNode) {
                    return (_this.options.selectable === true &&
                        _this.options.onCanSelectNode(node));
                }
                else {
                    return _this.options.selectable === true;
                }
            };
            var openParents = function () {
                var parent = node.parent;
                if (parent && parent.parent && !parent.is_open) {
                    _this.openNode(parent, false);
                }
            };
            if (!canSelect()) {
                return;
            }
            if (this.selectNodeHandler.isNodeSelected(node)) {
                if (selectOptions.mustToggle) {
                    this.deselectCurrentNode();
                    this._triggerEvent("tree.select", {
                        node: null,
                        previous_node: node
                    });
                }
            }
            else {
                var deselectedNode = this.getSelectedNode() || null;
                this.deselectCurrentNode();
                this.addToSelection(node, selectOptions.mustSetFocus);
                this._triggerEvent("tree.select", {
                    node: node,
                    deselected_node: deselectedNode
                });
                openParents();
            }
            saveState();
        };
        JqTreeWidget.prototype.doLoadData = function (data, parentNode) {
            if (!data) {
                return;
            }
            else {
                this._triggerEvent("tree.load_data", { tree_data: data });
                if (parentNode) {
                    this.deselectNodes(parentNode);
                    this.loadSubtree(data, parentNode);
                }
                else {
                    this.initTree(data);
                }
                if (this.isDragging()) {
                    this.dndHandler.refresh();
                }
            }
        };
        JqTreeWidget.prototype.deselectNodes = function (parentNode) {
            var selectedNodesUnderParent = this.selectNodeHandler.getSelectedNodesUnder(parentNode);
            for (var _i = 0, selectedNodesUnderParent_1 = selectedNodesUnderParent; _i < selectedNodesUnderParent_1.length; _i++) {
                var n = selectedNodesUnderParent_1[_i];
                this.selectNodeHandler.removeFromSelection(n);
            }
        };
        JqTreeWidget.prototype.loadSubtree = function (data, parentNode) {
            parentNode.loadFromData(data);
            parentNode.load_on_demand = false;
            parentNode.is_loading = false;
            this._refreshElements(parentNode);
        };
        JqTreeWidget.prototype.doLoadDataFromUrl = function (urlInfoParam, parentNode, onFinished) {
            var urlInfo = urlInfoParam || this.getDataUrlInfo(parentNode);
            this.dataLoader.loadFromUrl(urlInfo, parentNode, onFinished);
        };
        JqTreeWidget.prototype.loadFolderOnDemand = function (node, slide, onFinished) {
            var _this = this;
            if (slide === void 0) { slide = true; }
            node.is_loading = true;
            this.doLoadDataFromUrl(null, node, function () {
                _this._openNode(node, slide, onFinished);
            });
        };
        JqTreeWidget.defaults = {
            animationSpeed: "fast",
            autoEscape: true,
            autoOpen: false,
            buttonLeft: true,
            // The symbol to use for a closed node - ► BLACK RIGHT-POINTING POINTER
            // http://www.fileformat.info/info/unicode/char/25ba/index.htm
            closedIcon: undefined,
            data: undefined,
            dataFilter: undefined,
            dataUrl: undefined,
            dragAndDrop: false,
            keyboardSupport: true,
            nodeClass: Node,
            onCanMove: undefined,
            onCanMoveTo: undefined,
            onCanSelectNode: undefined,
            onCreateLi: undefined,
            onDragMove: undefined,
            onDragStop: undefined,
            onGetStateFromStorage: undefined,
            onIsMoveHandle: undefined,
            onLoadFailed: undefined,
            onLoading: undefined,
            onSetStateFromStorage: undefined,
            openedIcon: "&#x25bc;",
            openFolderDelay: 500,
            // The symbol to use for an open node - ▼ BLACK DOWN-POINTING TRIANGLE
            // http://www.fileformat.info/info/unicode/char/25bc/index.htm
            rtl: undefined,
            saveState: false,
            selectable: true,
            showEmptyFolder: false,
            slide: true,
            startDndDelay: 300,
            tabIndex: 0,
            useContextMenu: true
        };
        return JqTreeWidget;
    }(MouseWidget));
    SimpleWidget.register(JqTreeWidget, "tree");

    exports.JqTreeWidget = JqTreeWidget;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, jQuery));
//# sourceMappingURL=tree.jquery.debug.js.map
