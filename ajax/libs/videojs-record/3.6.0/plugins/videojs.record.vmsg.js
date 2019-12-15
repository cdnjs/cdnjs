/*!
 * vmsg plugin for videojs-record
 * @version 3.6.0
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2019 Collab
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vmsg", [], factory);
	else if(typeof exports === 'object')
		exports["vmsg"] = factory();
	else
		root["VideojsRecord"] = root["VideojsRecord"] || {}, root["VideojsRecord"]["vmsg"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/plugins/vmsg-plugin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nmodule.exports = _assertThisInitialized;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./node_modules/@babel/runtime/helpers/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _getPrototypeOf(o) {\n  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\nmodule.exports = _getPrototypeOf;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./node_modules/@babel/runtime/helpers/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}\n\nmodule.exports = _inherits;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./node_modules/@babel/runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    \"default\": obj\n  };\n}\n\nmodule.exports = _interopRequireDefault;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./node_modules/@babel/runtime/helpers/interopRequireDefault.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _typeof = __webpack_require__(/*! ../helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return assertThisInitialized(self);\n}\n\nmodule.exports = _possibleConstructorReturn;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _setPrototypeOf(o, p) {\n  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nmodule.exports = _setPrototypeOf;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./node_modules/@babel/runtime/helpers/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof2(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof2(obj); }\n\nfunction _typeof(obj) {\n  if (typeof Symbol === \"function\" && _typeof2(Symbol.iterator) === \"symbol\") {\n    module.exports = _typeof = function _typeof(obj) {\n      return _typeof2(obj);\n    };\n  } else {\n    module.exports = _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : _typeof2(obj);\n    };\n  }\n\n  return _typeof(obj);\n}\n\nmodule.exports = _typeof;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./node_modules/@babel/runtime/helpers/typeof.js?");

/***/ }),

/***/ "./node_modules/vmsg/vmsg.js":
/*!***********************************!*\
  !*** ./node_modules/vmsg/vmsg.js ***!
  \***********************************/
