"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  formGroupClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _FormGroup.default;
  }
});
Object.defineProperty(exports, "formGroupClasses", {
  enumerable: true,
  get: function () {
    return _formGroupClasses.default;
  }
});

var _FormGroup = _interopRequireDefault(require("./FormGroup"));

var _formGroupClasses = _interopRequireWildcard(require("./formGroupClasses"));

Object.keys(_formGroupClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _formGroupClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formGroupClasses[key];
    }
  });
});