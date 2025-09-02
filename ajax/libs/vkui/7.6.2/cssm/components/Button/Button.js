'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { Spinner } from "../Spinner/Spinner.js";
import { Tappable } from "../Tappable/Tappable.js";
import "../Tappable/Tappable.module.css";
import "../Spinner/Spinner.module.css";
import styles from "./Button.module.css";
const stylesSize = {
    s: styles.sizeS,
    m: styles.sizeM,
    l: styles.sizeL
};
const stylesMode = {
    primary: styles.modePrimary,
    secondary: styles.modeSecondary,
    tertiary: styles.modeTertiary,
    outline: styles.modeOutline,
    link: styles.modeLink
};
const stylesAppearance = {
    'accent': styles.appearanceAccent,
    'positive': styles.appearancePositive,
    'negative': styles.appearanceNegative,
    'neutral': styles.appearanceNeutral,
    'overlay': styles.appearanceOverlay,
    'accent-invariable': styles.appearanceAccentInvariable
};
const stylesAlign = {
    left: styles.alignLeft,
    right: styles.alignRight
};
const sizeYClassNames = {
    none: styles.sizeYNone,
    regular: styles.sizeYRegular
};
/**
 * @see https://vkui.io/components/button
 */ export const Button = ({ size = 's', mode = 'primary', appearance = 'accent', stretched = false, align = 'center', children, before, after, getRootRef, loading, onClick, disableSpinnerAnimation, rounded, disabled, ...restProps })=>{
    const hasIconOnly = !children && Boolean(after) !== Boolean(before);
    const { sizeY = 'none' } = useAdaptivity();
    const platform = usePlatform();
    return /*#__PURE__*/ _jsxs(Tappable, {
        hoverMode: styles.hover,
        activeMode: styles.active,
        Component: restProps.href ? 'a' : 'button',
        focusVisibleMode: "outside",
        disabled: loading || disabled,
        ...restProps,
        onClick: loading ? undefined : onClick,
        baseClassName: classNames(styles.host, stylesSize[size], stylesMode[mode], stylesAppearance[appearance], align !== 'center' && stylesAlign[align], sizeY !== 'compact' && sizeYClassNames[sizeY], platform === 'ios' && styles.ios, stretched && styles.stretched, hasIconOnly && !stretched && styles.singleIcon, loading && styles.loading, rounded && styles.rounded, disabled && styles.disabled),
        getRootRef: getRootRef,
        children: [
            loading && /*#__PURE__*/ _jsx(Spinner, {
                size: "s",
                className: styles.spinner,
                disableAnimation: disableSpinnerAnimation,
                noColor: true
            }),
            /*#__PURE__*/ _jsxs("span", {
                className: styles.in,
                children: [
                    hasReactNode(before) && /*#__PURE__*/ _jsx("span", {
                        className: styles.before,
                        role: "presentation",
                        "data-testid": process.env.NODE_ENV === 'test' ? 'before' : undefined,
                        children: before
                    }),
                    hasReactNode(children) && /*#__PURE__*/ _jsx("span", {
                        className: styles.content,
                        "data-testid": process.env.NODE_ENV === 'test' ? 'children' : undefined,
                        children: children
                    }),
                    hasReactNode(after) && /*#__PURE__*/ _jsx("span", {
                        className: styles.after,
                        role: "presentation",
                        "data-testid": process.env.NODE_ENV === 'test' ? 'after' : undefined,
                        children: after
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=Button.js.map