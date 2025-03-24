'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { RichCellIcon } from "./RichCellIcon/RichCellIcon.js";
const sizeYClassNames = {
    none: "RichCell__sizeYNone--DZV-A",
    compact: "RichCell__sizeYCompact---gYcL"
};
const alignAfterClassNames = {
    start: "RichCell__contentAfterAlignStart--3xCp-",
    center: "RichCell__contentAfterAlignCenter--kGe-E",
    end: "RichCell__contentAfterAlignEnd--0n0B2"
};
/**
 * @see https://vkcom.github.io/VKUI/#/RichCell
 */ export const RichCell = (_param)=>{
    var { overTitle, children, subtitle, extraSubtitle, before, after, afterCaption, bottom, actions, multiline, className, afterAlign = 'start' } = _param, restProps = _object_without_properties(_param, [
        "overTitle",
        "children",
        "subtitle",
        "extraSubtitle",
        "before",
        "after",
        "afterCaption",
        "bottom",
        "actions",
        "multiline",
        "className",
        "afterAlign"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const afterRender = ()=>{
        if (!after && !afterCaption) {
            return;
        }
        return /*#__PURE__*/ _jsxs("div", {
            className: classNames("RichCell__contentAfter--F7yVO", alignAfterClassNames[afterAlign]),
            children: [
                after && /*#__PURE__*/ _jsx("div", {
                    className: "RichCell__afterChildren--KcKqD",
                    children: after
                }),
                afterCaption && /*#__PURE__*/ _jsx("div", {
                    className: "RichCell__afterCaption--2fVyr",
                    children: afterCaption
                })
            ]
        });
    };
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("RichCell__host--XubAj", !multiline && "RichCell__textEllipsis--rZIFt", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: "RichCell__before--cKB9p",
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "RichCell__inWrapper--cwWV2",
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: "RichCell__in--fStPw",
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "RichCell__content--eFjV7",
                                children: [
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "RichCell__contentBefore--g-aZz",
                                        children: [
                                            overTitle && /*#__PURE__*/ _jsx(Subhead, {
                                                Component: "div",
                                                className: "RichCell__overTitle--fL7uY",
                                                children: overTitle
                                            }),
                                            /*#__PURE__*/ _jsx("div", {
                                                className: "RichCell__children--CSDz-",
                                                children: children
                                            }),
                                            subtitle && /*#__PURE__*/ _jsx("div", {
                                                className: "RichCell__subtitle--2E15W",
                                                children: subtitle
                                            }),
                                            extraSubtitle && /*#__PURE__*/ _jsx(Subhead, {
                                                Component: "div",
                                                className: "RichCell__extraSubtitle--0GgAp",
                                                children: extraSubtitle
                                            })
                                        ]
                                    }),
                                    afterAlign === 'start' && afterRender()
                                ]
                            }),
                            bottom && /*#__PURE__*/ _jsx("div", {
                                className: "RichCell__bottom--xU1yc",
                                children: bottom
                            }),
                            actions && /*#__PURE__*/ _jsx("div", {
                                className: "RichCell__actions--v7173",
                                children: actions
                            })
                        ]
                    }),
                    afterAlign !== 'start' && afterRender()
                ]
            })
        ]
    }));
};
RichCell.Icon = RichCellIcon;

//# sourceMappingURL=RichCell.js.map