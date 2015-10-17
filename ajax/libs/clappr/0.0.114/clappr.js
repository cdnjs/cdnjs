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
window.Clappr.version = "0.0.114";

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

var isNumber = function isNumber(value) {
  return value - parseFloat(value) + 1 >= 0;
};

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
  return window.setTimeout(fn, 1000 / 60);
};

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;

module.exports = {
  extend: extend,
  formatTime: formatTime,
  Fullscreen: Fullscreen,
  Config: Config,
  seekStringToSeconds: seekStringToSeconds,
  uniqueId: uniqueId,
  isNumber: isNumber,
  requestAnimationFrame: requestAnimationFrame,
  cancelAnimationFrame: cancelAnimationFrame
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
var isNumber = require("../../base/utils").isNumber;
var requestAnimationFrame = require("../../base/utils").requestAnimationFrame;
var cancelAnimationFrame = require("../../base/utils").cancelAnimationFrame;

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
        if (!isNumber(options.height) && !isNumber(options.width)) {
          this.el.style.height = "" + options.height;
          this.el.style.width = "" + options.width;
        } else {
          this.el.style.height = "" + options.height + "px";
          this.el.style.width = "" + options.width + "px";
        }
        PlayerInfo.previousSize = PlayerInfo.currentSize;
        PlayerInfo.currentSize = options;
        Mediator.trigger(Events.PLAYER_RESIZE);
      }
    },
    enableResizeObserver: {
      value: function enableResizeObserver() {
        var _this = this;

        var checkSizeCallback = function () {
          if (_this.reqAnimFrame) cancelAnimationFrame(_this.reqAnimFrame);
          if (_this.previousSize.width != _this.$el.width() || _this.previousSize.height != _this.$el.height()) {
            Mediator.trigger(Events.PLAYER_RESIZE);
            _this.previousSize = { width: _this.$el.width(), height: _this.$el.height() };
          }
          _this.reqAnimFrame = requestAnimationFrame(checkSizeCallback);
        };

        this.reqAnimFrame = requestAnimationFrame(checkSizeCallback);
      }
    },
    disableResizeObserver: {
      value: function disableResizeObserver() {
        if (this.reqAnimFrame) cancelAnimationFrame(this.reqAnimFrame);
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
        this.disableResizeObserver();
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

        this.previousSize = { width: this.$el.width(), height: this.$el.height() };

        this.enableResizeObserver();

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
        }var height = this.$el.height();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL21haW4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vhc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vjb3B5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2gua2V5cy9ub2RlX21vZHVsZXMvbG9kYXNoLmlzYXJndW1lbnRzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2FycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc25hdGl2ZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2NyZWF0ZWFzc2lnbmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlYXNzaWduZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmluZGNhbGxiYWNrL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlYXNzaWduZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC5faXNpdGVyYXRlZWNhbGwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWNhbGxiYWNrL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VjYWxsYmFjay9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZmluZC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlY2FsbGJhY2svbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc3R5cGVkYXJyYXkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWZpbmQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kaW5kZXgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm9uY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm9uY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC5iZWZvcmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnJlc3VsdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gucmVzdWx0L25vZGVfbW9kdWxlcy9sb2Rhc2guaXNmdW5jdGlvbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaW5kZXhvZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9jYWNoZWluZGV4b2YvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZXVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlY2FjaGUvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvanN0LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3N0eWxlci5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvYmFzZS91dGlscy5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb250YWluZXIvY29udGFpbmVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lcl9mYWN0b3J5L2NvbnRhaW5lcl9mYWN0b3J5LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lcl9mYWN0b3J5L2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvcmUvY29yZS5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb3JlX2ZhY3RvcnkvY29yZV9mYWN0b3J5LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvcmVfZmFjdG9yeS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9sb2FkZXIvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9tZWRpYV9jb250cm9sL21lZGlhX2NvbnRyb2wuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvcGxheWVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL3NlZWtfdGltZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9zZWVrX3RpbWUvc2Vla190aW1lLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvZmxhc2gvZmxhc2guanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9obHMvaGxzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfYXVkaW8vaHRtbDVfYXVkaW8uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9odG1sNV92aWRlby9odG1sNV92aWRlby5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWxfaW1nL2h0bWxfaW1nLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3Mvbm9fb3AvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9ub19vcC9ub19vcC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9jbGlja190b19wYXVzZS9jbGlja190b19wYXVzZS5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9jbGlja190b19wYXVzZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9kdnJfY29udHJvbHMvZHZyX2NvbnRyb2xzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL2R2cl9jb250cm9scy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9nb29nbGVfYW5hbHl0aWNzL2dvb2dsZV9hbmFseXRpY3MuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvZ29vZ2xlX2FuYWx5dGljcy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9sb2cvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvbG9nL2xvZy5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9wb3N0ZXIvcG9zdGVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3NwaW5uZXJfdGhyZWVfYm91bmNlL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3NwaW5uZXJfdGhyZWVfYm91bmNlL3NwaW5uZXJfdGhyZWVfYm91bmNlLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3N0YXRzL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3N0YXRzL3N0YXRzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3dhdGVybWFyay9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy93YXRlcm1hcmsvd2F0ZXJtYXJrLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL2Jhc2Vfb2JqZWN0LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2Jyb3dzZXIuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvY29udGFpbmVyX3BsdWdpbi5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb250YWluZXIvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvY29yZV9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvY29yZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvYmFzZS9ldmVudHMuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9mbGFzaC9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2hscy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWw1X2F1ZGlvL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfdmlkZW8vaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9odG1sX2ltZy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvYmFzZS9raWJvLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL21lZGlhX2NvbnRyb2wvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvbWVkaWF0b3IuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvcGxheWJhY2suanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvcGxheWVyX2luZm8uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvcG9zdGVyL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3RlbXBsYXRlLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3VpX2NvbnRhaW5lcl9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvdWlfY29yZV9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvdWlfb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NsYXBwci16ZXB0by96ZXB0by5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNJQSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUMzQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtBQUMvQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7O0FBRXJDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBOztBQUVwQixNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQTtBQUN0RSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUE7O0FBRXJDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQTs7O0FDYjlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUMsQ0FBQTtBQUMzRSxVQUFRLElBQUksQ0FBQyxNQUFNO0FBQ2pCLFNBQUssQ0FBQztBQUFFLGFBQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEFBQ3RFLFNBQUssQ0FBQztBQUFFLGFBQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxBQUFDLE9BQU07QUFBQSxBQUMxRSxTQUFLLENBQUM7QUFBRSxhQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEFBQzlFLFNBQUssQ0FBQztBQUFFLGFBQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEFBQ2xGO0FBQVMsYUFBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEdBQy9FO0NBQ0YsQ0FBQTs7QUFFRCxJQUFJ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QUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHO0FBQ3hGLElBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUc7QUFDeE8sS0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLO0NBQ3RJLENBQUM7O0FBRUYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUs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O0FBQ0QsZUFBTyxJQUFJLENBQUE7T0FDWjs7QUFFRCxvQkFBZ0I7YUFBQSw0QkFBRztBQUNqQixZQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDMUMsZUFBTyxJQUFJLENBQUE7T0FDWjs7QUFFRCxrQkFBYzthQUFBLDBCQUFHO0FBQ2YsWUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDWixjQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQTtBQUNsRCxjQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQzFDLGNBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQTtBQUM5RCxjQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzVELGNBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO1NBQzVCLE1BQU07QUFDTCxjQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDM0M7T0FDRjs7OztTQXJFRyxRQUFRO0dBQVMsVUFBVTs7QUF3RWpDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFBOzs7QUNwRnpCO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5ZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGxheWVyJylcbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tZWRpYXRvcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi9iYXNlL2V2ZW50cycpXG5cbndpbmRvdy5ERUJVRyA9IGZhbHNlXG5cbndpbmRvdy5DbGFwcHIgPSB7IFBsYXllcjogUGxheWVyLCBNZWRpYXRvcjogTWVkaWF0b3IsIEV2ZW50czogRXZlbnRzIH1cbndpbmRvdy5DbGFwcHIudmVyc2lvbiA9IFwiX19WRVJTSU9OX19cIlxuXG5tb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5DbGFwcHJcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUFzc2lnbiA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWFzc2lnbicpLFxuICAgIGNyZWF0ZUFzc2lnbmVyID0gcmVxdWlyZSgnbG9kYXNoLl9jcmVhdGVhc3NpZ25lcicpO1xuXG4vKipcbiAqIEFzc2lnbnMgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIHRoZSBkZXN0aW5hdGlvblxuICogb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKiBJZiBgY3VzdG9taXplcmAgaXMgcHJvdmlkZWQgaXQgaXMgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIGZpdmUgYXJndW1lbnRzO1xuICogKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBleHRlbmRcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmFzc2lnbih7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAnYWdlJzogNDAgfSwgeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnZnJlZCcsICdhZ2UnOiA0MCB9XG4gKlxuICogLy8gdXNpbmcgYSBjdXN0b21pemVyIGNhbGxiYWNrXG4gKiB2YXIgZGVmYXVsdHMgPSBfLnBhcnRpYWxSaWdodChfLmFzc2lnbiwgZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gKiAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcgPyBvdGhlciA6IHZhbHVlO1xuICogfSk7XG4gKlxuICogZGVmYXVsdHMoeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDM2IH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9XG4gKi9cbnZhciBhc3NpZ24gPSBjcmVhdGVBc3NpZ25lcihiYXNlQXNzaWduKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMiAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VDb3B5ID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlY29weScpLFxuICAgIGtleXMgPSByZXF1aXJlKCdsb2Rhc2gua2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmFzc2lnbmAgd2l0aG91dCBzdXBwb3J0IGZvciBhcmd1bWVudCBqdWdnbGluZyxcbiAqIG11bHRpcGxlIHNvdXJjZXMsIGFuZCBgdGhpc2AgYmluZGluZyBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduaW5nIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnbihvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplcikge1xuICB2YXIgcHJvcHMgPSBrZXlzKHNvdXJjZSk7XG4gIGlmICghY3VzdG9taXplcikge1xuICAgIHJldHVybiBiYXNlQ29weShzb3VyY2UsIG9iamVjdCwgcHJvcHMpO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XSxcbiAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplcih2YWx1ZSwgc291cmNlW2tleV0sIGtleSwgb2JqZWN0LCBzb3VyY2UpO1xuXG4gICAgaWYgKChyZXN1bHQgPT09IHJlc3VsdCA/IChyZXN1bHQgIT09IHZhbHVlKSA6ICh2YWx1ZSA9PT0gdmFsdWUpKSB8fFxuICAgICAgICAodHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHJlc3VsdDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQXNzaWduO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBDb3BpZXMgdGhlIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBjb3B5LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNvcHkoc291cmNlLCBvYmplY3QsIHByb3BzKSB7XG4gIGlmICghcHJvcHMpIHtcbiAgICBwcm9wcyA9IG9iamVjdDtcbiAgICBvYmplY3QgPSB7fTtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgb2JqZWN0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDb3B5O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjQgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpLFxuICAgIGlzTmF0aXZlID0gcmVxdWlyZSgnbG9kYXNoLmlzbmF0aXZlJyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IGlzTmF0aXZlKG5hdGl2ZUtleXMgPSBPYmplY3Qua2V5cykgJiYgbmF0aXZlS2V5cztcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIEFuIG9iamVjdCBlbnZpcm9ubWVudCBmZWF0dXJlIGZsYWdzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAdHlwZSBPYmplY3RcbiAqL1xudmFyIHN1cHBvcnQgPSB7fTtcblxuKGZ1bmN0aW9uKHgpIHtcblxuICAvKipcbiAgICogRGV0ZWN0IGlmIGBhcmd1bWVudHNgIG9iamVjdCBpbmRleGVzIGFyZSBub24tZW51bWVyYWJsZS5cbiAgICpcbiAgICogSW4gRmlyZWZveCA8IDQsIElFIDwgOSwgUGhhbnRvbUpTLCBhbmQgU2FmYXJpIDwgNS4xIGBhcmd1bWVudHNgIG9iamVjdFxuICAgKiBpbmRleGVzIGFyZSBub24tZW51bWVyYWJsZS4gQ2hyb21lIDwgMjUgYW5kIE5vZGUuanMgPCAwLjExLjAgdHJlYXRcbiAgICogYGFyZ3VtZW50c2Agb2JqZWN0IGluZGV4ZXMgYXMgbm9uLWVudW1lcmFibGUgYW5kIGZhaWwgYGhhc093blByb3BlcnR5YFxuICAgKiBjaGVja3MgZm9yIGluZGV4ZXMgdGhhdCBleGNlZWQgdGhlaXIgZnVuY3Rpb24ncyBmb3JtYWwgcGFyYW1ldGVycyB3aXRoXG4gICAqIGFzc29jaWF0ZWQgdmFsdWVzIG9mIGAwYC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8uc3VwcG9ydFxuICAgKiBAdHlwZSBib29sZWFuXG4gICAqL1xuICB0cnkge1xuICAgIHN1cHBvcnQubm9uRW51bUFyZ3MgPSAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChhcmd1bWVudHMsIDEpO1xuICB9IGNhdGNoKGUpIHtcbiAgICBzdXBwb3J0Lm5vbkVudW1BcmdzID0gdHJ1ZTtcbiAgfVxufSgwLCAwKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gK3ZhbHVlO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gRVMgYFRvTGVuZ3RoYC4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQSBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbiBvZiBgT2JqZWN0LmtleXNgIHdoaWNoIGNyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlXG4gKiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBzaGltS2V5cyhvYmplY3QpIHtcbiAgdmFyIHByb3BzID0ga2V5c0luKG9iamVjdCksXG4gICAgICBwcm9wc0xlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IHByb3BzTGVuZ3RoICYmIG9iamVjdC5sZW5ndGg7XG5cbiAgdmFyIGFsbG93SW5kZXhlcyA9IGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCAoc3VwcG9ydC5ub25FbnVtQXJncyAmJiBpc0FyZ3VtZW50cyhvYmplY3QpKSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IHByb3BzTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAoKGFsbG93SW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgfHwgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIGxhbmd1YWdlIHR5cGUgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiAqKk5vdGU6KiogU2VlIHRoZSBbRVM1IHNwZWNdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAodmFsdWUgJiYgdHlwZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbnZhciBrZXlzID0gIW5hdGl2ZUtleXMgPyBzaGltS2V5cyA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICBpZiAob2JqZWN0KSB7XG4gICAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIH1cbiAgaWYgKCh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QpIHx8XG4gICAgICAodHlwZW9mIG9iamVjdCAhPSAnZnVuY3Rpb24nICYmIChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSkpKSB7XG4gICAgcmV0dXJuIHNoaW1LZXlzKG9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0KG9iamVjdCkgPyBuYXRpdmVLZXlzKG9iamVjdCkgOiBbXTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgbGVuZ3RoID0gKGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCAoc3VwcG9ydC5ub25FbnVtQXJncyAmJiBpc0FyZ3VtZW50cyhvYmplY3QpKSkgJiYgbGVuZ3RoKSB8fCAwO1xuXG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGlzUHJvdG8gPSB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBsZW5ndGggPiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IChpbmRleCArICcnKTtcbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoc2tpcEluZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpICYmXG4gICAgICAgICEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5cztcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiAoZnVuY3Rpb24oKSB7IHJldHVybiBfLmlzQXJndW1lbnRzKGFyZ3VtZW50cyk7IH0pKCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgdmFyIGxlbmd0aCA9IGlzT2JqZWN0TGlrZSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggOiB1bmRlZmluZWQ7XG4gIHJldHVybiAoaXNMZW5ndGgobGVuZ3RoKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMuXG4gKiBTZWUgdGhpcyBbYXJ0aWNsZSBvbiBgUmVnRXhwYCBjaGFyYWN0ZXJzXShodHRwOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9jaGFyYWN0ZXJzLmh0bWwjc3BlY2lhbClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciByZVJlZ0V4cENoYXJzID0gL1suKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhcnMgPSBSZWdFeHAocmVSZWdFeHBDaGFycy5zb3VyY2UpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQgaXMgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZXNjYXBlUmVnRXhwKG9ialRvU3RyaW5nKVxuICAucmVwbGFjZSgvdG9TdHJpbmd8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNBcnJheSA9IGlzTmF0aXZlKG5hdGl2ZUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KSAmJiBuYXRpdmVJc0FycmF5O1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiAoZnVuY3Rpb24oKSB7IHJldHVybiBfLmlzQXJyYXkoYXJndW1lbnRzKTsgfSkoKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcnJheVRhZykgfHwgZmFsc2U7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVIb3N0Q3Rvci50ZXN0KHZhbHVlKSkgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXFxcIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLCBcIipcIixcbiAqIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6Ly9sb2Rhc2hcXC5jb20vXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMuXG4gKiBTZWUgdGhpcyBbYXJ0aWNsZSBvbiBgUmVnRXhwYCBjaGFyYWN0ZXJzXShodHRwOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9jaGFyYWN0ZXJzLmh0bWwjc3BlY2lhbClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciByZVJlZ0V4cENoYXJzID0gL1suKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhcnMgPSBSZWdFeHAocmVSZWdFeHBDaGFycy5zb3VyY2UpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQgaXMgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZXNjYXBlUmVnRXhwKG9ialRvU3RyaW5nKVxuICAucmVwbGFjZSgvdG9TdHJpbmd8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZykge1xuICAgIHJldHVybiByZU5hdGl2ZS50ZXN0KGZuVG9TdHJpbmcuY2FsbCh2YWx1ZSkpO1xuICB9XG4gIHJldHVybiAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiByZUhvc3RDdG9yLnRlc3QodmFsdWUpKSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBFc2NhcGVzIHRoZSBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMgXCJcXFwiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsIFwiKlwiLFxuICogXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczovL2xvZGFzaFxcLmNvbS9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOYXRpdmU7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmluZGNhbGxiYWNrJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCdsb2Rhc2guX2lzaXRlcmF0ZWVjYWxsJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgYXNzaWducyBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykgdG8gYSBnaXZlblxuICogZGVzdGluYXRpb24gb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGxlbmd0aCA9IGFyZ3MubGVuZ3RoLFxuICAgICAgICBvYmplY3QgPSBhcmdzWzBdO1xuXG4gICAgaWYgKGxlbmd0aCA8IDIgfHwgb2JqZWN0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIHZhciBjdXN0b21pemVyID0gYXJnc1tsZW5ndGggLSAyXSxcbiAgICAgICAgdGhpc0FyZyA9IGFyZ3NbbGVuZ3RoIC0gMV0sXG4gICAgICAgIGd1YXJkID0gYXJnc1szXTtcblxuICAgIGlmIChsZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBiaW5kQ2FsbGJhY2soY3VzdG9taXplciwgdGhpc0FyZywgNSk7XG4gICAgICBsZW5ndGggLT0gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VzdG9taXplciA9IChsZW5ndGggPiAyICYmIHR5cGVvZiB0aGlzQXJnID09ICdmdW5jdGlvbicpID8gdGhpc0FyZyA6IG51bGw7XG4gICAgICBsZW5ndGggLT0gKGN1c3RvbWl6ZXIgPyAxIDogMCk7XG4gICAgfVxuICAgIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChhcmdzWzFdLCBhcmdzWzJdLCBndWFyZCkpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPT0gMyA/IG51bGwgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMjtcbiAgICB9XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3NbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQXNzaWduZXI7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUNhbGxiYWNrYCB3aGljaCBvbmx5IHN1cHBvcnRzIGB0aGlzYCBiaW5kaW5nXG4gKiBhbmQgc3BlY2lmeWluZyB0aGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYmluZC5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcmdDb3VudF0gVGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBiaW5kQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGVvZiB0aGlzQXJnID09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cbiAgc3dpdGNoIChhcmdDb3VudCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRDYWxsYmFjaztcbiIsIi8qKlxuICogbG9kYXNoIDMuMC40IChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSArdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwcm92aWRlZCBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInKSB7XG4gICAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGgsXG4gICAgICAgIHByZXJlcSA9IGlzTGVuZ3RoKGxlbmd0aCkgJiYgaXNJbmRleChpbmRleCwgbGVuZ3RoKTtcbiAgfSBlbHNlIHtcbiAgICBwcmVyZXEgPSB0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdDtcbiAgfVxuICBpZiAocHJlcmVxKSB7XG4gICAgdmFyIG90aGVyID0gb2JqZWN0W2luZGV4XTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gKHZhbHVlID09PSBvdGhlcikgOiAob3RoZXIgIT09IG90aGVyKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBFUyBgVG9MZW5ndGhgLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0l0ZXJhdGVlQ2FsbDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUNhbGxiYWNrID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlY2FsbGJhY2snKSxcbiAgICBiYXNlRWFjaCA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWVhY2gnKSxcbiAgICBiYXNlRmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWZpbmQnKSxcbiAgICBmaW5kSW5kZXggPSByZXF1aXJlKCdsb2Rhc2guZmluZGluZGV4JyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FycmF5Jyk7XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAsIHJldHVybmluZyB0aGUgZmlyc3QgZWxlbWVudFxuICogYHByZWRpY2F0ZWAgcmV0dXJucyB0cnV0aHkgZm9yLiBUaGUgcHJlZGljYXRlIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmRcbiAqIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM7ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAqXG4gKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcHJvdmlkZWQgZm9yIGBwcmVkaWNhdGVgIHRoZSBjcmVhdGVkIFwiXy5wcm9wZXJ0eVwiXG4gKiBzdHlsZSBjYWxsYmFjayByZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqXG4gKiBJZiBhbiBvYmplY3QgaXMgcHJvdmlkZWQgZm9yIGBwcmVkaWNhdGVgIHRoZSBjcmVhdGVkIFwiXy5tYXRjaGVzXCIgc3R5bGVcbiAqIGNhbGxiYWNrIHJldHVybnMgYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGdpdmVuXG4gKiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIGRldGVjdFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBzZWFyY2guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxzdHJpbmd9IFtwcmVkaWNhdGU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWRcbiAqICBwZXIgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHByb3ZpZGVkIGl0IGlzIHVzZWQgdG9cbiAqICBjcmVhdGUgYSBcIl8ucHJvcGVydHlcIiBvciBcIl8ubWF0Y2hlc1wiIHN0eWxlIGNhbGxiYWNrIHJlc3BlY3RpdmVseS5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgcHJlZGljYXRlYC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXRjaGVkIGVsZW1lbnQsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAgJ2FnZSc6IDM2LCAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAgJ2FnZSc6IDQwLCAnYWN0aXZlJzogdHJ1ZSB9LFxuICogICB7ICd1c2VyJzogJ3BlYmJsZXMnLCAnYWdlJzogMSwgICdhY3RpdmUnOiBmYWxzZSB9XG4gKiBdO1xuICpcbiAqIF8ucmVzdWx0KF8uZmluZCh1c2VycywgZnVuY3Rpb24oY2hyKSB7IHJldHVybiBjaHIuYWdlIDwgNDA7IH0pLCAndXNlcicpO1xuICogLy8gPT4gJ2Jhcm5leSdcbiAqXG4gKiAvLyB1c2luZyB0aGUgXCJfLm1hdGNoZXNcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8ucmVzdWx0KF8uZmluZCh1c2VycywgeyAnYWdlJzogMSB9KSwgJ3VzZXInKTtcbiAqIC8vID0+ICdwZWJibGVzJ1xuICpcbiAqIC8vIHVzaW5nIHRoZSBcIl8ucHJvcGVydHlcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8ucmVzdWx0KF8uZmluZCh1c2VycywgJ2FjdGl2ZScpLCAndXNlcicpO1xuICogLy8gPT4gJ2ZyZWQnXG4gKi9cbmZ1bmN0aW9uIGZpbmQoY29sbGVjdGlvbiwgcHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gIGlmIChpc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgdmFyIGluZGV4ID0gZmluZEluZGV4KGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgdGhpc0FyZyk7XG4gICAgcmV0dXJuIGluZGV4ID4gLTEgPyBjb2xsZWN0aW9uW2luZGV4XSA6IHVuZGVmaW5lZDtcbiAgfVxuICBwcmVkaWNhdGUgPSBiYXNlQ2FsbGJhY2socHJlZGljYXRlLCB0aGlzQXJnLCAzKTtcbiAgcmV0dXJuIGJhc2VGaW5kKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgYmFzZUVhY2gpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbmQ7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjEuMiAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VJc0VxdWFsID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlaXNlcXVhbCcpLFxuICAgIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmluZGNhbGxiYWNrJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNhbGxiYWNrYCB3aGljaCBzdXBwb3J0cyBzcGVjaWZ5aW5nIHRoZVxuICogbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBbZnVuYz1fLmlkZW50aXR5XSBUaGUgdmFsdWUgdG8gY29udmVydCB0byBhIGNhbGxiYWNrLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmFzZUNhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGZ1bmM7XG4gIGlmICh0eXBlID09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gKHR5cGVvZiB0aGlzQXJnICE9ICd1bmRlZmluZWQnKVxuICAgICAgPyBiaW5kQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpXG4gICAgICA6IGZ1bmM7XG4gIH1cbiAgaWYgKGZ1bmMgPT0gbnVsbCkge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBiYXNlTWF0Y2hlcyhmdW5jKTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIHRoaXNBcmcgPT0gJ3VuZGVmaW5lZCdcbiAgICA/IGJhc2VQcm9wZXJ0eShmdW5jICsgJycpXG4gICAgOiBiYXNlTWF0Y2hlc1Byb3BlcnR5KGZ1bmMgKyAnJywgdGhpc0FyZyk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBvciBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgc291cmNlIHByb3BlcnR5IG5hbWVzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSBzb3VyY2UgdmFsdWVzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtBcnJheX0gc3RyaWN0Q29tcGFyZUZsYWdzIFN0cmljdCBjb21wYXJpc29uIGZsYWdzIGZvciBzb3VyY2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYG9iamVjdGAgaXMgYSBtYXRjaCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNNYXRjaChvYmplY3QsIHByb3BzLCB2YWx1ZXMsIHN0cmljdENvbXBhcmVGbGFncywgY3VzdG9taXplcikge1xuICB2YXIgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gIWxlbmd0aDtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIG5vQ3VzdG9taXplciA9ICFjdXN0b21pemVyO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKChub0N1c3RvbWl6ZXIgJiYgc3RyaWN0Q29tcGFyZUZsYWdzW2luZGV4XSlcbiAgICAgICAgICA/IHZhbHVlc1tpbmRleF0gIT09IG9iamVjdFtwcm9wc1tpbmRleF1dXG4gICAgICAgICAgOiAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BzW2luZGV4XSlcbiAgICAgICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGluZGV4ID0gLTE7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAobm9DdXN0b21pemVyICYmIHN0cmljdENvbXBhcmVGbGFnc1tpbmRleF0pIHtcbiAgICAgIHZhciByZXN1bHQgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgICAgc3JjVmFsdWUgPSB2YWx1ZXNbaW5kZXhdO1xuXG4gICAgICByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSkgOiB1bmRlZmluZWQ7XG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXN1bHQgPSBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIGN1c3RvbWl6ZXIsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2VzIG5vdCBjbG9uZSBgc291cmNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlcyhzb3VyY2UpIHtcbiAgdmFyIHByb3BzID0ga2V5cyhzb3VyY2UpLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIGlmIChsZW5ndGggPT0gMSkge1xuICAgIHZhciBrZXkgPSBwcm9wc1swXSxcbiAgICAgICAgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgIGlmIChpc1N0cmljdENvbXBhcmFibGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBvYmplY3Rba2V5XSA9PT0gdmFsdWUgJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuICB2YXIgdmFsdWVzID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHN0cmljdENvbXBhcmVGbGFncyA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdmFsdWUgPSBzb3VyY2VbcHJvcHNbbGVuZ3RoXV07XG4gICAgdmFsdWVzW2xlbmd0aF0gPSB2YWx1ZTtcbiAgICBzdHJpY3RDb21wYXJlRmxhZ3NbbGVuZ3RoXSA9IGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBiYXNlSXNNYXRjaChvYmplY3QsIHByb3BzLCB2YWx1ZXMsIHN0cmljdENvbXBhcmVGbGFncyk7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc1Byb3BlcnR5YCB3aGljaCBkb2VzIG5vdCBjb2VyY2UgYGtleWBcbiAqIHRvIGEgc3RyaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXNQcm9wZXJ0eShrZXksIHZhbHVlKSB7XG4gIGlmIChpc1N0cmljdENvbXBhcmFibGUodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIG9iamVjdFtrZXldID09PSB2YWx1ZTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgYmFzZUlzRXF1YWwodmFsdWUsIG9iamVjdFtrZXldLCBudWxsLCB0cnVlKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2hpY2ggZG9lcyBub3QgY29lcmNlIGBrZXlgIHRvIGEgc3RyaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlmIHN1aXRhYmxlIGZvciBzdHJpY3RcbiAqICBlcXVhbGl0eSBjb21wYXJpc29ucywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSAmJiAodmFsdWUgPT09IDAgPyAoKDEgLyB2YWx1ZSkgPiAwKSA6ICFpc09iamVjdCh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogKipOb3RlOioqIFNlZSB0aGUgW0VTNSBzcGVjXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKHZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHByb3ZpZGVkIHRvIGl0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ2FsbGJhY2s7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMiAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc3R5cGVkYXJyYXknKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnbG9kYXNoLmtleXMnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2l0aG91dCBzdXBwb3J0IGZvciBgdGhpc2AgYmluZGluZ1xuICogYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNXaGVyZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQikge1xuICAvLyBFeGl0IGVhcmx5IGZvciBpZGVudGljYWwgdmFsdWVzLlxuICBpZiAodmFsdWUgPT09IG90aGVyKSB7XG4gICAgLy8gVHJlYXQgYCswYCB2cy4gYC0wYCBhcyBub3QgZXF1YWwuXG4gICAgcmV0dXJuIHZhbHVlICE9PSAwIHx8ICgxIC8gdmFsdWUgPT0gMSAvIG90aGVyKTtcbiAgfVxuICB2YXIgdmFsVHlwZSA9IHR5cGVvZiB2YWx1ZSxcbiAgICAgIG90aFR5cGUgPSB0eXBlb2Ygb3RoZXI7XG5cbiAgLy8gRXhpdCBlYXJseSBmb3IgdW5saWtlIHByaW1pdGl2ZSB2YWx1ZXMuXG4gIGlmICgodmFsVHlwZSAhPSAnZnVuY3Rpb24nICYmIHZhbFR5cGUgIT0gJ29iamVjdCcgJiYgb3RoVHlwZSAhPSAnZnVuY3Rpb24nICYmIG90aFR5cGUgIT0gJ29iamVjdCcpIHx8XG4gICAgICB2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwpIHtcbiAgICAvLyBSZXR1cm4gYGZhbHNlYCB1bmxlc3MgYm90aCB2YWx1ZXMgYXJlIGBOYU5gLlxuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiYXNlSXNFcXVhbCwgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBvYmplY3RzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNXaGVyZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0I9W11dIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBhcnJheVRhZyxcbiAgICAgIG90aFRhZyA9IGFycmF5VGFnO1xuXG4gIGlmICghb2JqSXNBcnIpIHtcbiAgICBvYmpUYWcgPSBvYmpUb1N0cmluZy5jYWxsKG9iamVjdCk7XG4gICAgaWYgKG9ialRhZyA9PSBhcmdzVGFnKSB7XG4gICAgICBvYmpUYWcgPSBvYmplY3RUYWc7XG4gICAgfSBlbHNlIGlmIChvYmpUYWcgIT0gb2JqZWN0VGFnKSB7XG4gICAgICBvYmpJc0FyciA9IGlzVHlwZWRBcnJheShvYmplY3QpO1xuICAgIH1cbiAgfVxuICBpZiAoIW90aElzQXJyKSB7XG4gICAgb3RoVGFnID0gb2JqVG9TdHJpbmcuY2FsbChvdGhlcik7XG4gICAgaWYgKG90aFRhZyA9PSBhcmdzVGFnKSB7XG4gICAgICBvdGhUYWcgPSBvYmplY3RUYWc7XG4gICAgfSBlbHNlIGlmIChvdGhUYWcgIT0gb2JqZWN0VGFnKSB7XG4gICAgICBvdGhJc0FyciA9IGlzVHlwZWRBcnJheShvdGhlcik7XG4gICAgfVxuICB9XG4gIHZhciBvYmpJc09iaiA9IG9ialRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBvdGhJc09iaiA9IG90aFRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBpc1NhbWVUYWcgPSBvYmpUYWcgPT0gb3RoVGFnO1xuXG4gIGlmIChpc1NhbWVUYWcgJiYgIShvYmpJc0FyciB8fCBvYmpJc09iaikpIHtcbiAgICByZXR1cm4gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcpO1xuICB9XG4gIHZhciB2YWxXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgb3RoV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsICdfX3dyYXBwZWRfXycpO1xuXG4gIGlmICh2YWxXcmFwcGVkIHx8IG90aFdyYXBwZWQpIHtcbiAgICByZXR1cm4gZXF1YWxGdW5jKHZhbFdyYXBwZWQgPyBvYmplY3QudmFsdWUoKSA6IG9iamVjdCwgb3RoV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlciwgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpO1xuICB9XG4gIGlmICghaXNTYW1lVGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gZGV0ZWN0aW5nIGNpcmN1bGFyIHJlZmVyZW5jZXMgc2VlIGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jSk8uXG4gIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICBzdGFja0IgfHwgKHN0YWNrQiA9IFtdKTtcblxuICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IG9iamVjdCkge1xuICAgICAgcmV0dXJuIHN0YWNrQltsZW5ndGhdID09IG90aGVyO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgYG9iamVjdGAgYW5kIGBvdGhlcmAgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICBzdGFja0EucHVzaChvYmplY3QpO1xuICBzdGFja0IucHVzaChvdGhlcik7XG5cbiAgdmFyIHJlc3VsdCA9IChvYmpJc0FyciA/IGVxdWFsQXJyYXlzIDogZXF1YWxPYmplY3RzKShvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcblxuICBzdGFja0EucG9wKCk7XG4gIHN0YWNrQi5wb3AoKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBhcnJheXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1doZXJlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGgsXG4gICAgICByZXN1bHQgPSB0cnVlO1xuXG4gIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNXaGVyZSAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gIHdoaWxlIChyZXN1bHQgJiYgKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF07XG5cbiAgICByZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHJlc3VsdCA9IGlzV2hlcmVcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgpXG4gICAgICAgIDogY3VzdG9taXplcihhcnJWYWx1ZSwgb3RoVmFsdWUsIGluZGV4KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICBpZiAoaXNXaGVyZSkge1xuICAgICAgICB2YXIgb3RoSW5kZXggPSBvdGhMZW5ndGg7XG4gICAgICAgIHdoaWxlIChvdGhJbmRleC0tKSB7XG4gICAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltvdGhJbmRleF07XG4gICAgICAgICAgcmVzdWx0ID0gKGFyclZhbHVlICYmIGFyclZhbHVlID09PSBvdGhWYWx1ZSkgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gKGFyclZhbHVlICYmIGFyclZhbHVlID09PSBvdGhWYWx1ZSkgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gISFyZXN1bHQ7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBjb21wYXJpbmcgb2JqZWN0cyBvZlxuICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNvbXBhcmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcpIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1iZXJzLCBkYXRlcyB0byBtaWxsaXNlY29uZHMgYW5kIGJvb2xlYW5zXG4gICAgICAvLyB0byBgMWAgb3IgYDBgIHRyZWF0aW5nIGludmFsaWQgZGF0ZXMgY29lcmNlZCB0byBgTmFOYCBhcyBub3QgZXF1YWwuXG4gICAgICByZXR1cm4gK29iamVjdCA9PSArb3RoZXI7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgICAgLy8gVHJlYXQgYE5hTmAgdnMuIGBOYU5gIGFzIGVxdWFsLlxuICAgICAgcmV0dXJuIChvYmplY3QgIT0gK29iamVjdClcbiAgICAgICAgPyBvdGhlciAhPSArb3RoZXJcbiAgICAgICAgLy8gQnV0LCB0cmVhdCBgLTBgIHZzLiBgKzBgIGFzIG5vdCBlcXVhbC5cbiAgICAgICAgOiAob2JqZWN0ID09IDAgPyAoKDEgLyBvYmplY3QpID09ICgxIC8gb3RoZXIpKSA6IG9iamVjdCA9PSArb3RoZXIpO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzIHByaW1pdGl2ZXMgYW5kIHN0cmluZ1xuICAgICAgLy8gb2JqZWN0cyBhcyBlcXVhbC4gU2VlIGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjEwLjYuNCBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1doZXJlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIG9ialByb3BzID0ga2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBrZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNXaGVyZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgaGFzQ3RvcixcbiAgICAgIGluZGV4ID0gLTE7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdLFxuICAgICAgICByZXN1bHQgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCBrZXkpO1xuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltrZXldO1xuXG4gICAgICByZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgICByZXN1bHQgPSBpc1doZXJlXG4gICAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBvYmpWYWx1ZSwga2V5KVxuICAgICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgcmVzdWx0ID0gKG9ialZhbHVlICYmIG9ialZhbHVlID09PSBvdGhWYWx1ZSkgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBoYXNDdG9yIHx8IChoYXNDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICB9XG4gIGlmICghaGFzQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID0gdHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID0gdHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID0gdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID0gdHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID0gdHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIHR5cGVkQXJyYXlUYWdzW29ialRvU3RyaW5nLmNhbGwodmFsdWUpXSkgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUeXBlZEFycmF5O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBrZXlzID0gcmVxdWlyZSgnbG9kYXNoLmtleXMnKTtcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckVhY2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R8c3RyaW5nfSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUVhY2goY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGxlbmd0aCA9IGNvbGxlY3Rpb24gPyBjb2xsZWN0aW9uLmxlbmd0aCA6IDA7XG4gIGlmICghaXNMZW5ndGgobGVuZ3RoKSkge1xuICAgIHJldHVybiBiYXNlRm9yT3duKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKTtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGl0ZXJhYmxlID0gdG9PYmplY3QoY29sbGVjdGlvbik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVbaW5kZXhdLCBpbmRleCwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb2xsZWN0aW9uO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBiYXNlRm9ySW5gIGFuZCBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXNcbiAqIG92ZXIgYG9iamVjdGAgcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGludm9raW5nIGBpdGVyYXRlZWAgZm9yXG4gKiBlYWNoIHByb3BlcnR5LiBJdGVyYXRvciBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHlcbiAqIHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaXRlcmFibGUgPSB0b09iamVjdChvYmplY3QpLFxuICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JPd25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gb2JqZWN0IGlmIGl0IGlzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IE9iamVjdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIGxhbmd1YWdlIHR5cGUgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiAqKk5vdGU6KiogU2VlIHRoZSBbRVM1IHNwZWNdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAodmFsdWUgJiYgdHlwZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUVhY2g7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbmRgLCBgXy5maW5kTGFzdGAsIGBfLmZpbmRLZXlgLCBhbmQgYF8uZmluZExhc3RLZXlgLFxuICogd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFjayBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZywgd2hpY2ggaXRlcmF0ZXNcbiAqIG92ZXIgYGNvbGxlY3Rpb25gIHVzaW5nIHRoZSBwcm92aWRlZCBgZWFjaEZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gc2VhcmNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlYWNoRnVuYyBUaGUgZnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIGBjb2xsZWN0aW9uYC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JldEtleV0gU3BlY2lmeSByZXR1cm5pbmcgdGhlIGtleSBvZiB0aGUgZm91bmQgZWxlbWVudFxuICogIGluc3RlYWQgb2YgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZvdW5kIGVsZW1lbnQgb3IgaXRzIGtleSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbmQoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBlYWNoRnVuYywgcmV0S2V5KSB7XG4gIHZhciByZXN1bHQ7XG4gIGVhY2hGdW5jKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pIHtcbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pKSB7XG4gICAgICByZXN1bHQgPSByZXRLZXkgPyBrZXkgOiB2YWx1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGaW5kO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VjYWxsYmFjaycpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uZmluZGAgZXhjZXB0IHRoYXQgaXQgcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0XG4gKiBlbGVtZW50IGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvciwgaW5zdGVhZCBvZiB0aGUgZWxlbWVudCBpdHNlbGYuXG4gKlxuICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ucHJvcGVydHlcIlxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogSWYgYW4gb2JqZWN0IGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ubWF0Y2hlc1wiIHN0eWxlXG4gKiBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlblxuICogb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fHN0cmluZ30gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZFxuICogIHBlciBpdGVyYXRpb24uIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcHJvdmlkZWQgaXQgaXMgdXNlZCB0b1xuICogIGNyZWF0ZSBhIFwiXy5wcm9wZXJ0eVwiIG9yIFwiXy5tYXRjaGVzXCIgc3R5bGUgY2FsbGJhY2sgcmVzcGVjdGl2ZWx5LlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBwcmVkaWNhdGVgLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZvdW5kIGVsZW1lbnQsIGVsc2UgYC0xYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0gW1xuICogICB7ICd1c2VyJzogJ2Jhcm5leScsICAnYWdlJzogMzYsICdhY3RpdmUnOiBmYWxzZSB9LFxuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICAnYWdlJzogNDAsICdhY3RpdmUnOiB0cnVlIH0sXG4gKiAgIHsgJ3VzZXInOiAncGViYmxlcycsICdhZ2UnOiAxLCAgJ2FjdGl2ZSc6IGZhbHNlIH1cbiAqIF07XG4gKlxuICogXy5maW5kSW5kZXgodXNlcnMsIGZ1bmN0aW9uKGNocikgeyByZXR1cm4gY2hyLmFnZSA8IDQwOyB9KTtcbiAqIC8vID0+IDBcbiAqXG4gKiAvLyB1c2luZyB0aGUgXCJfLm1hdGNoZXNcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8uZmluZEluZGV4KHVzZXJzLCB7ICdhZ2UnOiAxIH0pO1xuICogLy8gPT4gMlxuICpcbiAqIC8vIHVzaW5nIHRoZSBcIl8ucHJvcGVydHlcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8uZmluZEluZGV4KHVzZXJzLCAnYWN0aXZlJyk7XG4gKiAvLyA9PiAxXG4gKi9cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHByZWRpY2F0ZSA9IGJhc2VDYWxsYmFjayhwcmVkaWNhdGUsIHRoaXNBcmcsIDMpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kSW5kZXg7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJlZm9yZSA9IHJlcXVpcmUoJ2xvZGFzaC5iZWZvcmUnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpcyByZXN0cmljdGVkIHRvIGludm9raW5nIGBmdW5jYCBvbmNlLiBSZXBlYXQgY2FsbHNcbiAqIHRvIHRoZSBmdW5jdGlvbiByZXR1cm4gdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBjYWxsLiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBjcmVhdGVkIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAdHlwZSBGdW5jdGlvblxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byByZXN0cmljdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHJlc3RyaWN0ZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBpbml0aWFsaXplID0gXy5vbmNlKGNyZWF0ZUFwcGxpY2F0aW9uKTtcbiAqIGluaXRpYWxpemUoKTtcbiAqIGluaXRpYWxpemUoKTtcbiAqIC8vIGBpbml0aWFsaXplYCBpbnZva2VzIGBjcmVhdGVBcHBsaWNhdGlvbmAgb25jZVxuICovXG5mdW5jdGlvbiBvbmNlKGZ1bmMpIHtcbiAgcmV0dXJuIGJlZm9yZShmdW5jLCAyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvbmNlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2AsIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIGFuZCBhcmd1bWVudHNcbiAqIG9mIHRoZSBjcmVhdGVkIGZ1bmN0aW9uLCB3aGlsZSBpdCBpcyBjYWxsZWQgbGVzcyB0aGFuIGBuYCB0aW1lcy4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGNyZWF0ZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGludm9jYXRpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBjYWxscyBhdCB3aGljaCBgZnVuY2AgaXMgbm8gbG9uZ2VyIGludm9rZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byByZXN0cmljdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHJlc3RyaWN0ZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIGpRdWVyeSgnI2FkZCcpLm9uKCdjbGljaycsIF8uYmVmb3JlKDUsIGFkZENvbnRhY3RUb0xpc3QpKTtcbiAqIC8vID0+IGFsbG93cyBhZGRpbmcgdXAgdG8gNCBjb250YWN0cyB0byB0aGUgbGlzdFxuICovXG5mdW5jdGlvbiBiZWZvcmUobiwgZnVuYykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICh0eXBlb2YgbiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgdGVtcCA9IG47XG4gICAgICBuID0gZnVuYztcbiAgICAgIGZ1bmMgPSB0ZW1wO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpZiAoLS1uID4gMCkge1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmdW5jID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiZWZvcmU7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCdsb2Rhc2guaXNmdW5jdGlvbicpO1xuXG4vKipcbiAqIFJlc29sdmVzIHRoZSB2YWx1ZSBvZiBwcm9wZXJ0eSBga2V5YCBvbiBgb2JqZWN0YC4gSWYgdGhlIHZhbHVlIG9mIGBrZXlgIGlzXG4gKiBhIGZ1bmN0aW9uIGl0IGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYG9iamVjdGAgYW5kIGl0cyByZXN1bHRcbiAqIGlzIHJldHVybmVkLCBlbHNlIHRoZSBwcm9wZXJ0eSB2YWx1ZSBpcyByZXR1cm5lZC4gSWYgdGhlIHByb3BlcnR5IHZhbHVlIGlzXG4gKiBgdW5kZWZpbmVkYCB0aGUgYGRlZmF1bHRWYWx1ZWAgaXMgdXNlZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gcmVzb2x2ZS5cbiAqIEBwYXJhbSB7Kn0gW2RlZmF1bHRWYWx1ZV0gVGhlIHZhbHVlIHJldHVybmVkIGlmIHRoZSBwcm9wZXJ0eSB2YWx1ZVxuICogIHJlc29sdmVzIHRvIGB1bmRlZmluZWRgLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IF8uY29uc3RhbnQoNDApIH07XG4gKlxuICogXy5yZXN1bHQob2JqZWN0LCAndXNlcicpO1xuICogLy8gPT4gJ2ZyZWQnXG4gKlxuICogXy5yZXN1bHQob2JqZWN0LCAnYWdlJyk7XG4gKiAvLyA9PiA0MFxuICpcbiAqIF8ucmVzdWx0KG9iamVjdCwgJ3N0YXR1cycsICdidXN5Jyk7XG4gKiAvLyA9PiAnYnVzeSdcbiAqXG4gKiBfLnJlc3VsdChvYmplY3QsICdzdGF0dXMnLCBfLmNvbnN0YW50KCdidXN5JykpO1xuICogLy8gPT4gJ2J1c3knXG4gKi9cbmZ1bmN0aW9uIHJlc3VsdChvYmplY3QsIGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gIHZhciB2YWx1ZSA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgfVxuICByZXR1cm4gaXNGdW5jdGlvbih2YWx1ZSkgPyB2YWx1ZS5jYWxsKG9iamVjdCkgOiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMuXG4gKiBTZWUgdGhpcyBbYXJ0aWNsZSBvbiBgUmVnRXhwYCBjaGFyYWN0ZXJzXShodHRwOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9jaGFyYWN0ZXJzLmh0bWwjc3BlY2lhbClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciByZVJlZ0V4cENoYXJzID0gL1suKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhcnMgPSBSZWdFeHAocmVSZWdFeHBDaGFycy5zb3VyY2UpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRnVuY3Rpb25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgZW52aXJvbm1lbnRzXG4gKiB3aXRoIGluY29ycmVjdCBgdHlwZW9mYCByZXN1bHRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgQ2hha3JhIEpJVCBidWcgaW4gY29tcGF0aWJpbGl0eSBtb2RlcyBvZiBJRSAxMS5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZS9pc3N1ZXMvMTYyMSBmb3IgbW9yZSBkZXRhaWxzLlxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBpZiBpdCBpcyBub3Qgb25lLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWRcbiAqIGZvciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogKHZhbHVlICsgJycpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZU5hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBlc2NhcGVSZWdFeHAob2JqVG9TdHJpbmcpXG4gIC5yZXBsYWNlKC90b1N0cmluZ3woZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBVaW50OEFycmF5ID0gaXNOYXRpdmUoVWludDhBcnJheSA9IGdsb2JhbC5VaW50OEFycmF5KSAmJiBVaW50OEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNGdW5jdGlvbiA9ICEoYmFzZUlzRnVuY3Rpb24oL3gvKSB8fCAoVWludDhBcnJheSAmJiAhYmFzZUlzRnVuY3Rpb24oVWludDhBcnJheSkpKSA/IGJhc2VJc0Z1bmN0aW9uIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpIHdoaWNoIHJldHVybiAnZnVuY3Rpb24nIGZvciByZWdleGVzXG4gIC8vIGFuZCBTYWZhcmkgOCBlcXVpdmFsZW50cyB3aGljaCByZXR1cm4gJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGNvbnN0cnVjdG9ycy5cbiAgcmV0dXJuIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWc7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVIb3N0Q3Rvci50ZXN0KHZhbHVlKSkgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXFxcIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLCBcIipcIixcbiAqIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6Ly9sb2Rhc2hcXC5jb20vXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWNhbGxiYWNrJyksXG4gICAgYmFzZVVuaXEgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2V1bmlxJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCdsb2Rhc2guX2lzaXRlcmF0ZWVjYWxsJyk7XG5cbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2YgYF8udW5pcWAgb3B0aW1pemVkIGZvciBzb3J0ZWQgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydFxuICogZm9yIGNhbGxiYWNrIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZS12YWx1ZS1mcmVlIGFycmF5LlxuICovXG5mdW5jdGlvbiBzb3J0ZWRVbmlxKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgc2VlbixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXNJbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSA6IHZhbHVlO1xuXG4gICAgaWYgKCFpbmRleCB8fCBzZWVuICE9PSBjb21wdXRlZCkge1xuICAgICAgc2VlbiA9IGNvbXB1dGVkO1xuICAgICAgcmVzdWx0WysrcmVzSW5kZXhdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGR1cGxpY2F0ZS12YWx1ZS1mcmVlIHZlcnNpb24gb2YgYW4gYXJyYXkgdXNpbmcgYFNhbWVWYWx1ZVplcm9gXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuIFByb3ZpZGluZyBgdHJ1ZWAgZm9yIGBpc1NvcnRlZGAgcGVyZm9ybXMgYSBmYXN0ZXJcbiAqIHNlYXJjaCBhbGdvcml0aG0gZm9yIHNvcnRlZCBhcnJheXMuIElmIGFuIGl0ZXJhdGVlIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIGl0XG4gKiBpcyBpbnZva2VkIGZvciBlYWNoIHZhbHVlIGluIHRoZSBhcnJheSB0byBnZW5lcmF0ZSB0aGUgY3JpdGVyaW9uIGJ5IHdoaWNoXG4gKiB1bmlxdWVuZXNzIGlzIGNvbXB1dGVkLiBUaGUgYGl0ZXJhdGVlYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWRcbiAqIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4LCBhcnJheSkuXG4gKlxuICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ucHJvcGVydHlcIlxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogSWYgYW4gb2JqZWN0IGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ubWF0Y2hlc1wiIHN0eWxlXG4gKiBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlblxuICogb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKlxuICogKipOb3RlOioqIGBTYW1lVmFsdWVaZXJvYCBjb21wYXJpc29ucyBhcmUgbGlrZSBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsXG4gKiBlLmcuIGA9PT1gLCBleGNlcHQgdGhhdCBgTmFOYCBtYXRjaGVzIGBOYU5gLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgdW5pcXVlXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbaXNTb3J0ZWRdIFNwZWNpZnkgdGhlIGFycmF5IGlzIHNvcnRlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fHN0cmluZ30gW2l0ZXJhdGVlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcHJvdmlkZWQgaXQgaXMgdXNlZCB0byBjcmVhdGUgYSBcIl8ucHJvcGVydHlcIlxuICogIG9yIFwiXy5tYXRjaGVzXCIgc3R5bGUgY2FsbGJhY2sgcmVzcGVjdGl2ZWx5LlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBpdGVyYXRlZWAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUtdmFsdWUtZnJlZSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy51bmlxKFsxLCAyLCAxXSk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyB1c2luZyBgaXNTb3J0ZWRgXG4gKiBfLnVuaXEoWzEsIDEsIDJdLCB0cnVlKTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIHVzaW5nIGFuIGl0ZXJhdGVlIGZ1bmN0aW9uXG4gKiBfLnVuaXEoWzEsIDIuNSwgMS41LCAyXSwgZnVuY3Rpb24obikgeyByZXR1cm4gdGhpcy5mbG9vcihuKTsgfSwgTWF0aCk7XG4gKiAvLyA9PiBbMSwgMi41XVxuICpcbiAqIC8vIHVzaW5nIHRoZSBcIl8ucHJvcGVydHlcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8udW5pcShbeyAneCc6IDEgfSwgeyAneCc6IDIgfSwgeyAneCc6IDEgfV0sICd4Jyk7XG4gKiAvLyA9PiBbeyAneCc6IDEgfSwgeyAneCc6IDIgfV1cbiAqL1xuZnVuY3Rpb24gdW5pcShhcnJheSwgaXNTb3J0ZWQsIGl0ZXJhdGVlLCB0aGlzQXJnKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIC8vIEp1Z2dsZSBhcmd1bWVudHMuXG4gIGlmICh0eXBlb2YgaXNTb3J0ZWQgIT0gJ2Jvb2xlYW4nICYmIGlzU29ydGVkICE9IG51bGwpIHtcbiAgICB0aGlzQXJnID0gaXRlcmF0ZWU7XG4gICAgaXRlcmF0ZWUgPSBpc0l0ZXJhdGVlQ2FsbChhcnJheSwgaXNTb3J0ZWQsIHRoaXNBcmcpID8gbnVsbCA6IGlzU29ydGVkO1xuICAgIGlzU29ydGVkID0gZmFsc2U7XG4gIH1cbiAgaXRlcmF0ZWUgPSBpdGVyYXRlZSA9PSBudWxsID8gaXRlcmF0ZWUgOiBiYXNlQ2FsbGJhY2soaXRlcmF0ZWUsIHRoaXNBcmcsIDMpO1xuICByZXR1cm4gKGlzU29ydGVkKVxuICAgID8gc29ydGVkVW5pcShhcnJheSwgaXRlcmF0ZWUpXG4gICAgOiBiYXNlVW5pcShhcnJheSwgaXRlcmF0ZWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaXE7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMiAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VJbmRleE9mID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlaW5kZXhvZicpLFxuICAgIGNhY2hlSW5kZXhPZiA9IHJlcXVpcmUoJ2xvZGFzaC5fY2FjaGVpbmRleG9mJyksXG4gICAgY3JlYXRlQ2FjaGUgPSByZXF1aXJlKCdsb2Rhc2guX2NyZWF0ZWNhY2hlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5pcWAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFjayBzaG9ydGhhbmRzXG4gKiBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlLXZhbHVlLWZyZWUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmlxKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluZGV4T2YgPSBiYXNlSW5kZXhPZixcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGlzQ29tbW9uID0gdHJ1ZSxcbiAgICAgIGlzTGFyZ2UgPSBpc0NvbW1vbiAmJiBsZW5ndGggPj0gMjAwLFxuICAgICAgc2VlbiA9IGlzTGFyZ2UgPyBjcmVhdGVDYWNoZSgpIDogbnVsbCxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGlmIChzZWVuKSB7XG4gICAgaW5kZXhPZiA9IGNhY2hlSW5kZXhPZjtcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGlzTGFyZ2UgPSBmYWxzZTtcbiAgICBzZWVuID0gaXRlcmF0ZWUgPyBbXSA6IHJlc3VsdDtcbiAgfVxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSA6IHZhbHVlO1xuXG4gICAgaWYgKGlzQ29tbW9uICYmIHZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgdmFyIHNlZW5JbmRleCA9IHNlZW4ubGVuZ3RoO1xuICAgICAgd2hpbGUgKHNlZW5JbmRleC0tKSB7XG4gICAgICAgIGlmIChzZWVuW3NlZW5JbmRleF0gPT09IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpdGVyYXRlZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpbmRleE9mKHNlZW4sIGNvbXB1dGVkLCAwKSA8IDApIHtcbiAgICAgIGlmIChpdGVyYXRlZSB8fCBpc0xhcmdlKSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVVuaXE7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjEuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmluZGV4T2ZgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYmluYXJ5IHNlYXJjaGVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgaWYgKHZhbHVlICE9PSB2YWx1ZSkge1xuICAgIHJldHVybiBpbmRleE9mTmFOKGFycmF5LCBmcm9tSW5kZXgpO1xuICB9XG4gIHZhciBpbmRleCA9IGZyb21JbmRleCAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYE5hTmAgaXMgZm91bmQgaW4gYGFycmF5YC5cbiAqIElmIGBmcm9tUmlnaHRgIGlzIHByb3ZpZGVkIGVsZW1lbnRzIG9mIGBhcnJheWAgYXJlIGl0ZXJhdGVkIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCBgTmFOYCwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBpbmRleE9mTmFOKGFycmF5LCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMCA6IC0xKTtcblxuICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgIHZhciBvdGhlciA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAob3RoZXIgIT09IG90aGVyKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSW5kZXhPZjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gYGNhY2hlYCBtaW1pY2tpbmcgdGhlIHJldHVybiBzaWduYXR1cmUgb2ZcbiAqIGBfLmluZGV4T2ZgIGJ5IHJldHVybmluZyBgMGAgaWYgdGhlIHZhbHVlIGlzIGZvdW5kLCBlbHNlIGAtMWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSBUaGUgY2FjaGUgdG8gc2VhcmNoLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYDBgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gY2FjaGVJbmRleE9mKGNhY2hlLCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IGNhY2hlLmRhdGEsXG4gICAgICByZXN1bHQgPSAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzT2JqZWN0KHZhbHVlKSkgPyBkYXRhLnNldC5oYXModmFsdWUpIDogZGF0YS5oYXNoW3ZhbHVlXTtcblxuICByZXR1cm4gcmVzdWx0ID8gMCA6IC0xO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogKipOb3RlOioqIFNlZSB0aGUgW0VTNSBzcGVjXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKHZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhY2hlSW5kZXhPZjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgaXNOYXRpdmUgPSByZXF1aXJlKCdsb2Rhc2guaXNuYXRpdmUnKTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBTZXQgPSBpc05hdGl2ZShTZXQgPSBnbG9iYWwuU2V0KSAmJiBTZXQ7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gaXNOYXRpdmUobmF0aXZlQ3JlYXRlID0gT2JqZWN0LmNyZWF0ZSkgJiYgbmF0aXZlQ3JlYXRlO1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGEgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgbGVuZ3RoID0gdmFsdWVzID8gdmFsdWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5kYXRhID0geyAnaGFzaCc6IG5hdGl2ZUNyZWF0ZShudWxsKSwgJ3NldCc6IG5ldyBTZXQgfTtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdGhpcy5wdXNoKHZhbHVlc1tsZW5ndGhdKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHB1c2hcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlUHVzaCh2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc09iamVjdCh2YWx1ZSkpIHtcbiAgICBkYXRhLnNldC5hZGQodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIGRhdGEuaGFzaFt2YWx1ZV0gPSB0cnVlO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBTZXRgIGNhY2hlIG9iamVjdCB0byBvcHRpbWl6ZSBsaW5lYXIgc2VhcmNoZXMgb2YgbGFyZ2UgYXJyYXlzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICogQHJldHVybnMge251bGx8T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgY2FjaGUgb2JqZWN0IGlmIGBTZXRgIGlzIHN1cHBvcnRlZCwgZWxzZSBgbnVsbGAuXG4gKi9cbnZhciBjcmVhdGVDYWNoZSA9ICEobmF0aXZlQ3JlYXRlICYmIFNldCkgPyBjb25zdGFudChudWxsKSA6IGZ1bmN0aW9uKHZhbHVlcykge1xuICByZXR1cm4gbmV3IFNldENhY2hlKHZhbHVlcyk7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogKipOb3RlOioqIFNlZSB0aGUgW0VTNSBzcGVjXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKHZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYHZhbHVlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiBmcm9tIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqIHZhciBnZXR0ZXIgPSBfLmNvbnN0YW50KG9iamVjdCk7XG4gKiBnZXR0ZXIoKSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG4vLyBBZGQgZnVuY3Rpb25zIHRvIHRoZSBgU2V0YCBjYWNoZS5cblNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gY2FjaGVQdXNoO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUNhY2hlO1xuIiwiLy9UaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IGJpbi9ob29rLmpzXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHsgJ21lZGlhX2NvbnRyb2wnOiB0ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtYmFja2dyb3VuZFwiIGRhdGEtYmFja2dyb3VuZD48L2Rpdj48ZGl2IGNsYXNzPVwibWVkaWEtY29udHJvbC1sYXllclwiIGRhdGEtY29udHJvbHM+PCUgdmFyIHJlbmRlckJhcj1mdW5jdGlvbihuYW1lKSB7ICU+PGRpdiBjbGFzcz1cImJhci1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJiYXItYmFja2dyb3VuZFwiIGRhdGEtPCU9IG5hbWUgJT4+PGRpdiBjbGFzcz1cImJhci1maWxsLTFcIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjxkaXYgY2xhc3M9XCJiYXItZmlsbC0yXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48ZGl2IGNsYXNzPVwiYmFyLWhvdmVyXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiYmFyLXNjcnViYmVyXCIgZGF0YS08JT0gbmFtZSAlPj48ZGl2IGNsYXNzPVwiYmFyLXNjcnViYmVyLWljb25cIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjwvZGl2PjwvZGl2PjwlIH07ICU+PCUgdmFyIHJlbmRlclNlZ21lbnRlZEJhcj1mdW5jdGlvbihuYW1lLCBzZWdtZW50cykgeyBzZWdtZW50cz1zZWdtZW50cyB8fCAxMDsgJT48ZGl2IGNsYXNzPVwiYmFyLWNvbnRhaW5lclwiIGRhdGEtPCU9IG5hbWUgJT4+PCUgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50czsgaSsrKSB7ICU+PGRpdiBjbGFzcz1cInNlZ21lbnRlZC1iYXItZWxlbWVudFwiIGRhdGEtPCU9IG5hbWUgJT4+PC9kaXY+PCUgfSAlPjwvZGl2PjwlIH07ICU+PCUgdmFyIHJlbmRlckRyYXdlcj1mdW5jdGlvbihuYW1lLCByZW5kZXJDb250ZW50KSB7ICU+PGRpdiBjbGFzcz1cImRyYXdlci1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJkcmF3ZXItaWNvbi1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJkcmF3ZXItaWNvbiBtZWRpYS1jb250cm9sLWljb25cIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjxzcGFuIGNsYXNzPVwiZHJhd2VyLXRleHRcIiBkYXRhLTwlPSBuYW1lICU+Pjwvc3Bhbj48L2Rpdj48JSByZW5kZXJDb250ZW50KG5hbWUpOyAlPjwvZGl2PjwlIH07ICU+PCUgdmFyIHJlbmRlckluZGljYXRvcj1mdW5jdGlvbihuYW1lKSB7ICU+PGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48JSB9OyAlPjwlIHZhciByZW5kZXJCdXR0b249ZnVuY3Rpb24obmFtZSkgeyAlPjxidXR0b24gY2xhc3M9XCJtZWRpYS1jb250cm9sLWJ1dHRvbiBtZWRpYS1jb250cm9sLWljb25cIiBkYXRhLTwlPSBuYW1lICU+PjwvYnV0dG9uPjwlIH07ICU+PCUgdmFyIHRlbXBsYXRlcz17IGJhcjogcmVuZGVyQmFyLCBzZWdtZW50ZWRCYXI6IHJlbmRlclNlZ21lbnRlZEJhciwgfTsgdmFyIHJlbmRlcj1mdW5jdGlvbihzZXR0aW5nc0xpc3QpIHsgc2V0dGluZ3NMaXN0LmZvckVhY2goZnVuY3Rpb24oc2V0dGluZykgeyBpZihzZXR0aW5nID09PSBcInNlZWtiYXJcIikgeyByZW5kZXJCYXIoc2V0dGluZyk7IH0gZWxzZSBpZiAoc2V0dGluZyA9PT0gXCJ2b2x1bWVcIikgeyByZW5kZXJEcmF3ZXIoc2V0dGluZywgc2V0dGluZ3Mudm9sdW1lQmFyVGVtcGxhdGUgPyB0ZW1wbGF0ZXNbc2V0dGluZ3Mudm9sdW1lQmFyVGVtcGxhdGVdIDogZnVuY3Rpb24obmFtZSkgeyByZXR1cm4gcmVuZGVyU2VnbWVudGVkQmFyKG5hbWUpOyB9KTsgfSBlbHNlIGlmIChzZXR0aW5nID09PSBcImR1cmF0aW9uXCIgfHwgc2V0dGluZz09PSBcInBvc2l0aW9uXCIpIHsgcmVuZGVySW5kaWNhdG9yKHNldHRpbmcpOyB9IGVsc2UgeyByZW5kZXJCdXR0b24oc2V0dGluZyk7IH0gfSk7IH07ICU+PCUgaWYgKHNldHRpbmdzLmRlZmF1bHQgJiYgc2V0dGluZ3MuZGVmYXVsdC5sZW5ndGgpIHsgJT48ZGl2IGNsYXNzPVwibWVkaWEtY29udHJvbC1jZW50ZXItcGFuZWxcIiBkYXRhLW1lZGlhLWNvbnRyb2w+PCUgcmVuZGVyKHNldHRpbmdzLmRlZmF1bHQpOyAlPjwvZGl2PjwlIH0gJT48JSBpZiAoc2V0dGluZ3MubGVmdCAmJiBzZXR0aW5ncy5sZWZ0Lmxlbmd0aCkgeyAlPjxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLWxlZnQtcGFuZWxcIiBkYXRhLW1lZGlhLWNvbnRyb2w+PCUgcmVuZGVyKHNldHRpbmdzLmxlZnQpOyAlPjwvZGl2PjwlIH0gJT48JSBpZiAoc2V0dGluZ3MucmlnaHQgJiYgc2V0dGluZ3MucmlnaHQubGVuZ3RoKSB7ICU+PGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtcmlnaHQtcGFuZWxcIiBkYXRhLW1lZGlhLWNvbnRyb2w+PCUgcmVuZGVyKHNldHRpbmdzLnJpZ2h0KTsgJT48L2Rpdj48JSB9ICU+PC9kaXY+JyksJ3NlZWtfdGltZSc6IHRlbXBsYXRlKCc8c3BhbiBkYXRhLXNlZWstdGltZT48L3NwYW4+JyksJ2ZsYXNoJzogdGVtcGxhdGUoJzxwYXJhbSBuYW1lPVwibW92aWVcIiB2YWx1ZT1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXIuc3dmXCI+PHBhcmFtIG5hbWU9XCJxdWFsaXR5XCIgdmFsdWU9XCJhdXRvaGlnaFwiPjxwYXJhbSBuYW1lPVwic3dsaXZlY29ubmVjdFwiIHZhbHVlPVwidHJ1ZVwiPjxwYXJhbSBuYW1lPVwiYWxsb3dTY3JpcHRBY2Nlc3NcIiB2YWx1ZT1cImFsd2F5c1wiPjxwYXJhbSBuYW1lPVwiYmdjb2xvclwiIHZhbHVlPVwiIzAwMTEyMlwiPjxwYXJhbSBuYW1lPVwiYWxsb3dGdWxsU2NyZWVuXCIgdmFsdWU9XCJmYWxzZVwiPjxwYXJhbSBuYW1lPVwid21vZGVcIiB2YWx1ZT1cInRyYW5zcGFyZW50XCI+PHBhcmFtIG5hbWU9XCJ0YWJpbmRleFwiIHZhbHVlPVwiMVwiPjxwYXJhbSBuYW1lPUZsYXNoVmFycyB2YWx1ZT1cInBsYXliYWNrSWQ9PCU9IHBsYXliYWNrSWQgJT5cIiAvPjxlbWJlZCB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBkaXNhYmxlZCB0YWJpbmRleD1cIi0xXCIgZW5hYmxlY29udGV4dG1lbnU9XCJmYWxzZVwiIGFsbG93U2NyaXB0QWNjZXNzPVwiYWx3YXlzXCIgcXVhbGl0eT1cImF1dG9oaWdodFwiIHBsdWdpbnNwYWdlPVwiaHR0cDovL3d3dy5tYWNyb21lZGlhLmNvbS9nby9nZXRmbGFzaHBsYXllclwiIHdtb2RlPVwidHJhbnNwYXJlbnRcIiBzd2xpdmVjb25uZWN0PVwidHJ1ZVwiIHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIGFsbG93ZnVsbHNjcmVlbj1cImZhbHNlXCIgYmdjb2xvcj1cIiMwMDAwMDBcIiBGbGFzaFZhcnM9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgc3JjPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci5zd2ZcIj48L2VtYmVkPicpLCdobHMnOiB0ZW1wbGF0ZSgnPHBhcmFtIG5hbWU9XCJtb3ZpZVwiIHZhbHVlPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL0hMU1BsYXllci5zd2Y/aW5saW5lPTFcIj48cGFyYW0gbmFtZT1cInF1YWxpdHlcIiB2YWx1ZT1cImF1dG9oaWdoXCI+PHBhcmFtIG5hbWU9XCJzd2xpdmVjb25uZWN0XCIgdmFsdWU9XCJ0cnVlXCI+PHBhcmFtIG5hbWU9XCJhbGxvd1NjcmlwdEFjY2Vzc1wiIHZhbHVlPVwiYWx3YXlzXCI+PHBhcmFtIG5hbWU9XCJiZ2NvbG9yXCIgdmFsdWU9XCIjMDAxMTIyXCI+PHBhcmFtIG5hbWU9XCJhbGxvd0Z1bGxTY3JlZW5cIiB2YWx1ZT1cImZhbHNlXCI+PHBhcmFtIG5hbWU9XCJ3bW9kZVwiIHZhbHVlPVwidHJhbnNwYXJlbnRcIj48cGFyYW0gbmFtZT1cInRhYmluZGV4XCIgdmFsdWU9XCIxXCI+PHBhcmFtIG5hbWU9Rmxhc2hWYXJzIHZhbHVlPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPlwiIC8+PGVtYmVkIHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIHRhYmluZGV4PVwiMVwiIGVuYWJsZWNvbnRleHRtZW51PVwiZmFsc2VcIiBhbGxvd1NjcmlwdEFjY2Vzcz1cImFsd2F5c1wiIHF1YWxpdHk9XCJhdXRvaGlnaFwiIHBsdWdpbnNwYWdlPVwiaHR0cDovL3d3dy5tYWNyb21lZGlhLmNvbS9nby9nZXRmbGFzaHBsYXllclwiIHdtb2RlPVwidHJhbnNwYXJlbnRcIiBzd2xpdmVjb25uZWN0PVwidHJ1ZVwiIHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIGFsbG93ZnVsbHNjcmVlbj1cImZhbHNlXCIgYmdjb2xvcj1cIiMwMDAwMDBcIiBGbGFzaFZhcnM9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgc3JjPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL0hMU1BsYXllci5zd2ZcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PC9lbWJlZD4nKSwnaHRtbDVfdmlkZW8nOiB0ZW1wbGF0ZSgnPHNvdXJjZSBzcmM9XCI8JT1zcmMlPlwiIHR5cGU9XCI8JT10eXBlJT5cIj4nKSwnbm9fb3AnOiB0ZW1wbGF0ZSgnPGNhbnZhcyBkYXRhLW5vLW9wLWNhbnZhcz48L2NhbnZhcz48cCBkYXRhLW5vLW9wLW1zZz5Zb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgcGxheWJhY2sgb2YgdGhpcyB2aWRlby4gVHJ5IHRvIHVzZSBhIGRpZmZlcmVudCBicm93c2VyLjxwPicpLCdiYWNrZ3JvdW5kX2J1dHRvbic6IHRlbXBsYXRlKCc8ZGl2IGNsYXNzPVwiYmFja2dyb3VuZC1idXR0b24td3JhcHBlclwiIGRhdGEtYmFja2dyb3VuZC1idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJhY2tncm91bmQtYnV0dG9uLWljb25cIiBkYXRhLWJhY2tncm91bmQtYnV0dG9uPjwvYnV0dG9uPjwvZGl2PicpLCdjaHJvbWVjYXN0JzogdGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJjaHJvbWVjYXN0LXBsYXliYWNrXCI+PGRpdiBjbGFzcz1cImNocm9tZWNhc3QtcGxheWJhY2stb3ZlcmxheVwiPjwvZGl2PjwvZGl2PicpLCdkdnJfY29udHJvbHMnOiB0ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImxpdmUtaW5mb1wiPkxJVkU8L2Rpdj48YnV0dG9uIGNsYXNzPVwibGl2ZS1idXR0b25cIj5CQUNLIFRPIExJVkU8L2J1dHRvbj4nKSwncG9zdGVyJzogdGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJwbGF5LXdyYXBwZXJcIiBkYXRhLXBvc3Rlcj48c3BhbiBjbGFzcz1cInBvc3Rlci1pY29uIHBsYXlcIiBkYXRhLXBvc3Rlci8+PC9kaXY+JyksJ3NwaW5uZXJfdGhyZWVfYm91bmNlJzogdGVtcGxhdGUoJzxkaXYgZGF0YS1ib3VuY2UxPjwvZGl2PjxkaXYgZGF0YS1ib3VuY2UyPjwvZGl2PjxkaXYgZGF0YS1ib3VuY2UzPjwvZGl2PicpLCd3YXRlcm1hcmsnOiB0ZW1wbGF0ZSgnPGRpdiBkYXRhLXdhdGVybWFyayBkYXRhLXdhdGVybWFyay08JT1wb3NpdGlvbiAlPj48aW1nIHNyYz1cIjwlPSBpbWFnZVVybCAlPlwiPjwvZGl2PicpLENTUzogeydjb250YWluZXInOiAnLmNvbnRhaW5lcltkYXRhLWNvbnRhaW5lcl17cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjojMDAwO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LmNvbnRhaW5lcltkYXRhLWNvbnRhaW5lcl0ucG9pbnRlci1lbmFibGVke2N1cnNvcjpwb2ludGVyfScsJ2NvcmUnOiAnW2RhdGEtcGxheWVyXXstd2Via2l0LXRvdWNoLWNhbGxvdXQ6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LWtodG1sLXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lOy1vLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7LW1vei10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApOy1vLXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTtwb3NpdGlvbjpyZWxhdGl2ZTttYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjA7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NDAwO3RleHQtYWxpZ246Y2VudGVyO292ZXJmbG93OmhpZGRlbjtmb250LXNpemU6MTAwJTtmb250LWZhbWlseTpcImx1Y2lkYSBncmFuZGVcIix0YWhvbWEsdmVyZGFuYSxhcmlhbCxzYW5zLXNlcmlmO3RleHQtc2hhZG93OjAgMCAwO2JveC1zaXppbmc6Ym9yZGVyLWJveH1bZGF0YS1wbGF5ZXJdIGEsW2RhdGEtcGxheWVyXSBhYmJyLFtkYXRhLXBsYXllcl0gYWNyb255bSxbZGF0YS1wbGF5ZXJdIGFkZHJlc3MsW2RhdGEtcGxheWVyXSBhcHBsZXQsW2RhdGEtcGxheWVyXSBhcnRpY2xlLFtkYXRhLXBsYXllcl0gYXNpZGUsW2RhdGEtcGxheWVyXSBhdWRpbyxbZGF0YS1wbGF5ZXJdIGIsW2RhdGEtcGxheWVyXSBiaWcsW2RhdGEtcGxheWVyXSBibG9ja3F1b3RlLFtkYXRhLXBsYXllcl0gY2FudmFzLFtkYXRhLXBsYXllcl0gY2FwdGlvbixbZGF0YS1wbGF5ZXJdIGNlbnRlcixbZGF0YS1wbGF5ZXJdIGNpdGUsW2RhdGEtcGxheWVyXSBjb2RlLFtkYXRhLXBsYXllcl0gZGQsW2RhdGEtcGxheWVyXSBkZWwsW2RhdGEtcGxheWVyXSBkZXRhaWxzLFtkYXRhLXBsYXllcl0gZGZuLFtkYXRhLXBsYXllcl0gZGl2LFtkYXRhLXBsYXllcl0gZGwsW2RhdGEtcGxheWVyXSBkdCxbZGF0YS1wbGF5ZXJdIGVtLFtkYXRhLXBsYXllcl0gZW1iZWQsW2RhdGEtcGxheWVyXSBmaWVsZHNldCxbZGF0YS1wbGF5ZXJdIGZpZ2NhcHRpb24sW2RhdGEtcGxheWVyXSBmaWd1cmUsW2RhdGEtcGxheWVyXSBmb290ZXIsW2RhdGEtcGxheWVyXSBmb3JtLFtkYXRhLXBsYXllcl0gaDEsW2RhdGEtcGxheWVyXSBoMixbZGF0YS1wbGF5ZXJdIGgzLFtkYXRhLXBsYXllcl0gaDQsW2RhdGEtcGxheWVyXSBoNSxbZGF0YS1wbGF5ZXJdIGg2LFtkYXRhLXBsYXllcl0gaGVhZGVyLFtkYXRhLXBsYXllcl0gaGdyb3VwLFtkYXRhLXBsYXllcl0gaSxbZGF0YS1wbGF5ZXJdIGlmcmFtZSxbZGF0YS1wbGF5ZXJdIGltZyxbZGF0YS1wbGF5ZXJdIGlucyxbZGF0YS1wbGF5ZXJdIGtiZCxbZGF0YS1wbGF5ZXJdIGxhYmVsLFtkYXRhLXBsYXllcl0gbGVnZW5kLFtkYXRhLXBsYXllcl0gbGksW2RhdGEtcGxheWVyXSBtYXJrLFtkYXRhLXBsYXllcl0gbWVudSxbZGF0YS1wbGF5ZXJdIG5hdixbZGF0YS1wbGF5ZXJdIG9iamVjdCxbZGF0YS1wbGF5ZXJdIG9sLFtkYXRhLXBsYXllcl0gb3V0cHV0LFtkYXRhLXBsYXllcl0gcCxbZGF0YS1wbGF5ZXJdIHByZSxbZGF0YS1wbGF5ZXJdIHEsW2RhdGEtcGxheWVyXSBydWJ5LFtkYXRhLXBsYXllcl0gcyxbZGF0YS1wbGF5ZXJdIHNhbXAsW2RhdGEtcGxheWVyXSBzZWN0aW9uLFtkYXRhLXBsYXllcl0gc21hbGwsW2RhdGEtcGxheWVyXSBzcGFuLFtkYXRhLXBsYXllcl0gc3RyaWtlLFtkYXRhLXBsYXllcl0gc3Ryb25nLFtkYXRhLXBsYXllcl0gc3ViLFtkYXRhLXBsYXllcl0gc3VtbWFyeSxbZGF0YS1wbGF5ZXJdIHN1cCxbZGF0YS1wbGF5ZXJdIHRhYmxlLFtkYXRhLXBsYXllcl0gdGJvZHksW2RhdGEtcGxheWVyXSB0ZCxbZGF0YS1wbGF5ZXJdIHRmb290LFtkYXRhLXBsYXllcl0gdGgsW2RhdGEtcGxheWVyXSB0aGVhZCxbZGF0YS1wbGF5ZXJdIHRpbWUsW2RhdGEtcGxheWVyXSB0cixbZGF0YS1wbGF5ZXJdIHR0LFtkYXRhLXBsYXllcl0gdSxbZGF0YS1wbGF5ZXJdIHVsLFtkYXRhLXBsYXllcl0gdmFyLFtkYXRhLXBsYXllcl0gdmlkZW97bWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO2ZvbnQ6aW5oZXJpdDtmb250LXNpemU6MTAwJTt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX1bZGF0YS1wbGF5ZXJdIHRhYmxle2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTtib3JkZXItc3BhY2luZzowfVtkYXRhLXBsYXllcl0gY2FwdGlvbixbZGF0YS1wbGF5ZXJdIHRkLFtkYXRhLXBsYXllcl0gdGh7dGV4dC1hbGlnbjpsZWZ0O2ZvbnQtd2VpZ2h0OjQwMDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9W2RhdGEtcGxheWVyXSBibG9ja3F1b3RlLFtkYXRhLXBsYXllcl0gcXtxdW90ZXM6bm9uZX1bZGF0YS1wbGF5ZXJdIGJsb2NrcXVvdGU6YWZ0ZXIsW2RhdGEtcGxheWVyXSBibG9ja3F1b3RlOmJlZm9yZSxbZGF0YS1wbGF5ZXJdIHE6YWZ0ZXIsW2RhdGEtcGxheWVyXSBxOmJlZm9yZXtjb250ZW50OlwiXCI7Y29udGVudDpub25lfVtkYXRhLXBsYXllcl0gYSBpbWd7Ym9yZGVyOm5vbmV9W2RhdGEtcGxheWVyXSAqe21heC13aWR0aDppbml0aWFsO2JveC1zaXppbmc6aW5oZXJpdDtmbG9hdDppbml0aWFsfVtkYXRhLXBsYXllcl0uZnVsbHNjcmVlbnt3aWR0aDoxMDAlIWltcG9ydGFudDtoZWlnaHQ6MTAwJSFpbXBvcnRhbnR9W2RhdGEtcGxheWVyXS5ub2N1cnNvcntjdXJzb3I6bm9uZX0uY2xhcHByLXN0eWxle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9QG1lZGlhIHNjcmVlbntbZGF0YS1wbGF5ZXJde29wYWNpdHk6Ljk5fX0nLCdtZWRpYV9jb250cm9sJzogJ0Bmb250LWZhY2V7Zm9udC1mYW1pbHk6UGxheWVyO3NyYzp1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuZW90XCIpO3NyYzp1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuZW90PyNpZWZpeFwiKSBmb3JtYXQoXCJlbWJlZGRlZC1vcGVudHlwZVwiKSx1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIudHRmXCIpIGZvcm1hdChcInRydWV0eXBlXCIpLHVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci5zdmcjcGxheWVyXCIpIGZvcm1hdChcInN2Z1wiKX0ubWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb257LXdlYmtpdC10cmFuc2l0aW9uOm5vbmUhaW1wb3J0YW50Oy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTowczstbW96LXRyYW5zaXRpb246bm9uZSFpbXBvcnRhbnQ7LW8tdHJhbnNpdGlvbjpub25lIWltcG9ydGFudDt0cmFuc2l0aW9uOm5vbmUhaW1wb3J0YW50fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF17cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt6LWluZGV4Ojk5OTk7cG9pbnRlci1ldmVudHM6bm9uZX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLmRyYWdnaW5ne3BvaW50ZXItZXZlbnRzOmF1dG87Y3Vyc29yOi13ZWJraXQtZ3JhYmJpbmchaW1wb3J0YW50O2N1cnNvcjpncmFiYmluZyFpbXBvcnRhbnR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS5kcmFnZ2luZyAqe2N1cnNvcjotd2Via2l0LWdyYWJiaW5nIWltcG9ydGFudDtjdXJzb3I6Z3JhYmJpbmchaW1wb3J0YW50fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtYmFja2dyb3VuZFtkYXRhLWJhY2tncm91bmRde3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDo0MCU7d2lkdGg6MTAwJTtib3R0b206MDtiYWNrZ3JvdW5kLWltYWdlOi1vd2cobGluZWFyLWdyYWRpZW50KHJnYmEoMCwwLDAsMCkscmdiYSgwLDAsMCwuOSkpKTtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQobGluZWFyLWdyYWRpZW50KHJnYmEoMCwwLDAsMCkscmdiYSgwLDAsMCwuOSkpKTtiYWNrZ3JvdW5kLWltYWdlOi1tb3oobGluZWFyLWdyYWRpZW50KHJnYmEoMCwwLDAsMCkscmdiYSgwLDAsMCwuOSkpKTtiYWNrZ3JvdW5kLWltYWdlOi1vKGxpbmVhci1ncmFkaWVudChyZ2JhKDAsMCwwLDApLHJnYmEoMCwwLDAsLjkpKSk7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQocmdiYSgwLDAsMCwwKSxyZ2JhKDAsMCwwLC45KSk7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgLjZzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246b3BhY2l0eSAuNnMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IC42cyBlYXNlLW91dDt0cmFuc2l0aW9uOm9wYWNpdHkgLjZzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtaWNvbntmb250LWZhbWlseTpQbGF5ZXI7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtc2l6ZToyNnB4O2xpbmUtaGVpZ2h0OjMycHg7bGV0dGVyLXNwYWNpbmc6MDtzcGVhazpub25lO2NvbG9yOiNmZmY7b3BhY2l0eTouNTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7dGV4dC1hbGlnbjpsZWZ0Oy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlOy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2V9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1pY29uOmhvdmVye2NvbG9yOiNmZmY7b3BhY2l0eTouNzU7dGV4dC1zaGFkb3c6cmdiYSgyNTUsMjU1LDI1NSwuOCkgMCAwIDVweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLm1lZGlhLWNvbnRyb2wtaGlkZSAubWVkaWEtY29udHJvbC1iYWNrZ3JvdW5kW2RhdGEtYmFja2dyb3VuZF17b3BhY2l0eTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0ubWVkaWEtY29udHJvbC1oaWRlIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNde2JvdHRvbTotNTBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLm1lZGlhLWNvbnRyb2wtaGlkZSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItc2NydWJiZXJbZGF0YS1zZWVrYmFyXXtvcGFjaXR5OjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXXtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206N3B4O3dpZHRoOjEwMCU7aGVpZ2h0OjMycHg7dmVydGljYWwtYWxpZ246bWlkZGxlO3BvaW50ZXItZXZlbnRzOmF1dG87LXdlYmtpdC10cmFuc2l0aW9uOmJvdHRvbSAuNHM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjpib3R0b20gLjRzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246Ym90dG9tIC40cyBlYXNlLW91dDt0cmFuc2l0aW9uOmJvdHRvbSAuNHMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1sZWZ0LXBhbmVsW2RhdGEtbWVkaWEtY29udHJvbF17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDo0cHg7aGVpZ2h0OjEwMCV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1jZW50ZXItcGFuZWxbZGF0YS1tZWRpYS1jb250cm9sXXtoZWlnaHQ6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjtsaW5lLWhlaWdodDozMnB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtcmlnaHQtcGFuZWxbZGF0YS1tZWRpYS1jb250cm9sXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDo0cHg7aGVpZ2h0OjEwMCV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b257YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MDttYXJnaW46MCA2cHg7cGFkZGluZzowO2N1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uOmZvY3Vze291dGxpbmU6MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlde2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjIwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5XTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wYXVzZV17ZmxvYXQ6bGVmdDtoZWlnaHQ6MTAwJTtmb250LXNpemU6MjBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBhdXNlXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAyXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1zdG9wXXtmbG9hdDpsZWZ0O2hlaWdodDoxMDAlO2ZvbnQtc2l6ZToyMHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtc3RvcF06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwM1wifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtZnVsbHNjcmVlbl17ZmxvYXQ6cmlnaHQ7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MDtoZWlnaHQ6MTAwJX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWZ1bGxzY3JlZW5dOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDZcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWZ1bGxzY3JlZW5dLnNocmluazpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDA3XCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1oZC1pbmRpY2F0b3Jde2N1cnNvcjpkZWZhdWx0O2Zsb2F0OnJpZ2h0O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjA7aGVpZ2h0OjEwMCU7b3BhY2l0eTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDA4XCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1oZC1pbmRpY2F0b3JdLmVuYWJsZWR7b3BhY2l0eToxfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXS5lbmFibGVkOmhvdmVye29wYWNpdHk6MTt0ZXh0LXNoYWRvdzpub25lfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXBhdXNlXXtmbG9hdDpsZWZ0O2hlaWdodDoxMDAlO2ZvbnQtc2l6ZToyMHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXBhdXNlXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5cGF1c2VdLnBsYXlpbmc6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMlwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXBhdXNlXS5wYXVzZWQ6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3Bde2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjIwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5c3RvcF06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3BdLnBsYXlpbmc6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwM1wifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3BdLnN0b3BwZWQ6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtZHVyYXRpb25dLC5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtcG9zaXRpb25de2Rpc3BsYXk6aW5saW5lLWJsb2NrO2ZvbnQtc2l6ZToxMHB4O2NvbG9yOiNmZmY7Y3Vyc29yOmRlZmF1bHQ7bGluZS1oZWlnaHQ6MzJweDtwb3NpdGlvbjpyZWxhdGl2ZX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLXBvc2l0aW9uXXttYXJnaW4tbGVmdDo2cHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1kdXJhdGlvbl17Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNSk7bWFyZ2luLXJpZ2h0OjZweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLWR1cmF0aW9uXTpiZWZvcmV7Y29udGVudDpcInxcIjttYXJnaW46MCAzcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJde3Bvc2l0aW9uOmFic29sdXRlO3RvcDotMjBweDtsZWZ0OjA7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO3dpZHRoOjEwMCU7aGVpZ2h0OjI1cHg7Y3Vyc29yOnBvaW50ZXJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJde3dpZHRoOjEwMCU7aGVpZ2h0OjFweDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTJweDtiYWNrZ3JvdW5kLWNvbG9yOiM2NjZ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItZmlsbC0xW2RhdGEtc2Vla2Jhcl17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjA7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1jb2xvcjojYzJjMmMyOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dDstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWZpbGwtMltkYXRhLXNlZWtiYXJde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDowO2hlaWdodDoxMDAlO2JhY2tncm91bmQtY29sb3I6IzAwNWFmZjstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0O3RyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1ob3ZlcltkYXRhLXNlZWtiYXJde29wYWNpdHk6MDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTNweDt3aWR0aDo1cHg7aGVpZ2h0OjdweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjUpOy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZTstbW96LXRyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZTstby10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2U7dHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXTpob3ZlciAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWhvdmVyW2RhdGEtc2Vla2Jhcl17b3BhY2l0eToxfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXS5zZWVrLWRpc2FibGVke2N1cnNvcjpkZWZhdWx0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXS5zZWVrLWRpc2FibGVkOmhvdmVyIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItaG92ZXJbZGF0YS1zZWVrYmFyXXtvcGFjaXR5OjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItc2NydWJiZXJbZGF0YS1zZWVrYmFyXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MnB4O2xlZnQ6MDt3aWR0aDoyMHB4O2hlaWdodDoyMHB4O29wYWNpdHk6MTstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0O3RyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1zY3J1YmJlcltkYXRhLXNlZWtiYXJdIC5iYXItc2NydWJiZXItaWNvbltkYXRhLXNlZWtiYXJde3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6NnB4O3RvcDo2cHg7d2lkdGg6OHB4O2hlaWdodDo4cHg7Ym9yZGVyLXJhZGl1czoxMHB4O2JveC1zaGFkb3c6MCAwIDAgNnB4IHJnYmEoMjU1LDI1NSwyNTUsLjIpO2JhY2tncm91bmQtY29sb3I6I2ZmZn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXXtmbG9hdDpyaWdodDtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6MzJweDtjdXJzb3I6cG9pbnRlcjttYXJnaW46MCA2cHg7Ym94LXNpemluZzpib3JkZXItYm94fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVde2Zsb2F0OmxlZnQ7Ym90dG9tOjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXXtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjowO2JveC1zaXppbmc6Y29udGVudC1ib3g7d2lkdGg6MTZweDtoZWlnaHQ6MzJweDttYXJnaW4tcmlnaHQ6NnB4O29wYWNpdHk6MX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdOmhvdmVye29wYWNpdHk6MX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDRcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdLm11dGVke29wYWNpdHk6LjV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXS5tdXRlZDpob3ZlcntvcGFjaXR5Oi43fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV0ubXV0ZWQ6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwNVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXXtmbG9hdDpsZWZ0O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo2cHg7d2lkdGg6NDJweDtoZWlnaHQ6MThweDtwYWRkaW5nOjNweCAwO292ZXJmbG93OmhpZGRlbjstd2Via2l0LXRyYW5zaXRpb246d2lkdGggLjJzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246d2lkdGggLjJzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246d2lkdGggLjJzIGVhc2Utb3V0O3RyYW5zaXRpb246d2lkdGggLjJzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuc2VnbWVudGVkLWJhci1lbGVtZW50W2RhdGEtdm9sdW1lXXtmbG9hdDpsZWZ0O3dpZHRoOjRweDtwYWRkaW5nLWxlZnQ6MnB4O2hlaWdodDoxMnB4O29wYWNpdHk6LjU7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstbW96LWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1tcy1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstby1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjtib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstd2Via2l0LXRyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjJzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246LW1vei10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246LW8tdHJhbnNmb3JtIC4ycyBlYXNlLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5zZWdtZW50ZWQtYmFyLWVsZW1lbnRbZGF0YS12b2x1bWVdLmZpbGx7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstbW96LWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1tcy1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstby1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjtib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjtvcGFjaXR5OjF9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5zZWdtZW50ZWQtYmFyLWVsZW1lbnRbZGF0YS12b2x1bWVdOm50aC1vZi10eXBlKDEpe3BhZGRpbmctbGVmdDowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuc2VnbWVudGVkLWJhci1lbGVtZW50W2RhdGEtdm9sdW1lXTpob3Zlcnstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoMS41KTstbW96LXRyYW5zZm9ybTpzY2FsZVkoMS41KTstbXMtdHJhbnNmb3JtOnNjYWxlWSgxLjUpOy1vLXRyYW5zZm9ybTpzY2FsZVkoMS41KTt0cmFuc2Zvcm06c2NhbGVZKDEuNSl9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS53MzIwIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0udm9sdW1lLWJhci1oaWRle2hlaWdodDoxMnB4O3RvcDo5cHg7cGFkZGluZzowO3dpZHRoOjB9Jywnc2Vla190aW1lJzogJy5zZWVrLXRpbWVbZGF0YS1zZWVrLXRpbWVde3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOmF1dG87aGVpZ2h0OjIwcHg7bGluZS1oZWlnaHQ6MjBweDtib3R0b206NTVweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMiwyLDIsLjUpO3otaW5kZXg6OTk5OTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2U7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2U7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlO3RyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZX0uc2Vlay10aW1lW2RhdGEtc2Vlay10aW1lXS5oaWRkZW5bZGF0YS1zZWVrLXRpbWVde29wYWNpdHk6MH0uc2Vlay10aW1lW2RhdGEtc2Vlay10aW1lXSBzcGFuW2RhdGEtc2Vlay10aW1lXXtwb3NpdGlvbjpyZWxhdGl2ZTtjb2xvcjojZmZmO2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctbGVmdDo3cHg7cGFkZGluZy1yaWdodDo3cHh9JywnZmxhc2gnOiAnW2RhdGEtZmxhc2hde3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojMDAwO2Rpc3BsYXk6YmxvY2s7cG9pbnRlci1ldmVudHM6bm9uZX0nLCdobHMnOiAnW2RhdGEtaGxzXXtwb3NpdGlvbjphYnNvbHV0ZTtkaXNwbGF5OmJsb2NrO3BvaW50ZXItZXZlbnRzOm5vbmU7dG9wOjB9JywnaHRtbDVfdmlkZW8nOiAnW2RhdGEtaHRtbDUtdmlkZW9de3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7ZGlzcGxheTpibG9ja30nLCdodG1sX2ltZyc6ICdbZGF0YS1odG1sLWltZ117bWF4LXdpZHRoOjEwMCU7bWF4LWhlaWdodDoxMDAlfScsJ25vX29wJzogJ1tkYXRhLW5vLW9wXXt6LWluZGV4OjEwMDA7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcn1bZGF0YS1uby1vcF0gcFtkYXRhLW5vLW9wLW1zZ117cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOjI1cHg7dG9wOjQwJTtjb2xvcjojZmZmfVtkYXRhLW5vLW9wXSBjYW52YXNbZGF0YS1uby1vcC1jYW52YXNde2JhY2tncm91bmQtY29sb3I6Izc3NztoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfScsJ2JhY2tncm91bmRfYnV0dG9uJzogJy5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXXtmb250LWZhbWlseTpQbGF5ZXI7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjIpO3BvaW50ZXItZXZlbnRzOm5vbmU7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuNHM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjphbGwgLjRzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246YWxsIC40cyBlYXNlLW91dDt0cmFuc2l0aW9uOmFsbCAuNHMgZWFzZS1vdXR9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dLmhpZGV7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0uaGlkZSAuYmFja2dyb3VuZC1idXR0b24td3JhcHBlcltkYXRhLWJhY2tncm91bmQtYnV0dG9uXXtvcGFjaXR5OjB9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25de3Bvc2l0aW9uOmFic29sdXRlO292ZXJmbG93OmhpZGRlbjt3aWR0aDoxMDAlO2hlaWdodDoyNSU7bGluZS1oZWlnaHQ6MTAwJTtmb250LXNpemU6MjUlO3RvcDo1MCU7dGV4dC1hbGlnbjpjZW50ZXJ9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi1pY29uW2RhdGEtYmFja2dyb3VuZC1idXR0b25de2N1cnNvcjpwb2ludGVyO3BvaW50ZXItZXZlbnRzOmF1dG87Zm9udC1mYW1pbHk6UGxheWVyO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXN0eWxlOm5vcm1hbDtsaW5lLWhlaWdodDoxO2xldHRlci1zcGFjaW5nOjA7c3BlYWs6bm9uZTtjb2xvcjojZmZmO29wYWNpdHk6Ljc1O2JvcmRlcjowO291dGxpbmU6MDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50Oy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlOy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2V9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi1pY29uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dOmhvdmVye29wYWNpdHk6MTt0ZXh0LXNoYWRvdzpyZ2JhKDI1NSwyNTUsMjU1LC44KSAwIDAgMTVweH0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLXdyYXBwZXJbZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLWljb25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0ucGxheWluZzpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAyXCJ9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi1pY29uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dLm5vdHBsYXlpbmc6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24td3JhcHBlcltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24taWNvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXS5wbGF5c3RvcC5wbGF5aW5nOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDNcIn0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLXdyYXBwZXJbZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLWljb25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0ucGxheXN0b3Aubm90cGxheWluZzpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2wubWVkaWEtY29udHJvbC1oaWRlW2RhdGEtbWVkaWEtY29udHJvbF0gLmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25de29wYWNpdHk6MH0nLCdjaHJvbWVjYXN0JzogJy5jaHJvbWVjYXN0LXBsYXliYWNre2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LmNocm9tZWNhc3QtcGxheWJhY2stb3ZlcmxheXtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7aGVpZ2h0OjEwMCU7b3BhY2l0eTouNjt3aWR0aDoxMDAlfUBmb250LWZhY2V7Zm9udC1mYW1pbHk6Y2hyb21lY2FzdDtzcmM6dXJsKGFzc2V0cy9jaHJvbWVjYXN0LmVvdD8tMnJ3YjZ0KTtzcmM6dXJsKGFzc2V0cy9jaHJvbWVjYXN0LmVvdD8jaWVmaXgtMnJ3YjZ0KSBmb3JtYXQoXCJlbWJlZGRlZC1vcGVudHlwZVwiKSx1cmwoYXNzZXRzL2Nocm9tZWNhc3Qud29mZj8tMnJ3YjZ0KSBmb3JtYXQoXCJ3b2ZmXCIpLHVybChhc3NldHMvY2hyb21lY2FzdC50dGY/LTJyd2I2dCkgZm9ybWF0KFwidHJ1ZXR5cGVcIiksdXJsKGFzc2V0cy9jaHJvbWVjYXN0LnN2Zz8tMnJ3YjZ0I2Nocm9tZWNhc3QpIGZvcm1hdChcInN2Z1wiKTtmb250LXdlaWdodDo0MDA7Zm9udC1zdHlsZTpub3JtYWx9LmNocm9tZWNhc3QtYnV0dG9ue2JhY2tncm91bmQ6MCAwO2JvcmRlcjowO3dpZHRoOjMycHg7aGVpZ2h0OjI2cHg7Zm9udC1zaXplOjIycHg7bGluZS1oZWlnaHQ6MjZweDtsZXR0ZXItc3BhY2luZzowO2NvbG9yOiNmZmY7b3BhY2l0eTouNTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7dGV4dC1hbGlnbjpsZWZ0O2N1cnNvcjpwb2ludGVyOy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZX0uY2hyb21lY2FzdC1idXR0b246aG92ZXJ7b3BhY2l0eTouNzU7dGV4dC1zaGFkb3c6cmdiYSgyNTUsMjU1LDI1NSwuOCkgMCAwIDVweH0uY2hyb21lY2FzdC1idXR0b246Zm9jdXN7b3V0bGluZTowfS5jaHJvbWVjYXN0LWljb257Zm9udC1mYW1pbHk6Y2hyb21lY2FzdDtzcGVhazpub25lO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXZhcmlhbnQ6bm9ybWFsO3RleHQtdHJhbnNmb3JtOm5vbmU7LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGV9Lmljb24tY2FzdDpiZWZvcmV7Y29udGVudDpcIlxcXFxlNjAwXCJ9Lmljb24tY2FzdC1jb25uZWN0ZWQ6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTYwMVwifScsJ2R2cl9jb250cm9scyc6ICdAaW1wb3J0IHVybChodHRwOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG8pOy5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNde2Rpc3BsYXk6aW5saW5lLWJsb2NrO2Zsb2F0OmxlZnQ7Y29sb3I6I2ZmZjtsaW5lLWhlaWdodDozMnB4O2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OjcwMDttYXJnaW4tbGVmdDo2cHh9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtaW5mb3tjdXJzb3I6ZGVmYXVsdDtmb250LWZhbWlseTpSb2JvdG8sXCJPcGVuIFNhbnNcIixBcmlhbCxzYW5zLXNlcmlmfS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm86YmVmb3Jle2NvbnRlbnQ6XCJcIjtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo3cHg7aGVpZ2h0OjdweDtib3JkZXItcmFkaXVzOjMuNXB4O21hcmdpbi1yaWdodDozLjVweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjAxMDF9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtaW5mby5kaXNhYmxlZHtvcGFjaXR5Oi4zfS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm8uZGlzYWJsZWQ6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6I2ZmZn0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1idXR0b257Y3Vyc29yOnBvaW50ZXI7b3V0bGluZTowO2Rpc3BsYXk6bm9uZTtib3JkZXI6MDtjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7aGVpZ2h0OjMycHg7cGFkZGluZzowO29wYWNpdHk6Ljc7Zm9udC1mYW1pbHk6Um9ib3RvLFwiT3BlbiBTYW5zXCIsQXJpYWwsc2Fucy1zZXJpZjstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZTstbW96LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlOy1vLXRyYW5zaXRpb246YWxsIC4xcyBlYXNlO3RyYW5zaXRpb246YWxsIC4xcyBlYXNlfS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWJ1dHRvbjpiZWZvcmV7Y29udGVudDpcIlwiO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjdweDtoZWlnaHQ6N3B4O2JvcmRlci1yYWRpdXM6My41cHg7bWFyZ2luLXJpZ2h0OjMuNXB4O2JhY2tncm91bmQtY29sb3I6I2ZmZn0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1idXR0b246aG92ZXJ7b3BhY2l0eToxO3RleHQtc2hhZG93OnJnYmEoMjU1LDI1NSwyNTUsLjc1KSAwIDAgNXB4fS5kdnIgLmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtaW5mb3tkaXNwbGF5Om5vbmV9LmR2ciAuZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1idXR0b257ZGlzcGxheTpibG9ja30uZHZyLm1lZGlhLWNvbnRyb2wubGl2ZVtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1maWxsLTJbZGF0YS1zZWVrYmFyXXtiYWNrZ3JvdW5kLWNvbG9yOiMwMDVhZmZ9Lm1lZGlhLWNvbnRyb2wubGl2ZVtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1maWxsLTJbZGF0YS1zZWVrYmFyXXtiYWNrZ3JvdW5kLWNvbG9yOiNmZjAxMDF9LnNlZWstdGltZVtkYXRhLXNlZWstdGltZV0gc3BhbltkYXRhLWR1cmF0aW9uXXtwb3NpdGlvbjpyZWxhdGl2ZTtjb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC41KTtmb250LXNpemU6MTBweDtwYWRkaW5nLXJpZ2h0OjdweH0uc2Vlay10aW1lW2RhdGEtc2Vlay10aW1lXSBzcGFuW2RhdGEtZHVyYXRpb25dOmJlZm9yZXtjb250ZW50OlwifFwiO21hcmdpbi1yaWdodDo3cHh9JywncG9zdGVyJzogJ0Bmb250LWZhY2V7Zm9udC1mYW1pbHk6UGxheWVyO3NyYzp1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuZW90XCIpO3NyYzp1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuZW90PyNpZWZpeFwiKSBmb3JtYXQoXCJlbWJlZGRlZC1vcGVudHlwZVwiKSx1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIudHRmXCIpIGZvcm1hdChcInRydWV0eXBlXCIpLHVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci5zdmcjcGxheWVyXCIpIGZvcm1hdChcInN2Z1wiKX0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl17Y3Vyc29yOnBvaW50ZXI7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTt6LWluZGV4Ojk5ODt0b3A6MH0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl0gLnBvc3Rlci1iYWNrZ3JvdW5kW2RhdGEtcG9zdGVyXXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtc2l6ZTpjb3ZlcjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1wb3NpdGlvbjo1MCUgNTAlfS5wbGF5ZXItcG9zdGVyW2RhdGEtcG9zdGVyXSAucGxheS13cmFwcGVyW2RhdGEtcG9zdGVyXXtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2hlaWdodDoyNSU7bGluZS1oZWlnaHQ6MTAwJTtmb250LXNpemU6MjUlO3RvcDo1MCU7dGV4dC1hbGlnbjpjZW50ZXJ9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJdIC5wbGF5LXdyYXBwZXJbZGF0YS1wb3N0ZXJdIC5wb3N0ZXItaWNvbltkYXRhLXBvc3Rlcl17Zm9udC1mYW1pbHk6UGxheWVyO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXN0eWxlOm5vcm1hbDtsaW5lLWhlaWdodDoxO2xldHRlci1zcGFjaW5nOjA7c3BlYWs6bm9uZTtjb2xvcjojZmZmO29wYWNpdHk6Ljc1Oy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlOy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IHRleHQtc2hhZG93Oy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTouMXM7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgdGV4dC1zaGFkb3cgLjFzOy1vLXRyYW5zaXRpb246b3BhY2l0eSB0ZXh0LXNoYWRvdyAuMXM7dHJhbnNpdGlvbjpvcGFjaXR5IHRleHQtc2hhZG93IC4xcyBlYXNlfS5wbGF5ZXItcG9zdGVyW2RhdGEtcG9zdGVyXSAucGxheS13cmFwcGVyW2RhdGEtcG9zdGVyXSAucG9zdGVyLWljb25bZGF0YS1wb3N0ZXJdLnBsYXlbZGF0YS1wb3N0ZXJdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl0gLnBsYXktd3JhcHBlcltkYXRhLXBvc3Rlcl0gLnBvc3Rlci1pY29uW2RhdGEtcG9zdGVyXTpob3ZlcntvcGFjaXR5OjE7dGV4dC1zaGFkb3c6cmdiYSgyNTUsMjU1LDI1NSwuOCkgMCAwIDE1cHh9Jywnc3Bpbm5lcl90aHJlZV9ib3VuY2UnOiAnLnNwaW5uZXItdGhyZWUtYm91bmNlW2RhdGEtc3Bpbm5lcl17cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luOjAgYXV0bzt3aWR0aDo3MHB4O3RleHQtYWxpZ246Y2VudGVyO3otaW5kZXg6OTk5O3RvcDo0NyU7bGVmdDowO3JpZ2h0OjB9LnNwaW5uZXItdGhyZWUtYm91bmNlW2RhdGEtc3Bpbm5lcl0+ZGl2e3dpZHRoOjE4cHg7aGVpZ2h0OjE4cHg7YmFja2dyb3VuZC1jb2xvcjojRkZGO2JvcmRlci1yYWRpdXM6MTAwJTtkaXNwbGF5OmlubGluZS1ibG9jazstd2Via2l0LWFuaW1hdGlvbjpib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy1tb3otYW5pbWF0aW9uOmJvdW5jZWRlbGF5IDEuNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7LW1zLWFuaW1hdGlvbjpib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy1vLWFuaW1hdGlvbjpib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0O2FuaW1hdGlvbjpib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy13ZWJraXQtYW5pbWF0aW9uLWZpbGwtbW9kZTpib3RoOy1tb3otYW5pbWF0aW9uLWZpbGwtbW9kZTpib3RoOy1tcy1hbmltYXRpb24tZmlsbC1tb2RlOmJvdGg7LW8tYW5pbWF0aW9uLWZpbGwtbW9kZTpib3RoO2FuaW1hdGlvbi1maWxsLW1vZGU6Ym90aH0uc3Bpbm5lci10aHJlZS1ib3VuY2VbZGF0YS1zcGlubmVyXSBbZGF0YS1ib3VuY2UxXSwuc3Bpbm5lci10aHJlZS1ib3VuY2VbZGF0YS1zcGlubmVyXSBbZGF0YS1ib3VuY2UyXXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotLjMyczstbW96LWFuaW1hdGlvbi1kZWxheTotLjMyczstbXMtYW5pbWF0aW9uLWRlbGF5Oi0uMzJzOy1vLWFuaW1hdGlvbi1kZWxheTotLjMyczthbmltYXRpb24tZGVsYXk6LS4zMnN9QC1tb3ota2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley1tb3otdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX00MCV7LW1vei10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpfX1ALXdlYmtpdC1rZXlmcmFtZXMgYm91bmNlZGVsYXl7MCUsMTAwJSw4MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfTQwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fUAtby1rZXlmcmFtZXMgYm91bmNlZGVsYXl7MCUsMTAwJSw4MCV7LW8tdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX00MCV7LW8tdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19QC1tcy1rZXlmcmFtZXMgYm91bmNlZGVsYXl7MCUsMTAwJSw4MCV7LW1zLXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9NDAley1tcy10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpfX1Aa2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAle3RyYW5zZm9ybTpzY2FsZSgwKX00MCV7dHJhbnNmb3JtOnNjYWxlKDEpfX0nLCd3YXRlcm1hcmsnOiAnW2RhdGEtd2F0ZXJtYXJrXXtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW46MTAwcHggYXV0byAwO3dpZHRoOjcwcHg7dGV4dC1hbGlnbjpjZW50ZXI7ei1pbmRleDoxMH1bZGF0YS13YXRlcm1hcmstYm90dG9tLWxlZnRde2JvdHRvbToxMHB4O2xlZnQ6MTBweH1bZGF0YS13YXRlcm1hcmstYm90dG9tLXJpZ2h0XXtib3R0b206MTBweDtyaWdodDo0MnB4fVtkYXRhLXdhdGVybWFyay10b3AtbGVmdF17dG9wOi05NXB4O2xlZnQ6MTBweH1bZGF0YS13YXRlcm1hcmstdG9wLXJpZ2h0XXt0b3A6LTk1cHg7cmlnaHQ6MzdweH0nLH19OyIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlJyk7XG52YXIgSlNUID0gcmVxdWlyZSgnLi9qc3QnKTtcblxudmFyIFN0eWxlciA9IHtcbiAgZ2V0U3R5bGVGb3I6IGZ1bmN0aW9uKG5hbWUsIG9wdGlvbnM9e2Jhc2VVcmw6ICcnfSkge1xuICAgIHJldHVybiAkKCc8c3R5bGUgY2xhc3M9XCJjbGFwcHItc3R5bGVcIj48L3N0eWxlPicpLmh0bWwodGVtcGxhdGUoSlNULkNTU1tuYW1lXSkob3B0aW9ucykpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlcjtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guYXNzaWduJylcbnZhciBCcm93c2VyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9icm93c2VyJylcblxudmFyIGV4dGVuZCA9IGZ1bmN0aW9uKHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzXG4gIHZhciBjaGlsZFxuXG4gIGlmIChwcm90b1Byb3BzICYmIHByb3RvUHJvcHMuY29uc3RydWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgIGNoaWxkID0gcHJvdG9Qcm9wcy5jb25zdHJ1Y3RvclxuICB9IGVsc2Uge1xuICAgIGNoaWxkID0gZnVuY3Rpb24oKXsgcmV0dXJuIHBhcmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9XG4gIH1cblxuICBhc3NpZ24oY2hpbGQsIHBhcmVudCwgc3RhdGljUHJvcHMpXG5cbiAgdmFyIFN1cnJvZ2F0ZSA9IGZ1bmN0aW9uKCl7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfVxuICBTdXJyb2dhdGUucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZVxuICBjaGlsZC5wcm90b3R5cGUgPSBuZXcgU3Vycm9nYXRlKClcblxuICBpZiAocHJvdG9Qcm9wcykgYXNzaWduKGNoaWxkLnByb3RvdHlwZSwgcHJvdG9Qcm9wcylcblxuICBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlXG5cbiAgY2hpbGQuc3VwZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHBhcmVudC5wcm90b3R5cGVbbmFtZV1cbiAgfVxuXG4gIGNoaWxkLnByb3RvdHlwZS5nZXRDbGFzcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjaGlsZFxuICB9XG5cbiAgcmV0dXJuIGNoaWxkXG59XG5cbnZhciBmb3JtYXRUaW1lID0gZnVuY3Rpb24odGltZSkge1xuICAgIHRpbWUgPSB0aW1lICogMTAwMFxuICAgIHRpbWUgPSBwYXJzZUludCh0aW1lLzEwMDApXG4gICAgdmFyIHNlY29uZHMgPSB0aW1lICUgNjBcbiAgICB0aW1lID0gcGFyc2VJbnQodGltZS82MClcbiAgICB2YXIgbWludXRlcyA9IHRpbWUgJSA2MFxuICAgIHRpbWUgPSBwYXJzZUludCh0aW1lLzYwKVxuICAgIHZhciBob3VycyA9IHRpbWUgJSAyNFxuICAgIHZhciBvdXQgPSBcIlwiXG4gICAgaWYgKGhvdXJzICYmIGhvdXJzID4gMCkgb3V0ICs9IChcIjBcIiArIGhvdXJzKS5zbGljZSgtMikgKyBcIjpcIlxuICAgIG91dCArPSAoXCIwXCIgKyBtaW51dGVzKS5zbGljZSgtMikgKyBcIjpcIlxuICAgIG91dCArPSAoXCIwXCIgKyBzZWNvbmRzKS5zbGljZSgtMilcbiAgICByZXR1cm4gb3V0LnRyaW0oKVxufVxuXG52YXIgRnVsbHNjcmVlbiA9IHtcbiAgaXNGdWxsc2NyZWVuOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgfHxcbiAgICAgIGRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlbiB8fFxuICAgICAgZG9jdW1lbnQubW96RnVsbFNjcmVlbiB8fFxuICAgICAgISFkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50XG4gICAgKVxuICB9LFxuICByZXF1ZXN0RnVsbHNjcmVlbjogZnVuY3Rpb24oZWwpIHtcbiAgICBpZihlbC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgZWwucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZihlbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgZWwud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZihlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4oKVxuICAgIH0gZWxzZSBpZihlbC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICBlbC5tc1JlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKGVsLnF1ZXJ5U2VsZWN0b3IgJiYgZWwucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpLndlYmtpdEVudGVyRnVsbFNjcmVlbikge1xuICAgICAgZWwucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpLndlYmtpdEVudGVyRnVsbFNjcmVlbigpXG4gICAgfVxuICB9LFxuICBjYW5jZWxGdWxsc2NyZWVuOiBmdW5jdGlvbigpIHtcbiAgICBpZihkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZihkb2N1bWVudC53ZWJraXRDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICBkb2N1bWVudC53ZWJraXRDYW5jZWxGdWxsU2NyZWVuKClcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpXG4gICAgfSBlbHNlIGlmKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKVxuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBDb25maWcge1xuXG4gIHN0YXRpYyBfZGVmYXVsdENvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdm9sdW1lOiB7XG4gICAgICAgIHZhbHVlOiAxMDAsXG4gICAgICAgIHBhcnNlOiBwYXJzZUludFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBfZGVmYXVsdFZhbHVlRm9yKGtleSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdENvbmZpZygpW2tleV1bJ3BhcnNlJ10odGhpcy5fZGVmYXVsdENvbmZpZygpW2tleV1bJ3ZhbHVlJ10pXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIF9jcmVhdGVfa2V5c3BhY2Uoa2V5KXtcbiAgICByZXR1cm4gJ2NsYXBwci4nICsgZG9jdW1lbnQuZG9tYWluICsgJy4nICsga2V5XG4gIH1cblxuICBzdGF0aWMgcmVzdG9yZShrZXkpIHtcbiAgICBpZiAoQnJvd3Nlci5oYXNMb2NhbHN0b3JhZ2UgJiYgbG9jYWxTdG9yYWdlW3RoaXMuX2NyZWF0ZV9rZXlzcGFjZShrZXkpXSl7XG4gICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdENvbmZpZygpW2tleV1bJ3BhcnNlJ10obG9jYWxTdG9yYWdlW3RoaXMuX2NyZWF0ZV9rZXlzcGFjZShrZXkpXSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRWYWx1ZUZvcihrZXkpXG4gIH1cblxuICBzdGF0aWMgcGVyc2lzdChrZXksIHZhbHVlKSB7XG4gICAgaWYgKEJyb3dzZXIuaGFzTG9jYWxzdG9yYWdlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBsb2NhbFN0b3JhZ2VbdGhpcy5fY3JlYXRlX2tleXNwYWNlKGtleSldID0gdmFsdWVcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudmFyIHNlZWtTdHJpbmdUb1NlY29uZHMgPSBmdW5jdGlvbih1cmwpIHtcbiAgdmFyIGVsZW1lbnRzID0gKHVybC5tYXRjaCgvdD0oWzAtOV0qaCk/KFswLTldKm0pPyhbMC05XSpzKT8vKSB8fCBbXSkuc3BsaWNlKDEpXG4gIHJldHVybiAoISFlbGVtZW50cy5sZW5ndGgpPyBlbGVtZW50cy5tYXAoZnVuY3Rpb24gKGVsKSB7XG4gICAgaWYgKGVsKSB7XG4gICAgICB2YXIgdmFsdWUgPSBwYXJzZUludChlbC5zbGljZSgwLDIpKSB8fCAwXG4gICAgICBzd2l0Y2ggKGVsW2VsLmxlbmd0aC0xXSkge1xuICAgICAgICBjYXNlICdoJzogdmFsdWUgPSB2YWx1ZSAqIDM2MDA7IGJyZWFrXG4gICAgICAgIGNhc2UgJ20nOiB2YWx1ZSA9IHZhbHVlICogNjA7IGJyZWFrXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfSkucmVkdWNlKGZ1bmN0aW9uIChhLGIpIHsgcmV0dXJuIGErYjsgfSk6IDBcbn1cblxudmFyIGlkc0NvdW50ZXIgPSB7fVxuXG52YXIgdW5pcXVlSWQgPSBmdW5jdGlvbihwcmVmaXgpIHtcbiAgaWRzQ291bnRlcltwcmVmaXhdIHx8IChpZHNDb3VudGVyW3ByZWZpeF0gPSAwKVxuICB2YXIgaWQgPSArK2lkc0NvdW50ZXJbcHJlZml4XVxuICByZXR1cm4gcHJlZml4ICsgaWRcbn1cblxudmFyIGlzTnVtYmVyID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlIC0gcGFyc2VGbG9hdCh2YWx1ZSkgKyAxID49IDBcbn1cblxudmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmbikgPT4gd2luZG93LnNldFRpbWVvdXQoZm4sIDEwMDAvNjApXG5cbnZhciBjYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXRcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGV4dGVuZDogZXh0ZW5kLFxuICBmb3JtYXRUaW1lOiBmb3JtYXRUaW1lLFxuICBGdWxsc2NyZWVuOiBGdWxsc2NyZWVuLFxuICBDb25maWc6IENvbmZpZyxcbiAgc2Vla1N0cmluZ1RvU2Vjb25kczogc2Vla1N0cmluZ1RvU2Vjb25kcyxcbiAgdW5pcXVlSWQ6IHVuaXF1ZUlkLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZTogcmVxdWVzdEFuaW1hdGlvbkZyYW1lLFxuICBjYW5jZWxBbmltYXRpb25GcmFtZTogY2FuY2VsQW5pbWF0aW9uRnJhbWVcbn1cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogQ29udGFpbmVyIGlzIHJlc3BvbnNpYmxlIGZvciB0aGUgdmlkZW8gcmVuZGVyaW5nIGFuZCBzdGF0ZVxuICovXG5cbnZhciBVSU9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdWlfb2JqZWN0Jyk7XG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJylcblxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgVUlPYmplY3Qge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdDb250YWluZXInIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7IHJldHVybiB7IGNsYXNzOiAnY29udGFpbmVyJywgJ2RhdGEtY29udGFpbmVyJzogJycgfSB9XG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHsnY2xpY2snOiAnY2xpY2tlZCcsICdtb3VzZWVudGVyJzogJ21vdXNlRW50ZXInLCAnbW91c2VsZWF2ZSc6ICdtb3VzZUxlYXZlJ31cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLnBsYXliYWNrID0gb3B0aW9ucy5wbGF5YmFjaztcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5wbGF5YmFjay5zZXR0aW5ncztcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLm1lZGlhQ29udHJvbERpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5wbHVnaW5zID0gW3RoaXMucGxheWJhY2tdO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgdGhpcy5wcm9ncmVzcyk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy50aW1lVXBkYXRlZCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMucmVhZHkpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5idWZmZXJpbmcpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsIHRoaXMuYnVmZmVyZnVsbCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfU0VUVElOR1NVUERBVEUsIHRoaXMuc2V0dGluZ3NVcGRhdGUpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0xPQURFRE1FVEFEQVRBLCB0aGlzLmxvYWRlZE1ldGFkYXRhKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19ISUdIREVGSU5JVElPTlVQREFURSwgdGhpcy5oaWdoRGVmaW5pdGlvblVwZGF0ZSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfQklUUkFURSwgdGhpcy51cGRhdGVCaXRyYXRlKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19QTEFZQkFDS1NUQVRFLCB0aGlzLnBsYXliYWNrU3RhdGVDaGFuZ2VkKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19EVlIsIHRoaXMucGxheWJhY2tEdnJTdGF0ZUNoYW5nZWQpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX01FRElBQ09OVFJPTF9ESVNBQkxFLCB0aGlzLmRpc2FibGVNZWRpYUNvbnRyb2wpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX01FRElBQ09OVFJPTF9FTkFCTEUsIHRoaXMuZW5hYmxlTWVkaWFDb250cm9sKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19FTkRFRCwgdGhpcy5lbmRlZCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUExBWSwgdGhpcy5wbGF5aW5nKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19FUlJPUiwgdGhpcy5lcnJvcik7XG4gIH1cblxuICBwbGF5YmFja1N0YXRlQ2hhbmdlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS1NUQVRFKTtcbiAgfVxuXG4gIHBsYXliYWNrRHZyU3RhdGVDaGFuZ2VkKGR2ckluVXNlKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMucGxheWJhY2suc2V0dGluZ3NcbiAgICB0aGlzLmR2ckluVXNlID0gZHZySW5Vc2VcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCwgZHZySW5Vc2UpXG4gIH1cblxuICB1cGRhdGVCaXRyYXRlKG5ld0JpdHJhdGUpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9CSVRSQVRFLCBuZXdCaXRyYXRlKVxuICB9XG5cbiAgc3RhdHNSZXBvcnQobWV0cmljcykge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NUQVRTX1JFUE9SVCwgbWV0cmljcylcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFjay5nZXRQbGF5YmFja1R5cGUoKVxuICB9XG5cbiAgaXNEdnJFbmFibGVkKCkge1xuICAgIHJldHVybiAhIXRoaXMucGxheWJhY2suZHZyRW5hYmxlZFxuICB9XG5cbiAgaXNEdnJJblVzZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmR2ckluVXNlXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCwgdGhpcywgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnBsYXliYWNrLmRlc3Ryb3koKTtcbiAgICB0aGlzLnBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiBwbHVnaW4uZGVzdHJveSgpKVxuICAgIHRoaXMuJGVsLnJlbW92ZSgpO1xuICB9XG5cbiAgc2V0U3R5bGUoc3R5bGUpIHtcbiAgICB0aGlzLiRlbC5jc3Moc3R5bGUpO1xuICB9XG5cbiAgYW5pbWF0ZShzdHlsZSwgZHVyYXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy4kZWwuYW5pbWF0ZShzdHlsZSwgZHVyYXRpb24pLnByb21pc2UoKTtcbiAgfVxuXG4gIHJlYWR5KCkge1xuICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUkVBRFksIHRoaXMubmFtZSk7XG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWJhY2suaXNQbGF5aW5nKCk7XG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFjay5nZXREdXJhdGlvbigpO1xuICB9XG5cbiAgZXJyb3IoZXJyb3JPYmopIHtcbiAgICB0aGlzLiRlbC5hcHBlbmQoZXJyb3JPYmoucmVuZGVyKCkuZWwpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfRVJST1IsIHtlcnJvcjogZXJyb3JPYmosIGNvbnRhaW5lcjogdGhpc30sIHRoaXMubmFtZSk7XG4gIH1cblxuICBsb2FkZWRNZXRhZGF0YShkdXJhdGlvbikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0xPQURFRE1FVEFEQVRBLCBkdXJhdGlvbik7XG4gIH1cblxuICB0aW1lVXBkYXRlZChwb3NpdGlvbiwgZHVyYXRpb24pIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFLCBwb3NpdGlvbiwgZHVyYXRpb24sIHRoaXMubmFtZSk7XG4gIH1cblxuICBwcm9ncmVzcyhzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbiwgZHVyYXRpb24pIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QUk9HUkVTUywgc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24sIGR1cmF0aW9uLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgcGxheWluZygpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLnBsYXliYWNrLnBsYXkoKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnBsYXliYWNrLnN0b3AoKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BBVVNFLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucGxheWJhY2sucGF1c2UoKTtcbiAgfVxuXG4gIGVuZGVkKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0VOREVELCB0aGlzLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgY2xpY2tlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9DTElDSywgdGhpcywgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIHNldEN1cnJlbnRUaW1lKHRpbWUpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9TRUVLLCB0aW1lLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucGxheWJhY2suc2Vlayh0aW1lKTtcbiAgfVxuXG4gIHNldFZvbHVtZSh2YWx1ZSkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1ZPTFVNRSwgdmFsdWUsIHRoaXMubmFtZSk7XG4gICAgdGhpcy5wbGF5YmFjay52b2x1bWUodmFsdWUpO1xuICB9XG5cbiAgZnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9GVUxMU0NSRUVOLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgYnVmZmVyaW5nKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORywgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGJ1ZmZlcmZ1bGwoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSRlVMTCwgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGFkZFBsdWdpbihwbHVnaW4pIHtcbiAgICB0aGlzLnBsdWdpbnMucHVzaChwbHVnaW4pO1xuICB9XG5cbiAgaGFzUGx1Z2luKG5hbWUpIHtcbiAgICByZXR1cm4gISF0aGlzLmdldFBsdWdpbihuYW1lKTtcbiAgfVxuXG4gIGdldFBsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuIGZpbmQodGhpcy5wbHVnaW5zLCAocGx1Z2luKSA9PiB7IHJldHVybiBwbHVnaW4ubmFtZSA9PT0gbmFtZSB9KTtcbiAgfVxuXG4gIG1vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfTU9VU0VfRU5URVIpXG4gIH1cblxuICBtb3VzZUxlYXZlKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX01PVVNFX0xFQVZFKVxuICB9XG5cbiAgc2V0dGluZ3NVcGRhdGUoKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMucGxheWJhY2suc2V0dGluZ3M7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU0VUVElOR1NVUERBVEUpO1xuICB9XG5cbiAgaGlnaERlZmluaXRpb25VcGRhdGUoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfSElHSERFRklOSVRJT05VUERBVEUpO1xuICB9XG5cbiAgaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXliYWNrLmlzSGlnaERlZmluaXRpb25JblVzZSgpXG4gIH1cblxuICBkaXNhYmxlTWVkaWFDb250cm9sKCkge1xuICAgIHRoaXMubWVkaWFDb250cm9sRGlzYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9ESVNBQkxFKTtcbiAgfVxuXG4gIGVuYWJsZU1lZGlhQ29udHJvbCgpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbERpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfTUVESUFDT05UUk9MX0VOQUJMRSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKCdjb250YWluZXInKTtcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpO1xuICAgIHRoaXMuJGVsLmFwcGVuZCh0aGlzLnBsYXliYWNrLnJlbmRlcigpLmVsKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhaW5lcjtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogVGhlIENvbnRhaW5lckZhY3RvcnkgaXMgcmVzcG9uc2libGUgZm9yIG1hbmFnZSBwbGF5YmFjayBib290c3RyYXAgYW5kIGNyZWF0ZSBjb250YWluZXJzLlxuICovXG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guYXNzaWduJyk7XG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvYmFzZV9vYmplY3QnKTtcbnZhciBDb250YWluZXIgPSByZXF1aXJlKCcuLi9jb250YWluZXInKTtcbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJyk7XG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKTtcbnZhciBmaW5kID0gcmVxdWlyZSgnbG9kYXNoLmZpbmQnKTtcblxuY2xhc3MgQ29udGFpbmVyRmFjdG9yeSBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zLCBsb2FkZXIpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMubG9hZGVyID0gbG9hZGVyO1xuICB9XG5cbiAgY3JlYXRlQ29udGFpbmVycygpIHtcbiAgICByZXR1cm4gJC5EZWZlcnJlZCgocHJvbWlzZSkgPT4ge1xuICAgICAgcHJvbWlzZS5yZXNvbHZlKHRoaXMub3B0aW9ucy5zb3VyY2VzLm1hcCgoc291cmNlKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUNvbnRhaW5lcihzb3VyY2UpO1xuICAgICAgfSkpO1xuICAgIH0pO1xuICB9XG5cbiAgZmluZFBsYXliYWNrUGx1Z2luKHNvdXJjZSkge1xuICAgIHJldHVybiBmaW5kKHRoaXMubG9hZGVyLnBsYXliYWNrUGx1Z2lucywgKHApID0+IHsgcmV0dXJuIHAuY2FuUGxheShzb3VyY2UudG9TdHJpbmcoKSkgfSlcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcihzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gYXNzaWduKHt9LCBvcHRpb25zLCB0aGlzLm9wdGlvbnMsIHtzcmM6IHNvdXJjZSwgYXV0b1BsYXk6ICEhdGhpcy5vcHRpb25zLmF1dG9QbGF5fSlcbiAgICB2YXIgcGxheWJhY2tQbHVnaW4gPSB0aGlzLmZpbmRQbGF5YmFja1BsdWdpbihzb3VyY2UpXG4gICAgdmFyIHBsYXliYWNrID0gbmV3IHBsYXliYWNrUGx1Z2luKG9wdGlvbnMpXG4gICAgdmFyIGNvbnRhaW5lciA9IG5ldyBDb250YWluZXIoe3BsYXliYWNrOiBwbGF5YmFja30pXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpXG4gICAgZGVmZXIucHJvbWlzZShjb250YWluZXIpXG4gICAgdGhpcy5hZGRDb250YWluZXJQbHVnaW5zKGNvbnRhaW5lciwgc291cmNlKVxuICAgIHRoaXMubGlzdGVuVG9PbmNlKGNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9SRUFEWSwgKCkgPT4gZGVmZXIucmVzb2x2ZShjb250YWluZXIpKVxuICAgIHJldHVybiBjb250YWluZXJcbiAgfVxuXG4gIGFkZENvbnRhaW5lclBsdWdpbnMoY29udGFpbmVyLCBzb3VyY2UpIHtcbiAgICB0aGlzLmxvYWRlci5jb250YWluZXJQbHVnaW5zLmZvckVhY2goKFBsdWdpbikgPT4ge1xuICAgICAgdmFyIG9wdGlvbnMgPSBhc3NpZ24odGhpcy5vcHRpb25zLCB7Y29udGFpbmVyOiBjb250YWluZXIsIHNyYzogc291cmNlfSk7XG4gICAgICBjb250YWluZXIuYWRkUGx1Z2luKG5ldyBQbHVnaW4ob3B0aW9ucykpO1xuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyRmFjdG9yeTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb250YWluZXJfZmFjdG9yeScpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIFRoZSBDb3JlIGlzIHJlc3BvbnNpYmxlIHRvIG1hbmFnZSBDb250YWluZXJzLCB0aGUgbWVkaWF0b3IsIE1lZGlhQ29udHJvbFxuICogYW5kIHRoZSBwbGF5ZXIgc3RhdGUuXG4gKi9cblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2xvZGFzaC5hc3NpZ24nKVxudmFyICQgPSByZXF1aXJlKCdjbGFwcHItemVwdG8nKVxuXG52YXIgVUlPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3VpX29iamVjdCcpXG52YXIgQ29udGFpbmVyRmFjdG9yeSA9IHJlcXVpcmUoJy4uL2NvbnRhaW5lcl9mYWN0b3J5JylcbnZhciBGdWxsc2NyZWVuID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpLkZ1bGxzY3JlZW5cbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgTWVkaWFDb250cm9sID0gcmVxdWlyZSgnLi4vbWVkaWFfY29udHJvbCcpXG52YXIgUGxheWVySW5mbyA9IHJlcXVpcmUoJy4uL3BsYXllcl9pbmZvJylcbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJy4uL21lZGlhdG9yJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG5cbnZhciBmaW5kID0gcmVxdWlyZSgnbG9kYXNoLmZpbmQnKVxudmFyIGlzTnVtYmVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpLmlzTnVtYmVyXG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpLnJlcXVlc3RBbmltYXRpb25GcmFtZVxudmFyIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpLmNhbmNlbEFuaW1hdGlvbkZyYW1lXG5cbmNsYXNzIENvcmUgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJzogJ2V4aXQnLFxuICAgICAgJ21vdXNlbW92ZSc6ICdzaG93TWVkaWFDb250cm9sJyxcbiAgICAgICdtb3VzZWxlYXZlJzogJ2hpZGVNZWRpYUNvbnRyb2wnXG4gICAgfVxuICB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkYXRhLXBsYXllcic6ICcnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgUGxheWVySW5mby5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLnBsdWdpbnMgPSBbXVxuICAgIHRoaXMuY29udGFpbmVycyA9IFtdXG4gICAgdGhpcy5jcmVhdGVDb250YWluZXJzKG9wdGlvbnMpXG4gICAgLy9GSVhNRSBmdWxsc2NyZWVuIGFwaSBzdWNrc1xuICAgICQoZG9jdW1lbnQpLmJpbmQoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCAoKSA9PiB0aGlzLmV4aXQoKSlcbiAgICAkKGRvY3VtZW50KS5iaW5kKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCAoKSA9PiB0aGlzLmV4aXQoKSlcbiAgICAkKGRvY3VtZW50KS5iaW5kKCdtb3pmdWxsc2NyZWVuY2hhbmdlJywgKCkgPT4gdGhpcy5leGl0KCkpXG4gIH1cblxuICBjcmVhdGVDb250YWluZXJzKG9wdGlvbnMpIHtcbiAgICB0aGlzLmRlZmVyID0gJC5EZWZlcnJlZCgpXG4gICAgdGhpcy5kZWZlci5wcm9taXNlKHRoaXMpXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5ID0gbmV3IENvbnRhaW5lckZhY3Rvcnkob3B0aW9ucywgb3B0aW9ucy5sb2FkZXIpXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5XG4gICAgICAuY3JlYXRlQ29udGFpbmVycygpXG4gICAgICAudGhlbigoY29udGFpbmVycykgPT4gdGhpcy5zZXR1cENvbnRhaW5lcnMoY29udGFpbmVycykpXG4gICAgICAudGhlbigoY29udGFpbmVycykgPT4gdGhpcy5yZXNvbHZlT25Db250YWluZXJzUmVhZHkoY29udGFpbmVycykpXG4gIH1cblxuICB1cGRhdGVTaXplKCkge1xuICAgIGlmIChGdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpKSB7XG4gICAgICB0aGlzLnNldEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFBsYXllclNpemUoKVxuICAgIH1cbiAgICBNZWRpYXRvci50cmlnZ2VyKEV2ZW50cy5QTEFZRVJfUkVTSVpFKVxuICB9XG5cbiAgc2V0RnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLiRlbC5hZGRDbGFzcygnZnVsbHNjcmVlbicpXG4gICAgdGhpcy4kZWwucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgIFBsYXllckluZm8ucHJldmlvdXNTaXplID0gUGxheWVySW5mby5jdXJyZW50U2l6ZVxuICAgIFBsYXllckluZm8uY3VycmVudFNpemUgPSB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfVxuICB9XG5cbiAgc2V0UGxheWVyU2l6ZSgpIHtcbiAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnZnVsbHNjcmVlbicpXG4gICAgUGxheWVySW5mby5jdXJyZW50U2l6ZSA9IFBsYXllckluZm8ucHJldmlvdXNTaXplXG4gICAgUGxheWVySW5mby5wcmV2aW91c1NpemUgPSB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfVxuICAgIHRoaXMucmVzaXplKFBsYXllckluZm8uY3VycmVudFNpemUpXG4gIH1cblxuICByZXNpemUob3B0aW9ucykge1xuICAgIGlmICghaXNOdW1iZXIob3B0aW9ucy5oZWlnaHQpICYmICFpc051bWJlcihvcHRpb25zLndpZHRoKSkgIHtcbiAgICAgIHRoaXMuZWwuc3R5bGUuaGVpZ2h0ID0gYCR7b3B0aW9ucy5oZWlnaHR9YDtcbiAgICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBgJHtvcHRpb25zLndpZHRofWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwuc3R5bGUuaGVpZ2h0ID0gYCR7b3B0aW9ucy5oZWlnaHR9cHhgO1xuICAgICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IGAke29wdGlvbnMud2lkdGh9cHhgO1xuICAgIH1cbiAgICBQbGF5ZXJJbmZvLnByZXZpb3VzU2l6ZSA9IFBsYXllckluZm8uY3VycmVudFNpemVcbiAgICBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplID0gb3B0aW9uc1xuICAgIE1lZGlhdG9yLnRyaWdnZXIoRXZlbnRzLlBMQVlFUl9SRVNJWkUpXG4gIH1cblxuICBlbmFibGVSZXNpemVPYnNlcnZlcigpIHtcbiAgICB2YXIgY2hlY2tTaXplQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5yZXFBbmltRnJhbWUpIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmVxQW5pbUZyYW1lKVxuICAgICAgaWYgKHRoaXMucHJldmlvdXNTaXplLndpZHRoICE9IHRoaXMuJGVsLndpZHRoKCkgfHxcbiAgICAgICAgICB0aGlzLnByZXZpb3VzU2l6ZS5oZWlnaHQgIT0gdGhpcy4kZWwuaGVpZ2h0KCkpIHtcbiAgICAgICAgTWVkaWF0b3IudHJpZ2dlcihFdmVudHMuUExBWUVSX1JFU0laRSlcbiAgICAgICAgdGhpcy5wcmV2aW91c1NpemUgPSB7IHdpZHRoOiB0aGlzLiRlbC53aWR0aCgpLCBoZWlnaHQ6IHRoaXMuJGVsLmhlaWdodCgpIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucmVxQW5pbUZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNoZWNrU2l6ZUNhbGxiYWNrKVxuICAgIH1cblxuICAgIHRoaXMucmVxQW5pbUZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNoZWNrU2l6ZUNhbGxiYWNrKVxuICB9XG5cbiAgZGlzYWJsZVJlc2l6ZU9ic2VydmVyKCkge1xuICAgIGlmICh0aGlzLnJlcUFuaW1GcmFtZSkgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yZXFBbmltRnJhbWUpXG4gIH1cblxuICByZXNvbHZlT25Db250YWluZXJzUmVhZHkoY29udGFpbmVycykge1xuICAgICQud2hlbi5hcHBseSgkLCBjb250YWluZXJzKS5kb25lKCgpID0+dGhpcy5kZWZlci5yZXNvbHZlKHRoaXMpKVxuICB9XG5cbiAgYWRkUGx1Z2luKHBsdWdpbikge1xuICAgIHRoaXMucGx1Z2lucy5wdXNoKHBsdWdpbilcbiAgfVxuXG4gIGhhc1BsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuICEhdGhpcy5nZXRQbHVnaW4obmFtZSlcbiAgfVxuXG4gIGdldFBsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuIGZpbmQodGhpcy5wbHVnaW5zLCAocGx1Z2luKSA9PiBwbHVnaW4ubmFtZSA9PT0gbmFtZSlcbiAgfVxuXG4gIGxvYWQoc291cmNlcykge1xuICAgIHNvdXJjZXMgPSBzb3VyY2VzICYmIHNvdXJjZXMuY29uc3RydWN0b3IgPT09IEFycmF5ID8gc291cmNlcyA6IFtzb3VyY2VzLnRvU3RyaW5nKCldO1xuICAgIHRoaXMuY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IGNvbnRhaW5lci5kZXN0cm95KCkpXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5Lm9wdGlvbnMgPSBhc3NpZ24odGhpcy5vcHRpb25zLCB7c291cmNlc30pXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5LmNyZWF0ZUNvbnRhaW5lcnMoKS50aGVuKChjb250YWluZXJzKSA9PiB7XG4gICAgICB0aGlzLnNldHVwQ29udGFpbmVycyhjb250YWluZXJzKVxuICAgIH0pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZGlzYWJsZVJlc2l6ZU9ic2VydmVyKClcbiAgICB0aGlzLmNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiBjb250YWluZXIuZGVzdHJveSgpKVxuICAgIHRoaXMucGx1Z2lucy5mb3JFYWNoKChwbHVnaW4pID0+IHBsdWdpbi5kZXN0cm95KCkpXG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5kZXN0cm95KClcbiAgICAkKGRvY3VtZW50KS51bmJpbmQoJ2Z1bGxzY3JlZW5jaGFuZ2UnKVxuICAgICQoZG9jdW1lbnQpLnVuYmluZCgnTVNGdWxsc2NyZWVuQ2hhbmdlJylcbiAgICAkKGRvY3VtZW50KS51bmJpbmQoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnKVxufVxuXG4gIGV4aXQoKSB7XG4gICAgdGhpcy51cGRhdGVTaXplKClcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5zaG93KClcbiAgfVxuXG4gIHNldE1lZGlhQ29udHJvbENvbnRhaW5lcihjb250YWluZXIpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5zZXRDb250YWluZXIoY29udGFpbmVyKVxuICAgIHRoaXMubWVkaWFDb250cm9sLnJlbmRlcigpXG4gIH1cblxuICBkaXNhYmxlTWVkaWFDb250cm9sKCkge1xuICAgIHRoaXMubWVkaWFDb250cm9sLmRpc2FibGUoKVxuICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdub2N1cnNvcicpXG4gIH1cblxuICBlbmFibGVNZWRpYUNvbnRyb2woKSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuZW5hYmxlKClcbiAgfVxuXG4gIHJlbW92ZUNvbnRhaW5lcihjb250YWluZXIpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoY29udGFpbmVyKVxuICAgIHRoaXMuY29udGFpbmVycyA9IHRoaXMuY29udGFpbmVycy5maWx0ZXIoKGMpID0+IGMgIT09IGNvbnRhaW5lcilcbiAgfVxuXG4gIGFwcGVuZENvbnRhaW5lcihjb250YWluZXIpIHtcbiAgICB0aGlzLmxpc3RlblRvKGNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9ERVNUUk9ZRUQsIHRoaXMucmVtb3ZlQ29udGFpbmVyKVxuICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoY29udGFpbmVyLnJlbmRlcigpLmVsKVxuICAgIHRoaXMuY29udGFpbmVycy5wdXNoKGNvbnRhaW5lcilcbiAgfVxuXG4gIHNldHVwQ29udGFpbmVycyhjb250YWluZXJzKSB7XG4gICAgY29udGFpbmVycy5tYXAodGhpcy5hcHBlbmRDb250YWluZXIuYmluZCh0aGlzKSlcbiAgICB0aGlzLnNldHVwTWVkaWFDb250cm9sKHRoaXMuZ2V0Q3VycmVudENvbnRhaW5lcigpKVxuICAgIHRoaXMucmVuZGVyKClcbiAgICB0aGlzLiRlbC5hcHBlbmRUbyh0aGlzLm9wdGlvbnMucGFyZW50RWxlbWVudClcbiAgICByZXR1cm4gY29udGFpbmVyc1xuICB9XG5cbiAgY3JlYXRlQ29udGFpbmVyKHNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lckZhY3RvcnkuY3JlYXRlQ29udGFpbmVyKHNvdXJjZSwgb3B0aW9ucylcbiAgICB0aGlzLmFwcGVuZENvbnRhaW5lcihjb250YWluZXIpXG4gICAgcmV0dXJuIGNvbnRhaW5lclxuICB9XG5cbiAgc2V0dXBNZWRpYUNvbnRyb2woY29udGFpbmVyKSB7XG4gICAgaWYgKHRoaXMubWVkaWFDb250cm9sKSB7XG4gICAgICB0aGlzLm1lZGlhQ29udHJvbC5zZXRDb250YWluZXIoY29udGFpbmVyKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1lZGlhQ29udHJvbCA9IHRoaXMuY3JlYXRlTWVkaWFDb250cm9sKGFzc2lnbih7Y29udGFpbmVyOiBjb250YWluZXJ9LCB0aGlzLm9wdGlvbnMpKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9GVUxMU0NSRUVOLCB0aGlzLnRvZ2dsZUZ1bGxzY3JlZW4pXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX1NIT1csIHRoaXMub25NZWRpYUNvbnRyb2xTaG93LmJpbmQodGhpcywgdHJ1ZSkpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX0hJREUsIHRoaXMub25NZWRpYUNvbnRyb2xTaG93LmJpbmQodGhpcywgZmFsc2UpKVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZU1lZGlhQ29udHJvbChvcHRpb25zKSB7XG4gICAgaWYob3B0aW9ucy5tZWRpYWNvbnRyb2wgJiYgb3B0aW9ucy5tZWRpYWNvbnRyb2wuZXh0ZXJuYWwpIHtcbiAgICAgIHJldHVybiBuZXcgb3B0aW9ucy5tZWRpYWNvbnRyb2wuZXh0ZXJuYWwob3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgTWVkaWFDb250cm9sKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGdldEN1cnJlbnRDb250YWluZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyc1swXVxuICB9XG5cbiAgdG9nZ2xlRnVsbHNjcmVlbigpIHtcbiAgICBpZiAoIUZ1bGxzY3JlZW4uaXNGdWxsc2NyZWVuKCkpIHtcbiAgICAgIEZ1bGxzY3JlZW4ucmVxdWVzdEZ1bGxzY3JlZW4odGhpcy5lbClcbiAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdmdWxsc2NyZWVuJylcbiAgICB9IGVsc2Uge1xuICAgICAgRnVsbHNjcmVlbi5jYW5jZWxGdWxsc2NyZWVuKClcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdmdWxsc2NyZWVuIG5vY3Vyc29yJylcbiAgICB9XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuc2hvdygpXG4gIH1cblxuICBzaG93TWVkaWFDb250cm9sKGV2ZW50KSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuc2hvdyhldmVudClcbiAgfVxuXG4gIGhpZGVNZWRpYUNvbnRyb2woZXZlbnQpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5oaWRlKGV2ZW50KVxuICB9XG5cbiAgb25NZWRpYUNvbnRyb2xTaG93KHNob3dpbmcpIHtcbiAgICBpZiAoc2hvd2luZylcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdub2N1cnNvcicpXG4gICAgZWxzZSBpZiAoRnVsbHNjcmVlbi5pc0Z1bGxzY3JlZW4oKSlcbiAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdub2N1cnNvcicpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKCdjb3JlJylcbiAgICAvL0ZJWE1FXG4gICAgLy90aGlzLiRlbC5lbXB0eSgpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHRoaXMuJGVsLmFwcGVuZCh0aGlzLm1lZGlhQ29udHJvbC5yZW5kZXIoKS5lbClcblxuICAgIHRoaXMub3B0aW9ucy53aWR0aCA9IHRoaXMub3B0aW9ucy53aWR0aCB8fCB0aGlzLiRlbC53aWR0aCgpXG4gICAgdGhpcy5vcHRpb25zLmhlaWdodCA9IHRoaXMub3B0aW9ucy5oZWlnaHQgfHwgdGhpcy4kZWwuaGVpZ2h0KClcbiAgICB2YXIgc2l6ZSA9IHt3aWR0aDogdGhpcy5vcHRpb25zLndpZHRoLCBoZWlnaHQ6IHRoaXMub3B0aW9ucy5oZWlnaHR9XG4gICAgUGxheWVySW5mby5wcmV2aW91c1NpemUgPSBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplID0gc2l6ZVxuICAgIHRoaXMudXBkYXRlU2l6ZSgpXG5cbiAgICB0aGlzLnByZXZpb3VzU2l6ZSA9IHsgd2lkdGg6IHRoaXMuJGVsLndpZHRoKCksIGhlaWdodDogdGhpcy4kZWwuaGVpZ2h0KCkgfVxuXG4gICAgdGhpcy5lbmFibGVSZXNpemVPYnNlcnZlcigpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29yZVxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuLyoqXG4gKiBUaGUgQ29yZSBGYWN0b3J5IGlzIHJlc3BvbnNpYmxlIGZvciBpbnN0YW50aWF0ZSB0aGUgY29yZSBhbmQgaXQncyBwbHVnaW5zLlxuICovXG5cbnZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9iYXNlX29iamVjdCcpO1xudmFyIENvcmUgPSByZXF1aXJlKCcuLi9jb3JlJyk7XG5cbmNsYXNzIENvcmVGYWN0b3J5IGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKHBsYXllciwgbG9hZGVyKSB7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXJcbiAgICB0aGlzLm9wdGlvbnMgPSBwbGF5ZXIub3B0aW9uc1xuICAgIHRoaXMubG9hZGVyID0gbG9hZGVyXG4gICAgdGhpcy5vcHRpb25zLmxvYWRlciA9IHRoaXMubG9hZGVyXG4gIH1cblxuICBjcmVhdGUoKSB7XG4gICAgdGhpcy5jb3JlID0gbmV3IENvcmUodGhpcy5vcHRpb25zKVxuICAgIHRoaXMuY29yZS50aGVuKHRoaXMuYWRkQ29yZVBsdWdpbnMuYmluZCh0aGlzKSlcbiAgICByZXR1cm4gdGhpcy5jb3JlXG4gIH1cblxuICBhZGRDb3JlUGx1Z2lucygpIHtcbiAgICB0aGlzLmxvYWRlci5jb3JlUGx1Z2lucy5mb3JFYWNoKChQbHVnaW4pID0+IHtcbiAgICAgIHZhciBwbHVnaW4gPSBuZXcgUGx1Z2luKHRoaXMuY29yZSlcbiAgICAgIHRoaXMuY29yZS5hZGRQbHVnaW4ocGx1Z2luKVxuICAgICAgdGhpcy5zZXR1cEV4dGVybmFsSW50ZXJmYWNlKHBsdWdpbilcbiAgICB9KVxuICAgIHJldHVybiB0aGlzLmNvcmVcbiAgfVxuXG4gIHNldHVwRXh0ZXJuYWxJbnRlcmZhY2UocGx1Z2luKSB7XG4gICAgdmFyIGV4dGVybmFsRnVuY3Rpb25zID0gcGx1Z2luLmdldEV4dGVybmFsSW50ZXJmYWNlKCk7XG4gICAgZm9yICh2YXIga2V5IGluIGV4dGVybmFsRnVuY3Rpb25zKSB7XG4gICAgICB0aGlzLnBsYXllcltrZXldID0gZXh0ZXJuYWxGdW5jdGlvbnNba2V5XS5iaW5kKHBsdWdpbilcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlRmFjdG9yeTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb3JlX2ZhY3RvcnknKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xvYWRlcicpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvYmFzZV9vYmplY3QnKVxudmFyIFBsYXllckluZm8gPSByZXF1aXJlKCcuLi9wbGF5ZXJfaW5mbycpXG52YXIgdW5pcSA9IHJlcXVpcmUoJ2xvZGFzaC51bmlxJylcblxuLyogUGxheWJhY2sgUGx1Z2lucyAqL1xudmFyIEhUTUw1VmlkZW9QbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9odG1sNV92aWRlbycpO1xudmFyIEZsYXNoVmlkZW9QbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9mbGFzaCcpO1xudmFyIEhUTUw1QXVkaW9QbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9odG1sNV9hdWRpbycpO1xudmFyIEhMU1ZpZGVvUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9wbGF5YmFja3MvaGxzJyk7XG52YXIgSFRNTEltZ1BsYXliYWNrID0gcmVxdWlyZSgnLi4vLi4vcGxheWJhY2tzL2h0bWxfaW1nJyk7XG52YXIgTm9PcCA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9ub19vcCcpO1xuXG4vKiBDb250YWluZXIgUGx1Z2lucyAqL1xudmFyIFNwaW5uZXJUaHJlZUJvdW5jZVBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvc3Bpbm5lcl90aHJlZV9ib3VuY2UnKTtcbnZhciBTdGF0c1BsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvc3RhdHMnKTtcbnZhciBXYXRlck1hcmtQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9wbHVnaW5zL3dhdGVybWFyaycpO1xudmFyIFBvc3RlclBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvcG9zdGVyJyk7XG52YXIgR29vZ2xlQW5hbHl0aWNzUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9nb29nbGVfYW5hbHl0aWNzJyk7XG52YXIgQ2xpY2tUb1BhdXNlUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9jbGlja190b19wYXVzZScpO1xuXG4vKiBDb3JlIFBsdWdpbnMgKi9cbnZhciBEVlJDb250cm9scyA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvZHZyX2NvbnRyb2xzJyk7XG5cbmNsYXNzIExvYWRlciBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihleHRlcm5hbFBsdWdpbnMpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5wbGF5YmFja1BsdWdpbnMgPSBbSFRNTDVWaWRlb1BsYXliYWNrLCBGbGFzaFZpZGVvUGxheWJhY2ssIEhUTUw1QXVkaW9QbGF5YmFjaywgSExTVmlkZW9QbGF5YmFjaywgSFRNTEltZ1BsYXliYWNrLCBOb09wXVxuICAgIHRoaXMuY29udGFpbmVyUGx1Z2lucyA9IFtTcGlubmVyVGhyZWVCb3VuY2VQbHVnaW4sIFdhdGVyTWFya1BsdWdpbiwgUG9zdGVyUGx1Z2luLCBTdGF0c1BsdWdpbiwgR29vZ2xlQW5hbHl0aWNzUGx1Z2luLCBDbGlja1RvUGF1c2VQbHVnaW5dXG4gICAgdGhpcy5jb3JlUGx1Z2lucyA9IFtEVlJDb250cm9sc11cbiAgICBpZiAoZXh0ZXJuYWxQbHVnaW5zKSB7XG4gICAgICB0aGlzLmFkZEV4dGVybmFsUGx1Z2lucyhleHRlcm5hbFBsdWdpbnMpXG4gICAgfVxuICB9XG5cbiAgYWRkRXh0ZXJuYWxQbHVnaW5zKHBsdWdpbnMpIHtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGZ1bmN0aW9uKHBsdWdpbikgeyByZXR1cm4gcGx1Z2luLnByb3RvdHlwZS5uYW1lIH1cbiAgICBpZiAocGx1Z2lucy5wbGF5YmFjaykgeyB0aGlzLnBsYXliYWNrUGx1Z2lucyA9IHVuaXEocGx1Z2lucy5wbGF5YmFjay5jb25jYXQodGhpcy5wbGF5YmFja1BsdWdpbnMpLCBwbHVnaW5OYW1lKSB9XG4gICAgaWYgKHBsdWdpbnMuY29udGFpbmVyKSB7IHRoaXMuY29udGFpbmVyUGx1Z2lucyA9IHVuaXEocGx1Z2lucy5jb250YWluZXIuY29uY2F0KHRoaXMuY29udGFpbmVyUGx1Z2lucyksIHBsdWdpbk5hbWUpIH1cbiAgICBpZiAocGx1Z2lucy5jb3JlKSB7IHRoaXMuY29yZVBsdWdpbnMgPSB1bmlxKHBsdWdpbnMuY29yZS5jb25jYXQodGhpcy5jb3JlUGx1Z2lucyksIHBsdWdpbk5hbWUpIH1cbiAgICBQbGF5ZXJJbmZvLnBsYXliYWNrUGx1Z2lucyA9IHRoaXMucGxheWJhY2tQbHVnaW5zXG4gIH1cblxuICBnZXRQbHVnaW4obmFtZSkge1xuICAgIHZhciBhbGxQbHVnaW5zID0gdGhpcy5jb250YWluZXJQbHVnaW5zLmNvbmNhdCh0aGlzLnBsYXliYWNrUGx1Z2lucykuY29uY2F0KHRoaXMuY29yZVBsdWdpbnMpXG4gICAgcmV0dXJuIGFsbFBsdWdpbnMuZmluZCgocGx1Z2luKSA9PiB7IHJldHVybiBwbHVnaW4ucHJvdG90eXBlLm5hbWUgPT09IG5hbWUgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogVGhlIE1lZGlhQ29udHJvbCBpcyByZXNwb25zaWJsZSBmb3IgZGlzcGxheWluZyB0aGUgUGxheWVyIGNvbnRyb2xzLlxuICovXG5cbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91aV9vYmplY3QnKVxudmFyIFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJy4uL2Jyb3dzZXInKVxudmFyIFNlZWtUaW1lID0gcmVxdWlyZSgnLi4vc2Vla190aW1lJylcbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJy4uL21lZGlhdG9yJylcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgnLi4vcGxheWVyX2luZm8nKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcbnZhciBLaWJvID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9raWJvJylcblxuY2xhc3MgTWVkaWFDb250cm9sIGV4dGVuZHMgVUlPYmplY3Qge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdNZWRpYUNvbnRyb2wnIH1cblxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3M6ICdtZWRpYS1jb250cm9sJyxcbiAgICAgICdkYXRhLW1lZGlhLWNvbnRyb2wnOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGljayBbZGF0YS1wbGF5XSc6ICdwbGF5JyxcbiAgICAgICdjbGljayBbZGF0YS1wYXVzZV0nOiAncGF1c2UnLFxuICAgICAgJ2NsaWNrIFtkYXRhLXBsYXlwYXVzZV0nOiAndG9nZ2xlUGxheVBhdXNlJyxcbiAgICAgICdjbGljayBbZGF0YS1zdG9wXSc6ICdzdG9wJyxcbiAgICAgICdjbGljayBbZGF0YS1wbGF5c3RvcF0nOiAndG9nZ2xlUGxheVN0b3AnLFxuICAgICAgJ2NsaWNrIFtkYXRhLWZ1bGxzY3JlZW5dJzogJ3RvZ2dsZUZ1bGxzY3JlZW4nLFxuICAgICAgJ2NsaWNrIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0nOiAnc2VlaycsXG4gICAgICAnY2xpY2sgLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdJzogJ3ZvbHVtZScsXG4gICAgICAnY2xpY2sgLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXSc6ICd0b2dnbGVNdXRlJyxcbiAgICAgICdtb3VzZWVudGVyIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSc6ICdzaG93Vm9sdW1lQmFyJyxcbiAgICAgICdtb3VzZWxlYXZlIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSc6ICdoaWRlVm9sdW1lQmFyJyxcbiAgICAgICdtb3VzZWRvd24gLmJhci1zY3J1YmJlcltkYXRhLXZvbHVtZV0nOiAnc3RhcnRWb2x1bWVEcmFnJyxcbiAgICAgICdtb3VzZWRvd24gLmJhci1zY3J1YmJlcltkYXRhLXNlZWtiYXJdJzogJ3N0YXJ0U2Vla0RyYWcnLFxuICAgICAgJ21vdXNlbW92ZSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdJzogJ21vdXNlbW92ZU9uU2Vla0JhcicsXG4gICAgICAnbW91c2VsZWF2ZSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdJzogJ21vdXNlbGVhdmVPblNlZWtCYXInLFxuICAgICAgJ21vdXNlZW50ZXIgLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10nOiAnc2V0S2VlcFZpc2libGUnLFxuICAgICAgJ21vdXNlbGVhdmUgLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10nOiAncmVzZXRLZWVwVmlzaWJsZSdcbiAgICB9XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBKU1QubWVkaWFfY29udHJvbCB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5raWJvID0gbmV3IEtpYm8oKVxuICAgIHRoaXMuc2Vla1RpbWUgPSBuZXcgU2Vla1RpbWUodGhpcylcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5tdXRlID0gdGhpcy5vcHRpb25zLm11dGVcbiAgICB0aGlzLnBlcnNpc3RDb25maWcgPSB0aGlzLm9wdGlvbnMucGVyc2lzdENvbmZpZ1xuICAgIHRoaXMuY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcbiAgICB2YXIgaW5pdGlhbFZvbHVtZSA9ICh0aGlzLnBlcnNpc3RDb25maWcpID8gVXRpbHMuQ29uZmlnLnJlc3RvcmUoXCJ2b2x1bWVcIikgOiAxMDA7XG4gICAgdGhpcy5zZXRWb2x1bWUodGhpcy5tdXRlID8gMCA6IGluaXRpYWxWb2x1bWUpXG4gICAgdGhpcy5rZWVwVmlzaWJsZSA9IGZhbHNlXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpXG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIGxlZnQ6IFsncGxheScsICdzdG9wJywgJ3BhdXNlJ10sXG4gICAgICByaWdodDogWyd2b2x1bWUnXSxcbiAgICAgIGRlZmF1bHQ6IFsncG9zaXRpb24nLCAnc2Vla2JhcicsICdkdXJhdGlvbiddXG4gICAgfVxuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3Qua2V5cyh0aGlzLmNvbnRhaW5lci5zZXR0aW5ncykubGVuZ3RoID09PSAwID8gdGhpcy5zZXR0aW5ncyA6IHRoaXMuY29udGFpbmVyLnNldHRpbmdzXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgaWYgKHRoaXMuY29udGFpbmVyLm1lZGlhQ29udHJvbERpc2FibGVkIHx8IHRoaXMub3B0aW9ucy5jaHJvbWVsZXNzKSB7XG4gICAgICB0aGlzLmRpc2FibGUoKVxuICAgIH1cbiAgICAkKGRvY3VtZW50KS5iaW5kKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB0aGlzLnN0b3BEcmFnKGV2ZW50KSlcbiAgICAkKGRvY3VtZW50KS5iaW5kKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHRoaXMudXBkYXRlRHJhZyhldmVudCkpXG4gICAgTWVkaWF0b3Iub24oRXZlbnRzLlBMQVlFUl9SRVNJWkUsICgpID0+IHRoaXMucGxheWVyUmVzaXplKCkpXG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVksIHRoaXMuY2hhbmdlVG9nZ2xlUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1RJTUVVUERBVEUsIHRoaXMudXBkYXRlU2Vla0JhcilcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BST0dSRVNTLCB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VUVElOR1NVUERBVEUsIHRoaXMuc2V0dGluZ3NVcGRhdGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCwgdGhpcy5zZXR0aW5nc1VwZGF0ZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0hJR0hERUZJTklUSU9OVVBEQVRFLCB0aGlzLmhpZ2hEZWZpbml0aW9uVXBkYXRlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfTUVESUFDT05UUk9MX0RJU0FCTEUsIHRoaXMuZGlzYWJsZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9FTkFCTEUsIHRoaXMuZW5hYmxlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRU5ERUQsIHRoaXMuZW5kZWQpXG4gIH1cblxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5oaWRlKClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmNocm9tZWxlc3MpIHJldHVyblxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgIHRoaXMuc2hvdygpXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuY29udGFpbmVyLnBsYXkoKVxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5jb250YWluZXIucGF1c2UoKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5zdG9wKClcbiAgfVxuXG4gIGNoYW5nZVRvZ2dsZVBsYXkoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLmlzUGxheWluZygpKSB7XG4gICAgICB0aGlzLiRwbGF5UGF1c2VUb2dnbGUucmVtb3ZlQ2xhc3MoJ3BhdXNlZCcpLmFkZENsYXNzKCdwbGF5aW5nJylcbiAgICAgIHRoaXMuJHBsYXlTdG9wVG9nZ2xlLnJlbW92ZUNsYXNzKCdzdG9wcGVkJykuYWRkQ2xhc3MoJ3BsYXlpbmcnKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfUExBWUlORyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJHBsYXlQYXVzZVRvZ2dsZS5yZW1vdmVDbGFzcygncGxheWluZycpLmFkZENsYXNzKCdwYXVzZWQnKVxuICAgICAgdGhpcy4kcGxheVN0b3BUb2dnbGUucmVtb3ZlQ2xhc3MoJ3BsYXlpbmcnKS5hZGRDbGFzcygnc3RvcHBlZCcpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9OT1RQTEFZSU5HKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZW1vdmVPblNlZWtCYXIoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuc2V0dGluZ3Muc2Vla0VuYWJsZWQpIHtcbiAgICAgIHZhciBvZmZzZXRYID0gZXZlbnQucGFnZVggLSB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLm9mZnNldCgpLmxlZnQgLSAodGhpcy4kc2Vla0JhckhvdmVyLndpZHRoKCkgLyAyKVxuICAgICAgdGhpcy4kc2Vla0JhckhvdmVyLmNzcyh7bGVmdDogb2Zmc2V0WH0pXG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX01PVVNFTU9WRV9TRUVLQkFSLCBldmVudCk7XG4gIH1cblxuICBtb3VzZWxlYXZlT25TZWVrQmFyKGV2ZW50KSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VMRUFWRV9TRUVLQkFSLCBldmVudCk7XG4gIH1cblxuICBwbGF5ZXJSZXNpemUoKSB7XG4gICAgaWYgKFV0aWxzLkZ1bGxzY3JlZW4uaXNGdWxsc2NyZWVuKCkpIHtcbiAgICAgIHRoaXMuJGZ1bGxzY3JlZW5Ub2dnbGUuYWRkQ2xhc3MoJ3NocmluaycpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGZ1bGxzY3JlZW5Ub2dnbGUucmVtb3ZlQ2xhc3MoJ3NocmluaycpXG4gICAgfVxuICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCd3MzIwJylcbiAgICBpZiAoUGxheWVySW5mby5jdXJyZW50U2l6ZS53aWR0aCA8PSAzMjAgfHwgdGhpcy5vcHRpb25zLmhpZGVWb2x1bWVCYXIpIHtcbiAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCd3MzIwJylcbiAgICB9XG4gIH1cblxuICB0b2dnbGVQbGF5UGF1c2UoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLmlzUGxheWluZygpKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5wYXVzZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnBsYXkoKVxuICAgIH1cbiAgICB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkoKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdG9nZ2xlUGxheVN0b3AoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLmlzUGxheWluZygpKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5zdG9wKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250YWluZXIucGxheSgpXG4gICAgfVxuICAgIHRoaXMuY2hhbmdlVG9nZ2xlUGxheSgpXG4gIH1cblxuICBzdGFydFNlZWtEcmFnKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkgcmV0dXJuXG4gICAgdGhpcy5kcmFnZ2luZ1NlZWtCYXIgPSB0cnVlXG4gICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2RyYWdnaW5nJylcbiAgICB0aGlzLiRzZWVrQmFyTG9hZGVkLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgc3RhcnRWb2x1bWVEcmFnKGV2ZW50KSB7XG4gICAgdGhpcy5kcmFnZ2luZ1ZvbHVtZUJhciA9IHRydWVcbiAgICB0aGlzLiRlbC5hZGRDbGFzcygnZHJhZ2dpbmcnKVxuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIHN0b3BEcmFnKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmdTZWVrQmFyKSB7XG4gICAgICB0aGlzLnNlZWsoZXZlbnQpXG4gICAgfVxuICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpXG4gICAgdGhpcy4kc2Vla0JhckxvYWRlZC5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbi5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlci5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24gZHJhZ2dpbmcnKVxuICAgIHRoaXMuZHJhZ2dpbmdTZWVrQmFyID0gZmFsc2VcbiAgICB0aGlzLmRyYWdnaW5nVm9sdW1lQmFyID0gZmFsc2VcbiAgfVxuXG4gIHVwZGF0ZURyYWcoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmdTZWVrQmFyKSB7XG4gICAgICB2YXIgb2Zmc2V0WCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy4kc2Vla0JhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0XG4gICAgICB2YXIgcG9zID0gb2Zmc2V0WCAvIHRoaXMuJHNlZWtCYXJDb250YWluZXIud2lkdGgoKSAqIDEwMFxuICAgICAgcG9zID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heChwb3MsIDApKVxuICAgICAgdGhpcy5zZXRTZWVrUGVyY2VudGFnZShwb3MpXG4gICAgfSBlbHNlIGlmICh0aGlzLmRyYWdnaW5nVm9sdW1lQmFyKSB7XG4gICAgICB0aGlzLnZvbHVtZShldmVudClcbiAgICB9XG4gIH1cblxuICB2b2x1bWUoZXZlbnQpIHtcbiAgICB2YXIgb2Zmc2V0WSA9IGV2ZW50LnBhZ2VYIC0gdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLm9mZnNldCgpLmxlZnRcbiAgICB2YXIgdm9sdW1lRnJvbVVJID0gKG9mZnNldFkgLyB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIud2lkdGgoKSkgKiAxMDBcbiAgICB0aGlzLnNldFZvbHVtZSh2b2x1bWVGcm9tVUkpXG4gIH1cblxuICB0b2dnbGVNdXRlKCkge1xuICAgIGlmICh0aGlzLm11dGUpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRWb2x1bWUgPD0gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSAxMDBcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMuY3VycmVudFZvbHVtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRWb2x1bWUoMClcbiAgICB9XG4gIH1cblxuICBzZXRWb2x1bWUodmFsdWUpIHtcbiAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSBNYXRoLm1pbigxMDAsIE1hdGgubWF4KHZhbHVlLCAwKSlcbiAgICB0aGlzLmNvbnRhaW5lci5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgIHRoaXMuc2V0Vm9sdW1lTGV2ZWwodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgIHRoaXMubXV0ZSA9IHRoaXMuY3VycmVudFZvbHVtZSA9PT0gMFxuICAgIHRoaXMucGVyc2lzdENvbmZpZyAmJiBVdGlscy5Db25maWcucGVyc2lzdChcInZvbHVtZVwiLCB0aGlzLmN1cnJlbnRWb2x1bWUpXG4gIH1cblxuICB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX0ZVTExTQ1JFRU4sIHRoaXMubmFtZSlcbiAgICB0aGlzLmNvbnRhaW5lci5mdWxsc2NyZWVuKClcbiAgICB0aGlzLnJlc2V0S2VlcFZpc2libGUoKVxuICB9XG5cbiAgc2V0Q29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZyh0aGlzLmNvbnRhaW5lcilcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lclxuICAgIHRoaXMuY2hhbmdlVG9nZ2xlUGxheSgpXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpXG4gICAgdGhpcy5zZXR0aW5nc1VwZGF0ZSgpXG4gICAgdGhpcy5jb250YWluZXIudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLRFZSU1RBVEVDSEFOR0VELCB0aGlzLmNvbnRhaW5lci5pc0R2ckluVXNlKCkpXG4gICAgdGhpcy5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgIGlmICh0aGlzLmNvbnRhaW5lci5tZWRpYUNvbnRyb2xEaXNhYmxlZCkge1xuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfQ09OVEFJTkVSQ0hBTkdFRClcbiAgfVxuXG4gIHNob3dWb2x1bWVCYXIoKSB7XG4gICAgaWYgKHRoaXMuaGlkZVZvbHVtZUlkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlVm9sdW1lSWQpXG4gICAgfVxuICAgIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci5yZW1vdmVDbGFzcygndm9sdW1lLWJhci1oaWRlJylcbiAgfVxuXG4gIGhpZGVWb2x1bWVCYXIoKSB7XG4gICAgdmFyIHRpbWVvdXQgPSA0MDBcbiAgICBpZiAoIXRoaXMuJHZvbHVtZUJhckNvbnRhaW5lcikgcmV0dXJuXG4gICAgaWYgKHRoaXMuZHJhZ2dpbmdWb2x1bWVCYXIpIHtcbiAgICAgIHRoaXMuaGlkZVZvbHVtZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGVWb2x1bWVCYXIoKSwgdGltZW91dClcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuaGlkZVZvbHVtZUlkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVWb2x1bWVJZClcbiAgICAgIH1cbiAgICAgIHRoaXMuaGlkZVZvbHVtZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIuYWRkQ2xhc3MoJ3ZvbHVtZS1iYXItaGlkZScpLCB0aW1lb3V0KVxuICAgIH1cbiAgfVxuXG4gIGVuZGVkKCkge1xuICAgIHRoaXMuY2hhbmdlVG9nZ2xlUGxheSgpXG4gIH1cblxuICB1cGRhdGVQcm9ncmVzc0JhcihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbiwgZHVyYXRpb24pIHtcbiAgICB2YXIgbG9hZGVkU3RhcnQgPSBzdGFydFBvc2l0aW9uIC8gZHVyYXRpb24gKiAxMDBcbiAgICB2YXIgbG9hZGVkRW5kID0gZW5kUG9zaXRpb24gLyBkdXJhdGlvbiAqIDEwMFxuICAgIHRoaXMuJHNlZWtCYXJMb2FkZWQuY3NzKHsgbGVmdDogbG9hZGVkU3RhcnQgKyAnJScsIHdpZHRoOiAobG9hZGVkRW5kIC0gbG9hZGVkU3RhcnQpICsgJyUnIH0pXG4gIH1cblxuICB1cGRhdGVTZWVrQmFyKHBvc2l0aW9uLCBkdXJhdGlvbikge1xuICAgIGlmICh0aGlzLmRyYWdnaW5nU2Vla0JhcikgcmV0dXJuXG4gICAgaWYgKHBvc2l0aW9uIDwgMCkgcG9zaXRpb24gPSBkdXJhdGlvblxuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbi5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlci5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHZhciBzZWVrYmFyVmFsdWUgPSAoMTAwIC8gZHVyYXRpb24pICogcG9zaXRpb25cbiAgICB0aGlzLnNldFNlZWtQZXJjZW50YWdlKHNlZWtiYXJWYWx1ZSlcbiAgICB0aGlzLiQoJ1tkYXRhLXBvc2l0aW9uXScpLmh0bWwoVXRpbHMuZm9ybWF0VGltZShwb3NpdGlvbikpXG4gICAgdGhpcy4kKCdbZGF0YS1kdXJhdGlvbl0nKS5odG1sKFV0aWxzLmZvcm1hdFRpbWUoZHVyYXRpb24pKVxuICB9XG5cbiAgc2VlayhldmVudCkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIuc2V0dGluZ3Muc2Vla0VuYWJsZWQpIHJldHVyblxuICAgIHZhciBvZmZzZXRYID0gZXZlbnQucGFnZVggLSB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLm9mZnNldCgpLmxlZnRcbiAgICB2YXIgcG9zID0gb2Zmc2V0WCAvIHRoaXMuJHNlZWtCYXJDb250YWluZXIud2lkdGgoKSAqIDEwMFxuICAgIHBvcyA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgocG9zLCAwKSlcbiAgICB0aGlzLmNvbnRhaW5lci5zZXRDdXJyZW50VGltZShwb3MpXG4gICAgdGhpcy5zZXRTZWVrUGVyY2VudGFnZShwb3MpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBzZXRLZWVwVmlzaWJsZSgpIHtcbiAgICB0aGlzLmtlZXBWaXNpYmxlID0gdHJ1ZVxuICB9XG5cbiAgcmVzZXRLZWVwVmlzaWJsZSgpIHtcbiAgICB0aGlzLmtlZXBWaXNpYmxlID0gZmFsc2VcbiAgfVxuXG4gIGlzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gIXRoaXMuJGVsLmhhc0NsYXNzKCdtZWRpYS1jb250cm9sLWhpZGUnKVxuICB9XG5cbiAgc2hvdyhldmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm5cbiAgICB2YXIgdGltZW91dCA9IDIwMDBcbiAgICBpZiAoIWV2ZW50IHx8IChldmVudC5jbGllbnRYICE9PSB0aGlzLmxhc3RNb3VzZVggJiYgZXZlbnQuY2xpZW50WSAhPT0gdGhpcy5sYXN0TW91c2VZKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9maXJlZm94L2kpKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlSWQpXG4gICAgICB0aGlzLiRlbC5zaG93KClcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX1NIT1csIHRoaXMubmFtZSlcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdtZWRpYS1jb250cm9sLWhpZGUnKVxuICAgICAgdGhpcy5oaWRlSWQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aW1lb3V0KVxuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubGFzdE1vdXNlWCA9IGV2ZW50LmNsaWVudFhcbiAgICAgICAgdGhpcy5sYXN0TW91c2VZID0gZXZlbnQuY2xpZW50WVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdmFyIHRpbWVvdXQgPSAyMDAwXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZUlkKVxuICAgIGlmICghdGhpcy5pc1Zpc2libGUoKSB8fCB0aGlzLm9wdGlvbnMuaGlkZU1lZGlhQ29udHJvbCA9PT0gZmFsc2UpIHJldHVyblxuICAgIGlmICh0aGlzLmtlZXBWaXNpYmxlIHx8IHRoaXMuZHJhZ2dpbmdTZWVrQmFyIHx8IHRoaXMuZHJhZ2dpbmdWb2x1bWVCYXIpIHtcbiAgICAgIHRoaXMuaGlkZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGltZW91dClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfSElERSwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtaGlkZScpXG4gICAgICB0aGlzLmhpZGVWb2x1bWVCYXIoKVxuICAgIH1cbiAgfVxuXG4gIHNldHRpbmdzVXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh0aGlzLmNvbnRhaW5lci5zZXR0aW5ncykubGVuZ3RoICE9PSAwKSB7XG4gICAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5jb250YWluZXIuc2V0dGluZ3NcbiAgICAgIHRoaXMucmVuZGVyKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9XG4gIH1cblxuICBoaWdoRGVmaW5pdGlvblVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkpIHtcbiAgICAgIHRoaXMuJGVsLmZpbmQoJ2J1dHRvbltkYXRhLWhkLWluZGljYXRvcl0nKS5hZGRDbGFzcyhcImVuYWJsZWRcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWwuZmluZCgnYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXScpLnJlbW92ZUNsYXNzKFwiZW5hYmxlZFwiKVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUNhY2hlZEVsZW1lbnRzKCkge1xuICAgIHRoaXMuJHBsYXlQYXVzZVRvZ2dsZSA9IHRoaXMuJGVsLmZpbmQoJ2J1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlwYXVzZV0nKVxuICAgIHRoaXMuJHBsYXlTdG9wVG9nZ2xlID0gdGhpcy4kZWwuZmluZCgnYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3BdJylcbiAgICB0aGlzLiRmdWxsc2NyZWVuVG9nZ2xlID0gdGhpcy4kZWwuZmluZCgnYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtZnVsbHNjcmVlbl0nKVxuICAgIHRoaXMuJHNlZWtCYXJDb250YWluZXIgPSB0aGlzLiRlbC5maW5kKCcuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdJylcbiAgICB0aGlzLiRzZWVrQmFyTG9hZGVkID0gdGhpcy4kZWwuZmluZCgnLmJhci1maWxsLTFbZGF0YS1zZWVrYmFyXScpXG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uID0gdGhpcy4kZWwuZmluZCgnLmJhci1maWxsLTJbZGF0YS1zZWVrYmFyXScpXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyID0gdGhpcy4kZWwuZmluZCgnLmJhci1zY3J1YmJlcltkYXRhLXNlZWtiYXJdJylcbiAgICB0aGlzLiRzZWVrQmFySG92ZXIgPSB0aGlzLiRlbC5maW5kKCcuYmFyLWhvdmVyW2RhdGEtc2Vla2Jhcl0nKVxuICAgIHRoaXMuJHZvbHVtZUNvbnRhaW5lciA9IHRoaXMuJGVsLmZpbmQoJy5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXScpXG4gICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyID0gdGhpcy4kZWwuZmluZCgnLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdJylcbiAgICB0aGlzLiR2b2x1bWVJY29uID0gdGhpcy4kZWwuZmluZCgnLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXScpXG4gIH1cblxuICBzZXRWb2x1bWVMZXZlbCh2YWx1ZSkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIuaXNSZWFkeSB8fCAhdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLmxpc3RlblRvT25jZSh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9SRUFEWSwgKCkgPT4gdGhpcy5zZXRWb2x1bWVMZXZlbCh2YWx1ZSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci5maW5kKCcuc2VnbWVudGVkLWJhci1lbGVtZW50JykucmVtb3ZlQ2xhc3MoJ2ZpbGwnKVxuICAgICAgdmFyIGl0ZW0gPSBNYXRoLmNlaWwodmFsdWUgLyAxMC4wKVxuICAgICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLmZpbmQoJy5zZWdtZW50ZWQtYmFyLWVsZW1lbnQnKS5zbGljZSgwLCBpdGVtKS5hZGRDbGFzcygnZmlsbCcpXG4gICAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgIHRoaXMuJHZvbHVtZUljb24ucmVtb3ZlQ2xhc3MoJ211dGVkJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJHZvbHVtZUljb24uYWRkQ2xhc3MoJ211dGVkJylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRTZWVrUGVyY2VudGFnZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA+IDEwMCkgcmV0dXJuXG4gICAgdmFyIHBvcyA9IHRoaXMuJHNlZWtCYXJDb250YWluZXIud2lkdGgoKSAqIHZhbHVlIC8gMTAwLjAgLSAodGhpcy4kc2Vla0JhclNjcnViYmVyLndpZHRoKCkgLyAyLjApXG4gICAgdGhpcy5jdXJyZW50U2Vla1BlcmNlbnRhZ2UgPSB2YWx1ZTtcbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24uY3NzKHsgd2lkdGg6IHZhbHVlICsgJyUnIH0pXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyLmNzcyh7IGxlZnQ6IHBvcyB9KVxuICB9XG5cbiAgYmluZEtleUV2ZW50cygpIHtcbiAgICB0aGlzLmtpYm8uZG93bihbJ3NwYWNlJ10sICgpID0+IHRoaXMudG9nZ2xlUGxheVBhdXNlKCkpXG4gIH1cblxuICB1bmJpbmRLZXlFdmVudHMoKSB7XG4gICAgdGhpcy5raWJvLm9mZignc3BhY2UnKVxuICB9XG5cbiAgcGFyc2VDb2xvcnMoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5tZWRpYWNvbnRyb2wpIHtcbiAgICAgIHZhciBidXR0b25zQ29sb3IgPSB0aGlzLm9wdGlvbnMubWVkaWFjb250cm9sLmJ1dHRvbnM7XG4gICAgICB2YXIgc2Vla2JhckNvbG9yID0gdGhpcy5vcHRpb25zLm1lZGlhY29udHJvbC5zZWVrYmFyO1xuICAgICAgdGhpcy4kZWwuZmluZCgnLmJhci1maWxsLTJbZGF0YS1zZWVrYmFyXScpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHNlZWtiYXJDb2xvcilcbiAgICAgIHRoaXMuJGVsLmZpbmQoJ1tkYXRhLW1lZGlhLWNvbnRyb2xdID4gLm1lZGlhLWNvbnRyb2wtaWNvbiwgLmRyYXdlci1pY29uJykuY3NzKCdjb2xvcicsIGJ1dHRvbnNDb2xvcilcbiAgICAgIHRoaXMuJGVsLmZpbmQoJy5zZWdtZW50ZWQtYmFyLWVsZW1lbnRbZGF0YS12b2x1bWVdJykuY3NzKCdib3hTaGFkb3cnLCBcImluc2V0IDJweCAwIDAgXCIgKyBidXR0b25zQ29sb3IpXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAkKGRvY3VtZW50KS51bmJpbmQoJ21vdXNldXAnKVxuICAgICQoZG9jdW1lbnQpLnVuYmluZCgnbW91c2Vtb3ZlJylcbiAgICB0aGlzLnVuYmluZEtleUV2ZW50cygpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHRpbWVvdXQgPSAxMDAwXG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKCdtZWRpYV9jb250cm9sJywge2Jhc2VVcmw6IHRoaXMub3B0aW9ucy5iYXNlVXJsfSk7XG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHsgc2V0dGluZ3M6IHRoaXMuc2V0dGluZ3MgfSkpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHRoaXMuY3JlYXRlQ2FjaGVkRWxlbWVudHMoKVxuICAgIHRoaXMuJHBsYXlQYXVzZVRvZ2dsZS5hZGRDbGFzcygncGF1c2VkJylcbiAgICB0aGlzLiRwbGF5U3RvcFRvZ2dsZS5hZGRDbGFzcygnc3RvcHBlZCcpXG5cbiAgICB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkoKVxuICAgIHRoaXMuaGlkZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGltZW91dClcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5oaWRlKClcbiAgICB9XG5cbiAgICBpZihCcm93c2VyLmlzU2FmYXJpICYmIEJyb3dzZXIuaXNNb2JpbGUpIHtcbiAgICAgIHRoaXMuJHZvbHVtZUNvbnRhaW5lci5jc3MoJ2Rpc3BsYXknLCdub25lJylcbiAgICB9XG5cbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24uYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB0aGlzLiRzZWVrQmFyU2NydWJiZXIuYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcblxuICAgIGlmICghdGhpcy5jdXJyZW50U2Vla1BlcmNlbnRhZ2UpIHtcbiAgICAgIHRoaXMuY3VycmVudFNlZWtQZXJjZW50YWdlID0gMFxuICAgIH1cbiAgICB0aGlzLnNldFNlZWtQZXJjZW50YWdlKHRoaXMuY3VycmVudFNlZWtQZXJjZW50YWdlKVxuXG4gICAgdGhpcy4kZWwucmVhZHkoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkge1xuICAgICAgICB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLmFkZENsYXNzKCdzZWVrLWRpc2FibGVkJylcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgICAgdGhpcy5iaW5kS2V5RXZlbnRzKClcbiAgICAgIHRoaXMuaGlkZVZvbHVtZUJhcigpXG4gICAgfSlcblxuICAgIHRoaXMucGFyc2VDb2xvcnMoKVxuICAgIHRoaXMuc2Vla1RpbWUucmVuZGVyKClcbiAgICB0aGlzLmhpZ2hEZWZpbml0aW9uVXBkYXRlKClcblxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX1JFTkRFUkVEKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNZWRpYUNvbnRyb2xcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnLi4vYmFzZS9iYXNlX29iamVjdCcpXG52YXIgQ29yZUZhY3RvcnkgPSByZXF1aXJlKCcuL2NvcmVfZmFjdG9yeScpXG52YXIgTG9hZGVyID0gcmVxdWlyZSgnLi9sb2FkZXInKVxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2xvZGFzaC5hc3NpZ24nKVxudmFyIHVuaXF1ZUlkID0gcmVxdWlyZSgnLi4vYmFzZS91dGlscycpLnVuaXF1ZUlkXG52YXIgUGxheWVySW5mbyA9IHJlcXVpcmUoJy4vcGxheWVyX2luZm8nKVxuXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgd2luZG93LnAgPSB0aGlzXG4gICAgdmFyIGRlZmF1bHRPcHRpb25zID0ge3BsYXllcklkOiB1bmlxdWVJZChcIlwiKSwgcGVyc2lzdENvbmZpZzogdHJ1ZSwgd2lkdGg6IDY0MCwgaGVpZ2h0OiAzNjAsIGJhc2VVcmw6ICdodHRwOi8vY2RuLmNsYXBwci5pby9sYXRlc3QnfVxuICAgIHRoaXMub3B0aW9ucyA9IGFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3B0aW9ucylcbiAgICB0aGlzLm9wdGlvbnMuc291cmNlcyA9IHRoaXMubm9ybWFsaXplU291cmNlcyhvcHRpb25zKVxuICAgIHRoaXMubG9hZGVyID0gbmV3IExvYWRlcih0aGlzLm9wdGlvbnMucGx1Z2lucyB8fCB7fSlcbiAgICB0aGlzLmNvcmVGYWN0b3J5ID0gbmV3IENvcmVGYWN0b3J5KHRoaXMsIHRoaXMubG9hZGVyKVxuICAgIFBsYXllckluZm8uY3VycmVudFNpemUgPSB7d2lkdGg6IG9wdGlvbnMud2lkdGgsIGhlaWdodDogb3B0aW9ucy5oZWlnaHR9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wYXJlbnRJZCkge1xuICAgICAgdGhpcy5zZXRQYXJlbnRJZCh0aGlzLm9wdGlvbnMucGFyZW50SWQpXG4gICAgfVxuICB9XG5cbiAgc2V0UGFyZW50SWQocGFyZW50SWQpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhcmVudElkKVxuICAgIGlmIChlbCkge1xuICAgICAgdGhpcy5hdHRhY2hUbyhlbClcbiAgICB9XG4gIH1cblxuICBhdHRhY2hUbyhlbGVtZW50KSB7XG4gICAgdGhpcy5vcHRpb25zLnBhcmVudEVsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy5jb3JlID0gdGhpcy5jb3JlRmFjdG9yeS5jcmVhdGUoKVxuICB9XG5cbiAgaXModmFsdWUsIHR5cGUpIHtcbiAgICByZXR1cm4gdmFsdWUuY29uc3RydWN0b3IgPT09IHR5cGVcbiAgfVxuXG4gIG5vcm1hbGl6ZVNvdXJjZXMob3B0aW9ucykge1xuICAgIHZhciBzb3VyY2VzID0gb3B0aW9ucy5zb3VyY2VzIHx8IChvcHRpb25zLnNvdXJjZSAhPT0gdW5kZWZpbmVkPyBbb3B0aW9ucy5zb3VyY2UudG9TdHJpbmcoKV0gOiBbXSlcbiAgICByZXR1cm4gc291cmNlcy5sZW5ndGggPT09IDAgPyBbJ25vLm9wJ10gOiBzb3VyY2VzXG4gIH1cblxuICByZXNpemUoc2l6ZSkge1xuICAgIHRoaXMuY29yZS5yZXNpemUoc2l6ZSk7XG4gIH1cblxuICBsb2FkKHNvdXJjZXMpIHtcbiAgICB0aGlzLmNvcmUubG9hZChzb3VyY2VzKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmNvcmUuZGVzdHJveSgpXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnBsYXkoKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnBhdXNlKCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnN0b3AoKTtcbiAgfVxuXG4gIHNlZWsodGltZSkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldEN1cnJlbnRUaW1lKHRpbWUpO1xuICB9XG5cbiAgc2V0Vm9sdW1lKHZvbHVtZSkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICB9XG5cbiAgbXV0ZSgpIHtcbiAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5zZXRWb2x1bWUoMCk7XG4gIH1cblxuICB1bm11dGUoKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc2V0Vm9sdW1lKDEwMCk7XG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLmlzUGxheWluZygpO1xuICB9XG5cbiAgZ2V0Q29udGFpbmVyUGx1Z2luKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuZ2V0UGx1Z2luKG5hbWUpXG4gIH1cblxuICBnZXRDb3JlUGx1Z2luKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JlLmdldFBsdWdpbihuYW1lKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyXG5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zZWVrX3RpbWUnKTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBVSU9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdWlfb2JqZWN0JylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIGZvcm1hdFRpbWUgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykuZm9ybWF0VGltZVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcblxuY2xhc3MgU2Vla1RpbWUgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ3NlZWtfdGltZScgfVxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIEpTVC5zZWVrX3RpbWU7XG4gIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGFzcyc6ICdzZWVrLXRpbWUgaGlkZGVuJyxcbiAgICAgICdkYXRhLXNlZWstdGltZSc6ICcnXG4gICAgfTtcbiAgfVxuICBjb25zdHJ1Y3RvcihtZWRpYUNvbnRyb2wpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5tZWRpYUNvbnRyb2wgPSBtZWRpYUNvbnRyb2xcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKClcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5tZWRpYUNvbnRyb2wsIEV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VNT1ZFX1NFRUtCQVIsIHRoaXMuc2hvd1RpbWUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9NT1VTRUxFQVZFX1NFRUtCQVIsIHRoaXMuaGlkZVRpbWUpXG4gIH1cblxuICBzaG93VGltZShldmVudCkge1xuICAgIHZhciBvZmZzZXQgPSBldmVudC5wYWdlWCAtIHRoaXMubWVkaWFDb250cm9sLiRzZWVrQmFyQ29udGFpbmVyLm9mZnNldCgpLmxlZnRcbiAgICB2YXIgdGltZVBvc2l0aW9uID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heCgob2Zmc2V0KSAvIHRoaXMubWVkaWFDb250cm9sLiRzZWVrQmFyQ29udGFpbmVyLndpZHRoKCkgKiAxMDAsIDApKVxuICAgIHZhciBwb2ludGVyUG9zaXRpb24gPSBldmVudC5wYWdlWCAtIHRoaXMubWVkaWFDb250cm9sLiRlbC5vZmZzZXQoKS5sZWZ0XG4gICAgcG9pbnRlclBvc2l0aW9uID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgcG9pbnRlclBvc2l0aW9uKSwgdGhpcy5tZWRpYUNvbnRyb2wuJGVsLndpZHRoKCkgLSB0aGlzLiRlbC53aWR0aCgpKVxuICAgIHZhciBjdXJyZW50VGltZSA9IHRpbWVQb3NpdGlvbiAqIHRoaXMubWVkaWFDb250cm9sLmNvbnRhaW5lci5nZXREdXJhdGlvbigpIC8gMTAwXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB0aW1lc3RhbXA6IGN1cnJlbnRUaW1lLFxuICAgICAgZm9ybWF0dGVkVGltZTogZm9ybWF0VGltZShjdXJyZW50VGltZSksXG4gICAgICBwb2ludGVyUG9zaXRpb246IHBvaW50ZXJQb3NpdGlvblxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlKG9wdGlvbnMpXG4gIH1cblxuICBoaWRlVGltZSgpIHtcbiAgICB0aGlzLiRlbC5hZGRDbGFzcygnaGlkZGVuJylcbiAgICB0aGlzLiRlbC5jc3MoJ2xlZnQnLCAnLTEwMCUnKVxuICB9XG5cbiAgdXBkYXRlKG9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy5tZWRpYUNvbnRyb2wuY29udGFpbmVyLmdldFBsYXliYWNrVHlwZSgpID09PSAndm9kJyB8fCB0aGlzLm1lZGlhQ29udHJvbC5jb250YWluZXIuaXNEdnJJblVzZSgpKSB7XG4gICAgICB0aGlzLiRlbC5maW5kKCdbZGF0YS1zZWVrLXRpbWVdJykudGV4dChvcHRpb25zLmZvcm1hdHRlZFRpbWUpXG4gICAgICB0aGlzLiRlbC5jc3MoJ2xlZnQnLCBvcHRpb25zLnBvaW50ZXJQb3NpdGlvbiAtICh0aGlzLiRlbC53aWR0aCgpIC8gMikpXG4gICAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnaGlkZGVuJylcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKTtcbiAgICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKTtcbiAgICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSk7XG4gICAgICB0aGlzLm1lZGlhQ29udHJvbC4kZWwuYXBwZW5kKHRoaXMuZWwpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2Vla1RpbWU7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3BsYXliYWNrJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIE1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9tZWRpYXRvcicpXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3RlbXBsYXRlJylcbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJylcbnZhciBCcm93c2VyID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9icm93c2VyJylcbnZhciBzZWVrU3RyaW5nVG9TZWNvbmRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpLnNlZWtTdHJpbmdUb1NlY29uZHNcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG52YXIgS2libyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uva2libycpXG5cbnZhciBvYmplY3RJRSA9ICc8b2JqZWN0IHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIGlkPVwiPCU9IGNpZCAlPlwiIGNsYXNzaWQ9XCJjbHNpZDpkMjdjZGI2ZS1hZTZkLTExY2YtOTZiOC00NDQ1NTM1NDAwMDBcIiBkYXRhLWZsYXNoLXZvZD1cIlwiPjxwYXJhbSBuYW1lPVwibW92aWVcIiB2YWx1ZT1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXIuc3dmXCI+IDxwYXJhbSBuYW1lPVwicXVhbGl0eVwiIHZhbHVlPVwiYXV0b2hpZ2hcIj4gPHBhcmFtIG5hbWU9XCJzd2xpdmVjb25uZWN0XCIgdmFsdWU9XCJ0cnVlXCI+IDxwYXJhbSBuYW1lPVwiYWxsb3dTY3JpcHRBY2Nlc3NcIiB2YWx1ZT1cImFsd2F5c1wiPiA8cGFyYW0gbmFtZT1cImJnY29sb3JcIiB2YWx1ZT1cIiMwMDExMjJcIj4gPHBhcmFtIG5hbWU9XCJhbGxvd0Z1bGxTY3JlZW5cIiB2YWx1ZT1cImZhbHNlXCI+IDxwYXJhbSBuYW1lPVwid21vZGVcIiB2YWx1ZT1cImdwdVwiPiA8cGFyYW0gbmFtZT1cInRhYmluZGV4XCIgdmFsdWU9XCIxXCI+IDxwYXJhbSBuYW1lPUZsYXNoVmFycyB2YWx1ZT1cInBsYXliYWNrSWQ9PCU9IHBsYXliYWNrSWQgJT5cIiAvPiA8L29iamVjdD4nXG5cbmNsYXNzIEZsYXNoIGV4dGVuZHMgUGxheWJhY2sge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdmbGFzaCcgfVxuICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdvYmplY3QnIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULmZsYXNoIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnNyYyA9IG9wdGlvbnMuc3JjXG4gICAgdGhpcy5iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsXG4gICAgdGhpcy5hdXRvUGxheSA9IG9wdGlvbnMuYXV0b1BsYXlcbiAgICB0aGlzLnNldHRpbmdzID0ge2RlZmF1bHQ6IFsnc2Vla2JhciddfVxuICAgIHRoaXMuc2V0dGluZ3MubGVmdCA9IFtcInBsYXlwYXVzZVwiLCBcInBvc2l0aW9uXCIsIFwiZHVyYXRpb25cIl1cbiAgICB0aGlzLnNldHRpbmdzLnJpZ2h0ID0gW1wiZnVsbHNjcmVlblwiLCBcInZvbHVtZVwiXVxuICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5pc1JlYWR5ID0gZmFsc2VcbiAgICB0aGlzLmtpYm8gPSBuZXcgS2libygpXG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKVxuICB9XG5cblxuICBib290c3RyYXAoKSB7XG4gICAgdGhpcy5lbC53aWR0aCA9IFwiMTAwJVwiXG4gICAgdGhpcy5lbC5oZWlnaHQgPSBcIjEwMCVcIlxuICAgIHRoaXMuaXNSZWFkeSA9IHRydWVcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgPT09ICdQTEFZSU5HJykge1xuICAgICAgdGhpcy5maXJzdFBsYXkoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiSURMRVwiXG4gICAgICB0aGlzLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpXG4gICAgfVxuICAgICQoJzxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJVwiIC8+JykuaW5zZXJ0QWZ0ZXIodGhpcy4kZWwpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiAndm9kJ1xuICB9XG5cbiAgc2V0dXBGaXJlZm94KCkge1xuICAgIHZhciAkZWwgPSB0aGlzLiQoJ2VtYmVkJylcbiAgICAkZWwuYXR0cignZGF0YS1mbGFzaCcsICcnKVxuICAgIHRoaXMuc2V0RWxlbWVudCgkZWxbMF0pXG4gIH1cblxuICBpc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB1cGRhdGVUaW1lKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy5lbC5nZXRQb3NpdGlvbigpLCB0aGlzLmVsLmdldER1cmF0aW9uKCksIHRoaXMubmFtZSlcbiAgfVxuXG4gIGFkZExpc3RlbmVycygpIHtcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpwcm9ncmVzcycsIHRoaXMucHJvZ3Jlc3MsIHRoaXMpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6dGltZXVwZGF0ZScsIHRoaXMudXBkYXRlVGltZSwgdGhpcylcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpzdGF0ZWNoYW5nZWQnLCB0aGlzLmNoZWNrU3RhdGUsIHRoaXMpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScsIHRoaXMuYm9vdHN0cmFwLCB0aGlzKVxuICAgIFsxLDIsMyw0LDUsNiw3LDgsOV0uZm9yRWFjaCgoaSkgPT4geyB0aGlzLmtpYm8uZG93bihpLnRvU3RyaW5nKCksICgpID0+IHRoaXMuc2VlayhpICogMTApKSB9KVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6cHJvZ3Jlc3MnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzp0aW1ldXBkYXRlJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6c3RhdGVjaGFuZ2VkJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScpXG4gICAgdGhpcy5raWJvLm9mZihbMSwyLDMsNCw1LDYsNyw4LDldKVxuICB9XG5cbiAgY2hlY2tTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgPT09IFwiUEFVU0VEXCIpIHtcbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50U3RhdGUgIT09IFwiUExBWUlOR19CVUZGRVJJTkdcIiAmJiB0aGlzLmVsLmdldFN0YXRlKCkgPT09IFwiUExBWUlOR19CVUZGRVJJTkdcIikge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJJTkcsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJQTEFZSU5HX0JVRkZFUklOR1wiXG4gICAgfSBlbHNlIGlmICh0aGlzLmVsLmdldFN0YXRlKCkgPT09IFwiUExBWUlOR1wiKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJQTEFZSU5HXCJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gXCJJRExFXCIpIHtcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJJRExFXCJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gXCJFTkRFRFwiKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0VOREVELCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDAsIHRoaXMuZWwuZ2V0RHVyYXRpb24oKSwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIkVOREVEXCJcbiAgICB9XG4gIH1cblxuICBwcm9ncmVzcygpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgIT09IFwiSURMRVwiICYmIHRoaXMuY3VycmVudFN0YXRlICE9PSBcIkVOREVEXCIpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUFJPR1JFU1MsIDAsIHRoaXMuZWwuZ2V0Qnl0ZXNMb2FkZWQoKSwgdGhpcy5lbC5nZXRCeXRlc1RvdGFsKCksIHRoaXMubmFtZSlcbiAgICB9XG4gIH1cblxuICBmaXJzdFBsYXkoKSB7XG4gICAgaWYgKHRoaXMuZWwucGxheWVyUGxheSkge1xuICAgICAgdGhpcy5lbC5wbGF5ZXJQbGF5KHRoaXMuc3JjKVxuICAgICAgdGhpcy5saXN0ZW5Ub09uY2UodGhpcywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsICgpID0+IHRoaXMuY2hlY2tJbml0aWFsU2VlaygpKVxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3RlblRvT25jZSh0aGlzLCBFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMuZmlyc3RQbGF5KVxuICAgIH1cbiAgfVxuXG4gIGNoZWNrSW5pdGlhbFNlZWsoKSB7XG4gICAgdmFyIHNlZWtUaW1lID0gc2Vla1N0cmluZ1RvU2Vjb25kcyh3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICBpZiAoc2Vla1RpbWUgIT09IDApIHtcbiAgICAgIHRoaXMuc2Vla1NlY29uZHMoc2Vla1RpbWUpXG4gICAgfVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpID09PSAnUEFVU0VEJyB8fCB0aGlzLmVsLmdldFN0YXRlKCkgPT09ICdQTEFZSU5HX0JVRkZFUklORycpIHtcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJQTEFZSU5HXCJcbiAgICAgIHRoaXMuZWwucGxheWVyUmVzdW1lKClcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWwuZ2V0U3RhdGUoKSAhPT0gJ1BMQVlJTkcnKSB7XG4gICAgICB0aGlzLmZpcnN0UGxheSgpXG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUExBWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuaXNSZWFkeSkge1xuICAgICAgdGhpcy5lbC5wbGF5ZXJWb2x1bWUodmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdGVuVG9PbmNlKHRoaXMsIEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCAoKSA9PiB0aGlzLnZvbHVtZSh2YWx1ZSkpXG4gICAgfVxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBBVVNFRFwiXG4gICAgdGhpcy5lbC5wbGF5ZXJQYXVzZSgpXG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZWwucGxheWVyU3RvcCgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCAwLCB0aGlzLm5hbWUpXG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuICEhKHRoaXMuaXNSZWFkeSAmJiB0aGlzLmN1cnJlbnRTdGF0ZS5pbmRleE9mKFwiUExBWUlOR1wiKSA+IC0xKVxuICB9XG5cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwuZ2V0RHVyYXRpb24oKVxuICB9XG5cbiAgc2VlayhzZWVrQmFyVmFsdWUpIHtcbiAgICB2YXIgc2Vla1RvID0gdGhpcy5lbC5nZXREdXJhdGlvbigpICogKHNlZWtCYXJWYWx1ZSAvIDEwMClcbiAgICB0aGlzLnNlZWtTZWNvbmRzKHNlZWtUbylcbiAgfVxuXG4gIHNlZWtTZWNvbmRzKHNlZWtUbykge1xuICAgIHRoaXMuZWwucGxheWVyU2VlayhzZWVrVG8pXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCBzZWVrVG8sIHRoaXMuZWwuZ2V0RHVyYXRpb24oKSwgdGhpcy5uYW1lKVxuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gXCJQQVVTRURcIikge1xuICAgICAgdGhpcy5lbC5wbGF5ZXJQYXVzZSgpXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuYm9vdHN0cmFwSWQpXG4gICAgc3VwZXIuc3RvcExpc3RlbmluZygpXG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxuXG4gIHNldHVwSUUoKSB7XG4gICAgdGhpcy5zZXRFbGVtZW50KCQodGVtcGxhdGUob2JqZWN0SUUpKHsgY2lkOiB0aGlzLmNpZCwgYmFzZVVybDogdGhpcy5iYXNlVXJsLCBwbGF5YmFja0lkOiB0aGlzLnVuaXF1ZUlkIH0pKSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7IGNpZDogdGhpcy5jaWQsIGJhc2VVcmw6IHRoaXMuYmFzZVVybCwgcGxheWJhY2tJZDogdGhpcy51bmlxdWVJZCB9KSlcbiAgICBpZihCcm93c2VyLmlzRmlyZWZveCkge1xuICAgICAgdGhpcy5zZXR1cEZpcmVmb3goKVxuICAgIH0gZWxzZSBpZihCcm93c2VyLmlzTGVnYWN5SUUpIHtcbiAgICAgIHRoaXMuc2V0dXBJRSgpXG4gICAgfVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbkZsYXNoLmNhblBsYXkgPSBmdW5jdGlvbihyZXNvdXJjZSkge1xuICBpZiAoIUJyb3dzZXIuaGFzRmxhc2gpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfSBlbHNlIGlmICgoIUJyb3dzZXIuaXNNb2JpbGUgJiYgQnJvd3Nlci5pc0ZpcmVmb3gpIHx8IEJyb3dzZXIuaXNMZWdhY3lJRSkge1xuICAgIHJldHVybiAocmVzb3VyY2UgJiYgcmVzb3VyY2UuY29uc3RydWN0b3IgPT09IFN0cmluZykgJiYgISFyZXNvdXJjZS5tYXRjaCgvKC4qKVxcLihtcDR8bW92fGY0dnwzZ3BwfDNncCkvKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAocmVzb3VyY2UgJiYgcmVzb3VyY2UuY29uc3RydWN0b3IgPT09IFN0cmluZykgJiYgISFyZXNvdXJjZS5tYXRjaCgvKC4qKVxcLihtb3Z8ZjR2fDNncHB8M2dwKS8pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaFxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXliYWNrID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9wbGF5YmFjaycpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2xvZGFzaC5hc3NpZ24nKVxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi4vLi4vYmFzZS90ZW1wbGF0ZScpXG5cbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvbWVkaWF0b3InKVxudmFyIEJyb3dzZXIgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Jyb3dzZXInKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgJCA9IHJlcXVpcmUoJ2NsYXBwci16ZXB0bycpXG5cbnZhciBvYmplY3RJRSA9ICc8b2JqZWN0IHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIGlkPVwiPCU9IGNpZCAlPlwiIGNsYXNzPVwiaGxzLXBsYXliYWNrXCIgY2xhc3NpZD1cImNsc2lkOmQyN2NkYjZlLWFlNmQtMTFjZi05NmI4LTQ0NDU1MzU0MDAwMFwiIGRhdGEtaGxzPVwiXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPjxwYXJhbSBuYW1lPVwibW92aWVcIiB2YWx1ZT1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9ITFNQbGF5ZXIuc3dmXCI+IDxwYXJhbSBuYW1lPVwicXVhbGl0eVwiIHZhbHVlPVwiYXV0b2hpZ2hcIj4gPHBhcmFtIG5hbWU9XCJzd2xpdmVjb25uZWN0XCIgdmFsdWU9XCJ0cnVlXCI+IDxwYXJhbSBuYW1lPVwiYWxsb3dTY3JpcHRBY2Nlc3NcIiB2YWx1ZT1cImFsd2F5c1wiPiA8cGFyYW0gbmFtZT1cImJnY29sb3JcIiB2YWx1ZT1cIiMwMDExMjJcIj4gPHBhcmFtIG5hbWU9XCJhbGxvd0Z1bGxTY3JlZW5cIiB2YWx1ZT1cImZhbHNlXCI+IDxwYXJhbSBuYW1lPVwid21vZGVcIiB2YWx1ZT1cInRyYW5zcGFyZW50XCI+IDxwYXJhbSBuYW1lPVwidGFiaW5kZXhcIiB2YWx1ZT1cIjFcIj4gPHBhcmFtIG5hbWU9Rmxhc2hWYXJzIHZhbHVlPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPlwiIC8+IDwvb2JqZWN0PidcblxuY2xhc3MgSExTIGV4dGVuZHMgUGxheWJhY2sge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdobHMnIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnb2JqZWN0JyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5obHMgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsYXNzJzogJ2hscy1wbGF5YmFjaycsXG4gICAgICAnZGF0YS1obHMnOiAnJyxcbiAgICAgICd0eXBlJzogJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyxcbiAgICAgICd3aWR0aCc6ICcxMDAlJyxcbiAgICAgICdoZWlnaHQnOiAnMTAwJSdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnNyYyA9IG9wdGlvbnMuc3JjXG4gICAgdGhpcy5iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsO1xuICAgIHRoaXMuZmx1c2hMaXZlVVJMQ2FjaGUgPSAob3B0aW9ucy5mbHVzaExpdmVVUkxDYWNoZSA9PT0gdW5kZWZpbmVkKT8gdHJ1ZTogb3B0aW9ucy5mbHVzaExpdmVVUkxDYWNoZVxuICAgIHRoaXMuY2FwTGV2ZWxUb1N0YWdlID0gKG9wdGlvbnMuY2FwTGV2ZWxUb1N0YWdlID09PSB1bmRlZmluZWQpPyBmYWxzZTogb3B0aW9ucy5jYXBMZXZlbFRvU3RhZ2VcbiAgICB0aGlzLmhpZ2hEZWZpbml0aW9uID0gZmFsc2VcbiAgICB0aGlzLmF1dG9QbGF5ID0gb3B0aW9ucy5hdXRvUGxheVxuICAgIHRoaXMuZGVmYXVsdFNldHRpbmdzID0ge1xuICAgICAgbGVmdDogW1wicGxheXN0b3BcIl0sXG4gICAgICBkZWZhdWx0OiBbJ3NlZWtiYXInXSxcbiAgICAgIHJpZ2h0OiBbXCJmdWxsc2NyZWVuXCIsIFwidm9sdW1lXCIsIFwiaGQtaW5kaWNhdG9yXCJdLFxuICAgICAgc2Vla0VuYWJsZWQ6IGZhbHNlXG4gICAgfVxuICAgIHRoaXMuc2V0dGluZ3MgPSBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdFNldHRpbmdzKVxuICAgIHRoaXMucGxheWJhY2tUeXBlID0gJ2xpdmUnXG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgYWRkTGlzdGVuZXJzKCkge1xuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOmZsYXNocmVhZHknLCAoKSA9PiB0aGlzLmJvb3RzdHJhcCgpKVxuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOnRpbWV1cGRhdGUnLCAoKSA9PiB0aGlzLnVwZGF0ZVRpbWUoKSlcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpwbGF5YmFja3N0YXRlJywgKHN0YXRlKSA9PiB0aGlzLnNldFBsYXliYWNrU3RhdGUoc3RhdGUpKVxuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOmxldmVsY2hhbmdlZCcsIChpc0hEKSA9PiB0aGlzLnVwZGF0ZUhpZ2hEZWZpbml0aW9uKGlzSEQpKVxuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOnBsYXliYWNrZXJyb3InLCAoKSA9PiB0aGlzLmZsYXNoUGxheWJhY2tFcnJvcigpKVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOnRpbWV1cGRhdGUnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpwbGF5YmFja3N0YXRlJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6bGV2ZWxjaGFuZ2VkJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6cGxheWJhY2tlcnJvcicpXG4gIH1cblxuICBib290c3RyYXAoKSB7XG4gICAgdGhpcy5lbC53aWR0aCA9IFwiMTAwJVwiXG4gICAgdGhpcy5lbC5oZWlnaHQgPSBcIjEwMCVcIlxuICAgIHRoaXMuaXNSZWFkeSA9IHRydWVcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiSURMRVwiXG4gICAgdGhpcy5zZXRGbGFzaFNldHRpbmdzKClcbiAgICB0aGlzLnVwZGF0ZVBsYXliYWNrVHlwZSgpXG4gICAgdGhpcy5hdXRvUGxheSAmJiB0aGlzLnBsYXkoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMubmFtZSlcbiAgfVxuXG4gIHNldEZsYXNoU2V0dGluZ3MoKSB7XG4gICAgdGhpcy5lbC5nbG9ib1BsYXllclNldGZsdXNoTGl2ZVVSTENhY2hlKHRoaXMuZmx1c2hMaXZlVVJMQ2FjaGUpXG4gICAgdGhpcy5lbC5nbG9ib1BsYXllckNhcExldmVsdG9TdGFnZSh0aGlzLmNhcExldmVsVG9TdGFnZSlcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyU2V0bWF4QnVmZmVyTGVuZ3RoKDApXG4gIH1cblxuICB1cGRhdGVIaWdoRGVmaW5pdGlvbihpc0hEKSB7XG4gICAgdGhpcy5oaWdoRGVmaW5pdGlvbiA9IChpc0hEID09PSBcImhkXCIpO1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfSElHSERFRklOSVRJT05VUERBVEUpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CSVRSQVRFLCB7J2JpdHJhdGUnOiB0aGlzLmdldEN1cnJlbnRCaXRyYXRlKCl9KVxuICB9XG5cbiAgdXBkYXRlVGltZSgpIHtcbiAgICB2YXIgZHVyYXRpb24gPSB0aGlzLmdldER1cmF0aW9uKClcbiAgICB2YXIgcG9zaXRpb24gPSBNYXRoLm1pbihNYXRoLm1heCh0aGlzLmVsLmdsb2JvR2V0UG9zaXRpb24oKSwgMCksIGR1cmF0aW9uKVxuICAgIHZhciBwcmV2aW91c0RWUlN0YXR1cyA9IHRoaXMuZHZyRW5hYmxlZFxuICAgIHZhciBsaXZlUGxheWJhY2sgPSAodGhpcy5wbGF5YmFja1R5cGUgPT09ICdsaXZlJylcbiAgICB0aGlzLmR2ckVuYWJsZWQgPSAobGl2ZVBsYXliYWNrICYmIGR1cmF0aW9uID4gMjQwKVxuXG4gICAgaWYgKGR1cmF0aW9uID09PSAxMDAgfHwgbGl2ZVBsYXliYWNrID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kdnJFbmFibGVkICE9PSBwcmV2aW91c0RWUlN0YXR1cykge1xuICAgICAgdGhpcy51cGRhdGVTZXR0aW5ncygpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFLCB0aGlzLm5hbWUpXG4gICAgfVxuXG4gICAgaWYgKGxpdmVQbGF5YmFjayAmJiAoIXRoaXMuZHZyRW5hYmxlZCB8fCAhdGhpcy5kdnJJblVzZSkpIHtcbiAgICAgIHBvc2l0aW9uID0gZHVyYXRpb25cbiAgICB9XG5cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHBvc2l0aW9uLCBkdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gJ1BBVVNFRCcpIHtcbiAgICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJSZXN1bWUoKVxuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50U3RhdGUgIT09IFwiUExBWUlOR1wiKSB7XG4gICAgICB0aGlzLmZpcnN0UGxheSgpXG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUExBWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXliYWNrVHlwZT8gdGhpcy5wbGF5YmFja1R5cGU6IG51bGxcbiAgfVxuXG4gIGdldEN1cnJlbnRCaXRyYXRlKCkge1xuICAgIHZhciBjdXJyZW50TGV2ZWwgPSB0aGlzLmdldExldmVscygpW3RoaXMuZWwuZ2xvYm9HZXRMZXZlbCgpXVxuICAgIHJldHVybiBjdXJyZW50TGV2ZWwuYml0cmF0ZVxuICB9XG5cbiAgaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkge1xuICAgIHJldHVybiB0aGlzLmhpZ2hEZWZpbml0aW9uXG4gIH1cblxuICBnZXRMZXZlbHMoKSB7XG4gICAgaWYgKCF0aGlzLmxldmVscyB8fCB0aGlzLmxldmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMubGV2ZWxzID0gdGhpcy5lbC5nbG9ib0dldExldmVscygpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxldmVsc1xuICB9XG5cbiAgc2V0UGxheWJhY2tTdGF0ZShzdGF0ZSkge1xuICAgIHZhciBidWZmZXJMZW5ndGggPSB0aGlzLmVsLmdsb2JvR2V0YnVmZmVyTGVuZ3RoKClcbiAgICBpZiAoc3RhdGUgPT09IFwiUExBWUlOR19CVUZGRVJJTkdcIiAmJiBidWZmZXJMZW5ndGggPCAxKSAge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJJTkcsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMudXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlKVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwiUExBWUlOR1wiKSB7XG4gICAgICBpZiAoW1wiUExBWUlOR19CVUZGRVJJTkdcIiwgXCJQQVVTRURcIiwgXCJJRExFXCJdLmluZGV4T2YodGhpcy5jdXJyZW50U3RhdGUpID49IDApIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCB0aGlzLm5hbWUpXG4gICAgICAgIHRoaXMudXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwiUEFVU0VEXCIpIHtcbiAgICAgIHRoaXMudXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlKVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwiSURMRVwiKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0VOREVELCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDAsIHRoaXMuZWwuZ2xvYm9HZXREdXJhdGlvbigpLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRTdGF0ZShzdGF0ZSlcbiAgICB9XG4gICAgdGhpcy5sYXN0QnVmZmVyTGVuZ3RoID0gYnVmZmVyTGVuZ3RoXG4gIH1cblxuICB1cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHN0YXRlXG4gICAgdGhpcy51cGRhdGVQbGF5YmFja1R5cGUoKVxuICB9XG5cbiAgdXBkYXRlUGxheWJhY2tUeXBlKCkge1xuICAgIHRoaXMucGxheWJhY2tUeXBlID0gdGhpcy5lbC5nbG9ib0dldFR5cGUoKVxuICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSkge1xuICAgICAgdGhpcy5wbGF5YmFja1R5cGUgPSB0aGlzLnBsYXliYWNrVHlwZS50b0xvd2VyQ2FzZSgpXG4gICAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUgPT09ICd2b2QnKSB7XG4gICAgICAgIHRoaXMuc3RhcnRSZXBvcnRpbmdQcm9ncmVzcygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0b3BSZXBvcnRpbmdQcm9ncmVzcygpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUExBWUJBQ0tTVEFURSlcbiAgfVxuXG4gIHN0YXJ0UmVwb3J0aW5nUHJvZ3Jlc3MoKSB7XG4gICAgaWYgKCF0aGlzLnJlcG9ydGluZ1Byb2dyZXNzKSB7XG4gICAgICB0aGlzLnJlcG9ydGluZ1Byb2dyZXNzID0gdHJ1ZVxuICAgICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6ZnJhZ21lbnRsb2FkZWQnLCgpID0+IHRoaXMub25GcmFnbWVudExvYWRlZCgpKVxuICAgIH1cbiAgfVxuXG4gIHN0b3BSZXBvcnRpbmdQcm9ncmVzcygpIHtcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6ZnJhZ21lbnRsb2FkZWQnLCB0aGlzLm9uRnJhZ21lbnRMb2FkZWQsIHRoaXMpXG4gIH1cblxuICBvbkZyYWdtZW50TG9hZGVkKCkge1xuICAgIHZhciBidWZmZXJlZCA9IHRoaXMuZWwuZ2xvYm9HZXRQb3NpdGlvbigpICsgdGhpcy5lbC5nbG9ib0dldGJ1ZmZlckxlbmd0aCgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgdGhpcy5lbC5nbG9ib0dldFBvc2l0aW9uKCksIGJ1ZmZlcmVkLCB0aGlzLmdldER1cmF0aW9uKCksIHRoaXMubmFtZSlcbiAgfVxuXG4gIGZpcnN0UGxheSgpIHtcbiAgICB0aGlzLnNldEZsYXNoU2V0dGluZ3MoKSAvL2Vuc3VyZSBmbHVzaExpdmVVUkxDYWNoZSB3aWxsIHdvcmsgKCMzMjcpXG4gICAgdGhpcy5lbC5nbG9ib1BsYXllckxvYWQodGhpcy5zcmMpXG4gICAgdGhpcy5lbC5nbG9ib1BsYXllclBsYXkoKVxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuaXNSZWFkeSkge1xuICAgICAgdGhpcy5lbC5nbG9ib1BsYXllclZvbHVtZSh2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5Ub09uY2UodGhpcywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsICgpID0+IHRoaXMudm9sdW1lKHZhbHVlKSlcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUgIT09ICdsaXZlJyB8fCB0aGlzLmR2ckVuYWJsZWQpIHtcbiAgICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJQYXVzZSgpXG4gICAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUgPT09ICdsaXZlJyAmJiB0aGlzLmR2ckVuYWJsZWQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVEdnIodHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJTdG9wKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDAsIHRoaXMubmFtZSlcbiAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUpIHtcbiAgICAgIHJldHVybiAhISh0aGlzLmN1cnJlbnRTdGF0ZS5tYXRjaCgvcGxheWluZy9pKSlcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICB2YXIgZHVyYXRpb24gPSB0aGlzLmVsLmdsb2JvR2V0RHVyYXRpb24oKVxuICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gJ2xpdmUnKSB7XG4gICAgICAvLyBlc3RpbWF0ZSAxMCBzZWNvbmRzIG9mIGJ1ZmZlciB0aW1lIGZvciBsaXZlIHN0cmVhbXMgZm9yIHNlZWsgcG9zaXRpb25zXG4gICAgICBkdXJhdGlvbiA9IGR1cmF0aW9uIC0gMTBcbiAgICB9XG4gICAgcmV0dXJuIGR1cmF0aW9uXG4gIH1cblxuICBzZWVrKHRpbWUpIHtcbiAgICB2YXIgZHVyYXRpb24gPSB0aGlzLmdldER1cmF0aW9uKClcbiAgICBpZiAodGltZSA+IDApIHtcbiAgICAgIHRpbWUgPSBkdXJhdGlvbiAqIHRpbWUgLyAxMDBcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUgPT09ICdsaXZlJykge1xuICAgICAgLy8gc2VlayBvcGVyYXRpb25zIHRvIGEgdGltZSB3aXRoaW4gNSBzZWNvbmRzIGZyb20gbGl2ZSBzdHJlYW0gd2lsbCBwb3NpdGlvbiBwbGF5aGVhZCBiYWNrIHRvIGxpdmVcbiAgICAgIHZhciBkdnJJblVzZSA9ICh0aW1lID49IDAgJiYgZHVyYXRpb24gLSB0aW1lID4gNSlcbiAgICAgIGlmICghZHZySW5Vc2UpIHtcbiAgICAgICAgdGltZSA9IC0xXG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZUR2cihkdnJJblVzZSlcbiAgICB9XG4gICAgdGhpcy5lbC5nbG9ib1BsYXllclNlZWsodGltZSlcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRpbWUsIGR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19ISUdIREVGSU5JVElPTlVQREFURSlcbiAgfVxuXG4gIHVwZGF0ZUR2cihkdnJJblVzZSkge1xuICAgIHZhciBwcmV2aW91c0R2ckluVXNlID0gISF0aGlzLmR2ckluVXNlXG4gICAgdGhpcy5kdnJJblVzZSA9IGR2ckluVXNlXG4gICAgaWYgKHRoaXMuZHZySW5Vc2UgIT09IHByZXZpb3VzRHZySW5Vc2UpIHtcbiAgICAgIHRoaXMudXBkYXRlU2V0dGluZ3MoKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19EVlIsIHRoaXMuZHZySW5Vc2UpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1NUQVRTX0FERCwgeydkdnInOiB0aGlzLmR2ckluVXNlfSlcbiAgICB9XG4gIH1cblxuICBmbGFzaFBsYXliYWNrRXJyb3IoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19TVE9QKVxuICB9XG5cbiAgdGltZVVwZGF0ZSh0aW1lLCBkdXJhdGlvbikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGltZSwgZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICB9XG5cbiAgc2V0dXBGaXJlZm94KCkge1xuICAgIHZhciAkZWwgPSB0aGlzLiQoJ2VtYmVkJylcbiAgICAkZWwuYXR0cignZGF0YS1obHMnLCAnJylcbiAgICB0aGlzLnNldEVsZW1lbnQoJGVsKVxuICB9XG5cbiAgc2V0dXBJRSgpIHtcbiAgICB0aGlzLnNldEVsZW1lbnQoJCh0ZW1wbGF0ZShvYmplY3RJRSkoe2NpZDogdGhpcy5jaWQsIGJhc2VVcmw6IHRoaXMuYmFzZVVybCwgcGxheWJhY2tJZDogdGhpcy51bmlxdWVJZH0pKSlcbiAgfVxuXG4gIHVwZGF0ZVNldHRpbmdzKCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdFNldHRpbmdzKVxuICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gXCJ2b2RcIiB8fCB0aGlzLmR2ckluVXNlKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSBbXCJwbGF5cGF1c2VcIiwgXCJwb3NpdGlvblwiLCBcImR1cmF0aW9uXCJdXG4gICAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gdHJ1ZVxuICAgIH0gZWxzZSBpZiAodGhpcy5kdnJFbmFibGVkKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSBbXCJwbGF5cGF1c2VcIl1cbiAgICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHNldEVsZW1lbnQoZWxlbWVudCkge1xuICAgIHRoaXMuJGVsID0gZWxlbWVudFxuICAgIHRoaXMuZWwgPSBlbGVtZW50WzBdXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSlcbiAgICBpZihCcm93c2VyLmlzTGVnYWN5SUUpIHtcbiAgICAgIHRoaXMuc2V0dXBJRSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7Y2lkOiB0aGlzLmNpZCwgYmFzZVVybDogdGhpcy5iYXNlVXJsLCBwbGF5YmFja0lkOiB0aGlzLnVuaXF1ZUlkfSkpXG4gICAgICBpZihCcm93c2VyLmlzRmlyZWZveCkge1xuICAgICAgICB0aGlzLnNldHVwRmlyZWZveCgpXG4gICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNJRSkge1xuICAgICAgICB0aGlzLiQoJ2VtYmVkJykucmVtb3ZlKClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5lbC5pZCA9IHRoaXMuY2lkXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuSExTLmNhblBsYXkgPSBmdW5jdGlvbihyZXNvdXJjZSkge1xuICByZXR1cm4gISEocmVzb3VyY2UubWF0Y2goL15odHRwKC4qKS5tM3U4Py8pICYmIEJyb3dzZXIuaGFzRmxhc2gpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gSExTXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3BsYXliYWNrJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJylcblxuY2xhc3MgSFRNTDVBdWRpbyBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnaHRtbDVfYXVkaW8nIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnYXVkaW8nIH1cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ3RpbWV1cGRhdGUnOiAndGltZVVwZGF0ZWQnLFxuICAgICAgJ2VuZGVkJzogJ2VuZGVkJyxcbiAgICAgICdjYW5wbGF5dGhyb3VnaCc6ICdidWZmZXJGdWxsJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHN1cGVyKHBhcmFtcylcbiAgICB0aGlzLmVsLnNyYyA9IHBhcmFtcy5zcmNcbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgbGVmdDogWydwbGF5cGF1c2UnLCAncG9zaXRpb24nLCAnZHVyYXRpb24nXSxcbiAgICAgIHJpZ2h0OiBbJ2Z1bGxzY3JlZW4nLCAndm9sdW1lJ10sXG4gICAgICBkZWZhdWx0OiBbJ3NlZWtiYXInXVxuICAgIH1cbiAgICB0aGlzLnJlbmRlcigpXG4gICAgcGFyYW1zLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWSwgdGhpcy5wbGF5KVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUEFVU0UsIHRoaXMucGF1c2UpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TRUVLLCB0aGlzLnNlZWspXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9WT0xVTUUsIHRoaXMudm9sdW1lKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5zdG9wKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiBcImFvZFwiXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuZWwucGxheSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuZWwucGF1c2UoKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnBhdXNlKClcbiAgICB0aGlzLmVsLmN1cnJlbnRUaW1lID0gMFxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSB2YWx1ZSAvIDEwMFxuICB9XG5cbiAgbXV0ZSgpIHtcbiAgICB0aGlzLmVsLnZvbHVtZSA9IDBcbiAgfVxuXG4gIHVubXV0ZSgpIHtcbiAgICB0aGlzLmVsLnZvbHVtZSA9IDFcbiAgfVxuXG4gIGlzTXV0ZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5lbC52b2x1bWVcbiAgfVxuXG4gIGVuZGVkKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1RJTUVVUERBVEUsIDApXG4gIH1cblxuICBzZWVrKHNlZWtCYXJWYWx1ZSkge1xuICAgIHZhciB0aW1lID0gdGhpcy5lbC5kdXJhdGlvbiAqIChzZWVrQmFyVmFsdWUgLyAxMDApXG4gICAgdGhpcy5lbC5jdXJyZW50VGltZSA9IHRpbWVcbiAgfVxuXG4gIGdldEN1cnJlbnRUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLmVsLmN1cnJlbnRUaW1lXG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5kdXJhdGlvblxuICB9XG5cbiAgaXNQbGF5aW5nKCkge1xuICAgIHJldHVybiAhdGhpcy5lbC5wYXVzZWQgJiYgIXRoaXMuZWwuZW5kZWRcbiAgfVxuXG4gIHRpbWVVcGRhdGVkKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy5lbC5jdXJyZW50VGltZSwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgYnVmZmVyRnVsbCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRoaXMuZWwuY3VycmVudFRpbWUsIHRoaXMuZWwuZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbiB9XG5cbkhUTUw1QXVkaW8uY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlKSB7XG4gIHZhciBtaW1ldHlwZXMgPSB7XG4gICAgJ3dhdic6IFsnYXVkaW8vd2F2J10sXG4gICAgJ21wMyc6IFsnYXVkaW8vbXAzJywgJ2F1ZGlvL21wZWc7Y29kZWNzPVwibXAzXCInXSxcbiAgICAnYWFjJzogWydhdWRpby9tcDQ7Y29kZWNzPVwibXA0YS40MC41XCInXSxcbiAgICAnb2dhJzogWydhdWRpby9vZ2cnXVxuICB9XG4gIHZhciByZXNvdXJjZVBhcnRzID0gcmVzb3VyY2Uuc3BsaXQoJz8nKVswXS5tYXRjaCgvLipcXC4oLiopJC8pIHx8IFtdXG4gIGlmICgocmVzb3VyY2VQYXJ0cy5sZW5ndGggPiAxKSAmJiAobWltZXR5cGVzW3Jlc291cmNlUGFydHNbMV1dICE9PSB1bmRlZmluZWQpKSB7XG4gICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpXG4gICAgcmV0dXJuICEhZmluZChtaW1ldHlwZXNbcmVzb3VyY2VQYXJ0c1sxXV0sIChleHQpID0+IHsgcmV0dXJuICEhYS5jYW5QbGF5VHlwZShleHQpLnJlcGxhY2UoL25vLywgJycpIH0pXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBIVE1MNUF1ZGlvXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3BsYXliYWNrJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgS2libyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uva2libycpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEJyb3dzZXIgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Jyb3dzZXInKVxudmFyIHNlZWtTdHJpbmdUb1NlY29uZHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykuc2Vla1N0cmluZ1RvU2Vjb25kc1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcbnZhciBmaW5kID0gcmVxdWlyZSgnbG9kYXNoLmZpbmQnKVxuXG5jbGFzcyBIVE1MNVZpZGVvIGV4dGVuZHMgUGxheWJhY2sge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdodG1sNV92aWRlbycgfVxuICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICd2aWRlbycgfVxuICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBKU1QuaHRtbDVfdmlkZW8gfVxuXG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZGF0YS1odG1sNS12aWRlbyc6ICcnXG4gICAgfVxuICB9XG5cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ3RpbWV1cGRhdGUnOiAndGltZVVwZGF0ZWQnLFxuICAgICAgJ3Byb2dyZXNzJzogJ3Byb2dyZXNzJyxcbiAgICAgICdlbmRlZCc6ICdlbmRlZCcsXG4gICAgICAnc3RhbGxlZCc6ICdzdGFsbGVkJyxcbiAgICAgICd3YWl0aW5nJzogJ3dhaXRpbmcnLFxuICAgICAgJ2NhbnBsYXl0aHJvdWdoJzogJ2J1ZmZlckZ1bGwnLFxuICAgICAgJ2xvYWRlZG1ldGFkYXRhJzogJ2xvYWRlZE1ldGFkYXRhJyxcbiAgICAgICdjYW5wbGF5JzogJ3JlYWR5JyxcbiAgICAgICdkdXJhdGlvbmNoYW5nZSc6ICdkdXJhdGlvbkNoYW5nZSdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLmtpYm8gPSBuZXcgS2libygpXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMuc3JjID0gb3B0aW9ucy5zcmNcbiAgICB0aGlzLmVsLnNyYyA9IG9wdGlvbnMuc3JjXG4gICAgdGhpcy5lbC5sb29wID0gb3B0aW9ucy5sb29wXG4gICAgdGhpcy5maXJzdEJ1ZmZlciA9IHRydWVcbiAgICB0aGlzLmlzSExTID0gKHRoaXMuc3JjLmluZGV4T2YoJ20zdTgnKSA+IC0xKVxuICAgIHRoaXMuc2V0dGluZ3MgPSB7ZGVmYXVsdDogWydzZWVrYmFyJ119XG4gICAgaWYgKEJyb3dzZXIuaXNTYWZhcmkpIHtcbiAgICAgIHRoaXMuc2V0dXBTYWZhcmkoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsLnByZWxvYWQgPSBvcHRpb25zLnByZWxvYWQgPyBvcHRpb25zLnByZWxvYWQ6ICdtZXRhZGF0YSdcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSB0cnVlXG4gICAgfVxuICAgIHRoaXMuc2V0dGluZ3MubGVmdCA9IHRoaXMuaXNITFMgPyBbXCJwbGF5c3RvcFwiXSA6IFtcInBsYXlwYXVzZVwiLCBcInBvc2l0aW9uXCIsIFwiZHVyYXRpb25cIl1cbiAgICB0aGlzLnNldHRpbmdzLnJpZ2h0ID0gW1wiZnVsbHNjcmVlblwiLCBcInZvbHVtZVwiXVxuICAgIHRoaXMuYmluZEV2ZW50cygpXG4gIH1cblxuICBzZXR1cFNhZmFyaSgpIHtcbiAgICB0aGlzLmVsLnByZWxvYWQgPSAnYXV0bydcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgWzEsMiwzLDQsNSw2LDcsOCw5XS5mb3JFYWNoKChpKSA9PiB7IHRoaXMua2liby5kb3duKGkudG9TdHJpbmcoKSwgKCkgPT4gdGhpcy5zZWVrKGkgKiAxMCkpIH0pXG4gIH1cblxuICBzdG9wTGlzdGVuaW5nKCkge1xuICAgIHRoaXMua2liby5vZmYoWzEsMiwzLDQsNSw2LDcsOCw5XSlcbiAgfVxuXG4gIGxvYWRlZE1ldGFkYXRhKGUpIHtcbiAgICB0aGlzLmR1cmF0aW9uQ2hhbmdlKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0xPQURFRE1FVEFEQVRBLCBlLnRhcmdldC5kdXJhdGlvbilcbiAgICB0aGlzLmNoZWNrSW5pdGlhbFNlZWsoKVxuICB9XG5cbiAgZHVyYXRpb25DaGFuZ2UoKSB7XG4gICAgLy8gd2UgY2FuJ3QgZmlndXJlIG91dCBpZiBobHMgcmVzb3VyY2UgaXMgVm9EIG9yIG5vdCB1bnRpbCBpdCBpcyBiZWluZyBsb2FkZWQgb3IgZHVyYXRpb24gaGFzIGNoYW5nZWQuXG4gICAgLy8gdGhhdCdzIHdoeSB3ZSBjaGVjayBpdCBhZ2FpbiBhbmQgdXBkYXRlIG1lZGlhIGNvbnRyb2wgYWNjb3JkaW5nbHkuXG4gICAgaWYgKHRoaXMuZ2V0UGxheWJhY2tUeXBlKCkgPT09ICd2b2QnKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSBbXCJwbGF5cGF1c2VcIiwgXCJwb3NpdGlvblwiLCBcImR1cmF0aW9uXCJdXG4gICAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLmlzSExTICYmIFswLCB1bmRlZmluZWQsIEluZmluaXR5XS5pbmRleE9mKHRoaXMuZWwuZHVyYXRpb24pID49IDAgPyAnbGl2ZScgOiAndm9kJ1xuICB9XG5cbiAgaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLmVsLnBsYXkoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUExBWSk7XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLmVsLnBhdXNlKClcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5wYXVzZSgpXG4gICAgaWYgKHRoaXMuZWwucmVhZHlTdGF0ZSAhPT0gMCkge1xuICAgICAgdGhpcy5lbC5jdXJyZW50VGltZSA9IDBcbiAgICB9XG4gIH1cblxuICB2b2x1bWUodmFsdWUpIHtcbiAgICB0aGlzLmVsLnZvbHVtZSA9IHZhbHVlIC8gMTAwXG4gIH1cblxuICBtdXRlKCkge1xuICAgIHRoaXMuZWwudm9sdW1lID0gMFxuICB9XG5cbiAgdW5tdXRlKCkge1xuICAgIHRoaXMuZWwudm9sdW1lID0gMVxuICB9XG5cbiAgaXNNdXRlZCgpIHtcbiAgICByZXR1cm4gISF0aGlzLmVsLnZvbHVtZVxuICB9XG5cbiAgaXNQbGF5aW5nKCkge1xuICAgIHJldHVybiAhdGhpcy5lbC5wYXVzZWQgJiYgIXRoaXMuZWwuZW5kZWRcbiAgfVxuXG4gIGVuZGVkKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfRU5ERUQsIHRoaXMubmFtZSlcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDAsIHRoaXMuZWwuZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgfVxuXG4gIHN0YWxsZWQoKSB7XG4gICAgaWYgKHRoaXMuZ2V0UGxheWJhY2tUeXBlKCkgPT09ICd2b2QnICYmIHRoaXMuZWwucmVhZHlTdGF0ZSA8IHRoaXMuZWwuSEFWRV9GVVRVUkVfREFUQSkge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJJTkcsIHRoaXMubmFtZSlcbiAgICB9XG4gIH1cblxuICB3YWl0aW5nKCkge1xuICAgIGlmKHRoaXMuZWwucmVhZHlTdGF0ZSA8IHRoaXMuZWwuSEFWRV9GVVRVUkVfREFUQSkge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJJTkcsIHRoaXMubmFtZSlcbiAgICB9XG4gIH1cblxuICBidWZmZXJGdWxsKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucG9zdGVyICYmIHRoaXMuZmlyc3RCdWZmZXIpIHtcbiAgICAgIHRoaXMuZmlyc3RCdWZmZXIgPSBmYWxzZVxuICAgICAgaWYgKCF0aGlzLmlzUGxheWluZygpKSB7XG4gICAgICAgIHRoaXMuZWwucG9zdGVyID0gdGhpcy5vcHRpb25zLnBvc3RlclxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsLnBvc3RlciA9ICcnXG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgdGhpcy5uYW1lKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHRoaXMuc3RvcCgpXG4gICAgdGhpcy5lbC5zcmMgPSAnJ1xuICAgIHRoaXMuJGVsLnJlbW92ZSgpXG4gIH1cblxuICBzZWVrKHNlZWtCYXJWYWx1ZSkge1xuICAgIHZhciB0aW1lID0gdGhpcy5lbC5kdXJhdGlvbiAqIChzZWVrQmFyVmFsdWUgLyAxMDApXG4gICAgdGhpcy5zZWVrU2Vjb25kcyh0aW1lKVxuICB9XG5cbiAgc2Vla1NlY29uZHModGltZSkge1xuICAgIHRoaXMuZWwuY3VycmVudFRpbWUgPSB0aW1lXG4gIH1cblxuICBjaGVja0luaXRpYWxTZWVrKCkge1xuICAgIHZhciBzZWVrVGltZSA9IHNlZWtTdHJpbmdUb1NlY29uZHMod2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgdGhpcy5zZWVrU2Vjb25kcyhzZWVrVGltZSlcbiAgfVxuXG4gIGdldEN1cnJlbnRUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLmVsLmN1cnJlbnRUaW1lXG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5kdXJhdGlvblxuICB9XG5cbiAgdGltZVVwZGF0ZWQoKSB7XG4gICAgaWYgKHRoaXMuZ2V0UGxheWJhY2tUeXBlKCkgPT09ICdsaXZlJykge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCAxLCAxLCB0aGlzLm5hbWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy5lbC5jdXJyZW50VGltZSwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIHByb2dyZXNzKCkge1xuICAgIGlmICghdGhpcy5lbC5idWZmZXJlZC5sZW5ndGgpIHJldHVyblxuICAgIHZhciBidWZmZXJlZFBvcyA9IDBcbiAgICBmb3IgKHZhciBpID0gMDsgIGkgPCB0aGlzLmVsLmJ1ZmZlcmVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5lbC5jdXJyZW50VGltZSA+PSB0aGlzLmVsLmJ1ZmZlcmVkLnN0YXJ0KGkpICYmIHRoaXMuZWwuY3VycmVudFRpbWUgPD0gdGhpcy5lbC5idWZmZXJlZC5lbmQoaSkpIHtcbiAgICAgICAgYnVmZmVyZWRQb3MgPSBpXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUFJPR1JFU1MsIHRoaXMuZWwuYnVmZmVyZWQuc3RhcnQoYnVmZmVyZWRQb3MpLCB0aGlzLmVsLmJ1ZmZlcmVkLmVuZChidWZmZXJlZFBvcyksIHRoaXMuZWwuZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgfVxuXG4gIHR5cGVGb3Ioc3JjKSB7XG4gICAgcmV0dXJuIChzcmMuaW5kZXhPZignLm0zdTgnKSA+IDApID8gJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyA6ICd2aWRlby9tcDQnXG4gIH1cblxuICByZWFkeSgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLm5hbWUpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSlcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoeyBzcmM6IHRoaXMuc3JjLCB0eXBlOiB0aGlzLnR5cGVGb3IodGhpcy5zcmMpIH0pKVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub3B0aW9ucy5hdXRvUGxheSAmJiB0aGlzLnBsYXkoKSwgMCk7XG4gICAgaWYgKHRoaXMuZWwucmVhZHlTdGF0ZSA9PT0gdGhpcy5lbC5IQVZFX0VOT1VHSF9EQVRBKSB7XG4gICAgICB0aGlzLnJlYWR5KClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5IVE1MNVZpZGVvLmNhblBsYXkgPSBmdW5jdGlvbihyZXNvdXJjZSkge1xuICB2YXIgbWltZXR5cGVzID0ge1xuICAgICdtcDQnOiBbXCJhdmMxLjQyRTAxRVwiLCBcImF2YzEuNThBMDFFXCIsIFwiYXZjMS40RDQwMUVcIiwgXCJhdmMxLjY0MDAxRVwiLCBcIm1wNHYuMjAuOFwiLCBcIm1wNHYuMjAuMjQwXCIsIFwibXA0YS40MC4yXCJdLm1hcChcbiAgICAgIChjb2RlYykgPT4geyByZXR1cm4gJ3ZpZGVvL21wNDsgY29kZWNzPVwiJyArIGNvZGVjICsgJywgbXA0YS40MC4yXCInfSksXG4gICAgJ29nZyc6IFsndmlkZW8vb2dnOyBjb2RlY3M9XCJ0aGVvcmEsIHZvcmJpc1wiJywgJ3ZpZGVvL29nZzsgY29kZWNzPVwiZGlyYWNcIicsICd2aWRlby9vZ2c7IGNvZGVjcz1cInRoZW9yYSwgc3BlZXhcIiddLFxuICAgICczZ3BwJzogWyd2aWRlby8zZ3BwOyBjb2RlY3M9XCJtcDR2LjIwLjgsIHNhbXJcIiddLFxuICAgICd3ZWJtJzogWyd2aWRlby93ZWJtOyBjb2RlY3M9XCJ2cDgsIHZvcmJpc1wiJ10sXG4gICAgJ21rdic6IFsndmlkZW8veC1tYXRyb3NrYTsgY29kZWNzPVwidGhlb3JhLCB2b3JiaXNcIiddLFxuICAgICdtM3U4JzogWydhcHBsaWNhdGlvbi94LW1wZWdVUkwnXVxuICB9XG4gIG1pbWV0eXBlc1snb2d2J10gPSBtaW1ldHlwZXNbJ29nZyddXG4gIG1pbWV0eXBlc1snM2dwJ10gPSBtaW1ldHlwZXNbJzNncHAnXVxuXG4gIHZhciByZXNvdXJjZVBhcnRzID0gcmVzb3VyY2Uuc3BsaXQoJz8nKVswXS5tYXRjaCgvLipcXC4oLiopJC8pIHx8IFtdXG4gIGlmICgocmVzb3VyY2VQYXJ0cy5sZW5ndGggPiAxKSAmJiAobWltZXR5cGVzW3Jlc291cmNlUGFydHNbMV1dICE9PSB1bmRlZmluZWQpKSB7XG4gICAgdmFyIHYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgcmV0dXJuICEhZmluZChtaW1ldHlwZXNbcmVzb3VyY2VQYXJ0c1sxXV0sIChleHQpID0+IHsgcmV0dXJuICEhdi5jYW5QbGF5VHlwZShleHQpLnJlcGxhY2UoL25vLywgJycpIH0pXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gSFRNTDVWaWRlb1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXliYWNrID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9wbGF5YmFjaycpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxuXG5jbGFzcyBIVE1MSW1nIGV4dGVuZHMgUGxheWJhY2sge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdodG1sX2ltZycgfVxuICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdpbWcnIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkYXRhLWh0bWwtaW1nJzogJydcbiAgICB9XG4gIH1cblxuICBnZXRQbGF5YmFja1R5cGUoKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHN1cGVyKHBhcmFtcylcbiAgICB0aGlzLmVsLnNyYyA9IHBhcmFtcy5zcmNcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG4gfVxuXG5IVE1MSW1nLmNhblBsYXkgPSBmdW5jdGlvbihyZXNvdXJjZSkge1xuICByZXR1cm4gISFyZXNvdXJjZS5tYXRjaCgvKC4qKS4ocG5nfGpwZ3xqcGVnfGdpZnxibXApLylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIVE1MSW1nXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbm9fb3AnKTtcbiIsInZhciBQbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvcGxheWJhY2snKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxuXG5jbGFzcyBOb09wIGV4dGVuZHMgUGxheWJhY2sge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdub19vcCcgfVxuICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBKU1Qubm9fb3AgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4geydkYXRhLW5vLW9wJzogJyd9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSk7XG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKCkpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKTtcbiAgICB0aGlzLmFuaW1hdGUoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMubmFtZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgbm9pc2UoKSB7XG4gICAgdmFyIGlkYXRhID0gdGhpcy5jb250ZXh0LmNyZWF0ZUltYWdlRGF0YSh0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoLCB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodClcbiAgICB2YXIgYnVmZmVyMzIgPSBuZXcgVWludDMyQXJyYXkoaWRhdGEuZGF0YS5idWZmZXIpXG4gICAgdmFyIGxlbiA9IGJ1ZmZlcjMyLmxlbmd0aFxuICAgIHZhciBydW4gPSAwXG4gICAgdmFyIGNvbG9yID0gMFxuICAgIHZhciBtID0gTWF0aC5yYW5kb20oKSAqIDYgKyA0XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjspIHtcbiAgICAgIGlmIChydW4gPCAwKSB7XG4gICAgICAgIHJ1biA9IG0gKiBNYXRoLnJhbmRvbSgpO1xuICAgICAgICB2YXIgcCA9IE1hdGgucG93KE1hdGgucmFuZG9tKCksIDAuNCk7XG4gICAgICAgIGNvbG9yID0gKDI1NSAqIHApIDw8IDI0O1xuICAgICAgfVxuICAgICAgcnVuIC09IDE7XG4gICAgICBidWZmZXIzMltpKytdID0gY29sb3I7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEoaWRhdGEsIDAsIDApO1xuICB9XG5cbiAgbG9vcCgpIHtcbiAgICB0aGlzLm5vaXNlKClcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5sb29wKCkpXG4gIH1cblxuICBhbmltYXRlKCkge1xuICAgIHRoaXMuY2FudmFzID0gdGhpcy4kZWwuZmluZCgnY2FudmFzW2RhdGEtbm8tb3AtY2FudmFzXScpWzBdXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIHRoaXMubG9vcCgpXG4gIH1cbn1cblxuTm9PcC5jYW5QbGF5ID0gKHNvdXJjZSkgPT4ge1xuICByZXR1cm4gdHJ1ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vT3BcbiIsIi8vQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIENvbnRhaW5lclBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvY29udGFpbmVyX3BsdWdpbicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxuXG5jbGFzcyBDbGlja1RvUGF1c2VQbHVnaW4gZXh0ZW5kcyBDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdjbGlja190b19wYXVzZScgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgc3VwZXIob3B0aW9ucylcbiAgICB9XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfQ0xJQ0ssIHRoaXMuY2xpY2spXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TRVRUSU5HU1VQREFURSwgdGhpcy5zZXR0aW5nc1VwZGF0ZSlcbiAgfVxuXG4gIGNsaWNrKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSAhPT0gJ2xpdmUnIHx8IHRoaXMuY29udGFpbmVyLmlzRHZyRW5hYmxlZCgpKSB7XG4gICAgICBpZiAodGhpcy5jb250YWluZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIucGF1c2UoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIucGxheSgpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0dGluZ3NVcGRhdGUoKSB7XG4gICAgdGhpcy5jb250YWluZXIuJGVsLnJlbW92ZUNsYXNzKCdwb2ludGVyLWVuYWJsZWQnKVxuICAgIGlmICh0aGlzLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSAhPT0gJ2xpdmUnIHx8IHRoaXMuY29udGFpbmVyLmlzRHZyRW5hYmxlZCgpKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci4kZWwuYWRkQ2xhc3MoJ3BvaW50ZXItZW5hYmxlZCcpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2xpY2tUb1BhdXNlUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2xpY2tfdG9fcGF1c2UnKVxuIiwidmFyIFVJQ29yZVBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdWlfY29yZV9wbHVnaW4nKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxudmFyICQgPSByZXF1aXJlKCdjbGFwcHItemVwdG8nKVxuXG5jbGFzcyBEVlJDb250cm9scyBleHRlbmRzIFVJQ29yZVBsdWdpbiB7XG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5kdnJfY29udHJvbHMgfVxuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdkdnJfY29udHJvbHMnIH1cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsaWNrIC5saXZlLWJ1dHRvbic6ICdjbGljaydcbiAgICB9XG4gIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGFzcyc6ICdkdnItY29udHJvbHMnLFxuICAgICAgJ2RhdGEtZHZyLWNvbnRyb2xzJzogJycsXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoY29yZSkge1xuICAgIHN1cGVyKGNvcmUpXG4gICAgdGhpcy5jb3JlID0gY29yZVxuICAgIHRoaXMuc2V0dGluZ3NVcGRhdGUoKVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29yZS5tZWRpYUNvbnRyb2wsIEV2ZW50cy5NRURJQUNPTlRST0xfQ09OVEFJTkVSQ0hBTkdFRCwgdGhpcy5zZXR0aW5nc1VwZGF0ZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29yZS5tZWRpYUNvbnRyb2wsIEV2ZW50cy5NRURJQUNPTlRST0xfUkVOREVSRUQsIHRoaXMuc2V0dGluZ3NVcGRhdGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCwgdGhpcy5kdnJDaGFuZ2VkKVxuICB9XG5cbiAgZHZyQ2hhbmdlZChkdnJFbmFibGVkKSB7XG4gICAgdGhpcy5zZXR0aW5nc1VwZGF0ZSgpXG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kZWwuYWRkQ2xhc3MoJ2xpdmUnKVxuICAgIGlmIChkdnJFbmFibGVkKSB7XG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5hZGRDbGFzcygnZHZyJylcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmZpbmQoJy5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLXBvc2l0aW9uXSwgLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtZHVyYXRpb25dJykuaGlkZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLnJlbW92ZUNsYXNzKCdkdnInKVxuICAgIH1cbiAgfVxuXG4gIGNsaWNrKCkge1xuICAgIGlmICghdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnBsYXkoKVxuICAgIH1cbiAgICBpZiAodGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kZWwuaGFzQ2xhc3MoJ2R2cicpKSB7XG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5zZXRDdXJyZW50VGltZSgtMSlcbiAgICB9XG4gIH1cblxuICBzZXR0aW5nc1VwZGF0ZSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIGlmKHRoaXMuc2hvdWxkUmVuZGVyKCkpIHtcbiAgICAgIHRoaXMucmVuZGVyKClcbiAgICAgIHRoaXMuJGVsLmNsaWNrKCgpID0+IHRoaXMuY2xpY2soKSlcbiAgICB9XG4gICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgfVxuXG4gIHNob3VsZFJlbmRlcigpIHtcbiAgICB2YXIgdXNlRHZyQ29udHJvbHMgPSB0aGlzLmNvcmUub3B0aW9ucy51c2VEdnJDb250cm9scyA9PT0gdW5kZWZpbmVkIHx8ICEhdGhpcy5jb3JlLm9wdGlvbnMudXNlRHZyQ29udHJvbHNcbiAgICByZXR1cm4gdXNlRHZyQ29udHJvbHMgJiYgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuZ2V0UGxheWJhY2tUeXBlKCkgPT09ICdsaXZlJ1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpXG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKCkpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIGlmICh0aGlzLnNob3VsZFJlbmRlcigpKSB7XG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5hZGRDbGFzcygnbGl2ZScpXG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLiQoJy5tZWRpYS1jb250cm9sLWxlZnQtcGFuZWxbZGF0YS1tZWRpYS1jb250cm9sXScpLmFwcGVuZCh0aGlzLiRlbClcbiAgICAgIGlmICh0aGlzLiRkdXJhdGlvbikge1xuICAgICAgICB0aGlzLiRkdXJhdGlvbi5yZW1vdmUoKVxuICAgICAgfVxuICAgICAgdGhpcy4kZHVyYXRpb24gPSAkKCc8c3BhbiBkYXRhLWR1cmF0aW9uPjwvc3Bhbj4nKVxuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5zZWVrVGltZS4kZWwuYXBwZW5kKHRoaXMuJGR1cmF0aW9uKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRFZSQ29udHJvbHNcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kdnJfY29udHJvbHMnKVxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIENvbnRhaW5lclBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvY29udGFpbmVyX3BsdWdpbicpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcblxuY2xhc3MgR29vZ2xlQW5hbHl0aWNzIGV4dGVuZHMgQ29udGFpbmVyUGx1Z2luIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnZ29vZ2xlX2FuYWx5dGljcycgfVxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICBpZiAob3B0aW9ucy5nYUFjY291bnQpIHtcbiAgICAgIHRoaXMuYWNjb3VudCA9IG9wdGlvbnMuZ2FBY2NvdW50XG4gICAgICB0aGlzLnRyYWNrZXJOYW1lID0gKG9wdGlvbnMuZ2FUcmFja2VyTmFtZSkgPyBvcHRpb25zLmdhVHJhY2tlck5hbWUgKyBcIi5cIiA6ICdDbGFwcHIuJ1xuICAgICAgdGhpcy5kb21haW5OYW1lID0gb3B0aW9ucy5nYURvbWFpbk5hbWVcbiAgICAgIHRoaXMuY3VycmVudEhEU3RhdGUgPSB1bmRlZmluZWRcbiAgICAgIHRoaXMuZW1iZWRTY3JpcHQoKVxuICAgIH1cbiAgfVxuXG4gIGVtYmVkU2NyaXB0KCkge1xuICAgIGlmICghd2luZG93Ll9nYXQpIHtcbiAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0L2phdmFzY3JpcHRcIilcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJhc3luY1wiLCBcImFzeW5jXCIpXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaHR0cDovL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9nYS5qc1wiKVxuICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIH1cbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLm9uUGxheSlcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5vblN0b3ApXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BBVVNFLCB0aGlzLm9uUGF1c2UpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0VOREVELCB0aGlzLm9uRW5kZWQpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORywgdGhpcy5vbkJ1ZmZlcmluZylcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSRlVMTCwgdGhpcy5vbkJ1ZmZlckZ1bGwpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0VOREVELCB0aGlzLm9uRW5kZWQpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0VSUk9SLCB0aGlzLm9uRXJyb3IpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLU1RBVEUsIHRoaXMub25QbGF5YmFja0NoYW5nZWQpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1ZPTFVNRSwgKGV2ZW50KSA9PiB0aGlzLm9uVm9sdW1lQ2hhbmdlZChldmVudCkpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NFRUssIChldmVudCkgPT4gdGhpcy5vblNlZWsoZXZlbnQpKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9GVUxMX1NDUkVFTiwgdGhpcy5vbkZ1bGxzY3JlZW4pXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0hJR0hERUZJTklUSU9OVVBEQVRFLCB0aGlzLm9uSEQpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLRFZSU1RBVEVDSEFOR0VELCB0aGlzLm9uRFZSKVxuICAgIH1cbiAgICBfZ2FxLnB1c2goW3RoaXMudHJhY2tlck5hbWUgKyAnX3NldEFjY291bnQnLCB0aGlzLmFjY291bnRdKTtcbiAgICBpZiAoISF0aGlzLmRvbWFpbk5hbWUpXG4gICAgICBfZ2FxLnB1c2goW3RoaXMudHJhY2tlck5hbWUgKyAnX3NldERvbWFpbk5hbWUnLCB0aGlzLmRvbWFpbk5hbWVdKTtcbiAgfVxuXG4gIG9uUGxheSgpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJQbGF5XCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvblN0b3AoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiU3RvcFwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25FbmRlZCgpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJFbmRlZFwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25CdWZmZXJpbmcoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiQnVmZmVyaW5nXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvbkJ1ZmZlckZ1bGwoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiQnVmZmVyZnVsbFwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25FcnJvcigpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJFcnJvclwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25IRCgpIHtcbiAgICB2YXIgc3RhdHVzID0gdGhpcy5jb250YWluZXIuaXNIaWdoRGVmaW5pdGlvbkluVXNlKCk/IFwiT05cIjogXCJPRkZcIlxuICAgIGlmIChzdGF0dXMgIT09IHRoaXMuY3VycmVudEhEU3RhdGUpIHtcbiAgICAgIHRoaXMuY3VycmVudEhEU3RhdGUgPSBzdGF0dXNcbiAgICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIkhEIC0gXCIgKyBzdGF0dXMsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gICAgfVxuICB9XG5cblxuICBvblBsYXliYWNrQ2hhbmdlZCgpIHtcbiAgICB2YXIgdHlwZSA9IHRoaXMuY29udGFpbmVyLmdldFBsYXliYWNrVHlwZSgpXG4gICAgaWYgKHR5cGUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIlBsYXliYWNrIFR5cGUgLSBcIiArIHR5cGUsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gICAgfVxuICB9XG5cbiAgb25EVlIoZHZySW5Vc2UpIHtcbiAgICB2YXIgc3RhdHVzID0gZHZySW5Vc2U/IFwiT05cIjogXCJPRkZcIlxuICAgIHRoaXMucHVzaChbXCJJbnRlcmFjdGlvblwiLCBcIkRWUiAtIFwiICsgc3RhdHVzLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25QYXVzZSgpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJQYXVzZVwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25TZWVrKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIlNlZWtcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uVm9sdW1lQ2hhbmdlZCgpIHtcbiAgICB0aGlzLnB1c2goW1wiSW50ZXJhY3Rpb25cIiwgXCJWb2x1bWVcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uRnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLnB1c2goW1wiSW50ZXJhY3Rpb25cIiwgXCJGdWxsc2NyZWVuXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuXG4gIHB1c2goYXJyYXkpIHtcbiAgICB2YXIgcmVzID0gW3RoaXMudHJhY2tlck5hbWUgKyBcIl90cmFja0V2ZW50XCJdLmNvbmNhdChhcnJheSlcbiAgICBfZ2FxLnB1c2gocmVzKVxuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHb29nbGVBbmFseXRpY3M7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZ29vZ2xlX2FuYWx5dGljcycpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xvZycpO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIEtpYm8gPSByZXF1aXJlKCcuLi8uLi9iYXNlL2tpYm8nKVxuXG5jbGFzcyBMb2cge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmtpYm8gPSBuZXcgS2libygpXG4gICAgdGhpcy5raWJvLmRvd24oWydjdHJsIHNoaWZ0IGQnXSwgKCkgPT4gdGhpcy5vbk9mZigpKVxuICAgIHRoaXMuQkxBQ0tMSVNUID0gWydwbGF5YmFjazp0aW1ldXBkYXRlJywgJ3BsYXliYWNrOnByb2dyZXNzJywgJ2NvbnRhaW5lcjpob3ZlcicsICdjb250YWluZXI6dGltZXVwZGF0ZScsICdjb250YWluZXI6cHJvZ3Jlc3MnXTtcbiAgfVxuXG4gIGluZm8oa2xhc3MsIG1lc3NhZ2UpIHt0aGlzLmxvZyhrbGFzcywgJ2luZm8nLCBtZXNzYWdlKX1cbiAgd2FybihrbGFzcywgbWVzc2FnZSkge3RoaXMubG9nKGtsYXNzLCAnd2FybicsIG1lc3NhZ2UpfVxuICBkZWJ1ZyhrbGFzcywgbWVzc2FnZSkge3RoaXMubG9nKGtsYXNzLCAnZGVidWcnLCBtZXNzYWdlKX1cblxuICBvbk9mZigpIHtcbiAgICB3aW5kb3cuREVCVUcgPSAhd2luZG93LkRFQlVHXG4gICAgaWYgKHdpbmRvdy5ERUJVRykgeyBjb25zb2xlLmxvZygnbG9nIGVuYWJsZWQnKTsgIH1cbiAgICBlbHNlIHsgY29uc29sZS5sb2coJ2xvZyBkaXNhYmxlZCcpOyB9XG4gIH1cblxuICBsb2coa2xhc3MsIGxldmVsLCBtZXNzYWdlKSB7XG4gICAgaWYgKCF3aW5kb3cuREVCVUcgfHwgdGhpcy5CTEFDS0xJU1QuaW5kZXhPZihtZXNzYWdlKSA+PSAwKSByZXR1cm5cbiAgICB2YXIgY29sb3JcbiAgICBpZiAobGV2ZWwgPT09ICd3YXJuJykgeyBjb2xvciA9ICcjRkY4MDAwJyB9XG4gICAgZWxzZSBpZiAobGV2ZWwgPT09ICdpbmZvJykgeyBjb2xvciA9ICcjMDA2NjAwJyB9XG4gICAgZWxzZSBpZiAobGV2ZWwgPT09ICdlcnJvcicpIHsgY29sb3IgPSAnI0ZGMDAwMCd9XG4gICAgY29uc29sZS5sb2coXCIlYyBbXCIgKyBrbGFzcyArIFwiXSBbXCIgKyBsZXZlbCArIFwiXSBcIiArICBtZXNzYWdlLCAnY29sb3I6ICcrY29sb3IpO1xuICB9XG59XG5cbkxvZy5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5faW5zdGFuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKVxuICB9XG4gIHJldHVybiB0aGlzLl9pbnN0YW5jZVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gTG9nXG4iLCIvL0NvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBVSUNvbnRhaW5lclBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdWlfY29udGFpbmVyX3BsdWdpbicpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG5cbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvbWVkaWF0b3InKVxudmFyIFBsYXllckluZm8gPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3BsYXllcl9pbmZvJylcblxudmFyICQgPSByZXF1aXJlKCdjbGFwcHItemVwdG8nKVxuXG5jbGFzcyBQb3N0ZXJQbHVnaW4gZXh0ZW5kcyBVSUNvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ3Bvc3RlcicgfVxuICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBKU1QucG9zdGVyIH1cblxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsYXNzJzogJ3BsYXllci1wb3N0ZXInLFxuICAgICAgJ2RhdGEtcG9zdGVyJzogJydcbiAgICB9XG4gIH1cblxuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xpY2snOiAnY2xpY2tlZCdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5jb250YWluZXIuZGlzYWJsZU1lZGlhQ29udHJvbCgpXG4gICAgdGhpcy5yZW5kZXIoKVxuICAgIHRoaXMuYnVmZmVyRnVsbCA9IGZhbHNlXG4gIH1cblxuICBsb2FkKHNvdXJjZSkge1xuICAgIHRoaXMub3B0aW9ucy5wb3N0ZXIgPSBzb3VyY2VcbiAgICB0aGlzLnJlbmRlcigpXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSSU5HLCB0aGlzLm9uQnVmZmVyaW5nKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSRlVMTCwgdGhpcy5vbkJ1ZmZlcmZ1bGwpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLm9uU3RvcClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVksIHRoaXMub25QbGF5KVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRU5ERUQsIHRoaXMub25TdG9wKVxuICAgIE1lZGlhdG9yLm9uKEV2ZW50cy5QTEFZRVJfUkVTSVpFLCB0aGlzLnVwZGF0ZVNpemUsIHRoaXMpXG4gIH1cblxuICBzdG9wTGlzdGVuaW5nKCkge1xuICAgIHN1cGVyLnN0b3BMaXN0ZW5pbmcoKVxuICAgIE1lZGlhdG9yLm9mZihFdmVudHMuUExBWUVSX1JFU0laRSwgdGhpcy51cGRhdGVTaXplLCB0aGlzKVxuICB9XG5cbiAgb25CdWZmZXJpbmcoKSB7XG4gICAgdGhpcy5idWZmZXJGdWxsID0gZmFsc2VcbiAgICB0aGlzLmhpZGVQbGF5QnV0dG9uKClcbiAgfVxuXG4gIG9uUGxheSgpIHtcbiAgICBpZiAodGhpcy5idWZmZXJGdWxsKSB7XG4gICAgICB0aGlzLiRlbC5oaWRlKClcbiAgICAgIHRoaXMuY29udGFpbmVyLmVuYWJsZU1lZGlhQ29udHJvbCgpXG4gICAgfVxuICB9XG5cbiAgb25CdWZmZXJmdWxsKCkge1xuICAgIHRoaXMuYnVmZmVyRnVsbCA9IHRydWVcbiAgICBpZiAodGhpcy5jb250YWluZXIucGxheWJhY2submFtZSA9PT0gJ2h0bWw1X3ZpZGVvJyAmJiAhdGhpcy5jb250YWluZXIuaXNQbGF5aW5nKCkpIHJldHVyblxuICAgIHRoaXMuJGVsLmhpZGUoKVxuICAgIHRoaXMuY29udGFpbmVyLmVuYWJsZU1lZGlhQ29udHJvbCgpXG4gIH1cblxuICBvblN0b3AoKSB7XG4gICAgdGhpcy4kZWwuc2hvdygpXG4gICAgdGhpcy5jb250YWluZXIuZGlzYWJsZU1lZGlhQ29udHJvbCgpXG4gICAgdGhpcy5zaG93UGxheUJ1dHRvbigpXG4gIH1cblxuICBzaG93UGxheUJ1dHRvbigpIHtcbiAgICB0aGlzLiRwbGF5QnV0dG9uLnNob3coKVxuICAgIHRoaXMudXBkYXRlU2l6ZSgpXG4gIH1cblxuICBoaWRlUGxheUJ1dHRvbigpIHtcbiAgICB0aGlzLiRwbGF5QnV0dG9uLmhpZGUoKVxuICB9XG5cbiAgY2xpY2tlZCgpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5jaHJvbWVsZXNzKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5wbGF5KClcbiAgICAgIHRoaXMuaGlkZVBsYXlCdXR0b24oKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHVwZGF0ZVNpemUoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLnBsYXliYWNrLm5hbWUgPT09ICdodG1sX2ltZycpIHJldHVyblxuICAgIHZhciBoZWlnaHQgPSB0aGlzLiRlbC5oZWlnaHQoKVxuICAgIHRoaXMuJGVsLmNzcyh7IGZvbnRTaXplOiBoZWlnaHQgfSlcbiAgICBpZiAodGhpcy4kcGxheVdyYXBwZXIuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgIHRoaXMuJHBsYXlXcmFwcGVyLmNzcyh7IG1hcmdpblRvcDogLSh0aGlzLiRwbGF5V3JhcHBlci5oZWlnaHQoKSAvIDIpIH0pXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5uYW1lID09PSAnaHRtbF9pbWcnKSByZXR1cm5cbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lLCB7YmFzZVVybDogdGhpcy5vcHRpb25zLmJhc2VVcmx9KVswXVxuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICBpZiAodGhpcy5vcHRpb25zLnBvc3Rlcikge1xuICAgICAgdmFyIGltZ0VsID0gJCgnPGRpdiBkYXRhLXBvc3RlciBjbGFzcz1cInBvc3Rlci1iYWNrZ3JvdW5kXCI+PC9kaXY+JylcbiAgICAgIGltZ0VsLmNzcyh7J2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyB0aGlzLm9wdGlvbnMucG9zdGVyICsgJyknfSlcbiAgICAgIHRoaXMuJGVsLnByZXBlbmQoaW1nRWwpXG4gICAgfVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQodGhpcy5lbClcbiAgICB0aGlzLiRwbGF5QnV0dG9uID0gdGhpcy4kZWwuZmluZCgnLnBvc3Rlci1pY29uJylcbiAgICB0aGlzLiRwbGF5V3JhcHBlciA9IHRoaXMuJGVsLmZpbmQoJy5wbGF5LXdyYXBwZXInKVxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVTaXplKCksIDApXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jaHJvbWVsZXNzKSB7XG4gICAgICB0aGlzLmhpZGVQbGF5QnV0dG9uKClcbiAgICAgIHRoaXMuJGVsLmNzcyh7J2N1cnNvcic6ICdpbml0aWFsJ30pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0ZXJQbHVnaW5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zcGlubmVyX3RocmVlX2JvdW5jZScpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgVUlDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL3VpX2NvbnRhaW5lcl9wbHVnaW4nKTtcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpO1xudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0Jyk7XG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKTtcblxuY2xhc3MgU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luIGV4dGVuZHMgVUlDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdzcGlubmVyJyB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZGF0YS1zcGlubmVyJzonJyxcbiAgICAgICdjbGFzcyc6ICdzcGlubmVyLXRocmVlLWJvdW5jZSdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnRlbXBsYXRlID0gSlNULnNwaW5uZXJfdGhyZWVfYm91bmNlXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJJTkcsIHRoaXMub25CdWZmZXJpbmcpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMLCB0aGlzLm9uQnVmZmVyRnVsbClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICAgIHRoaXMucmVuZGVyKClcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIHRoaXMuJGVsLnNob3coKVxuICB9XG5cbiAgb25CdWZmZXJGdWxsKCkge1xuICAgIHRoaXMuJGVsLmhpZGUoKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMuJGVsLmhpZGUoKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcignc3Bpbm5lcl90aHJlZV9ib3VuY2UnKVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy5jb250YWluZXIuJGVsLmFwcGVuZCh0aGlzLiRlbClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3N0YXRzJyk7XG5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL2NvbnRhaW5lcl9wbHVnaW4nKTtcbnZhciAkID0gcmVxdWlyZShcImNsYXBwci16ZXB0b1wiKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpO1xuXG5jbGFzcyBTdGF0c1BsdWdpbiBleHRlbmRzIENvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ3N0YXRzJyB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5zZXRJbml0aWFsQXR0cnMoKVxuICAgIHRoaXMucmVwb3J0SW50ZXJ2YWwgPSBvcHRpb25zLnJlcG9ydEludGVydmFsIHx8IDUwMDBcbiAgICB0aGlzLnN0YXRlID0gXCJJRExFXCJcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lci5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1BMQVksIHRoaXMub25QbGF5KVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5vblN0b3ApXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9ERVNUUk9ZRUQsIHRoaXMub25TdG9wKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSSU5HLCB0aGlzLm9uQnVmZmVyaW5nKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSRlVMTCwgdGhpcy5vbkJ1ZmZlckZ1bGwpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFUU19BREQsIHRoaXMub25TdGF0c0FkZClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0JJVFJBVEUsIHRoaXMub25TdGF0c0FkZClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfU1RBVFNfQURELCB0aGlzLm9uU3RhdHNBZGQpXG4gIH1cblxuICBzZXRJbml0aWFsQXR0cnMoKSB7XG4gICAgdGhpcy5maXJzdFBsYXkgPSB0cnVlXG4gICAgdGhpcy5zdGFydHVwVGltZSA9IDBcbiAgICB0aGlzLnJlYnVmZmVyaW5nVGltZSA9IDBcbiAgICB0aGlzLndhdGNoaW5nVGltZSA9IDBcbiAgICB0aGlzLnJlYnVmZmVycyA9IDBcbiAgICB0aGlzLmV4dGVybmFsTWV0cmljcyA9IHt9XG4gIH1cblxuICBvblBsYXkoKSB7XG4gICAgdGhpcy5zdGF0ZSA9IFwiUExBWUlOR1wiXG4gICAgdGhpcy53YXRjaGluZ1RpbWVJbml0ID0gRGF0ZS5ub3coKVxuICAgIGlmICghdGhpcy5pbnRlcnZhbElkKSB7XG4gICAgICB0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh0aGlzLnJlcG9ydC5iaW5kKHRoaXMpLCB0aGlzLnJlcG9ydEludGVydmFsKVxuICAgIH1cbiAgfVxuXG4gIG9uU3RvcCgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZClcbiAgICB0aGlzLmludGVydmFsSWQgPSB1bmRlZmluZWRcbiAgICB0aGlzLnN0YXRlID0gXCJTVE9QUEVEXCJcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIGlmICh0aGlzLmZpcnN0UGxheSkge1xuICAgICAgdGhpcy5zdGFydHVwVGltZUluaXQgPSBEYXRlLm5vdygpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVidWZmZXJpbmdUaW1lSW5pdCA9IERhdGUubm93KClcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IFwiQlVGRkVSSU5HXCJcbiAgICB0aGlzLnJlYnVmZmVycysrXG4gIH1cblxuICBvbkJ1ZmZlckZ1bGwoKSB7XG4gICAgaWYgKHRoaXMuZmlyc3RQbGF5ICYmICEhdGhpcy5zdGFydHVwVGltZUluaXQpIHtcbiAgICAgIHRoaXMuZmlyc3RQbGF5ID0gZmFsc2VcbiAgICAgIHRoaXMuc3RhcnR1cFRpbWUgPSBEYXRlLm5vdygpIC0gdGhpcy5zdGFydHVwVGltZUluaXRcbiAgICAgIHRoaXMud2F0Y2hpbmdUaW1lSW5pdCA9IERhdGUubm93KClcbiAgICB9IGVsc2UgaWYgKCEhdGhpcy5yZWJ1ZmZlcmluZ1RpbWVJbml0KSB7XG4gICAgICB0aGlzLnJlYnVmZmVyaW5nVGltZSArPSB0aGlzLmdldFJlYnVmZmVyaW5nVGltZSgpXG4gICAgfVxuICAgIHRoaXMucmVidWZmZXJpbmdUaW1lSW5pdCA9IHVuZGVmaW5lZFxuICAgIHRoaXMuc3RhdGUgPSBcIlBMQVlJTkdcIlxuICB9XG5cbiAgZ2V0UmVidWZmZXJpbmdUaW1lKCkge1xuICAgIHJldHVybiBEYXRlLm5vdygpIC0gdGhpcy5yZWJ1ZmZlcmluZ1RpbWVJbml0XG4gIH1cblxuICBnZXRXYXRjaGluZ1RpbWUoKSB7XG4gICAgdmFyIHRvdGFsVGltZSA9IChEYXRlLm5vdygpIC0gdGhpcy53YXRjaGluZ1RpbWVJbml0KVxuICAgIHJldHVybiB0b3RhbFRpbWUgLSB0aGlzLnJlYnVmZmVyaW5nVGltZVxuICB9XG5cbiAgaXNSZWJ1ZmZlcmluZygpIHtcbiAgICByZXR1cm4gISF0aGlzLnJlYnVmZmVyaW5nVGltZUluaXRcbiAgfVxuXG4gIG9uU3RhdHNBZGQobWV0cmljKSB7XG4gICAgJC5leHRlbmQodGhpcy5leHRlcm5hbE1ldHJpY3MsIG1ldHJpYylcbiAgfVxuXG4gIGdldFN0YXRzKCkge1xuICAgIHZhciBtZXRyaWNzID0ge1xuICAgICAgc3RhcnR1cFRpbWU6ICAgICB0aGlzLnN0YXJ0dXBUaW1lLFxuICAgICAgcmVidWZmZXJzOiAgICAgICB0aGlzLnJlYnVmZmVycyxcbiAgICAgIHJlYnVmZmVyaW5nVGltZTogdGhpcy5pc1JlYnVmZmVyaW5nKCk/IHRoaXMucmVidWZmZXJpbmdUaW1lICsgdGhpcy5nZXRSZWJ1ZmZlcmluZ1RpbWUoKTogdGhpcy5yZWJ1ZmZlcmluZ1RpbWUsXG4gICAgICB3YXRjaGluZ1RpbWU6ICAgIHRoaXMuaXNSZWJ1ZmZlcmluZygpPyB0aGlzLmdldFdhdGNoaW5nVGltZSgpIC0gdGhpcy5nZXRSZWJ1ZmZlcmluZ1RpbWUoKTogdGhpcy5nZXRXYXRjaGluZ1RpbWUoKVxuICAgIH1cbiAgICAkLmV4dGVuZChtZXRyaWNzLCB0aGlzLmV4dGVybmFsTWV0cmljcylcbiAgICByZXR1cm4gbWV0cmljc1xuICB9XG5cbiAgcmVwb3J0KCkge1xuICAgIHRoaXMuY29udGFpbmVyLnN0YXRzUmVwb3J0KHRoaXMuZ2V0U3RhdHMoKSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRzUGx1Z2luO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3dhdGVybWFyaycpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgVUlDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL3VpX2NvbnRhaW5lcl9wbHVnaW4nKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxuXG5jbGFzcyBXYXRlck1hcmtQbHVnaW4gZXh0ZW5kcyBVSUNvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ3dhdGVybWFyaycgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMudGVtcGxhdGUgPSBKU1RbdGhpcy5uYW1lXVxuICAgIHRoaXMucG9zaXRpb24gPSBvcHRpb25zLnBvc2l0aW9uIHx8IFwiYm90dG9tLXJpZ2h0XCJcbiAgICBpZiAob3B0aW9ucy53YXRlcm1hcmspIHtcbiAgICAgIHRoaXMuaW1hZ2VVcmwgPSBvcHRpb25zLndhdGVybWFya1xuICAgICAgdGhpcy5yZW5kZXIoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICAgIH1cbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLm9uUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIGlmICghdGhpcy5oaWRkZW4pXG4gICAgICB0aGlzLiRlbC5zaG93KClcbiAgfVxuXG4gIG9uU3RvcCgpIHtcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB2YXIgdGVtcGxhdGVPcHRpb25zID0ge3Bvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLCBpbWFnZVVybDogdGhpcy5pbWFnZVVybH1cbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUodGVtcGxhdGVPcHRpb25zKSlcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy5jb250YWluZXIuJGVsLmFwcGVuZCh0aGlzLiRlbClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2F0ZXJNYXJrUGx1Z2luXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgdW5pcXVlSWQgPSByZXF1aXJlKCcuL3V0aWxzJykudW5pcXVlSWRcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuL2V2ZW50cycpXG5cbmNsYXNzIEJhc2VPYmplY3QgZXh0ZW5kcyBFdmVudHMge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zPXt9KSB7XG4gICAgdGhpcy51bmlxdWVJZCA9IHVuaXF1ZUlkKCdvJylcbiAgICB0aGlzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlT2JqZWN0XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG5jbGFzcyBCcm93c2VyIHtcbn1cblxudmFyIGhhc0xvY2Fsc3RvcmFnZSA9IGZ1bmN0aW9uKCl7XG4gIHRyeSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NsYXBwcicsICdjbGFwcHInKVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjbGFwcHInKVxuICAgIHJldHVybiB0cnVlXG4gIH0gY2F0Y2goZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbnZhciBoYXNGbGFzaCA9IGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHZhciBmbyA9IG5ldyBBY3RpdmVYT2JqZWN0KCdTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaCcpO1xuICAgIHJldHVybiAhIWZvO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuICEhKG5hdmlnYXRvci5taW1lVHlwZXMgJiYgbmF2aWdhdG9yLm1pbWVUeXBlc1snYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIG5hdmlnYXRvci5taW1lVHlwZXNbJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJ10uZW5hYmxlZFBsdWdpbik7XG4gIH1cbn1cblxuQnJvd3Nlci5pc1NhZmFyaSA9ICghIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL3NhZmFyaS9pKSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZScpID09PSAtMSlcbkJyb3dzZXIuaXNDaHJvbWUgPSAhIShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9jaHJvbWUvaSkpXG5Ccm93c2VyLmlzRmlyZWZveCA9ICEhKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2ZpcmVmb3gvaSkpXG5Ccm93c2VyLmlzTGVnYWN5SUUgPSAhISh3aW5kb3cuQWN0aXZlWE9iamVjdClcbkJyb3dzZXIuaXNJRSA9IEJyb3dzZXIuaXNMZWdhY3lJRSB8fCAhIShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC90cmlkZW50LipydjoxXFxkL2kpKVxuQnJvd3Nlci5pc0lFMTEgPSAhIShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC90cmlkZW50LipydjoxMS9pKSlcbkJyb3dzZXIuaXNNb2JpbGUgPSAhISgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8V2luZG93cyBQaG9uZXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSlcbkJyb3dzZXIuaXNXaW44QXBwID0gISEoL01TQXBwSG9zdC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpXG5Ccm93c2VyLmlzV2lpVSA9ICEhKC9XaWlVL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSlcbkJyb3dzZXIuaXNQUzQgPSAhISgvUGxheVN0YXRpb24gNC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpXG5Ccm93c2VyLmhhc0xvY2Fsc3RvcmFnZSA9IGhhc0xvY2Fsc3RvcmFnZSgpXG5Ccm93c2VyLmhhc0ZsYXNoID0gaGFzRmxhc2goKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJyb3dzZXJcbiIsInZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnLi9iYXNlX29iamVjdCcpXG5cbmNsYXNzIENvbnRhaW5lclBsdWdpbiBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuc3RvcExpc3RlbmluZygpXG4gICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhaW5lclBsdWdpblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2NvbnRhaW5lcicpO1xuIiwidmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCcuL2Jhc2Vfb2JqZWN0JylcblxuY2xhc3MgQ29yZVBsdWdpbiBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3Rvcihjb3JlKSB7XG4gICAgc3VwZXIoY29yZSlcbiAgICB0aGlzLmNvcmUgPSBjb3JlXG4gIH1cblxuICBnZXRFeHRlcm5hbEludGVyZmFjZSgpIHsgcmV0dXJuIHt9IH1cblxuICBkZXN0cm95KCkge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29yZScpO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIGV4ZWNPbmNlID0gcmVxdWlyZSgnbG9kYXNoLm9uY2UnKVxudmFyIHVuaXF1ZUlkID0gcmVxdWlyZSgnLi91dGlscycpLnVuaXF1ZUlkXG52YXIgTG9nID0gcmVxdWlyZSgnLi4vcGx1Z2lucy9sb2cnKS5nZXRJbnN0YW5jZSgpXG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG5jbGFzcyBFdmVudHMge1xuICBvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXNcbiAgICB0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KVxuICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV0gfHwgKHRoaXMuX2V2ZW50c1tuYW1lXSA9IFtdKVxuICAgIGV2ZW50cy5wdXNoKHtjYWxsYmFjazogY2FsbGJhY2ssIGNvbnRleHQ6IGNvbnRleHQsIGN0eDogY29udGV4dCB8fCB0aGlzfSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgb25jZShuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbmNlJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpc1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIHZhciBvbmNlID0gZXhlY09uY2UoZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLm9mZihuYW1lLCBvbmNlKVxuICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH0pXG4gICAgb25jZS5fY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIG9uY2UsIGNvbnRleHQpXG4gIH1cblxuICBvZmYobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgcmV0YWluLCBldiwgZXZlbnRzLCBuYW1lcywgaSwgbCwgaiwga1xuICAgIGlmICghdGhpcy5fZXZlbnRzIHx8ICFldmVudHNBcGkodGhpcywgJ29mZicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pKSByZXR1cm4gdGhpc1xuICAgIGlmICghbmFtZSAmJiAhY2FsbGJhY2sgJiYgIWNvbnRleHQpIHtcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHZvaWQgMFxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXModGhpcy5fZXZlbnRzKVxuICAgIGZvciAoaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG5hbWUgPSBuYW1lc1tpXVxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdXG4gICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50c1tuYW1lXSA9IHJldGFpbiA9IFtdXG4gICAgICAgIGlmIChjYWxsYmFjayB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgZm9yIChqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgIGV2ID0gZXZlbnRzW2pdXG4gICAgICAgICAgICBpZiAoKGNhbGxiYWNrICYmIGNhbGxiYWNrICE9PSBldi5jYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2suX2NhbGxiYWNrKSB8fFxuICAgICAgICAgICAgICAgIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2LmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIGRlbGV0ZSB0aGlzLl9ldmVudHNbbmFtZV1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHRyaWdnZXIobmFtZSkge1xuICAgIHZhciBrbGFzcyA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV1cbiAgICBMb2cuaW5mbyhrbGFzcywgbmFtZSlcbiAgICBpZiAoIXRoaXMuX2V2ZW50cykgcmV0dXJuIHRoaXNcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICd0cmlnZ2VyJywgbmFtZSwgYXJncykpIHJldHVybiB0aGlzXG4gICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXVxuICAgIHZhciBhbGxFdmVudHMgPSB0aGlzLl9ldmVudHMuYWxsXG4gICAgaWYgKGV2ZW50cykgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MpXG4gICAgaWYgKGFsbEV2ZW50cykgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RvcExpc3RlbmluZyhvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGxpc3RlbmluZ1RvID0gdGhpcy5fbGlzdGVuaW5nVG9cbiAgICBpZiAoIWxpc3RlbmluZ1RvKSByZXR1cm4gdGhpc1xuICAgIHZhciByZW1vdmUgPSAhbmFtZSAmJiAhY2FsbGJhY2tcbiAgICBpZiAoIWNhbGxiYWNrICYmIHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JykgY2FsbGJhY2sgPSB0aGlzXG4gICAgaWYgKG9iaikgKGxpc3RlbmluZ1RvID0ge30pW29iai5fbGlzdGVuSWRdID0gb2JqXG4gICAgZm9yICh2YXIgaWQgaW4gbGlzdGVuaW5nVG8pIHtcbiAgICAgIG9iaiA9IGxpc3RlbmluZ1RvW2lkXVxuICAgICAgb2JqLm9mZihuYW1lLCBjYWxsYmFjaywgdGhpcylcbiAgICAgIGlmIChyZW1vdmUgfHwgT2JqZWN0LmtleXMob2JqLl9ldmVudHMpLmxlbmd0aCA9PT0gMCkgZGVsZXRlIHRoaXMuX2xpc3RlbmluZ1RvW2lkXVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbnZhciBldmVudFNwbGl0dGVyID0gL1xccysvXG5cbnZhciBldmVudHNBcGkgPSBmdW5jdGlvbihvYmosIGFjdGlvbiwgbmFtZSwgcmVzdCkge1xuICBpZiAoIW5hbWUpIHJldHVybiB0cnVlXG5cbiAgLy8gSGFuZGxlIGV2ZW50IG1hcHMuXG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgb2JqW2FjdGlvbl0uYXBwbHkob2JqLCBba2V5LCBuYW1lW2tleV1dLmNvbmNhdChyZXN0KSlcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBIYW5kbGUgc3BhY2Ugc2VwYXJhdGVkIGV2ZW50IG5hbWVzLlxuICBpZiAoZXZlbnRTcGxpdHRlci50ZXN0KG5hbWUpKSB7XG4gICAgdmFyIG5hbWVzID0gbmFtZS5zcGxpdChldmVudFNwbGl0dGVyKVxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtuYW1lc1tpXV0uY29uY2F0KHJlc3QpKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbnZhciB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzKSB7XG4gIHZhciBldiwgaSA9IC0xLCBsID0gZXZlbnRzLmxlbmd0aCwgYTEgPSBhcmdzWzBdLCBhMiA9IGFyZ3NbMV0sIGEzID0gYXJnc1syXVxuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7IHJldHVyblxuICAgIGNhc2UgMTogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTsgcmV0dXJuXG4gICAgY2FzZSAyOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTsgcmV0dXJuXG4gICAgY2FzZSAzOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyLCBhMyk7IHJldHVyblxuICAgIGRlZmF1bHQ6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7IHJldHVyblxuICB9XG59XG5cbnZhciBsaXN0ZW5NZXRob2RzID0ge2xpc3RlblRvOiAnb24nLCBsaXN0ZW5Ub09uY2U6ICdvbmNlJ31cblxuT2JqZWN0LmtleXMobGlzdGVuTWV0aG9kcykuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgRXZlbnRzLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBsaXN0ZW5pbmdUbyA9IHRoaXMuX2xpc3RlbmluZ1RvIHx8ICh0aGlzLl9saXN0ZW5pbmdUbyA9IHt9KVxuICAgIHZhciBpZCA9IG9iai5fbGlzdGVuSWQgfHwgKG9iai5fbGlzdGVuSWQgPSB1bmlxdWVJZCgnbCcpKVxuICAgIGxpc3RlbmluZ1RvW2lkXSA9IG9ialxuICAgIGlmICghY2FsbGJhY2sgJiYgdHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXNcbiAgICBvYmpbbGlzdGVuTWV0aG9kc1ttZXRob2RdXShuYW1lLCBjYWxsYmFjaywgdGhpcylcbiAgICByZXR1cm4gdGhpc1xuICB9XG59KTtcblxuLy8gUExBWUVSIEVWRU5UU1xuRXZlbnRzLlBMQVlFUl9SRVNJWkUgPSAncGxheWVyOnJlc2l6ZSdcblxuLy8gUGxheWJhY2sgRXZlbnRzXG5FdmVudHMuUExBWUJBQ0tfUFJPR1JFU1MgPSAncGxheWJhY2s6cHJvZ3Jlc3MnXG5FdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSA9ICdwbGF5YmFjazp0aW1ldXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX1JFQURZID0gJ3BsYXliYWNrOnJlYWR5J1xuRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORyA9ICdwbGF5YmFjazpidWZmZXJpbmcnXG5FdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCA9ICdwbGF5YmFjazpidWZmZXJmdWxsJ1xuRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFID0gJ3BsYXliYWNrOnNldHRpbmdzdXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX0xPQURFRE1FVEFEQVRBID0gJ3BsYXliYWNrOmxvYWRlZG1ldGFkYXRhJ1xuRXZlbnRzLlBMQVlCQUNLX0hJR0hERUZJTklUSU9OVVBEQVRFID0gJ3BsYXliYWNrOmhpZ2hkZWZpbml0aW9udXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX0JJVFJBVEUgPSAncGxheWJhY2s6Yml0cmF0ZSdcbkV2ZW50cy5QTEFZQkFDS19QTEFZQkFDS1NUQVRFID0gJ3BsYXliYWNrOnBsYXliYWNrc3RhdGUnXG5FdmVudHMuUExBWUJBQ0tfRFZSID0gJ3BsYXliYWNrOmR2cidcbkV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRElTQUJMRSA9ICdwbGF5YmFjazptZWRpYWNvbnRyb2w6ZGlzYWJsZSdcbkV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRU5BQkxFID0gJ3BsYXliYWNrOm1lZGlhY29udHJvbDplbmFibGUnXG5FdmVudHMuUExBWUJBQ0tfRU5ERUQgPSAncGxheWJhY2s6ZW5kZWQnXG5FdmVudHMuUExBWUJBQ0tfUExBWSA9ICdwbGF5YmFjazpwbGF5J1xuRXZlbnRzLlBMQVlCQUNLX0VSUk9SID0gJ3BsYXliYWNrOmVycm9yJ1xuRXZlbnRzLlBMQVlCQUNLX1NUQVRTX0FERCA9ICdwbGF5YmFjazpzdGF0czphZGQnXG5cbi8vIENvbnRhaW5lciBFdmVudHNcbkV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tTVEFURSA9ICdjb250YWluZXI6cGxheWJhY2tzdGF0ZSdcbkV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQgPSAnY29udGFpbmVyOmR2cidcbkV2ZW50cy5DT05UQUlORVJfQklUUkFURSA9ICdjb250YWluZXI6Yml0cmF0ZSdcbkV2ZW50cy5DT05UQUlORVJfU1RBVFNfUkVQT1JUID0gJ2NvbnRhaW5lcjpzdGF0czpyZXBvcnQnXG5FdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCA9ICdjb250YWluZXI6ZGVzdHJveWVkJ1xuRXZlbnRzLkNPTlRBSU5FUl9SRUFEWSA9ICdjb250YWluZXI6cmVhZHknXG5FdmVudHMuQ09OVEFJTkVSX0VSUk9SID0gJ2NvbnRhaW5lcjplcnJvcidcbkV2ZW50cy5DT05UQUlORVJfTE9BREVETUVUQURBVEEgPSAnY29udGFpbmVyOmxvYWRlZG1ldGFkYXRhJ1xuRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFID0gJ2NvbnRhaW5lcjp0aW1ldXBkYXRlJ1xuRXZlbnRzLkNPTlRBSU5FUl9QUk9HUkVTUyA9ICdjb250YWluZXI6cHJvZ3Jlc3MnXG5FdmVudHMuQ09OVEFJTkVSX1BMQVkgPSAnY29udGFpbmVyOnBsYXknXG5FdmVudHMuQ09OVEFJTkVSX1NUT1AgPSAnY29udGFpbmVyOnN0b3AnXG5FdmVudHMuQ09OVEFJTkVSX1BBVVNFID0gJ2NvbnRhaW5lcjpwYXVzZSdcbkV2ZW50cy5DT05UQUlORVJfRU5ERUQgPSAnY29udGFpbmVyOmVuZGVkJ1xuRXZlbnRzLkNPTlRBSU5FUl9DTElDSyA9ICdjb250YWluZXI6Y2xpY2snXG5FdmVudHMuQ09OVEFJTkVSX01PVVNFX0VOVEVSID0gJ2NvbnRhaW5lcjptb3VzZWVudGVyJ1xuRXZlbnRzLkNPTlRBSU5FUl9NT1VTRV9MRUFWRSA9ICdjb250YWluZXI6bW91c2VsZWF2ZSdcbkV2ZW50cy5DT05UQUlORVJfU0VFSyA9ICdjb250YWluZXI6c2VlaydcbkV2ZW50cy5DT05UQUlORVJfVk9MVU1FID0gJ2NvbnRhaW5lcjp2b2x1bWUnXG5FdmVudHMuQ09OVEFJTkVSX0ZVTExTQ1JFRU4gPSAnY29udGFpbmVyOmZ1bGxzY3JlZW4nXG5FdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORyA9ICdjb250YWluZXI6c3RhdGU6YnVmZmVyaW5nJ1xuRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMID0gJ2NvbnRhaW5lcjpzdGF0ZTpidWZmZXJmdWxsJ1xuRXZlbnRzLkNPTlRBSU5FUl9TRVRUSU5HU1VQREFURSA9ICdjb250YWluZXI6c2V0dGluZ3N1cGRhdGUnXG5FdmVudHMuQ09OVEFJTkVSX0hJR0hERUZJTklUSU9OVVBEQVRFID0gJ2NvbnRhaW5lcjpoaWdoZGVmaW5pdGlvbnVwZGF0ZSdcbkV2ZW50cy5DT05UQUlORVJfTUVESUFDT05UUk9MX0RJU0FCTEUgPSAnY29udGFpbmVyOm1lZGlhY29udHJvbDpkaXNhYmxlJ1xuRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRU5BQkxFID0gJ2NvbnRhaW5lcjptZWRpYWNvbnRyb2w6ZW5hYmxlJ1xuRXZlbnRzLkNPTlRBSU5FUl9TVEFUU19BREQgPSAnY29udGFpbmVyOnN0YXRzOmFkZCdcblxuLy8gTWVkaWFDb250cm9sIEV2ZW50c1xuRXZlbnRzLk1FRElBQ09OVFJPTF9SRU5ERVJFRCA9ICdtZWRpYWNvbnRyb2w6cmVuZGVyZWQnXG5FdmVudHMuTUVESUFDT05UUk9MX0ZVTExTQ1JFRU4gPSAnbWVkaWFjb250cm9sOmZ1bGxzY3JlZW4nXG5FdmVudHMuTUVESUFDT05UUk9MX1NIT1cgPSAnbWVkaWFjb250cm9sOnNob3cnXG5FdmVudHMuTUVESUFDT05UUk9MX0hJREUgPSAnbWVkaWFjb250cm9sOmhpZGUnXG5FdmVudHMuTUVESUFDT05UUk9MX01PVVNFTU9WRV9TRUVLQkFSID0gJ21lZGlhY29udHJvbDptb3VzZW1vdmU6c2Vla2JhcidcbkV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VMRUFWRV9TRUVLQkFSID0gJ21lZGlhY29udHJvbDptb3VzZWxlYXZlOnNlZWtiYXInXG5FdmVudHMuTUVESUFDT05UUk9MX1BMQVlJTkcgPSAnbWVkaWFjb250cm9sOnBsYXlpbmcnXG5FdmVudHMuTUVESUFDT05UUk9MX05PVFBMQVlJTkcgPSAnbWVkaWFjb250cm9sOm5vdHBsYXlpbmcnXG5FdmVudHMuTUVESUFDT05UUk9MX0NPTlRBSU5FUkNIQU5HRUQgPSAnbWVkaWFjb250cm9sOmNvbnRhaW5lcmNoYW5nZWQnXG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRzXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmxhc2gnKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2hscycpO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaHRtbDVfYXVkaW8nKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2h0bWw1X3ZpZGVvJyk7XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9odG1sX2ltZycpO1xuXG4iLCJ2YXIgS2libyA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudCB8fCB3aW5kb3cuZG9jdW1lbnQ7XG4gIHRoaXMuaW5pdGlhbGl6ZSgpO1xufTtcblxuS2liby5LRVlfTkFNRVNfQllfQ09ERSA9IHtcbiAgODogJ2JhY2tzcGFjZScsIDk6ICd0YWInLCAxMzogJ2VudGVyJyxcbiAgMTY6ICdzaGlmdCcsIDE3OiAnY3RybCcsIDE4OiAnYWx0JyxcbiAgMjA6ICdjYXBzX2xvY2snLFxuICAyNzogJ2VzYycsXG4gIDMyOiAnc3BhY2UnLFxuICAzNzogJ2xlZnQnLCAzODogJ3VwJywgMzk6ICdyaWdodCcsIDQwOiAnZG93bicsXG4gIDQ4OiAnMCcsIDQ5OiAnMScsIDUwOiAnMicsIDUxOiAnMycsIDUyOiAnNCcsIDUzOiAnNScsIDU0OiAnNicsIDU1OiAnNycsIDU2OiAnOCcsIDU3OiAnOScsXG4gIDY1OiAnYScsIDY2OiAnYicsIDY3OiAnYycsIDY4OiAnZCcsIDY5OiAnZScsIDcwOiAnZicsIDcxOiAnZycsIDcyOiAnaCcsIDczOiAnaScsIDc0OiAnaicsIDc1OiAnaycsIDc2OiAnbCcsIDc3OiAnbScsIDc4OiAnbicsIDc5OiAnbycsIDgwOiAncCcsIDgxOiAncScsIDgyOiAncicsIDgzOiAncycsIDg0OiAndCcsIDg1OiAndScsIDg2OiAndicsIDg3OiAndycsIDg4OiAneCcsIDg5OiAneScsIDkwOiAneicsXG4gIDExMjogJ2YxJywgMTEzOiAnZjInLCAxMTQ6ICdmMycsIDExNTogJ2Y0JywgMTE2OiAnZjUnLCAxMTc6ICdmNicsIDExODogJ2Y3JywgMTE5OiAnZjgnLCAxMjA6ICdmOScsIDEyMTogJ2YxMCcsIDEyMjogJ2YxMScsIDEyMzogJ2YxMidcbn07XG5cbktpYm8uS0VZX0NPREVTX0JZX05BTUUgPSB7fTtcbihmdW5jdGlvbigpIHtcbiAgZm9yKHZhciBrZXkgaW4gS2liby5LRVlfTkFNRVNfQllfQ09ERSlcbiAgICBpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoS2liby5LRVlfTkFNRVNfQllfQ09ERSwga2V5KSlcbiAgICAgIEtpYm8uS0VZX0NPREVTX0JZX05BTUVbS2liby5LRVlfTkFNRVNfQllfQ09ERVtrZXldXSA9ICtrZXk7XG59KSgpO1xuXG5LaWJvLk1PRElGSUVSUyA9IFsnc2hpZnQnLCAnY3RybCcsICdhbHQnXTtcblxuS2liby5yZWdpc3RlckV2ZW50ID0gKGZ1bmN0aW9uKCkge1xuICBpZihkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgZnVuYykge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuYywgZmFsc2UpO1xuICAgIH07XG4gIH1cbiAgZWxzZSBpZihkb2N1bWVudC5hdHRhY2hFdmVudCkge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGZ1bmMpIHtcbiAgICAgIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50TmFtZSwgZnVuYyk7XG4gICAgfTtcbiAgfVxufSkoKTtcblxuS2liby51bnJlZ2lzdGVyRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGlmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jLCBmYWxzZSk7XG4gICAgfTtcbiAgfVxuICBlbHNlIGlmKGRvY3VtZW50LmRldGFjaEV2ZW50KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgZnVuYykge1xuICAgICAgZWxlbWVudC5kZXRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCBmdW5jKTtcbiAgICB9O1xuICB9XG59KSgpO1xuXG5LaWJvLnN0cmluZ0NvbnRhaW5zID0gZnVuY3Rpb24oc3RyaW5nLCBzdWJzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5pbmRleE9mKHN1YnN0cmluZykgIT09IC0xO1xufTtcblxuS2liby5uZWF0U3RyaW5nID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpLnJlcGxhY2UoL1xccysvZywgJyAnKTtcbn07XG5cbktpYm8uY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXi4vLCBmdW5jdGlvbihtYXRjaCkgeyByZXR1cm4gbWF0Y2gudG9VcHBlckNhc2UoKTsgfSk7XG59O1xuXG5LaWJvLmlzU3RyaW5nID0gZnVuY3Rpb24od2hhdCkge1xuICByZXR1cm4gS2liby5zdHJpbmdDb250YWlucyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2hhdCksICdTdHJpbmcnKTtcbn07XG5cbktpYm8uYXJyYXlJbmNsdWRlcyA9IChmdW5jdGlvbigpIHtcbiAgaWYoQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgICAgcmV0dXJuIGhheXN0YWNrLmluZGV4T2YobmVlZGxlKSAhPT0gLTE7XG4gICAgfTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGhheXN0YWNrLmxlbmd0aDsgaSsrKVxuICAgICAgICBpZihoYXlzdGFja1tpXSA9PT0gbmVlZGxlKVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH1cbn0pKCk7XG5cbktpYm8uZXh0cmFjdE1vZGlmaWVycyA9IGZ1bmN0aW9uKGtleUNvbWJpbmF0aW9uKSB7XG4gIHZhciBtb2RpZmllcnMsIGlcbiAgbW9kaWZpZXJzID0gW107XG4gIGZvcihpID0gMDsgaSA8IEtpYm8uTU9ESUZJRVJTLmxlbmd0aDsgaSsrKVxuICAgIGlmKEtpYm8uc3RyaW5nQ29udGFpbnMoa2V5Q29tYmluYXRpb24sIEtpYm8uTU9ESUZJRVJTW2ldKSlcbiAgICAgIG1vZGlmaWVycy5wdXNoKEtpYm8uTU9ESUZJRVJTW2ldKTtcbiAgcmV0dXJuIG1vZGlmaWVycztcbn1cblxuS2liby5leHRyYWN0S2V5ID0gZnVuY3Rpb24oa2V5Q29tYmluYXRpb24pIHtcbiAgdmFyIGtleXMsIGk7XG4gIGtleXMgPSBLaWJvLm5lYXRTdHJpbmcoa2V5Q29tYmluYXRpb24pLnNwbGl0KCcgJyk7XG4gIGZvcihpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspXG4gICAgaWYoIUtpYm8uYXJyYXlJbmNsdWRlcyhLaWJvLk1PRElGSUVSUywga2V5c1tpXSkpXG4gICAgICByZXR1cm4ga2V5c1tpXTtcbn07XG5cbktpYm8ubW9kaWZpZXJzQW5kS2V5ID0gZnVuY3Rpb24oa2V5Q29tYmluYXRpb24pIHtcbiAgdmFyIHJlc3VsdCwga2V5O1xuXG4gIGlmKEtpYm8uc3RyaW5nQ29udGFpbnMoa2V5Q29tYmluYXRpb24sICdhbnknKSkge1xuICAgIHJldHVybiBLaWJvLm5lYXRTdHJpbmcoa2V5Q29tYmluYXRpb24pLnNwbGl0KCcgJykuc2xpY2UoMCwgMikuam9pbignICcpO1xuICB9XG5cbiAgcmVzdWx0ID0gS2liby5leHRyYWN0TW9kaWZpZXJzKGtleUNvbWJpbmF0aW9uKTtcblxuICBrZXkgPSBLaWJvLmV4dHJhY3RLZXkoa2V5Q29tYmluYXRpb24pO1xuICBpZihrZXkgJiYgIUtpYm8uYXJyYXlJbmNsdWRlcyhLaWJvLk1PRElGSUVSUywga2V5KSlcbiAgICByZXN1bHQucHVzaChrZXkpO1xuXG4gIHJldHVybiByZXN1bHQuam9pbignICcpO1xufVxuXG5LaWJvLmtleU5hbWUgPSBmdW5jdGlvbihrZXlDb2RlKSB7XG4gIHJldHVybiBLaWJvLktFWV9OQU1FU19CWV9DT0RFW2tleUNvZGUgKyAnJ107XG59O1xuXG5LaWJvLmtleUNvZGUgPSBmdW5jdGlvbihrZXlOYW1lKSB7XG4gIHJldHVybiArS2liby5LRVlfQ09ERVNfQllfTkFNRVtrZXlOYW1lXTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGksIHRoYXQgPSB0aGlzO1xuXG4gIHRoaXMubGFzdEtleUNvZGUgPSAtMTtcbiAgdGhpcy5sYXN0TW9kaWZpZXJzID0ge307XG4gIGZvcihpID0gMDsgaSA8IEtpYm8uTU9ESUZJRVJTLmxlbmd0aDsgaSsrKVxuICAgIHRoaXMubGFzdE1vZGlmaWVyc1tLaWJvLk1PRElGSUVSU1tpXV0gPSBmYWxzZTtcblxuICB0aGlzLmtleXNEb3duID0geyBhbnk6IFtdIH07XG4gIHRoaXMua2V5c1VwID0geyBhbnk6IFtdIH07XG4gIHRoaXMuZG93bkhhbmRsZXIgPSB0aGlzLmhhbmRsZXIoJ2Rvd24nKTtcbiAgdGhpcy51cEhhbmRsZXIgPSB0aGlzLmhhbmRsZXIoJ3VwJyk7XG5cbiAgS2liby5yZWdpc3RlckV2ZW50KHRoaXMuZWxlbWVudCwgJ2tleWRvd24nLCB0aGlzLmRvd25IYW5kbGVyKTtcbiAgS2liby5yZWdpc3RlckV2ZW50KHRoaXMuZWxlbWVudCwgJ2tleXVwJywgdGhpcy51cEhhbmRsZXIpO1xuICBLaWJvLnJlZ2lzdGVyRXZlbnQod2luZG93LCAndW5sb2FkJywgZnVuY3Rpb24gdW5sb2FkZXIoKSB7XG4gICAgS2liby51bnJlZ2lzdGVyRXZlbnQodGhhdC5lbGVtZW50LCAna2V5ZG93bicsIHRoYXQuZG93bkhhbmRsZXIpO1xuICAgIEtpYm8udW5yZWdpc3RlckV2ZW50KHRoYXQuZWxlbWVudCwgJ2tleXVwJywgdGhhdC51cEhhbmRsZXIpO1xuICAgIEtpYm8udW5yZWdpc3RlckV2ZW50KHdpbmRvdywgJ3VubG9hZCcsIHVubG9hZGVyKTtcbiAgfSk7XG59O1xuXG5LaWJvLnByb3RvdHlwZS5oYW5kbGVyID0gZnVuY3Rpb24odXBPckRvd24pIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgIHZhciBpLCByZWdpc3RlcmVkS2V5cywgbGFzdE1vZGlmaWVyc0FuZEtleTtcblxuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcblxuICAgIHRoYXQubGFzdEtleUNvZGUgPSBlLmtleUNvZGU7XG4gICAgZm9yKGkgPSAwOyBpIDwgS2liby5NT0RJRklFUlMubGVuZ3RoOyBpKyspXG4gICAgICB0aGF0Lmxhc3RNb2RpZmllcnNbS2liby5NT0RJRklFUlNbaV1dID0gZVtLaWJvLk1PRElGSUVSU1tpXSArICdLZXknXTtcbiAgICBpZihLaWJvLmFycmF5SW5jbHVkZXMoS2liby5NT0RJRklFUlMsIEtpYm8ua2V5TmFtZSh0aGF0Lmxhc3RLZXlDb2RlKSkpXG4gICAgICB0aGF0Lmxhc3RNb2RpZmllcnNbS2liby5rZXlOYW1lKHRoYXQubGFzdEtleUNvZGUpXSA9IHRydWU7XG5cbiAgICByZWdpc3RlcmVkS2V5cyA9IHRoYXRbJ2tleXMnICsgS2liby5jYXBpdGFsaXplKHVwT3JEb3duKV07XG5cbiAgICBmb3IoaSA9IDA7IGkgPCByZWdpc3RlcmVkS2V5cy5hbnkubGVuZ3RoOyBpKyspXG4gICAgICBpZigocmVnaXN0ZXJlZEtleXMuYW55W2ldKGUpID09PSBmYWxzZSkgJiYgZS5wcmV2ZW50RGVmYXVsdClcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbGFzdE1vZGlmaWVyc0FuZEtleSA9IHRoYXQubGFzdE1vZGlmaWVyc0FuZEtleSgpO1xuICAgIGlmKHJlZ2lzdGVyZWRLZXlzW2xhc3RNb2RpZmllcnNBbmRLZXldKVxuICAgICAgZm9yKGkgPSAwOyBpIDwgcmVnaXN0ZXJlZEtleXNbbGFzdE1vZGlmaWVyc0FuZEtleV0ubGVuZ3RoOyBpKyspXG4gICAgICAgIGlmKChyZWdpc3RlcmVkS2V5c1tsYXN0TW9kaWZpZXJzQW5kS2V5XVtpXShlKSA9PT0gZmFsc2UpICYmIGUucHJldmVudERlZmF1bHQpXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xufTtcblxuS2liby5wcm90b3R5cGUucmVnaXN0ZXJLZXlzID0gZnVuY3Rpb24odXBPckRvd24sIG5ld0tleXMsIGZ1bmMpIHtcbiAgdmFyIGksIGtleXMsIHJlZ2lzdGVyZWRLZXlzID0gdGhpc1sna2V5cycgKyBLaWJvLmNhcGl0YWxpemUodXBPckRvd24pXTtcblxuICBpZihLaWJvLmlzU3RyaW5nKG5ld0tleXMpKVxuICAgIG5ld0tleXMgPSBbbmV3S2V5c107XG5cbiAgZm9yKGkgPSAwOyBpIDwgbmV3S2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleXMgPSBuZXdLZXlzW2ldO1xuICAgIGtleXMgPSBLaWJvLm1vZGlmaWVyc0FuZEtleShrZXlzICsgJycpO1xuXG4gICAgaWYocmVnaXN0ZXJlZEtleXNba2V5c10pXG4gICAgICByZWdpc3RlcmVkS2V5c1trZXlzXS5wdXNoKGZ1bmMpO1xuICAgIGVsc2VcbiAgICAgIHJlZ2lzdGVyZWRLZXlzW2tleXNdID0gW2Z1bmNdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5LaWJvLnByb3RvdHlwZS51bnJlZ2lzdGVyS2V5cyA9IGZ1bmN0aW9uKHVwT3JEb3duLCBuZXdLZXlzLCBmdW5jKSB7XG4gIHZhciBpLCBqLCBrZXlzLCByZWdpc3RlcmVkS2V5cyA9IHRoaXNbJ2tleXMnICsgS2liby5jYXBpdGFsaXplKHVwT3JEb3duKV07XG5cbiAgaWYoS2liby5pc1N0cmluZyhuZXdLZXlzKSlcbiAgICBuZXdLZXlzID0gW25ld0tleXNdO1xuXG4gIGZvcihpID0gMDsgaSA8IG5ld0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXlzID0gbmV3S2V5c1tpXTtcbiAgICBrZXlzID0gS2liby5tb2RpZmllcnNBbmRLZXkoa2V5cyArICcnKTtcblxuICAgIGlmKGZ1bmMgPT09IG51bGwpXG4gICAgICBkZWxldGUgcmVnaXN0ZXJlZEtleXNba2V5c107XG4gICAgZWxzZSB7XG4gICAgICBpZihyZWdpc3RlcmVkS2V5c1trZXlzXSkge1xuICAgICAgICBmb3IoaiA9IDA7IGogPCByZWdpc3RlcmVkS2V5c1trZXlzXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmKFN0cmluZyhyZWdpc3RlcmVkS2V5c1trZXlzXVtqXSkgPT09IFN0cmluZyhmdW5jKSkge1xuICAgICAgICAgICAgcmVnaXN0ZXJlZEtleXNba2V5c10uc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5LaWJvLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihrZXlzKSB7XG4gIHJldHVybiB0aGlzLnVucmVnaXN0ZXJLZXlzKCdkb3duJywga2V5cywgbnVsbCk7XG59XG5cbktpYm8ucHJvdG90eXBlLmRlbGVnYXRlID0gZnVuY3Rpb24odXBPckRvd24sIGtleXMsIGZ1bmMpIHtcbiAgcmV0dXJuIChmdW5jICE9PSBudWxsIHx8IGZ1bmMgIT09IHVuZGVmaW5lZCkgPyB0aGlzLnJlZ2lzdGVyS2V5cyh1cE9yRG93biwga2V5cywgZnVuYykgOiB0aGlzLnVucmVnaXN0ZXJLZXlzKHVwT3JEb3duLCBrZXlzLCBmdW5jKTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmRvd24gPSBmdW5jdGlvbihrZXlzLCBmdW5jKSB7XG4gIHJldHVybiB0aGlzLmRlbGVnYXRlKCdkb3duJywga2V5cywgZnVuYyk7XG59O1xuXG5LaWJvLnByb3RvdHlwZS51cCA9IGZ1bmN0aW9uKGtleXMsIGZ1bmMpIHtcbiAgcmV0dXJuIHRoaXMuZGVsZWdhdGUoJ3VwJywga2V5cywgZnVuYyk7XG59O1xuXG5LaWJvLnByb3RvdHlwZS5sYXN0S2V5ID0gZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgaWYoIW1vZGlmaWVyKVxuICAgIHJldHVybiBLaWJvLmtleU5hbWUodGhpcy5sYXN0S2V5Q29kZSk7XG5cbiAgcmV0dXJuIHRoaXMubGFzdE1vZGlmaWVyc1ttb2RpZmllcl07XG59O1xuXG5LaWJvLnByb3RvdHlwZS5sYXN0TW9kaWZpZXJzQW5kS2V5ID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXN1bHQsIGk7XG5cbiAgcmVzdWx0ID0gW107XG4gIGZvcihpID0gMDsgaSA8IEtpYm8uTU9ESUZJRVJTLmxlbmd0aDsgaSsrKVxuICAgIGlmKHRoaXMubGFzdEtleShLaWJvLk1PRElGSUVSU1tpXSkpXG4gICAgICByZXN1bHQucHVzaChLaWJvLk1PRElGSUVSU1tpXSk7XG5cbiAgaWYoIUtpYm8uYXJyYXlJbmNsdWRlcyhyZXN1bHQsIHRoaXMubGFzdEtleSgpKSlcbiAgICByZXN1bHQucHVzaCh0aGlzLmxhc3RLZXkoKSk7XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtpYm87XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbWVkaWFfY29udHJvbCcpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIFRoZSBtZWRpYXRvciBpcyBhIHNpbmdsZXRvbiBmb3IgaGFuZGxpbmcgZ2xvYmFsIGV2ZW50cy5cbiAqL1xuXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vYmFzZS9ldmVudHMnKVxuXG52YXIgZXZlbnRzID0gbmV3IEV2ZW50cygpXG5cbmNsYXNzIE1lZGlhdG9yIHtcbn1cblxuTWVkaWF0b3Iub24gPSBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICBldmVudHMub24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpXG4gIHJldHVyblxufVxuXG5NZWRpYXRvci5vbmNlID0gZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgZXZlbnRzLm9uY2UobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpXG4gIHJldHVyblxufVxuXG5NZWRpYXRvci5vZmYgPSBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICBldmVudHMub2ZmKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KVxuICByZXR1cm5cbn1cblxuTWVkaWF0b3IudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUsIG9wdHMpIHtcbiAgZXZlbnRzLnRyaWdnZXIobmFtZSwgb3B0cylcbiAgcmV0dXJuXG59XG5cbk1lZGlhdG9yLnN0b3BMaXN0ZW5pbmcgPSBmdW5jdGlvbihvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gIGV2ZW50cy5zdG9wTGlzdGVuaW5nKG9iaiwgbmFtZSwgY2FsbGJhY2spXG4gIHJldHVyblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1lZGlhdG9yXG4iLCJ2YXIgVUlPYmplY3QgPSByZXF1aXJlKCcuL3VpX29iamVjdCcpXG5cbmNsYXNzIFBsYXliYWNrIGV4dGVuZHMgVUlPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnNldHRpbmdzID0ge31cbiAgfVxuXG4gIHBsYXkoKSB7fVxuXG4gIHBhdXNlKCkge31cblxuICBzdG9wKCkge31cblxuICBzZWVrKHRpbWUpIHt9XG5cbiAgZ2V0RHVyYXRpb24oKSB7IHJldHVybiAwIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBnZXRQbGF5YmFja1R5cGUoKSB7XG4gICAgcmV0dXJuICdub19vcCdcbiAgfVxuXG4gIGlzSGlnaERlZmluaXRpb25JblVzZSgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHZvbHVtZSh2YWx1ZSkge31cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuJGVsLnJlbW92ZSgpXG4gIH1cbn1cblxuUGxheWJhY2suY2FuUGxheSA9IChzb3VyY2UpID0+IHtcbiAgcmV0dXJuIGZhbHNlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWJhY2tcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5ZXJJbmZvID17XG4gIG9wdGlvbnM6IHt9LFxuICBwbGF5YmFja1BsdWdpbnM6IFtdLFxuICBjdXJyZW50U2l6ZTogeyB3aWR0aDogMCwgaGVpZ2h0OiAwIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJJbmZvXG5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9wb3N0ZXInKTtcblxuIiwiLy8gU2ltcGxlIEphdmFTY3JpcHQgVGVtcGxhdGluZ1xuLy8gUGF1bCBNaWxsZXIgKGh0dHA6Ly9wYXVsbWlsbHIuY29tKVxuLy8gaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcbi8vIChjKSAyMDA5LTIwMTMgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbihmdW5jdGlvbihnbG9iYWxzKSB7XG4gIC8vIEJ5IGRlZmF1bHQsIFVuZGVyc2NvcmUgdXNlcyBFUkItc3R5bGUgdGVtcGxhdGUgZGVsaW1pdGVycywgY2hhbmdlIHRoZVxuICAvLyBmb2xsb3dpbmcgdGVtcGxhdGUgc2V0dGluZ3MgdG8gdXNlIGFsdGVybmF0aXZlIGRlbGltaXRlcnMuXG4gIHZhciBzZXR0aW5ncyA9IHtcbiAgICBldmFsdWF0ZSAgICA6IC88JShbXFxzXFxTXSs/KSU+L2csXG4gICAgaW50ZXJwb2xhdGUgOiAvPCU9KFtcXHNcXFNdKz8pJT4vZyxcbiAgICBlc2NhcGUgICAgICA6IC88JS0oW1xcc1xcU10rPyklPi9nXG4gIH07XG5cbiAgLy8gV2hlbiBjdXN0b21pemluZyBgdGVtcGxhdGVTZXR0aW5nc2AsIGlmIHlvdSBkb24ndCB3YW50IHRvIGRlZmluZSBhblxuICAvLyBpbnRlcnBvbGF0aW9uLCBldmFsdWF0aW9uIG9yIGVzY2FwaW5nIHJlZ2V4LCB3ZSBuZWVkIG9uZSB0aGF0IGlzXG4gIC8vIGd1YXJhbnRlZWQgbm90IHRvIG1hdGNoLlxuICB2YXIgbm9NYXRjaCA9IC8oLileLztcblxuICAvLyBDZXJ0YWluIGNoYXJhY3RlcnMgbmVlZCB0byBiZSBlc2NhcGVkIHNvIHRoYXQgdGhleSBjYW4gYmUgcHV0IGludG8gYVxuICAvLyBzdHJpbmcgbGl0ZXJhbC5cbiAgdmFyIGVzY2FwZXMgPSB7XG4gICAgXCInXCI6ICAgICAgXCInXCIsXG4gICAgJ1xcXFwnOiAgICAgJ1xcXFwnLFxuICAgICdcXHInOiAgICAgJ3InLFxuICAgICdcXG4nOiAgICAgJ24nLFxuICAgICdcXHQnOiAgICAgJ3QnLFxuICAgICdcXHUyMDI4JzogJ3UyMDI4JyxcbiAgICAnXFx1MjAyOSc6ICd1MjAyOSdcbiAgfTtcblxuICB2YXIgZXNjYXBlciA9IC9cXFxcfCd8XFxyfFxcbnxcXHR8XFx1MjAyOHxcXHUyMDI5L2c7XG5cbiAgLy8gTGlzdCBvZiBIVE1MIGVudGl0aWVzIGZvciBlc2NhcGluZy5cbiAgdmFyIGh0bWxFbnRpdGllcyA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmI3gyNzsnXG4gIH07XG5cbiAgdmFyIGVudGl0eVJlID0gbmV3IFJlZ0V4cCgnWyY8PlwiXFwnXScsICdnJyk7XG5cbiAgdmFyIGVzY2FwZUV4cHIgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICBpZiAoc3RyaW5nID09IG51bGwpIHJldHVybiAnJztcbiAgICByZXR1cm4gKCcnICsgc3RyaW5nKS5yZXBsYWNlKGVudGl0eVJlLCBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgcmV0dXJuIGh0bWxFbnRpdGllc1ttYXRjaF07XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIGNvdW50ZXIgPSAwO1xuXG4gIC8vIEphdmFTY3JpcHQgbWljcm8tdGVtcGxhdGluZywgc2ltaWxhciB0byBKb2huIFJlc2lnJ3MgaW1wbGVtZW50YXRpb24uXG4gIC8vIFVuZGVyc2NvcmUgdGVtcGxhdGluZyBoYW5kbGVzIGFyYml0cmFyeSBkZWxpbWl0ZXJzLCBwcmVzZXJ2ZXMgd2hpdGVzcGFjZSxcbiAgLy8gYW5kIGNvcnJlY3RseSBlc2NhcGVzIHF1b3RlcyB3aXRoaW4gaW50ZXJwb2xhdGVkIGNvZGUuXG4gIHZhciB0bXBsID0gZnVuY3Rpb24odGV4dCwgZGF0YSkge1xuICAgIHZhciByZW5kZXI7XG5cbiAgICAvLyBDb21iaW5lIGRlbGltaXRlcnMgaW50byBvbmUgcmVndWxhciBleHByZXNzaW9uIHZpYSBhbHRlcm5hdGlvbi5cbiAgICB2YXIgbWF0Y2hlciA9IG5ldyBSZWdFeHAoW1xuICAgICAgKHNldHRpbmdzLmVzY2FwZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuaW50ZXJwb2xhdGUgfHwgbm9NYXRjaCkuc291cmNlLFxuICAgICAgKHNldHRpbmdzLmV2YWx1YXRlIHx8IG5vTWF0Y2gpLnNvdXJjZVxuICAgIF0uam9pbignfCcpICsgJ3wkJywgJ2cnKTtcblxuICAgIC8vIENvbXBpbGUgdGhlIHRlbXBsYXRlIHNvdXJjZSwgZXNjYXBpbmcgc3RyaW5nIGxpdGVyYWxzIGFwcHJvcHJpYXRlbHkuXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgc291cmNlID0gXCJfX3ArPSdcIjtcbiAgICB0ZXh0LnJlcGxhY2UobWF0Y2hlciwgZnVuY3Rpb24obWF0Y2gsIGVzY2FwZSwgaW50ZXJwb2xhdGUsIGV2YWx1YXRlLCBvZmZzZXQpIHtcbiAgICAgIHNvdXJjZSArPSB0ZXh0LnNsaWNlKGluZGV4LCBvZmZzZXQpXG4gICAgICAgIC5yZXBsYWNlKGVzY2FwZXIsIGZ1bmN0aW9uKG1hdGNoKSB7IHJldHVybiAnXFxcXCcgKyBlc2NhcGVzW21hdGNoXTsgfSk7XG5cbiAgICAgIGlmIChlc2NhcGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBlc2NhcGUgKyBcIikpPT1udWxsPycnOmVzY2FwZUV4cHIoX190KSkrXFxuJ1wiO1xuICAgICAgfVxuICAgICAgaWYgKGludGVycG9sYXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgaW50ZXJwb2xhdGUgKyBcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiO1xuICAgICAgfVxuICAgICAgaWYgKGV2YWx1YXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIic7XFxuXCIgKyBldmFsdWF0ZSArIFwiXFxuX19wKz0nXCI7XG4gICAgICB9XG4gICAgICBpbmRleCA9IG9mZnNldCArIG1hdGNoLmxlbmd0aDtcbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcbiAgICBzb3VyY2UgKz0gXCInO1xcblwiO1xuXG4gICAgLy8gSWYgYSB2YXJpYWJsZSBpcyBub3Qgc3BlY2lmaWVkLCBwbGFjZSBkYXRhIHZhbHVlcyBpbiBsb2NhbCBzY29wZS5cbiAgICBpZiAoIXNldHRpbmdzLnZhcmlhYmxlKSBzb3VyY2UgPSAnd2l0aChvYmp8fHt9KXtcXG4nICsgc291cmNlICsgJ31cXG4nO1xuXG4gICAgc291cmNlID0gXCJ2YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4sXCIgK1xuICAgICAgXCJwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xcblwiICtcbiAgICAgIHNvdXJjZSArIFwicmV0dXJuIF9fcDtcXG4vLyMgc291cmNlVVJMPS9taWNyb3RlbXBsYXRlcy9zb3VyY2VbXCIgKyBjb3VudGVyKysgKyBcIl1cIjtcblxuICAgIHRyeSB7XG4gICAgICByZW5kZXIgPSBuZXcgRnVuY3Rpb24oc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaicsICdlc2NhcGVFeHByJywgc291cmNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEpIHJldHVybiByZW5kZXIoZGF0YSwgZXNjYXBlRXhwcik7XG4gICAgdmFyIHRlbXBsYXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIHJlbmRlci5jYWxsKHRoaXMsIGRhdGEsIGVzY2FwZUV4cHIpO1xuICAgIH07XG5cbiAgICAvLyBQcm92aWRlIHRoZSBjb21waWxlZCBmdW5jdGlvbiBzb3VyY2UgYXMgYSBjb252ZW5pZW5jZSBmb3IgcHJlY29tcGlsYXRpb24uXG4gICAgdGVtcGxhdGUuc291cmNlID0gJ2Z1bmN0aW9uKCcgKyAoc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaicpICsgJyl7XFxuJyArIHNvdXJjZSArICd9JztcblxuICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgfTtcbiAgdG1wbC5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXG4gIGlmICh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdG1wbDtcbiAgICB9KTsgLy8gUmVxdWlyZUpTXG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHRtcGw7IC8vIENvbW1vbkpTXG4gIH0gZWxzZSB7XG4gICAgZ2xvYmFscy5taWNyb3RlbXBsYXRlID0gdG1wbDsgLy8gPHNjcmlwdD5cbiAgfVxufSkodGhpcyk7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgVUlPYmplY3QgPSByZXF1aXJlKCcuL3VpX29iamVjdCcpXG5cbmNsYXNzIFVJQ29udGFpbmVyUGx1Z2luIGV4dGVuZHMgVUlPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgICAgIHRoaXMuJGVsLnNob3coKVxuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZSgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVSUNvbnRhaW5lclBsdWdpblxuIiwidmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgnLi91aV9vYmplY3QnKVxuXG5jbGFzcyBVSUNvcmVQbHVnaW4gZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKGNvcmUpIHtcbiAgICBzdXBlcihjb3JlKVxuICAgIHRoaXMuY29yZSA9IGNvcmVcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgICB0aGlzLnJlbmRlcigpXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge31cblxuICBnZXRFeHRlcm5hbEludGVyZmFjZSgpIHsgcmV0dXJuIHt9IH1cblxuICBlbmFibGUoKSB7XG4gICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuYmluZEV2ZW50cygpXG4gICAgICB0aGlzLiRlbC5zaG93KClcbiAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZygpXG4gICAgdGhpcy4kZWwuaGlkZSgpXG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2VcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmUoKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHRoaXMuJGVsLmFwcGVuZCh0aGlzLnN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpKVxuICAgIHRoaXMuY29yZS4kZWwuYXBwZW5kKHRoaXMuZWwpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVJQ29yZVBsdWdpblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyICQgPSByZXF1aXJlKCdjbGFwcHItemVwdG8nKVxudmFyIHVuaXF1ZUlkID0gcmVxdWlyZSgnLi91dGlscycpLnVuaXF1ZUlkXG52YXIgcmVzdWx0ID0gcmVxdWlyZSgnbG9kYXNoLnJlc3VsdCcpXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJy4vYmFzZV9vYmplY3QnKVxuXG52YXIgZGVsZWdhdGVFdmVudFNwbGl0dGVyID0gL14oXFxTKylcXHMqKC4qKSQvXG5cbmNsYXNzIFVJT2JqZWN0IGV4dGVuZHMgQmFzZU9iamVjdCB7XG5cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnZGl2JyB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5jaWQgPSB1bmlxdWVJZCgnYycpO1xuICAgIHRoaXMuX2Vuc3VyZUVsZW1lbnQoKTtcbiAgICB0aGlzLmRlbGVnYXRlRXZlbnRzKCk7XG4gIH1cblxuICAkKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuJGVsLmZpbmQoc2VsZWN0b3IpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICAgIHRoaXMuc3RvcExpc3RlbmluZygpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHNldEVsZW1lbnQoZWxlbWVudCwgZGVsZWdhdGUpIHtcbiAgICBpZiAodGhpcy4kZWwpIHRoaXMudW5kZWxlZ2F0ZUV2ZW50cygpXG4gICAgdGhpcy4kZWwgPSBlbGVtZW50IGluc3RhbmNlb2YgJCA/IGVsZW1lbnQgOiAkKGVsZW1lbnQpXG4gICAgdGhpcy5lbCA9IHRoaXMuJGVsWzBdXG4gICAgaWYgKGRlbGVnYXRlICE9PSBmYWxzZSkgdGhpcy5kZWxlZ2F0ZUV2ZW50cygpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGRlbGVnYXRlRXZlbnRzKGV2ZW50cykge1xuICAgIGlmICghKGV2ZW50cyB8fCAoZXZlbnRzID0gcmVzdWx0KHRoaXMsICdldmVudHMnKSkpKSByZXR1cm4gdGhpc1xuICAgIHRoaXMudW5kZWxlZ2F0ZUV2ZW50cygpXG4gICAgZm9yICh2YXIga2V5IGluIGV2ZW50cykge1xuICAgICAgdmFyIG1ldGhvZCA9IGV2ZW50c1trZXldXG4gICAgICBpZiAoKG1ldGhvZCAmJiBtZXRob2QuY29uc3RydWN0b3IgIT09IEZ1bmN0aW9uKSkgbWV0aG9kID0gdGhpc1tldmVudHNba2V5XV1cbiAgICAgIGlmICghbWV0aG9kKSBjb250aW51ZVxuXG4gICAgICB2YXIgbWF0Y2ggPSBrZXkubWF0Y2goZGVsZWdhdGVFdmVudFNwbGl0dGVyKVxuICAgICAgdmFyIGV2ZW50TmFtZSA9IG1hdGNoWzFdLCBzZWxlY3RvciA9IG1hdGNoWzJdXG4gICAgICAvL21ldGhvZCA9IF8uYmluZChtZXRob2QsIHRoaXMpXG4gICAgICBldmVudE5hbWUgKz0gJy5kZWxlZ2F0ZUV2ZW50cycgKyB0aGlzLmNpZFxuICAgICAgaWYgKHNlbGVjdG9yID09PSAnJykge1xuICAgICAgICB0aGlzLiRlbC5vbihldmVudE5hbWUsIG1ldGhvZC5iaW5kKHRoaXMpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZWwub24oZXZlbnROYW1lLCBzZWxlY3RvciwgbWV0aG9kLmJpbmQodGhpcykpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB1bmRlbGVnYXRlRXZlbnRzKCkge1xuICAgIHRoaXMuJGVsLm9mZignLmRlbGVnYXRlRXZlbnRzJyArIHRoaXMuY2lkKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBfZW5zdXJlRWxlbWVudCgpIHtcbiAgICBpZiAoIXRoaXMuZWwpIHtcbiAgICAgIHZhciBhdHRycyA9IGFzc2lnbih7fSwgcmVzdWx0KHRoaXMsICdhdHRyaWJ1dGVzJykpXG4gICAgICBpZiAodGhpcy5pZCkgYXR0cnMuaWQgPSByZXN1bHQodGhpcywgJ2lkJylcbiAgICAgIGlmICh0aGlzLmNsYXNzTmFtZSkgYXR0cnNbJ2NsYXNzJ10gPSByZXN1bHQodGhpcywgJ2NsYXNzTmFtZScpXG4gICAgICB2YXIgJGVsID0gJCgnPCcgKyByZXN1bHQodGhpcywgJ3RhZ05hbWUnKSArICc+JykuYXR0cihhdHRycylcbiAgICAgIHRoaXMuc2V0RWxlbWVudCgkZWwsIGZhbHNlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldEVsZW1lbnQocmVzdWx0KHRoaXMsICdlbCcpLCBmYWxzZSlcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVSU9iamVjdFxuIiwiLyogWmVwdG8gdjEuMS40LTgwLWdhOTE4NGIyIC0gemVwdG8gZXZlbnQgYWpheCBjYWxsYmFja3MgZGVmZXJyZWQgdG91Y2ggc2VsZWN0b3IgaWUgLSB6ZXB0b2pzLmNvbS9saWNlbnNlICovXG52YXIgWmVwdG89ZnVuY3Rpb24oKXtmdW5jdGlvbiBEKHQpe3JldHVybiBudWxsPT10P1N0cmluZyh0KTpqW1MuY2FsbCh0KV18fFwib2JqZWN0XCJ9ZnVuY3Rpb24gTCh0KXtyZXR1cm5cImZ1bmN0aW9uXCI9PUQodCl9ZnVuY3Rpb24gayh0KXtyZXR1cm4gbnVsbCE9dCYmdD09dC53aW5kb3d9ZnVuY3Rpb24gWih0KXtyZXR1cm4gbnVsbCE9dCYmdC5ub2RlVHlwZT09dC5ET0NVTUVOVF9OT0RFfWZ1bmN0aW9uICQodCl7cmV0dXJuXCJvYmplY3RcIj09RCh0KX1mdW5jdGlvbiBGKHQpe3JldHVybiAkKHQpJiYhayh0KSYmT2JqZWN0LmdldFByb3RvdHlwZU9mKHQpPT1PYmplY3QucHJvdG90eXBlfWZ1bmN0aW9uIFIodCl7cmV0dXJuXCJudW1iZXJcIj09dHlwZW9mIHQubGVuZ3RofWZ1bmN0aW9uIHEodCl7cmV0dXJuIHMuY2FsbCh0LGZ1bmN0aW9uKHQpe3JldHVybiBudWxsIT10fSl9ZnVuY3Rpb24gVyh0KXtyZXR1cm4gdC5sZW5ndGg+MD9uLmZuLmNvbmNhdC5hcHBseShbXSx0KTp0fWZ1bmN0aW9uIHoodCl7cmV0dXJuIHQucmVwbGFjZSgvOjovZyxcIi9cIikucmVwbGFjZSgvKFtBLVpdKykoW0EtWl1bYS16XSkvZyxcIiQxXyQyXCIpLnJlcGxhY2UoLyhbYS16XFxkXSkoW0EtWl0pL2csXCIkMV8kMlwiKS5yZXBsYWNlKC9fL2csXCItXCIpLnRvTG93ZXJDYXNlKCl9ZnVuY3Rpb24gSCh0KXtyZXR1cm4gdCBpbiBjP2NbdF06Y1t0XT1uZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIrdCtcIihcXFxcc3wkKVwiKX1mdW5jdGlvbiBfKHQsZSl7cmV0dXJuXCJudW1iZXJcIiE9dHlwZW9mIGV8fGxbeih0KV0/ZTplK1wicHhcIn1mdW5jdGlvbiBJKHQpe3ZhciBlLG47cmV0dXJuIGZbdF18fChlPXUuY3JlYXRlRWxlbWVudCh0KSx1LmJvZHkuYXBwZW5kQ2hpbGQoZSksbj1nZXRDb21wdXRlZFN0eWxlKGUsXCJcIikuZ2V0UHJvcGVydHlWYWx1ZShcImRpc3BsYXlcIiksZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGUpLFwibm9uZVwiPT1uJiYobj1cImJsb2NrXCIpLGZbdF09biksZlt0XX1mdW5jdGlvbiBVKHQpe3JldHVyblwiY2hpbGRyZW5cImluIHQ/YS5jYWxsKHQuY2hpbGRyZW4pOm4ubWFwKHQuY2hpbGROb2RlcyxmdW5jdGlvbih0KXtyZXR1cm4gMT09dC5ub2RlVHlwZT90OnZvaWQgMH0pfWZ1bmN0aW9uIFgodCxlKXt2YXIgbixpPXQ/dC5sZW5ndGg6MDtmb3Iobj0wO2k+bjtuKyspdGhpc1tuXT10W25dO3RoaXMubGVuZ3RoPWksdGhpcy5zZWxlY3Rvcj1lfHxcIlwifWZ1bmN0aW9uIEIobixpLHIpe2ZvcihlIGluIGkpciYmKEYoaVtlXSl8fEEoaVtlXSkpPyhGKGlbZV0pJiYhRihuW2VdKSYmKG5bZV09e30pLEEoaVtlXSkmJiFBKG5bZV0pJiYobltlXT1bXSksQihuW2VdLGlbZV0scikpOmlbZV0hPT10JiYobltlXT1pW2VdKX1mdW5jdGlvbiBWKHQsZSl7cmV0dXJuIG51bGw9PWU/bih0KTpuKHQpLmZpbHRlcihlKX1mdW5jdGlvbiBZKHQsZSxuLGkpe3JldHVybiBMKGUpP2UuY2FsbCh0LG4saSk6ZX1mdW5jdGlvbiBKKHQsZSxuKXtudWxsPT1uP3QucmVtb3ZlQXR0cmlidXRlKGUpOnQuc2V0QXR0cmlidXRlKGUsbil9ZnVuY3Rpb24gRyhlLG4pe3ZhciBpPWUuY2xhc3NOYW1lfHxcIlwiLHI9aSYmaS5iYXNlVmFsIT09dDtyZXR1cm4gbj09PXQ/cj9pLmJhc2VWYWw6aTp2b2lkKHI/aS5iYXNlVmFsPW46ZS5jbGFzc05hbWU9bil9ZnVuY3Rpb24gSyh0KXt0cnl7cmV0dXJuIHQ/XCJ0cnVlXCI9PXR8fChcImZhbHNlXCI9PXQ/ITE6XCJudWxsXCI9PXQ/bnVsbDordCtcIlwiPT10Pyt0Oi9eW1xcW1xce10vLnRlc3QodCk/bi5wYXJzZUpTT04odCk6dCk6dH1jYXRjaChlKXtyZXR1cm4gdH19ZnVuY3Rpb24gUSh0LGUpe2UodCk7Zm9yKHZhciBuPTAsaT10LmNoaWxkTm9kZXMubGVuZ3RoO2k+bjtuKyspUSh0LmNoaWxkTm9kZXNbbl0sZSl9dmFyIHQsZSxuLGksTixQLHI9W10sbz1yLmNvbmNhdCxzPXIuZmlsdGVyLGE9ci5zbGljZSx1PXdpbmRvdy5kb2N1bWVudCxmPXt9LGM9e30sbD17XCJjb2x1bW4tY291bnRcIjoxLGNvbHVtbnM6MSxcImZvbnQtd2VpZ2h0XCI6MSxcImxpbmUtaGVpZ2h0XCI6MSxvcGFjaXR5OjEsXCJ6LWluZGV4XCI6MSx6b29tOjF9LGg9L15cXHMqPChcXHcrfCEpW14+XSo+LyxwPS9ePChcXHcrKVxccypcXC8/Pig/OjxcXC9cXDE+fCkkLyxkPS88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFtcXHc6XSspW14+XSopXFwvPi9naSxtPS9eKD86Ym9keXxodG1sKSQvaSxnPS8oW0EtWl0pL2csdj1bXCJ2YWxcIixcImNzc1wiLFwiaHRtbFwiLFwidGV4dFwiLFwiZGF0YVwiLFwid2lkdGhcIixcImhlaWdodFwiLFwib2Zmc2V0XCJdLHk9W1wiYWZ0ZXJcIixcInByZXBlbmRcIixcImJlZm9yZVwiLFwiYXBwZW5kXCJdLHc9dS5jcmVhdGVFbGVtZW50KFwidGFibGVcIikseD11LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKSxiPXt0cjp1LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKSx0Ym9keTp3LHRoZWFkOncsdGZvb3Q6dyx0ZDp4LHRoOngsXCIqXCI6dS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpfSxFPS9jb21wbGV0ZXxsb2FkZWR8aW50ZXJhY3RpdmUvLFQ9L15bXFx3LV0qJC8saj17fSxTPWoudG9TdHJpbmcsQz17fSxPPXUuY3JlYXRlRWxlbWVudChcImRpdlwiKSxNPXt0YWJpbmRleDpcInRhYkluZGV4XCIscmVhZG9ubHk6XCJyZWFkT25seVwiLFwiZm9yXCI6XCJodG1sRm9yXCIsXCJjbGFzc1wiOlwiY2xhc3NOYW1lXCIsbWF4bGVuZ3RoOlwibWF4TGVuZ3RoXCIsY2VsbHNwYWNpbmc6XCJjZWxsU3BhY2luZ1wiLGNlbGxwYWRkaW5nOlwiY2VsbFBhZGRpbmdcIixyb3dzcGFuOlwicm93U3BhblwiLGNvbHNwYW46XCJjb2xTcGFuXCIsdXNlbWFwOlwidXNlTWFwXCIsZnJhbWVib3JkZXI6XCJmcmFtZUJvcmRlclwiLGNvbnRlbnRlZGl0YWJsZTpcImNvbnRlbnRFZGl0YWJsZVwifSxBPUFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKHQpe3JldHVybiB0IGluc3RhbmNlb2YgQXJyYXl9O3JldHVybiBDLm1hdGNoZXM9ZnVuY3Rpb24odCxlKXtpZighZXx8IXR8fDEhPT10Lm5vZGVUeXBlKXJldHVybiExO3ZhciBuPXQud2Via2l0TWF0Y2hlc1NlbGVjdG9yfHx0Lm1vek1hdGNoZXNTZWxlY3Rvcnx8dC5vTWF0Y2hlc1NlbGVjdG9yfHx0Lm1hdGNoZXNTZWxlY3RvcjtpZihuKXJldHVybiBuLmNhbGwodCxlKTt2YXIgaSxyPXQucGFyZW50Tm9kZSxvPSFyO3JldHVybiBvJiYocj1PKS5hcHBlbmRDaGlsZCh0KSxpPX5DLnFzYShyLGUpLmluZGV4T2YodCksbyYmTy5yZW1vdmVDaGlsZCh0KSxpfSxOPWZ1bmN0aW9uKHQpe3JldHVybiB0LnJlcGxhY2UoLy0rKC4pPy9nLGZ1bmN0aW9uKHQsZSl7cmV0dXJuIGU/ZS50b1VwcGVyQ2FzZSgpOlwiXCJ9KX0sUD1mdW5jdGlvbih0KXtyZXR1cm4gcy5jYWxsKHQsZnVuY3Rpb24oZSxuKXtyZXR1cm4gdC5pbmRleE9mKGUpPT1ufSl9LEMuZnJhZ21lbnQ9ZnVuY3Rpb24oZSxpLHIpe3ZhciBvLHMsZjtyZXR1cm4gcC50ZXN0KGUpJiYobz1uKHUuY3JlYXRlRWxlbWVudChSZWdFeHAuJDEpKSksb3x8KGUucmVwbGFjZSYmKGU9ZS5yZXBsYWNlKGQsXCI8JDE+PC8kMj5cIikpLGk9PT10JiYoaT1oLnRlc3QoZSkmJlJlZ0V4cC4kMSksaSBpbiBifHwoaT1cIipcIiksZj1iW2ldLGYuaW5uZXJIVE1MPVwiXCIrZSxvPW4uZWFjaChhLmNhbGwoZi5jaGlsZE5vZGVzKSxmdW5jdGlvbigpe2YucmVtb3ZlQ2hpbGQodGhpcyl9KSksRihyKSYmKHM9bihvKSxuLmVhY2gocixmdW5jdGlvbih0LGUpe3YuaW5kZXhPZih0KT4tMT9zW3RdKGUpOnMuYXR0cih0LGUpfSkpLG99LEMuWj1mdW5jdGlvbih0LGUpe3JldHVybiBuZXcgWCh0LGUpfSxDLmlzWj1mdW5jdGlvbih0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIEMuWn0sQy5pbml0PWZ1bmN0aW9uKGUsaSl7dmFyIHI7aWYoIWUpcmV0dXJuIEMuWigpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKWlmKGU9ZS50cmltKCksXCI8XCI9PWVbMF0mJmgudGVzdChlKSlyPUMuZnJhZ21lbnQoZSxSZWdFeHAuJDEsaSksZT1udWxsO2Vsc2V7aWYoaSE9PXQpcmV0dXJuIG4oaSkuZmluZChlKTtyPUMucXNhKHUsZSl9ZWxzZXtpZihMKGUpKXJldHVybiBuKHUpLnJlYWR5KGUpO2lmKEMuaXNaKGUpKXJldHVybiBlO2lmKEEoZSkpcj1xKGUpO2Vsc2UgaWYoJChlKSlyPVtlXSxlPW51bGw7ZWxzZSBpZihoLnRlc3QoZSkpcj1DLmZyYWdtZW50KGUudHJpbSgpLFJlZ0V4cC4kMSxpKSxlPW51bGw7ZWxzZXtpZihpIT09dClyZXR1cm4gbihpKS5maW5kKGUpO3I9Qy5xc2EodSxlKX19cmV0dXJuIEMuWihyLGUpfSxuPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIEMuaW5pdCh0LGUpfSxuLmV4dGVuZD1mdW5jdGlvbih0KXt2YXIgZSxuPWEuY2FsbChhcmd1bWVudHMsMSk7cmV0dXJuXCJib29sZWFuXCI9PXR5cGVvZiB0JiYoZT10LHQ9bi5zaGlmdCgpKSxuLmZvckVhY2goZnVuY3Rpb24obil7Qih0LG4sZSl9KSx0fSxDLnFzYT1mdW5jdGlvbih0LGUpe3ZhciBuLGk9XCIjXCI9PWVbMF0scj0haSYmXCIuXCI9PWVbMF0sbz1pfHxyP2Uuc2xpY2UoMSk6ZSxzPVQudGVzdChvKTtyZXR1cm4gdC5nZXRFbGVtZW50QnlJZCYmcyYmaT8obj10LmdldEVsZW1lbnRCeUlkKG8pKT9bbl06W106MSE9PXQubm9kZVR5cGUmJjkhPT10Lm5vZGVUeXBlJiYxMSE9PXQubm9kZVR5cGU/W106YS5jYWxsKHMmJiFpJiZ0LmdldEVsZW1lbnRzQnlDbGFzc05hbWU/cj90LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobyk6dC5nZXRFbGVtZW50c0J5VGFnTmFtZShlKTp0LnF1ZXJ5U2VsZWN0b3JBbGwoZSkpfSxuLmNvbnRhaW5zPXUuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zP2Z1bmN0aW9uKHQsZSl7cmV0dXJuIHQhPT1lJiZ0LmNvbnRhaW5zKGUpfTpmdW5jdGlvbih0LGUpe2Zvcig7ZSYmKGU9ZS5wYXJlbnROb2RlKTspaWYoZT09PXQpcmV0dXJuITA7cmV0dXJuITF9LG4udHlwZT1ELG4uaXNGdW5jdGlvbj1MLG4uaXNXaW5kb3c9ayxuLmlzQXJyYXk9QSxuLmlzUGxhaW5PYmplY3Q9RixuLmlzRW1wdHlPYmplY3Q9ZnVuY3Rpb24odCl7dmFyIGU7Zm9yKGUgaW4gdClyZXR1cm4hMTtyZXR1cm4hMH0sbi5pbkFycmF5PWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gci5pbmRleE9mLmNhbGwoZSx0LG4pfSxuLmNhbWVsQ2FzZT1OLG4udHJpbT1mdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09dD9cIlwiOlN0cmluZy5wcm90b3R5cGUudHJpbS5jYWxsKHQpfSxuLnV1aWQ9MCxuLnN1cHBvcnQ9e30sbi5leHByPXt9LG4ubm9vcD1mdW5jdGlvbigpe30sbi5tYXA9ZnVuY3Rpb24odCxlKXt2YXIgbixyLG8saT1bXTtpZihSKHQpKWZvcihyPTA7cjx0Lmxlbmd0aDtyKyspbj1lKHRbcl0sciksbnVsbCE9biYmaS5wdXNoKG4pO2Vsc2UgZm9yKG8gaW4gdCluPWUodFtvXSxvKSxudWxsIT1uJiZpLnB1c2gobik7cmV0dXJuIFcoaSl9LG4uZWFjaD1mdW5jdGlvbih0LGUpe3ZhciBuLGk7aWYoUih0KSl7Zm9yKG49MDtuPHQubGVuZ3RoO24rKylpZihlLmNhbGwodFtuXSxuLHRbbl0pPT09ITEpcmV0dXJuIHR9ZWxzZSBmb3IoaSBpbiB0KWlmKGUuY2FsbCh0W2ldLGksdFtpXSk9PT0hMSlyZXR1cm4gdDtyZXR1cm4gdH0sbi5ncmVwPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHMuY2FsbCh0LGUpfSx3aW5kb3cuSlNPTiYmKG4ucGFyc2VKU09OPUpTT04ucGFyc2UpLG4uZWFjaChcIkJvb2xlYW4gTnVtYmVyIFN0cmluZyBGdW5jdGlvbiBBcnJheSBEYXRlIFJlZ0V4cCBPYmplY3QgRXJyb3JcIi5zcGxpdChcIiBcIiksZnVuY3Rpb24odCxlKXtqW1wiW29iamVjdCBcIitlK1wiXVwiXT1lLnRvTG93ZXJDYXNlKCl9KSxuLmZuPXtjb25zdHJ1Y3RvcjpDLlosbGVuZ3RoOjAsZm9yRWFjaDpyLmZvckVhY2gscmVkdWNlOnIucmVkdWNlLHB1c2g6ci5wdXNoLHNvcnQ6ci5zb3J0LHNwbGljZTpyLnNwbGljZSxpbmRleE9mOnIuaW5kZXhPZixjb25jYXQ6ZnVuY3Rpb24oKXt2YXIgdCxlLG49W107Zm9yKHQ9MDt0PGFyZ3VtZW50cy5sZW5ndGg7dCsrKWU9YXJndW1lbnRzW3RdLG5bdF09Qy5pc1ooZSk/ZS50b0FycmF5KCk6ZTtyZXR1cm4gby5hcHBseShDLmlzWih0aGlzKT90aGlzLnRvQXJyYXkoKTp0aGlzLG4pfSxtYXA6ZnVuY3Rpb24odCl7cmV0dXJuIG4obi5tYXAodGhpcyxmdW5jdGlvbihlLG4pe3JldHVybiB0LmNhbGwoZSxuLGUpfSkpfSxzbGljZTpmdW5jdGlvbigpe3JldHVybiBuKGEuYXBwbHkodGhpcyxhcmd1bWVudHMpKX0scmVhZHk6ZnVuY3Rpb24odCl7cmV0dXJuIEUudGVzdCh1LnJlYWR5U3RhdGUpJiZ1LmJvZHk/dChuKTp1LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsZnVuY3Rpb24oKXt0KG4pfSwhMSksdGhpc30sZ2V0OmZ1bmN0aW9uKGUpe3JldHVybiBlPT09dD9hLmNhbGwodGhpcyk6dGhpc1tlPj0wP2U6ZSt0aGlzLmxlbmd0aF19LHRvQXJyYXk6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5nZXQoKX0sc2l6ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmxlbmd0aH0scmVtb3ZlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe251bGwhPXRoaXMucGFyZW50Tm9kZSYmdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpfSl9LGVhY2g6ZnVuY3Rpb24odCl7cmV0dXJuIHIuZXZlcnkuY2FsbCh0aGlzLGZ1bmN0aW9uKGUsbil7cmV0dXJuIHQuY2FsbChlLG4sZSkhPT0hMX0pLHRoaXN9LGZpbHRlcjpmdW5jdGlvbih0KXtyZXR1cm4gTCh0KT90aGlzLm5vdCh0aGlzLm5vdCh0KSk6bihzLmNhbGwodGhpcyxmdW5jdGlvbihlKXtyZXR1cm4gQy5tYXRjaGVzKGUsdCl9KSl9LGFkZDpmdW5jdGlvbih0LGUpe3JldHVybiBuKFAodGhpcy5jb25jYXQobih0LGUpKSkpfSxpczpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5sZW5ndGg+MCYmQy5tYXRjaGVzKHRoaXNbMF0sdCl9LG5vdDpmdW5jdGlvbihlKXt2YXIgaT1bXTtpZihMKGUpJiZlLmNhbGwhPT10KXRoaXMuZWFjaChmdW5jdGlvbih0KXtlLmNhbGwodGhpcyx0KXx8aS5wdXNoKHRoaXMpfSk7ZWxzZXt2YXIgcj1cInN0cmluZ1wiPT10eXBlb2YgZT90aGlzLmZpbHRlcihlKTpSKGUpJiZMKGUuaXRlbSk/YS5jYWxsKGUpOm4oZSk7dGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHQpe3IuaW5kZXhPZih0KTwwJiZpLnB1c2godCl9KX1yZXR1cm4gbihpKX0saGFzOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbigpe3JldHVybiAkKHQpP24uY29udGFpbnModGhpcyx0KTpuKHRoaXMpLmZpbmQodCkuc2l6ZSgpfSl9LGVxOmZ1bmN0aW9uKHQpe3JldHVybi0xPT09dD90aGlzLnNsaWNlKHQpOnRoaXMuc2xpY2UodCwrdCsxKX0sZmlyc3Q6ZnVuY3Rpb24oKXt2YXIgdD10aGlzWzBdO3JldHVybiB0JiYhJCh0KT90Om4odCl9LGxhc3Q6ZnVuY3Rpb24oKXt2YXIgdD10aGlzW3RoaXMubGVuZ3RoLTFdO3JldHVybiB0JiYhJCh0KT90Om4odCl9LGZpbmQ6ZnVuY3Rpb24odCl7dmFyIGUsaT10aGlzO3JldHVybiBlPXQ/XCJvYmplY3RcIj09dHlwZW9mIHQ/bih0KS5maWx0ZXIoZnVuY3Rpb24oKXt2YXIgdD10aGlzO3JldHVybiByLnNvbWUuY2FsbChpLGZ1bmN0aW9uKGUpe3JldHVybiBuLmNvbnRhaW5zKGUsdCl9KX0pOjE9PXRoaXMubGVuZ3RoP24oQy5xc2EodGhpc1swXSx0KSk6dGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gQy5xc2EodGhpcyx0KX0pOm4oKX0sY2xvc2VzdDpmdW5jdGlvbih0LGUpe3ZhciBpPXRoaXNbMF0scj0hMTtmb3IoXCJvYmplY3RcIj09dHlwZW9mIHQmJihyPW4odCkpO2kmJiEocj9yLmluZGV4T2YoaSk+PTA6Qy5tYXRjaGVzKGksdCkpOylpPWkhPT1lJiYhWihpKSYmaS5wYXJlbnROb2RlO3JldHVybiBuKGkpfSxwYXJlbnRzOmZ1bmN0aW9uKHQpe2Zvcih2YXIgZT1bXSxpPXRoaXM7aS5sZW5ndGg+MDspaT1uLm1hcChpLGZ1bmN0aW9uKHQpe3JldHVybih0PXQucGFyZW50Tm9kZSkmJiFaKHQpJiZlLmluZGV4T2YodCk8MD8oZS5wdXNoKHQpLHQpOnZvaWQgMH0pO3JldHVybiBWKGUsdCl9LHBhcmVudDpmdW5jdGlvbih0KXtyZXR1cm4gVihQKHRoaXMucGx1Y2soXCJwYXJlbnROb2RlXCIpKSx0KX0sY2hpbGRyZW46ZnVuY3Rpb24odCl7cmV0dXJuIFYodGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gVSh0aGlzKX0pLHQpfSxjb250ZW50czpmdW5jdGlvbigpe3JldHVybiB0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiB0aGlzLmNvbnRlbnREb2N1bWVudHx8YS5jYWxsKHRoaXMuY2hpbGROb2Rlcyl9KX0sc2libGluZ3M6ZnVuY3Rpb24odCl7cmV0dXJuIFYodGhpcy5tYXAoZnVuY3Rpb24odCxlKXtyZXR1cm4gcy5jYWxsKFUoZS5wYXJlbnROb2RlKSxmdW5jdGlvbih0KXtyZXR1cm4gdCE9PWV9KX0pLHQpfSxlbXB0eTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt0aGlzLmlubmVySFRNTD1cIlwifSl9LHBsdWNrOmZ1bmN0aW9uKHQpe3JldHVybiBuLm1hcCh0aGlzLGZ1bmN0aW9uKGUpe3JldHVybiBlW3RdfSl9LHNob3c6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XCJub25lXCI9PXRoaXMuc3R5bGUuZGlzcGxheSYmKHRoaXMuc3R5bGUuZGlzcGxheT1cIlwiKSxcIm5vbmVcIj09Z2V0Q29tcHV0ZWRTdHlsZSh0aGlzLFwiXCIpLmdldFByb3BlcnR5VmFsdWUoXCJkaXNwbGF5XCIpJiYodGhpcy5zdHlsZS5kaXNwbGF5PUkodGhpcy5ub2RlTmFtZSkpfSl9LHJlcGxhY2VXaXRoOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmJlZm9yZSh0KS5yZW1vdmUoKX0sd3JhcDpmdW5jdGlvbih0KXt2YXIgZT1MKHQpO2lmKHRoaXNbMF0mJiFlKXZhciBpPW4odCkuZ2V0KDApLHI9aS5wYXJlbnROb2RlfHx0aGlzLmxlbmd0aD4xO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24obyl7bih0aGlzKS53cmFwQWxsKGU/dC5jYWxsKHRoaXMsbyk6cj9pLmNsb25lTm9kZSghMCk6aSl9KX0sd3JhcEFsbDpmdW5jdGlvbih0KXtpZih0aGlzWzBdKXtuKHRoaXNbMF0pLmJlZm9yZSh0PW4odCkpO2Zvcih2YXIgZTsoZT10LmNoaWxkcmVuKCkpLmxlbmd0aDspdD1lLmZpcnN0KCk7bih0KS5hcHBlbmQodGhpcyl9cmV0dXJuIHRoaXN9LHdyYXBJbm5lcjpmdW5jdGlvbih0KXt2YXIgZT1MKHQpO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaSl7dmFyIHI9bih0aGlzKSxvPXIuY29udGVudHMoKSxzPWU/dC5jYWxsKHRoaXMsaSk6dDtvLmxlbmd0aD9vLndyYXBBbGwocyk6ci5hcHBlbmQocyl9KX0sdW53cmFwOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucGFyZW50KCkuZWFjaChmdW5jdGlvbigpe24odGhpcykucmVwbGFjZVdpdGgobih0aGlzKS5jaGlsZHJlbigpKX0pLHRoaXN9LGNsb25lOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2xvbmVOb2RlKCEwKX0pfSxoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKX0sdG9nZ2xlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgaT1uKHRoaXMpOyhlPT09dD9cIm5vbmVcIj09aS5jc3MoXCJkaXNwbGF5XCIpOmUpP2kuc2hvdygpOmkuaGlkZSgpfSl9LHByZXY6ZnVuY3Rpb24odCl7cmV0dXJuIG4odGhpcy5wbHVjayhcInByZXZpb3VzRWxlbWVudFNpYmxpbmdcIikpLmZpbHRlcih0fHxcIipcIil9LG5leHQ6ZnVuY3Rpb24odCl7cmV0dXJuIG4odGhpcy5wbHVjayhcIm5leHRFbGVtZW50U2libGluZ1wiKSkuZmlsdGVyKHR8fFwiKlwiKX0saHRtbDpmdW5jdGlvbih0KXtyZXR1cm4gMCBpbiBhcmd1bWVudHM/dGhpcy5lYWNoKGZ1bmN0aW9uKGUpe3ZhciBpPXRoaXMuaW5uZXJIVE1MO24odGhpcykuZW1wdHkoKS5hcHBlbmQoWSh0aGlzLHQsZSxpKSl9KTowIGluIHRoaXM/dGhpc1swXS5pbm5lckhUTUw6bnVsbH0sdGV4dDpmdW5jdGlvbih0KXtyZXR1cm4gMCBpbiBhcmd1bWVudHM/dGhpcy5lYWNoKGZ1bmN0aW9uKGUpe3ZhciBuPVkodGhpcyx0LGUsdGhpcy50ZXh0Q29udGVudCk7dGhpcy50ZXh0Q29udGVudD1udWxsPT1uP1wiXCI6XCJcIitufSk6MCBpbiB0aGlzP3RoaXNbMF0udGV4dENvbnRlbnQ6bnVsbH0sYXR0cjpmdW5jdGlvbihuLGkpe3ZhciByO3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBufHwxIGluIGFyZ3VtZW50cz90aGlzLmVhY2goZnVuY3Rpb24odCl7aWYoMT09PXRoaXMubm9kZVR5cGUpaWYoJChuKSlmb3IoZSBpbiBuKUoodGhpcyxlLG5bZV0pO2Vsc2UgSih0aGlzLG4sWSh0aGlzLGksdCx0aGlzLmdldEF0dHJpYnV0ZShuKSkpfSk6dGhpcy5sZW5ndGgmJjE9PT10aGlzWzBdLm5vZGVUeXBlPyEocj10aGlzWzBdLmdldEF0dHJpYnV0ZShuKSkmJm4gaW4gdGhpc1swXT90aGlzWzBdW25dOnI6dH0scmVtb3ZlQXR0cjpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7MT09PXRoaXMubm9kZVR5cGUmJnQuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24odCl7Sih0aGlzLHQpfSx0aGlzKX0pfSxwcm9wOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQ9TVt0XXx8dCwxIGluIGFyZ3VtZW50cz90aGlzLmVhY2goZnVuY3Rpb24obil7dGhpc1t0XT1ZKHRoaXMsZSxuLHRoaXNbdF0pfSk6dGhpc1swXSYmdGhpc1swXVt0XX0sZGF0YTpmdW5jdGlvbihlLG4pe3ZhciBpPVwiZGF0YS1cIitlLnJlcGxhY2UoZyxcIi0kMVwiKS50b0xvd2VyQ2FzZSgpLHI9MSBpbiBhcmd1bWVudHM/dGhpcy5hdHRyKGksbik6dGhpcy5hdHRyKGkpO3JldHVybiBudWxsIT09cj9LKHIpOnR9LHZhbDpmdW5jdGlvbih0KXtyZXR1cm4gMCBpbiBhcmd1bWVudHM/dGhpcy5lYWNoKGZ1bmN0aW9uKGUpe3RoaXMudmFsdWU9WSh0aGlzLHQsZSx0aGlzLnZhbHVlKX0pOnRoaXNbMF0mJih0aGlzWzBdLm11bHRpcGxlP24odGhpc1swXSkuZmluZChcIm9wdGlvblwiKS5maWx0ZXIoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zZWxlY3RlZH0pLnBsdWNrKFwidmFsdWVcIik6dGhpc1swXS52YWx1ZSl9LG9mZnNldDpmdW5jdGlvbih0KXtpZih0KXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oZSl7dmFyIGk9bih0aGlzKSxyPVkodGhpcyx0LGUsaS5vZmZzZXQoKSksbz1pLm9mZnNldFBhcmVudCgpLm9mZnNldCgpLHM9e3RvcDpyLnRvcC1vLnRvcCxsZWZ0OnIubGVmdC1vLmxlZnR9O1wic3RhdGljXCI9PWkuY3NzKFwicG9zaXRpb25cIikmJihzLnBvc2l0aW9uPVwicmVsYXRpdmVcIiksaS5jc3Mocyl9KTtpZighdGhpcy5sZW5ndGgpcmV0dXJuIG51bGw7aWYoIW4uY29udGFpbnModS5kb2N1bWVudEVsZW1lbnQsdGhpc1swXSkpcmV0dXJue3RvcDowLGxlZnQ6MH07dmFyIGU9dGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtyZXR1cm57bGVmdDplLmxlZnQrd2luZG93LnBhZ2VYT2Zmc2V0LHRvcDplLnRvcCt3aW5kb3cucGFnZVlPZmZzZXQsd2lkdGg6TWF0aC5yb3VuZChlLndpZHRoKSxoZWlnaHQ6TWF0aC5yb3VuZChlLmhlaWdodCl9fSxjc3M6ZnVuY3Rpb24odCxpKXtpZihhcmd1bWVudHMubGVuZ3RoPDIpe3ZhciByLG89dGhpc1swXTtpZighbylyZXR1cm47aWYocj1nZXRDb21wdXRlZFN0eWxlKG8sXCJcIiksXCJzdHJpbmdcIj09dHlwZW9mIHQpcmV0dXJuIG8uc3R5bGVbTih0KV18fHIuZ2V0UHJvcGVydHlWYWx1ZSh0KTtpZihBKHQpKXt2YXIgcz17fTtyZXR1cm4gbi5lYWNoKHQsZnVuY3Rpb24odCxlKXtzW2VdPW8uc3R5bGVbTihlKV18fHIuZ2V0UHJvcGVydHlWYWx1ZShlKX0pLHN9fXZhciBhPVwiXCI7aWYoXCJzdHJpbmdcIj09RCh0KSlpfHwwPT09aT9hPXoodCkrXCI6XCIrXyh0LGkpOnRoaXMuZWFjaChmdW5jdGlvbigpe3RoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkoeih0KSl9KTtlbHNlIGZvcihlIGluIHQpdFtlXXx8MD09PXRbZV0/YSs9eihlKStcIjpcIitfKGUsdFtlXSkrXCI7XCI6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7dGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eSh6KGUpKX0pO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt0aGlzLnN0eWxlLmNzc1RleHQrPVwiO1wiK2F9KX0saW5kZXg6ZnVuY3Rpb24odCl7cmV0dXJuIHQ/dGhpcy5pbmRleE9mKG4odClbMF0pOnRoaXMucGFyZW50KCkuY2hpbGRyZW4oKS5pbmRleE9mKHRoaXNbMF0pfSxoYXNDbGFzczpmdW5jdGlvbih0KXtyZXR1cm4gdD9yLnNvbWUuY2FsbCh0aGlzLGZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnRlc3QoRyh0KSl9LEgodCkpOiExfSxhZGRDbGFzczpmdW5jdGlvbih0KXtyZXR1cm4gdD90aGlzLmVhY2goZnVuY3Rpb24oZSl7aWYoXCJjbGFzc05hbWVcImluIHRoaXMpe2k9W107dmFyIHI9Ryh0aGlzKSxvPVkodGhpcyx0LGUscik7by5zcGxpdCgvXFxzKy9nKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe24odGhpcykuaGFzQ2xhc3ModCl8fGkucHVzaCh0KX0sdGhpcyksaS5sZW5ndGgmJkcodGhpcyxyKyhyP1wiIFwiOlwiXCIpK2kuam9pbihcIiBcIikpfX0pOnRoaXN9LHJlbW92ZUNsYXNzOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24obil7aWYoXCJjbGFzc05hbWVcImluIHRoaXMpe2lmKGU9PT10KXJldHVybiBHKHRoaXMsXCJcIik7aT1HKHRoaXMpLFkodGhpcyxlLG4saSkuc3BsaXQoL1xccysvZykuZm9yRWFjaChmdW5jdGlvbih0KXtpPWkucmVwbGFjZShIKHQpLFwiIFwiKX0pLEcodGhpcyxpLnRyaW0oKSl9fSl9LHRvZ2dsZUNsYXNzOmZ1bmN0aW9uKGUsaSl7cmV0dXJuIGU/dGhpcy5lYWNoKGZ1bmN0aW9uKHIpe3ZhciBvPW4odGhpcykscz1ZKHRoaXMsZSxyLEcodGhpcykpO3Muc3BsaXQoL1xccysvZykuZm9yRWFjaChmdW5jdGlvbihlKXsoaT09PXQ/IW8uaGFzQ2xhc3MoZSk6aSk/by5hZGRDbGFzcyhlKTpvLnJlbW92ZUNsYXNzKGUpfSl9KTp0aGlzfSxzY3JvbGxUb3A6ZnVuY3Rpb24oZSl7aWYodGhpcy5sZW5ndGgpe3ZhciBuPVwic2Nyb2xsVG9wXCJpbiB0aGlzWzBdO3JldHVybiBlPT09dD9uP3RoaXNbMF0uc2Nyb2xsVG9wOnRoaXNbMF0ucGFnZVlPZmZzZXQ6dGhpcy5lYWNoKG4/ZnVuY3Rpb24oKXt0aGlzLnNjcm9sbFRvcD1lfTpmdW5jdGlvbigpe3RoaXMuc2Nyb2xsVG8odGhpcy5zY3JvbGxYLGUpfSl9fSxzY3JvbGxMZWZ0OmZ1bmN0aW9uKGUpe2lmKHRoaXMubGVuZ3RoKXt2YXIgbj1cInNjcm9sbExlZnRcImluIHRoaXNbMF07cmV0dXJuIGU9PT10P24/dGhpc1swXS5zY3JvbGxMZWZ0OnRoaXNbMF0ucGFnZVhPZmZzZXQ6dGhpcy5lYWNoKG4/ZnVuY3Rpb24oKXt0aGlzLnNjcm9sbExlZnQ9ZX06ZnVuY3Rpb24oKXt0aGlzLnNjcm9sbFRvKGUsdGhpcy5zY3JvbGxZKX0pfX0scG9zaXRpb246ZnVuY3Rpb24oKXtpZih0aGlzLmxlbmd0aCl7dmFyIHQ9dGhpc1swXSxlPXRoaXMub2Zmc2V0UGFyZW50KCksaT10aGlzLm9mZnNldCgpLHI9bS50ZXN0KGVbMF0ubm9kZU5hbWUpP3t0b3A6MCxsZWZ0OjB9OmUub2Zmc2V0KCk7cmV0dXJuIGkudG9wLT1wYXJzZUZsb2F0KG4odCkuY3NzKFwibWFyZ2luLXRvcFwiKSl8fDAsaS5sZWZ0LT1wYXJzZUZsb2F0KG4odCkuY3NzKFwibWFyZ2luLWxlZnRcIikpfHwwLHIudG9wKz1wYXJzZUZsb2F0KG4oZVswXSkuY3NzKFwiYm9yZGVyLXRvcC13aWR0aFwiKSl8fDAsci5sZWZ0Kz1wYXJzZUZsb2F0KG4oZVswXSkuY3NzKFwiYm9yZGVyLWxlZnQtd2lkdGhcIikpfHwwLHt0b3A6aS50b3Atci50b3AsbGVmdDppLmxlZnQtci5sZWZ0fX19LG9mZnNldFBhcmVudDpmdW5jdGlvbigpe3JldHVybiB0aGlzLm1hcChmdW5jdGlvbigpe2Zvcih2YXIgdD10aGlzLm9mZnNldFBhcmVudHx8dS5ib2R5O3QmJiFtLnRlc3QodC5ub2RlTmFtZSkmJlwic3RhdGljXCI9PW4odCkuY3NzKFwicG9zaXRpb25cIik7KXQ9dC5vZmZzZXRQYXJlbnQ7cmV0dXJuIHR9KX19LG4uZm4uZGV0YWNoPW4uZm4ucmVtb3ZlLFtcIndpZHRoXCIsXCJoZWlnaHRcIl0uZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgaT1lLnJlcGxhY2UoLy4vLGZ1bmN0aW9uKHQpe3JldHVybiB0WzBdLnRvVXBwZXJDYXNlKCl9KTtuLmZuW2VdPWZ1bmN0aW9uKHIpe3ZhciBvLHM9dGhpc1swXTtyZXR1cm4gcj09PXQ/ayhzKT9zW1wiaW5uZXJcIitpXTpaKHMpP3MuZG9jdW1lbnRFbGVtZW50W1wic2Nyb2xsXCIraV06KG89dGhpcy5vZmZzZXQoKSkmJm9bZV06dGhpcy5lYWNoKGZ1bmN0aW9uKHQpe3M9bih0aGlzKSxzLmNzcyhlLFkodGhpcyxyLHQsc1tlXSgpKSl9KX19KSx5LmZvckVhY2goZnVuY3Rpb24odCxlKXt2YXIgaT1lJTI7bi5mblt0XT1mdW5jdGlvbigpe3ZhciB0LG8scj1uLm1hcChhcmd1bWVudHMsZnVuY3Rpb24oZSl7cmV0dXJuIHQ9RChlKSxcIm9iamVjdFwiPT10fHxcImFycmF5XCI9PXR8fG51bGw9PWU/ZTpDLmZyYWdtZW50KGUpfSkscz10aGlzLmxlbmd0aD4xO3JldHVybiByLmxlbmd0aDwxP3RoaXM6dGhpcy5lYWNoKGZ1bmN0aW9uKHQsYSl7bz1pP2E6YS5wYXJlbnROb2RlLGE9MD09ZT9hLm5leHRTaWJsaW5nOjE9PWU/YS5maXJzdENoaWxkOjI9PWU/YTpudWxsO3ZhciBmPW4uY29udGFpbnModS5kb2N1bWVudEVsZW1lbnQsbyk7ci5mb3JFYWNoKGZ1bmN0aW9uKHQpe2lmKHMpdD10LmNsb25lTm9kZSghMCk7ZWxzZSBpZighbylyZXR1cm4gbih0KS5yZW1vdmUoKTtvLmluc2VydEJlZm9yZSh0LGEpLGYmJlEodCxmdW5jdGlvbih0KXtudWxsPT10Lm5vZGVOYW1lfHxcIlNDUklQVFwiIT09dC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpfHx0LnR5cGUmJlwidGV4dC9qYXZhc2NyaXB0XCIhPT10LnR5cGV8fHQuc3JjfHx3aW5kb3cuZXZhbC5jYWxsKHdpbmRvdyx0LmlubmVySFRNTCl9KX0pfSl9LG4uZm5baT90K1wiVG9cIjpcImluc2VydFwiKyhlP1wiQmVmb3JlXCI6XCJBZnRlclwiKV09ZnVuY3Rpb24oZSl7cmV0dXJuIG4oZSlbdF0odGhpcyksdGhpc319KSxDLloucHJvdG90eXBlPVgucHJvdG90eXBlPW4uZm4sQy51bmlxPVAsQy5kZXNlcmlhbGl6ZVZhbHVlPUssbi56ZXB0bz1DLG59KCk7d2luZG93LlplcHRvPVplcHRvLHZvaWQgMD09PXdpbmRvdy4kJiYod2luZG93LiQ9WmVwdG8pLGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGwodCl7cmV0dXJuIHQuX3ppZHx8KHQuX3ppZD1lKyspfWZ1bmN0aW9uIGgodCxlLG4saSl7aWYoZT1wKGUpLGUubnMpdmFyIHI9ZChlLm5zKTtyZXR1cm4oc1tsKHQpXXx8W10pLmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4hKCF0fHxlLmUmJnQuZSE9ZS5lfHxlLm5zJiYhci50ZXN0KHQubnMpfHxuJiZsKHQuZm4pIT09bChuKXx8aSYmdC5zZWwhPWkpfSl9ZnVuY3Rpb24gcCh0KXt2YXIgZT0oXCJcIit0KS5zcGxpdChcIi5cIik7cmV0dXJue2U6ZVswXSxuczplLnNsaWNlKDEpLnNvcnQoKS5qb2luKFwiIFwiKX19ZnVuY3Rpb24gZCh0KXtyZXR1cm4gbmV3IFJlZ0V4cChcIig/Ol58IClcIit0LnJlcGxhY2UoXCIgXCIsXCIgLiogP1wiKStcIig/OiB8JClcIil9ZnVuY3Rpb24gbSh0LGUpe3JldHVybiB0LmRlbCYmIXUmJnQuZSBpbiBmfHwhIWV9ZnVuY3Rpb24gZyh0KXtyZXR1cm4gY1t0XXx8dSYmZlt0XXx8dH1mdW5jdGlvbiB2KGUsaSxyLG8sYSx1LGYpe3ZhciBoPWwoZSksZD1zW2hdfHwoc1toXT1bXSk7aS5zcGxpdCgvXFxzLykuZm9yRWFjaChmdW5jdGlvbihpKXtpZihcInJlYWR5XCI9PWkpcmV0dXJuIHQoZG9jdW1lbnQpLnJlYWR5KHIpO3ZhciBzPXAoaSk7cy5mbj1yLHMuc2VsPWEscy5lIGluIGMmJihyPWZ1bmN0aW9uKGUpe3ZhciBuPWUucmVsYXRlZFRhcmdldDtyZXR1cm4hbnx8biE9PXRoaXMmJiF0LmNvbnRhaW5zKHRoaXMsbik/cy5mbi5hcHBseSh0aGlzLGFyZ3VtZW50cyk6dm9pZCAwfSkscy5kZWw9dTt2YXIgbD11fHxyO3MucHJveHk9ZnVuY3Rpb24odCl7aWYodD1UKHQpLCF0LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkpe3QuZGF0YT1vO3ZhciBpPWwuYXBwbHkoZSx0Ll9hcmdzPT1uP1t0XTpbdF0uY29uY2F0KHQuX2FyZ3MpKTtyZXR1cm4gaT09PSExJiYodC5wcmV2ZW50RGVmYXVsdCgpLHQuc3RvcFByb3BhZ2F0aW9uKCkpLGl9fSxzLmk9ZC5sZW5ndGgsZC5wdXNoKHMpLFwiYWRkRXZlbnRMaXN0ZW5lclwiaW4gZSYmZS5hZGRFdmVudExpc3RlbmVyKGcocy5lKSxzLnByb3h5LG0ocyxmKSl9KX1mdW5jdGlvbiB5KHQsZSxuLGkscil7dmFyIG89bCh0KTsoZXx8XCJcIikuc3BsaXQoL1xccy8pLmZvckVhY2goZnVuY3Rpb24oZSl7aCh0LGUsbixpKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2RlbGV0ZSBzW29dW2UuaV0sXCJyZW1vdmVFdmVudExpc3RlbmVyXCJpbiB0JiZ0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZyhlLmUpLGUucHJveHksbShlLHIpKX0pfSl9ZnVuY3Rpb24gVChlLGkpe3JldHVybihpfHwhZS5pc0RlZmF1bHRQcmV2ZW50ZWQpJiYoaXx8KGk9ZSksdC5lYWNoKEUsZnVuY3Rpb24odCxuKXt2YXIgcj1pW3RdO2VbdF09ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1tuXT13LHImJnIuYXBwbHkoaSxhcmd1bWVudHMpfSxlW25dPXh9KSwoaS5kZWZhdWx0UHJldmVudGVkIT09bj9pLmRlZmF1bHRQcmV2ZW50ZWQ6XCJyZXR1cm5WYWx1ZVwiaW4gaT9pLnJldHVyblZhbHVlPT09ITE6aS5nZXRQcmV2ZW50RGVmYXVsdCYmaS5nZXRQcmV2ZW50RGVmYXVsdCgpKSYmKGUuaXNEZWZhdWx0UHJldmVudGVkPXcpKSxlfWZ1bmN0aW9uIGoodCl7dmFyIGUsaT17b3JpZ2luYWxFdmVudDp0fTtmb3IoZSBpbiB0KWIudGVzdChlKXx8dFtlXT09PW58fChpW2VdPXRbZV0pO3JldHVybiBUKGksdCl9dmFyIG4sZT0xLGk9QXJyYXkucHJvdG90eXBlLnNsaWNlLHI9dC5pc0Z1bmN0aW9uLG89ZnVuY3Rpb24odCl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHR9LHM9e30sYT17fSx1PVwib25mb2N1c2luXCJpbiB3aW5kb3csZj17Zm9jdXM6XCJmb2N1c2luXCIsYmx1cjpcImZvY3Vzb3V0XCJ9LGM9e21vdXNlZW50ZXI6XCJtb3VzZW92ZXJcIixtb3VzZWxlYXZlOlwibW91c2VvdXRcIn07YS5jbGljaz1hLm1vdXNlZG93bj1hLm1vdXNldXA9YS5tb3VzZW1vdmU9XCJNb3VzZUV2ZW50c1wiLHQuZXZlbnQ9e2FkZDp2LHJlbW92ZTp5fSx0LnByb3h5PWZ1bmN0aW9uKGUsbil7dmFyIHM9MiBpbiBhcmd1bWVudHMmJmkuY2FsbChhcmd1bWVudHMsMik7aWYocihlKSl7dmFyIGE9ZnVuY3Rpb24oKXtyZXR1cm4gZS5hcHBseShuLHM/cy5jb25jYXQoaS5jYWxsKGFyZ3VtZW50cykpOmFyZ3VtZW50cyl9O3JldHVybiBhLl96aWQ9bChlKSxhfWlmKG8obikpcmV0dXJuIHM/KHMudW5zaGlmdChlW25dLGUpLHQucHJveHkuYXBwbHkobnVsbCxzKSk6dC5wcm94eShlW25dLGUpO3Rocm93IG5ldyBUeXBlRXJyb3IoXCJleHBlY3RlZCBmdW5jdGlvblwiKX0sdC5mbi5iaW5kPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdGhpcy5vbih0LGUsbil9LHQuZm4udW5iaW5kPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMub2ZmKHQsZSl9LHQuZm4ub25lPWZ1bmN0aW9uKHQsZSxuLGkpe3JldHVybiB0aGlzLm9uKHQsZSxuLGksMSl9O3ZhciB3PWZ1bmN0aW9uKCl7cmV0dXJuITB9LHg9ZnVuY3Rpb24oKXtyZXR1cm4hMX0sYj0vXihbQS1aXXxyZXR1cm5WYWx1ZSR8bGF5ZXJbWFldJCkvLEU9e3ByZXZlbnREZWZhdWx0OlwiaXNEZWZhdWx0UHJldmVudGVkXCIsc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOlwiaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWRcIixzdG9wUHJvcGFnYXRpb246XCJpc1Byb3BhZ2F0aW9uU3RvcHBlZFwifTt0LmZuLmRlbGVnYXRlPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdGhpcy5vbihlLHQsbil9LHQuZm4udW5kZWxlZ2F0ZT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHRoaXMub2ZmKGUsdCxuKX0sdC5mbi5saXZlPWZ1bmN0aW9uKGUsbil7cmV0dXJuIHQoZG9jdW1lbnQuYm9keSkuZGVsZWdhdGUodGhpcy5zZWxlY3RvcixlLG4pLHRoaXN9LHQuZm4uZGllPWZ1bmN0aW9uKGUsbil7cmV0dXJuIHQoZG9jdW1lbnQuYm9keSkudW5kZWxlZ2F0ZSh0aGlzLnNlbGVjdG9yLGUsbiksdGhpc30sdC5mbi5vbj1mdW5jdGlvbihlLHMsYSx1LGYpe3ZhciBjLGwsaD10aGlzO3JldHVybiBlJiYhbyhlKT8odC5lYWNoKGUsZnVuY3Rpb24odCxlKXtoLm9uKHQscyxhLGUsZil9KSxoKToobyhzKXx8cih1KXx8dT09PSExfHwodT1hLGE9cyxzPW4pLCh1PT09bnx8YT09PSExKSYmKHU9YSxhPW4pLHU9PT0hMSYmKHU9eCksaC5lYWNoKGZ1bmN0aW9uKG4scil7ZiYmKGM9ZnVuY3Rpb24odCl7cmV0dXJuIHkocix0LnR5cGUsdSksdS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KSxzJiYobD1mdW5jdGlvbihlKXt2YXIgbixvPXQoZS50YXJnZXQpLmNsb3Nlc3QocyxyKS5nZXQoMCk7cmV0dXJuIG8mJm8hPT1yPyhuPXQuZXh0ZW5kKGooZSkse2N1cnJlbnRUYXJnZXQ6byxsaXZlRmlyZWQ6cn0pLChjfHx1KS5hcHBseShvLFtuXS5jb25jYXQoaS5jYWxsKGFyZ3VtZW50cywxKSkpKTp2b2lkIDB9KSx2KHIsZSx1LGEscyxsfHxjKX0pKX0sdC5mbi5vZmY9ZnVuY3Rpb24oZSxpLHMpe3ZhciBhPXRoaXM7cmV0dXJuIGUmJiFvKGUpPyh0LmVhY2goZSxmdW5jdGlvbih0LGUpe2Eub2ZmKHQsaSxlKX0pLGEpOihvKGkpfHxyKHMpfHxzPT09ITF8fChzPWksaT1uKSxzPT09ITEmJihzPXgpLGEuZWFjaChmdW5jdGlvbigpe3kodGhpcyxlLHMsaSl9KSl9LHQuZm4udHJpZ2dlcj1mdW5jdGlvbihlLG4pe3JldHVybiBlPW8oZSl8fHQuaXNQbGFpbk9iamVjdChlKT90LkV2ZW50KGUpOlQoZSksZS5fYXJncz1uLHRoaXMuZWFjaChmdW5jdGlvbigpe2UudHlwZSBpbiBmJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzW2UudHlwZV0/dGhpc1tlLnR5cGVdKCk6XCJkaXNwYXRjaEV2ZW50XCJpbiB0aGlzP3RoaXMuZGlzcGF0Y2hFdmVudChlKTp0KHRoaXMpLnRyaWdnZXJIYW5kbGVyKGUsbil9KX0sdC5mbi50cmlnZ2VySGFuZGxlcj1mdW5jdGlvbihlLG4pe3ZhciBpLHI7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihzLGEpe2k9aihvKGUpP3QuRXZlbnQoZSk6ZSksaS5fYXJncz1uLGkudGFyZ2V0PWEsdC5lYWNoKGgoYSxlLnR5cGV8fGUpLGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHI9ZS5wcm94eShpKSxpLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCk/ITE6dm9pZCAwfSl9KSxyfSxcImZvY3VzaW4gZm9jdXNvdXQgZm9jdXMgYmx1ciBsb2FkIHJlc2l6ZSBzY3JvbGwgdW5sb2FkIGNsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlIGNoYW5nZSBzZWxlY3Qga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBlcnJvclwiLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3QuZm5bZV09ZnVuY3Rpb24odCl7cmV0dXJuIDAgaW4gYXJndW1lbnRzP3RoaXMuYmluZChlLHQpOnRoaXMudHJpZ2dlcihlKX19KSx0LkV2ZW50PWZ1bmN0aW9uKHQsZSl7byh0KXx8KGU9dCx0PWUudHlwZSk7dmFyIG49ZG9jdW1lbnQuY3JlYXRlRXZlbnQoYVt0XXx8XCJFdmVudHNcIiksaT0hMDtpZihlKWZvcih2YXIgciBpbiBlKVwiYnViYmxlc1wiPT1yP2k9ISFlW3JdOm5bcl09ZVtyXTtyZXR1cm4gbi5pbml0RXZlbnQodCxpLCEwKSxUKG4pfX0oWmVwdG8pLGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGgoZSxuLGkpe3ZhciByPXQuRXZlbnQobik7cmV0dXJuIHQoZSkudHJpZ2dlcihyLGkpLCFyLmlzRGVmYXVsdFByZXZlbnRlZCgpfWZ1bmN0aW9uIHAodCxlLGkscil7cmV0dXJuIHQuZ2xvYmFsP2goZXx8bixpLHIpOnZvaWQgMH1mdW5jdGlvbiBkKGUpe2UuZ2xvYmFsJiYwPT09dC5hY3RpdmUrKyYmcChlLG51bGwsXCJhamF4U3RhcnRcIil9ZnVuY3Rpb24gbShlKXtlLmdsb2JhbCYmIS0tdC5hY3RpdmUmJnAoZSxudWxsLFwiYWpheFN0b3BcIil9ZnVuY3Rpb24gZyh0LGUpe3ZhciBuPWUuY29udGV4dDtyZXR1cm4gZS5iZWZvcmVTZW5kLmNhbGwobix0LGUpPT09ITF8fHAoZSxuLFwiYWpheEJlZm9yZVNlbmRcIixbdCxlXSk9PT0hMT8hMTp2b2lkIHAoZSxuLFwiYWpheFNlbmRcIixbdCxlXSl9ZnVuY3Rpb24gdih0LGUsbixpKXt2YXIgcj1uLmNvbnRleHQsbz1cInN1Y2Nlc3NcIjtuLnN1Y2Nlc3MuY2FsbChyLHQsbyxlKSxpJiZpLnJlc29sdmVXaXRoKHIsW3QsbyxlXSkscChuLHIsXCJhamF4U3VjY2Vzc1wiLFtlLG4sdF0pLHcobyxlLG4pfWZ1bmN0aW9uIHkodCxlLG4saSxyKXt2YXIgbz1pLmNvbnRleHQ7aS5lcnJvci5jYWxsKG8sbixlLHQpLHImJnIucmVqZWN0V2l0aChvLFtuLGUsdF0pLHAoaSxvLFwiYWpheEVycm9yXCIsW24saSx0fHxlXSksdyhlLG4saSl9ZnVuY3Rpb24gdyh0LGUsbil7dmFyIGk9bi5jb250ZXh0O24uY29tcGxldGUuY2FsbChpLGUsdCkscChuLGksXCJhamF4Q29tcGxldGVcIixbZSxuXSksbShuKX1mdW5jdGlvbiB4KCl7fWZ1bmN0aW9uIGIodCl7cmV0dXJuIHQmJih0PXQuc3BsaXQoXCI7XCIsMilbMF0pLHQmJih0PT1mP1wiaHRtbFwiOnQ9PXU/XCJqc29uXCI6cy50ZXN0KHQpP1wic2NyaXB0XCI6YS50ZXN0KHQpJiZcInhtbFwiKXx8XCJ0ZXh0XCJ9ZnVuY3Rpb24gRSh0LGUpe3JldHVyblwiXCI9PWU/dDoodCtcIiZcIitlKS5yZXBsYWNlKC9bJj9dezEsMn0vLFwiP1wiKX1mdW5jdGlvbiBUKGUpe2UucHJvY2Vzc0RhdGEmJmUuZGF0YSYmXCJzdHJpbmdcIiE9dC50eXBlKGUuZGF0YSkmJihlLmRhdGE9dC5wYXJhbShlLmRhdGEsZS50cmFkaXRpb25hbCkpLCFlLmRhdGF8fGUudHlwZSYmXCJHRVRcIiE9ZS50eXBlLnRvVXBwZXJDYXNlKCl8fChlLnVybD1FKGUudXJsLGUuZGF0YSksZS5kYXRhPXZvaWQgMCl9ZnVuY3Rpb24gaihlLG4saSxyKXtyZXR1cm4gdC5pc0Z1bmN0aW9uKG4pJiYocj1pLGk9bixuPXZvaWQgMCksdC5pc0Z1bmN0aW9uKGkpfHwocj1pLGk9dm9pZCAwKSx7dXJsOmUsZGF0YTpuLHN1Y2Nlc3M6aSxkYXRhVHlwZTpyfX1mdW5jdGlvbiBDKGUsbixpLHIpe3ZhciBvLHM9dC5pc0FycmF5KG4pLGE9dC5pc1BsYWluT2JqZWN0KG4pO3QuZWFjaChuLGZ1bmN0aW9uKG4sdSl7bz10LnR5cGUodSksciYmKG49aT9yOnIrXCJbXCIrKGF8fFwib2JqZWN0XCI9PW98fFwiYXJyYXlcIj09bz9uOlwiXCIpK1wiXVwiKSwhciYmcz9lLmFkZCh1Lm5hbWUsdS52YWx1ZSk6XCJhcnJheVwiPT1vfHwhaSYmXCJvYmplY3RcIj09bz9DKGUsdSxpLG4pOmUuYWRkKG4sdSl9KX12YXIgaSxyLGU9MCxuPXdpbmRvdy5kb2N1bWVudCxvPS88c2NyaXB0XFxiW148XSooPzooPyE8XFwvc2NyaXB0Pik8W148XSopKjxcXC9zY3JpcHQ+L2dpLHM9L14oPzp0ZXh0fGFwcGxpY2F0aW9uKVxcL2phdmFzY3JpcHQvaSxhPS9eKD86dGV4dHxhcHBsaWNhdGlvbilcXC94bWwvaSx1PVwiYXBwbGljYXRpb24vanNvblwiLGY9XCJ0ZXh0L2h0bWxcIixjPS9eXFxzKiQvLGw9bi5jcmVhdGVFbGVtZW50KFwiYVwiKTtsLmhyZWY9d2luZG93LmxvY2F0aW9uLmhyZWYsdC5hY3RpdmU9MCx0LmFqYXhKU09OUD1mdW5jdGlvbihpLHIpe2lmKCEoXCJ0eXBlXCJpbiBpKSlyZXR1cm4gdC5hamF4KGkpO3ZhciBmLGgsbz1pLmpzb25wQ2FsbGJhY2sscz0odC5pc0Z1bmN0aW9uKG8pP28oKTpvKXx8XCJqc29ucFwiKyArK2UsYT1uLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiksdT13aW5kb3dbc10sYz1mdW5jdGlvbihlKXt0KGEpLnRyaWdnZXJIYW5kbGVyKFwiZXJyb3JcIixlfHxcImFib3J0XCIpfSxsPXthYm9ydDpjfTtyZXR1cm4gciYmci5wcm9taXNlKGwpLHQoYSkub24oXCJsb2FkIGVycm9yXCIsZnVuY3Rpb24oZSxuKXtjbGVhclRpbWVvdXQoaCksdChhKS5vZmYoKS5yZW1vdmUoKSxcImVycm9yXCIhPWUudHlwZSYmZj92KGZbMF0sbCxpLHIpOnkobnVsbCxufHxcImVycm9yXCIsbCxpLHIpLHdpbmRvd1tzXT11LGYmJnQuaXNGdW5jdGlvbih1KSYmdShmWzBdKSx1PWY9dm9pZCAwfSksZyhsLGkpPT09ITE/KGMoXCJhYm9ydFwiKSxsKTood2luZG93W3NdPWZ1bmN0aW9uKCl7Zj1hcmd1bWVudHN9LGEuc3JjPWkudXJsLnJlcGxhY2UoL1xcPyguKyk9XFw/LyxcIj8kMT1cIitzKSxuLmhlYWQuYXBwZW5kQ2hpbGQoYSksaS50aW1lb3V0PjAmJihoPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtjKFwidGltZW91dFwiKX0saS50aW1lb3V0KSksbCl9LHQuYWpheFNldHRpbmdzPXt0eXBlOlwiR0VUXCIsYmVmb3JlU2VuZDp4LHN1Y2Nlc3M6eCxlcnJvcjp4LGNvbXBsZXRlOngsY29udGV4dDpudWxsLGdsb2JhbDohMCx4aHI6ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdH0sYWNjZXB0czp7c2NyaXB0OlwidGV4dC9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi94LWphdmFzY3JpcHRcIixqc29uOnUseG1sOlwiYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbFwiLGh0bWw6Zix0ZXh0OlwidGV4dC9wbGFpblwifSxjcm9zc0RvbWFpbjohMSx0aW1lb3V0OjAscHJvY2Vzc0RhdGE6ITAsY2FjaGU6ITB9LHQuYWpheD1mdW5jdGlvbihlKXt2YXIgYSx1LG89dC5leHRlbmQoe30sZXx8e30pLHM9dC5EZWZlcnJlZCYmdC5EZWZlcnJlZCgpO2ZvcihpIGluIHQuYWpheFNldHRpbmdzKXZvaWQgMD09PW9baV0mJihvW2ldPXQuYWpheFNldHRpbmdzW2ldKTtkKG8pLG8uY3Jvc3NEb21haW58fChhPW4uY3JlYXRlRWxlbWVudChcImFcIiksYS5ocmVmPW8udXJsLGEuaHJlZj1hLmhyZWYsby5jcm9zc0RvbWFpbj1sLnByb3RvY29sK1wiLy9cIitsLmhvc3QhPWEucHJvdG9jb2wrXCIvL1wiK2EuaG9zdCksby51cmx8fChvLnVybD13aW5kb3cubG9jYXRpb24udG9TdHJpbmcoKSksKHU9by51cmwuaW5kZXhPZihcIiNcIikpPi0xJiYoby51cmw9by51cmwuc2xpY2UoMCx1KSksVChvKTt2YXIgZj1vLmRhdGFUeXBlLGg9L1xcPy4rPVxcPy8udGVzdChvLnVybCk7aWYoaCYmKGY9XCJqc29ucFwiKSxvLmNhY2hlIT09ITEmJihlJiZlLmNhY2hlPT09ITB8fFwic2NyaXB0XCIhPWYmJlwianNvbnBcIiE9Zil8fChvLnVybD1FKG8udXJsLFwiXz1cIitEYXRlLm5vdygpKSksXCJqc29ucFwiPT1mKXJldHVybiBofHwoby51cmw9RShvLnVybCxvLmpzb25wP28uanNvbnArXCI9P1wiOm8uanNvbnA9PT0hMT9cIlwiOlwiY2FsbGJhY2s9P1wiKSksdC5hamF4SlNPTlAobyxzKTt2YXIgTixwPW8uYWNjZXB0c1tmXSxtPXt9LHc9ZnVuY3Rpb24odCxlKXttW3QudG9Mb3dlckNhc2UoKV09W3QsZV19LGo9L14oW1xcdy1dKzopXFwvXFwvLy50ZXN0KG8udXJsKT9SZWdFeHAuJDE6d2luZG93LmxvY2F0aW9uLnByb3RvY29sLFM9by54aHIoKSxDPVMuc2V0UmVxdWVzdEhlYWRlcjtpZihzJiZzLnByb21pc2UoUyksby5jcm9zc0RvbWFpbnx8dyhcIlgtUmVxdWVzdGVkLVdpdGhcIixcIlhNTEh0dHBSZXF1ZXN0XCIpLHcoXCJBY2NlcHRcIixwfHxcIiovKlwiKSwocD1vLm1pbWVUeXBlfHxwKSYmKHAuaW5kZXhPZihcIixcIik+LTEmJihwPXAuc3BsaXQoXCIsXCIsMilbMF0pLFMub3ZlcnJpZGVNaW1lVHlwZSYmUy5vdmVycmlkZU1pbWVUeXBlKHApKSwoby5jb250ZW50VHlwZXx8by5jb250ZW50VHlwZSE9PSExJiZvLmRhdGEmJlwiR0VUXCIhPW8udHlwZS50b1VwcGVyQ2FzZSgpKSYmdyhcIkNvbnRlbnQtVHlwZVwiLG8uY29udGVudFR5cGV8fFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpLG8uaGVhZGVycylmb3IociBpbiBvLmhlYWRlcnMpdyhyLG8uaGVhZGVyc1tyXSk7aWYoUy5zZXRSZXF1ZXN0SGVhZGVyPXcsUy5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXtpZig0PT1TLnJlYWR5U3RhdGUpe1Mub25yZWFkeXN0YXRlY2hhbmdlPXgsY2xlYXJUaW1lb3V0KE4pO3ZhciBlLG49ITE7aWYoUy5zdGF0dXM+PTIwMCYmUy5zdGF0dXM8MzAwfHwzMDQ9PVMuc3RhdHVzfHwwPT1TLnN0YXR1cyYmXCJmaWxlOlwiPT1qKXtmPWZ8fGIoby5taW1lVHlwZXx8Uy5nZXRSZXNwb25zZUhlYWRlcihcImNvbnRlbnQtdHlwZVwiKSksZT1TLnJlc3BvbnNlVGV4dDt0cnl7XCJzY3JpcHRcIj09Zj8oMSxldmFsKShlKTpcInhtbFwiPT1mP2U9Uy5yZXNwb25zZVhNTDpcImpzb25cIj09ZiYmKGU9Yy50ZXN0KGUpP251bGw6dC5wYXJzZUpTT04oZSkpfWNhdGNoKGkpe249aX1uP3kobixcInBhcnNlcmVycm9yXCIsUyxvLHMpOnYoZSxTLG8scyl9ZWxzZSB5KFMuc3RhdHVzVGV4dHx8bnVsbCxTLnN0YXR1cz9cImVycm9yXCI6XCJhYm9ydFwiLFMsbyxzKX19LGcoUyxvKT09PSExKXJldHVybiBTLmFib3J0KCkseShudWxsLFwiYWJvcnRcIixTLG8scyksUztpZihvLnhockZpZWxkcylmb3IociBpbiBvLnhockZpZWxkcylTW3JdPW8ueGhyRmllbGRzW3JdO3ZhciBQPVwiYXN5bmNcImluIG8/by5hc3luYzohMDtTLm9wZW4oby50eXBlLG8udXJsLFAsby51c2VybmFtZSxvLnBhc3N3b3JkKTtmb3IociBpbiBtKUMuYXBwbHkoUyxtW3JdKTtyZXR1cm4gby50aW1lb3V0PjAmJihOPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtTLm9ucmVhZHlzdGF0ZWNoYW5nZT14LFMuYWJvcnQoKSx5KG51bGwsXCJ0aW1lb3V0XCIsUyxvLHMpfSxvLnRpbWVvdXQpKSxTLnNlbmQoby5kYXRhP28uZGF0YTpudWxsKSxTfSx0LmdldD1mdW5jdGlvbigpe3JldHVybiB0LmFqYXgoai5hcHBseShudWxsLGFyZ3VtZW50cykpfSx0LnBvc3Q9ZnVuY3Rpb24oKXt2YXIgZT1qLmFwcGx5KG51bGwsYXJndW1lbnRzKTtyZXR1cm4gZS50eXBlPVwiUE9TVFwiLHQuYWpheChlKX0sdC5nZXRKU09OPWZ1bmN0aW9uKCl7dmFyIGU9ai5hcHBseShudWxsLGFyZ3VtZW50cyk7cmV0dXJuIGUuZGF0YVR5cGU9XCJqc29uXCIsdC5hamF4KGUpfSx0LmZuLmxvYWQ9ZnVuY3Rpb24oZSxuLGkpe2lmKCF0aGlzLmxlbmd0aClyZXR1cm4gdGhpczt2YXIgYSxyPXRoaXMscz1lLnNwbGl0KC9cXHMvKSx1PWooZSxuLGkpLGY9dS5zdWNjZXNzO3JldHVybiBzLmxlbmd0aD4xJiYodS51cmw9c1swXSxhPXNbMV0pLHUuc3VjY2Vzcz1mdW5jdGlvbihlKXtyLmh0bWwoYT90KFwiPGRpdj5cIikuaHRtbChlLnJlcGxhY2UobyxcIlwiKSkuZmluZChhKTplKSxmJiZmLmFwcGx5KHIsYXJndW1lbnRzKX0sdC5hamF4KHUpLHRoaXN9O3ZhciBTPWVuY29kZVVSSUNvbXBvbmVudDt0LnBhcmFtPWZ1bmN0aW9uKGUsbil7dmFyIGk9W107cmV0dXJuIGkuYWRkPWZ1bmN0aW9uKGUsbil7dC5pc0Z1bmN0aW9uKG4pJiYobj1uKCkpLG51bGw9PW4mJihuPVwiXCIpLHRoaXMucHVzaChTKGUpK1wiPVwiK1MobikpfSxDKGksZSxuKSxpLmpvaW4oXCImXCIpLnJlcGxhY2UoLyUyMC9nLFwiK1wiKX19KFplcHRvKSxmdW5jdGlvbih0KXt0LkNhbGxiYWNrcz1mdW5jdGlvbihlKXtlPXQuZXh0ZW5kKHt9LGUpO3ZhciBuLGkscixvLHMsYSx1PVtdLGY9IWUub25jZSYmW10sYz1mdW5jdGlvbih0KXtmb3Iobj1lLm1lbW9yeSYmdCxpPSEwLGE9b3x8MCxvPTAscz11Lmxlbmd0aCxyPSEwO3UmJnM+YTsrK2EpaWYodVthXS5hcHBseSh0WzBdLHRbMV0pPT09ITEmJmUuc3RvcE9uRmFsc2Upe249ITE7YnJlYWt9cj0hMSx1JiYoZj9mLmxlbmd0aCYmYyhmLnNoaWZ0KCkpOm4/dS5sZW5ndGg9MDpsLmRpc2FibGUoKSl9LGw9e2FkZDpmdW5jdGlvbigpe2lmKHUpe3ZhciBpPXUubGVuZ3RoLGE9ZnVuY3Rpb24obil7dC5lYWNoKG4sZnVuY3Rpb24odCxuKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBuP2UudW5pcXVlJiZsLmhhcyhuKXx8dS5wdXNoKG4pOm4mJm4ubGVuZ3RoJiZcInN0cmluZ1wiIT10eXBlb2YgbiYmYShuKX0pfTthKGFyZ3VtZW50cykscj9zPXUubGVuZ3RoOm4mJihvPWksYyhuKSl9cmV0dXJuIHRoaXN9LHJlbW92ZTpmdW5jdGlvbigpe3JldHVybiB1JiZ0LmVhY2goYXJndW1lbnRzLGZ1bmN0aW9uKGUsbil7Zm9yKHZhciBpOyhpPXQuaW5BcnJheShuLHUsaSkpPi0xOyl1LnNwbGljZShpLDEpLHImJihzPj1pJiYtLXMsYT49aSYmLS1hKX0pLHRoaXN9LGhhczpmdW5jdGlvbihlKXtyZXR1cm4hKCF1fHwhKGU/dC5pbkFycmF5KGUsdSk+LTE6dS5sZW5ndGgpKX0sZW1wdHk6ZnVuY3Rpb24oKXtyZXR1cm4gcz11Lmxlbmd0aD0wLHRoaXN9LGRpc2FibGU6ZnVuY3Rpb24oKXtyZXR1cm4gdT1mPW49dm9pZCAwLHRoaXN9LGRpc2FibGVkOmZ1bmN0aW9uKCl7cmV0dXJuIXV9LGxvY2s6ZnVuY3Rpb24oKXtyZXR1cm4gZj12b2lkIDAsbnx8bC5kaXNhYmxlKCksdGhpc30sbG9ja2VkOmZ1bmN0aW9uKCl7cmV0dXJuIWZ9LGZpcmVXaXRoOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIXV8fGkmJiFmfHwoZT1lfHxbXSxlPVt0LGUuc2xpY2U/ZS5zbGljZSgpOmVdLHI/Zi5wdXNoKGUpOmMoZSkpLHRoaXN9LGZpcmU6ZnVuY3Rpb24oKXtyZXR1cm4gbC5maXJlV2l0aCh0aGlzLGFyZ3VtZW50cyl9LGZpcmVkOmZ1bmN0aW9uKCl7cmV0dXJuISFpfX07cmV0dXJuIGx9fShaZXB0byksZnVuY3Rpb24odCl7ZnVuY3Rpb24gbihlKXt2YXIgaT1bW1wicmVzb2x2ZVwiLFwiZG9uZVwiLHQuQ2FsbGJhY2tzKHtvbmNlOjEsbWVtb3J5OjF9KSxcInJlc29sdmVkXCJdLFtcInJlamVjdFwiLFwiZmFpbFwiLHQuQ2FsbGJhY2tzKHtvbmNlOjEsbWVtb3J5OjF9KSxcInJlamVjdGVkXCJdLFtcIm5vdGlmeVwiLFwicHJvZ3Jlc3NcIix0LkNhbGxiYWNrcyh7bWVtb3J5OjF9KV1dLHI9XCJwZW5kaW5nXCIsbz17c3RhdGU6ZnVuY3Rpb24oKXtyZXR1cm4gcn0sYWx3YXlzOmZ1bmN0aW9uKCl7cmV0dXJuIHMuZG9uZShhcmd1bWVudHMpLmZhaWwoYXJndW1lbnRzKSx0aGlzfSx0aGVuOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzO3JldHVybiBuKGZ1bmN0aW9uKG4pe3QuZWFjaChpLGZ1bmN0aW9uKGkscil7dmFyIGE9dC5pc0Z1bmN0aW9uKGVbaV0pJiZlW2ldO3NbclsxXV0oZnVuY3Rpb24oKXt2YXIgZT1hJiZhLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtpZihlJiZ0LmlzRnVuY3Rpb24oZS5wcm9taXNlKSllLnByb21pc2UoKS5kb25lKG4ucmVzb2x2ZSkuZmFpbChuLnJlamVjdCkucHJvZ3Jlc3Mobi5ub3RpZnkpO2Vsc2V7dmFyIGk9dGhpcz09PW8/bi5wcm9taXNlKCk6dGhpcyxzPWE/W2VdOmFyZ3VtZW50cztuW3JbMF0rXCJXaXRoXCJdKGkscyl9fSl9KSxlPW51bGx9KS5wcm9taXNlKCl9LHByb21pc2U6ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGwhPWU/dC5leHRlbmQoZSxvKTpvfX0scz17fTtyZXR1cm4gdC5lYWNoKGksZnVuY3Rpb24odCxlKXt2YXIgbj1lWzJdLGE9ZVszXTtvW2VbMV1dPW4uYWRkLGEmJm4uYWRkKGZ1bmN0aW9uKCl7cj1hfSxpWzFedF1bMl0uZGlzYWJsZSxpWzJdWzJdLmxvY2spLHNbZVswXV09ZnVuY3Rpb24oKXtyZXR1cm4gc1tlWzBdK1wiV2l0aFwiXSh0aGlzPT09cz9vOnRoaXMsYXJndW1lbnRzKSx0aGlzfSxzW2VbMF0rXCJXaXRoXCJdPW4uZmlyZVdpdGh9KSxvLnByb21pc2UocyksZSYmZS5jYWxsKHMscyksc312YXIgZT1BcnJheS5wcm90b3R5cGUuc2xpY2U7dC53aGVuPWZ1bmN0aW9uKGkpe3ZhciBmLGMsbCxyPWUuY2FsbChhcmd1bWVudHMpLG89ci5sZW5ndGgscz0wLGE9MSE9PW98fGkmJnQuaXNGdW5jdGlvbihpLnByb21pc2UpP286MCx1PTE9PT1hP2k6bigpLGg9ZnVuY3Rpb24odCxuLGkpe3JldHVybiBmdW5jdGlvbihyKXtuW3RdPXRoaXMsaVt0XT1hcmd1bWVudHMubGVuZ3RoPjE/ZS5jYWxsKGFyZ3VtZW50cyk6cixpPT09Zj91Lm5vdGlmeVdpdGgobixpKTotLWF8fHUucmVzb2x2ZVdpdGgobixpKX19O2lmKG8+MSlmb3IoZj1uZXcgQXJyYXkobyksYz1uZXcgQXJyYXkobyksbD1uZXcgQXJyYXkobyk7bz5zOysrcylyW3NdJiZ0LmlzRnVuY3Rpb24ocltzXS5wcm9taXNlKT9yW3NdLnByb21pc2UoKS5kb25lKGgocyxsLHIpKS5mYWlsKHUucmVqZWN0KS5wcm9ncmVzcyhoKHMsYyxmKSk6LS1hO3JldHVybiBhfHx1LnJlc29sdmVXaXRoKGwsciksdS5wcm9taXNlKCl9LHQuRGVmZXJyZWQ9bn0oWmVwdG8pLGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIHUodCxlLG4saSl7cmV0dXJuIE1hdGguYWJzKHQtZSk+PU1hdGguYWJzKG4taSk/dC1lPjA/XCJMZWZ0XCI6XCJSaWdodFwiOm4taT4wP1wiVXBcIjpcIkRvd25cIn1mdW5jdGlvbiBmKCl7bz1udWxsLGUubGFzdCYmKGUuZWwudHJpZ2dlcihcImxvbmdUYXBcIiksZT17fSl9ZnVuY3Rpb24gYygpe28mJmNsZWFyVGltZW91dChvKSxvPW51bGx9ZnVuY3Rpb24gbCgpe24mJmNsZWFyVGltZW91dChuKSxpJiZjbGVhclRpbWVvdXQoaSksciYmY2xlYXJUaW1lb3V0KHIpLG8mJmNsZWFyVGltZW91dChvKSxuPWk9cj1vPW51bGwsZT17fX1mdW5jdGlvbiBoKHQpe3JldHVybihcInRvdWNoXCI9PXQucG9pbnRlclR5cGV8fHQucG9pbnRlclR5cGU9PXQuTVNQT0lOVEVSX1RZUEVfVE9VQ0gpJiZ0LmlzUHJpbWFyeX1mdW5jdGlvbiBwKHQsZSl7cmV0dXJuIHQudHlwZT09XCJwb2ludGVyXCIrZXx8dC50eXBlLnRvTG93ZXJDYXNlKCk9PVwibXNwb2ludGVyXCIrZX12YXIgbixpLHIsbyxhLGU9e30scz03NTA7dChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXt2YXIgZCxtLHksdyxnPTAsdj0wO1wiTVNHZXN0dXJlXCJpbiB3aW5kb3cmJihhPW5ldyBNU0dlc3R1cmUsYS50YXJnZXQ9ZG9jdW1lbnQuYm9keSksdChkb2N1bWVudCkuYmluZChcIk1TR2VzdHVyZUVuZFwiLGZ1bmN0aW9uKHQpe3ZhciBuPXQudmVsb2NpdHlYPjE/XCJSaWdodFwiOnQudmVsb2NpdHlYPC0xP1wiTGVmdFwiOnQudmVsb2NpdHlZPjE/XCJEb3duXCI6dC52ZWxvY2l0eVk8LTE/XCJVcFwiOm51bGw7biYmKGUuZWwudHJpZ2dlcihcInN3aXBlXCIpLGUuZWwudHJpZ2dlcihcInN3aXBlXCIrbikpfSkub24oXCJ0b3VjaHN0YXJ0IE1TUG9pbnRlckRvd24gcG9pbnRlcmRvd25cIixmdW5jdGlvbihpKXsoISh3PXAoaSxcImRvd25cIikpfHxoKGkpKSYmKHk9dz9pOmkudG91Y2hlc1swXSxpLnRvdWNoZXMmJjE9PT1pLnRvdWNoZXMubGVuZ3RoJiZlLngyJiYoZS54Mj12b2lkIDAsZS55Mj12b2lkIDApLGQ9RGF0ZS5ub3coKSxtPWQtKGUubGFzdHx8ZCksZS5lbD10KFwidGFnTmFtZVwiaW4geS50YXJnZXQ/eS50YXJnZXQ6eS50YXJnZXQucGFyZW50Tm9kZSksbiYmY2xlYXJUaW1lb3V0KG4pLGUueDE9eS5wYWdlWCxlLnkxPXkucGFnZVksbT4wJiYyNTA+PW0mJihlLmlzRG91YmxlVGFwPSEwKSxlLmxhc3Q9ZCxvPXNldFRpbWVvdXQoZixzKSxhJiZ3JiZhLmFkZFBvaW50ZXIoaS5wb2ludGVySWQpKX0pLm9uKFwidG91Y2htb3ZlIE1TUG9pbnRlck1vdmUgcG9pbnRlcm1vdmVcIixmdW5jdGlvbih0KXsoISh3PXAodCxcIm1vdmVcIikpfHxoKHQpKSYmKHk9dz90OnQudG91Y2hlc1swXSxjKCksZS54Mj15LnBhZ2VYLGUueTI9eS5wYWdlWSxnKz1NYXRoLmFicyhlLngxLWUueDIpLHYrPU1hdGguYWJzKGUueTEtZS55MikpfSkub24oXCJ0b3VjaGVuZCBNU1BvaW50ZXJVcCBwb2ludGVydXBcIixmdW5jdGlvbihvKXsoISh3PXAobyxcInVwXCIpKXx8aChvKSkmJihjKCksZS54MiYmTWF0aC5hYnMoZS54MS1lLngyKT4zMHx8ZS55MiYmTWF0aC5hYnMoZS55MS1lLnkyKT4zMD9yPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtlLmVsLnRyaWdnZXIoXCJzd2lwZVwiKSxlLmVsLnRyaWdnZXIoXCJzd2lwZVwiK3UoZS54MSxlLngyLGUueTEsZS55MikpLGU9e319LDApOlwibGFzdFwiaW4gZSYmKDMwPmcmJjMwPnY/aT1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dmFyIGk9dC5FdmVudChcInRhcFwiKTtpLmNhbmNlbFRvdWNoPWwsZS5lbC50cmlnZ2VyKGkpLGUuaXNEb3VibGVUYXA/KGUuZWwmJmUuZWwudHJpZ2dlcihcImRvdWJsZVRhcFwiKSxlPXt9KTpuPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtuPW51bGwsZS5lbCYmZS5lbC50cmlnZ2VyKFwic2luZ2xlVGFwXCIpLGU9e319LDI1MCl9LDApOmU9e30pLGc9dj0wKX0pLm9uKFwidG91Y2hjYW5jZWwgTVNQb2ludGVyQ2FuY2VsIHBvaW50ZXJjYW5jZWxcIixsKSx0KHdpbmRvdykub24oXCJzY3JvbGxcIixsKX0pLFtcInN3aXBlXCIsXCJzd2lwZUxlZnRcIixcInN3aXBlUmlnaHRcIixcInN3aXBlVXBcIixcInN3aXBlRG93blwiLFwiZG91YmxlVGFwXCIsXCJ0YXBcIixcInNpbmdsZVRhcFwiLFwibG9uZ1RhcFwiXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3QuZm5bZV09ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMub24oZSx0KX19KX0oWmVwdG8pLGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGU9dChlKSwhKCFlLndpZHRoKCkmJiFlLmhlaWdodCgpKSYmXCJub25lXCIhPT1lLmNzcyhcImRpc3BsYXlcIil9ZnVuY3Rpb24gZih0LGUpe3Q9dC5yZXBsYWNlKC89I1xcXS9nLCc9XCIjXCJdJyk7dmFyIG4saSxyPXMuZXhlYyh0KTtpZihyJiZyWzJdaW4gbyYmKG49b1tyWzJdXSxpPXJbM10sdD1yWzFdLGkpKXt2YXIgYT1OdW1iZXIoaSk7aT1pc05hTihhKT9pLnJlcGxhY2UoL15bXCInXXxbXCInXSQvZyxcIlwiKTphfXJldHVybiBlKHQsbixpKX12YXIgZT10LnplcHRvLG49ZS5xc2EsaT1lLm1hdGNoZXMsbz10LmV4cHJbXCI6XCJdPXt2aXNpYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIHIodGhpcyk/dGhpczp2b2lkIDB9LGhpZGRlbjpmdW5jdGlvbigpe3JldHVybiByKHRoaXMpP3ZvaWQgMDp0aGlzfSxzZWxlY3RlZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNlbGVjdGVkP3RoaXM6dm9pZCAwfSxjaGVja2VkOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2hlY2tlZD90aGlzOnZvaWQgMH0scGFyZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucGFyZW50Tm9kZX0sZmlyc3Q6ZnVuY3Rpb24odCl7cmV0dXJuIDA9PT10P3RoaXM6dm9pZCAwfSxsYXN0OmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQ9PT1lLmxlbmd0aC0xP3RoaXM6dm9pZCAwfSxlcTpmdW5jdGlvbih0LGUsbil7cmV0dXJuIHQ9PT1uP3RoaXM6dm9pZCAwfSxjb250YWluczpmdW5jdGlvbihlLG4saSl7cmV0dXJuIHQodGhpcykudGV4dCgpLmluZGV4T2YoaSk+LTE/dGhpczp2b2lkIDB9LGhhczpmdW5jdGlvbih0LG4saSl7cmV0dXJuIGUucXNhKHRoaXMsaSkubGVuZ3RoP3RoaXM6dm9pZCAwfX0scz1uZXcgUmVnRXhwKFwiKC4qKTooXFxcXHcrKSg/OlxcXFwoKFteKV0rKVxcXFwpKT8kXFxcXHMqXCIpLGE9L15cXHMqPi8sdT1cIlplcHRvXCIrICtuZXcgRGF0ZTtlLnFzYT1mdW5jdGlvbihpLHIpe3JldHVybiBmKHIsZnVuY3Rpb24obyxzLGYpe3RyeXt2YXIgYzshbyYmcz9vPVwiKlwiOmEudGVzdChvKSYmKGM9dChpKS5hZGRDbGFzcyh1KSxvPVwiLlwiK3UrXCIgXCIrbyk7dmFyIGw9bihpLG8pfWNhdGNoKGgpe3Rocm93IGNvbnNvbGUuZXJyb3IoXCJlcnJvciBwZXJmb3JtaW5nIHNlbGVjdG9yOiAlb1wiLHIpLGh9ZmluYWxseXtjJiZjLnJlbW92ZUNsYXNzKHUpfXJldHVybiBzP2UudW5pcSh0Lm1hcChsLGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHMuY2FsbCh0LGUsbCxmKX0pKTpsfSl9LGUubWF0Y2hlcz1mdW5jdGlvbih0LGUpe3JldHVybiBmKGUsZnVuY3Rpb24oZSxuLHIpe3JldHVybiEoZSYmIWkodCxlKXx8biYmbi5jYWxsKHQsbnVsbCxyKSE9PXQpfSl9fShaZXB0byksZnVuY3Rpb24oKXt0cnl7Z2V0Q29tcHV0ZWRTdHlsZSh2b2lkIDApfWNhdGNoKHQpe3ZhciBlPWdldENvbXB1dGVkU3R5bGU7d2luZG93LmdldENvbXB1dGVkU3R5bGU9ZnVuY3Rpb24odCl7dHJ5e3JldHVybiBlKHQpfWNhdGNoKG4pe3JldHVybiBudWxsfX19fSgpO1xubW9kdWxlLmV4cG9ydHMgPSBaZXB0bztcbiJdfQ==
