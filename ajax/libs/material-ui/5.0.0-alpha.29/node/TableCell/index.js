"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  tableCellClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _TableCell.default;
  }
});
Object.defineProperty(exports, "tableCellClasses", {
  enumerable: true,
  get: function () {
    return _tableCellClasses.default;
  }
});

var _TableCell = _interopRequireDefault(require("./TableCell"));

var _tableCellClasses = _interopRequireWildcard(require("./tableCellClasses"));

Object.keys(_tableCellClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tableCellClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tableCellClasses[key];
    }
  });
});