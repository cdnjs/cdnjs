"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  dialogContentClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _DialogContent.default;
  }
});
Object.defineProperty(exports, "dialogContentClasses", {
  enumerable: true,
  get: function () {
    return _dialogContentClasses.default;
  }
});

var _DialogContent = _interopRequireDefault(require("./DialogContent"));

var _dialogContentClasses = _interopRequireWildcard(require("./dialogContentClasses"));

Object.keys(_dialogContentClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _dialogContentClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dialogContentClasses[key];
    }
  });
});