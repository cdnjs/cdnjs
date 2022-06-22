"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebviewType = exports.ConfigProviderContext = void 0;

var React = _interopRequireWildcard(require("react"));

var _vkBridge = _interopRequireDefault(require("@vkontakte/vk-bridge"));

var _platform = require("../../lib/platform");

var WebviewType;
exports.WebviewType = WebviewType;

(function (WebviewType) {
  WebviewType["VKAPPS"] = "vkapps";
  WebviewType["INTERNAL"] = "internal";
})(WebviewType || (exports.WebviewType = WebviewType = {}));

var ConfigProviderContext = /*#__PURE__*/React.createContext({
  webviewType: WebviewType.VKAPPS,
  isWebView: _vkBridge.default.isWebView(),
  transitionMotionEnabled: true,
  platform: (0, _platform.platform)(),
  hasNewTokens: false // appearance is auto-detected by default
  // appearance: Appearance.LIGHT,

});
exports.ConfigProviderContext = ConfigProviderContext;
//# sourceMappingURL=ConfigProviderContext.js.map