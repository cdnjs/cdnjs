import 'zalgo-promise/src';
import { getParent, isWindowClosed } from 'cross-domain-utils/src';

import { CONSTANTS } from '../conf';
import { noop } from '../lib';
import { global } from '../global';

/*
    HERE BE DRAGONS

    Warning: this file may look weird. Why save the tunnel window in an Object
    by ID, then look it up later, rather than just using the reference from the closure scope?

    The reason is, that ends up meaning the garbage collector can never get its hands
    on a closed window, since our closure has continued access to it -- and post-robot
    has no good way to know whether to clean up the function with the closure scope.

    If you're editing this file, be sure to run significant memory / GC tests afterwards.
*/

global.tunnelWindows = global.tunnelWindows || {};
global.tunnelWindowId = 0;

function deleteTunnelWindow(id) {

    try {
        if (global.tunnelWindows[id]) {
            delete global.tunnelWindows[id].source;
        }
    } catch (err) {
        // pass
    }

    delete global.tunnelWindows[id];
}

function cleanTunnelWindows() {
    var tunnelWindows = global.tunnelWindows;

    for (var _i2 = 0, _Object$keys2 = Object.keys(tunnelWindows), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
        var key = _Object$keys2[_i2];
        var tunnelWindow = tunnelWindows[key];

        try {
            noop(tunnelWindow.source);
        } catch (err) {
            deleteTunnelWindow(key);
            continue;
        }

        if (isWindowClosed(tunnelWindow.source)) {
            deleteTunnelWindow(key);
        }
    }
}

function addTunnelWindow(_ref) {
    var name = _ref.name,
        source = _ref.source,
        canary = _ref.canary,
        sendMessage = _ref.sendMessage;

    cleanTunnelWindows();
    global.tunnelWindowId += 1;
    global.tunnelWindows[global.tunnelWindowId] = { name: name, source: source, canary: canary, sendMessage: sendMessage };
    return global.tunnelWindowId;
}

function getTunnelWindow(id) {
    return global.tunnelWindows[id];
}

global.openTunnelToParent = function openTunnelToParent(_ref2) {
    var name = _ref2.name,
        source = _ref2.source,
        canary = _ref2.canary,
        sendMessage = _ref2.sendMessage;


    var parentWindow = getParent(window);

    if (!parentWindow) {
        throw new Error('No parent window found to open tunnel to');
    }

    var id = addTunnelWindow({ name: name, source: source, canary: canary, sendMessage: sendMessage });

    return global.send(parentWindow, CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {

        name: name,

        sendMessage: function sendMessage() {

            var tunnelWindow = getTunnelWindow(id);

            try {
                // IE gets antsy if you try to even reference a closed window
                noop(tunnelWindow && tunnelWindow.source);
            } catch (err) {
                deleteTunnelWindow(id);
                return;
            }

            if (!tunnelWindow || !tunnelWindow.source || isWindowClosed(tunnelWindow.source)) {
                return;
            }

            try {
                tunnelWindow.canary();
            } catch (err) {
                return;
            }

            tunnelWindow.sendMessage.apply(this, arguments);
        }
    }, { domain: CONSTANTS.WILDCARD });
};