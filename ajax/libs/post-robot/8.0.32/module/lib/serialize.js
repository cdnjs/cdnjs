var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { matchDomain } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { CONSTANTS } from '../conf';
import { global } from '../global';

import { once, uniqueID, replaceObject, stringifyError, isRegex } from './util';

global.methods = global.methods || new WeakMap();

export var listenForMethods = once(function () {
    global.on(CONSTANTS.POST_MESSAGE_NAMES.METHOD, { origin: CONSTANTS.WILDCARD }, function (_ref) {
        var source = _ref.source,
            origin = _ref.origin,
            data = _ref.data;


        var methods = global.methods.get(source);

        if (!methods) {
            throw new Error('Could not find any methods this window has privileges to call');
        }

        var meth = methods[data.id];

        if (!meth) {
            throw new Error('Could not find method with id: ' + data.id);
        }

        if (!matchDomain(meth.domain, origin)) {
            throw new Error('Method domain ' + meth.domain + ' does not match origin ' + origin);
        }

        return ZalgoPromise['try'](function () {
            return meth.method.apply({ source: source, origin: origin, data: data }, data.args);
        }).then(function (result) {

            return {
                result: result,
                id: data.id,
                name: data.name
            };
        });
    });
});

function isSerialized(item, type) {
    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null && item.__type__ === type;
}

export function serializeMethod(destination, domain, method, name) {

    var id = uniqueID();

    var methods = global.methods.get(destination);

    if (!methods) {
        methods = {};
        global.methods.set(destination, methods);
    }

    methods[id] = { domain: domain, method: method };

    return {
        __type__: CONSTANTS.SERIALIZATION_TYPES.METHOD,
        __id__: id,
        __name__: name
    };
}

function serializeError(err) {
    return {
        __type__: CONSTANTS.SERIALIZATION_TYPES.ERROR,
        __message__: stringifyError(err),
        // $FlowFixMe
        __code__: err.code
    };
}

function serializePromise(destination, domain, promise, name) {
    return {
        __type__: CONSTANTS.SERIALIZATION_TYPES.PROMISE,
        __then__: serializeMethod(destination, domain, function (resolve, reject) {
            return promise.then(resolve, reject);
        }, name + '.then')
    };
}

function serializeZalgoPromise(destination, domain, promise, name) {
    return {
        __type__: CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE,
        __then__: serializeMethod(destination, domain, function (resolve, reject) {
            return promise.then(resolve, reject);
        }, name + '.then')
    };
}

function serializeRegex(regex) {
    return {
        __type__: CONSTANTS.SERIALIZATION_TYPES.REGEX,
        __source__: regex.source
    };
}

export function serializeMethods(destination, domain, obj) {

    return replaceObject({ obj: obj }, function (item, key) {
        if (typeof item === 'function') {
            return serializeMethod(destination, domain, item, key.toString());
        }

        if (item instanceof Error) {
            return serializeError(item);
        }

        if (window.Promise && item instanceof window.Promise) {
            return serializePromise(destination, domain, item, key.toString());
        }

        if (ZalgoPromise.isPromise(item)) {
            // $FlowFixMe
            return serializeZalgoPromise(destination, domain, item, key.toString());
        }

        if (isRegex(item)) {
            // $FlowFixMe
            return serializeRegex(item);
        }
    }).obj;
}

export function deserializeMethod(source, origin, obj) {

    function wrapper() {
        var args = Array.prototype.slice.call(arguments);
        return global.send(source, CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
            id: obj.__id__,
            name: obj.__name__,
            args: args

        }, { domain: origin, timeout: -1 }).then(function (_ref2) {
            var data = _ref2.data;

            return data.result;
        }, function (err) {
            throw err;
        });
    }

    wrapper.__name__ = obj.__name__;
    wrapper.__xdomain__ = true;

    wrapper.source = source;
    wrapper.origin = origin;

    return wrapper;
}

export function deserializeError(source, origin, obj) {
    var err = new Error(obj.__message__);
    if (obj.__code__) {
        // $FlowFixMe
        err.code = obj.__code__;
    }
    return err;
}

export function deserializeZalgoPromise(source, origin, prom) {
    return new ZalgoPromise(function (resolve, reject) {
        return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
    });
}

export function deserializePromise(source, origin, prom) {
    if (!window.Promise) {
        return deserializeZalgoPromise(source, origin, prom);
    }

    return new window.Promise(function (resolve, reject) {
        return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
    });
}

export function deserializeRegex(source, origin, item) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    return new RegExp(item.__source__);
}

export function deserializeMethods(source, origin, obj) {

    return replaceObject({ obj: obj }, function (item) {
        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object' || item === null) {
            return;
        }

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.METHOD)) {
            return deserializeMethod(source, origin, item);
        }

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.ERROR)) {
            return deserializeError(source, origin, item);
        }

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.PROMISE)) {
            return deserializePromise(source, origin, item);
        }

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE)) {
            return deserializeZalgoPromise(source, origin, item);
        }

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.REGEX)) {
            return deserializeRegex(source, origin, item);
        }
    }).obj;
}