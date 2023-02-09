import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "children", "weight", "level", "Component"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
/**
 * @see https://vkcom.github.io/VKUI/#/Title
 */
export var Title = function Title(_ref) {
  var className = _ref.className,
    children = _ref.children,
    weight = _ref.weight,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? '1' : _ref$level,
    Component = _ref.Component,
    restProps = _objectWithoutProperties(_ref, _excluded);
  if (!Component) {
    Component = 'h' + level;
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    className: classNames(className, "vkuiTitle", styles["Title--level-".concat(level)], weight && styles["Title--weight-".concat(weight)])
  }), children);
};
var styles = {
  "Title--level-1": "vkuiTitle--level-1",
  "Title--level-2": "vkuiTitle--level-2",
  "Title--level-3": "vkuiTitle--level-3",
  "Title--weight-1": "vkuiTitle--weight-1",
  "Title--weight-2": "vkuiTitle--weight-2",
  "Title--weight-3": "vkuiTitle--weight-3"
};
//# sourceMappingURL=Title.js.map