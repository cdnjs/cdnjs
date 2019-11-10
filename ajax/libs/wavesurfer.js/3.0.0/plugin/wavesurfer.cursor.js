/*!
 * wavesurfer.js cursor plugin 3.0.0 (2019-07-12)
 * https://github.com/katspaugh/wavesurfer.js
 * @license BSD-3-Clause
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cursor", [], factory);
	else if(typeof exports === 'object')
		exports["cursor"] = factory();
	else
		root["WaveSurfer"] = root["WaveSurfer"] || {}, root["WaveSurfer"]["cursor"] = factory();
})(window, function() {
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
/******/ 	__webpack_require__.p = "localhost:8080/dist/plugin/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugin/cursor.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/plugin/cursor.js":
/*!******************************!*\
  !*** ./src/plugin/cursor.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @typedef {Object} CursorPluginParams
 * @property {?boolean} deferInit Set to true to stop auto init in `addPlugin()`
 * @property {boolean} hideOnBlur=true Hide the cursor when the mouse leaves the
 * waveform
 * @property {string} width='1px' The width of the cursor
 * @property {string} color='black' The color of the cursor
 * @property {string} opacity='0.25' The opacity of the cursor
 * @property {string} style='solid' The border style of the cursor
 * @property {number} zIndex=3 The z-index of the cursor element
 * @property {object} customStyle An object with custom styles which are applied
 * to the cursor element
 * @property {boolean} showTime=false Show the time on the cursor.
 * @property {object} customShowTimeStyle An object with custom styles which are
 * applied to the cursor time element.
 * @property {string} followCursorY=false Use `true` to make the time on
 * the cursor follow the x and the y-position of the mouse. Use `false` to make the
 * it only follow the x-position of the mouse.
 * @property {function} formatTimeCallback Formats the timestamp on the cursor.
 */

