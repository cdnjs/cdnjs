"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ConfigProviderContext: function() {
        return ConfigProviderContext;
    },
    useConfigProvider: function() {
        return useConfigProvider;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _platform = require("../../lib/platform");
const _tokens = require("../../lib/tokens");
const ConfigProviderContext = /*#__PURE__*/ _react.createContext({
    hasCustomPanelHeaderAfter: false,
    customPanelHeaderAfterMinWidth: 90,
    isWebView: false,
    transitionMotionEnabled: true,
    platform: (0, _platform.platform)(),
    appearance: undefined,
    tokensClassNames: _tokens.DEFAULT_TOKENS_CLASS_NAMES,
    locale: 'ru'
});
const useConfigProvider = ()=>_react.useContext(ConfigProviderContext);

//# sourceMappingURL=ConfigProviderContext.js.map