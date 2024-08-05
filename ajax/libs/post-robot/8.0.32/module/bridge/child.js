import { ZalgoPromise } from 'zalgo-promise/src';
import { isSameDomain, getOpener, getFrames, getDomain, getFrameByName } from 'cross-domain-utils/src';

import { CONSTANTS } from '../conf';
import { weakMapMemoize, noop } from '../lib';
import { global } from '../global';

import { needsBridge, registerRemoteWindow, rejectRemoteSendMessage, registerRemoteSendMessage, getBridgeName } from './common';

var awaitRemoteBridgeForWindow = weakMapMemoize(function (win) {
    return ZalgoPromise['try'](function () {
        for (var _i2 = 0, _getFrames2 = getFrames(win), _length2 = _getFrames2 == null ? 0 : _getFrames2.length; _i2 < _length2; _i2++) {
            var frame = _getFrames2[_i2];
            try {
                // $FlowFixMe
                if (frame && frame !== window && isSameDomain(frame) && frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                    return frame;
                }
            } catch (err) {
                continue;
            }
        }

        try {
            var _frame = getFrameByName(win, getBridgeName(getDomain()));

            if (!_frame) {
                return;
            }

            // $FlowFixMe
            if (isSameDomain(_frame) && _frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                return _frame;
            }

            return new ZalgoPromise(function (resolve) {

                var interval = void 0;
                var timeout = void 0;

                interval = setInterval(function () {
                    // $FlowFixMe
                    if (_frame && isSameDomain(_frame) && _frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                        clearInterval(interval);
                        clearTimeout(timeout);
                        return resolve(_frame);
                    }
                }, 100);

                timeout = setTimeout(function () {
                    clearInterval(interval);
                    return resolve();
                }, 2000);
            });
        } catch (err) {
            // pass
        }
    });
});

export function openTunnelToOpener() {
    return ZalgoPromise['try'](function () {

        var opener = getOpener(window);

        if (!opener) {
            return;
        }

        if (!needsBridge({ win: opener })) {
            return;
        }

        registerRemoteWindow(opener);

        return awaitRemoteBridgeForWindow(opener).then(function (bridge) {

            if (!bridge) {
                return rejectRemoteSendMessage(opener, new Error('Can not register with opener: no bridge found in opener'));
            }

            if (!window.name) {
                return rejectRemoteSendMessage(opener, new Error('Can not register with opener: window does not have a name'));
            }

            return bridge[CONSTANTS.WINDOW_PROPS.POSTROBOT].openTunnelToParent({

                name: window.name,

                source: window,

                canary: function canary() {
                    // pass
                },
                sendMessage: function sendMessage(message) {

                    try {
                        noop(window);
                    } catch (err) {
                        return;
                    }

                    if (!window || window.closed) {
                        return;
                    }

                    try {
                        global.receiveMessage({
                            data: message,
                            origin: this.origin,
                            source: this.source
                        });
                    } catch (err) {
                        ZalgoPromise.reject(err);
                    }
                }
            }).then(function (_ref) {
                var source = _ref.source,
                    origin = _ref.origin,
                    data = _ref.data;


                if (source !== opener) {
                    throw new Error('Source does not match opener');
                }

                registerRemoteSendMessage(source, origin, data.sendMessage);
            })['catch'](function (err) {

                rejectRemoteSendMessage(opener, err);
                throw err;
            });
        });
    });
}