import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "weight", "level", "Component", "getRootRef"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { useAdaptivity } from "../../../hooks/useAdaptivity";
import { classNames } from "../../../lib/classNames";
import { warnOnce } from "../../../lib/warnOnce";
import { getSizeYClassName } from "../../../helpers/getSizeYClassName";
var warn = warnOnce("Headline");
/**
 * @see https://vkcom.github.io/VKUI/#/Headline
 */

export var Headline = function Headline(_ref) {
  var children = _ref.children,
      _ref$weight = _ref.weight,
      weight = _ref$weight === void 0 ? "3" : _ref$weight,
      _ref$level = _ref.level,
      level = _ref$level === void 0 ? "1" : _ref$level,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "h4" : _ref$Component,
      getRootRef = _ref.getRootRef,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  if (process.env.NODE_ENV === "development" && typeof Component !== "string" && getRootRef) {
    warn("getRootRef может использоваться только с элементами DOM", "error");
  }

  return createScopedElement(Component, _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames("Headline", getSizeYClassName("Headline", sizeY), "Headline--level-".concat(level), "Headline--weight-".concat(weight))
  }), children);
};
//# sourceMappingURL=Headline.js.map