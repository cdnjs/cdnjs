import { computeBrowserInfo } from './browser';
import { querystring } from '@vkontakte/vkjs';
import { canUseDOM } from './dom';
export var Platform;
(function (Platform) {
  Platform["ANDROID"] = "android";
  Platform["IOS"] = "ios";
  Platform["VKCOM"] = "vkcom";
})(Platform || (Platform = {}));
var PLATFORM_ALIAS = {
  desktop_web: Platform.VKCOM
};
function isPlatformAlias(platformAlias) {
  return platformAlias in PLATFORM_ALIAS;
}

/**
 * Значение, которое передаётся в качестве query-параметра при открытии VK Mini Apps
 * @see {@link https://dev.vk.com/mini-apps/development/launch-params#vk_platform vk_platform}
 */
function getPlatformByQueryString(queryString) {
  try {
    var parsedQuery = querystring.parse(queryString);
    var platformAliasByQuery = parsedQuery['vk_platform'];
    return typeof platformAliasByQuery === 'string' && isPlatformAlias(platformAliasByQuery) ? PLATFORM_ALIAS[platformAliasByQuery] : undefined;
  } catch (e) {
    console.warn(e);
    return undefined;
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
  return browserInfo.system === 'ios' ? Platform.IOS : Platform.ANDROID;
}
//# sourceMappingURL=platform.js.map