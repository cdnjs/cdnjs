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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useAppearance = require("../../hooks/useAppearance");
var _tokensClassProvider = require("../../lib/tokensClassProvider");
var _ConfigProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
function PlatformProvider(param) {
    var value = param.value, children = param.children;
    var appearance = (0, _useAppearance.useAppearance)();
    return /*#__PURE__*/ _react.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
        platform: value
    }, /*#__PURE__*/ _react.createElement(_tokensClassProvider.TokensClassProvider, {
        platform: value,
        appearance: appearance
    }, children));
}

//# sourceMappingURL=PlatformProvider.js.map