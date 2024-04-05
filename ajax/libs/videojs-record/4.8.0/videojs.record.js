/*!
 * videojs-record
 * @version 4.8.0
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2024 Collab
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("recordrtc"), require("video.js"));
	else if(typeof define === 'function' && define.amd)
		define("VideojsRecord", ["recordrtc", "video.js"], factory);
	else if(typeof exports === 'object')
		exports["VideojsRecord"] = factory(require("recordrtc"), require("video.js"));
	else
		root["VideojsRecord"] = factory(root["RecordRTC"], root["videojs"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_recordrtc__, __WEBPACK_EXTERNAL_MODULE_video_js__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/add-zero/index.js":
/*!****************************************!*\
  !*** ./node_modules/add-zero/index.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function(exports) {

  'use strict';

  function addZero(value, digits) {
    digits = digits || 2;

    var isNegative = Number(value) < 0;
    var buffer = value.toString();
    var size = 0;

    // Strip minus sign if number is negative
    if(isNegative) {
      buffer = buffer.slice(1);
    }

    size = digits - buffer.length + 1;
    buffer = new Array(size).join('0').concat(buffer);

    // Adds back minus sign if needed
    return (isNegative ? '-' : '') + buffer;
  }

  if(true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return addZero; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

})(this);


/***/ }),

/***/ "./src/js/controls/animation-display.js":
/*!**********************************************!*\
  !*** ./src/js/controls/animation-display.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));
var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Component = _video.default.getComponent('Component');
var AnimationDisplay = function (_Component) {
  function AnimationDisplay() {
    (0, _classCallCheck2.default)(this, AnimationDisplay);
    return _callSuper(this, AnimationDisplay, arguments);
  }
  (0, _inherits2.default)(AnimationDisplay, _Component);
  return (0, _createClass2.default)(AnimationDisplay, [{
    key: "createEl",
    value: function createEl() {
      var imgElement = _video.default.dom.createEl('img');
      var el = (0, _get2.default)((0, _getPrototypeOf2.default)(AnimationDisplay.prototype), "createEl", this).call(this, 'div', {
        className: 'vjs-animation-display',
        dir: 'ltr'
      });
      el.appendChild(imgElement);
      return el;
    }
  }]);
}(Component);
Component.registerComponent('AnimationDisplay', AnimationDisplay);
var _default = exports["default"] = AnimationDisplay;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/controls/camera-button.js":
/*!******************************************!*\
  !*** ./src/js/controls/camera-button.js ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));
var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));
var _event = _interopRequireDefault(__webpack_require__(/*! ../event */ "./src/js/event.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Button = _video.default.getComponent('Button');
var Component = _video.default.getComponent('Component');
var CameraButton = function (_Button) {
  function CameraButton() {
    (0, _classCallCheck2.default)(this, CameraButton);
    return _callSuper(this, CameraButton, arguments);
  }
  (0, _inherits2.default)(CameraButton, _Button);
  return (0, _createClass2.default)(CameraButton, [{
    key: "buildCSSClass",
    value: function buildCSSClass() {
      return 'vjs-camera-button vjs-control vjs-button vjs-icon-photo-camera';
    }
  }, {
    key: "enable",
    value: function enable() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(CameraButton.prototype), "enable", this).call(this);
      this.on(this.player_, _event.default.START_RECORD, this.onStart);
      this.on(this.player_, _event.default.STOP_RECORD, this.onStop);
    }
  }, {
    key: "disable",
    value: function disable() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(CameraButton.prototype), "disable", this).call(this);
      this.off(this.player_, _event.default.START_RECORD, this.onStart);
      this.off(this.player_, _event.default.STOP_RECORD, this.onStop);
    }
  }, {
    key: "show",
    value: function show() {
      if (this.layoutExclude && this.layoutExclude === true) {
        return;
      }
      (0, _get2.default)((0, _getPrototypeOf2.default)(CameraButton.prototype), "show", this).call(this);
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var recorder = this.player_.record();
      if (!recorder.isProcessing()) {
        recorder.start();
      } else {
        recorder.retrySnapshot();
        this.onStop();
        this.player_.trigger(_event.default.RETRY);
      }
    }
  }, {
    key: "onStart",
    value: function onStart(event) {
      this.removeClass('vjs-icon-photo-camera');
      this.addClass('vjs-icon-replay');
      this.controlText('Retry');
    }
  }, {
    key: "onStop",
    value: function onStop(event) {
      this.removeClass('vjs-icon-replay');
      this.addClass('vjs-icon-photo-camera');
      this.controlText('Image');
    }
  }]);
}(Button);
CameraButton.prototype.controlText_ = 'Image';
Component.registerComponent('CameraButton', CameraButton);
var _default = exports["default"] = CameraButton;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/controls/device-button.js":
/*!******************************************!*\
  !*** ./src/js/controls/device-button.js ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));
var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Button = _video.default.getComponent('Button');
var Component = _video.default.getComponent('Component');
var DeviceButton = function (_Button) {
  function DeviceButton() {
    (0, _classCallCheck2.default)(this, DeviceButton);
    return _callSuper(this, DeviceButton, arguments);
  }
  (0, _inherits2.default)(DeviceButton, _Button);
  return (0, _createClass2.default)(DeviceButton, [{
    key: "handleClick",
    value: function handleClick(event) {
      this.player_.record().getDevice();
    }
  }, {
    key: "show",
    value: function show() {
      if (this.layoutExclude && this.layoutExclude === true) {
        return;
      }
      (0, _get2.default)((0, _getPrototypeOf2.default)(DeviceButton.prototype), "show", this).call(this);
    }
  }]);
}(Button);
DeviceButton.prototype.controlText_ = 'Device';
Component.registerComponent('DeviceButton', DeviceButton);
var _default = exports["default"] = DeviceButton;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/controls/picture-in-picture-toggle.js":
/*!******************************************************!*\
  !*** ./src/js/controls/picture-in-picture-toggle.js ***!
  \******************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));
var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));
var _event = _interopRequireDefault(__webpack_require__(/*! ../event */ "./src/js/event.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Button = _video.default.getComponent('Button');
var Component = _video.default.getComponent('Component');
var PictureInPictureToggle = function (_Button) {
  function PictureInPictureToggle(player, options) {
    var _this;
    (0, _classCallCheck2.default)(this, PictureInPictureToggle);
    _this = _callSuper(this, PictureInPictureToggle, [player, options]);
    _this.on(_this.player_, _event.default.ENTER_PIP, _this.onStart);
    _this.on(_this.player_, _event.default.LEAVE_PIP, _this.onStop);
    return _this;
  }
  (0, _inherits2.default)(PictureInPictureToggle, _Button);
  return (0, _createClass2.default)(PictureInPictureToggle, [{
    key: "buildCSSClass",
    value: function buildCSSClass() {
      return 'vjs-pip-button vjs-control vjs-button vjs-icon-picture-in-picture-start';
    }
  }, {
    key: "show",
    value: function show() {
      if (this.layoutExclude && this.layoutExclude === true) {
        return;
      }
      (0, _get2.default)((0, _getPrototypeOf2.default)(PictureInPictureToggle.prototype), "show", this).call(this);
    }
  }, {
    key: "handleClick",
    value: (function () {
      var _handleClick = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(event) {
        var recorder;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              recorder = this.player_.record();
              this.disable();
              _context.prev = 2;
              if (!(recorder.mediaElement !== document.pictureInPictureElement)) {
                _context.next = 8;
                break;
              }
              _context.next = 6;
              return recorder.mediaElement.requestPictureInPicture();
            case 6:
              _context.next = 10;
              break;
            case 8:
              _context.next = 10;
              return document.exitPictureInPicture();
            case 10:
              _context.next = 15;
              break;
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](2);
              this.player_.trigger(_event.default.ERROR, _context.t0);
            case 15:
              _context.prev = 15;
              this.enable();
              return _context.finish(15);
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[2, 12, 15, 18]]);
      }));
      function handleClick(_x) {
        return _handleClick.apply(this, arguments);
      }
      return handleClick;
    }())
  }, {
    key: "onStart",
    value: function onStart(event) {
      this.removeClass('vjs-icon-picture-in-picture-start');
      this.addClass('vjs-icon-picture-in-picture-stop');
    }
  }, {
    key: "onStop",
    value: function onStop(event) {
      this.removeClass('vjs-icon-picture-in-picture-stop');
      this.addClass('vjs-icon-picture-in-picture-start');
    }
  }]);
}(Button);
PictureInPictureToggle.prototype.controlText_ = 'Picture in Picture';
Component.registerComponent('PictureInPictureToggle', PictureInPictureToggle);
var _default = exports["default"] = PictureInPictureToggle;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/controls/record-canvas.js":
/*!******************************************!*\
  !*** ./src/js/controls/record-canvas.js ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));
var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Component = _video.default.getComponent('Component');
var RecordCanvas = function (_Component) {
  function RecordCanvas() {
    (0, _classCallCheck2.default)(this, RecordCanvas);
    return _callSuper(this, RecordCanvas, arguments);
  }
  (0, _inherits2.default)(RecordCanvas, _Component);
  return (0, _createClass2.default)(RecordCanvas, [{
    key: "createEl",
    value: function createEl() {
      var canvasElement = _video.default.dom.createEl('canvas');
      var el = (0, _get2.default)((0, _getPrototypeOf2.default)(RecordCanvas.prototype), "createEl", this).call(this, 'div', {
        className: 'vjs-record-canvas',
        dir: 'ltr'
      });
      el.appendChild(canvasElement);
      return el;
    }
  }]);
}(Component);
Component.registerComponent('RecordCanvas', RecordCanvas);
var _default = exports["default"] = RecordCanvas;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/controls/record-indicator.js":
/*!*********************************************!*\
  !*** ./src/js/controls/record-indicator.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));
var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));
var _event = _interopRequireDefault(__webpack_require__(/*! ../event */ "./src/js/event.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Component = _video.default.getComponent('Component');
var RecordIndicator = function (_Component) {
  function RecordIndicator(player, options) {
    var _this;
    (0, _classCallCheck2.default)(this, RecordIndicator);
    _this = _callSuper(this, RecordIndicator, [player, options]);
    _this.enable();
    return _this;
  }
  (0, _inherits2.default)(RecordIndicator, _Component);
  return (0, _createClass2.default)(RecordIndicator, [{
    key: "createEl",
    value: function createEl() {
      var props = {
        className: 'vjs-record-indicator vjs-control',
        dir: 'ltr'
      };
      var attr = {
        'data-label': this.localize('REC')
      };
      return (0, _get2.default)((0, _getPrototypeOf2.default)(RecordIndicator.prototype), "createEl", this).call(this, 'div', props, attr);
    }
  }, {
    key: "enable",
    value: function enable() {
      this.on(this.player_, _event.default.START_RECORD, this.show);
      this.on(this.player_, _event.default.STOP_RECORD, this.hide);
    }
  }, {
    key: "disable",
    value: function disable() {
      this.off(this.player_, _event.default.START_RECORD, this.show);
      this.off(this.player_, _event.default.STOP_RECORD, this.hide);
    }
  }, {
    key: "show",
    value: function show() {
      if (this.layoutExclude && this.layoutExclude === true) {
        return;
      }
      (0, _get2.default)((0, _getPrototypeOf2.default)(RecordIndicator.prototype), "show", this).call(this);
    }
  }]);
}(Component);
Component.registerComponent('RecordIndicator', RecordIndicator);
var _default = exports["default"] = RecordIndicator;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/controls/record-toggle.js":
/*!******************************************!*\
  !*** ./src/js/controls/record-toggle.js ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));
var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));
var _event = _interopRequireDefault(__webpack_require__(/*! ../event */ "./src/js/event.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Button = _video.default.getComponent('Button');
var Component = _video.default.getComponent('Component');
var RecordToggle = function (_Button) {
  function RecordToggle() {
    (0, _classCallCheck2.default)(this, RecordToggle);
    return _callSuper(this, RecordToggle, arguments);
  }
  (0, _inherits2.default)(RecordToggle, _Button);
  return (0, _createClass2.default)(RecordToggle, [{
    key: "buildCSSClass",
    value: function buildCSSClass() {
      return 'vjs-record-button vjs-control vjs-button vjs-icon-record-start';
    }
  }, {
    key: "enable",
    value: function enable() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(RecordToggle.prototype), "enable", this).call(this);
      this.on(this.player_, _event.default.START_RECORD, this.onStart);
      this.on(this.player_, _event.default.STOP_RECORD, this.onStop);
    }
  }, {
    key: "disable",
    value: function disable() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(RecordToggle.prototype), "disable", this).call(this);
      this.off(this.player_, _event.default.START_RECORD, this.onStart);
      this.off(this.player_, _event.default.STOP_RECORD, this.onStop);
    }
  }, {
    key: "show",
    value: function show() {
      if (this.layoutExclude && this.layoutExclude === true) {
        return;
      }
      (0, _get2.default)((0, _getPrototypeOf2.default)(RecordToggle.prototype), "show", this).call(this);
    }
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
  }, {
    key: "onStart",
    value: function onStart(event) {
      this.removeClass('vjs-icon-record-start');
      this.addClass('vjs-icon-record-stop');
      this.controlText('Stop');
    }
  }, {
    key: "onStop",
    value: function onStop(event) {
      this.removeClass('vjs-icon-record-stop');
      this.addClass('vjs-icon-record-start');
      this.controlText('Record');
    }
  }]);
}(Button);
RecordToggle.prototype.controlText_ = 'Record';
Component.registerComponent('RecordToggle', RecordToggle);
var _default = exports["default"] = RecordToggle;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/defaults.js":
/*!****************************!*\
  !*** ./src/js/defaults.js ***!
  \****************************/
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var pluginDefaultOptions = {
  image: false,
  audio: false,
  video: false,
  animation: false,
  screen: false,
  maxLength: 10,
  maxFileSize: 0,
  displayMilliseconds: false,
  formatTime: undefined,
  frameWidth: 320,
  frameHeight: 240,
  debug: false,
  pip: false,
  autoMuteDevice: false,
  videoBitRate: 1200,
  videoEngine: 'recordrtc',
  videoFrameRate: 30,
  videoMimeType: 'video/webm',
  videoRecorderType: 'auto',
  videoWorkerURL: '',
  videoWebAssemblyURL: '',
  audioEngine: 'recordrtc',
  audioRecorderType: 'auto',
  audioMimeType: 'auto',
  audioBufferSize: 4096,
  audioSampleRate: 44100,
  audioBitRate: 128,
  audioChannels: 2,
  audioWorkerURL: '',
  audioWebAssemblyURL: '',
  audioBufferUpdate: false,
  animationFrameRate: 200,
  animationQuality: 10,
  imageOutputType: 'dataURL',
  imageOutputFormat: 'image/png',
  imageOutputQuality: 0.92,
  timeSlice: 0,
  convertEngine: '',
  convertWorkerURL: '',
  convertOptions: [],
  convertAuto: true,
  hotKeys: false,
  pluginLibraryOptions: {}
};
var _default = exports["default"] = pluginDefaultOptions;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/engine/convert-engine.js":
/*!*****************************************!*\
  !*** ./src/js/engine/convert-engine.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TSEBML = exports.FFMPEGWASM = exports.FFMPEGJS = exports.ConvertEngine = exports.CONVERT_PLUGINS = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));
var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));
var _fileUtil = __webpack_require__(/*! ../utils/file-util */ "./src/js/utils/file-util.js");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Component = _video.default.getComponent('Component');
var TSEBML = exports.TSEBML = 'ts-ebml';
var FFMPEGJS = exports.FFMPEGJS = 'ffmpeg.js';
var FFMPEGWASM = exports.FFMPEGWASM = 'ffmpeg.wasm';
var CONVERT_PLUGINS = exports.CONVERT_PLUGINS = [TSEBML, FFMPEGJS, FFMPEGWASM];
var ConvertEngine = exports.ConvertEngine = function (_Component) {
  function ConvertEngine(player, options) {
    (0, _classCallCheck2.default)(this, ConvertEngine);
    options.evented = true;
    return _callSuper(this, ConvertEngine, [player, options]);
  }
  (0, _inherits2.default)(ConvertEngine, _Component);
  return (0, _createClass2.default)(ConvertEngine, [{
    key: "setup",
    value: function setup(mediaType, debug) {
      this.mediaType = mediaType;
      this.debug = debug;
    }
  }, {
    key: "loadBlob",
    value: function loadBlob(data) {
      return (0, _fileUtil.blobToArrayBuffer)(data);
    }
  }, {
    key: "addFileInfo",
    value: function addFileInfo(fileObj, now) {
      (0, _fileUtil.addFileInfo)(fileObj, now);
    }
  }, {
    key: "saveAs",
    value: function saveAs(name) {
      var fileName = name[Object.keys(name)[0]];
      (0, _fileUtil.downloadBlob)(fileName, this.player().convertedData);
    }
  }]);
}(Component);
_video.default.ConvertEngine = ConvertEngine;
Component.registerComponent('ConvertEngine', ConvertEngine);

