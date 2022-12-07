"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.System = void 0;
exports.computeBrowserInfo = computeBrowserInfo;
exports.mediaQueryNull = mediaQueryNull;
var _vkjs = require("@vkontakte/vkjs");
var _utils = require("./utils");
var System;
exports.System = System;
(function (System) {
  System["IOS"] = "ios";
  System["UNKNOWN"] = "";
})(System || (exports.System = System = {}));
var memoized = {};
function computeBrowserInfo() {
  var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
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
  console.error("[mediaQueryNull] \u041F\u043E\u0445\u043E\u0436\u0435, \u0432\u044B \u043F\u044B\u0442\u0430\u0435\u0442\u0435\u0441\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C `Window.matchMedia()` API \u0432\u043D\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430.\n\n\u041F\u043E\u0441\u0442\u0430\u0440\u0430\u0439\u0442\u0435\u0441\u044C \u044D\u0442\u043E\u0433\u043E \u0438\u0437\u0431\u0435\u0433\u0430\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u043D\u0435 \u0431\u044B\u043B\u043E \u043E\u0448\u0438\u0431\u043E\u043A \u043F\u0440\u0438 \u0433\u0438\u0434\u0440\u0430\u0442\u0430\u0446\u0438\u0438: \u043F\u0440\u0438 SSR \u043D\u0435\u0442 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430\u0445 \u044D\u043A\u0440\u0430\u043D\u0430.\n\n\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 CSS Media Query \u0438\u043B\u0438 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0443 \u043F\u043E \u0442\u0438\u043F\u0443 https://github.com/artsy/fresnel.");
  return {
    matches: false,
    media: query,
    onchange: _utils.noop,
    addListener: _utils.noop,
    removeListener: _utils.noop,
    addEventListener: _utils.noop,
    removeEventListener: _utils.noop,
    dispatchEvent: function dispatchEvent() {
      return false;
    }
  };
}
//# sourceMappingURL=browser.js.map