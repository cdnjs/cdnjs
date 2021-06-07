"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  stepLabelClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _StepLabel.default;
  }
});
Object.defineProperty(exports, "stepLabelClasses", {
  enumerable: true,
  get: function () {
    return _stepLabelClasses.default;
  }
});

var _StepLabel = _interopRequireDefault(require("./StepLabel"));

var _stepLabelClasses = _interopRequireWildcard(require("./stepLabelClasses"));

Object.keys(_stepLabelClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _stepLabelClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _stepLabelClasses[key];
    }
  });
});