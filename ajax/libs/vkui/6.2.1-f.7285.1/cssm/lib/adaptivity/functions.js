import { BREAKPOINTS, VIEW_WIDTH_TO_CSS_BREAKPOINT_MAP, ViewHeight, ViewWidth } from './constants';
/**
 * @public
 */ export function getViewWidthByViewportWidth(viewportWidth) {
    if (viewportWidth >= BREAKPOINTS.DESKTOP) {
        return ViewWidth.DESKTOP;
    }
    if (viewportWidth >= BREAKPOINTS.TABLET) {
        return ViewWidth.TABLET;
    }
    if (viewportWidth >= BREAKPOINTS.SMALL_TABLET) {
        return ViewWidth.SMALL_TABLET;
    }
    if (viewportWidth >= BREAKPOINTS.MOBILE) {
        return ViewWidth.MOBILE;
    }
    return ViewWidth.SMALL_MOBILE;
}
export function getViewWidthByMediaQueries(mediaQueries) {
    /* eslint-disable no-restricted-properties */ if (mediaQueries.desktopPlus.matches) {
        return ViewWidth.DESKTOP;
    }
    if (mediaQueries.tablet.matches) {
        return ViewWidth.TABLET;
    }
    if (mediaQueries.smallTablet.matches) {
        return ViewWidth.SMALL_TABLET;
    }
    if (mediaQueries.mobile.matches) {
        return ViewWidth.MOBILE;
    }
    /* eslint-enable no-restricted-properties */ return ViewWidth.SMALL_MOBILE;
}
/**
 * @public
 */ export function getViewHeightByViewportHeight(viewportHeight) {
    if (viewportHeight >= BREAKPOINTS.MEDIUM_HEIGHT) {
        return ViewHeight.MEDIUM;
    }
    if (viewportHeight >= BREAKPOINTS.MOBILE_LANDSCAPE_HEIGHT) {
        return ViewHeight.SMALL;
    }
    return ViewHeight.EXTRA_SMALL;
}
export function getViewHeightByMediaQueries(mediaQueries) {
    /* eslint-disable no-restricted-properties */ if (mediaQueries.mediumHeight.matches) {
        return ViewHeight.MEDIUM;
    }
    if (mediaQueries.mobileLandscapeHeight.matches) {
        return ViewHeight.SMALL;
    }
    /* eslint-enable no-restricted-properties */ return ViewHeight.EXTRA_SMALL;
}
export function getSizeX(viewWidth) {
    return viewWidth <= ViewWidth.MOBILE ? 'compact' : 'regular';
}
export function isCompactByViewWidth(viewWidth, hasPointer) {
    return viewWidth !== undefined && viewWidth >= ViewWidth.SMALL_TABLET && hasPointer;
}
export function isCompactByViewHeight(viewHeight) {
    return viewHeight !== undefined && viewHeight <= ViewHeight.EXTRA_SMALL;
}
export function getSizeY(viewWidth, viewHeight, hasPointer) {
    if (isCompactByViewWidth(viewWidth, hasPointer) || isCompactByViewHeight(viewHeight)) {
        return 'compact';
    }
    return 'regular';
}
export function tryToCheckIsDesktop(viewWidth, viewHeight, hasPointer, platform) {
    // см. https://github.com/VKCOM/VKUI/pull/2473
    const IS_VKCOM_CRUTCH = platform === 'vkcom';
    if ((viewWidth === undefined || hasPointer === undefined) && (viewWidth === undefined || viewHeight === undefined) || hasPointer === undefined && viewHeight === undefined) {
        return IS_VKCOM_CRUTCH ? true : null;
    }
    const widthIsLikeDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
    const otherParametersIsLikeDesktop = hasPointer || (viewHeight !== undefined ? viewHeight >= ViewHeight.MEDIUM : false);
    return widthIsLikeDesktop && otherParametersIsLikeDesktop || IS_VKCOM_CRUTCH;
}
/**
 * Конвертирует `viewWidth` в CSS брейкпоинты (см. тесты для наглядности).
 *
 * > Note: используется восклицательный знак (!), чтобы принудить TS поверить, что св-во точно не может быть
 * > `undefined`. Это всё из-за применения `Partial<...>` для объекта.
 */ export function viewWidthToClassName(breakpointClassNames, viewWidth = 'none') {
    if (viewWidth === 'none') {
        return breakpointClassNames.hasOwnProperty('none') ? breakpointClassNames['none'] : null;
    }
    const breakpoints = [];
    const breakpointName = VIEW_WIDTH_TO_CSS_BREAKPOINT_MAP[viewWidth];
    if (breakpointClassNames.hasOwnProperty(breakpointName)) {
        breakpoints.push(breakpointClassNames[breakpointName]);
    }
    if (viewWidth >= ViewWidth.MOBILE) {
        if (breakpointClassNames.hasOwnProperty('mobilePlus')) {
            breakpoints.push(breakpointClassNames['mobilePlus']);
        }
    }
    if (viewWidth >= ViewWidth.SMALL_TABLET) {
        if (breakpointClassNames.hasOwnProperty('smallTabletPlus')) {
            breakpoints.push(breakpointClassNames['smallTabletPlus']);
        }
    } else {
        if (breakpointClassNames.hasOwnProperty('smallTabletMinus')) {
            breakpoints.push(breakpointClassNames['smallTabletMinus']);
        }
    }
    if (viewWidth >= ViewWidth.TABLET) {
        if (breakpointClassNames.hasOwnProperty('tabletPlus')) {
            breakpoints.push(breakpointClassNames['tabletPlus']);
        }
    } else {
        if (breakpointClassNames.hasOwnProperty('tabletMinus')) {
            breakpoints.push(breakpointClassNames['tabletMinus']);
        }
    }
    return breakpoints.length > 0 ? breakpoints.join(' ') : null;
}

//# sourceMappingURL=functions.js.map