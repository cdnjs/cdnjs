import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { Card } from "../Card/Card";
import { Tappable } from "../Tappable/Tappable";
import { Caption } from "../Typography/Caption/Caption";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Headline } from "../Typography/Headline/Headline";
import { Text } from "../Typography/Text/Text";
/**
 * @see https://vkcom.github.io/VKUI/#/ContentCard
 */ export var ContentCard = function(_param) {
    var subtitle = _param.subtitle, header = _param.header, text = _param.text, caption = _param.caption, // card props
    className = _param.className, _param_mode = _param.mode, mode = _param_mode === void 0 ? "shadow" : _param_mode, style = _param.style, getRootRef = _param.getRootRef, // img props
    getRef = _param.getRef, maxHeight = _param.maxHeight, src = _param.src, srcSet = _param.srcSet, _param_alt = _param.alt, alt = _param_alt === void 0 ? "" : _param_alt, width = _param.width, height = _param.height, crossOrigin = _param.crossOrigin, decoding = _param.decoding, loading = _param.loading, referrerPolicy = _param.referrerPolicy, sizes = _param.sizes, useMap = _param.useMap, _param_hasHover = _param.hasHover, hasHover = _param_hasHover === void 0 ? false : _param_hasHover, _param_hasActive = _param.hasActive, hasActive = _param_hasActive === void 0 ? false : _param_hasActive, restProps = _object_without_properties(_param, [
        "subtitle",
        "header",
        "text",
        "caption",
        "className",
        "mode",
        "style",
        "getRootRef",
        "getRef",
        "maxHeight",
        "src",
        "srcSet",
        "alt",
        "width",
        "height",
        "crossOrigin",
        "decoding",
        "loading",
        "referrerPolicy",
        "sizes",
        "useMap",
        "hasHover",
        "hasActive"
    ]);
    return /*#__PURE__*/ React.createElement(Card, {
        mode: mode,
        getRootRef: getRootRef,
        style: style,
        className: classNames(restProps.disabled && "vkuiContentCard--disabled", className)
    }, /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({}, restProps), {
        disabled: restProps.disabled || !restProps.onClick && !restProps.href,
        hasHover: hasHover,
        hasActive: hasActive,
        className: "vkuiContentCard__tappable"
    }), (src || srcSet) && /*#__PURE__*/ React.createElement("img", {
        ref: getRef,
        className: "vkuiContentCard__img",
        src: src,
        srcSet: srcSet,
        alt: alt,
        crossOrigin: crossOrigin,
        decoding: decoding,
        loading: loading,
        referrerPolicy: referrerPolicy,
        sizes: sizes,
        useMap: useMap,
        height: height,
        style: {
            maxHeight: maxHeight
        },
        width: "100%"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiContentCard__body"
    }, hasReactNode(subtitle) && /*#__PURE__*/ React.createElement(Caption, {
        className: classNames("vkuiContentCard__text", "vkuiContentCard__subtitle"),
        weight: "1",
        level: "3",
        caps: true
    }, subtitle), hasReactNode(header) && /*#__PURE__*/ React.createElement(Headline, {
        className: "vkuiContentCard__text",
        weight: "2",
        level: "1"
    }, header), hasReactNode(text) && /*#__PURE__*/ React.createElement(Text, {
        className: "vkuiContentCard__text"
    }, text), hasReactNode(caption) && /*#__PURE__*/ React.createElement(Footnote, {
        className: classNames("vkuiContentCard__text", "vkuiContentCard__caption")
    }, caption))));
};

//# sourceMappingURL=ContentCard.js.map