/*! exports provided: Recorder, Form, record, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Recorder\", function() { return Recorder; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Form\", function() { return Form; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"record\", function() { return record; });\n/* eslint-disable */\n\nfunction pad2(n) {\n  n |= 0;\n  return n < 10 ? `0${n}` : `${Math.min(n, 99)}`;\n}\n\nfunction inlineWorker() {\n  // TODO(Kagami): Cache compiled module in IndexedDB? It works in FF\n  // and Edge, see: https://github.com/mdn/webassembly-examples/issues/4\n  // Though gzipped WASM module currently weights ~70kb so it should be\n  // perfectly cached by the browser itself.\n  function fetchAndInstantiate(url, imports) {\n    if (!WebAssembly.instantiateStreaming) return fetchAndInstantiateFallback(url, imports);\n    const req = fetch(url, {credentials: \"same-origin\"});\n    return WebAssembly.instantiateStreaming(req, imports).catch(err => {\n      // https://github.com/Kagami/vmsg/issues/11\n      if (err.message && err.message.indexOf(\"Argument 0 must be provided and must be a Response\") > 0) {\n        return fetchAndInstantiateFallback(url, imports);\n      } else {\n        throw err;\n      }\n    });\n  }\n\n  function fetchAndInstantiateFallback(url, imports) {\n    return new Promise((resolve, reject) => {\n      const req = new XMLHttpRequest();\n      req.open(\"GET\", url);\n      req.responseType = \"arraybuffer\";\n      req.onload = () => {\n        resolve(WebAssembly.instantiate(req.response, imports));\n      };\n      req.onerror = reject;\n      req.send();\n    });\n  }\n\n  // Must be in sync with emcc settings!\n  const TOTAL_STACK = 5 * 1024 * 1024;\n  const TOTAL_MEMORY = 16 * 1024 * 1024;\n  const WASM_PAGE_SIZE = 64 * 1024;\n  let memory = null;\n  let dynamicTop = TOTAL_STACK;\n  // TODO(Kagami): Grow memory?\n  function sbrk(increment) {\n    const oldDynamicTop = dynamicTop;\n    dynamicTop += increment;\n    return oldDynamicTop;\n  }\n  // TODO(Kagami): LAME calls exit(-1) on internal error. Would be nice\n  // to provide custom DEBUGF/ERRORF for easier debugging. Currenty\n  // those functions do nothing.\n  function exit(status) {\n    postMessage({type: \"internal-error\", data: status});\n  }\n\n  let FFI = null;\n  let ref = null;\n  let pcm_l = null;\n  function vmsg_init(rate) {\n    ref = FFI.vmsg_init(rate);\n    if (!ref) return false;\n    const pcm_l_ref = new Uint32Array(memory.buffer, ref, 1)[0];\n    pcm_l = new Float32Array(memory.buffer, pcm_l_ref);\n    return true;\n  }\n  function vmsg_encode(data) {\n    pcm_l.set(data);\n    return FFI.vmsg_encode(ref, data.length) >= 0;\n  }\n  function vmsg_flush() {\n    if (FFI.vmsg_flush(ref) < 0) return null;\n    const mp3_ref = new Uint32Array(memory.buffer, ref + 4, 1)[0];\n    const size = new Uint32Array(memory.buffer, ref + 8, 1)[0];\n    const mp3 = new Uint8Array(memory.buffer, mp3_ref, size);\n    const blob = new Blob([mp3], {type: \"audio/mpeg\"});\n    FFI.vmsg_free(ref);\n    ref = null;\n    pcm_l = null;\n    return blob;\n  }\n\n  // https://github.com/brion/min-wasm-fail\n  function testSafariWebAssemblyBug() {\n    const bin = new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]);\n    const mod = new WebAssembly.Module(bin);\n    const inst = new WebAssembly.Instance(mod, {});\n    // test storing to and loading from a non-zero location via a parameter.\n    // Safari on iOS 11.2.5 returns 0 unexpectedly at non-zero locations\n    return (inst.exports.test(4) !== 0);\n  }\n\n  onmessage = (e) => {\n    const msg = e.data;\n    switch (msg.type) {\n    case \"init\":\n      const { wasmURL, shimURL } = msg.data;\n      Promise.resolve().then(() => {\n        if (self.WebAssembly && !testSafariWebAssemblyBug()) {\n          delete self.WebAssembly;\n        }\n        if (!self.WebAssembly) {\n          importScripts(shimURL);\n        }\n        memory = new WebAssembly.Memory({\n          initial: TOTAL_MEMORY / WASM_PAGE_SIZE,\n          maximum: TOTAL_MEMORY / WASM_PAGE_SIZE,\n        });\n        return {\n          memory: memory,\n          pow: Math.pow,\n          exit: exit,\n          powf: Math.pow,\n          exp: Math.exp,\n          sqrtf: Math.sqrt,\n          cos: Math.cos,\n          log: Math.log,\n          sin: Math.sin,\n          sbrk: sbrk,\n        };\n      }).then(Runtime => {\n        return fetchAndInstantiate(wasmURL, {env: Runtime})\n      }).then(wasm => {\n        FFI = wasm.instance.exports;\n        postMessage({type: \"init\", data: null});\n      }).catch(err => {\n        postMessage({type: \"init-error\", data: err.toString()});\n      });\n      break;\n    case \"start\":\n      if (!vmsg_init(msg.data)) return postMessage({type: \"error\", data: \"vmsg_init\"});\n      break;\n    case \"data\":\n      if (!vmsg_encode(msg.data)) return postMessage({type: \"error\", data: \"vmsg_encode\"});\n      break;\n    case \"stop\":\n      const blob = vmsg_flush();\n      if (!blob) return postMessage({type: \"error\", data: \"vmsg_flush\"});\n      postMessage({type: \"stop\", data: blob});\n      break;\n    }\n  };\n}\n\nclass Recorder {\n  constructor(opts = {}, onStop = null) {\n    // Can't use relative URL in blob worker, see:\n    // https://stackoverflow.com/a/22582695\n    this.wasmURL = new URL(opts.wasmURL || \"/static/js/vmsg.wasm\", location).href;\n    this.shimURL = new URL(opts.shimURL || \"/static/js/wasm-polyfill.js\", location).href;\n    this.onStop = onStop;\n    this.pitch = opts.pitch || 0;\n    this.stream = null;\n    this.audioCtx = null;\n    this.gainNode = null;\n    this.pitchFX = null;\n    this.encNode = null;\n    this.worker = null;\n    this.workerURL = null;\n    this.blob = null;\n    this.blobURL = null;\n    this.resolve = null;\n    this.reject = null;\n    Object.seal(this);\n  }\n\n  close() {\n    if (this.encNode) this.encNode.disconnect();\n    if (this.encNode) this.encNode.onaudioprocess = null;\n    if (this.audioCtx) this.audioCtx.close();\n    if (this.worker) this.worker.terminate();\n    if (this.workerURL) URL.revokeObjectURL(this.workerURL);\n    if (this.blobURL) URL.revokeObjectURL(this.blobURL);\n  }\n\n  // Without pitch shift:\n  //   [sourceNode] -> [gainNode] -> [encNode] -> [audioCtx.destination]\n  //                                     |\n  //                                     -> [worker]\n  // With pitch shift:\n  //   [sourceNode] -> [gainNode] -> [pitchFX] -> [encNode] -> [audioCtx.destination]\n  //                                                  |\n  //                                                  -> [worker]\n  initAudio() {\n    const getUserMedia = navigator.mediaDevices && navigator.mediaDevices.getUserMedia\n      ? function(constraints) {\n          return navigator.mediaDevices.getUserMedia(constraints);\n        }\n      : function(constraints) {\n          const oldGetUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;\n          if (!oldGetUserMedia) {\n            return Promise.reject(new Error(\"getUserMedia is not implemented in this browser\"));\n          }\n          return new Promise(function(resolve, reject) {\n            oldGetUserMedia.call(navigator, constraints, resolve, reject);\n          });\n        };\n\n    return getUserMedia({audio: true}).then((stream) => {\n      this.stream = stream;\n      const audioCtx = this.audioCtx = new (window.AudioContext\n        || window.webkitAudioContext)();\n\n      const sourceNode = audioCtx.createMediaStreamSource(stream);\n      const gainNode = this.gainNode = (audioCtx.createGain\n        || audioCtx.createGainNode).call(audioCtx);\n      gainNode.gain.value = 1;\n      sourceNode.connect(gainNode);\n\n      const pitchFX = this.pitchFX = new Jungle(audioCtx);\n      pitchFX.setPitchOffset(this.pitch);\n\n      const encNode = this.encNode = (audioCtx.createScriptProcessor\n        || audioCtx.createJavaScriptNode).call(audioCtx, 0, 1, 1);\n      pitchFX.output.connect(encNode);\n\n      gainNode.connect(this.pitch === 0 ? encNode : pitchFX.input);\n    });\n  }\n\n  initWorker() {\n    if (!this.stream) throw new Error(\"missing audio initialization\");\n    // https://stackoverflow.com/a/19201292\n    const blob = new Blob(\n      [\"(\", inlineWorker.toString(), \")()\"],\n      {type: \"application/javascript\"});\n    const workerURL = this.workerURL = URL.createObjectURL(blob);\n    const worker = this.worker = new Worker(workerURL);\n    const { wasmURL, shimURL } = this;\n    worker.postMessage({type: \"init\", data: {wasmURL, shimURL}});\n    return new Promise((resolve, reject) => {\n      worker.onmessage = (e) => {\n        const msg = e.data;\n        switch (msg.type) {\n        case \"init\":\n          resolve();\n          break;\n        case \"init-error\":\n          reject(new Error(msg.data));\n          break;\n        // TODO(Kagami): Error handling.\n        case \"error\":\n        case \"internal-error\":\n          console.error(\"Worker error:\", msg.data);\n          if (this.reject) this.reject(msg.data);\n          break;\n        case \"stop\":\n          this.blob = msg.data;\n          this.blobURL = URL.createObjectURL(msg.data);\n          if (this.onStop) this.onStop();\n          if (this.resolve) this.resolve(this.blob);\n          break;\n        }\n      }\n    });\n  }\n\n  init() {\n    return this.initAudio().then(this.initWorker.bind(this));\n  }\n\n  startRecording() {\n    if (!this.stream) throw new Error(\"missing audio initialization\");\n    if (!this.worker) throw new Error(\"missing worker initialization\");\n    this.blob = null;\n    if (this.blobURL) URL.revokeObjectURL(this.blobURL);\n    this.blobURL = null;\n    this.resolve = null;\n    this.reject = null;\n    this.worker.postMessage({type: \"start\", data: this.audioCtx.sampleRate});\n    this.encNode.onaudioprocess = (e) => {\n      const samples = e.inputBuffer.getChannelData(0);\n      this.worker.postMessage({type: \"data\", data: samples});\n    };\n    this.encNode.connect(this.audioCtx.destination);\n  }\n\n  stopRecording() {\n    if (!this.stream) throw new Error(\"missing audio initialization\");\n    if (!this.worker) throw new Error(\"missing worker initialization\");\n    this.encNode.disconnect();\n    this.encNode.onaudioprocess = null;\n    // Might be missed in Safari and old FF/Chrome per MDN.\n    if (this.stream.getTracks) {\n      // Hide browser's recording indicator.\n      this.stream.getTracks().forEach((track) => track.stop());\n    }\n    this.worker.postMessage({type: \"stop\", data: null});\n    return new Promise((resolve, reject) => {\n      this.resolve = resolve;\n      this.reject = reject;\n    });\n  }\n}\n\nclass Form {\n  constructor(opts = {}, resolve, reject) {\n    this.recorder = new Recorder(opts, this.onStop.bind(this));\n    this.resolve = resolve;\n    this.reject = reject;\n    this.backdrop = null;\n    this.popup = null;\n    this.recordBtn = null;\n    this.stopBtn = null;\n    this.timer = null;\n    this.audio = null;\n    this.saveBtn = null;\n    this.tid = 0;\n    this.start = 0;\n    Object.seal(this);\n\n    this.recorder.initAudio()\n      .then(() => this.drawInit())\n      .then(() => this.recorder.initWorker())\n      .then(() => this.drawAll())\n      .catch((err) => this.drawError(err));\n  }\n\n  drawInit() {\n    if (this.backdrop) return;\n    const backdrop = this.backdrop = document.createElement(\"div\");\n    backdrop.className = \"vmsg-backdrop\";\n    backdrop.addEventListener(\"click\", () => this.close(null));\n\n    const popup = this.popup = document.createElement(\"div\");\n    popup.className = \"vmsg-popup\";\n    popup.addEventListener(\"click\", (e) => e.stopPropagation());\n\n    const progress = document.createElement(\"div\");\n    progress.className = \"vmsg-progress\";\n    for (let i = 0; i < 3; i++) {\n      const progressDot = document.createElement(\"div\");\n      progressDot.className = \"vmsg-progress-dot\";\n      progress.appendChild(progressDot);\n    }\n    popup.appendChild(progress);\n\n    backdrop.appendChild(popup);\n    document.body.appendChild(backdrop);\n  }\n\n  drawTime(msecs) {\n    const secs = Math.round(msecs / 1000);\n    this.timer.textContent = pad2(secs / 60) + \":\" + pad2(secs % 60);\n  }\n\n  drawAll() {\n    this.drawInit();\n    this.clearAll();\n\n    const recordRow = document.createElement(\"div\");\n    recordRow.className = \"vmsg-record-row\";\n    this.popup.appendChild(recordRow);\n\n    const recordBtn = this.recordBtn = document.createElement(\"button\");\n    recordBtn.className = \"vmsg-button vmsg-record-button\";\n    recordBtn.textContent = \"●\";\n    recordBtn.addEventListener(\"click\", () => this.startRecording());\n    recordRow.appendChild(recordBtn);\n\n    const stopBtn = this.stopBtn = document.createElement(\"button\");\n    stopBtn.className = \"vmsg-button vmsg-stop-button\";\n    stopBtn.style.display = \"none\";\n    stopBtn.textContent = \"■\";\n    stopBtn.addEventListener(\"click\", () => this.stopRecording());\n    recordRow.appendChild(stopBtn);\n\n    const audio = this.audio = new Audio();\n    audio.autoplay = true;\n\n    const timer = this.timer = document.createElement(\"span\");\n    timer.className = \"vmsg-timer\";\n    timer.addEventListener(\"click\", () => {\n      if (audio.paused) {\n        if (this.recorder.blobURL) {\n          audio.src = this.recorder.blobURL;\n        }\n      } else {\n        audio.pause();\n      }\n    });\n    this.drawTime(0);\n    recordRow.appendChild(timer);\n\n    const saveBtn = this.saveBtn = document.createElement(\"button\");\n    saveBtn.className = \"vmsg-button vmsg-save-button\";\n    saveBtn.textContent = \"✓\";\n    saveBtn.disabled = true;\n    saveBtn.addEventListener(\"click\", () => this.close(this.recorder.blob));\n    recordRow.appendChild(saveBtn);\n\n    const gainWrapper = document.createElement(\"div\");\n    gainWrapper.className = \"vmsg-slider-wrapper vmsg-gain-slider-wrapper\";\n    const gainSlider = document.createElement(\"input\");\n    gainSlider.className = \"vmsg-slider vmsg-gain-slider\";\n    gainSlider.setAttribute(\"type\", \"range\");\n    gainSlider.min = 0;\n    gainSlider.max = 2;\n    gainSlider.step = 0.2;\n    gainSlider.value = 1;\n    gainSlider.onchange = () => {\n      const gain = +gainSlider.value;\n      this.recorder.gainNode.gain.value = gain;\n    };\n    gainWrapper.appendChild(gainSlider);\n    this.popup.appendChild(gainWrapper);\n\n    const pitchWrapper = document.createElement(\"div\");\n    pitchWrapper.className = \"vmsg-slider-wrapper vmsg-pitch-slider-wrapper\";\n    const pitchSlider = document.createElement(\"input\");\n    pitchSlider.className = \"vmsg-slider vmsg-pitch-slider\";\n    pitchSlider.setAttribute(\"type\", \"range\");\n    pitchSlider.min = -1;\n    pitchSlider.max = 1;\n    pitchSlider.step = 0.2;\n    pitchSlider.value = this.recorder.pitch;\n    pitchSlider.onchange = () => {\n      const pitch = +pitchSlider.value;\n      this.recorder.pitchFX.setPitchOffset(pitch);\n      this.recorder.gainNode.disconnect();\n      this.recorder.gainNode.connect(\n        pitch === 0 ? this.recorder.encNode : this.recorder.pitchFX.input\n      );\n    };\n    pitchWrapper.appendChild(pitchSlider);\n    this.popup.appendChild(pitchWrapper);\n  }\n\n  drawError(err) {\n    console.error(err);\n    this.drawInit();\n    this.clearAll();\n    const error = document.createElement(\"div\");\n    error.className = \"vmsg-error\";\n    error.textContent = err.toString();\n    this.popup.appendChild(error);\n  }\n\n  clearAll() {\n    if (!this.popup) return;\n    this.popup.innerHTML = \"\";\n  }\n\n  close(blob) {\n    if (this.audio) this.audio.pause();\n    if (this.tid) clearTimeout(this.tid);\n    this.recorder.close();\n    this.backdrop.remove();\n    if (blob) {\n      this.resolve(blob);\n    } else {\n      this.reject(new Error(\"No record made\"));\n    }\n  }\n\n  onStop() {\n    this.recordBtn.style.display = \"\";\n    this.stopBtn.style.display = \"none\";\n    this.stopBtn.disabled = false;\n    this.saveBtn.disabled = false;\n  }\n\n  startRecording() {\n    this.audio.pause();\n    this.start = Date.now();\n    this.updateTime();\n    this.recordBtn.style.display = \"none\";\n    this.stopBtn.style.display = \"\";\n    this.saveBtn.disabled = true;\n    this.recorder.startRecording();\n  }\n\n  stopRecording() {\n    clearTimeout(this.tid);\n    this.tid = 0;\n    this.stopBtn.disabled = true;\n    this.recorder.stopRecording();\n  }\n\n  updateTime() {\n    // NOTE(Kagami): We can do this in `onaudioprocess` but that would\n    // run too often and create unnecessary DOM updates.\n    this.drawTime(Date.now() - this.start);\n    this.tid = setTimeout(() => this.updateTime(), 300);\n  }\n}\n\nlet shown = false;\n\n/**\n * Record a new voice message.\n *\n * @param {Object=} opts - Options\n * @param {string=} opts.wasmURL - URL of the module\n *                                 (\"/static/js/vmsg.wasm\" by default)\n * @param {string=} opts.shimURL - URL of the WebAssembly polyfill\n *                                 (\"/static/js/wasm-polyfill.js\" by default)\n * @param {number=} opts.pitch - Initial pitch shift ([-1, 1], 0 by default)\n * @return {Promise.<Blob>} A promise that contains recorded blob when fulfilled.\n */\nfunction record(opts) {\n  return new Promise((resolve, reject) => {\n    if (shown) throw new Error(\"Record form is already opened\");\n    shown = true;\n    new Form(opts, resolve, reject);\n  // Use `.finally` once it's available in Safari and Edge.\n  }).then(result => {\n    shown = false;\n    return result;\n  }, err => {\n    shown = false;\n    throw err;\n  });\n}\n\n/**\n * All available public items.\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ Recorder, Form, record });\n\n// Borrowed from and slightly modified:\n// https://github.com/cwilso/Audio-Input-Effects/blob/master/js/jungle.js\n\n// Copyright 2012, Google Inc.\n// All rights reserved.\n//\n// Redistribution and use in source and binary forms, with or without\n// modification, are permitted provided that the following conditions are\n// met:\n//\n//     * Redistributions of source code must retain the above copyright\n// notice, this list of conditions and the following disclaimer.\n//     * Redistributions in binary form must reproduce the above\n// copyright notice, this list of conditions and the following disclaimer\n// in the documentation and/or other materials provided with the\n// distribution.\n//     * Neither the name of Google Inc. nor the names of its\n// contributors may be used to endorse or promote products derived from\n// this software without specific prior written permission.\n//\n// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n// \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n\nconst delayTime = 0.100;\nconst fadeTime = 0.050;\nconst bufferTime = 0.100;\n\nfunction createFadeBuffer(context, activeTime, fadeTime) {\n  var length1 = activeTime * context.sampleRate;\n  var length2 = (activeTime - 2*fadeTime) * context.sampleRate;\n  var length = length1 + length2;\n  var buffer = context.createBuffer(1, length, context.sampleRate);\n  var p = buffer.getChannelData(0);\n\n  var fadeLength = fadeTime * context.sampleRate;\n\n  var fadeIndex1 = fadeLength;\n  var fadeIndex2 = length1 - fadeLength;\n\n  // 1st part of cycle\n  for (var i = 0; i < length1; ++i) {\n    var value;\n\n    if (i < fadeIndex1) {\n        value = Math.sqrt(i / fadeLength);\n    } else if (i >= fadeIndex2) {\n        value = Math.sqrt(1 - (i - fadeIndex2) / fadeLength);\n    } else {\n        value = 1;\n    }\n\n    p[i] = value;\n  }\n\n  // 2nd part\n  for (var i = length1; i < length; ++i) {\n    p[i] = 0;\n  }\n\n  return buffer;\n}\n\nfunction createDelayTimeBuffer(context, activeTime, fadeTime, shiftUp) {\n  var length1 = activeTime * context.sampleRate;\n  var length2 = (activeTime - 2*fadeTime) * context.sampleRate;\n  var length = length1 + length2;\n  var buffer = context.createBuffer(1, length, context.sampleRate);\n  var p = buffer.getChannelData(0);\n\n  // 1st part of cycle\n  for (var i = 0; i < length1; ++i) {\n    if (shiftUp)\n      // This line does shift-up transpose\n      p[i] = (length1-i)/length;\n    else\n      // This line does shift-down transpose\n      p[i] = i / length1;\n  }\n\n  // 2nd part\n  for (var i = length1; i < length; ++i) {\n    p[i] = 0;\n  }\n\n  return buffer;\n}\n\nfunction Jungle(context) {\n  this.context = context;\n  // Create nodes for the input and output of this \"module\".\n  var input = (context.createGain || context.createGainNode).call(context);\n  var output = (context.createGain || context.createGainNode).call(context);\n  this.input = input;\n  this.output = output;\n\n  // Delay modulation.\n  var mod1 = context.createBufferSource();\n  var mod2 = context.createBufferSource();\n  var mod3 = context.createBufferSource();\n  var mod4 = context.createBufferSource();\n  this.shiftDownBuffer = createDelayTimeBuffer(context, bufferTime, fadeTime, false);\n  this.shiftUpBuffer = createDelayTimeBuffer(context, bufferTime, fadeTime, true);\n  mod1.buffer = this.shiftDownBuffer;\n  mod2.buffer = this.shiftDownBuffer;\n  mod3.buffer = this.shiftUpBuffer;\n  mod4.buffer = this.shiftUpBuffer;\n  mod1.loop = true;\n  mod2.loop = true;\n  mod3.loop = true;\n  mod4.loop = true;\n\n  // for switching between oct-up and oct-down\n  var mod1Gain = (context.createGain || context.createGainNode).call(context);\n  var mod2Gain = (context.createGain || context.createGainNode).call(context);\n  var mod3Gain = (context.createGain || context.createGainNode).call(context);\n  mod3Gain.gain.value = 0;\n  var mod4Gain = (context.createGain || context.createGainNode).call(context);\n  mod4Gain.gain.value = 0;\n\n  mod1.connect(mod1Gain);\n  mod2.connect(mod2Gain);\n  mod3.connect(mod3Gain);\n  mod4.connect(mod4Gain);\n\n  // Delay amount for changing pitch.\n  var modGain1 = (context.createGain || context.createGainNode).call(context);\n  var modGain2 = (context.createGain || context.createGainNode).call(context);\n\n  var delay1 = (context.createDelay || context.createDelayNode).call(context);\n  var delay2 = (context.createDelay || context.createDelayNode).call(context);\n  mod1Gain.connect(modGain1);\n  mod2Gain.connect(modGain2);\n  mod3Gain.connect(modGain1);\n  mod4Gain.connect(modGain2);\n  modGain1.connect(delay1.delayTime);\n  modGain2.connect(delay2.delayTime);\n\n  // Crossfading.\n  var fade1 = context.createBufferSource();\n  var fade2 = context.createBufferSource();\n  var fadeBuffer = createFadeBuffer(context, bufferTime, fadeTime);\n  fade1.buffer = fadeBuffer\n  fade2.buffer = fadeBuffer;\n  fade1.loop = true;\n  fade2.loop = true;\n\n  var mix1 = (context.createGain || context.createGainNode).call(context);\n  var mix2 = (context.createGain || context.createGainNode).call(context);\n  mix1.gain.value = 0;\n  mix2.gain.value = 0;\n\n  fade1.connect(mix1.gain);\n  fade2.connect(mix2.gain);\n\n  // Connect processing graph.\n  input.connect(delay1);\n  input.connect(delay2);\n  delay1.connect(mix1);\n  delay2.connect(mix2);\n  mix1.connect(output);\n  mix2.connect(output);\n\n  // Start\n  var t = context.currentTime + 0.050;\n  var t2 = t + bufferTime - fadeTime;\n  mod1.start(t);\n  mod2.start(t2);\n  mod3.start(t);\n  mod4.start(t2);\n  fade1.start(t);\n  fade2.start(t2);\n\n  this.mod1 = mod1;\n  this.mod2 = mod2;\n  this.mod1Gain = mod1Gain;\n  this.mod2Gain = mod2Gain;\n  this.mod3Gain = mod3Gain;\n  this.mod4Gain = mod4Gain;\n  this.modGain1 = modGain1;\n  this.modGain2 = modGain2;\n  this.fade1 = fade1;\n  this.fade2 = fade2;\n  this.mix1 = mix1;\n  this.mix2 = mix2;\n  this.delay1 = delay1;\n  this.delay2 = delay2;\n\n  this.setDelay(delayTime);\n}\n\nJungle.prototype.setDelay = function(delayTime) {\n  this.modGain1.gain.setTargetAtTime(0.5*delayTime, 0, 0.010);\n  this.modGain2.gain.setTargetAtTime(0.5*delayTime, 0, 0.010);\n};\n\nJungle.prototype.setPitchOffset = function(mult) {\n  if (mult>0) { // pitch up\n    this.mod1Gain.gain.value = 0;\n    this.mod2Gain.gain.value = 0;\n    this.mod3Gain.gain.value = 1;\n    this.mod4Gain.gain.value = 1;\n  } else { // pitch down\n    this.mod1Gain.gain.value = 1;\n    this.mod2Gain.gain.value = 1;\n    this.mod3Gain.gain.value = 0;\n    this.mod4Gain.gain.value = 0;\n  }\n  this.setDelay(delayTime*Math.abs(mult));\n};\n\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./node_modules/vmsg/vmsg.js?");

/***/ }),

