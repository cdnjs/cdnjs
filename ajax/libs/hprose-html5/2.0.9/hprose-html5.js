// Hprose for HTML5 v2.0.8
// Copyright (c) 2008-2016 http://hprose.com
// Hprose is freely distributable under the MIT license.
// For all details and documentation:
// https://github.com/hprose/hprose-html5

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * Init.js                                                *
 *                                                        *
 * hprose init for HTML5.                                 *
 *                                                        *
 * LastModified: Feb 23, 2016                             *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global) {
    'use strict';

    global.hprose = Object.create(null);

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * Helper.js                                              *
 *                                                        *
 * hprose helper for HTML5.                               *
 *                                                        *
 * LastModified: Mar 2, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global, undefined) {
    'use strict';

    function generic(method) {
        if (typeof method !== "function") {
            throw new TypeError(method + " is not a function");
        }
        return function(context) {
            return method.apply(context, Array.prototype.slice.call(arguments, 1));
        };
    }

    var arrayLikeObjectArgumentsEnabled = true;

    try {
        String.fromCharCode.apply(String, new Uint8Array([1]));
    }
    catch (e) {
        arrayLikeObjectArgumentsEnabled = false;
    }

    function toArray(arrayLikeObject) {
        var n = arrayLikeObject.length;
        var a = new Array(n);
        for (var i = 0; i < n; ++i) {
            a[i] = arrayLikeObject[i];
        }
        return a;
    }

    var getCharCodes = arrayLikeObjectArgumentsEnabled ? function(bytes) { return bytes; } : toArray;

    function toBinaryString(bytes) {
        if (bytes instanceof ArrayBuffer) {
            bytes = new Uint8Array(bytes);
        }
        var n = bytes.length;
        if (n < 100000) {
            return String.fromCharCode.apply(String, getCharCodes(bytes));
        }
        var remain = n & 0xFFFF;
        var count = n >> 16;
        var a = new Array(remain ? count + 1 : count);
        for (var i = 0; i < count; ++i) {
            a[i] = String.fromCharCode.apply(String, getCharCodes(bytes.subarray(i << 16, (i + 1) << 16)));
        }
        if (remain) {
            a[count] = String.fromCharCode.apply(String, getCharCodes(bytes.subarray(count << 16, n)));
        }
        return a.join('');
    }

    function toUint8Array(bs) {
        var n = bs.length;
        var data = new Uint8Array(n);
        for (var i = 0; i < n; i++) {
            data[i] = bs.charCodeAt(i) & 0xFF;
        }
        return data;
    }

    global.hprose.generic = generic;
    global.hprose.toBinaryString = toBinaryString;
    global.hprose.toUint8Array = toUint8Array;
    global.hprose.toArray = toArray;

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * Polyfill.js                                            *
 *                                                        *
 * Polyfill for JavaScript.                               *
 *                                                        *
 * LastModified: Mar 2, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global, undefined) {
    'use strict';
    /* Function */
    if (!Function.prototype.bind) {
        Object.defineProperty(Function.prototype, 'bind', { value: function(oThis) {
            if (typeof this !== 'function') {
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }
            var aArgs   = Array.prototype.slice.call(arguments, 1),
                toBind = this,
                NOP    = function() {},
                bound  = function() {
                    return toBind.apply(this instanceof NOP ? this : oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                };
            if (this.prototype) {
                NOP.prototype = this.prototype;
            }
            bound.prototype = new NOP();
            return bound;
        } });
    }
    /* Array */
    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', { value: function(searchElement /*, fromIndex*/ ) {
            var O = Object(this);
            var len = parseInt(O.length, 10) || 0;
            if (len === 0) {
                return false;
            }
            var n = parseInt(arguments[1], 10) || 0;
            var k;
            if (n >= 0) {
                k = n;
            }
            else {
                k = len + n;
                if (k < 0) { k = 0; }
            }
            var currentElement;
            while (k < len) {
                currentElement = O[k];
                if (searchElement === currentElement ||
                    (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
                    return true;
                }
                k++;
            }
            return false;
        } });
    }
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', { value: function(predicate) {
            if (this === null || this === undefined) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;
            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        } });
    }
    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', { value: function(predicate) {
            if (this === null || this === undefined) {
                throw new TypeError('Array.prototype.findIndex called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return i;
                }
            }
            return -1;
        } });
    }
    if (!Array.prototype.fill) {
        Object.defineProperty(Array.prototype, 'fill', { value: function(value) {
            if (this === null || this === undefined) {
                throw new TypeError('this is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            var start = arguments[1];
            var relativeStart = start >> 0;
            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
            var end = arguments[2];
            var relativeEnd = end === undefined ? len : end >> 0;
            var f = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);

            while (k < f) {
                O[k] = value;
                k++;
            }
            return O;
        } });
    }
    if (!Array.prototype.copyWithin) {
        Object.defineProperty(Array.prototype, 'copyWithin', { value: function(target, start/*, end*/) {
            if (this === null || this === undefined) {
                throw new TypeError('this is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            var relativeTarget = target >> 0;
            var to = relativeTarget < 0 ? Math.max(len + relativeTarget, 0) : Math.min(relativeTarget, len);
            var relativeStart = start >> 0;
            var from = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
            var end = arguments[2];
            var relativeEnd = end === undefined ? len : end >> 0;
            var f = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
            var count = Math.min(f - from, len - to);
            var direction = 1;
            if (from < to && to < (from + count)) {
                direction = -1;
                from += count - 1;
                to += count - 1;
            }
            while (count > 0) {
                if (from in O) {
                    O[to] = O[from];
                }
                else {
                    delete O[to];
                }
                from += direction;
                to += direction;
                count--;
            }
            return O;
        } });
    }
    if (!Array.from) {
        Object.defineProperty(Array, 'from', { value: (function() {
            var toStr = Object.prototype.toString;
            var isCallable = function(fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var toInteger = function(value) {
                var number = Number(value);
                if (isNaN(number)) { return 0; }
                if (number === 0 || !isFinite(number)) { return number; }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function(value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };

            return function(arrayLike/*, mapFn, thisArg */) {
                var C = this;
                var items = Object(arrayLike);
                if (arrayLike === null || arrayLike === undefined) {
                    throw new TypeError("Array.from requires an array-like object - not null or undefined");
                }
                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }
                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                }
                var len = toLength(items.length);
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);
                var k = 0;
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    }
                    else {
                        A[k] = kValue;
                    }
                    k += 1;
                }
                A.length = len;
                return A;
            };
        }()) });
    }
    if (!Array.of) {
        Object.defineProperty(Array, 'of', { value: function() {
            return Array.prototype.slice.call(arguments);
        } });
    }
    /* String */
    if (!String.prototype.startsWith) {
        Object.defineProperty(String.prototype, 'startsWith', { value: function(searchString, position){
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        } });
    }
    if (!String.prototype.endsWith) {
        Object.defineProperty(String.prototype, 'endsWith', { value: function(searchString, position) {
            var subjectString = this.toString();
            if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        } });
    }
    if (!String.prototype.includes) {
        Object.defineProperty(String.prototype, 'includes', { value: function() {
            if (typeof arguments[1] === "number") {
                if (this.length < arguments[0].length + arguments[1].length) {
                    return false;
                }
                else {
                    return this.substr(arguments[1], arguments[0].length) === arguments[0];
                }
            }
            else {
                return String.prototype.indexOf.apply(this, arguments) !== -1;
            }
        } });
    }
    if (!String.prototype.repeat) {
        Object.defineProperty(String.prototype, 'repeat', { value: function(count) {
            var str = this.toString();
            count = +count;
            if (count !== count) {
                count = 0;
            }
            if (count < 0) {
                throw new RangeError('repeat count must be non-negative');
            }
            if (count === Infinity) {
                throw new RangeError('repeat count must be less than infinity');
            }
            count = Math.floor(count);
            if (str.length === 0 || count === 0) {
                return '';
            }
            // Ensuring count is a 31-bit integer allows us to heavily optimize the
            // main part. But anyway, most current (August 2014) browsers can't handle
            // strings 1 << 28 chars or longer, so:
            if (str.length * count >= 1 << 28) {
              throw new RangeError('repeat count must not overflow maximum string size');
            }
            var rpt = '';
            for (;;) {
                if ((count & 1) === 1) {
                    rpt += str;
                }
                count >>>= 1;
                if (count === 0) {
                    break;
                }
                str += str;
            }
            // Could we try:
            // return Array(count + 1).join(this);
            return rpt;
        } });
    }
    if (!String.prototype.trim) {
        Object.defineProperty(String.prototype, 'trim', { value: function() {
            return this.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
        } });
    }
    if (!String.prototype.trimLeft) {
        Object.defineProperty(String.prototype, 'trimLeft', { value: function() {
            return this.toString().replace(/^[\s\xa0]+/, '');
        } });
    }
    if (!String.prototype.trimRight) {
        Object.defineProperty(String.prototype, 'trimRight', { value: function() {
            return this.toString().replace(/[\s\xa0]+$/, '');
        } });
    }
    /* Object */
    if (!Object.keys) {
        Object.defineProperty(Object, 'keys', { value: (function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;
            return function (obj) {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
                    throw new TypeError('Object.keys called on non-object');
                }
                var result = [];
                for (var prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }
                if (hasDontEnumBug) {
                    for (var i=0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        })() });
    }
    /* Generic methods */
    var generic = global.hprose.generic;

    function genericMethods(obj, properties) {
        var proto = obj.prototype;
        for (var i = 0, len = properties.length; i < len; i++) {
            var property = properties[i];
            var method = proto[property];
            if (typeof method === 'function' && typeof obj[property] === 'undefined') {
                Object.defineProperty(obj, property, { value: generic(method) });
            }
        }
    }
    genericMethods(Array, [
        "pop",
        "push",
        "reverse",
        "shift",
        "sort",
        "splice",
        "unshift",
        "concat",
        "join",
        "slice",
        "indexOf",
        "lastIndexOf",
        "filter",
        "forEach",
        "every",
        "map",
        "some",
        "reduce",
        "reduceRight",
        "includes",
        "find",
        "findIndex"
    ]);
    genericMethods(String, [
        'quote',
        'substring',
        'toLowerCase',
        'toUpperCase',
        'charAt',
        'charCodeAt',
        'indexOf',
        'lastIndexOf',
        'include',
        'startsWith',
        'endsWith',
        'repeat',
        'trim',
        'trimLeft',
        'trimRight',
        'toLocaleLowerCase',
        'toLocaleUpperCase',
        'match',
        'search',
        'replace',
        'split',
        'substr',
        'concat',
        'slice'
    ]);

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * HarmonyMaps.js                                         *
 *                                                        *
 * Harmony Maps for HTML5.                                *
 *                                                        *
 * LastModified: Mar 2, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global) {
    'use strict';

    var hasWeakMap = 'WeakMap' in global;
    var hasMap = 'Map' in global;
    var hasForEach = true;

    if (hasMap) {
        hasForEach = 'forEach' in new global.Map();
    }

    if (hasWeakMap && hasMap && hasForEach) { return; }

    var namespaces = Object.create(null);
    var count = 0;
    var reDefineValueOf = function (obj) {
        var privates = Object.create(null);
        var baseValueOf = obj.valueOf;
        Object.defineProperty(obj, 'valueOf', {
            value: function (namespace, n) {
                    if ((this === obj) &&
                        (n in namespaces) &&
                        (namespaces[n] === namespace)) {
                        if (!(n in privates)) {
                            privates[n] = Object.create(null);
                        }
                        return privates[n];
                    }
                    else {
                        return baseValueOf.apply(this, arguments);
                    }
                },
            writable: true,
            configurable: true,
            enumerable: false
        });
    };

    if (!hasWeakMap) {
        global.WeakMap = function WeakMap() {
            var namespace = Object.create(null);
            var n = count++;
            namespaces[n] = namespace;
            var map = function (key) {
                if (key !== Object(key)) {
                    throw new Error('value is not a non-null object');
                }
                var privates = key.valueOf(namespace, n);
                if (privates !== key.valueOf()) {
                    return privates;
                }
                reDefineValueOf(key);
                return key.valueOf(namespace, n);
            };
            var m = Object.create(WeakMap.prototype, {
                get: {
                    value: function (key) {
                        return map(key).value;
                    }
                },
                set: {
                    value: function (key, value) {
                        map(key).value = value;
                    }
                },
                has: {
                    value: function (key) {
                        return 'value' in map(key);
                    }
                },
                'delete': {
                    value: function (key) {
                        return delete map(key).value;
                    }
                },
                clear: {
                    value: function () {
                        delete namespaces[n];
                        n = count++;
                        namespaces[n] = namespace;
                    }
                }
            });
            if (arguments.length > 0 && Array.isArray(arguments[0])) {
                var iterable = arguments[0];
                for (var i = 0, len = iterable.length; i < len; i++) {
                    m.set(iterable[i][0], iterable[i][1]);
                }
            }
            return m;
        };
    }

    if (!hasMap) {
        var objectMap = function () {
            var namespace = Object.create(null);
            var n = count++;
            var nullMap = Object.create(null);
            namespaces[n] = namespace;
            var map = function (key) {
                if (key === null) { return nullMap; }
                var privates = key.valueOf(namespace, n);
                if (privates !== key.valueOf()) { return privates; }
                reDefineValueOf(key);
                return key.valueOf(namespace, n);
            };
            return {
                get: function (key) { return map(key).value; },
                set: function (key, value) { map(key).value = value; },
                has: function (key) { return 'value' in map(key); },
                'delete': function (key) { return delete map(key).value; },
                clear: function () {
                    delete namespaces[n];
                    n = count++;
                    namespaces[n] = namespace;
                }
            };
        };
        var noKeyMap = function () {
            var map = Object.create(null);
            return {
                get: function () { return map.value; },
                set: function (_, value) { map.value = value; },
                has: function () { return 'value' in map; },
                'delete': function () { return delete map.value; },
                clear: function () { map = Object.create(null); }
            };
        };
        var scalarMap = function () {
            var map = Object.create(null);
            return {
                get: function (key) { return map[key]; },
                set: function (key, value) { map[key] = value; },
                has: function (key) { return key in map; },
                'delete': function (key) { return delete map[key]; },
                clear: function () { map = Object.create(null); }
            };
        };
        global.Map = function Map() {
            var map = {
                'number': scalarMap(),
                'string': scalarMap(),
                'boolean': scalarMap(),
                'object': objectMap(),
                'function': objectMap(),
                'unknown': objectMap(),
                'undefined': noKeyMap(),
                'null': noKeyMap()
            };
            var size = 0;
            var keys = [];
            var m = Object.create(Map.prototype, {
                size: {
                    get : function () { return size; }
                },
                get: {
                    value: function (key) {
                        return map[typeof(key)].get(key);
                    }
                },
                set: {
                    value: function (key, value) {
                        if (!this.has(key)) {
                            keys.push(key);
                            size++;
                        }
                        map[typeof(key)].set(key, value);
                    }
                },
                has: {
                    value: function (key) {
                        return map[typeof(key)].has(key);
                    }
                },
                'delete': {
                    value: function (key) {
                        if (this.has(key)) {
                            size--;
                            keys.splice(keys.indexOf(key), 1);
                            return map[typeof(key)]['delete'](key);
                        }
                        return false;
                    }
                },
                clear: {
                    value: function () {
                        keys.length = 0;
                        for (var key in map) { map[key].clear(); }
                        size = 0;
                    }
                },
                forEach: {
                    value: function (callback, thisArg) {
                        for (var i = 0, n = keys.length; i < n; i++) {
                            callback.call(thisArg, this.get(keys[i]), keys[i], this);
                        }
                    }
                }
            });
            if (arguments.length > 0 && Array.isArray(arguments[0])) {
                var iterable = arguments[0];
                for (var i = 0, len = iterable.length; i < len; i++) {
                    m.set(iterable[i][0], iterable[i][1]);
                }
            }
            return m;
        };
    }

    if (!hasForEach) {
        var OldMap = global.Map;
        global.Map = function Map() {
            var map = new OldMap();
            var size = 0;
            var keys = [];
            var m = Object.create(Map.prototype, {
                size: {
                    get : function () { return size; }
                },
                get: {
                    value: function (key) {
                        return map.get(key);
                    }
                },
                set: {
                    value: function (key, value) {
                        if (!map.has(key)) {
                            keys.push(key);
                            size++;
                        }
                        map.set(key, value);
                    }
                },
                has: {
                    value: function (key) {
                        return map.has(key);
                    }
                },
                'delete': {
                    value: function (key) {
                        if (map.has(key)) {
                            size--;
                            keys.splice(keys.indexOf(key), 1);
                            return map['delete'](key);
                        }
                        return false;
                    }
                },
                clear: {
                    value: function () {
                        if ('clear' in map) {
                            map.clear();
                        }
                        else {
                            for (var i = 0, n = keys.length; i < n; i++) {
                                map['delete'](keys[i]);
                            }
                        }
                        keys.length = 0;
                        size = 0;
                    }
                },
                forEach: {
                    value: function (callback, thisArg) {
                        for (var i = 0, n = keys.length; i < n; i++) {
                            callback.call(thisArg, this.get(keys[i]), keys[i], this);
                        }
                    }
                }
            });
            if (arguments.length > 0 && Array.isArray(arguments[0])) {
                var iterable = arguments[0];
                for (var i = 0, len = iterable.length; i < len; i++) {
                    m.set(iterable[i][0], iterable[i][1]);
                }
            }
            return m;
        };
    }
})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * TimeoutError.js                                        *
 *                                                        *
 * TimeoutError for HTML5.                                *
 *                                                        *
 * LastModified: Jul 17, 2015                             *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

function TimeoutError(message) {
    Error.call(this);
    this.message = message;
    this.name = TimeoutError.name;
    if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(this, TimeoutError);
    }
}

