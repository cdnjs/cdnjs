/*!
 * lamejs plugin for videojs-record
 * @version 3.4.0
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2019 Collab
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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n/**\n * @file lamejs-plugin.js\n * @since 1.1.0\n */\nvar RecordEngine = videojs.getComponent('RecordEngine');\n/**\n * Audio-only engine for the lamejs library.\n *\n * @class\n * @augments RecordEngine\n */\n\nvar LamejsEngine =\n/*#__PURE__*/\nfunction (_RecordEngine) {\n  _inherits(LamejsEngine, _RecordEngine);\n\n  function LamejsEngine() {\n    _classCallCheck(this, LamejsEngine);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(LamejsEngine).apply(this, arguments));\n  }\n\n  _createClass(LamejsEngine, [{\n    key: \"setup\",\n\n    /**\n     * Setup recording engine.\n     *\n     * @param {LocalMediaStream} stream - Media stream to record.\n     * @param {Object} mediaType - Object describing the media type of this\n     *     engine.\n     * @param {Boolean} debug - Indicating whether or not debug messages should\n     *     be printed in the console.\n     */\n    value: function setup(stream, mediaType, debug) {\n      this.inputStream = stream;\n      this.mediaType = mediaType;\n      this.debug = debug;\n      this.audioType = 'audio/mp3';\n      this.config = {\n        debug: this.debug,\n        sampleRate: this.sampleRate,\n        bitRate: this.bitRate\n      };\n      this.engine = new Worker(this.audioWorkerURL);\n      this.engine.onmessage = this.onWorkerMessage.bind(this);\n      this.engine.postMessage({\n        cmd: 'init',\n        config: this.config\n      });\n    }\n    /**\n     * Start recording.\n     */\n\n  }, {\n    key: \"start\",\n    value: function start() {\n      var AudioContext = window.AudioContext || window.webkitAudioContext;\n      this.audioContext = new AudioContext();\n      this.audioSourceNode = this.audioContext.createMediaStreamSource(this.inputStream); // a bufferSize of 0 instructs the browser to choose the best bufferSize\n\n      this.processor = this.audioContext.createScriptProcessor(0, 1, 1);\n      this.processor.onaudioprocess = this.onAudioProcess.bind(this);\n      this.audioSourceNode.connect(this.processor);\n      this.processor.connect(this.audioContext.destination);\n    }\n    /**\n     * Stop recording.\n     */\n\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      if (this.processor && this.audioSourceNode) {\n        this.audioSourceNode.disconnect();\n        this.processor.disconnect();\n        this.processor.onaudioprocess = null;\n      }\n\n      if (this.audioContext) {\n        // ignore errors about already being closed\n        this.audioContext.close().then(function () {}).catch(function (reason) {});\n      } // free up memory\n\n\n      this.engine.postMessage({\n        cmd: 'finish'\n      });\n    }\n    /**\n     * Received a message from the worker.\n     *\n     * @private\n     * @param {Object} ev - Worker responded with event object.\n     */\n\n  }, {\n    key: \"onWorkerMessage\",\n    value: function onWorkerMessage(ev) {\n      switch (ev.data.cmd) {\n        case 'end':\n          this.onStopRecording(new Blob(ev.data.buf, {\n            type: this.audioType\n          }));\n          break;\n\n        case 'error':\n          this.player().trigger('error', ev.data.error);\n          break;\n\n        default:\n          // invalid message received\n          this.player().trigger('error', ev.data);\n          break;\n      }\n    }\n    /**\n     * Continuous encoding of audio data.\n     *\n     * @private\n     * @param {Object} ev - onaudioprocess responded with data object.\n     */\n\n  }, {\n    key: \"onAudioProcess\",\n    value: function onAudioProcess(ev) {\n      // send microphone data to LAME for MP3 encoding while recording\n      var data = ev.inputBuffer.getChannelData(0);\n      this.engine.postMessage({\n        cmd: 'encode',\n        buf: data\n      });\n    }\n  }]);\n\n  return LamejsEngine;\n}(RecordEngine); // expose plugin\n\n\nvideojs.LamejsEngine = LamejsEngine;\nvar _default = LamejsEngine;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./src/js/plugins/lamejs-plugin.js?");

/***/ })

/******/ });
});