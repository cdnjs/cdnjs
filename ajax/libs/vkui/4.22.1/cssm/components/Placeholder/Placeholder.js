import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["icon", "header", "action", "children", "stretched", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { hasReactNode } from "../../lib/utils";
import Title from "../Typography/Title/Title";
import Headline from "../Typography/Headline/Headline";
import "./Placeholder.css";

var Placeholder = function Placeholder(props) {
  var icon = props.icon,
      header = props.header,
      action = props.action,
      children = props.children,
      stretched = props.stretched,
      getRootRef = props.getRootRef,
      restProps = _objectWithoutProperties(props, _excluded);

  return createScopedElement("div", _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames('Placeholder', {
      'Placeholder--stretched': stretched
    })
  }), createScopedElement("div", {
    vkuiClass: "Placeholder__in"
  }, hasReactNode(icon) && createScopedElement("div", {
    vkuiClass: "Placeholder__icon"
  }, icon), hasReactNode(header) && createScopedElement(Title, {
    level: "2",
    weight: "medium",
    vkuiClass: "Placeholder__header"
  }, header), hasReactNode(children) && createScopedElement(Headline, {
    weight: "regular",
    vkuiClass: "Placeholder__text"
  }, children), hasReactNode(action) && createScopedElement("div", {
    vkuiClass: "Placeholder__action"
  }, action)));
};

export default Placeholder;
//# sourceMappingURL=Placeholder.js.map