/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/flicking project is licensed under the MIT <https://naver.github.io/egjs/license.txt> license
 * 
 * @egjs/flicking JavaScript library
 * https://github.com/naver/egjs-flicking
 * 
 * @version 2.4.1
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
})(window, function(__WEBPACK_EXTERNAL_MODULE__3__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Plugin; });
/* harmony import */ var _Flicking_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _Flicking_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Flicking_js__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
 // is to through pass Flicking's utils & constants to plugins

var utils = _Flicking_js__WEBPACK_IMPORTED_MODULE_0___default.a.utils;
var consts = utils.extend(utils.extend({}, _Flicking_js__WEBPACK_IMPORTED_MODULE_0___default.a.consts), {
  DIRECTION_NONE: _Flicking_js__WEBPACK_IMPORTED_MODULE_0___default.a.DIRECTION_NONE,
  DIRECTION_LEFT: _Flicking_js__WEBPACK_IMPORTED_MODULE_0___default.a.DIRECTION_LEFT,
  DIRECTION_RIGHT: _Flicking_js__WEBPACK_IMPORTED_MODULE_0___default.a.DIRECTION_RIGHT,
  DIRECTION_UP: _Flicking_js__WEBPACK_IMPORTED_MODULE_0___default.a.DIRECTION_UP,
  DIRECTION_DOWN: _Flicking_js__WEBPACK_IMPORTED_MODULE_0___default.a.DIRECTION_DOWN,
  DIRECTION_HORIZONTAL: _Flicking_js__WEBPACK_IMPORTED_MODULE_0___default.a.DIRECTION_HORIZONTAL,
  DIRECTION_VERTICAL: _Flicking_js__WEBPACK_IMPORTED_MODULE_0___default.a.DIRECTION_VERTICAL,
  DIRECTION_ALL: _Flicking_js__WEBPACK_IMPORTED_MODULE_0___default.a.DIRECTION_ALL
});
/**
 * Base class to generate flicking plugin
 * Lifecycle: componentWillMount --> componentMount --> componentDidMount --> componentWillUnmount
 * @ko Flicking 플러그인을 생성하기 위한 기본 클래스
 * @alias eg.Flicking.plugin
 * @private
 */

var Plugin =
/*#__PURE__*/
function () {
  var Plugin =
  /*#__PURE__*/
  function () {
    /**
     * Constructor
     * @param {Object} options Option object <ko>옵션 객체</ko>
     */
    function Plugin(options) {
      if (options === void 0) {
        options = {};
      }

      this.options = options;
    }
    /**
     * Before mounting. It's init point from Flicking instance
     * @param {Flicking} instance Flicking instance
     * @returns {Plugin}
     */


    var _proto = Plugin.prototype;

    _proto.$componentWillMount = function $componentWillMount(instance) {
      this.$$ = instance; // get hint and layer-hack setting

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


    _proto.$componentDidMount = function $componentDidMount() {
      return this;
    };
    /**
     * Before the destroy
     */


    _proto.$componentWillUnmount = function $componentWillUnmount() {
      var _this = this;

      Object.keys(this).forEach(function (v) {
        _this[v] = null;
      });
    };

    _proto.getInstanceConf = function getInstanceConf() {
      return this.$$._conf;
    };
    /**
     * Bind flicking custom events
     */


    _proto.bindEvents = function bindEvents() {
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


    _proto._onFlick = function _onFlick(e) {
      var pos = e.pos;
      var distance = e.distance || pos - this.$$._conf.panel.size;
      this.onFlick && this.onFlick(e, distance);
    };
    /**
     * 'flickEnd' event handler
     * @param {Object} e
     * @private
     */


    _proto._onFlickEnd = function _onFlickEnd(e) {
      var type = e.direction & consts.DIRECTION_LEFT && "next" || e.direction & consts.DIRECTION_RIGHT && "prev" || "";
      type && this.arrange && this.arrange(type);
      this.onFlickEnd && this.onFlickEnd(e);
    };
    /**
     * 'restore' event handler
     * @param {Object} e
     * @private
     */


    _proto._onRestore = function _onRestore(e) {
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


    return Plugin;
  }();

  Plugin.utils = utils;
  Plugin.consts = consts;
  Plugin.VERSION = "2.4.1";
  return Plugin;
}();



/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OpacityEffect; });
/* harmony import */ var _Plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * A plugin to add opacity effect attached with flicking interaction.
 * - Should be targeted only one element(or a wrapper element having child nodes) per panel.
 * @ko 플리킹 인터렉션에 따른 투명도 조절 효과 플러그인.
 * - 각 패널당 한 개의 요소(또는 자식노드를 포함하는 한 개의 래퍼요소)만 지정되어야 한다.
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

var OpacityEffect =
/*#__PURE__*/
function (_Plugin) {
  _inheritsLoose(OpacityEffect, _Plugin);

  /**
   * Constructor
   * @param {String} selector Target element selector string <ko>대상 요소 셀렉터 문자열</ko>
   */
  function OpacityEffect(selector) {
    return _Plugin.call(this, {
      selector: selector
    }) || this;
  }

  var _proto = OpacityEffect.prototype;

  _proto.$componentMount = function $componentMount() {
    this.details = _Plugin__WEBPACK_IMPORTED_MODULE_0__["default"].utils.toArray(this.$$.$wrapper.querySelectorAll(this.options.selector));

    this._build();

    this.resize();
    return this;
  };

  _proto._build = function _build() {
    this.details = [this.details.pop()].concat(this.details);
  };

  _proto._setSelected = function _setSelected(index, setClass) {
    var utils = _Plugin__WEBPACK_IMPORTED_MODULE_0__["default"].utils;
    utils.classList(utils.css(this.details[index], {
      opacity: ""
    }), "selected", setClass);
  };

  _proto.resize = function resize() {
    this.size = this.getInstanceConf().panel.size;
    this.onRestore("resize");
  };

  _proto.arrange = function arrange(type) {
    if (type !== "resize") {
      this.details = type === "next" ? this.details.concat(this.details.shift()) : [this.details.pop()].concat(this.details);
    }

    this._setSelected(1, true);

    /next|resize/.test(type) && this._setSelected(0, false);
    /prev|resize/.test(type) && this._setSelected(2, false);
  };

  _proto.onFlick = function onFlick(e, distance) {
    var pos = e.pos;
    var per = pos % this.size / this.size;
    var utils = _Plugin__WEBPACK_IMPORTED_MODULE_0__["default"].utils;

    if (Math.abs(distance) >= this.size) {
      return;
    }

    var opacity = distance > 0 && per <= 0.5 && 1 - 2 * per || distance < 0 && per > 0.5 && 2 * (per - 0.5);
    opacity !== undefined && utils.css(this.details[1], {
      opacity: opacity
    });
  };

  _proto.onRestore = function onRestore() {
    this.arrange("resize");
  };

  _proto.get = function get() {
    return this.details[1];
  };

  return OpacityEffect;
}(_Plugin__WEBPACK_IMPORTED_MODULE_0__["default"]);


module.exports = OpacityEffect;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ })
/******/ ]);
});
//# sourceMappingURL=OpacityEffect.js.map