"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PlatformProvider", {
    enumerable: true,
    get: function() {
        return PlatformProvider;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useAppearance = require("../../hooks/useAppearance");
const _tokensClassProvider = require("../../lib/tokensClassProvider");
const _ConfigProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
function PlatformProvider({ value, children }) {
    const appearance = (0, _useAppearance.useAppearance)();
    return /*#__PURE__*/ _react.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
        platform: value
    }, /*#__PURE__*/ _react.createElement(_tokensClassProvider.TokensClassProvider, {
        platform: value,
        appearance: appearance
    }, children));
}

//# sourceMappingURL=PlatformProvider.js.map