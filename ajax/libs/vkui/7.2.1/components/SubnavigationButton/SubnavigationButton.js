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
    accent: "vkuiSubnavigationButton__appearanceAccent",
    neutral: "vkuiSubnavigationButton__appearanceNeutral"
};
const modeStyles = {
    primary: "vkuiSubnavigationButton__modePrimary",
    outline: "vkuiSubnavigationButton__modeOutline",
    tertiary: "vkuiSubnavigationButton__modeTertiary"
};
const sizeStyles = {
    s: "vkuiSubnavigationButton__sizeS",
    m: "vkuiSubnavigationButton__sizeM",
    l: "vkuiSubnavigationButton__sizeL"
};
const sizeYClassNames = {
    none: "vkuiSubnavigationButton__sizeYNone",
    compact: "vkuiSubnavigationButton__sizeYCompact"
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
    var { mode = 'primary', appearance = 'accent', size = 'm', selected, textLevel = '1', before, after, chevron, children } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "appearance",
        "size",
        "selected",
        "textLevel",
        "before",
        "after",
        "chevron",
        "children"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Tappable, _object_spread_props(_object_spread({}, restProps), {
        hasActive: false,
        focusVisibleMode: "outside",
        baseClassName: classNames("vkuiSubnavigationButton__host", sizeStyles[size], modeStyles[mode], appearanceStyles[appearance], selected && "vkuiSubnavigationButton__selected", sizeY !== 'regular' && sizeYClassNames[sizeY], restProps.disabled && "vkuiSubnavigationButton__disabled"),
        children: /*#__PURE__*/ _jsxs("span", {
            className: "vkuiSubnavigationButton__in",
            children: [
                before && /*#__PURE__*/ _jsx("span", {
                    className: "vkuiSubnavigationButton__before",
                    children: before
                }),
                /*#__PURE__*/ _jsx(SubnavigationButtonTypography, {
                    textLevel: textLevel,
                    className: "vkuiSubnavigationButton__label",
                    Component: "span",
                    children: children
                }),
                after && /*#__PURE__*/ _jsx("span", {
                    className: "vkuiSubnavigationButton__after",
                    children: after
                }),
                chevron && /*#__PURE__*/ _jsx(Icon16Dropdown, {
                    className: "vkuiSubnavigationButton__chevronIcon"
                })
            ]
        })
    }));
};

//# sourceMappingURL=SubnavigationButton.js.map