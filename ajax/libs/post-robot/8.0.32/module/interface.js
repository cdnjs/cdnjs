import { initOnReady, listenForMethods } from './lib';
import { listenForMessages } from './drivers';
import { global } from './global';
import { on, send } from './public';

export * from './public';
export { cleanUpWindow } from './clean';
export { ZalgoPromise as Promise } from 'zalgo-promise/src';
export var bridge = __POST_ROBOT__.__IE_POPUP_SUPPORT__ ? require('./bridge/interface') : null;

export function init() {
    if (!global.initialized) {
        listenForMessages();

        if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
            require('./bridge').openTunnelToOpener();
        }

        initOnReady();
        listenForMethods({ on: on, send: send });
    }

    global.initialized = true;
}

init();