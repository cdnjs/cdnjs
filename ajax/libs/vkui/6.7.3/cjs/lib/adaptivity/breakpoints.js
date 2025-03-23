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
    BREAKPOINTS: function() {
        return BREAKPOINTS;
    },
    MEDIA_QUERIES: function() {
        return MEDIA_QUERIES;
    },
    heightHalfInterval: function() {
        return heightHalfInterval;
    },
    heightMinus: function() {
        return heightMinus;
    },
    heightPlus: function() {
        return heightPlus;
    },
    widthHalfInterval: function() {
        return widthHalfInterval;
    },
    widthMinus: function() {
        return widthMinus;
    },
    widthPlus: function() {
        return widthPlus;
    }
});
const BREAKPOINTS = {
    DESKTOP: 1280,
    TABLET: 1024,
    SMALL_TABLET: 768,
    MOBILE: 320,
    MOBILE_LANDSCAPE_HEIGHT: 415,
    MEDIUM_HEIGHT: 720
};
function widthPlus(a) {
    return `(min-width: ${a}px)`;
}
function widthMinus(b) {
    // NOTE: `not` плохо поддерживается, поэтому используем max-width и вычитаем
    // от числа 0.1
    return `(max-width: ${b - 0.1}px)`;
}
function widthHalfInterval(a, b) {
    return `${widthPlus(a)} and ${widthMinus(b)}`;
}
function heightPlus(a) {
    return `(min-height: ${a}px)`;
}
function heightMinus(b) {
    // NOTE: `not` плохо поддерживается, поэтому используем max-width и вычитаем
    // от числа 0.1
    return `(max-height: ${b - 0.1}px)`;
}
function heightHalfInterval(a, b) {
    return `${heightPlus(a)} and ${heightMinus(b)}`;
}
const MEDIA_QUERIES = {
    DESKTOP_PLUS: widthPlus(BREAKPOINTS.DESKTOP),
    TABLET: widthHalfInterval(BREAKPOINTS.TABLET, BREAKPOINTS.DESKTOP),
    SMALL_TABLET_PLUS: widthPlus(BREAKPOINTS.SMALL_TABLET),
    SMALL_TABLET: widthHalfInterval(BREAKPOINTS.SMALL_TABLET, BREAKPOINTS.TABLET),
    MOBILE: widthHalfInterval(BREAKPOINTS.MOBILE, BREAKPOINTS.SMALL_TABLET),
    MEDIUM_HEIGHT: heightPlus(BREAKPOINTS.MEDIUM_HEIGHT),
    MOBILE_LANDSCAPE_HEIGHT: heightPlus(BREAKPOINTS.MOBILE_LANDSCAPE_HEIGHT)
};

//# sourceMappingURL=breakpoints.js.map