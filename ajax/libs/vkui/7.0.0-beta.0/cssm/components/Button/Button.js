import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { Spinner } from "../Spinner/Spinner.js";
import { Tappable } from "../Tappable/Tappable.js";
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
    center: styles.alignCenter,
    right: styles.alignRight
};
const sizeYClassNames = {
    none: styles.sizeYNone,
    regular: styles.sizeYRegular
};
/**
 * @see https://vkcom.github.io/VKUI/#/Button
 */ export const Button = ({ size = 's', mode = 'primary', appearance = 'accent', stretched = false, align = 'center', children, before, after, getRootRef, loading, onClick, className, disableSpinnerAnimation, rounded, ...restProps })=>{
    const hasIcons = Boolean(before || after);
    const hasIconOnly = !children && Boolean(after) !== Boolean(before);
    const { sizeY = 'none' } = useAdaptivity();
    const platform = usePlatform();
    return /*#__PURE__*/ _jsxs(Tappable, {
        hoverMode: styles.hover,
        activeMode: styles.active,
        Component: restProps.href ? 'a' : 'button',
        focusVisibleMode: "outside",
        ...restProps,
        onClick: loading ? undefined : onClick,
        className: classNames(className, styles.host, stylesSize[size], stylesMode[mode], stylesAppearance[appearance], stylesAlign[align], sizeY !== 'compact' && sizeYClassNames[sizeY], platform === 'ios' && styles.ios, stretched && styles.stretched, hasIcons && styles.withIcon, hasIconOnly && !stretched && styles.singleIcon, loading && styles.loading, rounded && styles.rounded),
        getRootRef: getRootRef,
        children: [
            loading && /*#__PURE__*/ _jsx(Spinner, {
                size: "s",
                className: styles.spinner,
                disableAnimation: disableSpinnerAnimation
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