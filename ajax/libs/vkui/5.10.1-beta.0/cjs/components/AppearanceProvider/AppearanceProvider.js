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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _usePlatform = require("../../hooks/usePlatform");
var _tokensClassProvider = require("../../lib/tokensClassProvider");
var _ConfigProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
var AppearanceProvider = function(param) {
    var appearance = param.appearance, children = param.children;
    var platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
        appearance: appearance
    }, /*#__PURE__*/ _react.createElement(_tokensClassProvider.TokensClassProvider, {
        platform: platform,
        appearance: appearance
    }, children));
};

//# sourceMappingURL=AppearanceProvider.js.map