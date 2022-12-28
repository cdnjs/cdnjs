"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocaleProvider = LocaleProvider;
var _react = _interopRequireDefault(require("react"));
var _ConfigProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
/**
 * Компонент, прокидывающий локаль. Список можно найти в
 * [реестре языковых подмёток IANA](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)
 *
 * @version 5.0.0
 * @see https://vkcom.github.io/VKUI/#/LocaleProvider
 */
function LocaleProvider(_ref) {
  var value = _ref.value,
    children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
    locale: value
  }, children);
}
//# sourceMappingURL=LocaleProvider.js.map