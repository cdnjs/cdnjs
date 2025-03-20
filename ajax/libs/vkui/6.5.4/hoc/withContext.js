import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
export function withContext(Component, Ctx, prop) {
    function WithContext(props) {
        const context = React.useContext(Ctx);
        return /*#__PURE__*/ _jsx(Component, _object_spread_props(_object_spread({}, props), {
            [prop]: context
        }));
    }
    return WithContext;
}

//# sourceMappingURL=withContext.js.map