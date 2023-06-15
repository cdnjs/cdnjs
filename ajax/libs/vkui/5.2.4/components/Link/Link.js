import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["hasVisited", "children", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../Tappable/Tappable';
/**
 * @see https://vkcom.github.io/VKUI/#/Link
 */
export var Link = function Link(_ref) {
  var hasVisited = _ref.hasVisited,
    children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Tappable, _extends({
    Component: restProps.href ? 'a' : 'button'
  }, restProps, {
    className: classNames("vkuiLink", hasVisited && "vkuiLink--has-visited", className),
    hasHover: false,
    activeMode: "opacity",
    focusVisibleMode: "vkuiLink--focus-visible"
  }), children);
};
//# sourceMappingURL=Link.js.map