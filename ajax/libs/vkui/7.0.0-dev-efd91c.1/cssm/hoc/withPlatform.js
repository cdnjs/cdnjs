'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useConfigProvider } from "../components/ConfigProvider/ConfigProviderContext.js";
export function withPlatform(Component) {
    function WithPlatform(props) {
        const { platform } = useConfigProvider();
        return /*#__PURE__*/ _jsx(Component, {
            ...props,
            platform: platform
        });
    }
    return WithPlatform;
}

//# sourceMappingURL=withPlatform.js.map