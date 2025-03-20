import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { IconAppearanceProvider } from "@vkontakte/icons";
import { useAutoDetectAppearance } from "../../hooks/useAutoDetectAppearance.js";
import { useObjectMemo } from "../../hooks/useObjectMemo.js";
import { TokensClassProvider } from "../../lib/tokens/index.js";
import { excludeKeysWithUndefined } from "../../lib/utils.js";
import { ConfigProviderContext, useConfigProvider } from "./ConfigProviderContext.js";
/**
 * @see https://vkcom.github.io/VKUI/#/ConfigProvider
 */ export const ConfigProvider = (propsRaw)=>{
    const props = excludeKeysWithUndefined(propsRaw);
    const parentConfig = useConfigProvider();
    const { children, hasCustomPanelHeaderAfter, customPanelHeaderAfterMinWidth, isWebView, transitionMotionEnabled, platform, locale, appearance: appearanceProp, tokensClassNames } = {
        ...parentConfig,
        ...props
    };
    const appearance = useAutoDetectAppearance(appearanceProp);
    const configContext = useObjectMemo({
        hasCustomPanelHeaderAfter,
        customPanelHeaderAfterMinWidth,
        isWebView,
        transitionMotionEnabled,
        platform,
        locale,
        tokensClassNames,
        appearance
    });
    return /*#__PURE__*/ _jsx(ConfigProviderContext.Provider, {
        value: configContext,
        children: /*#__PURE__*/ _jsx(IconAppearanceProvider, {
            value: appearance,
            children: /*#__PURE__*/ _jsx(TokensClassProvider, {
                children: children
            })
        })
    });
};

//# sourceMappingURL=ConfigProvider.js.map