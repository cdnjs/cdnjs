"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  circularProgressClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _CircularProgress.default;
  }
});
Object.defineProperty(exports, "circularProgressClasses", {
  enumerable: true,
  get: function () {
    return _circularProgressClasses.default;
  }
});

var _CircularProgress = _interopRequireDefault(require("./CircularProgress"));

var _circularProgressClasses = _interopRequireWildcard(require("./circularProgressClasses"));

Object.keys(_circularProgressClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _circularProgressClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _circularProgressClasses[key];
    }
  });
});