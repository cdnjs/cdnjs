"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  checkboxClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Checkbox.default;
  }
});
Object.defineProperty(exports, "checkboxClasses", {
  enumerable: true,
  get: function () {
    return _checkboxClasses.default;
  }
});

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _checkboxClasses = _interopRequireWildcard(require("./checkboxClasses"));

Object.keys(_checkboxClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _checkboxClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _checkboxClasses[key];
    }
  });
});