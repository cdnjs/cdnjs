import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityHasPointer } from '../../../hooks/useAdaptivityHasPointer';
import { useAppearance } from '../../../hooks/useAppearance';
import { useExternRef } from '../../../hooks/useExternRef';
import { useFocusVisible } from '../../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../../hooks/useFocusVisibleClassName';
import { clickByKeyboardHandler } from '../../../lib/utils';
import { ImageBaseContext } from '../context';
import { validateOverlayIcon } from '../validators';
import { useNonInteractiveOverlayProps } from './hooks';
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
    var { children, className, getRootRef, disableInteractive, overlayShown } = _param, restProps = _object_without_properties(_param, [
        "children",
        "className",
        "getRootRef",
        "disableInteractive",
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
                className: classNames("vkuiImageBaseOverlay--clickable", (focusVisible || overlayShown) && "vkuiImageBaseOverlay--visible", focusVisibleClassNames, className),
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
    var { className, getRootRef, disableInteractive, overlayShown: overlayShownProps } = _param, restProps = _object_without_properties(_param, [
        "className",
        "getRootRef",
        "disableInteractive",
        "overlayShown"
    ]);
    const rootRef = useExternRef(getRootRef);
    const { shown: overlayShown, onClick: onOverlayClick } = useNonInteractiveOverlayProps(rootRef);
    return /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({}, restProps), {
        ref: rootRef,
        className: classNames((overlayShown || overlayShownProps) && "vkuiImageBaseOverlay--visible", className),
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
    const appearance = useAppearance();
    const hasPointer = useAdaptivityHasPointer();
    const theme = themeProp !== null && themeProp !== void 0 ? themeProp : appearance;
    const visibility = visibilityProp !== null && visibilityProp !== void 0 ? visibilityProp : hasPointer ? 'on-hover' : 'always';
    const commonClassNames = classNames("vkuiImageBaseOverlay", theme === 'light' && "vkuiImageBaseOverlay--theme-light", theme === 'dark' && "vkuiImageBaseOverlay--theme-dark", className);
    const commonProps = {
        className: commonClassNames,
        overlayShown: visibility === 'always'
    };
    // Не делаем деструктуризацию пропа, потому что Typescript не вывозит
    if (restProps.disableInteractive) {
        return /*#__PURE__*/ _jsx(ImageBaseOverlayNonInteractive, _object_spread({}, restProps, commonProps));
    }
    return /*#__PURE__*/ _jsx(ImageBaseOverlayInteractive, _object_spread({}, restProps, commonProps));
};
ImageBaseOverlay.displayName = 'ImageBaseOverlay';

//# sourceMappingURL=ImageBaseOverlay.js.map