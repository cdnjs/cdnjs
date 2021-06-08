"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  typographyClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Typography.default;
  }
});
Object.defineProperty(exports, "typographyClasses", {
  enumerable: true,
  get: function () {
    return _typographyClasses.default;
  }
});

var _Typography = _interopRequireDefault(require("./Typography"));

var _typographyClasses = _interopRequireWildcard(require("./typographyClasses"));

Object.keys(_typographyClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _typographyClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _typographyClasses[key];
    }
  });
});