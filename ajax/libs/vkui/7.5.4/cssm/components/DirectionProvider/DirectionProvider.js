import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { ConfigProviderOverride } from "../ConfigProvider/ConfigProviderOverride.js";
/**
 * Компонент, прокидывающий направление контента.
 * @see https://vkui.io/components/direction-provider
 * @since 7.2.0
 */ export function DirectionProvider({ value, children }) {
    return /*#__PURE__*/ _jsx(ConfigProviderOverride, {
        direction: value,
        children: children
    });
}

//# sourceMappingURL=DirectionProvider.js.map