import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { getFetchPriorityProp } from "../../lib/utils.js";
import { Card } from "../Card/Card.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { Text } from "../Typography/Text/Text.js";
/**
 * @see https://vkui.io/components/content-card
 */ export const ContentCard = (_param)=>{
    var { overTitle, title, titleComponent = 'span', description, caption, // card props
    className, mode = 'shadow', style, getRootRef, // img props
    getRef, maxHeight, src, srcSet, alt = '', width = '100%', height, crossOrigin, decoding, loading, referrerPolicy, sizes, useMap, fetchPriority, imageObjectFit, hasHover = false, hasActive = false, Component = 'li' } = _param, restProps = _object_without_properties(_param, [
        "overTitle",
        "title",
        "titleComponent",
        "description",
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
        "fetchPriority",
        "imageObjectFit",
        "hasHover",
        "hasActive",
        "Component"
    ]);
    return /*#__PURE__*/ _jsx(Card, {
        mode: mode,
        getRootRef: getRootRef,
        Component: Component,
        style: style,
        className: classNames(restProps.disabled && "vkuiContentCard__disabled", className),
        children: /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
            hasHover: hasHover,
            hasActive: hasActive
        }, restProps), {
            baseClassName: "vkuiContentCard__tappable",
            children: [
                (src || srcSet) && /*#__PURE__*/ _jsx("img", _object_spread_props(_object_spread({
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
                    useMap: useMap
                }, getFetchPriorityProp(fetchPriority)), {
                    height: height,
                    width: width,
                    style: {
                        maxHeight,
                        objectFit: imageObjectFit
                    }
                })),
                /*#__PURE__*/ _jsxs("div", {
                    className: "vkuiContentCard__body",
                    children: [
                        hasReactNode(overTitle) && /*#__PURE__*/ _jsx(Caption, {
                            className: classNames("vkuiContentCard__text", "vkuiContentCard__overTitle"),
                            weight: "1",
                            level: "3",
                            caps: true,
                            children: overTitle
                        }),
                        hasReactNode(title) && /*#__PURE__*/ _jsx(Headline, {
                            className: "vkuiContentCard__text",
                            weight: "2",
                            level: "1",
                            Component: titleComponent,
                            children: title
                        }),
                        hasReactNode(description) && /*#__PURE__*/ _jsx(Text, {
                            className: "vkuiContentCard__text",
                            children: description
                        }),
                        hasReactNode(caption) && /*#__PURE__*/ _jsx(Footnote, {
                            className: classNames("vkuiContentCard__text", "vkuiContentCard__caption"),
                            children: caption
                        })
                    ]
                })
            ]
        }))
    });
};

//# sourceMappingURL=ContentCard.js.map