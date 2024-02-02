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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _generateVKUITokensClassName = require("../../helpers/generateVKUITokensClassName");
var _useAutoDetectAppearance = require("../../hooks/useAutoDetectAppearance");
var _useObjectMemo = require("../../hooks/useObjectMemo");
var _dom = require("../../lib/dom");
var _tokensClassProvider = require("../../lib/tokensClassProvider");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _utils = require("../../lib/utils");
var _warnOnce = require("../../lib/warnOnce");
var _ConfigProviderContext = require("./ConfigProviderContext");
var warn = (0, _warnOnce.warnOnce)("ConfigProvider");
var ConfigProvider = function(propsRaw) {
    var props = (0, _utils.excludeKeysWithUndefined)(propsRaw);
    var parentConfig = (0, _ConfigProviderContext.useConfigProvider)();
    var _$_object_spread = _object_spread._({}, parentConfig, props), children = _$_object_spread.children, webviewType = _$_object_spread.webviewType, hasCustomPanelHeaderAfterMerged = _$_object_spread.hasCustomPanelHeaderAfter, customPanelHeaderAfterMinWidth = _$_object_spread.customPanelHeaderAfterMinWidth, isWebView = _$_object_spread.isWebView, transitionMotionEnabled = _$_object_spread.transitionMotionEnabled, platform = _$_object_spread.platform, locale = _$_object_spread.locale, appearanceProp = _$_object_spread.appearance, _object_spread_onDetectAppearanceByBridge = _$_object_spread.onDetectAppearanceByBridge, onDetectAppearanceByBridge = _object_spread_onDetectAppearanceByBridge === void 0 ? _vkjs.noop : _object_spread_onDetectAppearanceByBridge;
    // TODO [>=6]: Удалить данный бэкпорт
    var hasCustomPanelHeaderAfter = props.webviewType && props.hasCustomPanelHeaderAfter === undefined ? props.webviewType === _ConfigProviderContext.WebviewType.VKAPPS : hasCustomPanelHeaderAfterMerged;
    if (process.env.NODE_ENV === "development") {
        // TODO [>=6]: удалить warn
        var webviewTypeRule = "";
        if (props.webviewType) {
            webviewTypeRule = props.webviewType === _ConfigProviderContext.WebviewType.INTERNAL ? "3. замените webviewType={WebviewType.INTERNAL} на hasCustomPanelHeaderAfterProp={false}" : "3. замените webviewType={WebviewType.VKAPPS} на hasCustomPanelHeaderAfterProp={true}";
        }
        warn("[@vkontakte/vk-bridge's deprecated] Если вы используете VK Bridge, то:\n\n1. используйте хук useAppearance() из @vkontakte/vk-bridge-react и результат передайте в параметр appearance;\n2. передайте bridge.isWebView() в параметр isWebView;\n".concat(webviewTypeRule, "\n\nПодробности см. https://github.com/VKCOM/VKUI/issues/5049\n"));
    }
    // TODO [>=6]: удалить использование хука
    var appearance = (0, _useAutoDetectAppearance.useAutoDetectAppearance)(appearanceProp, onDetectAppearanceByBridge);
    var document = (0, _dom.useDOM)().document;
    // TODO [>=6]: переместить хук в AppRoot (см. https://github.com/VKCOM/VKUI/issues/4810).
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function attachVKUITokensClassNameToBody() {
        if (!document) {
            return;
        }
        var VKUITokensClassName = (0, _generateVKUITokensClassName.generateVKUITokensClassName)(platform, appearance);
        (0, _utils.addClassNameToElement)(document.body, VKUITokensClassName);
        return function() {
            (0, _utils.removeClassNameFromElement)(document.body, VKUITokensClassName);
        };
    }, [
        platform,
        appearance
    ]);
    var configContext = (0, _useObjectMemo.useObjectMemo)({
        webviewType: webviewType,
        hasCustomPanelHeaderAfter: hasCustomPanelHeaderAfter,
        customPanelHeaderAfterMinWidth: customPanelHeaderAfterMinWidth,
        isWebView: isWebView,
        transitionMotionEnabled: transitionMotionEnabled,
        platform: platform,
        locale: locale,
        appearance: appearance
    });
    return /*#__PURE__*/ _react.createElement(_ConfigProviderContext.ConfigProviderContext.Provider, {
        value: configContext
    }, /*#__PURE__*/ _react.createElement(_tokensClassProvider.TokensClassProvider, {
        platform: platform,
        appearance: appearance
    }, children));
};

//# sourceMappingURL=ConfigProvider.js.map