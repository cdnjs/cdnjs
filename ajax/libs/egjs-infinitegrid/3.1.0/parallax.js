/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/infinitegrid project is licensed under the MIT license
 * 
 * @egjs/infinitegrid JavaScript library
 * https://github.com/naver/egjs-infinitegrid
 * 
 * @version 3.1.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Parallax"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Parallax"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.DEFENSE_BROWSER = exports.WEBKIT_VERSION = exports.IMAGE_PROCESSING = exports.PROCESSING = exports.LOADING_PREPEND = exports.LOADING_APPEND = exports.IDLE = exports.ALIGN = exports.isMobile = exports.agent = exports.DEFAULT_OPTIONS = exports.GROUPKEY_ATT = exports.DUMMY_POSITION = exports.SINGLE = exports.MULTI = exports.NO_TRUSTED = exports.TRUSTED = exports.NO_CACHE = exports.CACHE = exports.HORIZONTAL = exports.VERTICAL = exports.PREPEND = exports.APPEND = exports.IGNORE_CLASSNAME = exports.CONTAINER_CLASSNAME = exports.RETRY = exports.IS_ANDROID2 = exports.IS_IOS = exports.IS_IE = exports.SUPPORT_PASSIVE = exports.SUPPORT_ADDEVENTLISTENER = exports.SUPPORT_COMPUTEDSTYLE = undefined;

var _browser = __webpack_require__(1);

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/* eslint-disable no-new-func, no-nested-ternary */
var win = window;
/* eslint-enable no-new-func, no-nested-ternary */

exports.window = window;
var document = exports.document = win.document;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _consts = __webpack_require__(0);

var _utils = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var style = {
	"vertical": { position: "top", size: "height", cammelSize: "Height", coordinate: "Y" },
	"horizontal": { position: "left", size: "width", cammelSize: "Width", coordinate: "X" }
};
var START = _consts.ALIGN.START,
    CENTER = _consts.ALIGN.CENTER;

var TRANSFORM = function () {
	var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
	var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];

	for (var i = 0, len = target.length; i < len; i++) {
		if (target[i] in bodyStyle) {
			return target[i];
		}
	}
	return "";
}();

/**
 * @classdesc Parallax is a displacement or difference in the apparent position of an object viewed along two different lines of sight. You can apply parallax by scrolling the image and speed of the item.
 * @ko Parallax는 서로 다른 두 개의 시선에서 바라본 물체의 외관상 위치의 변위 또는 차이입니다. 스크롤에 따라 이미지와 아이템의 속도를 차이를 줌으로써 parallax을 적용할 수 있습니다.
 * @class eg.Parallax
 * @param {Element|String} [root=window] Scrolling target. If you scroll in the body, set window. 스크롤하는 대상. 만약 body에서 스크롤하면 window로 설정한다.
 * @param {Object} [options] The option object of eg.Parallax module <ko>eg.Parallax 모듈의 옵션 객체</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Element|String} [options.container=null] Container wrapping items. If root and container have no gaps, do not set option. <ko> 아이템들을 감싸고 있는 컨테이너. 만약 root와 container간의 차이가 없으면, 옵션을 설정하지 않아도 된다.</ko>
 * @param {String} [options.selector="img"] The selector of the image to apply the parallax in the item <ko> 아이템안에 있는 parallax를 적용할 이미지의 selector </ko>
 * @param {Boolean} [options.strength=1] Dimensions that indicate the sensitivity of parallax. The higher the strength, the faster.
 * @param {Boolean} [options.center=0] The middle point of parallax. The top is 1 and the bottom is -1. <ko> parallax가 가운데로 오는 점. 상단이 1이고 하단이 -1이다. </ko>
 * @param {Boolean} [options.range=[-1, 1]] Range to apply the parallax. The top is 1 and the bottom is -1. <ko> parallax가 적용되는 범위, 상단이 1이고 하단이 -1이다. </ko>
 * @param {Boolean} [options.align="start"] The alignment of the image in the item. ("start" : top or left, "center": middle) <ko> 아이템안의 이미지의 정렬 </ko>
 * @example
```
<script>
// isOverflowScroll: false
var parallax = new eg.Parallax(window, {
	container: ".container",
	selector: "img.parallax",
	strength: 0.8,
	center: 0,
	range: [-1, 1],
	align: "center",
	horizontal: true,
});

// isOverflowScroll: ture
var parallax = new eg.Parallax(".container", {
	selector: "img.parallax",
	strength: 0.8,
	center: 0,
	range: [-1, 1],
	align: "center",
	horizontal: true,
});

// item interface
var item = {
	// original size
	size: {
		width: 100,
		height: 100,
	},
	// view size
	rect: {
		top: 100,
		left: 100,
		width: 100,
		height: 100,
	}
};
</script>
```
 **/

