"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  tableClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Table.default;
  }
});
Object.defineProperty(exports, "tableClasses", {
  enumerable: true,
  get: function () {
    return _tableClasses.default;
  }
});

var _Table = _interopRequireDefault(require("./Table"));

var _tableClasses = _interopRequireWildcard(require("./tableClasses"));

Object.keys(_tableClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tableClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tableClasses[key];
    }
  });
});