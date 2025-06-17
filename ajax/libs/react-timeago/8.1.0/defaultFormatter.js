"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var defaultFormatter = function defaultFormatter(value, _unit, suffix) {
  var unit = value !== 1 ? _unit + 's' : _unit;
  return value + ' ' + unit + ' ' + suffix;
};
var _default = exports["default"] = defaultFormatter;