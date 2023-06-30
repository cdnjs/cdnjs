var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint max-lines: off */

import { WeakMap } from 'cross-domain-safe-weakmap/src';

/*  Url Encode
    ----------

    Replace ? and & with encoded values. Allows other values (to create more readable urls than encodeUriComponent)
*/

export function urlEncode(str) {
    return str.replace(/\?/g, '%3F').replace(/&/g, '%26').replace(/#/g, '%23').replace(/\+/g, '%2B');
}

/*  Camel To Dasherize
    ------------------

    Convert camelCaseText to dasherized-text
*/

export function camelToDasherize(string) {
    return string.replace(/([A-Z])/g, function (g) {
        return '-' + g.toLowerCase();
    });
}

/*  Dasherize to Camel
    ------------------

    Convert dasherized-text to camelCaseText
*/

export function dasherizeToCamel(string) {
    return string.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
}

/*  Extend
    ------

    Extend one object with another
*/

export function extend(obj, source) {
    if (!source) {
        return obj;
    }

    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            obj[key] = source[key];
        }
    }

    return obj;
}

/*  Values
    ------

    Get all of the values from an object as an array
*/

export function values(obj) {
    var results = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            results.push(obj[key]);
        }
    }

    return results;
}

/*  Unique ID
    ---------

    Generate a unique, random hex id
*/

export function uniqueID() {

    var chars = '0123456789abcdef';

    return 'xxxxxxxxxx'.replace(/./g, function () {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

/*  Stringify with Functions
    ------------------------

    JSON Stringify with added support for functions
*/

export function stringifyWithFunctions(obj) {
    return JSON.stringify(obj, function (key, val) {
        if (typeof val === 'function') {
            return val.toString();
        }
        return val;
    });
}

/*  Safe Get
    --------

    Get a property without throwing error
*/

export function safeGet(obj, prop) {

    var result = void 0;

    try {
        result = obj[prop];
    } catch (err) {
        // pass
    }

    return result;
}

/* Capitalize First Letter
   -----------------------
*/

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/*  Get
    ---

    Recursively gets a deep path from an object, returning a default value if any level is not found
*/

export function get(item, path, def) {

    if (!path) {
        return def;
    }

    var pathParts = path.split('.');

    // Loop through each section of our key path

    for (var i = 0; i < pathParts.length; i++) {

        // If we have an object, we can get the key

        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null) {
            item = item[pathParts[i]];

            // Otherwise, we should return the default (undefined if not provided)
        } else {
            return def;
        }
    }

    // If our final result is undefined, we should return the default

    return item === undefined ? def : item;
}

/*  Safe Interval
    -------------

    Implement setInterval using setTimeout, to avoid stacking up calls from setInterval
*/

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

/*  Safe Interval
    -------------

    Run timeouts at 100ms intervals so we can account for busy browsers
*/

export function safeTimeout(method, time) {

    var interval = safeInterval(function () {
        time -= 100;
        if (time <= 0) {
            interval.cancel();
            method();
        }
    }, 100);
}

export function each(item, callback) {

    if (!item) {
        return;
    }

    if (Array.isArray(item)) {
        var len = item.length;
        for (var i = 0; i < len; i++) {
            callback(item[i], i);
        }
    } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
        var keys = Object.keys(item);
        var _len = keys.length;
        for (var _i = 0; _i < _len; _i++) {
            var key = keys[_i];
            callback(item[key], key);
        }
    }
}

export function replaceObject(item, replacers) {
    var fullKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';


    if (Array.isArray(item)) {
        var _ret = function () {
            var length = item.length;
            var result = [];

            var _loop = function _loop(i) {
                Object.defineProperty(result, i, {
                    configurable: true,
                    enumerable: true,
                    get: function get() {
                        var itemKey = fullKey ? fullKey + '.' + i : '' + i;
                        var child = item[i];

                        var type = typeof child === 'undefined' ? 'undefined' : _typeof(child);
                        var replacer = replacers[type];
                        if (replacer) {
                            var replaced = replacer(child, i, itemKey);
                            if (typeof replaced !== 'undefined') {
                                result[i] = replaced;
                                return result[i];
                            }
                        }

                        if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object' && child !== null) {
                            result[i] = replaceObject(child, replacers, itemKey);
                            return result[i];
                        }

                        result[i] = child;
                        return result[i];
                    },
                    set: function set(value) {
                        delete result[i];
                        result[i] = value;
                    }
                });
            };

            for (var i = 0; i < length; i++) {
                _loop(i);
            }

            // $FlowFixMe
            return {
                v: result
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null) {
        var _ret3 = function () {
            var result = {};

            var _loop2 = function _loop2(key) {
                if (!item.hasOwnProperty(key)) {
                    return 'continue';
                }

                Object.defineProperty(result, key, {
                    configurable: true,
                    enumerable: true,
                    get: function get() {
                        var itemKey = fullKey ? fullKey + '.' + key : '' + key;
                        // $FlowFixMe
                        var child = item[key];

                        var type = typeof child === 'undefined' ? 'undefined' : _typeof(child);
                        var replacer = replacers[type];
                        if (replacer) {
                            var replaced = replacer(child, key, itemKey);
                            if (typeof replaced !== 'undefined') {
                                result[key] = replaced;
                                return result[key];
                            }
                        }

                        if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object' && child !== null) {
                            result[key] = replaceObject(child, replacers, itemKey);
                            return result[key];
                        }

                        result[key] = child;
                        return result[key];
                    },
                    set: function set(value) {
                        delete result[key];
                        result[key] = value;
                    }
                });
            };

            for (var key in item) {
                var _ret4 = _loop2(key);

                if (_ret4 === 'continue') continue;
            }

            // $FlowFixMe
            return {
                v: result
            };
        }();

        if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
    } else {
        throw new Error('Pass an object or array');
    }
}

export function copyProp(source, target, name, def) {
    if (source.hasOwnProperty(name)) {
        var descriptor = Object.getOwnPropertyDescriptor(source, name);
        // $FlowFixMe
        Object.defineProperty(target, name, descriptor);
    } else {
        target[name] = def;
    }
}

export function dotify(obj) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var newobj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    prefix = prefix ? prefix + '.' : prefix;
    for (var key in obj) {
        if (obj[key] === undefined || obj[key] === null || typeof obj[key] === 'function') {
            continue;
        } else if (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every(function (val) {
            return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== 'object';
        })) {
            newobj['' + prefix + key] = obj[key].join(',');
        } else if (obj[key] && _typeof(obj[key]) === 'object') {
            newobj = dotify(obj[key], '' + prefix + key, newobj);
        } else {
            newobj['' + prefix + key] = obj[key].toString();
        }
    }
    return newobj;
}

