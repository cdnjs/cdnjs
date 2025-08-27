import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { IconAppearanceProvider } from "@vkontakte/icons";
import { TokensClassProvider } from "../../lib/tokens/TokensClassProvider.js";
import { ConfigProviderOverride } from "../ConfigProvider/ConfigProviderOverride.js";
/**
 * @see https://vkui.io/components/color-scheme-provider
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