"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform = void 0;
exports.platform = platform;
var _browser = require("./browser");
var _vkjs = require("@vkontakte/vkjs");
var _dom = require("./dom");
var Platform;
exports.Platform = Platform;
(function (Platform) {
  Platform["ANDROID"] = "android";
  Platform["IOS"] = "ios";
  Platform["VKCOM"] = "vkcom";
})(Platform || (exports.Platform = Platform = {}));
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
    var parsedQuery = _vkjs.querystring.parse(queryString);
    var platformAliasByQuery = parsedQuery['vk_platform'];
    return typeof platformAliasByQuery === 'string' && isPlatformAlias(platformAliasByQuery) ? PLATFORM_ALIAS[platformAliasByQuery] : undefined;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
var platformByQueryString = _dom.canUseDOM ? getPlatformByQueryString(location.search) : undefined;
function platform(browserInfo) {
  if (platformByQueryString) {
    return platformByQueryString;
  }
  if (!browserInfo) {
    browserInfo = (0, _browser.computeBrowserInfo)();
  }
  return browserInfo.system === 'ios' ? Platform.IOS : Platform.ANDROID;
}
//# sourceMappingURL=platform.js.map