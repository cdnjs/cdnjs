/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/infinitegrid project is licensed under the MIT license
 * 
 * @egjs/infinitegrid JavaScript library
 * https://github.com/naver/egjs-infinitegrid
 * 
 * @version 3.1.0
 * 
 * All-in-one packaged file for ease use of '@egjs/infinitegrid' with below dependencies.
 * NOTE: This is not an official distribution file and is only for user convenience.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["InfiniteGrid"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["InfiniteGrid"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.STYLE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.toArray = toArray;
exports.matchHTML = matchHTML;
exports.$ = $;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.scroll = scroll;
exports.scrollTo = scrollTo;
exports.scrollBy = scrollBy;
exports.getStyles = getStyles;
exports.innerWidth = innerWidth;
exports.innerHeight = innerHeight;
exports.getStyleNames = getStyleNames;
exports.assignOptions = assignOptions;
exports.toZeroArray = toZeroArray;
exports.isWindow = isWindow;
exports.fill = fill;

var _browser = __webpack_require__(2);

var _consts = __webpack_require__(1);

function toArray(nodes) {
	// SCRIPT5014 in IE8
	var array = [];

	if (nodes) {
		for (var i = 0, len = nodes.length; i < len; i++) {
			array.push(nodes[i]);
		}
	}
	return array;
}
function matchHTML(html) {
	return html.match(/^<([A-z]+)\s*([^>]*)>/);
}
/**
 * Select or create element
 * @param {String|HTMLElement|jQuery} param
 *  when string given is as HTML tag, then create element
 *  otherwise it returns selected elements
 * @param {Boolean} multi
 * @returns {HTMLElement}
 */
function $(param) {
	var multi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	var el = void 0;

	if (typeof param === "string") {
		// String (HTML, Selector)
		// check if string is HTML tag format
		var match = matchHTML(param);

		// creating element
		if (match) {
			// HTML
			var dummy = _browser.document.createElement("div");

			dummy.innerHTML = param;
			el = dummy.childNodes;
		} else {
			// Selector
			el = _browser.document.querySelectorAll(param);
		}
		if (multi) {
			el = toArray(el);
		} else {
			el = el && el.length > 0 && el[0] || undefined;
		}
	} else if (param === _browser.window) {
		// window
		el = param;
	} else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
		// HTMLElement, Document
		el = param;
	} else if ("jQuery" in _browser.window && param instanceof _browser.window.jQuery || param.constructor.prototype.jquery) {
		// jQuery
		el = multi ? param.toArray() : param.get(0);
	} else if (Array.isArray(param)) {
		el = param.map(function (v) {
			return $(v);
		});
		if (!multi) {
			el = el.length >= 1 ? el[0] : undefined;
		}
	}
	return el;
}
function addEvent(element, type, handler, eventListenerOptions) {
	if (_consts.SUPPORT_ADDEVENTLISTENER) {
		var options = eventListenerOptions || false;

		if ((typeof eventListenerOptions === "undefined" ? "undefined" : _typeof(eventListenerOptions)) === "object") {
			options = _consts.SUPPORT_PASSIVE ? eventListenerOptions : false;
		}
		element.addEventListener(type, handler, options);
	} else if (element.attachEvent) {
		element.attachEvent("on" + type, handler);
	} else {
		element["on" + type] = handler;
	}
}
function removeEvent(element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else if (element.detachEvent) {
		element.detachEvent("on" + type, handler);
	} else {
		element["on" + type] = null;
	}
}
function scroll(el, isVertical) {
	var prop = "scroll" + (isVertical ? "Top" : "Left");

	if (el === _browser.window) {
		return _browser.window[isVertical ? "pageYOffset" : "pageXOffset"] || _browser.document.body[prop] || _browser.document.documentElement[prop];
	} else {
		return el[prop];
	}
}
function scrollTo(el, x, y) {
	if (el === _browser.window) {
		el.scroll(x, y);
	} else {
		el.scrollLeft = x;
		el.scrollTop = y;
	}
}
function scrollBy(el, x, y) {
	if (el === _browser.window) {
		el.scrollBy(x, y);
	} else {
		el.scrollLeft += x;
		el.scrollTop += y;
	}
}
function getStyles(el) {
	return _consts.SUPPORT_COMPUTEDSTYLE ? _browser.window.getComputedStyle(el) : el.currentStyle;
}
function _getSize(el, name) {
	if (el === _browser.window) {
		// WINDOW
		return el.document.documentElement["client" + name];
	} else if (el.nodeType === 9) {
		// DOCUMENT_NODE
		var doc = el.documentElement;

		return Math.max(el.body["scroll" + name], doc["scroll" + name], el.body["offset" + name], doc["offset" + name], doc["client" + name]);
	} else {
		// NODE
		var style = getStyles(el);
		var value = style[name.toLowerCase()];

		return parseFloat(/auto|%/.test(value) ? el["offset" + name] : style[name.toLowerCase()]);
	}
}
function innerWidth(el) {
	return _getSize(el, "Width");
}
function innerHeight(el) {
	return _getSize(el, "Height");
}
var STYLE = exports.STYLE = {
	vertical: {
		pos1: "top",
		endPos1: "bottom",
		size1: "height",
		pos2: "left",
		endPos2: "right",
		size2: "width"
	},
	horizontal: {
		pos1: "left",
		endPos1: "right",
		size1: "width",
		pos2: "top",
		endPos2: "bottom",
		size2: "height"
	}
};

function getStyleNames(isHorizontal) {
	return STYLE[isHorizontal ? _consts.HORIZONTAL : _consts.VERTICAL];
}

function assignOptions(defaultOptions, options) {
	return _extends({}, _consts.DEFAULT_OPTIONS, defaultOptions, options);
}

function toZeroArray(outline) {
	if (!outline || !outline.length) {
		return [0];
	}
	return outline;
}

function isWindow(el) {
	return el === _browser.window;
}

function fill(arr, value) {
	var length = arr.length;

	for (var i = length - 1; i >= 0; --i) {
		arr[i] = value;
	}

	return arr;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.DEFENSE_BROWSER = exports.WEBKIT_VERSION = exports.IMAGE_PROCESSING = exports.PROCESSING = exports.LOADING_PREPEND = exports.LOADING_APPEND = exports.IDLE = exports.ALIGN = exports.isMobile = exports.agent = exports.DEFAULT_OPTIONS = exports.GROUPKEY_ATT = exports.DUMMY_POSITION = exports.SINGLE = exports.MULTI = exports.NO_TRUSTED = exports.TRUSTED = exports.NO_CACHE = exports.CACHE = exports.HORIZONTAL = exports.VERTICAL = exports.PREPEND = exports.APPEND = exports.IGNORE_CLASSNAME = exports.CONTAINER_CLASSNAME = exports.RETRY = exports.IS_ANDROID2 = exports.IS_IOS = exports.IS_IE = exports.SUPPORT_PASSIVE = exports.SUPPORT_ADDEVENTLISTENER = exports.SUPPORT_COMPUTEDSTYLE = undefined;

var _browser = __webpack_require__(2);

var ua = _browser.window.navigator.userAgent;

var SUPPORT_COMPUTEDSTYLE = exports.SUPPORT_COMPUTEDSTYLE = !!("getComputedStyle" in _browser.window);
var SUPPORT_ADDEVENTLISTENER = exports.SUPPORT_ADDEVENTLISTENER = !!("addEventListener" in document);
var SUPPORT_PASSIVE = exports.SUPPORT_PASSIVE = function () {
	var supportsPassiveOption = false;

	try {
		if (SUPPORT_ADDEVENTLISTENER && Object.defineProperty) {
			document.addEventListener("test", null, Object.defineProperty({}, "passive", {
				get: function get() {
					supportsPassiveOption = true;
				}
			}));
		}
	} catch (e) {}
	return supportsPassiveOption;
}();

var IS_IE = exports.IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
var IS_IOS = exports.IS_IOS = /iPhone|iPad/.test(ua);
var IS_ANDROID2 = exports.IS_ANDROID2 = /Android 2\./.test(ua);
var RETRY = exports.RETRY = 3;
var CONTAINER_CLASSNAME = exports.CONTAINER_CLASSNAME = "_eg-infinitegrid-container_";
var IGNORE_CLASSNAME = exports.IGNORE_CLASSNAME = "_eg-infinitegrid-ignore_";

var APPEND = exports.APPEND = true;
var PREPEND = exports.PREPEND = false;
var VERTICAL = exports.VERTICAL = "vertical";
var HORIZONTAL = exports.HORIZONTAL = "horizontal";
var CACHE = exports.CACHE = true;
var NO_CACHE = exports.NO_CACHE = false;
var TRUSTED = exports.TRUSTED = true;
var NO_TRUSTED = exports.NO_TRUSTED = false;
var MULTI = exports.MULTI = true;
var SINGLE = exports.SINGLE = false;
var DUMMY_POSITION = exports.DUMMY_POSITION = -100000;
var GROUPKEY_ATT = exports.GROUPKEY_ATT = "data-groupkey";

var DEFAULT_OPTIONS = exports.DEFAULT_OPTIONS = {
	horizontal: false,
	margin: 0
};

var agent = exports.agent = ua.toLowerCase();
var isMobile = exports.isMobile = /mobi|ios|android/.test(agent);

var ALIGN = exports.ALIGN = {
	START: "start",
	CENTER: "center",
	END: "end",
	JUSTIFY: "justify"
};

var IDLE = exports.IDLE = 0;
var LOADING_APPEND = exports.LOADING_APPEND = 1;
var LOADING_PREPEND = exports.LOADING_PREPEND = 2;
var PROCESSING = exports.PROCESSING = 4;
var IMAGE_PROCESSING = exports.IMAGE_PROCESSING = 8;

var webkit = /applewebkit\/([\d|.]*)/g.exec(agent);

var WEBKIT_VERSION = exports.WEBKIT_VERSION = webkit && parseInt(webkit[1], 10) || 0;
var DEFENSE_BROWSER = exports.DEFENSE_BROWSER = WEBKIT_VERSION && WEBKIT_VERSION < 537;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/* eslint-disable no-new-func, no-nested-ternary */
var win = window;
/* eslint-enable no-new-func, no-nested-ternary */

exports.window = window;
var document = exports.document = win.document;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _browser = __webpack_require__(2);

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var elements = [];
/* eslint-disable */
function onResize(e) {
	AutoSizer.resizeAll();
}
/* eslint-enable */

var AutoSizer = function () {
	function AutoSizer() {
		_classCallCheck(this, AutoSizer);
	}

	AutoSizer.add = function add(element) {
		var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "data-";

		if (!element.length) {
			(0, _utils.addEvent)(_browser.window, "resize", onResize);
		}
		element.__PREFIX__ = prefix;
		elements.push(element);
		AutoSizer.resize(element);
	};

	AutoSizer.remove = function remove(element) {
		var isFixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		var fixed = element.getAttribute(element.__PREFIX__ + "fixed") || "width";

		if (!isFixed) {
			element.style[fixed === "width" ? "height" : "width"] = "";
		}
		var index = elements.indexOf(element);

		if (!~index) {
			return;
		}
		elements.splice(index, 1);
		if (!elements.length) {
			(0, _utils.removeEvent)(_browser.window, "reisze", onResize);
		}
	};

	AutoSizer.resize = function resize(element) {
		var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "data-";

		var elementPrefix = typeof element.__PREFIX__ === "string" ? element.__PREFIX__ : prefix;
		var dataWidth = element.getAttribute(elementPrefix + "width");
		var dataHeight = element.getAttribute(elementPrefix + "height");
		var fixed = element.getAttribute(elementPrefix + "fixed") || "width";

		if (fixed === "width") {
			var size = (0, _utils.innerWidth)(element) || dataWidth;

			element.style.height = dataHeight / dataWidth * size + "px";
		} else if (fixed === "height") {
			var _size = (0, _utils.innerHeight)(element) || dataHeight;

			element.style.width = dataWidth / dataHeight * _size + "px";
		}
	};

	AutoSizer.resizeAll = function resizeAll() {
		elements.forEach(function (element) {
			return AutoSizer.resize(element);
		});
	};

	return AutoSizer;
}();

exports["default"] = AutoSizer;
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _consts = __webpack_require__(1);

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defense(element) {
	var container = document.createElement("div");

	container.className = _consts.CONTAINER_CLASSNAME;
	container.style.position = "relative";
	container.style.height = "100%";

	var children = element.children;
	var length = children.length; // for IE8

	for (var i = 0; i < length; i++) {
		container.appendChild(children[0]);
	}

	element.appendChild(container);
	return container;
}

var DOMRenderer = function () {
	DOMRenderer.renderItem = function renderItem(item, styles) {
		if (item.el) {
			var elStyle = item.el.style;

			// for debugging
			item.el.setAttribute(_consts.GROUPKEY_ATT, item.groupKey);
			elStyle.position = "absolute";
			["left", "top", "width", "height"].forEach(function (p) {
				p in styles && (elStyle[p] = styles[p] + "px");
			});
		}
	};

	DOMRenderer.renderItems = function renderItems(items) {
		items.forEach(function (item) {
			DOMRenderer.renderItem(item, item.rect);
		});
	};

	DOMRenderer.removeItems = function removeItems(items) {
		items.forEach(function (item) {
			if (item.el) {
				DOMRenderer.removeElement(item.el);
				item.el = null;
			}
		});
	};

	DOMRenderer.removeElement = function removeElement(element) {
		element.parentNode.removeChild(element);
	};

	DOMRenderer.createElements = function createElements(items) {
		var elements = (0, _utils.$)(items.reduce(function (acc, v, i) {
			acc.push(v.content.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, ""));
			return acc;
		}, []).join(""), _consts.MULTI);

		return items.map(function (item, index) {
			item.el = elements[index];
			return item;
		});
	};

	function DOMRenderer(element, options) {
		_classCallCheck(this, DOMRenderer);

		_extends(this.options = {
			isOverflowScroll: false,
			isEqualSize: false,
			isVertical: true
		}, options);
		this._size = {
			containerOffset: 0,
			container: -1,
			view: -1,
			item: null
		};
		this._init(element);
		this.resize();
	}

	DOMRenderer.prototype.getStatus = function getStatus() {
		return {
			cssText: this.container.style.cssText,
			options: _extends({}, this.options),
			_size: _extends({}, this._size)
		};
	};

	DOMRenderer.prototype.setStatus = function setStatus(status, items) {
		this.container.style.cssText = status.cssText;
		_extends(this.options, status.options);
		_extends(this._size, status._size);

		DOMRenderer.renderItems(items);
		this._insert(items, _consts.APPEND);
	};

	DOMRenderer.prototype.updateSize = function updateSize(items) {
		var _this = this;

		return items.map(function (item) {
			if (item.el) {
				if (_this.options.isEqualSize) {
					_this._size.item = _this._size.item || {
						width: (0, _utils.innerWidth)(item.el),
						height: (0, _utils.innerHeight)(item.el)
					};
					item.size = _extends({}, _this._size.item);
				} else {
					item.size = {
						width: (0, _utils.innerWidth)(item.el),
						height: (0, _utils.innerHeight)(item.el)
					};
				}
				if (!item.orgSize) {
					item.orgSize = _extends({}, item.size);
				}
			}
			return item;
		});
	};

	DOMRenderer.prototype._init = function _init(el) {
		var element = (0, _utils.$)(el);
		var style = (0, _utils.getStyles)(element);

		this._orgStyle = {};

		if (style.position === "static") {
			this._orgStyle.position = element.style.position;
			element.style.position = "relative";
		}
		if (this.options.isOverflowScroll) {
			var target = this.options.isVertical ? ["Y", "X"] : ["X", "Y"];

			this._orgStyle.overflowX = element.style.overflowX;
			this._orgStyle.overflowY = element.style.overflowY;
			element.style["overflow" + target[0]] = "scroll";
			element.style["overflow" + target[1]] = "hidden";
			this.view = element;
			// defense code for android < 4.4 or webkit < 537
			this.container = !this.options.isVertical && _consts.DEFENSE_BROWSER ? _defense(element) : element;
		} else {
			this.view = window;
			this.container = element;
		}
	};

	DOMRenderer.prototype.append = function append(items) {
		this._insert(items, _consts.APPEND, {
			top: _consts.DUMMY_POSITION,
			left: _consts.DUMMY_POSITION
		});
	};

	DOMRenderer.prototype.prepend = function prepend(items) {
		this._insert(items, _consts.PREPEND, {
			top: _consts.DUMMY_POSITION,
			left: _consts.DUMMY_POSITION
		});
	};

	DOMRenderer.prototype.clear = function clear() {
		this.container.innerHTML = "";
		if (!this.options.isOverflowScroll) {
			this.container.style[this.options.isVertical ? "height" : "width"] = "";
		}
		this._size = {
			item: null,
			containerOffset: 0,
			viewport: -1,
			container: -1,
			view: -1
		};
	};

	DOMRenderer.prototype.createAndInsert = function createAndInsert(items, isAppend) {
		var itemsWithElement = DOMRenderer.createElements(items);

		DOMRenderer.renderItems(itemsWithElement);
		this._insert(itemsWithElement, isAppend);
	};

	DOMRenderer.prototype._insert = function _insert(items, isAppend, styles) {
		var df = document.createDocumentFragment();

		items.forEach(function (item) {
			styles && DOMRenderer.renderItem(item, styles);
			isAppend ? df.appendChild(item.el) : df.insertBefore(item.el, df.firstChild);
		});
		isAppend ? this.container.appendChild(df) : this.container.insertBefore(df, this.container.firstChild);
	};

	DOMRenderer.prototype._calcSize = function _calcSize() {
		return this.options.isVertical ? (0, _utils.innerWidth)(this.container) : (0, _utils.innerHeight)(this.container);
	};

	DOMRenderer.prototype.getViewSize = function getViewSize() {
		return this._size.view;
	};

	DOMRenderer.prototype.scrollBy = function scrollBy(point) {
		var pos = this.options.isVertical ? [0, point] : [point, 0];

		_utils.scrollBy.apply(undefined, [this.view].concat(pos));
	};

	DOMRenderer.prototype.getContainerOffset = function getContainerOffset() {
		return this._size.containerOffset;
	};

	DOMRenderer.prototype.getViewportSize = function getViewportSize() {
		this.resize();
		return this._size.viewport;
	};

	DOMRenderer.prototype.setContainerSize = function setContainerSize(size) {
		if (!this.options.isOverflowScroll || !this.options.isVertical && _consts.DEFENSE_BROWSER) {
			this.container.style[this.options.isVertical ? "height" : "width"] = size + "px";
		}
	};

	DOMRenderer.prototype.resize = function resize() {
		var isVertical = this.options.isVertical;

		if (this.isNeededResize()) {
			this._size = {
				containerOffset: this.options.isOverflowScroll ? 0 : this.container["offset" + (isVertical ? "Top" : "Left")],
				viewport: this._calcSize(),
				view: isVertical ? (0, _utils.innerHeight)(this.view) : (0, _utils.innerWidth)(this.view),
				item: null
			};
			return true;
		} else {
			this._size.view = isVertical ? (0, _utils.innerHeight)(this.view) : (0, _utils.innerWidth)(this.view);
		}
		return false;
	};

	DOMRenderer.prototype.isNeededResize = function isNeededResize() {
		return this._calcSize() !== this._size.viewport;
	};

	DOMRenderer.prototype.destroy = function destroy() {
		this._size = {
			containerOffset: 0,
			viewport: -1,
			view: -1,
			item: null
		};
		this.container.style[this.options.isVertical ? "height" : "width"] = "";
		for (var p in this._orgStyle) {
			this[this.options.isOverflowScroll ? "view" : "container"].style[p] = this._orgStyle[p];
		}
	};

	return DOMRenderer;
}();

exports["default"] = DOMRenderer;
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.CHECK_ONLY_ERROR = exports.CHECK_ALL = undefined;

var _consts = __webpack_require__(1);

var _utils = __webpack_require__(0);

var _AutoSizer = __webpack_require__(3);

var _AutoSizer2 = _interopRequireDefault(_AutoSizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CHECK_ALL = exports.CHECK_ALL = 1;
var CHECK_ONLY_ERROR = exports.CHECK_ONLY_ERROR = 2;

var errorImages = [];

function isDataAttribute(target, prefix) {
	return !!target.getAttribute(prefix + "width");
}

var ImageLoaded = function () {
	function ImageLoaded() {
		_classCallCheck(this, ImageLoaded);
	}

	ImageLoaded.waitImageLoaded = function waitImageLoaded(needCheck, _ref) {
		var prefix = _ref.prefix,
		    length = _ref.length,
		    type = _ref.type,
		    complete = _ref.complete,
		    error = _ref.error,
		    end = _ref.end;

		var checkCount = 0;
		var endCount = length || needCheck.reduce(function (sum, element) {
			return sum + element.length;
		}, 0);

		if (type !== CHECK_ONLY_ERROR) {
			checkCount = endCount;
		}
		var checkEnd = function checkEnd() {
			if (--endCount !== 0) {
				return;
			}
			end && end();
		};
		var checkImage = function checkImage() {
			checkCount--;
			if (checkCount !== 0) {
				return;
			}
			complete && complete();
		};
		var onError = function onError(target) {
			error && error({
				target: target,
				itemIndex: target.__ITEM_INDEX__
			});
		};
		var onCheck = function onCheck(e) {
			var target = e.target || e.srcElement;

			(0, _utils.removeEvent)(target, "error", onCheck);
			(0, _utils.removeEvent)(target, "load", onCheck);

			if (type === CHECK_ALL && isDataAttribute(target, prefix)) {
				_AutoSizer2["default"].remove(target, e.type === "error");
			} else {
				checkImage();
			}
			if (e.type === "error") {
				errorImages.push(target.src);
				onError(target);
			}
			delete target.__ITEM_INDEX__;
			checkEnd();
		};

		needCheck.forEach(function (images, i) {
			images.forEach(function (v) {
				// workaround for IE
				if (v.complete) {
					if (errorImages.indexOf(v.src) !== -1) {
						onError(v);
					}
					checkImage();
					checkEnd();
					return;
				}
				v.__ITEM_INDEX__ = i;
				if (type === CHECK_ALL && isDataAttribute(v, prefix)) {
					_AutoSizer2["default"].add(v, prefix);
					checkImage();
				}
				(0, _utils.addEvent)(v, "load", onCheck);
				(0, _utils.addEvent)(v, "error", onCheck);

				_consts.IS_IE && v.setAttribute("src", v.getAttribute("src"));
			});
		});
	};

	ImageLoaded.checkImageLoaded = function checkImageLoaded(el) {
		if (el.tagName === "IMG") {
			return !el.complete ? [el] : [];
		} else {
			return (0, _utils.toArray)(el.querySelectorAll("img"));
		}
	};

	ImageLoaded.check = function check(elements, _ref2) {
		var _this = this;

		var prefix = _ref2.prefix,
		    _ref2$type = _ref2.type,
		    type = _ref2$type === undefined ? CHECK_ALL : _ref2$type,
		    complete = _ref2.complete,
		    error = _ref2.error,
		    end = _ref2.end;

		var images = elements.map(function (element) {
			return _this.checkImageLoaded(element);
		});
		var length = images.reduce(function (sum, element) {
			return sum + element.length;
		}, 0);

		if (type === CHECK_ONLY_ERROR || length === 0) {
			// convert to async
			setTimeout(function () {
				complete && complete();
				if (length === 0) {
					end && end();
				}
			}, 0);
		}
		if (length > 0) {
			this.waitImageLoaded(images, { prefix: prefix, length: length, type: type, complete: complete, error: error, end: end });
		}
	};

	return ImageLoaded;
}();

exports["default"] = ImageLoaded;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _consts = __webpack_require__(1);

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
Frame
[
[1, 1, 1, 1, 1],
[0, 0, 2, 2, 2],
[0, 0, 2, 2, 2],
[3, 4, 5, 5, 5],
]
*/
function disableFrame(frame, type, x, y, width, height) {
	for (var i = y; i < y + height; ++i) {
		for (var j = x; j < x + width; ++j) {
			if (type !== frame[i][j]) {
				continue;
			}
			frame[i][j] = 0;
		}
	}
}
function searchShapeInFrame(frame, type, top, left, width, height) {
	var size = {
		left: left,
		top: top,
		type: type,
		width: 1,
		height: 1
	};

	for (var i = left; i < width; ++i) {
		if (frame[top][i] === type) {
			size.width = i - left + 1;
			continue;
		}
		break;
	}
	for (var _i = top; _i < height; ++_i) {
		if (frame[_i][left] === type) {
			size.height = _i - top + 1;
			continue;
		}
		break;
	}
	// After finding the shape, it will not find again.
	disableFrame(frame, type, left, top, size.width, size.height);
	return size;
}
function getShapes(frame) {
	var height = frame.length;
	var width = height ? frame[0].length : 0;
	var shapes = [];

	for (var i = 0; i < height; ++i) {
		for (var j = 0; j < width; ++j) {
			var type = frame[i][j];

			if (!type) {
				continue;
			}
			// Separate shapes with other numbers.
			shapes.push(searchShapeInFrame(frame, type, i, j, width, height));
		}
	}
	shapes.sort(function (a, b) {
		return a.type < b.type ? -1 : 1;
	});
	return {
		shapes: shapes,
		width: width,
		height: height
	};
}
/**
 * @classdesc FrameLayout is a layout that allows you to place cards in a given frame. It is a layout that corresponds to a level intermediate between the placement of the image directly by the designer and the layout using the algorithm.
 * @ko FrameLayout은 주어진 프레임에 맞춰 카드를 배치하는 레이아웃입니다. 디자이너가 직접 이미지를 배치하는 것과 알고리즘을 사용한 배치의 중간 정도 수준에 해당하는 레이아웃이다.
 * @class eg.InfiniteGrid.FrameLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.FrameLayout module <ko>eg.InfiniteGrid.FrameLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Boolean} [options.itemSize=0] The size of the items. If it is 0, it is calculated as the size of the first item in items. <ko> 아이템의 사이즈. 만약 아이템 사이즈가 0이면, 아이템들의 첫번째 아이템의 사이즈로 계산이 된다. </ko>
 * @param {Boolean} [options.frame=[]] The size of the items. If it is 0, it is calculated as the size of the first item in items. <ko> 아이템의 사이즈. 만약 아이템 사이즈가 0이면, 아이템들의 첫번째 아이템의 사이즈로 계산이 된다. </ko>
 * @param {Boolean} [options.frameFill=true] Make sure that the frame can be attached after the previous frame. <ko> 다음 프레임이 전 프레임에 이어 붙일 수 있는지 있는지 확인한다. </ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid". {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.FrameLayout, {
	margin: 10,
	itemSize: 200,
	frame: [
		[1, 1, 1, 1, 1],
		[0, 0, 2, 2, 2],
		[0, 0, 2, 2, 2],
		[3, 4, 5, 5, 5],
	],
});

// or

var layout = new eg.InfiniteGrid.FrameLayout({
	margin: 10,
	itemSize: 200,
	horizontal: true,
	frame: [
		[1, 1, 1, 1, 1],
		[0, 0, 2, 2, 2],
		[0, 0, 2, 2, 2],
		[3, 4, 5, 5, 5],
	],
});

</script>
```
 **/

var FrameLayout = function () {
	function FrameLayout() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, FrameLayout);

		this.options = (0, _utils.assignOptions)({
			itemSize: 0,
			frame: [],
			frameFill: true
		}, options);
		var frame = this.options.frame.map(function (row) {
			return row.slice();
		});
		// divide frame into shapes.
		var shapes = getShapes(frame);

		this._itemSize = this.options.itemSize || 0;
		this._shapes = shapes;
		this._size = 0;
		this._style = (0, _utils.getStyleNames)(this.options.horizontal);
	}

	FrameLayout.prototype._getItemSize = function _getItemSize() {
		this._checkItemSize();

		return this._itemSize;
	};

	FrameLayout.prototype._checkItemSize = function _checkItemSize() {
		if (this.options.itemSize) {
			this._itemSize = this.options.itemSize;
			return;
		}
		var style = this._style;
		var size = style.size2;
		var margin = this.options.margin;

		// if itemSize is not in options, caculate itemSize from size.
		this._itemSize = (this._size + margin) / this._shapes[size] - margin;
	};

	FrameLayout.prototype._layout = function _layout(items) {
		var outline = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		var isAppend = arguments[2];

		var length = items.length;
		var style = this._style;
		var _options = this.options,
		    margin = _options.margin,
		    frameFill = _options.frameFill;

		var size1Name = style.size1;
		var size2Name = style.size2;
		var pos1Name = style.pos1;
		var pos2Name = style.pos2;
		var itemSize = this._getItemSize();
		var isItemObject = (typeof itemSize === "undefined" ? "undefined" : _typeof(itemSize)) === "object";
		var itemSize2 = isItemObject ? itemSize[size2Name] : itemSize;
		var itemSize1 = isItemObject ? itemSize[size1Name] : itemSize;
		var shapesSize = this._shapes[size2Name];
		var shapes = this._shapes.shapes;
		var shapesLength = shapes.length;
		var startOutline = (0, _utils.fill)(new Array(shapesSize), _consts.DUMMY_POSITION);
		var endOutline = (0, _utils.fill)(new Array(shapesSize), _consts.DUMMY_POSITION);
		var dist = 0;
		var end = 0;
		var startIndex = -1;
		var endIndex = -1;
		var minPos = -1;
		var maxPos = -1;

		if (!shapesLength) {
			return { start: outline, end: outline, startIndex: startIndex, endIndex: endIndex };
		}
		for (var i = 0; i < length; i += shapesLength) {
			for (var j = 0; j < shapesLength && i + j < length; ++j) {
				var _item$rect;

				var item = items[i + j];
				var shape = shapes[j];
				var shapePos1 = shape[pos1Name];
				var shapePos2 = shape[pos2Name];
				var shapeSize1 = shape[size1Name];
				var shapeSize2 = shape[size2Name];
				var pos1 = end - dist + shapePos1 * (itemSize1 + margin);
				var pos2 = shapePos2 * (itemSize2 + margin);
				var size1 = shapeSize1 * (itemSize1 + margin) - margin;
				var size2 = shapeSize2 * (itemSize2 + margin) - margin;

				for (var k = shapePos2; k < shapePos2 + shapeSize2 && k < shapesSize; ++k) {
					if (startOutline[k] === _consts.DUMMY_POSITION) {
						startOutline[k] = pos1;
					}
					if (startIndex === -1) {
						minPos = pos1;
						startIndex = i + j;
						maxPos = pos1 + size1 + margin;
						endIndex = i + j;
					}
					if (minPos > pos1) {
						minPos = pos1;
						startIndex = i + j;
					}
					if (maxPos < pos1 + size1 + margin) {
						maxPos = pos1 + size1 + margin;
						endIndex = i + j;
					}
					startOutline[k] = Math.min(startOutline[k], pos1);
					endOutline[k] = Math.max(endOutline[k], pos1 + size1 + margin);
				}
				item.rect = (_item$rect = {}, _item$rect[pos1Name] = pos1, _item$rect[pos2Name] = pos2, _item$rect[size1Name] = size1, _item$rect[size2Name] = size2, _item$rect);
			}
			end = Math.max.apply(Math, endOutline);
			// check dist once
			if (i !== 0) {
				continue;
			}
			// find & fill empty block
			if (!frameFill) {
				dist = 0;
				continue;
			}
			dist = end;

			for (var _j = 0; _j < shapesSize; ++_j) {
				if (startOutline[_j] === _consts.DUMMY_POSITION) {
					continue;
				}
				// the dist between frame's end outline and next frame's start outline
				// expect that next frame's start outline is startOutline[j] + end
				dist = Math.min(startOutline[_j] + end - endOutline[_j], dist);
			}
		}
		for (var _i2 = 0; _i2 < shapesSize; ++_i2) {
			if (startOutline[_i2] !== _consts.DUMMY_POSITION) {
				continue;
			}
			startOutline[_i2] = Math.max.apply(Math, startOutline);
			endOutline[_i2] = startOutline[_i2];
		}
		// The target outline is start outline when type is APPENDING
		var targetOutline = isAppend ? startOutline : endOutline;
		var prevOutlineEnd = outline.length === 0 ? 0 : Math[isAppend ? "max" : "min"].apply(Math, outline);
		var prevOutlineDist = isAppend ? 0 : end;

		if (frameFill && outline.length === shapesSize) {
			prevOutlineDist = -_consts.DUMMY_POSITION;
			for (var _i3 = 0; _i3 < shapesSize; ++_i3) {
				if (startOutline[_i3] === endOutline[_i3]) {
					continue;
				}
				// if appending type is PREPEND, subtract dist from appending group's height.

				prevOutlineDist = Math.min(targetOutline[_i3] + prevOutlineEnd - outline[_i3], prevOutlineDist);
			}
		}
		for (var _i4 = 0; _i4 < shapesSize; ++_i4) {
			startOutline[_i4] += prevOutlineEnd - prevOutlineDist;
			endOutline[_i4] += prevOutlineEnd - prevOutlineDist;
		}
		items.forEach(function (item) {
			item.rect[pos1Name] += prevOutlineEnd - prevOutlineDist;
		});
		return {
			start: startOutline,
			end: endOutline,
			startIndex: startIndex,
			endIndex: endIndex
		};
	};

	FrameLayout.prototype._insert = function _insert(items, outline, type) {
		// this only needs the size of the item.
		var clone = items.map(function (item) {
			return _extends({}, item);
		});

		return {
			items: clone,
			outlines: this._layout(clone, outline, type)
		};
	};
	/**
  * Adds items of groups at the bottom of a outline.
  * @ko 그룹들의 아이템들을 아웃라인 아래에 추가한다.
  * @method eg.InfiniteGrid.FrameLayout#layout
  * @param {Array} groups Array of groups to be layouted <ko>레이아웃할 그룹들의 배열</ko>
  * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
  * @return {eg.InfiniteGrid.FrameLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * layout.layout(groups, [100, 200, 300, 400]);
  */


	FrameLayout.prototype.layout = function layout(groups, outlines) {
		var length = groups.length;
		var point = outlines;

		for (var i = 0; i < length; ++i) {
			var group = groups[i];

			point = this._layout(group.items, point, _consts.APPEND);
			group.outlines = point;
			point = point.end;
		}
		return this;
	};
	/**
  * Set the viewport size of the layout.
  * @ko 레이아웃의 가시 사이즈를 설정한다.
  * @method eg.InfiniteGrid.FrameLayout#setSize
  * @param {Number} size The viewport size of container area where items are added to a layout <ko>레이아웃에 아이템을 추가하는 컨테이너 영역의 가시 사이즈</ko>
  * @return {eg.InfiniteGrid.FrameLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * layout.setSize(800);
  */


	FrameLayout.prototype.setSize = function setSize(size) {
		this._size = size;
		return this;
	};
	/**
  * Adds items at the bottom of a outline.
  * @ko 아이템들을 아웃라인 아래에 추가한다.
  * @method eg.InfiniteGrid.FrameLayout#append
  * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
  * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
  * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
  * @example
  * layout.prepend(items, [100]);
  */


	FrameLayout.prototype.append = function append(items, outline) {
		return this._insert(items, outline, _consts.APPEND);
	};
	/**
  * Adds items at the top of a outline.
  * @ko 아이템을 아웃라인 위에 추가한다.
  * @method eg.InfiniteGrid.FrameLayout#prepend
  * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
  * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
  * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
  * @example
  * layout.prepend(items, [100]);
  */


	FrameLayout.prototype.prepend = function prepend(items, outline) {
		return this._insert(items, outline, _consts.PREPEND);
	};

	return FrameLayout;
}();

