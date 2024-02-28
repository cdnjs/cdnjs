import * as React from "react";
import { useAppearance } from "../../hooks/useAppearance";
import { TokensClassProvider } from "../../lib/tokensClassProvider";
import { ConfigProviderOverride } from "../ConfigProvider/ConfigProviderOverride";
/**
 * Компонент, позволяющий переопределить платформу для части приложения
 *
 * @since 5.1.0
 * @see https://vkcom.github.io/VKUI/#/PlatformProvider
 */ export function PlatformProvider(param) {
    var value = param.value, children = param.children;
    var appearance = useAppearance();
    return /*#__PURE__*/ React.createElement(ConfigProviderOverride, {
        platform: value
    }, /*#__PURE__*/ React.createElement(TokensClassProvider, {
        platform: value,
        appearance: appearance
    }, children));
}

//# sourceMappingURL=PlatformProvider.js.map