import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "weight", "Component"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { classNames } from "../../../lib/classNames";
import { useAdaptivity } from "../../../hooks/useAdaptivity";
import { getSizeYClassName } from "../../../helpers/getSizeYClassName";

/**
 * @see https://vkcom.github.io/VKUI/#/Subhead
 */
export var Subhead = function Subhead(_ref) {
  var children = _ref.children,
      weight = _ref.weight,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "h5" : _ref$Component,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  return createScopedElement(Component, _extends({}, restProps, {
    vkuiClass: classNames("Subhead", getSizeYClassName("Subhead", sizeY), weight && "Subhead--weight-".concat(weight))
  }), children);
};
//# sourceMappingURL=Subhead.js.map