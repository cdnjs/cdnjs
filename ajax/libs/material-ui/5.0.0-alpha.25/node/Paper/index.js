"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  paperClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Paper.default;
  }
});
Object.defineProperty(exports, "paperClasses", {
  enumerable: true,
  get: function () {
    return _paperClasses.default;
  }
});

var _Paper = _interopRequireDefault(require("./Paper"));

var _paperClasses = _interopRequireWildcard(require("./paperClasses"));

Object.keys(_paperClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _paperClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _paperClasses[key];
    }
  });
});