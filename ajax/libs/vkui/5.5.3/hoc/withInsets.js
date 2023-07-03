import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
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