TimeoutError.prototype = Object.create(Error.prototype);
TimeoutError.prototype.constructor = TimeoutError;

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * setImmediate.js                                        *
 *                                                        *
 * setImmediate for HTML5.                                *
 *                                                        *
 * LastModified: Mar 2, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function(global, undefined) {
    'use strict';
    if (global.setImmediate) { return; }

    var doc = global.document;
    var MutationObserver = global.MutationObserver || global.WebKitMutationObserver || global.MozMutationOvserver;
    var polifill = {};
    var nextId = 1;
    var tasks = {};

    function wrap(handler) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
            handler.apply(undefined, args);
        };
    }

    function clear(handleId) {
        delete tasks[handleId];
    }

    function run(handleId) {
        var task = tasks[handleId];
        if (task) {
            try {
                task();
            }
            finally {
                clear(handleId);
            }
        }
    }

    function create(args) {
        tasks[nextId] = wrap.apply(undefined, args);
        return nextId++;
    }

    polifill.mutationObserver = function() {
        var queue = [],
            node = doc.createTextNode(''),
            observer = new MutationObserver(function() {
                while (queue.length > 0) {
                    run(queue.shift());
                }
            });

        observer.observe(node, {"characterData": true});

        return function() {
            var handleId = create(arguments);
            queue.push(handleId);
            node.data = handleId & 1;
            return handleId;
        };
    };

    polifill.messageChannel = function() {
        var channel = new global.MessageChannel();

        channel.port1.onmessage = function(event) {
            run(Number(event.data));
        };

        return function() {
            var handleId = create(arguments);
            channel.port2.postMessage(handleId);
            return handleId;
        };
    };

    polifill.nextTick = function() {
        return function() {
            var handleId = create(arguments);
            global.process.nextTick( wrap( run, handleId ) );
            return handleId;
        };
    };

    polifill.postMessage = function() {
        var iframe = doc.createElement('iframe');
        iframe.style.display = 'none';
        doc.documentElement.appendChild(iframe);
        var iwin = iframe.contentWindow;
        iwin.document.write('<script>window.onmessage=function(){parent.postMessage(1, "*");};</script>');
        iwin.document.close();
        var queue = [];
        window.addEventListener('message', function() {
            while (queue.length > 0) {
                run(queue.shift());
            }
        });
        return function() {
            var handleId = create(arguments);
            queue.push(handleId);
            iwin.postMessage(1, "*");
            return handleId;
        };
    };

    polifill.readyStateChange = function() {
        var html = doc.documentElement;

        return function() {
            var handleId = create(arguments);
            var script = doc.createElement('script');

            script.onreadystatechange = function() {
                run(handleId);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };

            html.appendChild(script);

            return handleId;
        };
    };

    polifill.setTimeout = function() {
        return function() {
            var handleId = create(arguments);
            global.setTimeout( wrap( run, handleId ), 0 );
            return handleId;
        };
    };

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = (attachTo && attachTo.setTimeout ? attachTo : global);

    // Don't get fooled by e.g. browserify environments.
    // For Node.js before 0.9
    if (typeof(global.process) !== 'undefined' &&
        Object.prototype.toString.call(global.process) === '[object process]' &&
        !global.process.browser) {
        attachTo.setImmediate = polifill.nextTick();
    }
    // For IE 6–9
    else if (doc && ('onreadystatechange' in doc.createElement('script'))) {
        attachTo.setImmediate = polifill.readyStateChange();
    }
    // For MutationObserver, where supported
    else if (doc && MutationObserver) {
        attachTo.setImmediate = polifill.mutationObserver();
    }
    // For web workers, where supported
    else if (global.MessageChannel) {
        attachTo.setImmediate = polifill.messageChannel();
    }
    // For non-IE modern browsers
    else if (doc && 'postMessage' in global && 'addEventListener' in global) {
        attachTo.setImmediate = polifill.postMessage();
    }
    // For older browsers
    else {
        attachTo.setImmediate = polifill.setTimeout();
    }

    attachTo.clearImmediate = clear;
})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * Future.js                                              *
 *                                                        *
 * hprose Future for HTML5.                               *
 *                                                        *
 * LastModified: Jun 7, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global, undefined) {
    'use strict';

    var PENDING = 0;
    var FULFILLED = 1;
    var REJECTED = 2;

    var hasPromise = 'Promise' in global;
    var setImmediate = global.setImmediate;
    var setTimeout = global.setTimeout;
    var clearTimeout = global.clearTimeout;
    var TimeoutError = global.TimeoutError;

    function Future(computation) {
        Object.defineProperties(this, {
            _subscribers: { value: [] },
            resolve: { value: this.resolve.bind(this) },
            reject: { value: this.reject.bind(this) }
        });
        var self = this;
        if (typeof computation === 'function') {
            setImmediate(function() {
                try {
                    self.resolve(computation());
                }
                catch(e) {
                    self.reject(e);
                }
            });
        }
    }

    function isFuture(obj) {
        return obj instanceof Future;
    }

    function isPromise(obj) {
        return isFuture(obj) || (hasPromise && (obj instanceof global.Promise) && (typeof (obj.then === 'function')));
    }

    function toPromise(obj) {
        return (isPromise(obj) ? obj : value(obj));
    }

    function delayed(duration, value) {
        var computation = (typeof value === 'function') ?
                          value :
                          function() { return value; };
        var future = new Future();
        setTimeout(function() {
            try {
                future.resolve(computation());
            }
            catch(e) {
                future.reject(e);
            }
        }, duration);
        return future;
    }

    function error(e) {
        var future = new Future();
        future.reject(e);
        return future;
    }

    function value(v) {
        var future = new Future();
        future.resolve(v);
        return future;
    }

    function sync(computation) {
        try {
            var result = computation();
            return value(result);
        }
        catch(e) {
            return error(e);
        }
    }

    function promise(executor) {
        var future = new Future();
        executor(future.resolve, future.reject);
        return future;
    }

    function arraysize(array) {
        var size = 0;
        Array.forEach(array, function() { ++size; });
        return size;
    }

    function all(array) {
        array = isPromise(array) ? array : value(array);
        return array.then(function(array) {
            var n = array.length;
            var count = arraysize(array);
            var result = new Array(n);
            if (count === 0) { return value(result); }
            var future = new Future();
            Array.forEach(array, function(element, index) {
                toPromise(element).then(function(value) {
                    result[index] = value;
                    if (--count === 0) {
                        future.resolve(result);
                    }
                },
                future.reject);
            });
            return future;
        });
    }

    function join() {
        return all(arguments);
    }

    function race(array) {
        array = isPromise(array) ? array : value(array);
        return array.then(function(array) {
            var future = new Future();
            Array.forEach(array, function(element) {
                toPromise(element).fill(future);
            });
            return future;
        });
    }

    function any(array) {
        array = isPromise(array) ? array : value(array);
        return array.then(function(array) {
            var n = array.length;
            var count = arraysize(array);
            if (count === 0) {
                throw new RangeError('any(): array must not be empty');
            }
            var reasons = new Array(n);
            var future = new Future();
            Array.forEach(array, function(element, index) {
                toPromise(element).then(future.resolve, function(e) {
                    reasons[index] = e;
                    if (--count === 0) {
                        future.reject(reasons);
                    }
                });
            });
            return future;
        });
    }

    function settle(array) {
        array = isPromise(array) ? array : value(array);
        return array.then(function(array) {
            var n = array.length;
            var count = arraysize(array);
            var result = new Array(n);
            if (count === 0) { return value(result); }
            var future = new Future();
            Array.forEach(array, function(element, index) {
                var f = toPromise(element);
                f.whenComplete(function() {
                    result[index] = f.inspect();
                    if (--count === 0) {
                        future.resolve(result);
                    }
                });
            });
            return future;
        });
    }

    function attempt(handler/*, arg1, arg2, ... */) {
        var args = Array.slice(arguments, 1);
        return all(args).then(function(args) {
            return handler.apply(undefined, args);
        });
    }

    function run(handler, thisArg/*, arg1, arg2, ... */) {
        var args = Array.slice(arguments, 2);
        return all(args).then(function(args) {
            return handler.apply(thisArg, args);
        });
    }

    function wrap(handler, thisArg) {
        return function() {
            return all(arguments).then(function(args) {
                return handler.apply(thisArg, args);
            });
        };
    }

    function forEach(array, callback, thisArg) {
        return all(array).then(function(array) {
            return array.forEach(callback, thisArg);
        });
    }

    function every(array, callback, thisArg) {
        return all(array).then(function(array) {
            return array.every(callback, thisArg);
        });
    }

    function some(array, callback, thisArg) {
        return all(array).then(function(array) {
            return array.some(callback, thisArg);
        });
    }

    function filter(array, callback, thisArg) {
        return all(array).then(function(array) {
            return array.filter(callback, thisArg);
        });
    }

    function map(array, callback, thisArg) {
        return all(array).then(function(array) {
            return array.map(callback, thisArg);
        });
    }

    function reduce(array, callback, initialValue) {
        if (arguments.length > 2) {
            return all(array).then(function(array) {
                if (!isPromise(initialValue)) {
                    initialValue = value(initialValue);
                }
                return initialValue.then(function(value) {
                    return array.reduce(callback, value);
                });
            });
        }
        return all(array).then(function(array) {
            return array.reduce(callback);
        });
    }

    function reduceRight(array, callback, initialValue) {
        if (arguments.length > 2) {
            return all(array).then(function(array) {
                if (!isPromise(initialValue)) {
                    initialValue = value(initialValue);
                }
                return initialValue.then(function(value) {
                    return array.reduceRight(callback, value);
                });
            });
        }
        return all(array).then(function(array) {
            return array.reduceRight(callback);
        });
    }

    function indexOf(array, searchElement, fromIndex) {
        return all(array).then(function(array) {
            if (!isPromise(searchElement)) {
                searchElement = value(searchElement);
            }
            return searchElement.then(function(searchElement) {
                return array.indexOf(searchElement, fromIndex);
            });
        });
    }

    function lastIndexOf(array, searchElement, fromIndex) {
        return all(array).then(function(array) {
            if (!isPromise(searchElement)) {
                searchElement = value(searchElement);
            }
            return searchElement.then(function(searchElement) {
                if (fromIndex === undefined) {
                    fromIndex = array.length - 1;
                }
                return array.lastIndexOf(searchElement, fromIndex);
            });
        });
    }

    function includes(array, searchElement, fromIndex) {
        return all(array).then(function(array) {
            if (!isPromise(searchElement)) {
                searchElement = value(searchElement);
            }
            return searchElement.then(function(searchElement) {
                return array.includes(searchElement, fromIndex);
            });
        });
    }

    function find(array, predicate, thisArg) {
        return all(array).then(function(array) {
            return array.find(predicate, thisArg);
        });
    }

    function findIndex(array, predicate, thisArg) {
        return all(array).then(function(array) {
            return array.findIndex(predicate, thisArg);
        });
    }

    Object.defineProperties(Future, {
        // port from Dart
        delayed: { value: delayed },
        error: { value: error },
        sync: { value: sync },
        value: { value: value },
        // Promise compatible
        all: { value: all },
        race: { value: race },
        resolve: { value: value },
        reject: { value: error },
        // extended methods
        promise: { value: promise },
        isFuture: { value: isFuture },
        isPromise: { value: isPromise },
        toPromise: { value: toPromise },
        join: { value: join },
        any: { value: any },
        settle: { value: settle },
        attempt: { value: attempt },
        run: { value: run },
        wrap: { value: wrap },
        // for array
        forEach: { value: forEach },
        every: { value: every },
        some: { value: some },
        filter: { value: filter },
        map: { value: map },
        reduce: { value: reduce },
        reduceRight: { value: reduceRight },
        indexOf: { value: indexOf },
        lastIndexOf: { value: lastIndexOf },
        includes: { value: includes },
        find: { value: find },
        findIndex: { value: findIndex }
    });

    function _call(callback, next, x) {
        setImmediate(function() {
            try {
                var r = callback(x);
                next.resolve(r);
            }
            catch(e) {
                next.reject(e);
            }
        });
    }

    function _reject(onreject, next, e) {
        if (onreject) {
            _call(onreject, next, e);
        }
        else {
            next.reject(e);
        }
    }

    function _resolve(onfulfill, onreject, self, next, x) {
        function resolvePromise(y) {
            _resolve(onfulfill, onreject, self, next, y);
        }
        function rejectPromise(r) {
            _reject(onreject, next, r);
        }
        if (isPromise(x)) {
            if (x === self) {
                rejectPromise(new TypeError('Self resolution'));
                return;
            }
            x.then(resolvePromise, rejectPromise);
            return;
        }
        if ((x !== null) &&
            (typeof x === 'object') ||
            (typeof x === 'function')) {
            var then;
            try {
                then = x.then;
            }
            catch (e) {
                rejectPromise(e);
                return;
            }
            if (typeof then === 'function') {
                var notrun = true;
                try {
                    then.call(x, function(y) {
                        if (notrun) {
                            notrun = false;
                            resolvePromise(y);
                        }
                    }, function(r) {
                        if (notrun) {
                            notrun = false;
                            rejectPromise(r);
                        }
                    });
                    return;
                }
                catch (e) {
                    if (notrun) {
                        notrun = false;
                        rejectPromise(e);
                    }
                }
                return;
            }
        }
        if (onfulfill) {
            _call(onfulfill, next, x);
        }
        else {
            next.resolve(x);
        }
    }

    Object.defineProperties(Future.prototype, {
        _value: { writable: true },
        _reason: { writable: true },
        _state: { value: PENDING, writable: true },
        resolve: { value: function(value) {
            if (this._state === PENDING) {
                this._state = FULFILLED;
                this._value = value;
                var subscribers = this._subscribers;
                while (subscribers.length > 0) {
                    var subscriber = subscribers.shift();
                    _resolve(subscriber.onfulfill,
                             subscriber.onreject,
                             this,
                             subscriber.next,
                             value);
                }
            }
        } },
        reject: { value: function(reason) {
            if (this._state === PENDING) {
                this._state = REJECTED;
                this._reason = reason;
                var subscribers = this._subscribers;
                while (subscribers.length > 0) {
                    var subscriber = subscribers.shift();
                    if (subscriber.onreject) {
                        _call(subscriber.onreject,
                              subscriber.next,
                              reason);
                    }
                    else {
                        subscriber.next.reject(reason);
                    }
                }
            }
        } },
        then: { value: function(onfulfill, onreject) {
            if (typeof onfulfill !== 'function') { onfulfill = null; }
            if (typeof onreject !== 'function') { onreject = null; }
            if (onfulfill || onreject) {
                var next = new Future();
                if (this._state === FULFILLED) {
                    _resolve(onfulfill, onreject, this, next, this._value);
                }
                else if (this._state === REJECTED) {
                    if (onreject) {
                        _call(onreject, next, this._reason);
                    }
                    else {
                        next.reject(this._reason);
                    }
                }
                else {
                    this._subscribers.push({
                        onfulfill: onfulfill,
                        onreject: onreject,
                        next: next
                    });
                }
                return next;
            }
            return this;
        } },
        done: { value: function(onfulfill, onreject) {
            this.then(onfulfill, onreject).then(null, function(error) {
                setImmediate(function() { throw error; });
            });
        } },
        inspect: { value: function() {
            switch (this._state) {
                case PENDING: return { state: 'pending' };
                case FULFILLED: return { state: 'fulfilled', value: this._value };
                case REJECTED: return { state: 'rejected', reason: this._reason };
            }
        } },
        catchError: { value: function(onreject, test) {
            if (typeof test === 'function') {
                var self = this;
                return this['catch'](function(e) {
                    if (test(e)) {
                        return self['catch'](onreject);
                    }
                    else {
                        throw e;
                    }
                });
            }
            return this['catch'](onreject);
        } },
        'catch': { value: function(onreject) {
            return this.then(null, onreject);
        } },
        fail: { value: function(onreject) {
            this.done(null, onreject);
        } },
        whenComplete: { value: function(action) {
            return this.then(
                function(v) {
                    var f = action();
                    if (f === undefined) { return v; }
                    f = isPromise(f) ? f : value(f);
                    return f.then(function() { return v; });
                },
                function(e) {
                    var f = action();
                    if (f === undefined) { throw e; }
                    f = isPromise(f) ? f : value(f);
                    return f.then(function() { throw e; });
                }
            );
        } },
        complete: { value: function(oncomplete) {
           return this.then(oncomplete, oncomplete);
        } },
        always: { value: function(oncomplete) {
           this.done(oncomplete, oncomplete);
        } },
        fill: { value: function(future) {
           this.then(future.resolve, future.reject);
        } },
        timeout: { value: function(duration, reason) {
            var future = new Future();
            var timeoutId = setTimeout(function() {
                future.reject(reason || new TimeoutError('timeout'));
            }, duration);
            this.whenComplete(function() { clearTimeout(timeoutId); })
                .fill(future);
            return future;
        } },
        delay: { value: function(duration) {
            var future = new Future();
            this.then(function(result) {
                setTimeout(function() {
                    future.resolve(result);
                }, duration);
            },
            future.reject);
            return future;
        } },
        tap: { value: function(onfulfilledSideEffect, thisArg) {
            return this.then(function(result) {
                onfulfilledSideEffect.call(thisArg, result);
                return result;
            });
        } },
        spread: { value: function(onfulfilledArray, thisArg) {
            return this.then(function(array) {
                return onfulfilledArray.apply(thisArg, array);
            });
        } },
        get: { value: function(key) {
            return this.then(function(result) {
                return result[key];
            });
        } },
        set: { value: function(key, value) {
            return this.then(function(result) {
                result[key] = value;
                return result;
            });
        } },
        apply: { value: function(method, args) {
            args = args || [];
            return this.then(function(result) {
                return all(args).then(function(args) {
                    return result[method].apply(result, args);
                });
            });
        } },
        call: { value: function(method) {
            var args = Array.slice(arguments, 1);
            return this.then(function(result) {
                return all(args).then(function(args) {
                    return result[method].apply(result, args);
                });
            });
        } },
        bind: { value: function(method) {
            var bindargs = Array.slice(arguments);
            if (Array.isArray(method)) {
                for (var i = 0, n = method.length; i < n; ++i) {
                    bindargs[0] = method[i];
                    this.bind.apply(this, bindargs);
                }
                return;
            }
            bindargs.shift();
            var self = this;
            Object.defineProperty(this, method, { value: function() {
                var args = Array.slice(arguments);
                return self.then(function(result) {
                    return all(bindargs.concat(args)).then(function(args) {
                        return result[method].apply(result, args);
                    });
                });
            } });
            return this;
        } },
        forEach: { value: function(callback, thisArg) {
            return forEach(this, callback, thisArg);
        } },
        every: { value: function(callback, thisArg) {
            return every(this, callback, thisArg);
        } },
        some: { value: function(callback, thisArg) {
            return some(this, callback, thisArg);
        } },
        filter: { value: function(callback, thisArg) {
            return filter(this, callback, thisArg);
        } },
        map: { value: function(callback, thisArg) {
            return map(this, callback, thisArg);
        } },
        reduce: { value: function(callback, initialValue) {
            if (arguments.length > 1) {
                return reduce(this, callback, initialValue);
            }
            return reduce(this, callback);
        } },
        reduceRight: { value: function(callback, initialValue) {
            if (arguments.length > 1) {
                return reduceRight(this, callback, initialValue);
            }
            return reduceRight(this, callback);
        } },
        indexOf: { value: function(searchElement, fromIndex) {
            return indexOf(this, searchElement, fromIndex);
        } },
        lastIndexOf: { value: function(searchElement, fromIndex) {
            return lastIndexOf(this, searchElement, fromIndex);
        } },
        includes: { value: function(searchElement, fromIndex) {
            return includes(this, searchElement, fromIndex);
        } },
        find: { value: function(predicate, thisArg) {
            return find(this, predicate, thisArg);
        } },
        findIndex: { value: function(predicate, thisArg) {
            return findIndex(this, predicate, thisArg);
        } }
    });

    global.hprose.Future = Future;

    function Completer() {
        var future = new Future();
        Object.defineProperties(this, {
            future: { value: future },
            complete: { value: future.resolve },
            completeError: { value: future.reject },
            isCompleted: { get: function() {
                return ( future._state !== PENDING );
            } }
        });
    }

    global.hprose.Completer = Completer;

    global.hprose.resolved = value;

    global.hprose.rejected = error;

    global.hprose.deferred = function() {
        var self = new Future();
        return Object.create(null, {
            promise: { value: self },
            resolve: { value: self.resolve },
            reject: { value: self.reject }
        });
    };

    if (hasPromise) { return; }

    global.Promise = function(executor) {
        Future.call(this);
        executor(this.resolve, this.reject);
    };

    global.Promise.prototype = Object.create(Future.prototype);
    global.Promise.prototype.constructor = Future;

    Object.defineProperties(global.Promise, {
        all: { value: all },
        race: { value: race },
        resolve: { value: value },
        reject: { value: error }
    });

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * BytesIO.js                                             *
 *                                                        *
 * hprose BytesIO for HTML5.                              *
 *                                                        *
 * LastModified: Mar 2, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global, undefined) {
    'use strict';

    var toBinaryString = global.hprose.toBinaryString;

    var _EMPTY_BYTES = new Uint8Array(0);
    var _INIT_SIZE = 1024;

    function writeInt32BE(bytes, p, i) {
        bytes[p++] = i >>> 24 & 0xFF;
        bytes[p++] = i >>> 16 & 0xFF;
        bytes[p++] = i >>> 8  & 0xFF;
        bytes[p++] = i        & 0xFF;
        return p;
    }

    function writeInt32LE(bytes, p, i) {
        bytes[p++] = i        & 0xFF;
        bytes[p++] = i >>> 8  & 0xFF;
        bytes[p++] = i >>> 16 & 0xFF;
        bytes[p++] = i >>> 24 & 0xFF;
        return p;
    }

    function writeString(bytes, p, str) {
        var n = str.length;
        for (var i = 0; i < n; ++i) {
            var codeUnit = str.charCodeAt(i);
            if (codeUnit < 0x80) {
                bytes[p++] = codeUnit;
            }
            else if (codeUnit < 0x800) {
                bytes[p++] = 0xC0 | (codeUnit >> 6);
                bytes[p++] = 0x80 | (codeUnit & 0x3F);
            }
            else if (codeUnit < 0xD800 || codeUnit > 0xDFFF) {
                bytes[p++] = 0xE0 | (codeUnit >> 12);
                bytes[p++] = 0x80 | ((codeUnit >> 6) & 0x3F);
                bytes[p++] = 0x80 | (codeUnit & 0x3F);
            }
            else {
                if (i + 1 < n) {
                    var nextCodeUnit = str.charCodeAt(i + 1);
                    if (codeUnit < 0xDC00 && 0xDC00 <= nextCodeUnit && nextCodeUnit <= 0xDFFF) {
                        var rune = (((codeUnit & 0x03FF) << 10) | (nextCodeUnit & 0x03FF)) + 0x010000;
                        bytes[p++] = 0xF0 | (rune >> 18);
                        bytes[p++] = 0x80 | ((rune >> 12) & 0x3F);
                        bytes[p++] = 0x80 | ((rune >> 6) & 0x3F);
                        bytes[p++] = 0x80 | (rune & 0x3F);
                        ++i;
                        continue;
                    }
                }
                throw new Error('Malformed string');
            }
        }
        return p;
    }

    function readShortString(bytes, n) {
        var charCodes = new Array(n);
        var i = 0, off = 0;
        for (var len = bytes.length; i < n && off < len; i++) {
            var unit = bytes[off++];
            switch (unit >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                charCodes[i] = unit;
                break;
            case 12:
            case 13:
                if (off < len) {
                    charCodes[i] = ((unit & 0x1F) << 6) |
                                    (bytes[off++] & 0x3F);
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            case 14:
                if (off + 1 < len) {
                    charCodes[i] = ((unit & 0x0F) << 12) |
                                   ((bytes[off++] & 0x3F) << 6) |
                                   (bytes[off++] & 0x3F);
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            case 15:
                if (off + 2 < len) {
                    var rune = (((unit & 0x07) << 18) |
                                ((bytes[off++] & 0x3F) << 12) |
                                ((bytes[off++] & 0x3F) << 6) |
                                (bytes[off++] & 0x3F)) - 0x10000;
                    if (0 <= rune && rune <= 0xFFFFF) {
                        charCodes[i++] = (((rune >> 10) & 0x03FF) | 0xD800);
                        charCodes[i] = ((rune & 0x03FF) | 0xDC00);
                    }
                    else {
                        throw new Error('Character outside valid Unicode range: 0x' + rune.toString(16));
                    }
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            default:
                throw new Error('Bad UTF-8 encoding 0x' + unit.toString(16));
            }
        }
        if (i < n) {
            charCodes.length = i;
        }
        return [String.fromCharCode.apply(String, charCodes), off];
    }

    function readLongString(bytes, n) {
        var buf = [];
        var charCodes = new Array(0xFFFF);
        var i = 0, off = 0;
        for (var len = bytes.length; i < n && off < len; i++) {
            var unit = bytes[off++];
            switch (unit >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                charCodes[i] = unit;
                break;
            case 12:
            case 13:
                if (off < len) {
                    charCodes[i] = ((unit & 0x1F) << 6) |
                                    (bytes[off++] & 0x3F);
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            case 14:
                if (off + 1 < len) {
                    charCodes[i] = ((unit & 0x0F) << 12) |
                                   ((bytes[off++] & 0x3F) << 6) |
                                   (bytes[off++] & 0x3F);
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            case 15:
                if (off + 2 < len) {
                    var rune = (((unit & 0x07) << 18) |
                                ((bytes[off++] & 0x3F) << 12) |
                                ((bytes[off++] & 0x3F) << 6) |
                                (bytes[off++] & 0x3F)) - 0x10000;
                    if (0 <= rune && rune <= 0xFFFFF) {
                        charCodes[i++] = (((rune >> 10) & 0x03FF) | 0xD800);
                        charCodes[i] = ((rune & 0x03FF) | 0xDC00);
                    }
                    else {
                        throw new Error('Character outside valid Unicode range: 0x' + rune.toString(16));
                    }
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            default:
                throw new Error('Bad UTF-8 encoding 0x' + unit.toString(16));
            }
            if (i >= 65534) {
                var size = i + 1;
                charCodes.length = size;
                buf.push(String.fromCharCode.apply(String, charCodes));
                n -= size;
                i = -1;
            }
        }
        if (i > 0) {
            charCodes.length = i;
            buf.push(String.fromCharCode.apply(String, charCodes));
        }
        return [buf.join(''), off];
    }

    function readString(bytes, n) {
        if (n === undefined || n === null || (n < 0)) { n = bytes.length; }
        if (n === 0) { return ['', 0]; }
        return ((n < 100000) ?
                readShortString(bytes, n) :
                readLongString(bytes, n));
    }

    function readStringAsBytes(bytes, n) {
        if (n === undefined) { n = bytes.length; }
        if (n === 0) { return [_EMPTY_BYTES, 0]; }
        var i = 0, off = 0;
        for (var len = bytes.length; i < n && off < len; i++) {
            var unit = bytes[off++];
            switch (unit >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                break;
            case 12:
            case 13:
                if (off < len) {
                    off++;
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            case 14:
                if (off + 1 < len) {
                    off += 2;
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            case 15:
                if (off + 2 < len) {
                    var rune = (((unit & 0x07) << 18) |
                                ((bytes[off++] & 0x3F) << 12) |
                                ((bytes[off++] & 0x3F) << 6) |
                                (bytes[off++] & 0x3F)) - 0x10000;
                    if (0 <= rune && rune <= 0xFFFFF) {
                        i++;
                    }
                    else {
                        throw new Error('Character outside valid Unicode range: 0x' + rune.toString(16));
                    }
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            default:
                throw new Error('Bad UTF-8 encoding 0x' + unit.toString(16));
            }
        }
        return [bytes.subarray(0, off), off];
    }

    function pow2roundup(x) {
        --x;
        x |= x >> 1;
        x |= x >> 2;
        x |= x >> 4;
        x |= x >> 8;
        x |= x >> 16;
        return x + 1;
    }

    function BytesIO() {
        var a = arguments;
        switch (a.length) {
        case 1:
            switch (a[0].constructor) {
            case Uint8Array:
                this._bytes = a[0];
                this._length = a[0].length;
                break;
            case BytesIO:
                this._bytes = a[0].toBytes();
                this._length = a[0].length;
                break;
            case String:
                this.writeString(a[0]);
                break;
            case Number:
                this._bytes = new Uint8Array(a[0]);
                break;
            default:
                this._bytes = new Uint8Array(a[0]);
                this._length = this._bytes.length;
                break;
            }
            break;
        case 2:
            this._bytes = new Uint8Array(a[0], a[1]);
            this._length = a[1];
            break;
        case 3:
            this._bytes = new Uint8Array(a[0], a[1], a[2]);
            this._length = a[2];
            break;
        }
        this.mark();
    }

    Object.defineProperties(BytesIO.prototype, {
        _bytes: { value: null, writable: true },
        _length: { value: 0, writable: true },
        _wmark: { value: 0, writable: true },
        _off: { value: 0, writable: true },
        _rmark: { value: 0, writable: true },
        _grow: { value: function(n) {
            var bytes = this._bytes;
            var required = this._length + n;
            var size = pow2roundup(required);
            if (bytes) {
                size *= 2;
                if (size > bytes.length) {
                    var buf = new Uint8Array(size);
                    buf.set(bytes);
                    this._bytes = buf;
                }
            }
            else {
                size = Math.max(size, _INIT_SIZE);
                this._bytes = new Uint8Array(size);
            }
        } },
        length: { get: function() { return this._length; } },
        capacity: { get: function() {
            return this._bytes ? this._bytes.length : 0;
        } },
        position: { get: function() { return this._off; } },
        // returns a view of the the internal buffer.
        bytes: { get : function() {
            return (this._bytes === null) ?
                    _EMPTY_BYTES :
                    this._bytes.subarray(0, this._length);
        } },
        buffer: { get : function() {
            if (this._bytes === null) {
                return _EMPTY_BYTES.buffer;
            }
            if (this._bytes.buffer.slice) {
                return this._bytes.buffer.slice(0, this._length);
            }
            var buf = new Uint8Array(this._length);
            buf.set(this._bytes.subarray(0, this._length));
            return buf.buffer;
        } },
        mark: { value: function() {
            this._wmark = this._length;
            this._rmark = this._off;
        } },
        reset: { value: function() {
            this._length = this._wmark;
            this._off = this._rmark;
        } },
        clear: { value: function() {
            this._bytes = null;
            this._length = 0;
            this._wmark = 0;
            this._off = 0;
            this._rmark = 0;
        } },
        writeByte: { value: function(b) {
            this._grow(1);
            this._bytes[this._length++] = b;
        } },
        writeInt32BE: { value: function(i) {
            if ((i === (i | 0)) && (i <= 2147483647)) {
                this._grow(4);
                this._length = writeInt32BE(this._bytes, this._length, i);
                return;
            }
            throw new TypeError('value is out of bounds');
        } },
        writeUInt32BE: { value: function(i) {
            if (((i & 0x7FFFFFFF) + 0x80000000 === i) && (i >= 0)) {
                this._grow(4);
                this._length = writeInt32BE(this._bytes, this._length, i | 0);
                return;
            }
            throw new TypeError('value is out of bounds');
        } },
        writeInt32LE: { value: function(i) {
            if ((i === (i | 0)) && (i <= 2147483647)) {
                this._grow(4);
                this._length = writeInt32LE(this._bytes, this._length, i);
                return;
            }
            throw new TypeError('value is out of bounds');
        } },
        writeUInt32LE: { value: function(i) {
            if (((i & 0x7FFFFFFF) + 0x80000000 === i) && (i >= 0)) {
                this._grow(4);
                this._length = writeInt32LE(this._bytes, this._length, i | 0);
                return;
            }
            throw new TypeError('value is out of bounds');
        } },
        write: { value: function(data) {
            var n = data.byteLength || data.length;
            if (n === 0) { return; }
            this._grow(n);
            var bytes = this._bytes;
            var length = this._length;
            switch (data.constructor) {
            case ArrayBuffer:
                bytes.set(new Uint8Array(data), length);
                break;
            case Uint8Array:
                bytes.set(data, length);
                break;
            case BytesIO:
                bytes.set(data.bytes, length);
                break;
            default:
                for (var i = 0; i < n; i++) {
                    bytes[length + i] = data[i];
                }
                break;
            }
            this._length += n;
        } },
        writeAsciiString: { value: function(str) {
            var n = str.length;
            if (n === 0) { return; }
            this._grow(n);
            var bytes = this._bytes;
            var l = this._length;
            for (var i = 0; i < n; ++i, ++l) {
                bytes[l] = str.charCodeAt(i);
            }
            this._length = l;
        } },
        writeString: { value: function(str) {
            var n = str.length;
            if (n === 0) { return; }
            // A single code unit uses at most 3 bytes.
            // Two code units at most 4.
            this._grow(n * 3);
            this._length = writeString(this._bytes, this._length, str);
        } },
        readByte: { value: function() {
            if (this._off < this._length) {
                return this._bytes[this._off++];
            }
            return -1;
        } },
        readInt32BE: { value: function() {
            var bytes = this._bytes;
            var off = this._off;
            if (off + 3 < this._length) {
                var result = bytes[off++] << 24 |
                             bytes[off++] << 16 |
                             bytes[off++] << 8  |
                             bytes[off++];
                this._off = off;
                return result;
            }
            throw new Error('EOF');
        } },
        readUInt32BE: { value: function() {
            var value = this.readInt32BE();
            if (value < 0) {
                return (value & 0x7FFFFFFF) + 0x80000000;
            }
            return value;
        } },
        readInt32LE: { value: function() {
            var bytes = this._bytes;
            var off = this._off;
            if (off + 3 < this._length) {
                var result = bytes[off++]       |
                             bytes[off++] << 8  |
                             bytes[off++] << 16 |
                             bytes[off++] << 24;
                this._off = off;
                return result;
            }
            throw new Error('EOF');
        } },
        readUInt32LE: { value: function() {
            var value = this.readInt32LE();
            if (value < 0) {
                return (value & 0x7FFFFFFF) + 0x80000000;
            }
            return value;
        } },
        read: { value: function(n) {
            if (this._off + n > this._length) {
                n = this._length - this._off;
            }
            if (n === 0) { return _EMPTY_BYTES; }
            return this._bytes.subarray(this._off, this._off += n);
        } },
        skip: { value: function(n) {
            if (this._off + n > this._length) {
                n = this._length - this._off;
                this._off = this._length;
            }
            else {
                this._off += n;
            }
            return n;
        } },
        // the result is an Uint8Array, and includes tag.
        readBytes: { value: function(tag) {
            var pos = Array.indexOf(this._bytes, tag, this._off);
            var buf;
            if (pos === -1) {
                buf = this._bytes.subarray(this._off, this._length);
                this._off = this._length;
            }
            else {
                buf = this._bytes.subarray(this._off, pos + 1);
                this._off = pos + 1;
            }
            return buf;
        } },
        // the result is a String, and doesn't include tag.
        // but the position is the same as readBytes
        readUntil: { value: function(tag) {
            var pos = Array.indexOf(this._bytes, tag, this._off);
            var str = '';
            if (pos === this._off) {
                this._off++;
            }
            else if (pos === -1) {
                str = readString(this._bytes.subarray(this._off, this._length))[0];
                this._off = this._length;
            }
            else {
                str = readString(this._bytes.subarray(this._off, pos))[0];
                this._off = pos + 1;
            }
            return str;
        } },
        readAsciiString: { value: function(n) {
            if (this._off + n > this._length) {
                n = this._length - this._off;
            }
            if (n === 0) { return ''; }
            return toBinaryString(this._bytes.subarray(this._off, this._off += n));
        } },
        // n is the UTF16 length
        readStringAsBytes: { value: function(n) {
            var r = readStringAsBytes(this._bytes.subarray(this._off, this._length), n);
            this._off += r[1];
            return r[0];
        } },
        // n is the UTF16 length
        readString: { value: function(n) {
            var r = readString(this._bytes.subarray(this._off, this._length), n);
            this._off += r[1];
            return r[0];
        } },
        // returns a view of the the internal buffer and clears `this`.
        takeBytes: { value: function() {
            var buffer = this.bytes;
            this.clear();
            return buffer;
        } },
        // returns a copy of the current contents and leaves `this` intact.
        toBytes: { value: function() {
            return new Uint8Array(this.bytes);
        } },
        toString: { value: function() {
            return readString(this.bytes, this._length)[0];
        } },
        clone: { value: function() {
            return new BytesIO(this.toBytes());
        } },
        trunc: { value: function() {
            this._bytes = this._bytes.subarray(this._off, this._length);
            this._length = this._bytes.length;
            this._off = 0;
            this._wmark = 0;
            this._rmark = 0;
        } }
    });

    function toString(data) {
        /* jshint -W086 */
        if (data.length === 0) { return ''; }
        switch(data.constructor) {
        case String: return data;
        case BytesIO: data = data.bytes;
        case ArrayBuffer: data = new Uint8Array(data);
        case Uint8Array: return readString(data, data.length)[0];
        default: return String.fromCharCode.apply(String, data);
        }
    }

    Object.defineProperty(BytesIO, 'toString', { value: toString });

    global.hprose.BytesIO = BytesIO;

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/
/**********************************************************\
 *                                                        *
 * Tags.js                                                *
 *                                                        *
 * hprose tags enum for HTML5.                            *
 *                                                        *
 * LastModified: Feb 23, 2016                             *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global) {
    'use strict';

    global.hprose.Tags = {
        /* Serialize Tags */
        TagInteger     : 0x69, //  'i'
        TagLong        : 0x6C, //  'l'
        TagDouble      : 0x64, //  'd'
        TagNull        : 0x6E, //  'n'
        TagEmpty       : 0x65, //  'e'
        TagTrue        : 0x74, //  't'
        TagFalse       : 0x66, //  'f'
        TagNaN         : 0x4E, //  'N'
        TagInfinity    : 0x49, //  'I'
        TagDate        : 0x44, //  'D'
        TagTime        : 0x54, //  'T'
        TagUTC         : 0x5A, //  'Z'
        TagBytes       : 0x62, //  'b'
        TagUTF8Char    : 0x75, //  'u'
        TagString      : 0x73, //  's'
        TagGuid        : 0x67, //  'g'
        TagList        : 0x61, //  'a'
        TagMap         : 0x6d, //  'm'
        TagClass       : 0x63, //  'c'
        TagObject      : 0x6F, //  'o'
        TagRef         : 0x72, //  'r'
        /* Serialize Marks */
        TagPos         : 0x2B, //  '+'
        TagNeg         : 0x2D, //  '-'
        TagSemicolon   : 0x3B, //  ','
        TagOpenbrace   : 0x7B, //  '{'
        TagClosebrace  : 0x7D, //  '}'
        TagQuote       : 0x22, //  '"'
        TagPoint       : 0x2E, //  '.'
        /* Protocol Tags */
        TagFunctions   : 0x46, //  'F'
        TagCall        : 0x43, //  'C'
        TagResult      : 0x52, //  'R'
        TagArgument    : 0x41, //  'A'
        TagError       : 0x45, //  'E'
        TagEnd         : 0x7A  //  'z'
    };
})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * ClassManager.js                                        *
 *                                                        *
 * hprose ClassManager for HTML5.                         *
 *                                                        *
 * LastModified: Feb 23, 2016                             *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global) {
    'use strict';

    var WeakMap = global.WeakMap;

    var classCache = Object.create(null);
    var aliasCache = new WeakMap();

    function register(cls, alias) {
        aliasCache.set(cls, alias);
        classCache[alias] = cls;
    }

    function getClassAlias(cls) {
        return aliasCache.get(cls);
    }

    function getClass(alias) {
        return classCache[alias];
    }

    global.hprose.ClassManager = Object.create(null, {
        register: { value: register },
        getClassAlias: { value: getClassAlias },
        getClass: { value: getClass }
    });

    global.hprose.register = register;

    register(Object, 'Object');

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * Writer.js                                              *
 *                                                        *
 * hprose Writer for HTML5.                               *
 *                                                        *
 * LastModified: Mar 2, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global, undefined) {
    'use strict';

    var Map = global.Map;
    var BytesIO = global.hprose.BytesIO;
    var Tags = global.hprose.Tags;
    var ClassManager = global.hprose.ClassManager;

    function getClassName(obj) {
        var cls = obj.constructor;
        var classname = ClassManager.getClassAlias(cls);
        if (classname) { return classname; }
        if (cls.name) {
            classname = cls.name;
        }
        else {
            var ctor = cls.toString();
            classname = ctor.substr(0, ctor.indexOf('(')).replace(/(^\s*function\s*)|(\s*$)/ig, '');
            if (classname === '' || classname === 'Object') {
                return (typeof(obj.getClassName) === 'function') ? obj.getClassName() : 'Object';
            }
        }
        if (classname !== 'Object') {
            ClassManager.register(cls, classname);
        }
        return classname;
    }

    var fakeWriterRefer = Object.create(null, {
        set: { value: function () {} },
        write: { value: function () { return false; } },
        reset: { value: function () {} }
    });

    function RealWriterRefer(stream) {
        Object.defineProperties(this, {
            _stream: { value: stream },
            _ref: { value: new Map(), writable: true }
        });
    }

    Object.defineProperties(RealWriterRefer.prototype, {
        _refcount: { value: 0, writable: true },
        set: { value: function (val) {
            this._ref.set(val, this._refcount++);
        } },
        write: { value: function (val) {
            var index = this._ref.get(val);
            if (index !== undefined) {
                this._stream.writeByte(Tags.TagRef);
                this._stream.writeString('' + index);
                this._stream.writeByte(Tags.TagSemicolon);
                return true;
            }
            return false;
        } },
        reset: { value: function () {
            this._ref = new Map();
            this._refcount = 0;
        } }
    });

    function realWriterRefer(stream) {
        return new RealWriterRefer(stream);
    }

    function Writer(stream, simple) {
        Object.defineProperties(this, {
            stream: { value: stream },
            _classref: { value: Object.create(null), writable: true },
            _fieldsref: { value: [], writable: true },
            _refer: { value: simple ? fakeWriterRefer : realWriterRefer(stream) }
        });
    }

    function serialize(writer, value) {
        var stream = writer.stream;
        if (value === undefined || value === null) {
            stream.writeByte(Tags.TagNull);
            return;
        }
        switch (value.constructor) {
        case Function:
            stream.writeByte(Tags.TagNull);
            return;
        case Number:
            writeNumber(writer, value);
            return;
        case Boolean:
            writeBoolean(writer, value);
            return;
        case String:
            switch (value.length) {
            case 0:
                stream.writeByte(Tags.TagEmpty);
                return;
            case 1:
                stream.writeByte(Tags.TagUTF8Char);
                stream.writeString(value);
                return;
            }
            writer.writeStringWithRef(value);
            return;
        case Date:
            writer.writeDateWithRef(value);
            return;
        case Map:
            writer.writeMapWithRef(value);
            return;
        case ArrayBuffer:
        case Uint8Array:
        case BytesIO:
            writer.writeBytesWithRef(value);
            return;
        case Int8Array:
        case Int16Array:
        case Int32Array:
        case Uint16Array:
        case Uint32Array:
            writeIntListWithRef(writer, value);
            return;
        case Float32Array:
        case Float64Array:
            writeDoubleListWithRef(writer, value);
            return;
        default:
            if (Array.isArray(value)) {
                writer.writeListWithRef(value);
            }
            else {
                var classname = getClassName(value);
                if (classname === 'Object') {
                    writer.writeMapWithRef(value);
                }
                else {
                    writer.writeObjectWithRef(value);
                }
            }
            break;
        }
    }

    function writeNumber(writer, n) {
        var stream = writer.stream;
        n = n.valueOf();
        if (n === (n | 0)) {
            if (0 <= n && n <= 9) {
                stream.writeByte(n + 0x30);
            }
            else {
                stream.writeByte(Tags.TagInteger);
                stream.writeAsciiString('' + n);
                stream.writeByte(Tags.TagSemicolon);
            }
        }
        else if (isNaN(n)) {
            stream.writeByte(Tags.TagNaN);
        }
        else if (isFinite(n)) {
            stream.writeByte(Tags.TagDouble);
            stream.writeAsciiString('' + n);
            stream.writeByte(Tags.TagSemicolon);
        }
        else {
            stream.writeByte(Tags.TagInfinity);
            stream.writeByte((n > 0) ? Tags.TagPos : Tags.TagNeg);
        }
    }

    function writeInteger(writer, n) {
        var stream = writer.stream;
        if (0 <= n && n <= 9) {
            stream.writeByte(n + 0x30);
        }
        else {
            if (n < -2147483648 || n > 2147483647) {
                stream.writeByte(Tags.TagLong);
            }
            else {
                stream.writeByte(Tags.TagInteger);
            }
            stream.writeAsciiString('' + n);
            stream.writeByte(Tags.TagSemicolon);
        }
    }

    function writeDouble(writer, n) {
        var stream = writer.stream;
        if (isNaN(n)) {
            stream.writeByte(Tags.TagNaN);
        }
        else if (isFinite(n)) {
            stream.writeByte(Tags.TagDouble);
            stream.writeAsciiString('' + n);
            stream.writeByte(Tags.TagSemicolon);
        }
        else {
            stream.writeByte(Tags.TagInfinity);
            stream.writeByte((n > 0) ? Tags.TagPos : Tags.TagNeg);
        }
    }

    function writeBoolean(writer, b) {
        writer.stream.writeByte(b.valueOf() ? Tags.TagTrue : Tags.TagFalse);
    }

    function writeUTCDate(writer, date) {
        writer._refer.set(date);
        var stream = writer.stream;
        var year = ('0000' + date.getUTCFullYear()).slice(-4);
        var month = ('00' + (date.getUTCMonth() + 1)).slice(-2);
        var day = ('00' + date.getUTCDate()).slice(-2);
        var hour = ('00' + date.getUTCHours()).slice(-2);
        var minute = ('00' + date.getUTCMinutes()).slice(-2);
        var second = ('00' + date.getUTCSeconds()).slice(-2);
        var millisecond = ('000' + date.getUTCMilliseconds()).slice(-3);
        stream.writeByte(Tags.TagDate);
        stream.writeAsciiString(year + month + day);
        stream.writeByte(Tags.TagTime);
        stream.writeAsciiString(hour + minute + second);
        if (millisecond !== '000') {
            stream.writeByte(Tags.TagPoint);
            stream.writeAsciiString(millisecond);
        }
        stream.writeByte(Tags.TagUTC);
    }

    function writeDate(writer, date) {
        writer._refer.set(date);
        var stream = writer.stream;
        var year = ('0000' + date.getFullYear()).slice(-4);
        var month = ('00' + (date.getMonth() + 1)).slice(-2);
        var day = ('00' + date.getDate()).slice(-2);
        var hour = ('00' + date.getHours()).slice(-2);
        var minute = ('00' + date.getMinutes()).slice(-2);
        var second = ('00' + date.getSeconds()).slice(-2);
        var millisecond = ('000' + date.getMilliseconds()).slice(-3);
        if ((hour === '00') && (minute === '00') &&
            (second === '00') && (millisecond === '000')) {
            stream.writeByte(Tags.TagDate);
            stream.writeAsciiString(year + month + day);
        }
        else if ((year === '1970') && (month === '01') && (day === '01')) {
            stream.writeByte(Tags.TagTime);
            stream.writeAsciiString(hour + minute + second);
            if (millisecond !== '000') {
                stream.writeByte(Tags.TagPoint);
                stream.writeAsciiString(millisecond);
            }
        }
        else {
            stream.writeByte(Tags.TagDate);
            stream.writeAsciiString(year + month + day);
            stream.writeByte(Tags.TagTime);
            stream.writeAsciiString(hour + minute + second);
            if (millisecond !== '000') {
                stream.writeByte(Tags.TagPoint);
                stream.writeAsciiString(millisecond);
            }
        }
        stream.writeByte(Tags.TagSemicolon);
    }

    function writeTime(writer, time) {
        writer._refer.set(time);
        var stream = writer.stream;
        var hour = ('00' + time.getHours()).slice(-2);
        var minute = ('00' + time.getMinutes()).slice(-2);
        var second = ('00' + time.getSeconds()).slice(-2);
        var millisecond = ('000' + time.getMilliseconds()).slice(-3);
        stream.writeByte(Tags.TagTime);
        stream.writeAsciiString(hour + minute + second);
        if (millisecond !== '000') {
            stream.writeByte(Tags.TagPoint);
            stream.writeAsciiString(millisecond);
        }
        stream.writeByte(Tags.TagSemicolon);
    }

    function writeBytes(writer, bytes) {
        writer._refer.set(bytes);
        var stream = writer.stream;
        stream.writeByte(Tags.TagBytes);
        var n = bytes.byteLength || bytes.length;
        if (n > 0) {
            stream.writeAsciiString('' + n);
            stream.writeByte(Tags.TagQuote);
            stream.write(bytes);
        }
        else {
            stream.writeByte(Tags.TagQuote);
        }
        stream.writeByte(Tags.TagQuote);
    }

    function writeString(writer, str) {
        writer._refer.set(str);
        var stream = writer.stream;
        var n = str.length;
        stream.writeByte(Tags.TagString);
        if (n > 0) {
            stream.writeAsciiString('' + n);
            stream.writeByte(Tags.TagQuote);
            stream.writeString(str);
        }
        else {
            stream.writeByte(Tags.TagQuote);
        }
        stream.writeByte(Tags.TagQuote);
    }

    function writeArray(writer, array, writeElem) {
        writer._refer.set(array);
        var stream = writer.stream;
        var n = array.length;
        stream.writeByte(Tags.TagList);
        if (n > 0) {
            stream.writeAsciiString('' + n);
            stream.writeByte(Tags.TagOpenbrace);
            for (var i = 0; i < n; i++) {
                writeElem(writer, array[i]);
            }
        }
        else {
            stream.writeByte(Tags.TagOpenbrace);
        }
        stream.writeByte(Tags.TagClosebrace);
    }

    function writeIntListWithRef(writer, list) {
        if (!writer._refer.write(list)) {
            writeArray(writer, list, writeInteger);
        }
    }

    function writeDoubleListWithRef(writer, list) {
        if (!writer._refer.write(list)) {
            writeArray(writer, list, writeDouble);
        }
    }

    function writeMap(writer, map) {
        writer._refer.set(map);
        var stream = writer.stream;
        var fields = [];
        for (var key in map) {
            if (map.hasOwnProperty(key) &&
                typeof(map[key]) !== 'function') {
                fields[fields.length] = key;
            }
        }
        var n = fields.length;
        stream.writeByte(Tags.TagMap);
        if (n > 0) {
            stream.writeAsciiString('' + n);
            stream.writeByte(Tags.TagOpenbrace);
            for (var i = 0; i < n; i++) {
                serialize(writer, fields[i]);
                serialize(writer, map[fields[i]]);
            }
        }
        else {
            stream.writeByte(Tags.TagOpenbrace);
        }
        stream.writeByte(Tags.TagClosebrace);
    }

    function writeHarmonyMap(writer, map) {
        writer._refer.set(map);
        var stream = writer.stream;
        var n = map.size;
        stream.writeByte(Tags.TagMap);
        if (n > 0) {
            stream.writeAsciiString('' + n);
            stream.writeByte(Tags.TagOpenbrace);
            map.forEach(function(value, key) {
                serialize(writer, key);
                serialize(writer, value);
            });
        }
        else {
            stream.writeByte(Tags.TagOpenbrace);
        }
        stream.writeByte(Tags.TagClosebrace);
    }

    function writeObject(writer, obj) {
        var stream = writer.stream;
        var classname = getClassName(obj);
        var fields, index;
        if (classname in writer._classref) {
            index = writer._classref[classname];
            fields = writer._fieldsref[index];
        }
        else {
            fields = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key) &&
                    typeof(obj[key]) !== 'function') {
                    fields[fields.length] = key.toString();
                }
            }
            index = writeClass(writer, classname, fields);
        }
        stream.writeByte(Tags.TagObject);
        stream.writeAsciiString('' + index);
        stream.writeByte(Tags.TagOpenbrace);
        writer._refer.set(obj);
        var n = fields.length;
        for (var i = 0; i < n; i++) {
            serialize(writer, obj[fields[i]]);
        }
        stream.writeByte(Tags.TagClosebrace);
    }

    function writeClass(writer, classname, fields) {
        var stream = writer.stream;
        var n = fields.length;
        stream.writeByte(Tags.TagClass);
        stream.writeAsciiString('' + classname.length);
        stream.writeByte(Tags.TagQuote);
        stream.writeString(classname);
        stream.writeByte(Tags.TagQuote);
        if (n > 0) {
            stream.writeAsciiString('' + n);
            stream.writeByte(Tags.TagOpenbrace);
            for (var i = 0; i < n; i++) {
                writeString(writer, fields[i]);
            }
        }
        else {
            stream.writeByte(Tags.TagOpenbrace);
        }
        stream.writeByte(Tags.TagClosebrace);
        var index = writer._fieldsref.length;
        writer._classref[classname] = index;
        writer._fieldsref[index] = fields;
        return index;
    }

    Object.defineProperties(Writer.prototype, {
        serialize: { value: function(value) {
            serialize(this, value);
        } },
        writeInteger: { value: function(value) {
            writeInteger(this, value);
        } },
        writeDouble: { value: function(value) {
            writeDouble(this, value);
        } },
        writeBoolean: { value: function(value) {
            writeBoolean(this, value);
        } },
        writeUTCDate: { value: function(value) {
            writeUTCDate(this, value);
        } },
        writeUTCDateWithRef: { value: function(value) {
            if (!this._refer.write(value)) {
                writeUTCDate(this, value);
            }
        } },
        writeDate: { value: function(value) {
            writeDate(this, value);
        } },
        writeDateWithRef: { value: function(value) {
            if (!this._refer.write(value)) {
                writeDate(this, value);
            }
        } },
        writeTime: { value: function(value) {
            writeTime(this, value);
        } },
        writeTimeWithRef: { value: function(value) {
            if (!this._refer.write(value)) {
                writeTime(this, value);
            }
        } },
        writeBytes: { value: function(value) {
            writeBytes(this, value);
        } },
        writeBytesWithRef: { value: function(value) {
            if (!this._refer.write(value)) {
                writeBytes(this, value);
            }
        } },
        writeString: { value: function(value) {
            writeString(this, value);
        } },
        writeStringWithRef: { value: function(value) {
            if (!this._refer.write(value)) {
                writeString(this, value);
            }
        } },
        writeList: { value: function(value) {
            writeArray(this, value, serialize);
        } },
        writeListWithRef: { value: function(value) {
            if (!this._refer.write(value)) {
                writeArray(this, value, serialize);
            }
        } },
        writeMap: { value: function(value) {
            if (value instanceof Map) {
                writeHarmonyMap(this, value);
            }
            else {
                writeMap(this, value);
            }
        } },
        writeMapWithRef: { value: function(value) {
            if (!this._refer.write(value)) {
                if (value instanceof Map) {
                    writeHarmonyMap(this, value);
                }
                else {
                    writeMap(this, value);
                }
            }
        } },
        writeObject: { value: function(value) {
            writeObject(this, value);
        } },
        writeObjectWithRef: { value: function(value) {
            if (!this._refer.write(value)) {
                writeObject(this, value);
            }
        } },
        reset: { value: function() {
            this._classref = Object.create(null);
            this._fieldsref.length = 0;
            this._refer.reset();
        } }
    });

    global.hprose.Writer = Writer;

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * Reader.js                                              *
 *                                                        *
 * hprose Reader for HTML5.                               *
 *                                                        *
 * LastModified: Mar 2, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global, undefined) {
    'use strict';

    var Map = global.Map;
    var BytesIO = global.hprose.BytesIO;
    var Tags = global.hprose.Tags;
    var ClassManager = global.hprose.ClassManager;

    function unexpectedTag(tag, expectTags) {
        if (tag && expectTags) {
            var expectTagStr = '';
            if (typeof(expectTags) === 'number') {
                expectTagStr = String.fromCharCode(expectTags);
            }
            else {
                expectTagStr = String.fromCharCode.apply(String, expectTags);
            }
            throw new Error('Tag "' + expectTagStr + '" expected, but "' + String.fromCharCode(tag) + '" found in stream');
        }
        else if (tag) {
            throw new Error('Unexpected serialize tag "' + String.fromCharCode(tag) + '" in stream');
        }
        else {
            throw new Error('No byte found in stream');
        }
    }

    function readRaw(stream) {
        var ostream = new BytesIO();
        _readRaw(stream, ostream);
        return ostream.bytes;
    }

    function _readRaw(stream, ostream) {
        __readRaw(stream, ostream, stream.readByte());
    }

    function __readRaw(stream, ostream, tag) {
        ostream.writeByte(tag);
        switch (tag) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case Tags.TagNull:
            case Tags.TagEmpty:
            case Tags.TagTrue:
            case Tags.TagFalse:
            case Tags.TagNaN:
                break;
            case Tags.TagInfinity:
                ostream.writeByte(stream.readByte());
                break;
            case Tags.TagInteger:
            case Tags.TagLong:
            case Tags.TagDouble:
            case Tags.TagRef:
                readNumberRaw(stream, ostream);
                break;
            case Tags.TagDate:
            case Tags.TagTime:
                readDateTimeRaw(stream, ostream);
                break;
            case Tags.TagUTF8Char:
                readUTF8CharRaw(stream, ostream);
                break;
            case Tags.TagBytes:
                readBytesRaw(stream, ostream);
                break;
            case Tags.TagString:
                readStringRaw(stream, ostream);
                break;
            case Tags.TagGuid:
                readGuidRaw(stream, ostream);
                break;
            case Tags.TagList:
            case Tags.TagMap:
            case Tags.TagObject:
                readComplexRaw(stream, ostream);
                break;
            case Tags.TagClass:
                readComplexRaw(stream, ostream);
                _readRaw(stream, ostream);
                break;
            case Tags.TagError:
                _readRaw(stream, ostream);
                break;
            default: unexpectedTag(tag);
        }
    }
    function readNumberRaw(stream, ostream) {
        var tag;
        do {
            tag = stream.readByte();
            ostream.writeByte(tag);
        } while (tag !== Tags.TagSemicolon);
    }
    function readDateTimeRaw(stream, ostream) {
        var tag;
        do {
            tag = stream.readByte();
            ostream.writeByte(tag);
        } while (tag !== Tags.TagSemicolon &&
                 tag !== Tags.TagUTC);
    }
    function readUTF8CharRaw(stream, ostream) {
        ostream.writeString(stream.readString(1));
    }
    function readBytesRaw(stream, ostream) {
        var count = 0;
        var tag = 48;
        do {
            count *= 10;
            count += tag - 48;
            tag = stream.readByte();
            ostream.writeByte(tag);
        } while (tag !== Tags.TagQuote);
        ostream.write(stream.read(count + 1));
    }
    function readStringRaw(stream, ostream) {
        var count = 0;
        var tag = 48;
        do {
            count *= 10;
            count += tag - 48;
            tag = stream.readByte();
            ostream.writeByte(tag);
        } while (tag !== Tags.TagQuote);
        ostream.write(stream.readStringAsBytes(count + 1));
    }
    function readGuidRaw(stream, ostream) {
        ostream.write(stream.read(38));
    }
    function readComplexRaw(stream, ostream) {
        var tag;
        do {
            tag = stream.readByte();
            ostream.writeByte(tag);
        } while (tag !== Tags.TagOpenbrace);
        while ((tag = stream.readByte()) !== Tags.TagClosebrace) {
            __readRaw(stream, ostream, tag);
        }
        ostream.writeByte(tag);
    }

    function RawReader(stream) {
        Object.defineProperties(this, {
            stream: { value : stream },
            readRaw: { value: function() { return readRaw(stream); } }
        });
    }

    global.hprose.RawReader = RawReader;

    var fakeReaderRefer = Object.create(null, {
        set: { value: function() {} },
        read: { value: function() { unexpectedTag(Tags.TagRef); } },
        reset: { value: function() {} }
    });

    function RealReaderRefer() {
        Object.defineProperties(this, {
            ref: { value: [] }
        });
    }

    Object.defineProperties(RealReaderRefer.prototype, {
        set: { value: function(val) { this.ref.push(val); } },
        read: { value: function(index) { return this.ref[index]; } },
        reset: { value: function() { this.ref.length = 0; } }
    });

    function realReaderRefer() {
        return new RealReaderRefer();
    }

    function getter(str) {
        var obj = global;
        var names = str.split('.');
        var i;
        for (i = 0; i < names.length; i++) {
            obj = obj[names[i]];
            if (obj === undefined) {
                return null;
            }
        }
        return obj;
    }
    function findClass(cn, poslist, i, c) {
        if (i < poslist.length) {
            var pos = poslist[i];
            cn[pos] = c;
            var cls = findClass(cn, poslist, i + 1, '.');
            if (i + 1 < poslist.length) {
                if (cls === null) {
                    cls = findClass(cn, poslist, i + 1, '_');
                }
            }
            return cls;
        }
        var classname = cn.join('');
        try {
            var cl = getter(classname);
            return ((typeof(cl) === 'function') ? cl : null);
        } catch (e) {
            return null;
        }
    }

    function getClass(classname) {
        var cls = ClassManager.getClass(classname);
        if (cls) { return cls; }
        cls = getter(classname);
        if (typeof(cls) === 'function') {
            ClassManager.register(cls, classname);
            return cls;
        }
        var poslist = [];
        var pos = classname.indexOf('_');
        while (pos >= 0) {
            poslist[poslist.length] = pos;
            pos = classname.indexOf('_', pos + 1);
        }
        if (poslist.length > 0) {
            var cn = classname.split('');
            cls = findClass(cn, poslist, 0, '.');
            if (cls === null) {
                cls = findClass(cn, poslist, 0, '_');
            }
            if (typeof(cls) === 'function') {
                ClassManager.register(cls, classname);
                return cls;
            }
        }
        cls = function () {};
        Object.defineProperty(cls.prototype, 'getClassName', { value: function () {
            return classname;
        }});
        ClassManager.register(cls, classname);
        return cls;
    }


    function readInt(stream, tag) {
        var s = stream.readUntil(tag);
        if (s.length === 0) { return 0; }
        return parseInt(s, 10);
    }
    function unserialize(reader) {
        var stream = reader.stream;
        var tag = stream.readByte();
        switch (tag) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57: return tag - 48;
            case Tags.TagInteger: return readIntegerWithoutTag(stream);
            case Tags.TagLong: return readLongWithoutTag(stream);
            case Tags.TagDouble: return readDoubleWithoutTag(stream);
            case Tags.TagNull: return null;
            case Tags.TagEmpty: return '';
            case Tags.TagTrue: return true;
            case Tags.TagFalse: return false;
            case Tags.TagNaN: return NaN;
            case Tags.TagInfinity: return readInfinityWithoutTag(stream);
            case Tags.TagDate: return readDateWithoutTag(reader);
            case Tags.TagTime: return readTimeWithoutTag(reader);
            case Tags.TagBytes: return readBytesWithoutTag(reader);
            case Tags.TagUTF8Char: return readUTF8CharWithoutTag(reader);
            case Tags.TagString: return readStringWithoutTag(reader);
            case Tags.TagGuid: return readGuidWithoutTag(reader);
            case Tags.TagList: return readListWithoutTag(reader);
            case Tags.TagMap: return reader.useHarmonyMap ? readHarmonyMapWithoutTag(reader) : readMapWithoutTag(reader);
            case Tags.TagClass: readClass(reader); return readObject(reader);
            case Tags.TagObject: return readObjectWithoutTag(reader);
            case Tags.TagRef: return readRef(reader);
            case Tags.TagError: throw new Error(readString(reader));
            default: unexpectedTag(tag);
        }
    }
    function readIntegerWithoutTag(stream) {
        return readInt(stream, Tags.TagSemicolon);
    }
    function readInteger(stream) {
        var tag = stream.readByte();
        switch (tag) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57: return tag - 48;
            case Tags.TagInteger: return readIntegerWithoutTag(stream);
            default: unexpectedTag(tag);
        }
    }
    function readLongWithoutTag(stream) {
        var s = stream.readUntil(Tags.TagSemicolon);
        var l = parseInt(s, 10);
        if (l.toString() === s) { return l; }
        return s;
    }
    function readLong(stream) {
        var tag = stream.readByte();
        switch (tag) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57: return tag - 48;
            case Tags.TagInteger:
            case Tags.TagLong: return readLongWithoutTag(stream);
            default: unexpectedTag(tag);
        }
    }
    function readDoubleWithoutTag(stream) {
        return parseFloat(stream.readUntil(Tags.TagSemicolon));
    }
    function readDouble(stream) {
        var tag = stream.readByte();
        switch (tag) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57: return tag - 48;
            case Tags.TagInteger:
            case Tags.TagLong:
            case Tags.TagDouble: return readDoubleWithoutTag(stream);
            case Tags.TagNaN: return NaN;
            case Tags.TagInfinity: return readInfinityWithoutTag(stream);
            default: unexpectedTag(tag);
        }
    }
    function readInfinityWithoutTag(stream) {
        return ((stream.readByte() === Tags.TagNeg) ? -Infinity : Infinity);
    }
    function readBoolean(stream) {
        var tag = stream.readByte();
        switch (tag) {
            case Tags.TagTrue: return true;
            case Tags.TagFalse: return false;
            default: unexpectedTag(tag);
        }
    }
    function readDateWithoutTag(reader) {
        var stream = reader.stream;
        var year = parseInt(stream.readAsciiString(4), 10);
        var month = parseInt(stream.readAsciiString(2), 10) - 1;
        var day = parseInt(stream.readAsciiString(2), 10);
        var date;
        var tag = stream.readByte();
        if (tag === Tags.TagTime) {
            var hour = parseInt(stream.readAsciiString(2), 10);
            var minute = parseInt(stream.readAsciiString(2), 10);
            var second = parseInt(stream.readAsciiString(2), 10);
            var millisecond = 0;
            tag = stream.readByte();
            if (tag === Tags.TagPoint) {
                millisecond = parseInt(stream.readAsciiString(3), 10);
                tag = stream.readByte();
                if ((tag >= 48) && (tag <= 57)) {
                    stream.skip(2);
                    tag = stream.readByte();
                    if ((tag >= 48) && (tag <= 57)) {
                        stream.skip(2);
                        tag = stream.readByte();
                    }
                }
            }
            if (tag === Tags.TagUTC) {
                date = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
            }
            else {
                date = new Date(year, month, day, hour, minute, second, millisecond);
            }
        }
        else if (tag === Tags.TagUTC) {
            date = new Date(Date.UTC(year, month, day));
        }
        else {
            date = new Date(year, month, day);
        }
        reader.refer.set(date);
        return date;
    }
    function readDate(reader) {
        var tag = reader.stream.readByte();
        switch (tag) {
            case Tags.TagNull: return null;
            case Tags.TagDate: return readDateWithoutTag(reader);
            case Tags.TagRef: return readRef(reader);
            default: unexpectedTag(tag);
        }
    }
    function readTimeWithoutTag(reader) {
        var stream = reader.stream;
        var time;
        var hour = parseInt(stream.readAsciiString(2), 10);
        var minute = parseInt(stream.readAsciiString(2), 10);
        var second = parseInt(stream.readAsciiString(2), 10);
        var millisecond = 0;
        var tag = stream.readByte();
        if (tag === Tags.TagPoint) {
            millisecond = parseInt(stream.readAsciiString(3), 10);
            tag = stream.readByte();
            if ((tag >= 48) && (tag <= 57)) {
                stream.skip(2);
                tag = stream.readByte();
                if ((tag >= 48) && (tag <= 57)) {
                    stream.skip(2);
                    tag = stream.readByte();
                }
            }
        }
        if (tag === Tags.TagUTC) {
            time = new Date(Date.UTC(1970, 0, 1, hour, minute, second, millisecond));
        }
        else {
            time = new Date(1970, 0, 1, hour, minute, second, millisecond);
        }
        reader.refer.set(time);
        return time;
    }
    function readTime(reader) {
        var tag = reader.stream.readByte();
        switch (tag) {
            case Tags.TagNull: return null;
            case Tags.TagTime: return readTimeWithoutTag(reader);
            case Tags.TagRef: return readRef(reader);
            default: unexpectedTag(tag);
        }
    }
    function readBytesWithoutTag(reader) {
        var stream = reader.stream;
        var count = readInt(stream, Tags.TagQuote);
        var bytes = stream.read(count);
        stream.skip(1);
        reader.refer.set(bytes);
        return bytes;
    }
    function readBytes(reader) {
        var tag = reader.stream.readByte();
        switch (tag) {
            case Tags.TagNull: return null;
            case Tags.TagEmpty: return new Uint8Array(0);
            case Tags.TagBytes: return readBytesWithoutTag(reader);
            case Tags.TagRef: return readRef(reader);
            default: unexpectedTag(tag);
        }
    }
    function readUTF8CharWithoutTag(reader) {
        return reader.stream.readString(1);
    }
    function _readString(reader) {
        var stream = reader.stream;
        var s = stream.readString(readInt(stream, Tags.TagQuote));
        stream.skip(1);
        return s;
    }
    function readStringWithoutTag(reader) {
        var s = _readString(reader);
        reader.refer.set(s);
        return s;
    }
    function readString(reader) {
        var tag = reader.stream.readByte();
        switch (tag) {
            case Tags.TagNull: return null;
            case Tags.TagEmpty: return '';
            case Tags.TagUTF8Char: return readUTF8CharWithoutTag(reader);
            case Tags.TagString: return readStringWithoutTag(reader);
            case Tags.TagRef: return readRef(reader);
            default: unexpectedTag(tag);
        }
    }
    function readGuidWithoutTag(reader) {
        var stream = reader.stream;
        stream.skip(1);
        var s = stream.readAsciiString(36);
        stream.skip(1);
        reader.refer.set(s);
        return s;
    }
    function readGuid(reader) {
        var tag = reader.stream.readByte();
        switch (tag) {
            case Tags.TagNull: return null;
            case Tags.TagGuid: return readGuidWithoutTag(reader);
            case Tags.TagRef: return readRef(reader);
            default: unexpectedTag(tag);
        }
    }
    function readListWithoutTag(reader) {
        var stream = reader.stream;
        var list = [];
        reader.refer.set(list);
        var count = readInt(stream, Tags.TagOpenbrace);
        for (var i = 0; i < count; i++) {
            list[i] = unserialize(reader);
        }
        stream.skip(1);
        return list;
    }
    function readList(reader) {
        var tag = reader.stream.readByte();
        switch (tag) {
            case Tags.TagNull: return null;
            case Tags.TagList: return readListWithoutTag(reader);
            case Tags.TagRef: return readRef(reader);
            default: unexpectedTag(tag);
        }
    }
    function readMapWithoutTag(reader) {
        var stream = reader.stream;
        var map = {};
        reader.refer.set(map);
        var count = readInt(stream, Tags.TagOpenbrace);
        for (var i = 0; i < count; i++) {
            var key = unserialize(reader);
            var value = unserialize(reader);
            map[key] = value;
        }
        stream.skip(1);
        return map;
    }
    function readMap(reader) {
        var tag = reader.stream.readByte();
        switch (tag) {
            case Tags.TagNull: return null;
            case Tags.TagMap: return readMapWithoutTag(reader);
            case Tags.TagRef: return readRef(reader);
            default: unexpectedTag(tag);
        }
    }
    function readHarmonyMapWithoutTag(reader) {
        var stream = reader.stream;
        var map = new Map();
        reader.refer.set(map);
        var count = readInt(stream, Tags.TagOpenbrace);
        for (var i = 0; i < count; i++) {
            var key = unserialize(reader);
            var value = unserialize(reader);
            map.set(key, value);
        }
        stream.skip(1);
        return map;
    }
    function readHarmonyMap(reader) {
        var tag = reader.stream.readByte();
        switch (tag) {
            case Tags.TagNull: return null;
            case Tags.TagMap: return readHarmonyMapWithoutTag(reader);
            case Tags.TagRef: return readRef(reader);
            default: unexpectedTag(tag);
        }
    }
    function readObjectWithoutTag(reader) {
        var stream = reader.stream;
        var cls = reader.classref[readInt(stream, Tags.TagOpenbrace)];
        var obj = new cls.classname();
        reader.refer.set(obj);
        for (var i = 0; i < cls.count; i++) {
            obj[cls.fields[i]] = unserialize(reader);
        }
        stream.skip(1);
        return obj;
    }
    function readObject(reader) {
        var tag = reader.stream.readByte();
        switch(tag) {
            case Tags.TagNull: return null;
            case Tags.TagClass: readClass(reader); return readObject(reader);
            case Tags.TagObject: return readObjectWithoutTag(reader);
            case Tags.TagRef: return readRef(reader);
            default: unexpectedTag(tag);
        }
    }
    function readClass(reader) {
        var stream = reader.stream;
        var classname = _readString(reader);
        var count = readInt(stream, Tags.TagOpenbrace);
        var fields = [];
        for (var i = 0; i < count; i++) {
            fields[i] = readString(reader);
        }
        stream.skip(1);
        classname = getClass(classname);
        reader.classref.push({
            classname: classname,
            count: count,
            fields: fields
        });
    }
    function readRef(reader) {
        return reader.refer.read(readInt(reader.stream, Tags.TagSemicolon));
    }

    function Reader(stream, simple, useHarmonyMap) {
        RawReader.call(this, stream);
        this.useHarmonyMap = !!useHarmonyMap;
        Object.defineProperties(this, {
            classref: { value: [] },
            refer: { value: simple ? fakeReaderRefer : realReaderRefer() }
        });
    }

    Reader.prototype = Object.create(RawReader.prototype);
    Reader.prototype.constructor = Reader;

    Object.defineProperties(Reader.prototype, {
        useHarmonyMap: { value: false, writable: true },
        checkTag: { value: function(expectTag, tag) {
            if (tag === undefined) { tag = this.stream.readByte(); }
            if (tag !== expectTag) { unexpectedTag(tag, expectTag); }
        } },
        checkTags: { value: function(expectTags, tag) {
            if (tag === undefined) { tag = this.stream.readByte(); }
            if (expectTags.indexOf(tag) >= 0) { return tag; }
            unexpectedTag(tag, expectTags);
        } },
        unserialize: { value: function() {
            return unserialize(this);
        } },
        readInteger: { value: function() {
            return readInteger(this.stream);
        } },
        readLong: { value: function() {
            return readLong(this.stream);
        } },
        readDouble: { value: function() {
            return readDouble(this.stream);
        } },
        readBoolean: { value: function() {
            return readBoolean(this.stream);
        } },
        readDateWithoutTag: { value: function() {
            return readDateWithoutTag(this);
        } },
        readDate: { value: function() {
            return readDate(this);
        } },
        readTimeWithoutTag: { value: function() {
            return readTimeWithoutTag(this);
        } },
        readTime: { value: function() {
            return readTime(this);
        } },
        readBytesWithoutTag: { value: function() {
            return readBytesWithoutTag(this);
        } },
        readBytes: { value: function() {
            return readBytes(this);
        } },
        readStringWithoutTag: { value: function() {
            return readStringWithoutTag(this);
        } },
        readString: { value: function() {
            return readString(this);
        } },
        readGuidWithoutTag: { value: function() {
            return readGuidWithoutTag(this);
        } },
        readGuid: { value: function() {
            return readGuid(this);
        } },
        readListWithoutTag: { value: function() {
            return readListWithoutTag(this);
        } },
        readList: { value: function() {
            return readList(this);
        } },
        readMapWithoutTag: { value: function() {
            return this.useHarmonyMap ?
                   readHarmonyMapWithoutTag(this) :
                   readMapWithoutTag(this);
        } },
        readMap: { value: function() {
            return this.useHarmonyMap ?
                   readHarmonyMap(this) :
                   readMap(this);
        } },
        readObjectWithoutTag: { value: function() {
            return readObjectWithoutTag(this);
        } },
        readObject: { value: function() {
            return readObject(this);
        } },
        reset: { value: function() {
            this.classref.length = 0;
            this.refer.reset();
        } }
    });

    global.hprose.Reader = Reader;
})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * Formatter.js                                           *
 *                                                        *
 * hprose Formatter for HTML5.                            *
 *                                                        *
 * LastModified: Feb 23, 2016                             *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global) {
    'use strict';

    var BytesIO = global.hprose.BytesIO;
    var Writer = global.hprose.Writer;
    var Reader = global.hprose.Reader;

    function serialize(value, simple) {
        var stream = new BytesIO();
        var writer = new Writer(stream, simple);
        writer.serialize(value);
        return stream;
    }

    function unserialize(stream, simple, useHarmonyMap) {
        if (!(stream instanceof BytesIO)) {
            stream = new BytesIO(stream);
        }
        return new Reader(stream, simple, useHarmonyMap).unserialize();
    }

    global.hprose.Formatter = {
        serialize: function (value, simple) {
            return serialize(value, simple).bytes;
        },
        unserialize: unserialize
    };

    global.hprose.serialize = serialize;

    global.hprose.unserialize = unserialize;

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * ResultMode.js                                          *
 *                                                        *
 * hprose ResultMode for HTML5.                           *
 *                                                        *
 * LastModified: Feb 23, 2016                             *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global) {
    'use strict';

    global.hprose.ResultMode = {
        Normal: 0,
        Serialized: 1,
        Raw: 2,
        RawWithEndTag: 3
    };
    global.hprose.Normal        = global.hprose.ResultMode.Normal;
    global.hprose.Serialized    = global.hprose.ResultMode.Serialized;
    global.hprose.Raw           = global.hprose.ResultMode.Raw;
    global.hprose.RawWithEndTag = global.hprose.ResultMode.RawWithEndTag;

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/
/**********************************************************\
 *                                                        *
 * Client.js                                              *
 *                                                        *
 * hprose client for HTML5.                               *
 *                                                        *
 * LastModified: Apr 1, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global, undefined) {
    'use strict';

    var setImmediate = global.setImmediate;
    var Tags = global.hprose.Tags;
    var ResultMode = global.hprose.ResultMode;
    var BytesIO = global.hprose.BytesIO;
    var Writer = global.hprose.Writer;
    var Reader = global.hprose.Reader;
    var Future = global.hprose.Future;

    var GETFUNCTIONS = new Uint8Array(1);
    GETFUNCTIONS[0] = Tags.TagEnd;

    function noop(){}

    var s_boolean = 'boolean';
    var s_string = 'string';
    var s_number = 'number';
    var s_function = 'function';
    var s_object = 'object';

    function Client(uri, functions, settings) {

        // private members
        var _uri,
            _uris                   = [],
            _index                  = -1,
            _byref                  = false,
            _simple                 = false,
            _timeout                = 30000,
            _retry                  = 10,
            _idempotent             = false,
            _failswitch             = false,
            _lock                   = false,
            _tasks                  = [],
            _useHarmonyMap          = false,
            _onerror                = noop,
            _filters                = [],
            _batch                  = false,
            _batches                = [],
            _ready                  = new Future(),
            _topics                 = Object.create(null),
            _id                     = null,
            _keepAlive              = true,
            _invokeHandler          = invokeHandler,
            _batchInvokeHandler     = batchInvokeHandler,
            _beforeFilterHandler    = beforeFilterHandler,
            _afterFilterHandler     = afterFilterHandler,
            _invokeHandlers         = [],
            _batchInvokeHandlers    = [],
            _beforeFilterHandlers   = [],
            _afterFilterHandlers    = [],

            self = this;

        function outputFilter(request, context) {
            for (var i = 0, n = _filters.length; i < n; i++) {
                request = _filters[i].outputFilter(request, context);
            }
            return request;
        }

        function inputFilter(response, context) {
            for (var i = _filters.length - 1; i >= 0; i--) {
                response = _filters[i].inputFilter(response, context);
            }
            return response;
        }

        function beforeFilterHandler(request, context) {
            request = outputFilter(request, context);
            return _afterFilterHandler(request, context)
            .then(function(response) {
                if (context.oneway) { return; }
                return inputFilter(response, context);
            });
        }

        function afterFilterHandler(request, context) {
             return self.sendAndReceive(request, context);
        }

        function sendAndReceive(request, context, onsuccess, onerror) {
            _beforeFilterHandler(request, context)
            .then(onsuccess, function(e) {
                if (retry(request, context, onsuccess, onerror)) { return; }
                onerror(e);
            });
        }

        function retry(data, context, onsuccess, onerror) {
            if (context.failswitch) {
                if (++_index >= _uris.length) {
                    _index = 0;
                }
                _uri = _uris[_index];
            }
            if (context.idempotent) {
                if (--context.retry >= 0) {
                    var interval = (context.retry >= 10) ? 500 : (10 - context.retry) * 500;
                    global.setTimeout(function() {
                        sendAndReceive(data, context, onsuccess, onerror);
                    }, interval);
                    return true;
                }
            }
            return false;
        }

        function initService(stub) {
            var context = {
                retry: _retry,
                idempotent: true,
                failswitch: true,
                timeout: _timeout,
                client: self,
                userdata: {}
            };
            var onsuccess = function(data) {
                var error = null;
                try {
                    var stream = new BytesIO(data);
                    var reader = new Reader(stream, true);
                    var tag = stream.readByte();
                    switch (tag) {
                        case Tags.TagError:
                            error = new Error(reader.readString());
                            break;
                        case Tags.TagFunctions:
                            var functions = reader.readList();
                            reader.checkTag(Tags.TagEnd);
                            setFunctions(stub, functions);
                            break;
                        default:
                            error = new Error('Wrong Response:\r\n' + BytesIO.toString(data));
                            break;
                    }
                }
                catch (e) {
                    error = e;
                }
                if (error !== null) {
                    _ready.reject(error);
                }
                else {
                    _ready.resolve(stub);
                }
            };
            sendAndReceive(GETFUNCTIONS, context, onsuccess, _ready.reject);
        }

        function setFunction(stub, name) {
            return function() {
                if (_batch) {
                    return _invoke(stub, name, Array.slice(arguments), true);
                }
                else {
                    return Future.all(arguments).then(function(args) {
                        return _invoke(stub, name, args, false);
                    });
                }
            };
        }

        function setMethods(stub, obj, namespace, name, methods) {
            if (obj[name] !== undefined) { return; }
            obj[name] = {};
            if (typeof(methods) === s_string || methods.constructor === Object) {
                methods = [methods];
            }
            if (Array.isArray(methods)) {
                for (var i = 0; i < methods.length; i++) {
                    var m = methods[i];
                    if (typeof(m) === s_string) {
                        obj[name][m] = setFunction(stub, namespace + name + '_' + m);
                    }
                    else {
                        for (var n in m) {
                            setMethods(stub, obj[name], name + '_', n, m[n]);
                        }
                    }
                }
            }
        }

        function setFunctions(stub, functions) {
            for (var i = 0; i < functions.length; i++) {
                var f = functions[i];
                if (typeof(f) === s_string) {
                    if (stub[f] === undefined) {
                        stub[f] = setFunction(stub, f);
                    }
                }
                else {
                    for (var name in f) {
                        setMethods(stub, stub, '', name, f[name]);
                    }
                }
            }
        }

        function copyargs(src, dest) {
            var n = Math.min(src.length, dest.length);
            for (var i = 0; i < n; ++i) { dest[i] = src[i]; }
        }

        function initContext(batch) {
            if (batch) {
                return {
                    mode: ResultMode.Normal,
                    byref: _byref,
                    simple: _simple,
                    onsuccess: undefined,
                    onerror: undefined,
                    useHarmonyMap: _useHarmonyMap,
                    client: self,
                    userdata: {}
                };
            }
            return {
                mode: ResultMode.Normal,
                byref: _byref,
                simple: _simple,
                timeout: _timeout,
                retry: _retry,
                idempotent: _idempotent,
                failswitch: _failswitch,
                oneway: false,
                sync: false,
                onsuccess: undefined,
                onerror: undefined,
                useHarmonyMap: _useHarmonyMap,
                client: self,
                userdata: {}
            };
        }

        function getContext(stub, name, args, batch) {
            var context = initContext(batch);
            if (name in stub) {
                var method = stub[name];
                for (var key in method) {
                    if (key in context) {
                        context[key] = method[key];
                    }
                }
            }
            var i = 0, n = args.length;
            for (; i < n; ++i) {
                if (typeof args[i] === s_function) { break; }
            }
            if (i === n) { return context; }
            var extra = args.splice(i, n - i);
            context.onsuccess = extra[0];
            n = extra.length;
            for (i = 1; i < n; ++i) {
                var arg = extra[i];
                switch (typeof arg) {
                case s_function:
                    context.onerror = arg; break;
                case s_boolean:
                    context.byref = arg; break;
                case s_number:
                    context.mode = arg; break;
                case s_object:
                    for (var k in arg) {
                        if (k in context) {
                            context[k] = arg[k];
                        }
                    }
                    break;
                }
            }
            return context;
        }

        function encode(name, args, context) {
            var stream = new BytesIO();
            stream.writeByte(Tags.TagCall);
            var writer = new Writer(stream, context.simple);
            writer.writeString(name);
            if (args.length > 0 || context.byref) {
                writer.reset();
                writer.writeList(args);
                if (context.byref) {
                    writer.writeBoolean(true);
                }
            }
            return stream;
        }

        function __invoke(name, args, context, batch) {
            if (_lock) {
                return Future.promise(function(resolve, reject) {
                    _tasks.push({
                        batch: batch,
                        name: name,
                        args: args,
                        context: context,
                        resolve: resolve,
                        reject: reject
                    });
                });
            }
            if (batch) {
                return multicall(name, args, context);
            }
            return call(name, args, context);
        }

        function _invoke(stub, name, args, batch) {
            return __invoke(name, args, getContext(stub, name, args, batch), batch);
        }

        function errorHandling(name, error, context, reject) {
            try {
                if (context.onerror) {
                    context.onerror(name, error);
                }
                else {
                    _onerror(name, error);
                }
                reject(error);
            }
            catch (e) {
                reject(e);
            }
        }

        function invokeHandler(name, args, context) {
            var request = encode(name, args, context);
            request.writeByte(Tags.TagEnd);
            return Future.promise(function(resolve, reject) {
                sendAndReceive(request.bytes, context, function(response) {
                    if (context.oneway) {
                        resolve();
                        return;
                    }
                    var result = null;
                    var error = null;
                    try {
                        if (context.mode === ResultMode.RawWithEndTag) {
                            result = response;
                        }
                        else if (context.mode === ResultMode.Raw) {
                            result = response.subarray(0, response.byteLength - 1);
                        }
                        else {
                            var stream = new BytesIO(response);
                            var reader = new Reader(stream, false, context.useHarmonyMap);
                            var tag = stream.readByte();
                            if (tag === Tags.TagResult) {
                                if (context.mode === ResultMode.Serialized) {
                                    result = reader.readRaw();
                                }
                                else {
                                    result = reader.unserialize();
                                }
                                tag = stream.readByte();
                                if (tag === Tags.TagArgument) {
                                    reader.reset();
                                    var _args = reader.readList();
                                    copyargs(_args, args);
                                    tag = stream.readByte();
                                }
                            }
                            else if (tag === Tags.TagError) {
                                error = new Error(reader.readString());
                                tag = stream.readByte();
                            }
                            if (tag !== Tags.TagEnd) {
                                error = new Error('Wrong Response:\r\n' + BytesIO.toString(response));
                            }
                        }
                    }
                    catch (e) {
                        error = e;
                    }
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                }, reject);
            });
        }

        function unlock(sync) {
            return function() {
                if (sync) {
                    _lock = false;
                    setImmediate(function(tasks) {
                        tasks.forEach(function(task) {
                            if ('settings' in task) {
                                endBatch(task.settings)
                                .then(task.resolve, task.reject);
                            }
                            else {
                                __invoke(task.name, task.args, task.context, task.batch).then(task.resolve, task.reject);
                            }
                        });
                    }, _tasks);
                    _tasks = [];
                }
            };
        }

        function call(name, args, context) {
            if (context.sync) { _lock = true; }
            var promise = Future.promise(function(resolve, reject) {
                _invokeHandler(name, args, context).then(function(result) {
                    try {
                        if (context.onsuccess) {
                            try {
                                context.onsuccess(result, args);
                            }
                            catch (e) {
                                if (context.onerror) {
                                    context.onerror(name, e);
                                }
                                reject(e);
                            }
                        }
                        resolve(result);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, function(error) {
                    errorHandling(name, error, context, reject);
                });
            });
            promise.whenComplete(unlock(context.sync));
            return promise;
        }

        function multicall(name, args, context) {
            return Future.promise(function(resolve, reject) {
                _batches.push({
                    args: args,
                    name: name,
                    context: context,
                    resolve: resolve,
                    reject: reject
                });
            });
        }

        function getBatchContext(settings) {
            var context = {
                timeout: _timeout,
                retry: _retry,
                idempotent: _idempotent,
                failswitch: _failswitch,
                oneway: false,
                sync: false,
                client: self,
                userdata: {}
            };
            for (var k in settings) {
                if (k in context) {
                    context[k] = settings[k];
                }
            }
            return context;
        }

        function batchInvokeHandler(batches, context) {
            var request = batches.reduce(function(stream, item) {
                stream.write(encode(item.name, item.args, item.context));
                return stream;
            }, new BytesIO());
            request.writeByte(Tags.TagEnd);
            return Future.promise(function(resolve, reject) {
                sendAndReceive(request.bytes, context, function(response) {
                    if (context.oneway) {
                        resolve(batches);
                        return;
                    }
                    var i = -1;
                    var stream = new BytesIO(response);
                    var reader = new Reader(stream, false);
                    var tag = stream.readByte();
                    try {
                        while (tag !== Tags.TagEnd) {
                            var result = null;
                            var error = null;
                            var mode = batches[++i].context.mode;
                            if (mode >= ResultMode.Raw) {
                                result = new BytesIO();
                            }
                            if (tag === Tags.TagResult) {
                                if (mode === ResultMode.Serialized) {
                                    result = reader.readRaw();
                                }
                                else if (mode >= ResultMode.Raw) {
                                    result.writeByte(Tags.TagResult);
                                    result.write(reader.readRaw());
                                }
                                else {
                                    reader.useHarmonyMap = batches[i].context.useHarmonyMap;
                                    reader.reset();
                                    result = reader.unserialize();
                                }
                                tag = stream.readByte();
                                if (tag === Tags.TagArgument) {
                                    if (mode >= ResultMode.Raw) {
                                        result.writeByte(Tags.TagArgument);
                                        result.write(reader.readRaw());
                                    }
                                    else {
                                        reader.reset();
                                        var _args = reader.readList();
                                        copyargs(_args, batches[i].args);
                                    }
                                    tag = stream.readByte();
                                }
                            }
                            else if (tag === Tags.TagError) {
                                if (mode >= ResultMode.Raw) {
                                    result.writeByte(Tags.TagError);
                                    result.write(reader.readRaw());
                                }
                                else {
                                    reader.reset();
                                    error = new Error(reader.readString());
                                }
                                tag = stream.readByte();
                            }
                            if ([Tags.TagEnd,
                                 Tags.TagResult,
                                 Tags.TagError].indexOf(tag) < 0) {
                                reject(new Error('Wrong Response:\r\n' + BytesIO.toString(response)));
                                return;
                            }
                            if (mode >= ResultMode.Raw) {
                                if (mode === ResultMode.RawWithEndTag) {
                                    result.writeByte(Tags.TagEnd);
                                }
                                batches[i].result = result.bytes;
                            }
                            else {
                                batches[i].result = result;
                            }
                            batches[i].error = error;
                        }
                    }
                    catch (e) {
                        reject(e);
                        return;
                    }
                    resolve(batches);
                }, reject);
            });
        }

        function beginBatch() {
            _batch = true;
        }

        function endBatch(settings) {
            settings = settings || {};
            _batch = false;
            if (_lock) {
                return Future.promise(function(resolve, reject) {
                    _tasks.push({
                        batch: true,
                        settings: settings,
                        resolve: resolve,
                        reject: reject
                    });
                });
            }
            var batchSize = _batches.length;
            if (batchSize === 0) { return Future.value([]); }
            var context = getBatchContext(settings);
            if (context.sync) { _lock = true; }
            var batches = _batches;
            _batches = [];
            var promise = Future.promise(function(resolve, reject) {
                _batchInvokeHandler(batches, context).then(function(batches) {
                    batches.forEach(function(i) {
                        if (i.error) {
                            errorHandling(i.name, i.error, i.context, i.reject);
                        }
                        else {
                            try {
                                if (i.context.onsuccess) {
                                    try {
                                        i.context.onsuccess(i.result, i.args);
                                    }
                                    catch (e) {
                                        if (i.context.onerror) {
                                            i.context.onerror(i.name, e);
                                        }
                                        i.reject(e);
                                    }
                                }
                                i.resolve(i.result);
                            }
                            catch (e) {
                                i.reject(e);
                            }
                        }
                        delete i.context;
                        delete i.resolve;
                        delete i.reject;
                    });
                    resolve(batches);
                }, function(error) {
                    batches.forEach(function(i) {
                        if ('reject' in i) {
                            errorHandling(i.name, error, i.context, i.reject);
                        }
                    });
                    reject(error);
                });
            });
            promise.whenComplete(unlock(context.sync));
            return promise;
        }

        function getOnError() {
            return _onerror;
        }
        function setOnError(value) {
            if (typeof(value) === s_function) {
                _onerror = value;
            }
        }
        function getUri() {
            return _uri;
        }
        function getFailswitch() {
            return _failswitch;
        }
        function setFailswitch(value) {
            _failswitch = !!value;
        }
        function getTimeout() {
            return _timeout;
        }
        function setTimeout(value) {
            if (typeof(value) === 'number') {
                _timeout = value | 0;
            }
            else {
                _timeout = 0;
            }
        }
        function getRetry() {
            return _retry;
        }
        function setRetry(value) {
            if (typeof(value) === 'number') {
                _retry = value | 0;
            }
            else {
                _retry = 0;
            }
        }
        function getIdempotent() {
            return _idempotent;
        }
        function setIdempotent(value) {
            _idempotent = !!value;
        }
        function setKeepAlive(value) {
            _keepAlive = !!value;
        }
        function getKeepAlive() {
            return _keepAlive;
        }
        function getByRef() {
            return _byref;
        }
        function setByRef(value) {
            _byref = !!value;
        }
        function getSimpleMode() {
            return _simple;
        }
        function setSimpleMode(value) {
            _simple = !!value;
        }
        function getUseHarmonyMap() {
            return _useHarmonyMap;
        }
        function setUseHarmonyMap(value) {
            _useHarmonyMap = !!value;
        }
        function getFilter() {
            if (_filters.length === 0) {
                return null;
            }
            if (_filters.length === 1) {
                return _filters[0];
            }
            return _filters.slice();
        }
        function setFilter(filter) {
            _filters.length = 0;
            if (Array.isArray(filter)) {
                filter.forEach(function(filter) {
                    addFilter(filter);
                });
            }
            else {
                addFilter(filter);
            }
        }
        function addFilter(filter) {
            if (filter &&
                typeof filter.inputFilter === 'function' &&
                typeof filter.outputFilter === 'function') {
                _filters.push(filter);
            }
        }
        function removeFilter(filter) {
            var i = _filters.indexOf(filter);
            if (i === -1) {
                return false;
            }
            _filters.splice(i, 1);
            return true;
        }
        function filters() {
            return _filters;
        }
        function useService(uri, functions, create) {
            if (create === undefined) {
                if (typeof(functions) === s_boolean) {
                    create = functions;
                    functions = false;
                }
                if (!functions) {
                    if (typeof(uri) === s_boolean) {
                        create = uri;
                        uri = false;
                    }
                    else if (uri && uri.constructor === Object ||
                             Array.isArray(uri)) {
                        functions = uri;
                        uri = false;
                    }
                }
            }
            var stub = self;
            if (create) {
                stub = {};
            }
            if (!uri && !_uri) {
                return new Error('You should set server uri first!');
            }
            if (uri) {
                _uri = uri;
            }
            if (typeof(functions) === s_string ||
                (functions && functions.constructor === Object)) {
                functions = [functions];
            }
            if (!Array.isArray(functions)) {
                setImmediate(initService, stub);
                return _ready;
            }
            setFunctions(stub, functions);
            _ready.resolve(stub);
            return stub;
        }
        function invoke(name, args, onsuccess/*, onerror, settings*/) {
            var argc = arguments.length;
            if ((argc < 1) || (typeof name !== s_string)) {
                throw new Error('name must be a string');
            }
            if (argc === 1) { args = []; }
            if (argc === 2) {
                if (!Array.isArray(args)) {
                    var _args = [];
                    if (typeof args !== s_function) {
                        _args.push(noop);
                    }
                    _args.push(args);
                    args = _args;
                }
            }
            if (argc > 2) {
                if (typeof onsuccess !== s_function) {
                    args.push(noop);
                }
                for (var i = 2; i < argc; i++) {
                    args.push(arguments[i]);
                }
            }
            return _invoke(self, name, args, _batch);
        }
        function ready(onComplete, onError) {
            return _ready.then(onComplete, onError);
        }
        function getTopic(name, id, create) {
            if (_topics[name]) {
                var topics = _topics[name];
                if (topics[id]) {
                    return topics[id];
                }
                return null;
            }
            if (create) {
                _topics[name] = Object.create(null);
            }
            return null;
        }
        // subscribe(name, callback, timeout)
        // subscribe(name, id, callback, timeout)
        function subscribe(name, id, callback, timeout) {
            if (typeof name !== s_string) {
                throw new TypeError('topic name must be a string.');
            }
            if (id === undefined || id === null) {
                if (typeof callback === s_function) {
                    id = callback;
                }
                else {
                    throw new TypeError('callback must be a function.');
                }
            }
            if (typeof id === s_function) {
                timeout = callback;
                callback = id;
                if (_id === null) {
                    _id = autoId();
                }
                _id.then(function(id) {
                    subscribe(name, id, callback, timeout);
                });
                return;
            }
            if (typeof callback !== s_function) {
                throw new TypeError('callback must be a function.');
            }
            if (Future.isPromise(id)) {
                id.then(function(id) {
                    subscribe(name, id, callback, timeout);
                });
                return;
            }
            if (timeout === undefined) { timeout = _timeout; }
            var topic = getTopic(name, id, true);
            if (topic === null) {
                var cb = function() {
                    _invoke(self, name, [id, topic.handler, cb, {
                        idempotent: true,
                        failswitch: false,
                        timeout: timeout
                    }], false);
                };
                topic = {
                    handler: function(result) {
                        var topic = getTopic(name, id, false);
                        if (topic) {
                            if (result !== null) {
                                var callbacks = topic.callbacks;
                                for (var i = 0, n = callbacks.length; i < n; ++i) {
                                    try {
                                        callbacks[i](result);
                                    }
                                    catch (e) {}
                                }
                            }
                            if (getTopic(name, id, false) !== null) { cb(); }
                        }
                    },
                    callbacks: [callback]
                };
                _topics[name][id] = topic;
                cb();
            }
            else if (topic.callbacks.indexOf(callback) < 0) {
                topic.callbacks.push(callback);
            }
        }
        function delTopic(topics, id, callback) {
            if (topics) {
                if (typeof callback === s_function) {
                    var topic = topics[id];
                    if (topic) {
                        var callbacks = topic.callbacks;
                        var p = callbacks.indexOf(callback);
                        if (p >= 0) {
                            callbacks[p] = callbacks[callbacks.length - 1];
                            callbacks.length--;
                        }
                        if (callbacks.length === 0) {
                            delete topics[id];
                        }
                    }
                }
                else {
                    delete topics[id];
                }
            }
        }
        // unsubscribe(name)
        // unsubscribe(name, callback)
        // unsubscribe(name, id)
        // unsubscribe(name, id, callback)
        function unsubscribe(name, id, callback) {
            if (typeof name !== s_string) {
                throw new TypeError('topic name must be a string.');
            }
            if (id === undefined || id === null) {
                if (typeof callback === s_function) {
                    id = callback;
                }
                else {
                    delete _topics[name];
                    return;
                }
            }
            if (typeof id === s_function) {
                callback = id;
                id = null;
            }
            if (id === null) {
                if (_id === null) {
                    if (_topics[name]) {
                        var topics = _topics[name];
                        for (id in topics) {
                            delTopic(topics, id, callback);
                        }
                    }
                }
                else {
                    _id.then(function(id) {
                        unsubscribe(name, id, callback);
                    });
                }
            }
            else if (Future.isPromise(id)) {
                id.then(function(id) {
                    unsubscribe(name, id, callback);
                });
            }
            else {
                delTopic(_topics[name], id, callback);
            }
        }
        function getId() {
            return _id;
        }
        function autoId() {
            return _invoke(self, '#', [], false);
        }
        autoId.sync = true;
        autoId.idempotent = true;
        autoId.failswitch = true;
        function addInvokeHandler(handler) {
            _invokeHandlers.push(handler);
            _invokeHandler = _invokeHandlers.reduceRight(
            function(next, handler) {
                return function(name, args, context) {
                    try {
                        var result = handler(name, args, context, next);
                        if (Future.isFuture(result)) { return result; }
                        return Future.value(result);
                    }
                    catch (e) {
                        return Future.error(e);
                    }
                };
            }, invokeHandler);
        }
        function addBatchInvokeHandler(handler) {
            _batchInvokeHandlers.push(handler);
            _batchInvokeHandler = _batchInvokeHandlers.reduceRight(
            function(next, handler) {
                return function(batches, context) {
                    try {
                        var result = handler(batches, context, next);
                        if (Future.isFuture(result)) { return result; }
                        return Future.value(result);
                    }
                    catch (e) {
                        return Future.error(e);
                    }
                };
            }, batchInvokeHandler);
        }
        function addBeforeFilterHandler(handler) {
            _beforeFilterHandlers.push(handler);
            _beforeFilterHandler = _beforeFilterHandlers.reduceRight(
            function(next, handler) {
                return function(request, context) {
                    try {
                        var response = handler(request, context, next);
                        if (Future.isFuture(response)) { return response; }
                        return Future.value(response);
                    }
                    catch (e) {
                        return Future.error(e);
                    }
                };
            }, beforeFilterHandler);
        }
        function addAfterFilterHandler(handler) {
            _afterFilterHandlers.push(handler);
            _afterFilterHandler = _afterFilterHandlers.reduceRight(
            function(next, handler) {
                return function(request, context) {
                    try {
                        var response = handler(request, context, next);
                        if (Future.isFuture(response)) { return response; }
                        return Future.value(response);
                    }
                    catch (e) {
                        return Future.error(e);
                    }
                };
            }, afterFilterHandler);
        }
        function use(handler) {
            addInvokeHandler(handler);
            return self;
        }
        var batch = Object.create(null, {
            begin: { value: beginBatch },
            end: { value: endBatch },
            use: { value: function(handler) {
                addBatchInvokeHandler(handler);
                return batch;
            } }
        });
        var beforeFilter = Object.create(null, {
            use: { value: function(handler) {
                addBeforeFilterHandler(handler);
                return beforeFilter;
            } }
        });
        var afterFilter = Object.create(null, {
            use: { value: function(handler) {
                addAfterFilterHandler(handler);
                return afterFilter;
            } }
        });
        Object.defineProperties(this, {
            '#': { value: autoId },
            onerror: { get: getOnError, set: setOnError },
            uri: { get: getUri },
            id: { get: getId },
            failswitch: { get: getFailswitch, set: setFailswitch },
            timeout: { get: getTimeout, set: setTimeout },
            retry: { get: getRetry, set: setRetry },
            idempotent: { get: getIdempotent, set: setIdempotent },
            keepAlive: { get: getKeepAlive, set: setKeepAlive },
            byref: { get: getByRef, set: setByRef },
            simple: { get: getSimpleMode, set: setSimpleMode },
            useHarmonyMap: { get: getUseHarmonyMap, set: setUseHarmonyMap },
            filter: { get: getFilter, set: setFilter },
            addFilter: { value: addFilter },
            removeFilter: { value: removeFilter },
            filters: { get: filters },
            useService: { value: useService },
            invoke: { value: invoke },
            ready: { value: ready },
            subscribe: { value: subscribe },
            unsubscribe: { value: unsubscribe },
            use: { value: use },
            batch: { value: batch },
            beforeFilter: { value: beforeFilter },
            afterFilter: { value: afterFilter }
        });
        /* function constructor */ {
            if ((settings) && (typeof settings === s_object)) {
                ['failswitch', 'timeout', 'retry', 'idempotent',
                 'keepAlive', 'byref', 'simple','useHarmonyMap',
                 'filter'].forEach(function(key) {
                     if (key in settings) {
                         self[key] = settings[key];
                     }
                });
            }
            if (typeof(uri) === s_string) {
                _uris = [uri];
                _index = 0;
                useService(uri, functions);
            }
            else if (Array.isArray(uri)) {
                _uris = uri;
                _index = Math.floor(Math.random() * _uris.length);
                useService(_uris[_index], functions);
            }
        }
    }

    function checkuri(uri) {
        var parser = document.createElement('a');
        parser.href = uri;
        var protocol = parser.protocol;
        if (protocol === 'http:' ||
            protocol === 'https:' ||
            protocol === 'tcp:' ||
            protocol === 'tcp4:'||
            protocol === 'tcp6:' ||
            protocol === 'tcps:' ||
            protocol === 'tcp4s:' ||
            protocol === 'tcp6s:' ||
            protocol === 'tls:' ||
            protocol === 'ws:' ||
            protocol === 'wss:') {
            return;
        }
        throw new Error('The ' + protocol + ' client isn\'t implemented.');
    }

    function create(uri, functions, settings) {
        try {
            return global.hprose.HttpClient.create(uri, functions, settings);
        }
        catch(e) {}
        try {
            return global.hprose.TcpClient.create(uri, functions, settings);
        }
        catch(e) {}
        try {
            return global.hprose.WebSocketClient.create(uri, functions, settings);
        }
        catch(e) {}
        if (typeof uri === 'string') {
            checkuri(uri);
        }
        else if (Array.isArray(uri)) {
            uri.forEach(function(uri) { checkuri(uri); });
            throw new Error('Not support multiple protocol.');
        }
        throw new Error('You should set server uri first!');
    }

    Object.defineProperty(Client, 'create', { value: create });

    global.hprose.Client = Client;

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/
/**********************************************************\
 *                                                        *
 * HttpClient.js                                          *
 *                                                        *
 * hprose http client for HTML5.                          *
 *                                                        *
 * LastModified: Feb 28, 2016                             *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global, undefined) {
    'use strict';

    var Client = global.hprose.Client;
    var Future = global.hprose.Future;
    var BytesIO = global.hprose.BytesIO;
    var TimeoutError = global.TimeoutError;

    function noop(){}

    function HttpClient(uri, functions, settings) {
        if (this.constructor !== HttpClient) {
            return new HttpClient(uri, functions, settings);
        }
        Client.call(this, uri, functions, settings);
        var _header = Object.create(null);
        var _onreqprogress = noop;
        var _onresprogress = noop;

        var self = this;

        function xhrPost(request, env) {
            var future = new Future();
            var xhr = new XMLHttpRequest();
            xhr.open('POST', self.uri, true);
            if (global.location !== undefined && global.location.protocol !== 'file:') {
                xhr.withCredentials = 'true';
            }
            xhr.responseType = 'arraybuffer';
            for (var name in _header) {
                xhr.setRequestHeader(name, _header[name]);
            }
            xhr.onload = function() {
                xhr.onload = noop;
                if (xhr.status) {
                    if (xhr.status === 200) {
                        future.resolve(new Uint8Array(xhr.response));
                    }
                    else {
                        future.reject(new Error(xhr.status + ':' + xhr.statusText));
                    }
                }
            };
            xhr.onerror = function() {
                future.reject(new Error('error'));
            };
            if (xhr.upload !== undefined) {
                xhr.upload.onprogress = _onreqprogress;
            }
            xhr.onprogress = _onresprogress;
            if (env.timeout > 0) {
                future = future.timeout(env.timeout).catchError(function(e) {
                    xhr.onload = noop;
                    xhr.onerror = noop;
                    xhr.abort();
                    throw e;
                },
                function(e) {
                    return e instanceof TimeoutError;
                });
            }
            if (request.constructor === String || ArrayBuffer.isView) {
                xhr.send(request);
            }
            else if (request.buffer.slice) {
                xhr.send(request.buffer.slice(0, request.length));
            }
            else {
                var buf = new Uint8Array(request.length);
                buf.set(request);
                xhr.send(buf.buffer);
            }
            return future;
        }

        function apiPost(request, env) {
            var future = new Future();
            global.api.ajax({
                url: self.uri(),
                method: 'post',
                data: { body: BytesIO.toString(request) },
                timeout: env.timeout,
                dataType: 'text',
                headers: _header,
                certificate: self.certificate
            }, function(ret, err) {
                if (ret) {
                    future.resolve((new BytesIO(ret)).takeBytes());
                }
                else {
                    future.reject(new Error(err.msg));
                }
            });
            return future;
        }

        function sendAndReceive(request, env) {
            var apicloud = (typeof(global.api) !== "undefined" &&
                           typeof(global.api.ajax) !== "undefined");
            var future = apicloud ? apiPost(request, env) :
                                    xhrPost(request, env);
            if (env.oneway) { future.resolve(); }
            return future;
        }

        function setOnRequestProgress(value) {
            if (typeof(value) === 'function') {
                _onreqprogress = value;
            }
        }
        function getOnRequestProgress() {
            return _onreqprogress;
        }
        function setOnResponseProgress(value) {
            if (typeof(value) === 'function') {
                _onresprogress = value;
            }
        }
        function getOnResponseProgress() {
            return _onresprogress;
        }
        function setHeader(name, value) {
            if (name.toLowerCase() !== 'content-type' &&
                name.toLowerCase() !== 'content-length') {
                if (value) {
                    _header[name] = value;
                }
                else {
                    delete _header[name];
                }
            }
        }
        Object.defineProperties(this, {
            onprogress: { get: getOnRequestProgress, set: setOnRequestProgress },
            onRequestProgress: { get: getOnRequestProgress, set: setOnRequestProgress },
            onResponseProgress: { get: getOnResponseProgress, set: setOnResponseProgress },
            setHeader: { value: setHeader },
            sendAndReceive: { value: sendAndReceive }
        });
    }

    function checkuri(uri) {
        var parser = document.createElement('a');
        parser.href = uri;
        if (parser.protocol === 'http:' ||
            parser.protocol === 'https:') {
            return;
        }
        throw new Error('This client desn\'t support ' + parser.protocol + ' scheme.');
    }

    function create(uri, functions, settings) {
        if (typeof uri === 'string') {
            checkuri(uri);
        }
        else if (Array.isArray(uri)) {
            uri.forEach(function(uri) { checkuri(uri); });
        }
        else {
            throw new Error('You should set server uri first!');
        }
        return new HttpClient(uri, functions, settings);
    }

    Object.defineProperty(HttpClient, 'create', { value: create });

    global.hprose.HttpClient = HttpClient;

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/
/**********************************************************\
 *                                                        *
 * WebSocketClient.js                                     *
 *                                                        *
 * hprose websocket client for HTML5.                     *
 *                                                        *
 * LastModified: Mar 2, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global, undefined) {
    'use strict';

    var BytesIO = global.hprose.BytesIO;
    var Client = global.hprose.Client;
    var Future = global.hprose.Future;
    var TimeoutError = global.TimeoutError;

    var WebSocket = global.WebSocket || global.MozWebSocket;

    function noop(){}
    function WebSocketClient(uri, functions, settings) {
        if (typeof(WebSocket) === "undefined") {
            throw new Error('WebSocket is not supported by this browser.');
        }
        if (this.constructor !== WebSocketClient) {
            return new WebSocketClient(uri, functions, settings);
        }

        Client.call(this, uri, functions, settings);

        var _id = 0;
        var _count = 0;
        var _futures = [];
        var _requests = [];
        var _ready = null;
        var ws = null;

        var self = this;

        function getNextId() {
            return (_id < 0x7fffffff) ? ++_id : _id = 0;
        }
        function send(id, request) {
            var bytes = new BytesIO();
            bytes.writeInt32BE(id);
            if (request.constructor === String) {
                bytes.writeString(request);
            }
            else {
                bytes.write(request);
            }
            var message = bytes.bytes;
            if (ArrayBuffer.isView) {
                ws.send(message);
            }
            else if (message.buffer.slice) {
                ws.send(message.buffer.slice(0, message.length));
            }
            else {
                ws.send(message.buffer);
            }
        }
        function onopen(e) {
            _ready.resolve(e);
        }
        function onmessage(e) {
            var bytes = new BytesIO(e.data);
            var id = bytes.readInt32BE();
            var future = _futures[id];
            delete _futures[id];
            if (future !== undefined) {
                --_count;
                future.resolve(bytes.read(bytes.length - 4));
            }
            if ((_count < 100) && (_requests.length > 0)) {
                ++_count;
                var request = _requests.shift();
                _ready.then(function() { send(request[0], request[1]); });
            }
            if (_count === 0 && !self.keepAlive) {
                close();
            }
        }
        function onclose(e) {
            _futures.forEach(function(future, id) {
                future.reject(new Error(e.code + ':' + e.reason));
                delete _futures[id];
            });
            _count = 0;
            ws = null;
        }
        function connect() {
            _ready = new Future();
            ws = new WebSocket(self.uri);
            ws.binaryType = 'arraybuffer';
            ws.onopen = onopen;
            ws.onmessage = onmessage;
            ws.onerror = noop;
            ws.onclose = onclose;
        }
        function sendAndReceive(request, env) {
            if (ws === null ||
                ws.readyState === WebSocket.CLOSING ||
                ws.readyState === WebSocket.CLOSED) {
                connect();
            }
            var id = getNextId();
            var future = new Future();
            _futures[id] = future;
            if (env.timeout > 0) {
                future = future.timeout(env.timeout).catchError(function(e) {
                    delete _futures[id];
                    --_count;
                    throw e;
                },
                function(e) {
                    return e instanceof TimeoutError;
                });
            }
            if (_count < 100) {
                ++_count;
                _ready.then(function() { send(id, request); });
            }
            else {
                _requests.push([id, request]);
            }
            if (env.oneway) { future.resolve(); }
            return future;
        }
        function close() {
            if (ws !== null) {
                ws.onopen = noop;
                ws.onmessage = noop;
                ws.onclose = noop;
                ws.close();
            }
        }

        Object.defineProperties(this, {
            sendAndReceive: { value: sendAndReceive },
            close: { value: close }
        });
    }

    function checkuri(uri) {
        var parser = document.createElement('a');
        parser.href = uri;
        if (parser.protocol === 'ws:' ||
            parser.protocol === 'wss:') {
            return;
        }
        throw new Error('This client desn\'t support ' + parser.protocol + ' scheme.');
    }

    function create(uri, functions, settings) {
        if (typeof uri === 'string') {
            checkuri(uri);
        }
        else if (Array.isArray(uri)) {
            uri.forEach(function(uri) { checkuri(uri); });
        }
        else {
            throw new Error('You should set server uri first!');
        }
        return new WebSocketClient(uri, functions, settings);
    }

    Object.defineProperty(WebSocketClient, 'create', { value: create });

    global.hprose.WebSocketClient = WebSocketClient;

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/
/**********************************************************\
 *                                                        *
 * ChromeTcpSocket.js                                     *
 *                                                        *
 * chrome tcp socket for JavaScript.                      *
 *                                                        *
 * LastModified: Mar 2, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global, undefined) {
    'use strict';

    var Future = global.hprose.Future;

    function noop(){}

    var socketPool = {};
    var socketManager = null;

    function receiveListener(info) {
        var socket = socketPool[info.socketId];
        socket.onreceive(info.data);
    }

    function receiveErrorListener(info) {
        var socket = socketPool[info.socketId];
        socket.onerror(info.resultCode);
        socket.destroy();
    }

    function ChromeTcpSocket() {
        if (socketManager === null) {
            socketManager = global.chrome.sockets.tcp;
            socketManager.onReceive.addListener(receiveListener);
            socketManager.onReceiveError.addListener(receiveErrorListener);
        }
        this.socketId = new Future();
        this.connected = false;
        this.timeid = undefined;
        this.onclose = noop;
        this.onconnect = noop;
        this.onreceive = noop;
        this.onerror = noop;
    }

    Object.defineProperties(ChromeTcpSocket.prototype, {
        connect: { value: function(address, port, options) {
            var self = this;
            socketManager.create({ persistent: options && options.persistent }, function(createInfo) {
                if (options) {
                    if ('noDelay' in options) {
                        socketManager.setNoDelay(createInfo.socketId, options.noDelay, function(result) {
                            if (result < 0) {
                                self.socketId.reject(result);
                                socketManager.disconnect(createInfo.socketId);
                                socketManager.close(createInfo.socketId);
                                self.onclose();
                            }
                        });
                    }
                    if ('keepAlive' in options) {
                        socketManager.setKeepAlive(createInfo.socketId, options.keepAlive, function(result) {
                            if (result < 0) {
                                self.socketId.reject(result);
                                socketManager.disconnect(createInfo.socketId);
                                socketManager.close(createInfo.socketId);
                                self.onclose();
                            }
                        });
                    }
                }
                if (options && options.tls) {
                    socketManager.setPaused(createInfo.socketId, true, function() {
                        socketManager.connect(createInfo.socketId, address, port, function(result) {
                            if (result < 0) {
                                self.socketId.reject(result);
                                socketManager.disconnect(createInfo.socketId);
                                socketManager.close(createInfo.socketId);
                                self.onclose();
                            }
                            else {
                                socketManager.secure(createInfo.socketId, function(secureResult) {
                                    if (secureResult !== 0) {
                                        self.socketId.reject(result);
                                        socketManager.disconnect(createInfo.socketId);
                                        socketManager.close(createInfo.socketId);
                                        self.onclose();
                                    }
                                    else {
                                        socketManager.setPaused(createInfo.socketId, false, function() {
                                            self.socketId.resolve(createInfo.socketId);
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
                else {
                    socketManager.connect(createInfo.socketId, address, port, function(result) {
                        if (result < 0) {
                            self.socketId.reject(result);
                            socketManager.disconnect(createInfo.socketId);
                            socketManager.close(createInfo.socketId);
                            self.onclose();
                        }
                        else {
                            self.socketId.resolve(createInfo.socketId);
                        }
                    });
                }
            });
            this.socketId.then(function(socketId) {
                socketPool[socketId] = self;
                self.connected = true;
                self.onconnect(socketId);
            }, function(reason) {
                self.onerror(reason);
            });
        } },
        send: { value: function(data) {
            var self = this;
            var promise = new Future();
            this.socketId.then(function(socketId) {
                socketManager.send(socketId, data, function(sendInfo) {
                    if (sendInfo.resultCode < 0) {
                        self.onerror(sendInfo.resultCode);
                        promise.reject(sendInfo.resultCode);
                        self.destroy();
                    }
                    else {
                        promise.resolve(sendInfo.bytesSent);
                    }
                });
            });
            return promise;
        } },
        destroy: { value: function() {
            var self = this;
            this.connected = false;
            this.socketId.then(function(socketId) {
                socketManager.disconnect(socketId);
                socketManager.close(socketId);
                delete socketPool[socketId];
                self.onclose();
            });
        } },
        ref: { value: function() {
            this.socketId.then(function(socketId) {
                socketManager.setPaused(socketId, false);
            });
        } },
        unref: { value: function() {
            this.socketId.then(function(socketId) {
                socketManager.setPaused(socketId, true);
            });
        } },
        clearTimeout: { value: function() {
            if (this.timeid !== undefined) {
                global.clearTimeout(this.timeid);
            }
        } },
        setTimeout: { value: function(timeout, fn) {
            this.clearTimeout();
            this.timeid = global.setTimeout(fn, timeout);
        } }
    });

    global.hprose.ChromeTcpSocket = ChromeTcpSocket;

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/
/**********************************************************\
 *                                                        *
 * APICloudTcpSocket.js                                   *
 *                                                        *
 * APICloud tcp socket for HTML5.                         *
 *                                                        *
 * LastModified: Mar 8, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global, undefined) {
    'use strict';

    var Future = global.hprose.Future;
    var atob = global.atob;
    var btoa = global.btoa;
    var toUint8Array = global.hprose.toUint8Array;
    var toBinaryString = global.hprose.toBinaryString;

    function noop(){}

    var socketPool = {};
    var socketManager = null;

    function APICloudTcpSocket() {
        if (socketManager === null) {
            socketManager = global.api.require('socketManager');
        }
        this.socketId = new Future();
        this.connected = false;
        this.timeid = undefined;
        this.onclose = noop;
        this.onconnect = noop;
        this.onreceive = noop;
        this.onerror = noop;
    }

    Object.defineProperties(APICloudTcpSocket.prototype, {
        connect: { value: function(address, port, options) {
            var self = this;
            socketManager.createSocket({
                type: 'tcp',
                host: address,
                port: port,
                timeout: options.timeout,
                returnBase64: true
            },
            function(ret/*, err*/) {
                if (ret) {
                    switch(ret.state) {
                        case 101: break;
                        case 102: self.socketId.resolve(ret.sid); break;
                        case 103: self.onreceive(toUint8Array(atob(ret.data.replace(/\s+/g, '')))); break;
                        case 201: self.socketId.reject(new Error('Create TCP socket failed')); break;
                        case 202: self.socketId.reject(new Error('TCP connection failed')); break;
                        case 203: self.onclose(); self.onerror(new Error('Abnormal disconnect connection')); break;
                        case 204: self.onclose(); break;
                        case 205: self.onclose(); self.onerror(new Error('Unknown error')); break;
                    }
                }
            });
            this.socketId.then(function(socketId) {
                socketPool[socketId] = self;
                self.connected = true;
                self.onconnect(socketId);
            }, function(reason) {
                self.onerror(reason);
            });
        } },
        send: { value: function(data) {
            var self = this;
            var promise = new Future();
            this.socketId.then(function(socketId) {
                socketManager.write({
                    sid: socketId,
                    data: btoa(toBinaryString(data)),
                    base64: true
                },
                function(ret, err) {
                    if (ret.status) {
                        promise.resolve();
                    }
                    else {
                        self.onerror(new Error(err.msg));
                        promise.reject(err.msg);
                        self.destroy();
                    }
                });
            });
            return promise;
        } },
        destroy: { value: function() {
            var self = this;
            this.connected = false;
            this.socketId.then(function(socketId) {
                socketManager.closeSocket({
                    sid: socketId
                },
                function(ret, err) {
                    if (!ret.status) {
                        self.onerror(new Error(err.msg));
                    }
                });
                delete socketPool[socketId];
                //self.onclose();
            });
        } },
        ref: { value: noop },
        unref: { value: noop },
        clearTimeout: { value: function() {
            if (this.timeid !== undefined) {
                global.clearTimeout(this.timeid);
            }
        } },
        setTimeout: { value: function(timeout, fn) {
            this.clearTimeout();
            this.timeid = global.setTimeout(fn, timeout);
        } }
    });

    global.hprose.APICloudTcpSocket = APICloudTcpSocket;

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/
/**********************************************************\
 *                                                        *
 * TcpClient.js                                           *
 *                                                        *
 * hprose tcp client for HTML5.                           *
 *                                                        *
 * LastModified: Mar 2, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global, undefined) {
    'use strict';

    var ChromeTcpSocket = global.hprose.ChromeTcpSocket;
    var APICloudTcpSocket = global.hprose.APICloudTcpSocket;
    var Client = global.hprose.Client;
    var BytesIO = global.hprose.BytesIO;
    var Future = global.hprose.Future;
    var TimeoutError = global.TimeoutError;

    function noop(){}

    function setReceiveHandler(socket, onreceive) {
        socket.onreceive = function(data) {
            if (!('receiveEntry' in socket)) {
                socket.receiveEntry = {
                    stream: new BytesIO(),
                    headerLength: 4,
                    dataLength: -1,
                    id: null
                };
            }
            var entry = socket.receiveEntry;
            var stream = entry.stream;
            var headerLength = entry.headerLength;
            var dataLength = entry.dataLength;
            var id = entry.id;
            stream.write(data);
            while (true) {
                if ((dataLength < 0) && (stream.length >= headerLength)) {
                    dataLength = stream.readInt32BE();
                    if ((dataLength & 0x80000000) !== 0) {
                        dataLength &= 0x7fffffff;
                        headerLength = 8;
                    }
                }
                if ((headerLength === 8) && (id === null) && (stream.length >= headerLength)) {
                    id = stream.readInt32BE();
                }
                if ((dataLength >= 0) && ((stream.length - headerLength) >= dataLength)) {
                    onreceive(stream.read(dataLength), id);
                    headerLength = 4;
                    id = null;
                    stream.trunc();
                    dataLength = -1;
                }
                else {
                    break;
                }
            }
            entry.stream = stream;
            entry.headerLength = headerLength;
            entry.dataLength = dataLength;
            entry.id = id;
        };
    }

    function TcpTransporter(client) {
        if (client) {
            this.client = client;
            this.uri = this.client.uri;
            this.size = 0;
            this.pool = [];
            this.requests = [];
        }
    }

    Object.defineProperties(TcpTransporter.prototype, {
        create: { value: function() {
            var parser = document.createElement('a');
            parser.href = this.uri;
            var protocol = parser.protocol;
            // HTMLAnchorElement can't parse TCP protocol
            // replace to HTTP can be correctly resolved.
            parser.protocol = "http:";
            var address = parser.hostname;
            var port = parseInt(parser.port, 10);
            var tls;
            if (protocol === 'tcp:' ||
                protocol === 'tcp4:' ||
                protocol === 'tcp6:') {
                tls = false;
            }
            else if (protocol === 'tcps:' ||
                protocol === 'tcp4s:' ||
                protocol === 'tcp6s:' ||
                protocol === 'tls:') {
                tls = true;
            }
            else {
                throw new Error('Unsupported ' + protocol + ' protocol!');
            }
            var conn;
            if (global.chrome && global.chrome.sockets && global.chrome.sockets.tcp) {
                conn = new ChromeTcpSocket();
            }
            else if (global.api && global.api.require) {
                conn = new APICloudTcpSocket();
            }
            else {
                throw new Error('TCP Socket is not supported by this browser or platform.');
            }
            var self = this;
            conn.connect(address, port, {
                persistent: true,
                tls: tls,
                timeout: this.client.timeout,
                noDelay: this.client.noDelay,
                keepAlive: this.client.keepAlive
            });
            conn.onclose = function() { --self.size; };
            ++this.size;
            return conn;
        } }
    });

    function FullDuplexTcpTransporter(client) {
        TcpTransporter.call(this, client);
    }

    FullDuplexTcpTransporter.prototype = Object.create(
        TcpTransporter.prototype, {
        fetch: { value: function() {
            var pool = this.pool;
            while (pool.length > 0) {
                var conn = pool.shift();
                if (conn.connected) {
                    if (conn.count === 0) {
                        conn.clearTimeout();
                        conn.ref();
                    }
                    return conn;
                }
            }
            return null;
        } },
        init: { value: function(conn) {
            var self = this;
            conn.count = 0;
            conn.futures = {};
            conn.timeoutIds = {};
            setReceiveHandler(conn, function(data, id) {
                var future = conn.futures[id];
                if (future) {
                    self.clean(conn, id);
                    if (conn.count === 0) {
                        self.recycle(conn);
                    }
                    future.resolve(data);
                }
            });
            conn.onerror = function (e) {
                var futures = conn.futures;
                for (var id in futures) {
                    var future = futures[id];
                    self.clean(conn, id);
                    future.reject(e);
                }
            };
        } },
        recycle: { value: function(conn) {
            conn.unref();
            conn.setTimeout(this.client.poolTimeout, function() {
                 conn.destroy();
            });
        } },
        clean: { value: function(conn, id) {
            if (conn.timeoutIds[id] !== undefined) {
                global.clearTimeout(conn.timeoutIds[id]);
                delete conn.timeoutIds[id];
            }
            delete conn.futures[id];
            --conn.count;
            this.sendNext(conn);
        } },
        sendNext: { value: function(conn) {
            if (conn.count < 10) {
                if (this.requests.length > 0) {
                    var request = this.requests.shift();
                    request.push(conn);
                    this.send.apply(this, request);
                }
                else {
                    this.pool.push(conn);
                }
            }
        } },
        send: { value: function(request, future, id, env, conn) {
            var self = this;
            var timeout = env.timeout;
            if (timeout > 0) {
                conn.timeoutIds[id] = global.setTimeout(function() {
                    self.clean(conn, id);
                    if (conn.count === 0) {
                        self.recycle(conn);
                    }
                    future.reject(new TimeoutError('timeout'));
                }, timeout);
            }
            conn.count++;
            conn.futures[id] = future;

            var len = request.length;
            var buf = new BytesIO(8 + len);
            buf.writeInt32BE(len | 0x80000000);
            buf.writeInt32BE(id);
            buf.write(request);
            conn.send(buf.buffer).then(function() {
                self.sendNext(conn);
            });
        } },
        getNextId: { value: function() {
            return (this.nextid < 0x7fffffff) ? ++this.nextid : this.nextid = 0;
        } },
        sendAndReceive: { value: function(request, future, env) {
            var conn = this.fetch();
            var id = this.getNextId();
            if (conn) {
                this.send(request, future, id, env, conn);
            }
            else if (this.size < this.client.maxPoolSize) {
                conn = this.create();
                conn.onerror = function(e) {
                    future.reject(e);
                };
                var self = this;
                conn.onconnect = function() {
                    self.init(conn);
                    self.send(request, future, id, env, conn);
                };
            }
            else {
                this.requests.push([request, future, id, env]);
            }
        } }
    });

    FullDuplexTcpTransporter.prototype.constructor = TcpTransporter;

    function HalfDuplexTcpTransporter(client) {
        TcpTransporter.call(this, client);
    }

    HalfDuplexTcpTransporter.prototype = Object.create(
        TcpTransporter.prototype, {
        fetch: { value: function() {
            var pool = this.pool;
            while (pool.length > 0) {
                var conn = pool.shift();
                if (conn.connected) {
                    conn.clearTimeout();
                    conn.ref();
                    return conn;
                }
            }
            return null;
        } },
        recycle: { value: function(conn) {
            conn.unref();
            conn.setTimeout(this.client.poolTimeout, function() {
                 conn.destroy();
            });
            this.pool.push(conn);
        } },
        clean: { value: function(conn) {
            conn.onreceive = noop;
            conn.onerror = noop;
            if (conn.timeoutId !== undefined) {
                global.clearTimeout(conn.timeoutId);
                delete conn.timeoutId;
            }
        } },
        sendNext: { value: function(conn) {
            if (this.requests.length > 0) {
                var request = this.requests.shift();
                request.push(conn);
                this.send.apply(this, request);
            }
            else {
                this.recycle(conn);
            }
        } },
        send: { value: function(request, future, env, conn) {
            var self = this;
            var timeout = env.timeout;
            if (timeout > 0) {
                conn.timeoutId = global.setTimeout(function() {
                    self.clean(conn);
                    self.recycle(conn);
                    future.reject(new TimeoutError('timeout'));
                }, timeout);
            }
            setReceiveHandler(conn, function(data) {
                self.clean(conn);
                self.sendNext(conn);
                future.resolve(data);
            });
            conn.onerror = function(e) {
                self.clean(conn);
                future.reject(e);
            };

            var len = request.length;
            var buf = new BytesIO(4 + len);
            buf.writeInt32BE(len);
            buf.write(request);
            conn.send(buf.buffer);
        } },
        sendAndReceive: { value: function(request, future, env) {
            var conn = this.fetch();
            if (conn) {
                this.send(request, future, env, conn);
            }
            else if (this.size < this.client.maxPoolSize) {
                conn = this.create();
                var self = this;
                conn.onerror = function(e) {
                    future.reject(e);
                };
                conn.onconnect = function() {
                    self.send(request, future, env, conn);
                };
            }
            else {
                this.requests.push([request, future, env]);
            }
        } }
    });

    HalfDuplexTcpTransporter.prototype.constructor = TcpTransporter;

    function TcpClient(uri, functions, settings) {
        if (this.constructor !== TcpClient) {
            return new TcpClient(uri, functions, settings);
        }
        Client.call(this, uri, functions, settings);

        var self = this;
        var _noDelay = true;
        var _fullDuplex = false;
        var _maxPoolSize = 10;
        var _poolTimeout = 30000;
        var fdtrans = null;
        var hdtrans = null;

        function getNoDelay() {
            return _noDelay;
        }

        function setNoDelay(value) {
            _noDelay = !!value;
        }

        function getFullDuplex() {
            return _fullDuplex;
        }

        function setFullDuplex(value) {
            _fullDuplex = !!value;
        }

        function getMaxPoolSize() {
            return _maxPoolSize;
        }

        function setMaxPoolSize(value) {
            if (typeof(value) === 'number') {
                _maxPoolSize = value | 0;
                if (_maxPoolSize < 1) {
                    _maxPoolSize = 10;
                }
            }
            else {
                _maxPoolSize = 10;
            }
        }

        function getPoolTimeout() {
            return _poolTimeout;
        }

        function setPoolTimeout(value) {
            if (typeof(value) === 'number') {
                _poolTimeout = value | 0;
            }
            else {
                _poolTimeout = 0;
            }
        }

        function sendAndReceive(request, env) {
            var future = new Future();
            if (_fullDuplex) {
                if ((fdtrans === null) || (fdtrans.uri !== self.uri)) {
                    fdtrans = new FullDuplexTcpTransporter(self);
                }
                fdtrans.sendAndReceive(request, future, env);
            }
            else {
                if ((hdtrans === null) || (hdtrans.uri !== self.uri)) {
                    hdtrans = new HalfDuplexTcpTransporter(self);
                }
                hdtrans.sendAndReceive(request, future, env);
            }
            if (env.oneway) { future.resolve(); }
            return future;
        }

        Object.defineProperties(this, {
            noDelay: { get: getNoDelay, set: setNoDelay },
            fullDuplex: { get: getFullDuplex, set: setFullDuplex },
            maxPoolSize: { get: getMaxPoolSize, set: setMaxPoolSize },
            poolTimeout: { get: getPoolTimeout, set: setPoolTimeout },
            sendAndReceive: { value: sendAndReceive }
        });
    }

    function checkuri(uri) {
        var parser = document.createElement('a');
        parser.href = uri;
        var protocol = parser.protocol;
        if (protocol === 'tcp:' ||
            protocol === 'tcp4:'||
            protocol === 'tcp6:' ||
            protocol === 'tcps:' ||
            protocol === 'tcp4s:' ||
            protocol === 'tcp6s:' ||
            protocol === 'tls:') {
            return;
        }
        throw new Error('This client desn\'t support ' + protocol + ' scheme.');
    }

    function create(uri, functions, settings) {
        if (typeof uri === 'string') {
            checkuri(uri);
        }
        else if (Array.isArray(uri)) {
            uri.forEach(function(uri) { checkuri(uri); });
        }
        else {
            throw new Error('You should set server uri first!');
        }
        return new TcpClient(uri, functions, settings);
    }

    Object.defineProperty(TcpClient, 'create', { value: create });

    global.hprose.TcpClient = TcpClient;

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * JSONRPCClientFilter.js                                 *
 *                                                        *
 * jsonrpc client filter for JavaScript.                  *
 *                                                        *
 * LastModified: Feb 23, 2016                             *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (global) {
    'use strict';

    var Tags = global.hprose.Tags;
    var BytesIO = global.hprose.BytesIO;
    var Writer = global.hprose.Writer;
    var Reader = global.hprose.Reader;
    var JSON = global.JSON;

    var s_id = 1;

    function JSONRPCClientFilter(version) {
        this.version = version || '2.0';
    }

    JSONRPCClientFilter.prototype.inputFilter = function inputFilter(data/*, context*/) {
        var json = BytesIO.toString(data);
        if (json.charAt(0) === '{') {
            json = '[' + json + ']';
        }
        var responses = JSON.parse(json);
        var stream = new BytesIO();
        var writer = new Writer(stream, true);
        for (var i = 0, n = responses.length; i < n; ++i) {
            var response = responses[i];
            if (response.error) {
                stream.writeByte(Tags.TagError);
                writer.writeString(response.error.message);
            }
            else {
                stream.writeByte(Tags.TagResult);
                writer.serialize(response.result);
            }
        }
        stream.writeByte(Tags.TagEnd);
        return stream.bytes;
    };

    JSONRPCClientFilter.prototype.outputFilter = function outputFilter(data/*, context*/) {
        var requests = [];
        var stream = new BytesIO(data);
        var reader = new Reader(stream, false, false);
        var tag = stream.readByte();
        do {
            var request = {};
            if (tag === Tags.TagCall) {
                request.method = reader.readString();
                tag = stream.readByte();
                if (tag === Tags.TagList) {
                    request.params = reader.readListWithoutTag();
                    tag = stream.readByte();
                }
                if (tag === Tags.TagTrue) {
                    tag = stream.readByte();
                }
            }
            if (this.version === '1.1') {
                request.version = '1.1';
            }
            else if (this.version === '2.0') {
                request.jsonrpc = '2.0';
            }
            request.id = s_id++;
            requests.push(request);
        } while (tag === Tags.TagCall);
        if (requests.length > 1) {
            return JSON.stringify(requests);
        }
        return JSON.stringify(requests[0]);
    };

    global.hprose.JSONRPCClientFilter = JSONRPCClientFilter;

})(this);

