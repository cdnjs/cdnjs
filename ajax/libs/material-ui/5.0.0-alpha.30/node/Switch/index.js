"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  switchClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Switch.default;
  }
});
Object.defineProperty(exports, "switchClasses", {
  enumerable: true,
  get: function () {
    return _switchClasses.default;
  }
});

var _Switch = _interopRequireDefault(require("./Switch"));

var _switchClasses = _interopRequireWildcard(require("./switchClasses"));

Object.keys(_switchClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _switchClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _switchClasses[key];
    }
  });
});