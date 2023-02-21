import { detectIOS, noop } from '@vkontakte/vkjs';
export var System;
(function (System) {
  System["IOS"] = "ios";
  System["UNKNOWN"] = "";
})(System || (System = {}));
var memoized = {};
export function computeBrowserInfo() {
  var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  if (memoized[userAgent]) {
    return memoized[userAgent];
  }
  var systemVersion = null;
  var system = System.UNKNOWN;
  var _detectIOS = detectIOS(userAgent),
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
export function mediaQueryNull(query) {
  return {
    matches: false,
    media: query,
    onchange: noop,
    addListener: noop,
    removeListener: noop,
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: function dispatchEvent() {
      return false;
    }
  };
}
//# sourceMappingURL=browser.js.map