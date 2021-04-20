"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  tabClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Tab.default;
  }
});
Object.defineProperty(exports, "tabClasses", {
  enumerable: true,
  get: function () {
    return _tabClasses.default;
  }
});

var _Tab = _interopRequireDefault(require("./Tab"));

var _tabClasses = _interopRequireWildcard(require("./tabClasses"));

Object.keys(_tabClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tabClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tabClasses[key];
    }
  });
});