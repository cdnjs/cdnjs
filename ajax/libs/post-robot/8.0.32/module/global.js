import { CONSTANTS } from './conf';

export var global = window[CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[CONSTANTS.WINDOW_PROPS.POSTROBOT] || {};

// Backwards compatibility

global.registerSelf = function () {
    // pass
};