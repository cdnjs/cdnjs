"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  dialogContentTextClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _DialogContentText.default;
  }
});
Object.defineProperty(exports, "dialogContentTextClasses", {
  enumerable: true,
  get: function () {
    return _dialogContentTextClasses.default;
  }
});

var _DialogContentText = _interopRequireDefault(require("./DialogContentText"));

var _dialogContentTextClasses = _interopRequireWildcard(require("./dialogContentTextClasses"));

Object.keys(_dialogContentTextClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _dialogContentTextClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dialogContentTextClasses[key];
    }
  });
});