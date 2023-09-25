/**
 * Храним брейкпоинты в JS файле для синхронизации значений между TS и CSS.
 *
 * @type {{
 *  DESKTOP: 1280,
 *  TABLET: 1024,
 *  SMALL_TABLET: 768,
 *  MOBILE: 320,
 *  MOBILE_LANDSCAPE_HEIGHT: 415,
 *  MEDIUM_HEIGHT: 720
 * }}
 */ "use strict";
var BREAKPOINTS = {
    DESKTOP: 1280,
    TABLET: 1024,
    SMALL_TABLET: 768,
    MOBILE: 320,
    MOBILE_LANDSCAPE_HEIGHT: 415,
    MEDIUM_HEIGHT: 720
};
/**
 * Луч [a;+∞)
 *
 * @param {number} a
 * @returns {string}
 */ function widthPlus(a) {
    return "(min-width: ".concat(a, "px)");
}
/**
 * Открытый луч (-∞;b)
 *
 * @param {number} b
 * @returns {string}
 */ function widthMinus(b) {
    // NOTE: `not` плохо поддерживается, поэтому используем max-width и вычитаем
    // от числа 0.1
    return "(max-width: ".concat(b - 0.1, "px)");
}
/**
 * Полуинтервал [a;b)
 *
 * @param {number} a
 * @param {number} b
 * @returns {string}
 */ function widthHalfInterval(a, b) {
    return "".concat(widthPlus(a), " and ").concat(widthMinus(b));
}
/**
 * Луч [a;+∞)
 *
 * @param {number} a
 * @returns {string}
 */ function heightPlus(a) {
    return "(min-height: ".concat(a, "px)");
}
/**
 * Открытый луч (-∞;b)
 *
 * @param {number} b
 * @returns {string}
 */ function heightMinus(b) {
    // NOTE: `not` плохо поддерживается, поэтому используем max-width и вычитаем
    // от числа 0.1
    return "(max-height: ".concat(b - 0.1, "px)");
}
/**
 * Полуинтервал [a;b)
 *
 * @param {number} a
 * @param {number} b
 * @returns {string}
 */ function heightHalfInterval(a, b) {
    return "".concat(heightPlus(a), " and ").concat(heightMinus(b));
}
var MEDIA_QUERIES = {
    DESKTOP_PLUS: widthPlus(BREAKPOINTS.DESKTOP),
    TABLET: widthHalfInterval(BREAKPOINTS.TABLET, BREAKPOINTS.DESKTOP),
    SMALL_TABLET_PLUS: widthPlus(BREAKPOINTS.SMALL_TABLET),
    SMALL_TABLET: widthHalfInterval(BREAKPOINTS.SMALL_TABLET, BREAKPOINTS.TABLET),
    MOBILE: widthHalfInterval(BREAKPOINTS.MOBILE, BREAKPOINTS.SMALL_TABLET),
    MEDIUM_HEIGHT: heightPlus(BREAKPOINTS.MEDIUM_HEIGHT),
    MOBILE_LANDSCAPE_HEIGHT: heightPlus(BREAKPOINTS.MOBILE_LANDSCAPE_HEIGHT)
};
module.exports = {
    BREAKPOINTS: BREAKPOINTS,
    MEDIA_QUERIES: MEDIA_QUERIES,
    widthHalfInterval: widthHalfInterval,
    widthPlus: widthPlus,
    widthMinus: widthMinus,
    heightHalfInterval: heightHalfInterval,
    heightPlus: heightPlus,
    heightMinus: heightMinus
};

//# sourceMappingURL=breakpoints.js.map