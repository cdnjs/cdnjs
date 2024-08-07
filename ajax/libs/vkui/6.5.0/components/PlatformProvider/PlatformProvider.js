import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { TokensClassProvider } from '../../lib/tokens';
import { ConfigProviderOverride } from '../ConfigProvider/ConfigProviderOverride';
/**
 * Компонент, позволяющий переопределить платформу для части приложения
 *
 * @since 5.1.0
 * @see https://vkcom.github.io/VKUI/#/PlatformProvider
 */ export function PlatformProvider({ value, children }) {
    return /*#__PURE__*/ _jsx(ConfigProviderOverride, {
        platform: value,
        children: /*#__PURE__*/ _jsx(TokensClassProvider, {
            children: children
        })
    });
}

//# sourceMappingURL=PlatformProvider.js.map