import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import * as React from 'react';
import { ConfigProviderContext, useConfigProvider } from './ConfigProviderContext';
import { TokensClassProvider } from '../../lib/tokensClassProvider';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { generateVKUITokensClassName } from '../../helpers/generateVKUITokensClassName';
import { useAutoDetectAppearance } from '../../hooks/useAutoDetectAppearance';
import { noop } from '@vkontakte/vkjs';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { useDOM } from '../../lib/dom';
/**
 * @see https://vkcom.github.io/VKUI/#/ConfigProvider
 */
export var ConfigProvider = function ConfigProvider(props) {
  var parentConfig = useConfigProvider();
  var _parentConfig$props = _objectSpread(_objectSpread({}, parentConfig), props),
    children = _parentConfig$props.children,
    webviewType = _parentConfig$props.webviewType,
    isWebView = _parentConfig$props.isWebView,
    transitionMotionEnabled = _parentConfig$props.transitionMotionEnabled,
    platform = _parentConfig$props.platform,
    locale = _parentConfig$props.locale,
    appearanceProp = _parentConfig$props.appearance,
    _parentConfig$props$o = _parentConfig$props.onDetectAppearanceByBridge,
    onDetectAppearanceByBridge = _parentConfig$props$o === void 0 ? noop : _parentConfig$props$o;
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
    platform: platform,
    locale: locale,
    appearance: appearance
  });
  return /*#__PURE__*/React.createElement(ConfigProviderContext.Provider, {
    value: configContext
  }, /*#__PURE__*/React.createElement(TokensClassProvider, {
    platform: platform,
    appearance: appearance
  }, children));
};
//# sourceMappingURL=ConfigProvider.js.map