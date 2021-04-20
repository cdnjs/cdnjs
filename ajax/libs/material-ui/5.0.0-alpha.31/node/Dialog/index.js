"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  dialogClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Dialog.default;
  }
});
Object.defineProperty(exports, "dialogClasses", {
  enumerable: true,
  get: function () {
    return _dialogClasses.default;
  }
});

var _Dialog = _interopRequireDefault(require("./Dialog"));

var _dialogClasses = _interopRequireWildcard(require("./dialogClasses"));

Object.keys(_dialogClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _dialogClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dialogClasses[key];
    }
  });
});