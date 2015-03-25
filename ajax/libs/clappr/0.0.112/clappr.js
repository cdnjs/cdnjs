require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

"use strict";

var Player = require("./components/player");
var Mediator = require("./components/mediator");
var Events = require("./base/events");

window.DEBUG = false;

window.Clappr = { Player: Player, Mediator: Mediator, Events: Events };
window.Clappr.version = "0.0.112";

module.exports = window.Clappr;

},{"./base/events":"events","./components/mediator":"mediator","./components/player":59}],2:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseAssign = require('lodash._baseassign'),
    createAssigner = require('lodash._createassigner');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it is invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments;
 * (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using a customizer callback
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return typeof value == 'undefined' ? other : value;
 * });
 *
 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var assign = createAssigner(baseAssign);

module.exports = assign;

},{"lodash._baseassign":3,"lodash._createassigner":9}],3:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCopy = require('lodash._basecopy'),
    keys = require('lodash.keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize assigning values.
 * @returns {Object} Returns the destination object.
 */
function baseAssign(object, source, customizer) {
  var props = keys(source);
  if (!customizer) {
    return baseCopy(source, object, props);
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? (result !== value) : (value === value)) ||
        (typeof value == 'undefined' && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

module.exports = baseAssign;

},{"lodash._basecopy":4,"lodash.keys":5}],4:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies the properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Array} props The property names to copy.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, object, props) {
  if (!props) {
    props = object;
    object = {};
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],5:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray'),
    isNative = require('lodash.isnative');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {

  /**
   * Detect if `arguments` object indexes are non-enumerable.
   *
   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
   * checks for indexes that exceed their function's formal parameters with
   * associated values of `0`.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
  } catch(e) {
    support.nonEnumArgs = true;
  }
}(0, 0));

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on ES `ToLength`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object)));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
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
  return type == 'function' || (value && type == 'object') || false;
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (object) {
    var Ctor = object.constructor,
        length = object.length;
  }
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && (length && isLength(length)))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash.isarguments":6,"lodash.isarray":7,"lodash.isnative":8}],6:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * (function() { return _.isArguments(arguments); })();
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = isObjectLike(value) ? value.length : undefined;
  return (isLength(length) && objToString.call(value) == argsTag) || false;
}

module.exports = isArguments;

},{}],7:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Used to match `RegExp` special characters.
 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
 * for more details.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
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
 * (function() { return _.isArray(arguments); })();
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
};

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
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return (isObjectLike(value) && reHostCtor.test(value)) || false;
}

/**
 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = isArray;

},{}],8:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Used to match `RegExp` special characters.
 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
 * for more details.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

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
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return (isObjectLike(value) && reHostCtor.test(value)) || false;
}

/**
 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = isNative;

},{}],9:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var bindCallback = require('lodash._bindcallback'),
    isIterateeCall = require('lodash._isiterateecall');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return function() {
    var args = arguments,
        length = args.length,
        object = args[0];

    if (length < 2 || object == null) {
      return object;
    }
    var customizer = args[length - 2],
        thisArg = args[length - 1],
        guard = args[3];

    if (length > 3 && typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = (length > 2 && typeof thisArg == 'function') ? thisArg : null;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(args[1], args[2], guard)) {
      customizer = length == 3 ? null : customizer;
      length = 2;
    }
    var index = 0;
    while (++index < length) {
      var source = args[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  };
}

module.exports = createAssigner;

},{"lodash._bindcallback":10,"lodash._isiterateecall":11}],10:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (typeof thisArg == 'undefined') {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = bindCallback;

},{}],11:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number') {
    var length = object.length,
        prereq = isLength(length) && isIndex(index, length);
  } else {
    prereq = type == 'string' && index in object;
  }
  if (prereq) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on ES `ToLength`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
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
  return type == 'function' || (value && type == 'object') || false;
}

module.exports = isIterateeCall;

},{}],12:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback'),
    baseEach = require('lodash._baseeach'),
    baseFind = require('lodash._basefind'),
    findIndex = require('lodash.findindex'),
    isArray = require('lodash.isarray');

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments; (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created "_.property"
 * style callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.matches" style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias detect
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.property" or "_.matches" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': false },
 *   { 'user': 'fred',    'age': 40, 'active': true },
 *   { 'user': 'pebbles', 'age': 1,  'active': false }
 * ];
 *
 * _.result(_.find(users, function(chr) { return chr.age < 40; }), 'user');
 * // => 'barney'
 *
 * // using the "_.matches" callback shorthand
 * _.result(_.find(users, { 'age': 1 }), 'user');
 * // => 'pebbles'
 *
 * // using the "_.property" callback shorthand
 * _.result(_.find(users, 'active'), 'user');
 * // => 'fred'
 */
function find(collection, predicate, thisArg) {
  if (isArray(collection)) {
    var index = findIndex(collection, predicate, thisArg);
    return index > -1 ? collection[index] : undefined;
  }
  predicate = baseCallback(predicate, thisArg, 3);
  return baseFind(collection, predicate, baseEach);
}

module.exports = find;

},{"lodash._basecallback":13,"lodash._baseeach":20,"lodash._basefind":24,"lodash.findindex":25,"lodash.isarray":26}],13:[function(require,module,exports){
/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIsEqual = require('lodash._baseisequal'),
    bindCallback = require('lodash._bindcallback'),
    keys = require('lodash.keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return (typeof thisArg != 'undefined')
      ? bindCallback(func, thisArg, argCount)
      : func;
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return typeof thisArg == 'undefined'
    ? baseProperty(func + '')
    : baseMatchesProperty(func + '', thisArg);
}

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} props The source property names to match.
 * @param {Array} values The source values to match.
 * @param {Array} strictCompareFlags Strict comparison flags for source values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
  var length = props.length;
  if (object == null) {
    return !length;
  }
  var index = -1,
      noCustomizer = !customizer;

  while (++index < length) {
    if ((noCustomizer && strictCompareFlags[index])
          ? values[index] !== object[props[index]]
          : !hasOwnProperty.call(object, props[index])
        ) {
      return false;
    }
  }
  index = -1;
  while (++index < length) {
    var key = props[index];
    if (noCustomizer && strictCompareFlags[index]) {
      var result = hasOwnProperty.call(object, key);
    } else {
      var objValue = object[key],
          srcValue = values[index];

      result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (typeof result == 'undefined') {
        result = baseIsEqual(srcValue, objValue, customizer, true);
      }
    }
    if (!result) {
      return false;
    }
  }
  return true;
}

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var props = keys(source),
      length = props.length;

  if (length == 1) {
    var key = props[0],
        value = source[key];

    if (isStrictComparable(value)) {
      return function(object) {
        return object != null && object[key] === value && hasOwnProperty.call(object, key);
      };
    }
  }
  var values = Array(length),
      strictCompareFlags = Array(length);

  while (length--) {
    value = source[props[length]];
    values[length] = value;
    strictCompareFlags[length] = isStrictComparable(value);
  }
  return function(object) {
    return baseIsMatch(object, props, values, strictCompareFlags);
  };
}

/**
 * The base implementation of `_.matchesProperty` which does not coerce `key`
 * to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} value The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(key, value) {
  if (isStrictComparable(value)) {
    return function(object) {
      return object != null && object[key] === value;
    };
  }
  return function(object) {
    return object != null && baseIsEqual(value, object[key], null, true);
  };
}

/**
 * The base implementation of `_.property` which does not coerce `key` to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
}

/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
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
  return type == 'function' || (value && type == 'object') || false;
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = baseCallback;

},{"lodash._baseisequal":14,"lodash._bindcallback":16,"lodash.keys":17}],14:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArray = require('lodash.isarray'),
    isTypedArray = require('lodash.istypedarray'),
    keys = require('lodash.keys');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isWhere, stackA, stackB) {
  // Exit early for identical values.
  if (value === other) {
    // Treat `+0` vs. `-0` as not equal.
    return value !== 0 || (1 / value == 1 / other);
  }
  var valType = typeof value,
      othType = typeof other;

  // Exit early for unlike primitive values.
  if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
      value == null || other == null) {
    // Return `false` unless both values are `NaN`.
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isWhere, stackA, stackB);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
      othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

  if (valWrapped || othWrapped) {
    return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isWhere, stackA, stackB);
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isWhere, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length,
      result = true;

  if (arrLength != othLength && !(isWhere && othLength > arrLength)) {
    return false;
  }
  // Deep compare the contents, ignoring non-numeric properties.
  while (result && ++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    result = undefined;
    if (customizer) {
      result = isWhere
        ? customizer(othValue, arrValue, index)
        : customizer(arrValue, othValue, index);
    }
    if (typeof result == 'undefined') {
      // Recursively compare arrays (susceptible to call stack limits).
      if (isWhere) {
        var othIndex = othLength;
        while (othIndex--) {
          othValue = other[othIndex];
          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
          if (result) {
            break;
          }
        }
      } else {
        result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
  }
  return !!result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        // But, treat `-0` vs. `+0` as not equal.
        : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isWhere) {
    return false;
  }
  var hasCtor,
      index = -1;

  while (++index < objLength) {
    var key = objProps[index],
        result = hasOwnProperty.call(other, key);

    if (result) {
      var objValue = object[key],
          othValue = other[key];

      result = undefined;
      if (customizer) {
        result = isWhere
          ? customizer(othValue, objValue, key)
          : customizer(objValue, othValue, key);
      }
      if (typeof result == 'undefined') {
        // Recursively compare objects (susceptible to call stack limits).
        result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
    if (!result) {
      return false;
    }
    hasCtor || (hasCtor = key == 'constructor');
  }
  if (!hasCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = baseIsEqual;

},{"lodash.isarray":26,"lodash.istypedarray":15,"lodash.keys":17}],15:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return (isObjectLike(value) && isLength(value.length) && typedArrayTags[objToString.call(value)]) || false;
}

module.exports = isTypedArray;

},{}],16:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"dup":10}],17:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5,"lodash.isarguments":18,"lodash.isarray":26,"lodash.isnative":19}],18:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],19:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],20:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var keys = require('lodash.keys');

/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
function baseEach(collection, iteratee) {
  var length = collection ? collection.length : 0;
  if (!isLength(length)) {
    return baseForOwn(collection, iteratee);
  }
  var index = -1,
      iterable = toObject(collection);

  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break;
    }
  }
  return collection;
}

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iterator functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
function baseFor(object, iteratee, keysFunc) {
  var index = -1,
      iterable = toObject(object),
      props = keysFunc(object),
      length = props.length;

  while (++index < length) {
    var key = props[index];
    if (iteratee(iterable[key], key, iterable) === false) {
      break;
    }
  }
  return object;
}

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Converts `value` to an object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
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
  return type == 'function' || (value && type == 'object') || false;
}

module.exports = baseEach;

},{"lodash.keys":21}],21:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5,"lodash.isarguments":22,"lodash.isarray":26,"lodash.isnative":23}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],23:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],24:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
 * without support for callback shorthands and `this` binding, which iterates
 * over `collection` using the provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @param {boolean} [retKey] Specify returning the key of the found element
 *  instead of the element itself.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFind(collection, predicate, eachFunc, retKey) {
  var result;
  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = retKey ? key : value;
      return false;
    }
  });
  return result;
}

module.exports = baseFind;

},{}],25:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback');

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for, instead of the element itself.
 *
 * If a property name is provided for `predicate` the created "_.property"
 * style callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.matches" style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.property" or "_.matches" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': false },
 *   { 'user': 'fred',    'age': 40, 'active': true },
 *   { 'user': 'pebbles', 'age': 1,  'active': false }
 * ];
 *
 * _.findIndex(users, function(chr) { return chr.age < 40; });
 * // => 0
 *
 * // using the "_.matches" callback shorthand
 * _.findIndex(users, { 'age': 1 });
 * // => 2
 *
 * // using the "_.property" callback shorthand
 * _.findIndex(users, 'active');
 * // => 1
 */
function findIndex(array, predicate, thisArg) {
  var index = -1,
      length = array ? array.length : 0;

  predicate = baseCallback(predicate, thisArg, 3);
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = findIndex;

},{"lodash._basecallback":13}],26:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],27:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var before = require('lodash.before');

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first call. The `func` is invoked
 * with the `this` binding of the created function.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var initialize = _.once(createApplication);
 * initialize();
 * initialize();
 * // `initialize` invokes `createApplication` once
 */
function once(func) {
  return before(func, 2);
}

module.exports = once;

},{"lodash.before":28}],28:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it is called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {number} n The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery('#add').on('click', _.before(5, addContactToList));
 * // => allows adding up to 4 contacts to the list
 */
function before(n, func) {
  var result;
  if (typeof func != 'function') {
    if (typeof n == 'function') {
      var temp = n;
      n = func;
      func = temp;
    } else {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
  }
  return function() {
    if (--n > 0) {
      result = func.apply(this, arguments);
    } else {
      func = null;
    }
    return result;
  };
}

module.exports = before;

},{}],29:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isFunction = require('lodash.isfunction');

/**
 * Resolves the value of property `key` on `object`. If the value of `key` is
 * a function it is invoked with the `this` binding of `object` and its result
 * is returned, else the property value is returned. If the property value is
 * `undefined` the `defaultValue` is used in its place.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to resolve.
 * @param {*} [defaultValue] The value returned if the property value
 *  resolves to `undefined`.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'user': 'fred', 'age': _.constant(40) };
 *
 * _.result(object, 'user');
 * // => 'fred'
 *
 * _.result(object, 'age');
 * // => 40
 *
 * _.result(object, 'status', 'busy');
 * // => 'busy'
 *
 * _.result(object, 'status', _.constant('busy'));
 * // => 'busy'
 */
function result(object, key, defaultValue) {
  var value = object == null ? undefined : object[key];
  if (typeof value == 'undefined') {
    value = defaultValue;
  }
  return isFunction(value) ? value.call(object) : value;
}

module.exports = result;

},{"lodash.isfunction":30}],30:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Used to match `RegExp` special characters.
 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
 * for more details.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

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
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

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
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return (isObjectLike(value) && reHostCtor.test(value)) || false;
}

/**
 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],31:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback'),
    baseUniq = require('lodash._baseuniq'),
    isIterateeCall = require('lodash._isiterateecall');

/**
 * An implementation of `_.uniq` optimized for sorted arrays without support
 * for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function sortedUniq(array, iteratee) {
  var seen,
      index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (!index || seen !== computed) {
      seen = computed;
      result[++resIndex] = value;
    }
  }
  return result;
}

/**
 * Creates a duplicate-value-free version of an array using `SameValueZero`
 * for equality comparisons. Providing `true` for `isSorted` performs a faster
 * search algorithm for sorted arrays. If an iteratee function is provided it
 * is invoked for each value in the array to generate the criterion by which
 * uniqueness is computed. The `iteratee` is bound to `thisArg` and invoked
 * with three arguments; (value, index, array).
 *
 * If a property name is provided for `predicate` the created "_.property"
 * style callback returns the property value of the given element.
 *
 * If an object is provided for `predicate` the created "_.matches" style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @alias unique
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {boolean} [isSorted] Specify the array is sorted.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 *  If a property name or object is provided it is used to create a "_.property"
 *  or "_.matches" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new duplicate-value-free array.
 * @example
 *
 * _.uniq([1, 2, 1]);
 * // => [1, 2]
 *
 * // using `isSorted`
 * _.uniq([1, 1, 2], true);
 * // => [1, 2]
 *
 * // using an iteratee function
 * _.uniq([1, 2.5, 1.5, 2], function(n) { return this.floor(n); }, Math);
 * // => [1, 2.5]
 *
 * // using the "_.property" callback shorthand
 * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniq(array, isSorted, iteratee, thisArg) {
  var length = array ? array.length : 0;
  if (!length) {
    return [];
  }
  // Juggle arguments.
  if (typeof isSorted != 'boolean' && isSorted != null) {
    thisArg = iteratee;
    iteratee = isIterateeCall(array, isSorted, thisArg) ? null : isSorted;
    isSorted = false;
  }
  iteratee = iteratee == null ? iteratee : baseCallback(iteratee, thisArg, 3);
  return (isSorted)
    ? sortedUniq(array, iteratee)
    : baseUniq(array, iteratee);
}

module.exports = uniq;

},{"lodash._basecallback":32,"lodash._baseuniq":41,"lodash._isiterateecall":46}],32:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13,"lodash._baseisequal":33,"lodash._bindcallback":36,"lodash.keys":37}],33:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14,"lodash.isarray":34,"lodash.istypedarray":35,"lodash.keys":37}],34:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],35:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15}],36:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"dup":10}],37:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5,"lodash.isarguments":38,"lodash.isarray":39,"lodash.isnative":40}],38:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],39:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],40:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],41:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIndexOf = require('lodash._baseindexof'),
    cacheIndexOf = require('lodash._cacheindexof'),
    createCache = require('lodash._createcache');

/**
 * The base implementation of `_.uniq` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function baseUniq(array, iteratee) {
  var index = -1,
      indexOf = baseIndexOf,
      length = array.length,
      isCommon = true,
      isLarge = isCommon && length >= 200,
      seen = isLarge ? createCache() : null,
      result = [];

  if (seen) {
    indexOf = cacheIndexOf;
    isCommon = false;
  } else {
    isLarge = false;
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (isCommon && value === value) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (indexOf(seen, computed, 0) < 0) {
      if (iteratee || isLarge) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"lodash._baseindexof":42,"lodash._cacheindexof":43,"lodash._createcache":44}],42:[function(require,module,exports){
/**
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 * If `fromRight` is provided elements of `array` are iterated from right to left.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{}],43:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is in `cache` mimicking the return signature of
 * `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  var data = cache.data,
      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

  return result ? 0 : -1;
}

/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
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
  return type == 'function' || (value && type == 'object') || false;
}

module.exports = cacheIndexOf;

},{}],44:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isNative = require('lodash.isnative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
  return new SetCache(values);
};

/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
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
  return type == 'function' || (value && type == 'object') || false;
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"lodash.isnative":45}],45:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],46:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}],47:[function(require,module,exports){
//This file is generated by bin/hook.js
"use strict";

var template = require("./template");
module.exports = { media_control: template("<div class=\"media-control-background\" data-background></div><div class=\"media-control-layer\" data-controls><% var renderBar=function(name) { %><div class=\"bar-container\" data-<%= name %>><div class=\"bar-background\" data-<%= name %>><div class=\"bar-fill-1\" data-<%= name %>></div><div class=\"bar-fill-2\" data-<%= name %>></div><div class=\"bar-hover\" data-<%= name %>></div></div><div class=\"bar-scrubber\" data-<%= name %>><div class=\"bar-scrubber-icon\" data-<%= name %>></div></div></div><% }; %><% var renderSegmentedBar=function(name, segments) { segments=segments || 10; %><div class=\"bar-container\" data-<%= name %>><% for (var i = 0; i < segments; i++) { %><div class=\"segmented-bar-element\" data-<%= name %>></div><% } %></div><% }; %><% var renderDrawer=function(name, renderContent) { %><div class=\"drawer-container\" data-<%= name %>><div class=\"drawer-icon-container\" data-<%= name %>><div class=\"drawer-icon media-control-icon\" data-<%= name %>></div><span class=\"drawer-text\" data-<%= name %>></span></div><% renderContent(name); %></div><% }; %><% var renderIndicator=function(name) { %><div class=\"media-control-indicator\" data-<%= name %>></div><% }; %><% var renderButton=function(name) { %><button class=\"media-control-button media-control-icon\" data-<%= name %>></button><% }; %><% var templates={ bar: renderBar, segmentedBar: renderSegmentedBar, }; var render=function(settingsList) { settingsList.forEach(function(setting) { if(setting === \"seekbar\") { renderBar(setting); } else if (setting === \"volume\") { renderDrawer(setting, settings.volumeBarTemplate ? templates[settings.volumeBarTemplate] : function(name) { return renderSegmentedBar(name); }); } else if (setting === \"duration\" || setting=== \"position\") { renderIndicator(setting); } else { renderButton(setting); } }); }; %><% if (settings.default && settings.default.length) { %><div class=\"media-control-center-panel\" data-media-control><% render(settings.default); %></div><% } %><% if (settings.left && settings.left.length) { %><div class=\"media-control-left-panel\" data-media-control><% render(settings.left); %></div><% } %><% if (settings.right && settings.right.length) { %><div class=\"media-control-right-panel\" data-media-control><% render(settings.right); %></div><% } %></div>"), seek_time: template("<span data-seek-time></span>"), flash: template("<param name=\"movie\" value=\"<%= baseUrl %>/assets/Player.swf\"><param name=\"quality\" value=\"autohigh\"><param name=\"swliveconnect\" value=\"true\"><param name=\"allowScriptAccess\" value=\"always\"><param name=\"bgcolor\" value=\"#001122\"><param name=\"allowFullScreen\" value=\"false\"><param name=\"wmode\" value=\"transparent\"><param name=\"tabindex\" value=\"1\"><param name=FlashVars value=\"playbackId=<%= playbackId %>\" /><embed type=\"application/x-shockwave-flash\" disabled tabindex=\"-1\" enablecontextmenu=\"false\" allowScriptAccess=\"always\" quality=\"autohight\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" wmode=\"transparent\" swliveconnect=\"true\" type=\"application/x-shockwave-flash\" allowfullscreen=\"false\" bgcolor=\"#000000\" FlashVars=\"playbackId=<%= playbackId %>\" src=\"<%= baseUrl %>/assets/Player.swf\"></embed>"), hls: template("<param name=\"movie\" value=\"<%= baseUrl %>/assets/HLSPlayer.swf?inline=1\"><param name=\"quality\" value=\"autohigh\"><param name=\"swliveconnect\" value=\"true\"><param name=\"allowScriptAccess\" value=\"always\"><param name=\"bgcolor\" value=\"#001122\"><param name=\"allowFullScreen\" value=\"false\"><param name=\"wmode\" value=\"transparent\"><param name=\"tabindex\" value=\"1\"><param name=FlashVars value=\"playbackId=<%= playbackId %>\" /><embed type=\"application/x-shockwave-flash\" tabindex=\"1\" enablecontextmenu=\"false\" allowScriptAccess=\"always\" quality=\"autohigh\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" wmode=\"transparent\" swliveconnect=\"true\" type=\"application/x-shockwave-flash\" allowfullscreen=\"false\" bgcolor=\"#000000\" FlashVars=\"playbackId=<%= playbackId %>\" src=\"<%= baseUrl %>/assets/HLSPlayer.swf\" width=\"100%\" height=\"100%\"></embed>"), html5_video: template("<source src=\"<%=src%>\" type=\"<%=type%>\">"), no_op: template("<canvas data-no-op-canvas></canvas><p data-no-op-msg>Your browser does not support the playback of this video. Try to use a different browser.<p>"), background_button: template("<div class=\"background-button-wrapper\" data-background-button><button class=\"background-button-icon\" data-background-button></button></div>"), chromecast: template("<div class=\"chromecast-playback\"><div class=\"chromecast-playback-overlay\"></div></div>"), dvr_controls: template("<div class=\"live-info\">LIVE</div><button class=\"live-button\">BACK TO LIVE</button>"), poster: template("<div class=\"play-wrapper\" data-poster><span class=\"poster-icon play\" data-poster/></div>"), spinner_three_bounce: template("<div data-bounce1></div><div data-bounce2></div><div data-bounce3></div>"), watermark: template("<div data-watermark data-watermark-<%=position %>><img src=\"<%= imageUrl %>\"></div>"), CSS: { container: ".container[data-container]{position:absolute;background-color:#000;height:100%;width:100%}.container[data-container].pointer-enabled{cursor:pointer}", core: "[data-player]{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0);position:relative;margin:0;padding:0;border:0;font-style:normal;font-weight:400;text-align:center;overflow:hidden;font-size:100%;font-family:\"lucida grande\",tahoma,verdana,arial,sans-serif;text-shadow:0 0 0;box-sizing:border-box}[data-player] a,[data-player] abbr,[data-player] acronym,[data-player] address,[data-player] applet,[data-player] article,[data-player] aside,[data-player] audio,[data-player] b,[data-player] big,[data-player] blockquote,[data-player] canvas,[data-player] caption,[data-player] center,[data-player] cite,[data-player] code,[data-player] dd,[data-player] del,[data-player] details,[data-player] dfn,[data-player] div,[data-player] dl,[data-player] dt,[data-player] em,[data-player] embed,[data-player] fieldset,[data-player] figcaption,[data-player] figure,[data-player] footer,[data-player] form,[data-player] h1,[data-player] h2,[data-player] h3,[data-player] h4,[data-player] h5,[data-player] h6,[data-player] header,[data-player] hgroup,[data-player] i,[data-player] iframe,[data-player] img,[data-player] ins,[data-player] kbd,[data-player] label,[data-player] legend,[data-player] li,[data-player] mark,[data-player] menu,[data-player] nav,[data-player] object,[data-player] ol,[data-player] output,[data-player] p,[data-player] pre,[data-player] q,[data-player] ruby,[data-player] s,[data-player] samp,[data-player] section,[data-player] small,[data-player] span,[data-player] strike,[data-player] strong,[data-player] sub,[data-player] summary,[data-player] sup,[data-player] table,[data-player] tbody,[data-player] td,[data-player] tfoot,[data-player] th,[data-player] thead,[data-player] time,[data-player] tr,[data-player] tt,[data-player] u,[data-player] ul,[data-player] var,[data-player] video{margin:0;padding:0;border:0;font:inherit;font-size:100%;vertical-align:baseline}[data-player] table{border-collapse:collapse;border-spacing:0}[data-player] caption,[data-player] td,[data-player] th{text-align:left;font-weight:400;vertical-align:middle}[data-player] blockquote,[data-player] q{quotes:none}[data-player] blockquote:after,[data-player] blockquote:before,[data-player] q:after,[data-player] q:before{content:\"\";content:none}[data-player] a img{border:none}[data-player] *{max-width:initial;box-sizing:inherit;float:initial}[data-player].fullscreen{width:100%!important;height:100%!important}[data-player].nocursor{cursor:none}.clappr-style{display:none!important}@media screen{[data-player]{opacity:.99}}", media_control: "@font-face{font-family:Player;src:url(\"<%= baseUrl %>/assets/Player-Regular.eot\");src:url(\"<%= baseUrl %>/assets/Player-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"<%= baseUrl %>/assets/Player-Regular.ttf\") format(\"truetype\"),url(\"<%= baseUrl %>/assets/Player-Regular.svg#player\") format(\"svg\")}.media-control-notransition{-webkit-transition:none!important;-webkit-transition-delay:0s;-moz-transition:none!important;-o-transition:none!important;transition:none!important}.media-control[data-media-control]{position:absolute;width:100%;height:100%;z-index:9999;pointer-events:none}.media-control[data-media-control].dragging{pointer-events:auto;cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control].dragging *{cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control] .media-control-background[data-background]{position:absolute;height:40%;width:100%;bottom:0;background-image:-owg(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-webkit(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-moz(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-o(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9));-webkit-transition:opacity .6s;-webkit-transition-delay:ease-out;-moz-transition:opacity .6s ease-out;-o-transition:opacity .6s ease-out;transition:opacity .6s ease-out}.media-control[data-media-control] .media-control-icon{font-family:Player;font-weight:400;font-style:normal;font-size:26px;line-height:32px;letter-spacing:0;speak:none;color:#fff;opacity:.5;vertical-align:middle;text-align:left;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.media-control[data-media-control] .media-control-icon:hover{color:#fff;opacity:.75;text-shadow:rgba(255,255,255,.8) 0 0 5px}.media-control[data-media-control].media-control-hide .media-control-background[data-background]{opacity:0}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls]{bottom:-50px}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls]{position:absolute;bottom:7px;width:100%;height:32px;vertical-align:middle;pointer-events:auto;-webkit-transition:bottom .4s;-webkit-transition-delay:ease-out;-moz-transition:bottom .4s ease-out;-o-transition:bottom .4s ease-out;transition:bottom .4s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-left-panel[data-media-control]{position:absolute;top:0;left:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-center-panel[data-media-control]{height:100%;text-align:center;line-height:32px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-right-panel[data-media-control]{position:absolute;top:0;right:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button{background-color:transparent;border:0;margin:0 6px;padding:0;cursor:pointer;display:inline-block}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button:focus{outline:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]:before{content:\"\\e002\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]:before{content:\"\\e003\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]{float:right;background-color:transparent;border:0;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]:before{content:\"\\e006\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen].shrink:before{content:\"\\e007\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]{cursor:default;float:right;background-color:transparent;border:0;height:100%;opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]:before{content:\"\\e008\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled:hover{opacity:1;text-shadow:none}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].playing:before{content:\"\\e002\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].paused:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].playing:before{content:\"\\e003\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].stopped:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration],.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{display:inline-block;font-size:10px;color:#fff;cursor:default;line-height:32px;position:relative}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{margin-left:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]{color:rgba(255,255,255,.5);margin-right:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]:before{content:\"|\";margin:0 3px}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]{position:absolute;top:-20px;left:0;display:inline-block;vertical-align:middle;width:100%;height:25px;cursor:pointer}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar]{width:100%;height:1px;position:relative;top:12px;background-color:#666}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-1[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#c2c2c2;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#005aff;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0;position:absolute;top:-3px;width:5px;height:7px;background-color:rgba(255,255,255,.5);-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled{cursor:default}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{position:absolute;top:2px;left:0;width:20px;height:20px;opacity:1;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] .bar-scrubber-icon[data-seekbar]{position:absolute;left:6px;top:6px;width:8px;height:8px;border-radius:10px;box-shadow:0 0 0 6px rgba(255,255,255,.2);background-color:#fff}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume]{float:right;display:inline-block;height:32px;cursor:pointer;margin:0 6px;box-sizing:border-box}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume]{float:left;bottom:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]{background-color:transparent;border:0;box-sizing:content-box;width:16px;height:32px;margin-right:6px;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:hover{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:before{content:\"\\e004\"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted{opacity:.5}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:hover{opacity:.7}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:before{content:\"\\e005\"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume]{float:left;position:relative;top:6px;width:42px;height:18px;padding:3px 0;overflow:hidden;-webkit-transition:width .2s;-webkit-transition-delay:ease-out;-moz-transition:width .2s ease-out;-o-transition:width .2s ease-out;transition:width .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]{float:left;width:4px;padding-left:2px;height:12px;opacity:.5;-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;-webkit-transition:-webkit-transform .2s;-webkit-transition-delay:ease-out;-moz-transition:-moz-transform .2s ease-out;-o-transition:-o-transform .2s ease-out;transition:transform .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume].fill{-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:nth-of-type(1){padding-left:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:hover{-webkit-transform:scaleY(1.5);-moz-transform:scaleY(1.5);-ms-transform:scaleY(1.5);-o-transform:scaleY(1.5);transform:scaleY(1.5)}.media-control[data-media-control].w320 .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume].volume-bar-hide{height:12px;top:9px;padding:0;width:0}", seek_time: ".seek-time[data-seek-time]{position:absolute;width:auto;height:20px;line-height:20px;bottom:55px;background-color:rgba(2,2,2,.5);z-index:9999;-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.seek-time[data-seek-time].hidden[data-seek-time]{opacity:0}.seek-time[data-seek-time] span[data-seek-time]{position:relative;color:#fff;font-size:10px;padding-left:7px;padding-right:7px}", flash: "[data-flash]{position:absolute;height:100%;width:100%;background-color:#000;display:block;pointer-events:none}", hls: "[data-hls]{position:absolute;display:block;pointer-events:none;top:0}", html5_video: "[data-html5-video]{position:absolute;height:100%;width:100%;display:block}", html_img: "[data-html-img]{max-width:100%;max-height:100%}", no_op: "[data-no-op]{z-index:1000;position:absolute;height:100%;width:100%;text-align:center}[data-no-op] p[data-no-op-msg]{position:absolute;font-size:25px;top:40%;color:#fff}[data-no-op] canvas[data-no-op-canvas]{background-color:#777;height:100%;width:100%}", background_button: ".background-button[data-background-button]{font-family:Player;position:absolute;height:100%;width:100%;background-color:rgba(0,0,0,.2);pointer-events:none;-webkit-transition:all .4s;-webkit-transition-delay:ease-out;-moz-transition:all .4s ease-out;-o-transition:all .4s ease-out;transition:all .4s ease-out}.background-button[data-background-button].hide{background-color:transparent}.background-button[data-background-button].hide .background-button-wrapper[data-background-button]{opacity:0}.background-button[data-background-button] .background-button-wrapper[data-background-button]{position:absolute;overflow:hidden;width:100%;height:25%;line-height:100%;font-size:25%;top:50%;text-align:center}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button]{cursor:pointer;pointer-events:auto;font-family:Player;font-weight:400;font-style:normal;line-height:1;letter-spacing:0;speak:none;color:#fff;opacity:.75;border:0;outline:0;background-color:transparent;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button]:hover{opacity:1;text-shadow:rgba(255,255,255,.8) 0 0 15px}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playing:before{content:\"\\e002\"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].notplaying:before{content:\"\\e001\"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playstop.playing:before{content:\"\\e003\"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playstop.notplaying:before{content:\"\\e001\"}.media-control.media-control-hide[data-media-control] .background-button[data-background-button]{opacity:0}", chromecast: ".chromecast-playback{height:100%;width:100%}.chromecast-playback-overlay{background-color:#000;height:100%;opacity:.6;width:100%}@font-face{font-family:chromecast;src:url(assets/chromecast.eot?-2rwb6t);src:url(assets/chromecast.eot?#iefix-2rwb6t) format(\"embedded-opentype\"),url(assets/chromecast.woff?-2rwb6t) format(\"woff\"),url(assets/chromecast.ttf?-2rwb6t) format(\"truetype\"),url(assets/chromecast.svg?-2rwb6t#chromecast) format(\"svg\");font-weight:400;font-style:normal}.chromecast-button{background:0 0;border:0;width:32px;height:26px;font-size:22px;line-height:26px;letter-spacing:0;color:#fff;opacity:.5;vertical-align:middle;text-align:left;cursor:pointer;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.chromecast-button:hover{opacity:.75;text-shadow:rgba(255,255,255,.8) 0 0 5px}.chromecast-button:focus{outline:0}.chromecast-icon{font-family:chromecast;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-cast:before{content:\"\\e600\"}.icon-cast-connected:before{content:\"\\e601\"}", dvr_controls: "@import url(http://fonts.googleapis.com/css?family=Roboto);.dvr-controls[data-dvr-controls]{display:inline-block;float:left;color:#fff;line-height:32px;font-size:10px;font-weight:700;margin-left:6px}.dvr-controls[data-dvr-controls] .live-info{cursor:default;font-family:Roboto,\"Open Sans\",Arial,sans-serif}.dvr-controls[data-dvr-controls] .live-info:before{content:\"\";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#ff0101}.dvr-controls[data-dvr-controls] .live-info.disabled{opacity:.3}.dvr-controls[data-dvr-controls] .live-info.disabled:before{background-color:#fff}.dvr-controls[data-dvr-controls] .live-button{cursor:pointer;outline:0;display:none;border:0;color:#fff;background-color:transparent;height:32px;padding:0;opacity:.7;font-family:Roboto,\"Open Sans\",Arial,sans-serif;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.dvr-controls[data-dvr-controls] .live-button:before{content:\"\";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#fff}.dvr-controls[data-dvr-controls] .live-button:hover{opacity:1;text-shadow:rgba(255,255,255,.75) 0 0 5px}.dvr .dvr-controls[data-dvr-controls] .live-info{display:none}.dvr .dvr-controls[data-dvr-controls] .live-button{display:block}.dvr.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#005aff}.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#ff0101}.seek-time[data-seek-time] span[data-duration]{position:relative;color:rgba(255,255,255,.5);font-size:10px;padding-right:7px}.seek-time[data-seek-time] span[data-duration]:before{content:\"|\";margin-right:7px}", poster: "@font-face{font-family:Player;src:url(\"<%= baseUrl %>/assets/Player-Regular.eot\");src:url(\"<%= baseUrl %>/assets/Player-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"<%= baseUrl %>/assets/Player-Regular.ttf\") format(\"truetype\"),url(\"<%= baseUrl %>/assets/Player-Regular.svg#player\") format(\"svg\")}.player-poster[data-poster]{cursor:pointer;position:absolute;height:100%;width:100%;z-index:998;top:0}.player-poster[data-poster] .poster-background[data-poster]{width:100%;height:100%;background-size:cover;background-repeat:no-repeat;background-position:50% 50%}.player-poster[data-poster] .play-wrapper[data-poster]{position:absolute;width:100%;height:25%;line-height:100%;font-size:25%;top:50%;text-align:center}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]{font-family:Player;font-weight:400;font-style:normal;line-height:1;letter-spacing:0;speak:none;color:#fff;opacity:.75;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:opacity text-shadow;-webkit-transition-delay:.1s;-moz-transition:opacity text-shadow .1s;-o-transition:opacity text-shadow .1s;transition:opacity text-shadow .1s ease}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster].play[data-poster]:before{content:\"\\e001\"}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]:hover{opacity:1;text-shadow:rgba(255,255,255,.8) 0 0 15px}", spinner_three_bounce: ".spinner-three-bounce[data-spinner]{position:absolute;margin:0 auto;width:70px;text-align:center;z-index:999;top:47%;left:0;right:0}.spinner-three-bounce[data-spinner]>div{width:18px;height:18px;background-color:#FFF;border-radius:100%;display:inline-block;-webkit-animation:bouncedelay 1.4s infinite ease-in-out;-moz-animation:bouncedelay 1.4s infinite ease-in-out;-ms-animation:bouncedelay 1.4s infinite ease-in-out;-o-animation:bouncedelay 1.4s infinite ease-in-out;animation:bouncedelay 1.4s infinite ease-in-out;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both}.spinner-three-bounce[data-spinner] [data-bounce1],.spinner-three-bounce[data-spinner] [data-bounce2]{-webkit-animation-delay:-.32s;-moz-animation-delay:-.32s;-ms-animation-delay:-.32s;-o-animation-delay:-.32s;animation-delay:-.32s}@-moz-keyframes bouncedelay{0%,100%,80%{-moz-transform:scale(0);transform:scale(0)}40%{-moz-transform:scale(1);transform:scale(1)}}@-webkit-keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@-o-keyframes bouncedelay{0%,100%,80%{-o-transform:scale(0);transform:scale(0)}40%{-o-transform:scale(1);transform:scale(1)}}@-ms-keyframes bouncedelay{0%,100%,80%{-ms-transform:scale(0);transform:scale(0)}40%{-ms-transform:scale(1);transform:scale(1)}}@keyframes bouncedelay{0%,100%,80%{transform:scale(0)}40%{transform:scale(1)}}", watermark: "[data-watermark]{position:absolute;margin:100px auto 0;width:70px;text-align:center;z-index:10}[data-watermark-bottom-left]{bottom:10px;left:10px}[data-watermark-bottom-right]{bottom:10px;right:42px}[data-watermark-top-left]{top:-95px;left:10px}[data-watermark-top-right]{top:-95px;right:37px}" } };

},{"./template":"template"}],48:[function(require,module,exports){
// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

"use strict";

var $ = require("clappr-zepto");
var template = require("./template");
var JST = require("./jst");

var Styler = {
  getStyleFor: function getStyleFor(name) {
    var options = arguments[1] === undefined ? { baseUrl: "" } : arguments[1];

    return $("<style class=\"clappr-style\"></style>").html(template(JST.CSS[name])(options));
  }
};

module.exports = Styler;

},{"./jst":47,"./template":"template","clappr-zepto":"zepto"}],49:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var assign = require("lodash.assign");
var Browser = require("../components/browser");

var extend = function extend(protoProps, staticProps) {
  var parent = this;
  var child;

  if (protoProps && protoProps.constructor !== undefined) {
    child = protoProps.constructor;
  } else {
    child = function () {
      return parent.apply(this, arguments);
    };
  }

  assign(child, parent, staticProps);

  var Surrogate = function Surrogate() {
    this.constructor = child;
  };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();

  if (protoProps) assign(child.prototype, protoProps);

  child.__super__ = parent.prototype;

  child["super"] = function (name) {
    return parent.prototype[name];
  };

  child.prototype.getClass = function () {
    return child;
  };

  return child;
};

var formatTime = function formatTime(time) {
  time = time * 1000;
  time = parseInt(time / 1000);
  var seconds = time % 60;
  time = parseInt(time / 60);
  var minutes = time % 60;
  time = parseInt(time / 60);
  var hours = time % 24;
  var out = "";
  if (hours && hours > 0) out += ("0" + hours).slice(-2) + ":";
  out += ("0" + minutes).slice(-2) + ":";
  out += ("0" + seconds).slice(-2);
  return out.trim();
};

var Fullscreen = {
  isFullscreen: function isFullscreen() {
    return document.webkitFullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || !!document.msFullscreenElement;
  },
  requestFullscreen: function requestFullscreen(el) {
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else if (el.querySelector && el.querySelector("video").webkitEnterFullScreen) {
      el.querySelector("video").webkitEnterFullScreen();
    }
  },
  cancelFullscreen: function cancelFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
};

var Config = (function () {
  function Config() {
    _classCallCheck(this, Config);
  }

  _createClass(Config, null, {
    _defaultConfig: {
      value: function _defaultConfig() {
        return {
          volume: {
            value: 100,
            parse: parseInt
          }
        };
      }
    },
    _defaultValueFor: {
      value: function _defaultValueFor(key) {
        try {
          return this._defaultConfig()[key].parse(this._defaultConfig()[key].value);
        } catch (e) {
          return undefined;
        }
      }
    },
    _create_keyspace: {
      value: function _create_keyspace(key) {
        return "clappr." + document.domain + "." + key;
      }
    },
    restore: {
      value: function restore(key) {
        if (Browser.hasLocalstorage && localStorage[this._create_keyspace(key)]) {
          return this._defaultConfig()[key].parse(localStorage[this._create_keyspace(key)]);
        }
        return this._defaultValueFor(key);
      }
    },
    persist: {
      value: function persist(key, value) {
        if (Browser.hasLocalstorage) {
          try {
            localStorage[this._create_keyspace(key)] = value;
            return true;
          } catch (e) {
            return false;
          }
        }
      }
    }
  });

  return Config;
})();

var seekStringToSeconds = function seekStringToSeconds(url) {
  var elements = (url.match(/t=([0-9]*h)?([0-9]*m)?([0-9]*s)?/) || []).splice(1);
  return !!elements.length ? elements.map(function (el) {
    if (el) {
      var value = parseInt(el.slice(0, 2)) || 0;
      switch (el[el.length - 1]) {
        case "h":
          value = value * 3600;break;
        case "m":
          value = value * 60;break;
      }
      return value;
    }
    return 0;
  }).reduce(function (a, b) {
    return a + b;
  }) : 0;
};

var idsCounter = {};

var uniqueId = function uniqueId(prefix) {
  idsCounter[prefix] || (idsCounter[prefix] = 0);
  var id = ++idsCounter[prefix];
  return prefix + id;
};

module.exports = {
  extend: extend,
  formatTime: formatTime,
  Fullscreen: Fullscreen,
  Config: Config,
  seekStringToSeconds: seekStringToSeconds,
  uniqueId: uniqueId
};

},{"../components/browser":"browser","lodash.assign":2}],50:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * Container is responsible for the video rendering and state
 */

var UIObject = require("../../base/ui_object");
var Styler = require("../../base/styler");
var Events = require("../../base/events");
var find = require("lodash.find");

var Container = (function (_UIObject) {
  function Container(options) {
    _classCallCheck(this, Container);

    _get(Object.getPrototypeOf(Container.prototype), "constructor", this).call(this, options);
    this.playback = options.playback;
    this.settings = this.playback.settings;
    this.isReady = false;
    this.mediaControlDisabled = false;
    this.plugins = [this.playback];
    this.bindEvents();
  }

  _inherits(Container, _UIObject);

  _createClass(Container, {
    name: {
      get: function () {
        return "Container";
      }
    },
    attributes: {
      get: function () {
        return { "class": "container", "data-container": "" };
      }
    },
    events: {
      get: function () {
        return { click: "clicked", mouseenter: "mouseEnter", mouseleave: "mouseLeave" };
      }
    },
    bindEvents: {
      value: function bindEvents() {
        this.listenTo(this.playback, Events.PLAYBACK_PROGRESS, this.progress);
        this.listenTo(this.playback, Events.PLAYBACK_TIMEUPDATE, this.timeUpdated);
        this.listenTo(this.playback, Events.PLAYBACK_READY, this.ready);
        this.listenTo(this.playback, Events.PLAYBACK_BUFFERING, this.buffering);
        this.listenTo(this.playback, Events.PLAYBACK_BUFFERFULL, this.bufferfull);
        this.listenTo(this.playback, Events.PLAYBACK_SETTINGSUPDATE, this.settingsUpdate);
        this.listenTo(this.playback, Events.PLAYBACK_LOADEDMETADATA, this.loadedMetadata);
        this.listenTo(this.playback, Events.PLAYBACK_HIGHDEFINITIONUPDATE, this.highDefinitionUpdate);
        this.listenTo(this.playback, Events.PLAYBACK_BITRATE, this.updateBitrate);
        this.listenTo(this.playback, Events.PLAYBACK_PLAYBACKSTATE, this.playbackStateChanged);
        this.listenTo(this.playback, Events.PLAYBACK_DVR, this.playbackDvrStateChanged);
        this.listenTo(this.playback, Events.PLAYBACK_MEDIACONTROL_DISABLE, this.disableMediaControl);
        this.listenTo(this.playback, Events.PLAYBACK_MEDIACONTROL_ENABLE, this.enableMediaControl);
        this.listenTo(this.playback, Events.PLAYBACK_ENDED, this.ended);
        this.listenTo(this.playback, Events.PLAYBACK_PLAY, this.playing);
        this.listenTo(this.playback, Events.PLAYBACK_ERROR, this.error);
      }
    },
    playbackStateChanged: {
      value: function playbackStateChanged() {
        this.trigger(Events.CONTAINER_PLAYBACKSTATE);
      }
    },
    playbackDvrStateChanged: {
      value: function playbackDvrStateChanged(dvrInUse) {
        this.settings = this.playback.settings;
        this.dvrInUse = dvrInUse;
        this.trigger(Events.CONTAINER_PLAYBACKDVRSTATECHANGED, dvrInUse);
      }
    },
    updateBitrate: {
      value: function updateBitrate(newBitrate) {
        this.trigger(Events.CONTAINER_BITRATE, newBitrate);
      }
    },
    statsReport: {
      value: function statsReport(metrics) {
        this.trigger(Events.CONTAINER_STATS_REPORT, metrics);
      }
    },
    getPlaybackType: {
      value: function getPlaybackType() {
        return this.playback.getPlaybackType();
      }
    },
    isDvrEnabled: {
      value: function isDvrEnabled() {
        return !!this.playback.dvrEnabled;
      }
    },
    isDvrInUse: {
      value: function isDvrInUse() {
        return !!this.dvrInUse;
      }
    },
    destroy: {
      value: function destroy() {
        this.trigger(Events.CONTAINER_DESTROYED, this, this.name);
        this.playback.destroy();
        this.plugins.forEach(function (plugin) {
          return plugin.destroy();
        });
        this.$el.remove();
      }
    },
    setStyle: {
      value: function setStyle(style) {
        this.$el.css(style);
      }
    },
    animate: {
      value: function animate(style, duration) {
        return this.$el.animate(style, duration).promise();
      }
    },
    ready: {
      value: function ready() {
        this.isReady = true;
        this.trigger(Events.CONTAINER_READY, this.name);
      }
    },
    isPlaying: {
      value: function isPlaying() {
        return this.playback.isPlaying();
      }
    },
    getDuration: {
      value: function getDuration() {
        return this.playback.getDuration();
      }
    },
    error: {
      value: function error(errorObj) {
        this.$el.append(errorObj.render().el);
        this.trigger(Events.CONTAINER_ERROR, { error: errorObj, container: this }, this.name);
      }
    },
    loadedMetadata: {
      value: function loadedMetadata(duration) {
        this.trigger(Events.CONTAINER_LOADEDMETADATA, duration);
      }
    },
    timeUpdated: {
      value: function timeUpdated(position, duration) {
        this.trigger(Events.CONTAINER_TIMEUPDATE, position, duration, this.name);
      }
    },
    progress: {
      value: function progress(startPosition, endPosition, duration) {
        this.trigger(Events.CONTAINER_PROGRESS, startPosition, endPosition, duration, this.name);
      }
    },
    playing: {
      value: function playing() {
        this.trigger(Events.CONTAINER_PLAY, this.name);
      }
    },
    play: {
      value: function play() {
        this.playback.play();
      }
    },
    stop: {
      value: function stop() {
        this.trigger(Events.CONTAINER_STOP, this.name);
        this.playback.stop();
      }
    },
    pause: {
      value: function pause() {
        this.trigger(Events.CONTAINER_PAUSE, this.name);
        this.playback.pause();
      }
    },
    ended: {
      value: function ended() {
        this.trigger(Events.CONTAINER_ENDED, this, this.name);
      }
    },
    clicked: {
      value: function clicked() {
        this.trigger(Events.CONTAINER_CLICK, this, this.name);
      }
    },
    setCurrentTime: {
      value: function setCurrentTime(time) {
        this.trigger(Events.CONTAINER_SEEK, time, this.name);
        this.playback.seek(time);
      }
    },
    setVolume: {
      value: function setVolume(value) {
        this.trigger(Events.CONTAINER_VOLUME, value, this.name);
        this.playback.volume(value);
      }
    },
    fullscreen: {
      value: function fullscreen() {
        this.trigger(Events.CONTAINER_FULLSCREEN, this.name);
      }
    },
    buffering: {
      value: function buffering() {
        this.trigger(Events.CONTAINER_STATE_BUFFERING, this.name);
      }
    },
    bufferfull: {
      value: function bufferfull() {
        this.trigger(Events.CONTAINER_STATE_BUFFERFULL, this.name);
      }
    },
    addPlugin: {
      value: function addPlugin(plugin) {
        this.plugins.push(plugin);
      }
    },
    hasPlugin: {
      value: function hasPlugin(name) {
        return !!this.getPlugin(name);
      }
    },
    getPlugin: {
      value: function getPlugin(name) {
        return find(this.plugins, function (plugin) {
          return plugin.name === name;
        });
      }
    },
    mouseEnter: {
      value: function mouseEnter() {
        this.trigger(Events.CONTAINER_MOUSE_ENTER);
      }
    },
    mouseLeave: {
      value: function mouseLeave() {
        this.trigger(Events.CONTAINER_MOUSE_LEAVE);
      }
    },
    settingsUpdate: {
      value: function settingsUpdate() {
        this.settings = this.playback.settings;
        this.trigger(Events.CONTAINER_SETTINGSUPDATE);
      }
    },
    highDefinitionUpdate: {
      value: function highDefinitionUpdate() {
        this.trigger(Events.CONTAINER_HIGHDEFINITIONUPDATE);
      }
    },
    isHighDefinitionInUse: {
      value: function isHighDefinitionInUse() {
        return this.playback.isHighDefinitionInUse();
      }
    },
    disableMediaControl: {
      value: function disableMediaControl() {
        this.mediaControlDisabled = true;
        this.trigger(Events.CONTAINER_MEDIACONTROL_DISABLE);
      }
    },
    enableMediaControl: {
      value: function enableMediaControl() {
        this.mediaControlDisabled = false;
        this.trigger(Events.CONTAINER_MEDIACONTROL_ENABLE);
      }
    },
    render: {
      value: function render() {
        var style = Styler.getStyleFor("container");
        this.$el.append(style);
        this.$el.append(this.playback.render().el);
        return this;
      }
    }
  });

  return Container;
})(UIObject);

module.exports = Container;

},{"../../base/events":"events","../../base/styler":48,"../../base/ui_object":"ui_object","lodash.find":12}],51:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * The ContainerFactory is responsible for manage playback bootstrap and create containers.
 */

var assign = require("lodash.assign");
var BaseObject = require("../../base/base_object");
var Container = require("../container");
var $ = require("clappr-zepto");
var Events = require("../../base/events");
var find = require("lodash.find");

var ContainerFactory = (function (_BaseObject) {
  function ContainerFactory(options, loader) {
    _classCallCheck(this, ContainerFactory);

    _get(Object.getPrototypeOf(ContainerFactory.prototype), "constructor", this).call(this, options);
    this.options = options;
    this.loader = loader;
  }

  _inherits(ContainerFactory, _BaseObject);

  _createClass(ContainerFactory, {
    createContainers: {
      value: function createContainers() {
        var _this = this;

        return $.Deferred(function (promise) {
          promise.resolve(_this.options.sources.map(function (source) {
            return _this.createContainer(source);
          }));
        });
      }
    },
    findPlaybackPlugin: {
      value: function findPlaybackPlugin(source) {
        return find(this.loader.playbackPlugins, function (p) {
          return p.canPlay(source.toString());
        });
      }
    },
    createContainer: {
      value: function createContainer(source, options) {
        options = assign({}, options, this.options, { src: source, autoPlay: !!this.options.autoPlay });
        var playbackPlugin = this.findPlaybackPlugin(source);
        var playback = new playbackPlugin(options);
        var container = new Container({ playback: playback });
        var defer = $.Deferred();
        defer.promise(container);
        this.addContainerPlugins(container, source);
        this.listenToOnce(container, Events.CONTAINER_READY, function () {
          return defer.resolve(container);
        });
        return container;
      }
    },
    addContainerPlugins: {
      value: function addContainerPlugins(container, source) {
        var _this = this;

        this.loader.containerPlugins.forEach(function (Plugin) {
          var options = assign(_this.options, { container: container, src: source });
          container.addPlugin(new Plugin(options));
        });
      }
    }
  });

  return ContainerFactory;
})(BaseObject);

module.exports = ContainerFactory;

},{"../../base/base_object":"base_object","../../base/events":"events","../container":"container","clappr-zepto":"zepto","lodash.assign":2,"lodash.find":12}],52:[function(require,module,exports){
"use strict";

module.exports = require("./container_factory");

},{"./container_factory":51}],53:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * The Core is responsible to manage Containers, the mediator, MediaControl
 * and the player state.
 */

var assign = require("lodash.assign");
var $ = require("clappr-zepto");

var UIObject = require("../../base/ui_object");
var ContainerFactory = require("../container_factory");
var Fullscreen = require("../../base/utils").Fullscreen;
var Styler = require("../../base/styler");
var MediaControl = require("../media_control");
var PlayerInfo = require("../player_info");
var Mediator = require("../mediator");
var Events = require("../../base/events");

var find = require("lodash.find");

var Core = (function (_UIObject) {
  function Core(options) {
    var _this = this;

    _classCallCheck(this, Core);

    _get(Object.getPrototypeOf(Core.prototype), "constructor", this).call(this, options);
    PlayerInfo.options = options;
    this.options = options;
    this.plugins = [];
    this.containers = [];
    this.createContainers(options);
    //FIXME fullscreen api sucks
    $(document).bind("fullscreenchange", function () {
      return _this.exit();
    });
    $(document).bind("MSFullscreenChange", function () {
      return _this.exit();
    });
    $(document).bind("mozfullscreenchange", function () {
      return _this.exit();
    });
  }

  _inherits(Core, _UIObject);

  _createClass(Core, {
    events: {
      get: function () {
        return {
          webkitfullscreenchange: "exit",
          mousemove: "showMediaControl",
          mouseleave: "hideMediaControl"
        };
      }
    },
    attributes: {
      get: function () {
        return {
          "data-player": ""
        };
      }
    },
    createContainers: {
      value: function createContainers(options) {
        var _this = this;

        this.defer = $.Deferred();
        this.defer.promise(this);
        this.containerFactory = new ContainerFactory(options, options.loader);
        this.containerFactory.createContainers().then(function (containers) {
          return _this.setupContainers(containers);
        }).then(function (containers) {
          return _this.resolveOnContainersReady(containers);
        });
      }
    },
    updateSize: {
      value: function updateSize() {
        if (Fullscreen.isFullscreen()) {
          this.setFullscreen();
        } else {
          this.setPlayerSize();
        }
        Mediator.trigger(Events.PLAYER_RESIZE);
      }
    },
    setFullscreen: {
      value: function setFullscreen() {
        this.$el.addClass("fullscreen");
        this.$el.removeAttr("style");
        PlayerInfo.previousSize = PlayerInfo.currentSize;
        PlayerInfo.currentSize = { width: $(window).width(), height: $(window).height() };
      }
    },
    setPlayerSize: {
      value: function setPlayerSize() {
        this.$el.removeClass("fullscreen");
        PlayerInfo.currentSize = PlayerInfo.previousSize;
        PlayerInfo.previousSize = { width: $(window).width(), height: $(window).height() };
        this.resize(PlayerInfo.currentSize);
      }
    },
    resize: {
      value: function resize(options) {
        this.el.style.height = "" + options.height + "px";
        this.el.style.width = "" + options.width + "px";
        PlayerInfo.previousSize = PlayerInfo.currentSize;
        PlayerInfo.currentSize = options;
        Mediator.trigger(Events.PLAYER_RESIZE);
      }
    },
    resolveOnContainersReady: {
      value: function resolveOnContainersReady(containers) {
        var _this = this;

        $.when.apply($, containers).done(function () {
          return _this.defer.resolve(_this);
        });
      }
    },
    addPlugin: {
      value: function addPlugin(plugin) {
        this.plugins.push(plugin);
      }
    },
    hasPlugin: {
      value: function hasPlugin(name) {
        return !!this.getPlugin(name);
      }
    },
    getPlugin: {
      value: function getPlugin(name) {
        return find(this.plugins, function (plugin) {
          return plugin.name === name;
        });
      }
    },
    load: {
      value: function load(sources) {
        var _this = this;

        sources = sources && sources.constructor === Array ? sources : [sources.toString()];
        this.containers.forEach(function (container) {
          return container.destroy();
        });
        this.containerFactory.options = assign(this.options, { sources: sources });
        this.containerFactory.createContainers().then(function (containers) {
          _this.setupContainers(containers);
        });
      }
    },
    destroy: {
      value: function destroy() {
        this.containers.forEach(function (container) {
          return container.destroy();
        });
        this.plugins.forEach(function (plugin) {
          return plugin.destroy();
        });
        this.$el.remove();
        this.mediaControl.destroy();
        $(document).unbind("fullscreenchange");
        $(document).unbind("MSFullscreenChange");
        $(document).unbind("mozfullscreenchange");
      }
    },
    exit: {
      value: function exit() {
        this.updateSize();
        this.mediaControl.show();
      }
    },
    setMediaControlContainer: {
      value: function setMediaControlContainer(container) {
        this.mediaControl.setContainer(container);
        this.mediaControl.render();
      }
    },
    disableMediaControl: {
      value: function disableMediaControl() {
        this.mediaControl.disable();
        this.$el.removeClass("nocursor");
      }
    },
    enableMediaControl: {
      value: function enableMediaControl() {
        this.mediaControl.enable();
      }
    },
    removeContainer: {
      value: function removeContainer(container) {
        this.stopListening(container);
        this.containers = this.containers.filter(function (c) {
          return c !== container;
        });
      }
    },
    appendContainer: {
      value: function appendContainer(container) {
        this.listenTo(container, Events.CONTAINER_DESTROYED, this.removeContainer);
        this.el.appendChild(container.render().el);
        this.containers.push(container);
      }
    },
    setupContainers: {
      value: function setupContainers(containers) {
        containers.map(this.appendContainer.bind(this));
        this.setupMediaControl(this.getCurrentContainer());
        this.render();
        this.$el.appendTo(this.options.parentElement);
        return containers;
      }
    },
    createContainer: {
      value: function createContainer(source, options) {
        var container = this.containerFactory.createContainer(source, options);
        this.appendContainer(container);
        return container;
      }
    },
    setupMediaControl: {
      value: function setupMediaControl(container) {
        if (this.mediaControl) {
          this.mediaControl.setContainer(container);
        } else {
          this.mediaControl = this.createMediaControl(assign({ container: container }, this.options));
          this.listenTo(this.mediaControl, Events.MEDIACONTROL_FULLSCREEN, this.toggleFullscreen);
          this.listenTo(this.mediaControl, Events.MEDIACONTROL_SHOW, this.onMediaControlShow.bind(this, true));
          this.listenTo(this.mediaControl, Events.MEDIACONTROL_HIDE, this.onMediaControlShow.bind(this, false));
        }
      }
    },
    createMediaControl: {
      value: function createMediaControl(options) {
        if (options.mediacontrol && options.mediacontrol.external) {
          return new options.mediacontrol.external(options);
        } else {
          return new MediaControl(options);
        }
      }
    },
    getCurrentContainer: {
      value: function getCurrentContainer() {
        return this.containers[0];
      }
    },
    toggleFullscreen: {
      value: function toggleFullscreen() {
        if (!Fullscreen.isFullscreen()) {
          Fullscreen.requestFullscreen(this.el);
          this.$el.addClass("fullscreen");
        } else {
          Fullscreen.cancelFullscreen();
          this.$el.removeClass("fullscreen nocursor");
        }
        this.mediaControl.show();
      }
    },
    showMediaControl: {
      value: function showMediaControl(event) {
        this.mediaControl.show(event);
      }
    },
    hideMediaControl: {
      value: function hideMediaControl(event) {
        this.mediaControl.hide(event);
      }
    },
    onMediaControlShow: {
      value: function onMediaControlShow(showing) {
        if (showing) this.$el.removeClass("nocursor");else if (Fullscreen.isFullscreen()) this.$el.addClass("nocursor");
      }
    },
    render: {
      value: function render() {
        var style = Styler.getStyleFor("core");
        //FIXME
        //this.$el.empty()
        this.$el.append(style);
        this.$el.append(this.mediaControl.render().el);

        this.options.width = this.options.width || this.$el.width();
        this.options.height = this.options.height || this.$el.height();
        var size = { width: this.options.width, height: this.options.height };
        PlayerInfo.previousSize = PlayerInfo.currentSize = size;
        this.updateSize();

        return this;
      }
    }
  });

  return Core;
})(UIObject);

module.exports = Core;

},{"../../base/events":"events","../../base/styler":48,"../../base/ui_object":"ui_object","../../base/utils":49,"../container_factory":52,"../media_control":"media_control","../mediator":"mediator","../player_info":"player_info","clappr-zepto":"zepto","lodash.assign":2,"lodash.find":12}],54:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * The Core Factory is responsible for instantiate the core and it's plugins.
 */

var BaseObject = require("../../base/base_object");
var Core = require("../core");

var CoreFactory = (function (_BaseObject) {
  function CoreFactory(player, loader) {
    _classCallCheck(this, CoreFactory);

    this.player = player;
    this.options = player.options;
    this.loader = loader;
    this.options.loader = this.loader;
  }

  _inherits(CoreFactory, _BaseObject);

  _createClass(CoreFactory, {
    create: {
      value: function create() {
        this.core = new Core(this.options);
        this.core.then(this.addCorePlugins.bind(this));
        return this.core;
      }
    },
    addCorePlugins: {
      value: function addCorePlugins() {
        var _this = this;

        this.loader.corePlugins.forEach(function (Plugin) {
          var plugin = new Plugin(_this.core);
          _this.core.addPlugin(plugin);
          _this.setupExternalInterface(plugin);
        });
        return this.core;
      }
    },
    setupExternalInterface: {
      value: function setupExternalInterface(plugin) {
        var externalFunctions = plugin.getExternalInterface();
        for (var key in externalFunctions) {
          this.player[key] = externalFunctions[key].bind(plugin);
        }
      }
    }
  });

  return CoreFactory;
})(BaseObject);

module.exports = CoreFactory;

},{"../../base/base_object":"base_object","../core":"core"}],55:[function(require,module,exports){
"use strict";

module.exports = require("./core_factory");

},{"./core_factory":54}],56:[function(require,module,exports){
"use strict";

module.exports = require("./loader");

},{"./loader":57}],57:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var BaseObject = require("../../base/base_object");
var PlayerInfo = require("../player_info");
var uniq = require("lodash.uniq");

/* Playback Plugins */
var HTML5VideoPlayback = require("../../playbacks/html5_video");
var FlashVideoPlayback = require("../../playbacks/flash");
var HTML5AudioPlayback = require("../../playbacks/html5_audio");
var HLSVideoPlayback = require("../../playbacks/hls");
var HTMLImgPlayback = require("../../playbacks/html_img");
var NoOp = require("../../playbacks/no_op");

/* Container Plugins */
var SpinnerThreeBouncePlugin = require("../../plugins/spinner_three_bounce");
var StatsPlugin = require("../../plugins/stats");
var WaterMarkPlugin = require("../../plugins/watermark");
var PosterPlugin = require("../../plugins/poster");
var GoogleAnalyticsPlugin = require("../../plugins/google_analytics");
var ClickToPausePlugin = require("../../plugins/click_to_pause");

/* Core Plugins */
var DVRControls = require("../../plugins/dvr_controls");

var Loader = (function (_BaseObject) {
  function Loader(externalPlugins) {
    _classCallCheck(this, Loader);

    _get(Object.getPrototypeOf(Loader.prototype), "constructor", this).call(this);
    this.playbackPlugins = [HTML5VideoPlayback, FlashVideoPlayback, HTML5AudioPlayback, HLSVideoPlayback, HTMLImgPlayback, NoOp];
    this.containerPlugins = [SpinnerThreeBouncePlugin, WaterMarkPlugin, PosterPlugin, StatsPlugin, GoogleAnalyticsPlugin, ClickToPausePlugin];
    this.corePlugins = [DVRControls];
    if (externalPlugins) {
      this.addExternalPlugins(externalPlugins);
    }
  }

  _inherits(Loader, _BaseObject);

  _createClass(Loader, {
    addExternalPlugins: {
      value: function addExternalPlugins(plugins) {
        var pluginName = function pluginName(plugin) {
          return plugin.prototype.name;
        };
        if (plugins.playback) {
          this.playbackPlugins = uniq(plugins.playback.concat(this.playbackPlugins), pluginName);
        }
        if (plugins.container) {
          this.containerPlugins = uniq(plugins.container.concat(this.containerPlugins), pluginName);
        }
        if (plugins.core) {
          this.corePlugins = uniq(plugins.core.concat(this.corePlugins), pluginName);
        }
        PlayerInfo.playbackPlugins = this.playbackPlugins;
      }
    },
    getPlugin: {
      value: function getPlugin(name) {
        var allPlugins = this.containerPlugins.concat(this.playbackPlugins).concat(this.corePlugins);
        return allPlugins.find(function (plugin) {
          return plugin.prototype.name === name;
        });
      }
    }
  });

  return Loader;
})(BaseObject);

module.exports = Loader;

},{"../../base/base_object":"base_object","../../playbacks/flash":"flash","../../playbacks/hls":"hls","../../playbacks/html5_audio":"html5_audio","../../playbacks/html5_video":"html5_video","../../playbacks/html_img":"html_img","../../playbacks/no_op":67,"../../plugins/click_to_pause":70,"../../plugins/dvr_controls":72,"../../plugins/google_analytics":74,"../../plugins/poster":"poster","../../plugins/spinner_three_bounce":78,"../../plugins/stats":80,"../../plugins/watermark":82,"../player_info":"player_info","lodash.uniq":31}],58:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * The MediaControl is responsible for displaying the Player controls.
 */

var $ = require("clappr-zepto");
var JST = require("../../base/jst");
var Styler = require("../../base/styler");
var UIObject = require("../../base/ui_object");
var Utils = require("../../base/utils");
var Browser = require("../browser");
var SeekTime = require("../seek_time");
var Mediator = require("../mediator");
var PlayerInfo = require("../player_info");
var Events = require("../../base/events");
var Kibo = require("../../base/kibo");

var MediaControl = (function (_UIObject) {
  function MediaControl(options) {
    var _this = this;

    _classCallCheck(this, MediaControl);

    _get(Object.getPrototypeOf(MediaControl.prototype), "constructor", this).call(this, options);
    this.kibo = new Kibo();
    this.seekTime = new SeekTime(this);
    this.options = options;
    this.mute = this.options.mute;
    this.persistConfig = this.options.persistConfig;
    this.container = options.container;
    var initialVolume = this.persistConfig ? Utils.Config.restore("volume") : 100;
    this.setVolume(this.mute ? 0 : initialVolume);
    this.keepVisible = false;
    this.addEventListeners();
    this.settings = {
      left: ["play", "stop", "pause"],
      right: ["volume"],
      "default": ["position", "seekbar", "duration"]
    };
    this.settings = Object.keys(this.container.settings).length === 0 ? this.settings : this.container.settings;
    this.disabled = false;
    if (this.container.mediaControlDisabled || this.options.chromeless) {
      this.disable();
    }
    $(document).bind("mouseup", function (event) {
      return _this.stopDrag(event);
    });
    $(document).bind("mousemove", function (event) {
      return _this.updateDrag(event);
    });
    Mediator.on(Events.PLAYER_RESIZE, function () {
      return _this.playerResize();
    });
  }

  _inherits(MediaControl, _UIObject);

  _createClass(MediaControl, {
    name: {
      get: function () {
        return "MediaControl";
      }
    },
    attributes: {
      get: function () {
        return {
          "class": "media-control",
          "data-media-control": ""
        };
      }
    },
    events: {
      get: function () {
        return {
          "click [data-play]": "play",
          "click [data-pause]": "pause",
          "click [data-playpause]": "togglePlayPause",
          "click [data-stop]": "stop",
          "click [data-playstop]": "togglePlayStop",
          "click [data-fullscreen]": "toggleFullscreen",
          "click .bar-container[data-seekbar]": "seek",
          "click .bar-container[data-volume]": "volume",
          "click .drawer-icon[data-volume]": "toggleMute",
          "mouseenter .drawer-container[data-volume]": "showVolumeBar",
          "mouseleave .drawer-container[data-volume]": "hideVolumeBar",
          "mousedown .bar-scrubber[data-volume]": "startVolumeDrag",
          "mousedown .bar-scrubber[data-seekbar]": "startSeekDrag",
          "mousemove .bar-container[data-seekbar]": "mousemoveOnSeekBar",
          "mouseleave .bar-container[data-seekbar]": "mouseleaveOnSeekBar",
          "mouseenter .media-control-layer[data-controls]": "setKeepVisible",
          "mouseleave .media-control-layer[data-controls]": "resetKeepVisible"
        };
      }
    },
    template: {
      get: function () {
        return JST.media_control;
      }
    },
    addEventListeners: {
      value: function addEventListeners() {
        this.listenTo(this.container, Events.CONTAINER_PLAY, this.changeTogglePlay);
        this.listenTo(this.container, Events.CONTAINER_TIMEUPDATE, this.updateSeekBar);
        this.listenTo(this.container, Events.CONTAINER_PROGRESS, this.updateProgressBar);
        this.listenTo(this.container, Events.CONTAINER_SETTINGSUPDATE, this.settingsUpdate);
        this.listenTo(this.container, Events.CONTAINER_PLAYBACKDVRSTATECHANGED, this.settingsUpdate);
        this.listenTo(this.container, Events.CONTAINER_HIGHDEFINITIONUPDATE, this.highDefinitionUpdate);
        this.listenTo(this.container, Events.CONTAINER_MEDIACONTROL_DISABLE, this.disable);
        this.listenTo(this.container, Events.CONTAINER_MEDIACONTROL_ENABLE, this.enable);
        this.listenTo(this.container, Events.CONTAINER_ENDED, this.ended);
      }
    },
    disable: {
      value: function disable() {
        this.disabled = true;
        this.hide();
        this.$el.hide();
      }
    },
    enable: {
      value: function enable() {
        if (this.options.chromeless) {
          return;
        }this.disabled = false;
        this.show();
      }
    },
    play: {
      value: function play() {
        this.container.play();
      }
    },
    pause: {
      value: function pause() {
        this.container.pause();
      }
    },
    stop: {
      value: function stop() {
        this.container.stop();
      }
    },
    changeTogglePlay: {
      value: function changeTogglePlay() {
        if (this.container.isPlaying()) {
          this.$playPauseToggle.removeClass("paused").addClass("playing");
          this.$playStopToggle.removeClass("stopped").addClass("playing");
          this.trigger(Events.MEDIACONTROL_PLAYING);
        } else {
          this.$playPauseToggle.removeClass("playing").addClass("paused");
          this.$playStopToggle.removeClass("playing").addClass("stopped");
          this.trigger(Events.MEDIACONTROL_NOTPLAYING);
        }
      }
    },
    mousemoveOnSeekBar: {
      value: function mousemoveOnSeekBar(event) {
        if (this.container.settings.seekEnabled) {
          var offsetX = event.pageX - this.$seekBarContainer.offset().left - this.$seekBarHover.width() / 2;
          this.$seekBarHover.css({ left: offsetX });
        }
        this.trigger(Events.MEDIACONTROL_MOUSEMOVE_SEEKBAR, event);
      }
    },
    mouseleaveOnSeekBar: {
      value: function mouseleaveOnSeekBar(event) {
        this.trigger(Events.MEDIACONTROL_MOUSELEAVE_SEEKBAR, event);
      }
    },
    playerResize: {
      value: function playerResize() {
        if (Utils.Fullscreen.isFullscreen()) {
          this.$fullscreenToggle.addClass("shrink");
        } else {
          this.$fullscreenToggle.removeClass("shrink");
        }
        this.$el.removeClass("w320");
        if (PlayerInfo.currentSize.width <= 320 || this.options.hideVolumeBar) {
          this.$el.addClass("w320");
        }
      }
    },
    togglePlayPause: {
      value: function togglePlayPause() {
        if (this.container.isPlaying()) {
          this.container.pause();
        } else {
          this.container.play();
        }
        this.changeTogglePlay();
        return false;
      }
    },
    togglePlayStop: {
      value: function togglePlayStop() {
        if (this.container.isPlaying()) {
          this.container.stop();
        } else {
          this.container.play();
        }
        this.changeTogglePlay();
      }
    },
    startSeekDrag: {
      value: function startSeekDrag(event) {
        if (!this.container.settings.seekEnabled) {
          return;
        }this.draggingSeekBar = true;
        this.$el.addClass("dragging");
        this.$seekBarLoaded.addClass("media-control-notransition");
        this.$seekBarPosition.addClass("media-control-notransition");
        this.$seekBarScrubber.addClass("media-control-notransition");
        if (event) {
          event.preventDefault();
        }
      }
    },
    startVolumeDrag: {
      value: function startVolumeDrag(event) {
        this.draggingVolumeBar = true;
        this.$el.addClass("dragging");
        if (event) {
          event.preventDefault();
        }
      }
    },
    stopDrag: {
      value: function stopDrag(event) {
        if (this.draggingSeekBar) {
          this.seek(event);
        }
        this.$el.removeClass("dragging");
        this.$seekBarLoaded.removeClass("media-control-notransition");
        this.$seekBarPosition.removeClass("media-control-notransition");
        this.$seekBarScrubber.removeClass("media-control-notransition dragging");
        this.draggingSeekBar = false;
        this.draggingVolumeBar = false;
      }
    },
    updateDrag: {
      value: function updateDrag(event) {
        if (event) {
          event.preventDefault();
        }
        if (this.draggingSeekBar) {
          var offsetX = event.pageX - this.$seekBarContainer.offset().left;
          var pos = offsetX / this.$seekBarContainer.width() * 100;
          pos = Math.min(100, Math.max(pos, 0));
          this.setSeekPercentage(pos);
        } else if (this.draggingVolumeBar) {
          this.volume(event);
        }
      }
    },
    volume: {
      value: function volume(event) {
        var offsetY = event.pageX - this.$volumeBarContainer.offset().left;
        var volumeFromUI = offsetY / this.$volumeBarContainer.width() * 100;
        this.setVolume(volumeFromUI);
      }
    },
    toggleMute: {
      value: function toggleMute() {
        if (this.mute) {
          if (this.currentVolume <= 0) {
            this.currentVolume = 100;
          }
          this.setVolume(this.currentVolume);
        } else {
          this.setVolume(0);
        }
      }
    },
    setVolume: {
      value: function setVolume(value) {
        this.currentVolume = Math.min(100, Math.max(value, 0));
        this.container.setVolume(this.currentVolume);
        this.setVolumeLevel(this.currentVolume);
        this.mute = this.currentVolume === 0;
        this.persistConfig && Utils.Config.persist("volume", this.currentVolume);
      }
    },
    toggleFullscreen: {
      value: function toggleFullscreen() {
        this.trigger(Events.MEDIACONTROL_FULLSCREEN, this.name);
        this.container.fullscreen();
        this.resetKeepVisible();
      }
    },
    setContainer: {
      value: function setContainer(container) {
        this.stopListening(this.container);
        this.container = container;
        this.changeTogglePlay();
        this.addEventListeners();
        this.settingsUpdate();
        this.container.trigger(Events.CONTAINER_PLAYBACKDVRSTATECHANGED, this.container.isDvrInUse());
        this.setVolume(this.currentVolume);
        if (this.container.mediaControlDisabled) {
          this.disable();
        }
        this.trigger(Events.MEDIACONTROL_CONTAINERCHANGED);
      }
    },
    showVolumeBar: {
      value: function showVolumeBar() {
        if (this.hideVolumeId) {
          clearTimeout(this.hideVolumeId);
        }
        this.$volumeBarContainer.removeClass("volume-bar-hide");
      }
    },
    hideVolumeBar: {
      value: function hideVolumeBar() {
        var _this = this;

        var timeout = 400;
        if (!this.$volumeBarContainer) {
          return;
        }if (this.draggingVolumeBar) {
          this.hideVolumeId = setTimeout(function () {
            return _this.hideVolumeBar();
          }, timeout);
        } else {
          if (this.hideVolumeId) {
            clearTimeout(this.hideVolumeId);
          }
          this.hideVolumeId = setTimeout(function () {
            return _this.$volumeBarContainer.addClass("volume-bar-hide");
          }, timeout);
        }
      }
    },
    ended: {
      value: function ended() {
        this.changeTogglePlay();
      }
    },
    updateProgressBar: {
      value: function updateProgressBar(startPosition, endPosition, duration) {
        var loadedStart = startPosition / duration * 100;
        var loadedEnd = endPosition / duration * 100;
        this.$seekBarLoaded.css({ left: loadedStart + "%", width: loadedEnd - loadedStart + "%" });
      }
    },
    updateSeekBar: {
      value: function updateSeekBar(position, duration) {
        if (this.draggingSeekBar) {
          return;
        }if (position < 0) position = duration;
        this.$seekBarPosition.removeClass("media-control-notransition");
        this.$seekBarScrubber.removeClass("media-control-notransition");
        var seekbarValue = 100 / duration * position;
        this.setSeekPercentage(seekbarValue);
        this.$("[data-position]").html(Utils.formatTime(position));
        this.$("[data-duration]").html(Utils.formatTime(duration));
      }
    },
    seek: {
      value: function seek(event) {
        if (!this.container.settings.seekEnabled) {
          return;
        }var offsetX = event.pageX - this.$seekBarContainer.offset().left;
        var pos = offsetX / this.$seekBarContainer.width() * 100;
        pos = Math.min(100, Math.max(pos, 0));
        this.container.setCurrentTime(pos);
        this.setSeekPercentage(pos);
        return false;
      }
    },
    setKeepVisible: {
      value: function setKeepVisible() {
        this.keepVisible = true;
      }
    },
    resetKeepVisible: {
      value: function resetKeepVisible() {
        this.keepVisible = false;
      }
    },
    isVisible: {
      value: function isVisible() {
        return !this.$el.hasClass("media-control-hide");
      }
    },
    show: {
      value: function show(event) {
        var _this = this;

        if (this.disabled) {
          return;
        }var timeout = 2000;
        if (!event || event.clientX !== this.lastMouseX && event.clientY !== this.lastMouseY || navigator.userAgent.match(/firefox/i)) {
          clearTimeout(this.hideId);
          this.$el.show();
          this.trigger(Events.MEDIACONTROL_SHOW, this.name);
          this.$el.removeClass("media-control-hide");
          this.hideId = setTimeout(function () {
            return _this.hide();
          }, timeout);
          if (event) {
            this.lastMouseX = event.clientX;
            this.lastMouseY = event.clientY;
          }
        }
      }
    },
    hide: {
      value: function hide() {
        var _this = this;

        var timeout = 2000;
        clearTimeout(this.hideId);
        if (!this.isVisible() || this.options.hideMediaControl === false) {
          return;
        }if (this.keepVisible || this.draggingSeekBar || this.draggingVolumeBar) {
          this.hideId = setTimeout(function () {
            return _this.hide();
          }, timeout);
        } else {
          this.trigger(Events.MEDIACONTROL_HIDE, this.name);
          this.$el.addClass("media-control-hide");
          this.hideVolumeBar();
        }
      }
    },
    settingsUpdate: {
      value: function settingsUpdate() {
        if (this.container.getPlaybackType() !== null && Object.keys(this.container.settings).length !== 0) {
          this.settings = this.container.settings;
          this.render();
        } else {
          this.disable();
        }
      }
    },
    highDefinitionUpdate: {
      value: function highDefinitionUpdate() {
        if (this.container.isHighDefinitionInUse()) {
          this.$el.find("button[data-hd-indicator]").addClass("enabled");
        } else {
          this.$el.find("button[data-hd-indicator]").removeClass("enabled");
        }
      }
    },
    createCachedElements: {
      value: function createCachedElements() {
        this.$playPauseToggle = this.$el.find("button.media-control-button[data-playpause]");
        this.$playStopToggle = this.$el.find("button.media-control-button[data-playstop]");
        this.$fullscreenToggle = this.$el.find("button.media-control-button[data-fullscreen]");
        this.$seekBarContainer = this.$el.find(".bar-container[data-seekbar]");
        this.$seekBarLoaded = this.$el.find(".bar-fill-1[data-seekbar]");
        this.$seekBarPosition = this.$el.find(".bar-fill-2[data-seekbar]");
        this.$seekBarScrubber = this.$el.find(".bar-scrubber[data-seekbar]");
        this.$seekBarHover = this.$el.find(".bar-hover[data-seekbar]");
        this.$volumeContainer = this.$el.find(".drawer-container[data-volume]");
        this.$volumeBarContainer = this.$el.find(".bar-container[data-volume]");
        this.$volumeIcon = this.$el.find(".drawer-icon[data-volume]");
      }
    },
    setVolumeLevel: {
      value: function setVolumeLevel(value) {
        var _this = this;

        if (!this.container.isReady || !this.$volumeBarContainer) {
          this.listenToOnce(this.container, Events.CONTAINER_READY, function () {
            return _this.setVolumeLevel(value);
          });
        } else {
          this.$volumeBarContainer.find(".segmented-bar-element").removeClass("fill");
          var item = Math.ceil(value / 10);
          this.$volumeBarContainer.find(".segmented-bar-element").slice(0, item).addClass("fill");
          if (value > 0) {
            this.$volumeIcon.removeClass("muted");
          } else {
            this.$volumeIcon.addClass("muted");
          }
        }
      }
    },
    setSeekPercentage: {
      value: function setSeekPercentage(value) {
        if (value > 100) {
          return;
        }var pos = this.$seekBarContainer.width() * value / 100 - this.$seekBarScrubber.width() / 2;
        this.currentSeekPercentage = value;
        this.$seekBarPosition.css({ width: value + "%" });
        this.$seekBarScrubber.css({ left: pos });
      }
    },
    bindKeyEvents: {
      value: function bindKeyEvents() {
        var _this = this;

        this.kibo.down(["space"], function () {
          return _this.togglePlayPause();
        });
      }
    },
    unbindKeyEvents: {
      value: function unbindKeyEvents() {
        this.kibo.off("space");
      }
    },
    parseColors: {
      value: function parseColors() {
        if (this.options.mediacontrol) {
          var buttonsColor = this.options.mediacontrol.buttons;
          var seekbarColor = this.options.mediacontrol.seekbar;
          this.$el.find(".bar-fill-2[data-seekbar]").css("background-color", seekbarColor);
          this.$el.find("[data-media-control] > .media-control-icon, .drawer-icon").css("color", buttonsColor);
          this.$el.find(".segmented-bar-element[data-volume]").css("boxShadow", "inset 2px 0 0 " + buttonsColor);
        }
      }
    },
    destroy: {
      value: function destroy() {
        $(document).unbind("mouseup");
        $(document).unbind("mousemove");
        this.unbindKeyEvents();
      }
    },
    render: {
      value: function render() {
        var _this = this;

        var timeout = 1000;
        var style = Styler.getStyleFor("media_control", { baseUrl: this.options.baseUrl });
        this.$el.html(this.template({ settings: this.settings }));
        this.$el.append(style);
        this.createCachedElements();
        this.$playPauseToggle.addClass("paused");
        this.$playStopToggle.addClass("stopped");

        this.changeTogglePlay();
        this.hideId = setTimeout(function () {
          return _this.hide();
        }, timeout);
        if (this.disabled) {
          this.hide();
        }

        if (Browser.isSafari && Browser.isMobile) {
          this.$volumeContainer.css("display", "none");
        }

        this.$seekBarPosition.addClass("media-control-notransition");
        this.$seekBarScrubber.addClass("media-control-notransition");

        if (!this.currentSeekPercentage) {
          this.currentSeekPercentage = 0;
        }
        this.setSeekPercentage(this.currentSeekPercentage);

        this.$el.ready(function () {
          if (!_this.container.settings.seekEnabled) {
            _this.$seekBarContainer.addClass("seek-disabled");
          }

          _this.setVolume(_this.currentVolume);
          _this.bindKeyEvents();
          _this.hideVolumeBar();
        });

        this.parseColors();
        this.seekTime.render();
        this.highDefinitionUpdate();

        this.trigger(Events.MEDIACONTROL_RENDERED);
        return this;
      }
    }
  });

  return MediaControl;
})(UIObject);

module.exports = MediaControl;

},{"../../base/events":"events","../../base/jst":47,"../../base/kibo":"kibo","../../base/styler":48,"../../base/ui_object":"ui_object","../../base/utils":49,"../browser":"browser","../mediator":"mediator","../player_info":"player_info","../seek_time":60,"clappr-zepto":"zepto"}],59:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var BaseObject = require("../base/base_object");
var CoreFactory = require("./core_factory");
var Loader = require("./loader");
var assign = require("lodash.assign");
var uniqueId = require("../base/utils").uniqueId;
var PlayerInfo = require("./player_info");

var Player = (function (_BaseObject) {
  function Player(options) {
    _classCallCheck(this, Player);

    _get(Object.getPrototypeOf(Player.prototype), "constructor", this).call(this, options);
    window.p = this;
    var defaultOptions = { playerId: uniqueId(""), persistConfig: true, width: 640, height: 360, baseUrl: "http://cdn.clappr.io/latest" };
    this.options = assign(defaultOptions, options);
    this.options.sources = this.normalizeSources(options);
    this.loader = new Loader(this.options.plugins || {});
    this.coreFactory = new CoreFactory(this, this.loader);
    PlayerInfo.currentSize = { width: options.width, height: options.height };
    if (this.options.parentId) {
      this.setParentId(this.options.parentId);
    }
  }

  _inherits(Player, _BaseObject);

  _createClass(Player, {
    setParentId: {
      value: function setParentId(parentId) {
        var el = document.querySelector(parentId);
        if (el) {
          this.attachTo(el);
        }
      }
    },
    attachTo: {
      value: function attachTo(element) {
        this.options.parentElement = element;
        this.core = this.coreFactory.create();
      }
    },
    is: {
      value: function is(value, type) {
        return value.constructor === type;
      }
    },
    normalizeSources: {
      value: function normalizeSources(options) {
        var sources = options.sources || (options.source !== undefined ? [options.source.toString()] : []);
        return sources.length === 0 ? ["no.op"] : sources;
      }
    },
    resize: {
      value: function resize(size) {
        this.core.resize(size);
      }
    },
    load: {
      value: function load(sources) {
        this.core.load(sources);
      }
    },
    destroy: {
      value: function destroy() {
        this.core.destroy();
      }
    },
    play: {
      value: function play() {
        this.core.mediaControl.container.play();
      }
    },
    pause: {
      value: function pause() {
        this.core.mediaControl.container.pause();
      }
    },
    stop: {
      value: function stop() {
        this.core.mediaControl.container.stop();
      }
    },
    seek: {
      value: function seek(time) {
        this.core.mediaControl.container.setCurrentTime(time);
      }
    },
    setVolume: {
      value: function setVolume(volume) {
        this.core.mediaControl.container.setVolume(volume);
      }
    },
    mute: {
      value: function mute() {
        this.core.mediaControl.container.setVolume(0);
      }
    },
    unmute: {
      value: function unmute() {
        this.core.mediaControl.container.setVolume(100);
      }
    },
    isPlaying: {
      value: function isPlaying() {
        return this.core.mediaControl.container.isPlaying();
      }
    },
    getContainerPlugin: {
      value: function getContainerPlugin(name) {
        return this.core.mediaControl.container.getPlugin(name);
      }
    },
    getCorePlugin: {
      value: function getCorePlugin(name) {
        return this.core.getPlugin(name);
      }
    }
  });

  return Player;
})(BaseObject);

module.exports = Player;

},{"../base/base_object":"base_object","../base/utils":49,"./core_factory":55,"./loader":56,"./player_info":"player_info","lodash.assign":2}],60:[function(require,module,exports){
"use strict";

module.exports = require("./seek_time");

},{"./seek_time":61}],61:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var UIObject = require("../../base/ui_object");
var Styler = require("../../base/styler");
var JST = require("../../base/jst");
var formatTime = require("../../base/utils").formatTime;
var Events = require("../../base/events");

var SeekTime = (function (_UIObject) {
  function SeekTime(mediaControl) {
    _classCallCheck(this, SeekTime);

    _get(Object.getPrototypeOf(SeekTime.prototype), "constructor", this).call(this);
    this.mediaControl = mediaControl;
    this.addEventListeners();
  }

  _inherits(SeekTime, _UIObject);

  _createClass(SeekTime, {
    name: {
      get: function () {
        return "seek_time";
      }
    },
    template: {
      get: function () {
        return JST.seek_time;
      }
    },
    attributes: {
      get: function () {
        return {
          "class": "seek-time hidden",
          "data-seek-time": ""
        };
      }
    },
    addEventListeners: {
      value: function addEventListeners() {
        this.listenTo(this.mediaControl, Events.MEDIACONTROL_MOUSEMOVE_SEEKBAR, this.showTime);
        this.listenTo(this.mediaControl, Events.MEDIACONTROL_MOUSELEAVE_SEEKBAR, this.hideTime);
      }
    },
    showTime: {
      value: function showTime(event) {
        var offset = event.pageX - this.mediaControl.$seekBarContainer.offset().left;
        var timePosition = Math.min(100, Math.max(offset / this.mediaControl.$seekBarContainer.width() * 100, 0));
        var pointerPosition = event.pageX - this.mediaControl.$el.offset().left;
        pointerPosition = Math.min(Math.max(0, pointerPosition), this.mediaControl.$el.width() - this.$el.width());
        var currentTime = timePosition * this.mediaControl.container.getDuration() / 100;
        var options = {
          timestamp: currentTime,
          formattedTime: formatTime(currentTime),
          pointerPosition: pointerPosition
        };

        this.update(options);
      }
    },
    hideTime: {
      value: function hideTime() {
        this.$el.addClass("hidden");
        this.$el.css("left", "-100%");
      }
    },
    update: {
      value: function update(options) {
        if (this.mediaControl.container.getPlaybackType() === "vod" || this.mediaControl.container.isDvrInUse()) {
          this.$el.find("[data-seek-time]").text(options.formattedTime);
          this.$el.css("left", options.pointerPosition - this.$el.width() / 2);
          this.$el.removeClass("hidden");
        }
      }
    },
    render: {
      value: function render() {
        var style = Styler.getStyleFor(this.name);
        this.$el.html(this.template());
        this.$el.append(style);
        this.mediaControl.$el.append(this.el);
      }
    }
  });

  return SeekTime;
})(UIObject);

module.exports = SeekTime;

},{"../../base/events":"events","../../base/jst":47,"../../base/styler":48,"../../base/ui_object":"ui_object","../../base/utils":49}],62:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Playback = require("../../base/playback");
var Styler = require("../../base/styler");
var JST = require("../../base/jst");
var Mediator = require("../../components/mediator");
var template = require("../../base/template");
var $ = require("clappr-zepto");
var Browser = require("../../components/browser");
var seekStringToSeconds = require("../../base/utils").seekStringToSeconds;
var Events = require("../../base/events");
var Kibo = require("../../base/kibo");

var objectIE = "<object type=\"application/x-shockwave-flash\" id=\"<%= cid %>\" classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" data-flash-vod=\"\"><param name=\"movie\" value=\"<%= baseUrl %>/assets/Player.swf\"> <param name=\"quality\" value=\"autohigh\"> <param name=\"swliveconnect\" value=\"true\"> <param name=\"allowScriptAccess\" value=\"always\"> <param name=\"bgcolor\" value=\"#001122\"> <param name=\"allowFullScreen\" value=\"false\"> <param name=\"wmode\" value=\"gpu\"> <param name=\"tabindex\" value=\"1\"> <param name=FlashVars value=\"playbackId=<%= playbackId %>\" /> </object>";

var Flash = (function (_Playback) {
  function Flash(options) {
    _classCallCheck(this, Flash);

    _get(Object.getPrototypeOf(Flash.prototype), "constructor", this).call(this, options);
    this.src = options.src;
    this.baseUrl = options.baseUrl;
    this.autoPlay = options.autoPlay;
    this.settings = { "default": ["seekbar"] };
    this.settings.left = ["playpause", "position", "duration"];
    this.settings.right = ["fullscreen", "volume"];
    this.settings.seekEnabled = true;
    this.isReady = false;
    this.kibo = new Kibo();
    this.addListeners();
  }

  _inherits(Flash, _Playback);

  _createClass(Flash, {
    name: {
      get: function () {
        return "flash";
      }
    },
    tagName: {
      get: function () {
        return "object";
      }
    },
    template: {
      get: function () {
        return JST.flash;
      }
    },
    bootstrap: {
      value: function bootstrap() {
        this.el.width = "100%";
        this.el.height = "100%";
        this.isReady = true;
        if (this.currentState === "PLAYING") {
          this.firstPlay();
        } else {
          this.currentState = "IDLE";
          this.autoPlay && this.play();
        }
        $("<div style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%\" />").insertAfter(this.$el);
        this.trigger(Events.PLAYBACK_READY, this.name);
      }
    },
    getPlaybackType: {
      value: function getPlaybackType() {
        return "vod";
      }
    },
    setupFirefox: {
      value: function setupFirefox() {
        var $el = this.$("embed");
        $el.attr("data-flash", "");
        this.setElement($el[0]);
      }
    },
    isHighDefinitionInUse: {
      value: function isHighDefinitionInUse() {
        return false;
      }
    },
    updateTime: {
      value: function updateTime() {
        this.trigger(Events.PLAYBACK_TIMEUPDATE, this.el.getPosition(), this.el.getDuration(), this.name);
      }
    },
    addListeners: {
      value: function addListeners() {
        var _this = this;

        Mediator.on(this.uniqueId + ":progress", this.progress, this);
        Mediator.on(this.uniqueId + ":timeupdate", this.updateTime, this);
        Mediator.on(this.uniqueId + ":statechanged", this.checkState, this);
        Mediator.on(this.uniqueId + ":flashready", this.bootstrap, this)[(1, 2, 3, 4, 5, 6, 7, 8, 9)].forEach(function (i) {
          _this.kibo.down(i.toString(), function () {
            return _this.seek(i * 10);
          });
        });
      }
    },
    stopListening: {
      value: function stopListening() {
        _get(Object.getPrototypeOf(Flash.prototype), "stopListening", this).call(this);
        Mediator.off(this.uniqueId + ":progress");
        Mediator.off(this.uniqueId + ":timeupdate");
        Mediator.off(this.uniqueId + ":statechanged");
        Mediator.off(this.uniqueId + ":flashready");
        this.kibo.off([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }
    },
    checkState: {
      value: function checkState() {
        if (this.currentState === "PAUSED") {
          return;
        } else if (this.currentState !== "PLAYING_BUFFERING" && this.el.getState() === "PLAYING_BUFFERING") {
          this.trigger(Events.PLAYBACK_BUFFERING, this.name);
          this.currentState = "PLAYING_BUFFERING";
        } else if (this.el.getState() === "PLAYING") {
          this.trigger(Events.PLAYBACK_BUFFERFULL, this.name);
          this.currentState = "PLAYING";
        } else if (this.el.getState() === "IDLE") {
          this.currentState = "IDLE";
        } else if (this.el.getState() === "ENDED") {
          this.trigger(Events.PLAYBACK_ENDED, this.name);
          this.trigger(Events.PLAYBACK_TIMEUPDATE, 0, this.el.getDuration(), this.name);
          this.currentState = "ENDED";
        }
      }
    },
    progress: {
      value: function progress() {
        if (this.currentState !== "IDLE" && this.currentState !== "ENDED") {
          this.trigger(Events.PLAYBACK_PROGRESS, 0, this.el.getBytesLoaded(), this.el.getBytesTotal(), this.name);
        }
      }
    },
    firstPlay: {
      value: function firstPlay() {
        var _this = this;

        if (this.el.playerPlay) {
          this.el.playerPlay(this.src);
          this.listenToOnce(this, Events.PLAYBACK_BUFFERFULL, function () {
            return _this.checkInitialSeek();
          });
          this.currentState = "PLAYING";
        } else {
          this.listenToOnce(this, Events.PLAYBACK_READY, this.firstPlay);
        }
      }
    },
    checkInitialSeek: {
      value: function checkInitialSeek() {
        var seekTime = seekStringToSeconds(window.location.href);
        if (seekTime !== 0) {
          this.seekSeconds(seekTime);
        }
      }
    },
    play: {
      value: function play() {
        if (this.el.getState() === "PAUSED" || this.el.getState() === "PLAYING_BUFFERING") {
          this.currentState = "PLAYING";
          this.el.playerResume();
        } else if (this.el.getState() !== "PLAYING") {
          this.firstPlay();
        }
        this.trigger(Events.PLAYBACK_PLAY, this.name);
      }
    },
    volume: {
      value: function volume(value) {
        var _this = this;

        if (this.isReady) {
          this.el.playerVolume(value);
        } else {
          this.listenToOnce(this, Events.PLAYBACK_BUFFERFULL, function () {
            return _this.volume(value);
          });
        }
      }
    },
    pause: {
      value: function pause() {
        this.currentState = "PAUSED";
        this.el.playerPause();
      }
    },
    stop: {
      value: function stop() {
        this.el.playerStop();
        this.trigger(Events.PLAYBACK_TIMEUPDATE, 0, this.name);
      }
    },
    isPlaying: {
      value: function isPlaying() {
        return !!(this.isReady && this.currentState.indexOf("PLAYING") > -1);
      }
    },
    getDuration: {
      value: function getDuration() {
        return this.el.getDuration();
      }
    },
    seek: {
      value: function seek(seekBarValue) {
        var seekTo = this.el.getDuration() * (seekBarValue / 100);
        this.seekSeconds(seekTo);
      }
    },
    seekSeconds: {
      value: function seekSeconds(seekTo) {
        this.el.playerSeek(seekTo);
        this.trigger(Events.PLAYBACK_TIMEUPDATE, seekTo, this.el.getDuration(), this.name);
        if (this.currentState === "PAUSED") {
          this.el.playerPause();
        }
      }
    },
    destroy: {
      value: function destroy() {
        clearInterval(this.bootstrapId);
        _get(Object.getPrototypeOf(Flash.prototype), "stopListening", this).call(this);
        this.$el.remove();
      }
    },
    setupIE: {
      value: function setupIE() {
        this.setElement($(template(objectIE)({ cid: this.cid, baseUrl: this.baseUrl, playbackId: this.uniqueId })));
      }
    },
    render: {
      value: function render() {
        var style = Styler.getStyleFor(this.name);
        this.$el.html(this.template({ cid: this.cid, baseUrl: this.baseUrl, playbackId: this.uniqueId }));
        if (Browser.isFirefox) {
          this.setupFirefox();
        } else if (Browser.isLegacyIE) {
          this.setupIE();
        }
        this.$el.append(style);
        return this;
      }
    }
  });

  return Flash;
})(Playback);

Flash.canPlay = function (resource) {
  if (!Browser.hasFlash) {
    return false;
  } else if (!Browser.isMobile && Browser.isFirefox || Browser.isLegacyIE) {
    return resource && resource.constructor === String && !!resource.match(/(.*)\.(mp4|mov|f4v|3gpp|3gp)/);
  } else {
    return resource && resource.constructor === String && !!resource.match(/(.*)\.(mov|f4v|3gpp|3gp)/);
  }
};

module.exports = Flash;

},{"../../base/events":"events","../../base/jst":47,"../../base/kibo":"kibo","../../base/playback":"playback","../../base/styler":48,"../../base/template":"template","../../base/utils":49,"../../components/browser":"browser","../../components/mediator":"mediator","clappr-zepto":"zepto"}],63:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Playback = require("../../base/playback");
var JST = require("../../base/jst");
var assign = require("lodash.assign");
var template = require("../../base/template");

var Mediator = require("../../components/mediator");
var Browser = require("../../components/browser");
var Events = require("../../base/events");
var Styler = require("../../base/styler");
var $ = require("clappr-zepto");

var objectIE = "<object type=\"application/x-shockwave-flash\" id=\"<%= cid %>\" class=\"hls-playback\" classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" data-hls=\"\" width=\"100%\" height=\"100%\"><param name=\"movie\" value=\"<%= baseUrl %>/assets/HLSPlayer.swf\"> <param name=\"quality\" value=\"autohigh\"> <param name=\"swliveconnect\" value=\"true\"> <param name=\"allowScriptAccess\" value=\"always\"> <param name=\"bgcolor\" value=\"#001122\"> <param name=\"allowFullScreen\" value=\"false\"> <param name=\"wmode\" value=\"transparent\"> <param name=\"tabindex\" value=\"1\"> <param name=FlashVars value=\"playbackId=<%= playbackId %>\" /> </object>";

var HLS = (function (_Playback) {
  function HLS(options) {
    _classCallCheck(this, HLS);

    _get(Object.getPrototypeOf(HLS.prototype), "constructor", this).call(this, options);
    this.src = options.src;
    this.baseUrl = options.baseUrl;
    this.flushLiveURLCache = options.flushLiveURLCache === undefined ? true : options.flushLiveURLCache;
    this.capLevelToStage = options.capLevelToStage === undefined ? false : options.capLevelToStage;
    this.highDefinition = false;
    this.autoPlay = options.autoPlay;
    this.defaultSettings = {
      left: ["playstop"],
      "default": ["seekbar"],
      right: ["fullscreen", "volume", "hd-indicator"],
      seekEnabled: false
    };
    this.settings = assign({}, this.defaultSettings);
    this.playbackType = "live";
    this.addListeners();
  }

  _inherits(HLS, _Playback);

  _createClass(HLS, {
    name: {
      get: function () {
        return "hls";
      }
    },
    tagName: {
      get: function () {
        return "object";
      }
    },
    template: {
      get: function () {
        return JST.hls;
      }
    },
    attributes: {
      get: function () {
        return {
          "class": "hls-playback",
          "data-hls": "",
          type: "application/x-shockwave-flash",
          width: "100%",
          height: "100%"
        };
      }
    },
    addListeners: {
      value: function addListeners() {
        var _this = this;

        Mediator.on(this.uniqueId + ":flashready", function () {
          return _this.bootstrap();
        });
        Mediator.on(this.uniqueId + ":timeupdate", function () {
          return _this.updateTime();
        });
        Mediator.on(this.uniqueId + ":playbackstate", function (state) {
          return _this.setPlaybackState(state);
        });
        Mediator.on(this.uniqueId + ":levelchanged", function (isHD) {
          return _this.updateHighDefinition(isHD);
        });
        Mediator.on(this.uniqueId + ":playbackerror", function () {
          return _this.flashPlaybackError();
        });
      }
    },
    stopListening: {
      value: function stopListening() {
        _get(Object.getPrototypeOf(HLS.prototype), "stopListening", this).call(this);
        Mediator.off(this.uniqueId + ":flashready");
        Mediator.off(this.uniqueId + ":timeupdate");
        Mediator.off(this.uniqueId + ":playbackstate");
        Mediator.off(this.uniqueId + ":levelchanged");
        Mediator.off(this.uniqueId + ":playbackerror");
      }
    },
    bootstrap: {
      value: function bootstrap() {
        this.el.width = "100%";
        this.el.height = "100%";
        this.isReady = true;
        this.currentState = "IDLE";
        this.setFlashSettings();
        this.updatePlaybackType();
        this.autoPlay && this.play();
        this.trigger(Events.PLAYBACK_READY, this.name);
      }
    },
    setFlashSettings: {
      value: function setFlashSettings() {
        this.el.globoPlayerSetflushLiveURLCache(this.flushLiveURLCache);
        this.el.globoPlayerCapLeveltoStage(this.capLevelToStage);
        this.el.globoPlayerSetmaxBufferLength(0);
      }
    },
    updateHighDefinition: {
      value: function updateHighDefinition(isHD) {
        this.highDefinition = isHD === "hd";
        this.trigger(Events.PLAYBACK_HIGHDEFINITIONUPDATE);
        this.trigger(Events.PLAYBACK_BITRATE, { bitrate: this.getCurrentBitrate() });
      }
    },
    updateTime: {
      value: function updateTime() {
        var duration = this.getDuration();
        var position = Math.min(Math.max(this.el.globoGetPosition(), 0), duration);
        var previousDVRStatus = this.dvrEnabled;
        var livePlayback = this.playbackType === "live";
        this.dvrEnabled = livePlayback && duration > 240;

        if (duration === 100 || livePlayback === undefined) {
          return;
        }

        if (this.dvrEnabled !== previousDVRStatus) {
          this.updateSettings();
          this.trigger(Events.PLAYBACK_SETTINGSUPDATE, this.name);
        }

        if (livePlayback && (!this.dvrEnabled || !this.dvrInUse)) {
          position = duration;
        }

        this.trigger(Events.PLAYBACK_TIMEUPDATE, position, duration, this.name);
      }
    },
    play: {
      value: function play() {
        if (this.currentState === "PAUSED") {
          this.el.globoPlayerResume();
        } else if (this.currentState !== "PLAYING") {
          this.firstPlay();
        }
        this.trigger(Events.PLAYBACK_PLAY, this.name);
      }
    },
    getPlaybackType: {
      value: function getPlaybackType() {
        return this.playbackType ? this.playbackType : null;
      }
    },
    getCurrentBitrate: {
      value: function getCurrentBitrate() {
        var currentLevel = this.getLevels()[this.el.globoGetLevel()];
        return currentLevel.bitrate;
      }
    },
    isHighDefinitionInUse: {
      value: function isHighDefinitionInUse() {
        return this.highDefinition;
      }
    },
    getLevels: {
      value: function getLevels() {
        if (!this.levels || this.levels.length === 0) {
          this.levels = this.el.globoGetLevels();
        }
        return this.levels;
      }
    },
    setPlaybackState: {
      value: function setPlaybackState(state) {
        var bufferLength = this.el.globoGetbufferLength();
        if (state === "PLAYING_BUFFERING" && bufferLength < 1) {
          this.trigger(Events.PLAYBACK_BUFFERING, this.name);
          this.updateCurrentState(state);
        } else if (state === "PLAYING") {
          if (["PLAYING_BUFFERING", "PAUSED", "IDLE"].indexOf(this.currentState) >= 0) {
            this.trigger(Events.PLAYBACK_BUFFERFULL, this.name);
            this.updateCurrentState(state);
          }
        } else if (state === "PAUSED") {
          this.updateCurrentState(state);
        } else if (state === "IDLE") {
          this.trigger(Events.PLAYBACK_ENDED, this.name);
          this.trigger(Events.PLAYBACK_TIMEUPDATE, 0, this.el.globoGetDuration(), this.name);
          this.updateCurrentState(state);
        }
        this.lastBufferLength = bufferLength;
      }
    },
    updateCurrentState: {
      value: function updateCurrentState(state) {
        this.currentState = state;
        this.updatePlaybackType();
      }
    },
    updatePlaybackType: {
      value: function updatePlaybackType() {
        this.playbackType = this.el.globoGetType();
        if (this.playbackType) {
          this.playbackType = this.playbackType.toLowerCase();
          if (this.playbackType === "vod") {
            this.startReportingProgress();
          } else {
            this.stopReportingProgress();
          }
        }
        this.trigger(Events.PLAYBACK_PLAYBACKSTATE);
      }
    },
    startReportingProgress: {
      value: function startReportingProgress() {
        var _this = this;

        if (!this.reportingProgress) {
          this.reportingProgress = true;
          Mediator.on(this.uniqueId + ":fragmentloaded", function () {
            return _this.onFragmentLoaded();
          });
        }
      }
    },
    stopReportingProgress: {
      value: function stopReportingProgress() {
        Mediator.off(this.uniqueId + ":fragmentloaded", this.onFragmentLoaded, this);
      }
    },
    onFragmentLoaded: {
      value: function onFragmentLoaded() {
        var buffered = this.el.globoGetPosition() + this.el.globoGetbufferLength();
        this.trigger(Events.PLAYBACK_PROGRESS, this.el.globoGetPosition(), buffered, this.getDuration(), this.name);
      }
    },
    firstPlay: {
      value: function firstPlay() {
        this.setFlashSettings(); //ensure flushLiveURLCache will work (#327)
        this.el.globoPlayerLoad(this.src);
        this.el.globoPlayerPlay();
      }
    },
    volume: {
      value: function volume(value) {
        var _this = this;

        if (this.isReady) {
          this.el.globoPlayerVolume(value);
        } else {
          this.listenToOnce(this, Events.PLAYBACK_BUFFERFULL, function () {
            return _this.volume(value);
          });
        }
      }
    },
    pause: {
      value: function pause() {
        if (this.playbackType !== "live" || this.dvrEnabled) {
          this.el.globoPlayerPause();
          if (this.playbackType === "live" && this.dvrEnabled) {
            this.updateDvr(true);
          }
        }
      }
    },
    stop: {
      value: function stop() {
        this.el.globoPlayerStop();
        this.trigger(Events.PLAYBACK_TIMEUPDATE, 0, this.name);
      }
    },
    isPlaying: {
      value: function isPlaying() {
        if (this.currentState) {
          return !!this.currentState.match(/playing/i);
        }
        return false;
      }
    },
    getDuration: {
      value: function getDuration() {
        var duration = this.el.globoGetDuration();
        if (this.playbackType === "live") {
          // estimate 10 seconds of buffer time for live streams for seek positions
          duration = duration - 10;
        }
        return duration;
      }
    },
    seek: {
      value: function seek(time) {
        var duration = this.getDuration();
        if (time > 0) {
          time = duration * time / 100;
        }

        if (this.playbackType === "live") {
          // seek operations to a time within 5 seconds from live stream will position playhead back to live
          var dvrInUse = time >= 0 && duration - time > 5;
          if (!dvrInUse) {
            time = -1;
          }
          this.updateDvr(dvrInUse);
        }
        this.el.globoPlayerSeek(time);
        this.trigger(Events.PLAYBACK_TIMEUPDATE, time, duration, this.name);
        this.trigger(Events.PLAYBACK_HIGHDEFINITIONUPDATE);
      }
    },
    updateDvr: {
      value: function updateDvr(dvrInUse) {
        var previousDvrInUse = !!this.dvrInUse;
        this.dvrInUse = dvrInUse;
        if (this.dvrInUse !== previousDvrInUse) {
          this.updateSettings();
          this.trigger(Events.PLAYBACK_DVR, this.dvrInUse);
          this.trigger(Events.PLAYBACK_STATS_ADD, { dvr: this.dvrInUse });
        }
      }
    },
    flashPlaybackError: {
      value: function flashPlaybackError() {
        this.trigger(Events.PLAYBACK_STOP);
      }
    },
    timeUpdate: {
      value: function timeUpdate(time, duration) {
        this.trigger(Events.PLAYBACK_TIMEUPDATE, time, duration, this.name);
      }
    },
    destroy: {
      value: function destroy() {
        this.stopListening();
        this.$el.remove();
      }
    },
    setupFirefox: {
      value: function setupFirefox() {
        var $el = this.$("embed");
        $el.attr("data-hls", "");
        this.setElement($el);
      }
    },
    setupIE: {
      value: function setupIE() {
        this.setElement($(template(objectIE)({ cid: this.cid, baseUrl: this.baseUrl, playbackId: this.uniqueId })));
      }
    },
    updateSettings: {
      value: function updateSettings() {
        this.settings = assign({}, this.defaultSettings);
        if (this.playbackType === "vod" || this.dvrInUse) {
          this.settings.left = ["playpause", "position", "duration"];
          this.settings.seekEnabled = true;
        } else if (this.dvrEnabled) {
          this.settings.left = ["playpause"];
          this.settings.seekEnabled = true;
        } else {
          this.settings.seekEnabled = false;
        }
      }
    },
    setElement: {
      value: function setElement(element) {
        this.$el = element;
        this.el = element[0];
      }
    },
    render: {
      value: function render() {
        var style = Styler.getStyleFor(this.name);
        if (Browser.isLegacyIE) {
          this.setupIE();
        } else {
          this.$el.html(this.template({ cid: this.cid, baseUrl: this.baseUrl, playbackId: this.uniqueId }));
          if (Browser.isFirefox) {
            this.setupFirefox();
          } else if (Browser.isIE) {
            this.$("embed").remove();
          }
        }
        this.el.id = this.cid;
        this.$el.append(style);
        return this;
      }
    }
  });

  return HLS;
})(Playback);

HLS.canPlay = function (resource) {
  return !!(resource.match(/^http(.*).m3u8?/) && Browser.hasFlash);
};

module.exports = HLS;

},{"../../base/events":"events","../../base/jst":47,"../../base/playback":"playback","../../base/styler":48,"../../base/template":"template","../../components/browser":"browser","../../components/mediator":"mediator","clappr-zepto":"zepto","lodash.assign":2}],64:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Playback = require("../../base/playback");
var Events = require("../../base/events");
var find = require("lodash.find");

var HTML5Audio = (function (_Playback) {
  function HTML5Audio(params) {
    _classCallCheck(this, HTML5Audio);

    _get(Object.getPrototypeOf(HTML5Audio.prototype), "constructor", this).call(this, params);
    this.el.src = params.src;
    this.settings = {
      left: ["playpause", "position", "duration"],
      right: ["fullscreen", "volume"],
      "default": ["seekbar"]
    };
    this.render();
    params.autoPlay && this.play();
  }

  _inherits(HTML5Audio, _Playback);

  _createClass(HTML5Audio, {
    name: {
      get: function () {
        return "html5_audio";
      }
    },
    tagName: {
      get: function () {
        return "audio";
      }
    },
    events: {
      get: function () {
        return {
          timeupdate: "timeUpdated",
          ended: "ended",
          canplaythrough: "bufferFull"
        };
      }
    },
    bindEvents: {
      value: function bindEvents() {
        this.listenTo(this.container, Events.CONTAINER_PLAY, this.play);
        this.listenTo(this.container, Events.CONTAINER_PAUSE, this.pause);
        this.listenTo(this.container, Events.CONTAINER_SEEK, this.seek);
        this.listenTo(this.container, Events.CONTAINER_VOLUME, this.volume);
        this.listenTo(this.container, Events.CONTAINER_STOP, this.stop);
      }
    },
    getPlaybackType: {
      value: function getPlaybackType() {
        return "aod";
      }
    },
    play: {
      value: function play() {
        this.el.play();
        this.trigger(Events.PLAYBACK_PLAY);
      }
    },
    pause: {
      value: function pause() {
        this.el.pause();
      }
    },
    stop: {
      value: function stop() {
        this.pause();
        this.el.currentTime = 0;
      }
    },
    volume: {
      value: function volume(value) {
        this.el.volume = value / 100;
      }
    },
    mute: {
      value: function mute() {
        this.el.volume = 0;
      }
    },
    unmute: {
      value: function unmute() {
        this.el.volume = 1;
      }
    },
    isMuted: {
      value: function isMuted() {
        return !!this.el.volume;
      }
    },
    ended: {
      value: function ended() {
        this.trigger(Events.CONTAINER_TIMEUPDATE, 0);
      }
    },
    seek: {
      value: function seek(seekBarValue) {
        var time = this.el.duration * (seekBarValue / 100);
        this.el.currentTime = time;
      }
    },
    getCurrentTime: {
      value: function getCurrentTime() {
        return this.el.currentTime;
      }
    },
    getDuration: {
      value: function getDuration() {
        return this.el.duration;
      }
    },
    isPlaying: {
      value: function isPlaying() {
        return !this.el.paused && !this.el.ended;
      }
    },
    timeUpdated: {
      value: function timeUpdated() {
        this.trigger(Events.PLAYBACK_TIMEUPDATE, this.el.currentTime, this.el.duration, this.name);
      }
    },
    bufferFull: {
      value: function bufferFull() {
        this.trigger(Events.PLAYBACK_TIMEUPDATE, this.el.currentTime, this.el.duration, this.name);
        this.trigger(Events.PLAYBACK_BUFFERFULL);
      }
    },
    render: {
      value: function render() {
        this.trigger(Events.PLAYBACK_READY, this.name);
        return this;
      }
    }
  });

  return HTML5Audio;
})(Playback);

HTML5Audio.canPlay = function (resource) {
  var mimetypes = {
    wav: ["audio/wav"],
    mp3: ["audio/mp3", "audio/mpeg;codecs=\"mp3\""],
    aac: ["audio/mp4;codecs=\"mp4a.40.5\""],
    oga: ["audio/ogg"]
  };
  var resourceParts = resource.split("?")[0].match(/.*\.(.*)$/) || [];
  if (resourceParts.length > 1 && mimetypes[resourceParts[1]] !== undefined) {
    var a = document.createElement("audio");
    return !!find(mimetypes[resourceParts[1]], function (ext) {
      return !!a.canPlayType(ext).replace(/no/, "");
    });
  }
  return false;
};

module.exports = HTML5Audio;

},{"../../base/events":"events","../../base/playback":"playback","lodash.find":12}],65:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Playback = require("../../base/playback");
var JST = require("../../base/jst");
var Kibo = require("../../base/kibo");
var Styler = require("../../base/styler");
var Browser = require("../../components/browser");
var seekStringToSeconds = require("../../base/utils").seekStringToSeconds;
var Events = require("../../base/events");
var find = require("lodash.find");

var HTML5Video = (function (_Playback) {
  function HTML5Video(options) {
    _classCallCheck(this, HTML5Video);

    _get(Object.getPrototypeOf(HTML5Video.prototype), "constructor", this).call(this, options);
    this.kibo = new Kibo();
    this.options = options;
    this.src = options.src;
    this.el.src = options.src;
    this.el.loop = options.loop;
    this.firstBuffer = true;
    this.isHLS = this.src.indexOf("m3u8") > -1;
    this.settings = { "default": ["seekbar"] };
    if (Browser.isSafari) {
      this.setupSafari();
    } else {
      this.el.preload = options.preload ? options.preload : "metadata";
      this.settings.seekEnabled = true;
    }
    this.settings.left = this.isHLS ? ["playstop"] : ["playpause", "position", "duration"];
    this.settings.right = ["fullscreen", "volume"];
    this.bindEvents();
  }

  _inherits(HTML5Video, _Playback);

  _createClass(HTML5Video, {
    name: {
      get: function () {
        return "html5_video";
      }
    },
    tagName: {
      get: function () {
        return "video";
      }
    },
    template: {
      get: function () {
        return JST.html5_video;
      }
    },
    attributes: {
      get: function () {
        return {
          "data-html5-video": ""
        };
      }
    },
    events: {
      get: function () {
        return {
          timeupdate: "timeUpdated",
          progress: "progress",
          ended: "ended",
          stalled: "stalled",
          waiting: "waiting",
          canplaythrough: "bufferFull",
          loadedmetadata: "loadedMetadata",
          canplay: "ready",
          durationchange: "durationChange"
        };
      }
    },
    setupSafari: {
      value: function setupSafari() {
        this.el.preload = "auto";
      }
    },
    bindEvents: {
      value: function bindEvents() {
        var _this = this;

        [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(function (i) {
          _this.kibo.down(i.toString(), function () {
            return _this.seek(i * 10);
          });
        });
      }
    },
    stopListening: {
      value: function stopListening() {
        this.kibo.off([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }
    },
    loadedMetadata: {
      value: function loadedMetadata(e) {
        this.durationChange();
        this.trigger(Events.PLAYBACK_LOADEDMETADATA, e.target.duration);
        this.checkInitialSeek();
      }
    },
    durationChange: {
      value: function durationChange() {
        // we can't figure out if hls resource is VoD or not until it is being loaded or duration has changed.
        // that's why we check it again and update media control accordingly.
        if (this.getPlaybackType() === "vod") {
          this.settings.left = ["playpause", "position", "duration"];
          this.settings.seekEnabled = true;
        }
        this.trigger(Events.PLAYBACK_SETTINGSUPDATE);
      }
    },
    getPlaybackType: {
      value: function getPlaybackType() {
        return this.isHLS && [0, undefined, Infinity].indexOf(this.el.duration) >= 0 ? "live" : "vod";
      }
    },
    isHighDefinitionInUse: {
      value: function isHighDefinitionInUse() {
        return false;
      }
    },
    play: {
      value: function play() {
        this.el.play();
        this.trigger(Events.PLAYBACK_PLAY);
      }
    },
    pause: {
      value: function pause() {
        this.el.pause();
      }
    },
    stop: {
      value: function stop() {
        this.pause();
        if (this.el.readyState !== 0) {
          this.el.currentTime = 0;
        }
      }
    },
    volume: {
      value: function volume(value) {
        this.el.volume = value / 100;
      }
    },
    mute: {
      value: function mute() {
        this.el.volume = 0;
      }
    },
    unmute: {
      value: function unmute() {
        this.el.volume = 1;
      }
    },
    isMuted: {
      value: function isMuted() {
        return !!this.el.volume;
      }
    },
    isPlaying: {
      value: function isPlaying() {
        return !this.el.paused && !this.el.ended;
      }
    },
    ended: {
      value: function ended() {
        this.trigger(Events.PLAYBACK_ENDED, this.name);
        this.trigger(Events.PLAYBACK_TIMEUPDATE, 0, this.el.duration, this.name);
      }
    },
    stalled: {
      value: function stalled() {
        if (this.getPlaybackType() === "vod" && this.el.readyState < this.el.HAVE_FUTURE_DATA) {
          this.trigger(Events.PLAYBACK_BUFFERING, this.name);
        }
      }
    },
    waiting: {
      value: function waiting() {
        if (this.el.readyState < this.el.HAVE_FUTURE_DATA) {
          this.trigger(Events.PLAYBACK_BUFFERING, this.name);
        }
      }
    },
    bufferFull: {
      value: function bufferFull() {
        if (this.options.poster && this.firstBuffer) {
          this.firstBuffer = false;
          if (!this.isPlaying()) {
            this.el.poster = this.options.poster;
          }
        } else {
          this.el.poster = "";
        }
        this.trigger(Events.PLAYBACK_BUFFERFULL, this.name);
      }
    },
    destroy: {
      value: function destroy() {
        this.stopListening();
        this.stop();
        this.el.src = "";
        this.$el.remove();
      }
    },
    seek: {
      value: function seek(seekBarValue) {
        var time = this.el.duration * (seekBarValue / 100);
        this.seekSeconds(time);
      }
    },
    seekSeconds: {
      value: function seekSeconds(time) {
        this.el.currentTime = time;
      }
    },
    checkInitialSeek: {
      value: function checkInitialSeek() {
        var seekTime = seekStringToSeconds(window.location.href);
        this.seekSeconds(seekTime);
      }
    },
    getCurrentTime: {
      value: function getCurrentTime() {
        return this.el.currentTime;
      }
    },
    getDuration: {
      value: function getDuration() {
        return this.el.duration;
      }
    },
    timeUpdated: {
      value: function timeUpdated() {
        if (this.getPlaybackType() === "live") {
          this.trigger(Events.PLAYBACK_TIMEUPDATE, 1, 1, this.name);
        } else {
          this.trigger(Events.PLAYBACK_TIMEUPDATE, this.el.currentTime, this.el.duration, this.name);
        }
      }
    },
    progress: {
      value: function progress() {
        if (!this.el.buffered.length) {
          return;
        }var bufferedPos = 0;
        for (var i = 0; i < this.el.buffered.length; i++) {
          if (this.el.currentTime >= this.el.buffered.start(i) && this.el.currentTime <= this.el.buffered.end(i)) {
            bufferedPos = i;
            break;
          }
        }
        this.trigger(Events.PLAYBACK_PROGRESS, this.el.buffered.start(bufferedPos), this.el.buffered.end(bufferedPos), this.el.duration, this.name);
      }
    },
    typeFor: {
      value: function typeFor(src) {
        return src.indexOf(".m3u8") > 0 ? "application/vnd.apple.mpegurl" : "video/mp4";
      }
    },
    ready: {
      value: function ready() {
        this.trigger(Events.PLAYBACK_READY, this.name);
      }
    },
    render: {
      value: function render() {
        var _this = this;

        var style = Styler.getStyleFor(this.name);
        this.$el.html(this.template({ src: this.src, type: this.typeFor(this.src) }));
        this.$el.append(style);
        setTimeout(function () {
          return _this.options.autoPlay && _this.play();
        }, 0);
        if (this.el.readyState === this.el.HAVE_ENOUGH_DATA) {
          this.ready();
        }
        return this;
      }
    }
  });

  return HTML5Video;
})(Playback);

HTML5Video.canPlay = function (resource) {
  var mimetypes = {
    mp4: ["avc1.42E01E", "avc1.58A01E", "avc1.4D401E", "avc1.64001E", "mp4v.20.8", "mp4v.20.240", "mp4a.40.2"].map(function (codec) {
      return "video/mp4; codecs=\"" + codec + ", mp4a.40.2\"";
    }),
    ogg: ["video/ogg; codecs=\"theora, vorbis\"", "video/ogg; codecs=\"dirac\"", "video/ogg; codecs=\"theora, speex\""],
    "3gpp": ["video/3gpp; codecs=\"mp4v.20.8, samr\""],
    webm: ["video/webm; codecs=\"vp8, vorbis\""],
    mkv: ["video/x-matroska; codecs=\"theora, vorbis\""],
    m3u8: ["application/x-mpegURL"]
  };
  mimetypes.ogv = mimetypes.ogg;
  mimetypes["3gp"] = mimetypes["3gpp"];

  var resourceParts = resource.split("?")[0].match(/.*\.(.*)$/) || [];
  if (resourceParts.length > 1 && mimetypes[resourceParts[1]] !== undefined) {
    var v = document.createElement("video");
    return !!find(mimetypes[resourceParts[1]], function (ext) {
      return !!v.canPlayType(ext).replace(/no/, "");
    });
  }
  return false;
};

module.exports = HTML5Video;

},{"../../base/events":"events","../../base/jst":47,"../../base/kibo":"kibo","../../base/playback":"playback","../../base/styler":48,"../../base/utils":49,"../../components/browser":"browser","lodash.find":12}],66:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Playback = require("../../base/playback");
var Styler = require("../../base/styler");

var HTMLImg = (function (_Playback) {
  function HTMLImg(params) {
    _classCallCheck(this, HTMLImg);

    _get(Object.getPrototypeOf(HTMLImg.prototype), "constructor", this).call(this, params);
    this.el.src = params.src;
  }

  _inherits(HTMLImg, _Playback);

  _createClass(HTMLImg, {
    name: {
      get: function () {
        return "html_img";
      }
    },
    tagName: {
      get: function () {
        return "img";
      }
    },
    attributes: {
      get: function () {
        return {
          "data-html-img": ""
        };
      }
    },
    getPlaybackType: {
      value: function getPlaybackType() {
        return null;
      }
    },
    render: {
      value: function render() {
        var style = Styler.getStyleFor(this.name);
        this.$el.append(style);
        return this;
      }
    }
  });

  return HTMLImg;
})(Playback);

HTMLImg.canPlay = function (resource) {
  return !!resource.match(/(.*).(png|jpg|jpeg|gif|bmp)/);
};

module.exports = HTMLImg;

},{"../../base/playback":"playback","../../base/styler":48}],67:[function(require,module,exports){
"use strict";

module.exports = require("./no_op");

},{"./no_op":68}],68:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Playback = require("../../base/playback");
var JST = require("../../base/jst");
var Styler = require("../../base/styler");
var Events = require("../../base/events");

var NoOp = (function (_Playback) {
  function NoOp(options) {
    _classCallCheck(this, NoOp);

    _get(Object.getPrototypeOf(NoOp.prototype), "constructor", this).call(this, options);
  }

  _inherits(NoOp, _Playback);

  _createClass(NoOp, {
    name: {
      get: function () {
        return "no_op";
      }
    },
    template: {
      get: function () {
        return JST.no_op;
      }
    },
    attributes: {
      get: function () {
        return { "data-no-op": "" };
      }
    },
    render: {
      value: function render() {
        var style = Styler.getStyleFor(this.name);
        this.$el.html(this.template());
        this.$el.append(style);
        this.animate();
        this.trigger(Events.PLAYBACK_READY, this.name);
        return this;
      }
    },
    noise: {
      value: function noise() {
        var idata = this.context.createImageData(this.context.canvas.width, this.context.canvas.height);
        var buffer32 = new Uint32Array(idata.data.buffer);
        var len = buffer32.length;
        var run = 0;
        var color = 0;
        var m = Math.random() * 6 + 4;

        for (var i = 0; i < len;) {
          if (run < 0) {
            run = m * Math.random();
            var p = Math.pow(Math.random(), 0.4);
            color = 255 * p << 24;
          }
          run -= 1;
          buffer32[i++] = color;
        }
        this.context.putImageData(idata, 0, 0);
      }
    },
    loop: {
      value: function loop() {
        var _this = this;

        this.noise();
        requestAnimationFrame(function () {
          return _this.loop();
        });
      }
    },
    animate: {
      value: function animate() {
        this.canvas = this.$el.find("canvas[data-no-op-canvas]")[0];
        this.context = this.canvas.getContext("2d");
        this.loop();
      }
    }
  });

  return NoOp;
})(Playback);

NoOp.canPlay = function (source) {
  return true;
};

module.exports = NoOp;

},{"../../base/events":"events","../../base/jst":47,"../../base/playback":"playback","../../base/styler":48}],69:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

//Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var ContainerPlugin = require("../../base/container_plugin");
var Events = require("../../base/events");

var ClickToPausePlugin = (function (_ContainerPlugin) {
  function ClickToPausePlugin(options) {
    _classCallCheck(this, ClickToPausePlugin);

    if (!options.chromeless) {
      _get(Object.getPrototypeOf(ClickToPausePlugin.prototype), "constructor", this).call(this, options);
    }
  }

  _inherits(ClickToPausePlugin, _ContainerPlugin);

  _createClass(ClickToPausePlugin, {
    name: {
      get: function () {
        return "click_to_pause";
      }
    },
    bindEvents: {
      value: function bindEvents() {
        this.listenTo(this.container, Events.CONTAINER_CLICK, this.click);
        this.listenTo(this.container, Events.CONTAINER_SETTINGSUPDATE, this.settingsUpdate);
      }
    },
    click: {
      value: function click() {
        if (this.container.getPlaybackType() !== "live" || this.container.isDvrEnabled()) {
          if (this.container.isPlaying()) {
            this.container.pause();
          } else {
            this.container.play();
          }
        }
      }
    },
    settingsUpdate: {
      value: function settingsUpdate() {
        this.container.$el.removeClass("pointer-enabled");
        if (this.container.getPlaybackType() !== "live" || this.container.isDvrEnabled()) {
          this.container.$el.addClass("pointer-enabled");
        }
      }
    }
  });

  return ClickToPausePlugin;
})(ContainerPlugin);

module.exports = ClickToPausePlugin;

},{"../../base/container_plugin":"container_plugin","../../base/events":"events"}],70:[function(require,module,exports){
"use strict";

module.exports = require("./click_to_pause");

},{"./click_to_pause":69}],71:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var UICorePlugin = require("../../base/ui_core_plugin");
var JST = require("../../base/jst");
var Styler = require("../../base/styler");
var Events = require("../../base/events");
var $ = require("clappr-zepto");

var DVRControls = (function (_UICorePlugin) {
  function DVRControls(core) {
    _classCallCheck(this, DVRControls);

    _get(Object.getPrototypeOf(DVRControls.prototype), "constructor", this).call(this, core);
    this.core = core;
    this.settingsUpdate();
  }

  _inherits(DVRControls, _UICorePlugin);

  _createClass(DVRControls, {
    template: {
      get: function () {
        return JST.dvr_controls;
      }
    },
    name: {
      get: function () {
        return "dvr_controls";
      }
    },
    events: {
      get: function () {
        return {
          "click .live-button": "click"
        };
      }
    },
    attributes: {
      get: function () {
        return {
          "class": "dvr-controls",
          "data-dvr-controls": "" };
      }
    },
    bindEvents: {
      value: function bindEvents() {
        this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_CONTAINERCHANGED, this.settingsUpdate);
        this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_RENDERED, this.settingsUpdate);
        this.listenTo(this.core.mediaControl.container, Events.CONTAINER_PLAYBACKDVRSTATECHANGED, this.dvrChanged);
      }
    },
    dvrChanged: {
      value: function dvrChanged(dvrEnabled) {
        this.settingsUpdate();
        this.core.mediaControl.$el.addClass("live");
        if (dvrEnabled) {
          this.core.mediaControl.$el.addClass("dvr");
          this.core.mediaControl.$el.find(".media-control-indicator[data-position], .media-control-indicator[data-duration]").hide();
        } else {
          this.core.mediaControl.$el.removeClass("dvr");
        }
      }
    },
    click: {
      value: function click() {
        if (!this.core.mediaControl.container.isPlaying()) {
          this.core.mediaControl.container.play();
        }
        if (this.core.mediaControl.$el.hasClass("dvr")) {
          this.core.mediaControl.container.setCurrentTime(-1);
        }
      }
    },
    settingsUpdate: {
      value: function settingsUpdate() {
        var _this = this;

        this.stopListening();
        if (this.shouldRender()) {
          this.render();
          this.$el.click(function () {
            return _this.click();
          });
        }
        this.bindEvents();
      }
    },
    shouldRender: {
      value: function shouldRender() {
        var useDvrControls = this.core.options.useDvrControls === undefined || !!this.core.options.useDvrControls;
        return useDvrControls && this.core.mediaControl.container.getPlaybackType() === "live";
      }
    },
    render: {
      value: function render() {
        var style = Styler.getStyleFor(this.name);
        this.$el.html(this.template());
        this.$el.append(style);
        if (this.shouldRender()) {
          this.core.mediaControl.$el.addClass("live");
          this.core.mediaControl.$(".media-control-left-panel[data-media-control]").append(this.$el);
          if (this.$duration) {
            this.$duration.remove();
          }
          this.$duration = $("<span data-duration></span>");
          this.core.mediaControl.seekTime.$el.append(this.$duration);
        }
        return this;
      }
    }
  });

  return DVRControls;
})(UICorePlugin);

module.exports = DVRControls;

},{"../../base/events":"events","../../base/jst":47,"../../base/styler":48,"../../base/ui_core_plugin":"ui_core_plugin","clappr-zepto":"zepto"}],72:[function(require,module,exports){
"use strict";

module.exports = require("./dvr_controls");

},{"./dvr_controls":71}],73:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var ContainerPlugin = require("../../base/container_plugin");
var Events = require("../../base/events");

var GoogleAnalytics = (function (_ContainerPlugin) {
  function GoogleAnalytics(options) {
    _classCallCheck(this, GoogleAnalytics);

    _get(Object.getPrototypeOf(GoogleAnalytics.prototype), "constructor", this).call(this, options);
    if (options.gaAccount) {
      this.account = options.gaAccount;
      this.trackerName = options.gaTrackerName ? options.gaTrackerName + "." : "Clappr.";
      this.domainName = options.gaDomainName;
      this.currentHDState = undefined;
      this.embedScript();
    }
  }

  _inherits(GoogleAnalytics, _ContainerPlugin);

  _createClass(GoogleAnalytics, {
    name: {
      get: function () {
        return "google_analytics";
      }
    },
    embedScript: {
      value: function embedScript() {
        var _this = this;

        if (!window._gat) {
          var script = document.createElement("script");
          script.setAttribute("type", "text/javascript");
          script.setAttribute("async", "async");
          script.setAttribute("src", "http://www.google-analytics.com/ga.js");
          script.onload = function () {
            return _this.addEventListeners();
          };
          document.body.appendChild(script);
        } else {
          this.addEventListeners();
        }
      }
    },
    addEventListeners: {
      value: function addEventListeners() {
        var _this = this;

        if (this.container) {
          this.listenTo(this.container, Events.CONTAINER_PLAY, this.onPlay);
          this.listenTo(this.container, Events.CONTAINER_STOP, this.onStop);
          this.listenTo(this.container, Events.CONTAINER_PAUSE, this.onPause);
          this.listenTo(this.container, Events.CONTAINER_ENDED, this.onEnded);
          this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering);
          this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERFULL, this.onBufferFull);
          this.listenTo(this.container, Events.CONTAINER_ENDED, this.onEnded);
          this.listenTo(this.container, Events.CONTAINER_ERROR, this.onError);
          this.listenTo(this.container, Events.CONTAINER_PLAYBACKSTATE, this.onPlaybackChanged);
          this.listenTo(this.container, Events.CONTAINER_VOLUME, function (event) {
            return _this.onVolumeChanged(event);
          });
          this.listenTo(this.container, Events.CONTAINER_SEEK, function (event) {
            return _this.onSeek(event);
          });
          this.listenTo(this.container, Events.CONTAINER_FULL_SCREEN, this.onFullscreen);
          this.listenTo(this.container, Events.CONTAINER_HIGHDEFINITIONUPDATE, this.onHD);
          this.listenTo(this.container, Events.CONTAINER_PLAYBACKDVRSTATECHANGED, this.onDVR);
        }
        _gaq.push([this.trackerName + "_setAccount", this.account]);
        if (!!this.domainName) _gaq.push([this.trackerName + "_setDomainName", this.domainName]);
      }
    },
    onPlay: {
      value: function onPlay() {
        this.push(["Video", "Play", this.container.playback.src]);
      }
    },
    onStop: {
      value: function onStop() {
        this.push(["Video", "Stop", this.container.playback.src]);
      }
    },
    onEnded: {
      value: function onEnded() {
        this.push(["Video", "Ended", this.container.playback.src]);
      }
    },
    onBuffering: {
      value: function onBuffering() {
        this.push(["Video", "Buffering", this.container.playback.src]);
      }
    },
    onBufferFull: {
      value: function onBufferFull() {
        this.push(["Video", "Bufferfull", this.container.playback.src]);
      }
    },
    onError: {
      value: function onError() {
        this.push(["Video", "Error", this.container.playback.src]);
      }
    },
    onHD: {
      value: function onHD() {
        var status = this.container.isHighDefinitionInUse() ? "ON" : "OFF";
        if (status !== this.currentHDState) {
          this.currentHDState = status;
          this.push(["Video", "HD - " + status, this.container.playback.src]);
        }
      }
    },
    onPlaybackChanged: {
      value: function onPlaybackChanged() {
        var type = this.container.getPlaybackType();
        if (type !== null) {
          this.push(["Video", "Playback Type - " + type, this.container.playback.src]);
        }
      }
    },
    onDVR: {
      value: function onDVR(dvrInUse) {
        var status = dvrInUse ? "ON" : "OFF";
        this.push(["Interaction", "DVR - " + status, this.container.playback.src]);
      }
    },
    onPause: {
      value: function onPause() {
        this.push(["Video", "Pause", this.container.playback.src]);
      }
    },
    onSeek: {
      value: function onSeek() {
        this.push(["Video", "Seek", this.container.playback.src]);
      }
    },
    onVolumeChanged: {
      value: function onVolumeChanged() {
        this.push(["Interaction", "Volume", this.container.playback.src]);
      }
    },
    onFullscreen: {
      value: function onFullscreen() {
        this.push(["Interaction", "Fullscreen", this.container.playback.src]);
      }
    },
    push: {
      value: function push(array) {
        var res = [this.trackerName + "_trackEvent"].concat(array);
        _gaq.push(res);
      }
    }
  });

  return GoogleAnalytics;
})(ContainerPlugin);

module.exports = GoogleAnalytics;

},{"../../base/container_plugin":"container_plugin","../../base/events":"events"}],74:[function(require,module,exports){
"use strict";

module.exports = require("./google_analytics");

},{"./google_analytics":73}],75:[function(require,module,exports){
"use strict";

module.exports = require("./log");

},{"./log":76}],76:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Kibo = require("../../base/kibo");

var Log = (function () {
  function Log() {
    var _this = this;

    _classCallCheck(this, Log);

    this.kibo = new Kibo();
    this.kibo.down(["ctrl shift d"], function () {
      return _this.onOff();
    });
    this.BLACKLIST = ["playback:timeupdate", "playback:progress", "container:hover", "container:timeupdate", "container:progress"];
  }

  _createClass(Log, {
    info: {
      value: function info(klass, message) {
        this.log(klass, "info", message);
      }
    },
    warn: {
      value: function warn(klass, message) {
        this.log(klass, "warn", message);
      }
    },
    debug: {
      value: function debug(klass, message) {
        this.log(klass, "debug", message);
      }
    },
    onOff: {
      value: function onOff() {
        window.DEBUG = !window.DEBUG;
        if (window.DEBUG) {
          console.log("log enabled");
        } else {
          console.log("log disabled");
        }
      }
    },
    log: {
      value: function log(klass, level, message) {
        if (!window.DEBUG || this.BLACKLIST.indexOf(message) >= 0) {
          return;
        }var color;
        if (level === "warn") {
          color = "#FF8000";
        } else if (level === "info") {
          color = "#006600";
        } else if (level === "error") {
          color = "#FF0000";
        }
        console.log("%c [" + klass + "] [" + level + "] " + message, "color: " + color);
      }
    }
  });

  return Log;
})();

Log.getInstance = function () {
  if (this._instance === undefined) {
    this._instance = new this();
  }
  return this._instance;
};

module.exports = Log;

},{"../../base/kibo":"kibo"}],77:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

//Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var UIContainerPlugin = require("../../base/ui_container_plugin");
var Styler = require("../../base/styler");
var JST = require("../../base/jst");
var Events = require("../../base/events");

var Mediator = require("../../components/mediator");
var PlayerInfo = require("../../components/player_info");

var $ = require("clappr-zepto");

var PosterPlugin = (function (_UIContainerPlugin) {
  function PosterPlugin(options) {
    _classCallCheck(this, PosterPlugin);

    _get(Object.getPrototypeOf(PosterPlugin.prototype), "constructor", this).call(this, options);
    this.options = options;
    this.container.disableMediaControl();
    this.render();
    this.bufferFull = false;
  }

  _inherits(PosterPlugin, _UIContainerPlugin);

  _createClass(PosterPlugin, {
    name: {
      get: function () {
        return "poster";
      }
    },
    template: {
      get: function () {
        return JST.poster;
      }
    },
    attributes: {
      get: function () {
        return {
          "class": "player-poster",
          "data-poster": ""
        };
      }
    },
    events: {
      get: function () {
        return {
          click: "clicked"
        };
      }
    },
    load: {
      value: function load(source) {
        this.options.poster = source;
        this.render();
      }
    },
    bindEvents: {
      value: function bindEvents() {
        this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering);
        this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERFULL, this.onBufferfull);
        this.listenTo(this.container, Events.CONTAINER_STOP, this.onStop);
        this.listenTo(this.container, Events.CONTAINER_PLAY, this.onPlay);
        this.listenTo(this.container, Events.CONTAINER_ENDED, this.onStop);
        Mediator.on(Events.PLAYER_RESIZE, this.updateSize, this);
      }
    },
    stopListening: {
      value: function stopListening() {
        _get(Object.getPrototypeOf(PosterPlugin.prototype), "stopListening", this).call(this);
        Mediator.off(Events.PLAYER_RESIZE, this.updateSize, this);
      }
    },
    onBuffering: {
      value: function onBuffering() {
        this.bufferFull = false;
        this.hidePlayButton();
      }
    },
    onPlay: {
      value: function onPlay() {
        if (this.bufferFull) {
          this.$el.hide();
          this.container.enableMediaControl();
        }
      }
    },
    onBufferfull: {
      value: function onBufferfull() {
        this.bufferFull = true;
        if (this.container.playback.name === "html5_video" && !this.container.isPlaying()) {
          return;
        }this.$el.hide();
        this.container.enableMediaControl();
      }
    },
    onStop: {
      value: function onStop() {
        this.$el.show();
        this.container.disableMediaControl();
        this.showPlayButton();
      }
    },
    showPlayButton: {
      value: function showPlayButton() {
        this.$playButton.show();
        this.updateSize();
      }
    },
    hidePlayButton: {
      value: function hidePlayButton() {
        this.$playButton.hide();
      }
    },
    clicked: {
      value: function clicked() {
        if (!this.options.chromeless) {
          this.container.play();
          this.hidePlayButton();
        }
        return false;
      }
    },
    updateSize: {
      value: function updateSize() {
        if (this.container.playback.name === "html_img") {
          return;
        }var height = PlayerInfo.currentSize ? PlayerInfo.currentSize.height : this.$el.height();
        this.$el.css({ fontSize: height });
        if (this.$playWrapper.is(":visible")) {
          this.$playWrapper.css({ marginTop: -(this.$playWrapper.height() / 2) });
        }
      }
    },
    render: {
      value: function render() {
        var _this = this;

        if (this.container.playback.name === "html_img") {
          return;
        }var style = Styler.getStyleFor(this.name, { baseUrl: this.options.baseUrl })[0];
        this.$el.html(this.template());
        this.$el.append(style);
        if (this.options.poster) {
          var imgEl = $("<div data-poster class=\"poster-background\"></div>");
          imgEl.css({ "background-image": "url(" + this.options.poster + ")" });
          this.$el.prepend(imgEl);
        }
        this.container.$el.append(this.el);
        this.$playButton = this.$el.find(".poster-icon");
        this.$playWrapper = this.$el.find(".play-wrapper");
        setTimeout(function () {
          return _this.updateSize();
        }, 0);
        if (this.options.chromeless) {
          this.hidePlayButton();
          this.$el.css({ cursor: "initial" });
        }
        return this;
      }
    }
  });

  return PosterPlugin;
})(UIContainerPlugin);

module.exports = PosterPlugin;

},{"../../base/events":"events","../../base/jst":47,"../../base/styler":48,"../../base/ui_container_plugin":"ui_container_plugin","../../components/mediator":"mediator","../../components/player_info":"player_info","clappr-zepto":"zepto"}],78:[function(require,module,exports){
"use strict";

module.exports = require("./spinner_three_bounce");

},{"./spinner_three_bounce":79}],79:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var UIContainerPlugin = require("../../base/ui_container_plugin");
var Styler = require("../../base/styler");
var JST = require("../../base/jst");
var Events = require("../../base/events");

var SpinnerThreeBouncePlugin = (function (_UIContainerPlugin) {
  function SpinnerThreeBouncePlugin(options) {
    _classCallCheck(this, SpinnerThreeBouncePlugin);

    _get(Object.getPrototypeOf(SpinnerThreeBouncePlugin.prototype), "constructor", this).call(this, options);
    this.template = JST.spinner_three_bounce;
    this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering);
    this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERFULL, this.onBufferFull);
    this.listenTo(this.container, Events.CONTAINER_STOP, this.onStop);
    this.render();
  }

  _inherits(SpinnerThreeBouncePlugin, _UIContainerPlugin);

  _createClass(SpinnerThreeBouncePlugin, {
    name: {
      get: function () {
        return "spinner";
      }
    },
    attributes: {
      get: function () {
        return {
          "data-spinner": "",
          "class": "spinner-three-bounce"
        };
      }
    },
    onBuffering: {
      value: function onBuffering() {
        this.$el.show();
      }
    },
    onBufferFull: {
      value: function onBufferFull() {
        this.$el.hide();
      }
    },
    onStop: {
      value: function onStop() {
        this.$el.hide();
      }
    },
    render: {
      value: function render() {
        this.$el.html(this.template());
        var style = Styler.getStyleFor("spinner_three_bounce");
        this.container.$el.append(style);
        this.container.$el.append(this.$el);
        this.$el.hide();
        return this;
      }
    }
  });

  return SpinnerThreeBouncePlugin;
})(UIContainerPlugin);

module.exports = SpinnerThreeBouncePlugin;

},{"../../base/events":"events","../../base/jst":47,"../../base/styler":48,"../../base/ui_container_plugin":"ui_container_plugin"}],80:[function(require,module,exports){
"use strict";

module.exports = require("./stats");

},{"./stats":81}],81:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var ContainerPlugin = require("../../base/container_plugin");
var $ = require("clappr-zepto");
var Events = require("../../base/events");

var StatsPlugin = (function (_ContainerPlugin) {
  function StatsPlugin(options) {
    _classCallCheck(this, StatsPlugin);

    _get(Object.getPrototypeOf(StatsPlugin.prototype), "constructor", this).call(this, options);
    this.setInitialAttrs();
    this.reportInterval = options.reportInterval || 5000;
    this.state = "IDLE";
  }

  _inherits(StatsPlugin, _ContainerPlugin);

  _createClass(StatsPlugin, {
    name: {
      get: function () {
        return "stats";
      }
    },
    bindEvents: {
      value: function bindEvents() {
        this.listenTo(this.container.playback, Events.PLAYBACK_PLAY, this.onPlay);
        this.listenTo(this.container, Events.CONTAINER_STOP, this.onStop);
        this.listenTo(this.container, Events.CONTAINER_DESTROYED, this.onStop);
        this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering);
        this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERFULL, this.onBufferFull);
        this.listenTo(this.container, Events.CONTAINER_STATS_ADD, this.onStatsAdd);
        this.listenTo(this.container, Events.CONTAINER_BITRATE, this.onStatsAdd);
        this.listenTo(this.container.playback, Events.PLAYBACK_STATS_ADD, this.onStatsAdd);
      }
    },
    setInitialAttrs: {
      value: function setInitialAttrs() {
        this.firstPlay = true;
        this.startupTime = 0;
        this.rebufferingTime = 0;
        this.watchingTime = 0;
        this.rebuffers = 0;
        this.externalMetrics = {};
      }
    },
    onPlay: {
      value: function onPlay() {
        this.state = "PLAYING";
        this.watchingTimeInit = Date.now();
        if (!this.intervalId) {
          this.intervalId = setInterval(this.report.bind(this), this.reportInterval);
        }
      }
    },
    onStop: {
      value: function onStop() {
        clearInterval(this.intervalId);
        this.intervalId = undefined;
        this.state = "STOPPED";
      }
    },
    onBuffering: {
      value: function onBuffering() {
        if (this.firstPlay) {
          this.startupTimeInit = Date.now();
        } else {
          this.rebufferingTimeInit = Date.now();
        }
        this.state = "BUFFERING";
        this.rebuffers++;
      }
    },
    onBufferFull: {
      value: function onBufferFull() {
        if (this.firstPlay && !!this.startupTimeInit) {
          this.firstPlay = false;
          this.startupTime = Date.now() - this.startupTimeInit;
          this.watchingTimeInit = Date.now();
        } else if (!!this.rebufferingTimeInit) {
          this.rebufferingTime += this.getRebufferingTime();
        }
        this.rebufferingTimeInit = undefined;
        this.state = "PLAYING";
      }
    },
    getRebufferingTime: {
      value: function getRebufferingTime() {
        return Date.now() - this.rebufferingTimeInit;
      }
    },
    getWatchingTime: {
      value: function getWatchingTime() {
        var totalTime = Date.now() - this.watchingTimeInit;
        return totalTime - this.rebufferingTime;
      }
    },
    isRebuffering: {
      value: function isRebuffering() {
        return !!this.rebufferingTimeInit;
      }
    },
    onStatsAdd: {
      value: function onStatsAdd(metric) {
        $.extend(this.externalMetrics, metric);
      }
    },
    getStats: {
      value: function getStats() {
        var metrics = {
          startupTime: this.startupTime,
          rebuffers: this.rebuffers,
          rebufferingTime: this.isRebuffering() ? this.rebufferingTime + this.getRebufferingTime() : this.rebufferingTime,
          watchingTime: this.isRebuffering() ? this.getWatchingTime() - this.getRebufferingTime() : this.getWatchingTime()
        };
        $.extend(metrics, this.externalMetrics);
        return metrics;
      }
    },
    report: {
      value: function report() {
        this.container.statsReport(this.getStats());
      }
    }
  });

  return StatsPlugin;
})(ContainerPlugin);

module.exports = StatsPlugin;

},{"../../base/container_plugin":"container_plugin","../../base/events":"events","clappr-zepto":"zepto"}],82:[function(require,module,exports){
"use strict";

module.exports = require("./watermark");

},{"./watermark":83}],83:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var UIContainerPlugin = require("../../base/ui_container_plugin");
var Styler = require("../../base/styler");
var JST = require("../../base/jst");
var Events = require("../../base/events");

var WaterMarkPlugin = (function (_UIContainerPlugin) {
  function WaterMarkPlugin(options) {
    _classCallCheck(this, WaterMarkPlugin);

    _get(Object.getPrototypeOf(WaterMarkPlugin.prototype), "constructor", this).call(this, options);
    this.template = JST[this.name];
    this.position = options.position || "bottom-right";
    if (options.watermark) {
      this.imageUrl = options.watermark;
      this.render();
    } else {
      this.$el.remove();
    }
  }

  _inherits(WaterMarkPlugin, _UIContainerPlugin);

  _createClass(WaterMarkPlugin, {
    name: {
      get: function () {
        return "watermark";
      }
    },
    bindEvents: {
      value: function bindEvents() {
        this.listenTo(this.container, Events.CONTAINER_PLAY, this.onPlay);
        this.listenTo(this.container, Events.CONTAINER_STOP, this.onStop);
      }
    },
    onPlay: {
      value: function onPlay() {
        if (!this.hidden) this.$el.show();
      }
    },
    onStop: {
      value: function onStop() {
        this.$el.hide();
      }
    },
    render: {
      value: function render() {
        this.$el.hide();
        var templateOptions = { position: this.position, imageUrl: this.imageUrl };
        this.$el.html(this.template(templateOptions));
        var style = Styler.getStyleFor(this.name);
        this.container.$el.append(style);
        this.container.$el.append(this.$el);
        return this;
      }
    }
  });

  return WaterMarkPlugin;
})(UIContainerPlugin);

module.exports = WaterMarkPlugin;

},{"../../base/events":"events","../../base/jst":47,"../../base/styler":48,"../../base/ui_container_plugin":"ui_container_plugin"}],"base_object":[function(require,module,exports){
"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var uniqueId = require("./utils").uniqueId;
var Events = require("./events");

var BaseObject = (function (_Events) {
  function BaseObject() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BaseObject);

    this.uniqueId = uniqueId("o");
    this.container = options.container;
  }

  _inherits(BaseObject, _Events);

  return BaseObject;
})(Events);

module.exports = BaseObject;

},{"./events":"events","./utils":49}],"browser":[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Browser = function Browser() {
  _classCallCheck(this, Browser);
};

var hasLocalstorage = function hasLocalstorage() {
  try {
    localStorage.setItem("clappr", "clappr");
    localStorage.removeItem("clappr");
    return true;
  } catch (e) {
    return false;
  }
};

var hasFlash = function hasFlash() {
  try {
    var fo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
    return !!fo;
  } catch (e) {
    return !!(navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] !== undefined && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin);
  }
};

Browser.isSafari = !!navigator.userAgent.match(/safari/i) && navigator.userAgent.indexOf("Chrome") === -1;
Browser.isChrome = !!navigator.userAgent.match(/chrome/i);
Browser.isFirefox = !!navigator.userAgent.match(/firefox/i);
Browser.isLegacyIE = !!window.ActiveXObject;
Browser.isIE = Browser.isLegacyIE || !!navigator.userAgent.match(/trident.*rv:1\d/i);
Browser.isIE11 = !!navigator.userAgent.match(/trident.*rv:11/i);
Browser.isMobile = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent);
Browser.isWin8App = !!/MSAppHost/i.test(navigator.userAgent);
Browser.isWiiU = !!/WiiU/i.test(navigator.userAgent);
Browser.isPS4 = !!/PlayStation 4/i.test(navigator.userAgent);
Browser.hasLocalstorage = hasLocalstorage();
Browser.hasFlash = hasFlash();

module.exports = Browser;

},{}],"container_plugin":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var BaseObject = require("./base_object");

var ContainerPlugin = (function (_BaseObject) {
  function ContainerPlugin(options) {
    _classCallCheck(this, ContainerPlugin);

    _get(Object.getPrototypeOf(ContainerPlugin.prototype), "constructor", this).call(this, options);
    this.enabled = true;
    this.bindEvents();
  }

  _inherits(ContainerPlugin, _BaseObject);

  _createClass(ContainerPlugin, {
    enable: {
      value: function enable() {
        if (!this.enabled) {
          this.bindEvents();
          this.enabled = true;
        }
      }
    },
    disable: {
      value: function disable() {
        if (this.enabled) {
          this.stopListening();
          this.enabled = false;
        }
      }
    },
    bindEvents: {
      value: function bindEvents() {}
    },
    destroy: {
      value: function destroy() {
        this.stopListening();
      }
    }
  });

  return ContainerPlugin;
})(BaseObject);

module.exports = ContainerPlugin;

},{"./base_object":"base_object"}],"container":[function(require,module,exports){
"use strict";

module.exports = require("./container");

},{"./container":50}],"core_plugin":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var BaseObject = require("./base_object");

var CorePlugin = (function (_BaseObject) {
  function CorePlugin(core) {
    _classCallCheck(this, CorePlugin);

    _get(Object.getPrototypeOf(CorePlugin.prototype), "constructor", this).call(this, core);
    this.core = core;
  }

  _inherits(CorePlugin, _BaseObject);

  _createClass(CorePlugin, {
    getExternalInterface: {
      value: function getExternalInterface() {
        return {};
      }
    },
    destroy: {
      value: function destroy() {}
    }
  });

  return CorePlugin;
})(BaseObject);

module.exports = CorePlugin;

},{"./base_object":"base_object"}],"core":[function(require,module,exports){
"use strict";

module.exports = require("./core");

},{"./core":53}],"events":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var execOnce = require("lodash.once");
var uniqueId = require("./utils").uniqueId;
var Log = require("../plugins/log").getInstance();

var slice = Array.prototype.slice;

var Events = (function () {
  function Events() {
    _classCallCheck(this, Events);
  }

  _createClass(Events, {
    on: {
      value: function on(name, callback, context) {
        if (!eventsApi(this, "on", name, [callback, context]) || !callback) {
          return this;
        }this._events || (this._events = {});
        var events = this._events[name] || (this._events[name] = []);
        events.push({ callback: callback, context: context, ctx: context || this });
        return this;
      }
    },
    once: {
      value: (function (_once) {
        var _onceWrapper = function once(_x, _x2, _x3) {
          return _once.apply(this, arguments);
        };

        _onceWrapper.toString = function () {
          return _once.toString();
        };

        return _onceWrapper;
      })(function (name, callback, context) {
        if (!eventsApi(this, "once", name, [callback, context]) || !callback) return this;
        var self = this;
        var once = execOnce(function () {
          self.off(name, once);
          callback.apply(this, arguments);
        });
        once._callback = callback;
        return this.on(name, once, context);
      })
    },
    off: {
      value: function off(name, callback, context) {
        var retain, ev, events, names, i, l, j, k;
        if (!this._events || !eventsApi(this, "off", name, [callback, context])) {
          return this;
        }if (!name && !callback && !context) {
          this._events = void 0;
          return this;
        }
        names = name ? [name] : Object.keys(this._events);
        for (i = 0, l = names.length; i < l; i++) {
          name = names[i];
          events = this._events[name];
          if (events) {
            this._events[name] = retain = [];
            if (callback || context) {
              for (j = 0, k = events.length; j < k; j++) {
                ev = events[j];
                if (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) {
                  retain.push(ev);
                }
              }
            }
            if (!retain.length) delete this._events[name];
          }
        }
        return this;
      }
    },
    trigger: {
      value: function trigger(name) {
        var klass = arguments[arguments.length - 1];
        Log.info(klass, name);
        if (!this._events) {
          return this;
        }var args = slice.call(arguments, 1);
        if (!eventsApi(this, "trigger", name, args)) {
          return this;
        }var events = this._events[name];
        var allEvents = this._events.all;
        if (events) triggerEvents(events, args);
        if (allEvents) triggerEvents(allEvents, arguments);
        return this;
      }
    },
    stopListening: {
      value: function stopListening(obj, name, callback) {
        var listeningTo = this._listeningTo;
        if (!listeningTo) {
          return this;
        }var remove = !name && !callback;
        if (!callback && typeof name === "object") callback = this;
        if (obj) (listeningTo = {})[obj._listenId] = obj;
        for (var id in listeningTo) {
          obj = listeningTo[id];
          obj.off(name, callback, this);
          if (remove || Object.keys(obj._events).length === 0) delete this._listeningTo[id];
        }
        return this;
      }
    }
  });

  return Events;
})();

var eventSplitter = /\s+/;

var eventsApi = function eventsApi(obj, action, name, rest) {
  if (!name) {
    return true;
  } // Handle event maps.
  if (typeof name === "object") {
    for (var key in name) {
      obj[action].apply(obj, [key, name[key]].concat(rest));
    }
    return false;
  }

  // Handle space separated event names.
  if (eventSplitter.test(name)) {
    var names = name.split(eventSplitter);
    for (var i = 0, l = names.length; i < l; i++) {
      obj[action].apply(obj, [names[i]].concat(rest));
    }
    return false;
  }

  return true;
};

var triggerEvents = function triggerEvents(events, args) {
  var ev,
      i = -1,
      l = events.length,
      a1 = args[0],
      a2 = args[1],
      a3 = args[2];
  switch (args.length) {
    case 0:
      while (++i < l) (ev = events[i]).callback.call(ev.ctx);return;
    case 1:
      while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1);return;
    case 2:
      while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2);return;
    case 3:
      while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);return;
    default:
      while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);return;
  }
};

var listenMethods = { listenTo: "on", listenToOnce: "once" };

Object.keys(listenMethods).forEach(function (method) {
  Events.prototype[method] = function (obj, name, callback) {
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var id = obj._listenId || (obj._listenId = uniqueId("l"));
    listeningTo[id] = obj;
    if (!callback && typeof name === "object") callback = this;
    obj[listenMethods[method]](name, callback, this);
    return this;
  };
});

// PLAYER EVENTS
Events.PLAYER_RESIZE = "player:resize";

// Playback Events
Events.PLAYBACK_PROGRESS = "playback:progress";
Events.PLAYBACK_TIMEUPDATE = "playback:timeupdate";
Events.PLAYBACK_READY = "playback:ready";
Events.PLAYBACK_BUFFERING = "playback:buffering";
Events.PLAYBACK_BUFFERFULL = "playback:bufferfull";
Events.PLAYBACK_SETTINGSUPDATE = "playback:settingsupdate";
Events.PLAYBACK_LOADEDMETADATA = "playback:loadedmetadata";
Events.PLAYBACK_HIGHDEFINITIONUPDATE = "playback:highdefinitionupdate";
Events.PLAYBACK_BITRATE = "playback:bitrate";
Events.PLAYBACK_PLAYBACKSTATE = "playback:playbackstate";
Events.PLAYBACK_DVR = "playback:dvr";
Events.PLAYBACK_MEDIACONTROL_DISABLE = "playback:mediacontrol:disable";
Events.PLAYBACK_MEDIACONTROL_ENABLE = "playback:mediacontrol:enable";
Events.PLAYBACK_ENDED = "playback:ended";
Events.PLAYBACK_PLAY = "playback:play";
Events.PLAYBACK_ERROR = "playback:error";
Events.PLAYBACK_STATS_ADD = "playback:stats:add";

// Container Events
Events.CONTAINER_PLAYBACKSTATE = "container:playbackstate";
Events.CONTAINER_PLAYBACKDVRSTATECHANGED = "container:dvr";
Events.CONTAINER_BITRATE = "container:bitrate";
Events.CONTAINER_STATS_REPORT = "container:stats:report";
Events.CONTAINER_DESTROYED = "container:destroyed";
Events.CONTAINER_READY = "container:ready";
Events.CONTAINER_ERROR = "container:error";
Events.CONTAINER_LOADEDMETADATA = "container:loadedmetadata";
Events.CONTAINER_TIMEUPDATE = "container:timeupdate";
Events.CONTAINER_PROGRESS = "container:progress";
Events.CONTAINER_PLAY = "container:play";
Events.CONTAINER_STOP = "container:stop";
Events.CONTAINER_PAUSE = "container:pause";
Events.CONTAINER_ENDED = "container:ended";
Events.CONTAINER_CLICK = "container:click";
Events.CONTAINER_MOUSE_ENTER = "container:mouseenter";
Events.CONTAINER_MOUSE_LEAVE = "container:mouseleave";
Events.CONTAINER_SEEK = "container:seek";
Events.CONTAINER_VOLUME = "container:volume";
Events.CONTAINER_FULLSCREEN = "container:fullscreen";
Events.CONTAINER_STATE_BUFFERING = "container:state:buffering";
Events.CONTAINER_STATE_BUFFERFULL = "container:state:bufferfull";
Events.CONTAINER_SETTINGSUPDATE = "container:settingsupdate";
Events.CONTAINER_HIGHDEFINITIONUPDATE = "container:highdefinitionupdate";
Events.CONTAINER_MEDIACONTROL_DISABLE = "container:mediacontrol:disable";
Events.CONTAINER_MEDIACONTROL_ENABLE = "container:mediacontrol:enable";
Events.CONTAINER_STATS_ADD = "container:stats:add";

// MediaControl Events
Events.MEDIACONTROL_RENDERED = "mediacontrol:rendered";
Events.MEDIACONTROL_FULLSCREEN = "mediacontrol:fullscreen";
Events.MEDIACONTROL_SHOW = "mediacontrol:show";
Events.MEDIACONTROL_HIDE = "mediacontrol:hide";
Events.MEDIACONTROL_MOUSEMOVE_SEEKBAR = "mediacontrol:mousemove:seekbar";
Events.MEDIACONTROL_MOUSELEAVE_SEEKBAR = "mediacontrol:mouseleave:seekbar";
Events.MEDIACONTROL_PLAYING = "mediacontrol:playing";
Events.MEDIACONTROL_NOTPLAYING = "mediacontrol:notplaying";
Events.MEDIACONTROL_CONTAINERCHANGED = "mediacontrol:containerchanged";

module.exports = Events;

},{"../plugins/log":75,"./utils":49,"lodash.once":27}],"flash":[function(require,module,exports){
"use strict";

module.exports = require("./flash");

},{"./flash":62}],"hls":[function(require,module,exports){
"use strict";

module.exports = require("./hls");

},{"./hls":63}],"html5_audio":[function(require,module,exports){
"use strict";

module.exports = require("./html5_audio");

},{"./html5_audio":64}],"html5_video":[function(require,module,exports){
"use strict";

module.exports = require("./html5_video");

},{"./html5_video":65}],"html_img":[function(require,module,exports){
"use strict";

module.exports = require("./html_img");

},{"./html_img":66}],"kibo":[function(require,module,exports){
"use strict";

var Kibo = function Kibo(element) {
  this.element = element || window.document;
  this.initialize();
};

Kibo.KEY_NAMES_BY_CODE = {
  8: "backspace", 9: "tab", 13: "enter",
  16: "shift", 17: "ctrl", 18: "alt",
  20: "caps_lock",
  27: "esc",
  32: "space",
  37: "left", 38: "up", 39: "right", 40: "down",
  48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9",
  65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k", 76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z",
  112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 120: "f9", 121: "f10", 122: "f11", 123: "f12"
};

Kibo.KEY_CODES_BY_NAME = {};
(function () {
  for (var key in Kibo.KEY_NAMES_BY_CODE) if (Object.prototype.hasOwnProperty.call(Kibo.KEY_NAMES_BY_CODE, key)) Kibo.KEY_CODES_BY_NAME[Kibo.KEY_NAMES_BY_CODE[key]] = +key;
})();

Kibo.MODIFIERS = ["shift", "ctrl", "alt"];

Kibo.registerEvent = (function () {
  if (document.addEventListener) {
    return function (element, eventName, func) {
      element.addEventListener(eventName, func, false);
    };
  } else if (document.attachEvent) {
    return function (element, eventName, func) {
      element.attachEvent("on" + eventName, func);
    };
  }
})();

Kibo.unregisterEvent = (function () {
  if (document.removeEventListener) {
    return function (element, eventName, func) {
      element.removeEventListener(eventName, func, false);
    };
  } else if (document.detachEvent) {
    return function (element, eventName, func) {
      element.detachEvent("on" + eventName, func);
    };
  }
})();

Kibo.stringContains = function (string, substring) {
  return string.indexOf(substring) !== -1;
};

Kibo.neatString = function (string) {
  return string.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
};

Kibo.capitalize = function (string) {
  return string.toLowerCase().replace(/^./, function (match) {
    return match.toUpperCase();
  });
};

Kibo.isString = function (what) {
  return Kibo.stringContains(Object.prototype.toString.call(what), "String");
};

Kibo.arrayIncludes = (function () {
  if (Array.prototype.indexOf) {
    return function (haystack, needle) {
      return haystack.indexOf(needle) !== -1;
    };
  } else {
    return function (haystack, needle) {
      for (var i = 0; i < haystack.length; i++) if (haystack[i] === needle) return true;
      return false;
    };
  }
})();

Kibo.extractModifiers = function (keyCombination) {
  var modifiers, i;
  modifiers = [];
  for (i = 0; i < Kibo.MODIFIERS.length; i++) if (Kibo.stringContains(keyCombination, Kibo.MODIFIERS[i])) modifiers.push(Kibo.MODIFIERS[i]);
  return modifiers;
};

Kibo.extractKey = function (keyCombination) {
  var keys, i;
  keys = Kibo.neatString(keyCombination).split(" ");
  for (i = 0; i < keys.length; i++) if (!Kibo.arrayIncludes(Kibo.MODIFIERS, keys[i])) return keys[i];
};

Kibo.modifiersAndKey = function (keyCombination) {
  var result, key;

  if (Kibo.stringContains(keyCombination, "any")) {
    return Kibo.neatString(keyCombination).split(" ").slice(0, 2).join(" ");
  }

  result = Kibo.extractModifiers(keyCombination);

  key = Kibo.extractKey(keyCombination);
  if (key && !Kibo.arrayIncludes(Kibo.MODIFIERS, key)) result.push(key);

  return result.join(" ");
};

Kibo.keyName = function (keyCode) {
  return Kibo.KEY_NAMES_BY_CODE[keyCode + ""];
};

Kibo.keyCode = function (keyName) {
  return +Kibo.KEY_CODES_BY_NAME[keyName];
};

Kibo.prototype.initialize = function () {
  var i,
      that = this;

  this.lastKeyCode = -1;
  this.lastModifiers = {};
  for (i = 0; i < Kibo.MODIFIERS.length; i++) this.lastModifiers[Kibo.MODIFIERS[i]] = false;

  this.keysDown = { any: [] };
  this.keysUp = { any: [] };
  this.downHandler = this.handler("down");
  this.upHandler = this.handler("up");

  Kibo.registerEvent(this.element, "keydown", this.downHandler);
  Kibo.registerEvent(this.element, "keyup", this.upHandler);
  Kibo.registerEvent(window, "unload", function unloader() {
    Kibo.unregisterEvent(that.element, "keydown", that.downHandler);
    Kibo.unregisterEvent(that.element, "keyup", that.upHandler);
    Kibo.unregisterEvent(window, "unload", unloader);
  });
};

Kibo.prototype.handler = function (upOrDown) {
  var that = this;
  return function (e) {
    var i, registeredKeys, lastModifiersAndKey;

    e = e || window.event;

    that.lastKeyCode = e.keyCode;
    for (i = 0; i < Kibo.MODIFIERS.length; i++) that.lastModifiers[Kibo.MODIFIERS[i]] = e[Kibo.MODIFIERS[i] + "Key"];
    if (Kibo.arrayIncludes(Kibo.MODIFIERS, Kibo.keyName(that.lastKeyCode))) that.lastModifiers[Kibo.keyName(that.lastKeyCode)] = true;

    registeredKeys = that["keys" + Kibo.capitalize(upOrDown)];

    for (i = 0; i < registeredKeys.any.length; i++) if (registeredKeys.any[i](e) === false && e.preventDefault) e.preventDefault();

    lastModifiersAndKey = that.lastModifiersAndKey();
    if (registeredKeys[lastModifiersAndKey]) for (i = 0; i < registeredKeys[lastModifiersAndKey].length; i++) if (registeredKeys[lastModifiersAndKey][i](e) === false && e.preventDefault) e.preventDefault();
  };
};

Kibo.prototype.registerKeys = function (upOrDown, newKeys, func) {
  var i,
      keys,
      registeredKeys = this["keys" + Kibo.capitalize(upOrDown)];

  if (Kibo.isString(newKeys)) newKeys = [newKeys];

  for (i = 0; i < newKeys.length; i++) {
    keys = newKeys[i];
    keys = Kibo.modifiersAndKey(keys + "");

    if (registeredKeys[keys]) registeredKeys[keys].push(func);else registeredKeys[keys] = [func];
  }

  return this;
};

Kibo.prototype.unregisterKeys = function (upOrDown, newKeys, func) {
  var i,
      j,
      keys,
      registeredKeys = this["keys" + Kibo.capitalize(upOrDown)];

  if (Kibo.isString(newKeys)) newKeys = [newKeys];

  for (i = 0; i < newKeys.length; i++) {
    keys = newKeys[i];
    keys = Kibo.modifiersAndKey(keys + "");

    if (func === null) delete registeredKeys[keys];else {
      if (registeredKeys[keys]) {
        for (j = 0; j < registeredKeys[keys].length; j++) {
          if (String(registeredKeys[keys][j]) === String(func)) {
            registeredKeys[keys].splice(j, 1);
            break;
          }
        }
      }
    }
  }

  return this;
};

Kibo.prototype.off = function (keys) {
  return this.unregisterKeys("down", keys, null);
};

Kibo.prototype.delegate = function (upOrDown, keys, func) {
  return func !== null || func !== undefined ? this.registerKeys(upOrDown, keys, func) : this.unregisterKeys(upOrDown, keys, func);
};

Kibo.prototype.down = function (keys, func) {
  return this.delegate("down", keys, func);
};

Kibo.prototype.up = function (keys, func) {
  return this.delegate("up", keys, func);
};

Kibo.prototype.lastKey = function (modifier) {
  if (!modifier) return Kibo.keyName(this.lastKeyCode);

  return this.lastModifiers[modifier];
};

Kibo.prototype.lastModifiersAndKey = function () {
  var result, i;

  result = [];
  for (i = 0; i < Kibo.MODIFIERS.length; i++) if (this.lastKey(Kibo.MODIFIERS[i])) result.push(Kibo.MODIFIERS[i]);

  if (!Kibo.arrayIncludes(result, this.lastKey())) result.push(this.lastKey());

  return result.join(" ");
};

module.exports = Kibo;

},{}],"media_control":[function(require,module,exports){
"use strict";

module.exports = require("./media_control");

},{"./media_control":58}],"mediator":[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * The mediator is a singleton for handling global events.
 */

var Events = require("../base/events");

var events = new Events();

var Mediator = function Mediator() {
  _classCallCheck(this, Mediator);
};

Mediator.on = function (name, callback, context) {
  events.on(name, callback, context);
  return;
};

Mediator.once = function (name, callback, context) {
  events.once(name, callback, context);
  return;
};

Mediator.off = function (name, callback, context) {
  events.off(name, callback, context);
  return;
};

Mediator.trigger = function (name, opts) {
  events.trigger(name, opts);
  return;
};

Mediator.stopListening = function (obj, name, callback) {
  events.stopListening(obj, name, callback);
  return;
};

module.exports = Mediator;

},{"../base/events":"events"}],"playback":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var UIObject = require("./ui_object");

var Playback = (function (_UIObject) {
  function Playback(options) {
    _classCallCheck(this, Playback);

    _get(Object.getPrototypeOf(Playback.prototype), "constructor", this).call(this, options);
    this.settings = {};
  }

  _inherits(Playback, _UIObject);

  _createClass(Playback, {
    play: {
      value: function play() {}
    },
    pause: {
      value: function pause() {}
    },
    stop: {
      value: function stop() {}
    },
    seek: {
      value: function seek(time) {}
    },
    getDuration: {
      value: function getDuration() {
        return 0;
      }
    },
    isPlaying: {
      value: function isPlaying() {
        return false;
      }
    },
    getPlaybackType: {
      value: function getPlaybackType() {
        return "no_op";
      }
    },
    isHighDefinitionInUse: {
      value: function isHighDefinitionInUse() {
        return false;
      }
    },
    volume: {
      value: function volume(value) {}
    },
    destroy: {
      value: function destroy() {
        this.$el.remove();
      }
    }
  });

  return Playback;
})(UIObject);

Playback.canPlay = function (source) {
  return false;
};

module.exports = Playback;

},{"./ui_object":"ui_object"}],"player_info":[function(require,module,exports){
// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

"use strict";

var PlayerInfo = {
  options: {},
  playbackPlugins: [],
  currentSize: { width: 0, height: 0 }
};

module.exports = PlayerInfo;

},{}],"poster":[function(require,module,exports){
"use strict";

module.exports = require("./poster");

},{"./poster":77}],"template":[function(require,module,exports){
// Simple JavaScript Templating
// Paul Miller (http://paulmillr.com)
// http://underscorejs.org
// (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
"use strict";

(function (globals) {
  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  var settings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    "\\": "\\",
    "\r": "r",
    "\n": "n",
    "\t": "t",
    "\u2028": "u2028",
    "\u2029": "u2029"
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // List of HTML entities for escaping.
  var htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#x27;"
  };

  var entityRe = new RegExp("[&<>\"']", "g");

  var escapeExpr = function escapeExpr(string) {
    if (string == null) {
      return "";
    }return ("" + string).replace(entityRe, function (match) {
      return htmlEntities[match];
    });
  };

  var counter = 0;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  var tmpl = function tmpl(text, data) {
    var render;

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g");

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, function (match) {
        return "\\" + escapes[match];
      });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':escapeExpr(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = "with(obj||{}){\n" + source + "}\n";

    source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n//# sourceURL=/microtemplates/source[" + counter++ + "]";

    try {
      render = new Function(settings.variable || "obj", "escapeExpr", source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) {
      return render(data, escapeExpr);
    }var template = function template(data) {
      return render.call(this, data, escapeExpr);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}";

    return template;
  };
  tmpl.settings = settings;

  if (typeof define !== "undefined" && define.amd) {
    define([], function () {
      return tmpl;
    }); // RequireJS
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = tmpl; // CommonJS
  } else {
    globals.microtemplate = tmpl; // <script>
  }
})(undefined);

},{}],"ui_container_plugin":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var UIObject = require("./ui_object");

var UIContainerPlugin = (function (_UIObject) {
  function UIContainerPlugin(options) {
    _classCallCheck(this, UIContainerPlugin);

    _get(Object.getPrototypeOf(UIContainerPlugin.prototype), "constructor", this).call(this, options);
    this.enabled = true;
    this.bindEvents();
  }

  _inherits(UIContainerPlugin, _UIObject);

  _createClass(UIContainerPlugin, {
    enable: {
      value: function enable() {
        if (!this.enabled) {
          this.bindEvents();
          this.$el.show();
          this.enabled = true;
        }
      }
    },
    disable: {
      value: function disable() {
        this.stopListening();
        this.$el.hide();
        this.enabled = false;
      }
    },
    bindEvents: {
      value: function bindEvents() {}
    },
    destroy: {
      value: function destroy() {
        this.remove();
      }
    }
  });

  return UIContainerPlugin;
})(UIObject);

module.exports = UIContainerPlugin;

},{"./ui_object":"ui_object"}],"ui_core_plugin":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var UIObject = require("./ui_object");

var UICorePlugin = (function (_UIObject) {
  function UICorePlugin(core) {
    _classCallCheck(this, UICorePlugin);

    _get(Object.getPrototypeOf(UICorePlugin.prototype), "constructor", this).call(this, core);
    this.core = core;
    this.enabled = true;
    this.bindEvents();
    this.render();
  }

  _inherits(UICorePlugin, _UIObject);

  _createClass(UICorePlugin, {
    bindEvents: {
      value: function bindEvents() {}
    },
    getExternalInterface: {
      value: function getExternalInterface() {
        return {};
      }
    },
    enable: {
      value: function enable() {
        if (!this.enabled) {
          this.bindEvents();
          this.$el.show();
          this.enabled = true;
        }
      }
    },
    disable: {
      value: function disable() {
        this.stopListening();
        this.$el.hide();
        this.enabled = false;
      }
    },
    destroy: {
      value: function destroy() {
        this.remove();
      }
    },
    render: {
      value: function render() {
        this.$el.html(this.template());
        this.$el.append(this.styler.getStyleFor(this.name));
        this.core.$el.append(this.el);
        return this;
      }
    }
  });

  return UICorePlugin;
})(UIObject);

module.exports = UICorePlugin;

},{"./ui_object":"ui_object"}],"ui_object":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var $ = require("clappr-zepto");
var uniqueId = require("./utils").uniqueId;
var result = require("lodash.result");
var assign = require("lodash.assign");
var BaseObject = require("./base_object");

var delegateEventSplitter = /^(\S+)\s*(.*)$/;

var UIObject = (function (_BaseObject) {
  function UIObject(options) {
    _classCallCheck(this, UIObject);

    _get(Object.getPrototypeOf(UIObject.prototype), "constructor", this).call(this, options);
    this.cid = uniqueId("c");
    this._ensureElement();
    this.delegateEvents();
  }

  _inherits(UIObject, _BaseObject);

  _createClass(UIObject, {
    tagName: {
      get: function () {
        return "div";
      }
    },
    $: {
      value: function $(selector) {
        return this.$el.find(selector);
      }
    },
    render: {
      value: function render() {
        return this;
      }
    },
    remove: {
      value: function remove() {
        this.$el.remove();
        this.stopListening();
        return this;
      }
    },
    setElement: {
      value: function setElement(element, delegate) {
        if (this.$el) this.undelegateEvents();
        this.$el = element instanceof $ ? element : $(element);
        this.el = this.$el[0];
        if (delegate !== false) this.delegateEvents();
        return this;
      }
    },
    delegateEvents: {
      value: function delegateEvents(events) {
        if (!(events || (events = result(this, "events")))) {
          return this;
        }this.undelegateEvents();
        for (var key in events) {
          var method = events[key];
          if (method && method.constructor !== Function) method = this[events[key]];
          if (!method) continue;

          var match = key.match(delegateEventSplitter);
          var eventName = match[1],
              selector = match[2];
          //method = _.bind(method, this)
          eventName += ".delegateEvents" + this.cid;
          if (selector === "") {
            this.$el.on(eventName, method.bind(this));
          } else {
            this.$el.on(eventName, selector, method.bind(this));
          }
        }
        return this;
      }
    },
    undelegateEvents: {
      value: function undelegateEvents() {
        this.$el.off(".delegateEvents" + this.cid);
        return this;
      }
    },
    _ensureElement: {
      value: function _ensureElement() {
        if (!this.el) {
          var attrs = assign({}, result(this, "attributes"));
          if (this.id) attrs.id = result(this, "id");
          if (this.className) attrs["class"] = result(this, "className");
          var $el = $("<" + result(this, "tagName") + ">").attr(attrs);
          this.setElement($el, false);
        } else {
          this.setElement(result(this, "el"), false);
        }
      }
    }
  });

  return UIObject;
})(BaseObject);

module.exports = UIObject;

},{"./base_object":"base_object","./utils":49,"clappr-zepto":"zepto","lodash.assign":2,"lodash.result":29}],"zepto":[function(require,module,exports){
/* Zepto v1.1.4-80-ga9184b2 - zepto event ajax callbacks deferred touch selector ie - zeptojs.com/license */
var Zepto=function(){function D(t){return null==t?String(t):j[S.call(t)]||"object"}function L(t){return"function"==D(t)}function k(t){return null!=t&&t==t.window}function Z(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function $(t){return"object"==D(t)}function F(t){return $(t)&&!k(t)&&Object.getPrototypeOf(t)==Object.prototype}function R(t){return"number"==typeof t.length}function q(t){return s.call(t,function(t){return null!=t})}function W(t){return t.length>0?n.fn.concat.apply([],t):t}function z(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function H(t){return t in c?c[t]:c[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function _(t,e){return"number"!=typeof e||l[z(t)]?e:e+"px"}function I(t){var e,n;return f[t]||(e=u.createElement(t),u.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),f[t]=n),f[t]}function U(t){return"children"in t?a.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function X(t,e){var n,i=t?t.length:0;for(n=0;i>n;n++)this[n]=t[n];this.length=i,this.selector=e||""}function B(n,i,r){for(e in i)r&&(F(i[e])||A(i[e]))?(F(i[e])&&!F(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function V(t,e){return null==e?n(t):n(t).filter(e)}function Y(t,e,n,i){return L(e)?e.call(t,n,i):e}function J(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function G(e,n){var i=e.className||"",r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function K(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?n.parseJSON(t):t):t}catch(e){return t}}function Q(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)Q(t.childNodes[n],e)}var t,e,n,i,N,P,r=[],o=r.concat,s=r.filter,a=r.slice,u=window.document,f={},c={},l={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},h=/^\s*<(\w+|!)[^>]*>/,p=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,d=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,m=/^(?:body|html)$/i,g=/([A-Z])/g,v=["val","css","html","text","data","width","height","offset"],y=["after","prepend","before","append"],w=u.createElement("table"),x=u.createElement("tr"),b={tr:u.createElement("tbody"),tbody:w,thead:w,tfoot:w,td:x,th:x,"*":u.createElement("div")},E=/complete|loaded|interactive/,T=/^[\w-]*$/,j={},S=j.toString,C={},O=u.createElement("div"),M={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return C.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~C.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},N=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},P=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},C.fragment=function(e,i,r){var o,s,f;return p.test(e)&&(o=n(u.createElement(RegExp.$1))),o||(e.replace&&(e=e.replace(d,"<$1></$2>")),i===t&&(i=h.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,o=n.each(a.call(f.childNodes),function(){f.removeChild(this)})),F(r)&&(s=n(o),n.each(r,function(t,e){v.indexOf(t)>-1?s[t](e):s.attr(t,e)})),o},C.Z=function(t,e){return new X(t,e)},C.isZ=function(t){return t instanceof C.Z},C.init=function(e,i){var r;if(!e)return C.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&h.test(e))r=C.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=C.qsa(u,e)}else{if(L(e))return n(u).ready(e);if(C.isZ(e))return e;if(A(e))r=q(e);else if($(e))r=[e],e=null;else if(h.test(e))r=C.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=C.qsa(u,e)}}return C.Z(r,e)},n=function(t,e){return C.init(t,e)},n.extend=function(t){var e,n=a.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},C.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],o=i||r?e.slice(1):e,s=T.test(o);return t.getElementById&&s&&i?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:a.call(s&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=u.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=D,n.isFunction=L,n.isWindow=k,n.isArray=A,n.isPlainObject=F,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=N,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.noop=function(){},n.map=function(t,e){var n,r,o,i=[];if(R(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return W(i)},n.each=function(t,e){var n,i;if(R(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={constructor:C.Z,length:0,forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,splice:r.splice,indexOf:r.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=C.isZ(e)?e.toArray():e;return o.apply(C.isZ(this)?this.toArray():this,n)},map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(a.apply(this,arguments))},ready:function(t){return E.test(u.readyState)&&u.body?t(n):u.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?a.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return L(t)?this.not(this.not(t)):n(s.call(this,function(e){return C.matches(e,t)}))},add:function(t,e){return n(P(this.concat(n(t,e))))},is:function(t){return this.length>0&&C.matches(this[0],t)},not:function(e){var i=[];if(L(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):R(e)&&L(e.item)?a.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return $(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!$(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!$(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(C.qsa(this[0],t)):this.map(function(){return C.qsa(this,t)}):n()},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:C.matches(i,t));)i=i!==e&&!Z(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!Z(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return V(e,t)},parent:function(t){return V(P(this.pluck("parentNode")),t)},children:function(t){return V(this.map(function(){return U(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||a.call(this.childNodes)})},siblings:function(t){return V(this.map(function(t,e){return s.call(U(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=L(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=L(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(Y(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=Y(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if($(n))for(e in n)J(this,e,n[e]);else J(this,n,Y(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){J(this,t)},this)})},prop:function(t,e){return t=M[t]||t,1 in arguments?this.each(function(n){this[t]=Y(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(g,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?K(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=Y(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=Y(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;if(!n.contains(u.documentElement,this[0]))return{top:0,left:0};var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r,o=this[0];if(!o)return;if(r=getComputedStyle(o,""),"string"==typeof t)return o.style[N(t)]||r.getPropertyValue(t);if(A(t)){var s={};return n.each(t,function(t,e){s[e]=o.style[N(e)]||r.getPropertyValue(e)}),s}}var a="";if("string"==D(t))i||0===i?a=z(t)+":"+_(t,i):this.each(function(){this.style.removeProperty(z(t))});else for(e in t)t[e]||0===t[e]?a+=z(e)+":"+_(e,t[e])+";":this.each(function(){this.style.removeProperty(z(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(G(t))},H(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var r=G(this),o=Y(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&G(this,r+(r?" ":"")+i.join(" "))}}):this},removeClass:function(e){return this.each(function(n){if("className"in this){if(e===t)return G(this,"");i=G(this),Y(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(H(t)," ")}),G(this,i.trim())}})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=Y(this,e,r,G(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=m.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||u.body;t&&!m.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?k(s)?s["inner"+i]:Z(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,Y(this,r,t,s[e]()))})}}),y.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=D(e),"object"==t||"array"==t||null==e?e:C.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null;var f=n.contains(u.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,a),f&&Q(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),C.Z.prototype=X.prototype=n.fn,C.uniq=P,C.deserializeValue=K,n.zepto=C,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=T(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function T(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=w,r&&r.apply(i,arguments)},e[n]=x}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=w)),e}function j(t){var e,i={originalEvent:t};for(e in t)b.test(e)||t[e]===n||(i[e]=t[e]);return T(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var w=function(){return!0},x=function(){return!1},b=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(u===n||a===!1)&&(u=a,a=n),u===!1&&(u=x),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(j(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=x),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):T(e),e._args=n,this.each(function(){e.type in f&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=j(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),T(n)}}(Zepto),function(t){function h(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function p(t,e,i,r){return t.global?h(e||n,i,r):void 0}function d(e){e.global&&0===t.active++&&p(e,null,"ajaxStart")}function m(e){e.global&&!--t.active&&p(e,null,"ajaxStop")}function g(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||p(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void p(e,n,"ajaxSend",[t,e])}function v(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),p(n,r,"ajaxSuccess",[e,n,t]),w(o,e,n)}function y(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),p(i,o,"ajaxError",[n,i,t||e]),w(e,n,i)}function w(t,e,n){var i=n.context;n.complete.call(i,e,t),p(n,i,"ajaxComplete",[e,n]),m(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function E(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function T(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=E(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function C(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?C(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/,l=n.createElement("a");l.href=window.location.href,t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?v(f[0],l,i,r):y(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),g(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var a,u,o=t.extend({},e||{}),s=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===o[i]&&(o[i]=t.ajaxSettings[i]);d(o),o.crossDomain||(a=n.createElement("a"),a.href=o.url,a.href=a.href,o.crossDomain=l.protocol+"//"+l.host!=a.protocol+"//"+a.host),o.url||(o.url=window.location.toString()),(u=o.url.indexOf("#"))>-1&&(o.url=o.url.slice(0,u)),T(o);var f=o.dataType,h=/\?.+=\?/.test(o.url);if(h&&(f="jsonp"),o.cache!==!1&&(e&&e.cache===!0||"script"!=f&&"jsonp"!=f)||(o.url=E(o.url,"_="+Date.now())),"jsonp"==f)return h||(o.url=E(o.url,o.jsonp?o.jsonp+"=?":o.jsonp===!1?"":"callback=?")),t.ajaxJSONP(o,s);var N,p=o.accepts[f],m={},w=function(t,e){m[t.toLowerCase()]=[t,e]},j=/^([\w-]+:)\/\//.test(o.url)?RegExp.$1:window.location.protocol,S=o.xhr(),C=S.setRequestHeader;if(s&&s.promise(S),o.crossDomain||w("X-Requested-With","XMLHttpRequest"),w("Accept",p||"*/*"),(p=o.mimeType||p)&&(p.indexOf(",")>-1&&(p=p.split(",",2)[0]),S.overrideMimeType&&S.overrideMimeType(p)),(o.contentType||o.contentType!==!1&&o.data&&"GET"!=o.type.toUpperCase())&&w("Content-Type",o.contentType||"application/x-www-form-urlencoded"),o.headers)for(r in o.headers)w(r,o.headers[r]);if(S.setRequestHeader=w,S.onreadystatechange=function(){if(4==S.readyState){S.onreadystatechange=x,clearTimeout(N);var e,n=!1;if(S.status>=200&&S.status<300||304==S.status||0==S.status&&"file:"==j){f=f||b(o.mimeType||S.getResponseHeader("content-type")),e=S.responseText;try{"script"==f?(1,eval)(e):"xml"==f?e=S.responseXML:"json"==f&&(e=c.test(e)?null:t.parseJSON(e))}catch(i){n=i}n?y(n,"parsererror",S,o,s):v(e,S,o,s)}else y(S.statusText||null,S.status?"error":"abort",S,o,s)}},g(S,o)===!1)return S.abort(),y(null,"abort",S,o,s),S;if(o.xhrFields)for(r in o.xhrFields)S[r]=o.xhrFields[r];var P="async"in o?o.async:!0;S.open(o.type,o.url,P,o.username,o.password);for(r in m)C.apply(S,m[r]);return o.timeout>0&&(N=setTimeout(function(){S.onreadystatechange=x,S.abort(),y(null,"timeout",S,o,s)},o.timeout)),S.send(o.data?o.data:null),S},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var S=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(S(e)+"="+S(n))},C(i,e,n),i.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.Callbacks=function(e){e=t.extend({},e);var n,i,r,o,s,a,u=[],f=!e.once&&[],c=function(t){for(n=e.memory&&t,i=!0,a=o||0,o=0,s=u.length,r=!0;u&&s>a;++a)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}r=!1,u&&(f?f.length&&c(f.shift()):n?u.length=0:l.disable())},l={add:function(){if(u){var i=u.length,a=function(n){t.each(n,function(t,n){"function"==typeof n?e.unique&&l.has(n)||u.push(n):n&&n.length&&"string"!=typeof n&&a(n)})};a(arguments),r?s=u.length:n&&(o=i,c(n))}return this},remove:function(){return u&&t.each(arguments,function(e,n){for(var i;(i=t.inArray(n,u,i))>-1;)u.splice(i,1),r&&(s>=i&&--s,a>=i&&--a)}),this},has:function(e){return!(!u||!(e?t.inArray(e,u)>-1:u.length))},empty:function(){return s=u.length=0,this},disable:function(){return u=f=n=void 0,this},disabled:function(){return!u},lock:function(){return f=void 0,n||l.disable(),this},locked:function(){return!f},fireWith:function(t,e){return!u||i&&!f||(e=e||[],e=[t,e.slice?e.slice():e],r?f.push(e):c(e)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!i}};return l}}(Zepto),function(t){function n(e){var i=[["resolve","done",t.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",t.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",t.Callbacks({memory:1})]],r="pending",o={state:function(){return r},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var e=arguments;return n(function(n){t.each(i,function(i,r){var a=t.isFunction(e[i])&&e[i];s[r[1]](function(){var e=a&&a.apply(this,arguments);if(e&&t.isFunction(e.promise))e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else{var i=this===o?n.promise():this,s=a?[e]:arguments;n[r[0]+"With"](i,s)}})}),e=null}).promise()},promise:function(e){return null!=e?t.extend(e,o):o}},s={};return t.each(i,function(t,e){var n=e[2],a=e[3];o[e[1]]=n.add,a&&n.add(function(){r=a},i[1^t][2].disable,i[2][2].lock),s[e[0]]=function(){return s[e[0]+"With"](this===s?o:this,arguments),this},s[e[0]+"With"]=n.fireWith}),o.promise(s),e&&e.call(s,s),s}var e=Array.prototype.slice;t.when=function(i){var f,c,l,r=e.call(arguments),o=r.length,s=0,a=1!==o||i&&t.isFunction(i.promise)?o:0,u=1===a?i:n(),h=function(t,n,i){return function(r){n[t]=this,i[t]=arguments.length>1?e.call(arguments):r,i===f?u.notifyWith(n,i):--a||u.resolveWith(n,i)}};if(o>1)for(f=new Array(o),c=new Array(o),l=new Array(o);o>s;++s)r[s]&&t.isFunction(r[s].promise)?r[s].promise().done(h(s,l,r)).fail(u.reject).progress(h(s,c,f)):--a;return a||u.resolveWith(l,r),u.promise()},t.Deferred=n}(Zepto),function(t){function u(t,e,n,i){return Math.abs(t-e)>=Math.abs(n-i)?t-e>0?"Left":"Right":n-i>0?"Up":"Down"}function f(){o=null,e.last&&(e.el.trigger("longTap"),e={})}function c(){o&&clearTimeout(o),o=null}function l(){n&&clearTimeout(n),i&&clearTimeout(i),r&&clearTimeout(r),o&&clearTimeout(o),n=i=r=o=null,e={}}function h(t){return("touch"==t.pointerType||t.pointerType==t.MSPOINTER_TYPE_TOUCH)&&t.isPrimary}function p(t,e){return t.type=="pointer"+e||t.type.toLowerCase()=="mspointer"+e}var n,i,r,o,a,e={},s=750;t(document).ready(function(){var d,m,y,w,g=0,v=0;"MSGesture"in window&&(a=new MSGesture,a.target=document.body),t(document).bind("MSGestureEnd",function(t){var n=t.velocityX>1?"Right":t.velocityX<-1?"Left":t.velocityY>1?"Down":t.velocityY<-1?"Up":null;n&&(e.el.trigger("swipe"),e.el.trigger("swipe"+n))}).on("touchstart MSPointerDown pointerdown",function(i){(!(w=p(i,"down"))||h(i))&&(y=w?i:i.touches[0],i.touches&&1===i.touches.length&&e.x2&&(e.x2=void 0,e.y2=void 0),d=Date.now(),m=d-(e.last||d),e.el=t("tagName"in y.target?y.target:y.target.parentNode),n&&clearTimeout(n),e.x1=y.pageX,e.y1=y.pageY,m>0&&250>=m&&(e.isDoubleTap=!0),e.last=d,o=setTimeout(f,s),a&&w&&a.addPointer(i.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){(!(w=p(t,"move"))||h(t))&&(y=w?t:t.touches[0],c(),e.x2=y.pageX,e.y2=y.pageY,g+=Math.abs(e.x1-e.x2),v+=Math.abs(e.y1-e.y2))}).on("touchend MSPointerUp pointerup",function(o){(!(w=p(o,"up"))||h(o))&&(c(),e.x2&&Math.abs(e.x1-e.x2)>30||e.y2&&Math.abs(e.y1-e.y2)>30?r=setTimeout(function(){e.el.trigger("swipe"),e.el.trigger("swipe"+u(e.x1,e.x2,e.y1,e.y2)),e={}},0):"last"in e&&(30>g&&30>v?i=setTimeout(function(){var i=t.Event("tap");i.cancelTouch=l,e.el.trigger(i),e.isDoubleTap?(e.el&&e.el.trigger("doubleTap"),e={}):n=setTimeout(function(){n=null,e.el&&e.el.trigger("singleTap"),e={}},250)},0):e={}),g=v=0)}).on("touchcancel MSPointerCancel pointercancel",l),t(window).on("scroll",l)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(t){return this.on(e,t)}})}(Zepto),function(t){function r(e){return e=t(e),!(!e.width()&&!e.height())&&"none"!==e.css("display")}function f(t,e){t=t.replace(/=#\]/g,'="#"]');var n,i,r=s.exec(t);if(r&&r[2]in o&&(n=o[r[2]],i=r[3],t=r[1],i)){var a=Number(i);i=isNaN(a)?i.replace(/^["']|["']$/g,""):a}return e(t,n,i)}var e=t.zepto,n=e.qsa,i=e.matches,o=t.expr[":"]={visible:function(){return r(this)?this:void 0},hidden:function(){return r(this)?void 0:this},selected:function(){return this.selected?this:void 0},checked:function(){return this.checked?this:void 0},parent:function(){return this.parentNode},first:function(t){return 0===t?this:void 0},last:function(t,e){return t===e.length-1?this:void 0},eq:function(t,e,n){return t===n?this:void 0},contains:function(e,n,i){return t(this).text().indexOf(i)>-1?this:void 0},has:function(t,n,i){return e.qsa(this,i).length?this:void 0}},s=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),a=/^\s*>/,u="Zepto"+ +new Date;e.qsa=function(i,r){return f(r,function(o,s,f){try{var c;!o&&s?o="*":a.test(o)&&(c=t(i).addClass(u),o="."+u+" "+o);var l=n(i,o)}catch(h){throw console.error("error performing selector: %o",r),h}finally{c&&c.removeClass(u)}return s?e.uniq(t.map(l,function(t,e){return s.call(t,e,l,f)})):l})},e.matches=function(t,e){return f(e,function(e,n,r){return!(e&&!i(t,e)||n&&n.call(t,null,r)!==t)})}}(Zepto),function(){try{getComputedStyle(void 0)}catch(t){var e=getComputedStyle;window.getComputedStyle=function(t){try{return e(t)}catch(n){return null}}}}();
module.exports = Zepto;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL21haW4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vhc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vjb3B5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2gua2V5cy9ub2RlX21vZHVsZXMvbG9kYXNoLmlzYXJndW1lbnRzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2FycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc25hdGl2ZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2NyZWF0ZWFzc2lnbmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlYXNzaWduZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmluZGNhbGxiYWNrL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlYXNzaWduZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC5faXNpdGVyYXRlZWNhbGwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWNhbGxiYWNrL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VjYWxsYmFjay9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZmluZC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlY2FsbGJhY2svbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc3R5cGVkYXJyYXkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWZpbmQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kaW5kZXgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm9uY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm9uY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC5iZWZvcmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnJlc3VsdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gucmVzdWx0L25vZGVfbW9kdWxlcy9sb2Rhc2guaXNmdW5jdGlvbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaW5kZXhvZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9jYWNoZWluZGV4b2YvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZXVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlY2FjaGUvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvanN0LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3N0eWxlci5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvYmFzZS91dGlscy5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb250YWluZXIvY29udGFpbmVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lcl9mYWN0b3J5L2NvbnRhaW5lcl9mYWN0b3J5LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lcl9mYWN0b3J5L2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvcmUvY29yZS5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb3JlX2ZhY3RvcnkvY29yZV9mYWN0b3J5LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvcmVfZmFjdG9yeS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9sb2FkZXIvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9tZWRpYV9jb250cm9sL21lZGlhX2NvbnRyb2wuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvcGxheWVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL3NlZWtfdGltZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9zZWVrX3RpbWUvc2Vla190aW1lLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvZmxhc2gvZmxhc2guanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9obHMvaGxzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfYXVkaW8vaHRtbDVfYXVkaW8uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9odG1sNV92aWRlby9odG1sNV92aWRlby5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWxfaW1nL2h0bWxfaW1nLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3Mvbm9fb3AvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9ub19vcC9ub19vcC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9jbGlja190b19wYXVzZS9jbGlja190b19wYXVzZS5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9jbGlja190b19wYXVzZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9kdnJfY29udHJvbHMvZHZyX2NvbnRyb2xzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL2R2cl9jb250cm9scy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9nb29nbGVfYW5hbHl0aWNzL2dvb2dsZV9hbmFseXRpY3MuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvZ29vZ2xlX2FuYWx5dGljcy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9sb2cvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvbG9nL2xvZy5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9wb3N0ZXIvcG9zdGVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3NwaW5uZXJfdGhyZWVfYm91bmNlL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3NwaW5uZXJfdGhyZWVfYm91bmNlL3NwaW5uZXJfdGhyZWVfYm91bmNlLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3N0YXRzL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3N0YXRzL3N0YXRzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3dhdGVybWFyay9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy93YXRlcm1hcmsvd2F0ZXJtYXJrLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL2Jhc2Vfb2JqZWN0LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2Jyb3dzZXIuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvY29udGFpbmVyX3BsdWdpbi5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb250YWluZXIvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvY29yZV9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvY29yZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvYmFzZS9ldmVudHMuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9mbGFzaC9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2hscy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWw1X2F1ZGlvL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfdmlkZW8vaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9odG1sX2ltZy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvYmFzZS9raWJvLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL21lZGlhX2NvbnRyb2wvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvbWVkaWF0b3IuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvcGxheWJhY2suanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvcGxheWVyX2luZm8uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvcG9zdGVyL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3RlbXBsYXRlLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3VpX2NvbnRhaW5lcl9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvdWlfY29yZV9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvdWlfb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NsYXBwci16ZXB0by96ZXB0by5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNJQSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUMzQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtBQUMvQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7O0FBRXJDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBOztBQUVwQixNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQTtBQUN0RSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUE7O0FBRXJDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQTs7O0FDYjlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDO01BQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNO01BQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7TUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztNQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDM0UsVUFBUSxJQUFJLENBQUMsTUFBTTtBQUNqQixTQUFLLENBQUM7QUFBRSxhQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxBQUFDLE9BQU07QUFBQSxBQUN0RSxTQUFLLENBQUM7QUFBRSxhQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQUFBQyxPQUFNO0FBQUEsQUFDMUUsU0FBSyxDQUFDO0FBQUUsYUFBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxBQUFDLE9BQU07QUFBQSxBQUM5RSxTQUFLLENBQUM7QUFBRSxhQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxBQUFDLE9BQU07QUFBQSxBQUNsRjtBQUFTLGFBQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMs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QUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTTtBQUM3QyxJQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRztBQUN4RixJQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHO0FBQ3hPLEtBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FB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LENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQTs7O0FDcEZ6QjtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3BsYXllcicpXG52YXIgTWVkaWF0b3IgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWVkaWF0b3InKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4vYmFzZS9ldmVudHMnKVxuXG53aW5kb3cuREVCVUcgPSBmYWxzZVxuXG53aW5kb3cuQ2xhcHByID0geyBQbGF5ZXI6IFBsYXllciwgTWVkaWF0b3I6IE1lZGlhdG9yLCBFdmVudHM6IEV2ZW50cyB9XG53aW5kb3cuQ2xhcHByLnZlcnNpb24gPSBcIl9fVkVSU0lPTl9fXCJcblxubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuQ2xhcHByXG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VBc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2Vhc3NpZ24nKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJ2xvZGFzaC5fY3JlYXRlYXNzaWduZXInKTtcblxuLyoqXG4gKiBBc3NpZ25zIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKSB0byB0aGUgZGVzdGluYXRpb25cbiAqIG9iamVjdC4gU3Vic2VxdWVudCBzb3VyY2VzIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLlxuICogSWYgYGN1c3RvbWl6ZXJgIGlzIHByb3ZpZGVkIGl0IGlzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgYXNzaWduZWQgdmFsdWVzLlxuICogVGhlIGBjdXN0b21pemVyYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCBmaXZlIGFyZ3VtZW50cztcbiAqIChvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgZXh0ZW5kXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGN1c3RvbWl6ZXJgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5hc3NpZ24oeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDQwIH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIGRlZmF1bHRzID0gXy5wYXJ0aWFsUmlnaHQoXy5hc3NpZ24sIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICogICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnID8gb3RoZXIgOiB2YWx1ZTtcbiAqIH0pO1xuICpcbiAqIGRlZmF1bHRzKHsgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICdhZ2UnOiAzNiB9LCB7ICd1c2VyJzogJ2ZyZWQnIH0pO1xuICogLy8gPT4geyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfVxuICovXG52YXIgYXNzaWduID0gY3JlYXRlQXNzaWduZXIoYmFzZUFzc2lnbik7XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlQ29weSA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWNvcHknKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnbG9kYXNoLmtleXMnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5hc3NpZ25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmcsXG4gKiBtdWx0aXBsZSBzb3VyY2VzLCBhbmQgYHRoaXNgIGJpbmRpbmcgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmluZyB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ24ob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIHByb3BzID0ga2V5cyhzb3VyY2UpO1xuICBpZiAoIWN1c3RvbWl6ZXIpIHtcbiAgICByZXR1cm4gYmFzZUNvcHkoc291cmNlLCBvYmplY3QsIHByb3BzKTtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF0sXG4gICAgICAgIHZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIodmFsdWUsIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKTtcblxuICAgIGlmICgocmVzdWx0ID09PSByZXN1bHQgPyAocmVzdWx0ICE9PSB2YWx1ZSkgOiAodmFsdWUgPT09IHZhbHVlKSkgfHxcbiAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJyAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFzc2lnbjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ29waWVzIHRoZSBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gY29weS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDb3B5KHNvdXJjZSwgb2JqZWN0LCBwcm9wcykge1xuICBpZiAoIXByb3BzKSB7XG4gICAgcHJvcHMgPSBvYmplY3Q7XG4gICAgb2JqZWN0ID0ge307XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIG9iamVjdFtrZXldID0gc291cmNlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29weTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC40IChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCdsb2Rhc2guaXNhcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJ2xvZGFzaC5pc25hdGl2ZScpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBpc05hdGl2ZShuYXRpdmVLZXlzID0gT2JqZWN0LmtleXMpICYmIG5hdGl2ZUtleXM7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBBbiBvYmplY3QgZW52aXJvbm1lbnQgZmVhdHVyZSBmbGFncy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUgT2JqZWN0XG4gKi9cbnZhciBzdXBwb3J0ID0ge307XG5cbihmdW5jdGlvbih4KSB7XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiBgYXJndW1lbnRzYCBvYmplY3QgaW5kZXhlcyBhcmUgbm9uLWVudW1lcmFibGUuXG4gICAqXG4gICAqIEluIEZpcmVmb3ggPCA0LCBJRSA8IDksIFBoYW50b21KUywgYW5kIFNhZmFyaSA8IDUuMSBgYXJndW1lbnRzYCBvYmplY3RcbiAgICogaW5kZXhlcyBhcmUgbm9uLWVudW1lcmFibGUuIENocm9tZSA8IDI1IGFuZCBOb2RlLmpzIDwgMC4xMS4wIHRyZWF0XG4gICAqIGBhcmd1bWVudHNgIG9iamVjdCBpbmRleGVzIGFzIG5vbi1lbnVtZXJhYmxlIGFuZCBmYWlsIGBoYXNPd25Qcm9wZXJ0eWBcbiAgICogY2hlY2tzIGZvciBpbmRleGVzIHRoYXQgZXhjZWVkIHRoZWlyIGZ1bmN0aW9uJ3MgZm9ybWFsIHBhcmFtZXRlcnMgd2l0aFxuICAgKiBhc3NvY2lhdGVkIHZhbHVlcyBvZiBgMGAuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnN1cHBvcnRcbiAgICogQHR5cGUgYm9vbGVhblxuICAgKi9cbiAgdHJ5IHtcbiAgICBzdXBwb3J0Lm5vbkVudW1BcmdzID0gIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgc3VwcG9ydC5ub25FbnVtQXJncyA9IHRydWU7XG4gIH1cbn0oMCwgMCkpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICt2YWx1ZTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIEVTIGBUb0xlbmd0aGAuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIEEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24gb2YgYE9iamVjdC5rZXlzYCB3aGljaCBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZVxuICogb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gIHZhciBwcm9wcyA9IGtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBwcm9wc0xlbmd0aCAmJiBvYmplY3QubGVuZ3RoO1xuXG4gIHZhciBhbGxvd0luZGV4ZXMgPSBsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgKHN1cHBvcnQubm9uRW51bUFyZ3MgJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogKipOb3RlOioqIFNlZSB0aGUgW0VTNSBzcGVjXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKHZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG52YXIga2V5cyA9ICFuYXRpdmVLZXlzID8gc2hpbUtleXMgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCkge1xuICAgIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICB9XG4gIGlmICgodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0KSB8fFxuICAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIGxlbmd0aCA9IChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgKHN1cHBvcnQubm9uRW51bUFyZ3MgJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogKGZ1bmN0aW9uKCkgeyByZXR1cm4gXy5pc0FyZ3VtZW50cyhhcmd1bWVudHMpOyB9KSgpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHZhciBsZW5ndGggPSBpc09iamVjdExpa2UodmFsdWUpID8gdmFsdWUubGVuZ3RoIDogdW5kZWZpbmVkO1xuICByZXR1cm4gKGlzTGVuZ3RoKGxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZykgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzLlxuICogU2VlIHRoaXMgW2FydGljbGUgb24gYFJlZ0V4cGAgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBpc05hdGl2ZShuYXRpdmVJc0FycmF5ID0gQXJyYXkuaXNBcnJheSkgJiYgbmF0aXZlSXNBcnJheTtcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogKGZ1bmN0aW9uKCkgeyByZXR1cm4gXy5pc0FycmF5KGFyZ3VtZW50cyk7IH0pKCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWcpIHx8IGZhbHNlO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIHJlSG9zdEN0b3IudGVzdCh2YWx1ZSkpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIiwgXCIqXCIsXG4gKiBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOi8vbG9kYXNoXFwuY29tL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzLlxuICogU2VlIHRoaXMgW2FydGljbGUgb24gYFJlZ0V4cGAgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVIb3N0Q3Rvci50ZXN0KHZhbHVlKSkgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXFxcIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLCBcIipcIixcbiAqIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6Ly9sb2Rhc2hcXC5jb20vXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2JpbmRjYWxsYmFjaycpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnbG9kYXNoLl9pc2l0ZXJhdGVlY2FsbCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGFzc2lnbnMgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIGEgZ2l2ZW5cbiAqIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBsZW5ndGggPSBhcmdzLmxlbmd0aCxcbiAgICAgICAgb2JqZWN0ID0gYXJnc1swXTtcblxuICAgIGlmIChsZW5ndGggPCAyIHx8IG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICB2YXIgY3VzdG9taXplciA9IGFyZ3NbbGVuZ3RoIC0gMl0sXG4gICAgICAgIHRoaXNBcmcgPSBhcmdzW2xlbmd0aCAtIDFdLFxuICAgICAgICBndWFyZCA9IGFyZ3NbM107XG5cbiAgICBpZiAobGVuZ3RoID4gMyAmJiB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjdXN0b21pemVyID0gYmluZENhbGxiYWNrKGN1c3RvbWl6ZXIsIHRoaXNBcmcsIDUpO1xuICAgICAgbGVuZ3RoIC09IDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSAobGVuZ3RoID4gMiAmJiB0eXBlb2YgdGhpc0FyZyA9PSAnZnVuY3Rpb24nKSA/IHRoaXNBcmcgOiBudWxsO1xuICAgICAgbGVuZ3RoIC09IChjdXN0b21pemVyID8gMSA6IDApO1xuICAgIH1cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoYXJnc1sxXSwgYXJnc1syXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoID09IDMgPyBudWxsIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDI7XG4gICAgfVxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmdzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0eXBlb2YgdGhpc0FyZyA9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jO1xuICB9XG4gIHN3aXRjaCAoYXJnQ291bnQpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHByb3ZpZGVkIHRvIGl0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuNCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gK3ZhbHVlO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgcHJvdmlkZWQgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJykge1xuICAgIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoLFxuICAgICAgICBwcmVyZXEgPSBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoaW5kZXgsIGxlbmd0aCk7XG4gIH0gZWxzZSB7XG4gICAgcHJlcmVxID0gdHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3Q7XG4gIH1cbiAgaWYgKHByZXJlcSkge1xuICAgIHZhciBvdGhlciA9IG9iamVjdFtpbmRleF07XG4gICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/ICh2YWx1ZSA9PT0gb3RoZXIpIDogKG90aGVyICE9PSBvdGhlcik7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gRVMgYFRvTGVuZ3RoYC4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIGxhbmd1YWdlIHR5cGUgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiAqKk5vdGU6KiogU2VlIHRoZSBbRVM1IHNwZWNdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAodmFsdWUgJiYgdHlwZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWNhbGxiYWNrJyksXG4gICAgYmFzZUVhY2ggPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VlYWNoJyksXG4gICAgYmFzZUZpbmQgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VmaW5kJyksXG4gICAgZmluZEluZGV4ID0gcmVxdWlyZSgnbG9kYXNoLmZpbmRpbmRleCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpO1xuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gLCByZXR1cm5pbmcgdGhlIGZpcnN0IGVsZW1lbnRcbiAqIGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvci4gVGhlIHByZWRpY2F0ZSBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kXG4gKiBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gKlxuICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ucHJvcGVydHlcIlxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogSWYgYW4gb2JqZWN0IGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ubWF0Y2hlc1wiIHN0eWxlXG4gKiBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlblxuICogb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBkZXRlY3RcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gc2VhcmNoLlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8c3RyaW5nfSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkXG4gKiAgcGVyIGl0ZXJhdGlvbi4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yIG9iamVjdCBpcyBwcm92aWRlZCBpdCBpcyB1c2VkIHRvXG4gKiAgY3JlYXRlIGEgXCJfLnByb3BlcnR5XCIgb3IgXCJfLm1hdGNoZXNcIiBzdHlsZSBjYWxsYmFjayByZXNwZWN0aXZlbHkuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYHByZWRpY2F0ZWAuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWF0Y2hlZCBlbGVtZW50LCBlbHNlIGB1bmRlZmluZWRgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IGZhbHNlIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IHRydWUgfSxcbiAqICAgeyAndXNlcic6ICdwZWJibGVzJywgJ2FnZSc6IDEsICAnYWN0aXZlJzogZmFsc2UgfVxuICogXTtcbiAqXG4gKiBfLnJlc3VsdChfLmZpbmQodXNlcnMsIGZ1bmN0aW9uKGNocikgeyByZXR1cm4gY2hyLmFnZSA8IDQwOyB9KSwgJ3VzZXInKTtcbiAqIC8vID0+ICdiYXJuZXknXG4gKlxuICogLy8gdXNpbmcgdGhlIFwiXy5tYXRjaGVzXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnJlc3VsdChfLmZpbmQodXNlcnMsIHsgJ2FnZSc6IDEgfSksICd1c2VyJyk7XG4gKiAvLyA9PiAncGViYmxlcydcbiAqXG4gKiAvLyB1c2luZyB0aGUgXCJfLnByb3BlcnR5XCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnJlc3VsdChfLmZpbmQodXNlcnMsICdhY3RpdmUnKSwgJ3VzZXInKTtcbiAqIC8vID0+ICdmcmVkJ1xuICovXG5mdW5jdGlvbiBmaW5kKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICBpZiAoaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgIHZhciBpbmRleCA9IGZpbmRJbmRleChjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIHRoaXNBcmcpO1xuICAgIHJldHVybiBpbmRleCA+IC0xID8gY29sbGVjdGlvbltpbmRleF0gOiB1bmRlZmluZWQ7XG4gIH1cbiAgcHJlZGljYXRlID0gYmFzZUNhbGxiYWNrKHByZWRpY2F0ZSwgdGhpc0FyZywgMyk7XG4gIHJldHVybiBiYXNlRmluZChjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIGJhc2VFYWNoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4xLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlSXNFcXVhbCA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWlzZXF1YWwnKSxcbiAgICBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2JpbmRjYWxsYmFjaycpLFxuICAgIGtleXMgPSByZXF1aXJlKCdsb2Rhc2gua2V5cycpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jYWxsYmFja2Agd2hpY2ggc3VwcG9ydHMgc3BlY2lmeWluZyB0aGVcbiAqIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gW2Z1bmM9Xy5pZGVudGl0eV0gVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBjYWxsYmFjay5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJhc2VDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBmdW5jO1xuICBpZiAodHlwZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgdGhpc0FyZyAhPSAndW5kZWZpbmVkJylcbiAgICAgID8gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KVxuICAgICAgOiBmdW5jO1xuICB9XG4gIGlmIChmdW5jID09IG51bGwpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gYmFzZU1hdGNoZXMoZnVuYyk7XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiB0aGlzQXJnID09ICd1bmRlZmluZWQnXG4gICAgPyBiYXNlUHJvcGVydHkoZnVuYyArICcnKVxuICAgIDogYmFzZU1hdGNoZXNQcm9wZXJ0eShmdW5jICsgJycsIHRoaXNBcmcpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTWF0Y2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgb3IgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHNvdXJjZSBwcm9wZXJ0eSBuYW1lcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgc291cmNlIHZhbHVlcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IHN0cmljdENvbXBhcmVGbGFncyBTdHJpY3QgY29tcGFyaXNvbiBmbGFncyBmb3Igc291cmNlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBvYmplY3RgIGlzIGEgbWF0Y2gsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTWF0Y2gob2JqZWN0LCBwcm9wcywgdmFsdWVzLCBzdHJpY3RDb21wYXJlRmxhZ3MsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuICFsZW5ndGg7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBub0N1c3RvbWl6ZXIgPSAhY3VzdG9taXplcjtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmICgobm9DdXN0b21pemVyICYmIHN0cmljdENvbXBhcmVGbGFnc1tpbmRleF0pXG4gICAgICAgICAgPyB2YWx1ZXNbaW5kZXhdICE9PSBvYmplY3RbcHJvcHNbaW5kZXhdXVxuICAgICAgICAgIDogIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wc1tpbmRleF0pXG4gICAgICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBpbmRleCA9IC0xO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBzdHJpY3RDb21wYXJlRmxhZ3NbaW5kZXhdKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIHNyY1ZhbHVlID0gdmFsdWVzW2luZGV4XTtcblxuICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXkpIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmVzdWx0ID0gYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCBjdXN0b21pemVyLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc2Agd2hpY2ggZG9lcyBub3QgY2xvbmUgYHNvdXJjZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gIHZhciBwcm9wcyA9IGtleXMoc291cmNlKSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICBpZiAobGVuZ3RoID09IDEpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbMF0sXG4gICAgICAgIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICBpZiAoaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgb2JqZWN0W2tleV0gPT09IHZhbHVlICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgdmFyIHZhbHVlcyA9IEFycmF5KGxlbmd0aCksXG4gICAgICBzdHJpY3RDb21wYXJlRmxhZ3MgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhbHVlID0gc291cmNlW3Byb3BzW2xlbmd0aF1dO1xuICAgIHZhbHVlc1tsZW5ndGhdID0gdmFsdWU7XG4gICAgc3RyaWN0Q29tcGFyZUZsYWdzW2xlbmd0aF0gPSBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gYmFzZUlzTWF0Y2gob2JqZWN0LCBwcm9wcywgdmFsdWVzLCBzdHJpY3RDb21wYXJlRmxhZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNQcm9wZXJ0eWAgd2hpY2ggZG9lcyBub3QgY29lcmNlIGBrZXlgXG4gKiB0byBhIHN0cmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzUHJvcGVydHkoa2V5LCB2YWx1ZSkge1xuICBpZiAoaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBvYmplY3Rba2V5XSA9PT0gdmFsdWU7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGJhc2VJc0VxdWFsKHZhbHVlLCBvYmplY3Rba2V5XSwgbnVsbCwgdHJ1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdoaWNoIGRvZXMgbm90IGNvZXJjZSBga2V5YCB0byBhIHN0cmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpZiBzdWl0YWJsZSBmb3Igc3RyaWN0XG4gKiAgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgJiYgKHZhbHVlID09PSAwID8gKCgxIC8gdmFsdWUpID4gMCkgOiAhaXNPYmplY3QodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqIF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNhbGxiYWNrO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXN0eXBlZGFycmF5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYHRoaXNgIGJpbmRpbmdcbiAqIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzV2hlcmVdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3IgaWRlbnRpY2FsIHZhbHVlcy5cbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIC8vIFRyZWF0IGArMGAgdnMuIGAtMGAgYXMgbm90IGVxdWFsLlxuICAgIHJldHVybiB2YWx1ZSAhPT0gMCB8fCAoMSAvIHZhbHVlID09IDEgLyBvdGhlcik7XG4gIH1cbiAgdmFyIHZhbFR5cGUgPSB0eXBlb2YgdmFsdWUsXG4gICAgICBvdGhUeXBlID0gdHlwZW9mIG90aGVyO1xuXG4gIC8vIEV4aXQgZWFybHkgZm9yIHVubGlrZSBwcmltaXRpdmUgdmFsdWVzLlxuICBpZiAoKHZhbFR5cGUgIT0gJ2Z1bmN0aW9uJyAmJiB2YWxUeXBlICE9ICdvYmplY3QnICYmIG90aFR5cGUgIT0gJ2Z1bmN0aW9uJyAmJiBvdGhUeXBlICE9ICdvYmplY3QnKSB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsKSB7XG4gICAgLy8gUmV0dXJuIGBmYWxzZWAgdW5sZXNzIGJvdGggdmFsdWVzIGFyZSBgTmFOYC5cbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYmFzZUlzRXF1YWwsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgb2JqZWN0cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzV2hlcmVdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICBvdGhUYWcgPSBhcnJheVRhZztcblxuICBpZiAoIW9iaklzQXJyKSB7XG4gICAgb2JqVGFnID0gb2JqVG9TdHJpbmcuY2FsbChvYmplY3QpO1xuICAgIGlmIChvYmpUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb2JqVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob2JqVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb2JqSXNBcnIgPSBpc1R5cGVkQXJyYXkob2JqZWN0KTtcbiAgICB9XG4gIH1cbiAgaWYgKCFvdGhJc0Fycikge1xuICAgIG90aFRhZyA9IG9ialRvU3RyaW5nLmNhbGwob3RoZXIpO1xuICAgIGlmIChvdGhUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb3RoVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob3RoVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb3RoSXNBcnIgPSBpc1R5cGVkQXJyYXkob3RoZXIpO1xuICAgIH1cbiAgfVxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmICEob2JqSXNBcnIgfHwgb2JqSXNPYmopKSB7XG4gICAgcmV0dXJuIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnKTtcbiAgfVxuICB2YXIgdmFsV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgIG90aFdyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICBpZiAodmFsV3JhcHBlZCB8fCBvdGhXcmFwcGVkKSB7XG4gICAgcmV0dXJuIGVxdWFsRnVuYyh2YWxXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsIG90aFdyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXIsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIC8vIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIGRldGVjdGluZyBjaXJjdWxhciByZWZlcmVuY2VzIHNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI0pPLlxuICBzdGFja0EgfHwgKHN0YWNrQSA9IFtdKTtcbiAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG5cbiAgdmFyIGxlbmd0aCA9IHN0YWNrQS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChzdGFja0FbbGVuZ3RoXSA9PSBvYmplY3QpIHtcbiAgICAgIHJldHVybiBzdGFja0JbbGVuZ3RoXSA9PSBvdGhlcjtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIGBvYmplY3RgIGFuZCBgb3RoZXJgIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgc3RhY2tBLnB1c2gob2JqZWN0KTtcbiAgc3RhY2tCLnB1c2gob3RoZXIpO1xuXG4gIHZhciByZXN1bHQgPSAob2JqSXNBcnIgPyBlcXVhbEFycmF5cyA6IGVxdWFsT2JqZWN0cykob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQik7XG5cbiAgc3RhY2tBLnBvcCgpO1xuICBzdGFja0IucG9wKCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgYXJyYXlzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNXaGVyZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gdHJ1ZTtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzV2hlcmUgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBEZWVwIGNvbXBhcmUgdGhlIGNvbnRlbnRzLCBpZ25vcmluZyBub24tbnVtZXJpYyBwcm9wZXJ0aWVzLlxuICB3aGlsZSAocmVzdWx0ICYmICsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdO1xuXG4gICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICByZXN1bHQgPSBpc1doZXJlXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4KVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgaWYgKGlzV2hlcmUpIHtcbiAgICAgICAgdmFyIG90aEluZGV4ID0gb3RoTGVuZ3RoO1xuICAgICAgICB3aGlsZSAob3RoSW5kZXgtLSkge1xuICAgICAgICAgIG90aFZhbHVlID0gb3RoZXJbb3RoSW5kZXhdO1xuICAgICAgICAgIHJlc3VsdCA9IChhcnJWYWx1ZSAmJiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IChhcnJWYWx1ZSAmJiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuICEhcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIC8vIENvZXJjZSBkYXRlcyBhbmQgYm9vbGVhbnMgdG8gbnVtYmVycywgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzIGFuZCBib29sZWFuc1xuICAgICAgLy8gdG8gYDFgIG9yIGAwYCB0cmVhdGluZyBpbnZhbGlkIGRhdGVzIGNvZXJjZWQgdG8gYE5hTmAgYXMgbm90IGVxdWFsLlxuICAgICAgcmV0dXJuICtvYmplY3QgPT0gK290aGVyO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIFRyZWF0IGBOYU5gIHZzLiBgTmFOYCBhcyBlcXVhbC5cbiAgICAgIHJldHVybiAob2JqZWN0ICE9ICtvYmplY3QpXG4gICAgICAgID8gb3RoZXIgIT0gK290aGVyXG4gICAgICAgIC8vIEJ1dCwgdHJlYXQgYC0wYCB2cy4gYCswYCBhcyBub3QgZXF1YWwuXG4gICAgICAgIDogKG9iamVjdCA9PSAwID8gKCgxIC8gb2JqZWN0KSA9PSAoMSAvIG90aGVyKSkgOiBvYmplY3QgPT0gK290aGVyKTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncyBwcmltaXRpdmVzIGFuZCBzdHJpbmdcbiAgICAgIC8vIG9iamVjdHMgYXMgZXF1YWwuIFNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI3gxNS4xMC42LjQgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNXaGVyZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBvYmpQcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgIG90aFByb3BzID0ga2V5cyhvdGhlciksXG4gICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzV2hlcmUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGhhc0N0b3IsXG4gICAgICBpbmRleCA9IC0xO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XSxcbiAgICAgICAgcmVzdWx0ID0gaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KTtcblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgcmVzdWx0ID0gaXNXaGVyZVxuICAgICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSlcbiAgICAgICAgICA6IGN1c3RvbWl6ZXIob2JqVmFsdWUsIG90aFZhbHVlLCBrZXkpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgIHJlc3VsdCA9IChvYmpWYWx1ZSAmJiBvYmpWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaGFzQ3RvciB8fCAoaGFzQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAoIWhhc0N0b3IpIHtcbiAgICB2YXIgb2JqQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgaWYgKG9iakN0b3IgIT0gb3RoQ3RvciAmJlxuICAgICAgICAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmXG4gICAgICAgICAgdHlwZW9mIG90aEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvdGhDdG9yIGluc3RhbmNlb2Ygb3RoQ3RvcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRXF1YWw7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9XG50eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9IHR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiB0eXBlZEFycmF5VGFnc1tvYmpUb1N0cmluZy5jYWxsKHZhbHVlKV0pIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fHN0cmluZ30gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5sZW5ndGggOiAwO1xuICBpZiAoIWlzTGVuZ3RoKGxlbmd0aCkpIHtcbiAgICByZXR1cm4gYmFzZUZvck93bihjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpdGVyYWJsZSA9IHRvT2JqZWN0KGNvbGxlY3Rpb24pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29sbGVjdGlvbjtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0b3IgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGl0ZXJhYmxlID0gdG9PYmplY3Qob2JqZWN0KSxcbiAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIG9iamVjdCBpZiBpdCBpcyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID8gdmFsdWUgOiBPYmplY3QodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogKipOb3RlOioqIFNlZSB0aGUgW0VTNSBzcGVjXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKHZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VFYWNoO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kYCwgYF8uZmluZExhc3RgLCBgXy5maW5kS2V5YCwgYW5kIGBfLmZpbmRMYXN0S2V5YCxcbiAqIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2sgc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcsIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBjb2xsZWN0aW9uYCB1c2luZyB0aGUgcHJvdmlkZWQgYGVhY2hGdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBgY29sbGVjdGlvbmAuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXRLZXldIFNwZWNpZnkgcmV0dXJuaW5nIHRoZSBrZXkgb2YgdGhlIGZvdW5kIGVsZW1lbnRcbiAqICBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmb3VuZCBlbGVtZW50IG9yIGl0cyBrZXksIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgZWFjaEZ1bmMsIHJldEtleSkge1xuICB2YXIgcmVzdWx0O1xuICBlYWNoRnVuYyhjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSkge1xuICAgICAgcmVzdWx0ID0gcmV0S2V5ID8ga2V5IDogdmFsdWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRmluZDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUNhbGxiYWNrID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlY2FsbGJhY2snKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmZpbmRgIGV4Y2VwdCB0aGF0IGl0IHJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdFxuICogZWxlbWVudCBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IsIGluc3RlYWQgb2YgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICpcbiAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLnByb3BlcnR5XCJcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIElmIGFuIG9iamVjdCBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLm1hdGNoZXNcIiBzdHlsZVxuICogY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZ2l2ZW5cbiAqIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxzdHJpbmd9IFtwcmVkaWNhdGU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWRcbiAqICBwZXIgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHByb3ZpZGVkIGl0IGlzIHVzZWQgdG9cbiAqICBjcmVhdGUgYSBcIl8ucHJvcGVydHlcIiBvciBcIl8ubWF0Y2hlc1wiIHN0eWxlIGNhbGxiYWNrIHJlc3BlY3RpdmVseS5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgcHJlZGljYXRlYC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmb3VuZCBlbGVtZW50LCBlbHNlIGAtMWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAgJ2FnZSc6IDM2LCAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAgJ2FnZSc6IDQwLCAnYWN0aXZlJzogdHJ1ZSB9LFxuICogICB7ICd1c2VyJzogJ3BlYmJsZXMnLCAnYWdlJzogMSwgICdhY3RpdmUnOiBmYWxzZSB9XG4gKiBdO1xuICpcbiAqIF8uZmluZEluZGV4KHVzZXJzLCBmdW5jdGlvbihjaHIpIHsgcmV0dXJuIGNoci5hZ2UgPCA0MDsgfSk7XG4gKiAvLyA9PiAwXG4gKlxuICogLy8gdXNpbmcgdGhlIFwiXy5tYXRjaGVzXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLmZpbmRJbmRleCh1c2VycywgeyAnYWdlJzogMSB9KTtcbiAqIC8vID0+IDJcbiAqXG4gKiAvLyB1c2luZyB0aGUgXCJfLnByb3BlcnR5XCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLmZpbmRJbmRleCh1c2VycywgJ2FjdGl2ZScpO1xuICogLy8gPT4gMVxuICovXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICBwcmVkaWNhdGUgPSBiYXNlQ2FsbGJhY2socHJlZGljYXRlLCB0aGlzQXJnLCAzKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmluZEluZGV4O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiZWZvcmUgPSByZXF1aXJlKCdsb2Rhc2guYmVmb3JlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaXMgcmVzdHJpY3RlZCB0byBpbnZva2luZyBgZnVuY2Agb25jZS4gUmVwZWF0IGNhbGxzXG4gKiB0byB0aGUgZnVuY3Rpb24gcmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgY2FsbC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgY3JlYXRlZCBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUgRnVuY3Rpb25cbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyByZXN0cmljdGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgaW5pdGlhbGl6ZSA9IF8ub25jZShjcmVhdGVBcHBsaWNhdGlvbik7XG4gKiBpbml0aWFsaXplKCk7XG4gKiBpbml0aWFsaXplKCk7XG4gKiAvLyBgaW5pdGlhbGl6ZWAgaW52b2tlcyBgY3JlYXRlQXBwbGljYXRpb25gIG9uY2VcbiAqL1xuZnVuY3Rpb24gb25jZShmdW5jKSB7XG4gIHJldHVybiBiZWZvcmUoZnVuYywgMik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb25jZTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgLCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBhbmQgYXJndW1lbnRzXG4gKiBvZiB0aGUgY3JlYXRlZCBmdW5jdGlvbiwgd2hpbGUgaXQgaXMgY2FsbGVkIGxlc3MgdGhhbiBgbmAgdGltZXMuIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBjcmVhdGVkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgY2FsbHMgYXQgd2hpY2ggYGZ1bmNgIGlzIG5vIGxvbmdlciBpbnZva2VkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyByZXN0cmljdGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiBqUXVlcnkoJyNhZGQnKS5vbignY2xpY2snLCBfLmJlZm9yZSg1LCBhZGRDb250YWN0VG9MaXN0KSk7XG4gKiAvLyA9PiBhbGxvd3MgYWRkaW5nIHVwIHRvIDQgY29udGFjdHMgdG8gdGhlIGxpc3RcbiAqL1xuZnVuY3Rpb24gYmVmb3JlKG4sIGZ1bmMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIG4gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIHRlbXAgPSBuO1xuICAgICAgbiA9IGZ1bmM7XG4gICAgICBmdW5jID0gdGVtcDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKC0tbiA+IDApIHtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVuYyA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmVmb3JlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnbG9kYXNoLmlzZnVuY3Rpb24nKTtcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgdmFsdWUgb2YgcHJvcGVydHkgYGtleWAgb24gYG9iamVjdGAuIElmIHRoZSB2YWx1ZSBvZiBga2V5YCBpc1xuICogYSBmdW5jdGlvbiBpdCBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBvYmplY3RgIGFuZCBpdHMgcmVzdWx0XG4gKiBpcyByZXR1cm5lZCwgZWxzZSB0aGUgcHJvcGVydHkgdmFsdWUgaXMgcmV0dXJuZWQuIElmIHRoZSBwcm9wZXJ0eSB2YWx1ZSBpc1xuICogYHVuZGVmaW5lZGAgdGhlIGBkZWZhdWx0VmFsdWVgIGlzIHVzZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIHJlc29sdmUuXG4gKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBpZiB0aGUgcHJvcGVydHkgdmFsdWVcbiAqICByZXNvbHZlcyB0byBgdW5kZWZpbmVkYC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcsICdhZ2UnOiBfLmNvbnN0YW50KDQwKSB9O1xuICpcbiAqIF8ucmVzdWx0KG9iamVjdCwgJ3VzZXInKTtcbiAqIC8vID0+ICdmcmVkJ1xuICpcbiAqIF8ucmVzdWx0KG9iamVjdCwgJ2FnZScpO1xuICogLy8gPT4gNDBcbiAqXG4gKiBfLnJlc3VsdChvYmplY3QsICdzdGF0dXMnLCAnYnVzeScpO1xuICogLy8gPT4gJ2J1c3knXG4gKlxuICogXy5yZXN1bHQob2JqZWN0LCAnc3RhdHVzJywgXy5jb25zdGFudCgnYnVzeScpKTtcbiAqIC8vID0+ICdidXN5J1xuICovXG5mdW5jdGlvbiByZXN1bHQob2JqZWN0LCBrZXksIGRlZmF1bHRWYWx1ZSkge1xuICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gIH1cbiAgcmV0dXJuIGlzRnVuY3Rpb24odmFsdWUpID8gdmFsdWUuY2FsbChvYmplY3QpIDogdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdWx0O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzLlxuICogU2VlIHRoaXMgW2FydGljbGUgb24gYFJlZ0V4cGAgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0Z1bmN0aW9uYCB3aXRob3V0IHN1cHBvcnQgZm9yIGVudmlyb25tZW50c1xuICogd2l0aCBpbmNvcnJlY3QgYHR5cGVvZmAgcmVzdWx0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBBdm9pZCBhIENoYWtyYSBKSVQgYnVnIGluIGNvbXBhdGliaWxpdHkgbW9kZXMgb2YgSUUgMTEuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvaXNzdWVzLzE2MjEgZm9yIG1vcmUgZGV0YWlscy5cbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQgaXMgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZXNjYXBlUmVnRXhwKG9ialRvU3RyaW5nKVxuICAucmVwbGFjZSgvdG9TdHJpbmd8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgVWludDhBcnJheSA9IGlzTmF0aXZlKFVpbnQ4QXJyYXkgPSBnbG9iYWwuVWludDhBcnJheSkgJiYgVWludDhBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzRnVuY3Rpb24gPSAhKGJhc2VJc0Z1bmN0aW9uKC94LykgfHwgKFVpbnQ4QXJyYXkgJiYgIWJhc2VJc0Z1bmN0aW9uKFVpbnQ4QXJyYXkpKSkgPyBiYXNlSXNGdW5jdGlvbiA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaSB3aGljaCByZXR1cm4gJ2Z1bmN0aW9uJyBmb3IgcmVnZXhlc1xuICAvLyBhbmQgU2FmYXJpIDggZXF1aXZhbGVudHMgd2hpY2ggcmV0dXJuICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvcnMuXG4gIHJldHVybiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIHJlSG9zdEN0b3IudGVzdCh2YWx1ZSkpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIiwgXCIqXCIsXG4gKiBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOi8vbG9kYXNoXFwuY29tL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VjYWxsYmFjaycpLFxuICAgIGJhc2VVbmlxID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNldW5pcScpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnbG9kYXNoLl9pc2l0ZXJhdGVlY2FsbCcpO1xuXG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuaXFgIG9wdGltaXplZCBmb3Igc29ydGVkIGFycmF5cyB3aXRob3V0IHN1cHBvcnRcbiAqIGZvciBjYWxsYmFjayBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUtdmFsdWUtZnJlZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gc29ydGVkVW5pcShhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIHNlZW4sXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzSW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBhcnJheSkgOiB2YWx1ZTtcblxuICAgIGlmICghaW5kZXggfHwgc2VlbiAhPT0gY29tcHV0ZWQpIHtcbiAgICAgIHNlZW4gPSBjb21wdXRlZDtcbiAgICAgIHJlc3VsdFsrK3Jlc0luZGV4XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBkdXBsaWNhdGUtdmFsdWUtZnJlZSB2ZXJzaW9uIG9mIGFuIGFycmF5IHVzaW5nIGBTYW1lVmFsdWVaZXJvYFxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLiBQcm92aWRpbmcgYHRydWVgIGZvciBgaXNTb3J0ZWRgIHBlcmZvcm1zIGEgZmFzdGVyXG4gKiBzZWFyY2ggYWxnb3JpdGhtIGZvciBzb3J0ZWQgYXJyYXlzLiBJZiBhbiBpdGVyYXRlZSBmdW5jdGlvbiBpcyBwcm92aWRlZCBpdFxuICogaXMgaW52b2tlZCBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgYXJyYXkgdG8gZ2VuZXJhdGUgdGhlIGNyaXRlcmlvbiBieSB3aGljaFxuICogdW5pcXVlbmVzcyBpcyBjb21wdXRlZC4gVGhlIGBpdGVyYXRlZWAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkXG4gKiB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleCwgYXJyYXkpLlxuICpcbiAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLnByb3BlcnR5XCJcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIElmIGFuIG9iamVjdCBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLm1hdGNoZXNcIiBzdHlsZVxuICogY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZ2l2ZW5cbiAqIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBgU2FtZVZhbHVlWmVyb2AgY29tcGFyaXNvbnMgYXJlIGxpa2Ugc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLFxuICogZS5nLiBgPT09YCwgZXhjZXB0IHRoYXQgYE5hTmAgbWF0Y2hlcyBgTmFOYC4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIHVuaXF1ZVxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzU29ydGVkXSBTcGVjaWZ5IHRoZSBhcnJheSBpcyBzb3J0ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxzdHJpbmd9IFtpdGVyYXRlZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqICBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHByb3ZpZGVkIGl0IGlzIHVzZWQgdG8gY3JlYXRlIGEgXCJfLnByb3BlcnR5XCJcbiAqICBvciBcIl8ubWF0Y2hlc1wiIHN0eWxlIGNhbGxiYWNrIHJlc3BlY3RpdmVseS5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgaXRlcmF0ZWVgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlLXZhbHVlLWZyZWUgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udW5pcShbMSwgMiwgMV0pO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gdXNpbmcgYGlzU29ydGVkYFxuICogXy51bmlxKFsxLCAxLCAyXSwgdHJ1ZSk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyB1c2luZyBhbiBpdGVyYXRlZSBmdW5jdGlvblxuICogXy51bmlxKFsxLCAyLjUsIDEuNSwgMl0sIGZ1bmN0aW9uKG4pIHsgcmV0dXJuIHRoaXMuZmxvb3Iobik7IH0sIE1hdGgpO1xuICogLy8gPT4gWzEsIDIuNV1cbiAqXG4gKiAvLyB1c2luZyB0aGUgXCJfLnByb3BlcnR5XCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnVuaXEoW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH0sIHsgJ3gnOiAxIH1dLCAneCcpO1xuICogLy8gPT4gW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH1dXG4gKi9cbmZ1bmN0aW9uIHVuaXEoYXJyYXksIGlzU29ydGVkLCBpdGVyYXRlZSwgdGhpc0FyZykge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICBpZiAoIWxlbmd0aCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICAvLyBKdWdnbGUgYXJndW1lbnRzLlxuICBpZiAodHlwZW9mIGlzU29ydGVkICE9ICdib29sZWFuJyAmJiBpc1NvcnRlZCAhPSBudWxsKSB7XG4gICAgdGhpc0FyZyA9IGl0ZXJhdGVlO1xuICAgIGl0ZXJhdGVlID0gaXNJdGVyYXRlZUNhbGwoYXJyYXksIGlzU29ydGVkLCB0aGlzQXJnKSA/IG51bGwgOiBpc1NvcnRlZDtcbiAgICBpc1NvcnRlZCA9IGZhbHNlO1xuICB9XG4gIGl0ZXJhdGVlID0gaXRlcmF0ZWUgPT0gbnVsbCA/IGl0ZXJhdGVlIDogYmFzZUNhbGxiYWNrKGl0ZXJhdGVlLCB0aGlzQXJnLCAzKTtcbiAgcmV0dXJuIChpc1NvcnRlZClcbiAgICA/IHNvcnRlZFVuaXEoYXJyYXksIGl0ZXJhdGVlKVxuICAgIDogYmFzZVVuaXEoYXJyYXksIGl0ZXJhdGVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmlxO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlSW5kZXhPZiA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWluZGV4b2YnKSxcbiAgICBjYWNoZUluZGV4T2YgPSByZXF1aXJlKCdsb2Rhc2guX2NhY2hlaW5kZXhvZicpLFxuICAgIGNyZWF0ZUNhY2hlID0gcmVxdWlyZSgnbG9kYXNoLl9jcmVhdGVjYWNoZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuaXFgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2sgc2hvcnRoYW5kc1xuICogYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZS12YWx1ZS1mcmVlIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlVW5pcShhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmRleE9mID0gYmFzZUluZGV4T2YsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICBpc0xhcmdlID0gaXNDb21tb24gJiYgbGVuZ3RoID49IDIwMCxcbiAgICAgIHNlZW4gPSBpc0xhcmdlID8gY3JlYXRlQ2FjaGUoKSA6IG51bGwsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICBpZiAoc2Vlbikge1xuICAgIGluZGV4T2YgPSBjYWNoZUluZGV4T2Y7XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBpc0xhcmdlID0gZmFsc2U7XG4gICAgc2VlbiA9IGl0ZXJhdGVlID8gW10gOiByZXN1bHQ7XG4gIH1cbiAgb3V0ZXI6XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBhcnJheSkgOiB2YWx1ZTtcblxuICAgIGlmIChpc0NvbW1vbiAmJiB2YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgIHZhciBzZWVuSW5kZXggPSBzZWVuLmxlbmd0aDtcbiAgICAgIHdoaWxlIChzZWVuSW5kZXgtLSkge1xuICAgICAgICBpZiAoc2VlbltzZWVuSW5kZXhdID09PSBjb21wdXRlZCkge1xuICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaW5kZXhPZihzZWVuLCBjb21wdXRlZCwgMCkgPCAwKSB7XG4gICAgICBpZiAoaXRlcmF0ZWUgfHwgaXNMYXJnZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VVbmlxO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4xLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IHN1cHBvcnQgZm9yIGJpbmFyeSBzZWFyY2hlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIGlmICh2YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICByZXR1cm4gaW5kZXhPZk5hTihhcnJheSwgZnJvbUluZGV4KTtcbiAgfVxuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGBOYU5gIGlzIGZvdW5kIGluIGBhcnJheWAuXG4gKiBJZiBgZnJvbVJpZ2h0YCBpcyBwcm92aWRlZCBlbGVtZW50cyBvZiBgYXJyYXlgIGFyZSBpdGVyYXRlZCBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgYE5hTmAsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gaW5kZXhPZk5hTihhcnJheSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbUluZGV4ICsgKGZyb21SaWdodCA/IDAgOiAtMSk7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICB2YXIgb3RoZXIgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKG90aGVyICE9PSBvdGhlcikge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUluZGV4T2Y7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIGBjYWNoZWAgbWltaWNraW5nIHRoZSByZXR1cm4gc2lnbmF0dXJlIG9mXG4gKiBgXy5pbmRleE9mYCBieSByZXR1cm5pbmcgYDBgIGlmIHRoZSB2YWx1ZSBpcyBmb3VuZCwgZWxzZSBgLTFgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gY2FjaGUgVGhlIGNhY2hlIHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGAwYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlSW5kZXhPZihjYWNoZSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSBjYWNoZS5kYXRhLFxuICAgICAgcmVzdWx0ID0gKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc09iamVjdCh2YWx1ZSkpID8gZGF0YS5zZXQuaGFzKHZhbHVlKSA6IGRhdGEuaGFzaFt2YWx1ZV07XG5cbiAgcmV0dXJuIHJlc3VsdCA/IDAgOiAtMTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYWNoZUluZGV4T2Y7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzTmF0aXZlID0gcmVxdWlyZSgnbG9kYXNoLmlzbmF0aXZlJyk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgU2V0ID0gaXNOYXRpdmUoU2V0ID0gZ2xvYmFsLlNldCkgJiYgU2V0O1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUNyZWF0ZSA9IGlzTmF0aXZlKG5hdGl2ZUNyZWF0ZSA9IE9iamVjdC5jcmVhdGUpICYmIG5hdGl2ZUNyZWF0ZTtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhIGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuZGF0YSA9IHsgJ2hhc2gnOiBuYXRpdmVDcmVhdGUobnVsbCksICdzZXQnOiBuZXcgU2V0IH07XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHRoaXMucHVzaCh2YWx1ZXNbbGVuZ3RoXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBwdXNoXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBjYWNoZVB1c2godmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNPYmplY3QodmFsdWUpKSB7XG4gICAgZGF0YS5zZXQuYWRkKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhLmhhc2hbdmFsdWVdID0gdHJ1ZTtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBgU2V0YCBjYWNoZSBvYmplY3QgdG8gb3B0aW1pemUgbGluZWFyIHNlYXJjaGVzIG9mIGxhcmdlIGFycmF5cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtudWxsfE9iamVjdH0gUmV0dXJucyB0aGUgbmV3IGNhY2hlIG9iamVjdCBpZiBgU2V0YCBpcyBzdXBwb3J0ZWQsIGVsc2UgYG51bGxgLlxuICovXG52YXIgY3JlYXRlQ2FjaGUgPSAhKG5hdGl2ZUNyZWF0ZSAmJiBTZXQpID8gY29uc3RhbnQobnVsbCkgOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIG5ldyBTZXRDYWNoZSh2YWx1ZXMpO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXR1cm4gZnJvbSB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKiB2YXIgZ2V0dGVyID0gXy5jb25zdGFudChvYmplY3QpO1xuICogZ2V0dGVyKCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gY29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxuLy8gQWRkIGZ1bmN0aW9ucyB0byB0aGUgYFNldGAgY2FjaGUuXG5TZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IGNhY2hlUHVzaDtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDYWNoZTtcbiIsIi8vVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSBiaW4vaG9vay5qc1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZScpO1xubW9kdWxlLmV4cG9ydHMgPSB7ICdtZWRpYV9jb250cm9sJzogdGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLWJhY2tncm91bmRcIiBkYXRhLWJhY2tncm91bmQ+PC9kaXY+PGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtbGF5ZXJcIiBkYXRhLWNvbnRyb2xzPjwlIHZhciByZW5kZXJCYXI9ZnVuY3Rpb24obmFtZSkgeyAlPjxkaXYgY2xhc3M9XCJiYXItY29udGFpbmVyXCIgZGF0YS08JT0gbmFtZSAlPj48ZGl2IGNsYXNzPVwiYmFyLWJhY2tncm91bmRcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJiYXItZmlsbC0xXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48ZGl2IGNsYXNzPVwiYmFyLWZpbGwtMlwiIGRhdGEtPCU9IG5hbWUgJT4+PC9kaXY+PGRpdiBjbGFzcz1cImJhci1ob3ZlclwiIGRhdGEtPCU9IG5hbWUgJT4+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImJhci1zY3J1YmJlclwiIGRhdGEtPCU9IG5hbWUgJT4+PGRpdiBjbGFzcz1cImJhci1zY3J1YmJlci1pY29uXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48L2Rpdj48L2Rpdj48JSB9OyAlPjwlIHZhciByZW5kZXJTZWdtZW50ZWRCYXI9ZnVuY3Rpb24obmFtZSwgc2VnbWVudHMpIHsgc2VnbWVudHM9c2VnbWVudHMgfHwgMTA7ICU+PGRpdiBjbGFzcz1cImJhci1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjwlIGZvciAodmFyIGkgPSAwOyBpIDwgc2VnbWVudHM7IGkrKykgeyAlPjxkaXYgY2xhc3M9XCJzZWdtZW50ZWQtYmFyLWVsZW1lbnRcIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjwlIH0gJT48L2Rpdj48JSB9OyAlPjwlIHZhciByZW5kZXJEcmF3ZXI9ZnVuY3Rpb24obmFtZSwgcmVuZGVyQ29udGVudCkgeyAlPjxkaXYgY2xhc3M9XCJkcmF3ZXItY29udGFpbmVyXCIgZGF0YS08JT0gbmFtZSAlPj48ZGl2IGNsYXNzPVwiZHJhd2VyLWljb24tY29udGFpbmVyXCIgZGF0YS08JT0gbmFtZSAlPj48ZGl2IGNsYXNzPVwiZHJhd2VyLWljb24gbWVkaWEtY29udHJvbC1pY29uXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48c3BhbiBjbGFzcz1cImRyYXdlci10ZXh0XCIgZGF0YS08JT0gbmFtZSAlPj48L3NwYW4+PC9kaXY+PCUgcmVuZGVyQ29udGVudChuYW1lKTsgJT48L2Rpdj48JSB9OyAlPjwlIHZhciByZW5kZXJJbmRpY2F0b3I9ZnVuY3Rpb24obmFtZSkgeyAlPjxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLWluZGljYXRvclwiIGRhdGEtPCU9IG5hbWUgJT4+PC9kaXY+PCUgfTsgJT48JSB2YXIgcmVuZGVyQnV0dG9uPWZ1bmN0aW9uKG5hbWUpIHsgJT48YnV0dG9uIGNsYXNzPVwibWVkaWEtY29udHJvbC1idXR0b24gbWVkaWEtY29udHJvbC1pY29uXCIgZGF0YS08JT0gbmFtZSAlPj48L2J1dHRvbj48JSB9OyAlPjwlIHZhciB0ZW1wbGF0ZXM9eyBiYXI6IHJlbmRlckJhciwgc2VnbWVudGVkQmFyOiByZW5kZXJTZWdtZW50ZWRCYXIsIH07IHZhciByZW5kZXI9ZnVuY3Rpb24oc2V0dGluZ3NMaXN0KSB7IHNldHRpbmdzTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHNldHRpbmcpIHsgaWYoc2V0dGluZyA9PT0gXCJzZWVrYmFyXCIpIHsgcmVuZGVyQmFyKHNldHRpbmcpOyB9IGVsc2UgaWYgKHNldHRpbmcgPT09IFwidm9sdW1lXCIpIHsgcmVuZGVyRHJhd2VyKHNldHRpbmcsIHNldHRpbmdzLnZvbHVtZUJhclRlbXBsYXRlID8gdGVtcGxhdGVzW3NldHRpbmdzLnZvbHVtZUJhclRlbXBsYXRlXSA6IGZ1bmN0aW9uKG5hbWUpIHsgcmV0dXJuIHJlbmRlclNlZ21lbnRlZEJhcihuYW1lKTsgfSk7IH0gZWxzZSBpZiAoc2V0dGluZyA9PT0gXCJkdXJhdGlvblwiIHx8IHNldHRpbmc9PT0gXCJwb3NpdGlvblwiKSB7IHJlbmRlckluZGljYXRvcihzZXR0aW5nKTsgfSBlbHNlIHsgcmVuZGVyQnV0dG9uKHNldHRpbmcpOyB9IH0pOyB9OyAlPjwlIGlmIChzZXR0aW5ncy5kZWZhdWx0ICYmIHNldHRpbmdzLmRlZmF1bHQubGVuZ3RoKSB7ICU+PGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtY2VudGVyLXBhbmVsXCIgZGF0YS1tZWRpYS1jb250cm9sPjwlIHJlbmRlcihzZXR0aW5ncy5kZWZhdWx0KTsgJT48L2Rpdj48JSB9ICU+PCUgaWYgKHNldHRpbmdzLmxlZnQgJiYgc2V0dGluZ3MubGVmdC5sZW5ndGgpIHsgJT48ZGl2IGNsYXNzPVwibWVkaWEtY29udHJvbC1sZWZ0LXBhbmVsXCIgZGF0YS1tZWRpYS1jb250cm9sPjwlIHJlbmRlcihzZXR0aW5ncy5sZWZ0KTsgJT48L2Rpdj48JSB9ICU+PCUgaWYgKHNldHRpbmdzLnJpZ2h0ICYmIHNldHRpbmdzLnJpZ2h0Lmxlbmd0aCkgeyAlPjxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLXJpZ2h0LXBhbmVsXCIgZGF0YS1tZWRpYS1jb250cm9sPjwlIHJlbmRlcihzZXR0aW5ncy5yaWdodCk7ICU+PC9kaXY+PCUgfSAlPjwvZGl2PicpLCdzZWVrX3RpbWUnOiB0ZW1wbGF0ZSgnPHNwYW4gZGF0YS1zZWVrLXRpbWU+PC9zcGFuPicpLCdmbGFzaCc6IHRlbXBsYXRlKCc8cGFyYW0gbmFtZT1cIm1vdmllXCIgdmFsdWU9XCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLnN3ZlwiPjxwYXJhbSBuYW1lPVwicXVhbGl0eVwiIHZhbHVlPVwiYXV0b2hpZ2hcIj48cGFyYW0gbmFtZT1cInN3bGl2ZWNvbm5lY3RcIiB2YWx1ZT1cInRydWVcIj48cGFyYW0gbmFtZT1cImFsbG93U2NyaXB0QWNjZXNzXCIgdmFsdWU9XCJhbHdheXNcIj48cGFyYW0gbmFtZT1cImJnY29sb3JcIiB2YWx1ZT1cIiMwMDExMjJcIj48cGFyYW0gbmFtZT1cImFsbG93RnVsbFNjcmVlblwiIHZhbHVlPVwiZmFsc2VcIj48cGFyYW0gbmFtZT1cIndtb2RlXCIgdmFsdWU9XCJ0cmFuc3BhcmVudFwiPjxwYXJhbSBuYW1lPVwidGFiaW5kZXhcIiB2YWx1ZT1cIjFcIj48cGFyYW0gbmFtZT1GbGFzaFZhcnMgdmFsdWU9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgLz48ZW1iZWQgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIgZGlzYWJsZWQgdGFiaW5kZXg9XCItMVwiIGVuYWJsZWNvbnRleHRtZW51PVwiZmFsc2VcIiBhbGxvd1NjcmlwdEFjY2Vzcz1cImFsd2F5c1wiIHF1YWxpdHk9XCJhdXRvaGlnaHRcIiBwbHVnaW5zcGFnZT1cImh0dHA6Ly93d3cubWFjcm9tZWRpYS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXJcIiB3bW9kZT1cInRyYW5zcGFyZW50XCIgc3dsaXZlY29ubmVjdD1cInRydWVcIiB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBhbGxvd2Z1bGxzY3JlZW49XCJmYWxzZVwiIGJnY29sb3I9XCIjMDAwMDAwXCIgRmxhc2hWYXJzPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPlwiIHNyYz1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXIuc3dmXCI+PC9lbWJlZD4nKSwnaGxzJzogdGVtcGxhdGUoJzxwYXJhbSBuYW1lPVwibW92aWVcIiB2YWx1ZT1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9ITFNQbGF5ZXIuc3dmP2lubGluZT0xXCI+PHBhcmFtIG5hbWU9XCJxdWFsaXR5XCIgdmFsdWU9XCJhdXRvaGlnaFwiPjxwYXJhbSBuYW1lPVwic3dsaXZlY29ubmVjdFwiIHZhbHVlPVwidHJ1ZVwiPjxwYXJhbSBuYW1lPVwiYWxsb3dTY3JpcHRBY2Nlc3NcIiB2YWx1ZT1cImFsd2F5c1wiPjxwYXJhbSBuYW1lPVwiYmdjb2xvclwiIHZhbHVlPVwiIzAwMTEyMlwiPjxwYXJhbSBuYW1lPVwiYWxsb3dGdWxsU2NyZWVuXCIgdmFsdWU9XCJmYWxzZVwiPjxwYXJhbSBuYW1lPVwid21vZGVcIiB2YWx1ZT1cInRyYW5zcGFyZW50XCI+PHBhcmFtIG5hbWU9XCJ0YWJpbmRleFwiIHZhbHVlPVwiMVwiPjxwYXJhbSBuYW1lPUZsYXNoVmFycyB2YWx1ZT1cInBsYXliYWNrSWQ9PCU9IHBsYXliYWNrSWQgJT5cIiAvPjxlbWJlZCB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiB0YWJpbmRleD1cIjFcIiBlbmFibGVjb250ZXh0bWVudT1cImZhbHNlXCIgYWxsb3dTY3JpcHRBY2Nlc3M9XCJhbHdheXNcIiBxdWFsaXR5PVwiYXV0b2hpZ2hcIiBwbHVnaW5zcGFnZT1cImh0dHA6Ly93d3cubWFjcm9tZWRpYS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXJcIiB3bW9kZT1cInRyYW5zcGFyZW50XCIgc3dsaXZlY29ubmVjdD1cInRydWVcIiB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBhbGxvd2Z1bGxzY3JlZW49XCJmYWxzZVwiIGJnY29sb3I9XCIjMDAwMDAwXCIgRmxhc2hWYXJzPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPlwiIHNyYz1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9ITFNQbGF5ZXIuc3dmXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPjwvZW1iZWQ+JyksJ2h0bWw1X3ZpZGVvJzogdGVtcGxhdGUoJzxzb3VyY2Ugc3JjPVwiPCU9c3JjJT5cIiB0eXBlPVwiPCU9dHlwZSU+XCI+JyksJ25vX29wJzogdGVtcGxhdGUoJzxjYW52YXMgZGF0YS1uby1vcC1jYW52YXM+PC9jYW52YXM+PHAgZGF0YS1uby1vcC1tc2c+WW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHBsYXliYWNrIG9mIHRoaXMgdmlkZW8uIFRyeSB0byB1c2UgYSBkaWZmZXJlbnQgYnJvd3Nlci48cD4nKSwnYmFja2dyb3VuZF9idXR0b24nOiB0ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImJhY2tncm91bmQtYnV0dG9uLXdyYXBwZXJcIiBkYXRhLWJhY2tncm91bmQtYnV0dG9uPjxidXR0b24gY2xhc3M9XCJiYWNrZ3JvdW5kLWJ1dHRvbi1pY29uXCIgZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbj48L2J1dHRvbj48L2Rpdj4nKSwnY2hyb21lY2FzdCc6IHRlbXBsYXRlKCc8ZGl2IGNsYXNzPVwiY2hyb21lY2FzdC1wbGF5YmFja1wiPjxkaXYgY2xhc3M9XCJjaHJvbWVjYXN0LXBsYXliYWNrLW92ZXJsYXlcIj48L2Rpdj48L2Rpdj4nKSwnZHZyX2NvbnRyb2xzJzogdGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJsaXZlLWluZm9cIj5MSVZFPC9kaXY+PGJ1dHRvbiBjbGFzcz1cImxpdmUtYnV0dG9uXCI+QkFDSyBUTyBMSVZFPC9idXR0b24+JyksJ3Bvc3Rlcic6IHRlbXBsYXRlKCc8ZGl2IGNsYXNzPVwicGxheS13cmFwcGVyXCIgZGF0YS1wb3N0ZXI+PHNwYW4gY2xhc3M9XCJwb3N0ZXItaWNvbiBwbGF5XCIgZGF0YS1wb3N0ZXIvPjwvZGl2PicpLCdzcGlubmVyX3RocmVlX2JvdW5jZSc6IHRlbXBsYXRlKCc8ZGl2IGRhdGEtYm91bmNlMT48L2Rpdj48ZGl2IGRhdGEtYm91bmNlMj48L2Rpdj48ZGl2IGRhdGEtYm91bmNlMz48L2Rpdj4nKSwnd2F0ZXJtYXJrJzogdGVtcGxhdGUoJzxkaXYgZGF0YS13YXRlcm1hcmsgZGF0YS13YXRlcm1hcmstPCU9cG9zaXRpb24gJT4+PGltZyBzcmM9XCI8JT0gaW1hZ2VVcmwgJT5cIj48L2Rpdj4nKSxDU1M6IHsnY29udGFpbmVyJzogJy5jb250YWluZXJbZGF0YS1jb250YWluZXJde3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtY29sb3I6IzAwMDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5jb250YWluZXJbZGF0YS1jb250YWluZXJdLnBvaW50ZXItZW5hYmxlZHtjdXJzb3I6cG9pbnRlcn0nLCdjb3JlJzogJ1tkYXRhLXBsYXllcl17LXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1raHRtbC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTstby11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApOy1tb3otdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTstby10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7cG9zaXRpb246cmVsYXRpdmU7bWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjQwMDt0ZXh0LWFsaWduOmNlbnRlcjtvdmVyZmxvdzpoaWRkZW47Zm9udC1zaXplOjEwMCU7Zm9udC1mYW1pbHk6XCJsdWNpZGEgZ3JhbmRlXCIsdGFob21hLHZlcmRhbmEsYXJpYWwsc2Fucy1zZXJpZjt0ZXh0LXNoYWRvdzowIDAgMDtib3gtc2l6aW5nOmJvcmRlci1ib3h9W2RhdGEtcGxheWVyXSBhLFtkYXRhLXBsYXllcl0gYWJicixbZGF0YS1wbGF5ZXJdIGFjcm9ueW0sW2RhdGEtcGxheWVyXSBhZGRyZXNzLFtkYXRhLXBsYXllcl0gYXBwbGV0LFtkYXRhLXBsYXllcl0gYXJ0aWNsZSxbZGF0YS1wbGF5ZXJdIGFzaWRlLFtkYXRhLXBsYXllcl0gYXVkaW8sW2RhdGEtcGxheWVyXSBiLFtkYXRhLXBsYXllcl0gYmlnLFtkYXRhLXBsYXllcl0gYmxvY2txdW90ZSxbZGF0YS1wbGF5ZXJdIGNhbnZhcyxbZGF0YS1wbGF5ZXJdIGNhcHRpb24sW2RhdGEtcGxheWVyXSBjZW50ZXIsW2RhdGEtcGxheWVyXSBjaXRlLFtkYXRhLXBsYXllcl0gY29kZSxbZGF0YS1wbGF5ZXJdIGRkLFtkYXRhLXBsYXllcl0gZGVsLFtkYXRhLXBsYXllcl0gZGV0YWlscyxbZGF0YS1wbGF5ZXJdIGRmbixbZGF0YS1wbGF5ZXJdIGRpdixbZGF0YS1wbGF5ZXJdIGRsLFtkYXRhLXBsYXllcl0gZHQsW2RhdGEtcGxheWVyXSBlbSxbZGF0YS1wbGF5ZXJdIGVtYmVkLFtkYXRhLXBsYXllcl0gZmllbGRzZXQsW2RhdGEtcGxheWVyXSBmaWdjYXB0aW9uLFtkYXRhLXBsYXllcl0gZmlndXJlLFtkYXRhLXBsYXllcl0gZm9vdGVyLFtkYXRhLXBsYXllcl0gZm9ybSxbZGF0YS1wbGF5ZXJdIGgxLFtkYXRhLXBsYXllcl0gaDIsW2RhdGEtcGxheWVyXSBoMyxbZGF0YS1wbGF5ZXJdIGg0LFtkYXRhLXBsYXllcl0gaDUsW2RhdGEtcGxheWVyXSBoNixbZGF0YS1wbGF5ZXJdIGhlYWRlcixbZGF0YS1wbGF5ZXJdIGhncm91cCxbZGF0YS1wbGF5ZXJdIGksW2RhdGEtcGxheWVyXSBpZnJhbWUsW2RhdGEtcGxheWVyXSBpbWcsW2RhdGEtcGxheWVyXSBpbnMsW2RhdGEtcGxheWVyXSBrYmQsW2RhdGEtcGxheWVyXSBsYWJlbCxbZGF0YS1wbGF5ZXJdIGxlZ2VuZCxbZGF0YS1wbGF5ZXJdIGxpLFtkYXRhLXBsYXllcl0gbWFyayxbZGF0YS1wbGF5ZXJdIG1lbnUsW2RhdGEtcGxheWVyXSBuYXYsW2RhdGEtcGxheWVyXSBvYmplY3QsW2RhdGEtcGxheWVyXSBvbCxbZGF0YS1wbGF5ZXJdIG91dHB1dCxbZGF0YS1wbGF5ZXJdIHAsW2RhdGEtcGxheWVyXSBwcmUsW2RhdGEtcGxheWVyXSBxLFtkYXRhLXBsYXllcl0gcnVieSxbZGF0YS1wbGF5ZXJdIHMsW2RhdGEtcGxheWVyXSBzYW1wLFtkYXRhLXBsYXllcl0gc2VjdGlvbixbZGF0YS1wbGF5ZXJdIHNtYWxsLFtkYXRhLXBsYXllcl0gc3BhbixbZGF0YS1wbGF5ZXJdIHN0cmlrZSxbZGF0YS1wbGF5ZXJdIHN0cm9uZyxbZGF0YS1wbGF5ZXJdIHN1YixbZGF0YS1wbGF5ZXJdIHN1bW1hcnksW2RhdGEtcGxheWVyXSBzdXAsW2RhdGEtcGxheWVyXSB0YWJsZSxbZGF0YS1wbGF5ZXJdIHRib2R5LFtkYXRhLXBsYXllcl0gdGQsW2RhdGEtcGxheWVyXSB0Zm9vdCxbZGF0YS1wbGF5ZXJdIHRoLFtkYXRhLXBsYXllcl0gdGhlYWQsW2RhdGEtcGxheWVyXSB0aW1lLFtkYXRhLXBsYXllcl0gdHIsW2RhdGEtcGxheWVyXSB0dCxbZGF0YS1wbGF5ZXJdIHUsW2RhdGEtcGxheWVyXSB1bCxbZGF0YS1wbGF5ZXJdIHZhcixbZGF0YS1wbGF5ZXJdIHZpZGVve21hcmdpbjowO3BhZGRpbmc6MDtib3JkZXI6MDtmb250OmluaGVyaXQ7Zm9udC1zaXplOjEwMCU7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9W2RhdGEtcGxheWVyXSB0YWJsZXtib3JkZXItY29sbGFwc2U6Y29sbGFwc2U7Ym9yZGVyLXNwYWNpbmc6MH1bZGF0YS1wbGF5ZXJdIGNhcHRpb24sW2RhdGEtcGxheWVyXSB0ZCxbZGF0YS1wbGF5ZXJdIHRoe3RleHQtYWxpZ246bGVmdDtmb250LXdlaWdodDo0MDA7dmVydGljYWwtYWxpZ246bWlkZGxlfVtkYXRhLXBsYXllcl0gYmxvY2txdW90ZSxbZGF0YS1wbGF5ZXJdIHF7cXVvdGVzOm5vbmV9W2RhdGEtcGxheWVyXSBibG9ja3F1b3RlOmFmdGVyLFtkYXRhLXBsYXllcl0gYmxvY2txdW90ZTpiZWZvcmUsW2RhdGEtcGxheWVyXSBxOmFmdGVyLFtkYXRhLXBsYXllcl0gcTpiZWZvcmV7Y29udGVudDpcIlwiO2NvbnRlbnQ6bm9uZX1bZGF0YS1wbGF5ZXJdIGEgaW1ne2JvcmRlcjpub25lfVtkYXRhLXBsYXllcl0gKnttYXgtd2lkdGg6aW5pdGlhbDtib3gtc2l6aW5nOmluaGVyaXQ7ZmxvYXQ6aW5pdGlhbH1bZGF0YS1wbGF5ZXJdLmZ1bGxzY3JlZW57d2lkdGg6MTAwJSFpbXBvcnRhbnQ7aGVpZ2h0OjEwMCUhaW1wb3J0YW50fVtkYXRhLXBsYXllcl0ubm9jdXJzb3J7Y3Vyc29yOm5vbmV9LmNsYXBwci1zdHlsZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fUBtZWRpYSBzY3JlZW57W2RhdGEtcGxheWVyXXtvcGFjaXR5Oi45OX19JywnbWVkaWFfY29udHJvbCc6ICdAZm9udC1mYWNle2ZvbnQtZmFtaWx5OlBsYXllcjtzcmM6dXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLmVvdFwiKTtzcmM6dXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLmVvdD8jaWVmaXhcIikgZm9ybWF0KFwiZW1iZWRkZWQtb3BlbnR5cGVcIiksdXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLnR0ZlwiKSBmb3JtYXQoXCJ0cnVldHlwZVwiKSx1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuc3ZnI3BsYXllclwiKSBmb3JtYXQoXCJzdmdcIil9Lm1lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uey13ZWJraXQtdHJhbnNpdGlvbjpub25lIWltcG9ydGFudDstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6MHM7LW1vei10cmFuc2l0aW9uOm5vbmUhaW1wb3J0YW50Oy1vLXRyYW5zaXRpb246bm9uZSFpbXBvcnRhbnQ7dHJhbnNpdGlvbjpub25lIWltcG9ydGFudH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xde3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7ei1pbmRleDo5OTk5O3BvaW50ZXItZXZlbnRzOm5vbmV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS5kcmFnZ2luZ3twb2ludGVyLWV2ZW50czphdXRvO2N1cnNvcjotd2Via2l0LWdyYWJiaW5nIWltcG9ydGFudDtjdXJzb3I6Z3JhYmJpbmchaW1wb3J0YW50fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0uZHJhZ2dpbmcgKntjdXJzb3I6LXdlYmtpdC1ncmFiYmluZyFpbXBvcnRhbnQ7Y3Vyc29yOmdyYWJiaW5nIWltcG9ydGFudH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWJhY2tncm91bmRbZGF0YS1iYWNrZ3JvdW5kXXtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6NDAlO3dpZHRoOjEwMCU7Ym90dG9tOjA7YmFja2dyb3VuZC1pbWFnZTotb3dnKGxpbmVhci1ncmFkaWVudChyZ2JhKDAsMCwwLDApLHJnYmEoMCwwLDAsLjkpKSk7YmFja2dyb3VuZC1pbWFnZTotd2Via2l0KGxpbmVhci1ncmFkaWVudChyZ2JhKDAsMCwwLDApLHJnYmEoMCwwLDAsLjkpKSk7YmFja2dyb3VuZC1pbWFnZTotbW96KGxpbmVhci1ncmFkaWVudChyZ2JhKDAsMCwwLDApLHJnYmEoMCwwLDAsLjkpKSk7YmFja2dyb3VuZC1pbWFnZTotbyhsaW5lYXItZ3JhZGllbnQocmdiYSgwLDAsMCwwKSxyZ2JhKDAsMCwwLC45KSkpO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHJnYmEoMCwwLDAsMCkscmdiYSgwLDAsMCwuOSkpOy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC42czstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjZzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246b3BhY2l0eSAuNnMgZWFzZS1vdXQ7dHJhbnNpdGlvbjpvcGFjaXR5IC42cyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWljb257Zm9udC1mYW1pbHk6UGxheWVyO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXN0eWxlOm5vcm1hbDtmb250LXNpemU6MjZweDtsaW5lLWhlaWdodDozMnB4O2xldHRlci1zcGFjaW5nOjA7c3BlYWs6bm9uZTtjb2xvcjojZmZmO29wYWNpdHk6LjU7dmVydGljYWwtYWxpZ246bWlkZGxlO3RleHQtYWxpZ246bGVmdDstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZTstbW96LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlOy1vLXRyYW5zaXRpb246YWxsIC4xcyBlYXNlO3RyYW5zaXRpb246YWxsIC4xcyBlYXNlfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtaWNvbjpob3Zlcntjb2xvcjojZmZmO29wYWNpdHk6Ljc1O3RleHQtc2hhZG93OnJnYmEoMjU1LDI1NSwyNTUsLjgpIDAgMCA1cHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS5tZWRpYS1jb250cm9sLWhpZGUgLm1lZGlhLWNvbnRyb2wtYmFja2dyb3VuZFtkYXRhLWJhY2tncm91bmRde29wYWNpdHk6MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLm1lZGlhLWNvbnRyb2wtaGlkZSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXXtib3R0b206LTUwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS5tZWRpYS1jb250cm9sLWhpZGUgLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLXNjcnViYmVyW2RhdGEtc2Vla2Jhcl17b3BhY2l0eTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc117cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjdweDt3aWR0aDoxMDAlO2hlaWdodDozMnB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtwb2ludGVyLWV2ZW50czphdXRvOy13ZWJraXQtdHJhbnNpdGlvbjpib3R0b20gLjRzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246Ym90dG9tIC40cyBlYXNlLW91dDstby10cmFuc2l0aW9uOmJvdHRvbSAuNHMgZWFzZS1vdXQ7dHJhbnNpdGlvbjpib3R0b20gLjRzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtbGVmdC1wYW5lbFtkYXRhLW1lZGlhLWNvbnRyb2xde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6NHB4O2hlaWdodDoxMDAlfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtY2VudGVyLXBhbmVsW2RhdGEtbWVkaWEtY29udHJvbF17aGVpZ2h0OjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7bGluZS1oZWlnaHQ6MzJweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLXJpZ2h0LXBhbmVsW2RhdGEtbWVkaWEtY29udHJvbF17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6NHB4O2hlaWdodDoxMDAlfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9ue2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjA7bWFyZ2luOjAgNnB4O3BhZGRpbmc6MDtjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9ja30ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbjpmb2N1c3tvdXRsaW5lOjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5XXtmbG9hdDpsZWZ0O2hlaWdodDoxMDAlO2ZvbnQtc2l6ZToyMHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheV06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGF1c2Vde2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjIwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wYXVzZV06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMlwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtc3RvcF17ZmxvYXQ6bGVmdDtoZWlnaHQ6MTAwJTtmb250LXNpemU6MjBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXN0b3BdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDNcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWZ1bGxzY3JlZW5de2Zsb2F0OnJpZ2h0O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjA7aGVpZ2h0OjEwMCV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1mdWxsc2NyZWVuXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDA2XCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1mdWxsc2NyZWVuXS5zaHJpbms6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwN1wifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXXtjdXJzb3I6ZGVmYXVsdDtmbG9hdDpyaWdodDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjowO2hlaWdodDoxMDAlO29wYWNpdHk6MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWhkLWluZGljYXRvcl06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwOFwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXS5lbmFibGVke29wYWNpdHk6MX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWhkLWluZGljYXRvcl0uZW5hYmxlZDpob3ZlcntvcGFjaXR5OjE7dGV4dC1zaGFkb3c6bm9uZX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlwYXVzZV17ZmxvYXQ6bGVmdDtoZWlnaHQ6MTAwJTtmb250LXNpemU6MjBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlwYXVzZV06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXBhdXNlXS5wbGF5aW5nOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDJcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlwYXVzZV0ucGF1c2VkOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlzdG9wXXtmbG9hdDpsZWZ0O2hlaWdodDoxMDAlO2ZvbnQtc2l6ZToyMHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3BdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlzdG9wXS5wbGF5aW5nOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDNcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlzdG9wXS5zdG9wcGVkOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLWR1cmF0aW9uXSwubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLXBvc2l0aW9uXXtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LXNpemU6MTBweDtjb2xvcjojZmZmO2N1cnNvcjpkZWZhdWx0O2xpbmUtaGVpZ2h0OjMycHg7cG9zaXRpb246cmVsYXRpdmV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1wb3NpdGlvbl17bWFyZ2luLWxlZnQ6NnB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtZHVyYXRpb25de2NvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjUpO21hcmdpbi1yaWdodDo2cHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1kdXJhdGlvbl06YmVmb3Jle2NvbnRlbnQ6XCJ8XCI7bWFyZ2luOjAgM3B4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTIwcHg7bGVmdDowO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt3aWR0aDoxMDAlO2hlaWdodDoyNXB4O2N1cnNvcjpwb2ludGVyfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXXt3aWR0aDoxMDAlO2hlaWdodDoxcHg7cG9zaXRpb246cmVsYXRpdmU7dG9wOjEycHg7YmFja2dyb3VuZC1jb2xvcjojNjY2fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWZpbGwtMVtkYXRhLXNlZWtiYXJde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDowO2hlaWdodDoxMDAlO2JhY2tncm91bmQtY29sb3I6I2MyYzJjMjstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0O3RyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1maWxsLTJbZGF0YS1zZWVrYmFyXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MDtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiMwMDVhZmY7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dDt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItaG92ZXJbZGF0YS1zZWVrYmFyXXtvcGFjaXR5OjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOi0zcHg7d2lkdGg6NXB4O2hlaWdodDo3cHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC41KTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2U7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2U7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlO3RyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl06aG92ZXIgLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1ob3ZlcltkYXRhLXNlZWtiYXJde29wYWNpdHk6MX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0uc2Vlay1kaXNhYmxlZHtjdXJzb3I6ZGVmYXVsdH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0uc2Vlay1kaXNhYmxlZDpob3ZlciAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWhvdmVyW2RhdGEtc2Vla2Jhcl17b3BhY2l0eTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLXNjcnViYmVyW2RhdGEtc2Vla2Jhcl17cG9zaXRpb246YWJzb2x1dGU7dG9wOjJweDtsZWZ0OjA7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dDt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItc2NydWJiZXJbZGF0YS1zZWVrYmFyXSAuYmFyLXNjcnViYmVyLWljb25bZGF0YS1zZWVrYmFyXXtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjZweDt0b3A6NnB4O3dpZHRoOjhweDtoZWlnaHQ6OHB4O2JvcmRlci1yYWRpdXM6MTBweDtib3gtc2hhZG93OjAgMCAwIDZweCByZ2JhKDI1NSwyNTUsMjU1LC4yKTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV17ZmxvYXQ6cmlnaHQ7ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjMycHg7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luOjAgNnB4O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXXtmbG9hdDpsZWZ0O2JvdHRvbTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV17YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MDtib3gtc2l6aW5nOmNvbnRlbnQtYm94O3dpZHRoOjE2cHg7aGVpZ2h0OjMycHg7bWFyZ2luLXJpZ2h0OjZweDtvcGFjaXR5OjF9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXTpob3ZlcntvcGFjaXR5OjF9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDA0XCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXS5tdXRlZHtvcGFjaXR5Oi41fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV0ubXV0ZWQ6aG92ZXJ7b3BhY2l0eTouN30ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdLm11dGVkOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDVcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV17ZmxvYXQ6bGVmdDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6NnB4O3dpZHRoOjQycHg7aGVpZ2h0OjE4cHg7cGFkZGluZzozcHggMDtvdmVyZmxvdzpoaWRkZW47LXdlYmtpdC10cmFuc2l0aW9uOndpZHRoIC4yczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOndpZHRoIC4ycyBlYXNlLW91dDstby10cmFuc2l0aW9uOndpZHRoIC4ycyBlYXNlLW91dDt0cmFuc2l0aW9uOndpZHRoIC4ycyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV17ZmxvYXQ6bGVmdDt3aWR0aDo0cHg7cGFkZGluZy1sZWZ0OjJweDtoZWlnaHQ6MTJweDtvcGFjaXR5Oi41Oy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LW1vei1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstbXMtYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LW8tYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7Ym94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LXdlYmtpdC10cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4yczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOi1tb3otdHJhbnNmb3JtIC4ycyBlYXNlLW91dDstby10cmFuc2l0aW9uOi1vLXRyYW5zZm9ybSAuMnMgZWFzZS1vdXQ7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuc2VnbWVudGVkLWJhci1lbGVtZW50W2RhdGEtdm9sdW1lXS5maWxsey13ZWJraXQtYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LW1vei1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstbXMtYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LW8tYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7Ym94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7b3BhY2l0eToxfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuc2VnbWVudGVkLWJhci1lbGVtZW50W2RhdGEtdm9sdW1lXTpudGgtb2YtdHlwZSgxKXtwYWRkaW5nLWxlZnQ6MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV06aG92ZXJ7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKDEuNSk7LW1vei10cmFuc2Zvcm06c2NhbGVZKDEuNSk7LW1zLXRyYW5zZm9ybTpzY2FsZVkoMS41KTstby10cmFuc2Zvcm06c2NhbGVZKDEuNSk7dHJhbnNmb3JtOnNjYWxlWSgxLjUpfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0udzMyMCAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdLnZvbHVtZS1iYXItaGlkZXtoZWlnaHQ6MTJweDt0b3A6OXB4O3BhZGRpbmc6MDt3aWR0aDowfScsJ3NlZWtfdGltZSc6ICcuc2Vlay10aW1lW2RhdGEtc2Vlay10aW1lXXtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDphdXRvO2hlaWdodDoyMHB4O2xpbmUtaGVpZ2h0OjIwcHg7Ym90dG9tOjU1cHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDIsMiwyLC41KTt6LWluZGV4Ojk5OTk7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlOy1vLXRyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZTt0cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2V9LnNlZWstdGltZVtkYXRhLXNlZWstdGltZV0uaGlkZGVuW2RhdGEtc2Vlay10aW1lXXtvcGFjaXR5OjB9LnNlZWstdGltZVtkYXRhLXNlZWstdGltZV0gc3BhbltkYXRhLXNlZWstdGltZV17cG9zaXRpb246cmVsYXRpdmU7Y29sb3I6I2ZmZjtmb250LXNpemU6MTBweDtwYWRkaW5nLWxlZnQ6N3B4O3BhZGRpbmctcmlnaHQ6N3B4fScsJ2ZsYXNoJzogJ1tkYXRhLWZsYXNoXXtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2JhY2tncm91bmQtY29sb3I6IzAwMDtkaXNwbGF5OmJsb2NrO3BvaW50ZXItZXZlbnRzOm5vbmV9JywnaGxzJzogJ1tkYXRhLWhsc117cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpibG9jaztwb2ludGVyLWV2ZW50czpub25lO3RvcDowfScsJ2h0bWw1X3ZpZGVvJzogJ1tkYXRhLWh0bWw1LXZpZGVvXXtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2Rpc3BsYXk6YmxvY2t9JywnaHRtbF9pbWcnOiAnW2RhdGEtaHRtbC1pbWdde21heC13aWR0aDoxMDAlO21heC1oZWlnaHQ6MTAwJX0nLCdub19vcCc6ICdbZGF0YS1uby1vcF17ei1pbmRleDoxMDAwO3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXJ9W2RhdGEtbm8tb3BdIHBbZGF0YS1uby1vcC1tc2dde3Bvc2l0aW9uOmFic29sdXRlO2ZvbnQtc2l6ZToyNXB4O3RvcDo0MCU7Y29sb3I6I2ZmZn1bZGF0YS1uby1vcF0gY2FudmFzW2RhdGEtbm8tb3AtY2FudmFzXXtiYWNrZ3JvdW5kLWNvbG9yOiM3Nzc7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0nLCdiYWNrZ3JvdW5kX2J1dHRvbic6ICcuYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl17Zm9udC1mYW1pbHk6UGxheWVyO3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4yKTtwb2ludGVyLWV2ZW50czpub25lOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjRzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246YWxsIC40cyBlYXNlLW91dDstby10cmFuc2l0aW9uOmFsbCAuNHMgZWFzZS1vdXQ7dHJhbnNpdGlvbjphbGwgLjRzIGVhc2Utb3V0fS5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXS5oaWRle2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dLmhpZGUgLmJhY2tncm91bmQtYnV0dG9uLXdyYXBwZXJbZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl17b3BhY2l0eTowfS5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24td3JhcHBlcltkYXRhLWJhY2tncm91bmQtYnV0dG9uXXtwb3NpdGlvbjphYnNvbHV0ZTtvdmVyZmxvdzpoaWRkZW47d2lkdGg6MTAwJTtoZWlnaHQ6MjUlO2xpbmUtaGVpZ2h0OjEwMCU7Zm9udC1zaXplOjI1JTt0b3A6NTAlO3RleHQtYWxpZ246Y2VudGVyfS5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24td3JhcHBlcltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24taWNvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXXtjdXJzb3I6cG9pbnRlcjtwb2ludGVyLWV2ZW50czphdXRvO2ZvbnQtZmFtaWx5OlBsYXllcjtmb250LXdlaWdodDo0MDA7Zm9udC1zdHlsZTpub3JtYWw7bGluZS1oZWlnaHQ6MTtsZXR0ZXItc3BhY2luZzowO3NwZWFrOm5vbmU7Y29sb3I6I2ZmZjtvcGFjaXR5Oi43NTtib3JkZXI6MDtvdXRsaW5lOjA7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZTstbW96LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlOy1vLXRyYW5zaXRpb246YWxsIC4xcyBlYXNlO3RyYW5zaXRpb246YWxsIC4xcyBlYXNlfS5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24td3JhcHBlcltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24taWNvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXTpob3ZlcntvcGFjaXR5OjE7dGV4dC1zaGFkb3c6cmdiYSgyNTUsMjU1LDI1NSwuOCkgMCAwIDE1cHh9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi1pY29uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dLnBsYXlpbmc6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMlwifS5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24td3JhcHBlcltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24taWNvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXS5ub3RwbGF5aW5nOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLXdyYXBwZXJbZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLWljb25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0ucGxheXN0b3AucGxheWluZzpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAzXCJ9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi1pY29uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dLnBsYXlzdG9wLm5vdHBsYXlpbmc6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sLm1lZGlhLWNvbnRyb2wtaGlkZVtkYXRhLW1lZGlhLWNvbnRyb2xdIC5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXXtvcGFjaXR5OjB9JywnY2hyb21lY2FzdCc6ICcuY2hyb21lY2FzdC1wbGF5YmFja3toZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5jaHJvbWVjYXN0LXBsYXliYWNrLW92ZXJsYXl7YmFja2dyb3VuZC1jb2xvcjojMDAwO2hlaWdodDoxMDAlO29wYWNpdHk6LjY7d2lkdGg6MTAwJX1AZm9udC1mYWNle2ZvbnQtZmFtaWx5OmNocm9tZWNhc3Q7c3JjOnVybChhc3NldHMvY2hyb21lY2FzdC5lb3Q/LTJyd2I2dCk7c3JjOnVybChhc3NldHMvY2hyb21lY2FzdC5lb3Q/I2llZml4LTJyd2I2dCkgZm9ybWF0KFwiZW1iZWRkZWQtb3BlbnR5cGVcIiksdXJsKGFzc2V0cy9jaHJvbWVjYXN0LndvZmY/LTJyd2I2dCkgZm9ybWF0KFwid29mZlwiKSx1cmwoYXNzZXRzL2Nocm9tZWNhc3QudHRmPy0ycndiNnQpIGZvcm1hdChcInRydWV0eXBlXCIpLHVybChhc3NldHMvY2hyb21lY2FzdC5zdmc/LTJyd2I2dCNjaHJvbWVjYXN0KSBmb3JtYXQoXCJzdmdcIik7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc3R5bGU6bm9ybWFsfS5jaHJvbWVjYXN0LWJ1dHRvbntiYWNrZ3JvdW5kOjAgMDtib3JkZXI6MDt3aWR0aDozMnB4O2hlaWdodDoyNnB4O2ZvbnQtc2l6ZToyMnB4O2xpbmUtaGVpZ2h0OjI2cHg7bGV0dGVyLXNwYWNpbmc6MDtjb2xvcjojZmZmO29wYWNpdHk6LjU7dmVydGljYWwtYWxpZ246bWlkZGxlO3RleHQtYWxpZ246bGVmdDtjdXJzb3I6cG9pbnRlcjstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlOy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2V9LmNocm9tZWNhc3QtYnV0dG9uOmhvdmVye29wYWNpdHk6Ljc1O3RleHQtc2hhZG93OnJnYmEoMjU1LDI1NSwyNTUsLjgpIDAgMCA1cHh9LmNocm9tZWNhc3QtYnV0dG9uOmZvY3Vze291dGxpbmU6MH0uY2hyb21lY2FzdC1pY29ue2ZvbnQtZmFtaWx5OmNocm9tZWNhc3Q7c3BlYWs6bm9uZTtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo0MDA7Zm9udC12YXJpYW50Om5vcm1hbDt0ZXh0LXRyYW5zZm9ybTpub25lOy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlfS5pY29uLWNhc3Q6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTYwMFwifS5pY29uLWNhc3QtY29ubmVjdGVkOmJlZm9yZXtjb250ZW50OlwiXFxcXGU2MDFcIn0nLCdkdnJfY29udHJvbHMnOiAnQGltcG9ydCB1cmwoaHR0cDovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvKTsuZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXXtkaXNwbGF5OmlubGluZS1ibG9jaztmbG9hdDpsZWZ0O2NvbG9yOiNmZmY7bGluZS1oZWlnaHQ6MzJweDtmb250LXNpemU6MTBweDtmb250LXdlaWdodDo3MDA7bWFyZ2luLWxlZnQ6NnB4fS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm97Y3Vyc29yOmRlZmF1bHQ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiT3BlbiBTYW5zXCIsQXJpYWwsc2Fucy1zZXJpZn0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1pbmZvOmJlZm9yZXtjb250ZW50OlwiXCI7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6N3B4O2hlaWdodDo3cHg7Ym9yZGVyLXJhZGl1czozLjVweDttYXJnaW4tcmlnaHQ6My41cHg7YmFja2dyb3VuZC1jb2xvcjojZmYwMTAxfS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm8uZGlzYWJsZWR7b3BhY2l0eTouM30uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1pbmZvLmRpc2FibGVkOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtYnV0dG9ue2N1cnNvcjpwb2ludGVyO291dGxpbmU6MDtkaXNwbGF5Om5vbmU7Ym9yZGVyOjA7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2hlaWdodDozMnB4O3BhZGRpbmc6MDtvcGFjaXR5Oi43O2ZvbnQtZmFtaWx5OlJvYm90byxcIk9wZW4gU2Fuc1wiLEFyaWFsLHNhbnMtc2VyaWY7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2U7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZX0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1idXR0b246YmVmb3Jle2NvbnRlbnQ6XCJcIjtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo3cHg7aGVpZ2h0OjdweDtib3JkZXItcmFkaXVzOjMuNXB4O21hcmdpbi1yaWdodDozLjVweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtYnV0dG9uOmhvdmVye29wYWNpdHk6MTt0ZXh0LXNoYWRvdzpyZ2JhKDI1NSwyNTUsMjU1LC43NSkgMCAwIDVweH0uZHZyIC5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm97ZGlzcGxheTpub25lfS5kdnIgLmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtYnV0dG9ue2Rpc3BsYXk6YmxvY2t9LmR2ci5tZWRpYS1jb250cm9sLmxpdmVbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl17YmFja2dyb3VuZC1jb2xvcjojMDA1YWZmfS5tZWRpYS1jb250cm9sLmxpdmVbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl17YmFja2dyb3VuZC1jb2xvcjojZmYwMTAxfS5zZWVrLXRpbWVbZGF0YS1zZWVrLXRpbWVdIHNwYW5bZGF0YS1kdXJhdGlvbl17cG9zaXRpb246cmVsYXRpdmU7Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNSk7Zm9udC1zaXplOjEwcHg7cGFkZGluZy1yaWdodDo3cHh9LnNlZWstdGltZVtkYXRhLXNlZWstdGltZV0gc3BhbltkYXRhLWR1cmF0aW9uXTpiZWZvcmV7Y29udGVudDpcInxcIjttYXJnaW4tcmlnaHQ6N3B4fScsJ3Bvc3Rlcic6ICdAZm9udC1mYWNle2ZvbnQtZmFtaWx5OlBsYXllcjtzcmM6dXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLmVvdFwiKTtzcmM6dXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLmVvdD8jaWVmaXhcIikgZm9ybWF0KFwiZW1iZWRkZWQtb3BlbnR5cGVcIiksdXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLnR0ZlwiKSBmb3JtYXQoXCJ0cnVldHlwZVwiKSx1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuc3ZnI3BsYXllclwiKSBmb3JtYXQoXCJzdmdcIil9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJde2N1cnNvcjpwb2ludGVyO3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7ei1pbmRleDo5OTg7dG9wOjB9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJdIC5wb3N0ZXItYmFja2dyb3VuZFtkYXRhLXBvc3Rlcl17d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLXNpemU6Y292ZXI7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtcG9zaXRpb246NTAlIDUwJX0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl0gLnBsYXktd3JhcHBlcltkYXRhLXBvc3Rlcl17cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtoZWlnaHQ6MjUlO2xpbmUtaGVpZ2h0OjEwMCU7Zm9udC1zaXplOjI1JTt0b3A6NTAlO3RleHQtYWxpZ246Y2VudGVyfS5wbGF5ZXItcG9zdGVyW2RhdGEtcG9zdGVyXSAucGxheS13cmFwcGVyW2RhdGEtcG9zdGVyXSAucG9zdGVyLWljb25bZGF0YS1wb3N0ZXJde2ZvbnQtZmFtaWx5OlBsYXllcjtmb250LXdlaWdodDo0MDA7Zm9udC1zdHlsZTpub3JtYWw7bGluZS1oZWlnaHQ6MTtsZXR0ZXItc3BhY2luZzowO3NwZWFrOm5vbmU7Y29sb3I6I2ZmZjtvcGFjaXR5Oi43NTstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSB0ZXh0LXNoYWRvdzstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6LjFzOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IHRleHQtc2hhZG93IC4xczstby10cmFuc2l0aW9uOm9wYWNpdHkgdGV4dC1zaGFkb3cgLjFzO3RyYW5zaXRpb246b3BhY2l0eSB0ZXh0LXNoYWRvdyAuMXMgZWFzZX0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl0gLnBsYXktd3JhcHBlcltkYXRhLXBvc3Rlcl0gLnBvc3Rlci1pY29uW2RhdGEtcG9zdGVyXS5wbGF5W2RhdGEtcG9zdGVyXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJdIC5wbGF5LXdyYXBwZXJbZGF0YS1wb3N0ZXJdIC5wb3N0ZXItaWNvbltkYXRhLXBvc3Rlcl06aG92ZXJ7b3BhY2l0eToxO3RleHQtc2hhZG93OnJnYmEoMjU1LDI1NSwyNTUsLjgpIDAgMCAxNXB4fScsJ3NwaW5uZXJfdGhyZWVfYm91bmNlJzogJy5zcGlubmVyLXRocmVlLWJvdW5jZVtkYXRhLXNwaW5uZXJde3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbjowIGF1dG87d2lkdGg6NzBweDt0ZXh0LWFsaWduOmNlbnRlcjt6LWluZGV4Ojk5OTt0b3A6NDclO2xlZnQ6MDtyaWdodDowfS5zcGlubmVyLXRocmVlLWJvdW5jZVtkYXRhLXNwaW5uZXJdPmRpdnt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6I0ZGRjtib3JkZXItcmFkaXVzOjEwMCU7ZGlzcGxheTppbmxpbmUtYmxvY2s7LXdlYmtpdC1hbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDstbW96LWFuaW1hdGlvbjpib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy1tcy1hbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDstby1hbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDthbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDstd2Via2l0LWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDstbW96LWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDstbXMtYW5pbWF0aW9uLWZpbGwtbW9kZTpib3RoOy1vLWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDthbmltYXRpb24tZmlsbC1tb2RlOmJvdGh9LnNwaW5uZXItdGhyZWUtYm91bmNlW2RhdGEtc3Bpbm5lcl0gW2RhdGEtYm91bmNlMV0sLnNwaW5uZXItdGhyZWUtYm91bmNlW2RhdGEtc3Bpbm5lcl0gW2RhdGEtYm91bmNlMl17LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS4zMnM7LW1vei1hbmltYXRpb24tZGVsYXk6LS4zMnM7LW1zLWFuaW1hdGlvbi1kZWxheTotLjMyczstby1hbmltYXRpb24tZGVsYXk6LS4zMnM7YW5pbWF0aW9uLWRlbGF5Oi0uMzJzfUAtbW96LWtleWZyYW1lcyBib3VuY2VkZWxheXswJSwxMDAlLDgwJXstbW96LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9NDAley1tb3otdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19QC13ZWJraXQta2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpfX1ALW8ta2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley1vLXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9NDAley1vLXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fUAtbXMta2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley1tcy10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfTQwJXstbXMtdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19QGtleWZyYW1lcyBib3VuY2VkZWxheXswJSwxMDAlLDgwJXt0cmFuc2Zvcm06c2NhbGUoMCl9NDAle3RyYW5zZm9ybTpzY2FsZSgxKX19Jywnd2F0ZXJtYXJrJzogJ1tkYXRhLXdhdGVybWFya117cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luOjEwMHB4IGF1dG8gMDt3aWR0aDo3MHB4O3RleHQtYWxpZ246Y2VudGVyO3otaW5kZXg6MTB9W2RhdGEtd2F0ZXJtYXJrLWJvdHRvbS1sZWZ0XXtib3R0b206MTBweDtsZWZ0OjEwcHh9W2RhdGEtd2F0ZXJtYXJrLWJvdHRvbS1yaWdodF17Ym90dG9tOjEwcHg7cmlnaHQ6NDJweH1bZGF0YS13YXRlcm1hcmstdG9wLWxlZnRde3RvcDotOTVweDtsZWZ0OjEwcHh9W2RhdGEtd2F0ZXJtYXJrLXRvcC1yaWdodF17dG9wOi05NXB4O3JpZ2h0OjM3cHh9Jyx9fTsiLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgJCA9IHJlcXVpcmUoJ2NsYXBwci16ZXB0bycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZScpO1xudmFyIEpTVCA9IHJlcXVpcmUoJy4vanN0Jyk7XG5cbnZhciBTdHlsZXIgPSB7XG4gIGdldFN0eWxlRm9yOiBmdW5jdGlvbihuYW1lLCBvcHRpb25zPXtiYXNlVXJsOiAnJ30pIHtcbiAgICByZXR1cm4gJCgnPHN0eWxlIGNsYXNzPVwiY2xhcHByLXN0eWxlXCI+PC9zdHlsZT4nKS5odG1sKHRlbXBsYXRlKEpTVC5DU1NbbmFtZV0pKG9wdGlvbnMpKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZXI7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvYnJvd3NlcicpXG5cbnZhciBleHRlbmQgPSBmdW5jdGlvbihwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICB2YXIgcGFyZW50ID0gdGhpc1xuICB2YXIgY2hpbGRcblxuICBpZiAocHJvdG9Qcm9wcyAmJiBwcm90b1Byb3BzLmNvbnN0cnVjdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICBjaGlsZCA9IHByb3RvUHJvcHMuY29uc3RydWN0b3JcbiAgfSBlbHNlIHtcbiAgICBjaGlsZCA9IGZ1bmN0aW9uKCl7IHJldHVybiBwYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfVxuICB9XG5cbiAgYXNzaWduKGNoaWxkLCBwYXJlbnQsIHN0YXRpY1Byb3BzKVxuXG4gIHZhciBTdXJyb2dhdGUgPSBmdW5jdGlvbigpeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH1cbiAgU3Vycm9nYXRlLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGVcbiAgY2hpbGQucHJvdG90eXBlID0gbmV3IFN1cnJvZ2F0ZSgpXG5cbiAgaWYgKHByb3RvUHJvcHMpIGFzc2lnbihjaGlsZC5wcm90b3R5cGUsIHByb3RvUHJvcHMpXG5cbiAgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZVxuXG4gIGNoaWxkLnN1cGVyID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBwYXJlbnQucHJvdG90eXBlW25hbWVdXG4gIH1cblxuICBjaGlsZC5wcm90b3R5cGUuZ2V0Q2xhc3MgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gY2hpbGRcbiAgfVxuXG4gIHJldHVybiBjaGlsZFxufVxuXG52YXIgZm9ybWF0VGltZSA9IGZ1bmN0aW9uKHRpbWUpIHtcbiAgICB0aW1lID0gdGltZSAqIDEwMDBcbiAgICB0aW1lID0gcGFyc2VJbnQodGltZS8xMDAwKVxuICAgIHZhciBzZWNvbmRzID0gdGltZSAlIDYwXG4gICAgdGltZSA9IHBhcnNlSW50KHRpbWUvNjApXG4gICAgdmFyIG1pbnV0ZXMgPSB0aW1lICUgNjBcbiAgICB0aW1lID0gcGFyc2VJbnQodGltZS82MClcbiAgICB2YXIgaG91cnMgPSB0aW1lICUgMjRcbiAgICB2YXIgb3V0ID0gXCJcIlxuICAgIGlmIChob3VycyAmJiBob3VycyA+IDApIG91dCArPSAoXCIwXCIgKyBob3Vycykuc2xpY2UoLTIpICsgXCI6XCJcbiAgICBvdXQgKz0gKFwiMFwiICsgbWludXRlcykuc2xpY2UoLTIpICsgXCI6XCJcbiAgICBvdXQgKz0gKFwiMFwiICsgc2Vjb25kcykuc2xpY2UoLTIpXG4gICAgcmV0dXJuIG91dC50cmltKClcbn1cblxudmFyIEZ1bGxzY3JlZW4gPSB7XG4gIGlzRnVsbHNjcmVlbjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8XG4gICAgICBkb2N1bWVudC53ZWJraXRJc0Z1bGxTY3JlZW4gfHxcbiAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW4gfHxcbiAgICAgICEhZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudFxuICAgIClcbiAgfSxcbiAgcmVxdWVzdEZ1bGxzY3JlZW46IGZ1bmN0aW9uKGVsKSB7XG4gICAgaWYoZWwucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGVsLnJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYoZWwud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGVsLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYoZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgIGVsLm1velJlcXVlc3RGdWxsU2NyZWVuKClcbiAgICB9IGVsc2UgaWYoZWwubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgZWwubXNSZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmIChlbC5xdWVyeVNlbGVjdG9yICYmIGVsLnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKS53ZWJraXRFbnRlckZ1bGxTY3JlZW4pIHtcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKS53ZWJraXRFbnRlckZ1bGxTY3JlZW4oKVxuICAgIH1cbiAgfSxcbiAgY2FuY2VsRnVsbHNjcmVlbjogZnVuY3Rpb24oKSB7XG4gICAgaWYoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbigpXG4gICAgfSBlbHNlIGlmKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKVxuICAgIH0gZWxzZSBpZihkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgICBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKClcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgQ29uZmlnIHtcblxuICBzdGF0aWMgX2RlZmF1bHRDb25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZvbHVtZToge1xuICAgICAgICB2YWx1ZTogMTAwLFxuICAgICAgICBwYXJzZTogcGFyc2VJbnRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgX2RlZmF1bHRWYWx1ZUZvcihrZXkpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRDb25maWcoKVtrZXldWydwYXJzZSddKHRoaXMuX2RlZmF1bHRDb25maWcoKVtrZXldWyd2YWx1ZSddKVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBfY3JlYXRlX2tleXNwYWNlKGtleSl7XG4gICAgcmV0dXJuICdjbGFwcHIuJyArIGRvY3VtZW50LmRvbWFpbiArICcuJyArIGtleVxuICB9XG5cbiAgc3RhdGljIHJlc3RvcmUoa2V5KSB7XG4gICAgaWYgKEJyb3dzZXIuaGFzTG9jYWxzdG9yYWdlICYmIGxvY2FsU3RvcmFnZVt0aGlzLl9jcmVhdGVfa2V5c3BhY2Uoa2V5KV0pe1xuICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRDb25maWcoKVtrZXldWydwYXJzZSddKGxvY2FsU3RvcmFnZVt0aGlzLl9jcmVhdGVfa2V5c3BhY2Uoa2V5KV0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kZWZhdWx0VmFsdWVGb3Ioa2V5KVxuICB9XG5cbiAgc3RhdGljIHBlcnNpc3Qoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChCcm93c2VyLmhhc0xvY2Fsc3RvcmFnZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlW3RoaXMuX2NyZWF0ZV9rZXlzcGFjZShrZXkpXSA9IHZhbHVlXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbnZhciBzZWVrU3RyaW5nVG9TZWNvbmRzID0gZnVuY3Rpb24odXJsKSB7XG4gIHZhciBlbGVtZW50cyA9ICh1cmwubWF0Y2goL3Q9KFswLTldKmgpPyhbMC05XSptKT8oWzAtOV0qcyk/LykgfHwgW10pLnNwbGljZSgxKVxuICByZXR1cm4gKCEhZWxlbWVudHMubGVuZ3RoKT8gZWxlbWVudHMubWFwKGZ1bmN0aW9uIChlbCkge1xuICAgIGlmIChlbCkge1xuICAgICAgdmFyIHZhbHVlID0gcGFyc2VJbnQoZWwuc2xpY2UoMCwyKSkgfHwgMFxuICAgICAgc3dpdGNoIChlbFtlbC5sZW5ndGgtMV0pIHtcbiAgICAgICAgY2FzZSAnaCc6IHZhbHVlID0gdmFsdWUgKiAzNjAwOyBicmVha1xuICAgICAgICBjYXNlICdtJzogdmFsdWUgPSB2YWx1ZSAqIDYwOyBicmVha1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH0pLnJlZHVjZShmdW5jdGlvbiAoYSxiKSB7IHJldHVybiBhK2I7IH0pOiAwXG59XG5cbnZhciBpZHNDb3VudGVyID0ge31cblxudmFyIHVuaXF1ZUlkID0gZnVuY3Rpb24ocHJlZml4KSB7XG4gIGlkc0NvdW50ZXJbcHJlZml4XSB8fCAoaWRzQ291bnRlcltwcmVmaXhdID0gMClcbiAgdmFyIGlkID0gKytpZHNDb3VudGVyW3ByZWZpeF1cbiAgcmV0dXJuIHByZWZpeCArIGlkXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBleHRlbmQ6IGV4dGVuZCxcbiAgZm9ybWF0VGltZTogZm9ybWF0VGltZSxcbiAgRnVsbHNjcmVlbjogRnVsbHNjcmVlbixcbiAgQ29uZmlnOiBDb25maWcsXG4gIHNlZWtTdHJpbmdUb1NlY29uZHM6IHNlZWtTdHJpbmdUb1NlY29uZHMsXG4gIHVuaXF1ZUlkOiB1bmlxdWVJZFxufVxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuLyoqXG4gKiBDb250YWluZXIgaXMgcmVzcG9uc2libGUgZm9yIHRoZSB2aWRlbyByZW5kZXJpbmcgYW5kIHN0YXRlXG4gKi9cblxudmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91aV9vYmplY3QnKTtcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcbnZhciBmaW5kID0gcmVxdWlyZSgnbG9kYXNoLmZpbmQnKVxuXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ0NvbnRhaW5lcicgfVxuICBnZXQgYXR0cmlidXRlcygpIHsgcmV0dXJuIHsgY2xhc3M6ICdjb250YWluZXInLCAnZGF0YS1jb250YWluZXInOiAnJyB9IH1cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4geydjbGljayc6ICdjbGlja2VkJywgJ21vdXNlZW50ZXInOiAnbW91c2VFbnRlcicsICdtb3VzZWxlYXZlJzogJ21vdXNlTGVhdmUnfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMucGxheWJhY2sgPSBvcHRpb25zLnBsYXliYWNrO1xuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLnBsYXliYWNrLnNldHRpbmdzO1xuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMubWVkaWFDb250cm9sRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnBsdWdpbnMgPSBbdGhpcy5wbGF5YmFja107XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1BST0dSRVNTLCB0aGlzLnByb2dyZXNzKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aGlzLnRpbWVVcGRhdGVkKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5yZWFkeSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfQlVGRkVSSU5HLCB0aGlzLmJ1ZmZlcmluZyk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgdGhpcy5idWZmZXJmdWxsKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19TRVRUSU5HU1VQREFURSwgdGhpcy5zZXR0aW5nc1VwZGF0ZSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfTE9BREVETUVUQURBVEEsIHRoaXMubG9hZGVkTWV0YWRhdGEpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0hJR0hERUZJTklUSU9OVVBEQVRFLCB0aGlzLmhpZ2hEZWZpbml0aW9uVXBkYXRlKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19CSVRSQVRFLCB0aGlzLnVwZGF0ZUJpdHJhdGUpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1BMQVlCQUNLU1RBVEUsIHRoaXMucGxheWJhY2tTdGF0ZUNoYW5nZWQpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0RWUiwgdGhpcy5wbGF5YmFja0R2clN0YXRlQ2hhbmdlZCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfTUVESUFDT05UUk9MX0RJU0FCTEUsIHRoaXMuZGlzYWJsZU1lZGlhQ29udHJvbCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfTUVESUFDT05UUk9MX0VOQUJMRSwgdGhpcy5lbmFibGVNZWRpYUNvbnRyb2wpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0VOREVELCB0aGlzLmVuZGVkKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19QTEFZLCB0aGlzLnBsYXlpbmcpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0VSUk9SLCB0aGlzLmVycm9yKTtcbiAgfVxuXG4gIHBsYXliYWNrU3RhdGVDaGFuZ2VkKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLU1RBVEUpO1xuICB9XG5cbiAgcGxheWJhY2tEdnJTdGF0ZUNoYW5nZWQoZHZySW5Vc2UpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5wbGF5YmFjay5zZXR0aW5nc1xuICAgIHRoaXMuZHZySW5Vc2UgPSBkdnJJblVzZVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLRFZSU1RBVEVDSEFOR0VELCBkdnJJblVzZSlcbiAgfVxuXG4gIHVwZGF0ZUJpdHJhdGUobmV3Qml0cmF0ZSkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0JJVFJBVEUsIG5ld0JpdHJhdGUpXG4gIH1cblxuICBzdGF0c1JlcG9ydChtZXRyaWNzKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU1RBVFNfUkVQT1JULCBtZXRyaWNzKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXliYWNrLmdldFBsYXliYWNrVHlwZSgpXG4gIH1cblxuICBpc0R2ckVuYWJsZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5wbGF5YmFjay5kdnJFbmFibGVkXG4gIH1cblxuICBpc0R2ckluVXNlKCkge1xuICAgIHJldHVybiAhIXRoaXMuZHZySW5Vc2VcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfREVTVFJPWUVELCB0aGlzLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucGxheWJhY2suZGVzdHJveSgpO1xuICAgIHRoaXMucGx1Z2lucy5mb3JFYWNoKChwbHVnaW4pID0+IHBsdWdpbi5kZXN0cm95KCkpXG4gICAgdGhpcy4kZWwucmVtb3ZlKCk7XG4gIH1cblxuICBzZXRTdHlsZShzdHlsZSkge1xuICAgIHRoaXMuJGVsLmNzcyhzdHlsZSk7XG4gIH1cblxuICBhbmltYXRlKHN0eWxlLCBkdXJhdGlvbikge1xuICAgIHJldHVybiB0aGlzLiRlbC5hbmltYXRlKHN0eWxlLCBkdXJhdGlvbikucHJvbWlzZSgpO1xuICB9XG5cbiAgcmVhZHkoKSB7XG4gICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9SRUFEWSwgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFjay5pc1BsYXlpbmcoKTtcbiAgfVxuXG4gIGdldER1cmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXliYWNrLmdldER1cmF0aW9uKCk7XG4gIH1cblxuICBlcnJvcihlcnJvck9iaikge1xuICAgIHRoaXMuJGVsLmFwcGVuZChlcnJvck9iai5yZW5kZXIoKS5lbClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9FUlJPUiwge2Vycm9yOiBlcnJvck9iaiwgY29udGFpbmVyOiB0aGlzfSwgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGxvYWRlZE1ldGFkYXRhKGR1cmF0aW9uKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfTE9BREVETUVUQURBVEEsIGR1cmF0aW9uKTtcbiAgfVxuXG4gIHRpbWVVcGRhdGVkKHBvc2l0aW9uLCBkdXJhdGlvbikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1RJTUVVUERBVEUsIHBvc2l0aW9uLCBkdXJhdGlvbiwgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIHByb2dyZXNzKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uLCBkdXJhdGlvbikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BST0dSRVNTLCBzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbiwgZHVyYXRpb24sIHRoaXMubmFtZSk7XG4gIH1cblxuICBwbGF5aW5nKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BMQVksIHRoaXMubmFtZSk7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMucGxheWJhY2sucGxheSgpO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucGxheWJhY2suc3RvcCgpO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUEFVU0UsIHRoaXMubmFtZSk7XG4gICAgdGhpcy5wbGF5YmFjay5wYXVzZSgpO1xuICB9XG5cbiAgZW5kZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfRU5ERUQsIHRoaXMsIHRoaXMubmFtZSk7XG4gIH1cblxuICBjbGlja2VkKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0NMSUNLLCB0aGlzLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgc2V0Q3VycmVudFRpbWUodGltZSkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NFRUssIHRpbWUsIHRoaXMubmFtZSk7XG4gICAgdGhpcy5wbGF5YmFjay5zZWVrKHRpbWUpO1xuICB9XG5cbiAgc2V0Vm9sdW1lKHZhbHVlKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfVk9MVU1FLCB2YWx1ZSwgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnBsYXliYWNrLnZvbHVtZSh2YWx1ZSk7XG4gIH1cblxuICBmdWxsc2NyZWVuKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0ZVTExTQ1JFRU4sIHRoaXMubmFtZSk7XG4gIH1cblxuICBidWZmZXJpbmcoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSSU5HLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgYnVmZmVyZnVsbCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgYWRkUGx1Z2luKHBsdWdpbikge1xuICAgIHRoaXMucGx1Z2lucy5wdXNoKHBsdWdpbik7XG4gIH1cblxuICBoYXNQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiAhIXRoaXMuZ2V0UGx1Z2luKG5hbWUpO1xuICB9XG5cbiAgZ2V0UGx1Z2luKG5hbWUpIHtcbiAgICByZXR1cm4gZmluZCh0aGlzLnBsdWdpbnMsIChwbHVnaW4pID0+IHsgcmV0dXJuIHBsdWdpbi5uYW1lID09PSBuYW1lIH0pO1xuICB9XG5cbiAgbW91c2VFbnRlcigpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9NT1VTRV9FTlRFUilcbiAgfVxuXG4gIG1vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfTU9VU0VfTEVBVkUpXG4gIH1cblxuICBzZXR0aW5nc1VwZGF0ZSgpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5wbGF5YmFjay5zZXR0aW5ncztcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9TRVRUSU5HU1VQREFURSk7XG4gIH1cblxuICBoaWdoRGVmaW5pdGlvblVwZGF0ZSgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9ISUdIREVGSU5JVElPTlVQREFURSk7XG4gIH1cblxuICBpc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWJhY2suaXNIaWdoRGVmaW5pdGlvbkluVXNlKClcbiAgfVxuXG4gIGRpc2FibGVNZWRpYUNvbnRyb2woKSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2xEaXNhYmxlZCA9IHRydWU7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfTUVESUFDT05UUk9MX0RJU0FCTEUpO1xuICB9XG5cbiAgZW5hYmxlTWVkaWFDb250cm9sKCkge1xuICAgIHRoaXMubWVkaWFDb250cm9sRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRU5BQkxFKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IoJ2NvbnRhaW5lcicpO1xuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSk7XG4gICAgdGhpcy4kZWwuYXBwZW5kKHRoaXMucGxheWJhY2sucmVuZGVyKCkuZWwpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuLyoqXG4gKiBUaGUgQ29udGFpbmVyRmFjdG9yeSBpcyByZXNwb25zaWJsZSBmb3IgbWFuYWdlIHBsYXliYWNrIGJvb3RzdHJhcCBhbmQgY3JlYXRlIGNvbnRhaW5lcnMuXG4gKi9cblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2xvZGFzaC5hc3NpZ24nKTtcbnZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9iYXNlX29iamVjdCcpO1xudmFyIENvbnRhaW5lciA9IHJlcXVpcmUoJy4uL2NvbnRhaW5lcicpO1xudmFyICQgPSByZXF1aXJlKCdjbGFwcHItemVwdG8nKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpO1xudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpO1xuXG5jbGFzcyBDb250YWluZXJGYWN0b3J5IGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMsIGxvYWRlcikge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5sb2FkZXIgPSBsb2FkZXI7XG4gIH1cblxuICBjcmVhdGVDb250YWluZXJzKCkge1xuICAgIHJldHVybiAkLkRlZmVycmVkKChwcm9taXNlKSA9PiB7XG4gICAgICBwcm9taXNlLnJlc29sdmUodGhpcy5vcHRpb25zLnNvdXJjZXMubWFwKChzb3VyY2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ29udGFpbmVyKHNvdXJjZSk7XG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kUGxheWJhY2tQbHVnaW4oc291cmNlKSB7XG4gICAgcmV0dXJuIGZpbmQodGhpcy5sb2FkZXIucGxheWJhY2tQbHVnaW5zLCAocCkgPT4geyByZXR1cm4gcC5jYW5QbGF5KHNvdXJjZS50b1N0cmluZygpKSB9KVxuICB9XG5cbiAgY3JlYXRlQ29udGFpbmVyKHNvdXJjZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBhc3NpZ24oe30sIG9wdGlvbnMsIHRoaXMub3B0aW9ucywge3NyYzogc291cmNlLCBhdXRvUGxheTogISF0aGlzLm9wdGlvbnMuYXV0b1BsYXl9KVxuICAgIHZhciBwbGF5YmFja1BsdWdpbiA9IHRoaXMuZmluZFBsYXliYWNrUGx1Z2luKHNvdXJjZSlcbiAgICB2YXIgcGxheWJhY2sgPSBuZXcgcGxheWJhY2tQbHVnaW4ob3B0aW9ucylcbiAgICB2YXIgY29udGFpbmVyID0gbmV3IENvbnRhaW5lcih7cGxheWJhY2s6IHBsYXliYWNrfSlcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKClcbiAgICBkZWZlci5wcm9taXNlKGNvbnRhaW5lcilcbiAgICB0aGlzLmFkZENvbnRhaW5lclBsdWdpbnMoY29udGFpbmVyLCBzb3VyY2UpXG4gICAgdGhpcy5saXN0ZW5Ub09uY2UoY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1JFQURZLCAoKSA9PiBkZWZlci5yZXNvbHZlKGNvbnRhaW5lcikpXG4gICAgcmV0dXJuIGNvbnRhaW5lclxuICB9XG5cbiAgYWRkQ29udGFpbmVyUGx1Z2lucyhjb250YWluZXIsIHNvdXJjZSkge1xuICAgIHRoaXMubG9hZGVyLmNvbnRhaW5lclBsdWdpbnMuZm9yRWFjaCgoUGx1Z2luKSA9PiB7XG4gICAgICB2YXIgb3B0aW9ucyA9IGFzc2lnbih0aGlzLm9wdGlvbnMsIHtjb250YWluZXI6IGNvbnRhaW5lciwgc3JjOiBzb3VyY2V9KTtcbiAgICAgIGNvbnRhaW5lci5hZGRQbHVnaW4obmV3IFBsdWdpbihvcHRpb25zKSk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb250YWluZXJGYWN0b3J5O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2NvbnRhaW5lcl9mYWN0b3J5Jyk7XG5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogVGhlIENvcmUgaXMgcmVzcG9uc2libGUgdG8gbWFuYWdlIENvbnRhaW5lcnMsIHRoZSBtZWRpYXRvciwgTWVkaWFDb250cm9sXG4gKiBhbmQgdGhlIHBsYXllciBzdGF0ZS5cbiAqL1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgJCA9IHJlcXVpcmUoJ2NsYXBwci16ZXB0bycpXG5cbnZhciBVSU9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdWlfb2JqZWN0JylcbnZhciBDb250YWluZXJGYWN0b3J5ID0gcmVxdWlyZSgnLi4vY29udGFpbmVyX2ZhY3RvcnknKVxudmFyIEZ1bGxzY3JlZW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykuRnVsbHNjcmVlblxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBNZWRpYUNvbnRyb2wgPSByZXF1aXJlKCcuLi9tZWRpYV9jb250cm9sJylcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgnLi4vcGxheWVyX2luZm8nKVxudmFyIE1lZGlhdG9yID0gcmVxdWlyZSgnLi4vbWVkaWF0b3InKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcblxudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpXG5cbmNsYXNzIENvcmUgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJzogJ2V4aXQnLFxuICAgICAgJ21vdXNlbW92ZSc6ICdzaG93TWVkaWFDb250cm9sJyxcbiAgICAgICdtb3VzZWxlYXZlJzogJ2hpZGVNZWRpYUNvbnRyb2wnXG4gICAgfVxuICB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkYXRhLXBsYXllcic6ICcnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgUGxheWVySW5mby5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLnBsdWdpbnMgPSBbXVxuICAgIHRoaXMuY29udGFpbmVycyA9IFtdXG4gICAgdGhpcy5jcmVhdGVDb250YWluZXJzKG9wdGlvbnMpXG4gICAgLy9GSVhNRSBmdWxsc2NyZWVuIGFwaSBzdWNrc1xuICAgICQoZG9jdW1lbnQpLmJpbmQoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCAoKSA9PiB0aGlzLmV4aXQoKSlcbiAgICAkKGRvY3VtZW50KS5iaW5kKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCAoKSA9PiB0aGlzLmV4aXQoKSlcbiAgICAkKGRvY3VtZW50KS5iaW5kKCdtb3pmdWxsc2NyZWVuY2hhbmdlJywgKCkgPT4gdGhpcy5leGl0KCkpXG4gIH1cblxuICBjcmVhdGVDb250YWluZXJzKG9wdGlvbnMpIHtcbiAgICB0aGlzLmRlZmVyID0gJC5EZWZlcnJlZCgpXG4gICAgdGhpcy5kZWZlci5wcm9taXNlKHRoaXMpXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5ID0gbmV3IENvbnRhaW5lckZhY3Rvcnkob3B0aW9ucywgb3B0aW9ucy5sb2FkZXIpXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5XG4gICAgICAuY3JlYXRlQ29udGFpbmVycygpXG4gICAgICAudGhlbigoY29udGFpbmVycykgPT4gdGhpcy5zZXR1cENvbnRhaW5lcnMoY29udGFpbmVycykpXG4gICAgICAudGhlbigoY29udGFpbmVycykgPT4gdGhpcy5yZXNvbHZlT25Db250YWluZXJzUmVhZHkoY29udGFpbmVycykpXG4gIH1cblxuICB1cGRhdGVTaXplKCkge1xuICAgIGlmIChGdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpKSB7XG4gICAgICB0aGlzLnNldEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFBsYXllclNpemUoKVxuICAgIH1cbiAgICBNZWRpYXRvci50cmlnZ2VyKEV2ZW50cy5QTEFZRVJfUkVTSVpFKVxuICB9XG5cbiAgc2V0RnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLiRlbC5hZGRDbGFzcygnZnVsbHNjcmVlbicpXG4gICAgdGhpcy4kZWwucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgIFBsYXllckluZm8ucHJldmlvdXNTaXplID0gUGxheWVySW5mby5jdXJyZW50U2l6ZVxuICAgIFBsYXllckluZm8uY3VycmVudFNpemUgPSB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfVxuICB9XG5cbiAgc2V0UGxheWVyU2l6ZSgpIHtcbiAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnZnVsbHNjcmVlbicpXG4gICAgUGxheWVySW5mby5jdXJyZW50U2l6ZSA9IFBsYXllckluZm8ucHJldmlvdXNTaXplXG4gICAgUGxheWVySW5mby5wcmV2aW91c1NpemUgPSB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfVxuICAgIHRoaXMucmVzaXplKFBsYXllckluZm8uY3VycmVudFNpemUpXG4gIH1cblxuICByZXNpemUob3B0aW9ucykge1xuICAgIHRoaXMuZWwuc3R5bGUuaGVpZ2h0ID0gYCR7b3B0aW9ucy5oZWlnaHR9cHhgO1xuICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBgJHtvcHRpb25zLndpZHRofXB4YDtcbiAgICBQbGF5ZXJJbmZvLnByZXZpb3VzU2l6ZSA9IFBsYXllckluZm8uY3VycmVudFNpemVcbiAgICBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplID0gb3B0aW9uc1xuICAgIE1lZGlhdG9yLnRyaWdnZXIoRXZlbnRzLlBMQVlFUl9SRVNJWkUpXG4gIH1cblxuICByZXNvbHZlT25Db250YWluZXJzUmVhZHkoY29udGFpbmVycykge1xuICAgICQud2hlbi5hcHBseSgkLCBjb250YWluZXJzKS5kb25lKCgpID0+dGhpcy5kZWZlci5yZXNvbHZlKHRoaXMpKVxuICB9XG5cbiAgYWRkUGx1Z2luKHBsdWdpbikge1xuICAgIHRoaXMucGx1Z2lucy5wdXNoKHBsdWdpbilcbiAgfVxuXG4gIGhhc1BsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuICEhdGhpcy5nZXRQbHVnaW4obmFtZSlcbiAgfVxuXG4gIGdldFBsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuIGZpbmQodGhpcy5wbHVnaW5zLCAocGx1Z2luKSA9PiBwbHVnaW4ubmFtZSA9PT0gbmFtZSlcbiAgfVxuXG4gIGxvYWQoc291cmNlcykge1xuICAgIHNvdXJjZXMgPSBzb3VyY2VzICYmIHNvdXJjZXMuY29uc3RydWN0b3IgPT09IEFycmF5ID8gc291cmNlcyA6IFtzb3VyY2VzLnRvU3RyaW5nKCldO1xuICAgIHRoaXMuY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IGNvbnRhaW5lci5kZXN0cm95KCkpXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5Lm9wdGlvbnMgPSBhc3NpZ24odGhpcy5vcHRpb25zLCB7c291cmNlc30pXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5LmNyZWF0ZUNvbnRhaW5lcnMoKS50aGVuKChjb250YWluZXJzKSA9PiB7XG4gICAgICB0aGlzLnNldHVwQ29udGFpbmVycyhjb250YWluZXJzKVxuICAgIH0pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IGNvbnRhaW5lci5kZXN0cm95KCkpXG4gICAgdGhpcy5wbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4gcGx1Z2luLmRlc3Ryb3koKSlcbiAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICAgIHRoaXMubWVkaWFDb250cm9sLmRlc3Ryb3koKVxuICAgICQoZG9jdW1lbnQpLnVuYmluZCgnZnVsbHNjcmVlbmNoYW5nZScpXG4gICAgJChkb2N1bWVudCkudW5iaW5kKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnKVxuICAgICQoZG9jdW1lbnQpLnVuYmluZCgnbW96ZnVsbHNjcmVlbmNoYW5nZScpXG59XG5cbiAgZXhpdCgpIHtcbiAgICB0aGlzLnVwZGF0ZVNpemUoKVxuICAgIHRoaXMubWVkaWFDb250cm9sLnNob3coKVxuICB9XG5cbiAgc2V0TWVkaWFDb250cm9sQ29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMubWVkaWFDb250cm9sLnNldENvbnRhaW5lcihjb250YWluZXIpXG4gICAgdGhpcy5tZWRpYUNvbnRyb2wucmVuZGVyKClcbiAgfVxuXG4gIGRpc2FibGVNZWRpYUNvbnRyb2woKSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuZGlzYWJsZSgpXG4gICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ25vY3Vyc29yJylcbiAgfVxuXG4gIGVuYWJsZU1lZGlhQ29udHJvbCgpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5lbmFibGUoKVxuICB9XG5cbiAgcmVtb3ZlQ29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZyhjb250YWluZXIpXG4gICAgdGhpcy5jb250YWluZXJzID0gdGhpcy5jb250YWluZXJzLmZpbHRlcigoYykgPT4gYyAhPT0gY29udGFpbmVyKVxuICB9XG5cbiAgYXBwZW5kQ29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMubGlzdGVuVG8oY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCwgdGhpcy5yZW1vdmVDb250YWluZXIpXG4gICAgdGhpcy5lbC5hcHBlbmRDaGlsZChjb250YWluZXIucmVuZGVyKCkuZWwpXG4gICAgdGhpcy5jb250YWluZXJzLnB1c2goY29udGFpbmVyKVxuICB9XG5cbiAgc2V0dXBDb250YWluZXJzKGNvbnRhaW5lcnMpIHtcbiAgICBjb250YWluZXJzLm1hcCh0aGlzLmFwcGVuZENvbnRhaW5lci5iaW5kKHRoaXMpKVxuICAgIHRoaXMuc2V0dXBNZWRpYUNvbnRyb2wodGhpcy5nZXRDdXJyZW50Q29udGFpbmVyKCkpXG4gICAgdGhpcy5yZW5kZXIoKVxuICAgIHRoaXMuJGVsLmFwcGVuZFRvKHRoaXMub3B0aW9ucy5wYXJlbnRFbGVtZW50KVxuICAgIHJldHVybiBjb250YWluZXJzXG4gIH1cblxuICBjcmVhdGVDb250YWluZXIoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyRmFjdG9yeS5jcmVhdGVDb250YWluZXIoc291cmNlLCBvcHRpb25zKVxuICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKGNvbnRhaW5lcilcbiAgICByZXR1cm4gY29udGFpbmVyXG4gIH1cblxuICBzZXR1cE1lZGlhQ29udHJvbChjb250YWluZXIpIHtcbiAgICBpZiAodGhpcy5tZWRpYUNvbnRyb2wpIHtcbiAgICAgIHRoaXMubWVkaWFDb250cm9sLnNldENvbnRhaW5lcihjb250YWluZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWVkaWFDb250cm9sID0gdGhpcy5jcmVhdGVNZWRpYUNvbnRyb2woYXNzaWduKHtjb250YWluZXI6IGNvbnRhaW5lcn0sIHRoaXMub3B0aW9ucykpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX0ZVTExTQ1JFRU4sIHRoaXMudG9nZ2xlRnVsbHNjcmVlbilcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tZWRpYUNvbnRyb2wsIEV2ZW50cy5NRURJQUNPTlRST0xfU0hPVywgdGhpcy5vbk1lZGlhQ29udHJvbFNob3cuYmluZCh0aGlzLCB0cnVlKSlcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tZWRpYUNvbnRyb2wsIEV2ZW50cy5NRURJQUNPTlRST0xfSElERSwgdGhpcy5vbk1lZGlhQ29udHJvbFNob3cuYmluZCh0aGlzLCBmYWxzZSkpXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlTWVkaWFDb250cm9sKG9wdGlvbnMpIHtcbiAgICBpZihvcHRpb25zLm1lZGlhY29udHJvbCAmJiBvcHRpb25zLm1lZGlhY29udHJvbC5leHRlcm5hbCkge1xuICAgICAgcmV0dXJuIG5ldyBvcHRpb25zLm1lZGlhY29udHJvbC5leHRlcm5hbChvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBNZWRpYUNvbnRyb2wob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q3VycmVudENvbnRhaW5lcigpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXJzWzBdXG4gIH1cblxuICB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgIGlmICghRnVsbHNjcmVlbi5pc0Z1bGxzY3JlZW4oKSkge1xuICAgICAgRnVsbHNjcmVlbi5yZXF1ZXN0RnVsbHNjcmVlbih0aGlzLmVsKVxuICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2Z1bGxzY3JlZW4nKVxuICAgIH0gZWxzZSB7XG4gICAgICBGdWxsc2NyZWVuLmNhbmNlbEZ1bGxzY3JlZW4oKVxuICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2Z1bGxzY3JlZW4gbm9jdXJzb3InKVxuICAgIH1cbiAgICB0aGlzLm1lZGlhQ29udHJvbC5zaG93KClcbiAgfVxuXG4gIHNob3dNZWRpYUNvbnRyb2woZXZlbnQpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5zaG93KGV2ZW50KVxuICB9XG5cbiAgaGlkZU1lZGlhQ29udHJvbChldmVudCkge1xuICAgIHRoaXMubWVkaWFDb250cm9sLmhpZGUoZXZlbnQpXG4gIH1cblxuICBvbk1lZGlhQ29udHJvbFNob3coc2hvd2luZykge1xuICAgIGlmIChzaG93aW5nKVxuICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ25vY3Vyc29yJylcbiAgICBlbHNlIGlmIChGdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpKVxuICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ25vY3Vyc29yJylcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IoJ2NvcmUnKVxuICAgIC8vRklYTUVcbiAgICAvL3RoaXMuJGVsLmVtcHR5KClcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHRoaXMubWVkaWFDb250cm9sLnJlbmRlcigpLmVsKVxuXG4gICAgdGhpcy5vcHRpb25zLndpZHRoID0gdGhpcy5vcHRpb25zLndpZHRoIHx8IHRoaXMuJGVsLndpZHRoKClcbiAgICB0aGlzLm9wdGlvbnMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLmhlaWdodCB8fCB0aGlzLiRlbC5oZWlnaHQoKVxuICAgIHZhciBzaXplID0ge3dpZHRoOiB0aGlzLm9wdGlvbnMud2lkdGgsIGhlaWdodDogdGhpcy5vcHRpb25zLmhlaWdodH1cbiAgICBQbGF5ZXJJbmZvLnByZXZpb3VzU2l6ZSA9IFBsYXllckluZm8uY3VycmVudFNpemUgPSBzaXplXG4gICAgdGhpcy51cGRhdGVTaXplKClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIFRoZSBDb3JlIEZhY3RvcnkgaXMgcmVzcG9uc2libGUgZm9yIGluc3RhbnRpYXRlIHRoZSBjb3JlIGFuZCBpdCdzIHBsdWdpbnMuXG4gKi9cblxudmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2Jhc2Vfb2JqZWN0Jyk7XG52YXIgQ29yZSA9IHJlcXVpcmUoJy4uL2NvcmUnKTtcblxuY2xhc3MgQ29yZUZhY3RvcnkgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcbiAgY29uc3RydWN0b3IocGxheWVyLCBsb2FkZXIpIHtcbiAgICB0aGlzLnBsYXllciA9IHBsYXllclxuICAgIHRoaXMub3B0aW9ucyA9IHBsYXllci5vcHRpb25zXG4gICAgdGhpcy5sb2FkZXIgPSBsb2FkZXJcbiAgICB0aGlzLm9wdGlvbnMubG9hZGVyID0gdGhpcy5sb2FkZXJcbiAgfVxuXG4gIGNyZWF0ZSgpIHtcbiAgICB0aGlzLmNvcmUgPSBuZXcgQ29yZSh0aGlzLm9wdGlvbnMpXG4gICAgdGhpcy5jb3JlLnRoZW4odGhpcy5hZGRDb3JlUGx1Z2lucy5iaW5kKHRoaXMpKVxuICAgIHJldHVybiB0aGlzLmNvcmVcbiAgfVxuXG4gIGFkZENvcmVQbHVnaW5zKCkge1xuICAgIHRoaXMubG9hZGVyLmNvcmVQbHVnaW5zLmZvckVhY2goKFBsdWdpbikgPT4ge1xuICAgICAgdmFyIHBsdWdpbiA9IG5ldyBQbHVnaW4odGhpcy5jb3JlKVxuICAgICAgdGhpcy5jb3JlLmFkZFBsdWdpbihwbHVnaW4pXG4gICAgICB0aGlzLnNldHVwRXh0ZXJuYWxJbnRlcmZhY2UocGx1Z2luKVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuY29yZVxuICB9XG5cbiAgc2V0dXBFeHRlcm5hbEludGVyZmFjZShwbHVnaW4pIHtcbiAgICB2YXIgZXh0ZXJuYWxGdW5jdGlvbnMgPSBwbHVnaW4uZ2V0RXh0ZXJuYWxJbnRlcmZhY2UoKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gZXh0ZXJuYWxGdW5jdGlvbnMpIHtcbiAgICAgIHRoaXMucGxheWVyW2tleV0gPSBleHRlcm5hbEZ1bmN0aW9uc1trZXldLmJpbmQocGx1Z2luKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvcmVGYWN0b3J5O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2NvcmVfZmFjdG9yeScpO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbG9hZGVyJyk7XG5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9iYXNlX29iamVjdCcpXG52YXIgUGxheWVySW5mbyA9IHJlcXVpcmUoJy4uL3BsYXllcl9pbmZvJylcbnZhciB1bmlxID0gcmVxdWlyZSgnbG9kYXNoLnVuaXEnKVxuXG4vKiBQbGF5YmFjayBQbHVnaW5zICovXG52YXIgSFRNTDVWaWRlb1BsYXliYWNrID0gcmVxdWlyZSgnLi4vLi4vcGxheWJhY2tzL2h0bWw1X3ZpZGVvJyk7XG52YXIgRmxhc2hWaWRlb1BsYXliYWNrID0gcmVxdWlyZSgnLi4vLi4vcGxheWJhY2tzL2ZsYXNoJyk7XG52YXIgSFRNTDVBdWRpb1BsYXliYWNrID0gcmVxdWlyZSgnLi4vLi4vcGxheWJhY2tzL2h0bWw1X2F1ZGlvJyk7XG52YXIgSExTVmlkZW9QbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9obHMnKTtcbnZhciBIVE1MSW1nUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9wbGF5YmFja3MvaHRtbF9pbWcnKTtcbnZhciBOb09wID0gcmVxdWlyZSgnLi4vLi4vcGxheWJhY2tzL25vX29wJyk7XG5cbi8qIENvbnRhaW5lciBQbHVnaW5zICovXG52YXIgU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9zcGlubmVyX3RocmVlX2JvdW5jZScpO1xudmFyIFN0YXRzUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9zdGF0cycpO1xudmFyIFdhdGVyTWFya1BsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvd2F0ZXJtYXJrJyk7XG52YXIgUG9zdGVyUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9wb3N0ZXInKTtcbnZhciBHb29nbGVBbmFseXRpY3NQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9wbHVnaW5zL2dvb2dsZV9hbmFseXRpY3MnKTtcbnZhciBDbGlja1RvUGF1c2VQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9wbHVnaW5zL2NsaWNrX3RvX3BhdXNlJyk7XG5cbi8qIENvcmUgUGx1Z2lucyAqL1xudmFyIERWUkNvbnRyb2xzID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9kdnJfY29udHJvbHMnKTtcblxuY2xhc3MgTG9hZGVyIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKGV4dGVybmFsUGx1Z2lucykge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnBsYXliYWNrUGx1Z2lucyA9IFtIVE1MNVZpZGVvUGxheWJhY2ssIEZsYXNoVmlkZW9QbGF5YmFjaywgSFRNTDVBdWRpb1BsYXliYWNrLCBITFNWaWRlb1BsYXliYWNrLCBIVE1MSW1nUGxheWJhY2ssIE5vT3BdXG4gICAgdGhpcy5jb250YWluZXJQbHVnaW5zID0gW1NwaW5uZXJUaHJlZUJvdW5jZVBsdWdpbiwgV2F0ZXJNYXJrUGx1Z2luLCBQb3N0ZXJQbHVnaW4sIFN0YXRzUGx1Z2luLCBHb29nbGVBbmFseXRpY3NQbHVnaW4sIENsaWNrVG9QYXVzZVBsdWdpbl1cbiAgICB0aGlzLmNvcmVQbHVnaW5zID0gW0RWUkNvbnRyb2xzXVxuICAgIGlmIChleHRlcm5hbFBsdWdpbnMpIHtcbiAgICAgIHRoaXMuYWRkRXh0ZXJuYWxQbHVnaW5zKGV4dGVybmFsUGx1Z2lucylcbiAgICB9XG4gIH1cblxuICBhZGRFeHRlcm5hbFBsdWdpbnMocGx1Z2lucykge1xuICAgIHZhciBwbHVnaW5OYW1lID0gZnVuY3Rpb24ocGx1Z2luKSB7IHJldHVybiBwbHVnaW4ucHJvdG90eXBlLm5hbWUgfVxuICAgIGlmIChwbHVnaW5zLnBsYXliYWNrKSB7IHRoaXMucGxheWJhY2tQbHVnaW5zID0gdW5pcShwbHVnaW5zLnBsYXliYWNrLmNvbmNhdCh0aGlzLnBsYXliYWNrUGx1Z2lucyksIHBsdWdpbk5hbWUpIH1cbiAgICBpZiAocGx1Z2lucy5jb250YWluZXIpIHsgdGhpcy5jb250YWluZXJQbHVnaW5zID0gdW5pcShwbHVnaW5zLmNvbnRhaW5lci5jb25jYXQodGhpcy5jb250YWluZXJQbHVnaW5zKSwgcGx1Z2luTmFtZSkgfVxuICAgIGlmIChwbHVnaW5zLmNvcmUpIHsgdGhpcy5jb3JlUGx1Z2lucyA9IHVuaXEocGx1Z2lucy5jb3JlLmNvbmNhdCh0aGlzLmNvcmVQbHVnaW5zKSwgcGx1Z2luTmFtZSkgfVxuICAgIFBsYXllckluZm8ucGxheWJhY2tQbHVnaW5zID0gdGhpcy5wbGF5YmFja1BsdWdpbnNcbiAgfVxuXG4gIGdldFBsdWdpbihuYW1lKSB7XG4gICAgdmFyIGFsbFBsdWdpbnMgPSB0aGlzLmNvbnRhaW5lclBsdWdpbnMuY29uY2F0KHRoaXMucGxheWJhY2tQbHVnaW5zKS5jb25jYXQodGhpcy5jb3JlUGx1Z2lucylcbiAgICByZXR1cm4gYWxsUGx1Z2lucy5maW5kKChwbHVnaW4pID0+IHsgcmV0dXJuIHBsdWdpbi5wcm90b3R5cGUubmFtZSA9PT0gbmFtZSB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuLyoqXG4gKiBUaGUgTWVkaWFDb250cm9sIGlzIHJlc3BvbnNpYmxlIGZvciBkaXNwbGF5aW5nIHRoZSBQbGF5ZXIgY29udHJvbHMuXG4gKi9cblxudmFyICQgPSByZXF1aXJlKCdjbGFwcHItemVwdG8nKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgVUlPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3VpX29iamVjdCcpXG52YXIgVXRpbHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJylcbnZhciBCcm93c2VyID0gcmVxdWlyZSgnLi4vYnJvd3NlcicpXG52YXIgU2Vla1RpbWUgPSByZXF1aXJlKCcuLi9zZWVrX3RpbWUnKVxudmFyIE1lZGlhdG9yID0gcmVxdWlyZSgnLi4vbWVkaWF0b3InKVxudmFyIFBsYXllckluZm8gPSByZXF1aXJlKCcuLi9wbGF5ZXJfaW5mbycpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxudmFyIEtpYm8gPSByZXF1aXJlKCcuLi8uLi9iYXNlL2tpYm8nKVxuXG5jbGFzcyBNZWRpYUNvbnRyb2wgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ01lZGlhQ29udHJvbCcgfVxuXG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzczogJ21lZGlhLWNvbnRyb2wnLFxuICAgICAgJ2RhdGEtbWVkaWEtY29udHJvbCc6ICcnXG4gICAgfVxuICB9XG5cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsaWNrIFtkYXRhLXBsYXldJzogJ3BsYXknLFxuICAgICAgJ2NsaWNrIFtkYXRhLXBhdXNlXSc6ICdwYXVzZScsXG4gICAgICAnY2xpY2sgW2RhdGEtcGxheXBhdXNlXSc6ICd0b2dnbGVQbGF5UGF1c2UnLFxuICAgICAgJ2NsaWNrIFtkYXRhLXN0b3BdJzogJ3N0b3AnLFxuICAgICAgJ2NsaWNrIFtkYXRhLXBsYXlzdG9wXSc6ICd0b2dnbGVQbGF5U3RvcCcsXG4gICAgICAnY2xpY2sgW2RhdGEtZnVsbHNjcmVlbl0nOiAndG9nZ2xlRnVsbHNjcmVlbicsXG4gICAgICAnY2xpY2sgLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSc6ICdzZWVrJyxcbiAgICAgICdjbGljayAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0nOiAndm9sdW1lJyxcbiAgICAgICdjbGljayAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdJzogJ3RvZ2dsZU11dGUnLFxuICAgICAgJ21vdXNlZW50ZXIgLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdJzogJ3Nob3dWb2x1bWVCYXInLFxuICAgICAgJ21vdXNlbGVhdmUgLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdJzogJ2hpZGVWb2x1bWVCYXInLFxuICAgICAgJ21vdXNlZG93biAuYmFyLXNjcnViYmVyW2RhdGEtdm9sdW1lXSc6ICdzdGFydFZvbHVtZURyYWcnLFxuICAgICAgJ21vdXNlZG93biAuYmFyLXNjcnViYmVyW2RhdGEtc2Vla2Jhcl0nOiAnc3RhcnRTZWVrRHJhZycsXG4gICAgICAnbW91c2Vtb3ZlIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0nOiAnbW91c2Vtb3ZlT25TZWVrQmFyJyxcbiAgICAgICdtb3VzZWxlYXZlIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0nOiAnbW91c2VsZWF2ZU9uU2Vla0JhcicsXG4gICAgICAnbW91c2VlbnRlciAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSc6ICdzZXRLZWVwVmlzaWJsZScsXG4gICAgICAnbW91c2VsZWF2ZSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSc6ICdyZXNldEtlZXBWaXNpYmxlJ1xuICAgIH1cbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5tZWRpYV9jb250cm9sIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLmtpYm8gPSBuZXcgS2libygpXG4gICAgdGhpcy5zZWVrVGltZSA9IG5ldyBTZWVrVGltZSh0aGlzKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLm11dGUgPSB0aGlzLm9wdGlvbnMubXV0ZVxuICAgIHRoaXMucGVyc2lzdENvbmZpZyA9IHRoaXMub3B0aW9ucy5wZXJzaXN0Q29uZmlnXG4gICAgdGhpcy5jb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuICAgIHZhciBpbml0aWFsVm9sdW1lID0gKHRoaXMucGVyc2lzdENvbmZpZykgPyBVdGlscy5Db25maWcucmVzdG9yZShcInZvbHVtZVwiKSA6IDEwMDtcbiAgICB0aGlzLnNldFZvbHVtZSh0aGlzLm11dGUgPyAwIDogaW5pdGlhbFZvbHVtZSlcbiAgICB0aGlzLmtlZXBWaXNpYmxlID0gZmFsc2VcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKClcbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgbGVmdDogWydwbGF5JywgJ3N0b3AnLCAncGF1c2UnXSxcbiAgICAgIHJpZ2h0OiBbJ3ZvbHVtZSddLFxuICAgICAgZGVmYXVsdDogWydwb3NpdGlvbicsICdzZWVrYmFyJywgJ2R1cmF0aW9uJ11cbiAgICB9XG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5rZXlzKHRoaXMuY29udGFpbmVyLnNldHRpbmdzKS5sZW5ndGggPT09IDAgPyB0aGlzLnNldHRpbmdzIDogdGhpcy5jb250YWluZXIuc2V0dGluZ3NcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICBpZiAodGhpcy5jb250YWluZXIubWVkaWFDb250cm9sRGlzYWJsZWQgfHwgdGhpcy5vcHRpb25zLmNocm9tZWxlc3MpIHtcbiAgICAgIHRoaXMuZGlzYWJsZSgpXG4gICAgfVxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ21vdXNldXAnLCAoZXZlbnQpID0+IHRoaXMuc3RvcERyYWcoZXZlbnQpKVxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ21vdXNlbW92ZScsIChldmVudCkgPT4gdGhpcy51cGRhdGVEcmFnKGV2ZW50KSlcbiAgICBNZWRpYXRvci5vbihFdmVudHMuUExBWUVSX1JFU0laRSwgKCkgPT4gdGhpcy5wbGF5ZXJSZXNpemUoKSlcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWSwgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfVElNRVVQREFURSwgdGhpcy51cGRhdGVTZWVrQmFyKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUFJPR1JFU1MsIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TRVRUSU5HU1VQREFURSwgdGhpcy5zZXR0aW5nc1VwZGF0ZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLRFZSU1RBVEVDSEFOR0VELCB0aGlzLnNldHRpbmdzVXBkYXRlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfSElHSERFRklOSVRJT05VUERBVEUsIHRoaXMuaGlnaERlZmluaXRpb25VcGRhdGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRElTQUJMRSwgdGhpcy5kaXNhYmxlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfTUVESUFDT05UUk9MX0VOQUJMRSwgdGhpcy5lbmFibGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcy5lbmRlZClcbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICB0aGlzLmhpZGUoKVxuICAgIHRoaXMuJGVsLmhpZGUoKVxuICB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykgcmV0dXJuXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgdGhpcy5zaG93KClcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5jb250YWluZXIucGxheSgpXG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5wYXVzZSgpXG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuY29udGFpbmVyLnN0b3AoKVxuICB9XG5cbiAgY2hhbmdlVG9nZ2xlUGxheSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgIHRoaXMuJHBsYXlQYXVzZVRvZ2dsZS5yZW1vdmVDbGFzcygncGF1c2VkJykuYWRkQ2xhc3MoJ3BsYXlpbmcnKVxuICAgICAgdGhpcy4kcGxheVN0b3BUb2dnbGUucmVtb3ZlQ2xhc3MoJ3N0b3BwZWQnKS5hZGRDbGFzcygncGxheWluZycpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9QTEFZSU5HKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kcGxheVBhdXNlVG9nZ2xlLnJlbW92ZUNsYXNzKCdwbGF5aW5nJykuYWRkQ2xhc3MoJ3BhdXNlZCcpXG4gICAgICB0aGlzLiRwbGF5U3RvcFRvZ2dsZS5yZW1vdmVDbGFzcygncGxheWluZycpLmFkZENsYXNzKCdzdG9wcGVkJylcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX05PVFBMQVlJTkcpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlbW92ZU9uU2Vla0JhcihldmVudCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkge1xuICAgICAgdmFyIG9mZnNldFggPSBldmVudC5wYWdlWCAtIHRoaXMuJHNlZWtCYXJDb250YWluZXIub2Zmc2V0KCkubGVmdCAtICh0aGlzLiRzZWVrQmFySG92ZXIud2lkdGgoKSAvIDIpXG4gICAgICB0aGlzLiRzZWVrQmFySG92ZXIuY3NzKHtsZWZ0OiBvZmZzZXRYfSlcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VNT1ZFX1NFRUtCQVIsIGV2ZW50KTtcbiAgfVxuXG4gIG1vdXNlbGVhdmVPblNlZWtCYXIoZXZlbnQpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9NT1VTRUxFQVZFX1NFRUtCQVIsIGV2ZW50KTtcbiAgfVxuXG4gIHBsYXllclJlc2l6ZSgpIHtcbiAgICBpZiAoVXRpbHMuRnVsbHNjcmVlbi5pc0Z1bGxzY3JlZW4oKSkge1xuICAgICAgdGhpcy4kZnVsbHNjcmVlblRvZ2dsZS5hZGRDbGFzcygnc2hyaW5rJylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZnVsbHNjcmVlblRvZ2dsZS5yZW1vdmVDbGFzcygnc2hyaW5rJylcbiAgICB9XG4gICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ3czMjAnKVxuICAgIGlmIChQbGF5ZXJJbmZvLmN1cnJlbnRTaXplLndpZHRoIDw9IDMyMCB8fCB0aGlzLm9wdGlvbnMuaGlkZVZvbHVtZUJhcikge1xuICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ3czMjAnKVxuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVBsYXlQYXVzZSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnBhdXNlKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250YWluZXIucGxheSgpXG4gICAgfVxuICAgIHRoaXMuY2hhbmdlVG9nZ2xlUGxheSgpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB0b2dnbGVQbGF5U3RvcCgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0b3AoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5wbGF5KClcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KClcbiAgfVxuXG4gIHN0YXJ0U2Vla0RyYWcoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyLnNldHRpbmdzLnNlZWtFbmFibGVkKSByZXR1cm5cbiAgICB0aGlzLmRyYWdnaW5nU2Vla0JhciA9IHRydWVcbiAgICB0aGlzLiRlbC5hZGRDbGFzcygnZHJhZ2dpbmcnKVxuICAgIHRoaXMuJHNlZWtCYXJMb2FkZWQuYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24uYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB0aGlzLiRzZWVrQmFyU2NydWJiZXIuYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICBzdGFydFZvbHVtZURyYWcoZXZlbnQpIHtcbiAgICB0aGlzLmRyYWdnaW5nVm9sdW1lQmFyID0gdHJ1ZVxuICAgIHRoaXMuJGVsLmFkZENsYXNzKCdkcmFnZ2luZycpXG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgc3RvcERyYWcoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5kcmFnZ2luZ1NlZWtCYXIpIHtcbiAgICAgIHRoaXMuc2VlayhldmVudClcbiAgICB9XG4gICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJylcbiAgICB0aGlzLiRzZWVrQmFyTG9hZGVkLnJlbW92ZUNsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uLnJlbW92ZUNsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyLnJlbW92ZUNsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbiBkcmFnZ2luZycpXG4gICAgdGhpcy5kcmFnZ2luZ1NlZWtCYXIgPSBmYWxzZVxuICAgIHRoaXMuZHJhZ2dpbmdWb2x1bWVCYXIgPSBmYWxzZVxuICB9XG5cbiAgdXBkYXRlRHJhZyhldmVudCkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgICBpZiAodGhpcy5kcmFnZ2luZ1NlZWtCYXIpIHtcbiAgICAgIHZhciBvZmZzZXRYID0gZXZlbnQucGFnZVggLSB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLm9mZnNldCgpLmxlZnRcbiAgICAgIHZhciBwb3MgPSBvZmZzZXRYIC8gdGhpcy4kc2Vla0JhckNvbnRhaW5lci53aWR0aCgpICogMTAwXG4gICAgICBwb3MgPSBNYXRoLm1pbigxMDAsIE1hdGgubWF4KHBvcywgMCkpXG4gICAgICB0aGlzLnNldFNlZWtQZXJjZW50YWdlKHBvcylcbiAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ2dpbmdWb2x1bWVCYXIpIHtcbiAgICAgIHRoaXMudm9sdW1lKGV2ZW50KVxuICAgIH1cbiAgfVxuXG4gIHZvbHVtZShldmVudCkge1xuICAgIHZhciBvZmZzZXRZID0gZXZlbnQucGFnZVggLSB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIub2Zmc2V0KCkubGVmdFxuICAgIHZhciB2b2x1bWVGcm9tVUkgPSAob2Zmc2V0WSAvIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci53aWR0aCgpKSAqIDEwMFxuICAgIHRoaXMuc2V0Vm9sdW1lKHZvbHVtZUZyb21VSSlcbiAgfVxuXG4gIHRvZ2dsZU11dGUoKSB7XG4gICAgaWYgKHRoaXMubXV0ZSkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFZvbHVtZSA8PSAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFZvbHVtZSA9IDEwMFxuICAgICAgfVxuICAgICAgdGhpcy5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFZvbHVtZSgwKVxuICAgIH1cbiAgfVxuXG4gIHNldFZvbHVtZSh2YWx1ZSkge1xuICAgIHRoaXMuY3VycmVudFZvbHVtZSA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgodmFsdWUsIDApKVxuICAgIHRoaXMuY29udGFpbmVyLnNldFZvbHVtZSh0aGlzLmN1cnJlbnRWb2x1bWUpXG4gICAgdGhpcy5zZXRWb2x1bWVMZXZlbCh0aGlzLmN1cnJlbnRWb2x1bWUpXG4gICAgdGhpcy5tdXRlID0gdGhpcy5jdXJyZW50Vm9sdW1lID09PSAwXG4gICAgdGhpcy5wZXJzaXN0Q29uZmlnICYmIFV0aWxzLkNvbmZpZy5wZXJzaXN0KFwidm9sdW1lXCIsIHRoaXMuY3VycmVudFZvbHVtZSlcbiAgfVxuXG4gIHRvZ2dsZUZ1bGxzY3JlZW4oKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfRlVMTFNDUkVFTiwgdGhpcy5uYW1lKVxuICAgIHRoaXMuY29udGFpbmVyLmZ1bGxzY3JlZW4oKVxuICAgIHRoaXMucmVzZXRLZWVwVmlzaWJsZSgpXG4gIH1cblxuICBzZXRDb250YWluZXIoY29udGFpbmVyKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKHRoaXMuY29udGFpbmVyKVxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyXG4gICAgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KClcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKClcbiAgICB0aGlzLnNldHRpbmdzVXBkYXRlKClcbiAgICB0aGlzLmNvbnRhaW5lci50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQsIHRoaXMuY29udGFpbmVyLmlzRHZySW5Vc2UoKSlcbiAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmN1cnJlbnRWb2x1bWUpXG4gICAgaWYgKHRoaXMuY29udGFpbmVyLm1lZGlhQ29udHJvbERpc2FibGVkKSB7XG4gICAgICB0aGlzLmRpc2FibGUoKVxuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9DT05UQUlORVJDSEFOR0VEKVxuICB9XG5cbiAgc2hvd1ZvbHVtZUJhcigpIHtcbiAgICBpZiAodGhpcy5oaWRlVm9sdW1lSWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVWb2x1bWVJZClcbiAgICB9XG4gICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd2b2x1bWUtYmFyLWhpZGUnKVxuICB9XG5cbiAgaGlkZVZvbHVtZUJhcigpIHtcbiAgICB2YXIgdGltZW91dCA9IDQwMFxuICAgIGlmICghdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyKSByZXR1cm5cbiAgICBpZiAodGhpcy5kcmFnZ2luZ1ZvbHVtZUJhcikge1xuICAgICAgdGhpcy5oaWRlVm9sdW1lSWQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZVZvbHVtZUJhcigpLCB0aW1lb3V0KVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5oaWRlVm9sdW1lSWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVZvbHVtZUlkKVxuICAgICAgfVxuICAgICAgdGhpcy5oaWRlVm9sdW1lSWQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci5hZGRDbGFzcygndm9sdW1lLWJhci1oaWRlJyksIHRpbWVvdXQpXG4gICAgfVxuICB9XG5cbiAgZW5kZWQoKSB7XG4gICAgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KClcbiAgfVxuXG4gIHVwZGF0ZVByb2dyZXNzQmFyKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uLCBkdXJhdGlvbikge1xuICAgIHZhciBsb2FkZWRTdGFydCA9IHN0YXJ0UG9zaXRpb24gLyBkdXJhdGlvbiAqIDEwMFxuICAgIHZhciBsb2FkZWRFbmQgPSBlbmRQb3NpdGlvbiAvIGR1cmF0aW9uICogMTAwXG4gICAgdGhpcy4kc2Vla0JhckxvYWRlZC5jc3MoeyBsZWZ0OiBsb2FkZWRTdGFydCArICclJywgd2lkdGg6IChsb2FkZWRFbmQgLSBsb2FkZWRTdGFydCkgKyAnJScgfSlcbiAgfVxuXG4gIHVwZGF0ZVNlZWtCYXIocG9zaXRpb24sIGR1cmF0aW9uKSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmdTZWVrQmFyKSByZXR1cm5cbiAgICBpZiAocG9zaXRpb24gPCAwKSBwb3NpdGlvbiA9IGR1cmF0aW9uXG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uLnJlbW92ZUNsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyLnJlbW92ZUNsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdmFyIHNlZWtiYXJWYWx1ZSA9ICgxMDAgLyBkdXJhdGlvbikgKiBwb3NpdGlvblxuICAgIHRoaXMuc2V0U2Vla1BlcmNlbnRhZ2Uoc2Vla2JhclZhbHVlKVxuICAgIHRoaXMuJCgnW2RhdGEtcG9zaXRpb25dJykuaHRtbChVdGlscy5mb3JtYXRUaW1lKHBvc2l0aW9uKSlcbiAgICB0aGlzLiQoJ1tkYXRhLWR1cmF0aW9uXScpLmh0bWwoVXRpbHMuZm9ybWF0VGltZShkdXJhdGlvbikpXG4gIH1cblxuICBzZWVrKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkgcmV0dXJuXG4gICAgdmFyIG9mZnNldFggPSBldmVudC5wYWdlWCAtIHRoaXMuJHNlZWtCYXJDb250YWluZXIub2Zmc2V0KCkubGVmdFxuICAgIHZhciBwb3MgPSBvZmZzZXRYIC8gdGhpcy4kc2Vla0JhckNvbnRhaW5lci53aWR0aCgpICogMTAwXG4gICAgcG9zID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heChwb3MsIDApKVxuICAgIHRoaXMuY29udGFpbmVyLnNldEN1cnJlbnRUaW1lKHBvcylcbiAgICB0aGlzLnNldFNlZWtQZXJjZW50YWdlKHBvcylcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHNldEtlZXBWaXNpYmxlKCkge1xuICAgIHRoaXMua2VlcFZpc2libGUgPSB0cnVlXG4gIH1cblxuICByZXNldEtlZXBWaXNpYmxlKCkge1xuICAgIHRoaXMua2VlcFZpc2libGUgPSBmYWxzZVxuICB9XG5cbiAgaXNWaXNpYmxlKCkge1xuICAgIHJldHVybiAhdGhpcy4kZWwuaGFzQ2xhc3MoJ21lZGlhLWNvbnRyb2wtaGlkZScpXG4gIH1cblxuICBzaG93KGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVyblxuICAgIHZhciB0aW1lb3V0ID0gMjAwMFxuICAgIGlmICghZXZlbnQgfHwgKGV2ZW50LmNsaWVudFggIT09IHRoaXMubGFzdE1vdXNlWCAmJiBldmVudC5jbGllbnRZICE9PSB0aGlzLmxhc3RNb3VzZVkpIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2ZpcmVmb3gvaSkpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVJZClcbiAgICAgIHRoaXMuJGVsLnNob3coKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfU0hPVywgdGhpcy5uYW1lKVxuICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ21lZGlhLWNvbnRyb2wtaGlkZScpXG4gICAgICB0aGlzLmhpZGVJZCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlKCksIHRpbWVvdXQpXG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5sYXN0TW91c2VYID0gZXZlbnQuY2xpZW50WFxuICAgICAgICB0aGlzLmxhc3RNb3VzZVkgPSBldmVudC5jbGllbnRZXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB2YXIgdGltZW91dCA9IDIwMDBcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlSWQpXG4gICAgaWYgKCF0aGlzLmlzVmlzaWJsZSgpIHx8IHRoaXMub3B0aW9ucy5oaWRlTWVkaWFDb250cm9sID09PSBmYWxzZSkgcmV0dXJuXG4gICAgaWYgKHRoaXMua2VlcFZpc2libGUgfHwgdGhpcy5kcmFnZ2luZ1NlZWtCYXIgfHwgdGhpcy5kcmFnZ2luZ1ZvbHVtZUJhcikge1xuICAgICAgdGhpcy5oaWRlSWQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aW1lb3V0KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9ISURFLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLiRlbC5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1oaWRlJylcbiAgICAgIHRoaXMuaGlkZVZvbHVtZUJhcigpXG4gICAgfVxuICB9XG5cbiAgc2V0dGluZ3NVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLmdldFBsYXliYWNrVHlwZSgpICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHRoaXMuY29udGFpbmVyLnNldHRpbmdzKS5sZW5ndGggIT09IDApIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLmNvbnRhaW5lci5zZXR0aW5nc1xuICAgICAgdGhpcy5yZW5kZXIoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc2FibGUoKVxuICAgIH1cbiAgfVxuXG4gIGhpZ2hEZWZpbml0aW9uVXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5pc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSkge1xuICAgICAgdGhpcy4kZWwuZmluZCgnYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXScpLmFkZENsYXNzKFwiZW5hYmxlZFwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbC5maW5kKCdidXR0b25bZGF0YS1oZC1pbmRpY2F0b3JdJykucmVtb3ZlQ2xhc3MoXCJlbmFibGVkXCIpXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlQ2FjaGVkRWxlbWVudHMoKSB7XG4gICAgdGhpcy4kcGxheVBhdXNlVG9nZ2xlID0gdGhpcy4kZWwuZmluZCgnYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXBhdXNlXScpXG4gICAgdGhpcy4kcGxheVN0b3BUb2dnbGUgPSB0aGlzLiRlbC5maW5kKCdidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5c3RvcF0nKVxuICAgIHRoaXMuJGZ1bGxzY3JlZW5Ub2dnbGUgPSB0aGlzLiRlbC5maW5kKCdidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1mdWxsc2NyZWVuXScpXG4gICAgdGhpcy4kc2Vla0JhckNvbnRhaW5lciA9IHRoaXMuJGVsLmZpbmQoJy5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0nKVxuICAgIHRoaXMuJHNlZWtCYXJMb2FkZWQgPSB0aGlzLiRlbC5maW5kKCcuYmFyLWZpbGwtMVtkYXRhLXNlZWtiYXJdJylcbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24gPSB0aGlzLiRlbC5maW5kKCcuYmFyLWZpbGwtMltkYXRhLXNlZWtiYXJdJylcbiAgICB0aGlzLiRzZWVrQmFyU2NydWJiZXIgPSB0aGlzLiRlbC5maW5kKCcuYmFyLXNjcnViYmVyW2RhdGEtc2Vla2Jhcl0nKVxuICAgIHRoaXMuJHNlZWtCYXJIb3ZlciA9IHRoaXMuJGVsLmZpbmQoJy5iYXItaG92ZXJbZGF0YS1zZWVrYmFyXScpXG4gICAgdGhpcy4kdm9sdW1lQ29udGFpbmVyID0gdGhpcy4kZWwuZmluZCgnLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdJylcbiAgICB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIgPSB0aGlzLiRlbC5maW5kKCcuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0nKVxuICAgIHRoaXMuJHZvbHVtZUljb24gPSB0aGlzLiRlbC5maW5kKCcuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdJylcbiAgfVxuXG4gIHNldFZvbHVtZUxldmVsKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5pc1JlYWR5IHx8ICF0aGlzLiR2b2x1bWVCYXJDb250YWluZXIpIHtcbiAgICAgIHRoaXMubGlzdGVuVG9PbmNlKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1JFQURZLCAoKSA9PiB0aGlzLnNldFZvbHVtZUxldmVsKHZhbHVlKSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLmZpbmQoJy5zZWdtZW50ZWQtYmFyLWVsZW1lbnQnKS5yZW1vdmVDbGFzcygnZmlsbCcpXG4gICAgICB2YXIgaXRlbSA9IE1hdGguY2VpbCh2YWx1ZSAvIDEwLjApXG4gICAgICB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIuZmluZCgnLnNlZ21lbnRlZC1iYXItZWxlbWVudCcpLnNsaWNlKDAsIGl0ZW0pLmFkZENsYXNzKCdmaWxsJylcbiAgICAgIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgdGhpcy4kdm9sdW1lSWNvbi5yZW1vdmVDbGFzcygnbXV0ZWQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kdm9sdW1lSWNvbi5hZGRDbGFzcygnbXV0ZWQnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFNlZWtQZXJjZW50YWdlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID4gMTAwKSByZXR1cm5cbiAgICB2YXIgcG9zID0gdGhpcy4kc2Vla0JhckNvbnRhaW5lci53aWR0aCgpICogdmFsdWUgLyAxMDAuMCAtICh0aGlzLiRzZWVrQmFyU2NydWJiZXIud2lkdGgoKSAvIDIuMClcbiAgICB0aGlzLmN1cnJlbnRTZWVrUGVyY2VudGFnZSA9IHZhbHVlO1xuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbi5jc3MoeyB3aWR0aDogdmFsdWUgKyAnJScgfSlcbiAgICB0aGlzLiRzZWVrQmFyU2NydWJiZXIuY3NzKHsgbGVmdDogcG9zIH0pXG4gIH1cblxuICBiaW5kS2V5RXZlbnRzKCkge1xuICAgIHRoaXMua2liby5kb3duKFsnc3BhY2UnXSwgKCkgPT4gdGhpcy50b2dnbGVQbGF5UGF1c2UoKSlcbiAgfVxuXG4gIHVuYmluZEtleUV2ZW50cygpIHtcbiAgICB0aGlzLmtpYm8ub2ZmKCdzcGFjZScpXG4gIH1cblxuICBwYXJzZUNvbG9ycygpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLm1lZGlhY29udHJvbCkge1xuICAgICAgdmFyIGJ1dHRvbnNDb2xvciA9IHRoaXMub3B0aW9ucy5tZWRpYWNvbnRyb2wuYnV0dG9ucztcbiAgICAgIHZhciBzZWVrYmFyQ29sb3IgPSB0aGlzLm9wdGlvbnMubWVkaWFjb250cm9sLnNlZWtiYXI7XG4gICAgICB0aGlzLiRlbC5maW5kKCcuYmFyLWZpbGwtMltkYXRhLXNlZWtiYXJdJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgc2Vla2JhckNvbG9yKVxuICAgICAgdGhpcy4kZWwuZmluZCgnW2RhdGEtbWVkaWEtY29udHJvbF0gPiAubWVkaWEtY29udHJvbC1pY29uLCAuZHJhd2VyLWljb24nKS5jc3MoJ2NvbG9yJywgYnV0dG9uc0NvbG9yKVxuICAgICAgdGhpcy4kZWwuZmluZCgnLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV0nKS5jc3MoJ2JveFNoYWRvdycsIFwiaW5zZXQgMnB4IDAgMCBcIiArIGJ1dHRvbnNDb2xvcilcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgICQoZG9jdW1lbnQpLnVuYmluZCgnbW91c2V1cCcpXG4gICAgJChkb2N1bWVudCkudW5iaW5kKCdtb3VzZW1vdmUnKVxuICAgIHRoaXMudW5iaW5kS2V5RXZlbnRzKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgdGltZW91dCA9IDEwMDBcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IoJ21lZGlhX2NvbnRyb2wnLCB7YmFzZVVybDogdGhpcy5vcHRpb25zLmJhc2VVcmx9KTtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoeyBzZXR0aW5nczogdGhpcy5zZXR0aW5ncyB9KSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy5jcmVhdGVDYWNoZWRFbGVtZW50cygpXG4gICAgdGhpcy4kcGxheVBhdXNlVG9nZ2xlLmFkZENsYXNzKCdwYXVzZWQnKVxuICAgIHRoaXMuJHBsYXlTdG9wVG9nZ2xlLmFkZENsYXNzKCdzdG9wcGVkJylcblxuICAgIHRoaXMuY2hhbmdlVG9nZ2xlUGxheSgpXG4gICAgdGhpcy5oaWRlSWQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aW1lb3V0KVxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmhpZGUoKVxuICAgIH1cblxuICAgIGlmKEJyb3dzZXIuaXNTYWZhcmkgJiYgQnJvd3Nlci5pc01vYmlsZSkge1xuICAgICAgdGhpcy4kdm9sdW1lQ29udGFpbmVyLmNzcygnZGlzcGxheScsJ25vbmUnKVxuICAgIH1cblxuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbi5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlci5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRTZWVrUGVyY2VudGFnZSkge1xuICAgICAgdGhpcy5jdXJyZW50U2Vla1BlcmNlbnRhZ2UgPSAwXG4gICAgfVxuICAgIHRoaXMuc2V0U2Vla1BlcmNlbnRhZ2UodGhpcy5jdXJyZW50U2Vla1BlcmNlbnRhZ2UpXG5cbiAgICB0aGlzLiRlbC5yZWFkeSgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuY29udGFpbmVyLnNldHRpbmdzLnNlZWtFbmFibGVkKSB7XG4gICAgICAgIHRoaXMuJHNlZWtCYXJDb250YWluZXIuYWRkQ2xhc3MoJ3NlZWstZGlzYWJsZWQnKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmN1cnJlbnRWb2x1bWUpXG4gICAgICB0aGlzLmJpbmRLZXlFdmVudHMoKVxuICAgICAgdGhpcy5oaWRlVm9sdW1lQmFyKClcbiAgICB9KVxuXG4gICAgdGhpcy5wYXJzZUNvbG9ycygpXG4gICAgdGhpcy5zZWVrVGltZS5yZW5kZXIoKVxuICAgIHRoaXMuaGlnaERlZmluaXRpb25VcGRhdGUoKVxuXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfUkVOREVSRUQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1lZGlhQ29udHJvbFxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCcuLi9iYXNlL2Jhc2Vfb2JqZWN0JylcbnZhciBDb3JlRmFjdG9yeSA9IHJlcXVpcmUoJy4vY29yZV9mYWN0b3J5JylcbnZhciBMb2FkZXIgPSByZXF1aXJlKCcuL2xvYWRlcicpXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgdW5pcXVlSWQgPSByZXF1aXJlKCcuLi9iYXNlL3V0aWxzJykudW5pcXVlSWRcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgnLi9wbGF5ZXJfaW5mbycpXG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB3aW5kb3cucCA9IHRoaXNcbiAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB7cGxheWVySWQ6IHVuaXF1ZUlkKFwiXCIpLCBwZXJzaXN0Q29uZmlnOiB0cnVlLCB3aWR0aDogNjQwLCBoZWlnaHQ6IDM2MCwgYmFzZVVybDogJ2h0dHA6Ly9jZG4uY2xhcHByLmlvL2xhdGVzdCd9XG4gICAgdGhpcy5vcHRpb25zID0gYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKVxuICAgIHRoaXMub3B0aW9ucy5zb3VyY2VzID0gdGhpcy5ub3JtYWxpemVTb3VyY2VzKG9wdGlvbnMpXG4gICAgdGhpcy5sb2FkZXIgPSBuZXcgTG9hZGVyKHRoaXMub3B0aW9ucy5wbHVnaW5zIHx8IHt9KVxuICAgIHRoaXMuY29yZUZhY3RvcnkgPSBuZXcgQ29yZUZhY3RvcnkodGhpcywgdGhpcy5sb2FkZXIpXG4gICAgUGxheWVySW5mby5jdXJyZW50U2l6ZSA9IHt3aWR0aDogb3B0aW9ucy53aWR0aCwgaGVpZ2h0OiBvcHRpb25zLmhlaWdodH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnBhcmVudElkKSB7XG4gICAgICB0aGlzLnNldFBhcmVudElkKHRoaXMub3B0aW9ucy5wYXJlbnRJZClcbiAgICB9XG4gIH1cblxuICBzZXRQYXJlbnRJZChwYXJlbnRJZCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyZW50SWQpXG4gICAgaWYgKGVsKSB7XG4gICAgICB0aGlzLmF0dGFjaFRvKGVsKVxuICAgIH1cbiAgfVxuXG4gIGF0dGFjaFRvKGVsZW1lbnQpIHtcbiAgICB0aGlzLm9wdGlvbnMucGFyZW50RWxlbWVudCA9IGVsZW1lbnRcbiAgICB0aGlzLmNvcmUgPSB0aGlzLmNvcmVGYWN0b3J5LmNyZWF0ZSgpXG4gIH1cblxuICBpcyh2YWx1ZSwgdHlwZSkge1xuICAgIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gdHlwZVxuICB9XG5cbiAgbm9ybWFsaXplU291cmNlcyhvcHRpb25zKSB7XG4gICAgdmFyIHNvdXJjZXMgPSBvcHRpb25zLnNvdXJjZXMgfHwgKG9wdGlvbnMuc291cmNlICE9PSB1bmRlZmluZWQ/IFtvcHRpb25zLnNvdXJjZS50b1N0cmluZygpXSA6IFtdKVxuICAgIHJldHVybiBzb3VyY2VzLmxlbmd0aCA9PT0gMCA/IFsnbm8ub3AnXSA6IHNvdXJjZXNcbiAgfVxuXG4gIHJlc2l6ZShzaXplKSB7XG4gICAgdGhpcy5jb3JlLnJlc2l6ZShzaXplKTtcbiAgfVxuXG4gIGxvYWQoc291cmNlcykge1xuICAgIHRoaXMuY29yZS5sb2FkKHNvdXJjZXMpXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuY29yZS5kZXN0cm95KClcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIucGxheSgpO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIucGF1c2UoKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc3RvcCgpO1xuICB9XG5cbiAgc2Vlayh0aW1lKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc2V0Q3VycmVudFRpbWUodGltZSk7XG4gIH1cblxuICBzZXRWb2x1bWUodm9sdW1lKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XG4gIH1cblxuICBtdXRlKCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldFZvbHVtZSgwKTtcbiAgfVxuXG4gIHVubXV0ZSgpIHtcbiAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5zZXRWb2x1bWUoMTAwKTtcbiAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuaXNQbGF5aW5nKCk7XG4gIH1cblxuICBnZXRDb250YWluZXJQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5nZXRQbHVnaW4obmFtZSlcbiAgfVxuXG4gIGdldENvcmVQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiB0aGlzLmNvcmUuZ2V0UGx1Z2luKG5hbWUpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NlZWtfdGltZScpO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91aV9vYmplY3QnKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgZm9ybWF0VGltZSA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdXRpbHMnKS5mb3JtYXRUaW1lXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxuXG5jbGFzcyBTZWVrVGltZSBleHRlbmRzIFVJT2JqZWN0IHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnc2Vla190aW1lJyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gSlNULnNlZWtfdGltZTtcbiAgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsYXNzJzogJ3NlZWstdGltZSBoaWRkZW4nLFxuICAgICAgJ2RhdGEtc2Vlay10aW1lJzogJydcbiAgICB9O1xuICB9XG4gIGNvbnN0cnVjdG9yKG1lZGlhQ29udHJvbCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLm1lZGlhQ29udHJvbCA9IG1lZGlhQ29udHJvbFxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9NT1VTRU1PVkVfU0VFS0JBUiwgdGhpcy5zaG93VGltZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX01PVVNFTEVBVkVfU0VFS0JBUiwgdGhpcy5oaWRlVGltZSlcbiAgfVxuXG4gIHNob3dUaW1lKGV2ZW50KSB7XG4gICAgdmFyIG9mZnNldCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5tZWRpYUNvbnRyb2wuJHNlZWtCYXJDb250YWluZXIub2Zmc2V0KCkubGVmdFxuICAgIHZhciB0aW1lUG9zaXRpb24gPSBNYXRoLm1pbigxMDAsIE1hdGgubWF4KChvZmZzZXQpIC8gdGhpcy5tZWRpYUNvbnRyb2wuJHNlZWtCYXJDb250YWluZXIud2lkdGgoKSAqIDEwMCwgMCkpXG4gICAgdmFyIHBvaW50ZXJQb3NpdGlvbiA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5tZWRpYUNvbnRyb2wuJGVsLm9mZnNldCgpLmxlZnRcbiAgICBwb2ludGVyUG9zaXRpb24gPSBNYXRoLm1pbihNYXRoLm1heCgwLCBwb2ludGVyUG9zaXRpb24pLCB0aGlzLm1lZGlhQ29udHJvbC4kZWwud2lkdGgoKSAtIHRoaXMuJGVsLndpZHRoKCkpXG4gICAgdmFyIGN1cnJlbnRUaW1lID0gdGltZVBvc2l0aW9uICogdGhpcy5tZWRpYUNvbnRyb2wuY29udGFpbmVyLmdldER1cmF0aW9uKCkgLyAxMDBcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHRpbWVzdGFtcDogY3VycmVudFRpbWUsXG4gICAgICBmb3JtYXR0ZWRUaW1lOiBmb3JtYXRUaW1lKGN1cnJlbnRUaW1lKSxcbiAgICAgIHBvaW50ZXJQb3NpdGlvbjogcG9pbnRlclBvc2l0aW9uXG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGUob3B0aW9ucylcbiAgfVxuXG4gIGhpZGVUaW1lKCkge1xuICAgIHRoaXMuJGVsLmFkZENsYXNzKCdoaWRkZW4nKVxuICAgIHRoaXMuJGVsLmNzcygnbGVmdCcsICctMTAwJScpXG4gIH1cblxuICB1cGRhdGUob3B0aW9ucykge1xuICAgIGlmICh0aGlzLm1lZGlhQ29udHJvbC5jb250YWluZXIuZ2V0UGxheWJhY2tUeXBlKCkgPT09ICd2b2QnIHx8IHRoaXMubWVkaWFDb250cm9sLmNvbnRhaW5lci5pc0R2ckluVXNlKCkpIHtcbiAgICAgIHRoaXMuJGVsLmZpbmQoJ1tkYXRhLXNlZWstdGltZV0nKS50ZXh0KG9wdGlvbnMuZm9ybWF0dGVkVGltZSlcbiAgICAgIHRoaXMuJGVsLmNzcygnbGVmdCcsIG9wdGlvbnMucG9pbnRlclBvc2l0aW9uIC0gKHRoaXMuJGVsLndpZHRoKCkgLyAyKSlcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpO1xuICAgICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKCkpO1xuICAgICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKTtcbiAgICAgIHRoaXMubWVkaWFDb250cm9sLiRlbC5hcHBlbmQodGhpcy5lbCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZWVrVGltZTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvcGxheWJhY2snKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgTWVkaWF0b3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL21lZGlhdG9yJylcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdGVtcGxhdGUnKVxudmFyICQgPSByZXF1aXJlKCdjbGFwcHItemVwdG8nKVxudmFyIEJyb3dzZXIgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Jyb3dzZXInKVxudmFyIHNlZWtTdHJpbmdUb1NlY29uZHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykuc2Vla1N0cmluZ1RvU2Vjb25kc1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcbnZhciBLaWJvID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9raWJvJylcblxudmFyIG9iamVjdElFID0gJzxvYmplY3QgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIgaWQ9XCI8JT0gY2lkICU+XCIgY2xhc3NpZD1cImNsc2lkOmQyN2NkYjZlLWFlNmQtMTFjZi05NmI4LTQ0NDU1MzU0MDAwMFwiIGRhdGEtZmxhc2gtdm9kPVwiXCI+PHBhcmFtIG5hbWU9XCJtb3ZpZVwiIHZhbHVlPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci5zd2ZcIj4gPHBhcmFtIG5hbWU9XCJxdWFsaXR5XCIgdmFsdWU9XCJhdXRvaGlnaFwiPiA8cGFyYW0gbmFtZT1cInN3bGl2ZWNvbm5lY3RcIiB2YWx1ZT1cInRydWVcIj4gPHBhcmFtIG5hbWU9XCJhbGxvd1NjcmlwdEFjY2Vzc1wiIHZhbHVlPVwiYWx3YXlzXCI+IDxwYXJhbSBuYW1lPVwiYmdjb2xvclwiIHZhbHVlPVwiIzAwMTEyMlwiPiA8cGFyYW0gbmFtZT1cImFsbG93RnVsbFNjcmVlblwiIHZhbHVlPVwiZmFsc2VcIj4gPHBhcmFtIG5hbWU9XCJ3bW9kZVwiIHZhbHVlPVwiZ3B1XCI+IDxwYXJhbSBuYW1lPVwidGFiaW5kZXhcIiB2YWx1ZT1cIjFcIj4gPHBhcmFtIG5hbWU9Rmxhc2hWYXJzIHZhbHVlPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPlwiIC8+IDwvb2JqZWN0PidcblxuY2xhc3MgRmxhc2ggZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2ZsYXNoJyB9XG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ29iamVjdCcgfVxuICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBKU1QuZmxhc2ggfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc3JjID0gb3B0aW9ucy5zcmNcbiAgICB0aGlzLmJhc2VVcmwgPSBvcHRpb25zLmJhc2VVcmxcbiAgICB0aGlzLmF1dG9QbGF5ID0gb3B0aW9ucy5hdXRvUGxheVxuICAgIHRoaXMuc2V0dGluZ3MgPSB7ZGVmYXVsdDogWydzZWVrYmFyJ119XG4gICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gW1wicGxheXBhdXNlXCIsIFwicG9zaXRpb25cIiwgXCJkdXJhdGlvblwiXVxuICAgIHRoaXMuc2V0dGluZ3MucmlnaHQgPSBbXCJmdWxsc2NyZWVuXCIsIFwidm9sdW1lXCJdXG4gICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IHRydWVcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZVxuICAgIHRoaXMua2libyA9IG5ldyBLaWJvKClcbiAgICB0aGlzLmFkZExpc3RlbmVycygpXG4gIH1cblxuXG4gIGJvb3RzdHJhcCgpIHtcbiAgICB0aGlzLmVsLndpZHRoID0gXCIxMDAlXCJcbiAgICB0aGlzLmVsLmhlaWdodCA9IFwiMTAwJVwiXG4gICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZVxuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gJ1BMQVlJTkcnKSB7XG4gICAgICB0aGlzLmZpcnN0UGxheSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJJRExFXCJcbiAgICAgIHRoaXMuYXV0b1BsYXkgJiYgdGhpcy5wbGF5KClcbiAgICB9XG4gICAgJCgnPGRpdiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlXCIgLz4nKS5pbnNlcnRBZnRlcih0aGlzLiRlbClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLm5hbWUpXG4gIH1cblxuICBnZXRQbGF5YmFja1R5cGUoKSB7XG4gICAgcmV0dXJuICd2b2QnXG4gIH1cblxuICBzZXR1cEZpcmVmb3goKSB7XG4gICAgdmFyICRlbCA9IHRoaXMuJCgnZW1iZWQnKVxuICAgICRlbC5hdHRyKCdkYXRhLWZsYXNoJywgJycpXG4gICAgdGhpcy5zZXRFbGVtZW50KCRlbFswXSlcbiAgfVxuXG4gIGlzSGlnaERlZmluaXRpb25JblVzZSgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHVwZGF0ZVRpbWUoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aGlzLmVsLmdldFBvc2l0aW9uKCksIHRoaXMuZWwuZ2V0RHVyYXRpb24oKSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgYWRkTGlzdGVuZXJzKCkge1xuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOnByb2dyZXNzJywgdGhpcy5wcm9ncmVzcywgdGhpcylcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzp0aW1ldXBkYXRlJywgdGhpcy51cGRhdGVUaW1lLCB0aGlzKVxuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOnN0YXRlY2hhbmdlZCcsIHRoaXMuY2hlY2tTdGF0ZSwgdGhpcylcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpmbGFzaHJlYWR5JywgdGhpcy5ib290c3RyYXAsIHRoaXMpXG4gICAgWzEsMiwzLDQsNSw2LDcsOCw5XS5mb3JFYWNoKChpKSA9PiB7IHRoaXMua2liby5kb3duKGkudG9TdHJpbmcoKSwgKCkgPT4gdGhpcy5zZWVrKGkgKiAxMCkpIH0pXG4gIH1cblxuICBzdG9wTGlzdGVuaW5nKCkge1xuICAgIHN1cGVyLnN0b3BMaXN0ZW5pbmcoKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpwcm9ncmVzcycpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOnRpbWV1cGRhdGUnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpzdGF0ZWNoYW5nZWQnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpmbGFzaHJlYWR5JylcbiAgICB0aGlzLmtpYm8ub2ZmKFsxLDIsMyw0LDUsNiw3LDgsOV0pXG4gIH1cblxuICBjaGVja1N0YXRlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gXCJQQVVTRURcIikge1xuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSAhPT0gXCJQTEFZSU5HX0JVRkZFUklOR1wiICYmIHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gXCJQTEFZSU5HX0JVRkZFUklOR1wiKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdfQlVGRkVSSU5HXCJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gXCJQTEFZSU5HXCIpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgIH0gZWxzZSBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpID09PSBcIklETEVcIikge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIklETEVcIlxuICAgIH0gZWxzZSBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpID09PSBcIkVOREVEXCIpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfRU5ERUQsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5lbC5nZXREdXJhdGlvbigpLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiRU5ERURcIlxuICAgIH1cbiAgfVxuXG4gIHByb2dyZXNzKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSAhPT0gXCJJRExFXCIgJiYgdGhpcy5jdXJyZW50U3RhdGUgIT09IFwiRU5ERURcIikge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgMCwgdGhpcy5lbC5nZXRCeXRlc0xvYWRlZCgpLCB0aGlzLmVsLmdldEJ5dGVzVG90YWwoKSwgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIGZpcnN0UGxheSgpIHtcbiAgICBpZiAodGhpcy5lbC5wbGF5ZXJQbGF5KSB7XG4gICAgICB0aGlzLmVsLnBsYXllclBsYXkodGhpcy5zcmMpXG4gICAgICB0aGlzLmxpc3RlblRvT25jZSh0aGlzLCBFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgKCkgPT4gdGhpcy5jaGVja0luaXRpYWxTZWVrKCkpXG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiUExBWUlOR1wiXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdGVuVG9PbmNlKHRoaXMsIEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5maXJzdFBsYXkpXG4gICAgfVxuICB9XG5cbiAgY2hlY2tJbml0aWFsU2VlaygpIHtcbiAgICB2YXIgc2Vla1RpbWUgPSBzZWVrU3RyaW5nVG9TZWNvbmRzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgIGlmIChzZWVrVGltZSAhPT0gMCkge1xuICAgICAgdGhpcy5zZWVrU2Vjb25kcyhzZWVrVGltZSlcbiAgICB9XG4gIH1cblxuICBwbGF5KCkge1xuICAgIGlmICh0aGlzLmVsLmdldFN0YXRlKCkgPT09ICdQQVVTRUQnIHx8IHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gJ1BMQVlJTkdfQlVGRkVSSU5HJykge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgICAgdGhpcy5lbC5wbGF5ZXJSZXN1bWUoKVxuICAgIH0gZWxzZSBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpICE9PSAnUExBWUlORycpIHtcbiAgICAgIHRoaXMuZmlyc3RQbGF5KClcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZLCB0aGlzLm5hbWUpXG4gIH1cblxuICB2b2x1bWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5pc1JlYWR5KSB7XG4gICAgICB0aGlzLmVsLnBsYXllclZvbHVtZSh2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5Ub09uY2UodGhpcywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsICgpID0+IHRoaXMudm9sdW1lKHZhbHVlKSlcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiUEFVU0VEXCJcbiAgICB0aGlzLmVsLnBsYXllclBhdXNlKClcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5lbC5wbGF5ZXJTdG9wKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDAsIHRoaXMubmFtZSlcbiAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gISEodGhpcy5pc1JlYWR5ICYmIHRoaXMuY3VycmVudFN0YXRlLmluZGV4T2YoXCJQTEFZSU5HXCIpID4gLTEpXG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5nZXREdXJhdGlvbigpXG4gIH1cblxuICBzZWVrKHNlZWtCYXJWYWx1ZSkge1xuICAgIHZhciBzZWVrVG8gPSB0aGlzLmVsLmdldER1cmF0aW9uKCkgKiAoc2Vla0JhclZhbHVlIC8gMTAwKVxuICAgIHRoaXMuc2Vla1NlY29uZHMoc2Vla1RvKVxuICB9XG5cbiAgc2Vla1NlY29uZHMoc2Vla1RvKSB7XG4gICAgdGhpcy5lbC5wbGF5ZXJTZWVrKHNlZWtUbylcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHNlZWtUbywgdGhpcy5lbC5nZXREdXJhdGlvbigpLCB0aGlzLm5hbWUpXG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXRlID09PSBcIlBBVVNFRFwiKSB7XG4gICAgICB0aGlzLmVsLnBsYXllclBhdXNlKClcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5ib290c3RyYXBJZClcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICB9XG5cbiAgc2V0dXBJRSgpIHtcbiAgICB0aGlzLnNldEVsZW1lbnQoJCh0ZW1wbGF0ZShvYmplY3RJRSkoeyBjaWQ6IHRoaXMuY2lkLCBiYXNlVXJsOiB0aGlzLmJhc2VVcmwsIHBsYXliYWNrSWQ6IHRoaXMudW5pcXVlSWQgfSkpKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpXG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHsgY2lkOiB0aGlzLmNpZCwgYmFzZVVybDogdGhpcy5iYXNlVXJsLCBwbGF5YmFja0lkOiB0aGlzLnVuaXF1ZUlkIH0pKVxuICAgIGlmKEJyb3dzZXIuaXNGaXJlZm94KSB7XG4gICAgICB0aGlzLnNldHVwRmlyZWZveCgpXG4gICAgfSBlbHNlIGlmKEJyb3dzZXIuaXNMZWdhY3lJRSkge1xuICAgICAgdGhpcy5zZXR1cElFKClcbiAgICB9XG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuRmxhc2guY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlKSB7XG4gIGlmICghQnJvd3Nlci5oYXNGbGFzaCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9IGVsc2UgaWYgKCghQnJvd3Nlci5pc01vYmlsZSAmJiBCcm93c2VyLmlzRmlyZWZveCkgfHwgQnJvd3Nlci5pc0xlZ2FjeUlFKSB7XG4gICAgcmV0dXJuIChyZXNvdXJjZSAmJiByZXNvdXJjZS5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nKSAmJiAhIXJlc291cmNlLm1hdGNoKC8oLiopXFwuKG1wNHxtb3Z8ZjR2fDNncHB8M2dwKS8pXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChyZXNvdXJjZSAmJiByZXNvdXJjZS5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nKSAmJiAhIXJlc291cmNlLm1hdGNoKC8oLiopXFwuKG1vdnxmNHZ8M2dwcHwzZ3ApLylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3BsYXliYWNrJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3RlbXBsYXRlJylcblxudmFyIE1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9tZWRpYXRvcicpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnJvd3NlcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJylcblxudmFyIG9iamVjdElFID0gJzxvYmplY3QgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIgaWQ9XCI8JT0gY2lkICU+XCIgY2xhc3M9XCJobHMtcGxheWJhY2tcIiBjbGFzc2lkPVwiY2xzaWQ6ZDI3Y2RiNmUtYWU2ZC0xMWNmLTk2YjgtNDQ0NTUzNTQwMDAwXCIgZGF0YS1obHM9XCJcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PHBhcmFtIG5hbWU9XCJtb3ZpZVwiIHZhbHVlPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL0hMU1BsYXllci5zd2ZcIj4gPHBhcmFtIG5hbWU9XCJxdWFsaXR5XCIgdmFsdWU9XCJhdXRvaGlnaFwiPiA8cGFyYW0gbmFtZT1cInN3bGl2ZWNvbm5lY3RcIiB2YWx1ZT1cInRydWVcIj4gPHBhcmFtIG5hbWU9XCJhbGxvd1NjcmlwdEFjY2Vzc1wiIHZhbHVlPVwiYWx3YXlzXCI+IDxwYXJhbSBuYW1lPVwiYmdjb2xvclwiIHZhbHVlPVwiIzAwMTEyMlwiPiA8cGFyYW0gbmFtZT1cImFsbG93RnVsbFNjcmVlblwiIHZhbHVlPVwiZmFsc2VcIj4gPHBhcmFtIG5hbWU9XCJ3bW9kZVwiIHZhbHVlPVwidHJhbnNwYXJlbnRcIj4gPHBhcmFtIG5hbWU9XCJ0YWJpbmRleFwiIHZhbHVlPVwiMVwiPiA8cGFyYW0gbmFtZT1GbGFzaFZhcnMgdmFsdWU9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgLz4gPC9vYmplY3Q+J1xuXG5jbGFzcyBITFMgZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2hscycgfVxuICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdvYmplY3QnIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULmhscyB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAnaGxzLXBsYXliYWNrJyxcbiAgICAgICdkYXRhLWhscyc6ICcnLFxuICAgICAgJ3R5cGUnOiAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuICAgICAgJ3dpZHRoJzogJzEwMCUnLFxuICAgICAgJ2hlaWdodCc6ICcxMDAlJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc3JjID0gb3B0aW9ucy5zcmNcbiAgICB0aGlzLmJhc2VVcmwgPSBvcHRpb25zLmJhc2VVcmw7XG4gICAgdGhpcy5mbHVzaExpdmVVUkxDYWNoZSA9IChvcHRpb25zLmZsdXNoTGl2ZVVSTENhY2hlID09PSB1bmRlZmluZWQpPyB0cnVlOiBvcHRpb25zLmZsdXNoTGl2ZVVSTENhY2hlXG4gICAgdGhpcy5jYXBMZXZlbFRvU3RhZ2UgPSAob3B0aW9ucy5jYXBMZXZlbFRvU3RhZ2UgPT09IHVuZGVmaW5lZCk/IGZhbHNlOiBvcHRpb25zLmNhcExldmVsVG9TdGFnZVxuICAgIHRoaXMuaGlnaERlZmluaXRpb24gPSBmYWxzZVxuICAgIHRoaXMuYXV0b1BsYXkgPSBvcHRpb25zLmF1dG9QbGF5XG4gICAgdGhpcy5kZWZhdWx0U2V0dGluZ3MgPSB7XG4gICAgICBsZWZ0OiBbXCJwbGF5c3RvcFwiXSxcbiAgICAgIGRlZmF1bHQ6IFsnc2Vla2JhciddLFxuICAgICAgcmlnaHQ6IFtcImZ1bGxzY3JlZW5cIiwgXCJ2b2x1bWVcIiwgXCJoZC1pbmRpY2F0b3JcIl0sXG4gICAgICBzZWVrRW5hYmxlZDogZmFsc2VcbiAgICB9XG4gICAgdGhpcy5zZXR0aW5ncyA9IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0U2V0dGluZ3MpXG4gICAgdGhpcy5wbGF5YmFja1R5cGUgPSAnbGl2ZSdcbiAgICB0aGlzLmFkZExpc3RlbmVycygpXG4gIH1cblxuICBhZGRMaXN0ZW5lcnMoKSB7XG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScsICgpID0+IHRoaXMuYm9vdHN0cmFwKCkpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6dGltZXVwZGF0ZScsICgpID0+IHRoaXMudXBkYXRlVGltZSgpKVxuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOnBsYXliYWNrc3RhdGUnLCAoc3RhdGUpID0+IHRoaXMuc2V0UGxheWJhY2tTdGF0ZShzdGF0ZSkpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6bGV2ZWxjaGFuZ2VkJywgKGlzSEQpID0+IHRoaXMudXBkYXRlSGlnaERlZmluaXRpb24oaXNIRCkpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6cGxheWJhY2tlcnJvcicsICgpID0+IHRoaXMuZmxhc2hQbGF5YmFja0Vycm9yKCkpXG4gIH1cblxuICBzdG9wTGlzdGVuaW5nKCkge1xuICAgIHN1cGVyLnN0b3BMaXN0ZW5pbmcoKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpmbGFzaHJlYWR5JylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6dGltZXVwZGF0ZScpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOnBsYXliYWNrc3RhdGUnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpsZXZlbGNoYW5nZWQnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpwbGF5YmFja2Vycm9yJylcbiAgfVxuXG4gIGJvb3RzdHJhcCgpIHtcbiAgICB0aGlzLmVsLndpZHRoID0gXCIxMDAlXCJcbiAgICB0aGlzLmVsLmhlaWdodCA9IFwiMTAwJVwiXG4gICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZVxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJJRExFXCJcbiAgICB0aGlzLnNldEZsYXNoU2V0dGluZ3MoKVxuICAgIHRoaXMudXBkYXRlUGxheWJhY2tUeXBlKClcbiAgICB0aGlzLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgc2V0Rmxhc2hTZXR0aW5ncygpIHtcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyU2V0Zmx1c2hMaXZlVVJMQ2FjaGUodGhpcy5mbHVzaExpdmVVUkxDYWNoZSlcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyQ2FwTGV2ZWx0b1N0YWdlKHRoaXMuY2FwTGV2ZWxUb1N0YWdlKVxuICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJTZXRtYXhCdWZmZXJMZW5ndGgoMClcbiAgfVxuXG4gIHVwZGF0ZUhpZ2hEZWZpbml0aW9uKGlzSEQpIHtcbiAgICB0aGlzLmhpZ2hEZWZpbml0aW9uID0gKGlzSEQgPT09IFwiaGRcIik7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19ISUdIREVGSU5JVElPTlVQREFURSlcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JJVFJBVEUsIHsnYml0cmF0ZSc6IHRoaXMuZ2V0Q3VycmVudEJpdHJhdGUoKX0pXG4gIH1cblxuICB1cGRhdGVUaW1lKCkge1xuICAgIHZhciBkdXJhdGlvbiA9IHRoaXMuZ2V0RHVyYXRpb24oKVxuICAgIHZhciBwb3NpdGlvbiA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMuZWwuZ2xvYm9HZXRQb3NpdGlvbigpLCAwKSwgZHVyYXRpb24pXG4gICAgdmFyIHByZXZpb3VzRFZSU3RhdHVzID0gdGhpcy5kdnJFbmFibGVkXG4gICAgdmFyIGxpdmVQbGF5YmFjayA9ICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gJ2xpdmUnKVxuICAgIHRoaXMuZHZyRW5hYmxlZCA9IChsaXZlUGxheWJhY2sgJiYgZHVyYXRpb24gPiAyNDApXG5cbiAgICBpZiAoZHVyYXRpb24gPT09IDEwMCB8fCBsaXZlUGxheWJhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmR2ckVuYWJsZWQgIT09IHByZXZpb3VzRFZSU3RhdHVzKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNldHRpbmdzKClcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfU0VUVElOR1NVUERBVEUsIHRoaXMubmFtZSlcbiAgICB9XG5cbiAgICBpZiAobGl2ZVBsYXliYWNrICYmICghdGhpcy5kdnJFbmFibGVkIHx8ICF0aGlzLmR2ckluVXNlKSkge1xuICAgICAgcG9zaXRpb24gPSBkdXJhdGlvblxuICAgIH1cblxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgcG9zaXRpb24sIGR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gIH1cblxuICBwbGF5KCkge1xuICAgIGlmKHRoaXMuY3VycmVudFN0YXRlID09PSAnUEFVU0VEJykge1xuICAgICAgdGhpcy5lbC5nbG9ib1BsYXllclJlc3VtZSgpXG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSAhPT0gXCJQTEFZSU5HXCIpIHtcbiAgICAgIHRoaXMuZmlyc3RQbGF5KClcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZLCB0aGlzLm5hbWUpXG4gIH1cblxuICBnZXRQbGF5YmFja1R5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWJhY2tUeXBlPyB0aGlzLnBsYXliYWNrVHlwZTogbnVsbFxuICB9XG5cbiAgZ2V0Q3VycmVudEJpdHJhdGUoKSB7XG4gICAgdmFyIGN1cnJlbnRMZXZlbCA9IHRoaXMuZ2V0TGV2ZWxzKClbdGhpcy5lbC5nbG9ib0dldExldmVsKCldXG4gICAgcmV0dXJuIGN1cnJlbnRMZXZlbC5iaXRyYXRlXG4gIH1cblxuICBpc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlnaERlZmluaXRpb25cbiAgfVxuXG4gIGdldExldmVscygpIHtcbiAgICBpZiAoIXRoaXMubGV2ZWxzIHx8IHRoaXMubGV2ZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5sZXZlbHMgPSB0aGlzLmVsLmdsb2JvR2V0TGV2ZWxzKClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubGV2ZWxzXG4gIH1cblxuICBzZXRQbGF5YmFja1N0YXRlKHN0YXRlKSB7XG4gICAgdmFyIGJ1ZmZlckxlbmd0aCA9IHRoaXMuZWwuZ2xvYm9HZXRidWZmZXJMZW5ndGgoKVxuICAgIGlmIChzdGF0ZSA9PT0gXCJQTEFZSU5HX0JVRkZFUklOR1wiICYmIGJ1ZmZlckxlbmd0aCA8IDEpICB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgICAgdGhpcy51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUpXG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gXCJQTEFZSU5HXCIpIHtcbiAgICAgIGlmIChbXCJQTEFZSU5HX0JVRkZFUklOR1wiLCBcIlBBVVNFRFwiLCBcIklETEVcIl0uaW5kZXhPZih0aGlzLmN1cnJlbnRTdGF0ZSkgPj0gMCkge1xuICAgICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsIHRoaXMubmFtZSlcbiAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gXCJQQVVTRURcIikge1xuICAgICAgdGhpcy51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUpXG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gXCJJRExFXCIpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfRU5ERUQsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5lbC5nbG9ib0dldER1cmF0aW9uKCksIHRoaXMubmFtZSlcbiAgICAgIHRoaXMudXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlKVxuICAgIH1cbiAgICB0aGlzLmxhc3RCdWZmZXJMZW5ndGggPSBidWZmZXJMZW5ndGhcbiAgfVxuXG4gIHVwZGF0ZUN1cnJlbnRTdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuY3VycmVudFN0YXRlID0gc3RhdGVcbiAgICB0aGlzLnVwZGF0ZVBsYXliYWNrVHlwZSgpXG4gIH1cblxuICB1cGRhdGVQbGF5YmFja1R5cGUoKSB7XG4gICAgdGhpcy5wbGF5YmFja1R5cGUgPSB0aGlzLmVsLmdsb2JvR2V0VHlwZSgpXG4gICAgaWYgKHRoaXMucGxheWJhY2tUeXBlKSB7XG4gICAgICB0aGlzLnBsYXliYWNrVHlwZSA9IHRoaXMucGxheWJhY2tUeXBlLnRvTG93ZXJDYXNlKClcbiAgICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gJ3ZvZCcpIHtcbiAgICAgICAgdGhpcy5zdGFydFJlcG9ydGluZ1Byb2dyZXNzKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcFJlcG9ydGluZ1Byb2dyZXNzKClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZQkFDS1NUQVRFKVxuICB9XG5cbiAgc3RhcnRSZXBvcnRpbmdQcm9ncmVzcygpIHtcbiAgICBpZiAoIXRoaXMucmVwb3J0aW5nUHJvZ3Jlc3MpIHtcbiAgICAgIHRoaXMucmVwb3J0aW5nUHJvZ3Jlc3MgPSB0cnVlXG4gICAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpmcmFnbWVudGxvYWRlZCcsKCkgPT4gdGhpcy5vbkZyYWdtZW50TG9hZGVkKCkpXG4gICAgfVxuICB9XG5cbiAgc3RvcFJlcG9ydGluZ1Byb2dyZXNzKCkge1xuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpmcmFnbWVudGxvYWRlZCcsIHRoaXMub25GcmFnbWVudExvYWRlZCwgdGhpcylcbiAgfVxuXG4gIG9uRnJhZ21lbnRMb2FkZWQoKSB7XG4gICAgdmFyIGJ1ZmZlcmVkID0gdGhpcy5lbC5nbG9ib0dldFBvc2l0aW9uKCkgKyB0aGlzLmVsLmdsb2JvR2V0YnVmZmVyTGVuZ3RoKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BST0dSRVNTLCB0aGlzLmVsLmdsb2JvR2V0UG9zaXRpb24oKSwgYnVmZmVyZWQsIHRoaXMuZ2V0RHVyYXRpb24oKSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgZmlyc3RQbGF5KCkge1xuICAgIHRoaXMuc2V0Rmxhc2hTZXR0aW5ncygpIC8vZW5zdXJlIGZsdXNoTGl2ZVVSTENhY2hlIHdpbGwgd29yayAoIzMyNylcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyTG9hZCh0aGlzLnNyYylcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyUGxheSgpXG4gIH1cblxuICB2b2x1bWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5pc1JlYWR5KSB7XG4gICAgICB0aGlzLmVsLmdsb2JvUGxheWVyVm9sdW1lKHZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3RlblRvT25jZSh0aGlzLCBFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgKCkgPT4gdGhpcy52b2x1bWUodmFsdWUpKVxuICAgIH1cbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSAhPT0gJ2xpdmUnIHx8IHRoaXMuZHZyRW5hYmxlZCkge1xuICAgICAgdGhpcy5lbC5nbG9ib1BsYXllclBhdXNlKClcbiAgICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gJ2xpdmUnICYmIHRoaXMuZHZyRW5hYmxlZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUR2cih0cnVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5lbC5nbG9ib1BsYXllclN0b3AoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5uYW1lKVxuICB9XG5cbiAgaXNQbGF5aW5nKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSkge1xuICAgICAgcmV0dXJuICEhKHRoaXMuY3VycmVudFN0YXRlLm1hdGNoKC9wbGF5aW5nL2kpKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGdldER1cmF0aW9uKCkge1xuICAgIHZhciBkdXJhdGlvbiA9IHRoaXMuZWwuZ2xvYm9HZXREdXJhdGlvbigpXG4gICAgaWYgKHRoaXMucGxheWJhY2tUeXBlID09PSAnbGl2ZScpIHtcbiAgICAgIC8vIGVzdGltYXRlIDEwIHNlY29uZHMgb2YgYnVmZmVyIHRpbWUgZm9yIGxpdmUgc3RyZWFtcyBmb3Igc2VlayBwb3NpdGlvbnNcbiAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gLSAxMFxuICAgIH1cbiAgICByZXR1cm4gZHVyYXRpb25cbiAgfVxuXG4gIHNlZWsodGltZSkge1xuICAgIHZhciBkdXJhdGlvbiA9IHRoaXMuZ2V0RHVyYXRpb24oKVxuICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgdGltZSA9IGR1cmF0aW9uICogdGltZSAvIDEwMFxuICAgIH1cblxuICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gJ2xpdmUnKSB7XG4gICAgICAvLyBzZWVrIG9wZXJhdGlvbnMgdG8gYSB0aW1lIHdpdGhpbiA1IHNlY29uZHMgZnJvbSBsaXZlIHN0cmVhbSB3aWxsIHBvc2l0aW9uIHBsYXloZWFkIGJhY2sgdG8gbGl2ZVxuICAgICAgdmFyIGR2ckluVXNlID0gKHRpbWUgPj0gMCAmJiBkdXJhdGlvbiAtIHRpbWUgPiA1KVxuICAgICAgaWYgKCFkdnJJblVzZSkge1xuICAgICAgICB0aW1lID0gLTFcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlRHZyKGR2ckluVXNlKVxuICAgIH1cbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyU2Vlayh0aW1lKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGltZSwgZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0hJR0hERUZJTklUSU9OVVBEQVRFKVxuICB9XG5cbiAgdXBkYXRlRHZyKGR2ckluVXNlKSB7XG4gICAgdmFyIHByZXZpb3VzRHZySW5Vc2UgPSAhIXRoaXMuZHZySW5Vc2VcbiAgICB0aGlzLmR2ckluVXNlID0gZHZySW5Vc2VcbiAgICBpZiAodGhpcy5kdnJJblVzZSAhPT0gcHJldmlvdXNEdnJJblVzZSkge1xuICAgICAgdGhpcy51cGRhdGVTZXR0aW5ncygpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0RWUiwgdGhpcy5kdnJJblVzZSlcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfU1RBVFNfQURELCB7J2R2cic6IHRoaXMuZHZySW5Vc2V9KVxuICAgIH1cbiAgfVxuXG4gIGZsYXNoUGxheWJhY2tFcnJvcigpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1NUT1ApXG4gIH1cblxuICB0aW1lVXBkYXRlKHRpbWUsIGR1cmF0aW9uKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aW1lLCBkdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHRoaXMuJGVsLnJlbW92ZSgpXG4gIH1cblxuICBzZXR1cEZpcmVmb3goKSB7XG4gICAgdmFyICRlbCA9IHRoaXMuJCgnZW1iZWQnKVxuICAgICRlbC5hdHRyKCdkYXRhLWhscycsICcnKVxuICAgIHRoaXMuc2V0RWxlbWVudCgkZWwpXG4gIH1cblxuICBzZXR1cElFKCkge1xuICAgIHRoaXMuc2V0RWxlbWVudCgkKHRlbXBsYXRlKG9iamVjdElFKSh7Y2lkOiB0aGlzLmNpZCwgYmFzZVVybDogdGhpcy5iYXNlVXJsLCBwbGF5YmFja0lkOiB0aGlzLnVuaXF1ZUlkfSkpKVxuICB9XG5cbiAgdXBkYXRlU2V0dGluZ3MoKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0U2V0dGluZ3MpXG4gICAgaWYgKHRoaXMucGxheWJhY2tUeXBlID09PSBcInZvZFwiIHx8IHRoaXMuZHZySW5Vc2UpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MubGVmdCA9IFtcInBsYXlwYXVzZVwiLCBcInBvc2l0aW9uXCIsIFwiZHVyYXRpb25cIl1cbiAgICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSB0cnVlXG4gICAgfSBlbHNlIGlmICh0aGlzLmR2ckVuYWJsZWQpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MubGVmdCA9IFtcInBsYXlwYXVzZVwiXVxuICAgICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgc2V0RWxlbWVudChlbGVtZW50KSB7XG4gICAgdGhpcy4kZWwgPSBlbGVtZW50XG4gICAgdGhpcy5lbCA9IGVsZW1lbnRbMF1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIGlmKEJyb3dzZXIuaXNMZWdhY3lJRSkge1xuICAgICAgdGhpcy5zZXR1cElFKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHtjaWQ6IHRoaXMuY2lkLCBiYXNlVXJsOiB0aGlzLmJhc2VVcmwsIHBsYXliYWNrSWQ6IHRoaXMudW5pcXVlSWR9KSlcbiAgICAgIGlmKEJyb3dzZXIuaXNGaXJlZm94KSB7XG4gICAgICAgIHRoaXMuc2V0dXBGaXJlZm94KClcbiAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc0lFKSB7XG4gICAgICAgIHRoaXMuJCgnZW1iZWQnKS5yZW1vdmUoKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmVsLmlkID0gdGhpcy5jaWRcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5ITFMuY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlKSB7XG4gIHJldHVybiAhIShyZXNvdXJjZS5tYXRjaCgvXmh0dHAoLiopLm0zdTg/LykgJiYgQnJvd3Nlci5oYXNGbGFzaClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBITFNcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvcGxheWJhY2snKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcbnZhciBmaW5kID0gcmVxdWlyZSgnbG9kYXNoLmZpbmQnKVxuXG5jbGFzcyBIVE1MNUF1ZGlvIGV4dGVuZHMgUGxheWJhY2sge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdodG1sNV9hdWRpbycgfVxuICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdhdWRpbycgfVxuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAndGltZXVwZGF0ZSc6ICd0aW1lVXBkYXRlZCcsXG4gICAgICAnZW5kZWQnOiAnZW5kZWQnLFxuICAgICAgJ2NhbnBsYXl0aHJvdWdoJzogJ2J1ZmZlckZ1bGwnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgc3VwZXIocGFyYW1zKVxuICAgIHRoaXMuZWwuc3JjID0gcGFyYW1zLnNyY1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICBsZWZ0OiBbJ3BsYXlwYXVzZScsICdwb3NpdGlvbicsICdkdXJhdGlvbiddLFxuICAgICAgcmlnaHQ6IFsnZnVsbHNjcmVlbicsICd2b2x1bWUnXSxcbiAgICAgIGRlZmF1bHQ6IFsnc2Vla2JhciddXG4gICAgfVxuICAgIHRoaXMucmVuZGVyKClcbiAgICBwYXJhbXMuYXV0b1BsYXkgJiYgdGhpcy5wbGF5KClcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLnBsYXkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QQVVTRSwgdGhpcy5wYXVzZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NFRUssIHRoaXMuc2VlaylcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1ZPTFVNRSwgdGhpcy52b2x1bWUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLnN0b3ApXG4gIH1cblxuICBnZXRQbGF5YmFja1R5cGUoKSB7XG4gICAgcmV0dXJuIFwiYW9kXCJcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5lbC5wbGF5KClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BMQVkpO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5lbC5wYXVzZSgpXG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMucGF1c2UoKVxuICAgIHRoaXMuZWwuY3VycmVudFRpbWUgPSAwXG4gIH1cblxuICB2b2x1bWUodmFsdWUpIHtcbiAgICB0aGlzLmVsLnZvbHVtZSA9IHZhbHVlIC8gMTAwXG4gIH1cblxuICBtdXRlKCkge1xuICAgIHRoaXMuZWwudm9sdW1lID0gMFxuICB9XG5cbiAgdW5tdXRlKCkge1xuICAgIHRoaXMuZWwudm9sdW1lID0gMVxuICB9XG5cbiAgaXNNdXRlZCgpIHtcbiAgICByZXR1cm4gISF0aGlzLmVsLnZvbHVtZVxuICB9XG5cbiAgZW5kZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfVElNRVVQREFURSwgMClcbiAgfVxuXG4gIHNlZWsoc2Vla0JhclZhbHVlKSB7XG4gICAgdmFyIHRpbWUgPSB0aGlzLmVsLmR1cmF0aW9uICogKHNlZWtCYXJWYWx1ZSAvIDEwMClcbiAgICB0aGlzLmVsLmN1cnJlbnRUaW1lID0gdGltZVxuICB9XG5cbiAgZ2V0Q3VycmVudFRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwuY3VycmVudFRpbWVcbiAgfVxuXG4gIGdldER1cmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVsLmR1cmF0aW9uXG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuICF0aGlzLmVsLnBhdXNlZCAmJiAhdGhpcy5lbC5lbmRlZFxuICB9XG5cbiAgdGltZVVwZGF0ZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aGlzLmVsLmN1cnJlbnRUaW1lLCB0aGlzLmVsLmR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gIH1cblxuICBidWZmZXJGdWxsKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy5lbC5jdXJyZW50VGltZSwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLm5hbWUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuIH1cblxuSFRNTDVBdWRpby5jYW5QbGF5ID0gZnVuY3Rpb24ocmVzb3VyY2UpIHtcbiAgdmFyIG1pbWV0eXBlcyA9IHtcbiAgICAnd2F2JzogWydhdWRpby93YXYnXSxcbiAgICAnbXAzJzogWydhdWRpby9tcDMnLCAnYXVkaW8vbXBlZztjb2RlY3M9XCJtcDNcIiddLFxuICAgICdhYWMnOiBbJ2F1ZGlvL21wNDtjb2RlY3M9XCJtcDRhLjQwLjVcIiddLFxuICAgICdvZ2EnOiBbJ2F1ZGlvL29nZyddXG4gIH1cbiAgdmFyIHJlc291cmNlUGFydHMgPSByZXNvdXJjZS5zcGxpdCgnPycpWzBdLm1hdGNoKC8uKlxcLiguKikkLykgfHwgW11cbiAgaWYgKChyZXNvdXJjZVBhcnRzLmxlbmd0aCA+IDEpICYmIChtaW1ldHlwZXNbcmVzb3VyY2VQYXJ0c1sxXV0gIT09IHVuZGVmaW5lZCkpIHtcbiAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJylcbiAgICByZXR1cm4gISFmaW5kKG1pbWV0eXBlc1tyZXNvdXJjZVBhcnRzWzFdXSwgKGV4dCkgPT4geyByZXR1cm4gISFhLmNhblBsYXlUeXBlKGV4dCkucmVwbGFjZSgvbm8vLCAnJykgfSlcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEhUTUw1QXVkaW9cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvcGxheWJhY2snKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBLaWJvID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9raWJvJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnJvd3NlcicpXG52YXIgc2Vla1N0cmluZ1RvU2Vjb25kcyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdXRpbHMnKS5zZWVrU3RyaW5nVG9TZWNvbmRzXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpXG5cbmNsYXNzIEhUTUw1VmlkZW8gZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2h0bWw1X3ZpZGVvJyB9XG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ3ZpZGVvJyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5odG1sNV92aWRlbyB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkYXRhLWh0bWw1LXZpZGVvJzogJydcbiAgICB9XG4gIH1cblxuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAndGltZXVwZGF0ZSc6ICd0aW1lVXBkYXRlZCcsXG4gICAgICAncHJvZ3Jlc3MnOiAncHJvZ3Jlc3MnLFxuICAgICAgJ2VuZGVkJzogJ2VuZGVkJyxcbiAgICAgICdzdGFsbGVkJzogJ3N0YWxsZWQnLFxuICAgICAgJ3dhaXRpbmcnOiAnd2FpdGluZycsXG4gICAgICAnY2FucGxheXRocm91Z2gnOiAnYnVmZmVyRnVsbCcsXG4gICAgICAnbG9hZGVkbWV0YWRhdGEnOiAnbG9hZGVkTWV0YWRhdGEnLFxuICAgICAgJ2NhbnBsYXknOiAncmVhZHknLFxuICAgICAgJ2R1cmF0aW9uY2hhbmdlJzogJ2R1cmF0aW9uQ2hhbmdlJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMua2libyA9IG5ldyBLaWJvKClcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5zcmMgPSBvcHRpb25zLnNyY1xuICAgIHRoaXMuZWwuc3JjID0gb3B0aW9ucy5zcmNcbiAgICB0aGlzLmVsLmxvb3AgPSBvcHRpb25zLmxvb3BcbiAgICB0aGlzLmZpcnN0QnVmZmVyID0gdHJ1ZVxuICAgIHRoaXMuaXNITFMgPSAodGhpcy5zcmMuaW5kZXhPZignbTN1OCcpID4gLTEpXG4gICAgdGhpcy5zZXR0aW5ncyA9IHtkZWZhdWx0OiBbJ3NlZWtiYXInXX1cbiAgICBpZiAoQnJvd3Nlci5pc1NhZmFyaSkge1xuICAgICAgdGhpcy5zZXR1cFNhZmFyaSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwucHJlbG9hZCA9IG9wdGlvbnMucHJlbG9hZCA/IG9wdGlvbnMucHJlbG9hZDogJ21ldGFkYXRhJ1xuICAgICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IHRydWVcbiAgICB9XG4gICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gdGhpcy5pc0hMUyA/IFtcInBsYXlzdG9wXCJdIDogW1wicGxheXBhdXNlXCIsIFwicG9zaXRpb25cIiwgXCJkdXJhdGlvblwiXVxuICAgIHRoaXMuc2V0dGluZ3MucmlnaHQgPSBbXCJmdWxsc2NyZWVuXCIsIFwidm9sdW1lXCJdXG4gICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgfVxuXG4gIHNldHVwU2FmYXJpKCkge1xuICAgIHRoaXMuZWwucHJlbG9hZCA9ICdhdXRvJ1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICBbMSwyLDMsNCw1LDYsNyw4LDldLmZvckVhY2goKGkpID0+IHsgdGhpcy5raWJvLmRvd24oaS50b1N0cmluZygpLCAoKSA9PiB0aGlzLnNlZWsoaSAqIDEwKSkgfSlcbiAgfVxuXG4gIHN0b3BMaXN0ZW5pbmcoKSB7XG4gICAgdGhpcy5raWJvLm9mZihbMSwyLDMsNCw1LDYsNyw4LDldKVxuICB9XG5cbiAgbG9hZGVkTWV0YWRhdGEoZSkge1xuICAgIHRoaXMuZHVyYXRpb25DaGFuZ2UoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfTE9BREVETUVUQURBVEEsIGUudGFyZ2V0LmR1cmF0aW9uKVxuICAgIHRoaXMuY2hlY2tJbml0aWFsU2VlaygpXG4gIH1cblxuICBkdXJhdGlvbkNoYW5nZSgpIHtcbiAgICAvLyB3ZSBjYW4ndCBmaWd1cmUgb3V0IGlmIGhscyByZXNvdXJjZSBpcyBWb0Qgb3Igbm90IHVudGlsIGl0IGlzIGJlaW5nIGxvYWRlZCBvciBkdXJhdGlvbiBoYXMgY2hhbmdlZC5cbiAgICAvLyB0aGF0J3Mgd2h5IHdlIGNoZWNrIGl0IGFnYWluIGFuZCB1cGRhdGUgbWVkaWEgY29udHJvbCBhY2NvcmRpbmdseS5cbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ3ZvZCcpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MubGVmdCA9IFtcInBsYXlwYXVzZVwiLCBcInBvc2l0aW9uXCIsIFwiZHVyYXRpb25cIl1cbiAgICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSB0cnVlXG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfU0VUVElOR1NVUERBVEUpXG4gIH1cblxuICBnZXRQbGF5YmFja1R5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNITFMgJiYgWzAsIHVuZGVmaW5lZCwgSW5maW5pdHldLmluZGV4T2YodGhpcy5lbC5kdXJhdGlvbikgPj0gMCA/ICdsaXZlJyA6ICd2b2QnXG4gIH1cblxuICBpc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuZWwucGxheSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuZWwucGF1c2UoKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnBhdXNlKClcbiAgICBpZiAodGhpcy5lbC5yZWFkeVN0YXRlICE9PSAwKSB7XG4gICAgICB0aGlzLmVsLmN1cnJlbnRUaW1lID0gMFxuICAgIH1cbiAgfVxuXG4gIHZvbHVtZSh2YWx1ZSkge1xuICAgIHRoaXMuZWwudm9sdW1lID0gdmFsdWUgLyAxMDBcbiAgfVxuXG4gIG11dGUoKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSAwXG4gIH1cblxuICB1bm11dGUoKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSAxXG4gIH1cblxuICBpc011dGVkKCkge1xuICAgIHJldHVybiAhIXRoaXMuZWwudm9sdW1lXG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuICF0aGlzLmVsLnBhdXNlZCAmJiAhdGhpcy5lbC5lbmRlZFxuICB9XG5cbiAgZW5kZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19FTkRFRCwgdGhpcy5uYW1lKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgc3RhbGxlZCgpIHtcbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ3ZvZCcgJiYgdGhpcy5lbC5yZWFkeVN0YXRlIDwgdGhpcy5lbC5IQVZFX0ZVVFVSRV9EQVRBKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIHdhaXRpbmcoKSB7XG4gICAgaWYodGhpcy5lbC5yZWFkeVN0YXRlIDwgdGhpcy5lbC5IQVZFX0ZVVFVSRV9EQVRBKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIGJ1ZmZlckZ1bGwoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wb3N0ZXIgJiYgdGhpcy5maXJzdEJ1ZmZlcikge1xuICAgICAgdGhpcy5maXJzdEJ1ZmZlciA9IGZhbHNlXG4gICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nKCkpIHtcbiAgICAgICAgdGhpcy5lbC5wb3N0ZXIgPSB0aGlzLm9wdGlvbnMucG9zdGVyXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwucG9zdGVyID0gJydcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCB0aGlzLm5hbWUpXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZygpXG4gICAgdGhpcy5zdG9wKClcbiAgICB0aGlzLmVsLnNyYyA9ICcnXG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxuXG4gIHNlZWsoc2Vla0JhclZhbHVlKSB7XG4gICAgdmFyIHRpbWUgPSB0aGlzLmVsLmR1cmF0aW9uICogKHNlZWtCYXJWYWx1ZSAvIDEwMClcbiAgICB0aGlzLnNlZWtTZWNvbmRzKHRpbWUpXG4gIH1cblxuICBzZWVrU2Vjb25kcyh0aW1lKSB7XG4gICAgdGhpcy5lbC5jdXJyZW50VGltZSA9IHRpbWVcbiAgfVxuXG4gIGNoZWNrSW5pdGlhbFNlZWsoKSB7XG4gICAgdmFyIHNlZWtUaW1lID0gc2Vla1N0cmluZ1RvU2Vjb25kcyh3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICB0aGlzLnNlZWtTZWNvbmRzKHNlZWtUaW1lKVxuICB9XG5cbiAgZ2V0Q3VycmVudFRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwuY3VycmVudFRpbWVcbiAgfVxuXG4gIGdldER1cmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVsLmR1cmF0aW9uXG4gIH1cblxuICB0aW1lVXBkYXRlZCgpIHtcbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ2xpdmUnKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDEsIDEsIHRoaXMubmFtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aGlzLmVsLmN1cnJlbnRUaW1lLCB0aGlzLmVsLmR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgcHJvZ3Jlc3MoKSB7XG4gICAgaWYgKCF0aGlzLmVsLmJ1ZmZlcmVkLmxlbmd0aCkgcmV0dXJuXG4gICAgdmFyIGJ1ZmZlcmVkUG9zID0gMFxuICAgIGZvciAodmFyIGkgPSAwOyAgaSA8IHRoaXMuZWwuYnVmZmVyZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmVsLmN1cnJlbnRUaW1lID49IHRoaXMuZWwuYnVmZmVyZWQuc3RhcnQoaSkgJiYgdGhpcy5lbC5jdXJyZW50VGltZSA8PSB0aGlzLmVsLmJ1ZmZlcmVkLmVuZChpKSkge1xuICAgICAgICBidWZmZXJlZFBvcyA9IGlcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgdGhpcy5lbC5idWZmZXJlZC5zdGFydChidWZmZXJlZFBvcyksIHRoaXMuZWwuYnVmZmVyZWQuZW5kKGJ1ZmZlcmVkUG9zKSwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgdHlwZUZvcihzcmMpIHtcbiAgICByZXR1cm4gKHNyYy5pbmRleE9mKCcubTN1OCcpID4gMCkgPyAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnIDogJ3ZpZGVvL21wNCdcbiAgfVxuXG4gIHJlYWR5KCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMubmFtZSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7IHNyYzogdGhpcy5zcmMsIHR5cGU6IHRoaXMudHlwZUZvcih0aGlzLnNyYykgfSkpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vcHRpb25zLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpLCAwKTtcbiAgICBpZiAodGhpcy5lbC5yZWFkeVN0YXRlID09PSB0aGlzLmVsLkhBVkVfRU5PVUdIX0RBVEEpIHtcbiAgICAgIHRoaXMucmVhZHkoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbkhUTUw1VmlkZW8uY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlKSB7XG4gIHZhciBtaW1ldHlwZXMgPSB7XG4gICAgJ21wNCc6IFtcImF2YzEuNDJFMDFFXCIsIFwiYXZjMS41OEEwMUVcIiwgXCJhdmMxLjRENDAxRVwiLCBcImF2YzEuNjQwMDFFXCIsIFwibXA0di4yMC44XCIsIFwibXA0di4yMC4yNDBcIiwgXCJtcDRhLjQwLjJcIl0ubWFwKFxuICAgICAgKGNvZGVjKSA9PiB7IHJldHVybiAndmlkZW8vbXA0OyBjb2RlY3M9XCInICsgY29kZWMgKyAnLCBtcDRhLjQwLjJcIid9KSxcbiAgICAnb2dnJzogWyd2aWRlby9vZ2c7IGNvZGVjcz1cInRoZW9yYSwgdm9yYmlzXCInLCAndmlkZW8vb2dnOyBjb2RlY3M9XCJkaXJhY1wiJywgJ3ZpZGVvL29nZzsgY29kZWNzPVwidGhlb3JhLCBzcGVleFwiJ10sXG4gICAgJzNncHAnOiBbJ3ZpZGVvLzNncHA7IGNvZGVjcz1cIm1wNHYuMjAuOCwgc2FtclwiJ10sXG4gICAgJ3dlYm0nOiBbJ3ZpZGVvL3dlYm07IGNvZGVjcz1cInZwOCwgdm9yYmlzXCInXSxcbiAgICAnbWt2JzogWyd2aWRlby94LW1hdHJvc2thOyBjb2RlY3M9XCJ0aGVvcmEsIHZvcmJpc1wiJ10sXG4gICAgJ20zdTgnOiBbJ2FwcGxpY2F0aW9uL3gtbXBlZ1VSTCddXG4gIH1cbiAgbWltZXR5cGVzWydvZ3YnXSA9IG1pbWV0eXBlc1snb2dnJ11cbiAgbWltZXR5cGVzWyczZ3AnXSA9IG1pbWV0eXBlc1snM2dwcCddXG5cbiAgdmFyIHJlc291cmNlUGFydHMgPSByZXNvdXJjZS5zcGxpdCgnPycpWzBdLm1hdGNoKC8uKlxcLiguKikkLykgfHwgW11cbiAgaWYgKChyZXNvdXJjZVBhcnRzLmxlbmd0aCA+IDEpICYmIChtaW1ldHlwZXNbcmVzb3VyY2VQYXJ0c1sxXV0gIT09IHVuZGVmaW5lZCkpIHtcbiAgICB2YXIgdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICByZXR1cm4gISFmaW5kKG1pbWV0eXBlc1tyZXNvdXJjZVBhcnRzWzFdXSwgKGV4dCkgPT4geyByZXR1cm4gISF2LmNhblBsYXlUeXBlKGV4dCkucmVwbGFjZSgvbm8vLCAnJykgfSlcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIVE1MNVZpZGVvXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3BsYXliYWNrJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG5cbmNsYXNzIEhUTUxJbWcgZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2h0bWxfaW1nJyB9XG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ2ltZycgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2RhdGEtaHRtbC1pbWcnOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgc3VwZXIocGFyYW1zKVxuICAgIHRoaXMuZWwuc3JjID0gcGFyYW1zLnNyY1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbiB9XG5cbkhUTUxJbWcuY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlKSB7XG4gIHJldHVybiAhIXJlc291cmNlLm1hdGNoKC8oLiopLihwbmd8anBnfGpwZWd8Z2lmfGJtcCkvKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhUTUxJbWdcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9ub19vcCcpO1xuIiwidmFyIFBsYXliYWNrID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9wbGF5YmFjaycpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG5cbmNsYXNzIE5vT3AgZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ25vX29wJyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5ub19vcCB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7J2RhdGEtbm8tb3AnOiAnJ31cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKTtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpO1xuICAgIHRoaXMuYW5pbWF0ZSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBub2lzZSgpIHtcbiAgICB2YXIgaWRhdGEgPSB0aGlzLmNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHRoaXMuY29udGV4dC5jYW52YXMud2lkdGgsIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuICAgIHZhciBidWZmZXIzMiA9IG5ldyBVaW50MzJBcnJheShpZGF0YS5kYXRhLmJ1ZmZlcilcbiAgICB2YXIgbGVuID0gYnVmZmVyMzIubGVuZ3RoXG4gICAgdmFyIHJ1biA9IDBcbiAgICB2YXIgY29sb3IgPSAwXG4gICAgdmFyIG0gPSBNYXRoLnJhbmRvbSgpICogNiArIDRcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOykge1xuICAgICAgaWYgKHJ1biA8IDApIHtcbiAgICAgICAgcnVuID0gbSAqIE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHZhciBwID0gTWF0aC5wb3coTWF0aC5yYW5kb20oKSwgMC40KTtcbiAgICAgICAgY29sb3IgPSAoMjU1ICogcCkgPDwgMjQ7XG4gICAgICB9XG4gICAgICBydW4gLT0gMTtcbiAgICAgIGJ1ZmZlcjMyW2krK10gPSBjb2xvcjtcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YShpZGF0YSwgMCwgMCk7XG4gIH1cblxuICBsb29wKCkge1xuICAgIHRoaXMubm9pc2UoKVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmxvb3AoKSlcbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgdGhpcy5jYW52YXMgPSB0aGlzLiRlbC5maW5kKCdjYW52YXNbZGF0YS1uby1vcC1jYW52YXNdJylbMF1cbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgdGhpcy5sb29wKClcbiAgfVxufVxuXG5Ob09wLmNhblBsYXkgPSAoc291cmNlKSA9PiB7XG4gIHJldHVybiB0cnVlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm9PcFxuIiwiLy9Db3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9jb250YWluZXJfcGx1Z2luJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG5cbmNsYXNzIENsaWNrVG9QYXVzZVBsdWdpbiBleHRlbmRzIENvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2NsaWNrX3RvX3BhdXNlJyB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy5jaHJvbWVsZXNzKSB7XG4gICAgICBzdXBlcihvcHRpb25zKVxuICAgIH1cbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9DTElDSywgdGhpcy5jbGljaylcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NFVFRJTkdTVVBEQVRFLCB0aGlzLnNldHRpbmdzVXBkYXRlKVxuICB9XG5cbiAgY2xpY2soKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLmdldFBsYXliYWNrVHlwZSgpICE9PSAnbGl2ZScgfHwgdGhpcy5jb250YWluZXIuaXNEdnJFbmFibGVkKCkpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5wYXVzZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5wbGF5KClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXR0aW5nc1VwZGF0ZSgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci4kZWwucmVtb3ZlQ2xhc3MoJ3BvaW50ZXItZW5hYmxlZCcpXG4gICAgaWYgKHRoaXMuY29udGFpbmVyLmdldFBsYXliYWNrVHlwZSgpICE9PSAnbGl2ZScgfHwgdGhpcy5jb250YWluZXIuaXNEdnJFbmFibGVkKCkpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLiRlbC5hZGRDbGFzcygncG9pbnRlci1lbmFibGVkJylcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDbGlja1RvUGF1c2VQbHVnaW5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jbGlja190b19wYXVzZScpXG4iLCJ2YXIgVUlDb3JlUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91aV9jb3JlX3BsdWdpbicpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG52YXIgJCA9IHJlcXVpcmUoJ2NsYXBwci16ZXB0bycpXG5cbmNsYXNzIERWUkNvbnRyb2xzIGV4dGVuZHMgVUlDb3JlUGx1Z2luIHtcbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULmR2cl9jb250cm9scyB9XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2R2cl9jb250cm9scycgfVxuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xpY2sgLmxpdmUtYnV0dG9uJzogJ2NsaWNrJ1xuICAgIH1cbiAgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsYXNzJzogJ2R2ci1jb250cm9scycsXG4gICAgICAnZGF0YS1kdnItY29udHJvbHMnOiAnJyxcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihjb3JlKSB7XG4gICAgc3VwZXIoY29yZSlcbiAgICB0aGlzLmNvcmUgPSBjb3JlXG4gICAgdGhpcy5zZXR0aW5nc1VwZGF0ZSgpXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb3JlLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9DT05UQUlORVJDSEFOR0VELCB0aGlzLnNldHRpbmdzVXBkYXRlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb3JlLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9SRU5ERVJFRCwgdGhpcy5zZXR0aW5nc1VwZGF0ZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLRFZSU1RBVEVDSEFOR0VELCB0aGlzLmR2ckNoYW5nZWQpXG4gIH1cblxuICBkdnJDaGFuZ2VkKGR2ckVuYWJsZWQpIHtcbiAgICB0aGlzLnNldHRpbmdzVXBkYXRlKClcbiAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5hZGRDbGFzcygnbGl2ZScpXG4gICAgaWYgKGR2ckVuYWJsZWQpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmFkZENsYXNzKCdkdnInKVxuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kZWwuZmluZCgnLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtcG9zaXRpb25dLCAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1kdXJhdGlvbl0nKS5oaWRlKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kZWwucmVtb3ZlQ2xhc3MoJ2R2cicpXG4gICAgfVxuICB9XG5cbiAgY2xpY2soKSB7XG4gICAgaWYgKCF0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkge1xuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIucGxheSgpXG4gICAgfVxuICAgIGlmICh0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5oYXNDbGFzcygnZHZyJykpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldEN1cnJlbnRUaW1lKC0xKVxuICAgIH1cbiAgfVxuXG4gIHNldHRpbmdzVXBkYXRlKCkge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZygpXG4gICAgaWYodGhpcy5zaG91bGRSZW5kZXIoKSkge1xuICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgdGhpcy4kZWwuY2xpY2soKCkgPT4gdGhpcy5jbGljaygpKVxuICAgIH1cbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICB9XG5cbiAgc2hvdWxkUmVuZGVyKCkge1xuICAgIHZhciB1c2VEdnJDb250cm9scyA9IHRoaXMuY29yZS5vcHRpb25zLnVzZUR2ckNvbnRyb2xzID09PSB1bmRlZmluZWQgfHwgISF0aGlzLmNvcmUub3B0aW9ucy51c2VEdnJDb250cm9sc1xuICAgIHJldHVybiB1c2VEdnJDb250cm9scyAmJiB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ2xpdmUnXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSlcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgaWYgKHRoaXMuc2hvdWxkUmVuZGVyKCkpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmFkZENsYXNzKCdsaXZlJylcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJCgnLm1lZGlhLWNvbnRyb2wtbGVmdC1wYW5lbFtkYXRhLW1lZGlhLWNvbnRyb2xdJykuYXBwZW5kKHRoaXMuJGVsKVxuICAgICAgaWYgKHRoaXMuJGR1cmF0aW9uKSB7XG4gICAgICAgIHRoaXMuJGR1cmF0aW9uLnJlbW92ZSgpXG4gICAgICB9XG4gICAgICB0aGlzLiRkdXJhdGlvbiA9ICQoJzxzcGFuIGRhdGEtZHVyYXRpb24+PC9zcGFuPicpXG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLnNlZWtUaW1lLiRlbC5hcHBlbmQodGhpcy4kZHVyYXRpb24pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEVlJDb250cm9sc1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2R2cl9jb250cm9scycpXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9jb250YWluZXJfcGx1Z2luJyk7XG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxuXG5jbGFzcyBHb29nbGVBbmFseXRpY3MgZXh0ZW5kcyBDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdnb29nbGVfYW5hbHl0aWNzJyB9XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIGlmIChvcHRpb25zLmdhQWNjb3VudCkge1xuICAgICAgdGhpcy5hY2NvdW50ID0gb3B0aW9ucy5nYUFjY291bnRcbiAgICAgIHRoaXMudHJhY2tlck5hbWUgPSAob3B0aW9ucy5nYVRyYWNrZXJOYW1lKSA/IG9wdGlvbnMuZ2FUcmFja2VyTmFtZSArIFwiLlwiIDogJ0NsYXBwci4nXG4gICAgICB0aGlzLmRvbWFpbk5hbWUgPSBvcHRpb25zLmdhRG9tYWluTmFtZVxuICAgICAgdGhpcy5jdXJyZW50SERTdGF0ZSA9IHVuZGVmaW5lZFxuICAgICAgdGhpcy5lbWJlZFNjcmlwdCgpXG4gICAgfVxuICB9XG5cbiAgZW1iZWRTY3JpcHQoKSB7XG4gICAgaWYgKCF3aW5kb3cuX2dhdCkge1xuICAgICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHQvamF2YXNjcmlwdFwiKVxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcImFzeW5jXCIsIFwiYXN5bmNcIilcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJodHRwOi8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2dhLmpzXCIpXG4gICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4gdGhpcy5hZGRFdmVudExpc3RlbmVycygpXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpXG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVksIHRoaXMub25QbGF5KVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLm9uU3RvcClcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUEFVU0UsIHRoaXMub25QYXVzZSlcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRU5ERUQsIHRoaXMub25FbmRlZClcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSSU5HLCB0aGlzLm9uQnVmZmVyaW5nKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMLCB0aGlzLm9uQnVmZmVyRnVsbClcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRU5ERUQsIHRoaXMub25FbmRlZClcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRVJST1IsIHRoaXMub25FcnJvcilcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tTVEFURSwgdGhpcy5vblBsYXliYWNrQ2hhbmdlZClcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfVk9MVU1FLCAoZXZlbnQpID0+IHRoaXMub25Wb2x1bWVDaGFuZ2VkKGV2ZW50KSlcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VFSywgKGV2ZW50KSA9PiB0aGlzLm9uU2VlayhldmVudCkpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0ZVTExfU0NSRUVOLCB0aGlzLm9uRnVsbHNjcmVlbilcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfSElHSERFRklOSVRJT05VUERBVEUsIHRoaXMub25IRClcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQsIHRoaXMub25EVlIpXG4gICAgfVxuICAgIF9nYXEucHVzaChbdGhpcy50cmFja2VyTmFtZSArICdfc2V0QWNjb3VudCcsIHRoaXMuYWNjb3VudF0pO1xuICAgIGlmICghIXRoaXMuZG9tYWluTmFtZSlcbiAgICAgIF9nYXEucHVzaChbdGhpcy50cmFja2VyTmFtZSArICdfc2V0RG9tYWluTmFtZScsIHRoaXMuZG9tYWluTmFtZV0pO1xuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIlBsYXlcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uU3RvcCgpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJTdG9wXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvbkVuZGVkKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIkVuZGVkXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvbkJ1ZmZlcmluZygpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJCdWZmZXJpbmdcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uQnVmZmVyRnVsbCgpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJCdWZmZXJmdWxsXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvbkVycm9yKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIkVycm9yXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvbkhEKCkge1xuICAgIHZhciBzdGF0dXMgPSB0aGlzLmNvbnRhaW5lci5pc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKT8gXCJPTlwiOiBcIk9GRlwiXG4gICAgaWYgKHN0YXR1cyAhPT0gdGhpcy5jdXJyZW50SERTdGF0ZSkge1xuICAgICAgdGhpcy5jdXJyZW50SERTdGF0ZSA9IHN0YXR1c1xuICAgICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiSEQgLSBcIiArIHN0YXR1cywgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgICB9XG4gIH1cblxuXG4gIG9uUGxheWJhY2tDaGFuZ2VkKCkge1xuICAgIHZhciB0eXBlID0gdGhpcy5jb250YWluZXIuZ2V0UGxheWJhY2tUeXBlKClcbiAgICBpZiAodHlwZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiUGxheWJhY2sgVHlwZSAtIFwiICsgdHlwZSwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgICB9XG4gIH1cblxuICBvbkRWUihkdnJJblVzZSkge1xuICAgIHZhciBzdGF0dXMgPSBkdnJJblVzZT8gXCJPTlwiOiBcIk9GRlwiXG4gICAgdGhpcy5wdXNoKFtcIkludGVyYWN0aW9uXCIsIFwiRFZSIC0gXCIgKyBzdGF0dXMsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvblBhdXNlKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIlBhdXNlXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvblNlZWsoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiU2Vla1wiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25Wb2x1bWVDaGFuZ2VkKCkge1xuICAgIHRoaXMucHVzaChbXCJJbnRlcmFjdGlvblwiLCBcIlZvbHVtZVwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25GdWxsc2NyZWVuKCkge1xuICAgIHRoaXMucHVzaChbXCJJbnRlcmFjdGlvblwiLCBcIkZ1bGxzY3JlZW5cIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG5cbiAgcHVzaChhcnJheSkge1xuICAgIHZhciByZXMgPSBbdGhpcy50cmFja2VyTmFtZSArIFwiX3RyYWNrRXZlbnRcIl0uY29uY2F0KGFycmF5KVxuICAgIF9nYXEucHVzaChyZXMpXG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdvb2dsZUFuYWx5dGljcztcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9nb29nbGVfYW5hbHl0aWNzJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbG9nJyk7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgS2libyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uva2libycpXG5cbmNsYXNzIExvZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMua2libyA9IG5ldyBLaWJvKClcbiAgICB0aGlzLmtpYm8uZG93bihbJ2N0cmwgc2hpZnQgZCddLCAoKSA9PiB0aGlzLm9uT2ZmKCkpXG4gICAgdGhpcy5CTEFDS0xJU1QgPSBbJ3BsYXliYWNrOnRpbWV1cGRhdGUnLCAncGxheWJhY2s6cHJvZ3Jlc3MnLCAnY29udGFpbmVyOmhvdmVyJywgJ2NvbnRhaW5lcjp0aW1ldXBkYXRlJywgJ2NvbnRhaW5lcjpwcm9ncmVzcyddO1xuICB9XG5cbiAgaW5mbyhrbGFzcywgbWVzc2FnZSkge3RoaXMubG9nKGtsYXNzLCAnaW5mbycsIG1lc3NhZ2UpfVxuICB3YXJuKGtsYXNzLCBtZXNzYWdlKSB7dGhpcy5sb2coa2xhc3MsICd3YXJuJywgbWVzc2FnZSl9XG4gIGRlYnVnKGtsYXNzLCBtZXNzYWdlKSB7dGhpcy5sb2coa2xhc3MsICdkZWJ1ZycsIG1lc3NhZ2UpfVxuXG4gIG9uT2ZmKCkge1xuICAgIHdpbmRvdy5ERUJVRyA9ICF3aW5kb3cuREVCVUdcbiAgICBpZiAod2luZG93LkRFQlVHKSB7IGNvbnNvbGUubG9nKCdsb2cgZW5hYmxlZCcpOyAgfVxuICAgIGVsc2UgeyBjb25zb2xlLmxvZygnbG9nIGRpc2FibGVkJyk7IH1cbiAgfVxuXG4gIGxvZyhrbGFzcywgbGV2ZWwsIG1lc3NhZ2UpIHtcbiAgICBpZiAoIXdpbmRvdy5ERUJVRyB8fCB0aGlzLkJMQUNLTElTVC5pbmRleE9mKG1lc3NhZ2UpID49IDApIHJldHVyblxuICAgIHZhciBjb2xvclxuICAgIGlmIChsZXZlbCA9PT0gJ3dhcm4nKSB7IGNvbG9yID0gJyNGRjgwMDAnIH1cbiAgICBlbHNlIGlmIChsZXZlbCA9PT0gJ2luZm8nKSB7IGNvbG9yID0gJyMwMDY2MDAnIH1cbiAgICBlbHNlIGlmIChsZXZlbCA9PT0gJ2Vycm9yJykgeyBjb2xvciA9ICcjRkYwMDAwJ31cbiAgICBjb25zb2xlLmxvZyhcIiVjIFtcIiArIGtsYXNzICsgXCJdIFtcIiArIGxldmVsICsgXCJdIFwiICsgIG1lc3NhZ2UsICdjb2xvcjogJytjb2xvcik7XG4gIH1cbn1cblxuTG9nLmdldEluc3RhbmNlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpXG4gIH1cbiAgcmV0dXJuIHRoaXMuX2luc3RhbmNlXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBMb2dcbiIsIi8vQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFVJQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91aV9jb250YWluZXJfcGx1Z2luJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcblxudmFyIE1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9tZWRpYXRvcicpXG52YXIgUGxheWVySW5mbyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvcGxheWVyX2luZm8nKVxuXG52YXIgJCA9IHJlcXVpcmUoJ2NsYXBwci16ZXB0bycpXG5cbmNsYXNzIFBvc3RlclBsdWdpbiBleHRlbmRzIFVJQ29udGFpbmVyUGx1Z2luIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAncG9zdGVyJyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5wb3N0ZXIgfVxuXG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAncGxheWVyLXBvc3RlcicsXG4gICAgICAnZGF0YS1wb3N0ZXInOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGljayc6ICdjbGlja2VkJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmNvbnRhaW5lci5kaXNhYmxlTWVkaWFDb250cm9sKClcbiAgICB0aGlzLnJlbmRlcigpXG4gICAgdGhpcy5idWZmZXJGdWxsID0gZmFsc2VcbiAgfVxuXG4gIGxvYWQoc291cmNlKSB7XG4gICAgdGhpcy5vcHRpb25zLnBvc3RlciA9IHNvdXJjZVxuICAgIHRoaXMucmVuZGVyKClcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJJTkcsIHRoaXMub25CdWZmZXJpbmcpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMLCB0aGlzLm9uQnVmZmVyZnVsbClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWSwgdGhpcy5vblBsYXkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcy5vblN0b3ApXG4gICAgTWVkaWF0b3Iub24oRXZlbnRzLlBMQVlFUl9SRVNJWkUsIHRoaXMudXBkYXRlU2l6ZSwgdGhpcylcbiAgfVxuXG4gIHN0b3BMaXN0ZW5pbmcoKSB7XG4gICAgc3VwZXIuc3RvcExpc3RlbmluZygpXG4gICAgTWVkaWF0b3Iub2ZmKEV2ZW50cy5QTEFZRVJfUkVTSVpFLCB0aGlzLnVwZGF0ZVNpemUsIHRoaXMpXG4gIH1cblxuICBvbkJ1ZmZlcmluZygpIHtcbiAgICB0aGlzLmJ1ZmZlckZ1bGwgPSBmYWxzZVxuICAgIHRoaXMuaGlkZVBsYXlCdXR0b24oKVxuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIGlmICh0aGlzLmJ1ZmZlckZ1bGwpIHtcbiAgICAgIHRoaXMuJGVsLmhpZGUoKVxuICAgICAgdGhpcy5jb250YWluZXIuZW5hYmxlTWVkaWFDb250cm9sKClcbiAgICB9XG4gIH1cblxuICBvbkJ1ZmZlcmZ1bGwoKSB7XG4gICAgdGhpcy5idWZmZXJGdWxsID0gdHJ1ZVxuICAgIGlmICh0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5uYW1lID09PSAnaHRtbDVfdmlkZW8nICYmICF0aGlzLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkgcmV0dXJuXG4gICAgdGhpcy4kZWwuaGlkZSgpXG4gICAgdGhpcy5jb250YWluZXIuZW5hYmxlTWVkaWFDb250cm9sKClcbiAgfVxuXG4gIG9uU3RvcCgpIHtcbiAgICB0aGlzLiRlbC5zaG93KClcbiAgICB0aGlzLmNvbnRhaW5lci5kaXNhYmxlTWVkaWFDb250cm9sKClcbiAgICB0aGlzLnNob3dQbGF5QnV0dG9uKClcbiAgfVxuXG4gIHNob3dQbGF5QnV0dG9uKCkge1xuICAgIHRoaXMuJHBsYXlCdXR0b24uc2hvdygpXG4gICAgdGhpcy51cGRhdGVTaXplKClcbiAgfVxuXG4gIGhpZGVQbGF5QnV0dG9uKCkge1xuICAgIHRoaXMuJHBsYXlCdXR0b24uaGlkZSgpXG4gIH1cblxuICBjbGlja2VkKCkge1xuICAgIGlmICghdGhpcy5vcHRpb25zLmNocm9tZWxlc3MpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnBsYXkoKVxuICAgICAgdGhpcy5oaWRlUGxheUJ1dHRvbigpXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdXBkYXRlU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIucGxheWJhY2submFtZSA9PT0gJ2h0bWxfaW1nJykgcmV0dXJuXG4gICAgdmFyIGhlaWdodCA9IFBsYXllckluZm8uY3VycmVudFNpemUgPyBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplLmhlaWdodCA6IHRoaXMuJGVsLmhlaWdodCgpXG4gICAgdGhpcy4kZWwuY3NzKHsgZm9udFNpemU6IGhlaWdodCB9KVxuICAgIGlmICh0aGlzLiRwbGF5V3JhcHBlci5pcygnOnZpc2libGUnKSkge1xuICAgICAgdGhpcy4kcGxheVdyYXBwZXIuY3NzKHsgbWFyZ2luVG9wOiAtKHRoaXMuJHBsYXlXcmFwcGVyLmhlaWdodCgpIC8gMikgfSlcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLnBsYXliYWNrLm5hbWUgPT09ICdodG1sX2ltZycpIHJldHVyblxuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUsIHtiYXNlVXJsOiB0aGlzLm9wdGlvbnMuYmFzZVVybH0pWzBdXG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKCkpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIGlmICh0aGlzLm9wdGlvbnMucG9zdGVyKSB7XG4gICAgICB2YXIgaW1nRWwgPSAkKCc8ZGl2IGRhdGEtcG9zdGVyIGNsYXNzPVwicG9zdGVyLWJhY2tncm91bmRcIj48L2Rpdj4nKVxuICAgICAgaW1nRWwuY3NzKHsnYmFja2dyb3VuZC1pbWFnZSc6ICd1cmwoJyArIHRoaXMub3B0aW9ucy5wb3N0ZXIgKyAnKSd9KVxuICAgICAgdGhpcy4kZWwucHJlcGVuZChpbWdFbClcbiAgICB9XG4gICAgdGhpcy5jb250YWluZXIuJGVsLmFwcGVuZCh0aGlzLmVsKVxuICAgIHRoaXMuJHBsYXlCdXR0b24gPSB0aGlzLiRlbC5maW5kKCcucG9zdGVyLWljb24nKVxuICAgIHRoaXMuJHBsYXlXcmFwcGVyID0gdGhpcy4kZWwuZmluZCgnLnBsYXktd3JhcHBlcicpXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZVNpemUoKSwgMClcbiAgICBpZiAodGhpcy5vcHRpb25zLmNocm9tZWxlc3MpIHtcbiAgICAgIHRoaXMuaGlkZVBsYXlCdXR0b24oKVxuICAgICAgdGhpcy4kZWwuY3NzKHsnY3Vyc29yJzogJ2luaXRpYWwnfSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RlclBsdWdpblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NwaW5uZXJfdGhyZWVfYm91bmNlJyk7XG5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBVSUNvbnRhaW5lclBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdWlfY29udGFpbmVyX3BsdWdpbicpO1xudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJyk7XG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpO1xuXG5jbGFzcyBTcGlubmVyVGhyZWVCb3VuY2VQbHVnaW4gZXh0ZW5kcyBVSUNvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ3NwaW5uZXInIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkYXRhLXNwaW5uZXInOicnLFxuICAgICAgJ2NsYXNzJzogJ3NwaW5uZXItdGhyZWUtYm91bmNlJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMudGVtcGxhdGUgPSBKU1Quc3Bpbm5lcl90aHJlZV9ib3VuY2VcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORywgdGhpcy5vbkJ1ZmZlcmluZylcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMub25CdWZmZXJGdWxsKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5vblN0b3ApXG4gICAgdGhpcy5yZW5kZXIoKVxuICB9XG5cbiAgb25CdWZmZXJpbmcoKSB7XG4gICAgdGhpcy4kZWwuc2hvdygpXG4gIH1cblxuICBvbkJ1ZmZlckZ1bGwoKSB7XG4gICAgdGhpcy4kZWwuaGlkZSgpXG4gIH1cblxuICBvblN0b3AoKSB7XG4gICAgdGhpcy4kZWwuaGlkZSgpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKCkpXG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKCdzcGlubmVyX3RocmVlX2JvdW5jZScpXG4gICAgdGhpcy5jb250YWluZXIuJGVsLmFwcGVuZChzdHlsZSlcbiAgICB0aGlzLmNvbnRhaW5lci4kZWwuYXBwZW5kKHRoaXMuJGVsKVxuICAgIHRoaXMuJGVsLmhpZGUoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTcGlubmVyVGhyZWVCb3VuY2VQbHVnaW47XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc3RhdHMnKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIENvbnRhaW5lclBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvY29udGFpbmVyX3BsdWdpbicpO1xudmFyICQgPSByZXF1aXJlKFwiY2xhcHByLXplcHRvXCIpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJyk7XG5cbmNsYXNzIFN0YXRzUGx1Z2luIGV4dGVuZHMgQ29udGFpbmVyUGx1Z2luIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnc3RhdHMnIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnNldEluaXRpYWxBdHRycygpXG4gICAgdGhpcy5yZXBvcnRJbnRlcnZhbCA9IG9wdGlvbnMucmVwb3J0SW50ZXJ2YWwgfHwgNTAwMFxuICAgIHRoaXMuc3RhdGUgPSBcIklETEVcIlxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUExBWSwgdGhpcy5vblBsYXkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLm9uU3RvcClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCwgdGhpcy5vblN0b3ApXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJJTkcsIHRoaXMub25CdWZmZXJpbmcpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMLCB0aGlzLm9uQnVmZmVyRnVsbClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRTX0FERCwgdGhpcy5vblN0YXRzQWRkKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfQklUUkFURSwgdGhpcy5vblN0YXRzQWRkKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19TVEFUU19BREQsIHRoaXMub25TdGF0c0FkZClcbiAgfVxuXG4gIHNldEluaXRpYWxBdHRycygpIHtcbiAgICB0aGlzLmZpcnN0UGxheSA9IHRydWVcbiAgICB0aGlzLnN0YXJ0dXBUaW1lID0gMFxuICAgIHRoaXMucmVidWZmZXJpbmdUaW1lID0gMFxuICAgIHRoaXMud2F0Y2hpbmdUaW1lID0gMFxuICAgIHRoaXMucmVidWZmZXJzID0gMFxuICAgIHRoaXMuZXh0ZXJuYWxNZXRyaWNzID0ge31cbiAgfVxuXG4gIG9uUGxheSgpIHtcbiAgICB0aGlzLnN0YXRlID0gXCJQTEFZSU5HXCJcbiAgICB0aGlzLndhdGNoaW5nVGltZUluaXQgPSBEYXRlLm5vdygpXG4gICAgaWYgKCF0aGlzLmludGVydmFsSWQpIHtcbiAgICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHRoaXMucmVwb3J0LmJpbmQodGhpcyksIHRoaXMucmVwb3J0SW50ZXJ2YWwpXG4gICAgfVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKVxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHVuZGVmaW5lZFxuICAgIHRoaXMuc3RhdGUgPSBcIlNUT1BQRURcIlxuICB9XG5cbiAgb25CdWZmZXJpbmcoKSB7XG4gICAgaWYgKHRoaXMuZmlyc3RQbGF5KSB7XG4gICAgICB0aGlzLnN0YXJ0dXBUaW1lSW5pdCA9IERhdGUubm93KClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZWJ1ZmZlcmluZ1RpbWVJbml0ID0gRGF0ZS5ub3coKVxuICAgIH1cbiAgICB0aGlzLnN0YXRlID0gXCJCVUZGRVJJTkdcIlxuICAgIHRoaXMucmVidWZmZXJzKytcbiAgfVxuXG4gIG9uQnVmZmVyRnVsbCgpIHtcbiAgICBpZiAodGhpcy5maXJzdFBsYXkgJiYgISF0aGlzLnN0YXJ0dXBUaW1lSW5pdCkge1xuICAgICAgdGhpcy5maXJzdFBsYXkgPSBmYWxzZVxuICAgICAgdGhpcy5zdGFydHVwVGltZSA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0dXBUaW1lSW5pdFxuICAgICAgdGhpcy53YXRjaGluZ1RpbWVJbml0ID0gRGF0ZS5ub3coKVxuICAgIH0gZWxzZSBpZiAoISF0aGlzLnJlYnVmZmVyaW5nVGltZUluaXQpIHtcbiAgICAgIHRoaXMucmVidWZmZXJpbmdUaW1lICs9IHRoaXMuZ2V0UmVidWZmZXJpbmdUaW1lKClcbiAgICB9XG4gICAgdGhpcy5yZWJ1ZmZlcmluZ1RpbWVJbml0ID0gdW5kZWZpbmVkXG4gICAgdGhpcy5zdGF0ZSA9IFwiUExBWUlOR1wiXG4gIH1cblxuICBnZXRSZWJ1ZmZlcmluZ1RpbWUoKSB7XG4gICAgcmV0dXJuIERhdGUubm93KCkgLSB0aGlzLnJlYnVmZmVyaW5nVGltZUluaXRcbiAgfVxuXG4gIGdldFdhdGNoaW5nVGltZSgpIHtcbiAgICB2YXIgdG90YWxUaW1lID0gKERhdGUubm93KCkgLSB0aGlzLndhdGNoaW5nVGltZUluaXQpXG4gICAgcmV0dXJuIHRvdGFsVGltZSAtIHRoaXMucmVidWZmZXJpbmdUaW1lXG4gIH1cblxuICBpc1JlYnVmZmVyaW5nKCkge1xuICAgIHJldHVybiAhIXRoaXMucmVidWZmZXJpbmdUaW1lSW5pdFxuICB9XG5cbiAgb25TdGF0c0FkZChtZXRyaWMpIHtcbiAgICAkLmV4dGVuZCh0aGlzLmV4dGVybmFsTWV0cmljcywgbWV0cmljKVxuICB9XG5cbiAgZ2V0U3RhdHMoKSB7XG4gICAgdmFyIG1ldHJpY3MgPSB7XG4gICAgICBzdGFydHVwVGltZTogICAgIHRoaXMuc3RhcnR1cFRpbWUsXG4gICAgICByZWJ1ZmZlcnM6ICAgICAgIHRoaXMucmVidWZmZXJzLFxuICAgICAgcmVidWZmZXJpbmdUaW1lOiB0aGlzLmlzUmVidWZmZXJpbmcoKT8gdGhpcy5yZWJ1ZmZlcmluZ1RpbWUgKyB0aGlzLmdldFJlYnVmZmVyaW5nVGltZSgpOiB0aGlzLnJlYnVmZmVyaW5nVGltZSxcbiAgICAgIHdhdGNoaW5nVGltZTogICAgdGhpcy5pc1JlYnVmZmVyaW5nKCk/IHRoaXMuZ2V0V2F0Y2hpbmdUaW1lKCkgLSB0aGlzLmdldFJlYnVmZmVyaW5nVGltZSgpOiB0aGlzLmdldFdhdGNoaW5nVGltZSgpXG4gICAgfVxuICAgICQuZXh0ZW5kKG1ldHJpY3MsIHRoaXMuZXh0ZXJuYWxNZXRyaWNzKVxuICAgIHJldHVybiBtZXRyaWNzXG4gIH1cblxuICByZXBvcnQoKSB7XG4gICAgdGhpcy5jb250YWluZXIuc3RhdHNSZXBvcnQodGhpcy5nZXRTdGF0cygpKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdHNQbHVnaW47XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vd2F0ZXJtYXJrJyk7XG5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBVSUNvbnRhaW5lclBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdWlfY29udGFpbmVyX3BsdWdpbicpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG5cbmNsYXNzIFdhdGVyTWFya1BsdWdpbiBleHRlbmRzIFVJQ29udGFpbmVyUGx1Z2luIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnd2F0ZXJtYXJrJyB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy50ZW1wbGF0ZSA9IEpTVFt0aGlzLm5hbWVdXG4gICAgdGhpcy5wb3NpdGlvbiA9IG9wdGlvbnMucG9zaXRpb24gfHwgXCJib3R0b20tcmlnaHRcIlxuICAgIGlmIChvcHRpb25zLndhdGVybWFyaykge1xuICAgICAgdGhpcy5pbWFnZVVybCA9IG9wdGlvbnMud2F0ZXJtYXJrXG4gICAgICB0aGlzLnJlbmRlcigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsLnJlbW92ZSgpXG4gICAgfVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVksIHRoaXMub25QbGF5KVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5vblN0b3ApXG4gIH1cblxuICBvblBsYXkoKSB7XG4gICAgaWYgKCF0aGlzLmhpZGRlbilcbiAgICAgIHRoaXMuJGVsLnNob3coKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMuJGVsLmhpZGUoKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuJGVsLmhpZGUoKVxuICAgIHZhciB0ZW1wbGF0ZU9wdGlvbnMgPSB7cG9zaXRpb246IHRoaXMucG9zaXRpb24sIGltYWdlVXJsOiB0aGlzLmltYWdlVXJsfVxuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh0ZW1wbGF0ZU9wdGlvbnMpKVxuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpXG4gICAgdGhpcy5jb250YWluZXIuJGVsLmFwcGVuZChzdHlsZSlcbiAgICB0aGlzLmNvbnRhaW5lci4kZWwuYXBwZW5kKHRoaXMuJGVsKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXYXRlck1hcmtQbHVnaW5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciB1bmlxdWVJZCA9IHJlcXVpcmUoJy4vdXRpbHMnKS51bmlxdWVJZFxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4vZXZlbnRzJylcblxuY2xhc3MgQmFzZU9iamVjdCBleHRlbmRzIEV2ZW50cyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM9e30pIHtcbiAgICB0aGlzLnVuaXF1ZUlkID0gdW5pcXVlSWQoJ28nKVxuICAgIHRoaXMuY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VPYmplY3RcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbmNsYXNzIEJyb3dzZXIge1xufVxuXG52YXIgaGFzTG9jYWxzdG9yYWdlID0gZnVuY3Rpb24oKXtcbiAgdHJ5IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhcHByJywgJ2NsYXBwcicpXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NsYXBwcicpXG4gICAgcmV0dXJuIHRydWVcbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxudmFyIGhhc0ZsYXNoID0gZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGZvID0gbmV3IEFjdGl2ZVhPYmplY3QoJ1Nob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoJyk7XG4gICAgcmV0dXJuICEhZm87XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gISEobmF2aWdhdG9yLm1pbWVUeXBlcyAmJiBuYXZpZ2F0b3IubWltZVR5cGVzWydhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCddICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgbmF2aWdhdG9yLm1pbWVUeXBlc1snYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnXS5lbmFibGVkUGx1Z2luKTtcbiAgfVxufVxuXG5Ccm93c2VyLmlzU2FmYXJpID0gKCEhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvc2FmYXJpL2kpICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPT09IC0xKVxuQnJvd3Nlci5pc0Nocm9tZSA9ICEhKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2Nocm9tZS9pKSlcbkJyb3dzZXIuaXNGaXJlZm94ID0gISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvZmlyZWZveC9pKSlcbkJyb3dzZXIuaXNMZWdhY3lJRSA9ICEhKHdpbmRvdy5BY3RpdmVYT2JqZWN0KVxuQnJvd3Nlci5pc0lFID0gQnJvd3Nlci5pc0xlZ2FjeUlFIHx8ICEhKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL3RyaWRlbnQuKnJ2OjFcXGQvaSkpXG5Ccm93c2VyLmlzSUUxMSA9ICEhKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL3RyaWRlbnQuKnJ2OjExL2kpKVxuQnJvd3Nlci5pc01vYmlsZSA9ICEhKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxXaW5kb3dzIFBob25lfElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKVxuQnJvd3Nlci5pc1dpbjhBcHAgPSAhISgvTVNBcHBIb3N0L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSlcbkJyb3dzZXIuaXNXaWlVID0gISEoL1dpaVUvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKVxuQnJvd3Nlci5pc1BTNCA9ICEhKC9QbGF5U3RhdGlvbiA0L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSlcbkJyb3dzZXIuaGFzTG9jYWxzdG9yYWdlID0gaGFzTG9jYWxzdG9yYWdlKClcbkJyb3dzZXIuaGFzRmxhc2ggPSBoYXNGbGFzaCgpXG5cbm1vZHVsZS5leHBvcnRzID0gQnJvd3NlclxuIiwidmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCcuL2Jhc2Vfb2JqZWN0JylcblxuY2xhc3MgQ29udGFpbmVyUGx1Z2luIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmJpbmRFdmVudHMoKVxuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29udGFpbmVyJyk7XG4iLCJ2YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJy4vYmFzZV9vYmplY3QnKVxuXG5jbGFzcyBDb3JlUGx1Z2luIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKGNvcmUpIHtcbiAgICBzdXBlcihjb3JlKVxuICAgIHRoaXMuY29yZSA9IGNvcmVcbiAgfVxuXG4gIGdldEV4dGVybmFsSW50ZXJmYWNlKCkgeyByZXR1cm4ge30gfVxuXG4gIGRlc3Ryb3koKSB7fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvcmVQbHVnaW5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb3JlJyk7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgZXhlY09uY2UgPSByZXF1aXJlKCdsb2Rhc2gub25jZScpXG52YXIgdW5pcXVlSWQgPSByZXF1aXJlKCcuL3V0aWxzJykudW5pcXVlSWRcbnZhciBMb2cgPSByZXF1aXJlKCcuLi9wbHVnaW5zL2xvZycpLmdldEluc3RhbmNlKClcblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG5cbmNsYXNzIEV2ZW50cyB7XG4gIG9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKCFldmVudHNBcGkodGhpcywgJ29uJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpc1xuICAgIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pXG4gICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCAodGhpcy5fZXZlbnRzW25hbWVdID0gW10pXG4gICAgZXZlbnRzLnB1c2goe2NhbGxiYWNrOiBjYWxsYmFjaywgY29udGV4dDogY29udGV4dCwgY3R4OiBjb250ZXh0IHx8IHRoaXN9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBvbmNlKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKCFldmVudHNBcGkodGhpcywgJ29uY2UnLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSB8fCAhY2FsbGJhY2spIHJldHVybiB0aGlzXG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgdmFyIG9uY2UgPSBleGVjT25jZShmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIG9uY2UpXG4gICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgfSlcbiAgICBvbmNlLl9jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgb25jZSwgY29udGV4dClcbiAgfVxuXG4gIG9mZihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciByZXRhaW4sIGV2LCBldmVudHMsIG5hbWVzLCBpLCBsLCBqLCBrXG4gICAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIWV2ZW50c0FwaSh0aGlzLCAnb2ZmJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkpIHJldHVybiB0aGlzXG4gICAgaWYgKCFuYW1lICYmICFjYWxsYmFjayAmJiAhY29udGV4dCkge1xuICAgICAgdGhpcy5fZXZlbnRzID0gdm9pZCAwXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyh0aGlzLl9ldmVudHMpXG4gICAgZm9yIChpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgbmFtZSA9IG5hbWVzW2ldXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV1cbiAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzW25hbWVdID0gcmV0YWluID0gW11cbiAgICAgICAgaWYgKGNhbGxiYWNrIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICBmb3IgKGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgZXYgPSBldmVudHNbal1cbiAgICAgICAgICAgIGlmICgoY2FsbGJhY2sgJiYgY2FsbGJhY2sgIT09IGV2LmNhbGxiYWNrICYmIGNhbGxiYWNrICE9PSBldi5jYWxsYmFjay5fY2FsbGJhY2spIHx8XG4gICAgICAgICAgICAgICAgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXYuY29udGV4dCkpIHtcbiAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXYpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkgZGVsZXRlIHRoaXMuX2V2ZW50c1tuYW1lXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdHJpZ2dlcihuYW1lKSB7XG4gICAgdmFyIGtsYXNzID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXVxuICAgIExvZy5pbmZvKGtsYXNzLCBuYW1lKVxuICAgIGlmICghdGhpcy5fZXZlbnRzKSByZXR1cm4gdGhpc1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgaWYgKCFldmVudHNBcGkodGhpcywgJ3RyaWdnZXInLCBuYW1lLCBhcmdzKSkgcmV0dXJuIHRoaXNcbiAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdXG4gICAgdmFyIGFsbEV2ZW50cyA9IHRoaXMuX2V2ZW50cy5hbGxcbiAgICBpZiAoZXZlbnRzKSB0cmlnZ2VyRXZlbnRzKGV2ZW50cywgYXJncylcbiAgICBpZiAoYWxsRXZlbnRzKSB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdG9wTGlzdGVuaW5nKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgbGlzdGVuaW5nVG8gPSB0aGlzLl9saXN0ZW5pbmdUb1xuICAgIGlmICghbGlzdGVuaW5nVG8pIHJldHVybiB0aGlzXG4gICAgdmFyIHJlbW92ZSA9ICFuYW1lICYmICFjYWxsYmFja1xuICAgIGlmICghY2FsbGJhY2sgJiYgdHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXNcbiAgICBpZiAob2JqKSAobGlzdGVuaW5nVG8gPSB7fSlbb2JqLl9saXN0ZW5JZF0gPSBvYmpcbiAgICBmb3IgKHZhciBpZCBpbiBsaXN0ZW5pbmdUbykge1xuICAgICAgb2JqID0gbGlzdGVuaW5nVG9baWRdXG4gICAgICBvYmoub2ZmKG5hbWUsIGNhbGxiYWNrLCB0aGlzKVxuICAgICAgaWYgKHJlbW92ZSB8fCBPYmplY3Qua2V5cyhvYmouX2V2ZW50cykubGVuZ3RoID09PSAwKSBkZWxldGUgdGhpcy5fbGlzdGVuaW5nVG9baWRdXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxudmFyIGV2ZW50U3BsaXR0ZXIgPSAvXFxzKy9cblxudmFyIGV2ZW50c0FwaSA9IGZ1bmN0aW9uKG9iaiwgYWN0aW9uLCBuYW1lLCByZXN0KSB7XG4gIGlmICghbmFtZSkgcmV0dXJuIHRydWVcblxuICAvLyBIYW5kbGUgZXZlbnQgbWFwcy5cbiAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtrZXksIG5hbWVba2V5XV0uY29uY2F0KHJlc3QpKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIEhhbmRsZSBzcGFjZSBzZXBhcmF0ZWQgZXZlbnQgbmFtZXMuXG4gIGlmIChldmVudFNwbGl0dGVyLnRlc3QobmFtZSkpIHtcbiAgICB2YXIgbmFtZXMgPSBuYW1lLnNwbGl0KGV2ZW50U3BsaXR0ZXIpXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG9ialthY3Rpb25dLmFwcGx5KG9iaiwgW25hbWVzW2ldXS5jb25jYXQocmVzdCkpXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxudmFyIHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MpIHtcbiAgdmFyIGV2LCBpID0gLTEsIGwgPSBldmVudHMubGVuZ3RoLCBhMSA9IGFyZ3NbMF0sIGEyID0gYXJnc1sxXSwgYTMgPSBhcmdzWzJdXG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4KTsgcmV0dXJuXG4gICAgY2FzZSAxOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEpOyByZXR1cm5cbiAgICBjYXNlIDI6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIpOyByZXR1cm5cbiAgICBjYXNlIDM6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIsIGEzKTsgcmV0dXJuXG4gICAgZGVmYXVsdDogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suYXBwbHkoZXYuY3R4LCBhcmdzKTsgcmV0dXJuXG4gIH1cbn1cblxudmFyIGxpc3Rlbk1ldGhvZHMgPSB7bGlzdGVuVG86ICdvbicsIGxpc3RlblRvT25jZTogJ29uY2UnfVxuXG5PYmplY3Qua2V5cyhsaXN0ZW5NZXRob2RzKS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICBFdmVudHMucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGxpc3RlbmluZ1RvID0gdGhpcy5fbGlzdGVuaW5nVG8gfHwgKHRoaXMuX2xpc3RlbmluZ1RvID0ge30pXG4gICAgdmFyIGlkID0gb2JqLl9saXN0ZW5JZCB8fCAob2JqLl9saXN0ZW5JZCA9IHVuaXF1ZUlkKCdsJykpXG4gICAgbGlzdGVuaW5nVG9baWRdID0gb2JqXG4gICAgaWYgKCFjYWxsYmFjayAmJiB0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpc1xuICAgIG9ialtsaXN0ZW5NZXRob2RzW21ldGhvZF1dKG5hbWUsIGNhbGxiYWNrLCB0aGlzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn0pO1xuXG4vLyBQTEFZRVIgRVZFTlRTXG5FdmVudHMuUExBWUVSX1JFU0laRSA9ICdwbGF5ZXI6cmVzaXplJ1xuXG4vLyBQbGF5YmFjayBFdmVudHNcbkV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUyA9ICdwbGF5YmFjazpwcm9ncmVzcydcbkV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFID0gJ3BsYXliYWNrOnRpbWV1cGRhdGUnXG5FdmVudHMuUExBWUJBQ0tfUkVBRFkgPSAncGxheWJhY2s6cmVhZHknXG5FdmVudHMuUExBWUJBQ0tfQlVGRkVSSU5HID0gJ3BsYXliYWNrOmJ1ZmZlcmluZydcbkV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMID0gJ3BsYXliYWNrOmJ1ZmZlcmZ1bGwnXG5FdmVudHMuUExBWUJBQ0tfU0VUVElOR1NVUERBVEUgPSAncGxheWJhY2s6c2V0dGluZ3N1cGRhdGUnXG5FdmVudHMuUExBWUJBQ0tfTE9BREVETUVUQURBVEEgPSAncGxheWJhY2s6bG9hZGVkbWV0YWRhdGEnXG5FdmVudHMuUExBWUJBQ0tfSElHSERFRklOSVRJT05VUERBVEUgPSAncGxheWJhY2s6aGlnaGRlZmluaXRpb251cGRhdGUnXG5FdmVudHMuUExBWUJBQ0tfQklUUkFURSA9ICdwbGF5YmFjazpiaXRyYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX1BMQVlCQUNLU1RBVEUgPSAncGxheWJhY2s6cGxheWJhY2tzdGF0ZSdcbkV2ZW50cy5QTEFZQkFDS19EVlIgPSAncGxheWJhY2s6ZHZyJ1xuRXZlbnRzLlBMQVlCQUNLX01FRElBQ09OVFJPTF9ESVNBQkxFID0gJ3BsYXliYWNrOm1lZGlhY29udHJvbDpkaXNhYmxlJ1xuRXZlbnRzLlBMQVlCQUNLX01FRElBQ09OVFJPTF9FTkFCTEUgPSAncGxheWJhY2s6bWVkaWFjb250cm9sOmVuYWJsZSdcbkV2ZW50cy5QTEFZQkFDS19FTkRFRCA9ICdwbGF5YmFjazplbmRlZCdcbkV2ZW50cy5QTEFZQkFDS19QTEFZID0gJ3BsYXliYWNrOnBsYXknXG5FdmVudHMuUExBWUJBQ0tfRVJST1IgPSAncGxheWJhY2s6ZXJyb3InXG5FdmVudHMuUExBWUJBQ0tfU1RBVFNfQUREID0gJ3BsYXliYWNrOnN0YXRzOmFkZCdcblxuLy8gQ29udGFpbmVyIEV2ZW50c1xuRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS1NUQVRFID0gJ2NvbnRhaW5lcjpwbGF5YmFja3N0YXRlJ1xuRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCA9ICdjb250YWluZXI6ZHZyJ1xuRXZlbnRzLkNPTlRBSU5FUl9CSVRSQVRFID0gJ2NvbnRhaW5lcjpiaXRyYXRlJ1xuRXZlbnRzLkNPTlRBSU5FUl9TVEFUU19SRVBPUlQgPSAnY29udGFpbmVyOnN0YXRzOnJlcG9ydCdcbkV2ZW50cy5DT05UQUlORVJfREVTVFJPWUVEID0gJ2NvbnRhaW5lcjpkZXN0cm95ZWQnXG5FdmVudHMuQ09OVEFJTkVSX1JFQURZID0gJ2NvbnRhaW5lcjpyZWFkeSdcbkV2ZW50cy5DT05UQUlORVJfRVJST1IgPSAnY29udGFpbmVyOmVycm9yJ1xuRXZlbnRzLkNPTlRBSU5FUl9MT0FERURNRVRBREFUQSA9ICdjb250YWluZXI6bG9hZGVkbWV0YWRhdGEnXG5FdmVudHMuQ09OVEFJTkVSX1RJTUVVUERBVEUgPSAnY29udGFpbmVyOnRpbWV1cGRhdGUnXG5FdmVudHMuQ09OVEFJTkVSX1BST0dSRVNTID0gJ2NvbnRhaW5lcjpwcm9ncmVzcydcbkV2ZW50cy5DT05UQUlORVJfUExBWSA9ICdjb250YWluZXI6cGxheSdcbkV2ZW50cy5DT05UQUlORVJfU1RPUCA9ICdjb250YWluZXI6c3RvcCdcbkV2ZW50cy5DT05UQUlORVJfUEFVU0UgPSAnY29udGFpbmVyOnBhdXNlJ1xuRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCA9ICdjb250YWluZXI6ZW5kZWQnXG5FdmVudHMuQ09OVEFJTkVSX0NMSUNLID0gJ2NvbnRhaW5lcjpjbGljaydcbkV2ZW50cy5DT05UQUlORVJfTU9VU0VfRU5URVIgPSAnY29udGFpbmVyOm1vdXNlZW50ZXInXG5FdmVudHMuQ09OVEFJTkVSX01PVVNFX0xFQVZFID0gJ2NvbnRhaW5lcjptb3VzZWxlYXZlJ1xuRXZlbnRzLkNPTlRBSU5FUl9TRUVLID0gJ2NvbnRhaW5lcjpzZWVrJ1xuRXZlbnRzLkNPTlRBSU5FUl9WT0xVTUUgPSAnY29udGFpbmVyOnZvbHVtZSdcbkV2ZW50cy5DT05UQUlORVJfRlVMTFNDUkVFTiA9ICdjb250YWluZXI6ZnVsbHNjcmVlbidcbkV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSSU5HID0gJ2NvbnRhaW5lcjpzdGF0ZTpidWZmZXJpbmcnXG5FdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwgPSAnY29udGFpbmVyOnN0YXRlOmJ1ZmZlcmZ1bGwnXG5FdmVudHMuQ09OVEFJTkVSX1NFVFRJTkdTVVBEQVRFID0gJ2NvbnRhaW5lcjpzZXR0aW5nc3VwZGF0ZSdcbkV2ZW50cy5DT05UQUlORVJfSElHSERFRklOSVRJT05VUERBVEUgPSAnY29udGFpbmVyOmhpZ2hkZWZpbml0aW9udXBkYXRlJ1xuRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRElTQUJMRSA9ICdjb250YWluZXI6bWVkaWFjb250cm9sOmRpc2FibGUnXG5FdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9FTkFCTEUgPSAnY29udGFpbmVyOm1lZGlhY29udHJvbDplbmFibGUnXG5FdmVudHMuQ09OVEFJTkVSX1NUQVRTX0FERCA9ICdjb250YWluZXI6c3RhdHM6YWRkJ1xuXG4vLyBNZWRpYUNvbnRyb2wgRXZlbnRzXG5FdmVudHMuTUVESUFDT05UUk9MX1JFTkRFUkVEID0gJ21lZGlhY29udHJvbDpyZW5kZXJlZCdcbkV2ZW50cy5NRURJQUNPTlRST0xfRlVMTFNDUkVFTiA9ICdtZWRpYWNvbnRyb2w6ZnVsbHNjcmVlbidcbkV2ZW50cy5NRURJQUNPTlRST0xfU0hPVyA9ICdtZWRpYWNvbnRyb2w6c2hvdydcbkV2ZW50cy5NRURJQUNPTlRST0xfSElERSA9ICdtZWRpYWNvbnRyb2w6aGlkZSdcbkV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VNT1ZFX1NFRUtCQVIgPSAnbWVkaWFjb250cm9sOm1vdXNlbW92ZTpzZWVrYmFyJ1xuRXZlbnRzLk1FRElBQ09OVFJPTF9NT1VTRUxFQVZFX1NFRUtCQVIgPSAnbWVkaWFjb250cm9sOm1vdXNlbGVhdmU6c2Vla2JhcidcbkV2ZW50cy5NRURJQUNPTlRST0xfUExBWUlORyA9ICdtZWRpYWNvbnRyb2w6cGxheWluZydcbkV2ZW50cy5NRURJQUNPTlRST0xfTk9UUExBWUlORyA9ICdtZWRpYWNvbnRyb2w6bm90cGxheWluZydcbkV2ZW50cy5NRURJQUNPTlRST0xfQ09OVEFJTkVSQ0hBTkdFRCA9ICdtZWRpYWNvbnRyb2w6Y29udGFpbmVyY2hhbmdlZCdcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudHNcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mbGFzaCcpO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaGxzJyk7XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9odG1sNV9hdWRpbycpO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaHRtbDVfdmlkZW8nKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2h0bWxfaW1nJyk7XG5cbiIsInZhciBLaWJvID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50IHx8IHdpbmRvdy5kb2N1bWVudDtcbiAgdGhpcy5pbml0aWFsaXplKCk7XG59O1xuXG5LaWJvLktFWV9OQU1FU19CWV9DT0RFID0ge1xuICA4OiAnYmFja3NwYWNlJywgOTogJ3RhYicsIDEzOiAnZW50ZXInLFxuICAxNjogJ3NoaWZ0JywgMTc6ICdjdHJsJywgMTg6ICdhbHQnLFxuICAyMDogJ2NhcHNfbG9jaycsXG4gIDI3OiAnZXNjJyxcbiAgMzI6ICdzcGFjZScsXG4gIDM3OiAnbGVmdCcsIDM4OiAndXAnLCAzOTogJ3JpZ2h0JywgNDA6ICdkb3duJyxcbiAgNDg6ICcwJywgNDk6ICcxJywgNTA6ICcyJywgNTE6ICczJywgNTI6ICc0JywgNTM6ICc1JywgNTQ6ICc2JywgNTU6ICc3JywgNTY6ICc4JywgNTc6ICc5JyxcbiAgNjU6ICdhJywgNjY6ICdiJywgNjc6ICdjJywgNjg6ICdkJywgNjk6ICdlJywgNzA6ICdmJywgNzE6ICdnJywgNzI6ICdoJywgNzM6ICdpJywgNzQ6ICdqJywgNzU6ICdrJywgNzY6ICdsJywgNzc6ICdtJywgNzg6ICduJywgNzk6ICdvJywgODA6ICdwJywgODE6ICdxJywgODI6ICdyJywgODM6ICdzJywgODQ6ICd0JywgODU6ICd1JywgODY6ICd2JywgODc6ICd3JywgODg6ICd4JywgODk6ICd5JywgOTA6ICd6JyxcbiAgMTEyOiAnZjEnLCAxMTM6ICdmMicsIDExNDogJ2YzJywgMTE1OiAnZjQnLCAxMTY6ICdmNScsIDExNzogJ2Y2JywgMTE4OiAnZjcnLCAxMTk6ICdmOCcsIDEyMDogJ2Y5JywgMTIxOiAnZjEwJywgMTIyOiAnZjExJywgMTIzOiAnZjEyJ1xufTtcblxuS2liby5LRVlfQ09ERVNfQllfTkFNRSA9IHt9O1xuKGZ1bmN0aW9uKCkge1xuICBmb3IodmFyIGtleSBpbiBLaWJvLktFWV9OQU1FU19CWV9DT0RFKVxuICAgIGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChLaWJvLktFWV9OQU1FU19CWV9DT0RFLCBrZXkpKVxuICAgICAgS2liby5LRVlfQ09ERVNfQllfTkFNRVtLaWJvLktFWV9OQU1FU19CWV9DT0RFW2tleV1dID0gK2tleTtcbn0pKCk7XG5cbktpYm8uTU9ESUZJRVJTID0gWydzaGlmdCcsICdjdHJsJywgJ2FsdCddO1xuXG5LaWJvLnJlZ2lzdGVyRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGlmKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jLCBmYWxzZSk7XG4gICAgfTtcbiAgfVxuICBlbHNlIGlmKGRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgZnVuYykge1xuICAgICAgZWxlbWVudC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCBmdW5jKTtcbiAgICB9O1xuICB9XG59KSgpO1xuXG5LaWJvLnVucmVnaXN0ZXJFdmVudCA9IChmdW5jdGlvbigpIHtcbiAgaWYoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGZ1bmMpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmMsIGZhbHNlKTtcbiAgICB9O1xuICB9XG4gIGVsc2UgaWYoZG9jdW1lbnQuZGV0YWNoRXZlbnQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICBlbGVtZW50LmRldGFjaEV2ZW50KCdvbicgKyBldmVudE5hbWUsIGZ1bmMpO1xuICAgIH07XG4gIH1cbn0pKCk7XG5cbktpYm8uc3RyaW5nQ29udGFpbnMgPSBmdW5jdGlvbihzdHJpbmcsIHN1YnN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XG59O1xuXG5LaWJvLm5lYXRTdHJpbmcgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xufTtcblxuS2liby5jYXBpdGFsaXplID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eLi8sIGZ1bmN0aW9uKG1hdGNoKSB7IHJldHVybiBtYXRjaC50b1VwcGVyQ2FzZSgpOyB9KTtcbn07XG5cbktpYm8uaXNTdHJpbmcgPSBmdW5jdGlvbih3aGF0KSB7XG4gIHJldHVybiBLaWJvLnN0cmluZ0NvbnRhaW5zKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aGF0KSwgJ1N0cmluZycpO1xufTtcblxuS2liby5hcnJheUluY2x1ZGVzID0gKGZ1bmN0aW9uKCkge1xuICBpZihBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xuICAgIHJldHVybiBmdW5jdGlvbihoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgICByZXR1cm4gaGF5c3RhY2suaW5kZXhPZihuZWVkbGUpICE9PSAtMTtcbiAgICB9O1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBmdW5jdGlvbihoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaGF5c3RhY2subGVuZ3RoOyBpKyspXG4gICAgICAgIGlmKGhheXN0YWNrW2ldID09PSBuZWVkbGUpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfVxufSkoKTtcblxuS2liby5leHRyYWN0TW9kaWZpZXJzID0gZnVuY3Rpb24oa2V5Q29tYmluYXRpb24pIHtcbiAgdmFyIG1vZGlmaWVycywgaVxuICBtb2RpZmllcnMgPSBbXTtcbiAgZm9yKGkgPSAwOyBpIDwgS2liby5NT0RJRklFUlMubGVuZ3RoOyBpKyspXG4gICAgaWYoS2liby5zdHJpbmdDb250YWlucyhrZXlDb21iaW5hdGlvbiwgS2liby5NT0RJRklFUlNbaV0pKVxuICAgICAgbW9kaWZpZXJzLnB1c2goS2liby5NT0RJRklFUlNbaV0pO1xuICByZXR1cm4gbW9kaWZpZXJzO1xufVxuXG5LaWJvLmV4dHJhY3RLZXkgPSBmdW5jdGlvbihrZXlDb21iaW5hdGlvbikge1xuICB2YXIga2V5cywgaTtcbiAga2V5cyA9IEtpYm8ubmVhdFN0cmluZyhrZXlDb21iaW5hdGlvbikuc3BsaXQoJyAnKTtcbiAgZm9yKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKylcbiAgICBpZighS2liby5hcnJheUluY2x1ZGVzKEtpYm8uTU9ESUZJRVJTLCBrZXlzW2ldKSlcbiAgICAgIHJldHVybiBrZXlzW2ldO1xufTtcblxuS2liby5tb2RpZmllcnNBbmRLZXkgPSBmdW5jdGlvbihrZXlDb21iaW5hdGlvbikge1xuICB2YXIgcmVzdWx0LCBrZXk7XG5cbiAgaWYoS2liby5zdHJpbmdDb250YWlucyhrZXlDb21iaW5hdGlvbiwgJ2FueScpKSB7XG4gICAgcmV0dXJuIEtpYm8ubmVhdFN0cmluZyhrZXlDb21iaW5hdGlvbikuc3BsaXQoJyAnKS5zbGljZSgwLCAyKS5qb2luKCcgJyk7XG4gIH1cblxuICByZXN1bHQgPSBLaWJvLmV4dHJhY3RNb2RpZmllcnMoa2V5Q29tYmluYXRpb24pO1xuXG4gIGtleSA9IEtpYm8uZXh0cmFjdEtleShrZXlDb21iaW5hdGlvbik7XG4gIGlmKGtleSAmJiAhS2liby5hcnJheUluY2x1ZGVzKEtpYm8uTU9ESUZJRVJTLCBrZXkpKVxuICAgIHJlc3VsdC5wdXNoKGtleSk7XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJyk7XG59XG5cbktpYm8ua2V5TmFtZSA9IGZ1bmN0aW9uKGtleUNvZGUpIHtcbiAgcmV0dXJuIEtpYm8uS0VZX05BTUVTX0JZX0NPREVba2V5Q29kZSArICcnXTtcbn07XG5cbktpYm8ua2V5Q29kZSA9IGZ1bmN0aW9uKGtleU5hbWUpIHtcbiAgcmV0dXJuICtLaWJvLktFWV9DT0RFU19CWV9OQU1FW2tleU5hbWVdO1xufTtcblxuS2liby5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaSwgdGhhdCA9IHRoaXM7XG5cbiAgdGhpcy5sYXN0S2V5Q29kZSA9IC0xO1xuICB0aGlzLmxhc3RNb2RpZmllcnMgPSB7fTtcbiAgZm9yKGkgPSAwOyBpIDwgS2liby5NT0RJRklFUlMubGVuZ3RoOyBpKyspXG4gICAgdGhpcy5sYXN0TW9kaWZpZXJzW0tpYm8uTU9ESUZJRVJTW2ldXSA9IGZhbHNlO1xuXG4gIHRoaXMua2V5c0Rvd24gPSB7IGFueTogW10gfTtcbiAgdGhpcy5rZXlzVXAgPSB7IGFueTogW10gfTtcbiAgdGhpcy5kb3duSGFuZGxlciA9IHRoaXMuaGFuZGxlcignZG93bicpO1xuICB0aGlzLnVwSGFuZGxlciA9IHRoaXMuaGFuZGxlcigndXAnKTtcblxuICBLaWJvLnJlZ2lzdGVyRXZlbnQodGhpcy5lbGVtZW50LCAna2V5ZG93bicsIHRoaXMuZG93bkhhbmRsZXIpO1xuICBLaWJvLnJlZ2lzdGVyRXZlbnQodGhpcy5lbGVtZW50LCAna2V5dXAnLCB0aGlzLnVwSGFuZGxlcik7XG4gIEtpYm8ucmVnaXN0ZXJFdmVudCh3aW5kb3csICd1bmxvYWQnLCBmdW5jdGlvbiB1bmxvYWRlcigpIHtcbiAgICBLaWJvLnVucmVnaXN0ZXJFdmVudCh0aGF0LmVsZW1lbnQsICdrZXlkb3duJywgdGhhdC5kb3duSGFuZGxlcik7XG4gICAgS2liby51bnJlZ2lzdGVyRXZlbnQodGhhdC5lbGVtZW50LCAna2V5dXAnLCB0aGF0LnVwSGFuZGxlcik7XG4gICAgS2liby51bnJlZ2lzdGVyRXZlbnQod2luZG93LCAndW5sb2FkJywgdW5sb2FkZXIpO1xuICB9KTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmhhbmRsZXIgPSBmdW5jdGlvbih1cE9yRG93bikge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGksIHJlZ2lzdGVyZWRLZXlzLCBsYXN0TW9kaWZpZXJzQW5kS2V5O1xuXG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuXG4gICAgdGhhdC5sYXN0S2V5Q29kZSA9IGUua2V5Q29kZTtcbiAgICBmb3IoaSA9IDA7IGkgPCBLaWJvLk1PRElGSUVSUy5sZW5ndGg7IGkrKylcbiAgICAgIHRoYXQubGFzdE1vZGlmaWVyc1tLaWJvLk1PRElGSUVSU1tpXV0gPSBlW0tpYm8uTU9ESUZJRVJTW2ldICsgJ0tleSddO1xuICAgIGlmKEtpYm8uYXJyYXlJbmNsdWRlcyhLaWJvLk1PRElGSUVSUywgS2liby5rZXlOYW1lKHRoYXQubGFzdEtleUNvZGUpKSlcbiAgICAgIHRoYXQubGFzdE1vZGlmaWVyc1tLaWJvLmtleU5hbWUodGhhdC5sYXN0S2V5Q29kZSldID0gdHJ1ZTtcblxuICAgIHJlZ2lzdGVyZWRLZXlzID0gdGhhdFsna2V5cycgKyBLaWJvLmNhcGl0YWxpemUodXBPckRvd24pXTtcblxuICAgIGZvcihpID0gMDsgaSA8IHJlZ2lzdGVyZWRLZXlzLmFueS5sZW5ndGg7IGkrKylcbiAgICAgIGlmKChyZWdpc3RlcmVkS2V5cy5hbnlbaV0oZSkgPT09IGZhbHNlKSAmJiBlLnByZXZlbnREZWZhdWx0KVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsYXN0TW9kaWZpZXJzQW5kS2V5ID0gdGhhdC5sYXN0TW9kaWZpZXJzQW5kS2V5KCk7XG4gICAgaWYocmVnaXN0ZXJlZEtleXNbbGFzdE1vZGlmaWVyc0FuZEtleV0pXG4gICAgICBmb3IoaSA9IDA7IGkgPCByZWdpc3RlcmVkS2V5c1tsYXN0TW9kaWZpZXJzQW5kS2V5XS5sZW5ndGg7IGkrKylcbiAgICAgICAgaWYoKHJlZ2lzdGVyZWRLZXlzW2xhc3RNb2RpZmllcnNBbmRLZXldW2ldKGUpID09PSBmYWxzZSkgJiYgZS5wcmV2ZW50RGVmYXVsdClcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG59O1xuXG5LaWJvLnByb3RvdHlwZS5yZWdpc3RlcktleXMgPSBmdW5jdGlvbih1cE9yRG93biwgbmV3S2V5cywgZnVuYykge1xuICB2YXIgaSwga2V5cywgcmVnaXN0ZXJlZEtleXMgPSB0aGlzWydrZXlzJyArIEtpYm8uY2FwaXRhbGl6ZSh1cE9yRG93bildO1xuXG4gIGlmKEtpYm8uaXNTdHJpbmcobmV3S2V5cykpXG4gICAgbmV3S2V5cyA9IFtuZXdLZXlzXTtcblxuICBmb3IoaSA9IDA7IGkgPCBuZXdLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5cyA9IG5ld0tleXNbaV07XG4gICAga2V5cyA9IEtpYm8ubW9kaWZpZXJzQW5kS2V5KGtleXMgKyAnJyk7XG5cbiAgICBpZihyZWdpc3RlcmVkS2V5c1trZXlzXSlcbiAgICAgIHJlZ2lzdGVyZWRLZXlzW2tleXNdLnB1c2goZnVuYyk7XG4gICAgZWxzZVxuICAgICAgcmVnaXN0ZXJlZEtleXNba2V5c10gPSBbZnVuY107XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbktpYm8ucHJvdG90eXBlLnVucmVnaXN0ZXJLZXlzID0gZnVuY3Rpb24odXBPckRvd24sIG5ld0tleXMsIGZ1bmMpIHtcbiAgdmFyIGksIGosIGtleXMsIHJlZ2lzdGVyZWRLZXlzID0gdGhpc1sna2V5cycgKyBLaWJvLmNhcGl0YWxpemUodXBPckRvd24pXTtcblxuICBpZihLaWJvLmlzU3RyaW5nKG5ld0tleXMpKVxuICAgIG5ld0tleXMgPSBbbmV3S2V5c107XG5cbiAgZm9yKGkgPSAwOyBpIDwgbmV3S2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleXMgPSBuZXdLZXlzW2ldO1xuICAgIGtleXMgPSBLaWJvLm1vZGlmaWVyc0FuZEtleShrZXlzICsgJycpO1xuXG4gICAgaWYoZnVuYyA9PT0gbnVsbClcbiAgICAgIGRlbGV0ZSByZWdpc3RlcmVkS2V5c1trZXlzXTtcbiAgICBlbHNlIHtcbiAgICAgIGlmKHJlZ2lzdGVyZWRLZXlzW2tleXNdKSB7XG4gICAgICAgIGZvcihqID0gMDsgaiA8IHJlZ2lzdGVyZWRLZXlzW2tleXNdLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYoU3RyaW5nKHJlZ2lzdGVyZWRLZXlzW2tleXNdW2pdKSA9PT0gU3RyaW5nKGZ1bmMpKSB7XG4gICAgICAgICAgICByZWdpc3RlcmVkS2V5c1trZXlzXS5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbktpYm8ucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKGtleXMpIHtcbiAgcmV0dXJuIHRoaXMudW5yZWdpc3RlcktleXMoJ2Rvd24nLCBrZXlzLCBudWxsKTtcbn1cblxuS2liby5wcm90b3R5cGUuZGVsZWdhdGUgPSBmdW5jdGlvbih1cE9yRG93biwga2V5cywgZnVuYykge1xuICByZXR1cm4gKGZ1bmMgIT09IG51bGwgfHwgZnVuYyAhPT0gdW5kZWZpbmVkKSA/IHRoaXMucmVnaXN0ZXJLZXlzKHVwT3JEb3duLCBrZXlzLCBmdW5jKSA6IHRoaXMudW5yZWdpc3RlcktleXModXBPckRvd24sIGtleXMsIGZ1bmMpO1xufTtcblxuS2liby5wcm90b3R5cGUuZG93biA9IGZ1bmN0aW9uKGtleXMsIGZ1bmMpIHtcbiAgcmV0dXJuIHRoaXMuZGVsZWdhdGUoJ2Rvd24nLCBrZXlzLCBmdW5jKTtcbn07XG5cbktpYm8ucHJvdG90eXBlLnVwID0gZnVuY3Rpb24oa2V5cywgZnVuYykge1xuICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSgndXAnLCBrZXlzLCBmdW5jKTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmxhc3RLZXkgPSBmdW5jdGlvbihtb2RpZmllcikge1xuICBpZighbW9kaWZpZXIpXG4gICAgcmV0dXJuIEtpYm8ua2V5TmFtZSh0aGlzLmxhc3RLZXlDb2RlKTtcblxuICByZXR1cm4gdGhpcy5sYXN0TW9kaWZpZXJzW21vZGlmaWVyXTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmxhc3RNb2RpZmllcnNBbmRLZXkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc3VsdCwgaTtcblxuICByZXN1bHQgPSBbXTtcbiAgZm9yKGkgPSAwOyBpIDwgS2liby5NT0RJRklFUlMubGVuZ3RoOyBpKyspXG4gICAgaWYodGhpcy5sYXN0S2V5KEtpYm8uTU9ESUZJRVJTW2ldKSlcbiAgICAgIHJlc3VsdC5wdXNoKEtpYm8uTU9ESUZJRVJTW2ldKTtcblxuICBpZighS2liby5hcnJheUluY2x1ZGVzKHJlc3VsdCwgdGhpcy5sYXN0S2V5KCkpKVxuICAgIHJlc3VsdC5wdXNoKHRoaXMubGFzdEtleSgpKTtcblxuICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gS2libztcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tZWRpYV9jb250cm9sJyk7XG5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogVGhlIG1lZGlhdG9yIGlzIGEgc2luZ2xldG9uIGZvciBoYW5kbGluZyBnbG9iYWwgZXZlbnRzLlxuICovXG5cbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi9iYXNlL2V2ZW50cycpXG5cbnZhciBldmVudHMgPSBuZXcgRXZlbnRzKClcblxuY2xhc3MgTWVkaWF0b3Ige1xufVxuXG5NZWRpYXRvci5vbiA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIGV2ZW50cy5vbihuYW1lLCBjYWxsYmFjaywgY29udGV4dClcbiAgcmV0dXJuXG59XG5cbk1lZGlhdG9yLm9uY2UgPSBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICBldmVudHMub25jZShuYW1lLCBjYWxsYmFjaywgY29udGV4dClcbiAgcmV0dXJuXG59XG5cbk1lZGlhdG9yLm9mZiA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIGV2ZW50cy5vZmYobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpXG4gIHJldHVyblxufVxuXG5NZWRpYXRvci50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSwgb3B0cykge1xuICBldmVudHMudHJpZ2dlcihuYW1lLCBvcHRzKVxuICByZXR1cm5cbn1cblxuTWVkaWF0b3Iuc3RvcExpc3RlbmluZyA9IGZ1bmN0aW9uKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgZXZlbnRzLnN0b3BMaXN0ZW5pbmcob2JqLCBuYW1lLCBjYWxsYmFjaylcbiAgcmV0dXJuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWVkaWF0b3JcbiIsInZhciBVSU9iamVjdCA9IHJlcXVpcmUoJy4vdWlfb2JqZWN0JylcblxuY2xhc3MgUGxheWJhY2sgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc2V0dGluZ3MgPSB7fVxuICB9XG5cbiAgcGxheSgpIHt9XG5cbiAgcGF1c2UoKSB7fVxuXG4gIHN0b3AoKSB7fVxuXG4gIHNlZWsodGltZSkge31cblxuICBnZXREdXJhdGlvbigpIHsgcmV0dXJuIDAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gJ25vX29wJ1xuICB9XG5cbiAgaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxufVxuXG5QbGF5YmFjay5jYW5QbGF5ID0gKHNvdXJjZSkgPT4ge1xuICByZXR1cm4gZmFsc2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5YmFja1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXllckluZm8gPXtcbiAgb3B0aW9uczoge30sXG4gIHBsYXliYWNrUGx1Z2luczogW10sXG4gIGN1cnJlbnRTaXplOiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllckluZm9cblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3Bvc3RlcicpO1xuXG4iLCIvLyBTaW1wbGUgSmF2YVNjcmlwdCBUZW1wbGF0aW5nXG4vLyBQYXVsIE1pbGxlciAoaHR0cDovL3BhdWxtaWxsci5jb20pXG4vLyBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuLy8gKGMpIDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuKGZ1bmN0aW9uKGdsb2JhbHMpIHtcbiAgLy8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXG4gIC8vIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAgdmFyIHNldHRpbmdzID0ge1xuICAgIGV2YWx1YXRlICAgIDogLzwlKFtcXHNcXFNdKz8pJT4vZyxcbiAgICBpbnRlcnBvbGF0ZSA6IC88JT0oW1xcc1xcU10rPyklPi9nLFxuICAgIGVzY2FwZSAgICAgIDogLzwlLShbXFxzXFxTXSs/KSU+L2dcbiAgfTtcblxuICAvLyBXaGVuIGN1c3RvbWl6aW5nIGB0ZW1wbGF0ZVNldHRpbmdzYCwgaWYgeW91IGRvbid0IHdhbnQgdG8gZGVmaW5lIGFuXG4gIC8vIGludGVycG9sYXRpb24sIGV2YWx1YXRpb24gb3IgZXNjYXBpbmcgcmVnZXgsIHdlIG5lZWQgb25lIHRoYXQgaXNcbiAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXG4gIHZhciBub01hdGNoID0gLyguKV4vO1xuXG4gIC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4gIC8vIHN0cmluZyBsaXRlcmFsLlxuICB2YXIgZXNjYXBlcyA9IHtcbiAgICBcIidcIjogICAgICBcIidcIixcbiAgICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICAgJ1xccic6ICAgICAncicsXG4gICAgJ1xcbic6ICAgICAnbicsXG4gICAgJ1xcdCc6ICAgICAndCcsXG4gICAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ3UyMDI5J1xuICB9O1xuXG4gIHZhciBlc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdHxcXHUyMDI4fFxcdTIwMjkvZztcblxuICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxuICB2YXIgaHRtbEVudGl0aWVzID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjeDI3OydcbiAgfTtcblxuICB2YXIgZW50aXR5UmUgPSBuZXcgUmVnRXhwKCdbJjw+XCJcXCddJywgJ2cnKTtcblxuICB2YXIgZXNjYXBlRXhwciA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIGlmIChzdHJpbmcgPT0gbnVsbCkgcmV0dXJuICcnO1xuICAgIHJldHVybiAoJycgKyBzdHJpbmcpLnJlcGxhY2UoZW50aXR5UmUsIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICByZXR1cm4gaHRtbEVudGl0aWVzW21hdGNoXTtcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgY291bnRlciA9IDA7XG5cbiAgLy8gSmF2YVNjcmlwdCBtaWNyby10ZW1wbGF0aW5nLCBzaW1pbGFyIHRvIEpvaG4gUmVzaWcncyBpbXBsZW1lbnRhdGlvbi5cbiAgLy8gVW5kZXJzY29yZSB0ZW1wbGF0aW5nIGhhbmRsZXMgYXJiaXRyYXJ5IGRlbGltaXRlcnMsIHByZXNlcnZlcyB3aGl0ZXNwYWNlLFxuICAvLyBhbmQgY29ycmVjdGx5IGVzY2FwZXMgcXVvdGVzIHdpdGhpbiBpbnRlcnBvbGF0ZWQgY29kZS5cbiAgdmFyIHRtcGwgPSBmdW5jdGlvbih0ZXh0LCBkYXRhKSB7XG4gICAgdmFyIHJlbmRlcjtcblxuICAgIC8vIENvbWJpbmUgZGVsaW1pdGVycyBpbnRvIG9uZSByZWd1bGFyIGV4cHJlc3Npb24gdmlhIGFsdGVybmF0aW9uLlxuICAgIHZhciBtYXRjaGVyID0gbmV3IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldClcbiAgICAgICAgLnJlcGxhY2UoZXNjYXBlciwgZnVuY3Rpb24obWF0Y2gpIHsgcmV0dXJuICdcXFxcJyArIGVzY2FwZXNbbWF0Y2hdOyB9KTtcblxuICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGVzY2FwZSArIFwiKSk9PW51bGw/Jyc6ZXNjYXBlRXhwcihfX3QpKStcXG4nXCI7XG4gICAgICB9XG4gICAgICBpZiAoaW50ZXJwb2xhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBpbnRlcnBvbGF0ZSArIFwiKSk9PW51bGw/Jyc6X190KStcXG4nXCI7XG4gICAgICB9XG4gICAgICBpZiAoZXZhbHVhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJztcXG5cIiArIGV2YWx1YXRlICsgXCJcXG5fX3ArPSdcIjtcbiAgICAgIH1cbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuICAgIHNvdXJjZSArPSBcIic7XFxuXCI7XG5cbiAgICAvLyBJZiBhIHZhcmlhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIHBsYWNlIGRhdGEgdmFsdWVzIGluIGxvY2FsIHNjb3BlLlxuICAgIGlmICghc2V0dGluZ3MudmFyaWFibGUpIHNvdXJjZSA9ICd3aXRoKG9ianx8e30pe1xcbicgKyBzb3VyY2UgKyAnfVxcbic7XG5cbiAgICBzb3VyY2UgPSBcInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIiArXG4gICAgICBcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIgK1xuICAgICAgc291cmNlICsgXCJyZXR1cm4gX19wO1xcbi8vIyBzb3VyY2VVUkw9L21pY3JvdGVtcGxhdGVzL3NvdXJjZVtcIiArIGNvdW50ZXIrKyArIFwiXVwiO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlbmRlciA9IG5ldyBGdW5jdGlvbihzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJywgJ2VzY2FwZUV4cHInLCBzb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUuc291cmNlID0gc291cmNlO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSkgcmV0dXJuIHJlbmRlcihkYXRhLCBlc2NhcGVFeHByKTtcbiAgICB2YXIgdGVtcGxhdGUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVuZGVyLmNhbGwodGhpcywgZGF0YSwgZXNjYXBlRXhwcik7XG4gICAgfTtcblxuICAgIC8vIFByb3ZpZGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uIHNvdXJjZSBhcyBhIGNvbnZlbmllbmNlIGZvciBwcmVjb21waWxhdGlvbi5cbiAgICB0ZW1wbGF0ZS5zb3VyY2UgPSAnZnVuY3Rpb24oJyArIChzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJykgKyAnKXtcXG4nICsgc291cmNlICsgJ30nO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9O1xuICB0bXBsLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0bXBsO1xuICAgIH0pOyAvLyBSZXF1aXJlSlNcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gdG1wbDsgLy8gQ29tbW9uSlNcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWxzLm1pY3JvdGVtcGxhdGUgPSB0bXBsOyAvLyA8c2NyaXB0PlxuICB9XG59KSh0aGlzKTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBVSU9iamVjdCA9IHJlcXVpcmUoJy4vdWlfb2JqZWN0JylcblxuY2xhc3MgVUlDb250YWluZXJQbHVnaW4gZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmJpbmRFdmVudHMoKVxuICAgICAgdGhpcy4kZWwuc2hvdygpXG4gICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHRoaXMuJGVsLmhpZGUoKVxuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge31cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlKClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVJQ29udGFpbmVyUGx1Z2luXG4iLCJ2YXIgVUlPYmplY3QgPSByZXF1aXJlKCcuL3VpX29iamVjdCcpXG5cbmNsYXNzIFVJQ29yZVBsdWdpbiBleHRlbmRzIFVJT2JqZWN0IHtcbiAgY29uc3RydWN0b3IoY29yZSkge1xuICAgIHN1cGVyKGNvcmUpXG4gICAgdGhpcy5jb3JlID0gY29yZVxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICAgIHRoaXMucmVuZGVyKClcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7fVxuXG4gIGdldEV4dGVybmFsSW50ZXJmYWNlKCkgeyByZXR1cm4ge30gfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgICAgIHRoaXMuJGVsLnNob3coKVxuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZSgpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKCkpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHRoaXMuc3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSkpXG4gICAgdGhpcy5jb3JlLiRlbC5hcHBlbmQodGhpcy5lbClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVUlDb3JlUGx1Z2luXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgJCA9IHJlcXVpcmUoJ2NsYXBwci16ZXB0bycpXG52YXIgdW5pcXVlSWQgPSByZXF1aXJlKCcuL3V0aWxzJykudW5pcXVlSWRcbnZhciByZXN1bHQgPSByZXF1aXJlKCdsb2Rhc2gucmVzdWx0JylcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guYXNzaWduJylcbnZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnLi9iYXNlX29iamVjdCcpXG5cbnZhciBkZWxlZ2F0ZUV2ZW50U3BsaXR0ZXIgPSAvXihcXFMrKVxccyooLiopJC9cblxuY2xhc3MgVUlPYmplY3QgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcblxuICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdkaXYnIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLmNpZCA9IHVuaXF1ZUlkKCdjJyk7XG4gICAgdGhpcy5fZW5zdXJlRWxlbWVudCgpO1xuICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoKTtcbiAgfVxuXG4gICQoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy4kZWwuZmluZChzZWxlY3RvcilcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuJGVsLnJlbW92ZSgpXG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc2V0RWxlbWVudChlbGVtZW50LCBkZWxlZ2F0ZSkge1xuICAgIGlmICh0aGlzLiRlbCkgdGhpcy51bmRlbGVnYXRlRXZlbnRzKClcbiAgICB0aGlzLiRlbCA9IGVsZW1lbnQgaW5zdGFuY2VvZiAkID8gZWxlbWVudCA6ICQoZWxlbWVudClcbiAgICB0aGlzLmVsID0gdGhpcy4kZWxbMF1cbiAgICBpZiAoZGVsZWdhdGUgIT09IGZhbHNlKSB0aGlzLmRlbGVnYXRlRXZlbnRzKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZGVsZWdhdGVFdmVudHMoZXZlbnRzKSB7XG4gICAgaWYgKCEoZXZlbnRzIHx8IChldmVudHMgPSByZXN1bHQodGhpcywgJ2V2ZW50cycpKSkpIHJldHVybiB0aGlzXG4gICAgdGhpcy51bmRlbGVnYXRlRXZlbnRzKClcbiAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnRzKSB7XG4gICAgICB2YXIgbWV0aG9kID0gZXZlbnRzW2tleV1cbiAgICAgIGlmICgobWV0aG9kICYmIG1ldGhvZC5jb25zdHJ1Y3RvciAhPT0gRnVuY3Rpb24pKSBtZXRob2QgPSB0aGlzW2V2ZW50c1trZXldXVxuICAgICAgaWYgKCFtZXRob2QpIGNvbnRpbnVlXG5cbiAgICAgIHZhciBtYXRjaCA9IGtleS5tYXRjaChkZWxlZ2F0ZUV2ZW50U3BsaXR0ZXIpXG4gICAgICB2YXIgZXZlbnROYW1lID0gbWF0Y2hbMV0sIHNlbGVjdG9yID0gbWF0Y2hbMl1cbiAgICAgIC8vbWV0aG9kID0gXy5iaW5kKG1ldGhvZCwgdGhpcylcbiAgICAgIGV2ZW50TmFtZSArPSAnLmRlbGVnYXRlRXZlbnRzJyArIHRoaXMuY2lkXG4gICAgICBpZiAoc2VsZWN0b3IgPT09ICcnKSB7XG4gICAgICAgIHRoaXMuJGVsLm9uKGV2ZW50TmFtZSwgbWV0aG9kLmJpbmQodGhpcykpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbC5vbihldmVudE5hbWUsIHNlbGVjdG9yLCBtZXRob2QuYmluZCh0aGlzKSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHVuZGVsZWdhdGVFdmVudHMoKSB7XG4gICAgdGhpcy4kZWwub2ZmKCcuZGVsZWdhdGVFdmVudHMnICsgdGhpcy5jaWQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIF9lbnN1cmVFbGVtZW50KCkge1xuICAgIGlmICghdGhpcy5lbCkge1xuICAgICAgdmFyIGF0dHJzID0gYXNzaWduKHt9LCByZXN1bHQodGhpcywgJ2F0dHJpYnV0ZXMnKSlcbiAgICAgIGlmICh0aGlzLmlkKSBhdHRycy5pZCA9IHJlc3VsdCh0aGlzLCAnaWQnKVxuICAgICAgaWYgKHRoaXMuY2xhc3NOYW1lKSBhdHRyc1snY2xhc3MnXSA9IHJlc3VsdCh0aGlzLCAnY2xhc3NOYW1lJylcbiAgICAgIHZhciAkZWwgPSAkKCc8JyArIHJlc3VsdCh0aGlzLCAndGFnTmFtZScpICsgJz4nKS5hdHRyKGF0dHJzKVxuICAgICAgdGhpcy5zZXRFbGVtZW50KCRlbCwgZmFsc2UpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0RWxlbWVudChyZXN1bHQodGhpcywgJ2VsJyksIGZhbHNlKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVJT2JqZWN0XG4iLCIvKiBaZXB0byB2MS4xLjQtODAtZ2E5MTg0YjIgLSB6ZXB0byBldmVudCBhamF4IGNhbGxiYWNrcyBkZWZlcnJlZCB0b3VjaCBzZWxlY3RvciBpZSAtIHplcHRvanMuY29tL2xpY2Vuc2UgKi9cbnZhciBaZXB0bz1mdW5jdGlvbigpe2Z1bmN0aW9uIEQodCl7cmV0dXJuIG51bGw9PXQ/U3RyaW5nKHQpOmpbUy5jYWxsKHQpXXx8XCJvYmplY3RcIn1mdW5jdGlvbiBMKHQpe3JldHVyblwiZnVuY3Rpb25cIj09RCh0KX1mdW5jdGlvbiBrKHQpe3JldHVybiBudWxsIT10JiZ0PT10LndpbmRvd31mdW5jdGlvbiBaKHQpe3JldHVybiBudWxsIT10JiZ0Lm5vZGVUeXBlPT10LkRPQ1VNRU5UX05PREV9ZnVuY3Rpb24gJCh0KXtyZXR1cm5cIm9iamVjdFwiPT1EKHQpfWZ1bmN0aW9uIEYodCl7cmV0dXJuICQodCkmJiFrKHQpJiZPYmplY3QuZ2V0UHJvdG90eXBlT2YodCk9PU9iamVjdC5wcm90b3R5cGV9ZnVuY3Rpb24gUih0KXtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgdC5sZW5ndGh9ZnVuY3Rpb24gcSh0KXtyZXR1cm4gcy5jYWxsKHQsZnVuY3Rpb24odCl7cmV0dXJuIG51bGwhPXR9KX1mdW5jdGlvbiBXKHQpe3JldHVybiB0Lmxlbmd0aD4wP24uZm4uY29uY2F0LmFwcGx5KFtdLHQpOnR9ZnVuY3Rpb24geih0KXtyZXR1cm4gdC5yZXBsYWNlKC86Oi9nLFwiL1wiKS5yZXBsYWNlKC8oW0EtWl0rKShbQS1aXVthLXpdKS9nLFwiJDFfJDJcIikucmVwbGFjZSgvKFthLXpcXGRdKShbQS1aXSkvZyxcIiQxXyQyXCIpLnJlcGxhY2UoL18vZyxcIi1cIikudG9Mb3dlckNhc2UoKX1mdW5jdGlvbiBIKHQpe3JldHVybiB0IGluIGM/Y1t0XTpjW3RdPW5ldyBSZWdFeHAoXCIoXnxcXFxccylcIit0K1wiKFxcXFxzfCQpXCIpfWZ1bmN0aW9uIF8odCxlKXtyZXR1cm5cIm51bWJlclwiIT10eXBlb2YgZXx8bFt6KHQpXT9lOmUrXCJweFwifWZ1bmN0aW9uIEkodCl7dmFyIGUsbjtyZXR1cm4gZlt0XXx8KGU9dS5jcmVhdGVFbGVtZW50KHQpLHUuYm9keS5hcHBlbmRDaGlsZChlKSxuPWdldENvbXB1dGVkU3R5bGUoZSxcIlwiKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZGlzcGxheVwiKSxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZSksXCJub25lXCI9PW4mJihuPVwiYmxvY2tcIiksZlt0XT1uKSxmW3RdfWZ1bmN0aW9uIFUodCl7cmV0dXJuXCJjaGlsZHJlblwiaW4gdD9hLmNhbGwodC5jaGlsZHJlbik6bi5tYXAodC5jaGlsZE5vZGVzLGZ1bmN0aW9uKHQpe3JldHVybiAxPT10Lm5vZGVUeXBlP3Q6dm9pZCAwfSl9ZnVuY3Rpb24gWCh0LGUpe3ZhciBuLGk9dD90Lmxlbmd0aDowO2ZvcihuPTA7aT5uO24rKyl0aGlzW25dPXRbbl07dGhpcy5sZW5ndGg9aSx0aGlzLnNlbGVjdG9yPWV8fFwiXCJ9ZnVuY3Rpb24gQihuLGkscil7Zm9yKGUgaW4gaSlyJiYoRihpW2VdKXx8QShpW2VdKSk/KEYoaVtlXSkmJiFGKG5bZV0pJiYobltlXT17fSksQShpW2VdKSYmIUEobltlXSkmJihuW2VdPVtdKSxCKG5bZV0saVtlXSxyKSk6aVtlXSE9PXQmJihuW2VdPWlbZV0pfWZ1bmN0aW9uIFYodCxlKXtyZXR1cm4gbnVsbD09ZT9uKHQpOm4odCkuZmlsdGVyKGUpfWZ1bmN0aW9uIFkodCxlLG4saSl7cmV0dXJuIEwoZSk/ZS5jYWxsKHQsbixpKTplfWZ1bmN0aW9uIEoodCxlLG4pe251bGw9PW4/dC5yZW1vdmVBdHRyaWJ1dGUoZSk6dC5zZXRBdHRyaWJ1dGUoZSxuKX1mdW5jdGlvbiBHKGUsbil7dmFyIGk9ZS5jbGFzc05hbWV8fFwiXCIscj1pJiZpLmJhc2VWYWwhPT10O3JldHVybiBuPT09dD9yP2kuYmFzZVZhbDppOnZvaWQocj9pLmJhc2VWYWw9bjplLmNsYXNzTmFtZT1uKX1mdW5jdGlvbiBLKHQpe3RyeXtyZXR1cm4gdD9cInRydWVcIj09dHx8KFwiZmFsc2VcIj09dD8hMTpcIm51bGxcIj09dD9udWxsOit0K1wiXCI9PXQ/K3Q6L15bXFxbXFx7XS8udGVzdCh0KT9uLnBhcnNlSlNPTih0KTp0KTp0fWNhdGNoKGUpe3JldHVybiB0fX1mdW5jdGlvbiBRKHQsZSl7ZSh0KTtmb3IodmFyIG49MCxpPXQuY2hpbGROb2Rlcy5sZW5ndGg7aT5uO24rKylRKHQuY2hpbGROb2Rlc1tuXSxlKX12YXIgdCxlLG4saSxOLFAscj1bXSxvPXIuY29uY2F0LHM9ci5maWx0ZXIsYT1yLnNsaWNlLHU9d2luZG93LmRvY3VtZW50LGY9e30sYz17fSxsPXtcImNvbHVtbi1jb3VudFwiOjEsY29sdW1uczoxLFwiZm9udC13ZWlnaHRcIjoxLFwibGluZS1oZWlnaHRcIjoxLG9wYWNpdHk6MSxcInotaW5kZXhcIjoxLHpvb206MX0saD0vXlxccyo8KFxcdyt8ISlbXj5dKj4vLHA9L148KFxcdyspXFxzKlxcLz8+KD86PFxcL1xcMT58KSQvLGQ9LzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW1xcdzpdKylbXj5dKilcXC8+L2dpLG09L14oPzpib2R5fGh0bWwpJC9pLGc9LyhbQS1aXSkvZyx2PVtcInZhbFwiLFwiY3NzXCIsXCJodG1sXCIsXCJ0ZXh0XCIsXCJkYXRhXCIsXCJ3aWR0aFwiLFwiaGVpZ2h0XCIsXCJvZmZzZXRcIl0seT1bXCJhZnRlclwiLFwicHJlcGVuZFwiLFwiYmVmb3JlXCIsXCJhcHBlbmRcIl0sdz11LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKSx4PXUuY3JlYXRlRWxlbWVudChcInRyXCIpLGI9e3RyOnUuY3JlYXRlRWxlbWVudChcInRib2R5XCIpLHRib2R5OncsdGhlYWQ6dyx0Zm9vdDp3LHRkOngsdGg6eCxcIipcIjp1LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIil9LEU9L2NvbXBsZXRlfGxvYWRlZHxpbnRlcmFjdGl2ZS8sVD0vXltcXHctXSokLyxqPXt9LFM9ai50b1N0cmluZyxDPXt9LE89dS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLE09e3RhYmluZGV4OlwidGFiSW5kZXhcIixyZWFkb25seTpcInJlYWRPbmx5XCIsXCJmb3JcIjpcImh0bWxGb3JcIixcImNsYXNzXCI6XCJjbGFzc05hbWVcIixtYXhsZW5ndGg6XCJtYXhMZW5ndGhcIixjZWxsc3BhY2luZzpcImNlbGxTcGFjaW5nXCIsY2VsbHBhZGRpbmc6XCJjZWxsUGFkZGluZ1wiLHJvd3NwYW46XCJyb3dTcGFuXCIsY29sc3BhbjpcImNvbFNwYW5cIix1c2VtYXA6XCJ1c2VNYXBcIixmcmFtZWJvcmRlcjpcImZyYW1lQm9yZGVyXCIsY29udGVudGVkaXRhYmxlOlwiY29udGVudEVkaXRhYmxlXCJ9LEE9QXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBBcnJheX07cmV0dXJuIEMubWF0Y2hlcz1mdW5jdGlvbih0LGUpe2lmKCFlfHwhdHx8MSE9PXQubm9kZVR5cGUpcmV0dXJuITE7dmFyIG49dC53ZWJraXRNYXRjaGVzU2VsZWN0b3J8fHQubW96TWF0Y2hlc1NlbGVjdG9yfHx0Lm9NYXRjaGVzU2VsZWN0b3J8fHQubWF0Y2hlc1NlbGVjdG9yO2lmKG4pcmV0dXJuIG4uY2FsbCh0LGUpO3ZhciBpLHI9dC5wYXJlbnROb2RlLG89IXI7cmV0dXJuIG8mJihyPU8pLmFwcGVuZENoaWxkKHQpLGk9fkMucXNhKHIsZSkuaW5kZXhPZih0KSxvJiZPLnJlbW92ZUNoaWxkKHQpLGl9LE49ZnVuY3Rpb24odCl7cmV0dXJuIHQucmVwbGFjZSgvLSsoLik/L2csZnVuY3Rpb24odCxlKXtyZXR1cm4gZT9lLnRvVXBwZXJDYXNlKCk6XCJcIn0pfSxQPWZ1bmN0aW9uKHQpe3JldHVybiBzLmNhbGwodCxmdW5jdGlvbihlLG4pe3JldHVybiB0LmluZGV4T2YoZSk9PW59KX0sQy5mcmFnbWVudD1mdW5jdGlvbihlLGkscil7dmFyIG8scyxmO3JldHVybiBwLnRlc3QoZSkmJihvPW4odS5jcmVhdGVFbGVtZW50KFJlZ0V4cC4kMSkpKSxvfHwoZS5yZXBsYWNlJiYoZT1lLnJlcGxhY2UoZCxcIjwkMT48LyQyPlwiKSksaT09PXQmJihpPWgudGVzdChlKSYmUmVnRXhwLiQxKSxpIGluIGJ8fChpPVwiKlwiKSxmPWJbaV0sZi5pbm5lckhUTUw9XCJcIitlLG89bi5lYWNoKGEuY2FsbChmLmNoaWxkTm9kZXMpLGZ1bmN0aW9uKCl7Zi5yZW1vdmVDaGlsZCh0aGlzKX0pKSxGKHIpJiYocz1uKG8pLG4uZWFjaChyLGZ1bmN0aW9uKHQsZSl7di5pbmRleE9mKHQpPi0xP3NbdF0oZSk6cy5hdHRyKHQsZSl9KSksb30sQy5aPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIG5ldyBYKHQsZSl9LEMuaXNaPWZ1bmN0aW9uKHQpe3JldHVybiB0IGluc3RhbmNlb2YgQy5afSxDLmluaXQ9ZnVuY3Rpb24oZSxpKXt2YXIgcjtpZighZSlyZXR1cm4gQy5aKCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpaWYoZT1lLnRyaW0oKSxcIjxcIj09ZVswXSYmaC50ZXN0KGUpKXI9Qy5mcmFnbWVudChlLFJlZ0V4cC4kMSxpKSxlPW51bGw7ZWxzZXtpZihpIT09dClyZXR1cm4gbihpKS5maW5kKGUpO3I9Qy5xc2EodSxlKX1lbHNle2lmKEwoZSkpcmV0dXJuIG4odSkucmVhZHkoZSk7aWYoQy5pc1ooZSkpcmV0dXJuIGU7aWYoQShlKSlyPXEoZSk7ZWxzZSBpZigkKGUpKXI9W2VdLGU9bnVsbDtlbHNlIGlmKGgudGVzdChlKSlyPUMuZnJhZ21lbnQoZS50cmltKCksUmVnRXhwLiQxLGkpLGU9bnVsbDtlbHNle2lmKGkhPT10KXJldHVybiBuKGkpLmZpbmQoZSk7cj1DLnFzYSh1LGUpfX1yZXR1cm4gQy5aKHIsZSl9LG49ZnVuY3Rpb24odCxlKXtyZXR1cm4gQy5pbml0KHQsZSl9LG4uZXh0ZW5kPWZ1bmN0aW9uKHQpe3ZhciBlLG49YS5jYWxsKGFyZ3VtZW50cywxKTtyZXR1cm5cImJvb2xlYW5cIj09dHlwZW9mIHQmJihlPXQsdD1uLnNoaWZ0KCkpLG4uZm9yRWFjaChmdW5jdGlvbihuKXtCKHQsbixlKX0pLHR9LEMucXNhPWZ1bmN0aW9uKHQsZSl7dmFyIG4saT1cIiNcIj09ZVswXSxyPSFpJiZcIi5cIj09ZVswXSxvPWl8fHI/ZS5zbGljZSgxKTplLHM9VC50ZXN0KG8pO3JldHVybiB0LmdldEVsZW1lbnRCeUlkJiZzJiZpPyhuPXQuZ2V0RWxlbWVudEJ5SWQobykpP1tuXTpbXToxIT09dC5ub2RlVHlwZSYmOSE9PXQubm9kZVR5cGUmJjExIT09dC5ub2RlVHlwZT9bXTphLmNhbGwocyYmIWkmJnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZT9yP3QuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShvKTp0LmdldEVsZW1lbnRzQnlUYWdOYW1lKGUpOnQucXVlcnlTZWxlY3RvckFsbChlKSl9LG4uY29udGFpbnM9dS5kb2N1bWVudEVsZW1lbnQuY29udGFpbnM/ZnVuY3Rpb24odCxlKXtyZXR1cm4gdCE9PWUmJnQuY29udGFpbnMoZSl9OmZ1bmN0aW9uKHQsZSl7Zm9yKDtlJiYoZT1lLnBhcmVudE5vZGUpOylpZihlPT09dClyZXR1cm4hMDtyZXR1cm4hMX0sbi50eXBlPUQsbi5pc0Z1bmN0aW9uPUwsbi5pc1dpbmRvdz1rLG4uaXNBcnJheT1BLG4uaXNQbGFpbk9iamVjdD1GLG4uaXNFbXB0eU9iamVjdD1mdW5jdGlvbih0KXt2YXIgZTtmb3IoZSBpbiB0KXJldHVybiExO3JldHVybiEwfSxuLmluQXJyYXk9ZnVuY3Rpb24odCxlLG4pe3JldHVybiByLmluZGV4T2YuY2FsbChlLHQsbil9LG4uY2FtZWxDYXNlPU4sbi50cmltPWZ1bmN0aW9uKHQpe3JldHVybiBudWxsPT10P1wiXCI6U3RyaW5nLnByb3RvdHlwZS50cmltLmNhbGwodCl9LG4udXVpZD0wLG4uc3VwcG9ydD17fSxuLmV4cHI9e30sbi5ub29wPWZ1bmN0aW9uKCl7fSxuLm1hcD1mdW5jdGlvbih0LGUpe3ZhciBuLHIsbyxpPVtdO2lmKFIodCkpZm9yKHI9MDtyPHQubGVuZ3RoO3IrKyluPWUodFtyXSxyKSxudWxsIT1uJiZpLnB1c2gobik7ZWxzZSBmb3IobyBpbiB0KW49ZSh0W29dLG8pLG51bGwhPW4mJmkucHVzaChuKTtyZXR1cm4gVyhpKX0sbi5lYWNoPWZ1bmN0aW9uKHQsZSl7dmFyIG4saTtpZihSKHQpKXtmb3Iobj0wO248dC5sZW5ndGg7bisrKWlmKGUuY2FsbCh0W25dLG4sdFtuXSk9PT0hMSlyZXR1cm4gdH1lbHNlIGZvcihpIGluIHQpaWYoZS5jYWxsKHRbaV0saSx0W2ldKT09PSExKXJldHVybiB0O3JldHVybiB0fSxuLmdyZXA9ZnVuY3Rpb24odCxlKXtyZXR1cm4gcy5jYWxsKHQsZSl9LHdpbmRvdy5KU09OJiYobi5wYXJzZUpTT049SlNPTi5wYXJzZSksbi5lYWNoKFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvclwiLnNwbGl0KFwiIFwiKSxmdW5jdGlvbih0LGUpe2pbXCJbb2JqZWN0IFwiK2UrXCJdXCJdPWUudG9Mb3dlckNhc2UoKX0pLG4uZm49e2NvbnN0cnVjdG9yOkMuWixsZW5ndGg6MCxmb3JFYWNoOnIuZm9yRWFjaCxyZWR1Y2U6ci5yZWR1Y2UscHVzaDpyLnB1c2gsc29ydDpyLnNvcnQsc3BsaWNlOnIuc3BsaWNlLGluZGV4T2Y6ci5pbmRleE9mLGNvbmNhdDpmdW5jdGlvbigpe3ZhciB0LGUsbj1bXTtmb3IodD0wO3Q8YXJndW1lbnRzLmxlbmd0aDt0KyspZT1hcmd1bWVudHNbdF0sblt0XT1DLmlzWihlKT9lLnRvQXJyYXkoKTplO3JldHVybiBvLmFwcGx5KEMuaXNaKHRoaXMpP3RoaXMudG9BcnJheSgpOnRoaXMsbil9LG1hcDpmdW5jdGlvbih0KXtyZXR1cm4gbihuLm1hcCh0aGlzLGZ1bmN0aW9uKGUsbil7cmV0dXJuIHQuY2FsbChlLG4sZSl9KSl9LHNsaWNlOmZ1bmN0aW9uKCl7cmV0dXJuIG4oYS5hcHBseSh0aGlzLGFyZ3VtZW50cykpfSxyZWFkeTpmdW5jdGlvbih0KXtyZXR1cm4gRS50ZXN0KHUucmVhZHlTdGF0ZSkmJnUuYm9keT90KG4pOnUuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIixmdW5jdGlvbigpe3Qobil9LCExKSx0aGlzfSxnZXQ6ZnVuY3Rpb24oZSl7cmV0dXJuIGU9PT10P2EuY2FsbCh0aGlzKTp0aGlzW2U+PTA/ZTplK3RoaXMubGVuZ3RoXX0sdG9BcnJheTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmdldCgpfSxzaXplOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubGVuZ3RofSxyZW1vdmU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7bnVsbCE9dGhpcy5wYXJlbnROb2RlJiZ0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyl9KX0sZWFjaDpmdW5jdGlvbih0KXtyZXR1cm4gci5ldmVyeS5jYWxsKHRoaXMsZnVuY3Rpb24oZSxuKXtyZXR1cm4gdC5jYWxsKGUsbixlKSE9PSExfSksdGhpc30sZmlsdGVyOmZ1bmN0aW9uKHQpe3JldHVybiBMKHQpP3RoaXMubm90KHRoaXMubm90KHQpKTpuKHMuY2FsbCh0aGlzLGZ1bmN0aW9uKGUpe3JldHVybiBDLm1hdGNoZXMoZSx0KX0pKX0sYWRkOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIG4oUCh0aGlzLmNvbmNhdChuKHQsZSkpKSl9LGlzOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmxlbmd0aD4wJiZDLm1hdGNoZXModGhpc1swXSx0KX0sbm90OmZ1bmN0aW9uKGUpe3ZhciBpPVtdO2lmKEwoZSkmJmUuY2FsbCE9PXQpdGhpcy5lYWNoKGZ1bmN0aW9uKHQpe2UuY2FsbCh0aGlzLHQpfHxpLnB1c2godGhpcyl9KTtlbHNle3ZhciByPVwic3RyaW5nXCI9PXR5cGVvZiBlP3RoaXMuZmlsdGVyKGUpOlIoZSkmJkwoZS5pdGVtKT9hLmNhbGwoZSk6bihlKTt0aGlzLmZvckVhY2goZnVuY3Rpb24odCl7ci5pbmRleE9mKHQpPDAmJmkucHVzaCh0KX0pfXJldHVybiBuKGkpfSxoYXM6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCl7cmV0dXJuICQodCk/bi5jb250YWlucyh0aGlzLHQpOm4odGhpcykuZmluZCh0KS5zaXplKCl9KX0sZXE6ZnVuY3Rpb24odCl7cmV0dXJuLTE9PT10P3RoaXMuc2xpY2UodCk6dGhpcy5zbGljZSh0LCt0KzEpfSxmaXJzdDpmdW5jdGlvbigpe3ZhciB0PXRoaXNbMF07cmV0dXJuIHQmJiEkKHQpP3Q6bih0KX0sbGFzdDpmdW5jdGlvbigpe3ZhciB0PXRoaXNbdGhpcy5sZW5ndGgtMV07cmV0dXJuIHQmJiEkKHQpP3Q6bih0KX0sZmluZDpmdW5jdGlvbih0KXt2YXIgZSxpPXRoaXM7cmV0dXJuIGU9dD9cIm9iamVjdFwiPT10eXBlb2YgdD9uKHQpLmZpbHRlcihmdW5jdGlvbigpe3ZhciB0PXRoaXM7cmV0dXJuIHIuc29tZS5jYWxsKGksZnVuY3Rpb24oZSl7cmV0dXJuIG4uY29udGFpbnMoZSx0KX0pfSk6MT09dGhpcy5sZW5ndGg/bihDLnFzYSh0aGlzWzBdLHQpKTp0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiBDLnFzYSh0aGlzLHQpfSk6bigpfSxjbG9zZXN0OmZ1bmN0aW9uKHQsZSl7dmFyIGk9dGhpc1swXSxyPSExO2ZvcihcIm9iamVjdFwiPT10eXBlb2YgdCYmKHI9bih0KSk7aSYmIShyP3IuaW5kZXhPZihpKT49MDpDLm1hdGNoZXMoaSx0KSk7KWk9aSE9PWUmJiFaKGkpJiZpLnBhcmVudE5vZGU7cmV0dXJuIG4oaSl9LHBhcmVudHM6ZnVuY3Rpb24odCl7Zm9yKHZhciBlPVtdLGk9dGhpcztpLmxlbmd0aD4wOylpPW4ubWFwKGksZnVuY3Rpb24odCl7cmV0dXJuKHQ9dC5wYXJlbnROb2RlKSYmIVoodCkmJmUuaW5kZXhPZih0KTwwPyhlLnB1c2godCksdCk6dm9pZCAwfSk7cmV0dXJuIFYoZSx0KX0scGFyZW50OmZ1bmN0aW9uKHQpe3JldHVybiBWKFAodGhpcy5wbHVjayhcInBhcmVudE5vZGVcIikpLHQpfSxjaGlsZHJlbjpmdW5jdGlvbih0KXtyZXR1cm4gVih0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiBVKHRoaXMpfSksdCl9LGNvbnRlbnRzOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGVudERvY3VtZW50fHxhLmNhbGwodGhpcy5jaGlsZE5vZGVzKX0pfSxzaWJsaW5nczpmdW5jdGlvbih0KXtyZXR1cm4gVih0aGlzLm1hcChmdW5jdGlvbih0LGUpe3JldHVybiBzLmNhbGwoVShlLnBhcmVudE5vZGUpLGZ1bmN0aW9uKHQpe3JldHVybiB0IT09ZX0pfSksdCl9LGVtcHR5OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3RoaXMuaW5uZXJIVE1MPVwiXCJ9KX0scGx1Y2s6ZnVuY3Rpb24odCl7cmV0dXJuIG4ubWFwKHRoaXMsZnVuY3Rpb24oZSl7cmV0dXJuIGVbdF19KX0sc2hvdzpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcIm5vbmVcIj09dGhpcy5zdHlsZS5kaXNwbGF5JiYodGhpcy5zdHlsZS5kaXNwbGF5PVwiXCIpLFwibm9uZVwiPT1nZXRDb21wdXRlZFN0eWxlKHRoaXMsXCJcIikuZ2V0UHJvcGVydHlWYWx1ZShcImRpc3BsYXlcIikmJih0aGlzLnN0eWxlLmRpc3BsYXk9SSh0aGlzLm5vZGVOYW1lKSl9KX0scmVwbGFjZVdpdGg6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuYmVmb3JlKHQpLnJlbW92ZSgpfSx3cmFwOmZ1bmN0aW9uKHQpe3ZhciBlPUwodCk7aWYodGhpc1swXSYmIWUpdmFyIGk9bih0KS5nZXQoMCkscj1pLnBhcmVudE5vZGV8fHRoaXMubGVuZ3RoPjE7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihvKXtuKHRoaXMpLndyYXBBbGwoZT90LmNhbGwodGhpcyxvKTpyP2kuY2xvbmVOb2RlKCEwKTppKX0pfSx3cmFwQWxsOmZ1bmN0aW9uKHQpe2lmKHRoaXNbMF0pe24odGhpc1swXSkuYmVmb3JlKHQ9bih0KSk7Zm9yKHZhciBlOyhlPXQuY2hpbGRyZW4oKSkubGVuZ3RoOyl0PWUuZmlyc3QoKTtuKHQpLmFwcGVuZCh0aGlzKX1yZXR1cm4gdGhpc30sd3JhcElubmVyOmZ1bmN0aW9uKHQpe3ZhciBlPUwodCk7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpKXt2YXIgcj1uKHRoaXMpLG89ci5jb250ZW50cygpLHM9ZT90LmNhbGwodGhpcyxpKTp0O28ubGVuZ3RoP28ud3JhcEFsbChzKTpyLmFwcGVuZChzKX0pfSx1bndyYXA6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wYXJlbnQoKS5lYWNoKGZ1bmN0aW9uKCl7bih0aGlzKS5yZXBsYWNlV2l0aChuKHRoaXMpLmNoaWxkcmVuKCkpfSksdGhpc30sY2xvbmU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jbG9uZU5vZGUoITApfSl9LGhpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpfSx0b2dnbGU6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBpPW4odGhpcyk7KGU9PT10P1wibm9uZVwiPT1pLmNzcyhcImRpc3BsYXlcIik6ZSk/aS5zaG93KCk6aS5oaWRlKCl9KX0scHJldjpmdW5jdGlvbih0KXtyZXR1cm4gbih0aGlzLnBsdWNrKFwicHJldmlvdXNFbGVtZW50U2libGluZ1wiKSkuZmlsdGVyKHR8fFwiKlwiKX0sbmV4dDpmdW5jdGlvbih0KXtyZXR1cm4gbih0aGlzLnBsdWNrKFwibmV4dEVsZW1lbnRTaWJsaW5nXCIpKS5maWx0ZXIodHx8XCIqXCIpfSxodG1sOmZ1bmN0aW9uKHQpe3JldHVybiAwIGluIGFyZ3VtZW50cz90aGlzLmVhY2goZnVuY3Rpb24oZSl7dmFyIGk9dGhpcy5pbm5lckhUTUw7bih0aGlzKS5lbXB0eSgpLmFwcGVuZChZKHRoaXMsdCxlLGkpKX0pOjAgaW4gdGhpcz90aGlzWzBdLmlubmVySFRNTDpudWxsfSx0ZXh0OmZ1bmN0aW9uKHQpe3JldHVybiAwIGluIGFyZ3VtZW50cz90aGlzLmVhY2goZnVuY3Rpb24oZSl7dmFyIG49WSh0aGlzLHQsZSx0aGlzLnRleHRDb250ZW50KTt0aGlzLnRleHRDb250ZW50PW51bGw9PW4/XCJcIjpcIlwiK259KTowIGluIHRoaXM/dGhpc1swXS50ZXh0Q29udGVudDpudWxsfSxhdHRyOmZ1bmN0aW9uKG4saSl7dmFyIHI7cmV0dXJuXCJzdHJpbmdcIiE9dHlwZW9mIG58fDEgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbih0KXtpZigxPT09dGhpcy5ub2RlVHlwZSlpZigkKG4pKWZvcihlIGluIG4pSih0aGlzLGUsbltlXSk7ZWxzZSBKKHRoaXMsbixZKHRoaXMsaSx0LHRoaXMuZ2V0QXR0cmlidXRlKG4pKSl9KTp0aGlzLmxlbmd0aCYmMT09PXRoaXNbMF0ubm9kZVR5cGU/IShyPXRoaXNbMF0uZ2V0QXR0cmlidXRlKG4pKSYmbiBpbiB0aGlzWzBdP3RoaXNbMF1bbl06cjp0fSxyZW1vdmVBdHRyOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXsxPT09dGhpcy5ub2RlVHlwZSYmdC5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbih0KXtKKHRoaXMsdCl9LHRoaXMpfSl9LHByb3A6ZnVuY3Rpb24odCxlKXtyZXR1cm4gdD1NW3RdfHx0LDEgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihuKXt0aGlzW3RdPVkodGhpcyxlLG4sdGhpc1t0XSl9KTp0aGlzWzBdJiZ0aGlzWzBdW3RdfSxkYXRhOmZ1bmN0aW9uKGUsbil7dmFyIGk9XCJkYXRhLVwiK2UucmVwbGFjZShnLFwiLSQxXCIpLnRvTG93ZXJDYXNlKCkscj0xIGluIGFyZ3VtZW50cz90aGlzLmF0dHIoaSxuKTp0aGlzLmF0dHIoaSk7cmV0dXJuIG51bGwhPT1yP0socik6dH0sdmFsOmZ1bmN0aW9uKHQpe3JldHVybiAwIGluIGFyZ3VtZW50cz90aGlzLmVhY2goZnVuY3Rpb24oZSl7dGhpcy52YWx1ZT1ZKHRoaXMsdCxlLHRoaXMudmFsdWUpfSk6dGhpc1swXSYmKHRoaXNbMF0ubXVsdGlwbGU/bih0aGlzWzBdKS5maW5kKFwib3B0aW9uXCIpLmZpbHRlcihmdW5jdGlvbigpe3JldHVybiB0aGlzLnNlbGVjdGVkfSkucGx1Y2soXCJ2YWx1ZVwiKTp0aGlzWzBdLnZhbHVlKX0sb2Zmc2V0OmZ1bmN0aW9uKHQpe2lmKHQpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihlKXt2YXIgaT1uKHRoaXMpLHI9WSh0aGlzLHQsZSxpLm9mZnNldCgpKSxvPWkub2Zmc2V0UGFyZW50KCkub2Zmc2V0KCkscz17dG9wOnIudG9wLW8udG9wLGxlZnQ6ci5sZWZ0LW8ubGVmdH07XCJzdGF0aWNcIj09aS5jc3MoXCJwb3NpdGlvblwiKSYmKHMucG9zaXRpb249XCJyZWxhdGl2ZVwiKSxpLmNzcyhzKX0pO2lmKCF0aGlzLmxlbmd0aClyZXR1cm4gbnVsbDtpZighbi5jb250YWlucyh1LmRvY3VtZW50RWxlbWVudCx0aGlzWzBdKSlyZXR1cm57dG9wOjAsbGVmdDowfTt2YXIgZT10aGlzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3JldHVybntsZWZ0OmUubGVmdCt3aW5kb3cucGFnZVhPZmZzZXQsdG9wOmUudG9wK3dpbmRvdy5wYWdlWU9mZnNldCx3aWR0aDpNYXRoLnJvdW5kKGUud2lkdGgpLGhlaWdodDpNYXRoLnJvdW5kKGUuaGVpZ2h0KX19LGNzczpmdW5jdGlvbih0LGkpe2lmKGFyZ3VtZW50cy5sZW5ndGg8Mil7dmFyIHIsbz10aGlzWzBdO2lmKCFvKXJldHVybjtpZihyPWdldENvbXB1dGVkU3R5bGUobyxcIlwiKSxcInN0cmluZ1wiPT10eXBlb2YgdClyZXR1cm4gby5zdHlsZVtOKHQpXXx8ci5nZXRQcm9wZXJ0eVZhbHVlKHQpO2lmKEEodCkpe3ZhciBzPXt9O3JldHVybiBuLmVhY2godCxmdW5jdGlvbih0LGUpe3NbZV09by5zdHlsZVtOKGUpXXx8ci5nZXRQcm9wZXJ0eVZhbHVlKGUpfSksc319dmFyIGE9XCJcIjtpZihcInN0cmluZ1wiPT1EKHQpKWl8fDA9PT1pP2E9eih0KStcIjpcIitfKHQsaSk6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7dGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eSh6KHQpKX0pO2Vsc2UgZm9yKGUgaW4gdCl0W2VdfHwwPT09dFtlXT9hKz16KGUpK1wiOlwiK18oZSx0W2VdKStcIjtcIjp0aGlzLmVhY2goZnVuY3Rpb24oKXt0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KHooZSkpfSk7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3RoaXMuc3R5bGUuY3NzVGV4dCs9XCI7XCIrYX0pfSxpbmRleDpmdW5jdGlvbih0KXtyZXR1cm4gdD90aGlzLmluZGV4T2Yobih0KVswXSk6dGhpcy5wYXJlbnQoKS5jaGlsZHJlbigpLmluZGV4T2YodGhpc1swXSl9LGhhc0NsYXNzOmZ1bmN0aW9uKHQpe3JldHVybiB0P3Iuc29tZS5jYWxsKHRoaXMsZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMudGVzdChHKHQpKX0sSCh0KSk6ITF9LGFkZENsYXNzOmZ1bmN0aW9uKHQpe3JldHVybiB0P3RoaXMuZWFjaChmdW5jdGlvbihlKXtpZihcImNsYXNzTmFtZVwiaW4gdGhpcyl7aT1bXTt2YXIgcj1HKHRoaXMpLG89WSh0aGlzLHQsZSxyKTtvLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24odCl7bih0aGlzKS5oYXNDbGFzcyh0KXx8aS5wdXNoKHQpfSx0aGlzKSxpLmxlbmd0aCYmRyh0aGlzLHIrKHI/XCIgXCI6XCJcIikraS5qb2luKFwiIFwiKSl9fSk6dGhpc30scmVtb3ZlQ2xhc3M6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihuKXtpZihcImNsYXNzTmFtZVwiaW4gdGhpcyl7aWYoZT09PXQpcmV0dXJuIEcodGhpcyxcIlwiKTtpPUcodGhpcyksWSh0aGlzLGUsbixpKS5zcGxpdCgvXFxzKy9nKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe2k9aS5yZXBsYWNlKEgodCksXCIgXCIpfSksRyh0aGlzLGkudHJpbSgpKX19KX0sdG9nZ2xlQ2xhc3M6ZnVuY3Rpb24oZSxpKXtyZXR1cm4gZT90aGlzLmVhY2goZnVuY3Rpb24ocil7dmFyIG89bih0aGlzKSxzPVkodGhpcyxlLHIsRyh0aGlzKSk7cy5zcGxpdCgvXFxzKy9nKS5mb3JFYWNoKGZ1bmN0aW9uKGUpeyhpPT09dD8hby5oYXNDbGFzcyhlKTppKT9vLmFkZENsYXNzKGUpOm8ucmVtb3ZlQ2xhc3MoZSl9KX0pOnRoaXN9LHNjcm9sbFRvcDpmdW5jdGlvbihlKXtpZih0aGlzLmxlbmd0aCl7dmFyIG49XCJzY3JvbGxUb3BcImluIHRoaXNbMF07cmV0dXJuIGU9PT10P24/dGhpc1swXS5zY3JvbGxUb3A6dGhpc1swXS5wYWdlWU9mZnNldDp0aGlzLmVhY2gobj9mdW5jdGlvbigpe3RoaXMuc2Nyb2xsVG9wPWV9OmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxUbyh0aGlzLnNjcm9sbFgsZSl9KX19LHNjcm9sbExlZnQ6ZnVuY3Rpb24oZSl7aWYodGhpcy5sZW5ndGgpe3ZhciBuPVwic2Nyb2xsTGVmdFwiaW4gdGhpc1swXTtyZXR1cm4gZT09PXQ/bj90aGlzWzBdLnNjcm9sbExlZnQ6dGhpc1swXS5wYWdlWE9mZnNldDp0aGlzLmVhY2gobj9mdW5jdGlvbigpe3RoaXMuc2Nyb2xsTGVmdD1lfTpmdW5jdGlvbigpe3RoaXMuc2Nyb2xsVG8oZSx0aGlzLnNjcm9sbFkpfSl9fSxwb3NpdGlvbjpmdW5jdGlvbigpe2lmKHRoaXMubGVuZ3RoKXt2YXIgdD10aGlzWzBdLGU9dGhpcy5vZmZzZXRQYXJlbnQoKSxpPXRoaXMub2Zmc2V0KCkscj1tLnRlc3QoZVswXS5ub2RlTmFtZSk/e3RvcDowLGxlZnQ6MH06ZS5vZmZzZXQoKTtyZXR1cm4gaS50b3AtPXBhcnNlRmxvYXQobih0KS5jc3MoXCJtYXJnaW4tdG9wXCIpKXx8MCxpLmxlZnQtPXBhcnNlRmxvYXQobih0KS5jc3MoXCJtYXJnaW4tbGVmdFwiKSl8fDAsci50b3ArPXBhcnNlRmxvYXQobihlWzBdKS5jc3MoXCJib3JkZXItdG9wLXdpZHRoXCIpKXx8MCxyLmxlZnQrPXBhcnNlRmxvYXQobihlWzBdKS5jc3MoXCJib3JkZXItbGVmdC13aWR0aFwiKSl8fDAse3RvcDppLnRvcC1yLnRvcCxsZWZ0OmkubGVmdC1yLmxlZnR9fX0sb2Zmc2V0UGFyZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7Zm9yKHZhciB0PXRoaXMub2Zmc2V0UGFyZW50fHx1LmJvZHk7dCYmIW0udGVzdCh0Lm5vZGVOYW1lKSYmXCJzdGF0aWNcIj09bih0KS5jc3MoXCJwb3NpdGlvblwiKTspdD10Lm9mZnNldFBhcmVudDtyZXR1cm4gdH0pfX0sbi5mbi5kZXRhY2g9bi5mbi5yZW1vdmUsW1wid2lkdGhcIixcImhlaWdodFwiXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciBpPWUucmVwbGFjZSgvLi8sZnVuY3Rpb24odCl7cmV0dXJuIHRbMF0udG9VcHBlckNhc2UoKX0pO24uZm5bZV09ZnVuY3Rpb24ocil7dmFyIG8scz10aGlzWzBdO3JldHVybiByPT09dD9rKHMpP3NbXCJpbm5lclwiK2ldOloocyk/cy5kb2N1bWVudEVsZW1lbnRbXCJzY3JvbGxcIitpXToobz10aGlzLm9mZnNldCgpKSYmb1tlXTp0aGlzLmVhY2goZnVuY3Rpb24odCl7cz1uKHRoaXMpLHMuY3NzKGUsWSh0aGlzLHIsdCxzW2VdKCkpKX0pfX0pLHkuZm9yRWFjaChmdW5jdGlvbih0LGUpe3ZhciBpPWUlMjtuLmZuW3RdPWZ1bmN0aW9uKCl7dmFyIHQsbyxyPW4ubWFwKGFyZ3VtZW50cyxmdW5jdGlvbihlKXtyZXR1cm4gdD1EKGUpLFwib2JqZWN0XCI9PXR8fFwiYXJyYXlcIj09dHx8bnVsbD09ZT9lOkMuZnJhZ21lbnQoZSl9KSxzPXRoaXMubGVuZ3RoPjE7cmV0dXJuIHIubGVuZ3RoPDE/dGhpczp0aGlzLmVhY2goZnVuY3Rpb24odCxhKXtvPWk/YTphLnBhcmVudE5vZGUsYT0wPT1lP2EubmV4dFNpYmxpbmc6MT09ZT9hLmZpcnN0Q2hpbGQ6Mj09ZT9hOm51bGw7dmFyIGY9bi5jb250YWlucyh1LmRvY3VtZW50RWxlbWVudCxvKTtyLmZvckVhY2goZnVuY3Rpb24odCl7aWYocyl0PXQuY2xvbmVOb2RlKCEwKTtlbHNlIGlmKCFvKXJldHVybiBuKHQpLnJlbW92ZSgpO28uaW5zZXJ0QmVmb3JlKHQsYSksZiYmUSh0LGZ1bmN0aW9uKHQpe251bGw9PXQubm9kZU5hbWV8fFwiU0NSSVBUXCIhPT10Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCl8fHQudHlwZSYmXCJ0ZXh0L2phdmFzY3JpcHRcIiE9PXQudHlwZXx8dC5zcmN8fHdpbmRvdy5ldmFsLmNhbGwod2luZG93LHQuaW5uZXJIVE1MKX0pfSl9KX0sbi5mbltpP3QrXCJUb1wiOlwiaW5zZXJ0XCIrKGU/XCJCZWZvcmVcIjpcIkFmdGVyXCIpXT1mdW5jdGlvbihlKXtyZXR1cm4gbihlKVt0XSh0aGlzKSx0aGlzfX0pLEMuWi5wcm90b3R5cGU9WC5wcm90b3R5cGU9bi5mbixDLnVuaXE9UCxDLmRlc2VyaWFsaXplVmFsdWU9SyxuLnplcHRvPUMsbn0oKTt3aW5kb3cuWmVwdG89WmVwdG8sdm9pZCAwPT09d2luZG93LiQmJih3aW5kb3cuJD1aZXB0byksZnVuY3Rpb24odCl7ZnVuY3Rpb24gbCh0KXtyZXR1cm4gdC5femlkfHwodC5femlkPWUrKyl9ZnVuY3Rpb24gaCh0LGUsbixpKXtpZihlPXAoZSksZS5ucyl2YXIgcj1kKGUubnMpO3JldHVybihzW2wodCldfHxbXSkuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiEoIXR8fGUuZSYmdC5lIT1lLmV8fGUubnMmJiFyLnRlc3QodC5ucyl8fG4mJmwodC5mbikhPT1sKG4pfHxpJiZ0LnNlbCE9aSl9KX1mdW5jdGlvbiBwKHQpe3ZhciBlPShcIlwiK3QpLnNwbGl0KFwiLlwiKTtyZXR1cm57ZTplWzBdLG5zOmUuc2xpY2UoMSkuc29ydCgpLmpvaW4oXCIgXCIpfX1mdW5jdGlvbiBkKHQpe3JldHVybiBuZXcgUmVnRXhwKFwiKD86XnwgKVwiK3QucmVwbGFjZShcIiBcIixcIiAuKiA/XCIpK1wiKD86IHwkKVwiKX1mdW5jdGlvbiBtKHQsZSl7cmV0dXJuIHQuZGVsJiYhdSYmdC5lIGluIGZ8fCEhZX1mdW5jdGlvbiBnKHQpe3JldHVybiBjW3RdfHx1JiZmW3RdfHx0fWZ1bmN0aW9uIHYoZSxpLHIsbyxhLHUsZil7dmFyIGg9bChlKSxkPXNbaF18fChzW2hdPVtdKTtpLnNwbGl0KC9cXHMvKS5mb3JFYWNoKGZ1bmN0aW9uKGkpe2lmKFwicmVhZHlcIj09aSlyZXR1cm4gdChkb2N1bWVudCkucmVhZHkocik7dmFyIHM9cChpKTtzLmZuPXIscy5zZWw9YSxzLmUgaW4gYyYmKHI9ZnVuY3Rpb24oZSl7dmFyIG49ZS5yZWxhdGVkVGFyZ2V0O3JldHVybiFufHxuIT09dGhpcyYmIXQuY29udGFpbnModGhpcyxuKT9zLmZuLmFwcGx5KHRoaXMsYXJndW1lbnRzKTp2b2lkIDB9KSxzLmRlbD11O3ZhciBsPXV8fHI7cy5wcm94eT1mdW5jdGlvbih0KXtpZih0PVQodCksIXQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSl7dC5kYXRhPW87dmFyIGk9bC5hcHBseShlLHQuX2FyZ3M9PW4/W3RdOlt0XS5jb25jYXQodC5fYXJncykpO3JldHVybiBpPT09ITEmJih0LnByZXZlbnREZWZhdWx0KCksdC5zdG9wUHJvcGFnYXRpb24oKSksaX19LHMuaT1kLmxlbmd0aCxkLnB1c2gocyksXCJhZGRFdmVudExpc3RlbmVyXCJpbiBlJiZlLmFkZEV2ZW50TGlzdGVuZXIoZyhzLmUpLHMucHJveHksbShzLGYpKX0pfWZ1bmN0aW9uIHkodCxlLG4saSxyKXt2YXIgbz1sKHQpOyhlfHxcIlwiKS5zcGxpdCgvXFxzLykuZm9yRWFjaChmdW5jdGlvbihlKXtoKHQsZSxuLGkpLmZvckVhY2goZnVuY3Rpb24oZSl7ZGVsZXRlIHNbb11bZS5pXSxcInJlbW92ZUV2ZW50TGlzdGVuZXJcImluIHQmJnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihnKGUuZSksZS5wcm94eSxtKGUscikpfSl9KX1mdW5jdGlvbiBUKGUsaSl7cmV0dXJuKGl8fCFlLmlzRGVmYXVsdFByZXZlbnRlZCkmJihpfHwoaT1lKSx0LmVhY2goRSxmdW5jdGlvbih0LG4pe3ZhciByPWlbdF07ZVt0XT1mdW5jdGlvbigpe3JldHVybiB0aGlzW25dPXcsciYmci5hcHBseShpLGFyZ3VtZW50cyl9LGVbbl09eH0pLChpLmRlZmF1bHRQcmV2ZW50ZWQhPT1uP2kuZGVmYXVsdFByZXZlbnRlZDpcInJldHVyblZhbHVlXCJpbiBpP2kucmV0dXJuVmFsdWU9PT0hMTppLmdldFByZXZlbnREZWZhdWx0JiZpLmdldFByZXZlbnREZWZhdWx0KCkpJiYoZS5pc0RlZmF1bHRQcmV2ZW50ZWQ9dykpLGV9ZnVuY3Rpb24gaih0KXt2YXIgZSxpPXtvcmlnaW5hbEV2ZW50OnR9O2ZvcihlIGluIHQpYi50ZXN0KGUpfHx0W2VdPT09bnx8KGlbZV09dFtlXSk7cmV0dXJuIFQoaSx0KX12YXIgbixlPTEsaT1BcnJheS5wcm90b3R5cGUuc2xpY2Uscj10LmlzRnVuY3Rpb24sbz1mdW5jdGlvbih0KXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgdH0scz17fSxhPXt9LHU9XCJvbmZvY3VzaW5cImluIHdpbmRvdyxmPXtmb2N1czpcImZvY3VzaW5cIixibHVyOlwiZm9jdXNvdXRcIn0sYz17bW91c2VlbnRlcjpcIm1vdXNlb3ZlclwiLG1vdXNlbGVhdmU6XCJtb3VzZW91dFwifTthLmNsaWNrPWEubW91c2Vkb3duPWEubW91c2V1cD1hLm1vdXNlbW92ZT1cIk1vdXNlRXZlbnRzXCIsdC5ldmVudD17YWRkOnYscmVtb3ZlOnl9LHQucHJveHk9ZnVuY3Rpb24oZSxuKXt2YXIgcz0yIGluIGFyZ3VtZW50cyYmaS5jYWxsKGFyZ3VtZW50cywyKTtpZihyKGUpKXt2YXIgYT1mdW5jdGlvbigpe3JldHVybiBlLmFwcGx5KG4scz9zLmNvbmNhdChpLmNhbGwoYXJndW1lbnRzKSk6YXJndW1lbnRzKX07cmV0dXJuIGEuX3ppZD1sKGUpLGF9aWYobyhuKSlyZXR1cm4gcz8ocy51bnNoaWZ0KGVbbl0sZSksdC5wcm94eS5hcHBseShudWxsLHMpKTp0LnByb3h5KGVbbl0sZSk7dGhyb3cgbmV3IFR5cGVFcnJvcihcImV4cGVjdGVkIGZ1bmN0aW9uXCIpfSx0LmZuLmJpbmQ9ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0aGlzLm9uKHQsZSxuKX0sdC5mbi51bmJpbmQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5vZmYodCxlKX0sdC5mbi5vbmU9ZnVuY3Rpb24odCxlLG4saSl7cmV0dXJuIHRoaXMub24odCxlLG4saSwxKX07dmFyIHc9ZnVuY3Rpb24oKXtyZXR1cm4hMH0seD1mdW5jdGlvbigpe3JldHVybiExfSxiPS9eKFtBLVpdfHJldHVyblZhbHVlJHxsYXllcltYWV0kKS8sRT17cHJldmVudERlZmF1bHQ6XCJpc0RlZmF1bHRQcmV2ZW50ZWRcIixzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246XCJpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZFwiLHN0b3BQcm9wYWdhdGlvbjpcImlzUHJvcGFnYXRpb25TdG9wcGVkXCJ9O3QuZm4uZGVsZWdhdGU9ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0aGlzLm9uKGUsdCxuKX0sdC5mbi51bmRlbGVnYXRlPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdGhpcy5vZmYoZSx0LG4pfSx0LmZuLmxpdmU9ZnVuY3Rpb24oZSxuKXtyZXR1cm4gdChkb2N1bWVudC5ib2R5KS5kZWxlZ2F0ZSh0aGlzLnNlbGVjdG9yLGUsbiksdGhpc30sdC5mbi5kaWU9ZnVuY3Rpb24oZSxuKXtyZXR1cm4gdChkb2N1bWVudC5ib2R5KS51bmRlbGVnYXRlKHRoaXMuc2VsZWN0b3IsZSxuKSx0aGlzfSx0LmZuLm9uPWZ1bmN0aW9uKGUscyxhLHUsZil7dmFyIGMsbCxoPXRoaXM7cmV0dXJuIGUmJiFvKGUpPyh0LmVhY2goZSxmdW5jdGlvbih0LGUpe2gub24odCxzLGEsZSxmKX0pLGgpOihvKHMpfHxyKHUpfHx1PT09ITF8fCh1PWEsYT1zLHM9biksKHU9PT1ufHxhPT09ITEpJiYodT1hLGE9biksdT09PSExJiYodT14KSxoLmVhY2goZnVuY3Rpb24obixyKXtmJiYoYz1mdW5jdGlvbih0KXtyZXR1cm4geShyLHQudHlwZSx1KSx1LmFwcGx5KHRoaXMsYXJndW1lbnRzKX0pLHMmJihsPWZ1bmN0aW9uKGUpe3ZhciBuLG89dChlLnRhcmdldCkuY2xvc2VzdChzLHIpLmdldCgwKTtyZXR1cm4gbyYmbyE9PXI/KG49dC5leHRlbmQoaihlKSx7Y3VycmVudFRhcmdldDpvLGxpdmVGaXJlZDpyfSksKGN8fHUpLmFwcGx5KG8sW25dLmNvbmNhdChpLmNhbGwoYXJndW1lbnRzLDEpKSkpOnZvaWQgMH0pLHYocixlLHUsYSxzLGx8fGMpfSkpfSx0LmZuLm9mZj1mdW5jdGlvbihlLGkscyl7dmFyIGE9dGhpcztyZXR1cm4gZSYmIW8oZSk/KHQuZWFjaChlLGZ1bmN0aW9uKHQsZSl7YS5vZmYodCxpLGUpfSksYSk6KG8oaSl8fHIocyl8fHM9PT0hMXx8KHM9aSxpPW4pLHM9PT0hMSYmKHM9eCksYS5lYWNoKGZ1bmN0aW9uKCl7eSh0aGlzLGUscyxpKX0pKX0sdC5mbi50cmlnZ2VyPWZ1bmN0aW9uKGUsbil7cmV0dXJuIGU9byhlKXx8dC5pc1BsYWluT2JqZWN0KGUpP3QuRXZlbnQoZSk6VChlKSxlLl9hcmdzPW4sdGhpcy5lYWNoKGZ1bmN0aW9uKCl7ZS50eXBlIGluIGYmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXNbZS50eXBlXT90aGlzW2UudHlwZV0oKTpcImRpc3BhdGNoRXZlbnRcImluIHRoaXM/dGhpcy5kaXNwYXRjaEV2ZW50KGUpOnQodGhpcykudHJpZ2dlckhhbmRsZXIoZSxuKX0pfSx0LmZuLnRyaWdnZXJIYW5kbGVyPWZ1bmN0aW9uKGUsbil7dmFyIGkscjtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKHMsYSl7aT1qKG8oZSk/dC5FdmVudChlKTplKSxpLl9hcmdzPW4saS50YXJnZXQ9YSx0LmVhY2goaChhLGUudHlwZXx8ZSksZnVuY3Rpb24odCxlKXtyZXR1cm4gcj1lLnByb3h5KGkpLGkuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKT8hMTp2b2lkIDB9KX0pLHJ9LFwiZm9jdXNpbiBmb2N1c291dCBmb2N1cyBibHVyIGxvYWQgcmVzaXplIHNjcm9sbCB1bmxvYWQgY2xpY2sgZGJsY2xpY2sgbW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmUgY2hhbmdlIHNlbGVjdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGVycm9yXCIuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24oZSl7dC5mbltlXT1mdW5jdGlvbih0KXtyZXR1cm4gMCBpbiBhcmd1bWVudHM/dGhpcy5iaW5kKGUsdCk6dGhpcy50cmlnZ2VyKGUpfX0pLHQuRXZlbnQ9ZnVuY3Rpb24odCxlKXtvKHQpfHwoZT10LHQ9ZS50eXBlKTt2YXIgbj1kb2N1bWVudC5jcmVhdGVFdmVudChhW3RdfHxcIkV2ZW50c1wiKSxpPSEwO2lmKGUpZm9yKHZhciByIGluIGUpXCJidWJibGVzXCI9PXI/aT0hIWVbcl06bltyXT1lW3JdO3JldHVybiBuLmluaXRFdmVudCh0LGksITApLFQobil9fShaZXB0byksZnVuY3Rpb24odCl7ZnVuY3Rpb24gaChlLG4saSl7dmFyIHI9dC5FdmVudChuKTtyZXR1cm4gdChlKS50cmlnZ2VyKHIsaSksIXIuaXNEZWZhdWx0UHJldmVudGVkKCl9ZnVuY3Rpb24gcCh0LGUsaSxyKXtyZXR1cm4gdC5nbG9iYWw/aChlfHxuLGkscik6dm9pZCAwfWZ1bmN0aW9uIGQoZSl7ZS5nbG9iYWwmJjA9PT10LmFjdGl2ZSsrJiZwKGUsbnVsbCxcImFqYXhTdGFydFwiKX1mdW5jdGlvbiBtKGUpe2UuZ2xvYmFsJiYhLS10LmFjdGl2ZSYmcChlLG51bGwsXCJhamF4U3RvcFwiKX1mdW5jdGlvbiBnKHQsZSl7dmFyIG49ZS5jb250ZXh0O3JldHVybiBlLmJlZm9yZVNlbmQuY2FsbChuLHQsZSk9PT0hMXx8cChlLG4sXCJhamF4QmVmb3JlU2VuZFwiLFt0LGVdKT09PSExPyExOnZvaWQgcChlLG4sXCJhamF4U2VuZFwiLFt0LGVdKX1mdW5jdGlvbiB2KHQsZSxuLGkpe3ZhciByPW4uY29udGV4dCxvPVwic3VjY2Vzc1wiO24uc3VjY2Vzcy5jYWxsKHIsdCxvLGUpLGkmJmkucmVzb2x2ZVdpdGgocixbdCxvLGVdKSxwKG4scixcImFqYXhTdWNjZXNzXCIsW2Usbix0XSksdyhvLGUsbil9ZnVuY3Rpb24geSh0LGUsbixpLHIpe3ZhciBvPWkuY29udGV4dDtpLmVycm9yLmNhbGwobyxuLGUsdCksciYmci5yZWplY3RXaXRoKG8sW24sZSx0XSkscChpLG8sXCJhamF4RXJyb3JcIixbbixpLHR8fGVdKSx3KGUsbixpKX1mdW5jdGlvbiB3KHQsZSxuKXt2YXIgaT1uLmNvbnRleHQ7bi5jb21wbGV0ZS5jYWxsKGksZSx0KSxwKG4saSxcImFqYXhDb21wbGV0ZVwiLFtlLG5dKSxtKG4pfWZ1bmN0aW9uIHgoKXt9ZnVuY3Rpb24gYih0KXtyZXR1cm4gdCYmKHQ9dC5zcGxpdChcIjtcIiwyKVswXSksdCYmKHQ9PWY/XCJodG1sXCI6dD09dT9cImpzb25cIjpzLnRlc3QodCk/XCJzY3JpcHRcIjphLnRlc3QodCkmJlwieG1sXCIpfHxcInRleHRcIn1mdW5jdGlvbiBFKHQsZSl7cmV0dXJuXCJcIj09ZT90Oih0K1wiJlwiK2UpLnJlcGxhY2UoL1smP117MSwyfS8sXCI/XCIpfWZ1bmN0aW9uIFQoZSl7ZS5wcm9jZXNzRGF0YSYmZS5kYXRhJiZcInN0cmluZ1wiIT10LnR5cGUoZS5kYXRhKSYmKGUuZGF0YT10LnBhcmFtKGUuZGF0YSxlLnRyYWRpdGlvbmFsKSksIWUuZGF0YXx8ZS50eXBlJiZcIkdFVFwiIT1lLnR5cGUudG9VcHBlckNhc2UoKXx8KGUudXJsPUUoZS51cmwsZS5kYXRhKSxlLmRhdGE9dm9pZCAwKX1mdW5jdGlvbiBqKGUsbixpLHIpe3JldHVybiB0LmlzRnVuY3Rpb24obikmJihyPWksaT1uLG49dm9pZCAwKSx0LmlzRnVuY3Rpb24oaSl8fChyPWksaT12b2lkIDApLHt1cmw6ZSxkYXRhOm4sc3VjY2VzczppLGRhdGFUeXBlOnJ9fWZ1bmN0aW9uIEMoZSxuLGkscil7dmFyIG8scz10LmlzQXJyYXkobiksYT10LmlzUGxhaW5PYmplY3Qobik7dC5lYWNoKG4sZnVuY3Rpb24obix1KXtvPXQudHlwZSh1KSxyJiYobj1pP3I6citcIltcIisoYXx8XCJvYmplY3RcIj09b3x8XCJhcnJheVwiPT1vP246XCJcIikrXCJdXCIpLCFyJiZzP2UuYWRkKHUubmFtZSx1LnZhbHVlKTpcImFycmF5XCI9PW98fCFpJiZcIm9iamVjdFwiPT1vP0MoZSx1LGksbik6ZS5hZGQobix1KX0pfXZhciBpLHIsZT0wLG49d2luZG93LmRvY3VtZW50LG89LzxzY3JpcHRcXGJbXjxdKig/Oig/ITxcXC9zY3JpcHQ+KTxbXjxdKikqPFxcL3NjcmlwdD4vZ2kscz0vXig/OnRleHR8YXBwbGljYXRpb24pXFwvamF2YXNjcmlwdC9pLGE9L14oPzp0ZXh0fGFwcGxpY2F0aW9uKVxcL3htbC9pLHU9XCJhcHBsaWNhdGlvbi9qc29uXCIsZj1cInRleHQvaHRtbFwiLGM9L15cXHMqJC8sbD1uLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO2wuaHJlZj13aW5kb3cubG9jYXRpb24uaHJlZix0LmFjdGl2ZT0wLHQuYWpheEpTT05QPWZ1bmN0aW9uKGkscil7aWYoIShcInR5cGVcImluIGkpKXJldHVybiB0LmFqYXgoaSk7dmFyIGYsaCxvPWkuanNvbnBDYWxsYmFjayxzPSh0LmlzRnVuY3Rpb24obyk/bygpOm8pfHxcImpzb25wXCIrICsrZSxhPW4uY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSx1PXdpbmRvd1tzXSxjPWZ1bmN0aW9uKGUpe3QoYSkudHJpZ2dlckhhbmRsZXIoXCJlcnJvclwiLGV8fFwiYWJvcnRcIil9LGw9e2Fib3J0OmN9O3JldHVybiByJiZyLnByb21pc2UobCksdChhKS5vbihcImxvYWQgZXJyb3JcIixmdW5jdGlvbihlLG4pe2NsZWFyVGltZW91dChoKSx0KGEpLm9mZigpLnJlbW92ZSgpLFwiZXJyb3JcIiE9ZS50eXBlJiZmP3YoZlswXSxsLGkscik6eShudWxsLG58fFwiZXJyb3JcIixsLGksciksd2luZG93W3NdPXUsZiYmdC5pc0Z1bmN0aW9uKHUpJiZ1KGZbMF0pLHU9Zj12b2lkIDB9KSxnKGwsaSk9PT0hMT8oYyhcImFib3J0XCIpLGwpOih3aW5kb3dbc109ZnVuY3Rpb24oKXtmPWFyZ3VtZW50c30sYS5zcmM9aS51cmwucmVwbGFjZSgvXFw/KC4rKT1cXD8vLFwiPyQxPVwiK3MpLG4uaGVhZC5hcHBlbmRDaGlsZChhKSxpLnRpbWVvdXQ+MCYmKGg9c2V0VGltZW91dChmdW5jdGlvbigpe2MoXCJ0aW1lb3V0XCIpfSxpLnRpbWVvdXQpKSxsKX0sdC5hamF4U2V0dGluZ3M9e3R5cGU6XCJHRVRcIixiZWZvcmVTZW5kOngsc3VjY2Vzczp4LGVycm9yOngsY29tcGxldGU6eCxjb250ZXh0Om51bGwsZ2xvYmFsOiEwLHhocjpmdW5jdGlvbigpe3JldHVybiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0fSxhY2NlcHRzOntzY3JpcHQ6XCJ0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL3gtamF2YXNjcmlwdFwiLGpzb246dSx4bWw6XCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsaHRtbDpmLHRleHQ6XCJ0ZXh0L3BsYWluXCJ9LGNyb3NzRG9tYWluOiExLHRpbWVvdXQ6MCxwcm9jZXNzRGF0YTohMCxjYWNoZTohMH0sdC5hamF4PWZ1bmN0aW9uKGUpe3ZhciBhLHUsbz10LmV4dGVuZCh7fSxlfHx7fSkscz10LkRlZmVycmVkJiZ0LkRlZmVycmVkKCk7Zm9yKGkgaW4gdC5hamF4U2V0dGluZ3Mpdm9pZCAwPT09b1tpXSYmKG9baV09dC5hamF4U2V0dGluZ3NbaV0pO2Qobyksby5jcm9zc0RvbWFpbnx8KGE9bi5jcmVhdGVFbGVtZW50KFwiYVwiKSxhLmhyZWY9by51cmwsYS5ocmVmPWEuaHJlZixvLmNyb3NzRG9tYWluPWwucHJvdG9jb2wrXCIvL1wiK2wuaG9zdCE9YS5wcm90b2NvbCtcIi8vXCIrYS5ob3N0KSxvLnVybHx8KG8udXJsPXdpbmRvdy5sb2NhdGlvbi50b1N0cmluZygpKSwodT1vLnVybC5pbmRleE9mKFwiI1wiKSk+LTEmJihvLnVybD1vLnVybC5zbGljZSgwLHUpKSxUKG8pO3ZhciBmPW8uZGF0YVR5cGUsaD0vXFw/Lis9XFw/Ly50ZXN0KG8udXJsKTtpZihoJiYoZj1cImpzb25wXCIpLG8uY2FjaGUhPT0hMSYmKGUmJmUuY2FjaGU9PT0hMHx8XCJzY3JpcHRcIiE9ZiYmXCJqc29ucFwiIT1mKXx8KG8udXJsPUUoby51cmwsXCJfPVwiK0RhdGUubm93KCkpKSxcImpzb25wXCI9PWYpcmV0dXJuIGh8fChvLnVybD1FKG8udXJsLG8uanNvbnA/by5qc29ucCtcIj0/XCI6by5qc29ucD09PSExP1wiXCI6XCJjYWxsYmFjaz0/XCIpKSx0LmFqYXhKU09OUChvLHMpO3ZhciBOLHA9by5hY2NlcHRzW2ZdLG09e30sdz1mdW5jdGlvbih0LGUpe21bdC50b0xvd2VyQ2FzZSgpXT1bdCxlXX0saj0vXihbXFx3LV0rOilcXC9cXC8vLnRlc3Qoby51cmwpP1JlZ0V4cC4kMTp3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wsUz1vLnhocigpLEM9Uy5zZXRSZXF1ZXN0SGVhZGVyO2lmKHMmJnMucHJvbWlzZShTKSxvLmNyb3NzRG9tYWlufHx3KFwiWC1SZXF1ZXN0ZWQtV2l0aFwiLFwiWE1MSHR0cFJlcXVlc3RcIiksdyhcIkFjY2VwdFwiLHB8fFwiKi8qXCIpLChwPW8ubWltZVR5cGV8fHApJiYocC5pbmRleE9mKFwiLFwiKT4tMSYmKHA9cC5zcGxpdChcIixcIiwyKVswXSksUy5vdmVycmlkZU1pbWVUeXBlJiZTLm92ZXJyaWRlTWltZVR5cGUocCkpLChvLmNvbnRlbnRUeXBlfHxvLmNvbnRlbnRUeXBlIT09ITEmJm8uZGF0YSYmXCJHRVRcIiE9by50eXBlLnRvVXBwZXJDYXNlKCkpJiZ3KFwiQ29udGVudC1UeXBlXCIsby5jb250ZW50VHlwZXx8XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIiksby5oZWFkZXJzKWZvcihyIGluIG8uaGVhZGVycyl3KHIsby5oZWFkZXJzW3JdKTtpZihTLnNldFJlcXVlc3RIZWFkZXI9dyxTLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2lmKDQ9PVMucmVhZHlTdGF0ZSl7Uy5vbnJlYWR5c3RhdGVjaGFuZ2U9eCxjbGVhclRpbWVvdXQoTik7dmFyIGUsbj0hMTtpZihTLnN0YXR1cz49MjAwJiZTLnN0YXR1czwzMDB8fDMwND09Uy5zdGF0dXN8fDA9PVMuc3RhdHVzJiZcImZpbGU6XCI9PWope2Y9Znx8YihvLm1pbWVUeXBlfHxTLmdldFJlc3BvbnNlSGVhZGVyKFwiY29udGVudC10eXBlXCIpKSxlPVMucmVzcG9uc2VUZXh0O3RyeXtcInNjcmlwdFwiPT1mPygxLGV2YWwpKGUpOlwieG1sXCI9PWY/ZT1TLnJlc3BvbnNlWE1MOlwianNvblwiPT1mJiYoZT1jLnRlc3QoZSk/bnVsbDp0LnBhcnNlSlNPTihlKSl9Y2F0Y2goaSl7bj1pfW4/eShuLFwicGFyc2VyZXJyb3JcIixTLG8scyk6dihlLFMsbyxzKX1lbHNlIHkoUy5zdGF0dXNUZXh0fHxudWxsLFMuc3RhdHVzP1wiZXJyb3JcIjpcImFib3J0XCIsUyxvLHMpfX0sZyhTLG8pPT09ITEpcmV0dXJuIFMuYWJvcnQoKSx5KG51bGwsXCJhYm9ydFwiLFMsbyxzKSxTO2lmKG8ueGhyRmllbGRzKWZvcihyIGluIG8ueGhyRmllbGRzKVNbcl09by54aHJGaWVsZHNbcl07dmFyIFA9XCJhc3luY1wiaW4gbz9vLmFzeW5jOiEwO1Mub3BlbihvLnR5cGUsby51cmwsUCxvLnVzZXJuYW1lLG8ucGFzc3dvcmQpO2ZvcihyIGluIG0pQy5hcHBseShTLG1bcl0pO3JldHVybiBvLnRpbWVvdXQ+MCYmKE49c2V0VGltZW91dChmdW5jdGlvbigpe1Mub25yZWFkeXN0YXRlY2hhbmdlPXgsUy5hYm9ydCgpLHkobnVsbCxcInRpbWVvdXRcIixTLG8scyl9LG8udGltZW91dCkpLFMuc2VuZChvLmRhdGE/by5kYXRhOm51bGwpLFN9LHQuZ2V0PWZ1bmN0aW9uKCl7cmV0dXJuIHQuYWpheChqLmFwcGx5KG51bGwsYXJndW1lbnRzKSl9LHQucG9zdD1mdW5jdGlvbigpe3ZhciBlPWouYXBwbHkobnVsbCxhcmd1bWVudHMpO3JldHVybiBlLnR5cGU9XCJQT1NUXCIsdC5hamF4KGUpfSx0LmdldEpTT049ZnVuY3Rpb24oKXt2YXIgZT1qLmFwcGx5KG51bGwsYXJndW1lbnRzKTtyZXR1cm4gZS5kYXRhVHlwZT1cImpzb25cIix0LmFqYXgoZSl9LHQuZm4ubG9hZD1mdW5jdGlvbihlLG4saSl7aWYoIXRoaXMubGVuZ3RoKXJldHVybiB0aGlzO3ZhciBhLHI9dGhpcyxzPWUuc3BsaXQoL1xccy8pLHU9aihlLG4saSksZj11LnN1Y2Nlc3M7cmV0dXJuIHMubGVuZ3RoPjEmJih1LnVybD1zWzBdLGE9c1sxXSksdS5zdWNjZXNzPWZ1bmN0aW9uKGUpe3IuaHRtbChhP3QoXCI8ZGl2PlwiKS5odG1sKGUucmVwbGFjZShvLFwiXCIpKS5maW5kKGEpOmUpLGYmJmYuYXBwbHkocixhcmd1bWVudHMpfSx0LmFqYXgodSksdGhpc307dmFyIFM9ZW5jb2RlVVJJQ29tcG9uZW50O3QucGFyYW09ZnVuY3Rpb24oZSxuKXt2YXIgaT1bXTtyZXR1cm4gaS5hZGQ9ZnVuY3Rpb24oZSxuKXt0LmlzRnVuY3Rpb24obikmJihuPW4oKSksbnVsbD09biYmKG49XCJcIiksdGhpcy5wdXNoKFMoZSkrXCI9XCIrUyhuKSl9LEMoaSxlLG4pLGkuam9pbihcIiZcIikucmVwbGFjZSgvJTIwL2csXCIrXCIpfX0oWmVwdG8pLGZ1bmN0aW9uKHQpe3QuQ2FsbGJhY2tzPWZ1bmN0aW9uKGUpe2U9dC5leHRlbmQoe30sZSk7dmFyIG4saSxyLG8scyxhLHU9W10sZj0hZS5vbmNlJiZbXSxjPWZ1bmN0aW9uKHQpe2ZvcihuPWUubWVtb3J5JiZ0LGk9ITAsYT1vfHwwLG89MCxzPXUubGVuZ3RoLHI9ITA7dSYmcz5hOysrYSlpZih1W2FdLmFwcGx5KHRbMF0sdFsxXSk9PT0hMSYmZS5zdG9wT25GYWxzZSl7bj0hMTticmVha31yPSExLHUmJihmP2YubGVuZ3RoJiZjKGYuc2hpZnQoKSk6bj91Lmxlbmd0aD0wOmwuZGlzYWJsZSgpKX0sbD17YWRkOmZ1bmN0aW9uKCl7aWYodSl7dmFyIGk9dS5sZW5ndGgsYT1mdW5jdGlvbihuKXt0LmVhY2gobixmdW5jdGlvbih0LG4pe1wiZnVuY3Rpb25cIj09dHlwZW9mIG4/ZS51bmlxdWUmJmwuaGFzKG4pfHx1LnB1c2gobik6biYmbi5sZW5ndGgmJlwic3RyaW5nXCIhPXR5cGVvZiBuJiZhKG4pfSl9O2EoYXJndW1lbnRzKSxyP3M9dS5sZW5ndGg6biYmKG89aSxjKG4pKX1yZXR1cm4gdGhpc30scmVtb3ZlOmZ1bmN0aW9uKCl7cmV0dXJuIHUmJnQuZWFjaChhcmd1bWVudHMsZnVuY3Rpb24oZSxuKXtmb3IodmFyIGk7KGk9dC5pbkFycmF5KG4sdSxpKSk+LTE7KXUuc3BsaWNlKGksMSksciYmKHM+PWkmJi0tcyxhPj1pJiYtLWEpfSksdGhpc30saGFzOmZ1bmN0aW9uKGUpe3JldHVybiEoIXV8fCEoZT90LmluQXJyYXkoZSx1KT4tMTp1Lmxlbmd0aCkpfSxlbXB0eTpmdW5jdGlvbigpe3JldHVybiBzPXUubGVuZ3RoPTAsdGhpc30sZGlzYWJsZTpmdW5jdGlvbigpe3JldHVybiB1PWY9bj12b2lkIDAsdGhpc30sZGlzYWJsZWQ6ZnVuY3Rpb24oKXtyZXR1cm4hdX0sbG9jazpmdW5jdGlvbigpe3JldHVybiBmPXZvaWQgMCxufHxsLmRpc2FibGUoKSx0aGlzfSxsb2NrZWQ6ZnVuY3Rpb24oKXtyZXR1cm4hZn0sZmlyZVdpdGg6ZnVuY3Rpb24odCxlKXtyZXR1cm4hdXx8aSYmIWZ8fChlPWV8fFtdLGU9W3QsZS5zbGljZT9lLnNsaWNlKCk6ZV0scj9mLnB1c2goZSk6YyhlKSksdGhpc30sZmlyZTpmdW5jdGlvbigpe3JldHVybiBsLmZpcmVXaXRoKHRoaXMsYXJndW1lbnRzKX0sZmlyZWQ6ZnVuY3Rpb24oKXtyZXR1cm4hIWl9fTtyZXR1cm4gbH19KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiBuKGUpe3ZhciBpPVtbXCJyZXNvbHZlXCIsXCJkb25lXCIsdC5DYWxsYmFja3Moe29uY2U6MSxtZW1vcnk6MX0pLFwicmVzb2x2ZWRcIl0sW1wicmVqZWN0XCIsXCJmYWlsXCIsdC5DYWxsYmFja3Moe29uY2U6MSxtZW1vcnk6MX0pLFwicmVqZWN0ZWRcIl0sW1wibm90aWZ5XCIsXCJwcm9ncmVzc1wiLHQuQ2FsbGJhY2tzKHttZW1vcnk6MX0pXV0scj1cInBlbmRpbmdcIixvPXtzdGF0ZTpmdW5jdGlvbigpe3JldHVybiByfSxhbHdheXM6ZnVuY3Rpb24oKXtyZXR1cm4gcy5kb25lKGFyZ3VtZW50cykuZmFpbChhcmd1bWVudHMpLHRoaXN9LHRoZW46ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHM7cmV0dXJuIG4oZnVuY3Rpb24obil7dC5lYWNoKGksZnVuY3Rpb24oaSxyKXt2YXIgYT10LmlzRnVuY3Rpb24oZVtpXSkmJmVbaV07c1tyWzFdXShmdW5jdGlvbigpe3ZhciBlPWEmJmEuYXBwbHkodGhpcyxhcmd1bWVudHMpO2lmKGUmJnQuaXNGdW5jdGlvbihlLnByb21pc2UpKWUucHJvbWlzZSgpLmRvbmUobi5yZXNvbHZlKS5mYWlsKG4ucmVqZWN0KS5wcm9ncmVzcyhuLm5vdGlmeSk7ZWxzZXt2YXIgaT10aGlzPT09bz9uLnByb21pc2UoKTp0aGlzLHM9YT9bZV06YXJndW1lbnRzO25bclswXStcIldpdGhcIl0oaSxzKX19KX0pLGU9bnVsbH0pLnByb21pc2UoKX0scHJvbWlzZTpmdW5jdGlvbihlKXtyZXR1cm4gbnVsbCE9ZT90LmV4dGVuZChlLG8pOm99fSxzPXt9O3JldHVybiB0LmVhY2goaSxmdW5jdGlvbih0LGUpe3ZhciBuPWVbMl0sYT1lWzNdO29bZVsxXV09bi5hZGQsYSYmbi5hZGQoZnVuY3Rpb24oKXtyPWF9LGlbMV50XVsyXS5kaXNhYmxlLGlbMl1bMl0ubG9jayksc1tlWzBdXT1mdW5jdGlvbigpe3JldHVybiBzW2VbMF0rXCJXaXRoXCJdKHRoaXM9PT1zP286dGhpcyxhcmd1bWVudHMpLHRoaXN9LHNbZVswXStcIldpdGhcIl09bi5maXJlV2l0aH0pLG8ucHJvbWlzZShzKSxlJiZlLmNhbGwocyxzKSxzfXZhciBlPUFycmF5LnByb3RvdHlwZS5zbGljZTt0LndoZW49ZnVuY3Rpb24oaSl7dmFyIGYsYyxsLHI9ZS5jYWxsKGFyZ3VtZW50cyksbz1yLmxlbmd0aCxzPTAsYT0xIT09b3x8aSYmdC5pc0Z1bmN0aW9uKGkucHJvbWlzZSk/bzowLHU9MT09PWE/aTpuKCksaD1mdW5jdGlvbih0LG4saSl7cmV0dXJuIGZ1bmN0aW9uKHIpe25bdF09dGhpcyxpW3RdPWFyZ3VtZW50cy5sZW5ndGg+MT9lLmNhbGwoYXJndW1lbnRzKTpyLGk9PT1mP3Uubm90aWZ5V2l0aChuLGkpOi0tYXx8dS5yZXNvbHZlV2l0aChuLGkpfX07aWYobz4xKWZvcihmPW5ldyBBcnJheShvKSxjPW5ldyBBcnJheShvKSxsPW5ldyBBcnJheShvKTtvPnM7KytzKXJbc10mJnQuaXNGdW5jdGlvbihyW3NdLnByb21pc2UpP3Jbc10ucHJvbWlzZSgpLmRvbmUoaChzLGwscikpLmZhaWwodS5yZWplY3QpLnByb2dyZXNzKGgocyxjLGYpKTotLWE7cmV0dXJuIGF8fHUucmVzb2x2ZVdpdGgobCxyKSx1LnByb21pc2UoKX0sdC5EZWZlcnJlZD1ufShaZXB0byksZnVuY3Rpb24odCl7ZnVuY3Rpb24gdSh0LGUsbixpKXtyZXR1cm4gTWF0aC5hYnModC1lKT49TWF0aC5hYnMobi1pKT90LWU+MD9cIkxlZnRcIjpcIlJpZ2h0XCI6bi1pPjA/XCJVcFwiOlwiRG93blwifWZ1bmN0aW9uIGYoKXtvPW51bGwsZS5sYXN0JiYoZS5lbC50cmlnZ2VyKFwibG9uZ1RhcFwiKSxlPXt9KX1mdW5jdGlvbiBjKCl7byYmY2xlYXJUaW1lb3V0KG8pLG89bnVsbH1mdW5jdGlvbiBsKCl7biYmY2xlYXJUaW1lb3V0KG4pLGkmJmNsZWFyVGltZW91dChpKSxyJiZjbGVhclRpbWVvdXQociksbyYmY2xlYXJUaW1lb3V0KG8pLG49aT1yPW89bnVsbCxlPXt9fWZ1bmN0aW9uIGgodCl7cmV0dXJuKFwidG91Y2hcIj09dC5wb2ludGVyVHlwZXx8dC5wb2ludGVyVHlwZT09dC5NU1BPSU5URVJfVFlQRV9UT1VDSCkmJnQuaXNQcmltYXJ5fWZ1bmN0aW9uIHAodCxlKXtyZXR1cm4gdC50eXBlPT1cInBvaW50ZXJcIitlfHx0LnR5cGUudG9Mb3dlckNhc2UoKT09XCJtc3BvaW50ZXJcIitlfXZhciBuLGkscixvLGEsZT17fSxzPTc1MDt0KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe3ZhciBkLG0seSx3LGc9MCx2PTA7XCJNU0dlc3R1cmVcImluIHdpbmRvdyYmKGE9bmV3IE1TR2VzdHVyZSxhLnRhcmdldD1kb2N1bWVudC5ib2R5KSx0KGRvY3VtZW50KS5iaW5kKFwiTVNHZXN0dXJlRW5kXCIsZnVuY3Rpb24odCl7dmFyIG49dC52ZWxvY2l0eVg+MT9cIlJpZ2h0XCI6dC52ZWxvY2l0eVg8LTE/XCJMZWZ0XCI6dC52ZWxvY2l0eVk+MT9cIkRvd25cIjp0LnZlbG9jaXR5WTwtMT9cIlVwXCI6bnVsbDtuJiYoZS5lbC50cmlnZ2VyKFwic3dpcGVcIiksZS5lbC50cmlnZ2VyKFwic3dpcGVcIituKSl9KS5vbihcInRvdWNoc3RhcnQgTVNQb2ludGVyRG93biBwb2ludGVyZG93blwiLGZ1bmN0aW9uKGkpeyghKHc9cChpLFwiZG93blwiKSl8fGgoaSkpJiYoeT13P2k6aS50b3VjaGVzWzBdLGkudG91Y2hlcyYmMT09PWkudG91Y2hlcy5sZW5ndGgmJmUueDImJihlLngyPXZvaWQgMCxlLnkyPXZvaWQgMCksZD1EYXRlLm5vdygpLG09ZC0oZS5sYXN0fHxkKSxlLmVsPXQoXCJ0YWdOYW1lXCJpbiB5LnRhcmdldD95LnRhcmdldDp5LnRhcmdldC5wYXJlbnROb2RlKSxuJiZjbGVhclRpbWVvdXQobiksZS54MT15LnBhZ2VYLGUueTE9eS5wYWdlWSxtPjAmJjI1MD49bSYmKGUuaXNEb3VibGVUYXA9ITApLGUubGFzdD1kLG89c2V0VGltZW91dChmLHMpLGEmJncmJmEuYWRkUG9pbnRlcihpLnBvaW50ZXJJZCkpfSkub24oXCJ0b3VjaG1vdmUgTVNQb2ludGVyTW92ZSBwb2ludGVybW92ZVwiLGZ1bmN0aW9uKHQpeyghKHc9cCh0LFwibW92ZVwiKSl8fGgodCkpJiYoeT13P3Q6dC50b3VjaGVzWzBdLGMoKSxlLngyPXkucGFnZVgsZS55Mj15LnBhZ2VZLGcrPU1hdGguYWJzKGUueDEtZS54Miksdis9TWF0aC5hYnMoZS55MS1lLnkyKSl9KS5vbihcInRvdWNoZW5kIE1TUG9pbnRlclVwIHBvaW50ZXJ1cFwiLGZ1bmN0aW9uKG8peyghKHc9cChvLFwidXBcIikpfHxoKG8pKSYmKGMoKSxlLngyJiZNYXRoLmFicyhlLngxLWUueDIpPjMwfHxlLnkyJiZNYXRoLmFicyhlLnkxLWUueTIpPjMwP3I9c2V0VGltZW91dChmdW5jdGlvbigpe2UuZWwudHJpZ2dlcihcInN3aXBlXCIpLGUuZWwudHJpZ2dlcihcInN3aXBlXCIrdShlLngxLGUueDIsZS55MSxlLnkyKSksZT17fX0sMCk6XCJsYXN0XCJpbiBlJiYoMzA+ZyYmMzA+dj9pPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt2YXIgaT10LkV2ZW50KFwidGFwXCIpO2kuY2FuY2VsVG91Y2g9bCxlLmVsLnRyaWdnZXIoaSksZS5pc0RvdWJsZVRhcD8oZS5lbCYmZS5lbC50cmlnZ2VyKFwiZG91YmxlVGFwXCIpLGU9e30pOm49c2V0VGltZW91dChmdW5jdGlvbigpe249bnVsbCxlLmVsJiZlLmVsLnRyaWdnZXIoXCJzaW5nbGVUYXBcIiksZT17fX0sMjUwKX0sMCk6ZT17fSksZz12PTApfSkub24oXCJ0b3VjaGNhbmNlbCBNU1BvaW50ZXJDYW5jZWwgcG9pbnRlcmNhbmNlbFwiLGwpLHQod2luZG93KS5vbihcInNjcm9sbFwiLGwpfSksW1wic3dpcGVcIixcInN3aXBlTGVmdFwiLFwic3dpcGVSaWdodFwiLFwic3dpcGVVcFwiLFwic3dpcGVEb3duXCIsXCJkb3VibGVUYXBcIixcInRhcFwiLFwic2luZ2xlVGFwXCIsXCJsb25nVGFwXCJdLmZvckVhY2goZnVuY3Rpb24oZSl7dC5mbltlXT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5vbihlLHQpfX0pfShaZXB0byksZnVuY3Rpb24odCl7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZT10KGUpLCEoIWUud2lkdGgoKSYmIWUuaGVpZ2h0KCkpJiZcIm5vbmVcIiE9PWUuY3NzKFwiZGlzcGxheVwiKX1mdW5jdGlvbiBmKHQsZSl7dD10LnJlcGxhY2UoLz0jXFxdL2csJz1cIiNcIl0nKTt2YXIgbixpLHI9cy5leGVjKHQpO2lmKHImJnJbMl1pbiBvJiYobj1vW3JbMl1dLGk9clszXSx0PXJbMV0saSkpe3ZhciBhPU51bWJlcihpKTtpPWlzTmFOKGEpP2kucmVwbGFjZSgvXltcIiddfFtcIiddJC9nLFwiXCIpOmF9cmV0dXJuIGUodCxuLGkpfXZhciBlPXQuemVwdG8sbj1lLnFzYSxpPWUubWF0Y2hlcyxvPXQuZXhwcltcIjpcIl09e3Zpc2libGU6ZnVuY3Rpb24oKXtyZXR1cm4gcih0aGlzKT90aGlzOnZvaWQgMH0saGlkZGVuOmZ1bmN0aW9uKCl7cmV0dXJuIHIodGhpcyk/dm9pZCAwOnRoaXN9LHNlbGVjdGVkOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2VsZWN0ZWQ/dGhpczp2b2lkIDB9LGNoZWNrZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGVja2VkP3RoaXM6dm9pZCAwfSxwYXJlbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wYXJlbnROb2RlfSxmaXJzdDpmdW5jdGlvbih0KXtyZXR1cm4gMD09PXQ/dGhpczp2b2lkIDB9LGxhc3Q6ZnVuY3Rpb24odCxlKXtyZXR1cm4gdD09PWUubGVuZ3RoLTE/dGhpczp2b2lkIDB9LGVxOmZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdD09PW4/dGhpczp2b2lkIDB9LGNvbnRhaW5zOmZ1bmN0aW9uKGUsbixpKXtyZXR1cm4gdCh0aGlzKS50ZXh0KCkuaW5kZXhPZihpKT4tMT90aGlzOnZvaWQgMH0saGFzOmZ1bmN0aW9uKHQsbixpKXtyZXR1cm4gZS5xc2EodGhpcyxpKS5sZW5ndGg/dGhpczp2b2lkIDB9fSxzPW5ldyBSZWdFeHAoXCIoLiopOihcXFxcdyspKD86XFxcXCgoW14pXSspXFxcXCkpPyRcXFxccypcIiksYT0vXlxccyo+Lyx1PVwiWmVwdG9cIisgK25ldyBEYXRlO2UucXNhPWZ1bmN0aW9uKGkscil7cmV0dXJuIGYocixmdW5jdGlvbihvLHMsZil7dHJ5e3ZhciBjOyFvJiZzP289XCIqXCI6YS50ZXN0KG8pJiYoYz10KGkpLmFkZENsYXNzKHUpLG89XCIuXCIrdStcIiBcIitvKTt2YXIgbD1uKGksbyl9Y2F0Y2goaCl7dGhyb3cgY29uc29sZS5lcnJvcihcImVycm9yIHBlcmZvcm1pbmcgc2VsZWN0b3I6ICVvXCIsciksaH1maW5hbGx5e2MmJmMucmVtb3ZlQ2xhc3ModSl9cmV0dXJuIHM/ZS51bmlxKHQubWFwKGwsZnVuY3Rpb24odCxlKXtyZXR1cm4gcy5jYWxsKHQsZSxsLGYpfSkpOmx9KX0sZS5tYXRjaGVzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGYoZSxmdW5jdGlvbihlLG4scil7cmV0dXJuIShlJiYhaSh0LGUpfHxuJiZuLmNhbGwodCxudWxsLHIpIT09dCl9KX19KFplcHRvKSxmdW5jdGlvbigpe3RyeXtnZXRDb21wdXRlZFN0eWxlKHZvaWQgMCl9Y2F0Y2godCl7dmFyIGU9Z2V0Q29tcHV0ZWRTdHlsZTt3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZT1mdW5jdGlvbih0KXt0cnl7cmV0dXJuIGUodCl9Y2F0Y2gobil7cmV0dXJuIG51bGx9fX19KCk7XG5tb2R1bGUuZXhwb3J0cyA9IFplcHRvO1xuIl19
