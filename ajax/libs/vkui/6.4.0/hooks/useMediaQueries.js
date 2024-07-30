import * as React from 'react';
import { MEDIA_QUERIES } from '../lib/adaptivity';
import { mediaQueryNull } from '../lib/browser';
import { useDOM } from '../lib/dom';
const mediaQueriesCache = new WeakMap();
function getMediaQueries(matchMedia) {
    return {
        desktopPlus: matchMedia(MEDIA_QUERIES.DESKTOP_PLUS),
        smallTabletPlus: matchMedia(MEDIA_QUERIES.SMALL_TABLET_PLUS),
        tablet: matchMedia(MEDIA_QUERIES.TABLET),
        smallTablet: matchMedia(MEDIA_QUERIES.SMALL_TABLET),
        mobile: matchMedia(MEDIA_QUERIES.MOBILE),
        mediumHeight: matchMedia(MEDIA_QUERIES.MEDIUM_HEIGHT),
        mobileLandscapeHeight: matchMedia(MEDIA_QUERIES.MOBILE_LANDSCAPE_HEIGHT)
    };
}
/**
 * Возвращает медиа выражения определенные дизайн-системой.
 */ export const useMediaQueries = ()=>{
    const { window } = useDOM();
    return React.useMemo(function initializeStoreOrUpdateStoreIfWindowChanges() {
        if (!window) {
            return getMediaQueries(mediaQueryNull);
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