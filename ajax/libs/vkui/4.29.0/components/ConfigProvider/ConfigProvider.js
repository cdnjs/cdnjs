import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import vkBridge from "@vkontakte/vk-bridge";
import { canUseDOM, useDOM } from "../../lib/dom";
import { ConfigProviderContext, WebviewType } from "./ConfigProviderContext";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useObjectMemo } from "../../hooks/useObjectMemo";
import { noop } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";
import { normalizeScheme, Scheme } from "../../helpers/scheme";
import { AppearanceProvider, generateVKUITokensClassName } from "../AppearanceProvider/AppearanceProvider";
import { LocaleProviderContext } from "../LocaleProviderContext/LocaleProviderContext";
import { platform as resolvePlatform } from "../../lib/platform";
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

var ConfigProvider = function ConfigProvider(_ref) {
  var children = _ref.children,
      _ref$webviewType = _ref.webviewType,
      webviewType = _ref$webviewType === void 0 ? WebviewType.VKAPPS : _ref$webviewType,
      _ref$isWebView = _ref.isWebView,
      isWebView = _ref$isWebView === void 0 ? vkBridge.isWebView() : _ref$isWebView,
      _ref$transitionMotion = _ref.transitionMotionEnabled,
      transitionMotionEnabled = _ref$transitionMotion === void 0 ? true : _ref$transitionMotion,
      _ref$platform = _ref.platform,
      platform = _ref$platform === void 0 ? resolvePlatform() : _ref$platform,
      _ref$hasNewTokens = _ref.hasNewTokens,
      hasNewTokens = _ref$hasNewTokens === void 0 ? false : _ref$hasNewTokens,
      appearance = _ref.appearance,
      scheme = _ref.scheme,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? "ru" : _ref$locale;
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

    if (process.env.NODE_ENV === "development" && target !== null && target !== void 0 && target.hasAttribute("scheme")) {
      warn('<body scheme> was set before VKUI mount - did you forget scheme="inherit"?');
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
    target === null || target === void 0 ? void 0 : target.classList.add(VKUITokensClassName);
    return function () {
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
}; // eslint-disable-next-line import/no-default-export


export default ConfigProvider;
//# sourceMappingURL=ConfigProvider.js.map