"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeBrowserInfo = computeBrowserInfo;
exports.System = void 0;

var _vkjs = require("@vkontakte/vkjs");

var System;
exports.System = System;

(function (System) {
  System["IOS"] = "ios";
  System["UNKNOWN"] = "";
})(System || (exports.System = System = {}));

var memoized = {};

function computeBrowserInfo() {
  var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (memoized[userAgent]) {
    return memoized[userAgent];
  }

  var systemVersion = null;
  var system = System.UNKNOWN;

  var _detectIOS = (0, _vkjs.detectIOS)(userAgent),
      isIOS = _detectIOS.isIOS,
      iosMajor = _detectIOS.iosMajor,
      iosMinor = _detectIOS.iosMinor;

  if (isIOS) {
    system = System.IOS;
    systemVersion = {
      major: iosMajor,
      minor: iosMinor
    };
  }

  var browserInfo = {
    userAgent: userAgent,
    system: system,
    systemVersion: systemVersion
  };
  memoized[userAgent] = browserInfo;
  return browserInfo;
}
//# sourceMappingURL=browser.js.map