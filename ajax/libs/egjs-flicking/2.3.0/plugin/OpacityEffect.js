/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/flicking project is licensed under the MIT <https://naver.github.io/egjs/license.txt> license
 * 
 * @egjs/flicking JavaScript library
 * https://github.com/naver/egjs-flicking
 * 
 * @version 2.3.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@egjs/flicking"));
	else if(typeof define === 'function' && define.amd)
		define("OpacityEffect", ["@egjs/flicking"], factory);
	else if(typeof exports === 'object')
		exports["OpacityEffect"] = factory(require("@egjs/flicking"));
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Flicking"] = root["eg"]["Flicking"] || {}, root["eg"]["Flicking"]["plugin"] = root["eg"]["Flicking"]["plugin"] || {}, root["eg"]["Flicking"]["plugin"]["OpacityEffect"] = factory(root["eg"]["Flicking"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__2__) {
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Flicking = __webpack_require__(2);

var _Flicking2 = _interopRequireDefault(_Flicking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright (c) 2015 NAVER Corp.
                                                                                                                                                           * egjs projects are licensed under the MIT license
                                                                                                                                                           */


// is to through pass Flicking's utils & constants to plugins
var utils = _Flicking2["default"].utils;
var consts = utils.extend(utils.extend({}, _Flicking2["default"].consts), {
	DIRECTION_NONE: _Flicking2["default"].DIRECTION_NONE,
	DIRECTION_LEFT: _Flicking2["default"].DIRECTION_LEFT,
	DIRECTION_RIGHT: _Flicking2["default"].DIRECTION_RIGHT,
	DIRECTION_UP: _Flicking2["default"].DIRECTION_UP,
	DIRECTION_DOWN: _Flicking2["default"].DIRECTION_DOWN,
	DIRECTION_HORIZONTAL: _Flicking2["default"].DIRECTION_HORIZONTAL,
	DIRECTION_VERTICAL: _Flicking2["default"].DIRECTION_VERTICAL,
	DIRECTION_ALL: _Flicking2["default"].DIRECTION_ALL
});

/**
 * Base class to generate flicking plugin
 * Lifecyle: componentWillMount --> componentMount --> componentDidMount --> componentWillUnmount
 * @ko Flicking 플러그인을 생성하기 위한 기본 클래스
 * @alias eg.Flicking.plugin
 * @private
 */

var Plugin = function () {
	/**
  * Constructor
  * @param {Object} options Option object <ko>옵션 객체</ko>
  */
	function Plugin() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Plugin);

		this.options = options;
	}

	/**
  * Before mounting. It's init point from Flicking instance
  * @param {Flicking} instance Flicking instance
  * @returns {Plugin}
  */


	Plugin.prototype.$componentWillMount = function $componentWillMount(instance) {
		this.$$ = instance;

		// get hint and layer-hack setting
		this.useWillChange = instance.$container.style.willChange === "transform";
		this.useLayerHack = this.getInstanceConf().useLayerHack;

		this.bindEvents();
		this.$componentMount();
		this.$componentDidMount();

		return this;
	};

	/**
  * After mounting
  * @return {Plugin}
  */


	Plugin.prototype.$componentDidMount = function $componentDidMount() {
		return this;
	};

	/**
  * Before the destroy
  */


	Plugin.prototype.$componentWillUnmount = function $componentWillUnmount() {
		var _this = this;

		Object.keys(this).forEach(function (v) {
			_this[v] = null;
		});
	};

	Plugin.prototype.getInstanceConf = function getInstanceConf() {
		return this.$$._conf;
	};

	/**
  * Bind flicking custom events
  */


	Plugin.prototype.bindEvents = function bindEvents() {
		this.$$.on({
			flick: this._onFlick.bind(this),
			flickEnd: this._onFlickEnd.bind(this),
			restore: this._onRestore.bind(this)
		});
	};

	/**
  * 'flick' event handler
  * @param {Object} e
  * @private
  */


	Plugin.prototype._onFlick = function _onFlick(e) {
		var pos = e.pos;
		var distance = e.distance || pos - this.$$._conf.panel.size;

		this.onFlick && this.onFlick(e, distance);
	};

	/**
  * 'flickEnd' event handler
  * @param {Object} e
  * @private
  */


	Plugin.prototype._onFlickEnd = function _onFlickEnd(e) {
		var type = e.direction & consts.DIRECTION_LEFT && "next" || e.direction & consts.DIRECTION_RIGHT && "prev" || "";

		type && this.arrange && this.arrange(type);
		this.onFlickEnd && this.onFlickEnd(e);
	};

	/**
  * 'restore' event handler
  * @param {Object} e
  * @private
  */


	Plugin.prototype._onRestore = function _onRestore(e) {
		this.onRestore && this.onRestore(e);
	};

	/**
  * Constant to expose Flicking's utility
  * @ko Flicking 유틸리티
  * @name utils
  * @memberof Plugin
  * @static
  * @constant
  * @type {Object}
  * @private
  */


	/**
  * Constant to expose Flicking's constant value
  * @ko Flicking 상수 값
  * @name utils
  * @memberof Plugin
  * @static
  * @constant
  * @type {Object}
  * @private
  */


	/**
  * Version info string
  * @ko 버전정보 문자열
  * @name VERSION
  * @memberof Plugin
  * @static
  * @type {String}
  * @example
  * eg.Flicking.plugin.OpacityEffect.VERSION;  // ex) 2.2.0
  */


	return Plugin;
}();

