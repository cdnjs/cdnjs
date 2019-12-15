/*!
 * wavesurfer.js 2.1.0 (Mon Oct 01 2018 11:34:43 GMT+0200 (Central European Summer Time))
 * https://github.com/katspaugh/wavesurfer.js
 * @license BSD-3-Clause
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("timeline", [], factory);
	else if(typeof exports === 'object')
		exports["timeline"] = factory();
	else
		root["WaveSurfer"] = root["WaveSurfer"] || {}, root["WaveSurfer"]["timeline"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugin/timeline.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/plugin/timeline.js":
/*!********************************!*\
  !*** ./src/plugin/timeline.js ***!
  \********************************/
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
 * @typedef {Object} TimelinePluginParams
 * @desc Extends the `WavesurferParams` wavesurfer was initialised with
 * @property {!string|HTMLElement} container CSS selector or HTML element where
 * the timeline should be drawn. This is the only required parameter.
 * @property {number} notchPercentHeight=90 Height of notches in percent
 * @property {string} unlabeledNotchColor='#c0c0c0' The colour of the notches
 * that do not have labels
 * @property {string} primaryColor='#000' The colour of the main notches
 * @property {string} secondaryColor='#c0c0c0' The colour of the secondary
 * notches
 * @property {string} primaryFontColor='#000' The colour of the labels next to
 * the main notches
 * @property {string} secondaryFontColor='#000' The colour of the labels next to
 * the secondary notches
 * @property {number} labelPadding=5 The padding between the label and the notch
 * @property {?number} zoomDebounce A debounce timeout to increase rendering
 * performance for large files
 * @property {string} fontFamily='Arial'
 * @property {number} fontSize=10 Font size of labels in pixels
 * @property {function} formatTimeCallback (sec, pxPerSec) -> label
 * @property {function} timeInterval (pxPerSec) -> seconds between notches
 * @property {function} primaryLabelInterval (pxPerSec) -> cadence between
 * labels in primary color
 * @property {function} secondaryLabelInterval (pxPerSec) -> cadence between
 * labels in secondary color
 * @property {?boolean} deferInit Set to true to manually call
 * `initPlugin('timeline')`
 */

