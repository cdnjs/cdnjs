"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppearanceProvider", {
    enumerable: true,
    get: function() {
        return AppearanceProvider;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _usePlatform = require("../../hooks/usePlatform");
const _tokensClassProvider = require("../../lib/tokensClassProvider");
const _ConfigProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
const AppearanceProvider = ({ value, children })=>{
    const platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
        appearance: value
    }, /*#__PURE__*/ _react.createElement(_tokensClassProvider.TokensClassProvider, {
        platform: platform,
        appearance: value
    }, children));
};

//# sourceMappingURL=AppearanceProvider.js.map