import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "children", "weight", "level", "Component", "getRootRef"];
import * as React from 'react';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { classNames } from '@vkontakte/vkjs';
import { warnOnce } from '../../../lib/warnOnce';
import { getSizeYClassName } from '../../../helpers/getSizeYClassName';
import "./Headline.module.css";
var warn = warnOnce('Headline');

/**
 * @see https://vkcom.github.io/VKUI/#/Headline
 */
export var Headline = function Headline(_ref) {
  var className = _ref.className,
    children = _ref.children,
    _ref$weight = _ref.weight,
    weight = _ref$weight === void 0 ? '3' : _ref$weight,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? '1' : _ref$level,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'h4' : _ref$Component,
    getRootRef = _ref.getRootRef,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  if (process.env.NODE_ENV === 'development' && typeof Component !== 'string' && getRootRef) {
    warn('getRootRef может использоваться только с элементами DOM', 'error');
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    ref: getRootRef,
    className: classNames(className, "vkuiHeadline", getSizeYClassName("vkuiHeadline", sizeY), styles["Headline--level-".concat(level)], styles["Headline--weight-".concat(weight)])
  }), children);
};
var styles = {
  "Headline--level-1": "vkuiHeadline--level-1",
  "Headline--level-2": "vkuiHeadline--level-2",
  "Headline--weight-1": "vkuiHeadline--weight-1",
  "Headline--weight-2": "vkuiHeadline--weight-2",
  "Headline--weight-3": "vkuiHeadline--weight-3"
};
//# sourceMappingURL=Headline.js.map