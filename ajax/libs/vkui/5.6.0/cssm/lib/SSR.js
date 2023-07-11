import * as React from 'react';
import { ConfigProviderOverride } from '../components/ConfigProvider/ConfigProviderOverride';
import { useObjectMemo } from '../hooks/useObjectMemo';
import { computeBrowserInfo } from './browser';
import { DOMContext, getDOM } from './dom';
import { platform as getPlatform } from './platform';
/**
 * @see https://vkcom.github.io/VKUI/#/SSR
 */ export const SSRWrapper = ({ userAgent, browserInfo, children })=>{
    if (!browserInfo && userAgent) {
        browserInfo = computeBrowserInfo(userAgent);
    }
    const dom = useObjectMemo(getDOM());
    return /*#__PURE__*/ React.createElement(ConfigProviderOverride, {
        platform: getPlatform(browserInfo)
    }, /*#__PURE__*/ React.createElement(DOMContext.Provider, {
        value: dom
    }, children));
};

//# sourceMappingURL=SSR.js.map