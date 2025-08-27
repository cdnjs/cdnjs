import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Chevron } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { Tappable } from "../Tappable/Tappable.js";
import { Paragraph } from "../Typography/Paragraph/Paragraph.js";
const stylesMode = {
    add: "vkuiMiniInfoCell__modeAdd",
    accent: "vkuiMiniInfoCell__modeAccent",
    more: "vkuiMiniInfoCell__modeMore"
};
const stylesTextWrap = {
    nowrap: "vkuiMiniInfoCell__textWrapNowrap",
    full: "vkuiMiniInfoCell__textWrapFull",
    short: "vkuiMiniInfoCell__textWrapShort"
};
/**
 * @see https://vkui.io/components/mini-info-cell
 */ export const MiniInfoCell = (_param)=>{
    var { before, after, children, mode = 'base', textWrap = 'nowrap', chevron = false } = _param, restProps = _object_without_properties(_param, [
        "before",
        "after",
        "children",
        "mode",
        "textWrap",
        "chevron"
    ]);
    const cellClasses = classNames("vkuiMiniInfoCell__host", stylesTextWrap[textWrap], mode !== 'base' && stylesMode[mode]);
    const cellContent = /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            hasReactNode(before) && /*#__PURE__*/ _jsx("span", {
                className: "vkuiMiniInfoCell__before",
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiMiniInfoCell__middle",
                children: [
                    /*#__PURE__*/ _jsx(Paragraph, {
                        className: "vkuiMiniInfoCell__content",
                        weight: mode === 'more' ? '2' : undefined,
                        children: children
                    }),
                    chevron && /*#__PURE__*/ _jsx(Icon16Chevron, {})
                ]
            }),
            hasReactNode(after) && /*#__PURE__*/ _jsx("span", {
                className: "vkuiMiniInfoCell__after",
                children: after
            })
        ]
    });
    return /*#__PURE__*/ _jsx(Tappable, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: cellClasses,
        children: cellContent
    }));
};

//# sourceMappingURL=MiniInfoCell.js.map