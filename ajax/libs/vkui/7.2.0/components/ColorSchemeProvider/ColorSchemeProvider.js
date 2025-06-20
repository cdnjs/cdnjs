'use client';
import { jsx as _jsx } from "react/jsx-runtime";
// TODO [@vkontakte/icons-sprite>=2.3.1]: Удалить use client, если он появился в IconAppearanceProvider
import * as React from "react";
import { IconAppearanceProvider } from "@vkontakte/icons";
import { TokensClassProvider } from "../../lib/tokens/TokensClassProvider.js";
import { ConfigProviderOverride } from "../ConfigProvider/ConfigProviderOverride.js";
/**
 * @see https://vkcom.github.io/VKUI/#/ColorSchemeProvider
 */ export const ColorSchemeProvider = ({ value, children })=>{
    return /*#__PURE__*/ _jsx(ConfigProviderOverride, {
        colorScheme: value,
        children: /*#__PURE__*/ _jsx(IconAppearanceProvider, {
            value: value,
            children: /*#__PURE__*/ _jsx(TokensClassProvider, {
                children: children
            })
        })
    });
};

//# sourceMappingURL=ColorSchemeProvider.js.map