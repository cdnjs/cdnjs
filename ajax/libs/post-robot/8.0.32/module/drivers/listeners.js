import 'zalgo-promise/src';
import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { matchDomain } from 'cross-domain-utils/src';

import { global } from '../global';
import { isRegex } from '../lib';
import { CONSTANTS } from '../conf';

export function resetListeners() {
    global.responseListeners = {};
    global.requestListeners = {};
}

global.responseListeners = global.responseListeners || {};
global.requestListeners = global.requestListeners || {};
global.WINDOW_WILDCARD = global.WINDOW_WILDCARD || new function WindowWildcard() {/* pass */}();

global.erroredResponseListeners = global.erroredResponseListeners || {};

var __DOMAIN_REGEX__ = '__domain_regex__';

export function addResponseListener(hash, listener) {
    global.responseListeners[hash] = listener;
}

export function getResponseListener(hash) {
    return global.responseListeners[hash];
}

export function deleteResponseListener(hash) {
    delete global.responseListeners[hash];
}

export function markResponseListenerErrored(hash) {
    global.erroredResponseListeners[hash] = true;
}

export function isResponseListenerErrored(hash) {
    return Boolean(global.erroredResponseListeners[hash]);
}

export function getRequestListener(_ref) {
    var name = _ref.name,
        win = _ref.win,
        domain = _ref.domain;


    if (win === CONSTANTS.WILDCARD) {
        win = null;
    }

    if (domain === CONSTANTS.WILDCARD) {
        domain = null;
    }

    if (!name) {
        throw new Error('Name required to get request listener');
    }

    var nameListeners = global.requestListeners[name];

    if (!nameListeners) {
        return;
    }

    for (var _i2 = 0, _ref3 = [win, global.WINDOW_WILDCARD], _length2 = _ref3 == null ? 0 : _ref3.length; _i2 < _length2; _i2++) {
        var winQualifier = _ref3[_i2];

        var winListeners = winQualifier && nameListeners.get(winQualifier);

        if (!winListeners) {
            continue;
        }

        if (domain && typeof domain === 'string') {
            if (winListeners[domain]) {
                return winListeners[domain];
            }

            if (winListeners[__DOMAIN_REGEX__]) {
                for (var _i4 = 0, _winListeners$__DOMAI2 = winListeners[__DOMAIN_REGEX__], _length4 = _winListeners$__DOMAI2 == null ? 0 : _winListeners$__DOMAI2.length; _i4 < _length4; _i4++) {
                    var _ref5 = _winListeners$__DOMAI2[_i4];
                    var regex = _ref5.regex,
                        listener = _ref5.listener;

                    if (matchDomain(regex, domain)) {
                        return listener;
                    }
                }
            }
        }

        if (winListeners[CONSTANTS.WILDCARD]) {
            return winListeners[CONSTANTS.WILDCARD];
        }
    }
}

// eslint-disable-next-line complexity
export function addRequestListener(_ref6, listener) {
    var name = _ref6.name,
        win = _ref6.win,
        domain = _ref6.domain;


    if (!name || typeof name !== 'string') {
        throw new Error('Name required to add request listener');
    }

    if (Array.isArray(win)) {
        var listenersCollection = [];

        for (var _i6 = 0, _win2 = win, _length6 = _win2 == null ? 0 : _win2.length; _i6 < _length6; _i6++) {
            var item = _win2[_i6];
            listenersCollection.push(addRequestListener({ name: name, domain: domain, win: item }, listener));
        }

        return {
            cancel: function cancel() {
                for (var _i8 = 0, _length8 = listenersCollection == null ? 0 : listenersCollection.length; _i8 < _length8; _i8++) {
                    var cancelListener = listenersCollection[_i8];
                    cancelListener.cancel();
                }
            }
        };
    }

    if (Array.isArray(domain)) {
        var _listenersCollection = [];

        for (var _i10 = 0, _domain2 = domain, _length10 = _domain2 == null ? 0 : _domain2.length; _i10 < _length10; _i10++) {
            var _item = _domain2[_i10];
            _listenersCollection.push(addRequestListener({ name: name, win: win, domain: _item }, listener));
        }

        return {
            cancel: function cancel() {
                for (var _i12 = 0, _length12 = _listenersCollection == null ? 0 : _listenersCollection.length; _i12 < _length12; _i12++) {
                    var cancelListener = _listenersCollection[_i12];
                    cancelListener.cancel();
                }
            }
        };
    }

    var existingListener = getRequestListener({ name: name, win: win, domain: domain });

    if (!win || win === CONSTANTS.WILDCARD) {
        win = global.WINDOW_WILDCARD;
    }

    domain = domain || CONSTANTS.WILDCARD;

    if (existingListener) {
        if (win && domain) {
            throw new Error('Request listener already exists for ' + name + ' on domain ' + domain.toString() + ' for ' + (win === global.WINDOW_WILDCARD ? 'wildcard' : 'specified') + ' window');
        } else if (win) {
            throw new Error('Request listener already exists for ' + name + ' for ' + (win === global.WINDOW_WILDCARD ? 'wildcard' : 'specified') + ' window');
        } else if (domain) {
            throw new Error('Request listener already exists for ' + name + ' on domain ' + domain.toString());
        } else {
            throw new Error('Request listener already exists for ' + name);
        }
    }

    var requestListeners = global.requestListeners;

    var nameListeners = requestListeners[name];

    if (!nameListeners) {
        nameListeners = new WeakMap();
        requestListeners[name] = nameListeners;
    }

    var winListeners = nameListeners.get(win);

    if (!winListeners) {
        winListeners = {};
        nameListeners.set(win, winListeners);
    }

    var strDomain = domain.toString();

    var regexListeners = winListeners[__DOMAIN_REGEX__];
    var regexListener = void 0;

    if (isRegex(domain)) {

        if (!regexListeners) {
            regexListeners = [];
            winListeners[__DOMAIN_REGEX__] = regexListeners;
        }

        regexListener = { regex: domain, listener: listener };

        regexListeners.push(regexListener);
    } else {
        winListeners[strDomain] = listener;
    }

    return {
        cancel: function cancel() {
            if (!winListeners) {
                return;
            }

            delete winListeners[strDomain];

            if (win && Object.keys(winListeners).length === 0) {
                nameListeners['delete'](win);
            }

            if (regexListener) {
                regexListeners.splice(regexListeners.indexOf(regexListener, 1));
            }
        }
    };
}