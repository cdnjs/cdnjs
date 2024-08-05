export { _send as send };
import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getAncestor, isAncestor, isWindowClosed, getDomain, matchDomain } from 'cross-domain-utils/src';

import { CONFIG, CONSTANTS } from '../conf';
import { sendMessage, addResponseListener, deleteResponseListener, markResponseListenerErrored } from '../drivers';
import { uniqueID, onChildWindowReady, sayHello, isRegex } from '../lib';
import { global } from '../global';

global.requestPromises = global.requestPromises || new WeakMap();

export function request(options) {

    var prom = ZalgoPromise['try'](function () {

        if (!options.name) {
            throw new Error('Expected options.name');
        }

        var name = options.name;
        var targetWindow = void 0;
        var domain = void 0;

        if (typeof options.window === 'string') {
            var el = document.getElementById(options.window);

            if (!el) {
                throw new Error('Expected options.window ' + Object.prototype.toString.call(options.window) + ' to be a valid element id');
            }

            if (el.tagName.toLowerCase() !== 'iframe') {
                throw new Error('Expected options.window ' + Object.prototype.toString.call(options.window) + ' to be an iframe');
            }

            // $FlowFixMe
            if (!el.contentWindow) {
                throw new Error('Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.');
            }

            // $FlowFixMe
            targetWindow = el.contentWindow;
        } else if (options.window instanceof HTMLIFrameElement) {

            if (options.window.tagName.toLowerCase() !== 'iframe') {
                throw new Error('Expected options.window ' + Object.prototype.toString.call(options.window) + ' to be an iframe');
            }

            if (options.window && !options.window.contentWindow) {
                throw new Error('Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.');
            }

            if (options.window && options.window.contentWindow) {
                // $FlowFixMe
                targetWindow = options.window.contentWindow;
            }
        } else {
            targetWindow = options.window;
        }

        if (!targetWindow) {
            throw new Error('Expected options.window to be a window object, iframe, or iframe element id.');
        }

        var win = targetWindow;

        domain = options.domain || CONSTANTS.WILDCARD;

        var hash = options.name + '_' + uniqueID();

        if (isWindowClosed(win)) {
            throw new Error('Target window is closed');
        }

        var hasResult = false;

        var requestPromises = global.requestPromises.get(win);

        if (!requestPromises) {
            requestPromises = [];
            global.requestPromises.set(win, requestPromises);
        }

        var requestPromise = ZalgoPromise['try'](function () {

            if (isAncestor(window, win)) {
                return onChildWindowReady(win, options.timeout || CONFIG.CHILD_WINDOW_TIMEOUT);
            }
        }).then(function () {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                origin = _ref.origin;

            if (isRegex(domain) && !origin) {
                return sayHello(win);
            }
        }).then(function () {
            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                origin = _ref2.origin;

            if (isRegex(domain)) {
                if (!matchDomain(domain, origin)) {
                    throw new Error('Remote window domain ' + origin + ' does not match regex: ' + domain.toString());
                }

                domain = origin;
            }

            if (typeof domain !== 'string' && !Array.isArray(domain)) {
                throw new TypeError('Expected domain to be a string or array');
            }

            var actualDomain = domain;

            return new ZalgoPromise(function (resolve, reject) {

                var responseListener = void 0;

                if (!options.fireAndForget) {
                    responseListener = {
                        name: name,
                        window: win,
                        domain: actualDomain,
                        respond: function respond(err, result) {
                            if (!err) {
                                hasResult = true;
                                requestPromises.splice(requestPromises.indexOf(requestPromise, 1));
                            }

                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        }
                    };

                    addResponseListener(hash, responseListener);
                }

                sendMessage(win, {
                    type: CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                    hash: hash,
                    name: name,
                    data: options.data,
                    fireAndForget: options.fireAndForget
                }, actualDomain)['catch'](reject);

                if (options.fireAndForget) {
                    return resolve();
                }

                var ackTimeout = CONFIG.ACK_TIMEOUT;
                var resTimeout = options.timeout || CONFIG.RES_TIMEOUT;

                var cycleTime = 100;

                var cycle = function cycle() {

                    if (hasResult) {
                        return;
                    }

                    if (isWindowClosed(win)) {

                        if (!responseListener.ack) {
                            return reject(new Error('Window closed for ' + name + ' before ack'));
                        }

                        return reject(new Error('Window closed for ' + name + ' before response'));
                    }

                    ackTimeout = Math.max(ackTimeout - cycleTime, 0);
                    if (resTimeout !== -1) {
                        resTimeout = Math.max(resTimeout - cycleTime, 0);
                    }

                    var hasAck = responseListener.ack;

                    if (hasAck) {

                        if (resTimeout === -1) {
                            return;
                        }

                        cycleTime = Math.min(resTimeout, 2000);
                    } else if (ackTimeout === 0) {
                        return reject(new Error('No ack for postMessage ' + name + ' in ' + getDomain() + ' in ' + CONFIG.ACK_TIMEOUT + 'ms'));
                    } else if (resTimeout === 0) {
                        return reject(new Error('No response for postMessage ' + name + ' in ' + getDomain() + ' in ' + (options.timeout || CONFIG.RES_TIMEOUT) + 'ms'));
                    }

                    setTimeout(cycle, cycleTime);
                };

                setTimeout(cycle, cycleTime);
            });
        });

        requestPromise['catch'](function () {
            markResponseListenerErrored(hash);
            deleteResponseListener(hash);
        });

        requestPromises.push(requestPromise);

        return requestPromise;
    });

    return prom;
}

function _send(window, name, data, options) {

    options = options || {};
    options.window = window;
    options.name = name;
    options.data = data;

    return request(options);
}

export function sendToParent(name, data, options) {

    var win = getAncestor();

    if (!win) {
        return new ZalgoPromise(function (resolve, reject) {
            return reject(new Error('Window does not have a parent'));
        });
    }

    return _send(win, name, data, options);
}

export function client() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    if (!options.window) {
        throw new Error('Expected options.window');
    }

    var win = options.window;

    return {
        send: function send(name, data) {
            return _send(win, name, data, options);
        }
    };
}

global.send = _send;