"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Banner = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _icons = require("@vkontakte/icons");
var _Tappable = require("../Tappable/Tappable");
var _IconButton = require("../IconButton/IconButton");
var _Headline = require("../Typography/Headline/Headline");
var _Subhead = require("../Typography/Subhead/Subhead");
var _Text = require("../Typography/Text/Text");
var _Title = require("../Typography/Title/Title");
var _excluded = ["mode", "imageTheme", "size", "before", "asideMode", "header", "subheader", "text", "children", "background", "actions", "onDismiss", "dismissLabel", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Banner
 */
var Banner = function Banner(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'tint' : _ref$mode,
    _ref$imageTheme = _ref.imageTheme,
    imageTheme = _ref$imageTheme === void 0 ? 'dark' : _ref$imageTheme,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 's' : _ref$size,
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
    dismissLabel = _ref$dismissLabel === void 0 ? 'Скрыть' : _ref$dismissLabel,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var HeaderTypography = size === 'm' ? _Title.Title : _Headline.Headline;
  var SubheaderTypography = size === 'm' ? _Text.Text : _Subhead.Subhead;
  var IconDismissIOS = mode === 'image' ? _icons.Icon24DismissDark : _icons.Icon24DismissSubstract;
  var content = /*#__PURE__*/React.createElement(React.Fragment, null, mode === 'image' && background && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    className: "vkuiBanner__bg"
  }, background), before && /*#__PURE__*/React.createElement("div", {
    className: "vkuiBanner__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: "vkuiBanner__content"
  }, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/React.createElement(HeaderTypography, {
    Component: "span",
    className: "vkuiBanner__header",
    weight: "2",
    level: size === 'm' ? '2' : '1'
  }, header), (0, _vkjs.hasReactNode)(subheader) && /*#__PURE__*/React.createElement(SubheaderTypography, {
    Component: "span",
    className: "vkuiBanner__subheader"
  }, subheader), (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/React.createElement(_Text.Text, {
    className: "vkuiBanner__text"
  }, text), (0, _vkjs.hasReactNode)(actions) && React.Children.count(actions) > 0 && /*#__PURE__*/React.createElement("div", {
    className: "vkuiBanner__actions"
  }, actions)));
  return /*#__PURE__*/React.createElement("section", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiBanner", platform === _platform.Platform.IOS && "vkuiBanner--ios", styles["Banner--mode-".concat(mode)], styles["Banner--size-".concat(size)], mode === 'image' && imageTheme === 'dark' && "vkuiBanner--inverted", className)
  }), asideMode === 'expand' ? /*#__PURE__*/React.createElement(_Tappable.Tappable, {
    className: "vkuiBanner__in",
    activeMode: platform === _platform.Platform.IOS ? 'opacity' : 'background',
    role: "button"
  }, content, /*#__PURE__*/React.createElement("div", {
    className: "vkuiBanner__aside"
  }, /*#__PURE__*/React.createElement(_icons.Icon24Chevron, null))) : /*#__PURE__*/React.createElement("div", {
    className: "vkuiBanner__in"
  }, content, asideMode === 'dismiss' && /*#__PURE__*/React.createElement("div", {
    className: "vkuiBanner__aside"
  }, /*#__PURE__*/React.createElement(_IconButton.IconButton, {
    "aria-label": dismissLabel,
    className: "vkuiBanner__dismiss",
    onClick: onDismiss,
    hoverMode: "opacity",
    hasActive: false
  }, platform === _platform.Platform.IOS ? /*#__PURE__*/React.createElement(IconDismissIOS, null) : /*#__PURE__*/React.createElement(_icons.Icon24Cancel, null)))));
};
exports.Banner = Banner;
var styles = {
  "Banner--mode-image": "vkuiBanner--mode-image",
  "Banner--mode-tint": "vkuiBanner--mode-tint",
  "Banner--size-s": "vkuiBanner--size-s",
  "Banner--size-m": "vkuiBanner--size-m"
};
//# sourceMappingURL=Banner.js.map