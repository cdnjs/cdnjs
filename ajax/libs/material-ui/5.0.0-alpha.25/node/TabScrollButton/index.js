"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  tabScrollButtonClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _TabScrollButton.default;
  }
});
Object.defineProperty(exports, "tabScrollButtonClasses", {
  enumerable: true,
  get: function () {
    return _tabScrollButtonClasses.default;
  }
});

var _TabScrollButton = _interopRequireDefault(require("./TabScrollButton"));

var _tabScrollButtonClasses = _interopRequireWildcard(require("./tabScrollButtonClasses"));

Object.keys(_tabScrollButtonClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tabScrollButtonClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tabScrollButtonClasses[key];
    }
  });
});