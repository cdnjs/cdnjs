import { Platform } from '../lib/platform';
export var generateVKUITokensClassName = function generateVKUITokensClassName(platform, appearance) {
  var tokensPlatform;
  switch (platform) {
    case Platform.ANDROID:
      tokensPlatform = 'vkBase';
      break;
    case Platform.IOS:
      tokensPlatform = 'vkIOS';
      break;
    case Platform.VKCOM:
      tokensPlatform = 'vkCom';
      break;
    default:
      tokensPlatform = platform;
  }
  return "vkui--".concat(tokensPlatform, "--").concat(appearance);
};
//# sourceMappingURL=generateVKUITokensClassName.js.map