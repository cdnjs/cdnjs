var _RECEIVE_MESSAGE_TYPE;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { ZalgoPromise } from 'zalgo-promise/src';
import { isWindowClosed, matchDomain, stringifyDomainPattern } from 'cross-domain-utils/src';

import { CONSTANTS } from '../../conf';
import { stringifyError, noop } from '../../lib';
import { sendMessage } from '../send';
import { getRequestListener, getResponseListener, deleteResponseListener, isResponseListenerErrored } from '../listeners';

export var RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _RECEIVE_MESSAGE_TYPE[CONSTANTS.POST_MESSAGE_TYPE.ACK] = function (source, origin, message) {

    if (isResponseListenerErrored(message.hash)) {
        return;
    }

    var options = getResponseListener(message.hash);

    if (!options) {
        throw new Error('No handler found for post message ack for message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
    }

    if (!matchDomain(options.domain, origin)) {
        throw new Error('Ack origin ' + origin + ' does not match domain ' + options.domain.toString());
    }

    options.ack = true;
}, _RECEIVE_MESSAGE_TYPE[CONSTANTS.POST_MESSAGE_TYPE.REQUEST] = function (source, origin, message) {

    var options = getRequestListener({ name: message.name, win: source, domain: origin });

    function respond(data) {

        if (message.fireAndForget || isWindowClosed(source)) {
            return ZalgoPromise.resolve();
        }

        return sendMessage(source, _extends({
            target: message.originalSource,
            hash: message.hash,
            name: message.name
        }, data), origin);
    }

    return ZalgoPromise.all([respond({
        type: CONSTANTS.POST_MESSAGE_TYPE.ACK
    }), ZalgoPromise['try'](function () {

        if (!options) {
            throw new Error('No handler found for post message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
        }

        if (!matchDomain(options.domain, origin)) {
            throw new Error('Request origin ' + origin + ' does not match domain ' + options.domain.toString());
        }

        var data = message.data;

        return options.handler({ source: source, origin: origin, data: data });
    }).then(function (data) {

        return respond({
            type: CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
            ack: CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
            data: data
        });
    }, function (err) {

        var error = stringifyError(err).replace(/^Error: /, '');
        // $FlowFixMe
        var code = err.code;

        return respond({
            type: CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
            ack: CONSTANTS.POST_MESSAGE_ACK.ERROR,
            error: error,
            code: code
        });
    })]).then(noop)['catch'](function (err) {

        if (options && options.handleError) {
            return options.handleError(err);
        } else {
            throw err;
        }
    });
}, _RECEIVE_MESSAGE_TYPE[CONSTANTS.POST_MESSAGE_TYPE.RESPONSE] = function (source, origin, message) {

    if (isResponseListenerErrored(message.hash)) {
        return;
    }

    var options = getResponseListener(message.hash);

    if (!options) {
        throw new Error('No handler found for post message response for message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
    }

    if (!matchDomain(options.domain, origin)) {
        throw new Error('Response origin ' + origin + ' does not match domain ' + stringifyDomainPattern(options.domain));
    }

    deleteResponseListener(message.hash);

    if (message.ack === CONSTANTS.POST_MESSAGE_ACK.ERROR) {
        var err = new Error(message.error);
        if (message.code) {
            // $FlowFixMe
            err.code = message.code;
        }
        return options.respond(err, null);
    } else if (message.ack === CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
        var data = message.data || message.response;

        return options.respond(null, { source: source, origin: origin, data: data });
    }
}, _RECEIVE_MESSAGE_TYPE);