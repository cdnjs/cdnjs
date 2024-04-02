import { detectIOS, noop } from '@vkontakte/vkjs';
const memoized = {};
export function computeBrowserInfo(userAgent = '') {
    if (memoized[userAgent]) {
        return memoized[userAgent];
    }
    const browserInfo = {
        userAgent,
        system: '',
        systemVersion: null
    };
    const { isIOS, iosMajor, iosMinor } = detectIOS(userAgent);
    if (isIOS) {
        browserInfo.system = 'ios';
        browserInfo.systemVersion = {
            major: iosMajor,
            minor: iosMinor
        };
    }
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