exports["default"] = FrameLayout;
module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _InfiniteGrid = __webpack_require__(8);

var _InfiniteGrid2 = _interopRequireDefault(_InfiniteGrid);

var _GridLayout = __webpack_require__(12);

var _GridLayout2 = _interopRequireDefault(_GridLayout);

var _FrameLayout = __webpack_require__(6);

var _FrameLayout2 = _interopRequireDefault(_FrameLayout);

var _SquareLayout = __webpack_require__(13);

var _SquareLayout2 = _interopRequireDefault(_SquareLayout);

var _PackingLayout = __webpack_require__(14);

var _PackingLayout2 = _interopRequireDefault(_PackingLayout);

var _JustifiedLayout = __webpack_require__(16);

var _JustifiedLayout2 = _interopRequireDefault(_JustifiedLayout);

var _ImageLoaded = __webpack_require__(5);

var _ImageLoaded2 = _interopRequireDefault(_ImageLoaded);

var _AutoSizer = __webpack_require__(3);

var _AutoSizer2 = _interopRequireDefault(_AutoSizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Copyright (c) NAVER Corp.
 * egjs-infinitegrid projects are licensed under the MIT license
 */
_InfiniteGrid2["default"].GridLayout = _GridLayout2["default"];
_InfiniteGrid2["default"].FrameLayout = _FrameLayout2["default"];
_InfiniteGrid2["default"].SquareLayout = _SquareLayout2["default"];
_InfiniteGrid2["default"].PackingLayout = _PackingLayout2["default"];
_InfiniteGrid2["default"].JustifiedLayout = _JustifiedLayout2["default"];
_InfiniteGrid2["default"].ImageLoaded = _ImageLoaded2["default"];
_InfiniteGrid2["default"].AutoSizer = _AutoSizer2["default"];

module.exports = _InfiniteGrid2["default"];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Copyright (c) 2017 NAVER Corp.
                                                                                                                                                                                                                                                                               * egjs projects are licensed under the MIT license
                                                                                                                                                                                                                                                                              */


var _component = __webpack_require__(9);

var _component2 = _interopRequireDefault(_component);

var _ItemManager = __webpack_require__(10);

var _ItemManager2 = _interopRequireDefault(_ItemManager);

var _DOMRenderer = __webpack_require__(4);

var _DOMRenderer2 = _interopRequireDefault(_DOMRenderer);

var _ImageLoaded = __webpack_require__(5);

var _ImageLoaded2 = _interopRequireDefault(_ImageLoaded);

var _Watcher = __webpack_require__(11);

var _Watcher2 = _interopRequireDefault(_Watcher);

var _AutoSizer = __webpack_require__(3);

var _AutoSizer2 = _interopRequireDefault(_AutoSizer);

var _consts = __webpack_require__(1);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// IE8
// https://stackoverflow.com/questions/43216659/babel-ie8-inherit-issue-with-object-create
/* eslint-disable */
if (typeof Object.create !== "function") {
	Object.create = function (o, properties) {
		if ((typeof o === "undefined" ? "undefined" : _typeof(o)) !== "object" && typeof o !== "function") {
			throw new TypeError("Object prototype may only be an Object: " + o);
		} else if (o === null) {
			throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
		}
		function F() {}
		F.prototype = o;
		return new F();
	};
}
/* eslint-enable */

function hasTarget() {
	for (var _len = arguments.length, targets = Array(_len), _key = 0; _key < _len; _key++) {
		targets[_key] = arguments[_key];
	}

	return targets.every(function (target) {
		return ~target[0].indexOf(target[1]);
	});
}

/**
 * A module used to arrange card elements including content infinitely according to layout type. With this module, you can implement various layouts composed of different card elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
 * @ko 콘텐츠가 있는 카드 엘리먼트를 레이아웃 타입에 따라 무한으로 배치하는 모듈. 다양한 크기의 카드 엘리먼트를 다양한 레이아웃으로 배치할 수 있다. 카드 엘리먼트의 개수가 계속 늘어나도 모듈이 처리하는 DOM의 개수를 일정하게 유지해 최적의 성능을 보장한다
 * @alias eg.InfiniteGrid
 * @extends eg.Component
 *
 * @example
```
<ul id="grid">
	<li class="card">
		<div>test1</div>
	</li>
	<li class="card">
		<div>test2</div>
	</li>
	<li class="card">
		<div>test3</div>
	</li>
	<li class="card">
		<div>test4</div>
	</li>
	<li class="card">
		<div>test5</div>
	</li>
	<li class="card">
		<div>test6</div>
	</li>
</ul>
<script>
var some = new eg.InfiniteGrid("#grid").on("layoutComplete", function(e) {
	// ...
});
</script>
```
 *
 * @support {"ie": "8+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
 **/

var InfiniteGrid = function (_Component) {
	_inherits(InfiniteGrid, _Component);

	/**
  * @param {HTMLElement|String|jQuery} element A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
  * @param {Object} [options] The option object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
  * @param {String} [options.itemSelector] A selector to select card elements that make up the layout<ko>레이아웃을 구성하는 카드 엘리먼트를 선택할 선택자(selector)</ko>
  * @param {Boolean} [options.useRecycle=true] Indicates whether keep the number of DOMs is maintained. If the useRecycle value is 'true', keep the number of DOMs is maintained. If the useRecycle value is 'false', the number of DOMs will increase as card elements are added. <ko>DOM의 수를 유지할지 여부를 나타낸다. useRecycle 값이 'true'이면 DOM 개수를 일정하게 유지한다. useRecycle 값이 'false' 이면 카드 엘리먼트가 추가될수록 DOM 개수가 계속 증가한다.</ko>
  * @param {Boolean} [options.isOverflowScroll=false] Indicates whether overflow:scroll is applied<ko>overflow:scroll 적용여부를 결정한다.</ko>
  * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (true: horizontal, false: vertical) <ko>스크롤 이동 방향 (true 가로방향, false 세로방향)</ko>
  * @param {Boolean} [options.isEqualSize=false] Indicates whether sizes of all card elements are equal to one another. If sizes of card elements to be arranged are all equal and this option is set to "true", the performance of layout arrangement can be improved. <ko>카드 엘리먼트의 크기가 동일한지 여부. 배치될 카드 엘리먼트의 크기가 모두 동일할 때 이 옵션을 'true'로 설정하면 레이아웃 배치 성능을 높일 수 있다</ko>
  * @param {Number} [options.threshold=100] The threshold size of an event area where card elements are added to a layout.<ko>레이아웃에 카드 엘리먼트를 추가하는 이벤트가 발생하는 기준 영역의 크기.</ko>
  * @param {String} [options.attributePrefix="data-"] The prefix to use element's data attribute.<ko>엘리먼트의 데이타 속성에 사용할 접두사.</ko>
  */
	function InfiniteGrid(element, options) {
		_classCallCheck(this, InfiniteGrid);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_extends(_this.options = {
			itemSelector: "*",
			isOverflowScroll: false,
			threshold: 100,
			isEqualSize: false,
			useRecycle: true,
			horizontal: false,
			attributePrefix: "data-"
		}, options);
		_consts.IS_ANDROID2 && (_this.options.isOverflowScroll = false);
		_this._isVertical = !_this.options.horizontal;
		_this._reset();
		_this._items = new _ItemManager2["default"]();
		_this._renderer = new _DOMRenderer2["default"](element, {
			isOverflowScroll: _this.options.isOverflowScroll,
			isEqualSize: _this.options.isEqualSize,
			isVertical: _this._isVertical
		});
		_this._loadingBar = {};
		_this._watcher = new _Watcher2["default"](_this._renderer, {
			layout: function layout() {
				return _this.layout();
			},
			check: function check(param) {
				return _this._onCheck(param);
			}
		});
		return _this;
	}
	/**
  * Adds a card element at the bottom of a layout. This method is available only if the isProcessing() method returns false.
  * @ko 카드 엘리먼트를 레이아웃 아래에 추가한다. isProcessing() 메서드의 반환값이 'false'일 때만 이 메서드를 사용할 수 있다
  * 이 메소드는 isProcessing()의 반환값이 false일 경우에만 사용 가능하다.
  * @param {Array|jQuery} elements Array of the card elements to be added <ko>추가할 카드 엘리먼트의 배열</ko>
  * @param {Number|String} [groupKey] The group key to be configured in a card element. It is automatically generated by default.
  * <ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
  * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * infinitegrid.append("&lt;div class='item'&gt;test1&lt;/div&gt;&lt;div class='item'&gt;test2&lt;/div&gt;");
  * infinitegrid.append(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]);
  * infinitegrid.append([HTMLElement1, HTMLElement2]);
  * infinitegrid.append(jQuery(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]));
  */


	InfiniteGrid.prototype.append = function append(elements, groupKey) {
		this._layout && this._insert(elements, _consts.APPEND, groupKey);
		return this;
	};
	/**
  * Adds a card element at the top of a layout. This method is available only if the isProcessing() method returns false.
  * @ko 카드 엘리먼트를 레이아웃의 위에 추가한다. isProcessing() 메서드의 반환값이 'false'일 때만 이 메서드를 사용할 수 있다
  * @param {Array|jQuery} elements Array of the card elements to be added <ko>추가할 카드 엘리먼트 배열</ko>
  * @param {Number|String} [groupKey] The group key to be configured in a card element. It is automatically generated by default.
  * <ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
  * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * infinitegrid.prepend("&lt;div class='item'&gt;test1&lt;/div&gt;&lt;div class='item'&gt;test2&lt;/div&gt;");
  * infinitegrid.prepend(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]);
  * infinitegrid.prepend([HTMLElement1, HTMLElement2]);
  * infinitegrid.prepend(jQuery(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]));
  */


	InfiniteGrid.prototype.prepend = function prepend(elements, groupKey) {
		this._layout && this._insert(elements, _consts.PREPEND, groupKey);
		return this;
	};
	/**
  * Specifies the Layout class to use.
  * @ko 사용할 Layout 클래스를 지정한다.
  * @param {Class} LayoutKlass The Layout class to use <ko>사용할 Layout 클래스</ko>
  * @param {Object} options Options to apply to the Layout.<ko>Layout에 적용할 옵션</ko>
  * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * infinitegrid.setLayout(eg.InfiniteGrid.GridLayout, {
  *  margin: 10,
  *  align: "start"
  * });
   * infinitegrid.setLayout(eg.InfiniteGrid.JustifiedLayout, {
  *  margin: 10,
  *  minSize: 100,
  *  maxSize: 200
  * });
   * infinitegrid.setLayout(eg.InfiniteGrid.SquareLayout, {
  *  margin: 10,
  *  column: 2
  * });
  * infinitegrid.setLayout(eg.InfiniteGrid.FrameLayout, {
  *  margin: 10,
  *  frame: [
  *   [1, 2],
   *   [4, 3],
  *  ]
  * });
  * infinitegrid.setLayout(eg.InfiniteGrid.PackingLayout, {
  *  margin: 10,
  *  aspectRatio: 1.5
  * });
  */


	InfiniteGrid.prototype.setLayout = function setLayout(LayoutKlass, options) {
		this._layout = new LayoutKlass(_extends(options || {}, {
			horizontal: !this._isVertical
		}));
		this._layout.setSize(this._renderer.getViewportSize());
		return this;
	};
	/**
  * Returns the layouted items.
  * @ko 레이아웃된 아이템들을 반환한다.
  * @param {Boolean} includeCached Indicates whether to include the cached items. <ko>캐싱된 아이템을 포함할지 여부를 나타낸다.</ko>
  * @returns {Array} List of items <ko>아이템의 목록</ko>
  */


	InfiniteGrid.prototype.getItems = function getItems() {
		var includeCached = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

		return this[includeCached ? "_getItems" : "_getVisibleItems"]();
	};

	InfiniteGrid.prototype._getItems = function _getItems() {
		return this._items.pluck("items", 0, this._items.size());
	};

	InfiniteGrid.prototype._getVisibleItems = function _getVisibleItems() {
		return this._items.pluck("items", this._status.startCursor, this._status.endCursor);
	};

	InfiniteGrid.prototype._updateEdge = function _updateEdge() {
		this._status.start = this._items.getEdge("start", this._status.startCursor, this._status.endCursor);
		this._status.end = this._items.getEdge("end", this._status.startCursor, this._status.endCursor);
	};

	InfiniteGrid.prototype._getEdgeOffset = function _getEdgeOffset(cursor) {
		var rect = null;

		if (!this._status[cursor]) {
			var item = this._items.getEdge(cursor);

			this._status[cursor] = item;
		}

		if (this._status[cursor]) {
			rect = this._status[cursor].rect;
			if (cursor === "start") {
				rect.bottom = rect.top + this._status[cursor].size.height;
				rect.right = rect.left + this._status[cursor].size.width;
			}
		}
		return rect;
	};
	// called by visible


	InfiniteGrid.prototype._fit = function _fit() {
		var scrollCycle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "after";

		// for caching
		if (!this._layout) {
			return 0;
		}
		var base = this._getEdgeValue("start");
		var margin = this._getLoadingStatus() === _consts.LOADING_PREPEND && this._status.loadingSize || 0;

		if (!this.options.useRecycle || _consts.DEFENSE_BROWSER) {
			if (scrollCycle === "before" && margin && base < margin) {
				this._renderer.scrollBy(-Math.abs(base) + margin);
				this._watcher.setScrollPos();
				this._items.fit(base - margin, this._isVertical);
				_DOMRenderer2["default"].renderItems(this._getVisibleItems());
				this._renderer.setContainerSize(this._getEdgeValue("end") || margin);
			} else if (scrollCycle === "after" && base < 0) {
				this._items.fit(base - margin, this._isVertical);
				this._renderer.setContainerSize(this._getEdgeValue("end") || margin);
				_DOMRenderer2["default"].renderItems(this._getVisibleItems());
				this._renderer.scrollBy(Math.abs(base));
				this._watcher.setScrollPos();
			}
			return 0;
		}

		if (base !== 0 || margin) {
			var isProcessing = this._isProcessing();

			this._process(_consts.PROCESSING);
			if (scrollCycle === "before") {
				this._renderer.scrollBy(-Math.abs(base) + margin);
				this._watcher.setScrollPos();
			}
			this._items.fit(base - margin, this._isVertical);
			_DOMRenderer2["default"].renderItems(this._getVisibleItems());
			this._renderer.setContainerSize(this._getEdgeValue("end") || margin);
			if (scrollCycle === "after") {
				this._renderer.scrollBy(Math.abs(base) + margin);
				this._watcher.setScrollPos();
			}
			if (!isProcessing) {
				this._process(_consts.PROCESSING, false);
			}
		}
		return base;
	};

	InfiniteGrid.prototype._getEdgeValue = function _getEdgeValue(cursor) {
		return this._items.getEdgeValue(cursor, this._status.startCursor, this._status.endCursor);
	};
	/**
  * Rearranges a layout.
  * @ko 레이아웃을 다시 배치한다.
  * @param {Boolean} [isRelayout=true] Indicates whether a card element is being relayouted <ko>카드 엘리먼트 재배치 여부</ko>
  * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	InfiniteGrid.prototype.layout = function layout() {
		var _this2 = this;

		var isRelayout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

		if (!this._layout) {
			return this;
		}
		// check childElement
		if (!this._items.size()) {
			this._insert((0, _utils.toArray)(this._renderer.container.children), true);
			return this;
		}
		var data = void 0;
		var outline = void 0;

		if (isRelayout) {
			// remove cache
			if (this.options.isEqualSize) {
				this._renderer.updateSize([this._status.start]);
				data = this._items.get(0, this._status.endCursor);
				outline = this._items.getOutline(0, "start");
			} else {
				data = this._items.get(this._status.startCursor, this._status.endCursor);
			}
			if (this._renderer.resize()) {
				this._layout.setSize(this._renderer.getViewportSize());
				data.forEach(function (v) {
					data.items = _this2._renderer.updateSize(v.items);
				});
			}
		} else {
			data = this._items.get(this._status.startCursor, this._items.size());
			outline = this._items.getOutline(this._status.startCursor, "start");
		}
		if (!data.length) {
			return this;
		}
		this._layout.layout(data, outline);

		if (isRelayout) {
			if (!this.options.isEqualSize) {
				this._items._data.forEach(function (group, cursor) {
					if (_this2._status.startCursor <= cursor && cursor <= _this2._status.endCursor) {
						return;
					}
					group.outlines.start = [];
					group.outlines.end = [];
				});
			} else {
				this._fit("after");
			}
		} else {
			data.forEach(function (v) {
				return _this2._items.set(v, v.groupKey);
			});
		}
		this._onLayoutComplete(data, _consts.APPEND, _consts.NO_TRUSTED, false, true);
		_DOMRenderer2["default"].renderItems(this._getVisibleItems());
		isRelayout && this._watcher.setScrollPos();

		return this;
	};
	/**
  * Removes a item element on a grid layout.
  * @ko 그리드 레이아웃의 카드 엘리먼트를 삭제한다.
  * @param {HTMLElement} item element to be removed <ko>삭제될 아이템 엘리먼트</ko>
  * @return {Object}  Removed item element <ko>삭제된 아이템 엘리먼트 정보</ko>
  */


	InfiniteGrid.prototype.remove = function remove(element) {
		if (element) {
			var items = this._items.remove(element, this._status.startCursor, this._status.endCursor);

			if (items) {
				_DOMRenderer2["default"].removeElement(element);
				return items;
			}
		}
		return null;
	};

	InfiniteGrid.prototype._getNextItems = function _getNextItems(isAppend) {
		var items = [];
		var size = this._items.size();

		// from cache
		if (size > 0 && this._status.startCursor !== -1 && this._status.endCursor !== -1) {
			if (isAppend && size > this._status.endCursor + 1) {
				items = this._items.pluck("items", this._status.endCursor + 1);
			} else if (!isAppend && this._status.startCursor > 0) {
				items = this._items.pluck("items", this._status.startCursor - 1);
			}
		}
		return items;
	};
	/**
  * Returns the list of group keys which belongs to card elements currently being maintained. You can use the append() or prepend() method to configure group keys so that multiple card elements can be managed at once. If you do not use these methods to configure group keys, groupkey is automatically generated.
  * @ko 현재 유지하고 있는 카드 엘리먼트의 그룹 키 목록을 반환한다. 여러 개의 카드 엘리먼트를 묶어서 관리할 수 있도록 append() 메서드나 prepend() 메서드에서 그룹 키를 지정할 수 있다. append() 메서드나 prepend() 메서드에서 그룹 키를 지정하지 않았다면 자동으로 그룹키가 생성된다.
  * @param {Boolean} includeCached Indicates whether to include the cached groups. <ko>캐싱된 그룹을 포함할지 여부를 나타낸다.</ko>
  * @return {Array} List of group keys <ko>그룹 키의 목록</ko>
  */


	InfiniteGrid.prototype.getGroupKeys = function getGroupKeys(includeCached) {
		var data = includeCached ? this._items.get() : this._items.get(this._status.startCursor, this._status.endCursor);

		return data.map(function (v) {
			return v.groupKey;
		});
	};
	/**
  * Returns the current state of a module such as location information. You can use the setStatus() method to restore the information returned through a call to this method.
  * @ko 카드의 위치 정보 등 모듈의 현재 상태 정보를 반환한다. 이 메서드가 반환한 정보를 저장해 두었다가 setStatus() 메서드로 복원할 수 있다
  * @return {Object} State object of the eg.InfiniteGrid module<ko>eg.InfiniteGrid 모듈의 상태 객체</ko>
  */


	InfiniteGrid.prototype.getStatus = function getStatus() {
		return {
			options: _extends({}, this.options),
			_status: _extends({}, this._status),
			_items: this._items.getStatus(),
			_renderer: this._renderer.getStatus(),
			_watcher: this._watcher.getStatus()
		};
	};
	/**
  * Sets the state of the eg.InfiniteGrid module with the information returned through a call to the getStatue() method.
  * @ko getStatue() 메서드가 저장한 정보로 eg.InfiniteGrid 모듈의 상태를 설정한다.
  * @param {Object} status State object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 상태 객체</ko>
  * @param {boolean} [applyScrollPos=true] Checks whether to scroll<ko>스크롤의 위치를 복원할지 결정한다.</ko>
  * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	InfiniteGrid.prototype.setStatus = function setStatus(status) {
		var applyScrollPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		if (!status || !status.options || !status._status || !status._renderer || !status._items || !status._watcher) {
			return this;
		}
		this._watcher.detachEvent();
		_extends(this.options, status.options);
		_extends(this._status, status._status);
		this._items.setStatus(status._items, this._status.startCursor, this._status.endCursor);
		this._renderer.setStatus(status._renderer, this._getVisibleItems());
		this._watcher.setStatus(status._watcher, applyScrollPos);
		this._updateEdge();
		this._watcher.attachEvent();
		return this;
	};
	/**
  * Clears added card elements and data.
  * @ko 추가된 카드 엘리먼트와 데이터를 모두 지운다.
  * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	InfiniteGrid.prototype.clear = function clear() {
		this._items.clear();
		this._renderer.clear();
		this._reset();
		this._appendLoadingBar();
		return this;
	};
	/**
  * Specifies the Loading Bar to use for append or prepend items.
  * @ko 아이템을 append 또는 prepend 하기 위해 사용할 로딩 바를 지정한다.
  * @param {String|Object} [userLoadingBar={}] The loading bar HTML markup or element or element selector <ko> 로딩 바 HTML 또는 element 또는 selector </ko>
  * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	InfiniteGrid.prototype.setLoadingBar = function setLoadingBar() {
		var userLoadingBar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		var loadingBarObj = (typeof userLoadingBar === "undefined" ? "undefined" : _typeof(userLoadingBar)) === "object" ? userLoadingBar : {
			"append": userLoadingBar,
			"prepend": userLoadingBar
		};

		this._status.loadingSize = 0;
		this._status.loadingStyle = {};
		var loadingBar = this._loadingBar;

		for (var type in loadingBarObj) {
			loadingBar[type] = (0, _utils.$)(loadingBarObj[type]);
			loadingBar[type].className += " " + _consts.IGNORE_CLASSNAME;
		}
		this._appendLoadingBar();
		return this;
	};

	InfiniteGrid.prototype._appendLoadingBar = function _appendLoadingBar() {
		var loadingBar = this._loadingBar;
		var container = this._renderer.container;

		for (var type in loadingBar) {
			container.appendChild(loadingBar[type]);
		}
	};
	/**
  * Checks whether a card element or data is being added.
  * @ko 카드 엘리먼트 추가 또는 데이터 로딩이 진행 중인지 확인한다
  * @return {Boolean} Indicates whether a card element or data is being added <ko>카드 엘리먼트 추가 또는 데이터 로딩 진행 중 여부</ko>
  */


	InfiniteGrid.prototype.isProcessing = function isProcessing() {
		return this._isProcessing() || this._isLoading();
	};

	InfiniteGrid.prototype._isProcessing = function _isProcessing() {
		return (this._status.processingStatus & _consts.PROCESSING) > 0;
	};

	InfiniteGrid.prototype._isLoading = function _isLoading() {
		return this._getLoadingStatus() > 0;
	};

	InfiniteGrid.prototype._isImageProcessing = function _isImageProcessing() {
		return (this._status.processingStatus & _consts.IMAGE_PROCESSING) > 0;
	};

	InfiniteGrid.prototype._getLoadingStatus = function _getLoadingStatus() {
		return this._status.processingStatus & (_consts.LOADING_APPEND | _consts.LOADING_PREPEND);
	};

	InfiniteGrid.prototype._process = function _process(status) {
		var isAdd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		if (isAdd) {
			this._status.processingStatus |= status;
		} else {
			this._status.processingStatus -= this._status.processingStatus & status;
		}
	};

	InfiniteGrid.prototype._insert = function _insert(elements, isAppend, groupKey) {
		if (this._isProcessing() || elements.length === 0) {
			return;
		}
		var key = typeof groupKey === "undefined" ? new Date().getTime() + Math.floor(Math.random() * 1000) : groupKey;
		var items = _ItemManager2["default"].from((0, _utils.$)(elements, true), this.options.itemSelector, {
			isAppend: isAppend,
			groupKey: key
		});

		if (!items.length) {
			return;
		}
		this._postLayout(_consts.NO_CACHE, items, isAppend, _consts.NO_TRUSTED);
	};
	// add items, and remove items for recycling


	InfiniteGrid.prototype._recycle = function _recycle(isAppend) {
		var remove = [];

		if (this._status.startCursor !== this._status.endCursor) {
			for (var i = this._status.startCursor; i <= this._status.endCursor; i++) {
				remove.push(this._isVisible(i));
			}
		}
		var start = remove.indexOf(isAppend ? 1 : -1);
		var end = remove.lastIndexOf(isAppend ? 1 : -1);
		var visible = remove.indexOf(0);

		if (visible === -1 || start === -1 || end === -1) {
			return;
		}

		start = this._status.startCursor + (isAppend ? 0 : start);
		end = isAppend ? this._status.startCursor + end : this._status.endCursor;
		_DOMRenderer2["default"].removeItems(this._items.pluck("items", start, end));
		if (isAppend) {
			this._status.startCursor = end + 1;
		} else {
			this._status.endCursor = start - 1;
		}
	};
	/**
  * Returns the element of loading bar.
  * @ko 로딩 바의 element를 반환한다.
  * @param {Boolean} [isAppend=currentLoadingBar|true] Checks whether the card element is added to the append () method. <ko>카드 엘리먼트가 append() 메서드로 추가 할 것인지 확인한다.</ko>
  * @return {Element} The element of loading bar. <ko>로딩 바의 element</ko>
  */


	InfiniteGrid.prototype.getLoadingBar = function getLoadingBar() {
		var isAppend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._getLoadingStatus() !== _consts.LOADING_PREPEND;

		return this._loadingBar[isAppend ? "append" : "prepend"];
	};
	/**
  * Start loading for append/prepend during loading data.
  * @ko 데이터가 로딩되는 동안 append/prepend하길 위해 로딩을 시작한다.
  * @param {Boolean} [isAppend=true] Checks whether the card element is added to the append () method. <ko>카드 엘리먼트가 append() 메서드로 추가 할 것인지 확인한다.</ko>
  * @param {Object} [userStyle = {display: "block"}] custom style to apply to this loading bar for start. <ko> 로딩 시작을 위한 로딩 바에 적용할 커스텀 스타일 </ko>
  * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	InfiniteGrid.prototype.startLoading = function startLoading(isAppend) {
		var userStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { display: "block" };

		if (this._isLoading()) {
			return this;
		}
		var type = isAppend ? "append" : "prepend";

		this._process(isAppend ? _consts.LOADING_APPEND : _consts.LOADING_PREPEND);
		if (!this._loadingBar[type]) {
			return this;
		}
		this._renderLoading(userStyle);
		this._status.loadingStyle = userStyle;
		if (!isAppend) {
			this._fit("before");
		} else {
			this._renderer.setContainerSize(this._getEdgeValue("end") + this._status.loadingSize);
		}
		return this;
	};

	InfiniteGrid.prototype._renderLoading = function _renderLoading() {
		var _extends2;

		var userStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._status.loadingStyle;

		if (!this._isLoading()) {
			return;
		}
		var isAppend = this._getLoadingStatus() === _consts.LOADING_APPEND;
		var el = this._loadingBar[isAppend ? "append" : "prepend"];

		if (!el) {
			return;
		}
		this._status.loadingSize = this._isVertical ? (0, _utils.innerHeight)(el) : (0, _utils.innerWidth)(el);
		var pos = isAppend ? this._getEdgeValue("end") : this._getEdgeValue("start") - this._status.loadingSize;
		var style = _extends((_extends2 = {
			position: "absolute"
		}, _extends2[this._isVertical ? "top" : "left"] = pos + "px", _extends2), userStyle);

		for (var property in style) {
			el.style[property] = style[property];
		}
	};
	/**
  * End loading after startLoading() for append/prepend
  * @ko  append/prepend하길 위해 startLoading() 호출해선 걸었던 로딩을 끝낸다.
  * @param {Object} [userStyle = {display: "none"}] custom style to apply to this loading bar for end <ko> 로딩 시작을 위한 로딩 바에 적용할 커스텀 스타일 </ko>
  * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	InfiniteGrid.prototype.endLoading = function endLoading() {
		var _extends3;

		var userStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { display: "none" };

		if (!this._isLoading()) {
			return this;
		}
		var isAppend = this._getLoadingStatus() === _consts.LOADING_APPEND;
		var type = isAppend ? "append" : "prepend";
		var el = this._loadingBar[type];
		var size = this._status.loadingSize;

		this._process(_consts.LOADING_APPEND | _consts.LOADING_PREPEND, false);
		this._status.loadingSize = 0;
		this._status.loadingStyle = {};
		if (!el) {
			return this;
		}
		var style = _extends((_extends3 = {}, _extends3[this._isVertical ? "top" : "left"] = -size + "px", _extends3), userStyle);

		for (var property in style) {
			el.style[property] = style[property];
		}
		if (!isAppend && this.options.useRecycle && !_consts.DEFENSE_BROWSER) {
			this._renderer.scrollBy(-size);
			this._watcher.setScrollPos();
			this._items.fit(size, this._isVertical);
			_DOMRenderer2["default"].renderItems(this._getVisibleItems());
			this._renderer.setContainerSize(this._getEdgeValue("end"));
		}
		this._renderer.setContainerSize(this._getEdgeValue("end"));
		return this;
	};

	InfiniteGrid.prototype._postImageLoaded = function _postImageLoaded(fromCache, layouted, isAppend, isTrusted) {
		if (fromCache) {
			this._setItems(layouted);
		} else {
			this._insertItems(layouted, isAppend);
		}
		this._updateCursor(isAppend);
		_DOMRenderer2["default"].renderItems(layouted.items);
		this._onLayoutComplete(layouted.items, isAppend, isTrusted);
	};

	InfiniteGrid.prototype._onImageError = function _onImageError(target, item, itemIndex, removeTarget, replaceTarget) {
		var element = item.el;
		var prefix = this.options.attributePrefix;

		item.content = element.outerHTML;

		var removeItem = function removeItem() {
			if (hasTarget([removeTarget, element])) {
				return;
			}
			removeTarget.push(element);
			var index = replaceTarget.indexOf(itemIndex);

			if (index !== -1) {
				replaceTarget.splice(index, 1);
			}
		};

		/**
   * This event is fired when an error occurs in the image.
   * @ko 이미지 로드에 에러가 날 때 발생하는 이벤트.
   * @event eg.InfiniteGrid#imageError
   * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
   * @param {Element} param.target Appending card's image element.<ko>추가 되는 카드의 이미지 엘리먼트</ko>
   * @param {Element} param.elememt The item's element with error images.<ko>에러난 이미지를 가지고 있는 아이템의 엘리먼트</ko>
   * @param {Object} param.item The item with error images.<ko>에러난 이미지를 가지고 있는 아이템</ko>
   * @param {Number} param.itemIndex The item's index with error images.<ko>에러난 이미지를 가지고 있는 아이템의 인덱스</ko>
   * @param {Function} param.remove In the imageError event, this method expects to remove the error image.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지를 삭제한다.</ko>
   * @param {Function} param.removeItem In the imageError event, this method expects to remove the item with the error image.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지를 가지고 있는 아이템을 삭제한다.</ko>
   * @param {Function} param.replace In the imageError event, this method expects to replace the error image's source or element.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지의 주소 또는 엘리먼트를 교체한다.</ko>
   * @param {Function} param.replaceItem In the imageError event, this method expects to replace the item's contents with the error image.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지를 가지고 있는 아이템의 내용을 교체한다.</ko>
   * @example
  ig.on("imageError", e => {
  e.remove();
  e.removeItem();
  e.replace("http://...jpg");
  e.replace(imageElement);
  e.replaceItem("item html");
  });
   */
		this.trigger("imageError", {
			target: target,
			element: element,
			item: item,
			itemIndex: itemIndex,
			// remove item
			removeItem: removeItem,
			// remove image
			remove: function remove() {
				if (target === element) {
					removeItem();
					return;
				}
				if (hasTarget([removeTarget, element])) {
					return;
				}
				target.parentNode.removeChild(target);
				item.content = element.outerHTML;
				if (hasTarget([replaceTarget, itemIndex])) {
					return;
				}
				replaceTarget.push(itemIndex);
			},
			// replace image
			replace: function replace(src) {
				if (hasTarget([removeTarget, element])) {
					return;
				}
				if (src) {
					if ((0, _utils.matchHTML)(src) || (typeof src === "undefined" ? "undefined" : _typeof(src)) === "object") {
						var parentNode = target.parentNode;

						parentNode.insertBefore((0, _utils.$)(src), target);
						parentNode.removeChild(target);
						item.content = element.outerHTML;
					} else {
						target.src = src;
						if (target.getAttribute(prefix + "width")) {
							_AutoSizer2["default"].remove(target);
							target.removeAttribute(prefix + "width");
							target.removeAttribute(prefix + "height");
						}
					}
				}
				item.content = element.outerHTML;
				if (hasTarget([replaceTarget, itemIndex])) {
					return;
				}
				replaceTarget.push(itemIndex);
			},
			// replace item
			replaceItem: function replaceItem(content) {
				if (hasTarget([removeTarget, element], [replaceTarget, itemIndex])) {
					return;
				}
				element.innerHTML = content;
				item.content = element.outerHTML;
				replaceTarget.push(itemIndex);
			}
		});
	};

	InfiniteGrid.prototype._postImageLoadedEnd = function _postImageLoadedEnd(layouted, isAppend, removeTarget, replaceTarget) {
		var _this3 = this;

		if (!removeTarget.length && !replaceTarget.length) {
			if (!this.isProcessing() && this.options.useRecycle) {
				this._recycle(isAppend);
			}
			return;
		}
		var prefix = this.options.attributePrefix;
		var layoutedItems = replaceTarget.map(function (itemIndex) {
			return layouted.items[itemIndex];
		});

		removeTarget.forEach(function (element) {
			_this3.remove(element);
		});
		if (this.options.isEqualSize) {
			if (removeTarget.length > 0) {
				this.layout(false);
			} else if (!this.isProcessing() && this.options.useRecycle) {
				this._recycle(isAppend);
			}
			return;
		}
		// wait layoutComplete beacause of error event.
		_ImageLoaded2["default"].check(layoutedItems.map(function (v) {
			return v.el;
		}), {
			prefix: prefix,
			complete: function complete() {
				_this3._renderer.updateSize(layoutedItems);
				_this3.layout(false);
			}
		});
	};

	InfiniteGrid.prototype._postLayout = function _postLayout(fromCache, items, isAppend, isTrusted) {
		var _this4 = this;

		var outline = this._items.getOutline(isAppend ? this._status.endCursor : this._status.startCursor, isAppend ? "end" : "start");

		var fromRelayout = false;

		if (fromCache) {
			var cacheOutline = this._items.getOutline(isAppend ? this._status.endCursor + 1 : this._status.startCursor - 1, isAppend ? "start" : "end");

			fromRelayout = outline.length === cacheOutline.length ? !outline.every(function (v, index) {
				return v === cacheOutline[index];
			}) : true;

			if (!fromRelayout) {
				this._renderer.createAndInsert(items, isAppend);
				this._updateCursor(isAppend);
				this._onLayoutComplete(items, isAppend, isTrusted);
				return this;
			}
		}
		this._process(_consts.PROCESSING);
		var method = isAppend ? "append" : "prepend";

		fromCache && _DOMRenderer2["default"].createElements(items);
		this._renderer[method](items);

		// check image sizes after elements are attated on DOM
		var type = this.options.isEqualSize && this._renderer._size.item ? _ImageLoaded.CHECK_ONLY_ERROR : _ImageLoaded.CHECK_ALL;
		var prefix = this.options.attributePrefix;
		var replaceTarget = [];
		var removeTarget = [];
		var layouted = void 0;

		this._process(_consts.IMAGE_PROCESSING);
		_ImageLoaded2["default"].check(items.map(function (item) {
			return item.el;
		}), {
			prefix: prefix,
			type: type,
			complete: function complete() {
				layouted = _this4._layout[method](_this4._renderer.updateSize(items), outline);
				_this4._postImageLoaded(fromCache, layouted, isAppend, isTrusted);
			},
			error: function error(_ref) {
				var target = _ref.target,
				    itemIndex = _ref.itemIndex;

				var item = (layouted && layouted.items || items)[itemIndex];

				_this4._onImageError(target, item, itemIndex, removeTarget, replaceTarget);
			},
			end: function end() {
				_this4._process(_consts.IMAGE_PROCESSING, false);
				_this4._postImageLoadedEnd(layouted, isAppend, removeTarget, replaceTarget);
			}
		});
		return this;
	};

	InfiniteGrid.prototype._isVisible = function _isVisible(index) {
		var min = Math.min.apply(Math, this._items.getOutline(index, "start"));
		var max = Math.max.apply(Math, this._items.getOutline(index, "end"));
		var pos = this._watcher.getScrollPos();
		var viewSize = this._renderer.getViewSize();

		if (pos + viewSize + this.options.threshold < min) {
			return -1;
		} else if (pos - this.options.threshold > max) {
			return 1;
		}
		return 0;
	};

	InfiniteGrid.prototype._updateCursor = function _updateCursor(isAppend) {
		if (this.options.useRecycle) {
			if (isAppend) {
				this._status.endCursor++;
			} else if (this._status.startCursor > 0) {
				this._status.startCursor--;
			} else {
				this._status.endCursor++; // outside prepend
			}
			if (this._status.startCursor < 0) {
				this._status.startCursor = 0;
			}
		} else {
			this._status.startCursor = 0;
			this._status.endCursor = this._items.size() - 1;
		}
	};

	InfiniteGrid.prototype._setItems = function _setItems(layouted) {
		var groupKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : layouted.items && layouted.items[0].groupKey || 0;

		layouted.groupKey = groupKey;
		this._items.set(layouted, groupKey);
	};

	InfiniteGrid.prototype._insertItems = function _insertItems(layouted, isAppend) {
		layouted.groupKey = layouted.items[0].groupKey;
		this._items[isAppend ? "append" : "prepend"](layouted);
	};
	// called by visible


	InfiniteGrid.prototype._requestAppend = function _requestAppend() {
		var items = this._getNextItems(_consts.APPEND);

		if (this._isProcessing()) {
			return;
		}
		if (items.length) {
			this._postLayout(_consts.CACHE, items, _consts.APPEND, _consts.TRUSTED);
		} else {
			/**
    * This event is fired when a card element must be added at the bottom or right of a layout because there is no card to be displayed on screen when a user scrolls near bottom or right.
    * @ko 카드 엘리먼트가 레이아웃의 아래나 오른쪽에 추가돼야 할 때 발생하는 이벤트. 사용자가 아래나 오른쪽으로 스크롤해서 화면에 표시될 카드가 없을 때 발생한다
    * @event eg.InfiniteGrid#append
    * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
    * @param {String|Number} groupKey The group key of the first group visible on the screen <ko>화면에 보여지는 마지막 그룹의 그룹키</ko>
    * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
    */
			this.trigger("append", {
				isTrusted: true,
				groupKey: this.getGroupKeys().pop()
			});
		}
	};
	// called by visible


	InfiniteGrid.prototype._requestPrepend = function _requestPrepend() {
		var items = this._getNextItems(_consts.PREPEND);

		if (this._isProcessing()) {
			return;
		}
		if (items.length) {
			this._postLayout(_consts.CACHE, items, _consts.PREPEND, _consts.TRUSTED);
		} else {
			/**
    * This event is fired when a card element must be added at the top or left of a layout because there is no card to be displayed on screen when a user scrolls near top or left.
    * @ko 카드가 레이아웃의 위나 왼쪽에 추가돼야 할 때 발생하는 이벤트. 사용자가 위나 왼쪽으로 스크롤해서 화면에 표시될 카드가 없을 때 발생한다.
    * @event eg.InfiniteGrid#prepend
    * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
    * @param {String|Number} groupKey The group key of the first group visible on the screen <ko>화면에 보여지는 첫번째 그룹의 그룹키</ko>
    * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
    */
			this.trigger("prepend", {
				isTrusted: true,
				groupKey: this.getGroupKeys().shift()
			});
		}
	};

	InfiniteGrid.prototype._onCheck = function _onCheck(_ref2) {
		var isForward = _ref2.isForward,
		    scrollPos = _ref2.scrollPos,
		    horizontal = _ref2.horizontal,
		    orgScrollPos = _ref2.orgScrollPos;

		/**
   * This event is fired when the user scrolls.
   * @ko 사용자가 스크롤 할 경우 발생하는 이벤트.
   * @event eg.InfiniteGrid#change
   * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
   * @param {Boolean} param.isForward Indicates whether the scroll progression direction is forward or backword. <ko>스크롤 진행방향이 앞쪽으로 진행하는 지, 뒤쪽으로 진행하는지를 나타낸다.</ko>
   * @param {Number} param.scrollPos Current scroll position value relative to the infiniteGrid container element. <ko>infiniteGrid 컨테이너 엘리먼트 기준의 현재 스크롤 위치값</ko>
   * @param {Boolean} param.orgScrollPos Current position of the scroll <ko>현재 스크롤 위치값</ko>
   * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   * @param {Boolean} options.horizontal Direction of the scroll movement (true: horizontal, false: vertical) <ko>스크롤 이동 방향 (true 가로방향, false 세로방향</ko>
   */
		this.trigger("change", {
			isForward: isForward,
			horizontal: horizontal,
			scrollPos: scrollPos,
			orgScrollPos: orgScrollPos
		});
		var rect = this._getEdgeOffset(isForward ? "end" : "start");
		var isProcessing = this.isProcessing();

		if (!rect) {
			return;
		}
		var threshold = this.options.threshold;
		var targetPos = isForward ? rect[horizontal ? "left" : "top"] - this._renderer.getViewSize() : rect[horizontal ? "right" : "bottom"];

		if (!isProcessing && isForward) {
			if (scrollPos + threshold >= targetPos) {
				this._requestAppend();
			}
		} else if (scrollPos <= targetPos + threshold) {
			this._fit("before");
			this._requestPrepend();
		}
	};

	InfiniteGrid.prototype._onLayoutComplete = function _onLayoutComplete(items, isAppend) {
		var isTrusted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
		var useRecycle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.options.useRecycle;
		var isLayout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

		this._isLoading() && this._renderLoading();
		!isAppend && this._fit("after");
		if (!this._isImageProcessing() && useRecycle) {
			this._recycle(isAppend);
		}

		var size = this._getEdgeValue("end");

		// recycle after _fit beacause prepend and append are occured simultaneously by scroll.
		this._updateEdge();

		isAppend && this._renderer.setContainerSize(size + this._status.loadingSize || 0);
		!isLayout && this._process(_consts.PROCESSING, false);

		var scrollPos = this._watcher.getScrollPos();
		var viewSize = this._renderer.getViewSize();

		/**
   * This event is fired when layout is successfully arranged through a call to the append(), prepend(), or layout() method.
   * @ko 레이아웃 배치가 완료됐을 때 발생하는 이벤트. append() 메서드나 prepend() 메서드, layout() 메서드 호출 후 카드의 배치가 완료됐을 때 발생한다
   * @event eg.InfiniteGrid#layoutComplete
   *
   * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
   * @param {Array} param.target Rearranged card elements<ko>재배치된 카드 엘리먼트들</ko>
   * @param {Boolean} param.isAppend Checks whether the append() method is used to add a card element. It returns true even though the layoutComplete event is fired after the layout() method is called. <ko>카드 엘리먼트가 append() 메서드로 추가됐는지 확인한다. layout() 메서드가 호출된 후 layoutComplete 이벤트가 발생해도 'true'를 반환한다.</ko>
   * @param {Boolean} param.isScroll Checks whether scrolling has occurred after the append(), prepend(), ..., etc method is called
   * @param {Number} param.scrollPos Current scroll position value relative to the infiniteGrid container element. <ko>infiniteGrid 컨테이너 엘리먼트 기준의 현재 스크롤 위치값</ko>
   * @param {Number} param.orgScrollPos Current position of the scroll <ko>현재 스크롤 위치값</ko>
   * @param {Number} param.size The size of container element <ko>컨테이너 엘리먼트의 크기</ko>
   * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   */
		this.trigger("layoutComplete", {
			target: items.concat(),
			isAppend: isAppend,
			isTrusted: isTrusted,
			isScroll: viewSize < this._renderer.getContainerOffset() + size,
			scrollPos: scrollPos,
			orgScrollPos: this._watcher.getOrgScrollPos(),
			size: size
		});
		if (isLayout) {
			return;
		}
		var threshold = this.options.threshold;

		if (isAppend && Math.abs(size - viewSize - scrollPos) <= threshold) {
			this._requestAppend();
		} else if (!isAppend && scrollPos <= this._getEdgeValue("start") + threshold) {
			this._fit("before");
			this._requestPrepend();
		}
	};

	InfiniteGrid.prototype._reset = function _reset() {
		this._status = {
			processingStatus: _consts.IDLE,
			loadingSize: 0,
			startCursor: -1,
			endCursor: -1,
			start: null,
			end: null
		};
	};
	/**
  * Destroys elements, properties, and events used on a grid layout.
  * @ko 그리드 레이아웃에 사용한 엘리먼트와 속성, 이벤트를 해제한다
  */


	InfiniteGrid.prototype.destroy = function destroy() {
		this.off();
		this._watcher.destroy();
		this._reset();
		this._items.clear();
		this._renderer.destroy();
	};

	return InfiniteGrid;
}(_component2["default"]);

