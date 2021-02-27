"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  alertClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Alert.default;
  }
});
Object.defineProperty(exports, "alertClasses", {
  enumerable: true,
  get: function () {
    return _alertClasses.default;
  }
});

var _Alert = _interopRequireDefault(require("./Alert"));

var _alertClasses = _interopRequireWildcard(require("./alertClasses"));

Object.keys(_alertClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _alertClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _alertClasses[key];
    }
  });
});