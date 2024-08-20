import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { IconAppearanceProvider } from '@vkontakte/icons';
import { TokensClassProvider } from '../../lib/tokens';
import { ConfigProviderOverride } from '../ConfigProvider/ConfigProviderOverride';
/**
 * @see https://vkcom.github.io/VKUI/#/AppearanceProvider
 */ export const AppearanceProvider = ({ value, children })=>{
    return /*#__PURE__*/ _jsx(ConfigProviderOverride, {
        appearance: value,
        children: /*#__PURE__*/ _jsx(IconAppearanceProvider, {
            value: value,
            children: /*#__PURE__*/ _jsx(TokensClassProvider, {
                children: children
            })
        })
    });
};

//# sourceMappingURL=AppearanceProvider.js.map