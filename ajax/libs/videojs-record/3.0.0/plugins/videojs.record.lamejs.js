/*!
 * lamejs plugin for videojs-record
 * @version 3.0.0
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2018 Collab
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("lamejs", [], factory);
	else if(typeof exports === 'object')
		exports["lamejs"] = factory();
	else
		root["VideojsRecord"] = root["VideojsRecord"] || {}, root["VideojsRecord"]["lamejs"] = factory();
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/plugins/lamejs-plugin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/plugins/lamejs-plugin.js":
/*!*****************************************!*\
  !*** ./src/js/plugins/lamejs-plugin.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @file lamejs-plugin.js
 * @since 1.1.0
 */
var RecordEngine = videojs.getComponent('RecordEngine');
/**
 * Audio-only engine for the lamejs library.
 *
 * @class
 * @augments RecordEngine
 */

var LamejsEngine =
/*#__PURE__*/
function (_RecordEngine) {
  _inherits(LamejsEngine, _RecordEngine);

  function LamejsEngine() {
    _classCallCheck(this, LamejsEngine);

    return _possibleConstructorReturn(this, _getPrototypeOf(LamejsEngine).apply(this, arguments));
  }

  _createClass(LamejsEngine, [{
    key: "setup",

    /**
     * Setup recording engine.
     *
     * @param {LocalMediaStream} stream - Media stream to record.
     * @param {Object} mediaType - Object describing the media type of this
     *     engine.
     * @param {Boolean} debug - Indicating whether or not debug messages should
     *     be printed in the console.
     */
    value: function setup(stream, mediaType, debug) {
      this.inputStream = stream;
      this.mediaType = mediaType;
      this.debug = debug;
      this.audioType = 'audio/mp3';
      this.config = {
        debug: this.debug,
        sampleRate: this.sampleRate,
        bitRate: this.bitRate
      };
      this.engine = new Worker(this.audioWorkerURL);
      this.engine.onmessage = this.onWorkerMessage.bind(this);
      this.engine.postMessage({
        cmd: 'init',
        config: this.config
      });
    }
    /**
     * Start recording.
     */

  }, {
    key: "start",
    value: function start() {
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.audioSourceNode = this.audioContext.createMediaStreamSource(this.inputStream); // a bufferSize of 0 instructs the browser to choose the best bufferSize

      this.processor = this.audioContext.createScriptProcessor(0, 1, 1);
      this.processor.onaudioprocess = this.onAudioProcess.bind(this);
      this.audioSourceNode.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
    }
    /**
     * Stop recording.
     */

  }, {
    key: "stop",
    value: function stop() {
      if (this.processor && this.audioSourceNode) {
        this.audioSourceNode.disconnect();
        this.processor.disconnect();
        this.processor.onaudioprocess = null;
      }

      if (this.audioContext) {
        // ignore errors about already being closed
        this.audioContext.close().then(function () {}).catch(function (reason) {});
      } // free up memory


      this.engine.postMessage({
        cmd: 'finish'
      });
    }
    /**
     * Received a message from the worker.
     *
     * @private
     * @param {Object} ev - Worker responded with event object.
     */

  }, {
    key: "onWorkerMessage",
    value: function onWorkerMessage(ev) {
      switch (ev.data.cmd) {
        case 'end':
          this.onStopRecording(new Blob(ev.data.buf, {
            type: this.audioType
          }));
          break;

        case 'error':
          this.player().trigger('error', ev.data.error);
          break;

        default:
          // invalid message received
          this.player().trigger('error', ev.data);
          break;
      }
    }
    /**
     * Continuous encoding of audio data.
     *
     * @private
     * @param {Object} ev - onaudioprocess responded with data object.
     */

  }, {
    key: "onAudioProcess",
    value: function onAudioProcess(ev) {
      // send microphone data to LAME for MP3 encoding while recording
      var data = ev.inputBuffer.getChannelData(0);
      this.engine.postMessage({
        cmd: 'encode',
        buf: data
      });
    }
  }]);

  return LamejsEngine;
}(RecordEngine); // expose plugin


videojs.LamejsEngine = LamejsEngine;
var _default = LamejsEngine;
exports.default = _default;
module.exports = exports.default;

/***/ })

/******/ });
});
//# sourceMappingURL=videojs.record.lamejs.js.map