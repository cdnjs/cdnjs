/*!
 * opus-recorder plugin for videojs-record
 * @version 3.0.0
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2018 Collab
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("opus-recorder", [], factory);
	else if(typeof exports === 'object')
		exports["opus-recorder"] = factory();
	else
		root["VideojsRecord"] = root["VideojsRecord"] || {}, root["VideojsRecord"]["opus-recorder"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/plugins/opus-recorder-plugin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/plugins/opus-recorder-plugin.js":
/*!************************************************!*\
  !*** ./src/js/plugins/opus-recorder-plugin.js ***!
  \************************************************/
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
 * @file opus-recorder-plugin.js
 * @since 1.1.0
 */
var RecordEngine = videojs.getComponent('RecordEngine');
/**
 * Audio-only engine for the opus-recorder library.
 *
 * Audio is encoded using libopus.
 *
 * @class
 * @augments RecordEngine
 */

var OpusRecorderEngine =
/*#__PURE__*/
function (_RecordEngine) {
  _inherits(OpusRecorderEngine, _RecordEngine);

  function OpusRecorderEngine() {
    _classCallCheck(this, OpusRecorderEngine);

    return _possibleConstructorReturn(this, _getPrototypeOf(OpusRecorderEngine).apply(this, arguments));
  }

  _createClass(OpusRecorderEngine, [{
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
      this.debug = debug; // also supports 'audio/wav'; but make sure to use waveEncoder worker
      // in that case

      this.audioType = 'audio/ogg';
      this.engine = new Recorder({
        leaveStreamOpen: true,
        numberOfChannels: this.audioChannels,
        bufferLength: this.bufferSize,
        encoderSampleRate: this.sampleRate,
        encoderPath: this.audioWorkerURL
      });
      this.engine.ondataavailable = this.onRecordingAvailable.bind(this);
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.audioSourceNode = this.audioContext.createMediaStreamSource(this.inputStream);
    }
    /**
     * Start recording.
     */

  }, {
    key: "start",
    value: function start() {
      var _this = this;

      this.engine.start(this.audioSourceNode).then(function () {// recording started ok
      }).catch(function (err) {
        // can't start playback
        _this.player().trigger('error', err);
      });
    }
    /**
     * Stop recording.
     */

  }, {
    key: "stop",
    value: function stop() {
      this.engine.stop();
    }
    /**
     * Pause recording.
     */

  }, {
    key: "pause",
    value: function pause() {
      this.engine.pause();
    }
    /**
     * Resume recording.
     */

  }, {
    key: "resume",
    value: function resume() {
      this.engine.resume();
    }
    /**
     * @private
     * @param {Object} data - Audio data returned by opus-recorder.
     */

  }, {
    key: "onRecordingAvailable",
    value: function onRecordingAvailable(data) {
      // Opus format stored in an Ogg container
      var blob = new Blob([data], {
        type: this.audioType
      });
      this.onStopRecording(blob);
    }
  }]);

  return OpusRecorderEngine;
}(RecordEngine); // expose plugin


videojs.OpusRecorderEngine = OpusRecorderEngine;
var _default = OpusRecorderEngine;
exports.default = _default;
module.exports = exports.default;

/***/ })

/******/ });
});
//# sourceMappingURL=videojs.record.opus-recorder.js.map