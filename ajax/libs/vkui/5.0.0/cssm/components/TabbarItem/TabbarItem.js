import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "selected", "indicator", "text", "href", "Component", "disabled"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import { Tappable } from "../Tappable/Tappable";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Platform } from "../../lib/platform";
import "./TabbarItem.css";

/**
 * @see https://vkcom.github.io/VKUI/#/TabbarItem
 */
export var TabbarItem = function TabbarItem(_ref) {
  var children = _ref.children,
      selected = _ref.selected,
      indicator = _ref.indicator,
      text = _ref.text,
      href = _ref.href,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? href ? "a" : "button" : _ref$Component,
      disabled = _ref.disabled,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(Component, _extends({}, restProps, {
    disabled: disabled,
    href: href,
    vkuiClass: classNames("TabbarItem", platform === Platform.IOS && "TabbarItem--ios", platform === Platform.ANDROID && "TabbarItem--android", selected && "TabbarItem--selected", !!text && "TabbarItem--text")
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
  }, hasReactNode(indicator) && indicator)), text && createScopedElement(Footnote, {
    Component: "div",
    vkuiClass: "TabbarItem__text",
    weight: "2"
  }, text)));
};
//# sourceMappingURL=TabbarItem.js.map