Plugin.utils = utils;
Plugin.consts = consts;
Plugin.VERSION = "2.3.0";
exports["default"] = Plugin;
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Plugin2 = __webpack_require__(1);

var _Plugin3 = _interopRequireDefault(_Plugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015 NAVER Corp.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * egjs projects are licensed under the MIT license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * A plugin to add opacity effect attached with flicking interaction.<br>Should be targeted only one element(or a wrapper element having child nodes) per panel.
 * @ko 플리킹 인터렉션에 따른 투명도 조절 효과 플러그인.<br>각 패널당 한 개의 요소(또는 자식노드를 포함하는 한 개의 래퍼요소)만 지정되어야 한다.
 * @alias eg.Flicking.plugin.OpacityEffect
 * @memberof eg.Flicking.plugin
 * @see eg.Flicking#plugin
 * @see eg.Flicking#plugins
 * @example
 * ```html
 * <div id="flick">
 * 	<div><p>panel 0 <span class="text">abc</span></p></div>
 * 	<div><p>panel 1 <span class="text">abc</span></p></div>
 * 	<div><p>panel 2 <span class="text">abc</span></p></div>
 * </div>
 * ```
 * ```js
 * // as namespace usage
 * new eg.Flicking("#some")
 *  .plugin([
 *      // Apply opacity effect to '<span>' selector matched elements
 *      new eg.Flicking.plugin.OpacityEffect("span")
 *  ]);
 *
 * // as ESM import usage
 * import Flicking from "@egjs/flicking";
 * import OpacityEffect from "@egjs/flicking/dist/plugin/OpacityEffect";
 *
 * new Flicking("#some")
 *  .plugin([
 *      new OpacityEffect("span")
 *  ]);
 * ```
 */
var OpacityEffect = function (_Plugin) {
	_inherits(OpacityEffect, _Plugin);

	/**
  * Constructor
  * @param {String} selector Target element selector string <ko>대상 요소 셀렉터 문자열</ko>
  */
	function OpacityEffect(selector) {
		_classCallCheck(this, OpacityEffect);

		return _possibleConstructorReturn(this, _Plugin.call(this, { selector: selector }));
	}

	OpacityEffect.prototype.$componentMount = function $componentMount() {
		this.details = _Plugin3["default"].utils.toArray(this.$$.$wrapper.querySelectorAll(this.options.selector));

		this._build();
		this.resize();

		return this;
	};

	OpacityEffect.prototype._build = function _build() {
		this.details = [this.details.pop()].concat(this.details);
	};

	OpacityEffect.prototype._setSelected = function _setSelected(index, setClass) {
		var utils = _Plugin3["default"].utils;

		utils.classList(utils.css(this.details[index], { opacity: "" }), "selected", setClass);
	};

	OpacityEffect.prototype.resize = function resize() {
		this.size = this.getInstanceConf().panel.size;
		this.onRestore("resize");
	};

	OpacityEffect.prototype.arrange = function arrange(type) {
		if (type !== "resize") {
			this.details = type === "next" ? this.details.concat(this.details.shift()) : [this.details.pop()].concat(this.details);
		}

		this._setSelected(1, true);

		/next|resize/.test(type) && this._setSelected(0, false);
		/prev|resize/.test(type) && this._setSelected(2, false);
	};

	OpacityEffect.prototype.onFlick = function onFlick(e, distance) {
		var pos = e.pos;
		var per = pos % this.size / this.size;
		var utils = _Plugin3["default"].utils;

		if (Math.abs(distance) >= this.size) {
			return;
		}

		var opacity = distance > 0 && per <= 0.5 && 1 - 2 * per || distance < 0 && per > 0.5 && 2 * (per - 0.5);

		opacity !== undefined && utils.css(this.details[1], { opacity: opacity });
	};

	OpacityEffect.prototype.onRestore = function onRestore() {
		this.arrange("resize");
	};

	OpacityEffect.prototype.get = function get() {
		return this.details[1];
	};

	return OpacityEffect;
}(_Plugin3["default"]);

exports["default"] = OpacityEffect;
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=OpacityEffect.js.map