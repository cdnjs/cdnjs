import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
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
const CellTypography = (_param)=>{
    var { size, children } = _param, restProps = _object_without_properties(_param, [
        "size",
        "children"
    ]);
    return size === 's' ? /*#__PURE__*/ _jsx(Caption, _object_spread_props(_object_spread({}, restProps), {
        children: children
    })) : /*#__PURE__*/ _jsx(Subhead, _object_spread_props(_object_spread({}, restProps), {
        children: children
    }));
};
/**
 * @see https://vkcom.github.io/VKUI/#/HorizontalCell
 */ export const HorizontalCell = (_param)=>{
    var { className, title, style, subtitle, size = 's', children = /*#__PURE__*/ _jsx(Avatar, {
        size: 56
    }), getRootRef, getRef, extraSubtitle } = _param, restProps = _object_without_properties(_param, [
        "className",
        "title",
        "style",
        "subtitle",
        "size",
        "children",
        "getRootRef",
        "getRef",
        "extraSubtitle"
    ]);
    const hasTypography = hasReactNode(title) || hasReactNode(subtitle) || hasReactNode(extraSubtitle);
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        style: _object_spread({}, typeof size === 'number' && {
            [CUSTOM_CSS_TOKEN_FOR_CELL_WIDTH]: `${size}px`
        }, style),
        className: classNames("vkuiHorizontalCell__host", typeof size === 'string' && stylesSize[size], size !== 'auto' && "vkuiHorizontalCell__sized", className),
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
                    className: "vkuiHorizontalCell__content",
                    children: [
                        hasReactNode(title) && /*#__PURE__*/ _jsx(CellTypography, {
                            size: size,
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