InfiniteGrid.VERSION = "3.1.0";

exports["default"] = InfiniteGrid;
module.exports = exports["default"];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/component project is licensed under the MIT license
 * 
 * @egjs/component JavaScript library
 * http://naver.github.io/egjs/component
 * 
 * @version 2.1.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Component"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Component"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Component = __webpack_require__(1);

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Component2["default"].VERSION = "2.1.0";
module.exports = _Component2["default"];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * A class used to manage events and options in a component
 * @ko 컴포넌트의 이벤트와 옵션을 관리할 수 있게 하는 클래스
 * @alias eg.Component
 */
var Component = function () {
	/**
  * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
  */
	function Component() {
		_classCallCheck(this, Component);

		this._eventHandler = {};
		this.options = {};
	}
	/**
  * Triggers a custom event.
  * @ko 커스텀 이벤트를 발생시킨다
  * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
  * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
  * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">Ref</a> <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">참고</a></ko>
  * @example
 class Some extends eg.Component {
  some(){
  	if(this.trigger("beforeHi")){ // When event call to stop return false.
 	this.trigger("hi");// fire hi event.
  	}
  }
 }
 const some = new Some();
 some.on("beforeHi", (e) => {
 if(condition){
 	e.stop(); // When event call to stop, `hi` event not call.
 }
 });
 some.on("hi", (e) => {
 // `currentTarget` is component instance.
 console.log(some === e.currentTarget); // true
 });
 // If you want to more know event design. You can see article.
 // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
  */


	Component.prototype.trigger = function trigger(eventName) {
		var customEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		var handlerList = this._eventHandler[eventName] || [];
		var hasHandlerList = handlerList.length > 0;

		if (!hasHandlerList) {
			return true;
		}

		// If detach method call in handler in first time then handeler list calls.
		handlerList = handlerList.concat();

		customEvent.eventType = eventName;

		var isCanceled = false;
		var arg = [customEvent];
		var i = 0;

		customEvent.stop = function () {
			isCanceled = true;
		};
		customEvent.currentTarget = this;

		for (var _len = arguments.length, restParam = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			restParam[_key - 2] = arguments[_key];
		}

		if (restParam.length >= 1) {
			arg = arg.concat(restParam);
		}

		for (i = 0; handlerList[i]; i++) {
			handlerList[i].apply(this, arg);
		}

		return !isCanceled;
	};
	/**
  * Executed event just one time.
  * @ko 이벤트가 한번만 실행된다.
  * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
  * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
  * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
  * @example
 class Some extends eg.Component {
  hi() {
    alert("hi");
  }
  thing() {
    this.once("hi", this.hi);
  }
 }
 var some = new Some();
 some.thing();
 some.trigger("hi");
 // fire alert("hi");
 some.trigger("hi");
 // Nothing happens
  */


	Component.prototype.once = function once(eventName, handlerToAttach) {
		if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
			var eventHash = eventName;
			var i = void 0;

			for (i in eventHash) {
				this.once(i, eventHash[i]);
			}
			return this;
		} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
			var self = this;

			this.on(eventName, function listener() {
				for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					arg[_key2] = arguments[_key2];
				}

				handlerToAttach.apply(self, arg);
				self.off(eventName, listener);
			});
		}

		return this;
	};

	/**
  * Checks whether an event has been attached to a component.
  * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
  * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
  * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
  * @example
 class Some extends eg.Component {
  some() {
    this.hasOn("hi");// check hi event.
  }
 }
  */


	Component.prototype.hasOn = function hasOn(eventName) {
		return !!this._eventHandler[eventName];
	};

	/**
  * Attaches an event to a component.
  * @ko 컴포넌트에 이벤트를 등록한다.
  * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
  * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
  * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
  * @example
 class Some extends eg.Component {
  hi() {
    console.log("hi");
  }
  some() {
    this.on("hi",this.hi); //attach event
  }
 }
 */


	Component.prototype.on = function on(eventName, handlerToAttach) {
		if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
			var eventHash = eventName;
			var name = void 0;

			for (name in eventHash) {
				this.on(name, eventHash[name]);
			}
			return this;
		} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
			var handlerList = this._eventHandler[eventName];

			if (typeof handlerList === "undefined") {
				this._eventHandler[eventName] = [];
				handlerList = this._eventHandler[eventName];
			}

			handlerList.push(handlerToAttach);
		}

		return this;
	};
	/**
  * Detaches an event from the component.
  * @ko 컴포넌트에 등록된 이벤트를 해제한다
  * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
  * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
  * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
  * @example
 class Some extends eg.Component {
  hi() {
    console.log("hi");
  }
  some() {
    this.off("hi",this.hi); //detach event
  }
 }
  */


	Component.prototype.off = function off(eventName, handlerToDetach) {
		// All event detach.
		if (typeof eventName === "undefined") {
			this._eventHandler = {};
			return this;
		}

		// All handler of specific event detach.
		if (typeof handlerToDetach === "undefined") {
			if (typeof eventName === "string") {
				this._eventHandler[eventName] = undefined;
				return this;
			} else {
				var eventHash = eventName;
				var name = void 0;

				for (name in eventHash) {
					this.off(name, eventHash[name]);
				}
				return this;
			}
		}

		// The handler of specific event detach.
		var handlerList = this._eventHandler[eventName];

		if (handlerList) {
			var k = void 0;
			var handlerFunction = void 0;

			for (k = 0; (handlerFunction = handlerList[k]) !== undefined; k++) {
				if (handlerFunction === handlerToDetach) {
					handlerList = handlerList.splice(k, 1);
					break;
				}
			}
		}

		return this;
	};

	return Component;
}();

