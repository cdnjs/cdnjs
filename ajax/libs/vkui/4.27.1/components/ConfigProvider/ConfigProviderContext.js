import * as React from "react";
import vkBridge from "@vkontakte/vk-bridge";
import { platform } from "../../lib/platform";
export var WebviewType;

(function (WebviewType) {
  WebviewType["VKAPPS"] = "vkapps";
  WebviewType["INTERNAL"] = "internal";
})(WebviewType || (WebviewType = {}));

export var defaultConfigProviderProps = {
  webviewType: WebviewType.VKAPPS,
  isWebView: vkBridge.isWebView(),
  transitionMotionEnabled: true,
  platform: platform(),
  hasNewTokens: false // appearance is auto-detected by default
  // appearance: Appearance.LIGHT,

};
export var ConfigProviderContext = /*#__PURE__*/React.createContext(defaultConfigProviderProps);
//# sourceMappingURL=ConfigProviderContext.js.map