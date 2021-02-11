"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBackdropUtilityClass = getBackdropUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getBackdropUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiBackdrop', slot);
}

const backdropClasses = (0, _unstyled.generateUtilityClasses)('MuiBackdrop', ['root', 'invisible']);
var _default = backdropClasses;
exports.default = _default;