import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Footnote } from '../Typography/Footnote/Footnote';
/**
 * @see https://vkcom.github.io/VKUI/#/Footer
 */
export var Footer = function Footer(_ref) {
  var children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Footnote, _extends({
    Component: "footer"
  }, restProps, {
    className: classNames("vkuiFooter", className)
  }), children);
};
//# sourceMappingURL=Footer.js.map