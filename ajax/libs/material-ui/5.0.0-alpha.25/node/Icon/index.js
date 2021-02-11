"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  iconClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Icon.default;
  }
});
Object.defineProperty(exports, "iconClasses", {
  enumerable: true,
  get: function () {
    return _iconClasses.default;
  }
});

var _Icon = _interopRequireDefault(require("./Icon"));

var _iconClasses = _interopRequireWildcard(require("./iconClasses"));

Object.keys(_iconClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _iconClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iconClasses[key];
    }
  });
});