import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon24Cancel, Icon24Chevron, Icon24Dismiss, Icon24DismissDark } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { IconButton } from "../IconButton/IconButton";
import { RootComponent } from "../RootComponent/RootComponent";
import { Tappable } from "../Tappable/Tappable";
import { Headline } from "../Typography/Headline/Headline";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";
/**
 * @see https://vkcom.github.io/VKUI/#/Banner
 */ export var Banner = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "tint" : _param_mode, _param_imageTheme = _param.imageTheme, imageTheme = _param_imageTheme === void 0 ? "dark" : _param_imageTheme, _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, before = _param.before, asideMode = _param.asideMode, header = _param.header, subheader = _param.subheader, text = _param.text, children = _param.children, background = _param.background, actions = _param.actions, onDismiss = _param.onDismiss, _param_dismissLabel = _param.dismissLabel, dismissLabel = _param_dismissLabel === void 0 ? "Скрыть" : _param_dismissLabel, noPadding = _param.noPadding, restProps = _object_without_properties(_param, [
        "mode",
        "imageTheme",
        "size",
        "before",
        "asideMode",
        "header",
        "subheader",
        "text",
        "children",
        "background",
        "actions",
        "onDismiss",
        "dismissLabel",
        "noPadding"
    ]);
    var platform = usePlatform();
    var HeaderTypography = size === "m" ? Title : Headline;
    var SubheaderTypography = size === "m" ? Text : Subhead;
    var IconDismissIOS = mode === "image" ? Icon24DismissDark : Icon24Dismiss;
    var content = /*#__PURE__*/ React.createElement(React.Fragment, null, mode === "image" && background && /*#__PURE__*/ React.createElement("div", {
        "aria-hidden": true,
        className: "vkuiBanner__bg"
    }, background), before && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBanner__before"
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBanner__content"
    }, hasReactNode(header) && /*#__PURE__*/ React.createElement(HeaderTypography, {
        Component: "p",
        weight: "2",
        level: size === "m" ? "2" : "1"
    }, header), hasReactNode(subheader) && /*#__PURE__*/ React.createElement(SubheaderTypography, {
        Component: "p",
        className: "vkuiBanner__subheader"
    }, subheader), hasReactNode(text) && /*#__PURE__*/ React.createElement(Text, {
        Component: "p",
        className: "vkuiBanner__text"
    }, text), hasReactNode(actions) && React.Children.count(actions) > 0 && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBanner__actions"
    }, actions)));
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({
        Component: "section"
    }, restProps), {
        baseClassName: classNames("vkuiBanner", !noPadding && "vkuiBanner--withPadding", platform === Platform.IOS && "vkuiBanner--ios", mode === "image" && "vkuiBanner--mode-image", size === "m" && "vkuiBanner--size-m", mode === "image" && imageTheme === "dark" && "vkuiBanner--inverted")
    }), asideMode === "expand" ? /*#__PURE__*/ React.createElement(Tappable, {
        className: "vkuiBanner__in",
        activeMode: platform === Platform.IOS ? "opacity" : "background",
        role: "button"
    }, content, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBanner__aside"
    }, /*#__PURE__*/ React.createElement(Icon24Chevron, {
        className: "vkuiBanner__expand"
    }))) : /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBanner__in"
    }, content, asideMode === "dismiss" && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBanner__aside"
    }, /*#__PURE__*/ React.createElement(IconButton, {
        "aria-label": dismissLabel,
        className: "vkuiBanner__dismiss",
        onClick: onDismiss,
        hoverMode: "opacity",
        hasActive: false
    }, platform === Platform.IOS ? /*#__PURE__*/ React.createElement(IconDismissIOS, null) : /*#__PURE__*/ React.createElement(Icon24Cancel, null)))));
};

//# sourceMappingURL=Banner.js.map