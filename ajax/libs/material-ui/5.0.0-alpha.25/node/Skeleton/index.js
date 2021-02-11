"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  skeletonClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Skeleton.default;
  }
});
Object.defineProperty(exports, "skeletonClasses", {
  enumerable: true,
  get: function () {
    return _skeletonClasses.default;
  }
});

var _Skeleton = _interopRequireDefault(require("./Skeleton"));

var _skeletonClasses = _interopRequireWildcard(require("./skeletonClasses"));

Object.keys(_skeletonClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _skeletonClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _skeletonClasses[key];
    }
  });
});