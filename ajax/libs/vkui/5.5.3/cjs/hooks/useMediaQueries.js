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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _adaptivity = require("../lib/adaptivity");
var _browser = require("../lib/browser");
var _dom = require("../lib/dom");
var storedMediaQueries = {
    window: undefined,
    mediaQueries: null
};
var useMediaQueries = function() {
    var window = (0, _dom.useDOM)().window;
    return _react.useMemo(function initializeStoreOrUpdateStoreIfWindowChanges() {
        if (storedMediaQueries.window === window && storedMediaQueries.mediaQueries !== null) {
            return storedMediaQueries.mediaQueries;
        }
        var matchMedia = window ? window.matchMedia.bind(window) : _browser.mediaQueryNull;
        storedMediaQueries.window = window;
        storedMediaQueries.mediaQueries = {
            desktopPlus: matchMedia(_adaptivity.MEDIA_QUERIES.DESKTOP_PLUS),
            smallTabletPlus: matchMedia(_adaptivity.MEDIA_QUERIES.SMALL_TABLET_PLUS),
            tablet: matchMedia(_adaptivity.MEDIA_QUERIES.TABLET),
            smallTablet: matchMedia(_adaptivity.MEDIA_QUERIES.SMALL_TABLET),
            mobile: matchMedia(_adaptivity.MEDIA_QUERIES.MOBILE),
            mediumHeight: matchMedia(_adaptivity.MEDIA_QUERIES.MEDIUM_HEIGHT),
            mobileLandscapeHeight: matchMedia(_adaptivity.MEDIA_QUERIES.MOBILE_LANDSCAPE_HEIGHT)
        };
        return storedMediaQueries.mediaQueries;
    }, [
        window
    ]);
};

//# sourceMappingURL=useMediaQueries.js.map