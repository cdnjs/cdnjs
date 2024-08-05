import 'cross-domain-utils/src';

import { global } from './global';

export function cleanUpWindow(win) {

    // global.tunnelWindows
    // global.bridges
    // global.popupWindowsByName
    // global.responseListeners
    // global.requestListeners

    var requestPromises = global.requestPromises.get(win);

    if (requestPromises) {
        for (var _i2 = 0, _length2 = requestPromises == null ? 0 : requestPromises.length; _i2 < _length2; _i2++) {
            var promise = requestPromises[_i2];
            promise.reject(new Error('No response from window - cleaned up'));
        }
    }

    if (global.popupWindowsByWin) {
        global.popupWindowsByWin['delete'](win);
    }

    if (global.remoteWindows) {
        global.remoteWindows['delete'](win);
    }

    global.requestPromises['delete'](win);
    global.methods['delete'](win);
    global.readyPromises['delete'](win);
}