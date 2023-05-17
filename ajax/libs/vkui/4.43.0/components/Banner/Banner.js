import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "imageTheme", "size", "before", "asideMode", "header", "subheader", "text", "children", "background", "actions", "onDismiss", "dismissLabel"];
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
/**
 * @see https://vkcom.github.io/VKUI/#/Banner
 */
export var Banner = function Banner(_ref) {
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
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var HeaderTypography = size === "m" ? Title : Headline;
  var SubheaderTypography = size === "m" ? Text : Subhead;
  var IconDismissIOS = mode === "image" ? Icon24DismissDark : Icon24DismissSubstract;
  var content = createScopedElement(React.Fragment, null, mode === "image" && background && createScopedElement("div", {
    "aria-hidden": "true",
    vkuiClass: "Banner__bg"
  }, background), before && createScopedElement("div", {
    vkuiClass: "Banner__before"
  }, before), createScopedElement("div", {
    vkuiClass: "Banner__content"
  }, hasReactNode(header) && createScopedElement(HeaderTypography, {
    Component: "span",
    vkuiClass: "Banner__header",
    weight: "2",
    level: size === "m" ? "2" : "1"
  }, header), hasReactNode(subheader) && createScopedElement(SubheaderTypography, {
    Component: "span",
    vkuiClass: "Banner__subheader"
  }, subheader), hasReactNode(text) && createScopedElement(Text, {
    vkuiClass: "Banner__text"
  }, text), hasReactNode(actions) && React.Children.count(actions) > 0 && createScopedElement("div", {
    vkuiClass: "Banner__actions"
  }, actions)));
  return createScopedElement("section", _extends({}, restProps, {
    vkuiClass: classNames("Banner", platform === IOS && "Banner--ios", "Banner--md-".concat(mode), "Banner--sz-".concat(size), mode === "image" && imageTheme === "dark" && "Banner--inverted")
  }), asideMode === "expand" ? createScopedElement(Tappable, {
    vkuiClass: "Banner__in",
    activeMode: platform === IOS ? "opacity" : "background",
    role: "button"
  }, content, createScopedElement("div", {
    vkuiClass: "Banner__aside"
  }, createScopedElement(Icon24Chevron, null))) : createScopedElement("div", {
    vkuiClass: "Banner__in"
  }, content, asideMode === "dismiss" && createScopedElement("div", {
    vkuiClass: "Banner__aside"
  }, createScopedElement(IconButton, {
    "aria-label": dismissLabel,
    vkuiClass: "Banner__dismiss",
    onClick: onDismiss,
    hoverMode: "opacity",
    hasActive: false
  }, platform === IOS ? createScopedElement(IconDismissIOS, null) : createScopedElement(Icon24Cancel, null)))));
};
//# sourceMappingURL=Banner.js.map