"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _platform = require("../../lib/platform");

var _utils = require("../../lib/utils");

var _icons = require("@vkontakte/icons");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _IconButton = _interopRequireDefault(require("../IconButton/IconButton"));

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _Subhead = _interopRequireDefault(require("../Typography/Subhead/Subhead"));

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _Title = _interopRequireDefault(require("../Typography/Title/Title"));

var _excluded = ["size"],
    _excluded2 = ["size"],
    _excluded3 = ["mode", "imageTheme", "size", "before", "asideMode", "header", "subheader", "text", "children", "background", "actions", "onDismiss", "dismissLabel"];

var BannerHeader = function BannerHeader(_ref) {
  var size = _ref.size,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return size === "m" ? (0, _jsxRuntime.createScopedElement)(_Title.default, (0, _extends2.default)({
    level: "2",
    weight: "2"
  }, restProps)) : (0, _jsxRuntime.createScopedElement)(_Headline.default, (0, _extends2.default)({
    weight: "medium"
  }, restProps));
};

var BannerSubheader = function BannerSubheader(_ref2) {
  var size = _ref2.size,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  return size === "m" ? (0, _jsxRuntime.createScopedElement)(_Text.default, (0, _extends2.default)({
    weight: "regular"
  }, restProps)) : (0, _jsxRuntime.createScopedElement)(_Subhead.default, restProps);
};

var Banner = function Banner(props) {
  var platform = (0, _usePlatform.usePlatform)();
  var mode = props.mode,
      imageTheme = props.imageTheme,
      size = props.size,
      before = props.before,
      asideMode = props.asideMode,
      header = props.header,
      subheader = props.subheader,
      text = props.text,
      children = props.children,
      background = props.background,
      actions = props.actions,
      onDismiss = props.onDismiss,
      dismissLabel = props.dismissLabel,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded3);
  return (0, _jsxRuntime.createScopedElement)("section", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Banner", platform), "Banner--md-".concat(mode), "Banner--sz-".concat(size), {
      "Banner--inverted": mode === "image" && imageTheme === "dark"
    })
  }), (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
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
  }, header), (0, _utils.hasReactNode)(subheader) && (0, _jsxRuntime.createScopedElement)(BannerSubheader, {
    Component: "span",
    size: size,
    vkuiClass: "Banner__subheader"
  }, subheader), (0, _utils.hasReactNode)(text) && (0, _jsxRuntime.createScopedElement)(_Text.default, {
    weight: "regular",
    vkuiClass: "Banner__text"
  }, text), (0, _utils.hasReactNode)(actions) && React.Children.count(actions) > 0 && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Banner__actions"
  }, actions)), !!asideMode && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Banner__aside"
  }, asideMode === "expand" && (0, _jsxRuntime.createScopedElement)(_icons.Icon24Chevron, null), asideMode === "dismiss" && (0, _jsxRuntime.createScopedElement)(_IconButton.default, {
    "aria-label": dismissLabel,
    vkuiClass: "Banner__dismiss",
    onClick: onDismiss,
    hoverMode: "opacity",
    hasActive: false
  }, (platform === _platform.ANDROID || platform === _platform.VKCOM) && (0, _jsxRuntime.createScopedElement)(_icons.Icon24Cancel, null), platform === _platform.IOS && (mode === "image" ? (0, _jsxRuntime.createScopedElement)(_icons.Icon24DismissDark, null) : (0, _jsxRuntime.createScopedElement)(_icons.Icon24DismissSubstract, null))))));
};

Banner.defaultProps = {
  dismissLabel: "Скрыть",
  mode: "tint",
  size: "s",
  imageTheme: "dark"
}; // eslint-disable-next-line import/no-default-export

var _default = Banner;
exports.default = _default;
//# sourceMappingURL=Banner.js.map