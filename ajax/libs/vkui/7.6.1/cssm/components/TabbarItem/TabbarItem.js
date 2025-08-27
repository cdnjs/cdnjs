'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode, noop } from "@vkontakte/vkjs";
import { useFocusVisible } from "../../hooks/useFocusVisible.js";
import { useFocusVisibleClassName } from "../../hooks/useFocusVisibleClassName.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { callMultiple } from "../../lib/callMultiple.js";
import { COMMON_WARNINGS, warnOnce } from "../../lib/warnOnce.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import styles from "./TabbarItem.module.css";
const warn = warnOnce('TabbarItem');
/**
 * @see https://vkui.io/components/epic#tabbar-item
 */ export const TabbarItem = ({ children, selected, indicator, label, href, Component = href ? 'a' : 'button', disabled, onFocus: onFocusProp, onBlur: onBlurProp, ...restProps })=>{
    const platform = usePlatform();
    if (process.env.NODE_ENV === 'development') {
        const hasAccessibleName = label || restProps['aria-label'] || restProps['aria-labelledby'];
        if (!hasAccessibleName) {
            warn(COMMON_WARNINGS.a11y[Component === 'a' ? 'link-name' : 'button-name'], 'error');
        }
    }
    const { focusVisible, onFocus: handleFocusVisibleOnFocus, onBlur: handleFocusVisibleOnBlur } = useFocusVisible();
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible
    });
    return /*#__PURE__*/ _jsxs(RootComponent, {
        Component: Component,
        ...restProps,
        disabled: disabled,
        onFocus: callMultiple(handleFocusVisibleOnFocus, onFocusProp),
        onBlur: callMultiple(handleFocusVisibleOnBlur, onBlurProp),
        href: href,
        baseClassName: classNames(styles.host, platform === 'ios' && styles.ios, platform === 'android' && styles.android, selected && styles.selected),
        children: [
            /*#__PURE__*/ _jsx(Tappable, {
                role: "presentation",
                disabled: disabled,
                activeMode: platform === 'ios' ? styles.tappableActive : 'background',
                activeEffectDelay: platform === 'ios' ? 0 : 300,
                hasHover: false,
                className: classNames(styles.tappable, focusVisibleClassNames),
                onClick: noop,
                tabIndex: -1
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles.in,
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: styles.icon,
                        children: [
                            children,
                            /*#__PURE__*/ _jsx("div", {
                                className: "vkuiInternalTabbarItem__label",
                                children: hasReactNode(indicator) && indicator
                            })
                        ]
                    }),
                    label && /*#__PURE__*/ _jsx(Footnote, {
                        Component: "div",
                        className: styles.label,
                        weight: "2",
                        children: label
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=TabbarItem.js.map