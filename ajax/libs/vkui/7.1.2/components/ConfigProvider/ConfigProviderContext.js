'use client';
import * as React from "react";
import { platform } from "../../lib/platform.js";
import { DEFAULT_TOKENS_CLASS_NAMES } from "../../lib/tokens/index.js";
export const ConfigProviderContext = /*#__PURE__*/ React.createContext({
    hasCustomPanelHeaderAfter: false,
    customPanelHeaderAfterMinWidth: 90,
    isWebView: false,
    transitionMotionEnabled: true,
    platform: platform(),
    colorScheme: undefined,
    tokensClassNames: DEFAULT_TOKENS_CLASS_NAMES,
    locale: 'ru'
});
export const useConfigProvider = ()=>React.useContext(ConfigProviderContext);
export function useConfigProviderContextMemo(config) {
    const { isWebView, hasCustomPanelHeaderAfter, customPanelHeaderAfterMinWidth, colorScheme, transitionMotionEnabled, platform, tokensClassNames, locale } = config;
    return React.useMemo(()=>({
            isWebView,
            hasCustomPanelHeaderAfter,
            customPanelHeaderAfterMinWidth,
            colorScheme,
            transitionMotionEnabled,
            platform,
            tokensClassNames,
            locale
        }), [
        isWebView,
        hasCustomPanelHeaderAfter,
        customPanelHeaderAfterMinWidth,
        colorScheme,
        transitionMotionEnabled,
        platform,
        tokensClassNames,
        locale
    ]);
}

//# sourceMappingURL=ConfigProviderContext.js.map