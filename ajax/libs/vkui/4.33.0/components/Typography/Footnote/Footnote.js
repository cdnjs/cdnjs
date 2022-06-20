import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "weight", "caps", "Component"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { classNames } from "../../../lib/classNames";

/**
 * @see https://vkcom.github.io/VKUI/#/Footnote
 */
export var Footnote = function Footnote(_ref) {
  var children = _ref.children,
      weight = _ref.weight,
      caps = _ref.caps,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "span" : _ref$Component,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement(Component, _extends({}, restProps, {
    vkuiClass: classNames("Footnote", caps && "Footnote--caps", weight && "Footnote--w-".concat(weight))
  }), children);
};
//# sourceMappingURL=Footnote.js.map