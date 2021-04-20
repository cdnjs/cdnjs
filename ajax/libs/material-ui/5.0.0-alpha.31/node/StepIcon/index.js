"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  stepIconClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _StepIcon.default;
  }
});
Object.defineProperty(exports, "stepIconClasses", {
  enumerable: true,
  get: function () {
    return _stepIconClasses.default;
  }
});

var _StepIcon = _interopRequireDefault(require("./StepIcon"));

var _stepIconClasses = _interopRequireWildcard(require("./stepIconClasses"));

Object.keys(_stepIconClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _stepIconClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _stepIconClasses[key];
    }
  });
});