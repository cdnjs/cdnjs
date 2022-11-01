import { detectIOS } from "@vkontakte/vkjs";
import { noop } from "./utils";
export var System;
(function (System) {
  System["IOS"] = "ios";
  System["UNKNOWN"] = "";
})(System || (System = {}));
var memoized = {};
export function computeBrowserInfo() {
  var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
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
  console.error("[mediaQueryNull] \u041F\u043E\u0445\u043E\u0436\u0435 \u0432\u044B \u043F\u044B\u0442\u0430\u0435\u0442\u0435\u0441\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C `Window.matchMedia()` API \u0432\u043D\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430.\n\n\u0412\u043E \u0438\u0437\u0431\u0435\u0436\u0430\u043D\u0438\u0435 \u043E\u0448\u0438\u0431\u043E\u043A \u043F\u0440\u0438 \u0433\u0438\u0434\u0440\u0430\u0446\u0438\u0438, \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u0442\u0441\u044F \u0438\u0437\u0431\u0435\u0433\u0430\u0442\u044C \u044D\u0442\u043E\u0433\u043E, \u0442.\u043A. \u043F\u0440\u0438 SSR \u043D\u0435\u0442 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430\u0445 \u044D\u043A\u0440\u0430\u043D\u0430.\n\n\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 CSS Media Query \u0438\u043B\u0438 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0443 \u043F\u043E \u0442\u0438\u043F\u0443 https://github.com/artsy/fresnel.");
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