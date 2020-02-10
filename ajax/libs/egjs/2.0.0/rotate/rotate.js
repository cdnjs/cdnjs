/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/rotate project is licensed under the MIT license
 * 
 * @egjs/rotate JavaScript library
 * 
 * 
 * @version 2.0.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("rotate", [], factory);
	else if(typeof exports === 'object')
		exports["rotate"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["rotate"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _browser = __webpack_require__(1);

exports["default"] = function () {
	var beforeScreenWidth = -1;
	var beforeVertical = null;
	var USER_LISTENERS = []; // user's event listener

	var agent = function () {
		var ua = _browser.window.navigator.userAgent;
		var match = ua.match(/(iPhone OS|CPU OS|Android)\s([^\s;-]+)/); // fetch Android & iOS env only
		var res = {
			os: "",
			version: ""
		};

		if (match) {
			res.os = match[1].replace(/(?:CPU|iPhone)\sOS/, "ios").toLowerCase();
			res.version = match[2].replace(/\D/g, ".");
		}

		return res;
	}();

	var isMobile = /android|ios/.test(agent.os);

	if (!isMobile) {
		return undefined;
	}

	/**
  * Return event name string for orientationChange according browser support
  */
	var ORIENTATION_CHANGE_EVENT = function () {
		var type = void 0;

		/**
   * Some platform/broswer returns previous widht/height state value. For workaround, give some delays.
   *
   * Android bug:
   * - Andorid 2.3 - Has orientationchange with bug. Needs 500ms delay.
   *
   *   Note: Samsung's branded Android 2.3
   *   When check orientationchange using resize event, could cause browser crash if user binds resize event on window
   *
   * - Android 2.2 - orientationchange fires twice(at first time width/height are not updated, but second returns well)
   * - Lower than 2.2 - use resize event
   *
   * InApp bug:
   * - Set 200ms delay
   */
		if (agent.os === "android" && agent.version === "2.1") {
			type = "resize";
		} else {
			type = "onorientationchange" in _browser.window ? "orientationchange" : "resize";
		}

		return type;
	}();

	/**
  * When viewport orientation is portrait, return true otherwise false
  */
	function isVertical() {
		var screenWidth = void 0;
		var degree = void 0;
		var vertical = void 0;

		if (ORIENTATION_CHANGE_EVENT === "resize") {
			screenWidth = _browser.document.documentElement.clientWidth;

			if (beforeScreenWidth === -1) {
				// first call isVertical
				vertical = screenWidth < _browser.document.documentElement.clientHeight;
			} else {
				if (screenWidth < beforeScreenWidth) {
					vertical = true;
				} else if (screenWidth === beforeScreenWidth) {
					vertical = beforeVertical;
				} else {
					vertical = false;
				}
			}
		} else {
			degree = _browser.window.orientation;

			if (degree === 0 || degree === 180) {
				vertical = true;
			} else if (degree === 90 || degree === -90) {
				vertical = false;
			}
		}
		return vertical;
	}

	/**
  * Trigger rotate event
  */
	function triggerRotate(e) {
		var currentVertical = isVertical();

		if (isMobile) {
			if (beforeVertical !== currentVertical) {
				beforeVertical = currentVertical;
				beforeScreenWidth = _browser.document.documentElement.clientWidth;

				USER_LISTENERS.forEach(function (v) {
					return v(e, {
						isVertical: beforeVertical
					});
				});
			}
		}
	}

	/**
  * Trigger event handler
  */
	function handler(e) {
		var rotateTimer = null;

		if (ORIENTATION_CHANGE_EVENT === "resize") {
			_browser.window.setTimeout(function () {
				return triggerRotate(e);
			}, 0);
		} else {
			if (agent.os === "android") {
				var screenWidth = _browser.document.documentElement.clientWidth;

				if (e.type === "orientationchange" && screenWidth === beforeScreenWidth) {
					_browser.window.setTimeout(function () {
						return handler(e);
					}, 500);

					// When width value wasn't changed after firing orientationchange, then call handler again after 300ms.
					return false;
				}
			}

			rotateTimer && _browser.window.clearTimeout(rotateTimer);
			rotateTimer = _browser.window.setTimeout(function () {
				return triggerRotate(e);
			}, 300);
		}

		return undefined;
	}

	/**
  * Tiny custom rotate event binder
  * @ko 기기 회전에 따른 rotate 커스텀 이벤트 바인더
  * @namespace eg.rotate
  *
  * @param {Event} e Native event object<ko>네이티브 이벤트 객체</ko>
  * @param {Object} info The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
  * @param {Boolean} info.isVertical The orientation of the device (true: portrait, false: landscape) <ko>기기의 화면 방향(true: 수직 방향, false: 수평 방향)</ko>
  * @support { "ios" : "7+", "an" : "2.1+ (except 3.x)"}
  * @example
  * var handler = function(e, info){
  *      info.isVertical;
  * }
  * // bind
  * eg.rotate.on(handler);
  *
  * // unbind
  * eg.rotate.off(handler);
  *
  * // unbind all event attached (call without listener param)
  * eg.rotate.off();
  */
	return {
		/**
   * Bind rotate event
   * @ko rotate 이벤트 바인딩
   * @memberof eg.rotate
   * @static
   * @param {Function} listener listener function <ko>이벤트 핸들러 함수</ko>
   */
		on: function on(listener) {
			if (typeof listener !== "function") {
				return;
			}

			beforeVertical = isVertical();
			beforeScreenWidth = _browser.document.documentElement.clientWidth;
			USER_LISTENERS.push(listener);

			// only attach once
			USER_LISTENERS.length === 1 && _browser.window.addEventListener(ORIENTATION_CHANGE_EVENT, handler);
		},


		/**
   * Unbind rotate event
   * Without param, will unbind all binded listeners
   * @ko rotate 이벤트 바인딩 해제. 파라미터 없이 호출되는 경우, 바인딩된 모든 이벤트를 해제한다.
   * @memberof eg.rotate
   * @static
   * @param {Function} [listener] listener function <ko>이벤트 핸들러 함수</ko>
   */
		off: function off(listener) {
			if (typeof listener === "function") {
				// remove given listener from list
				for (var i = 0, el; el = USER_LISTENERS[i]; i++) {
					if (el === listener) {
						USER_LISTENERS.splice(i, 1);
						break;
					}
				}
			}

			// detach when the condition is met
			if (!listener || USER_LISTENERS.length === 0) {
				USER_LISTENERS.splice(0);
				_browser.window.removeEventListener(ORIENTATION_CHANGE_EVENT, handler);
			}
		},


		/**
   * Native event name used to detect rotate
   * @ko roate 이벤트를 위해 사용된 네이티브 이벤트 명
   * @memberof eg.rotate
   * @property {String} event event name <ko>이벤 명</ko>
   * @private
   */
		orientationChange: ORIENTATION_CHANGE_EVENT,

		/**
   * Get device is in vertical mode
   * @ko 화면이 수직 방향인지 여부
   * @memberof eg.rotate
   * @static
   * @method
   * @return {Boolean} The orientation of the device (true: portrait, false: landscape) <ko>기기의 화면 방향(true: 수직 방향, false: 수평 방향)</ko>
   * @example
   *   eg.rotate.isVertical();  // Check if device is in portrait mode
   */
		isVertical: isVertical,

		/**
   * Trigger rotate event
   * @memberof eg.rotate
   * @private
   */
		triggerRotate: triggerRotate,

		/**
   * Event handler function
   * @memberof eg.rotate
   * @private
   */
		handler: handler
	};
}(); /**
      * Copyright (c) 2015 NAVER Corp.
      * egjs projects are licensed under the MIT license
      */


module.exports = exports["default"];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable no-new-func, no-nested-ternary */
var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func, no-nested-ternary */

var document = win.document;

exports.window = win;
exports.document = document;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _rotate = __webpack_require__(0);

var _rotate2 = _interopRequireDefault(_rotate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = _rotate2["default"]; /**
                                       * Copyright (c) 2015 NAVER Corp.
                                       * egjs projects are licensed under the MIT license
                                       */

/***/ })
/******/ ]);
});