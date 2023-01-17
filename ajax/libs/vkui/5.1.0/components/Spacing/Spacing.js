import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "style", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */
export var Spacing = function Spacing(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 8 : _ref$size,
    styleProp = _ref.style,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var style = _objectSpread({
    height: size
  }, styleProp);
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    "aria-hidden": true,
    className: classNames(className, "vkuiSpacing"),
    style: style
  }));
};
//# sourceMappingURL=Spacing.js.map