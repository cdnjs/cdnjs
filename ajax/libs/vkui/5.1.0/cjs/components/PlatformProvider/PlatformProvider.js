"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformProvider = PlatformProvider;
var _react = _interopRequireDefault(require("react"));
var _ConfigProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
var _tokensClassProvider = require("../../lib/tokensClassProvider");
var _useAppearance = require("../../hooks/useAppearance");
/**
 * Компонент, позволяющий переопределить платформу для части приложения
 *
 * @version 5.1.0
 * @see https://vkcom.github.io/VKUI/#/PlatformProvider
 */
function PlatformProvider(_ref) {
  var value = _ref.value,
    children = _ref.children;
  var appearance = (0, _useAppearance.useAppearance)();
  return /*#__PURE__*/_react.default.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
    platform: value
  }, /*#__PURE__*/_react.default.createElement(_tokensClassProvider.TokensClassProvider, {
    platform: value,
    appearance: appearance
  }, children));
}
//# sourceMappingURL=PlatformProvider.js.map