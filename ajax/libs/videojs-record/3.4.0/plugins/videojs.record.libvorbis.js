/*!
 * libvorbis plugin for videojs-record
 * @version 3.4.0
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2019 Collab
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("libvorbis", [], factory);
	else if(typeof exports === 'object')
		exports["libvorbis"] = factory();
	else
		root["VideojsRecord"] = root["VideojsRecord"] || {}, root["VideojsRecord"]["libvorbis"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/plugins/libvorbis-plugin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/plugins/libvorbis-plugin.js":
/*!********************************************!*\
  !*** ./src/js/plugins/libvorbis-plugin.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n/**\n * @file libvorbis-plugin.js\n * @since 1.1.0\n */\nvar RecordEngine = videojs.getComponent('RecordEngine');\n/**\n * Audio-only engine for the libvorbis.js library.\n *\n * @class\n * @augments RecordEngine\n */\n\nvar LibVorbisEngine =\n/*#__PURE__*/\nfunction (_RecordEngine) {\n  _inherits(LibVorbisEngine, _RecordEngine);\n\n  function LibVorbisEngine() {\n    _classCallCheck(this, LibVorbisEngine);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(LibVorbisEngine).apply(this, arguments));\n  }\n\n  _createClass(LibVorbisEngine, [{\n    key: \"setup\",\n\n    /**\n     * Setup recording engine.\n     *\n     * @param {LocalMediaStream} stream - Media stream to record.\n     * @param {Object} mediaType - Object describing the media type of this\n     *     engine.\n     * @param {Boolean} debug - Indicating whether or not debug messages should\n     *     be printed in the console.\n     */\n    value: function setup(stream, mediaType, debug) {\n      this.inputStream = stream;\n      this.mediaType = mediaType;\n      this.debug = debug; // setup libvorbis.js\n\n      this.options = {\n        audioBitsPerSecond: this.sampleRate\n      };\n    }\n    /**\n     * Start recording.\n     */\n\n  }, {\n    key: \"start\",\n    value: function start() {\n      this.chunks = [];\n      this.engine = new VorbisMediaRecorder(this.inputStream, this.options);\n      this.engine.ondataavailable = this.onData.bind(this);\n      this.engine.onstop = this.onRecordingAvailable.bind(this);\n      this.engine.start();\n    }\n    /**\n     * Stop recording.\n     */\n\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      try {\n        this.engine.stop();\n      } catch (err) {// ignore errors about invalid state\n      }\n    }\n    /**\n     * @private\n     * @param {Object} event - ondataavailable responded with data object.\n     */\n\n  }, {\n    key: \"onData\",\n    value: function onData(event) {\n      this.chunks.push(event.data);\n    }\n    /**\n     * @private\n     */\n\n  }, {\n    key: \"onRecordingAvailable\",\n    value: function onRecordingAvailable() {\n      var blob = new Blob(this.chunks, {\n        type: this.chunks[0].type\n      });\n      this.chunks = [];\n      this.onStopRecording(blob);\n    }\n  }]);\n\n  return LibVorbisEngine;\n}(RecordEngine); // expose plugin\n\n\nvideojs.LibVorbisEngine = LibVorbisEngine;\nvar _default = LibVorbisEngine;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./src/js/plugins/libvorbis-plugin.js?");

/***/ })

/******/ });
});