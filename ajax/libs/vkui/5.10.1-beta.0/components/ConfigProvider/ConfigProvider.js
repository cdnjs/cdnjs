import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import * as React from "react";
import { noop } from "@vkontakte/vkjs";
import { generateVKUITokensClassName } from "../../helpers/generateVKUITokensClassName";
import { useAutoDetectAppearance } from "../../hooks/useAutoDetectAppearance";
import { useObjectMemo } from "../../hooks/useObjectMemo";
import { useDOM } from "../../lib/dom";
import { TokensClassProvider } from "../../lib/tokensClassProvider";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { addClassNameToElement, excludeKeysWithUndefined, removeClassNameFromElement } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";
import { ConfigProviderContext, useConfigProvider, WebviewType } from "./ConfigProviderContext";
var warn = warnOnce("ConfigProvider");
/**
 * @see https://vkcom.github.io/VKUI/#/ConfigProvider
 */ export var ConfigProvider = function(propsRaw) {
    var props = excludeKeysWithUndefined(propsRaw);
    var parentConfig = useConfigProvider();
    var _$_object_spread = _object_spread({}, parentConfig, props), children = _$_object_spread.children, webviewType = _$_object_spread.webviewType, hasCustomPanelHeaderAfterMerged = _$_object_spread.hasCustomPanelHeaderAfter, customPanelHeaderAfterMinWidth = _$_object_spread.customPanelHeaderAfterMinWidth, isWebView = _$_object_spread.isWebView, transitionMotionEnabled = _$_object_spread.transitionMotionEnabled, platform = _$_object_spread.platform, locale = _$_object_spread.locale, appearanceProp = _$_object_spread.appearance, _object_spread_onDetectAppearanceByBridge = _$_object_spread.onDetectAppearanceByBridge, onDetectAppearanceByBridge = _object_spread_onDetectAppearanceByBridge === void 0 ? noop : _object_spread_onDetectAppearanceByBridge;
    // TODO [>=6]: Удалить данный бэкпорт
    var hasCustomPanelHeaderAfter = props.webviewType && props.hasCustomPanelHeaderAfter === undefined ? props.webviewType === WebviewType.VKAPPS : hasCustomPanelHeaderAfterMerged;
    if (process.env.NODE_ENV === "development") {
        // TODO [>=6]: удалить warn
        var webviewTypeRule = "";
        if (props.webviewType) {
            webviewTypeRule = props.webviewType === WebviewType.INTERNAL ? "3. замените webviewType={WebviewType.INTERNAL} на hasCustomPanelHeaderAfterProp={false}" : "3. замените webviewType={WebviewType.VKAPPS} на hasCustomPanelHeaderAfterProp={true}";
        }
        warn("[@vkontakte/vk-bridge's deprecated] Если вы используете VK Bridge, то:\n\n1. используйте хук useAppearance() из @vkontakte/vk-bridge-react и результат передайте в параметр appearance;\n2. передайте bridge.isWebView() в параметр isWebView;\n".concat(webviewTypeRule, "\n\nПодробности см. https://github.com/VKCOM/VKUI/issues/5049\n"));
    }
    // TODO [>=6]: удалить использование хука
    var appearance = useAutoDetectAppearance(appearanceProp, onDetectAppearanceByBridge);
    var document = useDOM().document;
    // TODO [>=6]: переместить хук в AppRoot (см. https://github.com/VKCOM/VKUI/issues/4810).
    useIsomorphicLayoutEffect(function attachVKUITokensClassNameToBody() {
        if (!document) {
            return;
        }
        var VKUITokensClassName = generateVKUITokensClassName(platform, appearance);
        addClassNameToElement(document.body, VKUITokensClassName);
        return function() {
            removeClassNameFromElement(document.body, VKUITokensClassName);
        };
    }, [
        platform,
        appearance
    ]);
    var configContext = useObjectMemo({
        webviewType: webviewType,
        hasCustomPanelHeaderAfter: hasCustomPanelHeaderAfter,
        customPanelHeaderAfterMinWidth: customPanelHeaderAfterMinWidth,
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