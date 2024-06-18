import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import * as React from 'react';
import { useAutoDetectAppearance } from '../../hooks/useAutoDetectAppearance';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { TokensClassProvider } from '../../lib/tokens';
import { excludeKeysWithUndefined } from '../../lib/utils';
import { ConfigProviderContext, useConfigProvider } from './ConfigProviderContext';
/**
 * @see https://vkcom.github.io/VKUI/#/ConfigProvider
 */ export const ConfigProvider = (propsRaw)=>{
    const props = excludeKeysWithUndefined(propsRaw);
    const parentConfig = useConfigProvider();
    const { children, hasCustomPanelHeaderAfter, customPanelHeaderAfterMinWidth, isWebView, transitionMotionEnabled, platform, locale, appearance: appearanceProp, tokensClassNames } = _object_spread({}, parentConfig, props);
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
    return /*#__PURE__*/ React.createElement(ConfigProviderContext.Provider, {
        value: configContext
    }, /*#__PURE__*/ React.createElement(TokensClassProvider, null, children));
};

//# sourceMappingURL=ConfigProvider.js.map