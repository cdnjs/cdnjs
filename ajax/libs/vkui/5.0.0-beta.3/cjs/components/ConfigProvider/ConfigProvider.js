"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigProvider = void 0;
var React = _interopRequireWildcard(require("react"));
var _ConfigProviderContext = require("./ConfigProviderContext");
var _useObjectMemo = require("../../hooks/useObjectMemo");
var _AppearanceProvider = require("../AppearanceProvider/AppearanceProvider");
var _LocaleProviderContext = require("../LocaleProviderContext/LocaleProviderContext");
var _useAutoDetectAppearance = require("../../hooks/useAutoDetectAppearance");
var _utils = require("../../lib/utils");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _dom = require("../../lib/dom");
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
    appearanceProp = _props$appearance === void 0 ? parentConfig.appearance : _props$appearance,
    _props$locale = props.locale,
    locale = _props$locale === void 0 ? parentLocale !== null && parentLocale !== void 0 ? parentLocale : "ru" : _props$locale,
    _props$onDetectAppear = props.onDetectAppearanceByBridge,
    onDetectAppearanceByBridge = _props$onDetectAppear === void 0 ? _utils.noop : _props$onDetectAppear;
  var appearance = (0, _useAutoDetectAppearance.useAutoDetectAppearance)(appearanceProp, onDetectAppearanceByBridge);
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var VKUITokensClassName = (0, _AppearanceProvider.generateVKUITokensClassName)(platform, appearance);

    // eslint-disable-next-line no-restricted-properties
    document.body.classList.add(VKUITokensClassName);
    return function () {
      // eslint-disable-next-line no-restricted-properties
      document.body.classList.remove(VKUITokensClassName);
    };
  }, [platform, appearance]);
  var configContext = (0, _useObjectMemo.useObjectMemo)({
    webviewType: webviewType,
    isWebView: isWebView,
    transitionMotionEnabled: transitionMotionEnabled,
    hasNewTokens: hasNewTokens,
    platform: platform,
    appearance: appearance
  });
  return /*#__PURE__*/React.createElement(_ConfigProviderContext.ConfigProviderContext.Provider, {
    value: configContext
  }, /*#__PURE__*/React.createElement(_LocaleProviderContext.LocaleProviderContext.Provider, {
    value: locale
  }, /*#__PURE__*/React.createElement(_AppearanceProvider.AppearanceProvider, {
    appearance: configContext.appearance
  }, children)));
};
exports.ConfigProvider = ConfigProvider;
//# sourceMappingURL=ConfigProvider.js.map