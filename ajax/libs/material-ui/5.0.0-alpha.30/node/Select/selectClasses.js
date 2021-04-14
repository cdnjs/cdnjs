"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectUtilitiyClasses = getSelectUtilitiyClasses;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getSelectUtilitiyClasses(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiSelect', slot);
}

const selectClasses = (0, _unstyled.generateUtilityClasses)('MuiSelect', ['root', 'select', 'filled', 'outlined', 'selectMenu', 'disabled', 'icon', 'iconOpen', 'iconFilled', 'iconOutlined', 'nativeInput']);
var _default = selectClasses;
exports.default = _default;