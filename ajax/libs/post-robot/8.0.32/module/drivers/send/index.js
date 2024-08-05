var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { getDomain, isWindowClosed } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { CONSTANTS, CONFIG, POST_MESSAGE_NAMES_LIST } from '../../conf';
import { uniqueID, serializeMethods, getWindowType, jsonStringify, stringifyError } from '../../lib';

import { SEND_MESSAGE_STRATEGIES } from './strategies';

function buildMessage(win, message) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


    var id = uniqueID();
    var type = getWindowType();
    var sourceDomain = getDomain(window);

    return _extends({}, message, options, {
        sourceDomain: sourceDomain,
        id: message.id || id,
        windowType: type
    });
}

export function sendMessage(win, message, domain) {
    return ZalgoPromise['try'](function () {
        var _jsonStringify;

        message = buildMessage(win, message, {
            data: serializeMethods(win, domain, message.data),
            domain: domain
        });

        var level = void 0;

        if (__DEBUG__) {
            if (POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === CONSTANTS.POST_MESSAGE_TYPE.ACK) {
                level = 'debug';
            } else if (message.ack === 'error') {
                level = 'error';
            } else {
                level = 'info';
            }

            // eslint-disable-next-line no-console
            console[level]('postrobot_send', message.type.replace(/^postrobot_message_/, ''), '::', message.name, '::', domain || CONSTANTS.WILDCARD, '\n\n', message);
        }

        if (win === window && !CONFIG.ALLOW_SAME_ORIGIN) {
            throw new Error('Attemping to send message to self');
        }

        if (isWindowClosed(win)) {
            throw new Error('Window is closed');
        }

        var messages = [];

        var serializedMessage = jsonStringify((_jsonStringify = {}, _jsonStringify[CONSTANTS.WINDOW_PROPS.POSTROBOT] = message, _jsonStringify), null, 2);

        return ZalgoPromise.map(Object.keys(SEND_MESSAGE_STRATEGIES), function (strategyName) {

            return ZalgoPromise['try'](function () {

                if (!CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
                    throw new Error('Strategy disallowed: ' + strategyName);
                }

                return SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
            }).then(function () {
                messages.push(strategyName + ': success');
                return true;
            }, function (err) {
                messages.push(strategyName + ': ' + stringifyError(err) + '\n');
                return false;
            });
        }).then(function (results) {

            var success = results.some(Boolean);
            var status = message.type + ' ' + message.name + ' ' + (success ? 'success' : 'error') + ':\n  - ' + messages.join('\n  - ') + '\n';

            if (!success) {
                throw new Error(status);
            }
        });
    });
}