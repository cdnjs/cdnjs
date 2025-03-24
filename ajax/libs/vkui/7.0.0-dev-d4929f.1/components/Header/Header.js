'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode, isPrimitiveReactNode } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { Paragraph } from "../Typography/Paragraph/Paragraph.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { Title } from "../Typography/Title/Title.js";
const sizeClassNames = {
    s: "Header__sizeS--oqxI-",
    m: "Header__sizeM--lWAXy",
    l: "Header__sizeL--hsrWT",
    xl: "Header__sizeXl--Sq13Z"
};
const HeaderContent = (_param)=>{
    var { size } = _param, restProps = _object_without_properties(_param, [
        "size"
    ]);
    switch(size){
        case 'xl':
            return /*#__PURE__*/ _jsx(Title, _object_spread({
                level: "2",
                weight: "1"
            }, restProps));
        case 'l':
            return /*#__PURE__*/ _jsx(Title, _object_spread({
                level: "3",
                weight: "1"
            }, restProps));
        case 'm':
            return /*#__PURE__*/ _jsx(Headline, _object_spread({}, restProps));
        case 's':
            return /*#__PURE__*/ _jsx(Footnote, _object_spread({
                caps: true,
                weight: "1"
            }, restProps));
    }
    return null;
};
const Subtitle = ({ subtitleComponent, children, multiline, size })=>{
    const SubtitleElement = size === 'm' || size === 's' ? Caption : Subhead;
    return /*#__PURE__*/ _jsx(SubtitleElement, {
        className: classNames("Header__subtitle--x-VvQ", multiline && "Header__contentMultiline--J89Mu"),
        Component: subtitleComponent,
        children: children
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/Header
 */ export const Header = (_param)=>{
    var { size = 'm', Component = 'h2', children, subtitle, subtitleComponent = 'span', indicator, after, multiline, before, beforeTitle, afterTitle, beforeSubtitle, afterSubtitle } = _param, restProps = _object_without_properties(_param, [
        "size",
        "Component",
        "children",
        "subtitle",
        "subtitleComponent",
        "indicator",
        "after",
        "multiline",
        "before",
        "beforeTitle",
        "afterTitle",
        "beforeSubtitle",
        "afterSubtitle"
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("Header__host--UuhX0", sizeClassNames[size], isPrimitiveReactNode(indicator) && "Header__pi--aKaJ4"),
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: classNames("Header__before--8uRre", subtitle && "Header__beforeWithSubtitle--QMU4m"),
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "Header__main--jBVyu",
                children: [
                    /*#__PURE__*/ _jsxs(HeaderContent, {
                        className: "Header__content--tEqBX",
                        Component: Component,
                        size: size,
                        children: [
                            beforeTitle && /*#__PURE__*/ _jsx("div", {
                                className: "Header__contentBefore--d9Yyf",
                                children: beforeTitle
                            }),
                            /*#__PURE__*/ _jsx("span", {
                                className: classNames("Header__contentIn--nUk11", multiline && "Header__contentMultiline--J89Mu"),
                                children: children
                            }),
                            afterTitle && /*#__PURE__*/ _jsx("div", {
                                className: "Header__contentAfter--mAigi",
                                children: afterTitle
                            }),
                            hasReactNode(indicator) && /*#__PURE__*/ _jsx(Footnote, {
                                className: "Header__indicator--diq9Y",
                                weight: "2",
                                children: indicator
                            })
                        ]
                    }),
                    hasReactNode(subtitle) && /*#__PURE__*/ _jsxs("div", {
                        className: "Header__subtitleWrapper--kKGMR",
                        children: [
                            beforeSubtitle && /*#__PURE__*/ _jsx("div", {
                                className: "Header__subtitleBefore--zIMQ-",
                                children: beforeSubtitle
                            }),
                            /*#__PURE__*/ _jsx(Subtitle, {
                                multiline: multiline,
                                subtitleComponent: subtitleComponent,
                                size: size,
                                children: subtitle
                            }),
                            afterSubtitle && /*#__PURE__*/ _jsx("div", {
                                className: "Header__subtitleAfter--6rzd-",
                                children: afterSubtitle
                            })
                        ]
                    })
                ]
            }),
            hasReactNode(after) && /*#__PURE__*/ _jsx(Paragraph, {
                className: "Header__after--yy6oa",
                Component: "span",
                children: after
            })
        ]
    }));
};

//# sourceMappingURL=Header.js.map