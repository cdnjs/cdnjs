"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabbarItem = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _Tappable = require("../Tappable/Tappable");
var _Footnote = require("../Typography/Footnote/Footnote");
var _platform = require("../../lib/platform");
var _excluded = ["children", "selected", "indicator", "text", "href", "Component", "disabled", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/TabbarItem
 */
var TabbarItem = function TabbarItem(_ref) {
  var children = _ref.children,
    selected = _ref.selected,
    indicator = _ref.indicator,
    text = _ref.text,
    href = _ref.href,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? href ? 'a' : 'button' : _ref$Component,
    disabled = _ref.disabled,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, restProps, {
    disabled: disabled,
    href: href,
    className: (0, _vkjs.classNames)("vkuiTabbarItem", platform === _platform.Platform.IOS && "vkuiTabbarItem--ios", platform === _platform.Platform.ANDROID && "vkuiTabbarItem--android", selected && "vkuiTabbarItem--selected", !!text && "vkuiTabbarItem--text", className)
  }), /*#__PURE__*/React.createElement(_Tappable.Tappable, {
    role: "presentation",
    Component: "div",
    disabled: disabled,
    activeMode: platform === _platform.Platform.IOS ? "vkuiTabbarItem__tappable--active" : 'background',
    activeEffectDelay: platform === _platform.Platform.IOS ? 0 : 300,
    hasHover: false,
    className: "vkuiTabbarItem__tappable"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiTabbarItem__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiTabbarItem__icon"
  }, children, /*#__PURE__*/React.createElement("div", {
    className: "vkuiTabbarItem__label"
  }, (0, _vkjs.hasReactNode)(indicator) && indicator)), text && /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    Component: "div",
    className: "vkuiTabbarItem__text",
    weight: "2"
  }, text)));
};
exports.TabbarItem = TabbarItem;
//# sourceMappingURL=TabbarItem.js.map