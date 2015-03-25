require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Player = require("./components/player");
var Mediator = require("mediator");
var Events = require("events");

window.DEBUG = false;

window.Clappr = { Player: Player, Mediator: Mediator, Events: Events };
window.Clappr.version = "0.0.108";

module.exports = window.Clappr;

},{"./components/player":60,"events":"events","mediator":"mediator"}],2:[function(require,module,exports){
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
/*global define:false */
/**
 * Copyright 2013 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.4.6
 * @url craig.is/killing/mice
 */
(function(window, document, undefined) {

    /**
     * mapping of special keycodes to their corresponding keys
     *
     * everything in this dictionary cannot use keypress events
     * so it has to be here to map to the correct keycodes for
     * keyup/keydown events
     *
     * @type {Object}
     */
    var _MAP = {
            8: 'backspace',
            9: 'tab',
            13: 'enter',
            16: 'shift',
            17: 'ctrl',
            18: 'alt',
            20: 'capslock',
            27: 'esc',
            32: 'space',
            33: 'pageup',
            34: 'pagedown',
            35: 'end',
            36: 'home',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            45: 'ins',
            46: 'del',
            91: 'meta',
            93: 'meta',
            224: 'meta'
        },

        /**
         * mapping for special characters so they can support
         *
         * this dictionary is only used incase you want to bind a
         * keyup or keydown event to one of these keys
         *
         * @type {Object}
         */
        _KEYCODE_MAP = {
            106: '*',
            107: '+',
            109: '-',
            110: '.',
            111 : '/',
            186: ';',
            187: '=',
            188: ',',
            189: '-',
            190: '.',
            191: '/',
            192: '`',
            219: '[',
            220: '\\',
            221: ']',
            222: '\''
        },

        /**
         * this is a mapping of keys that require shift on a US keypad
         * back to the non shift equivelents
         *
         * this is so you can use keyup events with these keys
         *
         * note that this will only work reliably on US keyboards
         *
         * @type {Object}
         */
        _SHIFT_MAP = {
            '~': '`',
            '!': '1',
            '@': '2',
            '#': '3',
            '$': '4',
            '%': '5',
            '^': '6',
            '&': '7',
            '*': '8',
            '(': '9',
            ')': '0',
            '_': '-',
            '+': '=',
            ':': ';',
            '\"': '\'',
            '<': ',',
            '>': '.',
            '?': '/',
            '|': '\\'
        },

        /**
         * this is a list of special strings you can use to map
         * to modifier keys when you specify your keyboard shortcuts
         *
         * @type {Object}
         */
        _SPECIAL_ALIASES = {
            'option': 'alt',
            'command': 'meta',
            'return': 'enter',
            'escape': 'esc',
            'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
        },

        /**
         * variable to store the flipped version of _MAP from above
         * needed to check if we should use keypress or not when no action
         * is specified
         *
         * @type {Object|undefined}
         */
        _REVERSE_MAP,

        /**
         * a list of all the callbacks setup via Mousetrap.bind()
         *
         * @type {Object}
         */
        _callbacks = {},

        /**
         * direct map of string combinations to callbacks used for trigger()
         *
         * @type {Object}
         */
        _directMap = {},

        /**
         * keeps track of what level each sequence is at since multiple
         * sequences can start out with the same sequence
         *
         * @type {Object}
         */
        _sequenceLevels = {},

        /**
         * variable to store the setTimeout call
         *
         * @type {null|number}
         */
        _resetTimer,

        /**
         * temporary state where we will ignore the next keyup
         *
         * @type {boolean|string}
         */
        _ignoreNextKeyup = false,

        /**
         * temporary state where we will ignore the next keypress
         *
         * @type {boolean}
         */
        _ignoreNextKeypress = false,

        /**
         * are we currently inside of a sequence?
         * type of action ("keyup" or "keydown" or "keypress") or false
         *
         * @type {boolean|string}
         */
        _nextExpectedAction = false;

    /**
     * loop through the f keys, f1 to f19 and add them to the map
     * programatically
     */
    for (var i = 1; i < 20; ++i) {
        _MAP[111 + i] = 'f' + i;
    }

    /**
     * loop through to map numbers on the numeric keypad
     */
    for (i = 0; i <= 9; ++i) {
        _MAP[i + 96] = i;
    }

    /**
     * cross browser add event method
     *
     * @param {Element|HTMLDocument} object
     * @param {string} type
     * @param {Function} callback
     * @returns void
     */
    function _addEvent(object, type, callback) {
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
            return;
        }

        object.attachEvent('on' + type, callback);
    }

    /**
     * takes the event and returns the key character
     *
     * @param {Event} e
     * @return {string}
     */
    function _characterFromEvent(e) {

        // for keypress events we should return the character as is
        if (e.type == 'keypress') {
            var character = String.fromCharCode(e.which);

            // if the shift key is not pressed then it is safe to assume
            // that we want the character to be lowercase.  this means if
            // you accidentally have caps lock on then your key bindings
            // will continue to work
            //
            // the only side effect that might not be desired is if you
            // bind something like 'A' cause you want to trigger an
            // event when capital A is pressed caps lock will no longer
            // trigger the event.  shift+a will though.
            if (!e.shiftKey) {
                character = character.toLowerCase();
            }

            return character;
        }

        // for non keypress events the special maps are needed
        if (_MAP[e.which]) {
            return _MAP[e.which];
        }

        if (_KEYCODE_MAP[e.which]) {
            return _KEYCODE_MAP[e.which];
        }

        // if it is not in the special map

        // with keydown and keyup events the character seems to always
        // come in as an uppercase character whether you are pressing shift
        // or not.  we should make sure it is always lowercase for comparisons
        return String.fromCharCode(e.which).toLowerCase();
    }

    /**
     * checks if two arrays are equal
     *
     * @param {Array} modifiers1
     * @param {Array} modifiers2
     * @returns {boolean}
     */
    function _modifiersMatch(modifiers1, modifiers2) {
        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
    }

    /**
     * resets all sequence counters except for the ones passed in
     *
     * @param {Object} doNotReset
     * @returns void
     */
    function _resetSequences(doNotReset) {
        doNotReset = doNotReset || {};

        var activeSequences = false,
            key;

        for (key in _sequenceLevels) {
            if (doNotReset[key]) {
                activeSequences = true;
                continue;
            }
            _sequenceLevels[key] = 0;
        }

        if (!activeSequences) {
            _nextExpectedAction = false;
        }
    }

    /**
     * finds all callbacks that match based on the keycode, modifiers,
     * and action
     *
     * @param {string} character
     * @param {Array} modifiers
     * @param {Event|Object} e
     * @param {string=} sequenceName - name of the sequence we are looking for
     * @param {string=} combination
     * @param {number=} level
     * @returns {Array}
     */
    function _getMatches(character, modifiers, e, sequenceName, combination, level) {
        var i,
            callback,
            matches = [],
            action = e.type;

        // if there are no events related to this keycode
        if (!_callbacks[character]) {
            return [];
        }

        // if a modifier key is coming up on its own we should allow it
        if (action == 'keyup' && _isModifier(character)) {
            modifiers = [character];
        }

        // loop through all callbacks for the key that was pressed
        // and see if any of them match
        for (i = 0; i < _callbacks[character].length; ++i) {
            callback = _callbacks[character][i];

            // if a sequence name is not specified, but this is a sequence at
            // the wrong level then move onto the next match
            if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
                continue;
            }

            // if the action we are looking for doesn't match the action we got
            // then we should keep going
            if (action != callback.action) {
                continue;
            }

            // if this is a keypress event and the meta key and control key
            // are not pressed that means that we need to only look at the
            // character, otherwise check the modifiers as well
            //
            // chrome will not fire a keypress if meta or control is down
            // safari will fire a keypress if meta or meta+shift is down
            // firefox will fire a keypress if meta or control is down
            if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {

                // when you bind a combination or sequence a second time it
                // should overwrite the first one.  if a sequenceName or
                // combination is specified in this call it does just that
                //
                // @todo make deleting its own method?
                var deleteCombo = !sequenceName && callback.combo == combination;
                var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
                if (deleteCombo || deleteSequence) {
                    _callbacks[character].splice(i, 1);
                }

                matches.push(callback);
            }
        }

        return matches;
    }

    /**
     * takes a key event and figures out what the modifiers are
     *
     * @param {Event} e
     * @returns {Array}
     */
    function _eventModifiers(e) {
        var modifiers = [];

        if (e.shiftKey) {
            modifiers.push('shift');
        }

        if (e.altKey) {
            modifiers.push('alt');
        }

        if (e.ctrlKey) {
            modifiers.push('ctrl');
        }

        if (e.metaKey) {
            modifiers.push('meta');
        }

        return modifiers;
    }

    /**
     * prevents default for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _preventDefault(e) {
        if (e.preventDefault) {
            e.preventDefault();
            return;
        }

        e.returnValue = false;
    }

    /**
     * stops propogation for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _stopPropagation(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
            return;
        }

        e.cancelBubble = true;
    }

    /**
     * actually calls the callback function
     *
     * if your callback function returns false this will use the jquery
     * convention - prevent default and stop propogation on the event
     *
     * @param {Function} callback
     * @param {Event} e
     * @returns void
     */
    function _fireCallback(callback, e, combo, sequence) {

        // if this event should not happen stop here
        if (Mousetrap.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
            return;
        }

        if (callback(e, combo) === false) {
            _preventDefault(e);
            _stopPropagation(e);
        }
    }

    /**
     * handles a character key event
     *
     * @param {string} character
     * @param {Array} modifiers
     * @param {Event} e
     * @returns void
     */
    function _handleKey(character, modifiers, e) {
        var callbacks = _getMatches(character, modifiers, e),
            i,
            doNotReset = {},
            maxLevel = 0,
            processedSequenceCallback = false;

        // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
        for (i = 0; i < callbacks.length; ++i) {
            if (callbacks[i].seq) {
                maxLevel = Math.max(maxLevel, callbacks[i].level);
            }
        }

        // loop through matching callbacks for this key event
        for (i = 0; i < callbacks.length; ++i) {

            // fire for all sequence callbacks
            // this is because if for example you have multiple sequences
            // bound such as "g i" and "g t" they both need to fire the
            // callback for matching g cause otherwise you can only ever
            // match the first one
            if (callbacks[i].seq) {

                // only fire callbacks for the maxLevel to prevent
                // subsequences from also firing
                //
                // for example 'a option b' should not cause 'option b' to fire
                // even though 'option b' is part of the other sequence
                //
                // any sequences that do not match here will be discarded
                // below by the _resetSequences call
                if (callbacks[i].level != maxLevel) {
                    continue;
                }

                processedSequenceCallback = true;

                // keep a list of which sequences were matches for later
                doNotReset[callbacks[i].seq] = 1;
                _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
                continue;
            }

            // if there were no sequence matches but we are still here
            // that means this is a regular match so we should fire that
            if (!processedSequenceCallback) {
                _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
            }
        }

        // if the key you pressed matches the type of sequence without
        // being a modifier (ie "keyup" or "keypress") then we should
        // reset all sequences that were not matched by this event
        //
        // this is so, for example, if you have the sequence "h a t" and you
        // type "h e a r t" it does not match.  in this case the "e" will
        // cause the sequence to reset
        //
        // modifier keys are ignored because you can have a sequence
        // that contains modifiers such as "enter ctrl+space" and in most
        // cases the modifier key will be pressed before the next key
        //
        // also if you have a sequence such as "ctrl+b a" then pressing the
        // "b" key will trigger a "keypress" and a "keydown"
        //
        // the "keydown" is expected when there is a modifier, but the
        // "keypress" ends up matching the _nextExpectedAction since it occurs
        // after and that causes the sequence to reset
        //
        // we ignore keypresses in a sequence that directly follow a keydown
        // for the same character
        var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
        if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
            _resetSequences(doNotReset);
        }

        _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
    }

    /**
     * handles a keydown event
     *
     * @param {Event} e
     * @returns void
     */
    function _handleKeyEvent(e) {

        // normalize e.which for key events
        // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
        if (typeof e.which !== 'number') {
            e.which = e.keyCode;
        }

        var character = _characterFromEvent(e);

        // no character found then stop
        if (!character) {
            return;
        }

        // need to use === for the character check because the character can be 0
        if (e.type == 'keyup' && _ignoreNextKeyup === character) {
            _ignoreNextKeyup = false;
            return;
        }

        Mousetrap.handleKey(character, _eventModifiers(e), e);
    }

    /**
     * determines if the keycode specified is a modifier key or not
     *
     * @param {string} key
     * @returns {boolean}
     */
    function _isModifier(key) {
        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
    }

    /**
     * called to set a 1 second timeout on the specified sequence
     *
     * this is so after each key press in the sequence you have 1 second
     * to press the next key before you have to start over
     *
     * @returns void
     */
    function _resetSequenceTimer() {
        clearTimeout(_resetTimer);
        _resetTimer = setTimeout(_resetSequences, 1000);
    }

    /**
     * reverses the map lookup so that we can look for specific keys
     * to see what can and can't use keypress
     *
     * @return {Object}
     */
    function _getReverseMap() {
        if (!_REVERSE_MAP) {
            _REVERSE_MAP = {};
            for (var key in _MAP) {

                // pull out the numeric keypad from here cause keypress should
                // be able to detect the keys from the character
                if (key > 95 && key < 112) {
                    continue;
                }

                if (_MAP.hasOwnProperty(key)) {
                    _REVERSE_MAP[_MAP[key]] = key;
                }
            }
        }
        return _REVERSE_MAP;
    }

    /**
     * picks the best action based on the key combination
     *
     * @param {string} key - character for key
     * @param {Array} modifiers
     * @param {string=} action passed in
     */
    function _pickBestAction(key, modifiers, action) {

        // if no action was picked in we should try to pick the one
        // that we think would work best for this key
        if (!action) {
            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
        }

        // modifier keys don't work as expected with keypress,
        // switch to keydown
        if (action == 'keypress' && modifiers.length) {
            action = 'keydown';
        }

        return action;
    }

    /**
     * binds a key sequence to an event
     *
     * @param {string} combo - combo specified in bind call
     * @param {Array} keys
     * @param {Function} callback
     * @param {string=} action
     * @returns void
     */
    function _bindSequence(combo, keys, callback, action) {

        // start off by adding a sequence level record for this combination
        // and setting the level to 0
        _sequenceLevels[combo] = 0;

        /**
         * callback to increase the sequence level for this sequence and reset
         * all other sequences that were active
         *
         * @param {string} nextAction
         * @returns {Function}
         */
        function _increaseSequence(nextAction) {
            return function() {
                _nextExpectedAction = nextAction;
                ++_sequenceLevels[combo];
                _resetSequenceTimer();
            };
        }

        /**
         * wraps the specified callback inside of another function in order
         * to reset all sequence counters as soon as this sequence is done
         *
         * @param {Event} e
         * @returns void
         */
        function _callbackAndReset(e) {
            _fireCallback(callback, e, combo);

            // we should ignore the next key up if the action is key down
            // or keypress.  this is so if you finish a sequence and
            // release the key the final key will not trigger a keyup
            if (action !== 'keyup') {
                _ignoreNextKeyup = _characterFromEvent(e);
            }

            // weird race condition if a sequence ends with the key
            // another sequence begins with
            setTimeout(_resetSequences, 10);
        }

        // loop through keys one at a time and bind the appropriate callback
        // function.  for any key leading up to the final one it should
        // increase the sequence. after the final, it should reset all sequences
        //
        // if an action is specified in the original bind call then that will
        // be used throughout.  otherwise we will pass the action that the
        // next key in the sequence should match.  this allows a sequence
        // to mix and match keypress and keydown events depending on which
        // ones are better suited to the key provided
        for (var i = 0; i < keys.length; ++i) {
            var isFinal = i + 1 === keys.length;
            var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
            _bindSingle(keys[i], wrappedCallback, action, combo, i);
        }
    }

    /**
     * Converts from a string key combination to an array
     *
     * @param  {string} combination like "command+shift+l"
     * @return {Array}
     */
    function _keysFromString(combination) {
        if (combination === '+') {
            return ['+'];
        }

        return combination.split('+');
    }

    /**
     * Gets info for a specific key combination
     *
     * @param  {string} combination key combination ("command+s" or "a" or "*")
     * @param  {string=} action
     * @returns {Object}
     */
    function _getKeyInfo(combination, action) {
        var keys,
            key,
            i,
            modifiers = [];

        // take the keys from this pattern and figure out what the actual
        // pattern is all about
        keys = _keysFromString(combination);

        for (i = 0; i < keys.length; ++i) {
            key = keys[i];

            // normalize key names
            if (_SPECIAL_ALIASES[key]) {
                key = _SPECIAL_ALIASES[key];
            }

            // if this is not a keypress event then we should
            // be smart about using shift keys
            // this will only work for US keyboards however
            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
                key = _SHIFT_MAP[key];
                modifiers.push('shift');
            }

            // if this key is a modifier then add it to the list of modifiers
            if (_isModifier(key)) {
                modifiers.push(key);
            }
        }

        // depending on what the key combination is
        // we will try to pick the best event for it
        action = _pickBestAction(key, modifiers, action);

        return {
            key: key,
            modifiers: modifiers,
            action: action
        };
    }

    /**
     * binds a single keyboard combination
     *
     * @param {string} combination
     * @param {Function} callback
     * @param {string=} action
     * @param {string=} sequenceName - name of sequence if part of sequence
     * @param {number=} level - what part of the sequence the command is
     * @returns void
     */
    function _bindSingle(combination, callback, action, sequenceName, level) {

        // store a direct mapped reference for use with Mousetrap.trigger
        _directMap[combination + ':' + action] = callback;

        // make sure multiple spaces in a row become a single space
        combination = combination.replace(/\s+/g, ' ');

        var sequence = combination.split(' '),
            info;

        // if this pattern is a sequence of keys then run through this method
        // to reprocess each pattern one key at a time
        if (sequence.length > 1) {
            _bindSequence(combination, sequence, callback, action);
            return;
        }

        info = _getKeyInfo(combination, action);

        // make sure to initialize array if this is the first time
        // a callback is added for this key
        _callbacks[info.key] = _callbacks[info.key] || [];

        // remove an existing match if there is one
        _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);

        // add this call back to the array
        // if it is a sequence put it at the beginning
        // if not put it at the end
        //
        // this is important because the way these are processed expects
        // the sequence ones to come first
        _callbacks[info.key][sequenceName ? 'unshift' : 'push']({
            callback: callback,
            modifiers: info.modifiers,
            action: info.action,
            seq: sequenceName,
            level: level,
            combo: combination
        });
    }

    /**
     * binds multiple combinations to the same callback
     *
     * @param {Array} combinations
     * @param {Function} callback
     * @param {string|undefined} action
     * @returns void
     */
    function _bindMultiple(combinations, callback, action) {
        for (var i = 0; i < combinations.length; ++i) {
            _bindSingle(combinations[i], callback, action);
        }
    }

    // start!
    _addEvent(document, 'keypress', _handleKeyEvent);
    _addEvent(document, 'keydown', _handleKeyEvent);
    _addEvent(document, 'keyup', _handleKeyEvent);

    var Mousetrap = {

        /**
         * binds an event to mousetrap
         *
         * can be a single key, a combination of keys separated with +,
         * an array of keys, or a sequence of keys separated by spaces
         *
         * be sure to list the modifier keys first to make sure that the
         * correct key ends up getting bound (the last key in the pattern)
         *
         * @param {string|Array} keys
         * @param {Function} callback
         * @param {string=} action - 'keypress', 'keydown', or 'keyup'
         * @returns void
         */
        bind: function(keys, callback, action) {
            keys = keys instanceof Array ? keys : [keys];
            _bindMultiple(keys, callback, action);
            return this;
        },

        /**
         * unbinds an event to mousetrap
         *
         * the unbinding sets the callback function of the specified key combo
         * to an empty function and deletes the corresponding key in the
         * _directMap dict.
         *
         * TODO: actually remove this from the _callbacks dictionary instead
         * of binding an empty function
         *
         * the keycombo+action has to be exactly the same as
         * it was defined in the bind method
         *
         * @param {string|Array} keys
         * @param {string} action
         * @returns void
         */
        unbind: function(keys, action) {
            return Mousetrap.bind(keys, function() {}, action);
        },

        /**
         * triggers an event that has already been bound
         *
         * @param {string} keys
         * @param {string=} action
         * @returns void
         */
        trigger: function(keys, action) {
            if (_directMap[keys + ':' + action]) {
                _directMap[keys + ':' + action]({}, keys);
            }
            return this;
        },

        /**
         * resets the library back to its initial state.  this is useful
         * if you want to clear out the current keyboard shortcuts and bind
         * new ones - for example if you switch to another page
         *
         * @returns void
         */
        reset: function() {
            _callbacks = {};
            _directMap = {};
            return this;
        },

       /**
        * should we stop this event before firing off callbacks
        *
        * @param {Event} e
        * @param {Element} element
        * @return {boolean}
        */
        stopCallback: function(e, element) {

            // if the element has the class "mousetrap" then no need to stop
            if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
                return false;
            }

            // stop for input, select, and textarea
            return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
        },

        /**
         * exposes _handleKey publicly so it can be overwritten by extensions
         */
        handleKey: _handleKey
    };

    // expose mousetrap to the global object
    window.Mousetrap = Mousetrap;

    // expose mousetrap as an AMD module
    if (typeof define === 'function' && define.amd) {
        define(Mousetrap);
    }
}) (window, document);

},{}],48:[function(require,module,exports){
"use strict";

//This file is generated by bin/hook.js
var template = require("template");
module.exports = { media_control: template("<div class=\"media-control-background\" data-background></div><div class=\"media-control-layer\" data-controls><% var renderBar=function(name) { %><div class=\"bar-container\" data-<%= name %>><div class=\"bar-background\" data-<%= name %>><div class=\"bar-fill-1\" data-<%= name %>></div><div class=\"bar-fill-2\" data-<%= name %>></div><div class=\"bar-hover\" data-<%= name %>></div></div><div class=\"bar-scrubber\" data-<%= name %>><div class=\"bar-scrubber-icon\" data-<%= name %>></div></div></div><% }; %><% var renderSegmentedBar=function(name, segments) { segments=segments || 10; %><div class=\"bar-container\" data-<%= name %>><% for (var i = 0; i < segments; i++) { %><div class=\"segmented-bar-element\" data-<%= name %>></div><% } %></div><% }; %><% var renderDrawer=function(name, renderContent) { %><div class=\"drawer-container\" data-<%= name %>><div class=\"drawer-icon-container\" data-<%= name %>><div class=\"drawer-icon media-control-icon\" data-<%= name %>></div><span class=\"drawer-text\" data-<%= name %>></span></div><% renderContent(name); %></div><% }; %><% var renderIndicator=function(name) { %><div class=\"media-control-indicator\" data-<%= name %>></div><% }; %><% var renderButton=function(name) { %><button class=\"media-control-button media-control-icon\" data-<%= name %>></button><% }; %><% var templates={ bar: renderBar, segmentedBar: renderSegmentedBar, }; var render=function(settingsList) { settingsList.forEach(function(setting) { if(setting === \"seekbar\") { renderBar(setting); } else if (setting === \"volume\") { renderDrawer(setting, settings.volumeBarTemplate ? templates[settings.volumeBarTemplate] : function(name) { return renderSegmentedBar(name); }); } else if (setting === \"duration\" || setting=== \"position\") { renderIndicator(setting); } else { renderButton(setting); } }); }; %><% if (settings.default && settings.default.length) { %><div class=\"media-control-center-panel\" data-media-control><% render(settings.default); %></div><% } %><% if (settings.left && settings.left.length) { %><div class=\"media-control-left-panel\" data-media-control><% render(settings.left); %></div><% } %><% if (settings.right && settings.right.length) { %><div class=\"media-control-right-panel\" data-media-control><% render(settings.right); %></div><% } %></div>"), seek_time: template("<span data-seek-time></span>"), flash: template("<param name=\"movie\" value=\"<%= baseUrl %>/assets/Player.swf\"><param name=\"quality\" value=\"autohigh\"><param name=\"swliveconnect\" value=\"true\"><param name=\"allowScriptAccess\" value=\"always\"><param name=\"bgcolor\" value=\"#001122\"><param name=\"allowFullScreen\" value=\"false\"><param name=\"wmode\" value=\"transparent\"><param name=\"tabindex\" value=\"1\"><param name=FlashVars value=\"playbackId=<%= playbackId %>\" /><embed type=\"application/x-shockwave-flash\" disabled tabindex=\"-1\" enablecontextmenu=\"false\" allowScriptAccess=\"always\" quality=\"autohight\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" wmode=\"transparent\" swliveconnect=\"true\" type=\"application/x-shockwave-flash\" allowfullscreen=\"false\" bgcolor=\"#000000\" FlashVars=\"playbackId=<%= playbackId %>\" src=\"<%= baseUrl %>/assets/Player.swf\"></embed>"), hls: template("<param name=\"movie\" value=\"<%= baseUrl %>/assets/HLSPlayer.swf?inline=1\"><param name=\"quality\" value=\"autohigh\"><param name=\"swliveconnect\" value=\"true\"><param name=\"allowScriptAccess\" value=\"always\"><param name=\"bgcolor\" value=\"#001122\"><param name=\"allowFullScreen\" value=\"false\"><param name=\"wmode\" value=\"transparent\"><param name=\"tabindex\" value=\"1\"><param name=FlashVars value=\"playbackId=<%= playbackId %>\" /><embed type=\"application/x-shockwave-flash\" tabindex=\"1\" enablecontextmenu=\"false\" allowScriptAccess=\"always\" quality=\"autohigh\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" wmode=\"transparent\" swliveconnect=\"true\" type=\"application/x-shockwave-flash\" allowfullscreen=\"false\" bgcolor=\"#000000\" FlashVars=\"playbackId=<%= playbackId %>\" src=\"<%= baseUrl %>/assets/HLSPlayer.swf\" width=\"100%\" height=\"100%\"></embed>"), html5_video: template("<source src=\"<%=src%>\" type=\"<%=type%>\">"), no_op: template("<canvas data-no-op-canvas></canvas><p data-no-op-msg>Your browser does not support the playback of this video. Try to use a different browser.<p>"), background_button: template("<div class=\"background-button-wrapper\" data-background-button><button class=\"background-button-icon\" data-background-button></button></div>"), dvr_controls: template("<div class=\"live-info\">LIVE</div><button class=\"live-button\">BACK TO LIVE</button>"), poster: template("<div class=\"play-wrapper\" data-poster><span class=\"poster-icon play\" data-poster/></div>"), spinner_three_bounce: template("<div data-bounce1></div><div data-bounce2></div><div data-bounce3></div>"), watermark: template("<div data-watermark data-watermark-<%=position %>><img src=\"<%= imageUrl %>\"></div>"), CSS: { container: ".container[data-container]{position:absolute;background-color:#000;height:100%;width:100%}.container[data-container].pointer-enabled{cursor:pointer}", core: "[data-player]{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0);position:relative;margin:0;padding:0;border:0;font-style:normal;font-weight:400;text-align:center;overflow:hidden;font-size:100%;font-family:\"lucida grande\",tahoma,verdana,arial,sans-serif;text-shadow:0 0 0;box-sizing:border-box}[data-player] a,[data-player] abbr,[data-player] acronym,[data-player] address,[data-player] applet,[data-player] article,[data-player] aside,[data-player] audio,[data-player] b,[data-player] big,[data-player] blockquote,[data-player] canvas,[data-player] caption,[data-player] center,[data-player] cite,[data-player] code,[data-player] dd,[data-player] del,[data-player] details,[data-player] dfn,[data-player] div,[data-player] dl,[data-player] dt,[data-player] em,[data-player] embed,[data-player] fieldset,[data-player] figcaption,[data-player] figure,[data-player] footer,[data-player] form,[data-player] h1,[data-player] h2,[data-player] h3,[data-player] h4,[data-player] h5,[data-player] h6,[data-player] header,[data-player] hgroup,[data-player] i,[data-player] iframe,[data-player] img,[data-player] ins,[data-player] kbd,[data-player] label,[data-player] legend,[data-player] li,[data-player] mark,[data-player] menu,[data-player] nav,[data-player] object,[data-player] ol,[data-player] output,[data-player] p,[data-player] pre,[data-player] q,[data-player] ruby,[data-player] s,[data-player] samp,[data-player] section,[data-player] small,[data-player] span,[data-player] strike,[data-player] strong,[data-player] sub,[data-player] summary,[data-player] sup,[data-player] table,[data-player] tbody,[data-player] td,[data-player] tfoot,[data-player] th,[data-player] thead,[data-player] time,[data-player] tr,[data-player] tt,[data-player] u,[data-player] ul,[data-player] var,[data-player] video{margin:0;padding:0;border:0;font:inherit;font-size:100%;vertical-align:baseline}[data-player] table{border-collapse:collapse;border-spacing:0}[data-player] caption,[data-player] td,[data-player] th{text-align:left;font-weight:400;vertical-align:middle}[data-player] blockquote,[data-player] q{quotes:none}[data-player] blockquote:after,[data-player] blockquote:before,[data-player] q:after,[data-player] q:before{content:\"\";content:none}[data-player] a img{border:none}[data-player] *{max-width:initial;box-sizing:inherit;float:initial}[data-player].fullscreen{width:100%!important;height:100%!important}[data-player].nocursor{cursor:none}.clappr-style{display:none!important}@media screen{[data-player]{opacity:.99}}", media_control: "@font-face{font-family:Player;src:url(\"<%= baseUrl %>/assets/Player-Regular.eot\");src:url(\"<%= baseUrl %>/assets/Player-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"<%= baseUrl %>/assets/Player-Regular.ttf\") format(\"truetype\"),url(\"<%= baseUrl %>/assets/Player-Regular.svg#player\") format(\"svg\")}.media-control-notransition{-webkit-transition:none!important;-webkit-transition-delay:0s;-moz-transition:none!important;-o-transition:none!important;transition:none!important}.media-control[data-media-control]{position:absolute;width:100%;height:100%;z-index:9999;pointer-events:none}.media-control[data-media-control].dragging{pointer-events:auto;cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control].dragging *{cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control] .media-control-background[data-background]{position:absolute;height:40%;width:100%;bottom:0;background-image:-owg(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-webkit(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-moz(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-o(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9));-webkit-transition:opacity .6s;-webkit-transition-delay:ease-out;-moz-transition:opacity .6s ease-out;-o-transition:opacity .6s ease-out;transition:opacity .6s ease-out}.media-control[data-media-control] .media-control-icon{font-family:Player;font-weight:400;font-style:normal;font-size:26px;line-height:32px;letter-spacing:0;speak:none;color:#fff;opacity:.5;vertical-align:middle;text-align:left;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.media-control[data-media-control] .media-control-icon:hover{color:#fff;opacity:.75;text-shadow:rgba(255,255,255,.8) 0 0 5px}.media-control[data-media-control].media-control-hide .media-control-background[data-background]{opacity:0}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls]{bottom:-50px}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls]{position:absolute;bottom:7px;width:100%;height:32px;vertical-align:middle;pointer-events:auto;-webkit-transition:bottom .4s;-webkit-transition-delay:ease-out;-moz-transition:bottom .4s ease-out;-o-transition:bottom .4s ease-out;transition:bottom .4s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-left-panel[data-media-control]{position:absolute;top:0;left:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-center-panel[data-media-control]{height:100%;text-align:center;line-height:32px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-right-panel[data-media-control]{position:absolute;top:0;right:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button{background-color:transparent;border:0;margin:0 6px;padding:0;cursor:pointer;display:inline-block}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button:focus{outline:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]:before{content:\"\\e002\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]:before{content:\"\\e003\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]{float:right;background-color:transparent;border:0;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]:before{content:\"\\e006\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen].shrink:before{content:\"\\e007\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]{cursor:default;float:right;background-color:transparent;border:0;height:100%;opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]:before{content:\"\\e008\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled:hover{opacity:1;text-shadow:none}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].playing:before{content:\"\\e002\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].paused:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].playing:before{content:\"\\e003\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].stopped:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration],.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{display:inline-block;font-size:10px;color:#fff;cursor:default;line-height:32px;position:relative}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{margin-left:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]{color:rgba(255,255,255,.5);margin-right:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]:before{content:\"|\";margin:0 3px}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]{position:absolute;top:-20px;left:0;display:inline-block;vertical-align:middle;width:100%;height:25px;cursor:pointer}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar]{width:100%;height:1px;position:relative;top:12px;background-color:#666}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-1[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#c2c2c2;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#005aff;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0;position:absolute;top:-3px;width:5px;height:7px;background-color:rgba(255,255,255,.5);-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled{cursor:default}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{position:absolute;top:2px;left:0;width:20px;height:20px;opacity:1;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] .bar-scrubber-icon[data-seekbar]{position:absolute;left:6px;top:6px;width:8px;height:8px;border-radius:10px;box-shadow:0 0 0 6px rgba(255,255,255,.2);background-color:#fff}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume]{float:right;display:inline-block;height:32px;cursor:pointer;margin:0 6px;box-sizing:border-box}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume]{float:left;bottom:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]{background-color:transparent;border:0;box-sizing:content-box;width:16px;height:32px;margin-right:6px;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:hover{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:before{content:\"\\e004\"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted{opacity:.5}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:hover{opacity:.7}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:before{content:\"\\e005\"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume]{float:left;position:relative;top:6px;width:42px;height:18px;padding:3px 0;overflow:hidden;-webkit-transition:width .2s;-webkit-transition-delay:ease-out;-moz-transition:width .2s ease-out;-o-transition:width .2s ease-out;transition:width .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]{float:left;width:4px;padding-left:2px;height:12px;opacity:.5;-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;-webkit-transition:-webkit-transform .2s;-webkit-transition-delay:ease-out;-moz-transition:-moz-transform .2s ease-out;-o-transition:-o-transform .2s ease-out;transition:transform .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume].fill{-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:nth-of-type(1){padding-left:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:hover{-webkit-transform:scaleY(1.5);-moz-transform:scaleY(1.5);-ms-transform:scaleY(1.5);-o-transform:scaleY(1.5);transform:scaleY(1.5)}.media-control[data-media-control].w320 .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume].volume-bar-hide{height:12px;top:9px;padding:0;width:0}", seek_time: ".seek-time[data-seek-time]{position:absolute;width:auto;height:20px;line-height:20px;bottom:55px;background-color:rgba(2,2,2,.5);z-index:9999;-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.seek-time[data-seek-time].hidden[data-seek-time]{opacity:0}.seek-time[data-seek-time] span[data-seek-time]{position:relative;color:#fff;font-size:10px;padding-left:7px;padding-right:7px}", flash: "[data-flash]{position:absolute;height:100%;width:100%;background-color:#000;display:block;pointer-events:none}", hls: "[data-hls]{position:absolute;display:block;pointer-events:none;top:0}", html5_video: "[data-html5-video]{position:absolute;height:100%;width:100%;display:block}", html_img: "[data-html-img]{max-width:100%;max-height:100%}", no_op: "[data-no-op]{z-index:1000;position:absolute;height:100%;width:100%;text-align:center}[data-no-op] p[data-no-op-msg]{position:absolute;font-size:25px;top:40%;color:#fff}[data-no-op] canvas[data-no-op-canvas]{background-color:#777;height:100%;width:100%}", background_button: ".background-button[data-background-button]{font-family:Player;position:absolute;height:100%;width:100%;background-color:rgba(0,0,0,.2);pointer-events:none;-webkit-transition:all .4s;-webkit-transition-delay:ease-out;-moz-transition:all .4s ease-out;-o-transition:all .4s ease-out;transition:all .4s ease-out}.background-button[data-background-button].hide{background-color:transparent}.background-button[data-background-button].hide .background-button-wrapper[data-background-button]{opacity:0}.background-button[data-background-button] .background-button-wrapper[data-background-button]{position:absolute;overflow:hidden;width:100%;height:25%;line-height:100%;font-size:25%;top:50%;text-align:center}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button]{cursor:pointer;pointer-events:auto;font-family:Player;font-weight:400;font-style:normal;line-height:1;letter-spacing:0;speak:none;color:#fff;opacity:.75;border:0;outline:0;background-color:transparent;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button]:hover{opacity:1;text-shadow:rgba(255,255,255,.8) 0 0 15px}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playing:before{content:\"\\e002\"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].notplaying:before{content:\"\\e001\"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playstop.playing:before{content:\"\\e003\"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playstop.notplaying:before{content:\"\\e001\"}.media-control.media-control-hide[data-media-control] .background-button[data-background-button]{opacity:0}", dvr_controls: "@import url(http://fonts.googleapis.com/css?family=Roboto);.dvr-controls[data-dvr-controls]{display:inline-block;float:left;color:#fff;line-height:32px;font-size:10px;font-weight:700;margin-left:6px}.dvr-controls[data-dvr-controls] .live-info{cursor:default;font-family:Roboto,\"Open Sans\",Arial,sans-serif}.dvr-controls[data-dvr-controls] .live-info:before{content:\"\";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#ff0101}.dvr-controls[data-dvr-controls] .live-info.disabled{opacity:.3}.dvr-controls[data-dvr-controls] .live-info.disabled:before{background-color:#fff}.dvr-controls[data-dvr-controls] .live-button{cursor:pointer;outline:0;display:none;border:0;color:#fff;background-color:transparent;height:32px;padding:0;opacity:.7;font-family:Roboto,\"Open Sans\",Arial,sans-serif;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.dvr-controls[data-dvr-controls] .live-button:before{content:\"\";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#fff}.dvr-controls[data-dvr-controls] .live-button:hover{opacity:1;text-shadow:rgba(255,255,255,.75) 0 0 5px}.dvr .dvr-controls[data-dvr-controls] .live-info{display:none}.dvr .dvr-controls[data-dvr-controls] .live-button{display:block}.dvr.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#005aff}.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#ff0101}.seek-time[data-seek-time] span[data-duration]{position:relative;color:rgba(255,255,255,.5);font-size:10px;padding-right:7px}.seek-time[data-seek-time] span[data-duration]:before{content:\"|\";margin-right:7px}", poster: "@font-face{font-family:Player;src:url(\"<%= baseUrl %>/assets/Player-Regular.eot\");src:url(\"<%= baseUrl %>/assets/Player-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"<%= baseUrl %>/assets/Player-Regular.ttf\") format(\"truetype\"),url(\"<%= baseUrl %>/assets/Player-Regular.svg#player\") format(\"svg\")}.player-poster[data-poster]{cursor:pointer;position:absolute;height:100%;width:100%;z-index:998;top:0}.player-poster[data-poster] .poster-background[data-poster]{width:100%;height:100%;background-size:cover;background-repeat:no-repeat;background-position:50% 50%}.player-poster[data-poster] .play-wrapper[data-poster]{position:absolute;width:100%;height:25%;line-height:100%;font-size:25%;top:50%;text-align:center}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]{font-family:Player;font-weight:400;font-style:normal;line-height:1;letter-spacing:0;speak:none;color:#fff;opacity:.75;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:opacity text-shadow;-webkit-transition-delay:.1s;-moz-transition:opacity text-shadow .1s;-o-transition:opacity text-shadow .1s;transition:opacity text-shadow .1s ease}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster].play[data-poster]:before{content:\"\\e001\"}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]:hover{opacity:1;text-shadow:rgba(255,255,255,.8) 0 0 15px}", spinner_three_bounce: ".spinner-three-bounce[data-spinner]{position:absolute;margin:0 auto;width:70px;text-align:center;z-index:999;top:47%;left:0;right:0}.spinner-three-bounce[data-spinner]>div{width:18px;height:18px;background-color:#FFF;border-radius:100%;display:inline-block;-webkit-animation:bouncedelay 1.4s infinite ease-in-out;-moz-animation:bouncedelay 1.4s infinite ease-in-out;-ms-animation:bouncedelay 1.4s infinite ease-in-out;-o-animation:bouncedelay 1.4s infinite ease-in-out;animation:bouncedelay 1.4s infinite ease-in-out;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both}.spinner-three-bounce[data-spinner] [data-bounce1],.spinner-three-bounce[data-spinner] [data-bounce2]{-webkit-animation-delay:-.32s;-moz-animation-delay:-.32s;-ms-animation-delay:-.32s;-o-animation-delay:-.32s;animation-delay:-.32s}@-moz-keyframes bouncedelay{0%,100%,80%{-moz-transform:scale(0);transform:scale(0)}40%{-moz-transform:scale(1);transform:scale(1)}}@-webkit-keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@-o-keyframes bouncedelay{0%,100%,80%{-o-transform:scale(0);transform:scale(0)}40%{-o-transform:scale(1);transform:scale(1)}}@-ms-keyframes bouncedelay{0%,100%,80%{-ms-transform:scale(0);transform:scale(0)}40%{-ms-transform:scale(1);transform:scale(1)}}@keyframes bouncedelay{0%,100%,80%{transform:scale(0)}40%{transform:scale(1)}}", watermark: "[data-watermark]{position:absolute;margin:100px auto 0;width:70px;text-align:center;z-index:10}[data-watermark-bottom-left]{bottom:10px;left:10px}[data-watermark-bottom-right]{bottom:10px;right:42px}[data-watermark-top-left]{top:-95px;left:10px}[data-watermark-top-right]{top:-95px;right:37px}" } };

},{"template":"template"}],49:[function(require,module,exports){
"use strict";

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

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

},{"./jst":48,"template":"template","zepto":"zepto"}],50:[function(require,module,exports){
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

},{"browser":"browser","lodash.assign":2}],51:[function(require,module,exports){
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

},{"../../base/styler":49,"events":"events","lodash.find":12,"ui_object":"ui_object"}],52:[function(require,module,exports){
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

},{"base_object":"base_object","container":"container","events":"events","lodash.assign":2,"lodash.find":12,"zepto":"zepto"}],53:[function(require,module,exports){
"use strict";

module.exports = require("./container_factory");

},{"./container_factory":52}],54:[function(require,module,exports){
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

},{"../../base/styler":49,"../../base/utils":50,"../container_factory":53,"events":"events","lodash.assign":2,"lodash.find":12,"media_control":"media_control","mediator":"mediator","player_info":"player_info","ui_object":"ui_object","zepto":"zepto"}],55:[function(require,module,exports){
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

},{"base_object":"base_object","core":"core"}],56:[function(require,module,exports){
"use strict";

module.exports = require("./core_factory");

},{"./core_factory":55}],57:[function(require,module,exports){
"use strict";

module.exports = require("./loader");

},{"./loader":58}],58:[function(require,module,exports){
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

},{"../../playbacks/no_op":68,"../../plugins/click_to_pause":71,"../../plugins/dvr_controls":73,"../../plugins/google_analytics":75,"../../plugins/spinner_three_bounce":79,"../../plugins/stats":81,"../../plugins/watermark":83,"base_object":"base_object","flash":"flash","hls":"hls","html5_audio":"html5_audio","html5_video":"html5_video","html_img":"html_img","lodash.uniq":31,"player_info":"player_info","poster":"poster"}],59:[function(require,module,exports){
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
require("mousetrap");

var MediaControl = (function (_UIObject) {
  function MediaControl(options) {
    var _this = this;

    _classCallCheck(this, MediaControl);

    _get(Object.getPrototypeOf(MediaControl.prototype), "constructor", this).call(this, options);
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

        Mousetrap.bind(["space"], function () {
          return _this.togglePlayPause();
        });
      }
    },
    unbindKeyEvents: {
      value: function unbindKeyEvents() {
        Mousetrap.unbind("space");
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

},{"../../base/jst":48,"../../base/styler":49,"../../base/utils":50,"../seek_time":61,"browser":"browser","events":"events","mediator":"mediator","mousetrap":47,"player_info":"player_info","ui_object":"ui_object","zepto":"zepto"}],60:[function(require,module,exports){
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

},{"./core_factory":56,"./loader":57,"base_object":"base_object","lodash.assign":2,"player_info":"player_info"}],61:[function(require,module,exports){
"use strict";

module.exports = require("./seek_time");

},{"./seek_time":62}],62:[function(require,module,exports){
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

},{"../../base/jst":48,"../../base/styler":49,"../../base/utils":50,"events":"events","ui_object":"ui_object"}],63:[function(require,module,exports){
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
var Mousetrap = require("mousetrap");

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
        Mediator.on(this.uniqueId + ":flashready", this.bootstrap, this);
        var shortcuts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shortcuts.forEach(function (i) {
          Mousetrap.bind([i.toString()], function () {
            return _this.seek(i * 10);
          });
        });
      }
    },
    stopListening: {
      value: function stopListening() {
        var _this = this;

        _get(Object.getPrototypeOf(Flash.prototype), "stopListening", this).call(this);
        Mediator.off(this.uniqueId + ":progress");
        Mediator.off(this.uniqueId + ":timeupdate");
        Mediator.off(this.uniqueId + ":statechanged");
        Mediator.off(this.uniqueId + ":flashready");
        var shortcuts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shortcuts.forEach(function (i) {
          Mousetrap.unbind([i.toString()], function () {
            return _this.seek(i * 10);
          });
        });
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

},{"../../base/jst":48,"../../base/styler":49,"../../base/utils":50,"browser":"browser","events":"events","mediator":"mediator","mousetrap":47,"playback":"playback","template":"template","zepto":"zepto"}],64:[function(require,module,exports){
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

},{"../../base/jst":48,"../../base/styler":49,"browser":"browser","events":"events","lodash.assign":2,"mediator":"mediator","playback":"playback","template":"template","zepto":"zepto"}],65:[function(require,module,exports){
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

},{"events":"events","lodash.find":12,"playback":"playback"}],66:[function(require,module,exports){
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
var Styler = require("../../base/styler");
var Browser = require("browser");
var seekStringToSeconds = require("../../base/utils").seekStringToSeconds;
var Events = require("events");
var find = require("lodash.find");

require("mousetrap");

var HTML5Video = (function (_Playback) {
  function HTML5Video(options) {
    _classCallCheck(this, HTML5Video);

    _get(Object.getPrototypeOf(HTML5Video.prototype), "constructor", this).call(this, options);
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
          Mousetrap.bind([i.toString()], function () {
            return _this.seek(i * 10);
          });
        });
      }
    },
    stopListening: {
      value: function stopListening() {
        var _this = this;

        [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(function (i) {
          Mousetrap.unbind([i.toString()], function () {
            return _this.seek(i * 10);
          });
        });
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

},{"../../base/jst":48,"../../base/styler":49,"../../base/utils":50,"browser":"browser","events":"events","lodash.find":12,"mousetrap":47,"playback":"playback"}],67:[function(require,module,exports){
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

},{"../../base/styler":49,"playback":"playback"}],68:[function(require,module,exports){
"use strict";

module.exports = require("./no_op");

},{"./no_op":69}],69:[function(require,module,exports){
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

},{"../../base/jst":48,"../../base/styler":49,"events":"events","playback":"playback"}],70:[function(require,module,exports){
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

},{"container_plugin":"container_plugin","events":"events"}],71:[function(require,module,exports){
"use strict";

module.exports = require("./click_to_pause");

},{"./click_to_pause":70}],72:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var UICorePlugin = require("ui_core_plugin");
var JST = require("../../base/jst");
var Styler = require("../../base/styler");
var Events = require("events");

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

},{"../../base/jst":48,"../../base/styler":49,"events":"events","ui_core_plugin":"ui_core_plugin"}],73:[function(require,module,exports){
"use strict";

module.exports = require("./dvr_controls");

},{"./dvr_controls":72}],74:[function(require,module,exports){
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
        _gaq.push([this.trackerName + "_setAccount", this.account]);
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

},{"container_plugin":"container_plugin","events":"events"}],75:[function(require,module,exports){
"use strict";

module.exports = require("./google_analytics");

},{"./google_analytics":74}],76:[function(require,module,exports){
"use strict";

module.exports = require("./log");

},{"./log":77}],77:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

require("mousetrap");

var Log = (function () {
  function Log() {
    var _this = this;

    _classCallCheck(this, Log);

    Mousetrap.bind(["ctrl+shift+d"], function () {
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

},{"mousetrap":47}],78:[function(require,module,exports){
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

},{"../../base/jst":48,"../../base/styler":49,"events":"events","mediator":"mediator","player_info":"player_info","ui_container_plugin":"ui_container_plugin","zepto":"zepto"}],79:[function(require,module,exports){
"use strict";

module.exports = require("./spinner_three_bounce");

},{"./spinner_three_bounce":80}],80:[function(require,module,exports){
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

},{"../../base/jst":48,"../../base/styler":49,"events":"events","ui_container_plugin":"ui_container_plugin"}],81:[function(require,module,exports){
"use strict";

module.exports = require("./stats");

},{"./stats":82}],82:[function(require,module,exports){
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

},{"container_plugin":"container_plugin","events":"events","zepto":"zepto"}],83:[function(require,module,exports){
"use strict";

module.exports = require("./watermark");

},{"./watermark":84}],84:[function(require,module,exports){
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

},{"../../base/jst":48,"../../base/styler":49,"events":"events","ui_container_plugin":"ui_container_plugin"}],"base_object":[function(require,module,exports){
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

},{"./utils":50,"events":"events"}],"browser":[function(require,module,exports){
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

},{"./container":51}],"core_plugin":[function(require,module,exports){
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

},{"./core":54}],"events":[function(require,module,exports){
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

},{"../plugins/log":76,"./utils":50,"lodash.once":27}],"flash":[function(require,module,exports){
"use strict";

module.exports = require("./flash");

},{"./flash":63}],"hls":[function(require,module,exports){
"use strict";

module.exports = require("./hls");

},{"./hls":64}],"html5_audio":[function(require,module,exports){
"use strict";

module.exports = require("./html5_audio");

},{"./html5_audio":65}],"html5_video":[function(require,module,exports){
"use strict";

module.exports = require("./html5_video");

},{"./html5_video":66}],"html_img":[function(require,module,exports){
"use strict";

module.exports = require("./html_img");

},{"./html_img":67}],"media_control":[function(require,module,exports){
"use strict";

module.exports = require("./media_control");

},{"./media_control":59}],"mediator":[function(require,module,exports){
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
"use strict";

// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var PlayerInfo = {
  options: {},
  playbackPlugins: [],
  currentSize: { width: 0, height: 0 }
};

module.exports = PlayerInfo;

},{}],"poster":[function(require,module,exports){
"use strict";

module.exports = require("./poster");

},{"./poster":78}],"template":[function(require,module,exports){
"use strict";

// Simple JavaScript Templating
// Paul Miller (http://paulmillr.com)
// http://underscorejs.org
// (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
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

},{"./utils":50,"base_object":"base_object","lodash.assign":2,"lodash.result":29,"zepto":"zepto"}],"zepto":[function(require,module,exports){
/* Zepto v1.1.4-80-ga9184b2 - zepto event ajax callbacks deferred touch selector ie - zeptojs.com/license */
var Zepto=function(){function D(t){return null==t?String(t):j[S.call(t)]||"object"}function L(t){return"function"==D(t)}function k(t){return null!=t&&t==t.window}function Z(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function $(t){return"object"==D(t)}function F(t){return $(t)&&!k(t)&&Object.getPrototypeOf(t)==Object.prototype}function R(t){return"number"==typeof t.length}function q(t){return s.call(t,function(t){return null!=t})}function W(t){return t.length>0?n.fn.concat.apply([],t):t}function z(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function H(t){return t in c?c[t]:c[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function _(t,e){return"number"!=typeof e||l[z(t)]?e:e+"px"}function I(t){var e,n;return f[t]||(e=u.createElement(t),u.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),f[t]=n),f[t]}function U(t){return"children"in t?a.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function X(t,e){var n,i=t?t.length:0;for(n=0;i>n;n++)this[n]=t[n];this.length=i,this.selector=e||""}function B(n,i,r){for(e in i)r&&(F(i[e])||A(i[e]))?(F(i[e])&&!F(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function V(t,e){return null==e?n(t):n(t).filter(e)}function Y(t,e,n,i){return L(e)?e.call(t,n,i):e}function J(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function G(e,n){var i=e.className||"",r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function K(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?n.parseJSON(t):t):t}catch(e){return t}}function Q(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)Q(t.childNodes[n],e)}var t,e,n,i,N,P,r=[],o=r.concat,s=r.filter,a=r.slice,u=window.document,f={},c={},l={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},h=/^\s*<(\w+|!)[^>]*>/,p=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,d=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,m=/^(?:body|html)$/i,g=/([A-Z])/g,v=["val","css","html","text","data","width","height","offset"],y=["after","prepend","before","append"],w=u.createElement("table"),x=u.createElement("tr"),b={tr:u.createElement("tbody"),tbody:w,thead:w,tfoot:w,td:x,th:x,"*":u.createElement("div")},E=/complete|loaded|interactive/,T=/^[\w-]*$/,j={},S=j.toString,C={},O=u.createElement("div"),M={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return C.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~C.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},N=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},P=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},C.fragment=function(e,i,r){var o,s,f;return p.test(e)&&(o=n(u.createElement(RegExp.$1))),o||(e.replace&&(e=e.replace(d,"<$1></$2>")),i===t&&(i=h.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,o=n.each(a.call(f.childNodes),function(){f.removeChild(this)})),F(r)&&(s=n(o),n.each(r,function(t,e){v.indexOf(t)>-1?s[t](e):s.attr(t,e)})),o},C.Z=function(t,e){return new X(t,e)},C.isZ=function(t){return t instanceof C.Z},C.init=function(e,i){var r;if(!e)return C.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&h.test(e))r=C.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=C.qsa(u,e)}else{if(L(e))return n(u).ready(e);if(C.isZ(e))return e;if(A(e))r=q(e);else if($(e))r=[e],e=null;else if(h.test(e))r=C.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=C.qsa(u,e)}}return C.Z(r,e)},n=function(t,e){return C.init(t,e)},n.extend=function(t){var e,n=a.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},C.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],o=i||r?e.slice(1):e,s=T.test(o);return t.getElementById&&s&&i?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:a.call(s&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=u.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=D,n.isFunction=L,n.isWindow=k,n.isArray=A,n.isPlainObject=F,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=N,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.noop=function(){},n.map=function(t,e){var n,r,o,i=[];if(R(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return W(i)},n.each=function(t,e){var n,i;if(R(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={constructor:C.Z,length:0,forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,splice:r.splice,indexOf:r.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=C.isZ(e)?e.toArray():e;return o.apply(C.isZ(this)?this.toArray():this,n)},map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(a.apply(this,arguments))},ready:function(t){return E.test(u.readyState)&&u.body?t(n):u.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?a.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return L(t)?this.not(this.not(t)):n(s.call(this,function(e){return C.matches(e,t)}))},add:function(t,e){return n(P(this.concat(n(t,e))))},is:function(t){return this.length>0&&C.matches(this[0],t)},not:function(e){var i=[];if(L(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):R(e)&&L(e.item)?a.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return $(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!$(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!$(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(C.qsa(this[0],t)):this.map(function(){return C.qsa(this,t)}):n()},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:C.matches(i,t));)i=i!==e&&!Z(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!Z(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return V(e,t)},parent:function(t){return V(P(this.pluck("parentNode")),t)},children:function(t){return V(this.map(function(){return U(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||a.call(this.childNodes)})},siblings:function(t){return V(this.map(function(t,e){return s.call(U(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=L(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=L(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(Y(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=Y(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if($(n))for(e in n)J(this,e,n[e]);else J(this,n,Y(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){J(this,t)},this)})},prop:function(t,e){return t=M[t]||t,1 in arguments?this.each(function(n){this[t]=Y(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(g,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?K(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=Y(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=Y(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;if(!n.contains(u.documentElement,this[0]))return{top:0,left:0};var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r,o=this[0];if(!o)return;if(r=getComputedStyle(o,""),"string"==typeof t)return o.style[N(t)]||r.getPropertyValue(t);if(A(t)){var s={};return n.each(t,function(t,e){s[e]=o.style[N(e)]||r.getPropertyValue(e)}),s}}var a="";if("string"==D(t))i||0===i?a=z(t)+":"+_(t,i):this.each(function(){this.style.removeProperty(z(t))});else for(e in t)t[e]||0===t[e]?a+=z(e)+":"+_(e,t[e])+";":this.each(function(){this.style.removeProperty(z(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(G(t))},H(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var r=G(this),o=Y(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&G(this,r+(r?" ":"")+i.join(" "))}}):this},removeClass:function(e){return this.each(function(n){if("className"in this){if(e===t)return G(this,"");i=G(this),Y(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(H(t)," ")}),G(this,i.trim())}})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=Y(this,e,r,G(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=m.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||u.body;t&&!m.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?k(s)?s["inner"+i]:Z(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,Y(this,r,t,s[e]()))})}}),y.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=D(e),"object"==t||"array"==t||null==e?e:C.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null;var f=n.contains(u.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,a),f&&Q(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),C.Z.prototype=X.prototype=n.fn,C.uniq=P,C.deserializeValue=K,n.zepto=C,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=T(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function T(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=w,r&&r.apply(i,arguments)},e[n]=x}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=w)),e}function j(t){var e,i={originalEvent:t};for(e in t)b.test(e)||t[e]===n||(i[e]=t[e]);return T(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var w=function(){return!0},x=function(){return!1},b=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(u===n||a===!1)&&(u=a,a=n),u===!1&&(u=x),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(j(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=x),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):T(e),e._args=n,this.each(function(){e.type in f&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=j(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),T(n)}}(Zepto),function(t){function h(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function p(t,e,i,r){return t.global?h(e||n,i,r):void 0}function d(e){e.global&&0===t.active++&&p(e,null,"ajaxStart")}function m(e){e.global&&!--t.active&&p(e,null,"ajaxStop")}function g(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||p(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void p(e,n,"ajaxSend",[t,e])}function v(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),p(n,r,"ajaxSuccess",[e,n,t]),w(o,e,n)}function y(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),p(i,o,"ajaxError",[n,i,t||e]),w(e,n,i)}function w(t,e,n){var i=n.context;n.complete.call(i,e,t),p(n,i,"ajaxComplete",[e,n]),m(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function E(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function T(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=E(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function C(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?C(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/,l=n.createElement("a");l.href=window.location.href,t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?v(f[0],l,i,r):y(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),g(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var a,u,o=t.extend({},e||{}),s=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===o[i]&&(o[i]=t.ajaxSettings[i]);d(o),o.crossDomain||(a=n.createElement("a"),a.href=o.url,a.href=a.href,o.crossDomain=l.protocol+"//"+l.host!=a.protocol+"//"+a.host),o.url||(o.url=window.location.toString()),(u=o.url.indexOf("#"))>-1&&(o.url=o.url.slice(0,u)),T(o);var f=o.dataType,h=/\?.+=\?/.test(o.url);if(h&&(f="jsonp"),o.cache!==!1&&(e&&e.cache===!0||"script"!=f&&"jsonp"!=f)||(o.url=E(o.url,"_="+Date.now())),"jsonp"==f)return h||(o.url=E(o.url,o.jsonp?o.jsonp+"=?":o.jsonp===!1?"":"callback=?")),t.ajaxJSONP(o,s);var N,p=o.accepts[f],m={},w=function(t,e){m[t.toLowerCase()]=[t,e]},j=/^([\w-]+:)\/\//.test(o.url)?RegExp.$1:window.location.protocol,S=o.xhr(),C=S.setRequestHeader;if(s&&s.promise(S),o.crossDomain||w("X-Requested-With","XMLHttpRequest"),w("Accept",p||"*/*"),(p=o.mimeType||p)&&(p.indexOf(",")>-1&&(p=p.split(",",2)[0]),S.overrideMimeType&&S.overrideMimeType(p)),(o.contentType||o.contentType!==!1&&o.data&&"GET"!=o.type.toUpperCase())&&w("Content-Type",o.contentType||"application/x-www-form-urlencoded"),o.headers)for(r in o.headers)w(r,o.headers[r]);if(S.setRequestHeader=w,S.onreadystatechange=function(){if(4==S.readyState){S.onreadystatechange=x,clearTimeout(N);var e,n=!1;if(S.status>=200&&S.status<300||304==S.status||0==S.status&&"file:"==j){f=f||b(o.mimeType||S.getResponseHeader("content-type")),e=S.responseText;try{"script"==f?(1,eval)(e):"xml"==f?e=S.responseXML:"json"==f&&(e=c.test(e)?null:t.parseJSON(e))}catch(i){n=i}n?y(n,"parsererror",S,o,s):v(e,S,o,s)}else y(S.statusText||null,S.status?"error":"abort",S,o,s)}},g(S,o)===!1)return S.abort(),y(null,"abort",S,o,s),S;if(o.xhrFields)for(r in o.xhrFields)S[r]=o.xhrFields[r];var P="async"in o?o.async:!0;S.open(o.type,o.url,P,o.username,o.password);for(r in m)C.apply(S,m[r]);return o.timeout>0&&(N=setTimeout(function(){S.onreadystatechange=x,S.abort(),y(null,"timeout",S,o,s)},o.timeout)),S.send(o.data?o.data:null),S},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var S=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(S(e)+"="+S(n))},C(i,e,n),i.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.Callbacks=function(e){e=t.extend({},e);var n,i,r,o,s,a,u=[],f=!e.once&&[],c=function(t){for(n=e.memory&&t,i=!0,a=o||0,o=0,s=u.length,r=!0;u&&s>a;++a)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}r=!1,u&&(f?f.length&&c(f.shift()):n?u.length=0:l.disable())},l={add:function(){if(u){var i=u.length,a=function(n){t.each(n,function(t,n){"function"==typeof n?e.unique&&l.has(n)||u.push(n):n&&n.length&&"string"!=typeof n&&a(n)})};a(arguments),r?s=u.length:n&&(o=i,c(n))}return this},remove:function(){return u&&t.each(arguments,function(e,n){for(var i;(i=t.inArray(n,u,i))>-1;)u.splice(i,1),r&&(s>=i&&--s,a>=i&&--a)}),this},has:function(e){return!(!u||!(e?t.inArray(e,u)>-1:u.length))},empty:function(){return s=u.length=0,this},disable:function(){return u=f=n=void 0,this},disabled:function(){return!u},lock:function(){return f=void 0,n||l.disable(),this},locked:function(){return!f},fireWith:function(t,e){return!u||i&&!f||(e=e||[],e=[t,e.slice?e.slice():e],r?f.push(e):c(e)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!i}};return l}}(Zepto),function(t){function n(e){var i=[["resolve","done",t.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",t.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",t.Callbacks({memory:1})]],r="pending",o={state:function(){return r},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var e=arguments;return n(function(n){t.each(i,function(i,r){var a=t.isFunction(e[i])&&e[i];s[r[1]](function(){var e=a&&a.apply(this,arguments);if(e&&t.isFunction(e.promise))e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else{var i=this===o?n.promise():this,s=a?[e]:arguments;n[r[0]+"With"](i,s)}})}),e=null}).promise()},promise:function(e){return null!=e?t.extend(e,o):o}},s={};return t.each(i,function(t,e){var n=e[2],a=e[3];o[e[1]]=n.add,a&&n.add(function(){r=a},i[1^t][2].disable,i[2][2].lock),s[e[0]]=function(){return s[e[0]+"With"](this===s?o:this,arguments),this},s[e[0]+"With"]=n.fireWith}),o.promise(s),e&&e.call(s,s),s}var e=Array.prototype.slice;t.when=function(i){var f,c,l,r=e.call(arguments),o=r.length,s=0,a=1!==o||i&&t.isFunction(i.promise)?o:0,u=1===a?i:n(),h=function(t,n,i){return function(r){n[t]=this,i[t]=arguments.length>1?e.call(arguments):r,i===f?u.notifyWith(n,i):--a||u.resolveWith(n,i)}};if(o>1)for(f=new Array(o),c=new Array(o),l=new Array(o);o>s;++s)r[s]&&t.isFunction(r[s].promise)?r[s].promise().done(h(s,l,r)).fail(u.reject).progress(h(s,c,f)):--a;return a||u.resolveWith(l,r),u.promise()},t.Deferred=n}(Zepto),function(t){function u(t,e,n,i){return Math.abs(t-e)>=Math.abs(n-i)?t-e>0?"Left":"Right":n-i>0?"Up":"Down"}function f(){o=null,e.last&&(e.el.trigger("longTap"),e={})}function c(){o&&clearTimeout(o),o=null}function l(){n&&clearTimeout(n),i&&clearTimeout(i),r&&clearTimeout(r),o&&clearTimeout(o),n=i=r=o=null,e={}}function h(t){return("touch"==t.pointerType||t.pointerType==t.MSPOINTER_TYPE_TOUCH)&&t.isPrimary}function p(t,e){return t.type=="pointer"+e||t.type.toLowerCase()=="mspointer"+e}var n,i,r,o,a,e={},s=750;t(document).ready(function(){var d,m,y,w,g=0,v=0;"MSGesture"in window&&(a=new MSGesture,a.target=document.body),t(document).bind("MSGestureEnd",function(t){var n=t.velocityX>1?"Right":t.velocityX<-1?"Left":t.velocityY>1?"Down":t.velocityY<-1?"Up":null;n&&(e.el.trigger("swipe"),e.el.trigger("swipe"+n))}).on("touchstart MSPointerDown pointerdown",function(i){(!(w=p(i,"down"))||h(i))&&(y=w?i:i.touches[0],i.touches&&1===i.touches.length&&e.x2&&(e.x2=void 0,e.y2=void 0),d=Date.now(),m=d-(e.last||d),e.el=t("tagName"in y.target?y.target:y.target.parentNode),n&&clearTimeout(n),e.x1=y.pageX,e.y1=y.pageY,m>0&&250>=m&&(e.isDoubleTap=!0),e.last=d,o=setTimeout(f,s),a&&w&&a.addPointer(i.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){(!(w=p(t,"move"))||h(t))&&(y=w?t:t.touches[0],c(),e.x2=y.pageX,e.y2=y.pageY,g+=Math.abs(e.x1-e.x2),v+=Math.abs(e.y1-e.y2))}).on("touchend MSPointerUp pointerup",function(o){(!(w=p(o,"up"))||h(o))&&(c(),e.x2&&Math.abs(e.x1-e.x2)>30||e.y2&&Math.abs(e.y1-e.y2)>30?r=setTimeout(function(){e.el.trigger("swipe"),e.el.trigger("swipe"+u(e.x1,e.x2,e.y1,e.y2)),e={}},0):"last"in e&&(30>g&&30>v?i=setTimeout(function(){var i=t.Event("tap");i.cancelTouch=l,e.el.trigger(i),e.isDoubleTap?(e.el&&e.el.trigger("doubleTap"),e={}):n=setTimeout(function(){n=null,e.el&&e.el.trigger("singleTap"),e={}},250)},0):e={}),g=v=0)}).on("touchcancel MSPointerCancel pointercancel",l),t(window).on("scroll",l)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(t){return this.on(e,t)}})}(Zepto),function(t){function r(e){return e=t(e),!(!e.width()&&!e.height())&&"none"!==e.css("display")}function f(t,e){t=t.replace(/=#\]/g,'="#"]');var n,i,r=s.exec(t);if(r&&r[2]in o&&(n=o[r[2]],i=r[3],t=r[1],i)){var a=Number(i);i=isNaN(a)?i.replace(/^["']|["']$/g,""):a}return e(t,n,i)}var e=t.zepto,n=e.qsa,i=e.matches,o=t.expr[":"]={visible:function(){return r(this)?this:void 0},hidden:function(){return r(this)?void 0:this},selected:function(){return this.selected?this:void 0},checked:function(){return this.checked?this:void 0},parent:function(){return this.parentNode},first:function(t){return 0===t?this:void 0},last:function(t,e){return t===e.length-1?this:void 0},eq:function(t,e,n){return t===n?this:void 0},contains:function(e,n,i){return t(this).text().indexOf(i)>-1?this:void 0},has:function(t,n,i){return e.qsa(this,i).length?this:void 0}},s=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),a=/^\s*>/,u="Zepto"+ +new Date;e.qsa=function(i,r){return f(r,function(o,s,f){try{var c;!o&&s?o="*":a.test(o)&&(c=t(i).addClass(u),o="."+u+" "+o);var l=n(i,o)}catch(h){throw console.error("error performing selector: %o",r),h}finally{c&&c.removeClass(u)}return s?e.uniq(t.map(l,function(t,e){return s.call(t,e,l,f)})):l})},e.matches=function(t,e){return f(e,function(e,n,r){return!(e&&!i(t,e)||n&&n.call(t,null,r)!==t)})}}(Zepto),function(){try{getComputedStyle(void 0)}catch(t){var e=getComputedStyle;window.getComputedStyle=function(t){try{return e(t)}catch(n){return null}}}}();
module.exports = Zepto;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9tYWluLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlY29weS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vhc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZXlzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2FyZ3VtZW50cy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vhc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZXlzL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNhcnJheS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vhc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZXlzL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNuYXRpdmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9jcmVhdGVhc3NpZ25lci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2NyZWF0ZWFzc2lnbmVyL25vZGVfbW9kdWxlcy9sb2Rhc2guX2JpbmRjYWxsYmFjay9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2NyZWF0ZWFzc2lnbmVyL25vZGVfbW9kdWxlcy9sb2Rhc2guX2lzaXRlcmF0ZWVjYWxsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VjYWxsYmFjay9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZmluZC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlY2FsbGJhY2svbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWNhbGxiYWNrL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guaXN0eXBlZGFycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VlYWNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VmaW5kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guZmluZGluZGV4L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5vbmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5vbmNlL25vZGVfbW9kdWxlcy9sb2Rhc2guYmVmb3JlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5yZXN1bHQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnJlc3VsdC9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZnVuY3Rpb24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZXVuaXEvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZXVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWluZGV4b2YvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZXVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fY2FjaGVpbmRleG9mL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC51bmlxL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2V1bmlxL25vZGVfbW9kdWxlcy9sb2Rhc2guX2NyZWF0ZWNhY2hlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21vdXNldHJhcC9tb3VzZXRyYXAuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9iYXNlL2pzdC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2Jhc2Uvc3R5bGVyLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvYmFzZS91dGlscy5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2NvbXBvbmVudHMvY29udGFpbmVyL2NvbnRhaW5lci5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2NvbXBvbmVudHMvY29udGFpbmVyX2ZhY3RvcnkvY29udGFpbmVyX2ZhY3RvcnkuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lcl9mYWN0b3J5L2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvY29tcG9uZW50cy9jb3JlL2NvcmUuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvcmVfZmFjdG9yeS9jb3JlX2ZhY3RvcnkuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvcmVfZmFjdG9yeS9pbmRleC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2NvbXBvbmVudHMvbG9hZGVyL2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvY29tcG9uZW50cy9sb2FkZXIvbG9hZGVyLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvY29tcG9uZW50cy9tZWRpYV9jb250cm9sL21lZGlhX2NvbnRyb2wuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL3BsYXllci5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2NvbXBvbmVudHMvc2Vla190aW1lL2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvY29tcG9uZW50cy9zZWVrX3RpbWUvc2Vla190aW1lLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGxheWJhY2tzL2ZsYXNoL2ZsYXNoLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGxheWJhY2tzL2hscy9obHMuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfYXVkaW8vaHRtbDVfYXVkaW8uanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfdmlkZW8vaHRtbDVfdmlkZW8uanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbF9pbWcvaHRtbF9pbWcuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbGF5YmFja3Mvbm9fb3AvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbGF5YmFja3Mvbm9fb3Avbm9fb3AuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbHVnaW5zL2NsaWNrX3RvX3BhdXNlL2NsaWNrX3RvX3BhdXNlLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGx1Z2lucy9jbGlja190b19wYXVzZS9pbmRleC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsdWdpbnMvZHZyX2NvbnRyb2xzL2R2cl9jb250cm9scy5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsdWdpbnMvZHZyX2NvbnRyb2xzL2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGx1Z2lucy9nb29nbGVfYW5hbHl0aWNzL2dvb2dsZV9hbmFseXRpY3MuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbHVnaW5zL2dvb2dsZV9hbmFseXRpY3MvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbHVnaW5zL2xvZy9pbmRleC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsdWdpbnMvbG9nL2xvZy5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsdWdpbnMvcG9zdGVyL3Bvc3Rlci5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsdWdpbnMvc3Bpbm5lcl90aHJlZV9ib3VuY2UvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbHVnaW5zL3NwaW5uZXJfdGhyZWVfYm91bmNlL3NwaW5uZXJfdGhyZWVfYm91bmNlLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGx1Z2lucy9zdGF0cy9pbmRleC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsdWdpbnMvc3RhdHMvc3RhdHMuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbHVnaW5zL3dhdGVybWFyay9pbmRleC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsdWdpbnMvd2F0ZXJtYXJrL3dhdGVybWFyay5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2Jhc2UvYmFzZV9vYmplY3QuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL2Jyb3dzZXIuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9iYXNlL2NvbnRhaW5lcl9wbHVnaW4uanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lci9pbmRleC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2Jhc2UvY29yZV9wbHVnaW4uanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvcmUvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9iYXNlL2V2ZW50cy5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsYXliYWNrcy9mbGFzaC9pbmRleC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsYXliYWNrcy9obHMvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfYXVkaW8vaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfdmlkZW8vaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbF9pbWcvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL21lZGlhX2NvbnRyb2wvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL21lZGlhdG9yLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvYmFzZS9wbGF5YmFjay5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2NvbXBvbmVudHMvcGxheWVyX2luZm8uanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbHVnaW5zL3Bvc3Rlci9pbmRleC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2Jhc2UvdGVtcGxhdGUuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9iYXNlL3VpX2NvbnRhaW5lcl9wbHVnaW4uanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9iYXNlL3VpX2NvcmVfcGx1Z2luLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvYmFzZS91aV9vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY2xhcHByLXplcHRvL3plcHRvLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0lBLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQzNDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNsQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7O0FBRTlCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBOztBQUVwQixNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQTtBQUN0RSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUE7O0FBRXJDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQTs7O0FDYjlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDLE9BQU07QUFBQSxBQUMxRSxTQUFLLENBQUM7QUFBRSxhQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEFBQzlFLFNBQUssQ0FBQztBQUFFLGFBQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEFBQ2xGO0FBQVMsYUFBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEdBQy9FO0NBQ0YsQ0FBQTs7QUFFRCxJQUFJLGFBQWEsR0FBRyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFBOztBQUUxRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLE1BQU0sRUFBRTtBQUNsRCxRQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFVBQVMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDdkQsUUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQSxBQUFDLENBQUE7QUFDL0QsUUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsS0FBSyxHQUFHLENBQUMsU0FBUyxH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LE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzVELGNBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO1NBQzVCLE1BQU07QUFDTCxjQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDM0M7T0FDRjs7OztTQXJFRyxRQUFRO0dBQVMsVUFBVTs7QUF3RWpDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFBOzs7QUNwRnpCO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5ZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGxheWVyJylcbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJ21lZGlhdG9yJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxuXG53aW5kb3cuREVCVUcgPSBmYWxzZVxuXG53aW5kb3cuQ2xhcHByID0geyBQbGF5ZXI6IFBsYXllciwgTWVkaWF0b3I6IE1lZGlhdG9yLCBFdmVudHM6IEV2ZW50cyB9XG53aW5kb3cuQ2xhcHByLnZlcnNpb24gPSBcIl9fVkVSU0lPTl9fXCJcblxubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuQ2xhcHByXG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VBc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2Vhc3NpZ24nKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJ2xvZGFzaC5fY3JlYXRlYXNzaWduZXInKTtcblxuLyoqXG4gKiBBc3NpZ25zIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKSB0byB0aGUgZGVzdGluYXRpb25cbiAqIG9iamVjdC4gU3Vic2VxdWVudCBzb3VyY2VzIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLlxuICogSWYgYGN1c3RvbWl6ZXJgIGlzIHByb3ZpZGVkIGl0IGlzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgYXNzaWduZWQgdmFsdWVzLlxuICogVGhlIGBjdXN0b21pemVyYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCBmaXZlIGFyZ3VtZW50cztcbiAqIChvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgZXh0ZW5kXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGN1c3RvbWl6ZXJgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5hc3NpZ24oeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDQwIH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIGRlZmF1bHRzID0gXy5wYXJ0aWFsUmlnaHQoXy5hc3NpZ24sIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICogICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnID8gb3RoZXIgOiB2YWx1ZTtcbiAqIH0pO1xuICpcbiAqIGRlZmF1bHRzKHsgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICdhZ2UnOiAzNiB9LCB7ICd1c2VyJzogJ2ZyZWQnIH0pO1xuICogLy8gPT4geyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfVxuICovXG52YXIgYXNzaWduID0gY3JlYXRlQXNzaWduZXIoYmFzZUFzc2lnbik7XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlQ29weSA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWNvcHknKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnbG9kYXNoLmtleXMnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5hc3NpZ25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmcsXG4gKiBtdWx0aXBsZSBzb3VyY2VzLCBhbmQgYHRoaXNgIGJpbmRpbmcgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmluZyB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ24ob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIHByb3BzID0ga2V5cyhzb3VyY2UpO1xuICBpZiAoIWN1c3RvbWl6ZXIpIHtcbiAgICByZXR1cm4gYmFzZUNvcHkoc291cmNlLCBvYmplY3QsIHByb3BzKTtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF0sXG4gICAgICAgIHZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIodmFsdWUsIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKTtcblxuICAgIGlmICgocmVzdWx0ID09PSByZXN1bHQgPyAocmVzdWx0ICE9PSB2YWx1ZSkgOiAodmFsdWUgPT09IHZhbHVlKSkgfHxcbiAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJyAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFzc2lnbjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ29waWVzIHRoZSBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gY29weS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDb3B5KHNvdXJjZSwgb2JqZWN0LCBwcm9wcykge1xuICBpZiAoIXByb3BzKSB7XG4gICAgcHJvcHMgPSBvYmplY3Q7XG4gICAgb2JqZWN0ID0ge307XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIG9iamVjdFtrZXldID0gc291cmNlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29weTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC40IChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCdsb2Rhc2guaXNhcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJ2xvZGFzaC5pc25hdGl2ZScpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBpc05hdGl2ZShuYXRpdmVLZXlzID0gT2JqZWN0LmtleXMpICYmIG5hdGl2ZUtleXM7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBBbiBvYmplY3QgZW52aXJvbm1lbnQgZmVhdHVyZSBmbGFncy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUgT2JqZWN0XG4gKi9cbnZhciBzdXBwb3J0ID0ge307XG5cbihmdW5jdGlvbih4KSB7XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiBgYXJndW1lbnRzYCBvYmplY3QgaW5kZXhlcyBhcmUgbm9uLWVudW1lcmFibGUuXG4gICAqXG4gICAqIEluIEZpcmVmb3ggPCA0LCBJRSA8IDksIFBoYW50b21KUywgYW5kIFNhZmFyaSA8IDUuMSBgYXJndW1lbnRzYCBvYmplY3RcbiAgICogaW5kZXhlcyBhcmUgbm9uLWVudW1lcmFibGUuIENocm9tZSA8IDI1IGFuZCBOb2RlLmpzIDwgMC4xMS4wIHRyZWF0XG4gICAqIGBhcmd1bWVudHNgIG9iamVjdCBpbmRleGVzIGFzIG5vbi1lbnVtZXJhYmxlIGFuZCBmYWlsIGBoYXNPd25Qcm9wZXJ0eWBcbiAgICogY2hlY2tzIGZvciBpbmRleGVzIHRoYXQgZXhjZWVkIHRoZWlyIGZ1bmN0aW9uJ3MgZm9ybWFsIHBhcmFtZXRlcnMgd2l0aFxuICAgKiBhc3NvY2lhdGVkIHZhbHVlcyBvZiBgMGAuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnN1cHBvcnRcbiAgICogQHR5cGUgYm9vbGVhblxuICAgKi9cbiAgdHJ5IHtcbiAgICBzdXBwb3J0Lm5vbkVudW1BcmdzID0gIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgc3VwcG9ydC5ub25FbnVtQXJncyA9IHRydWU7XG4gIH1cbn0oMCwgMCkpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICt2YWx1ZTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIEVTIGBUb0xlbmd0aGAuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIEEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24gb2YgYE9iamVjdC5rZXlzYCB3aGljaCBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZVxuICogb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gIHZhciBwcm9wcyA9IGtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBwcm9wc0xlbmd0aCAmJiBvYmplY3QubGVuZ3RoO1xuXG4gIHZhciBhbGxvd0luZGV4ZXMgPSBsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgKHN1cHBvcnQubm9uRW51bUFyZ3MgJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogKipOb3RlOioqIFNlZSB0aGUgW0VTNSBzcGVjXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKHZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG52YXIga2V5cyA9ICFuYXRpdmVLZXlzID8gc2hpbUtleXMgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCkge1xuICAgIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICB9XG4gIGlmICgodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0KSB8fFxuICAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIGxlbmd0aCA9IChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgKHN1cHBvcnQubm9uRW51bUFyZ3MgJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogKGZ1bmN0aW9uKCkgeyByZXR1cm4gXy5pc0FyZ3VtZW50cyhhcmd1bWVudHMpOyB9KSgpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHZhciBsZW5ndGggPSBpc09iamVjdExpa2UodmFsdWUpID8gdmFsdWUubGVuZ3RoIDogdW5kZWZpbmVkO1xuICByZXR1cm4gKGlzTGVuZ3RoKGxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZykgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzLlxuICogU2VlIHRoaXMgW2FydGljbGUgb24gYFJlZ0V4cGAgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBpc05hdGl2ZShuYXRpdmVJc0FycmF5ID0gQXJyYXkuaXNBcnJheSkgJiYgbmF0aXZlSXNBcnJheTtcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogKGZ1bmN0aW9uKCkgeyByZXR1cm4gXy5pc0FycmF5KGFyZ3VtZW50cyk7IH0pKCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWcpIHx8IGZhbHNlO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIHJlSG9zdEN0b3IudGVzdCh2YWx1ZSkpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIiwgXCIqXCIsXG4gKiBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOi8vbG9kYXNoXFwuY29tL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzLlxuICogU2VlIHRoaXMgW2FydGljbGUgb24gYFJlZ0V4cGAgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVIb3N0Q3Rvci50ZXN0KHZhbHVlKSkgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXFxcIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLCBcIipcIixcbiAqIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6Ly9sb2Rhc2hcXC5jb20vXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2JpbmRjYWxsYmFjaycpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnbG9kYXNoLl9pc2l0ZXJhdGVlY2FsbCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGFzc2lnbnMgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIGEgZ2l2ZW5cbiAqIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBsZW5ndGggPSBhcmdzLmxlbmd0aCxcbiAgICAgICAgb2JqZWN0ID0gYXJnc1swXTtcblxuICAgIGlmIChsZW5ndGggPCAyIHx8IG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICB2YXIgY3VzdG9taXplciA9IGFyZ3NbbGVuZ3RoIC0gMl0sXG4gICAgICAgIHRoaXNBcmcgPSBhcmdzW2xlbmd0aCAtIDFdLFxuICAgICAgICBndWFyZCA9IGFyZ3NbM107XG5cbiAgICBpZiAobGVuZ3RoID4gMyAmJiB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjdXN0b21pemVyID0gYmluZENhbGxiYWNrKGN1c3RvbWl6ZXIsIHRoaXNBcmcsIDUpO1xuICAgICAgbGVuZ3RoIC09IDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSAobGVuZ3RoID4gMiAmJiB0eXBlb2YgdGhpc0FyZyA9PSAnZnVuY3Rpb24nKSA/IHRoaXNBcmcgOiBudWxsO1xuICAgICAgbGVuZ3RoIC09IChjdXN0b21pemVyID8gMSA6IDApO1xuICAgIH1cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoYXJnc1sxXSwgYXJnc1syXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoID09IDMgPyBudWxsIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDI7XG4gICAgfVxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmdzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0eXBlb2YgdGhpc0FyZyA9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jO1xuICB9XG4gIHN3aXRjaCAoYXJnQ291bnQpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHByb3ZpZGVkIHRvIGl0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuNCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gK3ZhbHVlO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgcHJvdmlkZWQgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJykge1xuICAgIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoLFxuICAgICAgICBwcmVyZXEgPSBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoaW5kZXgsIGxlbmd0aCk7XG4gIH0gZWxzZSB7XG4gICAgcHJlcmVxID0gdHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3Q7XG4gIH1cbiAgaWYgKHByZXJlcSkge1xuICAgIHZhciBvdGhlciA9IG9iamVjdFtpbmRleF07XG4gICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/ICh2YWx1ZSA9PT0gb3RoZXIpIDogKG90aGVyICE9PSBvdGhlcik7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gRVMgYFRvTGVuZ3RoYC4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIGxhbmd1YWdlIHR5cGUgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiAqKk5vdGU6KiogU2VlIHRoZSBbRVM1IHNwZWNdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAodmFsdWUgJiYgdHlwZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWNhbGxiYWNrJyksXG4gICAgYmFzZUVhY2ggPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VlYWNoJyksXG4gICAgYmFzZUZpbmQgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VmaW5kJyksXG4gICAgZmluZEluZGV4ID0gcmVxdWlyZSgnbG9kYXNoLmZpbmRpbmRleCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpO1xuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gLCByZXR1cm5pbmcgdGhlIGZpcnN0IGVsZW1lbnRcbiAqIGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvci4gVGhlIHByZWRpY2F0ZSBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kXG4gKiBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gKlxuICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ucHJvcGVydHlcIlxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogSWYgYW4gb2JqZWN0IGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ubWF0Y2hlc1wiIHN0eWxlXG4gKiBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlblxuICogb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBkZXRlY3RcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gc2VhcmNoLlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8c3RyaW5nfSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkXG4gKiAgcGVyIGl0ZXJhdGlvbi4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yIG9iamVjdCBpcyBwcm92aWRlZCBpdCBpcyB1c2VkIHRvXG4gKiAgY3JlYXRlIGEgXCJfLnByb3BlcnR5XCIgb3IgXCJfLm1hdGNoZXNcIiBzdHlsZSBjYWxsYmFjayByZXNwZWN0aXZlbHkuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYHByZWRpY2F0ZWAuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWF0Y2hlZCBlbGVtZW50LCBlbHNlIGB1bmRlZmluZWRgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IGZhbHNlIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IHRydWUgfSxcbiAqICAgeyAndXNlcic6ICdwZWJibGVzJywgJ2FnZSc6IDEsICAnYWN0aXZlJzogZmFsc2UgfVxuICogXTtcbiAqXG4gKiBfLnJlc3VsdChfLmZpbmQodXNlcnMsIGZ1bmN0aW9uKGNocikgeyByZXR1cm4gY2hyLmFnZSA8IDQwOyB9KSwgJ3VzZXInKTtcbiAqIC8vID0+ICdiYXJuZXknXG4gKlxuICogLy8gdXNpbmcgdGhlIFwiXy5tYXRjaGVzXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnJlc3VsdChfLmZpbmQodXNlcnMsIHsgJ2FnZSc6IDEgfSksICd1c2VyJyk7XG4gKiAvLyA9PiAncGViYmxlcydcbiAqXG4gKiAvLyB1c2luZyB0aGUgXCJfLnByb3BlcnR5XCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnJlc3VsdChfLmZpbmQodXNlcnMsICdhY3RpdmUnKSwgJ3VzZXInKTtcbiAqIC8vID0+ICdmcmVkJ1xuICovXG5mdW5jdGlvbiBmaW5kKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICBpZiAoaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgIHZhciBpbmRleCA9IGZpbmRJbmRleChjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIHRoaXNBcmcpO1xuICAgIHJldHVybiBpbmRleCA+IC0xID8gY29sbGVjdGlvbltpbmRleF0gOiB1bmRlZmluZWQ7XG4gIH1cbiAgcHJlZGljYXRlID0gYmFzZUNhbGxiYWNrKHByZWRpY2F0ZSwgdGhpc0FyZywgMyk7XG4gIHJldHVybiBiYXNlRmluZChjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIGJhc2VFYWNoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4xLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlSXNFcXVhbCA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWlzZXF1YWwnKSxcbiAgICBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2JpbmRjYWxsYmFjaycpLFxuICAgIGtleXMgPSByZXF1aXJlKCdsb2Rhc2gua2V5cycpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jYWxsYmFja2Agd2hpY2ggc3VwcG9ydHMgc3BlY2lmeWluZyB0aGVcbiAqIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gW2Z1bmM9Xy5pZGVudGl0eV0gVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBjYWxsYmFjay5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJhc2VDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBmdW5jO1xuICBpZiAodHlwZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgdGhpc0FyZyAhPSAndW5kZWZpbmVkJylcbiAgICAgID8gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KVxuICAgICAgOiBmdW5jO1xuICB9XG4gIGlmIChmdW5jID09IG51bGwpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gYmFzZU1hdGNoZXMoZnVuYyk7XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiB0aGlzQXJnID09ICd1bmRlZmluZWQnXG4gICAgPyBiYXNlUHJvcGVydHkoZnVuYyArICcnKVxuICAgIDogYmFzZU1hdGNoZXNQcm9wZXJ0eShmdW5jICsgJycsIHRoaXNBcmcpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTWF0Y2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgb3IgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHNvdXJjZSBwcm9wZXJ0eSBuYW1lcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgc291cmNlIHZhbHVlcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IHN0cmljdENvbXBhcmVGbGFncyBTdHJpY3QgY29tcGFyaXNvbiBmbGFncyBmb3Igc291cmNlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBvYmplY3RgIGlzIGEgbWF0Y2gsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTWF0Y2gob2JqZWN0LCBwcm9wcywgdmFsdWVzLCBzdHJpY3RDb21wYXJlRmxhZ3MsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuICFsZW5ndGg7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBub0N1c3RvbWl6ZXIgPSAhY3VzdG9taXplcjtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmICgobm9DdXN0b21pemVyICYmIHN0cmljdENvbXBhcmVGbGFnc1tpbmRleF0pXG4gICAgICAgICAgPyB2YWx1ZXNbaW5kZXhdICE9PSBvYmplY3RbcHJvcHNbaW5kZXhdXVxuICAgICAgICAgIDogIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wc1tpbmRleF0pXG4gICAgICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBpbmRleCA9IC0xO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBzdHJpY3RDb21wYXJlRmxhZ3NbaW5kZXhdKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIHNyY1ZhbHVlID0gdmFsdWVzW2luZGV4XTtcblxuICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXkpIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmVzdWx0ID0gYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCBjdXN0b21pemVyLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc2Agd2hpY2ggZG9lcyBub3QgY2xvbmUgYHNvdXJjZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gIHZhciBwcm9wcyA9IGtleXMoc291cmNlKSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICBpZiAobGVuZ3RoID09IDEpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbMF0sXG4gICAgICAgIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICBpZiAoaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgb2JqZWN0W2tleV0gPT09IHZhbHVlICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgdmFyIHZhbHVlcyA9IEFycmF5KGxlbmd0aCksXG4gICAgICBzdHJpY3RDb21wYXJlRmxhZ3MgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhbHVlID0gc291cmNlW3Byb3BzW2xlbmd0aF1dO1xuICAgIHZhbHVlc1tsZW5ndGhdID0gdmFsdWU7XG4gICAgc3RyaWN0Q29tcGFyZUZsYWdzW2xlbmd0aF0gPSBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gYmFzZUlzTWF0Y2gob2JqZWN0LCBwcm9wcywgdmFsdWVzLCBzdHJpY3RDb21wYXJlRmxhZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNQcm9wZXJ0eWAgd2hpY2ggZG9lcyBub3QgY29lcmNlIGBrZXlgXG4gKiB0byBhIHN0cmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzUHJvcGVydHkoa2V5LCB2YWx1ZSkge1xuICBpZiAoaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBvYmplY3Rba2V5XSA9PT0gdmFsdWU7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGJhc2VJc0VxdWFsKHZhbHVlLCBvYmplY3Rba2V5XSwgbnVsbCwgdHJ1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdoaWNoIGRvZXMgbm90IGNvZXJjZSBga2V5YCB0byBhIHN0cmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpZiBzdWl0YWJsZSBmb3Igc3RyaWN0XG4gKiAgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgJiYgKHZhbHVlID09PSAwID8gKCgxIC8gdmFsdWUpID4gMCkgOiAhaXNPYmplY3QodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqIF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNhbGxiYWNrO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXN0eXBlZGFycmF5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYHRoaXNgIGJpbmRpbmdcbiAqIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzV2hlcmVdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3IgaWRlbnRpY2FsIHZhbHVlcy5cbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIC8vIFRyZWF0IGArMGAgdnMuIGAtMGAgYXMgbm90IGVxdWFsLlxuICAgIHJldHVybiB2YWx1ZSAhPT0gMCB8fCAoMSAvIHZhbHVlID09IDEgLyBvdGhlcik7XG4gIH1cbiAgdmFyIHZhbFR5cGUgPSB0eXBlb2YgdmFsdWUsXG4gICAgICBvdGhUeXBlID0gdHlwZW9mIG90aGVyO1xuXG4gIC8vIEV4aXQgZWFybHkgZm9yIHVubGlrZSBwcmltaXRpdmUgdmFsdWVzLlxuICBpZiAoKHZhbFR5cGUgIT0gJ2Z1bmN0aW9uJyAmJiB2YWxUeXBlICE9ICdvYmplY3QnICYmIG90aFR5cGUgIT0gJ2Z1bmN0aW9uJyAmJiBvdGhUeXBlICE9ICdvYmplY3QnKSB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsKSB7XG4gICAgLy8gUmV0dXJuIGBmYWxzZWAgdW5sZXNzIGJvdGggdmFsdWVzIGFyZSBgTmFOYC5cbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYmFzZUlzRXF1YWwsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgb2JqZWN0cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzV2hlcmVdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICBvdGhUYWcgPSBhcnJheVRhZztcblxuICBpZiAoIW9iaklzQXJyKSB7XG4gICAgb2JqVGFnID0gb2JqVG9TdHJpbmcuY2FsbChvYmplY3QpO1xuICAgIGlmIChvYmpUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb2JqVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob2JqVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb2JqSXNBcnIgPSBpc1R5cGVkQXJyYXkob2JqZWN0KTtcbiAgICB9XG4gIH1cbiAgaWYgKCFvdGhJc0Fycikge1xuICAgIG90aFRhZyA9IG9ialRvU3RyaW5nLmNhbGwob3RoZXIpO1xuICAgIGlmIChvdGhUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb3RoVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob3RoVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb3RoSXNBcnIgPSBpc1R5cGVkQXJyYXkob3RoZXIpO1xuICAgIH1cbiAgfVxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmICEob2JqSXNBcnIgfHwgb2JqSXNPYmopKSB7XG4gICAgcmV0dXJuIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnKTtcbiAgfVxuICB2YXIgdmFsV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgIG90aFdyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICBpZiAodmFsV3JhcHBlZCB8fCBvdGhXcmFwcGVkKSB7XG4gICAgcmV0dXJuIGVxdWFsRnVuYyh2YWxXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsIG90aFdyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXIsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIC8vIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIGRldGVjdGluZyBjaXJjdWxhciByZWZlcmVuY2VzIHNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI0pPLlxuICBzdGFja0EgfHwgKHN0YWNrQSA9IFtdKTtcbiAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG5cbiAgdmFyIGxlbmd0aCA9IHN0YWNrQS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChzdGFja0FbbGVuZ3RoXSA9PSBvYmplY3QpIHtcbiAgICAgIHJldHVybiBzdGFja0JbbGVuZ3RoXSA9PSBvdGhlcjtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIGBvYmplY3RgIGFuZCBgb3RoZXJgIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgc3RhY2tBLnB1c2gob2JqZWN0KTtcbiAgc3RhY2tCLnB1c2gob3RoZXIpO1xuXG4gIHZhciByZXN1bHQgPSAob2JqSXNBcnIgPyBlcXVhbEFycmF5cyA6IGVxdWFsT2JqZWN0cykob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQik7XG5cbiAgc3RhY2tBLnBvcCgpO1xuICBzdGFja0IucG9wKCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgYXJyYXlzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNXaGVyZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gdHJ1ZTtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzV2hlcmUgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBEZWVwIGNvbXBhcmUgdGhlIGNvbnRlbnRzLCBpZ25vcmluZyBub24tbnVtZXJpYyBwcm9wZXJ0aWVzLlxuICB3aGlsZSAocmVzdWx0ICYmICsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdO1xuXG4gICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICByZXN1bHQgPSBpc1doZXJlXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4KVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgaWYgKGlzV2hlcmUpIHtcbiAgICAgICAgdmFyIG90aEluZGV4ID0gb3RoTGVuZ3RoO1xuICAgICAgICB3aGlsZSAob3RoSW5kZXgtLSkge1xuICAgICAgICAgIG90aFZhbHVlID0gb3RoZXJbb3RoSW5kZXhdO1xuICAgICAgICAgIHJlc3VsdCA9IChhcnJWYWx1ZSAmJiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IChhcnJWYWx1ZSAmJiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuICEhcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIC8vIENvZXJjZSBkYXRlcyBhbmQgYm9vbGVhbnMgdG8gbnVtYmVycywgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzIGFuZCBib29sZWFuc1xuICAgICAgLy8gdG8gYDFgIG9yIGAwYCB0cmVhdGluZyBpbnZhbGlkIGRhdGVzIGNvZXJjZWQgdG8gYE5hTmAgYXMgbm90IGVxdWFsLlxuICAgICAgcmV0dXJuICtvYmplY3QgPT0gK290aGVyO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIFRyZWF0IGBOYU5gIHZzLiBgTmFOYCBhcyBlcXVhbC5cbiAgICAgIHJldHVybiAob2JqZWN0ICE9ICtvYmplY3QpXG4gICAgICAgID8gb3RoZXIgIT0gK290aGVyXG4gICAgICAgIC8vIEJ1dCwgdHJlYXQgYC0wYCB2cy4gYCswYCBhcyBub3QgZXF1YWwuXG4gICAgICAgIDogKG9iamVjdCA9PSAwID8gKCgxIC8gb2JqZWN0KSA9PSAoMSAvIG90aGVyKSkgOiBvYmplY3QgPT0gK290aGVyKTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncyBwcmltaXRpdmVzIGFuZCBzdHJpbmdcbiAgICAgIC8vIG9iamVjdHMgYXMgZXF1YWwuIFNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI3gxNS4xMC42LjQgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNXaGVyZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBvYmpQcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgIG90aFByb3BzID0ga2V5cyhvdGhlciksXG4gICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzV2hlcmUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGhhc0N0b3IsXG4gICAgICBpbmRleCA9IC0xO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XSxcbiAgICAgICAgcmVzdWx0ID0gaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KTtcblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgcmVzdWx0ID0gaXNXaGVyZVxuICAgICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSlcbiAgICAgICAgICA6IGN1c3RvbWl6ZXIob2JqVmFsdWUsIG90aFZhbHVlLCBrZXkpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgIHJlc3VsdCA9IChvYmpWYWx1ZSAmJiBvYmpWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaGFzQ3RvciB8fCAoaGFzQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAoIWhhc0N0b3IpIHtcbiAgICB2YXIgb2JqQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgaWYgKG9iakN0b3IgIT0gb3RoQ3RvciAmJlxuICAgICAgICAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmXG4gICAgICAgICAgdHlwZW9mIG90aEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvdGhDdG9yIGluc3RhbmNlb2Ygb3RoQ3RvcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRXF1YWw7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9XG50eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9IHR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiB0eXBlZEFycmF5VGFnc1tvYmpUb1N0cmluZy5jYWxsKHZhbHVlKV0pIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fHN0cmluZ30gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5sZW5ndGggOiAwO1xuICBpZiAoIWlzTGVuZ3RoKGxlbmd0aCkpIHtcbiAgICByZXR1cm4gYmFzZUZvck93bihjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpdGVyYWJsZSA9IHRvT2JqZWN0KGNvbGxlY3Rpb24pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29sbGVjdGlvbjtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0b3IgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGl0ZXJhYmxlID0gdG9PYmplY3Qob2JqZWN0KSxcbiAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIG9iamVjdCBpZiBpdCBpcyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID8gdmFsdWUgOiBPYmplY3QodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogKipOb3RlOioqIFNlZSB0aGUgW0VTNSBzcGVjXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKHZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VFYWNoO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kYCwgYF8uZmluZExhc3RgLCBgXy5maW5kS2V5YCwgYW5kIGBfLmZpbmRMYXN0S2V5YCxcbiAqIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2sgc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcsIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBjb2xsZWN0aW9uYCB1c2luZyB0aGUgcHJvdmlkZWQgYGVhY2hGdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBgY29sbGVjdGlvbmAuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXRLZXldIFNwZWNpZnkgcmV0dXJuaW5nIHRoZSBrZXkgb2YgdGhlIGZvdW5kIGVsZW1lbnRcbiAqICBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmb3VuZCBlbGVtZW50IG9yIGl0cyBrZXksIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgZWFjaEZ1bmMsIHJldEtleSkge1xuICB2YXIgcmVzdWx0O1xuICBlYWNoRnVuYyhjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSkge1xuICAgICAgcmVzdWx0ID0gcmV0S2V5ID8ga2V5IDogdmFsdWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRmluZDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUNhbGxiYWNrID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlY2FsbGJhY2snKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmZpbmRgIGV4Y2VwdCB0aGF0IGl0IHJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdFxuICogZWxlbWVudCBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IsIGluc3RlYWQgb2YgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICpcbiAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLnByb3BlcnR5XCJcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIElmIGFuIG9iamVjdCBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLm1hdGNoZXNcIiBzdHlsZVxuICogY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZ2l2ZW5cbiAqIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxzdHJpbmd9IFtwcmVkaWNhdGU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWRcbiAqICBwZXIgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHByb3ZpZGVkIGl0IGlzIHVzZWQgdG9cbiAqICBjcmVhdGUgYSBcIl8ucHJvcGVydHlcIiBvciBcIl8ubWF0Y2hlc1wiIHN0eWxlIGNhbGxiYWNrIHJlc3BlY3RpdmVseS5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgcHJlZGljYXRlYC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmb3VuZCBlbGVtZW50LCBlbHNlIGAtMWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAgJ2FnZSc6IDM2LCAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAgJ2FnZSc6IDQwLCAnYWN0aXZlJzogdHJ1ZSB9LFxuICogICB7ICd1c2VyJzogJ3BlYmJsZXMnLCAnYWdlJzogMSwgICdhY3RpdmUnOiBmYWxzZSB9XG4gKiBdO1xuICpcbiAqIF8uZmluZEluZGV4KHVzZXJzLCBmdW5jdGlvbihjaHIpIHsgcmV0dXJuIGNoci5hZ2UgPCA0MDsgfSk7XG4gKiAvLyA9PiAwXG4gKlxuICogLy8gdXNpbmcgdGhlIFwiXy5tYXRjaGVzXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLmZpbmRJbmRleCh1c2VycywgeyAnYWdlJzogMSB9KTtcbiAqIC8vID0+IDJcbiAqXG4gKiAvLyB1c2luZyB0aGUgXCJfLnByb3BlcnR5XCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLmZpbmRJbmRleCh1c2VycywgJ2FjdGl2ZScpO1xuICogLy8gPT4gMVxuICovXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICBwcmVkaWNhdGUgPSBiYXNlQ2FsbGJhY2socHJlZGljYXRlLCB0aGlzQXJnLCAzKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmluZEluZGV4O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiZWZvcmUgPSByZXF1aXJlKCdsb2Rhc2guYmVmb3JlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaXMgcmVzdHJpY3RlZCB0byBpbnZva2luZyBgZnVuY2Agb25jZS4gUmVwZWF0IGNhbGxzXG4gKiB0byB0aGUgZnVuY3Rpb24gcmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgY2FsbC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgY3JlYXRlZCBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUgRnVuY3Rpb25cbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyByZXN0cmljdGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgaW5pdGlhbGl6ZSA9IF8ub25jZShjcmVhdGVBcHBsaWNhdGlvbik7XG4gKiBpbml0aWFsaXplKCk7XG4gKiBpbml0aWFsaXplKCk7XG4gKiAvLyBgaW5pdGlhbGl6ZWAgaW52b2tlcyBgY3JlYXRlQXBwbGljYXRpb25gIG9uY2VcbiAqL1xuZnVuY3Rpb24gb25jZShmdW5jKSB7XG4gIHJldHVybiBiZWZvcmUoZnVuYywgMik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb25jZTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgLCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBhbmQgYXJndW1lbnRzXG4gKiBvZiB0aGUgY3JlYXRlZCBmdW5jdGlvbiwgd2hpbGUgaXQgaXMgY2FsbGVkIGxlc3MgdGhhbiBgbmAgdGltZXMuIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBjcmVhdGVkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgY2FsbHMgYXQgd2hpY2ggYGZ1bmNgIGlzIG5vIGxvbmdlciBpbnZva2VkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyByZXN0cmljdGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiBqUXVlcnkoJyNhZGQnKS5vbignY2xpY2snLCBfLmJlZm9yZSg1LCBhZGRDb250YWN0VG9MaXN0KSk7XG4gKiAvLyA9PiBhbGxvd3MgYWRkaW5nIHVwIHRvIDQgY29udGFjdHMgdG8gdGhlIGxpc3RcbiAqL1xuZnVuY3Rpb24gYmVmb3JlKG4sIGZ1bmMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIG4gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIHRlbXAgPSBuO1xuICAgICAgbiA9IGZ1bmM7XG4gICAgICBmdW5jID0gdGVtcDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKC0tbiA+IDApIHtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVuYyA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmVmb3JlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnbG9kYXNoLmlzZnVuY3Rpb24nKTtcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgdmFsdWUgb2YgcHJvcGVydHkgYGtleWAgb24gYG9iamVjdGAuIElmIHRoZSB2YWx1ZSBvZiBga2V5YCBpc1xuICogYSBmdW5jdGlvbiBpdCBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBvYmplY3RgIGFuZCBpdHMgcmVzdWx0XG4gKiBpcyByZXR1cm5lZCwgZWxzZSB0aGUgcHJvcGVydHkgdmFsdWUgaXMgcmV0dXJuZWQuIElmIHRoZSBwcm9wZXJ0eSB2YWx1ZSBpc1xuICogYHVuZGVmaW5lZGAgdGhlIGBkZWZhdWx0VmFsdWVgIGlzIHVzZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIHJlc29sdmUuXG4gKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBpZiB0aGUgcHJvcGVydHkgdmFsdWVcbiAqICByZXNvbHZlcyB0byBgdW5kZWZpbmVkYC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcsICdhZ2UnOiBfLmNvbnN0YW50KDQwKSB9O1xuICpcbiAqIF8ucmVzdWx0KG9iamVjdCwgJ3VzZXInKTtcbiAqIC8vID0+ICdmcmVkJ1xuICpcbiAqIF8ucmVzdWx0KG9iamVjdCwgJ2FnZScpO1xuICogLy8gPT4gNDBcbiAqXG4gKiBfLnJlc3VsdChvYmplY3QsICdzdGF0dXMnLCAnYnVzeScpO1xuICogLy8gPT4gJ2J1c3knXG4gKlxuICogXy5yZXN1bHQob2JqZWN0LCAnc3RhdHVzJywgXy5jb25zdGFudCgnYnVzeScpKTtcbiAqIC8vID0+ICdidXN5J1xuICovXG5mdW5jdGlvbiByZXN1bHQob2JqZWN0LCBrZXksIGRlZmF1bHRWYWx1ZSkge1xuICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gIH1cbiAgcmV0dXJuIGlzRnVuY3Rpb24odmFsdWUpID8gdmFsdWUuY2FsbChvYmplY3QpIDogdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdWx0O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzLlxuICogU2VlIHRoaXMgW2FydGljbGUgb24gYFJlZ0V4cGAgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0Z1bmN0aW9uYCB3aXRob3V0IHN1cHBvcnQgZm9yIGVudmlyb25tZW50c1xuICogd2l0aCBpbmNvcnJlY3QgYHR5cGVvZmAgcmVzdWx0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBBdm9pZCBhIENoYWtyYSBKSVQgYnVnIGluIGNvbXBhdGliaWxpdHkgbW9kZXMgb2YgSUUgMTEuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvaXNzdWVzLzE2MjEgZm9yIG1vcmUgZGV0YWlscy5cbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQgaXMgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZXNjYXBlUmVnRXhwKG9ialRvU3RyaW5nKVxuICAucmVwbGFjZSgvdG9TdHJpbmd8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgVWludDhBcnJheSA9IGlzTmF0aXZlKFVpbnQ4QXJyYXkgPSBnbG9iYWwuVWludDhBcnJheSkgJiYgVWludDhBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzRnVuY3Rpb24gPSAhKGJhc2VJc0Z1bmN0aW9uKC94LykgfHwgKFVpbnQ4QXJyYXkgJiYgIWJhc2VJc0Z1bmN0aW9uKFVpbnQ4QXJyYXkpKSkgPyBiYXNlSXNGdW5jdGlvbiA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaSB3aGljaCByZXR1cm4gJ2Z1bmN0aW9uJyBmb3IgcmVnZXhlc1xuICAvLyBhbmQgU2FmYXJpIDggZXF1aXZhbGVudHMgd2hpY2ggcmV0dXJuICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvcnMuXG4gIHJldHVybiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIHJlSG9zdEN0b3IudGVzdCh2YWx1ZSkpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIiwgXCIqXCIsXG4gKiBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOi8vbG9kYXNoXFwuY29tL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VjYWxsYmFjaycpLFxuICAgIGJhc2VVbmlxID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNldW5pcScpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnbG9kYXNoLl9pc2l0ZXJhdGVlY2FsbCcpO1xuXG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuaXFgIG9wdGltaXplZCBmb3Igc29ydGVkIGFycmF5cyB3aXRob3V0IHN1cHBvcnRcbiAqIGZvciBjYWxsYmFjayBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUtdmFsdWUtZnJlZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gc29ydGVkVW5pcShhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIHNlZW4sXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzSW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBhcnJheSkgOiB2YWx1ZTtcblxuICAgIGlmICghaW5kZXggfHwgc2VlbiAhPT0gY29tcHV0ZWQpIHtcbiAgICAgIHNlZW4gPSBjb21wdXRlZDtcbiAgICAgIHJlc3VsdFsrK3Jlc0luZGV4XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBkdXBsaWNhdGUtdmFsdWUtZnJlZSB2ZXJzaW9uIG9mIGFuIGFycmF5IHVzaW5nIGBTYW1lVmFsdWVaZXJvYFxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLiBQcm92aWRpbmcgYHRydWVgIGZvciBgaXNTb3J0ZWRgIHBlcmZvcm1zIGEgZmFzdGVyXG4gKiBzZWFyY2ggYWxnb3JpdGhtIGZvciBzb3J0ZWQgYXJyYXlzLiBJZiBhbiBpdGVyYXRlZSBmdW5jdGlvbiBpcyBwcm92aWRlZCBpdFxuICogaXMgaW52b2tlZCBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgYXJyYXkgdG8gZ2VuZXJhdGUgdGhlIGNyaXRlcmlvbiBieSB3aGljaFxuICogdW5pcXVlbmVzcyBpcyBjb21wdXRlZC4gVGhlIGBpdGVyYXRlZWAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkXG4gKiB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleCwgYXJyYXkpLlxuICpcbiAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLnByb3BlcnR5XCJcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIElmIGFuIG9iamVjdCBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLm1hdGNoZXNcIiBzdHlsZVxuICogY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZ2l2ZW5cbiAqIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBgU2FtZVZhbHVlWmVyb2AgY29tcGFyaXNvbnMgYXJlIGxpa2Ugc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLFxuICogZS5nLiBgPT09YCwgZXhjZXB0IHRoYXQgYE5hTmAgbWF0Y2hlcyBgTmFOYC4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIHVuaXF1ZVxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzU29ydGVkXSBTcGVjaWZ5IHRoZSBhcnJheSBpcyBzb3J0ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxzdHJpbmd9IFtpdGVyYXRlZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqICBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHByb3ZpZGVkIGl0IGlzIHVzZWQgdG8gY3JlYXRlIGEgXCJfLnByb3BlcnR5XCJcbiAqICBvciBcIl8ubWF0Y2hlc1wiIHN0eWxlIGNhbGxiYWNrIHJlc3BlY3RpdmVseS5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgaXRlcmF0ZWVgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlLXZhbHVlLWZyZWUgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udW5pcShbMSwgMiwgMV0pO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gdXNpbmcgYGlzU29ydGVkYFxuICogXy51bmlxKFsxLCAxLCAyXSwgdHJ1ZSk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyB1c2luZyBhbiBpdGVyYXRlZSBmdW5jdGlvblxuICogXy51bmlxKFsxLCAyLjUsIDEuNSwgMl0sIGZ1bmN0aW9uKG4pIHsgcmV0dXJuIHRoaXMuZmxvb3Iobik7IH0sIE1hdGgpO1xuICogLy8gPT4gWzEsIDIuNV1cbiAqXG4gKiAvLyB1c2luZyB0aGUgXCJfLnByb3BlcnR5XCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnVuaXEoW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH0sIHsgJ3gnOiAxIH1dLCAneCcpO1xuICogLy8gPT4gW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH1dXG4gKi9cbmZ1bmN0aW9uIHVuaXEoYXJyYXksIGlzU29ydGVkLCBpdGVyYXRlZSwgdGhpc0FyZykge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICBpZiAoIWxlbmd0aCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICAvLyBKdWdnbGUgYXJndW1lbnRzLlxuICBpZiAodHlwZW9mIGlzU29ydGVkICE9ICdib29sZWFuJyAmJiBpc1NvcnRlZCAhPSBudWxsKSB7XG4gICAgdGhpc0FyZyA9IGl0ZXJhdGVlO1xuICAgIGl0ZXJhdGVlID0gaXNJdGVyYXRlZUNhbGwoYXJyYXksIGlzU29ydGVkLCB0aGlzQXJnKSA/IG51bGwgOiBpc1NvcnRlZDtcbiAgICBpc1NvcnRlZCA9IGZhbHNlO1xuICB9XG4gIGl0ZXJhdGVlID0gaXRlcmF0ZWUgPT0gbnVsbCA/IGl0ZXJhdGVlIDogYmFzZUNhbGxiYWNrKGl0ZXJhdGVlLCB0aGlzQXJnLCAzKTtcbiAgcmV0dXJuIChpc1NvcnRlZClcbiAgICA/IHNvcnRlZFVuaXEoYXJyYXksIGl0ZXJhdGVlKVxuICAgIDogYmFzZVVuaXEoYXJyYXksIGl0ZXJhdGVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmlxO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlSW5kZXhPZiA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWluZGV4b2YnKSxcbiAgICBjYWNoZUluZGV4T2YgPSByZXF1aXJlKCdsb2Rhc2guX2NhY2hlaW5kZXhvZicpLFxuICAgIGNyZWF0ZUNhY2hlID0gcmVxdWlyZSgnbG9kYXNoLl9jcmVhdGVjYWNoZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuaXFgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2sgc2hvcnRoYW5kc1xuICogYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZS12YWx1ZS1mcmVlIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlVW5pcShhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmRleE9mID0gYmFzZUluZGV4T2YsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICBpc0xhcmdlID0gaXNDb21tb24gJiYgbGVuZ3RoID49IDIwMCxcbiAgICAgIHNlZW4gPSBpc0xhcmdlID8gY3JlYXRlQ2FjaGUoKSA6IG51bGwsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICBpZiAoc2Vlbikge1xuICAgIGluZGV4T2YgPSBjYWNoZUluZGV4T2Y7XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBpc0xhcmdlID0gZmFsc2U7XG4gICAgc2VlbiA9IGl0ZXJhdGVlID8gW10gOiByZXN1bHQ7XG4gIH1cbiAgb3V0ZXI6XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBhcnJheSkgOiB2YWx1ZTtcblxuICAgIGlmIChpc0NvbW1vbiAmJiB2YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgIHZhciBzZWVuSW5kZXggPSBzZWVuLmxlbmd0aDtcbiAgICAgIHdoaWxlIChzZWVuSW5kZXgtLSkge1xuICAgICAgICBpZiAoc2VlbltzZWVuSW5kZXhdID09PSBjb21wdXRlZCkge1xuICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaW5kZXhPZihzZWVuLCBjb21wdXRlZCwgMCkgPCAwKSB7XG4gICAgICBpZiAoaXRlcmF0ZWUgfHwgaXNMYXJnZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VVbmlxO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4xLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IHN1cHBvcnQgZm9yIGJpbmFyeSBzZWFyY2hlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIGlmICh2YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICByZXR1cm4gaW5kZXhPZk5hTihhcnJheSwgZnJvbUluZGV4KTtcbiAgfVxuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGBOYU5gIGlzIGZvdW5kIGluIGBhcnJheWAuXG4gKiBJZiBgZnJvbVJpZ2h0YCBpcyBwcm92aWRlZCBlbGVtZW50cyBvZiBgYXJyYXlgIGFyZSBpdGVyYXRlZCBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgYE5hTmAsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gaW5kZXhPZk5hTihhcnJheSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbUluZGV4ICsgKGZyb21SaWdodCA/IDAgOiAtMSk7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICB2YXIgb3RoZXIgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKG90aGVyICE9PSBvdGhlcikge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUluZGV4T2Y7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIGBjYWNoZWAgbWltaWNraW5nIHRoZSByZXR1cm4gc2lnbmF0dXJlIG9mXG4gKiBgXy5pbmRleE9mYCBieSByZXR1cm5pbmcgYDBgIGlmIHRoZSB2YWx1ZSBpcyBmb3VuZCwgZWxzZSBgLTFgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gY2FjaGUgVGhlIGNhY2hlIHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGAwYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlSW5kZXhPZihjYWNoZSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSBjYWNoZS5kYXRhLFxuICAgICAgcmVzdWx0ID0gKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc09iamVjdCh2YWx1ZSkpID8gZGF0YS5zZXQuaGFzKHZhbHVlKSA6IGRhdGEuaGFzaFt2YWx1ZV07XG5cbiAgcmV0dXJuIHJlc3VsdCA/IDAgOiAtMTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYWNoZUluZGV4T2Y7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzTmF0aXZlID0gcmVxdWlyZSgnbG9kYXNoLmlzbmF0aXZlJyk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgU2V0ID0gaXNOYXRpdmUoU2V0ID0gZ2xvYmFsLlNldCkgJiYgU2V0O1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUNyZWF0ZSA9IGlzTmF0aXZlKG5hdGl2ZUNyZWF0ZSA9IE9iamVjdC5jcmVhdGUpICYmIG5hdGl2ZUNyZWF0ZTtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhIGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuZGF0YSA9IHsgJ2hhc2gnOiBuYXRpdmVDcmVhdGUobnVsbCksICdzZXQnOiBuZXcgU2V0IH07XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHRoaXMucHVzaCh2YWx1ZXNbbGVuZ3RoXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBwdXNoXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBjYWNoZVB1c2godmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNPYmplY3QodmFsdWUpKSB7XG4gICAgZGF0YS5zZXQuYWRkKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhLmhhc2hbdmFsdWVdID0gdHJ1ZTtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBgU2V0YCBjYWNoZSBvYmplY3QgdG8gb3B0aW1pemUgbGluZWFyIHNlYXJjaGVzIG9mIGxhcmdlIGFycmF5cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtudWxsfE9iamVjdH0gUmV0dXJucyB0aGUgbmV3IGNhY2hlIG9iamVjdCBpZiBgU2V0YCBpcyBzdXBwb3J0ZWQsIGVsc2UgYG51bGxgLlxuICovXG52YXIgY3JlYXRlQ2FjaGUgPSAhKG5hdGl2ZUNyZWF0ZSAmJiBTZXQpID8gY29uc3RhbnQobnVsbCkgOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIG5ldyBTZXRDYWNoZSh2YWx1ZXMpO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXR1cm4gZnJvbSB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKiB2YXIgZ2V0dGVyID0gXy5jb25zdGFudChvYmplY3QpO1xuICogZ2V0dGVyKCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gY29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxuLy8gQWRkIGZ1bmN0aW9ucyB0byB0aGUgYFNldGAgY2FjaGUuXG5TZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IGNhY2hlUHVzaDtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDYWNoZTtcbiIsIi8qZ2xvYmFsIGRlZmluZTpmYWxzZSAqL1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMyBDcmFpZyBDYW1wYmVsbFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIE1vdXNldHJhcCBpcyBhIHNpbXBsZSBrZXlib2FyZCBzaG9ydGN1dCBsaWJyYXJ5IGZvciBKYXZhc2NyaXB0IHdpdGhcbiAqIG5vIGV4dGVybmFsIGRlcGVuZGVuY2llc1xuICpcbiAqIEB2ZXJzaW9uIDEuNC42XG4gKiBAdXJsIGNyYWlnLmlzL2tpbGxpbmcvbWljZVxuICovXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG5cbiAgICAvKipcbiAgICAgKiBtYXBwaW5nIG9mIHNwZWNpYWwga2V5Y29kZXMgdG8gdGhlaXIgY29ycmVzcG9uZGluZyBrZXlzXG4gICAgICpcbiAgICAgKiBldmVyeXRoaW5nIGluIHRoaXMgZGljdGlvbmFyeSBjYW5ub3QgdXNlIGtleXByZXNzIGV2ZW50c1xuICAgICAqIHNvIGl0IGhhcyB0byBiZSBoZXJlIHRvIG1hcCB0byB0aGUgY29ycmVjdCBrZXljb2RlcyBmb3JcbiAgICAgKiBrZXl1cC9rZXlkb3duIGV2ZW50c1xuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX01BUCA9IHtcbiAgICAgICAgICAgIDg6ICdiYWNrc3BhY2UnLFxuICAgICAgICAgICAgOTogJ3RhYicsXG4gICAgICAgICAgICAxMzogJ2VudGVyJyxcbiAgICAgICAgICAgIDE2OiAnc2hpZnQnLFxuICAgICAgICAgICAgMTc6ICdjdHJsJyxcbiAgICAgICAgICAgIDE4OiAnYWx0JyxcbiAgICAgICAgICAgIDIwOiAnY2Fwc2xvY2snLFxuICAgICAgICAgICAgMjc6ICdlc2MnLFxuICAgICAgICAgICAgMzI6ICdzcGFjZScsXG4gICAgICAgICAgICAzMzogJ3BhZ2V1cCcsXG4gICAgICAgICAgICAzNDogJ3BhZ2Vkb3duJyxcbiAgICAgICAgICAgIDM1OiAnZW5kJyxcbiAgICAgICAgICAgIDM2OiAnaG9tZScsXG4gICAgICAgICAgICAzNzogJ2xlZnQnLFxuICAgICAgICAgICAgMzg6ICd1cCcsXG4gICAgICAgICAgICAzOTogJ3JpZ2h0JyxcbiAgICAgICAgICAgIDQwOiAnZG93bicsXG4gICAgICAgICAgICA0NTogJ2lucycsXG4gICAgICAgICAgICA0NjogJ2RlbCcsXG4gICAgICAgICAgICA5MTogJ21ldGEnLFxuICAgICAgICAgICAgOTM6ICdtZXRhJyxcbiAgICAgICAgICAgIDIyNDogJ21ldGEnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG1hcHBpbmcgZm9yIHNwZWNpYWwgY2hhcmFjdGVycyBzbyB0aGV5IGNhbiBzdXBwb3J0XG4gICAgICAgICAqXG4gICAgICAgICAqIHRoaXMgZGljdGlvbmFyeSBpcyBvbmx5IHVzZWQgaW5jYXNlIHlvdSB3YW50IHRvIGJpbmQgYVxuICAgICAgICAgKiBrZXl1cCBvciBrZXlkb3duIGV2ZW50IHRvIG9uZSBvZiB0aGVzZSBrZXlzXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBfS0VZQ09ERV9NQVAgPSB7XG4gICAgICAgICAgICAxMDY6ICcqJyxcbiAgICAgICAgICAgIDEwNzogJysnLFxuICAgICAgICAgICAgMTA5OiAnLScsXG4gICAgICAgICAgICAxMTA6ICcuJyxcbiAgICAgICAgICAgIDExMSA6ICcvJyxcbiAgICAgICAgICAgIDE4NjogJzsnLFxuICAgICAgICAgICAgMTg3OiAnPScsXG4gICAgICAgICAgICAxODg6ICcsJyxcbiAgICAgICAgICAgIDE4OTogJy0nLFxuICAgICAgICAgICAgMTkwOiAnLicsXG4gICAgICAgICAgICAxOTE6ICcvJyxcbiAgICAgICAgICAgIDE5MjogJ2AnLFxuICAgICAgICAgICAgMjE5OiAnWycsXG4gICAgICAgICAgICAyMjA6ICdcXFxcJyxcbiAgICAgICAgICAgIDIyMTogJ10nLFxuICAgICAgICAgICAgMjIyOiAnXFwnJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0aGlzIGlzIGEgbWFwcGluZyBvZiBrZXlzIHRoYXQgcmVxdWlyZSBzaGlmdCBvbiBhIFVTIGtleXBhZFxuICAgICAgICAgKiBiYWNrIHRvIHRoZSBub24gc2hpZnQgZXF1aXZlbGVudHNcbiAgICAgICAgICpcbiAgICAgICAgICogdGhpcyBpcyBzbyB5b3UgY2FuIHVzZSBrZXl1cCBldmVudHMgd2l0aCB0aGVzZSBrZXlzXG4gICAgICAgICAqXG4gICAgICAgICAqIG5vdGUgdGhhdCB0aGlzIHdpbGwgb25seSB3b3JrIHJlbGlhYmx5IG9uIFVTIGtleWJvYXJkc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgX1NISUZUX01BUCA9IHtcbiAgICAgICAgICAgICd+JzogJ2AnLFxuICAgICAgICAgICAgJyEnOiAnMScsXG4gICAgICAgICAgICAnQCc6ICcyJyxcbiAgICAgICAgICAgICcjJzogJzMnLFxuICAgICAgICAgICAgJyQnOiAnNCcsXG4gICAgICAgICAgICAnJSc6ICc1JyxcbiAgICAgICAgICAgICdeJzogJzYnLFxuICAgICAgICAgICAgJyYnOiAnNycsXG4gICAgICAgICAgICAnKic6ICc4JyxcbiAgICAgICAgICAgICcoJzogJzknLFxuICAgICAgICAgICAgJyknOiAnMCcsXG4gICAgICAgICAgICAnXyc6ICctJyxcbiAgICAgICAgICAgICcrJzogJz0nLFxuICAgICAgICAgICAgJzonOiAnOycsXG4gICAgICAgICAgICAnXFxcIic6ICdcXCcnLFxuICAgICAgICAgICAgJzwnOiAnLCcsXG4gICAgICAgICAgICAnPic6ICcuJyxcbiAgICAgICAgICAgICc/JzogJy8nLFxuICAgICAgICAgICAgJ3wnOiAnXFxcXCdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogdGhpcyBpcyBhIGxpc3Qgb2Ygc3BlY2lhbCBzdHJpbmdzIHlvdSBjYW4gdXNlIHRvIG1hcFxuICAgICAgICAgKiB0byBtb2RpZmllciBrZXlzIHdoZW4geW91IHNwZWNpZnkgeW91ciBrZXlib2FyZCBzaG9ydGN1dHNcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIF9TUEVDSUFMX0FMSUFTRVMgPSB7XG4gICAgICAgICAgICAnb3B0aW9uJzogJ2FsdCcsXG4gICAgICAgICAgICAnY29tbWFuZCc6ICdtZXRhJyxcbiAgICAgICAgICAgICdyZXR1cm4nOiAnZW50ZXInLFxuICAgICAgICAgICAgJ2VzY2FwZSc6ICdlc2MnLFxuICAgICAgICAgICAgJ21vZCc6IC9NYWN8aVBvZHxpUGhvbmV8aVBhZC8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pID8gJ21ldGEnIDogJ2N0cmwnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHZhcmlhYmxlIHRvIHN0b3JlIHRoZSBmbGlwcGVkIHZlcnNpb24gb2YgX01BUCBmcm9tIGFib3ZlXG4gICAgICAgICAqIG5lZWRlZCB0byBjaGVjayBpZiB3ZSBzaG91bGQgdXNlIGtleXByZXNzIG9yIG5vdCB3aGVuIG5vIGFjdGlvblxuICAgICAgICAgKiBpcyBzcGVjaWZpZWRcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge09iamVjdHx1bmRlZmluZWR9XG4gICAgICAgICAqL1xuICAgICAgICBfUkVWRVJTRV9NQVAsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGEgbGlzdCBvZiBhbGwgdGhlIGNhbGxiYWNrcyBzZXR1cCB2aWEgTW91c2V0cmFwLmJpbmQoKVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgX2NhbGxiYWNrcyA9IHt9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkaXJlY3QgbWFwIG9mIHN0cmluZyBjb21iaW5hdGlvbnMgdG8gY2FsbGJhY2tzIHVzZWQgZm9yIHRyaWdnZXIoKVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgX2RpcmVjdE1hcCA9IHt9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBrZWVwcyB0cmFjayBvZiB3aGF0IGxldmVsIGVhY2ggc2VxdWVuY2UgaXMgYXQgc2luY2UgbXVsdGlwbGVcbiAgICAgICAgICogc2VxdWVuY2VzIGNhbiBzdGFydCBvdXQgd2l0aCB0aGUgc2FtZSBzZXF1ZW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgX3NlcXVlbmNlTGV2ZWxzID0ge30sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHZhcmlhYmxlIHRvIHN0b3JlIHRoZSBzZXRUaW1lb3V0IGNhbGxcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge251bGx8bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgX3Jlc2V0VGltZXIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRlbXBvcmFyeSBzdGF0ZSB3aGVyZSB3ZSB3aWxsIGlnbm9yZSB0aGUgbmV4dCBrZXl1cFxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbnxzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBfaWdub3JlTmV4dEtleXVwID0gZmFsc2UsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRlbXBvcmFyeSBzdGF0ZSB3aGVyZSB3ZSB3aWxsIGlnbm9yZSB0aGUgbmV4dCBrZXlwcmVzc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIF9pZ25vcmVOZXh0S2V5cHJlc3MgPSBmYWxzZSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogYXJlIHdlIGN1cnJlbnRseSBpbnNpZGUgb2YgYSBzZXF1ZW5jZT9cbiAgICAgICAgICogdHlwZSBvZiBhY3Rpb24gKFwia2V5dXBcIiBvciBcImtleWRvd25cIiBvciBcImtleXByZXNzXCIpIG9yIGZhbHNlXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufHN0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIF9uZXh0RXhwZWN0ZWRBY3Rpb24gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGxvb3AgdGhyb3VnaCB0aGUgZiBrZXlzLCBmMSB0byBmMTkgYW5kIGFkZCB0aGVtIHRvIHRoZSBtYXBcbiAgICAgKiBwcm9ncmFtYXRpY2FsbHlcbiAgICAgKi9cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IDIwOyArK2kpIHtcbiAgICAgICAgX01BUFsxMTEgKyBpXSA9ICdmJyArIGk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9vcCB0aHJvdWdoIHRvIG1hcCBudW1iZXJzIG9uIHRoZSBudW1lcmljIGtleXBhZFxuICAgICAqL1xuICAgIGZvciAoaSA9IDA7IGkgPD0gOTsgKytpKSB7XG4gICAgICAgIF9NQVBbaSArIDk2XSA9IGk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY3Jvc3MgYnJvd3NlciBhZGQgZXZlbnQgbWV0aG9kXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR8SFRNTERvY3VtZW50fSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9hZGRFdmVudChvYmplY3QsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChvYmplY3QuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgb2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iamVjdC5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRha2VzIHRoZSBldmVudCBhbmQgcmV0dXJucyB0aGUga2V5IGNoYXJhY3RlclxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfY2hhcmFjdGVyRnJvbUV2ZW50KGUpIHtcblxuICAgICAgICAvLyBmb3Iga2V5cHJlc3MgZXZlbnRzIHdlIHNob3VsZCByZXR1cm4gdGhlIGNoYXJhY3RlciBhcyBpc1xuICAgICAgICBpZiAoZS50eXBlID09ICdrZXlwcmVzcycpIHtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgc2hpZnQga2V5IGlzIG5vdCBwcmVzc2VkIHRoZW4gaXQgaXMgc2FmZSB0byBhc3N1bWVcbiAgICAgICAgICAgIC8vIHRoYXQgd2Ugd2FudCB0aGUgY2hhcmFjdGVyIHRvIGJlIGxvd2VyY2FzZS4gIHRoaXMgbWVhbnMgaWZcbiAgICAgICAgICAgIC8vIHlvdSBhY2NpZGVudGFsbHkgaGF2ZSBjYXBzIGxvY2sgb24gdGhlbiB5b3VyIGtleSBiaW5kaW5nc1xuICAgICAgICAgICAgLy8gd2lsbCBjb250aW51ZSB0byB3b3JrXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGhlIG9ubHkgc2lkZSBlZmZlY3QgdGhhdCBtaWdodCBub3QgYmUgZGVzaXJlZCBpcyBpZiB5b3VcbiAgICAgICAgICAgIC8vIGJpbmQgc29tZXRoaW5nIGxpa2UgJ0EnIGNhdXNlIHlvdSB3YW50IHRvIHRyaWdnZXIgYW5cbiAgICAgICAgICAgIC8vIGV2ZW50IHdoZW4gY2FwaXRhbCBBIGlzIHByZXNzZWQgY2FwcyBsb2NrIHdpbGwgbm8gbG9uZ2VyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIHRoZSBldmVudC4gIHNoaWZ0K2Egd2lsbCB0aG91Z2guXG4gICAgICAgICAgICBpZiAoIWUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNoYXJhY3RlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvciBub24ga2V5cHJlc3MgZXZlbnRzIHRoZSBzcGVjaWFsIG1hcHMgYXJlIG5lZWRlZFxuICAgICAgICBpZiAoX01BUFtlLndoaWNoXSkge1xuICAgICAgICAgICAgcmV0dXJuIF9NQVBbZS53aGljaF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX0tFWUNPREVfTUFQW2Uud2hpY2hdKSB7XG4gICAgICAgICAgICByZXR1cm4gX0tFWUNPREVfTUFQW2Uud2hpY2hdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgaXQgaXMgbm90IGluIHRoZSBzcGVjaWFsIG1hcFxuXG4gICAgICAgIC8vIHdpdGgga2V5ZG93biBhbmQga2V5dXAgZXZlbnRzIHRoZSBjaGFyYWN0ZXIgc2VlbXMgdG8gYWx3YXlzXG4gICAgICAgIC8vIGNvbWUgaW4gYXMgYW4gdXBwZXJjYXNlIGNoYXJhY3RlciB3aGV0aGVyIHlvdSBhcmUgcHJlc3Npbmcgc2hpZnRcbiAgICAgICAgLy8gb3Igbm90LiAgd2Ugc2hvdWxkIG1ha2Ugc3VyZSBpdCBpcyBhbHdheXMgbG93ZXJjYXNlIGZvciBjb21wYXJpc29uc1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoZWNrcyBpZiB0d28gYXJyYXlzIGFyZSBlcXVhbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzMVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyczJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfbW9kaWZpZXJzTWF0Y2gobW9kaWZpZXJzMSwgbW9kaWZpZXJzMikge1xuICAgICAgICByZXR1cm4gbW9kaWZpZXJzMS5zb3J0KCkuam9pbignLCcpID09PSBtb2RpZmllcnMyLnNvcnQoKS5qb2luKCcsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVzZXRzIGFsbCBzZXF1ZW5jZSBjb3VudGVycyBleGNlcHQgZm9yIHRoZSBvbmVzIHBhc3NlZCBpblxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRvTm90UmVzZXRcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZnVuY3Rpb24gX3Jlc2V0U2VxdWVuY2VzKGRvTm90UmVzZXQpIHtcbiAgICAgICAgZG9Ob3RSZXNldCA9IGRvTm90UmVzZXQgfHwge307XG5cbiAgICAgICAgdmFyIGFjdGl2ZVNlcXVlbmNlcyA9IGZhbHNlLFxuICAgICAgICAgICAga2V5O1xuXG4gICAgICAgIGZvciAoa2V5IGluIF9zZXF1ZW5jZUxldmVscykge1xuICAgICAgICAgICAgaWYgKGRvTm90UmVzZXRba2V5XSkge1xuICAgICAgICAgICAgICAgIGFjdGl2ZVNlcXVlbmNlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfc2VxdWVuY2VMZXZlbHNba2V5XSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWFjdGl2ZVNlcXVlbmNlcykge1xuICAgICAgICAgICAgX25leHRFeHBlY3RlZEFjdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZmluZHMgYWxsIGNhbGxiYWNrcyB0aGF0IG1hdGNoIGJhc2VkIG9uIHRoZSBrZXljb2RlLCBtb2RpZmllcnMsXG4gICAgICogYW5kIGFjdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJhY3RlclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyc1xuICAgICAqIEBwYXJhbSB7RXZlbnR8T2JqZWN0fSBlXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBzZXF1ZW5jZU5hbWUgLSBuYW1lIG9mIHRoZSBzZXF1ZW5jZSB3ZSBhcmUgbG9va2luZyBmb3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGNvbWJpbmF0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBsZXZlbFxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZ2V0TWF0Y2hlcyhjaGFyYWN0ZXIsIG1vZGlmaWVycywgZSwgc2VxdWVuY2VOYW1lLCBjb21iaW5hdGlvbiwgbGV2ZWwpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgIG1hdGNoZXMgPSBbXSxcbiAgICAgICAgICAgIGFjdGlvbiA9IGUudHlwZTtcblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gZXZlbnRzIHJlbGF0ZWQgdG8gdGhpcyBrZXljb2RlXG4gICAgICAgIGlmICghX2NhbGxiYWNrc1tjaGFyYWN0ZXJdKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBhIG1vZGlmaWVyIGtleSBpcyBjb21pbmcgdXAgb24gaXRzIG93biB3ZSBzaG91bGQgYWxsb3cgaXRcbiAgICAgICAgaWYgKGFjdGlvbiA9PSAna2V5dXAnICYmIF9pc01vZGlmaWVyKGNoYXJhY3RlcikpIHtcbiAgICAgICAgICAgIG1vZGlmaWVycyA9IFtjaGFyYWN0ZXJdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGFsbCBjYWxsYmFja3MgZm9yIHRoZSBrZXkgdGhhdCB3YXMgcHJlc3NlZFxuICAgICAgICAvLyBhbmQgc2VlIGlmIGFueSBvZiB0aGVtIG1hdGNoXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBfY2FsbGJhY2tzW2NoYXJhY3Rlcl0ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gX2NhbGxiYWNrc1tjaGFyYWN0ZXJdW2ldO1xuXG4gICAgICAgICAgICAvLyBpZiBhIHNlcXVlbmNlIG5hbWUgaXMgbm90IHNwZWNpZmllZCwgYnV0IHRoaXMgaXMgYSBzZXF1ZW5jZSBhdFxuICAgICAgICAgICAgLy8gdGhlIHdyb25nIGxldmVsIHRoZW4gbW92ZSBvbnRvIHRoZSBuZXh0IG1hdGNoXG4gICAgICAgICAgICBpZiAoIXNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5zZXEgJiYgX3NlcXVlbmNlTGV2ZWxzW2NhbGxiYWNrLnNlcV0gIT0gY2FsbGJhY2subGV2ZWwpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlIGFjdGlvbiB3ZSBhcmUgbG9va2luZyBmb3IgZG9lc24ndCBtYXRjaCB0aGUgYWN0aW9uIHdlIGdvdFxuICAgICAgICAgICAgLy8gdGhlbiB3ZSBzaG91bGQga2VlcCBnb2luZ1xuICAgICAgICAgICAgaWYgKGFjdGlvbiAhPSBjYWxsYmFjay5hY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhIGtleXByZXNzIGV2ZW50IGFuZCB0aGUgbWV0YSBrZXkgYW5kIGNvbnRyb2wga2V5XG4gICAgICAgICAgICAvLyBhcmUgbm90IHByZXNzZWQgdGhhdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gb25seSBsb29rIGF0IHRoZVxuICAgICAgICAgICAgLy8gY2hhcmFjdGVyLCBvdGhlcndpc2UgY2hlY2sgdGhlIG1vZGlmaWVycyBhcyB3ZWxsXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gY2hyb21lIHdpbGwgbm90IGZpcmUgYSBrZXlwcmVzcyBpZiBtZXRhIG9yIGNvbnRyb2wgaXMgZG93blxuICAgICAgICAgICAgLy8gc2FmYXJpIHdpbGwgZmlyZSBhIGtleXByZXNzIGlmIG1ldGEgb3IgbWV0YStzaGlmdCBpcyBkb3duXG4gICAgICAgICAgICAvLyBmaXJlZm94IHdpbGwgZmlyZSBhIGtleXByZXNzIGlmIG1ldGEgb3IgY29udHJvbCBpcyBkb3duXG4gICAgICAgICAgICBpZiAoKGFjdGlvbiA9PSAna2V5cHJlc3MnICYmICFlLm1ldGFLZXkgJiYgIWUuY3RybEtleSkgfHwgX21vZGlmaWVyc01hdGNoKG1vZGlmaWVycywgY2FsbGJhY2subW9kaWZpZXJzKSkge1xuXG4gICAgICAgICAgICAgICAgLy8gd2hlbiB5b3UgYmluZCBhIGNvbWJpbmF0aW9uIG9yIHNlcXVlbmNlIGEgc2Vjb25kIHRpbWUgaXRcbiAgICAgICAgICAgICAgICAvLyBzaG91bGQgb3ZlcndyaXRlIHRoZSBmaXJzdCBvbmUuICBpZiBhIHNlcXVlbmNlTmFtZSBvclxuICAgICAgICAgICAgICAgIC8vIGNvbWJpbmF0aW9uIGlzIHNwZWNpZmllZCBpbiB0aGlzIGNhbGwgaXQgZG9lcyBqdXN0IHRoYXRcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIEB0b2RvIG1ha2UgZGVsZXRpbmcgaXRzIG93biBtZXRob2Q/XG4gICAgICAgICAgICAgICAgdmFyIGRlbGV0ZUNvbWJvID0gIXNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5jb21ibyA9PSBjb21iaW5hdGlvbjtcbiAgICAgICAgICAgICAgICB2YXIgZGVsZXRlU2VxdWVuY2UgPSBzZXF1ZW5jZU5hbWUgJiYgY2FsbGJhY2suc2VxID09IHNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5sZXZlbCA9PSBsZXZlbDtcbiAgICAgICAgICAgICAgICBpZiAoZGVsZXRlQ29tYm8gfHwgZGVsZXRlU2VxdWVuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgX2NhbGxiYWNrc1tjaGFyYWN0ZXJdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtYXRjaGVzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdGFrZXMgYSBrZXkgZXZlbnQgYW5kIGZpZ3VyZXMgb3V0IHdoYXQgdGhlIG1vZGlmaWVycyBhcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2V2ZW50TW9kaWZpZXJzKGUpIHtcbiAgICAgICAgdmFyIG1vZGlmaWVycyA9IFtdO1xuXG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnc2hpZnQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmFsdEtleSkge1xuICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ2FsdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUuY3RybEtleSkge1xuICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ2N0cmwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdtZXRhJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW9kaWZpZXJzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHByZXZlbnRzIGRlZmF1bHQgZm9yIHRoaXMgZXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZnVuY3Rpb24gX3ByZXZlbnREZWZhdWx0KGUpIHtcbiAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdG9wcyBwcm9wb2dhdGlvbiBmb3IgdGhpcyBldmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfc3RvcFByb3BhZ2F0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUuc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFjdHVhbGx5IGNhbGxzIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqXG4gICAgICogaWYgeW91ciBjYWxsYmFjayBmdW5jdGlvbiByZXR1cm5zIGZhbHNlIHRoaXMgd2lsbCB1c2UgdGhlIGpxdWVyeVxuICAgICAqIGNvbnZlbnRpb24gLSBwcmV2ZW50IGRlZmF1bHQgYW5kIHN0b3AgcHJvcG9nYXRpb24gb24gdGhlIGV2ZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZnVuY3Rpb24gX2ZpcmVDYWxsYmFjayhjYWxsYmFjaywgZSwgY29tYm8sIHNlcXVlbmNlKSB7XG5cbiAgICAgICAgLy8gaWYgdGhpcyBldmVudCBzaG91bGQgbm90IGhhcHBlbiBzdG9wIGhlcmVcbiAgICAgICAgaWYgKE1vdXNldHJhcC5zdG9wQ2FsbGJhY2soZSwgZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50LCBjb21ibywgc2VxdWVuY2UpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2soZSwgY29tYm8pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgX3ByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgICAgX3N0b3BQcm9wYWdhdGlvbihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGhhbmRsZXMgYSBjaGFyYWN0ZXIga2V5IGV2ZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcmFjdGVyXG4gICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfaGFuZGxlS2V5KGNoYXJhY3RlciwgbW9kaWZpZXJzLCBlKSB7XG4gICAgICAgIHZhciBjYWxsYmFja3MgPSBfZ2V0TWF0Y2hlcyhjaGFyYWN0ZXIsIG1vZGlmaWVycywgZSksXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgZG9Ob3RSZXNldCA9IHt9LFxuICAgICAgICAgICAgbWF4TGV2ZWwgPSAwLFxuICAgICAgICAgICAgcHJvY2Vzc2VkU2VxdWVuY2VDYWxsYmFjayA9IGZhbHNlO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgbWF4TGV2ZWwgZm9yIHNlcXVlbmNlcyBzbyB3ZSBjYW4gb25seSBleGVjdXRlIHRoZSBsb25nZXN0IGNhbGxiYWNrIHNlcXVlbmNlXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFja3NbaV0uc2VxKSB7XG4gICAgICAgICAgICAgICAgbWF4TGV2ZWwgPSBNYXRoLm1heChtYXhMZXZlbCwgY2FsbGJhY2tzW2ldLmxldmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxvb3AgdGhyb3VnaCBtYXRjaGluZyBjYWxsYmFja3MgZm9yIHRoaXMga2V5IGV2ZW50XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICAgICAgLy8gZmlyZSBmb3IgYWxsIHNlcXVlbmNlIGNhbGxiYWNrc1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBiZWNhdXNlIGlmIGZvciBleGFtcGxlIHlvdSBoYXZlIG11bHRpcGxlIHNlcXVlbmNlc1xuICAgICAgICAgICAgLy8gYm91bmQgc3VjaCBhcyBcImcgaVwiIGFuZCBcImcgdFwiIHRoZXkgYm90aCBuZWVkIHRvIGZpcmUgdGhlXG4gICAgICAgICAgICAvLyBjYWxsYmFjayBmb3IgbWF0Y2hpbmcgZyBjYXVzZSBvdGhlcndpc2UgeW91IGNhbiBvbmx5IGV2ZXJcbiAgICAgICAgICAgIC8vIG1hdGNoIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgICAgIGlmIChjYWxsYmFja3NbaV0uc2VxKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IGZpcmUgY2FsbGJhY2tzIGZvciB0aGUgbWF4TGV2ZWwgdG8gcHJldmVudFxuICAgICAgICAgICAgICAgIC8vIHN1YnNlcXVlbmNlcyBmcm9tIGFsc28gZmlyaW5nXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSAnYSBvcHRpb24gYicgc2hvdWxkIG5vdCBjYXVzZSAnb3B0aW9uIGInIHRvIGZpcmVcbiAgICAgICAgICAgICAgICAvLyBldmVuIHRob3VnaCAnb3B0aW9uIGInIGlzIHBhcnQgb2YgdGhlIG90aGVyIHNlcXVlbmNlXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBhbnkgc2VxdWVuY2VzIHRoYXQgZG8gbm90IG1hdGNoIGhlcmUgd2lsbCBiZSBkaXNjYXJkZWRcbiAgICAgICAgICAgICAgICAvLyBiZWxvdyBieSB0aGUgX3Jlc2V0U2VxdWVuY2VzIGNhbGxcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzW2ldLmxldmVsICE9IG1heExldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2sgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLy8ga2VlcCBhIGxpc3Qgb2Ygd2hpY2ggc2VxdWVuY2VzIHdlcmUgbWF0Y2hlcyBmb3IgbGF0ZXJcbiAgICAgICAgICAgICAgICBkb05vdFJlc2V0W2NhbGxiYWNrc1tpXS5zZXFdID0gMTtcbiAgICAgICAgICAgICAgICBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrc1tpXS5jYWxsYmFjaywgZSwgY2FsbGJhY2tzW2ldLmNvbWJvLCBjYWxsYmFja3NbaV0uc2VxKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgd2VyZSBubyBzZXF1ZW5jZSBtYXRjaGVzIGJ1dCB3ZSBhcmUgc3RpbGwgaGVyZVxuICAgICAgICAgICAgLy8gdGhhdCBtZWFucyB0aGlzIGlzIGEgcmVndWxhciBtYXRjaCBzbyB3ZSBzaG91bGQgZmlyZSB0aGF0XG4gICAgICAgICAgICBpZiAoIXByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrc1tpXS5jYWxsYmFjaywgZSwgY2FsbGJhY2tzW2ldLmNvbWJvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBrZXkgeW91IHByZXNzZWQgbWF0Y2hlcyB0aGUgdHlwZSBvZiBzZXF1ZW5jZSB3aXRob3V0XG4gICAgICAgIC8vIGJlaW5nIGEgbW9kaWZpZXIgKGllIFwia2V5dXBcIiBvciBcImtleXByZXNzXCIpIHRoZW4gd2Ugc2hvdWxkXG4gICAgICAgIC8vIHJlc2V0IGFsbCBzZXF1ZW5jZXMgdGhhdCB3ZXJlIG5vdCBtYXRjaGVkIGJ5IHRoaXMgZXZlbnRcbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhpcyBpcyBzbywgZm9yIGV4YW1wbGUsIGlmIHlvdSBoYXZlIHRoZSBzZXF1ZW5jZSBcImggYSB0XCIgYW5kIHlvdVxuICAgICAgICAvLyB0eXBlIFwiaCBlIGEgciB0XCIgaXQgZG9lcyBub3QgbWF0Y2guICBpbiB0aGlzIGNhc2UgdGhlIFwiZVwiIHdpbGxcbiAgICAgICAgLy8gY2F1c2UgdGhlIHNlcXVlbmNlIHRvIHJlc2V0XG4gICAgICAgIC8vXG4gICAgICAgIC8vIG1vZGlmaWVyIGtleXMgYXJlIGlnbm9yZWQgYmVjYXVzZSB5b3UgY2FuIGhhdmUgYSBzZXF1ZW5jZVxuICAgICAgICAvLyB0aGF0IGNvbnRhaW5zIG1vZGlmaWVycyBzdWNoIGFzIFwiZW50ZXIgY3RybCtzcGFjZVwiIGFuZCBpbiBtb3N0XG4gICAgICAgIC8vIGNhc2VzIHRoZSBtb2RpZmllciBrZXkgd2lsbCBiZSBwcmVzc2VkIGJlZm9yZSB0aGUgbmV4dCBrZXlcbiAgICAgICAgLy9cbiAgICAgICAgLy8gYWxzbyBpZiB5b3UgaGF2ZSBhIHNlcXVlbmNlIHN1Y2ggYXMgXCJjdHJsK2IgYVwiIHRoZW4gcHJlc3NpbmcgdGhlXG4gICAgICAgIC8vIFwiYlwiIGtleSB3aWxsIHRyaWdnZXIgYSBcImtleXByZXNzXCIgYW5kIGEgXCJrZXlkb3duXCJcbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhlIFwia2V5ZG93blwiIGlzIGV4cGVjdGVkIHdoZW4gdGhlcmUgaXMgYSBtb2RpZmllciwgYnV0IHRoZVxuICAgICAgICAvLyBcImtleXByZXNzXCIgZW5kcyB1cCBtYXRjaGluZyB0aGUgX25leHRFeHBlY3RlZEFjdGlvbiBzaW5jZSBpdCBvY2N1cnNcbiAgICAgICAgLy8gYWZ0ZXIgYW5kIHRoYXQgY2F1c2VzIHRoZSBzZXF1ZW5jZSB0byByZXNldFxuICAgICAgICAvL1xuICAgICAgICAvLyB3ZSBpZ25vcmUga2V5cHJlc3NlcyBpbiBhIHNlcXVlbmNlIHRoYXQgZGlyZWN0bHkgZm9sbG93IGEga2V5ZG93blxuICAgICAgICAvLyBmb3IgdGhlIHNhbWUgY2hhcmFjdGVyXG4gICAgICAgIHZhciBpZ25vcmVUaGlzS2V5cHJlc3MgPSBlLnR5cGUgPT0gJ2tleXByZXNzJyAmJiBfaWdub3JlTmV4dEtleXByZXNzO1xuICAgICAgICBpZiAoZS50eXBlID09IF9uZXh0RXhwZWN0ZWRBY3Rpb24gJiYgIV9pc01vZGlmaWVyKGNoYXJhY3RlcikgJiYgIWlnbm9yZVRoaXNLZXlwcmVzcykge1xuICAgICAgICAgICAgX3Jlc2V0U2VxdWVuY2VzKGRvTm90UmVzZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2lnbm9yZU5leHRLZXlwcmVzcyA9IHByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2sgJiYgZS50eXBlID09ICdrZXlkb3duJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBoYW5kbGVzIGEga2V5ZG93biBldmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfaGFuZGxlS2V5RXZlbnQoZSkge1xuXG4gICAgICAgIC8vIG5vcm1hbGl6ZSBlLndoaWNoIGZvciBrZXkgZXZlbnRzXG4gICAgICAgIC8vIEBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80Mjg1NjI3L2phdmFzY3JpcHQta2V5Y29kZS12cy1jaGFyY29kZS11dHRlci1jb25mdXNpb25cbiAgICAgICAgaWYgKHR5cGVvZiBlLndoaWNoICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgZS53aGljaCA9IGUua2V5Q29kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBfY2hhcmFjdGVyRnJvbUV2ZW50KGUpO1xuXG4gICAgICAgIC8vIG5vIGNoYXJhY3RlciBmb3VuZCB0aGVuIHN0b3BcbiAgICAgICAgaWYgKCFjaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5lZWQgdG8gdXNlID09PSBmb3IgdGhlIGNoYXJhY3RlciBjaGVjayBiZWNhdXNlIHRoZSBjaGFyYWN0ZXIgY2FuIGJlIDBcbiAgICAgICAgaWYgKGUudHlwZSA9PSAna2V5dXAnICYmIF9pZ25vcmVOZXh0S2V5dXAgPT09IGNoYXJhY3Rlcikge1xuICAgICAgICAgICAgX2lnbm9yZU5leHRLZXl1cCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgTW91c2V0cmFwLmhhbmRsZUtleShjaGFyYWN0ZXIsIF9ldmVudE1vZGlmaWVycyhlKSwgZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZGV0ZXJtaW5lcyBpZiB0aGUga2V5Y29kZSBzcGVjaWZpZWQgaXMgYSBtb2RpZmllciBrZXkgb3Igbm90XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2lzTW9kaWZpZXIoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgPT0gJ3NoaWZ0JyB8fCBrZXkgPT0gJ2N0cmwnIHx8IGtleSA9PSAnYWx0JyB8fCBrZXkgPT0gJ21ldGEnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNhbGxlZCB0byBzZXQgYSAxIHNlY29uZCB0aW1lb3V0IG9uIHRoZSBzcGVjaWZpZWQgc2VxdWVuY2VcbiAgICAgKlxuICAgICAqIHRoaXMgaXMgc28gYWZ0ZXIgZWFjaCBrZXkgcHJlc3MgaW4gdGhlIHNlcXVlbmNlIHlvdSBoYXZlIDEgc2Vjb25kXG4gICAgICogdG8gcHJlc3MgdGhlIG5leHQga2V5IGJlZm9yZSB5b3UgaGF2ZSB0byBzdGFydCBvdmVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZnVuY3Rpb24gX3Jlc2V0U2VxdWVuY2VUaW1lcigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KF9yZXNldFRpbWVyKTtcbiAgICAgICAgX3Jlc2V0VGltZXIgPSBzZXRUaW1lb3V0KF9yZXNldFNlcXVlbmNlcywgMTAwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV2ZXJzZXMgdGhlIG1hcCBsb29rdXAgc28gdGhhdCB3ZSBjYW4gbG9vayBmb3Igc3BlY2lmaWMga2V5c1xuICAgICAqIHRvIHNlZSB3aGF0IGNhbiBhbmQgY2FuJ3QgdXNlIGtleXByZXNzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2dldFJldmVyc2VNYXAoKSB7XG4gICAgICAgIGlmICghX1JFVkVSU0VfTUFQKSB7XG4gICAgICAgICAgICBfUkVWRVJTRV9NQVAgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBfTUFQKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBwdWxsIG91dCB0aGUgbnVtZXJpYyBrZXlwYWQgZnJvbSBoZXJlIGNhdXNlIGtleXByZXNzIHNob3VsZFxuICAgICAgICAgICAgICAgIC8vIGJlIGFibGUgdG8gZGV0ZWN0IHRoZSBrZXlzIGZyb20gdGhlIGNoYXJhY3RlclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPiA5NSAmJiBrZXkgPCAxMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF9NQVAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBfUkVWRVJTRV9NQVBbX01BUFtrZXldXSA9IGtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9SRVZFUlNFX01BUDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwaWNrcyB0aGUgYmVzdCBhY3Rpb24gYmFzZWQgb24gdGhlIGtleSBjb21iaW5hdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGNoYXJhY3RlciBmb3Iga2V5XG4gICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb24gcGFzc2VkIGluXG4gICAgICovXG4gICAgZnVuY3Rpb24gX3BpY2tCZXN0QWN0aW9uKGtleSwgbW9kaWZpZXJzLCBhY3Rpb24pIHtcblxuICAgICAgICAvLyBpZiBubyBhY3Rpb24gd2FzIHBpY2tlZCBpbiB3ZSBzaG91bGQgdHJ5IHRvIHBpY2sgdGhlIG9uZVxuICAgICAgICAvLyB0aGF0IHdlIHRoaW5rIHdvdWxkIHdvcmsgYmVzdCBmb3IgdGhpcyBrZXlcbiAgICAgICAgaWYgKCFhY3Rpb24pIHtcbiAgICAgICAgICAgIGFjdGlvbiA9IF9nZXRSZXZlcnNlTWFwKClba2V5XSA/ICdrZXlkb3duJyA6ICdrZXlwcmVzcyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtb2RpZmllciBrZXlzIGRvbid0IHdvcmsgYXMgZXhwZWN0ZWQgd2l0aCBrZXlwcmVzcyxcbiAgICAgICAgLy8gc3dpdGNoIHRvIGtleWRvd25cbiAgICAgICAgaWYgKGFjdGlvbiA9PSAna2V5cHJlc3MnICYmIG1vZGlmaWVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9ICdrZXlkb3duJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYmluZHMgYSBrZXkgc2VxdWVuY2UgdG8gYW4gZXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21ibyAtIGNvbWJvIHNwZWNpZmllZCBpbiBiaW5kIGNhbGxcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBrZXlzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvblxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfYmluZFNlcXVlbmNlKGNvbWJvLCBrZXlzLCBjYWxsYmFjaywgYWN0aW9uKSB7XG5cbiAgICAgICAgLy8gc3RhcnQgb2ZmIGJ5IGFkZGluZyBhIHNlcXVlbmNlIGxldmVsIHJlY29yZCBmb3IgdGhpcyBjb21iaW5hdGlvblxuICAgICAgICAvLyBhbmQgc2V0dGluZyB0aGUgbGV2ZWwgdG8gMFxuICAgICAgICBfc2VxdWVuY2VMZXZlbHNbY29tYm9dID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2FsbGJhY2sgdG8gaW5jcmVhc2UgdGhlIHNlcXVlbmNlIGxldmVsIGZvciB0aGlzIHNlcXVlbmNlIGFuZCByZXNldFxuICAgICAgICAgKiBhbGwgb3RoZXIgc2VxdWVuY2VzIHRoYXQgd2VyZSBhY3RpdmVcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5leHRBY3Rpb25cbiAgICAgICAgICogQHJldHVybnMge0Z1bmN0aW9ufVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2luY3JlYXNlU2VxdWVuY2UobmV4dEFjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF9uZXh0RXhwZWN0ZWRBY3Rpb24gPSBuZXh0QWN0aW9uO1xuICAgICAgICAgICAgICAgICsrX3NlcXVlbmNlTGV2ZWxzW2NvbWJvXTtcbiAgICAgICAgICAgICAgICBfcmVzZXRTZXF1ZW5jZVRpbWVyKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHdyYXBzIHRoZSBzcGVjaWZpZWQgY2FsbGJhY2sgaW5zaWRlIG9mIGFub3RoZXIgZnVuY3Rpb24gaW4gb3JkZXJcbiAgICAgICAgICogdG8gcmVzZXQgYWxsIHNlcXVlbmNlIGNvdW50ZXJzIGFzIHNvb24gYXMgdGhpcyBzZXF1ZW5jZSBpcyBkb25lXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2NhbGxiYWNrQW5kUmVzZXQoZSkge1xuICAgICAgICAgICAgX2ZpcmVDYWxsYmFjayhjYWxsYmFjaywgZSwgY29tYm8pO1xuXG4gICAgICAgICAgICAvLyB3ZSBzaG91bGQgaWdub3JlIHRoZSBuZXh0IGtleSB1cCBpZiB0aGUgYWN0aW9uIGlzIGtleSBkb3duXG4gICAgICAgICAgICAvLyBvciBrZXlwcmVzcy4gIHRoaXMgaXMgc28gaWYgeW91IGZpbmlzaCBhIHNlcXVlbmNlIGFuZFxuICAgICAgICAgICAgLy8gcmVsZWFzZSB0aGUga2V5IHRoZSBmaW5hbCBrZXkgd2lsbCBub3QgdHJpZ2dlciBhIGtleXVwXG4gICAgICAgICAgICBpZiAoYWN0aW9uICE9PSAna2V5dXAnKSB7XG4gICAgICAgICAgICAgICAgX2lnbm9yZU5leHRLZXl1cCA9IF9jaGFyYWN0ZXJGcm9tRXZlbnQoZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHdlaXJkIHJhY2UgY29uZGl0aW9uIGlmIGEgc2VxdWVuY2UgZW5kcyB3aXRoIHRoZSBrZXlcbiAgICAgICAgICAgIC8vIGFub3RoZXIgc2VxdWVuY2UgYmVnaW5zIHdpdGhcbiAgICAgICAgICAgIHNldFRpbWVvdXQoX3Jlc2V0U2VxdWVuY2VzLCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb29wIHRocm91Z2gga2V5cyBvbmUgYXQgYSB0aW1lIGFuZCBiaW5kIHRoZSBhcHByb3ByaWF0ZSBjYWxsYmFja1xuICAgICAgICAvLyBmdW5jdGlvbi4gIGZvciBhbnkga2V5IGxlYWRpbmcgdXAgdG8gdGhlIGZpbmFsIG9uZSBpdCBzaG91bGRcbiAgICAgICAgLy8gaW5jcmVhc2UgdGhlIHNlcXVlbmNlLiBhZnRlciB0aGUgZmluYWwsIGl0IHNob3VsZCByZXNldCBhbGwgc2VxdWVuY2VzXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGlmIGFuIGFjdGlvbiBpcyBzcGVjaWZpZWQgaW4gdGhlIG9yaWdpbmFsIGJpbmQgY2FsbCB0aGVuIHRoYXQgd2lsbFxuICAgICAgICAvLyBiZSB1c2VkIHRocm91Z2hvdXQuICBvdGhlcndpc2Ugd2Ugd2lsbCBwYXNzIHRoZSBhY3Rpb24gdGhhdCB0aGVcbiAgICAgICAgLy8gbmV4dCBrZXkgaW4gdGhlIHNlcXVlbmNlIHNob3VsZCBtYXRjaC4gIHRoaXMgYWxsb3dzIGEgc2VxdWVuY2VcbiAgICAgICAgLy8gdG8gbWl4IGFuZCBtYXRjaCBrZXlwcmVzcyBhbmQga2V5ZG93biBldmVudHMgZGVwZW5kaW5nIG9uIHdoaWNoXG4gICAgICAgIC8vIG9uZXMgYXJlIGJldHRlciBzdWl0ZWQgdG8gdGhlIGtleSBwcm92aWRlZFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBpc0ZpbmFsID0gaSArIDEgPT09IGtleXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHdyYXBwZWRDYWxsYmFjayA9IGlzRmluYWwgPyBfY2FsbGJhY2tBbmRSZXNldCA6IF9pbmNyZWFzZVNlcXVlbmNlKGFjdGlvbiB8fCBfZ2V0S2V5SW5mbyhrZXlzW2kgKyAxXSkuYWN0aW9uKTtcbiAgICAgICAgICAgIF9iaW5kU2luZ2xlKGtleXNbaV0sIHdyYXBwZWRDYWxsYmFjaywgYWN0aW9uLCBjb21ibywgaSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBmcm9tIGEgc3RyaW5nIGtleSBjb21iaW5hdGlvbiB0byBhbiBhcnJheVxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBjb21iaW5hdGlvbiBsaWtlIFwiY29tbWFuZCtzaGlmdCtsXCJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfa2V5c0Zyb21TdHJpbmcoY29tYmluYXRpb24pIHtcbiAgICAgICAgaWYgKGNvbWJpbmF0aW9uID09PSAnKycpIHtcbiAgICAgICAgICAgIHJldHVybiBbJysnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21iaW5hdGlvbi5zcGxpdCgnKycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaW5mbyBmb3IgYSBzcGVjaWZpYyBrZXkgY29tYmluYXRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gY29tYmluYXRpb24ga2V5IGNvbWJpbmF0aW9uIChcImNvbW1hbmQrc1wiIG9yIFwiYVwiIG9yIFwiKlwiKVxuICAgICAqIEBwYXJhbSAge3N0cmluZz19IGFjdGlvblxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2dldEtleUluZm8oY29tYmluYXRpb24sIGFjdGlvbikge1xuICAgICAgICB2YXIga2V5cyxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBtb2RpZmllcnMgPSBbXTtcblxuICAgICAgICAvLyB0YWtlIHRoZSBrZXlzIGZyb20gdGhpcyBwYXR0ZXJuIGFuZCBmaWd1cmUgb3V0IHdoYXQgdGhlIGFjdHVhbFxuICAgICAgICAvLyBwYXR0ZXJuIGlzIGFsbCBhYm91dFxuICAgICAgICBrZXlzID0gX2tleXNGcm9tU3RyaW5nKGNvbWJpbmF0aW9uKTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAga2V5ID0ga2V5c1tpXTtcblxuICAgICAgICAgICAgLy8gbm9ybWFsaXplIGtleSBuYW1lc1xuICAgICAgICAgICAgaWYgKF9TUEVDSUFMX0FMSUFTRVNba2V5XSkge1xuICAgICAgICAgICAgICAgIGtleSA9IF9TUEVDSUFMX0FMSUFTRVNba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBub3QgYSBrZXlwcmVzcyBldmVudCB0aGVuIHdlIHNob3VsZFxuICAgICAgICAgICAgLy8gYmUgc21hcnQgYWJvdXQgdXNpbmcgc2hpZnQga2V5c1xuICAgICAgICAgICAgLy8gdGhpcyB3aWxsIG9ubHkgd29yayBmb3IgVVMga2V5Ym9hcmRzIGhvd2V2ZXJcbiAgICAgICAgICAgIGlmIChhY3Rpb24gJiYgYWN0aW9uICE9ICdrZXlwcmVzcycgJiYgX1NISUZUX01BUFtrZXldKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gX1NISUZUX01BUFtrZXldO1xuICAgICAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdzaGlmdCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGtleSBpcyBhIG1vZGlmaWVyIHRoZW4gYWRkIGl0IHRvIHRoZSBsaXN0IG9mIG1vZGlmaWVyc1xuICAgICAgICAgICAgaWYgKF9pc01vZGlmaWVyKGtleSkpIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllcnMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVwZW5kaW5nIG9uIHdoYXQgdGhlIGtleSBjb21iaW5hdGlvbiBpc1xuICAgICAgICAvLyB3ZSB3aWxsIHRyeSB0byBwaWNrIHRoZSBiZXN0IGV2ZW50IGZvciBpdFxuICAgICAgICBhY3Rpb24gPSBfcGlja0Jlc3RBY3Rpb24oa2V5LCBtb2RpZmllcnMsIGFjdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBtb2RpZmllcnMsXG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvblxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGJpbmRzIGEgc2luZ2xlIGtleWJvYXJkIGNvbWJpbmF0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tYmluYXRpb25cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYWN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBzZXF1ZW5jZU5hbWUgLSBuYW1lIG9mIHNlcXVlbmNlIGlmIHBhcnQgb2Ygc2VxdWVuY2VcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IGxldmVsIC0gd2hhdCBwYXJ0IG9mIHRoZSBzZXF1ZW5jZSB0aGUgY29tbWFuZCBpc1xuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfYmluZFNpbmdsZShjb21iaW5hdGlvbiwgY2FsbGJhY2ssIGFjdGlvbiwgc2VxdWVuY2VOYW1lLCBsZXZlbCkge1xuXG4gICAgICAgIC8vIHN0b3JlIGEgZGlyZWN0IG1hcHBlZCByZWZlcmVuY2UgZm9yIHVzZSB3aXRoIE1vdXNldHJhcC50cmlnZ2VyXG4gICAgICAgIF9kaXJlY3RNYXBbY29tYmluYXRpb24gKyAnOicgKyBhY3Rpb25dID0gY2FsbGJhY2s7XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIG11bHRpcGxlIHNwYWNlcyBpbiBhIHJvdyBiZWNvbWUgYSBzaW5nbGUgc3BhY2VcbiAgICAgICAgY29tYmluYXRpb24gPSBjb21iaW5hdGlvbi5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG5cbiAgICAgICAgdmFyIHNlcXVlbmNlID0gY29tYmluYXRpb24uc3BsaXQoJyAnKSxcbiAgICAgICAgICAgIGluZm87XG5cbiAgICAgICAgLy8gaWYgdGhpcyBwYXR0ZXJuIGlzIGEgc2VxdWVuY2Ugb2Yga2V5cyB0aGVuIHJ1biB0aHJvdWdoIHRoaXMgbWV0aG9kXG4gICAgICAgIC8vIHRvIHJlcHJvY2VzcyBlYWNoIHBhdHRlcm4gb25lIGtleSBhdCBhIHRpbWVcbiAgICAgICAgaWYgKHNlcXVlbmNlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIF9iaW5kU2VxdWVuY2UoY29tYmluYXRpb24sIHNlcXVlbmNlLCBjYWxsYmFjaywgYWN0aW9uKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGluZm8gPSBfZ2V0S2V5SW5mbyhjb21iaW5hdGlvbiwgYWN0aW9uKTtcblxuICAgICAgICAvLyBtYWtlIHN1cmUgdG8gaW5pdGlhbGl6ZSBhcnJheSBpZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vIGEgY2FsbGJhY2sgaXMgYWRkZWQgZm9yIHRoaXMga2V5XG4gICAgICAgIF9jYWxsYmFja3NbaW5mby5rZXldID0gX2NhbGxiYWNrc1tpbmZvLmtleV0gfHwgW107XG5cbiAgICAgICAgLy8gcmVtb3ZlIGFuIGV4aXN0aW5nIG1hdGNoIGlmIHRoZXJlIGlzIG9uZVxuICAgICAgICBfZ2V0TWF0Y2hlcyhpbmZvLmtleSwgaW5mby5tb2RpZmllcnMsIHt0eXBlOiBpbmZvLmFjdGlvbn0sIHNlcXVlbmNlTmFtZSwgY29tYmluYXRpb24sIGxldmVsKTtcblxuICAgICAgICAvLyBhZGQgdGhpcyBjYWxsIGJhY2sgdG8gdGhlIGFycmF5XG4gICAgICAgIC8vIGlmIGl0IGlzIGEgc2VxdWVuY2UgcHV0IGl0IGF0IHRoZSBiZWdpbm5pbmdcbiAgICAgICAgLy8gaWYgbm90IHB1dCBpdCBhdCB0aGUgZW5kXG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRoaXMgaXMgaW1wb3J0YW50IGJlY2F1c2UgdGhlIHdheSB0aGVzZSBhcmUgcHJvY2Vzc2VkIGV4cGVjdHNcbiAgICAgICAgLy8gdGhlIHNlcXVlbmNlIG9uZXMgdG8gY29tZSBmaXJzdFxuICAgICAgICBfY2FsbGJhY2tzW2luZm8ua2V5XVtzZXF1ZW5jZU5hbWUgPyAndW5zaGlmdCcgOiAncHVzaCddKHtcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgIG1vZGlmaWVyczogaW5mby5tb2RpZmllcnMsXG4gICAgICAgICAgICBhY3Rpb246IGluZm8uYWN0aW9uLFxuICAgICAgICAgICAgc2VxOiBzZXF1ZW5jZU5hbWUsXG4gICAgICAgICAgICBsZXZlbDogbGV2ZWwsXG4gICAgICAgICAgICBjb21ibzogY29tYmluYXRpb25cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYmluZHMgbXVsdGlwbGUgY29tYmluYXRpb25zIHRvIHRoZSBzYW1lIGNhbGxiYWNrXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBjb21iaW5hdGlvbnNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gYWN0aW9uXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9iaW5kTXVsdGlwbGUoY29tYmluYXRpb25zLCBjYWxsYmFjaywgYWN0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tYmluYXRpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBfYmluZFNpbmdsZShjb21iaW5hdGlvbnNbaV0sIGNhbGxiYWNrLCBhY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc3RhcnQhXG4gICAgX2FkZEV2ZW50KGRvY3VtZW50LCAna2V5cHJlc3MnLCBfaGFuZGxlS2V5RXZlbnQpO1xuICAgIF9hZGRFdmVudChkb2N1bWVudCwgJ2tleWRvd24nLCBfaGFuZGxlS2V5RXZlbnQpO1xuICAgIF9hZGRFdmVudChkb2N1bWVudCwgJ2tleXVwJywgX2hhbmRsZUtleUV2ZW50KTtcblxuICAgIHZhciBNb3VzZXRyYXAgPSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGJpbmRzIGFuIGV2ZW50IHRvIG1vdXNldHJhcFxuICAgICAgICAgKlxuICAgICAgICAgKiBjYW4gYmUgYSBzaW5nbGUga2V5LCBhIGNvbWJpbmF0aW9uIG9mIGtleXMgc2VwYXJhdGVkIHdpdGggKyxcbiAgICAgICAgICogYW4gYXJyYXkgb2Yga2V5cywgb3IgYSBzZXF1ZW5jZSBvZiBrZXlzIHNlcGFyYXRlZCBieSBzcGFjZXNcbiAgICAgICAgICpcbiAgICAgICAgICogYmUgc3VyZSB0byBsaXN0IHRoZSBtb2RpZmllciBrZXlzIGZpcnN0IHRvIG1ha2Ugc3VyZSB0aGF0IHRoZVxuICAgICAgICAgKiBjb3JyZWN0IGtleSBlbmRzIHVwIGdldHRpbmcgYm91bmQgKHRoZSBsYXN0IGtleSBpbiB0aGUgcGF0dGVybilcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGtleXNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb24gLSAna2V5cHJlc3MnLCAna2V5ZG93bicsIG9yICdrZXl1cCdcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgYmluZDogZnVuY3Rpb24oa2V5cywgY2FsbGJhY2ssIGFjdGlvbikge1xuICAgICAgICAgICAga2V5cyA9IGtleXMgaW5zdGFuY2VvZiBBcnJheSA/IGtleXMgOiBba2V5c107XG4gICAgICAgICAgICBfYmluZE11bHRpcGxlKGtleXMsIGNhbGxiYWNrLCBhY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHVuYmluZHMgYW4gZXZlbnQgdG8gbW91c2V0cmFwXG4gICAgICAgICAqXG4gICAgICAgICAqIHRoZSB1bmJpbmRpbmcgc2V0cyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gb2YgdGhlIHNwZWNpZmllZCBrZXkgY29tYm9cbiAgICAgICAgICogdG8gYW4gZW1wdHkgZnVuY3Rpb24gYW5kIGRlbGV0ZXMgdGhlIGNvcnJlc3BvbmRpbmcga2V5IGluIHRoZVxuICAgICAgICAgKiBfZGlyZWN0TWFwIGRpY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRPRE86IGFjdHVhbGx5IHJlbW92ZSB0aGlzIGZyb20gdGhlIF9jYWxsYmFja3MgZGljdGlvbmFyeSBpbnN0ZWFkXG4gICAgICAgICAqIG9mIGJpbmRpbmcgYW4gZW1wdHkgZnVuY3Rpb25cbiAgICAgICAgICpcbiAgICAgICAgICogdGhlIGtleWNvbWJvK2FjdGlvbiBoYXMgdG8gYmUgZXhhY3RseSB0aGUgc2FtZSBhc1xuICAgICAgICAgKiBpdCB3YXMgZGVmaW5lZCBpbiB0aGUgYmluZCBtZXRob2RcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGtleXNcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvblxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICB1bmJpbmQ6IGZ1bmN0aW9uKGtleXMsIGFjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIE1vdXNldHJhcC5iaW5kKGtleXMsIGZ1bmN0aW9uKCkge30sIGFjdGlvbik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRyaWdnZXJzIGFuIGV2ZW50IHRoYXQgaGFzIGFscmVhZHkgYmVlbiBib3VuZFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5c1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvblxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbihrZXlzLCBhY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChfZGlyZWN0TWFwW2tleXMgKyAnOicgKyBhY3Rpb25dKSB7XG4gICAgICAgICAgICAgICAgX2RpcmVjdE1hcFtrZXlzICsgJzonICsgYWN0aW9uXSh7fSwga2V5cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVzZXRzIHRoZSBsaWJyYXJ5IGJhY2sgdG8gaXRzIGluaXRpYWwgc3RhdGUuICB0aGlzIGlzIHVzZWZ1bFxuICAgICAgICAgKiBpZiB5b3Ugd2FudCB0byBjbGVhciBvdXQgdGhlIGN1cnJlbnQga2V5Ym9hcmQgc2hvcnRjdXRzIGFuZCBiaW5kXG4gICAgICAgICAqIG5ldyBvbmVzIC0gZm9yIGV4YW1wbGUgaWYgeW91IHN3aXRjaCB0byBhbm90aGVyIHBhZ2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX2NhbGxiYWNrcyA9IHt9O1xuICAgICAgICAgICAgX2RpcmVjdE1hcCA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAvKipcbiAgICAgICAgKiBzaG91bGQgd2Ugc3RvcCB0aGlzIGV2ZW50IGJlZm9yZSBmaXJpbmcgb2ZmIGNhbGxiYWNrc1xuICAgICAgICAqXG4gICAgICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICAgICovXG4gICAgICAgIHN0b3BDYWxsYmFjazogZnVuY3Rpb24oZSwgZWxlbWVudCkge1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgZWxlbWVudCBoYXMgdGhlIGNsYXNzIFwibW91c2V0cmFwXCIgdGhlbiBubyBuZWVkIHRvIHN0b3BcbiAgICAgICAgICAgIGlmICgoJyAnICsgZWxlbWVudC5jbGFzc05hbWUgKyAnICcpLmluZGV4T2YoJyBtb3VzZXRyYXAgJykgPiAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc3RvcCBmb3IgaW5wdXQsIHNlbGVjdCwgYW5kIHRleHRhcmVhXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC50YWdOYW1lID09ICdJTlBVVCcgfHwgZWxlbWVudC50YWdOYW1lID09ICdTRUxFQ1QnIHx8IGVsZW1lbnQudGFnTmFtZSA9PSAnVEVYVEFSRUEnIHx8IGVsZW1lbnQuaXNDb250ZW50RWRpdGFibGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGV4cG9zZXMgX2hhbmRsZUtleSBwdWJsaWNseSBzbyBpdCBjYW4gYmUgb3ZlcndyaXR0ZW4gYnkgZXh0ZW5zaW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgaGFuZGxlS2V5OiBfaGFuZGxlS2V5XG4gICAgfTtcblxuICAgIC8vIGV4cG9zZSBtb3VzZXRyYXAgdG8gdGhlIGdsb2JhbCBvYmplY3RcbiAgICB3aW5kb3cuTW91c2V0cmFwID0gTW91c2V0cmFwO1xuXG4gICAgLy8gZXhwb3NlIG1vdXNldHJhcCBhcyBhbiBBTUQgbW9kdWxlXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoTW91c2V0cmFwKTtcbiAgICB9XG59KSAod2luZG93LCBkb2N1bWVudCk7XG4iLCIvL1RoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgYmluL2hvb2suanNcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJ3RlbXBsYXRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHsgJ21lZGlhX2NvbnRyb2wnOiB0ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtYmFja2dyb3VuZFwiIGRhdGEtYmFja2dyb3VuZD48L2Rpdj48ZGl2IGNsYXNzPVwibWVkaWEtY29udHJvbC1sYXllclwiIGRhdGEtY29udHJvbHM+PCUgdmFyIHJlbmRlckJhcj1mdW5jdGlvbihuYW1lKSB7ICU+PGRpdiBjbGFzcz1cImJhci1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJiYXItYmFja2dyb3VuZFwiIGRhdGEtPCU9IG5hbWUgJT4+PGRpdiBjbGFzcz1cImJhci1maWxsLTFcIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjxkaXYgY2xhc3M9XCJiYXItZmlsbC0yXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48ZGl2IGNsYXNzPVwiYmFyLWhvdmVyXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiYmFyLXNjcnViYmVyXCIgZGF0YS08JT0gbmFtZSAlPj48ZGl2IGNsYXNzPVwiYmFyLXNjcnViYmVyLWljb25cIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjwvZGl2PjwvZGl2PjwlIH07ICU+PCUgdmFyIHJlbmRlclNlZ21lbnRlZEJhcj1mdW5jdGlvbihuYW1lLCBzZWdtZW50cykgeyBzZWdtZW50cz1zZWdtZW50cyB8fCAxMDsgJT48ZGl2IGNsYXNzPVwiYmFyLWNvbnRhaW5lclwiIGRhdGEtPCU9IG5hbWUgJT4+PCUgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50czsgaSsrKSB7ICU+PGRpdiBjbGFzcz1cInNlZ21lbnRlZC1iYXItZWxlbWVudFwiIGRhdGEtPCU9IG5hbWUgJT4+PC9kaXY+PCUgfSAlPjwvZGl2PjwlIH07ICU+PCUgdmFyIHJlbmRlckRyYXdlcj1mdW5jdGlvbihuYW1lLCByZW5kZXJDb250ZW50KSB7ICU+PGRpdiBjbGFzcz1cImRyYXdlci1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJkcmF3ZXItaWNvbi1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJkcmF3ZXItaWNvbiBtZWRpYS1jb250cm9sLWljb25cIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjxzcGFuIGNsYXNzPVwiZHJhd2VyLXRleHRcIiBkYXRhLTwlPSBuYW1lICU+Pjwvc3Bhbj48L2Rpdj48JSByZW5kZXJDb250ZW50KG5hbWUpOyAlPjwvZGl2PjwlIH07ICU+PCUgdmFyIHJlbmRlckluZGljYXRvcj1mdW5jdGlvbihuYW1lKSB7ICU+PGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48JSB9OyAlPjwlIHZhciByZW5kZXJCdXR0b249ZnVuY3Rpb24obmFtZSkgeyAlPjxidXR0b24gY2xhc3M9XCJtZWRpYS1jb250cm9sLWJ1dHRvbiBtZWRpYS1jb250cm9sLWljb25cIiBkYXRhLTwlPSBuYW1lICU+PjwvYnV0dG9uPjwlIH07ICU+PCUgdmFyIHRlbXBsYXRlcz17IGJhcjogcmVuZGVyQmFyLCBzZWdtZW50ZWRCYXI6IHJlbmRlclNlZ21lbnRlZEJhciwgfTsgdmFyIHJlbmRlcj1mdW5jdGlvbihzZXR0aW5nc0xpc3QpIHsgc2V0dGluZ3NMaXN0LmZvckVhY2goZnVuY3Rpb24oc2V0dGluZykgeyBpZihzZXR0aW5nID09PSBcInNlZWtiYXJcIikgeyByZW5kZXJCYXIoc2V0dGluZyk7IH0gZWxzZSBpZiAoc2V0dGluZyA9PT0gXCJ2b2x1bWVcIikgeyByZW5kZXJEcmF3ZXIoc2V0dGluZywgc2V0dGluZ3Mudm9sdW1lQmFyVGVtcGxhdGUgPyB0ZW1wbGF0ZXNbc2V0dGluZ3Mudm9sdW1lQmFyVGVtcGxhdGVdIDogZnVuY3Rpb24obmFtZSkgeyByZXR1cm4gcmVuZGVyU2VnbWVudGVkQmFyKG5hbWUpOyB9KTsgfSBlbHNlIGlmIChzZXR0aW5nID09PSBcImR1cmF0aW9uXCIgfHwgc2V0dGluZz09PSBcInBvc2l0aW9uXCIpIHsgcmVuZGVySW5kaWNhdG9yKHNldHRpbmcpOyB9IGVsc2UgeyByZW5kZXJCdXR0b24oc2V0dGluZyk7IH0gfSk7IH07ICU+PCUgaWYgKHNldHRpbmdzLmRlZmF1bHQgJiYgc2V0dGluZ3MuZGVmYXVsdC5sZW5ndGgpIHsgJT48ZGl2IGNsYXNzPVwibWVkaWEtY29udHJvbC1jZW50ZXItcGFuZWxcIiBkYXRhLW1lZGlhLWNvbnRyb2w+PCUgcmVuZGVyKHNldHRpbmdzLmRlZmF1bHQpOyAlPjwvZGl2PjwlIH0gJT48JSBpZiAoc2V0dGluZ3MubGVmdCAmJiBzZXR0aW5ncy5sZWZ0Lmxlbmd0aCkgeyAlPjxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLWxlZnQtcGFuZWxcIiBkYXRhLW1lZGlhLWNvbnRyb2w+PCUgcmVuZGVyKHNldHRpbmdzLmxlZnQpOyAlPjwvZGl2PjwlIH0gJT48JSBpZiAoc2V0dGluZ3MucmlnaHQgJiYgc2V0dGluZ3MucmlnaHQubGVuZ3RoKSB7ICU+PGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtcmlnaHQtcGFuZWxcIiBkYXRhLW1lZGlhLWNvbnRyb2w+PCUgcmVuZGVyKHNldHRpbmdzLnJpZ2h0KTsgJT48L2Rpdj48JSB9ICU+PC9kaXY+JyksJ3NlZWtfdGltZSc6IHRlbXBsYXRlKCc8c3BhbiBkYXRhLXNlZWstdGltZT48L3NwYW4+JyksJ2ZsYXNoJzogdGVtcGxhdGUoJzxwYXJhbSBuYW1lPVwibW92aWVcIiB2YWx1ZT1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXIuc3dmXCI+PHBhcmFtIG5hbWU9XCJxdWFsaXR5XCIgdmFsdWU9XCJhdXRvaGlnaFwiPjxwYXJhbSBuYW1lPVwic3dsaXZlY29ubmVjdFwiIHZhbHVlPVwidHJ1ZVwiPjxwYXJhbSBuYW1lPVwiYWxsb3dTY3JpcHRBY2Nlc3NcIiB2YWx1ZT1cImFsd2F5c1wiPjxwYXJhbSBuYW1lPVwiYmdjb2xvclwiIHZhbHVlPVwiIzAwMTEyMlwiPjxwYXJhbSBuYW1lPVwiYWxsb3dGdWxsU2NyZWVuXCIgdmFsdWU9XCJmYWxzZVwiPjxwYXJhbSBuYW1lPVwid21vZGVcIiB2YWx1ZT1cInRyYW5zcGFyZW50XCI+PHBhcmFtIG5hbWU9XCJ0YWJpbmRleFwiIHZhbHVlPVwiMVwiPjxwYXJhbSBuYW1lPUZsYXNoVmFycyB2YWx1ZT1cInBsYXliYWNrSWQ9PCU9IHBsYXliYWNrSWQgJT5cIiAvPjxlbWJlZCB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBkaXNhYmxlZCB0YWJpbmRleD1cIi0xXCIgZW5hYmxlY29udGV4dG1lbnU9XCJmYWxzZVwiIGFsbG93U2NyaXB0QWNjZXNzPVwiYWx3YXlzXCIgcXVhbGl0eT1cImF1dG9oaWdodFwiIHBsdWdpbnNwYWdlPVwiaHR0cDovL3d3dy5tYWNyb21lZGlhLmNvbS9nby9nZXRmbGFzaHBsYXllclwiIHdtb2RlPVwidHJhbnNwYXJlbnRcIiBzd2xpdmVjb25uZWN0PVwidHJ1ZVwiIHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIGFsbG93ZnVsbHNjcmVlbj1cImZhbHNlXCIgYmdjb2xvcj1cIiMwMDAwMDBcIiBGbGFzaFZhcnM9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgc3JjPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci5zd2ZcIj48L2VtYmVkPicpLCdobHMnOiB0ZW1wbGF0ZSgnPHBhcmFtIG5hbWU9XCJtb3ZpZVwiIHZhbHVlPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL0hMU1BsYXllci5zd2Y/aW5saW5lPTFcIj48cGFyYW0gbmFtZT1cInF1YWxpdHlcIiB2YWx1ZT1cImF1dG9oaWdoXCI+PHBhcmFtIG5hbWU9XCJzd2xpdmVjb25uZWN0XCIgdmFsdWU9XCJ0cnVlXCI+PHBhcmFtIG5hbWU9XCJhbGxvd1NjcmlwdEFjY2Vzc1wiIHZhbHVlPVwiYWx3YXlzXCI+PHBhcmFtIG5hbWU9XCJiZ2NvbG9yXCIgdmFsdWU9XCIjMDAxMTIyXCI+PHBhcmFtIG5hbWU9XCJhbGxvd0Z1bGxTY3JlZW5cIiB2YWx1ZT1cImZhbHNlXCI+PHBhcmFtIG5hbWU9XCJ3bW9kZVwiIHZhbHVlPVwidHJhbnNwYXJlbnRcIj48cGFyYW0gbmFtZT1cInRhYmluZGV4XCIgdmFsdWU9XCIxXCI+PHBhcmFtIG5hbWU9Rmxhc2hWYXJzIHZhbHVlPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPlwiIC8+PGVtYmVkIHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIHRhYmluZGV4PVwiMVwiIGVuYWJsZWNvbnRleHRtZW51PVwiZmFsc2VcIiBhbGxvd1NjcmlwdEFjY2Vzcz1cImFsd2F5c1wiIHF1YWxpdHk9XCJhdXRvaGlnaFwiIHBsdWdpbnNwYWdlPVwiaHR0cDovL3d3dy5tYWNyb21lZGlhLmNvbS9nby9nZXRmbGFzaHBsYXllclwiIHdtb2RlPVwidHJhbnNwYXJlbnRcIiBzd2xpdmVjb25uZWN0PVwidHJ1ZVwiIHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIGFsbG93ZnVsbHNjcmVlbj1cImZhbHNlXCIgYmdjb2xvcj1cIiMwMDAwMDBcIiBGbGFzaFZhcnM9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgc3JjPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL0hMU1BsYXllci5zd2ZcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PC9lbWJlZD4nKSwnaHRtbDVfdmlkZW8nOiB0ZW1wbGF0ZSgnPHNvdXJjZSBzcmM9XCI8JT1zcmMlPlwiIHR5cGU9XCI8JT10eXBlJT5cIj4nKSwnbm9fb3AnOiB0ZW1wbGF0ZSgnPGNhbnZhcyBkYXRhLW5vLW9wLWNhbnZhcz48L2NhbnZhcz48cCBkYXRhLW5vLW9wLW1zZz5Zb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgcGxheWJhY2sgb2YgdGhpcyB2aWRlby4gVHJ5IHRvIHVzZSBhIGRpZmZlcmVudCBicm93c2VyLjxwPicpLCdiYWNrZ3JvdW5kX2J1dHRvbic6IHRlbXBsYXRlKCc8ZGl2IGNsYXNzPVwiYmFja2dyb3VuZC1idXR0b24td3JhcHBlclwiIGRhdGEtYmFja2dyb3VuZC1idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJhY2tncm91bmQtYnV0dG9uLWljb25cIiBkYXRhLWJhY2tncm91bmQtYnV0dG9uPjwvYnV0dG9uPjwvZGl2PicpLCdkdnJfY29udHJvbHMnOiB0ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImxpdmUtaW5mb1wiPkxJVkU8L2Rpdj48YnV0dG9uIGNsYXNzPVwibGl2ZS1idXR0b25cIj5CQUNLIFRPIExJVkU8L2J1dHRvbj4nKSwncG9zdGVyJzogdGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJwbGF5LXdyYXBwZXJcIiBkYXRhLXBvc3Rlcj48c3BhbiBjbGFzcz1cInBvc3Rlci1pY29uIHBsYXlcIiBkYXRhLXBvc3Rlci8+PC9kaXY+JyksJ3NwaW5uZXJfdGhyZWVfYm91bmNlJzogdGVtcGxhdGUoJzxkaXYgZGF0YS1ib3VuY2UxPjwvZGl2PjxkaXYgZGF0YS1ib3VuY2UyPjwvZGl2PjxkaXYgZGF0YS1ib3VuY2UzPjwvZGl2PicpLCd3YXRlcm1hcmsnOiB0ZW1wbGF0ZSgnPGRpdiBkYXRhLXdhdGVybWFyayBkYXRhLXdhdGVybWFyay08JT1wb3NpdGlvbiAlPj48aW1nIHNyYz1cIjwlPSBpbWFnZVVybCAlPlwiPjwvZGl2PicpLENTUzogeydjb250YWluZXInOiAnLmNvbnRhaW5lcltkYXRhLWNvbnRhaW5lcl17cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjojMDAwO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LmNvbnRhaW5lcltkYXRhLWNvbnRhaW5lcl0ucG9pbnRlci1lbmFibGVke2N1cnNvcjpwb2ludGVyfScsJ2NvcmUnOiAnW2RhdGEtcGxheWVyXXstd2Via2l0LXRvdWNoLWNhbGxvdXQ6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LWtodG1sLXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lOy1vLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7LW1vei10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApOy1vLXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTtwb3NpdGlvbjpyZWxhdGl2ZTttYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjA7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NDAwO3RleHQtYWxpZ246Y2VudGVyO292ZXJmbG93OmhpZGRlbjtmb250LXNpemU6MTAwJTtmb250LWZhbWlseTpcImx1Y2lkYSBncmFuZGVcIix0YWhvbWEsdmVyZGFuYSxhcmlhbCxzYW5zLXNlcmlmO3RleHQtc2hhZG93OjAgMCAwO2JveC1zaXppbmc6Ym9yZGVyLWJveH1bZGF0YS1wbGF5ZXJdIGEsW2RhdGEtcGxheWVyXSBhYmJyLFtkYXRhLXBsYXllcl0gYWNyb255bSxbZGF0YS1wbGF5ZXJdIGFkZHJlc3MsW2RhdGEtcGxheWVyXSBhcHBsZXQsW2RhdGEtcGxheWVyXSBhcnRpY2xlLFtkYXRhLXBsYXllcl0gYXNpZGUsW2RhdGEtcGxheWVyXSBhdWRpbyxbZGF0YS1wbGF5ZXJdIGIsW2RhdGEtcGxheWVyXSBiaWcsW2RhdGEtcGxheWVyXSBibG9ja3F1b3RlLFtkYXRhLXBsYXllcl0gY2FudmFzLFtkYXRhLXBsYXllcl0gY2FwdGlvbixbZGF0YS1wbGF5ZXJdIGNlbnRlcixbZGF0YS1wbGF5ZXJdIGNpdGUsW2RhdGEtcGxheWVyXSBjb2RlLFtkYXRhLXBsYXllcl0gZGQsW2RhdGEtcGxheWVyXSBkZWwsW2RhdGEtcGxheWVyXSBkZXRhaWxzLFtkYXRhLXBsYXllcl0gZGZuLFtkYXRhLXBsYXllcl0gZGl2LFtkYXRhLXBsYXllcl0gZGwsW2RhdGEtcGxheWVyXSBkdCxbZGF0YS1wbGF5ZXJdIGVtLFtkYXRhLXBsYXllcl0gZW1iZWQsW2RhdGEtcGxheWVyXSBmaWVsZHNldCxbZGF0YS1wbGF5ZXJdIGZpZ2NhcHRpb24sW2RhdGEtcGxheWVyXSBmaWd1cmUsW2RhdGEtcGxheWVyXSBmb290ZXIsW2RhdGEtcGxheWVyXSBmb3JtLFtkYXRhLXBsYXllcl0gaDEsW2RhdGEtcGxheWVyXSBoMixbZGF0YS1wbGF5ZXJdIGgzLFtkYXRhLXBsYXllcl0gaDQsW2RhdGEtcGxheWVyXSBoNSxbZGF0YS1wbGF5ZXJdIGg2LFtkYXRhLXBsYXllcl0gaGVhZGVyLFtkYXRhLXBsYXllcl0gaGdyb3VwLFtkYXRhLXBsYXllcl0gaSxbZGF0YS1wbGF5ZXJdIGlmcmFtZSxbZGF0YS1wbGF5ZXJdIGltZyxbZGF0YS1wbGF5ZXJdIGlucyxbZGF0YS1wbGF5ZXJdIGtiZCxbZGF0YS1wbGF5ZXJdIGxhYmVsLFtkYXRhLXBsYXllcl0gbGVnZW5kLFtkYXRhLXBsYXllcl0gbGksW2RhdGEtcGxheWVyXSBtYXJrLFtkYXRhLXBsYXllcl0gbWVudSxbZGF0YS1wbGF5ZXJdIG5hdixbZGF0YS1wbGF5ZXJdIG9iamVjdCxbZGF0YS1wbGF5ZXJdIG9sLFtkYXRhLXBsYXllcl0gb3V0cHV0LFtkYXRhLXBsYXllcl0gcCxbZGF0YS1wbGF5ZXJdIHByZSxbZGF0YS1wbGF5ZXJdIHEsW2RhdGEtcGxheWVyXSBydWJ5LFtkYXRhLXBsYXllcl0gcyxbZGF0YS1wbGF5ZXJdIHNhbXAsW2RhdGEtcGxheWVyXSBzZWN0aW9uLFtkYXRhLXBsYXllcl0gc21hbGwsW2RhdGEtcGxheWVyXSBzcGFuLFtkYXRhLXBsYXllcl0gc3RyaWtlLFtkYXRhLXBsYXllcl0gc3Ryb25nLFtkYXRhLXBsYXllcl0gc3ViLFtkYXRhLXBsYXllcl0gc3VtbWFyeSxbZGF0YS1wbGF5ZXJdIHN1cCxbZGF0YS1wbGF5ZXJdIHRhYmxlLFtkYXRhLXBsYXllcl0gdGJvZHksW2RhdGEtcGxheWVyXSB0ZCxbZGF0YS1wbGF5ZXJdIHRmb290LFtkYXRhLXBsYXllcl0gdGgsW2RhdGEtcGxheWVyXSB0aGVhZCxbZGF0YS1wbGF5ZXJdIHRpbWUsW2RhdGEtcGxheWVyXSB0cixbZGF0YS1wbGF5ZXJdIHR0LFtkYXRhLXBsYXllcl0gdSxbZGF0YS1wbGF5ZXJdIHVsLFtkYXRhLXBsYXllcl0gdmFyLFtkYXRhLXBsYXllcl0gdmlkZW97bWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO2ZvbnQ6aW5oZXJpdDtmb250LXNpemU6MTAwJTt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX1bZGF0YS1wbGF5ZXJdIHRhYmxle2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTtib3JkZXItc3BhY2luZzowfVtkYXRhLXBsYXllcl0gY2FwdGlvbixbZGF0YS1wbGF5ZXJdIHRkLFtkYXRhLXBsYXllcl0gdGh7dGV4dC1hbGlnbjpsZWZ0O2ZvbnQtd2VpZ2h0OjQwMDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9W2RhdGEtcGxheWVyXSBibG9ja3F1b3RlLFtkYXRhLXBsYXllcl0gcXtxdW90ZXM6bm9uZX1bZGF0YS1wbGF5ZXJdIGJsb2NrcXVvdGU6YWZ0ZXIsW2RhdGEtcGxheWVyXSBibG9ja3F1b3RlOmJlZm9yZSxbZGF0YS1wbGF5ZXJdIHE6YWZ0ZXIsW2RhdGEtcGxheWVyXSBxOmJlZm9yZXtjb250ZW50OlwiXCI7Y29udGVudDpub25lfVtkYXRhLXBsYXllcl0gYSBpbWd7Ym9yZGVyOm5vbmV9W2RhdGEtcGxheWVyXSAqe21heC13aWR0aDppbml0aWFsO2JveC1zaXppbmc6aW5oZXJpdDtmbG9hdDppbml0aWFsfVtkYXRhLXBsYXllcl0uZnVsbHNjcmVlbnt3aWR0aDoxMDAlIWltcG9ydGFudDtoZWlnaHQ6MTAwJSFpbXBvcnRhbnR9W2RhdGEtcGxheWVyXS5ub2N1cnNvcntjdXJzb3I6bm9uZX0uY2xhcHByLXN0eWxle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9QG1lZGlhIHNjcmVlbntbZGF0YS1wbGF5ZXJde29wYWNpdHk6Ljk5fX0nLCdtZWRpYV9jb250cm9sJzogJ0Bmb250LWZhY2V7Zm9udC1mYW1pbHk6UGxheWVyO3NyYzp1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuZW90XCIpO3NyYzp1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuZW90PyNpZWZpeFwiKSBmb3JtYXQoXCJlbWJlZGRlZC1vcGVudHlwZVwiKSx1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIudHRmXCIpIGZvcm1hdChcInRydWV0eXBlXCIpLHVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci5zdmcjcGxheWVyXCIpIGZvcm1hdChcInN2Z1wiKX0ubWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb257LXdlYmtpdC10cmFuc2l0aW9uOm5vbmUhaW1wb3J0YW50Oy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTowczstbW96LXRyYW5zaXRpb246bm9uZSFpbXBvcnRhbnQ7LW8tdHJhbnNpdGlvbjpub25lIWltcG9ydGFudDt0cmFuc2l0aW9uOm5vbmUhaW1wb3J0YW50fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF17cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt6LWluZGV4Ojk5OTk7cG9pbnRlci1ldmVudHM6bm9uZX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLmRyYWdnaW5ne3BvaW50ZXItZXZlbnRzOmF1dG87Y3Vyc29yOi13ZWJraXQtZ3JhYmJpbmchaW1wb3J0YW50O2N1cnNvcjpncmFiYmluZyFpbXBvcnRhbnR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS5kcmFnZ2luZyAqe2N1cnNvcjotd2Via2l0LWdyYWJiaW5nIWltcG9ydGFudDtjdXJzb3I6Z3JhYmJpbmchaW1wb3J0YW50fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtYmFja2dyb3VuZFtkYXRhLWJhY2tncm91bmRde3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDo0MCU7d2lkdGg6MTAwJTtib3R0b206MDtiYWNrZ3JvdW5kLWltYWdlOi1vd2cobGluZWFyLWdyYWRpZW50KHJnYmEoMCwwLDAsMCkscmdiYSgwLDAsMCwuOSkpKTtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQobGluZWFyLWdyYWRpZW50KHJnYmEoMCwwLDAsMCkscmdiYSgwLDAsMCwuOSkpKTtiYWNrZ3JvdW5kLWltYWdlOi1tb3oobGluZWFyLWdyYWRpZW50KHJnYmEoMCwwLDAsMCkscmdiYSgwLDAsMCwuOSkpKTtiYWNrZ3JvdW5kLWltYWdlOi1vKGxpbmVhci1ncmFkaWVudChyZ2JhKDAsMCwwLDApLHJnYmEoMCwwLDAsLjkpKSk7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQocmdiYSgwLDAsMCwwKSxyZ2JhKDAsMCwwLC45KSk7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgLjZzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246b3BhY2l0eSAuNnMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IC42cyBlYXNlLW91dDt0cmFuc2l0aW9uOm9wYWNpdHkgLjZzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtaWNvbntmb250LWZhbWlseTpQbGF5ZXI7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtc2l6ZToyNnB4O2xpbmUtaGVpZ2h0OjMycHg7bGV0dGVyLXNwYWNpbmc6MDtzcGVhazpub25lO2NvbG9yOiNmZmY7b3BhY2l0eTouNTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7dGV4dC1hbGlnbjpsZWZ0Oy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlOy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2V9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1pY29uOmhvdmVye2NvbG9yOiNmZmY7b3BhY2l0eTouNzU7dGV4dC1zaGFkb3c6cmdiYSgyNTUsMjU1LDI1NSwuOCkgMCAwIDVweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLm1lZGlhLWNvbnRyb2wtaGlkZSAubWVkaWEtY29udHJvbC1iYWNrZ3JvdW5kW2RhdGEtYmFja2dyb3VuZF17b3BhY2l0eTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0ubWVkaWEtY29udHJvbC1oaWRlIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNde2JvdHRvbTotNTBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLm1lZGlhLWNvbnRyb2wtaGlkZSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItc2NydWJiZXJbZGF0YS1zZWVrYmFyXXtvcGFjaXR5OjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXXtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206N3B4O3dpZHRoOjEwMCU7aGVpZ2h0OjMycHg7dmVydGljYWwtYWxpZ246bWlkZGxlO3BvaW50ZXItZXZlbnRzOmF1dG87LXdlYmtpdC10cmFuc2l0aW9uOmJvdHRvbSAuNHM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjpib3R0b20gLjRzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246Ym90dG9tIC40cyBlYXNlLW91dDt0cmFuc2l0aW9uOmJvdHRvbSAuNHMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1sZWZ0LXBhbmVsW2RhdGEtbWVkaWEtY29udHJvbF17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDo0cHg7aGVpZ2h0OjEwMCV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1jZW50ZXItcGFuZWxbZGF0YS1tZWRpYS1jb250cm9sXXtoZWlnaHQ6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjtsaW5lLWhlaWdodDozMnB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtcmlnaHQtcGFuZWxbZGF0YS1tZWRpYS1jb250cm9sXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDo0cHg7aGVpZ2h0OjEwMCV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b257YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MDttYXJnaW46MCA2cHg7cGFkZGluZzowO2N1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uOmZvY3Vze291dGxpbmU6MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlde2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjIwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5XTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wYXVzZV17ZmxvYXQ6bGVmdDtoZWlnaHQ6MTAwJTtmb250LXNpemU6MjBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBhdXNlXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAyXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1zdG9wXXtmbG9hdDpsZWZ0O2hlaWdodDoxMDAlO2ZvbnQtc2l6ZToyMHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtc3RvcF06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwM1wifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtZnVsbHNjcmVlbl17ZmxvYXQ6cmlnaHQ7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MDtoZWlnaHQ6MTAwJX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWZ1bGxzY3JlZW5dOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDZcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWZ1bGxzY3JlZW5dLnNocmluazpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDA3XCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1oZC1pbmRpY2F0b3Jde2N1cnNvcjpkZWZhdWx0O2Zsb2F0OnJpZ2h0O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjA7aGVpZ2h0OjEwMCU7b3BhY2l0eTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDA4XCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1oZC1pbmRpY2F0b3JdLmVuYWJsZWR7b3BhY2l0eToxfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXS5lbmFibGVkOmhvdmVye29wYWNpdHk6MTt0ZXh0LXNoYWRvdzpub25lfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXBhdXNlXXtmbG9hdDpsZWZ0O2hlaWdodDoxMDAlO2ZvbnQtc2l6ZToyMHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXBhdXNlXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5cGF1c2VdLnBsYXlpbmc6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMlwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXBhdXNlXS5wYXVzZWQ6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3Bde2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjIwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5c3RvcF06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3BdLnBsYXlpbmc6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwM1wifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3BdLnN0b3BwZWQ6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtZHVyYXRpb25dLC5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtcG9zaXRpb25de2Rpc3BsYXk6aW5saW5lLWJsb2NrO2ZvbnQtc2l6ZToxMHB4O2NvbG9yOiNmZmY7Y3Vyc29yOmRlZmF1bHQ7bGluZS1oZWlnaHQ6MzJweDtwb3NpdGlvbjpyZWxhdGl2ZX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLXBvc2l0aW9uXXttYXJnaW4tbGVmdDo2cHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1kdXJhdGlvbl17Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNSk7bWFyZ2luLXJpZ2h0OjZweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLWR1cmF0aW9uXTpiZWZvcmV7Y29udGVudDpcInxcIjttYXJnaW46MCAzcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJde3Bvc2l0aW9uOmFic29sdXRlO3RvcDotMjBweDtsZWZ0OjA7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO3dpZHRoOjEwMCU7aGVpZ2h0OjI1cHg7Y3Vyc29yOnBvaW50ZXJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJde3dpZHRoOjEwMCU7aGVpZ2h0OjFweDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTJweDtiYWNrZ3JvdW5kLWNvbG9yOiM2NjZ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItZmlsbC0xW2RhdGEtc2Vla2Jhcl17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjA7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1jb2xvcjojYzJjMmMyOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dDstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWZpbGwtMltkYXRhLXNlZWtiYXJde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDowO2hlaWdodDoxMDAlO2JhY2tncm91bmQtY29sb3I6IzAwNWFmZjstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0O3RyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1ob3ZlcltkYXRhLXNlZWtiYXJde29wYWNpdHk6MDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTNweDt3aWR0aDo1cHg7aGVpZ2h0OjdweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjUpOy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZTstbW96LXRyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZTstby10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2U7dHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXTpob3ZlciAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWhvdmVyW2RhdGEtc2Vla2Jhcl17b3BhY2l0eToxfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXS5zZWVrLWRpc2FibGVke2N1cnNvcjpkZWZhdWx0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXS5zZWVrLWRpc2FibGVkOmhvdmVyIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItaG92ZXJbZGF0YS1zZWVrYmFyXXtvcGFjaXR5OjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItc2NydWJiZXJbZGF0YS1zZWVrYmFyXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MnB4O2xlZnQ6MDt3aWR0aDoyMHB4O2hlaWdodDoyMHB4O29wYWNpdHk6MTstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0O3RyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1zY3J1YmJlcltkYXRhLXNlZWtiYXJdIC5iYXItc2NydWJiZXItaWNvbltkYXRhLXNlZWtiYXJde3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6NnB4O3RvcDo2cHg7d2lkdGg6OHB4O2hlaWdodDo4cHg7Ym9yZGVyLXJhZGl1czoxMHB4O2JveC1zaGFkb3c6MCAwIDAgNnB4IHJnYmEoMjU1LDI1NSwyNTUsLjIpO2JhY2tncm91bmQtY29sb3I6I2ZmZn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXXtmbG9hdDpyaWdodDtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6MzJweDtjdXJzb3I6cG9pbnRlcjttYXJnaW46MCA2cHg7Ym94LXNpemluZzpib3JkZXItYm94fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVde2Zsb2F0OmxlZnQ7Ym90dG9tOjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXXtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjowO2JveC1zaXppbmc6Y29udGVudC1ib3g7d2lkdGg6MTZweDtoZWlnaHQ6MzJweDttYXJnaW4tcmlnaHQ6NnB4O29wYWNpdHk6MX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdOmhvdmVye29wYWNpdHk6MX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDRcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdLm11dGVke29wYWNpdHk6LjV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXS5tdXRlZDpob3ZlcntvcGFjaXR5Oi43fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV0ubXV0ZWQ6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwNVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXXtmbG9hdDpsZWZ0O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo2cHg7d2lkdGg6NDJweDtoZWlnaHQ6MThweDtwYWRkaW5nOjNweCAwO292ZXJmbG93OmhpZGRlbjstd2Via2l0LXRyYW5zaXRpb246d2lkdGggLjJzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246d2lkdGggLjJzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246d2lkdGggLjJzIGVhc2Utb3V0O3RyYW5zaXRpb246d2lkdGggLjJzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuc2VnbWVudGVkLWJhci1lbGVtZW50W2RhdGEtdm9sdW1lXXtmbG9hdDpsZWZ0O3dpZHRoOjRweDtwYWRkaW5nLWxlZnQ6MnB4O2hlaWdodDoxMnB4O29wYWNpdHk6LjU7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstbW96LWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1tcy1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstby1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjtib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstd2Via2l0LXRyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjJzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246LW1vei10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246LW8tdHJhbnNmb3JtIC4ycyBlYXNlLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5zZWdtZW50ZWQtYmFyLWVsZW1lbnRbZGF0YS12b2x1bWVdLmZpbGx7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstbW96LWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1tcy1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstby1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjtib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjtvcGFjaXR5OjF9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5zZWdtZW50ZWQtYmFyLWVsZW1lbnRbZGF0YS12b2x1bWVdOm50aC1vZi10eXBlKDEpe3BhZGRpbmctbGVmdDowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuc2VnbWVudGVkLWJhci1lbGVtZW50W2RhdGEtdm9sdW1lXTpob3Zlcnstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoMS41KTstbW96LXRyYW5zZm9ybTpzY2FsZVkoMS41KTstbXMtdHJhbnNmb3JtOnNjYWxlWSgxLjUpOy1vLXRyYW5zZm9ybTpzY2FsZVkoMS41KTt0cmFuc2Zvcm06c2NhbGVZKDEuNSl9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS53MzIwIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0udm9sdW1lLWJhci1oaWRle2hlaWdodDoxMnB4O3RvcDo5cHg7cGFkZGluZzowO3dpZHRoOjB9Jywnc2Vla190aW1lJzogJy5zZWVrLXRpbWVbZGF0YS1zZWVrLXRpbWVde3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOmF1dG87aGVpZ2h0OjIwcHg7bGluZS1oZWlnaHQ6MjBweDtib3R0b206NTVweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMiwyLDIsLjUpO3otaW5kZXg6OTk5OTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2U7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2U7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlO3RyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZX0uc2Vlay10aW1lW2RhdGEtc2Vlay10aW1lXS5oaWRkZW5bZGF0YS1zZWVrLXRpbWVde29wYWNpdHk6MH0uc2Vlay10aW1lW2RhdGEtc2Vlay10aW1lXSBzcGFuW2RhdGEtc2Vlay10aW1lXXtwb3NpdGlvbjpyZWxhdGl2ZTtjb2xvcjojZmZmO2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctbGVmdDo3cHg7cGFkZGluZy1yaWdodDo3cHh9JywnZmxhc2gnOiAnW2RhdGEtZmxhc2hde3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojMDAwO2Rpc3BsYXk6YmxvY2s7cG9pbnRlci1ldmVudHM6bm9uZX0nLCdobHMnOiAnW2RhdGEtaGxzXXtwb3NpdGlvbjphYnNvbHV0ZTtkaXNwbGF5OmJsb2NrO3BvaW50ZXItZXZlbnRzOm5vbmU7dG9wOjB9JywnaHRtbDVfdmlkZW8nOiAnW2RhdGEtaHRtbDUtdmlkZW9de3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7ZGlzcGxheTpibG9ja30nLCdodG1sX2ltZyc6ICdbZGF0YS1odG1sLWltZ117bWF4LXdpZHRoOjEwMCU7bWF4LWhlaWdodDoxMDAlfScsJ25vX29wJzogJ1tkYXRhLW5vLW9wXXt6LWluZGV4OjEwMDA7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcn1bZGF0YS1uby1vcF0gcFtkYXRhLW5vLW9wLW1zZ117cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOjI1cHg7dG9wOjQwJTtjb2xvcjojZmZmfVtkYXRhLW5vLW9wXSBjYW52YXNbZGF0YS1uby1vcC1jYW52YXNde2JhY2tncm91bmQtY29sb3I6Izc3NztoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfScsJ2JhY2tncm91bmRfYnV0dG9uJzogJy5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXXtmb250LWZhbWlseTpQbGF5ZXI7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjIpO3BvaW50ZXItZXZlbnRzOm5vbmU7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuNHM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjphbGwgLjRzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246YWxsIC40cyBlYXNlLW91dDt0cmFuc2l0aW9uOmFsbCAuNHMgZWFzZS1vdXR9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dLmhpZGV7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0uaGlkZSAuYmFja2dyb3VuZC1idXR0b24td3JhcHBlcltkYXRhLWJhY2tncm91bmQtYnV0dG9uXXtvcGFjaXR5OjB9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25de3Bvc2l0aW9uOmFic29sdXRlO292ZXJmbG93OmhpZGRlbjt3aWR0aDoxMDAlO2hlaWdodDoyNSU7bGluZS1oZWlnaHQ6MTAwJTtmb250LXNpemU6MjUlO3RvcDo1MCU7dGV4dC1hbGlnbjpjZW50ZXJ9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi1pY29uW2RhdGEtYmFja2dyb3VuZC1idXR0b25de2N1cnNvcjpwb2ludGVyO3BvaW50ZXItZXZlbnRzOmF1dG87Zm9udC1mYW1pbHk6UGxheWVyO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXN0eWxlOm5vcm1hbDtsaW5lLWhlaWdodDoxO2xldHRlci1zcGFjaW5nOjA7c3BlYWs6bm9uZTtjb2xvcjojZmZmO29wYWNpdHk6Ljc1O2JvcmRlcjowO291dGxpbmU6MDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50Oy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlOy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2V9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi1pY29uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dOmhvdmVye29wYWNpdHk6MTt0ZXh0LXNoYWRvdzpyZ2JhKDI1NSwyNTUsMjU1LC44KSAwIDAgMTVweH0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLXdyYXBwZXJbZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLWljb25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0ucGxheWluZzpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAyXCJ9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi1pY29uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dLm5vdHBsYXlpbmc6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24td3JhcHBlcltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24taWNvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXS5wbGF5c3RvcC5wbGF5aW5nOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDNcIn0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLXdyYXBwZXJbZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLWljb25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0ucGxheXN0b3Aubm90cGxheWluZzpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2wubWVkaWEtY29udHJvbC1oaWRlW2RhdGEtbWVkaWEtY29udHJvbF0gLmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25de29wYWNpdHk6MH0nLCdkdnJfY29udHJvbHMnOiAnQGltcG9ydCB1cmwoaHR0cDovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvKTsuZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXXtkaXNwbGF5OmlubGluZS1ibG9jaztmbG9hdDpsZWZ0O2NvbG9yOiNmZmY7bGluZS1oZWlnaHQ6MzJweDtmb250LXNpemU6MTBweDtmb250LXdlaWdodDo3MDA7bWFyZ2luLWxlZnQ6NnB4fS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm97Y3Vyc29yOmRlZmF1bHQ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiT3BlbiBTYW5zXCIsQXJpYWwsc2Fucy1zZXJpZn0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1pbmZvOmJlZm9yZXtjb250ZW50OlwiXCI7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6N3B4O2hlaWdodDo3cHg7Ym9yZGVyLXJhZGl1czozLjVweDttYXJnaW4tcmlnaHQ6My41cHg7YmFja2dyb3VuZC1jb2xvcjojZmYwMTAxfS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm8uZGlzYWJsZWR7b3BhY2l0eTouM30uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1pbmZvLmRpc2FibGVkOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtYnV0dG9ue2N1cnNvcjpwb2ludGVyO291dGxpbmU6MDtkaXNwbGF5Om5vbmU7Ym9yZGVyOjA7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2hlaWdodDozMnB4O3BhZGRpbmc6MDtvcGFjaXR5Oi43O2ZvbnQtZmFtaWx5OlJvYm90byxcIk9wZW4gU2Fuc1wiLEFyaWFsLHNhbnMtc2VyaWY7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2U7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZX0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1idXR0b246YmVmb3Jle2NvbnRlbnQ6XCJcIjtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo3cHg7aGVpZ2h0OjdweDtib3JkZXItcmFkaXVzOjMuNXB4O21hcmdpbi1yaWdodDozLjVweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtYnV0dG9uOmhvdmVye29wYWNpdHk6MTt0ZXh0LXNoYWRvdzpyZ2JhKDI1NSwyNTUsMjU1LC43NSkgMCAwIDVweH0uZHZyIC5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm97ZGlzcGxheTpub25lfS5kdnIgLmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtYnV0dG9ue2Rpc3BsYXk6YmxvY2t9LmR2ci5tZWRpYS1jb250cm9sLmxpdmVbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl17YmFja2dyb3VuZC1jb2xvcjojMDA1YWZmfS5tZWRpYS1jb250cm9sLmxpdmVbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl17YmFja2dyb3VuZC1jb2xvcjojZmYwMTAxfS5zZWVrLXRpbWVbZGF0YS1zZWVrLXRpbWVdIHNwYW5bZGF0YS1kdXJhdGlvbl17cG9zaXRpb246cmVsYXRpdmU7Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNSk7Zm9udC1zaXplOjEwcHg7cGFkZGluZy1yaWdodDo3cHh9LnNlZWstdGltZVtkYXRhLXNlZWstdGltZV0gc3BhbltkYXRhLWR1cmF0aW9uXTpiZWZvcmV7Y29udGVudDpcInxcIjttYXJnaW4tcmlnaHQ6N3B4fScsJ3Bvc3Rlcic6ICdAZm9udC1mYWNle2ZvbnQtZmFtaWx5OlBsYXllcjtzcmM6dXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLmVvdFwiKTtzcmM6dXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLmVvdD8jaWVmaXhcIikgZm9ybWF0KFwiZW1iZWRkZWQtb3BlbnR5cGVcIiksdXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLnR0ZlwiKSBmb3JtYXQoXCJ0cnVldHlwZVwiKSx1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuc3ZnI3BsYXllclwiKSBmb3JtYXQoXCJzdmdcIil9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJde2N1cnNvcjpwb2ludGVyO3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7ei1pbmRleDo5OTg7dG9wOjB9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJdIC5wb3N0ZXItYmFja2dyb3VuZFtkYXRhLXBvc3Rlcl17d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLXNpemU6Y292ZXI7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtcG9zaXRpb246NTAlIDUwJX0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl0gLnBsYXktd3JhcHBlcltkYXRhLXBvc3Rlcl17cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtoZWlnaHQ6MjUlO2xpbmUtaGVpZ2h0OjEwMCU7Zm9udC1zaXplOjI1JTt0b3A6NTAlO3RleHQtYWxpZ246Y2VudGVyfS5wbGF5ZXItcG9zdGVyW2RhdGEtcG9zdGVyXSAucGxheS13cmFwcGVyW2RhdGEtcG9zdGVyXSAucG9zdGVyLWljb25bZGF0YS1wb3N0ZXJde2ZvbnQtZmFtaWx5OlBsYXllcjtmb250LXdlaWdodDo0MDA7Zm9udC1zdHlsZTpub3JtYWw7bGluZS1oZWlnaHQ6MTtsZXR0ZXItc3BhY2luZzowO3NwZWFrOm5vbmU7Y29sb3I6I2ZmZjtvcGFjaXR5Oi43NTstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSB0ZXh0LXNoYWRvdzstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6LjFzOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IHRleHQtc2hhZG93IC4xczstby10cmFuc2l0aW9uOm9wYWNpdHkgdGV4dC1zaGFkb3cgLjFzO3RyYW5zaXRpb246b3BhY2l0eSB0ZXh0LXNoYWRvdyAuMXMgZWFzZX0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl0gLnBsYXktd3JhcHBlcltkYXRhLXBvc3Rlcl0gLnBvc3Rlci1pY29uW2RhdGEtcG9zdGVyXS5wbGF5W2RhdGEtcG9zdGVyXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJdIC5wbGF5LXdyYXBwZXJbZGF0YS1wb3N0ZXJdIC5wb3N0ZXItaWNvbltkYXRhLXBvc3Rlcl06aG92ZXJ7b3BhY2l0eToxO3RleHQtc2hhZG93OnJnYmEoMjU1LDI1NSwyNTUsLjgpIDAgMCAxNXB4fScsJ3NwaW5uZXJfdGhyZWVfYm91bmNlJzogJy5zcGlubmVyLXRocmVlLWJvdW5jZVtkYXRhLXNwaW5uZXJde3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbjowIGF1dG87d2lkdGg6NzBweDt0ZXh0LWFsaWduOmNlbnRlcjt6LWluZGV4Ojk5OTt0b3A6NDclO2xlZnQ6MDtyaWdodDowfS5zcGlubmVyLXRocmVlLWJvdW5jZVtkYXRhLXNwaW5uZXJdPmRpdnt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6I0ZGRjtib3JkZXItcmFkaXVzOjEwMCU7ZGlzcGxheTppbmxpbmUtYmxvY2s7LXdlYmtpdC1hbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDstbW96LWFuaW1hdGlvbjpib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy1tcy1hbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDstby1hbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDthbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDstd2Via2l0LWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDstbW96LWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDstbXMtYW5pbWF0aW9uLWZpbGwtbW9kZTpib3RoOy1vLWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDthbmltYXRpb24tZmlsbC1tb2RlOmJvdGh9LnNwaW5uZXItdGhyZWUtYm91bmNlW2RhdGEtc3Bpbm5lcl0gW2RhdGEtYm91bmNlMV0sLnNwaW5uZXItdGhyZWUtYm91bmNlW2RhdGEtc3Bpbm5lcl0gW2RhdGEtYm91bmNlMl17LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS4zMnM7LW1vei1hbmltYXRpb24tZGVsYXk6LS4zMnM7LW1zLWFuaW1hdGlvbi1kZWxheTotLjMyczstby1hbmltYXRpb24tZGVsYXk6LS4zMnM7YW5pbWF0aW9uLWRlbGF5Oi0uMzJzfUAtbW96LWtleWZyYW1lcyBib3VuY2VkZWxheXswJSwxMDAlLDgwJXstbW96LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9NDAley1tb3otdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19QC13ZWJraXQta2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpfX1ALW8ta2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley1vLXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9NDAley1vLXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fUAtbXMta2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley1tcy10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfTQwJXstbXMtdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19QGtleWZyYW1lcyBib3VuY2VkZWxheXswJSwxMDAlLDgwJXt0cmFuc2Zvcm06c2NhbGUoMCl9NDAle3RyYW5zZm9ybTpzY2FsZSgxKX19Jywnd2F0ZXJtYXJrJzogJ1tkYXRhLXdhdGVybWFya117cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luOjEwMHB4IGF1dG8gMDt3aWR0aDo3MHB4O3RleHQtYWxpZ246Y2VudGVyO3otaW5kZXg6MTB9W2RhdGEtd2F0ZXJtYXJrLWJvdHRvbS1sZWZ0XXtib3R0b206MTBweDtsZWZ0OjEwcHh9W2RhdGEtd2F0ZXJtYXJrLWJvdHRvbS1yaWdodF17Ym90dG9tOjEwcHg7cmlnaHQ6NDJweH1bZGF0YS13YXRlcm1hcmstdG9wLWxlZnRde3RvcDotOTVweDtsZWZ0OjEwcHh9W2RhdGEtd2F0ZXJtYXJrLXRvcC1yaWdodF17dG9wOi05NXB4O3JpZ2h0OjM3cHh9Jyx9fTsiLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgJCA9IHJlcXVpcmUoJ3plcHRvJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCd0ZW1wbGF0ZScpO1xudmFyIEpTVCA9IHJlcXVpcmUoJy4vanN0Jyk7XG5cbnZhciBTdHlsZXIgPSB7XG4gIGdldFN0eWxlRm9yOiBmdW5jdGlvbihuYW1lLCBvcHRpb25zPXtiYXNlVXJsOiAnJ30pIHtcbiAgICByZXR1cm4gJCgnPHN0eWxlIGNsYXNzPVwiY2xhcHByLXN0eWxlXCI+PC9zdHlsZT4nKS5odG1sKHRlbXBsYXRlKEpTVC5DU1NbbmFtZV0pKG9wdGlvbnMpKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZXI7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJ2Jyb3dzZXInKTtcblxudmFyIGV4dGVuZCA9IGZ1bmN0aW9uKHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzO1xuICB2YXIgY2hpbGQ7XG5cbiAgaWYgKHByb3RvUHJvcHMgJiYgcHJvdG9Qcm9wcy5jb25zdHJ1Y3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY2hpbGQgPSBwcm90b1Byb3BzLmNvbnN0cnVjdG9yO1xuICB9IGVsc2Uge1xuICAgIGNoaWxkID0gZnVuY3Rpb24oKXsgcmV0dXJuIHBhcmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICB9XG5cbiAgYXNzaWduKGNoaWxkLCBwYXJlbnQsIHN0YXRpY1Byb3BzKTtcblxuICB2YXIgU3Vycm9nYXRlID0gZnVuY3Rpb24oKXsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9O1xuICBTdXJyb2dhdGUucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcbiAgY2hpbGQucHJvdG90eXBlID0gbmV3IFN1cnJvZ2F0ZSgpO1xuXG4gIGlmIChwcm90b1Byb3BzKSBhc3NpZ24oY2hpbGQucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcblxuICBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlO1xuXG4gIGNoaWxkLnN1cGVyID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBwYXJlbnQucHJvdG90eXBlW25hbWVdO1xuICB9O1xuXG4gIGNoaWxkLnByb3RvdHlwZS5nZXRDbGFzcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIHJldHVybiBjaGlsZDtcbn07XG5cbnZhciBmb3JtYXRUaW1lID0gZnVuY3Rpb24odGltZSkge1xuICAgIHRpbWUgPSB0aW1lICogMTAwMFxuICAgIHRpbWUgPSBwYXJzZUludCh0aW1lLzEwMDApXG4gICAgdmFyIHNlY29uZHMgPSB0aW1lICUgNjBcbiAgICB0aW1lID0gcGFyc2VJbnQodGltZS82MClcbiAgICB2YXIgbWludXRlcyA9IHRpbWUgJSA2MFxuICAgIHRpbWUgPSBwYXJzZUludCh0aW1lLzYwKVxuICAgIHZhciBob3VycyA9IHRpbWUgJSAyNFxuICAgIHZhciBvdXQgPSBcIlwiXG4gICAgaWYgKGhvdXJzICYmIGhvdXJzID4gMCkgb3V0ICs9IChcIjBcIiArIGhvdXJzKS5zbGljZSgtMikgKyBcIjpcIlxuICAgIG91dCArPSAoXCIwXCIgKyBtaW51dGVzKS5zbGljZSgtMikgKyBcIjpcIlxuICAgIG91dCArPSAoXCIwXCIgKyBzZWNvbmRzKS5zbGljZSgtMilcbiAgICByZXR1cm4gb3V0LnRyaW0oKVxufVxuXG52YXIgRnVsbHNjcmVlbiA9IHtcbiAgaXNGdWxsc2NyZWVuOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgfHwgXG4gICAgICBkb2N1bWVudC53ZWJraXRJc0Z1bGxTY3JlZW4gfHwgXG4gICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuIHx8IFxuICAgICAgISFkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50XG4gICAgKTtcbiAgfSxcbiAgcmVxdWVzdEZ1bGxzY3JlZW46IGZ1bmN0aW9uKGVsKSB7XG4gICAgaWYoZWwucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGVsLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgfSBlbHNlIGlmKGVsLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICBlbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgIH0gZWxzZSBpZihlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICB9IGVsc2UgaWYoZWwubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgZWwubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgIH0gZWxzZSBpZiAoZWwucXVlcnlTZWxlY3RvciAmJiBlbC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIikud2Via2l0RW50ZXJGdWxsU2NyZWVuKSB7XG4gICAgICBlbC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIikud2Via2l0RW50ZXJGdWxsU2NyZWVuKCk7XG4gICAgfVxuICB9LFxuICBjYW5jZWxGdWxsc2NyZWVuOiBmdW5jdGlvbigpIHtcbiAgICBpZihkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgIH0gZWxzZSBpZihkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgIH0gZWxzZSBpZihkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgICBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gICAgfVxuICB9XG59O1xuXG5jbGFzcyBDb25maWcge1xuXG4gIHN0YXRpYyBfZGVmYXVsdENvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdm9sdW1lOiB7XG4gICAgICAgIHZhbHVlOiAxMDAsXG4gICAgICAgIHBhcnNlOiBwYXJzZUludFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBfZGVmYXVsdFZhbHVlRm9yKGtleSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdENvbmZpZygpW2tleV1bJ3BhcnNlJ10odGhpcy5fZGVmYXVsdENvbmZpZygpW2tleV1bJ3ZhbHVlJ10pO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBfY3JlYXRlX2tleXNwYWNlKGtleSl7XG4gICAgcmV0dXJuICdjbGFwcHIuJyArIGRvY3VtZW50LmRvbWFpbiArICcuJyArIGtleVxuICB9XG5cbiAgc3RhdGljIHJlc3RvcmUoa2V5KSB7XG4gICAgaWYgKEJyb3dzZXIuaGFzTG9jYWxzdG9yYWdlICYmIGxvY2FsU3RvcmFnZVt0aGlzLl9jcmVhdGVfa2V5c3BhY2Uoa2V5KV0pe1xuICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRDb25maWcoKVtrZXldWydwYXJzZSddKGxvY2FsU3RvcmFnZVt0aGlzLl9jcmVhdGVfa2V5c3BhY2Uoa2V5KV0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kZWZhdWx0VmFsdWVGb3Ioa2V5KVxuICB9XG5cbiAgc3RhdGljIHBlcnNpc3Qoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChCcm93c2VyLmhhc0xvY2Fsc3RvcmFnZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlW3RoaXMuX2NyZWF0ZV9rZXlzcGFjZShrZXkpXSA9IHZhbHVlXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbnZhciBzZWVrU3RyaW5nVG9TZWNvbmRzID0gZnVuY3Rpb24odXJsKSB7XG4gIHZhciBlbGVtZW50cyA9ICh1cmwubWF0Y2goL3Q9KFswLTldKmgpPyhbMC05XSptKT8oWzAtOV0qcyk/LykgfHwgW10pLnNwbGljZSgxKTtcbiAgcmV0dXJuICghIWVsZW1lbnRzLmxlbmd0aCk/IGVsZW1lbnRzLm1hcChmdW5jdGlvbiAoZWwpIHtcbiAgICBpZiAoZWwpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHBhcnNlSW50KGVsLnNsaWNlKDAsMikpIHx8IDA7XG4gICAgICBzd2l0Y2ggKGVsW2VsLmxlbmd0aC0xXSkge1xuICAgICAgICBjYXNlICdoJzogdmFsdWUgPSB2YWx1ZSAqIDM2MDA7IGJyZWFrO1xuICAgICAgICBjYXNlICdtJzogdmFsdWUgPSB2YWx1ZSAqIDYwOyBicmVhaztcbiAgICAgIH07XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9KS5yZWR1Y2UoZnVuY3Rpb24gKGEsYikgeyByZXR1cm4gYStiOyB9KTogMDtcbn1cblxudmFyIGlkQ291bnRlciA9IDA7XG5cbnZhciB1bmlxdWVJZCA9IGZ1bmN0aW9uKHByZWZpeCkge1xuICB2YXIgaWQgPSArK2lkQ291bnRlcjtcbiAgcmV0dXJuIHByZWZpeCArIGlkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIGZvcm1hdFRpbWU6IGZvcm1hdFRpbWUsXG4gIEZ1bGxzY3JlZW46IEZ1bGxzY3JlZW4sXG4gIENvbmZpZzogQ29uZmlnLFxuICBzZWVrU3RyaW5nVG9TZWNvbmRzOiBzZWVrU3RyaW5nVG9TZWNvbmRzLFxuICB1bmlxdWVJZDogdW5pcXVlSWRcbn07XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIENvbnRhaW5lciBpcyByZXNwb25zaWJsZSBmb3IgdGhlIHZpZGVvIHJlbmRlcmluZyBhbmQgc3RhdGVcbiAqL1xuXG52YXIgVUlPYmplY3QgPSByZXF1aXJlKCd1aV9vYmplY3QnKTtcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJylcblxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgVUlPYmplY3Qge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdDb250YWluZXInIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7IHJldHVybiB7IGNsYXNzOiAnY29udGFpbmVyJywgJ2RhdGEtY29udGFpbmVyJzogJycgfSB9XG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHsnY2xpY2snOiAnY2xpY2tlZCcsICdtb3VzZWVudGVyJzogJ21vdXNlRW50ZXInLCAnbW91c2VsZWF2ZSc6ICdtb3VzZUxlYXZlJ31cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLnBsYXliYWNrID0gb3B0aW9ucy5wbGF5YmFjaztcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5wbGF5YmFjay5zZXR0aW5ncztcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLm1lZGlhQ29udHJvbERpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5wbHVnaW5zID0gW3RoaXMucGxheWJhY2tdO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgdGhpcy5wcm9ncmVzcyk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy50aW1lVXBkYXRlZCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMucmVhZHkpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5idWZmZXJpbmcpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsIHRoaXMuYnVmZmVyZnVsbCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfU0VUVElOR1NVUERBVEUsIHRoaXMuc2V0dGluZ3NVcGRhdGUpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0xPQURFRE1FVEFEQVRBLCB0aGlzLmxvYWRlZE1ldGFkYXRhKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19ISUdIREVGSU5JVElPTlVQREFURSwgdGhpcy5oaWdoRGVmaW5pdGlvblVwZGF0ZSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfQklUUkFURSwgdGhpcy51cGRhdGVCaXRyYXRlKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19QTEFZQkFDS1NUQVRFLCB0aGlzLnBsYXliYWNrU3RhdGVDaGFuZ2VkKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19EVlIsIHRoaXMucGxheWJhY2tEdnJTdGF0ZUNoYW5nZWQpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX01FRElBQ09OVFJPTF9ESVNBQkxFLCB0aGlzLmRpc2FibGVNZWRpYUNvbnRyb2wpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX01FRElBQ09OVFJPTF9FTkFCTEUsIHRoaXMuZW5hYmxlTWVkaWFDb250cm9sKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19FTkRFRCwgdGhpcy5lbmRlZCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUExBWSwgdGhpcy5wbGF5aW5nKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19FUlJPUiwgdGhpcy5lcnJvcik7XG4gIH1cblxuICBwbGF5YmFja1N0YXRlQ2hhbmdlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS1NUQVRFKTtcbiAgfVxuXG4gIHBsYXliYWNrRHZyU3RhdGVDaGFuZ2VkKGR2ckluVXNlKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMucGxheWJhY2suc2V0dGluZ3NcbiAgICB0aGlzLmR2ckluVXNlID0gZHZySW5Vc2VcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCwgZHZySW5Vc2UpXG4gIH1cblxuICB1cGRhdGVCaXRyYXRlKG5ld0JpdHJhdGUpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9CSVRSQVRFLCBuZXdCaXRyYXRlKVxuICB9XG5cbiAgc3RhdHNSZXBvcnQobWV0cmljcykge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NUQVRTX1JFUE9SVCwgbWV0cmljcylcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFjay5nZXRQbGF5YmFja1R5cGUoKVxuICB9XG5cbiAgaXNEdnJFbmFibGVkKCkge1xuICAgIHJldHVybiAhIXRoaXMucGxheWJhY2suZHZyRW5hYmxlZFxuICB9XG5cbiAgaXNEdnJJblVzZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmR2ckluVXNlXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCwgdGhpcywgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnBsYXliYWNrLmRlc3Ryb3koKTtcbiAgICB0aGlzLnBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiBwbHVnaW4uZGVzdHJveSgpKVxuICAgIHRoaXMuJGVsLnJlbW92ZSgpO1xuICB9XG5cbiAgc2V0U3R5bGUoc3R5bGUpIHtcbiAgICB0aGlzLiRlbC5jc3Moc3R5bGUpO1xuICB9XG5cbiAgYW5pbWF0ZShzdHlsZSwgZHVyYXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy4kZWwuYW5pbWF0ZShzdHlsZSwgZHVyYXRpb24pLnByb21pc2UoKTtcbiAgfVxuXG4gIHJlYWR5KCkge1xuICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUkVBRFksIHRoaXMubmFtZSk7XG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWJhY2suaXNQbGF5aW5nKCk7XG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFjay5nZXREdXJhdGlvbigpO1xuICB9XG5cbiAgZXJyb3IoZXJyb3JPYmopIHtcbiAgICB0aGlzLiRlbC5hcHBlbmQoZXJyb3JPYmoucmVuZGVyKCkuZWwpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfRVJST1IsIHtlcnJvcjogZXJyb3JPYmosIGNvbnRhaW5lcjogdGhpc30sIHRoaXMubmFtZSk7XG4gIH1cblxuICBsb2FkZWRNZXRhZGF0YShkdXJhdGlvbikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0xPQURFRE1FVEFEQVRBLCBkdXJhdGlvbik7XG4gIH1cblxuICB0aW1lVXBkYXRlZChwb3NpdGlvbiwgZHVyYXRpb24pIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFLCBwb3NpdGlvbiwgZHVyYXRpb24sIHRoaXMubmFtZSk7XG4gIH1cblxuICBwcm9ncmVzcyhzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbiwgZHVyYXRpb24pIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QUk9HUkVTUywgc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24sIGR1cmF0aW9uLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgcGxheWluZygpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLnBsYXliYWNrLnBsYXkoKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnBsYXliYWNrLnN0b3AoKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BBVVNFLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucGxheWJhY2sucGF1c2UoKTtcbiAgfVxuXG4gIGVuZGVkKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0VOREVELCB0aGlzLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgY2xpY2tlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9DTElDSywgdGhpcywgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIHNldEN1cnJlbnRUaW1lKHRpbWUpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9TRUVLLCB0aW1lLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucGxheWJhY2suc2Vlayh0aW1lKTtcbiAgfVxuXG4gIHNldFZvbHVtZSh2YWx1ZSkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1ZPTFVNRSwgdmFsdWUsIHRoaXMubmFtZSk7XG4gICAgdGhpcy5wbGF5YmFjay52b2x1bWUodmFsdWUpO1xuICB9XG5cbiAgZnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9GVUxMU0NSRUVOLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgYnVmZmVyaW5nKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORywgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGJ1ZmZlcmZ1bGwoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSRlVMTCwgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGFkZFBsdWdpbihwbHVnaW4pIHtcbiAgICB0aGlzLnBsdWdpbnMucHVzaChwbHVnaW4pO1xuICB9XG5cbiAgaGFzUGx1Z2luKG5hbWUpIHtcbiAgICByZXR1cm4gISF0aGlzLmdldFBsdWdpbihuYW1lKTtcbiAgfVxuXG4gIGdldFBsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuIGZpbmQodGhpcy5wbHVnaW5zLCAocGx1Z2luKSA9PiB7IHJldHVybiBwbHVnaW4ubmFtZSA9PT0gbmFtZSB9KTtcbiAgfVxuXG4gIG1vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfTU9VU0VfRU5URVIpXG4gIH1cblxuICBtb3VzZUxlYXZlKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX01PVVNFX0xFQVZFKVxuICB9XG5cbiAgc2V0dGluZ3NVcGRhdGUoKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMucGxheWJhY2suc2V0dGluZ3M7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU0VUVElOR1NVUERBVEUpO1xuICB9XG5cbiAgaGlnaERlZmluaXRpb25VcGRhdGUoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfSElHSERFRklOSVRJT05VUERBVEUpO1xuICB9XG5cbiAgaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXliYWNrLmlzSGlnaERlZmluaXRpb25JblVzZSgpXG4gIH1cblxuICBkaXNhYmxlTWVkaWFDb250cm9sKCkge1xuICAgIHRoaXMubWVkaWFDb250cm9sRGlzYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9ESVNBQkxFKTtcbiAgfVxuXG4gIGVuYWJsZU1lZGlhQ29udHJvbCgpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbERpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfTUVESUFDT05UUk9MX0VOQUJMRSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKCdjb250YWluZXInKTtcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpO1xuICAgIHRoaXMuJGVsLmFwcGVuZCh0aGlzLnBsYXliYWNrLnJlbmRlcigpLmVsKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhaW5lcjtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogVGhlIENvbnRhaW5lckZhY3RvcnkgaXMgcmVzcG9uc2libGUgZm9yIG1hbmFnZSBwbGF5YmFjayBib290c3RyYXAgYW5kIGNyZWF0ZSBjb250YWluZXJzLlxuICovXG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guYXNzaWduJyk7XG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0Jyk7XG52YXIgQ29udGFpbmVyID0gcmVxdWlyZSgnY29udGFpbmVyJyk7XG52YXIgJCA9IHJlcXVpcmUoJ3plcHRvJyk7XG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJyk7XG5cbmNsYXNzIENvbnRhaW5lckZhY3RvcnkgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucywgbG9hZGVyKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmxvYWRlciA9IGxvYWRlcjtcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcnMoKSB7XG4gICAgcmV0dXJuICQuRGVmZXJyZWQoKHByb21pc2UpID0+IHtcbiAgICAgIHByb21pc2UucmVzb2x2ZSh0aGlzLm9wdGlvbnMuc291cmNlcy5tYXAoKHNvdXJjZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVDb250YWluZXIoc291cmNlKTtcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRQbGF5YmFja1BsdWdpbihzb3VyY2UpIHtcbiAgICByZXR1cm4gZmluZCh0aGlzLmxvYWRlci5wbGF5YmFja1BsdWdpbnMsIChwKSA9PiB7IHJldHVybiBwLmNhblBsYXkoc291cmNlLnRvU3RyaW5nKCkpIH0pXG4gIH1cblxuICBjcmVhdGVDb250YWluZXIoc291cmNlLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IGFzc2lnbih7fSwgb3B0aW9ucywgdGhpcy5vcHRpb25zLCB7c3JjOiBzb3VyY2UsIGF1dG9QbGF5OiAhIXRoaXMub3B0aW9ucy5hdXRvUGxheX0pXG4gICAgdmFyIHBsYXliYWNrUGx1Z2luID0gdGhpcy5maW5kUGxheWJhY2tQbHVnaW4oc291cmNlKVxuICAgIHZhciBwbGF5YmFjayA9IG5ldyBwbGF5YmFja1BsdWdpbihvcHRpb25zKVxuICAgIHZhciBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyKHtwbGF5YmFjazogcGxheWJhY2t9KVxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKVxuICAgIGRlZmVyLnByb21pc2UoY29udGFpbmVyKVxuICAgIHRoaXMuYWRkQ29udGFpbmVyUGx1Z2lucyhjb250YWluZXIsIHNvdXJjZSlcbiAgICB0aGlzLmxpc3RlblRvT25jZShjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUkVBRFksICgpID0+IGRlZmVyLnJlc29sdmUoY29udGFpbmVyKSlcbiAgICByZXR1cm4gY29udGFpbmVyXG4gIH1cblxuICBhZGRDb250YWluZXJQbHVnaW5zKGNvbnRhaW5lciwgc291cmNlKSB7XG4gICAgdGhpcy5sb2FkZXIuY29udGFpbmVyUGx1Z2lucy5mb3JFYWNoKChQbHVnaW4pID0+IHtcbiAgICAgIHZhciBvcHRpb25zID0gYXNzaWduKHRoaXMub3B0aW9ucywge2NvbnRhaW5lcjogY29udGFpbmVyLCBzcmM6IHNvdXJjZX0pO1xuICAgICAgY29udGFpbmVyLmFkZFBsdWdpbihuZXcgUGx1Z2luKG9wdGlvbnMpKTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhaW5lckZhY3Rvcnk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29udGFpbmVyX2ZhY3RvcnknKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuLyoqXG4gKiBUaGUgQ29yZSBpcyByZXNwb25zaWJsZSB0byBtYW5hZ2UgQ29udGFpbmVycywgdGhlIG1lZGlhdG9yLCBNZWRpYUNvbnRyb2xcbiAqIGFuZCB0aGUgcGxheWVyIHN0YXRlLlxuICovXG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guYXNzaWduJylcbnZhciAkID0gcmVxdWlyZSgnemVwdG8nKVxuXG52YXIgVUlPYmplY3QgPSByZXF1aXJlKCd1aV9vYmplY3QnKVxudmFyIENvbnRhaW5lckZhY3RvcnkgPSByZXF1aXJlKCcuLi9jb250YWluZXJfZmFjdG9yeScpXG52YXIgRnVsbHNjcmVlbiA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdXRpbHMnKS5GdWxsc2NyZWVuXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIE1lZGlhQ29udHJvbCA9IHJlcXVpcmUoJ21lZGlhX2NvbnRyb2wnKVxudmFyIFBsYXllckluZm8gPSByZXF1aXJlKCdwbGF5ZXJfaW5mbycpXG52YXIgTWVkaWF0b3IgPSByZXF1aXJlKCdtZWRpYXRvcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcblxudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpXG5cbmNsYXNzIENvcmUgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJzogJ2V4aXQnLFxuICAgICAgJ21vdXNlbW92ZSc6ICdzaG93TWVkaWFDb250cm9sJyxcbiAgICAgICdtb3VzZWxlYXZlJzogJ2hpZGVNZWRpYUNvbnRyb2wnXG4gICAgfVxuICB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkYXRhLXBsYXllcic6ICcnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgUGxheWVySW5mby5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLnBsdWdpbnMgPSBbXVxuICAgIHRoaXMuY29udGFpbmVycyA9IFtdXG4gICAgdGhpcy5jcmVhdGVDb250YWluZXJzKG9wdGlvbnMpXG4gICAgLy9GSVhNRSBmdWxsc2NyZWVuIGFwaSBzdWNrc1xuICAgICQoZG9jdW1lbnQpLmJpbmQoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCAoKSA9PiB0aGlzLmV4aXQoKSlcbiAgICAkKGRvY3VtZW50KS5iaW5kKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCAoKSA9PiB0aGlzLmV4aXQoKSlcbiAgICAkKGRvY3VtZW50KS5iaW5kKCdtb3pmdWxsc2NyZWVuY2hhbmdlJywgKCkgPT4gdGhpcy5leGl0KCkpXG4gIH1cblxuICBjcmVhdGVDb250YWluZXJzKG9wdGlvbnMpIHtcbiAgICB0aGlzLmRlZmVyID0gJC5EZWZlcnJlZCgpXG4gICAgdGhpcy5kZWZlci5wcm9taXNlKHRoaXMpXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5ID0gbmV3IENvbnRhaW5lckZhY3Rvcnkob3B0aW9ucywgb3B0aW9ucy5sb2FkZXIpXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5XG4gICAgICAuY3JlYXRlQ29udGFpbmVycygpXG4gICAgICAudGhlbigoY29udGFpbmVycykgPT4gdGhpcy5zZXR1cENvbnRhaW5lcnMoY29udGFpbmVycykpXG4gICAgICAudGhlbigoY29udGFpbmVycykgPT4gdGhpcy5yZXNvbHZlT25Db250YWluZXJzUmVhZHkoY29udGFpbmVycykpXG4gIH1cblxuICB1cGRhdGVTaXplKCkge1xuICAgIGlmIChGdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpKSB7XG4gICAgICB0aGlzLnNldEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFBsYXllclNpemUoKVxuICAgIH1cbiAgICBNZWRpYXRvci50cmlnZ2VyKEV2ZW50cy5QTEFZRVJfUkVTSVpFKVxuICB9XG5cbiAgc2V0RnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLiRlbC5hZGRDbGFzcygnZnVsbHNjcmVlbicpXG4gICAgdGhpcy4kZWwucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgIFBsYXllckluZm8ucHJldmlvdXNTaXplID0gUGxheWVySW5mby5jdXJyZW50U2l6ZVxuICAgIFBsYXllckluZm8uY3VycmVudFNpemUgPSB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfVxuICB9XG5cbiAgc2V0UGxheWVyU2l6ZSgpIHtcbiAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnZnVsbHNjcmVlbicpXG4gICAgUGxheWVySW5mby5jdXJyZW50U2l6ZSA9IFBsYXllckluZm8ucHJldmlvdXNTaXplXG4gICAgUGxheWVySW5mby5wcmV2aW91c1NpemUgPSB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfVxuICAgIHRoaXMucmVzaXplKFBsYXllckluZm8uY3VycmVudFNpemUpXG4gIH1cblxuICByZXNpemUob3B0aW9ucykge1xuICAgIHRoaXMuZWwuc3R5bGUuaGVpZ2h0ID0gYCR7b3B0aW9ucy5oZWlnaHR9cHhgO1xuICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBgJHtvcHRpb25zLndpZHRofXB4YDtcbiAgICBQbGF5ZXJJbmZvLnByZXZpb3VzU2l6ZSA9IFBsYXllckluZm8uY3VycmVudFNpemVcbiAgICBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplID0gb3B0aW9uc1xuICAgIE1lZGlhdG9yLnRyaWdnZXIoRXZlbnRzLlBMQVlFUl9SRVNJWkUpXG4gIH1cblxuICByZXNvbHZlT25Db250YWluZXJzUmVhZHkoY29udGFpbmVycykge1xuICAgICQud2hlbi5hcHBseSgkLCBjb250YWluZXJzKS5kb25lKCgpID0+dGhpcy5kZWZlci5yZXNvbHZlKHRoaXMpKVxuICB9XG5cbiAgYWRkUGx1Z2luKHBsdWdpbikge1xuICAgIHRoaXMucGx1Z2lucy5wdXNoKHBsdWdpbilcbiAgfVxuXG4gIGhhc1BsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuICEhdGhpcy5nZXRQbHVnaW4obmFtZSlcbiAgfVxuXG4gIGdldFBsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuIGZpbmQodGhpcy5wbHVnaW5zLCAocGx1Z2luKSA9PiBwbHVnaW4ubmFtZSA9PT0gbmFtZSlcbiAgfVxuXG4gIGxvYWQoc291cmNlcykge1xuICAgIHNvdXJjZXMgPSBzb3VyY2VzICYmIHNvdXJjZXMuY29uc3RydWN0b3IgPT09IEFycmF5ID8gc291cmNlcyA6IFtzb3VyY2VzLnRvU3RyaW5nKCldO1xuICAgIHRoaXMuY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IGNvbnRhaW5lci5kZXN0cm95KCkpXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5Lm9wdGlvbnMgPSBhc3NpZ24odGhpcy5vcHRpb25zLCB7c291cmNlc30pXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5LmNyZWF0ZUNvbnRhaW5lcnMoKS50aGVuKChjb250YWluZXJzKSA9PiB7XG4gICAgICB0aGlzLnNldHVwQ29udGFpbmVycyhjb250YWluZXJzKVxuICAgIH0pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IGNvbnRhaW5lci5kZXN0cm95KCkpXG4gICAgdGhpcy5wbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4gcGx1Z2luLmRlc3Ryb3koKSlcbiAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICAgIHRoaXMubWVkaWFDb250cm9sLmRlc3Ryb3koKVxuICAgICQoZG9jdW1lbnQpLnVuYmluZCgnZnVsbHNjcmVlbmNoYW5nZScpXG4gICAgJChkb2N1bWVudCkudW5iaW5kKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnKVxuICAgICQoZG9jdW1lbnQpLnVuYmluZCgnbW96ZnVsbHNjcmVlbmNoYW5nZScpXG59XG5cbiAgZXhpdCgpIHtcbiAgICB0aGlzLnVwZGF0ZVNpemUoKVxuICAgIHRoaXMubWVkaWFDb250cm9sLnNob3coKVxuICB9XG5cbiAgc2V0TWVkaWFDb250cm9sQ29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMubWVkaWFDb250cm9sLnNldENvbnRhaW5lcihjb250YWluZXIpXG4gICAgdGhpcy5tZWRpYUNvbnRyb2wucmVuZGVyKClcbiAgfVxuXG4gIGRpc2FibGVNZWRpYUNvbnRyb2woKSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuZGlzYWJsZSgpXG4gICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ25vY3Vyc29yJylcbiAgfVxuXG4gIGVuYWJsZU1lZGlhQ29udHJvbCgpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5lbmFibGUoKVxuICB9XG5cbiAgcmVtb3ZlQ29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZyhjb250YWluZXIpXG4gICAgdGhpcy5jb250YWluZXJzID0gdGhpcy5jb250YWluZXJzLmZpbHRlcigoYykgPT4gYyAhPT0gY29udGFpbmVyKVxuICB9XG5cbiAgYXBwZW5kQ29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMubGlzdGVuVG8oY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCwgdGhpcy5yZW1vdmVDb250YWluZXIpXG4gICAgdGhpcy5lbC5hcHBlbmRDaGlsZChjb250YWluZXIucmVuZGVyKCkuZWwpXG4gICAgdGhpcy5jb250YWluZXJzLnB1c2goY29udGFpbmVyKVxuICB9XG5cbiAgc2V0dXBDb250YWluZXJzKGNvbnRhaW5lcnMpIHtcbiAgICBjb250YWluZXJzLm1hcCh0aGlzLmFwcGVuZENvbnRhaW5lci5iaW5kKHRoaXMpKVxuICAgIHRoaXMuc2V0dXBNZWRpYUNvbnRyb2wodGhpcy5nZXRDdXJyZW50Q29udGFpbmVyKCkpXG4gICAgdGhpcy5yZW5kZXIoKVxuICAgIHRoaXMuJGVsLmFwcGVuZFRvKHRoaXMub3B0aW9ucy5wYXJlbnRFbGVtZW50KVxuICAgIHJldHVybiBjb250YWluZXJzXG4gIH1cblxuICBjcmVhdGVDb250YWluZXIoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyRmFjdG9yeS5jcmVhdGVDb250YWluZXIoc291cmNlLCBvcHRpb25zKVxuICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKGNvbnRhaW5lcilcbiAgICByZXR1cm4gY29udGFpbmVyXG4gIH1cblxuICBzZXR1cE1lZGlhQ29udHJvbChjb250YWluZXIpIHtcbiAgICBpZiAodGhpcy5tZWRpYUNvbnRyb2wpIHtcbiAgICAgIHRoaXMubWVkaWFDb250cm9sLnNldENvbnRhaW5lcihjb250YWluZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWVkaWFDb250cm9sID0gdGhpcy5jcmVhdGVNZWRpYUNvbnRyb2woYXNzaWduKHtjb250YWluZXI6IGNvbnRhaW5lcn0sIHRoaXMub3B0aW9ucykpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX0ZVTExTQ1JFRU4sIHRoaXMudG9nZ2xlRnVsbHNjcmVlbilcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tZWRpYUNvbnRyb2wsIEV2ZW50cy5NRURJQUNPTlRST0xfU0hPVywgdGhpcy5vbk1lZGlhQ29udHJvbFNob3cuYmluZCh0aGlzLCB0cnVlKSlcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tZWRpYUNvbnRyb2wsIEV2ZW50cy5NRURJQUNPTlRST0xfSElERSwgdGhpcy5vbk1lZGlhQ29udHJvbFNob3cuYmluZCh0aGlzLCBmYWxzZSkpXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlTWVkaWFDb250cm9sKG9wdGlvbnMpIHtcbiAgICBpZihvcHRpb25zLm1lZGlhY29udHJvbCAmJiBvcHRpb25zLm1lZGlhY29udHJvbC5leHRlcm5hbCkge1xuICAgICAgcmV0dXJuIG5ldyBvcHRpb25zLm1lZGlhY29udHJvbC5leHRlcm5hbChvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBNZWRpYUNvbnRyb2wob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q3VycmVudENvbnRhaW5lcigpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXJzWzBdXG4gIH1cblxuICB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgIGlmICghRnVsbHNjcmVlbi5pc0Z1bGxzY3JlZW4oKSkge1xuICAgICAgRnVsbHNjcmVlbi5yZXF1ZXN0RnVsbHNjcmVlbih0aGlzLmVsKVxuICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2Z1bGxzY3JlZW4nKVxuICAgIH0gZWxzZSB7XG4gICAgICBGdWxsc2NyZWVuLmNhbmNlbEZ1bGxzY3JlZW4oKVxuICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2Z1bGxzY3JlZW4gbm9jdXJzb3InKVxuICAgIH1cbiAgICB0aGlzLm1lZGlhQ29udHJvbC5zaG93KClcbiAgfVxuXG4gIHNob3dNZWRpYUNvbnRyb2woZXZlbnQpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5zaG93KGV2ZW50KVxuICB9XG5cbiAgaGlkZU1lZGlhQ29udHJvbChldmVudCkge1xuICAgIHRoaXMubWVkaWFDb250cm9sLmhpZGUoZXZlbnQpXG4gIH1cblxuICBvbk1lZGlhQ29udHJvbFNob3coc2hvd2luZykge1xuICAgIGlmIChzaG93aW5nKVxuICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ25vY3Vyc29yJylcbiAgICBlbHNlIGlmIChGdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpKVxuICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ25vY3Vyc29yJylcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IoJ2NvcmUnKVxuICAgIC8vRklYTUVcbiAgICAvL3RoaXMuJGVsLmVtcHR5KClcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHRoaXMubWVkaWFDb250cm9sLnJlbmRlcigpLmVsKVxuXG4gICAgdGhpcy5vcHRpb25zLndpZHRoID0gdGhpcy5vcHRpb25zLndpZHRoIHx8IHRoaXMuJGVsLndpZHRoKClcbiAgICB0aGlzLm9wdGlvbnMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLmhlaWdodCB8fCB0aGlzLiRlbC5oZWlnaHQoKVxuICAgIHZhciBzaXplID0ge3dpZHRoOiB0aGlzLm9wdGlvbnMud2lkdGgsIGhlaWdodDogdGhpcy5vcHRpb25zLmhlaWdodH1cbiAgICBQbGF5ZXJJbmZvLnByZXZpb3VzU2l6ZSA9IFBsYXllckluZm8uY3VycmVudFNpemUgPSBzaXplXG4gICAgdGhpcy51cGRhdGVTaXplKClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIFRoZSBDb3JlIEZhY3RvcnkgaXMgcmVzcG9uc2libGUgZm9yIGluc3RhbnRpYXRlIHRoZSBjb3JlIGFuZCBpdCdzIHBsdWdpbnMuXG4gKi9cblxudmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCdiYXNlX29iamVjdCcpO1xudmFyIENvcmUgPSByZXF1aXJlKCdjb3JlJyk7XG5cbmNsYXNzIENvcmVGYWN0b3J5IGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKHBsYXllciwgbG9hZGVyKSB7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXJcbiAgICB0aGlzLm9wdGlvbnMgPSBwbGF5ZXIub3B0aW9uc1xuICAgIHRoaXMubG9hZGVyID0gbG9hZGVyXG4gICAgdGhpcy5vcHRpb25zLmxvYWRlciA9IHRoaXMubG9hZGVyXG4gIH1cblxuICBjcmVhdGUoKSB7XG4gICAgdGhpcy5jb3JlID0gbmV3IENvcmUodGhpcy5vcHRpb25zKVxuICAgIHRoaXMuY29yZS50aGVuKHRoaXMuYWRkQ29yZVBsdWdpbnMuYmluZCh0aGlzKSlcbiAgICByZXR1cm4gdGhpcy5jb3JlXG4gIH1cblxuICBhZGRDb3JlUGx1Z2lucygpIHtcbiAgICB0aGlzLmxvYWRlci5jb3JlUGx1Z2lucy5mb3JFYWNoKChQbHVnaW4pID0+IHtcbiAgICAgIHZhciBwbHVnaW4gPSBuZXcgUGx1Z2luKHRoaXMuY29yZSlcbiAgICAgIHRoaXMuY29yZS5hZGRQbHVnaW4ocGx1Z2luKVxuICAgICAgdGhpcy5zZXR1cEV4dGVybmFsSW50ZXJmYWNlKHBsdWdpbilcbiAgICB9KVxuICAgIHJldHVybiB0aGlzLmNvcmVcbiAgfVxuXG4gIHNldHVwRXh0ZXJuYWxJbnRlcmZhY2UocGx1Z2luKSB7XG4gICAgdmFyIGV4dGVybmFsRnVuY3Rpb25zID0gcGx1Z2luLmdldEV4dGVybmFsSW50ZXJmYWNlKCk7XG4gICAgZm9yICh2YXIga2V5IGluIGV4dGVybmFsRnVuY3Rpb25zKSB7XG4gICAgICB0aGlzLnBsYXllcltrZXldID0gZXh0ZXJuYWxGdW5jdGlvbnNba2V5XS5iaW5kKHBsdWdpbilcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlRmFjdG9yeTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb3JlX2ZhY3RvcnknKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xvYWRlcicpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0JylcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgncGxheWVyX2luZm8nKVxudmFyIHVuaXEgPSByZXF1aXJlKCdsb2Rhc2gudW5pcScpXG5cbi8qIFBsYXliYWNrIFBsdWdpbnMgKi9cbnZhciBIVE1MNVZpZGVvUGxheWJhY2sgPSByZXF1aXJlKCdodG1sNV92aWRlbycpO1xudmFyIEZsYXNoVmlkZW9QbGF5YmFjayA9IHJlcXVpcmUoJ2ZsYXNoJyk7XG52YXIgSFRNTDVBdWRpb1BsYXliYWNrID0gcmVxdWlyZSgnaHRtbDVfYXVkaW8nKTtcbnZhciBITFNWaWRlb1BsYXliYWNrID0gcmVxdWlyZSgnaGxzJyk7XG52YXIgSFRNTEltZ1BsYXliYWNrID0gcmVxdWlyZSgnaHRtbF9pbWcnKTtcbnZhciBOb09wID0gcmVxdWlyZSgnLi4vLi4vcGxheWJhY2tzL25vX29wJyk7XG5cbi8qIENvbnRhaW5lciBQbHVnaW5zICovXG52YXIgU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9zcGlubmVyX3RocmVlX2JvdW5jZScpO1xudmFyIFN0YXRzUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9zdGF0cycpO1xudmFyIFdhdGVyTWFya1BsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvd2F0ZXJtYXJrJyk7XG52YXIgUG9zdGVyUGx1Z2luID0gcmVxdWlyZSgncG9zdGVyJyk7XG52YXIgR29vZ2xlQW5hbHl0aWNzUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9nb29nbGVfYW5hbHl0aWNzJyk7XG52YXIgQ2xpY2tUb1BhdXNlUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9jbGlja190b19wYXVzZScpO1xuXG4vKiBDb3JlIFBsdWdpbnMgKi9cbnZhciBEVlJDb250cm9scyA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvZHZyX2NvbnRyb2xzJyk7XG5cbmNsYXNzIExvYWRlciBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihleHRlcm5hbFBsdWdpbnMpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5wbGF5YmFja1BsdWdpbnMgPSBbSFRNTDVWaWRlb1BsYXliYWNrLCBGbGFzaFZpZGVvUGxheWJhY2ssIEhUTUw1QXVkaW9QbGF5YmFjaywgSExTVmlkZW9QbGF5YmFjaywgSFRNTEltZ1BsYXliYWNrLCBOb09wXVxuICAgIHRoaXMuY29udGFpbmVyUGx1Z2lucyA9IFtTcGlubmVyVGhyZWVCb3VuY2VQbHVnaW4sIFdhdGVyTWFya1BsdWdpbiwgUG9zdGVyUGx1Z2luLCBTdGF0c1BsdWdpbiwgR29vZ2xlQW5hbHl0aWNzUGx1Z2luLCBDbGlja1RvUGF1c2VQbHVnaW5dXG4gICAgdGhpcy5jb3JlUGx1Z2lucyA9IFtEVlJDb250cm9sc11cbiAgICBpZiAoZXh0ZXJuYWxQbHVnaW5zKSB7XG4gICAgICB0aGlzLmFkZEV4dGVybmFsUGx1Z2lucyhleHRlcm5hbFBsdWdpbnMpXG4gICAgfVxuICB9XG5cbiAgYWRkRXh0ZXJuYWxQbHVnaW5zKHBsdWdpbnMpIHtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGZ1bmN0aW9uKHBsdWdpbikgeyByZXR1cm4gcGx1Z2luLnByb3RvdHlwZS5uYW1lIH1cbiAgICBpZiAocGx1Z2lucy5wbGF5YmFjaykgeyB0aGlzLnBsYXliYWNrUGx1Z2lucyA9IHVuaXEocGx1Z2lucy5wbGF5YmFjay5jb25jYXQodGhpcy5wbGF5YmFja1BsdWdpbnMpLCBwbHVnaW5OYW1lKSB9XG4gICAgaWYgKHBsdWdpbnMuY29udGFpbmVyKSB7IHRoaXMuY29udGFpbmVyUGx1Z2lucyA9IHVuaXEocGx1Z2lucy5jb250YWluZXIuY29uY2F0KHRoaXMuY29udGFpbmVyUGx1Z2lucyksIHBsdWdpbk5hbWUpIH1cbiAgICBpZiAocGx1Z2lucy5jb3JlKSB7IHRoaXMuY29yZVBsdWdpbnMgPSB1bmlxKHBsdWdpbnMuY29yZS5jb25jYXQodGhpcy5jb3JlUGx1Z2lucyksIHBsdWdpbk5hbWUpIH1cbiAgICBQbGF5ZXJJbmZvLnBsYXliYWNrUGx1Z2lucyA9IHRoaXMucGxheWJhY2tQbHVnaW5zXG4gIH1cblxuICBnZXRQbHVnaW4obmFtZSkge1xuICAgIHZhciBhbGxQbHVnaW5zID0gdGhpcy5jb250YWluZXJQbHVnaW5zLmNvbmNhdCh0aGlzLnBsYXliYWNrUGx1Z2lucykuY29uY2F0KHRoaXMuY29yZVBsdWdpbnMpXG4gICAgcmV0dXJuIGFsbFBsdWdpbnMuZmluZCgocGx1Z2luKSA9PiB7IHJldHVybiBwbHVnaW4ucHJvdG90eXBlLm5hbWUgPT09IG5hbWUgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogVGhlIE1lZGlhQ29udHJvbCBpcyByZXNwb25zaWJsZSBmb3IgZGlzcGxheWluZyB0aGUgUGxheWVyIGNvbnRyb2xzLlxuICovXG5cbnZhciAkID0gcmVxdWlyZSgnemVwdG8nKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgVUlPYmplY3QgPSByZXF1aXJlKCd1aV9vYmplY3QnKVxudmFyIFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJ2Jyb3dzZXInKVxudmFyIFNlZWtUaW1lID0gcmVxdWlyZSgnLi4vc2Vla190aW1lJylcbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJ21lZGlhdG9yJylcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgncGxheWVyX2luZm8nKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5yZXF1aXJlKCdtb3VzZXRyYXAnKVxuXG5jbGFzcyBNZWRpYUNvbnRyb2wgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ01lZGlhQ29udHJvbCcgfVxuXG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzczogJ21lZGlhLWNvbnRyb2wnLFxuICAgICAgJ2RhdGEtbWVkaWEtY29udHJvbCc6ICcnXG4gICAgfVxuICB9XG5cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsaWNrIFtkYXRhLXBsYXldJzogJ3BsYXknLFxuICAgICAgJ2NsaWNrIFtkYXRhLXBhdXNlXSc6ICdwYXVzZScsXG4gICAgICAnY2xpY2sgW2RhdGEtcGxheXBhdXNlXSc6ICd0b2dnbGVQbGF5UGF1c2UnLFxuICAgICAgJ2NsaWNrIFtkYXRhLXN0b3BdJzogJ3N0b3AnLFxuICAgICAgJ2NsaWNrIFtkYXRhLXBsYXlzdG9wXSc6ICd0b2dnbGVQbGF5U3RvcCcsXG4gICAgICAnY2xpY2sgW2RhdGEtZnVsbHNjcmVlbl0nOiAndG9nZ2xlRnVsbHNjcmVlbicsXG4gICAgICAnY2xpY2sgLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSc6ICdzZWVrJyxcbiAgICAgICdjbGljayAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0nOiAndm9sdW1lJyxcbiAgICAgICdjbGljayAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdJzogJ3RvZ2dsZU11dGUnLFxuICAgICAgJ21vdXNlZW50ZXIgLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdJzogJ3Nob3dWb2x1bWVCYXInLFxuICAgICAgJ21vdXNlbGVhdmUgLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdJzogJ2hpZGVWb2x1bWVCYXInLFxuICAgICAgJ21vdXNlZG93biAuYmFyLXNjcnViYmVyW2RhdGEtdm9sdW1lXSc6ICdzdGFydFZvbHVtZURyYWcnLFxuICAgICAgJ21vdXNlZG93biAuYmFyLXNjcnViYmVyW2RhdGEtc2Vla2Jhcl0nOiAnc3RhcnRTZWVrRHJhZycsXG4gICAgICAnbW91c2Vtb3ZlIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0nOiAnbW91c2Vtb3ZlT25TZWVrQmFyJyxcbiAgICAgICdtb3VzZWxlYXZlIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0nOiAnbW91c2VsZWF2ZU9uU2Vla0JhcicsXG4gICAgICAnbW91c2VlbnRlciAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSc6ICdzZXRLZWVwVmlzaWJsZScsXG4gICAgICAnbW91c2VsZWF2ZSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSc6ICdyZXNldEtlZXBWaXNpYmxlJ1xuICAgIH1cbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5tZWRpYV9jb250cm9sIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnNlZWtUaW1lID0gbmV3IFNlZWtUaW1lKHRoaXMpXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMubXV0ZSA9IHRoaXMub3B0aW9ucy5tdXRlXG4gICAgdGhpcy5wZXJzaXN0Q29uZmlnID0gdGhpcy5vcHRpb25zLnBlcnNpc3RDb25maWdcbiAgICB0aGlzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG4gICAgdmFyIGluaXRpYWxWb2x1bWUgPSAodGhpcy5wZXJzaXN0Q29uZmlnKSA/IFV0aWxzLkNvbmZpZy5yZXN0b3JlKFwidm9sdW1lXCIpIDogMTAwO1xuICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMubXV0ZSA/IDAgOiBpbml0aWFsVm9sdW1lKVxuICAgIHRoaXMua2VlcFZpc2libGUgPSBmYWxzZVxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICBsZWZ0OiBbJ3BsYXknLCAnc3RvcCcsICdwYXVzZSddLFxuICAgICAgcmlnaHQ6IFsndm9sdW1lJ10sXG4gICAgICBkZWZhdWx0OiBbJ3Bvc2l0aW9uJywgJ3NlZWtiYXInLCAnZHVyYXRpb24nXVxuICAgIH1cbiAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmtleXModGhpcy5jb250YWluZXIuc2V0dGluZ3MpLmxlbmd0aCA9PT0gMCA/IHRoaXMuc2V0dGluZ3MgOiB0aGlzLmNvbnRhaW5lci5zZXR0aW5nc1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgIGlmICh0aGlzLmNvbnRhaW5lci5tZWRpYUNvbnRyb2xEaXNhYmxlZCB8fCB0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9XG4gICAgJChkb2N1bWVudCkuYmluZCgnbW91c2V1cCcsIChldmVudCkgPT4gdGhpcy5zdG9wRHJhZyhldmVudCkpXG4gICAgJChkb2N1bWVudCkuYmluZCgnbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB0aGlzLnVwZGF0ZURyYWcoZXZlbnQpKVxuICAgIE1lZGlhdG9yLm9uKEV2ZW50cy5QTEFZRVJfUkVTSVpFLCAoKSA9PiB0aGlzLnBsYXllclJlc2l6ZSgpKVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFLCB0aGlzLnVwZGF0ZVNlZWtCYXIpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QUk9HUkVTUywgdGhpcy51cGRhdGVQcm9ncmVzc0JhcilcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NFVFRJTkdTVVBEQVRFLCB0aGlzLnNldHRpbmdzVXBkYXRlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQsIHRoaXMuc2V0dGluZ3NVcGRhdGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9ISUdIREVGSU5JVElPTlVQREFURSwgdGhpcy5oaWdoRGVmaW5pdGlvblVwZGF0ZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9ESVNBQkxFLCB0aGlzLmRpc2FibGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRU5BQkxFLCB0aGlzLmVuYWJsZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0VOREVELCB0aGlzLmVuZGVkKVxuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgIHRoaXMuaGlkZSgpXG4gICAgdGhpcy4kZWwuaGlkZSgpXG4gIH1cblxuICBlbmFibGUoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jaHJvbWVsZXNzKSByZXR1cm5cbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICB0aGlzLnNob3coKVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5wbGF5KClcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuY29udGFpbmVyLnBhdXNlKClcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5jb250YWluZXIuc3RvcCgpXG4gIH1cblxuICBjaGFuZ2VUb2dnbGVQbGF5KCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkge1xuICAgICAgdGhpcy4kcGxheVBhdXNlVG9nZ2xlLnJlbW92ZUNsYXNzKCdwYXVzZWQnKS5hZGRDbGFzcygncGxheWluZycpXG4gICAgICB0aGlzLiRwbGF5U3RvcFRvZ2dsZS5yZW1vdmVDbGFzcygnc3RvcHBlZCcpLmFkZENsYXNzKCdwbGF5aW5nJylcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX1BMQVlJTkcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRwbGF5UGF1c2VUb2dnbGUucmVtb3ZlQ2xhc3MoJ3BsYXlpbmcnKS5hZGRDbGFzcygncGF1c2VkJylcbiAgICAgIHRoaXMuJHBsYXlTdG9wVG9nZ2xlLnJlbW92ZUNsYXNzKCdwbGF5aW5nJykuYWRkQ2xhc3MoJ3N0b3BwZWQnKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfTk9UUExBWUlORyk7XG4gICAgfVxuICB9XG5cbiAgbW91c2Vtb3ZlT25TZWVrQmFyKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLnNldHRpbmdzLnNlZWtFbmFibGVkKSB7XG4gICAgICB2YXIgb2Zmc2V0WCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy4kc2Vla0JhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0IC0gKHRoaXMuJHNlZWtCYXJIb3Zlci53aWR0aCgpIC8gMilcbiAgICAgIHRoaXMuJHNlZWtCYXJIb3Zlci5jc3Moe2xlZnQ6IG9mZnNldFh9KVxuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9NT1VTRU1PVkVfU0VFS0JBUiwgZXZlbnQpO1xuICB9XG5cbiAgbW91c2VsZWF2ZU9uU2Vla0JhcihldmVudCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX01PVVNFTEVBVkVfU0VFS0JBUiwgZXZlbnQpO1xuICB9XG5cbiAgcGxheWVyUmVzaXplKCkge1xuICAgIGlmIChVdGlscy5GdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpKSB7XG4gICAgICB0aGlzLiRmdWxsc2NyZWVuVG9nZ2xlLmFkZENsYXNzKCdzaHJpbmsnKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRmdWxsc2NyZWVuVG9nZ2xlLnJlbW92ZUNsYXNzKCdzaHJpbmsnKVxuICAgIH1cbiAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygndzMyMCcpXG4gICAgaWYgKFBsYXllckluZm8uY3VycmVudFNpemUud2lkdGggPD0gMzIwIHx8IHRoaXMub3B0aW9ucy5oaWRlVm9sdW1lQmFyKSB7XG4gICAgICB0aGlzLiRlbC5hZGRDbGFzcygndzMyMCcpXG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUGxheVBhdXNlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkge1xuICAgICAgdGhpcy5jb250YWluZXIucGF1c2UoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5wbGF5KClcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KClcbiAgfVxuXG4gIHRvZ2dsZVBsYXlTdG9wKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkge1xuICAgICAgdGhpcy5jb250YWluZXIuc3RvcCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnBsYXkoKVxuICAgIH1cbiAgICB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkoKVxuICB9XG5cbiAgc3RhcnRTZWVrRHJhZyhldmVudCkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIuc2V0dGluZ3Muc2Vla0VuYWJsZWQpIHJldHVyblxuICAgIHRoaXMuZHJhZ2dpbmdTZWVrQmFyID0gdHJ1ZVxuICAgIHRoaXMuJGVsLmFkZENsYXNzKCdkcmFnZ2luZycpXG4gICAgdGhpcy4kc2Vla0JhckxvYWRlZC5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbi5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlci5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0Vm9sdW1lRHJhZyhldmVudCkge1xuICAgIHRoaXMuZHJhZ2dpbmdWb2x1bWVCYXIgPSB0cnVlXG4gICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2RyYWdnaW5nJylcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICBzdG9wRHJhZyhldmVudCkge1xuICAgIGlmICh0aGlzLmRyYWdnaW5nU2Vla0Jhcikge1xuICAgICAgdGhpcy5zZWVrKGV2ZW50KVxuICAgIH1cbiAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKVxuICAgIHRoaXMuJHNlZWtCYXJMb2FkZWQucmVtb3ZlQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24ucmVtb3ZlQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB0aGlzLiRzZWVrQmFyU2NydWJiZXIucmVtb3ZlQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uIGRyYWdnaW5nJylcbiAgICB0aGlzLmRyYWdnaW5nU2Vla0JhciA9IGZhbHNlXG4gICAgdGhpcy5kcmFnZ2luZ1ZvbHVtZUJhciA9IGZhbHNlXG4gIH1cblxuICB1cGRhdGVEcmFnKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICAgIGlmICh0aGlzLmRyYWdnaW5nU2Vla0Jhcikge1xuICAgICAgdmFyIG9mZnNldFggPSBldmVudC5wYWdlWCAtIHRoaXMuJHNlZWtCYXJDb250YWluZXIub2Zmc2V0KCkubGVmdFxuICAgICAgdmFyIHBvcyA9IG9mZnNldFggLyB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLndpZHRoKCkgKiAxMDBcbiAgICAgIHBvcyA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgocG9zLCAwKSlcbiAgICAgIHRoaXMuc2V0U2Vla1BlcmNlbnRhZ2UocG9zKVxuICAgIH0gZWxzZSBpZiAodGhpcy5kcmFnZ2luZ1ZvbHVtZUJhcikge1xuICAgICAgdGhpcy52b2x1bWUoZXZlbnQpXG4gICAgfVxuICB9XG5cbiAgdm9sdW1lKGV2ZW50KSB7XG4gICAgdmFyIG9mZnNldFkgPSBldmVudC5wYWdlWCAtIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0XG4gICAgdmFyIHZvbHVtZUZyb21VSSA9IChvZmZzZXRZIC8gdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLndpZHRoKCkpICogMTAwXG4gICAgdGhpcy5zZXRWb2x1bWUodm9sdW1lRnJvbVVJKVxuICB9XG5cbiAgdG9nZ2xlTXV0ZSgpIHtcbiAgICBpZiAodGhpcy5tdXRlKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50Vm9sdW1lIDw9IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50Vm9sdW1lID0gMTAwXG4gICAgICB9XG4gICAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmN1cnJlbnRWb2x1bWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0Vm9sdW1lKDApXG4gICAgfVxuICB9XG5cbiAgc2V0Vm9sdW1lKHZhbHVlKSB7XG4gICAgdGhpcy5jdXJyZW50Vm9sdW1lID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heCh2YWx1ZSwgMCkpXG4gICAgdGhpcy5jb250YWluZXIuc2V0Vm9sdW1lKHRoaXMuY3VycmVudFZvbHVtZSlcbiAgICB0aGlzLnNldFZvbHVtZUxldmVsKHRoaXMuY3VycmVudFZvbHVtZSlcbiAgICB0aGlzLm11dGUgPSB0aGlzLmN1cnJlbnRWb2x1bWUgPT09IDBcbiAgICB0aGlzLnBlcnNpc3RDb25maWcgJiYgVXRpbHMuQ29uZmlnLnBlcnNpc3QoXCJ2b2x1bWVcIiwgdGhpcy5jdXJyZW50Vm9sdW1lKVxuICB9XG5cbiAgdG9nZ2xlRnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9GVUxMU0NSRUVOLCB0aGlzLm5hbWUpXG4gICAgdGhpcy5jb250YWluZXIuZnVsbHNjcmVlbigpXG4gICAgdGhpcy5yZXNldEtlZXBWaXNpYmxlKClcbiAgfVxuXG4gIHNldENvbnRhaW5lcihjb250YWluZXIpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcodGhpcy5jb250YWluZXIpXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXJcbiAgICB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkoKVxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIHRoaXMuc2V0dGluZ3NVcGRhdGUoKVxuICAgIHRoaXMuY29udGFpbmVyLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCwgdGhpcy5jb250YWluZXIuaXNEdnJJblVzZSgpKVxuICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMuY3VycmVudFZvbHVtZSlcbiAgICBpZiAodGhpcy5jb250YWluZXIubWVkaWFDb250cm9sRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZGlzYWJsZSgpXG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX0NPTlRBSU5FUkNIQU5HRUQpXG4gIH1cblxuICBzaG93Vm9sdW1lQmFyKCkge1xuICAgIGlmICh0aGlzLmhpZGVWb2x1bWVJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVZvbHVtZUlkKVxuICAgIH1cbiAgICB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3ZvbHVtZS1iYXItaGlkZScpXG4gIH1cblxuICBoaWRlVm9sdW1lQmFyKCkge1xuICAgIHZhciB0aW1lb3V0ID0gNDAwXG4gICAgaWYgKCF0aGlzLiR2b2x1bWVCYXJDb250YWluZXIpIHJldHVyblxuICAgIGlmICh0aGlzLmRyYWdnaW5nVm9sdW1lQmFyKSB7XG4gICAgICB0aGlzLmhpZGVWb2x1bWVJZCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlVm9sdW1lQmFyKCksIHRpbWVvdXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmhpZGVWb2x1bWVJZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlVm9sdW1lSWQpXG4gICAgICB9XG4gICAgICB0aGlzLmhpZGVWb2x1bWVJZCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLmFkZENsYXNzKCd2b2x1bWUtYmFyLWhpZGUnKSwgdGltZW91dClcbiAgICB9XG4gIH1cblxuICBlbmRlZCgpIHtcbiAgICB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkoKVxuICB9XG5cbiAgdXBkYXRlUHJvZ3Jlc3NCYXIoc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24sIGR1cmF0aW9uKSB7XG4gICAgdmFyIGxvYWRlZFN0YXJ0ID0gc3RhcnRQb3NpdGlvbiAvIGR1cmF0aW9uICogMTAwXG4gICAgdmFyIGxvYWRlZEVuZCA9IGVuZFBvc2l0aW9uIC8gZHVyYXRpb24gKiAxMDBcbiAgICB0aGlzLiRzZWVrQmFyTG9hZGVkLmNzcyh7IGxlZnQ6IGxvYWRlZFN0YXJ0ICsgJyUnLCB3aWR0aDogKGxvYWRlZEVuZCAtIGxvYWRlZFN0YXJ0KSArICclJyB9KVxuICB9XG5cbiAgdXBkYXRlU2Vla0Jhcihwb3NpdGlvbiwgZHVyYXRpb24pIHtcbiAgICBpZiAodGhpcy5kcmFnZ2luZ1NlZWtCYXIpIHJldHVyblxuICAgIGlmIChwb3NpdGlvbiA8IDApIHBvc2l0aW9uID0gZHVyYXRpb25cbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24ucmVtb3ZlQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB0aGlzLiRzZWVrQmFyU2NydWJiZXIucmVtb3ZlQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB2YXIgc2Vla2JhclZhbHVlID0gKDEwMCAvIGR1cmF0aW9uKSAqIHBvc2l0aW9uXG4gICAgdGhpcy5zZXRTZWVrUGVyY2VudGFnZShzZWVrYmFyVmFsdWUpXG4gICAgdGhpcy4kKCdbZGF0YS1wb3NpdGlvbl0nKS5odG1sKFV0aWxzLmZvcm1hdFRpbWUocG9zaXRpb24pKVxuICAgIHRoaXMuJCgnW2RhdGEtZHVyYXRpb25dJykuaHRtbChVdGlscy5mb3JtYXRUaW1lKGR1cmF0aW9uKSlcbiAgfVxuXG4gIHNlZWsoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyLnNldHRpbmdzLnNlZWtFbmFibGVkKSByZXR1cm5cbiAgICB2YXIgb2Zmc2V0WCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy4kc2Vla0JhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0XG4gICAgdmFyIHBvcyA9IG9mZnNldFggLyB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLndpZHRoKCkgKiAxMDBcbiAgICBwb3MgPSBNYXRoLm1pbigxMDAsIE1hdGgubWF4KHBvcywgMCkpXG4gICAgdGhpcy5jb250YWluZXIuc2V0Q3VycmVudFRpbWUocG9zKVxuICAgIHRoaXMuc2V0U2Vla1BlcmNlbnRhZ2UocG9zKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgc2V0S2VlcFZpc2libGUoKSB7XG4gICAgdGhpcy5rZWVwVmlzaWJsZSA9IHRydWVcbiAgfVxuXG4gIHJlc2V0S2VlcFZpc2libGUoKSB7XG4gICAgdGhpcy5rZWVwVmlzaWJsZSA9IGZhbHNlXG4gIH1cblxuICBpc1Zpc2libGUoKSB7XG4gICAgcmV0dXJuICF0aGlzLiRlbC5oYXNDbGFzcygnbWVkaWEtY29udHJvbC1oaWRlJylcbiAgfVxuXG4gIHNob3coZXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuXG4gICAgdmFyIHRpbWVvdXQgPSAyMDAwXG4gICAgaWYgKCFldmVudCB8fCAoZXZlbnQuY2xpZW50WCAhPT0gdGhpcy5sYXN0TW91c2VYICYmIGV2ZW50LmNsaWVudFkgIT09IHRoaXMubGFzdE1vdXNlWSkgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvZmlyZWZveC9pKSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZUlkKVxuICAgICAgdGhpcy4kZWwuc2hvdygpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9TSE9XLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1oaWRlJylcbiAgICAgIHRoaXMuaGlkZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGltZW91dClcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICB0aGlzLmxhc3RNb3VzZVggPSBldmVudC5jbGllbnRYXG4gICAgICAgIHRoaXMubGFzdE1vdXNlWSA9IGV2ZW50LmNsaWVudFlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHZhciB0aW1lb3V0ID0gMjAwMFxuICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVJZClcbiAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKCkgfHwgdGhpcy5vcHRpb25zLmhpZGVNZWRpYUNvbnRyb2wgPT09IGZhbHNlKSByZXR1cm5cbiAgICBpZiAodGhpcy5rZWVwVmlzaWJsZSB8fCB0aGlzLmRyYWdnaW5nU2Vla0JhciB8fCB0aGlzLmRyYWdnaW5nVm9sdW1lQmFyKSB7XG4gICAgICB0aGlzLmhpZGVJZCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlKCksIHRpbWVvdXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX0hJREUsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLWhpZGUnKVxuICAgICAgdGhpcy5oaWRlVm9sdW1lQmFyKClcbiAgICB9XG4gIH1cblxuICBzZXR0aW5nc1VwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuZ2V0UGxheWJhY2tUeXBlKCkgIT09IG51bGwgJiYgT2JqZWN0LmtleXModGhpcy5jb250YWluZXIuc2V0dGluZ3MpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuY29udGFpbmVyLnNldHRpbmdzXG4gICAgICB0aGlzLnJlbmRlcigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzYWJsZSgpXG4gICAgfVxuICB9XG5cbiAgaGlnaERlZmluaXRpb25VcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLmlzSGlnaERlZmluaXRpb25JblVzZSgpKSB7XG4gICAgICB0aGlzLiRlbC5maW5kKCdidXR0b25bZGF0YS1oZC1pbmRpY2F0b3JdJykuYWRkQ2xhc3MoXCJlbmFibGVkXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsLmZpbmQoJ2J1dHRvbltkYXRhLWhkLWluZGljYXRvcl0nKS5yZW1vdmVDbGFzcyhcImVuYWJsZWRcIilcbiAgICB9XG4gIH1cblxuICBjcmVhdGVDYWNoZWRFbGVtZW50cygpIHtcbiAgICB0aGlzLiRwbGF5UGF1c2VUb2dnbGUgPSB0aGlzLiRlbC5maW5kKCdidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5cGF1c2VdJylcbiAgICB0aGlzLiRwbGF5U3RvcFRvZ2dsZSA9IHRoaXMuJGVsLmZpbmQoJ2J1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlzdG9wXScpXG4gICAgdGhpcy4kZnVsbHNjcmVlblRvZ2dsZSA9IHRoaXMuJGVsLmZpbmQoJ2J1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWZ1bGxzY3JlZW5dJylcbiAgICB0aGlzLiRzZWVrQmFyQ29udGFpbmVyID0gdGhpcy4kZWwuZmluZCgnLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXScpXG4gICAgdGhpcy4kc2Vla0JhckxvYWRlZCA9IHRoaXMuJGVsLmZpbmQoJy5iYXItZmlsbC0xW2RhdGEtc2Vla2Jhcl0nKVxuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbiA9IHRoaXMuJGVsLmZpbmQoJy5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl0nKVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlciA9IHRoaXMuJGVsLmZpbmQoJy5iYXItc2NydWJiZXJbZGF0YS1zZWVrYmFyXScpXG4gICAgdGhpcy4kc2Vla0JhckhvdmVyID0gdGhpcy4kZWwuZmluZCgnLmJhci1ob3ZlcltkYXRhLXNlZWtiYXJdJylcbiAgICB0aGlzLiR2b2x1bWVDb250YWluZXIgPSB0aGlzLiRlbC5maW5kKCcuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0nKVxuICAgIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lciA9IHRoaXMuJGVsLmZpbmQoJy5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXScpXG4gICAgdGhpcy4kdm9sdW1lSWNvbiA9IHRoaXMuJGVsLmZpbmQoJy5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV0nKVxuICB9XG5cbiAgc2V0Vm9sdW1lTGV2ZWwodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyLmlzUmVhZHkgfHwgIXRoaXMuJHZvbHVtZUJhckNvbnRhaW5lcikge1xuICAgICAgdGhpcy5saXN0ZW5Ub09uY2UodGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUkVBRFksICgpID0+IHRoaXMuc2V0Vm9sdW1lTGV2ZWwodmFsdWUpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIuZmluZCgnLnNlZ21lbnRlZC1iYXItZWxlbWVudCcpLnJlbW92ZUNsYXNzKCdmaWxsJylcbiAgICAgIHZhciBpdGVtID0gTWF0aC5jZWlsKHZhbHVlIC8gMTAuMClcbiAgICAgIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci5maW5kKCcuc2VnbWVudGVkLWJhci1lbGVtZW50Jykuc2xpY2UoMCwgaXRlbSkuYWRkQ2xhc3MoJ2ZpbGwnKVxuICAgICAgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICB0aGlzLiR2b2x1bWVJY29uLnJlbW92ZUNsYXNzKCdtdXRlZCcpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiR2b2x1bWVJY29uLmFkZENsYXNzKCdtdXRlZCcpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0U2Vla1BlcmNlbnRhZ2UodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPiAxMDApIHJldHVyblxuICAgIHZhciBwb3MgPSB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLndpZHRoKCkgKiB2YWx1ZSAvIDEwMC4wIC0gKHRoaXMuJHNlZWtCYXJTY3J1YmJlci53aWR0aCgpIC8gMi4wKVxuICAgIHRoaXMuY3VycmVudFNlZWtQZXJjZW50YWdlID0gdmFsdWU7XG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uLmNzcyh7IHdpZHRoOiB2YWx1ZSArICclJyB9KVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlci5jc3MoeyBsZWZ0OiBwb3MgfSlcbiAgfVxuXG4gIGJpbmRLZXlFdmVudHMoKSB7XG4gICAgTW91c2V0cmFwLmJpbmQoWydzcGFjZSddLCAoKSA9PiB0aGlzLnRvZ2dsZVBsYXlQYXVzZSgpKVxuICB9XG5cbiAgdW5iaW5kS2V5RXZlbnRzKCkge1xuICAgIE1vdXNldHJhcC51bmJpbmQoJ3NwYWNlJylcbiAgfVxuXG4gIHBhcnNlQ29sb3JzKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMubWVkaWFjb250cm9sKSB7XG4gICAgICB2YXIgYnV0dG9uc0NvbG9yID0gdGhpcy5vcHRpb25zLm1lZGlhY29udHJvbC5idXR0b25zO1xuICAgICAgdmFyIHNlZWtiYXJDb2xvciA9IHRoaXMub3B0aW9ucy5tZWRpYWNvbnRyb2wuc2Vla2JhcjtcbiAgICAgIHRoaXMuJGVsLmZpbmQoJy5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl0nKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBzZWVrYmFyQ29sb3IpXG4gICAgICB0aGlzLiRlbC5maW5kKCdbZGF0YS1tZWRpYS1jb250cm9sXSA+IC5tZWRpYS1jb250cm9sLWljb24sIC5kcmF3ZXItaWNvbicpLmNzcygnY29sb3InLCBidXR0b25zQ29sb3IpXG4gICAgICB0aGlzLiRlbC5maW5kKCcuc2VnbWVudGVkLWJhci1lbGVtZW50W2RhdGEtdm9sdW1lXScpLmNzcygnYm94U2hhZG93JywgXCJpbnNldCAycHggMCAwIFwiICsgYnV0dG9uc0NvbG9yKVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgJChkb2N1bWVudCkudW5iaW5kKCdtb3VzZXVwJylcbiAgICAkKGRvY3VtZW50KS51bmJpbmQoJ21vdXNlbW92ZScpXG4gICAgdGhpcy51bmJpbmRLZXlFdmVudHMoKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciB0aW1lb3V0ID0gMTAwMFxuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcignbWVkaWFfY29udHJvbCcsIHtiYXNlVXJsOiB0aGlzLm9wdGlvbnMuYmFzZVVybH0pO1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7IHNldHRpbmdzOiB0aGlzLnNldHRpbmdzIH0pKVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICB0aGlzLmNyZWF0ZUNhY2hlZEVsZW1lbnRzKClcbiAgICB0aGlzLiRwbGF5UGF1c2VUb2dnbGUuYWRkQ2xhc3MoJ3BhdXNlZCcpXG4gICAgdGhpcy4kcGxheVN0b3BUb2dnbGUuYWRkQ2xhc3MoJ3N0b3BwZWQnKVxuXG4gICAgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KClcbiAgICB0aGlzLmhpZGVJZCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlKCksIHRpbWVvdXQpXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuaGlkZSgpXG4gICAgfVxuXG4gICAgaWYoQnJvd3Nlci5pc1NhZmFyaSAmJiBCcm93c2VyLmlzTW9iaWxlKSB7XG4gICAgICB0aGlzLiR2b2x1bWVDb250YWluZXIuY3NzKCdkaXNwbGF5Jywnbm9uZScpXG4gICAgfVxuXG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG5cbiAgICBpZiAoIXRoaXMuY3VycmVudFNlZWtQZXJjZW50YWdlKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTZWVrUGVyY2VudGFnZSA9IDBcbiAgICB9XG4gICAgdGhpcy5zZXRTZWVrUGVyY2VudGFnZSh0aGlzLmN1cnJlbnRTZWVrUGVyY2VudGFnZSlcblxuICAgIHRoaXMuJGVsLnJlYWR5KCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5jb250YWluZXIuc2V0dGluZ3Muc2Vla0VuYWJsZWQpIHtcbiAgICAgICAgdGhpcy4kc2Vla0JhckNvbnRhaW5lci5hZGRDbGFzcygnc2Vlay1kaXNhYmxlZCcpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMuY3VycmVudFZvbHVtZSlcbiAgICAgIHRoaXMuYmluZEtleUV2ZW50cygpXG4gICAgICB0aGlzLmhpZGVWb2x1bWVCYXIoKVxuICAgIH0pXG5cbiAgICB0aGlzLnBhcnNlQ29sb3JzKClcbiAgICB0aGlzLnNlZWtUaW1lLnJlbmRlcigpXG4gICAgdGhpcy5oaWdoRGVmaW5pdGlvblVwZGF0ZSgpXG5cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9SRU5ERVJFRClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWVkaWFDb250cm9sXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0JylcbnZhciBDb3JlRmFjdG9yeSA9IHJlcXVpcmUoJy4vY29yZV9mYWN0b3J5JylcbnZhciBMb2FkZXIgPSByZXF1aXJlKCcuL2xvYWRlcicpXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgUGxheWVySW5mbyA9IHJlcXVpcmUoJ3BsYXllcl9pbmZvJylcblxuY2xhc3MgUGxheWVyIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHdpbmRvdy5wID0gdGhpc1xuICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtwZXJzaXN0Q29uZmlnOiB0cnVlLCB3aWR0aDogNjQwLCBoZWlnaHQ6IDM2MCwgYmFzZVVybDogJ2h0dHA6Ly9jZG4uY2xhcHByLmlvL2xhdGVzdCd9XG4gICAgdGhpcy5vcHRpb25zID0gYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKVxuICAgIHRoaXMub3B0aW9ucy5zb3VyY2VzID0gdGhpcy5ub3JtYWxpemVTb3VyY2VzKG9wdGlvbnMpXG4gICAgdGhpcy5sb2FkZXIgPSBuZXcgTG9hZGVyKHRoaXMub3B0aW9ucy5wbHVnaW5zIHx8IHt9KVxuICAgIHRoaXMuY29yZUZhY3RvcnkgPSBuZXcgQ29yZUZhY3RvcnkodGhpcywgdGhpcy5sb2FkZXIpXG4gICAgUGxheWVySW5mby5jdXJyZW50U2l6ZSA9IHt3aWR0aDogb3B0aW9ucy53aWR0aCwgaGVpZ2h0OiBvcHRpb25zLmhlaWdodH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnBhcmVudElkKSB7XG4gICAgICB0aGlzLnNldFBhcmVudElkKHRoaXMub3B0aW9ucy5wYXJlbnRJZClcbiAgICB9XG4gIH1cblxuICBzZXRQYXJlbnRJZChwYXJlbnRJZCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyZW50SWQpXG4gICAgaWYgKGVsKSB7XG4gICAgICB0aGlzLmF0dGFjaFRvKGVsKVxuICAgIH1cbiAgfVxuXG4gIGF0dGFjaFRvKGVsZW1lbnQpIHtcbiAgICB0aGlzLm9wdGlvbnMucGFyZW50RWxlbWVudCA9IGVsZW1lbnRcbiAgICB0aGlzLmNvcmUgPSB0aGlzLmNvcmVGYWN0b3J5LmNyZWF0ZSgpXG4gIH1cblxuICBpcyh2YWx1ZSwgdHlwZSkge1xuICAgIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gdHlwZVxuICB9XG5cbiAgbm9ybWFsaXplU291cmNlcyhvcHRpb25zKSB7XG4gICAgdmFyIHNvdXJjZXMgPSBvcHRpb25zLnNvdXJjZXMgfHwgKG9wdGlvbnMuc291cmNlICE9PSB1bmRlZmluZWQ/IFtvcHRpb25zLnNvdXJjZS50b1N0cmluZygpXSA6IFtdKVxuICAgIHJldHVybiBzb3VyY2VzLmxlbmd0aCA9PT0gMCA/IFsnbm8ub3AnXSA6IHNvdXJjZXNcbiAgfVxuXG4gIHJlc2l6ZShzaXplKSB7XG4gICAgdGhpcy5jb3JlLnJlc2l6ZShzaXplKTtcbiAgfVxuXG4gIGxvYWQoc291cmNlcykge1xuICAgIHRoaXMuY29yZS5sb2FkKHNvdXJjZXMpXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuY29yZS5kZXN0cm95KClcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIucGxheSgpO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIucGF1c2UoKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc3RvcCgpO1xuICB9XG5cbiAgc2Vlayh0aW1lKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc2V0Q3VycmVudFRpbWUodGltZSk7XG4gIH1cblxuICBzZXRWb2x1bWUodm9sdW1lKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XG4gIH1cblxuICBtdXRlKCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldFZvbHVtZSgwKTtcbiAgfVxuXG4gIHVubXV0ZSgpIHtcbiAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5zZXRWb2x1bWUoMTAwKTtcbiAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuaXNQbGF5aW5nKCk7XG4gIH1cblxuICBnZXRDb250YWluZXJQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5nZXRQbHVnaW4obmFtZSlcbiAgfVxuXG4gIGdldENvcmVQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiB0aGlzLmNvcmUuZ2V0UGx1Z2luKG5hbWUpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NlZWtfdGltZScpO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgndWlfb2JqZWN0JylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIGZvcm1hdFRpbWUgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykuZm9ybWF0VGltZVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNsYXNzIFNlZWtUaW1lIGV4dGVuZHMgVUlPYmplY3Qge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdzZWVrX3RpbWUnIH1cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBKU1Quc2Vla190aW1lO1xuICB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAnc2Vlay10aW1lIGhpZGRlbicsXG4gICAgICAnZGF0YS1zZWVrLXRpbWUnOiAnJ1xuICAgIH07XG4gIH1cbiAgY29uc3RydWN0b3IobWVkaWFDb250cm9sKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMubWVkaWFDb250cm9sID0gbWVkaWFDb250cm9sXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpXG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX01PVVNFTU9WRV9TRUVLQkFSLCB0aGlzLnNob3dUaW1lKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5tZWRpYUNvbnRyb2wsIEV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VMRUFWRV9TRUVLQkFSLCB0aGlzLmhpZGVUaW1lKVxuICB9XG5cbiAgc2hvd1RpbWUoZXZlbnQpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZXZlbnQucGFnZVggLSB0aGlzLm1lZGlhQ29udHJvbC4kc2Vla0JhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0XG4gICAgdmFyIHRpbWVQb3NpdGlvbiA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoKG9mZnNldCkgLyB0aGlzLm1lZGlhQ29udHJvbC4kc2Vla0JhckNvbnRhaW5lci53aWR0aCgpICogMTAwLCAwKSlcbiAgICB2YXIgcG9pbnRlclBvc2l0aW9uID0gZXZlbnQucGFnZVggLSB0aGlzLm1lZGlhQ29udHJvbC4kZWwub2Zmc2V0KCkubGVmdFxuICAgIHBvaW50ZXJQb3NpdGlvbiA9IE1hdGgubWluKE1hdGgubWF4KDAsIHBvaW50ZXJQb3NpdGlvbiksIHRoaXMubWVkaWFDb250cm9sLiRlbC53aWR0aCgpIC0gdGhpcy4kZWwud2lkdGgoKSlcbiAgICB2YXIgY3VycmVudFRpbWUgPSB0aW1lUG9zaXRpb24gKiB0aGlzLm1lZGlhQ29udHJvbC5jb250YWluZXIuZ2V0RHVyYXRpb24oKSAvIDEwMFxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgdGltZXN0YW1wOiBjdXJyZW50VGltZSxcbiAgICAgIGZvcm1hdHRlZFRpbWU6IGZvcm1hdFRpbWUoY3VycmVudFRpbWUpLFxuICAgICAgcG9pbnRlclBvc2l0aW9uOiBwb2ludGVyUG9zaXRpb25cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZShvcHRpb25zKVxuICB9XG5cbiAgaGlkZVRpbWUoKSB7XG4gICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gICAgdGhpcy4kZWwuY3NzKCdsZWZ0JywgJy0xMDAlJylcbiAgfVxuXG4gIHVwZGF0ZShvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMubWVkaWFDb250cm9sLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ3ZvZCcgfHwgdGhpcy5tZWRpYUNvbnRyb2wuY29udGFpbmVyLmlzRHZySW5Vc2UoKSkge1xuICAgICAgdGhpcy4kZWwuZmluZCgnW2RhdGEtc2Vlay10aW1lXScpLnRleHQob3B0aW9ucy5mb3JtYXR0ZWRUaW1lKVxuICAgICAgdGhpcy4kZWwuY3NzKCdsZWZ0Jywgb3B0aW9ucy5wb2ludGVyUG9zaXRpb24gLSAodGhpcy4kZWwud2lkdGgoKSAvIDIpKVxuICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSk7XG4gICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSk7XG4gICAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpO1xuICAgICAgdGhpcy5tZWRpYUNvbnRyb2wuJGVsLmFwcGVuZCh0aGlzLmVsKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlZWtUaW1lO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXliYWNrID0gcmVxdWlyZSgncGxheWJhY2snKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgTWVkaWF0b3IgPSByZXF1aXJlKCdtZWRpYXRvcicpXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCd0ZW1wbGF0ZScpXG52YXIgJCA9IHJlcXVpcmUoJ3plcHRvJylcbnZhciBCcm93c2VyID0gcmVxdWlyZSgnYnJvd3NlcicpXG52YXIgc2Vla1N0cmluZ1RvU2Vjb25kcyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdXRpbHMnKS5zZWVrU3RyaW5nVG9TZWNvbmRzXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcbnZhciBNb3VzZXRyYXAgPSByZXF1aXJlKCdtb3VzZXRyYXAnKVxuXG52YXIgb2JqZWN0SUUgPSAnPG9iamVjdCB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBpZD1cIjwlPSBjaWQgJT5cIiBjbGFzc2lkPVwiY2xzaWQ6ZDI3Y2RiNmUtYWU2ZC0xMWNmLTk2YjgtNDQ0NTUzNTQwMDAwXCIgZGF0YS1mbGFzaC12b2Q9XCJcIj48cGFyYW0gbmFtZT1cIm1vdmllXCIgdmFsdWU9XCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLnN3ZlwiPiA8cGFyYW0gbmFtZT1cInF1YWxpdHlcIiB2YWx1ZT1cImF1dG9oaWdoXCI+IDxwYXJhbSBuYW1lPVwic3dsaXZlY29ubmVjdFwiIHZhbHVlPVwidHJ1ZVwiPiA8cGFyYW0gbmFtZT1cImFsbG93U2NyaXB0QWNjZXNzXCIgdmFsdWU9XCJhbHdheXNcIj4gPHBhcmFtIG5hbWU9XCJiZ2NvbG9yXCIgdmFsdWU9XCIjMDAxMTIyXCI+IDxwYXJhbSBuYW1lPVwiYWxsb3dGdWxsU2NyZWVuXCIgdmFsdWU9XCJmYWxzZVwiPiA8cGFyYW0gbmFtZT1cIndtb2RlXCIgdmFsdWU9XCJncHVcIj4gPHBhcmFtIG5hbWU9XCJ0YWJpbmRleFwiIHZhbHVlPVwiMVwiPiA8cGFyYW0gbmFtZT1GbGFzaFZhcnMgdmFsdWU9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgLz4gPC9vYmplY3Q+J1xuXG5jbGFzcyBGbGFzaCBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnZmxhc2gnIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnb2JqZWN0JyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5mbGFzaCB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5zcmMgPSBvcHRpb25zLnNyY1xuICAgIHRoaXMuYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybFxuICAgIHRoaXMuYXV0b1BsYXkgPSBvcHRpb25zLmF1dG9QbGF5XG4gICAgdGhpcy5zZXR0aW5ncyA9IHtkZWZhdWx0OiBbJ3NlZWtiYXInXX1cbiAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSBbXCJwbGF5cGF1c2VcIiwgXCJwb3NpdGlvblwiLCBcImR1cmF0aW9uXCJdXG4gICAgdGhpcy5zZXR0aW5ncy5yaWdodCA9IFtcImZ1bGxzY3JlZW5cIiwgXCJ2b2x1bWVcIl1cbiAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gdHJ1ZVxuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlXG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKVxuICB9XG5cblxuICBib290c3RyYXAoKSB7XG4gICAgdGhpcy5lbC53aWR0aCA9IFwiMTAwJVwiXG4gICAgdGhpcy5lbC5oZWlnaHQgPSBcIjEwMCVcIlxuICAgIHRoaXMuaXNSZWFkeSA9IHRydWVcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgPT09ICdQTEFZSU5HJykge1xuICAgICAgdGhpcy5maXJzdFBsYXkoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiSURMRVwiXG4gICAgICB0aGlzLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpXG4gICAgfVxuICAgICQoJzxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJVwiIC8+JykuaW5zZXJ0QWZ0ZXIodGhpcy4kZWwpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiAndm9kJ1xuICB9XG5cbiAgc2V0dXBGaXJlZm94KCkge1xuICAgIHZhciAkZWwgPSB0aGlzLiQoJ2VtYmVkJylcbiAgICAkZWwuYXR0cignZGF0YS1mbGFzaCcsICcnKVxuICAgIHRoaXMuc2V0RWxlbWVudCgkZWxbMF0pXG4gIH1cblxuICBpc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB1cGRhdGVUaW1lKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy5lbC5nZXRQb3NpdGlvbigpLCB0aGlzLmVsLmdldER1cmF0aW9uKCksIHRoaXMubmFtZSlcbiAgfVxuXG4gIGFkZExpc3RlbmVycygpIHtcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpwcm9ncmVzcycsIHRoaXMucHJvZ3Jlc3MsIHRoaXMpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6dGltZXVwZGF0ZScsIHRoaXMudXBkYXRlVGltZSwgdGhpcylcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpzdGF0ZWNoYW5nZWQnLCB0aGlzLmNoZWNrU3RhdGUsIHRoaXMpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScsIHRoaXMuYm9vdHN0cmFwLCB0aGlzKVxuICAgIHZhciBzaG9ydGN1dHMgPSBbMSwyLDMsNCw1LDYsNyw4LDldXG4gICAgc2hvcnRjdXRzLmZvckVhY2goKGkpID0+IHsgTW91c2V0cmFwLmJpbmQoW2kudG9TdHJpbmcoKV0sICgpID0+IHRoaXMuc2VlayhpICogMTApKSB9KVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6cHJvZ3Jlc3MnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzp0aW1ldXBkYXRlJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6c3RhdGVjaGFuZ2VkJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScpXG4gICAgdmFyIHNob3J0Y3V0cyA9IFsxLDIsMyw0LDUsNiw3LDgsOV1cbiAgICBzaG9ydGN1dHMuZm9yRWFjaCgoaSkgPT4geyBNb3VzZXRyYXAudW5iaW5kKFtpLnRvU3RyaW5nKCldLCAoKSA9PiB0aGlzLnNlZWsoaSAqIDEwKSkgfSlcbiAgfVxuXG4gIGNoZWNrU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXRlID09PSBcIlBBVVNFRFwiKSB7XG4gICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFN0YXRlICE9PSBcIlBMQVlJTkdfQlVGRkVSSU5HXCIgJiYgdGhpcy5lbC5nZXRTdGF0ZSgpID09PSBcIlBMQVlJTkdfQlVGRkVSSU5HXCIpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSSU5HLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiUExBWUlOR19CVUZGRVJJTkdcIlxuICAgIH0gZWxzZSBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpID09PSBcIlBMQVlJTkdcIikge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiUExBWUlOR1wiXG4gICAgfSBlbHNlIGlmICh0aGlzLmVsLmdldFN0YXRlKCkgPT09IFwiSURMRVwiKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiSURMRVwiXG4gICAgfSBlbHNlIGlmICh0aGlzLmVsLmdldFN0YXRlKCkgPT09IFwiRU5ERURcIikge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19FTkRFRCwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCAwLCB0aGlzLmVsLmdldER1cmF0aW9uKCksIHRoaXMubmFtZSlcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJFTkRFRFwiXG4gICAgfVxuICB9XG5cbiAgcHJvZ3Jlc3MoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXRlICE9PSBcIklETEVcIiAmJiB0aGlzLmN1cnJlbnRTdGF0ZSAhPT0gXCJFTkRFRFwiKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BST0dSRVNTLCAwLCB0aGlzLmVsLmdldEJ5dGVzTG9hZGVkKCksIHRoaXMuZWwuZ2V0Qnl0ZXNUb3RhbCgpLCB0aGlzLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgZmlyc3RQbGF5KCkge1xuICAgIGlmICh0aGlzLmVsLnBsYXllclBsYXkpIHtcbiAgICAgIHRoaXMuZWwucGxheWVyUGxheSh0aGlzLnNyYylcbiAgICAgIHRoaXMubGlzdGVuVG9PbmNlKHRoaXMsIEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCAoKSA9PiB0aGlzLmNoZWNrSW5pdGlhbFNlZWsoKSlcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJQTEFZSU5HXCJcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5Ub09uY2UodGhpcywgRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLmZpcnN0UGxheSlcbiAgICB9XG4gIH1cblxuICBjaGVja0luaXRpYWxTZWVrKCkge1xuICAgIHZhciBzZWVrVGltZSA9IHNlZWtTdHJpbmdUb1NlY29uZHMod2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgaWYgKHNlZWtUaW1lICE9PSAwKSB7XG4gICAgICB0aGlzLnNlZWtTZWNvbmRzKHNlZWtUaW1lKVxuICAgIH1cbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgaWYgKHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gJ1BBVVNFRCcgfHwgdGhpcy5lbC5nZXRTdGF0ZSgpID09PSAnUExBWUlOR19CVUZGRVJJTkcnKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiUExBWUlOR1wiXG4gICAgICB0aGlzLmVsLnBsYXllclJlc3VtZSgpXG4gICAgfSBlbHNlIGlmICh0aGlzLmVsLmdldFN0YXRlKCkgIT09ICdQTEFZSU5HJykge1xuICAgICAgdGhpcy5maXJzdFBsYXkoKVxuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BMQVksIHRoaXMubmFtZSlcbiAgfVxuXG4gIHZvbHVtZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmlzUmVhZHkpIHtcbiAgICAgIHRoaXMuZWwucGxheWVyVm9sdW1lKHZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3RlblRvT25jZSh0aGlzLCBFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgKCkgPT4gdGhpcy52b2x1bWUodmFsdWUpKVxuICAgIH1cbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJQQVVTRURcIlxuICAgIHRoaXMuZWwucGxheWVyUGF1c2UoKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmVsLnBsYXllclN0b3AoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5uYW1lKVxuICB9XG5cbiAgaXNQbGF5aW5nKCkge1xuICAgIHJldHVybiAhISh0aGlzLmlzUmVhZHkgJiYgdGhpcy5jdXJyZW50U3RhdGUuaW5kZXhPZihcIlBMQVlJTkdcIikgPiAtMSlcbiAgfVxuXG4gIGdldER1cmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVsLmdldER1cmF0aW9uKClcbiAgfVxuXG4gIHNlZWsoc2Vla0JhclZhbHVlKSB7XG4gICAgdmFyIHNlZWtUbyA9IHRoaXMuZWwuZ2V0RHVyYXRpb24oKSAqIChzZWVrQmFyVmFsdWUgLyAxMDApXG4gICAgdGhpcy5zZWVrU2Vjb25kcyhzZWVrVG8pXG4gIH1cblxuICBzZWVrU2Vjb25kcyhzZWVrVG8pIHtcbiAgICB0aGlzLmVsLnBsYXllclNlZWsoc2Vla1RvKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgc2Vla1RvLCB0aGlzLmVsLmdldER1cmF0aW9uKCksIHRoaXMubmFtZSlcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgPT09IFwiUEFVU0VEXCIpIHtcbiAgICAgIHRoaXMuZWwucGxheWVyUGF1c2UoKVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmJvb3RzdHJhcElkKVxuICAgIHN1cGVyLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHRoaXMuJGVsLnJlbW92ZSgpXG4gIH1cblxuICBzZXR1cElFKCkge1xuICAgIHRoaXMuc2V0RWxlbWVudCgkKHRlbXBsYXRlKG9iamVjdElFKSh7IGNpZDogdGhpcy5jaWQsIGJhc2VVcmw6IHRoaXMuYmFzZVVybCwgcGxheWJhY2tJZDogdGhpcy51bmlxdWVJZCB9KSkpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSlcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoeyBjaWQ6IHRoaXMuY2lkLCBiYXNlVXJsOiB0aGlzLmJhc2VVcmwsIHBsYXliYWNrSWQ6IHRoaXMudW5pcXVlSWQgfSkpXG4gICAgaWYoQnJvd3Nlci5pc0ZpcmVmb3gpIHtcbiAgICAgIHRoaXMuc2V0dXBGaXJlZm94KClcbiAgICB9IGVsc2UgaWYoQnJvd3Nlci5pc0xlZ2FjeUlFKSB7XG4gICAgICB0aGlzLnNldHVwSUUoKVxuICAgIH1cbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5GbGFzaC5jYW5QbGF5ID0gZnVuY3Rpb24ocmVzb3VyY2UpIHtcbiAgaWYgKCFCcm93c2VyLmhhc0ZsYXNoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0gZWxzZSBpZiAoKCFCcm93c2VyLmlzTW9iaWxlICYmIEJyb3dzZXIuaXNGaXJlZm94KSB8fCBCcm93c2VyLmlzTGVnYWN5SUUpIHtcbiAgICByZXR1cm4gKHJlc291cmNlICYmIHJlc291cmNlLmNvbnN0cnVjdG9yID09PSBTdHJpbmcpICYmICEhcmVzb3VyY2UubWF0Y2goLyguKilcXC4obXA0fG1vdnxmNHZ8M2dwcHwzZ3ApLylcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKHJlc291cmNlICYmIHJlc291cmNlLmNvbnN0cnVjdG9yID09PSBTdHJpbmcpICYmICEhcmVzb3VyY2UubWF0Y2goLyguKilcXC4obW92fGY0dnwzZ3BwfDNncCkvKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5YmFjayA9IHJlcXVpcmUoJ3BsYXliYWNrJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCd0ZW1wbGF0ZScpXG5cbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJ21lZGlhdG9yJylcbnZhciBCcm93c2VyID0gcmVxdWlyZSgnYnJvd3NlcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgJCA9IHJlcXVpcmUoJ3plcHRvJylcblxudmFyIG9iamVjdElFID0gJzxvYmplY3QgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIgaWQ9XCI8JT0gY2lkICU+XCIgY2xhc3M9XCJobHMtcGxheWJhY2tcIiBjbGFzc2lkPVwiY2xzaWQ6ZDI3Y2RiNmUtYWU2ZC0xMWNmLTk2YjgtNDQ0NTUzNTQwMDAwXCIgZGF0YS1obHM9XCJcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PHBhcmFtIG5hbWU9XCJtb3ZpZVwiIHZhbHVlPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL0hMU1BsYXllci5zd2ZcIj4gPHBhcmFtIG5hbWU9XCJxdWFsaXR5XCIgdmFsdWU9XCJhdXRvaGlnaFwiPiA8cGFyYW0gbmFtZT1cInN3bGl2ZWNvbm5lY3RcIiB2YWx1ZT1cInRydWVcIj4gPHBhcmFtIG5hbWU9XCJhbGxvd1NjcmlwdEFjY2Vzc1wiIHZhbHVlPVwiYWx3YXlzXCI+IDxwYXJhbSBuYW1lPVwiYmdjb2xvclwiIHZhbHVlPVwiIzAwMTEyMlwiPiA8cGFyYW0gbmFtZT1cImFsbG93RnVsbFNjcmVlblwiIHZhbHVlPVwiZmFsc2VcIj4gPHBhcmFtIG5hbWU9XCJ3bW9kZVwiIHZhbHVlPVwidHJhbnNwYXJlbnRcIj4gPHBhcmFtIG5hbWU9XCJ0YWJpbmRleFwiIHZhbHVlPVwiMVwiPiA8cGFyYW0gbmFtZT1GbGFzaFZhcnMgdmFsdWU9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgLz4gPC9vYmplY3Q+J1xuXG5jbGFzcyBITFMgZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2hscycgfVxuICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdvYmplY3QnIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULmhscyB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAnaGxzLXBsYXliYWNrJyxcbiAgICAgICdkYXRhLWhscyc6ICcnLFxuICAgICAgJ3R5cGUnOiAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuICAgICAgJ3dpZHRoJzogJzEwMCUnLFxuICAgICAgJ2hlaWdodCc6ICcxMDAlJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc3JjID0gb3B0aW9ucy5zcmNcbiAgICB0aGlzLmJhc2VVcmwgPSBvcHRpb25zLmJhc2VVcmw7XG4gICAgdGhpcy5mbHVzaExpdmVVUkxDYWNoZSA9IChvcHRpb25zLmZsdXNoTGl2ZVVSTENhY2hlID09PSB1bmRlZmluZWQpPyB0cnVlOiBvcHRpb25zLmZsdXNoTGl2ZVVSTENhY2hlXG4gICAgdGhpcy5jYXBMZXZlbFRvU3RhZ2UgPSAob3B0aW9ucy5jYXBMZXZlbFRvU3RhZ2UgPT09IHVuZGVmaW5lZCk/IGZhbHNlOiBvcHRpb25zLmNhcExldmVsVG9TdGFnZVxuICAgIHRoaXMuaGlnaERlZmluaXRpb24gPSBmYWxzZVxuICAgIHRoaXMuYXV0b1BsYXkgPSBvcHRpb25zLmF1dG9QbGF5XG4gICAgdGhpcy5kZWZhdWx0U2V0dGluZ3MgPSB7XG4gICAgICBsZWZ0OiBbXCJwbGF5c3RvcFwiXSxcbiAgICAgIGRlZmF1bHQ6IFsnc2Vla2JhciddLFxuICAgICAgcmlnaHQ6IFtcImZ1bGxzY3JlZW5cIiwgXCJ2b2x1bWVcIiwgXCJoZC1pbmRpY2F0b3JcIl0sXG4gICAgICBzZWVrRW5hYmxlZDogZmFsc2VcbiAgICB9XG4gICAgdGhpcy5zZXR0aW5ncyA9IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0U2V0dGluZ3MpXG4gICAgdGhpcy5wbGF5YmFja1R5cGUgPSAnbGl2ZSdcbiAgICB0aGlzLmFkZExpc3RlbmVycygpXG4gIH1cblxuICBhZGRMaXN0ZW5lcnMoKSB7XG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScsICgpID0+IHRoaXMuYm9vdHN0cmFwKCkpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6dGltZXVwZGF0ZScsICgpID0+IHRoaXMudXBkYXRlVGltZSgpKVxuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOnBsYXliYWNrc3RhdGUnLCAoc3RhdGUpID0+IHRoaXMuc2V0UGxheWJhY2tTdGF0ZShzdGF0ZSkpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6bGV2ZWxjaGFuZ2VkJywgKGlzSEQpID0+IHRoaXMudXBkYXRlSGlnaERlZmluaXRpb24oaXNIRCkpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6cGxheWJhY2tlcnJvcicsICgpID0+IHRoaXMuZmxhc2hQbGF5YmFja0Vycm9yKCkpXG4gIH1cblxuICBzdG9wTGlzdGVuaW5nKCkge1xuICAgIHN1cGVyLnN0b3BMaXN0ZW5pbmcoKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpmbGFzaHJlYWR5JylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6dGltZXVwZGF0ZScpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOnBsYXliYWNrc3RhdGUnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpsZXZlbGNoYW5nZWQnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpwbGF5YmFja2Vycm9yJylcbiAgfVxuXG4gIGJvb3RzdHJhcCgpIHtcbiAgICB0aGlzLmVsLndpZHRoID0gXCIxMDAlXCJcbiAgICB0aGlzLmVsLmhlaWdodCA9IFwiMTAwJVwiXG4gICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZVxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJJRExFXCJcbiAgICB0aGlzLnNldEZsYXNoU2V0dGluZ3MoKVxuICAgIHRoaXMudXBkYXRlUGxheWJhY2tUeXBlKClcbiAgICB0aGlzLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgc2V0Rmxhc2hTZXR0aW5ncygpIHtcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyU2V0Zmx1c2hMaXZlVVJMQ2FjaGUodGhpcy5mbHVzaExpdmVVUkxDYWNoZSlcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyQ2FwTGV2ZWx0b1N0YWdlKHRoaXMuY2FwTGV2ZWxUb1N0YWdlKVxuICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJTZXRtYXhCdWZmZXJMZW5ndGgoMClcbiAgfVxuXG4gIHVwZGF0ZUhpZ2hEZWZpbml0aW9uKGlzSEQpIHtcbiAgICB0aGlzLmhpZ2hEZWZpbml0aW9uID0gKGlzSEQgPT09IFwiaGRcIik7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19ISUdIREVGSU5JVElPTlVQREFURSlcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JJVFJBVEUsIHsnYml0cmF0ZSc6IHRoaXMuZ2V0Q3VycmVudEJpdHJhdGUoKX0pXG4gIH1cblxuICB1cGRhdGVUaW1lKCkge1xuICAgIHZhciBkdXJhdGlvbiA9IHRoaXMuZ2V0RHVyYXRpb24oKVxuICAgIHZhciBwb3NpdGlvbiA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMuZWwuZ2xvYm9HZXRQb3NpdGlvbigpLCAwKSwgZHVyYXRpb24pXG4gICAgdmFyIHByZXZpb3VzRFZSU3RhdHVzID0gdGhpcy5kdnJFbmFibGVkXG4gICAgdmFyIGxpdmVQbGF5YmFjayA9ICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gJ2xpdmUnKVxuICAgIHRoaXMuZHZyRW5hYmxlZCA9IChsaXZlUGxheWJhY2sgJiYgZHVyYXRpb24gPiAyNDApXG5cbiAgICBpZiAoZHVyYXRpb24gPT09IDEwMCB8fCBsaXZlUGxheWJhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmR2ckVuYWJsZWQgIT09IHByZXZpb3VzRFZSU3RhdHVzKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNldHRpbmdzKClcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfU0VUVElOR1NVUERBVEUsIHRoaXMubmFtZSlcbiAgICB9XG5cbiAgICBpZiAobGl2ZVBsYXliYWNrICYmICghdGhpcy5kdnJFbmFibGVkIHx8ICF0aGlzLmR2ckluVXNlKSkge1xuICAgICAgcG9zaXRpb24gPSBkdXJhdGlvblxuICAgIH1cblxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgcG9zaXRpb24sIGR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gIH1cblxuICBwbGF5KCkge1xuICAgIGlmKHRoaXMuY3VycmVudFN0YXRlID09PSAnUEFVU0VEJykge1xuICAgICAgdGhpcy5lbC5nbG9ib1BsYXllclJlc3VtZSgpXG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSAhPT0gXCJQTEFZSU5HXCIpIHtcbiAgICAgIHRoaXMuZmlyc3RQbGF5KClcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZLCB0aGlzLm5hbWUpXG4gIH1cblxuICBnZXRQbGF5YmFja1R5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWJhY2tUeXBlPyB0aGlzLnBsYXliYWNrVHlwZTogbnVsbFxuICB9XG5cbiAgZ2V0Q3VycmVudEJpdHJhdGUoKSB7XG4gICAgdmFyIGN1cnJlbnRMZXZlbCA9IHRoaXMuZ2V0TGV2ZWxzKClbdGhpcy5lbC5nbG9ib0dldExldmVsKCldXG4gICAgcmV0dXJuIGN1cnJlbnRMZXZlbC5iaXRyYXRlXG4gIH1cblxuICBnZXRMYXN0UHJvZ3JhbURhdGUoKSB7XG4gICAgdmFyIHByb2dyYW1EYXRlID0gdGhpcy5lbC5nbG9ib0dldExhc3RQcm9ncmFtRGF0ZSgpXG4gICAgLy8gbm9ybWFsaXppbmcgZm9yIEJSVFxuICAgIHJldHVybiBwcm9ncmFtRGF0ZSAtIDEuMDhlKzdcbiAgfVxuXG4gIGlzSGlnaERlZmluaXRpb25JblVzZSgpIHtcbiAgICByZXR1cm4gdGhpcy5oaWdoRGVmaW5pdGlvblxuICB9XG5cbiAgZ2V0TGV2ZWxzKCkge1xuICAgIGlmICghdGhpcy5sZXZlbHMgfHwgdGhpcy5sZXZlbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmxldmVscyA9IHRoaXMuZWwuZ2xvYm9HZXRMZXZlbHMoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sZXZlbHNcbiAgfVxuXG4gIHNldFBsYXliYWNrU3RhdGUoc3RhdGUpIHtcbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gdGhpcy5lbC5nbG9ib0dldGJ1ZmZlckxlbmd0aCgpXG4gICAgaWYgKHN0YXRlID09PSBcIlBMQVlJTkdfQlVGRkVSSU5HXCIgJiYgYnVmZmVyTGVuZ3RoIDwgMSkgIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSSU5HLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRTdGF0ZShzdGF0ZSlcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcIlBMQVlJTkdcIikge1xuICAgICAgaWYgKFtcIlBMQVlJTkdfQlVGRkVSSU5HXCIsIFwiUEFVU0VEXCIsIFwiSURMRVwiXS5pbmRleE9mKHRoaXMuY3VycmVudFN0YXRlKSA+PSAwKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgdGhpcy5uYW1lKVxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRTdGF0ZShzdGF0ZSlcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcIlBBVVNFRFwiKSB7XG4gICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRTdGF0ZShzdGF0ZSlcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcIklETEVcIikge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19FTkRFRCwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCAwLCB0aGlzLmVsLmdsb2JvR2V0RHVyYXRpb24oKSwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUpXG4gICAgfVxuICAgIHRoaXMubGFzdEJ1ZmZlckxlbmd0aCA9IGJ1ZmZlckxlbmd0aFxuICB9XG5cbiAgdXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlKSB7XG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZVxuICAgIHRoaXMudXBkYXRlUGxheWJhY2tUeXBlKClcbiAgfVxuXG4gIHVwZGF0ZVBsYXliYWNrVHlwZSgpIHtcbiAgICB0aGlzLnBsYXliYWNrVHlwZSA9IHRoaXMuZWwuZ2xvYm9HZXRUeXBlKClcbiAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUpIHtcbiAgICAgIHRoaXMucGxheWJhY2tUeXBlID0gdGhpcy5wbGF5YmFja1R5cGUudG9Mb3dlckNhc2UoKVxuICAgICAgaWYgKHRoaXMucGxheWJhY2tUeXBlID09PSAndm9kJykge1xuICAgICAgICB0aGlzLnN0YXJ0UmVwb3J0aW5nUHJvZ3Jlc3MoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdG9wUmVwb3J0aW5nUHJvZ3Jlc3MoKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BMQVlCQUNLU1RBVEUpXG4gIH1cblxuICBzdGFydFJlcG9ydGluZ1Byb2dyZXNzKCkge1xuICAgIGlmICghdGhpcy5yZXBvcnRpbmdQcm9ncmVzcykge1xuICAgICAgdGhpcy5yZXBvcnRpbmdQcm9ncmVzcyA9IHRydWVcbiAgICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOmZyYWdtZW50bG9hZGVkJywoKSA9PiB0aGlzLm9uRnJhZ21lbnRMb2FkZWQoKSlcbiAgICB9XG4gIH1cblxuICBzdG9wUmVwb3J0aW5nUHJvZ3Jlc3MoKSB7XG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOmZyYWdtZW50bG9hZGVkJywgdGhpcy5vbkZyYWdtZW50TG9hZGVkLCB0aGlzKVxuICB9XG5cbiAgb25GcmFnbWVudExvYWRlZCgpIHtcbiAgICB2YXIgYnVmZmVyZWQgPSB0aGlzLmVsLmdsb2JvR2V0UG9zaXRpb24oKSArIHRoaXMuZWwuZ2xvYm9HZXRidWZmZXJMZW5ndGgoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUFJPR1JFU1MsIHRoaXMuZWwuZ2xvYm9HZXRQb3NpdGlvbigpLCBidWZmZXJlZCwgdGhpcy5nZXREdXJhdGlvbigpLCB0aGlzLm5hbWUpXG4gIH1cblxuICBmaXJzdFBsYXkoKSB7XG4gICAgdGhpcy5zZXRGbGFzaFNldHRpbmdzKCkgLy9lbnN1cmUgZmx1c2hMaXZlVVJMQ2FjaGUgd2lsbCB3b3JrICgjMzI3KVxuICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJMb2FkKHRoaXMuc3JjKVxuICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJQbGF5KClcbiAgfVxuXG4gIHZvbHVtZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmlzUmVhZHkpIHtcbiAgICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJWb2x1bWUodmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdGVuVG9PbmNlKHRoaXMsIEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCAoKSA9PiB0aGlzLnZvbHVtZSh2YWx1ZSkpXG4gICAgfVxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgaWYgKHRoaXMucGxheWJhY2tUeXBlICE9PSAnbGl2ZScgfHwgdGhpcy5kdnJFbmFibGVkKSB7XG4gICAgICB0aGlzLmVsLmdsb2JvUGxheWVyUGF1c2UoKVxuICAgICAgaWYgKHRoaXMucGxheWJhY2tUeXBlID09PSAnbGl2ZScgJiYgdGhpcy5kdnJFbmFibGVkKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRHZyKHRydWUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyU3RvcCgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCAwLCB0aGlzLm5hbWUpXG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXRlKSB7XG4gICAgICByZXR1cm4gISEodGhpcy5jdXJyZW50U3RhdGUubWF0Y2goL3BsYXlpbmcvaSkpXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgdmFyIGR1cmF0aW9uID0gdGhpcy5lbC5nbG9ib0dldER1cmF0aW9uKClcbiAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUgPT09ICdsaXZlJykge1xuICAgICAgLy8gZXN0aW1hdGUgMTAgc2Vjb25kcyBvZiBidWZmZXIgdGltZSBmb3IgbGl2ZSBzdHJlYW1zIGZvciBzZWVrIHBvc2l0aW9uc1xuICAgICAgZHVyYXRpb24gPSBkdXJhdGlvbiAtIDEwXG4gICAgfVxuICAgIHJldHVybiBkdXJhdGlvblxuICB9XG5cbiAgc2Vlayh0aW1lKSB7XG4gICAgdmFyIGR1cmF0aW9uID0gdGhpcy5nZXREdXJhdGlvbigpXG4gICAgaWYgKHRpbWUgPiAwKSB7XG4gICAgICB0aW1lID0gZHVyYXRpb24gKiB0aW1lIC8gMTAwXG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGxheWJhY2tUeXBlID09PSAnbGl2ZScpIHtcbiAgICAgIC8vIHNlZWsgb3BlcmF0aW9ucyB0byBhIHRpbWUgd2l0aGluIDUgc2Vjb25kcyBmcm9tIGxpdmUgc3RyZWFtIHdpbGwgcG9zaXRpb24gcGxheWhlYWQgYmFjayB0byBsaXZlXG4gICAgICB2YXIgZHZySW5Vc2UgPSAodGltZSA+PSAwICYmIGR1cmF0aW9uIC0gdGltZSA+IDUpXG4gICAgICBpZiAoIWR2ckluVXNlKSB7XG4gICAgICAgIHRpbWUgPSAtMVxuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVEdnIoZHZySW5Vc2UpXG4gICAgfVxuICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJTZWVrKHRpbWUpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aW1lLCBkdXJhdGlvbiwgdGhpcy5uYW1lKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfSElHSERFRklOSVRJT05VUERBVEUpXG4gIH1cblxuICB1cGRhdGVEdnIoZHZySW5Vc2UpIHtcbiAgICB2YXIgcHJldmlvdXNEdnJJblVzZSA9ICEhdGhpcy5kdnJJblVzZVxuICAgIHRoaXMuZHZySW5Vc2UgPSBkdnJJblVzZVxuICAgIGlmICh0aGlzLmR2ckluVXNlICE9PSBwcmV2aW91c0R2ckluVXNlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNldHRpbmdzKClcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfRFZSLCB0aGlzLmR2ckluVXNlKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19TVEFUU19BREQsIHsnZHZyJzogdGhpcy5kdnJJblVzZX0pXG4gICAgfVxuICB9XG5cbiAgZmxhc2hQbGF5YmFja0Vycm9yKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfU1RPUClcbiAgfVxuXG4gIHRpbWVVcGRhdGUodGltZSwgZHVyYXRpb24pIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRpbWUsIGR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZygpXG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxuXG4gIHNldHVwRmlyZWZveCgpIHtcbiAgICB2YXIgJGVsID0gdGhpcy4kKCdlbWJlZCcpXG4gICAgJGVsLmF0dHIoJ2RhdGEtaGxzJywgJycpXG4gICAgdGhpcy5zZXRFbGVtZW50KCRlbClcbiAgfVxuXG4gIHNldHVwSUUoKSB7XG4gICAgdGhpcy5zZXRFbGVtZW50KCQodGVtcGxhdGUob2JqZWN0SUUpKHtjaWQ6IHRoaXMuY2lkLCBiYXNlVXJsOiB0aGlzLmJhc2VVcmwsIHBsYXliYWNrSWQ6IHRoaXMudW5pcXVlSWR9KSkpXG4gIH1cblxuICB1cGRhdGVTZXR0aW5ncygpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRTZXR0aW5ncylcbiAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUgPT09IFwidm9kXCIgfHwgdGhpcy5kdnJJblVzZSkge1xuICAgICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gW1wicGxheXBhdXNlXCIsIFwicG9zaXRpb25cIiwgXCJkdXJhdGlvblwiXVxuICAgICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IHRydWVcbiAgICB9IGVsc2UgaWYgKHRoaXMuZHZyRW5hYmxlZCkge1xuICAgICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gW1wicGxheXBhdXNlXCJdXG4gICAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gZmFsc2VcbiAgICB9XG4gIH1cblxuICBzZXRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICB0aGlzLiRlbCA9IGVsZW1lbnRcbiAgICB0aGlzLmVsID0gZWxlbWVudFswXVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpXG4gICAgaWYoQnJvd3Nlci5pc0xlZ2FjeUlFKSB7XG4gICAgICB0aGlzLnNldHVwSUUoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoe2NpZDogdGhpcy5jaWQsIGJhc2VVcmw6IHRoaXMuYmFzZVVybCwgcGxheWJhY2tJZDogdGhpcy51bmlxdWVJZH0pKVxuICAgICAgaWYoQnJvd3Nlci5pc0ZpcmVmb3gpIHtcbiAgICAgICAgdGhpcy5zZXR1cEZpcmVmb3goKVxuICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzSUUpIHtcbiAgICAgICAgdGhpcy4kKCdlbWJlZCcpLnJlbW92ZSgpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZWwuaWQgPSB0aGlzLmNpZFxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbkhMUy5jYW5QbGF5ID0gZnVuY3Rpb24ocmVzb3VyY2UpIHtcbiAgcmV0dXJuICEhKHJlc291cmNlLm1hdGNoKC9eaHR0cCguKikubTN1OD8vKSAmJiBCcm93c2VyLmhhc0ZsYXNoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhMU1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXliYWNrID0gcmVxdWlyZSgncGxheWJhY2snKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJylcblxuY2xhc3MgSFRNTDVBdWRpbyBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnaHRtbDVfYXVkaW8nIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnYXVkaW8nIH1cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ3RpbWV1cGRhdGUnOiAndGltZVVwZGF0ZWQnLFxuICAgICAgJ2VuZGVkJzogJ2VuZGVkJyxcbiAgICAgICdjYW5wbGF5dGhyb3VnaCc6ICdidWZmZXJGdWxsJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHN1cGVyKHBhcmFtcylcbiAgICB0aGlzLmVsLnNyYyA9IHBhcmFtcy5zcmNcbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgbGVmdDogWydwbGF5cGF1c2UnLCAncG9zaXRpb24nLCAnZHVyYXRpb24nXSxcbiAgICAgIHJpZ2h0OiBbJ2Z1bGxzY3JlZW4nLCAndm9sdW1lJ10sXG4gICAgICBkZWZhdWx0OiBbJ3NlZWtiYXInXVxuICAgIH1cbiAgICB0aGlzLnJlbmRlcigpXG4gICAgcGFyYW1zLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWSwgdGhpcy5wbGF5KVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUEFVU0UsIHRoaXMucGF1c2UpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TRUVLLCB0aGlzLnNlZWspXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9WT0xVTUUsIHRoaXMudm9sdW1lKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5zdG9wKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiBcImFvZFwiXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuZWwucGxheSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuZWwucGF1c2UoKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnBhdXNlKClcbiAgICB0aGlzLmVsLmN1cnJlbnRUaW1lID0gMFxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSB2YWx1ZSAvIDEwMFxuICB9XG5cbiAgbXV0ZSgpIHtcbiAgICB0aGlzLmVsLnZvbHVtZSA9IDBcbiAgfVxuXG4gIHVubXV0ZSgpIHtcbiAgICB0aGlzLmVsLnZvbHVtZSA9IDFcbiAgfVxuXG4gIGlzTXV0ZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5lbC52b2x1bWVcbiAgfVxuXG4gIGVuZGVkKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1RJTUVVUERBVEUsIDApXG4gIH1cblxuICBzZWVrKHNlZWtCYXJWYWx1ZSkge1xuICAgIHZhciB0aW1lID0gdGhpcy5lbC5kdXJhdGlvbiAqIChzZWVrQmFyVmFsdWUgLyAxMDApXG4gICAgdGhpcy5lbC5jdXJyZW50VGltZSA9IHRpbWVcbiAgfVxuXG4gIGdldEN1cnJlbnRUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLmVsLmN1cnJlbnRUaW1lXG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5kdXJhdGlvblxuICB9XG5cbiAgaXNQbGF5aW5nKCkge1xuICAgIHJldHVybiAhdGhpcy5lbC5wYXVzZWQgJiYgIXRoaXMuZWwuZW5kZWRcbiAgfVxuXG4gIHRpbWVVcGRhdGVkKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy5lbC5jdXJyZW50VGltZSwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgYnVmZmVyRnVsbCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRoaXMuZWwuY3VycmVudFRpbWUsIHRoaXMuZWwuZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbiB9XG5cbkhUTUw1QXVkaW8uY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlKSB7XG4gIHZhciBtaW1ldHlwZXMgPSB7XG4gICAgJ3dhdic6IFsnYXVkaW8vd2F2J10sXG4gICAgJ21wMyc6IFsnYXVkaW8vbXAzJywgJ2F1ZGlvL21wZWc7Y29kZWNzPVwibXAzXCInXSxcbiAgICAnYWFjJzogWydhdWRpby9tcDQ7Y29kZWNzPVwibXA0YS40MC41XCInXSxcbiAgICAnb2dhJzogWydhdWRpby9vZ2cnXVxuICB9XG4gIHZhciByZXNvdXJjZVBhcnRzID0gcmVzb3VyY2Uuc3BsaXQoJz8nKVswXS5tYXRjaCgvLipcXC4oLiopJC8pIHx8IFtdXG4gIGlmICgocmVzb3VyY2VQYXJ0cy5sZW5ndGggPiAxKSAmJiAobWltZXR5cGVzW3Jlc291cmNlUGFydHNbMV1dICE9PSB1bmRlZmluZWQpKSB7XG4gICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpXG4gICAgcmV0dXJuICEhZmluZChtaW1ldHlwZXNbcmVzb3VyY2VQYXJ0c1sxXV0sIChleHQpID0+IHsgcmV0dXJuICEhYS5jYW5QbGF5VHlwZShleHQpLnJlcGxhY2UoL25vLywgJycpIH0pXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBIVE1MNUF1ZGlvXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWJhY2sgPSByZXF1aXJlKCdwbGF5YmFjaycpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBCcm93c2VyID0gcmVxdWlyZSgnYnJvd3NlcicpXG52YXIgc2Vla1N0cmluZ1RvU2Vjb25kcyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdXRpbHMnKS5zZWVrU3RyaW5nVG9TZWNvbmRzXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcbnZhciBmaW5kID0gcmVxdWlyZSgnbG9kYXNoLmZpbmQnKVxuXG5yZXF1aXJlKCdtb3VzZXRyYXAnKVxuXG5jbGFzcyBIVE1MNVZpZGVvIGV4dGVuZHMgUGxheWJhY2sge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdodG1sNV92aWRlbycgfVxuICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICd2aWRlbycgfVxuICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBKU1QuaHRtbDVfdmlkZW8gfVxuXG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZGF0YS1odG1sNS12aWRlbyc6ICcnXG4gICAgfVxuICB9XG5cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ3RpbWV1cGRhdGUnOiAndGltZVVwZGF0ZWQnLFxuICAgICAgJ3Byb2dyZXNzJzogJ3Byb2dyZXNzJyxcbiAgICAgICdlbmRlZCc6ICdlbmRlZCcsXG4gICAgICAnc3RhbGxlZCc6ICdzdGFsbGVkJyxcbiAgICAgICd3YWl0aW5nJzogJ3dhaXRpbmcnLFxuICAgICAgJ2NhbnBsYXl0aHJvdWdoJzogJ2J1ZmZlckZ1bGwnLFxuICAgICAgJ2xvYWRlZG1ldGFkYXRhJzogJ2xvYWRlZE1ldGFkYXRhJyxcbiAgICAgICdjYW5wbGF5JzogJ3JlYWR5JyxcbiAgICAgICdkdXJhdGlvbmNoYW5nZSc6ICdkdXJhdGlvbkNoYW5nZSdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5zcmMgPSBvcHRpb25zLnNyY1xuICAgIHRoaXMuZWwuc3JjID0gb3B0aW9ucy5zcmNcbiAgICB0aGlzLmVsLmxvb3AgPSBvcHRpb25zLmxvb3BcbiAgICB0aGlzLmZpcnN0QnVmZmVyID0gdHJ1ZVxuICAgIHRoaXMuaXNITFMgPSAodGhpcy5zcmMuaW5kZXhPZignbTN1OCcpID4gLTEpXG4gICAgdGhpcy5zZXR0aW5ncyA9IHtkZWZhdWx0OiBbJ3NlZWtiYXInXX1cbiAgICBpZiAoQnJvd3Nlci5pc1NhZmFyaSkge1xuICAgICAgdGhpcy5zZXR1cFNhZmFyaSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwucHJlbG9hZCA9IG9wdGlvbnMucHJlbG9hZCA/IG9wdGlvbnMucHJlbG9hZDogJ21ldGFkYXRhJ1xuICAgICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IHRydWVcbiAgICB9XG4gICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gdGhpcy5pc0hMUyA/IFtcInBsYXlzdG9wXCJdIDogW1wicGxheXBhdXNlXCIsIFwicG9zaXRpb25cIiwgXCJkdXJhdGlvblwiXVxuICAgIHRoaXMuc2V0dGluZ3MucmlnaHQgPSBbXCJmdWxsc2NyZWVuXCIsIFwidm9sdW1lXCJdXG4gICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgfVxuXG4gIHNldHVwU2FmYXJpKCkge1xuICAgIHRoaXMuZWwucHJlbG9hZCA9ICdhdXRvJ1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICBbMSwyLDMsNCw1LDYsNyw4LDldLmZvckVhY2goKGkpID0+IHsgTW91c2V0cmFwLmJpbmQoW2kudG9TdHJpbmcoKV0sICgpID0+IHRoaXMuc2VlayhpICogMTApKSB9KVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICBbMSwyLDMsNCw1LDYsNyw4LDldLmZvckVhY2goKGkpID0+IHsgTW91c2V0cmFwLnVuYmluZChbaS50b1N0cmluZygpXSwgKCkgPT4gdGhpcy5zZWVrKGkgKiAxMCkpIH0pXG4gIH1cblxuICBsb2FkZWRNZXRhZGF0YShlKSB7XG4gICAgdGhpcy5kdXJhdGlvbkNoYW5nZSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19MT0FERURNRVRBREFUQSwgZS50YXJnZXQuZHVyYXRpb24pXG4gICAgdGhpcy5jaGVja0luaXRpYWxTZWVrKClcbiAgfVxuXG4gIGR1cmF0aW9uQ2hhbmdlKCkge1xuICAgIC8vIHdlIGNhbid0IGZpZ3VyZSBvdXQgaWYgaGxzIHJlc291cmNlIGlzIFZvRCBvciBub3QgdW50aWwgaXQgaXMgYmVpbmcgbG9hZGVkIG9yIGR1cmF0aW9uIGhhcyBjaGFuZ2VkLlxuICAgIC8vIHRoYXQncyB3aHkgd2UgY2hlY2sgaXQgYWdhaW4gYW5kIHVwZGF0ZSBtZWRpYSBjb250cm9sIGFjY29yZGluZ2x5LlxuICAgIGlmICh0aGlzLmdldFBsYXliYWNrVHlwZSgpID09PSAndm9kJykge1xuICAgICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gW1wicGxheXBhdXNlXCIsIFwicG9zaXRpb25cIiwgXCJkdXJhdGlvblwiXVxuICAgICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IHRydWVcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19TRVRUSU5HU1VQREFURSlcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0hMUyAmJiBbMCwgdW5kZWZpbmVkLCBJbmZpbml0eV0uaW5kZXhPZih0aGlzLmVsLmR1cmF0aW9uKSA+PSAwID8gJ2xpdmUnIDogJ3ZvZCdcbiAgfVxuXG4gIGlzSGlnaERlZmluaXRpb25JblVzZSgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5lbC5wbGF5KClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BMQVkpO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5lbC5wYXVzZSgpXG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMucGF1c2UoKVxuICAgIGlmICh0aGlzLmVsLnJlYWR5U3RhdGUgIT09IDApIHtcbiAgICAgIHRoaXMuZWwuY3VycmVudFRpbWUgPSAwXG4gICAgfVxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSB2YWx1ZSAvIDEwMFxuICB9XG5cbiAgbXV0ZSgpIHtcbiAgICB0aGlzLmVsLnZvbHVtZSA9IDBcbiAgfVxuXG4gIHVubXV0ZSgpIHtcbiAgICB0aGlzLmVsLnZvbHVtZSA9IDFcbiAgfVxuXG4gIGlzTXV0ZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5lbC52b2x1bWVcbiAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gIXRoaXMuZWwucGF1c2VkICYmICF0aGlzLmVsLmVuZGVkXG4gIH1cblxuICBlbmRlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0VOREVELCB0aGlzLm5hbWUpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCAwLCB0aGlzLmVsLmR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gIH1cblxuICBzdGFsbGVkKCkge1xuICAgIGlmICh0aGlzLmdldFBsYXliYWNrVHlwZSgpID09PSAndm9kJyAmJiB0aGlzLmVsLnJlYWR5U3RhdGUgPCB0aGlzLmVsLkhBVkVfRlVUVVJFX0RBVEEpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSSU5HLCB0aGlzLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgd2FpdGluZygpIHtcbiAgICBpZih0aGlzLmVsLnJlYWR5U3RhdGUgPCB0aGlzLmVsLkhBVkVfRlVUVVJFX0RBVEEpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSSU5HLCB0aGlzLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgYnVmZmVyRnVsbCgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnBvc3RlciAmJiB0aGlzLmZpcnN0QnVmZmVyKSB7XG4gICAgICB0aGlzLmZpcnN0QnVmZmVyID0gZmFsc2VcbiAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcoKSkge1xuICAgICAgICB0aGlzLmVsLnBvc3RlciA9IHRoaXMub3B0aW9ucy5wb3N0ZXJcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5wb3N0ZXIgPSAnJ1xuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsIHRoaXMubmFtZSlcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLnN0b3AoKVxuICAgIHRoaXMuZWwuc3JjID0gJydcbiAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICB9XG5cbiAgc2VlayhzZWVrQmFyVmFsdWUpIHtcbiAgICB2YXIgdGltZSA9IHRoaXMuZWwuZHVyYXRpb24gKiAoc2Vla0JhclZhbHVlIC8gMTAwKVxuICAgIHRoaXMuc2Vla1NlY29uZHModGltZSlcbiAgfVxuXG4gIHNlZWtTZWNvbmRzKHRpbWUpIHtcbiAgICB0aGlzLmVsLmN1cnJlbnRUaW1lID0gdGltZVxuICB9XG5cbiAgY2hlY2tJbml0aWFsU2VlaygpIHtcbiAgICB2YXIgc2Vla1RpbWUgPSBzZWVrU3RyaW5nVG9TZWNvbmRzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgIHRoaXMuc2Vla1NlY29uZHMoc2Vla1RpbWUpXG4gIH1cblxuICBnZXRDdXJyZW50VGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5jdXJyZW50VGltZVxuICB9XG5cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwuZHVyYXRpb25cbiAgfVxuXG4gIHRpbWVVcGRhdGVkKCkge1xuICAgIGlmICh0aGlzLmdldFBsYXliYWNrVHlwZSgpID09PSAnbGl2ZScpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMSwgMSwgdGhpcy5uYW1lKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRoaXMuZWwuY3VycmVudFRpbWUsIHRoaXMuZWwuZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgICB9XG4gIH1cblxuICBwcm9ncmVzcygpIHtcbiAgICBpZiAoIXRoaXMuZWwuYnVmZmVyZWQubGVuZ3RoKSByZXR1cm5cbiAgICB2YXIgYnVmZmVyZWRQb3MgPSAwXG4gICAgZm9yICh2YXIgaSA9IDA7ICBpIDwgdGhpcy5lbC5idWZmZXJlZC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZWwuY3VycmVudFRpbWUgPj0gdGhpcy5lbC5idWZmZXJlZC5zdGFydChpKSAmJiB0aGlzLmVsLmN1cnJlbnRUaW1lIDw9IHRoaXMuZWwuYnVmZmVyZWQuZW5kKGkpKSB7XG4gICAgICAgIGJ1ZmZlcmVkUG9zID0gaVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BST0dSRVNTLCB0aGlzLmVsLmJ1ZmZlcmVkLnN0YXJ0KGJ1ZmZlcmVkUG9zKSwgdGhpcy5lbC5idWZmZXJlZC5lbmQoYnVmZmVyZWRQb3MpLCB0aGlzLmVsLmR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gIH1cblxuICB0eXBlRm9yKHNyYykge1xuICAgIHJldHVybiAoc3JjLmluZGV4T2YoJy5tM3U4JykgPiAwKSA/ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcgOiAndmlkZW8vbXA0J1xuICB9XG5cbiAgcmVhZHkoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpXG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHsgc3JjOiB0aGlzLnNyYywgdHlwZTogdGhpcy50eXBlRm9yKHRoaXMuc3JjKSB9KSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9wdGlvbnMuYXV0b1BsYXkgJiYgdGhpcy5wbGF5KCksIDApO1xuICAgIGlmICh0aGlzLmVsLnJlYWR5U3RhdGUgPT09IHRoaXMuZWwuSEFWRV9FTk9VR0hfREFUQSkge1xuICAgICAgdGhpcy5yZWFkeSgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuSFRNTDVWaWRlby5jYW5QbGF5ID0gZnVuY3Rpb24ocmVzb3VyY2UpIHtcbiAgdmFyIG1pbWV0eXBlcyA9IHtcbiAgICAnbXA0JzogW1wiYXZjMS40MkUwMUVcIiwgXCJhdmMxLjU4QTAxRVwiLCBcImF2YzEuNEQ0MDFFXCIsIFwiYXZjMS42NDAwMUVcIiwgXCJtcDR2LjIwLjhcIiwgXCJtcDR2LjIwLjI0MFwiLCBcIm1wNGEuNDAuMlwiXS5tYXAoXG4gICAgICAoY29kZWMpID0+IHsgcmV0dXJuICd2aWRlby9tcDQ7IGNvZGVjcz1cIicgKyBjb2RlYyArICcsIG1wNGEuNDAuMlwiJ30pLFxuICAgICdvZ2cnOiBbJ3ZpZGVvL29nZzsgY29kZWNzPVwidGhlb3JhLCB2b3JiaXNcIicsICd2aWRlby9vZ2c7IGNvZGVjcz1cImRpcmFjXCInLCAndmlkZW8vb2dnOyBjb2RlY3M9XCJ0aGVvcmEsIHNwZWV4XCInXSxcbiAgICAnM2dwcCc6IFsndmlkZW8vM2dwcDsgY29kZWNzPVwibXA0di4yMC44LCBzYW1yXCInXSxcbiAgICAnd2VibSc6IFsndmlkZW8vd2VibTsgY29kZWNzPVwidnA4LCB2b3JiaXNcIiddLFxuICAgICdta3YnOiBbJ3ZpZGVvL3gtbWF0cm9za2E7IGNvZGVjcz1cInRoZW9yYSwgdm9yYmlzXCInXSxcbiAgICAnbTN1OCc6IFsnYXBwbGljYXRpb24veC1tcGVnVVJMJ11cbiAgfVxuICBtaW1ldHlwZXNbJ29ndiddID0gbWltZXR5cGVzWydvZ2cnXVxuICBtaW1ldHlwZXNbJzNncCddID0gbWltZXR5cGVzWyczZ3BwJ11cblxuICB2YXIgcmVzb3VyY2VQYXJ0cyA9IHJlc291cmNlLnNwbGl0KCc/JylbMF0ubWF0Y2goLy4qXFwuKC4qKSQvKSB8fCBbXVxuICBpZiAoKHJlc291cmNlUGFydHMubGVuZ3RoID4gMSkgJiYgKG1pbWV0eXBlc1tyZXNvdXJjZVBhcnRzWzFdXSAhPT0gdW5kZWZpbmVkKSkge1xuICAgIHZhciB2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgIHJldHVybiAhIWZpbmQobWltZXR5cGVzW3Jlc291cmNlUGFydHNbMV1dLCAoZXh0KSA9PiB7IHJldHVybiAhIXYuY2FuUGxheVR5cGUoZXh0KS5yZXBsYWNlKC9uby8sICcnKSB9KVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhUTUw1VmlkZW9cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5YmFjayA9IHJlcXVpcmUoJ3BsYXliYWNrJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG5cbmNsYXNzIEhUTUxJbWcgZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2h0bWxfaW1nJyB9XG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ2ltZycgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2RhdGEtaHRtbC1pbWcnOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgc3VwZXIocGFyYW1zKVxuICAgIHRoaXMuZWwuc3JjID0gcGFyYW1zLnNyY1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbiB9XG5cbkhUTUxJbWcuY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlKSB7XG4gIHJldHVybiAhIXJlc291cmNlLm1hdGNoKC8oLiopLihwbmd8anBnfGpwZWd8Z2lmfGJtcCkvKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhUTUxJbWdcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9ub19vcCcpO1xuIiwidmFyIFBsYXliYWNrID0gcmVxdWlyZSgncGxheWJhY2snKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcblxuY2xhc3MgTm9PcCBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnbm9fb3AnIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULm5vX29wIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHsnZGF0YS1uby1vcCc6ICcnfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpO1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSk7XG4gICAgdGhpcy5hbmltYXRlKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLm5hbWUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIG5vaXNlKCkge1xuICAgIHZhciBpZGF0YSA9IHRoaXMuY29udGV4dC5jcmVhdGVJbWFnZURhdGEodGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCwgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQpXG4gICAgdmFyIGJ1ZmZlcjMyID0gbmV3IFVpbnQzMkFycmF5KGlkYXRhLmRhdGEuYnVmZmVyKVxuICAgIHZhciBsZW4gPSBidWZmZXIzMi5sZW5ndGhcbiAgICB2YXIgcnVuID0gMFxuICAgIHZhciBjb2xvciA9IDBcbiAgICB2YXIgbSA9IE1hdGgucmFuZG9tKCkgKiA2ICsgNFxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47KSB7XG4gICAgICBpZiAocnVuIDwgMCkge1xuICAgICAgICBydW4gPSBtICogTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdmFyIHAgPSBNYXRoLnBvdyhNYXRoLnJhbmRvbSgpLCAwLjQpO1xuICAgICAgICBjb2xvciA9ICgyNTUgKiBwKSA8PCAyNDtcbiAgICAgIH1cbiAgICAgIHJ1biAtPSAxO1xuICAgICAgYnVmZmVyMzJbaSsrXSA9IGNvbG9yO1xuICAgIH1cbiAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKGlkYXRhLCAwLCAwKTtcbiAgfVxuXG4gIGxvb3AoKSB7XG4gICAgdGhpcy5ub2lzZSgpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMubG9vcCgpKVxuICB9XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICB0aGlzLmNhbnZhcyA9IHRoaXMuJGVsLmZpbmQoJ2NhbnZhc1tkYXRhLW5vLW9wLWNhbnZhc10nKVswXVxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLmxvb3AoKVxuICB9XG59XG5cbk5vT3AuY2FuUGxheSA9IChzb3VyY2UpID0+IHtcbiAgcmV0dXJuIHRydWVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb09wXG4iLCIvL0NvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCdjb250YWluZXJfcGx1Z2luJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jbGFzcyBDbGlja1RvUGF1c2VQbHVnaW4gZXh0ZW5kcyBDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdjbGlja190b19wYXVzZScgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgc3VwZXIob3B0aW9ucylcbiAgICB9XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfQ0xJQ0ssIHRoaXMuY2xpY2spXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TRVRUSU5HU1VQREFURSwgdGhpcy5zZXR0aW5nc1VwZGF0ZSlcbiAgfVxuXG4gIGNsaWNrKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSAhPT0gJ2xpdmUnIHx8IHRoaXMuY29udGFpbmVyLmlzRHZyRW5hYmxlZCgpKSB7XG4gICAgICBpZiAodGhpcy5jb250YWluZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIucGF1c2UoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIucGxheSgpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0dGluZ3NVcGRhdGUoKSB7XG4gICAgdGhpcy5jb250YWluZXIuJGVsLnJlbW92ZUNsYXNzKCdwb2ludGVyLWVuYWJsZWQnKVxuICAgIGlmICh0aGlzLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSAhPT0gJ2xpdmUnIHx8IHRoaXMuY29udGFpbmVyLmlzRHZyRW5hYmxlZCgpKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci4kZWwuYWRkQ2xhc3MoJ3BvaW50ZXItZW5hYmxlZCcpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2xpY2tUb1BhdXNlUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2xpY2tfdG9fcGF1c2UnKVxuIiwidmFyIFVJQ29yZVBsdWdpbiA9IHJlcXVpcmUoJ3VpX2NvcmVfcGx1Z2luJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNsYXNzIERWUkNvbnRyb2xzIGV4dGVuZHMgVUlDb3JlUGx1Z2luIHtcbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULmR2cl9jb250cm9scyB9XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2R2cl9jb250cm9scycgfVxuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xpY2sgLmxpdmUtYnV0dG9uJzogJ2NsaWNrJ1xuICAgIH1cbiAgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsYXNzJzogJ2R2ci1jb250cm9scycsXG4gICAgICAnZGF0YS1kdnItY29udHJvbHMnOiAnJyxcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihjb3JlKSB7XG4gICAgc3VwZXIoY29yZSlcbiAgICB0aGlzLmNvcmUgPSBjb3JlXG4gICAgdGhpcy5zZXR0aW5nc1VwZGF0ZSgpXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb3JlLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9DT05UQUlORVJDSEFOR0VELCB0aGlzLnNldHRpbmdzVXBkYXRlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb3JlLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9SRU5ERVJFRCwgdGhpcy5zZXR0aW5nc1VwZGF0ZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLRFZSU1RBVEVDSEFOR0VELCB0aGlzLmR2ckNoYW5nZWQpXG4gIH1cblxuICBkdnJDaGFuZ2VkKGR2ckVuYWJsZWQpIHtcbiAgICB0aGlzLnNldHRpbmdzVXBkYXRlKClcbiAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5hZGRDbGFzcygnbGl2ZScpXG4gICAgaWYgKGR2ckVuYWJsZWQpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmFkZENsYXNzKCdkdnInKVxuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kZWwuZmluZCgnLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtcG9zaXRpb25dLCAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1kdXJhdGlvbl0nKS5oaWRlKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kZWwucmVtb3ZlQ2xhc3MoJ2R2cicpXG4gICAgfVxuICB9XG5cbiAgY2xpY2soKSB7XG4gICAgaWYgKCF0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkge1xuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIucGxheSgpXG4gICAgfVxuICAgIGlmICh0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5oYXNDbGFzcygnZHZyJykpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldEN1cnJlbnRUaW1lKC0xKVxuICAgIH1cbiAgfVxuXG4gIHNldHRpbmdzVXBkYXRlKCkge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZygpXG4gICAgaWYodGhpcy5zaG91bGRSZW5kZXIoKSkge1xuICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgdGhpcy4kZWwuY2xpY2soKCkgPT4gdGhpcy5jbGljaygpKVxuICAgIH1cbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICB9XG5cbiAgc2hvdWxkUmVuZGVyKCkge1xuICAgIHZhciB1c2VEdnJDb250cm9scyA9IHRoaXMuY29yZS5vcHRpb25zLnVzZUR2ckNvbnRyb2xzID09PSB1bmRlZmluZWQgfHwgISF0aGlzLmNvcmUub3B0aW9ucy51c2VEdnJDb250cm9sc1xuICAgIHJldHVybiB1c2VEdnJDb250cm9scyAmJiB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ2xpdmUnXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSlcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgaWYgKHRoaXMuc2hvdWxkUmVuZGVyKCkpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmFkZENsYXNzKCdsaXZlJylcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJCgnLm1lZGlhLWNvbnRyb2wtbGVmdC1wYW5lbFtkYXRhLW1lZGlhLWNvbnRyb2xdJykuYXBwZW5kKHRoaXMuJGVsKVxuICAgICAgaWYgKHRoaXMuJGR1cmF0aW9uKSB7XG4gICAgICAgIHRoaXMuJGR1cmF0aW9uLnJlbW92ZSgpXG4gICAgICB9XG4gICAgICB0aGlzLiRkdXJhdGlvbiA9ICQoJzxzcGFuIGRhdGEtZHVyYXRpb24+PC9zcGFuPicpXG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLnNlZWtUaW1lLiRlbC5hcHBlbmQodGhpcy4kZHVyYXRpb24pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEVlJDb250cm9sc1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2R2cl9jb250cm9scycpXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgnY29udGFpbmVyX3BsdWdpbicpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNsYXNzIEdvb2dsZUFuYWx5dGljcyBleHRlbmRzIENvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2dvb2dsZV9hbmFseXRpY3MnIH1cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgaWYgKG9wdGlvbnMuZ2FBY2NvdW50KSB7XG4gICAgICB0aGlzLmFjY291bnQgPSBvcHRpb25zLmdhQWNjb3VudFxuICAgICAgdGhpcy50cmFja2VyTmFtZSA9IChvcHRpb25zLmdhVHJhY2tlck5hbWUpID8gb3B0aW9ucy5nYVRyYWNrZXJOYW1lICsgXCIuXCIgOiAnQ2xhcHByLidcbiAgICAgIHRoaXMuY3VycmVudEhEU3RhdGUgPSB1bmRlZmluZWRcbiAgICAgIHRoaXMuZW1iZWRTY3JpcHQoKVxuICAgIH1cbiAgfVxuXG4gIGVtYmVkU2NyaXB0KCkge1xuICAgIGlmICghd2luZG93Ll9nYXQpIHtcbiAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0L2phdmFzY3JpcHRcIilcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJhc3luY1wiLCBcImFzeW5jXCIpXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaHR0cDovL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9nYS5qc1wiKVxuICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIH1cbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWSwgdGhpcy5vblBsYXkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLm9uU3RvcClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BBVVNFLCB0aGlzLm9uUGF1c2UpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcy5vbkVuZGVkKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSSU5HLCB0aGlzLm9uQnVmZmVyaW5nKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSRlVMTCwgdGhpcy5vbkJ1ZmZlckZ1bGwpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcy5vbkVuZGVkKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRVJST1IsIHRoaXMub25FcnJvcilcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLU1RBVEUsIHRoaXMub25QbGF5YmFja0NoYW5nZWQpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9WT0xVTUUsIChldmVudCkgPT4gdGhpcy5vblZvbHVtZUNoYW5nZWQoZXZlbnQpKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VFSywgKGV2ZW50KSA9PiB0aGlzLm9uU2VlayhldmVudCkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9GVUxMX1NDUkVFTiwgdGhpcy5vbkZ1bGxzY3JlZW4pXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9ISUdIREVGSU5JVElPTlVQREFURSwgdGhpcy5vbkhEKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQsIHRoaXMub25EVlIpXG4gICAgX2dhcS5wdXNoKFt0aGlzLnRyYWNrZXJOYW1lICsgJ19zZXRBY2NvdW50JywgdGhpcy5hY2NvdW50XSk7XG4gIH1cblxuICBvblBsYXkoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiUGxheVwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIlN0b3BcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uRW5kZWQoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiRW5kZWRcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIkJ1ZmZlcmluZ1wiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25CdWZmZXJGdWxsKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIkJ1ZmZlcmZ1bGxcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uRXJyb3IoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiRXJyb3JcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uSEQoKSB7XG4gICAgdmFyIHN0YXR1cyA9IHRoaXMuY29udGFpbmVyLmlzSGlnaERlZmluaXRpb25JblVzZSgpPyBcIk9OXCI6IFwiT0ZGXCJcbiAgICBpZiAoc3RhdHVzICE9PSB0aGlzLmN1cnJlbnRIRFN0YXRlKSB7XG4gICAgICB0aGlzLmN1cnJlbnRIRFN0YXRlID0gc3RhdHVzXG4gICAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJIRCAtIFwiICsgc3RhdHVzLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICAgIH1cbiAgfVxuXG5cbiAgb25QbGF5YmFja0NoYW5nZWQoKSB7XG4gICAgdmFyIHR5cGUgPSB0aGlzLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKVxuICAgIGlmICh0eXBlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJQbGF5YmFjayBUeXBlIC0gXCIgKyB0eXBlLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICAgIH1cbiAgfVxuXG4gIG9uRFZSKGR2ckluVXNlKSB7XG4gICAgdmFyIHN0YXR1cyA9IGR2ckluVXNlPyBcIk9OXCI6IFwiT0ZGXCJcbiAgICB0aGlzLnB1c2goW1wiSW50ZXJhY3Rpb25cIiwgXCJEVlIgLSBcIiArIHN0YXR1cywgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uUGF1c2UoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiUGF1c2VcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uU2VlaygpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJTZWVrXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvblZvbHVtZUNoYW5nZWQoKSB7XG4gICAgdGhpcy5wdXNoKFtcIkludGVyYWN0aW9uXCIsIFwiVm9sdW1lXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvbkZ1bGxzY3JlZW4oKSB7XG4gICAgdGhpcy5wdXNoKFtcIkludGVyYWN0aW9uXCIsIFwiRnVsbHNjcmVlblwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cblxuICBwdXNoKGFycmF5KSB7XG4gICAgdmFyIHJlcyA9IFt0aGlzLnRyYWNrZXJOYW1lICsgXCJfdHJhY2tFdmVudFwiXS5jb25jYXQoYXJyYXkpXG4gICAgX2dhcS5wdXNoKHJlcylcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gR29vZ2xlQW5hbHl0aWNzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2dvb2dsZV9hbmFseXRpY3MnKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9sb2cnKTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnJlcXVpcmUoJ21vdXNldHJhcCcpXG5cbmNsYXNzIExvZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgICAgTW91c2V0cmFwLmJpbmQoWydjdHJsK3NoaWZ0K2QnXSwgKCkgPT4gdGhpcy5vbk9mZigpKVxuICAgICAgdGhpcy5CTEFDS0xJU1QgPSBbJ3BsYXliYWNrOnRpbWV1cGRhdGUnLCAncGxheWJhY2s6cHJvZ3Jlc3MnLCAnY29udGFpbmVyOmhvdmVyJywgJ2NvbnRhaW5lcjp0aW1ldXBkYXRlJywgJ2NvbnRhaW5lcjpwcm9ncmVzcyddO1xuICB9XG5cbiAgaW5mbyhrbGFzcywgbWVzc2FnZSkge3RoaXMubG9nKGtsYXNzLCAnaW5mbycsIG1lc3NhZ2UpfVxuICB3YXJuKGtsYXNzLCBtZXNzYWdlKSB7dGhpcy5sb2coa2xhc3MsICd3YXJuJywgbWVzc2FnZSl9XG4gIGRlYnVnKGtsYXNzLCBtZXNzYWdlKSB7dGhpcy5sb2coa2xhc3MsICdkZWJ1ZycsIG1lc3NhZ2UpfVxuXG4gIG9uT2ZmKCkge1xuICAgICAgd2luZG93LkRFQlVHID0gIXdpbmRvdy5ERUJVR1xuICAgICAgaWYgKHdpbmRvdy5ERUJVRykgeyBjb25zb2xlLmxvZygnbG9nIGVuYWJsZWQnKTsgIH1cbiAgICAgIGVsc2UgeyBjb25zb2xlLmxvZygnbG9nIGRpc2FibGVkJyk7IH1cbiAgICB9XG5cbiAgbG9nKGtsYXNzLCBsZXZlbCwgbWVzc2FnZSkge1xuICAgICAgaWYgKCF3aW5kb3cuREVCVUcgfHwgdGhpcy5CTEFDS0xJU1QuaW5kZXhPZihtZXNzYWdlKSA+PSAwKSByZXR1cm5cbiAgICAgIHZhciBjb2xvclxuICAgICAgaWYgKGxldmVsID09PSAnd2FybicpIHsgY29sb3IgPSAnI0ZGODAwMCcgfVxuICAgICAgZWxzZSBpZiAobGV2ZWwgPT09ICdpbmZvJykgeyBjb2xvciA9ICcjMDA2NjAwJyB9XG4gICAgICBlbHNlIGlmIChsZXZlbCA9PT0gJ2Vycm9yJykgeyBjb2xvciA9ICcjRkYwMDAwJ31cbiAgICAgIGNvbnNvbGUubG9nKFwiJWMgW1wiICsga2xhc3MgKyBcIl0gW1wiICsgbGV2ZWwgKyBcIl0gXCIgKyAgbWVzc2FnZSwgJ2NvbG9yOiAnK2NvbG9yKTtcbiAgICB9XG59XG5cbkxvZy5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5faW5zdGFuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpXG4gICAgfVxuICByZXR1cm4gdGhpcy5faW5zdGFuY2Vcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IExvZ1xuIiwiLy9Db3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgVUlDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCd1aV9jb250YWluZXJfcGx1Z2luJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJ21lZGlhdG9yJylcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgncGxheWVyX2luZm8nKVxuXG52YXIgJCA9IHJlcXVpcmUoJ3plcHRvJylcblxuY2xhc3MgUG9zdGVyUGx1Z2luIGV4dGVuZHMgVUlDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdwb3N0ZXInIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULnBvc3RlciB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGFzcyc6ICdwbGF5ZXItcG9zdGVyJyxcbiAgICAgICdkYXRhLXBvc3Rlcic6ICcnXG4gICAgfVxuICB9XG5cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsaWNrJzogJ2NsaWNrZWQnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMuY29udGFpbmVyLmRpc2FibGVNZWRpYUNvbnRyb2woKVxuICAgIHRoaXMucmVuZGVyKClcbiAgICB0aGlzLmJ1ZmZlckZ1bGwgPSBmYWxzZVxuICB9XG5cbiAgbG9hZChzb3VyY2UpIHtcbiAgICB0aGlzLm9wdGlvbnMucG9zdGVyID0gc291cmNlXG4gICAgdGhpcy5yZW5kZXIoKVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORywgdGhpcy5vbkJ1ZmZlcmluZylcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMub25CdWZmZXJmdWxsKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5vblN0b3ApXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLm9uUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0VOREVELCB0aGlzLm9uU3RvcClcbiAgICBNZWRpYXRvci5vbihFdmVudHMuUExBWUVSX1JFU0laRSwgdGhpcy51cGRhdGVTaXplLCB0aGlzKVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICBNZWRpYXRvci5vZmYoRXZlbnRzLlBMQVlFUl9SRVNJWkUsIHRoaXMudXBkYXRlU2l6ZSwgdGhpcylcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIHRoaXMuYnVmZmVyRnVsbCA9IGZhbHNlXG4gICAgdGhpcy5oaWRlUGxheUJ1dHRvbigpXG4gIH1cblxuICBvblBsYXkoKSB7XG4gICAgaWYgKHRoaXMuYnVmZmVyRnVsbCkge1xuICAgICAgdGhpcy4kZWwuaGlkZSgpXG4gICAgICB0aGlzLmNvbnRhaW5lci5lbmFibGVNZWRpYUNvbnRyb2woKVxuICAgIH1cbiAgfVxuXG4gIG9uQnVmZmVyZnVsbCgpIHtcbiAgICB0aGlzLmJ1ZmZlckZ1bGwgPSB0cnVlXG4gICAgaWYgKHRoaXMuY29udGFpbmVyLnBsYXliYWNrLm5hbWUgPT09ICdodG1sNV92aWRlbycgJiYgIXRoaXMuY29udGFpbmVyLmlzUGxheWluZygpKSByZXR1cm5cbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB0aGlzLmNvbnRhaW5lci5lbmFibGVNZWRpYUNvbnRyb2woKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMuJGVsLnNob3coKVxuICAgIHRoaXMuY29udGFpbmVyLmRpc2FibGVNZWRpYUNvbnRyb2woKVxuICAgIHRoaXMuc2hvd1BsYXlCdXR0b24oKVxuICB9XG5cbiAgc2hvd1BsYXlCdXR0b24oKSB7XG4gICAgdGhpcy4kcGxheUJ1dHRvbi5zaG93KClcbiAgICB0aGlzLnVwZGF0ZVNpemUoKVxuICB9XG5cbiAgaGlkZVBsYXlCdXR0b24oKSB7XG4gICAgdGhpcy4kcGxheUJ1dHRvbi5oaWRlKClcbiAgfVxuXG4gIGNsaWNrZWQoKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgdGhpcy5jb250YWluZXIucGxheSgpXG4gICAgICB0aGlzLmhpZGVQbGF5QnV0dG9uKClcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB1cGRhdGVTaXplKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5uYW1lID09PSAnaHRtbF9pbWcnKSByZXR1cm5cbiAgICB2YXIgaGVpZ2h0ID0gUGxheWVySW5mby5jdXJyZW50U2l6ZSA/IFBsYXllckluZm8uY3VycmVudFNpemUuaGVpZ2h0IDogdGhpcy4kZWwuaGVpZ2h0KClcbiAgICB0aGlzLiRlbC5jc3MoeyBmb250U2l6ZTogaGVpZ2h0IH0pXG4gICAgaWYgKHRoaXMuJHBsYXlXcmFwcGVyLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICB0aGlzLiRwbGF5V3JhcHBlci5jc3MoeyBtYXJnaW5Ub3A6IC0odGhpcy4kcGxheVdyYXBwZXIuaGVpZ2h0KCkgLyAyKSB9KVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIucGxheWJhY2submFtZSA9PT0gJ2h0bWxfaW1nJykgcmV0dXJuXG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSwge2Jhc2VVcmw6IHRoaXMub3B0aW9ucy5iYXNlVXJsfSlbMF1cbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wb3N0ZXIpIHtcbiAgICAgIHZhciBpbWdFbCA9ICQoJzxkaXYgZGF0YS1wb3N0ZXIgY2xhc3M9XCJwb3N0ZXItYmFja2dyb3VuZFwiPjwvZGl2PicpXG4gICAgICBpbWdFbC5jc3MoeydiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdGhpcy5vcHRpb25zLnBvc3RlciArICcpJ30pXG4gICAgICB0aGlzLiRlbC5wcmVwZW5kKGltZ0VsKVxuICAgIH1cbiAgICB0aGlzLmNvbnRhaW5lci4kZWwuYXBwZW5kKHRoaXMuZWwpXG4gICAgdGhpcy4kcGxheUJ1dHRvbiA9IHRoaXMuJGVsLmZpbmQoJy5wb3N0ZXItaWNvbicpXG4gICAgdGhpcy4kcGxheVdyYXBwZXIgPSB0aGlzLiRlbC5maW5kKCcucGxheS13cmFwcGVyJylcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlU2l6ZSgpLCAwKVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgdGhpcy5oaWRlUGxheUJ1dHRvbigpXG4gICAgICB0aGlzLiRlbC5jc3MoeydjdXJzb3InOiAnaW5pdGlhbCd9KVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zdGVyUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc3Bpbm5lcl90aHJlZV9ib3VuY2UnKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFVJQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgndWlfY29udGFpbmVyX3BsdWdpbicpO1xudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJyk7XG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcblxuY2xhc3MgU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luIGV4dGVuZHMgVUlDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdzcGlubmVyJyB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZGF0YS1zcGlubmVyJzonJyxcbiAgICAgICdjbGFzcyc6ICdzcGlubmVyLXRocmVlLWJvdW5jZSdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnRlbXBsYXRlID0gSlNULnNwaW5uZXJfdGhyZWVfYm91bmNlXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJJTkcsIHRoaXMub25CdWZmZXJpbmcpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMLCB0aGlzLm9uQnVmZmVyRnVsbClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICAgIHRoaXMucmVuZGVyKClcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIHRoaXMuJGVsLnNob3coKVxuICB9XG5cbiAgb25CdWZmZXJGdWxsKCkge1xuICAgIHRoaXMuJGVsLmhpZGUoKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMuJGVsLmhpZGUoKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcignc3Bpbm5lcl90aHJlZV9ib3VuY2UnKVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy5jb250YWluZXIuJGVsLmFwcGVuZCh0aGlzLiRlbClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3N0YXRzJyk7XG5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCdjb250YWluZXJfcGx1Z2luJyk7XG52YXIgJCA9IHJlcXVpcmUoXCJ6ZXB0b1wiKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcblxuY2xhc3MgU3RhdHNQbHVnaW4gZXh0ZW5kcyBDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdzdGF0cycgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc2V0SW5pdGlhbEF0dHJzKClcbiAgICB0aGlzLnJlcG9ydEludGVydmFsID0gb3B0aW9ucy5yZXBvcnRJbnRlcnZhbCB8fCA1MDAwXG4gICAgdGhpcy5zdGF0ZSA9IFwiSURMRVwiXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19QTEFZLCB0aGlzLm9uUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfREVTVFJPWUVELCB0aGlzLm9uU3RvcClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORywgdGhpcy5vbkJ1ZmZlcmluZylcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMub25CdWZmZXJGdWxsKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVFNfQURELCB0aGlzLm9uU3RhdHNBZGQpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9CSVRSQVRFLCB0aGlzLm9uU3RhdHNBZGQpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lci5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1NUQVRTX0FERCwgdGhpcy5vblN0YXRzQWRkKVxuICB9XG5cbiAgc2V0SW5pdGlhbEF0dHJzKCkge1xuICAgIHRoaXMuZmlyc3RQbGF5ID0gdHJ1ZVxuICAgIHRoaXMuc3RhcnR1cFRpbWUgPSAwXG4gICAgdGhpcy5yZWJ1ZmZlcmluZ1RpbWUgPSAwXG4gICAgdGhpcy53YXRjaGluZ1RpbWUgPSAwXG4gICAgdGhpcy5yZWJ1ZmZlcnMgPSAwXG4gICAgdGhpcy5leHRlcm5hbE1ldHJpY3MgPSB7fVxuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIHRoaXMuc3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgIHRoaXMud2F0Y2hpbmdUaW1lSW5pdCA9IERhdGUubm93KClcbiAgICBpZiAoIXRoaXMuaW50ZXJ2YWxJZCkge1xuICAgICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodGhpcy5yZXBvcnQuYmluZCh0aGlzKSwgdGhpcy5yZXBvcnRJbnRlcnZhbClcbiAgICB9XG4gIH1cblxuICBvblN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpXG4gICAgdGhpcy5pbnRlcnZhbElkID0gdW5kZWZpbmVkXG4gICAgdGhpcy5zdGF0ZSA9IFwiU1RPUFBFRFwiXG4gIH1cblxuICBvbkJ1ZmZlcmluZygpIHtcbiAgICBpZiAodGhpcy5maXJzdFBsYXkpIHtcbiAgICAgIHRoaXMuc3RhcnR1cFRpbWVJbml0ID0gRGF0ZS5ub3coKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlYnVmZmVyaW5nVGltZUluaXQgPSBEYXRlLm5vdygpXG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBcIkJVRkZFUklOR1wiXG4gICAgdGhpcy5yZWJ1ZmZlcnMrK1xuICB9XG5cbiAgb25CdWZmZXJGdWxsKCkge1xuICAgIGlmICh0aGlzLmZpcnN0UGxheSAmJiAhIXRoaXMuc3RhcnR1cFRpbWVJbml0KSB7XG4gICAgICB0aGlzLmZpcnN0UGxheSA9IGZhbHNlXG4gICAgICB0aGlzLnN0YXJ0dXBUaW1lID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnR1cFRpbWVJbml0XG4gICAgICB0aGlzLndhdGNoaW5nVGltZUluaXQgPSBEYXRlLm5vdygpXG4gICAgfSBlbHNlIGlmICghIXRoaXMucmVidWZmZXJpbmdUaW1lSW5pdCkge1xuICAgICAgdGhpcy5yZWJ1ZmZlcmluZ1RpbWUgKz0gdGhpcy5nZXRSZWJ1ZmZlcmluZ1RpbWUoKVxuICAgIH1cbiAgICB0aGlzLnJlYnVmZmVyaW5nVGltZUluaXQgPSB1bmRlZmluZWRcbiAgICB0aGlzLnN0YXRlID0gXCJQTEFZSU5HXCJcbiAgfVxuXG4gIGdldFJlYnVmZmVyaW5nVGltZSgpIHtcbiAgICByZXR1cm4gRGF0ZS5ub3coKSAtIHRoaXMucmVidWZmZXJpbmdUaW1lSW5pdFxuICB9XG5cbiAgZ2V0V2F0Y2hpbmdUaW1lKCkge1xuICAgIHZhciB0b3RhbFRpbWUgPSAoRGF0ZS5ub3coKSAtIHRoaXMud2F0Y2hpbmdUaW1lSW5pdClcbiAgICByZXR1cm4gdG90YWxUaW1lIC0gdGhpcy5yZWJ1ZmZlcmluZ1RpbWVcbiAgfVxuXG4gIGlzUmVidWZmZXJpbmcoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5yZWJ1ZmZlcmluZ1RpbWVJbml0XG4gIH1cblxuICBvblN0YXRzQWRkKG1ldHJpYykge1xuICAgICQuZXh0ZW5kKHRoaXMuZXh0ZXJuYWxNZXRyaWNzLCBtZXRyaWMpXG4gIH1cblxuICBnZXRTdGF0cygpIHtcbiAgICB2YXIgbWV0cmljcyA9IHtcbiAgICAgIHN0YXJ0dXBUaW1lOiAgICAgdGhpcy5zdGFydHVwVGltZSxcbiAgICAgIHJlYnVmZmVyczogICAgICAgdGhpcy5yZWJ1ZmZlcnMsXG4gICAgICByZWJ1ZmZlcmluZ1RpbWU6IHRoaXMuaXNSZWJ1ZmZlcmluZygpPyB0aGlzLnJlYnVmZmVyaW5nVGltZSArIHRoaXMuZ2V0UmVidWZmZXJpbmdUaW1lKCk6IHRoaXMucmVidWZmZXJpbmdUaW1lLFxuICAgICAgd2F0Y2hpbmdUaW1lOiAgICB0aGlzLmlzUmVidWZmZXJpbmcoKT8gdGhpcy5nZXRXYXRjaGluZ1RpbWUoKSAtIHRoaXMuZ2V0UmVidWZmZXJpbmdUaW1lKCk6IHRoaXMuZ2V0V2F0Y2hpbmdUaW1lKClcbiAgICB9XG4gICAgJC5leHRlbmQobWV0cmljcywgdGhpcy5leHRlcm5hbE1ldHJpY3MpXG4gICAgcmV0dXJuIG1ldHJpY3NcbiAgfVxuXG4gIHJlcG9ydCgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5zdGF0c1JlcG9ydCh0aGlzLmdldFN0YXRzKCkpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0c1BsdWdpbjtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi93YXRlcm1hcmsnKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFVJQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgndWlfY29udGFpbmVyX3BsdWdpbicpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jbGFzcyBXYXRlck1hcmtQbHVnaW4gZXh0ZW5kcyBVSUNvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ3dhdGVybWFyaycgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMudGVtcGxhdGUgPSBKU1RbdGhpcy5uYW1lXVxuICAgIHRoaXMucG9zaXRpb24gPSBvcHRpb25zLnBvc2l0aW9uIHx8IFwiYm90dG9tLXJpZ2h0XCJcbiAgICBpZiAob3B0aW9ucy53YXRlcm1hcmspIHtcbiAgICAgIHRoaXMuaW1hZ2VVcmwgPSBvcHRpb25zLndhdGVybWFya1xuICAgICAgdGhpcy5yZW5kZXIoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICAgIH1cbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLm9uUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIGlmICghdGhpcy5oaWRkZW4pXG4gICAgICB0aGlzLiRlbC5zaG93KClcbiAgfVxuXG4gIG9uU3RvcCgpIHtcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB2YXIgdGVtcGxhdGVPcHRpb25zID0ge3Bvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLCBpbWFnZVVybDogdGhpcy5pbWFnZVVybH1cbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUodGVtcGxhdGVPcHRpb25zKSlcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy5jb250YWluZXIuJGVsLmFwcGVuZCh0aGlzLiRlbClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2F0ZXJNYXJrUGx1Z2luXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgdW5pcXVlSWQgPSByZXF1aXJlKCcuL3V0aWxzJykudW5pcXVlSWRcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jbGFzcyBCYXNlT2JqZWN0IGV4dGVuZHMgRXZlbnRzIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucz17fSkge1xuICAgIHRoaXMudW5pcXVlSWQgPSB1bmlxdWVJZCgnbycpXG4gICAgdGhpcy5jb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZU9iamVjdFxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuY2xhc3MgQnJvd3NlciB7XG59XG5cbnZhciBoYXNMb2NhbHN0b3JhZ2UgPSBmdW5jdGlvbigpe1xuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGFwcHInLCAnY2xhcHByJylcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY2xhcHByJylcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG52YXIgaGFzRmxhc2ggPSBmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICB2YXIgZm8gPSBuZXcgQWN0aXZlWE9iamVjdCgnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnKTtcbiAgICByZXR1cm4gISFmbztcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiAhIShuYXZpZ2F0b3IubWltZVR5cGVzICYmIG5hdmlnYXRvci5taW1lVHlwZXNbJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJ10gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBuYXZpZ2F0b3IubWltZVR5cGVzWydhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCddLmVuYWJsZWRQbHVnaW4pO1xuICB9XG59XG5cbkJyb3dzZXIuaXNTYWZhcmkgPSAoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9zYWZhcmkvaSkgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUnKSA9PT0gLTEpXG5Ccm93c2VyLmlzQ2hyb21lID0gISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvY2hyb21lL2kpKVxuQnJvd3Nlci5pc0ZpcmVmb3ggPSAhIShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9maXJlZm94L2kpKVxuQnJvd3Nlci5pc0xlZ2FjeUlFID0gISEod2luZG93LkFjdGl2ZVhPYmplY3QpXG5Ccm93c2VyLmlzSUUgPSBCcm93c2VyLmlzTGVnYWN5SUUgfHwgISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvdHJpZGVudC4qcnY6MVxcZC9pKSlcbkJyb3dzZXIuaXNJRTExID0gISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvdHJpZGVudC4qcnY6MTEvaSkpXG5Ccm93c2VyLmlzTW9iaWxlID0gISEoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fFdpbmRvd3MgUGhvbmV8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpXG5Ccm93c2VyLmlzV2luOEFwcCA9ICEhKC9NU0FwcEhvc3QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKVxuQnJvd3Nlci5pc1dpaVUgPSAhISgvV2lpVS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpXG5Ccm93c2VyLmlzUFM0ID0gISEoL1BsYXlTdGF0aW9uIDQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKVxuQnJvd3Nlci5oYXNMb2NhbHN0b3JhZ2UgPSBoYXNMb2NhbHN0b3JhZ2UoKVxuQnJvd3Nlci5oYXNGbGFzaCA9IGhhc0ZsYXNoKClcblxubW9kdWxlLmV4cG9ydHMgPSBCcm93c2VyXG4iLCJ2YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0JylcblxuY2xhc3MgQ29udGFpbmVyUGx1Z2luIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmJpbmRFdmVudHMoKVxuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29udGFpbmVyJyk7XG4iLCJ2YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0JylcblxuY2xhc3MgQ29yZVBsdWdpbiBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3Rvcihjb3JlKSB7XG4gICAgc3VwZXIoY29yZSlcbiAgICB0aGlzLmNvcmUgPSBjb3JlXG4gIH1cblxuICBnZXRFeHRlcm5hbEludGVyZmFjZSgpIHsgcmV0dXJuIHt9IH1cblxuICBkZXN0cm95KCkge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29yZScpO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIGV4ZWNPbmNlID0gcmVxdWlyZSgnbG9kYXNoLm9uY2UnKVxudmFyIHVuaXF1ZUlkID0gcmVxdWlyZSgnLi91dGlscycpLnVuaXF1ZUlkXG52YXIgTG9nID0gcmVxdWlyZSgnLi4vcGx1Z2lucy9sb2cnKS5nZXRJbnN0YW5jZSgpXG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG5jbGFzcyBFdmVudHMge1xuICBvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXNcbiAgICB0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KVxuICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV0gfHwgKHRoaXMuX2V2ZW50c1tuYW1lXSA9IFtdKVxuICAgIGV2ZW50cy5wdXNoKHtjYWxsYmFjazogY2FsbGJhY2ssIGNvbnRleHQ6IGNvbnRleHQsIGN0eDogY29udGV4dCB8fCB0aGlzfSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgb25jZShuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbmNlJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpc1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIHZhciBvbmNlID0gZXhlY09uY2UoZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLm9mZihuYW1lLCBvbmNlKVxuICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH0pXG4gICAgb25jZS5fY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIG9uY2UsIGNvbnRleHQpXG4gIH1cblxuICBvZmYobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgcmV0YWluLCBldiwgZXZlbnRzLCBuYW1lcywgaSwgbCwgaiwga1xuICAgIGlmICghdGhpcy5fZXZlbnRzIHx8ICFldmVudHNBcGkodGhpcywgJ29mZicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pKSByZXR1cm4gdGhpc1xuICAgIGlmICghbmFtZSAmJiAhY2FsbGJhY2sgJiYgIWNvbnRleHQpIHtcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHZvaWQgMFxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXModGhpcy5fZXZlbnRzKVxuICAgIGZvciAoaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG5hbWUgPSBuYW1lc1tpXVxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdXG4gICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50c1tuYW1lXSA9IHJldGFpbiA9IFtdXG4gICAgICAgIGlmIChjYWxsYmFjayB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgZm9yIChqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgIGV2ID0gZXZlbnRzW2pdXG4gICAgICAgICAgICBpZiAoKGNhbGxiYWNrICYmIGNhbGxiYWNrICE9PSBldi5jYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2suX2NhbGxiYWNrKSB8fFxuICAgICAgICAgICAgICAgIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2LmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIGRlbGV0ZSB0aGlzLl9ldmVudHNbbmFtZV1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHRyaWdnZXIobmFtZSkge1xuICAgIHZhciBrbGFzcyA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV1cbiAgICBMb2cuaW5mbyhrbGFzcywgbmFtZSlcbiAgICBpZiAoIXRoaXMuX2V2ZW50cykgcmV0dXJuIHRoaXNcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICd0cmlnZ2VyJywgbmFtZSwgYXJncykpIHJldHVybiB0aGlzXG4gICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXVxuICAgIHZhciBhbGxFdmVudHMgPSB0aGlzLl9ldmVudHMuYWxsXG4gICAgaWYgKGV2ZW50cykgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MpXG4gICAgaWYgKGFsbEV2ZW50cykgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RvcExpc3RlbmluZyhvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGxpc3RlbmluZ1RvID0gdGhpcy5fbGlzdGVuaW5nVG9cbiAgICBpZiAoIWxpc3RlbmluZ1RvKSByZXR1cm4gdGhpc1xuICAgIHZhciByZW1vdmUgPSAhbmFtZSAmJiAhY2FsbGJhY2tcbiAgICBpZiAoIWNhbGxiYWNrICYmIHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JykgY2FsbGJhY2sgPSB0aGlzXG4gICAgaWYgKG9iaikgKGxpc3RlbmluZ1RvID0ge30pW29iai5fbGlzdGVuSWRdID0gb2JqXG4gICAgZm9yICh2YXIgaWQgaW4gbGlzdGVuaW5nVG8pIHtcbiAgICAgIG9iaiA9IGxpc3RlbmluZ1RvW2lkXVxuICAgICAgb2JqLm9mZihuYW1lLCBjYWxsYmFjaywgdGhpcylcbiAgICAgIGlmIChyZW1vdmUgfHwgT2JqZWN0LmtleXMob2JqLl9ldmVudHMpLmxlbmd0aCA9PT0gMCkgZGVsZXRlIHRoaXMuX2xpc3RlbmluZ1RvW2lkXVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbnZhciBldmVudFNwbGl0dGVyID0gL1xccysvXG5cbnZhciBldmVudHNBcGkgPSBmdW5jdGlvbihvYmosIGFjdGlvbiwgbmFtZSwgcmVzdCkge1xuICBpZiAoIW5hbWUpIHJldHVybiB0cnVlXG5cbiAgLy8gSGFuZGxlIGV2ZW50IG1hcHMuXG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgb2JqW2FjdGlvbl0uYXBwbHkob2JqLCBba2V5LCBuYW1lW2tleV1dLmNvbmNhdChyZXN0KSlcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBIYW5kbGUgc3BhY2Ugc2VwYXJhdGVkIGV2ZW50IG5hbWVzLlxuICBpZiAoZXZlbnRTcGxpdHRlci50ZXN0KG5hbWUpKSB7XG4gICAgdmFyIG5hbWVzID0gbmFtZS5zcGxpdChldmVudFNwbGl0dGVyKVxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtuYW1lc1tpXV0uY29uY2F0KHJlc3QpKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbnZhciB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzKSB7XG4gIHZhciBldiwgaSA9IC0xLCBsID0gZXZlbnRzLmxlbmd0aCwgYTEgPSBhcmdzWzBdLCBhMiA9IGFyZ3NbMV0sIGEzID0gYXJnc1syXVxuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7IHJldHVyblxuICAgIGNhc2UgMTogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTsgcmV0dXJuXG4gICAgY2FzZSAyOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTsgcmV0dXJuXG4gICAgY2FzZSAzOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyLCBhMyk7IHJldHVyblxuICAgIGRlZmF1bHQ6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7IHJldHVyblxuICB9XG59XG5cbnZhciBsaXN0ZW5NZXRob2RzID0ge2xpc3RlblRvOiAnb24nLCBsaXN0ZW5Ub09uY2U6ICdvbmNlJ31cblxuT2JqZWN0LmtleXMobGlzdGVuTWV0aG9kcykuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgRXZlbnRzLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBsaXN0ZW5pbmdUbyA9IHRoaXMuX2xpc3RlbmluZ1RvIHx8ICh0aGlzLl9saXN0ZW5pbmdUbyA9IHt9KVxuICAgIHZhciBpZCA9IG9iai5fbGlzdGVuSWQgfHwgKG9iai5fbGlzdGVuSWQgPSB1bmlxdWVJZCgnbCcpKVxuICAgIGxpc3RlbmluZ1RvW2lkXSA9IG9ialxuICAgIGlmICghY2FsbGJhY2sgJiYgdHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXNcbiAgICBvYmpbbGlzdGVuTWV0aG9kc1ttZXRob2RdXShuYW1lLCBjYWxsYmFjaywgdGhpcylcbiAgICByZXR1cm4gdGhpc1xuICB9XG59KTtcblxuLy8gUExBWUVSIEVWRU5UU1xuRXZlbnRzLlBMQVlFUl9SRVNJWkUgPSAncGxheWVyOnJlc2l6ZSdcblxuLy8gUGxheWJhY2sgRXZlbnRzXG5FdmVudHMuUExBWUJBQ0tfUFJPR1JFU1MgPSAncGxheWJhY2s6cHJvZ3Jlc3MnXG5FdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSA9ICdwbGF5YmFjazp0aW1ldXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX1JFQURZID0gJ3BsYXliYWNrOnJlYWR5J1xuRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORyA9ICdwbGF5YmFjazpidWZmZXJpbmcnXG5FdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCA9ICdwbGF5YmFjazpidWZmZXJmdWxsJ1xuRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFID0gJ3BsYXliYWNrOnNldHRpbmdzdXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX0xPQURFRE1FVEFEQVRBID0gJ3BsYXliYWNrOmxvYWRlZG1ldGFkYXRhJ1xuRXZlbnRzLlBMQVlCQUNLX0hJR0hERUZJTklUSU9OVVBEQVRFID0gJ3BsYXliYWNrOmhpZ2hkZWZpbml0aW9udXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX0JJVFJBVEUgPSAncGxheWJhY2s6Yml0cmF0ZSdcbkV2ZW50cy5QTEFZQkFDS19QTEFZQkFDS1NUQVRFID0gJ3BsYXliYWNrOnBsYXliYWNrc3RhdGUnXG5FdmVudHMuUExBWUJBQ0tfRFZSID0gJ3BsYXliYWNrOmR2cidcbkV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRElTQUJMRSA9ICdwbGF5YmFjazptZWRpYWNvbnRyb2w6ZGlzYWJsZSdcbkV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRU5BQkxFID0gJ3BsYXliYWNrOm1lZGlhY29udHJvbDplbmFibGUnXG5FdmVudHMuUExBWUJBQ0tfRU5ERUQgPSAncGxheWJhY2s6ZW5kZWQnXG5FdmVudHMuUExBWUJBQ0tfUExBWSA9ICdwbGF5YmFjazpwbGF5J1xuRXZlbnRzLlBMQVlCQUNLX0VSUk9SID0gJ3BsYXliYWNrOmVycm9yJ1xuRXZlbnRzLlBMQVlCQUNLX1NUQVRTX0FERCA9ICdwbGF5YmFjazpzdGF0czphZGQnXG5cbi8vIENvbnRhaW5lciBFdmVudHNcbkV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tTVEFURSA9ICdjb250YWluZXI6cGxheWJhY2tzdGF0ZSdcbkV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQgPSAnY29udGFpbmVyOmR2cidcbkV2ZW50cy5DT05UQUlORVJfQklUUkFURSA9ICdjb250YWluZXI6Yml0cmF0ZSdcbkV2ZW50cy5DT05UQUlORVJfU1RBVFNfUkVQT1JUID0gJ2NvbnRhaW5lcjpzdGF0czpyZXBvcnQnXG5FdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCA9ICdjb250YWluZXI6ZGVzdHJveWVkJ1xuRXZlbnRzLkNPTlRBSU5FUl9SRUFEWSA9ICdjb250YWluZXI6cmVhZHknXG5FdmVudHMuQ09OVEFJTkVSX0VSUk9SID0gJ2NvbnRhaW5lcjplcnJvcidcbkV2ZW50cy5DT05UQUlORVJfTE9BREVETUVUQURBVEEgPSAnY29udGFpbmVyOmxvYWRlZG1ldGFkYXRhJ1xuRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFID0gJ2NvbnRhaW5lcjp0aW1ldXBkYXRlJ1xuRXZlbnRzLkNPTlRBSU5FUl9QUk9HUkVTUyA9ICdjb250YWluZXI6cHJvZ3Jlc3MnXG5FdmVudHMuQ09OVEFJTkVSX1BMQVkgPSAnY29udGFpbmVyOnBsYXknXG5FdmVudHMuQ09OVEFJTkVSX1NUT1AgPSAnY29udGFpbmVyOnN0b3AnXG5FdmVudHMuQ09OVEFJTkVSX1BBVVNFID0gJ2NvbnRhaW5lcjpwYXVzZSdcbkV2ZW50cy5DT05UQUlORVJfRU5ERUQgPSAnY29udGFpbmVyOmVuZGVkJ1xuRXZlbnRzLkNPTlRBSU5FUl9DTElDSyA9ICdjb250YWluZXI6Y2xpY2snXG5FdmVudHMuQ09OVEFJTkVSX01PVVNFX0VOVEVSID0gJ2NvbnRhaW5lcjptb3VzZWVudGVyJ1xuRXZlbnRzLkNPTlRBSU5FUl9NT1VTRV9MRUFWRSA9ICdjb250YWluZXI6bW91c2VsZWF2ZSdcbkV2ZW50cy5DT05UQUlORVJfU0VFSyA9ICdjb250YWluZXI6c2VlaydcbkV2ZW50cy5DT05UQUlORVJfVk9MVU1FID0gJ2NvbnRhaW5lcjp2b2x1bWUnXG5FdmVudHMuQ09OVEFJTkVSX0ZVTExTQ1JFRU4gPSAnY29udGFpbmVyOmZ1bGxzY3JlZW4nXG5FdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORyA9ICdjb250YWluZXI6c3RhdGU6YnVmZmVyaW5nJ1xuRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMID0gJ2NvbnRhaW5lcjpzdGF0ZTpidWZmZXJmdWxsJ1xuRXZlbnRzLkNPTlRBSU5FUl9TRVRUSU5HU1VQREFURSA9ICdjb250YWluZXI6c2V0dGluZ3N1cGRhdGUnXG5FdmVudHMuQ09OVEFJTkVSX0hJR0hERUZJTklUSU9OVVBEQVRFID0gJ2NvbnRhaW5lcjpoaWdoZGVmaW5pdGlvbnVwZGF0ZSdcbkV2ZW50cy5DT05UQUlORVJfTUVESUFDT05UUk9MX0RJU0FCTEUgPSAnY29udGFpbmVyOm1lZGlhY29udHJvbDpkaXNhYmxlJ1xuRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRU5BQkxFID0gJ2NvbnRhaW5lcjptZWRpYWNvbnRyb2w6ZW5hYmxlJ1xuRXZlbnRzLkNPTlRBSU5FUl9TVEFUU19BREQgPSAnY29udGFpbmVyOnN0YXRzOmFkZCdcblxuLy8gTWVkaWFDb250cm9sIEV2ZW50c1xuRXZlbnRzLk1FRElBQ09OVFJPTF9SRU5ERVJFRCA9ICdtZWRpYWNvbnRyb2w6cmVuZGVyZWQnXG5FdmVudHMuTUVESUFDT05UUk9MX0ZVTExTQ1JFRU4gPSAnbWVkaWFjb250cm9sOmZ1bGxzY3JlZW4nXG5FdmVudHMuTUVESUFDT05UUk9MX1NIT1cgPSAnbWVkaWFjb250cm9sOnNob3cnXG5FdmVudHMuTUVESUFDT05UUk9MX0hJREUgPSAnbWVkaWFjb250cm9sOmhpZGUnXG5FdmVudHMuTUVESUFDT05UUk9MX01PVVNFTU9WRV9TRUVLQkFSID0gJ21lZGlhY29udHJvbDptb3VzZW1vdmU6c2Vla2JhcidcbkV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VMRUFWRV9TRUVLQkFSID0gJ21lZGlhY29udHJvbDptb3VzZWxlYXZlOnNlZWtiYXInXG5FdmVudHMuTUVESUFDT05UUk9MX1BMQVlJTkcgPSAnbWVkaWFjb250cm9sOnBsYXlpbmcnXG5FdmVudHMuTUVESUFDT05UUk9MX05PVFBMQVlJTkcgPSAnbWVkaWFjb250cm9sOm5vdHBsYXlpbmcnXG5FdmVudHMuTUVESUFDT05UUk9MX0NPTlRBSU5FUkNIQU5HRUQgPSAnbWVkaWFjb250cm9sOmNvbnRhaW5lcmNoYW5nZWQnXG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRzXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmxhc2gnKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2hscycpO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaHRtbDVfYXVkaW8nKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2h0bWw1X3ZpZGVvJyk7XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9odG1sX2ltZycpO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbWVkaWFfY29udHJvbCcpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIFRoZSBtZWRpYXRvciBpcyBhIHNpbmdsZXRvbiBmb3IgaGFuZGxpbmcgZ2xvYmFsIGV2ZW50cy5cbiAqL1xuXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcblxudmFyIGV2ZW50cyA9IG5ldyBFdmVudHMoKVxuXG5jbGFzcyBNZWRpYXRvciB7XG59XG5cbk1lZGlhdG9yLm9uID0gZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgZXZlbnRzLm9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KVxuICByZXR1cm5cbn1cblxuTWVkaWF0b3Iub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIGV2ZW50cy5vbmNlKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KVxuICByZXR1cm5cbn1cblxuTWVkaWF0b3Iub2ZmID0gZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgZXZlbnRzLm9mZihuYW1lLCBjYWxsYmFjaywgY29udGV4dClcbiAgcmV0dXJuXG59XG5cbk1lZGlhdG9yLnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lLCBvcHRzKSB7XG4gIGV2ZW50cy50cmlnZ2VyKG5hbWUsIG9wdHMpXG4gIHJldHVyblxufVxuXG5NZWRpYXRvci5zdG9wTGlzdGVuaW5nID0gZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICBldmVudHMuc3RvcExpc3RlbmluZyhvYmosIG5hbWUsIGNhbGxiYWNrKVxuICByZXR1cm5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNZWRpYXRvclxuIiwidmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgndWlfb2JqZWN0JylcblxuY2xhc3MgUGxheWJhY2sgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc2V0dGluZ3MgPSB7fVxuICB9XG5cbiAgcGxheSgpIHt9XG5cbiAgcGF1c2UoKSB7fVxuXG4gIHN0b3AoKSB7fVxuXG4gIHNlZWsodGltZSkge31cblxuICBnZXREdXJhdGlvbigpIHsgcmV0dXJuIDAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gJ25vX29wJ1xuICB9XG5cbiAgaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxufVxuXG5QbGF5YmFjay5jYW5QbGF5ID0gKHNvdXJjZSkgPT4ge1xuICByZXR1cm4gZmFsc2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5YmFja1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXllckluZm8gPXtcbiAgb3B0aW9uczoge30sXG4gIHBsYXliYWNrUGx1Z2luczogW10sXG4gIGN1cnJlbnRTaXplOiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllckluZm9cblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3Bvc3RlcicpO1xuXG4iLCIvLyBTaW1wbGUgSmF2YVNjcmlwdCBUZW1wbGF0aW5nXG4vLyBQYXVsIE1pbGxlciAoaHR0cDovL3BhdWxtaWxsci5jb20pXG4vLyBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuLy8gKGMpIDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuKGZ1bmN0aW9uKGdsb2JhbHMpIHtcbiAgLy8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXG4gIC8vIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAgdmFyIHNldHRpbmdzID0ge1xuICAgIGV2YWx1YXRlICAgIDogLzwlKFtcXHNcXFNdKz8pJT4vZyxcbiAgICBpbnRlcnBvbGF0ZSA6IC88JT0oW1xcc1xcU10rPyklPi9nLFxuICAgIGVzY2FwZSAgICAgIDogLzwlLShbXFxzXFxTXSs/KSU+L2dcbiAgfTtcblxuICAvLyBXaGVuIGN1c3RvbWl6aW5nIGB0ZW1wbGF0ZVNldHRpbmdzYCwgaWYgeW91IGRvbid0IHdhbnQgdG8gZGVmaW5lIGFuXG4gIC8vIGludGVycG9sYXRpb24sIGV2YWx1YXRpb24gb3IgZXNjYXBpbmcgcmVnZXgsIHdlIG5lZWQgb25lIHRoYXQgaXNcbiAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXG4gIHZhciBub01hdGNoID0gLyguKV4vO1xuXG4gIC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4gIC8vIHN0cmluZyBsaXRlcmFsLlxuICB2YXIgZXNjYXBlcyA9IHtcbiAgICBcIidcIjogICAgICBcIidcIixcbiAgICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICAgJ1xccic6ICAgICAncicsXG4gICAgJ1xcbic6ICAgICAnbicsXG4gICAgJ1xcdCc6ICAgICAndCcsXG4gICAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ3UyMDI5J1xuICB9O1xuXG4gIHZhciBlc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdHxcXHUyMDI4fFxcdTIwMjkvZztcblxuICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxuICB2YXIgaHRtbEVudGl0aWVzID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjeDI3OydcbiAgfTtcblxuICB2YXIgZW50aXR5UmUgPSBuZXcgUmVnRXhwKCdbJjw+XCJcXCddJywgJ2cnKTtcblxuICB2YXIgZXNjYXBlRXhwciA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIGlmIChzdHJpbmcgPT0gbnVsbCkgcmV0dXJuICcnO1xuICAgIHJldHVybiAoJycgKyBzdHJpbmcpLnJlcGxhY2UoZW50aXR5UmUsIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICByZXR1cm4gaHRtbEVudGl0aWVzW21hdGNoXTtcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgY291bnRlciA9IDA7XG5cbiAgLy8gSmF2YVNjcmlwdCBtaWNyby10ZW1wbGF0aW5nLCBzaW1pbGFyIHRvIEpvaG4gUmVzaWcncyBpbXBsZW1lbnRhdGlvbi5cbiAgLy8gVW5kZXJzY29yZSB0ZW1wbGF0aW5nIGhhbmRsZXMgYXJiaXRyYXJ5IGRlbGltaXRlcnMsIHByZXNlcnZlcyB3aGl0ZXNwYWNlLFxuICAvLyBhbmQgY29ycmVjdGx5IGVzY2FwZXMgcXVvdGVzIHdpdGhpbiBpbnRlcnBvbGF0ZWQgY29kZS5cbiAgdmFyIHRtcGwgPSBmdW5jdGlvbih0ZXh0LCBkYXRhKSB7XG4gICAgdmFyIHJlbmRlcjtcblxuICAgIC8vIENvbWJpbmUgZGVsaW1pdGVycyBpbnRvIG9uZSByZWd1bGFyIGV4cHJlc3Npb24gdmlhIGFsdGVybmF0aW9uLlxuICAgIHZhciBtYXRjaGVyID0gbmV3IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldClcbiAgICAgICAgLnJlcGxhY2UoZXNjYXBlciwgZnVuY3Rpb24obWF0Y2gpIHsgcmV0dXJuICdcXFxcJyArIGVzY2FwZXNbbWF0Y2hdOyB9KTtcblxuICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGVzY2FwZSArIFwiKSk9PW51bGw/Jyc6ZXNjYXBlRXhwcihfX3QpKStcXG4nXCI7XG4gICAgICB9XG4gICAgICBpZiAoaW50ZXJwb2xhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBpbnRlcnBvbGF0ZSArIFwiKSk9PW51bGw/Jyc6X190KStcXG4nXCI7XG4gICAgICB9XG4gICAgICBpZiAoZXZhbHVhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJztcXG5cIiArIGV2YWx1YXRlICsgXCJcXG5fX3ArPSdcIjtcbiAgICAgIH1cbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuICAgIHNvdXJjZSArPSBcIic7XFxuXCI7XG5cbiAgICAvLyBJZiBhIHZhcmlhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIHBsYWNlIGRhdGEgdmFsdWVzIGluIGxvY2FsIHNjb3BlLlxuICAgIGlmICghc2V0dGluZ3MudmFyaWFibGUpIHNvdXJjZSA9ICd3aXRoKG9ianx8e30pe1xcbicgKyBzb3VyY2UgKyAnfVxcbic7XG5cbiAgICBzb3VyY2UgPSBcInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIiArXG4gICAgICBcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIgK1xuICAgICAgc291cmNlICsgXCJyZXR1cm4gX19wO1xcbi8vIyBzb3VyY2VVUkw9L21pY3JvdGVtcGxhdGVzL3NvdXJjZVtcIiArIGNvdW50ZXIrKyArIFwiXVwiO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlbmRlciA9IG5ldyBGdW5jdGlvbihzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJywgJ2VzY2FwZUV4cHInLCBzb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUuc291cmNlID0gc291cmNlO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSkgcmV0dXJuIHJlbmRlcihkYXRhLCBlc2NhcGVFeHByKTtcbiAgICB2YXIgdGVtcGxhdGUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVuZGVyLmNhbGwodGhpcywgZGF0YSwgZXNjYXBlRXhwcik7XG4gICAgfTtcblxuICAgIC8vIFByb3ZpZGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uIHNvdXJjZSBhcyBhIGNvbnZlbmllbmNlIGZvciBwcmVjb21waWxhdGlvbi5cbiAgICB0ZW1wbGF0ZS5zb3VyY2UgPSAnZnVuY3Rpb24oJyArIChzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJykgKyAnKXtcXG4nICsgc291cmNlICsgJ30nO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9O1xuICB0bXBsLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0bXBsO1xuICAgIH0pOyAvLyBSZXF1aXJlSlNcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gdG1wbDsgLy8gQ29tbW9uSlNcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWxzLm1pY3JvdGVtcGxhdGUgPSB0bXBsOyAvLyA8c2NyaXB0PlxuICB9XG59KSh0aGlzKTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBVSU9iamVjdCA9IHJlcXVpcmUoJ3VpX29iamVjdCcpXG5cbmNsYXNzIFVJQ29udGFpbmVyUGx1Z2luIGV4dGVuZHMgVUlPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgICAgIHRoaXMuJGVsLnNob3coKVxuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZSgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVSUNvbnRhaW5lclBsdWdpblxuIiwidmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgndWlfb2JqZWN0JylcblxuY2xhc3MgVUlDb3JlUGx1Z2luIGV4dGVuZHMgVUlPYmplY3Qge1xuICBjb25zdHJ1Y3Rvcihjb3JlKSB7XG4gICAgc3VwZXIoY29yZSlcbiAgICB0aGlzLmNvcmUgPSBjb3JlXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIHRoaXMuYmluZEV2ZW50cygpXG4gICAgdGhpcy5yZW5kZXIoKVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHt9XG5cbiAgZ2V0RXh0ZXJuYWxJbnRlcmZhY2UoKSB7IHJldHVybiB7fSB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmJpbmRFdmVudHMoKVxuICAgICAgdGhpcy4kZWwuc2hvdygpXG4gICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHRoaXMuJGVsLmhpZGUoKVxuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQodGhpcy5zdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKSlcbiAgICB0aGlzLmNvcmUuJGVsLmFwcGVuZCh0aGlzLmVsKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVSUNvcmVQbHVnaW5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciAkID0gcmVxdWlyZSgnemVwdG8nKVxudmFyIHVuaXF1ZUlkID0gcmVxdWlyZSgnLi91dGlscycpLnVuaXF1ZUlkXG52YXIgcmVzdWx0ID0gcmVxdWlyZSgnbG9kYXNoLnJlc3VsdCcpXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0JylcblxudmFyIGRlbGVnYXRlRXZlbnRTcGxpdHRlciA9IC9eKFxcUyspXFxzKiguKikkL1xuXG5jbGFzcyBVSU9iamVjdCBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ2RpdicgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuY2lkID0gdW5pcXVlSWQoJ2MnKTtcbiAgICB0aGlzLl9lbnN1cmVFbGVtZW50KCk7XG4gICAgdGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuICB9XG5cbiAgJChzZWxlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLiRlbC5maW5kKHNlbGVjdG9yKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXRFbGVtZW50KGVsZW1lbnQsIGRlbGVnYXRlKSB7XG4gICAgaWYgKHRoaXMuJGVsKSB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKVxuICAgIHRoaXMuJGVsID0gZWxlbWVudCBpbnN0YW5jZW9mICQgPyBlbGVtZW50IDogJChlbGVtZW50KVxuICAgIHRoaXMuZWwgPSB0aGlzLiRlbFswXVxuICAgIGlmIChkZWxlZ2F0ZSAhPT0gZmFsc2UpIHRoaXMuZGVsZWdhdGVFdmVudHMoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBkZWxlZ2F0ZUV2ZW50cyhldmVudHMpIHtcbiAgICBpZiAoIShldmVudHMgfHwgKGV2ZW50cyA9IHJlc3VsdCh0aGlzLCAnZXZlbnRzJykpKSkgcmV0dXJuIHRoaXNcbiAgICB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKVxuICAgIGZvciAodmFyIGtleSBpbiBldmVudHMpIHtcbiAgICAgIHZhciBtZXRob2QgPSBldmVudHNba2V5XVxuICAgICAgaWYgKChtZXRob2QgJiYgbWV0aG9kLmNvbnN0cnVjdG9yICE9PSBGdW5jdGlvbikpIG1ldGhvZCA9IHRoaXNbZXZlbnRzW2tleV1dXG4gICAgICBpZiAoIW1ldGhvZCkgY29udGludWVcblxuICAgICAgdmFyIG1hdGNoID0ga2V5Lm1hdGNoKGRlbGVnYXRlRXZlbnRTcGxpdHRlcilcbiAgICAgIHZhciBldmVudE5hbWUgPSBtYXRjaFsxXSwgc2VsZWN0b3IgPSBtYXRjaFsyXVxuICAgICAgLy9tZXRob2QgPSBfLmJpbmQobWV0aG9kLCB0aGlzKVxuICAgICAgZXZlbnROYW1lICs9ICcuZGVsZWdhdGVFdmVudHMnICsgdGhpcy5jaWRcbiAgICAgIGlmIChzZWxlY3RvciA9PT0gJycpIHtcbiAgICAgICAgdGhpcy4kZWwub24oZXZlbnROYW1lLCBtZXRob2QuYmluZCh0aGlzKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsLm9uKGV2ZW50TmFtZSwgc2VsZWN0b3IsIG1ldGhvZC5iaW5kKHRoaXMpKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdW5kZWxlZ2F0ZUV2ZW50cygpIHtcbiAgICB0aGlzLiRlbC5vZmYoJy5kZWxlZ2F0ZUV2ZW50cycgKyB0aGlzLmNpZClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgX2Vuc3VyZUVsZW1lbnQoKSB7XG4gICAgaWYgKCF0aGlzLmVsKSB7XG4gICAgICB2YXIgYXR0cnMgPSBhc3NpZ24oe30sIHJlc3VsdCh0aGlzLCAnYXR0cmlidXRlcycpKVxuICAgICAgaWYgKHRoaXMuaWQpIGF0dHJzLmlkID0gcmVzdWx0KHRoaXMsICdpZCcpXG4gICAgICBpZiAodGhpcy5jbGFzc05hbWUpIGF0dHJzWydjbGFzcyddID0gcmVzdWx0KHRoaXMsICdjbGFzc05hbWUnKVxuICAgICAgdmFyICRlbCA9ICQoJzwnICsgcmVzdWx0KHRoaXMsICd0YWdOYW1lJykgKyAnPicpLmF0dHIoYXR0cnMpXG4gICAgICB0aGlzLnNldEVsZW1lbnQoJGVsLCBmYWxzZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRFbGVtZW50KHJlc3VsdCh0aGlzLCAnZWwnKSwgZmFsc2UpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVUlPYmplY3RcbiIsIi8qIFplcHRvIHYxLjEuNC04MC1nYTkxODRiMiAtIHplcHRvIGV2ZW50IGFqYXggY2FsbGJhY2tzIGRlZmVycmVkIHRvdWNoIHNlbGVjdG9yIGllIC0gemVwdG9qcy5jb20vbGljZW5zZSAqL1xudmFyIFplcHRvPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gRCh0KXtyZXR1cm4gbnVsbD09dD9TdHJpbmcodCk6altTLmNhbGwodCldfHxcIm9iamVjdFwifWZ1bmN0aW9uIEwodCl7cmV0dXJuXCJmdW5jdGlvblwiPT1EKHQpfWZ1bmN0aW9uIGsodCl7cmV0dXJuIG51bGwhPXQmJnQ9PXQud2luZG93fWZ1bmN0aW9uIFoodCl7cmV0dXJuIG51bGwhPXQmJnQubm9kZVR5cGU9PXQuRE9DVU1FTlRfTk9ERX1mdW5jdGlvbiAkKHQpe3JldHVyblwib2JqZWN0XCI9PUQodCl9ZnVuY3Rpb24gRih0KXtyZXR1cm4gJCh0KSYmIWsodCkmJk9iamVjdC5nZXRQcm90b3R5cGVPZih0KT09T2JqZWN0LnByb3RvdHlwZX1mdW5jdGlvbiBSKHQpe3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiB0Lmxlbmd0aH1mdW5jdGlvbiBxKHQpe3JldHVybiBzLmNhbGwodCxmdW5jdGlvbih0KXtyZXR1cm4gbnVsbCE9dH0pfWZ1bmN0aW9uIFcodCl7cmV0dXJuIHQubGVuZ3RoPjA/bi5mbi5jb25jYXQuYXBwbHkoW10sdCk6dH1mdW5jdGlvbiB6KHQpe3JldHVybiB0LnJlcGxhY2UoLzo6L2csXCIvXCIpLnJlcGxhY2UoLyhbQS1aXSspKFtBLVpdW2Etel0pL2csXCIkMV8kMlwiKS5yZXBsYWNlKC8oW2EtelxcZF0pKFtBLVpdKS9nLFwiJDFfJDJcIikucmVwbGFjZSgvXy9nLFwiLVwiKS50b0xvd2VyQ2FzZSgpfWZ1bmN0aW9uIEgodCl7cmV0dXJuIHQgaW4gYz9jW3RdOmNbdF09bmV3IFJlZ0V4cChcIihefFxcXFxzKVwiK3QrXCIoXFxcXHN8JClcIil9ZnVuY3Rpb24gXyh0LGUpe3JldHVyblwibnVtYmVyXCIhPXR5cGVvZiBlfHxsW3oodCldP2U6ZStcInB4XCJ9ZnVuY3Rpb24gSSh0KXt2YXIgZSxuO3JldHVybiBmW3RdfHwoZT11LmNyZWF0ZUVsZW1lbnQodCksdS5ib2R5LmFwcGVuZENoaWxkKGUpLG49Z2V0Q29tcHV0ZWRTdHlsZShlLFwiXCIpLmdldFByb3BlcnR5VmFsdWUoXCJkaXNwbGF5XCIpLGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlKSxcIm5vbmVcIj09biYmKG49XCJibG9ja1wiKSxmW3RdPW4pLGZbdF19ZnVuY3Rpb24gVSh0KXtyZXR1cm5cImNoaWxkcmVuXCJpbiB0P2EuY2FsbCh0LmNoaWxkcmVuKTpuLm1hcCh0LmNoaWxkTm9kZXMsZnVuY3Rpb24odCl7cmV0dXJuIDE9PXQubm9kZVR5cGU/dDp2b2lkIDB9KX1mdW5jdGlvbiBYKHQsZSl7dmFyIG4saT10P3QubGVuZ3RoOjA7Zm9yKG49MDtpPm47bisrKXRoaXNbbl09dFtuXTt0aGlzLmxlbmd0aD1pLHRoaXMuc2VsZWN0b3I9ZXx8XCJcIn1mdW5jdGlvbiBCKG4saSxyKXtmb3IoZSBpbiBpKXImJihGKGlbZV0pfHxBKGlbZV0pKT8oRihpW2VdKSYmIUYobltlXSkmJihuW2VdPXt9KSxBKGlbZV0pJiYhQShuW2VdKSYmKG5bZV09W10pLEIobltlXSxpW2VdLHIpKTppW2VdIT09dCYmKG5bZV09aVtlXSl9ZnVuY3Rpb24gVih0LGUpe3JldHVybiBudWxsPT1lP24odCk6bih0KS5maWx0ZXIoZSl9ZnVuY3Rpb24gWSh0LGUsbixpKXtyZXR1cm4gTChlKT9lLmNhbGwodCxuLGkpOmV9ZnVuY3Rpb24gSih0LGUsbil7bnVsbD09bj90LnJlbW92ZUF0dHJpYnV0ZShlKTp0LnNldEF0dHJpYnV0ZShlLG4pfWZ1bmN0aW9uIEcoZSxuKXt2YXIgaT1lLmNsYXNzTmFtZXx8XCJcIixyPWkmJmkuYmFzZVZhbCE9PXQ7cmV0dXJuIG49PT10P3I/aS5iYXNlVmFsOmk6dm9pZChyP2kuYmFzZVZhbD1uOmUuY2xhc3NOYW1lPW4pfWZ1bmN0aW9uIEsodCl7dHJ5e3JldHVybiB0P1widHJ1ZVwiPT10fHwoXCJmYWxzZVwiPT10PyExOlwibnVsbFwiPT10P251bGw6K3QrXCJcIj09dD8rdDovXltcXFtcXHtdLy50ZXN0KHQpP24ucGFyc2VKU09OKHQpOnQpOnR9Y2F0Y2goZSl7cmV0dXJuIHR9fWZ1bmN0aW9uIFEodCxlKXtlKHQpO2Zvcih2YXIgbj0wLGk9dC5jaGlsZE5vZGVzLmxlbmd0aDtpPm47bisrKVEodC5jaGlsZE5vZGVzW25dLGUpfXZhciB0LGUsbixpLE4sUCxyPVtdLG89ci5jb25jYXQscz1yLmZpbHRlcixhPXIuc2xpY2UsdT13aW5kb3cuZG9jdW1lbnQsZj17fSxjPXt9LGw9e1wiY29sdW1uLWNvdW50XCI6MSxjb2x1bW5zOjEsXCJmb250LXdlaWdodFwiOjEsXCJsaW5lLWhlaWdodFwiOjEsb3BhY2l0eToxLFwiei1pbmRleFwiOjEsem9vbToxfSxoPS9eXFxzKjwoXFx3K3whKVtePl0qPi8scD0vXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8sZD0vPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbXFx3Ol0rKVtePl0qKVxcLz4vZ2ksbT0vXig/OmJvZHl8aHRtbCkkL2ksZz0vKFtBLVpdKS9nLHY9W1widmFsXCIsXCJjc3NcIixcImh0bWxcIixcInRleHRcIixcImRhdGFcIixcIndpZHRoXCIsXCJoZWlnaHRcIixcIm9mZnNldFwiXSx5PVtcImFmdGVyXCIsXCJwcmVwZW5kXCIsXCJiZWZvcmVcIixcImFwcGVuZFwiXSx3PXUuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpLHg9dS5jcmVhdGVFbGVtZW50KFwidHJcIiksYj17dHI6dS5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiksdGJvZHk6dyx0aGVhZDp3LHRmb290OncsdGQ6eCx0aDp4LFwiKlwiOnUuY3JlYXRlRWxlbWVudChcImRpdlwiKX0sRT0vY29tcGxldGV8bG9hZGVkfGludGVyYWN0aXZlLyxUPS9eW1xcdy1dKiQvLGo9e30sUz1qLnRvU3RyaW5nLEM9e30sTz11LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksTT17dGFiaW5kZXg6XCJ0YWJJbmRleFwiLHJlYWRvbmx5OlwicmVhZE9ubHlcIixcImZvclwiOlwiaHRtbEZvclwiLFwiY2xhc3NcIjpcImNsYXNzTmFtZVwiLG1heGxlbmd0aDpcIm1heExlbmd0aFwiLGNlbGxzcGFjaW5nOlwiY2VsbFNwYWNpbmdcIixjZWxscGFkZGluZzpcImNlbGxQYWRkaW5nXCIscm93c3BhbjpcInJvd1NwYW5cIixjb2xzcGFuOlwiY29sU3BhblwiLHVzZW1hcDpcInVzZU1hcFwiLGZyYW1lYm9yZGVyOlwiZnJhbWVCb3JkZXJcIixjb250ZW50ZWRpdGFibGU6XCJjb250ZW50RWRpdGFibGVcIn0sQT1BcnJheS5pc0FycmF5fHxmdW5jdGlvbih0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIEFycmF5fTtyZXR1cm4gQy5tYXRjaGVzPWZ1bmN0aW9uKHQsZSl7aWYoIWV8fCF0fHwxIT09dC5ub2RlVHlwZSlyZXR1cm4hMTt2YXIgbj10LndlYmtpdE1hdGNoZXNTZWxlY3Rvcnx8dC5tb3pNYXRjaGVzU2VsZWN0b3J8fHQub01hdGNoZXNTZWxlY3Rvcnx8dC5tYXRjaGVzU2VsZWN0b3I7aWYobilyZXR1cm4gbi5jYWxsKHQsZSk7dmFyIGkscj10LnBhcmVudE5vZGUsbz0hcjtyZXR1cm4gbyYmKHI9TykuYXBwZW5kQ2hpbGQodCksaT1+Qy5xc2EocixlKS5pbmRleE9mKHQpLG8mJk8ucmVtb3ZlQ2hpbGQodCksaX0sTj1mdW5jdGlvbih0KXtyZXR1cm4gdC5yZXBsYWNlKC8tKyguKT8vZyxmdW5jdGlvbih0LGUpe3JldHVybiBlP2UudG9VcHBlckNhc2UoKTpcIlwifSl9LFA9ZnVuY3Rpb24odCl7cmV0dXJuIHMuY2FsbCh0LGZ1bmN0aW9uKGUsbil7cmV0dXJuIHQuaW5kZXhPZihlKT09bn0pfSxDLmZyYWdtZW50PWZ1bmN0aW9uKGUsaSxyKXt2YXIgbyxzLGY7cmV0dXJuIHAudGVzdChlKSYmKG89bih1LmNyZWF0ZUVsZW1lbnQoUmVnRXhwLiQxKSkpLG98fChlLnJlcGxhY2UmJihlPWUucmVwbGFjZShkLFwiPCQxPjwvJDI+XCIpKSxpPT09dCYmKGk9aC50ZXN0KGUpJiZSZWdFeHAuJDEpLGkgaW4gYnx8KGk9XCIqXCIpLGY9YltpXSxmLmlubmVySFRNTD1cIlwiK2Usbz1uLmVhY2goYS5jYWxsKGYuY2hpbGROb2RlcyksZnVuY3Rpb24oKXtmLnJlbW92ZUNoaWxkKHRoaXMpfSkpLEYocikmJihzPW4obyksbi5lYWNoKHIsZnVuY3Rpb24odCxlKXt2LmluZGV4T2YodCk+LTE/c1t0XShlKTpzLmF0dHIodCxlKX0pKSxvfSxDLlo9ZnVuY3Rpb24odCxlKXtyZXR1cm4gbmV3IFgodCxlKX0sQy5pc1o9ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBDLlp9LEMuaW5pdD1mdW5jdGlvbihlLGkpe3ZhciByO2lmKCFlKXJldHVybiBDLlooKTtpZihcInN0cmluZ1wiPT10eXBlb2YgZSlpZihlPWUudHJpbSgpLFwiPFwiPT1lWzBdJiZoLnRlc3QoZSkpcj1DLmZyYWdtZW50KGUsUmVnRXhwLiQxLGkpLGU9bnVsbDtlbHNle2lmKGkhPT10KXJldHVybiBuKGkpLmZpbmQoZSk7cj1DLnFzYSh1LGUpfWVsc2V7aWYoTChlKSlyZXR1cm4gbih1KS5yZWFkeShlKTtpZihDLmlzWihlKSlyZXR1cm4gZTtpZihBKGUpKXI9cShlKTtlbHNlIGlmKCQoZSkpcj1bZV0sZT1udWxsO2Vsc2UgaWYoaC50ZXN0KGUpKXI9Qy5mcmFnbWVudChlLnRyaW0oKSxSZWdFeHAuJDEsaSksZT1udWxsO2Vsc2V7aWYoaSE9PXQpcmV0dXJuIG4oaSkuZmluZChlKTtyPUMucXNhKHUsZSl9fXJldHVybiBDLloocixlKX0sbj1mdW5jdGlvbih0LGUpe3JldHVybiBDLmluaXQodCxlKX0sbi5leHRlbmQ9ZnVuY3Rpb24odCl7dmFyIGUsbj1hLmNhbGwoYXJndW1lbnRzLDEpO3JldHVyblwiYm9vbGVhblwiPT10eXBlb2YgdCYmKGU9dCx0PW4uc2hpZnQoKSksbi5mb3JFYWNoKGZ1bmN0aW9uKG4pe0IodCxuLGUpfSksdH0sQy5xc2E9ZnVuY3Rpb24odCxlKXt2YXIgbixpPVwiI1wiPT1lWzBdLHI9IWkmJlwiLlwiPT1lWzBdLG89aXx8cj9lLnNsaWNlKDEpOmUscz1ULnRlc3Qobyk7cmV0dXJuIHQuZ2V0RWxlbWVudEJ5SWQmJnMmJmk/KG49dC5nZXRFbGVtZW50QnlJZChvKSk/W25dOltdOjEhPT10Lm5vZGVUeXBlJiY5IT09dC5ub2RlVHlwZSYmMTEhPT10Lm5vZGVUeXBlP1tdOmEuY2FsbChzJiYhaSYmdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lP3I/dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG8pOnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSk6dC5xdWVyeVNlbGVjdG9yQWxsKGUpKX0sbi5jb250YWlucz11LmRvY3VtZW50RWxlbWVudC5jb250YWlucz9mdW5jdGlvbih0LGUpe3JldHVybiB0IT09ZSYmdC5jb250YWlucyhlKX06ZnVuY3Rpb24odCxlKXtmb3IoO2UmJihlPWUucGFyZW50Tm9kZSk7KWlmKGU9PT10KXJldHVybiEwO3JldHVybiExfSxuLnR5cGU9RCxuLmlzRnVuY3Rpb249TCxuLmlzV2luZG93PWssbi5pc0FycmF5PUEsbi5pc1BsYWluT2JqZWN0PUYsbi5pc0VtcHR5T2JqZWN0PWZ1bmN0aW9uKHQpe3ZhciBlO2ZvcihlIGluIHQpcmV0dXJuITE7cmV0dXJuITB9LG4uaW5BcnJheT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHIuaW5kZXhPZi5jYWxsKGUsdCxuKX0sbi5jYW1lbENhc2U9TixuLnRyaW09ZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXQ/XCJcIjpTdHJpbmcucHJvdG90eXBlLnRyaW0uY2FsbCh0KX0sbi51dWlkPTAsbi5zdXBwb3J0PXt9LG4uZXhwcj17fSxuLm5vb3A9ZnVuY3Rpb24oKXt9LG4ubWFwPWZ1bmN0aW9uKHQsZSl7dmFyIG4scixvLGk9W107aWYoUih0KSlmb3Iocj0wO3I8dC5sZW5ndGg7cisrKW49ZSh0W3JdLHIpLG51bGwhPW4mJmkucHVzaChuKTtlbHNlIGZvcihvIGluIHQpbj1lKHRbb10sbyksbnVsbCE9biYmaS5wdXNoKG4pO3JldHVybiBXKGkpfSxuLmVhY2g9ZnVuY3Rpb24odCxlKXt2YXIgbixpO2lmKFIodCkpe2ZvcihuPTA7bjx0Lmxlbmd0aDtuKyspaWYoZS5jYWxsKHRbbl0sbix0W25dKT09PSExKXJldHVybiB0fWVsc2UgZm9yKGkgaW4gdClpZihlLmNhbGwodFtpXSxpLHRbaV0pPT09ITEpcmV0dXJuIHQ7cmV0dXJuIHR9LG4uZ3JlcD1mdW5jdGlvbih0LGUpe3JldHVybiBzLmNhbGwodCxlKX0sd2luZG93LkpTT04mJihuLnBhcnNlSlNPTj1KU09OLnBhcnNlKSxuLmVhY2goXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yXCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKHQsZSl7altcIltvYmplY3QgXCIrZStcIl1cIl09ZS50b0xvd2VyQ2FzZSgpfSksbi5mbj17Y29uc3RydWN0b3I6Qy5aLGxlbmd0aDowLGZvckVhY2g6ci5mb3JFYWNoLHJlZHVjZTpyLnJlZHVjZSxwdXNoOnIucHVzaCxzb3J0OnIuc29ydCxzcGxpY2U6ci5zcGxpY2UsaW5kZXhPZjpyLmluZGV4T2YsY29uY2F0OmZ1bmN0aW9uKCl7dmFyIHQsZSxuPVtdO2Zvcih0PTA7dDxhcmd1bWVudHMubGVuZ3RoO3QrKyllPWFyZ3VtZW50c1t0XSxuW3RdPUMuaXNaKGUpP2UudG9BcnJheSgpOmU7cmV0dXJuIG8uYXBwbHkoQy5pc1oodGhpcyk/dGhpcy50b0FycmF5KCk6dGhpcyxuKX0sbWFwOmZ1bmN0aW9uKHQpe3JldHVybiBuKG4ubWFwKHRoaXMsZnVuY3Rpb24oZSxuKXtyZXR1cm4gdC5jYWxsKGUsbixlKX0pKX0sc2xpY2U6ZnVuY3Rpb24oKXtyZXR1cm4gbihhLmFwcGx5KHRoaXMsYXJndW1lbnRzKSl9LHJlYWR5OmZ1bmN0aW9uKHQpe3JldHVybiBFLnRlc3QodS5yZWFkeVN0YXRlKSYmdS5ib2R5P3Qobik6dS5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKCl7dChuKX0sITEpLHRoaXN9LGdldDpmdW5jdGlvbihlKXtyZXR1cm4gZT09PXQ/YS5jYWxsKHRoaXMpOnRoaXNbZT49MD9lOmUrdGhpcy5sZW5ndGhdfSx0b0FycmF5OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KCl9LHNpemU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sZW5ndGh9LHJlbW92ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtudWxsIT10aGlzLnBhcmVudE5vZGUmJnRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKX0pfSxlYWNoOmZ1bmN0aW9uKHQpe3JldHVybiByLmV2ZXJ5LmNhbGwodGhpcyxmdW5jdGlvbihlLG4pe3JldHVybiB0LmNhbGwoZSxuLGUpIT09ITF9KSx0aGlzfSxmaWx0ZXI6ZnVuY3Rpb24odCl7cmV0dXJuIEwodCk/dGhpcy5ub3QodGhpcy5ub3QodCkpOm4ocy5jYWxsKHRoaXMsZnVuY3Rpb24oZSl7cmV0dXJuIEMubWF0Y2hlcyhlLHQpfSkpfSxhZGQ6ZnVuY3Rpb24odCxlKXtyZXR1cm4gbihQKHRoaXMuY29uY2F0KG4odCxlKSkpKX0saXM6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMubGVuZ3RoPjAmJkMubWF0Y2hlcyh0aGlzWzBdLHQpfSxub3Q6ZnVuY3Rpb24oZSl7dmFyIGk9W107aWYoTChlKSYmZS5jYWxsIT09dCl0aGlzLmVhY2goZnVuY3Rpb24odCl7ZS5jYWxsKHRoaXMsdCl8fGkucHVzaCh0aGlzKX0pO2Vsc2V7dmFyIHI9XCJzdHJpbmdcIj09dHlwZW9mIGU/dGhpcy5maWx0ZXIoZSk6UihlKSYmTChlLml0ZW0pP2EuY2FsbChlKTpuKGUpO3RoaXMuZm9yRWFjaChmdW5jdGlvbih0KXtyLmluZGV4T2YodCk8MCYmaS5wdXNoKHQpfSl9cmV0dXJuIG4oaSl9LGhhczpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oKXtyZXR1cm4gJCh0KT9uLmNvbnRhaW5zKHRoaXMsdCk6bih0aGlzKS5maW5kKHQpLnNpemUoKX0pfSxlcTpmdW5jdGlvbih0KXtyZXR1cm4tMT09PXQ/dGhpcy5zbGljZSh0KTp0aGlzLnNsaWNlKHQsK3QrMSl9LGZpcnN0OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpc1swXTtyZXR1cm4gdCYmISQodCk/dDpuKHQpfSxsYXN0OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpc1t0aGlzLmxlbmd0aC0xXTtyZXR1cm4gdCYmISQodCk/dDpuKHQpfSxmaW5kOmZ1bmN0aW9uKHQpe3ZhciBlLGk9dGhpcztyZXR1cm4gZT10P1wib2JqZWN0XCI9PXR5cGVvZiB0P24odCkuZmlsdGVyKGZ1bmN0aW9uKCl7dmFyIHQ9dGhpcztyZXR1cm4gci5zb21lLmNhbGwoaSxmdW5jdGlvbihlKXtyZXR1cm4gbi5jb250YWlucyhlLHQpfSl9KToxPT10aGlzLmxlbmd0aD9uKEMucXNhKHRoaXNbMF0sdCkpOnRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIEMucXNhKHRoaXMsdCl9KTpuKCl9LGNsb3Nlc3Q6ZnVuY3Rpb24odCxlKXt2YXIgaT10aGlzWzBdLHI9ITE7Zm9yKFwib2JqZWN0XCI9PXR5cGVvZiB0JiYocj1uKHQpKTtpJiYhKHI/ci5pbmRleE9mKGkpPj0wOkMubWF0Y2hlcyhpLHQpKTspaT1pIT09ZSYmIVooaSkmJmkucGFyZW50Tm9kZTtyZXR1cm4gbihpKX0scGFyZW50czpmdW5jdGlvbih0KXtmb3IodmFyIGU9W10saT10aGlzO2kubGVuZ3RoPjA7KWk9bi5tYXAoaSxmdW5jdGlvbih0KXtyZXR1cm4odD10LnBhcmVudE5vZGUpJiYhWih0KSYmZS5pbmRleE9mKHQpPDA/KGUucHVzaCh0KSx0KTp2b2lkIDB9KTtyZXR1cm4gVihlLHQpfSxwYXJlbnQ6ZnVuY3Rpb24odCl7cmV0dXJuIFYoUCh0aGlzLnBsdWNrKFwicGFyZW50Tm9kZVwiKSksdCl9LGNoaWxkcmVuOmZ1bmN0aW9uKHQpe3JldHVybiBWKHRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIFUodGhpcyl9KSx0KX0sY29udGVudHM6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZW50RG9jdW1lbnR8fGEuY2FsbCh0aGlzLmNoaWxkTm9kZXMpfSl9LHNpYmxpbmdzOmZ1bmN0aW9uKHQpe3JldHVybiBWKHRoaXMubWFwKGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHMuY2FsbChVKGUucGFyZW50Tm9kZSksZnVuY3Rpb24odCl7cmV0dXJuIHQhPT1lfSl9KSx0KX0sZW1wdHk6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dGhpcy5pbm5lckhUTUw9XCJcIn0pfSxwbHVjazpmdW5jdGlvbih0KXtyZXR1cm4gbi5tYXAodGhpcyxmdW5jdGlvbihlKXtyZXR1cm4gZVt0XX0pfSxzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1wibm9uZVwiPT10aGlzLnN0eWxlLmRpc3BsYXkmJih0aGlzLnN0eWxlLmRpc3BsYXk9XCJcIiksXCJub25lXCI9PWdldENvbXB1dGVkU3R5bGUodGhpcyxcIlwiKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZGlzcGxheVwiKSYmKHRoaXMuc3R5bGUuZGlzcGxheT1JKHRoaXMubm9kZU5hbWUpKX0pfSxyZXBsYWNlV2l0aDpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5iZWZvcmUodCkucmVtb3ZlKCl9LHdyYXA6ZnVuY3Rpb24odCl7dmFyIGU9TCh0KTtpZih0aGlzWzBdJiYhZSl2YXIgaT1uKHQpLmdldCgwKSxyPWkucGFyZW50Tm9kZXx8dGhpcy5sZW5ndGg+MTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKG8pe24odGhpcykud3JhcEFsbChlP3QuY2FsbCh0aGlzLG8pOnI/aS5jbG9uZU5vZGUoITApOmkpfSl9LHdyYXBBbGw6ZnVuY3Rpb24odCl7aWYodGhpc1swXSl7bih0aGlzWzBdKS5iZWZvcmUodD1uKHQpKTtmb3IodmFyIGU7KGU9dC5jaGlsZHJlbigpKS5sZW5ndGg7KXQ9ZS5maXJzdCgpO24odCkuYXBwZW5kKHRoaXMpfXJldHVybiB0aGlzfSx3cmFwSW5uZXI6ZnVuY3Rpb24odCl7dmFyIGU9TCh0KTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGkpe3ZhciByPW4odGhpcyksbz1yLmNvbnRlbnRzKCkscz1lP3QuY2FsbCh0aGlzLGkpOnQ7by5sZW5ndGg/by53cmFwQWxsKHMpOnIuYXBwZW5kKHMpfSl9LHVud3JhcDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnBhcmVudCgpLmVhY2goZnVuY3Rpb24oKXtuKHRoaXMpLnJlcGxhY2VXaXRoKG4odGhpcykuY2hpbGRyZW4oKSl9KSx0aGlzfSxjbG9uZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiB0aGlzLmNsb25lTm9kZSghMCl9KX0saGlkZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIil9LHRvZ2dsZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGk9bih0aGlzKTsoZT09PXQ/XCJub25lXCI9PWkuY3NzKFwiZGlzcGxheVwiKTplKT9pLnNob3coKTppLmhpZGUoKX0pfSxwcmV2OmZ1bmN0aW9uKHQpe3JldHVybiBuKHRoaXMucGx1Y2soXCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nXCIpKS5maWx0ZXIodHx8XCIqXCIpfSxuZXh0OmZ1bmN0aW9uKHQpe3JldHVybiBuKHRoaXMucGx1Y2soXCJuZXh0RWxlbWVudFNpYmxpbmdcIikpLmZpbHRlcih0fHxcIipcIil9LGh0bWw6ZnVuY3Rpb24odCl7cmV0dXJuIDAgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihlKXt2YXIgaT10aGlzLmlubmVySFRNTDtuKHRoaXMpLmVtcHR5KCkuYXBwZW5kKFkodGhpcyx0LGUsaSkpfSk6MCBpbiB0aGlzP3RoaXNbMF0uaW5uZXJIVE1MOm51bGx9LHRleHQ6ZnVuY3Rpb24odCl7cmV0dXJuIDAgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihlKXt2YXIgbj1ZKHRoaXMsdCxlLHRoaXMudGV4dENvbnRlbnQpO3RoaXMudGV4dENvbnRlbnQ9bnVsbD09bj9cIlwiOlwiXCIrbn0pOjAgaW4gdGhpcz90aGlzWzBdLnRleHRDb250ZW50Om51bGx9LGF0dHI6ZnVuY3Rpb24obixpKXt2YXIgcjtyZXR1cm5cInN0cmluZ1wiIT10eXBlb2Ygbnx8MSBpbiBhcmd1bWVudHM/dGhpcy5lYWNoKGZ1bmN0aW9uKHQpe2lmKDE9PT10aGlzLm5vZGVUeXBlKWlmKCQobikpZm9yKGUgaW4gbilKKHRoaXMsZSxuW2VdKTtlbHNlIEoodGhpcyxuLFkodGhpcyxpLHQsdGhpcy5nZXRBdHRyaWJ1dGUobikpKX0pOnRoaXMubGVuZ3RoJiYxPT09dGhpc1swXS5ub2RlVHlwZT8hKHI9dGhpc1swXS5nZXRBdHRyaWJ1dGUobikpJiZuIGluIHRoaXNbMF0/dGhpc1swXVtuXTpyOnR9LHJlbW92ZUF0dHI6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpezE9PT10aGlzLm5vZGVUeXBlJiZ0LnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe0oodGhpcyx0KX0sdGhpcyl9KX0scHJvcDpmdW5jdGlvbih0LGUpe3JldHVybiB0PU1bdF18fHQsMSBpbiBhcmd1bWVudHM/dGhpcy5lYWNoKGZ1bmN0aW9uKG4pe3RoaXNbdF09WSh0aGlzLGUsbix0aGlzW3RdKX0pOnRoaXNbMF0mJnRoaXNbMF1bdF19LGRhdGE6ZnVuY3Rpb24oZSxuKXt2YXIgaT1cImRhdGEtXCIrZS5yZXBsYWNlKGcsXCItJDFcIikudG9Mb3dlckNhc2UoKSxyPTEgaW4gYXJndW1lbnRzP3RoaXMuYXR0cihpLG4pOnRoaXMuYXR0cihpKTtyZXR1cm4gbnVsbCE9PXI/SyhyKTp0fSx2YWw6ZnVuY3Rpb24odCl7cmV0dXJuIDAgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihlKXt0aGlzLnZhbHVlPVkodGhpcyx0LGUsdGhpcy52YWx1ZSl9KTp0aGlzWzBdJiYodGhpc1swXS5tdWx0aXBsZT9uKHRoaXNbMF0pLmZpbmQoXCJvcHRpb25cIikuZmlsdGVyKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2VsZWN0ZWR9KS5wbHVjayhcInZhbHVlXCIpOnRoaXNbMF0udmFsdWUpfSxvZmZzZXQ6ZnVuY3Rpb24odCl7aWYodClyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGUpe3ZhciBpPW4odGhpcykscj1ZKHRoaXMsdCxlLGkub2Zmc2V0KCkpLG89aS5vZmZzZXRQYXJlbnQoKS5vZmZzZXQoKSxzPXt0b3A6ci50b3Atby50b3AsbGVmdDpyLmxlZnQtby5sZWZ0fTtcInN0YXRpY1wiPT1pLmNzcyhcInBvc2l0aW9uXCIpJiYocy5wb3NpdGlvbj1cInJlbGF0aXZlXCIpLGkuY3NzKHMpfSk7aWYoIXRoaXMubGVuZ3RoKXJldHVybiBudWxsO2lmKCFuLmNvbnRhaW5zKHUuZG9jdW1lbnRFbGVtZW50LHRoaXNbMF0pKXJldHVybnt0b3A6MCxsZWZ0OjB9O3ZhciBlPXRoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cmV0dXJue2xlZnQ6ZS5sZWZ0K3dpbmRvdy5wYWdlWE9mZnNldCx0b3A6ZS50b3Ard2luZG93LnBhZ2VZT2Zmc2V0LHdpZHRoOk1hdGgucm91bmQoZS53aWR0aCksaGVpZ2h0Ok1hdGgucm91bmQoZS5oZWlnaHQpfX0sY3NzOmZ1bmN0aW9uKHQsaSl7aWYoYXJndW1lbnRzLmxlbmd0aDwyKXt2YXIgcixvPXRoaXNbMF07aWYoIW8pcmV0dXJuO2lmKHI9Z2V0Q29tcHV0ZWRTdHlsZShvLFwiXCIpLFwic3RyaW5nXCI9PXR5cGVvZiB0KXJldHVybiBvLnN0eWxlW04odCldfHxyLmdldFByb3BlcnR5VmFsdWUodCk7aWYoQSh0KSl7dmFyIHM9e307cmV0dXJuIG4uZWFjaCh0LGZ1bmN0aW9uKHQsZSl7c1tlXT1vLnN0eWxlW04oZSldfHxyLmdldFByb3BlcnR5VmFsdWUoZSl9KSxzfX12YXIgYT1cIlwiO2lmKFwic3RyaW5nXCI9PUQodCkpaXx8MD09PWk/YT16KHQpK1wiOlwiK18odCxpKTp0aGlzLmVhY2goZnVuY3Rpb24oKXt0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KHoodCkpfSk7ZWxzZSBmb3IoZSBpbiB0KXRbZV18fDA9PT10W2VdP2ErPXooZSkrXCI6XCIrXyhlLHRbZV0pK1wiO1wiOnRoaXMuZWFjaChmdW5jdGlvbigpe3RoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkoeihlKSl9KTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dGhpcy5zdHlsZS5jc3NUZXh0Kz1cIjtcIithfSl9LGluZGV4OmZ1bmN0aW9uKHQpe3JldHVybiB0P3RoaXMuaW5kZXhPZihuKHQpWzBdKTp0aGlzLnBhcmVudCgpLmNoaWxkcmVuKCkuaW5kZXhPZih0aGlzWzBdKX0saGFzQ2xhc3M6ZnVuY3Rpb24odCl7cmV0dXJuIHQ/ci5zb21lLmNhbGwodGhpcyxmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy50ZXN0KEcodCkpfSxIKHQpKTohMX0sYWRkQ2xhc3M6ZnVuY3Rpb24odCl7cmV0dXJuIHQ/dGhpcy5lYWNoKGZ1bmN0aW9uKGUpe2lmKFwiY2xhc3NOYW1lXCJpbiB0aGlzKXtpPVtdO3ZhciByPUcodGhpcyksbz1ZKHRoaXMsdCxlLHIpO28uc3BsaXQoL1xccysvZykuZm9yRWFjaChmdW5jdGlvbih0KXtuKHRoaXMpLmhhc0NsYXNzKHQpfHxpLnB1c2godCl9LHRoaXMpLGkubGVuZ3RoJiZHKHRoaXMscisocj9cIiBcIjpcIlwiKStpLmpvaW4oXCIgXCIpKX19KTp0aGlzfSxyZW1vdmVDbGFzczpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKG4pe2lmKFwiY2xhc3NOYW1lXCJpbiB0aGlzKXtpZihlPT09dClyZXR1cm4gRyh0aGlzLFwiXCIpO2k9Ryh0aGlzKSxZKHRoaXMsZSxuLGkpLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24odCl7aT1pLnJlcGxhY2UoSCh0KSxcIiBcIil9KSxHKHRoaXMsaS50cmltKCkpfX0pfSx0b2dnbGVDbGFzczpmdW5jdGlvbihlLGkpe3JldHVybiBlP3RoaXMuZWFjaChmdW5jdGlvbihyKXt2YXIgbz1uKHRoaXMpLHM9WSh0aGlzLGUscixHKHRoaXMpKTtzLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oZSl7KGk9PT10PyFvLmhhc0NsYXNzKGUpOmkpP28uYWRkQ2xhc3MoZSk6by5yZW1vdmVDbGFzcyhlKX0pfSk6dGhpc30sc2Nyb2xsVG9wOmZ1bmN0aW9uKGUpe2lmKHRoaXMubGVuZ3RoKXt2YXIgbj1cInNjcm9sbFRvcFwiaW4gdGhpc1swXTtyZXR1cm4gZT09PXQ/bj90aGlzWzBdLnNjcm9sbFRvcDp0aGlzWzBdLnBhZ2VZT2Zmc2V0OnRoaXMuZWFjaChuP2Z1bmN0aW9uKCl7dGhpcy5zY3JvbGxUb3A9ZX06ZnVuY3Rpb24oKXt0aGlzLnNjcm9sbFRvKHRoaXMuc2Nyb2xsWCxlKX0pfX0sc2Nyb2xsTGVmdDpmdW5jdGlvbihlKXtpZih0aGlzLmxlbmd0aCl7dmFyIG49XCJzY3JvbGxMZWZ0XCJpbiB0aGlzWzBdO3JldHVybiBlPT09dD9uP3RoaXNbMF0uc2Nyb2xsTGVmdDp0aGlzWzBdLnBhZ2VYT2Zmc2V0OnRoaXMuZWFjaChuP2Z1bmN0aW9uKCl7dGhpcy5zY3JvbGxMZWZ0PWV9OmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxUbyhlLHRoaXMuc2Nyb2xsWSl9KX19LHBvc2l0aW9uOmZ1bmN0aW9uKCl7aWYodGhpcy5sZW5ndGgpe3ZhciB0PXRoaXNbMF0sZT10aGlzLm9mZnNldFBhcmVudCgpLGk9dGhpcy5vZmZzZXQoKSxyPW0udGVzdChlWzBdLm5vZGVOYW1lKT97dG9wOjAsbGVmdDowfTplLm9mZnNldCgpO3JldHVybiBpLnRvcC09cGFyc2VGbG9hdChuKHQpLmNzcyhcIm1hcmdpbi10b3BcIikpfHwwLGkubGVmdC09cGFyc2VGbG9hdChuKHQpLmNzcyhcIm1hcmdpbi1sZWZ0XCIpKXx8MCxyLnRvcCs9cGFyc2VGbG9hdChuKGVbMF0pLmNzcyhcImJvcmRlci10b3Atd2lkdGhcIikpfHwwLHIubGVmdCs9cGFyc2VGbG9hdChuKGVbMF0pLmNzcyhcImJvcmRlci1sZWZ0LXdpZHRoXCIpKXx8MCx7dG9wOmkudG9wLXIudG9wLGxlZnQ6aS5sZWZ0LXIubGVmdH19fSxvZmZzZXRQYXJlbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXtmb3IodmFyIHQ9dGhpcy5vZmZzZXRQYXJlbnR8fHUuYm9keTt0JiYhbS50ZXN0KHQubm9kZU5hbWUpJiZcInN0YXRpY1wiPT1uKHQpLmNzcyhcInBvc2l0aW9uXCIpOyl0PXQub2Zmc2V0UGFyZW50O3JldHVybiB0fSl9fSxuLmZuLmRldGFjaD1uLmZuLnJlbW92ZSxbXCJ3aWR0aFwiLFwiaGVpZ2h0XCJdLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIGk9ZS5yZXBsYWNlKC8uLyxmdW5jdGlvbih0KXtyZXR1cm4gdFswXS50b1VwcGVyQ2FzZSgpfSk7bi5mbltlXT1mdW5jdGlvbihyKXt2YXIgbyxzPXRoaXNbMF07cmV0dXJuIHI9PT10P2socyk/c1tcImlubmVyXCIraV06WihzKT9zLmRvY3VtZW50RWxlbWVudFtcInNjcm9sbFwiK2ldOihvPXRoaXMub2Zmc2V0KCkpJiZvW2VdOnRoaXMuZWFjaChmdW5jdGlvbih0KXtzPW4odGhpcykscy5jc3MoZSxZKHRoaXMscix0LHNbZV0oKSkpfSl9fSkseS5mb3JFYWNoKGZ1bmN0aW9uKHQsZSl7dmFyIGk9ZSUyO24uZm5bdF09ZnVuY3Rpb24oKXt2YXIgdCxvLHI9bi5tYXAoYXJndW1lbnRzLGZ1bmN0aW9uKGUpe3JldHVybiB0PUQoZSksXCJvYmplY3RcIj09dHx8XCJhcnJheVwiPT10fHxudWxsPT1lP2U6Qy5mcmFnbWVudChlKX0pLHM9dGhpcy5sZW5ndGg+MTtyZXR1cm4gci5sZW5ndGg8MT90aGlzOnRoaXMuZWFjaChmdW5jdGlvbih0LGEpe289aT9hOmEucGFyZW50Tm9kZSxhPTA9PWU/YS5uZXh0U2libGluZzoxPT1lP2EuZmlyc3RDaGlsZDoyPT1lP2E6bnVsbDt2YXIgZj1uLmNvbnRhaW5zKHUuZG9jdW1lbnRFbGVtZW50LG8pO3IuZm9yRWFjaChmdW5jdGlvbih0KXtpZihzKXQ9dC5jbG9uZU5vZGUoITApO2Vsc2UgaWYoIW8pcmV0dXJuIG4odCkucmVtb3ZlKCk7by5pbnNlcnRCZWZvcmUodCxhKSxmJiZRKHQsZnVuY3Rpb24odCl7bnVsbD09dC5ub2RlTmFtZXx8XCJTQ1JJUFRcIiE9PXQubm9kZU5hbWUudG9VcHBlckNhc2UoKXx8dC50eXBlJiZcInRleHQvamF2YXNjcmlwdFwiIT09dC50eXBlfHx0LnNyY3x8d2luZG93LmV2YWwuY2FsbCh3aW5kb3csdC5pbm5lckhUTUwpfSl9KX0pfSxuLmZuW2k/dCtcIlRvXCI6XCJpbnNlcnRcIisoZT9cIkJlZm9yZVwiOlwiQWZ0ZXJcIildPWZ1bmN0aW9uKGUpe3JldHVybiBuKGUpW3RdKHRoaXMpLHRoaXN9fSksQy5aLnByb3RvdHlwZT1YLnByb3RvdHlwZT1uLmZuLEMudW5pcT1QLEMuZGVzZXJpYWxpemVWYWx1ZT1LLG4uemVwdG89QyxufSgpO3dpbmRvdy5aZXB0bz1aZXB0byx2b2lkIDA9PT13aW5kb3cuJCYmKHdpbmRvdy4kPVplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiBsKHQpe3JldHVybiB0Ll96aWR8fCh0Ll96aWQ9ZSsrKX1mdW5jdGlvbiBoKHQsZSxuLGkpe2lmKGU9cChlKSxlLm5zKXZhciByPWQoZS5ucyk7cmV0dXJuKHNbbCh0KV18fFtdKS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuISghdHx8ZS5lJiZ0LmUhPWUuZXx8ZS5ucyYmIXIudGVzdCh0Lm5zKXx8biYmbCh0LmZuKSE9PWwobil8fGkmJnQuc2VsIT1pKX0pfWZ1bmN0aW9uIHAodCl7dmFyIGU9KFwiXCIrdCkuc3BsaXQoXCIuXCIpO3JldHVybntlOmVbMF0sbnM6ZS5zbGljZSgxKS5zb3J0KCkuam9pbihcIiBcIil9fWZ1bmN0aW9uIGQodCl7cmV0dXJuIG5ldyBSZWdFeHAoXCIoPzpefCApXCIrdC5yZXBsYWNlKFwiIFwiLFwiIC4qID9cIikrXCIoPzogfCQpXCIpfWZ1bmN0aW9uIG0odCxlKXtyZXR1cm4gdC5kZWwmJiF1JiZ0LmUgaW4gZnx8ISFlfWZ1bmN0aW9uIGcodCl7cmV0dXJuIGNbdF18fHUmJmZbdF18fHR9ZnVuY3Rpb24gdihlLGkscixvLGEsdSxmKXt2YXIgaD1sKGUpLGQ9c1toXXx8KHNbaF09W10pO2kuc3BsaXQoL1xccy8pLmZvckVhY2goZnVuY3Rpb24oaSl7aWYoXCJyZWFkeVwiPT1pKXJldHVybiB0KGRvY3VtZW50KS5yZWFkeShyKTt2YXIgcz1wKGkpO3MuZm49cixzLnNlbD1hLHMuZSBpbiBjJiYocj1mdW5jdGlvbihlKXt2YXIgbj1lLnJlbGF0ZWRUYXJnZXQ7cmV0dXJuIW58fG4hPT10aGlzJiYhdC5jb250YWlucyh0aGlzLG4pP3MuZm4uYXBwbHkodGhpcyxhcmd1bWVudHMpOnZvaWQgMH0pLHMuZGVsPXU7dmFyIGw9dXx8cjtzLnByb3h5PWZ1bmN0aW9uKHQpe2lmKHQ9VCh0KSwhdC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpKXt0LmRhdGE9bzt2YXIgaT1sLmFwcGx5KGUsdC5fYXJncz09bj9bdF06W3RdLmNvbmNhdCh0Ll9hcmdzKSk7cmV0dXJuIGk9PT0hMSYmKHQucHJldmVudERlZmF1bHQoKSx0LnN0b3BQcm9wYWdhdGlvbigpKSxpfX0scy5pPWQubGVuZ3RoLGQucHVzaChzKSxcImFkZEV2ZW50TGlzdGVuZXJcImluIGUmJmUuYWRkRXZlbnRMaXN0ZW5lcihnKHMuZSkscy5wcm94eSxtKHMsZikpfSl9ZnVuY3Rpb24geSh0LGUsbixpLHIpe3ZhciBvPWwodCk7KGV8fFwiXCIpLnNwbGl0KC9cXHMvKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2godCxlLG4saSkuZm9yRWFjaChmdW5jdGlvbihlKXtkZWxldGUgc1tvXVtlLmldLFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiaW4gdCYmdC5yZW1vdmVFdmVudExpc3RlbmVyKGcoZS5lKSxlLnByb3h5LG0oZSxyKSl9KX0pfWZ1bmN0aW9uIFQoZSxpKXtyZXR1cm4oaXx8IWUuaXNEZWZhdWx0UHJldmVudGVkKSYmKGl8fChpPWUpLHQuZWFjaChFLGZ1bmN0aW9uKHQsbil7dmFyIHI9aVt0XTtlW3RdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXNbbl09dyxyJiZyLmFwcGx5KGksYXJndW1lbnRzKX0sZVtuXT14fSksKGkuZGVmYXVsdFByZXZlbnRlZCE9PW4/aS5kZWZhdWx0UHJldmVudGVkOlwicmV0dXJuVmFsdWVcImluIGk/aS5yZXR1cm5WYWx1ZT09PSExOmkuZ2V0UHJldmVudERlZmF1bHQmJmkuZ2V0UHJldmVudERlZmF1bHQoKSkmJihlLmlzRGVmYXVsdFByZXZlbnRlZD13KSksZX1mdW5jdGlvbiBqKHQpe3ZhciBlLGk9e29yaWdpbmFsRXZlbnQ6dH07Zm9yKGUgaW4gdCliLnRlc3QoZSl8fHRbZV09PT1ufHwoaVtlXT10W2VdKTtyZXR1cm4gVChpLHQpfXZhciBuLGU9MSxpPUFycmF5LnByb3RvdHlwZS5zbGljZSxyPXQuaXNGdW5jdGlvbixvPWZ1bmN0aW9uKHQpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0fSxzPXt9LGE9e30sdT1cIm9uZm9jdXNpblwiaW4gd2luZG93LGY9e2ZvY3VzOlwiZm9jdXNpblwiLGJsdXI6XCJmb2N1c291dFwifSxjPXttb3VzZWVudGVyOlwibW91c2VvdmVyXCIsbW91c2VsZWF2ZTpcIm1vdXNlb3V0XCJ9O2EuY2xpY2s9YS5tb3VzZWRvd249YS5tb3VzZXVwPWEubW91c2Vtb3ZlPVwiTW91c2VFdmVudHNcIix0LmV2ZW50PXthZGQ6dixyZW1vdmU6eX0sdC5wcm94eT1mdW5jdGlvbihlLG4pe3ZhciBzPTIgaW4gYXJndW1lbnRzJiZpLmNhbGwoYXJndW1lbnRzLDIpO2lmKHIoZSkpe3ZhciBhPWZ1bmN0aW9uKCl7cmV0dXJuIGUuYXBwbHkobixzP3MuY29uY2F0KGkuY2FsbChhcmd1bWVudHMpKTphcmd1bWVudHMpfTtyZXR1cm4gYS5femlkPWwoZSksYX1pZihvKG4pKXJldHVybiBzPyhzLnVuc2hpZnQoZVtuXSxlKSx0LnByb3h5LmFwcGx5KG51bGwscykpOnQucHJveHkoZVtuXSxlKTt0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0ZWQgZnVuY3Rpb25cIil9LHQuZm4uYmluZD1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHRoaXMub24odCxlLG4pfSx0LmZuLnVuYmluZD1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLm9mZih0LGUpfSx0LmZuLm9uZT1mdW5jdGlvbih0LGUsbixpKXtyZXR1cm4gdGhpcy5vbih0LGUsbixpLDEpfTt2YXIgdz1mdW5jdGlvbigpe3JldHVybiEwfSx4PWZ1bmN0aW9uKCl7cmV0dXJuITF9LGI9L14oW0EtWl18cmV0dXJuVmFsdWUkfGxheWVyW1hZXSQpLyxFPXtwcmV2ZW50RGVmYXVsdDpcImlzRGVmYXVsdFByZXZlbnRlZFwiLHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjpcImlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkXCIsc3RvcFByb3BhZ2F0aW9uOlwiaXNQcm9wYWdhdGlvblN0b3BwZWRcIn07dC5mbi5kZWxlZ2F0ZT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHRoaXMub24oZSx0LG4pfSx0LmZuLnVuZGVsZWdhdGU9ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0aGlzLm9mZihlLHQsbil9LHQuZm4ubGl2ZT1mdW5jdGlvbihlLG4pe3JldHVybiB0KGRvY3VtZW50LmJvZHkpLmRlbGVnYXRlKHRoaXMuc2VsZWN0b3IsZSxuKSx0aGlzfSx0LmZuLmRpZT1mdW5jdGlvbihlLG4pe3JldHVybiB0KGRvY3VtZW50LmJvZHkpLnVuZGVsZWdhdGUodGhpcy5zZWxlY3RvcixlLG4pLHRoaXN9LHQuZm4ub249ZnVuY3Rpb24oZSxzLGEsdSxmKXt2YXIgYyxsLGg9dGhpcztyZXR1cm4gZSYmIW8oZSk/KHQuZWFjaChlLGZ1bmN0aW9uKHQsZSl7aC5vbih0LHMsYSxlLGYpfSksaCk6KG8ocyl8fHIodSl8fHU9PT0hMXx8KHU9YSxhPXMscz1uKSwodT09PW58fGE9PT0hMSkmJih1PWEsYT1uKSx1PT09ITEmJih1PXgpLGguZWFjaChmdW5jdGlvbihuLHIpe2YmJihjPWZ1bmN0aW9uKHQpe3JldHVybiB5KHIsdC50eXBlLHUpLHUuYXBwbHkodGhpcyxhcmd1bWVudHMpfSkscyYmKGw9ZnVuY3Rpb24oZSl7dmFyIG4sbz10KGUudGFyZ2V0KS5jbG9zZXN0KHMscikuZ2V0KDApO3JldHVybiBvJiZvIT09cj8obj10LmV4dGVuZChqKGUpLHtjdXJyZW50VGFyZ2V0Om8sbGl2ZUZpcmVkOnJ9KSwoY3x8dSkuYXBwbHkobyxbbl0uY29uY2F0KGkuY2FsbChhcmd1bWVudHMsMSkpKSk6dm9pZCAwfSksdihyLGUsdSxhLHMsbHx8Yyl9KSl9LHQuZm4ub2ZmPWZ1bmN0aW9uKGUsaSxzKXt2YXIgYT10aGlzO3JldHVybiBlJiYhbyhlKT8odC5lYWNoKGUsZnVuY3Rpb24odCxlKXthLm9mZih0LGksZSl9KSxhKToobyhpKXx8cihzKXx8cz09PSExfHwocz1pLGk9bikscz09PSExJiYocz14KSxhLmVhY2goZnVuY3Rpb24oKXt5KHRoaXMsZSxzLGkpfSkpfSx0LmZuLnRyaWdnZXI9ZnVuY3Rpb24oZSxuKXtyZXR1cm4gZT1vKGUpfHx0LmlzUGxhaW5PYmplY3QoZSk/dC5FdmVudChlKTpUKGUpLGUuX2FyZ3M9bix0aGlzLmVhY2goZnVuY3Rpb24oKXtlLnR5cGUgaW4gZiYmXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpc1tlLnR5cGVdP3RoaXNbZS50eXBlXSgpOlwiZGlzcGF0Y2hFdmVudFwiaW4gdGhpcz90aGlzLmRpc3BhdGNoRXZlbnQoZSk6dCh0aGlzKS50cmlnZ2VySGFuZGxlcihlLG4pfSl9LHQuZm4udHJpZ2dlckhhbmRsZXI9ZnVuY3Rpb24oZSxuKXt2YXIgaSxyO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24ocyxhKXtpPWoobyhlKT90LkV2ZW50KGUpOmUpLGkuX2FyZ3M9bixpLnRhcmdldD1hLHQuZWFjaChoKGEsZS50eXBlfHxlKSxmdW5jdGlvbih0LGUpe3JldHVybiByPWUucHJveHkoaSksaS5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpPyExOnZvaWQgMH0pfSkscn0sXCJmb2N1c2luIGZvY3Vzb3V0IGZvY3VzIGJsdXIgbG9hZCByZXNpemUgc2Nyb2xsIHVubG9hZCBjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBjaGFuZ2Ugc2VsZWN0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgZXJyb3JcIi5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihlKXt0LmZuW2VdPWZ1bmN0aW9uKHQpe3JldHVybiAwIGluIGFyZ3VtZW50cz90aGlzLmJpbmQoZSx0KTp0aGlzLnRyaWdnZXIoZSl9fSksdC5FdmVudD1mdW5jdGlvbih0LGUpe28odCl8fChlPXQsdD1lLnR5cGUpO3ZhciBuPWRvY3VtZW50LmNyZWF0ZUV2ZW50KGFbdF18fFwiRXZlbnRzXCIpLGk9ITA7aWYoZSlmb3IodmFyIHIgaW4gZSlcImJ1YmJsZXNcIj09cj9pPSEhZVtyXTpuW3JdPWVbcl07cmV0dXJuIG4uaW5pdEV2ZW50KHQsaSwhMCksVChuKX19KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiBoKGUsbixpKXt2YXIgcj10LkV2ZW50KG4pO3JldHVybiB0KGUpLnRyaWdnZXIocixpKSwhci5pc0RlZmF1bHRQcmV2ZW50ZWQoKX1mdW5jdGlvbiBwKHQsZSxpLHIpe3JldHVybiB0Lmdsb2JhbD9oKGV8fG4saSxyKTp2b2lkIDB9ZnVuY3Rpb24gZChlKXtlLmdsb2JhbCYmMD09PXQuYWN0aXZlKysmJnAoZSxudWxsLFwiYWpheFN0YXJ0XCIpfWZ1bmN0aW9uIG0oZSl7ZS5nbG9iYWwmJiEtLXQuYWN0aXZlJiZwKGUsbnVsbCxcImFqYXhTdG9wXCIpfWZ1bmN0aW9uIGcodCxlKXt2YXIgbj1lLmNvbnRleHQ7cmV0dXJuIGUuYmVmb3JlU2VuZC5jYWxsKG4sdCxlKT09PSExfHxwKGUsbixcImFqYXhCZWZvcmVTZW5kXCIsW3QsZV0pPT09ITE/ITE6dm9pZCBwKGUsbixcImFqYXhTZW5kXCIsW3QsZV0pfWZ1bmN0aW9uIHYodCxlLG4saSl7dmFyIHI9bi5jb250ZXh0LG89XCJzdWNjZXNzXCI7bi5zdWNjZXNzLmNhbGwocix0LG8sZSksaSYmaS5yZXNvbHZlV2l0aChyLFt0LG8sZV0pLHAobixyLFwiYWpheFN1Y2Nlc3NcIixbZSxuLHRdKSx3KG8sZSxuKX1mdW5jdGlvbiB5KHQsZSxuLGkscil7dmFyIG89aS5jb250ZXh0O2kuZXJyb3IuY2FsbChvLG4sZSx0KSxyJiZyLnJlamVjdFdpdGgobyxbbixlLHRdKSxwKGksbyxcImFqYXhFcnJvclwiLFtuLGksdHx8ZV0pLHcoZSxuLGkpfWZ1bmN0aW9uIHcodCxlLG4pe3ZhciBpPW4uY29udGV4dDtuLmNvbXBsZXRlLmNhbGwoaSxlLHQpLHAobixpLFwiYWpheENvbXBsZXRlXCIsW2Usbl0pLG0obil9ZnVuY3Rpb24geCgpe31mdW5jdGlvbiBiKHQpe3JldHVybiB0JiYodD10LnNwbGl0KFwiO1wiLDIpWzBdKSx0JiYodD09Zj9cImh0bWxcIjp0PT11P1wianNvblwiOnMudGVzdCh0KT9cInNjcmlwdFwiOmEudGVzdCh0KSYmXCJ4bWxcIil8fFwidGV4dFwifWZ1bmN0aW9uIEUodCxlKXtyZXR1cm5cIlwiPT1lP3Q6KHQrXCImXCIrZSkucmVwbGFjZSgvWyY/XXsxLDJ9LyxcIj9cIil9ZnVuY3Rpb24gVChlKXtlLnByb2Nlc3NEYXRhJiZlLmRhdGEmJlwic3RyaW5nXCIhPXQudHlwZShlLmRhdGEpJiYoZS5kYXRhPXQucGFyYW0oZS5kYXRhLGUudHJhZGl0aW9uYWwpKSwhZS5kYXRhfHxlLnR5cGUmJlwiR0VUXCIhPWUudHlwZS50b1VwcGVyQ2FzZSgpfHwoZS51cmw9RShlLnVybCxlLmRhdGEpLGUuZGF0YT12b2lkIDApfWZ1bmN0aW9uIGooZSxuLGkscil7cmV0dXJuIHQuaXNGdW5jdGlvbihuKSYmKHI9aSxpPW4sbj12b2lkIDApLHQuaXNGdW5jdGlvbihpKXx8KHI9aSxpPXZvaWQgMCkse3VybDplLGRhdGE6bixzdWNjZXNzOmksZGF0YVR5cGU6cn19ZnVuY3Rpb24gQyhlLG4saSxyKXt2YXIgbyxzPXQuaXNBcnJheShuKSxhPXQuaXNQbGFpbk9iamVjdChuKTt0LmVhY2gobixmdW5jdGlvbihuLHUpe289dC50eXBlKHUpLHImJihuPWk/cjpyK1wiW1wiKyhhfHxcIm9iamVjdFwiPT1vfHxcImFycmF5XCI9PW8/bjpcIlwiKStcIl1cIiksIXImJnM/ZS5hZGQodS5uYW1lLHUudmFsdWUpOlwiYXJyYXlcIj09b3x8IWkmJlwib2JqZWN0XCI9PW8/QyhlLHUsaSxuKTplLmFkZChuLHUpfSl9dmFyIGkscixlPTAsbj13aW5kb3cuZG9jdW1lbnQsbz0vPHNjcmlwdFxcYltePF0qKD86KD8hPFxcL3NjcmlwdD4pPFtePF0qKSo8XFwvc2NyaXB0Pi9naSxzPS9eKD86dGV4dHxhcHBsaWNhdGlvbilcXC9qYXZhc2NyaXB0L2ksYT0vXig/OnRleHR8YXBwbGljYXRpb24pXFwveG1sL2ksdT1cImFwcGxpY2F0aW9uL2pzb25cIixmPVwidGV4dC9odG1sXCIsYz0vXlxccyokLyxsPW4uY3JlYXRlRWxlbWVudChcImFcIik7bC5ocmVmPXdpbmRvdy5sb2NhdGlvbi5ocmVmLHQuYWN0aXZlPTAsdC5hamF4SlNPTlA9ZnVuY3Rpb24oaSxyKXtpZighKFwidHlwZVwiaW4gaSkpcmV0dXJuIHQuYWpheChpKTt2YXIgZixoLG89aS5qc29ucENhbGxiYWNrLHM9KHQuaXNGdW5jdGlvbihvKT9vKCk6byl8fFwianNvbnBcIisgKytlLGE9bi5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpLHU9d2luZG93W3NdLGM9ZnVuY3Rpb24oZSl7dChhKS50cmlnZ2VySGFuZGxlcihcImVycm9yXCIsZXx8XCJhYm9ydFwiKX0sbD17YWJvcnQ6Y307cmV0dXJuIHImJnIucHJvbWlzZShsKSx0KGEpLm9uKFwibG9hZCBlcnJvclwiLGZ1bmN0aW9uKGUsbil7Y2xlYXJUaW1lb3V0KGgpLHQoYSkub2ZmKCkucmVtb3ZlKCksXCJlcnJvclwiIT1lLnR5cGUmJmY/dihmWzBdLGwsaSxyKTp5KG51bGwsbnx8XCJlcnJvclwiLGwsaSxyKSx3aW5kb3dbc109dSxmJiZ0LmlzRnVuY3Rpb24odSkmJnUoZlswXSksdT1mPXZvaWQgMH0pLGcobCxpKT09PSExPyhjKFwiYWJvcnRcIiksbCk6KHdpbmRvd1tzXT1mdW5jdGlvbigpe2Y9YXJndW1lbnRzfSxhLnNyYz1pLnVybC5yZXBsYWNlKC9cXD8oLispPVxcPy8sXCI/JDE9XCIrcyksbi5oZWFkLmFwcGVuZENoaWxkKGEpLGkudGltZW91dD4wJiYoaD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YyhcInRpbWVvdXRcIil9LGkudGltZW91dCkpLGwpfSx0LmFqYXhTZXR0aW5ncz17dHlwZTpcIkdFVFwiLGJlZm9yZVNlbmQ6eCxzdWNjZXNzOngsZXJyb3I6eCxjb21wbGV0ZTp4LGNvbnRleHQ6bnVsbCxnbG9iYWw6ITAseGhyOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3R9LGFjY2VwdHM6e3NjcmlwdDpcInRleHQvamF2YXNjcmlwdCwgYXBwbGljYXRpb24vamF2YXNjcmlwdCwgYXBwbGljYXRpb24veC1qYXZhc2NyaXB0XCIsanNvbjp1LHhtbDpcImFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWxcIixodG1sOmYsdGV4dDpcInRleHQvcGxhaW5cIn0sY3Jvc3NEb21haW46ITEsdGltZW91dDowLHByb2Nlc3NEYXRhOiEwLGNhY2hlOiEwfSx0LmFqYXg9ZnVuY3Rpb24oZSl7dmFyIGEsdSxvPXQuZXh0ZW5kKHt9LGV8fHt9KSxzPXQuRGVmZXJyZWQmJnQuRGVmZXJyZWQoKTtmb3IoaSBpbiB0LmFqYXhTZXR0aW5ncyl2b2lkIDA9PT1vW2ldJiYob1tpXT10LmFqYXhTZXR0aW5nc1tpXSk7ZChvKSxvLmNyb3NzRG9tYWlufHwoYT1uLmNyZWF0ZUVsZW1lbnQoXCJhXCIpLGEuaHJlZj1vLnVybCxhLmhyZWY9YS5ocmVmLG8uY3Jvc3NEb21haW49bC5wcm90b2NvbCtcIi8vXCIrbC5ob3N0IT1hLnByb3RvY29sK1wiLy9cIithLmhvc3QpLG8udXJsfHwoby51cmw9d2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpLCh1PW8udXJsLmluZGV4T2YoXCIjXCIpKT4tMSYmKG8udXJsPW8udXJsLnNsaWNlKDAsdSkpLFQobyk7dmFyIGY9by5kYXRhVHlwZSxoPS9cXD8uKz1cXD8vLnRlc3Qoby51cmwpO2lmKGgmJihmPVwianNvbnBcIiksby5jYWNoZSE9PSExJiYoZSYmZS5jYWNoZT09PSEwfHxcInNjcmlwdFwiIT1mJiZcImpzb25wXCIhPWYpfHwoby51cmw9RShvLnVybCxcIl89XCIrRGF0ZS5ub3coKSkpLFwianNvbnBcIj09ZilyZXR1cm4gaHx8KG8udXJsPUUoby51cmwsby5qc29ucD9vLmpzb25wK1wiPT9cIjpvLmpzb25wPT09ITE/XCJcIjpcImNhbGxiYWNrPT9cIikpLHQuYWpheEpTT05QKG8scyk7dmFyIE4scD1vLmFjY2VwdHNbZl0sbT17fSx3PWZ1bmN0aW9uKHQsZSl7bVt0LnRvTG93ZXJDYXNlKCldPVt0LGVdfSxqPS9eKFtcXHctXSs6KVxcL1xcLy8udGVzdChvLnVybCk/UmVnRXhwLiQxOndpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCxTPW8ueGhyKCksQz1TLnNldFJlcXVlc3RIZWFkZXI7aWYocyYmcy5wcm9taXNlKFMpLG8uY3Jvc3NEb21haW58fHcoXCJYLVJlcXVlc3RlZC1XaXRoXCIsXCJYTUxIdHRwUmVxdWVzdFwiKSx3KFwiQWNjZXB0XCIscHx8XCIqLypcIiksKHA9by5taW1lVHlwZXx8cCkmJihwLmluZGV4T2YoXCIsXCIpPi0xJiYocD1wLnNwbGl0KFwiLFwiLDIpWzBdKSxTLm92ZXJyaWRlTWltZVR5cGUmJlMub3ZlcnJpZGVNaW1lVHlwZShwKSksKG8uY29udGVudFR5cGV8fG8uY29udGVudFR5cGUhPT0hMSYmby5kYXRhJiZcIkdFVFwiIT1vLnR5cGUudG9VcHBlckNhc2UoKSkmJncoXCJDb250ZW50LVR5cGVcIixvLmNvbnRlbnRUeXBlfHxcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKSxvLmhlYWRlcnMpZm9yKHIgaW4gby5oZWFkZXJzKXcocixvLmhlYWRlcnNbcl0pO2lmKFMuc2V0UmVxdWVzdEhlYWRlcj13LFMub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7aWYoND09Uy5yZWFkeVN0YXRlKXtTLm9ucmVhZHlzdGF0ZWNoYW5nZT14LGNsZWFyVGltZW91dChOKTt2YXIgZSxuPSExO2lmKFMuc3RhdHVzPj0yMDAmJlMuc3RhdHVzPDMwMHx8MzA0PT1TLnN0YXR1c3x8MD09Uy5zdGF0dXMmJlwiZmlsZTpcIj09ail7Zj1mfHxiKG8ubWltZVR5cGV8fFMuZ2V0UmVzcG9uc2VIZWFkZXIoXCJjb250ZW50LXR5cGVcIikpLGU9Uy5yZXNwb25zZVRleHQ7dHJ5e1wic2NyaXB0XCI9PWY/KDEsZXZhbCkoZSk6XCJ4bWxcIj09Zj9lPVMucmVzcG9uc2VYTUw6XCJqc29uXCI9PWYmJihlPWMudGVzdChlKT9udWxsOnQucGFyc2VKU09OKGUpKX1jYXRjaChpKXtuPWl9bj95KG4sXCJwYXJzZXJlcnJvclwiLFMsbyxzKTp2KGUsUyxvLHMpfWVsc2UgeShTLnN0YXR1c1RleHR8fG51bGwsUy5zdGF0dXM/XCJlcnJvclwiOlwiYWJvcnRcIixTLG8scyl9fSxnKFMsbyk9PT0hMSlyZXR1cm4gUy5hYm9ydCgpLHkobnVsbCxcImFib3J0XCIsUyxvLHMpLFM7aWYoby54aHJGaWVsZHMpZm9yKHIgaW4gby54aHJGaWVsZHMpU1tyXT1vLnhockZpZWxkc1tyXTt2YXIgUD1cImFzeW5jXCJpbiBvP28uYXN5bmM6ITA7Uy5vcGVuKG8udHlwZSxvLnVybCxQLG8udXNlcm5hbWUsby5wYXNzd29yZCk7Zm9yKHIgaW4gbSlDLmFwcGx5KFMsbVtyXSk7cmV0dXJuIG8udGltZW91dD4wJiYoTj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Uy5vbnJlYWR5c3RhdGVjaGFuZ2U9eCxTLmFib3J0KCkseShudWxsLFwidGltZW91dFwiLFMsbyxzKX0sby50aW1lb3V0KSksUy5zZW5kKG8uZGF0YT9vLmRhdGE6bnVsbCksU30sdC5nZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gdC5hamF4KGouYXBwbHkobnVsbCxhcmd1bWVudHMpKX0sdC5wb3N0PWZ1bmN0aW9uKCl7dmFyIGU9ai5hcHBseShudWxsLGFyZ3VtZW50cyk7cmV0dXJuIGUudHlwZT1cIlBPU1RcIix0LmFqYXgoZSl9LHQuZ2V0SlNPTj1mdW5jdGlvbigpe3ZhciBlPWouYXBwbHkobnVsbCxhcmd1bWVudHMpO3JldHVybiBlLmRhdGFUeXBlPVwianNvblwiLHQuYWpheChlKX0sdC5mbi5sb2FkPWZ1bmN0aW9uKGUsbixpKXtpZighdGhpcy5sZW5ndGgpcmV0dXJuIHRoaXM7dmFyIGEscj10aGlzLHM9ZS5zcGxpdCgvXFxzLyksdT1qKGUsbixpKSxmPXUuc3VjY2VzcztyZXR1cm4gcy5sZW5ndGg+MSYmKHUudXJsPXNbMF0sYT1zWzFdKSx1LnN1Y2Nlc3M9ZnVuY3Rpb24oZSl7ci5odG1sKGE/dChcIjxkaXY+XCIpLmh0bWwoZS5yZXBsYWNlKG8sXCJcIikpLmZpbmQoYSk6ZSksZiYmZi5hcHBseShyLGFyZ3VtZW50cyl9LHQuYWpheCh1KSx0aGlzfTt2YXIgUz1lbmNvZGVVUklDb21wb25lbnQ7dC5wYXJhbT1mdW5jdGlvbihlLG4pe3ZhciBpPVtdO3JldHVybiBpLmFkZD1mdW5jdGlvbihlLG4pe3QuaXNGdW5jdGlvbihuKSYmKG49bigpKSxudWxsPT1uJiYobj1cIlwiKSx0aGlzLnB1c2goUyhlKStcIj1cIitTKG4pKX0sQyhpLGUsbiksaS5qb2luKFwiJlwiKS5yZXBsYWNlKC8lMjAvZyxcIitcIil9fShaZXB0byksZnVuY3Rpb24odCl7dC5DYWxsYmFja3M9ZnVuY3Rpb24oZSl7ZT10LmV4dGVuZCh7fSxlKTt2YXIgbixpLHIsbyxzLGEsdT1bXSxmPSFlLm9uY2UmJltdLGM9ZnVuY3Rpb24odCl7Zm9yKG49ZS5tZW1vcnkmJnQsaT0hMCxhPW98fDAsbz0wLHM9dS5sZW5ndGgscj0hMDt1JiZzPmE7KythKWlmKHVbYV0uYXBwbHkodFswXSx0WzFdKT09PSExJiZlLnN0b3BPbkZhbHNlKXtuPSExO2JyZWFrfXI9ITEsdSYmKGY/Zi5sZW5ndGgmJmMoZi5zaGlmdCgpKTpuP3UubGVuZ3RoPTA6bC5kaXNhYmxlKCkpfSxsPXthZGQ6ZnVuY3Rpb24oKXtpZih1KXt2YXIgaT11Lmxlbmd0aCxhPWZ1bmN0aW9uKG4pe3QuZWFjaChuLGZ1bmN0aW9uKHQsbil7XCJmdW5jdGlvblwiPT10eXBlb2Ygbj9lLnVuaXF1ZSYmbC5oYXMobil8fHUucHVzaChuKTpuJiZuLmxlbmd0aCYmXCJzdHJpbmdcIiE9dHlwZW9mIG4mJmEobil9KX07YShhcmd1bWVudHMpLHI/cz11Lmxlbmd0aDpuJiYobz1pLGMobikpfXJldHVybiB0aGlzfSxyZW1vdmU6ZnVuY3Rpb24oKXtyZXR1cm4gdSYmdC5lYWNoKGFyZ3VtZW50cyxmdW5jdGlvbihlLG4pe2Zvcih2YXIgaTsoaT10LmluQXJyYXkobix1LGkpKT4tMTspdS5zcGxpY2UoaSwxKSxyJiYocz49aSYmLS1zLGE+PWkmJi0tYSl9KSx0aGlzfSxoYXM6ZnVuY3Rpb24oZSl7cmV0dXJuISghdXx8IShlP3QuaW5BcnJheShlLHUpPi0xOnUubGVuZ3RoKSl9LGVtcHR5OmZ1bmN0aW9uKCl7cmV0dXJuIHM9dS5sZW5ndGg9MCx0aGlzfSxkaXNhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIHU9Zj1uPXZvaWQgMCx0aGlzfSxkaXNhYmxlZDpmdW5jdGlvbigpe3JldHVybiF1fSxsb2NrOmZ1bmN0aW9uKCl7cmV0dXJuIGY9dm9pZCAwLG58fGwuZGlzYWJsZSgpLHRoaXN9LGxvY2tlZDpmdW5jdGlvbigpe3JldHVybiFmfSxmaXJlV2l0aDpmdW5jdGlvbih0LGUpe3JldHVybiF1fHxpJiYhZnx8KGU9ZXx8W10sZT1bdCxlLnNsaWNlP2Uuc2xpY2UoKTplXSxyP2YucHVzaChlKTpjKGUpKSx0aGlzfSxmaXJlOmZ1bmN0aW9uKCl7cmV0dXJuIGwuZmlyZVdpdGgodGhpcyxhcmd1bWVudHMpfSxmaXJlZDpmdW5jdGlvbigpe3JldHVybiEhaX19O3JldHVybiBsfX0oWmVwdG8pLGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIG4oZSl7dmFyIGk9W1tcInJlc29sdmVcIixcImRvbmVcIix0LkNhbGxiYWNrcyh7b25jZToxLG1lbW9yeToxfSksXCJyZXNvbHZlZFwiXSxbXCJyZWplY3RcIixcImZhaWxcIix0LkNhbGxiYWNrcyh7b25jZToxLG1lbW9yeToxfSksXCJyZWplY3RlZFwiXSxbXCJub3RpZnlcIixcInByb2dyZXNzXCIsdC5DYWxsYmFja3Moe21lbW9yeToxfSldXSxyPVwicGVuZGluZ1wiLG89e3N0YXRlOmZ1bmN0aW9uKCl7cmV0dXJuIHJ9LGFsd2F5czpmdW5jdGlvbigpe3JldHVybiBzLmRvbmUoYXJndW1lbnRzKS5mYWlsKGFyZ3VtZW50cyksdGhpc30sdGhlbjpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cztyZXR1cm4gbihmdW5jdGlvbihuKXt0LmVhY2goaSxmdW5jdGlvbihpLHIpe3ZhciBhPXQuaXNGdW5jdGlvbihlW2ldKSYmZVtpXTtzW3JbMV1dKGZ1bmN0aW9uKCl7dmFyIGU9YSYmYS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7aWYoZSYmdC5pc0Z1bmN0aW9uKGUucHJvbWlzZSkpZS5wcm9taXNlKCkuZG9uZShuLnJlc29sdmUpLmZhaWwobi5yZWplY3QpLnByb2dyZXNzKG4ubm90aWZ5KTtlbHNle3ZhciBpPXRoaXM9PT1vP24ucHJvbWlzZSgpOnRoaXMscz1hP1tlXTphcmd1bWVudHM7bltyWzBdK1wiV2l0aFwiXShpLHMpfX0pfSksZT1udWxsfSkucHJvbWlzZSgpfSxwcm9taXNlOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT1lP3QuZXh0ZW5kKGUsbyk6b319LHM9e307cmV0dXJuIHQuZWFjaChpLGZ1bmN0aW9uKHQsZSl7dmFyIG49ZVsyXSxhPWVbM107b1tlWzFdXT1uLmFkZCxhJiZuLmFkZChmdW5jdGlvbigpe3I9YX0saVsxXnRdWzJdLmRpc2FibGUsaVsyXVsyXS5sb2NrKSxzW2VbMF1dPWZ1bmN0aW9uKCl7cmV0dXJuIHNbZVswXStcIldpdGhcIl0odGhpcz09PXM/bzp0aGlzLGFyZ3VtZW50cyksdGhpc30sc1tlWzBdK1wiV2l0aFwiXT1uLmZpcmVXaXRofSksby5wcm9taXNlKHMpLGUmJmUuY2FsbChzLHMpLHN9dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlO3Qud2hlbj1mdW5jdGlvbihpKXt2YXIgZixjLGwscj1lLmNhbGwoYXJndW1lbnRzKSxvPXIubGVuZ3RoLHM9MCxhPTEhPT1vfHxpJiZ0LmlzRnVuY3Rpb24oaS5wcm9taXNlKT9vOjAsdT0xPT09YT9pOm4oKSxoPWZ1bmN0aW9uKHQsbixpKXtyZXR1cm4gZnVuY3Rpb24ocil7blt0XT10aGlzLGlbdF09YXJndW1lbnRzLmxlbmd0aD4xP2UuY2FsbChhcmd1bWVudHMpOnIsaT09PWY/dS5ub3RpZnlXaXRoKG4saSk6LS1hfHx1LnJlc29sdmVXaXRoKG4saSl9fTtpZihvPjEpZm9yKGY9bmV3IEFycmF5KG8pLGM9bmV3IEFycmF5KG8pLGw9bmV3IEFycmF5KG8pO28+czsrK3MpcltzXSYmdC5pc0Z1bmN0aW9uKHJbc10ucHJvbWlzZSk/cltzXS5wcm9taXNlKCkuZG9uZShoKHMsbCxyKSkuZmFpbCh1LnJlamVjdCkucHJvZ3Jlc3MoaChzLGMsZikpOi0tYTtyZXR1cm4gYXx8dS5yZXNvbHZlV2l0aChsLHIpLHUucHJvbWlzZSgpfSx0LkRlZmVycmVkPW59KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiB1KHQsZSxuLGkpe3JldHVybiBNYXRoLmFicyh0LWUpPj1NYXRoLmFicyhuLWkpP3QtZT4wP1wiTGVmdFwiOlwiUmlnaHRcIjpuLWk+MD9cIlVwXCI6XCJEb3duXCJ9ZnVuY3Rpb24gZigpe289bnVsbCxlLmxhc3QmJihlLmVsLnRyaWdnZXIoXCJsb25nVGFwXCIpLGU9e30pfWZ1bmN0aW9uIGMoKXtvJiZjbGVhclRpbWVvdXQobyksbz1udWxsfWZ1bmN0aW9uIGwoKXtuJiZjbGVhclRpbWVvdXQobiksaSYmY2xlYXJUaW1lb3V0KGkpLHImJmNsZWFyVGltZW91dChyKSxvJiZjbGVhclRpbWVvdXQobyksbj1pPXI9bz1udWxsLGU9e319ZnVuY3Rpb24gaCh0KXtyZXR1cm4oXCJ0b3VjaFwiPT10LnBvaW50ZXJUeXBlfHx0LnBvaW50ZXJUeXBlPT10Lk1TUE9JTlRFUl9UWVBFX1RPVUNIKSYmdC5pc1ByaW1hcnl9ZnVuY3Rpb24gcCh0LGUpe3JldHVybiB0LnR5cGU9PVwicG9pbnRlclwiK2V8fHQudHlwZS50b0xvd2VyQ2FzZSgpPT1cIm1zcG9pbnRlclwiK2V9dmFyIG4saSxyLG8sYSxlPXt9LHM9NzUwO3QoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7dmFyIGQsbSx5LHcsZz0wLHY9MDtcIk1TR2VzdHVyZVwiaW4gd2luZG93JiYoYT1uZXcgTVNHZXN0dXJlLGEudGFyZ2V0PWRvY3VtZW50LmJvZHkpLHQoZG9jdW1lbnQpLmJpbmQoXCJNU0dlc3R1cmVFbmRcIixmdW5jdGlvbih0KXt2YXIgbj10LnZlbG9jaXR5WD4xP1wiUmlnaHRcIjp0LnZlbG9jaXR5WDwtMT9cIkxlZnRcIjp0LnZlbG9jaXR5WT4xP1wiRG93blwiOnQudmVsb2NpdHlZPC0xP1wiVXBcIjpudWxsO24mJihlLmVsLnRyaWdnZXIoXCJzd2lwZVwiKSxlLmVsLnRyaWdnZXIoXCJzd2lwZVwiK24pKX0pLm9uKFwidG91Y2hzdGFydCBNU1BvaW50ZXJEb3duIHBvaW50ZXJkb3duXCIsZnVuY3Rpb24oaSl7KCEodz1wKGksXCJkb3duXCIpKXx8aChpKSkmJih5PXc/aTppLnRvdWNoZXNbMF0saS50b3VjaGVzJiYxPT09aS50b3VjaGVzLmxlbmd0aCYmZS54MiYmKGUueDI9dm9pZCAwLGUueTI9dm9pZCAwKSxkPURhdGUubm93KCksbT1kLShlLmxhc3R8fGQpLGUuZWw9dChcInRhZ05hbWVcImluIHkudGFyZ2V0P3kudGFyZ2V0OnkudGFyZ2V0LnBhcmVudE5vZGUpLG4mJmNsZWFyVGltZW91dChuKSxlLngxPXkucGFnZVgsZS55MT15LnBhZ2VZLG0+MCYmMjUwPj1tJiYoZS5pc0RvdWJsZVRhcD0hMCksZS5sYXN0PWQsbz1zZXRUaW1lb3V0KGYscyksYSYmdyYmYS5hZGRQb2ludGVyKGkucG9pbnRlcklkKSl9KS5vbihcInRvdWNobW92ZSBNU1BvaW50ZXJNb3ZlIHBvaW50ZXJtb3ZlXCIsZnVuY3Rpb24odCl7KCEodz1wKHQsXCJtb3ZlXCIpKXx8aCh0KSkmJih5PXc/dDp0LnRvdWNoZXNbMF0sYygpLGUueDI9eS5wYWdlWCxlLnkyPXkucGFnZVksZys9TWF0aC5hYnMoZS54MS1lLngyKSx2Kz1NYXRoLmFicyhlLnkxLWUueTIpKX0pLm9uKFwidG91Y2hlbmQgTVNQb2ludGVyVXAgcG9pbnRlcnVwXCIsZnVuY3Rpb24obyl7KCEodz1wKG8sXCJ1cFwiKSl8fGgobykpJiYoYygpLGUueDImJk1hdGguYWJzKGUueDEtZS54Mik+MzB8fGUueTImJk1hdGguYWJzKGUueTEtZS55Mik+MzA/cj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZS5lbC50cmlnZ2VyKFwic3dpcGVcIiksZS5lbC50cmlnZ2VyKFwic3dpcGVcIit1KGUueDEsZS54MixlLnkxLGUueTIpKSxlPXt9fSwwKTpcImxhc3RcImluIGUmJigzMD5nJiYzMD52P2k9c2V0VGltZW91dChmdW5jdGlvbigpe3ZhciBpPXQuRXZlbnQoXCJ0YXBcIik7aS5jYW5jZWxUb3VjaD1sLGUuZWwudHJpZ2dlcihpKSxlLmlzRG91YmxlVGFwPyhlLmVsJiZlLmVsLnRyaWdnZXIoXCJkb3VibGVUYXBcIiksZT17fSk6bj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bj1udWxsLGUuZWwmJmUuZWwudHJpZ2dlcihcInNpbmdsZVRhcFwiKSxlPXt9fSwyNTApfSwwKTplPXt9KSxnPXY9MCl9KS5vbihcInRvdWNoY2FuY2VsIE1TUG9pbnRlckNhbmNlbCBwb2ludGVyY2FuY2VsXCIsbCksdCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsbCl9KSxbXCJzd2lwZVwiLFwic3dpcGVMZWZ0XCIsXCJzd2lwZVJpZ2h0XCIsXCJzd2lwZVVwXCIsXCJzd2lwZURvd25cIixcImRvdWJsZVRhcFwiLFwidGFwXCIsXCJzaW5nbGVUYXBcIixcImxvbmdUYXBcIl0uZm9yRWFjaChmdW5jdGlvbihlKXt0LmZuW2VdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLm9uKGUsdCl9fSl9KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiByKGUpe3JldHVybiBlPXQoZSksISghZS53aWR0aCgpJiYhZS5oZWlnaHQoKSkmJlwibm9uZVwiIT09ZS5jc3MoXCJkaXNwbGF5XCIpfWZ1bmN0aW9uIGYodCxlKXt0PXQucmVwbGFjZSgvPSNcXF0vZywnPVwiI1wiXScpO3ZhciBuLGkscj1zLmV4ZWModCk7aWYociYmclsyXWluIG8mJihuPW9bclsyXV0saT1yWzNdLHQ9clsxXSxpKSl7dmFyIGE9TnVtYmVyKGkpO2k9aXNOYU4oYSk/aS5yZXBsYWNlKC9eW1wiJ118W1wiJ10kL2csXCJcIik6YX1yZXR1cm4gZSh0LG4saSl9dmFyIGU9dC56ZXB0byxuPWUucXNhLGk9ZS5tYXRjaGVzLG89dC5leHByW1wiOlwiXT17dmlzaWJsZTpmdW5jdGlvbigpe3JldHVybiByKHRoaXMpP3RoaXM6dm9pZCAwfSxoaWRkZW46ZnVuY3Rpb24oKXtyZXR1cm4gcih0aGlzKT92b2lkIDA6dGhpc30sc2VsZWN0ZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zZWxlY3RlZD90aGlzOnZvaWQgMH0sY2hlY2tlZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNoZWNrZWQ/dGhpczp2b2lkIDB9LHBhcmVudDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnBhcmVudE5vZGV9LGZpcnN0OmZ1bmN0aW9uKHQpe3JldHVybiAwPT09dD90aGlzOnZvaWQgMH0sbGFzdDpmdW5jdGlvbih0LGUpe3JldHVybiB0PT09ZS5sZW5ndGgtMT90aGlzOnZvaWQgMH0sZXE6ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0PT09bj90aGlzOnZvaWQgMH0sY29udGFpbnM6ZnVuY3Rpb24oZSxuLGkpe3JldHVybiB0KHRoaXMpLnRleHQoKS5pbmRleE9mKGkpPi0xP3RoaXM6dm9pZCAwfSxoYXM6ZnVuY3Rpb24odCxuLGkpe3JldHVybiBlLnFzYSh0aGlzLGkpLmxlbmd0aD90aGlzOnZvaWQgMH19LHM9bmV3IFJlZ0V4cChcIiguKik6KFxcXFx3KykoPzpcXFxcKChbXildKylcXFxcKSk/JFxcXFxzKlwiKSxhPS9eXFxzKj4vLHU9XCJaZXB0b1wiKyArbmV3IERhdGU7ZS5xc2E9ZnVuY3Rpb24oaSxyKXtyZXR1cm4gZihyLGZ1bmN0aW9uKG8scyxmKXt0cnl7dmFyIGM7IW8mJnM/bz1cIipcIjphLnRlc3QobykmJihjPXQoaSkuYWRkQ2xhc3ModSksbz1cIi5cIit1K1wiIFwiK28pO3ZhciBsPW4oaSxvKX1jYXRjaChoKXt0aHJvdyBjb25zb2xlLmVycm9yKFwiZXJyb3IgcGVyZm9ybWluZyBzZWxlY3RvcjogJW9cIixyKSxofWZpbmFsbHl7YyYmYy5yZW1vdmVDbGFzcyh1KX1yZXR1cm4gcz9lLnVuaXEodC5tYXAobCxmdW5jdGlvbih0LGUpe3JldHVybiBzLmNhbGwodCxlLGwsZil9KSk6bH0pfSxlLm1hdGNoZXM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZihlLGZ1bmN0aW9uKGUsbixyKXtyZXR1cm4hKGUmJiFpKHQsZSl8fG4mJm4uY2FsbCh0LG51bGwscikhPT10KX0pfX0oWmVwdG8pLGZ1bmN0aW9uKCl7dHJ5e2dldENvbXB1dGVkU3R5bGUodm9pZCAwKX1jYXRjaCh0KXt2YXIgZT1nZXRDb21wdXRlZFN0eWxlO3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm4gZSh0KX1jYXRjaChuKXtyZXR1cm4gbnVsbH19fX0oKTtcbm1vZHVsZS5leHBvcnRzID0gWmVwdG87XG4iXX0=
