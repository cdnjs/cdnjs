/*!
 * wavesurfer.js 2.0.0-beta02 (Fri Sep 22 2017 11:28:06 GMT+0200 (CEST))
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
/******/ 	__webpack_require__.p = "localhost:8080/dist/plugin/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {Object} TimelinePluginParams
 * @desc Extends the `WavesurferParams` wavesurfer was initialised with
 * @property {!string|HTMLElement} container CSS selector or HTML element where
 * the timeline should be drawn. This is the only required parameter.
 * @property {number} notchPercentHeight=90 Height of notches in percent
 * @property {string} primaryColor='#000' The colour of the main notches
 * @property {string} secondaryColor='#c0c0c0' The colour of the secondary
 * notches
 * @property {string} primaryFontColor='#000' The colour of the labels next to
 * the main notches
 * @property {string} secondaryFontColor='#000' The colour of the labels next to
 * the secondary notches
 * @property {string} fontFamily='Arial'
 * @property {number} fontSize=10 Font size of labels in pixels
 * @property {function} formatTimeCallback=→00:00
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
var TimelinePlugin = function () {
    _createClass(TimelinePlugin, null, [{
        key: 'create',

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
        }
    }]);

    function TimelinePlugin(params, ws) {
        var _this = this;

        _classCallCheck(this, TimelinePlugin);

        this.container = 'string' == typeof params.container ? document.querySelector(params.container) : params.container;

        if (!this.container) {
            throw new Error('No container for wavesurfer timeline');
        }
        this.wavesurfer = ws;
        this.util = ws.util;
        this.params = this.util.extend({}, {
            height: 20,
            notchPercentHeight: 90,
            primaryColor: '#000',
            secondaryColor: '#c0c0c0',
            primaryFontColor: '#000',
            secondaryFontColor: '#000',
            fontFamily: 'Arial',
            fontSize: 10,
            formatTimeCallback: function formatTimeCallback(seconds) {
                if (seconds / 60 > 1) {
                    // calculate minutes and seconds from seconds count
                    var minutes = parseInt(seconds / 60, 10);
                    seconds = parseInt(seconds % 60, 10);
                    // fill up seconds with zeroes
                    seconds = seconds < 10 ? '0' + seconds : seconds;
                    return minutes + ':' + seconds;
                }
                return Math.round(seconds * 1000) / 1000;
            },
            timeInterval: function timeInterval(pxPerSec) {
                if (pxPerSec >= 25) {
                    return 1;
                } else if (pxPerSec * 5 >= 25) {
                    return 5;
                } else if (pxPerSec * 15 >= 25) {
                    return 15;
                }
                return Math.ceil(0.5 / pxPerSec) * 60;
            },
            primaryLabelInterval: function primaryLabelInterval(pxPerSec) {
                if (pxPerSec >= 25) {
                    return 10;
                } else if (pxPerSec * 5 >= 25) {
                    return 6;
                } else if (pxPerSec * 15 >= 25) {
                    return 4;
                }
                return 4;
            },
            secondaryLabelInterval: function secondaryLabelInterval(pxPerSec) {
                if (pxPerSec >= 25) {
                    return 5;
                } else if (pxPerSec * 5 >= 25) {
                    return 2;
                } else if (pxPerSec * 15 >= 25) {
                    return 2;
                }
                return 2;
            }
        }, params);

        this.canvases = [];

        this._onZoom = function () {
            return _this.render();
        };
        this._onScroll = function () {
            if (_this.wrapper && _this.drawer.wrapper) {
                _this.wrapper.scrollLeft = _this.drawer.wrapper.scrollLeft;
            }
        };
        this._onRedraw = function () {
            return _this.render();
        };
        this._onReady = function () {
            _this.drawer = ws.drawer;
            _this.pixelRatio = ws.drawer.params.pixelRatio;
            _this.maxCanvasWidth = ws.drawer.maxCanvasWidth || ws.drawer.width;
            _this.maxCanvasElementWidth = ws.drawer.maxCanvasElementWidth || Math.round(_this.maxCanvasWidth / _this.pixelRatio);

            _this.createWrapper();
            _this.render();
            ws.drawer.wrapper.addEventListener('scroll', _this._onScroll);
            ws.on('redraw', _this._onRedraw);
            ws.on('zoom', _this._onZoom);
        };
    }

    _createClass(TimelinePlugin, [{
        key: 'init',
        value: function init() {
            this.wavesurfer.on('ready', this._onReady);
            // Check if ws is ready
            if (this.wavesurfer.isReady) {
                this._onReady();
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.unAll();
            this.wavesurfer.un('redraw', this._onRedraw);
            this.wavesurfer.un('zoom', this._onZoom);
            this.wavesurfer.un('ready', this._onReady);
            this.wavesurfer.drawer.wrapper.removeEventListener('scroll', this._onScroll);
            if (this.wrapper && this.wrapper.parentNode) {
                this.wrapper.parentNode.removeChild(this.wrapper);
                this.wrapper = null;
            }
        }
    }, {
        key: 'createWrapper',
        value: function createWrapper() {
            var _this2 = this;

            var wsParams = this.wavesurfer.params;
            this.wrapper = this.container.appendChild(document.createElement('timeline'));
            this.util.style(this.wrapper, {
                display: 'block',
                position: 'relative',
                userSelect: 'none',
                webkitUserSelect: 'none',
                height: this.params.height + 'px'
            });

            if (wsParams.fillParent || wsParams.scrollParent) {
                this.util.style(this.wrapper, {
                    width: '100%',
                    overflowX: 'hidden',
                    overflowY: 'hidden'
                });
            }

            this._onClick = function (e) {
                e.preventDefault();
                var relX = 'offsetX' in e ? e.offsetX : e.layerX;
                _this2.fireEvent('click', relX / _this2.wrapper.scrollWidth || 0);
            };
            this.wrapper.addEventListener('click', this._onClick);
        }
    }, {
        key: 'removeOldCanvases',
        value: function removeOldCanvases() {
            while (this.canvases.length > 0) {
                var canvas = this.canvases.pop();
                canvas.parentElement.removeChild(canvas);
            }
        }
    }, {
        key: 'createCanvases',
        value: function createCanvases() {
            this.removeOldCanvases();

            var totalWidth = Math.round(this.drawer.wrapper.scrollWidth);
            var requiredCanvases = Math.ceil(totalWidth / this.maxCanvasElementWidth);
            var i = void 0;

            for (i = 0; i < requiredCanvases; i++) {
                var canvas = this.wrapper.appendChild(document.createElement('canvas'));
                this.canvases.push(canvas);
                this.util.style(canvas, {
                    position: 'absolute',
                    zIndex: 4
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            this.createCanvases();
            this.updateCanvasStyle();
            this.drawTimeCanvases();
        }
    }, {
        key: 'updateCanvasStyle',
        value: function updateCanvasStyle() {
            var requiredCanvases = this.canvases.length;
            var i = void 0;
            for (i = 0; i < requiredCanvases; i++) {
                var canvas = this.canvases[i];
                var canvasWidth = this.maxCanvasElementWidth;

                if (i === requiredCanvases - 1) {
                    canvasWidth = this.drawer.wrapper.scrollWidth - this.maxCanvasElementWidth * (requiredCanvases - 1);
                }

                canvas.width = canvasWidth * this.pixelRatio;
                canvas.height = this.params.height * this.pixelRatio;
                this.util.style(canvas, {
                    width: canvasWidth + 'px',
                    height: this.params.height + 'px',
                    left: i * this.maxCanvasElementWidth + 'px'
                });
            }
        }
    }, {
        key: 'drawTimeCanvases',
        value: function drawTimeCanvases() {
            var backend = this.wavesurfer.backend;
            var wsParams = this.wavesurfer.params;
            var duration = this.wavesurfer.backend.getDuration();
            var totalSeconds = parseInt(duration, 10) + 1;
            var width = wsParams.fillParent && !wsParams.scrollParent ? this.drawer.getWidth() : this.drawer.wrapper.scrollWidth * wsParams.pixelRatio;
            var pixelsPerSecond = width / duration;

            var formatTime = this.params.formatTimeCallback;
            // if parameter is function, call the function with
            // pixelsPerSecond, otherwise simply take the value as-is
            var intervalFnOrVal = function intervalFnOrVal(option) {
                return typeof option === 'function' ? option(pixelsPerSecond) : option;
            };
            var timeInterval = intervalFnOrVal(this.params.timeInterval);
            var primaryLabelInterval = intervalFnOrVal(this.params.primaryLabelInterval);
            var secondaryLabelInterval = intervalFnOrVal(this.params.secondaryLabelInterval);

            var curPixel = 0;
            var curSeconds = 0;

            if (duration <= 0) {
                return;
            }

            var height1 = this.params.height - 4;
            var height2 = this.params.height * (this.params.notchPercentHeight / 100) - 4;
            var fontSize = this.params.fontSize * wsParams.pixelRatio;
            var i = void 0;

            for (i = 0; i < totalSeconds / timeInterval; i++) {
                if (i % primaryLabelInterval == 0) {
                    this.setFillStyles(this.params.primaryColor);
                    this.fillRect(curPixel, 0, 1, height1);
                    this.setFonts(fontSize + 'px ' + this.params.fontFamily);
                    this.setFillStyles(this.params.primaryFontColor);
                    this.fillText(formatTime(curSeconds), curPixel + 5, height1);
                } else if (i % secondaryLabelInterval == 0) {
                    this.setFillStyles(this.params.secondaryColor);
                    this.fillRect(curPixel, 0, 1, height1);
                    this.setFonts(fontSize + 'px ' + this.params.fontFamily);
                    this.setFillStyles(this.params.secondaryFontColor);
                    this.fillText(formatTime(curSeconds), curPixel + 5, height1);
                } else {
                    this.setFillStyles(this.params.secondaryColor);
                    this.fillRect(curPixel, 0, 1, height2);
                }

                curSeconds += timeInterval;
                curPixel += pixelsPerSecond * timeInterval;
            }
        }
    }, {
        key: 'setFillStyles',
        value: function setFillStyles(fillStyle) {
            this.canvases.forEach(function (canvas) {
                canvas.getContext('2d').fillStyle = fillStyle;
            });
        }
    }, {
        key: 'setFonts',
        value: function setFonts(font) {
            this.canvases.forEach(function (canvas) {
                canvas.getContext('2d').font = font;
            });
        }
    }, {
        key: 'fillRect',
        value: function fillRect(x, y, width, height) {
            var _this3 = this;

            this.canvases.forEach(function (canvas, i) {
                var leftOffset = i * _this3.maxCanvasWidth;

                var intersection = {
                    x1: Math.max(x, i * _this3.maxCanvasWidth),
                    y1: y,
                    x2: Math.min(x + width, i * _this3.maxCanvasWidth + canvas.width),
                    y2: y + height
                };

                if (intersection.x1 < intersection.x2) {
                    canvas.getContext('2d').fillRect(intersection.x1 - leftOffset, intersection.y1, intersection.x2 - intersection.x1, intersection.y2 - intersection.y1);
                }
            });
        }
    }, {
        key: 'fillText',
        value: function fillText(text, x, y) {
            var textWidth = void 0;
            var xOffset = 0;
            var i = void 0;

            for (i in this.canvases) {
                var context = this.canvases[i].getContext('2d');
                var canvasWidth = context.canvas.width;

                if (xOffset > x + textWidth) {
                    break;
                }

                if (xOffset + canvasWidth > x) {
                    textWidth = context.measureText(text).width;
                    context.fillText(text, x - xOffset, y);
                }

                xOffset += canvasWidth;
            }
        }
    }]);

    return TimelinePlugin;
}();

exports.default = TimelinePlugin;
module.exports = exports['default'];

/***/ })

/******/ });
});
//# sourceMappingURL=wavesurfer.timeline.js.map