exports["default"] = Component;
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=component.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _consts = __webpack_require__(1);

var _DOMRenderer = __webpack_require__(4);

var _DOMRenderer2 = _interopRequireDefault(_DOMRenderer);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ItemManager = function () {
	ItemManager.from = function from(elements, selector, _ref) {
		var groupKey = _ref.groupKey,
		    isAppend = _ref.isAppend;

		var filted = ItemManager.selectItems((0, _utils.$)(elements, _consts.MULTI), selector);

		// Item Structure
		return (0, _utils.toArray)(filted).map(function (el) {
			return {
				el: el,
				groupKey: groupKey,
				content: el.outerHTML
			};
		});
	};

	ItemManager.selectItems = function selectItems(elements) {
		var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "*";

		return elements.filter(function (v) {
			var classNames = v.className.split(" ");

			if (classNames.some(function (c) {
				return c === _consts.IGNORE_CLASSNAME;
			})) {
				return false;
			} else if (!selector || selector === "*") {
				return v;
			} else {
				return classNames.some(function (c) {
					return c === selector;
				});
			}
		});
	};

	ItemManager.pluck = function pluck(data, property) {
		return data.reduce(function (acc, v) {
			return acc.concat(v[property]);
		}, []);
	};

	function ItemManager() {
		_classCallCheck(this, ItemManager);

		this.clear();
	}

	ItemManager.prototype.getStatus = function getStatus() {
		return {
			_data: this._data.map(function (data) {
				var items = data.items.map(function (item) {
					var item2 = _extends({}, item);

					delete item2.el;
					return item2;
				});
				var data2 = _extends({}, data);

				data2.items = items;
				return data2;
			})
		};
	};

	ItemManager.prototype.setStatus = function setStatus(status, start, end) {
		var data = status._data;

		for (var i = start; i <= end; i++) {
			data[i].items = _DOMRenderer2["default"].createElements(data[i].items);
		}
		this.set(data);
	};

	ItemManager.prototype.size = function size() {
		return this._data.length;
	};

	ItemManager.prototype.fit = function fit(base, isVertical) {
		if (!this._data.length) {
			return;
		}
		var property = isVertical ? "top" : "left";

		if (base !== 0) {
			this._data = this._data.map(function (v) {
				v.items = v.items.map(function (item) {
					item.rect[property] -= base;
					return item;
				});
				v.outlines.start = v.outlines.start.map(function (start) {
					return start - base;
				});
				v.outlines.end = v.outlines.end.map(function (end) {
					return end - base;
				});
				return v;
			});
		}
	};

	ItemManager.prototype.pluck = function pluck(property, start, end) {
		if (typeof start !== "undefined") {
			if (typeof end !== "undefined") {
				return ItemManager.pluck(this._data.slice(start, end + 1), property);
			} else {
				return ItemManager.pluck(this._data.slice(start, start + 1), property);
			}
		} else {
			return ItemManager.pluck(this._data, property);
		}
	};

	ItemManager.prototype.getOutline = function getOutline(index, property) {
		if (this._data.length) {
			return this._data[index].outlines[property];
		} else {
			return [];
		}
	};

	ItemManager.prototype.getEdgeIndex = function getEdgeIndex(cursor, start, end) {
		var prop = cursor === "start" ? "min" : "max";
		var index = -1;
		var targetValue = cursor === "start" ? Infinity : -Infinity;

		for (var i = start; i <= end; i++) {
			var value = Math[prop].apply(Math, this.getOutline(i, cursor));

			if (cursor === "start" && targetValue > value || cursor === "end" && targetValue < value) {
				targetValue = value;
				index = i;
			}
		}
		return index;
	};

	ItemManager.prototype.getEdge = function getEdge(cursor, start, end) {
		var dataIdx = this.getEdgeIndex(cursor, start, end);
		var items = this.pluck("items", dataIdx);

		if (items.length) {
			var itemIdx = this.getOutline(dataIdx, cursor + "Index");

			return items.length > itemIdx ? items[itemIdx] : null;
		}
		return null;
	};

	ItemManager.prototype.getEdgeValue = function getEdgeValue(cursor, start, end) {
		var outlines = this.pluck("outlines", this.getEdgeIndex(cursor, start, end)).reduce(function (acc, v) {
			return acc.concat(v[cursor]);
		}, []);

		return outlines.length ? Math[cursor === "start" ? "min" : "max"].apply(Math, outlines) : 0;
	};

	ItemManager.prototype.append = function append(layouted) {
		this._data.push(layouted);
		return layouted.items;
	};

	ItemManager.prototype.prepend = function prepend(layouted) {
		this._data.unshift(layouted);
		return layouted.items;
	};

	ItemManager.prototype.clear = function clear() {
		this._data = [];
	};

	ItemManager.prototype.remove = function remove(element, start, end) {
		var items = null;
		var key = element.getAttribute(_consts.GROUPKEY_ATT);
		var data = this.get(start, end).filter(function (v) {
			return String(v.groupKey) === key;
		});

		if (!data.length) {
			return items;
		}
		data = data[0];

		var len = data.items.length;
		var idx = -1;

		for (var i = 0; i < len; i++) {
			if (data.items[i].el === element) {
				idx = i;
				break;
			}
		}
		if (~idx) {
			// remove item information
			data.items.splice(idx, 1);
			this.set(data, key);
			items = data.items;
		}
		return items;
	};

	ItemManager.prototype.get = function get(start, end) {
		if (typeof start !== "undefined") {
			if (typeof end !== "undefined") {
				return this._data.slice(start, end + 1);
			} else {
				return this._data.slice(start, start + 1);
			}
		} else {
			return this._data.concat();
		}
	};

	ItemManager.prototype.set = function set(data, key) {
		if (typeof key !== "undefined" && !Array.isArray(data)) {
			var len = this._data.length;
			var idx = -1;

			for (var i = 0; i < len; i++) {
				if (this._data[i].groupKey === key) {
					idx = i;
					break;
				}
			}
			~idx && (this._data[idx] = data);
		} else {
			this._data = data.concat();
		}
	};

	return ItemManager;
}();