/***/ }),

/***/ "./src/js/engine/engine-loader.js":
/*!****************************************!*\
  !*** ./src/js/engine/engine-loader.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isAudioPluginActive = exports.getVideoEngine = exports.getConvertEngine = exports.getAudioEngine = void 0;
var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));
var _recordRtc = _interopRequireDefault(__webpack_require__(/*! ./record-rtc */ "./src/js/engine/record-rtc.js"));
var _convertEngine = __webpack_require__(/*! ./convert-engine */ "./src/js/engine/convert-engine.js");
var _recordEngine = __webpack_require__(/*! ./record-engine */ "./src/js/engine/record-engine.js");
var getAudioEngine = exports.getAudioEngine = function getAudioEngine(audioEngine) {
  var AudioEngineClass;
  switch (audioEngine) {
    case _recordEngine.RECORDRTC:
      AudioEngineClass = _recordRtc.default;
      break;
    case _recordEngine.LIBVORBISJS:
      AudioEngineClass = _video.default.LibVorbisEngine;
      break;
    case _recordEngine.RECORDERJS:
      AudioEngineClass = _video.default.RecorderjsEngine;
      break;
    case _recordEngine.LAMEJS:
      AudioEngineClass = _video.default.LamejsEngine;
      break;
    case _recordEngine.OPUSRECORDER:
      AudioEngineClass = _video.default.OpusRecorderEngine;
      break;
    case _recordEngine.OPUSMEDIARECORDER:
      AudioEngineClass = _video.default.OpusMediaRecorderEngine;
      break;
    case _recordEngine.VMSG:
      AudioEngineClass = _video.default.VmsgEngine;
      break;
    default:
      throw new Error('Unknown audioEngine: ' + audioEngine);
  }
  return AudioEngineClass;
};
var getVideoEngine = exports.getVideoEngine = function getVideoEngine(videoEngine) {
  var VideoEngineClass;
  switch (videoEngine) {
    case _recordEngine.RECORDRTC:
      VideoEngineClass = _recordRtc.default;
      break;
    case _recordEngine.WEBMWASM:
      VideoEngineClass = _video.default.WebmWasmEngine;
      break;
    default:
      throw new Error('Unknown videoEngine: ' + videoEngine);
  }
  return VideoEngineClass;
};
var isAudioPluginActive = exports.isAudioPluginActive = function isAudioPluginActive(audioEngine) {
  return _recordEngine.AUDIO_PLUGINS.indexOf(audioEngine) > -1;
};
var getConvertEngine = exports.getConvertEngine = function getConvertEngine(convertEngine) {
  var ConvertEngineClass;
  switch (convertEngine) {
    case '':
      break;
    case _convertEngine.TSEBML:
      ConvertEngineClass = _video.default.TsEBMLEngine;
      break;
    case _convertEngine.FFMPEGJS:
      ConvertEngineClass = _video.default.FFmpegjsEngine;
      break;
    case _convertEngine.FFMPEGWASM:
      ConvertEngineClass = _video.default.FFmpegWasmEngine;
      break;
    default:
      throw new Error('Unknown convertEngine: ' + convertEngine);
  }
  return ConvertEngineClass;
};

/***/ }),

