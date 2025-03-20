import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { useConfigProvider } from '../components/ConfigProvider/ConfigProviderContext';
export function withPlatform(Component) {
    function WithPlatform(props) {
        const { platform } = useConfigProvider();
        return /*#__PURE__*/ _jsx(Component, _object_spread_props(_object_spread({}, props), {
            platform: platform
        }));
    }
    return WithPlatform;
}

//# sourceMappingURL=withPlatform.js.map