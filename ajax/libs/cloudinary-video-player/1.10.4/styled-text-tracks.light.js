"use strict";
(self["webpackChunkcloudinary_video_player"] = self["webpackChunkcloudinary_video_player"] || []).push([["styled-text-tracks"],{

/***/ "./plugins/styled-text-tracks/styled-text-tracks.js":
/*!**********************************************************!*\
  !*** ./plugins/styled-text-tracks/styled-text-tracks.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var utils_fontFace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/fontFace */ "./utils/fontFace.js");
/* harmony import */ var utils_css_prefix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/css-prefix */ "./utils/css-prefix.js");
/* harmony import */ var _styled_text_tracks_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styled-text-tracks.scss */ "./plugins/styled-text-tracks/styled-text-tracks.scss");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var styledTextTracks = function styledTextTracks(config, player) {
  var options = {
    theme: config.theme || 'default',
    fontFace: config.fontFace,
    fontSize: config.fontSize,
    gravity: config.gravity || 'bottom',
    box: config.box,
    style: config.style
  };

  // Class Names - Theme/Gravity
  var classNames = player.textTrackDisplay.el().classList;
  classNames.forEach(function (className) {
    // Remove previously added theme/gravity classes
    if (className.startsWith('cld-styled-text-tracks')) {
      classNames.remove(className);
    }
  });
  classNames.add('cld-styled-text-tracks');
  classNames.add("cld-styled-text-tracks-theme-".concat(options.theme));
  options.gravity.split('-').forEach(function (gravity) {
    classNames.add("cld-styled-text-tracks-gravity-".concat(gravity));
  });

  // Font
  if (options.fontFace) {
    (0,utils_fontFace__WEBPACK_IMPORTED_MODULE_0__.fontFace)(player.textTrackDisplay.el(), options.fontFace);
  }
  var applyImportantStyle = function applyImportantStyle(style, selector) {
    var styleEl = document.createElement('style');
    if (Object.entries(style)) {
      var css = Object.entries(style).reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        return acc + "".concat(key, ": ").concat(value, " !important; ");
      }, '');
      styleEl.innerHTML = "\n      .".concat((0,utils_css_prefix__WEBPACK_IMPORTED_MODULE_1__.playerClassPrefix)(player), " ").concat(selector, " {\n          ").concat(css, "\n        }\n      ");
      player.el_.appendChild(styleEl);
    }
  };

  // Custom bounding box
  if (options.box) {
    var _options$box = options.box,
      x = _options$box.x,
      y = _options$box.y,
      width = _options$box.width,
      height = _options$box.height;
    applyImportantStyle(_objectSpread(_objectSpread({
      translate: "".concat(x ? x : 0, " ").concat(y ? y : 0)
    }, width ? {
      width: width
    } : undefined), height ? {
      height: height
    } : undefined), '.vjs-text-track-display.cld-styled-text-tracks');
  }

  // Custom font-size
  if (options.fontSize) {
    applyImportantStyle({
      'font-size': options.fontSize
    }, '.vjs-text-track-display.cld-styled-text-tracks .vjs-text-track-cue > div');
  }

  // Custom styles
  if (options.style) {
    applyImportantStyle(options.style, '.vjs-text-track-display.cld-styled-text-tracks .vjs-text-track-cue > div');
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styledTextTracks);

/***/ }),

/***/ "./plugins/styled-text-tracks/styled-text-tracks.scss":
/*!************************************************************!*\
  !*** ./plugins/styled-text-tracks/styled-text-tracks.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=styled-text-tracks.light.js.map