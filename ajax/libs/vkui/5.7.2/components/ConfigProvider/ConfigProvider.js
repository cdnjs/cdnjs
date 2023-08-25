import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import * as React from "react";
import { noop } from "@vkontakte/vkjs";
import { generateVKUITokensClassName } from "../../helpers/generateVKUITokensClassName";
import { useAutoDetectAppearance } from "../../hooks/useAutoDetectAppearance";
import { useObjectMemo } from "../../hooks/useObjectMemo";
import { useDOM } from "../../lib/dom";
import { TokensClassProvider } from "../../lib/tokensClassProvider";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { ConfigProviderContext, useConfigProvider } from "./ConfigProviderContext";
/**
 * @see https://vkcom.github.io/VKUI/#/ConfigProvider
 */ export var ConfigProvider = function(props) {
    var parentConfig = useConfigProvider();
    var _$_object_spread = _object_spread({}, parentConfig, props), children = _$_object_spread.children, webviewType = _$_object_spread.webviewType, isWebView = _$_object_spread.isWebView, transitionMotionEnabled = _$_object_spread.transitionMotionEnabled, platform = _$_object_spread.platform, locale = _$_object_spread.locale, appearanceProp = _$_object_spread.appearance, _object_spread_onDetectAppearanceByBridge = _$_object_spread.onDetectAppearanceByBridge, onDetectAppearanceByBridge = _object_spread_onDetectAppearanceByBridge === void 0 ? noop : _object_spread_onDetectAppearanceByBridge;
    var appearance = useAutoDetectAppearance(appearanceProp, onDetectAppearanceByBridge);
    var document = useDOM().document;
    useIsomorphicLayoutEffect(function() {
        var VKUITokensClassName = generateVKUITokensClassName(platform, appearance);
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
    var configContext = useObjectMemo({
        webviewType: webviewType,
        isWebView: isWebView,
        transitionMotionEnabled: transitionMotionEnabled,
        platform: platform,
        locale: locale,
        appearance: appearance
    });
    return /*#__PURE__*/ React.createElement(ConfigProviderContext.Provider, {
        value: configContext
    }, /*#__PURE__*/ React.createElement(TokensClassProvider, {
        platform: platform,
        appearance: appearance
    }, children));
};

//# sourceMappingURL=ConfigProvider.js.map