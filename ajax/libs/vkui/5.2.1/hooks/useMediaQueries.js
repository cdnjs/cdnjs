import * as React from 'react';
import { MEDIA_QUERIES } from '../lib/adaptivity';
import { mediaQueryNull } from '../lib/browser';
import { useDOM } from '../lib/dom';
var storedMediaQueries = {
  window: undefined,
  mediaQueries: null
};

/**
 * Возвращает медиа выражения определенные дизайн-системой.
 */
export var useMediaQueries = function useMediaQueries() {
  var _useDOM = useDOM(),
    window = _useDOM.window;
  return React.useMemo(function initializeStoreOrUpdateStoreIfWindowChanges() {
    if (storedMediaQueries.window === window && storedMediaQueries.mediaQueries !== null) {
      return storedMediaQueries.mediaQueries;
    }
    var matchMedia = window ? window.matchMedia.bind(window) : mediaQueryNull;
    storedMediaQueries.window = window;
    storedMediaQueries.mediaQueries = {
      desktopPlus: matchMedia(MEDIA_QUERIES.DESKTOP_PLUS),
      smallTabletPlus: matchMedia(MEDIA_QUERIES.SMALL_TABLET_PLUS),
      tablet: matchMedia(MEDIA_QUERIES.TABLET),
      smallTablet: matchMedia(MEDIA_QUERIES.SMALL_TABLET),
      mobile: matchMedia(MEDIA_QUERIES.MOBILE),
      mediumHeight: matchMedia(MEDIA_QUERIES.MEDIUM_HEIGHT),
      mobileLandscapeHeight: matchMedia(MEDIA_QUERIES.MOBILE_LANDSCAPE_HEIGHT)
    };
    return storedMediaQueries.mediaQueries;
  }, [window]);
};
//# sourceMappingURL=useMediaQueries.js.map