"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  paginationClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Pagination.default;
  }
});
Object.defineProperty(exports, "paginationClasses", {
  enumerable: true,
  get: function () {
    return _paginationClasses.default;
  }
});

var _Pagination = _interopRequireDefault(require("./Pagination"));

var _paginationClasses = _interopRequireWildcard(require("./paginationClasses"));

Object.keys(_paginationClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _paginationClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _paginationClasses[key];
    }
  });
});