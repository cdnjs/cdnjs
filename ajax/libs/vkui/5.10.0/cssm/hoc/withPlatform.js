import * as React from 'react';
import { useConfigProvider } from '../components/ConfigProvider/ConfigProviderContext';
export function withPlatform(Component) {
    function WithPlatform(props) {
        const { platform } = useConfigProvider();
        return /*#__PURE__*/ React.createElement(Component, {
            ...props,
            platform: platform
        });
    }
    return WithPlatform;
}

//# sourceMappingURL=withPlatform.js.map