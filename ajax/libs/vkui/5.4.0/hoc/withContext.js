import _define_property from "@swc/helpers/src/_define_property.mjs";
import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import * as React from "react";
export function withContext(Component, Ctx, prop) {
    var WithContext = function WithContext(props) {
        var context = React.useContext(Ctx);
        return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, props), _define_property({}, prop, context)));
    };
    return WithContext;
}

//# sourceMappingURL=withContext.js.map