'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { ConfigProviderOverride } from "../components/ConfigProvider/ConfigProviderOverride.js";
import { computeBrowserInfo } from "./browser.js";
import { platform as getPlatform } from "./platform.js";
/**
 * @see https://vkcom.github.io/VKUI/#/SSR
 */ export const SSRWrapper = ({ userAgent, browserInfo, direction = 'ltr', children })=>{
    if (!browserInfo && userAgent) {
        browserInfo = computeBrowserInfo(userAgent);
    }
    return /*#__PURE__*/ _jsx(ConfigProviderOverride, {
        direction: direction,
        platform: getPlatform(browserInfo),
        children: children
    });
};

//# sourceMappingURL=SSR.js.map