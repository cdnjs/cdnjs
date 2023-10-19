import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { useObjectMemo } from "../../hooks/useObjectMemo";
import { ConfigProviderContext, useConfigProvider } from "./ConfigProviderContext";
/**
 * Компонент предназначен для перебивания одного из значений контекста
 */ export function ConfigProviderOverride(_param) {
    var children = _param.children, contextValue = _object_without_properties(_param, [
        "children"
    ]);
    var parentConfig = useConfigProvider();
    var configContext = useObjectMemo(_object_spread({}, parentConfig, contextValue));
    return /*#__PURE__*/ React.createElement(ConfigProviderContext.Provider, {
        value: configContext
    }, children);
}

//# sourceMappingURL=ConfigProviderOverride.js.map