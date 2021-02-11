"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  svgIconClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _SvgIcon.default;
  }
});
Object.defineProperty(exports, "svgIconClasses", {
  enumerable: true,
  get: function () {
    return _svgIconClasses.default;
  }
});

var _SvgIcon = _interopRequireDefault(require("./SvgIcon"));

var _svgIconClasses = _interopRequireWildcard(require("./svgIconClasses"));

Object.keys(_svgIconClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _svgIconClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _svgIconClasses[key];
    }
  });
});