import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "arrow"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { HoverPopper } from "../HoverPopper/HoverPopper";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { useAppearance } from "../../hooks/useAppearance";
import { classNames } from "../../lib/classNames";
import { prefixClass } from "../../lib/prefixClass";
import "./RichTooltip.css";
export var RichTooltip = function RichTooltip(_ref) {
  var children = _ref.children,
      _ref$arrow = _ref.arrow,
      arrow = _ref$arrow === void 0 ? true : _ref$arrow,
      popperProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var appearance = useAppearance();
  return createScopedElement(HoverPopper, _extends({
    vkuiClass: classNames(getClassName("RichTooltip", platform), _defineProperty({}, "RichTooltip--".concat(appearance), !!appearance)),
    arrow: arrow,
    arrowClassName: prefixClass("RichTooltip__arrow")
  }, popperProps), children);
};
//# sourceMappingURL=RichTooltip.js.map