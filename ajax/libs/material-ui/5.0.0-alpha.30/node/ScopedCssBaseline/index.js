"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  scopedCssBaselineClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _ScopedCssBaseline.default;
  }
});
Object.defineProperty(exports, "scopedCssBaselineClasses", {
  enumerable: true,
  get: function () {
    return _scopedCssBaselineClasses.default;
  }
});

var _ScopedCssBaseline = _interopRequireDefault(require("./ScopedCssBaseline"));

var _scopedCssBaselineClasses = _interopRequireWildcard(require("./scopedCssBaselineClasses"));

Object.keys(_scopedCssBaselineClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _scopedCssBaselineClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _scopedCssBaselineClasses[key];
    }
  });
});