import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import * as React from "react";
import { useInsets } from "../hooks/useInsets";
export function withInsets(Component) {
    var WithInsets = function WithInsets(props) {
        var insets = useInsets();
        return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, props), {
            insets: insets
        }));
    };
    return WithInsets;
}

//# sourceMappingURL=withInsets.js.map