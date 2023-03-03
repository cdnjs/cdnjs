import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["icon", "header", "action", "children", "stretched", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { hasReactNode } from "../../lib/utils";
import { Title } from "../Typography/Title/Title";
import { Headline } from "../Typography/Headline/Headline";
/**
 * @see https://vkcom.github.io/VKUI/#/Placeholder
 */
export var Placeholder = function Placeholder(_ref) {
  var icon = _ref.icon,
    header = _ref.header,
    action = _ref.action,
    children = _ref.children,
    stretched = _ref.stretched,
    getRootRef = _ref.getRootRef,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return createScopedElement("div", _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames("Placeholder", stretched && "Placeholder--stretched")
  }), createScopedElement("div", {
    vkuiClass: "Placeholder__in"
  }, hasReactNode(icon) && createScopedElement("div", {
    vkuiClass: "Placeholder__icon"
  }, icon), hasReactNode(header) && createScopedElement(Title, {
    level: "2",
    weight: "2",
    vkuiClass: "Placeholder__header"
  }, header), hasReactNode(children) && createScopedElement(Headline, {
    weight: "3",
    vkuiClass: "Placeholder__text"
  }, children), hasReactNode(action) && createScopedElement("div", {
    vkuiClass: "Placeholder__action"
  }, action)));
};
//# sourceMappingURL=Placeholder.js.map