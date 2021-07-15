import { initHello } from './lib';
import { listenForMessages } from './drivers';
import { global } from './global';

export * from './public';
export { markWindowKnown } from './lib';
export { serializeMessage, deserializeMessage, ProxyWindow } from './serialize';
export { cleanUpWindow } from './clean';
export { ZalgoPromise as Promise } from 'zalgo-promise/src';
export var bridge = __POST_ROBOT__.__IE_POPUP_SUPPORT__ ? require('./bridge/interface') : null;

if (!global.initialized) {
    global.initialized = true;

    listenForMessages();

    if (bridge) {
        bridge.openTunnelToOpener();
    }

    initHello();
}