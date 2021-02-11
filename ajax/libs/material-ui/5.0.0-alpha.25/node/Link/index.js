"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  linkClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Link.default;
  }
});
Object.defineProperty(exports, "linkClasses", {
  enumerable: true,
  get: function () {
    return _linkClasses.default;
  }
});

var _Link = _interopRequireDefault(require("./Link"));

var _linkClasses = _interopRequireWildcard(require("./linkClasses"));

Object.keys(_linkClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _linkClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _linkClasses[key];
    }
  });
});