exports["default"] = ItemManager;
module.exports = exports["default"];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _consts = __webpack_require__(1);

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Watcher = function () {
	function Watcher(renderer, callback) {
		_classCallCheck(this, Watcher);

		_extends(this._callback = {
			layout: null,
			check: null
		}, callback);
		this._timer = {
			resize: null
			// doubleCheck: null,
			// doubleCheckCount: RETRY,
		};
		this.reset();
		this._renderer = renderer;
		this._onCheck = this._onCheck.bind(this);
		this._onResize = this._onResize.bind(this);
		this.attachEvent();
		this.setScrollPos();
	}

	Watcher.prototype.getStatus = function getStatus() {
		return {
			_prevPos: this._prevPos,
			scrollPos: this.getOrgScrollPos()
		};
	};

	Watcher.prototype.setStatus = function setStatus(status) {
		var applyScrollPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		this._prevPos = status._prevPos;
		applyScrollPos && this.scrollTo(status.scrollPos);
	};

	Watcher.prototype.scrollTo = function scrollTo(pos) {
		var arrPos = this._renderer.options.isVertical ? [0, pos] : [pos, 0];

		_utils.scrollTo.apply(undefined, [this._renderer.view].concat(arrPos));
	};

	Watcher.prototype.getScrollPos = function getScrollPos() {
		return this._prevPos;
	};

	Watcher.prototype.setScrollPos = function setScrollPos(pos) {
		var rawPos = pos;

		if (typeof pos === "undefined") {
			rawPos = this.getOrgScrollPos();
		}
		this._prevPos = rawPos - this._renderer.getContainerOffset();
	};

	Watcher.prototype.attachEvent = function attachEvent() {
		(0, _utils.addEvent)(this._renderer.view, "scroll", this._onCheck);
		(0, _utils.addEvent)(window, "resize", this._onResize);
	};

	Watcher.prototype.getOrgScrollPos = function getOrgScrollPos() {
		return (0, _utils.scroll)(this._renderer.view, this._renderer.options.isVertical);
	};

	Watcher.prototype.reset = function reset() {
		this._prevPos = null;
	};

	Watcher.prototype._onCheck = function _onCheck() {
		var prevPos = this.getScrollPos();
		var orgScrollPos = this.getOrgScrollPos();

		this.setScrollPos(orgScrollPos);
		var scrollPos = this.getScrollPos();

		if (prevPos === null || _consts.IS_IOS && orgScrollPos === 0 || prevPos === scrollPos) {
			return;
		}

		this._callback.check && this._callback.check({
			isForward: prevPos < scrollPos,
			scrollPos: scrollPos,
			orgScrollPos: orgScrollPos,
			horizontal: !this._renderer.options.isVertical
		});
	};

	Watcher.prototype._onResize = function _onResize() {
		var _this = this;

		if (this._timer.resize) {
			clearTimeout(this._timer.resize);
		}
		this._timer.resize = setTimeout(function () {
			_this._renderer.isNeededResize() && _this._callback.layout && _this._callback.layout();
			_this._timer.resize = null;
			_this.reset();
		}, 100);
	};

	Watcher.prototype.detachEvent = function detachEvent() {
		(0, _utils.removeEvent)(window, "resize", this._onResize);
	};

	Watcher.prototype.destroy = function destroy() {
		this.detachEvent();
		this.reset();
	};

	return Watcher;
}();

