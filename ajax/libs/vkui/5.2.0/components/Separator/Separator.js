import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["wide", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */
export var Separator = function Separator(_ref) {
  var wide = _ref.wide,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    "aria-hidden": true,
    className: classNames("vkuiSeparator", !wide && "vkuiSeparator--padded", className),
    role: "separator"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiSeparator__in"
  }));
};
//# sourceMappingURL=Separator.js.map