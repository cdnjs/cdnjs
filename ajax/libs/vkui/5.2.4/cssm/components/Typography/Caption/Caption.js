import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "children", "weight", "level", "caps", "Component"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import "./Caption.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Caption
 */
export var Caption = function Caption(_ref) {
  var className = _ref.className,
    children = _ref.children,
    weight = _ref.weight,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? '1' : _ref$level,
    caps = _ref.caps,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'span' : _ref$Component,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    className: classNames(className, "vkuiCaption", styles["Caption--level-".concat(level)], caps && "vkuiCaption--caps", weight && styles["Caption--weight-".concat(weight)])
  }), children);
};
var styles = {
  "Caption--level-1": "vkuiCaption--level-1",
  "Caption--level-2": "vkuiCaption--level-2",
  "Caption--level-3": "vkuiCaption--level-3",
  "Caption--weight-1": "vkuiCaption--weight-1",
  "Caption--weight-2": "vkuiCaption--weight-2",
  "Caption--weight-3": "vkuiCaption--weight-3"
};
//# sourceMappingURL=Caption.js.map