(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require(undefined));
	else if(typeof define === 'function' && define.amd)
		define("Visible", [], factory);
	else if(typeof exports === 'object')
		exports["Visible"] = factory(require(undefined));
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__egjs_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__egjs_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__egjs_component__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright (c) NAVER Corp.
 * egjs-visible projects are licensed under the MIT license
 */


var EVENTS = {
	"change": "change"
};

/**
 * A Class used to check whether an element is visible in the base element or viewport.
 * @ko 엘리먼트가 기준 엘리먼트나 뷰포트 안에 보이는지 확인하는 클래스
 * @alias eg.Visible
 * @extends eg.Component
 *
 * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
 * @codepen {"id":"WbWzqq", "ko":"Visible 기본 예제", "en":"Visible basic example", "collectionId":"Ayrabj", "height" : 403}
 */

var Visible = function (_Component) {
	_inherits(Visible, _Component);

	/**
  * @param {HTMLElement|String|jQuery} [element=document] A base element that detects if another element is visible<ko>엘리먼트가 보이는 기준 엘리먼트</ko>
  * @param {Object} options The option object of the Visible module<ko>Visible 모듈의 옵션 객체</ko>
  * @param {String} [options.targetClass="check_visible"] The class name of the element to be checked<ko>보이는지 확인할 엘리먼트의 클래스 이름</ko>
  * @param {Number} [options.expandSize=0] The size of the expanded area to be checked whether an element is visible. If this value is less than zero, the size of the area is smaller than that of the base element. <ko>기준 엘리먼트의 경계를 넘어 엘리먼트가 보이는지 확인할 영역의 크기. 값이 0보다 작으면 엘리먼트가 보이는지 확인할 영역의 크기가 기준 엘리먼트보다 작아진다</ko>
  */
	function Visible(element, options, _prefix) {
		_classCallCheck(this, Visible);

		var _this = _possibleConstructorReturn(this, (Visible.__proto__ || Object.getPrototypeOf(Visible)).call(this));

		_this._prefix = _prefix || "";
		_this.options = {
			targetClass: "check_visible",
			expandSize: 0
		};
		Object.assign(_this.options, options);

		if (element === undefined) {
			_this._wrapper = document;
		}if ((typeof element === "undefined" ? "undefined" : _typeof(element)) === "object") {
			_this._wrapper = element;
		} else if (typeof element === "string") {
			_this._wrapper = document.querySelector(element);
		}

		// this._wrapper is Element, or may be Window
		if (_this._wrapper.nodeType && _this._wrapper.nodeType === 1) {
			_this._getAreaRect = _this._getWrapperRect;
		} else {
			_this._getAreaRect = Visible._getWindowRect;
		}

		_this._targets = [];
		_this._timer = null;
		_this._supportElementsByClassName = function () {
			var dummy = document.createElement("div");

			if (!dummy.getElementsByClassName) {
				return false;
			}

			var dummies = dummy.getElementsByClassName("dummy");

			dummy.innerHTML = "<span class='dummy'></span>";
			return dummies.length === 1;
		}();

		_this.refresh();
		return _this;
	}

	_createClass(Visible, [{
		key: "refresh",


		/**
   * Updates the list of elements where the visibility property is to be checked
   * @ko visibility 속성을 검사할 엘리먼트의 목록을 갱신한다
   * @return {eg.Visible} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   *
   * @remark
   * If targets was added or removed from DOM tree, must call refresh method to update internal target list.
   * <ko>확인 대상이 영역 안에 추가되거나 삭제된 경우, 모듈내부에서 사용하는 확인 대상 목록을 이 메소드를 호출하여 갱신해야한다.<ko>
   */
		value: function refresh() {
			var _this2 = this;

			if (this._supportElementsByClassName) {
				this._targets = this._wrapper.getElementsByClassName(this.options.targetClass);
				this.refresh = function () {
					return _this2;
				};
			} else {
				this.refresh = function () {
					_this2._targets = _this2._wrapper.querySelector(_this2.option.targetClass);
					return _this2;
				};
			}
			return this.refresh();
		}

		/**
   * Checks whether the visible of the target elements has changed. It trigger that change event on a component.
   * @ko 대상 엘리먼트의 가시성이 변경됐는지 체크한다. change 이벤트를 발생한다.
   * @param {Number} [delay=-1] Delay time. It delay that change event trigger.<ko>지연시간. change 이벤트 발생을 지연한다.</ko>
   * @param {Boolean} [containment=false] Whether to check only elements that are completely contained within the reference area.<ko>기준 영역 안에 완전히 포함된 엘리먼트만 체크할지 여부.</ko>
   * @return {eg.Visible} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   */

	}, {
		key: "check",
		value: function check() {
			var _this3 = this;

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
			} else {
				this._timer = setTimeout(function () {
					_this3._check(containment);
					_this3._timer = null;
				}, delay);
			}
			return this;
		}
	}, {
		key: "_getWrapperRect",
		value: function _getWrapperRect() {
			return this._wrapper.getBoundingClientRect();
		}
	}, {
		key: "_reviseElements",
		value: function _reviseElements() {
			var _this4 = this;

			for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
				params[_key] = arguments[_key];
			}

			if (this._supportElementsByClassName) {
				this._reviseElements = function () {
					return true;
				};
			} else {
				this._reviseElements = function (target, i) {
					if (Visible._hasClass(params[0], _this4.options.targetClass)) {
						target.__VISIBLE__ = null;
						_this4._targets.splice(i, 1);
						return false;
					}
					return true;
				};
			}
			return this._reviseElements.apply(this, params);
		}
	}, {
		key: "_check",
		value: function _check(containment) {
			var expandSize = parseInt(this.options.expandSize, 10);
			var visibles = [];
			var invisibles = [];

			var i = void 0;
			var target = void 0;
			var targetArea = void 0;
			var before = void 0;
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

				if (this._reviseElements(target, i)) {
					before = !!target.__VISIBLE__;

					if (containment) {
						after = !(targetArea.top < area.top || targetArea.bottom > area.bottom || targetArea.right > area.right || targetArea.left < area.left);
						target.__VISIBLE__ = after;
					} else {
						after = !(targetArea.bottom < area.top || area.bottom < targetArea.top || targetArea.right < area.left || area.right < targetArea.left);
						target.__VISIBLE__ = after;
					}

					if (before !== after) {
						if (after) {
							visibles.unshift(target);
						} else {
							invisibles.unshift(target);
						}
					}
				}
			}
			/**
    * This event is fired when the event is compared with the last verified one and there is an element of which the visibility property has changed.
    * @ko 마지막으로 확인한 결과와 비교해 visibility 속성이 변경된 엘리먼트가 있을 때 발생하는 이벤트
    * @event eg.Visible#change
    * @param {Array} visible Visible elements  (the element type is `HTMLElement`) <ko>보이게 된 엘리먼트들</ko>
    * @param {Array} invisible Invisible elements  (the element type is `HTMLElement`) <ko>안 보이게 된 엘리먼트들</ko>
    */
			this.trigger(this._prefix + EVENTS.change, {
				visible: visibles,
				invisible: invisibles
			});
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.off();
			this._targets = [];
			this._wrapper = null;
			this._timer = null;
		}

		/**
   * A jQuery custom event of the Visible module. This event is fired when the event is compared with the last verified one and there is an element of which the visibility property has changed.
   *
   * @ko Visible 모듈의 jQuery 커스텀 이벤트. 마지막으로 확인한 결과와 비교해 visibility 속성이 변경된 엘리먼트가 있을 때 발생한다
   * @name jQuery#visible:change
   * @event
   * @example
   // create
   $("body").visible();
   // event
   $("body").on("visible:change",callback);
   $("body").off("visible:change",callback);
   $("body").trigger("visible:change",callback);
   * @see Visble
   */
		/**
   * A jQuery plugin available in the Visible module.
   * @ko Visible 모듈의 jQuery 플러그인
   * @method jQuery.visible
   * @example
   // create
   $("body").visible();
   // event
   $("body").on("visible:change",callback);
   $("body").off("visible:change",callback);
   $("body").trigger("visible:change",callback);
   // method
   $("body").visible("option","circular",true); //Set option
   $("body").visible("instance"); // Return flicking instance
   $("body").visible("check",10); // Check to change target elements.
   * @see Visble#event:change
   */

	}], [{
		key: "_hasClass",
		value: function _hasClass(el, className) {
			if (el.classList) {
				return el.classList.contains(className);
			} else {
				return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
			}
		}
	}, {
		key: "_getWindowRect",
		value: function _getWindowRect() {
			// [IE7] document.documentElement.clientHeight has always value 0 (bug)
			return {
				top: 0,
				left: 0,
				bottom: document.documentElement.clientHeight || document.body.clientHeight,
				right: document.documentElement.clientWidth || document.body.clientWidth
			};
		}
	}]);

	return Visible;
}(__WEBPACK_IMPORTED_MODULE_0__egjs_component___default.a);

/* harmony default export */ __webpack_exports__["default"] = (Visible);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Visible = __webpack_require__(0).default;

module.exports = Visible;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=visible.js.map