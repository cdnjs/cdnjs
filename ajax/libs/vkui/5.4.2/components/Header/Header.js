import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames, hasReactNode, isPrimitiveReactNode } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Headline } from "../Typography/Headline/Headline";
import { Paragraph } from "../Typography/Paragraph/Paragraph";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Title } from "../Typography/Title/Title";
var HeaderContent = function(_param) {
    var mode = _param.mode, size = _param.size, restProps = _object_without_properties(_param, [
        "mode",
        "size"
    ]);
    var isLarge = size === "large";
    var platform = usePlatform();
    if (platform === Platform.IOS) {
        switch(mode){
            case "primary":
                return isLarge ? /*#__PURE__*/ React.createElement(Title, _object_spread({
                    level: "2",
                    weight: "2"
                }, restProps)) : /*#__PURE__*/ React.createElement(Title, _object_spread({
                    weight: "1",
                    level: "3"
                }, restProps));
            case "secondary":
                return /*#__PURE__*/ React.createElement(Footnote, _object_spread({
                    weight: "1",
                    caps: true
                }, restProps));
            case "tertiary":
                return /*#__PURE__*/ React.createElement(Title, _object_spread({
                    weight: "1",
                    level: "3"
                }, restProps));
        }
    }
    if (platform === Platform.VKCOM) {
        switch(mode){
            case "primary":
                return isLarge ? /*#__PURE__*/ React.createElement(Title, _object_spread({
                    level: "2",
                    weight: "1"
                }, restProps)) : /*#__PURE__*/ React.createElement(Headline, _object_spread({
                    level: "1",
                    weight: "2"
                }, restProps));
            case "secondary":
                return /*#__PURE__*/ React.createElement(Footnote, _object_spread({
                    caps: true,
                    weight: "1"
                }, restProps));
            case "tertiary":
                return /*#__PURE__*/ React.createElement(Footnote, restProps);
        }
    }
    switch(mode){
        case "primary":
            return isLarge ? /*#__PURE__*/ React.createElement(Title, _object_spread({
                level: "2",
                weight: "2"
            }, restProps)) : /*#__PURE__*/ React.createElement(Headline, _object_spread({
                weight: "2"
            }, restProps));
        case "secondary":
            return /*#__PURE__*/ React.createElement(Footnote, _object_spread({
                weight: "1",
                caps: true
            }, restProps));
        case "tertiary":
            return /*#__PURE__*/ React.createElement(Headline, _object_spread({
                weight: "2"
            }, restProps));
    }
    return null;
};
/**
 * @see https://vkcom.github.io/VKUI/#/Header
 */ export var Header = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "primary" : _param_mode, _param_size = _param.size, size = _param_size === void 0 ? "regular" : _param_size, children = _param.children, subtitle = _param.subtitle, indicator = _param.indicator, aside = _param.aside, getRootRef = _param.getRootRef, multiline = _param.multiline, className = _param.className, restProps = _object_without_properties(_param, [
        "mode",
        "size",
        "children",
        "subtitle",
        "indicator",
        "aside",
        "getRootRef",
        "multiline",
        "className"
    ]);
    var platform = usePlatform();
    var AsideTypography = platform === Platform.VKCOM ? Subhead : Paragraph;
    return /*#__PURE__*/ React.createElement("header", _object_spread_props(_object_spread({}, restProps), {
        ref: getRootRef,
        className: classNames("vkuiHeader", platform === Platform.VKCOM && "vkuiHeader--vkcom", platform === Platform.ANDROID && "vkuiHeader--android", platform === Platform.IOS && "vkuiHeader--ios", {
            primary: "vkuiHeader--mode-primary",
            secondary: "vkuiHeader--mode-secondary",
            tertiary: "vkuiHeader--mode-tertiary"
        }[mode], isPrimitiveReactNode(indicator) && "vkuiHeader--pi", hasReactNode(subtitle) && "vkuiHeader--with-subtitle", className)
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiHeader__main"
    }, /*#__PURE__*/ React.createElement(HeaderContent, {
        className: "vkuiHeader__content",
        Component: "span",
        mode: mode,
        size: size
    }, /*#__PURE__*/ React.createElement("span", {
        className: classNames("vkuiHeader__content-in", multiline && "vkuiHeader__content-in--multiline")
    }, children), hasReactNode(indicator) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiHeader__indicator",
        weight: "2"
    }, indicator)), hasReactNode(subtitle) && /*#__PURE__*/ React.createElement(Subhead, {
        className: "vkuiHeader__subtitle",
        Component: "span"
    }, subtitle)), hasReactNode(aside) && /*#__PURE__*/ React.createElement(AsideTypography, {
        className: "vkuiHeader__aside",
        Component: "span"
    }, aside));
};

//# sourceMappingURL=Header.js.map