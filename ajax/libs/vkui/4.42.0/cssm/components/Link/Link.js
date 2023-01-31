import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["hasVisited", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { Tappable } from "../Tappable/Tappable";
import "./Link.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Link
 */
export var Link = function Link(_ref) {
  var hasVisited = _ref.hasVisited,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return createScopedElement(Tappable, _extends({
    Component: restProps.href ? "a" : "button"
  }, restProps, {
    vkuiClass: classNames("Link", hasVisited && "Link--has-visited"),
    hasHover: false,
    activeMode: "opacity",
    focusVisibleMode: "Link--focus-visible"
  }), children);
};
//# sourceMappingURL=Link.js.map