import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "size", "spaced"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { getSizeXClassName } from "../../helpers/getSizeXClassName";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import "./CardGrid.css";

/**
 * @see https://vkcom.github.io/VKUI/#/CardGrid
 */
export var CardGrid = function CardGrid(_ref) {
  var children = _ref.children,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "s" : _ref$size,
      _ref$spaced = _ref.spaced,
      spaced = _ref$spaced === void 0 ? false : _ref$spaced,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _useAdaptivity = useAdaptivity(),
      sizeX = _useAdaptivity.sizeX;

  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames("CardGrid", spaced && "CardGrid--spaced", "CardGrid--size-".concat(size), getSizeXClassName("CardGrid", sizeX))
  }), children);
};
//# sourceMappingURL=CardGrid.js.map