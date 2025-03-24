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
    s: "HorizontalCell__sizeS--TMe1L",
    m: "HorizontalCell__sizeM--CvTeu",
    l: "HorizontalCell__sizeL--xCr8V",
    xl: "HorizontalCell__sizeXL--LFFIX",
    auto: "HorizontalCell__sizeAuto--QzXH-"
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
        className: classNames("HorizontalCell__host--too1E", typeof size === 'string' && stylesSize[size], size !== 'auto' && "HorizontalCell__sized--zNOLx", className),
        children: /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
            className: "HorizontalCell__body--mOLd4",
            getRootRef: getRef
        }, restProps), {
            children: [
                hasReactNode(children) && /*#__PURE__*/ _jsx("div", {
                    className: "HorizontalCell__image--Kbl2A",
                    children: children
                }),
                hasTypography && /*#__PURE__*/ _jsxs("div", {
                    className: "HorizontalCell__content--2LcSH",
                    children: [
                        hasReactNode(title) && /*#__PURE__*/ _jsx(CellTypography, {
                            size: size,
                            children: title
                        }),
                        hasReactNode(subtitle) && /*#__PURE__*/ _jsx(Footnote, {
                            className: "HorizontalCell__subtitle--jC34e",
                            children: subtitle
                        }),
                        hasReactNode(extraSubtitle) && /*#__PURE__*/ _jsx(Footnote, {
                            className: "HorizontalCell__subtitle--jC34e",
                            children: extraSubtitle
                        })
                    ]
                })
            ]
        }))
    });
};

//# sourceMappingURL=HorizontalCell.js.map