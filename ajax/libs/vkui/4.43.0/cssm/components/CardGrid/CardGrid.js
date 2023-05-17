import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "size", "spaced", "sizeX"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import "./CardGrid.css";
var CardGridComponent = function CardGridComponent(_ref) {
  var children = _ref.children,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "s" : _ref$size,
    _ref$spaced = _ref.spaced,
    spaced = _ref$spaced === void 0 ? false : _ref$spaced,
    sizeX = _ref.sizeX,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames("CardGrid", spaced && "CardGrid--spaced", "CardGrid--".concat(size), "CardGrid--sizeX-".concat(sizeX) // TODO: v5 новая адаптивность
    )
  }), children);
};

/**
 * @see https://vkcom.github.io/VKUI/#/CardGrid
 */
export var CardGrid = withAdaptivity(CardGridComponent, {
  sizeX: true
});
CardGrid.displayName = "CardGrid"; // TODO: v5 remove
//# sourceMappingURL=CardGrid.js.map