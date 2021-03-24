"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  tableFooterClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _TableFooter.default;
  }
});
Object.defineProperty(exports, "tableFooterClasses", {
  enumerable: true,
  get: function () {
    return _tableFooterClasses.default;
  }
});

var _TableFooter = _interopRequireDefault(require("./TableFooter"));

var _tableFooterClasses = _interopRequireWildcard(require("./tableFooterClasses"));

Object.keys(_tableFooterClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tableFooterClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tableFooterClasses[key];
    }
  });
});