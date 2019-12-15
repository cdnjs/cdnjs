/*!
 * opus-recorder plugin for videojs-record
 * @version 3.4.0
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2019 Collab
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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n/**\n * @file opus-recorder-plugin.js\n * @since 1.1.0\n */\nvar RecordEngine = videojs.getComponent('RecordEngine');\n/**\n * Audio-only engine for the opus-recorder library.\n *\n * Audio is encoded using libopus.\n *\n * @class\n * @augments RecordEngine\n */\n\nvar OpusRecorderEngine =\n/*#__PURE__*/\nfunction (_RecordEngine) {\n  _inherits(OpusRecorderEngine, _RecordEngine);\n\n  function OpusRecorderEngine() {\n    _classCallCheck(this, OpusRecorderEngine);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(OpusRecorderEngine).apply(this, arguments));\n  }\n\n  _createClass(OpusRecorderEngine, [{\n    key: \"setup\",\n\n    /**\n     * Setup recording engine.\n     *\n     * @param {LocalMediaStream} stream - Media stream to record.\n     * @param {Object} mediaType - Object describing the media type of this\n     *     engine.\n     * @param {Boolean} debug - Indicating whether or not debug messages should\n     *     be printed in the console.\n     */\n    value: function setup(stream, mediaType, debug) {\n      this.inputStream = stream;\n      this.mediaType = mediaType;\n      this.debug = debug; // also supports 'audio/wav'; but make sure to use waveEncoder worker\n      // in that case\n\n      this.audioType = 'audio/ogg';\n      this.engine = new Recorder({\n        leaveStreamOpen: true,\n        numberOfChannels: this.audioChannels,\n        bufferLength: this.bufferSize,\n        encoderSampleRate: this.sampleRate,\n        encoderPath: this.audioWorkerURL\n      });\n      this.engine.ondataavailable = this.onRecordingAvailable.bind(this);\n      var AudioContext = window.AudioContext || window.webkitAudioContext;\n      this.audioContext = new AudioContext();\n      this.audioSourceNode = this.audioContext.createMediaStreamSource(this.inputStream);\n    }\n    /**\n     * Start recording.\n     */\n\n  }, {\n    key: \"start\",\n    value: function start() {\n      var _this = this;\n\n      this.engine.start(this.audioSourceNode).then(function () {// recording started ok\n      }).catch(function (err) {\n        // can't start playback\n        _this.player().trigger('error', err);\n      });\n    }\n    /**\n     * Stop recording.\n     */\n\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      this.engine.stop();\n    }\n    /**\n     * Pause recording.\n     */\n\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      this.engine.pause();\n    }\n    /**\n     * Resume recording.\n     */\n\n  }, {\n    key: \"resume\",\n    value: function resume() {\n      this.engine.resume();\n    }\n    /**\n     * @private\n     * @param {Object} data - Audio data returned by opus-recorder.\n     */\n\n  }, {\n    key: \"onRecordingAvailable\",\n    value: function onRecordingAvailable(data) {\n      // Opus format stored in an Ogg container\n      var blob = new Blob([data], {\n        type: this.audioType\n      });\n      this.onStopRecording(blob);\n    }\n  }]);\n\n  return OpusRecorderEngine;\n}(RecordEngine); // expose plugin\n\n\nvideojs.OpusRecorderEngine = OpusRecorderEngine;\nvar _default = OpusRecorderEngine;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./src/js/plugins/opus-recorder-plugin.js?");

/***/ })

/******/ });
});