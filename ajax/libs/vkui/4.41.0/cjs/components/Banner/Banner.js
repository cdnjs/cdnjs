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
var _excluded = ["mode", "imageTheme", "size", "before", "asideMode", "header", "subheader", "text", "children", "background", "actions", "onDismiss", "dismissLabel"];
/**
 * @see https://vkcom.github.io/VKUI/#/Banner
 */
var Banner = function Banner(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "tint" : _ref$mode,
    _ref$imageTheme = _ref.imageTheme,
    imageTheme = _ref$imageTheme === void 0 ? "dark" : _ref$imageTheme,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "s" : _ref$size,
    before = _ref.before,
    asideMode = _ref.asideMode,
    header = _ref.header,
    subheader = _ref.subheader,
    text = _ref.text,
    children = _ref.children,
    background = _ref.background,
    actions = _ref.actions,
    onDismiss = _ref.onDismiss,
    _ref$dismissLabel = _ref.dismissLabel,
    dismissLabel = _ref$dismissLabel === void 0 ? "Скрыть" : _ref$dismissLabel,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var HeaderTypography = size === "m" ? _Title.Title : _Headline.Headline;
  var SubheaderTypography = size === "m" ? _Text.Text : _Subhead.Subhead;
  var IconDismissIOS = mode === "image" ? _icons.Icon24DismissDark : _icons.Icon24DismissSubstract;
  var content = (0, _jsxRuntime.createScopedElement)(React.Fragment, null, mode === "image" && background && (0, _jsxRuntime.createScopedElement)("div", {
    "aria-hidden": "true",
    vkuiClass: "Banner__bg"
  }, background), before && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Banner__before"
  }, before), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Banner__content"
  }, (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(HeaderTypography, {
    Component: "span",
    vkuiClass: "Banner__header",
    weight: "2",
    level: size === "m" ? "2" : "1"
  }, header), (0, _utils.hasReactNode)(subheader) && (0, _jsxRuntime.createScopedElement)(SubheaderTypography, {
    Component: "span",
    vkuiClass: "Banner__subheader"
  }, subheader), (0, _utils.hasReactNode)(text) && (0, _jsxRuntime.createScopedElement)(_Text.Text, {
    vkuiClass: "Banner__text"
  }, text), (0, _utils.hasReactNode)(actions) && React.Children.count(actions) > 0 && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Banner__actions"
  }, actions)));
  return (0, _jsxRuntime.createScopedElement)("section", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("Banner", platform === _platform.IOS && "Banner--ios", "Banner--md-".concat(mode), "Banner--sz-".concat(size), mode === "image" && imageTheme === "dark" && "Banner--inverted")
  }), asideMode === "expand" ? (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, {
    vkuiClass: "Banner__in",
    activeMode: platform === _platform.IOS ? "opacity" : "background",
    role: "button"
  }, content, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Banner__aside"
  }, (0, _jsxRuntime.createScopedElement)(_icons.Icon24Chevron, null))) : (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Banner__in"
  }, content, asideMode === "dismiss" && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Banner__aside"
  }, (0, _jsxRuntime.createScopedElement)(_IconButton.IconButton, {
    "aria-label": dismissLabel,
    vkuiClass: "Banner__dismiss",
    onClick: onDismiss,
    hoverMode: "opacity",
    hasActive: false
  }, platform === _platform.IOS ? (0, _jsxRuntime.createScopedElement)(IconDismissIOS, null) : (0, _jsxRuntime.createScopedElement)(_icons.Icon24Cancel, null)))));
};
exports.Banner = Banner;
//# sourceMappingURL=Banner.js.map