exports["default"] = Watcher;
module.exports = exports["default"];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _consts = __webpack_require__(1);

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ALIGN
var START = _consts.ALIGN.START,
    CENTER = _consts.ALIGN.CENTER,
    END = _consts.ALIGN.END,
    JUSTIFY = _consts.ALIGN.JUSTIFY;

/**
 * @classdesc The GridLayout is a layout that stacks cards with the same width as a stack of bricks. Adjust the width of all images to the same size, find the lowest height column, and insert a new card.
 * @ko GridLayout는 벽돌을 쌓아 올린 모양처럼 동일한 너비를 가진 카드를 쌓는 레이아웃이다. 모든 이미지의 너비를 동일한 크기로 조정하고, 가장 높이가 낮은 열을 찾아 새로운 이미지를 삽입한다. 따라서 배치된 카드 사이에 빈 공간이 생기지는 않지만 배치된 레이아웃의 아래쪽은 울퉁불퉁해진다.
 * @class eg.InfiniteGrid.GridLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.GridLayout module <ko>eg.InfiniteGrid.GridLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Boolean} [options.align=START] Align of the position of the items (START, CENTER, END, JUSTIFY) <ko>아이템들의 위치의 정렬 (START, CENTER, END, JUSTIFY)</ko>
 * @param {Boolean} [options.itemSize=0] The size of the items. If it is 0, it is calculated as the size of the first item in items. <ko> 아이템의 사이즈. 만약 아이템 사이즈가 0이면, 아이템들의 첫번째 아이템의 사이즈로 계산이 된다. </ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid". {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.GridLayout, {
	margin: 10,
	align: "start",
	itemSize: 200
});

// or

var layout = new eg.InfiniteGrid.GridLayout({
	margin: 10,
	align: "center",
	itemSize: 200,
	horizontal: true,
});

</script>
```
 **/

var GridLayout = function () {
	function GridLayout() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, GridLayout);

		this.options = (0, _utils.assignOptions)({
			align: START,
			itemSize: 0
		}, options);
		this._size = 0;
		this._columnSize = 0;
		this._columnLength = 0;
		this._style = (0, _utils.getStyleNames)(this.options.horizontal);
	}

	GridLayout.prototype.getPoints = function getPoints(outlines) {
		var pos = this.options.horizontal ? "left" : "top";

		return outlines.map(function (outline) {
			return outline[pos];
		});
	};

	GridLayout.prototype.checkColumn = function checkColumn(item) {
		var margin = this.options.margin;
		var sizeName = this.options.horizontal ? "height" : "width";
		var columnSize = this.options.itemSize || item && item.size[sizeName] || 0;

		this._columnSize = columnSize;
		if (!columnSize) {
			this._columnLength = 1;
			return;
		}
		this._columnLength = Math.max(parseInt((this._size + margin) / (columnSize + margin), 10), 1);
	};

	GridLayout.prototype._layout = function _layout(items, outline, isAppend) {
		var length = items.length;
		var margin = this.options.margin;
		var align = this.options.align;
		var style = this._style;

		var size1Name = style.size1;
		var size2Name = style.size2;
		var pos1Name = style.pos1;
		var pos2Name = style.pos2;
		var columnSize = this._columnSize;
		var columnLength = this._columnLength;

		var size = this._size;
		var viewDist = size - (columnSize + margin) * columnLength + margin;

		var pointCaculateName = isAppend ? "min" : "max";
		var startOutline = outline.slice();
		var endOutline = outline.slice();
		var startIndex = 0;
		var endIndex = -1;
		var endPos = -1;

		for (var i = 0; i < length; ++i) {
			var _item$rect;

			var point = Math[pointCaculateName].apply(Math, endOutline) || 0;
			var index = endOutline.indexOf(point);
			var item = items[isAppend ? i : length - 1 - i];
			var size1 = item.size[size1Name];
			var size2 = item.size[size2Name];
			var pos1 = isAppend ? point : point - margin - size1;
			var endPos1 = pos1 + size1 + margin;

			if (index === -1) {
				index = 0;
			}
			var pos2 = (columnSize + margin) * index;

			// ALIGN
			if (align === CENTER) {
				pos2 += viewDist / 2;
			} else if (align === END) {
				pos2 += viewDist + columnSize - size2;
			} else if (align === JUSTIFY) {
				if (columnLength <= 1) {
					pos2 += viewDist / 2;
				} else {
					pos2 = (size - columnSize) / (columnLength - 1) * index;
				}
			}
			// tetris
			item.rect = (_item$rect = {}, _item$rect[pos1Name] = pos1, _item$rect[pos2Name] = pos2, _item$rect);
			item.column = index;
			endOutline[index] = isAppend ? endPos1 : pos1;
			if (endIndex === -1) {
				endIndex = i;
				endPos = endPos1;
			} else if (endPos < endPos1) {
				endIndex = i;
				endPos = endPos1;
			}
		}
		if (!isAppend) {
			items.sort(function (a, b) {
				var item1pos1 = a.rect[pos1Name];
				var item1pos2 = a.rect[pos2Name];
				var item2pos1 = b.rect[pos1Name];
				var item2pos2 = b.rect[pos2Name];

				if (item1pos1 - item2pos1) {
					return item1pos1 - item2pos1;
				}
				return item1pos2 - item2pos2;
			});
			endIndex = length - 1;
		}
		// if append items, startOutline is low, endOutline is high
		// if prepend items, startOutline is high, endOutline is low
		return {
			start: isAppend ? startOutline : endOutline,
			end: isAppend ? endOutline : startOutline,
			startIndex: startIndex,
			endIndex: endIndex
		};
	};

	GridLayout.prototype._insert = function _insert() {
		var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var outline = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		var type = arguments[2];

		var clone = items.map(function (item) {
			return _extends({}, item);
		});

		var startOutline = outline;

		if (!this._columnLength) {
			this.checkColumn(items[0]);
		}
		if (outline.length !== this._columnLength) {
			startOutline = new Array(this._columnLength).fill(outline.length === 0 ? 0 : Math[type === _consts.APPEND ? "min" : "max"].apply(Math, outline) || 0);
		}

		var result = this._layout(clone, startOutline, type);

		return {
			items: clone,
			outlines: result
		};
	};
	/**
  * Adds items at the bottom of a outline.
  * @ko 아이템들을 아웃라인 아래에 추가한다.
  * @method eg.InfiniteGrid.GridLayout#append
  * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
  * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
  * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
  * @example
  * layout.prepend(items, [100, 200, 300, 400]);
  */


	GridLayout.prototype.append = function append(items, outline) {
		return this._insert(items, outline, _consts.APPEND);
	};
	/**
  * Adds items at the top of a outline.
  * @ko 아이템을 아웃라인 위에 추가한다.
  * @method eg.InfiniteGrid.GridLayout#prepend
  * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
  * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
  * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
  * @example
  * layout.prepend(items, [100, 200, 300, 400]);
  */


	GridLayout.prototype.prepend = function prepend(items, outline) {
		return this._insert(items, outline, _consts.PREPEND);
	};
	/**
  * Adds items of groups at the bottom of a outline.
  * @ko 그룹들의 아이템들을 아웃라인 아래에 추가한다.
  * @method eg.InfiniteGrid.GridLayout#layout
  * @param {Array} groups Array of groups to be layouted <ko>레이아웃할 그룹들의 배열</ko>
  * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
  * @return {eg.InfiniteGrid.GridLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * layout.layout(groups, [100, 200, 300, 400]);
  */


	GridLayout.prototype.layout = function layout() {
		var _this = this;

		var groups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var outline = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

		var firstItem = groups.length && groups[0].items.length && groups[0].items[0] || 0;

		this.checkColumn(firstItem);

		// if outlines' length and columns' length are now same, re-caculate outlines.
		var startOutline = void 0;

		if (outline.length !== this._columnLength) {
			var pos = outline.length === 0 ? 0 : Math.min.apply(Math, outline);

			// re-layout items.
			startOutline = new Array(this._columnLength).fill(pos);
		} else {
			startOutline = outline.slice();
		}
		groups.forEach(function (group) {
			var items = group.items;
			var result = _this._layout(items, startOutline, _consts.APPEND);

			group.outlines = result;
			startOutline = result.end;
		});

		return this;
	};
	/**
  * Set the viewport size of the layout.
  * @ko 레이아웃의 가시 사이즈를 설정한다.
  * @method eg.InfiniteGrid.GridLayout#setSize
  * @param {Number} size The viewport size of container area where items are added to a layout <ko>레이아웃에 아이템을 추가하는 컨테이너 영역의 가시 사이즈</ko>
  * @return {eg.InfiniteGrid.GridLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * layout.setSize(800);
  */


	GridLayout.prototype.setSize = function setSize(size) {
		this._size = size;
		return this;
	};

	return GridLayout;
}();

