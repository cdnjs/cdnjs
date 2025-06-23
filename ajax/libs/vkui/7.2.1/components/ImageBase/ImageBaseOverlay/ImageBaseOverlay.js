'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
const ImageBaseOverlayInteractive = (_param)=>{
    var { children, className, getRootRef, overlayShown } = _param, restProps = _object_without_properties(_param, [
        "children",
        "className",
        "getRootRef",
        "overlayShown"
    ]);
    const _useFocusVisible = useFocusVisible(), { focusVisible } = _useFocusVisible, focusEvents = _object_without_properties(_useFocusVisible, [
        "focusVisible"
    ]);
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible,
        mode: 'inside'
    });
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread(_object_spread_props(_object_spread({}, restProps), {
                tabIndex: 0,
                role: "button",
                className: classNames("vkuiImageBaseOverlay__clickable", (focusVisible || overlayShown) && "vkuiImageBaseOverlay__visible", focusVisibleClassNames, className),
                ref: getRootRef,
                onKeyDown: clickByKeyboardHandler
            }), focusEvents), {
                children: children
            })),
            process.env.NODE_ENV === 'development' && /*#__PURE__*/ _jsx(DevelopmentCheck, {
                children: children
            })
        ]
    });
};
const ImageBaseOverlayNonInteractive = (_param)=>{
    var { className, getRootRef, overlayShown: overlayShownProps } = _param, restProps = _object_without_properties(_param, [
        "className",
        "getRootRef",
        "overlayShown"
    ]);
    const rootRef = useExternRef(getRootRef);
    const { shown: overlayShown, onClick: onOverlayClick } = useNonInteractiveOverlayProps(rootRef);
    return /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({}, restProps), {
        ref: rootRef,
        className: classNames((overlayShown || overlayShownProps) && "vkuiImageBaseOverlay__visible", className),
        onClick: onOverlayClick
    }));
};
/**
 * Оверлей над картинкой.
 */ export const ImageBaseOverlay = (_param)=>{
    var { className, theme: themeProp, visibility: visibilityProp } = _param, restProps = _object_without_properties(_param, [
        "className",
        "theme",
        "visibility"
    ]);
    const colorScheme = useColorScheme();
    const theme = themeProp !== null && themeProp !== void 0 ? themeProp : colorScheme;
    const commonClassNames = classNames("vkuiImageBaseOverlay__host", theme === 'light' && "vkuiImageBaseOverlay__themeLight", theme === 'dark' && "vkuiImageBaseOverlay__themeDark", className);
    const defaultVisibility = useCalculatedDefaultVisibility();
    const visibility = visibilityProp !== null && visibilityProp !== void 0 ? visibilityProp : defaultVisibility;
    const commonProps = {
        className: commonClassNames,
        overlayShown: visibility === 'always'
    };
    // Не делаем деструктуризацию пропа, потому что Typescript не вывозит
    if (!restProps.onClick) {
        return /*#__PURE__*/ _jsx(ImageBaseOverlayNonInteractive, _object_spread({}, restProps, commonProps));
    }
    return /*#__PURE__*/ _jsx(ImageBaseOverlayInteractive, _object_spread({}, restProps, commonProps));
};
ImageBaseOverlay.displayName = 'ImageBaseOverlay';

//# sourceMappingURL=ImageBaseOverlay.js.map