import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["className", "children", "weight", "level", "Component", "getRootRef"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { SizeType } from '../../../lib/adaptivity';
import { warnOnce } from '../../../lib/warnOnce';
import "./Headline.module.css";
var sizeYClassNames = _defineProperty({
  none: "vkuiHeadline--sizeY-none"
}, SizeType.COMPACT, "vkuiHeadline--sizeY-compact");
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
    _useAdaptivity$sizeY = _useAdaptivity.sizeY,
    sizeY = _useAdaptivity$sizeY === void 0 ? 'none' : _useAdaptivity$sizeY;
  if (process.env.NODE_ENV === 'development' && typeof Component !== 'string' && getRootRef) {
    warn('getRootRef может использоваться только с элементами DOM', 'error');
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    ref: getRootRef,
    className: classNames(className, "vkuiHeadline", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], styles["Headline--level-".concat(level)], styles["Headline--weight-".concat(weight)])
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