'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { useTokensClassName } from "../../../lib/tokens/useTokenClassName.js";
import { useConfigProvider } from "../../ConfigProvider/ConfigProviderContext.js";
import { RootComponent } from "../../RootComponent/RootComponent.js";
import { AppRootContext } from "../AppRootContext.js";
import { getSafeAreaInsetsAsCssVariables, getUserSelectModeClassName } from "../helpers.js";
const sizeYClassNames = {
    none: "vkuiAppRootStyleContainer__sizeYNone",
    compact: "vkuiAppRootStyleContainer__sizeYCompact"
};
export function useAppRootStyles() {
    const { safeAreaInsets, mode, userSelectMode } = React.useContext(AppRootContext);
    const { hasPointer, sizeY = 'none' } = useAdaptivity();
    const { isWebView } = useConfigProvider();
    const userSelectModeClassName = getUserSelectModeClassName({
        userSelectMode,
        isWebView,
        hasPointer
    });
    const tokensClassName = useTokensClassName();
    return {
        style: safeAreaInsets ? getSafeAreaInsetsAsCssVariables(safeAreaInsets) : undefined,
        className: classNames("vkuiAppRootStyleContainer__host", mode === 'embedded' && "vkuiAppRootStyleContainer__embedded", sizeY !== 'regular' && sizeYClassNames[sizeY], userSelectModeClassName, tokensClassName)
    };
}
/**
 * Специальный контейнер для переиспользования стилей, токенов и safe-area-inset в:
 * - точке монтирования приложения – `AppRoot`;
 * - точке монтирования порталов для модальных окон – `AppRootPortal`.
 *
 * @private
 */ export function AppRootStyleContainer(props) {
    const { style: appRootStyle, className: appRootClassName } = useAppRootStyles();
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({
        baseClassName: appRootClassName,
        baseStyle: appRootStyle
    }, props));
}

//# sourceMappingURL=AppRootStyleContainer.js.map