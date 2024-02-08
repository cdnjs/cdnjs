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
    Platform: function() {
        return Platform;
    },
    platform: function() {
        return platform;
    }
});
const _browser = require("./browser");
const Platform = {
    ANDROID: 'android',
    IOS: 'ios',
    VKCOM: 'vkcom'
};
function platform(browserInfo) {
    if (!browserInfo) {
        browserInfo = (0, _browser.computeBrowserInfo)();
    }
    return browserInfo.system === 'ios' ? 'ios' : 'android';
}

//# sourceMappingURL=platform.js.map