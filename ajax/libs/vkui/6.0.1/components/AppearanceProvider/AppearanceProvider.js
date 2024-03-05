import * as React from 'react';
import { TokensClassProvider } from '../../lib/tokens';
import { ConfigProviderOverride } from '../ConfigProvider/ConfigProviderOverride';
/**
 * @see https://vkcom.github.io/VKUI/#/AppearanceProvider
 */ export const AppearanceProvider = ({ value, children })=>{
    return /*#__PURE__*/ React.createElement(ConfigProviderOverride, {
        appearance: value
    }, /*#__PURE__*/ React.createElement(TokensClassProvider, null, children));
};

//# sourceMappingURL=AppearanceProvider.js.map