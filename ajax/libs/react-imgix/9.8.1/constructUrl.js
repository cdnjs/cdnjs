"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildURLPublic = buildURLPublic;
exports.compactParamKeys = compactParamKeys;
exports.default = void 0;
exports.extractClientAndPathComponents = extractClientAndPathComponents;
var _jsCore = _interopRequireDefault(require("@imgix/js-core"));
var _extractQueryParams3 = _interopRequireDefault(require("./extractQueryParams"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/*
Copyright © 2015 by Coursera
Licensed under the Apache License 2.0, seen https://github.com/coursera/react-imgix/blob/master/LICENSE

Minor syntax modifications have been made
*/

var PACKAGE_VERSION = "9.8.1";
// @see https://www.imgix.com/docs/reference
var PARAM_EXPANSION = Object.freeze({
  // Adjustment
  brightness: "bri",
  contrast: "con",
  exposure: "exp",
  gamma: "gam",
  highlights: "high",
  hue: "hue",
  invert: "invert",
  saturation: "sat",
  shaddows: "shad",
  shadows: "shad",
  sharpness: "sharp",
  "unsharp-mask": "usm",
  "unsharp-radius": "usmrad",
  vibrance: "vib",
  // Automatic
  "auto-features": "auto",
  // Background
  "background-color": "bg",
  // Blend
  blend: "blend",
  "blend-mode": "bm",
  "blend-align": "ba",
  "blend-alpha": "balph",
  "blend-padding": "bp",
  "blend-width": "bw",
  "blend-height": "bh",
  "blend-fit": "bf",
  "blend-crop": "bc",
  "blend-size": "bs",
  "blend-x": "bx",
  "blend-y": "by",
  // Border & Padding
  border: "border",
  padding: "pad",
  // Face Detection
  "face-index": "faceindex",
  "face-padding": "facepad",
  faces: "faces",
  // Format
  "chroma-subsampling": "chromasub",
  "color-quantization": "colorquant",
  download: "dl",
  DPI: "dpi",
  format: "fm",
  "lossless-compression": "lossless",
  quality: "q",
  // Mask
  "mask-image": "mask",
  // Mask
  "noise-blur": "nr",
  "noise-sharpen": "nrs",
  // Palette n/a
  // PDF n/a
  // Pixel Density n/a

  // Rotation
  "flip-direction": "flip",
  orientation: "or",
  "rotation-angle": "rot",
  // Size
  "crop-mode": "crop",
  "fit-mode": "fit",
  "image-height": "h",
  "image-width": "w",
  // Stylize
  blurring: "blur",
  halftone: "htn",
  monotone: "mono",
  pixelate: "px",
  "sepia-tone": "sepia",
  // Trim TODO
  // Watermark TODO

  // Extra
  height: "h",
  width: "w"
});
var DEFAULT_OPTIONS = Object.freeze({
  auto: "format" // http://www.imgix.com/docs/reference/automatic#param-auto
});

/**
 * Construct a URL for an image with an Imgix proxy, expanding image options
 * per the [API reference docs](https://www.imgix.com/docs/reference).
 * @param  {String} src         src of raw image
 * @param  {Object} longImgixParams map of image API options, in long or short form per expansion rules
 * @return {String}             URL of image src transformed by Imgix
 */
function constructUrl(src, longImgixParams, srcOptions) {
  if (!src) {
    return "";
  }
  var params = compactParamKeys(longImgixParams);
  var _extractClientAndPath = extractClientAndPathComponents(src),
    client = _extractClientAndPath.client,
    pathComponents = _extractClientAndPath.pathComponents;
  return client.buildURL(pathComponents.join("/"), params, srcOptions);
}
function compactParamKeys(longImgixParams) {
  var keys = Object.keys(longImgixParams);
  var keysLength = keys.length;
  var params = {};
  for (var i = 0; i < keysLength; i++) {
    var key = keys[i];
    if (PARAM_EXPANSION[key]) {
      params[PARAM_EXPANSION[key]] = longImgixParams[key];
    } else {
      params[key] = longImgixParams[key];
    }
  }
  return params;
}
function extractClientAndPathComponents(src) {
  var _src$split = src.split("://"),
    _src$split2 = _slicedToArray(_src$split, 2),
    scheme = _src$split2[0],
    rest = _src$split2[1];
  var _rest$split = rest.split("/"),
    _rest$split2 = _toArray(_rest$split),
    domain = _rest$split2[0],
    pathComponents = _rest$split2.slice(1);
  var useHTTPS = scheme == "https";
  var client = new _jsCore.default({
    domain: domain,
    useHTTPS: useHTTPS,
    includeLibraryParam: false
  });
  return {
    client: client,
    pathComponents: pathComponents
  };
}
function buildURLPublic(src) {
  var imgixParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var disableLibraryParam = options.disableLibraryParam;
  var _extractQueryParams = (0, _extractQueryParams3.default)(src),
    _extractQueryParams2 = _slicedToArray(_extractQueryParams, 2),
    rawSrc = _extractQueryParams2[0],
    params = _extractQueryParams2[1];
  return constructUrl(rawSrc, _extends({}, params, imgixParams, disableLibraryParam ? {} : {
    ixlib: "react-".concat(PACKAGE_VERSION)
  }));
}
var _default = exports.default = constructUrl;
//# sourceMappingURL=constructUrl.js.map