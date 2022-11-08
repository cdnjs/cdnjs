import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "arrow", "appearance"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { HoverPopper } from "../HoverPopper/HoverPopper";
import { classNames } from "../../lib/classNames";
import { prefixClass } from "../../lib/prefixClass";
import "./RichTooltip.css";
/**
 * @see https://vkcom.github.io/VKUI/#/RichTooltip
 */
export var RichTooltip = function RichTooltip(_ref) {
  var children = _ref.children,
    _ref$arrow = _ref.arrow,
    arrow = _ref$arrow === void 0 ? true : _ref$arrow,
    _ref$appearance = _ref.appearance,
    appearance = _ref$appearance === void 0 ? "neutral" : _ref$appearance,
    popperProps = _objectWithoutProperties(_ref, _excluded);
  return createScopedElement(HoverPopper, _extends({
    vkuiClass: classNames("RichTooltip", "RichTooltip--".concat(appearance)),
    arrow: arrow,
    arrowClassName: prefixClass("RichTooltip__arrow")
  }, popperProps), children);
};
//# sourceMappingURL=RichTooltip.js.map