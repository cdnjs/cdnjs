import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size"],
    _excluded2 = ["mode", "imageTheme", "size", "before", "asideMode", "header", "subheader", "text", "children", "background", "actions", "onDismiss", "dismissLabel"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { IOS } from "../../lib/platform";
import { hasReactNode } from "../../lib/utils";
import { Icon24Chevron, Icon24DismissSubstract, Icon24DismissDark, Icon24Cancel } from "@vkontakte/icons";
import { Tappable } from "../Tappable/Tappable";
import { IconButton } from "../IconButton/IconButton";
import { Headline } from "../Typography/Headline/Headline";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";

var BannerHeader = function BannerHeader(_ref) {
  var size = _ref.size,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return size === "m" ? createScopedElement(Title, _extends({
    level: "2",
    weight: "2"
  }, restProps)) : createScopedElement(Headline, _extends({
    weight: "2"
  }, restProps));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Banner
 */


export var Banner = function Banner(_ref2) {
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
      restProps = _objectWithoutProperties(_ref2, _excluded2);

  var platform = usePlatform();
  var SubheaderTypography = size === "m" ? Text : Subhead;
  return createScopedElement("section", _extends({}, restProps, {
    vkuiClass: classNames("Banner", platform === IOS && "Banner--ios", "Banner--md-".concat(mode), "Banner--sz-".concat(size), mode === "image" && imageTheme === "dark" && "Banner--inverted")
  }), createScopedElement(Tappable, {
    vkuiClass: "Banner__in",
    activeMode: platform === IOS ? "opacity" : "background",
    disabled: asideMode !== "expand",
    role: asideMode === "expand" ? "button" : undefined
  }, mode === "image" && background && createScopedElement("div", {
    "aria-hidden": "true",
    vkuiClass: "Banner__bg"
  }, background), before && createScopedElement("div", {
    vkuiClass: "Banner__before"
  }, before), createScopedElement("div", {
    vkuiClass: "Banner__content"
  }, hasReactNode(header) && createScopedElement(BannerHeader, {
    size: size,
    Component: "span",
    vkuiClass: "Banner__header"
  }, header), hasReactNode(subheader) && createScopedElement(SubheaderTypography, {
    Component: "span",
    vkuiClass: "Banner__subheader"
  }, subheader), hasReactNode(text) && createScopedElement(Text, {
    vkuiClass: "Banner__text"
  }, text), hasReactNode(actions) && React.Children.count(actions) > 0 && createScopedElement("div", {
    vkuiClass: "Banner__actions"
  }, actions)), !!asideMode && createScopedElement("div", {
    vkuiClass: "Banner__aside"
  }, asideMode === "expand" && createScopedElement(Icon24Chevron, null), asideMode === "dismiss" && createScopedElement(IconButton, {
    "aria-label": dismissLabel,
    vkuiClass: "Banner__dismiss",
    onClick: onDismiss,
    hoverMode: "opacity",
    hasActive: false
  }, platform === IOS ? mode === "image" ? createScopedElement(Icon24DismissDark, null) : createScopedElement(Icon24DismissSubstract, null) : createScopedElement(Icon24Cancel, null)))));
};
//# sourceMappingURL=Banner.js.map