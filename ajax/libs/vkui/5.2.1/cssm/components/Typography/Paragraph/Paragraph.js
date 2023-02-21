import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "Component", "getRootRef", "weight", "children"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { warnOnce } from '../../../lib/warnOnce';
import "./Paragraph.module.css";
var warn = warnOnce('Paragraph');

/**
 * @see https://vkcom.github.io/VKUI/#/Paragraph
 */
export var Paragraph = function Paragraph(_ref) {
  var className = _ref.className,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'span' : _ref$Component,
    getRootRef = _ref.getRootRef,
    weight = _ref.weight,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  if (process.env.NODE_ENV === 'development' && typeof Component !== 'string' && getRootRef) {
    warn('getRootRef может использоваться только с элементами DOM', 'error');
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    ref: getRootRef,
    className: classNames(className, "vkuiParagraph", weight && styles["Paragraph--weight-".concat(weight)])
  }), children);
};
var styles = {
  "Paragraph--weight-1": "vkuiParagraph--weight-1",
  "Paragraph--weight-2": "vkuiParagraph--weight-2",
  "Paragraph--weight-3": "vkuiParagraph--weight-3"
};
//# sourceMappingURL=Paragraph.js.map