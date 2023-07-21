import * as React from 'react';
import { usePlatform } from '../../hooks/usePlatform';
import { TokensClassProvider } from '../../lib/tokensClassProvider';
import { ConfigProviderOverride } from '../ConfigProvider/ConfigProviderOverride';
/**
 * @see https://vkcom.github.io/VKUI/#/AppearanceProvider
 */ export const AppearanceProvider = ({ appearance, children })=>{
    const platform = usePlatform();
    return /*#__PURE__*/ React.createElement(ConfigProviderOverride, {
        appearance: appearance
    }, /*#__PURE__*/ React.createElement(TokensClassProvider, {
        platform: platform,
        appearance: appearance
    }, children));
};

//# sourceMappingURL=AppearanceProvider.js.map