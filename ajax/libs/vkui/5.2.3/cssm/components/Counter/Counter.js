import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "size", "children", "className"];
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Caption } from '../Typography/Caption/Caption';
import { Headline } from '../Typography/Headline/Headline';
import "./Counter.module.css";
var modeClassNames = {
  secondary: "vkuiCounter--mode-secondary",
  primary: "vkuiCounter--mode-primary",
  prominent: "vkuiCounter--mode-prominent",
  contrast: "vkuiCounter--mode-contrast",
  inherit: "vkuiCounter--mode-inherit"
};
var sizeClassNames = {
  s: "vkuiCounter--size-s",
  m: "vkuiCounter--size-m"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Counter
 */
export var Counter = function Counter(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'inherit' : _ref$mode,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'm' : _ref$size,
    children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  if (React.Children.count(children) === 0) {
    return null;
  }
  var CounterTypography = size === 's' ? Caption : Headline;
  var counterLevel = size === 's' ? '1' : '2';
  return /*#__PURE__*/React.createElement("span", _extends({}, restProps, {
    className: classNames("vkuiCounter", modeClassNames[mode], sizeClassNames[size], className)
  }), hasReactNode(children) && /*#__PURE__*/React.createElement(CounterTypography, {
    Component: "span",
    className: "vkuiCounter__in",
    level: counterLevel
  }, children));
};
//# sourceMappingURL=Counter.js.map