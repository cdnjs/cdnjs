import * as React from 'react';
import { TokensClassProvider } from '../../lib/tokens';
import { ConfigProviderOverride } from '../ConfigProvider/ConfigProviderOverride';
/**
 * Компонент, позволяющий переопределить платформу для части приложения
 *
 * @since 5.1.0
 * @see https://vkcom.github.io/VKUI/#/PlatformProvider
 */ export function PlatformProvider({ value, children }) {
    return /*#__PURE__*/ React.createElement(ConfigProviderOverride, {
        platform: value
    }, /*#__PURE__*/ React.createElement(TokensClassProvider, null, children));
}

//# sourceMappingURL=PlatformProvider.js.map