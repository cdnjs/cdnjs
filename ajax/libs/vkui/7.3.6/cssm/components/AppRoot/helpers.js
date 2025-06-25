import * as React from "react";
import { isRefObject } from "../../lib/isRefObject.js";
import styles from "./AppRootStyleContainer/AppRootStyleContainer.module.css";
export const extractPortalRootByProp = (portalRootProp)=>isRefObject(portalRootProp) ? portalRootProp.current : portalRootProp;
export const CUSTOM_PROPERTY_INSET_PREFIX = `--vkui_internal--safe_area_inset_`;
export function useSafeAreaInsetsMemo(safeAreaInsetsProp) {
    const { top, right, bottom, left } = safeAreaInsetsProp ?? {};
    const safeAreaInsets = React.useMemo(()=>({
            top,
            right,
            bottom,
            left
        }), [
        top,
        right,
        bottom,
        left
    ]);
    return safeAreaInsets;
}
export function getSafeAreaInsetsAsCssVariables(safeAreaInsets) {
    if (!safeAreaInsets) {
        return {};
    }
    const cssVariables = {};
    for(const key in safeAreaInsets){
        if (safeAreaInsets.hasOwnProperty(key) && typeof safeAreaInsets[key] === 'number') {
            const propertyKey = `${CUSTOM_PROPERTY_INSET_PREFIX}${key}`;
            const propertyValue = safeAreaInsets[key];
            cssVariables[propertyKey] = `${propertyValue}px`;
        }
    }
    return cssVariables;
}
export function getUserSelectModeClassName({ userSelectMode, isWebView, hasPointer }) {
    switch(userSelectMode){
        case 'enabled-with-pointer':
            {
                if (hasPointer) {
                    return null;
                }
                const enableByHasPointerMediaQuery = hasPointer === undefined;
                if (enableByHasPointerMediaQuery) {
                    return styles.pointerNone;
                }
                return styles.userSelectNone;
            }
        case 'disabled':
            return styles.userSelectNone;
        case 'enabled':
            return null;
        default:
            return isWebView ? styles.userSelectNone : null;
    }
}

//# sourceMappingURL=helpers.js.map