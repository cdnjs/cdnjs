import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Avatar } from '../Avatar/Avatar';
import { Tappable } from '../Tappable/Tappable';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Subhead } from '../Typography/Subhead/Subhead';
const stylesSize = {
    s: "vkuiHorizontalCell--size-s",
    m: "vkuiHorizontalCell--size-m",
    l: "vkuiHorizontalCell--size-l"
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
    var { className, header, style, subtitle, size = 's', children = /*#__PURE__*/ _jsx(Avatar, {
        size: 56
    }), getRootRef, getRef, extraSubtitle } = _param, restProps = _object_without_properties(_param, [
        "className",
        "header",
        "style",
        "subtitle",
        "size",
        "children",
        "getRootRef",
        "getRef",
        "extraSubtitle"
    ]);
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        style: style,
        className: classNames("vkuiHorizontalCell", stylesSize[size], className),
        children: /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
            className: "vkuiHorizontalCell__body",
            getRootRef: getRef
        }, restProps), {
            children: [
                hasReactNode(children) && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiHorizontalCell__image",
                    children: children
                }),
                (header || subtitle || extraSubtitle) && /*#__PURE__*/ _jsxs("div", {
                    className: "vkuiHorizontalCell__content",
                    children: [
                        hasReactNode(header) && /*#__PURE__*/ _jsx(CellTypography, {
                            size: size,
                            children: header
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