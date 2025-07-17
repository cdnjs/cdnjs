'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { IconAppearanceProvider } from "@vkontakte/icons";
import { useAutoDetectColorScheme } from "../../hooks/useAutoDetectColorScheme.js";
import { useAutoDetectDirection } from "../../hooks/useAutoDetectDirection.js";
import { TokensClassProvider } from "../../lib/tokens/TokensClassProvider.js";
import { excludeKeysWithUndefined } from "../../lib/utils.js";
import { ConfigProviderContext, useConfigProvider, useConfigProviderContextMemo } from "./ConfigProviderContext.js";
/**
 * @see https://vkui.io/components/config-provider
 */ export const ConfigProvider = (propsRaw)=>{
    const props = excludeKeysWithUndefined(propsRaw);
    const parentConfig = useConfigProvider();
    const mergeProps = _object_spread({}, parentConfig, props);
    const colorScheme = useAutoDetectColorScheme(mergeProps.colorScheme);
    const direction = useAutoDetectDirection(mergeProps.direction);
    const configContext = useConfigProviderContextMemo(_object_spread_props(_object_spread({}, mergeProps), {
        colorScheme,
        direction
    }));
    return /*#__PURE__*/ _jsx(ConfigProviderContext.Provider, {
        value: configContext,
        children: /*#__PURE__*/ _jsx(IconAppearanceProvider, {
            value: colorScheme,
            children: /*#__PURE__*/ _jsx(TokensClassProvider, {
                children: mergeProps.children
            })
        })
    });
};

//# sourceMappingURL=ConfigProvider.js.map