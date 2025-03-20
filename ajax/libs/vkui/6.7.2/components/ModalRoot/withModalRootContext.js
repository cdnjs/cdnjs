import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { useModalRootContext } from './useModalRootContext';
export function withModalRootContext(Component) {
    function WithModalRootContext(props) {
        const { updateModalHeight } = useModalRootContext();
        return /*#__PURE__*/ _jsx(Component, _object_spread_props(_object_spread({}, props), {
            updateModalHeight: updateModalHeight
        }));
    }
    return WithModalRootContext;
}

//# sourceMappingURL=withModalRootContext.js.map