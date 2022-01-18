import { computeBrowserInfo } from "./browser";
export var Platform;

(function (Platform) {
  Platform["ANDROID"] = "android";
  Platform["IOS"] = "ios";
  Platform["VKCOM"] = "vkcom";
})(Platform || (Platform = {}));

export var ANDROID = Platform.ANDROID;
export var IOS = Platform.IOS;
export var VKCOM = Platform.VKCOM;
export function platform(browserInfo) {
  if (!browserInfo) {
    browserInfo = computeBrowserInfo();
  }

  return browserInfo.system === 'ios' ? IOS : ANDROID;
}
var platformName = platform();
/**
 * @deprecated для определения платформы используйте withPlatform или usePlatform
 */

export var IS_PLATFORM_IOS = platformName === IOS;
/**
 * @deprecated для определения платформы используйте withPlatform или usePlatform
 */

export var IS_PLATFORM_ANDROID = platformName === ANDROID;
//# sourceMappingURL=platform.js.map