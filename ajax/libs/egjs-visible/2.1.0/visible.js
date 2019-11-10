/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/visible project is licensed under the MIT license
 * 
 * @egjs/visible JavaScript library
 * 
 * 
 * @version 2.1.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@egjs/component"));
	else if(typeof define === 'function' && define.amd)
		define(["@egjs/component"], factory);
	else if(typeof exports === 'object')
		exports["Visible"] = factory(require("@egjs/component"));
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Visible"] = factory(root["eg"]["Component"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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


var _Visible = __webpack_require__(1);

var _Visible2 = _interopRequireDefault(_Visible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = _Visible2["default"]; /**
                                        * Copyright (c) NAVER Corp.
                                        * egjs-visible projects are licensed under the MIT license
                                        */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Copyright (c) NAVER Corp.
                                                                                                                                                                                                                                                                               * egjs-visible projects are licensed under the MIT license
                                                                                                                                                                                                                                                                               */


var _component = __webpack_require__(2);

var _component2 = _interopRequireDefault(_component);

var _utils = __webpack_require__(3);

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
var SUPPORT_OBSERVER = !!window.IntersectionObserver;
var SUPPORT_ELEMENTS_BY_CLASSNAME = function () {
	var dummy = document.createElement("div");

	if (!dummy.getElementsByClassName) {
		return false;
	}

	var dummies = dummy.getElementsByClassName("dummy");

	dummy.innerHTML = "<span class='dummy'></span>";
	return dummies.length === 1;
}();

/* eslint-enable */

/**
 * A Class used to check whether an element is visible in the base element or viewport.
 * @ko 엘리먼트가 기준 엘리먼트나 뷰포트 안에 보이는지 확인하는 클래스
 * @alias eg.Visible
 * @extends eg.Component
 *
 * @support {"ie": "8+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
 */

var Visible = function (_Component) {
	_inherits(Visible, _Component);

	/**
  * @param {HTMLElement|String|jQuery} [element=document] A base element that detects if another element is visible<ko>엘리먼트가 보이는 기준 엘리먼트</ko>
  * @param {Object} options The option object of the Visible module<ko>Visible 모듈의 옵션 객체</ko>
  * @param {String} [options.targetClass="check_visible"] The class name of the element to be checked<ko>보이는지 확인할 엘리먼트의 클래스 이름</ko>
  * @param {Number} [options.expandSize=0] The size of the expanded area to be checked whether an element is visible. If this value is less than zero, the size of the area is smaller than that of the base element. <ko>기준 엘리먼트의 경계를 넘어 엘리먼트가 보이는지 확인할 영역의 크기. 값이 0보다 작으면 엘리먼트가 보이는지 확인할 영역의 크기가 기준 엘리먼트보다 작아진다</ko>
  */
	function Visible(element, options) {
		_classCallCheck(this, Visible);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.options = {
			targetClass: "check_visible",
			expandSize: 0
		};
		_extends(_this.options, options);
		_this._wrapper = (0, _utils.$)(element) || document;

		// this._wrapper is Element, or may be Window
		if (_this._wrapper.nodeType && _this._wrapper.nodeType === 1) {
			_this._getAreaRect = _this._getWrapperRect;
		} else {
			_this._getAreaRect = _utils.getWindowRect;
		}

		_this._targets = [];
		_this._timer = null;
		_this.refresh();
		return _this;
	}
	/**
  * Updates the list of elements where the visibility property is to be checked
  * @ko visibility 속성을 검사할 엘리먼트의 목록을 갱신한다
  * @return {eg.Visible} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  *
  * @remark
  * If targets was added or removed from DOM tree, must call refresh method to update internal target list.
  * <ko>확인 대상이 영역 안에 추가되거나 삭제된 경우, 모듈내부에서 사용하는 확인 대상 목록을 이 메소드를 호출하여 갱신해야한다.<ko>
  */


	Visible.prototype.refresh = function refresh() {
		if (SUPPORT_ELEMENTS_BY_CLASSNAME) {
			this._targets = this._wrapper.getElementsByClassName(this.options.targetClass);
			this.refresh = function () {
				this._refreshObserver();
				return this;
			};
		} else {
			this.refresh = function () {
				var targets = this._wrapper.querySelectorAll("." + this.options.targetClass);

				this._targets = [];
				for (var i = 0; i < targets.length; i++) {
					this._targets.push(targets[i]);
				}
				this._refreshObserver();
				return this;
			};
		}
		return this.refresh();
	};

	/**
  * Checks whether the visible of the target elements has changed. It trigger that change event on a component.
  * @ko 대상 엘리먼트의 가시성이 변경됐는지 체크한다. change 이벤트를 발생한다.
  * @param {Number} [delay=-1] Delay time. It delay that change event trigger.<ko>지연시간. change 이벤트 발생을 지연한다.</ko>
  * @param {Boolean} [containment=false] Whether to check only elements that are completely contained within the reference area.<ko>기준 영역 안에 완전히 포함된 엘리먼트만 체크할지 여부.</ko>
  * @return {eg.Visible} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	Visible.prototype.check = function check() {
		var _this2 = this;

		var delay = arguments.length <= 0 ? undefined : arguments[0];
		var containment = arguments.length <= 1 ? undefined : arguments[1];

		if (typeof delay !== "number") {
			containment = delay;
			delay = -1;
		}

		if (typeof delay === "undefined") {
			delay = -1;
		}

		if (typeof containment === "undefined") {
			containment = false;
		}

		clearTimeout(this._timer);
		if (delay < 0) {
			this._check(containment);
			this._checkAfter();
		} else {
			this._timer = setTimeout(function () {
				_this2._check(containment);
				_this2._checkAfter();
				_this2._timer = null;
			}, delay);
		}
		return this;
	};

	Visible.prototype._getWrapperRect = function _getWrapperRect() {
		return this._wrapper.getBoundingClientRect();
	};

	Visible.prototype._reviseElements = function _reviseElements() {
		var _this3 = this;

		if (SUPPORT_ELEMENTS_BY_CLASSNAME) {
			this._reviseElements = function () {
				return true;
			};
		} else {
			this._reviseElements = function (target, i) {
				if (!(0, _utils.hasClass)(target, _this3.options.targetClass)) {
					target.__VISIBLE__ = null;
					_this3._targets.splice(i, 1);
					return false;
				}
				return true;
			};
		}
		return this._reviseElements.apply(this, arguments);
	};

	Visible.prototype._check = function _check(containment) {
		var expandSize = parseInt(this.options.expandSize, 10);

		var i = void 0;
		var target = void 0;
		var targetArea = void 0;
		var after = void 0;

		// Error Fix: Cannot set property top of #<ClientRect> which has only a getter
		var rect = this._getAreaRect();
		var area = {
			top: rect.top - expandSize,
			left: rect.left - expandSize,
			bottom: rect.bottom + expandSize,
			right: rect.right + expandSize
		};

		for (i = this._targets.length - 1; target = this._targets[i]; i--) {
			targetArea = target.getBoundingClientRect();

			if (targetArea.width === 0 && targetArea.height === 0) {
				continue;
			}

			if (!this._reviseElements(target, i)) {
				continue;
			}
			if (containment) {
				after = !(targetArea.top < area.top || targetArea.bottom > area.bottom || targetArea.right > area.right || targetArea.left < area.left);
			} else {
				after = !(targetArea.bottom < area.top || area.bottom < targetArea.top || targetArea.right < area.left || area.right < targetArea.left);
			}
			target.__AFTER__ = after;
		}
	};

	Visible.prototype.checkObserve = function checkObserve() {
		var _this4 = this;

		var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

		if (this._timer) {
			clearTimeout(this._timer);
			this._timer = 0;
		}
		if (delay < 0) {
			this._checkAfter();
		} else {
			this._timer = setTimeout(function () {
				_this4._checkAfter();
				_this4._timer = null;
			}, delay);
		}
		return this;
	};

	Visible.prototype._checkAfter = function _checkAfter() {
		var targets = this._targets;
		var length = targets.length;
		var visibles = [];
		var invisibles = [];

		for (var i = 0; i < length; ++i) {
			var target = targets[i];
			var prev = target.__VISIBLE__;
			var after = target.__AFTER__;

			if (prev === after) {
				continue;
			}
			if (after) {
				visibles.push(target);
			} else {
				invisibles.push(target);
			}
			target.__VISIBLE__ = after;
		}
		if (visibles.length === 0 && invisibles.length === 0) {
			return;
		}
		/**
   * This event is fired when the event is compared with the last verified one and there is an element of which the visibility property has changed.
   * @ko 마지막으로 확인한 결과와 비교해 visibility 속성이 변경된 엘리먼트가 있을 때 발생하는 이벤트
   * @name eg.Visible#change
   * @event
   * @type {obejct} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
   * @property {Array} visible Visible elements  (the element type is `HTMLElement`) <ko>보이게 된 엘리먼트들</ko>
   * @property {Array} invisible Invisible elements  (the element type is `HTMLElement`) <ko>안 보이게 된 엘리먼트들</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
   */
		this.trigger("change", {
			visible: visibles,
			invisible: invisibles,
			isTrusted: true // This event is called by 'check' method.
		});
	};
	/**
  * Observe whether the visible of the target elements has changed. It trigger that change event on a component.
  * @ko 대상 엘리먼트의 가시성이 변경됐는지 관찰한다. change 이벤트를 발생한다.
  * @param {Object} [options={}]  Options to observe the target elements. <ko>대상 엘리먼트를 관찰하기 위한 옵션들.</ko>
  * @param {Number} [options.delay=-1] Delay time. It delay that change event trigger.<ko>지연시간. change 이벤트 발생을 지연한다.</ko>
  * @param {Boolean} [options.containment=false] Whether to check only elements that are completely contained within the reference area.<ko>기준 영역 안에 완전히 포함된 엘리먼트만 체크할지 여부.</ko>
  * @return {eg.Visible} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	Visible.prototype.observe = function observe() {
		var _this5 = this;

		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		if (!SUPPORT_OBSERVER) {
			this._addObserveEvent(options);
			return this;
		}
		var delay = typeof options.delay === "undefined" ? -1 : options.delay;
		var containment = !!options.containment;

		this._observeCallback = function (entries) {
			entries.forEach(function (entry) {
				entry.target.__AFTER__ = containment ? entry.intersectionRatio >= 1 : entry.isIntersecting;
			});
			_this5._checkAfter(delay);
		};
		if (this._observer) {
			this.unobserve();
		}
		this._observer = new IntersectionObserver(this._observeCallback, {
			root: this._wrapper.nodeType === 1 ? this._wrapper : null,
			rootMargin: this.options.expandSize + "px",
			threshold: containment ? [0, 1] : [0]
		});
		var observer = this._observer;
		var targets = this._targets;
		var length = targets.length;

		for (var i = 0; i < length; ++i) {
			observer.observe(targets[i]);
		}
		return this;
	};

	Visible.prototype.unobserve = function unobserve() {
		if (!this._observeCallback) {
			return this;
		}
		if (SUPPORT_OBSERVER) {
			this._observer && this._observer.disconnect();
		} else {
			(0, _utils.removeEvent)(this._wrapper, "scroll", this._observeCallback);
			(0, _utils.removeEvent)(this._wrapper, "resize", this._observeCallback);
		}
		this._observer = null;
		this._observeCallback = null;
		return this;
	};

	Visible.prototype._refreshObserver = function _refreshObserver() {
		if (!this._observer) {
			return;
		}
		this._observer.disconnect();
		var targets = this._targets;
		var length = targets.length;

		for (var i = 0; i < length; ++i) {
			this._observer.observe(targets[i]);
		}
	};

	Visible.prototype._addObserveEvent = function _addObserveEvent() {
		var _this6 = this;

		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		if (this._observeCallback) {
			return;
		}
		var delay = typeof options.delay === "undefined" ? -1 : options.delay;
		var containment = !!options.containment;

		this._observeCallback = function (e) {
			_this6._check(containment);
			_this6.checkObserve(delay);
		};
		(0, _utils.addEvent)(this._wrapper, "scroll", this._observeCallback);
		(0, _utils.addEvent)(this._wrapper, "resize", this._observeCallback);

		this._observeCallback();
	};

	Visible.prototype.destroy = function destroy() {
		this.off();
		this.unobserve();
		this._targets = [];
		this._wrapper = null;
		this._timer = null;
	};

	return Visible;
}(_component2["default"]);

Visible.VERSION = "2.1.0";
exports["default"] = Visible;
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.toArray = toArray;
exports.$ = $;
exports.getWindowRect = getWindowRect;
exports.hasClass = hasClass;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;

var SUPPORT_ADDEVENTLISTENER = !!("addEventListener" in document);
var SUPPORT_PASSIVE = function () {
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

/**
 * Select or create element
 * @param {String|HTMLElement|jQuery} param
 *  when string given is as HTML tag, then create element
 *  otherwise it returns selected elements
 * @param {Boolean} multi
 * @returns {HTMLElement|HTMLElement[]|undefined}
 */
function $(param) {
	var multi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	var el = void 0;

	if (param === undefined) {
		return undefined;
	}

	if (typeof param === "string") {
		// String (HTML, Selector)
		// check if string is HTML tag format
		var match = param.match(/^<([a-z]+)\s*([^>]*)>/);

		// creating element
		if (match) {
			// HTML
			var dummy = document.createElement("div");

			dummy.innerHTML = param;
			el = toArray(dummy.childNodes);
		} else {
			// Selector
			el = toArray(document.querySelectorAll(param));
		}
		if (!multi) {
			el = el.length >= 1 ? el[0] : undefined;
		}
	} else if (param === window) {
		// window
		el = param;
	} else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
		// HTMLElement, Document
		el = param;
	} else if ("jQuery" in window && param instanceof jQuery || param.constructor.prototype.jquery) {
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
function getWindowRect() {
	// [IE7] document.documentElement.clientHeight has always value 0 (bug)
	return {
		top: 0,
		left: 0,
		bottom: document.documentElement.clientHeight || document.body.clientHeight,
		right: document.documentElement.clientWidth || document.body.clientWidth
	};
}
function hasClass(el, className) {
	if (el.classList) {
		return el.classList.contains(className);
	} else {
		return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
	}
}
function addEvent(element, type, handler, eventListenerOptions) {
	if (SUPPORT_ADDEVENTLISTENER) {
		var options = eventListenerOptions || false;

		if ((typeof eventListenerOptions === "undefined" ? "undefined" : _typeof(eventListenerOptions)) === "object") {
			options = SUPPORT_PASSIVE ? eventListenerOptions : false;
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

/***/ })
/******/ ]);
});