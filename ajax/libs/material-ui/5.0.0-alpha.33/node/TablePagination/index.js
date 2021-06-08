"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  tablePaginationClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _TablePagination.default;
  }
});
Object.defineProperty(exports, "tablePaginationClasses", {
  enumerable: true,
  get: function () {
    return _tablePaginationClasses.default;
  }
});

var _TablePagination = _interopRequireDefault(require("./TablePagination"));

var _tablePaginationClasses = _interopRequireWildcard(require("./tablePaginationClasses"));

Object.keys(_tablePaginationClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tablePaginationClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tablePaginationClasses[key];
    }
  });
});