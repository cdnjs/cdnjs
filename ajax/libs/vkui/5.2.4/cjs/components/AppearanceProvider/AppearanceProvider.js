"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppearanceProvider = void 0;
var React = _interopRequireWildcard(require("react"));
var _usePlatform = require("../../hooks/usePlatform");
var _tokensClassProvider = require("../../lib/tokensClassProvider");
var _ConfigProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
/**
 * @see https://vkcom.github.io/VKUI/#/AppearanceProvider
 */
var AppearanceProvider = function AppearanceProvider(_ref) {
  var appearance = _ref.appearance,
    children = _ref.children;
  var platform = (0, _usePlatform.usePlatform)();
  return /*#__PURE__*/React.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
    appearance: appearance
  }, /*#__PURE__*/React.createElement(_tokensClassProvider.TokensClassProvider, {
    platform: platform,
    appearance: appearance
  }, children));
};
exports.AppearanceProvider = AppearanceProvider;
//# sourceMappingURL=AppearanceProvider.js.map