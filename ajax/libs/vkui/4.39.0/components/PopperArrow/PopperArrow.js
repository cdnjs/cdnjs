import _extends from "@babel/runtime/helpers/extends";
import { createScopedElement } from "../../lib/jsxRuntime";
export var PopperArrow = function PopperArrow(_ref) {
  var style = _ref.style,
    attributes = _ref.attributes,
    arrowClassName = _ref.arrowClassName;
  return createScopedElement("div", _extends({
    style: style
  }, attributes, {
    vkuiClass: "PopperArrow",
    "data-popper-arrow": true
  }), createScopedElement("svg", {
    vkuiClass: "PopperArrow__in",
    className: arrowClassName,
    width: "20",
    height: "8",
    viewBox: "0 0 20 8",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, createScopedElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10 0C13 0 15.9999 8 20 8H0C3.9749 8 7 0 10 0Z",
    fill: "currentColor"
  })));
};
//# sourceMappingURL=PopperArrow.js.map