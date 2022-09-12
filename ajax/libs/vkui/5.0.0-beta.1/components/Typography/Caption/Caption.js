import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "weight", "level", "caps", "Component"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { classNames } from "../../../lib/classNames";

/**
 * @see https://vkcom.github.io/VKUI/#/Caption
 */
export var Caption = function Caption(_ref) {
  var children = _ref.children,
      weight = _ref.weight,
      _ref$level = _ref.level,
      level = _ref$level === void 0 ? "1" : _ref$level,
      caps = _ref.caps,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "span" : _ref$Component,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement(Component, _extends({}, restProps, {
    vkuiClass: classNames("Caption", "Caption--level-".concat(level), caps && "Caption--caps", weight && "Caption--weight-".concat(weight))
  }), children);
};
//# sourceMappingURL=Caption.js.map