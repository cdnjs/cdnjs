"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  dividerClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Divider.default;
  }
});
Object.defineProperty(exports, "dividerClasses", {
  enumerable: true,
  get: function () {
    return _dividerClasses.default;
  }
});

var _Divider = _interopRequireDefault(require("./Divider"));

var _dividerClasses = _interopRequireWildcard(require("./dividerClasses"));

Object.keys(_dividerClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _dividerClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dividerClasses[key];
    }
  });
});