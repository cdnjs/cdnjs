import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import * as React from "react";
import { useConfigProvider } from "../components/ConfigProvider/ConfigProviderContext";
export function withPlatform(Component) {
    var WithPlatform = function WithPlatform(props) {
        var platform = useConfigProvider().platform;
        return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, props), {
            platform: platform
        }));
    };
    return WithPlatform;
}

//# sourceMappingURL=withPlatform.js.map