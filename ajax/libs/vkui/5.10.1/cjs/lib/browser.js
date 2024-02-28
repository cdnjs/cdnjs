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
    System: function() {
        return System;
    },
    computeBrowserInfo: function() {
        return computeBrowserInfo;
    },
    mediaQueryNull: function() {
        return mediaQueryNull;
    }
});
var _vkjs = require("@vkontakte/vkjs");
var System;
(function(System) {
    System["IOS"] = "ios";
    System["UNKNOWN"] = "";
})(System || (System = {}));
var memoized = {};
function computeBrowserInfo() {
    var userAgent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    if (memoized[userAgent]) {
        return memoized[userAgent];
    }
    var systemVersion = null;
    var system = "";
    var _detectIOS = (0, _vkjs.detectIOS)(userAgent), isIOS = _detectIOS.isIOS, iosMajor = _detectIOS.iosMajor, iosMinor = _detectIOS.iosMinor;
    if (isIOS) {
        system = "ios";
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