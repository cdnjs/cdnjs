import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { useModalRootContext } from './useModalRootContext';
export function withModalRootContext(Component) {
    function WithModalRootContext(props) {
        const { updateModalHeight } = useModalRootContext();
        return /*#__PURE__*/ _jsx(Component, {
            ...props,
            updateModalHeight: updateModalHeight
        });
    }
    return WithModalRootContext;
}

//# sourceMappingURL=withModalRootContext.js.map