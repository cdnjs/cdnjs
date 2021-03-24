"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  paginationItemClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _PaginationItem.default;
  }
});
Object.defineProperty(exports, "paginationItemClasses", {
  enumerable: true,
  get: function () {
    return _paginationItemClasses.default;
  }
});

var _PaginationItem = _interopRequireDefault(require("./PaginationItem"));

var _paginationItemClasses = _interopRequireWildcard(require("./paginationItemClasses"));

Object.keys(_paginationItemClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _paginationItemClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _paginationItemClasses[key];
    }
  });
});