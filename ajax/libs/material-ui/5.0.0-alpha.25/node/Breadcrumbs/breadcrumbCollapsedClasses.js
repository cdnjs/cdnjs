"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBreadcrumbCollapsedUtilityClass = getBreadcrumbCollapsedUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getBreadcrumbCollapsedUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('PrivateBreadcrumbCollapsed', slot);
}

const breadcrumbCollapsedClasses = (0, _unstyled.generateUtilityClasses)('PrivateBreadcrumbCollapsed', ['button', 'icon']);
var _default = breadcrumbCollapsedClasses;
exports.default = _default;