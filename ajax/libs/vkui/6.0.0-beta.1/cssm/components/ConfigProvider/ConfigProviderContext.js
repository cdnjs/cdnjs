import * as React from 'react';
import { platform } from '../../lib/platform';
export const ConfigProviderContext = /*#__PURE__*/ React.createContext({
    hasCustomPanelHeaderAfter: false,
    customPanelHeaderAfterMinWidth: 90,
    isWebView: false,
    transitionMotionEnabled: true,
    platform: platform(),
    appearance: undefined,
    locale: 'ru'
});
export const useConfigProvider = ()=>React.useContext(ConfigProviderContext);

//# sourceMappingURL=ConfigProviderContext.js.map