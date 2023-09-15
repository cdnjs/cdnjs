import * as React from "react";
import vkBridge from "@vkontakte/vk-bridge";
import { platform } from "../../lib/platform";
export var WebviewType;
(function(WebviewType) {
    WebviewType["VKAPPS"] = "vkapps";
    WebviewType["INTERNAL"] = "internal";
})(WebviewType || (WebviewType = {}));
export var ConfigProviderContext = /*#__PURE__*/ React.createContext({
    // TODO [>=6]: удалить свойство (#5049).
    webviewType: undefined,
    // TODO [>=6]: сделать по умолчанию `false` (#5049).
    hasCustomPanelHeaderAfter: true,
    customPanelHeaderAfterMinWidth: 90,
    // TODO [>=6]: удалить использование vkBridge. Использовать `false` вместо него (#5049).
    isWebView: vkBridge.isWebView(),
    transitionMotionEnabled: true,
    platform: platform(),
    appearance: undefined,
    locale: "ru"
});
export var useConfigProvider = function() {
    return React.useContext(ConfigProviderContext);
};

//# sourceMappingURL=ConfigProviderContext.js.map