/***/ "./src/js/engine/record-engine.js":
/*!****************************************!*\
  !*** ./src/js/engine/record-engine.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.WEBMWASM = exports.VMSG = exports.VIDEO_PLUGINS = exports.RecordEngine = exports.RECORD_PLUGINS = exports.RECORDRTC = exports.RECORDERJS = exports.OPUSRECORDER = exports.OPUSMEDIARECORDER = exports.LIBVORBISJS = exports.LAMEJS = exports.AUDIO_PLUGINS = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));
var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));
var _event = _interopRequireDefault(__webpack_require__(/*! ../event */ "./src/js/event.js"));
var _fileUtil = __webpack_require__(/*! ../utils/file-util */ "./src/js/utils/file-util.js");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Component = _video.default.getComponent('Component');
var RECORDRTC = exports.RECORDRTC = 'recordrtc';
var LIBVORBISJS = exports.LIBVORBISJS = 'libvorbis.js';
var RECORDERJS = exports.RECORDERJS = 'recorder.js';
var LAMEJS = exports.LAMEJS = 'lamejs';
var OPUSRECORDER = exports.OPUSRECORDER = 'opus-recorder';
var OPUSMEDIARECORDER = exports.OPUSMEDIARECORDER = 'opus-media-recorder';
var VMSG = exports.VMSG = 'vmsg';
var WEBMWASM = exports.WEBMWASM = 'webm-wasm';
var AUDIO_PLUGINS = exports.AUDIO_PLUGINS = [LIBVORBISJS, RECORDERJS, LAMEJS, OPUSRECORDER, OPUSMEDIARECORDER, VMSG];
var VIDEO_PLUGINS = exports.VIDEO_PLUGINS = [WEBMWASM];
var RECORD_PLUGINS = exports.RECORD_PLUGINS = AUDIO_PLUGINS.concat(VIDEO_PLUGINS);
var RecordEngine = exports.RecordEngine = function (_Component) {
  function RecordEngine(player, options) {
    (0, _classCallCheck2.default)(this, RecordEngine);
    options.evented = true;
    return _callSuper(this, RecordEngine, [player, options]);
  }
  (0, _inherits2.default)(RecordEngine, _Component);
  return (0, _createClass2.default)(RecordEngine, [{
    key: "dispose",
    value: function dispose() {
      if (this.recordedData !== undefined) {
        URL.revokeObjectURL(this.recordedData);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "addFileInfo",
    value: function addFileInfo(fileObj) {
      (0, _fileUtil.addFileInfo)(fileObj);
    }
  }, {
    key: "onStopRecording",
    value: function onStopRecording(data) {
      this.recordedData = data;
      this.addFileInfo(this.recordedData);
      this.dispose();
      this.trigger(_event.default.RECORD_COMPLETE);
    }
  }, {
    key: "saveAs",
    value: function saveAs(name) {
      var fileName = name[Object.keys(name)[0]];
      (0, _fileUtil.downloadBlob)(fileName, this.recordedData);
    }
  }]);
}(Component);
_video.default.RecordEngine = RecordEngine;
Component.registerComponent('RecordEngine', RecordEngine);

/***/ }),

/***/ "./src/js/engine/record-mode.js":
/*!**************************************!*\
  !*** ./src/js/engine/record-mode.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getRecorderMode = exports.VIDEO_ONLY = exports.SCREEN_ONLY = exports.IMAGE_ONLY = exports.AUDIO_VIDEO = exports.AUDIO_SCREEN = exports.AUDIO_ONLY = exports.ANIMATION = void 0;
var IMAGE_ONLY = exports.IMAGE_ONLY = 'image_only';
var AUDIO_ONLY = exports.AUDIO_ONLY = 'audio_only';
var VIDEO_ONLY = exports.VIDEO_ONLY = 'video_only';
var AUDIO_VIDEO = exports.AUDIO_VIDEO = 'audio_video';
var AUDIO_SCREEN = exports.AUDIO_SCREEN = 'audio_screen';
var ANIMATION = exports.ANIMATION = 'animation';
var SCREEN_ONLY = exports.SCREEN_ONLY = 'screen_only';
var getRecorderMode = exports.getRecorderMode = function getRecorderMode(image, audio, video, animation, screen) {
  if (isModeEnabled(image)) {
    return IMAGE_ONLY;
  } else if (isModeEnabled(animation)) {
    return ANIMATION;
  } else if (isModeEnabled(audio) && isModeEnabled(video)) {
    return AUDIO_VIDEO;
  } else if (isModeEnabled(audio) && isModeEnabled(screen)) {
    return AUDIO_SCREEN;
  } else if (!isModeEnabled(audio) && isModeEnabled(screen)) {
    return SCREEN_ONLY;
  } else if (isModeEnabled(audio) && !isModeEnabled(video)) {
    return AUDIO_ONLY;
  } else if (!isModeEnabled(audio) && isModeEnabled(video)) {
    return VIDEO_ONLY;
  }
};
var isModeEnabled = function isModeEnabled(mode) {
  return mode === Object(mode) || mode === true;
};

/***/ }),

/***/ "./src/js/engine/record-rtc.js":
/*!*************************************!*\
  !*** ./src/js/engine/record-rtc.js ***!
  \*************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));
var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));
var _recordrtc = _interopRequireDefault(__webpack_require__(/*! recordrtc */ "recordrtc"));
var _event = _interopRequireDefault(__webpack_require__(/*! ../event */ "./src/js/event.js"));
var _recordEngine = __webpack_require__(/*! ./record-engine */ "./src/js/engine/record-engine.js");
var _detectBrowser = __webpack_require__(/*! ../utils/detect-browser */ "./src/js/utils/detect-browser.js");
var _recordMode = __webpack_require__(/*! ./record-mode */ "./src/js/engine/record-mode.js");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Component = _video.default.getComponent('Component');
var RecordRTCEngine = function (_RecordEngine) {
  function RecordRTCEngine() {
    (0, _classCallCheck2.default)(this, RecordRTCEngine);
    return _callSuper(this, RecordRTCEngine, arguments);
  }
  (0, _inherits2.default)(RecordRTCEngine, _RecordEngine);
  return (0, _createClass2.default)(RecordRTCEngine, [{
    key: "setup",
    value: function setup(stream, mediaType, debug) {
      this.inputStream = stream;
      this.mediaType = mediaType;
      this.debug = debug;
      if ('screen' in this.mediaType) {
        this.mediaType.video = true;
      }
      if (this.recorderType !== undefined) {
        this.mediaType.video = this.recorderType;
      }
      this.engine = new _recordrtc.default.MRecordRTC();
      this.engine.mediaType = this.mediaType;
      this.engine.disableLogs = !this.debug;
      this.engine.mimeType = this.mimeType;
      this.engine.bufferSize = this.bufferSize;
      this.engine.sampleRate = this.sampleRate;
      this.engine.numberOfAudioChannels = this.audioChannels;
      this.engine.video = this.video;
      this.engine.canvas = this.canvas;
      this.engine.bitrate = this.bitRate;
      this.engine.quality = this.quality;
      this.engine.frameRate = this.frameRate;
      if (this.timeSlice !== undefined) {
        this.engine.timeSlice = this.timeSlice;
        this.engine.onTimeStamp = this.onTimeStamp.bind(this);
      }
      this.engine.workerPath = this.workerPath;
      this.engine.webAssemblyPath = this.videoWebAssemblyURL;
      this.engine.addStream(this.inputStream);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(RecordRTCEngine.prototype), "dispose", this).call(this);
      this.destroy();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.engine && typeof this.engine.destroy === 'function') {
        this.engine.destroy();
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.engine.startRecording();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.engine.stopRecording(this.onStopRecording.bind(this));
    }
  }, {
    key: "pause",
    value: function pause() {
      this.engine.pauseRecording();
    }
  }, {
    key: "resume",
    value: function resume() {
      this.engine.resumeRecording();
    }
  }, {
    key: "saveAs",
    value: function saveAs(name) {
      if (this.engine && name !== undefined) {
        this.engine.save(name);
      }
    }
  }, {
    key: "onStopRecording",
    value: function onStopRecording(audioVideoURL, type) {
      var _this = this;
      URL.revokeObjectURL(audioVideoURL);
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
          case _recordMode.AUDIO_SCREEN:
          case _recordMode.SCREEN_ONLY:
            if (recording.video !== undefined) {
              _this.recordedData = recording.video;
            }
            break;
          case _recordMode.ANIMATION:
            if (recording.gif !== undefined) {
              _this.recordedData = recording.gif;
            }
            break;
        }
        _this.addFileInfo(_this.recordedData);
        _this.trigger(_event.default.RECORD_COMPLETE);
      });
    }
  }, {
    key: "onTimeStamp",
    value: function onTimeStamp(current, all) {
      this.player().currentTimestamp = current;
      this.player().allTimestamps = all;
      var internal;
      switch (this.player().record().getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          internal = this.engine.audioRecorder;
          break;
        case _recordMode.ANIMATION:
          internal = this.engine.gifRecorder;
          break;
        default:
          internal = this.engine.videoRecorder;
      }
      var maxFileSizeReached = false;
      if (internal) {
        internal = internal.getInternalRecorder();
      }
      if (internal instanceof _recordrtc.default.MediaStreamRecorder === true) {
        this.player().recordedData = internal.getArrayOfBlobs();
        this.addFileInfo(this.player().recordedData[this.player_.recordedData.length - 1]);
        if (this.maxFileSize > 0) {
          var currentSize = new Blob(this.player().recordedData).size;
          if (currentSize >= this.maxFileSize) {
            maxFileSizeReached = true;
          }
        }
      }
      this.player().trigger(_event.default.TIMESTAMP);
      if (maxFileSizeReached) {
        this.player().record().stop();
      }
    }
  }]);
}(_recordEngine.RecordEngine);
_video.default.RecordRTCEngine = RecordRTCEngine;
Component.registerComponent('RecordRTCEngine', RecordRTCEngine);
var _default = exports["default"] = RecordRTCEngine;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/event.js":
/*!*************************!*\
  !*** ./src/js/event.js ***!
  \*************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var Event = (0, _createClass2.default)(function Event() {
  (0, _classCallCheck2.default)(this, Event);
});
Event.READY = 'ready';
Event.ERROR = 'error';
Event.PLAYING = 'playing';
Event.LOADEDMETADATA = 'loadedmetadata';
Event.LOADSTART = 'loadstart';
Event.USERINACTIVE = 'userinactive';
Event.TIMEUPDATE = 'timeupdate';
Event.DURATIONCHANGE = 'durationchange';
Event.ENDED = 'ended';
Event.PAUSE = 'pause';
Event.PLAY = 'play';
Event.DEVICE_READY = 'deviceReady';
Event.DEVICE_ERROR = 'deviceError';
Event.START_RECORD = 'startRecord';
Event.STOP_RECORD = 'stopRecord';
Event.FINISH_RECORD = 'finishRecord';
Event.RECORD_COMPLETE = 'recordComplete';
Event.PROGRESS_RECORD = 'progressRecord';
Event.TIMESTAMP = 'timestamp';
Event.ENUMERATE_READY = 'enumerateReady';
Event.ENUMERATE_ERROR = 'enumerateError';
Event.AUDIO_BUFFER_UPDATE = 'audioBufferUpdate';
Event.AUDIO_OUTPUT_READY = 'audioOutputReady';
Event.START_CONVERT = 'startConvert';
Event.FINISH_CONVERT = 'finishConvert';
Event.ENTER_PIP = 'enterPIP';
Event.LEAVE_PIP = 'leavePIP';
Event.RETRY = 'retry';
Event.ENTERPICTUREINPICTURE = 'enterpictureinpicture';
Event.LEAVEPICTUREINPICTURE = 'leavepictureinpicture';
Object.freeze(Event);
var _default = exports["default"] = Event;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/hot-keys.js":
/*!****************************!*\
  !*** ./src/js/hot-keys.js ***!
  \****************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _recordMode = __webpack_require__(/*! ./engine/record-mode */ "./src/js/engine/record-mode.js");
