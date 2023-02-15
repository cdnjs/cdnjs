import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "imageTheme", "size", "before", "asideMode", "header", "subheader", "text", "children", "background", "actions", "onDismiss", "dismissLabel", "className"];
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { Icon24Chevron, Icon24DismissSubstract, Icon24DismissDark, Icon24Cancel } from '@vkontakte/icons';
import { Tappable } from '../Tappable/Tappable';
import { IconButton } from '../IconButton/IconButton';
import { Headline } from '../Typography/Headline/Headline';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Text } from '../Typography/Text/Text';
import { Title } from '../Typography/Title/Title';
/**
 * @see https://vkcom.github.io/VKUI/#/Banner
 */
export var Banner = function Banner(_ref) {
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
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var HeaderTypography = size === 'm' ? Title : Headline;
  var SubheaderTypography = size === 'm' ? Text : Subhead;
  var IconDismissIOS = mode === 'image' ? Icon24DismissDark : Icon24DismissSubstract;
  var content = /*#__PURE__*/React.createElement(React.Fragment, null, mode === 'image' && background && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    className: "vkuiBanner__bg"
  }, background), before && /*#__PURE__*/React.createElement("div", {
    className: "vkuiBanner__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: "vkuiBanner__content"
  }, hasReactNode(header) && /*#__PURE__*/React.createElement(HeaderTypography, {
    Component: "span",
    className: "vkuiBanner__header",
    weight: "2",
    level: size === 'm' ? '2' : '1'
  }, header), hasReactNode(subheader) && /*#__PURE__*/React.createElement(SubheaderTypography, {
    Component: "span",
    className: "vkuiBanner__subheader"
  }, subheader), hasReactNode(text) && /*#__PURE__*/React.createElement(Text, {
    className: "vkuiBanner__text"
  }, text), hasReactNode(actions) && React.Children.count(actions) > 0 && /*#__PURE__*/React.createElement("div", {
    className: "vkuiBanner__actions"
  }, actions)));
  return /*#__PURE__*/React.createElement("section", _extends({}, restProps, {
    className: classNames("vkuiBanner", platform === Platform.IOS && "vkuiBanner--ios", styles["Banner--mode-".concat(mode)], styles["Banner--size-".concat(size)], mode === 'image' && imageTheme === 'dark' && "vkuiBanner--inverted", className)
  }), asideMode === 'expand' ? /*#__PURE__*/React.createElement(Tappable, {
    className: "vkuiBanner__in",
    activeMode: platform === Platform.IOS ? 'opacity' : 'background',
    role: "button"
  }, content, /*#__PURE__*/React.createElement("div", {
    className: "vkuiBanner__aside"
  }, /*#__PURE__*/React.createElement(Icon24Chevron, null))) : /*#__PURE__*/React.createElement("div", {
    className: "vkuiBanner__in"
  }, content, asideMode === 'dismiss' && /*#__PURE__*/React.createElement("div", {
    className: "vkuiBanner__aside"
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": dismissLabel,
    className: "vkuiBanner__dismiss",
    onClick: onDismiss,
    hoverMode: "opacity",
    hasActive: false
  }, platform === Platform.IOS ? /*#__PURE__*/React.createElement(IconDismissIOS, null) : /*#__PURE__*/React.createElement(Icon24Cancel, null)))));
};
var styles = {
  "Banner--mode-image": "vkuiBanner--mode-image",
  "Banner--mode-tint": "vkuiBanner--mode-tint",
  "Banner--size-s": "vkuiBanner--size-s",
  "Banner--size-m": "vkuiBanner--size-m"
};
//# sourceMappingURL=Banner.js.map