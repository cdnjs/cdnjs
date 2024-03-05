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
    matchMediaListAddListener: function() {
        return matchMediaListAddListener;
    },
    matchMediaListRemoveListener: function() {
        return matchMediaListRemoveListener;
    }
});
function matchMediaListAddListener(mediaQueryList, listener) {
    mediaQueryList.addEventListener ? mediaQueryList.addEventListener('change', listener) : mediaQueryList.addListener(listener);
}
function matchMediaListRemoveListener(mediaQueryList, listener) {
    mediaQueryList.removeEventListener ? mediaQueryList.removeEventListener('change', listener) : mediaQueryList.removeListener(listener);
}

//# sourceMappingURL=matchMedia.js.map