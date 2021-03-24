"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  speedDialClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _SpeedDial.default;
  }
});
Object.defineProperty(exports, "speedDialClasses", {
  enumerable: true,
  get: function () {
    return _speedDialClasses.default;
  }
});

var _SpeedDial = _interopRequireDefault(require("./SpeedDial"));

var _speedDialClasses = _interopRequireWildcard(require("./speedDialClasses"));

Object.keys(_speedDialClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _speedDialClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _speedDialClasses[key];
    }
  });
});