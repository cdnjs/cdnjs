import * as React from 'react';
import { noop } from '@vkontakte/vkjs';
import { generateVKUITokensClassName } from '../../helpers/generateVKUITokensClassName';
import { useAutoDetectAppearance } from '../../hooks/useAutoDetectAppearance';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { useDOM } from '../../lib/dom';
import { TokensClassProvider } from '../../lib/tokensClassProvider';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { ConfigProviderContext, useConfigProvider } from './ConfigProviderContext';
/**
 * @see https://vkcom.github.io/VKUI/#/ConfigProvider
 */ export const ConfigProvider = (props)=>{
    const parentConfig = useConfigProvider();
    const { children, webviewType, isWebView, transitionMotionEnabled, platform, locale, appearance: appearanceProp, onDetectAppearanceByBridge = noop } = {
        ...parentConfig,
        ...props
    };
    const appearance = useAutoDetectAppearance(appearanceProp, onDetectAppearanceByBridge);
    const { document } = useDOM();
    useIsomorphicLayoutEffect(()=>{
        const VKUITokensClassName = generateVKUITokensClassName(platform, appearance);
        // eslint-disable-next-line no-restricted-properties
        document.body.classList.add(VKUITokensClassName);
        return ()=>{
            // eslint-disable-next-line no-restricted-properties
            document.body.classList.remove(VKUITokensClassName);
        };
    }, [
        platform,
        appearance
    ]);
    const configContext = useObjectMemo({
        webviewType,
        isWebView,
        transitionMotionEnabled,
        platform,
        locale,
        appearance
    });
    return /*#__PURE__*/ React.createElement(ConfigProviderContext.Provider, {
        value: configContext
    }, /*#__PURE__*/ React.createElement(TokensClassProvider, {
        platform: platform,
        appearance: appearance
    }, children));
};

//# sourceMappingURL=ConfigProvider.js.map