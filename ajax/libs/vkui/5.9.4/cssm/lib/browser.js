import { detectIOS, noop } from '@vkontakte/vkjs';
export var System;
(function(System) {
    System["IOS"] = "ios";
    System["UNKNOWN"] = "";
})(System || (System = {}));
const memoized = {};
export function computeBrowserInfo(userAgent = '') {
    if (memoized[userAgent]) {
        return memoized[userAgent];
    }
    let systemVersion = null;
    let system = "";
    const { isIOS, iosMajor, iosMinor } = detectIOS(userAgent);
    if (isIOS) {
        system = "ios";
        systemVersion = {
            major: iosMajor,
            minor: iosMinor
        };
    }
    const browserInfo = {
        userAgent,
        system,
        systemVersion
    };
    memoized[userAgent] = browserInfo;
    return browserInfo;
}
/**
 * Эмуляция функции `window.matchMedia` для SSR.
 *
 * ⚠️ Желательно избегать использование этой эмуляции в SSR.
 */ export function mediaQueryNull(query) {
    return {
        matches: false,
        media: query,
        onchange: noop,
        addListener: noop,
        removeListener: noop,
        addEventListener: noop,
        removeEventListener: noop,
        dispatchEvent () {
            return false;
        }
    };
}

//# sourceMappingURL=browser.js.map