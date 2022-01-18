"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigProviderContext = exports.defaultConfigProviderProps = exports.WebviewType = exports.ExternalScheme = exports.Scheme = exports.Appearance = void 0;

var React = _interopRequireWildcard(require("react"));

var _vkBridge = _interopRequireDefault(require("@vkontakte/vk-bridge"));

var _platform = require("../../lib/platform");

var Appearance;
exports.Appearance = Appearance;

(function (Appearance) {
  Appearance["DARK"] = "dark";
  Appearance["LIGHT"] = "light";
})(Appearance || (exports.Appearance = Appearance = {}));

var Scheme; // Схемы, которых нет в VKUI, но мы знаем их appearance

exports.Scheme = Scheme;

(function (Scheme) {
  Scheme["DEPRECATED_CLIENT_LIGHT"] = "client_light";
  Scheme["DEPRECATED_CLIENT_DARK"] = "client_dark";
  Scheme["BRIGHT_LIGHT"] = "bright_light";
  Scheme["SPACE_GRAY"] = "space_gray";
  Scheme["VKCOM"] = "vkcom";
})(Scheme || (exports.Scheme = Scheme = {}));

var ExternalScheme;
exports.ExternalScheme = ExternalScheme;

(function (ExternalScheme) {
  ExternalScheme["VKCOM_LIGHT"] = "vkcom_light";
  ExternalScheme["VKCOM_DARK"] = "vkcom_dark";
})(ExternalScheme || (exports.ExternalScheme = ExternalScheme = {}));

var WebviewType;
exports.WebviewType = WebviewType;

(function (WebviewType) {
  WebviewType["VKAPPS"] = "vkapps";
  WebviewType["INTERNAL"] = "internal";
})(WebviewType || (exports.WebviewType = WebviewType = {}));

var defaultConfigProviderProps = {
  webviewType: WebviewType.VKAPPS,
  isWebView: _vkBridge.default.isWebView(),
  scheme: Scheme.BRIGHT_LIGHT,
  transitionMotionEnabled: true,
  platform: (0, _platform.platform)() // appearance is auto-detected by default
  // appearance: Appearance.LIGHT,

};
exports.defaultConfigProviderProps = defaultConfigProviderProps;
var ConfigProviderContext = /*#__PURE__*/React.createContext(defaultConfigProviderProps);
exports.ConfigProviderContext = ConfigProviderContext;
//# sourceMappingURL=ConfigProviderContext.js.map