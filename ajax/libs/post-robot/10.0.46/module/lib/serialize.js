import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { matchDomain } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { once, uniqueID } from 'belter/src';
import { TYPE, serialize, serializeType, deserialize } from 'universal-serialize/src';

import { MESSAGE_NAME, WILDCARD } from '../conf';
import { global } from '../global';

global.methods = global.methods || new WeakMap();

var listenForFunctionCalls = once(function () {
    global.on(MESSAGE_NAME.METHOD, { origin: WILDCARD }, function (_ref) {
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
            return meth.val.apply({ source: source, origin: origin, data: data }, data.args);
        }).then(function (result) {
            var id = data.id,
                name = data.name;

            return { result: result, id: id, name: name };
        });
    });
});

var CUSTOM_TYPE = {
    CROSS_DOMAIN_ZALGO_PROMISE: 'cross_domain_zalgo_promise',
    CROSS_DOMAIN_FUNCTION: 'cross_domain_function'
};

function serializeFunction(destination, domain, val, key) {
    var id = uniqueID();

    var methods = global.methods.get(destination);

    if (!methods) {
        methods = {};
        global.methods.set(destination, methods);
    }

    methods[id] = { domain: domain, val: val };

    listenForFunctionCalls();

    return serializeType(CUSTOM_TYPE.CROSS_DOMAIN_FUNCTION, { id: id, name: val.name || key });
}

function deserializeFunction(source, origin, _ref2) {
    var id = _ref2.id,
        name = _ref2.name;


    function crossDomainFunctionWrapper() {
        var args = Array.prototype.slice.call(arguments);
        return global.send(source, MESSAGE_NAME.METHOD, { id: id, name: name, args: args }, { domain: origin }).then(function (_ref3) {
            var data = _ref3.data;
            return data.result;
        });
    }

    crossDomainFunctionWrapper.__name__ = name;
    crossDomainFunctionWrapper.__xdomain__ = true;

    crossDomainFunctionWrapper.source = source;
    crossDomainFunctionWrapper.origin = origin;

    return crossDomainFunctionWrapper;
}

function serializePromise(destination, domain, val, key) {
    return serializeType(CUSTOM_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
        then: serializeFunction(destination, domain, function (resolve, reject) {
            return val.then(resolve, reject);
        }, key)
    });
}

function deserializePromise(source, origin, _ref4) {
    var then = _ref4.then;

    return new ZalgoPromise(function (resolve, reject) {
        deserializeFunction(source, origin, then)(resolve, reject);
    });
}

export function serializeMessage(destination, domain, obj) {
    var _serialize;

    return serialize(obj, (_serialize = {}, _serialize[TYPE.PROMISE] = function (val, key) {
        return serializePromise(destination, domain, val, key);
    }, _serialize[TYPE.FUNCTION] = function (val, key) {
        return serializeFunction(destination, domain, val, key);
    }, _serialize));
}

export function deserializeMessage(source, origin, message) {
    var _deserialize;

    return deserialize(message, (_deserialize = {}, _deserialize[CUSTOM_TYPE.CROSS_DOMAIN_ZALGO_PROMISE] = function (_ref5) {
        var then = _ref5.then;
        return deserializePromise(source, origin, { then: then });
    }, _deserialize[CUSTOM_TYPE.CROSS_DOMAIN_FUNCTION] = function (_ref6) {
        var id = _ref6.id,
            name = _ref6.name;
        return deserializeFunction(source, origin, { id: id, name: name });
    }, _deserialize));
}