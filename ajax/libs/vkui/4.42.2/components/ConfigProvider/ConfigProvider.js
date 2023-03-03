import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { canUseDOM, useDOM } from "../../lib/dom";
import { ConfigProviderContext } from "./ConfigProviderContext";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useObjectMemo } from "../../hooks/useObjectMemo";
import { noop } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";
import { normalizeScheme, Scheme } from "../../helpers/scheme";
import { AppearanceProvider, generateVKUITokensClassName } from "../AppearanceProvider/AppearanceProvider";
import { LocaleProviderContext } from "../LocaleProviderContext/LocaleProviderContext";
var warn = warnOnce("ConfigProvider");
function useSchemeDetector(node, _scheme) {
  var inherit = _scheme === "inherit";
  var getScheme = React.useCallback(function () {
    if (!inherit || !canUseDOM || !node) {
      return undefined;
    }
    return node.getAttribute("scheme");
  }, [inherit, node]);
  var _React$useState = React.useState(getScheme()),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    resolvedScheme = _React$useState2[0],
    setScheme = _React$useState2[1];
  React.useEffect(function () {
    if (!inherit || !node) {
      return noop;
    }
    setScheme(getScheme());
    var observer = new MutationObserver(function () {
      return setScheme(getScheme());
    });
    observer.observe(node, {
      attributes: true,
      attributeFilter: ["scheme"]
    });
    return function () {
      return observer.disconnect();
    };
  }, [getScheme, inherit, node]);
  return _scheme === "inherit" ? resolvedScheme : _scheme;
}
var deriveAppearance = function deriveAppearance(scheme) {
  return scheme === Scheme.SPACE_GRAY || scheme === Scheme.VKCOM_DARK ? "dark" : "light";
};

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
    appearance = _props$appearance === void 0 ? parentConfig.appearance : _props$appearance,
    scheme = props.scheme,
    _props$locale = props.locale,
    locale = _props$locale === void 0 ? parentLocale !== null && parentLocale !== void 0 ? parentLocale : "ru" : _props$locale;
  var normalizedScheme = normalizeScheme({
    scheme: scheme,
    platform: platform,
    appearance: appearance
  });
  var _useDOM = useDOM(),
    document = _useDOM.document;
  var target = document === null || document === void 0 ? void 0 : document.body;
  useIsomorphicLayoutEffect(function () {
    if (normalizedScheme === "inherit") {
      return noop;
    }
    if (process.env.NODE_ENV === "development" && target !== null && target !== void 0 && target.hasAttribute("scheme") && parentConfig.appearance === undefined // appearance не была вычислена в родительском конфиге, @deprecated будет удалено в 5.0.0
    ) {
      warn('<body scheme> был установлен перед монтированием VKUI - вы не забыли scheme="inherit"?');
    }
    target === null || target === void 0 ? void 0 : target.setAttribute("scheme", normalizedScheme);
    return function () {
      return target === null || target === void 0 ? void 0 : target.removeAttribute("scheme");
    };
  }, [normalizedScheme]);
  var realScheme = useSchemeDetector(target, normalizedScheme);
  var derivedAppearance = deriveAppearance(realScheme);
  useIsomorphicLayoutEffect(function () {
    var VKUITokensClassName = generateVKUITokensClassName(platform, derivedAppearance);

    // eslint-disable-next-line no-restricted-properties
    target === null || target === void 0 ? void 0 : target.classList.add(VKUITokensClassName);
    return function () {
      // eslint-disable-next-line no-restricted-properties
      target === null || target === void 0 ? void 0 : target.classList.remove(VKUITokensClassName);
    };
  }, [platform, derivedAppearance]);
  var configContext = useObjectMemo({
    webviewType: webviewType,
    isWebView: isWebView,
    transitionMotionEnabled: transitionMotionEnabled,
    hasNewTokens: hasNewTokens,
    platform: platform,
    scheme: scheme,
    appearance: appearance || derivedAppearance
  });
  return createScopedElement(ConfigProviderContext.Provider, {
    value: configContext
  }, createScopedElement(LocaleProviderContext.Provider, {
    value: locale
  }, createScopedElement(AppearanceProvider, {
    appearance: configContext.appearance
  }, children)));
};
//# sourceMappingURL=ConfigProvider.js.map