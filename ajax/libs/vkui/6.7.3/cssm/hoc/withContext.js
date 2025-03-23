import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
export function withContext(Component, Ctx, prop) {
    function WithContext(props) {
        const context = React.useContext(Ctx);
        return /*#__PURE__*/ _jsx(Component, {
            ...props,
            [prop]: context
        });
    }
    return WithContext;
}

//# sourceMappingURL=withContext.js.map