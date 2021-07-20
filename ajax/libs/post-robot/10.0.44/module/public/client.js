export { _send as send };
import { ZalgoPromise } from 'zalgo-promise/src';
import { getAncestor, isAncestor, isWindowClosed, getDomain, matchDomain } from 'cross-domain-utils/src';
import { uniqueID, isRegex } from 'belter/src';

import { CONFIG, MESSAGE_TYPE, WILDCARD, MESSAGE_NAME } from '../conf';
import { sendMessage, addResponseListener, deleteResponseListener, markResponseListenerErrored } from '../drivers';
import { awaitWindowHello, sayHello, isWindowKnown } from '../lib';
import { global, windowStore } from '../global';

export var requestPromises = windowStore('requestPromises');

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

        domain = options.domain || WILDCARD;

        var hash = options.name + '_' + uniqueID();

        if (isWindowClosed(win)) {
            throw new Error('Target window is closed');
        }

        var hasResult = false;

        var reqPromises = requestPromises.getOrSet(win, function () {
            return [];
        });

        var requestPromise = ZalgoPromise['try'](function () {

            if (isAncestor(window, win)) {
                return awaitWindowHello(win, options.timeout || CONFIG.CHILD_WINDOW_TIMEOUT);
            }
        }).then(function () {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                origin = _ref.domain;

            if (isRegex(domain) && !origin) {
                return sayHello(win);
            }
        }).then(function () {
            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                origin = _ref2.domain;

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
            var logName = name === MESSAGE_NAME.METHOD && options.data && typeof options.data.name === 'string' ? options.data.name + '()' : name;

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
                                reqPromises.splice(reqPromises.indexOf(requestPromise, 1));
                            }

                            if (err) {
                                if (__DEBUG__) {
                                    // eslint-disable-next-line no-console
                                    console.error('receive::err', logName, domain, '\n\n', err);
                                }
                                reject(err);
                            } else {
                                if (__DEBUG__) {
                                    // eslint-disable-next-line no-console
                                    console.info('receive::res', logName, domain, '\n\n', result);
                                }
                                resolve(result);
                            }
                        }
                    };

                    addResponseListener(hash, responseListener);
                }

                if (__DEBUG__) {
                    // eslint-disable-next-line no-console
                    console.info('send::req', logName, domain, '\n\n', options.data);
                }

                sendMessage(win, actualDomain, {
                    type: MESSAGE_TYPE.REQUEST,
                    hash: hash,
                    name: name,
                    data: options.data,
                    fireAndForget: Boolean(options.fireAndForget)
                })['catch'](reject);

                if (options.fireAndForget) {
                    return resolve();
                }

                var totalAckTimeout = isWindowKnown(win) ? CONFIG.ACK_TIMEOUT_KNOWN : CONFIG.ACK_TIMEOUT;
                var totalResTimeout = options.timeout || CONFIG.RES_TIMEOUT;

                var ackTimeout = totalAckTimeout;
                var resTimeout = totalResTimeout;

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
                        return reject(new Error('No ack for postMessage ' + name + ' in ' + getDomain() + ' in ' + totalAckTimeout + 'ms'));
                    } else if (resTimeout === 0) {
                        return reject(new Error('No response for postMessage ' + name + ' in ' + getDomain() + ' in ' + totalResTimeout + 'ms'));
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

        reqPromises.push(requestPromise);

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