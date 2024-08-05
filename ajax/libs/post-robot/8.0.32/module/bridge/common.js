import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain, isSameDomain, isOpener, isSameTopWindow, matchDomain, getUserAgent, getDomainFromUrl } from 'cross-domain-utils/src';

import { CONFIG, CONSTANTS } from '../conf';
import { global } from '../global';

export function needsBridgeForBrowser() {

    if (getUserAgent(window).match(/MSIE|trident|edge\/12|edge\/13/i)) {
        return true;
    }

    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {
        return true;
    }

    return false;
}

export function needsBridgeForWin(win) {

    if (!isSameTopWindow(window, win)) {
        return true;
    }

    return false;
}

export function needsBridgeForDomain(domain, win) {

    if (domain) {
        if (getDomain() !== getDomainFromUrl(domain)) {
            return true;
        }
    } else if (win) {
        if (!isSameDomain(win)) {
            return true;
        }
    }

    return false;
}

export function needsBridge(_ref) {
    var win = _ref.win,
        domain = _ref.domain;


    if (!needsBridgeForBrowser()) {
        return false;
    }

    if (domain && !needsBridgeForDomain(domain, win)) {
        return false;
    }

    if (win && !needsBridgeForWin(win)) {
        return false;
    }

    return true;
}

export function getBridgeName(domain) {

    domain = domain || getDomainFromUrl(domain);

    var sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, '_');

    var id = CONSTANTS.BRIDGE_NAME_PREFIX + '_' + sanitizedDomain;

    return id;
}

export function isBridge() {
    return Boolean(window.name && window.name === getBridgeName(getDomain()));
}

export var documentBodyReady = new ZalgoPromise(function (resolve) {

    if (window.document && window.document.body) {
        return resolve(window.document.body);
    }

    var interval = setInterval(function () {
        if (window.document && window.document.body) {
            clearInterval(interval);
            return resolve(window.document.body);
        }
    }, 10);
});

global.remoteWindows = global.remoteWindows || new WeakMap();

export function registerRemoteWindow(win) {
    global.remoteWindows.set(win, { sendMessagePromise: new ZalgoPromise() });
}

export function findRemoteWindow(win) {
    return global.remoteWindows.get(win);
}

export function registerRemoteSendMessage(win, domain, sendMessage) {

    var remoteWindow = findRemoteWindow(win);

    if (!remoteWindow) {
        throw new Error('Window not found to register sendMessage to');
    }

    var sendMessageWrapper = function sendMessageWrapper(remoteWin, message, remoteDomain) {

        if (remoteWin !== win) {
            throw new Error('Remote window does not match window');
        }

        if (!matchDomain(remoteDomain, domain)) {
            throw new Error('Remote domain ' + remoteDomain + ' does not match domain ' + domain);
        }

        sendMessage(message);
    };

    remoteWindow.sendMessagePromise.resolve(sendMessageWrapper);
    remoteWindow.sendMessagePromise = ZalgoPromise.resolve(sendMessageWrapper);
}

export function rejectRemoteSendMessage(win, err) {

    var remoteWindow = findRemoteWindow(win);

    if (!remoteWindow) {
        throw new Error('Window not found on which to reject sendMessage');
    }

    remoteWindow.sendMessagePromise.asyncReject(err);
}

export function sendBridgeMessage(win, message, domain) {

    var messagingChild = isOpener(window, win);
    var messagingParent = isOpener(win, window);

    if (!messagingChild && !messagingParent) {
        throw new Error('Can only send messages to and from parent and popup windows');
    }

    var remoteWindow = findRemoteWindow(win);

    if (!remoteWindow) {
        throw new Error('Window not found to send message to');
    }

    return remoteWindow.sendMessagePromise.then(function (sendMessage) {
        return sendMessage(win, message, domain);
    });
}