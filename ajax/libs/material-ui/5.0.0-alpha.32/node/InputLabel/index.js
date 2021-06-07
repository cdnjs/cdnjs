"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  inputLabelClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _InputLabel.default;
  }
});
Object.defineProperty(exports, "inputLabelClasses", {
  enumerable: true,
  get: function () {
    return _inputLabelClasses.default;
  }
});

var _InputLabel = _interopRequireDefault(require("./InputLabel"));

var _inputLabelClasses = _interopRequireWildcard(require("./inputLabelClasses"));

Object.keys(_inputLabelClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _inputLabelClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _inputLabelClasses[key];
    }
  });
});