var X_KEY = 88;
var P_KEY = 80;
var C_KEY = 67;
var defaultKeyHandler = function defaultKeyHandler(event) {
  switch (event.which) {
    case X_KEY:
      switch (this.player_.record().getRecordType()) {
        case _recordMode.IMAGE_ONLY:
          this.player_.cameraButton.trigger('click');
          break;
        default:
          this.player_.recordToggle.trigger('click');
      }
      break;
    case P_KEY:
      if (this.player_.record().pictureInPicture === true) {
        this.player_.pipToggle.trigger('click');
      }
      break;
    case C_KEY:
      if (this.player_.controlBar.playToggle && this.player_.controlBar.playToggle.contentEl()) {
        player.controlBar.playToggle.trigger('click');
      }
      break;
  }
};
var _default = exports["default"] = defaultKeyHandler;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/utils/browser-shim.js":
/*!**************************************!*\
  !*** ./src/js/utils/browser-shim.js ***!
  \**************************************/
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var setSrcObject = function setSrcObject(stream, element) {
  if ('srcObject' in element) {
    element.srcObject = stream;
  } else if ('mozSrcObject' in element) {
    element.mozSrcObject = stream;
  } else {
    element.srcObject = stream;
  }
};
var _default = exports["default"] = setSrcObject;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/utils/compare-version.js":
/*!*****************************************!*\
  !*** ./src/js/utils/compare-version.js ***!
  \*****************************************/
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var compareVersion = function compareVersion(v1, v2) {
  if (typeof v1 !== 'string') return false;
  if (typeof v2 !== 'string') return false;
  v1 = v1.split('.');
  v2 = v2.split('.');
  var k = Math.min(v1.length, v2.length);
  var i = 0;
  for (i; i < k; ++i) {
    v1[i] = parseInt(v1[i], 10);
    v2[i] = parseInt(v2[i], 10);
    if (v1[i] > v2[i]) return 1;
    if (v1[i] < v2[i]) return -1;
  }
  return v1.length === v2.length ? 0 : v1.length < v2.length ? -1 : 1;
};
var _default = exports["default"] = compareVersion;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/utils/detect-browser.js":
/*!****************************************!*\
  !*** ./src/js/utils/detect-browser.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isSafari = exports.isOpera = exports.isFirefox = exports.isEdge = exports.isChrome = exports.detectBrowser = void 0;
var _window = _interopRequireDefault(__webpack_require__(/*! global/window */ "./node_modules/global/window.js"));
var detectBrowser = exports.detectBrowser = function detectBrowser() {
  var result = {};
  result.browser = null;
  result.version = null;
  result.minVersion = null;
  if (typeof _window.default === 'undefined' || !_window.default.navigator) {
    result.browser = 'Not a supported browser.';
    return result;
  }
  if (navigator.mozGetUserMedia) {
    result.browser = 'firefox';
    result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
    result.minVersion = 31;
  } else if (navigator.webkitGetUserMedia) {
    result.browser = 'chrome';
    result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
    result.minVersion = 38;
  } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
    result.browser = 'edge';
    result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
    result.minVersion = 10547;
  } else if (_window.default.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
    result.browser = 'safari';
    result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
  } else {
    result.browser = 'Not a supported browser.';
    return result;
  }
  return result;
};
var extractVersion = function extractVersion(uastring, expr, pos) {
  var match = uastring.match(expr);
  return match && match.length >= pos && parseInt(match[pos], 10);
};
var isEdge = exports.isEdge = function isEdge() {
  return detectBrowser().browser === 'edge';
};
var isSafari = exports.isSafari = function isSafari() {
  return detectBrowser().browser === 'safari';
};
var isOpera = exports.isOpera = function isOpera() {
  return !!_window.default.opera || navigator.userAgent.indexOf('OPR/') !== -1;
};
var isChrome = exports.isChrome = function isChrome() {
  return detectBrowser().browser === 'chrome';
};
var isFirefox = exports.isFirefox = function isFirefox() {
  return detectBrowser().browser === 'firefox';
};

/***/ }),

/***/ "./src/js/utils/file-util.js":
/*!***********************************!*\
  !*** ./src/js/utils/file-util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.downloadBlob = exports.blobToArrayBuffer = exports.addFileInfo = void 0;
var _mime = _interopRequireDefault(__webpack_require__(/*! ./mime */ "./src/js/utils/mime.js"));
var downloadBlob = exports.downloadBlob = function downloadBlob(fileName, data) {
  if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
    return navigator.msSaveOrOpenBlob(data, fileName);
  } else if (typeof navigator.msSaveBlob !== 'undefined') {
    return navigator.msSaveBlob(data, fileName);
  }
  var hyperlink = document.createElement('a');
  hyperlink.href = URL.createObjectURL(data);
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
};
var blobToArrayBuffer = exports.blobToArrayBuffer = function blobToArrayBuffer(fileObj) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.onerror = function (ev) {
      reject(ev.error);
    };
    reader.readAsArrayBuffer(fileObj);
  });
};
var addFileInfo = exports.addFileInfo = function addFileInfo(fileObj, dateObj, fileExtension) {
  if (fileObj instanceof Blob || fileObj instanceof File) {
    if (dateObj === undefined) {
      dateObj = new Date();
    }
    try {
      fileObj.lastModified = dateObj.getTime();
      fileObj.lastModifiedDate = dateObj;
    } catch (e) {
      if (e instanceof TypeError) {} else {
        throw e;
      }
    }
    if (fileExtension === undefined) {
      fileExtension = '.' + (0, _mime.default)(fileObj.type);
    }
    try {
      fileObj.name = dateObj.getTime() + fileExtension;
    } catch (e) {
      if (e instanceof TypeError) {} else {
        throw e;
      }
    }
  }
};

/***/ }),

/***/ "./src/js/utils/format-time.js":
/*!*************************************!*\
  !*** ./src/js/utils/format-time.js ***!
  \*************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _parseMs = _interopRequireDefault(__webpack_require__(/*! parse-ms */ "./node_modules/parse-ms/index.js"));
var _addZero = _interopRequireDefault(__webpack_require__(/*! add-zero */ "./node_modules/add-zero/index.js"));
var formatTime = function formatTime(seconds, guide) {
  var displayMilliseconds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  seconds = seconds < 0 ? 0 : seconds;
  if (isNaN(seconds) || seconds === Infinity) {
    seconds = 0;
  }
  var inputTime = (0, _parseMs.default)(seconds * 1000);
  var guideTime = inputTime;
  if (guide !== undefined) {
    guideTime = (0, _parseMs.default)(guide * 1000);
  }
  var hr = (0, _addZero.default)(inputTime.hours);
  var min = (0, _addZero.default)(inputTime.minutes);
  var sec = (0, _addZero.default)(inputTime.seconds);
  var ms = (0, _addZero.default)(inputTime.milliseconds, 3);
  if (inputTime.days > 0 || guideTime.days > 0) {
    var day = (0, _addZero.default)(inputTime.days);
    return "".concat(day, ":").concat(hr, ":").concat(min, ":").concat(sec);
  }
  if (inputTime.hours > 0 || guideTime.hours > 0) {
    return "".concat(hr, ":").concat(min, ":").concat(sec);
  }
  if (displayMilliseconds) {
    return "".concat(min, ":").concat(sec, ":").concat(ms);
  }
  return "".concat(min, ":").concat(sec);
};
var _default = exports["default"] = formatTime;
module.exports = exports.default;

/***/ }),

/***/ "./src/js/utils/mime.js":
/*!******************************!*\
  !*** ./src/js/utils/mime.js ***!
  \******************************/
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
var Mimetypes = {
  'video/ogg': 'ogv',
  'video/mp4': 'mp4',
  'video/x-matroska': 'mkv',
  'video/webm': 'webm',
  'audio/mp4': 'm4a',
  'audio/mpeg': 'mp3',
  'audio/aac': 'aac',
  'audio/flac': 'flac',
  'audio/ogg': 'oga',
  'audio/wav': 'wav',
  'audio/webm': 'webm',
  'application/x-mpegURL': 'm3u8',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/png': 'png',
  'image/svg+xml': 'svg',
  'image/webp': 'webp'
};
var getExtension = function getExtension(mimeType) {
  var match = EXTRACT_TYPE_REGEXP.exec(mimeType);
  var result = match && match[1].toLowerCase();
  return Mimetypes[result];
};
var _default = exports["default"] = getExtension;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/global/window.js":
/*!***************************************!*\
  !*** ./node_modules/global/window.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof __webpack_require__.g !== "undefined") {
    win = __webpack_require__.g;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;


/***/ }),

/***/ "recordrtc":
/*!******************************************************************************************************!*\
  !*** external {"commonjs":"recordrtc","commonjs2":"recordrtc","amd":"recordrtc","root":"RecordRTC"} ***!
  \******************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_recordrtc__;

/***/ }),

