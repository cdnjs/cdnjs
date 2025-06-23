'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useColorScheme } from "../../../hooks/useColorScheme.js";
import { useExternRef } from "../../../hooks/useExternRef.js";
import { useFocusVisible } from "../../../hooks/useFocusVisible.js";
import { useFocusVisibleClassName } from "../../../hooks/useFocusVisibleClassName.js";
import { clickByKeyboardHandler } from "../../../lib/utils.js";
import { ImageBaseContext } from "../context.js";
import { validateOverlayIcon } from "../validators.js";
import { useCalculatedDefaultVisibility, useNonInteractiveOverlayProps } from "./hooks.js";
import styles from "./ImageBaseOverlay.module.css";
function DevelopmentCheck({ children }) {
    const { size } = React.useContext(ImageBaseContext);
    if (process.env.NODE_ENV === 'development') {
        if (children) {
            validateOverlayIcon(size, {
                name: 'children',
                value: children
            });
        }
    }
    return null;
}
const ImageBaseOverlayInteractive = ({ children, className, getRootRef, overlayShown, ...restProps })=>{
    const { focusVisible, ...focusEvents } = useFocusVisible();
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible,
        mode: 'inside'
    });
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx("div", {
                ...restProps,
                tabIndex: 0,
                role: "button",
                className: classNames(styles.clickable, (focusVisible || overlayShown) && styles.visible, focusVisibleClassNames, className),
                ref: getRootRef,
                onKeyDown: clickByKeyboardHandler,
                ...focusEvents,
                children: children
            }),
            process.env.NODE_ENV === 'development' && /*#__PURE__*/ _jsx(DevelopmentCheck, {
                children: children
            })
        ]
    });
};
const ImageBaseOverlayNonInteractive = ({ className, getRootRef, overlayShown: overlayShownProps, ...restProps })=>{
    const rootRef = useExternRef(getRootRef);
    const { shown: overlayShown, onClick: onOverlayClick } = useNonInteractiveOverlayProps(rootRef);
    return /*#__PURE__*/ _jsx("div", {
        ...restProps,
        ref: rootRef,
        className: classNames((overlayShown || overlayShownProps) && styles.visible, className),
        onClick: onOverlayClick
    });
};
/**
 * Оверлей над картинкой.
 */ export const ImageBaseOverlay = ({ className, theme: themeProp, visibility: visibilityProp, ...restProps })=>{
    const colorScheme = useColorScheme();
    const theme = themeProp ?? colorScheme;
    const commonClassNames = classNames(styles.host, theme === 'light' && styles.themeLight, theme === 'dark' && styles.themeDark, className);
    const defaultVisibility = useCalculatedDefaultVisibility();
    const visibility = visibilityProp ?? defaultVisibility;
    const commonProps = {
        className: commonClassNames,
        overlayShown: visibility === 'always'
    };
    // Не делаем деструктуризацию пропа, потому что Typescript не вывозит
    if (!restProps.onClick) {
        return /*#__PURE__*/ _jsx(ImageBaseOverlayNonInteractive, {
            ...restProps,
            ...commonProps
        });
    }
    return /*#__PURE__*/ _jsx(ImageBaseOverlayInteractive, {
        ...restProps,
        ...commonProps
    });
};
ImageBaseOverlay.displayName = 'ImageBaseOverlay';

//# sourceMappingURL=ImageBaseOverlay.js.map