/***/ "./src/js/plugins/vmsg-plugin.js":
/*!***************************************!*\
  !*** ./src/js/plugins/vmsg-plugin.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\"));\n\nvar _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\"));\n\nvar _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\"));\n\nvar _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\"));\n\nvar _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\"));\n\nvar _vmsg = __webpack_require__(/*! vmsg */ \"./node_modules/vmsg/vmsg.js\");\n\nvar RecordEngine = videojs.getComponent('RecordEngine');\n\nvar VmsgEngine = function (_RecordEngine) {\n  (0, _inherits2.default)(VmsgEngine, _RecordEngine);\n\n  function VmsgEngine() {\n    (0, _classCallCheck2.default)(this, VmsgEngine);\n    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(VmsgEngine).apply(this, arguments));\n  }\n\n  (0, _createClass2.default)(VmsgEngine, [{\n    key: \"setup\",\n    value: function setup(stream, mediaType, debug) {\n      var _this = this;\n\n      this.inputStream = stream;\n      this.mediaType = mediaType;\n      this.debug = debug;\n      this.config = {\n        wasmURL: this.audioWebAssemblyURL\n      };\n      this.engine = new _vmsg.Recorder(this.config, this.onRecordingAvailable.bind(this));\n      this.engine.stream = this.inputStream;\n      var AudioContext = window.AudioContext || window.webkitAudioContext;\n      this.audioContext = new AudioContext();\n      this.audioSourceNode = this.audioContext.createMediaStreamSource(this.inputStream);\n      this.processor = this.audioContext.createScriptProcessor(0, 1, 1);\n      this.audioSourceNode.connect(this.processor);\n      this.engine.initWorker().catch(function (err) {\n        _this.player().trigger('error', err);\n      });\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      this.engine.blob = null;\n\n      if (this.engine.blobURL) {\n        URL.revokeObjectURL(this.engine.blobURL);\n      }\n\n      this.engine.blobURL = null;\n      this.engine.worker.postMessage({\n        type: 'start',\n        data: this.audioContext.sampleRate\n      });\n      this.processor.onaudioprocess = this.onAudioProcess.bind(this);\n      this.processor.connect(this.audioContext.destination);\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      if (this.processor) {\n        this.processor.disconnect();\n        this.processor.onaudioprocess = null;\n      }\n\n      if (this.engine && this.engine.worker !== undefined) {\n        this.engine.worker.postMessage({\n          type: 'stop',\n          data: null\n        });\n      }\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      if (this.engine && typeof this.engine.close === 'function') {\n        this.engine.close();\n      }\n    }\n  }, {\n    key: \"onAudioProcess\",\n    value: function onAudioProcess(event) {\n      var samples = event.inputBuffer.getChannelData(0);\n      this.engine.worker.postMessage({\n        type: 'data',\n        data: samples\n      });\n    }\n  }, {\n    key: \"onRecordingAvailable\",\n    value: function onRecordingAvailable() {\n      this.onStopRecording(this.engine.blob);\n    }\n  }]);\n  return VmsgEngine;\n}(RecordEngine);\n\nvideojs.VmsgEngine = VmsgEngine;\nvar _default = VmsgEngine;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack://VideojsRecord.%5Bname%5D/./src/js/plugins/vmsg-plugin.js?");

/***/ })

/******/ });
});