var objectIDs = new WeakMap();

export function getObjectID(obj) {

    if (obj === null || obj === undefined || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && typeof obj !== 'function') {
        throw new Error('Invalid object');
    }

    var uid = objectIDs.get(obj);

    if (!uid) {
        uid = (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) + ':' + uniqueID();
        objectIDs.set(obj, uid);
    }

    return uid;
}

export function regex(pattern, string) {
    var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


    if (typeof pattern === 'string') {
        // eslint-disable-next-line security/detect-non-literal-regexp
        pattern = new RegExp(pattern);
    }

    var result = string.slice(start).match(pattern);

    if (!result) {
        return;
    }

    // $FlowFixMe
    var index = result.index;
    var match = result[0];

    return {
        text: match,
        groups: result.slice(1),
        start: start + index,
        end: start + index + match.length,
        length: match.length,

        replace: function replace(text) {

            if (!match) {
                return '';
            }

            return '' + match.slice(0, start + index) + text + match.slice(index + match.length);
        }
    };
}

export function regexAll(pattern, string) {

    var matches = [];
    var start = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        var match = regex(pattern, string, start);

        if (!match) {
            break;
        }

        matches.push(match);
        start = match.end;
    }

    return matches;
}

export function count(str, substr) {

    var startIndex = 0;
    var itemCount = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        var index = str.indexOf(substr, startIndex);

        if (index === -1) {
            break;
        }

        startIndex = index;
        itemCount += 1;
    }

    return itemCount;
}

export function stringify(item) {
    if (typeof item === 'string') {
        return item;
    }

    if (item && typeof item.toString === 'function') {
        return item.toString();
    }

    return Object.prototype.toString.call(item);
}

export function stringifyError(err) {
    if (err) {
        // $FlowFixMe
        var stack = err.stack,
            message = err.message;


        if (typeof stack === 'string') {
            return stack;
        }

        if (typeof message === 'string') {
            return message;
        }
    }

    return stringify(err);
}

export function eventEmitter() {

    var triggered = {};
    var handlers = {};

    return {
        on: function on(eventName, handler) {

            var handlerList = handlers[eventName] = handlers[eventName] || [];

            handlerList.push(handler);

            var cancelled = false;

            return {
                cancel: function cancel() {
                    if (!cancelled) {
                        cancelled = true;
                        handlerList.splice(handlerList.indexOf(handler), 1);
                    }
                }
            };
        },
        once: function once(eventName, handler) {

            var listener = this.on(eventName, function () {
                listener.cancel();
                handler();
            });

            return listener;
        },
        trigger: function trigger(eventName) {

            var handlerList = handlers[eventName];

            if (handlerList) {
                for (var _i3 = 0, _length2 = handlerList == null ? 0 : handlerList.length; _i3 < _length2; _i3++) {
                    var _handler = handlerList[_i3];
                    _handler();
                }
            }
        },
        triggerOnce: function triggerOnce(eventName) {

            if (triggered[eventName]) {
                return;
            }

            triggered[eventName] = true;
            this.trigger(eventName);
        }
    };
}