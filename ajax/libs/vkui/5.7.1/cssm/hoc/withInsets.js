import * as React from 'react';
import { useInsets } from '../hooks/useInsets';
export function withInsets(Component) {
    function WithInsets(props) {
        const insets = useInsets();
        return /*#__PURE__*/ React.createElement(Component, {
            ...props,
            insets: insets
        });
    }
    return WithInsets;
}

//# sourceMappingURL=withInsets.js.map