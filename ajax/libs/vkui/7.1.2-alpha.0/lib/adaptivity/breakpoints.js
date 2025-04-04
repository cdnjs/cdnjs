export const BREAKPOINTS = {
    DESKTOP: 1280,
    TABLET: 1024,
    SMALL_TABLET: 768,
    MOBILE: 320,
    MOBILE_LANDSCAPE_HEIGHT: 415,
    MEDIUM_HEIGHT: 720
};
/**
 * Луч [a;+∞)
 */ export function widthPlus(a) {
    return `(min-width: ${a}px)`;
}
/**
 * Открытый луч (-∞;b)
 */ export function widthMinus(b) {
    // NOTE: `not` плохо поддерживается, поэтому используем max-width и вычитаем
    // от числа 0.1
    return `(max-width: ${b - 0.1}px)`;
}
/**
 * Полуинтервал [a;b)
 */ export function widthHalfInterval(a, b) {
    return `${widthPlus(a)} and ${widthMinus(b)}`;
}
/**
 * Луч [a;+∞)
 */ export function heightPlus(a) {
    return `(min-height: ${a}px)`;
}
/**
 * Открытый луч (-∞;b)
 */ export function heightMinus(b) {
    // NOTE: `not` плохо поддерживается, поэтому используем max-width и вычитаем
    // от числа 0.1
    return `(max-height: ${b - 0.1}px)`;
}
/**
 * Полуинтервал [a;b)
 */ export function heightHalfInterval(a, b) {
    return `${heightPlus(a)} and ${heightMinus(b)}`;
}
export const MEDIA_QUERIES = {
    DESKTOP_PLUS: widthPlus(BREAKPOINTS.DESKTOP),
    TABLET: widthHalfInterval(BREAKPOINTS.TABLET, BREAKPOINTS.DESKTOP),
    SMALL_TABLET_PLUS: widthPlus(BREAKPOINTS.SMALL_TABLET),
    SMALL_TABLET: widthHalfInterval(BREAKPOINTS.SMALL_TABLET, BREAKPOINTS.TABLET),
    MOBILE: widthHalfInterval(BREAKPOINTS.MOBILE, BREAKPOINTS.SMALL_TABLET),
    MEDIUM_HEIGHT: heightPlus(BREAKPOINTS.MEDIUM_HEIGHT),
    MOBILE_LANDSCAPE_HEIGHT: heightPlus(BREAKPOINTS.MOBILE_LANDSCAPE_HEIGHT)
};

//# sourceMappingURL=breakpoints.js.map