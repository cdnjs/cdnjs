/*!
 * videojs-record
 * @version 3.0.0
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2018 Collab
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("videojs"));
	else if(typeof define === 'function' && define.amd)
		define("VideojsRecord", ["videojs"], factory);
	else if(typeof exports === 'object')
		exports["VideojsRecord"] = factory(require("videojs"));
	else
		root["VideojsRecord"] = factory(root["videojs"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_video_js__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/global/window.js":
/*!***************************************!*\
  !*** ./node_modules/global/window.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/css/videojs.record.scss":
/*!*************************************!*\
  !*** ./src/css/videojs.record.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/js/controls/animation-display.js":
/*!**********************************************!*\
  !*** ./src/js/controls/animation-display.js ***!
  \**********************************************/
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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @file animation-display.js
 * @since 2.0.0
 */
var Component = videojs.getComponent('Component');
/**
 * Image for displaying animated GIF image.
 *
 * @class
 * @augments videojs.Component
*/

var AnimationDisplay =
/*#__PURE__*/
function (_Component) {
  _inherits(AnimationDisplay, _Component);

  function AnimationDisplay() {
    _classCallCheck(this, AnimationDisplay);

    return _possibleConstructorReturn(this, _getPrototypeOf(AnimationDisplay).apply(this, arguments));
  }

  _createClass(AnimationDisplay, [{
    key: "createEl",

    /**
     * Create the `AnimationDisplay`s DOM element.
     *
     * @return {Element}
     *         The dom element that gets created.
     */
    value: function createEl() {
      return _get(_getPrototypeOf(AnimationDisplay.prototype), "createEl", this).call(this, 'div', {
        className: 'vjs-animation-display',
        innerHTML: '<img />'
      });
    }
  }]);

  return AnimationDisplay;
}(Component);

Component.registerComponent('AnimationDisplay', AnimationDisplay);
var _default = AnimationDisplay;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/controls/camera-button.js":
/*!******************************************!*\
  !*** ./src/js/controls/camera-button.js ***!
  \******************************************/
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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @file camera-button.js
 * @since 2.0.0
 */
var Button = videojs.getComponent('Button');
var Component = videojs.getComponent('Component');
/**
 * Button to toggle between create and retry snapshot image.
 *
 * @class
 * @augments videojs.Button
*/

var CameraButton =
/*#__PURE__*/
function (_Button) {
  _inherits(CameraButton, _Button);

  function CameraButton() {
    _classCallCheck(this, CameraButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(CameraButton).apply(this, arguments));
  }

  _createClass(CameraButton, [{
    key: "buildCSSClass",

    /**
     * Builds the default DOM `className`.
     *
     * @return {string}
     *         The DOM `className` for this object.
     */
    value: function buildCSSClass() {
      return 'vjs-camera-button vjs-control vjs-button vjs-icon-photo-camera';
    }
    /**
     * Enable the `CameraButton` element so that it can be activated or clicked.
     */

  }, {
    key: "enable",
    value: function enable() {
      _get(_getPrototypeOf(CameraButton.prototype), "enable", this).call(this);

      this.on(this.player_, 'startRecord', this.onStart);
      this.on(this.player_, 'stopRecord', this.onStop);
    }
    /**
     * Disable the `CameraButton` element so that it cannot be activated or clicked.
     */

  }, {
    key: "disable",
    value: function disable() {
      _get(_getPrototypeOf(CameraButton.prototype), "disable", this).call(this);

      this.off(this.player_, 'startRecord', this.onStart);
      this.off(this.player_, 'stopRecord', this.onStop);
    }
    /**
     * This gets called when the button is clicked.
     *
     * @param {EventTarget~Event} event
     *        The `tap` or `click` event that caused this function to be
     *        called.
     *
     * @listens tap
     * @listens click
     */

  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var recorder = this.player_.record();

      if (!recorder.isProcessing()) {
        // create snapshot
        recorder.start();
      } else {
        // retry
        recorder.retrySnapshot(); // reset camera button

        this.onStop();
      }
    }
    /**
     * Add the vjs-icon-replay class to the element so it can change appearance.
     *
     * @param {EventTarget~Event} [event]
     *        The event that caused this function to run.
     *
     * @listens Player#startRecord
     */

  }, {
    key: "onStart",
    value: function onStart(event) {
      // replace element class so it can change appearance
      this.removeClass('vjs-icon-photo-camera');
      this.addClass('vjs-icon-replay'); // change the button text

      this.controlText('Retry');
    }
    /**
     * Add the vjs-icon-photo-camera class to the element so it can change appearance.
     *
     * @param {EventTarget~Event} [event]
     *        The event that caused this function to run.
     *
     * @listens Player#stopRecord
     */

  }, {
    key: "onStop",
    value: function onStop(event) {
      // replace element class so it can change appearance
      this.removeClass('vjs-icon-replay');
      this.addClass('vjs-icon-photo-camera'); // change the button text

      this.controlText('Image');
    }
  }]);

  return CameraButton;
}(Button);
/**
 * The text that should display over the `CameraButton`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */


CameraButton.prototype.controlText_ = 'Image';
Component.registerComponent('CameraButton', CameraButton);
var _default = CameraButton;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/controls/device-button.js":
/*!******************************************!*\
  !*** ./src/js/controls/device-button.js ***!
  \******************************************/
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
 * @file device-button.js
 * @since 2.0.0
 */
var Button = videojs.getComponent('Button');
var Component = videojs.getComponent('Component');
/**
 * Button to select recording device.
 *
 * @class
 * @augments videojs.Button
*/

var DeviceButton =
/*#__PURE__*/
function (_Button) {
  _inherits(DeviceButton, _Button);

  function DeviceButton() {
    _classCallCheck(this, DeviceButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(DeviceButton).apply(this, arguments));
  }

  _createClass(DeviceButton, [{
    key: "handleClick",

    /**
     * This gets called when this button gets:
     *
     * - Clicked (via the `click` event, listening starts in the constructor)
     * - Tapped (via the `tap` event, listening starts in the constructor)
     *
     * @param {EventTarget~Event} event
     *        The `keydown`, `tap`, or `click` event that caused this function to be
     *        called.
     *
     * @listens tap
     * @listens click
     */
    value: function handleClick(event) {
      // open device dialog
      this.player_.record().getDevice();
    }
  }]);

  return DeviceButton;
}(Button);
/**
 * The text that should display over the `DeviceButton`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */


DeviceButton.prototype.controlText_ = 'Device';
Component.registerComponent('DeviceButton', DeviceButton);
var _default = DeviceButton;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/controls/record-canvas.js":
/*!******************************************!*\
  !*** ./src/js/controls/record-canvas.js ***!
  \******************************************/
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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @file record-canvas
 * @since 2.0.0
 */
var Component = videojs.getComponent('Component');
/**
 * Canvas for displaying snapshot image.
 *
 * @class
 * @augments videojs.Component
*/

var RecordCanvas =
/*#__PURE__*/
function (_Component) {
  _inherits(RecordCanvas, _Component);

  function RecordCanvas() {
    _classCallCheck(this, RecordCanvas);

    return _possibleConstructorReturn(this, _getPrototypeOf(RecordCanvas).apply(this, arguments));
  }

  _createClass(RecordCanvas, [{
    key: "createEl",

    /**
     * Create the `RecordCanvas`s DOM element.
     *
     * @return {Element}
     *         The dom element that gets created.
     */
    value: function createEl() {
      return _get(_getPrototypeOf(RecordCanvas.prototype), "createEl", this).call(this, 'div', {
        className: 'vjs-record-canvas',
        innerHTML: '<canvas></canvas>'
      });
    }
  }]);

  return RecordCanvas;
}(Component);

Component.registerComponent('RecordCanvas', RecordCanvas);
var _default = RecordCanvas;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/controls/record-indicator.js":
/*!*********************************************!*\
  !*** ./src/js/controls/record-indicator.js ***!
  \*********************************************/
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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @file record-indicator.js
 * @since 2.0.0
 */
var Component = videojs.getComponent('Component');
/**
 * Icon indicating recording is active.
 *
 * @class
 * @augments videojs.Component
*/

var RecordIndicator =
/*#__PURE__*/
function (_Component) {
  _inherits(RecordIndicator, _Component);

  /**
   * The constructor function for the class.
   *
   * @private
   * @param {(videojs.Player|Object)} player - Video.js player instance.
   * @param {Object} options - Player options.
   */
  function RecordIndicator(player, options) {
    var _this;

    _classCallCheck(this, RecordIndicator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RecordIndicator).call(this, player, options));

    _this.enable();

    return _this;
  }
  /**
   * Create the `RecordIndicator`s DOM element.
   *
   * @return {Element}
   *         The dom element that gets created.
   */


  _createClass(RecordIndicator, [{
    key: "createEl",
    value: function createEl() {
      return _get(_getPrototypeOf(RecordIndicator.prototype), "createEl", this).call(this, 'div', {
        className: 'vjs-record-indicator vjs-control',
        dir: 'ltr'
      });
    }
    /**
     * Enable event handlers.
     */

  }, {
    key: "enable",
    value: function enable() {
      this.on(this.player_, 'startRecord', this.show);
      this.on(this.player_, 'stopRecord', this.hide);
    }
    /**
     * Disable event handlers.
     */

  }, {
    key: "disable",
    value: function disable() {
      this.off(this.player_, 'startRecord', this.show);
      this.off(this.player_, 'stopRecord', this.hide);
    }
  }]);

  return RecordIndicator;
}(Component);

Component.registerComponent('RecordIndicator', RecordIndicator);
var _default = RecordIndicator;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/controls/record-toggle.js":
/*!******************************************!*\
  !*** ./src/js/controls/record-toggle.js ***!
  \******************************************/
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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @file record-toggle.js
 * @since 2.0.0
 */
