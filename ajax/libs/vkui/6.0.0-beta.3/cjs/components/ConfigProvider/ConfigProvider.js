"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConfigProvider", {
    enumerable: true,
    get: function() {
        return ConfigProvider;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useAutoDetectAppearance = require("../../hooks/useAutoDetectAppearance");
const _useObjectMemo = require("../../hooks/useObjectMemo");
const _tokens = require("../../lib/tokens");
const _utils = require("../../lib/utils");
const _ConfigProviderContext = require("./ConfigProviderContext");
const ConfigProvider = (propsRaw)=>{
    const props = (0, _utils.excludeKeysWithUndefined)(propsRaw);
    const parentConfig = (0, _ConfigProviderContext.useConfigProvider)();
    const { children, hasCustomPanelHeaderAfter, customPanelHeaderAfterMinWidth, isWebView, transitionMotionEnabled, platform, locale, appearance: appearanceProp, tokensClassNames } = _object_spread._({}, parentConfig, props);
    const appearance = (0, _useAutoDetectAppearance.useAutoDetectAppearance)(appearanceProp);
    const configContext = (0, _useObjectMemo.useObjectMemo)({
        hasCustomPanelHeaderAfter,
        customPanelHeaderAfterMinWidth,
        isWebView,
        transitionMotionEnabled,
        platform,
        locale,
        tokensClassNames,
        appearance
    });
    return /*#__PURE__*/ _react.createElement(_ConfigProviderContext.ConfigProviderContext.Provider, {
        value: configContext
    }, /*#__PURE__*/ _react.createElement(_tokens.TokensClassProvider, null, children));
};

//# sourceMappingURL=ConfigProvider.js.map