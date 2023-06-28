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
    WebviewType: function() {
        return WebviewType;
    },
    ConfigProviderContext: function() {
        return ConfigProviderContext;
    },
    useConfigProvider: function() {
        return useConfigProvider;
    }
});
var _interopRequireDefault = require("@swc/helpers/lib/_interop_require_default.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkBridge = /*#__PURE__*/ _interopRequireDefault(require("@vkontakte/vk-bridge"));
var _platform = require("../../lib/platform");
var WebviewType;
(function(WebviewType) {
    WebviewType["VKAPPS"] = "vkapps";
    WebviewType["INTERNAL"] = "internal";
})(WebviewType || (WebviewType = {}));
var ConfigProviderContext = /*#__PURE__*/ _react.createContext({
    webviewType: WebviewType.VKAPPS,
    isWebView: _vkBridge.default.isWebView(),
    transitionMotionEnabled: true,
    platform: (0, _platform.platform)(),
    appearance: undefined,
    locale: "ru"
});
var useConfigProvider = function() {
    return _react.useContext(ConfigProviderContext);
};

//# sourceMappingURL=ConfigProviderContext.js.map