/**
 * Adds a timeline to the waveform.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import TimelinePlugin from 'wavesurfer.timeline.js';
 *
 * // commonjs
 * var TimelinePlugin = require('wavesurfer.timeline.js');
 *
 * // if you are using <script> tags
 * var TimelinePlugin = window.WaveSurfer.timeline;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     TimelinePlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
var TimelinePlugin =
/*#__PURE__*/
function () {
  _createClass(TimelinePlugin, null, [{
    key: "create",

    /**
     * Timeline plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by wavesurfer to correctly instantiate the plugin.
     *
     * @param  {TimelinePluginParams} params parameters use to initialise the plugin
     * @return {PluginDefinition} an object representing the plugin
     */
    value: function create(params) {
      return {
        name: 'timeline',
        deferInit: params && params.deferInit ? params.deferInit : false,
        params: params,
        instance: TimelinePlugin
      };
    } // event handlers

    /** @private */

  }]);

  /**
   * Creates an instance of TimelinePlugin.
   *
   * You probably want to use TimelinePlugin.create()
   *
   * @param {TimelinePluginParams} params Plugin parameters
   * @param {object} ws Wavesurfer instance
   */
  function TimelinePlugin(params, ws) {
    var _this = this;

    _classCallCheck(this, TimelinePlugin);

    _initialiseProps.call(this);

    /** @private */
    this.container = 'string' == typeof params.container ? document.querySelector(params.container) : params.container;

    if (!this.container) {
      throw new Error('No container for wavesurfer timeline');
    }
    /** @private */


    this.wavesurfer = ws;
    /** @private */

    this.util = ws.util;
    /** @private */

    this.params = this.util.extend({}, {
      height: 20,
      notchPercentHeight: 90,
      labelPadding: 5,
      unlabeledNotchColor: '#c0c0c0',
      primaryColor: '#000',
      secondaryColor: '#c0c0c0',
      primaryFontColor: '#000',
      secondaryFontColor: '#000',
      fontFamily: 'Arial',
      fontSize: 10,
      zoomDebounce: false,
      formatTimeCallback: this.defaultFormatTimeCallback,
      timeInterval: this.defaultTimeInterval,
      primaryLabelInterval: this.defaultPrimaryLabelInterval,
      secondaryLabelInterval: this.defaultSecondaryLabelInterval
    }, params);
    /** @private */

    this.canvases = [];
    /** @private */

    this.wrapper = null;
    /** @private */

    this.drawer = null;
    /** @private */

    this.pixelRatio = null;
    /** @private */

    this.maxCanvasWidth = null;
    /** @private */

    this.maxCanvasElementWidth = null;
    /**
     * This event handler has to be in the constructor function because it
     * relies on the debounce function which is only available after
     * instantiation
     *
     * Use a debounced function if zoomDebounce is defined
     *
     * @private
     */

    this._onZoom = this.params.zoomDebounce ? this.wavesurfer.util.debounce(function () {
      return _this.render();
    }, this.params.zoomDebounce) : function () {
      return _this.render();
    };
  }
  /**
   * Initialisation function used by the plugin API
   */


  _createClass(TimelinePlugin, [{
    key: "init",
    value: function init() {
      this.wavesurfer.on('ready', this._onReady); // Check if ws is ready

      if (this.wavesurfer.isReady) {
        this._onReady();
      }
    }
    /**
     * Destroy function used by the plugin API
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.unAll();
      this.wavesurfer.un('redraw', this._onRedraw);
      this.wavesurfer.un('zoom', this._onZoom);
      this.wavesurfer.un('ready', this._onReady);
      this.wavesurfer.drawer.wrapper.removeEventListener('scroll', this._onScroll);

      if (this.wrapper && this.wrapper.parentNode) {
        this.wrapper.removeEventListener('click', this._onWrapperClick);
        this.wrapper.parentNode.removeChild(this.wrapper);
        this.wrapper = null;
      }
    }
    /**
     * Create a timeline element to wrap the canvases drawn by this plugin
     *
     * @private
     */

  }, {
    key: "createWrapper",
    value: function createWrapper() {
      var wsParams = this.wavesurfer.params;
      this.container.innerHTML = '';
      this.wrapper = this.container.appendChild(document.createElement('timeline'));
      this.util.style(this.wrapper, {
        display: 'block',
        position: 'relative',
        userSelect: 'none',
        webkitUserSelect: 'none',
        height: "".concat(this.params.height, "px")
      });

      if (wsParams.fillParent || wsParams.scrollParent) {
        this.util.style(this.wrapper, {
          width: '100%',
          overflowX: 'hidden',
          overflowY: 'hidden'
        });
      }

      this.wrapper.addEventListener('click', this._onWrapperClick);
    }
    /**
     * Render the timeline (also updates the already rendered timeline)
     *
     * @private
     */

  }, {
    key: "render",
    value: function render() {
      if (!this.wrapper) {
        this.createWrapper();
      }

      this.updateCanvases();
      this.updateCanvasesPositioning();
      this.renderCanvases();
    }
    /**
     * Make sure the correct of timeline canvas elements exist and are cached in
     * this.canvases
     *
     * @private
     */

  }, {
    key: "updateCanvases",
    value: function updateCanvases() {
      var _this2 = this;

      var addCanvas = function addCanvas() {
        var canvas = _this2.wrapper.appendChild(document.createElement('canvas'));

        _this2.canvases.push(canvas);

        _this2.util.style(canvas, {
          position: 'absolute',
          zIndex: 4
        });
      };

      var removeCanvas = function removeCanvas() {
        var canvas = _this2.canvases.pop();

        canvas.parentElement.removeChild(canvas);
      };

      var totalWidth = Math.round(this.drawer.wrapper.scrollWidth);
      var requiredCanvases = Math.ceil(totalWidth / this.maxCanvasElementWidth);

      while (this.canvases.length < requiredCanvases) {
        addCanvas();
      }

      while (this.canvases.length > requiredCanvases) {
        removeCanvas();
      }
    }
    /**
     * Update the dimensions and positioning style for all the timeline canvases
     *
     * @private
     */

  }, {
    key: "updateCanvasesPositioning",
    value: function updateCanvasesPositioning() {
      var _this3 = this;

      // cache length for perf
      var canvasesLength = this.canvases.length;
      this.canvases.forEach(function (canvas, i) {
        // canvas width is the max element width, or if it is the last the
        // required width
        var canvasWidth = i === canvasesLength - 1 ? _this3.drawer.wrapper.scrollWidth - _this3.maxCanvasElementWidth * (canvasesLength - 1) : _this3.maxCanvasElementWidth; // set dimensions and style

        canvas.width = canvasWidth * _this3.pixelRatio; // on certain pixel ratios the canvas appears cut off at the bottom,
        // therefore leave 1px extra

        canvas.height = (_this3.params.height + 1) * _this3.pixelRatio;

        _this3.util.style(canvas, {
          width: "".concat(canvasWidth, "px"),
          height: "".concat(_this3.params.height, "px"),
          left: "".concat(i * _this3.maxCanvasElementWidth, "px")
        });
      });
    }
    /**
     * Render the timeline labels and notches
     *
     * @private
     */

  }, {
    key: "renderCanvases",
    value: function renderCanvases() {
      var _this4 = this;

      var duration = this.wavesurfer.backend.getDuration();

      if (duration <= 0) {
        return;
      }

      var wsParams = this.wavesurfer.params;
      var fontSize = this.params.fontSize * wsParams.pixelRatio;
      var totalSeconds = parseInt(duration, 10) + 1;
      var width = wsParams.fillParent && !wsParams.scrollParent ? this.drawer.getWidth() : this.drawer.wrapper.scrollWidth * wsParams.pixelRatio;
      var height1 = this.params.height * this.pixelRatio;
      var height2 = this.params.height * (this.params.notchPercentHeight / 100) * this.pixelRatio;
      var pixelsPerSecond = width / duration;
      var formatTime = this.params.formatTimeCallback; // if parameter is function, call the function with
      // pixelsPerSecond, otherwise simply take the value as-is

      var intervalFnOrVal = function intervalFnOrVal(option) {
        return typeof option === 'function' ? option(pixelsPerSecond) : option;
      };

      var timeInterval = intervalFnOrVal(this.params.timeInterval);
      var primaryLabelInterval = intervalFnOrVal(this.params.primaryLabelInterval);
      var secondaryLabelInterval = intervalFnOrVal(this.params.secondaryLabelInterval);
      var curPixel = 0;
      var curSeconds = 0;
      var i; // build an array of position data with index, second and pixel data,
      // this is then used multiple times below

      var positioning = [];

      for (i = 0; i < totalSeconds / timeInterval; i++) {
        positioning.push([i, curSeconds, curPixel]);
        curSeconds += timeInterval;
        curPixel += pixelsPerSecond * timeInterval;
      } // iterate over each position


      var renderPositions = function renderPositions(cb) {
        positioning.forEach(function (pos) {
          cb(pos[0], pos[1], pos[2]);
        });
      }; // render primary labels


      this.setFillStyles(this.params.primaryColor);
      this.setFonts("".concat(fontSize, "px ").concat(this.params.fontFamily));
      this.setFillStyles(this.params.primaryFontColor);
      renderPositions(function (i, curSeconds, curPixel) {
        if (i % primaryLabelInterval === 0) {
          _this4.fillRect(curPixel, 0, 1, height1);

          _this4.fillText(formatTime(curSeconds, pixelsPerSecond), curPixel + _this4.params.labelPadding * _this4.pixelRatio, height1);
        }
      }); // render secondary labels

      this.setFillStyles(this.params.secondaryColor);
      this.setFonts("".concat(fontSize, "px ").concat(this.params.fontFamily));
      this.setFillStyles(this.params.secondaryFontColor);
      renderPositions(function (i, curSeconds, curPixel) {
        if (i % secondaryLabelInterval === 0) {
          _this4.fillRect(curPixel, 0, 1, height1);

          _this4.fillText(formatTime(curSeconds, pixelsPerSecond), curPixel + _this4.params.labelPadding * _this4.pixelRatio, height1);
        }
      }); // render the actual notches (when no labels are used)

      this.setFillStyles(this.params.unlabeledNotchColor);
      renderPositions(function (i, curSeconds, curPixel) {
        if (i % secondaryLabelInterval !== 0 && i % primaryLabelInterval !== 0) {
          _this4.fillRect(curPixel, 0, 1, height2);
        }
      });
    }
    /**
     * Set the canvas fill style
     *
     * @param {DOMString|CanvasGradient|CanvasPattern} fillStyle
     * @private
     */

  }, {
    key: "setFillStyles",
    value: function setFillStyles(fillStyle) {
      this.canvases.forEach(function (canvas) {
        canvas.getContext('2d').fillStyle = fillStyle;
      });
    }
    /**
     * Set the canvas font
     *
     * @param {DOMString} font
     * @private
     */

  }, {
    key: "setFonts",
    value: function setFonts(font) {
      this.canvases.forEach(function (canvas) {
        canvas.getContext('2d').font = font;
      });
    }
    /**
     * Draw a rectangle on the canvases
     *
     * (it figures out the offset for each canvas)
     *
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @private
     */

  }, {
    key: "fillRect",
    value: function fillRect(x, y, width, height) {
      var _this5 = this;

      this.canvases.forEach(function (canvas, i) {
        var leftOffset = i * _this5.maxCanvasWidth;
        var intersection = {
          x1: Math.max(x, i * _this5.maxCanvasWidth),
          y1: y,
          x2: Math.min(x + width, i * _this5.maxCanvasWidth + canvas.width),
          y2: y + height
        };

        if (intersection.x1 < intersection.x2) {
          canvas.getContext('2d').fillRect(intersection.x1 - leftOffset, intersection.y1, intersection.x2 - intersection.x1, intersection.y2 - intersection.y1);
        }
      });
    }
    /**
     * Fill a given text on the canvases
     *
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @private
     */

  }, {
    key: "fillText",
    value: function fillText(text, x, y) {
      var textWidth;
      var xOffset = 0;
      this.canvases.forEach(function (canvas) {
        var context = canvas.getContext('2d');
        var canvasWidth = context.canvas.width;

        if (xOffset > x + textWidth) {
          return;
        }

        if (xOffset + canvasWidth > x) {
          textWidth = context.measureText(text).width;
          context.fillText(text, x - xOffset, y);
        }

        xOffset += canvasWidth;
      });
    }
    /**
     * Turn the time into a suitable label for the time.
     *
     * @param {number} seconds
     * @param {number} pxPerSec
     */

  }, {
    key: "defaultFormatTimeCallback",
    value: function defaultFormatTimeCallback(seconds, pxPerSec) {
      if (seconds / 60 > 1) {
        // calculate minutes and seconds from seconds count
        var minutes = parseInt(seconds / 60, 10);
        seconds = parseInt(seconds % 60, 10); // fill up seconds with zeroes

        seconds = seconds < 10 ? '0' + seconds : seconds;
        return "".concat(minutes, ":").concat(seconds);
      }

      return Math.round(seconds * 1000) / 1000;
    }
    /**
     * Return how many seconds should be between each notch
     *
     * @param pxPerSec
     */

  }, {
    key: "defaultTimeInterval",
    value: function defaultTimeInterval(pxPerSec) {
      if (pxPerSec >= 25) {
        return 1;
      } else if (pxPerSec * 5 >= 25) {
        return 5;
      } else if (pxPerSec * 15 >= 25) {
        return 15;
      }

      return Math.ceil(0.5 / pxPerSec) * 60;
    }
    /**
     * Return the cadence of notches that get labels in the primary color.
     *
     * @param pxPerSec
     */

  }, {
    key: "defaultPrimaryLabelInterval",
    value: function defaultPrimaryLabelInterval(pxPerSec) {
      if (pxPerSec >= 25) {
        return 10;
      } else if (pxPerSec * 5 >= 25) {
        return 6;
      } else if (pxPerSec * 15 >= 25) {
        return 4;
      }

      return 4;
    }
    /**
     * Return the cadence of notches that get labels in the secondary color.
     *
     * @param pxPerSec
     */

  }, {
    key: "defaultSecondaryLabelInterval",
    value: function defaultSecondaryLabelInterval(pxPerSec) {
      if (pxPerSec >= 25) {
        return 5;
      } else if (pxPerSec * 5 >= 25) {
        return 2;
      } else if (pxPerSec * 15 >= 25) {
        return 2;
      }

      return 2;
    }
  }]);

  return TimelinePlugin;
}();

