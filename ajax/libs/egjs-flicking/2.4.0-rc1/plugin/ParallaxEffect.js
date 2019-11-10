/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/flicking project is licensed under the MIT <https://naver.github.io/egjs/license.txt> license
 * 
 * @egjs/flicking JavaScript library
 * https://github.com/naver/egjs-flicking
 * 
 * @version 2.4.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@egjs/flicking"));
	else if(typeof define === 'function' && define.amd)
		define("ParallaxEffect", ["@egjs/flicking"], factory);
	else if(typeof exports === 'object')
		exports["ParallaxEffect"] = factory(require("@egjs/flicking"));
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Flicking"] = root["eg"]["Flicking"] || {}, root["eg"]["Flicking"]["plugin"] = root["eg"]["Flicking"]["plugin"] || {}, root["eg"]["Flicking"]["plugin"]["ParallaxEffect"] = factory(root["eg"]["Flicking"]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
 * A plugin to add horizontal parallax effect attached with flicking interaction.
 * - Should be targeted only one element per panel.
 * - It can't be used with `previewPadding` option.
 * @ko 플리킹 인터렉션에 따른 가로유형 패럴렉스 효과 플러그인.
 * - 각 패널당 한 개의 요소만 지정되어야 한다.
 * - `previewPadding` 옵션과 같이 사용될 수 없다.
 * @alias eg.Flicking.plugin.ParallaxEffect
 * @memberof eg.Flicking.plugin
 * @see eg.Flicking#plugin
 * @see eg.Flicking#plugins
 * @example
 * ```html
 * <div id="flick">
 * 	<div><p style="background-image:url(a.png)">panel 0</p></div>
 * 	<div><p style="background-image:url(b.png)">panel 1</p></div>
 * 	<div><p style="background-image:url(c.png)">panel 2</p></div>
 * </div>
 * ```
 * ```js
 * // as namespace usage
 * new eg.Flicking("#some")
 *  .plugin([
 *      // Apply parallax effect to '<p>' selector matched elements
 *      new eg.Flicking.plugin.ParallaxEffect("p")
 *  ]);
 *
 * // as ESM import usage
 * import Flicking from "@egjs/flicking";
 * import ParallaxEffect from "@egjs/flicking/dist/plugin/ParallaxEffect";
 *
 * new Flicking("#some")
 *  .plugin([
 *      new ParallaxEffect("p")
 *  ]);
 * ```
 */
var ParallaxEffect = function (_Plugin) {
	_inherits(ParallaxEffect, _Plugin);

	/**
  * Constructor
  * @param {String} selector Target selector string within panel element<ko>패널 내에 위치한 대상 요소 셀렉터 문자열</ko>
  */
	function ParallaxEffect(selector) {
		_classCallCheck(this, ParallaxEffect);

		return _possibleConstructorReturn(this, _Plugin.call(this, { selector: selector }));
	}

	ParallaxEffect.prototype.$componentMount = function $componentMount() {
		var _this2 = this;

		// select target elements
		this.imgs = this.$$.getAllElements().map(function (v) {
			return v.querySelector(_this2.options.selector);
		});

		this.resize();
		this._build();

		return this;
	};

	ParallaxEffect.prototype._build = function _build() {
		var _this3 = this;

		var utils = _Plugin3["default"].utils;
		var currIndex = this._getCurrIndex();

		// set panel element's style
		utils.css(this.getInstanceConf().panel.$list, { overflow: "hidden" });

		// set targeted element's style
		this.imgs.forEach(function (v, i) {
			var x = -50;

			if (currIndex > i) {
				x = 50;
			} else if (currIndex === i) {
				x = 0;
			}

			_this3.useWillChange && utils.css(v, { willChange: "transform" });
			_this3._setTranslate(v, x + "%", 0);
		});
	};

	ParallaxEffect.prototype._setTranslate = function _setTranslate(el, x, y) {
		el && _Plugin3["default"].utils.css(el, {
			transform: _Plugin3["default"].utils.translate.apply(null, this.$$._getDataByDirection([x, y]).concat(this.useLayerHack))
		});

		return el;
	};

	ParallaxEffect.prototype._getCurrIndex = function _getCurrIndex() {
		return this.getInstanceConf().panel.currIndex;
	};

	ParallaxEffect.prototype._getPanel = function _getPanel() {
		var index = this._getCurrIndex();

		return {
			prev: this.imgs[index - 1],
			curr: this.imgs[index],
			next: this.imgs[index + 1]
		};
	};

	ParallaxEffect.prototype.arrange = function arrange(type) {
		if (this.$$.options.circular && type !== "resize") {
			this.imgs = type === "next" ? this.imgs.concat(this.imgs.shift()) : [this.imgs.pop()].concat(this.imgs);
		}

		var panel = this._getPanel();

		// update panel's translate
		this._setTranslate(panel.curr, 0, 0);

		/next|resize/.test(type) && this._setTranslate(panel.next, "50%", 0);
		/prev|resize/.test(type) && this._setTranslate(panel.prev, "-50%", 0);
	};

	ParallaxEffect.prototype.onFlick = function onFlick(e, distance) {
		var _this4 = this;

		var pos = e.pos;
		var maxRange = this.size;
		var delta = pos % maxRange / 2;
		var siblingDelta = -(maxRange / 2 - delta);

		if (Math.abs(distance) >= maxRange) {
			return;
		}

		var panel = this._getPanel();
		var update = [];

		if (distance > 0 && panel.next) {
			update.push({ el: panel.curr, x: delta });
			update.push({ el: panel.next, x: siblingDelta });
		} else if (distance < 0 && panel.prev) {
			update.push({ el: panel.curr, x: siblingDelta });
			update.push({ el: panel.prev, x: delta });
		}

		update.forEach(function (v) {
			return _this4._setTranslate(v.el, v.x + "px", 0);
		});
	};

	ParallaxEffect.prototype.onRestore = function onRestore() {
		this.arrange("resize");
	};

	ParallaxEffect.prototype.resize = function resize() {
		this.size = this.getInstanceConf().panel.size;
		this.onRestore("resize");
	};

	ParallaxEffect.prototype.get = function get() {
		return this.imgs[this._getCurrIndex()];
	};

	return ParallaxEffect;
}(_Plugin3["default"]);

exports["default"] = ParallaxEffect;


module.exports = ParallaxEffect;

/***/ }),
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
 * Lifecycle: componentWillMount --> componentMount --> componentDidMount --> componentWillUnmount
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
Plugin.VERSION = "2.4.0";
exports["default"] = Plugin;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=ParallaxEffect.js.map