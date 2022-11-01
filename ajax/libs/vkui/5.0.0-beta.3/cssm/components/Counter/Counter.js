import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "size", "children", "className"];
import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import { Caption } from "../Typography/Caption/Caption";
import { Headline } from "../Typography/Headline/Headline";
import { hasReactNode } from "../../lib/utils";
import "./Counter.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Counter
 */
export var Counter = function Counter(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "secondary" : _ref$mode,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "m" : _ref$size,
    children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  if (React.Children.count(children) === 0) {
    return null;
  }
  var CounterTypography = size === "s" ? Caption : Headline;
  return /*#__PURE__*/React.createElement("span", _extends({}, restProps, {
    className: classNamesString("vkuiCounter", styles["Counter--mode-".concat(mode)], styles["Counter--size-".concat(size)], className)
  }), hasReactNode(children) && /*#__PURE__*/React.createElement(CounterTypography, {
    Component: "span",
    className: "vkuiCounter__in",
    level: "2"
  }, children));
};
var styles = {
  "Counter--mode-primary": "vkuiCounter--mode-primary",
  "Counter--mode-secondary": "vkuiCounter--mode-secondary",
  "Counter--mode-prominent": "vkuiCounter--mode-prominent",
  "Counter--mode-contrast": "vkuiCounter--mode-contrast",
  "Counter--size-m": "vkuiCounter--size-m",
  "Counter--size-s": "vkuiCounter--size-s"
};
//# sourceMappingURL=Counter.js.map