"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  cardActionAreaClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _CardActionArea.default;
  }
});
Object.defineProperty(exports, "cardActionAreaClasses", {
  enumerable: true,
  get: function () {
    return _cardActionAreaClasses.default;
  }
});

var _CardActionArea = _interopRequireDefault(require("./CardActionArea"));

var _cardActionAreaClasses = _interopRequireWildcard(require("./cardActionAreaClasses"));

Object.keys(_cardActionAreaClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _cardActionAreaClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cardActionAreaClasses[key];
    }
  });
});