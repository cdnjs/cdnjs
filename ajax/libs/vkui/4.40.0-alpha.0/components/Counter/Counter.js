import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "size", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { Caption } from "../Typography/Caption/Caption";
import { Headline } from "../Typography/Headline/Headline";
import { hasReactNode } from "../../lib/utils";
/**
 * @see https://vkcom.github.io/VKUI/#/Counter
 */
export var Counter = function Counter(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "secondary" : _ref$mode,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "m" : _ref$size,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  if (React.Children.count(children) === 0) {
    return null;
  }
  var CounterTypography = size === "s" ? Caption : Headline;
  return createScopedElement("span", _extends({}, restProps, {
    vkuiClass: classNames("Counter", "Counter--".concat(mode), "Counter--s-".concat(size))
  }), hasReactNode(children) && createScopedElement(CounterTypography, {
    Component: "span",
    vkuiClass: "Counter__in",
    level: "2"
  }, children));
};
//# sourceMappingURL=Counter.js.map