/***/ "video.js":
/*!*************************************************************************************************!*\
  !*** external {"commonjs":"video.js","commonjs2":"video.js","amd":"video.js","root":"videojs"} ***!
  \*************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_video_js__;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/***/ ((module) => {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/get.js":
/*!****************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/get.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var superPropBase = __webpack_require__(/*! ./superPropBase.js */ "./node_modules/@babel/runtime/helpers/superPropBase.js");
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _get.apply(this, arguments);
}
module.exports = _get, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return assertThisInitialized(self);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/superPropBase.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
module.exports = _superPropBase, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPrimitive.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toPropertyKey.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/toPrimitive.js");
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./node_modules/parse-ms/index.js":
/*!****************************************!*\
  !*** ./node_modules/parse-ms/index.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseMilliseconds)
/* harmony export */ });
function parseMilliseconds(milliseconds) {
	if (typeof milliseconds !== 'number') {
		throw new TypeError('Expected a number');
	}

	const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;

	return {
		days: roundTowardsZero(milliseconds / 86400000),
		hours: roundTowardsZero(milliseconds / 3600000) % 24,
		minutes: roundTowardsZero(milliseconds / 60000) % 60,
		seconds: roundTowardsZero(milliseconds / 1000) % 60,
		milliseconds: roundTowardsZero(milliseconds) % 1000,
		microseconds: roundTowardsZero(milliseconds * 1000) % 1000,
		nanoseconds: roundTowardsZero(milliseconds * 1e6) % 1000
	};
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!**********************************!*\
  !*** ./src/js/videojs.record.js ***!
  \**********************************/


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Record = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));
var _video = _interopRequireDefault(__webpack_require__(/*! video.js */ "video.js"));
var _animationDisplay = _interopRequireDefault(__webpack_require__(/*! ./controls/animation-display */ "./src/js/controls/animation-display.js"));
var _recordCanvas = _interopRequireDefault(__webpack_require__(/*! ./controls/record-canvas */ "./src/js/controls/record-canvas.js"));
var _deviceButton = _interopRequireDefault(__webpack_require__(/*! ./controls/device-button */ "./src/js/controls/device-button.js"));
var _cameraButton = _interopRequireDefault(__webpack_require__(/*! ./controls/camera-button */ "./src/js/controls/camera-button.js"));
var _recordToggle = _interopRequireDefault(__webpack_require__(/*! ./controls/record-toggle */ "./src/js/controls/record-toggle.js"));
var _recordIndicator = _interopRequireDefault(__webpack_require__(/*! ./controls/record-indicator */ "./src/js/controls/record-indicator.js"));
var _pictureInPictureToggle = _interopRequireDefault(__webpack_require__(/*! ./controls/picture-in-picture-toggle */ "./src/js/controls/picture-in-picture-toggle.js"));
var _event = _interopRequireDefault(__webpack_require__(/*! ./event */ "./src/js/event.js"));
var _hotKeys = _interopRequireDefault(__webpack_require__(/*! ./hot-keys */ "./src/js/hot-keys.js"));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ "./src/js/defaults.js"));
var _formatTime = _interopRequireDefault(__webpack_require__(/*! ./utils/format-time */ "./src/js/utils/format-time.js"));
var _browserShim = _interopRequireDefault(__webpack_require__(/*! ./utils/browser-shim */ "./src/js/utils/browser-shim.js"));
var _compareVersion = _interopRequireDefault(__webpack_require__(/*! ./utils/compare-version */ "./src/js/utils/compare-version.js"));
var _detectBrowser = __webpack_require__(/*! ./utils/detect-browser */ "./src/js/utils/detect-browser.js");
var _engineLoader = __webpack_require__(/*! ./engine/engine-loader */ "./src/js/engine/engine-loader.js");
var _recordMode = __webpack_require__(/*! ./engine/record-mode */ "./src/js/engine/record-mode.js");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Plugin = _video.default.getPlugin('plugin');
var Player = _video.default.getComponent('Player');
var AUTO = 'auto';
var Record = exports.Record = function (_Plugin) {
  function Record(player, options) {
    var _this;
    (0, _classCallCheck2.default)(this, Record);
    _this = _callSuper(this, Record, [player, options]);
    Player.prototype.play = function play() {
      var retval = this.techGet_('play');
      if (retval !== undefined && typeof retval.then === 'function') {
        retval.then(null, function (e) {});
      }
      return retval;
    };
    player.addClass('vjs-record');
    _this.loadOptions();
    _this.resetState();
    if (options.formatTime && typeof options.formatTime === 'function') {
      _this.setFormatTime(options.formatTime);
    } else {
      _this.setFormatTime(function (seconds, guide) {
        return (0, _formatTime.default)(seconds, guide, _this.displayMilliseconds);
      });
    }
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
      case _recordMode.AUDIO_SCREEN:
        deviceIcon = 'sv-perm';
        break;
    }
    _deviceButton.default.prototype.buildCSSClass = function () {
      return 'vjs-record vjs-device-button vjs-control vjs-icon-' + deviceIcon;
    };
    player.deviceButton = new _deviceButton.default(player, options);
    player.addChild(player.deviceButton);
    player.recordIndicator = new _recordIndicator.default(player, options);
    player.recordIndicator.hide();
    player.addChild(player.recordIndicator);
    player.recordCanvas = new _recordCanvas.default(player, options);
    player.recordCanvas.hide();
    player.addChild(player.recordCanvas);
    player.animationDisplay = new _animationDisplay.default(player, options);
    player.animationDisplay.hide();
    player.addChild(player.animationDisplay);
    player.cameraButton = new _cameraButton.default(player, options);
    player.cameraButton.hide();
    player.recordToggle = new _recordToggle.default(player, options);
    player.recordToggle.hide();
    var oldVideoJS = _video.default.VERSION === undefined || (0, _compareVersion.default)(_video.default.VERSION, '7.6.0') === -1;
    if (!('pictureInPictureEnabled' in document)) {
      _this.pictureInPicture = false;
    }
    if (_this.pictureInPicture === true) {
      if (oldVideoJS) {
        player.pipToggle = new _pictureInPictureToggle.default(player, options);
        player.pipToggle.hide();
      }
      _this.onEnterPiPHandler = _this.onEnterPiP.bind(_this);
      _this.onLeavePiPHandler = _this.onLeavePiP.bind(_this);
    }
    if (_this.player.options_.controlBar) {
      var customUIElements = ['deviceButton', 'recordIndicator', 'cameraButton', 'recordToggle'];
      if (player.pipToggle) {
        customUIElements.push('pipToggle');
      }
      customUIElements.forEach(function (element) {
        if (_this.player.options_.controlBar[element] !== undefined) {
          _this.player[element].layoutExclude = true;
          _this.player[element].hide();
        }
      });
    }
    _this.player.one(_event.default.READY, _this.setupUI.bind(_this));
    return _this;
  }
  (0, _inherits2.default)(Record, _Plugin);
  return (0, _createClass2.default)(Record, [{
    key: "loadOptions",
    value: function loadOptions() {
      var newOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var merge;
      if (_video.default.obj !== undefined) {
        merge = _video.default.obj.merge;
      } else {
        merge = _video.default.mergeOptions;
      }
      var recordOptions = merge(_defaults.default, this.player.options_.plugins.record, newOptions);
      this.recordImage = recordOptions.image;
      this.recordAudio = recordOptions.audio;
      this.recordVideo = recordOptions.video;
      this.recordAnimation = recordOptions.animation;
      this.recordScreen = recordOptions.screen;
      this.maxLength = recordOptions.maxLength;
      this.maxFileSize = recordOptions.maxFileSize;
      this.displayMilliseconds = recordOptions.displayMilliseconds;
      this.debug = recordOptions.debug;
      this.pictureInPicture = recordOptions.pip;
      this.recordTimeSlice = recordOptions.timeSlice;
      this.autoMuteDevice = recordOptions.autoMuteDevice;
      this.pluginLibraryOptions = recordOptions.pluginLibraryOptions;
      this.videoFrameWidth = recordOptions.frameWidth;
      this.videoFrameHeight = recordOptions.frameHeight;
      this.videoFrameRate = recordOptions.videoFrameRate;
      this.videoBitRate = recordOptions.videoBitRate;
      this.videoEngine = recordOptions.videoEngine;
      this.videoRecorderType = recordOptions.videoRecorderType;
      this.videoMimeType = recordOptions.videoMimeType;
      this.videoWorkerURL = recordOptions.videoWorkerURL;
      this.videoWebAssemblyURL = recordOptions.videoWebAssemblyURL;
      this.convertEngine = recordOptions.convertEngine;
      this.convertAuto = recordOptions.convertAuto;
      this.convertWorkerURL = recordOptions.convertWorkerURL;
      this.convertOptions = recordOptions.convertOptions;
      this.audioEngine = recordOptions.audioEngine;
      this.audioRecorderType = recordOptions.audioRecorderType;
      this.audioWorkerURL = recordOptions.audioWorkerURL;
      this.audioWebAssemblyURL = recordOptions.audioWebAssemblyURL;
      this.audioBufferSize = recordOptions.audioBufferSize;
      this.audioSampleRate = recordOptions.audioSampleRate;
      this.audioBitRate = recordOptions.audioBitRate;
      this.audioChannels = recordOptions.audioChannels;
      this.audioMimeType = recordOptions.audioMimeType;
      this.audioBufferUpdate = recordOptions.audioBufferUpdate;
      this.imageOutputType = recordOptions.imageOutputType;
      this.imageOutputFormat = recordOptions.imageOutputFormat;
      this.imageOutputQuality = recordOptions.imageOutputQuality;
      this.animationFrameRate = recordOptions.animationFrameRate;
      this.animationQuality = recordOptions.animationQuality;
    }
  }, {
    key: "setupUI",
    value: function setupUI() {
      var _this2 = this;
      this.player.controlBar.addChild(this.player.cameraButton);
      this.player.controlBar.el().insertBefore(this.player.cameraButton.el(), this.player.controlBar.el().firstChild);
      this.player.controlBar.el().insertBefore(this.player.recordToggle.el(), this.player.controlBar.el().firstChild);
      if (this.pictureInPicture === true) {
        if (this.player.controlBar.pictureInPictureToggle === undefined && this.player.pipToggle !== undefined) {
          this.player.controlBar.addChild(this.player.pipToggle);
        } else if (this.player.controlBar.pictureInPictureToggle !== undefined) {
          this.player.pipToggle = this.player.controlBar.pictureInPictureToggle;
          this.player.pipToggle.hide();
        }
      } else if (this.pictureInPicture === false && this.player.controlBar.pictureInPictureToggle !== undefined) {
        this.player.controlBar.pictureInPictureToggle.hide();
      }
      if (this.player.controlBar.remainingTimeDisplay !== undefined) {
        this.player.controlBar.remainingTimeDisplay.el().style.display = 'none';
      }
      if (this.player.controlBar.liveDisplay !== undefined) {
        this.player.controlBar.liveDisplay.el().style.display = 'none';
      }
      this.player.loop(false);
      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          this.surfer = this.player.wavesurfer();
          this.surfer.setFormatTime(this._formatTime);
          break;
        case _recordMode.IMAGE_ONLY:
        case _recordMode.VIDEO_ONLY:
        case _recordMode.AUDIO_VIDEO:
        case _recordMode.ANIMATION:
        case _recordMode.SCREEN_ONLY:
        case _recordMode.AUDIO_SCREEN:
          if (this.player.bigPlayButton !== undefined) {
            this.player.bigPlayButton.hide();
          }
          this.player.one(_event.default.LOADEDMETADATA, function () {
            _this2.setDuration(_this2.maxLength);
          });
          this.player.one(_event.default.LOADSTART, function () {
            _this2.setDuration(_this2.maxLength);
          });
          if (this.player.usingNativeControls_ === true) {
            if (this.player.tech_.el_ !== undefined) {
              this.player.tech_.el_.controls = false;
            }
          }
          this.player.removeTechControlsListeners_();
          if (this.player.options_.controls) {
            if (this.player.controlBar.progressControl !== undefined) {
              this.player.controlBar.progressControl.hide();
            }
            this.player.on(_event.default.USERINACTIVE, function (event) {
              _this2.player.userActive(true);
            });
            this.player.controlBar.show();
            this.player.controlBar.el().style.display = 'flex';
          }
          break;
      }
      this.player.off(_event.default.TIMEUPDATE);
      this.player.off(_event.default.DURATIONCHANGE);
      this.player.off(_event.default.LOADEDMETADATA);
      this.player.off(_event.default.LOADSTART);
      this.player.off(_event.default.ENDED);
      this.setDuration(this.maxLength);
      if (this.player.options_.plugins.record && this.player.options_.plugins.record.hotKeys && this.player.options_.plugins.record.hotKeys !== false) {
        var handler = this.player.options_.plugins.record.hotKeys;
        if (handler === true) {
          handler = _hotKeys.default;
        }
        this.player.options_.userActions = {
          hotkeys: handler
        };
      }
      if (this.player.controlBar.playToggle !== undefined) {
        this.player.controlBar.playToggle.hide();
      }
    }
  }, {
    key: "isRecording",
    value: function isRecording() {
      return this._recording;
    }
  }, {
    key: "isProcessing",
    value: function isProcessing() {
      return this._processing;
    }
  }, {
    key: "isDestroyed",
    value: function isDestroyed() {
      var destroyed = this.player === null;
      if (destroyed === false) {
        destroyed = this.player.children() === null;
      }
      return destroyed;
    }
  }, {
    key: "getDevice",
    value: function getDevice() {
      var _this3 = this;
      if (this.deviceReadyCallback === undefined) {
        this.deviceReadyCallback = this.onDeviceReady.bind(this);
      }
      if (this.deviceErrorCallback === undefined) {
        this.deviceErrorCallback = this.onDeviceError.bind(this);
      }
      if (this.engineStopCallback === undefined) {
        this.engineStopCallback = this.onRecordComplete.bind(this);
      }
      if (this.streamVisibleCallback === undefined) {
        this.streamVisibleCallback = this.onStreamVisible.bind(this);
      }
      if (this.getRecordType() === _recordMode.SCREEN_ONLY || this.getRecordType() === _recordMode.AUDIO_SCREEN) {
        if (navigator.mediaDevices === undefined || navigator.mediaDevices.getDisplayMedia === undefined) {
          this.player.trigger(_event.default.ERROR, 'This browser does not support navigator.mediaDevices.getDisplayMedia');
          return;
        }
      } else {
        if (navigator.mediaDevices === undefined || navigator.mediaDevices.getUserMedia === undefined) {
          this.player.trigger(_event.default.ERROR, 'This browser does not support navigator.mediaDevices.getUserMedia');
          return;
        }
      }
      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          this.mediaType = {
            audio: this.audioRecorderType === AUTO ? true : this.audioRecorderType,
            video: false
          };
          this.surfer.surfer.microphone.un(_event.default.DEVICE_READY, this.deviceReadyCallback);
          this.surfer.surfer.microphone.un(_event.default.DEVICE_ERROR, this.deviceErrorCallback);
          this.surfer.surfer.microphone.on(_event.default.DEVICE_READY, this.deviceReadyCallback);
          this.surfer.surfer.microphone.on(_event.default.DEVICE_ERROR, this.deviceErrorCallback);
          this.surfer.setupPlaybackEvents(false);
          this.surfer.liveMode = true;
          this.surfer.surfer.microphone.paused = false;
          if (this.surfer.surfer.backend.ac.state === 'suspended') {
            this.surfer.surfer.backend.ac.resume();
          }
          if (this.audioBufferUpdate === true) {
            this.surfer.surfer.microphone.reloadBufferFunction = function (event) {
              if (!_this3.surfer.surfer.microphone.paused) {
                _this3.surfer.surfer.empty();
                _this3.surfer.surfer.loadDecodedBuffer(event.inputBuffer);
                _this3.player.recordedData = event.inputBuffer;
                _this3.player.trigger(_event.default.AUDIO_BUFFER_UPDATE);
              }
            };
          }
          this.surfer.surfer.microphone.start();
          break;
        case _recordMode.IMAGE_ONLY:
        case _recordMode.VIDEO_ONLY:
          if (this.getRecordType() === _recordMode.IMAGE_ONLY) {
            this.player.el().firstChild.addEventListener(_event.default.PLAYING, this.streamVisibleCallback);
          }
          this.mediaType = {
            audio: false,
            video: this.videoRecorderType === AUTO ? true : this.videoRecorderType
          };
          navigator.mediaDevices.getUserMedia({
            audio: false,
            video: this.getRecordType() === _recordMode.IMAGE_ONLY ? this.recordImage : this.recordVideo
          }).then(this.onDeviceReady.bind(this)).catch(this.onDeviceError.bind(this));
          break;
        case _recordMode.AUDIO_SCREEN:
          this.mediaType = {
            audio: this.audioRecorderType === AUTO ? true : this.audioRecorderType,
            video: this.videoRecorderType === AUTO ? true : this.videoRecorderType
          };
          var audioScreenConstraints = {};
          if (this.recordScreen === true) {
            audioScreenConstraints = {
              video: true
            };
          } else if ((0, _typeof2.default)(this.recordScreen) === 'object' && this.recordScreen.constructor === Object) {
            audioScreenConstraints = this.recordScreen;
          }
          navigator.mediaDevices.getDisplayMedia(audioScreenConstraints).then(function (screenStream) {
            navigator.mediaDevices.getUserMedia({
              audio: _this3.recordAudio
            }).then(function (mic) {
              screenStream.addTrack(mic.getTracks()[0]);
              _this3.onDeviceReady.bind(_this3)(screenStream);
            }).catch(function (code) {
              if (screenStream.active) {
                screenStream.stop();
              }
              _this3.onDeviceError(code);
            });
          }).catch(this.onDeviceError.bind(this));
          break;
        case _recordMode.AUDIO_VIDEO:
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
          this.mediaType = {
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
          this.mediaType = {
            audio: false,
            video: false,
            screen: true,
            gif: false
          };
          var screenOnlyConstraints = {};
          if (this.recordScreen === true) {
            screenOnlyConstraints = {
              video: true
            };
          } else if ((0, _typeof2.default)(this.recordScreen) === 'object' && this.recordScreen.constructor === Object) {
            screenOnlyConstraints = this.recordScreen;
          }
          navigator.mediaDevices.getDisplayMedia(screenOnlyConstraints).then(this.onDeviceReady.bind(this)).catch(this.onDeviceError.bind(this));
          break;
      }
    }
  }, {
    key: "onDeviceReady",
    value: function onDeviceReady(stream) {
      var _this4 = this;
      this._deviceActive = true;
      if (this.stream !== undefined && this.stream.active) {
        this.stream.stop();
      }
      this.stream = stream;
      this.player.deviceButton.hide();
      this.setDuration(this.maxLength);
      this.setCurrentTime(0);
      if (this.player.controlBar.playToggle !== undefined) {
        this.player.controlBar.playToggle.hide();
      }
      this.off(this.player, _event.default.TIMEUPDATE, this.playbackTimeUpdate);
      this.off(this.player, _event.default.ENDED, this.playbackTimeUpdate);
      if (this.getRecordType() !== _recordMode.IMAGE_ONLY) {
        if (this.getRecordType() !== _recordMode.AUDIO_ONLY && (0, _engineLoader.isAudioPluginActive)(this.audioEngine)) {
          throw new Error('Currently ' + this.audioEngine + ' is only supported in audio-only mode.');
        }
        var EngineClass, engineType;
        switch (this.getRecordType()) {
          case _recordMode.AUDIO_ONLY:
            EngineClass = (0, _engineLoader.getAudioEngine)(this.audioEngine);
            engineType = this.audioEngine;
            break;
          default:
            EngineClass = (0, _engineLoader.getVideoEngine)(this.videoEngine);
            engineType = this.videoEngine;
        }
        try {
          this.engine = new EngineClass(this.player, this.player.options_);
        } catch (err) {
          throw new Error('Could not load ' + engineType + ' plugin');
        }
        this.engine.on(_event.default.RECORD_COMPLETE, this.engineStopCallback);
        this.engine.bufferSize = this.audioBufferSize;
        this.engine.sampleRate = this.audioSampleRate;
        this.engine.bitRate = this.audioBitRate;
        this.engine.audioChannels = this.audioChannels;
        this.engine.audioWorkerURL = this.audioWorkerURL;
        this.engine.audioWebAssemblyURL = this.audioWebAssemblyURL;
        this.engine.mimeType = {
          video: this.videoMimeType,
          gif: 'image/gif'
        };
        if (this.audioMimeType !== null && this.audioMimeType !== AUTO) {
          this.engine.mimeType.audio = this.audioMimeType;
        }
        this.engine.videoWorkerURL = this.videoWorkerURL;
        this.engine.videoWebAssemblyURL = this.videoWebAssemblyURL;
        this.engine.videoBitRate = this.videoBitRate;
        this.engine.videoFrameRate = this.videoFrameRate;
        this.engine.video = {
          width: this.videoFrameWidth,
          height: this.videoFrameHeight
        };
        this.engine.canvas = {
          width: this.videoFrameWidth,
          height: this.videoFrameHeight
        };
        this.engine.quality = this.animationQuality;
        this.engine.frameRate = this.animationFrameRate;
        if (this.recordTimeSlice && this.recordTimeSlice > 0) {
          this.engine.timeSlice = this.recordTimeSlice;
          this.engine.maxFileSize = this.maxFileSize;
        }
        this.engine.pluginLibraryOptions = this.pluginLibraryOptions;
        this.engine.setup(this.stream, this.mediaType, this.debug);
        if (this.convertEngine !== '') {
          var ConvertEngineClass = (0, _engineLoader.getConvertEngine)(this.convertEngine);
          try {
            this.converter = new ConvertEngineClass(this.player, this.player.options_);
          } catch (err) {
            throw new Error('Could not load ' + this.convertEngine + ' plugin');
          }
          this.converter.convertAuto = this.convertAuto;
          this.converter.convertWorkerURL = this.convertWorkerURL;
          this.converter.convertOptions = this.convertOptions;
          this.converter.pluginLibraryOptions = this.pluginLibraryOptions;
          this.converter.setup(this.mediaType, this.debug);
        }
        var uiElements = ['currentTimeDisplay', 'timeDivider', 'durationDisplay'];
        uiElements.forEach(function (element) {
          element = _this4.player.controlBar[element];
          if (element !== undefined) {
            element.el().style.display = 'block';
            element.show();
          }
        });
        this.player.recordToggle.show();
      } else {
        this.player.recordIndicator.disable();
        this.retrySnapshot();
      }
      if (this.getRecordType() !== _recordMode.AUDIO_ONLY) {
        this.mediaElement = this.player.el().firstChild;
        this.mediaElement.controls = false;
        this.mediaElement.muted = true;
        this.displayVolumeControl(false);
        if (this.pictureInPicture === true) {
          this.player.pipToggle.show();
          this.mediaElement.removeEventListener(_event.default.ENTERPICTUREINPICTURE, this.onEnterPiPHandler);
          this.mediaElement.removeEventListener(_event.default.LEAVEPICTUREINPICTURE, this.onLeavePiPHandler);
          this.mediaElement.addEventListener(_event.default.ENTERPICTUREINPICTURE, this.onEnterPiPHandler);
          this.mediaElement.addEventListener(_event.default.LEAVEPICTUREINPICTURE, this.onLeavePiPHandler);
        }
        this.load(this.stream);
        this.player.one(_event.default.LOADEDMETADATA, function () {
          _this4.mediaElement.play();
          _this4.player.trigger(_event.default.DEVICE_READY);
        });
      } else {
        this.player.trigger(_event.default.DEVICE_READY);
      }
    }
  }, {
    key: "onDeviceError",
    value: function onDeviceError(code) {
      this._deviceActive = false;
      if (!this.isDestroyed()) {
        this.player.deviceErrorCode = code;
        this.player.trigger(_event.default.DEVICE_ERROR);
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this5 = this;
      if (!this.isProcessing()) {
        if (this.stream && this.stream.active === false) {
          this.getDevice();
          return;
        }
        this._recording = true;
        if (this.player.controlBar.playToggle !== undefined) {
          this.player.controlBar.playToggle.hide();
        }
        this.off(this.player, _event.default.TIMEUPDATE, this.playbackTimeUpdate);
        this.off(this.player, _event.default.ENDED, this.playbackTimeUpdate);
        switch (this.getRecordType()) {
          case _recordMode.AUDIO_ONLY:
            this.surfer.setupPlaybackEvents(false);
            this.surfer.surfer.microphone.paused = false;
            this.surfer.liveMode = true;
            this.surfer.surfer.microphone.play();
            break;
          case _recordMode.VIDEO_ONLY:
          case _recordMode.AUDIO_VIDEO:
          case _recordMode.AUDIO_SCREEN:
          case _recordMode.SCREEN_ONLY:
            this.startVideoPreview();
            break;
          case _recordMode.ANIMATION:
            this.player.recordCanvas.hide();
            this.player.animationDisplay.hide();
            this.mediaElement.style.display = 'block';
            this.captureFrame().then(function (result) {
              _this5.startVideoPreview();
            });
            break;
        }
        if (this.autoMuteDevice) {
          this.muteTracks(false);
        }
        switch (this.getRecordType()) {
          case _recordMode.IMAGE_ONLY:
            this.createSnapshot();
            this.player.trigger(_event.default.START_RECORD);
            break;
          case _recordMode.VIDEO_ONLY:
          case _recordMode.AUDIO_VIDEO:
          case _recordMode.AUDIO_SCREEN:
          case _recordMode.ANIMATION:
          case _recordMode.SCREEN_ONLY:
            this.player.one(_event.default.LOADEDMETADATA, function () {
              _this5.startRecording();
            });
            break;
          default:
            this.startRecording();
        }
      }
    }
  }, {
    key: "startRecording",
    value: function startRecording() {
      this.paused = false;
      this.pauseTime = this.pausedTime = 0;
      this.startTime = performance.now();
      var COUNTDOWN_SPEED = 100;
      this.countDown = this.player.setInterval(this.onCountDown.bind(this), COUNTDOWN_SPEED);
      if (this.engine !== undefined) {
        this.engine.dispose();
      }
      this.engine.start();
      this.player.trigger(_event.default.START_RECORD);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this.isProcessing()) {
        this._recording = false;
        this._processing = true;
        if (this.getRecordType() !== _recordMode.IMAGE_ONLY) {
          this.player.trigger(_event.default.STOP_RECORD);
          this.player.clearInterval(this.countDown);
          if (this.engine) {
            this.engine.stop();
          }
          if (this.autoMuteDevice) {
            this.muteTracks(true);
          }
        } else {
          if (this.player.recordedData) {
            this.player.trigger(_event.default.FINISH_RECORD);
          }
        }
      }
    }
  }, {
    key: "stopDevice",
    value: function stopDevice() {
      if (this.isRecording()) {
        this.player.one(_event.default.FINISH_RECORD, this.stopStream.bind(this));
        this.stop();
      } else {
        this.stopStream();
      }
    }
  }, {
    key: "stopStream",
    value: function stopStream() {
      if (this.stream) {
        this._deviceActive = false;
        if (this.getRecordType() === _recordMode.AUDIO_ONLY) {
          this.surfer.surfer.microphone.stopDevice();
          return;
        }
        this.stream.getTracks().forEach(function (stream) {
          stream.stop();
        });
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      if (!this.paused) {
        this.pauseTime = performance.now();
        this.paused = true;
        this.engine.pause();
      }
    }
  }, {
    key: "resume",
    value: function resume() {
      if (this.paused) {
        this.pausedTime += performance.now() - this.pauseTime;
        this.engine.resume();
        this.paused = false;
      }
    }
  }, {
    key: "onRecordComplete",
    value: function onRecordComplete() {
      var _this6 = this;
      this.player.recordedData = this.engine.recordedData;
      if (this.player.controlBar.playToggle !== undefined) {
        this.player.controlBar.playToggle.removeClass('vjs-ended');
        this.player.controlBar.playToggle.show();
      }
      if (this.convertAuto === true) {
        this.convert();
      }
      this.player.trigger(_event.default.FINISH_RECORD);
      if (this.isDestroyed()) {
        return;
      }
      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          this.surfer.pause();
          this.surfer.setupPlaybackEvents(true);
          this.player.loadingSpinner.show();
          this.surfer.surfer.once(_event.default.READY, function () {
            _this6._processing = false;
          });
          this.load(this.player.recordedData);
          break;
        case _recordMode.VIDEO_ONLY:
        case _recordMode.AUDIO_VIDEO:
        case _recordMode.AUDIO_SCREEN:
        case _recordMode.SCREEN_ONLY:
          this.player.one(_event.default.PAUSE, function () {
            _this6._processing = false;
            _this6.player.loadingSpinner.hide();
            _this6.setDuration(_this6.streamDuration);
            _this6.on(_this6.player, _event.default.TIMEUPDATE, _this6.playbackTimeUpdate);
            _this6.on(_this6.player, _event.default.ENDED, _this6.playbackTimeUpdate);
            if (_this6.getRecordType() === _recordMode.AUDIO_VIDEO || _this6.getRecordType() === _recordMode.AUDIO_SCREEN) {
              _this6.mediaElement.muted = false;
              _this6.displayVolumeControl(true);
            }
            _this6.load(_this6.player.recordedData);
          });
          this.player.pause();
          break;
        case _recordMode.ANIMATION:
          this._processing = false;
          this.player.loadingSpinner.hide();
          this.setDuration(this.streamDuration);
          this.mediaElement.style.display = 'none';
          this.player.recordCanvas.show();
          this.player.pause();
          this.on(this.player, _event.default.PLAY, this.showAnimation);
          this.on(this.player, _event.default.PAUSE, this.hideAnimation);
          break;
      }
    }
  }, {
    key: "onCountDown",
    value: function onCountDown() {
      if (!this.paused) {
        var now = performance.now();
        var duration = this.maxLength;
        var currentTime = (now - (this.startTime + this.pausedTime)) / 1000;
        this.streamDuration = currentTime;
        if (currentTime >= duration) {
          currentTime = duration;
          this.stop();
        }
        this.setDuration(duration);
        this.setCurrentTime(currentTime, duration);
        this.player.trigger(_event.default.PROGRESS_RECORD);
      }
    }
  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      var currentTime = isNaN(this.streamCurrentTime) ? 0 : this.streamCurrentTime;
      if (this.getRecordType() === _recordMode.AUDIO_ONLY) {
        currentTime = this.surfer.getCurrentTime();
      }
      return currentTime;
    }
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
        case _recordMode.AUDIO_SCREEN:
        case _recordMode.ANIMATION:
        case _recordMode.SCREEN_ONLY:
          if (this.player.controlBar.currentTimeDisplay && this.player.controlBar.currentTimeDisplay.contentEl() && this.player.controlBar.currentTimeDisplay.contentEl().lastChild) {
            this.streamCurrentTime = Math.min(currentTime, duration);
            this.player.controlBar.currentTimeDisplay.formattedTime_ = this.player.controlBar.currentTimeDisplay.contentEl().lastChild.textContent = this._formatTime(this.streamCurrentTime, duration, this.displayMilliseconds);
          }
          break;
      }
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      var duration = isNaN(this.streamDuration) ? 0 : this.streamDuration;
      return duration;
    }
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
        case _recordMode.AUDIO_SCREEN:
        case _recordMode.ANIMATION:
        case _recordMode.SCREEN_ONLY:
          if (this.player.controlBar.durationDisplay && this.player.controlBar.durationDisplay.contentEl() && this.player.controlBar.durationDisplay.contentEl().lastChild) {
            this.player.controlBar.durationDisplay.formattedTime_ = this.player.controlBar.durationDisplay.contentEl().lastChild.textContent = this._formatTime(duration, duration, this.displayMilliseconds);
          }
          break;
      }
    }
  }, {
    key: "load",
    value: function load(url) {
      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          this.surfer.load(url);
          break;
        case _recordMode.IMAGE_ONLY:
        case _recordMode.VIDEO_ONLY:
        case _recordMode.AUDIO_VIDEO:
        case _recordMode.AUDIO_SCREEN:
        case _recordMode.ANIMATION:
        case _recordMode.SCREEN_ONLY:
          if (url instanceof Blob || url instanceof File) {
            this.mediaElement.srcObject = null;
            this.mediaElement.src = URL.createObjectURL(url);
          } else {
            (0, _browserShim.default)(url, this.mediaElement);
          }
          break;
      }
    }
  }, {
    key: "saveAs",
    value: function saveAs(name) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'record';
      if (type === 'record') {
        if (this.engine && name !== undefined) {
          this.engine.saveAs(name);
        }
      } else if (type === 'convert') {
        if (this.converter && name !== undefined) {
          this.converter.saveAs(name);
        }
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.player.off(_event.default.READY);
      this.player.off(_event.default.USERINACTIVE);
      this.player.off(_event.default.LOADEDMETADATA);
      if (this.engine) {
        this.engine.dispose();
        this.engine.destroy();
        this.engine.off(_event.default.RECORD_COMPLETE, this.engineStopCallback);
      }
      this.stop();
      this.stopDevice();
      this.removeRecording();
      this.player.clearInterval(this.countDown);
      if (this.getRecordType() === _recordMode.AUDIO_ONLY) {
        if (this.surfer) {
          this.surfer.destroy();
        }
      } else if (this.getRecordType() === _recordMode.IMAGE_ONLY) {
        if (this.mediaElement && this.streamVisibleCallback) {
          this.mediaElement.removeEventListener(_event.default.PLAYING, this.streamVisibleCallback);
        }
      }
      this.resetState();
      (0, _get2.default)((0, _getPrototypeOf2.default)(Record.prototype), "dispose", this).call(this);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.player.dispose();
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this7 = this;
      if (this.engine) {
        this.engine.dispose();
        this.engine.off(_event.default.RECORD_COMPLETE, this.engineStopCallback);
      }
      this.stop();
      this.stopDevice();
      this.player.clearInterval(this.countDown);
      this.removeRecording();
      this.loadOptions();
      this.resetState();
      this.setDuration(this.maxLength);
      this.setCurrentTime(0);
      this.player.reset();
      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          if (this.surfer && this.surfer.surfer) {
            this.surfer.surfer.empty();
          }
          break;
        case _recordMode.IMAGE_ONLY:
        case _recordMode.ANIMATION:
          this.player.recordCanvas.hide();
          this.player.cameraButton.hide();
          break;
      }
      if (this.player.controlBar.playToggle !== undefined) {
        this.player.controlBar.playToggle.hide();
      }
      this.player.deviceButton.show();
      this.player.recordToggle.hide();
      this.player.one(_event.default.LOADEDMETADATA, function () {
        _this7.setDuration(_this7.maxLength);
      });
    }
  }, {
    key: "resetState",
    value: function resetState() {
      this._recording = false;
      this._processing = false;
      this._deviceActive = false;
      this.devices = [];
    }
  }, {
    key: "removeRecording",
    value: function removeRecording() {
      if (this.mediaElement && this.mediaElement.src && this.mediaElement.src.startsWith('blob:') === true) {
        URL.revokeObjectURL(this.mediaElement.src);
        this.mediaElement.src = '';
      }
    }
  }, {
    key: "exportImage",
    value: function exportImage() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'image/png';
      var quality = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      if (this.getRecordType() === _recordMode.AUDIO_ONLY) {
        return this.surfer.surfer.exportImage(format, quality, 'blob');
      } else {
        var recordCanvas = this.player.recordCanvas.el().firstChild;
        this.drawCanvas(recordCanvas, this.mediaElement);
        return new Promise(function (resolve) {
          recordCanvas.toBlob(resolve, format, quality);
        });
      }
    }
  }, {
    key: "muteTracks",
    value: function muteTracks(mute) {
      if ((this.getRecordType() === _recordMode.AUDIO_ONLY || this.getRecordType() === _recordMode.AUDIO_SCREEN || this.getRecordType() === _recordMode.AUDIO_VIDEO) && this.stream.getAudioTracks().length > 0) {
        this.stream.getAudioTracks()[0].enabled = !mute;
      }
      if (this.getRecordType() !== _recordMode.AUDIO_ONLY && this.stream.getVideoTracks().length > 0) {
        this.stream.getVideoTracks()[0].enabled = !mute;
      }
    }
  }, {
    key: "getRecordType",
    value: function getRecordType() {
      return (0, _recordMode.getRecorderMode)(this.recordImage, this.recordAudio, this.recordVideo, this.recordAnimation, this.recordScreen);
    }
  }, {
    key: "convert",
    value: function convert() {
      if (this.converter !== undefined) {
        this.converter.convert(this.player.recordedData);
      }
    }
  }, {
    key: "createSnapshot",
    value: function createSnapshot() {
      var _this8 = this;
      this.captureFrame().then(function (result) {
        if (_this8.imageOutputType === 'blob') {
          result.toBlob(function (blob) {
            _this8.player.recordedData = blob;
            _this8.displaySnapshot();
          });
        } else if (_this8.imageOutputType === 'dataURL') {
          _this8.player.recordedData = result.toDataURL(_this8.imageOutputFormat, _this8.imageOutputQuality);
          _this8.displaySnapshot();
        }
      }, this.imageOutputFormat, this.imageOutputQuality);
    }
  }, {
    key: "displaySnapshot",
    value: function displaySnapshot() {
      this.mediaElement.style.display = 'none';
      this.player.recordCanvas.show();
      this.stop();
    }
  }, {
    key: "retrySnapshot",
    value: function retrySnapshot() {
      this._processing = false;
      this.player.recordCanvas.hide();
      this.player.el().firstChild.style.display = 'block';
    }
  }, {
    key: "captureFrame",
    value: function captureFrame() {
      var _this9 = this;
      var detected = (0, _detectBrowser.detectBrowser)();
      var recordCanvas = this.player.recordCanvas.el().firstChild;
      var track = this.stream.getVideoTracks()[0];
      var settings = track.getSettings();
      recordCanvas.width = settings.width;
      recordCanvas.height = settings.height;
      return new Promise(function (resolve, reject) {
        var cameraAspectRatio = settings.width / settings.height;
        var playerAspectRatio = _this9.player.width() / _this9.player.height();
        var imagePreviewHeight = 0;
        var imagePreviewWidth = 0;
        var imageXPosition = 0;
        var imageYPosition = 0;
        if (cameraAspectRatio >= playerAspectRatio) {
          imagePreviewHeight = settings.height * (_this9.player.width() / settings.width);
          imagePreviewWidth = _this9.player.width();
          imageYPosition = _this9.player.height() / 2 - imagePreviewHeight / 2;
        } else {
          imagePreviewHeight = _this9.player.height();
          imagePreviewWidth = settings.width * (_this9.player.height() / settings.height);
          imageXPosition = _this9.player.width() / 2 - imagePreviewWidth / 2;
        }
        if (detected.browser === 'chrome' && detected.version >= 60 && (typeof ImageCapture === "undefined" ? "undefined" : (0, _typeof2.default)(ImageCapture)) === (typeof Function === "undefined" ? "undefined" : (0, _typeof2.default)(Function))) {
          try {
            var imageCapture = new ImageCapture(track);
            imageCapture.grabFrame().then(function (imageBitmap) {
              _this9.drawCanvas(recordCanvas, imageBitmap, imagePreviewWidth, imagePreviewHeight, imageXPosition, imageYPosition);
              resolve(recordCanvas);
            }).catch(function (error) {});
          } catch (err) {}
        }
        _this9.drawCanvas(recordCanvas, _this9.mediaElement, imagePreviewWidth, imagePreviewHeight, imageXPosition, imageYPosition);
        resolve(recordCanvas);
      });
    }
  }, {
    key: "drawCanvas",
    value: function drawCanvas(canvas, element, width, height) {
      var x = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var y = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      if (width === undefined) {
        width = canvas.width;
      }
      if (height === undefined) {
        height = canvas.height;
      }
      canvas.getContext('2d').drawImage(element, x, y, width, height);
    }
  }, {
    key: "startVideoPreview",
    value: function startVideoPreview() {
      this.off(_event.default.TIMEUPDATE);
      this.off(_event.default.DURATIONCHANGE);
      this.off(_event.default.LOADEDMETADATA);
      this.off(_event.default.PLAY);
      this.mediaElement.muted = true;
      this.displayVolumeControl(false);
      this.removeRecording();
      this.load(this.stream);
      this.mediaElement.play();
    }
  }, {
    key: "showAnimation",
    value: function showAnimation() {
      var animationDisplay = this.player.animationDisplay.el().firstChild;
      animationDisplay.width = this.player.width();
      animationDisplay.height = this.player.height();
      this.player.recordCanvas.hide();
      (0, _browserShim.default)(this.player.recordedData, animationDisplay);
      this.player.animationDisplay.show();
    }
  }, {
    key: "hideAnimation",
    value: function hideAnimation() {
      this.player.recordCanvas.show();
      this.player.animationDisplay.hide();
    }
  }, {
    key: "playbackTimeUpdate",
    value: function playbackTimeUpdate() {
      this.setCurrentTime(this.player.currentTime(), this.streamDuration);
    }
  }, {
    key: "enumerateDevices",
    value: function enumerateDevices() {
      var _this10 = this;
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        this.player.enumerateErrorCode = 'enumerateDevices() not supported.';
        this.player.trigger(_event.default.ENUMERATE_ERROR);
        return;
      }
      navigator.mediaDevices.enumerateDevices(this).then(function (devices) {
        _this10.devices = [];
        devices.forEach(function (device) {
          _this10.devices.push(device);
        });
        _this10.player.trigger(_event.default.ENUMERATE_READY);
      }).catch(function (err) {
        _this10.player.enumerateErrorCode = err;
        _this10.player.trigger(_event.default.ENUMERATE_ERROR);
      });
    }
  }, {
    key: "setVideoInput",
    value: function setVideoInput(deviceId) {
      if (this.recordVideo === Object(this.recordVideo)) {
        this.recordVideo.deviceId = {
          exact: deviceId
        };
      } else if (this.recordVideo === true) {
        this.recordVideo = {
          deviceId: {
            exact: deviceId
          }
        };
      }
      this.stopDevice();
      this.getDevice();
    }
  }, {
    key: "setAudioInput",
    value: function setAudioInput(deviceId) {
      if (this.recordAudio === Object(this.recordAudio)) {
        this.recordAudio.deviceId = {
          exact: deviceId
        };
      } else if (this.recordAudio === true) {
        this.recordAudio = {
          deviceId: {
            exact: deviceId
          }
        };
      }
      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          this.surfer.surfer.microphone.constraints = {
            video: false,
            audio: this.recordAudio
          };
          break;
      }
      this.stopDevice();
      this.getDevice();
    }
  }, {
    key: "setAudioOutput",
    value: function setAudioOutput(deviceId) {
      var _this11 = this;
      var errorMessage;
      switch (this.getRecordType()) {
        case _recordMode.AUDIO_ONLY:
          this.surfer.surfer.setSinkId(deviceId).then(function (result) {
            _this11.player.trigger(_event.default.AUDIO_OUTPUT_READY);
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
                _this11.player.trigger(_event.default.AUDIO_OUTPUT_READY);
                return;
              }).catch(function (err) {
                errorMessage = err;
              });
            } else {
              errorMessage = 'Browser does not support audio output device selection.';
            }
          } else {
            errorMessage = "Invalid deviceId: ".concat(deviceId);
          }
          break;
      }
      this.player.trigger(_event.default.ERROR, errorMessage);
    }
  }, {
    key: "setFormatTime",
    value: function setFormatTime(customImplementation) {
      this._formatTime = customImplementation;
      if (_video.default.time !== undefined) {
        _video.default.time.setFormatTime(this._formatTime);
      } else {
        _video.default.setFormatTime(this._formatTime);
      }
      if (this.surfer) {
        this.surfer.setFormatTime(this._formatTime);
      }
    }
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
  }, {
    key: "onStreamVisible",
    value: function onStreamVisible(event) {
      this.mediaElement.removeEventListener(_event.default.PLAYING, this.streamVisibleCallback);
      this.player.cameraButton.onStop();
      this.player.cameraButton.show();
    }
  }, {
    key: "onEnterPiP",
    value: function onEnterPiP(event) {
      this.player.trigger(_event.default.ENTER_PIP, event);
    }
  }, {
    key: "onLeavePiP",
    value: function onLeavePiP(event) {
      this.player.trigger(_event.default.LEAVE_PIP);
    }
  }]);
}(Plugin);
Record.VERSION = "4.8.0";
_video.default.Record = Record;
if (_video.default.getPlugin('record') === undefined) {
  _video.default.registerPlugin('record', Record);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});