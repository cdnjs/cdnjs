"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  tabsClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Tabs.default;
  }
});
Object.defineProperty(exports, "tabsClasses", {
  enumerable: true,
  get: function () {
    return _tabsClasses.default;
  }
});

var _Tabs = _interopRequireDefault(require("./Tabs"));

var _tabsClasses = _interopRequireWildcard(require("./tabsClasses"));

Object.keys(_tabsClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tabsClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tabsClasses[key];
    }
  });
});