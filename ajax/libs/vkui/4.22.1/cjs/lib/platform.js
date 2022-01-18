"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.platform = platform;
exports.IS_PLATFORM_ANDROID = exports.IS_PLATFORM_IOS = exports.VKCOM = exports.IOS = exports.ANDROID = exports.Platform = void 0;

var _browser = require("./browser");

var Platform;
exports.Platform = Platform;

(function (Platform) {
  Platform["ANDROID"] = "android";
  Platform["IOS"] = "ios";
  Platform["VKCOM"] = "vkcom";
})(Platform || (exports.Platform = Platform = {}));

var ANDROID = Platform.ANDROID;
exports.ANDROID = ANDROID;
var IOS = Platform.IOS;
exports.IOS = IOS;
var VKCOM = Platform.VKCOM;
exports.VKCOM = VKCOM;

function platform(browserInfo) {
  if (!browserInfo) {
    browserInfo = (0, _browser.computeBrowserInfo)();
  }

  return browserInfo.system === 'ios' ? IOS : ANDROID;
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