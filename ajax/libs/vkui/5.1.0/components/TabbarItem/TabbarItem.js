import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "selected", "indicator", "text", "href", "Component", "disabled", "className"];
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Tappable } from '../Tappable/Tappable';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Platform } from '../../lib/platform';
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
    Component = _ref$Component === void 0 ? href ? 'a' : 'button' : _ref$Component,
    disabled = _ref.disabled,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    disabled: disabled,
    href: href,
    className: classNames("vkuiTabbarItem", platform === Platform.IOS && "vkuiTabbarItem--ios", platform === Platform.ANDROID && "vkuiTabbarItem--android", selected && "vkuiTabbarItem--selected", !!text && "vkuiTabbarItem--text", className)
  }), /*#__PURE__*/React.createElement(Tappable, {
    role: "presentation",
    Component: "div",
    disabled: disabled,
    activeMode: platform === Platform.IOS ? "vkuiTabbarItem__tappable--active" : 'background',
    activeEffectDelay: platform === Platform.IOS ? 0 : 300,
    hasHover: false,
    className: "vkuiTabbarItem__tappable"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiTabbarItem__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiTabbarItem__icon"
  }, children, /*#__PURE__*/React.createElement("div", {
    className: "vkuiTabbarItem__label"
  }, hasReactNode(indicator) && indicator)), text && /*#__PURE__*/React.createElement(Footnote, {
    Component: "div",
    className: "vkuiTabbarItem__text",
    weight: "2"
  }, text)));
};
//# sourceMappingURL=TabbarItem.js.map