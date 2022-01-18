import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "selected", "label", "indicator", "text"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import Counter from "../Counter/Counter";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import "./TabbarItem.css";

var TabbarItem = function TabbarItem(props) {
  var children = props.children,
      selected = props.selected,
      label = props.label,
      indicator = props.indicator,
      text = props.text,
      restProps = _objectWithoutProperties(props, _excluded);

  var platform = usePlatform();
  var Component = restProps.href ? 'a' : 'div';
  return createScopedElement(Component, _extends({}, restProps, {
    vkuiClass: classNames(getClassName('TabbarItem', platform), {
      'TabbarItem--selected': selected,
      'TabbarItem--text': !!text
    })
  }), createScopedElement("div", {
    vkuiClass: "TabbarItem__in"
  }, createScopedElement("div", {
    vkuiClass: "TabbarItem__icon"
  }, children, createScopedElement("div", {
    vkuiClass: "TabbarItem__label"
  }, hasReactNode(indicator) && indicator, !indicator && label && createScopedElement(Counter, {
    size: "s",
    mode: "prominent"
  }, label))), text && createScopedElement("div", {
    vkuiClass: "TabbarItem__text"
  }, text)));
};

export default TabbarItem;
//# sourceMappingURL=TabbarItem.js.map