import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "direction", "onClick", "className"];
import * as React from 'react';
import { Icon24Chevron, Icon24ChevronCompactLeft, Icon16Chevron, Icon16ChevronLeft } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../Tappable/Tappable';
import "./HorizontalScrollArrow.module.css";
export var HorizontalScrollArrow = function HorizontalScrollArrow(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'l' : _ref$size,
    direction = _ref.direction,
    onClick = _ref.onClick,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var ArrowIcon;
  if (size === 'm') {
    ArrowIcon = direction === 'left' ? Icon16ChevronLeft : Icon16Chevron;
  } else {
    ArrowIcon = direction === 'left' ? Icon24ChevronCompactLeft : Icon24Chevron;
  }
  return /*#__PURE__*/React.createElement(Tappable, _extends({}, restProps, {
    Component: "button",
    hasHover: false,
    hasActive: false,
    className: classNames("vkuiHorizontalScrollArrow", styles["HorizontalScrollArrow--size-".concat(size)], styles["HorizontalScrollArrow--direction-".concat(direction)], className),
    onClick: onClick
  }), /*#__PURE__*/React.createElement("span", {
    className: "vkuiHorizontalScrollArrow__icon"
  }, /*#__PURE__*/React.createElement(ArrowIcon, null)));
};
var styles = {
  "HorizontalScrollArrow--size-m": "vkuiHorizontalScrollArrow--size-m",
  "HorizontalScrollArrow--size-l": "vkuiHorizontalScrollArrow--size-l",
  "HorizontalScrollArrow--direction-left": "vkuiHorizontalScrollArrow--direction-left",
  "HorizontalScrollArrow--direction-right": "vkuiHorizontalScrollArrow--direction-right"
};
//# sourceMappingURL=HorizontalScrollArrow.js.map