exports["default"] = GridLayout;
module.exports = exports["default"];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _FrameLayout2 = __webpack_require__(6);

var _FrameLayout3 = _interopRequireDefault(_FrameLayout2);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeShapeOutline(outline, itemSize, columnLength, isAppend) {
	var point = Math[isAppend ? "min" : "max"].apply(Math, outline) || 0;

	if (outline.length !== columnLength) {
		return (0, _utils.fill)(new Array(columnLength), 0);
	}
	return outline.map(function (l) {
		return parseInt((l - point) / itemSize, 10);
	});
}
function getColumn(item) {
	if (item.column) {
		return item.column;
	}
	var column = 0;

	if (item.el) {
		var dataset = item.el.dataset;

		if (dataset) {
			column = dataset.column || 1;
		} else {
			column = item.el.getAttribute("column") || 1;
		}
	} else {
		column = 1;
	}
	item.column = column;
	return column;
}

/**
 * @classdesc SquareLayout is a layout that places all cards like squares on a checkerboard, and important cards are n times larger. The main card can be enlarged, and then a small card can be placed to naturally show the relationship of the card.
 * @ko SquareLayout은 바둑판처럼 모든 카드를 정사각형으로 배치하고 중요한 카드는 크기를 N배로 키워서 보여주는 레이아웃이다. 주요 카드를 크게 표시하고, 그 다음에 작은 카드를 배치해 자연스럽게 카드의 관계를 나타낼 수 있습니다.
 * @class eg.InfiniteGrid.SquareLayout
 * @extends eg.InfiniteGrid.FrameLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.SquareLayout module <ko>eg.InfiniteGrid.SquareLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Boolean} [options.itemSize=0] The size of the items. If it is 0, it is calculated as the size of the first item in items. <ko> 아이템의 사이즈. 만약 아이템 사이즈가 0이면, 아이템들의 첫번째 아이템의 사이즈로 계산이 된다. </ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid". {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.SquareLayout, {
	margin: 10,
	itemSize: 200,
});

// or

var layout = new eg.InfiniteGrid.SquareLayout({
	margin: 10,
	itemSize: 200,
	horizontal: true,
});


var item1 = '<div data-column="2"></div>';
var item2 = "<div></div>"
layout.append([item1, item2]);
</script>
```
 **/

var SquareLayout = function (_FrameLayout) {
	_inherits(SquareLayout, _FrameLayout);

	function SquareLayout() {
		_classCallCheck(this, SquareLayout);

		return _possibleConstructorReturn(this, _FrameLayout.apply(this, arguments));
	}

	SquareLayout.prototype._checkItemSize = function _checkItemSize() {
		var column = this.options.column;

		if (!column) {
			_FrameLayout.prototype._checkItemSize.call(this);
			return;
		}
		var margin = this.options.margin;

		// if itemSize is not in options, caculate itemSize from size.
		this._itemSize = (this._size + margin) / column - margin;
	};

	SquareLayout.prototype._layout = function _layout(items) {
		var _shapes;

		var outline = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		var isAppend = arguments[2];

		var itemSize = this._getItemSize();
		var margin = this.options.margin;
		var columnLength = this.options.column || parseInt((this._size + margin) / (itemSize + margin), 10) || 1;
		var length = items.length;
		var endOutline = makeShapeOutline(outline, itemSize, columnLength, isAppend);
		var pointCaculateName = isAppend ? "min" : "max";
		var shapes = [];
		var sign = isAppend ? 1 : -1;
		var style = this._style;
		var pos1Name = style.pos1;
		var pos2Name = style.pos2;

		for (var i = 0; i < length; ++i) {
			var _shapes$push;

			var point = Math[pointCaculateName].apply(Math, endOutline);
			var index = endOutline[isAppend ? "indexOf" : "lastIndexOf"](point);
			var item = items[i];
			var columnWidth = item.columnWidth;
			var column = columnWidth && columnWidth[0] === columnLength && columnWidth[1] || getColumn(item);
			var columnCount = 1;

			if (column > 1) {
				for (var j = 1; j < column && (isAppend && index + j < columnLength || !isAppend && index - j >= 0); ++j) {
					if (isAppend && endOutline[index + sign * j] <= point || !isAppend && endOutline[index + sign * j] >= point) {
						++columnCount;
						continue;
					}
					break;
				}
				if (!isAppend) {
					index -= columnCount - 1;
				}
			}
			item.columnWidth = [columnLength, columnCount];
			shapes.push((_shapes$push = {
				width: columnCount,
				height: columnCount
			}, _shapes$push[pos1Name] = point - (!isAppend ? columnCount : 0), _shapes$push[pos2Name] = index, _shapes$push.index = i, _shapes$push));
			for (var _j = 0; _j < columnCount; ++_j) {
				endOutline[index + _j] = point + sign * columnCount;
			}
		}
		this._shapes = (_shapes = {
			shapes: shapes
		}, _shapes[style.size2] = columnLength, _shapes);

		var result = _FrameLayout.prototype._layout.call(this, items, outline, isAppend);

		if (!isAppend) {
			var lastItem = items[items.length - 1];

			shapes.sort(function (shape1, shape2) {
				var item1pos1 = shape1[pos1Name];
				var item1pos2 = shape1[pos2Name];
				var item2pos1 = shape2[pos1Name];
				var item2pos2 = shape2[pos2Name];

				if (item1pos1 - item2pos1) {
					return item1pos1 - item2pos1;
				}
				return item1pos2 - item2pos2;
			});
			items.sort(function (a, b) {
				var item1pos1 = a.rect[pos1Name];
				var item1pos2 = a.rect[pos2Name];
				var item2pos1 = b.rect[pos1Name];
				var item2pos2 = b.rect[pos2Name];

				if (item1pos1 - item2pos1) {
					return item1pos1 - item2pos1;
				}
				return item1pos2 - item2pos2;
			});
			result.startIndex = 0;
			result.endIndex = items.indexOf(lastItem);
		}
		return result;
	};

	return SquareLayout;
}(_FrameLayout3["default"]);

exports["default"] = SquareLayout;
module.exports = exports["default"];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _BoxModel = __webpack_require__(15);

var _BoxModel2 = _interopRequireDefault(_BoxModel);

var _consts = __webpack_require__(1);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getCost(originLength, length) {
	var cost = originLength / length;

	if (cost < 1) {
		cost = 1 / cost;
	}

	return cost - 1;
}
function fitArea(item, bestFitArea, itemFitSize, containerFitSize, layoutVertical) {
	item.setHeight(itemFitSize.height);
	item.setWidth(itemFitSize.width);
	bestFitArea.setHeight(containerFitSize.height);
	bestFitArea.setWidth(containerFitSize.width);

	if (layoutVertical) {
		item.setTop(bestFitArea.getTop() + bestFitArea.getHeight());
		item.setLeft(bestFitArea.getLeft());
	} else {
		item.setLeft(bestFitArea.getLeft() + bestFitArea.getWidth());
		item.setTop(bestFitArea.getTop());
	}
}

/**
 * @classdesc The PackingLayout is a layout that shows the important cards bigger without sacrificing the weight of the cards. Rows and columns are separated so that cards are dynamically placed within the horizontal and vertical space rather than arranged in an orderly fashion.
 * @ko PackingLayout은 카드의 본래 크기에 따른 비중을 해치지 않으면서 중요한 카드는 더 크게 보여 주는 레이아웃이다. 행과 열이 구분돼 이미지를 정돈되게 배치하는 대신 가로세로 일정 공간 내에서 동적으로 카드를 배치한다.
 * @class eg.InfiniteGrid.PackingLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.PackingLayout module <ko>eg.InfiniteGrid.PackingLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Boolean} [options.aspectRatio=1] The aspect ratio of the group <ko> 그룹의 가로 세로 비 </ko>
 * @param {Boolean} [options.sizeWeight=1] The size weight when placing an image <ko> 이미지를 배치할 때 사이즈 가중치 </ko>
 * @param {Boolean} [options.ratioWeight=1] The ratio weight when placing an image <ko> 이미지를 배치할 때 비율 가중치 </ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid". {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.PackingLayout, {
	margin: 10,
	aspectRatio: 1,
	sizeWeight: 1,
	ratioWeight: 2,
});

// or

var layout = new eg.InfiniteGrid.PackingLayout({
	horizontal: true,
	margin: 10,
	aspectRatio: 1,
	sizeWeight: 1,
	ratioWeight: 2,
});

</script>
```
 **/

var PackingLayout = function () {
	function PackingLayout() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, PackingLayout);

		this.options = (0, _utils.assignOptions)({
			aspectRatio: 1,
			sizeWeight: 1,
			ratioWeight: 1
		}, options);
		this._size = 0;
		this._style = (0, _utils.getStyleNames)(this.options.horizontal);
	}

	PackingLayout.prototype._findBestFitArea = function _findBestFitArea(container, item) {
		if (container.getRatio() === 0) {
			// 아이템 최초 삽입시 전체영역 지정
			container.setOriginWidth(item.getWidth());
			container.setOriginHeight(item.getHeight());
			container.setWidth(item.getWidth());
			container.setHeight(item.getHeight());
			return;
		}

		var bestFitArea = null;
		var minCost = 10000000;
		var layoutVertical = false;
		var itemFitSize = {
			width: 0,
			height: 0
		};
		var containerFitSize = {
			width: 0,
			height: 0
		};
		var _options = this.options,
		    sizeWeight = _options.sizeWeight,
		    ratioWeight = _options.ratioWeight;


		container.innerItem().forEach(function (v) {
			var containerSizeCost = getCost(v.getOriginSize(), v.getSize()) * sizeWeight;
			var containerRatioCost = getCost(v.getOriginRatio(), v.getRatio()) * ratioWeight;
			var cost = void 0;

			for (var i = 0; i < 2; ++i) {
				var itemWidth = void 0;
				var itemHeight = void 0;
				var containerWidth = void 0;
				var containerHeight = void 0;

				if (i === 0) {
					// 상하에 아이템 추가
					itemWidth = v.getWidth();
					itemHeight = v.getHeight() * (item.getHeight() / (v.getOriginHeight() + item.getHeight()));
					containerWidth = v.getWidth();
					containerHeight = v.getHeight() - itemHeight;
				} else {
					// 좌우에 아이템 추가
					itemHeight = v.getHeight();
					itemWidth = v.getWidth() * (item.getWidth() / (v.getOriginWidth() + item.getWidth()));
					containerHeight = v.getHeight();
					containerWidth = v.getWidth() - itemWidth;
				}

				var itemSize = itemWidth * itemHeight;
				var itemRatio = itemWidth / itemHeight;
				var containerSize = containerWidth * containerHeight;
				var containerRatio = containerHeight / containerHeight;

				cost = getCost(item.getSize(), itemSize) * sizeWeight;
				cost += getCost(item.getRatio(), itemRatio) * ratioWeight;
				cost += getCost(v.getOriginSize(), containerSize) * sizeWeight - containerSizeCost;
				cost += getCost(v.getOriginRatio(), containerRatio) * ratioWeight - containerRatioCost;

				if (cost === Math.min(cost, minCost)) {
					minCost = cost;
					bestFitArea = v;
					layoutVertical = i === 0;
					itemFitSize.width = itemWidth;
					itemFitSize.height = itemHeight;
					containerFitSize.width = containerWidth;
					containerFitSize.height = containerHeight;
				}
			}
		});

		fitArea(item, bestFitArea, itemFitSize, containerFitSize, layoutVertical);
	};

	PackingLayout.prototype._layout = function _layout(items) {
		var _this = this;

		var outline = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		var isAppend = arguments[2];

		var style = this._style;
		var isHorizontal = this.options.horizontal;
		var aspectRatio = this.options.aspectRatio;
		var margin = this.options.margin;
		var pos1Name = style.pos1;
		var size1Name = style.size1;
		var containerWidth = this._size * (isHorizontal ? aspectRatio : 1);
		var containerHeight = this._size / (isHorizontal ? 1 : aspectRatio);
		var containerSize1 = isHorizontal ? containerWidth : containerHeight;
		var prevOutline = (0, _utils.toZeroArray)(outline);
		var start = isAppend ? Math.max.apply(Math, prevOutline) : Math.min.apply(Math, prevOutline) - containerSize1 - margin;
		var end = start + containerSize1 + margin;
		var container = new _BoxModel2["default"]({});

		var startIndex = -1;
		var endIndex = -1;
		var startPos = -1;
		var endPos = -1;

		items.forEach(function (item) {
			var model = new _BoxModel2["default"]({
				originWidth: item.orgSize.width,
				originHeight: item.orgSize.height,
				width: item.orgSize.width,
				height: item.orgSize.height
			});

			_this._findBestFitArea(container, model);
			container.pushItem(model);
			container.scaleTo(containerWidth + margin, containerHeight + margin);
		});
		items.forEach(function (item, i) {
			var boxItem = container.innerItem()[i];
			// console.log("boxItem", boxItem, boxItem instanceof BoxModel);
			var width = boxItem.getWidth();
			var height = boxItem.getHeight();
			var top = boxItem.getTop();
			var left = boxItem.getLeft();

			item.rect = { top: top, left: left, width: width - margin, height: height - margin };
			item.rect[pos1Name] += start;

			if (startIndex === -1) {
				startIndex = i;
				endIndex = i;
				startPos = item.rect[pos1Name];
				endPos = startPos;
			}
			if (startPos > item.rect[pos1Name]) {
				startPos = item.rect[pos1Name];
				startIndex = i;
			}
			if (endPos < item.rect[pos1Name] + item.rect[size1Name] + margin) {
				endPos = item.rect[pos1Name] + item.rect[size1Name] + margin;
				endIndex = i;
			}
		});

		return {
			start: [start],
			end: [end],
			startIndex: startIndex,
			endIndex: endIndex
		};
	};

	PackingLayout.prototype._insert = function _insert() {
		var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var outline = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		var type = arguments[2];

		// this only needs the size of the item.
		var clone = items.map(function (item) {
			return _extends({}, item);
		});

		return {
			items: clone,
			outlines: this._layout(clone, outline, type)
		};
	};
	/**
  * Adds items at the bottom of a outline.
  * @ko 아이템들을 아웃라인 아래에 추가한다.
  * @method eg.InfiniteGrid.PackingLayout#append
  * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
  * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
  * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
  * @example
  * layout.prepend(items, [100]);
  */


	PackingLayout.prototype.append = function append(items, outline) {
		return this._insert(items, outline, _consts.APPEND);
	};
	/**
  * Adds items at the top of a outline.
  * @ko 아이템을 아웃라인 위에 추가한다.
  * @method eg.InfiniteGrid.PackingLayout#prepend
  * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
  * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
  * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
  * @example
  * layout.prepend(items, [100]);
  */


	PackingLayout.prototype.prepend = function prepend(items, outline) {
		return this._insert(items, outline, _consts.PREPEND);
	};
	/**
  * Adds items of groups at the bottom of a outline.
  * @ko 그룹들의 아이템들을 아웃라인 아래에 추가한다.
  * @method eg.InfiniteGrid.PackingLayout#layout
  * @param {Array} groups Array of groups to be layouted <ko>레이아웃할 그룹들의 배열</ko>
  * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
  * @return {eg.InfiniteGrid.PackingLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * layout.layout(groups, [100, 200, 300, 400]);
  */


	PackingLayout.prototype.layout = function layout() {
		var groups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var outline = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

		var length = groups.length;
		var point = outline;

		for (var i = 0; i < length; ++i) {
			var group = groups[i];

			point = this._layout(group.items, point, _consts.APPEND);
			group.outlines = point;
			point = point.end;
		}
		return this;
	};
	/**
  * Set the viewport size of the layout.
  * @ko 레이아웃의 가시 사이즈를 설정한다.
  * @method eg.InfiniteGrid.PackingLayout#setSize
  * @param {Number} size The viewport size of container area where items are added to a layout <ko>레이아웃에 아이템을 추가하는 컨테이너 영역의 가시 사이즈</ko>
  * @return {eg.InfiniteGrid.PackingLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * layout.setSize(800);
  */


	PackingLayout.prototype.setSize = function setSize(size) {
		this._size = size;
		return this;
	};

	return PackingLayout;
}();

