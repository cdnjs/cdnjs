import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "selected", "label", "indicator", "text", "href", "Component", "disabled"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import Counter from "../Counter/Counter";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import Tappable from "../Tappable/Tappable";
import { Platform } from "../../lib/platform";
import { warnOnce } from "../../lib/warnOnce";
import "./TabbarItem.css";
var warn = warnOnce("TabbarItem");

var TabbarItem = function TabbarItem(_ref) {
  var children = _ref.children,
      selected = _ref.selected,
      label = _ref.label,
      indicator = _ref.indicator,
      text = _ref.text,
      href = _ref.href,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? href ? "a" : "button" : _ref$Component,
      disabled = _ref.disabled,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  if (label && process.env.NODE_ENV === "development") {
    warn("Свойство label устарело и будет удалено в 5.0.0. Используйте indicator.");
  }

  return createScopedElement(Component, _extends({}, restProps, {
    disabled: disabled,
    href: href,
    vkuiClass: classNames(getClassName("TabbarItem", platform), {
      "TabbarItem--selected": selected,
      "TabbarItem--text": !!text
    })
  }), createScopedElement(Tappable, {
    role: "presentation",
    Component: "div",
    disabled: disabled,
    activeMode: platform === Platform.IOS ? "TabbarItem__tappable--active" : "background",
    activeEffectDelay: platform === Platform.IOS ? 0 : 300,
    hasHover: false,
    vkuiClass: "TabbarItem__tappable"
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
}; // eslint-disable-next-line import/no-default-export


export default TabbarItem;
//# sourceMappingURL=TabbarItem.js.map