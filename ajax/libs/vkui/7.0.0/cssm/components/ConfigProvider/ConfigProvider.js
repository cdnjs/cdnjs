'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { IconAppearanceProvider } from "@vkontakte/icons";
import { useAutoDetectColorScheme } from "../../hooks/useAutoDetectColorScheme.js";
import { TokensClassProvider } from "../../lib/tokens/index.js";
import { excludeKeysWithUndefined } from "../../lib/utils.js";
import { ConfigProviderContext, useConfigProvider } from "./ConfigProviderContext.js";
/**
 * @see https://vkcom.github.io/VKUI/#/ConfigProvider
 */ export const ConfigProvider = (propsRaw)=>{
    const props = excludeKeysWithUndefined(propsRaw);
    const parentConfig = useConfigProvider();
    const { children, hasCustomPanelHeaderAfter, customPanelHeaderAfterMinWidth, isWebView, transitionMotionEnabled, platform, locale, colorScheme: colorSchemeProp, tokensClassNames } = {
        ...parentConfig,
        ...props
    };
    const colorScheme = useAutoDetectColorScheme(colorSchemeProp);
    const configContext = React.useMemo(()=>({
            hasCustomPanelHeaderAfter,
            customPanelHeaderAfterMinWidth,
            isWebView,
            transitionMotionEnabled,
            platform,
            locale,
            tokensClassNames,
            colorScheme
        }), [
        colorScheme,
        customPanelHeaderAfterMinWidth,
        hasCustomPanelHeaderAfter,
        isWebView,
        locale,
        platform,
        tokensClassNames,
        transitionMotionEnabled
    ]);
    return /*#__PURE__*/ _jsx(ConfigProviderContext.Provider, {
        value: configContext,
        children: /*#__PURE__*/ _jsx(IconAppearanceProvider, {
            value: colorScheme,
            children: /*#__PURE__*/ _jsx(TokensClassProvider, {
                children: children
            })
        })
    });
};

//# sourceMappingURL=ConfigProvider.js.map