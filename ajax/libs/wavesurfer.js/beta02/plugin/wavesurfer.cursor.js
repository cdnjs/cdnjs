/*!
 * wavesurfer.js 2.0.0-beta02 (Fri Sep 22 2017 11:28:06 GMT+0200 (CEST))
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {Object} CursorPluginParams
 * @property {?boolean} deferInit Set to true to stop auto init in `addPlugin()`
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
var CursorPlugin = function () {
    _createClass(CursorPlugin, null, [{
        key: 'create',

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
                staticProps: {
                    enableCursor: function enableCursor() {
                        console.warn('Deprecated enableCursor!');
                        this.initPlugins('cursor');
                    }
                },
                instance: CursorPlugin
            };
        }
    }]);

    function CursorPlugin(params, ws) {
        var _this = this;

        _classCallCheck(this, CursorPlugin);

        this.wavesurfer = ws;
        this.style = ws.util.style;
        this._onDrawerCreated = function () {
            _this.drawer = _this.wavesurfer.drawer;
            _this.wrapper = _this.wavesurfer.drawer.wrapper;

            _this._onMousemove = function (e) {
                return _this.updateCursorPosition(_this.drawer.handleEvent(e));
            };
            _this.wrapper.addEventListener('mousemove', _this._onMousemove);

            _this._onMouseenter = function () {
                return _this.showCursor();
            };
            _this.wrapper.addEventListener('mouseenter', _this._onMouseenter);

            _this._onMouseleave = function () {
                return _this.hideCursor();
            };
            _this.wrapper.addEventListener('mouseleave', _this._onMouseleave);

            _this.cursor = _this.wrapper.appendChild(_this.style(document.createElement('wave'), {
                position: 'absolute',
                zIndex: 3,
                left: 0,
                top: 0,
                bottom: 0,
                width: '0',
                display: 'block',
                borderRightStyle: 'solid',
                borderRightWidth: 1 + 'px',
                borderRightColor: 'black',
                opacity: '.25',
                pointerEvents: 'none'
            }));
        };
    }

    _createClass(CursorPlugin, [{
        key: 'init',
        value: function init() {
            // drawer already existed, just call initialisation code
            if (this.wavesurfer.drawer) {
                this._onDrawerCreated();
            }

            // the drawer was initialised, call the initialisation code
            this.wavesurfer.on('drawer-created', this._onDrawerCreated);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.wavesurfer.un('drawer-created', this._onDrawerCreated);

            // if cursor was appended, remove it
            if (this.cursor) {
                this.cursor.parentNode.removeChild(this.cursor);
            }

            // if the drawer existed (the cached version referenced in the init code),
            // remove the event listeners attached to it
            if (this.drawer) {
                this.wrapper.removeEventListener('mousemove', this._onMousemove);
                this.wrapper.removeEventListener('mouseenter', this._onMouseenter);
                this.wrapper.removeEventListener('mouseleave', this._onMouseleave);
            }
        }
    }, {
        key: 'updateCursorPosition',
        value: function updateCursorPosition(progress) {
            var pos = Math.round(this.drawer.width * progress) / this.drawer.params.pixelRatio - 1;
            this.style(this.cursor, {
                left: pos + 'px'
            });
        }
    }, {
        key: 'showCursor',
        value: function showCursor() {
            this.style(this.cursor, {
                display: 'block'
            });
        }
    }, {
        key: 'hideCursor',
        value: function hideCursor() {
            this.style(this.cursor, {
                display: 'none'
            });
        }
    }]);

    return CursorPlugin;
}();

exports.default = CursorPlugin;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=wavesurfer.cursor.js.map