var Parallax = function () {
	function Parallax() {
		var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, Parallax);

		this.options = _extends({
			container: null,
			selector: "img",
			strength: 1,
			center: 0,
			range: [-1, 1],
			align: START,
			horizontal: false
		}, options);
		this._root = (0, _utils.$)(root);
		this._container = this.options.container && (0, _utils.$)(this.options.container);
		this._rootSize = 0;
		this._containerPosition = 0;
		this._style = style[this.options.horizontal ? "horizontal" : "vertical"];
		this.resize();
	}

	Parallax.prototype._checkParallaxItem = function _checkParallaxItem(element) {
		if (!element) {
			return;
		}
		var selector = this.options.selector;

		if (!element.__IMAGE__) {
			var img = element.querySelector(selector);

			element.__IMAGE__ = img || -1;
			if (element.__IMAGE__ === -1) {
				return;
			}
			element.__BOX__ = img.parentNode;
		}
		if (element.__IMAGE__ === -1) {
			return;
		}
		var sizeName = this._style.cammelSize;

		element.__IMAGE__.__SIZE__ = element.__IMAGE__["offset" + sizeName];
		element.__BOX__.__SIZE__ = element.__BOX__["offset" + sizeName];
	};
	/**
  * As the browser is resized, the gaps between the root and the container and the size of the items are updated.
  * @ko 브라우저의 크기가 변경됨으로 써 root와 container의 간격과 아이템들의 크기를 갱신한다.
  * @method eg.Parallax#resize
  * @param {Array} [items = []] Items to apply parallax. It does not apply if it is not in visible range. <ko>parallax를 적용할 아이템들. 가시거리에 존재하지 않으면 적용이 안된다.</ko>
  * @return {eg.Parallax} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
 ```js
 window.addEventListener("resize", function (e) {
 parallax.resize(items);
 });
 ```
  */


	Parallax.prototype.resize = function resize() {
		var _this = this;

		var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

		var root = this._root;
		var container = this._container;
		var positionName = this._style.position;
		var sizeName = this._style.cammelSize;

		if (!container || root === container) {
			this._containerPosition = 0;
		} else {
			var rootRect = ((0, _utils.isWindow)(root) ? document.body : root).getBoundingClientRect();
			var containertRect = container.getBoundingClientRect();

			this._containerPosition = containertRect[positionName] - rootRect[positionName];
		}
		this._rootSize = (0, _utils.isWindow)(root) ? window["inner" + sizeName] || document.documentElement["client" + sizeName] : root["client" + sizeName];
		if (_consts.isMobile & (0, _utils.isWindow)(root)) {
			var bodyWidth = document.body.offsetWidth || document.documentElement.offsetWidth;
			var windowWidth = window.innerWidth;

			this._rootSize = this._rootSize / (bodyWidth / windowWidth);
		}
		items.forEach(function (item) {
			_this._checkParallaxItem(item.el);
		});

		return this;
	};
	/**
  * Scrolls the image in the item by a parallax.
  * @ko 스크롤하면 아이템안의 이미지를 시차적용시킨다.
  * @method eg.Parallax#refresh
  * @param {Array} [items = []] Items to apply parallax. It does not apply if it is not in visible range. <ko>parallax를 적용할 아이템들. 가시거리에 존재하지 않으면 적용이 안된다.</ko>
  * @param {Number} [scrollPositionStart = 0] The scroll position.
  * @return {eg.Parallax} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
 ```js
 document.body.addEventListener("scroll", function (e) {
 parallax.refresh(items, e.scrollTop);
 });
 ```
  */


	Parallax.prototype.refresh = function refresh() {
		var _this2 = this;

		var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var scrollPositionStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		var styleNames = this._style;
		var positionName = styleNames.position;
		var coordinateName = styleNames.coordinate;
		var sizeName = styleNames.size;
		var options = this.options;
		var strength = options.strength,
		    center = options.center,
		    range = options.range,
		    align = options.align;

		var rootSize = this._rootSize;
		var scrollPositionEnd = scrollPositionStart + rootSize;
		var containerPosition = this._containerPosition;

		items.forEach(function (item) {
			if (!item.rect || !item.size || !item.el) {
				return;
			}
			var position = containerPosition + item.rect[positionName];
			var itemSize = item.rect[sizeName] || item.size[sizeName];

			// check item is in container.
			if (scrollPositionStart > position + itemSize || scrollPositionEnd < position) {
				return;
			}
			var el = item.el;

			if (!el.__IMAGE__) {
				_this2._checkParallaxItem(el);
			}
			if (el.__IMAGE__ === -1) {
				return;
			}
			var imageElement = el.__IMAGE__;
			var boxElement = el.__BOX__;
			var boxSize = boxElement.__SIZE__;
			var imageSize = imageElement.__SIZE__;

			// no parallax
			if (boxSize >= imageSize) {
				// remove transform style
				imageElement.style[TRANSFORM] = "";
				return;
			}

			// if area's position is center, ratio is 0.
			// if area is hidden at the top, ratio is 1.
			// if area is hidden at the bottom, ratio is -1.
			var imagePosition = position + boxSize / 2;
			var ratio = (scrollPositionStart + rootSize / 2 - (rootSize + boxSize) / 2 * center - imagePosition) / (rootSize + boxSize) * 2 * strength;

			// if ratio is out of the range of -1 and 1, show empty space.
			ratio = Math.max(Math.min(ratio, range[1]), range[0]);

			// dist is the position when thumnail's image is centered.
			var dist = (boxSize - imageSize) / 2;
			var translate = dist * (1 - ratio);

			if (align === CENTER) {
				translate -= dist;
			}

			imageElement.__TRANSLATE__ = translate;
			imageElement.__RATIO__ = ratio;
			imageElement.style[TRANSFORM] = "translate" + coordinateName + "(" + translate + "px)";
		});
		return this;
	};

	return Parallax;
}();

module.exports = Parallax;

/***/ }),
/* 3 */
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

var _browser = __webpack_require__(1);

var _consts = __webpack_require__(0);

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

/***/ })
/******/ ]);
});
//# sourceMappingURL=parallax.js.map