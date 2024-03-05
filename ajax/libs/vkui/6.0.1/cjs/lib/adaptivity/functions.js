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
    getSizeX: function() {
        return getSizeX;
    },
    getSizeY: function() {
        return getSizeY;
    },
    getViewHeightByMediaQueries: function() {
        return getViewHeightByMediaQueries;
    },
    getViewHeightByViewportHeight: function() {
        return getViewHeightByViewportHeight;
    },
    getViewWidthByMediaQueries: function() {
        return getViewWidthByMediaQueries;
    },
    getViewWidthByViewportWidth: function() {
        return getViewWidthByViewportWidth;
    },
    isCompactByViewHeight: function() {
        return isCompactByViewHeight;
    },
    isCompactByViewWidth: function() {
        return isCompactByViewWidth;
    },
    tryToCheckIsDesktop: function() {
        return tryToCheckIsDesktop;
    },
    viewWidthToClassName: function() {
        return viewWidthToClassName;
    }
});
const _constants = require("./constants");
function getViewWidthByViewportWidth(viewportWidth) {
    if (viewportWidth >= _constants.BREAKPOINTS.DESKTOP) {
        return _constants.ViewWidth.DESKTOP;
    }
    if (viewportWidth >= _constants.BREAKPOINTS.TABLET) {
        return _constants.ViewWidth.TABLET;
    }
    if (viewportWidth >= _constants.BREAKPOINTS.SMALL_TABLET) {
        return _constants.ViewWidth.SMALL_TABLET;
    }
    if (viewportWidth >= _constants.BREAKPOINTS.MOBILE) {
        return _constants.ViewWidth.MOBILE;
    }
    return _constants.ViewWidth.SMALL_MOBILE;
}
function getViewWidthByMediaQueries(mediaQueries) {
    /* eslint-disable no-restricted-properties */ if (mediaQueries.desktopPlus.matches) {
        return _constants.ViewWidth.DESKTOP;
    }
    if (mediaQueries.tablet.matches) {
        return _constants.ViewWidth.TABLET;
    }
    if (mediaQueries.smallTablet.matches) {
        return _constants.ViewWidth.SMALL_TABLET;
    }
    if (mediaQueries.mobile.matches) {
        return _constants.ViewWidth.MOBILE;
    }
    /* eslint-enable no-restricted-properties */ return _constants.ViewWidth.SMALL_MOBILE;
}
function getViewHeightByViewportHeight(viewportHeight) {
    if (viewportHeight >= _constants.BREAKPOINTS.MEDIUM_HEIGHT) {
        return _constants.ViewHeight.MEDIUM;
    }
    if (viewportHeight >= _constants.BREAKPOINTS.MOBILE_LANDSCAPE_HEIGHT) {
        return _constants.ViewHeight.SMALL;
    }
    return _constants.ViewHeight.EXTRA_SMALL;
}
function getViewHeightByMediaQueries(mediaQueries) {
    /* eslint-disable no-restricted-properties */ if (mediaQueries.mediumHeight.matches) {
        return _constants.ViewHeight.MEDIUM;
    }
    if (mediaQueries.mobileLandscapeHeight.matches) {
        return _constants.ViewHeight.SMALL;
    }
    /* eslint-enable no-restricted-properties */ return _constants.ViewHeight.EXTRA_SMALL;
}
function getSizeX(viewWidth) {
    return viewWidth <= _constants.ViewWidth.MOBILE ? 'compact' : 'regular';
}
function isCompactByViewWidth(viewWidth, hasPointer) {
    return viewWidth !== undefined && viewWidth >= _constants.ViewWidth.SMALL_TABLET && hasPointer;
}
function isCompactByViewHeight(viewHeight) {
    return viewHeight !== undefined && viewHeight <= _constants.ViewHeight.EXTRA_SMALL;
}
function getSizeY(viewWidth, viewHeight, hasPointer) {
    if (isCompactByViewWidth(viewWidth, hasPointer) || isCompactByViewHeight(viewHeight)) {
        return 'compact';
    }
    return 'regular';
}
function tryToCheckIsDesktop(viewWidth, viewHeight, hasPointer, platform) {
    // см. https://github.com/VKCOM/VKUI/pull/2473
    const IS_VKCOM_CRUTCH = platform === 'vkcom';
    if ((viewWidth === undefined || hasPointer === undefined) && (viewWidth === undefined || viewHeight === undefined) || hasPointer === undefined && viewHeight === undefined) {
        return IS_VKCOM_CRUTCH ? true : null;
    }
    const widthIsLikeDesktop = viewWidth >= _constants.ViewWidth.SMALL_TABLET;
    const otherParametersIsLikeDesktop = hasPointer || (viewHeight !== undefined ? viewHeight >= _constants.ViewHeight.MEDIUM : false);
    return widthIsLikeDesktop && otherParametersIsLikeDesktop || IS_VKCOM_CRUTCH;
}
function viewWidthToClassName(breakpointClassNames, viewWidth = 'none') {
    if (viewWidth === 'none') {
        return breakpointClassNames.hasOwnProperty('none') ? breakpointClassNames['none'] : null;
    }
    const breakpoints = [];
    const breakpointName = _constants.VIEW_WIDTH_TO_CSS_BREAKPOINT_MAP[viewWidth];
    if (breakpointClassNames.hasOwnProperty(breakpointName)) {
        breakpoints.push(breakpointClassNames[breakpointName]);
    }
    if (viewWidth >= _constants.ViewWidth.MOBILE) {
        if (breakpointClassNames.hasOwnProperty('mobilePlus')) {
            breakpoints.push(breakpointClassNames['mobilePlus']);
        }
    }
    if (viewWidth >= _constants.ViewWidth.SMALL_TABLET) {
        if (breakpointClassNames.hasOwnProperty('smallTabletPlus')) {
            breakpoints.push(breakpointClassNames['smallTabletPlus']);
        }
    } else {
        if (breakpointClassNames.hasOwnProperty('smallTabletMinus')) {
            breakpoints.push(breakpointClassNames['smallTabletMinus']);
        }
    }
    if (viewWidth >= _constants.ViewWidth.TABLET) {
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