var Button = videojs.getComponent('Button');
var Component = videojs.getComponent('Component');
/**
 * Button to toggle between start and stop recording.
 *
 * @class
 * @augments videojs.Button
*/

var RecordToggle =
/*#__PURE__*/
function (_Button) {
  _inherits(RecordToggle, _Button);

  function RecordToggle() {
    _classCallCheck(this, RecordToggle);

    return _possibleConstructorReturn(this, _getPrototypeOf(RecordToggle).apply(this, arguments));
  }

  _createClass(RecordToggle, [{
    key: "buildCSSClass",

    /**
     * Builds the default DOM `className`.
     *
     * @return {string}
     *         The DOM `className` for this object.
     */
    value: function buildCSSClass() {
      return 'vjs-record-button vjs-control vjs-button vjs-icon-record-start';
    }
    /**
     * Enable the `RecordToggle` element so that it can be activated or clicked.
     */

  }, {
    key: "enable",
    value: function enable() {
      _get(_getPrototypeOf(RecordToggle.prototype), "enable", this).call(this);

      this.on(this.player_, 'startRecord', this.onStart);
      this.on(this.player_, 'stopRecord', this.onStop);
    }
    /**
     * Disable the `RecordToggle` element so that it cannot be activated or clicked.
     */

  }, {
    key: "disable",
    value: function disable() {
      _get(_getPrototypeOf(RecordToggle.prototype), "disable", this).call(this);

      this.off(this.player_, 'startRecord', this.onStart);
      this.off(this.player_, 'stopRecord', this.onStop);
    }
    /**
     * This gets called when the button is clicked.
     *
     * @param {EventTarget~Event} event
     *        The `tap` or `click` event that caused this function to be
     *        called.
     *
     * @listens tap
     * @listens click
     */

  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var recorder = this.player_.record();

      if (!recorder.isRecording()) {
        recorder.start();
      } else {
        recorder.stop();
      }
    }
    /**
     * Add the vjs-icon-record-stop class to the element so it can change appearance.
     *
     * @param {EventTarget~Event} [event]
     *        The event that caused this function to run.
     *
     * @listens Player#startRecord
     */

  }, {
    key: "onStart",
    value: function onStart(event) {
      // replace element class so it can change appearance
      this.removeClass('vjs-icon-record-start');
      this.addClass('vjs-icon-record-stop'); // change the button text

      this.controlText('Stop');
    }
    /**
     * Add the vjs-icon-record-start class to the element so it can change appearance.
     *
     * @param {EventTarget~Event} [event]
     *        The event that caused this function to run.
     *
     * @listens Player#stopRecord
     */

  }, {
    key: "onStop",
    value: function onStop(event) {
      // replace element class so it can change appearance
      this.removeClass('vjs-icon-record-stop');
      this.addClass('vjs-icon-record-start'); // change the button text

      this.controlText('Record');
    }
  }]);

  return RecordToggle;
}(Button);
/**
 * The text that should display over the `RecordToggle`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */


RecordToggle.prototype.controlText_ = 'Record';
Component.registerComponent('RecordToggle', RecordToggle);
var _default = RecordToggle;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/defaults.js":
/*!****************************!*\
  !*** ./src/js/defaults.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @file defaults.js
 * @since 2.0.0
 */
//plugin defaults
var pluginDefaultOptions = {
  // Single snapshot image.
  image: false,
  // Include audio in the recorded clip.
  audio: false,
  // Include video in the recorded clip.
  video: false,
  // Animated GIF.
  animation: false,
  // Screen capture.
  screen: false,
  // Maximum length of the recorded clip.
  maxLength: 10,
  // Maximum file size of the recorded clip. Works only when the timeSlice
  // option is also enabled.
  maxFileSize: 0,
  // msDisplayMax indicates the number of seconds that is
  // considered the boundary value for displaying milliseconds
  // in the time controls. An audio clip with a total length of
  // 2 seconds and a msDisplayMax of 3 will use the format
  // M:SS:MMM. Clips longer than msDisplayMax will be displayed
  // as M:SS or HH:MM:SS.
  msDisplayMax: 3,
  // Width of the recorded video frames.
  frameWidth: 320,
  // Height of the recorded video frames.
  frameHeight: 240,
  // Enables console logging for debugging purposes.
  debug: false,
  // Turn off the camera/mic (and light) when audio and/or video recording
  // stops, and turns them on again when you resume recording.
  autoMuteDevice: false,
  // The mime type for the video recorder. Default to 'video/webm'.
  // Use 'video/mp4' (Firefox) or 'video/webm;codecs=H264' (Chrome 52 and
  // newer) for MP4.
  videoMimeType: 'video/webm',
  // Video recorder type to use. This allows you to specify an alternative
  // recorder class, e.g. WhammyRecorder. Defaults to 'auto' which let's
  // recordrtc specify the best available recorder type.
  videoRecorderType: 'auto',
  // Audio recording library to use. Legal values are 'recordrtc',
  // 'libvorbis.js', 'opus-recorder', 'lamejs' and 'recorder.js'.
  audioEngine: 'recordrtc',
  // Audio recorder type to use. This allows you to specify an alternative
  // recorder class, e.g. StereoAudioRecorder. Defaults to 'auto' which let's
  // recordrtc specify the best available recorder type. Currently this
  // setting is only used with the 'recordrtc' audioEngine.
  audioRecorderType: 'auto',
  // The mime type for the audio recorder. Defaults to 'auto' which will pick
  // the best option available in the browser (e.g. either 'audio/wav',
  // 'audio/ogg' or 'audio/webm').
  audioMimeType: 'auto',
  // The size of the audio buffer (in sample-frames) which needs to
  // be processed each time onprocessaudio is called.
  // From the spec: This value controls how frequently the audioprocess event is
  // dispatched and how many sample-frames need to be processed each call.
  // Lower values for buffer size will result in a lower (better) latency.
  // Higher values will be necessary to avoid audio breakup and glitches.
  // Legal values are 256, 512, 1024, 2048, 4096, 8192 or 16384.
  audioBufferSize: 4096,
  // The audio sample rate (in sample-frames per second) at which the
  // AudioContext handles audio. It is assumed that all AudioNodes
  // in the context run at this rate. In making this assumption,
  // sample-rate converters or "varispeed" processors are not supported
  // in real-time processing.
  // The sampleRate parameter describes the sample-rate of the
  // linear PCM audio data in the buffer in sample-frames per second.
  // An implementation must support sample-rates in at least
  // the range 22050 to 96000.
  audioSampleRate: 44100,
  // The audio bitrate in kbps (only used in lamejs plugin).
  audioBitRate: 128,
  // Allows you to record single-channel audio, which can reduce the
  // file size.
  audioChannels: 2,
  // URL for the audio worker.
  audioWorkerURL: '',
  // Enables the audioBufferUpdate event that provides realtime AudioBuffer
  // instances from the input audio device.
  audioBufferUpdate: false,
  // Frame rate in frames per second.
  animationFrameRate: 200,
  // Sets quality of color quantization (conversion of images to the
  // maximum 256 colors allowed by the GIF specification).
  // Lower values (minimum = 1) produce better colors,
  // but slow processing significantly. 10 is the default,
  // and produces good color mapping at reasonable speeds.
  // Values greater than 20 do not yield significant improvements
  // in speed.
  animationQuality: 10,
  // Accepts numbers in milliseconds; use this to force intervals-based blobs.
  timeSlice: 0
};
var _default = pluginDefaultOptions;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/engine/record-engine.js":
/*!****************************************!*\
  !*** ./src/js/engine/record-engine.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OPUSRECORDER = exports.LAMEJS = exports.RECORDERJS = exports.LIBVORBISJS = exports.RECORDRTC = exports.RecordEngine = void 0;

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
 * @file record-engine.js
 * @since 2.0.0
 */
var Component = videojs.getComponent('Component'); // supported recorder plugin engines

var RECORDRTC = 'recordrtc';
exports.RECORDRTC = RECORDRTC;
var LIBVORBISJS = 'libvorbis.js';
exports.LIBVORBISJS = LIBVORBISJS;
var RECORDERJS = 'recorder.js';
exports.RECORDERJS = RECORDERJS;
var LAMEJS = 'lamejs';
exports.LAMEJS = LAMEJS;
var OPUSRECORDER = 'opus-recorder';
/**
 * Base class for recorder backends.
 * @class
 * @augments videojs.Component
 */

exports.OPUSRECORDER = OPUSRECORDER;

