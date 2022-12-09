"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigProvider = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _dom = require("../../lib/dom");
var _ConfigProviderContext = require("./ConfigProviderContext");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _useObjectMemo = require("../../hooks/useObjectMemo");
var _utils = require("../../lib/utils");
var _warnOnce = require("../../lib/warnOnce");
var _scheme2 = require("../../helpers/scheme");
var _AppearanceProvider = require("../AppearanceProvider/AppearanceProvider");
var _LocaleProviderContext = require("../LocaleProviderContext/LocaleProviderContext");
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

/**
 * @see https://vkcom.github.io/VKUI/#/ConfigProvider
 */
var ConfigProvider = function ConfigProvider(props) {
  var parentLocale = React.useContext(_LocaleProviderContext.LocaleProviderContext);
  var parentConfig = React.useContext(_ConfigProviderContext.ConfigProviderContext);
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
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var VKUITokensClassName = (0, _AppearanceProvider.generateVKUITokensClassName)(platform, derivedAppearance);

    // eslint-disable-next-line no-restricted-properties
    target === null || target === void 0 ? void 0 : target.classList.add(VKUITokensClassName);
    return function () {
      // eslint-disable-next-line no-restricted-properties
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
};
exports.ConfigProvider = ConfigProvider;
//# sourceMappingURL=ConfigProvider.js.map