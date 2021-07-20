import { isPopup, isIframe, getUserAgent } from 'cross-domain-utils/src';

import { CONFIG, WINDOW_TYPE } from '../conf';

export function getWindowType() {
    if (isPopup()) {
        return WINDOW_TYPE.POPUP;
    }
    if (isIframe()) {
        return WINDOW_TYPE.IFRAME;
    }
    return WINDOW_TYPE.FULLPAGE;
}

export function needsGlobalMessagingForBrowser() {

    if (getUserAgent(window).match(/MSIE|trident|edge\/12|edge\/13/i)) {
        return true;
    }

    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {
        return true;
    }

    return false;
}