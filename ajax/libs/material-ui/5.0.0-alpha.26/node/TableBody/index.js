"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  tableBodyClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _TableBody.default;
  }
});
Object.defineProperty(exports, "tableBodyClasses", {
  enumerable: true,
  get: function () {
    return _tableBodyClasses.default;
  }
});

var _TableBody = _interopRequireDefault(require("./TableBody"));

var _tableBodyClasses = _interopRequireWildcard(require("./tableBodyClasses"));

Object.keys(_tableBodyClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tableBodyClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tableBodyClasses[key];
    }
  });
});