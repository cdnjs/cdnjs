"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigProvider = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var React = _interopRequireWildcard(require("react"));
var _ConfigProviderContext = require("./ConfigProviderContext");
var _tokensClassProvider = require("../../lib/tokensClassProvider");
var _useObjectMemo = require("../../hooks/useObjectMemo");
var _generateVKUITokensClassName = require("../../helpers/generateVKUITokensClassName");
var _useAutoDetectAppearance = require("../../hooks/useAutoDetectAppearance");
var _vkjs = require("@vkontakte/vkjs");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _dom = require("../../lib/dom");
/**
 * @see https://vkcom.github.io/VKUI/#/ConfigProvider
 */
var ConfigProvider = function ConfigProvider(props) {
  var parentConfig = (0, _ConfigProviderContext.useConfigProvider)();
  var _parentConfig$props = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, parentConfig), props),
    children = _parentConfig$props.children,
    webviewType = _parentConfig$props.webviewType,
    isWebView = _parentConfig$props.isWebView,
    transitionMotionEnabled = _parentConfig$props.transitionMotionEnabled,
    platform = _parentConfig$props.platform,
    locale = _parentConfig$props.locale,
    appearanceProp = _parentConfig$props.appearance,
    _parentConfig$props$o = _parentConfig$props.onDetectAppearanceByBridge,
    onDetectAppearanceByBridge = _parentConfig$props$o === void 0 ? _vkjs.noop : _parentConfig$props$o;
  var appearance = (0, _useAutoDetectAppearance.useAutoDetectAppearance)(appearanceProp, onDetectAppearanceByBridge);
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var VKUITokensClassName = (0, _generateVKUITokensClassName.generateVKUITokensClassName)(platform, appearance);

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
    platform: platform,
    locale: locale,
    appearance: appearance
  });
  return /*#__PURE__*/React.createElement(_ConfigProviderContext.ConfigProviderContext.Provider, {
    value: configContext
  }, /*#__PURE__*/React.createElement(_tokensClassProvider.TokensClassProvider, {
    platform: platform,
    appearance: appearance
  }, children));
};
exports.ConfigProvider = ConfigProvider;
//# sourceMappingURL=ConfigProvider.js.map