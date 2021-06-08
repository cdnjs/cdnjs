"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  popoverClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Popover.default;
  }
});
Object.defineProperty(exports, "popoverClasses", {
  enumerable: true,
  get: function () {
    return _popoverClasses.default;
  }
});

var _Popover = _interopRequireDefault(require("./Popover"));

var _popoverClasses = _interopRequireWildcard(require("./popoverClasses"));

Object.keys(_popoverClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _popoverClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _popoverClasses[key];
    }
  });
});