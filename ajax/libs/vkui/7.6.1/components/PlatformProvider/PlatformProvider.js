import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { TokensClassProvider } from "../../lib/tokens/TokensClassProvider.js";
import { ConfigProviderOverride } from "../ConfigProvider/ConfigProviderOverride.js";
/**
 * Компонент, позволяющий переопределить платформу для части приложения.
 *
 * @since 5.1.0
 * @see https://vkui.io/components/platform-provider
 */ export function PlatformProvider({ value, children }) {
    return /*#__PURE__*/ _jsx(ConfigProviderOverride, {
        platform: value,
        children: /*#__PURE__*/ _jsx(TokensClassProvider, {
            children: children
        })
    });
}

//# sourceMappingURL=PlatformProvider.js.map