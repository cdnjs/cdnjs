import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children", "to", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
/**
 * @see https://vkcom.github.io/VKUI/#/Gradient
 */
export var Gradient = function Gradient(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'tint' : _ref$mode,
    children = _ref.children,
    _ref$to = _ref.to,
    to = _ref$to === void 0 ? 'top' : _ref$to,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "presentation"
  }, restProps, {
    className: classNames("vkuiGradient", styles["Gradient--mode-".concat(mode)], styles["Gradient--to-".concat(to)], className)
  }), children);
};
var styles = {
  "Gradient--mode-tint": "vkuiGradient--mode-tint",
  "Gradient--mode-white": "vkuiGradient--mode-white",
  "Gradient--mode-black": "vkuiGradient--mode-black",
  "Gradient--to-top": "vkuiGradient--to-top",
  "Gradient--to-bottom": "vkuiGradient--to-bottom"
};
//# sourceMappingURL=Gradient.js.map