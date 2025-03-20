import { jsx as _jsx } from "react/jsx-runtime";
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
    return /*#__PURE__*/ _jsx(ConfigProviderOverride, {
        platform: getPlatform(browserInfo),
        children: /*#__PURE__*/ _jsx(DOMContext.Provider, {
            value: dom,
            children: children
        })
    });
};

//# sourceMappingURL=SSR.js.map