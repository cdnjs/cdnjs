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
    WebviewType: function() {
        return WebviewType;
    },
    useConfigProvider: function() {
        return useConfigProvider;
    }
});
var _interop_require_default = require("@swc/helpers/_/_interop_require_default");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkbridge = /*#__PURE__*/ _interop_require_default._(require("@vkontakte/vk-bridge"));
var _platform = require("../../lib/platform");
var WebviewType;
(function(WebviewType) {
    WebviewType["VKAPPS"] = "vkapps";
    WebviewType["INTERNAL"] = "internal";
})(WebviewType || (WebviewType = {}));
var ConfigProviderContext = /*#__PURE__*/ _react.createContext({
    // TODO [>=6]: удалить свойство (#5049).
    webviewType: undefined,
    // TODO [>=6]: сделать по умолчанию `false` (#5049).
    hasCustomPanelHeaderAfter: true,
    customPanelHeaderAfterMinWidth: 90,
    // TODO [>=6]: удалить использование vkBridge. Использовать `false` вместо него (#5049).
    isWebView: _vkbridge.default.isWebView(),
    transitionMotionEnabled: true,
    platform: (0, _platform.platform)(),
    appearance: undefined,
    locale: "ru"
});
var useConfigProvider = function() {
    return _react.useContext(ConfigProviderContext);
};

//# sourceMappingURL=ConfigProviderContext.js.map