var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { isPopup, isIframe, getUserAgent } from 'cross-domain-utils/src';

import { CONFIG, CONSTANTS } from '../conf';

export function stringifyError(err) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;


    if (level >= 3) {
        return 'stringifyError stack overflow';
    }

    try {
        if (!err) {
            return '<unknown error: ' + Object.prototype.toString.call(err) + '>';
        }

        if (typeof err === 'string') {
            return err;
        }

        if (err instanceof Error) {
            var stack = err && err.stack;
            var message = err && err.message;

            if (stack && message) {
                if (stack.indexOf(message) !== -1) {
                    return stack;
                } else {
                    return message + '\n' + stack;
                }
            } else if (stack) {
                return stack;
            } else if (message) {
                return message;
            }
        }

        if (typeof err.toString === 'function') {
            return err.toString();
        }

        return Object.prototype.toString.call(err);
    } catch (newErr) {
        // eslint-disable-line unicorn/catch-error-name
        return 'Error while stringifying error: ' + stringifyError(newErr, level + 1);
    }
}

// eslint-disable-next-line flowtype/no-weak-types
export var once = function once(method) {
    if (!method) {
        return method;
    }
    var called = false;
    return function onceWrapper() {
        if (!called) {
            called = true;
            return method.apply(this, arguments);
        }
    };
};

// eslint-disable-next-line no-unused-vars
export function noop() {
    // pass
}

export function addEventListener(obj, event, handler) {
    if (obj.addEventListener) {
        obj.addEventListener(event, handler);
    } else {
        obj.attachEvent('on' + event, handler);
    }

    return {
        cancel: function cancel() {
            if (obj.removeEventListener) {
                obj.removeEventListener(event, handler);
            } else {
                obj.detachEvent('on' + event, handler);
            }
        }
    };
}

export function uniqueID() {

    var chars = '0123456789abcdef';

    return 'xxxxxxxxxx'.replace(/./g, function () {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

export function eachArray(item, callback) {
    for (var i = 0; i < item.length; i++) {
        callback(item[i], i);
    }
}

export function eachObject(item, callback) {
    for (var _key in item) {
        if (item.hasOwnProperty(_key)) {
            callback(item[_key], _key);
        }
    }
}

export function each(item, callback) {
    if (Array.isArray(item)) {
        eachArray(item, callback);
    } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null) {
        eachObject(item, callback);
    }
}

export function replaceObject(item, callback) {
    var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;


    if (depth >= 100) {
        throw new Error('Self-referential object passed, or object contained too many layers');
    }

    var newobj = void 0;

    if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null && !Array.isArray(item)) {
        newobj = {};
    } else if (Array.isArray(item)) {
        newobj = [];
    } else {
        throw new TypeError('Invalid type: ' + (typeof item === 'undefined' ? 'undefined' : _typeof(item)));
    }

    each(item, function (childItem, key) {

        var result = callback(childItem, key);

        if (typeof result !== 'undefined') {
            // $FlowFixMe
            newobj[key] = result;
        } else if ((typeof childItem === 'undefined' ? 'undefined' : _typeof(childItem)) === 'object' && childItem !== null) {
            // $FlowFixMe
            newobj[key] = replaceObject(childItem, callback, depth + 1);
        } else {
            // $FlowFixMe
            newobj[key] = childItem;
        }
    });

    // $FlowFixMe
    return newobj;
}

export function safeInterval(method, time) {
    var timeout = void 0;

    function runInterval() {
        timeout = setTimeout(runInterval, time);
        method.call();
    }

    timeout = setTimeout(runInterval, time);

    return {
        cancel: function cancel() {
            clearTimeout(timeout);
        }
    };
}

export function isRegex(item) {
    return Object.prototype.toString.call(item) === '[object RegExp]';
}

// eslint-disable-next-line flowtype/no-weak-types
export var weakMapMemoize = function weakMapMemoize(method) {

    var weakmap = new WeakMap();

    // eslint-disable-next-line flowtype/no-weak-types
    return function weakmapMemoized(arg) {
        var result = weakmap.get(arg);

        if (typeof result !== 'undefined') {
            return result;
        }

        result = method.call(this, arg);

        if (typeof result !== 'undefined') {
            weakmap.set(arg, result);
        }

        return result;
    };
};

export function getWindowType() {
    if (isPopup()) {
        return CONSTANTS.WINDOW_TYPES.POPUP;
    }
    if (isIframe()) {
        return CONSTANTS.WINDOW_TYPES.IFRAME;
    }
    return CONSTANTS.WINDOW_TYPES.FULLPAGE;
}

export function jsonStringify(obj, replacer, indent) {

    var objectToJSON = void 0;
    var arrayToJSON = void 0;

    try {
        if (JSON.stringify({}) !== '{}') {
            // $FlowFixMe
            objectToJSON = Object.prototype.toJSON;
            // $FlowFixMe
            delete Object.prototype.toJSON;
        }

        if (JSON.stringify({}) !== '{}') {
            throw new Error('Can not correctly serialize JSON objects');
        }

        if (JSON.stringify([]) !== '[]') {
            // $FlowFixMe
            arrayToJSON = Array.prototype.toJSON;
            // $FlowFixMe
            delete Array.prototype.toJSON;
        }

        if (JSON.stringify([]) !== '[]') {
            throw new Error('Can not correctly serialize JSON objects');
        }
    } catch (err) {
        throw new Error('Can not repair JSON.stringify: ' + err.message);
    }

    var result = JSON.stringify.call(this, obj, replacer, indent);

    try {
        if (objectToJSON) {
            // $FlowFixMe
            Object.prototype.toJSON = objectToJSON; // eslint-disable-line no-extend-native
        }

        if (arrayToJSON) {
            // $FlowFixMe
            Array.prototype.toJSON = arrayToJSON; // eslint-disable-line no-extend-native
        }
    } catch (err) {
        throw new Error('Can not repair JSON.stringify: ' + err.message);
    }

    return result;
}

export function jsonParse(item) {
    return JSON.parse(item);
}

export function needsGlobalMessagingForBrowser() {

    if (getUserAgent(window).match(/MSIE|trident|edge\/12|edge\/13/i)) {
        return true;
    }

    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {
        return true;
    }

    return false;
}