import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { ModalRootContext } from './ModalRootContext';
export function withModalRootContext(Component) {
    function WithModalRootContext(props) {
        const { updateModalHeight } = React.useContext(ModalRootContext);
        return /*#__PURE__*/ _jsx(Component, {
            ...props,
            updateModalHeight: updateModalHeight
        });
    }
    return WithModalRootContext;
}

//# sourceMappingURL=withModalRootContext.js.map