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
const _generateVKUITokensClassName = require("../../helpers/generateVKUITokensClassName");
const _useAutoDetectAppearance = require("../../hooks/useAutoDetectAppearance");
const _useObjectMemo = require("../../hooks/useObjectMemo");
const _dom = require("../../lib/dom");
const _tokensClassProvider = require("../../lib/tokensClassProvider");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _utils = require("../../lib/utils");
const _ConfigProviderContext = require("./ConfigProviderContext");
const ConfigProvider = (propsRaw)=>{
    const props = (0, _utils.excludeKeysWithUndefined)(propsRaw);
    const parentConfig = (0, _ConfigProviderContext.useConfigProvider)();
    const { children, hasCustomPanelHeaderAfter, customPanelHeaderAfterMinWidth, isWebView, transitionMotionEnabled, platform, locale, appearance: appearanceProp } = _object_spread._({}, parentConfig, props);
    const appearance = (0, _useAutoDetectAppearance.useAutoDetectAppearance)(appearanceProp);
    const { document } = (0, _dom.useDOM)();
    // TODO [>=6]: переместить хук в AppRoot (см. https://github.com/VKCOM/VKUI/issues/4810).
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function attachVKUITokensClassNameToBody() {
        if (!document) {
            return;
        }
        const VKUITokensClassName = (0, _generateVKUITokensClassName.generateVKUITokensClassName)(platform, appearance);
        (0, _utils.addClassNameToElement)(document.body, VKUITokensClassName);
        return ()=>{
            (0, _utils.removeClassNameFromElement)(document.body, VKUITokensClassName);
        };
    }, [
        platform,
        appearance
    ]);
    const configContext = (0, _useObjectMemo.useObjectMemo)({
        hasCustomPanelHeaderAfter,
        customPanelHeaderAfterMinWidth,
        isWebView,
        transitionMotionEnabled,
        platform,
        locale,
        appearance
    });
    return /*#__PURE__*/ _react.createElement(_ConfigProviderContext.ConfigProviderContext.Provider, {
        value: configContext
    }, /*#__PURE__*/ _react.createElement(_tokensClassProvider.TokensClassProvider, {
        platform: platform,
        appearance: appearance
    }, children));
};

//# sourceMappingURL=ConfigProvider.js.map