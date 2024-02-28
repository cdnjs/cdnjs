import { querystring } from '@vkontakte/vkjs';
import { computeBrowserInfo } from './browser';
import { canUseDOM } from './dom';
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
    const PLATFORM_ALIAS = {
        desktop_web: "vkcom"
    };
    const isPlatformAlias = (platformAlias)=>platformAlias in PLATFORM_ALIAS;
    try {
        const parsedQuery = querystring.parse(queryString);
        const platformAliasByQuery = parsedQuery['vk_platform'];
        return typeof platformAliasByQuery === 'string' && isPlatformAlias(platformAliasByQuery) ? PLATFORM_ALIAS[platformAliasByQuery] : undefined;
    } catch (e) {
        console.warn(e);
        return;
    }
}
const platformByQueryString = canUseDOM ? getPlatformByQueryString(location.search) : undefined;
export function platform(browserInfo) {
    if (platformByQueryString) {
        return platformByQueryString;
    }
    if (!browserInfo) {
        browserInfo = computeBrowserInfo();
    }
    return browserInfo.system === 'ios' ? "ios" : "android";
}

//# sourceMappingURL=platform.js.map