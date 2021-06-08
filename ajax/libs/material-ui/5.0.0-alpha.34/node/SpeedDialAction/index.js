"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  speedDialActionClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _SpeedDialAction.default;
  }
});
Object.defineProperty(exports, "speedDialActionClasses", {
  enumerable: true,
  get: function () {
    return _speedDialActionClasses.default;
  }
});

var _SpeedDialAction = _interopRequireDefault(require("./SpeedDialAction"));

var _speedDialActionClasses = _interopRequireWildcard(require("./speedDialActionClasses"));

Object.keys(_speedDialActionClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _speedDialActionClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _speedDialActionClasses[key];
    }
  });
});