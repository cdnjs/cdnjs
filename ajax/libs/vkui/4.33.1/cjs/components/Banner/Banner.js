"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Banner = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _platform = require("../../lib/platform");

var _utils = require("../../lib/utils");

var _icons = require("@vkontakte/icons");

var _Tappable = require("../Tappable/Tappable");

var _IconButton = require("../IconButton/IconButton");

var _Headline = require("../Typography/Headline/Headline");

var _Subhead = require("../Typography/Subhead/Subhead");

var _Text = require("../Typography/Text/Text");

var _Title = require("../Typography/Title/Title");

var _excluded = ["size"],
    _excluded2 = ["mode", "imageTheme", "size", "before", "asideMode", "header", "subheader", "text", "children", "background", "actions", "onDismiss", "dismissLabel"];

var BannerHeader = function BannerHeader(_ref) {
  var size = _ref.size,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return size === "m" ? (0, _jsxRuntime.createScopedElement)(_Title.Title, (0, _extends2.default)({
    level: "2",
    weight: "2"
  }, restProps)) : (0, _jsxRuntime.createScopedElement)(_Headline.Headline, (0, _extends2.default)({
    weight: "2"
  }, restProps));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Banner
 */


var Banner = function Banner(_ref2) {
  var _ref2$mode = _ref2.mode,
      mode = _ref2$mode === void 0 ? "tint" : _ref2$mode,
      _ref2$imageTheme = _ref2.imageTheme,
      imageTheme = _ref2$imageTheme === void 0 ? "dark" : _ref2$imageTheme,
      _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? "s" : _ref2$size,
      before = _ref2.before,
      asideMode = _ref2.asideMode,
      header = _ref2.header,
      subheader = _ref2.subheader,
      text = _ref2.text,
      children = _ref2.children,
      background = _ref2.background,
      actions = _ref2.actions,
      onDismiss = _ref2.onDismiss,
      _ref2$dismissLabel = _ref2.dismissLabel,
      dismissLabel = _ref2$dismissLabel === void 0 ? "Скрыть" : _ref2$dismissLabel,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  var platform = (0, _usePlatform.usePlatform)();
  var SubheaderTypography = size === "m" ? _Text.Text : _Subhead.Subhead;
  return (0, _jsxRuntime.createScopedElement)("section", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("Banner", platform === _platform.IOS && "Banner--ios", "Banner--md-".concat(mode), "Banner--sz-".concat(size), mode === "image" && imageTheme === "dark" && "Banner--inverted")
  }), (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, {
    vkuiClass: "Banner__in",
    activeMode: platform === _platform.IOS ? "opacity" : "background",
    disabled: asideMode !== "expand",
    role: asideMode === "expand" ? "button" : undefined
  }, mode === "image" && background && (0, _jsxRuntime.createScopedElement)("div", {
    "aria-hidden": "true",
    vkuiClass: "Banner__bg"
  }, background), before && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Banner__before"
  }, before), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Banner__content"
  }, (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(BannerHeader, {
    size: size,
    Component: "span",
    vkuiClass: "Banner__header"
  }, header), (0, _utils.hasReactNode)(subheader) && (0, _jsxRuntime.createScopedElement)(SubheaderTypography, {
    Component: "span",
    vkuiClass: "Banner__subheader"
  }, subheader), (0, _utils.hasReactNode)(text) && (0, _jsxRuntime.createScopedElement)(_Text.Text, {
    vkuiClass: "Banner__text"
  }, text), (0, _utils.hasReactNode)(actions) && React.Children.count(actions) > 0 && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Banner__actions"
  }, actions)), !!asideMode && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Banner__aside"
  }, asideMode === "expand" && (0, _jsxRuntime.createScopedElement)(_icons.Icon24Chevron, null), asideMode === "dismiss" && (0, _jsxRuntime.createScopedElement)(_IconButton.IconButton, {
    "aria-label": dismissLabel,
    vkuiClass: "Banner__dismiss",
    onClick: onDismiss,
    hoverMode: "opacity",
    hasActive: false
  }, platform === _platform.IOS ? mode === "image" ? (0, _jsxRuntime.createScopedElement)(_icons.Icon24DismissDark, null) : (0, _jsxRuntime.createScopedElement)(_icons.Icon24DismissSubstract, null) : (0, _jsxRuntime.createScopedElement)(_icons.Icon24Cancel, null)))));
};

exports.Banner = Banner;
//# sourceMappingURL=Banner.js.map