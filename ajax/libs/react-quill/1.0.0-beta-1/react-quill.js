(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("react-dom/server"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "react-dom/server"], factory);
	else if(typeof exports === 'object')
		exports["ReactQuill"] = factory(require("react"), require("react-dom"), require("react-dom/server"));
	else
		root["ReactQuill"] = factory(root["React"], root["ReactDOM"], root["ReactDOMServer"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_138__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	/*
	React-Quill v1.0.0
	https://github.com/zenoamaro/react-quill
	*/
	var Quill = __webpack_require__(/*! quill */ 1)
	var Parchment = Quill.import('parchment');
	var QuillStyle = Parchment.Attributor.Style;
	var styleOptions = { scope: Parchment.Scope.INLINE };
	Quill.register(new QuillStyle('size', 'font-size', styleOptions), true);
	Quill.register(new QuillStyle('font', 'font-family', styleOptions), true);
	
	module.exports.Quill = Quill;
	module.exports = __webpack_require__(/*! ./component */ 2);
	module.exports.Mixin = __webpack_require__(/*! ./mixin */ 5);
	module.exports.Toolbar = __webpack_require__(/*! ./toolbar */ 137);


/***/ },
/* 1 */
/*!*******************************!*\
  !*** ./~/quill/dist/quill.js ***!
  \*******************************/
/***/ function(module, exports) {

	/*!
	 * Quill Editor v1.2.0
	 * https://quilljs.com/
	 * Copyright (c) 2014, Jason Chen
	 * Copyright (c) 2013, salesforce.com
	 */
	(function webpackUniversalModuleDefinition(root, factory) {
		if(typeof exports === 'object' && typeof module === 'object')
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Quill"] = factory();
		else
			root["Quill"] = factory();
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
	
		module.exports = __webpack_require__(53);
	
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _quill = __webpack_require__(18);
	
		var _quill2 = _interopRequireDefault(_quill);
	
		var _block = __webpack_require__(29);
	
		var _block2 = _interopRequireDefault(_block);
	
		var _break = __webpack_require__(30);
	
		var _break2 = _interopRequireDefault(_break);
	
		var _container = __webpack_require__(42);
	
		var _container2 = _interopRequireDefault(_container);
	
		var _cursor = __webpack_require__(34);
	
		var _cursor2 = _interopRequireDefault(_cursor);
	
		var _embed = __webpack_require__(31);
	
		var _embed2 = _interopRequireDefault(_embed);
	
		var _inline = __webpack_require__(32);
	
		var _inline2 = _interopRequireDefault(_inline);
	
		var _scroll = __webpack_require__(43);
	
		var _scroll2 = _interopRequireDefault(_scroll);
	
		var _text = __webpack_require__(33);
	
		var _text2 = _interopRequireDefault(_text);
	
		var _clipboard = __webpack_require__(44);
	
		var _clipboard2 = _interopRequireDefault(_clipboard);
	
		var _history = __webpack_require__(51);
	
		var _history2 = _interopRequireDefault(_history);
	
		var _keyboard = __webpack_require__(52);
	
		var _keyboard2 = _interopRequireDefault(_keyboard);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		_quill2.default.register({
		  'blots/block': _block2.default,
		  'blots/block/embed': _block.BlockEmbed,
		  'blots/break': _break2.default,
		  'blots/container': _container2.default,
		  'blots/cursor': _cursor2.default,
		  'blots/embed': _embed2.default,
		  'blots/inline': _inline2.default,
		  'blots/scroll': _scroll2.default,
		  'blots/text': _text2.default,
	
		  'modules/clipboard': _clipboard2.default,
		  'modules/history': _history2.default,
		  'modules/keyboard': _keyboard2.default
		});
	
		_parchment2.default.register(_block2.default, _break2.default, _cursor2.default, _inline2.default, _scroll2.default, _text2.default);
	
		module.exports = _quill2.default;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var container_1 = __webpack_require__(3);
		var format_1 = __webpack_require__(7);
		var leaf_1 = __webpack_require__(12);
		var scroll_1 = __webpack_require__(13);
		var inline_1 = __webpack_require__(14);
		var block_1 = __webpack_require__(15);
		var embed_1 = __webpack_require__(16);
		var text_1 = __webpack_require__(17);
		var attributor_1 = __webpack_require__(8);
		var class_1 = __webpack_require__(10);
		var style_1 = __webpack_require__(11);
		var store_1 = __webpack_require__(9);
		var Registry = __webpack_require__(6);
		var Parchment = {
		    Scope: Registry.Scope,
		    create: Registry.create,
		    find: Registry.find,
		    query: Registry.query,
		    register: Registry.register,
		    Container: container_1.default,
		    Format: format_1.default,
		    Leaf: leaf_1.default,
		    Embed: embed_1.default,
		    Scroll: scroll_1.default,
		    Block: block_1.default,
		    Inline: inline_1.default,
		    Text: text_1.default,
		    Attributor: {
		        Attribute: attributor_1.default,
		        Class: class_1.default,
		        Style: style_1.default,
		        Store: store_1.default
		    }
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = Parchment;
	
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var linked_list_1 = __webpack_require__(4);
		var shadow_1 = __webpack_require__(5);
		var Registry = __webpack_require__(6);
		var ContainerBlot = (function (_super) {
		    __extends(ContainerBlot, _super);
		    function ContainerBlot() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    ContainerBlot.prototype.appendChild = function (other) {
		        this.insertBefore(other);
		    };
		    ContainerBlot.prototype.attach = function () {
		        var _this = this;
		        _super.prototype.attach.call(this);
		        this.children = new linked_list_1.default();
		        // Need to be reversed for if DOM nodes already in order
		        [].slice.call(this.domNode.childNodes).reverse().forEach(function (node) {
		            try {
		                var child = makeBlot(node);
		                _this.insertBefore(child, _this.children.head);
		            }
		            catch (err) {
		                if (err instanceof Registry.ParchmentError)
		                    return;
		                else
		                    throw err;
		            }
		        });
		    };
		    ContainerBlot.prototype.deleteAt = function (index, length) {
		        if (index === 0 && length === this.length()) {
		            return this.remove();
		        }
		        this.children.forEachAt(index, length, function (child, offset, length) {
		            child.deleteAt(offset, length);
		        });
		    };
		    ContainerBlot.prototype.descendant = function (criteria, index) {
		        var _a = this.children.find(index), child = _a[0], offset = _a[1];
		        if ((criteria.blotName == null && criteria(child)) ||
		            (criteria.blotName != null && child instanceof criteria)) {
		            return [child, offset];
		        }
		        else if (child instanceof ContainerBlot) {
		            return child.descendant(criteria, offset);
		        }
		        else {
		            return [null, -1];
		        }
		    };
		    ContainerBlot.prototype.descendants = function (criteria, index, length) {
		        if (index === void 0) { index = 0; }
		        if (length === void 0) { length = Number.MAX_VALUE; }
		        var descendants = [], lengthLeft = length;
		        this.children.forEachAt(index, length, function (child, index, length) {
		            if ((criteria.blotName == null && criteria(child)) ||
		                (criteria.blotName != null && child instanceof criteria)) {
		                descendants.push(child);
		            }
		            if (child instanceof ContainerBlot) {
		                descendants = descendants.concat(child.descendants(criteria, index, lengthLeft));
		            }
		            lengthLeft -= length;
		        });
		        return descendants;
		    };
		    ContainerBlot.prototype.detach = function () {
		        this.children.forEach(function (child) {
		            child.detach();
		        });
		        _super.prototype.detach.call(this);
		    };
		    ContainerBlot.prototype.formatAt = function (index, length, name, value) {
		        this.children.forEachAt(index, length, function (child, offset, length) {
		            child.formatAt(offset, length, name, value);
		        });
		    };
		    ContainerBlot.prototype.insertAt = function (index, value, def) {
		        var _a = this.children.find(index), child = _a[0], offset = _a[1];
		        if (child) {
		            child.insertAt(offset, value, def);
		        }
		        else {
		            var blot = (def == null) ? Registry.create('text', value) : Registry.create(value, def);
		            this.appendChild(blot);
		        }
		    };
		    ContainerBlot.prototype.insertBefore = function (childBlot, refBlot) {
		        if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function (child) {
		            return childBlot instanceof child;
		        })) {
		            throw new Registry.ParchmentError("Cannot insert " + childBlot.statics.blotName + " into " + this.statics.blotName);
		        }
		        childBlot.insertInto(this, refBlot);
		    };
		    ContainerBlot.prototype.length = function () {
		        return this.children.reduce(function (memo, child) {
		            return memo + child.length();
		        }, 0);
		    };
		    ContainerBlot.prototype.moveChildren = function (targetParent, refNode) {
		        this.children.forEach(function (child) {
		            targetParent.insertBefore(child, refNode);
		        });
		    };
		    ContainerBlot.prototype.optimize = function () {
		        _super.prototype.optimize.call(this);
		        if (this.children.length === 0) {
		            if (this.statics.defaultChild != null) {
		                var child = Registry.create(this.statics.defaultChild);
		                this.appendChild(child);
		                child.optimize();
		            }
		            else {
		                this.remove();
		            }
		        }
		    };
		    ContainerBlot.prototype.path = function (index, inclusive) {
		        if (inclusive === void 0) { inclusive = false; }
		        var _a = this.children.find(index, inclusive), child = _a[0], offset = _a[1];
		        var position = [[this, index]];
		        if (child instanceof ContainerBlot) {
		            return position.concat(child.path(offset, inclusive));
		        }
		        else if (child != null) {
		            position.push([child, offset]);
		        }
		        return position;
		    };
		    ContainerBlot.prototype.removeChild = function (child) {
		        this.children.remove(child);
		    };
		    ContainerBlot.prototype.replace = function (target) {
		        if (target instanceof ContainerBlot) {
		            target.moveChildren(this);
		        }
		        _super.prototype.replace.call(this, target);
		    };
		    ContainerBlot.prototype.split = function (index, force) {
		        if (force === void 0) { force = false; }
		        if (!force) {
		            if (index === 0)
		                return this;
		            if (index === this.length())
		                return this.next;
		        }
		        var after = this.clone();
		        this.parent.insertBefore(after, this.next);
		        this.children.forEachAt(index, this.length(), function (child, offset, length) {
		            child = child.split(offset, force);
		            after.appendChild(child);
		        });
		        return after;
		    };
		    ContainerBlot.prototype.unwrap = function () {
		        this.moveChildren(this.parent, this.next);
		        this.remove();
		    };
		    ContainerBlot.prototype.update = function (mutations) {
		        var _this = this;
		        var addedNodes = [], removedNodes = [];
		        mutations.forEach(function (mutation) {
		            if (mutation.target === _this.domNode && mutation.type === 'childList') {
		                addedNodes.push.apply(addedNodes, mutation.addedNodes);
		                removedNodes.push.apply(removedNodes, mutation.removedNodes);
		            }
		        });
		        removedNodes.forEach(function (node) {
		            // Check node has actually been removed
		            // One exception is Chrome does not immediately remove IFRAMEs
		            // from DOM but MutationRecord is correct in its reported removal
		            if (node.parentNode != null && node.tagName !== 'IFRAME' &&
		                (document.body.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
		                return;
		            }
		            var blot = Registry.find(node);
		            if (blot == null)
		                return;
		            if (blot.domNode.parentNode == null || blot.domNode.parentNode === _this.domNode) {
		                blot.detach();
		            }
		        });
		        addedNodes.filter(function (node) {
		            return node.parentNode == _this.domNode;
		        }).sort(function (a, b) {
		            if (a === b)
		                return 0;
		            if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) {
		                return 1;
		            }
		            return -1;
		        }).forEach(function (node) {
		            var refBlot = null;
		            if (node.nextSibling != null) {
		                refBlot = Registry.find(node.nextSibling);
		            }
		            var blot = makeBlot(node);
		            if (blot.next != refBlot || blot.next == null) {
		                if (blot.parent != null) {
		                    blot.parent.removeChild(_this);
		                }
		                _this.insertBefore(blot, refBlot);
		            }
		        });
		    };
		    return ContainerBlot;
		}(shadow_1.default));
		function makeBlot(node) {
		    var blot = Registry.find(node);
		    if (blot == null) {
		        try {
		            blot = Registry.create(node);
		        }
		        catch (e) {
		            blot = Registry.create(Registry.Scope.INLINE);
		            [].slice.call(node.childNodes).forEach(function (child) {
		                blot.domNode.appendChild(child);
		            });
		            node.parentNode.replaceChild(blot.domNode, node);
		            blot.attach();
		        }
		    }
		    return blot;
		}
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = ContainerBlot;
	
	
	/***/ },
	/* 4 */
	/***/ function(module, exports) {
	
		"use strict";
		var LinkedList = (function () {
		    function LinkedList() {
		        this.head = this.tail = undefined;
		        this.length = 0;
		    }
		    LinkedList.prototype.append = function () {
		        var nodes = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            nodes[_i] = arguments[_i];
		        }
		        this.insertBefore(nodes[0], undefined);
		        if (nodes.length > 1) {
		            this.append.apply(this, nodes.slice(1));
		        }
		    };
		    LinkedList.prototype.contains = function (node) {
		        var cur, next = this.iterator();
		        while (cur = next()) {
		            if (cur === node)
		                return true;
		        }
		        return false;
		    };
		    LinkedList.prototype.insertBefore = function (node, refNode) {
		        node.next = refNode;
		        if (refNode != null) {
		            node.prev = refNode.prev;
		            if (refNode.prev != null) {
		                refNode.prev.next = node;
		            }
		            refNode.prev = node;
		            if (refNode === this.head) {
		                this.head = node;
		            }
		        }
		        else if (this.tail != null) {
		            this.tail.next = node;
		            node.prev = this.tail;
		            this.tail = node;
		        }
		        else {
		            node.prev = undefined;
		            this.head = this.tail = node;
		        }
		        this.length += 1;
		    };
		    LinkedList.prototype.offset = function (target) {
		        var index = 0, cur = this.head;
		        while (cur != null) {
		            if (cur === target)
		                return index;
		            index += cur.length();
		            cur = cur.next;
		        }
		        return -1;
		    };
		    LinkedList.prototype.remove = function (node) {
		        if (!this.contains(node))
		            return;
		        if (node.prev != null)
		            node.prev.next = node.next;
		        if (node.next != null)
		            node.next.prev = node.prev;
		        if (node === this.head)
		            this.head = node.next;
		        if (node === this.tail)
		            this.tail = node.prev;
		        this.length -= 1;
		    };
		    LinkedList.prototype.iterator = function (curNode) {
		        if (curNode === void 0) { curNode = this.head; }
		        // TODO use yield when we can
		        return function () {
		            var ret = curNode;
		            if (curNode != null)
		                curNode = curNode.next;
		            return ret;
		        };
		    };
		    LinkedList.prototype.find = function (index, inclusive) {
		        if (inclusive === void 0) { inclusive = false; }
		        var cur, next = this.iterator();
		        while (cur = next()) {
		            var length_1 = cur.length();
		            if (index < length_1 || (inclusive && index === length_1 && (cur.next == null || cur.next.length() !== 0))) {
		                return [cur, index];
		            }
		            index -= length_1;
		        }
		        return [null, 0];
		    };
		    LinkedList.prototype.forEach = function (callback) {
		        var cur, next = this.iterator();
		        while (cur = next()) {
		            callback(cur);
		        }
		    };
		    LinkedList.prototype.forEachAt = function (index, length, callback) {
		        if (length <= 0)
		            return;
		        var _a = this.find(index), startNode = _a[0], offset = _a[1];
		        var cur, curIndex = index - offset, next = this.iterator(startNode);
		        while ((cur = next()) && curIndex < index + length) {
		            var curLength = cur.length();
		            if (index > curIndex) {
		                callback(cur, index - curIndex, Math.min(length, curIndex + curLength - index));
		            }
		            else {
		                callback(cur, 0, Math.min(curLength, index + length - curIndex));
		            }
		            curIndex += curLength;
		        }
		    };
		    LinkedList.prototype.map = function (callback) {
		        return this.reduce(function (memo, cur) {
		            memo.push(callback(cur));
		            return memo;
		        }, []);
		    };
		    LinkedList.prototype.reduce = function (callback, memo) {
		        var cur, next = this.iterator();
		        while (cur = next()) {
		            memo = callback(memo, cur);
		        }
		        return memo;
		    };
		    return LinkedList;
		}());
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = LinkedList;
	
	
	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var Registry = __webpack_require__(6);
		var ShadowBlot = (function () {
		    function ShadowBlot(domNode) {
		        this.domNode = domNode;
		        this.attach();
		    }
		    Object.defineProperty(ShadowBlot.prototype, "statics", {
		        // Hack for accessing inherited static methods
		        get: function () {
		            return this.constructor;
		        },
		        enumerable: true,
		        configurable: true
		    });
		    ShadowBlot.create = function (value) {
		        if (this.tagName == null) {
		            throw new Registry.ParchmentError('Blot definition missing tagName');
		        }
		        var node;
		        if (Array.isArray(this.tagName)) {
		            if (typeof value === 'string') {
		                value = value.toUpperCase();
		                if (parseInt(value).toString() === value) {
		                    value = parseInt(value);
		                }
		            }
		            if (typeof value === 'number') {
		                node = document.createElement(this.tagName[value - 1]);
		            }
		            else if (this.tagName.indexOf(value) > -1) {
		                node = document.createElement(value);
		            }
		            else {
		                node = document.createElement(this.tagName[0]);
		            }
		        }
		        else {
		            node = document.createElement(this.tagName);
		        }
		        if (this.className) {
		            node.classList.add(this.className);
		        }
		        return node;
		    };
		    ShadowBlot.prototype.attach = function () {
		        this.domNode[Registry.DATA_KEY] = { blot: this };
		    };
		    ShadowBlot.prototype.clone = function () {
		        var domNode = this.domNode.cloneNode();
		        return Registry.create(domNode);
		    };
		    ShadowBlot.prototype.detach = function () {
		        if (this.parent != null)
		            this.parent.removeChild(this);
		        delete this.domNode[Registry.DATA_KEY];
		    };
		    ShadowBlot.prototype.deleteAt = function (index, length) {
		        var blot = this.isolate(index, length);
		        blot.remove();
		    };
		    ShadowBlot.prototype.formatAt = function (index, length, name, value) {
		        var blot = this.isolate(index, length);
		        if (Registry.query(name, Registry.Scope.BLOT) != null && value) {
		            blot.wrap(name, value);
		        }
		        else if (Registry.query(name, Registry.Scope.ATTRIBUTE) != null) {
		            var parent_1 = Registry.create(this.statics.scope);
		            blot.wrap(parent_1);
		            parent_1.format(name, value);
		        }
		    };
		    ShadowBlot.prototype.insertAt = function (index, value, def) {
		        var blot = (def == null) ? Registry.create('text', value) : Registry.create(value, def);
		        var ref = this.split(index);
		        this.parent.insertBefore(blot, ref);
		    };
		    ShadowBlot.prototype.insertInto = function (parentBlot, refBlot) {
		        if (this.parent != null) {
		            this.parent.children.remove(this);
		        }
		        parentBlot.children.insertBefore(this, refBlot);
		        if (refBlot != null) {
		            var refDomNode = refBlot.domNode;
		        }
		        if (this.next == null || this.domNode.nextSibling != refDomNode) {
		            parentBlot.domNode.insertBefore(this.domNode, (typeof refDomNode !== 'undefined') ? refDomNode : null);
		        }
		        this.parent = parentBlot;
		    };
		    ShadowBlot.prototype.isolate = function (index, length) {
		        var target = this.split(index);
		        target.split(length);
		        return target;
		    };
		    ShadowBlot.prototype.length = function () {
		        return 1;
		    };
		    ;
		    ShadowBlot.prototype.offset = function (root) {
		        if (root === void 0) { root = this.parent; }
		        if (this.parent == null || this == root)
		            return 0;
		        return this.parent.children.offset(this) + this.parent.offset(root);
		    };
		    ShadowBlot.prototype.optimize = function () {
		        // TODO clean up once we use WeakMap
		        if (this.domNode[Registry.DATA_KEY] != null) {
		            delete this.domNode[Registry.DATA_KEY].mutations;
		        }
		    };
		    ShadowBlot.prototype.remove = function () {
		        if (this.domNode.parentNode != null) {
		            this.domNode.parentNode.removeChild(this.domNode);
		        }
		        this.detach();
		    };
		    ShadowBlot.prototype.replace = function (target) {
		        if (target.parent == null)
		            return;
		        target.parent.insertBefore(this, target.next);
		        target.remove();
		    };
		    ShadowBlot.prototype.replaceWith = function (name, value) {
		        var replacement = typeof name === 'string' ? Registry.create(name, value) : name;
		        replacement.replace(this);
		        return replacement;
		    };
		    ShadowBlot.prototype.split = function (index, force) {
		        return index === 0 ? this : this.next;
		    };
		    ShadowBlot.prototype.update = function (mutations) {
		        if (mutations === void 0) { mutations = []; }
		        // Nothing to do by default
		    };
		    ShadowBlot.prototype.wrap = function (name, value) {
		        var wrapper = typeof name === 'string' ? Registry.create(name, value) : name;
		        if (this.parent != null) {
		            this.parent.insertBefore(wrapper, this.next);
		        }
		        wrapper.appendChild(this);
		        return wrapper;
		    };
		    return ShadowBlot;
		}());
		ShadowBlot.blotName = 'abstract';
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = ShadowBlot;
	
	
	/***/ },
	/* 6 */
	/***/ function(module, exports) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var ParchmentError = (function (_super) {
		    __extends(ParchmentError, _super);
		    function ParchmentError(message) {
		        var _this = this;
		        message = '[Parchment] ' + message;
		        _this = _super.call(this, message) || this;
		        _this.message = message;
		        _this.name = _this.constructor.name;
		        return _this;
		    }
		    return ParchmentError;
		}(Error));
		exports.ParchmentError = ParchmentError;
		var attributes = {};
		var classes = {};
		var tags = {};
		var types = {};
		exports.DATA_KEY = '__blot';
		var Scope;
		(function (Scope) {
		    Scope[Scope["TYPE"] = 3] = "TYPE";
		    Scope[Scope["LEVEL"] = 12] = "LEVEL";
		    Scope[Scope["ATTRIBUTE"] = 13] = "ATTRIBUTE";
		    Scope[Scope["BLOT"] = 14] = "BLOT";
		    Scope[Scope["INLINE"] = 7] = "INLINE";
		    Scope[Scope["BLOCK"] = 11] = "BLOCK";
		    Scope[Scope["BLOCK_BLOT"] = 10] = "BLOCK_BLOT";
		    Scope[Scope["INLINE_BLOT"] = 6] = "INLINE_BLOT";
		    Scope[Scope["BLOCK_ATTRIBUTE"] = 9] = "BLOCK_ATTRIBUTE";
		    Scope[Scope["INLINE_ATTRIBUTE"] = 5] = "INLINE_ATTRIBUTE";
		    Scope[Scope["ANY"] = 15] = "ANY";
		})(Scope = exports.Scope || (exports.Scope = {}));
		;
		function create(input, value) {
		    var match = query(input);
		    if (match == null) {
		        throw new ParchmentError("Unable to create " + input + " blot");
		    }
		    var BlotClass = match;
		    var node = input instanceof Node ? input : BlotClass.create(value);
		    return new BlotClass(node, value);
		}
		exports.create = create;
		function find(node, bubble) {
		    if (bubble === void 0) { bubble = false; }
		    if (node == null)
		        return null;
		    if (node[exports.DATA_KEY] != null)
		        return node[exports.DATA_KEY].blot;
		    if (bubble)
		        return find(node.parentNode, bubble);
		    return null;
		}
		exports.find = find;
		function query(query, scope) {
		    if (scope === void 0) { scope = Scope.ANY; }
		    var match;
		    if (typeof query === 'string') {
		        match = types[query] || attributes[query];
		    }
		    else if (query instanceof Text) {
		        match = types['text'];
		    }
		    else if (typeof query === 'number') {
		        if (query & Scope.LEVEL & Scope.BLOCK) {
		            match = types['block'];
		        }
		        else if (query & Scope.LEVEL & Scope.INLINE) {
		            match = types['inline'];
		        }
		    }
		    else if (query instanceof HTMLElement) {
		        var names = (query.getAttribute('class') || '').split(/\s+/);
		        for (var i in names) {
		            match = classes[names[i]];
		            if (match)
		                break;
		        }
		        match = match || tags[query.tagName];
		    }
		    if (match == null)
		        return null;
		    if ((scope & Scope.LEVEL & match.scope) && (scope & Scope.TYPE & match.scope))
		        return match;
		    return null;
		}
		exports.query = query;
		function register() {
		    var Definitions = [];
		    for (var _i = 0; _i < arguments.length; _i++) {
		        Definitions[_i] = arguments[_i];
		    }
		    if (Definitions.length > 1) {
		        return Definitions.map(function (d) {
		            return register(d);
		        });
		    }
		    var Definition = Definitions[0];
		    if (typeof Definition.blotName !== 'string' && typeof Definition.attrName !== 'string') {
		        throw new ParchmentError('Invalid definition');
		    }
		    else if (Definition.blotName === 'abstract') {
		        throw new ParchmentError('Cannot register abstract class');
		    }
		    types[Definition.blotName || Definition.attrName] = Definition;
		    if (typeof Definition.keyName === 'string') {
		        attributes[Definition.keyName] = Definition;
		    }
		    else {
		        if (Definition.className != null) {
		            classes[Definition.className] = Definition;
		        }
		        if (Definition.tagName != null) {
		            if (Array.isArray(Definition.tagName)) {
		                Definition.tagName = Definition.tagName.map(function (tagName) {
		                    return tagName.toUpperCase();
		                });
		            }
		            else {
		                Definition.tagName = Definition.tagName.toUpperCase();
		            }
		            var tagNames = Array.isArray(Definition.tagName) ? Definition.tagName : [Definition.tagName];
		            tagNames.forEach(function (tag) {
		                if (tags[tag] == null || Definition.className == null) {
		                    tags[tag] = Definition;
		                }
		            });
		        }
		    }
		    return Definition;
		}
		exports.register = register;
	
	
	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var attributor_1 = __webpack_require__(8);
		var store_1 = __webpack_require__(9);
		var container_1 = __webpack_require__(3);
		var Registry = __webpack_require__(6);
		var FormatBlot = (function (_super) {
		    __extends(FormatBlot, _super);
		    function FormatBlot() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    FormatBlot.formats = function (domNode) {
		        if (typeof this.tagName === 'string') {
		            return true;
		        }
		        else if (Array.isArray(this.tagName)) {
		            return domNode.tagName.toLowerCase();
		        }
		        return undefined;
		    };
		    FormatBlot.prototype.attach = function () {
		        _super.prototype.attach.call(this);
		        this.attributes = new store_1.default(this.domNode);
		    };
		    FormatBlot.prototype.format = function (name, value) {
		        var format = Registry.query(name);
		        if (format instanceof attributor_1.default) {
		            this.attributes.attribute(format, value);
		        }
		        else if (value) {
		            if (format != null && (name !== this.statics.blotName || this.formats()[name] !== value)) {
		                this.replaceWith(name, value);
		            }
		        }
		    };
		    FormatBlot.prototype.formats = function () {
		        var formats = this.attributes.values();
		        var format = this.statics.formats(this.domNode);
		        if (format != null) {
		            formats[this.statics.blotName] = format;
		        }
		        return formats;
		    };
		    FormatBlot.prototype.replaceWith = function (name, value) {
		        var replacement = _super.prototype.replaceWith.call(this, name, value);
		        this.attributes.copy(replacement);
		        return replacement;
		    };
		    FormatBlot.prototype.update = function (mutations) {
		        var _this = this;
		        _super.prototype.update.call(this, mutations);
		        if (mutations.some(function (mutation) {
		            return mutation.target === _this.domNode && mutation.type === 'attributes';
		        })) {
		            this.attributes.build();
		        }
		    };
		    FormatBlot.prototype.wrap = function (name, value) {
		        var wrapper = _super.prototype.wrap.call(this, name, value);
		        if (wrapper instanceof FormatBlot && wrapper.statics.scope === this.statics.scope) {
		            this.attributes.move(wrapper);
		        }
		        return wrapper;
		    };
		    return FormatBlot;
		}(container_1.default));
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = FormatBlot;
	
	
	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var Registry = __webpack_require__(6);
		var Attributor = (function () {
		    function Attributor(attrName, keyName, options) {
		        if (options === void 0) { options = {}; }
		        this.attrName = attrName;
		        this.keyName = keyName;
		        var attributeBit = Registry.Scope.TYPE & Registry.Scope.ATTRIBUTE;
		        if (options.scope != null) {
		            // Ignore type bits, force attribute bit
		            this.scope = (options.scope & Registry.Scope.LEVEL) | attributeBit;
		        }
		        else {
		            this.scope = Registry.Scope.ATTRIBUTE;
		        }
		        if (options.whitelist != null)
		            this.whitelist = options.whitelist;
		    }
		    Attributor.keys = function (node) {
		        return [].map.call(node.attributes, function (item) {
		            return item.name;
		        });
		    };
		    Attributor.prototype.add = function (node, value) {
		        if (!this.canAdd(node, value))
		            return false;
		        node.setAttribute(this.keyName, value);
		        return true;
		    };
		    Attributor.prototype.canAdd = function (node, value) {
		        var match = Registry.query(node, Registry.Scope.BLOT & (this.scope | Registry.Scope.TYPE));
		        if (match != null && (this.whitelist == null || this.whitelist.indexOf(value) > -1)) {
		            return true;
		        }
		        return false;
		    };
		    Attributor.prototype.remove = function (node) {
		        node.removeAttribute(this.keyName);
		    };
		    Attributor.prototype.value = function (node) {
		        var value = node.getAttribute(this.keyName);
		        return this.canAdd(node, value) ? value : '';
		    };
		    return Attributor;
		}());
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = Attributor;
	
	
	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var attributor_1 = __webpack_require__(8);
		var class_1 = __webpack_require__(10);
		var style_1 = __webpack_require__(11);
		var Registry = __webpack_require__(6);
		var AttributorStore = (function () {
		    function AttributorStore(domNode) {
		        this.attributes = {};
		        this.domNode = domNode;
		        this.build();
		    }
		    AttributorStore.prototype.attribute = function (attribute, value) {
		        if (value) {
		            if (attribute.add(this.domNode, value)) {
		                if (attribute.value(this.domNode) != null) {
		                    this.attributes[attribute.attrName] = attribute;
		                }
		                else {
		                    delete this.attributes[attribute.attrName];
		                }
		            }
		        }
		        else {
		            attribute.remove(this.domNode);
		            delete this.attributes[attribute.attrName];
		        }
		    };
		    AttributorStore.prototype.build = function () {
		        var _this = this;
		        this.attributes = {};
		        var attributes = attributor_1.default.keys(this.domNode);
		        var classes = class_1.default.keys(this.domNode);
		        var styles = style_1.default.keys(this.domNode);
		        attributes.concat(classes).concat(styles).forEach(function (name) {
		            var attr = Registry.query(name, Registry.Scope.ATTRIBUTE);
		            if (attr instanceof attributor_1.default) {
		                _this.attributes[attr.attrName] = attr;
		            }
		        });
		    };
		    AttributorStore.prototype.copy = function (target) {
		        var _this = this;
		        Object.keys(this.attributes).forEach(function (key) {
		            var value = _this.attributes[key].value(_this.domNode);
		            target.format(key, value);
		        });
		    };
		    AttributorStore.prototype.move = function (target) {
		        var _this = this;
		        this.copy(target);
		        Object.keys(this.attributes).forEach(function (key) {
		            _this.attributes[key].remove(_this.domNode);
		        });
		        this.attributes = {};
		    };
		    AttributorStore.prototype.values = function () {
		        var _this = this;
		        return Object.keys(this.attributes).reduce(function (attributes, name) {
		            attributes[name] = _this.attributes[name].value(_this.domNode);
		            return attributes;
		        }, {});
		    };
		    return AttributorStore;
		}());
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = AttributorStore;
	
	
	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var attributor_1 = __webpack_require__(8);
		function match(node, prefix) {
		    var className = node.getAttribute('class') || '';
		    return className.split(/\s+/).filter(function (name) {
		        return name.indexOf(prefix + "-") === 0;
		    });
		}
		var ClassAttributor = (function (_super) {
		    __extends(ClassAttributor, _super);
		    function ClassAttributor() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    ClassAttributor.keys = function (node) {
		        return (node.getAttribute('class') || '').split(/\s+/).map(function (name) {
		            return name.split('-').slice(0, -1).join('-');
		        });
		    };
		    ClassAttributor.prototype.add = function (node, value) {
		        if (!this.canAdd(node, value))
		            return false;
		        this.remove(node);
		        node.classList.add(this.keyName + "-" + value);
		        return true;
		    };
		    ClassAttributor.prototype.remove = function (node) {
		        var matches = match(node, this.keyName);
		        matches.forEach(function (name) {
		            node.classList.remove(name);
		        });
		        if (node.classList.length === 0) {
		            node.removeAttribute('class');
		        }
		    };
		    ClassAttributor.prototype.value = function (node) {
		        var result = match(node, this.keyName)[0] || '';
		        var value = result.slice(this.keyName.length + 1); // +1 for hyphen
		        return this.canAdd(node, value) ? value : '';
		    };
		    return ClassAttributor;
		}(attributor_1.default));
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = ClassAttributor;
	
	
	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var attributor_1 = __webpack_require__(8);
		function camelize(name) {
		    var parts = name.split('-');
		    var rest = parts.slice(1).map(function (part) {
		        return part[0].toUpperCase() + part.slice(1);
		    }).join('');
		    return parts[0] + rest;
		}
		var StyleAttributor = (function (_super) {
		    __extends(StyleAttributor, _super);
		    function StyleAttributor() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    StyleAttributor.keys = function (node) {
		        return (node.getAttribute('style') || '').split(';').map(function (value) {
		            var arr = value.split(':');
		            return arr[0].trim();
		        });
		    };
		    StyleAttributor.prototype.add = function (node, value) {
		        if (!this.canAdd(node, value))
		            return false;
		        node.style[camelize(this.keyName)] = value;
		        return true;
		    };
		    StyleAttributor.prototype.remove = function (node) {
		        node.style[camelize(this.keyName)] = '';
		        if (!node.getAttribute('style')) {
		            node.removeAttribute('style');
		        }
		    };
		    StyleAttributor.prototype.value = function (node) {
		        var value = node.style[camelize(this.keyName)];
		        return this.canAdd(node, value) ? value : '';
		    };
		    return StyleAttributor;
		}(attributor_1.default));
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = StyleAttributor;
	
	
	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var shadow_1 = __webpack_require__(5);
		var Registry = __webpack_require__(6);
		var LeafBlot = (function (_super) {
		    __extends(LeafBlot, _super);
		    function LeafBlot() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    LeafBlot.value = function (domNode) {
		        return true;
		    };
		    LeafBlot.prototype.index = function (node, offset) {
		        if (node !== this.domNode)
		            return -1;
		        return Math.min(offset, 1);
		    };
		    LeafBlot.prototype.position = function (index, inclusive) {
		        var offset = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
		        if (index > 0)
		            offset += 1;
		        return [this.parent.domNode, offset];
		    };
		    LeafBlot.prototype.value = function () {
		        return _a = {}, _a[this.statics.blotName] = this.statics.value(this.domNode) || true, _a;
		        var _a;
		    };
		    return LeafBlot;
		}(shadow_1.default));
		LeafBlot.scope = Registry.Scope.INLINE_BLOT;
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = LeafBlot;
	
	
	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var container_1 = __webpack_require__(3);
		var Registry = __webpack_require__(6);
		var OBSERVER_CONFIG = {
		    attributes: true,
		    characterData: true,
		    characterDataOldValue: true,
		    childList: true,
		    subtree: true
		};
		var MAX_OPTIMIZE_ITERATIONS = 100;
		var ScrollBlot = (function (_super) {
		    __extends(ScrollBlot, _super);
		    function ScrollBlot(node) {
		        var _this = _super.call(this, node) || this;
		        _this.parent = null;
		        _this.observer = new MutationObserver(function (mutations) {
		            _this.update(mutations);
		        });
		        _this.observer.observe(_this.domNode, OBSERVER_CONFIG);
		        return _this;
		    }
		    ScrollBlot.prototype.detach = function () {
		        _super.prototype.detach.call(this);
		        this.observer.disconnect();
		    };
		    ScrollBlot.prototype.deleteAt = function (index, length) {
		        this.update();
		        if (index === 0 && length === this.length()) {
		            this.children.forEach(function (child) {
		                child.remove();
		            });
		        }
		        else {
		            _super.prototype.deleteAt.call(this, index, length);
		        }
		    };
		    ScrollBlot.prototype.formatAt = function (index, length, name, value) {
		        this.update();
		        _super.prototype.formatAt.call(this, index, length, name, value);
		    };
		    ScrollBlot.prototype.insertAt = function (index, value, def) {
		        this.update();
		        _super.prototype.insertAt.call(this, index, value, def);
		    };
		    ScrollBlot.prototype.optimize = function (mutations) {
		        var _this = this;
		        if (mutations === void 0) { mutations = []; }
		        _super.prototype.optimize.call(this);
		        // We must modify mutations directly, cannot make copy and then modify
		        var records = [].slice.call(this.observer.takeRecords());
		        // Array.push currently seems to be implemented by a non-tail recursive function
		        // so we cannot just mutations.push.apply(mutations, this.observer.takeRecords());
		        while (records.length > 0)
		            mutations.push(records.pop());
		        // TODO use WeakMap
		        var mark = function (blot, markParent) {
		            if (markParent === void 0) { markParent = true; }
		            if (blot == null || blot === _this)
		                return;
		            if (blot.domNode.parentNode == null)
		                return;
		            if (blot.domNode[Registry.DATA_KEY].mutations == null) {
		                blot.domNode[Registry.DATA_KEY].mutations = [];
		            }
		            if (markParent)
		                mark(blot.parent);
		        };
		        var optimize = function (blot) {
		            if (blot.domNode[Registry.DATA_KEY] == null || blot.domNode[Registry.DATA_KEY].mutations == null) {
		                return;
		            }
		            if (blot instanceof container_1.default) {
		                blot.children.forEach(optimize);
		            }
		            blot.optimize();
		        };
		        var remaining = mutations;
		        for (var i = 0; remaining.length > 0; i += 1) {
		            if (i >= MAX_OPTIMIZE_ITERATIONS) {
		                throw new Error('[Parchment] Maximum optimize iterations reached');
		            }
		            remaining.forEach(function (mutation) {
		                var blot = Registry.find(mutation.target, true);
		                if (blot == null)
		                    return;
		                if (blot.domNode === mutation.target) {
		                    if (mutation.type === 'childList') {
		                        mark(Registry.find(mutation.previousSibling, false));
		                        [].forEach.call(mutation.addedNodes, function (node) {
		                            var child = Registry.find(node, false);
		                            mark(child, false);
		                            if (child instanceof container_1.default) {
		                                child.children.forEach(function (grandChild) {
		                                    mark(grandChild, false);
		                                });
		                            }
		                        });
		                    }
		                    else if (mutation.type === 'attributes') {
		                        mark(blot.prev);
		                    }
		                }
		                mark(blot);
		            });
		            this.children.forEach(optimize);
		            remaining = [].slice.call(this.observer.takeRecords());
		            records = remaining.slice();
		            while (records.length > 0)
		                mutations.push(records.pop());
		        }
		    };
		    ScrollBlot.prototype.update = function (mutations) {
		        var _this = this;
		        mutations = mutations || this.observer.takeRecords();
		        // TODO use WeakMap
		        mutations.map(function (mutation) {
		            var blot = Registry.find(mutation.target, true);
		            if (blot == null)
		                return;
		            if (blot.domNode[Registry.DATA_KEY].mutations == null) {
		                blot.domNode[Registry.DATA_KEY].mutations = [mutation];
		                return blot;
		            }
		            else {
		                blot.domNode[Registry.DATA_KEY].mutations.push(mutation);
		                return null;
		            }
		        }).forEach(function (blot) {
		            if (blot == null || blot === _this || blot.domNode[Registry.DATA_KEY] == null)
		                return;
		            blot.update(blot.domNode[Registry.DATA_KEY].mutations || []);
		        });
		        if (this.domNode[Registry.DATA_KEY].mutations != null) {
		            _super.prototype.update.call(this, this.domNode[Registry.DATA_KEY].mutations);
		        }
		        this.optimize(mutations);
		    };
		    return ScrollBlot;
		}(container_1.default));
		ScrollBlot.blotName = 'scroll';
		ScrollBlot.defaultChild = 'block';
		ScrollBlot.scope = Registry.Scope.BLOCK_BLOT;
		ScrollBlot.tagName = 'DIV';
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = ScrollBlot;
	
	
	/***/ },
	/* 14 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var format_1 = __webpack_require__(7);
		var Registry = __webpack_require__(6);
		// Shallow object comparison
		function isEqual(obj1, obj2) {
		    if (Object.keys(obj1).length !== Object.keys(obj2).length)
		        return false;
		    for (var prop in obj1) {
		        if (obj1[prop] !== obj2[prop])
		            return false;
		    }
		    return true;
		}
		var InlineBlot = (function (_super) {
		    __extends(InlineBlot, _super);
		    function InlineBlot() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    InlineBlot.formats = function (domNode) {
		        if (domNode.tagName === InlineBlot.tagName)
		            return undefined;
		        return _super.formats.call(this, domNode);
		    };
		    InlineBlot.prototype.format = function (name, value) {
		        var _this = this;
		        if (name === this.statics.blotName && !value) {
		            this.children.forEach(function (child) {
		                if (!(child instanceof format_1.default)) {
		                    child = child.wrap(InlineBlot.blotName, true);
		                }
		                _this.attributes.copy(child);
		            });
		            this.unwrap();
		        }
		        else {
		            _super.prototype.format.call(this, name, value);
		        }
		    };
		    InlineBlot.prototype.formatAt = function (index, length, name, value) {
		        if (this.formats()[name] != null || Registry.query(name, Registry.Scope.ATTRIBUTE)) {
		            var blot = this.isolate(index, length);
		            blot.format(name, value);
		        }
		        else {
		            _super.prototype.formatAt.call(this, index, length, name, value);
		        }
		    };
		    InlineBlot.prototype.optimize = function () {
		        _super.prototype.optimize.call(this);
		        var formats = this.formats();
		        if (Object.keys(formats).length === 0) {
		            return this.unwrap(); // unformatted span
		        }
		        var next = this.next;
		        if (next instanceof InlineBlot && next.prev === this && isEqual(formats, next.formats())) {
		            next.moveChildren(this);
		            next.remove();
		        }
		    };
		    return InlineBlot;
		}(format_1.default));
		InlineBlot.blotName = 'inline';
		InlineBlot.scope = Registry.Scope.INLINE_BLOT;
		InlineBlot.tagName = 'SPAN';
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = InlineBlot;
	
	
	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var format_1 = __webpack_require__(7);
		var Registry = __webpack_require__(6);
		var BlockBlot = (function (_super) {
		    __extends(BlockBlot, _super);
		    function BlockBlot() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    BlockBlot.formats = function (domNode) {
		        var tagName = Registry.query(BlockBlot.blotName).tagName;
		        if (domNode.tagName === tagName)
		            return undefined;
		        return _super.formats.call(this, domNode);
		    };
		    BlockBlot.prototype.format = function (name, value) {
		        if (Registry.query(name, Registry.Scope.BLOCK) == null) {
		            return;
		        }
		        else if (name === this.statics.blotName && !value) {
		            this.replaceWith(BlockBlot.blotName);
		        }
		        else {
		            _super.prototype.format.call(this, name, value);
		        }
		    };
		    BlockBlot.prototype.formatAt = function (index, length, name, value) {
		        if (Registry.query(name, Registry.Scope.BLOCK) != null) {
		            this.format(name, value);
		        }
		        else {
		            _super.prototype.formatAt.call(this, index, length, name, value);
		        }
		    };
		    BlockBlot.prototype.insertAt = function (index, value, def) {
		        if (def == null || Registry.query(value, Registry.Scope.INLINE) != null) {
		            // Insert text or inline
		            _super.prototype.insertAt.call(this, index, value, def);
		        }
		        else {
		            var after = this.split(index);
		            var blot = Registry.create(value, def);
		            after.parent.insertBefore(blot, after);
		        }
		    };
		    BlockBlot.prototype.update = function (mutations) {
		        if (navigator.userAgent.match(/Trident/)) {
		            this.attach();
		        }
		        else {
		            _super.prototype.update.call(this, mutations);
		        }
		    };
		    return BlockBlot;
		}(format_1.default));
		BlockBlot.blotName = 'block';
		BlockBlot.scope = Registry.Scope.BLOCK_BLOT;
		BlockBlot.tagName = 'P';
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = BlockBlot;
	
	
	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var leaf_1 = __webpack_require__(12);
		var EmbedBlot = (function (_super) {
		    __extends(EmbedBlot, _super);
		    function EmbedBlot() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    EmbedBlot.formats = function (domNode) {
		        return undefined;
		    };
		    EmbedBlot.prototype.format = function (name, value) {
		        // super.formatAt wraps, which is what we want in general,
		        // but this allows subclasses to overwrite for formats
		        // that just apply to particular embeds
		        _super.prototype.formatAt.call(this, 0, this.length(), name, value);
		    };
		    EmbedBlot.prototype.formatAt = function (index, length, name, value) {
		        if (index === 0 && length === this.length()) {
		            this.format(name, value);
		        }
		        else {
		            _super.prototype.formatAt.call(this, index, length, name, value);
		        }
		    };
		    EmbedBlot.prototype.formats = function () {
		        return this.statics.formats(this.domNode);
		    };
		    return EmbedBlot;
		}(leaf_1.default));
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = EmbedBlot;
	
	
	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		var leaf_1 = __webpack_require__(12);
		var Registry = __webpack_require__(6);
		var TextBlot = (function (_super) {
		    __extends(TextBlot, _super);
		    function TextBlot(node) {
		        var _this = _super.call(this, node) || this;
		        _this.text = _this.statics.value(_this.domNode);
		        return _this;
		    }
		    TextBlot.create = function (value) {
		        return document.createTextNode(value);
		    };
		    TextBlot.value = function (domNode) {
		        return domNode.data;
		    };
		    TextBlot.prototype.deleteAt = function (index, length) {
		        this.domNode.data = this.text = this.text.slice(0, index) + this.text.slice(index + length);
		    };
		    TextBlot.prototype.index = function (node, offset) {
		        if (this.domNode === node) {
		            return offset;
		        }
		        return -1;
		    };
		    TextBlot.prototype.insertAt = function (index, value, def) {
		        if (def == null) {
		            this.text = this.text.slice(0, index) + value + this.text.slice(index);
		            this.domNode.data = this.text;
		        }
		        else {
		            _super.prototype.insertAt.call(this, index, value, def);
		        }
		    };
		    TextBlot.prototype.length = function () {
		        return this.text.length;
		    };
		    TextBlot.prototype.optimize = function () {
		        _super.prototype.optimize.call(this);
		        this.text = this.statics.value(this.domNode);
		        if (this.text.length === 0) {
		            this.remove();
		        }
		        else if (this.next instanceof TextBlot && this.next.prev === this) {
		            this.insertAt(this.length(), this.next.value());
		            this.next.remove();
		        }
		    };
		    TextBlot.prototype.position = function (index, inclusive) {
		        if (inclusive === void 0) { inclusive = false; }
		        return [this.domNode, index];
		    };
		    TextBlot.prototype.split = function (index, force) {
		        if (force === void 0) { force = false; }
		        if (!force) {
		            if (index === 0)
		                return this;
		            if (index === this.length())
		                return this.next;
		        }
		        var after = Registry.create(this.domNode.splitText(index));
		        this.parent.insertBefore(after, this.next);
		        this.text = this.statics.value(this.domNode);
		        return after;
		    };
		    TextBlot.prototype.update = function (mutations) {
		        var _this = this;
		        if (mutations.some(function (mutation) {
		            return mutation.type === 'characterData' && mutation.target === _this.domNode;
		        })) {
		            this.text = this.statics.value(this.domNode);
		        }
		    };
		    TextBlot.prototype.value = function () {
		        return this.text;
		    };
		    return TextBlot;
		}(leaf_1.default));
		TextBlot.blotName = 'text';
		TextBlot.scope = Registry.Scope.INLINE_BLOT;
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = TextBlot;
	
	
	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = exports.overload = exports.expandConfig = undefined;
	
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		__webpack_require__(19);
	
		var _quillDelta = __webpack_require__(20);
	
		var _quillDelta2 = _interopRequireDefault(_quillDelta);
	
		var _editor = __webpack_require__(27);
	
		var _editor2 = _interopRequireDefault(_editor);
	
		var _emitter3 = __webpack_require__(35);
	
		var _emitter4 = _interopRequireDefault(_emitter3);
	
		var _module = __webpack_require__(39);
	
		var _module2 = _interopRequireDefault(_module);
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _selection = __webpack_require__(40);
	
		var _selection2 = _interopRequireDefault(_selection);
	
		var _extend = __webpack_require__(25);
	
		var _extend2 = _interopRequireDefault(_extend);
	
		var _logger = __webpack_require__(37);
	
		var _logger2 = _interopRequireDefault(_logger);
	
		var _theme = __webpack_require__(41);
	
		var _theme2 = _interopRequireDefault(_theme);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		var debug = (0, _logger2.default)('quill');
	
		var Quill = function () {
		  _createClass(Quill, null, [{
		    key: 'debug',
		    value: function debug(limit) {
		      if (limit === true) {
		        limit = 'log';
		      }
		      _logger2.default.level(limit);
		    }
		  }, {
		    key: 'find',
		    value: function find(node) {
		      return node.__quill || _parchment2.default.find(node);
		    }
		  }, {
		    key: 'import',
		    value: function _import(name) {
		      if (this.imports[name] == null) {
		        debug.error('Cannot import ' + name + '. Are you sure it was registered?');
		      }
		      return this.imports[name];
		    }
		  }, {
		    key: 'register',
		    value: function register(path, target) {
		      var _this = this;
	
		      var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
		      if (typeof path !== 'string') {
		        var name = path.attrName || path.blotName;
		        if (typeof name === 'string') {
		          // register(Blot | Attributor, overwrite)
		          this.register('formats/' + name, path, target);
		        } else {
		          Object.keys(path).forEach(function (key) {
		            _this.register(key, path[key], target);
		          });
		        }
		      } else {
		        if (this.imports[path] != null && !overwrite) {
		          debug.warn('Overwriting ' + path + ' with', target);
		        }
		        this.imports[path] = target;
		        if ((path.startsWith('blots/') || path.startsWith('formats/')) && target.blotName !== 'abstract') {
		          _parchment2.default.register(target);
		        }
		      }
		    }
		  }]);
	
		  function Quill(container) {
		    var _this2 = this;
	
		    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
		    _classCallCheck(this, Quill);
	
		    this.options = expandConfig(container, options);
		    this.container = this.options.container;
		    this.scrollingContainer = this.options.scrollingContainer || document.body;
		    if (this.container == null) {
		      return debug.error('Invalid Quill container', container);
		    }
		    if (this.options.debug) {
		      Quill.debug(this.options.debug);
		    }
		    var html = this.container.innerHTML.trim();
		    this.container.classList.add('ql-container');
		    this.container.innerHTML = '';
		    this.container.__quill = this;
		    this.root = this.addContainer('ql-editor');
		    this.root.classList.add('ql-blank');
		    this.emitter = new _emitter4.default();
		    this.scroll = _parchment2.default.create(this.root, {
		      emitter: this.emitter,
		      whitelist: this.options.formats
		    });
		    this.editor = new _editor2.default(this.scroll);
		    this.selection = new _selection2.default(this.scroll, this.emitter);
		    this.theme = new this.options.theme(this, this.options);
		    this.keyboard = this.theme.addModule('keyboard');
		    this.clipboard = this.theme.addModule('clipboard');
		    this.history = this.theme.addModule('history');
		    this.theme.init();
		    this.emitter.on(_emitter4.default.events.EDITOR_CHANGE, function (type) {
		      if (type === _emitter4.default.events.TEXT_CHANGE) {
		        _this2.root.classList.toggle('ql-blank', _this2.editor.isBlank());
		      }
		    });
		    this.emitter.on(_emitter4.default.events.SCROLL_UPDATE, function (source, mutations) {
		      var range = _this2.selection.lastRange;
		      var index = range && range.length === 0 ? range.index : undefined;
		      modify.call(_this2, function () {
		        return _this2.editor.update(null, mutations, index);
		      }, source);
		    });
		    var contents = this.clipboard.convert('<div class=\'ql-editor\' style="white-space: normal;">' + html + '<p><br></p></div>');
		    this.setContents(contents);
		    this.history.clear();
		    if (this.options.placeholder) {
		      this.root.setAttribute('data-placeholder', this.options.placeholder);
		    }
		    if (this.options.readOnly) {
		      this.disable();
		    }
		  }
	
		  _createClass(Quill, [{
		    key: 'addContainer',
		    value: function addContainer(container) {
		      var refNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
		      if (typeof container === 'string') {
		        var className = container;
		        container = document.createElement('div');
		        container.classList.add(className);
		      }
		      this.container.insertBefore(container, refNode);
		      return container;
		    }
		  }, {
		    key: 'blur',
		    value: function blur() {
		      this.selection.setRange(null);
		    }
		  }, {
		    key: 'deleteText',
		    value: function deleteText(index, length, source) {
		      var _this3 = this;
	
		      var _overload = overload(index, length, source);
	
		      var _overload2 = _slicedToArray(_overload, 4);
	
		      index = _overload2[0];
		      length = _overload2[1];
		      source = _overload2[3];
	
		      return modify.call(this, function () {
		        return _this3.editor.deleteText(index, length);
		      }, source, index, -1 * length);
		    }
		  }, {
		    key: 'disable',
		    value: function disable() {
		      this.enable(false);
		    }
		  }, {
		    key: 'enable',
		    value: function enable() {
		      var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
		      this.scroll.enable(enabled);
		      this.container.classList.toggle('ql-disabled', !enabled);
		      if (!enabled) {
		        this.blur();
		      }
		    }
		  }, {
		    key: 'focus',
		    value: function focus() {
		      var scrollTop = this.scrollingContainer.scrollTop;
		      this.selection.focus();
		      this.scrollingContainer.scrollTop = scrollTop;
		      this.selection.scrollIntoView();
		    }
		  }, {
		    key: 'format',
		    value: function format(name, value) {
		      var _this4 = this;
	
		      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _emitter4.default.sources.API;
	
		      return modify.call(this, function () {
		        var range = _this4.getSelection(true);
		        var change = new _quillDelta2.default();
		        if (range == null) {
		          return change;
		        } else if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK)) {
		          change = _this4.editor.formatLine(range.index, range.length, _defineProperty({}, name, value));
		        } else if (range.length === 0) {
		          _this4.selection.format(name, value);
		          return change;
		        } else {
		          change = _this4.editor.formatText(range.index, range.length, _defineProperty({}, name, value));
		        }
		        _this4.setSelection(range, _emitter4.default.sources.SILENT);
		        return change;
		      }, source);
		    }
		  }, {
		    key: 'formatLine',
		    value: function formatLine(index, length, name, value, source) {
		      var _this5 = this;
	
		      var formats = void 0;
	
		      var _overload3 = overload(index, length, name, value, source);
	
		      var _overload4 = _slicedToArray(_overload3, 4);
	
		      index = _overload4[0];
		      length = _overload4[1];
		      formats = _overload4[2];
		      source = _overload4[3];
	
		      return modify.call(this, function () {
		        return _this5.editor.formatLine(index, length, formats);
		      }, source, index, 0);
		    }
		  }, {
		    key: 'formatText',
		    value: function formatText(index, length, name, value, source) {
		      var _this6 = this;
	
		      var formats = void 0;
	
		      var _overload5 = overload(index, length, name, value, source);
	
		      var _overload6 = _slicedToArray(_overload5, 4);
	
		      index = _overload6[0];
		      length = _overload6[1];
		      formats = _overload6[2];
		      source = _overload6[3];
	
		      return modify.call(this, function () {
		        return _this6.editor.formatText(index, length, formats);
		      }, source, index, 0);
		    }
		  }, {
		    key: 'getBounds',
		    value: function getBounds(index) {
		      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
		      if (typeof index === 'number') {
		        return this.selection.getBounds(index, length);
		      } else {
		        return this.selection.getBounds(index.index, index.length);
		      }
		    }
		  }, {
		    key: 'getContents',
		    value: function getContents() {
		      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLength() - index;
	
		      var _overload7 = overload(index, length);
	
		      var _overload8 = _slicedToArray(_overload7, 2);
	
		      index = _overload8[0];
		      length = _overload8[1];
	
		      return this.editor.getContents(index, length);
		    }
		  }, {
		    key: 'getFormat',
		    value: function getFormat() {
		      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getSelection();
		      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
		      if (typeof index === 'number') {
		        return this.editor.getFormat(index, length);
		      } else {
		        return this.editor.getFormat(index.index, index.length);
		      }
		    }
		  }, {
		    key: 'getIndex',
		    value: function getIndex(blot) {
		      return blot.offset(this.scroll);
		    }
		  }, {
		    key: 'getLength',
		    value: function getLength() {
		      return this.scroll.length();
		    }
		  }, {
		    key: 'getLeaf',
		    value: function getLeaf(index) {
		      return this.scroll.leaf(index);
		    }
		  }, {
		    key: 'getLine',
		    value: function getLine(index) {
		      return this.scroll.line(index);
		    }
		  }, {
		    key: 'getLines',
		    value: function getLines() {
		      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;
	
		      if (typeof index !== 'number') {
		        return this.scroll.lines(index.index, index.length);
		      } else {
		        return this.scroll.lines(index, length);
		      }
		    }
		  }, {
		    key: 'getModule',
		    value: function getModule(name) {
		      return this.theme.modules[name];
		    }
		  }, {
		    key: 'getSelection',
		    value: function getSelection() {
		      var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
		      if (focus) this.focus();
		      this.update(); // Make sure we access getRange with editor in consistent state
		      return this.selection.getRange()[0];
		    }
		  }, {
		    key: 'getText',
		    value: function getText() {
		      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLength() - index;
	
		      var _overload9 = overload(index, length);
	
		      var _overload10 = _slicedToArray(_overload9, 2);
	
		      index = _overload10[0];
		      length = _overload10[1];
	
		      return this.editor.getText(index, length);
		    }
		  }, {
		    key: 'hasFocus',
		    value: function hasFocus() {
		      return this.selection.hasFocus();
		    }
		  }, {
		    key: 'insertEmbed',
		    value: function insertEmbed(index, embed, value) {
		      var _this7 = this;
	
		      var source = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Quill.sources.API;
	
		      return modify.call(this, function () {
		        return _this7.editor.insertEmbed(index, embed, value);
		      }, source, index);
		    }
		  }, {
		    key: 'insertText',
		    value: function insertText(index, text, name, value, source) {
		      var _this8 = this;
	
		      var formats = void 0;
	
		      var _overload11 = overload(index, 0, name, value, source);
	
		      var _overload12 = _slicedToArray(_overload11, 4);
	
		      index = _overload12[0];
		      formats = _overload12[2];
		      source = _overload12[3];
	
		      return modify.call(this, function () {
		        return _this8.editor.insertText(index, text, formats);
		      }, source, index, text.length);
		    }
		  }, {
		    key: 'isEnabled',
		    value: function isEnabled() {
		      return !this.container.classList.contains('ql-disabled');
		    }
		  }, {
		    key: 'off',
		    value: function off() {
		      return this.emitter.off.apply(this.emitter, arguments);
		    }
		  }, {
		    key: 'on',
		    value: function on() {
		      return this.emitter.on.apply(this.emitter, arguments);
		    }
		  }, {
		    key: 'once',
		    value: function once() {
		      return this.emitter.once.apply(this.emitter, arguments);
		    }
		  }, {
		    key: 'pasteHTML',
		    value: function pasteHTML(index, html, source) {
		      this.clipboard.dangerouslyPasteHTML(index, html, source);
		    }
		  }, {
		    key: 'removeFormat',
		    value: function removeFormat(index, length, source) {
		      var _this9 = this;
	
		      var _overload13 = overload(index, length, source);
	
		      var _overload14 = _slicedToArray(_overload13, 4);
	
		      index = _overload14[0];
		      length = _overload14[1];
		      source = _overload14[3];
	
		      return modify.call(this, function () {
		        return _this9.editor.removeFormat(index, length);
		      }, source, index);
		    }
		  }, {
		    key: 'setContents',
		    value: function setContents(delta) {
		      var _this10 = this;
	
		      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;
	
		      return modify.call(this, function () {
		        delta = new _quillDelta2.default(delta);
		        var length = _this10.getLength();
		        var deleted = _this10.editor.deleteText(0, length);
		        var applied = _this10.editor.applyDelta(delta);
		        var lastOp = applied.ops[applied.ops.length - 1];
		        if (lastOp != null && typeof lastOp.insert === 'string' && lastOp.insert[lastOp.insert.length - 1] === '\n') {
		          _this10.editor.deleteText(_this10.getLength() - 1, 1);
		          applied.delete(1);
		        }
		        var ret = deleted.compose(applied);
		        return ret;
		      }, source);
		    }
		  }, {
		    key: 'setSelection',
		    value: function setSelection(index, length, source) {
		      if (index == null) {
		        this.selection.setRange(null, length || Quill.sources.API);
		      } else {
		        var _overload15 = overload(index, length, source);
	
		        var _overload16 = _slicedToArray(_overload15, 4);
	
		        index = _overload16[0];
		        length = _overload16[1];
		        source = _overload16[3];
	
		        this.selection.setRange(new _selection.Range(index, length), source);
		      }
		      if (source !== _emitter4.default.sources.SILENT) {
		        this.selection.scrollIntoView();
		      }
		    }
		  }, {
		    key: 'setText',
		    value: function setText(text) {
		      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;
	
		      var delta = new _quillDelta2.default().insert(text);
		      return this.setContents(delta, source);
		    }
		  }, {
		    key: 'update',
		    value: function update() {
		      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _emitter4.default.sources.USER;
	
		      var change = this.scroll.update(source); // Will update selection before selection.update() does if text changes
		      this.selection.update(source);
		      return change;
		    }
		  }, {
		    key: 'updateContents',
		    value: function updateContents(delta) {
		      var _this11 = this;
	
		      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;
	
		      return modify.call(this, function () {
		        delta = new _quillDelta2.default(delta);
		        return _this11.editor.applyDelta(delta, source);
		      }, source, true);
		    }
		  }]);
	
		  return Quill;
		}();
	
		Quill.DEFAULTS = {
		  bounds: null,
		  formats: null,
		  modules: {},
		  placeholder: '',
		  readOnly: false,
		  scrollingContainer: null,
		  strict: true,
		  theme: 'default'
		};
		Quill.events = _emitter4.default.events;
		Quill.sources = _emitter4.default.sources;
		// eslint-disable-next-line no-undef
		Quill.version =  false ? 'dev' : ("1.2.0");
	
		Quill.imports = {
		  'delta': _quillDelta2.default,
		  'parchment': _parchment2.default,
		  'core/module': _module2.default,
		  'core/theme': _theme2.default
		};
	
		function expandConfig(container, userConfig) {
		  userConfig = (0, _extend2.default)(true, {
		    container: container,
		    modules: {
		      clipboard: true,
		      keyboard: true,
		      history: true
		    }
		  }, userConfig);
		  if (!userConfig.theme || userConfig.theme === Quill.DEFAULTS.theme) {
		    userConfig.theme = _theme2.default;
		  } else {
		    userConfig.theme = Quill.import('themes/' + userConfig.theme);
		    if (userConfig.theme == null) {
		      throw new Error('Invalid theme ' + userConfig.theme + '. Did you register it?');
		    }
		  }
		  var themeConfig = (0, _extend2.default)(true, {}, userConfig.theme.DEFAULTS);
		  [themeConfig, userConfig].forEach(function (config) {
		    config.modules = config.modules || {};
		    Object.keys(config.modules).forEach(function (module) {
		      if (config.modules[module] === true) {
		        config.modules[module] = {};
		      }
		    });
		  });
		  var moduleNames = Object.keys(themeConfig.modules).concat(Object.keys(userConfig.modules));
		  var moduleConfig = moduleNames.reduce(function (config, name) {
		    var moduleClass = Quill.import('modules/' + name);
		    if (moduleClass == null) {
		      debug.error('Cannot load ' + name + ' module. Are you sure you registered it?');
		    } else {
		      config[name] = moduleClass.DEFAULTS || {};
		    }
		    return config;
		  }, {});
		  // Special case toolbar shorthand
		  if (userConfig.modules != null && userConfig.modules.toolbar && userConfig.modules.toolbar.constructor !== Object) {
		    userConfig.modules.toolbar = {
		      container: userConfig.modules.toolbar
		    };
		  }
		  userConfig = (0, _extend2.default)(true, {}, Quill.DEFAULTS, { modules: moduleConfig }, themeConfig, userConfig);
		  ['bounds', 'container', 'scrollingContainer'].forEach(function (key) {
		    if (typeof userConfig[key] === 'string') {
		      userConfig[key] = document.querySelector(userConfig[key]);
		    }
		  });
		  userConfig.modules = Object.keys(userConfig.modules).reduce(function (config, name) {
		    if (userConfig.modules[name]) {
		      config[name] = userConfig.modules[name];
		    }
		    return config;
		  }, {});
		  return userConfig;
		}
	
		// Handle selection preservation and TEXT_CHANGE emission
		// common to modification APIs
		function modify(modifier, source, index, shift) {
		  if (this.options.strict && !this.isEnabled() && source === _emitter4.default.sources.USER) {
		    return new _quillDelta2.default();
		  }
		  var range = index == null ? null : this.getSelection();
		  var oldDelta = this.editor.delta;
		  var change = modifier();
		  if (range != null) {
		    if (index === true) index = range.index;
		    if (shift == null) {
		      range = shiftRange(range, change, source);
		    } else if (shift !== 0) {
		      range = shiftRange(range, index, shift, source);
		    }
		    this.setSelection(range, _emitter4.default.sources.SILENT);
		  }
		  if (change.length() > 0) {
		    var _emitter;
	
		    var args = [_emitter4.default.events.TEXT_CHANGE, change, oldDelta, source];
		    (_emitter = this.emitter).emit.apply(_emitter, [_emitter4.default.events.EDITOR_CHANGE].concat(args));
		    if (source !== _emitter4.default.sources.SILENT) {
		      var _emitter2;
	
		      (_emitter2 = this.emitter).emit.apply(_emitter2, args);
		    }
		  }
		  return change;
		}
	
		function overload(index, length, name, value, source) {
		  var formats = {};
		  if (typeof index.index === 'number' && typeof index.length === 'number') {
		    // Allow for throwaway end (used by insertText/insertEmbed)
		    if (typeof length !== 'number') {
		      source = value, value = name, name = length, length = index.length, index = index.index;
		    } else {
		      length = index.length, index = index.index;
		    }
		  } else if (typeof length !== 'number') {
		    source = value, value = name, name = length, length = 0;
		  }
		  // Handle format being object, two format name/value strings or excluded
		  if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
		    formats = name;
		    source = value;
		  } else if (typeof name === 'string') {
		    if (value != null) {
		      formats[name] = value;
		    } else {
		      source = name;
		    }
		  }
		  // Handle optional source
		  source = source || _emitter4.default.sources.API;
		  return [index, length, formats, source];
		}
	
		function shiftRange(range, index, length, source) {
		  if (range == null) return null;
		  var start = void 0,
		      end = void 0;
		  if (index instanceof _quillDelta2.default) {
		    var _map = [range.index, range.index + range.length].map(function (pos) {
		      return index.transformPosition(pos, source === _emitter4.default.sources.USER);
		    });
	
		    var _map2 = _slicedToArray(_map, 2);
	
		    start = _map2[0];
		    end = _map2[1];
		  } else {
		    var _map3 = [range.index, range.index + range.length].map(function (pos) {
		      if (pos < index || pos === index && source !== _emitter4.default.sources.USER) return pos;
		      if (length >= 0) {
		        return pos + length;
		      } else {
		        return Math.max(index, pos + length);
		      }
		    });
	
		    var _map4 = _slicedToArray(_map3, 2);
	
		    start = _map4[0];
		    end = _map4[1];
		  }
		  return new _selection.Range(start, end - start);
		}
	
		exports.expandConfig = expandConfig;
		exports.overload = overload;
		exports.default = Quill;
	
	/***/ },
	/* 19 */
	/***/ function(module, exports) {
	
		'use strict';
	
		var elem = document.createElement('div');
		elem.classList.toggle('test-class', false);
		if (elem.classList.contains('test-class')) {
		  (function () {
		    var _toggle = DOMTokenList.prototype.toggle;
		    DOMTokenList.prototype.toggle = function (token, force) {
		      if (arguments.length > 1 && !this.contains(token) === !force) {
		        return force;
		      } else {
		        return _toggle.call(this, token);
		      }
		    };
		  })();
		}
	
		if (!String.prototype.startsWith) {
		  String.prototype.startsWith = function (searchString, position) {
		    position = position || 0;
		    return this.substr(position, searchString.length) === searchString;
		  };
		}
	
		if (!String.prototype.endsWith) {
		  String.prototype.endsWith = function (searchString, position) {
		    var subjectString = this.toString();
		    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
		      position = subjectString.length;
		    }
		    position -= searchString.length;
		    var lastIndex = subjectString.indexOf(searchString, position);
		    return lastIndex !== -1 && lastIndex === position;
		  };
		}
	
		if (!Array.prototype.find) {
		  Object.defineProperty(Array.prototype, "find", {
		    value: function value(predicate) {
		      if (this === null) {
		        throw new TypeError('Array.prototype.find called on null or undefined');
		      }
		      if (typeof predicate !== 'function') {
		        throw new TypeError('predicate must be a function');
		      }
		      var list = Object(this);
		      var length = list.length >>> 0;
		      var thisArg = arguments[1];
		      var value;
	
		      for (var i = 0; i < length; i++) {
		        value = list[i];
		        if (predicate.call(thisArg, value, i, list)) {
		          return value;
		        }
		      }
		      return undefined;
		    }
		  });
		}
	
		// Disable resizing in Firefox
		document.addEventListener("DOMContentLoaded", function () {
		  document.execCommand("enableObjectResizing", false, false);
		});
	
	/***/ },
	/* 20 */
	/***/ function(module, exports, __webpack_require__) {
	
		var diff = __webpack_require__(21);
		var equal = __webpack_require__(22);
		var extend = __webpack_require__(25);
		var op = __webpack_require__(26);
	
	
		var NULL_CHARACTER = String.fromCharCode(0);  // Placeholder char for embed in diff()
	
	
		var Delta = function (ops) {
		  // Assume we are given a well formed ops
		  if (Array.isArray(ops)) {
		    this.ops = ops;
		  } else if (ops != null && Array.isArray(ops.ops)) {
		    this.ops = ops.ops;
		  } else {
		    this.ops = [];
		  }
		};
	
	
		Delta.prototype.insert = function (text, attributes) {
		  var newOp = {};
		  if (text.length === 0) return this;
		  newOp.insert = text;
		  if (attributes != null && typeof attributes === 'object' && Object.keys(attributes).length > 0) {
		    newOp.attributes = attributes;
		  }
		  return this.push(newOp);
		};
	
		Delta.prototype['delete'] = function (length) {
		  if (length <= 0) return this;
		  return this.push({ 'delete': length });
		};
	
		Delta.prototype.retain = function (length, attributes) {
		  if (length <= 0) return this;
		  var newOp = { retain: length };
		  if (attributes != null && typeof attributes === 'object' && Object.keys(attributes).length > 0) {
		    newOp.attributes = attributes;
		  }
		  return this.push(newOp);
		};
	
		Delta.prototype.push = function (newOp) {
		  var index = this.ops.length;
		  var lastOp = this.ops[index - 1];
		  newOp = extend(true, {}, newOp);
		  if (typeof lastOp === 'object') {
		    if (typeof newOp['delete'] === 'number' && typeof lastOp['delete'] === 'number') {
		      this.ops[index - 1] = { 'delete': lastOp['delete'] + newOp['delete'] };
		      return this;
		    }
		    // Since it does not matter if we insert before or after deleting at the same index,
		    // always prefer to insert first
		    if (typeof lastOp['delete'] === 'number' && newOp.insert != null) {
		      index -= 1;
		      lastOp = this.ops[index - 1];
		      if (typeof lastOp !== 'object') {
		        this.ops.unshift(newOp);
		        return this;
		      }
		    }
		    if (equal(newOp.attributes, lastOp.attributes)) {
		      if (typeof newOp.insert === 'string' && typeof lastOp.insert === 'string') {
		        this.ops[index - 1] = { insert: lastOp.insert + newOp.insert };
		        if (typeof newOp.attributes === 'object') this.ops[index - 1].attributes = newOp.attributes
		        return this;
		      } else if (typeof newOp.retain === 'number' && typeof lastOp.retain === 'number') {
		        this.ops[index - 1] = { retain: lastOp.retain + newOp.retain };
		        if (typeof newOp.attributes === 'object') this.ops[index - 1].attributes = newOp.attributes
		        return this;
		      }
		    }
		  }
		  if (index === this.ops.length) {
		    this.ops.push(newOp);
		  } else {
		    this.ops.splice(index, 0, newOp);
		  }
		  return this;
		};
	
		Delta.prototype.filter = function (predicate) {
		  return this.ops.filter(predicate);
		};
	
		Delta.prototype.forEach = function (predicate) {
		  this.ops.forEach(predicate);
		};
	
		Delta.prototype.map = function (predicate) {
		  return this.ops.map(predicate);
		};
	
		Delta.prototype.partition = function (predicate) {
		  var passed = [], failed = [];
		  this.forEach(function(op) {
		    var target = predicate(op) ? passed : failed;
		    target.push(op);
		  });
		  return [passed, failed];
		};
	
		Delta.prototype.reduce = function (predicate, initial) {
		  return this.ops.reduce(predicate, initial);
		};
	
		Delta.prototype.chop = function () {
		  var lastOp = this.ops[this.ops.length - 1];
		  if (lastOp && lastOp.retain && !lastOp.attributes) {
		    this.ops.pop();
		  }
		  return this;
		};
	
		Delta.prototype.length = function () {
		  return this.reduce(function (length, elem) {
		    return length + op.length(elem);
		  }, 0);
		};
	
		Delta.prototype.slice = function (start, end) {
		  start = start || 0;
		  if (typeof end !== 'number') end = Infinity;
		  var ops = [];
		  var iter = op.iterator(this.ops);
		  var index = 0;
		  while (index < end && iter.hasNext()) {
		    var nextOp;
		    if (index < start) {
		      nextOp = iter.next(start - index);
		    } else {
		      nextOp = iter.next(end - index);
		      ops.push(nextOp);
		    }
		    index += op.length(nextOp);
		  }
		  return new Delta(ops);
		};
	
	
		Delta.prototype.compose = function (other) {
		  var thisIter = op.iterator(this.ops);
		  var otherIter = op.iterator(other.ops);
		  var delta = new Delta();
		  while (thisIter.hasNext() || otherIter.hasNext()) {
		    if (otherIter.peekType() === 'insert') {
		      delta.push(otherIter.next());
		    } else if (thisIter.peekType() === 'delete') {
		      delta.push(thisIter.next());
		    } else {
		      var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
		      var thisOp = thisIter.next(length);
		      var otherOp = otherIter.next(length);
		      if (typeof otherOp.retain === 'number') {
		        var newOp = {};
		        if (typeof thisOp.retain === 'number') {
		          newOp.retain = length;
		        } else {
		          newOp.insert = thisOp.insert;
		        }
		        // Preserve null when composing with a retain, otherwise remove it for inserts
		        var attributes = op.attributes.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === 'number');
		        if (attributes) newOp.attributes = attributes;
		        delta.push(newOp);
		      // Other op should be delete, we could be an insert or retain
		      // Insert + delete cancels out
		      } else if (typeof otherOp['delete'] === 'number' && typeof thisOp.retain === 'number') {
		        delta.push(otherOp);
		      }
		    }
		  }
		  return delta.chop();
		};
	
		Delta.prototype.concat = function (other) {
		  var delta = new Delta(this.ops.slice());
		  if (other.ops.length > 0) {
		    delta.push(other.ops[0]);
		    delta.ops = delta.ops.concat(other.ops.slice(1));
		  }
		  return delta;
		};
	
		Delta.prototype.diff = function (other, index) {
		  if (this.ops === other.ops) {
		    return new Delta();
		  }
		  var strings = [this, other].map(function (delta) {
		    return delta.map(function (op) {
		      if (op.insert != null) {
		        return typeof op.insert === 'string' ? op.insert : NULL_CHARACTER;
		      }
		      var prep = (ops === other.ops) ? 'on' : 'with';
		      throw new Error('diff() called ' + prep + ' non-document');
		    }).join('');
		  });
		  var delta = new Delta();
		  var diffResult = diff(strings[0], strings[1], index);
		  var thisIter = op.iterator(this.ops);
		  var otherIter = op.iterator(other.ops);
		  diffResult.forEach(function (component) {
		    var length = component[1].length;
		    while (length > 0) {
		      var opLength = 0;
		      switch (component[0]) {
		        case diff.INSERT:
		          opLength = Math.min(otherIter.peekLength(), length);
		          delta.push(otherIter.next(opLength));
		          break;
		        case diff.DELETE:
		          opLength = Math.min(length, thisIter.peekLength());
		          thisIter.next(opLength);
		          delta['delete'](opLength);
		          break;
		        case diff.EQUAL:
		          opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length);
		          var thisOp = thisIter.next(opLength);
		          var otherOp = otherIter.next(opLength);
		          if (equal(thisOp.insert, otherOp.insert)) {
		            delta.retain(opLength, op.attributes.diff(thisOp.attributes, otherOp.attributes));
		          } else {
		            delta.push(otherOp)['delete'](opLength);
		          }
		          break;
		      }
		      length -= opLength;
		    }
		  });
		  return delta.chop();
		};
	
		Delta.prototype.eachLine = function (predicate, newline) {
		  newline = newline || '\n';
		  var iter = op.iterator(this.ops);
		  var line = new Delta();
		  while (iter.hasNext()) {
		    if (iter.peekType() !== 'insert') return;
		    var thisOp = iter.peek();
		    var start = op.length(thisOp) - iter.peekLength();
		    var index = typeof thisOp.insert === 'string' ?
		      thisOp.insert.indexOf(newline, start) - start : -1;
		    if (index < 0) {
		      line.push(iter.next());
		    } else if (index > 0) {
		      line.push(iter.next(index));
		    } else {
		      predicate(line, iter.next(1).attributes || {});
		      line = new Delta();
		    }
		  }
		  if (line.length() > 0) {
		    predicate(line, {});
		  }
		};
	
		Delta.prototype.transform = function (other, priority) {
		  priority = !!priority;
		  if (typeof other === 'number') {
		    return this.transformPosition(other, priority);
		  }
		  var thisIter = op.iterator(this.ops);
		  var otherIter = op.iterator(other.ops);
		  var delta = new Delta();
		  while (thisIter.hasNext() || otherIter.hasNext()) {
		    if (thisIter.peekType() === 'insert' && (priority || otherIter.peekType() !== 'insert')) {
		      delta.retain(op.length(thisIter.next()));
		    } else if (otherIter.peekType() === 'insert') {
		      delta.push(otherIter.next());
		    } else {
		      var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
		      var thisOp = thisIter.next(length);
		      var otherOp = otherIter.next(length);
		      if (thisOp['delete']) {
		        // Our delete either makes their delete redundant or removes their retain
		        continue;
		      } else if (otherOp['delete']) {
		        delta.push(otherOp);
		      } else {
		        // We retain either their retain or insert
		        delta.retain(length, op.attributes.transform(thisOp.attributes, otherOp.attributes, priority));
		      }
		    }
		  }
		  return delta.chop();
		};
	
		Delta.prototype.transformPosition = function (index, priority) {
		  priority = !!priority;
		  var thisIter = op.iterator(this.ops);
		  var offset = 0;
		  while (thisIter.hasNext() && offset <= index) {
		    var length = thisIter.peekLength();
		    var nextType = thisIter.peekType();
		    thisIter.next();
		    if (nextType === 'delete') {
		      index -= Math.min(length, index - offset);
		      continue;
		    } else if (nextType === 'insert' && (offset < index || !priority)) {
		      index += length;
		    }
		    offset += length;
		  }
		  return index;
		};
	
	
		module.exports = Delta;
	
	
	/***/ },
	/* 21 */
	/***/ function(module, exports) {
	
		/**
		 * This library modifies the diff-patch-match library by Neil Fraser
		 * by removing the patch and match functionality and certain advanced
		 * options in the diff function. The original license is as follows:
		 *
		 * ===
		 *
		 * Diff Match and Patch
		 *
		 * Copyright 2006 Google Inc.
		 * http://code.google.com/p/google-diff-match-patch/
		 *
		 * Licensed under the Apache License, Version 2.0 (the "License");
		 * you may not use this file except in compliance with the License.
		 * You may obtain a copy of the License at
		 *
		 *   http://www.apache.org/licenses/LICENSE-2.0
		 *
		 * Unless required by applicable law or agreed to in writing, software
		 * distributed under the License is distributed on an "AS IS" BASIS,
		 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		 * See the License for the specific language governing permissions and
		 * limitations under the License.
		 */
	
	
		/**
		 * The data structure representing a diff is an array of tuples:
		 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
		 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
		 */
		var DIFF_DELETE = -1;
		var DIFF_INSERT = 1;
		var DIFF_EQUAL = 0;
	
	
		/**
		 * Find the differences between two texts.  Simplifies the problem by stripping
		 * any common prefix or suffix off the texts before diffing.
		 * @param {string} text1 Old string to be diffed.
		 * @param {string} text2 New string to be diffed.
		 * @param {Int} cursor_pos Expected edit position in text1 (optional)
		 * @return {Array} Array of diff tuples.
		 */
		function diff_main(text1, text2, cursor_pos) {
		  // Check for equality (speedup).
		  if (text1 == text2) {
		    if (text1) {
		      return [[DIFF_EQUAL, text1]];
		    }
		    return [];
		  }
	
		  // Check cursor_pos within bounds
		  if (cursor_pos < 0 || text1.length < cursor_pos) {
		    cursor_pos = null;
		  }
	
		  // Trim off common prefix (speedup).
		  var commonlength = diff_commonPrefix(text1, text2);
		  var commonprefix = text1.substring(0, commonlength);
		  text1 = text1.substring(commonlength);
		  text2 = text2.substring(commonlength);
	
		  // Trim off common suffix (speedup).
		  commonlength = diff_commonSuffix(text1, text2);
		  var commonsuffix = text1.substring(text1.length - commonlength);
		  text1 = text1.substring(0, text1.length - commonlength);
		  text2 = text2.substring(0, text2.length - commonlength);
	
		  // Compute the diff on the middle block.
		  var diffs = diff_compute_(text1, text2);
	
		  // Restore the prefix and suffix.
		  if (commonprefix) {
		    diffs.unshift([DIFF_EQUAL, commonprefix]);
		  }
		  if (commonsuffix) {
		    diffs.push([DIFF_EQUAL, commonsuffix]);
		  }
		  diff_cleanupMerge(diffs);
		  if (cursor_pos != null) {
		    diffs = fix_cursor(diffs, cursor_pos);
		  }
		  return diffs;
		};
	
	
		/**
		 * Find the differences between two texts.  Assumes that the texts do not
		 * have any common prefix or suffix.
		 * @param {string} text1 Old string to be diffed.
		 * @param {string} text2 New string to be diffed.
		 * @return {Array} Array of diff tuples.
		 */
		function diff_compute_(text1, text2) {
		  var diffs;
	
		  if (!text1) {
		    // Just add some text (speedup).
		    return [[DIFF_INSERT, text2]];
		  }
	
		  if (!text2) {
		    // Just delete some text (speedup).
		    return [[DIFF_DELETE, text1]];
		  }
	
		  var longtext = text1.length > text2.length ? text1 : text2;
		  var shorttext = text1.length > text2.length ? text2 : text1;
		  var i = longtext.indexOf(shorttext);
		  if (i != -1) {
		    // Shorter text is inside the longer text (speedup).
		    diffs = [[DIFF_INSERT, longtext.substring(0, i)],
		             [DIFF_EQUAL, shorttext],
		             [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
		    // Swap insertions for deletions if diff is reversed.
		    if (text1.length > text2.length) {
		      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
		    }
		    return diffs;
		  }
	
		  if (shorttext.length == 1) {
		    // Single character string.
		    // After the previous speedup, the character can't be an equality.
		    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
		  }
	
		  // Check to see if the problem can be split in two.
		  var hm = diff_halfMatch_(text1, text2);
		  if (hm) {
		    // A half-match was found, sort out the return data.
		    var text1_a = hm[0];
		    var text1_b = hm[1];
		    var text2_a = hm[2];
		    var text2_b = hm[3];
		    var mid_common = hm[4];
		    // Send both pairs off for separate processing.
		    var diffs_a = diff_main(text1_a, text2_a);
		    var diffs_b = diff_main(text1_b, text2_b);
		    // Merge the results.
		    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
		  }
	
		  return diff_bisect_(text1, text2);
		};
	
	
		/**
		 * Find the 'middle snake' of a diff, split the problem in two
		 * and return the recursively constructed diff.
		 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
		 * @param {string} text1 Old string to be diffed.
		 * @param {string} text2 New string to be diffed.
		 * @return {Array} Array of diff tuples.
		 * @private
		 */
		function diff_bisect_(text1, text2) {
		  // Cache the text lengths to prevent multiple calls.
		  var text1_length = text1.length;
		  var text2_length = text2.length;
		  var max_d = Math.ceil((text1_length + text2_length) / 2);
		  var v_offset = max_d;
		  var v_length = 2 * max_d;
		  var v1 = new Array(v_length);
		  var v2 = new Array(v_length);
		  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
		  // integers and undefined.
		  for (var x = 0; x < v_length; x++) {
		    v1[x] = -1;
		    v2[x] = -1;
		  }
		  v1[v_offset + 1] = 0;
		  v2[v_offset + 1] = 0;
		  var delta = text1_length - text2_length;
		  // If the total number of characters is odd, then the front path will collide
		  // with the reverse path.
		  var front = (delta % 2 != 0);
		  // Offsets for start and end of k loop.
		  // Prevents mapping of space beyond the grid.
		  var k1start = 0;
		  var k1end = 0;
		  var k2start = 0;
		  var k2end = 0;
		  for (var d = 0; d < max_d; d++) {
		    // Walk the front path one step.
		    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
		      var k1_offset = v_offset + k1;
		      var x1;
		      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
		        x1 = v1[k1_offset + 1];
		      } else {
		        x1 = v1[k1_offset - 1] + 1;
		      }
		      var y1 = x1 - k1;
		      while (x1 < text1_length && y1 < text2_length &&
		             text1.charAt(x1) == text2.charAt(y1)) {
		        x1++;
		        y1++;
		      }
		      v1[k1_offset] = x1;
		      if (x1 > text1_length) {
		        // Ran off the right of the graph.
		        k1end += 2;
		      } else if (y1 > text2_length) {
		        // Ran off the bottom of the graph.
		        k1start += 2;
		      } else if (front) {
		        var k2_offset = v_offset + delta - k1;
		        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
		          // Mirror x2 onto top-left coordinate system.
		          var x2 = text1_length - v2[k2_offset];
		          if (x1 >= x2) {
		            // Overlap detected.
		            return diff_bisectSplit_(text1, text2, x1, y1);
		          }
		        }
		      }
		    }
	
		    // Walk the reverse path one step.
		    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
		      var k2_offset = v_offset + k2;
		      var x2;
		      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
		        x2 = v2[k2_offset + 1];
		      } else {
		        x2 = v2[k2_offset - 1] + 1;
		      }
		      var y2 = x2 - k2;
		      while (x2 < text1_length && y2 < text2_length &&
		             text1.charAt(text1_length - x2 - 1) ==
		             text2.charAt(text2_length - y2 - 1)) {
		        x2++;
		        y2++;
		      }
		      v2[k2_offset] = x2;
		      if (x2 > text1_length) {
		        // Ran off the left of the graph.
		        k2end += 2;
		      } else if (y2 > text2_length) {
		        // Ran off the top of the graph.
		        k2start += 2;
		      } else if (!front) {
		        var k1_offset = v_offset + delta - k2;
		        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
		          var x1 = v1[k1_offset];
		          var y1 = v_offset + x1 - k1_offset;
		          // Mirror x2 onto top-left coordinate system.
		          x2 = text1_length - x2;
		          if (x1 >= x2) {
		            // Overlap detected.
		            return diff_bisectSplit_(text1, text2, x1, y1);
		          }
		        }
		      }
		    }
		  }
		  // Diff took too long and hit the deadline or
		  // number of diffs equals number of characters, no commonality at all.
		  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
		};
	
	
		/**
		 * Given the location of the 'middle snake', split the diff in two parts
		 * and recurse.
		 * @param {string} text1 Old string to be diffed.
		 * @param {string} text2 New string to be diffed.
		 * @param {number} x Index of split point in text1.
		 * @param {number} y Index of split point in text2.
		 * @return {Array} Array of diff tuples.
		 */
		function diff_bisectSplit_(text1, text2, x, y) {
		  var text1a = text1.substring(0, x);
		  var text2a = text2.substring(0, y);
		  var text1b = text1.substring(x);
		  var text2b = text2.substring(y);
	
		  // Compute both diffs serially.
		  var diffs = diff_main(text1a, text2a);
		  var diffsb = diff_main(text1b, text2b);
	
		  return diffs.concat(diffsb);
		};
	
	
		/**
		 * Determine the common prefix of two strings.
		 * @param {string} text1 First string.
		 * @param {string} text2 Second string.
		 * @return {number} The number of characters common to the start of each
		 *     string.
		 */
		function diff_commonPrefix(text1, text2) {
		  // Quick check for common null cases.
		  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
		    return 0;
		  }
		  // Binary search.
		  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
		  var pointermin = 0;
		  var pointermax = Math.min(text1.length, text2.length);
		  var pointermid = pointermax;
		  var pointerstart = 0;
		  while (pointermin < pointermid) {
		    if (text1.substring(pointerstart, pointermid) ==
		        text2.substring(pointerstart, pointermid)) {
		      pointermin = pointermid;
		      pointerstart = pointermin;
		    } else {
		      pointermax = pointermid;
		    }
		    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
		  }
		  return pointermid;
		};
	
	
		/**
		 * Determine the common suffix of two strings.
		 * @param {string} text1 First string.
		 * @param {string} text2 Second string.
		 * @return {number} The number of characters common to the end of each string.
		 */
		function diff_commonSuffix(text1, text2) {
		  // Quick check for common null cases.
		  if (!text1 || !text2 ||
		      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
		    return 0;
		  }
		  // Binary search.
		  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
		  var pointermin = 0;
		  var pointermax = Math.min(text1.length, text2.length);
		  var pointermid = pointermax;
		  var pointerend = 0;
		  while (pointermin < pointermid) {
		    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
		        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
		      pointermin = pointermid;
		      pointerend = pointermin;
		    } else {
		      pointermax = pointermid;
		    }
		    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
		  }
		  return pointermid;
		};
	
	
		/**
		 * Do the two texts share a substring which is at least half the length of the
		 * longer text?
		 * This speedup can produce non-minimal diffs.
		 * @param {string} text1 First string.
		 * @param {string} text2 Second string.
		 * @return {Array.<string>} Five element Array, containing the prefix of
		 *     text1, the suffix of text1, the prefix of text2, the suffix of
		 *     text2 and the common middle.  Or null if there was no match.
		 */
		function diff_halfMatch_(text1, text2) {
		  var longtext = text1.length > text2.length ? text1 : text2;
		  var shorttext = text1.length > text2.length ? text2 : text1;
		  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
		    return null;  // Pointless.
		  }
	
		  /**
		   * Does a substring of shorttext exist within longtext such that the substring
		   * is at least half the length of longtext?
		   * Closure, but does not reference any external variables.
		   * @param {string} longtext Longer string.
		   * @param {string} shorttext Shorter string.
		   * @param {number} i Start index of quarter length substring within longtext.
		   * @return {Array.<string>} Five element Array, containing the prefix of
		   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
		   *     of shorttext and the common middle.  Or null if there was no match.
		   * @private
		   */
		  function diff_halfMatchI_(longtext, shorttext, i) {
		    // Start with a 1/4 length substring at position i as a seed.
		    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
		    var j = -1;
		    var best_common = '';
		    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
		    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
		      var prefixLength = diff_commonPrefix(longtext.substring(i),
		                                           shorttext.substring(j));
		      var suffixLength = diff_commonSuffix(longtext.substring(0, i),
		                                           shorttext.substring(0, j));
		      if (best_common.length < suffixLength + prefixLength) {
		        best_common = shorttext.substring(j - suffixLength, j) +
		            shorttext.substring(j, j + prefixLength);
		        best_longtext_a = longtext.substring(0, i - suffixLength);
		        best_longtext_b = longtext.substring(i + prefixLength);
		        best_shorttext_a = shorttext.substring(0, j - suffixLength);
		        best_shorttext_b = shorttext.substring(j + prefixLength);
		      }
		    }
		    if (best_common.length * 2 >= longtext.length) {
		      return [best_longtext_a, best_longtext_b,
		              best_shorttext_a, best_shorttext_b, best_common];
		    } else {
		      return null;
		    }
		  }
	
		  // First check if the second quarter is the seed for a half-match.
		  var hm1 = diff_halfMatchI_(longtext, shorttext,
		                             Math.ceil(longtext.length / 4));
		  // Check again based on the third quarter.
		  var hm2 = diff_halfMatchI_(longtext, shorttext,
		                             Math.ceil(longtext.length / 2));
		  var hm;
		  if (!hm1 && !hm2) {
		    return null;
		  } else if (!hm2) {
		    hm = hm1;
		  } else if (!hm1) {
		    hm = hm2;
		  } else {
		    // Both matched.  Select the longest.
		    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
		  }
	
		  // A half-match was found, sort out the return data.
		  var text1_a, text1_b, text2_a, text2_b;
		  if (text1.length > text2.length) {
		    text1_a = hm[0];
		    text1_b = hm[1];
		    text2_a = hm[2];
		    text2_b = hm[3];
		  } else {
		    text2_a = hm[0];
		    text2_b = hm[1];
		    text1_a = hm[2];
		    text1_b = hm[3];
		  }
		  var mid_common = hm[4];
		  return [text1_a, text1_b, text2_a, text2_b, mid_common];
		};
	
	
		/**
		 * Reorder and merge like edit sections.  Merge equalities.
		 * Any edit section can move as long as it doesn't cross an equality.
		 * @param {Array} diffs Array of diff tuples.
		 */
		function diff_cleanupMerge(diffs) {
		  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
		  var pointer = 0;
		  var count_delete = 0;
		  var count_insert = 0;
		  var text_delete = '';
		  var text_insert = '';
		  var commonlength;
		  while (pointer < diffs.length) {
		    switch (diffs[pointer][0]) {
		      case DIFF_INSERT:
		        count_insert++;
		        text_insert += diffs[pointer][1];
		        pointer++;
		        break;
		      case DIFF_DELETE:
		        count_delete++;
		        text_delete += diffs[pointer][1];
		        pointer++;
		        break;
		      case DIFF_EQUAL:
		        // Upon reaching an equality, check for prior redundancies.
		        if (count_delete + count_insert > 1) {
		          if (count_delete !== 0 && count_insert !== 0) {
		            // Factor out any common prefixies.
		            commonlength = diff_commonPrefix(text_insert, text_delete);
		            if (commonlength !== 0) {
		              if ((pointer - count_delete - count_insert) > 0 &&
		                  diffs[pointer - count_delete - count_insert - 1][0] ==
		                  DIFF_EQUAL) {
		                diffs[pointer - count_delete - count_insert - 1][1] +=
		                    text_insert.substring(0, commonlength);
		              } else {
		                diffs.splice(0, 0, [DIFF_EQUAL,
		                                    text_insert.substring(0, commonlength)]);
		                pointer++;
		              }
		              text_insert = text_insert.substring(commonlength);
		              text_delete = text_delete.substring(commonlength);
		            }
		            // Factor out any common suffixies.
		            commonlength = diff_commonSuffix(text_insert, text_delete);
		            if (commonlength !== 0) {
		              diffs[pointer][1] = text_insert.substring(text_insert.length -
		                  commonlength) + diffs[pointer][1];
		              text_insert = text_insert.substring(0, text_insert.length -
		                  commonlength);
		              text_delete = text_delete.substring(0, text_delete.length -
		                  commonlength);
		            }
		          }
		          // Delete the offending records and add the merged ones.
		          if (count_delete === 0) {
		            diffs.splice(pointer - count_insert,
		                count_delete + count_insert, [DIFF_INSERT, text_insert]);
		          } else if (count_insert === 0) {
		            diffs.splice(pointer - count_delete,
		                count_delete + count_insert, [DIFF_DELETE, text_delete]);
		          } else {
		            diffs.splice(pointer - count_delete - count_insert,
		                count_delete + count_insert, [DIFF_DELETE, text_delete],
		                [DIFF_INSERT, text_insert]);
		          }
		          pointer = pointer - count_delete - count_insert +
		                    (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
		        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
		          // Merge this equality with the previous one.
		          diffs[pointer - 1][1] += diffs[pointer][1];
		          diffs.splice(pointer, 1);
		        } else {
		          pointer++;
		        }
		        count_insert = 0;
		        count_delete = 0;
		        text_delete = '';
		        text_insert = '';
		        break;
		    }
		  }
		  if (diffs[diffs.length - 1][1] === '') {
		    diffs.pop();  // Remove the dummy entry at the end.
		  }
	
		  // Second pass: look for single edits surrounded on both sides by equalities
		  // which can be shifted sideways to eliminate an equality.
		  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
		  var changes = false;
		  pointer = 1;
		  // Intentionally ignore the first and last element (don't need checking).
		  while (pointer < diffs.length - 1) {
		    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
		        diffs[pointer + 1][0] == DIFF_EQUAL) {
		      // This is a single edit surrounded by equalities.
		      if (diffs[pointer][1].substring(diffs[pointer][1].length -
		          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
		        // Shift the edit over the previous equality.
		        diffs[pointer][1] = diffs[pointer - 1][1] +
		            diffs[pointer][1].substring(0, diffs[pointer][1].length -
		                                        diffs[pointer - 1][1].length);
		        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
		        diffs.splice(pointer - 1, 1);
		        changes = true;
		      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
		          diffs[pointer + 1][1]) {
		        // Shift the edit over the next equality.
		        diffs[pointer - 1][1] += diffs[pointer + 1][1];
		        diffs[pointer][1] =
		            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
		            diffs[pointer + 1][1];
		        diffs.splice(pointer + 1, 1);
		        changes = true;
		      }
		    }
		    pointer++;
		  }
		  // If shifts were made, the diff needs reordering and another shift sweep.
		  if (changes) {
		    diff_cleanupMerge(diffs);
		  }
		};
	
	
		var diff = diff_main;
		diff.INSERT = DIFF_INSERT;
		diff.DELETE = DIFF_DELETE;
		diff.EQUAL = DIFF_EQUAL;
	
		module.exports = diff;
	
		/*
		 * Modify a diff such that the cursor position points to the start of a change:
		 * E.g.
		 *   cursor_normalize_diff([[DIFF_EQUAL, 'abc']], 1)
		 *     => [1, [[DIFF_EQUAL, 'a'], [DIFF_EQUAL, 'bc']]]
		 *   cursor_normalize_diff([[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xyz']], 2)
		 *     => [2, [[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xy'], [DIFF_DELETE, 'z']]]
		 *
		 * @param {Array} diffs Array of diff tuples
		 * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
		 * @return {Array} A tuple [cursor location in the modified diff, modified diff]
		 */
		function cursor_normalize_diff (diffs, cursor_pos) {
		  if (cursor_pos === 0) {
		    return [DIFF_EQUAL, diffs];
		  }
		  for (var current_pos = 0, i = 0; i < diffs.length; i++) {
		    var d = diffs[i];
		    if (d[0] === DIFF_DELETE || d[0] === DIFF_EQUAL) {
		      var next_pos = current_pos + d[1].length;
		      if (cursor_pos === next_pos) {
		        return [i + 1, diffs];
		      } else if (cursor_pos < next_pos) {
		        // copy to prevent side effects
		        diffs = diffs.slice();
		        // split d into two diff changes
		        var split_pos = cursor_pos - current_pos;
		        var d_left = [d[0], d[1].slice(0, split_pos)];
		        var d_right = [d[0], d[1].slice(split_pos)];
		        diffs.splice(i, 1, d_left, d_right);
		        return [i + 1, diffs];
		      } else {
		        current_pos = next_pos;
		      }
		    }
		  }
		  throw new Error('cursor_pos is out of bounds!')
		}
	
		/*
		 * Modify a diff such that the edit position is "shifted" to the proposed edit location (cursor_position).
		 *
		 * Case 1)
		 *   Check if a naive shift is possible:
		 *     [0, X], [ 1, Y] -> [ 1, Y], [0, X]    (if X + Y === Y + X)
		 *     [0, X], [-1, Y] -> [-1, Y], [0, X]    (if X + Y === Y + X) - holds same result
		 * Case 2)
		 *   Check if the following shifts are possible:
		 *     [0, 'pre'], [ 1, 'prefix'] -> [ 1, 'pre'], [0, 'pre'], [ 1, 'fix']
		 *     [0, 'pre'], [-1, 'prefix'] -> [-1, 'pre'], [0, 'pre'], [-1, 'fix']
		 *         ^            ^
		 *         d          d_next
		 *
		 * @param {Array} diffs Array of diff tuples
		 * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
		 * @return {Array} Array of diff tuples
		 */
		function fix_cursor (diffs, cursor_pos) {
		  var norm = cursor_normalize_diff(diffs, cursor_pos);
		  var ndiffs = norm[1];
		  var cursor_pointer = norm[0];
		  var d = ndiffs[cursor_pointer];
		  var d_next = ndiffs[cursor_pointer + 1];
	
		  if (d == null) {
		    // Text was deleted from end of original string,
		    // cursor is now out of bounds in new string
		    return diffs;
		  } else if (d[0] !== DIFF_EQUAL) {
		    // A modification happened at the cursor location.
		    // This is the expected outcome, so we can return the original diff.
		    return diffs;
		  } else {
		    if (d_next != null && d[1] + d_next[1] === d_next[1] + d[1]) {
		      // Case 1)
		      // It is possible to perform a naive shift
		      ndiffs.splice(cursor_pointer, 2, d_next, d)
		      return merge_tuples(ndiffs, cursor_pointer, 2)
		    } else if (d_next != null && d_next[1].indexOf(d[1]) === 0) {
		      // Case 2)
		      // d[1] is a prefix of d_next[1]
		      // We can assume that d_next[0] !== 0, since d[0] === 0
		      // Shift edit locations..
		      ndiffs.splice(cursor_pointer, 2, [d_next[0], d[1]], [0, d[1]]);
		      var suffix = d_next[1].slice(d[1].length);
		      if (suffix.length > 0) {
		        ndiffs.splice(cursor_pointer + 2, 0, [d_next[0], suffix]);
		      }
		      return merge_tuples(ndiffs, cursor_pointer, 3)
		    } else {
		      // Not possible to perform any modification
		      return diffs;
		    }
		  }
	
		}
	
		/*
		 * Try to merge tuples with their neigbors in a given range.
		 * E.g. [0, 'a'], [0, 'b'] -> [0, 'ab']
		 *
		 * @param {Array} diffs Array of diff tuples.
		 * @param {Int} start Position of the first element to merge (diffs[start] is also merged with diffs[start - 1]).
		 * @param {Int} length Number of consecutive elements to check.
		 * @return {Array} Array of merged diff tuples.
		 */
		function merge_tuples (diffs, start, length) {
		  // Check from (start-1) to (start+length).
		  for (var i = start + length - 1; i >= 0 && i >= start - 1; i--) {
		    if (i + 1 < diffs.length) {
		      var left_d = diffs[i];
		      var right_d = diffs[i+1];
		      if (left_d[0] === right_d[1]) {
		        diffs.splice(i, 2, [left_d[0], left_d[1] + right_d[1]]);
		      }
		    }
		  }
		  return diffs;
		}
	
	
	/***/ },
	/* 22 */
	/***/ function(module, exports, __webpack_require__) {
	
		var pSlice = Array.prototype.slice;
		var objectKeys = __webpack_require__(23);
		var isArguments = __webpack_require__(24);
	
		var deepEqual = module.exports = function (actual, expected, opts) {
		  if (!opts) opts = {};
		  // 7.1. All identical values are equivalent, as determined by ===.
		  if (actual === expected) {
		    return true;
	
		  } else if (actual instanceof Date && expected instanceof Date) {
		    return actual.getTime() === expected.getTime();
	
		  // 7.3. Other pairs that do not both pass typeof value == 'object',
		  // equivalence is determined by ==.
		  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
		    return opts.strict ? actual === expected : actual == expected;
	
		  // 7.4. For all other Object pairs, including Array objects, equivalence is
		  // determined by having the same number of owned properties (as verified
		  // with Object.prototype.hasOwnProperty.call), the same set of keys
		  // (although not necessarily the same order), equivalent values for every
		  // corresponding key, and an identical 'prototype' property. Note: this
		  // accounts for both named and indexed properties on Arrays.
		  } else {
		    return objEquiv(actual, expected, opts);
		  }
		}
	
		function isUndefinedOrNull(value) {
		  return value === null || value === undefined;
		}
	
		function isBuffer (x) {
		  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
		  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
		    return false;
		  }
		  if (x.length > 0 && typeof x[0] !== 'number') return false;
		  return true;
		}
	
		function objEquiv(a, b, opts) {
		  var i, key;
		  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
		    return false;
		  // an identical 'prototype' property.
		  if (a.prototype !== b.prototype) return false;
		  //~~~I've managed to break Object.keys through screwy arguments passing.
		  //   Converting to array solves the problem.
		  if (isArguments(a)) {
		    if (!isArguments(b)) {
		      return false;
		    }
		    a = pSlice.call(a);
		    b = pSlice.call(b);
		    return deepEqual(a, b, opts);
		  }
		  if (isBuffer(a)) {
		    if (!isBuffer(b)) {
		      return false;
		    }
		    if (a.length !== b.length) return false;
		    for (i = 0; i < a.length; i++) {
		      if (a[i] !== b[i]) return false;
		    }
		    return true;
		  }
		  try {
		    var ka = objectKeys(a),
		        kb = objectKeys(b);
		  } catch (e) {//happens when one is a string literal and the other isn't
		    return false;
		  }
		  // having the same number of owned properties (keys incorporates
		  // hasOwnProperty)
		  if (ka.length != kb.length)
		    return false;
		  //the same set of keys (although not necessarily the same order),
		  ka.sort();
		  kb.sort();
		  //~~~cheap key test
		  for (i = ka.length - 1; i >= 0; i--) {
		    if (ka[i] != kb[i])
		      return false;
		  }
		  //equivalent values for every corresponding key, and
		  //~~~possibly expensive deep test
		  for (i = ka.length - 1; i >= 0; i--) {
		    key = ka[i];
		    if (!deepEqual(a[key], b[key], opts)) return false;
		  }
		  return typeof a === typeof b;
		}
	
	
	/***/ },
	/* 23 */
	/***/ function(module, exports) {
	
		exports = module.exports = typeof Object.keys === 'function'
		  ? Object.keys : shim;
	
		exports.shim = shim;
		function shim (obj) {
		  var keys = [];
		  for (var key in obj) keys.push(key);
		  return keys;
		}
	
	
	/***/ },
	/* 24 */
	/***/ function(module, exports) {
	
		var supportsArgumentsClass = (function(){
		  return Object.prototype.toString.call(arguments)
		})() == '[object Arguments]';
	
		exports = module.exports = supportsArgumentsClass ? supported : unsupported;
	
		exports.supported = supported;
		function supported(object) {
		  return Object.prototype.toString.call(object) == '[object Arguments]';
		};
	
		exports.unsupported = unsupported;
		function unsupported(object){
		  return object &&
		    typeof object == 'object' &&
		    typeof object.length == 'number' &&
		    Object.prototype.hasOwnProperty.call(object, 'callee') &&
		    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
		    false;
		};
	
	
	/***/ },
	/* 25 */
	/***/ function(module, exports) {
	
		'use strict';
	
		var hasOwn = Object.prototype.hasOwnProperty;
		var toStr = Object.prototype.toString;
	
		var isArray = function isArray(arr) {
			if (typeof Array.isArray === 'function') {
				return Array.isArray(arr);
			}
	
			return toStr.call(arr) === '[object Array]';
		};
	
		var isPlainObject = function isPlainObject(obj) {
			if (!obj || toStr.call(obj) !== '[object Object]') {
				return false;
			}
	
			var hasOwnConstructor = hasOwn.call(obj, 'constructor');
			var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
			// Not own constructor property must be Object
			if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
				return false;
			}
	
			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.
			var key;
			for (key in obj) {/**/}
	
			return typeof key === 'undefined' || hasOwn.call(obj, key);
		};
	
		module.exports = function extend() {
			var options, name, src, copy, copyIsArray, clone,
				target = arguments[0],
				i = 1,
				length = arguments.length,
				deep = false;
	
			// Handle a deep copy situation
			if (typeof target === 'boolean') {
				deep = target;
				target = arguments[1] || {};
				// skip the boolean and the target
				i = 2;
			} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
				target = {};
			}
	
			for (; i < length; ++i) {
				options = arguments[i];
				// Only deal with non-null/undefined values
				if (options != null) {
					// Extend the base object
					for (name in options) {
						src = target[name];
						copy = options[name];
	
						// Prevent never-ending loop
						if (target !== copy) {
							// Recurse if we're merging plain objects or arrays
							if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
								if (copyIsArray) {
									copyIsArray = false;
									clone = src && isArray(src) ? src : [];
								} else {
									clone = src && isPlainObject(src) ? src : {};
								}
	
								// Never move original objects, clone them
								target[name] = extend(deep, clone, copy);
	
							// Don't bring in undefined values
							} else if (typeof copy !== 'undefined') {
								target[name] = copy;
							}
						}
					}
				}
			}
	
			// Return the modified object
			return target;
		};
	
	
	
	/***/ },
	/* 26 */
	/***/ function(module, exports, __webpack_require__) {
	
		var equal = __webpack_require__(22);
		var extend = __webpack_require__(25);
	
	
		var lib = {
		  attributes: {
		    compose: function (a, b, keepNull) {
		      if (typeof a !== 'object') a = {};
		      if (typeof b !== 'object') b = {};
		      var attributes = extend(true, {}, b);
		      if (!keepNull) {
		        attributes = Object.keys(attributes).reduce(function (copy, key) {
		          if (attributes[key] != null) {
		            copy[key] = attributes[key];
		          }
		          return copy;
		        }, {});
		      }
		      for (var key in a) {
		        if (a[key] !== undefined && b[key] === undefined) {
		          attributes[key] = a[key];
		        }
		      }
		      return Object.keys(attributes).length > 0 ? attributes : undefined;
		    },
	
		    diff: function(a, b) {
		      if (typeof a !== 'object') a = {};
		      if (typeof b !== 'object') b = {};
		      var attributes = Object.keys(a).concat(Object.keys(b)).reduce(function (attributes, key) {
		        if (!equal(a[key], b[key])) {
		          attributes[key] = b[key] === undefined ? null : b[key];
		        }
		        return attributes;
		      }, {});
		      return Object.keys(attributes).length > 0 ? attributes : undefined;
		    },
	
		    transform: function (a, b, priority) {
		      if (typeof a !== 'object') return b;
		      if (typeof b !== 'object') return undefined;
		      if (!priority) return b;  // b simply overwrites us without priority
		      var attributes = Object.keys(b).reduce(function (attributes, key) {
		        if (a[key] === undefined) attributes[key] = b[key];  // null is a valid value
		        return attributes;
		      }, {});
		      return Object.keys(attributes).length > 0 ? attributes : undefined;
		    }
		  },
	
		  iterator: function (ops) {
		    return new Iterator(ops);
		  },
	
		  length: function (op) {
		    if (typeof op['delete'] === 'number') {
		      return op['delete'];
		    } else if (typeof op.retain === 'number') {
		      return op.retain;
		    } else {
		      return typeof op.insert === 'string' ? op.insert.length : 1;
		    }
		  }
		};
	
	
		function Iterator(ops) {
		  this.ops = ops;
		  this.index = 0;
		  this.offset = 0;
		};
	
		Iterator.prototype.hasNext = function () {
		  return this.peekLength() < Infinity;
		};
	
		Iterator.prototype.next = function (length) {
		  if (!length) length = Infinity;
		  var nextOp = this.ops[this.index];
		  if (nextOp) {
		    var offset = this.offset;
		    var opLength = lib.length(nextOp)
		    if (length >= opLength - offset) {
		      length = opLength - offset;
		      this.index += 1;
		      this.offset = 0;
		    } else {
		      this.offset += length;
		    }
		    if (typeof nextOp['delete'] === 'number') {
		      return { 'delete': length };
		    } else {
		      var retOp = {};
		      if (nextOp.attributes) {
		        retOp.attributes = nextOp.attributes;
		      }
		      if (typeof nextOp.retain === 'number') {
		        retOp.retain = length;
		      } else if (typeof nextOp.insert === 'string') {
		        retOp.insert = nextOp.insert.substr(offset, length);
		      } else {
		        // offset should === 0, length should === 1
		        retOp.insert = nextOp.insert;
		      }
		      return retOp;
		    }
		  } else {
		    return { retain: Infinity };
		  }
		};
	
		Iterator.prototype.peek = function () {
		  return this.ops[this.index];
		};
	
		Iterator.prototype.peekLength = function () {
		  if (this.ops[this.index]) {
		    // Should never return 0 if our index is being managed correctly
		    return lib.length(this.ops[this.index]) - this.offset;
		  } else {
		    return Infinity;
		  }
		};
	
		Iterator.prototype.peekType = function () {
		  if (this.ops[this.index]) {
		    if (typeof this.ops[this.index]['delete'] === 'number') {
		      return 'delete';
		    } else if (typeof this.ops[this.index].retain === 'number') {
		      return 'retain';
		    } else {
		      return 'insert';
		    }
		  }
		  return 'retain';
		};
	
	
		module.exports = lib;
	
	
	/***/ },
	/* 27 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _quillDelta = __webpack_require__(20);
	
		var _quillDelta2 = _interopRequireDefault(_quillDelta);
	
		var _op = __webpack_require__(26);
	
		var _op2 = _interopRequireDefault(_op);
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _code = __webpack_require__(28);
	
		var _code2 = _interopRequireDefault(_code);
	
		var _cursor = __webpack_require__(34);
	
		var _cursor2 = _interopRequireDefault(_cursor);
	
		var _block = __webpack_require__(29);
	
		var _block2 = _interopRequireDefault(_block);
	
		var _clone = __webpack_require__(38);
	
		var _clone2 = _interopRequireDefault(_clone);
	
		var _deepEqual = __webpack_require__(22);
	
		var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
		var _extend = __webpack_require__(25);
	
		var _extend2 = _interopRequireDefault(_extend);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		var Editor = function () {
		  function Editor(scroll) {
		    _classCallCheck(this, Editor);
	
		    this.scroll = scroll;
		    this.delta = this.getDelta();
		  }
	
		  _createClass(Editor, [{
		    key: 'applyDelta',
		    value: function applyDelta(delta) {
		      var _this = this;
	
		      var consumeNextNewline = false;
		      this.scroll.update();
		      var scrollLength = this.scroll.length();
		      this.scroll.batch = true;
		      delta = normalizeDelta(delta);
		      delta.reduce(function (index, op) {
		        var length = op.retain || op.delete || op.insert.length || 1;
		        var attributes = op.attributes || {};
		        if (op.insert != null) {
		          if (typeof op.insert === 'string') {
		            var text = op.insert;
		            if (text.endsWith('\n') && consumeNextNewline) {
		              consumeNextNewline = false;
		              text = text.slice(0, -1);
		            }
		            if (index >= scrollLength && !text.endsWith('\n')) {
		              consumeNextNewline = true;
		            }
		            _this.scroll.insertAt(index, text);
	
		            var _scroll$line = _this.scroll.line(index),
		                _scroll$line2 = _slicedToArray(_scroll$line, 2),
		                line = _scroll$line2[0],
		                offset = _scroll$line2[1];
	
		            var formats = (0, _extend2.default)({}, (0, _block.bubbleFormats)(line));
		            if (line instanceof _block2.default) {
		              var _line$descendant = line.descendant(_parchment2.default.Leaf, offset),
		                  _line$descendant2 = _slicedToArray(_line$descendant, 1),
		                  leaf = _line$descendant2[0];
	
		              formats = (0, _extend2.default)(formats, (0, _block.bubbleFormats)(leaf));
		            }
		            attributes = _op2.default.attributes.diff(formats, attributes) || {};
		          } else if (_typeof(op.insert) === 'object') {
		            var key = Object.keys(op.insert)[0]; // There should only be one key
		            if (key == null) return index;
		            _this.scroll.insertAt(index, key, op.insert[key]);
		          }
		          scrollLength += length;
		        }
		        Object.keys(attributes).forEach(function (name) {
		          _this.scroll.formatAt(index, length, name, attributes[name]);
		        });
		        return index + length;
		      }, 0);
		      delta.reduce(function (index, op) {
		        if (typeof op.delete === 'number') {
		          _this.scroll.deleteAt(index, op.delete);
		          return index;
		        }
		        return index + (op.retain || op.insert.length || 1);
		      }, 0);
		      this.scroll.batch = false;
		      this.scroll.optimize();
		      return this.update(delta);
		    }
		  }, {
		    key: 'deleteText',
		    value: function deleteText(index, length) {
		      this.scroll.deleteAt(index, length);
		      return this.update(new _quillDelta2.default().retain(index).delete(length));
		    }
		  }, {
		    key: 'formatLine',
		    value: function formatLine(index, length) {
		      var _this2 = this;
	
		      var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
		      this.scroll.update();
		      Object.keys(formats).forEach(function (format) {
		        if (_this2.scroll.whitelist != null && !_this2.scroll.whitelist[format]) return;
		        var lines = _this2.scroll.lines(index, Math.max(length, 1));
		        var lengthRemaining = length;
		        lines.forEach(function (line) {
		          var lineLength = line.length();
		          if (!(line instanceof _code2.default)) {
		            line.format(format, formats[format]);
		          } else {
		            var codeIndex = index - line.offset(_this2.scroll);
		            var codeLength = line.newlineIndex(codeIndex + lengthRemaining) - codeIndex + 1;
		            line.formatAt(codeIndex, codeLength, format, formats[format]);
		          }
		          lengthRemaining -= lineLength;
		        });
		      });
		      this.scroll.optimize();
		      return this.update(new _quillDelta2.default().retain(index).retain(length, (0, _clone2.default)(formats)));
		    }
		  }, {
		    key: 'formatText',
		    value: function formatText(index, length) {
		      var _this3 = this;
	
		      var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
		      Object.keys(formats).forEach(function (format) {
		        _this3.scroll.formatAt(index, length, format, formats[format]);
		      });
		      return this.update(new _quillDelta2.default().retain(index).retain(length, (0, _clone2.default)(formats)));
		    }
		  }, {
		    key: 'getContents',
		    value: function getContents(index, length) {
		      return this.delta.slice(index, index + length);
		    }
		  }, {
		    key: 'getDelta',
		    value: function getDelta() {
		      return this.scroll.lines().reduce(function (delta, line) {
		        return delta.concat(line.delta());
		      }, new _quillDelta2.default());
		    }
		  }, {
		    key: 'getFormat',
		    value: function getFormat(index) {
		      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
		      var lines = [],
		          leaves = [];
		      if (length === 0) {
		        this.scroll.path(index).forEach(function (path) {
		          var _path = _slicedToArray(path, 1),
		              blot = _path[0];
	
		          if (blot instanceof _block2.default) {
		            lines.push(blot);
		          } else if (blot instanceof _parchment2.default.Leaf) {
		            leaves.push(blot);
		          }
		        });
		      } else {
		        lines = this.scroll.lines(index, length);
		        leaves = this.scroll.descendants(_parchment2.default.Leaf, index, length);
		      }
		      var formatsArr = [lines, leaves].map(function (blots) {
		        if (blots.length === 0) return {};
		        var formats = (0, _block.bubbleFormats)(blots.shift());
		        while (Object.keys(formats).length > 0) {
		          var blot = blots.shift();
		          if (blot == null) return formats;
		          formats = combineFormats((0, _block.bubbleFormats)(blot), formats);
		        }
		        return formats;
		      });
		      return _extend2.default.apply(_extend2.default, formatsArr);
		    }
		  }, {
		    key: 'getText',
		    value: function getText(index, length) {
		      return this.getContents(index, length).filter(function (op) {
		        return typeof op.insert === 'string';
		      }).map(function (op) {
		        return op.insert;
		      }).join('');
		    }
		  }, {
		    key: 'insertEmbed',
		    value: function insertEmbed(index, embed, value) {
		      this.scroll.insertAt(index, embed, value);
		      return this.update(new _quillDelta2.default().retain(index).insert(_defineProperty({}, embed, value)));
		    }
		  }, {
		    key: 'insertText',
		    value: function insertText(index, text) {
		      var _this4 = this;
	
		      var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
		      text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
		      this.scroll.insertAt(index, text);
		      Object.keys(formats).forEach(function (format) {
		        _this4.scroll.formatAt(index, text.length, format, formats[format]);
		      });
		      return this.update(new _quillDelta2.default().retain(index).insert(text, (0, _clone2.default)(formats)));
		    }
		  }, {
		    key: 'isBlank',
		    value: function isBlank() {
		      if (this.scroll.children.length == 0) return true;
		      if (this.scroll.children.length > 1) return false;
		      var child = this.scroll.children.head;
		      return child.length() <= 1 && Object.keys(child.formats()).length == 0;
		    }
		  }, {
		    key: 'removeFormat',
		    value: function removeFormat(index, length) {
		      var text = this.getText(index, length);
	
		      var _scroll$line3 = this.scroll.line(index + length),
		          _scroll$line4 = _slicedToArray(_scroll$line3, 2),
		          line = _scroll$line4[0],
		          offset = _scroll$line4[1];
	
		      var suffixLength = 0,
		          suffix = new _quillDelta2.default();
		      if (line != null) {
		        if (!(line instanceof _code2.default)) {
		          suffixLength = line.length() - offset;
		        } else {
		          suffixLength = line.newlineIndex(offset) - offset + 1;
		        }
		        suffix = line.delta().slice(offset, offset + suffixLength - 1).insert('\n');
		      }
		      var contents = this.getContents(index, length + suffixLength);
		      var diff = contents.diff(new _quillDelta2.default().insert(text).concat(suffix));
		      var delta = new _quillDelta2.default().retain(index).concat(diff);
		      return this.applyDelta(delta);
		    }
		  }, {
		    key: 'update',
		    value: function update(change) {
		      var _this5 = this;
	
		      var mutations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		      var cursorIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
	
		      var oldDelta = this.delta;
		      if (mutations.length === 1 && mutations[0].type === 'characterData' && _parchment2.default.find(mutations[0].target)) {
		        (function () {
		          // Optimization for character changes
		          var textBlot = _parchment2.default.find(mutations[0].target);
		          var formats = (0, _block.bubbleFormats)(textBlot);
		          var index = textBlot.offset(_this5.scroll);
		          var oldValue = mutations[0].oldValue.replace(_cursor2.default.CONTENTS, '');
		          var oldText = new _quillDelta2.default().insert(oldValue);
		          var newText = new _quillDelta2.default().insert(textBlot.value());
		          var diffDelta = new _quillDelta2.default().retain(index).concat(oldText.diff(newText, cursorIndex));
		          change = diffDelta.reduce(function (delta, op) {
		            if (op.insert) {
		              return delta.insert(op.insert, formats);
		            } else {
		              return delta.push(op);
		            }
		          }, new _quillDelta2.default());
		          _this5.delta = oldDelta.compose(change);
		        })();
		      } else {
		        this.delta = this.getDelta();
		        if (!change || !(0, _deepEqual2.default)(oldDelta.compose(change), this.delta)) {
		          change = oldDelta.diff(this.delta, cursorIndex);
		        }
		      }
		      return change;
		    }
		  }]);
	
		  return Editor;
		}();
	
		function combineFormats(formats, combined) {
		  return Object.keys(combined).reduce(function (merged, name) {
		    if (formats[name] == null) return merged;
		    if (combined[name] === formats[name]) {
		      merged[name] = combined[name];
		    } else if (Array.isArray(combined[name])) {
		      if (combined[name].indexOf(formats[name]) < 0) {
		        merged[name] = combined[name].concat([formats[name]]);
		      }
		    } else {
		      merged[name] = [combined[name], formats[name]];
		    }
		    return merged;
		  }, {});
		}
	
		function normalizeDelta(delta) {
		  return delta.reduce(function (delta, op) {
		    if (op.insert === 1) {
		      var attributes = (0, _clone2.default)(op.attributes);
		      delete attributes['image'];
		      return delta.insert({ image: op.attributes.image }, attributes);
		    }
		    if (op.attributes != null && (op.attributes.list === true || op.attributes.bullet === true)) {
		      op = (0, _clone2.default)(op);
		      if (op.attributes.list) {
		        op.attributes.list = 'ordered';
		      } else {
		        op.attributes.list = 'bullet';
		        delete op.attributes.bullet;
		      }
		    }
		    if (typeof op.insert === 'string') {
		      var text = op.insert.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
		      return delta.insert(text, op.attributes);
		    }
		    return delta.push(op);
		  }, new _quillDelta2.default());
		}
	
		exports.default = Editor;
	
	/***/ },
	/* 28 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = exports.Code = undefined;
	
		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _quillDelta = __webpack_require__(20);
	
		var _quillDelta2 = _interopRequireDefault(_quillDelta);
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _block = __webpack_require__(29);
	
		var _block2 = _interopRequireDefault(_block);
	
		var _inline = __webpack_require__(32);
	
		var _inline2 = _interopRequireDefault(_inline);
	
		var _text = __webpack_require__(33);
	
		var _text2 = _interopRequireDefault(_text);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Code = function (_Inline) {
		  _inherits(Code, _Inline);
	
		  function Code() {
		    _classCallCheck(this, Code);
	
		    return _possibleConstructorReturn(this, (Code.__proto__ || Object.getPrototypeOf(Code)).apply(this, arguments));
		  }
	
		  return Code;
		}(_inline2.default);
	
		Code.blotName = 'code';
		Code.tagName = 'CODE';
	
		var CodeBlock = function (_Block) {
		  _inherits(CodeBlock, _Block);
	
		  function CodeBlock() {
		    _classCallCheck(this, CodeBlock);
	
		    return _possibleConstructorReturn(this, (CodeBlock.__proto__ || Object.getPrototypeOf(CodeBlock)).apply(this, arguments));
		  }
	
		  _createClass(CodeBlock, [{
		    key: 'delta',
		    value: function delta() {
		      var _this3 = this;
	
		      var text = this.domNode.textContent;
		      if (text.endsWith('\n')) {
		        // Should always be true
		        text = text.slice(0, -1);
		      }
		      return text.split('\n').reduce(function (delta, frag) {
		        return delta.insert(frag).insert('\n', _this3.formats());
		      }, new _quillDelta2.default());
		    }
		  }, {
		    key: 'format',
		    value: function format(name, value) {
		      if (name === this.statics.blotName && value) return;
	
		      var _descendant = this.descendant(_text2.default, this.length() - 1),
		          _descendant2 = _slicedToArray(_descendant, 1),
		          text = _descendant2[0];
	
		      if (text != null) {
		        text.deleteAt(text.length() - 1, 1);
		      }
		      _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'format', this).call(this, name, value);
		    }
		  }, {
		    key: 'formatAt',
		    value: function formatAt(index, length, name, value) {
		      if (length === 0) return;
		      if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK) == null || name === this.statics.blotName && value === this.statics.formats(this.domNode)) {
		        return;
		      }
		      var nextNewline = this.newlineIndex(index);
		      if (nextNewline < 0 || nextNewline >= index + length) return;
		      var prevNewline = this.newlineIndex(index, true) + 1;
		      var isolateLength = nextNewline - prevNewline + 1;
		      var blot = this.isolate(prevNewline, isolateLength);
		      var next = blot.next;
		      blot.format(name, value);
		      if (next instanceof CodeBlock) {
		        next.formatAt(0, index - prevNewline + length - isolateLength, name, value);
		      }
		    }
		  }, {
		    key: 'insertAt',
		    value: function insertAt(index, value, def) {
		      if (def != null) return;
	
		      var _descendant3 = this.descendant(_text2.default, index),
		          _descendant4 = _slicedToArray(_descendant3, 2),
		          text = _descendant4[0],
		          offset = _descendant4[1];
	
		      text.insertAt(offset, value);
		    }
		  }, {
		    key: 'length',
		    value: function length() {
		      var length = this.domNode.textContent.length;
		      if (!this.domNode.textContent.endsWith('\n')) {
		        return length + 1;
		      }
		      return length;
		    }
		  }, {
		    key: 'newlineIndex',
		    value: function newlineIndex(searchIndex) {
		      var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
		      if (!reverse) {
		        var offset = this.domNode.textContent.slice(searchIndex).indexOf('\n');
		        return offset > -1 ? searchIndex + offset : -1;
		      } else {
		        return this.domNode.textContent.slice(0, searchIndex).lastIndexOf('\n');
		      }
		    }
		  }, {
		    key: 'optimize',
		    value: function optimize() {
		      if (!this.domNode.textContent.endsWith('\n')) {
		        this.appendChild(_parchment2.default.create('text', '\n'));
		      }
		      _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'optimize', this).call(this);
		      var next = this.next;
		      if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === next.statics.formats(next.domNode)) {
		        next.optimize();
		        next.moveChildren(this);
		        next.remove();
		      }
		    }
		  }, {
		    key: 'replace',
		    value: function replace(target) {
		      _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'replace', this).call(this, target);
		      [].slice.call(this.domNode.querySelectorAll('*')).forEach(function (node) {
		        var blot = _parchment2.default.find(node);
		        if (blot == null) {
		          node.parentNode.removeChild(node);
		        } else if (blot instanceof _parchment2.default.Embed) {
		          blot.remove();
		        } else {
		          blot.unwrap();
		        }
		      });
		    }
		  }], [{
		    key: 'create',
		    value: function create(value) {
		      var domNode = _get(CodeBlock.__proto__ || Object.getPrototypeOf(CodeBlock), 'create', this).call(this, value);
		      domNode.setAttribute('spellcheck', false);
		      return domNode;
		    }
		  }, {
		    key: 'formats',
		    value: function formats() {
		      return true;
		    }
		  }]);
	
		  return CodeBlock;
		}(_block2.default);
	
		CodeBlock.blotName = 'code-block';
		CodeBlock.tagName = 'PRE';
		CodeBlock.TAB = '  ';
	
		exports.Code = Code;
		exports.default = CodeBlock;
	
	/***/ },
	/* 29 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = exports.BlockEmbed = exports.bubbleFormats = undefined;
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _extend = __webpack_require__(25);
	
		var _extend2 = _interopRequireDefault(_extend);
	
		var _quillDelta = __webpack_require__(20);
	
		var _quillDelta2 = _interopRequireDefault(_quillDelta);
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _break = __webpack_require__(30);
	
		var _break2 = _interopRequireDefault(_break);
	
		var _embed = __webpack_require__(31);
	
		var _embed2 = _interopRequireDefault(_embed);
	
		var _inline = __webpack_require__(32);
	
		var _inline2 = _interopRequireDefault(_inline);
	
		var _text = __webpack_require__(33);
	
		var _text2 = _interopRequireDefault(_text);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var NEWLINE_LENGTH = 1;
	
		var BlockEmbed = function (_Embed) {
		  _inherits(BlockEmbed, _Embed);
	
		  function BlockEmbed() {
		    _classCallCheck(this, BlockEmbed);
	
		    return _possibleConstructorReturn(this, (BlockEmbed.__proto__ || Object.getPrototypeOf(BlockEmbed)).apply(this, arguments));
		  }
	
		  _createClass(BlockEmbed, [{
		    key: 'attach',
		    value: function attach() {
		      _get(BlockEmbed.prototype.__proto__ || Object.getPrototypeOf(BlockEmbed.prototype), 'attach', this).call(this);
		      this.attributes = new _parchment2.default.Attributor.Store(this.domNode);
		    }
		  }, {
		    key: 'delta',
		    value: function delta() {
		      return new _quillDelta2.default().insert(this.value(), (0, _extend2.default)(this.formats(), this.attributes.values()));
		    }
		  }, {
		    key: 'format',
		    value: function format(name, value) {
		      var attribute = _parchment2.default.query(name, _parchment2.default.Scope.BLOCK_ATTRIBUTE);
		      if (attribute != null) {
		        this.attributes.attribute(attribute, value);
		      }
		    }
		  }, {
		    key: 'formatAt',
		    value: function formatAt(index, length, name, value) {
		      this.format(name, value);
		    }
		  }, {
		    key: 'insertAt',
		    value: function insertAt(index, value, def) {
		      if (typeof value === 'string' && value.endsWith('\n')) {
		        var block = _parchment2.default.create(Block.blotName);
		        this.parent.insertBefore(block, index === 0 ? this : this.next);
		        block.insertAt(0, value.slice(0, -1));
		      } else {
		        _get(BlockEmbed.prototype.__proto__ || Object.getPrototypeOf(BlockEmbed.prototype), 'insertAt', this).call(this, index, value, def);
		      }
		    }
		  }]);
	
		  return BlockEmbed;
		}(_embed2.default);
	
		BlockEmbed.scope = _parchment2.default.Scope.BLOCK_BLOT;
		// It is important for cursor behavior BlockEmbeds use tags that are block level elements
	
	
		var Block = function (_Parchment$Block) {
		  _inherits(Block, _Parchment$Block);
	
		  function Block(domNode) {
		    _classCallCheck(this, Block);
	
		    var _this2 = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, domNode));
	
		    _this2.cache = {};
		    return _this2;
		  }
	
		  _createClass(Block, [{
		    key: 'delta',
		    value: function delta() {
		      if (this.cache.delta == null) {
		        this.cache.delta = this.descendants(_parchment2.default.Leaf).reduce(function (delta, leaf) {
		          if (leaf.length() === 0) {
		            return delta;
		          } else {
		            return delta.insert(leaf.value(), bubbleFormats(leaf));
		          }
		        }, new _quillDelta2.default()).insert('\n', bubbleFormats(this));
		      }
		      return this.cache.delta;
		    }
		  }, {
		    key: 'deleteAt',
		    value: function deleteAt(index, length) {
		      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'deleteAt', this).call(this, index, length);
		      this.cache = {};
		    }
		  }, {
		    key: 'formatAt',
		    value: function formatAt(index, length, name, value) {
		      if (length <= 0) return;
		      if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK)) {
		        if (index + length === this.length()) {
		          this.format(name, value);
		        }
		      } else {
		        _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'formatAt', this).call(this, index, Math.min(length, this.length() - index - 1), name, value);
		      }
		      this.cache = {};
		    }
		  }, {
		    key: 'insertAt',
		    value: function insertAt(index, value, def) {
		      if (def != null) return _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertAt', this).call(this, index, value, def);
		      if (value.length === 0) return;
		      var lines = value.split('\n');
		      var text = lines.shift();
		      if (text.length > 0) {
		        if (index < this.length() - 1 || this.children.tail == null) {
		          _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertAt', this).call(this, Math.min(index, this.length() - 1), text);
		        } else {
		          this.children.tail.insertAt(this.children.tail.length(), text);
		        }
		        this.cache = {};
		      }
		      var block = this;
		      lines.reduce(function (index, line) {
		        block = block.split(index, true);
		        block.insertAt(0, line);
		        return line.length;
		      }, index + text.length);
		    }
		  }, {
		    key: 'insertBefore',
		    value: function insertBefore(blot, ref) {
		      var head = this.children.head;
		      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertBefore', this).call(this, blot, ref);
		      if (head instanceof _break2.default) {
		        head.remove();
		      }
		      this.cache = {};
		    }
		  }, {
		    key: 'length',
		    value: function length() {
		      if (this.cache.length == null) {
		        this.cache.length = _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'length', this).call(this) + NEWLINE_LENGTH;
		      }
		      return this.cache.length;
		    }
		  }, {
		    key: 'moveChildren',
		    value: function moveChildren(target, ref) {
		      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'moveChildren', this).call(this, target, ref);
		      this.cache = {};
		    }
		  }, {
		    key: 'optimize',
		    value: function optimize() {
		      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'optimize', this).call(this);
		      this.cache = {};
		    }
		  }, {
		    key: 'path',
		    value: function path(index) {
		      return _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'path', this).call(this, index, true);
		    }
		  }, {
		    key: 'removeChild',
		    value: function removeChild(child) {
		      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'removeChild', this).call(this, child);
		      this.cache = {};
		    }
		  }, {
		    key: 'split',
		    value: function split(index) {
		      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
		      if (force && (index === 0 || index >= this.length() - NEWLINE_LENGTH)) {
		        var clone = this.clone();
		        if (index === 0) {
		          this.parent.insertBefore(clone, this);
		          return this;
		        } else {
		          this.parent.insertBefore(clone, this.next);
		          return clone;
		        }
		      } else {
		        var next = _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'split', this).call(this, index, force);
		        this.cache = {};
		        return next;
		      }
		    }
		  }]);
	
		  return Block;
		}(_parchment2.default.Block);
	
		Block.blotName = 'block';
		Block.tagName = 'P';
		Block.defaultChild = 'break';
		Block.allowedChildren = [_inline2.default, _embed2.default, _text2.default];
	
		function bubbleFormats(blot) {
		  var formats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
		  if (blot == null) return formats;
		  if (typeof blot.formats === 'function') {
		    formats = (0, _extend2.default)(formats, blot.formats());
		  }
		  if (blot.parent == null || blot.parent.blotName == 'scroll' || blot.parent.statics.scope !== blot.statics.scope) {
		    return formats;
		  }
		  return bubbleFormats(blot.parent, formats);
		}
	
		exports.bubbleFormats = bubbleFormats;
		exports.BlockEmbed = BlockEmbed;
		exports.default = Block;
	
	/***/ },
	/* 30 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _embed = __webpack_require__(31);
	
		var _embed2 = _interopRequireDefault(_embed);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Break = function (_Embed) {
		  _inherits(Break, _Embed);
	
		  function Break() {
		    _classCallCheck(this, Break);
	
		    return _possibleConstructorReturn(this, (Break.__proto__ || Object.getPrototypeOf(Break)).apply(this, arguments));
		  }
	
		  _createClass(Break, [{
		    key: 'insertInto',
		    value: function insertInto(parent, ref) {
		      if (parent.children.length === 0) {
		        _get(Break.prototype.__proto__ || Object.getPrototypeOf(Break.prototype), 'insertInto', this).call(this, parent, ref);
		      } else {
		        this.remove();
		      }
		    }
		  }, {
		    key: 'length',
		    value: function length() {
		      return 0;
		    }
		  }, {
		    key: 'value',
		    value: function value() {
		      return '';
		    }
		  }], [{
		    key: 'value',
		    value: function value() {
		      return undefined;
		    }
		  }]);
	
		  return Break;
		}(_embed2.default);
	
		Break.blotName = 'break';
		Break.tagName = 'BR';
	
		exports.default = Break;
	
	/***/ },
	/* 31 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Embed = function (_Parchment$Embed) {
		  _inherits(Embed, _Parchment$Embed);
	
		  function Embed() {
		    _classCallCheck(this, Embed);
	
		    return _possibleConstructorReturn(this, (Embed.__proto__ || Object.getPrototypeOf(Embed)).apply(this, arguments));
		  }
	
		  return Embed;
		}(_parchment2.default.Embed);
	
		exports.default = Embed;
	
	/***/ },
	/* 32 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _embed = __webpack_require__(31);
	
		var _embed2 = _interopRequireDefault(_embed);
	
		var _text = __webpack_require__(33);
	
		var _text2 = _interopRequireDefault(_text);
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Inline = function (_Parchment$Inline) {
		  _inherits(Inline, _Parchment$Inline);
	
		  function Inline() {
		    _classCallCheck(this, Inline);
	
		    return _possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).apply(this, arguments));
		  }
	
		  _createClass(Inline, [{
		    key: 'formatAt',
		    value: function formatAt(index, length, name, value) {
		      if (Inline.compare(this.statics.blotName, name) < 0 && _parchment2.default.query(name, _parchment2.default.Scope.BLOT)) {
		        var blot = this.isolate(index, length);
		        if (value) {
		          blot.wrap(name, value);
		        }
		      } else {
		        _get(Inline.prototype.__proto__ || Object.getPrototypeOf(Inline.prototype), 'formatAt', this).call(this, index, length, name, value);
		      }
		    }
		  }, {
		    key: 'optimize',
		    value: function optimize() {
		      _get(Inline.prototype.__proto__ || Object.getPrototypeOf(Inline.prototype), 'optimize', this).call(this);
		      if (this.parent instanceof Inline && Inline.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
		        var parent = this.parent.isolate(this.offset(), this.length());
		        this.moveChildren(parent);
		        parent.wrap(this);
		      }
		    }
		  }], [{
		    key: 'compare',
		    value: function compare(self, other) {
		      var selfIndex = Inline.order.indexOf(self);
		      var otherIndex = Inline.order.indexOf(other);
		      if (selfIndex >= 0 || otherIndex >= 0) {
		        return selfIndex - otherIndex;
		      } else if (self === other) {
		        return 0;
		      } else if (self < other) {
		        return -1;
		      } else {
		        return 1;
		      }
		    }
		  }]);
	
		  return Inline;
		}(_parchment2.default.Inline);
	
		Inline.allowedChildren = [Inline, _embed2.default, _text2.default];
		// Lower index means deeper in the DOM tree, since not found (-1) is for embeds
		Inline.order = ['cursor', 'inline', // Must be lower
		'code', 'underline', 'strike', 'italic', 'bold', 'script', 'link' // Must be higher
		];
	
		exports.default = Inline;
	
	/***/ },
	/* 33 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var TextBlot = function (_Parchment$Text) {
		  _inherits(TextBlot, _Parchment$Text);
	
		  function TextBlot() {
		    _classCallCheck(this, TextBlot);
	
		    return _possibleConstructorReturn(this, (TextBlot.__proto__ || Object.getPrototypeOf(TextBlot)).apply(this, arguments));
		  }
	
		  return TextBlot;
		}(_parchment2.default.Text);
	
		exports.default = TextBlot;
	
	/***/ },
	/* 34 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _embed = __webpack_require__(31);
	
		var _embed2 = _interopRequireDefault(_embed);
	
		var _text = __webpack_require__(33);
	
		var _text2 = _interopRequireDefault(_text);
	
		var _emitter = __webpack_require__(35);
	
		var _emitter2 = _interopRequireDefault(_emitter);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Cursor = function (_Embed) {
		  _inherits(Cursor, _Embed);
	
		  _createClass(Cursor, null, [{
		    key: 'value',
		    value: function value() {
		      return undefined;
		    }
		  }]);
	
		  function Cursor(domNode, selection) {
		    _classCallCheck(this, Cursor);
	
		    var _this = _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this, domNode));
	
		    _this.selection = selection;
		    _this.textNode = document.createTextNode(Cursor.CONTENTS);
		    _this.domNode.appendChild(_this.textNode);
		    _this._length = 0;
		    return _this;
		  }
	
		  _createClass(Cursor, [{
		    key: 'detach',
		    value: function detach() {
		      // super.detach() will also clear domNode.__blot
		      if (this.parent != null) this.parent.removeChild(this);
		    }
		  }, {
		    key: 'format',
		    value: function format(name, value) {
		      if (this._length !== 0) {
		        return _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'format', this).call(this, name, value);
		      }
		      var target = this,
		          index = 0;
		      while (target != null && target.statics.scope !== _parchment2.default.Scope.BLOCK_BLOT) {
		        index += target.offset(target.parent);
		        target = target.parent;
		      }
		      if (target != null) {
		        this._length = Cursor.CONTENTS.length;
		        target.optimize();
		        target.formatAt(index, Cursor.CONTENTS.length, name, value);
		        this._length = 0;
		      }
		    }
		  }, {
		    key: 'index',
		    value: function index(node, offset) {
		      if (node === this.textNode) return 0;
		      return _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'index', this).call(this, node, offset);
		    }
		  }, {
		    key: 'length',
		    value: function length() {
		      return this._length;
		    }
		  }, {
		    key: 'position',
		    value: function position() {
		      return [this.textNode, this.textNode.data.length];
		    }
		  }, {
		    key: 'remove',
		    value: function remove() {
		      _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'remove', this).call(this);
		      this.parent = null;
		    }
		  }, {
		    key: 'restore',
		    value: function restore() {
		      var _this2 = this;
	
		      if (this.selection.composing) return;
		      if (this.parent == null) return;
		      var textNode = this.textNode;
		      var range = this.selection.getNativeRange();
		      var restoreText = void 0,
		          start = void 0,
		          end = void 0;
		      if (range != null && range.start.node === textNode && range.end.node === textNode) {
		        var _ref = [textNode, range.start.offset, range.end.offset];
		        restoreText = _ref[0];
		        start = _ref[1];
		        end = _ref[2];
		      }
		      // Link format will insert text outside of anchor tag
		      while (this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode) {
		        this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
		      }
		      if (this.textNode.data !== Cursor.CONTENTS) {
		        var text = this.textNode.data.split(Cursor.CONTENTS).join('');
		        if (this.next instanceof _text2.default) {
		          restoreText = this.next.domNode;
		          this.next.insertAt(0, text);
		          this.textNode.data = Cursor.CONTENTS;
		        } else {
		          this.textNode.data = text;
		          this.parent.insertBefore(_parchment2.default.create(this.textNode), this);
		          this.textNode = document.createTextNode(Cursor.CONTENTS);
		          this.domNode.appendChild(this.textNode);
		        }
		      }
		      this.remove();
		      if (start == null) return;
		      this.selection.emitter.once(_emitter2.default.events.SCROLL_OPTIMIZE, function () {
		        var _map = [start, end].map(function (offset) {
		          return Math.max(0, Math.min(restoreText.data.length, offset - 1));
		        });
	
		        var _map2 = _slicedToArray(_map, 2);
	
		        start = _map2[0];
		        end = _map2[1];
	
		        _this2.selection.setNativeRange(restoreText, start, restoreText, end);
		      });
		    }
		  }, {
		    key: 'update',
		    value: function update(mutations) {
		      var _this3 = this;
	
		      mutations.forEach(function (mutation) {
		        if (mutation.type === 'characterData' && mutation.target === _this3.textNode) {
		          _this3.restore();
		        }
		      });
		    }
		  }, {
		    key: 'value',
		    value: function value() {
		      return '';
		    }
		  }]);
	
		  return Cursor;
		}(_embed2.default);
	
		Cursor.blotName = 'cursor';
		Cursor.className = 'ql-cursor';
		Cursor.tagName = 'span';
		Cursor.CONTENTS = '\uFEFF'; // Zero width no break space
	
	
		exports.default = Cursor;
	
	/***/ },
	/* 35 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _eventemitter = __webpack_require__(36);
	
		var _eventemitter2 = _interopRequireDefault(_eventemitter);
	
		var _logger = __webpack_require__(37);
	
		var _logger2 = _interopRequireDefault(_logger);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var debug = (0, _logger2.default)('quill:events');
	
		var Emitter = function (_EventEmitter) {
		  _inherits(Emitter, _EventEmitter);
	
		  function Emitter() {
		    _classCallCheck(this, Emitter);
	
		    var _this = _possibleConstructorReturn(this, (Emitter.__proto__ || Object.getPrototypeOf(Emitter)).call(this));
	
		    _this.on('error', debug.error);
		    return _this;
		  }
	
		  _createClass(Emitter, [{
		    key: 'emit',
		    value: function emit() {
		      debug.log.apply(debug, arguments);
		      _get(Emitter.prototype.__proto__ || Object.getPrototypeOf(Emitter.prototype), 'emit', this).apply(this, arguments);
		    }
		  }]);
	
		  return Emitter;
		}(_eventemitter2.default);
	
		Emitter.events = {
		  EDITOR_CHANGE: 'editor-change',
		  SCROLL_BEFORE_UPDATE: 'scroll-before-update',
		  SCROLL_OPTIMIZE: 'scroll-optimize',
		  SCROLL_UPDATE: 'scroll-update',
		  SELECTION_CHANGE: 'selection-change',
		  TEXT_CHANGE: 'text-change'
		};
		Emitter.sources = {
		  API: 'api',
		  SILENT: 'silent',
		  USER: 'user'
		};
	
		exports.default = Emitter;
	
	/***/ },
	/* 36 */
	/***/ function(module, exports) {
	
		'use strict';
	
		var has = Object.prototype.hasOwnProperty
		  , prefix = '~';
	
		/**
		 * Constructor to create a storage for our `EE` objects.
		 * An `Events` instance is a plain object whose properties are event names.
		 *
		 * @constructor
		 * @api private
		 */
		function Events() {}
	
		//
		// We try to not inherit from `Object.prototype`. In some engines creating an
		// instance in this way is faster than calling `Object.create(null)` directly.
		// If `Object.create(null)` is not supported we prefix the event names with a
		// character to make sure that the built-in object properties are not
		// overridden or used as an attack vector.
		//
		if (Object.create) {
		  Events.prototype = Object.create(null);
	
		  //
		  // This hack is needed because the `__proto__` property is still inherited in
		  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
		  //
		  if (!new Events().__proto__) prefix = false;
		}
	
		/**
		 * Representation of a single event listener.
		 *
		 * @param {Function} fn The listener function.
		 * @param {Mixed} context The context to invoke the listener with.
		 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
		 * @constructor
		 * @api private
		 */
		function EE(fn, context, once) {
		  this.fn = fn;
		  this.context = context;
		  this.once = once || false;
		}
	
		/**
		 * Minimal `EventEmitter` interface that is molded against the Node.js
		 * `EventEmitter` interface.
		 *
		 * @constructor
		 * @api public
		 */
		function EventEmitter() {
		  this._events = new Events();
		  this._eventsCount = 0;
		}
	
		/**
		 * Return an array listing the events for which the emitter has registered
		 * listeners.
		 *
		 * @returns {Array}
		 * @api public
		 */
		EventEmitter.prototype.eventNames = function eventNames() {
		  var names = []
		    , events
		    , name;
	
		  if (this._eventsCount === 0) return names;
	
		  for (name in (events = this._events)) {
		    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
		  }
	
		  if (Object.getOwnPropertySymbols) {
		    return names.concat(Object.getOwnPropertySymbols(events));
		  }
	
		  return names;
		};
	
		/**
		 * Return the listeners registered for a given event.
		 *
		 * @param {String|Symbol} event The event name.
		 * @param {Boolean} exists Only check if there are listeners.
		 * @returns {Array|Boolean}
		 * @api public
		 */
		EventEmitter.prototype.listeners = function listeners(event, exists) {
		  var evt = prefix ? prefix + event : event
		    , available = this._events[evt];
	
		  if (exists) return !!available;
		  if (!available) return [];
		  if (available.fn) return [available.fn];
	
		  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
		    ee[i] = available[i].fn;
		  }
	
		  return ee;
		};
	
		/**
		 * Calls each of the listeners registered for a given event.
		 *
		 * @param {String|Symbol} event The event name.
		 * @returns {Boolean} `true` if the event had listeners, else `false`.
		 * @api public
		 */
		EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
		  var evt = prefix ? prefix + event : event;
	
		  if (!this._events[evt]) return false;
	
		  var listeners = this._events[evt]
		    , len = arguments.length
		    , args
		    , i;
	
		  if (listeners.fn) {
		    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
	
		    switch (len) {
		      case 1: return listeners.fn.call(listeners.context), true;
		      case 2: return listeners.fn.call(listeners.context, a1), true;
		      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
		      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
		      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
		      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
		    }
	
		    for (i = 1, args = new Array(len -1); i < len; i++) {
		      args[i - 1] = arguments[i];
		    }
	
		    listeners.fn.apply(listeners.context, args);
		  } else {
		    var length = listeners.length
		      , j;
	
		    for (i = 0; i < length; i++) {
		      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
	
		      switch (len) {
		        case 1: listeners[i].fn.call(listeners[i].context); break;
		        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
		        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
		        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
		        default:
		          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
		            args[j - 1] = arguments[j];
		          }
	
		          listeners[i].fn.apply(listeners[i].context, args);
		      }
		    }
		  }
	
		  return true;
		};
	
		/**
		 * Add a listener for a given event.
		 *
		 * @param {String|Symbol} event The event name.
		 * @param {Function} fn The listener function.
		 * @param {Mixed} [context=this] The context to invoke the listener with.
		 * @returns {EventEmitter} `this`.
		 * @api public
		 */
		EventEmitter.prototype.on = function on(event, fn, context) {
		  var listener = new EE(fn, context || this)
		    , evt = prefix ? prefix + event : event;
	
		  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
		  else if (!this._events[evt].fn) this._events[evt].push(listener);
		  else this._events[evt] = [this._events[evt], listener];
	
		  return this;
		};
	
		/**
		 * Add a one-time listener for a given event.
		 *
		 * @param {String|Symbol} event The event name.
		 * @param {Function} fn The listener function.
		 * @param {Mixed} [context=this] The context to invoke the listener with.
		 * @returns {EventEmitter} `this`.
		 * @api public
		 */
		EventEmitter.prototype.once = function once(event, fn, context) {
		  var listener = new EE(fn, context || this, true)
		    , evt = prefix ? prefix + event : event;
	
		  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
		  else if (!this._events[evt].fn) this._events[evt].push(listener);
		  else this._events[evt] = [this._events[evt], listener];
	
		  return this;
		};
	
		/**
		 * Remove the listeners of a given event.
		 *
		 * @param {String|Symbol} event The event name.
		 * @param {Function} fn Only remove the listeners that match this function.
		 * @param {Mixed} context Only remove the listeners that have this context.
		 * @param {Boolean} once Only remove one-time listeners.
		 * @returns {EventEmitter} `this`.
		 * @api public
		 */
		EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
		  var evt = prefix ? prefix + event : event;
	
		  if (!this._events[evt]) return this;
		  if (!fn) {
		    if (--this._eventsCount === 0) this._events = new Events();
		    else delete this._events[evt];
		    return this;
		  }
	
		  var listeners = this._events[evt];
	
		  if (listeners.fn) {
		    if (
		         listeners.fn === fn
		      && (!once || listeners.once)
		      && (!context || listeners.context === context)
		    ) {
		      if (--this._eventsCount === 0) this._events = new Events();
		      else delete this._events[evt];
		    }
		  } else {
		    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
		      if (
		           listeners[i].fn !== fn
		        || (once && !listeners[i].once)
		        || (context && listeners[i].context !== context)
		      ) {
		        events.push(listeners[i]);
		      }
		    }
	
		    //
		    // Reset the array, or remove it completely if we have no more listeners.
		    //
		    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
		    else if (--this._eventsCount === 0) this._events = new Events();
		    else delete this._events[evt];
		  }
	
		  return this;
		};
	
		/**
		 * Remove all listeners, or those of the specified event.
		 *
		 * @param {String|Symbol} [event] The event name.
		 * @returns {EventEmitter} `this`.
		 * @api public
		 */
		EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
		  var evt;
	
		  if (event) {
		    evt = prefix ? prefix + event : event;
		    if (this._events[evt]) {
		      if (--this._eventsCount === 0) this._events = new Events();
		      else delete this._events[evt];
		    }
		  } else {
		    this._events = new Events();
		    this._eventsCount = 0;
		  }
	
		  return this;
		};
	
		//
		// Alias methods names because people roll like that.
		//
		EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
		EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
		//
		// This function doesn't apply anymore.
		//
		EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
		  return this;
		};
	
		//
		// Expose the prefix.
		//
		EventEmitter.prefixed = prefix;
	
		//
		// Allow `EventEmitter` to be imported as module namespace.
		//
		EventEmitter.EventEmitter = EventEmitter;
	
		//
		// Expose the module.
		//
		if ('undefined' !== typeof module) {
		  module.exports = EventEmitter;
		}
	
	
	/***/ },
	/* 37 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var levels = ['error', 'warn', 'log', 'info'];
		var level = 'warn';
	
		function debug(method) {
		  if (levels.indexOf(method) <= levels.indexOf(level)) {
		    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		      args[_key - 1] = arguments[_key];
		    }
	
		    console[method].apply(console, args); // eslint-disable-line no-console
		  }
		}
	
		function namespace(ns) {
		  return levels.reduce(function (logger, method) {
		    logger[method] = debug.bind(console, method, ns);
		    return logger;
		  }, {});
		}
	
		debug.level = namespace.level = function (newLevel) {
		  level = newLevel;
		};
	
		exports.default = namespace;
	
	/***/ },
	/* 38 */
	/***/ function(module, exports) {
	
		var clone = (function() {
		'use strict';
	
		var nativeMap;
		try {
		  nativeMap = Map;
		} catch(_) {
		  // maybe a reference error because no `Map`. Give it a dummy value that no
		  // value will ever be an instanceof.
		  nativeMap = function() {};
		}
	
		var nativeSet;
		try {
		  nativeSet = Set;
		} catch(_) {
		  nativeSet = function() {};
		}
	
		var nativePromise;
		try {
		  nativePromise = Promise;
		} catch(_) {
		  nativePromise = function() {};
		}
	
		/**
		 * Clones (copies) an Object using deep copying.
		 *
		 * This function supports circular references by default, but if you are certain
		 * there are no circular references in your object, you can save some CPU time
		 * by calling clone(obj, false).
		 *
		 * Caution: if `circular` is false and `parent` contains circular references,
		 * your program may enter an infinite loop and crash.
		 *
		 * @param `parent` - the object to be cloned
		 * @param `circular` - set to true if the object to be cloned may contain
		 *    circular references. (optional - true by default)
		 * @param `depth` - set to a number if the object is only to be cloned to
		 *    a particular depth. (optional - defaults to Infinity)
		 * @param `prototype` - sets the prototype to be used when cloning an object.
		 *    (optional - defaults to parent prototype).
		 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
		 *    should be cloned as well. Non-enumerable properties on the prototype
		 *    chain will be ignored. (optional - false by default)
		*/
		function clone(parent, circular, depth, prototype, includeNonEnumerable) {
		  if (typeof circular === 'object') {
		    depth = circular.depth;
		    prototype = circular.prototype;
		    includeNonEnumerable = circular.includeNonEnumerable;
		    circular = circular.circular;
		  }
		  // maintain two arrays for circular references, where corresponding parents
		  // and children have the same index
		  var allParents = [];
		  var allChildren = [];
	
		  var useBuffer = typeof Buffer != 'undefined';
	
		  if (typeof circular == 'undefined')
		    circular = true;
	
		  if (typeof depth == 'undefined')
		    depth = Infinity;
	
		  // recurse this function so we don't reset allParents and allChildren
		  function _clone(parent, depth) {
		    // cloning null always returns null
		    if (parent === null)
		      return null;
	
		    if (depth === 0)
		      return parent;
	
		    var child;
		    var proto;
		    if (typeof parent != 'object') {
		      return parent;
		    }
	
		    if (parent instanceof nativeMap) {
		      child = new nativeMap();
		    } else if (parent instanceof nativeSet) {
		      child = new nativeSet();
		    } else if (parent instanceof nativePromise) {
		      child = new nativePromise(function (resolve, reject) {
		        parent.then(function(value) {
		          resolve(_clone(value, depth - 1));
		        }, function(err) {
		          reject(_clone(err, depth - 1));
		        });
		      });
		    } else if (clone.__isArray(parent)) {
		      child = [];
		    } else if (clone.__isRegExp(parent)) {
		      child = new RegExp(parent.source, __getRegExpFlags(parent));
		      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
		    } else if (clone.__isDate(parent)) {
		      child = new Date(parent.getTime());
		    } else if (useBuffer && Buffer.isBuffer(parent)) {
		      child = new Buffer(parent.length);
		      parent.copy(child);
		      return child;
		    } else if (parent instanceof Error) {
		      child = Object.create(parent);
		    } else {
		      if (typeof prototype == 'undefined') {
		        proto = Object.getPrototypeOf(parent);
		        child = Object.create(proto);
		      }
		      else {
		        child = Object.create(prototype);
		        proto = prototype;
		      }
		    }
	
		    if (circular) {
		      var index = allParents.indexOf(parent);
	
		      if (index != -1) {
		        return allChildren[index];
		      }
		      allParents.push(parent);
		      allChildren.push(child);
		    }
	
		    if (parent instanceof nativeMap) {
		      var keyIterator = parent.keys();
		      while(true) {
		        var next = keyIterator.next();
		        if (next.done) {
		          break;
		        }
		        var keyChild = _clone(next.value, depth - 1);
		        var valueChild = _clone(parent.get(next.value), depth - 1);
		        child.set(keyChild, valueChild);
		      }
		    }
		    if (parent instanceof nativeSet) {
		      var iterator = parent.keys();
		      while(true) {
		        var next = iterator.next();
		        if (next.done) {
		          break;
		        }
		        var entryChild = _clone(next.value, depth - 1);
		        child.add(entryChild);
		      }
		    }
	
		    for (var i in parent) {
		      var attrs;
		      if (proto) {
		        attrs = Object.getOwnPropertyDescriptor(proto, i);
		      }
	
		      if (attrs && attrs.set == null) {
		        continue;
		      }
		      child[i] = _clone(parent[i], depth - 1);
		    }
	
		    if (Object.getOwnPropertySymbols) {
		      var symbols = Object.getOwnPropertySymbols(parent);
		      for (var i = 0; i < symbols.length; i++) {
		        // Don't need to worry about cloning a symbol because it is a primitive,
		        // like a number or string.
		        var symbol = symbols[i];
		        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
		        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
		          continue;
		        }
		        child[symbol] = _clone(parent[symbol], depth - 1);
		        if (!descriptor.enumerable) {
		          Object.defineProperty(child, symbol, {
		            enumerable: false
		          });
		        }
		      }
		    }
	
		    if (includeNonEnumerable) {
		      var allPropertyNames = Object.getOwnPropertyNames(parent);
		      for (var i = 0; i < allPropertyNames.length; i++) {
		        var propertyName = allPropertyNames[i];
		        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
		        if (descriptor && descriptor.enumerable) {
		          continue;
		        }
		        child[propertyName] = _clone(parent[propertyName], depth - 1);
		        Object.defineProperty(child, propertyName, {
		          enumerable: false
		        });
		      }
		    }
	
		    return child;
		  }
	
		  return _clone(parent, depth);
		}
	
		/**
		 * Simple flat clone using prototype, accepts only objects, usefull for property
		 * override on FLAT configuration object (no nested props).
		 *
		 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
		 * works.
		 */
		clone.clonePrototype = function clonePrototype(parent) {
		  if (parent === null)
		    return null;
	
		  var c = function () {};
		  c.prototype = parent;
		  return new c();
		};
	
		// private utility functions
	
		function __objToStr(o) {
		  return Object.prototype.toString.call(o);
		}
		clone.__objToStr = __objToStr;
	
		function __isDate(o) {
		  return typeof o === 'object' && __objToStr(o) === '[object Date]';
		}
		clone.__isDate = __isDate;
	
		function __isArray(o) {
		  return typeof o === 'object' && __objToStr(o) === '[object Array]';
		}
		clone.__isArray = __isArray;
	
		function __isRegExp(o) {
		  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
		}
		clone.__isRegExp = __isRegExp;
	
		function __getRegExpFlags(re) {
		  var flags = '';
		  if (re.global) flags += 'g';
		  if (re.ignoreCase) flags += 'i';
		  if (re.multiline) flags += 'm';
		  return flags;
		}
		clone.__getRegExpFlags = __getRegExpFlags;
	
		return clone;
		})();
	
		if (typeof module === 'object' && module.exports) {
		  module.exports = clone;
		}
	
	
	/***/ },
	/* 39 */
	/***/ function(module, exports) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		var Module = function Module(quill) {
		  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
		  _classCallCheck(this, Module);
	
		  this.quill = quill;
		  this.options = options;
		};
	
		Module.DEFAULTS = {};
	
		exports.default = Module;
	
	/***/ },
	/* 40 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = exports.Range = undefined;
	
		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _clone = __webpack_require__(38);
	
		var _clone2 = _interopRequireDefault(_clone);
	
		var _deepEqual = __webpack_require__(22);
	
		var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
		var _emitter3 = __webpack_require__(35);
	
		var _emitter4 = _interopRequireDefault(_emitter3);
	
		var _logger = __webpack_require__(37);
	
		var _logger2 = _interopRequireDefault(_logger);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		var debug = (0, _logger2.default)('quill:selection');
	
		var Range = function Range(index) {
		  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
		  _classCallCheck(this, Range);
	
		  this.index = index;
		  this.length = length;
		};
	
		var Selection = function () {
		  function Selection(scroll, emitter) {
		    var _this = this;
	
		    _classCallCheck(this, Selection);
	
		    this.emitter = emitter;
		    this.scroll = scroll;
		    this.composing = false;
		    this.root = this.scroll.domNode;
		    this.root.addEventListener('compositionstart', function () {
		      _this.composing = true;
		    });
		    this.root.addEventListener('compositionend', function () {
		      _this.composing = false;
		    });
		    this.cursor = _parchment2.default.create('cursor', this);
		    // savedRange is last non-null range
		    this.lastRange = this.savedRange = new Range(0, 0);
		    ['keyup', 'mouseup', 'mouseleave', 'touchend', 'touchleave', 'focus', 'blur'].forEach(function (eventName) {
		      _this.root.addEventListener(eventName, function () {
		        // When range used to be a selection and user click within the selection,
		        // the range now being a cursor has not updated yet without setTimeout
		        setTimeout(_this.update.bind(_this, _emitter4.default.sources.USER), 100);
		      });
		    });
		    this.emitter.on(_emitter4.default.events.EDITOR_CHANGE, function (type, delta) {
		      if (type === _emitter4.default.events.TEXT_CHANGE && delta.length() > 0) {
		        _this.update(_emitter4.default.sources.SILENT);
		      }
		    });
		    this.emitter.on(_emitter4.default.events.SCROLL_BEFORE_UPDATE, function () {
		      var native = _this.getNativeRange();
		      if (native == null) return;
		      if (native.start.node === _this.cursor.textNode) return; // cursor.restore() will handle
		      // TODO unclear if this has negative side effects
		      _this.emitter.once(_emitter4.default.events.SCROLL_UPDATE, function () {
		        try {
		          _this.setNativeRange(native.start.node, native.start.offset, native.end.node, native.end.offset);
		        } catch (ignored) {}
		      });
		    });
		    this.update(_emitter4.default.sources.SILENT);
		  }
	
		  _createClass(Selection, [{
		    key: 'focus',
		    value: function focus() {
		      if (this.hasFocus()) return;
		      this.root.focus();
		      this.setRange(this.savedRange);
		    }
		  }, {
		    key: 'format',
		    value: function format(_format, value) {
		      if (this.scroll.whitelist != null && !this.scroll.whitelist[_format]) return;
		      this.scroll.update();
		      var nativeRange = this.getNativeRange();
		      if (nativeRange == null || !nativeRange.native.collapsed || _parchment2.default.query(_format, _parchment2.default.Scope.BLOCK)) return;
		      if (nativeRange.start.node !== this.cursor.textNode) {
		        var blot = _parchment2.default.find(nativeRange.start.node, false);
		        if (blot == null) return;
		        // TODO Give blot ability to not split
		        if (blot instanceof _parchment2.default.Leaf) {
		          var after = blot.split(nativeRange.start.offset);
		          blot.parent.insertBefore(this.cursor, after);
		        } else {
		          blot.insertBefore(this.cursor, nativeRange.start.node); // Should never happen
		        }
		        this.cursor.attach();
		      }
		      this.cursor.format(_format, value);
		      this.scroll.optimize();
		      this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length);
		      this.update();
		    }
		  }, {
		    key: 'getBounds',
		    value: function getBounds(index) {
		      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
		      var scrollLength = this.scroll.length();
		      index = Math.min(index, scrollLength - 1);
		      length = Math.min(index + length, scrollLength - 1) - index;
		      var bounds = void 0,
		          node = void 0,
		          _scroll$leaf = this.scroll.leaf(index),
		          _scroll$leaf2 = _slicedToArray(_scroll$leaf, 2),
		          leaf = _scroll$leaf2[0],
		          offset = _scroll$leaf2[1];
		      if (leaf == null) return null;
	
		      var _leaf$position = leaf.position(offset, true);
	
		      var _leaf$position2 = _slicedToArray(_leaf$position, 2);
	
		      node = _leaf$position2[0];
		      offset = _leaf$position2[1];
	
		      var range = document.createRange();
		      if (length > 0) {
		        range.setStart(node, offset);
	
		        var _scroll$leaf3 = this.scroll.leaf(index + length);
	
		        var _scroll$leaf4 = _slicedToArray(_scroll$leaf3, 2);
	
		        leaf = _scroll$leaf4[0];
		        offset = _scroll$leaf4[1];
	
		        if (leaf == null) return null;
	
		        var _leaf$position3 = leaf.position(offset, true);
	
		        var _leaf$position4 = _slicedToArray(_leaf$position3, 2);
	
		        node = _leaf$position4[0];
		        offset = _leaf$position4[1];
	
		        range.setEnd(node, offset);
		        bounds = range.getBoundingClientRect();
		      } else {
		        var side = 'left';
		        var rect = void 0;
		        if (node instanceof Text) {
		          if (offset < node.data.length) {
		            range.setStart(node, offset);
		            range.setEnd(node, offset + 1);
		          } else {
		            range.setStart(node, offset - 1);
		            range.setEnd(node, offset);
		            side = 'right';
		          }
		          rect = range.getBoundingClientRect();
		        } else {
		          rect = leaf.domNode.getBoundingClientRect();
		          if (offset > 0) side = 'right';
		        }
		        bounds = {
		          height: rect.height,
		          left: rect[side],
		          width: 0,
		          top: rect.top
		        };
		      }
		      var containerBounds = this.root.parentNode.getBoundingClientRect();
		      return {
		        left: bounds.left - containerBounds.left,
		        right: bounds.left + bounds.width - containerBounds.left,
		        top: bounds.top - containerBounds.top,
		        bottom: bounds.top + bounds.height - containerBounds.top,
		        height: bounds.height,
		        width: bounds.width
		      };
		    }
		  }, {
		    key: 'getNativeRange',
		    value: function getNativeRange() {
		      var selection = document.getSelection();
		      if (selection == null || selection.rangeCount <= 0) return null;
		      var nativeRange = selection.getRangeAt(0);
		      if (nativeRange == null) return null;
		      if (!contains(this.root, nativeRange.startContainer) || !nativeRange.collapsed && !contains(this.root, nativeRange.endContainer)) {
		        return null;
		      }
		      var range = {
		        start: { node: nativeRange.startContainer, offset: nativeRange.startOffset },
		        end: { node: nativeRange.endContainer, offset: nativeRange.endOffset },
		        native: nativeRange
		      };
		      [range.start, range.end].forEach(function (position) {
		        var node = position.node,
		            offset = position.offset;
		        while (!(node instanceof Text) && node.childNodes.length > 0) {
		          if (node.childNodes.length > offset) {
		            node = node.childNodes[offset];
		            offset = 0;
		          } else if (node.childNodes.length === offset) {
		            node = node.lastChild;
		            offset = node instanceof Text ? node.data.length : node.childNodes.length + 1;
		          } else {
		            break;
		          }
		        }
		        position.node = node, position.offset = offset;
		      });
		      debug.info('getNativeRange', range);
		      return range;
		    }
		  }, {
		    key: 'getRange',
		    value: function getRange() {
		      var _this2 = this;
	
		      var range = this.getNativeRange();
		      if (range == null) return [null, null];
		      var positions = [[range.start.node, range.start.offset]];
		      if (!range.native.collapsed) {
		        positions.push([range.end.node, range.end.offset]);
		      }
		      var indexes = positions.map(function (position) {
		        var _position = _slicedToArray(position, 2),
		            node = _position[0],
		            offset = _position[1];
	
		        var blot = _parchment2.default.find(node, true);
		        var index = blot.offset(_this2.scroll);
		        if (offset === 0) {
		          return index;
		        } else if (blot instanceof _parchment2.default.Container) {
		          return index + blot.length();
		        } else {
		          return index + blot.index(node, offset);
		        }
		      });
		      var start = Math.min.apply(Math, _toConsumableArray(indexes)),
		          end = Math.max.apply(Math, _toConsumableArray(indexes));
		      end = Math.min(end, this.scroll.length() - 1);
		      return [new Range(start, end - start), range];
		    }
		  }, {
		    key: 'hasFocus',
		    value: function hasFocus() {
		      return document.activeElement === this.root;
		    }
		  }, {
		    key: 'scrollIntoView',
		    value: function scrollIntoView() {
		      var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.lastRange;
	
		      if (range == null) return;
		      var bounds = this.getBounds(range.index, range.length);
		      if (bounds == null) return;
		      if (this.root.offsetHeight < bounds.bottom) {
		        var _scroll$line = this.scroll.line(Math.min(range.index + range.length, this.scroll.length() - 1)),
		            _scroll$line2 = _slicedToArray(_scroll$line, 1),
		            line = _scroll$line2[0];
	
		        this.root.scrollTop = line.domNode.offsetTop + line.domNode.offsetHeight - this.root.offsetHeight;
		      } else if (bounds.top < 0) {
		        var _scroll$line3 = this.scroll.line(Math.min(range.index, this.scroll.length() - 1)),
		            _scroll$line4 = _slicedToArray(_scroll$line3, 1),
		            _line = _scroll$line4[0];
	
		        this.root.scrollTop = _line.domNode.offsetTop;
		      }
		    }
		  }, {
		    key: 'setNativeRange',
		    value: function setNativeRange(startNode, startOffset) {
		      var endNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : startNode;
		      var endOffset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : startOffset;
		      var force = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
	
		      debug.info('setNativeRange', startNode, startOffset, endNode, endOffset);
		      if (startNode != null && (this.root.parentNode == null || startNode.parentNode == null || endNode.parentNode == null)) {
		        return;
		      }
		      var selection = document.getSelection();
		      if (selection == null) return;
		      if (startNode != null) {
		        if (!this.hasFocus()) this.root.focus();
		        var native = (this.getNativeRange() || {}).native;
		        if (native == null || force || startNode !== native.startContainer || startOffset !== native.startOffset || endNode !== native.endContainer || endOffset !== native.endOffset) {
	
		          if (startNode.tagName == "BR") {
		            startOffset = [].indexOf.call(startNode.parentNode.childNodes, startNode);
		            startNode = startNode.parentNode;
		          }
		          if (endNode.tagName == "BR") {
		            endOffset = [].indexOf.call(endNode.parentNode.childNodes, endNode);
		            endNode = endNode.parentNode;
		          }
		          var range = document.createRange();
		          range.setStart(startNode, startOffset);
		          range.setEnd(endNode, endOffset);
		          selection.removeAllRanges();
		          selection.addRange(range);
		        }
		      } else {
		        selection.removeAllRanges();
		        this.root.blur();
		        document.body.focus(); // root.blur() not enough on IE11+Travis+SauceLabs (but not local VMs)
		      }
		    }
		  }, {
		    key: 'setRange',
		    value: function setRange(range) {
		      var _this3 = this;
	
		      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _emitter4.default.sources.API;
	
		      if (typeof force === 'string') {
		        source = force;
		        force = false;
		      }
		      debug.info('setRange', range);
		      if (range != null) {
		        (function () {
		          var indexes = range.collapsed ? [range.index] : [range.index, range.index + range.length];
		          var args = [];
		          var scrollLength = _this3.scroll.length();
		          indexes.forEach(function (index, i) {
		            index = Math.min(scrollLength - 1, index);
		            var node = void 0,
		                _scroll$leaf5 = _this3.scroll.leaf(index),
		                _scroll$leaf6 = _slicedToArray(_scroll$leaf5, 2),
		                leaf = _scroll$leaf6[0],
		                offset = _scroll$leaf6[1];
		            var _leaf$position5 = leaf.position(offset, i !== 0);
	
		            var _leaf$position6 = _slicedToArray(_leaf$position5, 2);
	
		            node = _leaf$position6[0];
		            offset = _leaf$position6[1];
	
		            args.push(node, offset);
		          });
		          if (args.length < 2) {
		            args = args.concat(args);
		          }
		          _this3.setNativeRange.apply(_this3, _toConsumableArray(args).concat([force]));
		        })();
		      } else {
		        this.setNativeRange(null);
		      }
		      this.update(source);
		    }
		  }, {
		    key: 'update',
		    value: function update() {
		      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _emitter4.default.sources.USER;
	
		      var oldRange = this.lastRange;
	
		      var _getRange = this.getRange(),
		          _getRange2 = _slicedToArray(_getRange, 2),
		          lastRange = _getRange2[0],
		          nativeRange = _getRange2[1];
	
		      this.lastRange = lastRange;
		      if (this.lastRange != null) {
		        this.savedRange = this.lastRange;
		      }
		      if (!(0, _deepEqual2.default)(oldRange, this.lastRange)) {
		        var _emitter;
	
		        if (!this.composing && nativeRange != null && nativeRange.native.collapsed && nativeRange.start.node !== this.cursor.textNode) {
		          this.cursor.restore();
		        }
		        var args = [_emitter4.default.events.SELECTION_CHANGE, (0, _clone2.default)(this.lastRange), (0, _clone2.default)(oldRange), source];
		        (_emitter = this.emitter).emit.apply(_emitter, [_emitter4.default.events.EDITOR_CHANGE].concat(args));
		        if (source !== _emitter4.default.sources.SILENT) {
		          var _emitter2;
	
		          (_emitter2 = this.emitter).emit.apply(_emitter2, args);
		        }
		      }
		    }
		  }]);
	
		  return Selection;
		}();
	
		function contains(parent, descendant) {
		  try {
		    // Firefox inserts inaccessible nodes around video elements
		    descendant.parentNode;
		  } catch (e) {
		    return false;
		  }
		  // IE11 has bug with Text nodes
		  // https://connect.microsoft.com/IE/feedback/details/780874/node-contains-is-incorrect
		  if (descendant instanceof Text) {
		    descendant = descendant.parentNode;
		  }
		  return parent.contains(descendant);
		}
	
		exports.Range = Range;
		exports.default = Selection;
	
	/***/ },
	/* 41 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		var Theme = function () {
		  function Theme(quill, options) {
		    _classCallCheck(this, Theme);
	
		    this.quill = quill;
		    this.options = options;
		    this.modules = {};
		  }
	
		  _createClass(Theme, [{
		    key: 'init',
		    value: function init() {
		      var _this = this;
	
		      Object.keys(this.options.modules).forEach(function (name) {
		        if (_this.modules[name] == null) {
		          _this.addModule(name);
		        }
		      });
		    }
		  }, {
		    key: 'addModule',
		    value: function addModule(name) {
		      var moduleClass = this.quill.constructor.import('modules/' + name);
		      this.modules[name] = new moduleClass(this.quill, this.options.modules[name] || {});
		      return this.modules[name];
		    }
		  }]);
	
		  return Theme;
		}();
	
		Theme.DEFAULTS = {
		  modules: {}
		};
		Theme.themes = {
		  'default': Theme
		};
	
		exports.default = Theme;
	
	/***/ },
	/* 42 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _block = __webpack_require__(29);
	
		var _block2 = _interopRequireDefault(_block);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Container = function (_Parchment$Container) {
		  _inherits(Container, _Parchment$Container);
	
		  function Container() {
		    _classCallCheck(this, Container);
	
		    return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
		  }
	
		  return Container;
		}(_parchment2.default.Container);
	
		Container.allowedChildren = [_block2.default, _block.BlockEmbed, Container];
	
		exports.default = Container;
	
	/***/ },
	/* 43 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _emitter = __webpack_require__(35);
	
		var _emitter2 = _interopRequireDefault(_emitter);
	
		var _block = __webpack_require__(29);
	
		var _block2 = _interopRequireDefault(_block);
	
		var _break = __webpack_require__(30);
	
		var _break2 = _interopRequireDefault(_break);
	
		var _container = __webpack_require__(42);
	
		var _container2 = _interopRequireDefault(_container);
	
		var _code = __webpack_require__(28);
	
		var _code2 = _interopRequireDefault(_code);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		function isLine(blot) {
		  return blot instanceof _block2.default || blot instanceof _block.BlockEmbed;
		}
	
		var Scroll = function (_Parchment$Scroll) {
		  _inherits(Scroll, _Parchment$Scroll);
	
		  function Scroll(domNode, config) {
		    _classCallCheck(this, Scroll);
	
		    var _this = _possibleConstructorReturn(this, (Scroll.__proto__ || Object.getPrototypeOf(Scroll)).call(this, domNode));
	
		    _this.emitter = config.emitter;
		    if (Array.isArray(config.whitelist)) {
		      _this.whitelist = config.whitelist.reduce(function (whitelist, format) {
		        whitelist[format] = true;
		        return whitelist;
		      }, {});
		    }
		    _this.optimize();
		    _this.enable();
		    return _this;
		  }
	
		  _createClass(Scroll, [{
		    key: 'deleteAt',
		    value: function deleteAt(index, length) {
		      var _line = this.line(index),
		          _line2 = _slicedToArray(_line, 2),
		          first = _line2[0],
		          offset = _line2[1];
	
		      var _line3 = this.line(index + length),
		          _line4 = _slicedToArray(_line3, 1),
		          last = _line4[0];
	
		      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'deleteAt', this).call(this, index, length);
		      if (last != null && first !== last && offset > 0 && !(first instanceof _block.BlockEmbed) && !(last instanceof _block.BlockEmbed)) {
		        if (last instanceof _code2.default) {
		          last.deleteAt(last.length() - 1, 1);
		        }
		        var ref = last.children.head instanceof _break2.default ? null : last.children.head;
		        first.moveChildren(last, ref);
		        first.remove();
		      }
		      this.optimize();
		    }
		  }, {
		    key: 'enable',
		    value: function enable() {
		      var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
		      this.domNode.setAttribute('contenteditable', enabled);
		    }
		  }, {
		    key: 'formatAt',
		    value: function formatAt(index, length, format, value) {
		      if (this.whitelist != null && !this.whitelist[format]) return;
		      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'formatAt', this).call(this, index, length, format, value);
		      this.optimize();
		    }
		  }, {
		    key: 'insertAt',
		    value: function insertAt(index, value, def) {
		      if (def != null && this.whitelist != null && !this.whitelist[value]) return;
		      if (index >= this.length()) {
		        if (def == null || _parchment2.default.query(value, _parchment2.default.Scope.BLOCK) == null) {
		          var blot = _parchment2.default.create(this.statics.defaultChild);
		          this.appendChild(blot);
		          if (def == null && value.endsWith('\n')) {
		            value = value.slice(0, -1);
		          }
		          blot.insertAt(0, value, def);
		        } else {
		          var embed = _parchment2.default.create(value, def);
		          this.appendChild(embed);
		        }
		      } else {
		        _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'insertAt', this).call(this, index, value, def);
		      }
		      this.optimize();
		    }
		  }, {
		    key: 'insertBefore',
		    value: function insertBefore(blot, ref) {
		      if (blot.statics.scope === _parchment2.default.Scope.INLINE_BLOT) {
		        var wrapper = _parchment2.default.create(this.statics.defaultChild);
		        wrapper.appendChild(blot);
		        blot = wrapper;
		      }
		      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'insertBefore', this).call(this, blot, ref);
		    }
		  }, {
		    key: 'leaf',
		    value: function leaf(index) {
		      return this.path(index).pop() || [null, -1];
		    }
		  }, {
		    key: 'line',
		    value: function line(index) {
		      if (index === this.length()) {
		        return this.line(index - 1);
		      }
		      return this.descendant(isLine, index);
		    }
		  }, {
		    key: 'lines',
		    value: function lines() {
		      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;
	
		      var getLines = function getLines(blot, index, length) {
		        var lines = [],
		            lengthLeft = length;
		        blot.children.forEachAt(index, length, function (child, index, length) {
		          if (isLine(child)) {
		            lines.push(child);
		          } else if (child instanceof _parchment2.default.Container) {
		            lines = lines.concat(getLines(child, index, lengthLeft));
		          }
		          lengthLeft -= length;
		        });
		        return lines;
		      };
		      return getLines(this, index, length);
		    }
		  }, {
		    key: 'optimize',
		    value: function optimize() {
		      var mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
		      if (this.batch === true) return;
		      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'optimize', this).call(this, mutations);
		      if (mutations.length > 0) {
		        this.emitter.emit(_emitter2.default.events.SCROLL_OPTIMIZE, mutations);
		      }
		    }
		  }, {
		    key: 'path',
		    value: function path(index) {
		      return _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'path', this).call(this, index).slice(1); // Exclude self
		    }
		  }, {
		    key: 'update',
		    value: function update(mutations) {
		      if (this.batch === true) return;
		      var source = _emitter2.default.sources.USER;
		      if (typeof mutations === 'string') {
		        source = mutations;
		      }
		      if (!Array.isArray(mutations)) {
		        mutations = this.observer.takeRecords();
		      }
		      if (mutations.length > 0) {
		        this.emitter.emit(_emitter2.default.events.SCROLL_BEFORE_UPDATE, source, mutations);
		      }
		      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'update', this).call(this, mutations.concat([])); // pass copy
		      if (mutations.length > 0) {
		        this.emitter.emit(_emitter2.default.events.SCROLL_UPDATE, source, mutations);
		      }
		    }
		  }]);
	
		  return Scroll;
		}(_parchment2.default.Scroll);
	
		Scroll.blotName = 'scroll';
		Scroll.className = 'ql-editor';
		Scroll.tagName = 'DIV';
		Scroll.defaultChild = 'block';
		Scroll.allowedChildren = [_block2.default, _block.BlockEmbed, _container2.default];
	
		exports.default = Scroll;
	
	/***/ },
	/* 44 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.matchText = exports.matchSpacing = exports.matchNewline = exports.matchBlot = exports.matchAttributor = exports.default = undefined;
	
		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _quillDelta = __webpack_require__(20);
	
		var _quillDelta2 = _interopRequireDefault(_quillDelta);
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _quill = __webpack_require__(18);
	
		var _quill2 = _interopRequireDefault(_quill);
	
		var _logger = __webpack_require__(37);
	
		var _logger2 = _interopRequireDefault(_logger);
	
		var _module = __webpack_require__(39);
	
		var _module2 = _interopRequireDefault(_module);
	
		var _align = __webpack_require__(45);
	
		var _background = __webpack_require__(46);
	
		var _color = __webpack_require__(47);
	
		var _direction = __webpack_require__(48);
	
		var _font = __webpack_require__(49);
	
		var _size = __webpack_require__(50);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
		function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var debug = (0, _logger2.default)('quill:clipboard');
	
		var DOM_KEY = '__ql-matcher';
	
		var CLIPBOARD_CONFIG = [[Node.TEXT_NODE, matchText], ['br', matchBreak], [Node.ELEMENT_NODE, matchNewline], [Node.ELEMENT_NODE, matchBlot], [Node.ELEMENT_NODE, matchSpacing], [Node.ELEMENT_NODE, matchAttributor], [Node.ELEMENT_NODE, matchStyles], ['b', matchAlias.bind(matchAlias, 'bold')], ['i', matchAlias.bind(matchAlias, 'italic')], ['style', matchIgnore]];
	
		var ATTRIBUTE_ATTRIBUTORS = [_align.AlignAttribute, _direction.DirectionAttribute].reduce(function (memo, attr) {
		  memo[attr.keyName] = attr;
		  return memo;
		}, {});
	
		var STYLE_ATTRIBUTORS = [_align.AlignStyle, _background.BackgroundStyle, _color.ColorStyle, _direction.DirectionStyle, _font.FontStyle, _size.SizeStyle].reduce(function (memo, attr) {
		  memo[attr.keyName] = attr;
		  return memo;
		}, {});
	
		var Clipboard = function (_Module) {
		  _inherits(Clipboard, _Module);
	
		  function Clipboard(quill, options) {
		    _classCallCheck(this, Clipboard);
	
		    var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this, quill, options));
	
		    _this.quill.root.addEventListener('paste', _this.onPaste.bind(_this));
		    _this.container = _this.quill.addContainer('ql-clipboard');
		    _this.container.setAttribute('contenteditable', true);
		    _this.container.setAttribute('tabindex', -1);
		    _this.matchers = [];
		    CLIPBOARD_CONFIG.concat(_this.options.matchers).forEach(function (pair) {
		      _this.addMatcher.apply(_this, _toConsumableArray(pair));
		    });
		    return _this;
		  }
	
		  _createClass(Clipboard, [{
		    key: 'addMatcher',
		    value: function addMatcher(selector, matcher) {
		      this.matchers.push([selector, matcher]);
		    }
		  }, {
		    key: 'convert',
		    value: function convert(html) {
		      if (typeof html === 'string') {
		        this.container.innerHTML = html;
		      }
	
		      var _prepareMatching = this.prepareMatching(),
		          _prepareMatching2 = _slicedToArray(_prepareMatching, 2),
		          elementMatchers = _prepareMatching2[0],
		          textMatchers = _prepareMatching2[1];
	
		      var delta = traverse(this.container, elementMatchers, textMatchers);
		      // Remove trailing newline
		      if (deltaEndsWith(delta, '\n') && delta.ops[delta.ops.length - 1].attributes == null) {
		        delta = delta.compose(new _quillDelta2.default().retain(delta.length() - 1).delete(1));
		      }
		      debug.log('convert', this.container.innerHTML, delta);
		      this.container.innerHTML = '';
		      return delta;
		    }
		  }, {
		    key: 'dangerouslyPasteHTML',
		    value: function dangerouslyPasteHTML(index, html) {
		      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _quill2.default.sources.API;
	
		      if (typeof index === 'string') {
		        return this.quill.setContents(this.convert(index), html);
		      } else {
		        var paste = this.convert(html);
		        return this.quill.updateContents(new _quillDelta2.default().retain(index).concat(paste), source);
		      }
		    }
		  }, {
		    key: 'onPaste',
		    value: function onPaste(e) {
		      var _this2 = this;
	
		      if (e.defaultPrevented || !this.quill.isEnabled()) return;
		      var range = this.quill.getSelection();
		      var delta = new _quillDelta2.default().retain(range.index);
		      var scrollTop = this.quill.scrollingContainer.scrollTop;
		      this.container.focus();
		      setTimeout(function () {
		        _this2.quill.selection.update(_quill2.default.sources.SILENT);
		        delta = delta.concat(_this2.convert()).delete(range.length);
		        _this2.quill.updateContents(delta, _quill2.default.sources.USER);
		        // range.length contributes to delta.length()
		        _this2.quill.setSelection(delta.length() - range.length, _quill2.default.sources.SILENT);
		        _this2.quill.scrollingContainer.scrollTop = scrollTop;
		        _this2.quill.selection.scrollIntoView();
		      }, 1);
		    }
		  }, {
		    key: 'prepareMatching',
		    value: function prepareMatching() {
		      var _this3 = this;
	
		      var elementMatchers = [],
		          textMatchers = [];
		      this.matchers.forEach(function (pair) {
		        var _pair = _slicedToArray(pair, 2),
		            selector = _pair[0],
		            matcher = _pair[1];
	
		        switch (selector) {
		          case Node.TEXT_NODE:
		            textMatchers.push(matcher);
		            break;
		          case Node.ELEMENT_NODE:
		            elementMatchers.push(matcher);
		            break;
		          default:
		            [].forEach.call(_this3.container.querySelectorAll(selector), function (node) {
		              // TODO use weakmap
		              node[DOM_KEY] = node[DOM_KEY] || [];
		              node[DOM_KEY].push(matcher);
		            });
		            break;
		        }
		      });
		      return [elementMatchers, textMatchers];
		    }
		  }]);
	
		  return Clipboard;
		}(_module2.default);
	
		Clipboard.DEFAULTS = {
		  matchers: []
		};
	
		function computeStyle(node) {
		  if (node.nodeType !== Node.ELEMENT_NODE) return {};
		  var DOM_KEY = '__ql-computed-style';
		  return node[DOM_KEY] || (node[DOM_KEY] = window.getComputedStyle(node));
		}
	
		function deltaEndsWith(delta, text) {
		  var endText = "";
		  for (var i = delta.ops.length - 1; i >= 0 && endText.length < text.length; --i) {
		    var op = delta.ops[i];
		    if (typeof op.insert !== 'string') break;
		    endText = op.insert + endText;
		  }
		  return endText.slice(-1 * text.length) === text;
		}
	
		function isLine(node) {
		  if (node.childNodes.length === 0) return false; // Exclude embed blocks
		  var style = computeStyle(node);
		  return ['block', 'list-item'].indexOf(style.display) > -1;
		}
	
		function traverse(node, elementMatchers, textMatchers) {
		  // Post-order
		  if (node.nodeType === node.TEXT_NODE) {
		    return textMatchers.reduce(function (delta, matcher) {
		      return matcher(node, delta);
		    }, new _quillDelta2.default());
		  } else if (node.nodeType === node.ELEMENT_NODE) {
		    return [].reduce.call(node.childNodes || [], function (delta, childNode) {
		      var childrenDelta = traverse(childNode, elementMatchers, textMatchers);
		      if (childNode.nodeType === node.ELEMENT_NODE) {
		        childrenDelta = elementMatchers.reduce(function (childrenDelta, matcher) {
		          return matcher(childNode, childrenDelta);
		        }, childrenDelta);
		        childrenDelta = (childNode[DOM_KEY] || []).reduce(function (childrenDelta, matcher) {
		          return matcher(childNode, childrenDelta);
		        }, childrenDelta);
		      }
		      return delta.concat(childrenDelta);
		    }, new _quillDelta2.default());
		  } else {
		    return new _quillDelta2.default();
		  }
		}
	
		function matchAlias(format, node, delta) {
		  return delta.compose(new _quillDelta2.default().retain(delta.length(), _defineProperty({}, format, true)));
		}
	
		function matchAttributor(node, delta) {
		  var attributes = _parchment2.default.Attributor.Attribute.keys(node);
		  var classes = _parchment2.default.Attributor.Class.keys(node);
		  var styles = _parchment2.default.Attributor.Style.keys(node);
		  var formats = {};
		  attributes.concat(classes).concat(styles).forEach(function (name) {
		    var attr = _parchment2.default.query(name, _parchment2.default.Scope.ATTRIBUTE);
		    if (attr != null) {
		      formats[attr.attrName] = attr.value(node);
		      if (formats[attr.attrName]) return;
		    }
		    if (ATTRIBUTE_ATTRIBUTORS[name] != null) {
		      attr = ATTRIBUTE_ATTRIBUTORS[name];
		      formats[attr.attrName] = attr.value(node) || undefined;
		    }
		    if (STYLE_ATTRIBUTORS[name] != null) {
		      attr = STYLE_ATTRIBUTORS[name];
		      formats[attr.attrName] = attr.value(node) || undefined;
		    }
		  });
		  if (Object.keys(formats).length > 0) {
		    delta = delta.compose(new _quillDelta2.default().retain(delta.length(), formats));
		  }
		  return delta;
		}
	
		function matchBlot(node, delta) {
		  var match = _parchment2.default.query(node);
		  if (match == null) return delta;
		  if (match.prototype instanceof _parchment2.default.Embed) {
		    var embed = {};
		    var value = match.value(node);
		    if (value != null) {
		      embed[match.blotName] = value;
		      delta = new _quillDelta2.default().insert(embed, match.formats(node));
		    }
		  } else if (typeof match.formats === 'function') {
		    var formats = _defineProperty({}, match.blotName, match.formats(node));
		    delta = delta.compose(new _quillDelta2.default().retain(delta.length(), formats));
		  }
		  return delta;
		}
	
		function matchBreak(node, delta) {
		  if (!deltaEndsWith(delta, '\n')) {
		    delta.insert('\n');
		  }
		  return delta;
		}
	
		function matchIgnore() {
		  return new _quillDelta2.default();
		}
	
		function matchNewline(node, delta) {
		  if (isLine(node) && !deltaEndsWith(delta, '\n')) {
		    delta.insert('\n');
		  }
		  return delta;
		}
	
		function matchSpacing(node, delta) {
		  if (isLine(node) && node.nextElementSibling != null && !deltaEndsWith(delta, '\n\n')) {
		    var nodeHeight = node.offsetHeight + parseFloat(computeStyle(node).marginTop) + parseFloat(computeStyle(node).marginBottom);
		    if (node.nextElementSibling.offsetTop > node.offsetTop + nodeHeight * 1.5) {
		      delta.insert('\n');
		    }
		  }
		  return delta;
		}
	
		function matchStyles(node, delta) {
		  var formats = {};
		  var style = node.style || {};
		  if (style.fontStyle && computeStyle(node).fontStyle === 'italic') {
		    formats.italic = true;
		  }
		  if (style.fontWeight && computeStyle(node).fontWeight === 'bold') {
		    formats.bold = true;
		  }
		  if (Object.keys(formats).length > 0) {
		    delta = delta.compose(new _quillDelta2.default().retain(delta.length(), formats));
		  }
		  if (parseFloat(style.textIndent || 0) > 0) {
		    // Could be 0.5in
		    delta = new _quillDelta2.default().insert('\t').concat(delta);
		  }
		  return delta;
		}
	
		function matchText(node, delta) {
		  var text = node.data;
		  // Word represents empty line with <o:p>&nbsp;</o:p>
		  if (node.parentNode.tagName === 'O:P') {
		    return delta.insert(text.trim());
		  }
		  if (!computeStyle(node.parentNode).whiteSpace.startsWith('pre')) {
		    // eslint-disable-next-line func-style
		    var replacer = function replacer(collapse, match) {
		      match = match.replace(/[^\u00a0]/g, ''); // \u00a0 is nbsp;
		      return match.length < 1 && collapse ? ' ' : match;
		    };
		    text = text.replace(/\r\n/g, ' ').replace(/\n/g, ' ');
		    text = text.replace(/\s\s+/g, replacer.bind(replacer, true)); // collapse whitespace
		    if (node.previousSibling == null && isLine(node.parentNode) || node.previousSibling != null && isLine(node.previousSibling)) {
		      text = text.replace(/^\s+/, replacer.bind(replacer, false));
		    }
		    if (node.nextSibling == null && isLine(node.parentNode) || node.nextSibling != null && isLine(node.nextSibling)) {
		      text = text.replace(/\s+$/, replacer.bind(replacer, false));
		    }
		  }
		  return delta.insert(text);
		}
	
		exports.default = Clipboard;
		exports.matchAttributor = matchAttributor;
		exports.matchBlot = matchBlot;
		exports.matchNewline = matchNewline;
		exports.matchSpacing = matchSpacing;
		exports.matchText = matchText;
	
	/***/ },
	/* 45 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.AlignStyle = exports.AlignClass = exports.AlignAttribute = undefined;
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		var config = {
		  scope: _parchment2.default.Scope.BLOCK,
		  whitelist: ['right', 'center', 'justify']
		};
	
		var AlignAttribute = new _parchment2.default.Attributor.Attribute('align', 'align', config);
		var AlignClass = new _parchment2.default.Attributor.Class('align', 'ql-align', config);
		var AlignStyle = new _parchment2.default.Attributor.Style('align', 'text-align', config);
	
		exports.AlignAttribute = AlignAttribute;
		exports.AlignClass = AlignClass;
		exports.AlignStyle = AlignStyle;
	
	/***/ },
	/* 46 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.BackgroundStyle = exports.BackgroundClass = undefined;
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _color = __webpack_require__(47);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		var BackgroundClass = new _parchment2.default.Attributor.Class('background', 'ql-bg', {
		  scope: _parchment2.default.Scope.INLINE
		});
		var BackgroundStyle = new _color.ColorAttributor('background', 'background-color', {
		  scope: _parchment2.default.Scope.INLINE
		});
	
		exports.BackgroundClass = BackgroundClass;
		exports.BackgroundStyle = BackgroundStyle;
	
	/***/ },
	/* 47 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.ColorStyle = exports.ColorClass = exports.ColorAttributor = undefined;
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var ColorAttributor = function (_Parchment$Attributor) {
		  _inherits(ColorAttributor, _Parchment$Attributor);
	
		  function ColorAttributor() {
		    _classCallCheck(this, ColorAttributor);
	
		    return _possibleConstructorReturn(this, (ColorAttributor.__proto__ || Object.getPrototypeOf(ColorAttributor)).apply(this, arguments));
		  }
	
		  _createClass(ColorAttributor, [{
		    key: 'value',
		    value: function value(domNode) {
		      var value = _get(ColorAttributor.prototype.__proto__ || Object.getPrototypeOf(ColorAttributor.prototype), 'value', this).call(this, domNode);
		      if (!value.startsWith('rgb(')) return value;
		      value = value.replace(/^[^\d]+/, '').replace(/[^\d]+$/, '');
		      return '#' + value.split(',').map(function (component) {
		        return ('00' + parseInt(component).toString(16)).slice(-2);
		      }).join('');
		    }
		  }]);
	
		  return ColorAttributor;
		}(_parchment2.default.Attributor.Style);
	
		var ColorClass = new _parchment2.default.Attributor.Class('color', 'ql-color', {
		  scope: _parchment2.default.Scope.INLINE
		});
		var ColorStyle = new ColorAttributor('color', 'color', {
		  scope: _parchment2.default.Scope.INLINE
		});
	
		exports.ColorAttributor = ColorAttributor;
		exports.ColorClass = ColorClass;
		exports.ColorStyle = ColorStyle;
	
	/***/ },
	/* 48 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.DirectionStyle = exports.DirectionClass = exports.DirectionAttribute = undefined;
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		var config = {
		  scope: _parchment2.default.Scope.BLOCK,
		  whitelist: ['rtl']
		};
	
		var DirectionAttribute = new _parchment2.default.Attributor.Attribute('direction', 'dir', config);
		var DirectionClass = new _parchment2.default.Attributor.Class('direction', 'ql-direction', config);
		var DirectionStyle = new _parchment2.default.Attributor.Style('direction', 'direction', config);
	
		exports.DirectionAttribute = DirectionAttribute;
		exports.DirectionClass = DirectionClass;
		exports.DirectionStyle = DirectionStyle;
	
	/***/ },
	/* 49 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.FontClass = exports.FontStyle = undefined;
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var config = {
		  scope: _parchment2.default.Scope.INLINE,
		  whitelist: ['serif', 'monospace']
		};
	
		var FontClass = new _parchment2.default.Attributor.Class('font', 'ql-font', config);
	
		var FontStyleAttributor = function (_Parchment$Attributor) {
		  _inherits(FontStyleAttributor, _Parchment$Attributor);
	
		  function FontStyleAttributor() {
		    _classCallCheck(this, FontStyleAttributor);
	
		    return _possibleConstructorReturn(this, (FontStyleAttributor.__proto__ || Object.getPrototypeOf(FontStyleAttributor)).apply(this, arguments));
		  }
	
		  _createClass(FontStyleAttributor, [{
		    key: 'value',
		    value: function value(node) {
		      return _get(FontStyleAttributor.prototype.__proto__ || Object.getPrototypeOf(FontStyleAttributor.prototype), 'value', this).call(this, node).replace(/["']/g, '');
		    }
		  }]);
	
		  return FontStyleAttributor;
		}(_parchment2.default.Attributor.Style);
	
		var FontStyle = new FontStyleAttributor('font', 'font-family', config);
	
		exports.FontStyle = FontStyle;
		exports.FontClass = FontClass;
	
	/***/ },
	/* 50 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.SizeStyle = exports.SizeClass = undefined;
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		var SizeClass = new _parchment2.default.Attributor.Class('size', 'ql-size', {
		  scope: _parchment2.default.Scope.INLINE,
		  whitelist: ['small', 'large', 'huge']
		});
		var SizeStyle = new _parchment2.default.Attributor.Style('size', 'font-size', {
		  scope: _parchment2.default.Scope.INLINE,
		  whitelist: ['10px', '18px', '32px']
		});
	
		exports.SizeClass = SizeClass;
		exports.SizeStyle = SizeStyle;
	
	/***/ },
	/* 51 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.getLastChangeIndex = exports.default = undefined;
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _quill = __webpack_require__(18);
	
		var _quill2 = _interopRequireDefault(_quill);
	
		var _module = __webpack_require__(39);
	
		var _module2 = _interopRequireDefault(_module);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var History = function (_Module) {
		  _inherits(History, _Module);
	
		  function History(quill, options) {
		    _classCallCheck(this, History);
	
		    var _this = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this, quill, options));
	
		    _this.lastRecorded = 0;
		    _this.ignoreChange = false;
		    _this.clear();
		    _this.quill.on(_quill2.default.events.EDITOR_CHANGE, function (eventName, delta, oldDelta, source) {
		      if (eventName !== _quill2.default.events.TEXT_CHANGE || _this.ignoreChange) return;
		      if (!_this.options.userOnly || source === _quill2.default.sources.USER) {
		        _this.record(delta, oldDelta);
		      } else {
		        _this.transform(delta);
		      }
		    });
		    _this.quill.keyboard.addBinding({ key: 'Z', shortKey: true }, _this.undo.bind(_this));
		    _this.quill.keyboard.addBinding({ key: 'Z', shortKey: true, shiftKey: true }, _this.redo.bind(_this));
		    if (/Win/i.test(navigator.platform)) {
		      _this.quill.keyboard.addBinding({ key: 'Y', shortKey: true }, _this.redo.bind(_this));
		    }
		    return _this;
		  }
	
		  _createClass(History, [{
		    key: 'change',
		    value: function change(source, dest) {
		      if (this.stack[source].length === 0) return;
		      var delta = this.stack[source].pop();
		      this.lastRecorded = 0;
		      this.ignoreChange = true;
		      this.quill.updateContents(delta[source], _quill2.default.sources.USER);
		      this.ignoreChange = false;
		      var index = getLastChangeIndex(delta[source]);
		      this.quill.setSelection(index);
		      this.quill.selection.scrollIntoView();
		      this.stack[dest].push(delta);
		    }
		  }, {
		    key: 'clear',
		    value: function clear() {
		      this.stack = { undo: [], redo: [] };
		    }
		  }, {
		    key: 'record',
		    value: function record(changeDelta, oldDelta) {
		      if (changeDelta.ops.length === 0) return;
		      this.stack.redo = [];
		      var undoDelta = this.quill.getContents().diff(oldDelta);
		      var timestamp = Date.now();
		      if (this.lastRecorded + this.options.delay > timestamp && this.stack.undo.length > 0) {
		        var delta = this.stack.undo.pop();
		        undoDelta = undoDelta.compose(delta.undo);
		        changeDelta = delta.redo.compose(changeDelta);
		      } else {
		        this.lastRecorded = timestamp;
		      }
		      this.stack.undo.push({
		        redo: changeDelta,
		        undo: undoDelta
		      });
		      if (this.stack.undo.length > this.options.maxStack) {
		        this.stack.undo.shift();
		      }
		    }
		  }, {
		    key: 'redo',
		    value: function redo() {
		      this.change('redo', 'undo');
		    }
		  }, {
		    key: 'transform',
		    value: function transform(delta) {
		      this.stack.undo.forEach(function (change) {
		        change.undo = delta.transform(change.undo, true);
		        change.redo = delta.transform(change.redo, true);
		      });
		      this.stack.redo.forEach(function (change) {
		        change.undo = delta.transform(change.undo, true);
		        change.redo = delta.transform(change.redo, true);
		      });
		    }
		  }, {
		    key: 'undo',
		    value: function undo() {
		      this.change('undo', 'redo');
		    }
		  }]);
	
		  return History;
		}(_module2.default);
	
		History.DEFAULTS = {
		  delay: 1000,
		  maxStack: 100,
		  userOnly: false
		};
	
		function endsWithNewlineChange(delta) {
		  var lastOp = delta.ops[delta.ops.length - 1];
		  if (lastOp == null) return false;
		  if (lastOp.insert != null) {
		    return typeof lastOp.insert === 'string' && lastOp.insert.endsWith('\n');
		  }
		  if (lastOp.attributes != null) {
		    return Object.keys(lastOp.attributes).some(function (attr) {
		      return _parchment2.default.query(attr, _parchment2.default.Scope.BLOCK) != null;
		    });
		  }
		  return false;
		}
	
		function getLastChangeIndex(delta) {
		  var deleteLength = delta.reduce(function (length, op) {
		    length += op.delete || 0;
		    return length;
		  }, 0);
		  var changeIndex = delta.length() - deleteLength;
		  if (endsWithNewlineChange(delta)) {
		    changeIndex -= 1;
		  }
		  return changeIndex;
		}
	
		exports.default = History;
		exports.getLastChangeIndex = getLastChangeIndex;
	
	/***/ },
	/* 52 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _clone = __webpack_require__(38);
	
		var _clone2 = _interopRequireDefault(_clone);
	
		var _deepEqual = __webpack_require__(22);
	
		var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
		var _extend = __webpack_require__(25);
	
		var _extend2 = _interopRequireDefault(_extend);
	
		var _op = __webpack_require__(26);
	
		var _op2 = _interopRequireDefault(_op);
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _quill = __webpack_require__(18);
	
		var _quill2 = _interopRequireDefault(_quill);
	
		var _logger = __webpack_require__(37);
	
		var _logger2 = _interopRequireDefault(_logger);
	
		var _module = __webpack_require__(39);
	
		var _module2 = _interopRequireDefault(_module);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var debug = (0, _logger2.default)('quill:keyboard');
	
		var SHORTKEY = /Mac/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';
	
		var Keyboard = function (_Module) {
		  _inherits(Keyboard, _Module);
	
		  _createClass(Keyboard, null, [{
		    key: 'match',
		    value: function match(evt, binding) {
		      binding = normalize(binding);
		      if (!!binding.shortKey !== evt[SHORTKEY] && binding.shortKey !== null) return false;
		      if (['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].some(function (key) {
		        return key != SHORTKEY && !!binding[key] !== evt[key] && binding[key] !== null;
		      })) {
		        return false;
		      }
		      return binding.key === (evt.which || evt.keyCode);
		    }
		  }]);
	
		  function Keyboard(quill, options) {
		    _classCallCheck(this, Keyboard);
	
		    var _this = _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call(this, quill, options));
	
		    _this.bindings = {};
		    Object.keys(_this.options.bindings).forEach(function (name) {
		      if (_this.options.bindings[name]) {
		        _this.addBinding(_this.options.bindings[name]);
		      }
		    });
		    _this.addBinding({ key: Keyboard.keys.ENTER, shiftKey: null }, handleEnter);
		    _this.addBinding({ key: Keyboard.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null }, function () {});
		    if (/Firefox/i.test(navigator.userAgent)) {
		      // Need to handle delete and backspace for Firefox in the general case #1171
		      _this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: true }, handleBackspace);
		      _this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: true }, handleDelete);
		    } else {
		      _this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: true, prefix: /^.?$/ }, handleBackspace);
		      _this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: true, suffix: /^.?$/ }, handleDelete);
		    }
		    _this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: false }, handleDeleteRange);
		    _this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: false }, handleDeleteRange);
		    _this.listen();
		    return _this;
		  }
	
		  _createClass(Keyboard, [{
		    key: 'addBinding',
		    value: function addBinding(key) {
		      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		      var handler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
		      var binding = normalize(key);
		      if (binding == null || binding.key == null) {
		        return debug.warn('Attempted to add invalid keyboard binding', binding);
		      }
		      if (typeof context === 'function') {
		        context = { handler: context };
		      }
		      if (typeof handler === 'function') {
		        handler = { handler: handler };
		      }
		      binding = (0, _extend2.default)(binding, context, handler);
		      this.bindings[binding.key] = this.bindings[binding.key] || [];
		      this.bindings[binding.key].push(binding);
		    }
		  }, {
		    key: 'listen',
		    value: function listen() {
		      var _this2 = this;
	
		      this.quill.root.addEventListener('keydown', function (evt) {
		        if (evt.defaultPrevented) return;
		        var which = evt.which || evt.keyCode;
		        var bindings = (_this2.bindings[which] || []).filter(function (binding) {
		          return Keyboard.match(evt, binding);
		        });
		        if (bindings.length === 0) return;
		        var range = _this2.quill.getSelection();
		        if (range == null || !_this2.quill.hasFocus()) return;
	
		        var _quill$getLine = _this2.quill.getLine(range.index),
		            _quill$getLine2 = _slicedToArray(_quill$getLine, 2),
		            line = _quill$getLine2[0],
		            offset = _quill$getLine2[1];
	
		        var _quill$getLeaf = _this2.quill.getLeaf(range.index),
		            _quill$getLeaf2 = _slicedToArray(_quill$getLeaf, 2),
		            leafStart = _quill$getLeaf2[0],
		            offsetStart = _quill$getLeaf2[1];
	
		        var _ref = range.length === 0 ? [leafStart, offsetStart] : _this2.quill.getLeaf(range.index + range.length),
		            _ref2 = _slicedToArray(_ref, 2),
		            leafEnd = _ref2[0],
		            offsetEnd = _ref2[1];
	
		        var prefixText = leafStart instanceof _parchment2.default.Text ? leafStart.value().slice(0, offsetStart) : '';
		        var suffixText = leafEnd instanceof _parchment2.default.Text ? leafEnd.value().slice(offsetEnd) : '';
		        var curContext = {
		          collapsed: range.length === 0,
		          empty: range.length === 0 && line.length() <= 1,
		          format: _this2.quill.getFormat(range),
		          offset: offset,
		          prefix: prefixText,
		          suffix: suffixText
		        };
		        var prevented = bindings.some(function (binding) {
		          if (binding.collapsed != null && binding.collapsed !== curContext.collapsed) return false;
		          if (binding.empty != null && binding.empty !== curContext.empty) return false;
		          if (binding.offset != null && binding.offset !== curContext.offset) return false;
		          if (Array.isArray(binding.format)) {
		            // any format is present
		            if (binding.format.every(function (name) {
		              return curContext.format[name] == null;
		            })) {
		              return false;
		            }
		          } else if (_typeof(binding.format) === 'object') {
		            // all formats must match
		            if (!Object.keys(binding.format).every(function (name) {
		              if (binding.format[name] === true) return curContext.format[name] != null;
		              if (binding.format[name] === false) return curContext.format[name] == null;
		              return (0, _deepEqual2.default)(binding.format[name], curContext.format[name]);
		            })) {
		              return false;
		            }
		          }
		          if (binding.prefix != null && !binding.prefix.test(curContext.prefix)) return false;
		          if (binding.suffix != null && !binding.suffix.test(curContext.suffix)) return false;
		          return binding.handler.call(_this2, range, curContext) !== true;
		        });
		        if (prevented) {
		          evt.preventDefault();
		        }
		      });
		    }
		  }]);
	
		  return Keyboard;
		}(_module2.default);
	
		Keyboard.keys = {
		  BACKSPACE: 8,
		  TAB: 9,
		  ENTER: 13,
		  ESCAPE: 27,
		  LEFT: 37,
		  UP: 38,
		  RIGHT: 39,
		  DOWN: 40,
		  DELETE: 46
		};
	
		Keyboard.DEFAULTS = {
		  bindings: {
		    'bold': makeFormatHandler('bold'),
		    'italic': makeFormatHandler('italic'),
		    'underline': makeFormatHandler('underline'),
		    'indent': {
		      // highlight tab or tab at beginning of list, indent or blockquote
		      key: Keyboard.keys.TAB,
		      format: ['blockquote', 'indent', 'list'],
		      handler: function handler(range, context) {
		        if (context.collapsed && context.offset !== 0) return true;
		        this.quill.format('indent', '+1', _quill2.default.sources.USER);
		      }
		    },
		    'outdent': {
		      key: Keyboard.keys.TAB,
		      shiftKey: true,
		      format: ['blockquote', 'indent', 'list'],
		      // highlight tab or tab at beginning of list, indent or blockquote
		      handler: function handler(range, context) {
		        if (context.collapsed && context.offset !== 0) return true;
		        this.quill.format('indent', '-1', _quill2.default.sources.USER);
		      }
		    },
		    'outdent backspace': {
		      key: Keyboard.keys.BACKSPACE,
		      collapsed: true,
		      format: ['blockquote', 'indent', 'list'],
		      offset: 0,
		      handler: function handler(range, context) {
		        if (context.format.indent != null) {
		          this.quill.format('indent', '-1', _quill2.default.sources.USER);
		        } else if (context.format.blockquote != null) {
		          this.quill.format('blockquote', false, _quill2.default.sources.USER);
		        } else if (context.format.list != null) {
		          this.quill.format('list', false, _quill2.default.sources.USER);
		        }
		      }
		    },
		    'indent code-block': makeCodeBlockHandler(true),
		    'outdent code-block': makeCodeBlockHandler(false),
		    'remove tab': {
		      key: Keyboard.keys.TAB,
		      shiftKey: true,
		      collapsed: true,
		      prefix: /\t$/,
		      handler: function handler(range) {
		        this.quill.deleteText(range.index - 1, 1, _quill2.default.sources.USER);
		      }
		    },
		    'tab': {
		      key: Keyboard.keys.TAB,
		      handler: function handler(range, context) {
		        if (!context.collapsed) {
		          this.quill.scroll.deleteAt(range.index, range.length);
		        }
		        this.quill.insertText(range.index, '\t', _quill2.default.sources.USER);
		        this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
		      }
		    },
		    'list empty enter': {
		      key: Keyboard.keys.ENTER,
		      collapsed: true,
		      format: ['list'],
		      empty: true,
		      handler: function handler(range, context) {
		        this.quill.format('list', false, _quill2.default.sources.USER);
		        if (context.format.indent) {
		          this.quill.format('indent', false, _quill2.default.sources.USER);
		        }
		      }
		    },
		    'checklist enter': {
		      key: Keyboard.keys.ENTER,
		      collapsed: true,
		      format: { list: 'checked' },
		      handler: function handler(range) {
		        this.quill.scroll.insertAt(range.index, '\n');
	
		        var _quill$getLine3 = this.quill.getLine(range.index + 1),
		            _quill$getLine4 = _slicedToArray(_quill$getLine3, 1),
		            line = _quill$getLine4[0];
	
		        line.format('list', 'unchecked');
		        this.quill.update(_quill2.default.sources.USER);
		        this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
		        this.quill.selection.scrollIntoView();
		      }
		    },
		    'header enter': {
		      key: Keyboard.keys.ENTER,
		      collapsed: true,
		      format: ['header'],
		      suffix: /^$/,
		      handler: function handler(range) {
		        this.quill.scroll.insertAt(range.index, '\n');
		        this.quill.formatText(range.index + 1, 1, 'header', false, _quill2.default.sources.USER);
		        this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
		        this.quill.selection.scrollIntoView();
		      }
		    },
		    'list autofill': {
		      key: ' ',
		      collapsed: true,
		      format: { list: false },
		      prefix: /^(1\.|-)$/,
		      handler: function handler(range, context) {
		        if (this.quill.scroll.whitelist != null && !this.quill.scroll.whitelist['list']) return true;
		        var length = context.prefix.length;
		        this.quill.scroll.deleteAt(range.index - length, length);
		        this.quill.formatLine(range.index - length, 1, 'list', length === 1 ? 'bullet' : 'ordered', _quill2.default.sources.USER);
		        this.quill.setSelection(range.index - length, _quill2.default.sources.SILENT);
		      }
		    },
		    'code exit': {
		      key: Keyboard.keys.ENTER,
		      collapsed: true,
		      format: ['code-block'],
		      prefix: /\n\n$/,
		      suffix: /^\s+$/,
		      handler: function handler(range) {
		        this.quill.format('code-block', false, _quill2.default.sources.USER);
		        this.quill.deleteText(range.index - 2, 1, _quill2.default.sources.USER);
		      }
		    }
		  }
		};
	
		function handleBackspace(range, context) {
		  if (range.index === 0) return;
	
		  var _quill$getLine5 = this.quill.getLine(range.index),
		      _quill$getLine6 = _slicedToArray(_quill$getLine5, 1),
		      line = _quill$getLine6[0];
	
		  var formats = {};
		  if (context.offset === 0) {
		    var curFormats = line.formats();
		    var prevFormats = this.quill.getFormat(range.index - 1, 1);
		    formats = _op2.default.attributes.diff(curFormats, prevFormats) || {};
		  }
		  // Check for astral symbols
		  var length = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(context.prefix) ? 2 : 1;
		  this.quill.deleteText(range.index - length, length, _quill2.default.sources.USER);
		  if (Object.keys(formats).length > 0) {
		    this.quill.formatLine(range.index - length, length, formats, _quill2.default.sources.USER);
		  }
		  this.quill.selection.scrollIntoView();
		}
	
		function handleDelete(range, context) {
		  // Check for astral symbols
		  var length = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(context.suffix) ? 2 : 1;
		  if (range.index >= this.quill.getLength() - length) return;
		  this.quill.deleteText(range.index, length, _quill2.default.sources.USER);
		}
	
		function handleDeleteRange(range) {
		  this.quill.deleteText(range, _quill2.default.sources.USER);
		  this.quill.setSelection(range.index, _quill2.default.sources.SILENT);
		  this.quill.selection.scrollIntoView();
		}
	
		function handleEnter(range, context) {
		  var _this3 = this;
	
		  if (range.length > 0) {
		    this.quill.scroll.deleteAt(range.index, range.length); // So we do not trigger text-change
		  }
		  var lineFormats = Object.keys(context.format).reduce(function (lineFormats, format) {
		    if (_parchment2.default.query(format, _parchment2.default.Scope.BLOCK) && !Array.isArray(context.format[format])) {
		      lineFormats[format] = context.format[format];
		    }
		    return lineFormats;
		  }, {});
		  this.quill.insertText(range.index, '\n', lineFormats, _quill2.default.sources.USER);
		  // Earlier scroll.deleteAt might have messed up our selection,
		  // so insertText's built in selection preservation is not reliable
		  this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
		  this.quill.selection.scrollIntoView();
		  Object.keys(context.format).forEach(function (name) {
		    if (lineFormats[name] != null) return;
		    if (Array.isArray(context.format[name])) return;
		    if (name === 'link') return;
		    _this3.quill.format(name, context.format[name], _quill2.default.sources.USER);
		  });
		}
	
		function makeCodeBlockHandler(indent) {
		  return {
		    key: Keyboard.keys.TAB,
		    shiftKey: !indent,
		    format: { 'code-block': true },
		    handler: function handler(range) {
		      var CodeBlock = _parchment2.default.query('code-block');
		      var index = range.index,
		          length = range.length;
	
		      var _quill$scroll$descend = this.quill.scroll.descendant(CodeBlock, index),
		          _quill$scroll$descend2 = _slicedToArray(_quill$scroll$descend, 2),
		          block = _quill$scroll$descend2[0],
		          offset = _quill$scroll$descend2[1];
	
		      if (block == null) return;
		      var scrollIndex = this.quill.getIndex(block);
		      var start = block.newlineIndex(offset, true) + 1;
		      var end = block.newlineIndex(scrollIndex + offset + length);
		      var lines = block.domNode.textContent.slice(start, end).split('\n');
		      offset = 0;
		      lines.forEach(function (line, i) {
		        if (indent) {
		          block.insertAt(start + offset, CodeBlock.TAB);
		          offset += CodeBlock.TAB.length;
		          if (i === 0) {
		            index += CodeBlock.TAB.length;
		          } else {
		            length += CodeBlock.TAB.length;
		          }
		        } else if (line.startsWith(CodeBlock.TAB)) {
		          block.deleteAt(start + offset, CodeBlock.TAB.length);
		          offset -= CodeBlock.TAB.length;
		          if (i === 0) {
		            index -= CodeBlock.TAB.length;
		          } else {
		            length -= CodeBlock.TAB.length;
		          }
		        }
		        offset += line.length + 1;
		      });
		      this.quill.update(_quill2.default.sources.USER);
		      this.quill.setSelection(index, length, _quill2.default.sources.SILENT);
		    }
		  };
		}
	
		function makeFormatHandler(format) {
		  return {
		    key: format[0].toUpperCase(),
		    shortKey: true,
		    handler: function handler(range, context) {
		      this.quill.format(format, !context.format[format], _quill2.default.sources.USER);
		    }
		  };
		}
	
		function normalize(binding) {
		  if (typeof binding === 'string' || typeof binding === 'number') {
		    return normalize({ key: binding });
		  }
		  if ((typeof binding === 'undefined' ? 'undefined' : _typeof(binding)) === 'object') {
		    binding = (0, _clone2.default)(binding, false);
		  }
		  if (typeof binding.key === 'string') {
		    if (Keyboard.keys[binding.key.toUpperCase()] != null) {
		      binding.key = Keyboard.keys[binding.key.toUpperCase()];
		    } else if (binding.key.length === 1) {
		      binding.key = binding.key.toUpperCase().charCodeAt(0);
		    } else {
		      return null;
		    }
		  }
		  return binding;
		}
	
		exports.default = Keyboard;
	
	/***/ },
	/* 53 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _core = __webpack_require__(1);
	
		var _core2 = _interopRequireDefault(_core);
	
		var _align = __webpack_require__(45);
	
		var _direction = __webpack_require__(48);
	
		var _indent = __webpack_require__(54);
	
		var _blockquote = __webpack_require__(55);
	
		var _blockquote2 = _interopRequireDefault(_blockquote);
	
		var _header = __webpack_require__(56);
	
		var _header2 = _interopRequireDefault(_header);
	
		var _list = __webpack_require__(57);
	
		var _list2 = _interopRequireDefault(_list);
	
		var _background = __webpack_require__(46);
	
		var _color = __webpack_require__(47);
	
		var _font = __webpack_require__(49);
	
		var _size = __webpack_require__(50);
	
		var _bold = __webpack_require__(58);
	
		var _bold2 = _interopRequireDefault(_bold);
	
		var _italic = __webpack_require__(59);
	
		var _italic2 = _interopRequireDefault(_italic);
	
		var _link = __webpack_require__(60);
	
		var _link2 = _interopRequireDefault(_link);
	
		var _script = __webpack_require__(61);
	
		var _script2 = _interopRequireDefault(_script);
	
		var _strike = __webpack_require__(62);
	
		var _strike2 = _interopRequireDefault(_strike);
	
		var _underline = __webpack_require__(63);
	
		var _underline2 = _interopRequireDefault(_underline);
	
		var _image = __webpack_require__(64);
	
		var _image2 = _interopRequireDefault(_image);
	
		var _video = __webpack_require__(65);
	
		var _video2 = _interopRequireDefault(_video);
	
		var _code = __webpack_require__(28);
	
		var _code2 = _interopRequireDefault(_code);
	
		var _formula = __webpack_require__(66);
	
		var _formula2 = _interopRequireDefault(_formula);
	
		var _syntax = __webpack_require__(67);
	
		var _syntax2 = _interopRequireDefault(_syntax);
	
		var _toolbar = __webpack_require__(68);
	
		var _toolbar2 = _interopRequireDefault(_toolbar);
	
		var _icons = __webpack_require__(69);
	
		var _icons2 = _interopRequireDefault(_icons);
	
		var _picker = __webpack_require__(102);
	
		var _picker2 = _interopRequireDefault(_picker);
	
		var _colorPicker = __webpack_require__(104);
	
		var _colorPicker2 = _interopRequireDefault(_colorPicker);
	
		var _iconPicker = __webpack_require__(105);
	
		var _iconPicker2 = _interopRequireDefault(_iconPicker);
	
		var _tooltip = __webpack_require__(106);
	
		var _tooltip2 = _interopRequireDefault(_tooltip);
	
		var _bubble = __webpack_require__(107);
	
		var _bubble2 = _interopRequireDefault(_bubble);
	
		var _snow = __webpack_require__(109);
	
		var _snow2 = _interopRequireDefault(_snow);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		_core2.default.register({
		  'attributors/attribute/direction': _direction.DirectionAttribute,
	
		  'attributors/class/align': _align.AlignClass,
		  'attributors/class/background': _background.BackgroundClass,
		  'attributors/class/color': _color.ColorClass,
		  'attributors/class/direction': _direction.DirectionClass,
		  'attributors/class/font': _font.FontClass,
		  'attributors/class/size': _size.SizeClass,
	
		  'attributors/style/align': _align.AlignStyle,
		  'attributors/style/background': _background.BackgroundStyle,
		  'attributors/style/color': _color.ColorStyle,
		  'attributors/style/direction': _direction.DirectionStyle,
		  'attributors/style/font': _font.FontStyle,
		  'attributors/style/size': _size.SizeStyle
		}, true);
	
		_core2.default.register({
		  'formats/align': _align.AlignClass,
		  'formats/direction': _direction.DirectionClass,
		  'formats/indent': _indent.IndentClass,
	
		  'formats/background': _background.BackgroundStyle,
		  'formats/color': _color.ColorStyle,
		  'formats/font': _font.FontClass,
		  'formats/size': _size.SizeClass,
	
		  'formats/blockquote': _blockquote2.default,
		  'formats/code-block': _code2.default,
		  'formats/header': _header2.default,
		  'formats/list': _list2.default,
	
		  'formats/bold': _bold2.default,
		  'formats/code': _code.Code,
		  'formats/italic': _italic2.default,
		  'formats/link': _link2.default,
		  'formats/script': _script2.default,
		  'formats/strike': _strike2.default,
		  'formats/underline': _underline2.default,
	
		  'formats/image': _image2.default,
		  'formats/video': _video2.default,
	
		  'formats/list/item': _list.ListItem,
	
		  'modules/formula': _formula2.default,
		  'modules/syntax': _syntax2.default,
		  'modules/toolbar': _toolbar2.default,
	
		  'themes/bubble': _bubble2.default,
		  'themes/snow': _snow2.default,
	
		  'ui/icons': _icons2.default,
		  'ui/picker': _picker2.default,
		  'ui/icon-picker': _iconPicker2.default,
		  'ui/color-picker': _colorPicker2.default,
		  'ui/tooltip': _tooltip2.default
		}, true);
	
		module.exports = _core2.default;
	
	/***/ },
	/* 54 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.IndentClass = undefined;
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var IdentAttributor = function (_Parchment$Attributor) {
		  _inherits(IdentAttributor, _Parchment$Attributor);
	
		  function IdentAttributor() {
		    _classCallCheck(this, IdentAttributor);
	
		    return _possibleConstructorReturn(this, (IdentAttributor.__proto__ || Object.getPrototypeOf(IdentAttributor)).apply(this, arguments));
		  }
	
		  _createClass(IdentAttributor, [{
		    key: 'add',
		    value: function add(node, value) {
		      if (value === '+1' || value === '-1') {
		        var indent = this.value(node) || 0;
		        value = value === '+1' ? indent + 1 : indent - 1;
		      }
		      if (value === 0) {
		        this.remove(node);
		        return true;
		      } else {
		        return _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'add', this).call(this, node, value);
		      }
		    }
		  }, {
		    key: 'canAdd',
		    value: function canAdd(node, value) {
		      return _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'canAdd', this).call(this, node, value) || _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'canAdd', this).call(this, node, parseInt(value));
		    }
		  }, {
		    key: 'value',
		    value: function value(node) {
		      return parseInt(_get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'value', this).call(this, node)) || undefined; // Don't return NaN
		    }
		  }]);
	
		  return IdentAttributor;
		}(_parchment2.default.Attributor.Class);
	
		var IndentClass = new IdentAttributor('indent', 'ql-indent', {
		  scope: _parchment2.default.Scope.BLOCK,
		  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
		});
	
		exports.IndentClass = IndentClass;
	
	/***/ },
	/* 55 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _block = __webpack_require__(29);
	
		var _block2 = _interopRequireDefault(_block);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Blockquote = function (_Block) {
		  _inherits(Blockquote, _Block);
	
		  function Blockquote() {
		    _classCallCheck(this, Blockquote);
	
		    return _possibleConstructorReturn(this, (Blockquote.__proto__ || Object.getPrototypeOf(Blockquote)).apply(this, arguments));
		  }
	
		  return Blockquote;
		}(_block2.default);
	
		Blockquote.blotName = 'blockquote';
		Blockquote.tagName = 'blockquote';
	
		exports.default = Blockquote;
	
	/***/ },
	/* 56 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _block = __webpack_require__(29);
	
		var _block2 = _interopRequireDefault(_block);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Header = function (_Block) {
		  _inherits(Header, _Block);
	
		  function Header() {
		    _classCallCheck(this, Header);
	
		    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
		  }
	
		  _createClass(Header, null, [{
		    key: 'formats',
		    value: function formats(domNode) {
		      return this.tagName.indexOf(domNode.tagName) + 1;
		    }
		  }]);
	
		  return Header;
		}(_block2.default);
	
		Header.blotName = 'header';
		Header.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
	
		exports.default = Header;
	
	/***/ },
	/* 57 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = exports.ListItem = undefined;
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _block = __webpack_require__(29);
	
		var _block2 = _interopRequireDefault(_block);
	
		var _container = __webpack_require__(42);
	
		var _container2 = _interopRequireDefault(_container);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var ListItem = function (_Block) {
		  _inherits(ListItem, _Block);
	
		  function ListItem() {
		    _classCallCheck(this, ListItem);
	
		    return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
		  }
	
		  _createClass(ListItem, [{
		    key: 'format',
		    value: function format(name, value) {
		      if (name === List.blotName && !value) {
		        this.replaceWith(_parchment2.default.create(this.statics.scope));
		      } else {
		        _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'format', this).call(this, name, value);
		      }
		    }
		  }, {
		    key: 'remove',
		    value: function remove() {
		      if (this.prev == null && this.next == null) {
		        this.parent.remove();
		      } else {
		        _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'remove', this).call(this);
		      }
		    }
		  }, {
		    key: 'replaceWith',
		    value: function replaceWith(name, value) {
		      this.parent.isolate(this.offset(this.parent), this.length());
		      if (name === this.parent.statics.blotName) {
		        this.parent.replaceWith(name, value);
		        return this;
		      } else {
		        this.parent.unwrap();
		        return _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'replaceWith', this).call(this, name, value);
		      }
		    }
		  }], [{
		    key: 'formats',
		    value: function formats(domNode) {
		      return domNode.tagName === this.tagName ? undefined : _get(ListItem.__proto__ || Object.getPrototypeOf(ListItem), 'formats', this).call(this, domNode);
		    }
		  }]);
	
		  return ListItem;
		}(_block2.default);
	
		ListItem.blotName = 'list-item';
		ListItem.tagName = 'LI';
	
		var List = function (_Container) {
		  _inherits(List, _Container);
	
		  _createClass(List, null, [{
		    key: 'create',
		    value: function create(value) {
		      var tagName = value === 'ordered' ? 'OL' : 'UL';
		      var node = _get(List.__proto__ || Object.getPrototypeOf(List), 'create', this).call(this, tagName);
		      if (value === 'checked' || value === 'unchecked') {
		        node.setAttribute('data-checked', value === 'checked');
		      }
		      return node;
		    }
		  }, {
		    key: 'formats',
		    value: function formats(domNode) {
		      if (domNode.tagName === 'OL') return 'ordered';
		      if (domNode.tagName === 'UL') {
		        if (domNode.hasAttribute('data-checked')) {
		          return domNode.getAttribute('data-checked') === 'true' ? 'checked' : 'unchecked';
		        } else {
		          return 'bullet';
		        }
		      }
		      return undefined;
		    }
		  }]);
	
		  function List(domNode) {
		    _classCallCheck(this, List);
	
		    var _this2 = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, domNode));
	
		    domNode.addEventListener('click', function (e) {
		      if (e.target.parentNode !== domNode) return;
		      var format = _this2.statics.formats(domNode);
		      var blot = _parchment2.default.find(e.target);
		      if (format === 'checked') {
		        blot.format('list', 'unchecked');
		      } else if (format === 'unchecked') {
		        blot.format('list', 'checked');
		      }
		    });
		    return _this2;
		  }
	
		  _createClass(List, [{
		    key: 'format',
		    value: function format(name, value) {
		      if (this.children.length > 0) {
		        this.children.tail.format(name, value);
		      }
		    }
		  }, {
		    key: 'formats',
		    value: function formats() {
		      // We don't inherit from FormatBlot
		      return _defineProperty({}, this.statics.blotName, this.statics.formats(this.domNode));
		    }
		  }, {
		    key: 'insertBefore',
		    value: function insertBefore(blot, ref) {
		      if (blot instanceof ListItem) {
		        _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'insertBefore', this).call(this, blot, ref);
		      } else {
		        var index = ref == null ? this.length() : ref.offset(this);
		        var after = this.split(index);
		        after.parent.insertBefore(blot, after);
		      }
		    }
		  }, {
		    key: 'optimize',
		    value: function optimize() {
		      _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'optimize', this).call(this);
		      var next = this.next;
		      if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && next.domNode.tagName === this.domNode.tagName && next.domNode.getAttribute('data-checked') === this.domNode.getAttribute('data-checked')) {
		        next.moveChildren(this);
		        next.remove();
		      }
		    }
		  }, {
		    key: 'replace',
		    value: function replace(target) {
		      if (target.statics.blotName !== this.statics.blotName) {
		        var item = _parchment2.default.create(this.statics.defaultChild);
		        target.moveChildren(item);
		        this.appendChild(item);
		      }
		      _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'replace', this).call(this, target);
		    }
		  }]);
	
		  return List;
		}(_container2.default);
	
		List.blotName = 'list';
		List.scope = _parchment2.default.Scope.BLOCK_BLOT;
		List.tagName = ['OL', 'UL'];
		List.defaultChild = 'list-item';
		List.allowedChildren = [ListItem];
	
		exports.ListItem = ListItem;
		exports.default = List;
	
	/***/ },
	/* 58 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _inline = __webpack_require__(32);
	
		var _inline2 = _interopRequireDefault(_inline);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Bold = function (_Inline) {
		  _inherits(Bold, _Inline);
	
		  function Bold() {
		    _classCallCheck(this, Bold);
	
		    return _possibleConstructorReturn(this, (Bold.__proto__ || Object.getPrototypeOf(Bold)).apply(this, arguments));
		  }
	
		  _createClass(Bold, [{
		    key: 'optimize',
		    value: function optimize() {
		      _get(Bold.prototype.__proto__ || Object.getPrototypeOf(Bold.prototype), 'optimize', this).call(this);
		      if (this.domNode.tagName !== this.statics.tagName[0]) {
		        this.replaceWith(this.statics.blotName);
		      }
		    }
		  }], [{
		    key: 'create',
		    value: function create() {
		      return _get(Bold.__proto__ || Object.getPrototypeOf(Bold), 'create', this).call(this);
		    }
		  }, {
		    key: 'formats',
		    value: function formats() {
		      return true;
		    }
		  }]);
	
		  return Bold;
		}(_inline2.default);
	
		Bold.blotName = 'bold';
		Bold.tagName = ['STRONG', 'B'];
	
		exports.default = Bold;
	
	/***/ },
	/* 59 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _bold = __webpack_require__(58);
	
		var _bold2 = _interopRequireDefault(_bold);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Italic = function (_Bold) {
		  _inherits(Italic, _Bold);
	
		  function Italic() {
		    _classCallCheck(this, Italic);
	
		    return _possibleConstructorReturn(this, (Italic.__proto__ || Object.getPrototypeOf(Italic)).apply(this, arguments));
		  }
	
		  return Italic;
		}(_bold2.default);
	
		Italic.blotName = 'italic';
		Italic.tagName = ['EM', 'I'];
	
		exports.default = Italic;
	
	/***/ },
	/* 60 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.sanitize = exports.default = undefined;
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _inline = __webpack_require__(32);
	
		var _inline2 = _interopRequireDefault(_inline);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Link = function (_Inline) {
		  _inherits(Link, _Inline);
	
		  function Link() {
		    _classCallCheck(this, Link);
	
		    return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
		  }
	
		  _createClass(Link, [{
		    key: 'format',
		    value: function format(name, value) {
		      if (name !== this.statics.blotName || !value) return _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), 'format', this).call(this, name, value);
		      value = this.constructor.sanitize(value);
		      this.domNode.setAttribute('href', value);
		    }
		  }], [{
		    key: 'create',
		    value: function create(value) {
		      var node = _get(Link.__proto__ || Object.getPrototypeOf(Link), 'create', this).call(this, value);
		      value = this.sanitize(value);
		      node.setAttribute('href', value);
		      node.setAttribute('target', '_blank');
		      return node;
		    }
		  }, {
		    key: 'formats',
		    value: function formats(domNode) {
		      return domNode.getAttribute('href');
		    }
		  }, {
		    key: 'sanitize',
		    value: function sanitize(url) {
		      return _sanitize(url, ['http', 'https', 'mailto']) ? url : this.SANITIZED_URL;
		    }
		  }]);
	
		  return Link;
		}(_inline2.default);
	
		Link.blotName = 'link';
		Link.tagName = 'A';
		Link.SANITIZED_URL = 'about:blank';
	
		function _sanitize(url, protocols) {
		  var anchor = document.createElement('a');
		  anchor.href = url;
		  var protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
		  return protocols.indexOf(protocol) > -1;
		}
	
		exports.default = Link;
		exports.sanitize = _sanitize;
	
	/***/ },
	/* 61 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _inline = __webpack_require__(32);
	
		var _inline2 = _interopRequireDefault(_inline);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Script = function (_Inline) {
		  _inherits(Script, _Inline);
	
		  function Script() {
		    _classCallCheck(this, Script);
	
		    return _possibleConstructorReturn(this, (Script.__proto__ || Object.getPrototypeOf(Script)).apply(this, arguments));
		  }
	
		  _createClass(Script, null, [{
		    key: 'create',
		    value: function create(value) {
		      if (value === 'super') {
		        return document.createElement('sup');
		      } else if (value === 'sub') {
		        return document.createElement('sub');
		      } else {
		        return _get(Script.__proto__ || Object.getPrototypeOf(Script), 'create', this).call(this, value);
		      }
		    }
		  }, {
		    key: 'formats',
		    value: function formats(domNode) {
		      if (domNode.tagName === 'SUB') return 'sub';
		      if (domNode.tagName === 'SUP') return 'super';
		      return undefined;
		    }
		  }]);
	
		  return Script;
		}(_inline2.default);
	
		Script.blotName = 'script';
		Script.tagName = ['SUB', 'SUP'];
	
		exports.default = Script;
	
	/***/ },
	/* 62 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _inline = __webpack_require__(32);
	
		var _inline2 = _interopRequireDefault(_inline);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Strike = function (_Inline) {
		  _inherits(Strike, _Inline);
	
		  function Strike() {
		    _classCallCheck(this, Strike);
	
		    return _possibleConstructorReturn(this, (Strike.__proto__ || Object.getPrototypeOf(Strike)).apply(this, arguments));
		  }
	
		  return Strike;
		}(_inline2.default);
	
		Strike.blotName = 'strike';
		Strike.tagName = 'S';
	
		exports.default = Strike;
	
	/***/ },
	/* 63 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _inline = __webpack_require__(32);
	
		var _inline2 = _interopRequireDefault(_inline);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var Underline = function (_Inline) {
		  _inherits(Underline, _Inline);
	
		  function Underline() {
		    _classCallCheck(this, Underline);
	
		    return _possibleConstructorReturn(this, (Underline.__proto__ || Object.getPrototypeOf(Underline)).apply(this, arguments));
		  }
	
		  return Underline;
		}(_inline2.default);
	
		Underline.blotName = 'underline';
		Underline.tagName = 'U';
	
		exports.default = Underline;
	
	/***/ },
	/* 64 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _embed = __webpack_require__(31);
	
		var _embed2 = _interopRequireDefault(_embed);
	
		var _link = __webpack_require__(60);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var ATTRIBUTES = ['alt', 'height', 'width'];
	
		var Image = function (_Embed) {
		  _inherits(Image, _Embed);
	
		  function Image() {
		    _classCallCheck(this, Image);
	
		    return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
		  }
	
		  _createClass(Image, [{
		    key: 'format',
		    value: function format(name, value) {
		      if (ATTRIBUTES.indexOf(name) > -1) {
		        if (value) {
		          this.domNode.setAttribute(name, value);
		        } else {
		          this.domNode.removeAttribute(name);
		        }
		      } else {
		        _get(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), 'format', this).call(this, name, value);
		      }
		    }
		  }], [{
		    key: 'create',
		    value: function create(value) {
		      var node = _get(Image.__proto__ || Object.getPrototypeOf(Image), 'create', this).call(this, value);
		      if (typeof value === 'string') {
		        node.setAttribute('src', this.sanitize(value));
		      }
		      return node;
		    }
		  }, {
		    key: 'formats',
		    value: function formats(domNode) {
		      return ATTRIBUTES.reduce(function (formats, attribute) {
		        if (domNode.hasAttribute(attribute)) {
		          formats[attribute] = domNode.getAttribute(attribute);
		        }
		        return formats;
		      }, {});
		    }
		  }, {
		    key: 'match',
		    value: function match(url) {
		      return (/\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url)
		      );
		    }
		  }, {
		    key: 'sanitize',
		    value: function sanitize(url) {
		      return (0, _link.sanitize)(url, ['http', 'https', 'data']) ? url : '//:0';
		    }
		  }, {
		    key: 'value',
		    value: function value(domNode) {
		      return domNode.getAttribute('src');
		    }
		  }]);
	
		  return Image;
		}(_embed2.default);
	
		Image.blotName = 'image';
		Image.tagName = 'IMG';
	
		exports.default = Image;
	
	/***/ },
	/* 65 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _block = __webpack_require__(29);
	
		var _link = __webpack_require__(60);
	
		var _link2 = _interopRequireDefault(_link);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var ATTRIBUTES = ['height', 'width'];
	
		var Video = function (_BlockEmbed) {
		  _inherits(Video, _BlockEmbed);
	
		  function Video() {
		    _classCallCheck(this, Video);
	
		    return _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).apply(this, arguments));
		  }
	
		  _createClass(Video, [{
		    key: 'format',
		    value: function format(name, value) {
		      if (ATTRIBUTES.indexOf(name) > -1) {
		        if (value) {
		          this.domNode.setAttribute(name, value);
		        } else {
		          this.domNode.removeAttribute(name);
		        }
		      } else {
		        _get(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'format', this).call(this, name, value);
		      }
		    }
		  }], [{
		    key: 'create',
		    value: function create(value) {
		      var node = _get(Video.__proto__ || Object.getPrototypeOf(Video), 'create', this).call(this, value);
		      node.setAttribute('frameborder', '0');
		      node.setAttribute('allowfullscreen', true);
		      node.setAttribute('src', this.sanitize(value));
		      return node;
		    }
		  }, {
		    key: 'formats',
		    value: function formats(domNode) {
		      return ATTRIBUTES.reduce(function (formats, attribute) {
		        if (domNode.hasAttribute(attribute)) {
		          formats[attribute] = domNode.getAttribute(attribute);
		        }
		        return formats;
		      }, {});
		    }
		  }, {
		    key: 'sanitize',
		    value: function sanitize(url) {
		      return _link2.default.sanitize(url);
		    }
		  }, {
		    key: 'value',
		    value: function value(domNode) {
		      return domNode.getAttribute('src');
		    }
		  }]);
	
		  return Video;
		}(_block.BlockEmbed);
	
		Video.blotName = 'video';
		Video.className = 'ql-video';
		Video.tagName = 'IFRAME';
	
		exports.default = Video;
	
	/***/ },
	/* 66 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = exports.FormulaBlot = undefined;
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _embed = __webpack_require__(31);
	
		var _embed2 = _interopRequireDefault(_embed);
	
		var _quill = __webpack_require__(18);
	
		var _quill2 = _interopRequireDefault(_quill);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var FormulaBlot = function (_Embed) {
		  _inherits(FormulaBlot, _Embed);
	
		  function FormulaBlot() {
		    _classCallCheck(this, FormulaBlot);
	
		    return _possibleConstructorReturn(this, (FormulaBlot.__proto__ || Object.getPrototypeOf(FormulaBlot)).apply(this, arguments));
		  }
	
		  _createClass(FormulaBlot, [{
		    key: 'index',
		    value: function index() {
		      return 1;
		    }
		  }], [{
		    key: 'create',
		    value: function create(value) {
		      var node = _get(FormulaBlot.__proto__ || Object.getPrototypeOf(FormulaBlot), 'create', this).call(this, value);
		      if (typeof value === 'string') {
		        window.katex.render(value, node);
		        node.setAttribute('data-value', value);
		      }
		      node.setAttribute('contenteditable', false);
		      return node;
		    }
		  }, {
		    key: 'value',
		    value: function value(domNode) {
		      return domNode.getAttribute('data-value');
		    }
		  }]);
	
		  return FormulaBlot;
		}(_embed2.default);
	
		FormulaBlot.blotName = 'formula';
		FormulaBlot.className = 'ql-formula';
		FormulaBlot.tagName = 'SPAN';
	
		function Formula() {
		  if (window.katex == null) {
		    throw new Error('Formula module requires KaTeX.');
		  }
		  _quill2.default.register(FormulaBlot, true);
		}
	
		exports.FormulaBlot = FormulaBlot;
		exports.default = Formula;
	
	/***/ },
	/* 67 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = exports.CodeToken = exports.CodeBlock = undefined;
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _quill = __webpack_require__(18);
	
		var _quill2 = _interopRequireDefault(_quill);
	
		var _module = __webpack_require__(39);
	
		var _module2 = _interopRequireDefault(_module);
	
		var _code = __webpack_require__(28);
	
		var _code2 = _interopRequireDefault(_code);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var SyntaxCodeBlock = function (_CodeBlock) {
		  _inherits(SyntaxCodeBlock, _CodeBlock);
	
		  function SyntaxCodeBlock() {
		    _classCallCheck(this, SyntaxCodeBlock);
	
		    return _possibleConstructorReturn(this, (SyntaxCodeBlock.__proto__ || Object.getPrototypeOf(SyntaxCodeBlock)).apply(this, arguments));
		  }
	
		  _createClass(SyntaxCodeBlock, [{
		    key: 'replaceWith',
		    value: function replaceWith(block) {
		      this.domNode.textContent = this.domNode.textContent;
		      this.attach();
		      _get(SyntaxCodeBlock.prototype.__proto__ || Object.getPrototypeOf(SyntaxCodeBlock.prototype), 'replaceWith', this).call(this, block);
		    }
		  }, {
		    key: 'highlight',
		    value: function highlight(_highlight) {
		      if (this.cachedHTML !== this.domNode.innerHTML) {
		        var text = this.domNode.textContent;
		        if (text.trim().length > 0 || this.cachedHTML == null) {
		          this.domNode.innerHTML = _highlight(text);
		          this.attach();
		        }
		        this.cachedHTML = this.domNode.innerHTML;
		      }
		    }
		  }]);
	
		  return SyntaxCodeBlock;
		}(_code2.default);
	
		SyntaxCodeBlock.className = 'ql-syntax';
	
		var CodeToken = new _parchment2.default.Attributor.Class('token', 'hljs', {
		  scope: _parchment2.default.Scope.INLINE
		});
	
		var Syntax = function (_Module) {
		  _inherits(Syntax, _Module);
	
		  function Syntax(quill, options) {
		    _classCallCheck(this, Syntax);
	
		    var _this2 = _possibleConstructorReturn(this, (Syntax.__proto__ || Object.getPrototypeOf(Syntax)).call(this, quill, options));
	
		    if (typeof _this2.options.highlight !== 'function') {
		      throw new Error('Syntax module requires highlight.js. Please include the library on the page before Quill.');
		    }
		    _quill2.default.register(CodeToken, true);
		    _quill2.default.register(SyntaxCodeBlock, true);
		    var timer = null;
		    _this2.quill.on(_quill2.default.events.SCROLL_OPTIMIZE, function () {
		      if (timer != null) return;
		      timer = setTimeout(function () {
		        _this2.highlight();
		        timer = null;
		      }, 100);
		    });
		    _this2.highlight();
		    return _this2;
		  }
	
		  _createClass(Syntax, [{
		    key: 'highlight',
		    value: function highlight() {
		      var _this3 = this;
	
		      if (this.quill.selection.composing) return;
		      var range = this.quill.getSelection();
		      this.quill.scroll.descendants(SyntaxCodeBlock).forEach(function (code) {
		        code.highlight(_this3.options.highlight);
		      });
		      this.quill.update(_quill2.default.sources.SILENT);
		      if (range != null) {
		        this.quill.setSelection(range, _quill2.default.sources.SILENT);
		      }
		    }
		  }]);
	
		  return Syntax;
		}(_module2.default);
	
		Syntax.DEFAULTS = {
		  highlight: function () {
		    if (window.hljs == null) return null;
		    return function (text) {
		      var result = window.hljs.highlightAuto(text);
		      return result.value;
		    };
		  }()
		};
	
		exports.CodeBlock = SyntaxCodeBlock;
		exports.CodeToken = CodeToken;
		exports.default = Syntax;
	
	/***/ },
	/* 68 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.addControls = exports.default = undefined;
	
		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _quillDelta = __webpack_require__(20);
	
		var _quillDelta2 = _interopRequireDefault(_quillDelta);
	
		var _parchment = __webpack_require__(2);
	
		var _parchment2 = _interopRequireDefault(_parchment);
	
		var _quill = __webpack_require__(18);
	
		var _quill2 = _interopRequireDefault(_quill);
	
		var _logger = __webpack_require__(37);
	
		var _logger2 = _interopRequireDefault(_logger);
	
		var _module = __webpack_require__(39);
	
		var _module2 = _interopRequireDefault(_module);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var debug = (0, _logger2.default)('quill:toolbar');
	
		var Toolbar = function (_Module) {
		  _inherits(Toolbar, _Module);
	
		  function Toolbar(quill, options) {
		    _classCallCheck(this, Toolbar);
	
		    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, quill, options));
	
		    if (Array.isArray(_this.options.container)) {
		      var container = document.createElement('div');
		      addControls(container, _this.options.container);
		      quill.container.parentNode.insertBefore(container, quill.container);
		      _this.container = container;
		    } else if (typeof _this.options.container === 'string') {
		      _this.container = document.querySelector(_this.options.container);
		    } else {
		      _this.container = _this.options.container;
		    }
		    if (!(_this.container instanceof HTMLElement)) {
		      var _ret;
	
		      return _ret = debug.error('Container required for toolbar', _this.options), _possibleConstructorReturn(_this, _ret);
		    }
		    _this.container.classList.add('ql-toolbar');
		    _this.controls = [];
		    _this.handlers = {};
		    Object.keys(_this.options.handlers).forEach(function (format) {
		      _this.addHandler(format, _this.options.handlers[format]);
		    });
		    [].forEach.call(_this.container.querySelectorAll('button, select'), function (input) {
		      _this.attach(input);
		    });
		    _this.quill.on(_quill2.default.events.EDITOR_CHANGE, function (type, range) {
		      if (type === _quill2.default.events.SELECTION_CHANGE) {
		        _this.update(range);
		      }
		    });
		    _this.quill.on(_quill2.default.events.SCROLL_OPTIMIZE, function () {
		      var _this$quill$selection = _this.quill.selection.getRange(),
		          _this$quill$selection2 = _slicedToArray(_this$quill$selection, 1),
		          range = _this$quill$selection2[0]; // quill.getSelection triggers update
	
	
		      _this.update(range);
		    });
		    return _this;
		  }
	
		  _createClass(Toolbar, [{
		    key: 'addHandler',
		    value: function addHandler(format, handler) {
		      this.handlers[format] = handler;
		    }
		  }, {
		    key: 'attach',
		    value: function attach(input) {
		      var _this2 = this;
	
		      var format = [].find.call(input.classList, function (className) {
		        return className.indexOf('ql-') === 0;
		      });
		      if (!format) return;
		      format = format.slice('ql-'.length);
		      if (input.tagName === 'BUTTON') {
		        input.setAttribute('type', 'button');
		      }
		      if (this.handlers[format] == null) {
		        if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[format] == null) {
		          debug.warn('ignoring attaching to disabled format', format, input);
		          return;
		        }
		        if (_parchment2.default.query(format) == null) {
		          debug.warn('ignoring attaching to nonexistent format', format, input);
		          return;
		        }
		      }
		      var eventName = input.tagName === 'SELECT' ? 'change' : 'click';
		      input.addEventListener(eventName, function (e) {
		        var value = void 0;
		        if (input.tagName === 'SELECT') {
		          if (input.selectedIndex < 0) return;
		          var selected = input.options[input.selectedIndex];
		          if (selected.hasAttribute('selected')) {
		            value = false;
		          } else {
		            value = selected.value || false;
		          }
		        } else {
		          if (input.classList.contains('ql-active')) {
		            value = false;
		          } else {
		            value = input.value || !input.hasAttribute('value');
		          }
		          e.preventDefault();
		        }
		        _this2.quill.focus();
	
		        var _quill$selection$getR = _this2.quill.selection.getRange(),
		            _quill$selection$getR2 = _slicedToArray(_quill$selection$getR, 1),
		            range = _quill$selection$getR2[0];
	
		        if (_this2.handlers[format] != null) {
		          _this2.handlers[format].call(_this2, value);
		        } else if (_parchment2.default.query(format).prototype instanceof _parchment2.default.Embed) {
		          value = prompt('Enter ' + format);
		          if (!value) return;
		          _this2.quill.updateContents(new _quillDelta2.default().retain(range.index).delete(range.length).insert(_defineProperty({}, format, value)), _quill2.default.sources.USER);
		        } else {
		          _this2.quill.format(format, value, _quill2.default.sources.USER);
		        }
		        _this2.update(range);
		      });
		      // TODO use weakmap
		      this.controls.push([format, input]);
		    }
		  }, {
		    key: 'update',
		    value: function update(range) {
		      var formats = range == null ? {} : this.quill.getFormat(range);
		      this.controls.forEach(function (pair) {
		        var _pair = _slicedToArray(pair, 2),
		            format = _pair[0],
		            input = _pair[1];
	
		        if (input.tagName === 'SELECT') {
		          var option = void 0;
		          if (range == null) {
		            option = null;
		          } else if (formats[format] == null) {
		            option = input.querySelector('option[selected]');
		          } else if (!Array.isArray(formats[format])) {
		            var value = formats[format];
		            if (typeof value === 'string') {
		              value = value.replace(/\"/g, '\\"');
		            }
		            option = input.querySelector('option[value="' + value + '"]');
		          }
		          if (option == null) {
		            input.value = ''; // TODO make configurable?
		            input.selectedIndex = -1;
		          } else {
		            option.selected = true;
		          }
		        } else {
		          if (range == null) {
		            input.classList.remove('ql-active');
		          } else if (input.hasAttribute('value')) {
		            // both being null should match (default values)
		            // '1' should match with 1 (headers)
		            var isActive = formats[format] === input.getAttribute('value') || formats[format] != null && formats[format].toString() === input.getAttribute('value') || formats[format] == null && !input.getAttribute('value');
		            input.classList.toggle('ql-active', isActive);
		          } else {
		            input.classList.toggle('ql-active', formats[format] != null);
		          }
		        }
		      });
		    }
		  }]);
	
		  return Toolbar;
		}(_module2.default);
	
		Toolbar.DEFAULTS = {};
	
		function addButton(container, format, value) {
		  var input = document.createElement('button');
		  input.setAttribute('type', 'button');
		  input.classList.add('ql-' + format);
		  if (value != null) {
		    input.value = value;
		  }
		  container.appendChild(input);
		}
	
		function addControls(container, groups) {
		  if (!Array.isArray(groups[0])) {
		    groups = [groups];
		  }
		  groups.forEach(function (controls) {
		    var group = document.createElement('span');
		    group.classList.add('ql-formats');
		    controls.forEach(function (control) {
		      if (typeof control === 'string') {
		        addButton(group, control);
		      } else {
		        var format = Object.keys(control)[0];
		        var value = control[format];
		        if (Array.isArray(value)) {
		          addSelect(group, format, value);
		        } else {
		          addButton(group, format, value);
		        }
		      }
		    });
		    container.appendChild(group);
		  });
		}
	
		function addSelect(container, format, values) {
		  var input = document.createElement('select');
		  input.classList.add('ql-' + format);
		  values.forEach(function (value) {
		    var option = document.createElement('option');
		    if (value !== false) {
		      option.setAttribute('value', value);
		    } else {
		      option.setAttribute('selected', 'selected');
		    }
		    input.appendChild(option);
		  });
		  container.appendChild(input);
		}
	
		Toolbar.DEFAULTS = {
		  container: null,
		  handlers: {
		    clean: function clean() {
		      var _this3 = this;
	
		      var range = this.quill.getSelection();
		      if (range == null) return;
		      if (range.length == 0) {
		        var formats = this.quill.getFormat();
		        Object.keys(formats).forEach(function (name) {
		          // Clean functionality in existing apps only clean inline formats
		          if (_parchment2.default.query(name, _parchment2.default.Scope.INLINE) != null) {
		            _this3.quill.format(name, false);
		          }
		        });
		      } else {
		        this.quill.removeFormat(range, _quill2.default.sources.USER);
		      }
		    },
		    direction: function direction(value) {
		      var align = this.quill.getFormat()['align'];
		      if (value === 'rtl' && align == null) {
		        this.quill.format('align', 'right', _quill2.default.sources.USER);
		      } else if (!value && align === 'right') {
		        this.quill.format('align', false, _quill2.default.sources.USER);
		      }
		      this.quill.format('direction', value, _quill2.default.sources.USER);
		    },
		    indent: function indent(value) {
		      var range = this.quill.getSelection();
		      var formats = this.quill.getFormat(range);
		      var indent = parseInt(formats.indent || 0);
		      if (value === '+1' || value === '-1') {
		        var modifier = value === '+1' ? 1 : -1;
		        if (formats.direction === 'rtl') modifier *= -1;
		        this.quill.format('indent', indent + modifier, _quill2.default.sources.USER);
		      }
		    },
		    link: function link(value) {
		      if (value === true) {
		        value = prompt('Enter link URL:');
		      }
		      this.quill.format('link', value, _quill2.default.sources.USER);
		    },
		    list: function list(value) {
		      var range = this.quill.getSelection();
		      var formats = this.quill.getFormat(range);
		      if (value === 'check') {
		        if (formats['list'] === 'checked' || formats['list'] === 'unchecked') {
		          this.quill.format('list', false, _quill2.default.sources.USER);
		        } else {
		          this.quill.format('list', 'unchecked', _quill2.default.sources.USER);
		        }
		      } else {
		        this.quill.format('list', value, _quill2.default.sources.USER);
		      }
		    }
		  }
		};
	
		exports.default = Toolbar;
		exports.addControls = addControls;
	
	/***/ },
	/* 69 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		module.exports = {
		  'align': {
		    '': __webpack_require__(70),
		    'center': __webpack_require__(71),
		    'right': __webpack_require__(72),
		    'justify': __webpack_require__(73)
		  },
		  'background': __webpack_require__(74),
		  'blockquote': __webpack_require__(75),
		  'bold': __webpack_require__(76),
		  'clean': __webpack_require__(77),
		  'code': __webpack_require__(78),
		  'code-block': __webpack_require__(78),
		  'color': __webpack_require__(79),
		  'direction': {
		    '': __webpack_require__(80),
		    'rtl': __webpack_require__(81)
		  },
		  'float': {
		    'center': __webpack_require__(82),
		    'full': __webpack_require__(83),
		    'left': __webpack_require__(84),
		    'right': __webpack_require__(85)
		  },
		  'formula': __webpack_require__(86),
		  'header': {
		    '1': __webpack_require__(87),
		    '2': __webpack_require__(88)
		  },
		  'italic': __webpack_require__(89),
		  'image': __webpack_require__(90),
		  'indent': {
		    '+1': __webpack_require__(91),
		    '-1': __webpack_require__(92)
		  },
		  'link': __webpack_require__(93),
		  'list': {
		    'ordered': __webpack_require__(94),
		    'bullet': __webpack_require__(95),
		    'check': __webpack_require__(96)
		  },
		  'script': {
		    'sub': __webpack_require__(97),
		    'super': __webpack_require__(98)
		  },
		  'strike': __webpack_require__(99),
		  'underline': __webpack_require__(100),
		  'video': __webpack_require__(101)
		};
	
	/***/ },
	/* 70 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>";
	
	/***/ },
	/* 71 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>";
	
	/***/ },
	/* 72 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>";
	
	/***/ },
	/* 73 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>";
	
	/***/ },
	/* 74 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <g class=\"ql-fill ql-color-label\"> <polygon points=\"6 6.868 6 6 5 6 5 7 5.942 7 6 6.868\"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points=\"6.817 5 6 5 6 6 6.38 6 6.817 5\"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points=\"4 11.439 4 11 3 11 3 12 3.755 12 4 11.439\"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points=\"4.63 10 4 10 4 11 4.192 11 4.63 10\"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points=\"13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174\"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points=\"12 6.868 12 6 11.62 6 12 6.868\"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points=\"12.933 9 13 9 13 8 12.495 8 12.933 9\"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points=\"5.5 13 9 5 12.5 13\"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>";
	
	/***/ },
	/* 75 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=\"ql-fill ql-stroke\" height=3 width=3 x=4 y=5></rect> <rect class=\"ql-fill ql-stroke\" height=3 width=3 x=11 y=5></rect> <path class=\"ql-even ql-fill ql-stroke\" d=M7,8c0,4.031-3,5-3,5></path> <path class=\"ql-even ql-fill ql-stroke\" d=M14,8c0,4.031-3,5-3,5></path> </svg>";
	
	/***/ },
	/* 76 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>";
	
	/***/ },
	/* 77 */
	/***/ function(module, exports) {
	
		module.exports = "<svg class=\"\" viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>";
	
	/***/ },
	/* 78 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <polyline class=\"ql-even ql-stroke\" points=\"5 7 3 9 5 11\"></polyline> <polyline class=\"ql-even ql-stroke\" points=\"13 7 15 9 13 11\"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>";
	
	/***/ },
	/* 79 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=\"ql-color-label ql-stroke ql-transparent\" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points=\"5.5 11 9 3 12.5 11\"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>";
	
	/***/ },
	/* 80 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=\"ql-stroke ql-fill\" points=\"3 11 5 9 3 7 3 11\"></polygon> <line class=\"ql-stroke ql-fill\" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>";
	
	/***/ },
	/* 81 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=\"ql-stroke ql-fill\" points=\"15 12 13 10 15 8 15 12\"></polygon> <line class=\"ql-stroke ql-fill\" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>";
	
	/***/ },
	/* 82 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>";
	
	/***/ },
	/* 83 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>";
	
	/***/ },
	/* 84 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>";
	
	/***/ },
	/* 85 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform=\"translate(24 18) rotate(-180)\"/> </svg>";
	
	/***/ },
	/* 86 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>";
	
	/***/ },
	/* 87 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=3 y1=4 y2=14></line> <line class=ql-stroke x1=11 x2=11 y1=4 y2=14></line> <line class=ql-stroke x1=11 x2=3 y1=9 y2=9></line> <line class=\"ql-stroke ql-thin\" x1=13.5 x2=15.5 y1=14.5 y2=14.5></line> <path class=ql-fill d=M14.5,15a0.5,0.5,0,0,1-.5-0.5V12.085l-0.276.138A0.5,0.5,0,0,1,13.053,12c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,15,11.5v3A0.5,0.5,0,0,1,14.5,15Z></path> </svg>";
	
	/***/ },
	/* 88 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=3 y1=4 y2=14></line> <line class=ql-stroke x1=11 x2=11 y1=4 y2=14></line> <line class=ql-stroke x1=11 x2=3 y1=9 y2=9></line> <path class=\"ql-stroke ql-thin\" d=M15.5,14.5h-2c0-.234,1.85-1.076,1.85-2.234a0.959,0.959,0,0,0-1.85-.109></path> </svg>";
	
	/***/ },
	/* 89 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>";
	
	/***/ },
	/* 90 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class=\"ql-even ql-fill\" points=\"5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12\"></polyline> </svg>";
	
	/***/ },
	/* 91 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=\"ql-fill ql-stroke\" points=\"3 7 3 11 5 9 3 7\"></polyline> </svg>";
	
	/***/ },
	/* 92 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points=\"5 7 5 11 3 9 5 7\"></polyline> </svg>";
	
	/***/ },
	/* 93 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class=\"ql-even ql-stroke\" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class=\"ql-even ql-stroke\" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>";
	
	/***/ },
	/* 94 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class=\"ql-stroke ql-thin\" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class=\"ql-stroke ql-thin\" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class=\"ql-stroke ql-thin\" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>";
	
	/***/ },
	/* 95 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>";
	
	/***/ },
	/* 96 */
	/***/ function(module, exports) {
	
		module.exports = "<svg class=\"\" viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points=\"3 4 4 5 6 3\"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points=\"3 14 4 15 6 13\"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points=\"3 9 4 10 6 8\"></polyline> </svg>";
	
	/***/ },
	/* 97 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>";
	
	/***/ },
	/* 98 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>";
	
	/***/ },
	/* 99 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=\"ql-stroke ql-thin\" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>";
	
	/***/ },
	/* 100 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>";
	
	/***/ },
	/* 101 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>";
	
	/***/ },
	/* 102 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _dropdown = __webpack_require__(103);
	
		var _dropdown2 = _interopRequireDefault(_dropdown);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		var Picker = function () {
		  function Picker(select) {
		    var _this = this;
	
		    _classCallCheck(this, Picker);
	
		    this.select = select;
		    this.container = document.createElement('span');
		    this.buildPicker();
		    this.select.style.display = 'none';
		    this.select.parentNode.insertBefore(this.container, this.select);
		    this.label.addEventListener('mousedown', function () {
		      _this.container.classList.toggle('ql-expanded');
		    });
		    this.select.addEventListener('change', this.update.bind(this));
		  }
	
		  _createClass(Picker, [{
		    key: 'buildItem',
		    value: function buildItem(option) {
		      var _this2 = this;
	
		      var item = document.createElement('span');
		      item.classList.add('ql-picker-item');
		      if (option.hasAttribute('value')) {
		        item.setAttribute('data-value', option.getAttribute('value'));
		      }
		      if (option.textContent) {
		        item.setAttribute('data-label', option.textContent);
		      }
		      item.addEventListener('click', function () {
		        _this2.selectItem(item, true);
		      });
		      return item;
		    }
		  }, {
		    key: 'buildLabel',
		    value: function buildLabel() {
		      var label = document.createElement('span');
		      label.classList.add('ql-picker-label');
		      label.innerHTML = _dropdown2.default;
		      this.container.appendChild(label);
		      return label;
		    }
		  }, {
		    key: 'buildOptions',
		    value: function buildOptions() {
		      var _this3 = this;
	
		      var options = document.createElement('span');
		      options.classList.add('ql-picker-options');
		      [].slice.call(this.select.options).forEach(function (option) {
		        var item = _this3.buildItem(option);
		        options.appendChild(item);
		        if (option.hasAttribute('selected')) {
		          _this3.selectItem(item);
		        }
		      });
		      this.container.appendChild(options);
		    }
		  }, {
		    key: 'buildPicker',
		    value: function buildPicker() {
		      var _this4 = this;
	
		      [].slice.call(this.select.attributes).forEach(function (item) {
		        _this4.container.setAttribute(item.name, item.value);
		      });
		      this.container.classList.add('ql-picker');
		      this.label = this.buildLabel();
		      this.buildOptions();
		    }
		  }, {
		    key: 'close',
		    value: function close() {
		      this.container.classList.remove('ql-expanded');
		    }
		  }, {
		    key: 'selectItem',
		    value: function selectItem(item) {
		      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
		      var selected = this.container.querySelector('.ql-selected');
		      if (item === selected) return;
		      if (selected != null) {
		        selected.classList.remove('ql-selected');
		      }
		      if (item == null) return;
		      item.classList.add('ql-selected');
		      this.select.selectedIndex = [].indexOf.call(item.parentNode.children, item);
		      if (item.hasAttribute('data-value')) {
		        this.label.setAttribute('data-value', item.getAttribute('data-value'));
		      } else {
		        this.label.removeAttribute('data-value');
		      }
		      if (item.hasAttribute('data-label')) {
		        this.label.setAttribute('data-label', item.getAttribute('data-label'));
		      } else {
		        this.label.removeAttribute('data-label');
		      }
		      if (trigger) {
		        if (typeof Event === 'function') {
		          this.select.dispatchEvent(new Event('change'));
		        } else if ((typeof Event === 'undefined' ? 'undefined' : _typeof(Event)) === 'object') {
		          // IE11
		          var event = document.createEvent('Event');
		          event.initEvent('change', true, true);
		          this.select.dispatchEvent(event);
		        }
		        this.close();
		      }
		    }
		  }, {
		    key: 'update',
		    value: function update() {
		      var option = void 0;
		      if (this.select.selectedIndex > -1) {
		        var item = this.container.querySelector('.ql-picker-options').children[this.select.selectedIndex];
		        option = this.select.options[this.select.selectedIndex];
		        this.selectItem(item);
		      } else {
		        this.selectItem(null);
		      }
		      var isActive = option != null && option !== this.select.querySelector('option[selected]');
		      this.label.classList.toggle('ql-active', isActive);
		    }
		  }]);
	
		  return Picker;
		}();
	
		exports.default = Picker;
	
	/***/ },
	/* 103 */
	/***/ function(module, exports) {
	
		module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=ql-stroke points=\"7 11 9 13 11 11 7 11\"></polygon> <polygon class=ql-stroke points=\"7 7 9 5 11 7 7 7\"></polygon> </svg>";
	
	/***/ },
	/* 104 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _picker = __webpack_require__(102);
	
		var _picker2 = _interopRequireDefault(_picker);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var ColorPicker = function (_Picker) {
		  _inherits(ColorPicker, _Picker);
	
		  function ColorPicker(select, label) {
		    _classCallCheck(this, ColorPicker);
	
		    var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, select));
	
		    _this.label.innerHTML = label;
		    _this.container.classList.add('ql-color-picker');
		    [].slice.call(_this.container.querySelectorAll('.ql-picker-item'), 0, 7).forEach(function (item) {
		      item.classList.add('ql-primary');
		    });
		    return _this;
		  }
	
		  _createClass(ColorPicker, [{
		    key: 'buildItem',
		    value: function buildItem(option) {
		      var item = _get(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), 'buildItem', this).call(this, option);
		      item.style.backgroundColor = option.getAttribute('value') || '';
		      return item;
		    }
		  }, {
		    key: 'selectItem',
		    value: function selectItem(item, trigger) {
		      _get(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), 'selectItem', this).call(this, item, trigger);
		      var colorLabel = this.label.querySelector('.ql-color-label');
		      var value = item ? item.getAttribute('data-value') || '' : '';
		      if (colorLabel) {
		        if (colorLabel.tagName === 'line') {
		          colorLabel.style.stroke = value;
		        } else {
		          colorLabel.style.fill = value;
		        }
		      }
		    }
		  }]);
	
		  return ColorPicker;
		}(_picker2.default);
	
		exports.default = ColorPicker;
	
	/***/ },
	/* 105 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _picker = __webpack_require__(102);
	
		var _picker2 = _interopRequireDefault(_picker);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var IconPicker = function (_Picker) {
		  _inherits(IconPicker, _Picker);
	
		  function IconPicker(select, icons) {
		    _classCallCheck(this, IconPicker);
	
		    var _this = _possibleConstructorReturn(this, (IconPicker.__proto__ || Object.getPrototypeOf(IconPicker)).call(this, select));
	
		    _this.container.classList.add('ql-icon-picker');
		    [].forEach.call(_this.container.querySelectorAll('.ql-picker-item'), function (item) {
		      item.innerHTML = icons[item.getAttribute('data-value') || ''];
		    });
		    _this.defaultItem = _this.container.querySelector('.ql-selected');
		    _this.selectItem(_this.defaultItem);
		    return _this;
		  }
	
		  _createClass(IconPicker, [{
		    key: 'selectItem',
		    value: function selectItem(item, trigger) {
		      _get(IconPicker.prototype.__proto__ || Object.getPrototypeOf(IconPicker.prototype), 'selectItem', this).call(this, item, trigger);
		      item = item || this.defaultItem;
		      this.label.innerHTML = item.innerHTML;
		    }
		  }]);
	
		  return IconPicker;
		}(_picker2.default);
	
		exports.default = IconPicker;
	
	/***/ },
	/* 106 */
	/***/ function(module, exports) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		var Tooltip = function () {
		  function Tooltip(quill, boundsContainer) {
		    var _this = this;
	
		    _classCallCheck(this, Tooltip);
	
		    this.quill = quill;
		    this.boundsContainer = boundsContainer || document.body;
		    this.root = quill.addContainer('ql-tooltip');
		    this.root.innerHTML = this.constructor.TEMPLATE;
		    this.quill.root.addEventListener('scroll', function () {
		      _this.root.style.marginTop = -1 * _this.quill.root.scrollTop + 'px';
		    });
		    this.hide();
		  }
	
		  _createClass(Tooltip, [{
		    key: 'hide',
		    value: function hide() {
		      this.root.classList.add('ql-hidden');
		    }
		  }, {
		    key: 'position',
		    value: function position(reference) {
		      var left = reference.left + reference.width / 2 - this.root.offsetWidth / 2;
		      var top = reference.bottom + this.quill.root.scrollTop;
		      this.root.style.left = left + 'px';
		      this.root.style.top = top + 'px';
		      this.root.classList.remove('ql-flip');
		      var containerBounds = this.boundsContainer.getBoundingClientRect();
		      var rootBounds = this.root.getBoundingClientRect();
		      var shift = 0;
		      if (rootBounds.right > containerBounds.right) {
		        shift = containerBounds.right - rootBounds.right;
		        this.root.style.left = left + shift + 'px';
		      }
		      if (rootBounds.left < containerBounds.left) {
		        shift = containerBounds.left - rootBounds.left;
		        this.root.style.left = left + shift + 'px';
		      }
		      if (rootBounds.bottom > containerBounds.bottom) {
		        var height = rootBounds.bottom - rootBounds.top;
		        var verticalShift = containerBounds.bottom - rootBounds.bottom - height;
		        this.root.style.top = top + verticalShift + 'px';
		        this.root.classList.add('ql-flip');
		      }
		      return shift;
		    }
		  }, {
		    key: 'show',
		    value: function show() {
		      this.root.classList.remove('ql-editing');
		      this.root.classList.remove('ql-hidden');
		    }
		  }]);
	
		  return Tooltip;
		}();
	
		exports.default = Tooltip;
	
	/***/ },
	/* 107 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = exports.BubbleTooltip = undefined;
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _extend = __webpack_require__(25);
	
		var _extend2 = _interopRequireDefault(_extend);
	
		var _emitter = __webpack_require__(35);
	
		var _emitter2 = _interopRequireDefault(_emitter);
	
		var _base = __webpack_require__(108);
	
		var _base2 = _interopRequireDefault(_base);
	
		var _selection = __webpack_require__(40);
	
		var _icons = __webpack_require__(69);
	
		var _icons2 = _interopRequireDefault(_icons);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var TOOLBAR_CONFIG = [['bold', 'italic', 'link'], [{ header: 1 }, { header: 2 }, 'blockquote']];
	
		var BubbleTheme = function (_BaseTheme) {
		  _inherits(BubbleTheme, _BaseTheme);
	
		  function BubbleTheme(quill, options) {
		    _classCallCheck(this, BubbleTheme);
	
		    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
		      options.modules.toolbar.container = TOOLBAR_CONFIG;
		    }
	
		    var _this = _possibleConstructorReturn(this, (BubbleTheme.__proto__ || Object.getPrototypeOf(BubbleTheme)).call(this, quill, options));
	
		    _this.quill.container.classList.add('ql-bubble');
		    return _this;
		  }
	
		  _createClass(BubbleTheme, [{
		    key: 'extendToolbar',
		    value: function extendToolbar(toolbar) {
		      this.tooltip = new BubbleTooltip(this.quill, this.options.bounds);
		      this.tooltip.root.appendChild(toolbar.container);
		      this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), _icons2.default);
		      this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), _icons2.default);
		    }
		  }]);
	
		  return BubbleTheme;
		}(_base2.default);
	
		BubbleTheme.DEFAULTS = (0, _extend2.default)(true, {}, _base2.default.DEFAULTS, {
		  modules: {
		    toolbar: {
		      handlers: {
		        link: function link(value) {
		          if (!value) {
		            this.quill.format('link', false);
		          } else {
		            this.quill.theme.tooltip.edit();
		          }
		        }
		      }
		    }
		  }
		});
	
		var BubbleTooltip = function (_BaseTooltip) {
		  _inherits(BubbleTooltip, _BaseTooltip);
	
		  function BubbleTooltip(quill, bounds) {
		    _classCallCheck(this, BubbleTooltip);
	
		    var _this2 = _possibleConstructorReturn(this, (BubbleTooltip.__proto__ || Object.getPrototypeOf(BubbleTooltip)).call(this, quill, bounds));
	
		    _this2.quill.on(_emitter2.default.events.EDITOR_CHANGE, function (type, range, oldRange, source) {
		      if (type !== _emitter2.default.events.SELECTION_CHANGE) return;
		      if (range != null && range.length > 0 && source === _emitter2.default.sources.USER) {
		        _this2.show();
		        // Lock our width so we will expand beyond our offsetParent boundaries
		        _this2.root.style.left = '0px';
		        _this2.root.style.width = '';
		        _this2.root.style.width = _this2.root.offsetWidth + 'px';
		        var lines = _this2.quill.getLines(range.index, range.length);
		        if (lines.length === 1) {
		          _this2.position(_this2.quill.getBounds(range));
		        } else {
		          var lastLine = lines[lines.length - 1];
		          var index = _this2.quill.getIndex(lastLine);
		          var length = Math.min(lastLine.length() - 1, range.index + range.length - index);
		          var _bounds = _this2.quill.getBounds(new _selection.Range(index, length));
		          _this2.position(_bounds);
		        }
		      } else if (document.activeElement !== _this2.textbox && _this2.quill.hasFocus()) {
		        _this2.hide();
		      }
		    });
		    return _this2;
		  }
	
		  _createClass(BubbleTooltip, [{
		    key: 'listen',
		    value: function listen() {
		      var _this3 = this;
	
		      _get(BubbleTooltip.prototype.__proto__ || Object.getPrototypeOf(BubbleTooltip.prototype), 'listen', this).call(this);
		      this.root.querySelector('.ql-close').addEventListener('click', function () {
		        _this3.root.classList.remove('ql-editing');
		      });
		      this.quill.on(_emitter2.default.events.SCROLL_OPTIMIZE, function () {
		        // Let selection be restored by toolbar handlers before repositioning
		        setTimeout(function () {
		          if (_this3.root.classList.contains('ql-hidden')) return;
		          var range = _this3.quill.getSelection();
		          if (range != null) {
		            _this3.position(_this3.quill.getBounds(range));
		          }
		        }, 1);
		      });
		    }
		  }, {
		    key: 'cancel',
		    value: function cancel() {
		      this.show();
		    }
		  }, {
		    key: 'position',
		    value: function position(reference) {
		      var shift = _get(BubbleTooltip.prototype.__proto__ || Object.getPrototypeOf(BubbleTooltip.prototype), 'position', this).call(this, reference);
		      var arrow = this.root.querySelector('.ql-tooltip-arrow');
		      arrow.style.marginLeft = '';
		      if (shift === 0) return shift;
		      arrow.style.marginLeft = -1 * shift - arrow.offsetWidth / 2 + 'px';
		    }
		  }]);
	
		  return BubbleTooltip;
		}(_base.BaseTooltip);
	
		BubbleTooltip.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', '</div>'].join('');
	
		exports.BubbleTooltip = BubbleTooltip;
		exports.default = BubbleTheme;
	
	/***/ },
	/* 108 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = exports.BaseTooltip = undefined;
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _extend = __webpack_require__(25);
	
		var _extend2 = _interopRequireDefault(_extend);
	
		var _quillDelta = __webpack_require__(20);
	
		var _quillDelta2 = _interopRequireDefault(_quillDelta);
	
		var _emitter = __webpack_require__(35);
	
		var _emitter2 = _interopRequireDefault(_emitter);
	
		var _keyboard = __webpack_require__(52);
	
		var _keyboard2 = _interopRequireDefault(_keyboard);
	
		var _theme = __webpack_require__(41);
	
		var _theme2 = _interopRequireDefault(_theme);
	
		var _colorPicker = __webpack_require__(104);
	
		var _colorPicker2 = _interopRequireDefault(_colorPicker);
	
		var _iconPicker = __webpack_require__(105);
	
		var _iconPicker2 = _interopRequireDefault(_iconPicker);
	
		var _picker = __webpack_require__(102);
	
		var _picker2 = _interopRequireDefault(_picker);
	
		var _tooltip = __webpack_require__(106);
	
		var _tooltip2 = _interopRequireDefault(_tooltip);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var ALIGNS = [false, 'center', 'right', 'justify'];
	
		var COLORS = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];
	
		var FONTS = [false, 'serif', 'monospace'];
	
		var HEADERS = ['1', '2', '3', false];
	
		var SIZES = ['small', false, 'large', 'huge'];
	
		var BaseTheme = function (_Theme) {
		  _inherits(BaseTheme, _Theme);
	
		  function BaseTheme(quill, options) {
		    _classCallCheck(this, BaseTheme);
	
		    var _this = _possibleConstructorReturn(this, (BaseTheme.__proto__ || Object.getPrototypeOf(BaseTheme)).call(this, quill, options));
	
		    var listener = function listener(e) {
		      if (!document.body.contains(quill.root)) {
		        return document.body.removeEventListener('click', listener);
		      }
		      if (_this.tooltip != null && !_this.tooltip.root.contains(e.target) && document.activeElement !== _this.tooltip.textbox && !_this.quill.hasFocus()) {
		        _this.tooltip.hide();
		      }
		      if (_this.pickers != null) {
		        _this.pickers.forEach(function (picker) {
		          if (!picker.container.contains(e.target)) {
		            picker.close();
		          }
		        });
		      }
		    };
		    document.body.addEventListener('click', listener);
		    return _this;
		  }
	
		  _createClass(BaseTheme, [{
		    key: 'addModule',
		    value: function addModule(name) {
		      var module = _get(BaseTheme.prototype.__proto__ || Object.getPrototypeOf(BaseTheme.prototype), 'addModule', this).call(this, name);
		      if (name === 'toolbar') {
		        this.extendToolbar(module);
		      }
		      return module;
		    }
		  }, {
		    key: 'buildButtons',
		    value: function buildButtons(buttons, icons) {
		      buttons.forEach(function (button) {
		        var className = button.getAttribute('class') || '';
		        className.split(/\s+/).forEach(function (name) {
		          if (!name.startsWith('ql-')) return;
		          name = name.slice('ql-'.length);
		          if (icons[name] == null) return;
		          if (name === 'direction') {
		            button.innerHTML = icons[name][''] + icons[name]['rtl'];
		          } else if (typeof icons[name] === 'string') {
		            button.innerHTML = icons[name];
		          } else {
		            var value = button.value || '';
		            if (value != null && icons[name][value]) {
		              button.innerHTML = icons[name][value];
		            }
		          }
		        });
		      });
		    }
		  }, {
		    key: 'buildPickers',
		    value: function buildPickers(selects, icons) {
		      var _this2 = this;
	
		      this.pickers = selects.map(function (select) {
		        if (select.classList.contains('ql-align')) {
		          if (select.querySelector('option') == null) {
		            fillSelect(select, ALIGNS);
		          }
		          return new _iconPicker2.default(select, icons.align);
		        } else if (select.classList.contains('ql-background') || select.classList.contains('ql-color')) {
		          var format = select.classList.contains('ql-background') ? 'background' : 'color';
		          if (select.querySelector('option') == null) {
		            fillSelect(select, COLORS, format === 'background' ? '#ffffff' : '#000000');
		          }
		          return new _colorPicker2.default(select, icons[format]);
		        } else {
		          if (select.querySelector('option') == null) {
		            if (select.classList.contains('ql-font')) {
		              fillSelect(select, FONTS);
		            } else if (select.classList.contains('ql-header')) {
		              fillSelect(select, HEADERS);
		            } else if (select.classList.contains('ql-size')) {
		              fillSelect(select, SIZES);
		            }
		          }
		          return new _picker2.default(select);
		        }
		      });
		      var update = function update() {
		        _this2.pickers.forEach(function (picker) {
		          picker.update();
		        });
		      };
		      this.quill.on(_emitter2.default.events.SELECTION_CHANGE, update).on(_emitter2.default.events.SCROLL_OPTIMIZE, update);
		    }
		  }]);
	
		  return BaseTheme;
		}(_theme2.default);
	
		BaseTheme.DEFAULTS = (0, _extend2.default)(true, {}, _theme2.default.DEFAULTS, {
		  modules: {
		    toolbar: {
		      handlers: {
		        formula: function formula() {
		          this.quill.theme.tooltip.edit('formula');
		        },
		        image: function image() {
		          var _this3 = this;
	
		          var fileInput = this.container.querySelector('input.ql-image[type=file]');
		          if (fileInput == null) {
		            fileInput = document.createElement('input');
		            fileInput.setAttribute('type', 'file');
		            fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon, image/svg+xml');
		            fileInput.classList.add('ql-image');
		            fileInput.addEventListener('change', function () {
		              if (fileInput.files != null && fileInput.files[0] != null) {
		                var reader = new FileReader();
		                reader.onload = function (e) {
		                  var range = _this3.quill.getSelection(true);
		                  _this3.quill.updateContents(new _quillDelta2.default().retain(range.index).delete(range.length).insert({ image: e.target.result }), _emitter2.default.sources.USER);
		                  fileInput.value = "";
		                };
		                reader.readAsDataURL(fileInput.files[0]);
		              }
		            });
		            this.container.appendChild(fileInput);
		          }
		          fileInput.click();
		        },
		        video: function video() {
		          this.quill.theme.tooltip.edit('video');
		        }
		      }
		    }
		  }
		});
	
		var BaseTooltip = function (_Tooltip) {
		  _inherits(BaseTooltip, _Tooltip);
	
		  function BaseTooltip(quill, boundsContainer) {
		    _classCallCheck(this, BaseTooltip);
	
		    var _this4 = _possibleConstructorReturn(this, (BaseTooltip.__proto__ || Object.getPrototypeOf(BaseTooltip)).call(this, quill, boundsContainer));
	
		    _this4.textbox = _this4.root.querySelector('input[type="text"]');
		    _this4.listen();
		    return _this4;
		  }
	
		  _createClass(BaseTooltip, [{
		    key: 'listen',
		    value: function listen() {
		      var _this5 = this;
	
		      this.textbox.addEventListener('keydown', function (event) {
		        if (_keyboard2.default.match(event, 'enter')) {
		          _this5.save();
		          event.preventDefault();
		        } else if (_keyboard2.default.match(event, 'escape')) {
		          _this5.cancel();
		          event.preventDefault();
		        }
		      });
		    }
		  }, {
		    key: 'cancel',
		    value: function cancel() {
		      this.hide();
		    }
		  }, {
		    key: 'edit',
		    value: function edit() {
		      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'link';
		      var preview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
		      this.root.classList.remove('ql-hidden');
		      this.root.classList.add('ql-editing');
		      if (preview != null) {
		        this.textbox.value = preview;
		      } else if (mode !== this.root.getAttribute('data-mode')) {
		        this.textbox.value = '';
		      }
		      this.position(this.quill.getBounds(this.quill.selection.savedRange));
		      this.textbox.select();
		      this.textbox.setAttribute('placeholder', this.textbox.getAttribute('data-' + mode) || '');
		      this.root.setAttribute('data-mode', mode);
		    }
		  }, {
		    key: 'restoreFocus',
		    value: function restoreFocus() {
		      var scrollTop = this.quill.root.scrollTop;
		      this.quill.focus();
		      this.quill.root.scrollTop = scrollTop;
		    }
		  }, {
		    key: 'save',
		    value: function save() {
		      var value = this.textbox.value;
		      switch (this.root.getAttribute('data-mode')) {
		        case 'link':
		          {
		            var scrollTop = this.quill.root.scrollTop;
		            if (this.linkRange) {
		              this.quill.formatText(this.linkRange, 'link', value, _emitter2.default.sources.USER);
		              delete this.linkRange;
		            } else {
		              this.restoreFocus();
		              this.quill.format('link', value, _emitter2.default.sources.USER);
		            }
		            this.quill.root.scrollTop = scrollTop;
		            break;
		          }
		        case 'video':
		          {
		            var match = value.match(/^(https?):\/\/(www\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || value.match(/^(https?):\/\/(www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
		            if (match) {
		              value = match[1] + '://www.youtube.com/embed/' + match[3] + '?showinfo=0';
		            } else if (match = value.match(/^(https?):\/\/(www\.)?vimeo\.com\/(\d+)/)) {
		              // eslint-disable-line no-cond-assign
		              value = match[1] + '://player.vimeo.com/video/' + match[3] + '/';
		            }
		          } // eslint-disable-next-line no-fallthrough
		        case 'formula':
		          {
		            var range = this.quill.getSelection(true);
		            var index = range.index + range.length;
		            if (range != null) {
		              this.quill.insertEmbed(index, this.root.getAttribute('data-mode'), value, _emitter2.default.sources.USER);
		              if (this.root.getAttribute('data-mode') === 'formula') {
		                this.quill.insertText(index + 1, ' ', _emitter2.default.sources.USER);
		              }
		              this.quill.setSelection(index + 2, _emitter2.default.sources.USER);
		            }
		            break;
		          }
		        default:
		      }
		      this.textbox.value = '';
		      this.hide();
		    }
		  }]);
	
		  return BaseTooltip;
		}(_tooltip2.default);
	
		function fillSelect(select, values) {
		  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
		  values.forEach(function (value) {
		    var option = document.createElement('option');
		    if (value === defaultValue) {
		      option.setAttribute('selected', 'selected');
		    } else {
		      option.setAttribute('value', value);
		    }
		    select.appendChild(option);
		  });
		}
	
		exports.BaseTooltip = BaseTooltip;
		exports.default = BaseTheme;
	
	/***/ },
	/* 109 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		var _extend = __webpack_require__(25);
	
		var _extend2 = _interopRequireDefault(_extend);
	
		var _emitter = __webpack_require__(35);
	
		var _emitter2 = _interopRequireDefault(_emitter);
	
		var _base = __webpack_require__(108);
	
		var _base2 = _interopRequireDefault(_base);
	
		var _link = __webpack_require__(60);
	
		var _link2 = _interopRequireDefault(_link);
	
		var _selection = __webpack_require__(40);
	
		var _icons = __webpack_require__(69);
	
		var _icons2 = _interopRequireDefault(_icons);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var TOOLBAR_CONFIG = [[{ header: ['1', '2', '3', false] }], ['bold', 'italic', 'underline', 'link'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']];
	
		var SnowTheme = function (_BaseTheme) {
		  _inherits(SnowTheme, _BaseTheme);
	
		  function SnowTheme(quill, options) {
		    _classCallCheck(this, SnowTheme);
	
		    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
		      options.modules.toolbar.container = TOOLBAR_CONFIG;
		    }
	
		    var _this = _possibleConstructorReturn(this, (SnowTheme.__proto__ || Object.getPrototypeOf(SnowTheme)).call(this, quill, options));
	
		    _this.quill.container.classList.add('ql-snow');
		    return _this;
		  }
	
		  _createClass(SnowTheme, [{
		    key: 'extendToolbar',
		    value: function extendToolbar(toolbar) {
		      toolbar.container.classList.add('ql-snow');
		      this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), _icons2.default);
		      this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), _icons2.default);
		      this.tooltip = new SnowTooltip(this.quill, this.options.bounds);
		      if (toolbar.container.querySelector('.ql-link')) {
		        this.quill.keyboard.addBinding({ key: 'K', shortKey: true }, function (range, context) {
		          toolbar.handlers['link'].call(toolbar, !context.format.link);
		        });
		      }
		    }
		  }]);
	
		  return SnowTheme;
		}(_base2.default);
	
		SnowTheme.DEFAULTS = (0, _extend2.default)(true, {}, _base2.default.DEFAULTS, {
		  modules: {
		    toolbar: {
		      handlers: {
		        link: function link(value) {
		          if (value) {
		            var range = this.quill.getSelection();
		            if (range == null || range.length == 0) return;
		            var preview = this.quill.getText(range);
		            if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {
		              preview = 'mailto:' + preview;
		            }
		            var tooltip = this.quill.theme.tooltip;
		            tooltip.edit('link', preview);
		          } else {
		            this.quill.format('link', false);
		          }
		        }
		      }
		    }
		  }
		});
	
		var SnowTooltip = function (_BaseTooltip) {
		  _inherits(SnowTooltip, _BaseTooltip);
	
		  function SnowTooltip(quill, bounds) {
		    _classCallCheck(this, SnowTooltip);
	
		    var _this2 = _possibleConstructorReturn(this, (SnowTooltip.__proto__ || Object.getPrototypeOf(SnowTooltip)).call(this, quill, bounds));
	
		    _this2.preview = _this2.root.querySelector('a.ql-preview');
		    return _this2;
		  }
	
		  _createClass(SnowTooltip, [{
		    key: 'listen',
		    value: function listen() {
		      var _this3 = this;
	
		      _get(SnowTooltip.prototype.__proto__ || Object.getPrototypeOf(SnowTooltip.prototype), 'listen', this).call(this);
		      this.root.querySelector('a.ql-action').addEventListener('click', function (event) {
		        if (_this3.root.classList.contains('ql-editing')) {
		          _this3.save();
		        } else {
		          _this3.edit('link', _this3.preview.textContent);
		        }
		        event.preventDefault();
		      });
		      this.root.querySelector('a.ql-remove').addEventListener('click', function (event) {
		        if (_this3.linkRange != null) {
		          _this3.restoreFocus();
		          _this3.quill.formatText(_this3.linkRange, 'link', false, _emitter2.default.sources.USER);
		          delete _this3.linkRange;
		        }
		        event.preventDefault();
		        _this3.hide();
		      });
		      this.quill.on(_emitter2.default.events.SELECTION_CHANGE, function (range, oldRange, source) {
		        if (range == null) return;
		        if (range.length === 0 && source === _emitter2.default.sources.USER) {
		          var _quill$scroll$descend = _this3.quill.scroll.descendant(_link2.default, range.index),
		              _quill$scroll$descend2 = _slicedToArray(_quill$scroll$descend, 2),
		              link = _quill$scroll$descend2[0],
		              offset = _quill$scroll$descend2[1];
	
		          if (link != null) {
		            _this3.linkRange = new _selection.Range(range.index - offset, link.length());
		            var preview = _link2.default.formats(link.domNode);
		            _this3.preview.textContent = preview;
		            _this3.preview.setAttribute('href', preview);
		            _this3.show();
		            _this3.position(_this3.quill.getBounds(_this3.linkRange));
		            return;
		          }
		        } else {
		          delete _this3.linkRange;
		        }
		        _this3.hide();
		      });
		    }
		  }, {
		    key: 'show',
		    value: function show() {
		      _get(SnowTooltip.prototype.__proto__ || Object.getPrototypeOf(SnowTooltip.prototype), 'show', this).call(this);
		      this.root.removeAttribute('data-mode');
		    }
		  }]);
	
		  return SnowTooltip;
		}(_base.BaseTooltip);
	
		SnowTooltip.TEMPLATE = ['<a class="ql-preview" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join('');
	
		exports.default = SnowTheme;
	
	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 2 */
/*!**************************!*\
  !*** ./src/component.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(/*! react */ 3);
	var ReactDOM = __webpack_require__(/*! react-dom */ 4);
	var QuillMixin = __webpack_require__(/*! ./mixin */ 5);
	var find = __webpack_require__(/*! lodash/find */ 6);
	var some = __webpack_require__(/*! lodash/some */ 128);
	var isEqual = __webpack_require__(/*! lodash/isEqual */ 136);
	var T = React.PropTypes;
	
	var QuillComponent = React.createClass({
	
		displayName: 'Quill',
	
		mixins: [ QuillMixin ],
	
		propTypes: {
			id: T.string,
			className: T.string,
			theme: T.string,
			style: T.object,
			readOnly: T.bool,
			value: T.string,
			defaultValue: T.string,
			placeholder: T.string,
			bounds: T.oneOfType([T.string, T.element]),
			onKeyPress: T.func,
			onKeyDown: T.func,
			onKeyUp: T.func,
			onChange: T.func,
			onChangeSelection: T.func,
	
			modules: function(props) {
				var isNotObject = T.object.apply(this, arguments);
				if (isNotObject) return isNotObject;
	
				if (
					props.modules && 
					props.modules.toolbar &&
					props.modules.toolbar[0] &&
					props.modules.toolbar[0].type
				) return new Error(
					'Since v1.0.0, React Quill will not create a custom toolbar for you ' +
					'anymore. Create a toolbar explictly, or let Quill create one. ' +
					'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v1-0-0'
				);
			},
	
			toolbar: function(props) {
				if ('toolbar' in props) return new Error(
					'The `toolbar` prop has been deprecated. Use `modules.toolbar` instead. ' +
					'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v1-0-0'
				);
			},
	
			formats: function(props) {
				var isNotArrayOfString = T.arrayOf(T.string).apply(this, arguments);
	
				if (isNotArrayOfString) return new Error(
					'You cannot specify custom `formats` anymore. Use Parchment instead.  ' +
					'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v1-0-0'
				);
			},
	
			styles: function(props) {
				if ('styles' in props) return new Error(
					'The `styles` prop has been deprecated. Use custom stylesheets instead. ' +
					'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v1-0-0'
				);
			},
	
			pollInterval: function(props) {
				if ('pollInterval' in props) return new Error(
					'The `pollInterval` property does not have any effect anymore. ' +
					'You can safely remove it from your props.' +
					'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v1-0-0'
				);
			}
		},
			
		/*
		Changing one of these props should cause a re-render.
		*/
		dirtyProps: [
			'id',
			'className',
			'style',
			'modules',
			'formats',
			'bounds',
			'theme',
		],
	
		getDefaultProps: function() {
			return {
				className: '',
				theme: 'snow',
				modules: {},
			};
		},
	
		/*
		We consider the component to be controlled if
		whenever `value` is bein sent in props.
		*/
		isControlled: function() {
			return 'value' in this.props;
		},
	
		getInitialState: function() {
			return {
				value: this.isControlled()
					? this.props.value
					: this.props.defaultValue
			};
		},
	
		componentWillReceiveProps: function(nextProps) {
			var editor = this.state.editor;
			// If the component is unmounted and mounted too quickly
			// an error is thrown in setEditorContents since editor is
			// still undefined. Must check if editor is undefined
			// before performing this call.
			if (editor) {
				// Update only if we've been passed a new `value`.
				// This leaves components using `defaultValue` alone.
				if ('value' in nextProps) {
					// NOTE: Seeing that Quill is missing a way to prevent
					//       edits, we have to settle for a hybrid between
					//       controlled and uncontrolled mode. We can't prevent
					//       the change, but we'll still override content
					//       whenever `value` differs from current state.
					if (nextProps.value !== this.getEditorContents()) {
						this.setEditorContents(editor, nextProps.value);
					}
				}
				// We can update readOnly state in-place.
				if ('readOnly' in nextProps) {
					if (nextProps.readOnly !== this.props.readOnly) {
						this.setEditorReadOnly(editor, nextProps.readOnly);
					}
				}
			}
		},
	
		componentDidMount: function() {
			var editor = this.createEditor(
				this.getEditorElement(),
				this.getEditorConfig()
			);
			this.setState({ editor:editor });
		},
	
		componentWillUnmount: function() {
			// NOTE: Don't set the state to null here
			//       as it would generate a loop.
		},
	
		shouldComponentUpdate: function(nextProps, nextState) {
			// Rerender whenever a "dirtyProp" changes
			var props = this.props;
			return some(this.dirtyProps, function(prop) {
				return !isEqual(nextProps[prop], props[prop]);
			});
		},
	
		/*
		If for whatever reason we are rendering again,
		we should tear down the editor and bring it up
		again.
		*/
		componentWillUpdate: function() {
			this.componentWillUnmount();
		},
	
		componentDidUpdate: function() {
			this.componentDidMount();
		},
	
		getEditorConfig: function() {
			return {
				bounds:       this.props.bounds,
				formats:      this.props.formats,
				modules:      this.props.modules,
				placeholder:  this.props.placeholder,
				readOnly:     this.props.readOnly,
				theme:        this.props.theme,
			};
		},
	
		getEditor: function() {
			return this.state.editor;
		},
	
		getEditorElement: function() {
			return ReactDOM.findDOMNode(this.refs.editor);
		},
	
		getEditorContents: function() {
			return this.state.value;
		},
	
		getEditorSelection: function() {
			return this.state.selection;
		},
	
		/*
		Renders an editor element, unless it has been provided one to clone.
		*/
		renderContents: function() {
			var contents = [];
			var children = React.Children.map(
				this.props.children,
				function(c) { return React.cloneElement(c, {ref: c.ref}); }
			);
	
			var editor = find(children, function(child) {
				return child.ref === 'editor';
			});
			contents.push(editor || React.DOM.div({
				key: 'editor-' + Math.random(),
				ref: 'editor',
				className: 'quill-contents',
				dangerouslySetInnerHTML: { __html:this.getEditorContents() }
			}));
	
			return contents;
		},
	
		render: function() {
			return React.DOM.div({
				id: this.props.id,
				style: this.props.style,
				className: ['quill'].concat(this.props.className).join(' '),
				onKeyPress: this.props.onKeyPress,
				onKeyDown: this.props.onKeyDown,
				onKeyUp: this.props.onKeyUp },
				this.renderContents()
			);
		},
	
		onEditorChange: function(value, delta, source, editor) {
			if (value !== this.getEditorContents()) {
				this.setState({ value: value });
				if (this.props.onChange) {
					this.props.onChange(value, delta, source, editor);
				}
			}
		},
	
		onEditorChangeSelection: function(range, source, editor) {
			var s = this.getEditorSelection() || {};
			var r = range || {};
			if (r.length !== s.length || r.index !== s.index) {
				this.setState({ selection: range });
				if (this.props.onChangeSelection) {
					this.props.onChangeSelection(range, source, editor);
				}
			}
		},
	
		focus: function() {
			this.state.editor.focus();
		},
	
		blur: function() {
			this.setEditorSelection(this.state.editor, null);
		}
	
	});
	
	module.exports = QuillComponent;


/***/ },
/* 3 */
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"} ***!
  \**************************************************************************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/*!*****************************************************************************************************!*\
  !*** external {"commonjs":"react-dom","commonjs2":"react-dom","amd":"react-dom","root":"ReactDOM"} ***!
  \*****************************************************************************************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/*!**********************!*\
  !*** ./src/mixin.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Quill = __webpack_require__(/*! quill */ 1);
	
	var QuillMixin = {
	
		/**
		Creates an editor on the given element. The editor will
		be passed the configuration, have its events bound,
		*/
		createEditor: function($el, config) {
			var editor = new Quill($el, config);
			this.hookEditor(editor);
			return editor;
		},
	
		hookEditor: function(editor) {
			// Expose the editor on change events via a weaker,
			// unprivileged proxy object that does not allow
			// accidentally modifying editor state.
			var unprivilegedEditor = this.makeUnprivilegedEditor(editor);
	
			editor.on('editor-change', function(delta, oldDelta, source) {
				if (this.onEditorChange) {
					this.onEditorChange(
						editor.root.innerHTML, delta, source,
						unprivilegedEditor
					);
					this.onEditorChangeSelection(
						editor.getSelection(), source,
						unprivilegedEditor
					)
				}
			}.bind(this));
	
			editor.on('selection-change', function(range, oldRange, source) {
				if (this.onEditorChangeSelection) {
					this.onEditorChangeSelection(
						range, source,
						unprivilegedEditor
					);
				}
			}.bind(this));
		},
	
		setEditorReadOnly: function(editor, value) {
			value? editor.disable()
			     : editor.enable();
		},
	
		/*
		Replace the contents of the editor, but keep
		the previous selection hanging around so that
		the cursor won't move.
		*/
		setEditorContents: function(editor, value) {
			var sel = editor.getSelection();
			editor.pasteHTML(value || '');
			if (sel) this.setEditorSelection(editor, sel);
		},
	
		setEditorSelection: function(editor, range) {
			if (range) {
				// Validate bounds before applying.
				var length = editor.getLength();
				range.index = Math.max(0, Math.min(range.index, range.length-1));
				range.length = length;
			}
			editor.setSelection(range);
		},
	
		/*
		Returns an weaker, unprivileged proxy object that only
		exposes read-only accessors found on the editor instance,
		without any state-modificating methods.
		*/
		makeUnprivilegedEditor: function(editor) {
			var e = editor;
			return {
				getLength:    function(){ return e.getLength.apply(e, arguments); },
				getText:      function(){ return e.getText.apply(e, arguments); },
				getContents:  function(){ return e.getContents.apply(e, arguments); },
				getSelection: function(){ return e.getSelection.apply(e, arguments); },
				getBounds:    function(){ return e.getBounds.apply(e, arguments); },
			};
		}
	
	};
	
	module.exports = QuillMixin;


/***/ },
/* 6 */
/*!**************************!*\
  !*** ./~/lodash/find.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	var createFind = __webpack_require__(/*! ./_createFind */ 7),
	    findIndex = __webpack_require__(/*! ./findIndex */ 123);
	
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
/* 7 */
/*!*********************************!*\
  !*** ./~/lodash/_createFind.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(/*! ./_baseIteratee */ 8),
	    isArrayLike = __webpack_require__(/*! ./isArrayLike */ 94),
	    keys = __webpack_require__(/*! ./keys */ 75);
	
	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} findIndexFunc The function to find the collection index.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(findIndexFunc) {
	  return function(collection, predicate, fromIndex) {
	    var iterable = Object(collection);
	    if (!isArrayLike(collection)) {
	      var iteratee = baseIteratee(predicate, 3);
	      collection = keys(collection);
	      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
	    }
	    var index = findIndexFunc(collection, predicate, fromIndex);
	    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
	  };
	}
	
	module.exports = createFind;


/***/ },
/* 8 */
/*!***********************************!*\
  !*** ./~/lodash/_baseIteratee.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(/*! ./_baseMatches */ 9),
	    baseMatchesProperty = __webpack_require__(/*! ./_baseMatchesProperty */ 103),
	    identity = __webpack_require__(/*! ./identity */ 119),
	    isArray = __webpack_require__(/*! ./isArray */ 71),
	    property = __webpack_require__(/*! ./property */ 120);
	
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
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}
	
	module.exports = baseIteratee;


/***/ },
/* 9 */
/*!**********************************!*\
  !*** ./~/lodash/_baseMatches.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(/*! ./_baseIsMatch */ 10),
	    getMatchData = __webpack_require__(/*! ./_getMatchData */ 100),
	    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ 102);
	
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
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}
	
	module.exports = baseMatches;


/***/ },
/* 10 */
/*!**********************************!*\
  !*** ./~/lodash/_baseIsMatch.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(/*! ./_Stack */ 11),
	    baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ 55);
	
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
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
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
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	module.exports = baseIsMatch;


/***/ },
/* 11 */
/*!****************************!*\
  !*** ./~/lodash/_Stack.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(/*! ./_ListCache */ 12),
	    stackClear = __webpack_require__(/*! ./_stackClear */ 20),
	    stackDelete = __webpack_require__(/*! ./_stackDelete */ 21),
	    stackGet = __webpack_require__(/*! ./_stackGet */ 22),
	    stackHas = __webpack_require__(/*! ./_stackHas */ 23),
	    stackSet = __webpack_require__(/*! ./_stackSet */ 24);
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}
	
	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	module.exports = Stack;


/***/ },
/* 12 */
/*!********************************!*\
  !*** ./~/lodash/_ListCache.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ 13),
	    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ 14),
	    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ 17),
	    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ 18),
	    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ 19);
	
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
/* 13 */
/*!*************************************!*\
  !*** ./~/lodash/_listCacheClear.js ***!
  \*************************************/
/***/ function(module, exports) {

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
/* 14 */
/*!**************************************!*\
  !*** ./~/lodash/_listCacheDelete.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ 15);
	
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
/* 15 */
/*!***********************************!*\
  !*** ./~/lodash/_assocIndexOf.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(/*! ./eq */ 16);
	
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
/* 16 */
/*!************************!*\
  !*** ./~/lodash/eq.js ***!
  \************************/
/***/ function(module, exports) {

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
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ },
/* 17 */
/*!***********************************!*\
  !*** ./~/lodash/_listCacheGet.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ 15);
	
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
/* 18 */
/*!***********************************!*\
  !*** ./~/lodash/_listCacheHas.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ 15);
	
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
/* 19 */
/*!***********************************!*\
  !*** ./~/lodash/_listCacheSet.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ 15);
	
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
/* 20 */
/*!*********************************!*\
  !*** ./~/lodash/_stackClear.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(/*! ./_ListCache */ 12);
	
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}
	
	module.exports = stackClear;


/***/ },
/* 21 */
/*!**********************************!*\
  !*** ./~/lodash/_stackDelete.js ***!
  \**********************************/
/***/ function(module, exports) {

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
	      result = data['delete'](key);
	
	  this.size = data.size;
	  return result;
	}
	
	module.exports = stackDelete;


/***/ },
/* 22 */
/*!*******************************!*\
  !*** ./~/lodash/_stackGet.js ***!
  \*******************************/
/***/ function(module, exports) {

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
/* 23 */
/*!*******************************!*\
  !*** ./~/lodash/_stackHas.js ***!
  \*******************************/
/***/ function(module, exports) {

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
/* 24 */
/*!*******************************!*\
  !*** ./~/lodash/_stackSet.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(/*! ./_ListCache */ 12),
	    Map = __webpack_require__(/*! ./_Map */ 25),
	    MapCache = __webpack_require__(/*! ./_MapCache */ 40);
	
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
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}
	
	module.exports = stackSet;


/***/ },
/* 25 */
/*!**************************!*\
  !*** ./~/lodash/_Map.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(/*! ./_getNative */ 26),
	    root = __webpack_require__(/*! ./_root */ 31);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 26 */
/*!********************************!*\
  !*** ./~/lodash/_getNative.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ 27),
	    getValue = __webpack_require__(/*! ./_getValue */ 39);
	
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
/* 27 */
/*!***********************************!*\
  !*** ./~/lodash/_baseIsNative.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(/*! ./isFunction */ 28),
	    isMasked = __webpack_require__(/*! ./_isMasked */ 36),
	    isObject = __webpack_require__(/*! ./isObject */ 35),
	    toSource = __webpack_require__(/*! ./_toSource */ 38);
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
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
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	module.exports = baseIsNative;


/***/ },
/* 28 */
/*!********************************!*\
  !*** ./~/lodash/isFunction.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ 29),
	    isObject = __webpack_require__(/*! ./isObject */ 35);
	
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
/* 29 */
/*!*********************************!*\
  !*** ./~/lodash/_baseGetTag.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(/*! ./_Symbol */ 30),
	    getRawTag = __webpack_require__(/*! ./_getRawTag */ 33),
	    objectToString = __webpack_require__(/*! ./_objectToString */ 34);
	
	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}
	
	module.exports = baseGetTag;


/***/ },
/* 30 */
/*!*****************************!*\
  !*** ./~/lodash/_Symbol.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(/*! ./_root */ 31);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 31 */
/*!***************************!*\
  !*** ./~/lodash/_root.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ 32);
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	module.exports = root;


/***/ },
/* 32 */
/*!*********************************!*\
  !*** ./~/lodash/_freeGlobal.js ***!
  \*********************************/
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	module.exports = freeGlobal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 33 */
/*!********************************!*\
  !*** ./~/lodash/_getRawTag.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(/*! ./_Symbol */ 30);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];
	
	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}
	
	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}
	
	module.exports = getRawTag;


/***/ },
/* 34 */
/*!*************************************!*\
  !*** ./~/lodash/_objectToString.js ***!
  \*************************************/
/***/ function(module, exports) {

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
/* 35 */
/*!******************************!*\
  !*** ./~/lodash/isObject.js ***!
  \******************************/
/***/ function(module, exports) {

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
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 36 */
/*!*******************************!*\
  !*** ./~/lodash/_isMasked.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(/*! ./_coreJsData */ 37);
	
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}
	
	module.exports = isMasked;


/***/ },
/* 37 */
/*!*********************************!*\
  !*** ./~/lodash/_coreJsData.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(/*! ./_root */ 31);
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	module.exports = coreJsData;


/***/ },
/* 38 */
/*!*******************************!*\
  !*** ./~/lodash/_toSource.js ***!
  \*******************************/
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
	module.exports = toSource;


/***/ },
/* 39 */
/*!*******************************!*\
  !*** ./~/lodash/_getValue.js ***!
  \*******************************/
/***/ function(module, exports) {

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
/* 40 */
/*!*******************************!*\
  !*** ./~/lodash/_MapCache.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ 41),
	    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ 49),
	    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ 52),
	    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ 53),
	    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ 54);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	
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
/* 41 */
/*!************************************!*\
  !*** ./~/lodash/_mapCacheClear.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(/*! ./_Hash */ 42),
	    ListCache = __webpack_require__(/*! ./_ListCache */ 12),
	    Map = __webpack_require__(/*! ./_Map */ 25);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	
	module.exports = mapCacheClear;


/***/ },
/* 42 */
/*!***************************!*\
  !*** ./~/lodash/_Hash.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(/*! ./_hashClear */ 43),
	    hashDelete = __webpack_require__(/*! ./_hashDelete */ 45),
	    hashGet = __webpack_require__(/*! ./_hashGet */ 46),
	    hashHas = __webpack_require__(/*! ./_hashHas */ 47),
	    hashSet = __webpack_require__(/*! ./_hashSet */ 48);
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	
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
/* 43 */
/*!********************************!*\
  !*** ./~/lodash/_hashClear.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ 44);
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}
	
	module.exports = hashClear;


/***/ },
/* 44 */
/*!***********************************!*\
  !*** ./~/lodash/_nativeCreate.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(/*! ./_getNative */ 26);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 45 */
/*!*********************************!*\
  !*** ./~/lodash/_hashDelete.js ***!
  \*********************************/
/***/ function(module, exports) {

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
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}
	
	module.exports = hashDelete;


/***/ },
/* 46 */
/*!******************************!*\
  !*** ./~/lodash/_hashGet.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ 44);
	
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
/* 47 */
/*!******************************!*\
  !*** ./~/lodash/_hashHas.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ 44);
	
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
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}
	
	module.exports = hashHas;


/***/ },
/* 48 */
/*!******************************!*\
  !*** ./~/lodash/_hashSet.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ 44);
	
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
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	
	module.exports = hashSet;


/***/ },
/* 49 */
/*!*************************************!*\
  !*** ./~/lodash/_mapCacheDelete.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(/*! ./_getMapData */ 50);
	
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
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}
	
	module.exports = mapCacheDelete;


/***/ },
/* 50 */
/*!*********************************!*\
  !*** ./~/lodash/_getMapData.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(/*! ./_isKeyable */ 51);
	
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
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}
	
	module.exports = getMapData;


/***/ },
/* 51 */
/*!********************************!*\
  !*** ./~/lodash/_isKeyable.js ***!
  \********************************/
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}
	
	module.exports = isKeyable;


/***/ },
/* 52 */
/*!**********************************!*\
  !*** ./~/lodash/_mapCacheGet.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(/*! ./_getMapData */ 50);
	
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
/* 53 */
/*!**********************************!*\
  !*** ./~/lodash/_mapCacheHas.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(/*! ./_getMapData */ 50);
	
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
/* 54 */
/*!**********************************!*\
  !*** ./~/lodash/_mapCacheSet.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(/*! ./_getMapData */ 50);
	
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
	  var data = getMapData(this, key),
	      size = data.size;
	
	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}
	
	module.exports = mapCacheSet;


/***/ },
/* 55 */
/*!**********************************!*\
  !*** ./~/lodash/_baseIsEqual.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(/*! ./_baseIsEqualDeep */ 56),
	    isObjectLike = __webpack_require__(/*! ./isObjectLike */ 80);
	
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
	  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 56 */
/*!**************************************!*\
  !*** ./~/lodash/_baseIsEqualDeep.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(/*! ./_Stack */ 11),
	    equalArrays = __webpack_require__(/*! ./_equalArrays */ 57),
	    equalByTag = __webpack_require__(/*! ./_equalByTag */ 63),
	    equalObjects = __webpack_require__(/*! ./_equalObjects */ 67),
	    getTag = __webpack_require__(/*! ./_getTag */ 95),
	    isArray = __webpack_require__(/*! ./isArray */ 71),
	    isBuffer = __webpack_require__(/*! ./isBuffer */ 81),
	    isTypedArray = __webpack_require__(/*! ./isTypedArray */ 85);
	
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
	      objTag = objIsArr ? arrayTag : getTag(object),
	      othTag = othIsArr ? arrayTag : getTag(other);
	
	  objTag = objTag == argsTag ? objectTag : objTag;
	  othTag = othTag == argsTag ? objectTag : othTag;
	
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
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;
	
	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 57 */
/*!**********************************!*\
  !*** ./~/lodash/_equalArrays.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(/*! ./_SetCache */ 58),
	    arraySome = __webpack_require__(/*! ./_arraySome */ 61),
	    cacheHas = __webpack_require__(/*! ./_cacheHas */ 62);
	
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
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;
	
	  stack.set(array, other);
	  stack.set(other, array);
	
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
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
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
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
/* 58 */
/*!*******************************!*\
  !*** ./~/lodash/_SetCache.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(/*! ./_MapCache */ 40),
	    setCacheAdd = __webpack_require__(/*! ./_setCacheAdd */ 59),
	    setCacheHas = __webpack_require__(/*! ./_setCacheHas */ 60);
	
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
	      length = values == null ? 0 : values.length;
	
	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}
	
	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	
	module.exports = SetCache;


/***/ },
/* 59 */
/*!**********************************!*\
  !*** ./~/lodash/_setCacheAdd.js ***!
  \**********************************/
/***/ function(module, exports) {

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
/* 60 */
/*!**********************************!*\
  !*** ./~/lodash/_setCacheHas.js ***!
  \**********************************/
/***/ function(module, exports) {

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
/* 61 */
/*!********************************!*\
  !*** ./~/lodash/_arraySome.js ***!
  \********************************/
/***/ function(module, exports) {

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
/* 62 */
/*!*******************************!*\
  !*** ./~/lodash/_cacheHas.js ***!
  \*******************************/
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
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
/* 63 */
/*!*********************************!*\
  !*** ./~/lodash/_equalByTag.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(/*! ./_Symbol */ 30),
	    Uint8Array = __webpack_require__(/*! ./_Uint8Array */ 64),
	    eq = __webpack_require__(/*! ./eq */ 16),
	    equalArrays = __webpack_require__(/*! ./_equalArrays */ 57),
	    mapToArray = __webpack_require__(/*! ./_mapToArray */ 65),
	    setToArray = __webpack_require__(/*! ./_setToArray */ 66);
	
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;
	
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
	var symbolProto = Symbol ? Symbol.prototype : undefined,
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
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;
	
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	
	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;
	
	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 64 */
/*!*********************************!*\
  !*** ./~/lodash/_Uint8Array.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(/*! ./_root */ 31);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.exports = Uint8Array;


/***/ },
/* 65 */
/*!*********************************!*\
  !*** ./~/lodash/_mapToArray.js ***!
  \*********************************/
/***/ function(module, exports) {

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
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	module.exports = mapToArray;


/***/ },
/* 66 */
/*!*********************************!*\
  !*** ./~/lodash/_setToArray.js ***!
  \*********************************/
/***/ function(module, exports) {

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
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	module.exports = setToArray;


/***/ },
/* 67 */
/*!***********************************!*\
  !*** ./~/lodash/_equalObjects.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var getAllKeys = __webpack_require__(/*! ./_getAllKeys */ 68);
	
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
	      objProps = getAllKeys(object),
	      objLength = objProps.length,
	      othProps = getAllKeys(other),
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
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}
	
	module.exports = equalObjects;


/***/ },
/* 68 */
/*!*********************************!*\
  !*** ./~/lodash/_getAllKeys.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ 69),
	    getSymbols = __webpack_require__(/*! ./_getSymbols */ 72),
	    keys = __webpack_require__(/*! ./keys */ 75);
	
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
/* 69 */
/*!*************************************!*\
  !*** ./~/lodash/_baseGetAllKeys.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(/*! ./_arrayPush */ 70),
	    isArray = __webpack_require__(/*! ./isArray */ 71);
	
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
/* 70 */
/*!********************************!*\
  !*** ./~/lodash/_arrayPush.js ***!
  \********************************/
/***/ function(module, exports) {

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
/* 71 */
/*!*****************************!*\
  !*** ./~/lodash/isArray.js ***!
  \*****************************/
/***/ function(module, exports) {

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
/* 72 */
/*!*********************************!*\
  !*** ./~/lodash/_getSymbols.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ 73),
	    stubArray = __webpack_require__(/*! ./stubArray */ 74);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};
	
	module.exports = getSymbols;


/***/ },
/* 73 */
/*!**********************************!*\
  !*** ./~/lodash/_arrayFilter.js ***!
  \**********************************/
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];
	
	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = arrayFilter;


/***/ },
/* 74 */
/*!*******************************!*\
  !*** ./~/lodash/stubArray.js ***!
  \*******************************/
/***/ function(module, exports) {

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
/* 75 */
/*!**************************!*\
  !*** ./~/lodash/keys.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ 76),
	    baseKeys = __webpack_require__(/*! ./_baseKeys */ 90),
	    isArrayLike = __webpack_require__(/*! ./isArrayLike */ 94);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
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
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	
	module.exports = keys;


/***/ },
/* 76 */
/*!************************************!*\
  !*** ./~/lodash/_arrayLikeKeys.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(/*! ./_baseTimes */ 77),
	    isArguments = __webpack_require__(/*! ./isArguments */ 78),
	    isArray = __webpack_require__(/*! ./isArray */ 71),
	    isBuffer = __webpack_require__(/*! ./isBuffer */ 81),
	    isIndex = __webpack_require__(/*! ./_isIndex */ 84),
	    isTypedArray = __webpack_require__(/*! ./isTypedArray */ 85);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = arrayLikeKeys;


/***/ },
/* 77 */
/*!********************************!*\
  !*** ./~/lodash/_baseTimes.js ***!
  \********************************/
/***/ function(module, exports) {

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
/* 78 */
/*!*********************************!*\
  !*** ./~/lodash/isArguments.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ 79),
	    isObjectLike = __webpack_require__(/*! ./isObjectLike */ 80);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
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
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};
	
	module.exports = isArguments;


/***/ },
/* 79 */
/*!**************************************!*\
  !*** ./~/lodash/_baseIsArguments.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ 29),
	    isObjectLike = __webpack_require__(/*! ./isObjectLike */ 80);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}
	
	module.exports = baseIsArguments;


/***/ },
/* 80 */
/*!**********************************!*\
  !*** ./~/lodash/isObjectLike.js ***!
  \**********************************/
/***/ function(module, exports) {

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
	  return value != null && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 81 */
/*!******************************!*\
  !*** ./~/lodash/isBuffer.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ 31),
	    stubFalse = __webpack_require__(/*! ./stubFalse */ 83);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
	
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
	var isBuffer = nativeIsBuffer || stubFalse;
	
	module.exports = isBuffer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/module.js */ 82)(module)))

/***/ },
/* 82 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
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
/* 83 */
/*!*******************************!*\
  !*** ./~/lodash/stubFalse.js ***!
  \*******************************/
/***/ function(module, exports) {

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
/* 84 */
/*!******************************!*\
  !*** ./~/lodash/_isIndex.js ***!
  \******************************/
/***/ function(module, exports) {

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
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	module.exports = isIndex;


/***/ },
/* 85 */
/*!**********************************!*\
  !*** ./~/lodash/isTypedArray.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ 86),
	    baseUnary = __webpack_require__(/*! ./_baseUnary */ 88),
	    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ 89);
	
	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	
	module.exports = isTypedArray;


/***/ },
/* 86 */
/*!***************************************!*\
  !*** ./~/lodash/_baseIsTypedArray.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ 29),
	    isLength = __webpack_require__(/*! ./isLength */ 87),
	    isObjectLike = __webpack_require__(/*! ./isObjectLike */ 80);
	
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
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}
	
	module.exports = baseIsTypedArray;


/***/ },
/* 87 */
/*!******************************!*\
  !*** ./~/lodash/isLength.js ***!
  \******************************/
/***/ function(module, exports) {

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
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 88 */
/*!********************************!*\
  !*** ./~/lodash/_baseUnary.js ***!
  \********************************/
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
	module.exports = baseUnary;


/***/ },
/* 89 */
/*!*******************************!*\
  !*** ./~/lodash/_nodeUtil.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ 32);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;
	
	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());
	
	module.exports = nodeUtil;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/module.js */ 82)(module)))

/***/ },
/* 90 */
/*!*******************************!*\
  !*** ./~/lodash/_baseKeys.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(/*! ./_isPrototype */ 91),
	    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ 92);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = baseKeys;


/***/ },
/* 91 */
/*!**********************************!*\
  !*** ./~/lodash/_isPrototype.js ***!
  \**********************************/
/***/ function(module, exports) {

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
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;


/***/ },
/* 92 */
/*!*********************************!*\
  !*** ./~/lodash/_nativeKeys.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(/*! ./_overArg */ 93);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);
	
	module.exports = nativeKeys;


/***/ },
/* 93 */
/*!******************************!*\
  !*** ./~/lodash/_overArg.js ***!
  \******************************/
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ },
/* 94 */
/*!*********************************!*\
  !*** ./~/lodash/isArrayLike.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(/*! ./isFunction */ 28),
	    isLength = __webpack_require__(/*! ./isLength */ 87);
	
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
/* 95 */
/*!*****************************!*\
  !*** ./~/lodash/_getTag.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(/*! ./_DataView */ 96),
	    Map = __webpack_require__(/*! ./_Map */ 25),
	    Promise = __webpack_require__(/*! ./_Promise */ 97),
	    Set = __webpack_require__(/*! ./_Set */ 98),
	    WeakMap = __webpack_require__(/*! ./_WeakMap */ 99),
	    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ 29),
	    toSource = __webpack_require__(/*! ./_toSource */ 38);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	var dataViewTag = '[object DataView]';
	
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
	var getTag = baseGetTag;
	
	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';
	
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.exports = getTag;


/***/ },
/* 96 */
/*!*******************************!*\
  !*** ./~/lodash/_DataView.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(/*! ./_getNative */ 26),
	    root = __webpack_require__(/*! ./_root */ 31);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');
	
	module.exports = DataView;


/***/ },
/* 97 */
/*!******************************!*\
  !*** ./~/lodash/_Promise.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(/*! ./_getNative */ 26),
	    root = __webpack_require__(/*! ./_root */ 31);
	
	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');
	
	module.exports = Promise;


/***/ },
/* 98 */
/*!**************************!*\
  !*** ./~/lodash/_Set.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(/*! ./_getNative */ 26),
	    root = __webpack_require__(/*! ./_root */ 31);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 99 */
/*!******************************!*\
  !*** ./~/lodash/_WeakMap.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(/*! ./_getNative */ 26),
	    root = __webpack_require__(/*! ./_root */ 31);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 100 */
/*!***********************************!*\
  !*** ./~/lodash/_getMatchData.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ 101),
	    keys = __webpack_require__(/*! ./keys */ 75);
	
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
/* 101 */
/*!*****************************************!*\
  !*** ./~/lodash/_isStrictComparable.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./isObject */ 35);
	
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
/* 102 */
/*!**********************************************!*\
  !*** ./~/lodash/_matchesStrictComparable.js ***!
  \**********************************************/
/***/ function(module, exports) {

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
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}
	
	module.exports = matchesStrictComparable;


/***/ },
/* 103 */
/*!******************************************!*\
  !*** ./~/lodash/_baseMatchesProperty.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ 55),
	    get = __webpack_require__(/*! ./get */ 104),
	    hasIn = __webpack_require__(/*! ./hasIn */ 116),
	    isKey = __webpack_require__(/*! ./_isKey */ 107),
	    isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ 101),
	    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ 102),
	    toKey = __webpack_require__(/*! ./_toKey */ 115);
	
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
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	  };
	}
	
	module.exports = baseMatchesProperty;


/***/ },
/* 104 */
/*!*************************!*\
  !*** ./~/lodash/get.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(/*! ./_baseGet */ 105);
	
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
/* 105 */
/*!******************************!*\
  !*** ./~/lodash/_baseGet.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(/*! ./_castPath */ 106),
	    toKey = __webpack_require__(/*! ./_toKey */ 115);
	
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
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 106 */
/*!*******************************!*\
  !*** ./~/lodash/_castPath.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(/*! ./isArray */ 71),
	    isKey = __webpack_require__(/*! ./_isKey */ 107),
	    stringToPath = __webpack_require__(/*! ./_stringToPath */ 109),
	    toString = __webpack_require__(/*! ./toString */ 112);
	
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
/* 107 */
/*!****************************!*\
  !*** ./~/lodash/_isKey.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(/*! ./isArray */ 71),
	    isSymbol = __webpack_require__(/*! ./isSymbol */ 108);
	
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
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}
	
	module.exports = isKey;


/***/ },
/* 108 */
/*!******************************!*\
  !*** ./~/lodash/isSymbol.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ 29),
	    isObjectLike = __webpack_require__(/*! ./isObjectLike */ 80);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}
	
	module.exports = isSymbol;


/***/ },
/* 109 */
/*!***********************************!*\
  !*** ./~/lodash/_stringToPath.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ 110);
	
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
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});
	
	module.exports = stringToPath;


/***/ },
/* 110 */
/*!************************************!*\
  !*** ./~/lodash/_memoizeCapped.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(/*! ./memoize */ 111);
	
	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;
	
	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });
	
	  var cache = result.cache;
	  return result;
	}
	
	module.exports = memoizeCapped;


/***/ },
/* 111 */
/*!*****************************!*\
  !*** ./~/lodash/memoize.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(/*! ./_MapCache */ 40);
	
	/** Error message constants. */
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
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
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
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;
	
	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}
	
	// Expose `MapCache`.
	memoize.Cache = MapCache;
	
	module.exports = memoize;


/***/ },
/* 112 */
/*!******************************!*\
  !*** ./~/lodash/toString.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(/*! ./_baseToString */ 113);
	
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
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
/* 113 */
/*!***********************************!*\
  !*** ./~/lodash/_baseToString.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(/*! ./_Symbol */ 30),
	    arrayMap = __webpack_require__(/*! ./_arrayMap */ 114),
	    isArray = __webpack_require__(/*! ./isArray */ 71),
	    isSymbol = __webpack_require__(/*! ./isSymbol */ 108);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
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
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = baseToString;


/***/ },
/* 114 */
/*!*******************************!*\
  !*** ./~/lodash/_arrayMap.js ***!
  \*******************************/
/***/ function(module, exports) {

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
/* 115 */
/*!****************************!*\
  !*** ./~/lodash/_toKey.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(/*! ./isSymbol */ 108);
	
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
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = toKey;


/***/ },
/* 116 */
/*!***************************!*\
  !*** ./~/lodash/hasIn.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(/*! ./_baseHasIn */ 117),
	    hasPath = __webpack_require__(/*! ./_hasPath */ 118);
	
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
/* 117 */
/*!********************************!*\
  !*** ./~/lodash/_baseHasIn.js ***!
  \********************************/
/***/ function(module, exports) {

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
/* 118 */
/*!******************************!*\
  !*** ./~/lodash/_hasPath.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(/*! ./_castPath */ 106),
	    isArguments = __webpack_require__(/*! ./isArguments */ 78),
	    isArray = __webpack_require__(/*! ./isArray */ 71),
	    isIndex = __webpack_require__(/*! ./_isIndex */ 84),
	    isLength = __webpack_require__(/*! ./isLength */ 87),
	    toKey = __webpack_require__(/*! ./_toKey */ 115);
	
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
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}
	
	module.exports = hasPath;


/***/ },
/* 119 */
/*!******************************!*\
  !*** ./~/lodash/identity.js ***!
  \******************************/
/***/ function(module, exports) {

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
/* 120 */
/*!******************************!*\
  !*** ./~/lodash/property.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(/*! ./_baseProperty */ 121),
	    basePropertyDeep = __webpack_require__(/*! ./_basePropertyDeep */ 122),
	    isKey = __webpack_require__(/*! ./_isKey */ 107),
	    toKey = __webpack_require__(/*! ./_toKey */ 115);
	
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
/* 121 */
/*!***********************************!*\
  !*** ./~/lodash/_baseProperty.js ***!
  \***********************************/
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 122 */
/*!***************************************!*\
  !*** ./~/lodash/_basePropertyDeep.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(/*! ./_baseGet */ 105);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ },
/* 123 */
/*!*******************************!*\
  !*** ./~/lodash/findIndex.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(/*! ./_baseFindIndex */ 124),
	    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ 8),
	    toInteger = __webpack_require__(/*! ./toInteger */ 125);
	
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
/* 124 */
/*!************************************!*\
  !*** ./~/lodash/_baseFindIndex.js ***!
  \************************************/
/***/ function(module, exports) {

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
	
	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseFindIndex;


/***/ },
/* 125 */
/*!*******************************!*\
  !*** ./~/lodash/toInteger.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(/*! ./toFinite */ 126);
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
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
	
	  return result === result ? (remainder ? result - remainder : result) : 0;
	}
	
	module.exports = toInteger;


/***/ },
/* 126 */
/*!******************************!*\
  !*** ./~/lodash/toFinite.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(/*! ./toNumber */ 127);
	
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
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}
	
	module.exports = toFinite;


/***/ },
/* 127 */
/*!******************************!*\
  !*** ./~/lodash/toNumber.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./isObject */ 35),
	    isSymbol = __webpack_require__(/*! ./isSymbol */ 108);
	
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
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = toNumber;


/***/ },
/* 128 */
/*!**************************!*\
  !*** ./~/lodash/some.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(/*! ./_arraySome */ 61),
	    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ 8),
	    baseSome = __webpack_require__(/*! ./_baseSome */ 129),
	    isArray = __webpack_require__(/*! ./isArray */ 71),
	    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ 135);
	
	/**
	 * Checks if `predicate` returns truthy for **any** element of `collection`.
	 * Iteration is stopped once `predicate` returns truthy. The predicate is
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.some([null, 0, 'yes', false], Boolean);
	 * // => true
	 *
	 * var users = [
	 *   { 'user': 'barney', 'active': true },
	 *   { 'user': 'fred',   'active': false }
	 * ];
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.some(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.some(users, ['active', false]);
	 * // => true
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.some(users, 'active');
	 * // => true
	 */
	function some(collection, predicate, guard) {
	  var func = isArray(collection) ? arraySome : baseSome;
	  if (guard && isIterateeCall(collection, predicate, guard)) {
	    predicate = undefined;
	  }
	  return func(collection, baseIteratee(predicate, 3));
	}
	
	module.exports = some;


/***/ },
/* 129 */
/*!*******************************!*\
  !*** ./~/lodash/_baseSome.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(/*! ./_baseEach */ 130);
	
	/**
	 * The base implementation of `_.some` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function baseSome(collection, predicate) {
	  var result;
	
	  baseEach(collection, function(value, index, collection) {
	    result = predicate(value, index, collection);
	    return !result;
	  });
	  return !!result;
	}
	
	module.exports = baseSome;


/***/ },
/* 130 */
/*!*******************************!*\
  !*** ./~/lodash/_baseEach.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(/*! ./_baseForOwn */ 131),
	    createBaseEach = __webpack_require__(/*! ./_createBaseEach */ 134);
	
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
/* 131 */
/*!*********************************!*\
  !*** ./~/lodash/_baseForOwn.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(/*! ./_baseFor */ 132),
	    keys = __webpack_require__(/*! ./keys */ 75);
	
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
/* 132 */
/*!******************************!*\
  !*** ./~/lodash/_baseFor.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ 133);
	
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
/* 133 */
/*!************************************!*\
  !*** ./~/lodash/_createBaseFor.js ***!
  \************************************/
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
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
/* 134 */
/*!*************************************!*\
  !*** ./~/lodash/_createBaseEach.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(/*! ./isArrayLike */ 94);
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	module.exports = createBaseEach;


/***/ },
/* 135 */
/*!*************************************!*\
  !*** ./~/lodash/_isIterateeCall.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(/*! ./eq */ 16),
	    isArrayLike = __webpack_require__(/*! ./isArrayLike */ 94),
	    isIndex = __webpack_require__(/*! ./_isIndex */ 84),
	    isObject = __webpack_require__(/*! ./isObject */ 35);
	
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
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 136 */
/*!*****************************!*\
  !*** ./~/lodash/isEqual.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ 55);
	
	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are compared by strict equality, i.e. `===`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
	}
	
	module.exports = isEqual;


/***/ },
/* 137 */
/*!************************!*\
  !*** ./src/toolbar.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	/*
	QuillToolbar is deprecated. Consider switching to the official Quill
	toolbar format, or providing your own toolbar instead. 
	See https://quilljs.com/docs/modules/toolbar
	*/
	
	'use strict';
	
	var React = __webpack_require__(/*! react */ 3);
	var ReactDOMServer = __webpack_require__(/*! react-dom/server */ 138);
	var find = __webpack_require__(/*! lodash/find */ 6);
	var isEqual = __webpack_require__(/*! lodash/isEqual */ 136);
	var T = React.PropTypes;
	
	var defaultColors = [
		'rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
		'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
		'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
		'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
		'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
		'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
		'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
		'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
		'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
		'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
		'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
		'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)',
	].map(function(color){ return { value: color } });
	
	var defaultItems = [
	
		{ label:'Formats', type:'group', items: [
			{ label:'Font', type:'font', items: [
				{ label:'Sans Serif',  value:'sans-serif', selected:true },
				{ label:'Serif',       value:'serif' },
				{ label:'Monospace',   value:'monospace' }
			]},
			{ label:'Size', type:'size', items: [
				{ label:'Small',  value:'10px' },
				{ label:'Normal', value:'13px', selected:true },
				{ label:'Large',  value:'18px' },
				{ label:'Huge',   value:'32px' }
			]},
			{ label:'Alignment', type:'align', items: [
				{ label:'', value:'', selected:true },
				{ label:'', value:'center' },
				{ label:'', value:'right' },
				{ label:'', value:'justify' }
			]}
		]},
	
		{ label:'Text', type:'group', items: [
			{ type:'bold', label:'Bold' },
			{ type:'italic', label:'Italic' },
			{ type:'strike', label:'Strike' },
			{ type:'underline', label:'Underline' },
			{ type:'color', label:'Color', items:defaultColors },
			{ type:'background', label:'Background color', items:defaultColors },
			{ type:'link', label:'Link' }
		]},
	
		{ label:'Blocks', type:'group', items: [
			{ type:'list', value:'bullet' },
			{ type:'list', value:'ordered' }
		]},
	
		{ label:'Blocks', type:'group', items: [
			{ type:'image', label:'Image' }
		]}
	
	];
	
	var QuillToolbar = React.createClass({
	
		displayName: 'Quill Toolbar',
	
		propTypes: {
			id:        T.string,
			className: T.string,
			style:     T.object,
			items:     T.array
		},
	
		getDefaultProps: function() {
			return {
				items: defaultItems
			};
		},
	
		componentDidMount: function() {
			console.warn(
				'QuillToolbar is deprecated. Consider switching to the official Quill ' +
				'toolbar format, or providing your own toolbar instead. ' +
				'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v1-0-0'
			);
		},
	
		shouldComponentUpdate: function(nextProps, nextState) {
			return !isEqual(nextProps, this.props);
		},
	
		renderGroup: function(item, key) {
			return React.DOM.span({
				key: item.label || key,
				className:'ql-formats' },
				item.items.map(this.renderItem)
			);
		},
	
		renderChoiceItem: function(item, key) {
			return React.DOM.option({
				key: item.label || item.value || key,
				value: item.value },
				item.label
			);
		},
	
		renderChoices: function(item, key) {
			var choiceItems = item.items.map(renderChoiceItem);
			var selectedItem = find(item.items, function(item){ return item.selected });
			var attrs = {
				key: item.label || key,
				title: item.label,
				className: 'ql-'+item.type,
				value: selectedItem.value,
			};
			return React.DOM.select(attrs, choiceItems);
		},
	
		renderButton: function(item, key) {
			return React.DOM.button({
				type: 'button',
				key: item.label || item.value || key,
				value: item.value,
				className: 'ql-'+item.type,
				title: item.label },
				item.children
			);
		},
	
		renderAction: function(item, key) {
			return React.DOM.button({
				key: item.label || item.value || key,
				className: 'ql-'+item.type,
				title: item.label },
				item.children
			);
		},
	
		renderItem: function(item, key) {
			switch (item.type) {
				case 'group':
					return this.renderGroup(item, key);
				case 'font':
				case 'header':
				case 'align':
				case 'size':
				case 'color':
				case 'background':
					return this.renderChoices(item, key);
				case 'bold':
				case 'italic':
				case 'underline':
				case 'strike':
				case 'link':
				case 'list':
				case 'bullet':
				case 'ordered':
				case 'indent':
				case 'image':
				case 'video':
					return this.renderButton(item, key);
				default:
					return this.renderAction(item, key);
			}
		},
	
		getClassName: function() {
			return 'quill-toolbar ' + (this.props.className||'');
		},
	
		render: function() {
			var children = this.props.items.map(this.renderItem);
			var html = children.map(ReactDOMServer.renderToStaticMarkup).join('');
			return React.DOM.div({
				id: this.props.id,
				className: this.getClassName(),
				style: this.props.style,
				dangerouslySetInnerHTML: { __html:html }
			});
		},
	
	});
	
	module.exports = QuillToolbar;
	QuillToolbar.defaultItems = defaultItems;
	QuillToolbar.defaultColors = defaultColors;


/***/ },
/* 138 */
/*!********************************************************************************************************************************!*\
  !*** external {"commonjs":"react-dom/server","commonjs2":"react-dom/server","amd":"react-dom/server","root":"ReactDOMServer"} ***!
  \********************************************************************************************************************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_138__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-quill.js.map