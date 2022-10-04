"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Picture", {
  enumerable: true,
  get: function get() {
    return _reactImgix.Picture;
  }
});
Object.defineProperty(exports, "Source", {
  enumerable: true,
  get: function get() {
    return _reactImgix.Source;
  }
});
Object.defineProperty(exports, "PublicConfigAPI", {
  enumerable: true,
  get: function get() {
    return _config.PublicConfigAPI;
  }
});
Object.defineProperty(exports, "buildURL", {
  enumerable: true,
  get: function get() {
    return _constructUrl.buildURLPublic;
  }
});
Object.defineProperty(exports, "ImgixProvider", {
  enumerable: true,
  get: function get() {
    return _HOCs.ImgixProvider;
  }
});
Object.defineProperty(exports, "Background", {
  enumerable: true,
  get: function get() {
    return _reactImgixBg.Background;
  }
});
exports.default = void 0;

var _reactImgix = _interopRequireWildcard(require("./react-imgix"));

var _config = require("./config");

var _constructUrl = require("./constructUrl");

var _HOCs = require("./HOCs");

var _reactImgixBg = require("./react-imgix-bg");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = _reactImgix.default;
exports.default = _default;
//# sourceMappingURL=index.js.map