var RecordEngine =
/*#__PURE__*/
function (_Component) {
  _inherits(RecordEngine, _Component);

  /**
   * Creates an instance of this class.
   *
   * @param  {Player} player
   *         The `Player` that this class should be attached to.
   *
   * @param  {Object} [options]
   *         The key/value store of player options.
   */
  function RecordEngine(player, options) {
    _classCallCheck(this, RecordEngine);

    // auto mixin the evented mixin (required since video.js v6.6.0)
    options.evented = true;
    return _possibleConstructorReturn(this, _getPrototypeOf(RecordEngine).call(this, player, options));
  }
  /**
   * Remove any temporary data and references to streams.
   * @private
   */


  _createClass(RecordEngine, [{
    key: "dispose",
    value: function dispose() {
      // dispose previous recording
      if (this.recordedData !== undefined) {
        URL.revokeObjectURL(this.recordedData);
      }
    }
    /**
     * Add filename and timestamp to recorded file object.
     *
     * @param {(Blob|File)} fileObj - Blob or File object to modify.
     */

  }, {
    key: "addFileInfo",
    value: function addFileInfo(fileObj) {
      if (fileObj instanceof Blob || fileObj instanceof File) {
        // set modification date
        var now = new Date();

        try {
          fileObj.lastModified = now.getTime();
          fileObj.lastModifiedDate = now;
        } catch (e) {
          if (e instanceof TypeError) {// ignore: setting getter-only property "lastModifiedDate"
          } else {
            // re-raise error
            throw e;
          }
        } // guess extension name from mime type, e.g. audio/ogg, but
        // any extension is valid here. Chrome also accepts extended
        // mime types like video/webm;codecs=h264,vp9,opus


        var fileExtension = '.' + fileObj.type.split('/')[1];

        if (fileExtension.indexOf(';') > -1) {
          fileExtension = fileExtension.split(';')[0];
        } // use timestamp in filename, e.g. 1451180941326.ogg


        try {
          fileObj.name = now.getTime() + fileExtension;
        } catch (e) {
          if (e instanceof TypeError) {// ignore: setting getter-only property "name"
          } else {
            // re-raise error
            throw e;
          }
        }
      }
    }
    /**
     * Invoked when recording is stopped and resulting stream is available.
     *
     * @param {blob} data - Reference to the recorded Blob.
     * @private
     */

  }, {
    key: "onStopRecording",
    value: function onStopRecording(data) {
      this.recordedData = data; // add filename and timestamp to recorded file object

      this.addFileInfo(this.recordedData); // remove reference to recorded stream

      this.dispose(); // notify listeners

      this.trigger('recordComplete');
    }
    /**
     * Show save as dialog in browser so the user can store the recorded media
     * locally.
     *
     * @param {Object} name - Object with names for the particular blob(s)
     *     you want to save. File extensions are added automatically. For
     *     example: {'video': 'name-of-video-file'}. Supported keys are
     *     'audio', 'video' and 'gif'.
     * @example
     * // save video file as 'foo.webm'
     * player.record().saveAs({'video': 'foo'});
     * @returns {void}
     */

  }, {
    key: "saveAs",
    value: function saveAs(name) {
      var fileName = name[Object.keys(name)[0]];

      if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
        return navigator.msSaveOrOpenBlob(this.recordedData, fileName);
      } else if (typeof navigator.msSaveBlob !== 'undefined') {
        return navigator.msSaveBlob(this.recordedData, fileName);
      }

      var hyperlink = document.createElement('a');
      hyperlink.href = URL.createObjectURL(this.recordedData);
      hyperlink.download = fileName;
      hyperlink.style = 'display:none;opacity:0;color:transparent;';
      (document.body || document.documentElement).appendChild(hyperlink);

      if (typeof hyperlink.click === 'function') {
        hyperlink.click();
      } else {
        hyperlink.target = '_blank';
        hyperlink.dispatchEvent(new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        }));
      }

      URL.revokeObjectURL(hyperlink.href);
    }
  }]);

  return RecordEngine;
}(Component); // expose component for external plugins


exports.RecordEngine = RecordEngine;
videojs.RecordEngine = RecordEngine;
Component.registerComponent('RecordEngine', RecordEngine);

/***/ }),

/***/ "./src/js/engine/record-mode.js":
/*!**************************************!*\
  !*** ./src/js/engine/record-mode.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCREEN_ONLY = exports.ANIMATION = exports.AUDIO_VIDEO = exports.VIDEO_ONLY = exports.AUDIO_ONLY = exports.IMAGE_ONLY = exports.getRecorderMode = void 0;

/**
 * @file record-mode.js
 * @since 2.0.0
 */
// recorder modes
var IMAGE_ONLY = 'image_only';
exports.IMAGE_ONLY = IMAGE_ONLY;
var AUDIO_ONLY = 'audio_only';
exports.AUDIO_ONLY = AUDIO_ONLY;
var VIDEO_ONLY = 'video_only';
exports.VIDEO_ONLY = VIDEO_ONLY;
var AUDIO_VIDEO = 'audio_video';
exports.AUDIO_VIDEO = AUDIO_VIDEO;
var ANIMATION = 'animation';
exports.ANIMATION = ANIMATION;
var SCREEN_ONLY = 'screen_only';
exports.SCREEN_ONLY = SCREEN_ONLY;

var getRecorderMode = function getRecorderMode(image, audio, video, animation, screen) {
  if (isModeEnabled(image)) {
    return IMAGE_ONLY;
  } else if (isModeEnabled(animation)) {
    return ANIMATION;
  } else if (isModeEnabled(screen)) {
    return SCREEN_ONLY;
  } else if (isModeEnabled(audio) && !isModeEnabled(video)) {
    return AUDIO_ONLY;
  } else if (isModeEnabled(audio) && isModeEnabled(video)) {
    return AUDIO_VIDEO;
  } else if (!isModeEnabled(audio) && isModeEnabled(video)) {
    return VIDEO_ONLY;
  }
};
/**
 * Check whether mode is enabled or not.
 *
 * @param {(Object|Boolean)} mode - Mode.
 * @returns {Boolean} Return boolean indicating whether mode is enabled or not.
 * @private
 */


exports.getRecorderMode = getRecorderMode;

var isModeEnabled = function isModeEnabled(mode) {
  return mode === Object(mode) || mode === true;
};

/***/ }),

/***/ "./src/js/engine/record-rtc.js":
/*!*************************************!*\
  !*** ./src/js/engine/record-rtc.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _recordEngine = __webpack_require__(/*! ./record-engine */ "./src/js/engine/record-engine.js");

var _detectBrowser = __webpack_require__(/*! ../utils/detect-browser */ "./src/js/utils/detect-browser.js");

var _recordMode = __webpack_require__(/*! ./record-mode */ "./src/js/engine/record-mode.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Component = videojs.getComponent('Component');
/**
 * Engine used with the MRecordRTC class in the RecordRTC library.
 *
 * @class
 * @augments videojs.RecordEngine
 */

var RecordRTCEngine =
/*#__PURE__*/
function (_RecordEngine) {
  _inherits(RecordRTCEngine, _RecordEngine);

  function RecordRTCEngine() {
    _classCallCheck(this, RecordRTCEngine);

    return _possibleConstructorReturn(this, _getPrototypeOf(RecordRTCEngine).apply(this, arguments));
  }

  _createClass(RecordRTCEngine, [{
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

      if ('screen' in this.mediaType) {
        this.mediaType.video = true;
      } // setup RecordRTC


      this.engine = new RecordRTC.MRecordRTC();
      this.engine.mediaType = this.mediaType;
      this.engine.disableLogs = !this.debug;
      this.engine.mimeType = this.mimeType; // audio settings

      this.engine.bufferSize = this.bufferSize;
      this.engine.sampleRate = this.sampleRate;
      this.engine.numberOfAudioChannels = this.audioChannels; // video/canvas settings

      this.engine.video = this.video;
      this.engine.canvas = this.canvas; // animated gif settings

      this.engine.quality = this.quality;
      this.engine.frameRate = this.frameRate;

      if (this.onTimeStamp !== undefined) {
        this.engine.timeSlice = this.timeSlice;
        this.engine.onTimeStamp = this.onTimeStamp;
      } // connect stream to recording engine


      this.engine.addStream(this.inputStream);
    }
    /**
     * Remove any temporary data and references to streams.
     */

  }, {
    key: "dispose",
    value: function dispose() {
      _get(_getPrototypeOf(RecordRTCEngine.prototype), "dispose", this).call(this);

      if (typeof this.engine.destroy === 'function') {
        this.engine.destroy();
      }
    }
    /**
     * Start recording.
     */

  }, {
    key: "start",
    value: function start() {
      this.engine.startRecording();
    }
    /**
     * Stop recording. Result will be available async when onStopRecording
     * is called.
     */

  }, {
    key: "stop",
    value: function stop() {
      this.engine.stopRecording(this.onStopRecording.bind(this));
    }
    /**
     * Pause recording.
     */

  }, {
    key: "pause",
    value: function pause() {
      this.engine.pauseRecording();
    }
    /**
     * Resume recording.
     */

  }, {
    key: "resume",
    value: function resume() {
      this.engine.resumeRecording();
    }
    /**
     * Show save as dialog in browser so the user can store the recorded media
     * locally.
     *
     * @param {object} name - Object with names for the particular blob(s)
     *     you want to save. File extensions are added automatically. For
     *     example: {'video': 'name-of-video-file'}. Supported keys are
     *     'audio', 'video' and 'gif'.
     * @example
     * // save video file as 'foo.webm'
     * player.record().saveAs({'video': 'foo'});
     */

  }, {
    key: "saveAs",
    value: function saveAs(name) {
      if (this.engine && name !== undefined) {
        this.engine.save(name);
      }
    }
    /**
     * Invoked when recording is stopped and resulting stream is available.
     *
     * @private
     * @param {string} audioVideoURL - Reference to the recorded Blob
     *     object, e.g. 'blob:http://localhost:8080/10100016-4248-9949-b0d6-0bb40db56eba'
     * @param {string} type - Media type, eg. 'video' or 'audio'.
     */

  }, {
    key: "onStopRecording",
    value: function onStopRecording(audioVideoURL, type) {
      var _this = this;

      // store reference to recorded stream URL
      this.mediaURL = audioVideoURL; // store reference to recorded stream data

      var recordType = this.player().record().getRecordType();
      this.engine.getBlob(function (recording) {
        switch (recordType) {
          case _recordMode.AUDIO_ONLY:
            if (recording.audio !== undefined) {
              _this.recordedData = recording.audio;
            }

            break;

          case _recordMode.VIDEO_ONLY:
          case _recordMode.AUDIO_VIDEO:
          case _recordMode.SCREEN_ONLY:
            // recordrtc returns a single blob that includes both audio
            // and video data
            if (recording.video !== undefined) {
              _this.recordedData = recording.video;
            }

            break;

          case _recordMode.ANIMATION:
            if (recording.gif !== undefined) {
              _this.recordedData = recording.gif;
            }

            break;
        } // inject file info


        _this.addFileInfo(_this.recordedData); // notify listeners


        _this.trigger('recordComplete');
      });
    }
  }]);

  return RecordRTCEngine;
}(_recordEngine.RecordEngine); // expose plugin