exports["default"] = PackingLayout;
module.exports = exports["default"];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoxModel = function () {
	function BoxModel(option) {
		_classCallCheck(this, BoxModel);

		this._originWidth = option.originWidth || 0;
		this._originHeight = option.originHeight || 0;
		this._width = option.width || 0;
		this._height = option.height || 0;
		this._left = option.left || 0;
		this._top = option.top || 0;
		this._item = option.item;
		this._innerItem = option.innerItem || [];
	}

	BoxModel.prototype.getOriginWidth = function getOriginWidth() {
		return this._originWidth;
	};

	BoxModel.prototype.setOriginWidth = function setOriginWidth(width) {
		this._originWidth = width;
	};

	BoxModel.prototype.getOriginHeight = function getOriginHeight() {
		return this._originHeight;
	};

	BoxModel.prototype.setOriginHeight = function setOriginHeight(height) {
		this._originHeight = height;
	};

	BoxModel.prototype.getWidth = function getWidth() {
		return this._width;
	};

	BoxModel.prototype.setWidth = function setWidth(width) {
		this._width = width;
	};

	BoxModel.prototype.getHeight = function getHeight() {
		return this._height;
	};

	BoxModel.prototype.setHeight = function setHeight(height) {
		this._height = height;
	};

	BoxModel.prototype.getLeft = function getLeft() {
		return this._left;
	};

	BoxModel.prototype.setLeft = function setLeft(left) {
		this._left = left;
	};

	BoxModel.prototype.getTop = function getTop() {
		return this._top;
	};

	BoxModel.prototype.setTop = function setTop(top) {
		this._top = top;
	};

	BoxModel.prototype.innerItem = function innerItem() {
		return this._innerItem;
	};

	BoxModel.prototype.scaleTo = function scaleTo(width, height) {
		var scaleX = this._width === 0 ? 0 : width / this._width;
		var scaleY = this._height === 0 ? 0 : height / this._height;

		this._innerItem.forEach(function (v) {
			if (scaleX !== 0) {
				v._left *= scaleX;
				v._width *= scaleX;
			}
			if (scaleY !== 0) {
				v._top *= scaleY;
				v._height *= scaleY;
			}
		});

		this._width = width;
		this._height = height;
	};

	BoxModel.prototype.pushItem = function pushItem(item) {
		this._innerItem.push(item);
	};

	BoxModel.prototype.getOriginSize = function getOriginSize() {
		return this._originWidth * this._originHeight;
	};

	BoxModel.prototype.getSize = function getSize() {
		return this._width * this._height;
	};

	BoxModel.prototype.getOriginRatio = function getOriginRatio() {
		return this._originHeight === 0 ? 0 : this._originWidth / this._originHeight;
	};

	BoxModel.prototype.getRatio = function getRatio() {
		return this._height === 0 ? 0 : this._width / this._height;
	};

	BoxModel.prototype.isSmallerThen = function isSmallerThen(box) {
		return this._width <= box._width && this._height <= box._height;
	};

	BoxModel.prototype.isEqual = function isEqual(box) {
		return this._left === box._left && this._top === box._top && this._width === box._width && this._height === box._height;
	};

	return BoxModel;
}();

module.exports = BoxModel;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dijkstra = __webpack_require__(17);

var _dijkstra2 = _interopRequireDefault(_dijkstra);

var _consts = __webpack_require__(1);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @classdesc 'justified' is a printing term with the meaning that 'it fits in one row wide'. JustifiedLayout is a layout that the card is filled up on the basis of a line given a size.
 * @ko 'justified'는 '1행의 너비에 맞게 꼭 들어찬'이라는 의미를 가진 인쇄 용어다. 용어의 의미대로 너비가 주어진 사이즈를 기준으로 카드가 가득 차도록 배치하는 레이아웃이다.
 * @class eg.InfiniteGrid.JustifiedLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.JustifiedLayout module <ko>eg.InfiniteGrid.JustifiedLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Boolean} [options.minSize=0] Minimum size of item to be resized <ko> 아이템이 조정되는 최소 크기 </ko>
 * @param {Boolean} [options.maxSize=0] Maximum size of item to be resized <ko> 아이템이 조정되는 최대 크기 </ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid". {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.JustifiedLayout, {
	margin: 10,
	minSize: 100,
	maxSize: 300,
});

// or

var layout = new eg.InfiniteGrid.JustifiedLayout({
	margin: 10,
	minSize: 100,
	maxSize: 300,
	horizontal: true,
});

</script>
```
 **/
var JustifiedLayout = function () {
	function JustifiedLayout() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, JustifiedLayout);

		this.options = (0, _utils.assignOptions)({
			minSize: 0,
			maxSize: 0
		}, options);
		this._style = (0, _utils.getStyleNames)(this.options.horizontal);
		this._size = 0;
	}

	JustifiedLayout.prototype._layout = function _layout(items, outline, isAppend) {
		var _this = this;

		var style = this._style;
		var size1Name = style.size1;
		var size2Name = style.size2;
		var startIndex = 0;
		var endIndex = items.length;
		var graph = function graph(_start) {
			var results = {};
			var start = +_start.replace(/[^0-9]/g, "");
			var length = endIndex + 1;

			for (var i = start + 1; i < length; ++i) {
				if (i - start > 8) {
					break;
				}
				var cost = _this._getCost(items, start, i, size1Name, size2Name);

				if (cost < 0 && i === length - 1) {
					cost = 0;
				}
				if (cost !== null) {
					results["node" + i] = Math.pow(cost, 2);
				}
			}

			return results;
		};
		// shortest path for items' total height.
		var path = _dijkstra2["default"].find_path(graph, "node" + startIndex, "node" + endIndex);

		return this._setStyle(items, path, outline, isAppend);
	};

	JustifiedLayout.prototype._getSize = function _getSize(items, size1Name, size2Name) {
		var margin = this.options.margin;
		var size = items.reduce(function (sum, item) {
			return sum + item.size[size2Name] / item.size[size1Name];
		}, 0);

		return (this._size - margin * (items.length - 1)) / size;
	};

	JustifiedLayout.prototype._getCost = function _getCost(items, i, j, size1Name, size2Name) {
		var size = this._getSize(items.slice(i, j), size1Name, size2Name);
		var min = this.options.minSize || 0;
		var max = this.options.maxSize || Infinity;

		if (isFinite(max)) {
			// if this size is not in range, the cost increases sharply.
			if (size < min) {
				return Math.pow(size - min, 2) + Math.pow(max, 2);
			} else if (size > max) {
				return Math.pow(size - max, 2) + Math.pow(max, 2);
			} else {
				// if this size in range, the cost is negative or low.
				return Math.min(size - max, min - size);
			}
		}
		// if max is infinite type, caculate cost only with "min".
		if (size < min) {
			return Math.max(Math.pow(min, 2), Math.pow(size, 2));
		}
		return size - min;
	};

	JustifiedLayout.prototype._setStyle = function _setStyle(items, path) {
		var outline = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
		var isAppend = arguments[3];

		var style = this._style;
		// if direction is vertical
		// pos1 : top, pos11 : bottom
		// size1 : height
		// pos2 : left, pos22 : right
		// size2 : width

		// if direction is horizontal
		// pos1 : left, pos11 : right
		// size1 : width
		// pos2 : top, pos22 : bottom
		// size2 : height
		var pos1Name = style.pos1;
		var size1Name = style.size1;
		var pos2Name = style.pos2;
		var size2Name = style.size2;
		var length = path.length;
		var margin = this.options.margin;
		var startPoint = outline[0] || 0;
		var endPoint = startPoint;
		var height = 0;

		for (var i = 0; i < length - 1; ++i) {
			var path1 = parseInt(path[i].replace("node", ""), 10);
			var path2 = parseInt(path[i + 1].replace("node", ""), 10);
			// pathItems(path1 to path2) are in 1 line.
			var pathItems = items.slice(path1, path2);
			var pathItemsLength = pathItems.length;
			var size1 = this._getSize(pathItems, size1Name, size2Name);
			var pos1 = endPoint;

			for (var j = 0; j < pathItemsLength; ++j) {
				var _item$rect;

				var item = pathItems[j];
				var size2 = item.size[size2Name] / item.size[size1Name] * size1;
				// item has margin bottom and right.
				// first item has not margin.
				var prevItemRect = j === 0 ? 0 : pathItems[j - 1].rect;
				var pos2 = prevItemRect ? prevItemRect[pos2Name] + prevItemRect[size2Name] + margin : 0;

				item.rect = (_item$rect = {}, _item$rect[pos1Name] = pos1, _item$rect[pos2Name] = pos2, _item$rect[size1Name] = size1, _item$rect[size2Name] = size2, _item$rect);
			}
			height += margin + size1;
			endPoint = startPoint + height;
		}
		var itemsLength = items.length;
		var startIndex = itemsLength ? 0 : -1;
		var endIndex = itemsLength ? itemsLength - 1 : -1;

		if (isAppend) {
			// previous group's end outline is current group's start outline
			return {
				start: [startPoint],
				end: [endPoint],
				startIndex: startIndex,
				endIndex: endIndex
			};
		}
		// for prepend, only substract height from position.
		// always start is lower than end.

		for (var _i = 0; _i < itemsLength; ++_i) {
			var _item = items[_i];

			// move items as long as height for prepend
			_item.rect[pos1Name] -= height;
		}
		return {
			start: [startPoint - height],
			end: [startPoint], // endPoint - height = startPoint
			startIndex: startIndex,
			endIndex: endIndex
		};
	};

	JustifiedLayout.prototype._insert = function _insert(items, outline, type) {
		// this only needs the size of the item.
		var clone = items.map(function (item) {
			return _extends({}, item);
		});

		return {
			items: clone,
			outlines: this._layout(clone, outline, type)
		};
	};
	/**
  * Set the viewport size of the layout.
  * @ko 레이아웃의 가시 사이즈를 설정한다.
  * @method eg.InfiniteGrid.JustifiedLayout#setSize
  * @param {Number} size The viewport size of container area where items are added to a layout <ko>레이아웃에 아이템을 추가하는 컨테이너 영역의 가시 사이즈</ko>
  * @return {eg.InfiniteGrid.JustifiedLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * layout.setSize(800);
  */


	JustifiedLayout.prototype.setSize = function setSize(size) {
		this._size = size;
		return this;
	};
	/**
  * Adds items at the bottom of a outline.
  * @ko 아이템들을 아웃라인 아래에 추가한다.
  * @method eg.InfiniteGrid.JustifiedLayout#append
  * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
  * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
  * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
  * @example
  * layout.prepend(items, [100]);
  */


	JustifiedLayout.prototype.append = function append(items, outline) {
		return this._insert(items, outline, _consts.APPEND);
	};
	/**
  * Adds items at the top of a outline.
  * @ko 아이템을 아웃라인 위에 추가한다.
  * @method eg.InfiniteGrid.JustifiedLayout#prepend
  * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
  * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
  * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
  * @example
  * layout.prepend(items, [100]);
  */


	JustifiedLayout.prototype.prepend = function prepend(items, outline) {
		return this._insert(items, outline, _consts.PREPEND);
	};
	/**
  * Adds items of groups at the bottom of a outline.
  * @ko 그룹들의 아이템들을 아웃라인 아래에 추가한다.
  * @method eg.InfiniteGrid.JustifiedLayout#layout
  * @param {Array} groups Array of groups to be layouted <ko>레이아웃할 그룹들의 배열</ko>
  * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
  * @return {eg.InfiniteGrid.JustifiedLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * layout.layout(groups, [100]);
  */


	JustifiedLayout.prototype.layout = function layout(groups, outlines) {
		var length = groups.length;
		var point = outlines;

		for (var i = 0; i < length; ++i) {
			var group = groups[i];

			point = this._layout(group.items, point, _consts.APPEND);
			group.outlines = point;
			point = point.end;
		}
		return this;
	};

	return JustifiedLayout;
}();

exports["default"] = JustifiedLayout;
module.exports = exports["default"];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable */
/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/
(function () {
  var dijkstra = {
    single_source_shortest_paths: function single_source_shortest_paths(graph, s, d) {
      // Predecessor map for each node that has been encountered.
      // node ID => predecessor node ID
      var predecessors = {};

      // Costs of shortest paths from s to all nodes encountered.
      // node ID => cost
      var costs = {};
      costs[s] = 0;

      // Costs of shortest paths from s to all nodes encountered; differs from
      // `costs` in that it provides easy access to the node that currently has
      // the known shortest path from s.
      // XXX: Do we actually need both `costs` and `open`?
      var open = new BinaryHeap(function (x) {
        return x.cost;
      });
      open.push({ value: s, cost: 0 });

      var closest, u, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
      while (open.size()) {
        // In the nodes remaining in graph that have a known cost from s,
        // find the node, u, that currently has the shortest path from s.
        closest = open.pop();
        u = closest.value;
        cost_of_s_to_u = closest.cost;

        // Get nodes adjacent to u...
        adjacent_nodes = graph(u) || {};

        // ...and explore the edges that connect u to those nodes, updating
        // the cost of the shortest paths to any or all of those nodes as
        // necessary. v is the node across the current edge from u.
        for (var v in adjacent_nodes) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = typeof costs[v] === 'undefined';
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push({ value: v, cost: cost_of_s_to_u_plus_cost_of_e });
            predecessors[v] = u;
          }
        }
      }

      if (typeof costs[d] === 'undefined') {
        var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
        throw new Error(msg);
      }

      return predecessors;
    },

    extract_shortest_path_from_predecessor_list: function extract_shortest_path_from_predecessor_list(predecessors, d) {
      var nodes = [];
      var u = d;
      var predecessor;
      while (u) {
        nodes.push(u);
        predecessor = predecessors[u];
        u = predecessors[u];
      }
      nodes.reverse();
      return nodes;
    },

    find_path: function find_path(graph, s, d) {
      var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
      return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
    }

  };

  function BinaryHeap(scoreFunction) {
    this.content = [];
    this.scoreFunction = scoreFunction;
  }

  BinaryHeap.prototype = {
    push: function push(element) {
      // Add the new element to the end of the array.
      this.content.push(element);
      // Allow it to bubble up.
      this.bubbleUp(this.content.length - 1);
    },

    pop: function pop() {
      // Store the first element so we can return it later.
      var result = this.content[0];
      // Get the element at the end of the array.
      var end = this.content.pop();
      // If there are any elements left, put the end element at the
      // start, and let it sink down.
      if (this.content.length > 0) {
        this.content[0] = end;
        this.sinkDown(0);
      }
      return result;
    },

    remove: function remove(node) {
      var len = this.content.length;
      // To remove a value, we must search through the array to find
      // it.
      for (var i = 0; i < len; i++) {
        if (this.content[i] === node) {
          // When it is found, the process seen in 'pop' is repeated
          // to fill up the hole.
          var end = this.content.pop();
          if (i !== len - 1) {
            this.content[i] = end;
            if (this.scoreFunction(end) < this.scoreFunction(node)) {
              this.bubbleUp(i);
            } else {
              this.sinkDown(i);
            }
          }
          return;
        }
      }
      throw new Error('Node not found.');
    },

    size: function size() {
      return this.content.length;
    },

    bubbleUp: function bubbleUp(n) {
      // Fetch the element that has to be moved.
      var element = this.content[n];
      // When at 0, an element can not go up any further.
      while (n > 0) {
        // Compute the parent element's index, and fetch it.
        var parentN = Math.floor((n + 1) / 2) - 1,
            parent = this.content[parentN];
        // Swap the elements if the parent is greater.
        if (this.scoreFunction(element) < this.scoreFunction(parent)) {
          this.content[parentN] = element;
          this.content[n] = parent;
          // Update 'n' to continue at the new position.
          n = parentN;
        }
        // Found a parent that is less, no need to move it further.
        else {
            break;
          }
      }
    },

    sinkDown: function sinkDown(n) {
      // Look up the target element and its score.
      var length = this.content.length,
          element = this.content[n],
          elemScore = this.scoreFunction(element);

      while (true) {
        // Compute the indices of the child elements.
        var child2N = (n + 1) * 2,
            child1N = child2N - 1;
        // This is used to store the new position of the element,
        // if any.
        var swap = null;
        // If the first child exists (is inside the array)...
        if (child1N < length) {
          // Look it up and compute its score.
          var child1 = this.content[child1N],
              child1Score = this.scoreFunction(child1);
          // If the score is less than our element's, we need to swap.
          if (child1Score < elemScore) {
            swap = child1N;
          }
        }
        // Do the same checks for the other child.
        if (child2N < length) {
          var child2 = this.content[child2N],
              child2Score = this.scoreFunction(child2);
          if (child2Score < (swap == null ? elemScore : child1Score)) {
            swap = child2N;
          }
        }

        // If the element needs to be moved, swap it, and continue.
        if (swap !== null) {
          this.content[n] = this.content[swap];
          this.content[swap] = element;
          n = swap;
        }
        // Otherwise, we are done.
        else {
            break;
          }
      }
    }
  };

  /**
   * Browserify 지원을 위한 모듈화 코드
   */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = dijkstra;
  } else {
    window.dijkstra = dijkstra;
  }
})();

/***/ })
/******/ ]);
});
//# sourceMappingURL=infinitegrid.pkgd.js.map