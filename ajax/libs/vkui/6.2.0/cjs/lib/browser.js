"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    computeBrowserInfo: function() {
        return computeBrowserInfo;
    },
    mediaQueryNull: function() {
        return mediaQueryNull;
    }
});
const _vkjs = require("@vkontakte/vkjs");
const memoized = {};
function computeBrowserInfo(userAgent = '') {
    if (memoized[userAgent]) {
        return memoized[userAgent];
    }
    const browserInfo = {
        userAgent,
        system: '',
        systemVersion: null
    };
    const { isIOS, iosMajor, iosMinor } = (0, _vkjs.detectIOS)(userAgent);
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
function mediaQueryNull(query) {
    return {
        matches: false,
        media: query,
        onchange: _vkjs.noop,
        addListener: _vkjs.noop,
        removeListener: _vkjs.noop,
        addEventListener: _vkjs.noop,
        removeEventListener: _vkjs.noop,
        dispatchEvent () {
            return false;
        }
    };
}

//# sourceMappingURL=browser.js.map