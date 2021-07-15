import { isSameTopWindow } from 'cross-domain-utils/src';

import { CONFIG } from '../conf';

export function emulateIERestrictions(sourceWindow, targetWindow) {
    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {

        if (isSameTopWindow(sourceWindow, targetWindow) === false) {
            throw new Error('Can not send and receive post messages between two different windows (disabled to emulate IE)');
        }
    }
}