import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "children", "weight", "caps", "Component"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import "./Footnote.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Footnote
 */
export var Footnote = function Footnote(_ref) {
  var className = _ref.className,
    children = _ref.children,
    weight = _ref.weight,
    caps = _ref.caps,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'span' : _ref$Component,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    className: classNames(className, "vkuiFootnote", caps && "vkuiFootnote--caps", weight && styles["Footnote--weight-".concat(weight)])
  }), children);
};
var styles = {
  "Footnote--weight-1": "vkuiFootnote--weight-1",
  "Footnote--weight-2": "vkuiFootnote--weight-2",
  "Footnote--weight-3": "vkuiFootnote--weight-3"
};
//# sourceMappingURL=Footnote.js.map