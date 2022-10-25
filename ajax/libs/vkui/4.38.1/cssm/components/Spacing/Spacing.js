import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "separator", "style"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import "./Spacing.css";

/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */
export var Spacing = function Spacing(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 8 : _ref$size,
      separator = _ref.separator,
      style = _ref.style,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var styles = _objectSpread({
    height: size
  }, style);

  return createScopedElement("div", _extends({}, restProps, {
    "aria-hidden": "true",
    vkuiClass: classNames("Spacing", !!separator && "Spacing--separator", (separator === true || separator === "center") && "Spacing--separator-center", separator === "top" && "Spacing--separator-top", separator === "bottom" && "Spacing--separator-bottom"),
    style: styles
  }));
};
//# sourceMappingURL=Spacing.js.map