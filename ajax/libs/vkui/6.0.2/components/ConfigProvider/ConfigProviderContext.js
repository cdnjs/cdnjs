import * as React from 'react';
import { platform } from '../../lib/platform';
import { DEFAULT_TOKENS_CLASS_NAMES } from '../../lib/tokens';
export const ConfigProviderContext = /*#__PURE__*/ React.createContext({
    hasCustomPanelHeaderAfter: false,
    customPanelHeaderAfterMinWidth: 90,
    isWebView: false,
    transitionMotionEnabled: true,
    platform: platform(),
    appearance: undefined,
    tokensClassNames: DEFAULT_TOKENS_CLASS_NAMES,
    locale: 'ru'
});
export const useConfigProvider = ()=>React.useContext(ConfigProviderContext);

//# sourceMappingURL=ConfigProviderContext.js.map