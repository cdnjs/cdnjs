"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  toolbarClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Toolbar.default;
  }
});
Object.defineProperty(exports, "toolbarClasses", {
  enumerable: true,
  get: function () {
    return _toolbarClasses.default;
  }
});

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

var _toolbarClasses = _interopRequireWildcard(require("./toolbarClasses"));

Object.keys(_toolbarClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _toolbarClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _toolbarClasses[key];
    }
  });
});