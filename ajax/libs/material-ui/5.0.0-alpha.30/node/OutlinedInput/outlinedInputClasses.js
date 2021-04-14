"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOutlinedInputUtilityClass = getOutlinedInputUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getOutlinedInputUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiOutlinedInput', slot);
}

const outlinedInputClasses = (0, _unstyled.generateUtilityClasses)('MuiOutlinedInput', ['root', 'notchedOutline', 'input']);
var _default = outlinedInputClasses;
exports.default = _default;