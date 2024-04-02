import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import * as React from 'react';
import { ModalRootContext } from './ModalRootContext';
export function withModalRootContext(Component) {
    function WithModalRootContext(props) {
        const { updateModalHeight } = React.useContext(ModalRootContext);
        return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, props), {
            updateModalHeight: updateModalHeight
        }));
    }
    return WithModalRootContext;
}

//# sourceMappingURL=withModalRootContext.js.map