"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  formControlLabelClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _FormControlLabel.default;
  }
});
Object.defineProperty(exports, "formControlLabelClasses", {
  enumerable: true,
  get: function () {
    return _formControlLabelClasses.default;
  }
});

var _FormControlLabel = _interopRequireDefault(require("./FormControlLabel"));

var _formControlLabelClasses = _interopRequireWildcard(require("./formControlLabelClasses"));

Object.keys(_formControlLabelClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _formControlLabelClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formControlLabelClasses[key];
    }
  });
});