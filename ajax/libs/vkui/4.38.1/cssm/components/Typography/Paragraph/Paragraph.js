import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["Component", "getRootRef", "weight", "children"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { classNames } from "../../../lib/classNames";
import { warnOnce } from "../../../lib/warnOnce";
import "./Paragraph.css";
var warn = warnOnce("Paragraph");
/**
 * @see https://vkcom.github.io/VKUI/#/Paragraph
 */

export var Paragraph = function Paragraph(_ref) {
  var _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "span" : _ref$Component,
      getRootRef = _ref.getRootRef,
      weight = _ref.weight,
      children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  if (process.env.NODE_ENV === "development" && typeof Component !== "string" && getRootRef) {
    warn("getRootRef может использоваться только с элементами DOM", "error");
  }

  return createScopedElement(Component, _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames("Paragraph", weight && "Paragraph--w-".concat(weight))
  }), children);
};
//# sourceMappingURL=Paragraph.js.map