exports.default = TimelinePlugin;

var _initialiseProps = function _initialiseProps() {
  var _this6 = this;

  this._onScroll = function () {
    if (_this6.wrapper && _this6.drawer.wrapper) {
      _this6.wrapper.scrollLeft = _this6.drawer.wrapper.scrollLeft;
    }
  };

  this._onRedraw = function () {
    return _this6.render();
  };

  this._onReady = function () {
    var ws = _this6.wavesurfer;
    _this6.drawer = ws.drawer;
    _this6.pixelRatio = ws.drawer.params.pixelRatio;
    _this6.maxCanvasWidth = ws.drawer.maxCanvasWidth || ws.drawer.width;
    _this6.maxCanvasElementWidth = ws.drawer.maxCanvasElementWidth || Math.round(_this6.maxCanvasWidth / _this6.pixelRatio);
    ws.drawer.wrapper.addEventListener('scroll', _this6._onScroll);
    ws.on('redraw', _this6._onRedraw);
    ws.on('zoom', _this6._onZoom);

    _this6.render();
  };

  this._onWrapperClick = function (e) {
    e.preventDefault();
    var relX = 'offsetX' in e ? e.offsetX : e.layerX;

    _this6.fireEvent('click', relX / _this6.wrapper.scrollWidth || 0);
  };
};

module.exports = exports.default;

/***/ })

/******/ });
});
//# sourceMappingURL=wavesurfer.timeline.js.map