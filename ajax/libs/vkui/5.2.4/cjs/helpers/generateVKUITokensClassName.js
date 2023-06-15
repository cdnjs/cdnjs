"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateVKUITokensClassName = void 0;
var _platform = require("../lib/platform");
var generateVKUITokensClassName = function generateVKUITokensClassName(platform, appearance) {
  var tokensPlatform;
  switch (platform) {
    case _platform.Platform.ANDROID:
      tokensPlatform = 'vkBase';
      break;
    case _platform.Platform.IOS:
      tokensPlatform = 'vkIOS';
      break;
    case _platform.Platform.VKCOM:
      tokensPlatform = 'vkCom';
      break;
    default:
      tokensPlatform = platform;
  }
  return "vkui--".concat(tokensPlatform, "--").concat(appearance);
};
exports.generateVKUITokensClassName = generateVKUITokensClassName;
//# sourceMappingURL=generateVKUITokensClassName.js.map