"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Backdrop.default;
  }
});

var _Backdrop = _interopRequireWildcard(require("./Backdrop"));

Object.keys(_Backdrop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Backdrop[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Backdrop[key];
    }
  });
});