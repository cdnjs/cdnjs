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
const _tokens = require("../../lib/tokens");
const _ConfigProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
function PlatformProvider({ value, children }) {
    return /*#__PURE__*/ _react.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
        platform: value
    }, /*#__PURE__*/ _react.createElement(_tokens.TokensClassProvider, null, children));
}

//# sourceMappingURL=PlatformProvider.js.map