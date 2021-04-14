"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNativeSelectUtilitiyClasses = getNativeSelectUtilitiyClasses;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getNativeSelectUtilitiyClasses(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiNativeSelect', slot);
}

const nativeSelectClasses = (0, _unstyled.generateUtilityClasses)('MuiNativeSelect', ['root', 'select', 'filled', 'outlined', 'selectMenu', 'disabled', 'icon', 'iconOpen', 'iconFilled', 'iconOutlined', 'nativeInput']);
var _default = nativeSelectClasses;
exports.default = _default;