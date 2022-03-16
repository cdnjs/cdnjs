"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _vkBridge = _interopRequireDefault(require("@vkontakte/vk-bridge"));

var _dom = require("../../lib/dom");

var _ConfigProviderContext = require("./ConfigProviderContext");

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _useObjectMemo = require("../../hooks/useObjectMemo");

var _utils = require("../../lib/utils");

var _warnOnce = require("../../lib/warnOnce");

var _scheme2 = require("../../helpers/scheme");

var _AppearanceProvider = require("../AppearanceProvider/AppearanceProvider");

var _LocaleProviderContext = require("../LocaleProviderContext/LocaleProviderContext");

var _platform = require("../../lib/platform");

var warn = (0, _warnOnce.warnOnce)("ConfigProvider");

function useSchemeDetector(node, _scheme) {
  var inherit = _scheme === "inherit";
  var getScheme = React.useCallback(function () {
    if (!inherit || !_dom.canUseDOM || !node) {
      return undefined;
    }

    return node.getAttribute("scheme");
  }, [inherit, node]);

  var _React$useState = React.useState(getScheme()),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      resolvedScheme = _React$useState2[0],
      setScheme = _React$useState2[1];

  React.useEffect(function () {
    if (!inherit || !node) {
      return _utils.noop;
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
  return scheme === _scheme2.Scheme.SPACE_GRAY || scheme === _scheme2.Scheme.VKCOM_DARK ? "dark" : "light";
};

var ConfigProvider = function ConfigProvider(_ref) {
  var children = _ref.children,
      _ref$webviewType = _ref.webviewType,
      webviewType = _ref$webviewType === void 0 ? _ConfigProviderContext.WebviewType.VKAPPS : _ref$webviewType,
      _ref$isWebView = _ref.isWebView,
      isWebView = _ref$isWebView === void 0 ? _vkBridge.default.isWebView() : _ref$isWebView,
      _ref$transitionMotion = _ref.transitionMotionEnabled,
      transitionMotionEnabled = _ref$transitionMotion === void 0 ? true : _ref$transitionMotion,
      _ref$platform = _ref.platform,
      platform = _ref$platform === void 0 ? (0, _platform.platform)() : _ref$platform,
      _ref$hasNewTokens = _ref.hasNewTokens,
      hasNewTokens = _ref$hasNewTokens === void 0 ? false : _ref$hasNewTokens,
      appearance = _ref.appearance,
      scheme = _ref.scheme,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? "ru" : _ref$locale;
  var normalizedScheme = (0, _scheme2.normalizeScheme)({
    scheme: scheme,
    platform: platform,
    appearance: appearance
  });

  var _useDOM = (0, _dom.useDOM)(),
      document = _useDOM.document;

  var target = document === null || document === void 0 ? void 0 : document.body;
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (normalizedScheme === "inherit") {
      return _utils.noop;
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
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var VKUITokensClassName = (0, _AppearanceProvider.generateVKUITokensClassName)(platform, derivedAppearance);
    target === null || target === void 0 ? void 0 : target.classList.add(VKUITokensClassName);
    return function () {
      target === null || target === void 0 ? void 0 : target.classList.remove(VKUITokensClassName);
    };
  }, [platform, derivedAppearance]);
  var configContext = (0, _useObjectMemo.useObjectMemo)({
    webviewType: webviewType,
    isWebView: isWebView,
    transitionMotionEnabled: transitionMotionEnabled,
    hasNewTokens: hasNewTokens,
    platform: platform,
    scheme: scheme,
    appearance: appearance || derivedAppearance
  });
  return (0, _jsxRuntime.createScopedElement)(_ConfigProviderContext.ConfigProviderContext.Provider, {
    value: configContext
  }, (0, _jsxRuntime.createScopedElement)(_LocaleProviderContext.LocaleProviderContext.Provider, {
    value: locale
  }, (0, _jsxRuntime.createScopedElement)(_AppearanceProvider.AppearanceProvider, {
    appearance: configContext.appearance
  }, children)));
}; // eslint-disable-next-line import/no-default-export


var _default = ConfigProvider;
exports.default = _default;
//# sourceMappingURL=ConfigProvider.js.map