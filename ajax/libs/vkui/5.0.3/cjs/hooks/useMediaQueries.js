"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMediaQueries = void 0;
var React = _interopRequireWildcard(require("react"));
var _adaptivity = require("../lib/adaptivity");
var _browser = require("../lib/browser");
var _dom = require("../lib/dom");
var storedMediaQueries = {
  window: undefined,
  mediaQueries: null
};

/**
 * Возвращает медиа выражения определенные дизайн-системой.
 */
var useMediaQueries = function useMediaQueries() {
  var _useDOM = (0, _dom.useDOM)(),
    window = _useDOM.window;
  return React.useMemo(function initializeStoreOrUpdateStoreIfWindowChanges() {
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
  }, [window]);
};
exports.useMediaQueries = useMediaQueries;
//# sourceMappingURL=useMediaQueries.js.map