'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Dropdown } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import styles from "./SubnavigationButton.module.css";
const appearanceStyles = {
    accent: styles.appearanceAccent,
    neutral: styles.appearanceNeutral
};
const modeStyles = {
    primary: styles.modePrimary,
    outline: styles.modeOutline,
    tertiary: styles.modeTertiary
};
const sizeStyles = {
    s: styles.sizeS,
    m: styles.sizeM,
    l: styles.sizeL
};
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
const SubnavigationButtonTypography = ({ textLevel, ...restProps })=>{
    if (textLevel === '1') {
        return /*#__PURE__*/ _jsx(Subhead, {
            ...restProps
        });
    }
    return /*#__PURE__*/ _jsx(Caption, {
        level: textLevel === '2' ? '1' : '2',
        ...restProps
    });
};
/**
 * @see https://vkui.io/components/subnavigation-bar#subnavigation-button
 */ export const SubnavigationButton = ({ mode = 'primary', appearance = 'accent', size = 'm', selected, textLevel = '1', before, after, chevron, children, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Tappable, {
        hasActive: false,
        focusVisibleMode: "outside",
        ...restProps,
        baseClassName: classNames(styles.host, sizeStyles[size], modeStyles[mode], appearanceStyles[appearance], selected && styles.selected, sizeY !== 'regular' && sizeYClassNames[sizeY], restProps.disabled && styles.disabled),
        children: /*#__PURE__*/ _jsxs("span", {
            className: styles.in,
            children: [
                before && /*#__PURE__*/ _jsx("span", {
                    className: styles.before,
                    children: before
                }),
                /*#__PURE__*/ _jsx(SubnavigationButtonTypography, {
                    textLevel: textLevel,
                    className: styles.label,
                    Component: "span",
                    children: children
                }),
                after && /*#__PURE__*/ _jsx("span", {
                    className: styles.after,
                    children: after
                }),
                chevron && /*#__PURE__*/ _jsx(Icon16Dropdown, {
                    className: styles.chevronIcon
                })
            ]
        })
    });
};

//# sourceMappingURL=SubnavigationButton.js.map