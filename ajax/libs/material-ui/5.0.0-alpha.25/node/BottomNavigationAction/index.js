"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  bottomNavigationActionClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _BottomNavigationAction.default;
  }
});
Object.defineProperty(exports, "bottomNavigationActionClasses", {
  enumerable: true,
  get: function () {
    return _bottomNavigationActionClasses.default;
  }
});

var _BottomNavigationAction = _interopRequireDefault(require("./BottomNavigationAction"));

var _bottomNavigationActionClasses = _interopRequireWildcard(require("./bottomNavigationActionClasses"));

Object.keys(_bottomNavigationActionClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _bottomNavigationActionClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bottomNavigationActionClasses[key];
    }
  });
});