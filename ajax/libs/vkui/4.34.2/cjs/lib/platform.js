"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VKCOM = exports.Platform = exports.IS_PLATFORM_IOS = exports.IS_PLATFORM_ANDROID = exports.IOS = exports.ANDROID = void 0;
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
  var parsedQuery = _vkjs.querystring.parse(queryString);

  var platformAliasByQuery = parsedQuery["vk_platform"];
  return typeof platformAliasByQuery === "string" && isPlatformAlias(platformAliasByQuery) ? PLATFORM_ALIAS[platformAliasByQuery] : undefined;
}

var platformByQueryString = _dom.canUseDOM ? getPlatformByQueryString(location.search) : undefined;
var ANDROID = Platform.ANDROID;
exports.ANDROID = ANDROID;
var IOS = Platform.IOS;
exports.IOS = IOS;
var VKCOM = Platform.VKCOM;
exports.VKCOM = VKCOM;

function platform(browserInfo) {
  if (platformByQueryString) {
    return platformByQueryString;
  }

  if (!browserInfo) {
    browserInfo = (0, _browser.computeBrowserInfo)();
  }

  return browserInfo.system === "ios" ? IOS : ANDROID;
}

var platformName = platform();
/**
 * @deprecated для определения платформы используйте withPlatform или usePlatform
 */

var IS_PLATFORM_IOS = platformName === IOS;
/**
 * @deprecated для определения платформы используйте withPlatform или usePlatform
 */

exports.IS_PLATFORM_IOS = IS_PLATFORM_IOS;
var IS_PLATFORM_ANDROID = platformName === ANDROID;
exports.IS_PLATFORM_ANDROID = IS_PLATFORM_ANDROID;
//# sourceMappingURL=platform.js.map