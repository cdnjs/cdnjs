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
var _ConfigProviderContext = require("./ConfigProviderContext");
var ConfigProvider = function(props) {
    var parentConfig = (0, _ConfigProviderContext.useConfigProvider)();
    var _$_object_spread = _object_spread._({}, parentConfig, props), children = _$_object_spread.children, webviewType = _$_object_spread.webviewType, isWebView = _$_object_spread.isWebView, transitionMotionEnabled = _$_object_spread.transitionMotionEnabled, platform = _$_object_spread.platform, locale = _$_object_spread.locale, appearanceProp = _$_object_spread.appearance, _object_spread_onDetectAppearanceByBridge = _$_object_spread.onDetectAppearanceByBridge, onDetectAppearanceByBridge = _object_spread_onDetectAppearanceByBridge === void 0 ? _vkjs.noop : _object_spread_onDetectAppearanceByBridge;
    var appearance = (0, _useAutoDetectAppearance.useAutoDetectAppearance)(appearanceProp, onDetectAppearanceByBridge);
    var document = (0, _dom.useDOM)().document;
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        var VKUITokensClassName = (0, _generateVKUITokensClassName.generateVKUITokensClassName)(platform, appearance);
        // eslint-disable-next-line no-restricted-properties
        document.body.classList.add(VKUITokensClassName);
        return function() {
            // eslint-disable-next-line no-restricted-properties
            document.body.classList.remove(VKUITokensClassName);
        };
    }, [
        platform,
        appearance
    ]);
    var configContext = (0, _useObjectMemo.useObjectMemo)({
        webviewType: webviewType,
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