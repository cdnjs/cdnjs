import * as React from 'react';
import vkBridge from '@vkontakte/vk-bridge';
import { platform } from "../../lib/platform";
export var Appearance;

(function (Appearance) {
  Appearance["DARK"] = "dark";
  Appearance["LIGHT"] = "light";
})(Appearance || (Appearance = {}));

export var Scheme; // Схемы, которых нет в VKUI, но мы знаем их appearance

(function (Scheme) {
  Scheme["DEPRECATED_CLIENT_LIGHT"] = "client_light";
  Scheme["DEPRECATED_CLIENT_DARK"] = "client_dark";
  Scheme["BRIGHT_LIGHT"] = "bright_light";
  Scheme["SPACE_GRAY"] = "space_gray";
  Scheme["VKCOM"] = "vkcom";
})(Scheme || (Scheme = {}));

export var ExternalScheme;

(function (ExternalScheme) {
  ExternalScheme["VKCOM_LIGHT"] = "vkcom_light";
  ExternalScheme["VKCOM_DARK"] = "vkcom_dark";
})(ExternalScheme || (ExternalScheme = {}));

export var WebviewType;

(function (WebviewType) {
  WebviewType["VKAPPS"] = "vkapps";
  WebviewType["INTERNAL"] = "internal";
})(WebviewType || (WebviewType = {}));

export var defaultConfigProviderProps = {
  webviewType: WebviewType.VKAPPS,
  isWebView: vkBridge.isWebView(),
  scheme: Scheme.BRIGHT_LIGHT,
  transitionMotionEnabled: true,
  platform: platform() // appearance is auto-detected by default
  // appearance: Appearance.LIGHT,

};
export var ConfigProviderContext = /*#__PURE__*/React.createContext(defaultConfigProviderProps);
//# sourceMappingURL=ConfigProviderContext.js.map