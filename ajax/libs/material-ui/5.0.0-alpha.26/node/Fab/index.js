"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  fabClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Fab.default;
  }
});
Object.defineProperty(exports, "fabClasses", {
  enumerable: true,
  get: function () {
    return _fabClasses.default;
  }
});

var _Fab = _interopRequireDefault(require("./Fab"));

var _fabClasses = _interopRequireWildcard(require("./fabClasses"));

Object.keys(_fabClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _fabClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fabClasses[key];
    }
  });
});