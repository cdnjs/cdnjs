"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  speedDialIconClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _SpeedDialIcon.default;
  }
});
Object.defineProperty(exports, "speedDialIconClasses", {
  enumerable: true,
  get: function () {
    return _speedDialIconClasses.default;
  }
});

var _SpeedDialIcon = _interopRequireDefault(require("./SpeedDialIcon"));

var _speedDialIconClasses = _interopRequireWildcard(require("./speedDialIconClasses"));

Object.keys(_speedDialIconClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _speedDialIconClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _speedDialIconClasses[key];
    }
  });
});