videojs.RecordRTCEngine = RecordRTCEngine;
Component.registerComponent('RecordRTCEngine', RecordRTCEngine);
var _default = RecordRTCEngine;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/utils/browser-shim.js":
/*!**************************************!*\
  !*** ./src/js/utils/browser-shim.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @file browser-shim.js
 * @since 2.0.0
 */
var setSrcObject = function setSrcObject(stream, element, ignoreCreateObjectURL) {
  if ('createObjectURL' in URL && !ignoreCreateObjectURL) {
    try {
      element.src = URL.createObjectURL(stream);
    } catch (e) {
      setSrcObject(stream, element, true);
      return;
    }
  } else if ('srcObject' in element) {
    element.srcObject = stream;
  } else if ('mozSrcObject' in element) {
    element.mozSrcObject = stream;
  } else {
    throw new Error('createObjectURL/srcObject both are not supported.');
  }
};

var _default = setSrcObject;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/utils/detect-browser.js":
/*!****************************************!*\
  !*** ./src/js/utils/detect-browser.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFirefox = exports.isSafari = exports.isChrome = exports.isOpera = exports.isEdge = exports.detectBrowser = void 0;

var _window = _interopRequireDefault(__webpack_require__(/*! global/window */ "./node_modules/global/window.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file detect-browser.js
 * @since 2.0.0
 */

/**
 * Browser detector.
 *
 * @private
 * @return {object} result containing browser, version and minVersion
 *     properties.
 */
var detectBrowser = function detectBrowser() {
  // returned result object
  var result = {};
  result.browser = null;
  result.version = null;
  result.minVersion = null; // fail early if it's not a browser

  if (typeof _window.default === 'undefined' || !_window.default.navigator) {
    result.browser = 'Not a supported browser.';
    return result;
  }

  if (navigator.mozGetUserMedia) {
    // Firefox.
    result.browser = 'firefox';
    result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
    result.minVersion = 31;
  } else if (navigator.webkitGetUserMedia) {
    // Chrome, Chromium, Webview, Opera.
    // Version matches Chrome/WebRTC version.
    result.browser = 'chrome';
    result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
    result.minVersion = 38;
  } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
    // Edge.
    result.browser = 'edge';
    result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
    result.minVersion = 10547;
  } else if (_window.default.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
    // Safari.
    result.browser = 'safari';
    result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
  } else {
    // Default fallthrough: not supported.
    result.browser = 'Not a supported browser.';
    return result;
  }

  return result;
};
/**
 * Extract browser version out of the provided user agent string.
 *
 * @private
 * @param {!string} uastring - userAgent string.
 * @param {!string} expr - Regular expression used as match criteria.
 * @param {!number} pos - position in the version string to be
 *     returned.
 * @return {!number} browser version.
 */


exports.detectBrowser = detectBrowser;

var extractVersion = function extractVersion(uastring, expr, pos) {
  var match = uastring.match(expr);
  return match && match.length >= pos && parseInt(match[pos], 10);
};

var isEdge = function isEdge() {
  return detectBrowser().browser === 'edge';
};

exports.isEdge = isEdge;

var isSafari = function isSafari() {
  return detectBrowser().browser === 'safari';
};

exports.isSafari = isSafari;

var isOpera = function isOpera() {
  return !!_window.default.opera || navigator.userAgent.indexOf('OPR/') !== -1;
};

exports.isOpera = isOpera;

var isChrome = function isChrome() {
  return detectBrowser().browser === 'chrome';
};

exports.isChrome = isChrome;

var isFirefox = function isFirefox() {
  return detectBrowser().browser === 'firefox';
};

exports.isFirefox = isFirefox;

/***/ }),

/***/ "./src/js/utils/format-time.js":
/*!*************************************!*\
  !*** ./src/js/utils/format-time.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @file format-time.js
 * @since 2.0.0
 */

/**
 * Format seconds as a time string, H:MM:SS, M:SS or M:SS:MMM.
 *
 * Supplying a guide (in seconds) will force a number of leading zeros
 * to cover the length of the guide.
 *
 * @param {number} seconds - Number of seconds to be turned into a
 *     string.
 * @param {number} guide - Number (in seconds) to model the string
 *     after.
 * @param {number} msDisplayMax - Number (in milliseconds) to model the string
 *     after.
 * @return {string} Time formatted as H:MM:SS, M:SS or M:SS:MMM, e.g.
 *     0:00:12.
 * @private
 */
var formatTime = function formatTime(seconds, guide, msDisplayMax) {
  // Default to using seconds as guide
  seconds = seconds < 0 ? 0 : seconds;
  guide = guide || seconds;
  var s = Math.floor(seconds % 60),
      m = Math.floor(seconds / 60 % 60),
      h = Math.floor(seconds / 3600),
      gm = Math.floor(guide / 60 % 60),
      gh = Math.floor(guide / 3600),
      ms = Math.floor((seconds - s) * 1000); // handle invalid times

  if (isNaN(seconds) || seconds === Infinity) {
    // '-' is false for all relational operators (e.g. <, >=) so this
    // setting will add the minimum number of fields specified by the
    // guide
    h = m = s = ms = '-';
  } // Check if we need to show milliseconds


  if (guide > 0 && guide < msDisplayMax) {
    if (ms < 100) {
      if (ms < 10) {
        ms = '00' + ms;
      } else {
        ms = '0' + ms;
      }
    }

    ms = ':' + ms;
  } else {
    ms = '';
  } // Check if we need to show hours


  h = h > 0 || gh > 0 ? h + ':' : ''; // If hours are showing, we may need to add a leading zero.
  // Always show at least one digit of minutes.

  m = ((h || gm >= 10) && m < 10 ? '0' + m : m) + ':'; // Check if leading zero is need for seconds

  s = s < 10 ? '0' + s : s;
  return h + m + s + ms;
};

var _default = formatTime;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/videojs.record.js":
/*!**********************************!*\
  !*** ./src/js/videojs.record.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _animationDisplay = _interopRequireDefault(__webpack_require__(/*! ./controls/animation-display */ "./src/js/controls/animation-display.js"));

var _recordCanvas = _interopRequireDefault(__webpack_require__(/*! ./controls/record-canvas */ "./src/js/controls/record-canvas.js"));

var _deviceButton = _interopRequireDefault(__webpack_require__(/*! ./controls/device-button */ "./src/js/controls/device-button.js"));

var _cameraButton = _interopRequireDefault(__webpack_require__(/*! ./controls/camera-button */ "./src/js/controls/camera-button.js"));

var _recordToggle = _interopRequireDefault(__webpack_require__(/*! ./controls/record-toggle */ "./src/js/controls/record-toggle.js"));

var _recordIndicator = _interopRequireDefault(__webpack_require__(/*! ./controls/record-indicator */ "./src/js/controls/record-indicator.js"));

var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ "./src/js/defaults.js"));

var _formatTime = _interopRequireDefault(__webpack_require__(/*! ./utils/format-time */ "./src/js/utils/format-time.js"));

var _browserShim = _interopRequireDefault(__webpack_require__(/*! ./utils/browser-shim */ "./src/js/utils/browser-shim.js"));

var _detectBrowser = __webpack_require__(/*! ./utils/detect-browser */ "./src/js/utils/detect-browser.js");

var _recordRtc = _interopRequireDefault(__webpack_require__(/*! ./engine/record-rtc */ "./src/js/engine/record-rtc.js"));

var _recordEngine = __webpack_require__(/*! ./engine/record-engine */ "./src/js/engine/record-engine.js");

var _recordMode = __webpack_require__(/*! ./engine/record-mode */ "./src/js/engine/record-mode.js");

var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Plugin = _video.default.getPlugin('plugin');

var Player = _video.default.getComponent('Player');

var AUTO = 'auto'; // monkey-patch play (#152)

Player.prototype.play = function play() {
  var retval = this.techGet_('play'); // silence errors (unhandled promise from play)

  if (retval !== undefined && typeof retval.then === 'function') {
    retval.then(null, function (e) {});
  }

  return retval;
};
/**
 * Record audio/video/images using the Video.js player.
 *
 * @class
 * @augments videojs.Plugin
 */


