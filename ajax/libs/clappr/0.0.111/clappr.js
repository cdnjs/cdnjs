require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

"use strict";

var Player = require("./components/player");
var Mediator = require("mediator");
var Events = require("events");

window.DEBUG = false;

window.Clappr = { Player: Player, Mediator: Mediator, Events: Events };
window.Clappr.version = "0.0.111";

module.exports = window.Clappr;

},{"./components/player":59,"events":"events","mediator":"mediator"}],2:[function(require,module,exports){
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

var template = require("template");
module.exports = { media_control: template("<div class=\"media-control-background\" data-background></div><div class=\"media-control-layer\" data-controls><% var renderBar=function(name) { %><div class=\"bar-container\" data-<%= name %>><div class=\"bar-background\" data-<%= name %>><div class=\"bar-fill-1\" data-<%= name %>></div><div class=\"bar-fill-2\" data-<%= name %>></div><div class=\"bar-hover\" data-<%= name %>></div></div><div class=\"bar-scrubber\" data-<%= name %>><div class=\"bar-scrubber-icon\" data-<%= name %>></div></div></div><% }; %><% var renderSegmentedBar=function(name, segments) { segments=segments || 10; %><div class=\"bar-container\" data-<%= name %>><% for (var i = 0; i < segments; i++) { %><div class=\"segmented-bar-element\" data-<%= name %>></div><% } %></div><% }; %><% var renderDrawer=function(name, renderContent) { %><div class=\"drawer-container\" data-<%= name %>><div class=\"drawer-icon-container\" data-<%= name %>><div class=\"drawer-icon media-control-icon\" data-<%= name %>></div><span class=\"drawer-text\" data-<%= name %>></span></div><% renderContent(name); %></div><% }; %><% var renderIndicator=function(name) { %><div class=\"media-control-indicator\" data-<%= name %>></div><% }; %><% var renderButton=function(name) { %><button class=\"media-control-button media-control-icon\" data-<%= name %>></button><% }; %><% var templates={ bar: renderBar, segmentedBar: renderSegmentedBar, }; var render=function(settingsList) { settingsList.forEach(function(setting) { if(setting === \"seekbar\") { renderBar(setting); } else if (setting === \"volume\") { renderDrawer(setting, settings.volumeBarTemplate ? templates[settings.volumeBarTemplate] : function(name) { return renderSegmentedBar(name); }); } else if (setting === \"duration\" || setting=== \"position\") { renderIndicator(setting); } else { renderButton(setting); } }); }; %><% if (settings.default && settings.default.length) { %><div class=\"media-control-center-panel\" data-media-control><% render(settings.default); %></div><% } %><% if (settings.left && settings.left.length) { %><div class=\"media-control-left-panel\" data-media-control><% render(settings.left); %></div><% } %><% if (settings.right && settings.right.length) { %><div class=\"media-control-right-panel\" data-media-control><% render(settings.right); %></div><% } %></div>"), seek_time: template("<span data-seek-time></span>"), flash: template("<param name=\"movie\" value=\"<%= baseUrl %>/assets/Player.swf\"><param name=\"quality\" value=\"autohigh\"><param name=\"swliveconnect\" value=\"true\"><param name=\"allowScriptAccess\" value=\"always\"><param name=\"bgcolor\" value=\"#001122\"><param name=\"allowFullScreen\" value=\"false\"><param name=\"wmode\" value=\"transparent\"><param name=\"tabindex\" value=\"1\"><param name=FlashVars value=\"playbackId=<%= playbackId %>\" /><embed type=\"application/x-shockwave-flash\" disabled tabindex=\"-1\" enablecontextmenu=\"false\" allowScriptAccess=\"always\" quality=\"autohight\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" wmode=\"transparent\" swliveconnect=\"true\" type=\"application/x-shockwave-flash\" allowfullscreen=\"false\" bgcolor=\"#000000\" FlashVars=\"playbackId=<%= playbackId %>\" src=\"<%= baseUrl %>/assets/Player.swf\"></embed>"), hls: template("<param name=\"movie\" value=\"<%= baseUrl %>/assets/HLSPlayer.swf?inline=1\"><param name=\"quality\" value=\"autohigh\"><param name=\"swliveconnect\" value=\"true\"><param name=\"allowScriptAccess\" value=\"always\"><param name=\"bgcolor\" value=\"#001122\"><param name=\"allowFullScreen\" value=\"false\"><param name=\"wmode\" value=\"transparent\"><param name=\"tabindex\" value=\"1\"><param name=FlashVars value=\"playbackId=<%= playbackId %>\" /><embed type=\"application/x-shockwave-flash\" tabindex=\"1\" enablecontextmenu=\"false\" allowScriptAccess=\"always\" quality=\"autohigh\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" wmode=\"transparent\" swliveconnect=\"true\" type=\"application/x-shockwave-flash\" allowfullscreen=\"false\" bgcolor=\"#000000\" FlashVars=\"playbackId=<%= playbackId %>\" src=\"<%= baseUrl %>/assets/HLSPlayer.swf\" width=\"100%\" height=\"100%\"></embed>"), html5_video: template("<source src=\"<%=src%>\" type=\"<%=type%>\">"), no_op: template("<canvas data-no-op-canvas></canvas><p data-no-op-msg>Your browser does not support the playback of this video. Try to use a different browser.<p>"), background_button: template("<div class=\"background-button-wrapper\" data-background-button><button class=\"background-button-icon\" data-background-button></button></div>"), chromecast: template("<div class=\"chromecast-playback\"><div class=\"chromecast-playback-overlay\"></div></div>"), dvr_controls: template("<div class=\"live-info\">LIVE</div><button class=\"live-button\">BACK TO LIVE</button>"), poster: template("<div class=\"play-wrapper\" data-poster><span class=\"poster-icon play\" data-poster/></div>"), spinner_three_bounce: template("<div data-bounce1></div><div data-bounce2></div><div data-bounce3></div>"), watermark: template("<div data-watermark data-watermark-<%=position %>><img src=\"<%= imageUrl %>\"></div>"), CSS: { container: ".container[data-container]{position:absolute;background-color:#000;height:100%;width:100%}.container[data-container].pointer-enabled{cursor:pointer}", core: "[data-player]{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0);position:relative;margin:0;padding:0;border:0;font-style:normal;font-weight:400;text-align:center;overflow:hidden;font-size:100%;font-family:\"lucida grande\",tahoma,verdana,arial,sans-serif;text-shadow:0 0 0;box-sizing:border-box}[data-player] a,[data-player] abbr,[data-player] acronym,[data-player] address,[data-player] applet,[data-player] article,[data-player] aside,[data-player] audio,[data-player] b,[data-player] big,[data-player] blockquote,[data-player] canvas,[data-player] caption,[data-player] center,[data-player] cite,[data-player] code,[data-player] dd,[data-player] del,[data-player] details,[data-player] dfn,[data-player] div,[data-player] dl,[data-player] dt,[data-player] em,[data-player] embed,[data-player] fieldset,[data-player] figcaption,[data-player] figure,[data-player] footer,[data-player] form,[data-player] h1,[data-player] h2,[data-player] h3,[data-player] h4,[data-player] h5,[data-player] h6,[data-player] header,[data-player] hgroup,[data-player] i,[data-player] iframe,[data-player] img,[data-player] ins,[data-player] kbd,[data-player] label,[data-player] legend,[data-player] li,[data-player] mark,[data-player] menu,[data-player] nav,[data-player] object,[data-player] ol,[data-player] output,[data-player] p,[data-player] pre,[data-player] q,[data-player] ruby,[data-player] s,[data-player] samp,[data-player] section,[data-player] small,[data-player] span,[data-player] strike,[data-player] strong,[data-player] sub,[data-player] summary,[data-player] sup,[data-player] table,[data-player] tbody,[data-player] td,[data-player] tfoot,[data-player] th,[data-player] thead,[data-player] time,[data-player] tr,[data-player] tt,[data-player] u,[data-player] ul,[data-player] var,[data-player] video{margin:0;padding:0;border:0;font:inherit;font-size:100%;vertical-align:baseline}[data-player] table{border-collapse:collapse;border-spacing:0}[data-player] caption,[data-player] td,[data-player] th{text-align:left;font-weight:400;vertical-align:middle}[data-player] blockquote,[data-player] q{quotes:none}[data-player] blockquote:after,[data-player] blockquote:before,[data-player] q:after,[data-player] q:before{content:\"\";content:none}[data-player] a img{border:none}[data-player] *{max-width:initial;box-sizing:inherit;float:initial}[data-player].fullscreen{width:100%!important;height:100%!important}[data-player].nocursor{cursor:none}.clappr-style{display:none!important}@media screen{[data-player]{opacity:.99}}", media_control: "@font-face{font-family:Player;src:url(\"<%= baseUrl %>/assets/Player-Regular.eot\");src:url(\"<%= baseUrl %>/assets/Player-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"<%= baseUrl %>/assets/Player-Regular.ttf\") format(\"truetype\"),url(\"<%= baseUrl %>/assets/Player-Regular.svg#player\") format(\"svg\")}.media-control-notransition{-webkit-transition:none!important;-webkit-transition-delay:0s;-moz-transition:none!important;-o-transition:none!important;transition:none!important}.media-control[data-media-control]{position:absolute;width:100%;height:100%;z-index:9999;pointer-events:none}.media-control[data-media-control].dragging{pointer-events:auto;cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control].dragging *{cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control] .media-control-background[data-background]{position:absolute;height:40%;width:100%;bottom:0;background-image:-owg(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-webkit(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-moz(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-o(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9));-webkit-transition:opacity .6s;-webkit-transition-delay:ease-out;-moz-transition:opacity .6s ease-out;-o-transition:opacity .6s ease-out;transition:opacity .6s ease-out}.media-control[data-media-control] .media-control-icon{font-family:Player;font-weight:400;font-style:normal;font-size:26px;line-height:32px;letter-spacing:0;speak:none;color:#fff;opacity:.5;vertical-align:middle;text-align:left;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.media-control[data-media-control] .media-control-icon:hover{color:#fff;opacity:.75;text-shadow:rgba(255,255,255,.8) 0 0 5px}.media-control[data-media-control].media-control-hide .media-control-background[data-background]{opacity:0}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls]{bottom:-50px}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls]{position:absolute;bottom:7px;width:100%;height:32px;vertical-align:middle;pointer-events:auto;-webkit-transition:bottom .4s;-webkit-transition-delay:ease-out;-moz-transition:bottom .4s ease-out;-o-transition:bottom .4s ease-out;transition:bottom .4s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-left-panel[data-media-control]{position:absolute;top:0;left:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-center-panel[data-media-control]{height:100%;text-align:center;line-height:32px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-right-panel[data-media-control]{position:absolute;top:0;right:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button{background-color:transparent;border:0;margin:0 6px;padding:0;cursor:pointer;display:inline-block}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button:focus{outline:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]:before{content:\"\\e002\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]:before{content:\"\\e003\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]{float:right;background-color:transparent;border:0;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]:before{content:\"\\e006\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen].shrink:before{content:\"\\e007\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]{cursor:default;float:right;background-color:transparent;border:0;height:100%;opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]:before{content:\"\\e008\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled:hover{opacity:1;text-shadow:none}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].playing:before{content:\"\\e002\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].paused:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].playing:before{content:\"\\e003\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].stopped:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration],.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{display:inline-block;font-size:10px;color:#fff;cursor:default;line-height:32px;position:relative}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{margin-left:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]{color:rgba(255,255,255,.5);margin-right:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]:before{content:\"|\";margin:0 3px}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]{position:absolute;top:-20px;left:0;display:inline-block;vertical-align:middle;width:100%;height:25px;cursor:pointer}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar]{width:100%;height:1px;position:relative;top:12px;background-color:#666}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-1[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#c2c2c2;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#005aff;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0;position:absolute;top:-3px;width:5px;height:7px;background-color:rgba(255,255,255,.5);-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled{cursor:default}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{position:absolute;top:2px;left:0;width:20px;height:20px;opacity:1;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] .bar-scrubber-icon[data-seekbar]{position:absolute;left:6px;top:6px;width:8px;height:8px;border-radius:10px;box-shadow:0 0 0 6px rgba(255,255,255,.2);background-color:#fff}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume]{float:right;display:inline-block;height:32px;cursor:pointer;margin:0 6px;box-sizing:border-box}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume]{float:left;bottom:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]{background-color:transparent;border:0;box-sizing:content-box;width:16px;height:32px;margin-right:6px;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:hover{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:before{content:\"\\e004\"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted{opacity:.5}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:hover{opacity:.7}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:before{content:\"\\e005\"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume]{float:left;position:relative;top:6px;width:42px;height:18px;padding:3px 0;overflow:hidden;-webkit-transition:width .2s;-webkit-transition-delay:ease-out;-moz-transition:width .2s ease-out;-o-transition:width .2s ease-out;transition:width .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]{float:left;width:4px;padding-left:2px;height:12px;opacity:.5;-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;-webkit-transition:-webkit-transform .2s;-webkit-transition-delay:ease-out;-moz-transition:-moz-transform .2s ease-out;-o-transition:-o-transform .2s ease-out;transition:transform .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume].fill{-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:nth-of-type(1){padding-left:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:hover{-webkit-transform:scaleY(1.5);-moz-transform:scaleY(1.5);-ms-transform:scaleY(1.5);-o-transform:scaleY(1.5);transform:scaleY(1.5)}.media-control[data-media-control].w320 .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume].volume-bar-hide{height:12px;top:9px;padding:0;width:0}", seek_time: ".seek-time[data-seek-time]{position:absolute;width:auto;height:20px;line-height:20px;bottom:55px;background-color:rgba(2,2,2,.5);z-index:9999;-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.seek-time[data-seek-time].hidden[data-seek-time]{opacity:0}.seek-time[data-seek-time] span[data-seek-time]{position:relative;color:#fff;font-size:10px;padding-left:7px;padding-right:7px}", flash: "[data-flash]{position:absolute;height:100%;width:100%;background-color:#000;display:block;pointer-events:none}", hls: "[data-hls]{position:absolute;display:block;pointer-events:none;top:0}", html5_video: "[data-html5-video]{position:absolute;height:100%;width:100%;display:block}", html_img: "[data-html-img]{max-width:100%;max-height:100%}", no_op: "[data-no-op]{z-index:1000;position:absolute;height:100%;width:100%;text-align:center}[data-no-op] p[data-no-op-msg]{position:absolute;font-size:25px;top:40%;color:#fff}[data-no-op] canvas[data-no-op-canvas]{background-color:#777;height:100%;width:100%}", background_button: ".background-button[data-background-button]{font-family:Player;position:absolute;height:100%;width:100%;background-color:rgba(0,0,0,.2);pointer-events:none;-webkit-transition:all .4s;-webkit-transition-delay:ease-out;-moz-transition:all .4s ease-out;-o-transition:all .4s ease-out;transition:all .4s ease-out}.background-button[data-background-button].hide{background-color:transparent}.background-button[data-background-button].hide .background-button-wrapper[data-background-button]{opacity:0}.background-button[data-background-button] .background-button-wrapper[data-background-button]{position:absolute;overflow:hidden;width:100%;height:25%;line-height:100%;font-size:25%;top:50%;text-align:center}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button]{cursor:pointer;pointer-events:auto;font-family:Player;font-weight:400;font-style:normal;line-height:1;letter-spacing:0;speak:none;color:#fff;opacity:.75;border:0;outline:0;background-color:transparent;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button]:hover{opacity:1;text-shadow:rgba(255,255,255,.8) 0 0 15px}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playing:before{content:\"\\e002\"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].notplaying:before{content:\"\\e001\"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playstop.playing:before{content:\"\\e003\"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playstop.notplaying:before{content:\"\\e001\"}.media-control.media-control-hide[data-media-control] .background-button[data-background-button]{opacity:0}", chromecast: ".chromecast-playback{height:100%;width:100%}.chromecast-playback-overlay{background-color:#000;height:100%;opacity:.6;width:100%}@font-face{font-family:chromecast;src:url(assets/chromecast.eot?-2rwb6t);src:url(assets/chromecast.eot?#iefix-2rwb6t) format(\"embedded-opentype\"),url(assets/chromecast.woff?-2rwb6t) format(\"woff\"),url(assets/chromecast.ttf?-2rwb6t) format(\"truetype\"),url(assets/chromecast.svg?-2rwb6t#chromecast) format(\"svg\");font-weight:400;font-style:normal}.chromecast-button{background:0 0;border:0;width:32px;height:26px;font-size:22px;line-height:26px;letter-spacing:0;color:#fff;opacity:.5;vertical-align:middle;text-align:left;cursor:pointer;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.chromecast-button:hover{opacity:.75;text-shadow:rgba(255,255,255,.8) 0 0 5px}.chromecast-button:focus{outline:0}.chromecast-icon{font-family:chromecast;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-cast:before{content:\"\\e600\"}.icon-cast-connected:before{content:\"\\e601\"}", dvr_controls: "@import url(http://fonts.googleapis.com/css?family=Roboto);.dvr-controls[data-dvr-controls]{display:inline-block;float:left;color:#fff;line-height:32px;font-size:10px;font-weight:700;margin-left:6px}.dvr-controls[data-dvr-controls] .live-info{cursor:default;font-family:Roboto,\"Open Sans\",Arial,sans-serif}.dvr-controls[data-dvr-controls] .live-info:before{content:\"\";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#ff0101}.dvr-controls[data-dvr-controls] .live-info.disabled{opacity:.3}.dvr-controls[data-dvr-controls] .live-info.disabled:before{background-color:#fff}.dvr-controls[data-dvr-controls] .live-button{cursor:pointer;outline:0;display:none;border:0;color:#fff;background-color:transparent;height:32px;padding:0;opacity:.7;font-family:Roboto,\"Open Sans\",Arial,sans-serif;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.dvr-controls[data-dvr-controls] .live-button:before{content:\"\";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#fff}.dvr-controls[data-dvr-controls] .live-button:hover{opacity:1;text-shadow:rgba(255,255,255,.75) 0 0 5px}.dvr .dvr-controls[data-dvr-controls] .live-info{display:none}.dvr .dvr-controls[data-dvr-controls] .live-button{display:block}.dvr.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#005aff}.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#ff0101}.seek-time[data-seek-time] span[data-duration]{position:relative;color:rgba(255,255,255,.5);font-size:10px;padding-right:7px}.seek-time[data-seek-time] span[data-duration]:before{content:\"|\";margin-right:7px}", poster: "@font-face{font-family:Player;src:url(\"<%= baseUrl %>/assets/Player-Regular.eot\");src:url(\"<%= baseUrl %>/assets/Player-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"<%= baseUrl %>/assets/Player-Regular.ttf\") format(\"truetype\"),url(\"<%= baseUrl %>/assets/Player-Regular.svg#player\") format(\"svg\")}.player-poster[data-poster]{cursor:pointer;position:absolute;height:100%;width:100%;z-index:998;top:0}.player-poster[data-poster] .poster-background[data-poster]{width:100%;height:100%;background-size:cover;background-repeat:no-repeat;background-position:50% 50%}.player-poster[data-poster] .play-wrapper[data-poster]{position:absolute;width:100%;height:25%;line-height:100%;font-size:25%;top:50%;text-align:center}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]{font-family:Player;font-weight:400;font-style:normal;line-height:1;letter-spacing:0;speak:none;color:#fff;opacity:.75;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:opacity text-shadow;-webkit-transition-delay:.1s;-moz-transition:opacity text-shadow .1s;-o-transition:opacity text-shadow .1s;transition:opacity text-shadow .1s ease}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster].play[data-poster]:before{content:\"\\e001\"}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]:hover{opacity:1;text-shadow:rgba(255,255,255,.8) 0 0 15px}", spinner_three_bounce: ".spinner-three-bounce[data-spinner]{position:absolute;margin:0 auto;width:70px;text-align:center;z-index:999;top:47%;left:0;right:0}.spinner-three-bounce[data-spinner]>div{width:18px;height:18px;background-color:#FFF;border-radius:100%;display:inline-block;-webkit-animation:bouncedelay 1.4s infinite ease-in-out;-moz-animation:bouncedelay 1.4s infinite ease-in-out;-ms-animation:bouncedelay 1.4s infinite ease-in-out;-o-animation:bouncedelay 1.4s infinite ease-in-out;animation:bouncedelay 1.4s infinite ease-in-out;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both}.spinner-three-bounce[data-spinner] [data-bounce1],.spinner-three-bounce[data-spinner] [data-bounce2]{-webkit-animation-delay:-.32s;-moz-animation-delay:-.32s;-ms-animation-delay:-.32s;-o-animation-delay:-.32s;animation-delay:-.32s}@-moz-keyframes bouncedelay{0%,100%,80%{-moz-transform:scale(0);transform:scale(0)}40%{-moz-transform:scale(1);transform:scale(1)}}@-webkit-keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@-o-keyframes bouncedelay{0%,100%,80%{-o-transform:scale(0);transform:scale(0)}40%{-o-transform:scale(1);transform:scale(1)}}@-ms-keyframes bouncedelay{0%,100%,80%{-ms-transform:scale(0);transform:scale(0)}40%{-ms-transform:scale(1);transform:scale(1)}}@keyframes bouncedelay{0%,100%,80%{transform:scale(0)}40%{transform:scale(1)}}", watermark: "[data-watermark]{position:absolute;margin:100px auto 0;width:70px;text-align:center;z-index:10}[data-watermark-bottom-left]{bottom:10px;left:10px}[data-watermark-bottom-right]{bottom:10px;right:42px}[data-watermark-top-left]{top:-95px;left:10px}[data-watermark-top-right]{top:-95px;right:37px}" } };

},{"template":"template"}],48:[function(require,module,exports){
// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

"use strict";

var $ = require("zepto");
var template = require("template");
var JST = require("./jst");

var Styler = {
  getStyleFor: function getStyleFor(name) {
    var options = arguments[1] === undefined ? { baseUrl: "" } : arguments[1];

    return $("<style class=\"clappr-style\"></style>").html(template(JST.CSS[name])(options));
  }
};

module.exports = Styler;

},{"./jst":47,"template":"template","zepto":"zepto"}],49:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var assign = require("lodash.assign");
var Browser = require("browser");

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
      };
      return value;
    }
    return 0;
  }).reduce(function (a, b) {
    return a + b;
  }) : 0;
};

var idCounter = 0;

var uniqueId = function uniqueId(prefix) {
  var id = ++idCounter;
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

},{"browser":"browser","lodash.assign":2}],50:[function(require,module,exports){
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

var UIObject = require("ui_object");
var Styler = require("../../base/styler");
var Events = require("events");
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

},{"../../base/styler":48,"events":"events","lodash.find":12,"ui_object":"ui_object"}],51:[function(require,module,exports){
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
var BaseObject = require("base_object");
var Container = require("container");
var $ = require("zepto");
var Events = require("events");
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

},{"base_object":"base_object","container":"container","events":"events","lodash.assign":2,"lodash.find":12,"zepto":"zepto"}],52:[function(require,module,exports){
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
var $ = require("zepto");

var UIObject = require("ui_object");
var ContainerFactory = require("../container_factory");
var Fullscreen = require("../../base/utils").Fullscreen;
var Styler = require("../../base/styler");
var MediaControl = require("media_control");
var PlayerInfo = require("player_info");
var Mediator = require("mediator");
var Events = require("events");

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

},{"../../base/styler":48,"../../base/utils":49,"../container_factory":52,"events":"events","lodash.assign":2,"lodash.find":12,"media_control":"media_control","mediator":"mediator","player_info":"player_info","ui_object":"ui_object","zepto":"zepto"}],54:[function(require,module,exports){
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

var BaseObject = require("base_object");
var Core = require("core");

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

},{"base_object":"base_object","core":"core"}],55:[function(require,module,exports){
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

var BaseObject = require("base_object");
var PlayerInfo = require("player_info");
var uniq = require("lodash.uniq");

/* Playback Plugins */
var HTML5VideoPlayback = require("html5_video");
var FlashVideoPlayback = require("flash");
var HTML5AudioPlayback = require("html5_audio");
var HLSVideoPlayback = require("hls");
var HTMLImgPlayback = require("html_img");
var NoOp = require("../../playbacks/no_op");

/* Container Plugins */
var SpinnerThreeBouncePlugin = require("../../plugins/spinner_three_bounce");
var StatsPlugin = require("../../plugins/stats");
var WaterMarkPlugin = require("../../plugins/watermark");
var PosterPlugin = require("poster");
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

},{"../../playbacks/no_op":67,"../../plugins/click_to_pause":70,"../../plugins/dvr_controls":72,"../../plugins/google_analytics":74,"../../plugins/spinner_three_bounce":78,"../../plugins/stats":80,"../../plugins/watermark":82,"base_object":"base_object","flash":"flash","hls":"hls","html5_audio":"html5_audio","html5_video":"html5_video","html_img":"html_img","lodash.uniq":31,"player_info":"player_info","poster":"poster"}],58:[function(require,module,exports){
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

var $ = require("zepto");
var JST = require("../../base/jst");
var Styler = require("../../base/styler");
var UIObject = require("ui_object");
var Utils = require("../../base/utils");
var Browser = require("browser");
var SeekTime = require("../seek_time");
var Mediator = require("mediator");
var PlayerInfo = require("player_info");
var Events = require("events");
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

},{"../../base/jst":47,"../../base/kibo":"kibo","../../base/styler":48,"../../base/utils":49,"../seek_time":60,"browser":"browser","events":"events","mediator":"mediator","player_info":"player_info","ui_object":"ui_object","zepto":"zepto"}],59:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var BaseObject = require("base_object");
var CoreFactory = require("./core_factory");
var Loader = require("./loader");
var assign = require("lodash.assign");
var PlayerInfo = require("player_info");

var Player = (function (_BaseObject) {
  function Player(options) {
    _classCallCheck(this, Player);

    _get(Object.getPrototypeOf(Player.prototype), "constructor", this).call(this, options);
    window.p = this;
    var defaultOptions = { persistConfig: true, width: 640, height: 360, baseUrl: "http://cdn.clappr.io/latest" };
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

},{"./core_factory":55,"./loader":56,"base_object":"base_object","lodash.assign":2,"player_info":"player_info"}],60:[function(require,module,exports){
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

var UIObject = require("ui_object");
var Styler = require("../../base/styler");
var JST = require("../../base/jst");
var formatTime = require("../../base/utils").formatTime;
var Events = require("events");

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

},{"../../base/jst":47,"../../base/styler":48,"../../base/utils":49,"events":"events","ui_object":"ui_object"}],62:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Playback = require("playback");
var Styler = require("../../base/styler");
var JST = require("../../base/jst");
var Mediator = require("mediator");
var template = require("template");
var $ = require("zepto");
var Browser = require("browser");
var seekStringToSeconds = require("../../base/utils").seekStringToSeconds;
var Events = require("events");
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

},{"../../base/jst":47,"../../base/kibo":"kibo","../../base/styler":48,"../../base/utils":49,"browser":"browser","events":"events","mediator":"mediator","playback":"playback","template":"template","zepto":"zepto"}],63:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Playback = require("playback");
var JST = require("../../base/jst");
var assign = require("lodash.assign");
var template = require("template");

var Mediator = require("mediator");
var Browser = require("browser");
var Events = require("events");
var Styler = require("../../base/styler");
var $ = require("zepto");

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
    getLastProgramDate: {
      value: function getLastProgramDate() {
        var programDate = this.el.globoGetLastProgramDate();
        // normalizing for BRT
        return programDate - 10800000;
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

},{"../../base/jst":47,"../../base/styler":48,"browser":"browser","events":"events","lodash.assign":2,"mediator":"mediator","playback":"playback","template":"template","zepto":"zepto"}],64:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Playback = require("playback");
var Events = require("events");
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

},{"events":"events","lodash.find":12,"playback":"playback"}],65:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Playback = require("playback");
var JST = require("../../base/jst");
var Kibo = require("../../base/kibo");
var Styler = require("../../base/styler");
var Browser = require("browser");
var seekStringToSeconds = require("../../base/utils").seekStringToSeconds;
var Events = require("events");
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

},{"../../base/jst":47,"../../base/kibo":"kibo","../../base/styler":48,"../../base/utils":49,"browser":"browser","events":"events","lodash.find":12,"playback":"playback"}],66:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Playback = require("playback");
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

},{"../../base/styler":48,"playback":"playback"}],67:[function(require,module,exports){
"use strict";

module.exports = require("./no_op");

},{"./no_op":68}],68:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Playback = require("playback");
var JST = require("../../base/jst");
var Styler = require("../../base/styler");
var Events = require("events");

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

},{"../../base/jst":47,"../../base/styler":48,"events":"events","playback":"playback"}],69:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

//Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var ContainerPlugin = require("container_plugin");
var Events = require("events");

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

},{"container_plugin":"container_plugin","events":"events"}],70:[function(require,module,exports){
"use strict";

module.exports = require("./click_to_pause");

},{"./click_to_pause":69}],71:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var UICorePlugin = require("ui_core_plugin");
var JST = require("../../base/jst");
var Styler = require("../../base/styler");
var Events = require("events");
var $ = require("zepto");

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

},{"../../base/jst":47,"../../base/styler":48,"events":"events","ui_core_plugin":"ui_core_plugin","zepto":"zepto"}],72:[function(require,module,exports){
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

var ContainerPlugin = require("container_plugin");
var Events = require("events");

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

},{"container_plugin":"container_plugin","events":"events"}],74:[function(require,module,exports){
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

var UIContainerPlugin = require("ui_container_plugin");
var Styler = require("../../base/styler");
var JST = require("../../base/jst");
var Events = require("events");

var Mediator = require("mediator");
var PlayerInfo = require("player_info");

var $ = require("zepto");

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

},{"../../base/jst":47,"../../base/styler":48,"events":"events","mediator":"mediator","player_info":"player_info","ui_container_plugin":"ui_container_plugin","zepto":"zepto"}],78:[function(require,module,exports){
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

var UIContainerPlugin = require("ui_container_plugin");
var Styler = require("../../base/styler");
var JST = require("../../base/jst");
var Events = require("events");

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

},{"../../base/jst":47,"../../base/styler":48,"events":"events","ui_container_plugin":"ui_container_plugin"}],80:[function(require,module,exports){
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

var ContainerPlugin = require("container_plugin");
var $ = require("zepto");
var Events = require("events");

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

},{"container_plugin":"container_plugin","events":"events","zepto":"zepto"}],82:[function(require,module,exports){
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

var UIContainerPlugin = require("ui_container_plugin");
var Styler = require("../../base/styler");
var JST = require("../../base/jst");
var Events = require("events");

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

},{"../../base/jst":47,"../../base/styler":48,"events":"events","ui_container_plugin":"ui_container_plugin"}],"base_object":[function(require,module,exports){
"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var uniqueId = require("./utils").uniqueId;
var Events = require("events");

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

},{"./utils":49,"events":"events"}],"browser":[function(require,module,exports){
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

var BaseObject = require("base_object");

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

},{"base_object":"base_object"}],"container":[function(require,module,exports){
"use strict";

module.exports = require("./container");

},{"./container":50}],"core_plugin":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var BaseObject = require("base_object");

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

},{"base_object":"base_object"}],"core":[function(require,module,exports){
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

var Events = require("events");

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

},{"events":"events"}],"playback":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var UIObject = require("ui_object");

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

},{"ui_object":"ui_object"}],"player_info":[function(require,module,exports){
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

var UIObject = require("ui_object");

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

},{"ui_object":"ui_object"}],"ui_core_plugin":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var UIObject = require("ui_object");

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

},{"ui_object":"ui_object"}],"ui_object":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var $ = require("zepto");
var uniqueId = require("./utils").uniqueId;
var result = require("lodash.result");
var assign = require("lodash.assign");
var BaseObject = require("base_object");

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

},{"./utils":49,"base_object":"base_object","lodash.assign":2,"lodash.result":29,"zepto":"zepto"}],"zepto":[function(require,module,exports){
/* Zepto v1.1.4-80-ga9184b2 - zepto event ajax callbacks deferred touch selector ie - zeptojs.com/license */
var Zepto=function(){function D(t){return null==t?String(t):j[S.call(t)]||"object"}function L(t){return"function"==D(t)}function k(t){return null!=t&&t==t.window}function Z(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function $(t){return"object"==D(t)}function F(t){return $(t)&&!k(t)&&Object.getPrototypeOf(t)==Object.prototype}function R(t){return"number"==typeof t.length}function q(t){return s.call(t,function(t){return null!=t})}function W(t){return t.length>0?n.fn.concat.apply([],t):t}function z(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function H(t){return t in c?c[t]:c[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function _(t,e){return"number"!=typeof e||l[z(t)]?e:e+"px"}function I(t){var e,n;return f[t]||(e=u.createElement(t),u.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),f[t]=n),f[t]}function U(t){return"children"in t?a.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function X(t,e){var n,i=t?t.length:0;for(n=0;i>n;n++)this[n]=t[n];this.length=i,this.selector=e||""}function B(n,i,r){for(e in i)r&&(F(i[e])||A(i[e]))?(F(i[e])&&!F(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function V(t,e){return null==e?n(t):n(t).filter(e)}function Y(t,e,n,i){return L(e)?e.call(t,n,i):e}function J(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function G(e,n){var i=e.className||"",r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function K(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?n.parseJSON(t):t):t}catch(e){return t}}function Q(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)Q(t.childNodes[n],e)}var t,e,n,i,N,P,r=[],o=r.concat,s=r.filter,a=r.slice,u=window.document,f={},c={},l={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},h=/^\s*<(\w+|!)[^>]*>/,p=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,d=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,m=/^(?:body|html)$/i,g=/([A-Z])/g,v=["val","css","html","text","data","width","height","offset"],y=["after","prepend","before","append"],w=u.createElement("table"),x=u.createElement("tr"),b={tr:u.createElement("tbody"),tbody:w,thead:w,tfoot:w,td:x,th:x,"*":u.createElement("div")},E=/complete|loaded|interactive/,T=/^[\w-]*$/,j={},S=j.toString,C={},O=u.createElement("div"),M={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return C.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~C.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},N=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},P=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},C.fragment=function(e,i,r){var o,s,f;return p.test(e)&&(o=n(u.createElement(RegExp.$1))),o||(e.replace&&(e=e.replace(d,"<$1></$2>")),i===t&&(i=h.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,o=n.each(a.call(f.childNodes),function(){f.removeChild(this)})),F(r)&&(s=n(o),n.each(r,function(t,e){v.indexOf(t)>-1?s[t](e):s.attr(t,e)})),o},C.Z=function(t,e){return new X(t,e)},C.isZ=function(t){return t instanceof C.Z},C.init=function(e,i){var r;if(!e)return C.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&h.test(e))r=C.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=C.qsa(u,e)}else{if(L(e))return n(u).ready(e);if(C.isZ(e))return e;if(A(e))r=q(e);else if($(e))r=[e],e=null;else if(h.test(e))r=C.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=C.qsa(u,e)}}return C.Z(r,e)},n=function(t,e){return C.init(t,e)},n.extend=function(t){var e,n=a.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},C.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],o=i||r?e.slice(1):e,s=T.test(o);return t.getElementById&&s&&i?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:a.call(s&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=u.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=D,n.isFunction=L,n.isWindow=k,n.isArray=A,n.isPlainObject=F,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=N,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.noop=function(){},n.map=function(t,e){var n,r,o,i=[];if(R(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return W(i)},n.each=function(t,e){var n,i;if(R(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={constructor:C.Z,length:0,forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,splice:r.splice,indexOf:r.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=C.isZ(e)?e.toArray():e;return o.apply(C.isZ(this)?this.toArray():this,n)},map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(a.apply(this,arguments))},ready:function(t){return E.test(u.readyState)&&u.body?t(n):u.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?a.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return L(t)?this.not(this.not(t)):n(s.call(this,function(e){return C.matches(e,t)}))},add:function(t,e){return n(P(this.concat(n(t,e))))},is:function(t){return this.length>0&&C.matches(this[0],t)},not:function(e){var i=[];if(L(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):R(e)&&L(e.item)?a.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return $(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!$(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!$(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(C.qsa(this[0],t)):this.map(function(){return C.qsa(this,t)}):n()},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:C.matches(i,t));)i=i!==e&&!Z(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!Z(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return V(e,t)},parent:function(t){return V(P(this.pluck("parentNode")),t)},children:function(t){return V(this.map(function(){return U(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||a.call(this.childNodes)})},siblings:function(t){return V(this.map(function(t,e){return s.call(U(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=L(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=L(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(Y(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=Y(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if($(n))for(e in n)J(this,e,n[e]);else J(this,n,Y(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){J(this,t)},this)})},prop:function(t,e){return t=M[t]||t,1 in arguments?this.each(function(n){this[t]=Y(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(g,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?K(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=Y(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=Y(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;if(!n.contains(u.documentElement,this[0]))return{top:0,left:0};var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r,o=this[0];if(!o)return;if(r=getComputedStyle(o,""),"string"==typeof t)return o.style[N(t)]||r.getPropertyValue(t);if(A(t)){var s={};return n.each(t,function(t,e){s[e]=o.style[N(e)]||r.getPropertyValue(e)}),s}}var a="";if("string"==D(t))i||0===i?a=z(t)+":"+_(t,i):this.each(function(){this.style.removeProperty(z(t))});else for(e in t)t[e]||0===t[e]?a+=z(e)+":"+_(e,t[e])+";":this.each(function(){this.style.removeProperty(z(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(G(t))},H(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var r=G(this),o=Y(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&G(this,r+(r?" ":"")+i.join(" "))}}):this},removeClass:function(e){return this.each(function(n){if("className"in this){if(e===t)return G(this,"");i=G(this),Y(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(H(t)," ")}),G(this,i.trim())}})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=Y(this,e,r,G(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=m.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||u.body;t&&!m.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?k(s)?s["inner"+i]:Z(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,Y(this,r,t,s[e]()))})}}),y.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=D(e),"object"==t||"array"==t||null==e?e:C.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null;var f=n.contains(u.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,a),f&&Q(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),C.Z.prototype=X.prototype=n.fn,C.uniq=P,C.deserializeValue=K,n.zepto=C,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=T(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function T(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=w,r&&r.apply(i,arguments)},e[n]=x}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=w)),e}function j(t){var e,i={originalEvent:t};for(e in t)b.test(e)||t[e]===n||(i[e]=t[e]);return T(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var w=function(){return!0},x=function(){return!1},b=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(u===n||a===!1)&&(u=a,a=n),u===!1&&(u=x),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(j(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=x),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):T(e),e._args=n,this.each(function(){e.type in f&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=j(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),T(n)}}(Zepto),function(t){function h(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function p(t,e,i,r){return t.global?h(e||n,i,r):void 0}function d(e){e.global&&0===t.active++&&p(e,null,"ajaxStart")}function m(e){e.global&&!--t.active&&p(e,null,"ajaxStop")}function g(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||p(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void p(e,n,"ajaxSend",[t,e])}function v(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),p(n,r,"ajaxSuccess",[e,n,t]),w(o,e,n)}function y(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),p(i,o,"ajaxError",[n,i,t||e]),w(e,n,i)}function w(t,e,n){var i=n.context;n.complete.call(i,e,t),p(n,i,"ajaxComplete",[e,n]),m(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function E(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function T(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=E(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function C(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?C(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/,l=n.createElement("a");l.href=window.location.href,t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?v(f[0],l,i,r):y(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),g(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var a,u,o=t.extend({},e||{}),s=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===o[i]&&(o[i]=t.ajaxSettings[i]);d(o),o.crossDomain||(a=n.createElement("a"),a.href=o.url,a.href=a.href,o.crossDomain=l.protocol+"//"+l.host!=a.protocol+"//"+a.host),o.url||(o.url=window.location.toString()),(u=o.url.indexOf("#"))>-1&&(o.url=o.url.slice(0,u)),T(o);var f=o.dataType,h=/\?.+=\?/.test(o.url);if(h&&(f="jsonp"),o.cache!==!1&&(e&&e.cache===!0||"script"!=f&&"jsonp"!=f)||(o.url=E(o.url,"_="+Date.now())),"jsonp"==f)return h||(o.url=E(o.url,o.jsonp?o.jsonp+"=?":o.jsonp===!1?"":"callback=?")),t.ajaxJSONP(o,s);var N,p=o.accepts[f],m={},w=function(t,e){m[t.toLowerCase()]=[t,e]},j=/^([\w-]+:)\/\//.test(o.url)?RegExp.$1:window.location.protocol,S=o.xhr(),C=S.setRequestHeader;if(s&&s.promise(S),o.crossDomain||w("X-Requested-With","XMLHttpRequest"),w("Accept",p||"*/*"),(p=o.mimeType||p)&&(p.indexOf(",")>-1&&(p=p.split(",",2)[0]),S.overrideMimeType&&S.overrideMimeType(p)),(o.contentType||o.contentType!==!1&&o.data&&"GET"!=o.type.toUpperCase())&&w("Content-Type",o.contentType||"application/x-www-form-urlencoded"),o.headers)for(r in o.headers)w(r,o.headers[r]);if(S.setRequestHeader=w,S.onreadystatechange=function(){if(4==S.readyState){S.onreadystatechange=x,clearTimeout(N);var e,n=!1;if(S.status>=200&&S.status<300||304==S.status||0==S.status&&"file:"==j){f=f||b(o.mimeType||S.getResponseHeader("content-type")),e=S.responseText;try{"script"==f?(1,eval)(e):"xml"==f?e=S.responseXML:"json"==f&&(e=c.test(e)?null:t.parseJSON(e))}catch(i){n=i}n?y(n,"parsererror",S,o,s):v(e,S,o,s)}else y(S.statusText||null,S.status?"error":"abort",S,o,s)}},g(S,o)===!1)return S.abort(),y(null,"abort",S,o,s),S;if(o.xhrFields)for(r in o.xhrFields)S[r]=o.xhrFields[r];var P="async"in o?o.async:!0;S.open(o.type,o.url,P,o.username,o.password);for(r in m)C.apply(S,m[r]);return o.timeout>0&&(N=setTimeout(function(){S.onreadystatechange=x,S.abort(),y(null,"timeout",S,o,s)},o.timeout)),S.send(o.data?o.data:null),S},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var S=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(S(e)+"="+S(n))},C(i,e,n),i.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.Callbacks=function(e){e=t.extend({},e);var n,i,r,o,s,a,u=[],f=!e.once&&[],c=function(t){for(n=e.memory&&t,i=!0,a=o||0,o=0,s=u.length,r=!0;u&&s>a;++a)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}r=!1,u&&(f?f.length&&c(f.shift()):n?u.length=0:l.disable())},l={add:function(){if(u){var i=u.length,a=function(n){t.each(n,function(t,n){"function"==typeof n?e.unique&&l.has(n)||u.push(n):n&&n.length&&"string"!=typeof n&&a(n)})};a(arguments),r?s=u.length:n&&(o=i,c(n))}return this},remove:function(){return u&&t.each(arguments,function(e,n){for(var i;(i=t.inArray(n,u,i))>-1;)u.splice(i,1),r&&(s>=i&&--s,a>=i&&--a)}),this},has:function(e){return!(!u||!(e?t.inArray(e,u)>-1:u.length))},empty:function(){return s=u.length=0,this},disable:function(){return u=f=n=void 0,this},disabled:function(){return!u},lock:function(){return f=void 0,n||l.disable(),this},locked:function(){return!f},fireWith:function(t,e){return!u||i&&!f||(e=e||[],e=[t,e.slice?e.slice():e],r?f.push(e):c(e)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!i}};return l}}(Zepto),function(t){function n(e){var i=[["resolve","done",t.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",t.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",t.Callbacks({memory:1})]],r="pending",o={state:function(){return r},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var e=arguments;return n(function(n){t.each(i,function(i,r){var a=t.isFunction(e[i])&&e[i];s[r[1]](function(){var e=a&&a.apply(this,arguments);if(e&&t.isFunction(e.promise))e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else{var i=this===o?n.promise():this,s=a?[e]:arguments;n[r[0]+"With"](i,s)}})}),e=null}).promise()},promise:function(e){return null!=e?t.extend(e,o):o}},s={};return t.each(i,function(t,e){var n=e[2],a=e[3];o[e[1]]=n.add,a&&n.add(function(){r=a},i[1^t][2].disable,i[2][2].lock),s[e[0]]=function(){return s[e[0]+"With"](this===s?o:this,arguments),this},s[e[0]+"With"]=n.fireWith}),o.promise(s),e&&e.call(s,s),s}var e=Array.prototype.slice;t.when=function(i){var f,c,l,r=e.call(arguments),o=r.length,s=0,a=1!==o||i&&t.isFunction(i.promise)?o:0,u=1===a?i:n(),h=function(t,n,i){return function(r){n[t]=this,i[t]=arguments.length>1?e.call(arguments):r,i===f?u.notifyWith(n,i):--a||u.resolveWith(n,i)}};if(o>1)for(f=new Array(o),c=new Array(o),l=new Array(o);o>s;++s)r[s]&&t.isFunction(r[s].promise)?r[s].promise().done(h(s,l,r)).fail(u.reject).progress(h(s,c,f)):--a;return a||u.resolveWith(l,r),u.promise()},t.Deferred=n}(Zepto),function(t){function u(t,e,n,i){return Math.abs(t-e)>=Math.abs(n-i)?t-e>0?"Left":"Right":n-i>0?"Up":"Down"}function f(){o=null,e.last&&(e.el.trigger("longTap"),e={})}function c(){o&&clearTimeout(o),o=null}function l(){n&&clearTimeout(n),i&&clearTimeout(i),r&&clearTimeout(r),o&&clearTimeout(o),n=i=r=o=null,e={}}function h(t){return("touch"==t.pointerType||t.pointerType==t.MSPOINTER_TYPE_TOUCH)&&t.isPrimary}function p(t,e){return t.type=="pointer"+e||t.type.toLowerCase()=="mspointer"+e}var n,i,r,o,a,e={},s=750;t(document).ready(function(){var d,m,y,w,g=0,v=0;"MSGesture"in window&&(a=new MSGesture,a.target=document.body),t(document).bind("MSGestureEnd",function(t){var n=t.velocityX>1?"Right":t.velocityX<-1?"Left":t.velocityY>1?"Down":t.velocityY<-1?"Up":null;n&&(e.el.trigger("swipe"),e.el.trigger("swipe"+n))}).on("touchstart MSPointerDown pointerdown",function(i){(!(w=p(i,"down"))||h(i))&&(y=w?i:i.touches[0],i.touches&&1===i.touches.length&&e.x2&&(e.x2=void 0,e.y2=void 0),d=Date.now(),m=d-(e.last||d),e.el=t("tagName"in y.target?y.target:y.target.parentNode),n&&clearTimeout(n),e.x1=y.pageX,e.y1=y.pageY,m>0&&250>=m&&(e.isDoubleTap=!0),e.last=d,o=setTimeout(f,s),a&&w&&a.addPointer(i.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){(!(w=p(t,"move"))||h(t))&&(y=w?t:t.touches[0],c(),e.x2=y.pageX,e.y2=y.pageY,g+=Math.abs(e.x1-e.x2),v+=Math.abs(e.y1-e.y2))}).on("touchend MSPointerUp pointerup",function(o){(!(w=p(o,"up"))||h(o))&&(c(),e.x2&&Math.abs(e.x1-e.x2)>30||e.y2&&Math.abs(e.y1-e.y2)>30?r=setTimeout(function(){e.el.trigger("swipe"),e.el.trigger("swipe"+u(e.x1,e.x2,e.y1,e.y2)),e={}},0):"last"in e&&(30>g&&30>v?i=setTimeout(function(){var i=t.Event("tap");i.cancelTouch=l,e.el.trigger(i),e.isDoubleTap?(e.el&&e.el.trigger("doubleTap"),e={}):n=setTimeout(function(){n=null,e.el&&e.el.trigger("singleTap"),e={}},250)},0):e={}),g=v=0)}).on("touchcancel MSPointerCancel pointercancel",l),t(window).on("scroll",l)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(t){return this.on(e,t)}})}(Zepto),function(t){function r(e){return e=t(e),!(!e.width()&&!e.height())&&"none"!==e.css("display")}function f(t,e){t=t.replace(/=#\]/g,'="#"]');var n,i,r=s.exec(t);if(r&&r[2]in o&&(n=o[r[2]],i=r[3],t=r[1],i)){var a=Number(i);i=isNaN(a)?i.replace(/^["']|["']$/g,""):a}return e(t,n,i)}var e=t.zepto,n=e.qsa,i=e.matches,o=t.expr[":"]={visible:function(){return r(this)?this:void 0},hidden:function(){return r(this)?void 0:this},selected:function(){return this.selected?this:void 0},checked:function(){return this.checked?this:void 0},parent:function(){return this.parentNode},first:function(t){return 0===t?this:void 0},last:function(t,e){return t===e.length-1?this:void 0},eq:function(t,e,n){return t===n?this:void 0},contains:function(e,n,i){return t(this).text().indexOf(i)>-1?this:void 0},has:function(t,n,i){return e.qsa(this,i).length?this:void 0}},s=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),a=/^\s*>/,u="Zepto"+ +new Date;e.qsa=function(i,r){return f(r,function(o,s,f){try{var c;!o&&s?o="*":a.test(o)&&(c=t(i).addClass(u),o="."+u+" "+o);var l=n(i,o)}catch(h){throw console.error("error performing selector: %o",r),h}finally{c&&c.removeClass(u)}return s?e.uniq(t.map(l,function(t,e){return s.call(t,e,l,f)})):l})},e.matches=function(t,e){return f(e,function(e,n,r){return!(e&&!i(t,e)||n&&n.call(t,null,r)!==t)})}}(Zepto),function(){try{getComputedStyle(void 0)}catch(t){var e=getComputedStyle;window.getComputedStyle=function(t){try{return e(t)}catch(n){return null}}}}();
module.exports = Zepto;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL21haW4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vhc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vjb3B5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2gua2V5cy9ub2RlX21vZHVsZXMvbG9kYXNoLmlzYXJndW1lbnRzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2FycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc25hdGl2ZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2NyZWF0ZWFzc2lnbmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlYXNzaWduZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmluZGNhbGxiYWNrL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlYXNzaWduZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC5faXNpdGVyYXRlZWNhbGwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWNhbGxiYWNrL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VjYWxsYmFjay9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZmluZC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlY2FsbGJhY2svbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc3R5cGVkYXJyYXkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWZpbmQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kaW5kZXgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm9uY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm9uY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC5iZWZvcmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnJlc3VsdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gucmVzdWx0L25vZGVfbW9kdWxlcy9sb2Rhc2guaXNmdW5jdGlvbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaW5kZXhvZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9jYWNoZWluZGV4b2YvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZXVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlY2FjaGUvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvanN0LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3N0eWxlci5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvYmFzZS91dGlscy5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb250YWluZXIvY29udGFpbmVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lcl9mYWN0b3J5L2NvbnRhaW5lcl9mYWN0b3J5LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lcl9mYWN0b3J5L2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvcmUvY29yZS5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb3JlX2ZhY3RvcnkvY29yZV9mYWN0b3J5LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvcmVfZmFjdG9yeS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9sb2FkZXIvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9tZWRpYV9jb250cm9sL21lZGlhX2NvbnRyb2wuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvcGxheWVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL3NlZWtfdGltZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9zZWVrX3RpbWUvc2Vla190aW1lLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvZmxhc2gvZmxhc2guanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9obHMvaGxzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfYXVkaW8vaHRtbDVfYXVkaW8uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9odG1sNV92aWRlby9odG1sNV92aWRlby5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWxfaW1nL2h0bWxfaW1nLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3Mvbm9fb3AvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9ub19vcC9ub19vcC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9jbGlja190b19wYXVzZS9jbGlja190b19wYXVzZS5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9jbGlja190b19wYXVzZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9kdnJfY29udHJvbHMvZHZyX2NvbnRyb2xzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL2R2cl9jb250cm9scy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9nb29nbGVfYW5hbHl0aWNzL2dvb2dsZV9hbmFseXRpY3MuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvZ29vZ2xlX2FuYWx5dGljcy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9sb2cvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvbG9nL2xvZy5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9wb3N0ZXIvcG9zdGVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3NwaW5uZXJfdGhyZWVfYm91bmNlL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3NwaW5uZXJfdGhyZWVfYm91bmNlL3NwaW5uZXJfdGhyZWVfYm91bmNlLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3N0YXRzL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3N0YXRzL3N0YXRzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3dhdGVybWFyay9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy93YXRlcm1hcmsvd2F0ZXJtYXJrLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL2Jhc2Vfb2JqZWN0LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2Jyb3dzZXIuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvY29udGFpbmVyX3BsdWdpbi5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb250YWluZXIvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvY29yZV9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvY29yZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvYmFzZS9ldmVudHMuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9mbGFzaC9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2hscy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWw1X2F1ZGlvL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfdmlkZW8vaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9odG1sX2ltZy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2Uvd2VibWVkaWEvcGxheWVyL2NsYXBwci9zcmMvYmFzZS9raWJvLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL21lZGlhX2NvbnRyb2wvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvbWVkaWF0b3IuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvcGxheWJhY2suanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvcGxheWVyX2luZm8uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvcG9zdGVyL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3RlbXBsYXRlLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS93ZWJtZWRpYS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3VpX2NvbnRhaW5lcl9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvdWlfY29yZV9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3dlYm1lZGlhL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvdWlfb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NsYXBwci16ZXB0by96ZXB0by5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNJQSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUMzQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDbEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBOztBQUU5QixNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTs7QUFFcEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUE7QUFDdEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFBOztBQUVyQyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7OztBQ2I5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDLE1BQU07QUFDakIsU0FBSyxDQUFDO0FBQUUsYUFBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQUFBQyxPQUFNO0FBQUEsQUFDdEUsU0FBSyxDQUFDO0FBQUUsYUFBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEFBQzFFLFNBQUssQ0FBQztBQUFFLGFBQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQUFBQyxPQUFNO0FBQUEsQUFDOUUsU0FBSyxDQUFDO0FBQUUsYUFBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQUFBQyxPQUFNO0FBQUEsQUFDbEY7QUFBUyxhQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQUFBQyxPQUFNO0FBQUEsR0FDL0U7Q0FDRixDQUFBOztBQUVELElBQUksYUFBYSxHQUFHLEVBQUMsUUFBUSxFQUFF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QUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUc7QUFDeEYsSUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRztBQUN4TyxLQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUs7Q0FDdEksQ0FBQzs7QUFFRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLENBQUMsWUFBVztBQUNW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QUFFRCxvQkFBZ0I7YUFBQSw0QkFBRztBQUNqQixZQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDMUMsZUFBTyxJQUFJLENBQUE7T0FDWjs7QUFFRCxrQkFBYzthQUFBLDBCQUFHO0FBQ2YsWUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDWixjQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQTtBQUNsRCxjQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQzFDLGNBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQTtBQUM5RCxjQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzVELGNBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO1NBQzVCLE1BQU07QUFDTCxjQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDM0M7T0FDRjs7OztTQXJFRyxRQUFRO0dBQVMsVUFBVTs7QUF3RWpDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFBOzs7QUNwRnpCO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5ZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGxheWVyJylcbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJ21lZGlhdG9yJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxuXG53aW5kb3cuREVCVUcgPSBmYWxzZVxuXG53aW5kb3cuQ2xhcHByID0geyBQbGF5ZXI6IFBsYXllciwgTWVkaWF0b3I6IE1lZGlhdG9yLCBFdmVudHM6IEV2ZW50cyB9XG53aW5kb3cuQ2xhcHByLnZlcnNpb24gPSBcIl9fVkVSU0lPTl9fXCJcblxubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuQ2xhcHByXG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VBc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2Vhc3NpZ24nKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJ2xvZGFzaC5fY3JlYXRlYXNzaWduZXInKTtcblxuLyoqXG4gKiBBc3NpZ25zIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKSB0byB0aGUgZGVzdGluYXRpb25cbiAqIG9iamVjdC4gU3Vic2VxdWVudCBzb3VyY2VzIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLlxuICogSWYgYGN1c3RvbWl6ZXJgIGlzIHByb3ZpZGVkIGl0IGlzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgYXNzaWduZWQgdmFsdWVzLlxuICogVGhlIGBjdXN0b21pemVyYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCBmaXZlIGFyZ3VtZW50cztcbiAqIChvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgZXh0ZW5kXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGN1c3RvbWl6ZXJgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5hc3NpZ24oeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDQwIH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIGRlZmF1bHRzID0gXy5wYXJ0aWFsUmlnaHQoXy5hc3NpZ24sIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICogICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnID8gb3RoZXIgOiB2YWx1ZTtcbiAqIH0pO1xuICpcbiAqIGRlZmF1bHRzKHsgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICdhZ2UnOiAzNiB9LCB7ICd1c2VyJzogJ2ZyZWQnIH0pO1xuICogLy8gPT4geyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfVxuICovXG52YXIgYXNzaWduID0gY3JlYXRlQXNzaWduZXIoYmFzZUFzc2lnbik7XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlQ29weSA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWNvcHknKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnbG9kYXNoLmtleXMnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5hc3NpZ25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmcsXG4gKiBtdWx0aXBsZSBzb3VyY2VzLCBhbmQgYHRoaXNgIGJpbmRpbmcgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmluZyB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ24ob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIHByb3BzID0ga2V5cyhzb3VyY2UpO1xuICBpZiAoIWN1c3RvbWl6ZXIpIHtcbiAgICByZXR1cm4gYmFzZUNvcHkoc291cmNlLCBvYmplY3QsIHByb3BzKTtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF0sXG4gICAgICAgIHZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIodmFsdWUsIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKTtcblxuICAgIGlmICgocmVzdWx0ID09PSByZXN1bHQgPyAocmVzdWx0ICE9PSB2YWx1ZSkgOiAodmFsdWUgPT09IHZhbHVlKSkgfHxcbiAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJyAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFzc2lnbjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ29waWVzIHRoZSBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gY29weS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDb3B5KHNvdXJjZSwgb2JqZWN0LCBwcm9wcykge1xuICBpZiAoIXByb3BzKSB7XG4gICAgcHJvcHMgPSBvYmplY3Q7XG4gICAgb2JqZWN0ID0ge307XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIG9iamVjdFtrZXldID0gc291cmNlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29weTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC40IChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCdsb2Rhc2guaXNhcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJ2xvZGFzaC5pc25hdGl2ZScpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBpc05hdGl2ZShuYXRpdmVLZXlzID0gT2JqZWN0LmtleXMpICYmIG5hdGl2ZUtleXM7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBBbiBvYmplY3QgZW52aXJvbm1lbnQgZmVhdHVyZSBmbGFncy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUgT2JqZWN0XG4gKi9cbnZhciBzdXBwb3J0ID0ge307XG5cbihmdW5jdGlvbih4KSB7XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiBgYXJndW1lbnRzYCBvYmplY3QgaW5kZXhlcyBhcmUgbm9uLWVudW1lcmFibGUuXG4gICAqXG4gICAqIEluIEZpcmVmb3ggPCA0LCBJRSA8IDksIFBoYW50b21KUywgYW5kIFNhZmFyaSA8IDUuMSBgYXJndW1lbnRzYCBvYmplY3RcbiAgICogaW5kZXhlcyBhcmUgbm9uLWVudW1lcmFibGUuIENocm9tZSA8IDI1IGFuZCBOb2RlLmpzIDwgMC4xMS4wIHRyZWF0XG4gICAqIGBhcmd1bWVudHNgIG9iamVjdCBpbmRleGVzIGFzIG5vbi1lbnVtZXJhYmxlIGFuZCBmYWlsIGBoYXNPd25Qcm9wZXJ0eWBcbiAgICogY2hlY2tzIGZvciBpbmRleGVzIHRoYXQgZXhjZWVkIHRoZWlyIGZ1bmN0aW9uJ3MgZm9ybWFsIHBhcmFtZXRlcnMgd2l0aFxuICAgKiBhc3NvY2lhdGVkIHZhbHVlcyBvZiBgMGAuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnN1cHBvcnRcbiAgICogQHR5cGUgYm9vbGVhblxuICAgKi9cbiAgdHJ5IHtcbiAgICBzdXBwb3J0Lm5vbkVudW1BcmdzID0gIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgc3VwcG9ydC5ub25FbnVtQXJncyA9IHRydWU7XG4gIH1cbn0oMCwgMCkpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICt2YWx1ZTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIEVTIGBUb0xlbmd0aGAuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIEEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24gb2YgYE9iamVjdC5rZXlzYCB3aGljaCBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZVxuICogb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gIHZhciBwcm9wcyA9IGtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBwcm9wc0xlbmd0aCAmJiBvYmplY3QubGVuZ3RoO1xuXG4gIHZhciBhbGxvd0luZGV4ZXMgPSBsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgKHN1cHBvcnQubm9uRW51bUFyZ3MgJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogKipOb3RlOioqIFNlZSB0aGUgW0VTNSBzcGVjXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKHZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG52YXIga2V5cyA9ICFuYXRpdmVLZXlzID8gc2hpbUtleXMgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCkge1xuICAgIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICB9XG4gIGlmICgodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0KSB8fFxuICAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIGxlbmd0aCA9IChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgKHN1cHBvcnQubm9uRW51bUFyZ3MgJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogKGZ1bmN0aW9uKCkgeyByZXR1cm4gXy5pc0FyZ3VtZW50cyhhcmd1bWVudHMpOyB9KSgpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHZhciBsZW5ndGggPSBpc09iamVjdExpa2UodmFsdWUpID8gdmFsdWUubGVuZ3RoIDogdW5kZWZpbmVkO1xuICByZXR1cm4gKGlzTGVuZ3RoKGxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZykgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzLlxuICogU2VlIHRoaXMgW2FydGljbGUgb24gYFJlZ0V4cGAgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBpc05hdGl2ZShuYXRpdmVJc0FycmF5ID0gQXJyYXkuaXNBcnJheSkgJiYgbmF0aXZlSXNBcnJheTtcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogKGZ1bmN0aW9uKCkgeyByZXR1cm4gXy5pc0FycmF5KGFyZ3VtZW50cyk7IH0pKCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWcpIHx8IGZhbHNlO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIHJlSG9zdEN0b3IudGVzdCh2YWx1ZSkpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIiwgXCIqXCIsXG4gKiBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOi8vbG9kYXNoXFwuY29tL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzLlxuICogU2VlIHRoaXMgW2FydGljbGUgb24gYFJlZ0V4cGAgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVIb3N0Q3Rvci50ZXN0KHZhbHVlKSkgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXFxcIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLCBcIipcIixcbiAqIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6Ly9sb2Rhc2hcXC5jb20vXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2JpbmRjYWxsYmFjaycpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnbG9kYXNoLl9pc2l0ZXJhdGVlY2FsbCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGFzc2lnbnMgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIGEgZ2l2ZW5cbiAqIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBsZW5ndGggPSBhcmdzLmxlbmd0aCxcbiAgICAgICAgb2JqZWN0ID0gYXJnc1swXTtcblxuICAgIGlmIChsZW5ndGggPCAyIHx8IG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICB2YXIgY3VzdG9taXplciA9IGFyZ3NbbGVuZ3RoIC0gMl0sXG4gICAgICAgIHRoaXNBcmcgPSBhcmdzW2xlbmd0aCAtIDFdLFxuICAgICAgICBndWFyZCA9IGFyZ3NbM107XG5cbiAgICBpZiAobGVuZ3RoID4gMyAmJiB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjdXN0b21pemVyID0gYmluZENhbGxiYWNrKGN1c3RvbWl6ZXIsIHRoaXNBcmcsIDUpO1xuICAgICAgbGVuZ3RoIC09IDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSAobGVuZ3RoID4gMiAmJiB0eXBlb2YgdGhpc0FyZyA9PSAnZnVuY3Rpb24nKSA/IHRoaXNBcmcgOiBudWxsO1xuICAgICAgbGVuZ3RoIC09IChjdXN0b21pemVyID8gMSA6IDApO1xuICAgIH1cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoYXJnc1sxXSwgYXJnc1syXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoID09IDMgPyBudWxsIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDI7XG4gICAgfVxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmdzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0eXBlb2YgdGhpc0FyZyA9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jO1xuICB9XG4gIHN3aXRjaCAoYXJnQ291bnQpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHByb3ZpZGVkIHRvIGl0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuNCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gK3ZhbHVlO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgcHJvdmlkZWQgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJykge1xuICAgIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoLFxuICAgICAgICBwcmVyZXEgPSBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoaW5kZXgsIGxlbmd0aCk7XG4gIH0gZWxzZSB7XG4gICAgcHJlcmVxID0gdHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3Q7XG4gIH1cbiAgaWYgKHByZXJlcSkge1xuICAgIHZhciBvdGhlciA9IG9iamVjdFtpbmRleF07XG4gICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/ICh2YWx1ZSA9PT0gb3RoZXIpIDogKG90aGVyICE9PSBvdGhlcik7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gRVMgYFRvTGVuZ3RoYC4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIGxhbmd1YWdlIHR5cGUgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiAqKk5vdGU6KiogU2VlIHRoZSBbRVM1IHNwZWNdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAodmFsdWUgJiYgdHlwZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWNhbGxiYWNrJyksXG4gICAgYmFzZUVhY2ggPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VlYWNoJyksXG4gICAgYmFzZUZpbmQgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VmaW5kJyksXG4gICAgZmluZEluZGV4ID0gcmVxdWlyZSgnbG9kYXNoLmZpbmRpbmRleCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpO1xuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gLCByZXR1cm5pbmcgdGhlIGZpcnN0IGVsZW1lbnRcbiAqIGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvci4gVGhlIHByZWRpY2F0ZSBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kXG4gKiBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gKlxuICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ucHJvcGVydHlcIlxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogSWYgYW4gb2JqZWN0IGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ubWF0Y2hlc1wiIHN0eWxlXG4gKiBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlblxuICogb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBkZXRlY3RcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gc2VhcmNoLlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8c3RyaW5nfSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkXG4gKiAgcGVyIGl0ZXJhdGlvbi4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yIG9iamVjdCBpcyBwcm92aWRlZCBpdCBpcyB1c2VkIHRvXG4gKiAgY3JlYXRlIGEgXCJfLnByb3BlcnR5XCIgb3IgXCJfLm1hdGNoZXNcIiBzdHlsZSBjYWxsYmFjayByZXNwZWN0aXZlbHkuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYHByZWRpY2F0ZWAuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWF0Y2hlZCBlbGVtZW50LCBlbHNlIGB1bmRlZmluZWRgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IGZhbHNlIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IHRydWUgfSxcbiAqICAgeyAndXNlcic6ICdwZWJibGVzJywgJ2FnZSc6IDEsICAnYWN0aXZlJzogZmFsc2UgfVxuICogXTtcbiAqXG4gKiBfLnJlc3VsdChfLmZpbmQodXNlcnMsIGZ1bmN0aW9uKGNocikgeyByZXR1cm4gY2hyLmFnZSA8IDQwOyB9KSwgJ3VzZXInKTtcbiAqIC8vID0+ICdiYXJuZXknXG4gKlxuICogLy8gdXNpbmcgdGhlIFwiXy5tYXRjaGVzXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnJlc3VsdChfLmZpbmQodXNlcnMsIHsgJ2FnZSc6IDEgfSksICd1c2VyJyk7XG4gKiAvLyA9PiAncGViYmxlcydcbiAqXG4gKiAvLyB1c2luZyB0aGUgXCJfLnByb3BlcnR5XCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnJlc3VsdChfLmZpbmQodXNlcnMsICdhY3RpdmUnKSwgJ3VzZXInKTtcbiAqIC8vID0+ICdmcmVkJ1xuICovXG5mdW5jdGlvbiBmaW5kKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICBpZiAoaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgIHZhciBpbmRleCA9IGZpbmRJbmRleChjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIHRoaXNBcmcpO1xuICAgIHJldHVybiBpbmRleCA+IC0xID8gY29sbGVjdGlvbltpbmRleF0gOiB1bmRlZmluZWQ7XG4gIH1cbiAgcHJlZGljYXRlID0gYmFzZUNhbGxiYWNrKHByZWRpY2F0ZSwgdGhpc0FyZywgMyk7XG4gIHJldHVybiBiYXNlRmluZChjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIGJhc2VFYWNoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4xLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlSXNFcXVhbCA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWlzZXF1YWwnKSxcbiAgICBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2JpbmRjYWxsYmFjaycpLFxuICAgIGtleXMgPSByZXF1aXJlKCdsb2Rhc2gua2V5cycpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jYWxsYmFja2Agd2hpY2ggc3VwcG9ydHMgc3BlY2lmeWluZyB0aGVcbiAqIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gW2Z1bmM9Xy5pZGVudGl0eV0gVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBjYWxsYmFjay5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJhc2VDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBmdW5jO1xuICBpZiAodHlwZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgdGhpc0FyZyAhPSAndW5kZWZpbmVkJylcbiAgICAgID8gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KVxuICAgICAgOiBmdW5jO1xuICB9XG4gIGlmIChmdW5jID09IG51bGwpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gYmFzZU1hdGNoZXMoZnVuYyk7XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiB0aGlzQXJnID09ICd1bmRlZmluZWQnXG4gICAgPyBiYXNlUHJvcGVydHkoZnVuYyArICcnKVxuICAgIDogYmFzZU1hdGNoZXNQcm9wZXJ0eShmdW5jICsgJycsIHRoaXNBcmcpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTWF0Y2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgb3IgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHNvdXJjZSBwcm9wZXJ0eSBuYW1lcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgc291cmNlIHZhbHVlcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IHN0cmljdENvbXBhcmVGbGFncyBTdHJpY3QgY29tcGFyaXNvbiBmbGFncyBmb3Igc291cmNlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBvYmplY3RgIGlzIGEgbWF0Y2gsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTWF0Y2gob2JqZWN0LCBwcm9wcywgdmFsdWVzLCBzdHJpY3RDb21wYXJlRmxhZ3MsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuICFsZW5ndGg7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBub0N1c3RvbWl6ZXIgPSAhY3VzdG9taXplcjtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmICgobm9DdXN0b21pemVyICYmIHN0cmljdENvbXBhcmVGbGFnc1tpbmRleF0pXG4gICAgICAgICAgPyB2YWx1ZXNbaW5kZXhdICE9PSBvYmplY3RbcHJvcHNbaW5kZXhdXVxuICAgICAgICAgIDogIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wc1tpbmRleF0pXG4gICAgICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBpbmRleCA9IC0xO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBzdHJpY3RDb21wYXJlRmxhZ3NbaW5kZXhdKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIHNyY1ZhbHVlID0gdmFsdWVzW2luZGV4XTtcblxuICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXkpIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmVzdWx0ID0gYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCBjdXN0b21pemVyLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc2Agd2hpY2ggZG9lcyBub3QgY2xvbmUgYHNvdXJjZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gIHZhciBwcm9wcyA9IGtleXMoc291cmNlKSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICBpZiAobGVuZ3RoID09IDEpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbMF0sXG4gICAgICAgIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICBpZiAoaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgb2JqZWN0W2tleV0gPT09IHZhbHVlICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgdmFyIHZhbHVlcyA9IEFycmF5KGxlbmd0aCksXG4gICAgICBzdHJpY3RDb21wYXJlRmxhZ3MgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhbHVlID0gc291cmNlW3Byb3BzW2xlbmd0aF1dO1xuICAgIHZhbHVlc1tsZW5ndGhdID0gdmFsdWU7XG4gICAgc3RyaWN0Q29tcGFyZUZsYWdzW2xlbmd0aF0gPSBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gYmFzZUlzTWF0Y2gob2JqZWN0LCBwcm9wcywgdmFsdWVzLCBzdHJpY3RDb21wYXJlRmxhZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNQcm9wZXJ0eWAgd2hpY2ggZG9lcyBub3QgY29lcmNlIGBrZXlgXG4gKiB0byBhIHN0cmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzUHJvcGVydHkoa2V5LCB2YWx1ZSkge1xuICBpZiAoaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBvYmplY3Rba2V5XSA9PT0gdmFsdWU7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGJhc2VJc0VxdWFsKHZhbHVlLCBvYmplY3Rba2V5XSwgbnVsbCwgdHJ1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdoaWNoIGRvZXMgbm90IGNvZXJjZSBga2V5YCB0byBhIHN0cmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpZiBzdWl0YWJsZSBmb3Igc3RyaWN0XG4gKiAgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgJiYgKHZhbHVlID09PSAwID8gKCgxIC8gdmFsdWUpID4gMCkgOiAhaXNPYmplY3QodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqIF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNhbGxiYWNrO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXN0eXBlZGFycmF5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYHRoaXNgIGJpbmRpbmdcbiAqIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzV2hlcmVdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3IgaWRlbnRpY2FsIHZhbHVlcy5cbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIC8vIFRyZWF0IGArMGAgdnMuIGAtMGAgYXMgbm90IGVxdWFsLlxuICAgIHJldHVybiB2YWx1ZSAhPT0gMCB8fCAoMSAvIHZhbHVlID09IDEgLyBvdGhlcik7XG4gIH1cbiAgdmFyIHZhbFR5cGUgPSB0eXBlb2YgdmFsdWUsXG4gICAgICBvdGhUeXBlID0gdHlwZW9mIG90aGVyO1xuXG4gIC8vIEV4aXQgZWFybHkgZm9yIHVubGlrZSBwcmltaXRpdmUgdmFsdWVzLlxuICBpZiAoKHZhbFR5cGUgIT0gJ2Z1bmN0aW9uJyAmJiB2YWxUeXBlICE9ICdvYmplY3QnICYmIG90aFR5cGUgIT0gJ2Z1bmN0aW9uJyAmJiBvdGhUeXBlICE9ICdvYmplY3QnKSB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsKSB7XG4gICAgLy8gUmV0dXJuIGBmYWxzZWAgdW5sZXNzIGJvdGggdmFsdWVzIGFyZSBgTmFOYC5cbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYmFzZUlzRXF1YWwsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgb2JqZWN0cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzV2hlcmVdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICBvdGhUYWcgPSBhcnJheVRhZztcblxuICBpZiAoIW9iaklzQXJyKSB7XG4gICAgb2JqVGFnID0gb2JqVG9TdHJpbmcuY2FsbChvYmplY3QpO1xuICAgIGlmIChvYmpUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb2JqVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob2JqVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb2JqSXNBcnIgPSBpc1R5cGVkQXJyYXkob2JqZWN0KTtcbiAgICB9XG4gIH1cbiAgaWYgKCFvdGhJc0Fycikge1xuICAgIG90aFRhZyA9IG9ialRvU3RyaW5nLmNhbGwob3RoZXIpO1xuICAgIGlmIChvdGhUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb3RoVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob3RoVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb3RoSXNBcnIgPSBpc1R5cGVkQXJyYXkob3RoZXIpO1xuICAgIH1cbiAgfVxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmICEob2JqSXNBcnIgfHwgb2JqSXNPYmopKSB7XG4gICAgcmV0dXJuIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnKTtcbiAgfVxuICB2YXIgdmFsV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgIG90aFdyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICBpZiAodmFsV3JhcHBlZCB8fCBvdGhXcmFwcGVkKSB7XG4gICAgcmV0dXJuIGVxdWFsRnVuYyh2YWxXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsIG90aFdyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXIsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIC8vIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIGRldGVjdGluZyBjaXJjdWxhciByZWZlcmVuY2VzIHNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI0pPLlxuICBzdGFja0EgfHwgKHN0YWNrQSA9IFtdKTtcbiAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG5cbiAgdmFyIGxlbmd0aCA9IHN0YWNrQS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChzdGFja0FbbGVuZ3RoXSA9PSBvYmplY3QpIHtcbiAgICAgIHJldHVybiBzdGFja0JbbGVuZ3RoXSA9PSBvdGhlcjtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIGBvYmplY3RgIGFuZCBgb3RoZXJgIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgc3RhY2tBLnB1c2gob2JqZWN0KTtcbiAgc3RhY2tCLnB1c2gob3RoZXIpO1xuXG4gIHZhciByZXN1bHQgPSAob2JqSXNBcnIgPyBlcXVhbEFycmF5cyA6IGVxdWFsT2JqZWN0cykob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQik7XG5cbiAgc3RhY2tBLnBvcCgpO1xuICBzdGFja0IucG9wKCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgYXJyYXlzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNXaGVyZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gdHJ1ZTtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzV2hlcmUgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBEZWVwIGNvbXBhcmUgdGhlIGNvbnRlbnRzLCBpZ25vcmluZyBub24tbnVtZXJpYyBwcm9wZXJ0aWVzLlxuICB3aGlsZSAocmVzdWx0ICYmICsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdO1xuXG4gICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICByZXN1bHQgPSBpc1doZXJlXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4KVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgaWYgKGlzV2hlcmUpIHtcbiAgICAgICAgdmFyIG90aEluZGV4ID0gb3RoTGVuZ3RoO1xuICAgICAgICB3aGlsZSAob3RoSW5kZXgtLSkge1xuICAgICAgICAgIG90aFZhbHVlID0gb3RoZXJbb3RoSW5kZXhdO1xuICAgICAgICAgIHJlc3VsdCA9IChhcnJWYWx1ZSAmJiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IChhcnJWYWx1ZSAmJiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuICEhcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIC8vIENvZXJjZSBkYXRlcyBhbmQgYm9vbGVhbnMgdG8gbnVtYmVycywgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzIGFuZCBib29sZWFuc1xuICAgICAgLy8gdG8gYDFgIG9yIGAwYCB0cmVhdGluZyBpbnZhbGlkIGRhdGVzIGNvZXJjZWQgdG8gYE5hTmAgYXMgbm90IGVxdWFsLlxuICAgICAgcmV0dXJuICtvYmplY3QgPT0gK290aGVyO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIFRyZWF0IGBOYU5gIHZzLiBgTmFOYCBhcyBlcXVhbC5cbiAgICAgIHJldHVybiAob2JqZWN0ICE9ICtvYmplY3QpXG4gICAgICAgID8gb3RoZXIgIT0gK290aGVyXG4gICAgICAgIC8vIEJ1dCwgdHJlYXQgYC0wYCB2cy4gYCswYCBhcyBub3QgZXF1YWwuXG4gICAgICAgIDogKG9iamVjdCA9PSAwID8gKCgxIC8gb2JqZWN0KSA9PSAoMSAvIG90aGVyKSkgOiBvYmplY3QgPT0gK290aGVyKTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncyBwcmltaXRpdmVzIGFuZCBzdHJpbmdcbiAgICAgIC8vIG9iamVjdHMgYXMgZXF1YWwuIFNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI3gxNS4xMC42LjQgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNXaGVyZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBvYmpQcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgIG90aFByb3BzID0ga2V5cyhvdGhlciksXG4gICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzV2hlcmUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGhhc0N0b3IsXG4gICAgICBpbmRleCA9IC0xO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XSxcbiAgICAgICAgcmVzdWx0ID0gaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KTtcblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgcmVzdWx0ID0gaXNXaGVyZVxuICAgICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSlcbiAgICAgICAgICA6IGN1c3RvbWl6ZXIob2JqVmFsdWUsIG90aFZhbHVlLCBrZXkpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgIHJlc3VsdCA9IChvYmpWYWx1ZSAmJiBvYmpWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaGFzQ3RvciB8fCAoaGFzQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAoIWhhc0N0b3IpIHtcbiAgICB2YXIgb2JqQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgaWYgKG9iakN0b3IgIT0gb3RoQ3RvciAmJlxuICAgICAgICAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmXG4gICAgICAgICAgdHlwZW9mIG90aEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvdGhDdG9yIGluc3RhbmNlb2Ygb3RoQ3RvcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRXF1YWw7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9XG50eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9IHR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiB0eXBlZEFycmF5VGFnc1tvYmpUb1N0cmluZy5jYWxsKHZhbHVlKV0pIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fHN0cmluZ30gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5sZW5ndGggOiAwO1xuICBpZiAoIWlzTGVuZ3RoKGxlbmd0aCkpIHtcbiAgICByZXR1cm4gYmFzZUZvck93bihjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpdGVyYWJsZSA9IHRvT2JqZWN0KGNvbGxlY3Rpb24pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29sbGVjdGlvbjtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0b3IgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGl0ZXJhYmxlID0gdG9PYmplY3Qob2JqZWN0KSxcbiAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIG9iamVjdCBpZiBpdCBpcyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID8gdmFsdWUgOiBPYmplY3QodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogKipOb3RlOioqIFNlZSB0aGUgW0VTNSBzcGVjXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKHZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VFYWNoO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kYCwgYF8uZmluZExhc3RgLCBgXy5maW5kS2V5YCwgYW5kIGBfLmZpbmRMYXN0S2V5YCxcbiAqIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2sgc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcsIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBjb2xsZWN0aW9uYCB1c2luZyB0aGUgcHJvdmlkZWQgYGVhY2hGdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBgY29sbGVjdGlvbmAuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXRLZXldIFNwZWNpZnkgcmV0dXJuaW5nIHRoZSBrZXkgb2YgdGhlIGZvdW5kIGVsZW1lbnRcbiAqICBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmb3VuZCBlbGVtZW50IG9yIGl0cyBrZXksIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgZWFjaEZ1bmMsIHJldEtleSkge1xuICB2YXIgcmVzdWx0O1xuICBlYWNoRnVuYyhjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSkge1xuICAgICAgcmVzdWx0ID0gcmV0S2V5ID8ga2V5IDogdmFsdWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRmluZDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUNhbGxiYWNrID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlY2FsbGJhY2snKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmZpbmRgIGV4Y2VwdCB0aGF0IGl0IHJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdFxuICogZWxlbWVudCBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IsIGluc3RlYWQgb2YgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICpcbiAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLnByb3BlcnR5XCJcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIElmIGFuIG9iamVjdCBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLm1hdGNoZXNcIiBzdHlsZVxuICogY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZ2l2ZW5cbiAqIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxzdHJpbmd9IFtwcmVkaWNhdGU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWRcbiAqICBwZXIgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHByb3ZpZGVkIGl0IGlzIHVzZWQgdG9cbiAqICBjcmVhdGUgYSBcIl8ucHJvcGVydHlcIiBvciBcIl8ubWF0Y2hlc1wiIHN0eWxlIGNhbGxiYWNrIHJlc3BlY3RpdmVseS5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgcHJlZGljYXRlYC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmb3VuZCBlbGVtZW50LCBlbHNlIGAtMWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAgJ2FnZSc6IDM2LCAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAgJ2FnZSc6IDQwLCAnYWN0aXZlJzogdHJ1ZSB9LFxuICogICB7ICd1c2VyJzogJ3BlYmJsZXMnLCAnYWdlJzogMSwgICdhY3RpdmUnOiBmYWxzZSB9XG4gKiBdO1xuICpcbiAqIF8uZmluZEluZGV4KHVzZXJzLCBmdW5jdGlvbihjaHIpIHsgcmV0dXJuIGNoci5hZ2UgPCA0MDsgfSk7XG4gKiAvLyA9PiAwXG4gKlxuICogLy8gdXNpbmcgdGhlIFwiXy5tYXRjaGVzXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLmZpbmRJbmRleCh1c2VycywgeyAnYWdlJzogMSB9KTtcbiAqIC8vID0+IDJcbiAqXG4gKiAvLyB1c2luZyB0aGUgXCJfLnByb3BlcnR5XCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLmZpbmRJbmRleCh1c2VycywgJ2FjdGl2ZScpO1xuICogLy8gPT4gMVxuICovXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICBwcmVkaWNhdGUgPSBiYXNlQ2FsbGJhY2socHJlZGljYXRlLCB0aGlzQXJnLCAzKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmluZEluZGV4O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiZWZvcmUgPSByZXF1aXJlKCdsb2Rhc2guYmVmb3JlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaXMgcmVzdHJpY3RlZCB0byBpbnZva2luZyBgZnVuY2Agb25jZS4gUmVwZWF0IGNhbGxzXG4gKiB0byB0aGUgZnVuY3Rpb24gcmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgY2FsbC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgY3JlYXRlZCBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUgRnVuY3Rpb25cbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyByZXN0cmljdGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgaW5pdGlhbGl6ZSA9IF8ub25jZShjcmVhdGVBcHBsaWNhdGlvbik7XG4gKiBpbml0aWFsaXplKCk7XG4gKiBpbml0aWFsaXplKCk7XG4gKiAvLyBgaW5pdGlhbGl6ZWAgaW52b2tlcyBgY3JlYXRlQXBwbGljYXRpb25gIG9uY2VcbiAqL1xuZnVuY3Rpb24gb25jZShmdW5jKSB7XG4gIHJldHVybiBiZWZvcmUoZnVuYywgMik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb25jZTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgLCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBhbmQgYXJndW1lbnRzXG4gKiBvZiB0aGUgY3JlYXRlZCBmdW5jdGlvbiwgd2hpbGUgaXQgaXMgY2FsbGVkIGxlc3MgdGhhbiBgbmAgdGltZXMuIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBjcmVhdGVkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgY2FsbHMgYXQgd2hpY2ggYGZ1bmNgIGlzIG5vIGxvbmdlciBpbnZva2VkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyByZXN0cmljdGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiBqUXVlcnkoJyNhZGQnKS5vbignY2xpY2snLCBfLmJlZm9yZSg1LCBhZGRDb250YWN0VG9MaXN0KSk7XG4gKiAvLyA9PiBhbGxvd3MgYWRkaW5nIHVwIHRvIDQgY29udGFjdHMgdG8gdGhlIGxpc3RcbiAqL1xuZnVuY3Rpb24gYmVmb3JlKG4sIGZ1bmMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIG4gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIHRlbXAgPSBuO1xuICAgICAgbiA9IGZ1bmM7XG4gICAgICBmdW5jID0gdGVtcDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKC0tbiA+IDApIHtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVuYyA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmVmb3JlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnbG9kYXNoLmlzZnVuY3Rpb24nKTtcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgdmFsdWUgb2YgcHJvcGVydHkgYGtleWAgb24gYG9iamVjdGAuIElmIHRoZSB2YWx1ZSBvZiBga2V5YCBpc1xuICogYSBmdW5jdGlvbiBpdCBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBvYmplY3RgIGFuZCBpdHMgcmVzdWx0XG4gKiBpcyByZXR1cm5lZCwgZWxzZSB0aGUgcHJvcGVydHkgdmFsdWUgaXMgcmV0dXJuZWQuIElmIHRoZSBwcm9wZXJ0eSB2YWx1ZSBpc1xuICogYHVuZGVmaW5lZGAgdGhlIGBkZWZhdWx0VmFsdWVgIGlzIHVzZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIHJlc29sdmUuXG4gKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBpZiB0aGUgcHJvcGVydHkgdmFsdWVcbiAqICByZXNvbHZlcyB0byBgdW5kZWZpbmVkYC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcsICdhZ2UnOiBfLmNvbnN0YW50KDQwKSB9O1xuICpcbiAqIF8ucmVzdWx0KG9iamVjdCwgJ3VzZXInKTtcbiAqIC8vID0+ICdmcmVkJ1xuICpcbiAqIF8ucmVzdWx0KG9iamVjdCwgJ2FnZScpO1xuICogLy8gPT4gNDBcbiAqXG4gKiBfLnJlc3VsdChvYmplY3QsICdzdGF0dXMnLCAnYnVzeScpO1xuICogLy8gPT4gJ2J1c3knXG4gKlxuICogXy5yZXN1bHQob2JqZWN0LCAnc3RhdHVzJywgXy5jb25zdGFudCgnYnVzeScpKTtcbiAqIC8vID0+ICdidXN5J1xuICovXG5mdW5jdGlvbiByZXN1bHQob2JqZWN0LCBrZXksIGRlZmF1bHRWYWx1ZSkge1xuICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gIH1cbiAgcmV0dXJuIGlzRnVuY3Rpb24odmFsdWUpID8gdmFsdWUuY2FsbChvYmplY3QpIDogdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdWx0O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzLlxuICogU2VlIHRoaXMgW2FydGljbGUgb24gYFJlZ0V4cGAgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0Z1bmN0aW9uYCB3aXRob3V0IHN1cHBvcnQgZm9yIGVudmlyb25tZW50c1xuICogd2l0aCBpbmNvcnJlY3QgYHR5cGVvZmAgcmVzdWx0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBBdm9pZCBhIENoYWtyYSBKSVQgYnVnIGluIGNvbXBhdGliaWxpdHkgbW9kZXMgb2YgSUUgMTEuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvaXNzdWVzLzE2MjEgZm9yIG1vcmUgZGV0YWlscy5cbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQgaXMgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZXNjYXBlUmVnRXhwKG9ialRvU3RyaW5nKVxuICAucmVwbGFjZSgvdG9TdHJpbmd8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgVWludDhBcnJheSA9IGlzTmF0aXZlKFVpbnQ4QXJyYXkgPSBnbG9iYWwuVWludDhBcnJheSkgJiYgVWludDhBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzRnVuY3Rpb24gPSAhKGJhc2VJc0Z1bmN0aW9uKC94LykgfHwgKFVpbnQ4QXJyYXkgJiYgIWJhc2VJc0Z1bmN0aW9uKFVpbnQ4QXJyYXkpKSkgPyBiYXNlSXNGdW5jdGlvbiA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaSB3aGljaCByZXR1cm4gJ2Z1bmN0aW9uJyBmb3IgcmVnZXhlc1xuICAvLyBhbmQgU2FmYXJpIDggZXF1aXZhbGVudHMgd2hpY2ggcmV0dXJuICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvcnMuXG4gIHJldHVybiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIHJlSG9zdEN0b3IudGVzdCh2YWx1ZSkpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIiwgXCIqXCIsXG4gKiBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOi8vbG9kYXNoXFwuY29tL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VjYWxsYmFjaycpLFxuICAgIGJhc2VVbmlxID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNldW5pcScpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnbG9kYXNoLl9pc2l0ZXJhdGVlY2FsbCcpO1xuXG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuaXFgIG9wdGltaXplZCBmb3Igc29ydGVkIGFycmF5cyB3aXRob3V0IHN1cHBvcnRcbiAqIGZvciBjYWxsYmFjayBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUtdmFsdWUtZnJlZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gc29ydGVkVW5pcShhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIHNlZW4sXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzSW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBhcnJheSkgOiB2YWx1ZTtcblxuICAgIGlmICghaW5kZXggfHwgc2VlbiAhPT0gY29tcHV0ZWQpIHtcbiAgICAgIHNlZW4gPSBjb21wdXRlZDtcbiAgICAgIHJlc3VsdFsrK3Jlc0luZGV4XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBkdXBsaWNhdGUtdmFsdWUtZnJlZSB2ZXJzaW9uIG9mIGFuIGFycmF5IHVzaW5nIGBTYW1lVmFsdWVaZXJvYFxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLiBQcm92aWRpbmcgYHRydWVgIGZvciBgaXNTb3J0ZWRgIHBlcmZvcm1zIGEgZmFzdGVyXG4gKiBzZWFyY2ggYWxnb3JpdGhtIGZvciBzb3J0ZWQgYXJyYXlzLiBJZiBhbiBpdGVyYXRlZSBmdW5jdGlvbiBpcyBwcm92aWRlZCBpdFxuICogaXMgaW52b2tlZCBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgYXJyYXkgdG8gZ2VuZXJhdGUgdGhlIGNyaXRlcmlvbiBieSB3aGljaFxuICogdW5pcXVlbmVzcyBpcyBjb21wdXRlZC4gVGhlIGBpdGVyYXRlZWAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkXG4gKiB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleCwgYXJyYXkpLlxuICpcbiAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLnByb3BlcnR5XCJcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIElmIGFuIG9iamVjdCBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLm1hdGNoZXNcIiBzdHlsZVxuICogY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZ2l2ZW5cbiAqIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBgU2FtZVZhbHVlWmVyb2AgY29tcGFyaXNvbnMgYXJlIGxpa2Ugc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLFxuICogZS5nLiBgPT09YCwgZXhjZXB0IHRoYXQgYE5hTmAgbWF0Y2hlcyBgTmFOYC4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIHVuaXF1ZVxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzU29ydGVkXSBTcGVjaWZ5IHRoZSBhcnJheSBpcyBzb3J0ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxzdHJpbmd9IFtpdGVyYXRlZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqICBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHByb3ZpZGVkIGl0IGlzIHVzZWQgdG8gY3JlYXRlIGEgXCJfLnByb3BlcnR5XCJcbiAqICBvciBcIl8ubWF0Y2hlc1wiIHN0eWxlIGNhbGxiYWNrIHJlc3BlY3RpdmVseS5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgaXRlcmF0ZWVgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlLXZhbHVlLWZyZWUgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udW5pcShbMSwgMiwgMV0pO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gdXNpbmcgYGlzU29ydGVkYFxuICogXy51bmlxKFsxLCAxLCAyXSwgdHJ1ZSk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyB1c2luZyBhbiBpdGVyYXRlZSBmdW5jdGlvblxuICogXy51bmlxKFsxLCAyLjUsIDEuNSwgMl0sIGZ1bmN0aW9uKG4pIHsgcmV0dXJuIHRoaXMuZmxvb3Iobik7IH0sIE1hdGgpO1xuICogLy8gPT4gWzEsIDIuNV1cbiAqXG4gKiAvLyB1c2luZyB0aGUgXCJfLnByb3BlcnR5XCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnVuaXEoW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH0sIHsgJ3gnOiAxIH1dLCAneCcpO1xuICogLy8gPT4gW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH1dXG4gKi9cbmZ1bmN0aW9uIHVuaXEoYXJyYXksIGlzU29ydGVkLCBpdGVyYXRlZSwgdGhpc0FyZykge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICBpZiAoIWxlbmd0aCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICAvLyBKdWdnbGUgYXJndW1lbnRzLlxuICBpZiAodHlwZW9mIGlzU29ydGVkICE9ICdib29sZWFuJyAmJiBpc1NvcnRlZCAhPSBudWxsKSB7XG4gICAgdGhpc0FyZyA9IGl0ZXJhdGVlO1xuICAgIGl0ZXJhdGVlID0gaXNJdGVyYXRlZUNhbGwoYXJyYXksIGlzU29ydGVkLCB0aGlzQXJnKSA/IG51bGwgOiBpc1NvcnRlZDtcbiAgICBpc1NvcnRlZCA9IGZhbHNlO1xuICB9XG4gIGl0ZXJhdGVlID0gaXRlcmF0ZWUgPT0gbnVsbCA/IGl0ZXJhdGVlIDogYmFzZUNhbGxiYWNrKGl0ZXJhdGVlLCB0aGlzQXJnLCAzKTtcbiAgcmV0dXJuIChpc1NvcnRlZClcbiAgICA/IHNvcnRlZFVuaXEoYXJyYXksIGl0ZXJhdGVlKVxuICAgIDogYmFzZVVuaXEoYXJyYXksIGl0ZXJhdGVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmlxO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlSW5kZXhPZiA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWluZGV4b2YnKSxcbiAgICBjYWNoZUluZGV4T2YgPSByZXF1aXJlKCdsb2Rhc2guX2NhY2hlaW5kZXhvZicpLFxuICAgIGNyZWF0ZUNhY2hlID0gcmVxdWlyZSgnbG9kYXNoLl9jcmVhdGVjYWNoZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuaXFgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2sgc2hvcnRoYW5kc1xuICogYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZS12YWx1ZS1mcmVlIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlVW5pcShhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmRleE9mID0gYmFzZUluZGV4T2YsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICBpc0xhcmdlID0gaXNDb21tb24gJiYgbGVuZ3RoID49IDIwMCxcbiAgICAgIHNlZW4gPSBpc0xhcmdlID8gY3JlYXRlQ2FjaGUoKSA6IG51bGwsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICBpZiAoc2Vlbikge1xuICAgIGluZGV4T2YgPSBjYWNoZUluZGV4T2Y7XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBpc0xhcmdlID0gZmFsc2U7XG4gICAgc2VlbiA9IGl0ZXJhdGVlID8gW10gOiByZXN1bHQ7XG4gIH1cbiAgb3V0ZXI6XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBhcnJheSkgOiB2YWx1ZTtcblxuICAgIGlmIChpc0NvbW1vbiAmJiB2YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgIHZhciBzZWVuSW5kZXggPSBzZWVuLmxlbmd0aDtcbiAgICAgIHdoaWxlIChzZWVuSW5kZXgtLSkge1xuICAgICAgICBpZiAoc2VlbltzZWVuSW5kZXhdID09PSBjb21wdXRlZCkge1xuICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaW5kZXhPZihzZWVuLCBjb21wdXRlZCwgMCkgPCAwKSB7XG4gICAgICBpZiAoaXRlcmF0ZWUgfHwgaXNMYXJnZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VVbmlxO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4xLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IHN1cHBvcnQgZm9yIGJpbmFyeSBzZWFyY2hlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIGlmICh2YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICByZXR1cm4gaW5kZXhPZk5hTihhcnJheSwgZnJvbUluZGV4KTtcbiAgfVxuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGBOYU5gIGlzIGZvdW5kIGluIGBhcnJheWAuXG4gKiBJZiBgZnJvbVJpZ2h0YCBpcyBwcm92aWRlZCBlbGVtZW50cyBvZiBgYXJyYXlgIGFyZSBpdGVyYXRlZCBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgYE5hTmAsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gaW5kZXhPZk5hTihhcnJheSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbUluZGV4ICsgKGZyb21SaWdodCA/IDAgOiAtMSk7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICB2YXIgb3RoZXIgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKG90aGVyICE9PSBvdGhlcikge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUluZGV4T2Y7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIGBjYWNoZWAgbWltaWNraW5nIHRoZSByZXR1cm4gc2lnbmF0dXJlIG9mXG4gKiBgXy5pbmRleE9mYCBieSByZXR1cm5pbmcgYDBgIGlmIHRoZSB2YWx1ZSBpcyBmb3VuZCwgZWxzZSBgLTFgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gY2FjaGUgVGhlIGNhY2hlIHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGAwYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlSW5kZXhPZihjYWNoZSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSBjYWNoZS5kYXRhLFxuICAgICAgcmVzdWx0ID0gKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc09iamVjdCh2YWx1ZSkpID8gZGF0YS5zZXQuaGFzKHZhbHVlKSA6IGRhdGEuaGFzaFt2YWx1ZV07XG5cbiAgcmV0dXJuIHJlc3VsdCA/IDAgOiAtMTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYWNoZUluZGV4T2Y7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzTmF0aXZlID0gcmVxdWlyZSgnbG9kYXNoLmlzbmF0aXZlJyk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgU2V0ID0gaXNOYXRpdmUoU2V0ID0gZ2xvYmFsLlNldCkgJiYgU2V0O1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUNyZWF0ZSA9IGlzTmF0aXZlKG5hdGl2ZUNyZWF0ZSA9IE9iamVjdC5jcmVhdGUpICYmIG5hdGl2ZUNyZWF0ZTtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhIGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuZGF0YSA9IHsgJ2hhc2gnOiBuYXRpdmVDcmVhdGUobnVsbCksICdzZXQnOiBuZXcgU2V0IH07XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHRoaXMucHVzaCh2YWx1ZXNbbGVuZ3RoXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBwdXNoXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBjYWNoZVB1c2godmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNPYmplY3QodmFsdWUpKSB7XG4gICAgZGF0YS5zZXQuYWRkKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhLmhhc2hbdmFsdWVdID0gdHJ1ZTtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBgU2V0YCBjYWNoZSBvYmplY3QgdG8gb3B0aW1pemUgbGluZWFyIHNlYXJjaGVzIG9mIGxhcmdlIGFycmF5cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtudWxsfE9iamVjdH0gUmV0dXJucyB0aGUgbmV3IGNhY2hlIG9iamVjdCBpZiBgU2V0YCBpcyBzdXBwb3J0ZWQsIGVsc2UgYG51bGxgLlxuICovXG52YXIgY3JlYXRlQ2FjaGUgPSAhKG5hdGl2ZUNyZWF0ZSAmJiBTZXQpID8gY29uc3RhbnQobnVsbCkgOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIG5ldyBTZXRDYWNoZSh2YWx1ZXMpO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXR1cm4gZnJvbSB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKiB2YXIgZ2V0dGVyID0gXy5jb25zdGFudChvYmplY3QpO1xuICogZ2V0dGVyKCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gY29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxuLy8gQWRkIGZ1bmN0aW9ucyB0byB0aGUgYFNldGAgY2FjaGUuXG5TZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IGNhY2hlUHVzaDtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDYWNoZTtcbiIsIi8vVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSBiaW4vaG9vay5qc1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgndGVtcGxhdGUnKTtcbm1vZHVsZS5leHBvcnRzID0geyAnbWVkaWFfY29udHJvbCc6IHRlbXBsYXRlKCc8ZGl2IGNsYXNzPVwibWVkaWEtY29udHJvbC1iYWNrZ3JvdW5kXCIgZGF0YS1iYWNrZ3JvdW5kPjwvZGl2PjxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLWxheWVyXCIgZGF0YS1jb250cm9scz48JSB2YXIgcmVuZGVyQmFyPWZ1bmN0aW9uKG5hbWUpIHsgJT48ZGl2IGNsYXNzPVwiYmFyLWNvbnRhaW5lclwiIGRhdGEtPCU9IG5hbWUgJT4+PGRpdiBjbGFzcz1cImJhci1iYWNrZ3JvdW5kXCIgZGF0YS08JT0gbmFtZSAlPj48ZGl2IGNsYXNzPVwiYmFyLWZpbGwtMVwiIGRhdGEtPCU9IG5hbWUgJT4+PC9kaXY+PGRpdiBjbGFzcz1cImJhci1maWxsLTJcIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjxkaXYgY2xhc3M9XCJiYXItaG92ZXJcIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJiYXItc2NydWJiZXJcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJiYXItc2NydWJiZXItaWNvblwiIGRhdGEtPCU9IG5hbWUgJT4+PC9kaXY+PC9kaXY+PC9kaXY+PCUgfTsgJT48JSB2YXIgcmVuZGVyU2VnbWVudGVkQmFyPWZ1bmN0aW9uKG5hbWUsIHNlZ21lbnRzKSB7IHNlZ21lbnRzPXNlZ21lbnRzIHx8IDEwOyAlPjxkaXYgY2xhc3M9XCJiYXItY29udGFpbmVyXCIgZGF0YS08JT0gbmFtZSAlPj48JSBmb3IgKHZhciBpID0gMDsgaSA8IHNlZ21lbnRzOyBpKyspIHsgJT48ZGl2IGNsYXNzPVwic2VnbWVudGVkLWJhci1lbGVtZW50XCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48JSB9ICU+PC9kaXY+PCUgfTsgJT48JSB2YXIgcmVuZGVyRHJhd2VyPWZ1bmN0aW9uKG5hbWUsIHJlbmRlckNvbnRlbnQpIHsgJT48ZGl2IGNsYXNzPVwiZHJhd2VyLWNvbnRhaW5lclwiIGRhdGEtPCU9IG5hbWUgJT4+PGRpdiBjbGFzcz1cImRyYXdlci1pY29uLWNvbnRhaW5lclwiIGRhdGEtPCU9IG5hbWUgJT4+PGRpdiBjbGFzcz1cImRyYXdlci1pY29uIG1lZGlhLWNvbnRyb2wtaWNvblwiIGRhdGEtPCU9IG5hbWUgJT4+PC9kaXY+PHNwYW4gY2xhc3M9XCJkcmF3ZXItdGV4dFwiIGRhdGEtPCU9IG5hbWUgJT4+PC9zcGFuPjwvZGl2PjwlIHJlbmRlckNvbnRlbnQobmFtZSk7ICU+PC9kaXY+PCUgfTsgJT48JSB2YXIgcmVuZGVySW5kaWNhdG9yPWZ1bmN0aW9uKG5hbWUpIHsgJT48ZGl2IGNsYXNzPVwibWVkaWEtY29udHJvbC1pbmRpY2F0b3JcIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjwlIH07ICU+PCUgdmFyIHJlbmRlckJ1dHRvbj1mdW5jdGlvbihuYW1lKSB7ICU+PGJ1dHRvbiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtYnV0dG9uIG1lZGlhLWNvbnRyb2wtaWNvblwiIGRhdGEtPCU9IG5hbWUgJT4+PC9idXR0b24+PCUgfTsgJT48JSB2YXIgdGVtcGxhdGVzPXsgYmFyOiByZW5kZXJCYXIsIHNlZ21lbnRlZEJhcjogcmVuZGVyU2VnbWVudGVkQmFyLCB9OyB2YXIgcmVuZGVyPWZ1bmN0aW9uKHNldHRpbmdzTGlzdCkgeyBzZXR0aW5nc0xpc3QuZm9yRWFjaChmdW5jdGlvbihzZXR0aW5nKSB7IGlmKHNldHRpbmcgPT09IFwic2Vla2JhclwiKSB7IHJlbmRlckJhcihzZXR0aW5nKTsgfSBlbHNlIGlmIChzZXR0aW5nID09PSBcInZvbHVtZVwiKSB7IHJlbmRlckRyYXdlcihzZXR0aW5nLCBzZXR0aW5ncy52b2x1bWVCYXJUZW1wbGF0ZSA/IHRlbXBsYXRlc1tzZXR0aW5ncy52b2x1bWVCYXJUZW1wbGF0ZV0gOiBmdW5jdGlvbihuYW1lKSB7IHJldHVybiByZW5kZXJTZWdtZW50ZWRCYXIobmFtZSk7IH0pOyB9IGVsc2UgaWYgKHNldHRpbmcgPT09IFwiZHVyYXRpb25cIiB8fCBzZXR0aW5nPT09IFwicG9zaXRpb25cIikgeyByZW5kZXJJbmRpY2F0b3Ioc2V0dGluZyk7IH0gZWxzZSB7IHJlbmRlckJ1dHRvbihzZXR0aW5nKTsgfSB9KTsgfTsgJT48JSBpZiAoc2V0dGluZ3MuZGVmYXVsdCAmJiBzZXR0aW5ncy5kZWZhdWx0Lmxlbmd0aCkgeyAlPjxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLWNlbnRlci1wYW5lbFwiIGRhdGEtbWVkaWEtY29udHJvbD48JSByZW5kZXIoc2V0dGluZ3MuZGVmYXVsdCk7ICU+PC9kaXY+PCUgfSAlPjwlIGlmIChzZXR0aW5ncy5sZWZ0ICYmIHNldHRpbmdzLmxlZnQubGVuZ3RoKSB7ICU+PGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtbGVmdC1wYW5lbFwiIGRhdGEtbWVkaWEtY29udHJvbD48JSByZW5kZXIoc2V0dGluZ3MubGVmdCk7ICU+PC9kaXY+PCUgfSAlPjwlIGlmIChzZXR0aW5ncy5yaWdodCAmJiBzZXR0aW5ncy5yaWdodC5sZW5ndGgpIHsgJT48ZGl2IGNsYXNzPVwibWVkaWEtY29udHJvbC1yaWdodC1wYW5lbFwiIGRhdGEtbWVkaWEtY29udHJvbD48JSByZW5kZXIoc2V0dGluZ3MucmlnaHQpOyAlPjwvZGl2PjwlIH0gJT48L2Rpdj4nKSwnc2Vla190aW1lJzogdGVtcGxhdGUoJzxzcGFuIGRhdGEtc2Vlay10aW1lPjwvc3Bhbj4nKSwnZmxhc2gnOiB0ZW1wbGF0ZSgnPHBhcmFtIG5hbWU9XCJtb3ZpZVwiIHZhbHVlPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci5zd2ZcIj48cGFyYW0gbmFtZT1cInF1YWxpdHlcIiB2YWx1ZT1cImF1dG9oaWdoXCI+PHBhcmFtIG5hbWU9XCJzd2xpdmVjb25uZWN0XCIgdmFsdWU9XCJ0cnVlXCI+PHBhcmFtIG5hbWU9XCJhbGxvd1NjcmlwdEFjY2Vzc1wiIHZhbHVlPVwiYWx3YXlzXCI+PHBhcmFtIG5hbWU9XCJiZ2NvbG9yXCIgdmFsdWU9XCIjMDAxMTIyXCI+PHBhcmFtIG5hbWU9XCJhbGxvd0Z1bGxTY3JlZW5cIiB2YWx1ZT1cImZhbHNlXCI+PHBhcmFtIG5hbWU9XCJ3bW9kZVwiIHZhbHVlPVwidHJhbnNwYXJlbnRcIj48cGFyYW0gbmFtZT1cInRhYmluZGV4XCIgdmFsdWU9XCIxXCI+PHBhcmFtIG5hbWU9Rmxhc2hWYXJzIHZhbHVlPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPlwiIC8+PGVtYmVkIHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIGRpc2FibGVkIHRhYmluZGV4PVwiLTFcIiBlbmFibGVjb250ZXh0bWVudT1cImZhbHNlXCIgYWxsb3dTY3JpcHRBY2Nlc3M9XCJhbHdheXNcIiBxdWFsaXR5PVwiYXV0b2hpZ2h0XCIgcGx1Z2luc3BhZ2U9XCJodHRwOi8vd3d3Lm1hY3JvbWVkaWEuY29tL2dvL2dldGZsYXNocGxheWVyXCIgd21vZGU9XCJ0cmFuc3BhcmVudFwiIHN3bGl2ZWNvbm5lY3Q9XCJ0cnVlXCIgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIgYWxsb3dmdWxsc2NyZWVuPVwiZmFsc2VcIiBiZ2NvbG9yPVwiIzAwMDAwMFwiIEZsYXNoVmFycz1cInBsYXliYWNrSWQ9PCU9IHBsYXliYWNrSWQgJT5cIiBzcmM9XCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLnN3ZlwiPjwvZW1iZWQ+JyksJ2hscyc6IHRlbXBsYXRlKCc8cGFyYW0gbmFtZT1cIm1vdmllXCIgdmFsdWU9XCI8JT0gYmFzZVVybCAlPi9hc3NldHMvSExTUGxheWVyLnN3Zj9pbmxpbmU9MVwiPjxwYXJhbSBuYW1lPVwicXVhbGl0eVwiIHZhbHVlPVwiYXV0b2hpZ2hcIj48cGFyYW0gbmFtZT1cInN3bGl2ZWNvbm5lY3RcIiB2YWx1ZT1cInRydWVcIj48cGFyYW0gbmFtZT1cImFsbG93U2NyaXB0QWNjZXNzXCIgdmFsdWU9XCJhbHdheXNcIj48cGFyYW0gbmFtZT1cImJnY29sb3JcIiB2YWx1ZT1cIiMwMDExMjJcIj48cGFyYW0gbmFtZT1cImFsbG93RnVsbFNjcmVlblwiIHZhbHVlPVwiZmFsc2VcIj48cGFyYW0gbmFtZT1cIndtb2RlXCIgdmFsdWU9XCJ0cmFuc3BhcmVudFwiPjxwYXJhbSBuYW1lPVwidGFiaW5kZXhcIiB2YWx1ZT1cIjFcIj48cGFyYW0gbmFtZT1GbGFzaFZhcnMgdmFsdWU9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgLz48ZW1iZWQgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIgdGFiaW5kZXg9XCIxXCIgZW5hYmxlY29udGV4dG1lbnU9XCJmYWxzZVwiIGFsbG93U2NyaXB0QWNjZXNzPVwiYWx3YXlzXCIgcXVhbGl0eT1cImF1dG9oaWdoXCIgcGx1Z2luc3BhZ2U9XCJodHRwOi8vd3d3Lm1hY3JvbWVkaWEuY29tL2dvL2dldGZsYXNocGxheWVyXCIgd21vZGU9XCJ0cmFuc3BhcmVudFwiIHN3bGl2ZWNvbm5lY3Q9XCJ0cnVlXCIgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIgYWxsb3dmdWxsc2NyZWVuPVwiZmFsc2VcIiBiZ2NvbG9yPVwiIzAwMDAwMFwiIEZsYXNoVmFycz1cInBsYXliYWNrSWQ9PCU9IHBsYXliYWNrSWQgJT5cIiBzcmM9XCI8JT0gYmFzZVVybCAlPi9hc3NldHMvSExTUGxheWVyLnN3ZlwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj48L2VtYmVkPicpLCdodG1sNV92aWRlbyc6IHRlbXBsYXRlKCc8c291cmNlIHNyYz1cIjwlPXNyYyU+XCIgdHlwZT1cIjwlPXR5cGUlPlwiPicpLCdub19vcCc6IHRlbXBsYXRlKCc8Y2FudmFzIGRhdGEtbm8tb3AtY2FudmFzPjwvY2FudmFzPjxwIGRhdGEtbm8tb3AtbXNnPllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBwbGF5YmFjayBvZiB0aGlzIHZpZGVvLiBUcnkgdG8gdXNlIGEgZGlmZmVyZW50IGJyb3dzZXIuPHA+JyksJ2JhY2tncm91bmRfYnV0dG9uJzogdGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyXCIgZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbj48YnV0dG9uIGNsYXNzPVwiYmFja2dyb3VuZC1idXR0b24taWNvblwiIGRhdGEtYmFja2dyb3VuZC1idXR0b24+PC9idXR0b24+PC9kaXY+JyksJ2Nocm9tZWNhc3QnOiB0ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImNocm9tZWNhc3QtcGxheWJhY2tcIj48ZGl2IGNsYXNzPVwiY2hyb21lY2FzdC1wbGF5YmFjay1vdmVybGF5XCI+PC9kaXY+PC9kaXY+JyksJ2R2cl9jb250cm9scyc6IHRlbXBsYXRlKCc8ZGl2IGNsYXNzPVwibGl2ZS1pbmZvXCI+TElWRTwvZGl2PjxidXR0b24gY2xhc3M9XCJsaXZlLWJ1dHRvblwiPkJBQ0sgVE8gTElWRTwvYnV0dG9uPicpLCdwb3N0ZXInOiB0ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cInBsYXktd3JhcHBlclwiIGRhdGEtcG9zdGVyPjxzcGFuIGNsYXNzPVwicG9zdGVyLWljb24gcGxheVwiIGRhdGEtcG9zdGVyLz48L2Rpdj4nKSwnc3Bpbm5lcl90aHJlZV9ib3VuY2UnOiB0ZW1wbGF0ZSgnPGRpdiBkYXRhLWJvdW5jZTE+PC9kaXY+PGRpdiBkYXRhLWJvdW5jZTI+PC9kaXY+PGRpdiBkYXRhLWJvdW5jZTM+PC9kaXY+JyksJ3dhdGVybWFyayc6IHRlbXBsYXRlKCc8ZGl2IGRhdGEtd2F0ZXJtYXJrIGRhdGEtd2F0ZXJtYXJrLTwlPXBvc2l0aW9uICU+PjxpbWcgc3JjPVwiPCU9IGltYWdlVXJsICU+XCI+PC9kaXY+JyksQ1NTOiB7J2NvbnRhaW5lcic6ICcuY29udGFpbmVyW2RhdGEtY29udGFpbmVyXXtwb3NpdGlvbjphYnNvbHV0ZTtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0uY29udGFpbmVyW2RhdGEtY29udGFpbmVyXS5wb2ludGVyLWVuYWJsZWR7Y3Vyc29yOnBvaW50ZXJ9JywnY29yZSc6ICdbZGF0YS1wbGF5ZXJdey13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTsta2h0bWwtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7LW8tdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lOy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTstbW96LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7LW8tdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApO3Bvc2l0aW9uOnJlbGF0aXZlO21hcmdpbjowO3BhZGRpbmc6MDtib3JkZXI6MDtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo0MDA7dGV4dC1hbGlnbjpjZW50ZXI7b3ZlcmZsb3c6aGlkZGVuO2ZvbnQtc2l6ZToxMDAlO2ZvbnQtZmFtaWx5OlwibHVjaWRhIGdyYW5kZVwiLHRhaG9tYSx2ZXJkYW5hLGFyaWFsLHNhbnMtc2VyaWY7dGV4dC1zaGFkb3c6MCAwIDA7Ym94LXNpemluZzpib3JkZXItYm94fVtkYXRhLXBsYXllcl0gYSxbZGF0YS1wbGF5ZXJdIGFiYnIsW2RhdGEtcGxheWVyXSBhY3JvbnltLFtkYXRhLXBsYXllcl0gYWRkcmVzcyxbZGF0YS1wbGF5ZXJdIGFwcGxldCxbZGF0YS1wbGF5ZXJdIGFydGljbGUsW2RhdGEtcGxheWVyXSBhc2lkZSxbZGF0YS1wbGF5ZXJdIGF1ZGlvLFtkYXRhLXBsYXllcl0gYixbZGF0YS1wbGF5ZXJdIGJpZyxbZGF0YS1wbGF5ZXJdIGJsb2NrcXVvdGUsW2RhdGEtcGxheWVyXSBjYW52YXMsW2RhdGEtcGxheWVyXSBjYXB0aW9uLFtkYXRhLXBsYXllcl0gY2VudGVyLFtkYXRhLXBsYXllcl0gY2l0ZSxbZGF0YS1wbGF5ZXJdIGNvZGUsW2RhdGEtcGxheWVyXSBkZCxbZGF0YS1wbGF5ZXJdIGRlbCxbZGF0YS1wbGF5ZXJdIGRldGFpbHMsW2RhdGEtcGxheWVyXSBkZm4sW2RhdGEtcGxheWVyXSBkaXYsW2RhdGEtcGxheWVyXSBkbCxbZGF0YS1wbGF5ZXJdIGR0LFtkYXRhLXBsYXllcl0gZW0sW2RhdGEtcGxheWVyXSBlbWJlZCxbZGF0YS1wbGF5ZXJdIGZpZWxkc2V0LFtkYXRhLXBsYXllcl0gZmlnY2FwdGlvbixbZGF0YS1wbGF5ZXJdIGZpZ3VyZSxbZGF0YS1wbGF5ZXJdIGZvb3RlcixbZGF0YS1wbGF5ZXJdIGZvcm0sW2RhdGEtcGxheWVyXSBoMSxbZGF0YS1wbGF5ZXJdIGgyLFtkYXRhLXBsYXllcl0gaDMsW2RhdGEtcGxheWVyXSBoNCxbZGF0YS1wbGF5ZXJdIGg1LFtkYXRhLXBsYXllcl0gaDYsW2RhdGEtcGxheWVyXSBoZWFkZXIsW2RhdGEtcGxheWVyXSBoZ3JvdXAsW2RhdGEtcGxheWVyXSBpLFtkYXRhLXBsYXllcl0gaWZyYW1lLFtkYXRhLXBsYXllcl0gaW1nLFtkYXRhLXBsYXllcl0gaW5zLFtkYXRhLXBsYXllcl0ga2JkLFtkYXRhLXBsYXllcl0gbGFiZWwsW2RhdGEtcGxheWVyXSBsZWdlbmQsW2RhdGEtcGxheWVyXSBsaSxbZGF0YS1wbGF5ZXJdIG1hcmssW2RhdGEtcGxheWVyXSBtZW51LFtkYXRhLXBsYXllcl0gbmF2LFtkYXRhLXBsYXllcl0gb2JqZWN0LFtkYXRhLXBsYXllcl0gb2wsW2RhdGEtcGxheWVyXSBvdXRwdXQsW2RhdGEtcGxheWVyXSBwLFtkYXRhLXBsYXllcl0gcHJlLFtkYXRhLXBsYXllcl0gcSxbZGF0YS1wbGF5ZXJdIHJ1YnksW2RhdGEtcGxheWVyXSBzLFtkYXRhLXBsYXllcl0gc2FtcCxbZGF0YS1wbGF5ZXJdIHNlY3Rpb24sW2RhdGEtcGxheWVyXSBzbWFsbCxbZGF0YS1wbGF5ZXJdIHNwYW4sW2RhdGEtcGxheWVyXSBzdHJpa2UsW2RhdGEtcGxheWVyXSBzdHJvbmcsW2RhdGEtcGxheWVyXSBzdWIsW2RhdGEtcGxheWVyXSBzdW1tYXJ5LFtkYXRhLXBsYXllcl0gc3VwLFtkYXRhLXBsYXllcl0gdGFibGUsW2RhdGEtcGxheWVyXSB0Ym9keSxbZGF0YS1wbGF5ZXJdIHRkLFtkYXRhLXBsYXllcl0gdGZvb3QsW2RhdGEtcGxheWVyXSB0aCxbZGF0YS1wbGF5ZXJdIHRoZWFkLFtkYXRhLXBsYXllcl0gdGltZSxbZGF0YS1wbGF5ZXJdIHRyLFtkYXRhLXBsYXllcl0gdHQsW2RhdGEtcGxheWVyXSB1LFtkYXRhLXBsYXllcl0gdWwsW2RhdGEtcGxheWVyXSB2YXIsW2RhdGEtcGxheWVyXSB2aWRlb3ttYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjA7Zm9udDppbmhlcml0O2ZvbnQtc2l6ZToxMDAlO3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfVtkYXRhLXBsYXllcl0gdGFibGV7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlO2JvcmRlci1zcGFjaW5nOjB9W2RhdGEtcGxheWVyXSBjYXB0aW9uLFtkYXRhLXBsYXllcl0gdGQsW2RhdGEtcGxheWVyXSB0aHt0ZXh0LWFsaWduOmxlZnQ7Zm9udC13ZWlnaHQ6NDAwO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX1bZGF0YS1wbGF5ZXJdIGJsb2NrcXVvdGUsW2RhdGEtcGxheWVyXSBxe3F1b3Rlczpub25lfVtkYXRhLXBsYXllcl0gYmxvY2txdW90ZTphZnRlcixbZGF0YS1wbGF5ZXJdIGJsb2NrcXVvdGU6YmVmb3JlLFtkYXRhLXBsYXllcl0gcTphZnRlcixbZGF0YS1wbGF5ZXJdIHE6YmVmb3Jle2NvbnRlbnQ6XCJcIjtjb250ZW50Om5vbmV9W2RhdGEtcGxheWVyXSBhIGltZ3tib3JkZXI6bm9uZX1bZGF0YS1wbGF5ZXJdICp7bWF4LXdpZHRoOmluaXRpYWw7Ym94LXNpemluZzppbmhlcml0O2Zsb2F0OmluaXRpYWx9W2RhdGEtcGxheWVyXS5mdWxsc2NyZWVue3dpZHRoOjEwMCUhaW1wb3J0YW50O2hlaWdodDoxMDAlIWltcG9ydGFudH1bZGF0YS1wbGF5ZXJdLm5vY3Vyc29ye2N1cnNvcjpub25lfS5jbGFwcHItc3R5bGV7ZGlzcGxheTpub25lIWltcG9ydGFudH1AbWVkaWEgc2NyZWVue1tkYXRhLXBsYXllcl17b3BhY2l0eTouOTl9fScsJ21lZGlhX2NvbnRyb2wnOiAnQGZvbnQtZmFjZXtmb250LWZhbWlseTpQbGF5ZXI7c3JjOnVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci5lb3RcIik7c3JjOnVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci5lb3Q/I2llZml4XCIpIGZvcm1hdChcImVtYmVkZGVkLW9wZW50eXBlXCIpLHVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci50dGZcIikgZm9ybWF0KFwidHJ1ZXR5cGVcIiksdXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLnN2ZyNwbGF5ZXJcIikgZm9ybWF0KFwic3ZnXCIpfS5tZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbnstd2Via2l0LXRyYW5zaXRpb246bm9uZSFpbXBvcnRhbnQ7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OjBzOy1tb3otdHJhbnNpdGlvbjpub25lIWltcG9ydGFudDstby10cmFuc2l0aW9uOm5vbmUhaW1wb3J0YW50O3RyYW5zaXRpb246bm9uZSFpbXBvcnRhbnR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXXtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3otaW5kZXg6OTk5OTtwb2ludGVyLWV2ZW50czpub25lfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0uZHJhZ2dpbmd7cG9pbnRlci1ldmVudHM6YXV0bztjdXJzb3I6LXdlYmtpdC1ncmFiYmluZyFpbXBvcnRhbnQ7Y3Vyc29yOmdyYWJiaW5nIWltcG9ydGFudH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLmRyYWdnaW5nICp7Y3Vyc29yOi13ZWJraXQtZ3JhYmJpbmchaW1wb3J0YW50O2N1cnNvcjpncmFiYmluZyFpbXBvcnRhbnR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1iYWNrZ3JvdW5kW2RhdGEtYmFja2dyb3VuZF17cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjQwJTt3aWR0aDoxMDAlO2JvdHRvbTowO2JhY2tncm91bmQtaW1hZ2U6LW93ZyhsaW5lYXItZ3JhZGllbnQocmdiYSgwLDAsMCwwKSxyZ2JhKDAsMCwwLC45KSkpO2JhY2tncm91bmQtaW1hZ2U6LXdlYmtpdChsaW5lYXItZ3JhZGllbnQocmdiYSgwLDAsMCwwKSxyZ2JhKDAsMCwwLC45KSkpO2JhY2tncm91bmQtaW1hZ2U6LW1veihsaW5lYXItZ3JhZGllbnQocmdiYSgwLDAsMCwwKSxyZ2JhKDAsMCwwLC45KSkpO2JhY2tncm91bmQtaW1hZ2U6LW8obGluZWFyLWdyYWRpZW50KHJnYmEoMCwwLDAsMCkscmdiYSgwLDAsMCwuOSkpKTtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudChyZ2JhKDAsMCwwLDApLHJnYmEoMCwwLDAsLjkpKTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuNnM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IC42cyBlYXNlLW91dDstby10cmFuc2l0aW9uOm9wYWNpdHkgLjZzIGVhc2Utb3V0O3RyYW5zaXRpb246b3BhY2l0eSAuNnMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1pY29ue2ZvbnQtZmFtaWx5OlBsYXllcjtmb250LXdlaWdodDo0MDA7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC1zaXplOjI2cHg7bGluZS1oZWlnaHQ6MzJweDtsZXR0ZXItc3BhY2luZzowO3NwZWFrOm5vbmU7Y29sb3I6I2ZmZjtvcGFjaXR5Oi41O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt0ZXh0LWFsaWduOmxlZnQ7LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGU7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2U7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWljb246aG92ZXJ7Y29sb3I6I2ZmZjtvcGFjaXR5Oi43NTt0ZXh0LXNoYWRvdzpyZ2JhKDI1NSwyNTUsMjU1LC44KSAwIDAgNXB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0ubWVkaWEtY29udHJvbC1oaWRlIC5tZWRpYS1jb250cm9sLWJhY2tncm91bmRbZGF0YS1iYWNrZ3JvdW5kXXtvcGFjaXR5OjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS5tZWRpYS1jb250cm9sLWhpZGUgLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc117Ym90dG9tOi01MHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0ubWVkaWEtY29udHJvbC1oaWRlIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1zY3J1YmJlcltkYXRhLXNlZWtiYXJde29wYWNpdHk6MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNde3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTo3cHg7d2lkdGg6MTAwJTtoZWlnaHQ6MzJweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7cG9pbnRlci1ldmVudHM6YXV0bzstd2Via2l0LXRyYW5zaXRpb246Ym90dG9tIC40czstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmJvdHRvbSAuNHMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjpib3R0b20gLjRzIGVhc2Utb3V0O3RyYW5zaXRpb246Ym90dG9tIC40cyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWxlZnQtcGFuZWxbZGF0YS1tZWRpYS1jb250cm9sXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjRweDtoZWlnaHQ6MTAwJX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWNlbnRlci1wYW5lbFtkYXRhLW1lZGlhLWNvbnRyb2xde2hlaWdodDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO2xpbmUtaGVpZ2h0OjMycHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1yaWdodC1wYW5lbFtkYXRhLW1lZGlhLWNvbnRyb2xde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjRweDtoZWlnaHQ6MTAwJX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbntiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjowO21hcmdpbjowIDZweDtwYWRkaW5nOjA7Y3Vyc29yOnBvaW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2t9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b246Zm9jdXN7b3V0bGluZTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheV17ZmxvYXQ6bGVmdDtoZWlnaHQ6MTAwJTtmb250LXNpemU6MjBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXldOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBhdXNlXXtmbG9hdDpsZWZ0O2hlaWdodDoxMDAlO2ZvbnQtc2l6ZToyMHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGF1c2VdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDJcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXN0b3Bde2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjIwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1zdG9wXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAzXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1mdWxsc2NyZWVuXXtmbG9hdDpyaWdodDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjowO2hlaWdodDoxMDAlfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtZnVsbHNjcmVlbl06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwNlwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtZnVsbHNjcmVlbl0uc2hyaW5rOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDdcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWhkLWluZGljYXRvcl17Y3Vyc29yOmRlZmF1bHQ7ZmxvYXQ6cmlnaHQ7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MDtoZWlnaHQ6MTAwJTtvcGFjaXR5OjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1oZC1pbmRpY2F0b3JdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDhcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWhkLWluZGljYXRvcl0uZW5hYmxlZHtvcGFjaXR5OjF9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1oZC1pbmRpY2F0b3JdLmVuYWJsZWQ6aG92ZXJ7b3BhY2l0eToxO3RleHQtc2hhZG93Om5vbmV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5cGF1c2Vde2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjIwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5cGF1c2VdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlwYXVzZV0ucGxheWluZzpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAyXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5cGF1c2VdLnBhdXNlZDpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5c3RvcF17ZmxvYXQ6bGVmdDtoZWlnaHQ6MTAwJTtmb250LXNpemU6MjBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlzdG9wXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5c3RvcF0ucGxheWluZzpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAzXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5c3RvcF0uc3RvcHBlZDpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1kdXJhdGlvbl0sLm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1wb3NpdGlvbl17ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC1zaXplOjEwcHg7Y29sb3I6I2ZmZjtjdXJzb3I6ZGVmYXVsdDtsaW5lLWhlaWdodDozMnB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtcG9zaXRpb25de21hcmdpbi1sZWZ0OjZweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLWR1cmF0aW9uXXtjb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC41KTttYXJnaW4tcmlnaHQ6NnB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtZHVyYXRpb25dOmJlZm9yZXtjb250ZW50OlwifFwiO21hcmdpbjowIDNweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl17cG9zaXRpb246YWJzb2x1dGU7dG9wOi0yMHB4O2xlZnQ6MDtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7d2lkdGg6MTAwJTtoZWlnaHQ6MjVweDtjdXJzb3I6cG9pbnRlcn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl17d2lkdGg6MTAwJTtoZWlnaHQ6MXB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxMnB4O2JhY2tncm91bmQtY29sb3I6IzY2Nn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1maWxsLTFbZGF0YS1zZWVrYmFyXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MDtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiNjMmMyYzI7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dDt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjA7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1jb2xvcjojMDA1YWZmOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dDstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWhvdmVyW2RhdGEtc2Vla2Jhcl17b3BhY2l0eTowO3Bvc2l0aW9uOmFic29sdXRlO3RvcDotM3B4O3dpZHRoOjVweDtoZWlnaHQ6N3B4O2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNSk7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlOy1vLXRyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZTt0cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2V9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdOmhvdmVyIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItaG92ZXJbZGF0YS1zZWVrYmFyXXtvcGFjaXR5OjF9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdLnNlZWstZGlzYWJsZWR7Y3Vyc29yOmRlZmF1bHR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdLnNlZWstZGlzYWJsZWQ6aG92ZXIgLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1ob3ZlcltkYXRhLXNlZWtiYXJde29wYWNpdHk6MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1zY3J1YmJlcltkYXRhLXNlZWtiYXJde3Bvc2l0aW9uOmFic29sdXRlO3RvcDoycHg7bGVmdDowO3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dDstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLXNjcnViYmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1zY3J1YmJlci1pY29uW2RhdGEtc2Vla2Jhcl17cG9zaXRpb246YWJzb2x1dGU7bGVmdDo2cHg7dG9wOjZweDt3aWR0aDo4cHg7aGVpZ2h0OjhweDtib3JkZXItcmFkaXVzOjEwcHg7Ym94LXNoYWRvdzowIDAgMCA2cHggcmdiYSgyNTUsMjU1LDI1NSwuMik7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVde2Zsb2F0OnJpZ2h0O2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDozMnB4O2N1cnNvcjpwb2ludGVyO21hcmdpbjowIDZweDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV17ZmxvYXQ6bGVmdDtib3R0b206MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVde2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjA7Ym94LXNpemluZzpjb250ZW50LWJveDt3aWR0aDoxNnB4O2hlaWdodDozMnB4O21hcmdpbi1yaWdodDo2cHg7b3BhY2l0eToxfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV06aG92ZXJ7b3BhY2l0eToxfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwNFwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV0ubXV0ZWR7b3BhY2l0eTouNX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdLm11dGVkOmhvdmVye29wYWNpdHk6Ljd9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXS5tdXRlZDpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDA1XCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVde2Zsb2F0OmxlZnQ7cG9zaXRpb246cmVsYXRpdmU7dG9wOjZweDt3aWR0aDo0MnB4O2hlaWdodDoxOHB4O3BhZGRpbmc6M3B4IDA7b3ZlcmZsb3c6aGlkZGVuOy13ZWJraXQtdHJhbnNpdGlvbjp3aWR0aCAuMnM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjp3aWR0aCAuMnMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjp3aWR0aCAuMnMgZWFzZS1vdXQ7dHJhbnNpdGlvbjp3aWR0aCAuMnMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5zZWdtZW50ZWQtYmFyLWVsZW1lbnRbZGF0YS12b2x1bWVde2Zsb2F0OmxlZnQ7d2lkdGg6NHB4O3BhZGRpbmctbGVmdDoycHg7aGVpZ2h0OjEycHg7b3BhY2l0eTouNTstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1tb3otYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LW1zLWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1vLWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmO2JveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy13ZWJraXQtdHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuMnM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjotbW96LXRyYW5zZm9ybSAuMnMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjotby10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0O3RyYW5zaXRpb246dHJhbnNmb3JtIC4ycyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV0uZmlsbHstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1tb3otYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LW1zLWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1vLWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmO2JveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmO29wYWNpdHk6MX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV06bnRoLW9mLXR5cGUoMSl7cGFkZGluZy1sZWZ0OjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5zZWdtZW50ZWQtYmFyLWVsZW1lbnRbZGF0YS12b2x1bWVdOmhvdmVyey13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSgxLjUpOy1tb3otdHJhbnNmb3JtOnNjYWxlWSgxLjUpOy1tcy10cmFuc2Zvcm06c2NhbGVZKDEuNSk7LW8tdHJhbnNmb3JtOnNjYWxlWSgxLjUpO3RyYW5zZm9ybTpzY2FsZVkoMS41KX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLnczMjAgLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXS52b2x1bWUtYmFyLWhpZGV7aGVpZ2h0OjEycHg7dG9wOjlweDtwYWRkaW5nOjA7d2lkdGg6MH0nLCdzZWVrX3RpbWUnOiAnLnNlZWstdGltZVtkYXRhLXNlZWstdGltZV17cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6YXV0bztoZWlnaHQ6MjBweDtsaW5lLWhlaWdodDoyMHB4O2JvdHRvbTo1NXB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgyLDIsMiwuNSk7ei1pbmRleDo5OTk5Oy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZTstbW96LXRyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZTstby10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2U7dHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlfS5zZWVrLXRpbWVbZGF0YS1zZWVrLXRpbWVdLmhpZGRlbltkYXRhLXNlZWstdGltZV17b3BhY2l0eTowfS5zZWVrLXRpbWVbZGF0YS1zZWVrLXRpbWVdIHNwYW5bZGF0YS1zZWVrLXRpbWVde3Bvc2l0aW9uOnJlbGF0aXZlO2NvbG9yOiNmZmY7Zm9udC1zaXplOjEwcHg7cGFkZGluZy1sZWZ0OjdweDtwYWRkaW5nLXJpZ2h0OjdweH0nLCdmbGFzaCc6ICdbZGF0YS1mbGFzaF17cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7ZGlzcGxheTpibG9jaztwb2ludGVyLWV2ZW50czpub25lfScsJ2hscyc6ICdbZGF0YS1obHNde3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6YmxvY2s7cG9pbnRlci1ldmVudHM6bm9uZTt0b3A6MH0nLCdodG1sNV92aWRlbyc6ICdbZGF0YS1odG1sNS12aWRlb117cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtkaXNwbGF5OmJsb2NrfScsJ2h0bWxfaW1nJzogJ1tkYXRhLWh0bWwtaW1nXXttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCV9Jywnbm9fb3AnOiAnW2RhdGEtbm8tb3Bde3otaW5kZXg6MTAwMDtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyfVtkYXRhLW5vLW9wXSBwW2RhdGEtbm8tb3AtbXNnXXtwb3NpdGlvbjphYnNvbHV0ZTtmb250LXNpemU6MjVweDt0b3A6NDAlO2NvbG9yOiNmZmZ9W2RhdGEtbm8tb3BdIGNhbnZhc1tkYXRhLW5vLW9wLWNhbnZhc117YmFja2dyb3VuZC1jb2xvcjojNzc3O2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9JywnYmFja2dyb3VuZF9idXR0b24nOiAnLmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25de2ZvbnQtZmFtaWx5OlBsYXllcjtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMik7cG9pbnRlci1ldmVudHM6bm9uZTstd2Via2l0LXRyYW5zaXRpb246YWxsIC40czstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmFsbCAuNHMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjphbGwgLjRzIGVhc2Utb3V0O3RyYW5zaXRpb246YWxsIC40cyBlYXNlLW91dH0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0uaGlkZXtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXS5oaWRlIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25de29wYWNpdHk6MH0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLXdyYXBwZXJbZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl17cG9zaXRpb246YWJzb2x1dGU7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjEwMCU7aGVpZ2h0OjI1JTtsaW5lLWhlaWdodDoxMDAlO2ZvbnQtc2l6ZToyNSU7dG9wOjUwJTt0ZXh0LWFsaWduOmNlbnRlcn0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLXdyYXBwZXJbZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLWljb25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl17Y3Vyc29yOnBvaW50ZXI7cG9pbnRlci1ldmVudHM6YXV0bztmb250LWZhbWlseTpQbGF5ZXI7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc3R5bGU6bm9ybWFsO2xpbmUtaGVpZ2h0OjE7bGV0dGVyLXNwYWNpbmc6MDtzcGVhazpub25lO2NvbG9yOiNmZmY7b3BhY2l0eTouNzU7Ym9yZGVyOjA7b3V0bGluZTowO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGU7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2U7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZX0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLXdyYXBwZXJbZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLWljb25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl06aG92ZXJ7b3BhY2l0eToxO3RleHQtc2hhZG93OnJnYmEoMjU1LDI1NSwyNTUsLjgpIDAgMCAxNXB4fS5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24td3JhcHBlcltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24taWNvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXS5wbGF5aW5nOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDJcIn0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLXdyYXBwZXJbZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLWljb25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0ubm90cGxheWluZzpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi1pY29uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dLnBsYXlzdG9wLnBsYXlpbmc6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwM1wifS5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24td3JhcHBlcltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24taWNvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXS5wbGF5c3RvcC5ub3RwbGF5aW5nOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0ubWVkaWEtY29udHJvbC5tZWRpYS1jb250cm9sLWhpZGVbZGF0YS1tZWRpYS1jb250cm9sXSAuYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl17b3BhY2l0eTowfScsJ2Nocm9tZWNhc3QnOiAnLmNocm9tZWNhc3QtcGxheWJhY2t7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0uY2hyb21lY2FzdC1wbGF5YmFjay1vdmVybGF5e2JhY2tncm91bmQtY29sb3I6IzAwMDtoZWlnaHQ6MTAwJTtvcGFjaXR5Oi42O3dpZHRoOjEwMCV9QGZvbnQtZmFjZXtmb250LWZhbWlseTpjaHJvbWVjYXN0O3NyYzp1cmwoYXNzZXRzL2Nocm9tZWNhc3QuZW90Py0ycndiNnQpO3NyYzp1cmwoYXNzZXRzL2Nocm9tZWNhc3QuZW90PyNpZWZpeC0ycndiNnQpIGZvcm1hdChcImVtYmVkZGVkLW9wZW50eXBlXCIpLHVybChhc3NldHMvY2hyb21lY2FzdC53b2ZmPy0ycndiNnQpIGZvcm1hdChcIndvZmZcIiksdXJsKGFzc2V0cy9jaHJvbWVjYXN0LnR0Zj8tMnJ3YjZ0KSBmb3JtYXQoXCJ0cnVldHlwZVwiKSx1cmwoYXNzZXRzL2Nocm9tZWNhc3Quc3ZnPy0ycndiNnQjY2hyb21lY2FzdCkgZm9ybWF0KFwic3ZnXCIpO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXN0eWxlOm5vcm1hbH0uY2hyb21lY2FzdC1idXR0b257YmFja2dyb3VuZDowIDA7Ym9yZGVyOjA7d2lkdGg6MzJweDtoZWlnaHQ6MjZweDtmb250LXNpemU6MjJweDtsaW5lLWhlaWdodDoyNnB4O2xldHRlci1zcGFjaW5nOjA7Y29sb3I6I2ZmZjtvcGFjaXR5Oi41O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt0ZXh0LWFsaWduOmxlZnQ7Y3Vyc29yOnBvaW50ZXI7LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGU7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTstbW96LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlOy1vLXRyYW5zaXRpb246YWxsIC4xcyBlYXNlO3RyYW5zaXRpb246YWxsIC4xcyBlYXNlfS5jaHJvbWVjYXN0LWJ1dHRvbjpob3ZlcntvcGFjaXR5Oi43NTt0ZXh0LXNoYWRvdzpyZ2JhKDI1NSwyNTUsMjU1LC44KSAwIDAgNXB4fS5jaHJvbWVjYXN0LWJ1dHRvbjpmb2N1c3tvdXRsaW5lOjB9LmNocm9tZWNhc3QtaWNvbntmb250LWZhbWlseTpjaHJvbWVjYXN0O3NwZWFrOm5vbmU7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtdmFyaWFudDpub3JtYWw7dGV4dC10cmFuc2Zvcm06bm9uZTstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZX0uaWNvbi1jYXN0OmJlZm9yZXtjb250ZW50OlwiXFxcXGU2MDBcIn0uaWNvbi1jYXN0LWNvbm5lY3RlZDpiZWZvcmV7Y29udGVudDpcIlxcXFxlNjAxXCJ9JywnZHZyX2NvbnRyb2xzJzogJ0BpbXBvcnQgdXJsKGh0dHA6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90byk7LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc117ZGlzcGxheTppbmxpbmUtYmxvY2s7ZmxvYXQ6bGVmdDtjb2xvcjojZmZmO2xpbmUtaGVpZ2h0OjMycHg7Zm9udC1zaXplOjEwcHg7Zm9udC13ZWlnaHQ6NzAwO21hcmdpbi1sZWZ0OjZweH0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1pbmZve2N1cnNvcjpkZWZhdWx0O2ZvbnQtZmFtaWx5OlJvYm90byxcIk9wZW4gU2Fuc1wiLEFyaWFsLHNhbnMtc2VyaWZ9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtaW5mbzpiZWZvcmV7Y29udGVudDpcIlwiO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjdweDtoZWlnaHQ6N3B4O2JvcmRlci1yYWRpdXM6My41cHg7bWFyZ2luLXJpZ2h0OjMuNXB4O2JhY2tncm91bmQtY29sb3I6I2ZmMDEwMX0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1pbmZvLmRpc2FibGVke29wYWNpdHk6LjN9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtaW5mby5kaXNhYmxlZDpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWJ1dHRvbntjdXJzb3I6cG9pbnRlcjtvdXRsaW5lOjA7ZGlzcGxheTpub25lO2JvcmRlcjowO2NvbG9yOiNmZmY7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtoZWlnaHQ6MzJweDtwYWRkaW5nOjA7b3BhY2l0eTouNztmb250LWZhbWlseTpSb2JvdG8sXCJPcGVuIFNhbnNcIixBcmlhbCxzYW5zLXNlcmlmOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlOy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2V9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtYnV0dG9uOmJlZm9yZXtjb250ZW50OlwiXCI7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6N3B4O2hlaWdodDo3cHg7Ym9yZGVyLXJhZGl1czozLjVweDttYXJnaW4tcmlnaHQ6My41cHg7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWJ1dHRvbjpob3ZlcntvcGFjaXR5OjE7dGV4dC1zaGFkb3c6cmdiYSgyNTUsMjU1LDI1NSwuNzUpIDAgMCA1cHh9LmR2ciAuZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1pbmZve2Rpc3BsYXk6bm9uZX0uZHZyIC5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWJ1dHRvbntkaXNwbGF5OmJsb2NrfS5kdnIubWVkaWEtY29udHJvbC5saXZlW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWZpbGwtMltkYXRhLXNlZWtiYXJde2JhY2tncm91bmQtY29sb3I6IzAwNWFmZn0ubWVkaWEtY29udHJvbC5saXZlW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWZpbGwtMltkYXRhLXNlZWtiYXJde2JhY2tncm91bmQtY29sb3I6I2ZmMDEwMX0uc2Vlay10aW1lW2RhdGEtc2Vlay10aW1lXSBzcGFuW2RhdGEtZHVyYXRpb25de3Bvc2l0aW9uOnJlbGF0aXZlO2NvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjUpO2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctcmlnaHQ6N3B4fS5zZWVrLXRpbWVbZGF0YS1zZWVrLXRpbWVdIHNwYW5bZGF0YS1kdXJhdGlvbl06YmVmb3Jle2NvbnRlbnQ6XCJ8XCI7bWFyZ2luLXJpZ2h0OjdweH0nLCdwb3N0ZXInOiAnQGZvbnQtZmFjZXtmb250LWZhbWlseTpQbGF5ZXI7c3JjOnVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci5lb3RcIik7c3JjOnVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci5lb3Q/I2llZml4XCIpIGZvcm1hdChcImVtYmVkZGVkLW9wZW50eXBlXCIpLHVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci50dGZcIikgZm9ybWF0KFwidHJ1ZXR5cGVcIiksdXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLnN2ZyNwbGF5ZXJcIikgZm9ybWF0KFwic3ZnXCIpfS5wbGF5ZXItcG9zdGVyW2RhdGEtcG9zdGVyXXtjdXJzb3I6cG9pbnRlcjtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO3otaW5kZXg6OTk4O3RvcDowfS5wbGF5ZXItcG9zdGVyW2RhdGEtcG9zdGVyXSAucG9zdGVyLWJhY2tncm91bmRbZGF0YS1wb3N0ZXJde3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1zaXplOmNvdmVyO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXBvc2l0aW9uOjUwJSA1MCV9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJdIC5wbGF5LXdyYXBwZXJbZGF0YS1wb3N0ZXJde3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCU7aGVpZ2h0OjI1JTtsaW5lLWhlaWdodDoxMDAlO2ZvbnQtc2l6ZToyNSU7dG9wOjUwJTt0ZXh0LWFsaWduOmNlbnRlcn0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl0gLnBsYXktd3JhcHBlcltkYXRhLXBvc3Rlcl0gLnBvc3Rlci1pY29uW2RhdGEtcG9zdGVyXXtmb250LWZhbWlseTpQbGF5ZXI7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc3R5bGU6bm9ybWFsO2xpbmUtaGVpZ2h0OjE7bGV0dGVyLXNwYWNpbmc6MDtzcGVhazpub25lO2NvbG9yOiNmZmY7b3BhY2l0eTouNzU7LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGU7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgdGV4dC1zaGFkb3c7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5Oi4xczstbW96LXRyYW5zaXRpb246b3BhY2l0eSB0ZXh0LXNoYWRvdyAuMXM7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IHRleHQtc2hhZG93IC4xczt0cmFuc2l0aW9uOm9wYWNpdHkgdGV4dC1zaGFkb3cgLjFzIGVhc2V9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJdIC5wbGF5LXdyYXBwZXJbZGF0YS1wb3N0ZXJdIC5wb3N0ZXItaWNvbltkYXRhLXBvc3Rlcl0ucGxheVtkYXRhLXBvc3Rlcl06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5wbGF5ZXItcG9zdGVyW2RhdGEtcG9zdGVyXSAucGxheS13cmFwcGVyW2RhdGEtcG9zdGVyXSAucG9zdGVyLWljb25bZGF0YS1wb3N0ZXJdOmhvdmVye29wYWNpdHk6MTt0ZXh0LXNoYWRvdzpyZ2JhKDI1NSwyNTUsMjU1LC44KSAwIDAgMTVweH0nLCdzcGlubmVyX3RocmVlX2JvdW5jZSc6ICcuc3Bpbm5lci10aHJlZS1ib3VuY2VbZGF0YS1zcGlubmVyXXtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW46MCBhdXRvO3dpZHRoOjcwcHg7dGV4dC1hbGlnbjpjZW50ZXI7ei1pbmRleDo5OTk7dG9wOjQ3JTtsZWZ0OjA7cmlnaHQ6MH0uc3Bpbm5lci10aHJlZS1ib3VuY2VbZGF0YS1zcGlubmVyXT5kaXZ7d2lkdGg6MThweDtoZWlnaHQ6MThweDtiYWNrZ3JvdW5kLWNvbG9yOiNGRkY7Ym9yZGVyLXJhZGl1czoxMDAlO2Rpc3BsYXk6aW5saW5lLWJsb2NrOy13ZWJraXQtYW5pbWF0aW9uOmJvdW5jZWRlbGF5IDEuNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7LW1vei1hbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDstbXMtYW5pbWF0aW9uOmJvdW5jZWRlbGF5IDEuNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7LW8tYW5pbWF0aW9uOmJvdW5jZWRlbGF5IDEuNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7YW5pbWF0aW9uOmJvdW5jZWRlbGF5IDEuNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7LXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOmJvdGg7LW1vei1hbmltYXRpb24tZmlsbC1tb2RlOmJvdGg7LW1zLWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDstby1hbmltYXRpb24tZmlsbC1tb2RlOmJvdGg7YW5pbWF0aW9uLWZpbGwtbW9kZTpib3RofS5zcGlubmVyLXRocmVlLWJvdW5jZVtkYXRhLXNwaW5uZXJdIFtkYXRhLWJvdW5jZTFdLC5zcGlubmVyLXRocmVlLWJvdW5jZVtkYXRhLXNwaW5uZXJdIFtkYXRhLWJvdW5jZTJdey13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0uMzJzOy1tb3otYW5pbWF0aW9uLWRlbGF5Oi0uMzJzOy1tcy1hbmltYXRpb24tZGVsYXk6LS4zMnM7LW8tYW5pbWF0aW9uLWRlbGF5Oi0uMzJzO2FuaW1hdGlvbi1kZWxheTotLjMyc31ALW1vei1rZXlmcmFtZXMgYm91bmNlZGVsYXl7MCUsMTAwJSw4MCV7LW1vei10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfTQwJXstbW96LXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fUAtd2Via2l0LWtleWZyYW1lcyBib3VuY2VkZWxheXswJSwxMDAlLDgwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9NDAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19QC1vLWtleWZyYW1lcyBib3VuY2VkZWxheXswJSwxMDAlLDgwJXstby10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfTQwJXstby10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpfX1ALW1zLWtleWZyYW1lcyBib3VuY2VkZWxheXswJSwxMDAlLDgwJXstbXMtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX00MCV7LW1zLXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fUBrZXlmcmFtZXMgYm91bmNlZGVsYXl7MCUsMTAwJSw4MCV7dHJhbnNmb3JtOnNjYWxlKDApfTQwJXt0cmFuc2Zvcm06c2NhbGUoMSl9fScsJ3dhdGVybWFyayc6ICdbZGF0YS13YXRlcm1hcmtde3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbjoxMDBweCBhdXRvIDA7d2lkdGg6NzBweDt0ZXh0LWFsaWduOmNlbnRlcjt6LWluZGV4OjEwfVtkYXRhLXdhdGVybWFyay1ib3R0b20tbGVmdF17Ym90dG9tOjEwcHg7bGVmdDoxMHB4fVtkYXRhLXdhdGVybWFyay1ib3R0b20tcmlnaHRde2JvdHRvbToxMHB4O3JpZ2h0OjQycHh9W2RhdGEtd2F0ZXJtYXJrLXRvcC1sZWZ0XXt0b3A6LTk1cHg7bGVmdDoxMHB4fVtkYXRhLXdhdGVybWFyay10b3AtcmlnaHRde3RvcDotOTVweDtyaWdodDozN3B4fScsfX07IiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyICQgPSByZXF1aXJlKCd6ZXB0bycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgndGVtcGxhdGUnKTtcbnZhciBKU1QgPSByZXF1aXJlKCcuL2pzdCcpO1xuXG52YXIgU3R5bGVyID0ge1xuICBnZXRTdHlsZUZvcjogZnVuY3Rpb24obmFtZSwgb3B0aW9ucz17YmFzZVVybDogJyd9KSB7XG4gICAgcmV0dXJuICQoJzxzdHlsZSBjbGFzcz1cImNsYXBwci1zdHlsZVwiPjwvc3R5bGU+JykuaHRtbCh0ZW1wbGF0ZShKU1QuQ1NTW25hbWVdKShvcHRpb25zKSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGVyO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2xvZGFzaC5hc3NpZ24nKVxudmFyIEJyb3dzZXIgPSByZXF1aXJlKCdicm93c2VyJyk7XG5cbnZhciBleHRlbmQgPSBmdW5jdGlvbihwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICB2YXIgcGFyZW50ID0gdGhpcztcbiAgdmFyIGNoaWxkO1xuXG4gIGlmIChwcm90b1Byb3BzICYmIHByb3RvUHJvcHMuY29uc3RydWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgIGNoaWxkID0gcHJvdG9Qcm9wcy5jb25zdHJ1Y3RvcjtcbiAgfSBlbHNlIHtcbiAgICBjaGlsZCA9IGZ1bmN0aW9uKCl7IHJldHVybiBwYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgfVxuXG4gIGFzc2lnbihjaGlsZCwgcGFyZW50LCBzdGF0aWNQcm9wcyk7XG5cbiAgdmFyIFN1cnJvZ2F0ZSA9IGZ1bmN0aW9uKCl7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfTtcbiAgU3Vycm9nYXRlLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XG4gIGNoaWxkLnByb3RvdHlwZSA9IG5ldyBTdXJyb2dhdGUoKTtcblxuICBpZiAocHJvdG9Qcm9wcykgYXNzaWduKGNoaWxkLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG5cbiAgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTtcblxuICBjaGlsZC5zdXBlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gcGFyZW50LnByb3RvdHlwZVtuYW1lXTtcbiAgfTtcblxuICBjaGlsZC5wcm90b3R5cGUuZ2V0Q2xhc3MgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gY2hpbGQ7XG4gIH1cblxuICByZXR1cm4gY2hpbGQ7XG59O1xuXG52YXIgZm9ybWF0VGltZSA9IGZ1bmN0aW9uKHRpbWUpIHtcbiAgICB0aW1lID0gdGltZSAqIDEwMDBcbiAgICB0aW1lID0gcGFyc2VJbnQodGltZS8xMDAwKVxuICAgIHZhciBzZWNvbmRzID0gdGltZSAlIDYwXG4gICAgdGltZSA9IHBhcnNlSW50KHRpbWUvNjApXG4gICAgdmFyIG1pbnV0ZXMgPSB0aW1lICUgNjBcbiAgICB0aW1lID0gcGFyc2VJbnQodGltZS82MClcbiAgICB2YXIgaG91cnMgPSB0aW1lICUgMjRcbiAgICB2YXIgb3V0ID0gXCJcIlxuICAgIGlmIChob3VycyAmJiBob3VycyA+IDApIG91dCArPSAoXCIwXCIgKyBob3Vycykuc2xpY2UoLTIpICsgXCI6XCJcbiAgICBvdXQgKz0gKFwiMFwiICsgbWludXRlcykuc2xpY2UoLTIpICsgXCI6XCJcbiAgICBvdXQgKz0gKFwiMFwiICsgc2Vjb25kcykuc2xpY2UoLTIpXG4gICAgcmV0dXJuIG91dC50cmltKClcbn1cblxudmFyIEZ1bGxzY3JlZW4gPSB7XG4gIGlzRnVsbHNjcmVlbjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8IFxuICAgICAgZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVuIHx8IFxuICAgICAgZG9jdW1lbnQubW96RnVsbFNjcmVlbiB8fCBcbiAgICAgICEhZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudFxuICAgICk7XG4gIH0sXG4gIHJlcXVlc3RGdWxsc2NyZWVuOiBmdW5jdGlvbihlbCkge1xuICAgIGlmKGVsLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICBlbC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgIH0gZWxzZSBpZihlbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgZWwud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICB9IGVsc2UgaWYoZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgIGVsLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgfSBlbHNlIGlmKGVsLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGVsLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICB9IGVsc2UgaWYgKGVsLnF1ZXJ5U2VsZWN0b3IgJiYgZWwucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpLndlYmtpdEVudGVyRnVsbFNjcmVlbikge1xuICAgICAgZWwucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpLndlYmtpdEVudGVyRnVsbFNjcmVlbigpO1xuICAgIH1cbiAgfSxcbiAgY2FuY2VsRnVsbHNjcmVlbjogZnVuY3Rpb24oKSB7XG4gICAgaWYoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgfSBlbHNlIGlmKGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gICAgfSBlbHNlIGlmKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xuICAgICAgZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xuICAgIH1cbiAgfVxufTtcblxuY2xhc3MgQ29uZmlnIHtcblxuICBzdGF0aWMgX2RlZmF1bHRDb25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZvbHVtZToge1xuICAgICAgICB2YWx1ZTogMTAwLFxuICAgICAgICBwYXJzZTogcGFyc2VJbnRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgX2RlZmF1bHRWYWx1ZUZvcihrZXkpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRDb25maWcoKVtrZXldWydwYXJzZSddKHRoaXMuX2RlZmF1bHRDb25maWcoKVtrZXldWyd2YWx1ZSddKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgX2NyZWF0ZV9rZXlzcGFjZShrZXkpe1xuICAgIHJldHVybiAnY2xhcHByLicgKyBkb2N1bWVudC5kb21haW4gKyAnLicgKyBrZXlcbiAgfVxuXG4gIHN0YXRpYyByZXN0b3JlKGtleSkge1xuICAgIGlmIChCcm93c2VyLmhhc0xvY2Fsc3RvcmFnZSAmJiBsb2NhbFN0b3JhZ2VbdGhpcy5fY3JlYXRlX2tleXNwYWNlKGtleSldKXtcbiAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0Q29uZmlnKClba2V5XVsncGFyc2UnXShsb2NhbFN0b3JhZ2VbdGhpcy5fY3JlYXRlX2tleXNwYWNlKGtleSldKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFZhbHVlRm9yKGtleSlcbiAgfVxuXG4gIHN0YXRpYyBwZXJzaXN0KGtleSwgdmFsdWUpIHtcbiAgICBpZiAoQnJvd3Nlci5oYXNMb2NhbHN0b3JhZ2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZVt0aGlzLl9jcmVhdGVfa2V5c3BhY2Uoa2V5KV0gPSB2YWx1ZVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG52YXIgc2Vla1N0cmluZ1RvU2Vjb25kcyA9IGZ1bmN0aW9uKHVybCkge1xuICB2YXIgZWxlbWVudHMgPSAodXJsLm1hdGNoKC90PShbMC05XSpoKT8oWzAtOV0qbSk/KFswLTldKnMpPy8pIHx8IFtdKS5zcGxpY2UoMSk7XG4gIHJldHVybiAoISFlbGVtZW50cy5sZW5ndGgpPyBlbGVtZW50cy5tYXAoZnVuY3Rpb24gKGVsKSB7XG4gICAgaWYgKGVsKSB7XG4gICAgICB2YXIgdmFsdWUgPSBwYXJzZUludChlbC5zbGljZSgwLDIpKSB8fCAwO1xuICAgICAgc3dpdGNoIChlbFtlbC5sZW5ndGgtMV0pIHtcbiAgICAgICAgY2FzZSAnaCc6IHZhbHVlID0gdmFsdWUgKiAzNjAwOyBicmVhaztcbiAgICAgICAgY2FzZSAnbSc6IHZhbHVlID0gdmFsdWUgKiA2MDsgYnJlYWs7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfSkucmVkdWNlKGZ1bmN0aW9uIChhLGIpIHsgcmV0dXJuIGErYjsgfSk6IDA7XG59XG5cbnZhciBpZENvdW50ZXIgPSAwO1xuXG52YXIgdW5pcXVlSWQgPSBmdW5jdGlvbihwcmVmaXgpIHtcbiAgdmFyIGlkID0gKytpZENvdW50ZXI7XG4gIHJldHVybiBwcmVmaXggKyBpZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGV4dGVuZDogZXh0ZW5kLFxuICBmb3JtYXRUaW1lOiBmb3JtYXRUaW1lLFxuICBGdWxsc2NyZWVuOiBGdWxsc2NyZWVuLFxuICBDb25maWc6IENvbmZpZyxcbiAgc2Vla1N0cmluZ1RvU2Vjb25kczogc2Vla1N0cmluZ1RvU2Vjb25kcyxcbiAgdW5pcXVlSWQ6IHVuaXF1ZUlkXG59O1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuLyoqXG4gKiBDb250YWluZXIgaXMgcmVzcG9uc2libGUgZm9yIHRoZSB2aWRlbyByZW5kZXJpbmcgYW5kIHN0YXRlXG4gKi9cblxudmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgndWlfb2JqZWN0Jyk7XG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpXG5cbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIFVJT2JqZWN0IHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnQ29udGFpbmVyJyB9XG4gIGdldCBhdHRyaWJ1dGVzKCkgeyByZXR1cm4geyBjbGFzczogJ2NvbnRhaW5lcicsICdkYXRhLWNvbnRhaW5lcic6ICcnIH0gfVxuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7J2NsaWNrJzogJ2NsaWNrZWQnLCAnbW91c2VlbnRlcic6ICdtb3VzZUVudGVyJywgJ21vdXNlbGVhdmUnOiAnbW91c2VMZWF2ZSd9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5wbGF5YmFjayA9IG9wdGlvbnMucGxheWJhY2s7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMucGxheWJhY2suc2V0dGluZ3M7XG4gICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMucGx1Z2lucyA9IFt0aGlzLnBsYXliYWNrXTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUFJPR1JFU1MsIHRoaXMucHJvZ3Jlc3MpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRoaXMudGltZVVwZGF0ZWQpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLnJlYWR5KTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19CVUZGRVJJTkcsIHRoaXMuYnVmZmVyaW5nKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCB0aGlzLmJ1ZmZlcmZ1bGwpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFLCB0aGlzLnNldHRpbmdzVXBkYXRlKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19MT0FERURNRVRBREFUQSwgdGhpcy5sb2FkZWRNZXRhZGF0YSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfSElHSERFRklOSVRJT05VUERBVEUsIHRoaXMuaGlnaERlZmluaXRpb25VcGRhdGUpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0JJVFJBVEUsIHRoaXMudXBkYXRlQml0cmF0ZSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUExBWUJBQ0tTVEFURSwgdGhpcy5wbGF5YmFja1N0YXRlQ2hhbmdlZCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfRFZSLCB0aGlzLnBsYXliYWNrRHZyU3RhdGVDaGFuZ2VkKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRElTQUJMRSwgdGhpcy5kaXNhYmxlTWVkaWFDb250cm9sKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRU5BQkxFLCB0aGlzLmVuYWJsZU1lZGlhQ29udHJvbCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfRU5ERUQsIHRoaXMuZW5kZWQpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1BMQVksIHRoaXMucGxheWluZyk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfRVJST1IsIHRoaXMuZXJyb3IpO1xuICB9XG5cbiAgcGxheWJhY2tTdGF0ZUNoYW5nZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tTVEFURSk7XG4gIH1cblxuICBwbGF5YmFja0R2clN0YXRlQ2hhbmdlZChkdnJJblVzZSkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLnBsYXliYWNrLnNldHRpbmdzXG4gICAgdGhpcy5kdnJJblVzZSA9IGR2ckluVXNlXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQsIGR2ckluVXNlKVxuICB9XG5cbiAgdXBkYXRlQml0cmF0ZShuZXdCaXRyYXRlKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfQklUUkFURSwgbmV3Qml0cmF0ZSlcbiAgfVxuXG4gIHN0YXRzUmVwb3J0KG1ldHJpY3MpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9TVEFUU19SRVBPUlQsIG1ldHJpY3MpXG4gIH1cblxuICBnZXRQbGF5YmFja1R5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWJhY2suZ2V0UGxheWJhY2tUeXBlKClcbiAgfVxuXG4gIGlzRHZyRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gISF0aGlzLnBsYXliYWNrLmR2ckVuYWJsZWRcbiAgfVxuXG4gIGlzRHZySW5Vc2UoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5kdnJJblVzZVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9ERVNUUk9ZRUQsIHRoaXMsIHRoaXMubmFtZSk7XG4gICAgdGhpcy5wbGF5YmFjay5kZXN0cm95KCk7XG4gICAgdGhpcy5wbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4gcGx1Z2luLmRlc3Ryb3koKSlcbiAgICB0aGlzLiRlbC5yZW1vdmUoKTtcbiAgfVxuXG4gIHNldFN0eWxlKHN0eWxlKSB7XG4gICAgdGhpcy4kZWwuY3NzKHN0eWxlKTtcbiAgfVxuXG4gIGFuaW1hdGUoc3R5bGUsIGR1cmF0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuJGVsLmFuaW1hdGUoc3R5bGUsIGR1cmF0aW9uKS5wcm9taXNlKCk7XG4gIH1cblxuICByZWFkeSgpIHtcbiAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1JFQURZLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgaXNQbGF5aW5nKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXliYWNrLmlzUGxheWluZygpO1xuICB9XG5cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWJhY2suZ2V0RHVyYXRpb24oKTtcbiAgfVxuXG4gIGVycm9yKGVycm9yT2JqKSB7XG4gICAgdGhpcy4kZWwuYXBwZW5kKGVycm9yT2JqLnJlbmRlcigpLmVsKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0VSUk9SLCB7ZXJyb3I6IGVycm9yT2JqLCBjb250YWluZXI6IHRoaXN9LCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgbG9hZGVkTWV0YWRhdGEoZHVyYXRpb24pIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9MT0FERURNRVRBREFUQSwgZHVyYXRpb24pO1xuICB9XG5cbiAgdGltZVVwZGF0ZWQocG9zaXRpb24sIGR1cmF0aW9uKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfVElNRVVQREFURSwgcG9zaXRpb24sIGR1cmF0aW9uLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgcHJvZ3Jlc3Moc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24sIGR1cmF0aW9uKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUFJPR1JFU1MsIHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uLCBkdXJhdGlvbiwgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIHBsYXlpbmcoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUExBWSwgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5wbGF5YmFjay5wbGF5KCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMubmFtZSk7XG4gICAgdGhpcy5wbGF5YmFjay5zdG9wKCk7XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QQVVTRSwgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnBsYXliYWNrLnBhdXNlKCk7XG4gIH1cblxuICBlbmRlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcywgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGNsaWNrZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfQ0xJQ0ssIHRoaXMsIHRoaXMubmFtZSk7XG4gIH1cblxuICBzZXRDdXJyZW50VGltZSh0aW1lKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU0VFSywgdGltZSwgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnBsYXliYWNrLnNlZWsodGltZSk7XG4gIH1cblxuICBzZXRWb2x1bWUodmFsdWUpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9WT0xVTUUsIHZhbHVlLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucGxheWJhY2sudm9sdW1lKHZhbHVlKTtcbiAgfVxuXG4gIGZ1bGxzY3JlZW4oKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfRlVMTFNDUkVFTiwgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGJ1ZmZlcmluZygpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJJTkcsIHRoaXMubmFtZSk7XG4gIH1cblxuICBidWZmZXJmdWxsKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMubmFtZSk7XG4gIH1cblxuICBhZGRQbHVnaW4ocGx1Z2luKSB7XG4gICAgdGhpcy5wbHVnaW5zLnB1c2gocGx1Z2luKTtcbiAgfVxuXG4gIGhhc1BsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuICEhdGhpcy5nZXRQbHVnaW4obmFtZSk7XG4gIH1cblxuICBnZXRQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiBmaW5kKHRoaXMucGx1Z2lucywgKHBsdWdpbikgPT4geyByZXR1cm4gcGx1Z2luLm5hbWUgPT09IG5hbWUgfSk7XG4gIH1cblxuICBtb3VzZUVudGVyKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX01PVVNFX0VOVEVSKVxuICB9XG5cbiAgbW91c2VMZWF2ZSgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9NT1VTRV9MRUFWRSlcbiAgfVxuXG4gIHNldHRpbmdzVXBkYXRlKCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLnBsYXliYWNrLnNldHRpbmdzO1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NFVFRJTkdTVVBEQVRFKTtcbiAgfVxuXG4gIGhpZ2hEZWZpbml0aW9uVXBkYXRlKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0hJR0hERUZJTklUSU9OVVBEQVRFKTtcbiAgfVxuXG4gIGlzSGlnaERlZmluaXRpb25JblVzZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFjay5pc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKVxuICB9XG5cbiAgZGlzYWJsZU1lZGlhQ29udHJvbCgpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbERpc2FibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRElTQUJMRSk7XG4gIH1cblxuICBlbmFibGVNZWRpYUNvbnRyb2woKSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9FTkFCTEUpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcignY29udGFpbmVyJyk7XG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKTtcbiAgICB0aGlzLiRlbC5hcHBlbmQodGhpcy5wbGF5YmFjay5yZW5kZXIoKS5lbCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb250YWluZXI7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIFRoZSBDb250YWluZXJGYWN0b3J5IGlzIHJlc3BvbnNpYmxlIGZvciBtYW5hZ2UgcGxheWJhY2sgYm9vdHN0cmFwIGFuZCBjcmVhdGUgY29udGFpbmVycy5cbiAqL1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpO1xudmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCdiYXNlX29iamVjdCcpO1xudmFyIENvbnRhaW5lciA9IHJlcXVpcmUoJ2NvbnRhaW5lcicpO1xudmFyICQgPSByZXF1aXJlKCd6ZXB0bycpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpO1xuXG5jbGFzcyBDb250YWluZXJGYWN0b3J5IGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMsIGxvYWRlcikge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5sb2FkZXIgPSBsb2FkZXI7XG4gIH1cblxuICBjcmVhdGVDb250YWluZXJzKCkge1xuICAgIHJldHVybiAkLkRlZmVycmVkKChwcm9taXNlKSA9PiB7XG4gICAgICBwcm9taXNlLnJlc29sdmUodGhpcy5vcHRpb25zLnNvdXJjZXMubWFwKChzb3VyY2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ29udGFpbmVyKHNvdXJjZSk7XG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kUGxheWJhY2tQbHVnaW4oc291cmNlKSB7XG4gICAgcmV0dXJuIGZpbmQodGhpcy5sb2FkZXIucGxheWJhY2tQbHVnaW5zLCAocCkgPT4geyByZXR1cm4gcC5jYW5QbGF5KHNvdXJjZS50b1N0cmluZygpKSB9KVxuICB9XG5cbiAgY3JlYXRlQ29udGFpbmVyKHNvdXJjZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBhc3NpZ24oe30sIG9wdGlvbnMsIHRoaXMub3B0aW9ucywge3NyYzogc291cmNlLCBhdXRvUGxheTogISF0aGlzLm9wdGlvbnMuYXV0b1BsYXl9KVxuICAgIHZhciBwbGF5YmFja1BsdWdpbiA9IHRoaXMuZmluZFBsYXliYWNrUGx1Z2luKHNvdXJjZSlcbiAgICB2YXIgcGxheWJhY2sgPSBuZXcgcGxheWJhY2tQbHVnaW4ob3B0aW9ucylcbiAgICB2YXIgY29udGFpbmVyID0gbmV3IENvbnRhaW5lcih7cGxheWJhY2s6IHBsYXliYWNrfSlcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKClcbiAgICBkZWZlci5wcm9taXNlKGNvbnRhaW5lcilcbiAgICB0aGlzLmFkZENvbnRhaW5lclBsdWdpbnMoY29udGFpbmVyLCBzb3VyY2UpXG4gICAgdGhpcy5saXN0ZW5Ub09uY2UoY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1JFQURZLCAoKSA9PiBkZWZlci5yZXNvbHZlKGNvbnRhaW5lcikpXG4gICAgcmV0dXJuIGNvbnRhaW5lclxuICB9XG5cbiAgYWRkQ29udGFpbmVyUGx1Z2lucyhjb250YWluZXIsIHNvdXJjZSkge1xuICAgIHRoaXMubG9hZGVyLmNvbnRhaW5lclBsdWdpbnMuZm9yRWFjaCgoUGx1Z2luKSA9PiB7XG4gICAgICB2YXIgb3B0aW9ucyA9IGFzc2lnbih0aGlzLm9wdGlvbnMsIHtjb250YWluZXI6IGNvbnRhaW5lciwgc3JjOiBzb3VyY2V9KTtcbiAgICAgIGNvbnRhaW5lci5hZGRQbHVnaW4obmV3IFBsdWdpbihvcHRpb25zKSk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb250YWluZXJGYWN0b3J5O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2NvbnRhaW5lcl9mYWN0b3J5Jyk7XG5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogVGhlIENvcmUgaXMgcmVzcG9uc2libGUgdG8gbWFuYWdlIENvbnRhaW5lcnMsIHRoZSBtZWRpYXRvciwgTWVkaWFDb250cm9sXG4gKiBhbmQgdGhlIHBsYXllciBzdGF0ZS5cbiAqL1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgJCA9IHJlcXVpcmUoJ3plcHRvJylcblxudmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgndWlfb2JqZWN0JylcbnZhciBDb250YWluZXJGYWN0b3J5ID0gcmVxdWlyZSgnLi4vY29udGFpbmVyX2ZhY3RvcnknKVxudmFyIEZ1bGxzY3JlZW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykuRnVsbHNjcmVlblxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBNZWRpYUNvbnRyb2wgPSByZXF1aXJlKCdtZWRpYV9jb250cm9sJylcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgncGxheWVyX2luZm8nKVxudmFyIE1lZGlhdG9yID0gcmVxdWlyZSgnbWVkaWF0b3InKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbnZhciBmaW5kID0gcmVxdWlyZSgnbG9kYXNoLmZpbmQnKVxuXG5jbGFzcyBDb3JlIGV4dGVuZHMgVUlPYmplY3Qge1xuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZSc6ICdleGl0JyxcbiAgICAgICdtb3VzZW1vdmUnOiAnc2hvd01lZGlhQ29udHJvbCcsXG4gICAgICAnbW91c2VsZWF2ZSc6ICdoaWRlTWVkaWFDb250cm9sJ1xuICAgIH1cbiAgfVxuXG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZGF0YS1wbGF5ZXInOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIFBsYXllckluZm8ub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5wbHVnaW5zID0gW11cbiAgICB0aGlzLmNvbnRhaW5lcnMgPSBbXVxuICAgIHRoaXMuY3JlYXRlQ29udGFpbmVycyhvcHRpb25zKVxuICAgIC8vRklYTUUgZnVsbHNjcmVlbiBhcGkgc3Vja3NcbiAgICAkKGRvY3VtZW50KS5iaW5kKCdmdWxsc2NyZWVuY2hhbmdlJywgKCkgPT4gdGhpcy5leGl0KCkpXG4gICAgJChkb2N1bWVudCkuYmluZCgnTVNGdWxsc2NyZWVuQ2hhbmdlJywgKCkgPT4gdGhpcy5leGl0KCkpXG4gICAgJChkb2N1bWVudCkuYmluZCgnbW96ZnVsbHNjcmVlbmNoYW5nZScsICgpID0+IHRoaXMuZXhpdCgpKVxuICB9XG5cbiAgY3JlYXRlQ29udGFpbmVycyhvcHRpb25zKSB7XG4gICAgdGhpcy5kZWZlciA9ICQuRGVmZXJyZWQoKVxuICAgIHRoaXMuZGVmZXIucHJvbWlzZSh0aGlzKVxuICAgIHRoaXMuY29udGFpbmVyRmFjdG9yeSA9IG5ldyBDb250YWluZXJGYWN0b3J5KG9wdGlvbnMsIG9wdGlvbnMubG9hZGVyKVxuICAgIHRoaXMuY29udGFpbmVyRmFjdG9yeVxuICAgICAgLmNyZWF0ZUNvbnRhaW5lcnMoKVxuICAgICAgLnRoZW4oKGNvbnRhaW5lcnMpID0+IHRoaXMuc2V0dXBDb250YWluZXJzKGNvbnRhaW5lcnMpKVxuICAgICAgLnRoZW4oKGNvbnRhaW5lcnMpID0+IHRoaXMucmVzb2x2ZU9uQ29udGFpbmVyc1JlYWR5KGNvbnRhaW5lcnMpKVxuICB9XG5cbiAgdXBkYXRlU2l6ZSgpIHtcbiAgICBpZiAoRnVsbHNjcmVlbi5pc0Z1bGxzY3JlZW4oKSkge1xuICAgICAgdGhpcy5zZXRGdWxsc2NyZWVuKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRQbGF5ZXJTaXplKClcbiAgICB9XG4gICAgTWVkaWF0b3IudHJpZ2dlcihFdmVudHMuUExBWUVSX1JFU0laRSlcbiAgfVxuXG4gIHNldEZ1bGxzY3JlZW4oKSB7XG4gICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2Z1bGxzY3JlZW4nKVxuICAgIHRoaXMuJGVsLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICBQbGF5ZXJJbmZvLnByZXZpb3VzU2l6ZSA9IFBsYXllckluZm8uY3VycmVudFNpemVcbiAgICBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplID0geyB3aWR0aDogJCh3aW5kb3cpLndpZHRoKCksIGhlaWdodDogJCh3aW5kb3cpLmhlaWdodCgpIH1cbiAgfVxuXG4gIHNldFBsYXllclNpemUoKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2Z1bGxzY3JlZW4nKVxuICAgIFBsYXllckluZm8uY3VycmVudFNpemUgPSBQbGF5ZXJJbmZvLnByZXZpb3VzU2l6ZVxuICAgIFBsYXllckluZm8ucHJldmlvdXNTaXplID0geyB3aWR0aDogJCh3aW5kb3cpLndpZHRoKCksIGhlaWdodDogJCh3aW5kb3cpLmhlaWdodCgpIH1cbiAgICB0aGlzLnJlc2l6ZShQbGF5ZXJJbmZvLmN1cnJlbnRTaXplKVxuICB9XG5cbiAgcmVzaXplKG9wdGlvbnMpIHtcbiAgICB0aGlzLmVsLnN0eWxlLmhlaWdodCA9IGAke29wdGlvbnMuaGVpZ2h0fXB4YDtcbiAgICB0aGlzLmVsLnN0eWxlLndpZHRoID0gYCR7b3B0aW9ucy53aWR0aH1weGA7XG4gICAgUGxheWVySW5mby5wcmV2aW91c1NpemUgPSBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplXG4gICAgUGxheWVySW5mby5jdXJyZW50U2l6ZSA9IG9wdGlvbnNcbiAgICBNZWRpYXRvci50cmlnZ2VyKEV2ZW50cy5QTEFZRVJfUkVTSVpFKVxuICB9XG5cbiAgcmVzb2x2ZU9uQ29udGFpbmVyc1JlYWR5KGNvbnRhaW5lcnMpIHtcbiAgICAkLndoZW4uYXBwbHkoJCwgY29udGFpbmVycykuZG9uZSgoKSA9PnRoaXMuZGVmZXIucmVzb2x2ZSh0aGlzKSlcbiAgfVxuXG4gIGFkZFBsdWdpbihwbHVnaW4pIHtcbiAgICB0aGlzLnBsdWdpbnMucHVzaChwbHVnaW4pXG4gIH1cblxuICBoYXNQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiAhIXRoaXMuZ2V0UGx1Z2luKG5hbWUpXG4gIH1cblxuICBnZXRQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiBmaW5kKHRoaXMucGx1Z2lucywgKHBsdWdpbikgPT4gcGx1Z2luLm5hbWUgPT09IG5hbWUpXG4gIH1cblxuICBsb2FkKHNvdXJjZXMpIHtcbiAgICBzb3VyY2VzID0gc291cmNlcyAmJiBzb3VyY2VzLmNvbnN0cnVjdG9yID09PSBBcnJheSA/IHNvdXJjZXMgOiBbc291cmNlcy50b1N0cmluZygpXTtcbiAgICB0aGlzLmNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiBjb250YWluZXIuZGVzdHJveSgpKVxuICAgIHRoaXMuY29udGFpbmVyRmFjdG9yeS5vcHRpb25zID0gYXNzaWduKHRoaXMub3B0aW9ucywge3NvdXJjZXN9KVxuICAgIHRoaXMuY29udGFpbmVyRmFjdG9yeS5jcmVhdGVDb250YWluZXJzKCkudGhlbigoY29udGFpbmVycykgPT4ge1xuICAgICAgdGhpcy5zZXR1cENvbnRhaW5lcnMoY29udGFpbmVycylcbiAgICB9KVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiBjb250YWluZXIuZGVzdHJveSgpKVxuICAgIHRoaXMucGx1Z2lucy5mb3JFYWNoKChwbHVnaW4pID0+IHBsdWdpbi5kZXN0cm95KCkpXG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5kZXN0cm95KClcbiAgICAkKGRvY3VtZW50KS51bmJpbmQoJ2Z1bGxzY3JlZW5jaGFuZ2UnKVxuICAgICQoZG9jdW1lbnQpLnVuYmluZCgnTVNGdWxsc2NyZWVuQ2hhbmdlJylcbiAgICAkKGRvY3VtZW50KS51bmJpbmQoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnKVxufVxuXG4gIGV4aXQoKSB7XG4gICAgdGhpcy51cGRhdGVTaXplKClcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5zaG93KClcbiAgfVxuXG4gIHNldE1lZGlhQ29udHJvbENvbnRhaW5lcihjb250YWluZXIpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5zZXRDb250YWluZXIoY29udGFpbmVyKVxuICAgIHRoaXMubWVkaWFDb250cm9sLnJlbmRlcigpXG4gIH1cblxuICBkaXNhYmxlTWVkaWFDb250cm9sKCkge1xuICAgIHRoaXMubWVkaWFDb250cm9sLmRpc2FibGUoKVxuICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdub2N1cnNvcicpXG4gIH1cblxuICBlbmFibGVNZWRpYUNvbnRyb2woKSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuZW5hYmxlKClcbiAgfVxuXG4gIHJlbW92ZUNvbnRhaW5lcihjb250YWluZXIpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoY29udGFpbmVyKVxuICAgIHRoaXMuY29udGFpbmVycyA9IHRoaXMuY29udGFpbmVycy5maWx0ZXIoKGMpID0+IGMgIT09IGNvbnRhaW5lcilcbiAgfVxuXG4gIGFwcGVuZENvbnRhaW5lcihjb250YWluZXIpIHtcbiAgICB0aGlzLmxpc3RlblRvKGNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9ERVNUUk9ZRUQsIHRoaXMucmVtb3ZlQ29udGFpbmVyKVxuICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoY29udGFpbmVyLnJlbmRlcigpLmVsKVxuICAgIHRoaXMuY29udGFpbmVycy5wdXNoKGNvbnRhaW5lcilcbiAgfVxuXG4gIHNldHVwQ29udGFpbmVycyhjb250YWluZXJzKSB7XG4gICAgY29udGFpbmVycy5tYXAodGhpcy5hcHBlbmRDb250YWluZXIuYmluZCh0aGlzKSlcbiAgICB0aGlzLnNldHVwTWVkaWFDb250cm9sKHRoaXMuZ2V0Q3VycmVudENvbnRhaW5lcigpKVxuICAgIHRoaXMucmVuZGVyKClcbiAgICB0aGlzLiRlbC5hcHBlbmRUbyh0aGlzLm9wdGlvbnMucGFyZW50RWxlbWVudClcbiAgICByZXR1cm4gY29udGFpbmVyc1xuICB9XG5cbiAgY3JlYXRlQ29udGFpbmVyKHNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lckZhY3RvcnkuY3JlYXRlQ29udGFpbmVyKHNvdXJjZSwgb3B0aW9ucylcbiAgICB0aGlzLmFwcGVuZENvbnRhaW5lcihjb250YWluZXIpXG4gICAgcmV0dXJuIGNvbnRhaW5lclxuICB9XG5cbiAgc2V0dXBNZWRpYUNvbnRyb2woY29udGFpbmVyKSB7XG4gICAgaWYgKHRoaXMubWVkaWFDb250cm9sKSB7XG4gICAgICB0aGlzLm1lZGlhQ29udHJvbC5zZXRDb250YWluZXIoY29udGFpbmVyKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1lZGlhQ29udHJvbCA9IHRoaXMuY3JlYXRlTWVkaWFDb250cm9sKGFzc2lnbih7Y29udGFpbmVyOiBjb250YWluZXJ9LCB0aGlzLm9wdGlvbnMpKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9GVUxMU0NSRUVOLCB0aGlzLnRvZ2dsZUZ1bGxzY3JlZW4pXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX1NIT1csIHRoaXMub25NZWRpYUNvbnRyb2xTaG93LmJpbmQodGhpcywgdHJ1ZSkpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX0hJREUsIHRoaXMub25NZWRpYUNvbnRyb2xTaG93LmJpbmQodGhpcywgZmFsc2UpKVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZU1lZGlhQ29udHJvbChvcHRpb25zKSB7XG4gICAgaWYob3B0aW9ucy5tZWRpYWNvbnRyb2wgJiYgb3B0aW9ucy5tZWRpYWNvbnRyb2wuZXh0ZXJuYWwpIHtcbiAgICAgIHJldHVybiBuZXcgb3B0aW9ucy5tZWRpYWNvbnRyb2wuZXh0ZXJuYWwob3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgTWVkaWFDb250cm9sKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGdldEN1cnJlbnRDb250YWluZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyc1swXVxuICB9XG5cbiAgdG9nZ2xlRnVsbHNjcmVlbigpIHtcbiAgICBpZiAoIUZ1bGxzY3JlZW4uaXNGdWxsc2NyZWVuKCkpIHtcbiAgICAgIEZ1bGxzY3JlZW4ucmVxdWVzdEZ1bGxzY3JlZW4odGhpcy5lbClcbiAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdmdWxsc2NyZWVuJylcbiAgICB9IGVsc2Uge1xuICAgICAgRnVsbHNjcmVlbi5jYW5jZWxGdWxsc2NyZWVuKClcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdmdWxsc2NyZWVuIG5vY3Vyc29yJylcbiAgICB9XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuc2hvdygpXG4gIH1cblxuICBzaG93TWVkaWFDb250cm9sKGV2ZW50KSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuc2hvdyhldmVudClcbiAgfVxuXG4gIGhpZGVNZWRpYUNvbnRyb2woZXZlbnQpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5oaWRlKGV2ZW50KVxuICB9XG5cbiAgb25NZWRpYUNvbnRyb2xTaG93KHNob3dpbmcpIHtcbiAgICBpZiAoc2hvd2luZylcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdub2N1cnNvcicpXG4gICAgZWxzZSBpZiAoRnVsbHNjcmVlbi5pc0Z1bGxzY3JlZW4oKSlcbiAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdub2N1cnNvcicpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKCdjb3JlJylcbiAgICAvL0ZJWE1FXG4gICAgLy90aGlzLiRlbC5lbXB0eSgpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHRoaXMuJGVsLmFwcGVuZCh0aGlzLm1lZGlhQ29udHJvbC5yZW5kZXIoKS5lbClcblxuICAgIHRoaXMub3B0aW9ucy53aWR0aCA9IHRoaXMub3B0aW9ucy53aWR0aCB8fCB0aGlzLiRlbC53aWR0aCgpXG4gICAgdGhpcy5vcHRpb25zLmhlaWdodCA9IHRoaXMub3B0aW9ucy5oZWlnaHQgfHwgdGhpcy4kZWwuaGVpZ2h0KClcbiAgICB2YXIgc2l6ZSA9IHt3aWR0aDogdGhpcy5vcHRpb25zLndpZHRoLCBoZWlnaHQ6IHRoaXMub3B0aW9ucy5oZWlnaHR9XG4gICAgUGxheWVySW5mby5wcmV2aW91c1NpemUgPSBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplID0gc2l6ZVxuICAgIHRoaXMudXBkYXRlU2l6ZSgpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29yZVxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuLyoqXG4gKiBUaGUgQ29yZSBGYWN0b3J5IGlzIHJlc3BvbnNpYmxlIGZvciBpbnN0YW50aWF0ZSB0aGUgY29yZSBhbmQgaXQncyBwbHVnaW5zLlxuICovXG5cbnZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnYmFzZV9vYmplY3QnKTtcbnZhciBDb3JlID0gcmVxdWlyZSgnY29yZScpO1xuXG5jbGFzcyBDb3JlRmFjdG9yeSBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGxvYWRlcikge1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyXG4gICAgdGhpcy5vcHRpb25zID0gcGxheWVyLm9wdGlvbnNcbiAgICB0aGlzLmxvYWRlciA9IGxvYWRlclxuICAgIHRoaXMub3B0aW9ucy5sb2FkZXIgPSB0aGlzLmxvYWRlclxuICB9XG5cbiAgY3JlYXRlKCkge1xuICAgIHRoaXMuY29yZSA9IG5ldyBDb3JlKHRoaXMub3B0aW9ucylcbiAgICB0aGlzLmNvcmUudGhlbih0aGlzLmFkZENvcmVQbHVnaW5zLmJpbmQodGhpcykpXG4gICAgcmV0dXJuIHRoaXMuY29yZVxuICB9XG5cbiAgYWRkQ29yZVBsdWdpbnMoKSB7XG4gICAgdGhpcy5sb2FkZXIuY29yZVBsdWdpbnMuZm9yRWFjaCgoUGx1Z2luKSA9PiB7XG4gICAgICB2YXIgcGx1Z2luID0gbmV3IFBsdWdpbih0aGlzLmNvcmUpXG4gICAgICB0aGlzLmNvcmUuYWRkUGx1Z2luKHBsdWdpbilcbiAgICAgIHRoaXMuc2V0dXBFeHRlcm5hbEludGVyZmFjZShwbHVnaW4pXG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5jb3JlXG4gIH1cblxuICBzZXR1cEV4dGVybmFsSW50ZXJmYWNlKHBsdWdpbikge1xuICAgIHZhciBleHRlcm5hbEZ1bmN0aW9ucyA9IHBsdWdpbi5nZXRFeHRlcm5hbEludGVyZmFjZSgpO1xuICAgIGZvciAodmFyIGtleSBpbiBleHRlcm5hbEZ1bmN0aW9ucykge1xuICAgICAgdGhpcy5wbGF5ZXJba2V5XSA9IGV4dGVybmFsRnVuY3Rpb25zW2tleV0uYmluZChwbHVnaW4pXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29yZUZhY3Rvcnk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29yZV9mYWN0b3J5Jyk7XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9sb2FkZXInKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCdiYXNlX29iamVjdCcpXG52YXIgUGxheWVySW5mbyA9IHJlcXVpcmUoJ3BsYXllcl9pbmZvJylcbnZhciB1bmlxID0gcmVxdWlyZSgnbG9kYXNoLnVuaXEnKVxuXG4vKiBQbGF5YmFjayBQbHVnaW5zICovXG52YXIgSFRNTDVWaWRlb1BsYXliYWNrID0gcmVxdWlyZSgnaHRtbDVfdmlkZW8nKTtcbnZhciBGbGFzaFZpZGVvUGxheWJhY2sgPSByZXF1aXJlKCdmbGFzaCcpO1xudmFyIEhUTUw1QXVkaW9QbGF5YmFjayA9IHJlcXVpcmUoJ2h0bWw1X2F1ZGlvJyk7XG52YXIgSExTVmlkZW9QbGF5YmFjayA9IHJlcXVpcmUoJ2hscycpO1xudmFyIEhUTUxJbWdQbGF5YmFjayA9IHJlcXVpcmUoJ2h0bWxfaW1nJyk7XG52YXIgTm9PcCA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9ub19vcCcpO1xuXG4vKiBDb250YWluZXIgUGx1Z2lucyAqL1xudmFyIFNwaW5uZXJUaHJlZUJvdW5jZVBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvc3Bpbm5lcl90aHJlZV9ib3VuY2UnKTtcbnZhciBTdGF0c1BsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvc3RhdHMnKTtcbnZhciBXYXRlck1hcmtQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9wbHVnaW5zL3dhdGVybWFyaycpO1xudmFyIFBvc3RlclBsdWdpbiA9IHJlcXVpcmUoJ3Bvc3RlcicpO1xudmFyIEdvb2dsZUFuYWx5dGljc1BsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvZ29vZ2xlX2FuYWx5dGljcycpO1xudmFyIENsaWNrVG9QYXVzZVBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvY2xpY2tfdG9fcGF1c2UnKTtcblxuLyogQ29yZSBQbHVnaW5zICovXG52YXIgRFZSQ29udHJvbHMgPSByZXF1aXJlKCcuLi8uLi9wbHVnaW5zL2R2cl9jb250cm9scycpO1xuXG5jbGFzcyBMb2FkZXIgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcbiAgY29uc3RydWN0b3IoZXh0ZXJuYWxQbHVnaW5zKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMucGxheWJhY2tQbHVnaW5zID0gW0hUTUw1VmlkZW9QbGF5YmFjaywgRmxhc2hWaWRlb1BsYXliYWNrLCBIVE1MNUF1ZGlvUGxheWJhY2ssIEhMU1ZpZGVvUGxheWJhY2ssIEhUTUxJbWdQbGF5YmFjaywgTm9PcF1cbiAgICB0aGlzLmNvbnRhaW5lclBsdWdpbnMgPSBbU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luLCBXYXRlck1hcmtQbHVnaW4sIFBvc3RlclBsdWdpbiwgU3RhdHNQbHVnaW4sIEdvb2dsZUFuYWx5dGljc1BsdWdpbiwgQ2xpY2tUb1BhdXNlUGx1Z2luXVxuICAgIHRoaXMuY29yZVBsdWdpbnMgPSBbRFZSQ29udHJvbHNdXG4gICAgaWYgKGV4dGVybmFsUGx1Z2lucykge1xuICAgICAgdGhpcy5hZGRFeHRlcm5hbFBsdWdpbnMoZXh0ZXJuYWxQbHVnaW5zKVxuICAgIH1cbiAgfVxuXG4gIGFkZEV4dGVybmFsUGx1Z2lucyhwbHVnaW5zKSB7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBmdW5jdGlvbihwbHVnaW4pIHsgcmV0dXJuIHBsdWdpbi5wcm90b3R5cGUubmFtZSB9XG4gICAgaWYgKHBsdWdpbnMucGxheWJhY2spIHsgdGhpcy5wbGF5YmFja1BsdWdpbnMgPSB1bmlxKHBsdWdpbnMucGxheWJhY2suY29uY2F0KHRoaXMucGxheWJhY2tQbHVnaW5zKSwgcGx1Z2luTmFtZSkgfVxuICAgIGlmIChwbHVnaW5zLmNvbnRhaW5lcikgeyB0aGlzLmNvbnRhaW5lclBsdWdpbnMgPSB1bmlxKHBsdWdpbnMuY29udGFpbmVyLmNvbmNhdCh0aGlzLmNvbnRhaW5lclBsdWdpbnMpLCBwbHVnaW5OYW1lKSB9XG4gICAgaWYgKHBsdWdpbnMuY29yZSkgeyB0aGlzLmNvcmVQbHVnaW5zID0gdW5pcShwbHVnaW5zLmNvcmUuY29uY2F0KHRoaXMuY29yZVBsdWdpbnMpLCBwbHVnaW5OYW1lKSB9XG4gICAgUGxheWVySW5mby5wbGF5YmFja1BsdWdpbnMgPSB0aGlzLnBsYXliYWNrUGx1Z2luc1xuICB9XG5cbiAgZ2V0UGx1Z2luKG5hbWUpIHtcbiAgICB2YXIgYWxsUGx1Z2lucyA9IHRoaXMuY29udGFpbmVyUGx1Z2lucy5jb25jYXQodGhpcy5wbGF5YmFja1BsdWdpbnMpLmNvbmNhdCh0aGlzLmNvcmVQbHVnaW5zKVxuICAgIHJldHVybiBhbGxQbHVnaW5zLmZpbmQoKHBsdWdpbikgPT4geyByZXR1cm4gcGx1Z2luLnByb3RvdHlwZS5uYW1lID09PSBuYW1lIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIFRoZSBNZWRpYUNvbnRyb2wgaXMgcmVzcG9uc2libGUgZm9yIGRpc3BsYXlpbmcgdGhlIFBsYXllciBjb250cm9scy5cbiAqL1xuXG52YXIgJCA9IHJlcXVpcmUoJ3plcHRvJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgndWlfb2JqZWN0JylcbnZhciBVdGlscyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdXRpbHMnKVxudmFyIEJyb3dzZXIgPSByZXF1aXJlKCdicm93c2VyJylcbnZhciBTZWVrVGltZSA9IHJlcXVpcmUoJy4uL3NlZWtfdGltZScpXG52YXIgTWVkaWF0b3IgPSByZXF1aXJlKCdtZWRpYXRvcicpXG52YXIgUGxheWVySW5mbyA9IHJlcXVpcmUoJ3BsYXllcl9pbmZvJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxudmFyIEtpYm8gPSByZXF1aXJlKCcuLi8uLi9iYXNlL2tpYm8nKVxuXG5jbGFzcyBNZWRpYUNvbnRyb2wgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ01lZGlhQ29udHJvbCcgfVxuXG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzczogJ21lZGlhLWNvbnRyb2wnLFxuICAgICAgJ2RhdGEtbWVkaWEtY29udHJvbCc6ICcnXG4gICAgfVxuICB9XG5cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsaWNrIFtkYXRhLXBsYXldJzogJ3BsYXknLFxuICAgICAgJ2NsaWNrIFtkYXRhLXBhdXNlXSc6ICdwYXVzZScsXG4gICAgICAnY2xpY2sgW2RhdGEtcGxheXBhdXNlXSc6ICd0b2dnbGVQbGF5UGF1c2UnLFxuICAgICAgJ2NsaWNrIFtkYXRhLXN0b3BdJzogJ3N0b3AnLFxuICAgICAgJ2NsaWNrIFtkYXRhLXBsYXlzdG9wXSc6ICd0b2dnbGVQbGF5U3RvcCcsXG4gICAgICAnY2xpY2sgW2RhdGEtZnVsbHNjcmVlbl0nOiAndG9nZ2xlRnVsbHNjcmVlbicsXG4gICAgICAnY2xpY2sgLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSc6ICdzZWVrJyxcbiAgICAgICdjbGljayAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0nOiAndm9sdW1lJyxcbiAgICAgICdjbGljayAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdJzogJ3RvZ2dsZU11dGUnLFxuICAgICAgJ21vdXNlZW50ZXIgLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdJzogJ3Nob3dWb2x1bWVCYXInLFxuICAgICAgJ21vdXNlbGVhdmUgLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdJzogJ2hpZGVWb2x1bWVCYXInLFxuICAgICAgJ21vdXNlZG93biAuYmFyLXNjcnViYmVyW2RhdGEtdm9sdW1lXSc6ICdzdGFydFZvbHVtZURyYWcnLFxuICAgICAgJ21vdXNlZG93biAuYmFyLXNjcnViYmVyW2RhdGEtc2Vla2Jhcl0nOiAnc3RhcnRTZWVrRHJhZycsXG4gICAgICAnbW91c2Vtb3ZlIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0nOiAnbW91c2Vtb3ZlT25TZWVrQmFyJyxcbiAgICAgICdtb3VzZWxlYXZlIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0nOiAnbW91c2VsZWF2ZU9uU2Vla0JhcicsXG4gICAgICAnbW91c2VlbnRlciAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSc6ICdzZXRLZWVwVmlzaWJsZScsXG4gICAgICAnbW91c2VsZWF2ZSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSc6ICdyZXNldEtlZXBWaXNpYmxlJ1xuICAgIH1cbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5tZWRpYV9jb250cm9sIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLmtpYm8gPSBuZXcgS2libygpXG4gICAgdGhpcy5zZWVrVGltZSA9IG5ldyBTZWVrVGltZSh0aGlzKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLm11dGUgPSB0aGlzLm9wdGlvbnMubXV0ZVxuICAgIHRoaXMucGVyc2lzdENvbmZpZyA9IHRoaXMub3B0aW9ucy5wZXJzaXN0Q29uZmlnXG4gICAgdGhpcy5jb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuICAgIHZhciBpbml0aWFsVm9sdW1lID0gKHRoaXMucGVyc2lzdENvbmZpZykgPyBVdGlscy5Db25maWcucmVzdG9yZShcInZvbHVtZVwiKSA6IDEwMDtcbiAgICB0aGlzLnNldFZvbHVtZSh0aGlzLm11dGUgPyAwIDogaW5pdGlhbFZvbHVtZSlcbiAgICB0aGlzLmtlZXBWaXNpYmxlID0gZmFsc2VcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKClcbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgbGVmdDogWydwbGF5JywgJ3N0b3AnLCAncGF1c2UnXSxcbiAgICAgIHJpZ2h0OiBbJ3ZvbHVtZSddLFxuICAgICAgZGVmYXVsdDogWydwb3NpdGlvbicsICdzZWVrYmFyJywgJ2R1cmF0aW9uJ11cbiAgICB9XG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5rZXlzKHRoaXMuY29udGFpbmVyLnNldHRpbmdzKS5sZW5ndGggPT09IDAgPyB0aGlzLnNldHRpbmdzIDogdGhpcy5jb250YWluZXIuc2V0dGluZ3NcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICBpZiAodGhpcy5jb250YWluZXIubWVkaWFDb250cm9sRGlzYWJsZWQgfHwgdGhpcy5vcHRpb25zLmNocm9tZWxlc3MpIHtcbiAgICAgIHRoaXMuZGlzYWJsZSgpXG4gICAgfVxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ21vdXNldXAnLCAoZXZlbnQpID0+IHRoaXMuc3RvcERyYWcoZXZlbnQpKVxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ21vdXNlbW92ZScsIChldmVudCkgPT4gdGhpcy51cGRhdGVEcmFnKGV2ZW50KSlcbiAgICBNZWRpYXRvci5vbihFdmVudHMuUExBWUVSX1JFU0laRSwgKCkgPT4gdGhpcy5wbGF5ZXJSZXNpemUoKSlcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWSwgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfVElNRVVQREFURSwgdGhpcy51cGRhdGVTZWVrQmFyKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUFJPR1JFU1MsIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TRVRUSU5HU1VQREFURSwgdGhpcy5zZXR0aW5nc1VwZGF0ZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLRFZSU1RBVEVDSEFOR0VELCB0aGlzLnNldHRpbmdzVXBkYXRlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfSElHSERFRklOSVRJT05VUERBVEUsIHRoaXMuaGlnaERlZmluaXRpb25VcGRhdGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRElTQUJMRSwgdGhpcy5kaXNhYmxlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfTUVESUFDT05UUk9MX0VOQUJMRSwgdGhpcy5lbmFibGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcy5lbmRlZClcbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICB0aGlzLmhpZGUoKVxuICAgIHRoaXMuJGVsLmhpZGUoKVxuICB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykgcmV0dXJuXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgdGhpcy5zaG93KClcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5jb250YWluZXIucGxheSgpXG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5wYXVzZSgpXG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuY29udGFpbmVyLnN0b3AoKVxuICB9XG5cbiAgY2hhbmdlVG9nZ2xlUGxheSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgIHRoaXMuJHBsYXlQYXVzZVRvZ2dsZS5yZW1vdmVDbGFzcygncGF1c2VkJykuYWRkQ2xhc3MoJ3BsYXlpbmcnKVxuICAgICAgdGhpcy4kcGxheVN0b3BUb2dnbGUucmVtb3ZlQ2xhc3MoJ3N0b3BwZWQnKS5hZGRDbGFzcygncGxheWluZycpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9QTEFZSU5HKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kcGxheVBhdXNlVG9nZ2xlLnJlbW92ZUNsYXNzKCdwbGF5aW5nJykuYWRkQ2xhc3MoJ3BhdXNlZCcpXG4gICAgICB0aGlzLiRwbGF5U3RvcFRvZ2dsZS5yZW1vdmVDbGFzcygncGxheWluZycpLmFkZENsYXNzKCdzdG9wcGVkJylcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX05PVFBMQVlJTkcpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlbW92ZU9uU2Vla0JhcihldmVudCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkge1xuICAgICAgdmFyIG9mZnNldFggPSBldmVudC5wYWdlWCAtIHRoaXMuJHNlZWtCYXJDb250YWluZXIub2Zmc2V0KCkubGVmdCAtICh0aGlzLiRzZWVrQmFySG92ZXIud2lkdGgoKSAvIDIpXG4gICAgICB0aGlzLiRzZWVrQmFySG92ZXIuY3NzKHtsZWZ0OiBvZmZzZXRYfSlcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VNT1ZFX1NFRUtCQVIsIGV2ZW50KTtcbiAgfVxuXG4gIG1vdXNlbGVhdmVPblNlZWtCYXIoZXZlbnQpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9NT1VTRUxFQVZFX1NFRUtCQVIsIGV2ZW50KTtcbiAgfVxuXG4gIHBsYXllclJlc2l6ZSgpIHtcbiAgICBpZiAoVXRpbHMuRnVsbHNjcmVlbi5pc0Z1bGxzY3JlZW4oKSkge1xuICAgICAgdGhpcy4kZnVsbHNjcmVlblRvZ2dsZS5hZGRDbGFzcygnc2hyaW5rJylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZnVsbHNjcmVlblRvZ2dsZS5yZW1vdmVDbGFzcygnc2hyaW5rJylcbiAgICB9XG4gICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ3czMjAnKVxuICAgIGlmIChQbGF5ZXJJbmZvLmN1cnJlbnRTaXplLndpZHRoIDw9IDMyMCB8fCB0aGlzLm9wdGlvbnMuaGlkZVZvbHVtZUJhcikge1xuICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ3czMjAnKVxuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVBsYXlQYXVzZSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnBhdXNlKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250YWluZXIucGxheSgpXG4gICAgfVxuICAgIHRoaXMuY2hhbmdlVG9nZ2xlUGxheSgpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB0b2dnbGVQbGF5U3RvcCgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0b3AoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5wbGF5KClcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KClcbiAgfVxuXG4gIHN0YXJ0U2Vla0RyYWcoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyLnNldHRpbmdzLnNlZWtFbmFibGVkKSByZXR1cm5cbiAgICB0aGlzLmRyYWdnaW5nU2Vla0JhciA9IHRydWVcbiAgICB0aGlzLiRlbC5hZGRDbGFzcygnZHJhZ2dpbmcnKVxuICAgIHRoaXMuJHNlZWtCYXJMb2FkZWQuYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24uYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB0aGlzLiRzZWVrQmFyU2NydWJiZXIuYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICBzdGFydFZvbHVtZURyYWcoZXZlbnQpIHtcbiAgICB0aGlzLmRyYWdnaW5nVm9sdW1lQmFyID0gdHJ1ZVxuICAgIHRoaXMuJGVsLmFkZENsYXNzKCdkcmFnZ2luZycpXG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgc3RvcERyYWcoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5kcmFnZ2luZ1NlZWtCYXIpIHtcbiAgICAgIHRoaXMuc2VlayhldmVudClcbiAgICB9XG4gICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJylcbiAgICB0aGlzLiRzZWVrQmFyTG9hZGVkLnJlbW92ZUNsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uLnJlbW92ZUNsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyLnJlbW92ZUNsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbiBkcmFnZ2luZycpXG4gICAgdGhpcy5kcmFnZ2luZ1NlZWtCYXIgPSBmYWxzZVxuICAgIHRoaXMuZHJhZ2dpbmdWb2x1bWVCYXIgPSBmYWxzZVxuICB9XG5cbiAgdXBkYXRlRHJhZyhldmVudCkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgICBpZiAodGhpcy5kcmFnZ2luZ1NlZWtCYXIpIHtcbiAgICAgIHZhciBvZmZzZXRYID0gZXZlbnQucGFnZVggLSB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLm9mZnNldCgpLmxlZnRcbiAgICAgIHZhciBwb3MgPSBvZmZzZXRYIC8gdGhpcy4kc2Vla0JhckNvbnRhaW5lci53aWR0aCgpICogMTAwXG4gICAgICBwb3MgPSBNYXRoLm1pbigxMDAsIE1hdGgubWF4KHBvcywgMCkpXG4gICAgICB0aGlzLnNldFNlZWtQZXJjZW50YWdlKHBvcylcbiAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ2dpbmdWb2x1bWVCYXIpIHtcbiAgICAgIHRoaXMudm9sdW1lKGV2ZW50KVxuICAgIH1cbiAgfVxuXG4gIHZvbHVtZShldmVudCkge1xuICAgIHZhciBvZmZzZXRZID0gZXZlbnQucGFnZVggLSB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIub2Zmc2V0KCkubGVmdFxuICAgIHZhciB2b2x1bWVGcm9tVUkgPSAob2Zmc2V0WSAvIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci53aWR0aCgpKSAqIDEwMFxuICAgIHRoaXMuc2V0Vm9sdW1lKHZvbHVtZUZyb21VSSlcbiAgfVxuXG4gIHRvZ2dsZU11dGUoKSB7XG4gICAgaWYgKHRoaXMubXV0ZSkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFZvbHVtZSA8PSAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFZvbHVtZSA9IDEwMFxuICAgICAgfVxuICAgICAgdGhpcy5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFZvbHVtZSgwKVxuICAgIH1cbiAgfVxuXG4gIHNldFZvbHVtZSh2YWx1ZSkge1xuICAgIHRoaXMuY3VycmVudFZvbHVtZSA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgodmFsdWUsIDApKVxuICAgIHRoaXMuY29udGFpbmVyLnNldFZvbHVtZSh0aGlzLmN1cnJlbnRWb2x1bWUpXG4gICAgdGhpcy5zZXRWb2x1bWVMZXZlbCh0aGlzLmN1cnJlbnRWb2x1bWUpXG4gICAgdGhpcy5tdXRlID0gdGhpcy5jdXJyZW50Vm9sdW1lID09PSAwXG4gICAgdGhpcy5wZXJzaXN0Q29uZmlnICYmIFV0aWxzLkNvbmZpZy5wZXJzaXN0KFwidm9sdW1lXCIsIHRoaXMuY3VycmVudFZvbHVtZSlcbiAgfVxuXG4gIHRvZ2dsZUZ1bGxzY3JlZW4oKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfRlVMTFNDUkVFTiwgdGhpcy5uYW1lKVxuICAgIHRoaXMuY29udGFpbmVyLmZ1bGxzY3JlZW4oKVxuICAgIHRoaXMucmVzZXRLZWVwVmlzaWJsZSgpXG4gIH1cblxuICBzZXRDb250YWluZXIoY29udGFpbmVyKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKHRoaXMuY29udGFpbmVyKVxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyXG4gICAgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KClcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKClcbiAgICB0aGlzLnNldHRpbmdzVXBkYXRlKClcbiAgICB0aGlzLmNvbnRhaW5lci50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQsIHRoaXMuY29udGFpbmVyLmlzRHZySW5Vc2UoKSlcbiAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmN1cnJlbnRWb2x1bWUpXG4gICAgaWYgKHRoaXMuY29udGFpbmVyLm1lZGlhQ29udHJvbERpc2FibGVkKSB7XG4gICAgICB0aGlzLmRpc2FibGUoKVxuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9DT05UQUlORVJDSEFOR0VEKVxuICB9XG5cbiAgc2hvd1ZvbHVtZUJhcigpIHtcbiAgICBpZiAodGhpcy5oaWRlVm9sdW1lSWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVWb2x1bWVJZClcbiAgICB9XG4gICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd2b2x1bWUtYmFyLWhpZGUnKVxuICB9XG5cbiAgaGlkZVZvbHVtZUJhcigpIHtcbiAgICB2YXIgdGltZW91dCA9IDQwMFxuICAgIGlmICghdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyKSByZXR1cm5cbiAgICBpZiAodGhpcy5kcmFnZ2luZ1ZvbHVtZUJhcikge1xuICAgICAgdGhpcy5oaWRlVm9sdW1lSWQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZVZvbHVtZUJhcigpLCB0aW1lb3V0KVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5oaWRlVm9sdW1lSWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVZvbHVtZUlkKVxuICAgICAgfVxuICAgICAgdGhpcy5oaWRlVm9sdW1lSWQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci5hZGRDbGFzcygndm9sdW1lLWJhci1oaWRlJyksIHRpbWVvdXQpXG4gICAgfVxuICB9XG5cbiAgZW5kZWQoKSB7XG4gICAgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KClcbiAgfVxuXG4gIHVwZGF0ZVByb2dyZXNzQmFyKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uLCBkdXJhdGlvbikge1xuICAgIHZhciBsb2FkZWRTdGFydCA9IHN0YXJ0UG9zaXRpb24gLyBkdXJhdGlvbiAqIDEwMFxuICAgIHZhciBsb2FkZWRFbmQgPSBlbmRQb3NpdGlvbiAvIGR1cmF0aW9uICogMTAwXG4gICAgdGhpcy4kc2Vla0JhckxvYWRlZC5jc3MoeyBsZWZ0OiBsb2FkZWRTdGFydCArICclJywgd2lkdGg6IChsb2FkZWRFbmQgLSBsb2FkZWRTdGFydCkgKyAnJScgfSlcbiAgfVxuXG4gIHVwZGF0ZVNlZWtCYXIocG9zaXRpb24sIGR1cmF0aW9uKSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmdTZWVrQmFyKSByZXR1cm5cbiAgICBpZiAocG9zaXRpb24gPCAwKSBwb3NpdGlvbiA9IGR1cmF0aW9uXG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uLnJlbW92ZUNsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyLnJlbW92ZUNsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdmFyIHNlZWtiYXJWYWx1ZSA9ICgxMDAgLyBkdXJhdGlvbikgKiBwb3NpdGlvblxuICAgIHRoaXMuc2V0U2Vla1BlcmNlbnRhZ2Uoc2Vla2JhclZhbHVlKVxuICAgIHRoaXMuJCgnW2RhdGEtcG9zaXRpb25dJykuaHRtbChVdGlscy5mb3JtYXRUaW1lKHBvc2l0aW9uKSlcbiAgICB0aGlzLiQoJ1tkYXRhLWR1cmF0aW9uXScpLmh0bWwoVXRpbHMuZm9ybWF0VGltZShkdXJhdGlvbikpXG4gIH1cblxuICBzZWVrKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkgcmV0dXJuXG4gICAgdmFyIG9mZnNldFggPSBldmVudC5wYWdlWCAtIHRoaXMuJHNlZWtCYXJDb250YWluZXIub2Zmc2V0KCkubGVmdFxuICAgIHZhciBwb3MgPSBvZmZzZXRYIC8gdGhpcy4kc2Vla0JhckNvbnRhaW5lci53aWR0aCgpICogMTAwXG4gICAgcG9zID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heChwb3MsIDApKVxuICAgIHRoaXMuY29udGFpbmVyLnNldEN1cnJlbnRUaW1lKHBvcylcbiAgICB0aGlzLnNldFNlZWtQZXJjZW50YWdlKHBvcylcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHNldEtlZXBWaXNpYmxlKCkge1xuICAgIHRoaXMua2VlcFZpc2libGUgPSB0cnVlXG4gIH1cblxuICByZXNldEtlZXBWaXNpYmxlKCkge1xuICAgIHRoaXMua2VlcFZpc2libGUgPSBmYWxzZVxuICB9XG5cbiAgaXNWaXNpYmxlKCkge1xuICAgIHJldHVybiAhdGhpcy4kZWwuaGFzQ2xhc3MoJ21lZGlhLWNvbnRyb2wtaGlkZScpXG4gIH1cblxuICBzaG93KGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVyblxuICAgIHZhciB0aW1lb3V0ID0gMjAwMFxuICAgIGlmICghZXZlbnQgfHwgKGV2ZW50LmNsaWVudFggIT09IHRoaXMubGFzdE1vdXNlWCAmJiBldmVudC5jbGllbnRZICE9PSB0aGlzLmxhc3RNb3VzZVkpIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2ZpcmVmb3gvaSkpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVJZClcbiAgICAgIHRoaXMuJGVsLnNob3coKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfU0hPVywgdGhpcy5uYW1lKVxuICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ21lZGlhLWNvbnRyb2wtaGlkZScpXG4gICAgICB0aGlzLmhpZGVJZCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlKCksIHRpbWVvdXQpXG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5sYXN0TW91c2VYID0gZXZlbnQuY2xpZW50WFxuICAgICAgICB0aGlzLmxhc3RNb3VzZVkgPSBldmVudC5jbGllbnRZXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB2YXIgdGltZW91dCA9IDIwMDBcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlSWQpXG4gICAgaWYgKCF0aGlzLmlzVmlzaWJsZSgpIHx8IHRoaXMub3B0aW9ucy5oaWRlTWVkaWFDb250cm9sID09PSBmYWxzZSkgcmV0dXJuXG4gICAgaWYgKHRoaXMua2VlcFZpc2libGUgfHwgdGhpcy5kcmFnZ2luZ1NlZWtCYXIgfHwgdGhpcy5kcmFnZ2luZ1ZvbHVtZUJhcikge1xuICAgICAgdGhpcy5oaWRlSWQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aW1lb3V0KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9ISURFLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLiRlbC5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1oaWRlJylcbiAgICAgIHRoaXMuaGlkZVZvbHVtZUJhcigpXG4gICAgfVxuICB9XG5cbiAgc2V0dGluZ3NVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLmdldFBsYXliYWNrVHlwZSgpICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHRoaXMuY29udGFpbmVyLnNldHRpbmdzKS5sZW5ndGggIT09IDApIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLmNvbnRhaW5lci5zZXR0aW5nc1xuICAgICAgdGhpcy5yZW5kZXIoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc2FibGUoKVxuICAgIH1cbiAgfVxuXG4gIGhpZ2hEZWZpbml0aW9uVXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5pc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSkge1xuICAgICAgdGhpcy4kZWwuZmluZCgnYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXScpLmFkZENsYXNzKFwiZW5hYmxlZFwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbC5maW5kKCdidXR0b25bZGF0YS1oZC1pbmRpY2F0b3JdJykucmVtb3ZlQ2xhc3MoXCJlbmFibGVkXCIpXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlQ2FjaGVkRWxlbWVudHMoKSB7XG4gICAgdGhpcy4kcGxheVBhdXNlVG9nZ2xlID0gdGhpcy4kZWwuZmluZCgnYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXBhdXNlXScpXG4gICAgdGhpcy4kcGxheVN0b3BUb2dnbGUgPSB0aGlzLiRlbC5maW5kKCdidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5c3RvcF0nKVxuICAgIHRoaXMuJGZ1bGxzY3JlZW5Ub2dnbGUgPSB0aGlzLiRlbC5maW5kKCdidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1mdWxsc2NyZWVuXScpXG4gICAgdGhpcy4kc2Vla0JhckNvbnRhaW5lciA9IHRoaXMuJGVsLmZpbmQoJy5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0nKVxuICAgIHRoaXMuJHNlZWtCYXJMb2FkZWQgPSB0aGlzLiRlbC5maW5kKCcuYmFyLWZpbGwtMVtkYXRhLXNlZWtiYXJdJylcbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24gPSB0aGlzLiRlbC5maW5kKCcuYmFyLWZpbGwtMltkYXRhLXNlZWtiYXJdJylcbiAgICB0aGlzLiRzZWVrQmFyU2NydWJiZXIgPSB0aGlzLiRlbC5maW5kKCcuYmFyLXNjcnViYmVyW2RhdGEtc2Vla2Jhcl0nKVxuICAgIHRoaXMuJHNlZWtCYXJIb3ZlciA9IHRoaXMuJGVsLmZpbmQoJy5iYXItaG92ZXJbZGF0YS1zZWVrYmFyXScpXG4gICAgdGhpcy4kdm9sdW1lQ29udGFpbmVyID0gdGhpcy4kZWwuZmluZCgnLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdJylcbiAgICB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIgPSB0aGlzLiRlbC5maW5kKCcuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0nKVxuICAgIHRoaXMuJHZvbHVtZUljb24gPSB0aGlzLiRlbC5maW5kKCcuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdJylcbiAgfVxuXG4gIHNldFZvbHVtZUxldmVsKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5pc1JlYWR5IHx8ICF0aGlzLiR2b2x1bWVCYXJDb250YWluZXIpIHtcbiAgICAgIHRoaXMubGlzdGVuVG9PbmNlKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1JFQURZLCAoKSA9PiB0aGlzLnNldFZvbHVtZUxldmVsKHZhbHVlKSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLmZpbmQoJy5zZWdtZW50ZWQtYmFyLWVsZW1lbnQnKS5yZW1vdmVDbGFzcygnZmlsbCcpXG4gICAgICB2YXIgaXRlbSA9IE1hdGguY2VpbCh2YWx1ZSAvIDEwLjApXG4gICAgICB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIuZmluZCgnLnNlZ21lbnRlZC1iYXItZWxlbWVudCcpLnNsaWNlKDAsIGl0ZW0pLmFkZENsYXNzKCdmaWxsJylcbiAgICAgIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgdGhpcy4kdm9sdW1lSWNvbi5yZW1vdmVDbGFzcygnbXV0ZWQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kdm9sdW1lSWNvbi5hZGRDbGFzcygnbXV0ZWQnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFNlZWtQZXJjZW50YWdlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID4gMTAwKSByZXR1cm5cbiAgICB2YXIgcG9zID0gdGhpcy4kc2Vla0JhckNvbnRhaW5lci53aWR0aCgpICogdmFsdWUgLyAxMDAuMCAtICh0aGlzLiRzZWVrQmFyU2NydWJiZXIud2lkdGgoKSAvIDIuMClcbiAgICB0aGlzLmN1cnJlbnRTZWVrUGVyY2VudGFnZSA9IHZhbHVlO1xuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbi5jc3MoeyB3aWR0aDogdmFsdWUgKyAnJScgfSlcbiAgICB0aGlzLiRzZWVrQmFyU2NydWJiZXIuY3NzKHsgbGVmdDogcG9zIH0pXG4gIH1cblxuICBiaW5kS2V5RXZlbnRzKCkge1xuICAgIHRoaXMua2liby5kb3duKFsnc3BhY2UnXSwgKCkgPT4gdGhpcy50b2dnbGVQbGF5UGF1c2UoKSlcbiAgfVxuXG4gIHVuYmluZEtleUV2ZW50cygpIHtcbiAgICB0aGlzLmtpYm8ub2ZmKCdzcGFjZScpXG4gIH1cblxuICBwYXJzZUNvbG9ycygpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLm1lZGlhY29udHJvbCkge1xuICAgICAgdmFyIGJ1dHRvbnNDb2xvciA9IHRoaXMub3B0aW9ucy5tZWRpYWNvbnRyb2wuYnV0dG9ucztcbiAgICAgIHZhciBzZWVrYmFyQ29sb3IgPSB0aGlzLm9wdGlvbnMubWVkaWFjb250cm9sLnNlZWtiYXI7XG4gICAgICB0aGlzLiRlbC5maW5kKCcuYmFyLWZpbGwtMltkYXRhLXNlZWtiYXJdJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgc2Vla2JhckNvbG9yKVxuICAgICAgdGhpcy4kZWwuZmluZCgnW2RhdGEtbWVkaWEtY29udHJvbF0gPiAubWVkaWEtY29udHJvbC1pY29uLCAuZHJhd2VyLWljb24nKS5jc3MoJ2NvbG9yJywgYnV0dG9uc0NvbG9yKVxuICAgICAgdGhpcy4kZWwuZmluZCgnLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV0nKS5jc3MoJ2JveFNoYWRvdycsIFwiaW5zZXQgMnB4IDAgMCBcIiArIGJ1dHRvbnNDb2xvcilcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgICQoZG9jdW1lbnQpLnVuYmluZCgnbW91c2V1cCcpXG4gICAgJChkb2N1bWVudCkudW5iaW5kKCdtb3VzZW1vdmUnKVxuICAgIHRoaXMudW5iaW5kS2V5RXZlbnRzKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgdGltZW91dCA9IDEwMDBcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IoJ21lZGlhX2NvbnRyb2wnLCB7YmFzZVVybDogdGhpcy5vcHRpb25zLmJhc2VVcmx9KTtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoeyBzZXR0aW5nczogdGhpcy5zZXR0aW5ncyB9KSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy5jcmVhdGVDYWNoZWRFbGVtZW50cygpXG4gICAgdGhpcy4kcGxheVBhdXNlVG9nZ2xlLmFkZENsYXNzKCdwYXVzZWQnKVxuICAgIHRoaXMuJHBsYXlTdG9wVG9nZ2xlLmFkZENsYXNzKCdzdG9wcGVkJylcblxuICAgIHRoaXMuY2hhbmdlVG9nZ2xlUGxheSgpXG4gICAgdGhpcy5oaWRlSWQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aW1lb3V0KVxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmhpZGUoKVxuICAgIH1cblxuICAgIGlmKEJyb3dzZXIuaXNTYWZhcmkgJiYgQnJvd3Nlci5pc01vYmlsZSkge1xuICAgICAgdGhpcy4kdm9sdW1lQ29udGFpbmVyLmNzcygnZGlzcGxheScsJ25vbmUnKVxuICAgIH1cblxuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbi5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlci5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRTZWVrUGVyY2VudGFnZSkge1xuICAgICAgdGhpcy5jdXJyZW50U2Vla1BlcmNlbnRhZ2UgPSAwXG4gICAgfVxuICAgIHRoaXMuc2V0U2Vla1BlcmNlbnRhZ2UodGhpcy5jdXJyZW50U2Vla1BlcmNlbnRhZ2UpXG5cbiAgICB0aGlzLiRlbC5yZWFkeSgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuY29udGFpbmVyLnNldHRpbmdzLnNlZWtFbmFibGVkKSB7XG4gICAgICAgIHRoaXMuJHNlZWtCYXJDb250YWluZXIuYWRkQ2xhc3MoJ3NlZWstZGlzYWJsZWQnKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmN1cnJlbnRWb2x1bWUpXG4gICAgICB0aGlzLmJpbmRLZXlFdmVudHMoKVxuICAgICAgdGhpcy5oaWRlVm9sdW1lQmFyKClcbiAgICB9KVxuXG4gICAgdGhpcy5wYXJzZUNvbG9ycygpXG4gICAgdGhpcy5zZWVrVGltZS5yZW5kZXIoKVxuICAgIHRoaXMuaGlnaERlZmluaXRpb25VcGRhdGUoKVxuXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfUkVOREVSRUQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1lZGlhQ29udHJvbFxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCdiYXNlX29iamVjdCcpXG52YXIgQ29yZUZhY3RvcnkgPSByZXF1aXJlKCcuL2NvcmVfZmFjdG9yeScpXG52YXIgTG9hZGVyID0gcmVxdWlyZSgnLi9sb2FkZXInKVxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2xvZGFzaC5hc3NpZ24nKVxudmFyIFBsYXllckluZm8gPSByZXF1aXJlKCdwbGF5ZXJfaW5mbycpXG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB3aW5kb3cucCA9IHRoaXNcbiAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB7cGVyc2lzdENvbmZpZzogdHJ1ZSwgd2lkdGg6IDY0MCwgaGVpZ2h0OiAzNjAsIGJhc2VVcmw6ICdodHRwOi8vY2RuLmNsYXBwci5pby9sYXRlc3QnfVxuICAgIHRoaXMub3B0aW9ucyA9IGFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3B0aW9ucylcbiAgICB0aGlzLm9wdGlvbnMuc291cmNlcyA9IHRoaXMubm9ybWFsaXplU291cmNlcyhvcHRpb25zKVxuICAgIHRoaXMubG9hZGVyID0gbmV3IExvYWRlcih0aGlzLm9wdGlvbnMucGx1Z2lucyB8fCB7fSlcbiAgICB0aGlzLmNvcmVGYWN0b3J5ID0gbmV3IENvcmVGYWN0b3J5KHRoaXMsIHRoaXMubG9hZGVyKVxuICAgIFBsYXllckluZm8uY3VycmVudFNpemUgPSB7d2lkdGg6IG9wdGlvbnMud2lkdGgsIGhlaWdodDogb3B0aW9ucy5oZWlnaHR9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wYXJlbnRJZCkge1xuICAgICAgdGhpcy5zZXRQYXJlbnRJZCh0aGlzLm9wdGlvbnMucGFyZW50SWQpXG4gICAgfVxuICB9XG5cbiAgc2V0UGFyZW50SWQocGFyZW50SWQpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhcmVudElkKVxuICAgIGlmIChlbCkge1xuICAgICAgdGhpcy5hdHRhY2hUbyhlbClcbiAgICB9XG4gIH1cblxuICBhdHRhY2hUbyhlbGVtZW50KSB7XG4gICAgdGhpcy5vcHRpb25zLnBhcmVudEVsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy5jb3JlID0gdGhpcy5jb3JlRmFjdG9yeS5jcmVhdGUoKVxuICB9XG5cbiAgaXModmFsdWUsIHR5cGUpIHtcbiAgICByZXR1cm4gdmFsdWUuY29uc3RydWN0b3IgPT09IHR5cGVcbiAgfVxuXG4gIG5vcm1hbGl6ZVNvdXJjZXMob3B0aW9ucykge1xuICAgIHZhciBzb3VyY2VzID0gb3B0aW9ucy5zb3VyY2VzIHx8IChvcHRpb25zLnNvdXJjZSAhPT0gdW5kZWZpbmVkPyBbb3B0aW9ucy5zb3VyY2UudG9TdHJpbmcoKV0gOiBbXSlcbiAgICByZXR1cm4gc291cmNlcy5sZW5ndGggPT09IDAgPyBbJ25vLm9wJ10gOiBzb3VyY2VzXG4gIH1cblxuICByZXNpemUoc2l6ZSkge1xuICAgIHRoaXMuY29yZS5yZXNpemUoc2l6ZSk7XG4gIH1cblxuICBsb2FkKHNvdXJjZXMpIHtcbiAgICB0aGlzLmNvcmUubG9hZChzb3VyY2VzKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmNvcmUuZGVzdHJveSgpXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnBsYXkoKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnBhdXNlKCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnN0b3AoKTtcbiAgfVxuXG4gIHNlZWsodGltZSkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldEN1cnJlbnRUaW1lKHRpbWUpO1xuICB9XG5cbiAgc2V0Vm9sdW1lKHZvbHVtZSkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICB9XG5cbiAgbXV0ZSgpIHtcbiAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5zZXRWb2x1bWUoMCk7XG4gIH1cblxuICB1bm11dGUoKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc2V0Vm9sdW1lKDEwMCk7XG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLmlzUGxheWluZygpO1xuICB9XG5cbiAgZ2V0Q29udGFpbmVyUGx1Z2luKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuZ2V0UGx1Z2luKG5hbWUpXG4gIH1cblxuICBnZXRDb3JlUGx1Z2luKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JlLmdldFBsdWdpbihuYW1lKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyXG5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zZWVrX3RpbWUnKTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBVSU9iamVjdCA9IHJlcXVpcmUoJ3VpX29iamVjdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBmb3JtYXRUaW1lID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpLmZvcm1hdFRpbWVcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jbGFzcyBTZWVrVGltZSBleHRlbmRzIFVJT2JqZWN0IHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnc2Vla190aW1lJyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gSlNULnNlZWtfdGltZTtcbiAgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsYXNzJzogJ3NlZWstdGltZSBoaWRkZW4nLFxuICAgICAgJ2RhdGEtc2Vlay10aW1lJzogJydcbiAgICB9O1xuICB9XG4gIGNvbnN0cnVjdG9yKG1lZGlhQ29udHJvbCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLm1lZGlhQ29udHJvbCA9IG1lZGlhQ29udHJvbFxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9NT1VTRU1PVkVfU0VFS0JBUiwgdGhpcy5zaG93VGltZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX01PVVNFTEVBVkVfU0VFS0JBUiwgdGhpcy5oaWRlVGltZSlcbiAgfVxuXG4gIHNob3dUaW1lKGV2ZW50KSB7XG4gICAgdmFyIG9mZnNldCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5tZWRpYUNvbnRyb2wuJHNlZWtCYXJDb250YWluZXIub2Zmc2V0KCkubGVmdFxuICAgIHZhciB0aW1lUG9zaXRpb24gPSBNYXRoLm1pbigxMDAsIE1hdGgubWF4KChvZmZzZXQpIC8gdGhpcy5tZWRpYUNvbnRyb2wuJHNlZWtCYXJDb250YWluZXIud2lkdGgoKSAqIDEwMCwgMCkpXG4gICAgdmFyIHBvaW50ZXJQb3NpdGlvbiA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5tZWRpYUNvbnRyb2wuJGVsLm9mZnNldCgpLmxlZnRcbiAgICBwb2ludGVyUG9zaXRpb24gPSBNYXRoLm1pbihNYXRoLm1heCgwLCBwb2ludGVyUG9zaXRpb24pLCB0aGlzLm1lZGlhQ29udHJvbC4kZWwud2lkdGgoKSAtIHRoaXMuJGVsLndpZHRoKCkpXG4gICAgdmFyIGN1cnJlbnRUaW1lID0gdGltZVBvc2l0aW9uICogdGhpcy5tZWRpYUNvbnRyb2wuY29udGFpbmVyLmdldER1cmF0aW9uKCkgLyAxMDBcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHRpbWVzdGFtcDogY3VycmVudFRpbWUsXG4gICAgICBmb3JtYXR0ZWRUaW1lOiBmb3JtYXRUaW1lKGN1cnJlbnRUaW1lKSxcbiAgICAgIHBvaW50ZXJQb3NpdGlvbjogcG9pbnRlclBvc2l0aW9uXG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGUob3B0aW9ucylcbiAgfVxuXG4gIGhpZGVUaW1lKCkge1xuICAgIHRoaXMuJGVsLmFkZENsYXNzKCdoaWRkZW4nKVxuICAgIHRoaXMuJGVsLmNzcygnbGVmdCcsICctMTAwJScpXG4gIH1cblxuICB1cGRhdGUob3B0aW9ucykge1xuICAgIGlmICh0aGlzLm1lZGlhQ29udHJvbC5jb250YWluZXIuZ2V0UGxheWJhY2tUeXBlKCkgPT09ICd2b2QnIHx8IHRoaXMubWVkaWFDb250cm9sLmNvbnRhaW5lci5pc0R2ckluVXNlKCkpIHtcbiAgICAgIHRoaXMuJGVsLmZpbmQoJ1tkYXRhLXNlZWstdGltZV0nKS50ZXh0KG9wdGlvbnMuZm9ybWF0dGVkVGltZSlcbiAgICAgIHRoaXMuJGVsLmNzcygnbGVmdCcsIG9wdGlvbnMucG9pbnRlclBvc2l0aW9uIC0gKHRoaXMuJGVsLndpZHRoKCkgLyAyKSlcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpO1xuICAgICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKCkpO1xuICAgICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKTtcbiAgICAgIHRoaXMubWVkaWFDb250cm9sLiRlbC5hcHBlbmQodGhpcy5lbCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZWVrVGltZTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5YmFjayA9IHJlcXVpcmUoJ3BsYXliYWNrJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIE1lZGlhdG9yID0gcmVxdWlyZSgnbWVkaWF0b3InKVxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgndGVtcGxhdGUnKVxudmFyICQgPSByZXF1aXJlKCd6ZXB0bycpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJ2Jyb3dzZXInKVxudmFyIHNlZWtTdHJpbmdUb1NlY29uZHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykuc2Vla1N0cmluZ1RvU2Vjb25kc1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG52YXIgS2libyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uva2libycpXG5cbnZhciBvYmplY3RJRSA9ICc8b2JqZWN0IHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIGlkPVwiPCU9IGNpZCAlPlwiIGNsYXNzaWQ9XCJjbHNpZDpkMjdjZGI2ZS1hZTZkLTExY2YtOTZiOC00NDQ1NTM1NDAwMDBcIiBkYXRhLWZsYXNoLXZvZD1cIlwiPjxwYXJhbSBuYW1lPVwibW92aWVcIiB2YWx1ZT1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXIuc3dmXCI+IDxwYXJhbSBuYW1lPVwicXVhbGl0eVwiIHZhbHVlPVwiYXV0b2hpZ2hcIj4gPHBhcmFtIG5hbWU9XCJzd2xpdmVjb25uZWN0XCIgdmFsdWU9XCJ0cnVlXCI+IDxwYXJhbSBuYW1lPVwiYWxsb3dTY3JpcHRBY2Nlc3NcIiB2YWx1ZT1cImFsd2F5c1wiPiA8cGFyYW0gbmFtZT1cImJnY29sb3JcIiB2YWx1ZT1cIiMwMDExMjJcIj4gPHBhcmFtIG5hbWU9XCJhbGxvd0Z1bGxTY3JlZW5cIiB2YWx1ZT1cImZhbHNlXCI+IDxwYXJhbSBuYW1lPVwid21vZGVcIiB2YWx1ZT1cImdwdVwiPiA8cGFyYW0gbmFtZT1cInRhYmluZGV4XCIgdmFsdWU9XCIxXCI+IDxwYXJhbSBuYW1lPUZsYXNoVmFycyB2YWx1ZT1cInBsYXliYWNrSWQ9PCU9IHBsYXliYWNrSWQgJT5cIiAvPiA8L29iamVjdD4nXG5cbmNsYXNzIEZsYXNoIGV4dGVuZHMgUGxheWJhY2sge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdmbGFzaCcgfVxuICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdvYmplY3QnIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULmZsYXNoIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnNyYyA9IG9wdGlvbnMuc3JjXG4gICAgdGhpcy5iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsXG4gICAgdGhpcy5hdXRvUGxheSA9IG9wdGlvbnMuYXV0b1BsYXlcbiAgICB0aGlzLnNldHRpbmdzID0ge2RlZmF1bHQ6IFsnc2Vla2JhciddfVxuICAgIHRoaXMuc2V0dGluZ3MubGVmdCA9IFtcInBsYXlwYXVzZVwiLCBcInBvc2l0aW9uXCIsIFwiZHVyYXRpb25cIl1cbiAgICB0aGlzLnNldHRpbmdzLnJpZ2h0ID0gW1wiZnVsbHNjcmVlblwiLCBcInZvbHVtZVwiXVxuICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5pc1JlYWR5ID0gZmFsc2VcbiAgICB0aGlzLmtpYm8gPSBuZXcgS2libygpXG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKVxuICB9XG5cblxuICBib290c3RyYXAoKSB7XG4gICAgdGhpcy5lbC53aWR0aCA9IFwiMTAwJVwiXG4gICAgdGhpcy5lbC5oZWlnaHQgPSBcIjEwMCVcIlxuICAgIHRoaXMuaXNSZWFkeSA9IHRydWVcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgPT09ICdQTEFZSU5HJykge1xuICAgICAgdGhpcy5maXJzdFBsYXkoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiSURMRVwiXG4gICAgICB0aGlzLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpXG4gICAgfVxuICAgICQoJzxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJVwiIC8+JykuaW5zZXJ0QWZ0ZXIodGhpcy4kZWwpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiAndm9kJ1xuICB9XG5cbiAgc2V0dXBGaXJlZm94KCkge1xuICAgIHZhciAkZWwgPSB0aGlzLiQoJ2VtYmVkJylcbiAgICAkZWwuYXR0cignZGF0YS1mbGFzaCcsICcnKVxuICAgIHRoaXMuc2V0RWxlbWVudCgkZWxbMF0pXG4gIH1cblxuICBpc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB1cGRhdGVUaW1lKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy5lbC5nZXRQb3NpdGlvbigpLCB0aGlzLmVsLmdldER1cmF0aW9uKCksIHRoaXMubmFtZSlcbiAgfVxuXG4gIGFkZExpc3RlbmVycygpIHtcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpwcm9ncmVzcycsIHRoaXMucHJvZ3Jlc3MsIHRoaXMpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6dGltZXVwZGF0ZScsIHRoaXMudXBkYXRlVGltZSwgdGhpcylcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpzdGF0ZWNoYW5nZWQnLCB0aGlzLmNoZWNrU3RhdGUsIHRoaXMpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScsIHRoaXMuYm9vdHN0cmFwLCB0aGlzKVxuICAgIFsxLDIsMyw0LDUsNiw3LDgsOV0uZm9yRWFjaCgoaSkgPT4geyB0aGlzLmtpYm8uZG93bihpLnRvU3RyaW5nKCksICgpID0+IHRoaXMuc2VlayhpICogMTApKSB9KVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6cHJvZ3Jlc3MnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzp0aW1ldXBkYXRlJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6c3RhdGVjaGFuZ2VkJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScpXG4gICAgdGhpcy5raWJvLm9mZihbMSwyLDMsNCw1LDYsNyw4LDldKVxuICB9XG5cbiAgY2hlY2tTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgPT09IFwiUEFVU0VEXCIpIHtcbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50U3RhdGUgIT09IFwiUExBWUlOR19CVUZGRVJJTkdcIiAmJiB0aGlzLmVsLmdldFN0YXRlKCkgPT09IFwiUExBWUlOR19CVUZGRVJJTkdcIikge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJJTkcsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJQTEFZSU5HX0JVRkZFUklOR1wiXG4gICAgfSBlbHNlIGlmICh0aGlzLmVsLmdldFN0YXRlKCkgPT09IFwiUExBWUlOR1wiKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJQTEFZSU5HXCJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gXCJJRExFXCIpIHtcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJJRExFXCJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gXCJFTkRFRFwiKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0VOREVELCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDAsIHRoaXMuZWwuZ2V0RHVyYXRpb24oKSwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIkVOREVEXCJcbiAgICB9XG4gIH1cblxuICBwcm9ncmVzcygpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgIT09IFwiSURMRVwiICYmIHRoaXMuY3VycmVudFN0YXRlICE9PSBcIkVOREVEXCIpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUFJPR1JFU1MsIDAsIHRoaXMuZWwuZ2V0Qnl0ZXNMb2FkZWQoKSwgdGhpcy5lbC5nZXRCeXRlc1RvdGFsKCksIHRoaXMubmFtZSlcbiAgICB9XG4gIH1cblxuICBmaXJzdFBsYXkoKSB7XG4gICAgaWYgKHRoaXMuZWwucGxheWVyUGxheSkge1xuICAgICAgdGhpcy5lbC5wbGF5ZXJQbGF5KHRoaXMuc3JjKVxuICAgICAgdGhpcy5saXN0ZW5Ub09uY2UodGhpcywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsICgpID0+IHRoaXMuY2hlY2tJbml0aWFsU2VlaygpKVxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3RlblRvT25jZSh0aGlzLCBFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMuZmlyc3RQbGF5KVxuICAgIH1cbiAgfVxuXG4gIGNoZWNrSW5pdGlhbFNlZWsoKSB7XG4gICAgdmFyIHNlZWtUaW1lID0gc2Vla1N0cmluZ1RvU2Vjb25kcyh3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICBpZiAoc2Vla1RpbWUgIT09IDApIHtcbiAgICAgIHRoaXMuc2Vla1NlY29uZHMoc2Vla1RpbWUpXG4gICAgfVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpID09PSAnUEFVU0VEJyB8fCB0aGlzLmVsLmdldFN0YXRlKCkgPT09ICdQTEFZSU5HX0JVRkZFUklORycpIHtcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJQTEFZSU5HXCJcbiAgICAgIHRoaXMuZWwucGxheWVyUmVzdW1lKClcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWwuZ2V0U3RhdGUoKSAhPT0gJ1BMQVlJTkcnKSB7XG4gICAgICB0aGlzLmZpcnN0UGxheSgpXG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUExBWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuaXNSZWFkeSkge1xuICAgICAgdGhpcy5lbC5wbGF5ZXJWb2x1bWUodmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdGVuVG9PbmNlKHRoaXMsIEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCAoKSA9PiB0aGlzLnZvbHVtZSh2YWx1ZSkpXG4gICAgfVxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBBVVNFRFwiXG4gICAgdGhpcy5lbC5wbGF5ZXJQYXVzZSgpXG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZWwucGxheWVyU3RvcCgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCAwLCB0aGlzLm5hbWUpXG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuICEhKHRoaXMuaXNSZWFkeSAmJiB0aGlzLmN1cnJlbnRTdGF0ZS5pbmRleE9mKFwiUExBWUlOR1wiKSA+IC0xKVxuICB9XG5cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwuZ2V0RHVyYXRpb24oKVxuICB9XG5cbiAgc2VlayhzZWVrQmFyVmFsdWUpIHtcbiAgICB2YXIgc2Vla1RvID0gdGhpcy5lbC5nZXREdXJhdGlvbigpICogKHNlZWtCYXJWYWx1ZSAvIDEwMClcbiAgICB0aGlzLnNlZWtTZWNvbmRzKHNlZWtUbylcbiAgfVxuXG4gIHNlZWtTZWNvbmRzKHNlZWtUbykge1xuICAgIHRoaXMuZWwucGxheWVyU2VlayhzZWVrVG8pXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCBzZWVrVG8sIHRoaXMuZWwuZ2V0RHVyYXRpb24oKSwgdGhpcy5uYW1lKVxuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gXCJQQVVTRURcIikge1xuICAgICAgdGhpcy5lbC5wbGF5ZXJQYXVzZSgpXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuYm9vdHN0cmFwSWQpXG4gICAgc3VwZXIuc3RvcExpc3RlbmluZygpXG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxuXG4gIHNldHVwSUUoKSB7XG4gICAgdGhpcy5zZXRFbGVtZW50KCQodGVtcGxhdGUob2JqZWN0SUUpKHsgY2lkOiB0aGlzLmNpZCwgYmFzZVVybDogdGhpcy5iYXNlVXJsLCBwbGF5YmFja0lkOiB0aGlzLnVuaXF1ZUlkIH0pKSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7IGNpZDogdGhpcy5jaWQsIGJhc2VVcmw6IHRoaXMuYmFzZVVybCwgcGxheWJhY2tJZDogdGhpcy51bmlxdWVJZCB9KSlcbiAgICBpZihCcm93c2VyLmlzRmlyZWZveCkge1xuICAgICAgdGhpcy5zZXR1cEZpcmVmb3goKVxuICAgIH0gZWxzZSBpZihCcm93c2VyLmlzTGVnYWN5SUUpIHtcbiAgICAgIHRoaXMuc2V0dXBJRSgpXG4gICAgfVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbkZsYXNoLmNhblBsYXkgPSBmdW5jdGlvbihyZXNvdXJjZSkge1xuICBpZiAoIUJyb3dzZXIuaGFzRmxhc2gpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfSBlbHNlIGlmICgoIUJyb3dzZXIuaXNNb2JpbGUgJiYgQnJvd3Nlci5pc0ZpcmVmb3gpIHx8IEJyb3dzZXIuaXNMZWdhY3lJRSkge1xuICAgIHJldHVybiAocmVzb3VyY2UgJiYgcmVzb3VyY2UuY29uc3RydWN0b3IgPT09IFN0cmluZykgJiYgISFyZXNvdXJjZS5tYXRjaCgvKC4qKVxcLihtcDR8bW92fGY0dnwzZ3BwfDNncCkvKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAocmVzb3VyY2UgJiYgcmVzb3VyY2UuY29uc3RydWN0b3IgPT09IFN0cmluZykgJiYgISFyZXNvdXJjZS5tYXRjaCgvKC4qKVxcLihtb3Z8ZjR2fDNncHB8M2dwKS8pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaFxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXliYWNrID0gcmVxdWlyZSgncGxheWJhY2snKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guYXNzaWduJylcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJ3RlbXBsYXRlJylcblxudmFyIE1lZGlhdG9yID0gcmVxdWlyZSgnbWVkaWF0b3InKVxudmFyIEJyb3dzZXIgPSByZXF1aXJlKCdicm93c2VyJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciAkID0gcmVxdWlyZSgnemVwdG8nKVxuXG52YXIgb2JqZWN0SUUgPSAnPG9iamVjdCB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBpZD1cIjwlPSBjaWQgJT5cIiBjbGFzcz1cImhscy1wbGF5YmFja1wiIGNsYXNzaWQ9XCJjbHNpZDpkMjdjZGI2ZS1hZTZkLTExY2YtOTZiOC00NDQ1NTM1NDAwMDBcIiBkYXRhLWhscz1cIlwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj48cGFyYW0gbmFtZT1cIm1vdmllXCIgdmFsdWU9XCI8JT0gYmFzZVVybCAlPi9hc3NldHMvSExTUGxheWVyLnN3ZlwiPiA8cGFyYW0gbmFtZT1cInF1YWxpdHlcIiB2YWx1ZT1cImF1dG9oaWdoXCI+IDxwYXJhbSBuYW1lPVwic3dsaXZlY29ubmVjdFwiIHZhbHVlPVwidHJ1ZVwiPiA8cGFyYW0gbmFtZT1cImFsbG93U2NyaXB0QWNjZXNzXCIgdmFsdWU9XCJhbHdheXNcIj4gPHBhcmFtIG5hbWU9XCJiZ2NvbG9yXCIgdmFsdWU9XCIjMDAxMTIyXCI+IDxwYXJhbSBuYW1lPVwiYWxsb3dGdWxsU2NyZWVuXCIgdmFsdWU9XCJmYWxzZVwiPiA8cGFyYW0gbmFtZT1cIndtb2RlXCIgdmFsdWU9XCJ0cmFuc3BhcmVudFwiPiA8cGFyYW0gbmFtZT1cInRhYmluZGV4XCIgdmFsdWU9XCIxXCI+IDxwYXJhbSBuYW1lPUZsYXNoVmFycyB2YWx1ZT1cInBsYXliYWNrSWQ9PCU9IHBsYXliYWNrSWQgJT5cIiAvPiA8L29iamVjdD4nXG5cbmNsYXNzIEhMUyBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnaGxzJyB9XG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ29iamVjdCcgfVxuICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBKU1QuaGxzIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGFzcyc6ICdobHMtcGxheWJhY2snLFxuICAgICAgJ2RhdGEtaGxzJzogJycsXG4gICAgICAndHlwZSc6ICdhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCcsXG4gICAgICAnd2lkdGgnOiAnMTAwJScsXG4gICAgICAnaGVpZ2h0JzogJzEwMCUnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5zcmMgPSBvcHRpb25zLnNyY1xuICAgIHRoaXMuYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybDtcbiAgICB0aGlzLmZsdXNoTGl2ZVVSTENhY2hlID0gKG9wdGlvbnMuZmx1c2hMaXZlVVJMQ2FjaGUgPT09IHVuZGVmaW5lZCk/IHRydWU6IG9wdGlvbnMuZmx1c2hMaXZlVVJMQ2FjaGVcbiAgICB0aGlzLmNhcExldmVsVG9TdGFnZSA9IChvcHRpb25zLmNhcExldmVsVG9TdGFnZSA9PT0gdW5kZWZpbmVkKT8gZmFsc2U6IG9wdGlvbnMuY2FwTGV2ZWxUb1N0YWdlXG4gICAgdGhpcy5oaWdoRGVmaW5pdGlvbiA9IGZhbHNlXG4gICAgdGhpcy5hdXRvUGxheSA9IG9wdGlvbnMuYXV0b1BsYXlcbiAgICB0aGlzLmRlZmF1bHRTZXR0aW5ncyA9IHtcbiAgICAgIGxlZnQ6IFtcInBsYXlzdG9wXCJdLFxuICAgICAgZGVmYXVsdDogWydzZWVrYmFyJ10sXG4gICAgICByaWdodDogW1wiZnVsbHNjcmVlblwiLCBcInZvbHVtZVwiLCBcImhkLWluZGljYXRvclwiXSxcbiAgICAgIHNlZWtFbmFibGVkOiBmYWxzZVxuICAgIH1cbiAgICB0aGlzLnNldHRpbmdzID0gYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRTZXR0aW5ncylcbiAgICB0aGlzLnBsYXliYWNrVHlwZSA9ICdsaXZlJ1xuICAgIHRoaXMuYWRkTGlzdGVuZXJzKClcbiAgfVxuXG4gIGFkZExpc3RlbmVycygpIHtcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpmbGFzaHJlYWR5JywgKCkgPT4gdGhpcy5ib290c3RyYXAoKSlcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzp0aW1ldXBkYXRlJywgKCkgPT4gdGhpcy51cGRhdGVUaW1lKCkpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6cGxheWJhY2tzdGF0ZScsIChzdGF0ZSkgPT4gdGhpcy5zZXRQbGF5YmFja1N0YXRlKHN0YXRlKSlcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpsZXZlbGNoYW5nZWQnLCAoaXNIRCkgPT4gdGhpcy51cGRhdGVIaWdoRGVmaW5pdGlvbihpc0hEKSlcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpwbGF5YmFja2Vycm9yJywgKCkgPT4gdGhpcy5mbGFzaFBsYXliYWNrRXJyb3IoKSlcbiAgfVxuXG4gIHN0b3BMaXN0ZW5pbmcoKSB7XG4gICAgc3VwZXIuc3RvcExpc3RlbmluZygpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOmZsYXNocmVhZHknKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzp0aW1ldXBkYXRlJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6cGxheWJhY2tzdGF0ZScpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOmxldmVsY2hhbmdlZCcpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOnBsYXliYWNrZXJyb3InKVxuICB9XG5cbiAgYm9vdHN0cmFwKCkge1xuICAgIHRoaXMuZWwud2lkdGggPSBcIjEwMCVcIlxuICAgIHRoaXMuZWwuaGVpZ2h0ID0gXCIxMDAlXCJcbiAgICB0aGlzLmlzUmVhZHkgPSB0cnVlXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIklETEVcIlxuICAgIHRoaXMuc2V0Rmxhc2hTZXR0aW5ncygpXG4gICAgdGhpcy51cGRhdGVQbGF5YmFja1R5cGUoKVxuICAgIHRoaXMuYXV0b1BsYXkgJiYgdGhpcy5wbGF5KClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLm5hbWUpXG4gIH1cblxuICBzZXRGbGFzaFNldHRpbmdzKCkge1xuICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJTZXRmbHVzaExpdmVVUkxDYWNoZSh0aGlzLmZsdXNoTGl2ZVVSTENhY2hlKVxuICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJDYXBMZXZlbHRvU3RhZ2UodGhpcy5jYXBMZXZlbFRvU3RhZ2UpXG4gICAgdGhpcy5lbC5nbG9ib1BsYXllclNldG1heEJ1ZmZlckxlbmd0aCgwKVxuICB9XG5cbiAgdXBkYXRlSGlnaERlZmluaXRpb24oaXNIRCkge1xuICAgIHRoaXMuaGlnaERlZmluaXRpb24gPSAoaXNIRCA9PT0gXCJoZFwiKTtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0hJR0hERUZJTklUSU9OVVBEQVRFKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQklUUkFURSwgeydiaXRyYXRlJzogdGhpcy5nZXRDdXJyZW50Qml0cmF0ZSgpfSlcbiAgfVxuXG4gIHVwZGF0ZVRpbWUoKSB7XG4gICAgdmFyIGR1cmF0aW9uID0gdGhpcy5nZXREdXJhdGlvbigpXG4gICAgdmFyIHBvc2l0aW9uID0gTWF0aC5taW4oTWF0aC5tYXgodGhpcy5lbC5nbG9ib0dldFBvc2l0aW9uKCksIDApLCBkdXJhdGlvbilcbiAgICB2YXIgcHJldmlvdXNEVlJTdGF0dXMgPSB0aGlzLmR2ckVuYWJsZWRcbiAgICB2YXIgbGl2ZVBsYXliYWNrID0gKHRoaXMucGxheWJhY2tUeXBlID09PSAnbGl2ZScpXG4gICAgdGhpcy5kdnJFbmFibGVkID0gKGxpdmVQbGF5YmFjayAmJiBkdXJhdGlvbiA+IDI0MClcblxuICAgIGlmIChkdXJhdGlvbiA9PT0gMTAwIHx8IGxpdmVQbGF5YmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZHZyRW5hYmxlZCAhPT0gcHJldmlvdXNEVlJTdGF0dXMpIHtcbiAgICAgIHRoaXMudXBkYXRlU2V0dGluZ3MoKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19TRVRUSU5HU1VQREFURSwgdGhpcy5uYW1lKVxuICAgIH1cblxuICAgIGlmIChsaXZlUGxheWJhY2sgJiYgKCF0aGlzLmR2ckVuYWJsZWQgfHwgIXRoaXMuZHZySW5Vc2UpKSB7XG4gICAgICBwb3NpdGlvbiA9IGR1cmF0aW9uXG4gICAgfVxuXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCBwb3NpdGlvbiwgZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgaWYodGhpcy5jdXJyZW50U3RhdGUgPT09ICdQQVVTRUQnKSB7XG4gICAgICB0aGlzLmVsLmdsb2JvUGxheWVyUmVzdW1lKClcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFN0YXRlICE9PSBcIlBMQVlJTkdcIikge1xuICAgICAgdGhpcy5maXJzdFBsYXkoKVxuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BMQVksIHRoaXMubmFtZSlcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFja1R5cGU/IHRoaXMucGxheWJhY2tUeXBlOiBudWxsXG4gIH1cblxuICBnZXRDdXJyZW50Qml0cmF0ZSgpIHtcbiAgICB2YXIgY3VycmVudExldmVsID0gdGhpcy5nZXRMZXZlbHMoKVt0aGlzLmVsLmdsb2JvR2V0TGV2ZWwoKV1cbiAgICByZXR1cm4gY3VycmVudExldmVsLmJpdHJhdGVcbiAgfVxuXG4gIGdldExhc3RQcm9ncmFtRGF0ZSgpIHtcbiAgICB2YXIgcHJvZ3JhbURhdGUgPSB0aGlzLmVsLmdsb2JvR2V0TGFzdFByb2dyYW1EYXRlKClcbiAgICAvLyBub3JtYWxpemluZyBmb3IgQlJUXG4gICAgcmV0dXJuIHByb2dyYW1EYXRlIC0gMS4wOGUrN1xuICB9XG5cbiAgaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkge1xuICAgIHJldHVybiB0aGlzLmhpZ2hEZWZpbml0aW9uXG4gIH1cblxuICBnZXRMZXZlbHMoKSB7XG4gICAgaWYgKCF0aGlzLmxldmVscyB8fCB0aGlzLmxldmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMubGV2ZWxzID0gdGhpcy5lbC5nbG9ib0dldExldmVscygpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxldmVsc1xuICB9XG5cbiAgc2V0UGxheWJhY2tTdGF0ZShzdGF0ZSkge1xuICAgIHZhciBidWZmZXJMZW5ndGggPSB0aGlzLmVsLmdsb2JvR2V0YnVmZmVyTGVuZ3RoKClcbiAgICBpZiAoc3RhdGUgPT09IFwiUExBWUlOR19CVUZGRVJJTkdcIiAmJiBidWZmZXJMZW5ndGggPCAxKSAge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJJTkcsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMudXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlKVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwiUExBWUlOR1wiKSB7XG4gICAgICBpZiAoW1wiUExBWUlOR19CVUZGRVJJTkdcIiwgXCJQQVVTRURcIiwgXCJJRExFXCJdLmluZGV4T2YodGhpcy5jdXJyZW50U3RhdGUpID49IDApIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCB0aGlzLm5hbWUpXG4gICAgICAgIHRoaXMudXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwiUEFVU0VEXCIpIHtcbiAgICAgIHRoaXMudXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlKVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwiSURMRVwiKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0VOREVELCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDAsIHRoaXMuZWwuZ2xvYm9HZXREdXJhdGlvbigpLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRTdGF0ZShzdGF0ZSlcbiAgICB9XG4gICAgdGhpcy5sYXN0QnVmZmVyTGVuZ3RoID0gYnVmZmVyTGVuZ3RoXG4gIH1cblxuICB1cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHN0YXRlXG4gICAgdGhpcy51cGRhdGVQbGF5YmFja1R5cGUoKVxuICB9XG5cbiAgdXBkYXRlUGxheWJhY2tUeXBlKCkge1xuICAgIHRoaXMucGxheWJhY2tUeXBlID0gdGhpcy5lbC5nbG9ib0dldFR5cGUoKVxuICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSkge1xuICAgICAgdGhpcy5wbGF5YmFja1R5cGUgPSB0aGlzLnBsYXliYWNrVHlwZS50b0xvd2VyQ2FzZSgpXG4gICAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUgPT09ICd2b2QnKSB7XG4gICAgICAgIHRoaXMuc3RhcnRSZXBvcnRpbmdQcm9ncmVzcygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0b3BSZXBvcnRpbmdQcm9ncmVzcygpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUExBWUJBQ0tTVEFURSlcbiAgfVxuXG4gIHN0YXJ0UmVwb3J0aW5nUHJvZ3Jlc3MoKSB7XG4gICAgaWYgKCF0aGlzLnJlcG9ydGluZ1Byb2dyZXNzKSB7XG4gICAgICB0aGlzLnJlcG9ydGluZ1Byb2dyZXNzID0gdHJ1ZVxuICAgICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6ZnJhZ21lbnRsb2FkZWQnLCgpID0+IHRoaXMub25GcmFnbWVudExvYWRlZCgpKVxuICAgIH1cbiAgfVxuXG4gIHN0b3BSZXBvcnRpbmdQcm9ncmVzcygpIHtcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6ZnJhZ21lbnRsb2FkZWQnLCB0aGlzLm9uRnJhZ21lbnRMb2FkZWQsIHRoaXMpXG4gIH1cblxuICBvbkZyYWdtZW50TG9hZGVkKCkge1xuICAgIHZhciBidWZmZXJlZCA9IHRoaXMuZWwuZ2xvYm9HZXRQb3NpdGlvbigpICsgdGhpcy5lbC5nbG9ib0dldGJ1ZmZlckxlbmd0aCgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgdGhpcy5lbC5nbG9ib0dldFBvc2l0aW9uKCksIGJ1ZmZlcmVkLCB0aGlzLmdldER1cmF0aW9uKCksIHRoaXMubmFtZSlcbiAgfVxuXG4gIGZpcnN0UGxheSgpIHtcbiAgICB0aGlzLnNldEZsYXNoU2V0dGluZ3MoKSAvL2Vuc3VyZSBmbHVzaExpdmVVUkxDYWNoZSB3aWxsIHdvcmsgKCMzMjcpXG4gICAgdGhpcy5lbC5nbG9ib1BsYXllckxvYWQodGhpcy5zcmMpXG4gICAgdGhpcy5lbC5nbG9ib1BsYXllclBsYXkoKVxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuaXNSZWFkeSkge1xuICAgICAgdGhpcy5lbC5nbG9ib1BsYXllclZvbHVtZSh2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5Ub09uY2UodGhpcywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsICgpID0+IHRoaXMudm9sdW1lKHZhbHVlKSlcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUgIT09ICdsaXZlJyB8fCB0aGlzLmR2ckVuYWJsZWQpIHtcbiAgICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJQYXVzZSgpXG4gICAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUgPT09ICdsaXZlJyAmJiB0aGlzLmR2ckVuYWJsZWQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVEdnIodHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJTdG9wKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDAsIHRoaXMubmFtZSlcbiAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUpIHtcbiAgICAgIHJldHVybiAhISh0aGlzLmN1cnJlbnRTdGF0ZS5tYXRjaCgvcGxheWluZy9pKSlcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICB2YXIgZHVyYXRpb24gPSB0aGlzLmVsLmdsb2JvR2V0RHVyYXRpb24oKVxuICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gJ2xpdmUnKSB7XG4gICAgICAvLyBlc3RpbWF0ZSAxMCBzZWNvbmRzIG9mIGJ1ZmZlciB0aW1lIGZvciBsaXZlIHN0cmVhbXMgZm9yIHNlZWsgcG9zaXRpb25zXG4gICAgICBkdXJhdGlvbiA9IGR1cmF0aW9uIC0gMTBcbiAgICB9XG4gICAgcmV0dXJuIGR1cmF0aW9uXG4gIH1cblxuICBzZWVrKHRpbWUpIHtcbiAgICB2YXIgZHVyYXRpb24gPSB0aGlzLmdldER1cmF0aW9uKClcbiAgICBpZiAodGltZSA+IDApIHtcbiAgICAgIHRpbWUgPSBkdXJhdGlvbiAqIHRpbWUgLyAxMDBcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUgPT09ICdsaXZlJykge1xuICAgICAgLy8gc2VlayBvcGVyYXRpb25zIHRvIGEgdGltZSB3aXRoaW4gNSBzZWNvbmRzIGZyb20gbGl2ZSBzdHJlYW0gd2lsbCBwb3NpdGlvbiBwbGF5aGVhZCBiYWNrIHRvIGxpdmVcbiAgICAgIHZhciBkdnJJblVzZSA9ICh0aW1lID49IDAgJiYgZHVyYXRpb24gLSB0aW1lID4gNSlcbiAgICAgIGlmICghZHZySW5Vc2UpIHtcbiAgICAgICAgdGltZSA9IC0xXG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZUR2cihkdnJJblVzZSlcbiAgICB9XG4gICAgdGhpcy5lbC5nbG9ib1BsYXllclNlZWsodGltZSlcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRpbWUsIGR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19ISUdIREVGSU5JVElPTlVQREFURSlcbiAgfVxuXG4gIHVwZGF0ZUR2cihkdnJJblVzZSkge1xuICAgIHZhciBwcmV2aW91c0R2ckluVXNlID0gISF0aGlzLmR2ckluVXNlXG4gICAgdGhpcy5kdnJJblVzZSA9IGR2ckluVXNlXG4gICAgaWYgKHRoaXMuZHZySW5Vc2UgIT09IHByZXZpb3VzRHZySW5Vc2UpIHtcbiAgICAgIHRoaXMudXBkYXRlU2V0dGluZ3MoKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19EVlIsIHRoaXMuZHZySW5Vc2UpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1NUQVRTX0FERCwgeydkdnInOiB0aGlzLmR2ckluVXNlfSlcbiAgICB9XG4gIH1cblxuICBmbGFzaFBsYXliYWNrRXJyb3IoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19TVE9QKVxuICB9XG5cbiAgdGltZVVwZGF0ZSh0aW1lLCBkdXJhdGlvbikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGltZSwgZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICB9XG5cbiAgc2V0dXBGaXJlZm94KCkge1xuICAgIHZhciAkZWwgPSB0aGlzLiQoJ2VtYmVkJylcbiAgICAkZWwuYXR0cignZGF0YS1obHMnLCAnJylcbiAgICB0aGlzLnNldEVsZW1lbnQoJGVsKVxuICB9XG5cbiAgc2V0dXBJRSgpIHtcbiAgICB0aGlzLnNldEVsZW1lbnQoJCh0ZW1wbGF0ZShvYmplY3RJRSkoe2NpZDogdGhpcy5jaWQsIGJhc2VVcmw6IHRoaXMuYmFzZVVybCwgcGxheWJhY2tJZDogdGhpcy51bmlxdWVJZH0pKSlcbiAgfVxuXG4gIHVwZGF0ZVNldHRpbmdzKCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdFNldHRpbmdzKVxuICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gXCJ2b2RcIiB8fCB0aGlzLmR2ckluVXNlKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSBbXCJwbGF5cGF1c2VcIiwgXCJwb3NpdGlvblwiLCBcImR1cmF0aW9uXCJdXG4gICAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gdHJ1ZVxuICAgIH0gZWxzZSBpZiAodGhpcy5kdnJFbmFibGVkKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSBbXCJwbGF5cGF1c2VcIl1cbiAgICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHNldEVsZW1lbnQoZWxlbWVudCkge1xuICAgIHRoaXMuJGVsID0gZWxlbWVudFxuICAgIHRoaXMuZWwgPSBlbGVtZW50WzBdXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSlcbiAgICBpZihCcm93c2VyLmlzTGVnYWN5SUUpIHtcbiAgICAgIHRoaXMuc2V0dXBJRSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7Y2lkOiB0aGlzLmNpZCwgYmFzZVVybDogdGhpcy5iYXNlVXJsLCBwbGF5YmFja0lkOiB0aGlzLnVuaXF1ZUlkfSkpXG4gICAgICBpZihCcm93c2VyLmlzRmlyZWZveCkge1xuICAgICAgICB0aGlzLnNldHVwRmlyZWZveCgpXG4gICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNJRSkge1xuICAgICAgICB0aGlzLiQoJ2VtYmVkJykucmVtb3ZlKClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5lbC5pZCA9IHRoaXMuY2lkXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuSExTLmNhblBsYXkgPSBmdW5jdGlvbihyZXNvdXJjZSkge1xuICByZXR1cm4gISEocmVzb3VyY2UubWF0Y2goL15odHRwKC4qKS5tM3U4Py8pICYmIEJyb3dzZXIuaGFzRmxhc2gpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gSExTXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWJhY2sgPSByZXF1aXJlKCdwbGF5YmFjaycpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcbnZhciBmaW5kID0gcmVxdWlyZSgnbG9kYXNoLmZpbmQnKVxuXG5jbGFzcyBIVE1MNUF1ZGlvIGV4dGVuZHMgUGxheWJhY2sge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdodG1sNV9hdWRpbycgfVxuICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdhdWRpbycgfVxuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAndGltZXVwZGF0ZSc6ICd0aW1lVXBkYXRlZCcsXG4gICAgICAnZW5kZWQnOiAnZW5kZWQnLFxuICAgICAgJ2NhbnBsYXl0aHJvdWdoJzogJ2J1ZmZlckZ1bGwnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgc3VwZXIocGFyYW1zKVxuICAgIHRoaXMuZWwuc3JjID0gcGFyYW1zLnNyY1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICBsZWZ0OiBbJ3BsYXlwYXVzZScsICdwb3NpdGlvbicsICdkdXJhdGlvbiddLFxuICAgICAgcmlnaHQ6IFsnZnVsbHNjcmVlbicsICd2b2x1bWUnXSxcbiAgICAgIGRlZmF1bHQ6IFsnc2Vla2JhciddXG4gICAgfVxuICAgIHRoaXMucmVuZGVyKClcbiAgICBwYXJhbXMuYXV0b1BsYXkgJiYgdGhpcy5wbGF5KClcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLnBsYXkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QQVVTRSwgdGhpcy5wYXVzZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NFRUssIHRoaXMuc2VlaylcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1ZPTFVNRSwgdGhpcy52b2x1bWUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLnN0b3ApXG4gIH1cblxuICBnZXRQbGF5YmFja1R5cGUoKSB7XG4gICAgcmV0dXJuIFwiYW9kXCJcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5lbC5wbGF5KClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BMQVkpO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5lbC5wYXVzZSgpXG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMucGF1c2UoKVxuICAgIHRoaXMuZWwuY3VycmVudFRpbWUgPSAwXG4gIH1cblxuICB2b2x1bWUodmFsdWUpIHtcbiAgICB0aGlzLmVsLnZvbHVtZSA9IHZhbHVlIC8gMTAwXG4gIH1cblxuICBtdXRlKCkge1xuICAgIHRoaXMuZWwudm9sdW1lID0gMFxuICB9XG5cbiAgdW5tdXRlKCkge1xuICAgIHRoaXMuZWwudm9sdW1lID0gMVxuICB9XG5cbiAgaXNNdXRlZCgpIHtcbiAgICByZXR1cm4gISF0aGlzLmVsLnZvbHVtZVxuICB9XG5cbiAgZW5kZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfVElNRVVQREFURSwgMClcbiAgfVxuXG4gIHNlZWsoc2Vla0JhclZhbHVlKSB7XG4gICAgdmFyIHRpbWUgPSB0aGlzLmVsLmR1cmF0aW9uICogKHNlZWtCYXJWYWx1ZSAvIDEwMClcbiAgICB0aGlzLmVsLmN1cnJlbnRUaW1lID0gdGltZVxuICB9XG5cbiAgZ2V0Q3VycmVudFRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwuY3VycmVudFRpbWVcbiAgfVxuXG4gIGdldER1cmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVsLmR1cmF0aW9uXG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuICF0aGlzLmVsLnBhdXNlZCAmJiAhdGhpcy5lbC5lbmRlZFxuICB9XG5cbiAgdGltZVVwZGF0ZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aGlzLmVsLmN1cnJlbnRUaW1lLCB0aGlzLmVsLmR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gIH1cblxuICBidWZmZXJGdWxsKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy5lbC5jdXJyZW50VGltZSwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLm5hbWUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuIH1cblxuSFRNTDVBdWRpby5jYW5QbGF5ID0gZnVuY3Rpb24ocmVzb3VyY2UpIHtcbiAgdmFyIG1pbWV0eXBlcyA9IHtcbiAgICAnd2F2JzogWydhdWRpby93YXYnXSxcbiAgICAnbXAzJzogWydhdWRpby9tcDMnLCAnYXVkaW8vbXBlZztjb2RlY3M9XCJtcDNcIiddLFxuICAgICdhYWMnOiBbJ2F1ZGlvL21wNDtjb2RlY3M9XCJtcDRhLjQwLjVcIiddLFxuICAgICdvZ2EnOiBbJ2F1ZGlvL29nZyddXG4gIH1cbiAgdmFyIHJlc291cmNlUGFydHMgPSByZXNvdXJjZS5zcGxpdCgnPycpWzBdLm1hdGNoKC8uKlxcLiguKikkLykgfHwgW11cbiAgaWYgKChyZXNvdXJjZVBhcnRzLmxlbmd0aCA+IDEpICYmIChtaW1ldHlwZXNbcmVzb3VyY2VQYXJ0c1sxXV0gIT09IHVuZGVmaW5lZCkpIHtcbiAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJylcbiAgICByZXR1cm4gISFmaW5kKG1pbWV0eXBlc1tyZXNvdXJjZVBhcnRzWzFdXSwgKGV4dCkgPT4geyByZXR1cm4gISFhLmNhblBsYXlUeXBlKGV4dCkucmVwbGFjZSgvbm8vLCAnJykgfSlcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEhUTUw1QXVkaW9cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5YmFjayA9IHJlcXVpcmUoJ3BsYXliYWNrJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgS2libyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uva2libycpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEJyb3dzZXIgPSByZXF1aXJlKCdicm93c2VyJylcbnZhciBzZWVrU3RyaW5nVG9TZWNvbmRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpLnNlZWtTdHJpbmdUb1NlY29uZHNcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpXG5cbmNsYXNzIEhUTUw1VmlkZW8gZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2h0bWw1X3ZpZGVvJyB9XG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ3ZpZGVvJyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5odG1sNV92aWRlbyB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkYXRhLWh0bWw1LXZpZGVvJzogJydcbiAgICB9XG4gIH1cblxuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAndGltZXVwZGF0ZSc6ICd0aW1lVXBkYXRlZCcsXG4gICAgICAncHJvZ3Jlc3MnOiAncHJvZ3Jlc3MnLFxuICAgICAgJ2VuZGVkJzogJ2VuZGVkJyxcbiAgICAgICdzdGFsbGVkJzogJ3N0YWxsZWQnLFxuICAgICAgJ3dhaXRpbmcnOiAnd2FpdGluZycsXG4gICAgICAnY2FucGxheXRocm91Z2gnOiAnYnVmZmVyRnVsbCcsXG4gICAgICAnbG9hZGVkbWV0YWRhdGEnOiAnbG9hZGVkTWV0YWRhdGEnLFxuICAgICAgJ2NhbnBsYXknOiAncmVhZHknLFxuICAgICAgJ2R1cmF0aW9uY2hhbmdlJzogJ2R1cmF0aW9uQ2hhbmdlJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMua2libyA9IG5ldyBLaWJvKClcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5zcmMgPSBvcHRpb25zLnNyY1xuICAgIHRoaXMuZWwuc3JjID0gb3B0aW9ucy5zcmNcbiAgICB0aGlzLmVsLmxvb3AgPSBvcHRpb25zLmxvb3BcbiAgICB0aGlzLmZpcnN0QnVmZmVyID0gdHJ1ZVxuICAgIHRoaXMuaXNITFMgPSAodGhpcy5zcmMuaW5kZXhPZignbTN1OCcpID4gLTEpXG4gICAgdGhpcy5zZXR0aW5ncyA9IHtkZWZhdWx0OiBbJ3NlZWtiYXInXX1cbiAgICBpZiAoQnJvd3Nlci5pc1NhZmFyaSkge1xuICAgICAgdGhpcy5zZXR1cFNhZmFyaSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwucHJlbG9hZCA9IG9wdGlvbnMucHJlbG9hZCA/IG9wdGlvbnMucHJlbG9hZDogJ21ldGFkYXRhJ1xuICAgICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IHRydWVcbiAgICB9XG4gICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gdGhpcy5pc0hMUyA/IFtcInBsYXlzdG9wXCJdIDogW1wicGxheXBhdXNlXCIsIFwicG9zaXRpb25cIiwgXCJkdXJhdGlvblwiXVxuICAgIHRoaXMuc2V0dGluZ3MucmlnaHQgPSBbXCJmdWxsc2NyZWVuXCIsIFwidm9sdW1lXCJdXG4gICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgfVxuXG4gIHNldHVwU2FmYXJpKCkge1xuICAgIHRoaXMuZWwucHJlbG9hZCA9ICdhdXRvJ1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICBbMSwyLDMsNCw1LDYsNyw4LDldLmZvckVhY2goKGkpID0+IHsgdGhpcy5raWJvLmRvd24oaS50b1N0cmluZygpLCAoKSA9PiB0aGlzLnNlZWsoaSAqIDEwKSkgfSlcbiAgfVxuXG4gIHN0b3BMaXN0ZW5pbmcoKSB7XG4gICAgdGhpcy5raWJvLm9mZihbMSwyLDMsNCw1LDYsNyw4LDldKVxuICB9XG5cbiAgbG9hZGVkTWV0YWRhdGEoZSkge1xuICAgIHRoaXMuZHVyYXRpb25DaGFuZ2UoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfTE9BREVETUVUQURBVEEsIGUudGFyZ2V0LmR1cmF0aW9uKVxuICAgIHRoaXMuY2hlY2tJbml0aWFsU2VlaygpXG4gIH1cblxuICBkdXJhdGlvbkNoYW5nZSgpIHtcbiAgICAvLyB3ZSBjYW4ndCBmaWd1cmUgb3V0IGlmIGhscyByZXNvdXJjZSBpcyBWb0Qgb3Igbm90IHVudGlsIGl0IGlzIGJlaW5nIGxvYWRlZCBvciBkdXJhdGlvbiBoYXMgY2hhbmdlZC5cbiAgICAvLyB0aGF0J3Mgd2h5IHdlIGNoZWNrIGl0IGFnYWluIGFuZCB1cGRhdGUgbWVkaWEgY29udHJvbCBhY2NvcmRpbmdseS5cbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ3ZvZCcpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MubGVmdCA9IFtcInBsYXlwYXVzZVwiLCBcInBvc2l0aW9uXCIsIFwiZHVyYXRpb25cIl1cbiAgICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSB0cnVlXG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfU0VUVElOR1NVUERBVEUpXG4gIH1cblxuICBnZXRQbGF5YmFja1R5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNITFMgJiYgWzAsIHVuZGVmaW5lZCwgSW5maW5pdHldLmluZGV4T2YodGhpcy5lbC5kdXJhdGlvbikgPj0gMCA/ICdsaXZlJyA6ICd2b2QnXG4gIH1cblxuICBpc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuZWwucGxheSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuZWwucGF1c2UoKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnBhdXNlKClcbiAgICBpZiAodGhpcy5lbC5yZWFkeVN0YXRlICE9PSAwKSB7XG4gICAgICB0aGlzLmVsLmN1cnJlbnRUaW1lID0gMFxuICAgIH1cbiAgfVxuXG4gIHZvbHVtZSh2YWx1ZSkge1xuICAgIHRoaXMuZWwudm9sdW1lID0gdmFsdWUgLyAxMDBcbiAgfVxuXG4gIG11dGUoKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSAwXG4gIH1cblxuICB1bm11dGUoKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSAxXG4gIH1cblxuICBpc011dGVkKCkge1xuICAgIHJldHVybiAhIXRoaXMuZWwudm9sdW1lXG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuICF0aGlzLmVsLnBhdXNlZCAmJiAhdGhpcy5lbC5lbmRlZFxuICB9XG5cbiAgZW5kZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19FTkRFRCwgdGhpcy5uYW1lKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgc3RhbGxlZCgpIHtcbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ3ZvZCcgJiYgdGhpcy5lbC5yZWFkeVN0YXRlIDwgdGhpcy5lbC5IQVZFX0ZVVFVSRV9EQVRBKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIHdhaXRpbmcoKSB7XG4gICAgaWYodGhpcy5lbC5yZWFkeVN0YXRlIDwgdGhpcy5lbC5IQVZFX0ZVVFVSRV9EQVRBKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIGJ1ZmZlckZ1bGwoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wb3N0ZXIgJiYgdGhpcy5maXJzdEJ1ZmZlcikge1xuICAgICAgdGhpcy5maXJzdEJ1ZmZlciA9IGZhbHNlXG4gICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nKCkpIHtcbiAgICAgICAgdGhpcy5lbC5wb3N0ZXIgPSB0aGlzLm9wdGlvbnMucG9zdGVyXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwucG9zdGVyID0gJydcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCB0aGlzLm5hbWUpXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZygpXG4gICAgdGhpcy5zdG9wKClcbiAgICB0aGlzLmVsLnNyYyA9ICcnXG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxuXG4gIHNlZWsoc2Vla0JhclZhbHVlKSB7XG4gICAgdmFyIHRpbWUgPSB0aGlzLmVsLmR1cmF0aW9uICogKHNlZWtCYXJWYWx1ZSAvIDEwMClcbiAgICB0aGlzLnNlZWtTZWNvbmRzKHRpbWUpXG4gIH1cblxuICBzZWVrU2Vjb25kcyh0aW1lKSB7XG4gICAgdGhpcy5lbC5jdXJyZW50VGltZSA9IHRpbWVcbiAgfVxuXG4gIGNoZWNrSW5pdGlhbFNlZWsoKSB7XG4gICAgdmFyIHNlZWtUaW1lID0gc2Vla1N0cmluZ1RvU2Vjb25kcyh3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICB0aGlzLnNlZWtTZWNvbmRzKHNlZWtUaW1lKVxuICB9XG5cbiAgZ2V0Q3VycmVudFRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwuY3VycmVudFRpbWVcbiAgfVxuXG4gIGdldER1cmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVsLmR1cmF0aW9uXG4gIH1cblxuICB0aW1lVXBkYXRlZCgpIHtcbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ2xpdmUnKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDEsIDEsIHRoaXMubmFtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aGlzLmVsLmN1cnJlbnRUaW1lLCB0aGlzLmVsLmR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgcHJvZ3Jlc3MoKSB7XG4gICAgaWYgKCF0aGlzLmVsLmJ1ZmZlcmVkLmxlbmd0aCkgcmV0dXJuXG4gICAgdmFyIGJ1ZmZlcmVkUG9zID0gMFxuICAgIGZvciAodmFyIGkgPSAwOyAgaSA8IHRoaXMuZWwuYnVmZmVyZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmVsLmN1cnJlbnRUaW1lID49IHRoaXMuZWwuYnVmZmVyZWQuc3RhcnQoaSkgJiYgdGhpcy5lbC5jdXJyZW50VGltZSA8PSB0aGlzLmVsLmJ1ZmZlcmVkLmVuZChpKSkge1xuICAgICAgICBidWZmZXJlZFBvcyA9IGlcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgdGhpcy5lbC5idWZmZXJlZC5zdGFydChidWZmZXJlZFBvcyksIHRoaXMuZWwuYnVmZmVyZWQuZW5kKGJ1ZmZlcmVkUG9zKSwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgdHlwZUZvcihzcmMpIHtcbiAgICByZXR1cm4gKHNyYy5pbmRleE9mKCcubTN1OCcpID4gMCkgPyAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnIDogJ3ZpZGVvL21wNCdcbiAgfVxuXG4gIHJlYWR5KCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMubmFtZSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7IHNyYzogdGhpcy5zcmMsIHR5cGU6IHRoaXMudHlwZUZvcih0aGlzLnNyYykgfSkpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vcHRpb25zLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpLCAwKTtcbiAgICBpZiAodGhpcy5lbC5yZWFkeVN0YXRlID09PSB0aGlzLmVsLkhBVkVfRU5PVUdIX0RBVEEpIHtcbiAgICAgIHRoaXMucmVhZHkoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbkhUTUw1VmlkZW8uY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlKSB7XG4gIHZhciBtaW1ldHlwZXMgPSB7XG4gICAgJ21wNCc6IFtcImF2YzEuNDJFMDFFXCIsIFwiYXZjMS41OEEwMUVcIiwgXCJhdmMxLjRENDAxRVwiLCBcImF2YzEuNjQwMDFFXCIsIFwibXA0di4yMC44XCIsIFwibXA0di4yMC4yNDBcIiwgXCJtcDRhLjQwLjJcIl0ubWFwKFxuICAgICAgKGNvZGVjKSA9PiB7IHJldHVybiAndmlkZW8vbXA0OyBjb2RlY3M9XCInICsgY29kZWMgKyAnLCBtcDRhLjQwLjJcIid9KSxcbiAgICAnb2dnJzogWyd2aWRlby9vZ2c7IGNvZGVjcz1cInRoZW9yYSwgdm9yYmlzXCInLCAndmlkZW8vb2dnOyBjb2RlY3M9XCJkaXJhY1wiJywgJ3ZpZGVvL29nZzsgY29kZWNzPVwidGhlb3JhLCBzcGVleFwiJ10sXG4gICAgJzNncHAnOiBbJ3ZpZGVvLzNncHA7IGNvZGVjcz1cIm1wNHYuMjAuOCwgc2FtclwiJ10sXG4gICAgJ3dlYm0nOiBbJ3ZpZGVvL3dlYm07IGNvZGVjcz1cInZwOCwgdm9yYmlzXCInXSxcbiAgICAnbWt2JzogWyd2aWRlby94LW1hdHJvc2thOyBjb2RlY3M9XCJ0aGVvcmEsIHZvcmJpc1wiJ10sXG4gICAgJ20zdTgnOiBbJ2FwcGxpY2F0aW9uL3gtbXBlZ1VSTCddXG4gIH1cbiAgbWltZXR5cGVzWydvZ3YnXSA9IG1pbWV0eXBlc1snb2dnJ11cbiAgbWltZXR5cGVzWyczZ3AnXSA9IG1pbWV0eXBlc1snM2dwcCddXG5cbiAgdmFyIHJlc291cmNlUGFydHMgPSByZXNvdXJjZS5zcGxpdCgnPycpWzBdLm1hdGNoKC8uKlxcLiguKikkLykgfHwgW11cbiAgaWYgKChyZXNvdXJjZVBhcnRzLmxlbmd0aCA+IDEpICYmIChtaW1ldHlwZXNbcmVzb3VyY2VQYXJ0c1sxXV0gIT09IHVuZGVmaW5lZCkpIHtcbiAgICB2YXIgdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICByZXR1cm4gISFmaW5kKG1pbWV0eXBlc1tyZXNvdXJjZVBhcnRzWzFdXSwgKGV4dCkgPT4geyByZXR1cm4gISF2LmNhblBsYXlUeXBlKGV4dCkucmVwbGFjZSgvbm8vLCAnJykgfSlcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIVE1MNVZpZGVvXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWJhY2sgPSByZXF1aXJlKCdwbGF5YmFjaycpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxuXG5jbGFzcyBIVE1MSW1nIGV4dGVuZHMgUGxheWJhY2sge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdodG1sX2ltZycgfVxuICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdpbWcnIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkYXRhLWh0bWwtaW1nJzogJydcbiAgICB9XG4gIH1cblxuICBnZXRQbGF5YmFja1R5cGUoKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHN1cGVyKHBhcmFtcylcbiAgICB0aGlzLmVsLnNyYyA9IHBhcmFtcy5zcmNcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG4gfVxuXG5IVE1MSW1nLmNhblBsYXkgPSBmdW5jdGlvbihyZXNvdXJjZSkge1xuICByZXR1cm4gISFyZXNvdXJjZS5tYXRjaCgvKC4qKS4ocG5nfGpwZ3xqcGVnfGdpZnxibXApLylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIVE1MSW1nXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbm9fb3AnKTtcbiIsInZhciBQbGF5YmFjayA9IHJlcXVpcmUoJ3BsYXliYWNrJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNsYXNzIE5vT3AgZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ25vX29wJyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5ub19vcCB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7J2RhdGEtbm8tb3AnOiAnJ31cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKTtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpO1xuICAgIHRoaXMuYW5pbWF0ZSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBub2lzZSgpIHtcbiAgICB2YXIgaWRhdGEgPSB0aGlzLmNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHRoaXMuY29udGV4dC5jYW52YXMud2lkdGgsIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuICAgIHZhciBidWZmZXIzMiA9IG5ldyBVaW50MzJBcnJheShpZGF0YS5kYXRhLmJ1ZmZlcilcbiAgICB2YXIgbGVuID0gYnVmZmVyMzIubGVuZ3RoXG4gICAgdmFyIHJ1biA9IDBcbiAgICB2YXIgY29sb3IgPSAwXG4gICAgdmFyIG0gPSBNYXRoLnJhbmRvbSgpICogNiArIDRcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOykge1xuICAgICAgaWYgKHJ1biA8IDApIHtcbiAgICAgICAgcnVuID0gbSAqIE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHZhciBwID0gTWF0aC5wb3coTWF0aC5yYW5kb20oKSwgMC40KTtcbiAgICAgICAgY29sb3IgPSAoMjU1ICogcCkgPDwgMjQ7XG4gICAgICB9XG4gICAgICBydW4gLT0gMTtcbiAgICAgIGJ1ZmZlcjMyW2krK10gPSBjb2xvcjtcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YShpZGF0YSwgMCwgMCk7XG4gIH1cblxuICBsb29wKCkge1xuICAgIHRoaXMubm9pc2UoKVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmxvb3AoKSlcbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgdGhpcy5jYW52YXMgPSB0aGlzLiRlbC5maW5kKCdjYW52YXNbZGF0YS1uby1vcC1jYW52YXNdJylbMF1cbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgdGhpcy5sb29wKClcbiAgfVxufVxuXG5Ob09wLmNhblBsYXkgPSAoc291cmNlKSA9PiB7XG4gIHJldHVybiB0cnVlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm9PcFxuIiwiLy9Db3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgnY29udGFpbmVyX3BsdWdpbicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcblxuY2xhc3MgQ2xpY2tUb1BhdXNlUGx1Z2luIGV4dGVuZHMgQ29udGFpbmVyUGx1Z2luIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnY2xpY2tfdG9fcGF1c2UnIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLmNocm9tZWxlc3MpIHtcbiAgICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgfVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0NMSUNLLCB0aGlzLmNsaWNrKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VUVElOR1NVUERBVEUsIHRoaXMuc2V0dGluZ3NVcGRhdGUpXG4gIH1cblxuICBjbGljaygpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuZ2V0UGxheWJhY2tUeXBlKCkgIT09ICdsaXZlJyB8fCB0aGlzLmNvbnRhaW5lci5pc0R2ckVuYWJsZWQoKSkge1xuICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmlzUGxheWluZygpKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnBhdXNlKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnBsYXkoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldHRpbmdzVXBkYXRlKCkge1xuICAgIHRoaXMuY29udGFpbmVyLiRlbC5yZW1vdmVDbGFzcygncG9pbnRlci1lbmFibGVkJylcbiAgICBpZiAodGhpcy5jb250YWluZXIuZ2V0UGxheWJhY2tUeXBlKCkgIT09ICdsaXZlJyB8fCB0aGlzLmNvbnRhaW5lci5pc0R2ckVuYWJsZWQoKSkge1xuICAgICAgdGhpcy5jb250YWluZXIuJGVsLmFkZENsYXNzKCdwb2ludGVyLWVuYWJsZWQnKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENsaWNrVG9QYXVzZVBsdWdpblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2NsaWNrX3RvX3BhdXNlJylcbiIsInZhciBVSUNvcmVQbHVnaW4gPSByZXF1aXJlKCd1aV9jb3JlX3BsdWdpbicpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxudmFyICQgPSByZXF1aXJlKCd6ZXB0bycpXG5cbmNsYXNzIERWUkNvbnRyb2xzIGV4dGVuZHMgVUlDb3JlUGx1Z2luIHtcbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULmR2cl9jb250cm9scyB9XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2R2cl9jb250cm9scycgfVxuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xpY2sgLmxpdmUtYnV0dG9uJzogJ2NsaWNrJ1xuICAgIH1cbiAgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsYXNzJzogJ2R2ci1jb250cm9scycsXG4gICAgICAnZGF0YS1kdnItY29udHJvbHMnOiAnJyxcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihjb3JlKSB7XG4gICAgc3VwZXIoY29yZSlcbiAgICB0aGlzLmNvcmUgPSBjb3JlXG4gICAgdGhpcy5zZXR0aW5nc1VwZGF0ZSgpXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb3JlLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9DT05UQUlORVJDSEFOR0VELCB0aGlzLnNldHRpbmdzVXBkYXRlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb3JlLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9SRU5ERVJFRCwgdGhpcy5zZXR0aW5nc1VwZGF0ZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLRFZSU1RBVEVDSEFOR0VELCB0aGlzLmR2ckNoYW5nZWQpXG4gIH1cblxuICBkdnJDaGFuZ2VkKGR2ckVuYWJsZWQpIHtcbiAgICB0aGlzLnNldHRpbmdzVXBkYXRlKClcbiAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5hZGRDbGFzcygnbGl2ZScpXG4gICAgaWYgKGR2ckVuYWJsZWQpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmFkZENsYXNzKCdkdnInKVxuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kZWwuZmluZCgnLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtcG9zaXRpb25dLCAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1kdXJhdGlvbl0nKS5oaWRlKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kZWwucmVtb3ZlQ2xhc3MoJ2R2cicpXG4gICAgfVxuICB9XG5cbiAgY2xpY2soKSB7XG4gICAgaWYgKCF0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkge1xuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIucGxheSgpXG4gICAgfVxuICAgIGlmICh0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5oYXNDbGFzcygnZHZyJykpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldEN1cnJlbnRUaW1lKC0xKVxuICAgIH1cbiAgfVxuXG4gIHNldHRpbmdzVXBkYXRlKCkge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZygpXG4gICAgaWYodGhpcy5zaG91bGRSZW5kZXIoKSkge1xuICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgdGhpcy4kZWwuY2xpY2soKCkgPT4gdGhpcy5jbGljaygpKVxuICAgIH1cbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICB9XG5cbiAgc2hvdWxkUmVuZGVyKCkge1xuICAgIHZhciB1c2VEdnJDb250cm9scyA9IHRoaXMuY29yZS5vcHRpb25zLnVzZUR2ckNvbnRyb2xzID09PSB1bmRlZmluZWQgfHwgISF0aGlzLmNvcmUub3B0aW9ucy51c2VEdnJDb250cm9sc1xuICAgIHJldHVybiB1c2VEdnJDb250cm9scyAmJiB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ2xpdmUnXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSlcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgaWYgKHRoaXMuc2hvdWxkUmVuZGVyKCkpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmFkZENsYXNzKCdsaXZlJylcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJCgnLm1lZGlhLWNvbnRyb2wtbGVmdC1wYW5lbFtkYXRhLW1lZGlhLWNvbnRyb2xdJykuYXBwZW5kKHRoaXMuJGVsKVxuICAgICAgaWYgKHRoaXMuJGR1cmF0aW9uKSB7XG4gICAgICAgIHRoaXMuJGR1cmF0aW9uLnJlbW92ZSgpXG4gICAgICB9XG4gICAgICB0aGlzLiRkdXJhdGlvbiA9ICQoJzxzcGFuIGRhdGEtZHVyYXRpb24+PC9zcGFuPicpXG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLnNlZWtUaW1lLiRlbC5hcHBlbmQodGhpcy4kZHVyYXRpb24pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEVlJDb250cm9sc1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2R2cl9jb250cm9scycpXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgnY29udGFpbmVyX3BsdWdpbicpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNsYXNzIEdvb2dsZUFuYWx5dGljcyBleHRlbmRzIENvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2dvb2dsZV9hbmFseXRpY3MnIH1cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgaWYgKG9wdGlvbnMuZ2FBY2NvdW50KSB7XG4gICAgICB0aGlzLmFjY291bnQgPSBvcHRpb25zLmdhQWNjb3VudFxuICAgICAgdGhpcy50cmFja2VyTmFtZSA9IChvcHRpb25zLmdhVHJhY2tlck5hbWUpID8gb3B0aW9ucy5nYVRyYWNrZXJOYW1lICsgXCIuXCIgOiAnQ2xhcHByLidcbiAgICAgIHRoaXMuZG9tYWluTmFtZSA9IG9wdGlvbnMuZ2FEb21haW5OYW1lXG4gICAgICB0aGlzLmN1cnJlbnRIRFN0YXRlID0gdW5kZWZpbmVkXG4gICAgICB0aGlzLmVtYmVkU2NyaXB0KClcbiAgICB9XG4gIH1cblxuICBlbWJlZFNjcmlwdCgpIHtcbiAgICBpZiAoIXdpbmRvdy5fZ2F0KSB7XG4gICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dC9qYXZhc2NyaXB0XCIpXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwiYXN5bmNcIiwgXCJhc3luY1wiKVxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImh0dHA6Ly93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20vZ2EuanNcIilcbiAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKClcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKClcbiAgICB9XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWSwgdGhpcy5vblBsYXkpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QQVVTRSwgdGhpcy5vblBhdXNlKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcy5vbkVuZGVkKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJJTkcsIHRoaXMub25CdWZmZXJpbmcpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMub25CdWZmZXJGdWxsKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcy5vbkVuZGVkKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FUlJPUiwgdGhpcy5vbkVycm9yKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS1NUQVRFLCB0aGlzLm9uUGxheWJhY2tDaGFuZ2VkKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9WT0xVTUUsIChldmVudCkgPT4gdGhpcy5vblZvbHVtZUNoYW5nZWQoZXZlbnQpKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TRUVLLCAoZXZlbnQpID0+IHRoaXMub25TZWVrKGV2ZW50KSlcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRlVMTF9TQ1JFRU4sIHRoaXMub25GdWxsc2NyZWVuKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9ISUdIREVGSU5JVElPTlVQREFURSwgdGhpcy5vbkhEKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCwgdGhpcy5vbkRWUilcbiAgICB9XG4gICAgX2dhcS5wdXNoKFt0aGlzLnRyYWNrZXJOYW1lICsgJ19zZXRBY2NvdW50JywgdGhpcy5hY2NvdW50XSk7XG4gICAgaWYgKCEhdGhpcy5kb21haW5OYW1lKVxuICAgICAgX2dhcS5wdXNoKFt0aGlzLnRyYWNrZXJOYW1lICsgJ19zZXREb21haW5OYW1lJywgdGhpcy5kb21haW5OYW1lXSk7XG4gIH1cblxuICBvblBsYXkoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiUGxheVwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIlN0b3BcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uRW5kZWQoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiRW5kZWRcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIkJ1ZmZlcmluZ1wiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25CdWZmZXJGdWxsKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIkJ1ZmZlcmZ1bGxcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uRXJyb3IoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiRXJyb3JcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uSEQoKSB7XG4gICAgdmFyIHN0YXR1cyA9IHRoaXMuY29udGFpbmVyLmlzSGlnaERlZmluaXRpb25JblVzZSgpPyBcIk9OXCI6IFwiT0ZGXCJcbiAgICBpZiAoc3RhdHVzICE9PSB0aGlzLmN1cnJlbnRIRFN0YXRlKSB7XG4gICAgICB0aGlzLmN1cnJlbnRIRFN0YXRlID0gc3RhdHVzXG4gICAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJIRCAtIFwiICsgc3RhdHVzLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICAgIH1cbiAgfVxuXG5cbiAgb25QbGF5YmFja0NoYW5nZWQoKSB7XG4gICAgdmFyIHR5cGUgPSB0aGlzLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKVxuICAgIGlmICh0eXBlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJQbGF5YmFjayBUeXBlIC0gXCIgKyB0eXBlLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICAgIH1cbiAgfVxuXG4gIG9uRFZSKGR2ckluVXNlKSB7XG4gICAgdmFyIHN0YXR1cyA9IGR2ckluVXNlPyBcIk9OXCI6IFwiT0ZGXCJcbiAgICB0aGlzLnB1c2goW1wiSW50ZXJhY3Rpb25cIiwgXCJEVlIgLSBcIiArIHN0YXR1cywgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uUGF1c2UoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiUGF1c2VcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uU2VlaygpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJTZWVrXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvblZvbHVtZUNoYW5nZWQoKSB7XG4gICAgdGhpcy5wdXNoKFtcIkludGVyYWN0aW9uXCIsIFwiVm9sdW1lXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvbkZ1bGxzY3JlZW4oKSB7XG4gICAgdGhpcy5wdXNoKFtcIkludGVyYWN0aW9uXCIsIFwiRnVsbHNjcmVlblwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cblxuICBwdXNoKGFycmF5KSB7XG4gICAgdmFyIHJlcyA9IFt0aGlzLnRyYWNrZXJOYW1lICsgXCJfdHJhY2tFdmVudFwiXS5jb25jYXQoYXJyYXkpXG4gICAgX2dhcS5wdXNoKHJlcylcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gR29vZ2xlQW5hbHl0aWNzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2dvb2dsZV9hbmFseXRpY3MnKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9sb2cnKTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBLaWJvID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9raWJvJylcblxuY2xhc3MgTG9nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5raWJvID0gbmV3IEtpYm8oKVxuICAgIHRoaXMua2liby5kb3duKFsnY3RybCBzaGlmdCBkJ10sICgpID0+IHRoaXMub25PZmYoKSlcbiAgICB0aGlzLkJMQUNLTElTVCA9IFsncGxheWJhY2s6dGltZXVwZGF0ZScsICdwbGF5YmFjazpwcm9ncmVzcycsICdjb250YWluZXI6aG92ZXInLCAnY29udGFpbmVyOnRpbWV1cGRhdGUnLCAnY29udGFpbmVyOnByb2dyZXNzJ107XG4gIH1cblxuICBpbmZvKGtsYXNzLCBtZXNzYWdlKSB7dGhpcy5sb2coa2xhc3MsICdpbmZvJywgbWVzc2FnZSl9XG4gIHdhcm4oa2xhc3MsIG1lc3NhZ2UpIHt0aGlzLmxvZyhrbGFzcywgJ3dhcm4nLCBtZXNzYWdlKX1cbiAgZGVidWcoa2xhc3MsIG1lc3NhZ2UpIHt0aGlzLmxvZyhrbGFzcywgJ2RlYnVnJywgbWVzc2FnZSl9XG5cbiAgb25PZmYoKSB7XG4gICAgd2luZG93LkRFQlVHID0gIXdpbmRvdy5ERUJVR1xuICAgIGlmICh3aW5kb3cuREVCVUcpIHsgY29uc29sZS5sb2coJ2xvZyBlbmFibGVkJyk7ICB9XG4gICAgZWxzZSB7IGNvbnNvbGUubG9nKCdsb2cgZGlzYWJsZWQnKTsgfVxuICB9XG5cbiAgbG9nKGtsYXNzLCBsZXZlbCwgbWVzc2FnZSkge1xuICAgIGlmICghd2luZG93LkRFQlVHIHx8IHRoaXMuQkxBQ0tMSVNULmluZGV4T2YobWVzc2FnZSkgPj0gMCkgcmV0dXJuXG4gICAgdmFyIGNvbG9yXG4gICAgaWYgKGxldmVsID09PSAnd2FybicpIHsgY29sb3IgPSAnI0ZGODAwMCcgfVxuICAgIGVsc2UgaWYgKGxldmVsID09PSAnaW5mbycpIHsgY29sb3IgPSAnIzAwNjYwMCcgfVxuICAgIGVsc2UgaWYgKGxldmVsID09PSAnZXJyb3InKSB7IGNvbG9yID0gJyNGRjAwMDAnfVxuICAgIGNvbnNvbGUubG9nKFwiJWMgW1wiICsga2xhc3MgKyBcIl0gW1wiICsgbGV2ZWwgKyBcIl0gXCIgKyAgbWVzc2FnZSwgJ2NvbG9yOiAnK2NvbG9yKTtcbiAgfVxufVxuXG5Mb2cuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuX2luc3RhbmNlID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKClcbiAgfVxuICByZXR1cm4gdGhpcy5faW5zdGFuY2Vcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IExvZ1xuIiwiLy9Db3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgVUlDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCd1aV9jb250YWluZXJfcGx1Z2luJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJ21lZGlhdG9yJylcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgncGxheWVyX2luZm8nKVxuXG52YXIgJCA9IHJlcXVpcmUoJ3plcHRvJylcblxuY2xhc3MgUG9zdGVyUGx1Z2luIGV4dGVuZHMgVUlDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdwb3N0ZXInIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULnBvc3RlciB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGFzcyc6ICdwbGF5ZXItcG9zdGVyJyxcbiAgICAgICdkYXRhLXBvc3Rlcic6ICcnXG4gICAgfVxuICB9XG5cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsaWNrJzogJ2NsaWNrZWQnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMuY29udGFpbmVyLmRpc2FibGVNZWRpYUNvbnRyb2woKVxuICAgIHRoaXMucmVuZGVyKClcbiAgICB0aGlzLmJ1ZmZlckZ1bGwgPSBmYWxzZVxuICB9XG5cbiAgbG9hZChzb3VyY2UpIHtcbiAgICB0aGlzLm9wdGlvbnMucG9zdGVyID0gc291cmNlXG4gICAgdGhpcy5yZW5kZXIoKVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORywgdGhpcy5vbkJ1ZmZlcmluZylcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMub25CdWZmZXJmdWxsKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5vblN0b3ApXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLm9uUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0VOREVELCB0aGlzLm9uU3RvcClcbiAgICBNZWRpYXRvci5vbihFdmVudHMuUExBWUVSX1JFU0laRSwgdGhpcy51cGRhdGVTaXplLCB0aGlzKVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICBNZWRpYXRvci5vZmYoRXZlbnRzLlBMQVlFUl9SRVNJWkUsIHRoaXMudXBkYXRlU2l6ZSwgdGhpcylcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIHRoaXMuYnVmZmVyRnVsbCA9IGZhbHNlXG4gICAgdGhpcy5oaWRlUGxheUJ1dHRvbigpXG4gIH1cblxuICBvblBsYXkoKSB7XG4gICAgaWYgKHRoaXMuYnVmZmVyRnVsbCkge1xuICAgICAgdGhpcy4kZWwuaGlkZSgpXG4gICAgICB0aGlzLmNvbnRhaW5lci5lbmFibGVNZWRpYUNvbnRyb2woKVxuICAgIH1cbiAgfVxuXG4gIG9uQnVmZmVyZnVsbCgpIHtcbiAgICB0aGlzLmJ1ZmZlckZ1bGwgPSB0cnVlXG4gICAgaWYgKHRoaXMuY29udGFpbmVyLnBsYXliYWNrLm5hbWUgPT09ICdodG1sNV92aWRlbycgJiYgIXRoaXMuY29udGFpbmVyLmlzUGxheWluZygpKSByZXR1cm5cbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB0aGlzLmNvbnRhaW5lci5lbmFibGVNZWRpYUNvbnRyb2woKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMuJGVsLnNob3coKVxuICAgIHRoaXMuY29udGFpbmVyLmRpc2FibGVNZWRpYUNvbnRyb2woKVxuICAgIHRoaXMuc2hvd1BsYXlCdXR0b24oKVxuICB9XG5cbiAgc2hvd1BsYXlCdXR0b24oKSB7XG4gICAgdGhpcy4kcGxheUJ1dHRvbi5zaG93KClcbiAgICB0aGlzLnVwZGF0ZVNpemUoKVxuICB9XG5cbiAgaGlkZVBsYXlCdXR0b24oKSB7XG4gICAgdGhpcy4kcGxheUJ1dHRvbi5oaWRlKClcbiAgfVxuXG4gIGNsaWNrZWQoKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgdGhpcy5jb250YWluZXIucGxheSgpXG4gICAgICB0aGlzLmhpZGVQbGF5QnV0dG9uKClcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB1cGRhdGVTaXplKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5uYW1lID09PSAnaHRtbF9pbWcnKSByZXR1cm5cbiAgICB2YXIgaGVpZ2h0ID0gUGxheWVySW5mby5jdXJyZW50U2l6ZSA/IFBsYXllckluZm8uY3VycmVudFNpemUuaGVpZ2h0IDogdGhpcy4kZWwuaGVpZ2h0KClcbiAgICB0aGlzLiRlbC5jc3MoeyBmb250U2l6ZTogaGVpZ2h0IH0pXG4gICAgaWYgKHRoaXMuJHBsYXlXcmFwcGVyLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICB0aGlzLiRwbGF5V3JhcHBlci5jc3MoeyBtYXJnaW5Ub3A6IC0odGhpcy4kcGxheVdyYXBwZXIuaGVpZ2h0KCkgLyAyKSB9KVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIucGxheWJhY2submFtZSA9PT0gJ2h0bWxfaW1nJykgcmV0dXJuXG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSwge2Jhc2VVcmw6IHRoaXMub3B0aW9ucy5iYXNlVXJsfSlbMF1cbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wb3N0ZXIpIHtcbiAgICAgIHZhciBpbWdFbCA9ICQoJzxkaXYgZGF0YS1wb3N0ZXIgY2xhc3M9XCJwb3N0ZXItYmFja2dyb3VuZFwiPjwvZGl2PicpXG4gICAgICBpbWdFbC5jc3MoeydiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdGhpcy5vcHRpb25zLnBvc3RlciArICcpJ30pXG4gICAgICB0aGlzLiRlbC5wcmVwZW5kKGltZ0VsKVxuICAgIH1cbiAgICB0aGlzLmNvbnRhaW5lci4kZWwuYXBwZW5kKHRoaXMuZWwpXG4gICAgdGhpcy4kcGxheUJ1dHRvbiA9IHRoaXMuJGVsLmZpbmQoJy5wb3N0ZXItaWNvbicpXG4gICAgdGhpcy4kcGxheVdyYXBwZXIgPSB0aGlzLiRlbC5maW5kKCcucGxheS13cmFwcGVyJylcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlU2l6ZSgpLCAwKVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgdGhpcy5oaWRlUGxheUJ1dHRvbigpXG4gICAgICB0aGlzLiRlbC5jc3MoeydjdXJzb3InOiAnaW5pdGlhbCd9KVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zdGVyUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc3Bpbm5lcl90aHJlZV9ib3VuY2UnKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFVJQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgndWlfY29udGFpbmVyX3BsdWdpbicpO1xudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJyk7XG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcblxuY2xhc3MgU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luIGV4dGVuZHMgVUlDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdzcGlubmVyJyB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZGF0YS1zcGlubmVyJzonJyxcbiAgICAgICdjbGFzcyc6ICdzcGlubmVyLXRocmVlLWJvdW5jZSdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnRlbXBsYXRlID0gSlNULnNwaW5uZXJfdGhyZWVfYm91bmNlXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJJTkcsIHRoaXMub25CdWZmZXJpbmcpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMLCB0aGlzLm9uQnVmZmVyRnVsbClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICAgIHRoaXMucmVuZGVyKClcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIHRoaXMuJGVsLnNob3coKVxuICB9XG5cbiAgb25CdWZmZXJGdWxsKCkge1xuICAgIHRoaXMuJGVsLmhpZGUoKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMuJGVsLmhpZGUoKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcignc3Bpbm5lcl90aHJlZV9ib3VuY2UnKVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy5jb250YWluZXIuJGVsLmFwcGVuZCh0aGlzLiRlbClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3N0YXRzJyk7XG5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCdjb250YWluZXJfcGx1Z2luJyk7XG52YXIgJCA9IHJlcXVpcmUoXCJ6ZXB0b1wiKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcblxuY2xhc3MgU3RhdHNQbHVnaW4gZXh0ZW5kcyBDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdzdGF0cycgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc2V0SW5pdGlhbEF0dHJzKClcbiAgICB0aGlzLnJlcG9ydEludGVydmFsID0gb3B0aW9ucy5yZXBvcnRJbnRlcnZhbCB8fCA1MDAwXG4gICAgdGhpcy5zdGF0ZSA9IFwiSURMRVwiXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19QTEFZLCB0aGlzLm9uUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfREVTVFJPWUVELCB0aGlzLm9uU3RvcClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORywgdGhpcy5vbkJ1ZmZlcmluZylcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMub25CdWZmZXJGdWxsKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVFNfQURELCB0aGlzLm9uU3RhdHNBZGQpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9CSVRSQVRFLCB0aGlzLm9uU3RhdHNBZGQpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lci5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1NUQVRTX0FERCwgdGhpcy5vblN0YXRzQWRkKVxuICB9XG5cbiAgc2V0SW5pdGlhbEF0dHJzKCkge1xuICAgIHRoaXMuZmlyc3RQbGF5ID0gdHJ1ZVxuICAgIHRoaXMuc3RhcnR1cFRpbWUgPSAwXG4gICAgdGhpcy5yZWJ1ZmZlcmluZ1RpbWUgPSAwXG4gICAgdGhpcy53YXRjaGluZ1RpbWUgPSAwXG4gICAgdGhpcy5yZWJ1ZmZlcnMgPSAwXG4gICAgdGhpcy5leHRlcm5hbE1ldHJpY3MgPSB7fVxuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIHRoaXMuc3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgIHRoaXMud2F0Y2hpbmdUaW1lSW5pdCA9IERhdGUubm93KClcbiAgICBpZiAoIXRoaXMuaW50ZXJ2YWxJZCkge1xuICAgICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodGhpcy5yZXBvcnQuYmluZCh0aGlzKSwgdGhpcy5yZXBvcnRJbnRlcnZhbClcbiAgICB9XG4gIH1cblxuICBvblN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpXG4gICAgdGhpcy5pbnRlcnZhbElkID0gdW5kZWZpbmVkXG4gICAgdGhpcy5zdGF0ZSA9IFwiU1RPUFBFRFwiXG4gIH1cblxuICBvbkJ1ZmZlcmluZygpIHtcbiAgICBpZiAodGhpcy5maXJzdFBsYXkpIHtcbiAgICAgIHRoaXMuc3RhcnR1cFRpbWVJbml0ID0gRGF0ZS5ub3coKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlYnVmZmVyaW5nVGltZUluaXQgPSBEYXRlLm5vdygpXG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBcIkJVRkZFUklOR1wiXG4gICAgdGhpcy5yZWJ1ZmZlcnMrK1xuICB9XG5cbiAgb25CdWZmZXJGdWxsKCkge1xuICAgIGlmICh0aGlzLmZpcnN0UGxheSAmJiAhIXRoaXMuc3RhcnR1cFRpbWVJbml0KSB7XG4gICAgICB0aGlzLmZpcnN0UGxheSA9IGZhbHNlXG4gICAgICB0aGlzLnN0YXJ0dXBUaW1lID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnR1cFRpbWVJbml0XG4gICAgICB0aGlzLndhdGNoaW5nVGltZUluaXQgPSBEYXRlLm5vdygpXG4gICAgfSBlbHNlIGlmICghIXRoaXMucmVidWZmZXJpbmdUaW1lSW5pdCkge1xuICAgICAgdGhpcy5yZWJ1ZmZlcmluZ1RpbWUgKz0gdGhpcy5nZXRSZWJ1ZmZlcmluZ1RpbWUoKVxuICAgIH1cbiAgICB0aGlzLnJlYnVmZmVyaW5nVGltZUluaXQgPSB1bmRlZmluZWRcbiAgICB0aGlzLnN0YXRlID0gXCJQTEFZSU5HXCJcbiAgfVxuXG4gIGdldFJlYnVmZmVyaW5nVGltZSgpIHtcbiAgICByZXR1cm4gRGF0ZS5ub3coKSAtIHRoaXMucmVidWZmZXJpbmdUaW1lSW5pdFxuICB9XG5cbiAgZ2V0V2F0Y2hpbmdUaW1lKCkge1xuICAgIHZhciB0b3RhbFRpbWUgPSAoRGF0ZS5ub3coKSAtIHRoaXMud2F0Y2hpbmdUaW1lSW5pdClcbiAgICByZXR1cm4gdG90YWxUaW1lIC0gdGhpcy5yZWJ1ZmZlcmluZ1RpbWVcbiAgfVxuXG4gIGlzUmVidWZmZXJpbmcoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5yZWJ1ZmZlcmluZ1RpbWVJbml0XG4gIH1cblxuICBvblN0YXRzQWRkKG1ldHJpYykge1xuICAgICQuZXh0ZW5kKHRoaXMuZXh0ZXJuYWxNZXRyaWNzLCBtZXRyaWMpXG4gIH1cblxuICBnZXRTdGF0cygpIHtcbiAgICB2YXIgbWV0cmljcyA9IHtcbiAgICAgIHN0YXJ0dXBUaW1lOiAgICAgdGhpcy5zdGFydHVwVGltZSxcbiAgICAgIHJlYnVmZmVyczogICAgICAgdGhpcy5yZWJ1ZmZlcnMsXG4gICAgICByZWJ1ZmZlcmluZ1RpbWU6IHRoaXMuaXNSZWJ1ZmZlcmluZygpPyB0aGlzLnJlYnVmZmVyaW5nVGltZSArIHRoaXMuZ2V0UmVidWZmZXJpbmdUaW1lKCk6IHRoaXMucmVidWZmZXJpbmdUaW1lLFxuICAgICAgd2F0Y2hpbmdUaW1lOiAgICB0aGlzLmlzUmVidWZmZXJpbmcoKT8gdGhpcy5nZXRXYXRjaGluZ1RpbWUoKSAtIHRoaXMuZ2V0UmVidWZmZXJpbmdUaW1lKCk6IHRoaXMuZ2V0V2F0Y2hpbmdUaW1lKClcbiAgICB9XG4gICAgJC5leHRlbmQobWV0cmljcywgdGhpcy5leHRlcm5hbE1ldHJpY3MpXG4gICAgcmV0dXJuIG1ldHJpY3NcbiAgfVxuXG4gIHJlcG9ydCgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5zdGF0c1JlcG9ydCh0aGlzLmdldFN0YXRzKCkpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0c1BsdWdpbjtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi93YXRlcm1hcmsnKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFVJQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgndWlfY29udGFpbmVyX3BsdWdpbicpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jbGFzcyBXYXRlck1hcmtQbHVnaW4gZXh0ZW5kcyBVSUNvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ3dhdGVybWFyaycgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMudGVtcGxhdGUgPSBKU1RbdGhpcy5uYW1lXVxuICAgIHRoaXMucG9zaXRpb24gPSBvcHRpb25zLnBvc2l0aW9uIHx8IFwiYm90dG9tLXJpZ2h0XCJcbiAgICBpZiAob3B0aW9ucy53YXRlcm1hcmspIHtcbiAgICAgIHRoaXMuaW1hZ2VVcmwgPSBvcHRpb25zLndhdGVybWFya1xuICAgICAgdGhpcy5yZW5kZXIoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICAgIH1cbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLm9uUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIGlmICghdGhpcy5oaWRkZW4pXG4gICAgICB0aGlzLiRlbC5zaG93KClcbiAgfVxuXG4gIG9uU3RvcCgpIHtcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB2YXIgdGVtcGxhdGVPcHRpb25zID0ge3Bvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLCBpbWFnZVVybDogdGhpcy5pbWFnZVVybH1cbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUodGVtcGxhdGVPcHRpb25zKSlcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy5jb250YWluZXIuJGVsLmFwcGVuZCh0aGlzLiRlbClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2F0ZXJNYXJrUGx1Z2luXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgdW5pcXVlSWQgPSByZXF1aXJlKCcuL3V0aWxzJykudW5pcXVlSWRcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jbGFzcyBCYXNlT2JqZWN0IGV4dGVuZHMgRXZlbnRzIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucz17fSkge1xuICAgIHRoaXMudW5pcXVlSWQgPSB1bmlxdWVJZCgnbycpXG4gICAgdGhpcy5jb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZU9iamVjdFxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuY2xhc3MgQnJvd3NlciB7XG59XG5cbnZhciBoYXNMb2NhbHN0b3JhZ2UgPSBmdW5jdGlvbigpe1xuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGFwcHInLCAnY2xhcHByJylcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY2xhcHByJylcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG52YXIgaGFzRmxhc2ggPSBmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICB2YXIgZm8gPSBuZXcgQWN0aXZlWE9iamVjdCgnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnKTtcbiAgICByZXR1cm4gISFmbztcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiAhIShuYXZpZ2F0b3IubWltZVR5cGVzICYmIG5hdmlnYXRvci5taW1lVHlwZXNbJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJ10gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBuYXZpZ2F0b3IubWltZVR5cGVzWydhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCddLmVuYWJsZWRQbHVnaW4pO1xuICB9XG59XG5cbkJyb3dzZXIuaXNTYWZhcmkgPSAoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9zYWZhcmkvaSkgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUnKSA9PT0gLTEpXG5Ccm93c2VyLmlzQ2hyb21lID0gISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvY2hyb21lL2kpKVxuQnJvd3Nlci5pc0ZpcmVmb3ggPSAhIShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9maXJlZm94L2kpKVxuQnJvd3Nlci5pc0xlZ2FjeUlFID0gISEod2luZG93LkFjdGl2ZVhPYmplY3QpXG5Ccm93c2VyLmlzSUUgPSBCcm93c2VyLmlzTGVnYWN5SUUgfHwgISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvdHJpZGVudC4qcnY6MVxcZC9pKSlcbkJyb3dzZXIuaXNJRTExID0gISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvdHJpZGVudC4qcnY6MTEvaSkpXG5Ccm93c2VyLmlzTW9iaWxlID0gISEoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fFdpbmRvd3MgUGhvbmV8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpXG5Ccm93c2VyLmlzV2luOEFwcCA9ICEhKC9NU0FwcEhvc3QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKVxuQnJvd3Nlci5pc1dpaVUgPSAhISgvV2lpVS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpXG5Ccm93c2VyLmlzUFM0ID0gISEoL1BsYXlTdGF0aW9uIDQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKVxuQnJvd3Nlci5oYXNMb2NhbHN0b3JhZ2UgPSBoYXNMb2NhbHN0b3JhZ2UoKVxuQnJvd3Nlci5oYXNGbGFzaCA9IGhhc0ZsYXNoKClcblxubW9kdWxlLmV4cG9ydHMgPSBCcm93c2VyXG4iLCJ2YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0JylcblxuY2xhc3MgQ29udGFpbmVyUGx1Z2luIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmJpbmRFdmVudHMoKVxuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29udGFpbmVyJyk7XG4iLCJ2YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0JylcblxuY2xhc3MgQ29yZVBsdWdpbiBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3Rvcihjb3JlKSB7XG4gICAgc3VwZXIoY29yZSlcbiAgICB0aGlzLmNvcmUgPSBjb3JlXG4gIH1cblxuICBnZXRFeHRlcm5hbEludGVyZmFjZSgpIHsgcmV0dXJuIHt9IH1cblxuICBkZXN0cm95KCkge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29yZScpO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIGV4ZWNPbmNlID0gcmVxdWlyZSgnbG9kYXNoLm9uY2UnKVxudmFyIHVuaXF1ZUlkID0gcmVxdWlyZSgnLi91dGlscycpLnVuaXF1ZUlkXG52YXIgTG9nID0gcmVxdWlyZSgnLi4vcGx1Z2lucy9sb2cnKS5nZXRJbnN0YW5jZSgpXG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG5jbGFzcyBFdmVudHMge1xuICBvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXNcbiAgICB0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KVxuICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV0gfHwgKHRoaXMuX2V2ZW50c1tuYW1lXSA9IFtdKVxuICAgIGV2ZW50cy5wdXNoKHtjYWxsYmFjazogY2FsbGJhY2ssIGNvbnRleHQ6IGNvbnRleHQsIGN0eDogY29udGV4dCB8fCB0aGlzfSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgb25jZShuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbmNlJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpc1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIHZhciBvbmNlID0gZXhlY09uY2UoZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLm9mZihuYW1lLCBvbmNlKVxuICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH0pXG4gICAgb25jZS5fY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIG9uY2UsIGNvbnRleHQpXG4gIH1cblxuICBvZmYobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgcmV0YWluLCBldiwgZXZlbnRzLCBuYW1lcywgaSwgbCwgaiwga1xuICAgIGlmICghdGhpcy5fZXZlbnRzIHx8ICFldmVudHNBcGkodGhpcywgJ29mZicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pKSByZXR1cm4gdGhpc1xuICAgIGlmICghbmFtZSAmJiAhY2FsbGJhY2sgJiYgIWNvbnRleHQpIHtcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHZvaWQgMFxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXModGhpcy5fZXZlbnRzKVxuICAgIGZvciAoaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG5hbWUgPSBuYW1lc1tpXVxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdXG4gICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50c1tuYW1lXSA9IHJldGFpbiA9IFtdXG4gICAgICAgIGlmIChjYWxsYmFjayB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgZm9yIChqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgIGV2ID0gZXZlbnRzW2pdXG4gICAgICAgICAgICBpZiAoKGNhbGxiYWNrICYmIGNhbGxiYWNrICE9PSBldi5jYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2suX2NhbGxiYWNrKSB8fFxuICAgICAgICAgICAgICAgIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2LmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIGRlbGV0ZSB0aGlzLl9ldmVudHNbbmFtZV1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHRyaWdnZXIobmFtZSkge1xuICAgIHZhciBrbGFzcyA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV1cbiAgICBMb2cuaW5mbyhrbGFzcywgbmFtZSlcbiAgICBpZiAoIXRoaXMuX2V2ZW50cykgcmV0dXJuIHRoaXNcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICd0cmlnZ2VyJywgbmFtZSwgYXJncykpIHJldHVybiB0aGlzXG4gICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXVxuICAgIHZhciBhbGxFdmVudHMgPSB0aGlzLl9ldmVudHMuYWxsXG4gICAgaWYgKGV2ZW50cykgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MpXG4gICAgaWYgKGFsbEV2ZW50cykgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RvcExpc3RlbmluZyhvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGxpc3RlbmluZ1RvID0gdGhpcy5fbGlzdGVuaW5nVG9cbiAgICBpZiAoIWxpc3RlbmluZ1RvKSByZXR1cm4gdGhpc1xuICAgIHZhciByZW1vdmUgPSAhbmFtZSAmJiAhY2FsbGJhY2tcbiAgICBpZiAoIWNhbGxiYWNrICYmIHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JykgY2FsbGJhY2sgPSB0aGlzXG4gICAgaWYgKG9iaikgKGxpc3RlbmluZ1RvID0ge30pW29iai5fbGlzdGVuSWRdID0gb2JqXG4gICAgZm9yICh2YXIgaWQgaW4gbGlzdGVuaW5nVG8pIHtcbiAgICAgIG9iaiA9IGxpc3RlbmluZ1RvW2lkXVxuICAgICAgb2JqLm9mZihuYW1lLCBjYWxsYmFjaywgdGhpcylcbiAgICAgIGlmIChyZW1vdmUgfHwgT2JqZWN0LmtleXMob2JqLl9ldmVudHMpLmxlbmd0aCA9PT0gMCkgZGVsZXRlIHRoaXMuX2xpc3RlbmluZ1RvW2lkXVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbnZhciBldmVudFNwbGl0dGVyID0gL1xccysvXG5cbnZhciBldmVudHNBcGkgPSBmdW5jdGlvbihvYmosIGFjdGlvbiwgbmFtZSwgcmVzdCkge1xuICBpZiAoIW5hbWUpIHJldHVybiB0cnVlXG5cbiAgLy8gSGFuZGxlIGV2ZW50IG1hcHMuXG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgb2JqW2FjdGlvbl0uYXBwbHkob2JqLCBba2V5LCBuYW1lW2tleV1dLmNvbmNhdChyZXN0KSlcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBIYW5kbGUgc3BhY2Ugc2VwYXJhdGVkIGV2ZW50IG5hbWVzLlxuICBpZiAoZXZlbnRTcGxpdHRlci50ZXN0KG5hbWUpKSB7XG4gICAgdmFyIG5hbWVzID0gbmFtZS5zcGxpdChldmVudFNwbGl0dGVyKVxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtuYW1lc1tpXV0uY29uY2F0KHJlc3QpKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbnZhciB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzKSB7XG4gIHZhciBldiwgaSA9IC0xLCBsID0gZXZlbnRzLmxlbmd0aCwgYTEgPSBhcmdzWzBdLCBhMiA9IGFyZ3NbMV0sIGEzID0gYXJnc1syXVxuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7IHJldHVyblxuICAgIGNhc2UgMTogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTsgcmV0dXJuXG4gICAgY2FzZSAyOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTsgcmV0dXJuXG4gICAgY2FzZSAzOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyLCBhMyk7IHJldHVyblxuICAgIGRlZmF1bHQ6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7IHJldHVyblxuICB9XG59XG5cbnZhciBsaXN0ZW5NZXRob2RzID0ge2xpc3RlblRvOiAnb24nLCBsaXN0ZW5Ub09uY2U6ICdvbmNlJ31cblxuT2JqZWN0LmtleXMobGlzdGVuTWV0aG9kcykuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgRXZlbnRzLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBsaXN0ZW5pbmdUbyA9IHRoaXMuX2xpc3RlbmluZ1RvIHx8ICh0aGlzLl9saXN0ZW5pbmdUbyA9IHt9KVxuICAgIHZhciBpZCA9IG9iai5fbGlzdGVuSWQgfHwgKG9iai5fbGlzdGVuSWQgPSB1bmlxdWVJZCgnbCcpKVxuICAgIGxpc3RlbmluZ1RvW2lkXSA9IG9ialxuICAgIGlmICghY2FsbGJhY2sgJiYgdHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXNcbiAgICBvYmpbbGlzdGVuTWV0aG9kc1ttZXRob2RdXShuYW1lLCBjYWxsYmFjaywgdGhpcylcbiAgICByZXR1cm4gdGhpc1xuICB9XG59KTtcblxuLy8gUExBWUVSIEVWRU5UU1xuRXZlbnRzLlBMQVlFUl9SRVNJWkUgPSAncGxheWVyOnJlc2l6ZSdcblxuLy8gUGxheWJhY2sgRXZlbnRzXG5FdmVudHMuUExBWUJBQ0tfUFJPR1JFU1MgPSAncGxheWJhY2s6cHJvZ3Jlc3MnXG5FdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSA9ICdwbGF5YmFjazp0aW1ldXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX1JFQURZID0gJ3BsYXliYWNrOnJlYWR5J1xuRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORyA9ICdwbGF5YmFjazpidWZmZXJpbmcnXG5FdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCA9ICdwbGF5YmFjazpidWZmZXJmdWxsJ1xuRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFID0gJ3BsYXliYWNrOnNldHRpbmdzdXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX0xPQURFRE1FVEFEQVRBID0gJ3BsYXliYWNrOmxvYWRlZG1ldGFkYXRhJ1xuRXZlbnRzLlBMQVlCQUNLX0hJR0hERUZJTklUSU9OVVBEQVRFID0gJ3BsYXliYWNrOmhpZ2hkZWZpbml0aW9udXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX0JJVFJBVEUgPSAncGxheWJhY2s6Yml0cmF0ZSdcbkV2ZW50cy5QTEFZQkFDS19QTEFZQkFDS1NUQVRFID0gJ3BsYXliYWNrOnBsYXliYWNrc3RhdGUnXG5FdmVudHMuUExBWUJBQ0tfRFZSID0gJ3BsYXliYWNrOmR2cidcbkV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRElTQUJMRSA9ICdwbGF5YmFjazptZWRpYWNvbnRyb2w6ZGlzYWJsZSdcbkV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRU5BQkxFID0gJ3BsYXliYWNrOm1lZGlhY29udHJvbDplbmFibGUnXG5FdmVudHMuUExBWUJBQ0tfRU5ERUQgPSAncGxheWJhY2s6ZW5kZWQnXG5FdmVudHMuUExBWUJBQ0tfUExBWSA9ICdwbGF5YmFjazpwbGF5J1xuRXZlbnRzLlBMQVlCQUNLX0VSUk9SID0gJ3BsYXliYWNrOmVycm9yJ1xuRXZlbnRzLlBMQVlCQUNLX1NUQVRTX0FERCA9ICdwbGF5YmFjazpzdGF0czphZGQnXG5cbi8vIENvbnRhaW5lciBFdmVudHNcbkV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tTVEFURSA9ICdjb250YWluZXI6cGxheWJhY2tzdGF0ZSdcbkV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQgPSAnY29udGFpbmVyOmR2cidcbkV2ZW50cy5DT05UQUlORVJfQklUUkFURSA9ICdjb250YWluZXI6Yml0cmF0ZSdcbkV2ZW50cy5DT05UQUlORVJfU1RBVFNfUkVQT1JUID0gJ2NvbnRhaW5lcjpzdGF0czpyZXBvcnQnXG5FdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCA9ICdjb250YWluZXI6ZGVzdHJveWVkJ1xuRXZlbnRzLkNPTlRBSU5FUl9SRUFEWSA9ICdjb250YWluZXI6cmVhZHknXG5FdmVudHMuQ09OVEFJTkVSX0VSUk9SID0gJ2NvbnRhaW5lcjplcnJvcidcbkV2ZW50cy5DT05UQUlORVJfTE9BREVETUVUQURBVEEgPSAnY29udGFpbmVyOmxvYWRlZG1ldGFkYXRhJ1xuRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFID0gJ2NvbnRhaW5lcjp0aW1ldXBkYXRlJ1xuRXZlbnRzLkNPTlRBSU5FUl9QUk9HUkVTUyA9ICdjb250YWluZXI6cHJvZ3Jlc3MnXG5FdmVudHMuQ09OVEFJTkVSX1BMQVkgPSAnY29udGFpbmVyOnBsYXknXG5FdmVudHMuQ09OVEFJTkVSX1NUT1AgPSAnY29udGFpbmVyOnN0b3AnXG5FdmVudHMuQ09OVEFJTkVSX1BBVVNFID0gJ2NvbnRhaW5lcjpwYXVzZSdcbkV2ZW50cy5DT05UQUlORVJfRU5ERUQgPSAnY29udGFpbmVyOmVuZGVkJ1xuRXZlbnRzLkNPTlRBSU5FUl9DTElDSyA9ICdjb250YWluZXI6Y2xpY2snXG5FdmVudHMuQ09OVEFJTkVSX01PVVNFX0VOVEVSID0gJ2NvbnRhaW5lcjptb3VzZWVudGVyJ1xuRXZlbnRzLkNPTlRBSU5FUl9NT1VTRV9MRUFWRSA9ICdjb250YWluZXI6bW91c2VsZWF2ZSdcbkV2ZW50cy5DT05UQUlORVJfU0VFSyA9ICdjb250YWluZXI6c2VlaydcbkV2ZW50cy5DT05UQUlORVJfVk9MVU1FID0gJ2NvbnRhaW5lcjp2b2x1bWUnXG5FdmVudHMuQ09OVEFJTkVSX0ZVTExTQ1JFRU4gPSAnY29udGFpbmVyOmZ1bGxzY3JlZW4nXG5FdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORyA9ICdjb250YWluZXI6c3RhdGU6YnVmZmVyaW5nJ1xuRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMID0gJ2NvbnRhaW5lcjpzdGF0ZTpidWZmZXJmdWxsJ1xuRXZlbnRzLkNPTlRBSU5FUl9TRVRUSU5HU1VQREFURSA9ICdjb250YWluZXI6c2V0dGluZ3N1cGRhdGUnXG5FdmVudHMuQ09OVEFJTkVSX0hJR0hERUZJTklUSU9OVVBEQVRFID0gJ2NvbnRhaW5lcjpoaWdoZGVmaW5pdGlvbnVwZGF0ZSdcbkV2ZW50cy5DT05UQUlORVJfTUVESUFDT05UUk9MX0RJU0FCTEUgPSAnY29udGFpbmVyOm1lZGlhY29udHJvbDpkaXNhYmxlJ1xuRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRU5BQkxFID0gJ2NvbnRhaW5lcjptZWRpYWNvbnRyb2w6ZW5hYmxlJ1xuRXZlbnRzLkNPTlRBSU5FUl9TVEFUU19BREQgPSAnY29udGFpbmVyOnN0YXRzOmFkZCdcblxuLy8gTWVkaWFDb250cm9sIEV2ZW50c1xuRXZlbnRzLk1FRElBQ09OVFJPTF9SRU5ERVJFRCA9ICdtZWRpYWNvbnRyb2w6cmVuZGVyZWQnXG5FdmVudHMuTUVESUFDT05UUk9MX0ZVTExTQ1JFRU4gPSAnbWVkaWFjb250cm9sOmZ1bGxzY3JlZW4nXG5FdmVudHMuTUVESUFDT05UUk9MX1NIT1cgPSAnbWVkaWFjb250cm9sOnNob3cnXG5FdmVudHMuTUVESUFDT05UUk9MX0hJREUgPSAnbWVkaWFjb250cm9sOmhpZGUnXG5FdmVudHMuTUVESUFDT05UUk9MX01PVVNFTU9WRV9TRUVLQkFSID0gJ21lZGlhY29udHJvbDptb3VzZW1vdmU6c2Vla2JhcidcbkV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VMRUFWRV9TRUVLQkFSID0gJ21lZGlhY29udHJvbDptb3VzZWxlYXZlOnNlZWtiYXInXG5FdmVudHMuTUVESUFDT05UUk9MX1BMQVlJTkcgPSAnbWVkaWFjb250cm9sOnBsYXlpbmcnXG5FdmVudHMuTUVESUFDT05UUk9MX05PVFBMQVlJTkcgPSAnbWVkaWFjb250cm9sOm5vdHBsYXlpbmcnXG5FdmVudHMuTUVESUFDT05UUk9MX0NPTlRBSU5FUkNIQU5HRUQgPSAnbWVkaWFjb250cm9sOmNvbnRhaW5lcmNoYW5nZWQnXG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRzXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmxhc2gnKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2hscycpO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaHRtbDVfYXVkaW8nKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2h0bWw1X3ZpZGVvJyk7XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9odG1sX2ltZycpO1xuXG4iLCJ2YXIgS2libyA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudCB8fCB3aW5kb3cuZG9jdW1lbnQ7XG4gIHRoaXMuaW5pdGlhbGl6ZSgpO1xufTtcblxuS2liby5LRVlfTkFNRVNfQllfQ09ERSA9IHtcbiAgODogJ2JhY2tzcGFjZScsIDk6ICd0YWInLCAxMzogJ2VudGVyJyxcbiAgMTY6ICdzaGlmdCcsIDE3OiAnY3RybCcsIDE4OiAnYWx0JyxcbiAgMjA6ICdjYXBzX2xvY2snLFxuICAyNzogJ2VzYycsXG4gIDMyOiAnc3BhY2UnLFxuICAzNzogJ2xlZnQnLCAzODogJ3VwJywgMzk6ICdyaWdodCcsIDQwOiAnZG93bicsXG4gIDQ4OiAnMCcsIDQ5OiAnMScsIDUwOiAnMicsIDUxOiAnMycsIDUyOiAnNCcsIDUzOiAnNScsIDU0OiAnNicsIDU1OiAnNycsIDU2OiAnOCcsIDU3OiAnOScsXG4gIDY1OiAnYScsIDY2OiAnYicsIDY3OiAnYycsIDY4OiAnZCcsIDY5OiAnZScsIDcwOiAnZicsIDcxOiAnZycsIDcyOiAnaCcsIDczOiAnaScsIDc0OiAnaicsIDc1OiAnaycsIDc2OiAnbCcsIDc3OiAnbScsIDc4OiAnbicsIDc5OiAnbycsIDgwOiAncCcsIDgxOiAncScsIDgyOiAncicsIDgzOiAncycsIDg0OiAndCcsIDg1OiAndScsIDg2OiAndicsIDg3OiAndycsIDg4OiAneCcsIDg5OiAneScsIDkwOiAneicsXG4gIDExMjogJ2YxJywgMTEzOiAnZjInLCAxMTQ6ICdmMycsIDExNTogJ2Y0JywgMTE2OiAnZjUnLCAxMTc6ICdmNicsIDExODogJ2Y3JywgMTE5OiAnZjgnLCAxMjA6ICdmOScsIDEyMTogJ2YxMCcsIDEyMjogJ2YxMScsIDEyMzogJ2YxMidcbn07XG5cbktpYm8uS0VZX0NPREVTX0JZX05BTUUgPSB7fTtcbihmdW5jdGlvbigpIHtcbiAgZm9yKHZhciBrZXkgaW4gS2liby5LRVlfTkFNRVNfQllfQ09ERSlcbiAgICBpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoS2liby5LRVlfTkFNRVNfQllfQ09ERSwga2V5KSlcbiAgICAgIEtpYm8uS0VZX0NPREVTX0JZX05BTUVbS2liby5LRVlfTkFNRVNfQllfQ09ERVtrZXldXSA9ICtrZXk7XG59KSgpO1xuXG5LaWJvLk1PRElGSUVSUyA9IFsnc2hpZnQnLCAnY3RybCcsICdhbHQnXTtcblxuS2liby5yZWdpc3RlckV2ZW50ID0gKGZ1bmN0aW9uKCkge1xuICBpZihkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgZnVuYykge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuYywgZmFsc2UpO1xuICAgIH07XG4gIH1cbiAgZWxzZSBpZihkb2N1bWVudC5hdHRhY2hFdmVudCkge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGZ1bmMpIHtcbiAgICAgIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50TmFtZSwgZnVuYyk7XG4gICAgfTtcbiAgfVxufSkoKTtcblxuS2liby51bnJlZ2lzdGVyRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGlmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jLCBmYWxzZSk7XG4gICAgfTtcbiAgfVxuICBlbHNlIGlmKGRvY3VtZW50LmRldGFjaEV2ZW50KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgZnVuYykge1xuICAgICAgZWxlbWVudC5kZXRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCBmdW5jKTtcbiAgICB9O1xuICB9XG59KSgpO1xuXG5LaWJvLnN0cmluZ0NvbnRhaW5zID0gZnVuY3Rpb24oc3RyaW5nLCBzdWJzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5pbmRleE9mKHN1YnN0cmluZykgIT09IC0xO1xufTtcblxuS2liby5uZWF0U3RyaW5nID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpLnJlcGxhY2UoL1xccysvZywgJyAnKTtcbn07XG5cbktpYm8uY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXi4vLCBmdW5jdGlvbihtYXRjaCkgeyByZXR1cm4gbWF0Y2gudG9VcHBlckNhc2UoKTsgfSk7XG59O1xuXG5LaWJvLmlzU3RyaW5nID0gZnVuY3Rpb24od2hhdCkge1xuICByZXR1cm4gS2liby5zdHJpbmdDb250YWlucyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2hhdCksICdTdHJpbmcnKTtcbn07XG5cbktpYm8uYXJyYXlJbmNsdWRlcyA9IChmdW5jdGlvbigpIHtcbiAgaWYoQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgICAgcmV0dXJuIGhheXN0YWNrLmluZGV4T2YobmVlZGxlKSAhPT0gLTE7XG4gICAgfTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGhheXN0YWNrLmxlbmd0aDsgaSsrKVxuICAgICAgICBpZihoYXlzdGFja1tpXSA9PT0gbmVlZGxlKVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH1cbn0pKCk7XG5cbktpYm8uZXh0cmFjdE1vZGlmaWVycyA9IGZ1bmN0aW9uKGtleUNvbWJpbmF0aW9uKSB7XG4gIHZhciBtb2RpZmllcnMsIGlcbiAgbW9kaWZpZXJzID0gW107XG4gIGZvcihpID0gMDsgaSA8IEtpYm8uTU9ESUZJRVJTLmxlbmd0aDsgaSsrKVxuICAgIGlmKEtpYm8uc3RyaW5nQ29udGFpbnMoa2V5Q29tYmluYXRpb24sIEtpYm8uTU9ESUZJRVJTW2ldKSlcbiAgICAgIG1vZGlmaWVycy5wdXNoKEtpYm8uTU9ESUZJRVJTW2ldKTtcbiAgcmV0dXJuIG1vZGlmaWVycztcbn1cblxuS2liby5leHRyYWN0S2V5ID0gZnVuY3Rpb24oa2V5Q29tYmluYXRpb24pIHtcbiAgdmFyIGtleXMsIGk7XG4gIGtleXMgPSBLaWJvLm5lYXRTdHJpbmcoa2V5Q29tYmluYXRpb24pLnNwbGl0KCcgJyk7XG4gIGZvcihpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspXG4gICAgaWYoIUtpYm8uYXJyYXlJbmNsdWRlcyhLaWJvLk1PRElGSUVSUywga2V5c1tpXSkpXG4gICAgICByZXR1cm4ga2V5c1tpXTtcbn07XG5cbktpYm8ubW9kaWZpZXJzQW5kS2V5ID0gZnVuY3Rpb24oa2V5Q29tYmluYXRpb24pIHtcbiAgdmFyIHJlc3VsdCwga2V5O1xuXG4gIGlmKEtpYm8uc3RyaW5nQ29udGFpbnMoa2V5Q29tYmluYXRpb24sICdhbnknKSkge1xuICAgIHJldHVybiBLaWJvLm5lYXRTdHJpbmcoa2V5Q29tYmluYXRpb24pLnNwbGl0KCcgJykuc2xpY2UoMCwgMikuam9pbignICcpO1xuICB9XG5cbiAgcmVzdWx0ID0gS2liby5leHRyYWN0TW9kaWZpZXJzKGtleUNvbWJpbmF0aW9uKTtcblxuICBrZXkgPSBLaWJvLmV4dHJhY3RLZXkoa2V5Q29tYmluYXRpb24pO1xuICBpZihrZXkgJiYgIUtpYm8uYXJyYXlJbmNsdWRlcyhLaWJvLk1PRElGSUVSUywga2V5KSlcbiAgICByZXN1bHQucHVzaChrZXkpO1xuXG4gIHJldHVybiByZXN1bHQuam9pbignICcpO1xufVxuXG5LaWJvLmtleU5hbWUgPSBmdW5jdGlvbihrZXlDb2RlKSB7XG4gIHJldHVybiBLaWJvLktFWV9OQU1FU19CWV9DT0RFW2tleUNvZGUgKyAnJ107XG59O1xuXG5LaWJvLmtleUNvZGUgPSBmdW5jdGlvbihrZXlOYW1lKSB7XG4gIHJldHVybiArS2liby5LRVlfQ09ERVNfQllfTkFNRVtrZXlOYW1lXTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGksIHRoYXQgPSB0aGlzO1xuXG4gIHRoaXMubGFzdEtleUNvZGUgPSAtMTtcbiAgdGhpcy5sYXN0TW9kaWZpZXJzID0ge307XG4gIGZvcihpID0gMDsgaSA8IEtpYm8uTU9ESUZJRVJTLmxlbmd0aDsgaSsrKVxuICAgIHRoaXMubGFzdE1vZGlmaWVyc1tLaWJvLk1PRElGSUVSU1tpXV0gPSBmYWxzZTtcblxuICB0aGlzLmtleXNEb3duID0geyBhbnk6IFtdIH07XG4gIHRoaXMua2V5c1VwID0geyBhbnk6IFtdIH07XG4gIHRoaXMuZG93bkhhbmRsZXIgPSB0aGlzLmhhbmRsZXIoJ2Rvd24nKTtcbiAgdGhpcy51cEhhbmRsZXIgPSB0aGlzLmhhbmRsZXIoJ3VwJyk7XG5cbiAgS2liby5yZWdpc3RlckV2ZW50KHRoaXMuZWxlbWVudCwgJ2tleWRvd24nLCB0aGlzLmRvd25IYW5kbGVyKTtcbiAgS2liby5yZWdpc3RlckV2ZW50KHRoaXMuZWxlbWVudCwgJ2tleXVwJywgdGhpcy51cEhhbmRsZXIpO1xuICBLaWJvLnJlZ2lzdGVyRXZlbnQod2luZG93LCAndW5sb2FkJywgZnVuY3Rpb24gdW5sb2FkZXIoKSB7XG4gICAgS2liby51bnJlZ2lzdGVyRXZlbnQodGhhdC5lbGVtZW50LCAna2V5ZG93bicsIHRoYXQuZG93bkhhbmRsZXIpO1xuICAgIEtpYm8udW5yZWdpc3RlckV2ZW50KHRoYXQuZWxlbWVudCwgJ2tleXVwJywgdGhhdC51cEhhbmRsZXIpO1xuICAgIEtpYm8udW5yZWdpc3RlckV2ZW50KHdpbmRvdywgJ3VubG9hZCcsIHVubG9hZGVyKTtcbiAgfSk7XG59O1xuXG5LaWJvLnByb3RvdHlwZS5oYW5kbGVyID0gZnVuY3Rpb24odXBPckRvd24pIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgIHZhciBpLCByZWdpc3RlcmVkS2V5cywgbGFzdE1vZGlmaWVyc0FuZEtleTtcblxuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcblxuICAgIHRoYXQubGFzdEtleUNvZGUgPSBlLmtleUNvZGU7XG4gICAgZm9yKGkgPSAwOyBpIDwgS2liby5NT0RJRklFUlMubGVuZ3RoOyBpKyspXG4gICAgICB0aGF0Lmxhc3RNb2RpZmllcnNbS2liby5NT0RJRklFUlNbaV1dID0gZVtLaWJvLk1PRElGSUVSU1tpXSArICdLZXknXTtcbiAgICBpZihLaWJvLmFycmF5SW5jbHVkZXMoS2liby5NT0RJRklFUlMsIEtpYm8ua2V5TmFtZSh0aGF0Lmxhc3RLZXlDb2RlKSkpXG4gICAgICB0aGF0Lmxhc3RNb2RpZmllcnNbS2liby5rZXlOYW1lKHRoYXQubGFzdEtleUNvZGUpXSA9IHRydWU7XG5cbiAgICByZWdpc3RlcmVkS2V5cyA9IHRoYXRbJ2tleXMnICsgS2liby5jYXBpdGFsaXplKHVwT3JEb3duKV07XG5cbiAgICBmb3IoaSA9IDA7IGkgPCByZWdpc3RlcmVkS2V5cy5hbnkubGVuZ3RoOyBpKyspXG4gICAgICBpZigocmVnaXN0ZXJlZEtleXMuYW55W2ldKGUpID09PSBmYWxzZSkgJiYgZS5wcmV2ZW50RGVmYXVsdClcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbGFzdE1vZGlmaWVyc0FuZEtleSA9IHRoYXQubGFzdE1vZGlmaWVyc0FuZEtleSgpO1xuICAgIGlmKHJlZ2lzdGVyZWRLZXlzW2xhc3RNb2RpZmllcnNBbmRLZXldKVxuICAgICAgZm9yKGkgPSAwOyBpIDwgcmVnaXN0ZXJlZEtleXNbbGFzdE1vZGlmaWVyc0FuZEtleV0ubGVuZ3RoOyBpKyspXG4gICAgICAgIGlmKChyZWdpc3RlcmVkS2V5c1tsYXN0TW9kaWZpZXJzQW5kS2V5XVtpXShlKSA9PT0gZmFsc2UpICYmIGUucHJldmVudERlZmF1bHQpXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xufTtcblxuS2liby5wcm90b3R5cGUucmVnaXN0ZXJLZXlzID0gZnVuY3Rpb24odXBPckRvd24sIG5ld0tleXMsIGZ1bmMpIHtcbiAgdmFyIGksIGtleXMsIHJlZ2lzdGVyZWRLZXlzID0gdGhpc1sna2V5cycgKyBLaWJvLmNhcGl0YWxpemUodXBPckRvd24pXTtcblxuICBpZihLaWJvLmlzU3RyaW5nKG5ld0tleXMpKVxuICAgIG5ld0tleXMgPSBbbmV3S2V5c107XG5cbiAgZm9yKGkgPSAwOyBpIDwgbmV3S2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleXMgPSBuZXdLZXlzW2ldO1xuICAgIGtleXMgPSBLaWJvLm1vZGlmaWVyc0FuZEtleShrZXlzICsgJycpO1xuXG4gICAgaWYocmVnaXN0ZXJlZEtleXNba2V5c10pXG4gICAgICByZWdpc3RlcmVkS2V5c1trZXlzXS5wdXNoKGZ1bmMpO1xuICAgIGVsc2VcbiAgICAgIHJlZ2lzdGVyZWRLZXlzW2tleXNdID0gW2Z1bmNdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5LaWJvLnByb3RvdHlwZS51bnJlZ2lzdGVyS2V5cyA9IGZ1bmN0aW9uKHVwT3JEb3duLCBuZXdLZXlzLCBmdW5jKSB7XG4gIHZhciBpLCBqLCBrZXlzLCByZWdpc3RlcmVkS2V5cyA9IHRoaXNbJ2tleXMnICsgS2liby5jYXBpdGFsaXplKHVwT3JEb3duKV07XG5cbiAgaWYoS2liby5pc1N0cmluZyhuZXdLZXlzKSlcbiAgICBuZXdLZXlzID0gW25ld0tleXNdO1xuXG4gIGZvcihpID0gMDsgaSA8IG5ld0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXlzID0gbmV3S2V5c1tpXTtcbiAgICBrZXlzID0gS2liby5tb2RpZmllcnNBbmRLZXkoa2V5cyArICcnKTtcblxuICAgIGlmKGZ1bmMgPT09IG51bGwpXG4gICAgICBkZWxldGUgcmVnaXN0ZXJlZEtleXNba2V5c107XG4gICAgZWxzZSB7XG4gICAgICBpZihyZWdpc3RlcmVkS2V5c1trZXlzXSkge1xuICAgICAgICBmb3IoaiA9IDA7IGogPCByZWdpc3RlcmVkS2V5c1trZXlzXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmKFN0cmluZyhyZWdpc3RlcmVkS2V5c1trZXlzXVtqXSkgPT09IFN0cmluZyhmdW5jKSkge1xuICAgICAgICAgICAgcmVnaXN0ZXJlZEtleXNba2V5c10uc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5LaWJvLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihrZXlzKSB7XG4gIHJldHVybiB0aGlzLnVucmVnaXN0ZXJLZXlzKCdkb3duJywga2V5cywgbnVsbCk7XG59XG5cbktpYm8ucHJvdG90eXBlLmRlbGVnYXRlID0gZnVuY3Rpb24odXBPckRvd24sIGtleXMsIGZ1bmMpIHtcbiAgcmV0dXJuIChmdW5jICE9PSBudWxsIHx8IGZ1bmMgIT09IHVuZGVmaW5lZCkgPyB0aGlzLnJlZ2lzdGVyS2V5cyh1cE9yRG93biwga2V5cywgZnVuYykgOiB0aGlzLnVucmVnaXN0ZXJLZXlzKHVwT3JEb3duLCBrZXlzLCBmdW5jKTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmRvd24gPSBmdW5jdGlvbihrZXlzLCBmdW5jKSB7XG4gIHJldHVybiB0aGlzLmRlbGVnYXRlKCdkb3duJywga2V5cywgZnVuYyk7XG59O1xuXG5LaWJvLnByb3RvdHlwZS51cCA9IGZ1bmN0aW9uKGtleXMsIGZ1bmMpIHtcbiAgcmV0dXJuIHRoaXMuZGVsZWdhdGUoJ3VwJywga2V5cywgZnVuYyk7XG59O1xuXG5LaWJvLnByb3RvdHlwZS5sYXN0S2V5ID0gZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgaWYoIW1vZGlmaWVyKVxuICAgIHJldHVybiBLaWJvLmtleU5hbWUodGhpcy5sYXN0S2V5Q29kZSk7XG5cbiAgcmV0dXJuIHRoaXMubGFzdE1vZGlmaWVyc1ttb2RpZmllcl07XG59O1xuXG5LaWJvLnByb3RvdHlwZS5sYXN0TW9kaWZpZXJzQW5kS2V5ID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXN1bHQsIGk7XG5cbiAgcmVzdWx0ID0gW107XG4gIGZvcihpID0gMDsgaSA8IEtpYm8uTU9ESUZJRVJTLmxlbmd0aDsgaSsrKVxuICAgIGlmKHRoaXMubGFzdEtleShLaWJvLk1PRElGSUVSU1tpXSkpXG4gICAgICByZXN1bHQucHVzaChLaWJvLk1PRElGSUVSU1tpXSk7XG5cbiAgaWYoIUtpYm8uYXJyYXlJbmNsdWRlcyhyZXN1bHQsIHRoaXMubGFzdEtleSgpKSlcbiAgICByZXN1bHQucHVzaCh0aGlzLmxhc3RLZXkoKSk7XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtpYm87XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbWVkaWFfY29udHJvbCcpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIFRoZSBtZWRpYXRvciBpcyBhIHNpbmdsZXRvbiBmb3IgaGFuZGxpbmcgZ2xvYmFsIGV2ZW50cy5cbiAqL1xuXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcblxudmFyIGV2ZW50cyA9IG5ldyBFdmVudHMoKVxuXG5jbGFzcyBNZWRpYXRvciB7XG59XG5cbk1lZGlhdG9yLm9uID0gZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgZXZlbnRzLm9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KVxuICByZXR1cm5cbn1cblxuTWVkaWF0b3Iub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIGV2ZW50cy5vbmNlKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KVxuICByZXR1cm5cbn1cblxuTWVkaWF0b3Iub2ZmID0gZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgZXZlbnRzLm9mZihuYW1lLCBjYWxsYmFjaywgY29udGV4dClcbiAgcmV0dXJuXG59XG5cbk1lZGlhdG9yLnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lLCBvcHRzKSB7XG4gIGV2ZW50cy50cmlnZ2VyKG5hbWUsIG9wdHMpXG4gIHJldHVyblxufVxuXG5NZWRpYXRvci5zdG9wTGlzdGVuaW5nID0gZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICBldmVudHMuc3RvcExpc3RlbmluZyhvYmosIG5hbWUsIGNhbGxiYWNrKVxuICByZXR1cm5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNZWRpYXRvclxuIiwidmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgndWlfb2JqZWN0JylcblxuY2xhc3MgUGxheWJhY2sgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc2V0dGluZ3MgPSB7fVxuICB9XG5cbiAgcGxheSgpIHt9XG5cbiAgcGF1c2UoKSB7fVxuXG4gIHN0b3AoKSB7fVxuXG4gIHNlZWsodGltZSkge31cblxuICBnZXREdXJhdGlvbigpIHsgcmV0dXJuIDAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gJ25vX29wJ1xuICB9XG5cbiAgaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxufVxuXG5QbGF5YmFjay5jYW5QbGF5ID0gKHNvdXJjZSkgPT4ge1xuICByZXR1cm4gZmFsc2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5YmFja1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXllckluZm8gPXtcbiAgb3B0aW9uczoge30sXG4gIHBsYXliYWNrUGx1Z2luczogW10sXG4gIGN1cnJlbnRTaXplOiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllckluZm9cblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3Bvc3RlcicpO1xuXG4iLCIvLyBTaW1wbGUgSmF2YVNjcmlwdCBUZW1wbGF0aW5nXG4vLyBQYXVsIE1pbGxlciAoaHR0cDovL3BhdWxtaWxsci5jb20pXG4vLyBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuLy8gKGMpIDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuKGZ1bmN0aW9uKGdsb2JhbHMpIHtcbiAgLy8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXG4gIC8vIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAgdmFyIHNldHRpbmdzID0ge1xuICAgIGV2YWx1YXRlICAgIDogLzwlKFtcXHNcXFNdKz8pJT4vZyxcbiAgICBpbnRlcnBvbGF0ZSA6IC88JT0oW1xcc1xcU10rPyklPi9nLFxuICAgIGVzY2FwZSAgICAgIDogLzwlLShbXFxzXFxTXSs/KSU+L2dcbiAgfTtcblxuICAvLyBXaGVuIGN1c3RvbWl6aW5nIGB0ZW1wbGF0ZVNldHRpbmdzYCwgaWYgeW91IGRvbid0IHdhbnQgdG8gZGVmaW5lIGFuXG4gIC8vIGludGVycG9sYXRpb24sIGV2YWx1YXRpb24gb3IgZXNjYXBpbmcgcmVnZXgsIHdlIG5lZWQgb25lIHRoYXQgaXNcbiAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXG4gIHZhciBub01hdGNoID0gLyguKV4vO1xuXG4gIC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4gIC8vIHN0cmluZyBsaXRlcmFsLlxuICB2YXIgZXNjYXBlcyA9IHtcbiAgICBcIidcIjogICAgICBcIidcIixcbiAgICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICAgJ1xccic6ICAgICAncicsXG4gICAgJ1xcbic6ICAgICAnbicsXG4gICAgJ1xcdCc6ICAgICAndCcsXG4gICAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ3UyMDI5J1xuICB9O1xuXG4gIHZhciBlc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdHxcXHUyMDI4fFxcdTIwMjkvZztcblxuICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxuICB2YXIgaHRtbEVudGl0aWVzID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjeDI3OydcbiAgfTtcblxuICB2YXIgZW50aXR5UmUgPSBuZXcgUmVnRXhwKCdbJjw+XCJcXCddJywgJ2cnKTtcblxuICB2YXIgZXNjYXBlRXhwciA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIGlmIChzdHJpbmcgPT0gbnVsbCkgcmV0dXJuICcnO1xuICAgIHJldHVybiAoJycgKyBzdHJpbmcpLnJlcGxhY2UoZW50aXR5UmUsIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICByZXR1cm4gaHRtbEVudGl0aWVzW21hdGNoXTtcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgY291bnRlciA9IDA7XG5cbiAgLy8gSmF2YVNjcmlwdCBtaWNyby10ZW1wbGF0aW5nLCBzaW1pbGFyIHRvIEpvaG4gUmVzaWcncyBpbXBsZW1lbnRhdGlvbi5cbiAgLy8gVW5kZXJzY29yZSB0ZW1wbGF0aW5nIGhhbmRsZXMgYXJiaXRyYXJ5IGRlbGltaXRlcnMsIHByZXNlcnZlcyB3aGl0ZXNwYWNlLFxuICAvLyBhbmQgY29ycmVjdGx5IGVzY2FwZXMgcXVvdGVzIHdpdGhpbiBpbnRlcnBvbGF0ZWQgY29kZS5cbiAgdmFyIHRtcGwgPSBmdW5jdGlvbih0ZXh0LCBkYXRhKSB7XG4gICAgdmFyIHJlbmRlcjtcblxuICAgIC8vIENvbWJpbmUgZGVsaW1pdGVycyBpbnRvIG9uZSByZWd1bGFyIGV4cHJlc3Npb24gdmlhIGFsdGVybmF0aW9uLlxuICAgIHZhciBtYXRjaGVyID0gbmV3IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldClcbiAgICAgICAgLnJlcGxhY2UoZXNjYXBlciwgZnVuY3Rpb24obWF0Y2gpIHsgcmV0dXJuICdcXFxcJyArIGVzY2FwZXNbbWF0Y2hdOyB9KTtcblxuICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGVzY2FwZSArIFwiKSk9PW51bGw/Jyc6ZXNjYXBlRXhwcihfX3QpKStcXG4nXCI7XG4gICAgICB9XG4gICAgICBpZiAoaW50ZXJwb2xhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBpbnRlcnBvbGF0ZSArIFwiKSk9PW51bGw/Jyc6X190KStcXG4nXCI7XG4gICAgICB9XG4gICAgICBpZiAoZXZhbHVhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJztcXG5cIiArIGV2YWx1YXRlICsgXCJcXG5fX3ArPSdcIjtcbiAgICAgIH1cbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuICAgIHNvdXJjZSArPSBcIic7XFxuXCI7XG5cbiAgICAvLyBJZiBhIHZhcmlhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIHBsYWNlIGRhdGEgdmFsdWVzIGluIGxvY2FsIHNjb3BlLlxuICAgIGlmICghc2V0dGluZ3MudmFyaWFibGUpIHNvdXJjZSA9ICd3aXRoKG9ianx8e30pe1xcbicgKyBzb3VyY2UgKyAnfVxcbic7XG5cbiAgICBzb3VyY2UgPSBcInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIiArXG4gICAgICBcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIgK1xuICAgICAgc291cmNlICsgXCJyZXR1cm4gX19wO1xcbi8vIyBzb3VyY2VVUkw9L21pY3JvdGVtcGxhdGVzL3NvdXJjZVtcIiArIGNvdW50ZXIrKyArIFwiXVwiO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlbmRlciA9IG5ldyBGdW5jdGlvbihzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJywgJ2VzY2FwZUV4cHInLCBzb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUuc291cmNlID0gc291cmNlO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSkgcmV0dXJuIHJlbmRlcihkYXRhLCBlc2NhcGVFeHByKTtcbiAgICB2YXIgdGVtcGxhdGUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVuZGVyLmNhbGwodGhpcywgZGF0YSwgZXNjYXBlRXhwcik7XG4gICAgfTtcblxuICAgIC8vIFByb3ZpZGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uIHNvdXJjZSBhcyBhIGNvbnZlbmllbmNlIGZvciBwcmVjb21waWxhdGlvbi5cbiAgICB0ZW1wbGF0ZS5zb3VyY2UgPSAnZnVuY3Rpb24oJyArIChzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJykgKyAnKXtcXG4nICsgc291cmNlICsgJ30nO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9O1xuICB0bXBsLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0bXBsO1xuICAgIH0pOyAvLyBSZXF1aXJlSlNcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gdG1wbDsgLy8gQ29tbW9uSlNcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWxzLm1pY3JvdGVtcGxhdGUgPSB0bXBsOyAvLyA8c2NyaXB0PlxuICB9XG59KSh0aGlzKTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBVSU9iamVjdCA9IHJlcXVpcmUoJ3VpX29iamVjdCcpXG5cbmNsYXNzIFVJQ29udGFpbmVyUGx1Z2luIGV4dGVuZHMgVUlPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgICAgIHRoaXMuJGVsLnNob3coKVxuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZSgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVSUNvbnRhaW5lclBsdWdpblxuIiwidmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgndWlfb2JqZWN0JylcblxuY2xhc3MgVUlDb3JlUGx1Z2luIGV4dGVuZHMgVUlPYmplY3Qge1xuICBjb25zdHJ1Y3Rvcihjb3JlKSB7XG4gICAgc3VwZXIoY29yZSlcbiAgICB0aGlzLmNvcmUgPSBjb3JlXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIHRoaXMuYmluZEV2ZW50cygpXG4gICAgdGhpcy5yZW5kZXIoKVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHt9XG5cbiAgZ2V0RXh0ZXJuYWxJbnRlcmZhY2UoKSB7IHJldHVybiB7fSB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmJpbmRFdmVudHMoKVxuICAgICAgdGhpcy4kZWwuc2hvdygpXG4gICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHRoaXMuJGVsLmhpZGUoKVxuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQodGhpcy5zdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKSlcbiAgICB0aGlzLmNvcmUuJGVsLmFwcGVuZCh0aGlzLmVsKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVSUNvcmVQbHVnaW5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciAkID0gcmVxdWlyZSgnemVwdG8nKVxudmFyIHVuaXF1ZUlkID0gcmVxdWlyZSgnLi91dGlscycpLnVuaXF1ZUlkXG52YXIgcmVzdWx0ID0gcmVxdWlyZSgnbG9kYXNoLnJlc3VsdCcpXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0JylcblxudmFyIGRlbGVnYXRlRXZlbnRTcGxpdHRlciA9IC9eKFxcUyspXFxzKiguKikkL1xuXG5jbGFzcyBVSU9iamVjdCBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ2RpdicgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuY2lkID0gdW5pcXVlSWQoJ2MnKTtcbiAgICB0aGlzLl9lbnN1cmVFbGVtZW50KCk7XG4gICAgdGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuICB9XG5cbiAgJChzZWxlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLiRlbC5maW5kKHNlbGVjdG9yKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXRFbGVtZW50KGVsZW1lbnQsIGRlbGVnYXRlKSB7XG4gICAgaWYgKHRoaXMuJGVsKSB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKVxuICAgIHRoaXMuJGVsID0gZWxlbWVudCBpbnN0YW5jZW9mICQgPyBlbGVtZW50IDogJChlbGVtZW50KVxuICAgIHRoaXMuZWwgPSB0aGlzLiRlbFswXVxuICAgIGlmIChkZWxlZ2F0ZSAhPT0gZmFsc2UpIHRoaXMuZGVsZWdhdGVFdmVudHMoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBkZWxlZ2F0ZUV2ZW50cyhldmVudHMpIHtcbiAgICBpZiAoIShldmVudHMgfHwgKGV2ZW50cyA9IHJlc3VsdCh0aGlzLCAnZXZlbnRzJykpKSkgcmV0dXJuIHRoaXNcbiAgICB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKVxuICAgIGZvciAodmFyIGtleSBpbiBldmVudHMpIHtcbiAgICAgIHZhciBtZXRob2QgPSBldmVudHNba2V5XVxuICAgICAgaWYgKChtZXRob2QgJiYgbWV0aG9kLmNvbnN0cnVjdG9yICE9PSBGdW5jdGlvbikpIG1ldGhvZCA9IHRoaXNbZXZlbnRzW2tleV1dXG4gICAgICBpZiAoIW1ldGhvZCkgY29udGludWVcblxuICAgICAgdmFyIG1hdGNoID0ga2V5Lm1hdGNoKGRlbGVnYXRlRXZlbnRTcGxpdHRlcilcbiAgICAgIHZhciBldmVudE5hbWUgPSBtYXRjaFsxXSwgc2VsZWN0b3IgPSBtYXRjaFsyXVxuICAgICAgLy9tZXRob2QgPSBfLmJpbmQobWV0aG9kLCB0aGlzKVxuICAgICAgZXZlbnROYW1lICs9ICcuZGVsZWdhdGVFdmVudHMnICsgdGhpcy5jaWRcbiAgICAgIGlmIChzZWxlY3RvciA9PT0gJycpIHtcbiAgICAgICAgdGhpcy4kZWwub24oZXZlbnROYW1lLCBtZXRob2QuYmluZCh0aGlzKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsLm9uKGV2ZW50TmFtZSwgc2VsZWN0b3IsIG1ldGhvZC5iaW5kKHRoaXMpKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdW5kZWxlZ2F0ZUV2ZW50cygpIHtcbiAgICB0aGlzLiRlbC5vZmYoJy5kZWxlZ2F0ZUV2ZW50cycgKyB0aGlzLmNpZClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgX2Vuc3VyZUVsZW1lbnQoKSB7XG4gICAgaWYgKCF0aGlzLmVsKSB7XG4gICAgICB2YXIgYXR0cnMgPSBhc3NpZ24oe30sIHJlc3VsdCh0aGlzLCAnYXR0cmlidXRlcycpKVxuICAgICAgaWYgKHRoaXMuaWQpIGF0dHJzLmlkID0gcmVzdWx0KHRoaXMsICdpZCcpXG4gICAgICBpZiAodGhpcy5jbGFzc05hbWUpIGF0dHJzWydjbGFzcyddID0gcmVzdWx0KHRoaXMsICdjbGFzc05hbWUnKVxuICAgICAgdmFyICRlbCA9ICQoJzwnICsgcmVzdWx0KHRoaXMsICd0YWdOYW1lJykgKyAnPicpLmF0dHIoYXR0cnMpXG4gICAgICB0aGlzLnNldEVsZW1lbnQoJGVsLCBmYWxzZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRFbGVtZW50KHJlc3VsdCh0aGlzLCAnZWwnKSwgZmFsc2UpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVUlPYmplY3RcbiIsIi8qIFplcHRvIHYxLjEuNC04MC1nYTkxODRiMiAtIHplcHRvIGV2ZW50IGFqYXggY2FsbGJhY2tzIGRlZmVycmVkIHRvdWNoIHNlbGVjdG9yIGllIC0gemVwdG9qcy5jb20vbGljZW5zZSAqL1xudmFyIFplcHRvPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gRCh0KXtyZXR1cm4gbnVsbD09dD9TdHJpbmcodCk6altTLmNhbGwodCldfHxcIm9iamVjdFwifWZ1bmN0aW9uIEwodCl7cmV0dXJuXCJmdW5jdGlvblwiPT1EKHQpfWZ1bmN0aW9uIGsodCl7cmV0dXJuIG51bGwhPXQmJnQ9PXQud2luZG93fWZ1bmN0aW9uIFoodCl7cmV0dXJuIG51bGwhPXQmJnQubm9kZVR5cGU9PXQuRE9DVU1FTlRfTk9ERX1mdW5jdGlvbiAkKHQpe3JldHVyblwib2JqZWN0XCI9PUQodCl9ZnVuY3Rpb24gRih0KXtyZXR1cm4gJCh0KSYmIWsodCkmJk9iamVjdC5nZXRQcm90b3R5cGVPZih0KT09T2JqZWN0LnByb3RvdHlwZX1mdW5jdGlvbiBSKHQpe3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiB0Lmxlbmd0aH1mdW5jdGlvbiBxKHQpe3JldHVybiBzLmNhbGwodCxmdW5jdGlvbih0KXtyZXR1cm4gbnVsbCE9dH0pfWZ1bmN0aW9uIFcodCl7cmV0dXJuIHQubGVuZ3RoPjA/bi5mbi5jb25jYXQuYXBwbHkoW10sdCk6dH1mdW5jdGlvbiB6KHQpe3JldHVybiB0LnJlcGxhY2UoLzo6L2csXCIvXCIpLnJlcGxhY2UoLyhbQS1aXSspKFtBLVpdW2Etel0pL2csXCIkMV8kMlwiKS5yZXBsYWNlKC8oW2EtelxcZF0pKFtBLVpdKS9nLFwiJDFfJDJcIikucmVwbGFjZSgvXy9nLFwiLVwiKS50b0xvd2VyQ2FzZSgpfWZ1bmN0aW9uIEgodCl7cmV0dXJuIHQgaW4gYz9jW3RdOmNbdF09bmV3IFJlZ0V4cChcIihefFxcXFxzKVwiK3QrXCIoXFxcXHN8JClcIil9ZnVuY3Rpb24gXyh0LGUpe3JldHVyblwibnVtYmVyXCIhPXR5cGVvZiBlfHxsW3oodCldP2U6ZStcInB4XCJ9ZnVuY3Rpb24gSSh0KXt2YXIgZSxuO3JldHVybiBmW3RdfHwoZT11LmNyZWF0ZUVsZW1lbnQodCksdS5ib2R5LmFwcGVuZENoaWxkKGUpLG49Z2V0Q29tcHV0ZWRTdHlsZShlLFwiXCIpLmdldFByb3BlcnR5VmFsdWUoXCJkaXNwbGF5XCIpLGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlKSxcIm5vbmVcIj09biYmKG49XCJibG9ja1wiKSxmW3RdPW4pLGZbdF19ZnVuY3Rpb24gVSh0KXtyZXR1cm5cImNoaWxkcmVuXCJpbiB0P2EuY2FsbCh0LmNoaWxkcmVuKTpuLm1hcCh0LmNoaWxkTm9kZXMsZnVuY3Rpb24odCl7cmV0dXJuIDE9PXQubm9kZVR5cGU/dDp2b2lkIDB9KX1mdW5jdGlvbiBYKHQsZSl7dmFyIG4saT10P3QubGVuZ3RoOjA7Zm9yKG49MDtpPm47bisrKXRoaXNbbl09dFtuXTt0aGlzLmxlbmd0aD1pLHRoaXMuc2VsZWN0b3I9ZXx8XCJcIn1mdW5jdGlvbiBCKG4saSxyKXtmb3IoZSBpbiBpKXImJihGKGlbZV0pfHxBKGlbZV0pKT8oRihpW2VdKSYmIUYobltlXSkmJihuW2VdPXt9KSxBKGlbZV0pJiYhQShuW2VdKSYmKG5bZV09W10pLEIobltlXSxpW2VdLHIpKTppW2VdIT09dCYmKG5bZV09aVtlXSl9ZnVuY3Rpb24gVih0LGUpe3JldHVybiBudWxsPT1lP24odCk6bih0KS5maWx0ZXIoZSl9ZnVuY3Rpb24gWSh0LGUsbixpKXtyZXR1cm4gTChlKT9lLmNhbGwodCxuLGkpOmV9ZnVuY3Rpb24gSih0LGUsbil7bnVsbD09bj90LnJlbW92ZUF0dHJpYnV0ZShlKTp0LnNldEF0dHJpYnV0ZShlLG4pfWZ1bmN0aW9uIEcoZSxuKXt2YXIgaT1lLmNsYXNzTmFtZXx8XCJcIixyPWkmJmkuYmFzZVZhbCE9PXQ7cmV0dXJuIG49PT10P3I/aS5iYXNlVmFsOmk6dm9pZChyP2kuYmFzZVZhbD1uOmUuY2xhc3NOYW1lPW4pfWZ1bmN0aW9uIEsodCl7dHJ5e3JldHVybiB0P1widHJ1ZVwiPT10fHwoXCJmYWxzZVwiPT10PyExOlwibnVsbFwiPT10P251bGw6K3QrXCJcIj09dD8rdDovXltcXFtcXHtdLy50ZXN0KHQpP24ucGFyc2VKU09OKHQpOnQpOnR9Y2F0Y2goZSl7cmV0dXJuIHR9fWZ1bmN0aW9uIFEodCxlKXtlKHQpO2Zvcih2YXIgbj0wLGk9dC5jaGlsZE5vZGVzLmxlbmd0aDtpPm47bisrKVEodC5jaGlsZE5vZGVzW25dLGUpfXZhciB0LGUsbixpLE4sUCxyPVtdLG89ci5jb25jYXQscz1yLmZpbHRlcixhPXIuc2xpY2UsdT13aW5kb3cuZG9jdW1lbnQsZj17fSxjPXt9LGw9e1wiY29sdW1uLWNvdW50XCI6MSxjb2x1bW5zOjEsXCJmb250LXdlaWdodFwiOjEsXCJsaW5lLWhlaWdodFwiOjEsb3BhY2l0eToxLFwiei1pbmRleFwiOjEsem9vbToxfSxoPS9eXFxzKjwoXFx3K3whKVtePl0qPi8scD0vXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8sZD0vPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbXFx3Ol0rKVtePl0qKVxcLz4vZ2ksbT0vXig/OmJvZHl8aHRtbCkkL2ksZz0vKFtBLVpdKS9nLHY9W1widmFsXCIsXCJjc3NcIixcImh0bWxcIixcInRleHRcIixcImRhdGFcIixcIndpZHRoXCIsXCJoZWlnaHRcIixcIm9mZnNldFwiXSx5PVtcImFmdGVyXCIsXCJwcmVwZW5kXCIsXCJiZWZvcmVcIixcImFwcGVuZFwiXSx3PXUuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpLHg9dS5jcmVhdGVFbGVtZW50KFwidHJcIiksYj17dHI6dS5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiksdGJvZHk6dyx0aGVhZDp3LHRmb290OncsdGQ6eCx0aDp4LFwiKlwiOnUuY3JlYXRlRWxlbWVudChcImRpdlwiKX0sRT0vY29tcGxldGV8bG9hZGVkfGludGVyYWN0aXZlLyxUPS9eW1xcdy1dKiQvLGo9e30sUz1qLnRvU3RyaW5nLEM9e30sTz11LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksTT17dGFiaW5kZXg6XCJ0YWJJbmRleFwiLHJlYWRvbmx5OlwicmVhZE9ubHlcIixcImZvclwiOlwiaHRtbEZvclwiLFwiY2xhc3NcIjpcImNsYXNzTmFtZVwiLG1heGxlbmd0aDpcIm1heExlbmd0aFwiLGNlbGxzcGFjaW5nOlwiY2VsbFNwYWNpbmdcIixjZWxscGFkZGluZzpcImNlbGxQYWRkaW5nXCIscm93c3BhbjpcInJvd1NwYW5cIixjb2xzcGFuOlwiY29sU3BhblwiLHVzZW1hcDpcInVzZU1hcFwiLGZyYW1lYm9yZGVyOlwiZnJhbWVCb3JkZXJcIixjb250ZW50ZWRpdGFibGU6XCJjb250ZW50RWRpdGFibGVcIn0sQT1BcnJheS5pc0FycmF5fHxmdW5jdGlvbih0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIEFycmF5fTtyZXR1cm4gQy5tYXRjaGVzPWZ1bmN0aW9uKHQsZSl7aWYoIWV8fCF0fHwxIT09dC5ub2RlVHlwZSlyZXR1cm4hMTt2YXIgbj10LndlYmtpdE1hdGNoZXNTZWxlY3Rvcnx8dC5tb3pNYXRjaGVzU2VsZWN0b3J8fHQub01hdGNoZXNTZWxlY3Rvcnx8dC5tYXRjaGVzU2VsZWN0b3I7aWYobilyZXR1cm4gbi5jYWxsKHQsZSk7dmFyIGkscj10LnBhcmVudE5vZGUsbz0hcjtyZXR1cm4gbyYmKHI9TykuYXBwZW5kQ2hpbGQodCksaT1+Qy5xc2EocixlKS5pbmRleE9mKHQpLG8mJk8ucmVtb3ZlQ2hpbGQodCksaX0sTj1mdW5jdGlvbih0KXtyZXR1cm4gdC5yZXBsYWNlKC8tKyguKT8vZyxmdW5jdGlvbih0LGUpe3JldHVybiBlP2UudG9VcHBlckNhc2UoKTpcIlwifSl9LFA9ZnVuY3Rpb24odCl7cmV0dXJuIHMuY2FsbCh0LGZ1bmN0aW9uKGUsbil7cmV0dXJuIHQuaW5kZXhPZihlKT09bn0pfSxDLmZyYWdtZW50PWZ1bmN0aW9uKGUsaSxyKXt2YXIgbyxzLGY7cmV0dXJuIHAudGVzdChlKSYmKG89bih1LmNyZWF0ZUVsZW1lbnQoUmVnRXhwLiQxKSkpLG98fChlLnJlcGxhY2UmJihlPWUucmVwbGFjZShkLFwiPCQxPjwvJDI+XCIpKSxpPT09dCYmKGk9aC50ZXN0KGUpJiZSZWdFeHAuJDEpLGkgaW4gYnx8KGk9XCIqXCIpLGY9YltpXSxmLmlubmVySFRNTD1cIlwiK2Usbz1uLmVhY2goYS5jYWxsKGYuY2hpbGROb2RlcyksZnVuY3Rpb24oKXtmLnJlbW92ZUNoaWxkKHRoaXMpfSkpLEYocikmJihzPW4obyksbi5lYWNoKHIsZnVuY3Rpb24odCxlKXt2LmluZGV4T2YodCk+LTE/c1t0XShlKTpzLmF0dHIodCxlKX0pKSxvfSxDLlo9ZnVuY3Rpb24odCxlKXtyZXR1cm4gbmV3IFgodCxlKX0sQy5pc1o9ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBDLlp9LEMuaW5pdD1mdW5jdGlvbihlLGkpe3ZhciByO2lmKCFlKXJldHVybiBDLlooKTtpZihcInN0cmluZ1wiPT10eXBlb2YgZSlpZihlPWUudHJpbSgpLFwiPFwiPT1lWzBdJiZoLnRlc3QoZSkpcj1DLmZyYWdtZW50KGUsUmVnRXhwLiQxLGkpLGU9bnVsbDtlbHNle2lmKGkhPT10KXJldHVybiBuKGkpLmZpbmQoZSk7cj1DLnFzYSh1LGUpfWVsc2V7aWYoTChlKSlyZXR1cm4gbih1KS5yZWFkeShlKTtpZihDLmlzWihlKSlyZXR1cm4gZTtpZihBKGUpKXI9cShlKTtlbHNlIGlmKCQoZSkpcj1bZV0sZT1udWxsO2Vsc2UgaWYoaC50ZXN0KGUpKXI9Qy5mcmFnbWVudChlLnRyaW0oKSxSZWdFeHAuJDEsaSksZT1udWxsO2Vsc2V7aWYoaSE9PXQpcmV0dXJuIG4oaSkuZmluZChlKTtyPUMucXNhKHUsZSl9fXJldHVybiBDLloocixlKX0sbj1mdW5jdGlvbih0LGUpe3JldHVybiBDLmluaXQodCxlKX0sbi5leHRlbmQ9ZnVuY3Rpb24odCl7dmFyIGUsbj1hLmNhbGwoYXJndW1lbnRzLDEpO3JldHVyblwiYm9vbGVhblwiPT10eXBlb2YgdCYmKGU9dCx0PW4uc2hpZnQoKSksbi5mb3JFYWNoKGZ1bmN0aW9uKG4pe0IodCxuLGUpfSksdH0sQy5xc2E9ZnVuY3Rpb24odCxlKXt2YXIgbixpPVwiI1wiPT1lWzBdLHI9IWkmJlwiLlwiPT1lWzBdLG89aXx8cj9lLnNsaWNlKDEpOmUscz1ULnRlc3Qobyk7cmV0dXJuIHQuZ2V0RWxlbWVudEJ5SWQmJnMmJmk/KG49dC5nZXRFbGVtZW50QnlJZChvKSk/W25dOltdOjEhPT10Lm5vZGVUeXBlJiY5IT09dC5ub2RlVHlwZSYmMTEhPT10Lm5vZGVUeXBlP1tdOmEuY2FsbChzJiYhaSYmdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lP3I/dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG8pOnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSk6dC5xdWVyeVNlbGVjdG9yQWxsKGUpKX0sbi5jb250YWlucz11LmRvY3VtZW50RWxlbWVudC5jb250YWlucz9mdW5jdGlvbih0LGUpe3JldHVybiB0IT09ZSYmdC5jb250YWlucyhlKX06ZnVuY3Rpb24odCxlKXtmb3IoO2UmJihlPWUucGFyZW50Tm9kZSk7KWlmKGU9PT10KXJldHVybiEwO3JldHVybiExfSxuLnR5cGU9RCxuLmlzRnVuY3Rpb249TCxuLmlzV2luZG93PWssbi5pc0FycmF5PUEsbi5pc1BsYWluT2JqZWN0PUYsbi5pc0VtcHR5T2JqZWN0PWZ1bmN0aW9uKHQpe3ZhciBlO2ZvcihlIGluIHQpcmV0dXJuITE7cmV0dXJuITB9LG4uaW5BcnJheT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHIuaW5kZXhPZi5jYWxsKGUsdCxuKX0sbi5jYW1lbENhc2U9TixuLnRyaW09ZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXQ/XCJcIjpTdHJpbmcucHJvdG90eXBlLnRyaW0uY2FsbCh0KX0sbi51dWlkPTAsbi5zdXBwb3J0PXt9LG4uZXhwcj17fSxuLm5vb3A9ZnVuY3Rpb24oKXt9LG4ubWFwPWZ1bmN0aW9uKHQsZSl7dmFyIG4scixvLGk9W107aWYoUih0KSlmb3Iocj0wO3I8dC5sZW5ndGg7cisrKW49ZSh0W3JdLHIpLG51bGwhPW4mJmkucHVzaChuKTtlbHNlIGZvcihvIGluIHQpbj1lKHRbb10sbyksbnVsbCE9biYmaS5wdXNoKG4pO3JldHVybiBXKGkpfSxuLmVhY2g9ZnVuY3Rpb24odCxlKXt2YXIgbixpO2lmKFIodCkpe2ZvcihuPTA7bjx0Lmxlbmd0aDtuKyspaWYoZS5jYWxsKHRbbl0sbix0W25dKT09PSExKXJldHVybiB0fWVsc2UgZm9yKGkgaW4gdClpZihlLmNhbGwodFtpXSxpLHRbaV0pPT09ITEpcmV0dXJuIHQ7cmV0dXJuIHR9LG4uZ3JlcD1mdW5jdGlvbih0LGUpe3JldHVybiBzLmNhbGwodCxlKX0sd2luZG93LkpTT04mJihuLnBhcnNlSlNPTj1KU09OLnBhcnNlKSxuLmVhY2goXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yXCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKHQsZSl7altcIltvYmplY3QgXCIrZStcIl1cIl09ZS50b0xvd2VyQ2FzZSgpfSksbi5mbj17Y29uc3RydWN0b3I6Qy5aLGxlbmd0aDowLGZvckVhY2g6ci5mb3JFYWNoLHJlZHVjZTpyLnJlZHVjZSxwdXNoOnIucHVzaCxzb3J0OnIuc29ydCxzcGxpY2U6ci5zcGxpY2UsaW5kZXhPZjpyLmluZGV4T2YsY29uY2F0OmZ1bmN0aW9uKCl7dmFyIHQsZSxuPVtdO2Zvcih0PTA7dDxhcmd1bWVudHMubGVuZ3RoO3QrKyllPWFyZ3VtZW50c1t0XSxuW3RdPUMuaXNaKGUpP2UudG9BcnJheSgpOmU7cmV0dXJuIG8uYXBwbHkoQy5pc1oodGhpcyk/dGhpcy50b0FycmF5KCk6dGhpcyxuKX0sbWFwOmZ1bmN0aW9uKHQpe3JldHVybiBuKG4ubWFwKHRoaXMsZnVuY3Rpb24oZSxuKXtyZXR1cm4gdC5jYWxsKGUsbixlKX0pKX0sc2xpY2U6ZnVuY3Rpb24oKXtyZXR1cm4gbihhLmFwcGx5KHRoaXMsYXJndW1lbnRzKSl9LHJlYWR5OmZ1bmN0aW9uKHQpe3JldHVybiBFLnRlc3QodS5yZWFkeVN0YXRlKSYmdS5ib2R5P3Qobik6dS5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKCl7dChuKX0sITEpLHRoaXN9LGdldDpmdW5jdGlvbihlKXtyZXR1cm4gZT09PXQ/YS5jYWxsKHRoaXMpOnRoaXNbZT49MD9lOmUrdGhpcy5sZW5ndGhdfSx0b0FycmF5OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KCl9LHNpemU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sZW5ndGh9LHJlbW92ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtudWxsIT10aGlzLnBhcmVudE5vZGUmJnRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKX0pfSxlYWNoOmZ1bmN0aW9uKHQpe3JldHVybiByLmV2ZXJ5LmNhbGwodGhpcyxmdW5jdGlvbihlLG4pe3JldHVybiB0LmNhbGwoZSxuLGUpIT09ITF9KSx0aGlzfSxmaWx0ZXI6ZnVuY3Rpb24odCl7cmV0dXJuIEwodCk/dGhpcy5ub3QodGhpcy5ub3QodCkpOm4ocy5jYWxsKHRoaXMsZnVuY3Rpb24oZSl7cmV0dXJuIEMubWF0Y2hlcyhlLHQpfSkpfSxhZGQ6ZnVuY3Rpb24odCxlKXtyZXR1cm4gbihQKHRoaXMuY29uY2F0KG4odCxlKSkpKX0saXM6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMubGVuZ3RoPjAmJkMubWF0Y2hlcyh0aGlzWzBdLHQpfSxub3Q6ZnVuY3Rpb24oZSl7dmFyIGk9W107aWYoTChlKSYmZS5jYWxsIT09dCl0aGlzLmVhY2goZnVuY3Rpb24odCl7ZS5jYWxsKHRoaXMsdCl8fGkucHVzaCh0aGlzKX0pO2Vsc2V7dmFyIHI9XCJzdHJpbmdcIj09dHlwZW9mIGU/dGhpcy5maWx0ZXIoZSk6UihlKSYmTChlLml0ZW0pP2EuY2FsbChlKTpuKGUpO3RoaXMuZm9yRWFjaChmdW5jdGlvbih0KXtyLmluZGV4T2YodCk8MCYmaS5wdXNoKHQpfSl9cmV0dXJuIG4oaSl9LGhhczpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oKXtyZXR1cm4gJCh0KT9uLmNvbnRhaW5zKHRoaXMsdCk6bih0aGlzKS5maW5kKHQpLnNpemUoKX0pfSxlcTpmdW5jdGlvbih0KXtyZXR1cm4tMT09PXQ/dGhpcy5zbGljZSh0KTp0aGlzLnNsaWNlKHQsK3QrMSl9LGZpcnN0OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpc1swXTtyZXR1cm4gdCYmISQodCk/dDpuKHQpfSxsYXN0OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpc1t0aGlzLmxlbmd0aC0xXTtyZXR1cm4gdCYmISQodCk/dDpuKHQpfSxmaW5kOmZ1bmN0aW9uKHQpe3ZhciBlLGk9dGhpcztyZXR1cm4gZT10P1wib2JqZWN0XCI9PXR5cGVvZiB0P24odCkuZmlsdGVyKGZ1bmN0aW9uKCl7dmFyIHQ9dGhpcztyZXR1cm4gci5zb21lLmNhbGwoaSxmdW5jdGlvbihlKXtyZXR1cm4gbi5jb250YWlucyhlLHQpfSl9KToxPT10aGlzLmxlbmd0aD9uKEMucXNhKHRoaXNbMF0sdCkpOnRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIEMucXNhKHRoaXMsdCl9KTpuKCl9LGNsb3Nlc3Q6ZnVuY3Rpb24odCxlKXt2YXIgaT10aGlzWzBdLHI9ITE7Zm9yKFwib2JqZWN0XCI9PXR5cGVvZiB0JiYocj1uKHQpKTtpJiYhKHI/ci5pbmRleE9mKGkpPj0wOkMubWF0Y2hlcyhpLHQpKTspaT1pIT09ZSYmIVooaSkmJmkucGFyZW50Tm9kZTtyZXR1cm4gbihpKX0scGFyZW50czpmdW5jdGlvbih0KXtmb3IodmFyIGU9W10saT10aGlzO2kubGVuZ3RoPjA7KWk9bi5tYXAoaSxmdW5jdGlvbih0KXtyZXR1cm4odD10LnBhcmVudE5vZGUpJiYhWih0KSYmZS5pbmRleE9mKHQpPDA/KGUucHVzaCh0KSx0KTp2b2lkIDB9KTtyZXR1cm4gVihlLHQpfSxwYXJlbnQ6ZnVuY3Rpb24odCl7cmV0dXJuIFYoUCh0aGlzLnBsdWNrKFwicGFyZW50Tm9kZVwiKSksdCl9LGNoaWxkcmVuOmZ1bmN0aW9uKHQpe3JldHVybiBWKHRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIFUodGhpcyl9KSx0KX0sY29udGVudHM6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZW50RG9jdW1lbnR8fGEuY2FsbCh0aGlzLmNoaWxkTm9kZXMpfSl9LHNpYmxpbmdzOmZ1bmN0aW9uKHQpe3JldHVybiBWKHRoaXMubWFwKGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHMuY2FsbChVKGUucGFyZW50Tm9kZSksZnVuY3Rpb24odCl7cmV0dXJuIHQhPT1lfSl9KSx0KX0sZW1wdHk6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dGhpcy5pbm5lckhUTUw9XCJcIn0pfSxwbHVjazpmdW5jdGlvbih0KXtyZXR1cm4gbi5tYXAodGhpcyxmdW5jdGlvbihlKXtyZXR1cm4gZVt0XX0pfSxzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1wibm9uZVwiPT10aGlzLnN0eWxlLmRpc3BsYXkmJih0aGlzLnN0eWxlLmRpc3BsYXk9XCJcIiksXCJub25lXCI9PWdldENvbXB1dGVkU3R5bGUodGhpcyxcIlwiKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZGlzcGxheVwiKSYmKHRoaXMuc3R5bGUuZGlzcGxheT1JKHRoaXMubm9kZU5hbWUpKX0pfSxyZXBsYWNlV2l0aDpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5iZWZvcmUodCkucmVtb3ZlKCl9LHdyYXA6ZnVuY3Rpb24odCl7dmFyIGU9TCh0KTtpZih0aGlzWzBdJiYhZSl2YXIgaT1uKHQpLmdldCgwKSxyPWkucGFyZW50Tm9kZXx8dGhpcy5sZW5ndGg+MTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKG8pe24odGhpcykud3JhcEFsbChlP3QuY2FsbCh0aGlzLG8pOnI/aS5jbG9uZU5vZGUoITApOmkpfSl9LHdyYXBBbGw6ZnVuY3Rpb24odCl7aWYodGhpc1swXSl7bih0aGlzWzBdKS5iZWZvcmUodD1uKHQpKTtmb3IodmFyIGU7KGU9dC5jaGlsZHJlbigpKS5sZW5ndGg7KXQ9ZS5maXJzdCgpO24odCkuYXBwZW5kKHRoaXMpfXJldHVybiB0aGlzfSx3cmFwSW5uZXI6ZnVuY3Rpb24odCl7dmFyIGU9TCh0KTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGkpe3ZhciByPW4odGhpcyksbz1yLmNvbnRlbnRzKCkscz1lP3QuY2FsbCh0aGlzLGkpOnQ7by5sZW5ndGg/by53cmFwQWxsKHMpOnIuYXBwZW5kKHMpfSl9LHVud3JhcDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnBhcmVudCgpLmVhY2goZnVuY3Rpb24oKXtuKHRoaXMpLnJlcGxhY2VXaXRoKG4odGhpcykuY2hpbGRyZW4oKSl9KSx0aGlzfSxjbG9uZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiB0aGlzLmNsb25lTm9kZSghMCl9KX0saGlkZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIil9LHRvZ2dsZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGk9bih0aGlzKTsoZT09PXQ/XCJub25lXCI9PWkuY3NzKFwiZGlzcGxheVwiKTplKT9pLnNob3coKTppLmhpZGUoKX0pfSxwcmV2OmZ1bmN0aW9uKHQpe3JldHVybiBuKHRoaXMucGx1Y2soXCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nXCIpKS5maWx0ZXIodHx8XCIqXCIpfSxuZXh0OmZ1bmN0aW9uKHQpe3JldHVybiBuKHRoaXMucGx1Y2soXCJuZXh0RWxlbWVudFNpYmxpbmdcIikpLmZpbHRlcih0fHxcIipcIil9LGh0bWw6ZnVuY3Rpb24odCl7cmV0dXJuIDAgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihlKXt2YXIgaT10aGlzLmlubmVySFRNTDtuKHRoaXMpLmVtcHR5KCkuYXBwZW5kKFkodGhpcyx0LGUsaSkpfSk6MCBpbiB0aGlzP3RoaXNbMF0uaW5uZXJIVE1MOm51bGx9LHRleHQ6ZnVuY3Rpb24odCl7cmV0dXJuIDAgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihlKXt2YXIgbj1ZKHRoaXMsdCxlLHRoaXMudGV4dENvbnRlbnQpO3RoaXMudGV4dENvbnRlbnQ9bnVsbD09bj9cIlwiOlwiXCIrbn0pOjAgaW4gdGhpcz90aGlzWzBdLnRleHRDb250ZW50Om51bGx9LGF0dHI6ZnVuY3Rpb24obixpKXt2YXIgcjtyZXR1cm5cInN0cmluZ1wiIT10eXBlb2Ygbnx8MSBpbiBhcmd1bWVudHM/dGhpcy5lYWNoKGZ1bmN0aW9uKHQpe2lmKDE9PT10aGlzLm5vZGVUeXBlKWlmKCQobikpZm9yKGUgaW4gbilKKHRoaXMsZSxuW2VdKTtlbHNlIEoodGhpcyxuLFkodGhpcyxpLHQsdGhpcy5nZXRBdHRyaWJ1dGUobikpKX0pOnRoaXMubGVuZ3RoJiYxPT09dGhpc1swXS5ub2RlVHlwZT8hKHI9dGhpc1swXS5nZXRBdHRyaWJ1dGUobikpJiZuIGluIHRoaXNbMF0/dGhpc1swXVtuXTpyOnR9LHJlbW92ZUF0dHI6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpezE9PT10aGlzLm5vZGVUeXBlJiZ0LnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe0oodGhpcyx0KX0sdGhpcyl9KX0scHJvcDpmdW5jdGlvbih0LGUpe3JldHVybiB0PU1bdF18fHQsMSBpbiBhcmd1bWVudHM/dGhpcy5lYWNoKGZ1bmN0aW9uKG4pe3RoaXNbdF09WSh0aGlzLGUsbix0aGlzW3RdKX0pOnRoaXNbMF0mJnRoaXNbMF1bdF19LGRhdGE6ZnVuY3Rpb24oZSxuKXt2YXIgaT1cImRhdGEtXCIrZS5yZXBsYWNlKGcsXCItJDFcIikudG9Mb3dlckNhc2UoKSxyPTEgaW4gYXJndW1lbnRzP3RoaXMuYXR0cihpLG4pOnRoaXMuYXR0cihpKTtyZXR1cm4gbnVsbCE9PXI/SyhyKTp0fSx2YWw6ZnVuY3Rpb24odCl7cmV0dXJuIDAgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihlKXt0aGlzLnZhbHVlPVkodGhpcyx0LGUsdGhpcy52YWx1ZSl9KTp0aGlzWzBdJiYodGhpc1swXS5tdWx0aXBsZT9uKHRoaXNbMF0pLmZpbmQoXCJvcHRpb25cIikuZmlsdGVyKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2VsZWN0ZWR9KS5wbHVjayhcInZhbHVlXCIpOnRoaXNbMF0udmFsdWUpfSxvZmZzZXQ6ZnVuY3Rpb24odCl7aWYodClyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGUpe3ZhciBpPW4odGhpcykscj1ZKHRoaXMsdCxlLGkub2Zmc2V0KCkpLG89aS5vZmZzZXRQYXJlbnQoKS5vZmZzZXQoKSxzPXt0b3A6ci50b3Atby50b3AsbGVmdDpyLmxlZnQtby5sZWZ0fTtcInN0YXRpY1wiPT1pLmNzcyhcInBvc2l0aW9uXCIpJiYocy5wb3NpdGlvbj1cInJlbGF0aXZlXCIpLGkuY3NzKHMpfSk7aWYoIXRoaXMubGVuZ3RoKXJldHVybiBudWxsO2lmKCFuLmNvbnRhaW5zKHUuZG9jdW1lbnRFbGVtZW50LHRoaXNbMF0pKXJldHVybnt0b3A6MCxsZWZ0OjB9O3ZhciBlPXRoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cmV0dXJue2xlZnQ6ZS5sZWZ0K3dpbmRvdy5wYWdlWE9mZnNldCx0b3A6ZS50b3Ard2luZG93LnBhZ2VZT2Zmc2V0LHdpZHRoOk1hdGgucm91bmQoZS53aWR0aCksaGVpZ2h0Ok1hdGgucm91bmQoZS5oZWlnaHQpfX0sY3NzOmZ1bmN0aW9uKHQsaSl7aWYoYXJndW1lbnRzLmxlbmd0aDwyKXt2YXIgcixvPXRoaXNbMF07aWYoIW8pcmV0dXJuO2lmKHI9Z2V0Q29tcHV0ZWRTdHlsZShvLFwiXCIpLFwic3RyaW5nXCI9PXR5cGVvZiB0KXJldHVybiBvLnN0eWxlW04odCldfHxyLmdldFByb3BlcnR5VmFsdWUodCk7aWYoQSh0KSl7dmFyIHM9e307cmV0dXJuIG4uZWFjaCh0LGZ1bmN0aW9uKHQsZSl7c1tlXT1vLnN0eWxlW04oZSldfHxyLmdldFByb3BlcnR5VmFsdWUoZSl9KSxzfX12YXIgYT1cIlwiO2lmKFwic3RyaW5nXCI9PUQodCkpaXx8MD09PWk/YT16KHQpK1wiOlwiK18odCxpKTp0aGlzLmVhY2goZnVuY3Rpb24oKXt0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KHoodCkpfSk7ZWxzZSBmb3IoZSBpbiB0KXRbZV18fDA9PT10W2VdP2ErPXooZSkrXCI6XCIrXyhlLHRbZV0pK1wiO1wiOnRoaXMuZWFjaChmdW5jdGlvbigpe3RoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkoeihlKSl9KTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dGhpcy5zdHlsZS5jc3NUZXh0Kz1cIjtcIithfSl9LGluZGV4OmZ1bmN0aW9uKHQpe3JldHVybiB0P3RoaXMuaW5kZXhPZihuKHQpWzBdKTp0aGlzLnBhcmVudCgpLmNoaWxkcmVuKCkuaW5kZXhPZih0aGlzWzBdKX0saGFzQ2xhc3M6ZnVuY3Rpb24odCl7cmV0dXJuIHQ/ci5zb21lLmNhbGwodGhpcyxmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy50ZXN0KEcodCkpfSxIKHQpKTohMX0sYWRkQ2xhc3M6ZnVuY3Rpb24odCl7cmV0dXJuIHQ/dGhpcy5lYWNoKGZ1bmN0aW9uKGUpe2lmKFwiY2xhc3NOYW1lXCJpbiB0aGlzKXtpPVtdO3ZhciByPUcodGhpcyksbz1ZKHRoaXMsdCxlLHIpO28uc3BsaXQoL1xccysvZykuZm9yRWFjaChmdW5jdGlvbih0KXtuKHRoaXMpLmhhc0NsYXNzKHQpfHxpLnB1c2godCl9LHRoaXMpLGkubGVuZ3RoJiZHKHRoaXMscisocj9cIiBcIjpcIlwiKStpLmpvaW4oXCIgXCIpKX19KTp0aGlzfSxyZW1vdmVDbGFzczpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKG4pe2lmKFwiY2xhc3NOYW1lXCJpbiB0aGlzKXtpZihlPT09dClyZXR1cm4gRyh0aGlzLFwiXCIpO2k9Ryh0aGlzKSxZKHRoaXMsZSxuLGkpLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24odCl7aT1pLnJlcGxhY2UoSCh0KSxcIiBcIil9KSxHKHRoaXMsaS50cmltKCkpfX0pfSx0b2dnbGVDbGFzczpmdW5jdGlvbihlLGkpe3JldHVybiBlP3RoaXMuZWFjaChmdW5jdGlvbihyKXt2YXIgbz1uKHRoaXMpLHM9WSh0aGlzLGUscixHKHRoaXMpKTtzLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oZSl7KGk9PT10PyFvLmhhc0NsYXNzKGUpOmkpP28uYWRkQ2xhc3MoZSk6by5yZW1vdmVDbGFzcyhlKX0pfSk6dGhpc30sc2Nyb2xsVG9wOmZ1bmN0aW9uKGUpe2lmKHRoaXMubGVuZ3RoKXt2YXIgbj1cInNjcm9sbFRvcFwiaW4gdGhpc1swXTtyZXR1cm4gZT09PXQ/bj90aGlzWzBdLnNjcm9sbFRvcDp0aGlzWzBdLnBhZ2VZT2Zmc2V0OnRoaXMuZWFjaChuP2Z1bmN0aW9uKCl7dGhpcy5zY3JvbGxUb3A9ZX06ZnVuY3Rpb24oKXt0aGlzLnNjcm9sbFRvKHRoaXMuc2Nyb2xsWCxlKX0pfX0sc2Nyb2xsTGVmdDpmdW5jdGlvbihlKXtpZih0aGlzLmxlbmd0aCl7dmFyIG49XCJzY3JvbGxMZWZ0XCJpbiB0aGlzWzBdO3JldHVybiBlPT09dD9uP3RoaXNbMF0uc2Nyb2xsTGVmdDp0aGlzWzBdLnBhZ2VYT2Zmc2V0OnRoaXMuZWFjaChuP2Z1bmN0aW9uKCl7dGhpcy5zY3JvbGxMZWZ0PWV9OmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxUbyhlLHRoaXMuc2Nyb2xsWSl9KX19LHBvc2l0aW9uOmZ1bmN0aW9uKCl7aWYodGhpcy5sZW5ndGgpe3ZhciB0PXRoaXNbMF0sZT10aGlzLm9mZnNldFBhcmVudCgpLGk9dGhpcy5vZmZzZXQoKSxyPW0udGVzdChlWzBdLm5vZGVOYW1lKT97dG9wOjAsbGVmdDowfTplLm9mZnNldCgpO3JldHVybiBpLnRvcC09cGFyc2VGbG9hdChuKHQpLmNzcyhcIm1hcmdpbi10b3BcIikpfHwwLGkubGVmdC09cGFyc2VGbG9hdChuKHQpLmNzcyhcIm1hcmdpbi1sZWZ0XCIpKXx8MCxyLnRvcCs9cGFyc2VGbG9hdChuKGVbMF0pLmNzcyhcImJvcmRlci10b3Atd2lkdGhcIikpfHwwLHIubGVmdCs9cGFyc2VGbG9hdChuKGVbMF0pLmNzcyhcImJvcmRlci1sZWZ0LXdpZHRoXCIpKXx8MCx7dG9wOmkudG9wLXIudG9wLGxlZnQ6aS5sZWZ0LXIubGVmdH19fSxvZmZzZXRQYXJlbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXtmb3IodmFyIHQ9dGhpcy5vZmZzZXRQYXJlbnR8fHUuYm9keTt0JiYhbS50ZXN0KHQubm9kZU5hbWUpJiZcInN0YXRpY1wiPT1uKHQpLmNzcyhcInBvc2l0aW9uXCIpOyl0PXQub2Zmc2V0UGFyZW50O3JldHVybiB0fSl9fSxuLmZuLmRldGFjaD1uLmZuLnJlbW92ZSxbXCJ3aWR0aFwiLFwiaGVpZ2h0XCJdLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIGk9ZS5yZXBsYWNlKC8uLyxmdW5jdGlvbih0KXtyZXR1cm4gdFswXS50b1VwcGVyQ2FzZSgpfSk7bi5mbltlXT1mdW5jdGlvbihyKXt2YXIgbyxzPXRoaXNbMF07cmV0dXJuIHI9PT10P2socyk/c1tcImlubmVyXCIraV06WihzKT9zLmRvY3VtZW50RWxlbWVudFtcInNjcm9sbFwiK2ldOihvPXRoaXMub2Zmc2V0KCkpJiZvW2VdOnRoaXMuZWFjaChmdW5jdGlvbih0KXtzPW4odGhpcykscy5jc3MoZSxZKHRoaXMscix0LHNbZV0oKSkpfSl9fSkseS5mb3JFYWNoKGZ1bmN0aW9uKHQsZSl7dmFyIGk9ZSUyO24uZm5bdF09ZnVuY3Rpb24oKXt2YXIgdCxvLHI9bi5tYXAoYXJndW1lbnRzLGZ1bmN0aW9uKGUpe3JldHVybiB0PUQoZSksXCJvYmplY3RcIj09dHx8XCJhcnJheVwiPT10fHxudWxsPT1lP2U6Qy5mcmFnbWVudChlKX0pLHM9dGhpcy5sZW5ndGg+MTtyZXR1cm4gci5sZW5ndGg8MT90aGlzOnRoaXMuZWFjaChmdW5jdGlvbih0LGEpe289aT9hOmEucGFyZW50Tm9kZSxhPTA9PWU/YS5uZXh0U2libGluZzoxPT1lP2EuZmlyc3RDaGlsZDoyPT1lP2E6bnVsbDt2YXIgZj1uLmNvbnRhaW5zKHUuZG9jdW1lbnRFbGVtZW50LG8pO3IuZm9yRWFjaChmdW5jdGlvbih0KXtpZihzKXQ9dC5jbG9uZU5vZGUoITApO2Vsc2UgaWYoIW8pcmV0dXJuIG4odCkucmVtb3ZlKCk7by5pbnNlcnRCZWZvcmUodCxhKSxmJiZRKHQsZnVuY3Rpb24odCl7bnVsbD09dC5ub2RlTmFtZXx8XCJTQ1JJUFRcIiE9PXQubm9kZU5hbWUudG9VcHBlckNhc2UoKXx8dC50eXBlJiZcInRleHQvamF2YXNjcmlwdFwiIT09dC50eXBlfHx0LnNyY3x8d2luZG93LmV2YWwuY2FsbCh3aW5kb3csdC5pbm5lckhUTUwpfSl9KX0pfSxuLmZuW2k/dCtcIlRvXCI6XCJpbnNlcnRcIisoZT9cIkJlZm9yZVwiOlwiQWZ0ZXJcIildPWZ1bmN0aW9uKGUpe3JldHVybiBuKGUpW3RdKHRoaXMpLHRoaXN9fSksQy5aLnByb3RvdHlwZT1YLnByb3RvdHlwZT1uLmZuLEMudW5pcT1QLEMuZGVzZXJpYWxpemVWYWx1ZT1LLG4uemVwdG89QyxufSgpO3dpbmRvdy5aZXB0bz1aZXB0byx2b2lkIDA9PT13aW5kb3cuJCYmKHdpbmRvdy4kPVplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiBsKHQpe3JldHVybiB0Ll96aWR8fCh0Ll96aWQ9ZSsrKX1mdW5jdGlvbiBoKHQsZSxuLGkpe2lmKGU9cChlKSxlLm5zKXZhciByPWQoZS5ucyk7cmV0dXJuKHNbbCh0KV18fFtdKS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuISghdHx8ZS5lJiZ0LmUhPWUuZXx8ZS5ucyYmIXIudGVzdCh0Lm5zKXx8biYmbCh0LmZuKSE9PWwobil8fGkmJnQuc2VsIT1pKX0pfWZ1bmN0aW9uIHAodCl7dmFyIGU9KFwiXCIrdCkuc3BsaXQoXCIuXCIpO3JldHVybntlOmVbMF0sbnM6ZS5zbGljZSgxKS5zb3J0KCkuam9pbihcIiBcIil9fWZ1bmN0aW9uIGQodCl7cmV0dXJuIG5ldyBSZWdFeHAoXCIoPzpefCApXCIrdC5yZXBsYWNlKFwiIFwiLFwiIC4qID9cIikrXCIoPzogfCQpXCIpfWZ1bmN0aW9uIG0odCxlKXtyZXR1cm4gdC5kZWwmJiF1JiZ0LmUgaW4gZnx8ISFlfWZ1bmN0aW9uIGcodCl7cmV0dXJuIGNbdF18fHUmJmZbdF18fHR9ZnVuY3Rpb24gdihlLGkscixvLGEsdSxmKXt2YXIgaD1sKGUpLGQ9c1toXXx8KHNbaF09W10pO2kuc3BsaXQoL1xccy8pLmZvckVhY2goZnVuY3Rpb24oaSl7aWYoXCJyZWFkeVwiPT1pKXJldHVybiB0KGRvY3VtZW50KS5yZWFkeShyKTt2YXIgcz1wKGkpO3MuZm49cixzLnNlbD1hLHMuZSBpbiBjJiYocj1mdW5jdGlvbihlKXt2YXIgbj1lLnJlbGF0ZWRUYXJnZXQ7cmV0dXJuIW58fG4hPT10aGlzJiYhdC5jb250YWlucyh0aGlzLG4pP3MuZm4uYXBwbHkodGhpcyxhcmd1bWVudHMpOnZvaWQgMH0pLHMuZGVsPXU7dmFyIGw9dXx8cjtzLnByb3h5PWZ1bmN0aW9uKHQpe2lmKHQ9VCh0KSwhdC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpKXt0LmRhdGE9bzt2YXIgaT1sLmFwcGx5KGUsdC5fYXJncz09bj9bdF06W3RdLmNvbmNhdCh0Ll9hcmdzKSk7cmV0dXJuIGk9PT0hMSYmKHQucHJldmVudERlZmF1bHQoKSx0LnN0b3BQcm9wYWdhdGlvbigpKSxpfX0scy5pPWQubGVuZ3RoLGQucHVzaChzKSxcImFkZEV2ZW50TGlzdGVuZXJcImluIGUmJmUuYWRkRXZlbnRMaXN0ZW5lcihnKHMuZSkscy5wcm94eSxtKHMsZikpfSl9ZnVuY3Rpb24geSh0LGUsbixpLHIpe3ZhciBvPWwodCk7KGV8fFwiXCIpLnNwbGl0KC9cXHMvKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2godCxlLG4saSkuZm9yRWFjaChmdW5jdGlvbihlKXtkZWxldGUgc1tvXVtlLmldLFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiaW4gdCYmdC5yZW1vdmVFdmVudExpc3RlbmVyKGcoZS5lKSxlLnByb3h5LG0oZSxyKSl9KX0pfWZ1bmN0aW9uIFQoZSxpKXtyZXR1cm4oaXx8IWUuaXNEZWZhdWx0UHJldmVudGVkKSYmKGl8fChpPWUpLHQuZWFjaChFLGZ1bmN0aW9uKHQsbil7dmFyIHI9aVt0XTtlW3RdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXNbbl09dyxyJiZyLmFwcGx5KGksYXJndW1lbnRzKX0sZVtuXT14fSksKGkuZGVmYXVsdFByZXZlbnRlZCE9PW4/aS5kZWZhdWx0UHJldmVudGVkOlwicmV0dXJuVmFsdWVcImluIGk/aS5yZXR1cm5WYWx1ZT09PSExOmkuZ2V0UHJldmVudERlZmF1bHQmJmkuZ2V0UHJldmVudERlZmF1bHQoKSkmJihlLmlzRGVmYXVsdFByZXZlbnRlZD13KSksZX1mdW5jdGlvbiBqKHQpe3ZhciBlLGk9e29yaWdpbmFsRXZlbnQ6dH07Zm9yKGUgaW4gdCliLnRlc3QoZSl8fHRbZV09PT1ufHwoaVtlXT10W2VdKTtyZXR1cm4gVChpLHQpfXZhciBuLGU9MSxpPUFycmF5LnByb3RvdHlwZS5zbGljZSxyPXQuaXNGdW5jdGlvbixvPWZ1bmN0aW9uKHQpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0fSxzPXt9LGE9e30sdT1cIm9uZm9jdXNpblwiaW4gd2luZG93LGY9e2ZvY3VzOlwiZm9jdXNpblwiLGJsdXI6XCJmb2N1c291dFwifSxjPXttb3VzZWVudGVyOlwibW91c2VvdmVyXCIsbW91c2VsZWF2ZTpcIm1vdXNlb3V0XCJ9O2EuY2xpY2s9YS5tb3VzZWRvd249YS5tb3VzZXVwPWEubW91c2Vtb3ZlPVwiTW91c2VFdmVudHNcIix0LmV2ZW50PXthZGQ6dixyZW1vdmU6eX0sdC5wcm94eT1mdW5jdGlvbihlLG4pe3ZhciBzPTIgaW4gYXJndW1lbnRzJiZpLmNhbGwoYXJndW1lbnRzLDIpO2lmKHIoZSkpe3ZhciBhPWZ1bmN0aW9uKCl7cmV0dXJuIGUuYXBwbHkobixzP3MuY29uY2F0KGkuY2FsbChhcmd1bWVudHMpKTphcmd1bWVudHMpfTtyZXR1cm4gYS5femlkPWwoZSksYX1pZihvKG4pKXJldHVybiBzPyhzLnVuc2hpZnQoZVtuXSxlKSx0LnByb3h5LmFwcGx5KG51bGwscykpOnQucHJveHkoZVtuXSxlKTt0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0ZWQgZnVuY3Rpb25cIil9LHQuZm4uYmluZD1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHRoaXMub24odCxlLG4pfSx0LmZuLnVuYmluZD1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLm9mZih0LGUpfSx0LmZuLm9uZT1mdW5jdGlvbih0LGUsbixpKXtyZXR1cm4gdGhpcy5vbih0LGUsbixpLDEpfTt2YXIgdz1mdW5jdGlvbigpe3JldHVybiEwfSx4PWZ1bmN0aW9uKCl7cmV0dXJuITF9LGI9L14oW0EtWl18cmV0dXJuVmFsdWUkfGxheWVyW1hZXSQpLyxFPXtwcmV2ZW50RGVmYXVsdDpcImlzRGVmYXVsdFByZXZlbnRlZFwiLHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjpcImlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkXCIsc3RvcFByb3BhZ2F0aW9uOlwiaXNQcm9wYWdhdGlvblN0b3BwZWRcIn07dC5mbi5kZWxlZ2F0ZT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHRoaXMub24oZSx0LG4pfSx0LmZuLnVuZGVsZWdhdGU9ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0aGlzLm9mZihlLHQsbil9LHQuZm4ubGl2ZT1mdW5jdGlvbihlLG4pe3JldHVybiB0KGRvY3VtZW50LmJvZHkpLmRlbGVnYXRlKHRoaXMuc2VsZWN0b3IsZSxuKSx0aGlzfSx0LmZuLmRpZT1mdW5jdGlvbihlLG4pe3JldHVybiB0KGRvY3VtZW50LmJvZHkpLnVuZGVsZWdhdGUodGhpcy5zZWxlY3RvcixlLG4pLHRoaXN9LHQuZm4ub249ZnVuY3Rpb24oZSxzLGEsdSxmKXt2YXIgYyxsLGg9dGhpcztyZXR1cm4gZSYmIW8oZSk/KHQuZWFjaChlLGZ1bmN0aW9uKHQsZSl7aC5vbih0LHMsYSxlLGYpfSksaCk6KG8ocyl8fHIodSl8fHU9PT0hMXx8KHU9YSxhPXMscz1uKSwodT09PW58fGE9PT0hMSkmJih1PWEsYT1uKSx1PT09ITEmJih1PXgpLGguZWFjaChmdW5jdGlvbihuLHIpe2YmJihjPWZ1bmN0aW9uKHQpe3JldHVybiB5KHIsdC50eXBlLHUpLHUuYXBwbHkodGhpcyxhcmd1bWVudHMpfSkscyYmKGw9ZnVuY3Rpb24oZSl7dmFyIG4sbz10KGUudGFyZ2V0KS5jbG9zZXN0KHMscikuZ2V0KDApO3JldHVybiBvJiZvIT09cj8obj10LmV4dGVuZChqKGUpLHtjdXJyZW50VGFyZ2V0Om8sbGl2ZUZpcmVkOnJ9KSwoY3x8dSkuYXBwbHkobyxbbl0uY29uY2F0KGkuY2FsbChhcmd1bWVudHMsMSkpKSk6dm9pZCAwfSksdihyLGUsdSxhLHMsbHx8Yyl9KSl9LHQuZm4ub2ZmPWZ1bmN0aW9uKGUsaSxzKXt2YXIgYT10aGlzO3JldHVybiBlJiYhbyhlKT8odC5lYWNoKGUsZnVuY3Rpb24odCxlKXthLm9mZih0LGksZSl9KSxhKToobyhpKXx8cihzKXx8cz09PSExfHwocz1pLGk9bikscz09PSExJiYocz14KSxhLmVhY2goZnVuY3Rpb24oKXt5KHRoaXMsZSxzLGkpfSkpfSx0LmZuLnRyaWdnZXI9ZnVuY3Rpb24oZSxuKXtyZXR1cm4gZT1vKGUpfHx0LmlzUGxhaW5PYmplY3QoZSk/dC5FdmVudChlKTpUKGUpLGUuX2FyZ3M9bix0aGlzLmVhY2goZnVuY3Rpb24oKXtlLnR5cGUgaW4gZiYmXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpc1tlLnR5cGVdP3RoaXNbZS50eXBlXSgpOlwiZGlzcGF0Y2hFdmVudFwiaW4gdGhpcz90aGlzLmRpc3BhdGNoRXZlbnQoZSk6dCh0aGlzKS50cmlnZ2VySGFuZGxlcihlLG4pfSl9LHQuZm4udHJpZ2dlckhhbmRsZXI9ZnVuY3Rpb24oZSxuKXt2YXIgaSxyO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24ocyxhKXtpPWoobyhlKT90LkV2ZW50KGUpOmUpLGkuX2FyZ3M9bixpLnRhcmdldD1hLHQuZWFjaChoKGEsZS50eXBlfHxlKSxmdW5jdGlvbih0LGUpe3JldHVybiByPWUucHJveHkoaSksaS5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpPyExOnZvaWQgMH0pfSkscn0sXCJmb2N1c2luIGZvY3Vzb3V0IGZvY3VzIGJsdXIgbG9hZCByZXNpemUgc2Nyb2xsIHVubG9hZCBjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBjaGFuZ2Ugc2VsZWN0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgZXJyb3JcIi5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihlKXt0LmZuW2VdPWZ1bmN0aW9uKHQpe3JldHVybiAwIGluIGFyZ3VtZW50cz90aGlzLmJpbmQoZSx0KTp0aGlzLnRyaWdnZXIoZSl9fSksdC5FdmVudD1mdW5jdGlvbih0LGUpe28odCl8fChlPXQsdD1lLnR5cGUpO3ZhciBuPWRvY3VtZW50LmNyZWF0ZUV2ZW50KGFbdF18fFwiRXZlbnRzXCIpLGk9ITA7aWYoZSlmb3IodmFyIHIgaW4gZSlcImJ1YmJsZXNcIj09cj9pPSEhZVtyXTpuW3JdPWVbcl07cmV0dXJuIG4uaW5pdEV2ZW50KHQsaSwhMCksVChuKX19KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiBoKGUsbixpKXt2YXIgcj10LkV2ZW50KG4pO3JldHVybiB0KGUpLnRyaWdnZXIocixpKSwhci5pc0RlZmF1bHRQcmV2ZW50ZWQoKX1mdW5jdGlvbiBwKHQsZSxpLHIpe3JldHVybiB0Lmdsb2JhbD9oKGV8fG4saSxyKTp2b2lkIDB9ZnVuY3Rpb24gZChlKXtlLmdsb2JhbCYmMD09PXQuYWN0aXZlKysmJnAoZSxudWxsLFwiYWpheFN0YXJ0XCIpfWZ1bmN0aW9uIG0oZSl7ZS5nbG9iYWwmJiEtLXQuYWN0aXZlJiZwKGUsbnVsbCxcImFqYXhTdG9wXCIpfWZ1bmN0aW9uIGcodCxlKXt2YXIgbj1lLmNvbnRleHQ7cmV0dXJuIGUuYmVmb3JlU2VuZC5jYWxsKG4sdCxlKT09PSExfHxwKGUsbixcImFqYXhCZWZvcmVTZW5kXCIsW3QsZV0pPT09ITE/ITE6dm9pZCBwKGUsbixcImFqYXhTZW5kXCIsW3QsZV0pfWZ1bmN0aW9uIHYodCxlLG4saSl7dmFyIHI9bi5jb250ZXh0LG89XCJzdWNjZXNzXCI7bi5zdWNjZXNzLmNhbGwocix0LG8sZSksaSYmaS5yZXNvbHZlV2l0aChyLFt0LG8sZV0pLHAobixyLFwiYWpheFN1Y2Nlc3NcIixbZSxuLHRdKSx3KG8sZSxuKX1mdW5jdGlvbiB5KHQsZSxuLGkscil7dmFyIG89aS5jb250ZXh0O2kuZXJyb3IuY2FsbChvLG4sZSx0KSxyJiZyLnJlamVjdFdpdGgobyxbbixlLHRdKSxwKGksbyxcImFqYXhFcnJvclwiLFtuLGksdHx8ZV0pLHcoZSxuLGkpfWZ1bmN0aW9uIHcodCxlLG4pe3ZhciBpPW4uY29udGV4dDtuLmNvbXBsZXRlLmNhbGwoaSxlLHQpLHAobixpLFwiYWpheENvbXBsZXRlXCIsW2Usbl0pLG0obil9ZnVuY3Rpb24geCgpe31mdW5jdGlvbiBiKHQpe3JldHVybiB0JiYodD10LnNwbGl0KFwiO1wiLDIpWzBdKSx0JiYodD09Zj9cImh0bWxcIjp0PT11P1wianNvblwiOnMudGVzdCh0KT9cInNjcmlwdFwiOmEudGVzdCh0KSYmXCJ4bWxcIil8fFwidGV4dFwifWZ1bmN0aW9uIEUodCxlKXtyZXR1cm5cIlwiPT1lP3Q6KHQrXCImXCIrZSkucmVwbGFjZSgvWyY/XXsxLDJ9LyxcIj9cIil9ZnVuY3Rpb24gVChlKXtlLnByb2Nlc3NEYXRhJiZlLmRhdGEmJlwic3RyaW5nXCIhPXQudHlwZShlLmRhdGEpJiYoZS5kYXRhPXQucGFyYW0oZS5kYXRhLGUudHJhZGl0aW9uYWwpKSwhZS5kYXRhfHxlLnR5cGUmJlwiR0VUXCIhPWUudHlwZS50b1VwcGVyQ2FzZSgpfHwoZS51cmw9RShlLnVybCxlLmRhdGEpLGUuZGF0YT12b2lkIDApfWZ1bmN0aW9uIGooZSxuLGkscil7cmV0dXJuIHQuaXNGdW5jdGlvbihuKSYmKHI9aSxpPW4sbj12b2lkIDApLHQuaXNGdW5jdGlvbihpKXx8KHI9aSxpPXZvaWQgMCkse3VybDplLGRhdGE6bixzdWNjZXNzOmksZGF0YVR5cGU6cn19ZnVuY3Rpb24gQyhlLG4saSxyKXt2YXIgbyxzPXQuaXNBcnJheShuKSxhPXQuaXNQbGFpbk9iamVjdChuKTt0LmVhY2gobixmdW5jdGlvbihuLHUpe289dC50eXBlKHUpLHImJihuPWk/cjpyK1wiW1wiKyhhfHxcIm9iamVjdFwiPT1vfHxcImFycmF5XCI9PW8/bjpcIlwiKStcIl1cIiksIXImJnM/ZS5hZGQodS5uYW1lLHUudmFsdWUpOlwiYXJyYXlcIj09b3x8IWkmJlwib2JqZWN0XCI9PW8/QyhlLHUsaSxuKTplLmFkZChuLHUpfSl9dmFyIGkscixlPTAsbj13aW5kb3cuZG9jdW1lbnQsbz0vPHNjcmlwdFxcYltePF0qKD86KD8hPFxcL3NjcmlwdD4pPFtePF0qKSo8XFwvc2NyaXB0Pi9naSxzPS9eKD86dGV4dHxhcHBsaWNhdGlvbilcXC9qYXZhc2NyaXB0L2ksYT0vXig/OnRleHR8YXBwbGljYXRpb24pXFwveG1sL2ksdT1cImFwcGxpY2F0aW9uL2pzb25cIixmPVwidGV4dC9odG1sXCIsYz0vXlxccyokLyxsPW4uY3JlYXRlRWxlbWVudChcImFcIik7bC5ocmVmPXdpbmRvdy5sb2NhdGlvbi5ocmVmLHQuYWN0aXZlPTAsdC5hamF4SlNPTlA9ZnVuY3Rpb24oaSxyKXtpZighKFwidHlwZVwiaW4gaSkpcmV0dXJuIHQuYWpheChpKTt2YXIgZixoLG89aS5qc29ucENhbGxiYWNrLHM9KHQuaXNGdW5jdGlvbihvKT9vKCk6byl8fFwianNvbnBcIisgKytlLGE9bi5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpLHU9d2luZG93W3NdLGM9ZnVuY3Rpb24oZSl7dChhKS50cmlnZ2VySGFuZGxlcihcImVycm9yXCIsZXx8XCJhYm9ydFwiKX0sbD17YWJvcnQ6Y307cmV0dXJuIHImJnIucHJvbWlzZShsKSx0KGEpLm9uKFwibG9hZCBlcnJvclwiLGZ1bmN0aW9uKGUsbil7Y2xlYXJUaW1lb3V0KGgpLHQoYSkub2ZmKCkucmVtb3ZlKCksXCJlcnJvclwiIT1lLnR5cGUmJmY/dihmWzBdLGwsaSxyKTp5KG51bGwsbnx8XCJlcnJvclwiLGwsaSxyKSx3aW5kb3dbc109dSxmJiZ0LmlzRnVuY3Rpb24odSkmJnUoZlswXSksdT1mPXZvaWQgMH0pLGcobCxpKT09PSExPyhjKFwiYWJvcnRcIiksbCk6KHdpbmRvd1tzXT1mdW5jdGlvbigpe2Y9YXJndW1lbnRzfSxhLnNyYz1pLnVybC5yZXBsYWNlKC9cXD8oLispPVxcPy8sXCI/JDE9XCIrcyksbi5oZWFkLmFwcGVuZENoaWxkKGEpLGkudGltZW91dD4wJiYoaD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YyhcInRpbWVvdXRcIil9LGkudGltZW91dCkpLGwpfSx0LmFqYXhTZXR0aW5ncz17dHlwZTpcIkdFVFwiLGJlZm9yZVNlbmQ6eCxzdWNjZXNzOngsZXJyb3I6eCxjb21wbGV0ZTp4LGNvbnRleHQ6bnVsbCxnbG9iYWw6ITAseGhyOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3R9LGFjY2VwdHM6e3NjcmlwdDpcInRleHQvamF2YXNjcmlwdCwgYXBwbGljYXRpb24vamF2YXNjcmlwdCwgYXBwbGljYXRpb24veC1qYXZhc2NyaXB0XCIsanNvbjp1LHhtbDpcImFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWxcIixodG1sOmYsdGV4dDpcInRleHQvcGxhaW5cIn0sY3Jvc3NEb21haW46ITEsdGltZW91dDowLHByb2Nlc3NEYXRhOiEwLGNhY2hlOiEwfSx0LmFqYXg9ZnVuY3Rpb24oZSl7dmFyIGEsdSxvPXQuZXh0ZW5kKHt9LGV8fHt9KSxzPXQuRGVmZXJyZWQmJnQuRGVmZXJyZWQoKTtmb3IoaSBpbiB0LmFqYXhTZXR0aW5ncyl2b2lkIDA9PT1vW2ldJiYob1tpXT10LmFqYXhTZXR0aW5nc1tpXSk7ZChvKSxvLmNyb3NzRG9tYWlufHwoYT1uLmNyZWF0ZUVsZW1lbnQoXCJhXCIpLGEuaHJlZj1vLnVybCxhLmhyZWY9YS5ocmVmLG8uY3Jvc3NEb21haW49bC5wcm90b2NvbCtcIi8vXCIrbC5ob3N0IT1hLnByb3RvY29sK1wiLy9cIithLmhvc3QpLG8udXJsfHwoby51cmw9d2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpLCh1PW8udXJsLmluZGV4T2YoXCIjXCIpKT4tMSYmKG8udXJsPW8udXJsLnNsaWNlKDAsdSkpLFQobyk7dmFyIGY9by5kYXRhVHlwZSxoPS9cXD8uKz1cXD8vLnRlc3Qoby51cmwpO2lmKGgmJihmPVwianNvbnBcIiksby5jYWNoZSE9PSExJiYoZSYmZS5jYWNoZT09PSEwfHxcInNjcmlwdFwiIT1mJiZcImpzb25wXCIhPWYpfHwoby51cmw9RShvLnVybCxcIl89XCIrRGF0ZS5ub3coKSkpLFwianNvbnBcIj09ZilyZXR1cm4gaHx8KG8udXJsPUUoby51cmwsby5qc29ucD9vLmpzb25wK1wiPT9cIjpvLmpzb25wPT09ITE/XCJcIjpcImNhbGxiYWNrPT9cIikpLHQuYWpheEpTT05QKG8scyk7dmFyIE4scD1vLmFjY2VwdHNbZl0sbT17fSx3PWZ1bmN0aW9uKHQsZSl7bVt0LnRvTG93ZXJDYXNlKCldPVt0LGVdfSxqPS9eKFtcXHctXSs6KVxcL1xcLy8udGVzdChvLnVybCk/UmVnRXhwLiQxOndpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCxTPW8ueGhyKCksQz1TLnNldFJlcXVlc3RIZWFkZXI7aWYocyYmcy5wcm9taXNlKFMpLG8uY3Jvc3NEb21haW58fHcoXCJYLVJlcXVlc3RlZC1XaXRoXCIsXCJYTUxIdHRwUmVxdWVzdFwiKSx3KFwiQWNjZXB0XCIscHx8XCIqLypcIiksKHA9by5taW1lVHlwZXx8cCkmJihwLmluZGV4T2YoXCIsXCIpPi0xJiYocD1wLnNwbGl0KFwiLFwiLDIpWzBdKSxTLm92ZXJyaWRlTWltZVR5cGUmJlMub3ZlcnJpZGVNaW1lVHlwZShwKSksKG8uY29udGVudFR5cGV8fG8uY29udGVudFR5cGUhPT0hMSYmby5kYXRhJiZcIkdFVFwiIT1vLnR5cGUudG9VcHBlckNhc2UoKSkmJncoXCJDb250ZW50LVR5cGVcIixvLmNvbnRlbnRUeXBlfHxcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKSxvLmhlYWRlcnMpZm9yKHIgaW4gby5oZWFkZXJzKXcocixvLmhlYWRlcnNbcl0pO2lmKFMuc2V0UmVxdWVzdEhlYWRlcj13LFMub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7aWYoND09Uy5yZWFkeVN0YXRlKXtTLm9ucmVhZHlzdGF0ZWNoYW5nZT14LGNsZWFyVGltZW91dChOKTt2YXIgZSxuPSExO2lmKFMuc3RhdHVzPj0yMDAmJlMuc3RhdHVzPDMwMHx8MzA0PT1TLnN0YXR1c3x8MD09Uy5zdGF0dXMmJlwiZmlsZTpcIj09ail7Zj1mfHxiKG8ubWltZVR5cGV8fFMuZ2V0UmVzcG9uc2VIZWFkZXIoXCJjb250ZW50LXR5cGVcIikpLGU9Uy5yZXNwb25zZVRleHQ7dHJ5e1wic2NyaXB0XCI9PWY/KDEsZXZhbCkoZSk6XCJ4bWxcIj09Zj9lPVMucmVzcG9uc2VYTUw6XCJqc29uXCI9PWYmJihlPWMudGVzdChlKT9udWxsOnQucGFyc2VKU09OKGUpKX1jYXRjaChpKXtuPWl9bj95KG4sXCJwYXJzZXJlcnJvclwiLFMsbyxzKTp2KGUsUyxvLHMpfWVsc2UgeShTLnN0YXR1c1RleHR8fG51bGwsUy5zdGF0dXM/XCJlcnJvclwiOlwiYWJvcnRcIixTLG8scyl9fSxnKFMsbyk9PT0hMSlyZXR1cm4gUy5hYm9ydCgpLHkobnVsbCxcImFib3J0XCIsUyxvLHMpLFM7aWYoby54aHJGaWVsZHMpZm9yKHIgaW4gby54aHJGaWVsZHMpU1tyXT1vLnhockZpZWxkc1tyXTt2YXIgUD1cImFzeW5jXCJpbiBvP28uYXN5bmM6ITA7Uy5vcGVuKG8udHlwZSxvLnVybCxQLG8udXNlcm5hbWUsby5wYXNzd29yZCk7Zm9yKHIgaW4gbSlDLmFwcGx5KFMsbVtyXSk7cmV0dXJuIG8udGltZW91dD4wJiYoTj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Uy5vbnJlYWR5c3RhdGVjaGFuZ2U9eCxTLmFib3J0KCkseShudWxsLFwidGltZW91dFwiLFMsbyxzKX0sby50aW1lb3V0KSksUy5zZW5kKG8uZGF0YT9vLmRhdGE6bnVsbCksU30sdC5nZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gdC5hamF4KGouYXBwbHkobnVsbCxhcmd1bWVudHMpKX0sdC5wb3N0PWZ1bmN0aW9uKCl7dmFyIGU9ai5hcHBseShudWxsLGFyZ3VtZW50cyk7cmV0dXJuIGUudHlwZT1cIlBPU1RcIix0LmFqYXgoZSl9LHQuZ2V0SlNPTj1mdW5jdGlvbigpe3ZhciBlPWouYXBwbHkobnVsbCxhcmd1bWVudHMpO3JldHVybiBlLmRhdGFUeXBlPVwianNvblwiLHQuYWpheChlKX0sdC5mbi5sb2FkPWZ1bmN0aW9uKGUsbixpKXtpZighdGhpcy5sZW5ndGgpcmV0dXJuIHRoaXM7dmFyIGEscj10aGlzLHM9ZS5zcGxpdCgvXFxzLyksdT1qKGUsbixpKSxmPXUuc3VjY2VzcztyZXR1cm4gcy5sZW5ndGg+MSYmKHUudXJsPXNbMF0sYT1zWzFdKSx1LnN1Y2Nlc3M9ZnVuY3Rpb24oZSl7ci5odG1sKGE/dChcIjxkaXY+XCIpLmh0bWwoZS5yZXBsYWNlKG8sXCJcIikpLmZpbmQoYSk6ZSksZiYmZi5hcHBseShyLGFyZ3VtZW50cyl9LHQuYWpheCh1KSx0aGlzfTt2YXIgUz1lbmNvZGVVUklDb21wb25lbnQ7dC5wYXJhbT1mdW5jdGlvbihlLG4pe3ZhciBpPVtdO3JldHVybiBpLmFkZD1mdW5jdGlvbihlLG4pe3QuaXNGdW5jdGlvbihuKSYmKG49bigpKSxudWxsPT1uJiYobj1cIlwiKSx0aGlzLnB1c2goUyhlKStcIj1cIitTKG4pKX0sQyhpLGUsbiksaS5qb2luKFwiJlwiKS5yZXBsYWNlKC8lMjAvZyxcIitcIil9fShaZXB0byksZnVuY3Rpb24odCl7dC5DYWxsYmFja3M9ZnVuY3Rpb24oZSl7ZT10LmV4dGVuZCh7fSxlKTt2YXIgbixpLHIsbyxzLGEsdT1bXSxmPSFlLm9uY2UmJltdLGM9ZnVuY3Rpb24odCl7Zm9yKG49ZS5tZW1vcnkmJnQsaT0hMCxhPW98fDAsbz0wLHM9dS5sZW5ndGgscj0hMDt1JiZzPmE7KythKWlmKHVbYV0uYXBwbHkodFswXSx0WzFdKT09PSExJiZlLnN0b3BPbkZhbHNlKXtuPSExO2JyZWFrfXI9ITEsdSYmKGY/Zi5sZW5ndGgmJmMoZi5zaGlmdCgpKTpuP3UubGVuZ3RoPTA6bC5kaXNhYmxlKCkpfSxsPXthZGQ6ZnVuY3Rpb24oKXtpZih1KXt2YXIgaT11Lmxlbmd0aCxhPWZ1bmN0aW9uKG4pe3QuZWFjaChuLGZ1bmN0aW9uKHQsbil7XCJmdW5jdGlvblwiPT10eXBlb2Ygbj9lLnVuaXF1ZSYmbC5oYXMobil8fHUucHVzaChuKTpuJiZuLmxlbmd0aCYmXCJzdHJpbmdcIiE9dHlwZW9mIG4mJmEobil9KX07YShhcmd1bWVudHMpLHI/cz11Lmxlbmd0aDpuJiYobz1pLGMobikpfXJldHVybiB0aGlzfSxyZW1vdmU6ZnVuY3Rpb24oKXtyZXR1cm4gdSYmdC5lYWNoKGFyZ3VtZW50cyxmdW5jdGlvbihlLG4pe2Zvcih2YXIgaTsoaT10LmluQXJyYXkobix1LGkpKT4tMTspdS5zcGxpY2UoaSwxKSxyJiYocz49aSYmLS1zLGE+PWkmJi0tYSl9KSx0aGlzfSxoYXM6ZnVuY3Rpb24oZSl7cmV0dXJuISghdXx8IShlP3QuaW5BcnJheShlLHUpPi0xOnUubGVuZ3RoKSl9LGVtcHR5OmZ1bmN0aW9uKCl7cmV0dXJuIHM9dS5sZW5ndGg9MCx0aGlzfSxkaXNhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIHU9Zj1uPXZvaWQgMCx0aGlzfSxkaXNhYmxlZDpmdW5jdGlvbigpe3JldHVybiF1fSxsb2NrOmZ1bmN0aW9uKCl7cmV0dXJuIGY9dm9pZCAwLG58fGwuZGlzYWJsZSgpLHRoaXN9LGxvY2tlZDpmdW5jdGlvbigpe3JldHVybiFmfSxmaXJlV2l0aDpmdW5jdGlvbih0LGUpe3JldHVybiF1fHxpJiYhZnx8KGU9ZXx8W10sZT1bdCxlLnNsaWNlP2Uuc2xpY2UoKTplXSxyP2YucHVzaChlKTpjKGUpKSx0aGlzfSxmaXJlOmZ1bmN0aW9uKCl7cmV0dXJuIGwuZmlyZVdpdGgodGhpcyxhcmd1bWVudHMpfSxmaXJlZDpmdW5jdGlvbigpe3JldHVybiEhaX19O3JldHVybiBsfX0oWmVwdG8pLGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIG4oZSl7dmFyIGk9W1tcInJlc29sdmVcIixcImRvbmVcIix0LkNhbGxiYWNrcyh7b25jZToxLG1lbW9yeToxfSksXCJyZXNvbHZlZFwiXSxbXCJyZWplY3RcIixcImZhaWxcIix0LkNhbGxiYWNrcyh7b25jZToxLG1lbW9yeToxfSksXCJyZWplY3RlZFwiXSxbXCJub3RpZnlcIixcInByb2dyZXNzXCIsdC5DYWxsYmFja3Moe21lbW9yeToxfSldXSxyPVwicGVuZGluZ1wiLG89e3N0YXRlOmZ1bmN0aW9uKCl7cmV0dXJuIHJ9LGFsd2F5czpmdW5jdGlvbigpe3JldHVybiBzLmRvbmUoYXJndW1lbnRzKS5mYWlsKGFyZ3VtZW50cyksdGhpc30sdGhlbjpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cztyZXR1cm4gbihmdW5jdGlvbihuKXt0LmVhY2goaSxmdW5jdGlvbihpLHIpe3ZhciBhPXQuaXNGdW5jdGlvbihlW2ldKSYmZVtpXTtzW3JbMV1dKGZ1bmN0aW9uKCl7dmFyIGU9YSYmYS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7aWYoZSYmdC5pc0Z1bmN0aW9uKGUucHJvbWlzZSkpZS5wcm9taXNlKCkuZG9uZShuLnJlc29sdmUpLmZhaWwobi5yZWplY3QpLnByb2dyZXNzKG4ubm90aWZ5KTtlbHNle3ZhciBpPXRoaXM9PT1vP24ucHJvbWlzZSgpOnRoaXMscz1hP1tlXTphcmd1bWVudHM7bltyWzBdK1wiV2l0aFwiXShpLHMpfX0pfSksZT1udWxsfSkucHJvbWlzZSgpfSxwcm9taXNlOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT1lP3QuZXh0ZW5kKGUsbyk6b319LHM9e307cmV0dXJuIHQuZWFjaChpLGZ1bmN0aW9uKHQsZSl7dmFyIG49ZVsyXSxhPWVbM107b1tlWzFdXT1uLmFkZCxhJiZuLmFkZChmdW5jdGlvbigpe3I9YX0saVsxXnRdWzJdLmRpc2FibGUsaVsyXVsyXS5sb2NrKSxzW2VbMF1dPWZ1bmN0aW9uKCl7cmV0dXJuIHNbZVswXStcIldpdGhcIl0odGhpcz09PXM/bzp0aGlzLGFyZ3VtZW50cyksdGhpc30sc1tlWzBdK1wiV2l0aFwiXT1uLmZpcmVXaXRofSksby5wcm9taXNlKHMpLGUmJmUuY2FsbChzLHMpLHN9dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlO3Qud2hlbj1mdW5jdGlvbihpKXt2YXIgZixjLGwscj1lLmNhbGwoYXJndW1lbnRzKSxvPXIubGVuZ3RoLHM9MCxhPTEhPT1vfHxpJiZ0LmlzRnVuY3Rpb24oaS5wcm9taXNlKT9vOjAsdT0xPT09YT9pOm4oKSxoPWZ1bmN0aW9uKHQsbixpKXtyZXR1cm4gZnVuY3Rpb24ocil7blt0XT10aGlzLGlbdF09YXJndW1lbnRzLmxlbmd0aD4xP2UuY2FsbChhcmd1bWVudHMpOnIsaT09PWY/dS5ub3RpZnlXaXRoKG4saSk6LS1hfHx1LnJlc29sdmVXaXRoKG4saSl9fTtpZihvPjEpZm9yKGY9bmV3IEFycmF5KG8pLGM9bmV3IEFycmF5KG8pLGw9bmV3IEFycmF5KG8pO28+czsrK3MpcltzXSYmdC5pc0Z1bmN0aW9uKHJbc10ucHJvbWlzZSk/cltzXS5wcm9taXNlKCkuZG9uZShoKHMsbCxyKSkuZmFpbCh1LnJlamVjdCkucHJvZ3Jlc3MoaChzLGMsZikpOi0tYTtyZXR1cm4gYXx8dS5yZXNvbHZlV2l0aChsLHIpLHUucHJvbWlzZSgpfSx0LkRlZmVycmVkPW59KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiB1KHQsZSxuLGkpe3JldHVybiBNYXRoLmFicyh0LWUpPj1NYXRoLmFicyhuLWkpP3QtZT4wP1wiTGVmdFwiOlwiUmlnaHRcIjpuLWk+MD9cIlVwXCI6XCJEb3duXCJ9ZnVuY3Rpb24gZigpe289bnVsbCxlLmxhc3QmJihlLmVsLnRyaWdnZXIoXCJsb25nVGFwXCIpLGU9e30pfWZ1bmN0aW9uIGMoKXtvJiZjbGVhclRpbWVvdXQobyksbz1udWxsfWZ1bmN0aW9uIGwoKXtuJiZjbGVhclRpbWVvdXQobiksaSYmY2xlYXJUaW1lb3V0KGkpLHImJmNsZWFyVGltZW91dChyKSxvJiZjbGVhclRpbWVvdXQobyksbj1pPXI9bz1udWxsLGU9e319ZnVuY3Rpb24gaCh0KXtyZXR1cm4oXCJ0b3VjaFwiPT10LnBvaW50ZXJUeXBlfHx0LnBvaW50ZXJUeXBlPT10Lk1TUE9JTlRFUl9UWVBFX1RPVUNIKSYmdC5pc1ByaW1hcnl9ZnVuY3Rpb24gcCh0LGUpe3JldHVybiB0LnR5cGU9PVwicG9pbnRlclwiK2V8fHQudHlwZS50b0xvd2VyQ2FzZSgpPT1cIm1zcG9pbnRlclwiK2V9dmFyIG4saSxyLG8sYSxlPXt9LHM9NzUwO3QoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7dmFyIGQsbSx5LHcsZz0wLHY9MDtcIk1TR2VzdHVyZVwiaW4gd2luZG93JiYoYT1uZXcgTVNHZXN0dXJlLGEudGFyZ2V0PWRvY3VtZW50LmJvZHkpLHQoZG9jdW1lbnQpLmJpbmQoXCJNU0dlc3R1cmVFbmRcIixmdW5jdGlvbih0KXt2YXIgbj10LnZlbG9jaXR5WD4xP1wiUmlnaHRcIjp0LnZlbG9jaXR5WDwtMT9cIkxlZnRcIjp0LnZlbG9jaXR5WT4xP1wiRG93blwiOnQudmVsb2NpdHlZPC0xP1wiVXBcIjpudWxsO24mJihlLmVsLnRyaWdnZXIoXCJzd2lwZVwiKSxlLmVsLnRyaWdnZXIoXCJzd2lwZVwiK24pKX0pLm9uKFwidG91Y2hzdGFydCBNU1BvaW50ZXJEb3duIHBvaW50ZXJkb3duXCIsZnVuY3Rpb24oaSl7KCEodz1wKGksXCJkb3duXCIpKXx8aChpKSkmJih5PXc/aTppLnRvdWNoZXNbMF0saS50b3VjaGVzJiYxPT09aS50b3VjaGVzLmxlbmd0aCYmZS54MiYmKGUueDI9dm9pZCAwLGUueTI9dm9pZCAwKSxkPURhdGUubm93KCksbT1kLShlLmxhc3R8fGQpLGUuZWw9dChcInRhZ05hbWVcImluIHkudGFyZ2V0P3kudGFyZ2V0OnkudGFyZ2V0LnBhcmVudE5vZGUpLG4mJmNsZWFyVGltZW91dChuKSxlLngxPXkucGFnZVgsZS55MT15LnBhZ2VZLG0+MCYmMjUwPj1tJiYoZS5pc0RvdWJsZVRhcD0hMCksZS5sYXN0PWQsbz1zZXRUaW1lb3V0KGYscyksYSYmdyYmYS5hZGRQb2ludGVyKGkucG9pbnRlcklkKSl9KS5vbihcInRvdWNobW92ZSBNU1BvaW50ZXJNb3ZlIHBvaW50ZXJtb3ZlXCIsZnVuY3Rpb24odCl7KCEodz1wKHQsXCJtb3ZlXCIpKXx8aCh0KSkmJih5PXc/dDp0LnRvdWNoZXNbMF0sYygpLGUueDI9eS5wYWdlWCxlLnkyPXkucGFnZVksZys9TWF0aC5hYnMoZS54MS1lLngyKSx2Kz1NYXRoLmFicyhlLnkxLWUueTIpKX0pLm9uKFwidG91Y2hlbmQgTVNQb2ludGVyVXAgcG9pbnRlcnVwXCIsZnVuY3Rpb24obyl7KCEodz1wKG8sXCJ1cFwiKSl8fGgobykpJiYoYygpLGUueDImJk1hdGguYWJzKGUueDEtZS54Mik+MzB8fGUueTImJk1hdGguYWJzKGUueTEtZS55Mik+MzA/cj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZS5lbC50cmlnZ2VyKFwic3dpcGVcIiksZS5lbC50cmlnZ2VyKFwic3dpcGVcIit1KGUueDEsZS54MixlLnkxLGUueTIpKSxlPXt9fSwwKTpcImxhc3RcImluIGUmJigzMD5nJiYzMD52P2k9c2V0VGltZW91dChmdW5jdGlvbigpe3ZhciBpPXQuRXZlbnQoXCJ0YXBcIik7aS5jYW5jZWxUb3VjaD1sLGUuZWwudHJpZ2dlcihpKSxlLmlzRG91YmxlVGFwPyhlLmVsJiZlLmVsLnRyaWdnZXIoXCJkb3VibGVUYXBcIiksZT17fSk6bj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bj1udWxsLGUuZWwmJmUuZWwudHJpZ2dlcihcInNpbmdsZVRhcFwiKSxlPXt9fSwyNTApfSwwKTplPXt9KSxnPXY9MCl9KS5vbihcInRvdWNoY2FuY2VsIE1TUG9pbnRlckNhbmNlbCBwb2ludGVyY2FuY2VsXCIsbCksdCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsbCl9KSxbXCJzd2lwZVwiLFwic3dpcGVMZWZ0XCIsXCJzd2lwZVJpZ2h0XCIsXCJzd2lwZVVwXCIsXCJzd2lwZURvd25cIixcImRvdWJsZVRhcFwiLFwidGFwXCIsXCJzaW5nbGVUYXBcIixcImxvbmdUYXBcIl0uZm9yRWFjaChmdW5jdGlvbihlKXt0LmZuW2VdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLm9uKGUsdCl9fSl9KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiByKGUpe3JldHVybiBlPXQoZSksISghZS53aWR0aCgpJiYhZS5oZWlnaHQoKSkmJlwibm9uZVwiIT09ZS5jc3MoXCJkaXNwbGF5XCIpfWZ1bmN0aW9uIGYodCxlKXt0PXQucmVwbGFjZSgvPSNcXF0vZywnPVwiI1wiXScpO3ZhciBuLGkscj1zLmV4ZWModCk7aWYociYmclsyXWluIG8mJihuPW9bclsyXV0saT1yWzNdLHQ9clsxXSxpKSl7dmFyIGE9TnVtYmVyKGkpO2k9aXNOYU4oYSk/aS5yZXBsYWNlKC9eW1wiJ118W1wiJ10kL2csXCJcIik6YX1yZXR1cm4gZSh0LG4saSl9dmFyIGU9dC56ZXB0byxuPWUucXNhLGk9ZS5tYXRjaGVzLG89dC5leHByW1wiOlwiXT17dmlzaWJsZTpmdW5jdGlvbigpe3JldHVybiByKHRoaXMpP3RoaXM6dm9pZCAwfSxoaWRkZW46ZnVuY3Rpb24oKXtyZXR1cm4gcih0aGlzKT92b2lkIDA6dGhpc30sc2VsZWN0ZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zZWxlY3RlZD90aGlzOnZvaWQgMH0sY2hlY2tlZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNoZWNrZWQ/dGhpczp2b2lkIDB9LHBhcmVudDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnBhcmVudE5vZGV9LGZpcnN0OmZ1bmN0aW9uKHQpe3JldHVybiAwPT09dD90aGlzOnZvaWQgMH0sbGFzdDpmdW5jdGlvbih0LGUpe3JldHVybiB0PT09ZS5sZW5ndGgtMT90aGlzOnZvaWQgMH0sZXE6ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0PT09bj90aGlzOnZvaWQgMH0sY29udGFpbnM6ZnVuY3Rpb24oZSxuLGkpe3JldHVybiB0KHRoaXMpLnRleHQoKS5pbmRleE9mKGkpPi0xP3RoaXM6dm9pZCAwfSxoYXM6ZnVuY3Rpb24odCxuLGkpe3JldHVybiBlLnFzYSh0aGlzLGkpLmxlbmd0aD90aGlzOnZvaWQgMH19LHM9bmV3IFJlZ0V4cChcIiguKik6KFxcXFx3KykoPzpcXFxcKChbXildKylcXFxcKSk/JFxcXFxzKlwiKSxhPS9eXFxzKj4vLHU9XCJaZXB0b1wiKyArbmV3IERhdGU7ZS5xc2E9ZnVuY3Rpb24oaSxyKXtyZXR1cm4gZihyLGZ1bmN0aW9uKG8scyxmKXt0cnl7dmFyIGM7IW8mJnM/bz1cIipcIjphLnRlc3QobykmJihjPXQoaSkuYWRkQ2xhc3ModSksbz1cIi5cIit1K1wiIFwiK28pO3ZhciBsPW4oaSxvKX1jYXRjaChoKXt0aHJvdyBjb25zb2xlLmVycm9yKFwiZXJyb3IgcGVyZm9ybWluZyBzZWxlY3RvcjogJW9cIixyKSxofWZpbmFsbHl7YyYmYy5yZW1vdmVDbGFzcyh1KX1yZXR1cm4gcz9lLnVuaXEodC5tYXAobCxmdW5jdGlvbih0LGUpe3JldHVybiBzLmNhbGwodCxlLGwsZil9KSk6bH0pfSxlLm1hdGNoZXM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZihlLGZ1bmN0aW9uKGUsbixyKXtyZXR1cm4hKGUmJiFpKHQsZSl8fG4mJm4uY2FsbCh0LG51bGwscikhPT10KX0pfX0oWmVwdG8pLGZ1bmN0aW9uKCl7dHJ5e2dldENvbXB1dGVkU3R5bGUodm9pZCAwKX1jYXRjaCh0KXt2YXIgZT1nZXRDb21wdXRlZFN0eWxlO3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm4gZSh0KX1jYXRjaChuKXtyZXR1cm4gbnVsbH19fX0oKTtcbm1vZHVsZS5leHBvcnRzID0gWmVwdG87XG4iXX0=
