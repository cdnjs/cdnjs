import * as React from 'react';
import vkBridge from '@vkontakte/vk-bridge';
import { platform } from '../../lib/platform';
export var WebviewType;
(function (WebviewType) {
  WebviewType["VKAPPS"] = "vkapps";
  WebviewType["INTERNAL"] = "internal";
})(WebviewType || (WebviewType = {}));
export var ConfigProviderContext = /*#__PURE__*/React.createContext({
  webviewType: WebviewType.VKAPPS,
  isWebView: vkBridge.isWebView(),
  transitionMotionEnabled: true,
  platform: platform(),
  appearance: undefined,
  // undefined обозначает что тема должна определиться автоматически
  locale: 'ru'
});
export var useConfigProvider = function useConfigProvider() {
  return React.useContext(ConfigProviderContext);
};
//# sourceMappingURL=ConfigProviderContext.js.map