/**
 * Displays a thin line at the position of the cursor on the waveform.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import CursorPlugin from 'wavesurfer.cursor.js';
 *
 * // commonjs
 * var CursorPlugin = require('wavesurfer.cursor.js');
 *
 * // if you are using <script> tags
 * var CursorPlugin = window.WaveSurfer.cursor;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     CursorPlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
var CursorPlugin =
/*#__PURE__*/
function () {
  _createClass(CursorPlugin, null, [{
    key: "create",

    /**
     * Cursor plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by wavesurfer to correctly instantiate the plugin.
     *
     * @param  {CursorPluginParams} params parameters use to initialise the
     * plugin
     * @return {PluginDefinition} an object representing the plugin
     */
    value: function create(params) {
      return {
        name: 'cursor',
        deferInit: params && params.deferInit ? params.deferInit : false,
        params: params,
        staticProps: {},
        instance: CursorPlugin
      };
    }
    /**
     * @type {CursorPluginParams}
     */

  }]);

  /**
   * Construct the plugin class. You probably want to use `CursorPlugin.create`
   * instead.
   *
   * @param {CursorPluginParams} params Plugin parameters
   * @param {object} ws Wavesurfer instance
   */
  function CursorPlugin(params, ws) {
    var _this = this;

    _classCallCheck(this, CursorPlugin);

    this.defaultParams = {
      hideOnBlur: true,
      width: '1px',
      color: 'black',
      opacity: '0.25',
      style: 'solid',
      zIndex: 4,
      customStyle: {},
      customShowTimeStyle: {},
      showTime: false,
      followCursorY: false,
      formatTimeCallback: null
    };

    this._onMousemove = function (e) {
      var bbox = _this.wavesurfer.container.getBoundingClientRect();

      var y = 0;
      var x = e.clientX - bbox.left;

      if (_this.params.showTime && _this.params.followCursorY) {
        // follow y-position of the mouse
        y = e.clientY - (bbox.top + bbox.height / 2);
      }

      _this.updateCursorPosition(x, y);
    };

    this._onMouseenter = function () {
      return _this.showCursor();
    };

    this._onMouseleave = function () {
      return _this.hideCursor();
    };

    /** @private */
    this.wavesurfer = ws;
    /** @private */

    this.style = ws.util.style;
    /**
     * The cursor HTML element
     *
     * @type {?HTMLElement}
     */

    this.cursor = null;
    /**
     * displays the time next to the cursor
     *
     * @type {?HTMLElement}
     */

    this.showTime = null;
    /**
     * The html container that will display the time
     *
     * @type {?HTMLElement}
     */

    this.displayTime = null;
    /** @private */

    this.params = ws.util.extend({}, this.defaultParams, params);
  }
  /**
   * Initialise the plugin (used by the Plugin API)
   */


  _createClass(CursorPlugin, [{
    key: "init",
    value: function init() {
      this.wrapper = this.wavesurfer.container;
      this.cursor = this.wrapper.appendChild(this.style(document.createElement('cursor'), this.wavesurfer.util.extend({
        position: 'absolute',
        zIndex: this.params.zIndex,
        left: 0,
        top: 0,
        bottom: 0,
        width: '0',
        display: 'flex',
        borderRightStyle: this.params.style,
        borderRightWidth: this.params.width,
        borderRightColor: this.params.color,
        opacity: this.params.opacity,
        pointerEvents: 'none'
      }, this.params.customStyle)));

      if (this.params.showTime) {
        this.showTime = this.wrapper.appendChild(this.style(document.createElement('showTitle'), this.wavesurfer.util.extend({
          position: 'absolute',
          zIndex: this.params.zIndex,
          left: 0,
          top: 0,
          bottom: 0,
          width: 'auto',
          display: 'flex',
          opacity: this.params.opacity,
          pointerEvents: 'none',
          height: '100%'
        }, this.params.customStyle)));
        this.displayTime = this.showTime.appendChild(this.style(document.createElement('div'), this.wavesurfer.util.extend({
          display: 'inline',
          pointerEvents: 'none',
          margin: 'auto'
        }, this.params.customShowTimeStyle)));
      }

      this.wrapper.addEventListener('mousemove', this._onMousemove);

      if (this.params.hideOnBlur) {
        // ensure elements are hidden initially
        this.hideCursor();
        this.wrapper.addEventListener('mouseenter', this._onMouseenter);
        this.wrapper.addEventListener('mouseleave', this._onMouseleave);
      }
    }
    /**
     * Destroy the plugin (used by the Plugin API)
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (this.params.showTime) {
        this.cursor.parentNode.removeChild(this.showTime);
      }

      this.cursor.parentNode.removeChild(this.cursor);
      this.wrapper.removeEventListener('mousemove', this._onMousemove);

      if (this.params.hideOnBlur) {
        this.wrapper.removeEventListener('mouseenter', this._onMouseenter);
        this.wrapper.removeEventListener('mouseleave', this._onMouseleave);
      }
    }
    /**
     * Update the cursor position
     *
     * @param {number} xpos The x offset of the cursor in pixels
     * @param {number} ypos The y offset of the cursor in pixels
     */

  }, {
    key: "updateCursorPosition",
    value: function updateCursorPosition(xpos, ypos) {
      this.style(this.cursor, {
        left: "".concat(xpos, "px")
      });

      if (this.params.showTime) {
        var duration = this.wavesurfer.getDuration();
        var elementWidth = this.wavesurfer.drawer.width / this.wavesurfer.params.pixelRatio;
        var scrollWidth = this.wavesurfer.drawer.getScrollX();
        var scrollTime = duration / this.wavesurfer.drawer.width * scrollWidth;
        var timeValue = Math.max(0, xpos / elementWidth * duration) + scrollTime;
        var formatValue = this.formatTime(timeValue);
        this.style(this.showTime, {
          left: "".concat(xpos, "px"),
          top: "".concat(ypos, "px")
        });
        this.displayTime.innerHTML = "".concat(formatValue);
      }
    }
    /**
     * Show the cursor
     */

  }, {
    key: "showCursor",
    value: function showCursor() {
      this.style(this.cursor, {
        display: 'flex'
      });

      if (this.params.showTime) {
        this.style(this.showTime, {
          display: 'flex'
        });
      }
    }
    /**
     * Hide the cursor
     */

  }, {
    key: "hideCursor",
    value: function hideCursor() {
      this.style(this.cursor, {
        display: 'none'
      });

      if (this.params.showTime) {
        this.style(this.showTime, {
          display: 'none'
        });
      }
    }
    /**
     * Format the timestamp for `cursorTime`.
     *
     * @param {number} cursorTime Time in seconds
     * @returns {string} Formatted timestamp
     */

  }, {
    key: "formatTime",
    value: function formatTime(cursorTime) {
      cursorTime = isNaN(cursorTime) ? 0 : cursorTime;

      if (this.params.formatTimeCallback) {
        return this.params.formatTimeCallback(cursorTime);
      }

      return [cursorTime].map(function (time) {
        return [Math.floor(time % 3600 / 60), // minutes
        ('00' + Math.floor(time % 60)).slice(-2), // seconds
        ('000' + Math.floor(time % 1 * 1000)).slice(-3) // milliseconds
        ].join(':');
      });
    }
  }]);

  return CursorPlugin;
}();

exports.default = CursorPlugin;
module.exports = exports.default;

/***/ })

/******/ });
});
//# sourceMappingURL=wavesurfer.cursor.js.map