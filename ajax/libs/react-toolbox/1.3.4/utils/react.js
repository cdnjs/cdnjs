"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isComponentOfType = isComponentOfType;
function isComponentOfType(classType, reactElement) {
  return reactElement && reactElement.type === classType;
}