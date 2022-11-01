import * as React from "react";
import { ConfigProviderContext } from "./ConfigProviderContext";
import { useObjectMemo } from "../../hooks/useObjectMemo";
import { AppearanceProvider, generateVKUITokensClassName } from "../AppearanceProvider/AppearanceProvider";
import { LocaleProviderContext } from "../LocaleProviderContext/LocaleProviderContext";
import { useAutoDetectAppearance } from "../../hooks/useAutoDetectAppearance";
import { noop } from "../../lib/utils";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useDOM } from "../../lib/dom";
/**
 * @see https://vkcom.github.io/VKUI/#/ConfigProvider
 */
export var ConfigProvider = function ConfigProvider(props) {
  var parentLocale = React.useContext(LocaleProviderContext);
  var parentConfig = React.useContext(ConfigProviderContext);
  var children = props.children,
    _props$webviewType = props.webviewType,
    webviewType = _props$webviewType === void 0 ? parentConfig.webviewType : _props$webviewType,
    _props$isWebView = props.isWebView,
    isWebView = _props$isWebView === void 0 ? parentConfig.isWebView : _props$isWebView,
    _props$transitionMoti = props.transitionMotionEnabled,
    transitionMotionEnabled = _props$transitionMoti === void 0 ? parentConfig.transitionMotionEnabled : _props$transitionMoti,
    _props$platform = props.platform,
    platform = _props$platform === void 0 ? parentConfig.platform : _props$platform,
    _props$hasNewTokens = props.hasNewTokens,
    hasNewTokens = _props$hasNewTokens === void 0 ? parentConfig.hasNewTokens : _props$hasNewTokens,
    _props$appearance = props.appearance,
    appearanceProp = _props$appearance === void 0 ? parentConfig.appearance : _props$appearance,
    _props$locale = props.locale,
    locale = _props$locale === void 0 ? parentLocale !== null && parentLocale !== void 0 ? parentLocale : "ru" : _props$locale,
    _props$onDetectAppear = props.onDetectAppearanceByBridge,
    onDetectAppearanceByBridge = _props$onDetectAppear === void 0 ? noop : _props$onDetectAppear;
  var appearance = useAutoDetectAppearance(appearanceProp, onDetectAppearanceByBridge);
  var _useDOM = useDOM(),
    document = _useDOM.document;
  useIsomorphicLayoutEffect(function () {
    var VKUITokensClassName = generateVKUITokensClassName(platform, appearance);

    // eslint-disable-next-line no-restricted-properties
    document.body.classList.add(VKUITokensClassName);
    return function () {
      // eslint-disable-next-line no-restricted-properties
      document.body.classList.remove(VKUITokensClassName);
    };
  }, [platform, appearance]);
  var configContext = useObjectMemo({
    webviewType: webviewType,
    isWebView: isWebView,
    transitionMotionEnabled: transitionMotionEnabled,
    hasNewTokens: hasNewTokens,
    platform: platform,
    appearance: appearance
  });
  return /*#__PURE__*/React.createElement(ConfigProviderContext.Provider, {
    value: configContext
  }, /*#__PURE__*/React.createElement(LocaleProviderContext.Provider, {
    value: locale
  }, /*#__PURE__*/React.createElement(AppearanceProvider, {
    appearance: configContext.appearance
  }, children)));
};
//# sourceMappingURL=ConfigProvider.js.map