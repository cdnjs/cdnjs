"use strict";
'use client';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var _default = exports.default = _reactImgix.default;
//# sourceMappingURL=index.js.map