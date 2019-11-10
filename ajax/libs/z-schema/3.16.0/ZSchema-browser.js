!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ZSchema=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],2:[function(require,module,exports){
/**
 * lodash 3.7.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseGet = require('lodash._baseget'),
    toPath = require('lodash._topath');

/**
 * Gets the property value of `path` on `object`. If the resolved value is
 * `undefined` the `defaultValue` is used in its place.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, toPath(path), path + '');
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{"lodash._baseget":3,"lodash._topath":4}],3:[function(require,module,exports){
/**
 * lodash 3.7.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `get` without support for string paths
 * and default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path of the property to get.
 * @param {string} [pathKey] The key representation of path.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path, pathKey) {
  if (object == null) {
    return;
  }
  if (pathKey !== undefined && pathKey in toObject(object)) {
    path = [pathKey];
  }
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = baseGet;

},{}],4:[function(require,module,exports){
/**
 * lodash 3.8.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArray = require('lodash.isarray');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  return value == null ? '' : (value + '');
}

/**
 * Converts `value` to property path array if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
function toPath(value) {
  if (isArray(value)) {
    return value;
  }
  var result = [];
  baseToString(value).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

module.exports = toPath;

},{"lodash.isarray":5}],5:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;

},{}],6:[function(require,module,exports){
/*!
 * Copyright (c) 2015 Chris O'Hara <cohara87@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function (name, definition) {
    if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        module.exports = definition();
    } else if (typeof define === 'function' && typeof define.amd === 'object') {
        define(definition);
    } else {
        this[name] = definition();
    }
})('validator', function (validator) {

    'use strict';

    validator = { version: '4.0.5' };

    var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
    var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;

    var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
    var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;

    var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;

    var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

    var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;

    var isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/
      , isbn13Maybe = /^(?:[0-9]{13})$/;

    var ipv4Maybe = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/
      , ipv6Block = /^[0-9A-F]{1,4}$/i;

    var uuid = {
        '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i
      , '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      , '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      , all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
    };

    var alpha = /^[A-Z]+$/i
      , alphanumeric = /^[0-9A-Z]+$/i
      , numeric = /^[-+]?[0-9]+$/
      , int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/
      , float = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/
      , hexadecimal = /^[0-9A-F]+$/i
      , decimal = /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/
      , hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

    var ascii = /^[\x00-\x7F]+$/
      , multibyte = /[^\x00-\x7F]/
      , fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/
      , halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

    var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

    var base64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;

    var phones = {
      'zh-CN': /^(\+?0?86\-?)?1[345789]\d{9}$/,
      'en-ZA': /^(\+?27|0)\d{9}$/,
      'en-AU': /^(\+?61|0)4\d{8}$/,
      'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
      'fr-FR': /^(\+?33|0)[67]\d{8}$/,
      'pt-PT': /^(\+351)?9[1236]\d{7}$/,
      'el-GR': /^(\+30)?((2\d{9})|(69\d{8}))$/,
      'en-GB': /^(\+?44|0)7\d{9}$/,
      'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
      'en-ZM': /^(\+26)?09[567]\d{7}$/,
      'ru-RU': /^(\+?7|8)?9\d{9}$/
    };

    // from http://goo.gl/0ejHHW
    var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

    validator.extend = function (name, fn) {
        validator[name] = function () {
            var args = Array.prototype.slice.call(arguments);
            args[0] = validator.toString(args[0]);
            return fn.apply(validator, args);
        };
    };

    //Right before exporting the validator object, pass each of the builtins
    //through extend() so that their first argument is coerced to a string
    validator.init = function () {
        for (var name in validator) {
            if (typeof validator[name] !== 'function' || name === 'toString' ||
                    name === 'toDate' || name === 'extend' || name === 'init') {
                continue;
            }
            validator.extend(name, validator[name]);
        }
    };

    validator.toString = function (input) {
        if (typeof input === 'object' && input !== null && input.toString) {
            input = input.toString();
        } else if (input === null || typeof input === 'undefined' || (isNaN(input) && !input.length)) {
            input = '';
        } else if (typeof input !== 'string') {
            input += '';
        }
        return input;
    };

    validator.toDate = function (date) {
        if (Object.prototype.toString.call(date) === '[object Date]') {
            return date;
        }
        date = Date.parse(date);
        return !isNaN(date) ? new Date(date) : null;
    };

    validator.toFloat = function (str) {
        return parseFloat(str);
    };

    validator.toInt = function (str, radix) {
        return parseInt(str, radix || 10);
    };

    validator.toBoolean = function (str, strict) {
        if (strict) {
            return str === '1' || str === 'true';
        }
        return str !== '0' && str !== 'false' && str !== '';
    };

    validator.equals = function (str, comparison) {
        return str === validator.toString(comparison);
    };

    validator.contains = function (str, elem) {
        return str.indexOf(validator.toString(elem)) >= 0;
    };

    validator.matches = function (str, pattern, modifiers) {
        if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
            pattern = new RegExp(pattern, modifiers);
        }
        return pattern.test(str);
    };

    var default_email_options = {
        allow_display_name: false,
        allow_utf8_local_part: true,
        require_tld: true
    };

    validator.isEmail = function (str, options) {
        options = merge(options, default_email_options);

        if (options.allow_display_name) {
            var display_email = str.match(displayName);
            if (display_email) {
                str = display_email[1];
            }
        }

        var parts = str.split('@')
          , domain = parts.pop()
          , user = parts.join('@');

        var lower_domain = domain.toLowerCase();
        if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
            user = user.replace(/\./g, '').toLowerCase();
        }

        if (!validator.isByteLength(user, 0, 64) ||
                !validator.isByteLength(domain, 0, 256)) {
            return false;
        }

        if (!validator.isFQDN(domain, {require_tld: options.require_tld})) {
            return false;
        }

        if (user[0] === '"') {
            user = user.slice(1, user.length - 1);
            return options.allow_utf8_local_part ?
                quotedEmailUserUtf8.test(user) :
                quotedEmailUser.test(user);
        }

        var pattern = options.allow_utf8_local_part ?
            emailUserUtf8Part : emailUserPart;

        var user_parts = user.split('.');
        for (var i = 0; i < user_parts.length; i++) {
            if (!pattern.test(user_parts[i])) {
                return false;
            }
        }

        return true;
    };

    var default_url_options = {
        protocols: [ 'http', 'https', 'ftp' ]
      , require_tld: true
      , require_protocol: false
      , require_valid_protocol: true
      , allow_underscores: false
      , allow_trailing_dot: false
      , allow_protocol_relative_urls: false
    };

    validator.isURL = function (url, options) {
        if (!url || url.length >= 2083 || /\s/.test(url)) {
            return false;
        }
        if (url.indexOf('mailto:') === 0) {
            return false;
        }
        options = merge(options, default_url_options);
        var protocol, auth, host, hostname, port,
            port_str, split;
        split = url.split('://');
        if (split.length > 1) {
            protocol = split.shift();
            if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
                return false;
            }
        } else if (options.require_protocol) {
            return false;
        }  else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
            split[0] = url.substr(2);
        }
        url = split.join('://');
        split = url.split('#');
        url = split.shift();

        split = url.split('?');
        url = split.shift();

        split = url.split('/');
        url = split.shift();
        split = url.split('@');
        if (split.length > 1) {
            auth = split.shift();
            if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
                return false;
            }
        }
        hostname = split.join('@');
        split = hostname.split(':');
        host = split.shift();
        if (split.length) {
            port_str = split.join(':');
            port = parseInt(port_str, 10);
            if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
                return false;
            }
        }
        if (!validator.isIP(host) && !validator.isFQDN(host, options) &&
                host !== 'localhost') {
            return false;
        }
        if (options.host_whitelist &&
                options.host_whitelist.indexOf(host) === -1) {
            return false;
        }
        if (options.host_blacklist &&
                options.host_blacklist.indexOf(host) !== -1) {
            return false;
        }
        return true;
    };

    validator.isIP = function (str, version) {
        version = validator.toString(version);
        if (!version) {
            return validator.isIP(str, 4) || validator.isIP(str, 6);
        } else if (version === '4') {
            if (!ipv4Maybe.test(str)) {
                return false;
            }
            var parts = str.split('.').sort(function (a, b) {
                return a - b;
            });
            return parts[3] <= 255;
        } else if (version === '6') {
            var blocks = str.split(':');
            var foundOmissionBlock = false; // marker to indicate ::

            // At least some OS accept the last 32 bits of an IPv6 address
            // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
            // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
            // and '::a.b.c.d' is deprecated, but also valid.
            var foundIPv4TransitionBlock = validator.isIP(blocks[blocks.length - 1], 4);
            var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

            if (blocks.length > expectedNumberOfBlocks)
                return false;

            // initial or final ::
            if (str === '::') {
                return true;
            } else if (str.substr(0, 2) === '::') {
                blocks.shift();
                blocks.shift();
                foundOmissionBlock = true;
            } else if (str.substr(str.length - 2) === '::') {
                blocks.pop();
                blocks.pop();
                foundOmissionBlock = true;
            }

            for (var i = 0; i < blocks.length; ++i) {
                // test for a :: which can not be at the string start/end
                // since those cases have been handled above
                if (blocks[i] === '' && i > 0 && i < blocks.length -1) {
                    if (foundOmissionBlock)
                        return false; // multiple :: in address
                    foundOmissionBlock = true;
                } else if (foundIPv4TransitionBlock && i == blocks.length - 1) {
                    // it has been checked before that the last
                    // block is a valid IPv4 address
                } else if (!ipv6Block.test(blocks[i])) {
                    return false;
                }
            }

            if (foundOmissionBlock) {
                return blocks.length >= 1;
            } else {
                return blocks.length === expectedNumberOfBlocks;
            }
        }
        return false;
    };

    var default_fqdn_options = {
        require_tld: true
      , allow_underscores: false
      , allow_trailing_dot: false
    };

    validator.isFQDN = function (str, options) {
        options = merge(options, default_fqdn_options);

        /* Remove the optional trailing dot before checking validity */
        if (options.allow_trailing_dot && str[str.length - 1] === '.') {
            str = str.substring(0, str.length - 1);
        }
        var parts = str.split('.');
        if (options.require_tld) {
            var tld = parts.pop();
            if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
                return false;
            }
        }
        for (var part, i = 0; i < parts.length; i++) {
            part = parts[i];
            if (options.allow_underscores) {
                if (part.indexOf('__') >= 0) {
                    return false;
                }
                part = part.replace(/_/g, '');
            }
            if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
                return false;
            }
            if (/[\uff01-\uff5e]/.test(part)) {
                // disallow full-width chars
                return false;
            }
            if (part[0] === '-' || part[part.length - 1] === '-' ||
                    part.indexOf('---') >= 0) {
                return false;
            }
        }
        return true;
    };

    validator.isBoolean = function(str) {
        return (['true', 'false', '1', '0'].indexOf(str) >= 0);
    };

    validator.isAlpha = function (str) {
        return alpha.test(str);
    };

    validator.isAlphanumeric = function (str) {
        return alphanumeric.test(str);
    };

    validator.isNumeric = function (str) {
        return numeric.test(str);
    };

    validator.isDecimal = function (str) {
        return str !== '' && decimal.test(str);
    };

    validator.isHexadecimal = function (str) {
        return hexadecimal.test(str);
    };

    validator.isHexColor = function (str) {
        return hexcolor.test(str);
    };

    validator.isLowercase = function (str) {
        return str === str.toLowerCase();
    };

    validator.isUppercase = function (str) {
        return str === str.toUpperCase();
    };

    validator.isInt = function (str, options) {
        options = options || {};
        return int.test(str) && (!options.hasOwnProperty('min') || str >= options.min) && (!options.hasOwnProperty('max') || str <= options.max);
    };

    validator.isFloat = function (str, options) {
        options = options || {};
        return str !== '' && float.test(str) && (!options.hasOwnProperty('min') || str >= options.min) && (!options.hasOwnProperty('max') || str <= options.max);
    };

    validator.isDivisibleBy = function (str, num) {
        return validator.toFloat(str) % validator.toInt(num) === 0;
    };

    validator.isNull = function (str) {
        return str.length === 0;
    };

    validator.isLength = function (str, min, max) {
        var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
        var len = str.length - surrogatePairs.length;
        return len >= min && (typeof max === 'undefined' || len <= max);
    };

    validator.isByteLength = function (str, min, max) {
        var len = encodeURI(str).split(/%..|./).length - 1;
        return len >= min && (typeof max === 'undefined' || len <= max);
    };

    validator.isUUID = function (str, version) {
        var pattern = uuid[version ? version : 'all'];
        return pattern && pattern.test(str);
    };

    validator.isDate = function (str) {
        return !isNaN(Date.parse(str));
    };

    validator.isAfter = function (str, date) {
        var comparison = validator.toDate(date || new Date())
          , original = validator.toDate(str);
        return !!(original && comparison && original > comparison);
    };

    validator.isBefore = function (str, date) {
        var comparison = validator.toDate(date || new Date())
          , original = validator.toDate(str);
        return original && comparison && original < comparison;
    };

    validator.isIn = function (str, options) {
        var i;
        if (Object.prototype.toString.call(options) === '[object Array]') {
            var array = [];
            for (i in options) {
                array[i] = validator.toString(options[i]);
            }
            return array.indexOf(str) >= 0;
        } else if (typeof options === 'object') {
            return options.hasOwnProperty(str);
        } else if (options && typeof options.indexOf === 'function') {
            return options.indexOf(str) >= 0;
        }
        return false;
    };

    validator.isCreditCard = function (str) {
        var sanitized = str.replace(/[^0-9]+/g, '');
        if (!creditCard.test(sanitized)) {
            return false;
        }
        var sum = 0, digit, tmpNum, shouldDouble;
        for (var i = sanitized.length - 1; i >= 0; i--) {
            digit = sanitized.substring(i, (i + 1));
            tmpNum = parseInt(digit, 10);
            if (shouldDouble) {
                tmpNum *= 2;
                if (tmpNum >= 10) {
                    sum += ((tmpNum % 10) + 1);
                } else {
                    sum += tmpNum;
                }
            } else {
                sum += tmpNum;
            }
            shouldDouble = !shouldDouble;
        }
        return !!((sum % 10) === 0 ? sanitized : false);
    };

    validator.isISIN = function (str) {
        if (!isin.test(str)) {
            return false;
        }

        var checksumStr = str.replace(/[A-Z]/g, function(character) {
            return parseInt(character, 36);
        });

        var sum = 0, digit, tmpNum, shouldDouble = true;
        for (var i = checksumStr.length - 2; i >= 0; i--) {
            digit = checksumStr.substring(i, (i + 1));
            tmpNum = parseInt(digit, 10);
            if (shouldDouble) {
                tmpNum *= 2;
                if (tmpNum >= 10) {
                    sum += tmpNum + 1;
                } else {
                    sum += tmpNum;
                }
            } else {
                sum += tmpNum;
            }
            shouldDouble = !shouldDouble;
        }

        return parseInt(str.substr(str.length - 1), 10) === (10000 - sum) % 10;
    };

    validator.isISBN = function (str, version) {
        version = validator.toString(version);
        if (!version) {
            return validator.isISBN(str, 10) || validator.isISBN(str, 13);
        }
        var sanitized = str.replace(/[\s-]+/g, '')
          , checksum = 0, i;
        if (version === '10') {
            if (!isbn10Maybe.test(sanitized)) {
                return false;
            }
            for (i = 0; i < 9; i++) {
                checksum += (i + 1) * sanitized.charAt(i);
            }
            if (sanitized.charAt(9) === 'X') {
                checksum += 10 * 10;
            } else {
                checksum += 10 * sanitized.charAt(9);
            }
            if ((checksum % 11) === 0) {
                return !!sanitized;
            }
        } else  if (version === '13') {
            if (!isbn13Maybe.test(sanitized)) {
                return false;
            }
            var factor = [ 1, 3 ];
            for (i = 0; i < 12; i++) {
                checksum += factor[i % 2] * sanitized.charAt(i);
            }
            if (sanitized.charAt(12) - ((10 - (checksum % 10)) % 10) === 0) {
                return !!sanitized;
            }
        }
        return false;
    };

    validator.isMobilePhone = function(str, locale) {
        if (locale in phones) {
            return phones[locale].test(str);
        }
        return false;
    };

    var default_currency_options = {
        symbol: '$'
      , require_symbol: false
      , allow_space_after_symbol: false
      , symbol_after_digits: false
      , allow_negatives: true
      , parens_for_negatives: false
      , negative_sign_before_digits: false
      , negative_sign_after_digits: false
      , allow_negative_sign_placeholder: false
      , thousands_separator: ','
      , decimal_separator: '.'
      , allow_space_after_digits: false
    };

    validator.isCurrency = function (str, options) {
        options = merge(options, default_currency_options);

        return currencyRegex(options).test(str);
    };

    validator.isJSON = function (str) {
        try {
            var obj = JSON.parse(str);
            return !!obj && typeof obj === 'object';
        } catch (e) {}
        return false;
    };

    validator.isMultibyte = function (str) {
        return multibyte.test(str);
    };

    validator.isAscii = function (str) {
        return ascii.test(str);
    };

    validator.isFullWidth = function (str) {
        return fullWidth.test(str);
    };

    validator.isHalfWidth = function (str) {
        return halfWidth.test(str);
    };

    validator.isVariableWidth = function (str) {
        return fullWidth.test(str) && halfWidth.test(str);
    };

    validator.isSurrogatePair = function (str) {
        return surrogatePair.test(str);
    };

    validator.isBase64 = function (str) {
        return base64.test(str);
    };

    validator.isMongoId = function (str) {
        return validator.isHexadecimal(str) && str.length === 24;
    };

    validator.isISO8601 = function (str) {
        return iso8601.test(str);
    };

    validator.ltrim = function (str, chars) {
        var pattern = chars ? new RegExp('^[' + chars + ']+', 'g') : /^\s+/g;
        return str.replace(pattern, '');
    };

    validator.rtrim = function (str, chars) {
        var pattern = chars ? new RegExp('[' + chars + ']+$', 'g') : /\s+$/g;
        return str.replace(pattern, '');
    };

    validator.trim = function (str, chars) {
        var pattern = chars ? new RegExp('^[' + chars + ']+|[' + chars + ']+$', 'g') : /^\s+|\s+$/g;
        return str.replace(pattern, '');
    };

    validator.escape = function (str) {
        return (str.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\//g, '&#x2F;')
            .replace(/\`/g, '&#96;'));
    };

    validator.stripLow = function (str, keep_new_lines) {
        var chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
        return validator.blacklist(str, chars);
    };

    validator.whitelist = function (str, chars) {
        return str.replace(new RegExp('[^' + chars + ']+', 'g'), '');
    };

    validator.blacklist = function (str, chars) {
        return str.replace(new RegExp('[' + chars + ']+', 'g'), '');
    };

    var default_normalize_email_options = {
        lowercase: true
    };

    validator.normalizeEmail = function (email, options) {
        options = merge(options, default_normalize_email_options);
        if (!validator.isEmail(email)) {
            return false;
        }
        var parts = email.split('@', 2);
        parts[1] = parts[1].toLowerCase();
        if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
            parts[0] = parts[0].toLowerCase().replace(/\./g, '');
            if (parts[0][0] === '+') {
                return false;
            }
            parts[0] = parts[0].split('+')[0];
            parts[1] = 'gmail.com';
        } else if (options.lowercase) {
            parts[0] = parts[0].toLowerCase();
        }
        return parts.join('@');
    };

    function merge(obj, defaults) {
        obj = obj || {};
        for (var key in defaults) {
            if (typeof obj[key] === 'undefined') {
                obj[key] = defaults[key];
            }
        }
        return obj;
    }

    function currencyRegex(options) {
        var symbol = '(\\' + options.symbol.replace(/\./g, '\\.') + ')' + (options.require_symbol ? '' : '?')
            , negative = '-?'
            , whole_dollar_amount_without_sep = '[1-9]\\d*'
            , whole_dollar_amount_with_sep = '[1-9]\\d{0,2}(\\' + options.thousands_separator + '\\d{3})*'
            , valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep]
            , whole_dollar_amount = '(' + valid_whole_dollar_amounts.join('|') + ')?'
            , decimal_amount = '(\\' + options.decimal_separator + '\\d{2})?';
        var pattern = whole_dollar_amount + decimal_amount;
        // default is negative sign before symbol, but there are two other options (besides parens)
        if (options.allow_negatives && !options.parens_for_negatives) {
            if (options.negative_sign_after_digits) {
                pattern += negative;
            }
            else if (options.negative_sign_before_digits) {
                pattern = negative + pattern;
            }
        }
        // South African Rand, for example, uses R 123 (space) and R-123 (no space)
        if (options.allow_negative_sign_placeholder) {
            pattern = '( (?!\\-))?' + pattern;
        }
        else if (options.allow_space_after_symbol) {
            pattern = ' ?' + pattern;
        }
        else if (options.allow_space_after_digits) {
            pattern += '( (?!$))?';
        }
        if (options.symbol_after_digits) {
            pattern += symbol;
        } else {
            pattern = symbol + pattern;
        }
        if (options.allow_negatives) {
            if (options.parens_for_negatives) {
                pattern = '(\\(' + pattern + '\\)|' + pattern + ')';
            }
            else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
                pattern = negative + pattern;
            }
        }
        return new RegExp(
            '^' +
            // ensure there's a dollar and/or decimal amount, and that it doesn't start with a space or a negative sign followed by a space
            '(?!-? )(?=.*\\d)' +
            pattern +
            '$'
        );
    }

    validator.init();

    return validator;

});

},{}],7:[function(require,module,exports){
"use strict";

module.exports = {

    INVALID_TYPE:                           "Expected type {0} but found type {1}",
    INVALID_FORMAT:                         "Object didn't pass validation for format {0}: {1}",
    ENUM_MISMATCH:                          "No enum match for: {0}",
    ANY_OF_MISSING:                         "Data does not match any schemas from 'anyOf'",
    ONE_OF_MISSING:                         "Data does not match any schemas from 'oneOf'",
    ONE_OF_MULTIPLE:                        "Data is valid against more than one schema from 'oneOf'",
    NOT_PASSED:                             "Data matches schema from 'not'",

    // Array errors
    ARRAY_LENGTH_SHORT:                     "Array is too short ({0}), minimum {1}",
    ARRAY_LENGTH_LONG:                      "Array is too long ({0}), maximum {1}",
    ARRAY_UNIQUE:                           "Array items are not unique (indexes {0} and {1})",
    ARRAY_ADDITIONAL_ITEMS:                 "Additional items not allowed",

    // Numeric errors
    MULTIPLE_OF:                            "Value {0} is not a multiple of {1}",
    MINIMUM:                                "Value {0} is less than minimum {1}",
    MINIMUM_EXCLUSIVE:                      "Value {0} is equal or less than exclusive minimum {1}",
    MAXIMUM:                                "Value {0} is greater than maximum {1}",
    MAXIMUM_EXCLUSIVE:                      "Value {0} is equal or greater than exclusive maximum {1}",

    // Object errors
    OBJECT_PROPERTIES_MINIMUM:              "Too few properties defined ({0}), minimum {1}",
    OBJECT_PROPERTIES_MAXIMUM:              "Too many properties defined ({0}), maximum {1}",
    OBJECT_MISSING_REQUIRED_PROPERTY:       "Missing required property: {0}",
    OBJECT_ADDITIONAL_PROPERTIES:           "Additional properties not allowed: {0}",
    OBJECT_DEPENDENCY_KEY:                  "Dependency failed - key must exist: {0} (due to key: {1})",

    // String errors
    MIN_LENGTH:                             "String is too short ({0} chars), minimum {1}",
    MAX_LENGTH:                             "String is too long ({0} chars), maximum {1}",
    PATTERN:                                "String does not match pattern {0}: {1}",

    // Schema validation errors
    KEYWORD_TYPE_EXPECTED:                  "Keyword '{0}' is expected to be of type '{1}'",
    KEYWORD_UNDEFINED_STRICT:               "Keyword '{0}' must be defined in strict mode",
    KEYWORD_UNEXPECTED:                     "Keyword '{0}' is not expected to appear in the schema",
    KEYWORD_MUST_BE:                        "Keyword '{0}' must be {1}",
    KEYWORD_DEPENDENCY:                     "Keyword '{0}' requires keyword '{1}'",
    KEYWORD_PATTERN:                        "Keyword '{0}' is not a valid RegExp pattern: {1}",
    KEYWORD_VALUE_TYPE:                     "Each element of keyword '{0}' array must be a '{1}'",
    UNKNOWN_FORMAT:                         "There is no validation function for format '{0}'",
    CUSTOM_MODE_FORCE_PROPERTIES:           "{0} must define at least one property if present",

    // Remote errors
    REF_UNRESOLVED:                         "Reference has not been resolved during compilation: {0}",
    UNRESOLVABLE_REFERENCE:                 "Reference could not be resolved: {0}",
    SCHEMA_NOT_REACHABLE:                   "Validator was not able to read schema with uri: {0}",
    SCHEMA_TYPE_EXPECTED:                   "Schema is expected to be of type 'object'",
    SCHEMA_NOT_AN_OBJECT:                   "Schema is not an object: {0}",
    ASYNC_TIMEOUT:                          "{0} asynchronous task(s) have timed out after {1} ms",
    PARENT_SCHEMA_VALIDATION_FAILED:        "Schema failed to validate against its parent schema, see inner errors for details.",
    REMOTE_NOT_VALID:                       "Remote reference didn't compile successfully: {0}"

};

},{}],8:[function(require,module,exports){
/*jshint maxlen: false*/

var validator = require("validator");

var FormatValidators = {
    "date": function (date) {
        if (typeof date !== "string") {
            return true;
        }
        // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
        var matches = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(date);
        if (matches === null) {
            return false;
        }
        // var year = matches[1];
        // var month = matches[2];
        // var day = matches[3];
        if (matches[2] < "01" || matches[2] > "12" || matches[3] < "01" || matches[3] > "31") {
            return false;
        }
        return true;
    },
    "date-time": function (dateTime) {
        if (typeof dateTime !== "string") {
            return true;
        }
        // date-time from http://tools.ietf.org/html/rfc3339#section-5.6
        var s = dateTime.toLowerCase().split("t");
        if (!FormatValidators.date(s[0])) {
            return false;
        }
        var matches = /^([0-9]{2}):([0-9]{2}):([0-9]{2})(.[0-9]+)?(z|([+-][0-9]{2}:[0-9]{2}))$/.exec(s[1]);
        if (matches === null) {
            return false;
        }
        // var hour = matches[1];
        // var minute = matches[2];
        // var second = matches[3];
        // var fraction = matches[4];
        // var timezone = matches[5];
        if (matches[1] > "23" || matches[2] > "59" || matches[3] > "59") {
            return false;
        }
        return true;
    },
    "email": function (email) {
        if (typeof email !== "string") {
            return true;
        }
        return validator.isEmail(email, { "require_tld": true });
    },
    "hostname": function (hostname) {
        if (typeof hostname !== "string") {
            return true;
        }
        /*
            http://json-schema.org/latest/json-schema-validation.html#anchor114
            A string instance is valid against this attribute if it is a valid
            representation for an Internet host name, as defined by RFC 1034, section 3.1 [RFC1034].

            http://tools.ietf.org/html/rfc1034#section-3.5

            <digit> ::= any one of the ten digits 0 through 9
            var digit = /[0-9]/;

            <letter> ::= any one of the 52 alphabetic characters A through Z in upper case and a through z in lower case
            var letter = /[a-zA-Z]/;

            <let-dig> ::= <letter> | <digit>
            var letDig = /[0-9a-zA-Z]/;

            <let-dig-hyp> ::= <let-dig> | "-"
            var letDigHyp = /[-0-9a-zA-Z]/;

            <ldh-str> ::= <let-dig-hyp> | <let-dig-hyp> <ldh-str>
            var ldhStr = /[-0-9a-zA-Z]+/;

            <label> ::= <letter> [ [ <ldh-str> ] <let-dig> ]
            var label = /[a-zA-Z](([-0-9a-zA-Z]+)?[0-9a-zA-Z])?/;

            <subdomain> ::= <label> | <subdomain> "." <label>
            var subdomain = /^[a-zA-Z](([-0-9a-zA-Z]+)?[0-9a-zA-Z])?(\.[a-zA-Z](([-0-9a-zA-Z]+)?[0-9a-zA-Z])?)*$/;

            <domain> ::= <subdomain> | " "
            var domain = null;
        */
        var valid = /^[a-zA-Z](([-0-9a-zA-Z]+)?[0-9a-zA-Z])?(\.[a-zA-Z](([-0-9a-zA-Z]+)?[0-9a-zA-Z])?)*$/.test(hostname);
        if (valid) {
            // the sum of all label octets and label lengths is limited to 255.
            if (hostname.length > 255) { return false; }
            // Each node has a label, which is zero to 63 octets in length
            var labels = hostname.split(".");
            for (var i = 0; i < labels.length; i++) { if (labels[i].length > 63) { return false; } }
        }
        return valid;
    },
    "host-name": function (hostname) {
        return FormatValidators.hostname.call(this, hostname);
    },
    "ipv4": function (ipv4) {
        if (typeof ipv4 !== "string") { return true; }
        return validator.isIP(ipv4, 4);
    },
    "ipv6": function (ipv6) {
        if (typeof ipv6 !== "string") { return true; }
        return validator.isIP(ipv6, 6);
    },
    "regex": function (str) {
        try {
            RegExp(str);
            return true;
        } catch (e) {
            return false;
        }
    },
    "uri": function (uri) {
        if (this.options.strictUris) {
            return FormatValidators["strict-uri"].apply(this, arguments);
        }
        // https://github.com/zaggino/z-schema/issues/18
        // RegExp from http://tools.ietf.org/html/rfc3986#appendix-B
        return typeof uri !== "string" || RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?").test(uri);
    },
    "strict-uri": function (uri) {
        return typeof uri !== "string" || validator.isURL(uri);
    }
};

module.exports = FormatValidators;

},{"validator":6}],9:[function(require,module,exports){
"use strict";

var FormatValidators  = require("./FormatValidators"),
    Report            = require("./Report"),
    Utils             = require("./Utils");

var JsonValidators = {
    multipleOf: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.1.2
        if (typeof json !== "number") {
            return;
        }
        if (Utils.whatIs(json / schema.multipleOf) !== "integer") {
            report.addError("MULTIPLE_OF", [json, schema.multipleOf], null, schema.description);
        }
    },
    maximum: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.2.2
        if (typeof json !== "number") {
            return;
        }
        if (schema.exclusiveMaximum !== true) {
            if (json > schema.maximum) {
                report.addError("MAXIMUM", [json, schema.maximum], null, schema.description);
            }
        } else {
            if (json >= schema.maximum) {
                report.addError("MAXIMUM_EXCLUSIVE", [json, schema.maximum], null, schema.description);
            }
        }
    },
    exclusiveMaximum: function () {
        // covered in maximum
    },
    minimum: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.3.2
        if (typeof json !== "number") {
            return;
        }
        if (schema.exclusiveMinimum !== true) {
            if (json < schema.minimum) {
                report.addError("MINIMUM", [json, schema.minimum], null, schema.description);
            }
        } else {
            if (json <= schema.minimum) {
                report.addError("MINIMUM_EXCLUSIVE", [json, schema.minimum], null, schema.description);
            }
        }
    },
    exclusiveMinimum: function () {
        // covered in minimum
    },
    maxLength: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.2.1.2
        if (typeof json !== "string") {
            return;
        }
        if (Utils.ucs2decode(json).length > schema.maxLength) {
            report.addError("MAX_LENGTH", [json.length, schema.maxLength], null, schema.description);
        }
    },
    minLength: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.2.2.2
        if (typeof json !== "string") {
            return;
        }
        if (Utils.ucs2decode(json).length < schema.minLength) {
            report.addError("MIN_LENGTH", [json.length, schema.minLength], null, schema.description);
        }
    },
    pattern: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.2.3.2
        if (typeof json !== "string") {
            return;
        }
        if (RegExp(schema.pattern).test(json) === false) {
            report.addError("PATTERN", [schema.pattern, json], null, schema.description);
        }
    },
    additionalItems: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.1.2
        if (!Array.isArray(json)) {
            return;
        }
        // if the value of "additionalItems" is boolean value false and the value of "items" is an array,
        // the json is valid if its size is less than, or equal to, the size of "items".
        if (schema.additionalItems === false && Array.isArray(schema.items)) {
            if (json.length > schema.items.length) {
                report.addError("ARRAY_ADDITIONAL_ITEMS", null, null, schema.description);
            }
        }
    },
    items: function () { /*report, schema, json*/
        // covered in additionalItems
    },
    maxItems: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.2.2
        if (!Array.isArray(json)) {
            return;
        }
        if (json.length > schema.maxItems) {
            report.addError("ARRAY_LENGTH_LONG", [json.length, schema.maxItems], null, schema.description);
        }
    },
    minItems: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.3.2
        if (!Array.isArray(json)) {
            return;
        }
        if (json.length < schema.minItems) {
            report.addError("ARRAY_LENGTH_SHORT", [json.length, schema.minItems], null, schema.description);
        }
    },
    uniqueItems: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.4.2
        if (!Array.isArray(json)) {
            return;
        }
        if (schema.uniqueItems === true) {
            var matches = [];
            if (Utils.isUniqueArray(json, matches) === false) {
                report.addError("ARRAY_UNIQUE", matches, null, schema.description);
            }
        }
    },
    maxProperties: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.1.2
        if (Utils.whatIs(json) !== "object") {
            return;
        }
        var keysCount = Object.keys(json).length;
        if (keysCount > schema.maxProperties) {
            report.addError("OBJECT_PROPERTIES_MAXIMUM", [keysCount, schema.maxProperties], null, schema.description);
        }
    },
    minProperties: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.2.2
        if (Utils.whatIs(json) !== "object") {
            return;
        }
        var keysCount = Object.keys(json).length;
        if (keysCount < schema.minProperties) {
            report.addError("OBJECT_PROPERTIES_MINIMUM", [keysCount, schema.minProperties], null, schema.description);
        }
    },
    required: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.3.2
        if (Utils.whatIs(json) !== "object") {
            return;
        }
        var idx = schema.required.length;
        while (idx--) {
            var requiredPropertyName = schema.required[idx];
            if (json[requiredPropertyName] === undefined) {
                report.addError("OBJECT_MISSING_REQUIRED_PROPERTY", [requiredPropertyName], null, schema.description);
            }
        }
    },
    additionalProperties: function (report, schema, json) {
        // covered in properties and patternProperties
        if (schema.properties === undefined && schema.patternProperties === undefined) {
            return JsonValidators.properties.call(this, report, schema, json);
        }
    },
    patternProperties: function (report, schema, json) {
        // covered in properties
        if (schema.properties === undefined) {
            return JsonValidators.properties.call(this, report, schema, json);
        }
    },
    properties: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.4.2
        if (Utils.whatIs(json) !== "object") {
            return;
        }
        var properties = schema.properties !== undefined ? schema.properties : {};
        var patternProperties = schema.patternProperties !== undefined ? schema.patternProperties : {};
        if (schema.additionalProperties === false) {
            // The property set of the json to validate.
            var s = Object.keys(json);
            // The property set from "properties".
            var p = Object.keys(properties);
            // The property set from "patternProperties".
            var pp = Object.keys(patternProperties);
            // remove from "s" all elements of "p", if any;
            s = Utils.difference(s, p);
            // for each regex in "pp", remove all elements of "s" which this regex matches.
            var idx = pp.length;
            while (idx--) {
                var regExp = RegExp(pp[idx]),
                    idx2 = s.length;
                while (idx2--) {
                    if (regExp.test(s[idx2]) === true) {
                        s.splice(idx2, 1);
                    }
                }
            }
            // Validation of the json succeeds if, after these two steps, set "s" is empty.
            if (s.length > 0) {
                // assumeAdditional can be an array of allowed properties
                var idx3 = this.options.assumeAdditional.length;
                if (idx3) {
                    while (idx3--) {
                        var io = s.indexOf(this.options.assumeAdditional[idx3]);
                        if (io !== -1) {
                            s.splice(io, 1);
                        }
                    }
                }
                if (s.length > 0) {
                    report.addError("OBJECT_ADDITIONAL_PROPERTIES", [s], null, schema.description);
                }
            }
        }
    },
    dependencies: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.5.2
        if (Utils.whatIs(json) !== "object") {
            return;
        }

        var keys = Object.keys(schema.dependencies),
            idx = keys.length;

        while (idx--) {
            // iterate all dependencies
            var dependencyName = keys[idx];
            if (json[dependencyName]) {
                var dependencyDefinition = schema.dependencies[dependencyName];
                if (Utils.whatIs(dependencyDefinition) === "object") {
                    // if dependency is a schema, validate against this schema
                    exports.validate.call(this, report, dependencyDefinition, json);
                } else { // Array
                    // if dependency is an array, object needs to have all properties in this array
                    var idx2 = dependencyDefinition.length;
                    while (idx2--) {
                        var requiredPropertyName = dependencyDefinition[idx2];
                        if (json[requiredPropertyName] === undefined) {
                            report.addError("OBJECT_DEPENDENCY_KEY", [requiredPropertyName, dependencyName], null, schema.description);
                        }
                    }
                }
            }
        }
    },
    enum: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.1.2
        var match = false,
            idx = schema.enum.length;
        while (idx--) {
            if (Utils.areEqual(json, schema.enum[idx])) {
                match = true;
                break;
            }
        }
        if (match === false) {
            report.addError("ENUM_MISMATCH", [json], null, schema.description);
        }
    },
    /*
    type: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.2.2
        // type is handled before this is called so ignore
    },
    */
    allOf: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.3.2
        var idx = schema.allOf.length;
        while (idx--) {
            var validateResult = exports.validate.call(this, report, schema.allOf[idx], json);
            if (this.options.breakOnFirstError && validateResult === false) {
                break;
            }
        }
    },
    anyOf: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.4.2
        var subReports = [],
            passed = false,
            idx = schema.anyOf.length;

        while (idx-- && passed === false) {
            var subReport = new Report(report);
            subReports.push(subReport);
            passed = exports.validate.call(this, subReport, schema.anyOf[idx], json);
        }

        if (passed === false) {
            report.addError("ANY_OF_MISSING", undefined, subReports, schema.description);
        }
    },
    oneOf: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.5.2
        var passes = 0,
            subReports = [],
            idx = schema.oneOf.length;

        while (idx--) {
            var subReport = new Report(report, { maxErrors: 1 });
            subReports.push(subReport);
            if (exports.validate.call(this, subReport, schema.oneOf[idx], json) === true) {
                passes++;
            }
        }

        if (passes === 0) {
            report.addError("ONE_OF_MISSING", undefined, subReports, schema.description);
        } else if (passes > 1) {
            report.addError("ONE_OF_MULTIPLE", null, null, schema.description);
        }
    },
    not: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.6.2
        var subReport = new Report(report);
        if (exports.validate.call(this, subReport, schema.not, json) === true) {
            report.addError("NOT_PASSED", null, null, schema.description);
        }
    },
    definitions: function () { /*report, schema, json*/
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.7.2
        // nothing to do here
    },
    format: function (report, schema, json) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.7.2
        var formatValidatorFn = FormatValidators[schema.format];
        if (typeof formatValidatorFn === "function") {
            if (formatValidatorFn.length === 2) {
                // async
                report.addAsyncTask(formatValidatorFn, [json], function (result) {
                    if (result !== true) {
                        report.addError("INVALID_FORMAT", [schema.format, json], null, schema.description);
                    }
                });
            } else {
                // sync
                if (formatValidatorFn.call(this, json) !== true) {
                    report.addError("INVALID_FORMAT", [schema.format, json], null, schema.description);
                }
            }
        } else if (this.options.ignoreUnknownFormats !== true) {
            report.addError("UNKNOWN_FORMAT", [schema.format], null, schema.description);
        }
    }
};

var recurseArray = function (report, schema, json) {
    // http://json-schema.org/latest/json-schema-validation.html#rfc.section.8.2

    var idx = json.length;

    // If "items" is an array, this situation, the schema depends on the index:
    // if the index is less than, or equal to, the size of "items",
    // the child instance must be valid against the corresponding schema in the "items" array;
    // otherwise, it must be valid against the schema defined by "additionalItems".
    if (Array.isArray(schema.items)) {

        while (idx--) {
            // equal to doesnt make sense here
            if (idx < schema.items.length) {
                report.path.push(idx.toString());
                exports.validate.call(this, report, schema.items[idx], json[idx]);
                report.path.pop();
            } else {
                // might be boolean, so check that it's an object
                if (typeof schema.additionalItems === "object") {
                    report.path.push(idx.toString());
                    exports.validate.call(this, report, schema.additionalItems, json[idx]);
                    report.path.pop();
                }
            }
        }

    } else if (typeof schema.items === "object") {

        // If items is a schema, then the child instance must be valid against this schema,
        // regardless of its index, and regardless of the value of "additionalItems".
        while (idx--) {
            report.path.push(idx.toString());
            exports.validate.call(this, report, schema.items, json[idx]);
            report.path.pop();
        }

    }
};

var recurseObject = function (report, schema, json) {
    // http://json-schema.org/latest/json-schema-validation.html#rfc.section.8.3

    // If "additionalProperties" is absent, it is considered present with an empty schema as a value.
    // In addition, boolean value true is considered equivalent to an empty schema.
    var additionalProperties = schema.additionalProperties;
    if (additionalProperties === true || additionalProperties === undefined) {
        additionalProperties = {};
    }

    // p - The property set from "properties".
    var p = schema.properties ? Object.keys(schema.properties) : [];

    // pp - The property set from "patternProperties". Elements of this set will be called regexes for convenience.
    var pp = schema.patternProperties ? Object.keys(schema.patternProperties) : [];

    // m - The property name of the child.
    var keys = Object.keys(json),
        idx = keys.length;

    while (idx--) {
        var m = keys[idx],
            propertyValue = json[m];

        // s - The set of schemas for the child instance.
        var s = [];

        // 1. If set "p" contains value "m", then the corresponding schema in "properties" is added to "s".
        if (p.indexOf(m) !== -1) {
            s.push(schema.properties[m]);
        }

        // 2. For each regex in "pp", if it matches "m" successfully, the corresponding schema in "patternProperties" is added to "s".
        var idx2 = pp.length;
        while (idx2--) {
            var regexString = pp[idx2];
            if (RegExp(regexString).test(m) === true) {
                s.push(schema.patternProperties[regexString]);
            }
        }

        // 3. The schema defined by "additionalProperties" is added to "s" if and only if, at this stage, "s" is empty.
        if (s.length === 0 && additionalProperties !== false) {
            s.push(additionalProperties);
        }

        // we are passing tests even without this assert because this is covered by properties check
        // if s is empty in this stage, no additionalProperties are allowed
        // report.expect(s.length !== 0, 'E001', m);

        // Instance property value must pass all schemas from s
        idx2 = s.length;
        while (idx2--) {
            report.path.push(m);
            exports.validate.call(this, report, s[idx2], propertyValue);
            report.path.pop();
        }
    }
};

exports.validate = function (report, schema, json) {

    report.commonErrorMessage = "JSON_OBJECT_VALIDATION_FAILED";

    // check if schema is an object
    var to = Utils.whatIs(schema);
    if (to !== "object") {
        report.addError("SCHEMA_NOT_AN_OBJECT", [to], null, schema.description);
        return false;
    }

    // check if schema is empty, everything is valid against empty schema
    var keys = Object.keys(schema);
    if (keys.length === 0) {
        return true;
    }

    // this method can be called recursively, so we need to remember our root
    var isRoot = false;
    if (!report.rootSchema) {
        report.rootSchema = schema;
        isRoot = true;
    }

    // follow schema.$ref keys
    if (schema.$ref !== undefined) {
        // avoid infinite loop with maxRefs
        var maxRefs = 99;
        while (schema.$ref && maxRefs > 0) {
            if (!schema.__$refResolved) {
                report.addError("REF_UNRESOLVED", [schema.$ref], null, schema.description);
                break;
            } else if (schema.__$refResolved === schema) {
                break;
            } else {
                schema = schema.__$refResolved;
                keys = Object.keys(schema);
            }
            maxRefs--;
        }
        if (maxRefs === 0) {
            throw new Error("Circular dependency by $ref references!");
        }
    }

    // type checking first
    // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.2.2
    var jsonType = Utils.whatIs(json);
    if (schema.type) {
        if (typeof schema.type === "string") {
            if (jsonType !== schema.type && (jsonType !== "integer" || schema.type !== "number")) {
                report.addError("INVALID_TYPE", [schema.type, jsonType], null, schema.description);
                if (this.options.breakOnFirstError) {
                    return false;
                }
            }
        } else {
            if (schema.type.indexOf(jsonType) === -1 && (jsonType !== "integer" || schema.type.indexOf("number") === -1)) {
                report.addError("INVALID_TYPE", [schema.type, jsonType], null, schema.description);
                if (this.options.breakOnFirstError) {
                    return false;
                }
            }
        }
    }

    // now iterate all the keys in schema and execute validation methods
    var idx = keys.length;
    while (idx--) {
        if (JsonValidators[keys[idx]]) {
            JsonValidators[keys[idx]].call(this, report, schema, json);
            if (report.errors.length && this.options.breakOnFirstError) { break; }
        }
    }

    if (report.errors.length === 0 || this.options.breakOnFirstError === false) {
        if (jsonType === "array") {
            recurseArray.call(this, report, schema, json);
        } else if (jsonType === "object") {
            recurseObject.call(this, report, schema, json);
        }
    }

    // we don't need the root pointer anymore
    if (isRoot) {
        report.rootSchema = undefined;
    }

    // return valid just to be able to break at some code points
    return report.errors.length === 0;

};

},{"./FormatValidators":8,"./Report":11,"./Utils":15}],10:[function(require,module,exports){
// Number.isFinite polyfill
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite
if (typeof Number.isFinite !== "function") {
    Number.isFinite = function isFinite(value) {
        // 1. If Type(number) is not Number, return false.
        if (typeof value !== "number") {
            return false;
        }
        // 2. If number is NaN, +∞, or −∞, return false.
        if (value !== value || value === Infinity || value === -Infinity) {
            return false;
        }
        // 3. Otherwise, return true.
        return true;
    };
}

},{}],11:[function(require,module,exports){
(function (process){
"use strict";

var get    = require("lodash.get");
var Errors = require("./Errors");
var Utils  = require("./Utils");

function Report(parentOrOptions, reportOptions) {
    this.parentReport = parentOrOptions instanceof Report ?
                            parentOrOptions :
                            undefined;

    this.options = parentOrOptions instanceof Report ?
                       parentOrOptions.options :
                       parentOrOptions || {};

    this.reportOptions = reportOptions || {};

    this.errors = [];
    this.path = [];
    this.asyncTasks = [];
}

Report.prototype.isValid = function () {
    if (this.asyncTasks.length > 0) {
        throw new Error("Async tasks pending, can't answer isValid");
    }
    return this.errors.length === 0;
};

Report.prototype.addAsyncTask = function (fn, args, asyncTaskResultProcessFn) {
    this.asyncTasks.push([fn, args, asyncTaskResultProcessFn]);
};

Report.prototype.processAsyncTasks = function (timeout, callback) {

    var validationTimeout = timeout || 2000,
        tasksCount        = this.asyncTasks.length,
        idx               = tasksCount,
        timedOut          = false,
        self              = this;

    function finish() {
        process.nextTick(function () {
            var valid = self.errors.length === 0,
                err   = valid ? undefined : self.errors;
            callback(err, valid);
        });
    }

    function respond(asyncTaskResultProcessFn) {
        return function (asyncTaskResult) {
            if (timedOut) { return; }
            asyncTaskResultProcessFn(asyncTaskResult);
            if (--tasksCount === 0) {
                finish();
            }
        };
    }

    if (tasksCount === 0 || this.errors.length > 0) {
        finish();
        return;
    }

    while (idx--) {
        var task = this.asyncTasks[idx];
        task[0].apply(null, task[1].concat(respond(task[2])));
    }

    setTimeout(function () {
        if (tasksCount > 0) {
            timedOut = true;
            self.addError("ASYNC_TIMEOUT", [tasksCount, validationTimeout]);
            callback(self.errors, false);
        }
    }, validationTimeout);

};

Report.prototype.getPath = function () {
    var path = [];
    if (this.parentReport) {
        path = path.concat(this.parentReport.path);
    }
    path = path.concat(this.path);

    if (this.options.reportPathAsArray !== true) {
        // Sanitize the path segments (http://tools.ietf.org/html/rfc6901#section-4)
        path = "#/" + path.map(function (segment) {

            if (Utils.isAbsoluteUri(segment)) {
                return "uri(" + segment + ")";
            }

            return segment.replace(/\~/g, "~0").replace(/\//g, "~1");
        }).join("/");
    }
    return path;
};

Report.prototype.getSchemaId = function () {

    if (!this.rootSchema) {
        return null;
    }

    // get the error path as an array
    var path = [];
    if (this.parentReport) {
        path = path.concat(this.parentReport.path);
    }
    path = path.concat(this.path);

    // try to find id in the error path
    while (path.length > 0) {
        var obj = get(this.rootSchema, path);
        if (obj && obj.id) { return obj.id; }
        path.pop();
    }

    // return id of the root
    return this.rootSchema.id;
};

Report.prototype.hasError = function (errorCode, params) {
    var idx = this.errors.length;
    while (idx--) {
        if (this.errors[idx].code === errorCode) {
            // assume match
            var match = true;

            // check the params too
            var idx2 = this.errors[idx].params.length;
            while (idx2--) {
                if (this.errors[idx].params[idx2] !== params[idx2]) {
                    match = false;
                }
            }

            // if match, return true
            if (match) { return match; }
        }
    }
    return false;
};

Report.prototype.addError = function (errorCode, params, subReports, schemaDescription) {
    if (this.errors.length >= this.reportOptions.maxErrors) {
        return;
    }

    if (!errorCode) { throw new Error("No errorCode passed into addError()"); }
    if (!Errors[errorCode]) { throw new Error("No errorMessage known for code " + errorCode); }

    params = params || [];

    var idx = params.length,
        errorMessage = Errors[errorCode];
    while (idx--) {
        var whatIs = Utils.whatIs(params[idx]);
        var param = (whatIs === "object" || whatIs === "null") ? JSON.stringify(params[idx]) : params[idx];
        errorMessage = errorMessage.replace("{" + idx + "}", param);
    }

    var err = {
        code: errorCode,
        params: params,
        message: errorMessage,
        path: this.getPath(),
        schemaId: this.getSchemaId()
    };

    if (schemaDescription) {
        err.description = schemaDescription;
    }

    if (subReports != null) {
        if (!Array.isArray(subReports)) {
            subReports = [subReports];
        }
        err.inner = [];
        idx = subReports.length;
        while (idx--) {
            var subReport = subReports[idx],
                idx2 = subReport.errors.length;
            while (idx2--) {
                err.inner.push(subReport.errors[idx2]);
            }
        }
        if (err.inner.length === 0) {
            err.inner = undefined;
        }
    }

    this.errors.push(err);
};

module.exports = Report;

}).call(this,require('_process'))
},{"./Errors":7,"./Utils":15,"_process":1,"lodash.get":2}],12:[function(require,module,exports){
"use strict";

var Report              = require("./Report");
var SchemaCompilation   = require("./SchemaCompilation");
var SchemaValidation    = require("./SchemaValidation");
var Utils               = require("./Utils");

function decodeJSONPointer(str) {
    // http://tools.ietf.org/html/draft-ietf-appsawg-json-pointer-07#section-3
    return decodeURIComponent(str).replace(/~[0-1]/g, function (x) {
        return x === "~1" ? "/" : "~";
    });
}

function getRemotePath(uri) {
    var io = uri.indexOf("#");
    return io === -1 ? uri : uri.slice(0, io);
}

function getQueryPath(uri) {
    var io = uri.indexOf("#");
    var res = io === -1 ? undefined : uri.slice(io + 1);
    // WARN: do not slice slash, #/ means take root and go down from it
    // if (res && res[0] === "/") { res = res.slice(1); }
    return res;
}

function findId(schema, id) {
    // process only arrays and objects
    if (typeof schema !== "object" || schema === null) {
        return;
    }

    // no id means root so return itself
    if (!id) {
        return schema;
    }

    if (schema.id) {
        if (schema.id === id || schema.id[0] === "#" && schema.id.substring(1) === id) {
            return schema;
        }
    }

    var idx, result;
    if (Array.isArray(schema)) {
        idx = schema.length;
        while (idx--) {
            result = findId(schema[idx], id);
            if (result) { return result; }
        }
    } else {
        var keys = Object.keys(schema);
        idx = keys.length;
        while (idx--) {
            var k = keys[idx];
            if (k.indexOf("__$") === 0) {
                continue;
            }
            result = findId(schema[k], id);
            if (result) { return result; }
        }
    }
}

exports.cacheSchemaByUri = function (uri, schema) {
    var remotePath = getRemotePath(uri);
    if (remotePath) {
        this.cache[remotePath] = schema;
    }
};

exports.removeFromCacheByUri = function (uri) {
    var remotePath = getRemotePath(uri);
    if (remotePath) {
        delete this.cache[remotePath];
    }
};

exports.checkCacheForUri = function (uri) {
    var remotePath = getRemotePath(uri);
    return remotePath ? this.cache[remotePath] != null : false;
};

exports.getSchema = function (report, schema) {
    if (typeof schema === "object") {
        schema = exports.getSchemaByReference.call(this, report, schema);
    }
    if (typeof schema === "string") {
        schema = exports.getSchemaByUri.call(this, report, schema);
    }
    return schema;
};

exports.getSchemaByReference = function (report, key) {
    var i = this.referenceCache.length;
    while (i--) {
        if (this.referenceCache[i][0] === key) {
            return this.referenceCache[i][1];
        }
    }
    // not found
    var schema = Utils.cloneDeep(key);
    this.referenceCache.push([key, schema]);
    return schema;
};

exports.getSchemaByUri = function (report, uri, root) {
    var remotePath = getRemotePath(uri),
        queryPath = getQueryPath(uri),
        result = remotePath ? this.cache[remotePath] : root;

    if (result && remotePath) {
        // we need to avoid compiling schemas in a recursive loop
        var compileRemote = result !== root;
        // now we need to compile and validate resolved schema (in case it's not already)
        if (compileRemote) {

            report.path.push(remotePath);

            var remoteReport = new Report(report);
            if (SchemaCompilation.compileSchema.call(this, remoteReport, result)) {
                SchemaValidation.validateSchema.call(this, remoteReport, result);
            }
            var remoteReportIsValid = remoteReport.isValid();
            if (!remoteReportIsValid) {
                report.addError("REMOTE_NOT_VALID", [uri], remoteReport);
            }

            report.path.pop();

            if (!remoteReportIsValid) {
                return undefined;
            }
        }
    }

    if (result && queryPath) {
        var parts = queryPath.split("/");
        for (var idx = 0, lim = parts.length; result && idx < lim; idx++) {
            var key = decodeJSONPointer(parts[idx]);
            if (idx === 0) { // it's an id
                result = findId(result, key);
            } else { // it's a path behind id
                result = result[key];
            }
        }
    }

    return result;
};

exports.getRemotePath = getRemotePath;

},{"./Report":11,"./SchemaCompilation":13,"./SchemaValidation":14,"./Utils":15}],13:[function(require,module,exports){
"use strict";

var Report      = require("./Report");
var SchemaCache = require("./SchemaCache");
var Utils       = require("./Utils");

function mergeReference(scope, ref) {
    if (Utils.isAbsoluteUri(ref)) {
        return ref;
    }

    var joinedScope = scope.join(""),
        isScopeAbsolute = Utils.isAbsoluteUri(joinedScope),
        isScopeRelative = Utils.isRelativeUri(joinedScope),
        isRefRelative = Utils.isRelativeUri(ref),
        toRemove;

    if (isScopeAbsolute && isRefRelative) {
        toRemove = joinedScope.match(/\/[^\/]*$/);
        if (toRemove) {
            joinedScope = joinedScope.slice(0, toRemove.index + 1);
        }
    } else if (isScopeRelative && isRefRelative) {
        joinedScope = "";
    } else {
        toRemove = joinedScope.match(/[^#/]+$/);
        if (toRemove) {
            joinedScope = joinedScope.slice(0, toRemove.index);
        }
    }

    var res = joinedScope + ref;
    res = res.replace(/##/, "#");
    return res;
}

function collectReferences(obj, results, scope, path) {
    results = results || [];
    scope = scope || [];
    path = path || [];

    if (typeof obj !== "object" || obj === null) {
        return results;
    }

    if (typeof obj.id === "string") {
        scope.push(obj.id);
    }

    if (typeof obj.$ref === "string" && typeof obj.__$refResolved === "undefined") {
        results.push({
            ref: mergeReference(scope, obj.$ref),
            key: "$ref",
            obj: obj,
            path: path.slice(0)
        });
    }
    if (typeof obj.$schema === "string" && typeof obj.__$schemaResolved === "undefined") {
        results.push({
            ref: mergeReference(scope, obj.$schema),
            key: "$schema",
            obj: obj,
            path: path.slice(0)
        });
    }

    var idx;
    if (Array.isArray(obj)) {
        idx = obj.length;
        while (idx--) {
            path.push(idx.toString());
            collectReferences(obj[idx], results, scope, path);
            path.pop();
        }
    } else {
        var keys = Object.keys(obj);
        idx = keys.length;
        while (idx--) {
            // do not recurse through resolved references and other z-schema props
            if (keys[idx].indexOf("__$") === 0) { continue; }
            path.push(keys[idx]);
            collectReferences(obj[keys[idx]], results, scope, path);
            path.pop();
        }
    }

    if (typeof obj.id === "string") {
        scope.pop();
    }

    return results;
}

var compileArrayOfSchemasLoop = function (mainReport, arr) {
    var idx = arr.length,
        compiledCount = 0;

    while (idx--) {

        // try to compile each schema separately
        var report = new Report(mainReport);
        var isValid = exports.compileSchema.call(this, report, arr[idx]);
        if (isValid) { compiledCount++; }

        // copy errors to report
        mainReport.errors = mainReport.errors.concat(report.errors);

    }

    return compiledCount;
};

function findId(arr, id) {
    var idx = arr.length;
    while (idx--) {
        if (arr[idx].id === id) {
            return arr[idx];
        }
    }
    return null;
}

var compileArrayOfSchemas = function (report, arr) {

    var compiled = 0,
        lastLoopCompiled;

    do {

        // remove all UNRESOLVABLE_REFERENCE errors before compiling array again
        var idx = report.errors.length;
        while (idx--) {
            if (report.errors[idx].code === "UNRESOLVABLE_REFERENCE") {
                report.errors.splice(idx, 1);
            }
        }

        // remember how many were compiled in the last loop
        lastLoopCompiled = compiled;

        // count how many are compiled now
        compiled = compileArrayOfSchemasLoop.call(this, report, arr);

        // fix __$missingReferences if possible
        idx = arr.length;
        while (idx--) {
            var sch = arr[idx];
            if (sch.__$missingReferences) {
                var idx2 = sch.__$missingReferences.length;
                while (idx2--) {
                    var refObj = sch.__$missingReferences[idx2];
                    var response = findId(arr, refObj.ref);
                    if (response) {
                        // this might create circular references
                        refObj.obj["__" + refObj.key + "Resolved"] = response;
                        // it's resolved now so delete it
                        sch.__$missingReferences.splice(idx2, 1);
                    }
                }
                if (sch.__$missingReferences.length === 0) {
                    delete sch.__$missingReferences;
                }
            }
        }

        // keep repeating if not all compiled and at least one more was compiled in the last loop
    } while (compiled !== arr.length && compiled !== lastLoopCompiled);

    return report.isValid();

};

exports.compileSchema = function (report, schema) {

    report.commonErrorMessage = "SCHEMA_COMPILATION_FAILED";

    // if schema is a string, assume it's a uri
    if (typeof schema === "string") {
        var loadedSchema = SchemaCache.getSchemaByUri.call(this, report, schema);
        if (!loadedSchema) {
            report.addError("SCHEMA_NOT_REACHABLE", [schema]);
            return false;
        }
        schema = loadedSchema;
    }

    // if schema is an array, assume it's an array of schemas
    if (Array.isArray(schema)) {
        return compileArrayOfSchemas.call(this, report, schema);
    }

    // if we have an id than it should be cached already (if this instance has compiled it)
    if (schema.__$compiled && schema.id && SchemaCache.checkCacheForUri.call(this, schema.id) === false) {
        schema.__$compiled = undefined;
    }

    // do not re-compile schemas
    if (schema.__$compiled) {
        return true;
    }

    if (schema.id && typeof schema.id === "string") {
        // add this to our schemaCache (before compilation in case we have references including id)
        SchemaCache.cacheSchemaByUri.call(this, schema.id, schema);
    }

    // this method can be called recursively, so we need to remember our root
    var isRoot = false;
    if (!report.rootSchema) {
        report.rootSchema = schema;
        isRoot = true;
    }

    // delete all __$missingReferences from previous compilation attempts
    var isValidExceptReferences = report.isValid();
    delete schema.__$missingReferences;

    // collect all references that need to be resolved - $ref and $schema
    var refs = collectReferences.call(this, schema),
        idx = refs.length;
    while (idx--) {
        // resolve all the collected references into __xxxResolved pointer
        var refObj = refs[idx];
        var response = SchemaCache.getSchemaByUri.call(this, report, refObj.ref, schema);

        // we can try to use custom schemaReader if available
        if (!response) {
            var schemaReader = this.getSchemaReader();
            if (schemaReader) {
                // it's supposed to return a valid schema
                var s = schemaReader(refObj.ref);
                if (s) {
                    // it needs to have the id
                    s.id = refObj.ref;
                    // try to compile the schema
                    var subreport = new Report(report);
                    if (!exports.compileSchema.call(this, subreport, s)) {
                        // copy errors to report
                        report.errors = report.errors.concat(subreport.errors);
                    } else {
                        response = SchemaCache.getSchemaByUri.call(this, report, refObj.ref, schema);
                    }
                }
            }
        }

        if (!response) {

            var hasNotValid = report.hasError("REMOTE_NOT_VALID", [refObj.ref]);
            var isAbsolute = Utils.isAbsoluteUri(refObj.ref);
            var isDownloaded = false;
            var ignoreUnresolvableRemotes = this.options.ignoreUnresolvableReferences === true;

            if (isAbsolute) {
                // we shouldn't add UNRESOLVABLE_REFERENCE for schemas we already have downloaded
                // and set through setRemoteReference method
                isDownloaded = SchemaCache.checkCacheForUri.call(this, refObj.ref);
            }

            if (hasNotValid) {
                // already has REMOTE_NOT_VALID error for this one
            } else if (ignoreUnresolvableRemotes && isAbsolute) {
                // ignoreUnresolvableRemotes is on and remote isAbsolute
            } else if (isDownloaded) {
                // remote is downloaded, so no UNRESOLVABLE_REFERENCE
            } else {
                Array.prototype.push.apply(report.path, refObj.path);
                report.addError("UNRESOLVABLE_REFERENCE", [refObj.ref]);
                report.path = report.path.slice(0, -refObj.path.length);

                // pusblish unresolved references out
                if (isValidExceptReferences) {
                    schema.__$missingReferences = schema.__$missingReferences || [];
                    schema.__$missingReferences.push(refObj);
                }
            }
        }
        // this might create circular references
        refObj.obj["__" + refObj.key + "Resolved"] = response;
    }

    var isValid = report.isValid();
    if (isValid) {
        schema.__$compiled = true;
    } else {
        if (schema.id && typeof schema.id === "string") {
            // remove this schema from schemaCache because it failed to compile
            SchemaCache.removeFromCacheByUri.call(this, schema.id);
        }
    }

    // we don't need the root pointer anymore
    if (isRoot) {
        report.rootSchema = undefined;
    }

    return isValid;

};

},{"./Report":11,"./SchemaCache":12,"./Utils":15}],14:[function(require,module,exports){
"use strict";

var FormatValidators = require("./FormatValidators"),
    JsonValidation   = require("./JsonValidation"),
    Report           = require("./Report"),
    Utils            = require("./Utils");

var SchemaValidators = {
    $ref: function (report, schema) {
        // http://tools.ietf.org/html/draft-ietf-appsawg-json-pointer-07
        // http://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03
        if (typeof schema.$ref !== "string") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["$ref", "string"]);
        }
    },
    $schema: function (report, schema) {
        // http://json-schema.org/latest/json-schema-core.html#rfc.section.6
        if (typeof schema.$schema !== "string") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["$schema", "string"]);
        }
    },
    multipleOf: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.1.1
        if (typeof schema.multipleOf !== "number") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["multipleOf", "number"]);
        } else if (schema.multipleOf <= 0) {
            report.addError("KEYWORD_MUST_BE", ["multipleOf", "strictly greater than 0"]);
        }
    },
    maximum: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.2.1
        if (typeof schema.maximum !== "number") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["maximum", "number"]);
        }
    },
    exclusiveMaximum: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.2.1
        if (typeof schema.exclusiveMaximum !== "boolean") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["exclusiveMaximum", "boolean"]);
        } else if (schema.maximum === undefined) {
            report.addError("KEYWORD_DEPENDENCY", ["exclusiveMaximum", "maximum"]);
        }
    },
    minimum: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.3.1
        if (typeof schema.minimum !== "number") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["minimum", "number"]);
        }
    },
    exclusiveMinimum: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.3.1
        if (typeof schema.exclusiveMinimum !== "boolean") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["exclusiveMinimum", "boolean"]);
        } else if (schema.minimum === undefined) {
            report.addError("KEYWORD_DEPENDENCY", ["exclusiveMinimum", "minimum"]);
        }
    },
    maxLength: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.2.1.1
        if (Utils.whatIs(schema.maxLength) !== "integer") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["maxLength", "integer"]);
        } else if (schema.maxLength < 0) {
            report.addError("KEYWORD_MUST_BE", ["maxLength", "greater than, or equal to 0"]);
        }
    },
    minLength: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.2.2.1
        if (Utils.whatIs(schema.minLength) !== "integer") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["minLength", "integer"]);
        } else if (schema.minLength < 0) {
            report.addError("KEYWORD_MUST_BE", ["minLength", "greater than, or equal to 0"]);
        }
    },
    pattern: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.2.3.1
        if (typeof schema.pattern !== "string") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["pattern", "string"]);
        } else {
            try {
                RegExp(schema.pattern);
            } catch (e) {
                report.addError("KEYWORD_PATTERN", ["pattern", schema.pattern]);
            }
        }
    },
    additionalItems: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.1.1
        var type = Utils.whatIs(schema.additionalItems);
        if (type !== "boolean" && type !== "object") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["additionalItems", ["boolean", "object"]]);
        } else if (type === "object") {
            report.path.push("additionalItems");
            exports.validateSchema.call(this, report, schema.additionalItems);
            report.path.pop();
        }
    },
    items: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.1.1
        var type = Utils.whatIs(schema.items);

        if (type === "object") {
            report.path.push("items");
            exports.validateSchema.call(this, report, schema.items);
            report.path.pop();
        } else if (type === "array") {
            var idx = schema.items.length;
            while (idx--) {
                report.path.push("items");
                report.path.push(idx.toString());
                exports.validateSchema.call(this, report, schema.items[idx]);
                report.path.pop();
                report.path.pop();
            }
        } else {
            report.addError("KEYWORD_TYPE_EXPECTED", ["items", ["array", "object"]]);
        }

        // custom - strict mode
        if (this.options.forceAdditional === true && schema.additionalItems === undefined && Array.isArray(schema.items)) {
            report.addError("KEYWORD_UNDEFINED_STRICT", ["additionalItems"]);
        }
        // custome - assume defined false mode
        if (this.options.assumeAdditional && schema.additionalItems === undefined && Array.isArray(schema.items)) {
            schema.additionalItems = false;
        }
    },
    maxItems: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.2.1
        if (typeof schema.maxItems !== "number") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["maxItems", "integer"]);
        } else if (schema.maxItems < 0) {
            report.addError("KEYWORD_MUST_BE", ["maxItems", "greater than, or equal to 0"]);
        }
    },
    minItems: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.3.1
        if (Utils.whatIs(schema.minItems) !== "integer") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["minItems", "integer"]);
        } else if (schema.minItems < 0) {
            report.addError("KEYWORD_MUST_BE", ["minItems", "greater than, or equal to 0"]);
        }
    },
    uniqueItems: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.4.1
        if (typeof schema.uniqueItems !== "boolean") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["uniqueItems", "boolean"]);
        }
    },
    maxProperties: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.1.1
        if (Utils.whatIs(schema.maxProperties) !== "integer") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["maxProperties", "integer"]);
        } else if (schema.maxProperties < 0) {
            report.addError("KEYWORD_MUST_BE", ["maxProperties", "greater than, or equal to 0"]);
        }
    },
    minProperties: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.2.1
        if (Utils.whatIs(schema.minProperties) !== "integer") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["minProperties", "integer"]);
        } else if (schema.minProperties < 0) {
            report.addError("KEYWORD_MUST_BE", ["minProperties", "greater than, or equal to 0"]);
        }
    },
    required: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.3.1
        if (Utils.whatIs(schema.required) !== "array") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["required", "array"]);
        } else if (schema.required.length === 0) {
            report.addError("KEYWORD_MUST_BE", ["required", "an array with at least one element"]);
        } else {
            var idx = schema.required.length;
            while (idx--) {
                if (typeof schema.required[idx] !== "string") {
                    report.addError("KEYWORD_VALUE_TYPE", ["required", "string"]);
                }
            }
            if (Utils.isUniqueArray(schema.required) === false) {
                report.addError("KEYWORD_MUST_BE", ["required", "an array with unique items"]);
            }
        }
    },
    additionalProperties: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.4.1
        var type = Utils.whatIs(schema.additionalProperties);
        if (type !== "boolean" && type !== "object") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["additionalProperties", ["boolean", "object"]]);
        } else if (type === "object") {
            report.path.push("additionalProperties");
            exports.validateSchema.call(this, report, schema.additionalProperties);
            report.path.pop();
        }
    },
    properties: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.4.1
        if (Utils.whatIs(schema.properties) !== "object") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["properties", "object"]);
            return;
        }

        var keys = Object.keys(schema.properties),
            idx = keys.length;
        while (idx--) {
            var key = keys[idx],
                val = schema.properties[key];
            report.path.push("properties");
            report.path.push(key);
            exports.validateSchema.call(this, report, val);
            report.path.pop();
            report.path.pop();
        }

        // custom - strict mode
        if (this.options.forceAdditional === true && schema.additionalProperties === undefined) {
            report.addError("KEYWORD_UNDEFINED_STRICT", ["additionalProperties"]);
        }
        // custome - assume defined false mode
        if (this.options.assumeAdditional && schema.additionalProperties === undefined) {
            schema.additionalProperties = false;
        }
        // custom - forceProperties
        if (this.options.forceProperties === true && keys.length === 0) {
            report.addError("CUSTOM_MODE_FORCE_PROPERTIES", ["properties"]);
        }
    },
    patternProperties: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.4.1
        if (Utils.whatIs(schema.patternProperties) !== "object") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["patternProperties", "object"]);
            return;
        }

        var keys = Object.keys(schema.patternProperties),
            idx = keys.length;
        while (idx--) {
            var key = keys[idx],
                val = schema.patternProperties[key];
            try {
                RegExp(key);
            } catch (e) {
                report.addError("KEYWORD_PATTERN", ["patternProperties", key]);
            }
            report.path.push("patternProperties");
            report.path.push(key.toString());
            exports.validateSchema.call(this, report, val);
            report.path.pop();
            report.path.pop();
        }

        // custom - forceProperties
        if (this.options.forceProperties === true && keys.length === 0) {
            report.addError("CUSTOM_MODE_FORCE_PROPERTIES", ["patternProperties"]);
        }
    },
    dependencies: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.5.1
        if (Utils.whatIs(schema.dependencies) !== "object") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["dependencies", "object"]);
        } else {
            var keys = Object.keys(schema.dependencies),
                idx = keys.length;
            while (idx--) {
                var schemaKey = keys[idx],
                    schemaDependency = schema.dependencies[schemaKey],
                    type = Utils.whatIs(schemaDependency);

                if (type === "object") {
                    report.path.push("dependencies");
                    report.path.push(schemaKey);
                    exports.validateSchema.call(this, report, schemaDependency);
                    report.path.pop();
                    report.path.pop();
                } else if (type === "array") {
                    var idx2 = schemaDependency.length;
                    if (idx2 === 0) {
                        report.addError("KEYWORD_MUST_BE", ["dependencies", "not empty array"]);
                    }
                    while (idx2--) {
                        if (typeof schemaDependency[idx2] !== "string") {
                            report.addError("KEYWORD_VALUE_TYPE", ["dependensices", "string"]);
                        }
                    }
                    if (Utils.isUniqueArray(schemaDependency) === false) {
                        report.addError("KEYWORD_MUST_BE", ["dependencies", "an array with unique items"]);
                    }
                } else {
                    report.addError("KEYWORD_VALUE_TYPE", ["dependencies", "object or array"]);
                }
            }
        }
    },
    enum: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.1.1
        if (Array.isArray(schema.enum) === false) {
            report.addError("KEYWORD_TYPE_EXPECTED", ["enum", "array"]);
        } else if (schema.enum.length === 0) {
            report.addError("KEYWORD_MUST_BE", ["enum", "an array with at least one element"]);
        } else if (Utils.isUniqueArray(schema.enum) === false) {
            report.addError("KEYWORD_MUST_BE", ["enum", "an array with unique elements"]);
        }
    },
    type: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.2.1
        var primitiveTypes = ["array", "boolean", "integer", "number", "null", "object", "string"],
            primitiveTypeStr = primitiveTypes.join(","),
            isArray = Array.isArray(schema.type);

        if (isArray) {
            var idx = schema.type.length;
            while (idx--) {
                if (primitiveTypes.indexOf(schema.type[idx]) === -1) {
                    report.addError("KEYWORD_TYPE_EXPECTED", ["type", primitiveTypeStr]);
                }
            }
            if (Utils.isUniqueArray(schema.type) === false) {
                report.addError("KEYWORD_MUST_BE", ["type", "an object with unique properties"]);
            }
        } else if (typeof schema.type === "string") {
            if (primitiveTypes.indexOf(schema.type) === -1) {
                report.addError("KEYWORD_TYPE_EXPECTED", ["type", primitiveTypeStr]);
            }
        } else {
            report.addError("KEYWORD_TYPE_EXPECTED", ["type", ["string", "array"]]);
        }

        if (this.options.noEmptyStrings === true) {
            if (schema.type === "string" || isArray && schema.type.indexOf("string") !== -1) {
                if (schema.minLength === undefined &&
                    schema.enum === undefined &&
                    schema.format === undefined) {

                    schema.minLength = 1;
                }
            }
        }
        if (this.options.noEmptyArrays === true) {
            if (schema.type === "array" || isArray && schema.type.indexOf("array") !== -1) {
                if (schema.minItems === undefined) {
                    schema.minItems = 1;
                }
            }
        }
        if (this.options.forceProperties === true) {
            if (schema.type === "object" || isArray && schema.type.indexOf("object") !== -1) {
                if (schema.properties === undefined && schema.patternProperties === undefined) {
                    report.addError("KEYWORD_UNDEFINED_STRICT", ["properties"]);
                }
            }
        }
        if (this.options.forceItems === true) {
            if (schema.type === "array" || isArray && schema.type.indexOf("array") !== -1) {
                if (schema.items === undefined) {
                    report.addError("KEYWORD_UNDEFINED_STRICT", ["items"]);
                }
            }
        }
        if (this.options.forceMinItems === true) {
            if (schema.type === "array" || isArray && schema.type.indexOf("array") !== -1) {
                if (schema.minItems === undefined) {
                    report.addError("KEYWORD_UNDEFINED_STRICT", ["minItems"]);
                }
            }
        }
        if (this.options.forceMaxItems === true) {
            if (schema.type === "array" || isArray && schema.type.indexOf("array") !== -1) {
                if (schema.maxItems === undefined) {
                    report.addError("KEYWORD_UNDEFINED_STRICT", ["maxItems"]);
                }
            }
        }
        if (this.options.forceMinLength === true) {
            if (schema.type === "string" || isArray && schema.type.indexOf("string") !== -1) {
                if (schema.minLength === undefined &&
                    schema.format === undefined &&
                    schema.enum === undefined &&
                    schema.pattern === undefined) {
                    report.addError("KEYWORD_UNDEFINED_STRICT", ["minLength"]);
                }
            }
        }
        if (this.options.forceMaxLength === true) {
            if (schema.type === "string" || isArray && schema.type.indexOf("string") !== -1) {
                if (schema.maxLength === undefined &&
                    schema.format === undefined &&
                    schema.enum === undefined &&
                    schema.pattern === undefined) {
                    report.addError("KEYWORD_UNDEFINED_STRICT", ["maxLength"]);
                }
            }
        }
    },
    allOf: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.3.1
        if (Array.isArray(schema.allOf) === false) {
            report.addError("KEYWORD_TYPE_EXPECTED", ["allOf", "array"]);
        } else if (schema.allOf.length === 0) {
            report.addError("KEYWORD_MUST_BE", ["allOf", "an array with at least one element"]);
        } else {
            var idx = schema.allOf.length;
            while (idx--) {
                report.path.push("allOf");
                report.path.push(idx.toString());
                exports.validateSchema.call(this, report, schema.allOf[idx]);
                report.path.pop();
                report.path.pop();
            }
        }
    },
    anyOf: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.4.1
        if (Array.isArray(schema.anyOf) === false) {
            report.addError("KEYWORD_TYPE_EXPECTED", ["anyOf", "array"]);
        } else if (schema.anyOf.length === 0) {
            report.addError("KEYWORD_MUST_BE", ["anyOf", "an array with at least one element"]);
        } else {
            var idx = schema.anyOf.length;
            while (idx--) {
                report.path.push("anyOf");
                report.path.push(idx.toString());
                exports.validateSchema.call(this, report, schema.anyOf[idx]);
                report.path.pop();
                report.path.pop();
            }
        }
    },
    oneOf: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.5.1
        if (Array.isArray(schema.oneOf) === false) {
            report.addError("KEYWORD_TYPE_EXPECTED", ["oneOf", "array"]);
        } else if (schema.oneOf.length === 0) {
            report.addError("KEYWORD_MUST_BE", ["oneOf", "an array with at least one element"]);
        } else {
            var idx = schema.oneOf.length;
            while (idx--) {
                report.path.push("oneOf");
                report.path.push(idx.toString());
                exports.validateSchema.call(this, report, schema.oneOf[idx]);
                report.path.pop();
                report.path.pop();
            }
        }
    },
    not: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.6.1
        if (Utils.whatIs(schema.not) !== "object") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["not", "object"]);
        } else {
            report.path.push("not");
            exports.validateSchema.call(this, report, schema.not);
            report.path.pop();
        }
    },
    definitions: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.7.1
        if (Utils.whatIs(schema.definitions) !== "object") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["definitions", "object"]);
        } else {
            var keys = Object.keys(schema.definitions),
                idx = keys.length;
            while (idx--) {
                var key = keys[idx],
                    val = schema.definitions[key];
                report.path.push("definitions");
                report.path.push(key);
                exports.validateSchema.call(this, report, val);
                report.path.pop();
                report.path.pop();
            }
        }
    },
    format: function (report, schema) {
        if (typeof schema.format !== "string") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["format", "string"]);
        } else {
            if (FormatValidators[schema.format] === undefined && this.options.ignoreUnknownFormats !== true) {
                report.addError("UNKNOWN_FORMAT", [schema.format]);
            }
        }
    },
    id: function (report, schema) {
        // http://json-schema.org/latest/json-schema-core.html#rfc.section.7.2
        if (typeof schema.id !== "string") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["id", "string"]);
        }
    },
    title: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.1
        if (typeof schema.title !== "string") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["title", "string"]);
        }
    },
    description: function (report, schema) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.1
        if (typeof schema.description !== "string") {
            report.addError("KEYWORD_TYPE_EXPECTED", ["description", "string"]);
        }
    },
    "default": function (/* report, schema */) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.2
        // There are no restrictions placed on the value of this keyword.
    }
};

var validateArrayOfSchemas = function (report, arr) {
    var idx = arr.length;
    while (idx--) {
        exports.validateSchema.call(this, report, arr[idx]);
    }
    return report.isValid();
};

exports.validateSchema = function (report, schema) {

    report.commonErrorMessage = "SCHEMA_VALIDATION_FAILED";

    // if schema is an array, assume it's an array of schemas
    if (Array.isArray(schema)) {
        return validateArrayOfSchemas.call(this, report, schema);
    }

    // do not revalidate schema that has already been validated once
    if (schema.__$validated) {
        return true;
    }

    // if $schema is present, this schema should validate against that $schema
    var hasParentSchema = schema.$schema && schema.id !== schema.$schema;
    if (hasParentSchema) {
        if (schema.__$schemaResolved && schema.__$schemaResolved !== schema) {
            var subReport = new Report(report);
            var valid = JsonValidation.validate.call(this, subReport, schema.__$schemaResolved, schema);
            if (valid === false) {
                report.addError("PARENT_SCHEMA_VALIDATION_FAILED", null, subReport);
            }
        } else {
            if (this.options.ignoreUnresolvableReferences !== true) {
                report.addError("REF_UNRESOLVED", [schema.$schema]);
            }
        }
    }

    if (this.options.noTypeless === true) {
        // issue #36 - inherit type to anyOf, oneOf, allOf if noTypeless is defined
        if (schema.type !== undefined) {
            var schemas = [];
            if (Array.isArray(schema.anyOf)) { schemas = schemas.concat(schema.anyOf); }
            if (Array.isArray(schema.oneOf)) { schemas = schemas.concat(schema.oneOf); }
            if (Array.isArray(schema.allOf)) { schemas = schemas.concat(schema.allOf); }
            schemas.forEach(function (sch) {
                if (!sch.type) { sch.type = schema.type; }
            });
        }
        // end issue #36
        if (schema.enum === undefined &&
            schema.type === undefined &&
            schema.anyOf === undefined &&
            schema.oneOf === undefined &&
            schema.not === undefined &&
            schema.$ref === undefined) {
            report.addError("KEYWORD_UNDEFINED_STRICT", ["type"]);
        }
    }

    var keys = Object.keys(schema),
        idx = keys.length;
    while (idx--) {
        var key = keys[idx];
        if (key.indexOf("__") === 0) { continue; }
        if (SchemaValidators[key] !== undefined) {
            SchemaValidators[key].call(this, report, schema);
        } else if (!hasParentSchema) {
            if (this.options.noExtraKeywords === true) {
                report.addError("KEYWORD_UNEXPECTED", [key]);
            }
        }
    }

    if (this.options.pedanticCheck === true) {
        if (schema.enum) {
            // break recursion
            var tmpSchema = Utils.clone(schema);
            delete tmpSchema.enum;
            delete tmpSchema.default;

            report.path.push("enum");
            idx = schema.enum.length;
            while (idx--) {
                report.path.push(idx.toString());
                JsonValidation.validate.call(this, report, tmpSchema, schema.enum[idx]);
                report.path.pop();
            }
            report.path.pop();
        }

        if (schema.default) {
            report.path.push("default");
            JsonValidation.validate.call(this, report, schema, schema.default);
            report.path.pop();
        }
    }

    var isValid = report.isValid();
    if (isValid) {
        schema.__$validated = true;
    }
    return isValid;
};

},{"./FormatValidators":8,"./JsonValidation":9,"./Report":11,"./Utils":15}],15:[function(require,module,exports){
"use strict";

exports.isAbsoluteUri = function (uri) {
    return /^https?:\/\//.test(uri);
};

exports.isRelativeUri = function (uri) {
    // relative URIs that end with a hash sign, issue #56
    return /.+#/.test(uri);
};

exports.whatIs = function (what) {

    var to = typeof what;

    if (to === "object") {
        if (what === null) {
            return "null";
        }
        if (Array.isArray(what)) {
            return "array";
        }
        return "object"; // typeof what === 'object' && what === Object(what) && !Array.isArray(what);
    }

    if (to === "number") {
        if (Number.isFinite(what)) {
            if (what % 1 === 0) {
                return "integer";
            } else {
                return "number";
            }
        }
        if (Number.isNaN(what)) {
            return "not-a-number";
        }
        return "unknown-number";
    }

    return to; // undefined, boolean, string, function

};

exports.areEqual = function areEqual(json1, json2) {
    // http://json-schema.org/latest/json-schema-core.html#rfc.section.3.6

    // Two JSON values are said to be equal if and only if:
    // both are nulls; or
    // both are booleans, and have the same value; or
    // both are strings, and have the same value; or
    // both are numbers, and have the same mathematical value; or
    if (json1 === json2) {
        return true;
    }

    var i, len;

    // both are arrays, and:
    if (Array.isArray(json1) && Array.isArray(json2)) {
        // have the same number of items; and
        if (json1.length !== json2.length) {
            return false;
        }
        // items at the same index are equal according to this definition; or
        len = json1.length;
        for (i = 0; i < len; i++) {
            if (!areEqual(json1[i], json2[i])) {
                return false;
            }
        }
        return true;
    }

    // both are objects, and:
    if (exports.whatIs(json1) === "object" && exports.whatIs(json2) === "object") {
        // have the same set of property names; and
        var keys1 = Object.keys(json1);
        var keys2 = Object.keys(json2);
        if (!areEqual(keys1, keys2)) {
            return false;
        }
        // values for a same property name are equal according to this definition.
        len = keys1.length;
        for (i = 0; i < len; i++) {
            if (!areEqual(json1[keys1[i]], json2[keys1[i]])) {
                return false;
            }
        }
        return true;
    }

    return false;
};

exports.isUniqueArray = function (arr, indexes) {
    var i, j, l = arr.length;
    for (i = 0; i < l; i++) {
        for (j = i + 1; j < l; j++) {
            if (exports.areEqual(arr[i], arr[j])) {
                if (indexes) { indexes.push(i, j); }
                return false;
            }
        }
    }
    return true;
};

exports.difference = function (bigSet, subSet) {
    var arr = [],
        idx = bigSet.length;
    while (idx--) {
        if (subSet.indexOf(bigSet[idx]) === -1) {
            arr.push(bigSet[idx]);
        }
    }
    return arr;
};

// NOT a deep version of clone
exports.clone = function (src) {
    if (typeof src === "undefined") { return void 0; }
    if (typeof src !== "object" || src === null) { return src; }
    var res, idx;
    if (Array.isArray(src)) {
        res = [];
        idx = src.length;
        while (idx--) {
            res[idx] = src[idx];
        }
    } else {
        res = {};
        var keys = Object.keys(src);
        idx = keys.length;
        while (idx--) {
            var key = keys[idx];
            res[key] = src[key];
        }
    }
    return res;
};

exports.cloneDeep = function (src) {
    var visited = [], cloned = [];
    function cloneDeep(src) {
        if (typeof src !== "object" || src === null) { return src; }
        var res, idx, cidx;

        cidx = visited.indexOf(src);
        if (cidx !== -1) { return cloned[cidx]; }

        visited.push(src);
        if (Array.isArray(src)) {
            res = [];
            cloned.push(res);
            idx = src.length;
            while (idx--) {
                res[idx] = cloneDeep(src[idx]);
            }
        } else {
            res = {};
            cloned.push(res);
            var keys = Object.keys(src);
            idx = keys.length;
            while (idx--) {
                var key = keys[idx];
                res[key] = cloneDeep(src[key]);
            }
        }
        return res;
    }
    return cloneDeep(src);
};

/*
  following function comes from punycode.js library
  see: https://github.com/bestiejs/punycode.js
*/
/*jshint -W016*/
/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
exports.ucs2decode = function (string) {
    var output = [],
        counter = 0,
        length = string.length,
        value,
        extra;
    while (counter < length) {
        value = string.charCodeAt(counter++);
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
            // high surrogate, and there is a next character
            extra = string.charCodeAt(counter++);
            if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
            } else {
                // unmatched surrogate; only append this code unit, in case the next
                // code unit is the high surrogate of a surrogate pair
                output.push(value);
                counter--;
            }
        } else {
            output.push(value);
        }
    }
    return output;
};
/*jshint +W016*/

},{}],16:[function(require,module,exports){
(function (process){
"use strict";

require("./Polyfills");
var get               = require("lodash.get");
var Report            = require("./Report");
var FormatValidators  = require("./FormatValidators");
var JsonValidation    = require("./JsonValidation");
var SchemaCache       = require("./SchemaCache");
var SchemaCompilation = require("./SchemaCompilation");
var SchemaValidation  = require("./SchemaValidation");
var Utils             = require("./Utils");
var Draft4Schema      = require("./schemas/schema.json");
var Draft4HyperSchema = require("./schemas/hyper-schema.json");

/*
    default options
*/
var defaultOptions = {
    // default timeout for all async tasks
    asyncTimeout: 2000,
    // force additionalProperties and additionalItems to be defined on "object" and "array" types
    forceAdditional: false,
    // assume additionalProperties and additionalItems are defined as "false" where appropriate
    assumeAdditional: false,
    // force items to be defined on "array" types
    forceItems: false,
    // force minItems to be defined on "array" types
    forceMinItems: false,
    // force maxItems to be defined on "array" types
    forceMaxItems: false,
    // force minLength to be defined on "string" types
    forceMinLength: false,
    // force maxLength to be defined on "string" types
    forceMaxLength: false,
    // force properties or patternProperties to be defined on "object" types
    forceProperties: false,
    // ignore references that cannot be resolved (remote schemas) // TODO: make sure this is only for remote schemas, not local ones
    ignoreUnresolvableReferences: false,
    // disallow usage of keywords that this validator can't handle
    noExtraKeywords: false,
    // disallow usage of schema's without "type" defined
    noTypeless: false,
    // disallow zero length strings in validated objects
    noEmptyStrings: false,
    // disallow zero length arrays in validated objects
    noEmptyArrays: false,
    // forces "uri" format to be in fully rfc3986 compliant
    strictUris: false,
    // turn on some of the above
    strictMode: false,
    // report error paths as an array of path segments to get to the offending node
    reportPathAsArray: false,
    // stops validation as soon as an error is found, true by default but can be turned off
    breakOnFirstError: true,
    // check if schema follow best practices and common sence
    pedanticCheck: false,
    // ignore unknown formats (do not report them as an error)
    ignoreUnknownFormats: false
};

/*
    constructor
*/
function ZSchema(options) {
    this.cache = {};
    this.referenceCache = [];

    this.setRemoteReference("http://json-schema.org/draft-04/schema", Draft4Schema);
    this.setRemoteReference("http://json-schema.org/draft-04/hyper-schema", Draft4HyperSchema);

    // options
    if (typeof options === "object") {
        var keys = Object.keys(options),
            idx = keys.length,
            key;

        // check that the options are correctly configured
        while (idx--) {
            key = keys[idx];
            if (defaultOptions[key] === undefined) {
                throw new Error("Unexpected option passed to constructor: " + key);
            }
        }

        // copy the default options into passed options
        keys = Object.keys(defaultOptions);
        idx = keys.length;
        while (idx--) {
            key = keys[idx];
            if (options[key] === undefined) {
                options[key] = Utils.clone(defaultOptions[key]);
            }
        }

        this.options = options;
    } else {
        this.options = Utils.clone(defaultOptions);
    }

    if (this.options.strictMode === true) {
        this.options.forceAdditional  = true;
        this.options.forceItems       = true;
        this.options.forceMaxLength   = true;
        this.options.forceProperties  = true;
        this.options.noExtraKeywords  = true;
        this.options.noTypeless       = true;
        this.options.noEmptyStrings   = true;
        this.options.noEmptyArrays    = true;
    }

}

/*
    instance methods
*/
ZSchema.prototype.compileSchema = function (schema) {
    var report = new Report(this.options);

    schema = SchemaCache.getSchema.call(this, report, schema);

    SchemaCompilation.compileSchema.call(this, report, schema);

    this.lastReport = report;
    return report.isValid();
};
ZSchema.prototype.validateSchema = function (schema) {
    if (Array.isArray(schema) && schema.length === 0) {
        throw new Error(".validateSchema was called with an empty array");
    }

    var report = new Report(this.options);

    schema = SchemaCache.getSchema.call(this, report, schema);

    var compiled = SchemaCompilation.compileSchema.call(this, report, schema);
    if (compiled) { SchemaValidation.validateSchema.call(this, report, schema); }

    this.lastReport = report;
    return report.isValid();
};
ZSchema.prototype.validate = function (json, schema, options, callback) {

    if (Utils.whatIs(options) === "function") {
        callback = options;
        options = {};
    }
    if (!options) { options = {}; }

    var whatIs = Utils.whatIs(schema);
    if (whatIs !== "string" && whatIs !== "object") {
        var e = new Error("Invalid .validate call - schema must be an string or object but " + whatIs + " was passed!");
        if (callback) {
            process.nextTick(function () {
                callback(e, false);
            });
            return;
        }
        throw e;
    }

    var foundError = false;
    var report = new Report(this.options);

    if (typeof schema === "string") {
        var schemaName = schema;
        schema = SchemaCache.getSchema.call(this, report, schemaName);
        if (!schema) {
            throw new Error("Schema with id '" + schemaName + "' wasn't found in the validator cache!");
        }
    } else {
        schema = SchemaCache.getSchema.call(this, report, schema);
    }

    var compiled = false;
    if (!foundError) {
        compiled = SchemaCompilation.compileSchema.call(this, report, schema);
    }
    if (!compiled) {
        this.lastReport = report;
        foundError = true;
    }

    var validated = false;
    if (!foundError) {
        validated = SchemaValidation.validateSchema.call(this, report, schema);
    }
    if (!validated) {
        this.lastReport = report;
        foundError = true;
    }

    if (options.schemaPath) {
        report.rootSchema = schema;
        schema = get(schema, options.schemaPath);
        if (!schema) {
            throw new Error("Schema path '" + options.schemaPath + "' wasn't found in the schema!");
        }
    }

    if (!foundError) {
        JsonValidation.validate.call(this, report, schema, json);
    }

    if (callback) {
        report.processAsyncTasks(this.options.asyncTimeout, callback);
        return;
    } else if (report.asyncTasks.length > 0) {
        throw new Error("This validation has async tasks and cannot be done in sync mode, please provide callback argument.");
    }

    // assign lastReport so errors are retrievable in sync mode
    this.lastReport = report;
    return report.isValid();
};
ZSchema.prototype.getLastError = function () {
    if (this.lastReport.errors.length === 0) {
        return null;
    }
    var e = new Error();
    e.name = "z-schema validation error";
    e.message = this.lastReport.commonErrorMessage;
    e.details = this.lastReport.errors;
    return e;
};
ZSchema.prototype.getLastErrors = function () {
    return this.lastReport && this.lastReport.errors.length > 0 ? this.lastReport.errors : undefined;
};
ZSchema.prototype.getMissingReferences = function (arr) {
    arr = arr || this.lastReport.errors;
    var res = [],
        idx = arr.length;
    while (idx--) {
        var error = arr[idx];
        if (error.code === "UNRESOLVABLE_REFERENCE") {
            var reference = error.params[0];
            if (res.indexOf(reference) === -1) {
                res.push(reference);
            }
        }
        if (error.inner) {
            res = res.concat(this.getMissingReferences(error.inner));
        }
    }
    return res;
};
ZSchema.prototype.getMissingRemoteReferences = function () {
    var missingReferences = this.getMissingReferences(),
        missingRemoteReferences = [],
        idx = missingReferences.length;
    while (idx--) {
        var remoteReference = SchemaCache.getRemotePath(missingReferences[idx]);
        if (remoteReference && missingRemoteReferences.indexOf(remoteReference) === -1) {
            missingRemoteReferences.push(remoteReference);
        }
    }
    return missingRemoteReferences;
};
ZSchema.prototype.setRemoteReference = function (uri, schema) {
    if (typeof schema === "string") {
        schema = JSON.parse(schema);
    } else {
        schema = Utils.cloneDeep(schema);
    }
    SchemaCache.cacheSchemaByUri.call(this, uri, schema);
};
ZSchema.prototype.getResolvedSchema = function (schema) {
    var report = new Report(this.options);
    schema = SchemaCache.getSchema.call(this, report, schema);

    // clone before making any modifications
    schema = Utils.cloneDeep(schema);

    var visited = [];

    // clean-up the schema and resolve references
    var cleanup = function (schema) {
        var key,
            typeOf = Utils.whatIs(schema);
        if (typeOf !== "object" && typeOf !== "array") {
            return;
        }

        if (schema.___$visited) {
            return;
        }

        schema.___$visited = true;
        visited.push(schema);

        if (schema.$ref && schema.__$refResolved) {
            var from = schema.__$refResolved;
            var to = schema;
            delete schema.$ref;
            delete schema.__$refResolved;
            for (key in from) {
                if (from.hasOwnProperty(key)) {
                    to[key] = from[key];
                }
            }
        }
        for (key in schema) {
            if (schema.hasOwnProperty(key)) {
                if (key.indexOf("__$") === 0) {
                    delete schema[key];
                } else {
                    cleanup(schema[key]);
                }
            }
        }
    };

    cleanup(schema);
    visited.forEach(function (s) {
        delete s.___$visited;
    });

    this.lastReport = report;
    if (report.isValid()) {
        return schema;
    } else {
        throw this.getLastError();
    }
};
ZSchema.prototype.setSchemaReader = function (schemaReader) {
    return ZSchema.setSchemaReader(schemaReader);
};
ZSchema.prototype.getSchemaReader = function () {
    return ZSchema.schemaReader;
};

/*
    static methods
*/
ZSchema.setSchemaReader = function (schemaReader) {
    ZSchema.schemaReader = schemaReader;
};
ZSchema.registerFormat = function (formatName, validatorFunction) {
    FormatValidators[formatName] = validatorFunction;
};
ZSchema.unregisterFormat = function (formatName) {
    delete FormatValidators[formatName];
};
ZSchema.getRegisteredFormats = function () {
    return Object.keys(FormatValidators);
};
ZSchema.getDefaultOptions = function () {
    return Utils.cloneDeep(defaultOptions);
};

module.exports = ZSchema;

}).call(this,require('_process'))
},{"./FormatValidators":8,"./JsonValidation":9,"./Polyfills":10,"./Report":11,"./SchemaCache":12,"./SchemaCompilation":13,"./SchemaValidation":14,"./Utils":15,"./schemas/hyper-schema.json":17,"./schemas/schema.json":18,"_process":1,"lodash.get":2}],17:[function(require,module,exports){
module.exports={
    "$schema": "http://json-schema.org/draft-04/hyper-schema#",
    "id": "http://json-schema.org/draft-04/hyper-schema#",
    "title": "JSON Hyper-Schema",
    "allOf": [
        {
            "$ref": "http://json-schema.org/draft-04/schema#"
        }
    ],
    "properties": {
        "additionalItems": {
            "anyOf": [
                {
                    "type": "boolean"
                },
                {
                    "$ref": "#"
                }
            ]
        },
        "additionalProperties": {
            "anyOf": [
                {
                    "type": "boolean"
                },
                {
                    "$ref": "#"
                }
            ]
        },
        "dependencies": {
            "additionalProperties": {
                "anyOf": [
                    {
                        "$ref": "#"
                    },
                    {
                        "type": "array"
                    }
                ]
            }
        },
        "items": {
            "anyOf": [
                {
                    "$ref": "#"
                },
                {
                    "$ref": "#/definitions/schemaArray"
                }
            ]
        },
        "definitions": {
            "additionalProperties": {
                "$ref": "#"
            }
        },
        "patternProperties": {
            "additionalProperties": {
                "$ref": "#"
            }
        },
        "properties": {
            "additionalProperties": {
                "$ref": "#"
            }
        },
        "allOf": {
            "$ref": "#/definitions/schemaArray"
        },
        "anyOf": {
            "$ref": "#/definitions/schemaArray"
        },
        "oneOf": {
            "$ref": "#/definitions/schemaArray"
        },
        "not": {
            "$ref": "#"
        },

        "links": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/linkDescription"
            }
        },
        "fragmentResolution": {
            "type": "string"
        },
        "media": {
            "type": "object",
            "properties": {
                "type": {
                    "description": "A media type, as described in RFC 2046",
                    "type": "string"
                },
                "binaryEncoding": {
                    "description": "A content encoding scheme, as described in RFC 2045",
                    "type": "string"
                }
            }
        },
        "pathStart": {
            "description": "Instances' URIs must start with this value for this schema to apply to them",
            "type": "string",
            "format": "uri"
        }
    },
    "definitions": {
        "schemaArray": {
            "type": "array",
            "items": {
                "$ref": "#"
            }
        },
        "linkDescription": {
            "title": "Link Description Object",
            "type": "object",
            "required": [ "href", "rel" ],
            "properties": {
                "href": {
                    "description": "a URI template, as defined by RFC 6570, with the addition of the $, ( and ) characters for pre-processing",
                    "type": "string"
                },
                "rel": {
                    "description": "relation to the target resource of the link",
                    "type": "string"
                },
                "title": {
                    "description": "a title for the link",
                    "type": "string"
                },
                "targetSchema": {
                    "description": "JSON Schema describing the link target",
                    "$ref": "#"
                },
                "mediaType": {
                    "description": "media type (as defined by RFC 2046) describing the link target",
                    "type": "string"
                },
                "method": {
                    "description": "method for requesting the target of the link (e.g. for HTTP this might be \"GET\" or \"DELETE\")",
                    "type": "string"
                },
                "encType": {
                    "description": "The media type in which to submit data along with the request",
                    "type": "string",
                    "default": "application/json"
                },
                "schema": {
                    "description": "Schema describing the data to submit along with the request",
                    "$ref": "#"
                }
            }
        }
    }
}


},{}],18:[function(require,module,exports){
module.exports={
    "id": "http://json-schema.org/draft-04/schema#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "Core schema meta-schema",
    "definitions": {
        "schemaArray": {
            "type": "array",
            "minItems": 1,
            "items": { "$ref": "#" }
        },
        "positiveInteger": {
            "type": "integer",
            "minimum": 0
        },
        "positiveIntegerDefault0": {
            "allOf": [ { "$ref": "#/definitions/positiveInteger" }, { "default": 0 } ]
        },
        "simpleTypes": {
            "enum": [ "array", "boolean", "integer", "null", "number", "object", "string" ]
        },
        "stringArray": {
            "type": "array",
            "items": { "type": "string" },
            "minItems": 1,
            "uniqueItems": true
        }
    },
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "format": "uri"
        },
        "$schema": {
            "type": "string",
            "format": "uri"
        },
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "default": {},
        "multipleOf": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
        },
        "maximum": {
            "type": "number"
        },
        "exclusiveMaximum": {
            "type": "boolean",
            "default": false
        },
        "minimum": {
            "type": "number"
        },
        "exclusiveMinimum": {
            "type": "boolean",
            "default": false
        },
        "maxLength": { "$ref": "#/definitions/positiveInteger" },
        "minLength": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "pattern": {
            "type": "string",
            "format": "regex"
        },
        "additionalItems": {
            "anyOf": [
                { "type": "boolean" },
                { "$ref": "#" }
            ],
            "default": {}
        },
        "items": {
            "anyOf": [
                { "$ref": "#" },
                { "$ref": "#/definitions/schemaArray" }
            ],
            "default": {}
        },
        "maxItems": { "$ref": "#/definitions/positiveInteger" },
        "minItems": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "uniqueItems": {
            "type": "boolean",
            "default": false
        },
        "maxProperties": { "$ref": "#/definitions/positiveInteger" },
        "minProperties": { "$ref": "#/definitions/positiveIntegerDefault0" },
        "required": { "$ref": "#/definitions/stringArray" },
        "additionalProperties": {
            "anyOf": [
                { "type": "boolean" },
                { "$ref": "#" }
            ],
            "default": {}
        },
        "definitions": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "properties": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "patternProperties": {
            "type": "object",
            "additionalProperties": { "$ref": "#" },
            "default": {}
        },
        "dependencies": {
            "type": "object",
            "additionalProperties": {
                "anyOf": [
                    { "$ref": "#" },
                    { "$ref": "#/definitions/stringArray" }
                ]
            }
        },
        "enum": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true
        },
        "type": {
            "anyOf": [
                { "$ref": "#/definitions/simpleTypes" },
                {
                    "type": "array",
                    "items": { "$ref": "#/definitions/simpleTypes" },
                    "minItems": 1,
                    "uniqueItems": true
                }
            ]
        },
        "format": { "type": "string" },
        "allOf": { "$ref": "#/definitions/schemaArray" },
        "anyOf": { "$ref": "#/definitions/schemaArray" },
        "oneOf": { "$ref": "#/definitions/schemaArray" },
        "not": { "$ref": "#" }
    },
    "dependencies": {
        "exclusiveMaximum": [ "maximum" ],
        "exclusiveMinimum": [ "minimum" ]
    },
    "default": {}
}

},{}]},{},[7,8,9,10,11,12,13,14,15,16])(16)
});