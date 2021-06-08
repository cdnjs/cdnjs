"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  iconButtonClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _IconButton.default;
  }
});
Object.defineProperty(exports, "iconButtonClasses", {
  enumerable: true,
  get: function () {
    return _iconButtonClasses.default;
  }
});

var _IconButton = _interopRequireDefault(require("./IconButton"));

var _iconButtonClasses = _interopRequireWildcard(require("./iconButtonClasses"));

Object.keys(_iconButtonClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _iconButtonClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iconButtonClasses[key];
    }
  });
});