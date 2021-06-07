"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  tableHeadClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _TableHead.default;
  }
});
Object.defineProperty(exports, "tableHeadClasses", {
  enumerable: true,
  get: function () {
    return _tableHeadClasses.default;
  }
});

var _TableHead = _interopRequireDefault(require("./TableHead"));

var _tableHeadClasses = _interopRequireWildcard(require("./tableHeadClasses"));

Object.keys(_tableHeadClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tableHeadClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tableHeadClasses[key];
    }
  });
});