"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  snackbarContentClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _SnackbarContent.default;
  }
});
Object.defineProperty(exports, "snackbarContentClasses", {
  enumerable: true,
  get: function () {
    return _snackbarContentClasses.default;
  }
});

var _SnackbarContent = _interopRequireDefault(require("./SnackbarContent"));

var _snackbarContentClasses = _interopRequireWildcard(require("./snackbarContentClasses"));

Object.keys(_snackbarContentClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _snackbarContentClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _snackbarContentClasses[key];
    }
  });
});