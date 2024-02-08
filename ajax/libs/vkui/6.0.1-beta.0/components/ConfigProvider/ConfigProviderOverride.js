import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { ConfigProviderContext, useConfigProvider } from './ConfigProviderContext';
/**
 * Компонент предназначен для перебивания одного из значений контекста
 */ export function ConfigProviderOverride(_param) {
    var { children } = _param, contextValue = _object_without_properties(_param, [
        "children"
    ]);
    const parentConfig = useConfigProvider();
    const configContext = useObjectMemo(_object_spread({}, parentConfig, contextValue));
    return /*#__PURE__*/ React.createElement(ConfigProviderContext.Provider, {
        value: configContext
    }, children);
}

//# sourceMappingURL=ConfigProviderOverride.js.map