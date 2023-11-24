import { querystring } from "@vkontakte/vkjs";
import { computeBrowserInfo } from "./browser";
import { canUseDOM } from "./dom";
export var Platform;
(function(Platform) {
    Platform["ANDROID"] = "android";
    Platform["IOS"] = "ios";
    Platform["VKCOM"] = "vkcom";
})(Platform || (Platform = {}));
/**
 * TODO [>=6]: удалить из VKUI
 *
 * Значение, которое передаётся в качестве query-параметра при открытии VK Mini Apps
 * @see {@link https://dev.vk.com/mini-apps/development/launch-params#vk_platform vk_platform}
 *
 * @deprecated v5.8.0
 */ function getPlatformByQueryString(queryString) {
    var PLATFORM_ALIAS = {
        desktop_web: "vkcom"
    };
    var isPlatformAlias = function(platformAlias) {
        return platformAlias in PLATFORM_ALIAS;
    };
    try {
        var parsedQuery = querystring.parse(queryString);
        var platformAliasByQuery = parsedQuery["vk_platform"];
        return typeof platformAliasByQuery === "string" && isPlatformAlias(platformAliasByQuery) ? PLATFORM_ALIAS[platformAliasByQuery] : undefined;
    } catch (e) {
        console.warn(e);
        return;
    }
}
var platformByQueryString = canUseDOM ? getPlatformByQueryString(location.search) : undefined;
export function platform(browserInfo) {
    if (platformByQueryString) {
        return platformByQueryString;
    }
    if (!browserInfo) {
        browserInfo = computeBrowserInfo();
    }
    return browserInfo.system === "ios" ? "ios" : "android";
}

//# sourceMappingURL=platform.js.map