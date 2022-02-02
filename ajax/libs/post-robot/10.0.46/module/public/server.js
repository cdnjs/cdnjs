export { _on as on };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { isWindowClosed } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { once as onceFunction, safeInterval } from 'belter/src';

import { addRequestListener } from '../drivers';
import { WILDCARD } from '../conf';
import { global } from '../global';

export function listen(options) {

    if (!options.name) {
        throw new Error('Expected options.name');
    }

    if (!options.handler) {
        throw new Error('Expected options.handler');
    }

    var name = options.name;
    var win = options.window;
    var domain = options.domain;

    var listenerOptions = {
        handler: options.handler,
        handleError: options.errorHandler || function (err) {
            throw err;
        },
        window: win,
        domain: domain || WILDCARD,
        name: name
    };

    var requestListener = addRequestListener({ name: name, win: win, domain: domain }, listenerOptions);

    if (options.once) {
        var _handler = listenerOptions.handler;
        listenerOptions.handler = onceFunction(function listenOnce() {
            requestListener.cancel();
            return _handler.apply(this, arguments);
        });
    }

    if (listenerOptions.window && options.errorOnClose) {
        var interval = safeInterval(function () {
            if (win && (typeof win === 'undefined' ? 'undefined' : _typeof(win)) === 'object' && isWindowClosed(win)) {
                interval.cancel();
                listenerOptions.handleError(new Error('Post message target window is closed'));
            }
        }, 50);
    }

    return {
        cancel: function cancel() {
            requestListener.cancel();
        }
    };
}

function _on(name, options, handler) {

    if (typeof options === 'function') {
        handler = options;
        options = {};
    }

    options = options || {};

    options.name = name;
    options.handler = handler || options.handler;

    return listen(options);
}

export function once(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var handler = arguments[2];


    if (typeof options === 'function') {
        handler = options;
        options = {};
    }

    options = options || {};
    handler = handler || options.handler;
    var errorHandler = options.errorHandler;

    var promise = new ZalgoPromise(function (resolve, reject) {

        options = options || {};

        options.name = name;
        options.once = true;

        options.handler = function (event) {
            resolve(event);
            if (handler) {
                return handler(event);
            }
        };

        options.errorHandler = function (err) {
            reject(err);
            if (errorHandler) {
                return errorHandler(err);
            }
        };
    });

    var onceListener = listen(options);
    promise.cancel = onceListener.cancel;

    return promise;
}

export function listener() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    return {
        on: function on(name, handler) {
            return _on(name, options, handler);
        }
    };
}

global.on = _on;