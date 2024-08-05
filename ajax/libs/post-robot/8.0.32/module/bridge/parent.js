import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain, getFrameByName, isWindowClosed, getDomainFromUrl } from 'cross-domain-utils/src';

import { CONFIG, CONSTANTS } from '../conf';
import { onChildWindowReady } from '../lib';
import { global } from '../global';

import { getBridgeName, documentBodyReady, registerRemoteSendMessage, registerRemoteWindow } from './common';

global.bridges = global.bridges || {};
global.bridgeFrames = global.bridgeFrames || {};

global.popupWindowsByWin = global.popupWindowsByWin || new WeakMap();
global.popupWindowsByName = global.popupWindowsByName || {};

function listenForRegister(source, domain) {
    global.on(CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, { window: source, domain: domain }, function (_ref) {
        var origin = _ref.origin,
            data = _ref.data;


        if (origin !== domain) {
            throw new Error('Domain ' + domain + ' does not match origin ' + origin);
        }

        if (!data.name) {
            throw new Error('Register window expected to be passed window name');
        }

        if (!data.sendMessage) {
            throw new Error('Register window expected to be passed sendMessage method');
        }

        if (!global.popupWindowsByName[data.name]) {
            throw new Error('Window with name ' + data.name + ' does not exist, or was not opened by this window');
        }

        if (!global.popupWindowsByName[data.name].domain) {
            throw new Error('We do not have a registered domain for window ' + data.name);
        }

        if (global.popupWindowsByName[data.name].domain !== origin) {
            throw new Error('Message origin ' + origin + ' does not matched registered window origin ' + global.popupWindowsByName[data.name].domain);
        }

        registerRemoteSendMessage(global.popupWindowsByName[data.name].win, domain, data.sendMessage);

        return {
            sendMessage: function sendMessage(message) {

                if (!window || window.closed) {
                    return;
                }

                var winDetails = global.popupWindowsByName[data.name];

                if (!winDetails) {
                    return;
                }

                try {
                    global.receiveMessage({
                        data: message,
                        origin: winDetails.domain,
                        source: winDetails.win
                    });
                } catch (err) {
                    ZalgoPromise.reject(err);
                }
            }
        };
    });
}

function openBridgeFrame(name, url) {

    var iframe = document.createElement('iframe');

    iframe.setAttribute('name', name);
    iframe.setAttribute('id', name);

    iframe.setAttribute('style', 'display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('border', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('allowTransparency', 'true');

    iframe.setAttribute('tabindex', '-1');
    iframe.setAttribute('hidden', 'true');
    iframe.setAttribute('title', '');
    iframe.setAttribute('role', 'presentation');

    iframe.src = url;

    return iframe;
}

export function hasBridge(url, domain) {
    domain = domain || getDomainFromUrl(url);
    return Boolean(global.bridges[domain]);
}

export function openBridge(url, domain) {

    domain = domain || getDomainFromUrl(url);

    if (global.bridges[domain]) {
        return global.bridges[domain];
    }

    global.bridges[domain] = ZalgoPromise['try'](function () {

        if (getDomain() === domain) {
            throw new Error('Can not open bridge on the same domain as current domain: ' + domain);
        }

        var name = getBridgeName(domain);
        var frame = getFrameByName(window, name);

        if (frame) {
            throw new Error('Frame with name ' + name + ' already exists on page');
        }

        var iframe = openBridgeFrame(name, url);
        global.bridgeFrames[domain] = iframe;

        return documentBodyReady.then(function (body) {

            body.appendChild(iframe);

            var bridge = iframe.contentWindow;

            listenForRegister(bridge, domain);

            return new ZalgoPromise(function (resolve, reject) {

                iframe.onload = resolve;
                iframe.onerror = reject;
            }).then(function () {

                return onChildWindowReady(bridge, CONFIG.BRIDGE_TIMEOUT, 'Bridge ' + url);
            }).then(function () {

                return bridge;
            });
        });
    });

    return global.bridges[domain];
}

var windowOpen = window.open;

window.open = function windowOpenWrapper(url, name, options, last) {

    var domain = url;

    if (url && url.indexOf(CONSTANTS.MOCK_PROTOCOL) === 0) {
        var _url$split = url.split('|');

        domain = _url$split[0];
        url = _url$split[1];
    }

    if (domain) {
        domain = getDomainFromUrl(domain);
    }

    var win = windowOpen.call(this, url, name, options, last);

    if (!win) {
        return win;
    }

    if (url) {
        registerRemoteWindow(win);
    }

    for (var _i2 = 0, _Object$keys2 = Object.keys(global.popupWindowsByName), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
        var winName = _Object$keys2[_i2];
        if (isWindowClosed(global.popupWindowsByName[winName].win)) {
            delete global.popupWindowsByName[winName];
        }
    }

    if (name && win) {
        var winOptions = global.popupWindowsByWin.get(win) || global.popupWindowsByName[name] || {};

        winOptions.name = winOptions.name || name;
        winOptions.win = winOptions.win || win;
        winOptions.domain = winOptions.domain || domain;

        global.popupWindowsByWin.set(win, winOptions);
        global.popupWindowsByName[name] = winOptions;
    }

    return win;
};

export function linkUrl(win, url) {

    var winOptions = global.popupWindowsByWin.get(win);

    if (winOptions) {
        winOptions.domain = getDomainFromUrl(url);
        registerRemoteWindow(win);
    }
}

export function destroyBridges() {
    for (var _i4 = 0, _Object$keys4 = Object.keys(global.bridgeFrames), _length4 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i4 < _length4; _i4++) {
        var domain = _Object$keys4[_i4];
        var frame = global.bridgeFrames[domain];
        if (frame.parentNode) {
            frame.parentNode.removeChild(frame);
        }
    }

    global.bridgeFrames = {};
    global.bridges = {};
}