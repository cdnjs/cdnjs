"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  formHelperTextClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _FormHelperText.default;
  }
});
Object.defineProperty(exports, "formHelperTextClasses", {
  enumerable: true,
  get: function () {
    return _formHelperTextClasses.default;
  }
});

var _FormHelperText = _interopRequireDefault(require("./FormHelperText"));

var _formHelperTextClasses = _interopRequireWildcard(require("./formHelperTextClasses"));

Object.keys(_formHelperTextClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _formHelperTextClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formHelperTextClasses[key];
    }
  });
});