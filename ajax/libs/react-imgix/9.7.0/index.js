"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Background", {
  enumerable: true,
  get: function get() {
    return _reactImgixBg.Background;
  }
});
Object.defineProperty(exports, "ImgixProvider", {
  enumerable: true,
  get: function get() {
    return _HOCs.ImgixProvider;
  }
});
Object.defineProperty(exports, "Picture", {
  enumerable: true,
  get: function get() {
    return _reactImgix.Picture;
  }
});
Object.defineProperty(exports, "PublicConfigAPI", {
  enumerable: true,
  get: function get() {
    return _config.PublicConfigAPI;
  }
});
Object.defineProperty(exports, "Source", {
  enumerable: true,
  get: function get() {
    return _reactImgix.Source;
  }
});
Object.defineProperty(exports, "buildURL", {
  enumerable: true,
  get: function get() {
    return _constructUrl.buildURLPublic;
  }
});
exports.default = void 0;
var _reactImgix = _interopRequireWildcard(require("./react-imgix"));
var _config = require("./config");
var _constructUrl = require("./constructUrl");
var _HOCs = require("./HOCs");
var _reactImgixBg = require("./react-imgix-bg");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _default = _reactImgix.default;
exports.default = _default;
//# sourceMappingURL=index.js.map