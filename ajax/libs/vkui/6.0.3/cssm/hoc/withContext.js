import * as React from 'react';
export function withContext(Component, Ctx, prop) {
    function WithContext(props) {
        const context = React.useContext(Ctx);
        return /*#__PURE__*/ React.createElement(Component, {
            ...props,
            [prop]: context
        });
    }
    return WithContext;
}

//# sourceMappingURL=withContext.js.map