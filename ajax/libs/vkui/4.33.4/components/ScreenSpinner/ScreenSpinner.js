import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["style", "className", "size", "aria-label"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Spinner } from "../Spinner/Spinner";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { useScrollLock } from "../AppRoot/ScrollContext";

/**
 * @see https://vkcom.github.io/VKUI/#/ScreenSpinner
 */
export var ScreenSpinner = function ScreenSpinner(_ref) {
  var style = _ref.style,
      className = _ref.className,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "large" : _ref$size,
      _ref$ariaLabel = _ref["aria-label"],
      ariaLabel = _ref$ariaLabel === void 0 ? "Пожалуйста, подождите..." : _ref$ariaLabel,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  useScrollLock();
  return createScopedElement(PopoutWrapper, {
    hasMask: false,
    vkuiClass: getClassName("ScreenSpinner", platform),
    className: className,
    style: style
  }, createScopedElement("div", {
    vkuiClass: "ScreenSpinner__container"
  }, createScopedElement(Spinner, _extends({
    vkuiClass: "ScreenSpinner__spinner",
    size: size,
    "aria-label": ariaLabel
  }, restProps))));
};
//# sourceMappingURL=ScreenSpinner.js.map