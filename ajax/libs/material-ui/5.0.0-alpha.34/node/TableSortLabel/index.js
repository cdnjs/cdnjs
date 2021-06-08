"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  tableSortLabelClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _TableSortLabel.default;
  }
});
Object.defineProperty(exports, "tableSortLabelClasses", {
  enumerable: true,
  get: function () {
    return _tableSortLabelClasses.default;
  }
});

var _TableSortLabel = _interopRequireDefault(require("./TableSortLabel"));

var _tableSortLabelClasses = _interopRequireWildcard(require("./tableSortLabelClasses"));

Object.keys(_tableSortLabelClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tableSortLabelClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tableSortLabelClasses[key];
    }
  });
});