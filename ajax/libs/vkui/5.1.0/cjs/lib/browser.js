"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.System = void 0;
exports.computeBrowserInfo = computeBrowserInfo;
exports.mediaQueryNull = mediaQueryNull;
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

/**
 * Эмуляция функции `window.matchMedia` для SSR.
 *
 * ⚠️ Желательно избегать использование этой эмуляции в SSR.
 */
function mediaQueryNull(query) {
  return {
    matches: false,
    media: query,
    onchange: _vkjs.noop,
    addListener: _vkjs.noop,
    removeListener: _vkjs.noop,
    addEventListener: _vkjs.noop,
    removeEventListener: _vkjs.noop,
    dispatchEvent: function dispatchEvent() {
      return false;
    }
  };
}
//# sourceMappingURL=browser.js.map