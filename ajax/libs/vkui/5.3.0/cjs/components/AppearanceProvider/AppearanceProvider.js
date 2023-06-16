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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _usePlatform = require("../../hooks/usePlatform");
var _tokensClassProvider = require("../../lib/tokensClassProvider");
var _configProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
var AppearanceProvider = function(param) {
    var appearance = param.appearance, children = param.children;
    var platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_configProviderOverride.ConfigProviderOverride, {
        appearance: appearance
    }, /*#__PURE__*/ _react.createElement(_tokensClassProvider.TokensClassProvider, {
        platform: platform,
        appearance: appearance
    }, children));
};

//# sourceMappingURL=AppearanceProvider.js.map