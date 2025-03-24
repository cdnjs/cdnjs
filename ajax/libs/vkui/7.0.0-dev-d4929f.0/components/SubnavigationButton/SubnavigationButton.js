'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Dropdown } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
const appearanceStyles = {
    accent: "SubnavigationButton__appearanceAccent--eg-VE",
    neutral: "SubnavigationButton__appearanceNeutral--PM60e"
};
const modeStyles = {
    primary: "SubnavigationButton__modePrimary--DjF7c",
    outline: "SubnavigationButton__modeOutline--3pcAs",
    tertiary: "SubnavigationButton__modeTertiary---AYz5"
};
const sizeStyles = {
    s: "SubnavigationButton__sizeS--0Wztr",
    m: "SubnavigationButton__sizeM--gD9HV",
    l: "SubnavigationButton__sizeL--5h4B2"
};
const sizeYClassNames = {
    none: "SubnavigationButton__sizeYNone--yszHU",
    compact: "SubnavigationButton__sizeYCompact--jmre6"
};
const SubnavigationButtonTypography = (_param)=>{
    var { textLevel } = _param, restProps = _object_without_properties(_param, [
        "textLevel"
    ]);
    if (textLevel === '1') {
        return /*#__PURE__*/ _jsx(Subhead, _object_spread({}, restProps));
    }
    return /*#__PURE__*/ _jsx(Caption, _object_spread({
        level: textLevel === '2' ? '1' : '2'
    }, restProps));
};
/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationButton
 */ export const SubnavigationButton = (_param)=>{
    var { mode = 'primary', appearance = 'accent', size = 'm', selected, textLevel = '1', before, after, chevron, children, className } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "appearance",
        "size",
        "selected",
        "textLevel",
        "before",
        "after",
        "chevron",
        "children",
        "className"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Tappable, _object_spread_props(_object_spread({}, restProps), {
        hasActive: false,
        focusVisibleMode: "outside",
        className: classNames("SubnavigationButton__host---2LOF", sizeStyles[size], modeStyles[mode], appearanceStyles[appearance], selected && "SubnavigationButton__selected---j6WJ", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        children: /*#__PURE__*/ _jsxs("span", {
            className: "SubnavigationButton__in--hksX-",
            children: [
                before && /*#__PURE__*/ _jsx("span", {
                    className: "SubnavigationButton__before--F2bcg",
                    children: before
                }),
                /*#__PURE__*/ _jsx(SubnavigationButtonTypography, {
                    textLevel: textLevel,
                    className: "SubnavigationButton__label--e-2Vy",
                    Component: "span",
                    children: children
                }),
                after && /*#__PURE__*/ _jsx("span", {
                    className: "SubnavigationButton__after--hnS-k",
                    children: after
                }),
                chevron && /*#__PURE__*/ _jsx(Icon16Dropdown, {
                    className: "SubnavigationButton__chevronIcon--wX-dT"
                })
            ]
        })
    }));
};

//# sourceMappingURL=SubnavigationButton.js.map