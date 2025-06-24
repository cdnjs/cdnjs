import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { mergeStyle } from "../../helpers/mergeStyle.js";
import { Avatar } from "../Avatar/Avatar.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
export const CUSTOM_CSS_TOKEN_FOR_CELL_WIDTH = '--vkui_internal--cell_width';
const stylesSize = {
    s: "vkuiHorizontalCell__sizeS",
    m: "vkuiHorizontalCell__sizeM",
    l: "vkuiHorizontalCell__sizeL",
    xl: "vkuiHorizontalCell__sizeXL",
    auto: "vkuiHorizontalCell__sizeAuto"
};
const textAlignClassNames = {
    center: "vkuiHorizontalCell__textAlignCenter",
    end: "vkuiHorizontalCell__textAlignEnd"
};
/**
 * @see https://vkcom.github.io/VKUI/#/HorizontalCell
 */ export const HorizontalCell = (_param)=>{
    var { className, title, style, subtitle, size = 's', children = /*#__PURE__*/ _jsx(Avatar, {
        size: 56
    }), getRootRef, getRef, extraSubtitle, textAlign = size === 's' ? 'center' : 'start', noPadding = false, TitleComponent = size === 's' ? Caption : Subhead } = _param, restProps = _object_without_properties(_param, [
        "className",
        "title",
        "style",
        "subtitle",
        "size",
        "children",
        "getRootRef",
        "getRef",
        "extraSubtitle",
        "textAlign",
        "noPadding",
        "TitleComponent"
    ]);
    const hasTypography = hasReactNode(title) || hasReactNode(subtitle) || hasReactNode(extraSubtitle);
    const customProperties = typeof size === 'number' ? {
        [CUSTOM_CSS_TOKEN_FOR_CELL_WIDTH]: `${size}px`
    } : undefined;
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        style: mergeStyle(customProperties, style),
        className: classNames("vkuiHorizontalCell__host", typeof size === 'string' && stylesSize[size], size !== 'auto' && "vkuiHorizontalCell__sized", typeof size === 'number' && "vkuiHorizontalCell__customSize", noPadding && "vkuiHorizontalCell__noPadding", className),
        children: /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
            className: "vkuiHorizontalCell__body",
            getRootRef: getRef
        }, restProps), {
            children: [
                hasReactNode(children) && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiHorizontalCell__image",
                    children: children
                }),
                hasTypography && /*#__PURE__*/ _jsxs("div", {
                    className: classNames("vkuiHorizontalCell__content", textAlign !== 'start' && textAlignClassNames[textAlign]),
                    children: [
                        hasReactNode(title) && /*#__PURE__*/ _jsx(TitleComponent, {
                            children: title
                        }),
                        hasReactNode(subtitle) && /*#__PURE__*/ _jsx(Footnote, {
                            className: "vkuiHorizontalCell__subtitle",
                            children: subtitle
                        }),
                        hasReactNode(extraSubtitle) && /*#__PURE__*/ _jsx(Footnote, {
                            className: "vkuiHorizontalCell__subtitle",
                            children: extraSubtitle
                        })
                    ]
                })
            ]
        }))
    });
};

//# sourceMappingURL=HorizontalCell.js.map