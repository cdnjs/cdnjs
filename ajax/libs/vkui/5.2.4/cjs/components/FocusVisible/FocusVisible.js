"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FocusVisible = void 0;
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
/**
 * @see https://vkcom.github.io/VKUI/#/FocusVisible
 */
var FocusVisible = function FocusVisible(_ref) {
  var mode = _ref.mode;
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    className: (0, _vkjs.classNames)("vkuiFocusVisible", styles["FocusVisible--mode-".concat(mode)])
  });
};
exports.FocusVisible = FocusVisible;
var styles = {
  "FocusVisible--mode-inside": "vkuiFocusVisible--mode-inside",
  "FocusVisible--mode-outside": "vkuiFocusVisible--mode-outside"
};
//# sourceMappingURL=FocusVisible.js.map