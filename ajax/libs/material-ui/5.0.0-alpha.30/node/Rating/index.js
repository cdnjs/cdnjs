"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ratingClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Rating.default;
  }
});
Object.defineProperty(exports, "ratingClasses", {
  enumerable: true,
  get: function () {
    return _ratingClasses.default;
  }
});

var _Rating = _interopRequireDefault(require("./Rating"));

var _ratingClasses = _interopRequireWildcard(require("./ratingClasses"));

Object.keys(_ratingClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ratingClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ratingClasses[key];
    }
  });
});