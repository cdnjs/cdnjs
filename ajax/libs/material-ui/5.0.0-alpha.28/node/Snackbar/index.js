"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  snackbarClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Snackbar.default;
  }
});
Object.defineProperty(exports, "snackbarClasses", {
  enumerable: true,
  get: function () {
    return _snackbarClasses.default;
  }
});

var _Snackbar = _interopRequireDefault(require("./Snackbar"));

var _snackbarClasses = _interopRequireWildcard(require("./snackbarClasses"));

Object.keys(_snackbarClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _snackbarClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _snackbarClasses[key];
    }
  });
});