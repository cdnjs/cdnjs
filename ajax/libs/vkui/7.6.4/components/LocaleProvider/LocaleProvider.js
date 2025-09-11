import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { ConfigProviderOverride } from "../ConfigProvider/ConfigProviderOverride.js";
/**
 * Компонент, прокидывающий локаль. Список можно найти в
 * [реестре языковых подметок IANA](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).
 *
 * @since 5.0.0
 * @see https://vkui.io/components/locale-provider
 */ export function LocaleProvider({ value, children }) {
    return /*#__PURE__*/ _jsx(ConfigProviderOverride, {
        locale: value,
        children: children
    });
}

//# sourceMappingURL=LocaleProvider.js.map