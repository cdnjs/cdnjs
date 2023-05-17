"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabbarItem = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _Counter = require("../Counter/Counter");
var _classNames = require("../../lib/classNames");
var _usePlatform = require("../../hooks/usePlatform");
var _utils = require("../../lib/utils");
var _Tappable = require("../Tappable/Tappable");
var _Footnote = require("../Typography/Footnote/Footnote");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _excluded = ["children", "selected", "label", "indicator", "text", "href", "Component", "disabled"];
var warn = (0, _warnOnce.warnOnce)("TabbarItem");

/**
 * @see https://vkcom.github.io/VKUI/#/TabbarItem
 */
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
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  if (label && process.env.NODE_ENV === "development") {
    warn("Свойство label устарело и будет удалено в 5.0.0. Используйте indicator.");
  }
  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, restProps, {
    disabled: disabled,
    href: href,
    vkuiClass: (0, _classNames.classNames)("TabbarItem", platform === _platform.Platform.IOS && "TabbarItem--ios", platform === _platform.Platform.ANDROID && "TabbarItem--android", selected && "TabbarItem--selected", !!text && "TabbarItem--text")
  }), (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, {
    role: "presentation",
    Component: "div",
    disabled: disabled,
    activeMode: platform === _platform.Platform.IOS ? "TabbarItem__tappable--active" : "background",
    activeEffectDelay: platform === _platform.Platform.IOS ? 0 : 300,
    hasHover: false,
    vkuiClass: "TabbarItem__tappable"
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "TabbarItem__in"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "TabbarItem__icon"
  }, children, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "TabbarItem__label"
  }, (0, _utils.hasReactNode)(indicator) && indicator, !indicator && label && (0, _jsxRuntime.createScopedElement)(_Counter.Counter, {
    size: "s",
    mode: "prominent"
  }, label))), text && (0, _jsxRuntime.createScopedElement)(_Footnote.Footnote, {
    Component: "div",
    vkuiClass: "TabbarItem__text",
    weight: "2"
  }, text)));
};
exports.TabbarItem = TabbarItem;
//# sourceMappingURL=TabbarItem.js.map