/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/

/**********************************************************\
 *                                                        *
 * Loader.js                                              *
 *                                                        *
 * hprose CommonJS/AMD/CMD loader for HTML5.              *
 *                                                        *
 * LastModified: Mar 2, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

/* global define, module */
(function (global) {
    'use strict';

    global.hprose.common = {
        Completer: global.hprose.Completer,
        Future: global.hprose.Future,
        ResultMode: global.hprose.ResultMode
    };

    global.hprose.io = {
        BytesIO: global.hprose.BytesIO,
        ClassManager: global.hprose.ClassManager,
        Tags: global.hprose.Tags,
        RawReader: global.hprose.RawReader,
        Reader: global.hprose.Reader,
        Writer: global.hprose.Writer,
        Formatter: global.hprose.Formatter
    };

    global.hprose.client = {
        Client: global.hprose.Client,
        HttpClient: global.hprose.HttpClient,
        TcpClient: global.hprose.TcpClient,
        WebSocketClient: global.hprose.WebSocketClient
    };

    global.hprose.filter = {
        JSONRPCClientFilter: global.hprose.JSONRPCClientFilter
    };

    if (typeof define === 'function') {
        if (define.cmd) {
            define('hprose', [], global.hprose);
        }
        else if (define.amd) {
            define('hprose', [], function() { return global.hprose; });
        }
    }
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.hprose;
    }
})(this);
