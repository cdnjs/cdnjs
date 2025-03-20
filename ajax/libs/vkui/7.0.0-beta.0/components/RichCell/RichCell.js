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
    none: "vkuiRichCell__sizeYNone",
    compact: "vkuiRichCell__sizeYCompact"
};
const alignAfterClassNames = {
    start: "vkuiRichCell__contentAfterAlignStart",
    center: "vkuiRichCell__contentAfterAlignCenter",
    end: "vkuiRichCell__contentAfterAlignEnd"
};
/**
 * @see https://vkcom.github.io/VKUI/#/RichCell
 */ export const RichCell = (_param)=>{
    var { subhead, children, text, caption, before, after, afterCaption, bottom, actions, multiline, className, afterAlign = 'start' } = _param, restProps = _object_without_properties(_param, [
        "subhead",
        "children",
        "text",
        "caption",
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
            className: classNames("vkuiRichCell__contentAfter", alignAfterClassNames[afterAlign]),
            children: [
                after && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiRichCell__afterChildren",
                    children: after
                }),
                afterCaption && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiRichCell__afterCaption",
                    children: afterCaption
                })
            ]
        });
    };
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiRichCell__host", !multiline && "vkuiRichCell__textEllipsis", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: "vkuiRichCell__before",
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiRichCell__in",
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: "vkuiRichCell__content",
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "vkuiRichCell__contentBefore",
                                children: [
                                    subhead && /*#__PURE__*/ _jsx(Subhead, {
                                        Component: "div",
                                        className: "vkuiRichCell__subhead",
                                        children: subhead
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "vkuiRichCell__children",
                                        children: children
                                    }),
                                    text && /*#__PURE__*/ _jsx("div", {
                                        className: "vkuiRichCell__text",
                                        children: text
                                    }),
                                    caption && /*#__PURE__*/ _jsx(Subhead, {
                                        Component: "div",
                                        className: "vkuiRichCell__caption",
                                        children: caption
                                    })
                                ]
                            }),
                            afterAlign === 'start' && afterRender()
                        ]
                    }),
                    bottom && /*#__PURE__*/ _jsx("div", {
                        className: "vkuiRichCell__bottom",
                        children: bottom
                    }),
                    actions && /*#__PURE__*/ _jsx("div", {
                        className: "vkuiRichCell__actions",
                        children: actions
                    })
                ]
            }),
            afterAlign !== 'start' && afterRender()
        ]
    }));
};
RichCell.Icon = RichCellIcon;

//# sourceMappingURL=RichCell.js.map