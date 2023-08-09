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
var _interop_require_default = require("@swc/helpers/_/_interop_require_default");
var _react = /*#__PURE__*/ _interop_require_default._(require("react"));
var _useAppearance = require("../../hooks/useAppearance");
var _tokensClassProvider = require("../../lib/tokensClassProvider");
var _ConfigProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
function PlatformProvider(param) {
    var value = param.value, children = param.children;
    var appearance = (0, _useAppearance.useAppearance)();
    return /*#__PURE__*/ _react.default.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
        platform: value
    }, /*#__PURE__*/ _react.default.createElement(_tokensClassProvider.TokensClassProvider, {
        platform: value,
        appearance: appearance
    }, children));
}

//# sourceMappingURL=PlatformProvider.js.map