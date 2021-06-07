"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  tooltipClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Tooltip.default;
  }
});
Object.defineProperty(exports, "tooltipClasses", {
  enumerable: true,
  get: function () {
    return _tooltipClasses.default;
  }
});

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var _tooltipClasses = _interopRequireWildcard(require("./tooltipClasses"));

Object.keys(_tooltipClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tooltipClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tooltipClasses[key];
    }
  });
});