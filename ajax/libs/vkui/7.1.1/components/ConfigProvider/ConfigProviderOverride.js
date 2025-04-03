'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { ConfigProviderContext, useConfigProvider, useConfigProviderContextMemo } from "./ConfigProviderContext.js";
/**
 * Компонент предназначен для перебивания одного из значений контекста
 */ export function ConfigProviderOverride(_param) {
    var { children } = _param, contextValue = _object_without_properties(_param, [
        "children"
    ]);
    const parentConfig = useConfigProvider();
    const configContext = useConfigProviderContextMemo(_object_spread({}, parentConfig, contextValue));
    return /*#__PURE__*/ _jsx(ConfigProviderContext.Provider, {
        value: configContext,
        children: children
    });
}

//# sourceMappingURL=ConfigProviderOverride.js.map