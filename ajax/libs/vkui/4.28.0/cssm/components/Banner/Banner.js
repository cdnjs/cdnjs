import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size"],
    _excluded2 = ["size"],
    _excluded3 = ["mode", "imageTheme", "size", "before", "asideMode", "header", "subheader", "text", "children", "background", "actions", "onDismiss", "dismissLabel"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { ANDROID, IOS, VKCOM } from "../../lib/platform";
import { hasReactNode } from "../../lib/utils";
import { Icon24Chevron, Icon24DismissSubstract, Icon24DismissDark, Icon24Cancel } from "@vkontakte/icons";
import Tappable from "../Tappable/Tappable";
import IconButton from "../IconButton/IconButton";
import Headline from "../Typography/Headline/Headline";
import Subhead from "../Typography/Subhead/Subhead";
import Text from "../Typography/Text/Text";
import Title from "../Typography/Title/Title";
import "./Banner.css";

var BannerHeader = function BannerHeader(_ref) {
  var size = _ref.size,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return size === "m" ? createScopedElement(Title, _extends({
    level: "2",
    weight: "2"
  }, restProps)) : createScopedElement(Headline, _extends({
    weight: "medium"
  }, restProps));
};

var BannerSubheader = function BannerSubheader(_ref2) {
  var size = _ref2.size,
      restProps = _objectWithoutProperties(_ref2, _excluded2);

  return size === "m" ? createScopedElement(Text, _extends({
    weight: "regular"
  }, restProps)) : createScopedElement(Subhead, restProps);
};

var Banner = function Banner(props) {
  var platform = usePlatform();

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
      restProps = _objectWithoutProperties(props, _excluded3);

  return createScopedElement("section", _extends({}, restProps, {
    vkuiClass: classNames(getClassName("Banner", platform), "Banner--md-".concat(mode), "Banner--sz-".concat(size), {
      "Banner--inverted": mode === "image" && imageTheme === "dark"
    })
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
  }, header), hasReactNode(subheader) && createScopedElement(BannerSubheader, {
    Component: "span",
    size: size,
    vkuiClass: "Banner__subheader"
  }, subheader), hasReactNode(text) && createScopedElement(Text, {
    weight: "regular",
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
  }, (platform === ANDROID || platform === VKCOM) && createScopedElement(Icon24Cancel, null), platform === IOS && (mode === "image" ? createScopedElement(Icon24DismissDark, null) : createScopedElement(Icon24DismissSubstract, null))))));
};

Banner.defaultProps = {
  dismissLabel: "Скрыть",
  mode: "tint",
  size: "s",
  imageTheme: "dark"
}; // eslint-disable-next-line import/no-default-export

export default Banner;
//# sourceMappingURL=Banner.js.map