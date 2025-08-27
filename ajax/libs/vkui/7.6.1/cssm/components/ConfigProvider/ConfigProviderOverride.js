'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { ConfigProviderContext, useConfigProvider, useConfigProviderContextMemo } from "./ConfigProviderContext.js";
/**
 * Компонент предназначен для перебивания одного из значений контекста.
 */ export function ConfigProviderOverride({ children, ...contextValue }) {
    const parentConfig = useConfigProvider();
    const configContext = useConfigProviderContextMemo({
        ...parentConfig,
        ...contextValue
    });
    return /*#__PURE__*/ _jsx(ConfigProviderContext.Provider, {
        value: configContext,
        children: children
    });
}

//# sourceMappingURL=ConfigProviderOverride.js.map