"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  alertTitleClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _AlertTitle.default;
  }
});
Object.defineProperty(exports, "alertTitleClasses", {
  enumerable: true,
  get: function () {
    return _alertTitleClasses.default;
  }
});

var _AlertTitle = _interopRequireDefault(require("./AlertTitle"));

var _alertTitleClasses = _interopRequireWildcard(require("./alertTitleClasses"));

Object.keys(_alertTitleClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _alertTitleClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _alertTitleClasses[key];
    }
  });
});