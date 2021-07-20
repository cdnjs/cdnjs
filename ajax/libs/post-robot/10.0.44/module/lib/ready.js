import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { getAncestor } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { noop } from 'belter/src';

import { MESSAGE_NAME, WILDCARD } from '../conf';
import { global } from '../global';

global.readyPromises = global.readyPromises || new WeakMap();
global.knownWindows = global.knownWindows || new WeakMap();

export function onHello(handler) {
    global.on(MESSAGE_NAME.HELLO, { domain: WILDCARD }, function (_ref) {
        var source = _ref.source,
            origin = _ref.origin;

        return handler({ source: source, origin: origin });
    });
}

export function sayHello(win) {
    return global.send(win, MESSAGE_NAME.HELLO, {}, { domain: WILDCARD, timeout: -1 }).then(function (_ref2) {
        var origin = _ref2.origin;

        return { origin: origin };
    });
}

export function markWindowKnown(win) {
    global.knownWindows.set(win, true);
}

export function isWindowKnown(win) {
    return global.knownWindows.get(win);
}

export function initOnReady() {

    onHello(function (_ref3) {
        var source = _ref3.source,
            origin = _ref3.origin;

        var promise = global.readyPromises.get(source) || new ZalgoPromise();
        promise.resolve({ origin: origin });
        global.readyPromises.set(source, promise);
    });

    var parent = getAncestor();
    if (parent) {
        sayHello(parent)['catch'](noop);
    }
}

export function onChildWindowReady(win) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Window';


    var promise = global.readyPromises.get(win);

    if (promise) {
        return promise;
    }

    promise = new ZalgoPromise();
    global.readyPromises.set(win, promise);

    if (timeout !== -1) {
        setTimeout(function () {
            return promise.reject(new Error(name + ' did not load after ' + timeout + 'ms'));
        }, timeout);
    }

    return promise;
}