var Record =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Record, _Plugin);

  /**
   * The constructor function for the class.
   *
   * @param {(videojs.Player|Object)} player - video.js Player object.
   * @param {Object} options - Player options.
   */
  function Record(player, options) {
    var _this;

    _classCallCheck(this, Record);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Record).call(this, player, options)); // add plugin style

    player.addClass('vjs-record'); // setup plugin options

    _this.loadOptions(); // (re)set recorder state


    _this.resetState(); // add device button with icon based on type


    var deviceIcon = 'av-perm';

    switch (_this.getRecordType()) {
      case _recordMode.IMAGE_ONLY:
      case _recordMode.VIDEO_ONLY:
      case _recordMode.ANIMATION:
        deviceIcon = 'video-perm';
        break;

      case _recordMode.AUDIO_ONLY:
        deviceIcon = 'audio-perm';
        break;

      case _recordMode.SCREEN_ONLY:
        deviceIcon = 'screen-perm';
        break;
    }

    _deviceButton.default.prototype.buildCSSClass = function () {
      // use dynamic icon class
      return 'vjs-record vjs-device-button vjs-control vjs-icon-' + deviceIcon;
    };

    player.deviceButton = new _deviceButton.default(player, options);
    player.addChild(player.deviceButton); // add blinking record indicator

    player.recordIndicator = new _recordIndicator.default(player, options);
    player.recordIndicator.hide();
    player.addChild(player.recordIndicator); // add canvas for recording and displaying image

    player.recordCanvas = new _recordCanvas.default(player, options);
    player.recordCanvas.hide();
    player.addChild(player.recordCanvas); // add image for animation display

    player.animationDisplay = new _animationDisplay.default(player, options);
    player.animationDisplay.hide();
    player.addChild(player.animationDisplay); // add camera button

    player.cameraButton = new _cameraButton.default(player, options);
    player.cameraButton.hide(); // add record toggle

    player.recordToggle = new _recordToggle.default(player, options);
    player.recordToggle.hide(); // wait until player ui is ready

    _this.player.one('ready', _this.setupUI.bind(_assertThisInitialized(_assertThisInitialized(_this))));

    return _this;
  }
  /**
   * Setup plugin options.
   *
   * @param {Object} newOptions - Optional new player options.
   */


  _createClass(Record, [{
    key: "loadOptions",
    value: function loadOptions() {
      var newOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var recordOptions = _video.default.mergeOptions(_defaults.default, this.player.options_.plugins.record, newOptions); // record settings


      this.recordImage = recordOptions.image;
      this.recordAudio = recordOptions.audio;
      this.recordVideo = recordOptions.video;
      this.recordAnimation = recordOptions.animation;
      this.recordScreen = recordOptions.screen;
      this.maxLength = recordOptions.maxLength;
      this.maxFileSize = recordOptions.maxFileSize;
      this.msDisplayMax = parseFloat(recordOptions.msDisplayMax);
      this.debug = recordOptions.debug;
      this.recordTimeSlice = recordOptions.timeSlice;
      this.autoMuteDevice = recordOptions.autoMuteDevice; // video/canvas settings

      this.videoFrameWidth = recordOptions.frameWidth;
      this.videoFrameHeight = recordOptions.frameHeight;
      this.videoRecorderType = recordOptions.videoRecorderType;
      this.videoMimeType = recordOptions.videoMimeType; // audio settings

      this.audioEngine = recordOptions.audioEngine;
      this.audioRecorderType = recordOptions.audioRecorderType;
      this.audioWorkerURL = recordOptions.audioWorkerURL;
      this.audioBufferSize = recordOptions.audioBufferSize;
      this.audioSampleRate = recordOptions.audioSampleRate;
      this.audioBitRate = recordOptions.audioBitRate;
      this.audioChannels = recordOptions.audioChannels;
      this.audioMimeType = recordOptions.audioMimeType;
      this.audioBufferUpdate = recordOptions.audioBufferUpdate; // animation settings

      this.animationFrameRate = recordOptions.animationFrameRate;
      this.animationQuality = recordOptions.animationQuality;
    }
    /**
     * Player UI is ready.
     * @private
     */

  }, {
    key: "setupUI",
    value: function setupUI() {
      var _this2 = this;

      // insert custom controls on left-side of controlbar
      this.player.controlBar.addChild(this.player.cameraButton);
      this.player.controlBar.el().insertBefore(this.player.cameraButton.el(), this.player.controlBar.el().firstChild);
      this.player.controlBar.el().insertBefore(this.player.recordToggle.el(), this.player.controlBar.el().firstChild); // get rid of unused controls

      if (this.player.controlBar.remainingTimeDisplay !== undefined) {
        this.player.controlBar.remainingTimeDisplay.el().style.display = 'none';
      }

      if (this.player.controlBar.liveDisplay !== undefined) {
        this.player.controlBar.liveDisplay.el().style.display = 'none';
      } // loop feature is never used in this plugin


      this.player.loop(false); // tweak player UI based on type

      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          // reference to videojs-wavesurfer plugin
          this.surfer = this.player.wavesurfer();
          break;

        case _recordMode.IMAGE_ONLY:
        case _recordMode.VIDEO_ONLY:
        case _recordMode.AUDIO_VIDEO:
        case _recordMode.ANIMATION:
        case _recordMode.SCREEN_ONLY:
          // customize controls
          this.player.bigPlayButton.hide(); // loadedmetadata resets the durationDisplay for the
          // first time

          this.player.one('loadedmetadata', function () {
            // display max record time
            _this2.setDuration(_this2.maxLength);
          }); // the native controls don't work for this UI so disable
          // them no matter what

          if (this.player.usingNativeControls_ === true) {
            if (this.player.tech_.el_ !== undefined) {
              this.player.tech_.el_.controls = false;
            }
          } // clicking or tapping the player video element should not try
          // to start playback


          this.player.removeTechControlsListeners_();

          if (this.player.options_.controls) {
            // progress control isn't used by this plugin
            this.player.controlBar.progressControl.hide(); // prevent controlbar fadeout

            this.player.on('userinactive', function (event) {
              _this2.player.userActive(true);
            }); // videojs automatically hides the controls when no valid 'source'
            // element is included in the video or audio tag. Don't. Ever again.

            this.player.controlBar.show();
            this.player.controlBar.el().style.display = 'flex';
          }

          break;
      } // disable time display events that constantly try to reset the current time
      // and duration values


      this.player.off('timeupdate');
      this.player.off('durationchange');
      this.player.off('loadedmetadata'); // display max record time

      this.setDuration(this.maxLength); // hide play control

      this.player.controlBar.playToggle.hide(); // trigger early warning if screen-only is not supported

      if (this.getRecordType() === _recordMode.SCREEN_ONLY && 'getDisplayMedia' in navigator === false) {
        // screen capture not supported in this browser
        var errorMessage = 'getDisplayMedia is not supported';
        this.player.trigger('error', errorMessage);
      }
    }
    /**
     * Indicates whether the plugin is currently recording or not.
     *
     * @return {boolean} Plugin currently recording or not.
     */

  }, {
    key: "isRecording",
    value: function isRecording() {
      return this._recording;
    }
    /**
     * Indicates whether the plugin is currently processing recorded data
     * or not.
     *
     * @return {boolean} Plugin processing or not.
     */

  }, {
    key: "isProcessing",
    value: function isProcessing() {
      return this._processing;
    }
    /**
     * Indicates whether the plugin is destroyed or not.
     *
     * @return {boolean} Plugin destroyed or not.
     */

  }, {
    key: "isDestroyed",
    value: function isDestroyed() {
      return this.player && this.player.children() === null;
    }
    /**
     * Open the browser's recording device selection dialog.
     */

  }, {
    key: "getDevice",
    value: function getDevice() {
      var _this3 = this;

      // define device callbacks once
      if (this.deviceReadyCallback === undefined) {
        this.deviceReadyCallback = this.onDeviceReady.bind(this);
      }

      if (this.deviceErrorCallback === undefined) {
        this.deviceErrorCallback = this.onDeviceError.bind(this);
      }

      if (this.engineStopCallback === undefined) {
        this.engineStopCallback = this.onRecordComplete.bind(this);
      } // ask the browser to give the user access to the media device
      // and get a stream reference in the callback function


      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          // setup microphone
          this.mediaType = {
            audio: this.audioRecorderType === AUTO ? true : this.audioRecorderType,
            video: false
          }; // remove existing microphone listeners

          this.surfer.surfer.microphone.un('deviceReady', this.deviceReadyCallback);
          this.surfer.surfer.microphone.un('deviceError', this.deviceErrorCallback); // setup new microphone listeners

          this.surfer.surfer.microphone.on('deviceReady', this.deviceReadyCallback);
          this.surfer.surfer.microphone.on('deviceError', this.deviceErrorCallback); // disable existing playback events

          this.surfer.setupPlaybackEvents(false); // (re)set surfer liveMode

          this.surfer.liveMode = true;
          this.surfer.surfer.microphone.paused = false; // assign custom reloadBufferFunction for microphone plugin to
          // obtain AudioBuffer chunks

          if (this.audioBufferUpdate === true) {
            this.surfer.surfer.microphone.reloadBufferFunction = function (event) {
              if (!_this3.surfer.surfer.microphone.paused) {
                // redraw
                _this3.surfer.surfer.empty();

                _this3.surfer.surfer.loadDecodedBuffer(event.inputBuffer); // store data and notify others


                _this3.player.recordedData = event.inputBuffer;

                _this3.player.trigger('audioBufferUpdate');
              }
            };
          } // open browser device selection dialog


          this.surfer.surfer.microphone.start();
          break;

        case _recordMode.IMAGE_ONLY:
        case _recordMode.VIDEO_ONLY:
          // setup camera
          this.mediaType = {
            audio: false,
            video: this.videoRecorderType === AUTO ? true : this.videoRecorderType
          };
          navigator.mediaDevices.getUserMedia({
            audio: false,
            video: this.getRecordType() === _recordMode.IMAGE_ONLY ? this.recordImage : this.recordVideo
          }).then(this.onDeviceReady.bind(this)).catch(this.onDeviceError.bind(this));
          break;

        case _recordMode.AUDIO_VIDEO:
          // setup camera and microphone
          this.mediaType = {
            audio: this.audioRecorderType === AUTO ? true : this.audioRecorderType,
            video: this.videoRecorderType === AUTO ? true : this.videoRecorderType
          };
          navigator.mediaDevices.getUserMedia({
            audio: this.recordAudio,
            video: this.recordVideo
          }).then(this.onDeviceReady.bind(this)).catch(this.onDeviceError.bind(this));
          break;

        case _recordMode.ANIMATION:
          // setup camera
          this.mediaType = {
            // animated GIF
            audio: false,
            video: false,
            gif: true
          };
          navigator.mediaDevices.getUserMedia({
            audio: false,
            video: this.recordAnimation
          }).then(this.onDeviceReady.bind(this)).catch(this.onDeviceError.bind(this));
          break;

        case _recordMode.SCREEN_ONLY:
          // setup screen
          this.mediaType = {
            // screen capture
            audio: false,
            video: false,
            screen: true,
            gif: false
          };
          navigator.getDisplayMedia({
            video: true
          }).then(this.onDeviceReady.bind(this)).catch(this.onDeviceError.bind(this));
          break;
      }
    }
    /**
     * Invoked when the device is ready.
     *
     * @private
     * @param {LocalMediaStream} stream - Local media stream from device.
     */

  }, {
    key: "onDeviceReady",
    value: function onDeviceReady(stream) {
      var _this4 = this;

      this._deviceActive = true; // store reference to stream for stopping etc.

      this.stream = stream; // hide device selection button

      this.player.deviceButton.hide(); // reset time (e.g. when stopDevice was used)

      this.setDuration(this.maxLength);
      this.setCurrentTime(0); // hide play/pause control (e.g. when stopDevice was used)

      this.player.controlBar.playToggle.hide(); // reset playback listeners

      this.off(this.player, 'timeupdate', this.playbackTimeUpdate);
      this.off(this.player, 'ended', this.playbackTimeUpdate); // setup recording engine

      if (this.getRecordType() !== _recordMode.IMAGE_ONLY) {
        // currently libvorbis.js, recorder.js, opus-recorder and lamejs
        // are only supported in audio-only mode
        if (this.getRecordType() !== _recordMode.AUDIO_ONLY && (this.audioEngine === _recordEngine.LIBVORBISJS || this.audioEngine === _recordEngine.RECORDERJS || this.audioEngine === _recordEngine.LAMEJS || this.audioEngine === _recordEngine.OPUSRECORDER)) {
          throw new Error('Currently ' + this.audioEngine + ' is only supported in audio-only mode.');
        } // get recorder class


        var EngineClass;

        switch (this.audioEngine) {
          case _recordEngine.RECORDRTC:
            // RecordRTC.js (default)
            EngineClass = _recordRtc.default;
            break;

          case _recordEngine.LIBVORBISJS:
            // libvorbis.js
            EngineClass = _video.default.LibVorbisEngine;
            break;

          case _recordEngine.RECORDERJS:
            // recorder.js
            EngineClass = _video.default.RecorderjsEngine;
            break;

          case _recordEngine.LAMEJS:
            // lamejs
            EngineClass = _video.default.LamejsEngine;
            break;

          case _recordEngine.OPUSRECORDER:
            // opus-recorder
            EngineClass = _video.default.OpusRecorderEngine;
            break;

          default:
            // unknown engine
            throw new Error('Unknown audioEngine: ' + this.audioEngine);
        }

        try {
          // connect stream to recording engine
          this.engine = new EngineClass(this.player, this.player.options_);
        } catch (err) {
          throw new Error('Could not load ' + this.audioEngine + ' plugin');
        } // listen for events


        this.engine.on('recordComplete', this.engineStopCallback); // audio settings

        this.engine.bufferSize = this.audioBufferSize;
        this.engine.sampleRate = this.audioSampleRate;
        this.engine.bitRate = this.audioBitRate;
        this.engine.audioChannels = this.audioChannels;
        this.engine.audioWorkerURL = this.audioWorkerURL; // mime type

        this.engine.mimeType = {
          video: this.videoMimeType,
          gif: 'image/gif'
        };

        if (this.audioMimeType !== null && this.audioMimeType !== AUTO) {
          this.engine.mimeType.audio = this.audioMimeType;
        } // video/canvas settings


        this.engine.video = {
          width: this.videoFrameWidth,
          height: this.videoFrameHeight
        };
        this.engine.canvas = {
          width: this.videoFrameWidth,
          height: this.videoFrameHeight
        }; // animated GIF settings

        this.engine.quality = this.animationQuality;
        this.engine.frameRate = this.animationFrameRate; // timeSlice

        if (this.recordTimeSlice && this.recordTimeSlice > 0) {
          this.engine.timeSlice = this.recordTimeSlice;
          this.engine.onTimeStamp = this.onTimeStamp.bind(this);
        } // initialize recorder


        this.engine.setup(this.stream, this.mediaType, this.debug); // show elements that should never be hidden in animation,
        // audio and/or video modus

        var uiElements = [this.player.controlBar.currentTimeDisplay, this.player.controlBar.timeDivider, this.player.controlBar.durationDisplay];
        uiElements.forEach(function (element) {
          if (element !== undefined) {
            element.el().style.display = 'block';
            element.show();
          }
        }); // show record button

        this.player.recordToggle.show();
      } else {
        // disable record indicator
        this.player.recordIndicator.disable(); // setup UI for retrying snapshot (e.g. when stopDevice was
        // used)

        this.retrySnapshot(); // reset and show camera button

        this.player.cameraButton.onStop();
        this.player.cameraButton.show();
      } // setup preview


      if (this.getRecordType() !== _recordMode.AUDIO_ONLY) {
        // show live preview
        this.mediaElement = this.player.el().firstChild;
        this.mediaElement.controls = false; // mute incoming audio for feedback loops

        this.mediaElement.muted = true; // hide the volume bar while it's muted

        this.displayVolumeControl(false); // load stream

        this.load(this.stream); // stream loading is async, so we wait until it's ready to play
        // the stream

        this.player.one('loadedmetadata', function () {
          // start stream
          _this4.mediaElement.play(); // forward to listeners


          _this4.player.trigger('deviceReady');
        });
      } else {
        // forward to listeners
        this.player.trigger('deviceReady');
      }
    }
    /**
     * Invoked when an device error occurred.
     *
     * @private
     * @param {(string|number)} code - Error code/description.
     */

  }, {
    key: "onDeviceError",
    value: function onDeviceError(code) {
      this._deviceActive = false; // store code

      this.player.deviceErrorCode = code; // forward error to player

      this.player.trigger('deviceError');
    }
    /**
     * Start recording.
     */

  }, {
    key: "start",
    value: function start() {
      var _this5 = this;

      if (!this.isProcessing()) {
        this._recording = true; // hide play/pause control

        this.player.controlBar.playToggle.hide(); // reset playback listeners

        this.off(this.player, 'timeupdate', this.playbackTimeUpdate);
        this.off(this.player, 'ended', this.playbackTimeUpdate); // start preview

        switch (this.getRecordType()) {
          case _recordMode.AUDIO_ONLY:
            // disable playback events
            this.surfer.setupPlaybackEvents(false); // start/resume live audio visualization

            this.surfer.surfer.microphone.paused = false;
            this.surfer.liveMode = true;
            this.surfer.surfer.microphone.play();
            break;

          case _recordMode.VIDEO_ONLY:
          case _recordMode.AUDIO_VIDEO:
          case _recordMode.SCREEN_ONLY:
            // preview video stream in video element
            this.startVideoPreview();
            break;

          case _recordMode.ANIMATION:
            // hide the first frame
            this.player.recordCanvas.hide(); // hide the animation

            this.player.animationDisplay.hide(); // show preview video

            this.mediaElement.style.display = 'block'; // for animations, capture the first frame
            // that can be displayed as soon as recording
            // is complete

            this.captureFrame().then(function (result) {
              // start video preview **after** capturing first frame
              _this5.startVideoPreview();
            });
            break;
        }

        if (this.autoMuteDevice) {
          // unmute device
          this.muteTracks(false);
        } // start recording


        switch (this.getRecordType()) {
          case _recordMode.IMAGE_ONLY:
            // create snapshot
            this.createSnapshot(); // notify UI

            this.player.trigger('startRecord');
            break;

          case _recordMode.VIDEO_ONLY:
          case _recordMode.AUDIO_VIDEO:
          case _recordMode.ANIMATION:
          case _recordMode.SCREEN_ONLY:
            // wait for media stream on video element to actually load
            this.player.one('loadedmetadata', function () {
              // start actually recording process
              _this5.startRecording();
            });
            break;

          default:
            // all resources have already loaded, so we can start
            // recording right away
            this.startRecording();
        }
      }
    }
    /**
     * Start recording.
     * @private
     */

  }, {
    key: "startRecording",
    value: function startRecording() {
      // register starting point
      this.paused = false;
      this.pauseTime = this.pausedTime = 0;
      this.startTime = new Date().getTime(); // start countdown

      this.countDown = this.player.setInterval(this.onCountDown.bind(this), 100); // cleanup previous recording

      if (this.engine !== undefined) {
        this.engine.dispose();
      } // start recording stream


      this.engine.start(); // notify UI

      this.player.trigger('startRecord');
    }
    /**
     * Stop recording.
     */

  }, {
    key: "stop",
    value: function stop() {
      if (!this.isProcessing()) {
        this._recording = false;
        this._processing = true;

        if (this.getRecordType() !== _recordMode.IMAGE_ONLY) {
          // notify UI
          this.player.trigger('stopRecord'); // stop countdown

          this.player.clearInterval(this.countDown); // stop recording stream (result will be available async)

          if (this.engine) {
            this.engine.stop();
          }

          if (this.autoMuteDevice) {
            // mute device
            this.muteTracks(true);
          }
        } else {
          if (this.player.recordedData) {
            // notify listeners that image data is (already) available
            this.player.trigger('finishRecord');
          }
        }
      }
    }
    /**
     * Stop device(s) and recording if active.
     */

  }, {
    key: "stopDevice",
    value: function stopDevice() {
      if (this.isRecording()) {
        // stop stream once recorded data is available,
        // otherwise it'll break recording
        this.player.one('finishRecord', this.stopStream.bind(this)); // stop recording

        this.stop();
      } else {
        // stop stream now, since there's no recorded data available
        this.stopStream();
      }
    }
    /**
     * Stop stream and device.
     */

  }, {
    key: "stopStream",
    value: function stopStream() {
      // stop stream and device
      if (this.stream) {
        this._deviceActive = false;

        if (this.getRecordType() === _recordMode.AUDIO_ONLY) {
          // make the microphone plugin stop it's device
          this.surfer.surfer.microphone.stopDevice();
          return;
        }

        this.stream.getTracks().forEach(function (stream) {
          stream.stop();
        });
      }
    }
    /**
     * Pause recording.
     */

  }, {
    key: "pause",
    value: function pause() {
      if (!this.paused) {
        this.pauseTime = new Date().getTime();
        this.paused = true;
        this.engine.pause();
      }
    }
    /**
     * Resume recording.
     */

  }, {
    key: "resume",
    value: function resume() {
      if (this.paused) {
        this.pausedTime += new Date().getTime() - this.pauseTime;
        this.engine.resume();
        this.paused = false;
      }
    }
    /**
     * Invoked when recording completed and the resulting stream is
     * available.
     * @private
     */

  }, {
    key: "onRecordComplete",
    value: function onRecordComplete() {
      var _this6 = this;

      // store reference to recorded stream data
      this.player.recordedData = this.engine.recordedData; // change the replay button back to a play button

      this.player.controlBar.playToggle.removeClass('vjs-ended');
      this.player.controlBar.playToggle.show(); // notify listeners that data is available

      this.player.trigger('finishRecord');

      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          // pause player so user can start playback
          this.surfer.pause(); // setup events for playback

          this.surfer.setupPlaybackEvents(true); // display loader

          this.player.loadingSpinner.show(); // restore interaction with controls after waveform
          // rendering is complete

          this.surfer.surfer.once('ready', function () {
            _this6._processing = false;
          }); // visualize recorded stream

          this.load(this.player.recordedData);
          break;

        case _recordMode.VIDEO_ONLY:
        case _recordMode.AUDIO_VIDEO:
        case _recordMode.SCREEN_ONLY:
          // pausing the player so we can visualize the recorded data
          // will trigger an async video.js 'pause' event that we
          // have to wait for.
          this.player.one('pause', function () {
            // video data is ready
            _this6._processing = false; // hide loader

            _this6.player.loadingSpinner.hide(); // show stream total duration


            _this6.setDuration(_this6.streamDuration); // update time during playback and at end


            _this6.on(_this6.player, 'timeupdate', _this6.playbackTimeUpdate);

            _this6.on(_this6.player, 'ended', _this6.playbackTimeUpdate); // unmute local audio during playback


            if (_this6.getRecordType() === _recordMode.AUDIO_VIDEO) {
              _this6.mediaElement.muted = false; // show the volume bar when it's unmuted

              _this6.displayVolumeControl(true);
            } // load recorded media


            _this6.load(_this6.player.recordedData);
          }); // pause player so user can start playback

          this.player.pause();
          break;

        case _recordMode.ANIMATION:
          // animation data is ready
          this._processing = false; // hide loader

          this.player.loadingSpinner.hide(); // show animation total duration

          this.setDuration(this.streamDuration); // hide preview video

          this.mediaElement.style.display = 'none'; // show the first frame

          this.player.recordCanvas.show(); // pause player so user can start playback

          this.player.pause(); // show animation on play

          this.on(this.player, 'play', this.showAnimation); // hide animation on pause

          this.on(this.player, 'pause', this.hideAnimation);
          break;
      }
    }
    /**
     * Invoked during recording and displays the remaining time.
     * @private
     */

  }, {
    key: "onCountDown",
    value: function onCountDown() {
      if (!this.paused) {
        var now = new Date().getTime();
        var duration = this.maxLength;
        var currentTime = (now - (this.startTime + this.pausedTime)) / 1000;
        this.streamDuration = currentTime;

        if (currentTime >= duration) {
          // at the end
          currentTime = duration; // stop recording

          this.stop();
        } // update duration


        this.setDuration(duration); // update current time

        this.setCurrentTime(currentTime, duration); // notify listeners

        this.player.trigger('progressRecord');
      }
    }
    /**
     * Get the current time of the recorded stream during playback.
     *
     * Returns 0 if no recording is available (yet).
     *
     * @returns {float} Current time of the recorded stream.
     */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      var currentTime = isNaN(this.streamCurrentTime) ? 0 : this.streamCurrentTime;

      if (this.getRecordType() === _recordMode.AUDIO_ONLY) {
        currentTime = this.surfer.getCurrentTime();
      }

      return currentTime;
    }
    /**
     * Updates the player's element displaying the current time.
     *
     * @private
     * @param {number} [currentTime=0] - Current position of the
     *    playhead (in seconds).
     * @param {number} [duration=0] - Duration in seconds.
     */

  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(currentTime, duration) {
      currentTime = isNaN(currentTime) ? 0 : currentTime;
      duration = isNaN(duration) ? 0 : duration;

      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          this.surfer.setCurrentTime(currentTime, duration);
          break;

        case _recordMode.VIDEO_ONLY:
        case _recordMode.AUDIO_VIDEO:
        case _recordMode.ANIMATION:
        case _recordMode.SCREEN_ONLY:
          this.streamCurrentTime = Math.min(currentTime, duration); // update current time display component

          this.player.controlBar.currentTimeDisplay.formattedTime_ = this.player.controlBar.currentTimeDisplay.contentEl().lastChild.textContent = (0, _formatTime.default)(this.streamCurrentTime, duration, this.msDisplayMax);
          break;
      }
    }
    /**
     * Get the length of the recorded stream in seconds.
     *
     * Returns 0 if no recording is available (yet).
     *
     * @returns {float} Duration of the recorded stream.
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      var duration = isNaN(this.streamDuration) ? 0 : this.streamDuration;
      return duration;
    }
    /**
     * Updates the player's element displaying the duration time.
     *
     * @param {number} [duration=0] - Duration in seconds.
     * @private
     */

  }, {
    key: "setDuration",
    value: function setDuration(duration) {
      duration = isNaN(duration) ? 0 : duration;

      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          this.surfer.setDuration(duration);
          break;

        case _recordMode.VIDEO_ONLY:
        case _recordMode.AUDIO_VIDEO:
        case _recordMode.ANIMATION:
        case _recordMode.SCREEN_ONLY:
          // update duration display component
          this.player.controlBar.durationDisplay.formattedTime_ = this.player.controlBar.durationDisplay.contentEl().lastChild.textContent = (0, _formatTime.default)(duration, duration, this.msDisplayMax);
          break;
      }
    }
    /**
     * Start loading data.
     *
     * @param {(string|blob|file)} url - Either the URL of the media file,
     *     a Blob, a File object or MediaStream.
     */

  }, {
    key: "load",
    value: function load(url) {
      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          // visualize recorded Blob stream
          this.surfer.load(url);
          break;

        case _recordMode.IMAGE_ONLY:
        case _recordMode.VIDEO_ONLY:
        case _recordMode.AUDIO_VIDEO:
        case _recordMode.ANIMATION:
        case _recordMode.SCREEN_ONLY:
          if (url instanceof Blob || url instanceof File) {
            // assign blob using createObjectURL
            (0, _browserShim.default)(url, this.mediaElement, false);
          } else {
            // assign stream without createObjectURL
            (0, _browserShim.default)(url, this.mediaElement, true);
          }

          break;
      }
    }
    /**
     * Show save as dialog in browser so the user can store the recorded media
     * locally.
     *
     * @param {object} name - Object with one or more names for the particular
     *     blob(s) you want to save. File extensions are added automatically.
     *     For example: {'video': 'name-of-video-file'}. Supported keys are
     *     'audio', 'video' and 'gif'.
     * @example
     * // save video file as 'foo.webm'
     * player.record().saveAs({'video': 'foo'});
     */

  }, {
    key: "saveAs",
    value: function saveAs(name) {
      if (this.engine && name !== undefined) {
        this.engine.saveAs(name);
      }
    }
    /**
     * Destroy plugin only.
     *
     * Use [destroy]{@link Record#destroy} to remove the plugin and the player
     * as well.
     */

  }, {
    key: "dispose",
    value: function dispose() {
      // disable common event listeners
      this.player.off('ready');
      this.player.off('userinactive');
      this.player.off('loadedmetadata'); // prevent callbacks if recording is in progress

      if (this.engine) {
        this.engine.dispose();
        this.engine.off('recordComplete', this.engineStopCallback);
      } // stop recording and device


      this.stop();
      this.stopDevice(); // stop countdown

      this.player.clearInterval(this.countDown); // dispose wavesurfer.js

      if (this.getRecordType() === _recordMode.AUDIO_ONLY) {
        if (this.surfer) {
          // also disposes player
          this.surfer.destroy();
        }
      }

      this.resetState();

      _get(_getPrototypeOf(Record.prototype), "dispose", this).call(this);
    }
    /**
     * Destroy plugin and players and cleanup resources.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.player.dispose();
    }
    /**
     * Reset the plugin.
     */

  }, {
    key: "reset",
    value: function reset() {
      var _this7 = this;

      // prevent callbacks if recording is in progress
      if (this.engine) {
        this.engine.dispose();
        this.engine.off('recordComplete', this.engineStopCallback);
      } // stop recording and device


      this.stop();
      this.stopDevice(); // stop countdown

      this.player.clearInterval(this.countDown); // reset options

      this.loadOptions(); // reset recorder state

      this.resetState(); // reset record time

      this.setDuration(this.maxLength);
      this.setCurrentTime(0); // reset player

      this.player.reset();

      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          if (this.surfer && this.surfer.surfer) {
            // empty last frame
            this.surfer.surfer.empty();
          }

          break;

        case _recordMode.IMAGE_ONLY:
        case _recordMode.ANIMATION:
          // reset UI
          this.player.recordCanvas.hide();
          this.player.cameraButton.hide();
          break;
      } // hide play control


      this.player.controlBar.playToggle.hide(); // show device selection button

      this.player.deviceButton.show(); // hide record button

      this.player.recordToggle.hide(); // loadedmetadata resets the durationDisplay for the
      // first time

      this.player.one('loadedmetadata', function () {
        // display max record time
        _this7.setDuration(_this7.maxLength);
      });
    }
    /**
     * Reset the plugin recorder state.
     * @private
     */

  }, {
    key: "resetState",
    value: function resetState() {
      this._recording = false;
      this._processing = false;
      this._deviceActive = false;
      this.devices = [];
    }
    /**
     * Mute LocalMediaStream audio and video tracks.
     *
     * @param {boolean} mute - Whether or not the mute the track(s).
     */

  }, {
    key: "muteTracks",
    value: function muteTracks(mute) {
      if ((this.getRecordType() === _recordMode.AUDIO_ONLY || this.getRecordType() === _recordMode.AUDIO_VIDEO) && this.stream.getAudioTracks().length > 0) {
        this.stream.getAudioTracks()[0].enabled = !mute;
      }

      if (this.getRecordType() !== _recordMode.AUDIO_ONLY && this.stream.getVideoTracks().length > 0) {
        this.stream.getVideoTracks()[0].enabled = !mute;
      }
    }
    /**
     * Get recorder type.
     *
     * @returns {string} Recorder type constant.
     * @example
     * console.log(player.record().getRecordType()); // 'audio_video'
     */

  }, {
    key: "getRecordType",
    value: function getRecordType() {
      return (0, _recordMode.getRecorderMode)(this.recordImage, this.recordAudio, this.recordVideo, this.recordAnimation, this.recordScreen);
    }
    /**
     * Create and display snapshot image.
     * @private
     */

  }, {
    key: "createSnapshot",
    value: function createSnapshot() {
      var _this8 = this;

      this.captureFrame().then(function (result) {
        // turn the canvas data into base64 data with a PNG header
        _this8.player.recordedData = result.toDataURL('image/png'); // hide preview video

        _this8.mediaElement.style.display = 'none'; // show the snapshot

        _this8.player.recordCanvas.show(); // stop recording


        _this8.stop();
      });
    }
    /**
     * Reset UI for retrying a snapshot image.
     * @private
     */

  }, {
    key: "retrySnapshot",
    value: function retrySnapshot() {
      this._processing = false; // retry: hide the snapshot

      this.player.recordCanvas.hide(); // show preview video

      this.player.el().firstChild.style.display = 'block';
    }
    /**
     * Capture frame from camera and copy data to canvas.
     * @private
     * @returns {void}
     */

  }, {
    key: "captureFrame",
    value: function captureFrame() {
      var _this9 = this;

      var detected = (0, _detectBrowser.detectBrowser)();
      var recordCanvas = this.player.recordCanvas.el().firstChild; // set the canvas size to the dimensions of the camera,
      // which also wipes the content of the canvas

      recordCanvas.width = this.player.width();
      recordCanvas.height = this.player.height();
      return new Promise(function (resolve, reject) {
        // MediaCapture is only supported on:
        // - Chrome 60 and newer (see
        // https://github.com/w3c/mediacapture-image/blob/gh-pages/implementation-status.md)
        // - Firefox behind flag (https://bugzilla.mozilla.org/show_bug.cgi?id=888177)
        //
        // importing ImageCapture can fail when enabling chrome flag is still required.
        // if so; ignore and continue
        if (detected.browser === 'chrome' && detected.version >= 60 && (typeof ImageCapture === "undefined" ? "undefined" : _typeof(ImageCapture)) === (typeof Function === "undefined" ? "undefined" : _typeof(Function))) {
          try {
            var track = _this9.stream.getVideoTracks()[0];

            var imageCapture = new ImageCapture(track); // take picture

            imageCapture.grabFrame().then(function (imageBitmap) {
              // get a frame and copy it onto the canvas
              _this9.drawCanvas(recordCanvas, imageBitmap); // notify others


              resolve(recordCanvas);
            }).catch(function (error) {// ignore, try oldskool
            });
          } catch (err) {}
        } // no ImageCapture available: do it the oldskool way
        // get a frame and copy it onto the canvas


        _this9.drawCanvas(recordCanvas, _this9.mediaElement); // notify others


        resolve(recordCanvas);
      });
    }
    /**
     * Draw image frame on canvas element.
     * @private
     * @param {HTMLCanvasElement} canvas - Canvas to draw on.
     * @param {HTMLElement} element - Element to draw onto the canvas.
     */

  }, {
    key: "drawCanvas",
    value: function drawCanvas(canvas, element) {
      canvas.getContext('2d').drawImage(element, 0, 0, canvas.width, canvas.height);
    }
    /**
     * Start preview of video stream.
     * @private
     */

  }, {
    key: "startVideoPreview",
    value: function startVideoPreview() {
      // disable playback events
      this.off('timeupdate');
      this.off('durationchange');
      this.off('loadedmetadata');
      this.off('play'); // mute local audio

      this.mediaElement.muted = true; // hide volume control to prevent feedback

      this.displayVolumeControl(false); // start or resume live preview

      this.load(this.stream);
      this.mediaElement.play();
    }
    /**
     * Show animated GIF.
     * @private
     */

  }, {
    key: "showAnimation",
    value: function showAnimation() {
      var animationDisplay = this.player.animationDisplay.el().firstChild; // set the image size to the dimensions of the recorded animation

      animationDisplay.width = this.player.width();
      animationDisplay.height = this.player.height(); // hide the first frame

      this.player.recordCanvas.hide(); // show the animation

      (0, _browserShim.default)(this.player.recordedData, animationDisplay, false);
      this.player.animationDisplay.show();
    }
    /**
     * Hide animated GIF.
     * @private
     */

  }, {
    key: "hideAnimation",
    value: function hideAnimation() {
      // show the first frame
      this.player.recordCanvas.show(); // hide the animation

      this.player.animationDisplay.hide();
    }
    /**
     * Update time during playback.
     * @private
     */

  }, {
    key: "playbackTimeUpdate",
    value: function playbackTimeUpdate() {
      this.setCurrentTime(this.player.currentTime(), this.streamDuration);
    }
    /**
     * Received new timestamp (when timeSlice option is enabled).
     * @private
     * @param {float} current - Current timestamp.
     * @param {array} all - List of timestamps so far.
     */

  }, {
    key: "onTimeStamp",
    value: function onTimeStamp(current, all) {
      this.player.currentTimestamp = current;
      this.player.allTimestamps = all; // get blob (only for MediaStreamRecorder)

      var internal;

      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          internal = this.engine.engine.audioRecorder;
          break;

        case _recordMode.ANIMATION:
          internal = this.engine.engine.gifRecorder;
          break;

        default:
          internal = this.engine.engine.videoRecorder;
      }

      var maxFileSizeReached = false;

      if (internal) {
        internal = internal.getInternalRecorder();
      }

      if (internal instanceof MediaStreamRecorder === true) {
        this.player.recordedData = internal.getArrayOfBlobs(); // inject file info for newest blob

        this.engine.addFileInfo(this.player.recordedData[this.player.recordedData.length - 1]); // check max file size

        if (this.maxFileSize > 0) {
          var currentSize = new Blob(this.player.recordedData).size;

          if (currentSize >= this.maxFileSize) {
            maxFileSizeReached = true;
          }
        }
      } // notify others


      this.player.trigger('timestamp'); // automatically stop when max file size was reached

      if (maxFileSizeReached) {
        this.stop();
      }
    }
    /**
     * Collects information about the media input and output devices
     * available on the system.
     */

  }, {
    key: "enumerateDevices",
    value: function enumerateDevices() {
      var _this10 = this;

      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        this.player.enumerateErrorCode = 'enumerateDevices() not supported.';
        this.player.trigger('enumerateError');
        return;
      } // List cameras and microphones.


      navigator.mediaDevices.enumerateDevices(this).then(function (devices) {
        _this10.devices = [];
        devices.forEach(function (device) {
          _this10.devices.push(device);
        }); // notify listeners

        _this10.player.trigger('enumerateReady');
      }).catch(function (err) {
        _this10.player.enumerateErrorCode = err;

        _this10.player.trigger('enumerateError');
      });
    }
    /**
     * Change the audio output device.
     *
     * @param {string} deviceId - Id of audio output device.
     */

  }, {
    key: "setAudioOutput",
    value: function setAudioOutput(deviceId) {
      var _this11 = this;

      var errorMessage;

      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          // use wavesurfer
          this.surfer.surfer.setSinkId(deviceId).then(function (result) {
            // notify listeners
            _this11.player.trigger('audioOutputReady');

            return;
          }).catch(function (err) {
            errorMessage = err;
          });
          break;

        default:
          var element = player.tech_.el_;

          if (deviceId) {
            if (typeof element.sinkId !== 'undefined') {
              element.setSinkId(deviceId).then(function (result) {
                // notify listeners
                _this11.player.trigger('audioOutputReady');

                return;
              }).catch(function (err) {
                errorMessage = err;
              });
            } else {
              errorMessage = 'Browser does not support audio output device selection.';
            }
          } else {
            errorMessage = 'Invalid deviceId: ' + deviceId;
          }

          break;
      } // error if we get here: notify listeners


      this.player.trigger('error', errorMessage);
    }
    /**
     * Show or hide the volume menu.
     *
     * @private
     * @param {boolean} display - Hide/show volume control.
     */

  }, {
    key: "displayVolumeControl",
    value: function displayVolumeControl(display) {
      if (this.player.controlBar.volumePanel !== undefined) {
        if (display === true) {
          display = 'flex';
        } else {
          display = 'none';
        }

        this.player.controlBar.volumePanel.el().style.display = display;
      }
    }
  }]);

  return Record;
}(Plugin); // version nr is injected during build


Record.VERSION = "3.0.0"; // register plugin

_video.default.Record = Record;

if (_video.default.getPlugin('record') === undefined) {
  _video.default.registerPlugin('record', Record);
} // export plugin


module.exports = {
  Record: Record
};

/***/ }),

/***/ 0:
/*!**********************************************************************!*\
  !*** multi ./src/js/videojs.record.js ./src/css/videojs.record.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/thijstriemstra/projects/videojs-record/src/js/videojs.record.js */"./src/js/videojs.record.js");
module.exports = __webpack_require__(/*! /Users/thijstriemstra/projects/videojs-record/src/css/videojs.record.scss */"./src/css/videojs.record.scss");


/***/ }),

/***/ "video.js":
/*!**************************!*\
  !*** external "videojs" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_video_js__;

/***/ })

/******/ });
});
//# sourceMappingURL=videojs.record.js.map