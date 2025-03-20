"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMediaQueries", {
    enumerable: true,
    get: function() {
        return useMediaQueries;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _adaptivity = require("../lib/adaptivity");
const _browser = require("../lib/browser");
const _dom = require("../lib/dom");
const mediaQueriesCache = new WeakMap();
function getMediaQueries(matchMedia) {
    return {
        desktopPlus: matchMedia(_adaptivity.MEDIA_QUERIES.DESKTOP_PLUS),
        smallTabletPlus: matchMedia(_adaptivity.MEDIA_QUERIES.SMALL_TABLET_PLUS),
        tablet: matchMedia(_adaptivity.MEDIA_QUERIES.TABLET),
        smallTablet: matchMedia(_adaptivity.MEDIA_QUERIES.SMALL_TABLET),
        mobile: matchMedia(_adaptivity.MEDIA_QUERIES.MOBILE),
        mediumHeight: matchMedia(_adaptivity.MEDIA_QUERIES.MEDIUM_HEIGHT),
        mobileLandscapeHeight: matchMedia(_adaptivity.MEDIA_QUERIES.MOBILE_LANDSCAPE_HEIGHT)
    };
}
const useMediaQueries = ()=>{
    const { window } = (0, _dom.useDOM)();
    return _react.useMemo(function initializeStoreOrUpdateStoreIfWindowChanges() {
        if (!window) {
            return getMediaQueries(_browser.mediaQueryNull);
        }
        const storedMediaQueries = mediaQueriesCache.get(window);
        if (storedMediaQueries) {
            return storedMediaQueries;
        }
        const mediaQueries = getMediaQueries(window.matchMedia.bind(window));
        mediaQueriesCache.set(window, mediaQueries);
        return mediaQueries;
    }, [
        window
    ]);
};

//# sourceMappingURL=useMediaQueries.js.map