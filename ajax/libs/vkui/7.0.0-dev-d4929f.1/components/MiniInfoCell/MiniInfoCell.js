import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Chevron } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Paragraph } from "../Typography/Paragraph/Paragraph.js";
const stylesMode = {
    add: "MiniInfoCell__modeAdd--zIouG",
    accent: "MiniInfoCell__modeAccent--I-ye-",
    more: "MiniInfoCell__modeMore--Dqtq2"
};
const stylesTextWrap = {
    nowrap: "MiniInfoCell__textWrapNowrap--ci6zp",
    full: "MiniInfoCell__textWrapFull---Gba2",
    short: "MiniInfoCell__textWrapShort--u0717"
};
/**
 * @see https://vkcom.github.io/VKUI/#/MiniInfoCell
 */ export const MiniInfoCell = (_param)=>{
    var { before, after, children, mode = 'base', textWrap = 'nowrap', chevron = false, className } = _param, restProps = _object_without_properties(_param, [
        "before",
        "after",
        "children",
        "mode",
        "textWrap",
        "chevron",
        "className"
    ]);
    const cellClasses = classNames("MiniInfoCell__host--1UwWH", stylesTextWrap[textWrap], mode !== 'base' && stylesMode[mode], className);
    const cellContent = /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            hasReactNode(before) && /*#__PURE__*/ _jsx("span", {
                className: "MiniInfoCell__before--p9s2L",
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "MiniInfoCell__middle--iKDU9",
                children: [
                    /*#__PURE__*/ _jsx(Paragraph, {
                        className: "MiniInfoCell__content--udy26",
                        weight: mode === 'more' ? '2' : undefined,
                        children: children
                    }),
                    chevron && /*#__PURE__*/ _jsx(Icon16Chevron, {})
                ]
            }),
            hasReactNode(after) && /*#__PURE__*/ _jsx("span", {
                className: "MiniInfoCell__after--wdxmy",
                children: after
            })
        ]
    });
    return restProps.onClick ? /*#__PURE__*/ _jsx(Tappable, _object_spread_props(_object_spread({
        Component: "div",
        role: "button"
    }, restProps), {
        className: cellClasses,
        children: cellContent
    })) : /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: cellClasses,
        children: cellContent
    }));
};

//# sourceMappingURL=MiniInfoCell.js.map