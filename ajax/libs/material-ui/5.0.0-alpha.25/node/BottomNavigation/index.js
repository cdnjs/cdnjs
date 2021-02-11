"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  bottomNavigationClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _BottomNavigation.default;
  }
});
Object.defineProperty(exports, "bottomNavigationClasses", {
  enumerable: true,
  get: function () {
    return _bottomNavigationClasses.default;
  }
});

var _BottomNavigation = _interopRequireDefault(require("./BottomNavigation"));

var _bottomNavigationClasses = _interopRequireWildcard(require("./bottomNavigationClasses"));

Object.keys(_bottomNavigationClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _bottomNavigationClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bottomNavigationClasses[key];
    }
  });
});