var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { ZalgoPromise } from 'zalgo-promise/src';

import { noop, denodeify, once, memoize, promisify, dotify } from '../../lib';


function isDefined(value) {
    return value !== null && value !== undefined && value !== '';
}

/*  Normalize Prop
    --------------

    Turn prop into normalized value, using defaults, function options, etc.
*/

// $FlowFixMe
export function normalizeProp(component, instance, props, key, value) {
    // eslint-disable-line complexity

    var prop = component.getProp(key);

    var resultValue = void 0;

    if (prop.value) {
        resultValue = prop.value;
    } else if (prop.def && (!props.hasOwnProperty(key) || !isDefined(value))) {
        resultValue = prop.def.call(component, props);
    } else {
        resultValue = value;
    }

    if (!resultValue && prop.alias && props[prop.alias]) {
        resultValue = props[prop.alias];
    }

    var decorated = false;

    if (prop.decorate && resultValue !== null && resultValue !== undefined) {
        resultValue = prop.decorate.call(instance, resultValue, props);
        decorated = true;
    }

    var type = prop.type;

    if (type === 'boolean') {
        // $FlowFixMe
        resultValue = Boolean(resultValue);
    } else if (type === 'function') {

        if (!resultValue && prop.noop) {
            // $FlowFixMe
            resultValue = noop;

            if (!decorated && prop.decorate) {
                // $FlowFixMe
                resultValue = prop.decorate.call(instance, noop, props);
            }
        }

        if (resultValue && typeof resultValue === 'function') {

            resultValue = resultValue.bind(instance);

            // If prop.denodeify is set, denodeify the function (accepts callback -> returns promise)

            if (prop.denodeify) {
                // $FlowFixMe
                resultValue = denodeify(resultValue);
            }

            if (prop.promisify) {
                // $FlowFixMe
                resultValue = promisify(resultValue);
            }

            // Wrap the function in order to log when it is called

            var original = resultValue;
            // $FlowFixMe
            resultValue = function resultValue() {
                component.log('call_prop_' + key);
                return original.apply(this, arguments);
            };

            // If prop.once is set, ensure the function can only be called once

            if (prop.once) {
                // $FlowFixMe
                resultValue = once(resultValue);
            }

            // If prop.memoize is set, ensure the function is memoized (first return resultValue is cached and returned for any future calls)

            if (prop.memoize) {
                // $FlowFixMe
                resultValue = memoize(resultValue);
            }
        }
    } else if (type === 'string') {
        // pass

    } else if (type === 'object') {
        // pass

    } else if (type === 'number') {
        if (resultValue !== undefined) {
            // $FlowFixMe
            resultValue = parseInt(resultValue, 10);
        }
    }

    // $FlowFixMe
    return resultValue;
}

/*  Normalize Props
    ---------------

    Turn props into normalized values, using defaults, function options, etc.
*/

export function normalizeProps(component, instance, props) {

    var result = {};

    // $FlowFixMe
    props = props || {};

    for (var _i2 = 0, _Object$keys2 = Object.keys(props), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
        var key = _Object$keys2[_i2];
        if (component.getPropNames().indexOf(key) !== -1) {
            // $FlowFixMe
            result[key] = normalizeProp(component, instance, props, key, props[key]);
        } else {
            result[key] = props[key];
        }
    }

    for (var _i4 = 0, _component$getPropNam2 = component.getPropNames(), _length4 = _component$getPropNam2 == null ? 0 : _component$getPropNam2.length; _i4 < _length4; _i4++) {
        var _key = _component$getPropNam2[_i4];
        if (!props.hasOwnProperty(_key) && (!instance.props || !instance.props.hasOwnProperty(_key))) {

            // $FlowFixMe
            var normalizedProp = normalizeProp(component, instance, props, _key, props[_key]);

            if (normalizedProp !== undefined) {
                result[_key] = normalizedProp;
            }
        }
    }

    // $FlowFixMe


    return result;
}

/*  Props to Query
    --------------

    Turn props into an initial query string to open the component with

    string -> string
    bool   -> 1
    object -> json
    number -> string
*/

// $FlowFixMe
function getQueryParam(prop, key, value) {
    return ZalgoPromise['try'](function () {
        if (typeof prop.queryParam === 'function') {
            return prop.queryParam(value);
        } else if (typeof prop.queryParam === 'string') {
            return prop.queryParam;
        } else {
            return key;
        }
    });
}

// $FlowFixMe
function getQueryValue(prop, key, value) {
    return ZalgoPromise['try'](function () {
        if (typeof prop.queryValue === 'function') {
            return prop.queryValue(value);
        } else {
            return value;
        }
    });
}

export function propsToQuery(propsDef, props) {

    var params = {};

    return ZalgoPromise.all(Object.keys(props).map(function (key) {

        var prop = propsDef[key];

        if (!prop) {
            return; // eslint-disable-line array-callback-return
        }

        return ZalgoPromise.resolve().then(function () {

            var value = props[key];

            if (!value) {
                return;
            }

            if (!prop.queryParam) {
                return;
            }

            return value;
        }).then(function (value) {

            if (!value) {
                return;
            }

            return ZalgoPromise.all([
            // $FlowFixMe
            getQueryParam(prop, key, value),
            // $FlowFixMe
            getQueryValue(prop, key, value)]).then(function (_ref) {
                var queryParam = _ref[0],
                    queryValue = _ref[1];


                var result = void 0;

                if (typeof queryValue === 'boolean') {
                    result = '1';
                } else if (typeof queryValue === 'string') {
                    result = queryValue.toString();
                } else if (typeof queryValue === 'function') {
                    return;
                } else if ((typeof queryValue === 'undefined' ? 'undefined' : _typeof(queryValue)) === 'object' && queryValue !== null) {

                    if (prop.serialization === 'json') {
                        result = JSON.stringify(queryValue);
                    } else {
                        result = dotify(queryValue, key);

                        for (var _i6 = 0, _Object$keys4 = Object.keys(result), _length6 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) {
                            var dotkey = _Object$keys4[_i6];
                            params[dotkey] = result[dotkey];
                        }

                        return;
                    }
                } else if (typeof queryValue === 'number') {
                    result = queryValue.toString();
                }

                params[queryParam] = result;
            });
        });
    })).then(function () {
        Object.keys(params).forEach(function (key) {
            params[key] = escape(params[key]);
        });
        return params;
    });
}