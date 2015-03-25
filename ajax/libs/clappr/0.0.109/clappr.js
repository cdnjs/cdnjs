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
window.Clappr.version = "0.0.109";

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
"use strict";

//This file is generated by bin/hook.js
var template = require("template");
module.exports = { media_control: template("<div class=\"media-control-background\" data-background></div><div class=\"media-control-layer\" data-controls><% var renderBar=function(name) { %><div class=\"bar-container\" data-<%= name %>><div class=\"bar-background\" data-<%= name %>><div class=\"bar-fill-1\" data-<%= name %>></div><div class=\"bar-fill-2\" data-<%= name %>></div><div class=\"bar-hover\" data-<%= name %>></div></div><div class=\"bar-scrubber\" data-<%= name %>><div class=\"bar-scrubber-icon\" data-<%= name %>></div></div></div><% }; %><% var renderSegmentedBar=function(name, segments) { segments=segments || 10; %><div class=\"bar-container\" data-<%= name %>><% for (var i = 0; i < segments; i++) { %><div class=\"segmented-bar-element\" data-<%= name %>></div><% } %></div><% }; %><% var renderDrawer=function(name, renderContent) { %><div class=\"drawer-container\" data-<%= name %>><div class=\"drawer-icon-container\" data-<%= name %>><div class=\"drawer-icon media-control-icon\" data-<%= name %>></div><span class=\"drawer-text\" data-<%= name %>></span></div><% renderContent(name); %></div><% }; %><% var renderIndicator=function(name) { %><div class=\"media-control-indicator\" data-<%= name %>></div><% }; %><% var renderButton=function(name) { %><button class=\"media-control-button media-control-icon\" data-<%= name %>></button><% }; %><% var templates={ bar: renderBar, segmentedBar: renderSegmentedBar, }; var render=function(settingsList) { settingsList.forEach(function(setting) { if(setting === \"seekbar\") { renderBar(setting); } else if (setting === \"volume\") { renderDrawer(setting, settings.volumeBarTemplate ? templates[settings.volumeBarTemplate] : function(name) { return renderSegmentedBar(name); }); } else if (setting === \"duration\" || setting=== \"position\") { renderIndicator(setting); } else { renderButton(setting); } }); }; %><% if (settings.default && settings.default.length) { %><div class=\"media-control-center-panel\" data-media-control><% render(settings.default); %></div><% } %><% if (settings.left && settings.left.length) { %><div class=\"media-control-left-panel\" data-media-control><% render(settings.left); %></div><% } %><% if (settings.right && settings.right.length) { %><div class=\"media-control-right-panel\" data-media-control><% render(settings.right); %></div><% } %></div>"), seek_time: template("<span data-seek-time></span>"), flash: template("<param name=\"movie\" value=\"<%= baseUrl %>/assets/Player.swf\"><param name=\"quality\" value=\"autohigh\"><param name=\"swliveconnect\" value=\"true\"><param name=\"allowScriptAccess\" value=\"always\"><param name=\"bgcolor\" value=\"#001122\"><param name=\"allowFullScreen\" value=\"false\"><param name=\"wmode\" value=\"transparent\"><param name=\"tabindex\" value=\"1\"><param name=FlashVars value=\"playbackId=<%= playbackId %>\" /><embed type=\"application/x-shockwave-flash\" disabled tabindex=\"-1\" enablecontextmenu=\"false\" allowScriptAccess=\"always\" quality=\"autohight\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" wmode=\"transparent\" swliveconnect=\"true\" type=\"application/x-shockwave-flash\" allowfullscreen=\"false\" bgcolor=\"#000000\" FlashVars=\"playbackId=<%= playbackId %>\" src=\"<%= baseUrl %>/assets/Player.swf\"></embed>"), hls: template("<param name=\"movie\" value=\"<%= baseUrl %>/assets/HLSPlayer.swf?inline=1\"><param name=\"quality\" value=\"autohigh\"><param name=\"swliveconnect\" value=\"true\"><param name=\"allowScriptAccess\" value=\"always\"><param name=\"bgcolor\" value=\"#001122\"><param name=\"allowFullScreen\" value=\"false\"><param name=\"wmode\" value=\"transparent\"><param name=\"tabindex\" value=\"1\"><param name=FlashVars value=\"playbackId=<%= playbackId %>\" /><embed type=\"application/x-shockwave-flash\" tabindex=\"1\" enablecontextmenu=\"false\" allowScriptAccess=\"always\" quality=\"autohigh\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" wmode=\"transparent\" swliveconnect=\"true\" type=\"application/x-shockwave-flash\" allowfullscreen=\"false\" bgcolor=\"#000000\" FlashVars=\"playbackId=<%= playbackId %>\" src=\"<%= baseUrl %>/assets/HLSPlayer.swf\" width=\"100%\" height=\"100%\"></embed>"), html5_video: template("<source src=\"<%=src%>\" type=\"<%=type%>\">"), no_op: template("<canvas data-no-op-canvas></canvas><p data-no-op-msg>Your browser does not support the playback of this video. Try to use a different browser.<p>"), background_button: template("<div class=\"background-button-wrapper\" data-background-button><button class=\"background-button-icon\" data-background-button></button></div>"), dvr_controls: template("<div class=\"live-info\">LIVE</div><button class=\"live-button\">BACK TO LIVE</button>"), poster: template("<div class=\"play-wrapper\" data-poster><span class=\"poster-icon play\" data-poster/></div>"), spinner_three_bounce: template("<div data-bounce1></div><div data-bounce2></div><div data-bounce3></div>"), watermark: template("<div data-watermark data-watermark-<%=position %>><img src=\"<%= imageUrl %>\"></div>"), CSS: { container: ".container[data-container]{position:absolute;background-color:#000;height:100%;width:100%}.container[data-container].pointer-enabled{cursor:pointer}", core: "[data-player]{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0);position:relative;margin:0;padding:0;border:0;font-style:normal;font-weight:400;text-align:center;overflow:hidden;font-size:100%;font-family:\"lucida grande\",tahoma,verdana,arial,sans-serif;text-shadow:0 0 0;box-sizing:border-box}[data-player] a,[data-player] abbr,[data-player] acronym,[data-player] address,[data-player] applet,[data-player] article,[data-player] aside,[data-player] audio,[data-player] b,[data-player] big,[data-player] blockquote,[data-player] canvas,[data-player] caption,[data-player] center,[data-player] cite,[data-player] code,[data-player] dd,[data-player] del,[data-player] details,[data-player] dfn,[data-player] div,[data-player] dl,[data-player] dt,[data-player] em,[data-player] embed,[data-player] fieldset,[data-player] figcaption,[data-player] figure,[data-player] footer,[data-player] form,[data-player] h1,[data-player] h2,[data-player] h3,[data-player] h4,[data-player] h5,[data-player] h6,[data-player] header,[data-player] hgroup,[data-player] i,[data-player] iframe,[data-player] img,[data-player] ins,[data-player] kbd,[data-player] label,[data-player] legend,[data-player] li,[data-player] mark,[data-player] menu,[data-player] nav,[data-player] object,[data-player] ol,[data-player] output,[data-player] p,[data-player] pre,[data-player] q,[data-player] ruby,[data-player] s,[data-player] samp,[data-player] section,[data-player] small,[data-player] span,[data-player] strike,[data-player] strong,[data-player] sub,[data-player] summary,[data-player] sup,[data-player] table,[data-player] tbody,[data-player] td,[data-player] tfoot,[data-player] th,[data-player] thead,[data-player] time,[data-player] tr,[data-player] tt,[data-player] u,[data-player] ul,[data-player] var,[data-player] video{margin:0;padding:0;border:0;font:inherit;font-size:100%;vertical-align:baseline}[data-player] table{border-collapse:collapse;border-spacing:0}[data-player] caption,[data-player] td,[data-player] th{text-align:left;font-weight:400;vertical-align:middle}[data-player] blockquote,[data-player] q{quotes:none}[data-player] blockquote:after,[data-player] blockquote:before,[data-player] q:after,[data-player] q:before{content:\"\";content:none}[data-player] a img{border:none}[data-player] *{max-width:initial;box-sizing:inherit;float:initial}[data-player].fullscreen{width:100%!important;height:100%!important}[data-player].nocursor{cursor:none}.clappr-style{display:none!important}@media screen{[data-player]{opacity:.99}}", media_control: "@font-face{font-family:Player;src:url(\"<%= baseUrl %>/assets/Player-Regular.eot\");src:url(\"<%= baseUrl %>/assets/Player-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"<%= baseUrl %>/assets/Player-Regular.ttf\") format(\"truetype\"),url(\"<%= baseUrl %>/assets/Player-Regular.svg#player\") format(\"svg\")}.media-control-notransition{-webkit-transition:none!important;-webkit-transition-delay:0s;-moz-transition:none!important;-o-transition:none!important;transition:none!important}.media-control[data-media-control]{position:absolute;width:100%;height:100%;z-index:9999;pointer-events:none}.media-control[data-media-control].dragging{pointer-events:auto;cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control].dragging *{cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control] .media-control-background[data-background]{position:absolute;height:40%;width:100%;bottom:0;background-image:-owg(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-webkit(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-moz(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-o(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9));-webkit-transition:opacity .6s;-webkit-transition-delay:ease-out;-moz-transition:opacity .6s ease-out;-o-transition:opacity .6s ease-out;transition:opacity .6s ease-out}.media-control[data-media-control] .media-control-icon{font-family:Player;font-weight:400;font-style:normal;font-size:26px;line-height:32px;letter-spacing:0;speak:none;color:#fff;opacity:.5;vertical-align:middle;text-align:left;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.media-control[data-media-control] .media-control-icon:hover{color:#fff;opacity:.75;text-shadow:rgba(255,255,255,.8) 0 0 5px}.media-control[data-media-control].media-control-hide .media-control-background[data-background]{opacity:0}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls]{bottom:-50px}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls]{position:absolute;bottom:7px;width:100%;height:32px;vertical-align:middle;pointer-events:auto;-webkit-transition:bottom .4s;-webkit-transition-delay:ease-out;-moz-transition:bottom .4s ease-out;-o-transition:bottom .4s ease-out;transition:bottom .4s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-left-panel[data-media-control]{position:absolute;top:0;left:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-center-panel[data-media-control]{height:100%;text-align:center;line-height:32px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-right-panel[data-media-control]{position:absolute;top:0;right:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button{background-color:transparent;border:0;margin:0 6px;padding:0;cursor:pointer;display:inline-block}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button:focus{outline:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]:before{content:\"\\e002\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]:before{content:\"\\e003\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]{float:right;background-color:transparent;border:0;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]:before{content:\"\\e006\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen].shrink:before{content:\"\\e007\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]{cursor:default;float:right;background-color:transparent;border:0;height:100%;opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]:before{content:\"\\e008\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled:hover{opacity:1;text-shadow:none}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].playing:before{content:\"\\e002\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].paused:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].playing:before{content:\"\\e003\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].stopped:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration],.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{display:inline-block;font-size:10px;color:#fff;cursor:default;line-height:32px;position:relative}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{margin-left:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]{color:rgba(255,255,255,.5);margin-right:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]:before{content:\"|\";margin:0 3px}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]{position:absolute;top:-20px;left:0;display:inline-block;vertical-align:middle;width:100%;height:25px;cursor:pointer}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar]{width:100%;height:1px;position:relative;top:12px;background-color:#666}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-1[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#c2c2c2;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#005aff;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0;position:absolute;top:-3px;width:5px;height:7px;background-color:rgba(255,255,255,.5);-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled{cursor:default}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{position:absolute;top:2px;left:0;width:20px;height:20px;opacity:1;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] .bar-scrubber-icon[data-seekbar]{position:absolute;left:6px;top:6px;width:8px;height:8px;border-radius:10px;box-shadow:0 0 0 6px rgba(255,255,255,.2);background-color:#fff}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume]{float:right;display:inline-block;height:32px;cursor:pointer;margin:0 6px;box-sizing:border-box}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume]{float:left;bottom:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]{background-color:transparent;border:0;box-sizing:content-box;width:16px;height:32px;margin-right:6px;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:hover{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:before{content:\"\\e004\"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted{opacity:.5}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:hover{opacity:.7}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:before{content:\"\\e005\"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume]{float:left;position:relative;top:6px;width:42px;height:18px;padding:3px 0;overflow:hidden;-webkit-transition:width .2s;-webkit-transition-delay:ease-out;-moz-transition:width .2s ease-out;-o-transition:width .2s ease-out;transition:width .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]{float:left;width:4px;padding-left:2px;height:12px;opacity:.5;-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;-webkit-transition:-webkit-transform .2s;-webkit-transition-delay:ease-out;-moz-transition:-moz-transform .2s ease-out;-o-transition:-o-transform .2s ease-out;transition:transform .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume].fill{-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:nth-of-type(1){padding-left:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:hover{-webkit-transform:scaleY(1.5);-moz-transform:scaleY(1.5);-ms-transform:scaleY(1.5);-o-transform:scaleY(1.5);transform:scaleY(1.5)}.media-control[data-media-control].w320 .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume].volume-bar-hide{height:12px;top:9px;padding:0;width:0}", seek_time: ".seek-time[data-seek-time]{position:absolute;width:auto;height:20px;line-height:20px;bottom:55px;background-color:rgba(2,2,2,.5);z-index:9999;-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.seek-time[data-seek-time].hidden[data-seek-time]{opacity:0}.seek-time[data-seek-time] span[data-seek-time]{position:relative;color:#fff;font-size:10px;padding-left:7px;padding-right:7px}", flash: "[data-flash]{position:absolute;height:100%;width:100%;background-color:#000;display:block;pointer-events:none}", hls: "[data-hls]{position:absolute;display:block;pointer-events:none;top:0}", html5_video: "[data-html5-video]{position:absolute;height:100%;width:100%;display:block}", html_img: "[data-html-img]{max-width:100%;max-height:100%}", no_op: "[data-no-op]{z-index:1000;position:absolute;height:100%;width:100%;text-align:center}[data-no-op] p[data-no-op-msg]{position:absolute;font-size:25px;top:40%;color:#fff}[data-no-op] canvas[data-no-op-canvas]{background-color:#777;height:100%;width:100%}", background_button: ".background-button[data-background-button]{font-family:Player;position:absolute;height:100%;width:100%;background-color:rgba(0,0,0,.2);pointer-events:none;-webkit-transition:all .4s;-webkit-transition-delay:ease-out;-moz-transition:all .4s ease-out;-o-transition:all .4s ease-out;transition:all .4s ease-out}.background-button[data-background-button].hide{background-color:transparent}.background-button[data-background-button].hide .background-button-wrapper[data-background-button]{opacity:0}.background-button[data-background-button] .background-button-wrapper[data-background-button]{position:absolute;overflow:hidden;width:100%;height:25%;line-height:100%;font-size:25%;top:50%;text-align:center}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button]{cursor:pointer;pointer-events:auto;font-family:Player;font-weight:400;font-style:normal;line-height:1;letter-spacing:0;speak:none;color:#fff;opacity:.75;border:0;outline:0;background-color:transparent;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button]:hover{opacity:1;text-shadow:rgba(255,255,255,.8) 0 0 15px}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playing:before{content:\"\\e002\"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].notplaying:before{content:\"\\e001\"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playstop.playing:before{content:\"\\e003\"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playstop.notplaying:before{content:\"\\e001\"}.media-control.media-control-hide[data-media-control] .background-button[data-background-button]{opacity:0}", dvr_controls: "@import url(http://fonts.googleapis.com/css?family=Roboto);.dvr-controls[data-dvr-controls]{display:inline-block;float:left;color:#fff;line-height:32px;font-size:10px;font-weight:700;margin-left:6px}.dvr-controls[data-dvr-controls] .live-info{cursor:default;font-family:Roboto,\"Open Sans\",Arial,sans-serif}.dvr-controls[data-dvr-controls] .live-info:before{content:\"\";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#ff0101}.dvr-controls[data-dvr-controls] .live-info.disabled{opacity:.3}.dvr-controls[data-dvr-controls] .live-info.disabled:before{background-color:#fff}.dvr-controls[data-dvr-controls] .live-button{cursor:pointer;outline:0;display:none;border:0;color:#fff;background-color:transparent;height:32px;padding:0;opacity:.7;font-family:Roboto,\"Open Sans\",Arial,sans-serif;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.dvr-controls[data-dvr-controls] .live-button:before{content:\"\";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#fff}.dvr-controls[data-dvr-controls] .live-button:hover{opacity:1;text-shadow:rgba(255,255,255,.75) 0 0 5px}.dvr .dvr-controls[data-dvr-controls] .live-info{display:none}.dvr .dvr-controls[data-dvr-controls] .live-button{display:block}.dvr.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#005aff}.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#ff0101}.seek-time[data-seek-time] span[data-duration]{position:relative;color:rgba(255,255,255,.5);font-size:10px;padding-right:7px}.seek-time[data-seek-time] span[data-duration]:before{content:\"|\";margin-right:7px}", poster: "@font-face{font-family:Player;src:url(\"<%= baseUrl %>/assets/Player-Regular.eot\");src:url(\"<%= baseUrl %>/assets/Player-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"<%= baseUrl %>/assets/Player-Regular.ttf\") format(\"truetype\"),url(\"<%= baseUrl %>/assets/Player-Regular.svg#player\") format(\"svg\")}.player-poster[data-poster]{cursor:pointer;position:absolute;height:100%;width:100%;z-index:998;top:0}.player-poster[data-poster] .poster-background[data-poster]{width:100%;height:100%;background-size:cover;background-repeat:no-repeat;background-position:50% 50%}.player-poster[data-poster] .play-wrapper[data-poster]{position:absolute;width:100%;height:25%;line-height:100%;font-size:25%;top:50%;text-align:center}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]{font-family:Player;font-weight:400;font-style:normal;line-height:1;letter-spacing:0;speak:none;color:#fff;opacity:.75;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:opacity text-shadow;-webkit-transition-delay:.1s;-moz-transition:opacity text-shadow .1s;-o-transition:opacity text-shadow .1s;transition:opacity text-shadow .1s ease}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster].play[data-poster]:before{content:\"\\e001\"}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]:hover{opacity:1;text-shadow:rgba(255,255,255,.8) 0 0 15px}", spinner_three_bounce: ".spinner-three-bounce[data-spinner]{position:absolute;margin:0 auto;width:70px;text-align:center;z-index:999;top:47%;left:0;right:0}.spinner-three-bounce[data-spinner]>div{width:18px;height:18px;background-color:#FFF;border-radius:100%;display:inline-block;-webkit-animation:bouncedelay 1.4s infinite ease-in-out;-moz-animation:bouncedelay 1.4s infinite ease-in-out;-ms-animation:bouncedelay 1.4s infinite ease-in-out;-o-animation:bouncedelay 1.4s infinite ease-in-out;animation:bouncedelay 1.4s infinite ease-in-out;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both}.spinner-three-bounce[data-spinner] [data-bounce1],.spinner-three-bounce[data-spinner] [data-bounce2]{-webkit-animation-delay:-.32s;-moz-animation-delay:-.32s;-ms-animation-delay:-.32s;-o-animation-delay:-.32s;animation-delay:-.32s}@-moz-keyframes bouncedelay{0%,100%,80%{-moz-transform:scale(0);transform:scale(0)}40%{-moz-transform:scale(1);transform:scale(1)}}@-webkit-keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@-o-keyframes bouncedelay{0%,100%,80%{-o-transform:scale(0);transform:scale(0)}40%{-o-transform:scale(1);transform:scale(1)}}@-ms-keyframes bouncedelay{0%,100%,80%{-ms-transform:scale(0);transform:scale(0)}40%{-ms-transform:scale(1);transform:scale(1)}}@keyframes bouncedelay{0%,100%,80%{transform:scale(0)}40%{transform:scale(1)}}", watermark: "[data-watermark]{position:absolute;margin:100px auto 0;width:70px;text-align:center;z-index:10}[data-watermark-bottom-left]{bottom:10px;left:10px}[data-watermark-bottom-right]{bottom:10px;right:42px}[data-watermark-top-left]{top:-95px;left:10px}[data-watermark-top-right]{top:-95px;right:37px}" } };

},{"template":"template"}],48:[function(require,module,exports){
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

},{"../../base/jst":47,"../../base/styler":48,"events":"events","ui_core_plugin":"ui_core_plugin"}],72:[function(require,module,exports){
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

},{"./poster":77}],"template":[function(require,module,exports){
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

},{"./utils":49,"base_object":"base_object","lodash.assign":2,"lodash.result":29,"zepto":"zepto"}],"zepto":[function(require,module,exports){
/* Zepto v1.1.4-80-ga9184b2 - zepto event ajax callbacks deferred touch selector ie - zeptojs.com/license */
var Zepto=function(){function D(t){return null==t?String(t):j[S.call(t)]||"object"}function L(t){return"function"==D(t)}function k(t){return null!=t&&t==t.window}function Z(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function $(t){return"object"==D(t)}function F(t){return $(t)&&!k(t)&&Object.getPrototypeOf(t)==Object.prototype}function R(t){return"number"==typeof t.length}function q(t){return s.call(t,function(t){return null!=t})}function W(t){return t.length>0?n.fn.concat.apply([],t):t}function z(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function H(t){return t in c?c[t]:c[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function _(t,e){return"number"!=typeof e||l[z(t)]?e:e+"px"}function I(t){var e,n;return f[t]||(e=u.createElement(t),u.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),f[t]=n),f[t]}function U(t){return"children"in t?a.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function X(t,e){var n,i=t?t.length:0;for(n=0;i>n;n++)this[n]=t[n];this.length=i,this.selector=e||""}function B(n,i,r){for(e in i)r&&(F(i[e])||A(i[e]))?(F(i[e])&&!F(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function V(t,e){return null==e?n(t):n(t).filter(e)}function Y(t,e,n,i){return L(e)?e.call(t,n,i):e}function J(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function G(e,n){var i=e.className||"",r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function K(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?n.parseJSON(t):t):t}catch(e){return t}}function Q(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)Q(t.childNodes[n],e)}var t,e,n,i,N,P,r=[],o=r.concat,s=r.filter,a=r.slice,u=window.document,f={},c={},l={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},h=/^\s*<(\w+|!)[^>]*>/,p=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,d=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,m=/^(?:body|html)$/i,g=/([A-Z])/g,v=["val","css","html","text","data","width","height","offset"],y=["after","prepend","before","append"],w=u.createElement("table"),x=u.createElement("tr"),b={tr:u.createElement("tbody"),tbody:w,thead:w,tfoot:w,td:x,th:x,"*":u.createElement("div")},E=/complete|loaded|interactive/,T=/^[\w-]*$/,j={},S=j.toString,C={},O=u.createElement("div"),M={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return C.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~C.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},N=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},P=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},C.fragment=function(e,i,r){var o,s,f;return p.test(e)&&(o=n(u.createElement(RegExp.$1))),o||(e.replace&&(e=e.replace(d,"<$1></$2>")),i===t&&(i=h.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,o=n.each(a.call(f.childNodes),function(){f.removeChild(this)})),F(r)&&(s=n(o),n.each(r,function(t,e){v.indexOf(t)>-1?s[t](e):s.attr(t,e)})),o},C.Z=function(t,e){return new X(t,e)},C.isZ=function(t){return t instanceof C.Z},C.init=function(e,i){var r;if(!e)return C.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&h.test(e))r=C.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=C.qsa(u,e)}else{if(L(e))return n(u).ready(e);if(C.isZ(e))return e;if(A(e))r=q(e);else if($(e))r=[e],e=null;else if(h.test(e))r=C.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=C.qsa(u,e)}}return C.Z(r,e)},n=function(t,e){return C.init(t,e)},n.extend=function(t){var e,n=a.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},C.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],o=i||r?e.slice(1):e,s=T.test(o);return t.getElementById&&s&&i?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:a.call(s&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=u.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=D,n.isFunction=L,n.isWindow=k,n.isArray=A,n.isPlainObject=F,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=N,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.noop=function(){},n.map=function(t,e){var n,r,o,i=[];if(R(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return W(i)},n.each=function(t,e){var n,i;if(R(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={constructor:C.Z,length:0,forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,splice:r.splice,indexOf:r.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=C.isZ(e)?e.toArray():e;return o.apply(C.isZ(this)?this.toArray():this,n)},map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(a.apply(this,arguments))},ready:function(t){return E.test(u.readyState)&&u.body?t(n):u.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?a.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return L(t)?this.not(this.not(t)):n(s.call(this,function(e){return C.matches(e,t)}))},add:function(t,e){return n(P(this.concat(n(t,e))))},is:function(t){return this.length>0&&C.matches(this[0],t)},not:function(e){var i=[];if(L(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):R(e)&&L(e.item)?a.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return $(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!$(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!$(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(C.qsa(this[0],t)):this.map(function(){return C.qsa(this,t)}):n()},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:C.matches(i,t));)i=i!==e&&!Z(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!Z(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return V(e,t)},parent:function(t){return V(P(this.pluck("parentNode")),t)},children:function(t){return V(this.map(function(){return U(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||a.call(this.childNodes)})},siblings:function(t){return V(this.map(function(t,e){return s.call(U(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=L(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=L(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(Y(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=Y(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if($(n))for(e in n)J(this,e,n[e]);else J(this,n,Y(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){J(this,t)},this)})},prop:function(t,e){return t=M[t]||t,1 in arguments?this.each(function(n){this[t]=Y(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(g,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?K(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=Y(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=Y(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;if(!n.contains(u.documentElement,this[0]))return{top:0,left:0};var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r,o=this[0];if(!o)return;if(r=getComputedStyle(o,""),"string"==typeof t)return o.style[N(t)]||r.getPropertyValue(t);if(A(t)){var s={};return n.each(t,function(t,e){s[e]=o.style[N(e)]||r.getPropertyValue(e)}),s}}var a="";if("string"==D(t))i||0===i?a=z(t)+":"+_(t,i):this.each(function(){this.style.removeProperty(z(t))});else for(e in t)t[e]||0===t[e]?a+=z(e)+":"+_(e,t[e])+";":this.each(function(){this.style.removeProperty(z(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(G(t))},H(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var r=G(this),o=Y(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&G(this,r+(r?" ":"")+i.join(" "))}}):this},removeClass:function(e){return this.each(function(n){if("className"in this){if(e===t)return G(this,"");i=G(this),Y(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(H(t)," ")}),G(this,i.trim())}})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=Y(this,e,r,G(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=m.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||u.body;t&&!m.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?k(s)?s["inner"+i]:Z(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,Y(this,r,t,s[e]()))})}}),y.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=D(e),"object"==t||"array"==t||null==e?e:C.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null;var f=n.contains(u.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,a),f&&Q(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),C.Z.prototype=X.prototype=n.fn,C.uniq=P,C.deserializeValue=K,n.zepto=C,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=T(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function T(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=w,r&&r.apply(i,arguments)},e[n]=x}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=w)),e}function j(t){var e,i={originalEvent:t};for(e in t)b.test(e)||t[e]===n||(i[e]=t[e]);return T(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var w=function(){return!0},x=function(){return!1},b=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(u===n||a===!1)&&(u=a,a=n),u===!1&&(u=x),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(j(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=x),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):T(e),e._args=n,this.each(function(){e.type in f&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=j(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),T(n)}}(Zepto),function(t){function h(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function p(t,e,i,r){return t.global?h(e||n,i,r):void 0}function d(e){e.global&&0===t.active++&&p(e,null,"ajaxStart")}function m(e){e.global&&!--t.active&&p(e,null,"ajaxStop")}function g(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||p(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void p(e,n,"ajaxSend",[t,e])}function v(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),p(n,r,"ajaxSuccess",[e,n,t]),w(o,e,n)}function y(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),p(i,o,"ajaxError",[n,i,t||e]),w(e,n,i)}function w(t,e,n){var i=n.context;n.complete.call(i,e,t),p(n,i,"ajaxComplete",[e,n]),m(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function E(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function T(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=E(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function C(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?C(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/,l=n.createElement("a");l.href=window.location.href,t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?v(f[0],l,i,r):y(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),g(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var a,u,o=t.extend({},e||{}),s=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===o[i]&&(o[i]=t.ajaxSettings[i]);d(o),o.crossDomain||(a=n.createElement("a"),a.href=o.url,a.href=a.href,o.crossDomain=l.protocol+"//"+l.host!=a.protocol+"//"+a.host),o.url||(o.url=window.location.toString()),(u=o.url.indexOf("#"))>-1&&(o.url=o.url.slice(0,u)),T(o);var f=o.dataType,h=/\?.+=\?/.test(o.url);if(h&&(f="jsonp"),o.cache!==!1&&(e&&e.cache===!0||"script"!=f&&"jsonp"!=f)||(o.url=E(o.url,"_="+Date.now())),"jsonp"==f)return h||(o.url=E(o.url,o.jsonp?o.jsonp+"=?":o.jsonp===!1?"":"callback=?")),t.ajaxJSONP(o,s);var N,p=o.accepts[f],m={},w=function(t,e){m[t.toLowerCase()]=[t,e]},j=/^([\w-]+:)\/\//.test(o.url)?RegExp.$1:window.location.protocol,S=o.xhr(),C=S.setRequestHeader;if(s&&s.promise(S),o.crossDomain||w("X-Requested-With","XMLHttpRequest"),w("Accept",p||"*/*"),(p=o.mimeType||p)&&(p.indexOf(",")>-1&&(p=p.split(",",2)[0]),S.overrideMimeType&&S.overrideMimeType(p)),(o.contentType||o.contentType!==!1&&o.data&&"GET"!=o.type.toUpperCase())&&w("Content-Type",o.contentType||"application/x-www-form-urlencoded"),o.headers)for(r in o.headers)w(r,o.headers[r]);if(S.setRequestHeader=w,S.onreadystatechange=function(){if(4==S.readyState){S.onreadystatechange=x,clearTimeout(N);var e,n=!1;if(S.status>=200&&S.status<300||304==S.status||0==S.status&&"file:"==j){f=f||b(o.mimeType||S.getResponseHeader("content-type")),e=S.responseText;try{"script"==f?(1,eval)(e):"xml"==f?e=S.responseXML:"json"==f&&(e=c.test(e)?null:t.parseJSON(e))}catch(i){n=i}n?y(n,"parsererror",S,o,s):v(e,S,o,s)}else y(S.statusText||null,S.status?"error":"abort",S,o,s)}},g(S,o)===!1)return S.abort(),y(null,"abort",S,o,s),S;if(o.xhrFields)for(r in o.xhrFields)S[r]=o.xhrFields[r];var P="async"in o?o.async:!0;S.open(o.type,o.url,P,o.username,o.password);for(r in m)C.apply(S,m[r]);return o.timeout>0&&(N=setTimeout(function(){S.onreadystatechange=x,S.abort(),y(null,"timeout",S,o,s)},o.timeout)),S.send(o.data?o.data:null),S},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var S=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(S(e)+"="+S(n))},C(i,e,n),i.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.Callbacks=function(e){e=t.extend({},e);var n,i,r,o,s,a,u=[],f=!e.once&&[],c=function(t){for(n=e.memory&&t,i=!0,a=o||0,o=0,s=u.length,r=!0;u&&s>a;++a)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}r=!1,u&&(f?f.length&&c(f.shift()):n?u.length=0:l.disable())},l={add:function(){if(u){var i=u.length,a=function(n){t.each(n,function(t,n){"function"==typeof n?e.unique&&l.has(n)||u.push(n):n&&n.length&&"string"!=typeof n&&a(n)})};a(arguments),r?s=u.length:n&&(o=i,c(n))}return this},remove:function(){return u&&t.each(arguments,function(e,n){for(var i;(i=t.inArray(n,u,i))>-1;)u.splice(i,1),r&&(s>=i&&--s,a>=i&&--a)}),this},has:function(e){return!(!u||!(e?t.inArray(e,u)>-1:u.length))},empty:function(){return s=u.length=0,this},disable:function(){return u=f=n=void 0,this},disabled:function(){return!u},lock:function(){return f=void 0,n||l.disable(),this},locked:function(){return!f},fireWith:function(t,e){return!u||i&&!f||(e=e||[],e=[t,e.slice?e.slice():e],r?f.push(e):c(e)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!i}};return l}}(Zepto),function(t){function n(e){var i=[["resolve","done",t.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",t.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",t.Callbacks({memory:1})]],r="pending",o={state:function(){return r},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var e=arguments;return n(function(n){t.each(i,function(i,r){var a=t.isFunction(e[i])&&e[i];s[r[1]](function(){var e=a&&a.apply(this,arguments);if(e&&t.isFunction(e.promise))e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else{var i=this===o?n.promise():this,s=a?[e]:arguments;n[r[0]+"With"](i,s)}})}),e=null}).promise()},promise:function(e){return null!=e?t.extend(e,o):o}},s={};return t.each(i,function(t,e){var n=e[2],a=e[3];o[e[1]]=n.add,a&&n.add(function(){r=a},i[1^t][2].disable,i[2][2].lock),s[e[0]]=function(){return s[e[0]+"With"](this===s?o:this,arguments),this},s[e[0]+"With"]=n.fireWith}),o.promise(s),e&&e.call(s,s),s}var e=Array.prototype.slice;t.when=function(i){var f,c,l,r=e.call(arguments),o=r.length,s=0,a=1!==o||i&&t.isFunction(i.promise)?o:0,u=1===a?i:n(),h=function(t,n,i){return function(r){n[t]=this,i[t]=arguments.length>1?e.call(arguments):r,i===f?u.notifyWith(n,i):--a||u.resolveWith(n,i)}};if(o>1)for(f=new Array(o),c=new Array(o),l=new Array(o);o>s;++s)r[s]&&t.isFunction(r[s].promise)?r[s].promise().done(h(s,l,r)).fail(u.reject).progress(h(s,c,f)):--a;return a||u.resolveWith(l,r),u.promise()},t.Deferred=n}(Zepto),function(t){function u(t,e,n,i){return Math.abs(t-e)>=Math.abs(n-i)?t-e>0?"Left":"Right":n-i>0?"Up":"Down"}function f(){o=null,e.last&&(e.el.trigger("longTap"),e={})}function c(){o&&clearTimeout(o),o=null}function l(){n&&clearTimeout(n),i&&clearTimeout(i),r&&clearTimeout(r),o&&clearTimeout(o),n=i=r=o=null,e={}}function h(t){return("touch"==t.pointerType||t.pointerType==t.MSPOINTER_TYPE_TOUCH)&&t.isPrimary}function p(t,e){return t.type=="pointer"+e||t.type.toLowerCase()=="mspointer"+e}var n,i,r,o,a,e={},s=750;t(document).ready(function(){var d,m,y,w,g=0,v=0;"MSGesture"in window&&(a=new MSGesture,a.target=document.body),t(document).bind("MSGestureEnd",function(t){var n=t.velocityX>1?"Right":t.velocityX<-1?"Left":t.velocityY>1?"Down":t.velocityY<-1?"Up":null;n&&(e.el.trigger("swipe"),e.el.trigger("swipe"+n))}).on("touchstart MSPointerDown pointerdown",function(i){(!(w=p(i,"down"))||h(i))&&(y=w?i:i.touches[0],i.touches&&1===i.touches.length&&e.x2&&(e.x2=void 0,e.y2=void 0),d=Date.now(),m=d-(e.last||d),e.el=t("tagName"in y.target?y.target:y.target.parentNode),n&&clearTimeout(n),e.x1=y.pageX,e.y1=y.pageY,m>0&&250>=m&&(e.isDoubleTap=!0),e.last=d,o=setTimeout(f,s),a&&w&&a.addPointer(i.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){(!(w=p(t,"move"))||h(t))&&(y=w?t:t.touches[0],c(),e.x2=y.pageX,e.y2=y.pageY,g+=Math.abs(e.x1-e.x2),v+=Math.abs(e.y1-e.y2))}).on("touchend MSPointerUp pointerup",function(o){(!(w=p(o,"up"))||h(o))&&(c(),e.x2&&Math.abs(e.x1-e.x2)>30||e.y2&&Math.abs(e.y1-e.y2)>30?r=setTimeout(function(){e.el.trigger("swipe"),e.el.trigger("swipe"+u(e.x1,e.x2,e.y1,e.y2)),e={}},0):"last"in e&&(30>g&&30>v?i=setTimeout(function(){var i=t.Event("tap");i.cancelTouch=l,e.el.trigger(i),e.isDoubleTap?(e.el&&e.el.trigger("doubleTap"),e={}):n=setTimeout(function(){n=null,e.el&&e.el.trigger("singleTap"),e={}},250)},0):e={}),g=v=0)}).on("touchcancel MSPointerCancel pointercancel",l),t(window).on("scroll",l)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(t){return this.on(e,t)}})}(Zepto),function(t){function r(e){return e=t(e),!(!e.width()&&!e.height())&&"none"!==e.css("display")}function f(t,e){t=t.replace(/=#\]/g,'="#"]');var n,i,r=s.exec(t);if(r&&r[2]in o&&(n=o[r[2]],i=r[3],t=r[1],i)){var a=Number(i);i=isNaN(a)?i.replace(/^["']|["']$/g,""):a}return e(t,n,i)}var e=t.zepto,n=e.qsa,i=e.matches,o=t.expr[":"]={visible:function(){return r(this)?this:void 0},hidden:function(){return r(this)?void 0:this},selected:function(){return this.selected?this:void 0},checked:function(){return this.checked?this:void 0},parent:function(){return this.parentNode},first:function(t){return 0===t?this:void 0},last:function(t,e){return t===e.length-1?this:void 0},eq:function(t,e,n){return t===n?this:void 0},contains:function(e,n,i){return t(this).text().indexOf(i)>-1?this:void 0},has:function(t,n,i){return e.qsa(this,i).length?this:void 0}},s=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),a=/^\s*>/,u="Zepto"+ +new Date;e.qsa=function(i,r){return f(r,function(o,s,f){try{var c;!o&&s?o="*":a.test(o)&&(c=t(i).addClass(u),o="."+u+" "+o);var l=n(i,o)}catch(h){throw console.error("error performing selector: %o",r),h}finally{c&&c.removeClass(u)}return s?e.uniq(t.map(l,function(t,e){return s.call(t,e,l,f)})):l})},e.matches=function(t,e){return f(e,function(e,n,r){return!(e&&!i(t,e)||n&&n.call(t,null,r)!==t)})}}(Zepto),function(){try{getComputedStyle(void 0)}catch(t){var e=getComputedStyle;window.getComputedStyle=function(t){try{return e(t)}catch(n){return null}}}}();
module.exports = Zepto;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9tYWluLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlY29weS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vhc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZXlzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2FyZ3VtZW50cy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vhc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZXlzL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNhcnJheS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vhc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZXlzL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNuYXRpdmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9jcmVhdGVhc3NpZ25lci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2NyZWF0ZWFzc2lnbmVyL25vZGVfbW9kdWxlcy9sb2Rhc2guX2JpbmRjYWxsYmFjay9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2NyZWF0ZWFzc2lnbmVyL25vZGVfbW9kdWxlcy9sb2Rhc2guX2lzaXRlcmF0ZWVjYWxsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VjYWxsYmFjay9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZmluZC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlY2FsbGJhY2svbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWNhbGxiYWNrL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guaXN0eXBlZGFycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VlYWNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VmaW5kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guZmluZGluZGV4L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5vbmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5vbmNlL25vZGVfbW9kdWxlcy9sb2Rhc2guYmVmb3JlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5yZXN1bHQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnJlc3VsdC9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZnVuY3Rpb24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZXVuaXEvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZXVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWluZGV4b2YvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZXVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fY2FjaGVpbmRleG9mL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC51bmlxL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2V1bmlxL25vZGVfbW9kdWxlcy9sb2Rhc2guX2NyZWF0ZWNhY2hlL2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvYmFzZS9qc3QuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9iYXNlL3N0eWxlci5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2Jhc2UvdXRpbHMuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lci9jb250YWluZXIuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lcl9mYWN0b3J5L2NvbnRhaW5lcl9mYWN0b3J5LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvY29tcG9uZW50cy9jb250YWluZXJfZmFjdG9yeS9pbmRleC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2NvbXBvbmVudHMvY29yZS9jb3JlLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvY29tcG9uZW50cy9jb3JlX2ZhY3RvcnkvY29yZV9mYWN0b3J5LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvY29tcG9uZW50cy9jb3JlX2ZhY3RvcnkvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL2xvYWRlci9pbmRleC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2NvbXBvbmVudHMvbWVkaWFfY29udHJvbC9tZWRpYV9jb250cm9sLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvY29tcG9uZW50cy9wbGF5ZXIuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL3NlZWtfdGltZS9pbmRleC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2NvbXBvbmVudHMvc2Vla190aW1lL3NlZWtfdGltZS5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsYXliYWNrcy9mbGFzaC9mbGFzaC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsYXliYWNrcy9obHMvaGxzLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWw1X2F1ZGlvL2h0bWw1X2F1ZGlvLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWw1X3ZpZGVvL2h0bWw1X3ZpZGVvLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWxfaW1nL2h0bWxfaW1nLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGxheWJhY2tzL25vX29wL2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGxheWJhY2tzL25vX29wL25vX29wLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGx1Z2lucy9jbGlja190b19wYXVzZS9jbGlja190b19wYXVzZS5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsdWdpbnMvY2xpY2tfdG9fcGF1c2UvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbHVnaW5zL2R2cl9jb250cm9scy9kdnJfY29udHJvbHMuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbHVnaW5zL2R2cl9jb250cm9scy9pbmRleC5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsdWdpbnMvZ29vZ2xlX2FuYWx5dGljcy9nb29nbGVfYW5hbHl0aWNzLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGx1Z2lucy9nb29nbGVfYW5hbHl0aWNzL2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGx1Z2lucy9sb2cvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbHVnaW5zL2xvZy9sb2cuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbHVnaW5zL3Bvc3Rlci9wb3N0ZXIuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbHVnaW5zL3NwaW5uZXJfdGhyZWVfYm91bmNlL2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGx1Z2lucy9zcGlubmVyX3RocmVlX2JvdW5jZS9zcGlubmVyX3RocmVlX2JvdW5jZS5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL3BsdWdpbnMvc3RhdHMvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbHVnaW5zL3N0YXRzL3N0YXRzLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGx1Z2lucy93YXRlcm1hcmsvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbHVnaW5zL3dhdGVybWFyay93YXRlcm1hcmsuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9iYXNlL2Jhc2Vfb2JqZWN0LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvY29tcG9uZW50cy9icm93c2VyLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvYmFzZS9jb250YWluZXJfcGx1Z2luLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvY29tcG9uZW50cy9jb250YWluZXIvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9iYXNlL2NvcmVfcGx1Z2luLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvY29tcG9uZW50cy9jb3JlL2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvYmFzZS9ldmVudHMuanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbGF5YmFja3MvZmxhc2gvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9wbGF5YmFja3MvaGxzL2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWw1X2F1ZGlvL2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWw1X3ZpZGVvL2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWxfaW1nL2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvYmFzZS9raWJvLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvY29tcG9uZW50cy9tZWRpYV9jb250cm9sL2luZGV4LmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvY29tcG9uZW50cy9tZWRpYXRvci5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2Jhc2UvcGxheWJhY2suanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9jb21wb25lbnRzL3BsYXllcl9pbmZvLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvcGx1Z2lucy9wb3N0ZXIvaW5kZXguanMiLCIvVXNlcnMvZmxhdmlvLmJhcmJvc2EvRGV2ZWxvcG1lbnQvY2xhcHByL3NyYy9iYXNlL3RlbXBsYXRlLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvYmFzZS91aV9jb250YWluZXJfcGx1Z2luLmpzIiwiL1VzZXJzL2ZsYXZpby5iYXJib3NhL0RldmVsb3BtZW50L2NsYXBwci9zcmMvYmFzZS91aV9jb3JlX3BsdWdpbi5qcyIsIi9Vc2Vycy9mbGF2aW8uYmFyYm9zYS9EZXZlbG9wbWVudC9jbGFwcHIvc3JjL2Jhc2UvdWlfb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NsYXBwci16ZXB0by96ZXB0by5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNJQSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUMzQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDbEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBOztBQUU5QixNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTs7QUFFcEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUE7QUFDdEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFBOztBQUVyQyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7OztBQ2I5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFFLEVBQUUsRUFBRSxLQUFLO0FBQ2xDLElBQUUsRUFBRSxXQUFXO0FBQ2YsSUFBRSxFQUFFLEtBQUs7QUFDVCxJQUFFLEVBQUUsT0FBTztBQUNYLElBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNO0FBQzdDLElBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHO0FBQ3hGLElBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUc7QUFDeE8sS0FBRyxFQUFFLElB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QixNQUFNO0FBQ0wsY0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBO1NBQzNDO09BQ0Y7Ozs7U0FyRUcsUUFBUTtHQUFTLFVBQVU7O0FBd0VqQyxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQTs7O0FDcEZ6QjtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3BsYXllcicpXG52YXIgTWVkaWF0b3IgPSByZXF1aXJlKCdtZWRpYXRvcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcblxud2luZG93LkRFQlVHID0gZmFsc2Vcblxud2luZG93LkNsYXBwciA9IHsgUGxheWVyOiBQbGF5ZXIsIE1lZGlhdG9yOiBNZWRpYXRvciwgRXZlbnRzOiBFdmVudHMgfVxud2luZG93LkNsYXBwci52ZXJzaW9uID0gXCJfX1ZFUlNJT05fX1wiXG5cbm1vZHVsZS5leHBvcnRzID0gd2luZG93LkNsYXBwclxuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlQXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlYXNzaWduJyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCdsb2Rhc2guX2NyZWF0ZWFzc2lnbmVyJyk7XG5cbi8qKlxuICogQXNzaWducyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykgdG8gdGhlIGRlc3RpbmF0aW9uXG4gKiBvYmplY3QuIFN1YnNlcXVlbnQgc291cmNlcyBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy5cbiAqIElmIGBjdXN0b21pemVyYCBpcyBwcm92aWRlZCBpdCBpcyBpbnZva2VkIHRvIHByb2R1Y2UgdGhlIGFzc2lnbmVkIHZhbHVlcy5cbiAqIFRoZSBgY3VzdG9taXplcmAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggZml2ZSBhcmd1bWVudHM7XG4gKiAob2JqZWN0VmFsdWUsIHNvdXJjZVZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIGV4dGVuZFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25pbmcgdmFsdWVzLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjdXN0b21pemVyYC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uYXNzaWduKHsgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICdhZ2UnOiA0MCB9LCB7ICd1c2VyJzogJ2ZyZWQnIH0pO1xuICogLy8gPT4geyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IDQwIH1cbiAqXG4gKiAvLyB1c2luZyBhIGN1c3RvbWl6ZXIgY2FsbGJhY2tcbiAqIHZhciBkZWZhdWx0cyA9IF8ucGFydGlhbFJpZ2h0KF8uYXNzaWduLCBmdW5jdGlvbih2YWx1ZSwgb3RoZXIpIHtcbiAqICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJyA/IG90aGVyIDogdmFsdWU7XG4gKiB9KTtcbiAqXG4gKiBkZWZhdWx0cyh7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAnYWdlJzogMzYgfSwgeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2IH1cbiAqL1xudmFyIGFzc2lnbiA9IGNyZWF0ZUFzc2lnbmVyKGJhc2VBc3NpZ24pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUNvcHkgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2Vjb3B5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uYXNzaWduYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFyZ3VtZW50IGp1Z2dsaW5nLFxuICogbXVsdGlwbGUgc291cmNlcywgYW5kIGB0aGlzYCBiaW5kaW5nIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25pbmcgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyKSB7XG4gIHZhciBwcm9wcyA9IGtleXMoc291cmNlKTtcbiAgaWYgKCFjdXN0b21pemVyKSB7XG4gICAgcmV0dXJuIGJhc2VDb3B5KHNvdXJjZSwgb2JqZWN0LCBwcm9wcyk7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICByZXN1bHQgPSBjdXN0b21pemVyKHZhbHVlLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG5cbiAgICBpZiAoKHJlc3VsdCA9PT0gcmVzdWx0ID8gKHJlc3VsdCAhPT0gdmFsdWUpIDogKHZhbHVlID09PSB2YWx1ZSkpIHx8XG4gICAgICAgICh0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VBc3NpZ247XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIENvcGllcyB0aGUgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGNvcHkuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlQ29weShzb3VyY2UsIG9iamVjdCwgcHJvcHMpIHtcbiAgaWYgKCFwcm9wcykge1xuICAgIHByb3BzID0gb2JqZWN0O1xuICAgIG9iamVjdCA9IHt9O1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBvYmplY3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNvcHk7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuNCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FycmF5JyksXG4gICAgaXNOYXRpdmUgPSByZXF1aXJlKCdsb2Rhc2guaXNuYXRpdmUnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gaXNOYXRpdmUobmF0aXZlS2V5cyA9IE9iamVjdC5rZXlzKSAmJiBuYXRpdmVLZXlzO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQW4gb2JqZWN0IGVudmlyb25tZW50IGZlYXR1cmUgZmxhZ3MuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEB0eXBlIE9iamVjdFxuICovXG52YXIgc3VwcG9ydCA9IHt9O1xuXG4oZnVuY3Rpb24oeCkge1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgYGFyZ3VtZW50c2Agb2JqZWN0IGluZGV4ZXMgYXJlIG5vbi1lbnVtZXJhYmxlLlxuICAgKlxuICAgKiBJbiBGaXJlZm94IDwgNCwgSUUgPCA5LCBQaGFudG9tSlMsIGFuZCBTYWZhcmkgPCA1LjEgYGFyZ3VtZW50c2Agb2JqZWN0XG4gICAqIGluZGV4ZXMgYXJlIG5vbi1lbnVtZXJhYmxlLiBDaHJvbWUgPCAyNSBhbmQgTm9kZS5qcyA8IDAuMTEuMCB0cmVhdFxuICAgKiBgYXJndW1lbnRzYCBvYmplY3QgaW5kZXhlcyBhcyBub24tZW51bWVyYWJsZSBhbmQgZmFpbCBgaGFzT3duUHJvcGVydHlgXG4gICAqIGNoZWNrcyBmb3IgaW5kZXhlcyB0aGF0IGV4Y2VlZCB0aGVpciBmdW5jdGlvbidzIGZvcm1hbCBwYXJhbWV0ZXJzIHdpdGhcbiAgICogYXNzb2NpYXRlZCB2YWx1ZXMgb2YgYDBgLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy5zdXBwb3J0XG4gICAqIEB0eXBlIGJvb2xlYW5cbiAgICovXG4gIHRyeSB7XG4gICAgc3VwcG9ydC5ub25FbnVtQXJncyA9ICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIH0gY2F0Y2goZSkge1xuICAgIHN1cHBvcnQubm9uRW51bUFyZ3MgPSB0cnVlO1xuICB9XG59KDAsIDApKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSArdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBFUyBgVG9MZW5ndGhgLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2Agd2hpY2ggY3JlYXRlcyBhbiBhcnJheSBvZiB0aGVcbiAqIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIHNoaW1LZXlzKG9iamVjdCkge1xuICB2YXIgcHJvcHMgPSBrZXlzSW4ob2JqZWN0KSxcbiAgICAgIHByb3BzTGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgbGVuZ3RoID0gcHJvcHNMZW5ndGggJiYgb2JqZWN0Lmxlbmd0aDtcblxuICB2YXIgYWxsb3dJbmRleGVzID0gbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IChzdXBwb3J0Lm5vbkVudW1BcmdzICYmIGlzQXJndW1lbnRzKG9iamVjdCkpKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgcHJvcHNMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmICgoYWxsb3dJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QpIHtcbiAgICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgfVxuICBpZiAoKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCkgfHxcbiAgICAgICh0eXBlb2Ygb2JqZWN0ICE9ICdmdW5jdGlvbicgJiYgKGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpKSkpIHtcbiAgICByZXR1cm4gc2hpbUtleXMob2JqZWN0KTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3Qob2JqZWN0KSA/IG5hdGl2ZUtleXMob2JqZWN0KSA6IFtdO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICBsZW5ndGggPSAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IChzdXBwb3J0Lm5vbkVudW1BcmdzICYmIGlzQXJndW1lbnRzKG9iamVjdCkpKSAmJiBsZW5ndGgpIHx8IDA7XG5cbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgaXNQcm90byA9IHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCksXG4gICAgICBza2lwSW5kZXhlcyA9IGxlbmd0aCA+IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gKGluZGV4ICsgJycpO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShza2lwSW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgJiZcbiAgICAgICAgIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIChmdW5jdGlvbigpIHsgcmV0dXJuIF8uaXNBcmd1bWVudHMoYXJndW1lbnRzKTsgfSkoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICB2YXIgbGVuZ3RoID0gaXNPYmplY3RMaWtlKHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA6IHVuZGVmaW5lZDtcbiAgcmV0dXJuIChpc0xlbmd0aChsZW5ndGgpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUhvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycy5cbiAqIFNlZSB0aGlzIFthcnRpY2xlIG9uIGBSZWdFeHBgIGNoYXJhY3RlcnNdKGh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL2NoYXJhY3RlcnMuaHRtbCNzcGVjaWFsKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhcnMgPSAvWy4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2csXG4gICAgcmVIYXNSZWdFeHBDaGFycyA9IFJlZ0V4cChyZVJlZ0V4cENoYXJzLnNvdXJjZSk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBpZiBpdCBpcyBub3Qgb25lLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWRcbiAqIGZvciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogKHZhbHVlICsgJycpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZU5hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBlc2NhcGVSZWdFeHAob2JqVG9TdHJpbmcpXG4gIC5yZXBsYWNlKC90b1N0cmluZ3woZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0FycmF5ID0gaXNOYXRpdmUobmF0aXZlSXNBcnJheSA9IEFycmF5LmlzQXJyYXkpICYmIG5hdGl2ZUlzQXJyYXk7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIChmdW5jdGlvbigpIHsgcmV0dXJuIF8uaXNBcnJheShhcmd1bWVudHMpOyB9KSgpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFycmF5VGFnKSB8fCBmYWxzZTtcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZykge1xuICAgIHJldHVybiByZU5hdGl2ZS50ZXN0KGZuVG9TdHJpbmcuY2FsbCh2YWx1ZSkpO1xuICB9XG4gIHJldHVybiAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiByZUhvc3RDdG9yLnRlc3QodmFsdWUpKSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBFc2NhcGVzIHRoZSBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMgXCJcXFwiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsIFwiKlwiLFxuICogXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczovL2xvZGFzaFxcLmNvbS9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUhvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycy5cbiAqIFNlZSB0aGlzIFthcnRpY2xlIG9uIGBSZWdFeHBgIGNoYXJhY3RlcnNdKGh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL2NoYXJhY3RlcnMuaHRtbCNzcGVjaWFsKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhcnMgPSAvWy4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2csXG4gICAgcmVIYXNSZWdFeHBDaGFycyA9IFJlZ0V4cChyZVJlZ0V4cENoYXJzLnNvdXJjZSk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBpZiBpdCBpcyBub3Qgb25lLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWRcbiAqIGZvciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogKHZhbHVlICsgJycpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZU5hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBlc2NhcGVSZWdFeHAob2JqVG9TdHJpbmcpXG4gIC5yZXBsYWNlKC90b1N0cmluZ3woZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIHJlSG9zdEN0b3IudGVzdCh2YWx1ZSkpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIiwgXCIqXCIsXG4gKiBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOi8vbG9kYXNoXFwuY29tL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc05hdGl2ZTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnbG9kYXNoLl9iaW5kY2FsbGJhY2snKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJ2xvZGFzaC5faXNpdGVyYXRlZWNhbGwnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBhc3NpZ25zIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKSB0byBhIGdpdmVuXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgbGVuZ3RoID0gYXJncy5sZW5ndGgsXG4gICAgICAgIG9iamVjdCA9IGFyZ3NbMF07XG5cbiAgICBpZiAobGVuZ3RoIDwgMiB8fCBvYmplY3QgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gICAgdmFyIGN1c3RvbWl6ZXIgPSBhcmdzW2xlbmd0aCAtIDJdLFxuICAgICAgICB0aGlzQXJnID0gYXJnc1tsZW5ndGggLSAxXSxcbiAgICAgICAgZ3VhcmQgPSBhcmdzWzNdO1xuXG4gICAgaWYgKGxlbmd0aCA+IDMgJiYgdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3VzdG9taXplciA9IGJpbmRDYWxsYmFjayhjdXN0b21pemVyLCB0aGlzQXJnLCA1KTtcbiAgICAgIGxlbmd0aCAtPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXN0b21pemVyID0gKGxlbmd0aCA+IDIgJiYgdHlwZW9mIHRoaXNBcmcgPT0gJ2Z1bmN0aW9uJykgPyB0aGlzQXJnIDogbnVsbDtcbiAgICAgIGxlbmd0aCAtPSAoY3VzdG9taXplciA/IDEgOiAwKTtcbiAgICB9XG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKGFyZ3NbMV0sIGFyZ3NbMl0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA9PSAzID8gbnVsbCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAyO1xuICAgIH1cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJnc1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBc3NpZ25lcjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlQ2FsbGJhY2tgIHdoaWNoIG9ubHkgc3VwcG9ydHMgYHRoaXNgIGJpbmRpbmdcbiAqIGFuZCBzcGVjaWZ5aW5nIHRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBiaW5kLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJpbmRDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZW9mIHRoaXNBcmcgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZnVuYztcbiAgfVxuICBzd2l0Y2ggKGFyZ0NvdW50KSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqIF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZENhbGxiYWNrO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjQgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICt2YWx1ZTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHByb3ZpZGVkIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcicpIHtcbiAgICB2YXIgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aCxcbiAgICAgICAgcHJlcmVxID0gaXNMZW5ndGgobGVuZ3RoKSAmJiBpc0luZGV4KGluZGV4LCBsZW5ndGgpO1xuICB9IGVsc2Uge1xuICAgIHByZXJlcSA9IHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0O1xuICB9XG4gIGlmIChwcmVyZXEpIHtcbiAgICB2YXIgb3RoZXIgPSBvYmplY3RbaW5kZXhdO1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyAodmFsdWUgPT09IG90aGVyKSA6IChvdGhlciAhPT0gb3RoZXIpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIEVTIGBUb0xlbmd0aGAuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogKipOb3RlOioqIFNlZSB0aGUgW0VTNSBzcGVjXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKHZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSXRlcmF0ZWVDYWxsO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VjYWxsYmFjaycpLFxuICAgIGJhc2VFYWNoID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlZWFjaCcpLFxuICAgIGJhc2VGaW5kID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlZmluZCcpLFxuICAgIGZpbmRJbmRleCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kaW5kZXgnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKTtcblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYCwgcmV0dXJuaW5nIHRoZSBmaXJzdCBlbGVtZW50XG4gKiBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IuIFRoZSBwcmVkaWNhdGUgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZFxuICogaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICpcbiAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLnByb3BlcnR5XCJcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIElmIGFuIG9iamVjdCBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLm1hdGNoZXNcIiBzdHlsZVxuICogY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZ2l2ZW5cbiAqIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgZGV0ZWN0XG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fHN0cmluZ30gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZFxuICogIHBlciBpdGVyYXRpb24uIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcHJvdmlkZWQgaXQgaXMgdXNlZCB0b1xuICogIGNyZWF0ZSBhIFwiXy5wcm9wZXJ0eVwiIG9yIFwiXy5tYXRjaGVzXCIgc3R5bGUgY2FsbGJhY2sgcmVzcGVjdGl2ZWx5LlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBwcmVkaWNhdGVgLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hdGNoZWQgZWxlbWVudCwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0gW1xuICogICB7ICd1c2VyJzogJ2Jhcm5leScsICAnYWdlJzogMzYsICdhY3RpdmUnOiBmYWxzZSB9LFxuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICAnYWdlJzogNDAsICdhY3RpdmUnOiB0cnVlIH0sXG4gKiAgIHsgJ3VzZXInOiAncGViYmxlcycsICdhZ2UnOiAxLCAgJ2FjdGl2ZSc6IGZhbHNlIH1cbiAqIF07XG4gKlxuICogXy5yZXN1bHQoXy5maW5kKHVzZXJzLCBmdW5jdGlvbihjaHIpIHsgcmV0dXJuIGNoci5hZ2UgPCA0MDsgfSksICd1c2VyJyk7XG4gKiAvLyA9PiAnYmFybmV5J1xuICpcbiAqIC8vIHVzaW5nIHRoZSBcIl8ubWF0Y2hlc1wiIGNhbGxiYWNrIHNob3J0aGFuZFxuICogXy5yZXN1bHQoXy5maW5kKHVzZXJzLCB7ICdhZ2UnOiAxIH0pLCAndXNlcicpO1xuICogLy8gPT4gJ3BlYmJsZXMnXG4gKlxuICogLy8gdXNpbmcgdGhlIFwiXy5wcm9wZXJ0eVwiIGNhbGxiYWNrIHNob3J0aGFuZFxuICogXy5yZXN1bHQoXy5maW5kKHVzZXJzLCAnYWN0aXZlJyksICd1c2VyJyk7XG4gKiAvLyA9PiAnZnJlZCdcbiAqL1xuZnVuY3Rpb24gZmluZChjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgaWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICB2YXIgaW5kZXggPSBmaW5kSW5kZXgoY29sbGVjdGlvbiwgcHJlZGljYXRlLCB0aGlzQXJnKTtcbiAgICByZXR1cm4gaW5kZXggPiAtMSA/IGNvbGxlY3Rpb25baW5kZXhdIDogdW5kZWZpbmVkO1xuICB9XG4gIHByZWRpY2F0ZSA9IGJhc2VDYWxsYmFjayhwcmVkaWNhdGUsIHRoaXNBcmcsIDMpO1xuICByZXR1cm4gYmFzZUZpbmQoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBiYXNlRWFjaCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmluZDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMS4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2Vpc2VxdWFsJyksXG4gICAgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnbG9kYXNoLl9iaW5kY2FsbGJhY2snKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnbG9kYXNoLmtleXMnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY2FsbGJhY2tgIHdoaWNoIHN1cHBvcnRzIHNwZWNpZnlpbmcgdGhlXG4gKiBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IFtmdW5jPV8uaWRlbnRpdHldIFRoZSB2YWx1ZSB0byBjb252ZXJ0IHRvIGEgY2FsbGJhY2suXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcmdDb3VudF0gVGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBiYXNlQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgZnVuYztcbiAgaWYgKHR5cGUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiAodHlwZW9mIHRoaXNBcmcgIT0gJ3VuZGVmaW5lZCcpXG4gICAgICA/IGJpbmRDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudClcbiAgICAgIDogZnVuYztcbiAgfVxuICBpZiAoZnVuYyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0eXBlID09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGJhc2VNYXRjaGVzKGZ1bmMpO1xuICB9XG4gIHJldHVybiB0eXBlb2YgdGhpc0FyZyA9PSAndW5kZWZpbmVkJ1xuICAgID8gYmFzZVByb3BlcnR5KGZ1bmMgKyAnJylcbiAgICA6IGJhc2VNYXRjaGVzUHJvcGVydHkoZnVuYyArICcnLCB0aGlzQXJnKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc01hdGNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIG9yIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBzb3VyY2UgcHJvcGVydHkgbmFtZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHNvdXJjZSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSBzdHJpY3RDb21wYXJlRmxhZ3MgU3RyaWN0IGNvbXBhcmlzb24gZmxhZ3MgZm9yIHNvdXJjZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgb2JqZWN0YCBpcyBhIG1hdGNoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc01hdGNoKG9iamVjdCwgcHJvcHMsIHZhbHVlcywgc3RyaWN0Q29tcGFyZUZsYWdzLCBjdXN0b21pemVyKSB7XG4gIHZhciBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiAhbGVuZ3RoO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbm9DdXN0b21pemVyID0gIWN1c3RvbWl6ZXI7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoKG5vQ3VzdG9taXplciAmJiBzdHJpY3RDb21wYXJlRmxhZ3NbaW5kZXhdKVxuICAgICAgICAgID8gdmFsdWVzW2luZGV4XSAhPT0gb2JqZWN0W3Byb3BzW2luZGV4XV1cbiAgICAgICAgICA6ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcHNbaW5kZXhdKVxuICAgICAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaW5kZXggPSAtMTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmIChub0N1c3RvbWl6ZXIgJiYgc3RyaWN0Q29tcGFyZUZsYWdzW2luZGV4XSkge1xuICAgICAgdmFyIHJlc3VsdCA9IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgICBzcmNWYWx1ZSA9IHZhbHVlc1tpbmRleF07XG5cbiAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5KSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJlc3VsdCA9IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgY3VzdG9taXplciwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNgIHdoaWNoIGRvZXMgbm90IGNsb25lIGBzb3VyY2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzKHNvdXJjZSkge1xuICB2YXIgcHJvcHMgPSBrZXlzKHNvdXJjZSksXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgaWYgKGxlbmd0aCA9PSAxKSB7XG4gICAgdmFyIGtleSA9IHByb3BzWzBdLFxuICAgICAgICB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgaWYgKGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIG9iamVjdFtrZXldID09PSB2YWx1ZSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KTtcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIHZhciB2YWx1ZXMgPSBBcnJheShsZW5ndGgpLFxuICAgICAgc3RyaWN0Q29tcGFyZUZsYWdzID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICB2YWx1ZSA9IHNvdXJjZVtwcm9wc1tsZW5ndGhdXTtcbiAgICB2YWx1ZXNbbGVuZ3RoXSA9IHZhbHVlO1xuICAgIHN0cmljdENvbXBhcmVGbGFnc1tsZW5ndGhdID0gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIGJhc2VJc01hdGNoKG9iamVjdCwgcHJvcHMsIHZhbHVlcywgc3RyaWN0Q29tcGFyZUZsYWdzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzUHJvcGVydHlgIHdoaWNoIGRvZXMgbm90IGNvZXJjZSBga2V5YFxuICogdG8gYSBzdHJpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlc1Byb3BlcnR5KGtleSwgdmFsdWUpIHtcbiAgaWYgKGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgb2JqZWN0W2tleV0gPT09IHZhbHVlO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBiYXNlSXNFcXVhbCh2YWx1ZSwgb2JqZWN0W2tleV0sIG51bGwsIHRydWUpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aGljaCBkb2VzIG5vdCBjb2VyY2UgYGtleWAgdG8gYSBzdHJpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaWYgc3VpdGFibGUgZm9yIHN0cmljdFxuICogIGVxdWFsaXR5IGNvbXBhcmlzb25zLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlICYmICh2YWx1ZSA9PT0gMCA/ICgoMSAvIHZhbHVlKSA+IDApIDogIWlzT2JqZWN0KHZhbHVlKSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIGxhbmd1YWdlIHR5cGUgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiAqKk5vdGU6KiogU2VlIHRoZSBbRVM1IHNwZWNdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAodmFsdWUgJiYgdHlwZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDYWxsYmFjaztcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FycmF5JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzdHlwZWRhcnJheScpLFxuICAgIGtleXMgPSByZXF1aXJlKCdsb2Rhc2gua2V5cycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aXRob3V0IHN1cHBvcnQgZm9yIGB0aGlzYCBiaW5kaW5nXG4gKiBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1doZXJlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIGlkZW50aWNhbCB2YWx1ZXMuXG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICAvLyBUcmVhdCBgKzBgIHZzLiBgLTBgIGFzIG5vdCBlcXVhbC5cbiAgICByZXR1cm4gdmFsdWUgIT09IDAgfHwgKDEgLyB2YWx1ZSA9PSAxIC8gb3RoZXIpO1xuICB9XG4gIHZhciB2YWxUeXBlID0gdHlwZW9mIHZhbHVlLFxuICAgICAgb3RoVHlwZSA9IHR5cGVvZiBvdGhlcjtcblxuICAvLyBFeGl0IGVhcmx5IGZvciB1bmxpa2UgcHJpbWl0aXZlIHZhbHVlcy5cbiAgaWYgKCh2YWxUeXBlICE9ICdmdW5jdGlvbicgJiYgdmFsVHlwZSAhPSAnb2JqZWN0JyAmJiBvdGhUeXBlICE9ICdmdW5jdGlvbicgJiYgb3RoVHlwZSAhPSAnb2JqZWN0JykgfHxcbiAgICAgIHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCkge1xuICAgIC8vIFJldHVybiBgZmFsc2VgIHVubGVzcyBib3RoIHZhbHVlcyBhcmUgYE5hTmAuXG4gICAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJhc2VJc0VxdWFsLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQik7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIG9iamVjdHMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1doZXJlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWxEZWVwKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgb3RoSXNBcnIgPSBpc0FycmF5KG90aGVyKSxcbiAgICAgIG9ialRhZyA9IGFycmF5VGFnLFxuICAgICAgb3RoVGFnID0gYXJyYXlUYWc7XG5cbiAgaWYgKCFvYmpJc0Fycikge1xuICAgIG9ialRhZyA9IG9ialRvU3RyaW5nLmNhbGwob2JqZWN0KTtcbiAgICBpZiAob2JqVGFnID09IGFyZ3NUYWcpIHtcbiAgICAgIG9ialRhZyA9IG9iamVjdFRhZztcbiAgICB9IGVsc2UgaWYgKG9ialRhZyAhPSBvYmplY3RUYWcpIHtcbiAgICAgIG9iaklzQXJyID0gaXNUeXBlZEFycmF5KG9iamVjdCk7XG4gICAgfVxuICB9XG4gIGlmICghb3RoSXNBcnIpIHtcbiAgICBvdGhUYWcgPSBvYmpUb1N0cmluZy5jYWxsKG90aGVyKTtcbiAgICBpZiAob3RoVGFnID09IGFyZ3NUYWcpIHtcbiAgICAgIG90aFRhZyA9IG9iamVjdFRhZztcbiAgICB9IGVsc2UgaWYgKG90aFRhZyAhPSBvYmplY3RUYWcpIHtcbiAgICAgIG90aElzQXJyID0gaXNUeXBlZEFycmF5KG90aGVyKTtcbiAgICB9XG4gIH1cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiAhKG9iaklzQXJyIHx8IG9iaklzT2JqKSkge1xuICAgIHJldHVybiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIG9ialRhZyk7XG4gIH1cbiAgdmFyIHZhbFdyYXBwZWQgPSBvYmpJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ19fd3JhcHBlZF9fJyksXG4gICAgICBvdGhXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgaWYgKHZhbFdyYXBwZWQgfHwgb3RoV3JhcHBlZCkge1xuICAgIHJldHVybiBlcXVhbEZ1bmModmFsV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LCBvdGhXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQik7XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAvLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBkZXRlY3RpbmcgY2lyY3VsYXIgcmVmZXJlbmNlcyBzZWUgaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyNKTy5cbiAgc3RhY2tBIHx8IChzdGFja0EgPSBbXSk7XG4gIHN0YWNrQiB8fCAoc3RhY2tCID0gW10pO1xuXG4gIHZhciBsZW5ndGggPSBzdGFja0EubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoc3RhY2tBW2xlbmd0aF0gPT0gb2JqZWN0KSB7XG4gICAgICByZXR1cm4gc3RhY2tCW2xlbmd0aF0gPT0gb3RoZXI7XG4gICAgfVxuICB9XG4gIC8vIEFkZCBgb2JqZWN0YCBhbmQgYG90aGVyYCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gIHN0YWNrQS5wdXNoKG9iamVjdCk7XG4gIHN0YWNrQi5wdXNoKG90aGVyKTtcblxuICB2YXIgcmVzdWx0ID0gKG9iaklzQXJyID8gZXF1YWxBcnJheXMgOiBlcXVhbE9iamVjdHMpKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpO1xuXG4gIHN0YWNrQS5wb3AoKTtcbiAgc3RhY2tCLnBvcCgpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIGFycmF5cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzV2hlcmVdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IHRydWU7XG5cbiAgaWYgKGFyckxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIShpc1doZXJlICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gRGVlcCBjb21wYXJlIHRoZSBjb250ZW50cywgaWdub3Jpbmcgbm9uLW51bWVyaWMgcHJvcGVydGllcy5cbiAgd2hpbGUgKHJlc3VsdCAmJiArK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgcmVzdWx0ID0gaXNXaGVyZVxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIGFyclZhbHVlLCBpbmRleClcbiAgICAgICAgOiBjdXN0b21pemVyKGFyclZhbHVlLCBvdGhWYWx1ZSwgaW5kZXgpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgIGlmIChpc1doZXJlKSB7XG4gICAgICAgIHZhciBvdGhJbmRleCA9IG90aExlbmd0aDtcbiAgICAgICAgd2hpbGUgKG90aEluZGV4LS0pIHtcbiAgICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW290aEluZGV4XTtcbiAgICAgICAgICByZXN1bHQgPSAoYXJyVmFsdWUgJiYgYXJyVmFsdWUgPT09IG90aFZhbHVlKSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSAoYXJyVmFsdWUgJiYgYXJyVmFsdWUgPT09IG90aFZhbHVlKSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiAhIXJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWJlcnMsIGRhdGVzIHRvIG1pbGxpc2Vjb25kcyBhbmQgYm9vbGVhbnNcbiAgICAgIC8vIHRvIGAxYCBvciBgMGAgdHJlYXRpbmcgaW52YWxpZCBkYXRlcyBjb2VyY2VkIHRvIGBOYU5gIGFzIG5vdCBlcXVhbC5cbiAgICAgIHJldHVybiArb2JqZWN0ID09ICtvdGhlcjtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBUcmVhdCBgTmFOYCB2cy4gYE5hTmAgYXMgZXF1YWwuXG4gICAgICByZXR1cm4gKG9iamVjdCAhPSArb2JqZWN0KVxuICAgICAgICA/IG90aGVyICE9ICtvdGhlclxuICAgICAgICAvLyBCdXQsIHRyZWF0IGAtMGAgdnMuIGArMGAgYXMgbm90IGVxdWFsLlxuICAgICAgICA6IChvYmplY3QgPT0gMCA/ICgoMSAvIG9iamVjdCkgPT0gKDEgLyBvdGhlcikpIDogb2JqZWN0ID09ICtvdGhlcik7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MgcHJpbWl0aXZlcyBhbmQgc3RyaW5nXG4gICAgICAvLyBvYmplY3RzIGFzIGVxdWFsLiBTZWUgaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4MTUuMTAuNi40IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBvYmplY3RzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzV2hlcmVdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqUHJvcHMgPSBrZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc1doZXJlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBoYXNDdG9yLFxuICAgICAgaW5kZXggPSAtMTtcblxuICB3aGlsZSAoKytpbmRleCA8IG9iakxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBvYmpQcm9wc1tpbmRleF0sXG4gICAgICAgIHJlc3VsdCA9IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSk7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICAgIHJlc3VsdCA9IGlzV2hlcmVcbiAgICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIG9ialZhbHVlLCBrZXkpXG4gICAgICAgICAgOiBjdXN0b21pemVyKG9ialZhbHVlLCBvdGhWYWx1ZSwga2V5KTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgICByZXN1bHQgPSAob2JqVmFsdWUgJiYgb2JqVmFsdWUgPT09IG90aFZhbHVlKSB8fCBlcXVhbEZ1bmMob2JqVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGhhc0N0b3IgfHwgKGhhc0N0b3IgPSBrZXkgPT0gJ2NvbnN0cnVjdG9yJyk7XG4gIH1cbiAgaWYgKCFoYXNDdG9yKSB7XG4gICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIG90aEN0b3IgPSBvdGhlci5jb25zdHJ1Y3RvcjtcblxuICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgKCdjb25zdHJ1Y3RvcicgaW4gb2JqZWN0ICYmICdjb25zdHJ1Y3RvcicgaW4gb3RoZXIpICYmXG4gICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPSB0eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID1cbnR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID1cbnR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzZXRUYWddID1cbnR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgdHlwZWRBcnJheVRhZ3Nbb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSldKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGtleXMgPSByZXF1aXJlKCdsb2Rhc2gua2V5cycpO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yRWFjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdHxzdHJpbmd9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICovXG5mdW5jdGlvbiBiYXNlRWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbiA/IGNvbGxlY3Rpb24ubGVuZ3RoIDogMDtcbiAgaWYgKCFpc0xlbmd0aChsZW5ndGgpKSB7XG4gICAgcmV0dXJuIGJhc2VGb3JPd24oY29sbGVjdGlvbiwgaXRlcmF0ZWUpO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaXRlcmFibGUgPSB0b09iamVjdChjb2xsZWN0aW9uKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtpbmRleF0sIGluZGV4LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbGxlY3Rpb247XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JJbmAgYW5kIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlc1xuICogb3ZlciBgb2JqZWN0YCBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgaW52b2tpbmcgYGl0ZXJhdGVlYCBmb3JcbiAqIGVhY2ggcHJvcGVydHkuIEl0ZXJhdG9yIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseVxuICogcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpdGVyYWJsZSA9IHRvT2JqZWN0KG9iamVjdCksXG4gICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBvYmplY3QgaWYgaXQgaXMgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDogT2JqZWN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRWFjaDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmluZGAsIGBfLmZpbmRMYXN0YCwgYF8uZmluZEtleWAsIGFuZCBgXy5maW5kTGFzdEtleWAsXG4gKiB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLCB3aGljaCBpdGVyYXRlc1xuICogb3ZlciBgY29sbGVjdGlvbmAgdXNpbmcgdGhlIHByb3ZpZGVkIGBlYWNoRnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBzZWFyY2guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYGNvbGxlY3Rpb25gLlxuICogQHBhcmFtIHtib29sZWFufSBbcmV0S2V5XSBTcGVjaWZ5IHJldHVybmluZyB0aGUga2V5IG9mIHRoZSBmb3VuZCBlbGVtZW50XG4gKiAgaW5zdGVhZCBvZiB0aGUgZWxlbWVudCBpdHNlbGYuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZm91bmQgZWxlbWVudCBvciBpdHMga2V5LCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBiYXNlRmluZChjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIGVhY2hGdW5jLCByZXRLZXkpIHtcbiAgdmFyIHJlc3VsdDtcbiAgZWFjaEZ1bmMoY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGtleSwgY29sbGVjdGlvbikge1xuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGtleSwgY29sbGVjdGlvbikpIHtcbiAgICAgIHJlc3VsdCA9IHJldEtleSA/IGtleSA6IHZhbHVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZpbmQ7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWNhbGxiYWNrJyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5maW5kYCBleGNlcHQgdGhhdCBpdCByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3RcbiAqIGVsZW1lbnQgYHByZWRpY2F0ZWAgcmV0dXJucyB0cnV0aHkgZm9yLCBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAqXG4gKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcHJvdmlkZWQgZm9yIGBwcmVkaWNhdGVgIHRoZSBjcmVhdGVkIFwiXy5wcm9wZXJ0eVwiXG4gKiBzdHlsZSBjYWxsYmFjayByZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqXG4gKiBJZiBhbiBvYmplY3QgaXMgcHJvdmlkZWQgZm9yIGBwcmVkaWNhdGVgIHRoZSBjcmVhdGVkIFwiXy5tYXRjaGVzXCIgc3R5bGVcbiAqIGNhbGxiYWNrIHJldHVybnMgYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGdpdmVuXG4gKiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8c3RyaW5nfSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkXG4gKiAgcGVyIGl0ZXJhdGlvbi4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yIG9iamVjdCBpcyBwcm92aWRlZCBpdCBpcyB1c2VkIHRvXG4gKiAgY3JlYXRlIGEgXCJfLnByb3BlcnR5XCIgb3IgXCJfLm1hdGNoZXNcIiBzdHlsZSBjYWxsYmFjayByZXNwZWN0aXZlbHkuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYHByZWRpY2F0ZWAuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZm91bmQgZWxlbWVudCwgZWxzZSBgLTFgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IGZhbHNlIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IHRydWUgfSxcbiAqICAgeyAndXNlcic6ICdwZWJibGVzJywgJ2FnZSc6IDEsICAnYWN0aXZlJzogZmFsc2UgfVxuICogXTtcbiAqXG4gKiBfLmZpbmRJbmRleCh1c2VycywgZnVuY3Rpb24oY2hyKSB7IHJldHVybiBjaHIuYWdlIDwgNDA7IH0pO1xuICogLy8gPT4gMFxuICpcbiAqIC8vIHVzaW5nIHRoZSBcIl8ubWF0Y2hlc1wiIGNhbGxiYWNrIHNob3J0aGFuZFxuICogXy5maW5kSW5kZXgodXNlcnMsIHsgJ2FnZSc6IDEgfSk7XG4gKiAvLyA9PiAyXG4gKlxuICogLy8gdXNpbmcgdGhlIFwiXy5wcm9wZXJ0eVwiIGNhbGxiYWNrIHNob3J0aGFuZFxuICogXy5maW5kSW5kZXgodXNlcnMsICdhY3RpdmUnKTtcbiAqIC8vID0+IDFcbiAqL1xuZnVuY3Rpb24gZmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgcHJlZGljYXRlID0gYmFzZUNhbGxiYWNrKHByZWRpY2F0ZSwgdGhpc0FyZywgMyk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbmRJbmRleDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmVmb3JlID0gcmVxdWlyZSgnbG9kYXNoLmJlZm9yZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGlzIHJlc3RyaWN0ZWQgdG8gaW52b2tpbmcgYGZ1bmNgIG9uY2UuIFJlcGVhdCBjYWxsc1xuICogdG8gdGhlIGZ1bmN0aW9uIHJldHVybiB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGNhbGwuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIGNyZWF0ZWQgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEB0eXBlIEZ1bmN0aW9uXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgcmVzdHJpY3RlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGluaXRpYWxpemUgPSBfLm9uY2UoY3JlYXRlQXBwbGljYXRpb24pO1xuICogaW5pdGlhbGl6ZSgpO1xuICogaW5pdGlhbGl6ZSgpO1xuICogLy8gYGluaXRpYWxpemVgIGludm9rZXMgYGNyZWF0ZUFwcGxpY2F0aW9uYCBvbmNlXG4gKi9cbmZ1bmN0aW9uIG9uY2UoZnVuYykge1xuICByZXR1cm4gYmVmb3JlKGZ1bmMsIDIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9uY2U7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCwgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgYW5kIGFyZ3VtZW50c1xuICogb2YgdGhlIGNyZWF0ZWQgZnVuY3Rpb24sIHdoaWxlIGl0IGlzIGNhbGxlZCBsZXNzIHRoYW4gYG5gIHRpbWVzLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgY3JlYXRlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2AgaW52b2NhdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGNhbGxzIGF0IHdoaWNoIGBmdW5jYCBpcyBubyBsb25nZXIgaW52b2tlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgcmVzdHJpY3RlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogalF1ZXJ5KCcjYWRkJykub24oJ2NsaWNrJywgXy5iZWZvcmUoNSwgYWRkQ29udGFjdFRvTGlzdCkpO1xuICogLy8gPT4gYWxsb3dzIGFkZGluZyB1cCB0byA0IGNvbnRhY3RzIHRvIHRoZSBsaXN0XG4gKi9cbmZ1bmN0aW9uIGJlZm9yZShuLCBmdW5jKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKHR5cGVvZiBuID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciB0ZW1wID0gbjtcbiAgICAgIG4gPSBmdW5jO1xuICAgICAgZnVuYyA9IHRlbXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGlmICgtLW4gPiAwKSB7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bmMgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJlZm9yZTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2xvZGFzaC5pc2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIHZhbHVlIG9mIHByb3BlcnR5IGBrZXlgIG9uIGBvYmplY3RgLiBJZiB0aGUgdmFsdWUgb2YgYGtleWAgaXNcbiAqIGEgZnVuY3Rpb24gaXQgaXMgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgb2JqZWN0YCBhbmQgaXRzIHJlc3VsdFxuICogaXMgcmV0dXJuZWQsIGVsc2UgdGhlIHByb3BlcnR5IHZhbHVlIGlzIHJldHVybmVkLiBJZiB0aGUgcHJvcGVydHkgdmFsdWUgaXNcbiAqIGB1bmRlZmluZWRgIHRoZSBgZGVmYXVsdFZhbHVlYCBpcyB1c2VkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byByZXNvbHZlLlxuICogQHBhcmFtIHsqfSBbZGVmYXVsdFZhbHVlXSBUaGUgdmFsdWUgcmV0dXJuZWQgaWYgdGhlIHByb3BlcnR5IHZhbHVlXG4gKiAgcmVzb2x2ZXMgdG8gYHVuZGVmaW5lZGAuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogXy5jb25zdGFudCg0MCkgfTtcbiAqXG4gKiBfLnJlc3VsdChvYmplY3QsICd1c2VyJyk7XG4gKiAvLyA9PiAnZnJlZCdcbiAqXG4gKiBfLnJlc3VsdChvYmplY3QsICdhZ2UnKTtcbiAqIC8vID0+IDQwXG4gKlxuICogXy5yZXN1bHQob2JqZWN0LCAnc3RhdHVzJywgJ2J1c3knKTtcbiAqIC8vID0+ICdidXN5J1xuICpcbiAqIF8ucmVzdWx0KG9iamVjdCwgJ3N0YXR1cycsIF8uY29uc3RhbnQoJ2J1c3knKSk7XG4gKiAvLyA9PiAnYnVzeSdcbiAqL1xuZnVuY3Rpb24gcmVzdWx0KG9iamVjdCwga2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJykge1xuICAgIHZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICB9XG4gIHJldHVybiBpc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlLmNhbGwob2JqZWN0KSA6IHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3VsdDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUhvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycy5cbiAqIFNlZSB0aGlzIFthcnRpY2xlIG9uIGBSZWdFeHBgIGNoYXJhY3RlcnNdKGh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL2NoYXJhY3RlcnMuaHRtbCNzcGVjaWFsKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhcnMgPSAvWy4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2csXG4gICAgcmVIYXNSZWdFeHBDaGFycyA9IFJlZ0V4cChyZVJlZ0V4cENoYXJzLnNvdXJjZSk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNGdW5jdGlvbmAgd2l0aG91dCBzdXBwb3J0IGZvciBlbnZpcm9ubWVudHNcbiAqIHdpdGggaW5jb3JyZWN0IGB0eXBlb2ZgIHJlc3VsdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBDaGFrcmEgSklUIGJ1ZyBpbiBjb21wYXRpYmlsaXR5IG1vZGVzIG9mIElFIDExLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlL2lzc3Vlcy8xNjIxIGZvciBtb3JlIGRldGFpbHMuXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIFVpbnQ4QXJyYXkgPSBpc05hdGl2ZShVaW50OEFycmF5ID0gZ2xvYmFsLlVpbnQ4QXJyYXkpICYmIFVpbnQ4QXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0Z1bmN0aW9uID0gIShiYXNlSXNGdW5jdGlvbigveC8pIHx8IChVaW50OEFycmF5ICYmICFiYXNlSXNGdW5jdGlvbihVaW50OEFycmF5KSkpID8gYmFzZUlzRnVuY3Rpb24gOiBmdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gb2xkZXIgdmVyc2lvbnMgb2YgQ2hyb21lIGFuZCBTYWZhcmkgd2hpY2ggcmV0dXJuICdmdW5jdGlvbicgZm9yIHJlZ2V4ZXNcbiAgLy8gYW5kIFNhZmFyaSA4IGVxdWl2YWxlbnRzIHdoaWNoIHJldHVybiAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgY29uc3RydWN0b3JzLlxuICByZXR1cm4gb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZztcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZykge1xuICAgIHJldHVybiByZU5hdGl2ZS50ZXN0KGZuVG9TdHJpbmcuY2FsbCh2YWx1ZSkpO1xuICB9XG4gIHJldHVybiAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiByZUhvc3RDdG9yLnRlc3QodmFsdWUpKSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBFc2NhcGVzIHRoZSBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMgXCJcXFwiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsIFwiKlwiLFxuICogXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczovL2xvZGFzaFxcLmNvbS9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUNhbGxiYWNrID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlY2FsbGJhY2snKSxcbiAgICBiYXNlVW5pcSA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZXVuaXEnKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJ2xvZGFzaC5faXNpdGVyYXRlZWNhbGwnKTtcblxuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmlxYCBvcHRpbWl6ZWQgZm9yIHNvcnRlZCBhcnJheXMgd2l0aG91dCBzdXBwb3J0XG4gKiBmb3IgY2FsbGJhY2sgc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlLXZhbHVlLWZyZWUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHNvcnRlZFVuaXEoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBzZWVuLFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc0luZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgYXJyYXkpIDogdmFsdWU7XG5cbiAgICBpZiAoIWluZGV4IHx8IHNlZW4gIT09IGNvbXB1dGVkKSB7XG4gICAgICBzZWVuID0gY29tcHV0ZWQ7XG4gICAgICByZXN1bHRbKytyZXNJbmRleF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZHVwbGljYXRlLXZhbHVlLWZyZWUgdmVyc2lvbiBvZiBhbiBhcnJheSB1c2luZyBgU2FtZVZhbHVlWmVyb2BcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy4gUHJvdmlkaW5nIGB0cnVlYCBmb3IgYGlzU29ydGVkYCBwZXJmb3JtcyBhIGZhc3RlclxuICogc2VhcmNoIGFsZ29yaXRobSBmb3Igc29ydGVkIGFycmF5cy4gSWYgYW4gaXRlcmF0ZWUgZnVuY3Rpb24gaXMgcHJvdmlkZWQgaXRcbiAqIGlzIGludm9rZWQgZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGFycmF5IHRvIGdlbmVyYXRlIHRoZSBjcml0ZXJpb24gYnkgd2hpY2hcbiAqIHVuaXF1ZW5lc3MgaXMgY29tcHV0ZWQuIFRoZSBgaXRlcmF0ZWVgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZFxuICogd2l0aCB0aHJlZSBhcmd1bWVudHM7ICh2YWx1ZSwgaW5kZXgsIGFycmF5KS5cbiAqXG4gKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcHJvdmlkZWQgZm9yIGBwcmVkaWNhdGVgIHRoZSBjcmVhdGVkIFwiXy5wcm9wZXJ0eVwiXG4gKiBzdHlsZSBjYWxsYmFjayByZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqXG4gKiBJZiBhbiBvYmplY3QgaXMgcHJvdmlkZWQgZm9yIGBwcmVkaWNhdGVgIHRoZSBjcmVhdGVkIFwiXy5tYXRjaGVzXCIgc3R5bGVcbiAqIGNhbGxiYWNrIHJldHVybnMgYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGdpdmVuXG4gKiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqXG4gKiAqKk5vdGU6KiogYFNhbWVWYWx1ZVplcm9gIGNvbXBhcmlzb25zIGFyZSBsaWtlIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucyxcbiAqIGUuZy4gYD09PWAsIGV4Y2VwdCB0aGF0IGBOYU5gIG1hdGNoZXMgYE5hTmAuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyB1bmlxdWVcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1NvcnRlZF0gU3BlY2lmeSB0aGUgYXJyYXkgaXMgc29ydGVkLlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8c3RyaW5nfSBbaXRlcmF0ZWVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiAgSWYgYSBwcm9wZXJ0eSBuYW1lIG9yIG9iamVjdCBpcyBwcm92aWRlZCBpdCBpcyB1c2VkIHRvIGNyZWF0ZSBhIFwiXy5wcm9wZXJ0eVwiXG4gKiAgb3IgXCJfLm1hdGNoZXNcIiBzdHlsZSBjYWxsYmFjayByZXNwZWN0aXZlbHkuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGl0ZXJhdGVlYC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZS12YWx1ZS1mcmVlIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnVuaXEoWzEsIDIsIDFdKTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIHVzaW5nIGBpc1NvcnRlZGBcbiAqIF8udW5pcShbMSwgMSwgMl0sIHRydWUpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gdXNpbmcgYW4gaXRlcmF0ZWUgZnVuY3Rpb25cbiAqIF8udW5pcShbMSwgMi41LCAxLjUsIDJdLCBmdW5jdGlvbihuKSB7IHJldHVybiB0aGlzLmZsb29yKG4pOyB9LCBNYXRoKTtcbiAqIC8vID0+IFsxLCAyLjVdXG4gKlxuICogLy8gdXNpbmcgdGhlIFwiXy5wcm9wZXJ0eVwiIGNhbGxiYWNrIHNob3J0aGFuZFxuICogXy51bmlxKFt7ICd4JzogMSB9LCB7ICd4JzogMiB9LCB7ICd4JzogMSB9XSwgJ3gnKTtcbiAqIC8vID0+IFt7ICd4JzogMSB9LCB7ICd4JzogMiB9XVxuICovXG5mdW5jdGlvbiB1bmlxKGFycmF5LCBpc1NvcnRlZCwgaXRlcmF0ZWUsIHRoaXNBcmcpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgLy8gSnVnZ2xlIGFyZ3VtZW50cy5cbiAgaWYgKHR5cGVvZiBpc1NvcnRlZCAhPSAnYm9vbGVhbicgJiYgaXNTb3J0ZWQgIT0gbnVsbCkge1xuICAgIHRoaXNBcmcgPSBpdGVyYXRlZTtcbiAgICBpdGVyYXRlZSA9IGlzSXRlcmF0ZWVDYWxsKGFycmF5LCBpc1NvcnRlZCwgdGhpc0FyZykgPyBudWxsIDogaXNTb3J0ZWQ7XG4gICAgaXNTb3J0ZWQgPSBmYWxzZTtcbiAgfVxuICBpdGVyYXRlZSA9IGl0ZXJhdGVlID09IG51bGwgPyBpdGVyYXRlZSA6IGJhc2VDYWxsYmFjayhpdGVyYXRlZSwgdGhpc0FyZywgMyk7XG4gIHJldHVybiAoaXNTb3J0ZWQpXG4gICAgPyBzb3J0ZWRVbmlxKGFycmF5LCBpdGVyYXRlZSlcbiAgICA6IGJhc2VVbmlxKGFycmF5LCBpdGVyYXRlZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdW5pcTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUluZGV4T2YgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VpbmRleG9mJyksXG4gICAgY2FjaGVJbmRleE9mID0gcmVxdWlyZSgnbG9kYXNoLl9jYWNoZWluZGV4b2YnKSxcbiAgICBjcmVhdGVDYWNoZSA9IHJlcXVpcmUoJ2xvZGFzaC5fY3JlYXRlY2FjaGUnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmlxYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrIHNob3J0aGFuZHNcbiAqIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUtdmFsdWUtZnJlZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuaXEoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5kZXhPZiA9IGJhc2VJbmRleE9mLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaXNDb21tb24gPSB0cnVlLFxuICAgICAgaXNMYXJnZSA9IGlzQ29tbW9uICYmIGxlbmd0aCA+PSAyMDAsXG4gICAgICBzZWVuID0gaXNMYXJnZSA/IGNyZWF0ZUNhY2hlKCkgOiBudWxsLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgaWYgKHNlZW4pIHtcbiAgICBpbmRleE9mID0gY2FjaGVJbmRleE9mO1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgaXNMYXJnZSA9IGZhbHNlO1xuICAgIHNlZW4gPSBpdGVyYXRlZSA/IFtdIDogcmVzdWx0O1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgYXJyYXkpIDogdmFsdWU7XG5cbiAgICBpZiAoaXNDb21tb24gJiYgdmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICB2YXIgc2VlbkluZGV4ID0gc2Vlbi5sZW5ndGg7XG4gICAgICB3aGlsZSAoc2VlbkluZGV4LS0pIHtcbiAgICAgICAgaWYgKHNlZW5bc2VlbkluZGV4XSA9PT0gY29tcHV0ZWQpIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGl0ZXJhdGVlKSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGluZGV4T2Yoc2VlbiwgY29tcHV0ZWQsIDApIDwgMCkge1xuICAgICAgaWYgKGl0ZXJhdGVlIHx8IGlzTGFyZ2UpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVW5pcTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMS4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaW5kZXhPZmAgd2l0aG91dCBzdXBwb3J0IGZvciBiaW5hcnkgc2VhcmNoZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICBpZiAodmFsdWUgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIGluZGV4T2ZOYU4oYXJyYXksIGZyb21JbmRleCk7XG4gIH1cbiAgdmFyIGluZGV4ID0gZnJvbUluZGV4IC0gMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBgTmFOYCBpcyBmb3VuZCBpbiBgYXJyYXlgLlxuICogSWYgYGZyb21SaWdodGAgaXMgcHJvdmlkZWQgZWxlbWVudHMgb2YgYGFycmF5YCBhcmUgaXRlcmF0ZWQgZnJvbSByaWdodCB0byBsZWZ0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIGBOYU5gLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGluZGV4T2ZOYU4oYXJyYXksIGZyb21JbmRleCwgZnJvbVJpZ2h0KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IGZyb21JbmRleCArIChmcm9tUmlnaHQgPyAwIDogLTEpO1xuXG4gIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgdmFyIG90aGVyID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmIChvdGhlciAhPT0gb3RoZXIpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJbmRleE9mO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiBgY2FjaGVgIG1pbWlja2luZyB0aGUgcmV0dXJuIHNpZ25hdHVyZSBvZlxuICogYF8uaW5kZXhPZmAgYnkgcmV0dXJuaW5nIGAwYCBpZiB0aGUgdmFsdWUgaXMgZm91bmQsIGVsc2UgYC0xYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBzZWFyY2guXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgMGAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBjYWNoZUluZGV4T2YoY2FjaGUsIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gY2FjaGUuZGF0YSxcbiAgICAgIHJlc3VsdCA9ICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNPYmplY3QodmFsdWUpKSA/IGRhdGEuc2V0Lmhhcyh2YWx1ZSkgOiBkYXRhLmhhc2hbdmFsdWVdO1xuXG4gIHJldHVybiByZXN1bHQgPyAwIDogLTE7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIGxhbmd1YWdlIHR5cGUgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiAqKk5vdGU6KiogU2VlIHRoZSBbRVM1IHNwZWNdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAodmFsdWUgJiYgdHlwZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FjaGVJbmRleE9mO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJ2xvZGFzaC5pc25hdGl2ZScpO1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIFNldCA9IGlzTmF0aXZlKFNldCA9IGdsb2JhbC5TZXQpICYmIFNldDtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVDcmVhdGUgPSBpc05hdGl2ZShuYXRpdmVDcmVhdGUgPSBPYmplY3QuY3JlYXRlKSAmJiBuYXRpdmVDcmVhdGU7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmRhdGEgPSB7ICdoYXNoJzogbmF0aXZlQ3JlYXRlKG51bGwpLCAnc2V0JzogbmV3IFNldCB9O1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICB0aGlzLnB1c2godmFsdWVzW2xlbmd0aF0pO1xuICB9XG59XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgcHVzaFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gY2FjaGVQdXNoKHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5kYXRhO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIGRhdGEuc2V0LmFkZCh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YS5oYXNoW3ZhbHVlXSA9IHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgYFNldGAgY2FjaGUgb2JqZWN0IHRvIG9wdGltaXplIGxpbmVhciBzZWFyY2hlcyBvZiBsYXJnZSBhcnJheXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7bnVsbHxPYmplY3R9IFJldHVybnMgdGhlIG5ldyBjYWNoZSBvYmplY3QgaWYgYFNldGAgaXMgc3VwcG9ydGVkLCBlbHNlIGBudWxsYC5cbiAqL1xudmFyIGNyZWF0ZUNhY2hlID0gIShuYXRpdmVDcmVhdGUgJiYgU2V0KSA/IGNvbnN0YW50KG51bGwpIDogZnVuY3Rpb24odmFsdWVzKSB7XG4gIHJldHVybiBuZXcgU2V0Q2FjaGUodmFsdWVzKTtcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIGxhbmd1YWdlIHR5cGUgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiAqKk5vdGU6KiogU2VlIHRoZSBbRVM1IHNwZWNdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAodmFsdWUgJiYgdHlwZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIGZyb20gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICogdmFyIGdldHRlciA9IF8uY29uc3RhbnQob2JqZWN0KTtcbiAqIGdldHRlcigpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGNvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbi8vIEFkZCBmdW5jdGlvbnMgdG8gdGhlIGBTZXRgIGNhY2hlLlxuU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBjYWNoZVB1c2g7XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQ2FjaGU7XG4iLCIvL1RoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgYmluL2hvb2suanNcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJ3RlbXBsYXRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHsgJ21lZGlhX2NvbnRyb2wnOiB0ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtYmFja2dyb3VuZFwiIGRhdGEtYmFja2dyb3VuZD48L2Rpdj48ZGl2IGNsYXNzPVwibWVkaWEtY29udHJvbC1sYXllclwiIGRhdGEtY29udHJvbHM+PCUgdmFyIHJlbmRlckJhcj1mdW5jdGlvbihuYW1lKSB7ICU+PGRpdiBjbGFzcz1cImJhci1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJiYXItYmFja2dyb3VuZFwiIGRhdGEtPCU9IG5hbWUgJT4+PGRpdiBjbGFzcz1cImJhci1maWxsLTFcIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjxkaXYgY2xhc3M9XCJiYXItZmlsbC0yXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48ZGl2IGNsYXNzPVwiYmFyLWhvdmVyXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiYmFyLXNjcnViYmVyXCIgZGF0YS08JT0gbmFtZSAlPj48ZGl2IGNsYXNzPVwiYmFyLXNjcnViYmVyLWljb25cIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjwvZGl2PjwvZGl2PjwlIH07ICU+PCUgdmFyIHJlbmRlclNlZ21lbnRlZEJhcj1mdW5jdGlvbihuYW1lLCBzZWdtZW50cykgeyBzZWdtZW50cz1zZWdtZW50cyB8fCAxMDsgJT48ZGl2IGNsYXNzPVwiYmFyLWNvbnRhaW5lclwiIGRhdGEtPCU9IG5hbWUgJT4+PCUgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50czsgaSsrKSB7ICU+PGRpdiBjbGFzcz1cInNlZ21lbnRlZC1iYXItZWxlbWVudFwiIGRhdGEtPCU9IG5hbWUgJT4+PC9kaXY+PCUgfSAlPjwvZGl2PjwlIH07ICU+PCUgdmFyIHJlbmRlckRyYXdlcj1mdW5jdGlvbihuYW1lLCByZW5kZXJDb250ZW50KSB7ICU+PGRpdiBjbGFzcz1cImRyYXdlci1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJkcmF3ZXItaWNvbi1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJkcmF3ZXItaWNvbiBtZWRpYS1jb250cm9sLWljb25cIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjxzcGFuIGNsYXNzPVwiZHJhd2VyLXRleHRcIiBkYXRhLTwlPSBuYW1lICU+Pjwvc3Bhbj48L2Rpdj48JSByZW5kZXJDb250ZW50KG5hbWUpOyAlPjwvZGl2PjwlIH07ICU+PCUgdmFyIHJlbmRlckluZGljYXRvcj1mdW5jdGlvbihuYW1lKSB7ICU+PGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48JSB9OyAlPjwlIHZhciByZW5kZXJCdXR0b249ZnVuY3Rpb24obmFtZSkgeyAlPjxidXR0b24gY2xhc3M9XCJtZWRpYS1jb250cm9sLWJ1dHRvbiBtZWRpYS1jb250cm9sLWljb25cIiBkYXRhLTwlPSBuYW1lICU+PjwvYnV0dG9uPjwlIH07ICU+PCUgdmFyIHRlbXBsYXRlcz17IGJhcjogcmVuZGVyQmFyLCBzZWdtZW50ZWRCYXI6IHJlbmRlclNlZ21lbnRlZEJhciwgfTsgdmFyIHJlbmRlcj1mdW5jdGlvbihzZXR0aW5nc0xpc3QpIHsgc2V0dGluZ3NMaXN0LmZvckVhY2goZnVuY3Rpb24oc2V0dGluZykgeyBpZihzZXR0aW5nID09PSBcInNlZWtiYXJcIikgeyByZW5kZXJCYXIoc2V0dGluZyk7IH0gZWxzZSBpZiAoc2V0dGluZyA9PT0gXCJ2b2x1bWVcIikgeyByZW5kZXJEcmF3ZXIoc2V0dGluZywgc2V0dGluZ3Mudm9sdW1lQmFyVGVtcGxhdGUgPyB0ZW1wbGF0ZXNbc2V0dGluZ3Mudm9sdW1lQmFyVGVtcGxhdGVdIDogZnVuY3Rpb24obmFtZSkgeyByZXR1cm4gcmVuZGVyU2VnbWVudGVkQmFyKG5hbWUpOyB9KTsgfSBlbHNlIGlmIChzZXR0aW5nID09PSBcImR1cmF0aW9uXCIgfHwgc2V0dGluZz09PSBcInBvc2l0aW9uXCIpIHsgcmVuZGVySW5kaWNhdG9yKHNldHRpbmcpOyB9IGVsc2UgeyByZW5kZXJCdXR0b24oc2V0dGluZyk7IH0gfSk7IH07ICU+PCUgaWYgKHNldHRpbmdzLmRlZmF1bHQgJiYgc2V0dGluZ3MuZGVmYXVsdC5sZW5ndGgpIHsgJT48ZGl2IGNsYXNzPVwibWVkaWEtY29udHJvbC1jZW50ZXItcGFuZWxcIiBkYXRhLW1lZGlhLWNvbnRyb2w+PCUgcmVuZGVyKHNldHRpbmdzLmRlZmF1bHQpOyAlPjwvZGl2PjwlIH0gJT48JSBpZiAoc2V0dGluZ3MubGVmdCAmJiBzZXR0aW5ncy5sZWZ0Lmxlbmd0aCkgeyAlPjxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLWxlZnQtcGFuZWxcIiBkYXRhLW1lZGlhLWNvbnRyb2w+PCUgcmVuZGVyKHNldHRpbmdzLmxlZnQpOyAlPjwvZGl2PjwlIH0gJT48JSBpZiAoc2V0dGluZ3MucmlnaHQgJiYgc2V0dGluZ3MucmlnaHQubGVuZ3RoKSB7ICU+PGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtcmlnaHQtcGFuZWxcIiBkYXRhLW1lZGlhLWNvbnRyb2w+PCUgcmVuZGVyKHNldHRpbmdzLnJpZ2h0KTsgJT48L2Rpdj48JSB9ICU+PC9kaXY+JyksJ3NlZWtfdGltZSc6IHRlbXBsYXRlKCc8c3BhbiBkYXRhLXNlZWstdGltZT48L3NwYW4+JyksJ2ZsYXNoJzogdGVtcGxhdGUoJzxwYXJhbSBuYW1lPVwibW92aWVcIiB2YWx1ZT1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXIuc3dmXCI+PHBhcmFtIG5hbWU9XCJxdWFsaXR5XCIgdmFsdWU9XCJhdXRvaGlnaFwiPjxwYXJhbSBuYW1lPVwic3dsaXZlY29ubmVjdFwiIHZhbHVlPVwidHJ1ZVwiPjxwYXJhbSBuYW1lPVwiYWxsb3dTY3JpcHRBY2Nlc3NcIiB2YWx1ZT1cImFsd2F5c1wiPjxwYXJhbSBuYW1lPVwiYmdjb2xvclwiIHZhbHVlPVwiIzAwMTEyMlwiPjxwYXJhbSBuYW1lPVwiYWxsb3dGdWxsU2NyZWVuXCIgdmFsdWU9XCJmYWxzZVwiPjxwYXJhbSBuYW1lPVwid21vZGVcIiB2YWx1ZT1cInRyYW5zcGFyZW50XCI+PHBhcmFtIG5hbWU9XCJ0YWJpbmRleFwiIHZhbHVlPVwiMVwiPjxwYXJhbSBuYW1lPUZsYXNoVmFycyB2YWx1ZT1cInBsYXliYWNrSWQ9PCU9IHBsYXliYWNrSWQgJT5cIiAvPjxlbWJlZCB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBkaXNhYmxlZCB0YWJpbmRleD1cIi0xXCIgZW5hYmxlY29udGV4dG1lbnU9XCJmYWxzZVwiIGFsbG93U2NyaXB0QWNjZXNzPVwiYWx3YXlzXCIgcXVhbGl0eT1cImF1dG9oaWdodFwiIHBsdWdpbnNwYWdlPVwiaHR0cDovL3d3dy5tYWNyb21lZGlhLmNvbS9nby9nZXRmbGFzaHBsYXllclwiIHdtb2RlPVwidHJhbnNwYXJlbnRcIiBzd2xpdmVjb25uZWN0PVwidHJ1ZVwiIHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIGFsbG93ZnVsbHNjcmVlbj1cImZhbHNlXCIgYmdjb2xvcj1cIiMwMDAwMDBcIiBGbGFzaFZhcnM9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgc3JjPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci5zd2ZcIj48L2VtYmVkPicpLCdobHMnOiB0ZW1wbGF0ZSgnPHBhcmFtIG5hbWU9XCJtb3ZpZVwiIHZhbHVlPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL0hMU1BsYXllci5zd2Y/aW5saW5lPTFcIj48cGFyYW0gbmFtZT1cInF1YWxpdHlcIiB2YWx1ZT1cImF1dG9oaWdoXCI+PHBhcmFtIG5hbWU9XCJzd2xpdmVjb25uZWN0XCIgdmFsdWU9XCJ0cnVlXCI+PHBhcmFtIG5hbWU9XCJhbGxvd1NjcmlwdEFjY2Vzc1wiIHZhbHVlPVwiYWx3YXlzXCI+PHBhcmFtIG5hbWU9XCJiZ2NvbG9yXCIgdmFsdWU9XCIjMDAxMTIyXCI+PHBhcmFtIG5hbWU9XCJhbGxvd0Z1bGxTY3JlZW5cIiB2YWx1ZT1cImZhbHNlXCI+PHBhcmFtIG5hbWU9XCJ3bW9kZVwiIHZhbHVlPVwidHJhbnNwYXJlbnRcIj48cGFyYW0gbmFtZT1cInRhYmluZGV4XCIgdmFsdWU9XCIxXCI+PHBhcmFtIG5hbWU9Rmxhc2hWYXJzIHZhbHVlPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPlwiIC8+PGVtYmVkIHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIHRhYmluZGV4PVwiMVwiIGVuYWJsZWNvbnRleHRtZW51PVwiZmFsc2VcIiBhbGxvd1NjcmlwdEFjY2Vzcz1cImFsd2F5c1wiIHF1YWxpdHk9XCJhdXRvaGlnaFwiIHBsdWdpbnNwYWdlPVwiaHR0cDovL3d3dy5tYWNyb21lZGlhLmNvbS9nby9nZXRmbGFzaHBsYXllclwiIHdtb2RlPVwidHJhbnNwYXJlbnRcIiBzd2xpdmVjb25uZWN0PVwidHJ1ZVwiIHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIGFsbG93ZnVsbHNjcmVlbj1cImZhbHNlXCIgYmdjb2xvcj1cIiMwMDAwMDBcIiBGbGFzaFZhcnM9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgc3JjPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL0hMU1BsYXllci5zd2ZcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PC9lbWJlZD4nKSwnaHRtbDVfdmlkZW8nOiB0ZW1wbGF0ZSgnPHNvdXJjZSBzcmM9XCI8JT1zcmMlPlwiIHR5cGU9XCI8JT10eXBlJT5cIj4nKSwnbm9fb3AnOiB0ZW1wbGF0ZSgnPGNhbnZhcyBkYXRhLW5vLW9wLWNhbnZhcz48L2NhbnZhcz48cCBkYXRhLW5vLW9wLW1zZz5Zb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgcGxheWJhY2sgb2YgdGhpcyB2aWRlby4gVHJ5IHRvIHVzZSBhIGRpZmZlcmVudCBicm93c2VyLjxwPicpLCdiYWNrZ3JvdW5kX2J1dHRvbic6IHRlbXBsYXRlKCc8ZGl2IGNsYXNzPVwiYmFja2dyb3VuZC1idXR0b24td3JhcHBlclwiIGRhdGEtYmFja2dyb3VuZC1idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJhY2tncm91bmQtYnV0dG9uLWljb25cIiBkYXRhLWJhY2tncm91bmQtYnV0dG9uPjwvYnV0dG9uPjwvZGl2PicpLCdkdnJfY29udHJvbHMnOiB0ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImxpdmUtaW5mb1wiPkxJVkU8L2Rpdj48YnV0dG9uIGNsYXNzPVwibGl2ZS1idXR0b25cIj5CQUNLIFRPIExJVkU8L2J1dHRvbj4nKSwncG9zdGVyJzogdGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJwbGF5LXdyYXBwZXJcIiBkYXRhLXBvc3Rlcj48c3BhbiBjbGFzcz1cInBvc3Rlci1pY29uIHBsYXlcIiBkYXRhLXBvc3Rlci8+PC9kaXY+JyksJ3NwaW5uZXJfdGhyZWVfYm91bmNlJzogdGVtcGxhdGUoJzxkaXYgZGF0YS1ib3VuY2UxPjwvZGl2PjxkaXYgZGF0YS1ib3VuY2UyPjwvZGl2PjxkaXYgZGF0YS1ib3VuY2UzPjwvZGl2PicpLCd3YXRlcm1hcmsnOiB0ZW1wbGF0ZSgnPGRpdiBkYXRhLXdhdGVybWFyayBkYXRhLXdhdGVybWFyay08JT1wb3NpdGlvbiAlPj48aW1nIHNyYz1cIjwlPSBpbWFnZVVybCAlPlwiPjwvZGl2PicpLENTUzogeydjb250YWluZXInOiAnLmNvbnRhaW5lcltkYXRhLWNvbnRhaW5lcl17cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjojMDAwO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LmNvbnRhaW5lcltkYXRhLWNvbnRhaW5lcl0ucG9pbnRlci1lbmFibGVke2N1cnNvcjpwb2ludGVyfScsJ2NvcmUnOiAnW2RhdGEtcGxheWVyXXstd2Via2l0LXRvdWNoLWNhbGxvdXQ6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LWtodG1sLXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lOy1vLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7LW1vei10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApOy1vLXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTtwb3NpdGlvbjpyZWxhdGl2ZTttYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjA7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NDAwO3RleHQtYWxpZ246Y2VudGVyO292ZXJmbG93OmhpZGRlbjtmb250LXNpemU6MTAwJTtmb250LWZhbWlseTpcImx1Y2lkYSBncmFuZGVcIix0YWhvbWEsdmVyZGFuYSxhcmlhbCxzYW5zLXNlcmlmO3RleHQtc2hhZG93OjAgMCAwO2JveC1zaXppbmc6Ym9yZGVyLWJveH1bZGF0YS1wbGF5ZXJdIGEsW2RhdGEtcGxheWVyXSBhYmJyLFtkYXRhLXBsYXllcl0gYWNyb255bSxbZGF0YS1wbGF5ZXJdIGFkZHJlc3MsW2RhdGEtcGxheWVyXSBhcHBsZXQsW2RhdGEtcGxheWVyXSBhcnRpY2xlLFtkYXRhLXBsYXllcl0gYXNpZGUsW2RhdGEtcGxheWVyXSBhdWRpbyxbZGF0YS1wbGF5ZXJdIGIsW2RhdGEtcGxheWVyXSBiaWcsW2RhdGEtcGxheWVyXSBibG9ja3F1b3RlLFtkYXRhLXBsYXllcl0gY2FudmFzLFtkYXRhLXBsYXllcl0gY2FwdGlvbixbZGF0YS1wbGF5ZXJdIGNlbnRlcixbZGF0YS1wbGF5ZXJdIGNpdGUsW2RhdGEtcGxheWVyXSBjb2RlLFtkYXRhLXBsYXllcl0gZGQsW2RhdGEtcGxheWVyXSBkZWwsW2RhdGEtcGxheWVyXSBkZXRhaWxzLFtkYXRhLXBsYXllcl0gZGZuLFtkYXRhLXBsYXllcl0gZGl2LFtkYXRhLXBsYXllcl0gZGwsW2RhdGEtcGxheWVyXSBkdCxbZGF0YS1wbGF5ZXJdIGVtLFtkYXRhLXBsYXllcl0gZW1iZWQsW2RhdGEtcGxheWVyXSBmaWVsZHNldCxbZGF0YS1wbGF5ZXJdIGZpZ2NhcHRpb24sW2RhdGEtcGxheWVyXSBmaWd1cmUsW2RhdGEtcGxheWVyXSBmb290ZXIsW2RhdGEtcGxheWVyXSBmb3JtLFtkYXRhLXBsYXllcl0gaDEsW2RhdGEtcGxheWVyXSBoMixbZGF0YS1wbGF5ZXJdIGgzLFtkYXRhLXBsYXllcl0gaDQsW2RhdGEtcGxheWVyXSBoNSxbZGF0YS1wbGF5ZXJdIGg2LFtkYXRhLXBsYXllcl0gaGVhZGVyLFtkYXRhLXBsYXllcl0gaGdyb3VwLFtkYXRhLXBsYXllcl0gaSxbZGF0YS1wbGF5ZXJdIGlmcmFtZSxbZGF0YS1wbGF5ZXJdIGltZyxbZGF0YS1wbGF5ZXJdIGlucyxbZGF0YS1wbGF5ZXJdIGtiZCxbZGF0YS1wbGF5ZXJdIGxhYmVsLFtkYXRhLXBsYXllcl0gbGVnZW5kLFtkYXRhLXBsYXllcl0gbGksW2RhdGEtcGxheWVyXSBtYXJrLFtkYXRhLXBsYXllcl0gbWVudSxbZGF0YS1wbGF5ZXJdIG5hdixbZGF0YS1wbGF5ZXJdIG9iamVjdCxbZGF0YS1wbGF5ZXJdIG9sLFtkYXRhLXBsYXllcl0gb3V0cHV0LFtkYXRhLXBsYXllcl0gcCxbZGF0YS1wbGF5ZXJdIHByZSxbZGF0YS1wbGF5ZXJdIHEsW2RhdGEtcGxheWVyXSBydWJ5LFtkYXRhLXBsYXllcl0gcyxbZGF0YS1wbGF5ZXJdIHNhbXAsW2RhdGEtcGxheWVyXSBzZWN0aW9uLFtkYXRhLXBsYXllcl0gc21hbGwsW2RhdGEtcGxheWVyXSBzcGFuLFtkYXRhLXBsYXllcl0gc3RyaWtlLFtkYXRhLXBsYXllcl0gc3Ryb25nLFtkYXRhLXBsYXllcl0gc3ViLFtkYXRhLXBsYXllcl0gc3VtbWFyeSxbZGF0YS1wbGF5ZXJdIHN1cCxbZGF0YS1wbGF5ZXJdIHRhYmxlLFtkYXRhLXBsYXllcl0gdGJvZHksW2RhdGEtcGxheWVyXSB0ZCxbZGF0YS1wbGF5ZXJdIHRmb290LFtkYXRhLXBsYXllcl0gdGgsW2RhdGEtcGxheWVyXSB0aGVhZCxbZGF0YS1wbGF5ZXJdIHRpbWUsW2RhdGEtcGxheWVyXSB0cixbZGF0YS1wbGF5ZXJdIHR0LFtkYXRhLXBsYXllcl0gdSxbZGF0YS1wbGF5ZXJdIHVsLFtkYXRhLXBsYXllcl0gdmFyLFtkYXRhLXBsYXllcl0gdmlkZW97bWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO2ZvbnQ6aW5oZXJpdDtmb250LXNpemU6MTAwJTt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX1bZGF0YS1wbGF5ZXJdIHRhYmxle2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTtib3JkZXItc3BhY2luZzowfVtkYXRhLXBsYXllcl0gY2FwdGlvbixbZGF0YS1wbGF5ZXJdIHRkLFtkYXRhLXBsYXllcl0gdGh7dGV4dC1hbGlnbjpsZWZ0O2ZvbnQtd2VpZ2h0OjQwMDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9W2RhdGEtcGxheWVyXSBibG9ja3F1b3RlLFtkYXRhLXBsYXllcl0gcXtxdW90ZXM6bm9uZX1bZGF0YS1wbGF5ZXJdIGJsb2NrcXVvdGU6YWZ0ZXIsW2RhdGEtcGxheWVyXSBibG9ja3F1b3RlOmJlZm9yZSxbZGF0YS1wbGF5ZXJdIHE6YWZ0ZXIsW2RhdGEtcGxheWVyXSBxOmJlZm9yZXtjb250ZW50OlwiXCI7Y29udGVudDpub25lfVtkYXRhLXBsYXllcl0gYSBpbWd7Ym9yZGVyOm5vbmV9W2RhdGEtcGxheWVyXSAqe21heC13aWR0aDppbml0aWFsO2JveC1zaXppbmc6aW5oZXJpdDtmbG9hdDppbml0aWFsfVtkYXRhLXBsYXllcl0uZnVsbHNjcmVlbnt3aWR0aDoxMDAlIWltcG9ydGFudDtoZWlnaHQ6MTAwJSFpbXBvcnRhbnR9W2RhdGEtcGxheWVyXS5ub2N1cnNvcntjdXJzb3I6bm9uZX0uY2xhcHByLXN0eWxle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9QG1lZGlhIHNjcmVlbntbZGF0YS1wbGF5ZXJde29wYWNpdHk6Ljk5fX0nLCdtZWRpYV9jb250cm9sJzogJ0Bmb250LWZhY2V7Zm9udC1mYW1pbHk6UGxheWVyO3NyYzp1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuZW90XCIpO3NyYzp1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuZW90PyNpZWZpeFwiKSBmb3JtYXQoXCJlbWJlZGRlZC1vcGVudHlwZVwiKSx1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIudHRmXCIpIGZvcm1hdChcInRydWV0eXBlXCIpLHVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci5zdmcjcGxheWVyXCIpIGZvcm1hdChcInN2Z1wiKX0ubWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb257LXdlYmtpdC10cmFuc2l0aW9uOm5vbmUhaW1wb3J0YW50Oy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTowczstbW96LXRyYW5zaXRpb246bm9uZSFpbXBvcnRhbnQ7LW8tdHJhbnNpdGlvbjpub25lIWltcG9ydGFudDt0cmFuc2l0aW9uOm5vbmUhaW1wb3J0YW50fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF17cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt6LWluZGV4Ojk5OTk7cG9pbnRlci1ldmVudHM6bm9uZX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLmRyYWdnaW5ne3BvaW50ZXItZXZlbnRzOmF1dG87Y3Vyc29yOi13ZWJraXQtZ3JhYmJpbmchaW1wb3J0YW50O2N1cnNvcjpncmFiYmluZyFpbXBvcnRhbnR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS5kcmFnZ2luZyAqe2N1cnNvcjotd2Via2l0LWdyYWJiaW5nIWltcG9ydGFudDtjdXJzb3I6Z3JhYmJpbmchaW1wb3J0YW50fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtYmFja2dyb3VuZFtkYXRhLWJhY2tncm91bmRde3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDo0MCU7d2lkdGg6MTAwJTtib3R0b206MDtiYWNrZ3JvdW5kLWltYWdlOi1vd2cobGluZWFyLWdyYWRpZW50KHJnYmEoMCwwLDAsMCkscmdiYSgwLDAsMCwuOSkpKTtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQobGluZWFyLWdyYWRpZW50KHJnYmEoMCwwLDAsMCkscmdiYSgwLDAsMCwuOSkpKTtiYWNrZ3JvdW5kLWltYWdlOi1tb3oobGluZWFyLWdyYWRpZW50KHJnYmEoMCwwLDAsMCkscmdiYSgwLDAsMCwuOSkpKTtiYWNrZ3JvdW5kLWltYWdlOi1vKGxpbmVhci1ncmFkaWVudChyZ2JhKDAsMCwwLDApLHJnYmEoMCwwLDAsLjkpKSk7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQocmdiYSgwLDAsMCwwKSxyZ2JhKDAsMCwwLC45KSk7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgLjZzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246b3BhY2l0eSAuNnMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IC42cyBlYXNlLW91dDt0cmFuc2l0aW9uOm9wYWNpdHkgLjZzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtaWNvbntmb250LWZhbWlseTpQbGF5ZXI7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtc2l6ZToyNnB4O2xpbmUtaGVpZ2h0OjMycHg7bGV0dGVyLXNwYWNpbmc6MDtzcGVhazpub25lO2NvbG9yOiNmZmY7b3BhY2l0eTouNTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7dGV4dC1hbGlnbjpsZWZ0Oy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlOy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2V9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1pY29uOmhvdmVye2NvbG9yOiNmZmY7b3BhY2l0eTouNzU7dGV4dC1zaGFkb3c6cmdiYSgyNTUsMjU1LDI1NSwuOCkgMCAwIDVweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLm1lZGlhLWNvbnRyb2wtaGlkZSAubWVkaWEtY29udHJvbC1iYWNrZ3JvdW5kW2RhdGEtYmFja2dyb3VuZF17b3BhY2l0eTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0ubWVkaWEtY29udHJvbC1oaWRlIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNde2JvdHRvbTotNTBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLm1lZGlhLWNvbnRyb2wtaGlkZSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItc2NydWJiZXJbZGF0YS1zZWVrYmFyXXtvcGFjaXR5OjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXXtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206N3B4O3dpZHRoOjEwMCU7aGVpZ2h0OjMycHg7dmVydGljYWwtYWxpZ246bWlkZGxlO3BvaW50ZXItZXZlbnRzOmF1dG87LXdlYmtpdC10cmFuc2l0aW9uOmJvdHRvbSAuNHM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjpib3R0b20gLjRzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246Ym90dG9tIC40cyBlYXNlLW91dDt0cmFuc2l0aW9uOmJvdHRvbSAuNHMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1sZWZ0LXBhbmVsW2RhdGEtbWVkaWEtY29udHJvbF17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDo0cHg7aGVpZ2h0OjEwMCV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1jZW50ZXItcGFuZWxbZGF0YS1tZWRpYS1jb250cm9sXXtoZWlnaHQ6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjtsaW5lLWhlaWdodDozMnB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtcmlnaHQtcGFuZWxbZGF0YS1tZWRpYS1jb250cm9sXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDo0cHg7aGVpZ2h0OjEwMCV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b257YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MDttYXJnaW46MCA2cHg7cGFkZGluZzowO2N1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uOmZvY3Vze291dGxpbmU6MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlde2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjIwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5XTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wYXVzZV17ZmxvYXQ6bGVmdDtoZWlnaHQ6MTAwJTtmb250LXNpemU6MjBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBhdXNlXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAyXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1zdG9wXXtmbG9hdDpsZWZ0O2hlaWdodDoxMDAlO2ZvbnQtc2l6ZToyMHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtc3RvcF06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwM1wifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtZnVsbHNjcmVlbl17ZmxvYXQ6cmlnaHQ7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MDtoZWlnaHQ6MTAwJX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWZ1bGxzY3JlZW5dOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDZcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWZ1bGxzY3JlZW5dLnNocmluazpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDA3XCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1oZC1pbmRpY2F0b3Jde2N1cnNvcjpkZWZhdWx0O2Zsb2F0OnJpZ2h0O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjA7aGVpZ2h0OjEwMCU7b3BhY2l0eTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDA4XCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1oZC1pbmRpY2F0b3JdLmVuYWJsZWR7b3BhY2l0eToxfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXS5lbmFibGVkOmhvdmVye29wYWNpdHk6MTt0ZXh0LXNoYWRvdzpub25lfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXBhdXNlXXtmbG9hdDpsZWZ0O2hlaWdodDoxMDAlO2ZvbnQtc2l6ZToyMHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXBhdXNlXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5cGF1c2VdLnBsYXlpbmc6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMlwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXBhdXNlXS5wYXVzZWQ6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3Bde2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjIwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5c3RvcF06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3BdLnBsYXlpbmc6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwM1wifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3BdLnN0b3BwZWQ6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtZHVyYXRpb25dLC5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtcG9zaXRpb25de2Rpc3BsYXk6aW5saW5lLWJsb2NrO2ZvbnQtc2l6ZToxMHB4O2NvbG9yOiNmZmY7Y3Vyc29yOmRlZmF1bHQ7bGluZS1oZWlnaHQ6MzJweDtwb3NpdGlvbjpyZWxhdGl2ZX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLXBvc2l0aW9uXXttYXJnaW4tbGVmdDo2cHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1kdXJhdGlvbl17Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNSk7bWFyZ2luLXJpZ2h0OjZweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLWR1cmF0aW9uXTpiZWZvcmV7Y29udGVudDpcInxcIjttYXJnaW46MCAzcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJde3Bvc2l0aW9uOmFic29sdXRlO3RvcDotMjBweDtsZWZ0OjA7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO3dpZHRoOjEwMCU7aGVpZ2h0OjI1cHg7Y3Vyc29yOnBvaW50ZXJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJde3dpZHRoOjEwMCU7aGVpZ2h0OjFweDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTJweDtiYWNrZ3JvdW5kLWNvbG9yOiM2NjZ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItZmlsbC0xW2RhdGEtc2Vla2Jhcl17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjA7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1jb2xvcjojYzJjMmMyOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dDstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWZpbGwtMltkYXRhLXNlZWtiYXJde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDowO2hlaWdodDoxMDAlO2JhY2tncm91bmQtY29sb3I6IzAwNWFmZjstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0O3RyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1ob3ZlcltkYXRhLXNlZWtiYXJde29wYWNpdHk6MDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTNweDt3aWR0aDo1cHg7aGVpZ2h0OjdweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjUpOy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZTstbW96LXRyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZTstby10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2U7dHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXTpob3ZlciAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWhvdmVyW2RhdGEtc2Vla2Jhcl17b3BhY2l0eToxfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXS5zZWVrLWRpc2FibGVke2N1cnNvcjpkZWZhdWx0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXS5zZWVrLWRpc2FibGVkOmhvdmVyIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItaG92ZXJbZGF0YS1zZWVrYmFyXXtvcGFjaXR5OjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItc2NydWJiZXJbZGF0YS1zZWVrYmFyXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MnB4O2xlZnQ6MDt3aWR0aDoyMHB4O2hlaWdodDoyMHB4O29wYWNpdHk6MTstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0O3RyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1zY3J1YmJlcltkYXRhLXNlZWtiYXJdIC5iYXItc2NydWJiZXItaWNvbltkYXRhLXNlZWtiYXJde3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6NnB4O3RvcDo2cHg7d2lkdGg6OHB4O2hlaWdodDo4cHg7Ym9yZGVyLXJhZGl1czoxMHB4O2JveC1zaGFkb3c6MCAwIDAgNnB4IHJnYmEoMjU1LDI1NSwyNTUsLjIpO2JhY2tncm91bmQtY29sb3I6I2ZmZn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXXtmbG9hdDpyaWdodDtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6MzJweDtjdXJzb3I6cG9pbnRlcjttYXJnaW46MCA2cHg7Ym94LXNpemluZzpib3JkZXItYm94fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVde2Zsb2F0OmxlZnQ7Ym90dG9tOjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXXtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjowO2JveC1zaXppbmc6Y29udGVudC1ib3g7d2lkdGg6MTZweDtoZWlnaHQ6MzJweDttYXJnaW4tcmlnaHQ6NnB4O29wYWNpdHk6MX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdOmhvdmVye29wYWNpdHk6MX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDRcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdLm11dGVke29wYWNpdHk6LjV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXS5tdXRlZDpob3ZlcntvcGFjaXR5Oi43fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV0ubXV0ZWQ6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwNVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXXtmbG9hdDpsZWZ0O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo2cHg7d2lkdGg6NDJweDtoZWlnaHQ6MThweDtwYWRkaW5nOjNweCAwO292ZXJmbG93OmhpZGRlbjstd2Via2l0LXRyYW5zaXRpb246d2lkdGggLjJzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246d2lkdGggLjJzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246d2lkdGggLjJzIGVhc2Utb3V0O3RyYW5zaXRpb246d2lkdGggLjJzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuc2VnbWVudGVkLWJhci1lbGVtZW50W2RhdGEtdm9sdW1lXXtmbG9hdDpsZWZ0O3dpZHRoOjRweDtwYWRkaW5nLWxlZnQ6MnB4O2hlaWdodDoxMnB4O29wYWNpdHk6LjU7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstbW96LWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1tcy1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstby1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjtib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstd2Via2l0LXRyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjJzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246LW1vei10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246LW8tdHJhbnNmb3JtIC4ycyBlYXNlLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5zZWdtZW50ZWQtYmFyLWVsZW1lbnRbZGF0YS12b2x1bWVdLmZpbGx7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstbW96LWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1tcy1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstby1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjtib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjtvcGFjaXR5OjF9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5zZWdtZW50ZWQtYmFyLWVsZW1lbnRbZGF0YS12b2x1bWVdOm50aC1vZi10eXBlKDEpe3BhZGRpbmctbGVmdDowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuc2VnbWVudGVkLWJhci1lbGVtZW50W2RhdGEtdm9sdW1lXTpob3Zlcnstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoMS41KTstbW96LXRyYW5zZm9ybTpzY2FsZVkoMS41KTstbXMtdHJhbnNmb3JtOnNjYWxlWSgxLjUpOy1vLXRyYW5zZm9ybTpzY2FsZVkoMS41KTt0cmFuc2Zvcm06c2NhbGVZKDEuNSl9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS53MzIwIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0udm9sdW1lLWJhci1oaWRle2hlaWdodDoxMnB4O3RvcDo5cHg7cGFkZGluZzowO3dpZHRoOjB9Jywnc2Vla190aW1lJzogJy5zZWVrLXRpbWVbZGF0YS1zZWVrLXRpbWVde3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOmF1dG87aGVpZ2h0OjIwcHg7bGluZS1oZWlnaHQ6MjBweDtib3R0b206NTVweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMiwyLDIsLjUpO3otaW5kZXg6OTk5OTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2U7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2U7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlO3RyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZX0uc2Vlay10aW1lW2RhdGEtc2Vlay10aW1lXS5oaWRkZW5bZGF0YS1zZWVrLXRpbWVde29wYWNpdHk6MH0uc2Vlay10aW1lW2RhdGEtc2Vlay10aW1lXSBzcGFuW2RhdGEtc2Vlay10aW1lXXtwb3NpdGlvbjpyZWxhdGl2ZTtjb2xvcjojZmZmO2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctbGVmdDo3cHg7cGFkZGluZy1yaWdodDo3cHh9JywnZmxhc2gnOiAnW2RhdGEtZmxhc2hde3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojMDAwO2Rpc3BsYXk6YmxvY2s7cG9pbnRlci1ldmVudHM6bm9uZX0nLCdobHMnOiAnW2RhdGEtaGxzXXtwb3NpdGlvbjphYnNvbHV0ZTtkaXNwbGF5OmJsb2NrO3BvaW50ZXItZXZlbnRzOm5vbmU7dG9wOjB9JywnaHRtbDVfdmlkZW8nOiAnW2RhdGEtaHRtbDUtdmlkZW9de3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7ZGlzcGxheTpibG9ja30nLCdodG1sX2ltZyc6ICdbZGF0YS1odG1sLWltZ117bWF4LXdpZHRoOjEwMCU7bWF4LWhlaWdodDoxMDAlfScsJ25vX29wJzogJ1tkYXRhLW5vLW9wXXt6LWluZGV4OjEwMDA7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcn1bZGF0YS1uby1vcF0gcFtkYXRhLW5vLW9wLW1zZ117cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOjI1cHg7dG9wOjQwJTtjb2xvcjojZmZmfVtkYXRhLW5vLW9wXSBjYW52YXNbZGF0YS1uby1vcC1jYW52YXNde2JhY2tncm91bmQtY29sb3I6Izc3NztoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfScsJ2JhY2tncm91bmRfYnV0dG9uJzogJy5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXXtmb250LWZhbWlseTpQbGF5ZXI7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjIpO3BvaW50ZXItZXZlbnRzOm5vbmU7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuNHM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjphbGwgLjRzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246YWxsIC40cyBlYXNlLW91dDt0cmFuc2l0aW9uOmFsbCAuNHMgZWFzZS1vdXR9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dLmhpZGV7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0uaGlkZSAuYmFja2dyb3VuZC1idXR0b24td3JhcHBlcltkYXRhLWJhY2tncm91bmQtYnV0dG9uXXtvcGFjaXR5OjB9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25de3Bvc2l0aW9uOmFic29sdXRlO292ZXJmbG93OmhpZGRlbjt3aWR0aDoxMDAlO2hlaWdodDoyNSU7bGluZS1oZWlnaHQ6MTAwJTtmb250LXNpemU6MjUlO3RvcDo1MCU7dGV4dC1hbGlnbjpjZW50ZXJ9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi1pY29uW2RhdGEtYmFja2dyb3VuZC1idXR0b25de2N1cnNvcjpwb2ludGVyO3BvaW50ZXItZXZlbnRzOmF1dG87Zm9udC1mYW1pbHk6UGxheWVyO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXN0eWxlOm5vcm1hbDtsaW5lLWhlaWdodDoxO2xldHRlci1zcGFjaW5nOjA7c3BlYWs6bm9uZTtjb2xvcjojZmZmO29wYWNpdHk6Ljc1O2JvcmRlcjowO291dGxpbmU6MDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50Oy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlOy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2U7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2V9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi1pY29uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dOmhvdmVye29wYWNpdHk6MTt0ZXh0LXNoYWRvdzpyZ2JhKDI1NSwyNTUsMjU1LC44KSAwIDAgMTVweH0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLXdyYXBwZXJbZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLWljb25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0ucGxheWluZzpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAyXCJ9LmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi13cmFwcGVyW2RhdGEtYmFja2dyb3VuZC1idXR0b25dIC5iYWNrZ3JvdW5kLWJ1dHRvbi1pY29uW2RhdGEtYmFja2dyb3VuZC1idXR0b25dLm5vdHBsYXlpbmc6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5iYWNrZ3JvdW5kLWJ1dHRvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24td3JhcHBlcltkYXRhLWJhY2tncm91bmQtYnV0dG9uXSAuYmFja2dyb3VuZC1idXR0b24taWNvbltkYXRhLWJhY2tncm91bmQtYnV0dG9uXS5wbGF5c3RvcC5wbGF5aW5nOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDNcIn0uYmFja2dyb3VuZC1idXR0b25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLXdyYXBwZXJbZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0gLmJhY2tncm91bmQtYnV0dG9uLWljb25bZGF0YS1iYWNrZ3JvdW5kLWJ1dHRvbl0ucGxheXN0b3Aubm90cGxheWluZzpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2wubWVkaWEtY29udHJvbC1oaWRlW2RhdGEtbWVkaWEtY29udHJvbF0gLmJhY2tncm91bmQtYnV0dG9uW2RhdGEtYmFja2dyb3VuZC1idXR0b25de29wYWNpdHk6MH0nLCdkdnJfY29udHJvbHMnOiAnQGltcG9ydCB1cmwoaHR0cDovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvKTsuZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXXtkaXNwbGF5OmlubGluZS1ibG9jaztmbG9hdDpsZWZ0O2NvbG9yOiNmZmY7bGluZS1oZWlnaHQ6MzJweDtmb250LXNpemU6MTBweDtmb250LXdlaWdodDo3MDA7bWFyZ2luLWxlZnQ6NnB4fS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm97Y3Vyc29yOmRlZmF1bHQ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiT3BlbiBTYW5zXCIsQXJpYWwsc2Fucy1zZXJpZn0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1pbmZvOmJlZm9yZXtjb250ZW50OlwiXCI7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6N3B4O2hlaWdodDo3cHg7Ym9yZGVyLXJhZGl1czozLjVweDttYXJnaW4tcmlnaHQ6My41cHg7YmFja2dyb3VuZC1jb2xvcjojZmYwMTAxfS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm8uZGlzYWJsZWR7b3BhY2l0eTouM30uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1pbmZvLmRpc2FibGVkOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtYnV0dG9ue2N1cnNvcjpwb2ludGVyO291dGxpbmU6MDtkaXNwbGF5Om5vbmU7Ym9yZGVyOjA7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2hlaWdodDozMnB4O3BhZGRpbmc6MDtvcGFjaXR5Oi43O2ZvbnQtZmFtaWx5OlJvYm90byxcIk9wZW4gU2Fuc1wiLEFyaWFsLHNhbnMtc2VyaWY7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2U7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZX0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1idXR0b246YmVmb3Jle2NvbnRlbnQ6XCJcIjtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo3cHg7aGVpZ2h0OjdweDtib3JkZXItcmFkaXVzOjMuNXB4O21hcmdpbi1yaWdodDozLjVweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtYnV0dG9uOmhvdmVye29wYWNpdHk6MTt0ZXh0LXNoYWRvdzpyZ2JhKDI1NSwyNTUsMjU1LC43NSkgMCAwIDVweH0uZHZyIC5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm97ZGlzcGxheTpub25lfS5kdnIgLmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtYnV0dG9ue2Rpc3BsYXk6YmxvY2t9LmR2ci5tZWRpYS1jb250cm9sLmxpdmVbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl17YmFja2dyb3VuZC1jb2xvcjojMDA1YWZmfS5tZWRpYS1jb250cm9sLmxpdmVbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl17YmFja2dyb3VuZC1jb2xvcjojZmYwMTAxfS5zZWVrLXRpbWVbZGF0YS1zZWVrLXRpbWVdIHNwYW5bZGF0YS1kdXJhdGlvbl17cG9zaXRpb246cmVsYXRpdmU7Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNSk7Zm9udC1zaXplOjEwcHg7cGFkZGluZy1yaWdodDo3cHh9LnNlZWstdGltZVtkYXRhLXNlZWstdGltZV0gc3BhbltkYXRhLWR1cmF0aW9uXTpiZWZvcmV7Y29udGVudDpcInxcIjttYXJnaW4tcmlnaHQ6N3B4fScsJ3Bvc3Rlcic6ICdAZm9udC1mYWNle2ZvbnQtZmFtaWx5OlBsYXllcjtzcmM6dXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLmVvdFwiKTtzcmM6dXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLmVvdD8jaWVmaXhcIikgZm9ybWF0KFwiZW1iZWRkZWQtb3BlbnR5cGVcIiksdXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLnR0ZlwiKSBmb3JtYXQoXCJ0cnVldHlwZVwiKSx1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuc3ZnI3BsYXllclwiKSBmb3JtYXQoXCJzdmdcIil9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJde2N1cnNvcjpwb2ludGVyO3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7ei1pbmRleDo5OTg7dG9wOjB9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJdIC5wb3N0ZXItYmFja2dyb3VuZFtkYXRhLXBvc3Rlcl17d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLXNpemU6Y292ZXI7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtcG9zaXRpb246NTAlIDUwJX0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl0gLnBsYXktd3JhcHBlcltkYXRhLXBvc3Rlcl17cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtoZWlnaHQ6MjUlO2xpbmUtaGVpZ2h0OjEwMCU7Zm9udC1zaXplOjI1JTt0b3A6NTAlO3RleHQtYWxpZ246Y2VudGVyfS5wbGF5ZXItcG9zdGVyW2RhdGEtcG9zdGVyXSAucGxheS13cmFwcGVyW2RhdGEtcG9zdGVyXSAucG9zdGVyLWljb25bZGF0YS1wb3N0ZXJde2ZvbnQtZmFtaWx5OlBsYXllcjtmb250LXdlaWdodDo0MDA7Zm9udC1zdHlsZTpub3JtYWw7bGluZS1oZWlnaHQ6MTtsZXR0ZXItc3BhY2luZzowO3NwZWFrOm5vbmU7Y29sb3I6I2ZmZjtvcGFjaXR5Oi43NTstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSB0ZXh0LXNoYWRvdzstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6LjFzOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IHRleHQtc2hhZG93IC4xczstby10cmFuc2l0aW9uOm9wYWNpdHkgdGV4dC1zaGFkb3cgLjFzO3RyYW5zaXRpb246b3BhY2l0eSB0ZXh0LXNoYWRvdyAuMXMgZWFzZX0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl0gLnBsYXktd3JhcHBlcltkYXRhLXBvc3Rlcl0gLnBvc3Rlci1pY29uW2RhdGEtcG9zdGVyXS5wbGF5W2RhdGEtcG9zdGVyXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJdIC5wbGF5LXdyYXBwZXJbZGF0YS1wb3N0ZXJdIC5wb3N0ZXItaWNvbltkYXRhLXBvc3Rlcl06aG92ZXJ7b3BhY2l0eToxO3RleHQtc2hhZG93OnJnYmEoMjU1LDI1NSwyNTUsLjgpIDAgMCAxNXB4fScsJ3NwaW5uZXJfdGhyZWVfYm91bmNlJzogJy5zcGlubmVyLXRocmVlLWJvdW5jZVtkYXRhLXNwaW5uZXJde3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbjowIGF1dG87d2lkdGg6NzBweDt0ZXh0LWFsaWduOmNlbnRlcjt6LWluZGV4Ojk5OTt0b3A6NDclO2xlZnQ6MDtyaWdodDowfS5zcGlubmVyLXRocmVlLWJvdW5jZVtkYXRhLXNwaW5uZXJdPmRpdnt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6I0ZGRjtib3JkZXItcmFkaXVzOjEwMCU7ZGlzcGxheTppbmxpbmUtYmxvY2s7LXdlYmtpdC1hbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDstbW96LWFuaW1hdGlvbjpib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy1tcy1hbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDstby1hbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDthbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDstd2Via2l0LWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDstbW96LWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDstbXMtYW5pbWF0aW9uLWZpbGwtbW9kZTpib3RoOy1vLWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDthbmltYXRpb24tZmlsbC1tb2RlOmJvdGh9LnNwaW5uZXItdGhyZWUtYm91bmNlW2RhdGEtc3Bpbm5lcl0gW2RhdGEtYm91bmNlMV0sLnNwaW5uZXItdGhyZWUtYm91bmNlW2RhdGEtc3Bpbm5lcl0gW2RhdGEtYm91bmNlMl17LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS4zMnM7LW1vei1hbmltYXRpb24tZGVsYXk6LS4zMnM7LW1zLWFuaW1hdGlvbi1kZWxheTotLjMyczstby1hbmltYXRpb24tZGVsYXk6LS4zMnM7YW5pbWF0aW9uLWRlbGF5Oi0uMzJzfUAtbW96LWtleWZyYW1lcyBib3VuY2VkZWxheXswJSwxMDAlLDgwJXstbW96LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9NDAley1tb3otdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19QC13ZWJraXQta2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpfX1ALW8ta2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley1vLXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9NDAley1vLXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fUAtbXMta2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley1tcy10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfTQwJXstbXMtdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19QGtleWZyYW1lcyBib3VuY2VkZWxheXswJSwxMDAlLDgwJXt0cmFuc2Zvcm06c2NhbGUoMCl9NDAle3RyYW5zZm9ybTpzY2FsZSgxKX19Jywnd2F0ZXJtYXJrJzogJ1tkYXRhLXdhdGVybWFya117cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luOjEwMHB4IGF1dG8gMDt3aWR0aDo3MHB4O3RleHQtYWxpZ246Y2VudGVyO3otaW5kZXg6MTB9W2RhdGEtd2F0ZXJtYXJrLWJvdHRvbS1sZWZ0XXtib3R0b206MTBweDtsZWZ0OjEwcHh9W2RhdGEtd2F0ZXJtYXJrLWJvdHRvbS1yaWdodF17Ym90dG9tOjEwcHg7cmlnaHQ6NDJweH1bZGF0YS13YXRlcm1hcmstdG9wLWxlZnRde3RvcDotOTVweDtsZWZ0OjEwcHh9W2RhdGEtd2F0ZXJtYXJrLXRvcC1yaWdodF17dG9wOi05NXB4O3JpZ2h0OjM3cHh9Jyx9fTsiLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgJCA9IHJlcXVpcmUoJ3plcHRvJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCd0ZW1wbGF0ZScpO1xudmFyIEpTVCA9IHJlcXVpcmUoJy4vanN0Jyk7XG5cbnZhciBTdHlsZXIgPSB7XG4gIGdldFN0eWxlRm9yOiBmdW5jdGlvbihuYW1lLCBvcHRpb25zPXtiYXNlVXJsOiAnJ30pIHtcbiAgICByZXR1cm4gJCgnPHN0eWxlIGNsYXNzPVwiY2xhcHByLXN0eWxlXCI+PC9zdHlsZT4nKS5odG1sKHRlbXBsYXRlKEpTVC5DU1NbbmFtZV0pKG9wdGlvbnMpKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZXI7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJ2Jyb3dzZXInKTtcblxudmFyIGV4dGVuZCA9IGZ1bmN0aW9uKHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzO1xuICB2YXIgY2hpbGQ7XG5cbiAgaWYgKHByb3RvUHJvcHMgJiYgcHJvdG9Qcm9wcy5jb25zdHJ1Y3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY2hpbGQgPSBwcm90b1Byb3BzLmNvbnN0cnVjdG9yO1xuICB9IGVsc2Uge1xuICAgIGNoaWxkID0gZnVuY3Rpb24oKXsgcmV0dXJuIHBhcmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICB9XG5cbiAgYXNzaWduKGNoaWxkLCBwYXJlbnQsIHN0YXRpY1Byb3BzKTtcblxuICB2YXIgU3Vycm9nYXRlID0gZnVuY3Rpb24oKXsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9O1xuICBTdXJyb2dhdGUucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcbiAgY2hpbGQucHJvdG90eXBlID0gbmV3IFN1cnJvZ2F0ZSgpO1xuXG4gIGlmIChwcm90b1Byb3BzKSBhc3NpZ24oY2hpbGQucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcblxuICBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlO1xuXG4gIGNoaWxkLnN1cGVyID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBwYXJlbnQucHJvdG90eXBlW25hbWVdO1xuICB9O1xuXG4gIGNoaWxkLnByb3RvdHlwZS5nZXRDbGFzcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIHJldHVybiBjaGlsZDtcbn07XG5cbnZhciBmb3JtYXRUaW1lID0gZnVuY3Rpb24odGltZSkge1xuICAgIHRpbWUgPSB0aW1lICogMTAwMFxuICAgIHRpbWUgPSBwYXJzZUludCh0aW1lLzEwMDApXG4gICAgdmFyIHNlY29uZHMgPSB0aW1lICUgNjBcbiAgICB0aW1lID0gcGFyc2VJbnQodGltZS82MClcbiAgICB2YXIgbWludXRlcyA9IHRpbWUgJSA2MFxuICAgIHRpbWUgPSBwYXJzZUludCh0aW1lLzYwKVxuICAgIHZhciBob3VycyA9IHRpbWUgJSAyNFxuICAgIHZhciBvdXQgPSBcIlwiXG4gICAgaWYgKGhvdXJzICYmIGhvdXJzID4gMCkgb3V0ICs9IChcIjBcIiArIGhvdXJzKS5zbGljZSgtMikgKyBcIjpcIlxuICAgIG91dCArPSAoXCIwXCIgKyBtaW51dGVzKS5zbGljZSgtMikgKyBcIjpcIlxuICAgIG91dCArPSAoXCIwXCIgKyBzZWNvbmRzKS5zbGljZSgtMilcbiAgICByZXR1cm4gb3V0LnRyaW0oKVxufVxuXG52YXIgRnVsbHNjcmVlbiA9IHtcbiAgaXNGdWxsc2NyZWVuOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgfHwgXG4gICAgICBkb2N1bWVudC53ZWJraXRJc0Z1bGxTY3JlZW4gfHwgXG4gICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuIHx8IFxuICAgICAgISFkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50XG4gICAgKTtcbiAgfSxcbiAgcmVxdWVzdEZ1bGxzY3JlZW46IGZ1bmN0aW9uKGVsKSB7XG4gICAgaWYoZWwucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGVsLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgfSBlbHNlIGlmKGVsLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICBlbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgIH0gZWxzZSBpZihlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICB9IGVsc2UgaWYoZWwubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgZWwubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgIH0gZWxzZSBpZiAoZWwucXVlcnlTZWxlY3RvciAmJiBlbC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIikud2Via2l0RW50ZXJGdWxsU2NyZWVuKSB7XG4gICAgICBlbC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIikud2Via2l0RW50ZXJGdWxsU2NyZWVuKCk7XG4gICAgfVxuICB9LFxuICBjYW5jZWxGdWxsc2NyZWVuOiBmdW5jdGlvbigpIHtcbiAgICBpZihkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgIH0gZWxzZSBpZihkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgIH0gZWxzZSBpZihkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgICBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gICAgfVxuICB9XG59O1xuXG5jbGFzcyBDb25maWcge1xuXG4gIHN0YXRpYyBfZGVmYXVsdENvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdm9sdW1lOiB7XG4gICAgICAgIHZhbHVlOiAxMDAsXG4gICAgICAgIHBhcnNlOiBwYXJzZUludFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBfZGVmYXVsdFZhbHVlRm9yKGtleSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdENvbmZpZygpW2tleV1bJ3BhcnNlJ10odGhpcy5fZGVmYXVsdENvbmZpZygpW2tleV1bJ3ZhbHVlJ10pO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBfY3JlYXRlX2tleXNwYWNlKGtleSl7XG4gICAgcmV0dXJuICdjbGFwcHIuJyArIGRvY3VtZW50LmRvbWFpbiArICcuJyArIGtleVxuICB9XG5cbiAgc3RhdGljIHJlc3RvcmUoa2V5KSB7XG4gICAgaWYgKEJyb3dzZXIuaGFzTG9jYWxzdG9yYWdlICYmIGxvY2FsU3RvcmFnZVt0aGlzLl9jcmVhdGVfa2V5c3BhY2Uoa2V5KV0pe1xuICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRDb25maWcoKVtrZXldWydwYXJzZSddKGxvY2FsU3RvcmFnZVt0aGlzLl9jcmVhdGVfa2V5c3BhY2Uoa2V5KV0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kZWZhdWx0VmFsdWVGb3Ioa2V5KVxuICB9XG5cbiAgc3RhdGljIHBlcnNpc3Qoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChCcm93c2VyLmhhc0xvY2Fsc3RvcmFnZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlW3RoaXMuX2NyZWF0ZV9rZXlzcGFjZShrZXkpXSA9IHZhbHVlXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbnZhciBzZWVrU3RyaW5nVG9TZWNvbmRzID0gZnVuY3Rpb24odXJsKSB7XG4gIHZhciBlbGVtZW50cyA9ICh1cmwubWF0Y2goL3Q9KFswLTldKmgpPyhbMC05XSptKT8oWzAtOV0qcyk/LykgfHwgW10pLnNwbGljZSgxKTtcbiAgcmV0dXJuICghIWVsZW1lbnRzLmxlbmd0aCk/IGVsZW1lbnRzLm1hcChmdW5jdGlvbiAoZWwpIHtcbiAgICBpZiAoZWwpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHBhcnNlSW50KGVsLnNsaWNlKDAsMikpIHx8IDA7XG4gICAgICBzd2l0Y2ggKGVsW2VsLmxlbmd0aC0xXSkge1xuICAgICAgICBjYXNlICdoJzogdmFsdWUgPSB2YWx1ZSAqIDM2MDA7IGJyZWFrO1xuICAgICAgICBjYXNlICdtJzogdmFsdWUgPSB2YWx1ZSAqIDYwOyBicmVhaztcbiAgICAgIH07XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9KS5yZWR1Y2UoZnVuY3Rpb24gKGEsYikgeyByZXR1cm4gYStiOyB9KTogMDtcbn1cblxudmFyIGlkQ291bnRlciA9IDA7XG5cbnZhciB1bmlxdWVJZCA9IGZ1bmN0aW9uKHByZWZpeCkge1xuICB2YXIgaWQgPSArK2lkQ291bnRlcjtcbiAgcmV0dXJuIHByZWZpeCArIGlkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIGZvcm1hdFRpbWU6IGZvcm1hdFRpbWUsXG4gIEZ1bGxzY3JlZW46IEZ1bGxzY3JlZW4sXG4gIENvbmZpZzogQ29uZmlnLFxuICBzZWVrU3RyaW5nVG9TZWNvbmRzOiBzZWVrU3RyaW5nVG9TZWNvbmRzLFxuICB1bmlxdWVJZDogdW5pcXVlSWRcbn07XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIENvbnRhaW5lciBpcyByZXNwb25zaWJsZSBmb3IgdGhlIHZpZGVvIHJlbmRlcmluZyBhbmQgc3RhdGVcbiAqL1xuXG52YXIgVUlPYmplY3QgPSByZXF1aXJlKCd1aV9vYmplY3QnKTtcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJylcblxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgVUlPYmplY3Qge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdDb250YWluZXInIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7IHJldHVybiB7IGNsYXNzOiAnY29udGFpbmVyJywgJ2RhdGEtY29udGFpbmVyJzogJycgfSB9XG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHsnY2xpY2snOiAnY2xpY2tlZCcsICdtb3VzZWVudGVyJzogJ21vdXNlRW50ZXInLCAnbW91c2VsZWF2ZSc6ICdtb3VzZUxlYXZlJ31cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLnBsYXliYWNrID0gb3B0aW9ucy5wbGF5YmFjaztcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5wbGF5YmFjay5zZXR0aW5ncztcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLm1lZGlhQ29udHJvbERpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5wbHVnaW5zID0gW3RoaXMucGxheWJhY2tdO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgdGhpcy5wcm9ncmVzcyk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy50aW1lVXBkYXRlZCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMucmVhZHkpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5idWZmZXJpbmcpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsIHRoaXMuYnVmZmVyZnVsbCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfU0VUVElOR1NVUERBVEUsIHRoaXMuc2V0dGluZ3NVcGRhdGUpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0xPQURFRE1FVEFEQVRBLCB0aGlzLmxvYWRlZE1ldGFkYXRhKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19ISUdIREVGSU5JVElPTlVQREFURSwgdGhpcy5oaWdoRGVmaW5pdGlvblVwZGF0ZSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfQklUUkFURSwgdGhpcy51cGRhdGVCaXRyYXRlKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19QTEFZQkFDS1NUQVRFLCB0aGlzLnBsYXliYWNrU3RhdGVDaGFuZ2VkKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19EVlIsIHRoaXMucGxheWJhY2tEdnJTdGF0ZUNoYW5nZWQpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX01FRElBQ09OVFJPTF9ESVNBQkxFLCB0aGlzLmRpc2FibGVNZWRpYUNvbnRyb2wpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX01FRElBQ09OVFJPTF9FTkFCTEUsIHRoaXMuZW5hYmxlTWVkaWFDb250cm9sKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19FTkRFRCwgdGhpcy5lbmRlZCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUExBWSwgdGhpcy5wbGF5aW5nKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19FUlJPUiwgdGhpcy5lcnJvcik7XG4gIH1cblxuICBwbGF5YmFja1N0YXRlQ2hhbmdlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS1NUQVRFKTtcbiAgfVxuXG4gIHBsYXliYWNrRHZyU3RhdGVDaGFuZ2VkKGR2ckluVXNlKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMucGxheWJhY2suc2V0dGluZ3NcbiAgICB0aGlzLmR2ckluVXNlID0gZHZySW5Vc2VcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCwgZHZySW5Vc2UpXG4gIH1cblxuICB1cGRhdGVCaXRyYXRlKG5ld0JpdHJhdGUpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9CSVRSQVRFLCBuZXdCaXRyYXRlKVxuICB9XG5cbiAgc3RhdHNSZXBvcnQobWV0cmljcykge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NUQVRTX1JFUE9SVCwgbWV0cmljcylcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFjay5nZXRQbGF5YmFja1R5cGUoKVxuICB9XG5cbiAgaXNEdnJFbmFibGVkKCkge1xuICAgIHJldHVybiAhIXRoaXMucGxheWJhY2suZHZyRW5hYmxlZFxuICB9XG5cbiAgaXNEdnJJblVzZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmR2ckluVXNlXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCwgdGhpcywgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnBsYXliYWNrLmRlc3Ryb3koKTtcbiAgICB0aGlzLnBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiBwbHVnaW4uZGVzdHJveSgpKVxuICAgIHRoaXMuJGVsLnJlbW92ZSgpO1xuICB9XG5cbiAgc2V0U3R5bGUoc3R5bGUpIHtcbiAgICB0aGlzLiRlbC5jc3Moc3R5bGUpO1xuICB9XG5cbiAgYW5pbWF0ZShzdHlsZSwgZHVyYXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy4kZWwuYW5pbWF0ZShzdHlsZSwgZHVyYXRpb24pLnByb21pc2UoKTtcbiAgfVxuXG4gIHJlYWR5KCkge1xuICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUkVBRFksIHRoaXMubmFtZSk7XG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWJhY2suaXNQbGF5aW5nKCk7XG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFjay5nZXREdXJhdGlvbigpO1xuICB9XG5cbiAgZXJyb3IoZXJyb3JPYmopIHtcbiAgICB0aGlzLiRlbC5hcHBlbmQoZXJyb3JPYmoucmVuZGVyKCkuZWwpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfRVJST1IsIHtlcnJvcjogZXJyb3JPYmosIGNvbnRhaW5lcjogdGhpc30sIHRoaXMubmFtZSk7XG4gIH1cblxuICBsb2FkZWRNZXRhZGF0YShkdXJhdGlvbikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0xPQURFRE1FVEFEQVRBLCBkdXJhdGlvbik7XG4gIH1cblxuICB0aW1lVXBkYXRlZChwb3NpdGlvbiwgZHVyYXRpb24pIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFLCBwb3NpdGlvbiwgZHVyYXRpb24sIHRoaXMubmFtZSk7XG4gIH1cblxuICBwcm9ncmVzcyhzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbiwgZHVyYXRpb24pIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QUk9HUkVTUywgc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24sIGR1cmF0aW9uLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgcGxheWluZygpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLnBsYXliYWNrLnBsYXkoKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnBsYXliYWNrLnN0b3AoKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BBVVNFLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucGxheWJhY2sucGF1c2UoKTtcbiAgfVxuXG4gIGVuZGVkKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0VOREVELCB0aGlzLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgY2xpY2tlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9DTElDSywgdGhpcywgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIHNldEN1cnJlbnRUaW1lKHRpbWUpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9TRUVLLCB0aW1lLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucGxheWJhY2suc2Vlayh0aW1lKTtcbiAgfVxuXG4gIHNldFZvbHVtZSh2YWx1ZSkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1ZPTFVNRSwgdmFsdWUsIHRoaXMubmFtZSk7XG4gICAgdGhpcy5wbGF5YmFjay52b2x1bWUodmFsdWUpO1xuICB9XG5cbiAgZnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9GVUxMU0NSRUVOLCB0aGlzLm5hbWUpO1xuICB9XG5cbiAgYnVmZmVyaW5nKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORywgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGJ1ZmZlcmZ1bGwoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSRlVMTCwgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGFkZFBsdWdpbihwbHVnaW4pIHtcbiAgICB0aGlzLnBsdWdpbnMucHVzaChwbHVnaW4pO1xuICB9XG5cbiAgaGFzUGx1Z2luKG5hbWUpIHtcbiAgICByZXR1cm4gISF0aGlzLmdldFBsdWdpbihuYW1lKTtcbiAgfVxuXG4gIGdldFBsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuIGZpbmQodGhpcy5wbHVnaW5zLCAocGx1Z2luKSA9PiB7IHJldHVybiBwbHVnaW4ubmFtZSA9PT0gbmFtZSB9KTtcbiAgfVxuXG4gIG1vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfTU9VU0VfRU5URVIpXG4gIH1cblxuICBtb3VzZUxlYXZlKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX01PVVNFX0xFQVZFKVxuICB9XG5cbiAgc2V0dGluZ3NVcGRhdGUoKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMucGxheWJhY2suc2V0dGluZ3M7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU0VUVElOR1NVUERBVEUpO1xuICB9XG5cbiAgaGlnaERlZmluaXRpb25VcGRhdGUoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfSElHSERFRklOSVRJT05VUERBVEUpO1xuICB9XG5cbiAgaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXliYWNrLmlzSGlnaERlZmluaXRpb25JblVzZSgpXG4gIH1cblxuICBkaXNhYmxlTWVkaWFDb250cm9sKCkge1xuICAgIHRoaXMubWVkaWFDb250cm9sRGlzYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9ESVNBQkxFKTtcbiAgfVxuXG4gIGVuYWJsZU1lZGlhQ29udHJvbCgpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbERpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfTUVESUFDT05UUk9MX0VOQUJMRSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKCdjb250YWluZXInKTtcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpO1xuICAgIHRoaXMuJGVsLmFwcGVuZCh0aGlzLnBsYXliYWNrLnJlbmRlcigpLmVsKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhaW5lcjtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogVGhlIENvbnRhaW5lckZhY3RvcnkgaXMgcmVzcG9uc2libGUgZm9yIG1hbmFnZSBwbGF5YmFjayBib290c3RyYXAgYW5kIGNyZWF0ZSBjb250YWluZXJzLlxuICovXG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guYXNzaWduJyk7XG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0Jyk7XG52YXIgQ29udGFpbmVyID0gcmVxdWlyZSgnY29udGFpbmVyJyk7XG52YXIgJCA9IHJlcXVpcmUoJ3plcHRvJyk7XG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJyk7XG5cbmNsYXNzIENvbnRhaW5lckZhY3RvcnkgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucywgbG9hZGVyKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmxvYWRlciA9IGxvYWRlcjtcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcnMoKSB7XG4gICAgcmV0dXJuICQuRGVmZXJyZWQoKHByb21pc2UpID0+IHtcbiAgICAgIHByb21pc2UucmVzb2x2ZSh0aGlzLm9wdGlvbnMuc291cmNlcy5tYXAoKHNvdXJjZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVDb250YWluZXIoc291cmNlKTtcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRQbGF5YmFja1BsdWdpbihzb3VyY2UpIHtcbiAgICByZXR1cm4gZmluZCh0aGlzLmxvYWRlci5wbGF5YmFja1BsdWdpbnMsIChwKSA9PiB7IHJldHVybiBwLmNhblBsYXkoc291cmNlLnRvU3RyaW5nKCkpIH0pXG4gIH1cblxuICBjcmVhdGVDb250YWluZXIoc291cmNlLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IGFzc2lnbih7fSwgb3B0aW9ucywgdGhpcy5vcHRpb25zLCB7c3JjOiBzb3VyY2UsIGF1dG9QbGF5OiAhIXRoaXMub3B0aW9ucy5hdXRvUGxheX0pXG4gICAgdmFyIHBsYXliYWNrUGx1Z2luID0gdGhpcy5maW5kUGxheWJhY2tQbHVnaW4oc291cmNlKVxuICAgIHZhciBwbGF5YmFjayA9IG5ldyBwbGF5YmFja1BsdWdpbihvcHRpb25zKVxuICAgIHZhciBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyKHtwbGF5YmFjazogcGxheWJhY2t9KVxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKVxuICAgIGRlZmVyLnByb21pc2UoY29udGFpbmVyKVxuICAgIHRoaXMuYWRkQ29udGFpbmVyUGx1Z2lucyhjb250YWluZXIsIHNvdXJjZSlcbiAgICB0aGlzLmxpc3RlblRvT25jZShjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUkVBRFksICgpID0+IGRlZmVyLnJlc29sdmUoY29udGFpbmVyKSlcbiAgICByZXR1cm4gY29udGFpbmVyXG4gIH1cblxuICBhZGRDb250YWluZXJQbHVnaW5zKGNvbnRhaW5lciwgc291cmNlKSB7XG4gICAgdGhpcy5sb2FkZXIuY29udGFpbmVyUGx1Z2lucy5mb3JFYWNoKChQbHVnaW4pID0+IHtcbiAgICAgIHZhciBvcHRpb25zID0gYXNzaWduKHRoaXMub3B0aW9ucywge2NvbnRhaW5lcjogY29udGFpbmVyLCBzcmM6IHNvdXJjZX0pO1xuICAgICAgY29udGFpbmVyLmFkZFBsdWdpbihuZXcgUGx1Z2luKG9wdGlvbnMpKTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhaW5lckZhY3Rvcnk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29udGFpbmVyX2ZhY3RvcnknKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuLyoqXG4gKiBUaGUgQ29yZSBpcyByZXNwb25zaWJsZSB0byBtYW5hZ2UgQ29udGFpbmVycywgdGhlIG1lZGlhdG9yLCBNZWRpYUNvbnRyb2xcbiAqIGFuZCB0aGUgcGxheWVyIHN0YXRlLlxuICovXG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guYXNzaWduJylcbnZhciAkID0gcmVxdWlyZSgnemVwdG8nKVxuXG52YXIgVUlPYmplY3QgPSByZXF1aXJlKCd1aV9vYmplY3QnKVxudmFyIENvbnRhaW5lckZhY3RvcnkgPSByZXF1aXJlKCcuLi9jb250YWluZXJfZmFjdG9yeScpXG52YXIgRnVsbHNjcmVlbiA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdXRpbHMnKS5GdWxsc2NyZWVuXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIE1lZGlhQ29udHJvbCA9IHJlcXVpcmUoJ21lZGlhX2NvbnRyb2wnKVxudmFyIFBsYXllckluZm8gPSByZXF1aXJlKCdwbGF5ZXJfaW5mbycpXG52YXIgTWVkaWF0b3IgPSByZXF1aXJlKCdtZWRpYXRvcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcblxudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpXG5cbmNsYXNzIENvcmUgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJzogJ2V4aXQnLFxuICAgICAgJ21vdXNlbW92ZSc6ICdzaG93TWVkaWFDb250cm9sJyxcbiAgICAgICdtb3VzZWxlYXZlJzogJ2hpZGVNZWRpYUNvbnRyb2wnXG4gICAgfVxuICB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkYXRhLXBsYXllcic6ICcnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgUGxheWVySW5mby5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLnBsdWdpbnMgPSBbXVxuICAgIHRoaXMuY29udGFpbmVycyA9IFtdXG4gICAgdGhpcy5jcmVhdGVDb250YWluZXJzKG9wdGlvbnMpXG4gICAgLy9GSVhNRSBmdWxsc2NyZWVuIGFwaSBzdWNrc1xuICAgICQoZG9jdW1lbnQpLmJpbmQoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCAoKSA9PiB0aGlzLmV4aXQoKSlcbiAgICAkKGRvY3VtZW50KS5iaW5kKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCAoKSA9PiB0aGlzLmV4aXQoKSlcbiAgICAkKGRvY3VtZW50KS5iaW5kKCdtb3pmdWxsc2NyZWVuY2hhbmdlJywgKCkgPT4gdGhpcy5leGl0KCkpXG4gIH1cblxuICBjcmVhdGVDb250YWluZXJzKG9wdGlvbnMpIHtcbiAgICB0aGlzLmRlZmVyID0gJC5EZWZlcnJlZCgpXG4gICAgdGhpcy5kZWZlci5wcm9taXNlKHRoaXMpXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5ID0gbmV3IENvbnRhaW5lckZhY3Rvcnkob3B0aW9ucywgb3B0aW9ucy5sb2FkZXIpXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5XG4gICAgICAuY3JlYXRlQ29udGFpbmVycygpXG4gICAgICAudGhlbigoY29udGFpbmVycykgPT4gdGhpcy5zZXR1cENvbnRhaW5lcnMoY29udGFpbmVycykpXG4gICAgICAudGhlbigoY29udGFpbmVycykgPT4gdGhpcy5yZXNvbHZlT25Db250YWluZXJzUmVhZHkoY29udGFpbmVycykpXG4gIH1cblxuICB1cGRhdGVTaXplKCkge1xuICAgIGlmIChGdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpKSB7XG4gICAgICB0aGlzLnNldEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFBsYXllclNpemUoKVxuICAgIH1cbiAgICBNZWRpYXRvci50cmlnZ2VyKEV2ZW50cy5QTEFZRVJfUkVTSVpFKVxuICB9XG5cbiAgc2V0RnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLiRlbC5hZGRDbGFzcygnZnVsbHNjcmVlbicpXG4gICAgdGhpcy4kZWwucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgIFBsYXllckluZm8ucHJldmlvdXNTaXplID0gUGxheWVySW5mby5jdXJyZW50U2l6ZVxuICAgIFBsYXllckluZm8uY3VycmVudFNpemUgPSB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfVxuICB9XG5cbiAgc2V0UGxheWVyU2l6ZSgpIHtcbiAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnZnVsbHNjcmVlbicpXG4gICAgUGxheWVySW5mby5jdXJyZW50U2l6ZSA9IFBsYXllckluZm8ucHJldmlvdXNTaXplXG4gICAgUGxheWVySW5mby5wcmV2aW91c1NpemUgPSB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfVxuICAgIHRoaXMucmVzaXplKFBsYXllckluZm8uY3VycmVudFNpemUpXG4gIH1cblxuICByZXNpemUob3B0aW9ucykge1xuICAgIHRoaXMuZWwuc3R5bGUuaGVpZ2h0ID0gYCR7b3B0aW9ucy5oZWlnaHR9cHhgO1xuICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBgJHtvcHRpb25zLndpZHRofXB4YDtcbiAgICBQbGF5ZXJJbmZvLnByZXZpb3VzU2l6ZSA9IFBsYXllckluZm8uY3VycmVudFNpemVcbiAgICBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplID0gb3B0aW9uc1xuICAgIE1lZGlhdG9yLnRyaWdnZXIoRXZlbnRzLlBMQVlFUl9SRVNJWkUpXG4gIH1cblxuICByZXNvbHZlT25Db250YWluZXJzUmVhZHkoY29udGFpbmVycykge1xuICAgICQud2hlbi5hcHBseSgkLCBjb250YWluZXJzKS5kb25lKCgpID0+dGhpcy5kZWZlci5yZXNvbHZlKHRoaXMpKVxuICB9XG5cbiAgYWRkUGx1Z2luKHBsdWdpbikge1xuICAgIHRoaXMucGx1Z2lucy5wdXNoKHBsdWdpbilcbiAgfVxuXG4gIGhhc1BsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuICEhdGhpcy5nZXRQbHVnaW4obmFtZSlcbiAgfVxuXG4gIGdldFBsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuIGZpbmQodGhpcy5wbHVnaW5zLCAocGx1Z2luKSA9PiBwbHVnaW4ubmFtZSA9PT0gbmFtZSlcbiAgfVxuXG4gIGxvYWQoc291cmNlcykge1xuICAgIHNvdXJjZXMgPSBzb3VyY2VzICYmIHNvdXJjZXMuY29uc3RydWN0b3IgPT09IEFycmF5ID8gc291cmNlcyA6IFtzb3VyY2VzLnRvU3RyaW5nKCldO1xuICAgIHRoaXMuY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IGNvbnRhaW5lci5kZXN0cm95KCkpXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5Lm9wdGlvbnMgPSBhc3NpZ24odGhpcy5vcHRpb25zLCB7c291cmNlc30pXG4gICAgdGhpcy5jb250YWluZXJGYWN0b3J5LmNyZWF0ZUNvbnRhaW5lcnMoKS50aGVuKChjb250YWluZXJzKSA9PiB7XG4gICAgICB0aGlzLnNldHVwQ29udGFpbmVycyhjb250YWluZXJzKVxuICAgIH0pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IGNvbnRhaW5lci5kZXN0cm95KCkpXG4gICAgdGhpcy5wbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4gcGx1Z2luLmRlc3Ryb3koKSlcbiAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICAgIHRoaXMubWVkaWFDb250cm9sLmRlc3Ryb3koKVxuICAgICQoZG9jdW1lbnQpLnVuYmluZCgnZnVsbHNjcmVlbmNoYW5nZScpXG4gICAgJChkb2N1bWVudCkudW5iaW5kKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnKVxuICAgICQoZG9jdW1lbnQpLnVuYmluZCgnbW96ZnVsbHNjcmVlbmNoYW5nZScpXG59XG5cbiAgZXhpdCgpIHtcbiAgICB0aGlzLnVwZGF0ZVNpemUoKVxuICAgIHRoaXMubWVkaWFDb250cm9sLnNob3coKVxuICB9XG5cbiAgc2V0TWVkaWFDb250cm9sQ29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMubWVkaWFDb250cm9sLnNldENvbnRhaW5lcihjb250YWluZXIpXG4gICAgdGhpcy5tZWRpYUNvbnRyb2wucmVuZGVyKClcbiAgfVxuXG4gIGRpc2FibGVNZWRpYUNvbnRyb2woKSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuZGlzYWJsZSgpXG4gICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ25vY3Vyc29yJylcbiAgfVxuXG4gIGVuYWJsZU1lZGlhQ29udHJvbCgpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5lbmFibGUoKVxuICB9XG5cbiAgcmVtb3ZlQ29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZyhjb250YWluZXIpXG4gICAgdGhpcy5jb250YWluZXJzID0gdGhpcy5jb250YWluZXJzLmZpbHRlcigoYykgPT4gYyAhPT0gY29udGFpbmVyKVxuICB9XG5cbiAgYXBwZW5kQ29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMubGlzdGVuVG8oY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCwgdGhpcy5yZW1vdmVDb250YWluZXIpXG4gICAgdGhpcy5lbC5hcHBlbmRDaGlsZChjb250YWluZXIucmVuZGVyKCkuZWwpXG4gICAgdGhpcy5jb250YWluZXJzLnB1c2goY29udGFpbmVyKVxuICB9XG5cbiAgc2V0dXBDb250YWluZXJzKGNvbnRhaW5lcnMpIHtcbiAgICBjb250YWluZXJzLm1hcCh0aGlzLmFwcGVuZENvbnRhaW5lci5iaW5kKHRoaXMpKVxuICAgIHRoaXMuc2V0dXBNZWRpYUNvbnRyb2wodGhpcy5nZXRDdXJyZW50Q29udGFpbmVyKCkpXG4gICAgdGhpcy5yZW5kZXIoKVxuICAgIHRoaXMuJGVsLmFwcGVuZFRvKHRoaXMub3B0aW9ucy5wYXJlbnRFbGVtZW50KVxuICAgIHJldHVybiBjb250YWluZXJzXG4gIH1cblxuICBjcmVhdGVDb250YWluZXIoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyRmFjdG9yeS5jcmVhdGVDb250YWluZXIoc291cmNlLCBvcHRpb25zKVxuICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKGNvbnRhaW5lcilcbiAgICByZXR1cm4gY29udGFpbmVyXG4gIH1cblxuICBzZXR1cE1lZGlhQ29udHJvbChjb250YWluZXIpIHtcbiAgICBpZiAodGhpcy5tZWRpYUNvbnRyb2wpIHtcbiAgICAgIHRoaXMubWVkaWFDb250cm9sLnNldENvbnRhaW5lcihjb250YWluZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWVkaWFDb250cm9sID0gdGhpcy5jcmVhdGVNZWRpYUNvbnRyb2woYXNzaWduKHtjb250YWluZXI6IGNvbnRhaW5lcn0sIHRoaXMub3B0aW9ucykpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX0ZVTExTQ1JFRU4sIHRoaXMudG9nZ2xlRnVsbHNjcmVlbilcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tZWRpYUNvbnRyb2wsIEV2ZW50cy5NRURJQUNPTlRST0xfU0hPVywgdGhpcy5vbk1lZGlhQ29udHJvbFNob3cuYmluZCh0aGlzLCB0cnVlKSlcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tZWRpYUNvbnRyb2wsIEV2ZW50cy5NRURJQUNPTlRST0xfSElERSwgdGhpcy5vbk1lZGlhQ29udHJvbFNob3cuYmluZCh0aGlzLCBmYWxzZSkpXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlTWVkaWFDb250cm9sKG9wdGlvbnMpIHtcbiAgICBpZihvcHRpb25zLm1lZGlhY29udHJvbCAmJiBvcHRpb25zLm1lZGlhY29udHJvbC5leHRlcm5hbCkge1xuICAgICAgcmV0dXJuIG5ldyBvcHRpb25zLm1lZGlhY29udHJvbC5leHRlcm5hbChvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBNZWRpYUNvbnRyb2wob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q3VycmVudENvbnRhaW5lcigpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXJzWzBdXG4gIH1cblxuICB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgIGlmICghRnVsbHNjcmVlbi5pc0Z1bGxzY3JlZW4oKSkge1xuICAgICAgRnVsbHNjcmVlbi5yZXF1ZXN0RnVsbHNjcmVlbih0aGlzLmVsKVxuICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2Z1bGxzY3JlZW4nKVxuICAgIH0gZWxzZSB7XG4gICAgICBGdWxsc2NyZWVuLmNhbmNlbEZ1bGxzY3JlZW4oKVxuICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2Z1bGxzY3JlZW4gbm9jdXJzb3InKVxuICAgIH1cbiAgICB0aGlzLm1lZGlhQ29udHJvbC5zaG93KClcbiAgfVxuXG4gIHNob3dNZWRpYUNvbnRyb2woZXZlbnQpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5zaG93KGV2ZW50KVxuICB9XG5cbiAgaGlkZU1lZGlhQ29udHJvbChldmVudCkge1xuICAgIHRoaXMubWVkaWFDb250cm9sLmhpZGUoZXZlbnQpXG4gIH1cblxuICBvbk1lZGlhQ29udHJvbFNob3coc2hvd2luZykge1xuICAgIGlmIChzaG93aW5nKVxuICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ25vY3Vyc29yJylcbiAgICBlbHNlIGlmIChGdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpKVxuICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ25vY3Vyc29yJylcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IoJ2NvcmUnKVxuICAgIC8vRklYTUVcbiAgICAvL3RoaXMuJGVsLmVtcHR5KClcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHRoaXMubWVkaWFDb250cm9sLnJlbmRlcigpLmVsKVxuXG4gICAgdGhpcy5vcHRpb25zLndpZHRoID0gdGhpcy5vcHRpb25zLndpZHRoIHx8IHRoaXMuJGVsLndpZHRoKClcbiAgICB0aGlzLm9wdGlvbnMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLmhlaWdodCB8fCB0aGlzLiRlbC5oZWlnaHQoKVxuICAgIHZhciBzaXplID0ge3dpZHRoOiB0aGlzLm9wdGlvbnMud2lkdGgsIGhlaWdodDogdGhpcy5vcHRpb25zLmhlaWdodH1cbiAgICBQbGF5ZXJJbmZvLnByZXZpb3VzU2l6ZSA9IFBsYXllckluZm8uY3VycmVudFNpemUgPSBzaXplXG4gICAgdGhpcy51cGRhdGVTaXplKClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIFRoZSBDb3JlIEZhY3RvcnkgaXMgcmVzcG9uc2libGUgZm9yIGluc3RhbnRpYXRlIHRoZSBjb3JlIGFuZCBpdCdzIHBsdWdpbnMuXG4gKi9cblxudmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCdiYXNlX29iamVjdCcpO1xudmFyIENvcmUgPSByZXF1aXJlKCdjb3JlJyk7XG5cbmNsYXNzIENvcmVGYWN0b3J5IGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKHBsYXllciwgbG9hZGVyKSB7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXJcbiAgICB0aGlzLm9wdGlvbnMgPSBwbGF5ZXIub3B0aW9uc1xuICAgIHRoaXMubG9hZGVyID0gbG9hZGVyXG4gICAgdGhpcy5vcHRpb25zLmxvYWRlciA9IHRoaXMubG9hZGVyXG4gIH1cblxuICBjcmVhdGUoKSB7XG4gICAgdGhpcy5jb3JlID0gbmV3IENvcmUodGhpcy5vcHRpb25zKVxuICAgIHRoaXMuY29yZS50aGVuKHRoaXMuYWRkQ29yZVBsdWdpbnMuYmluZCh0aGlzKSlcbiAgICByZXR1cm4gdGhpcy5jb3JlXG4gIH1cblxuICBhZGRDb3JlUGx1Z2lucygpIHtcbiAgICB0aGlzLmxvYWRlci5jb3JlUGx1Z2lucy5mb3JFYWNoKChQbHVnaW4pID0+IHtcbiAgICAgIHZhciBwbHVnaW4gPSBuZXcgUGx1Z2luKHRoaXMuY29yZSlcbiAgICAgIHRoaXMuY29yZS5hZGRQbHVnaW4ocGx1Z2luKVxuICAgICAgdGhpcy5zZXR1cEV4dGVybmFsSW50ZXJmYWNlKHBsdWdpbilcbiAgICB9KVxuICAgIHJldHVybiB0aGlzLmNvcmVcbiAgfVxuXG4gIHNldHVwRXh0ZXJuYWxJbnRlcmZhY2UocGx1Z2luKSB7XG4gICAgdmFyIGV4dGVybmFsRnVuY3Rpb25zID0gcGx1Z2luLmdldEV4dGVybmFsSW50ZXJmYWNlKCk7XG4gICAgZm9yICh2YXIga2V5IGluIGV4dGVybmFsRnVuY3Rpb25zKSB7XG4gICAgICB0aGlzLnBsYXllcltrZXldID0gZXh0ZXJuYWxGdW5jdGlvbnNba2V5XS5iaW5kKHBsdWdpbilcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlRmFjdG9yeTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb3JlX2ZhY3RvcnknKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xvYWRlcicpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0JylcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgncGxheWVyX2luZm8nKVxudmFyIHVuaXEgPSByZXF1aXJlKCdsb2Rhc2gudW5pcScpXG5cbi8qIFBsYXliYWNrIFBsdWdpbnMgKi9cbnZhciBIVE1MNVZpZGVvUGxheWJhY2sgPSByZXF1aXJlKCdodG1sNV92aWRlbycpO1xudmFyIEZsYXNoVmlkZW9QbGF5YmFjayA9IHJlcXVpcmUoJ2ZsYXNoJyk7XG52YXIgSFRNTDVBdWRpb1BsYXliYWNrID0gcmVxdWlyZSgnaHRtbDVfYXVkaW8nKTtcbnZhciBITFNWaWRlb1BsYXliYWNrID0gcmVxdWlyZSgnaGxzJyk7XG52YXIgSFRNTEltZ1BsYXliYWNrID0gcmVxdWlyZSgnaHRtbF9pbWcnKTtcbnZhciBOb09wID0gcmVxdWlyZSgnLi4vLi4vcGxheWJhY2tzL25vX29wJyk7XG5cbi8qIENvbnRhaW5lciBQbHVnaW5zICovXG52YXIgU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9zcGlubmVyX3RocmVlX2JvdW5jZScpO1xudmFyIFN0YXRzUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9zdGF0cycpO1xudmFyIFdhdGVyTWFya1BsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvd2F0ZXJtYXJrJyk7XG52YXIgUG9zdGVyUGx1Z2luID0gcmVxdWlyZSgncG9zdGVyJyk7XG52YXIgR29vZ2xlQW5hbHl0aWNzUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9nb29nbGVfYW5hbHl0aWNzJyk7XG52YXIgQ2xpY2tUb1BhdXNlUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9jbGlja190b19wYXVzZScpO1xuXG4vKiBDb3JlIFBsdWdpbnMgKi9cbnZhciBEVlJDb250cm9scyA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvZHZyX2NvbnRyb2xzJyk7XG5cbmNsYXNzIExvYWRlciBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihleHRlcm5hbFBsdWdpbnMpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5wbGF5YmFja1BsdWdpbnMgPSBbSFRNTDVWaWRlb1BsYXliYWNrLCBGbGFzaFZpZGVvUGxheWJhY2ssIEhUTUw1QXVkaW9QbGF5YmFjaywgSExTVmlkZW9QbGF5YmFjaywgSFRNTEltZ1BsYXliYWNrLCBOb09wXVxuICAgIHRoaXMuY29udGFpbmVyUGx1Z2lucyA9IFtTcGlubmVyVGhyZWVCb3VuY2VQbHVnaW4sIFdhdGVyTWFya1BsdWdpbiwgUG9zdGVyUGx1Z2luLCBTdGF0c1BsdWdpbiwgR29vZ2xlQW5hbHl0aWNzUGx1Z2luLCBDbGlja1RvUGF1c2VQbHVnaW5dXG4gICAgdGhpcy5jb3JlUGx1Z2lucyA9IFtEVlJDb250cm9sc11cbiAgICBpZiAoZXh0ZXJuYWxQbHVnaW5zKSB7XG4gICAgICB0aGlzLmFkZEV4dGVybmFsUGx1Z2lucyhleHRlcm5hbFBsdWdpbnMpXG4gICAgfVxuICB9XG5cbiAgYWRkRXh0ZXJuYWxQbHVnaW5zKHBsdWdpbnMpIHtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGZ1bmN0aW9uKHBsdWdpbikgeyByZXR1cm4gcGx1Z2luLnByb3RvdHlwZS5uYW1lIH1cbiAgICBpZiAocGx1Z2lucy5wbGF5YmFjaykgeyB0aGlzLnBsYXliYWNrUGx1Z2lucyA9IHVuaXEocGx1Z2lucy5wbGF5YmFjay5jb25jYXQodGhpcy5wbGF5YmFja1BsdWdpbnMpLCBwbHVnaW5OYW1lKSB9XG4gICAgaWYgKHBsdWdpbnMuY29udGFpbmVyKSB7IHRoaXMuY29udGFpbmVyUGx1Z2lucyA9IHVuaXEocGx1Z2lucy5jb250YWluZXIuY29uY2F0KHRoaXMuY29udGFpbmVyUGx1Z2lucyksIHBsdWdpbk5hbWUpIH1cbiAgICBpZiAocGx1Z2lucy5jb3JlKSB7IHRoaXMuY29yZVBsdWdpbnMgPSB1bmlxKHBsdWdpbnMuY29yZS5jb25jYXQodGhpcy5jb3JlUGx1Z2lucyksIHBsdWdpbk5hbWUpIH1cbiAgICBQbGF5ZXJJbmZvLnBsYXliYWNrUGx1Z2lucyA9IHRoaXMucGxheWJhY2tQbHVnaW5zXG4gIH1cblxuICBnZXRQbHVnaW4obmFtZSkge1xuICAgIHZhciBhbGxQbHVnaW5zID0gdGhpcy5jb250YWluZXJQbHVnaW5zLmNvbmNhdCh0aGlzLnBsYXliYWNrUGx1Z2lucykuY29uY2F0KHRoaXMuY29yZVBsdWdpbnMpXG4gICAgcmV0dXJuIGFsbFBsdWdpbnMuZmluZCgocGx1Z2luKSA9PiB7IHJldHVybiBwbHVnaW4ucHJvdG90eXBlLm5hbWUgPT09IG5hbWUgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogVGhlIE1lZGlhQ29udHJvbCBpcyByZXNwb25zaWJsZSBmb3IgZGlzcGxheWluZyB0aGUgUGxheWVyIGNvbnRyb2xzLlxuICovXG5cbnZhciAkID0gcmVxdWlyZSgnemVwdG8nKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgVUlPYmplY3QgPSByZXF1aXJlKCd1aV9vYmplY3QnKVxudmFyIFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJ2Jyb3dzZXInKVxudmFyIFNlZWtUaW1lID0gcmVxdWlyZSgnLi4vc2Vla190aW1lJylcbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJ21lZGlhdG9yJylcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgncGxheWVyX2luZm8nKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG52YXIgS2libyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uva2libycpXG5cbmNsYXNzIE1lZGlhQ29udHJvbCBleHRlbmRzIFVJT2JqZWN0IHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnTWVkaWFDb250cm9sJyB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzOiAnbWVkaWEtY29udHJvbCcsXG4gICAgICAnZGF0YS1tZWRpYS1jb250cm9sJzogJydcbiAgICB9XG4gIH1cblxuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xpY2sgW2RhdGEtcGxheV0nOiAncGxheScsXG4gICAgICAnY2xpY2sgW2RhdGEtcGF1c2VdJzogJ3BhdXNlJyxcbiAgICAgICdjbGljayBbZGF0YS1wbGF5cGF1c2VdJzogJ3RvZ2dsZVBsYXlQYXVzZScsXG4gICAgICAnY2xpY2sgW2RhdGEtc3RvcF0nOiAnc3RvcCcsXG4gICAgICAnY2xpY2sgW2RhdGEtcGxheXN0b3BdJzogJ3RvZ2dsZVBsYXlTdG9wJyxcbiAgICAgICdjbGljayBbZGF0YS1mdWxsc2NyZWVuXSc6ICd0b2dnbGVGdWxsc2NyZWVuJyxcbiAgICAgICdjbGljayAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdJzogJ3NlZWsnLFxuICAgICAgJ2NsaWNrIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSc6ICd2b2x1bWUnLFxuICAgICAgJ2NsaWNrIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV0nOiAndG9nZ2xlTXV0ZScsXG4gICAgICAnbW91c2VlbnRlciAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0nOiAnc2hvd1ZvbHVtZUJhcicsXG4gICAgICAnbW91c2VsZWF2ZSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0nOiAnaGlkZVZvbHVtZUJhcicsXG4gICAgICAnbW91c2Vkb3duIC5iYXItc2NydWJiZXJbZGF0YS12b2x1bWVdJzogJ3N0YXJ0Vm9sdW1lRHJhZycsXG4gICAgICAnbW91c2Vkb3duIC5iYXItc2NydWJiZXJbZGF0YS1zZWVrYmFyXSc6ICdzdGFydFNlZWtEcmFnJyxcbiAgICAgICdtb3VzZW1vdmUgLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSc6ICdtb3VzZW1vdmVPblNlZWtCYXInLFxuICAgICAgJ21vdXNlbGVhdmUgLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSc6ICdtb3VzZWxlYXZlT25TZWVrQmFyJyxcbiAgICAgICdtb3VzZWVudGVyIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdJzogJ3NldEtlZXBWaXNpYmxlJyxcbiAgICAgICdtb3VzZWxlYXZlIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdJzogJ3Jlc2V0S2VlcFZpc2libGUnXG4gICAgfVxuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULm1lZGlhX2NvbnRyb2wgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMua2libyA9IG5ldyBLaWJvKClcbiAgICB0aGlzLnNlZWtUaW1lID0gbmV3IFNlZWtUaW1lKHRoaXMpXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMubXV0ZSA9IHRoaXMub3B0aW9ucy5tdXRlXG4gICAgdGhpcy5wZXJzaXN0Q29uZmlnID0gdGhpcy5vcHRpb25zLnBlcnNpc3RDb25maWdcbiAgICB0aGlzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG4gICAgdmFyIGluaXRpYWxWb2x1bWUgPSAodGhpcy5wZXJzaXN0Q29uZmlnKSA/IFV0aWxzLkNvbmZpZy5yZXN0b3JlKFwidm9sdW1lXCIpIDogMTAwO1xuICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMubXV0ZSA/IDAgOiBpbml0aWFsVm9sdW1lKVxuICAgIHRoaXMua2VlcFZpc2libGUgPSBmYWxzZVxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICBsZWZ0OiBbJ3BsYXknLCAnc3RvcCcsICdwYXVzZSddLFxuICAgICAgcmlnaHQ6IFsndm9sdW1lJ10sXG4gICAgICBkZWZhdWx0OiBbJ3Bvc2l0aW9uJywgJ3NlZWtiYXInLCAnZHVyYXRpb24nXVxuICAgIH1cbiAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmtleXModGhpcy5jb250YWluZXIuc2V0dGluZ3MpLmxlbmd0aCA9PT0gMCA/IHRoaXMuc2V0dGluZ3MgOiB0aGlzLmNvbnRhaW5lci5zZXR0aW5nc1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgIGlmICh0aGlzLmNvbnRhaW5lci5tZWRpYUNvbnRyb2xEaXNhYmxlZCB8fCB0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9XG4gICAgJChkb2N1bWVudCkuYmluZCgnbW91c2V1cCcsIChldmVudCkgPT4gdGhpcy5zdG9wRHJhZyhldmVudCkpXG4gICAgJChkb2N1bWVudCkuYmluZCgnbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB0aGlzLnVwZGF0ZURyYWcoZXZlbnQpKVxuICAgIE1lZGlhdG9yLm9uKEV2ZW50cy5QTEFZRVJfUkVTSVpFLCAoKSA9PiB0aGlzLnBsYXllclJlc2l6ZSgpKVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFLCB0aGlzLnVwZGF0ZVNlZWtCYXIpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QUk9HUkVTUywgdGhpcy51cGRhdGVQcm9ncmVzc0JhcilcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NFVFRJTkdTVVBEQVRFLCB0aGlzLnNldHRpbmdzVXBkYXRlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQsIHRoaXMuc2V0dGluZ3NVcGRhdGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9ISUdIREVGSU5JVElPTlVQREFURSwgdGhpcy5oaWdoRGVmaW5pdGlvblVwZGF0ZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9ESVNBQkxFLCB0aGlzLmRpc2FibGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRU5BQkxFLCB0aGlzLmVuYWJsZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0VOREVELCB0aGlzLmVuZGVkKVxuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgIHRoaXMuaGlkZSgpXG4gICAgdGhpcy4kZWwuaGlkZSgpXG4gIH1cblxuICBlbmFibGUoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jaHJvbWVsZXNzKSByZXR1cm5cbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICB0aGlzLnNob3coKVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5wbGF5KClcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuY29udGFpbmVyLnBhdXNlKClcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5jb250YWluZXIuc3RvcCgpXG4gIH1cblxuICBjaGFuZ2VUb2dnbGVQbGF5KCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkge1xuICAgICAgdGhpcy4kcGxheVBhdXNlVG9nZ2xlLnJlbW92ZUNsYXNzKCdwYXVzZWQnKS5hZGRDbGFzcygncGxheWluZycpXG4gICAgICB0aGlzLiRwbGF5U3RvcFRvZ2dsZS5yZW1vdmVDbGFzcygnc3RvcHBlZCcpLmFkZENsYXNzKCdwbGF5aW5nJylcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX1BMQVlJTkcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRwbGF5UGF1c2VUb2dnbGUucmVtb3ZlQ2xhc3MoJ3BsYXlpbmcnKS5hZGRDbGFzcygncGF1c2VkJylcbiAgICAgIHRoaXMuJHBsYXlTdG9wVG9nZ2xlLnJlbW92ZUNsYXNzKCdwbGF5aW5nJykuYWRkQ2xhc3MoJ3N0b3BwZWQnKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfTk9UUExBWUlORyk7XG4gICAgfVxuICB9XG5cbiAgbW91c2Vtb3ZlT25TZWVrQmFyKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLnNldHRpbmdzLnNlZWtFbmFibGVkKSB7XG4gICAgICB2YXIgb2Zmc2V0WCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy4kc2Vla0JhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0IC0gKHRoaXMuJHNlZWtCYXJIb3Zlci53aWR0aCgpIC8gMilcbiAgICAgIHRoaXMuJHNlZWtCYXJIb3Zlci5jc3Moe2xlZnQ6IG9mZnNldFh9KVxuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9NT1VTRU1PVkVfU0VFS0JBUiwgZXZlbnQpO1xuICB9XG5cbiAgbW91c2VsZWF2ZU9uU2Vla0JhcihldmVudCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX01PVVNFTEVBVkVfU0VFS0JBUiwgZXZlbnQpO1xuICB9XG5cbiAgcGxheWVyUmVzaXplKCkge1xuICAgIGlmIChVdGlscy5GdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpKSB7XG4gICAgICB0aGlzLiRmdWxsc2NyZWVuVG9nZ2xlLmFkZENsYXNzKCdzaHJpbmsnKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRmdWxsc2NyZWVuVG9nZ2xlLnJlbW92ZUNsYXNzKCdzaHJpbmsnKVxuICAgIH1cbiAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygndzMyMCcpXG4gICAgaWYgKFBsYXllckluZm8uY3VycmVudFNpemUud2lkdGggPD0gMzIwIHx8IHRoaXMub3B0aW9ucy5oaWRlVm9sdW1lQmFyKSB7XG4gICAgICB0aGlzLiRlbC5hZGRDbGFzcygndzMyMCcpXG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUGxheVBhdXNlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkge1xuICAgICAgdGhpcy5jb250YWluZXIucGF1c2UoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5wbGF5KClcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KClcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHRvZ2dsZVBsYXlTdG9wKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkge1xuICAgICAgdGhpcy5jb250YWluZXIuc3RvcCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnBsYXkoKVxuICAgIH1cbiAgICB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkoKVxuICB9XG5cbiAgc3RhcnRTZWVrRHJhZyhldmVudCkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIuc2V0dGluZ3Muc2Vla0VuYWJsZWQpIHJldHVyblxuICAgIHRoaXMuZHJhZ2dpbmdTZWVrQmFyID0gdHJ1ZVxuICAgIHRoaXMuJGVsLmFkZENsYXNzKCdkcmFnZ2luZycpXG4gICAgdGhpcy4kc2Vla0JhckxvYWRlZC5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbi5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlci5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0Vm9sdW1lRHJhZyhldmVudCkge1xuICAgIHRoaXMuZHJhZ2dpbmdWb2x1bWVCYXIgPSB0cnVlXG4gICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2RyYWdnaW5nJylcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICBzdG9wRHJhZyhldmVudCkge1xuICAgIGlmICh0aGlzLmRyYWdnaW5nU2Vla0Jhcikge1xuICAgICAgdGhpcy5zZWVrKGV2ZW50KVxuICAgIH1cbiAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKVxuICAgIHRoaXMuJHNlZWtCYXJMb2FkZWQucmVtb3ZlQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24ucmVtb3ZlQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB0aGlzLiRzZWVrQmFyU2NydWJiZXIucmVtb3ZlQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uIGRyYWdnaW5nJylcbiAgICB0aGlzLmRyYWdnaW5nU2Vla0JhciA9IGZhbHNlXG4gICAgdGhpcy5kcmFnZ2luZ1ZvbHVtZUJhciA9IGZhbHNlXG4gIH1cblxuICB1cGRhdGVEcmFnKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICAgIGlmICh0aGlzLmRyYWdnaW5nU2Vla0Jhcikge1xuICAgICAgdmFyIG9mZnNldFggPSBldmVudC5wYWdlWCAtIHRoaXMuJHNlZWtCYXJDb250YWluZXIub2Zmc2V0KCkubGVmdFxuICAgICAgdmFyIHBvcyA9IG9mZnNldFggLyB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLndpZHRoKCkgKiAxMDBcbiAgICAgIHBvcyA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgocG9zLCAwKSlcbiAgICAgIHRoaXMuc2V0U2Vla1BlcmNlbnRhZ2UocG9zKVxuICAgIH0gZWxzZSBpZiAodGhpcy5kcmFnZ2luZ1ZvbHVtZUJhcikge1xuICAgICAgdGhpcy52b2x1bWUoZXZlbnQpXG4gICAgfVxuICB9XG5cbiAgdm9sdW1lKGV2ZW50KSB7XG4gICAgdmFyIG9mZnNldFkgPSBldmVudC5wYWdlWCAtIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0XG4gICAgdmFyIHZvbHVtZUZyb21VSSA9IChvZmZzZXRZIC8gdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLndpZHRoKCkpICogMTAwXG4gICAgdGhpcy5zZXRWb2x1bWUodm9sdW1lRnJvbVVJKVxuICB9XG5cbiAgdG9nZ2xlTXV0ZSgpIHtcbiAgICBpZiAodGhpcy5tdXRlKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50Vm9sdW1lIDw9IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50Vm9sdW1lID0gMTAwXG4gICAgICB9XG4gICAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmN1cnJlbnRWb2x1bWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0Vm9sdW1lKDApXG4gICAgfVxuICB9XG5cbiAgc2V0Vm9sdW1lKHZhbHVlKSB7XG4gICAgdGhpcy5jdXJyZW50Vm9sdW1lID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heCh2YWx1ZSwgMCkpXG4gICAgdGhpcy5jb250YWluZXIuc2V0Vm9sdW1lKHRoaXMuY3VycmVudFZvbHVtZSlcbiAgICB0aGlzLnNldFZvbHVtZUxldmVsKHRoaXMuY3VycmVudFZvbHVtZSlcbiAgICB0aGlzLm11dGUgPSB0aGlzLmN1cnJlbnRWb2x1bWUgPT09IDBcbiAgICB0aGlzLnBlcnNpc3RDb25maWcgJiYgVXRpbHMuQ29uZmlnLnBlcnNpc3QoXCJ2b2x1bWVcIiwgdGhpcy5jdXJyZW50Vm9sdW1lKVxuICB9XG5cbiAgdG9nZ2xlRnVsbHNjcmVlbigpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9GVUxMU0NSRUVOLCB0aGlzLm5hbWUpXG4gICAgdGhpcy5jb250YWluZXIuZnVsbHNjcmVlbigpXG4gICAgdGhpcy5yZXNldEtlZXBWaXNpYmxlKClcbiAgfVxuXG4gIHNldENvbnRhaW5lcihjb250YWluZXIpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcodGhpcy5jb250YWluZXIpXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXJcbiAgICB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkoKVxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIHRoaXMuc2V0dGluZ3NVcGRhdGUoKVxuICAgIHRoaXMuY29udGFpbmVyLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCwgdGhpcy5jb250YWluZXIuaXNEdnJJblVzZSgpKVxuICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMuY3VycmVudFZvbHVtZSlcbiAgICBpZiAodGhpcy5jb250YWluZXIubWVkaWFDb250cm9sRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZGlzYWJsZSgpXG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX0NPTlRBSU5FUkNIQU5HRUQpXG4gIH1cblxuICBzaG93Vm9sdW1lQmFyKCkge1xuICAgIGlmICh0aGlzLmhpZGVWb2x1bWVJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVZvbHVtZUlkKVxuICAgIH1cbiAgICB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3ZvbHVtZS1iYXItaGlkZScpXG4gIH1cblxuICBoaWRlVm9sdW1lQmFyKCkge1xuICAgIHZhciB0aW1lb3V0ID0gNDAwXG4gICAgaWYgKCF0aGlzLiR2b2x1bWVCYXJDb250YWluZXIpIHJldHVyblxuICAgIGlmICh0aGlzLmRyYWdnaW5nVm9sdW1lQmFyKSB7XG4gICAgICB0aGlzLmhpZGVWb2x1bWVJZCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlVm9sdW1lQmFyKCksIHRpbWVvdXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmhpZGVWb2x1bWVJZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlVm9sdW1lSWQpXG4gICAgICB9XG4gICAgICB0aGlzLmhpZGVWb2x1bWVJZCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLmFkZENsYXNzKCd2b2x1bWUtYmFyLWhpZGUnKSwgdGltZW91dClcbiAgICB9XG4gIH1cblxuICBlbmRlZCgpIHtcbiAgICB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkoKVxuICB9XG5cbiAgdXBkYXRlUHJvZ3Jlc3NCYXIoc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24sIGR1cmF0aW9uKSB7XG4gICAgdmFyIGxvYWRlZFN0YXJ0ID0gc3RhcnRQb3NpdGlvbiAvIGR1cmF0aW9uICogMTAwXG4gICAgdmFyIGxvYWRlZEVuZCA9IGVuZFBvc2l0aW9uIC8gZHVyYXRpb24gKiAxMDBcbiAgICB0aGlzLiRzZWVrQmFyTG9hZGVkLmNzcyh7IGxlZnQ6IGxvYWRlZFN0YXJ0ICsgJyUnLCB3aWR0aDogKGxvYWRlZEVuZCAtIGxvYWRlZFN0YXJ0KSArICclJyB9KVxuICB9XG5cbiAgdXBkYXRlU2Vla0Jhcihwb3NpdGlvbiwgZHVyYXRpb24pIHtcbiAgICBpZiAodGhpcy5kcmFnZ2luZ1NlZWtCYXIpIHJldHVyblxuICAgIGlmIChwb3NpdGlvbiA8IDApIHBvc2l0aW9uID0gZHVyYXRpb25cbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24ucmVtb3ZlQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB0aGlzLiRzZWVrQmFyU2NydWJiZXIucmVtb3ZlQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB2YXIgc2Vla2JhclZhbHVlID0gKDEwMCAvIGR1cmF0aW9uKSAqIHBvc2l0aW9uXG4gICAgdGhpcy5zZXRTZWVrUGVyY2VudGFnZShzZWVrYmFyVmFsdWUpXG4gICAgdGhpcy4kKCdbZGF0YS1wb3NpdGlvbl0nKS5odG1sKFV0aWxzLmZvcm1hdFRpbWUocG9zaXRpb24pKVxuICAgIHRoaXMuJCgnW2RhdGEtZHVyYXRpb25dJykuaHRtbChVdGlscy5mb3JtYXRUaW1lKGR1cmF0aW9uKSlcbiAgfVxuXG4gIHNlZWsoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyLnNldHRpbmdzLnNlZWtFbmFibGVkKSByZXR1cm5cbiAgICB2YXIgb2Zmc2V0WCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy4kc2Vla0JhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0XG4gICAgdmFyIHBvcyA9IG9mZnNldFggLyB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLndpZHRoKCkgKiAxMDBcbiAgICBwb3MgPSBNYXRoLm1pbigxMDAsIE1hdGgubWF4KHBvcywgMCkpXG4gICAgdGhpcy5jb250YWluZXIuc2V0Q3VycmVudFRpbWUocG9zKVxuICAgIHRoaXMuc2V0U2Vla1BlcmNlbnRhZ2UocG9zKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgc2V0S2VlcFZpc2libGUoKSB7XG4gICAgdGhpcy5rZWVwVmlzaWJsZSA9IHRydWVcbiAgfVxuXG4gIHJlc2V0S2VlcFZpc2libGUoKSB7XG4gICAgdGhpcy5rZWVwVmlzaWJsZSA9IGZhbHNlXG4gIH1cblxuICBpc1Zpc2libGUoKSB7XG4gICAgcmV0dXJuICF0aGlzLiRlbC5oYXNDbGFzcygnbWVkaWEtY29udHJvbC1oaWRlJylcbiAgfVxuXG4gIHNob3coZXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuXG4gICAgdmFyIHRpbWVvdXQgPSAyMDAwXG4gICAgaWYgKCFldmVudCB8fCAoZXZlbnQuY2xpZW50WCAhPT0gdGhpcy5sYXN0TW91c2VYICYmIGV2ZW50LmNsaWVudFkgIT09IHRoaXMubGFzdE1vdXNlWSkgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvZmlyZWZveC9pKSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZUlkKVxuICAgICAgdGhpcy4kZWwuc2hvdygpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9TSE9XLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1oaWRlJylcbiAgICAgIHRoaXMuaGlkZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGltZW91dClcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICB0aGlzLmxhc3RNb3VzZVggPSBldmVudC5jbGllbnRYXG4gICAgICAgIHRoaXMubGFzdE1vdXNlWSA9IGV2ZW50LmNsaWVudFlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHZhciB0aW1lb3V0ID0gMjAwMFxuICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVJZClcbiAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKCkgfHwgdGhpcy5vcHRpb25zLmhpZGVNZWRpYUNvbnRyb2wgPT09IGZhbHNlKSByZXR1cm5cbiAgICBpZiAodGhpcy5rZWVwVmlzaWJsZSB8fCB0aGlzLmRyYWdnaW5nU2Vla0JhciB8fCB0aGlzLmRyYWdnaW5nVm9sdW1lQmFyKSB7XG4gICAgICB0aGlzLmhpZGVJZCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlKCksIHRpbWVvdXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX0hJREUsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLWhpZGUnKVxuICAgICAgdGhpcy5oaWRlVm9sdW1lQmFyKClcbiAgICB9XG4gIH1cblxuICBzZXR0aW5nc1VwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuZ2V0UGxheWJhY2tUeXBlKCkgIT09IG51bGwgJiYgT2JqZWN0LmtleXModGhpcy5jb250YWluZXIuc2V0dGluZ3MpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuY29udGFpbmVyLnNldHRpbmdzXG4gICAgICB0aGlzLnJlbmRlcigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzYWJsZSgpXG4gICAgfVxuICB9XG5cbiAgaGlnaERlZmluaXRpb25VcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLmlzSGlnaERlZmluaXRpb25JblVzZSgpKSB7XG4gICAgICB0aGlzLiRlbC5maW5kKCdidXR0b25bZGF0YS1oZC1pbmRpY2F0b3JdJykuYWRkQ2xhc3MoXCJlbmFibGVkXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsLmZpbmQoJ2J1dHRvbltkYXRhLWhkLWluZGljYXRvcl0nKS5yZW1vdmVDbGFzcyhcImVuYWJsZWRcIilcbiAgICB9XG4gIH1cblxuICBjcmVhdGVDYWNoZWRFbGVtZW50cygpIHtcbiAgICB0aGlzLiRwbGF5UGF1c2VUb2dnbGUgPSB0aGlzLiRlbC5maW5kKCdidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5cGF1c2VdJylcbiAgICB0aGlzLiRwbGF5U3RvcFRvZ2dsZSA9IHRoaXMuJGVsLmZpbmQoJ2J1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlzdG9wXScpXG4gICAgdGhpcy4kZnVsbHNjcmVlblRvZ2dsZSA9IHRoaXMuJGVsLmZpbmQoJ2J1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWZ1bGxzY3JlZW5dJylcbiAgICB0aGlzLiRzZWVrQmFyQ29udGFpbmVyID0gdGhpcy4kZWwuZmluZCgnLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXScpXG4gICAgdGhpcy4kc2Vla0JhckxvYWRlZCA9IHRoaXMuJGVsLmZpbmQoJy5iYXItZmlsbC0xW2RhdGEtc2Vla2Jhcl0nKVxuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbiA9IHRoaXMuJGVsLmZpbmQoJy5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl0nKVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlciA9IHRoaXMuJGVsLmZpbmQoJy5iYXItc2NydWJiZXJbZGF0YS1zZWVrYmFyXScpXG4gICAgdGhpcy4kc2Vla0JhckhvdmVyID0gdGhpcy4kZWwuZmluZCgnLmJhci1ob3ZlcltkYXRhLXNlZWtiYXJdJylcbiAgICB0aGlzLiR2b2x1bWVDb250YWluZXIgPSB0aGlzLiRlbC5maW5kKCcuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0nKVxuICAgIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lciA9IHRoaXMuJGVsLmZpbmQoJy5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXScpXG4gICAgdGhpcy4kdm9sdW1lSWNvbiA9IHRoaXMuJGVsLmZpbmQoJy5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV0nKVxuICB9XG5cbiAgc2V0Vm9sdW1lTGV2ZWwodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyLmlzUmVhZHkgfHwgIXRoaXMuJHZvbHVtZUJhckNvbnRhaW5lcikge1xuICAgICAgdGhpcy5saXN0ZW5Ub09uY2UodGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUkVBRFksICgpID0+IHRoaXMuc2V0Vm9sdW1lTGV2ZWwodmFsdWUpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIuZmluZCgnLnNlZ21lbnRlZC1iYXItZWxlbWVudCcpLnJlbW92ZUNsYXNzKCdmaWxsJylcbiAgICAgIHZhciBpdGVtID0gTWF0aC5jZWlsKHZhbHVlIC8gMTAuMClcbiAgICAgIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci5maW5kKCcuc2VnbWVudGVkLWJhci1lbGVtZW50Jykuc2xpY2UoMCwgaXRlbSkuYWRkQ2xhc3MoJ2ZpbGwnKVxuICAgICAgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICB0aGlzLiR2b2x1bWVJY29uLnJlbW92ZUNsYXNzKCdtdXRlZCcpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiR2b2x1bWVJY29uLmFkZENsYXNzKCdtdXRlZCcpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0U2Vla1BlcmNlbnRhZ2UodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPiAxMDApIHJldHVyblxuICAgIHZhciBwb3MgPSB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLndpZHRoKCkgKiB2YWx1ZSAvIDEwMC4wIC0gKHRoaXMuJHNlZWtCYXJTY3J1YmJlci53aWR0aCgpIC8gMi4wKVxuICAgIHRoaXMuY3VycmVudFNlZWtQZXJjZW50YWdlID0gdmFsdWU7XG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uLmNzcyh7IHdpZHRoOiB2YWx1ZSArICclJyB9KVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlci5jc3MoeyBsZWZ0OiBwb3MgfSlcbiAgfVxuXG4gIGJpbmRLZXlFdmVudHMoKSB7XG4gICAgdGhpcy5raWJvLmRvd24oWydzcGFjZSddLCAoKSA9PiB0aGlzLnRvZ2dsZVBsYXlQYXVzZSgpKVxuICB9XG5cbiAgdW5iaW5kS2V5RXZlbnRzKCkge1xuICAgIHRoaXMua2liby5vZmYoJ3NwYWNlJylcbiAgfVxuXG4gIHBhcnNlQ29sb3JzKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMubWVkaWFjb250cm9sKSB7XG4gICAgICB2YXIgYnV0dG9uc0NvbG9yID0gdGhpcy5vcHRpb25zLm1lZGlhY29udHJvbC5idXR0b25zO1xuICAgICAgdmFyIHNlZWtiYXJDb2xvciA9IHRoaXMub3B0aW9ucy5tZWRpYWNvbnRyb2wuc2Vla2JhcjtcbiAgICAgIHRoaXMuJGVsLmZpbmQoJy5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl0nKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBzZWVrYmFyQ29sb3IpXG4gICAgICB0aGlzLiRlbC5maW5kKCdbZGF0YS1tZWRpYS1jb250cm9sXSA+IC5tZWRpYS1jb250cm9sLWljb24sIC5kcmF3ZXItaWNvbicpLmNzcygnY29sb3InLCBidXR0b25zQ29sb3IpXG4gICAgICB0aGlzLiRlbC5maW5kKCcuc2VnbWVudGVkLWJhci1lbGVtZW50W2RhdGEtdm9sdW1lXScpLmNzcygnYm94U2hhZG93JywgXCJpbnNldCAycHggMCAwIFwiICsgYnV0dG9uc0NvbG9yKVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgJChkb2N1bWVudCkudW5iaW5kKCdtb3VzZXVwJylcbiAgICAkKGRvY3VtZW50KS51bmJpbmQoJ21vdXNlbW92ZScpXG4gICAgdGhpcy51bmJpbmRLZXlFdmVudHMoKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciB0aW1lb3V0ID0gMTAwMFxuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcignbWVkaWFfY29udHJvbCcsIHtiYXNlVXJsOiB0aGlzLm9wdGlvbnMuYmFzZVVybH0pO1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7IHNldHRpbmdzOiB0aGlzLnNldHRpbmdzIH0pKVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICB0aGlzLmNyZWF0ZUNhY2hlZEVsZW1lbnRzKClcbiAgICB0aGlzLiRwbGF5UGF1c2VUb2dnbGUuYWRkQ2xhc3MoJ3BhdXNlZCcpXG4gICAgdGhpcy4kcGxheVN0b3BUb2dnbGUuYWRkQ2xhc3MoJ3N0b3BwZWQnKVxuXG4gICAgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KClcbiAgICB0aGlzLmhpZGVJZCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlKCksIHRpbWVvdXQpXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuaGlkZSgpXG4gICAgfVxuXG4gICAgaWYoQnJvd3Nlci5pc1NhZmFyaSAmJiBCcm93c2VyLmlzTW9iaWxlKSB7XG4gICAgICB0aGlzLiR2b2x1bWVDb250YWluZXIuY3NzKCdkaXNwbGF5Jywnbm9uZScpXG4gICAgfVxuXG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG5cbiAgICBpZiAoIXRoaXMuY3VycmVudFNlZWtQZXJjZW50YWdlKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTZWVrUGVyY2VudGFnZSA9IDBcbiAgICB9XG4gICAgdGhpcy5zZXRTZWVrUGVyY2VudGFnZSh0aGlzLmN1cnJlbnRTZWVrUGVyY2VudGFnZSlcblxuICAgIHRoaXMuJGVsLnJlYWR5KCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5jb250YWluZXIuc2V0dGluZ3Muc2Vla0VuYWJsZWQpIHtcbiAgICAgICAgdGhpcy4kc2Vla0JhckNvbnRhaW5lci5hZGRDbGFzcygnc2Vlay1kaXNhYmxlZCcpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMuY3VycmVudFZvbHVtZSlcbiAgICAgIHRoaXMuYmluZEtleUV2ZW50cygpXG4gICAgICB0aGlzLmhpZGVWb2x1bWVCYXIoKVxuICAgIH0pXG5cbiAgICB0aGlzLnBhcnNlQ29sb3JzKClcbiAgICB0aGlzLnNlZWtUaW1lLnJlbmRlcigpXG4gICAgdGhpcy5oaWdoRGVmaW5pdGlvblVwZGF0ZSgpXG5cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9SRU5ERVJFRClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWVkaWFDb250cm9sXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0JylcbnZhciBDb3JlRmFjdG9yeSA9IHJlcXVpcmUoJy4vY29yZV9mYWN0b3J5JylcbnZhciBMb2FkZXIgPSByZXF1aXJlKCcuL2xvYWRlcicpXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgUGxheWVySW5mbyA9IHJlcXVpcmUoJ3BsYXllcl9pbmZvJylcblxuY2xhc3MgUGxheWVyIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHdpbmRvdy5wID0gdGhpc1xuICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtwZXJzaXN0Q29uZmlnOiB0cnVlLCB3aWR0aDogNjQwLCBoZWlnaHQ6IDM2MCwgYmFzZVVybDogJ2h0dHA6Ly9jZG4uY2xhcHByLmlvL2xhdGVzdCd9XG4gICAgdGhpcy5vcHRpb25zID0gYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKVxuICAgIHRoaXMub3B0aW9ucy5zb3VyY2VzID0gdGhpcy5ub3JtYWxpemVTb3VyY2VzKG9wdGlvbnMpXG4gICAgdGhpcy5sb2FkZXIgPSBuZXcgTG9hZGVyKHRoaXMub3B0aW9ucy5wbHVnaW5zIHx8IHt9KVxuICAgIHRoaXMuY29yZUZhY3RvcnkgPSBuZXcgQ29yZUZhY3RvcnkodGhpcywgdGhpcy5sb2FkZXIpXG4gICAgUGxheWVySW5mby5jdXJyZW50U2l6ZSA9IHt3aWR0aDogb3B0aW9ucy53aWR0aCwgaGVpZ2h0OiBvcHRpb25zLmhlaWdodH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnBhcmVudElkKSB7XG4gICAgICB0aGlzLnNldFBhcmVudElkKHRoaXMub3B0aW9ucy5wYXJlbnRJZClcbiAgICB9XG4gIH1cblxuICBzZXRQYXJlbnRJZChwYXJlbnRJZCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyZW50SWQpXG4gICAgaWYgKGVsKSB7XG4gICAgICB0aGlzLmF0dGFjaFRvKGVsKVxuICAgIH1cbiAgfVxuXG4gIGF0dGFjaFRvKGVsZW1lbnQpIHtcbiAgICB0aGlzLm9wdGlvbnMucGFyZW50RWxlbWVudCA9IGVsZW1lbnRcbiAgICB0aGlzLmNvcmUgPSB0aGlzLmNvcmVGYWN0b3J5LmNyZWF0ZSgpXG4gIH1cblxuICBpcyh2YWx1ZSwgdHlwZSkge1xuICAgIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gdHlwZVxuICB9XG5cbiAgbm9ybWFsaXplU291cmNlcyhvcHRpb25zKSB7XG4gICAgdmFyIHNvdXJjZXMgPSBvcHRpb25zLnNvdXJjZXMgfHwgKG9wdGlvbnMuc291cmNlICE9PSB1bmRlZmluZWQ/IFtvcHRpb25zLnNvdXJjZS50b1N0cmluZygpXSA6IFtdKVxuICAgIHJldHVybiBzb3VyY2VzLmxlbmd0aCA9PT0gMCA/IFsnbm8ub3AnXSA6IHNvdXJjZXNcbiAgfVxuXG4gIHJlc2l6ZShzaXplKSB7XG4gICAgdGhpcy5jb3JlLnJlc2l6ZShzaXplKTtcbiAgfVxuXG4gIGxvYWQoc291cmNlcykge1xuICAgIHRoaXMuY29yZS5sb2FkKHNvdXJjZXMpXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuY29yZS5kZXN0cm95KClcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIucGxheSgpO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIucGF1c2UoKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc3RvcCgpO1xuICB9XG5cbiAgc2Vlayh0aW1lKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc2V0Q3VycmVudFRpbWUodGltZSk7XG4gIH1cblxuICBzZXRWb2x1bWUodm9sdW1lKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XG4gIH1cblxuICBtdXRlKCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldFZvbHVtZSgwKTtcbiAgfVxuXG4gIHVubXV0ZSgpIHtcbiAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5zZXRWb2x1bWUoMTAwKTtcbiAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuaXNQbGF5aW5nKCk7XG4gIH1cblxuICBnZXRDb250YWluZXJQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5nZXRQbHVnaW4obmFtZSlcbiAgfVxuXG4gIGdldENvcmVQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiB0aGlzLmNvcmUuZ2V0UGx1Z2luKG5hbWUpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NlZWtfdGltZScpO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgndWlfb2JqZWN0JylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIGZvcm1hdFRpbWUgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykuZm9ybWF0VGltZVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNsYXNzIFNlZWtUaW1lIGV4dGVuZHMgVUlPYmplY3Qge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdzZWVrX3RpbWUnIH1cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBKU1Quc2Vla190aW1lO1xuICB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAnc2Vlay10aW1lIGhpZGRlbicsXG4gICAgICAnZGF0YS1zZWVrLXRpbWUnOiAnJ1xuICAgIH07XG4gIH1cbiAgY29uc3RydWN0b3IobWVkaWFDb250cm9sKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMubWVkaWFDb250cm9sID0gbWVkaWFDb250cm9sXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpXG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX01PVVNFTU9WRV9TRUVLQkFSLCB0aGlzLnNob3dUaW1lKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5tZWRpYUNvbnRyb2wsIEV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VMRUFWRV9TRUVLQkFSLCB0aGlzLmhpZGVUaW1lKVxuICB9XG5cbiAgc2hvd1RpbWUoZXZlbnQpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZXZlbnQucGFnZVggLSB0aGlzLm1lZGlhQ29udHJvbC4kc2Vla0JhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0XG4gICAgdmFyIHRpbWVQb3NpdGlvbiA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoKG9mZnNldCkgLyB0aGlzLm1lZGlhQ29udHJvbC4kc2Vla0JhckNvbnRhaW5lci53aWR0aCgpICogMTAwLCAwKSlcbiAgICB2YXIgcG9pbnRlclBvc2l0aW9uID0gZXZlbnQucGFnZVggLSB0aGlzLm1lZGlhQ29udHJvbC4kZWwub2Zmc2V0KCkubGVmdFxuICAgIHBvaW50ZXJQb3NpdGlvbiA9IE1hdGgubWluKE1hdGgubWF4KDAsIHBvaW50ZXJQb3NpdGlvbiksIHRoaXMubWVkaWFDb250cm9sLiRlbC53aWR0aCgpIC0gdGhpcy4kZWwud2lkdGgoKSlcbiAgICB2YXIgY3VycmVudFRpbWUgPSB0aW1lUG9zaXRpb24gKiB0aGlzLm1lZGlhQ29udHJvbC5jb250YWluZXIuZ2V0RHVyYXRpb24oKSAvIDEwMFxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgdGltZXN0YW1wOiBjdXJyZW50VGltZSxcbiAgICAgIGZvcm1hdHRlZFRpbWU6IGZvcm1hdFRpbWUoY3VycmVudFRpbWUpLFxuICAgICAgcG9pbnRlclBvc2l0aW9uOiBwb2ludGVyUG9zaXRpb25cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZShvcHRpb25zKVxuICB9XG5cbiAgaGlkZVRpbWUoKSB7XG4gICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gICAgdGhpcy4kZWwuY3NzKCdsZWZ0JywgJy0xMDAlJylcbiAgfVxuXG4gIHVwZGF0ZShvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMubWVkaWFDb250cm9sLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ3ZvZCcgfHwgdGhpcy5tZWRpYUNvbnRyb2wuY29udGFpbmVyLmlzRHZySW5Vc2UoKSkge1xuICAgICAgdGhpcy4kZWwuZmluZCgnW2RhdGEtc2Vlay10aW1lXScpLnRleHQob3B0aW9ucy5mb3JtYXR0ZWRUaW1lKVxuICAgICAgdGhpcy4kZWwuY3NzKCdsZWZ0Jywgb3B0aW9ucy5wb2ludGVyUG9zaXRpb24gLSAodGhpcy4kZWwud2lkdGgoKSAvIDIpKVxuICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSk7XG4gICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSk7XG4gICAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpO1xuICAgICAgdGhpcy5tZWRpYUNvbnRyb2wuJGVsLmFwcGVuZCh0aGlzLmVsKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlZWtUaW1lO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXliYWNrID0gcmVxdWlyZSgncGxheWJhY2snKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgTWVkaWF0b3IgPSByZXF1aXJlKCdtZWRpYXRvcicpXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCd0ZW1wbGF0ZScpXG52YXIgJCA9IHJlcXVpcmUoJ3plcHRvJylcbnZhciBCcm93c2VyID0gcmVxdWlyZSgnYnJvd3NlcicpXG52YXIgc2Vla1N0cmluZ1RvU2Vjb25kcyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdXRpbHMnKS5zZWVrU3RyaW5nVG9TZWNvbmRzXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcbnZhciBLaWJvID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9raWJvJylcblxudmFyIG9iamVjdElFID0gJzxvYmplY3QgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIgaWQ9XCI8JT0gY2lkICU+XCIgY2xhc3NpZD1cImNsc2lkOmQyN2NkYjZlLWFlNmQtMTFjZi05NmI4LTQ0NDU1MzU0MDAwMFwiIGRhdGEtZmxhc2gtdm9kPVwiXCI+PHBhcmFtIG5hbWU9XCJtb3ZpZVwiIHZhbHVlPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci5zd2ZcIj4gPHBhcmFtIG5hbWU9XCJxdWFsaXR5XCIgdmFsdWU9XCJhdXRvaGlnaFwiPiA8cGFyYW0gbmFtZT1cInN3bGl2ZWNvbm5lY3RcIiB2YWx1ZT1cInRydWVcIj4gPHBhcmFtIG5hbWU9XCJhbGxvd1NjcmlwdEFjY2Vzc1wiIHZhbHVlPVwiYWx3YXlzXCI+IDxwYXJhbSBuYW1lPVwiYmdjb2xvclwiIHZhbHVlPVwiIzAwMTEyMlwiPiA8cGFyYW0gbmFtZT1cImFsbG93RnVsbFNjcmVlblwiIHZhbHVlPVwiZmFsc2VcIj4gPHBhcmFtIG5hbWU9XCJ3bW9kZVwiIHZhbHVlPVwiZ3B1XCI+IDxwYXJhbSBuYW1lPVwidGFiaW5kZXhcIiB2YWx1ZT1cIjFcIj4gPHBhcmFtIG5hbWU9Rmxhc2hWYXJzIHZhbHVlPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPlwiIC8+IDwvb2JqZWN0PidcblxuY2xhc3MgRmxhc2ggZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2ZsYXNoJyB9XG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ29iamVjdCcgfVxuICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBKU1QuZmxhc2ggfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc3JjID0gb3B0aW9ucy5zcmNcbiAgICB0aGlzLmJhc2VVcmwgPSBvcHRpb25zLmJhc2VVcmxcbiAgICB0aGlzLmF1dG9QbGF5ID0gb3B0aW9ucy5hdXRvUGxheVxuICAgIHRoaXMuc2V0dGluZ3MgPSB7ZGVmYXVsdDogWydzZWVrYmFyJ119XG4gICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gW1wicGxheXBhdXNlXCIsIFwicG9zaXRpb25cIiwgXCJkdXJhdGlvblwiXVxuICAgIHRoaXMuc2V0dGluZ3MucmlnaHQgPSBbXCJmdWxsc2NyZWVuXCIsIFwidm9sdW1lXCJdXG4gICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IHRydWVcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZVxuICAgIHRoaXMua2libyA9IG5ldyBLaWJvKClcbiAgICB0aGlzLmFkZExpc3RlbmVycygpXG4gIH1cblxuXG4gIGJvb3RzdHJhcCgpIHtcbiAgICB0aGlzLmVsLndpZHRoID0gXCIxMDAlXCJcbiAgICB0aGlzLmVsLmhlaWdodCA9IFwiMTAwJVwiXG4gICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZVxuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gJ1BMQVlJTkcnKSB7XG4gICAgICB0aGlzLmZpcnN0UGxheSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJJRExFXCJcbiAgICAgIHRoaXMuYXV0b1BsYXkgJiYgdGhpcy5wbGF5KClcbiAgICB9XG4gICAgJCgnPGRpdiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlXCIgLz4nKS5pbnNlcnRBZnRlcih0aGlzLiRlbClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLm5hbWUpXG4gIH1cblxuICBnZXRQbGF5YmFja1R5cGUoKSB7XG4gICAgcmV0dXJuICd2b2QnXG4gIH1cblxuICBzZXR1cEZpcmVmb3goKSB7XG4gICAgdmFyICRlbCA9IHRoaXMuJCgnZW1iZWQnKVxuICAgICRlbC5hdHRyKCdkYXRhLWZsYXNoJywgJycpXG4gICAgdGhpcy5zZXRFbGVtZW50KCRlbFswXSlcbiAgfVxuXG4gIGlzSGlnaERlZmluaXRpb25JblVzZSgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHVwZGF0ZVRpbWUoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aGlzLmVsLmdldFBvc2l0aW9uKCksIHRoaXMuZWwuZ2V0RHVyYXRpb24oKSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgYWRkTGlzdGVuZXJzKCkge1xuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOnByb2dyZXNzJywgdGhpcy5wcm9ncmVzcywgdGhpcylcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzp0aW1ldXBkYXRlJywgdGhpcy51cGRhdGVUaW1lLCB0aGlzKVxuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOnN0YXRlY2hhbmdlZCcsIHRoaXMuY2hlY2tTdGF0ZSwgdGhpcylcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpmbGFzaHJlYWR5JywgdGhpcy5ib290c3RyYXAsIHRoaXMpXG4gICAgWzEsMiwzLDQsNSw2LDcsOCw5XS5mb3JFYWNoKChpKSA9PiB7IHRoaXMua2liby5kb3duKGkudG9TdHJpbmcoKSwgKCkgPT4gdGhpcy5zZWVrKGkgKiAxMCkpIH0pXG4gIH1cblxuICBzdG9wTGlzdGVuaW5nKCkge1xuICAgIHN1cGVyLnN0b3BMaXN0ZW5pbmcoKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpwcm9ncmVzcycpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOnRpbWV1cGRhdGUnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpzdGF0ZWNoYW5nZWQnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpmbGFzaHJlYWR5JylcbiAgICB0aGlzLmtpYm8ub2ZmKFsxLDIsMyw0LDUsNiw3LDgsOV0pXG4gIH1cblxuICBjaGVja1N0YXRlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gXCJQQVVTRURcIikge1xuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSAhPT0gXCJQTEFZSU5HX0JVRkZFUklOR1wiICYmIHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gXCJQTEFZSU5HX0JVRkZFUklOR1wiKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdfQlVGRkVSSU5HXCJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gXCJQTEFZSU5HXCIpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgIH0gZWxzZSBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpID09PSBcIklETEVcIikge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIklETEVcIlxuICAgIH0gZWxzZSBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpID09PSBcIkVOREVEXCIpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfRU5ERUQsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5lbC5nZXREdXJhdGlvbigpLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiRU5ERURcIlxuICAgIH1cbiAgfVxuXG4gIHByb2dyZXNzKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSAhPT0gXCJJRExFXCIgJiYgdGhpcy5jdXJyZW50U3RhdGUgIT09IFwiRU5ERURcIikge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgMCwgdGhpcy5lbC5nZXRCeXRlc0xvYWRlZCgpLCB0aGlzLmVsLmdldEJ5dGVzVG90YWwoKSwgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIGZpcnN0UGxheSgpIHtcbiAgICBpZiAodGhpcy5lbC5wbGF5ZXJQbGF5KSB7XG4gICAgICB0aGlzLmVsLnBsYXllclBsYXkodGhpcy5zcmMpXG4gICAgICB0aGlzLmxpc3RlblRvT25jZSh0aGlzLCBFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgKCkgPT4gdGhpcy5jaGVja0luaXRpYWxTZWVrKCkpXG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiUExBWUlOR1wiXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdGVuVG9PbmNlKHRoaXMsIEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5maXJzdFBsYXkpXG4gICAgfVxuICB9XG5cbiAgY2hlY2tJbml0aWFsU2VlaygpIHtcbiAgICB2YXIgc2Vla1RpbWUgPSBzZWVrU3RyaW5nVG9TZWNvbmRzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgIGlmIChzZWVrVGltZSAhPT0gMCkge1xuICAgICAgdGhpcy5zZWVrU2Vjb25kcyhzZWVrVGltZSlcbiAgICB9XG4gIH1cblxuICBwbGF5KCkge1xuICAgIGlmICh0aGlzLmVsLmdldFN0YXRlKCkgPT09ICdQQVVTRUQnIHx8IHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gJ1BMQVlJTkdfQlVGRkVSSU5HJykge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgICAgdGhpcy5lbC5wbGF5ZXJSZXN1bWUoKVxuICAgIH0gZWxzZSBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpICE9PSAnUExBWUlORycpIHtcbiAgICAgIHRoaXMuZmlyc3RQbGF5KClcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZLCB0aGlzLm5hbWUpXG4gIH1cblxuICB2b2x1bWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5pc1JlYWR5KSB7XG4gICAgICB0aGlzLmVsLnBsYXllclZvbHVtZSh2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5Ub09uY2UodGhpcywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsICgpID0+IHRoaXMudm9sdW1lKHZhbHVlKSlcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiUEFVU0VEXCJcbiAgICB0aGlzLmVsLnBsYXllclBhdXNlKClcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5lbC5wbGF5ZXJTdG9wKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDAsIHRoaXMubmFtZSlcbiAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gISEodGhpcy5pc1JlYWR5ICYmIHRoaXMuY3VycmVudFN0YXRlLmluZGV4T2YoXCJQTEFZSU5HXCIpID4gLTEpXG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5nZXREdXJhdGlvbigpXG4gIH1cblxuICBzZWVrKHNlZWtCYXJWYWx1ZSkge1xuICAgIHZhciBzZWVrVG8gPSB0aGlzLmVsLmdldER1cmF0aW9uKCkgKiAoc2Vla0JhclZhbHVlIC8gMTAwKVxuICAgIHRoaXMuc2Vla1NlY29uZHMoc2Vla1RvKVxuICB9XG5cbiAgc2Vla1NlY29uZHMoc2Vla1RvKSB7XG4gICAgdGhpcy5lbC5wbGF5ZXJTZWVrKHNlZWtUbylcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHNlZWtUbywgdGhpcy5lbC5nZXREdXJhdGlvbigpLCB0aGlzLm5hbWUpXG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXRlID09PSBcIlBBVVNFRFwiKSB7XG4gICAgICB0aGlzLmVsLnBsYXllclBhdXNlKClcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5ib290c3RyYXBJZClcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICB9XG5cbiAgc2V0dXBJRSgpIHtcbiAgICB0aGlzLnNldEVsZW1lbnQoJCh0ZW1wbGF0ZShvYmplY3RJRSkoeyBjaWQ6IHRoaXMuY2lkLCBiYXNlVXJsOiB0aGlzLmJhc2VVcmwsIHBsYXliYWNrSWQ6IHRoaXMudW5pcXVlSWQgfSkpKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpXG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHsgY2lkOiB0aGlzLmNpZCwgYmFzZVVybDogdGhpcy5iYXNlVXJsLCBwbGF5YmFja0lkOiB0aGlzLnVuaXF1ZUlkIH0pKVxuICAgIGlmKEJyb3dzZXIuaXNGaXJlZm94KSB7XG4gICAgICB0aGlzLnNldHVwRmlyZWZveCgpXG4gICAgfSBlbHNlIGlmKEJyb3dzZXIuaXNMZWdhY3lJRSkge1xuICAgICAgdGhpcy5zZXR1cElFKClcbiAgICB9XG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuRmxhc2guY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlKSB7XG4gIGlmICghQnJvd3Nlci5oYXNGbGFzaCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9IGVsc2UgaWYgKCghQnJvd3Nlci5pc01vYmlsZSAmJiBCcm93c2VyLmlzRmlyZWZveCkgfHwgQnJvd3Nlci5pc0xlZ2FjeUlFKSB7XG4gICAgcmV0dXJuIChyZXNvdXJjZSAmJiByZXNvdXJjZS5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nKSAmJiAhIXJlc291cmNlLm1hdGNoKC8oLiopXFwuKG1wNHxtb3Z8ZjR2fDNncHB8M2dwKS8pXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChyZXNvdXJjZSAmJiByZXNvdXJjZS5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nKSAmJiAhIXJlc291cmNlLm1hdGNoKC8oLiopXFwuKG1vdnxmNHZ8M2dwcHwzZ3ApLylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWJhY2sgPSByZXF1aXJlKCdwbGF5YmFjaycpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2xvZGFzaC5hc3NpZ24nKVxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgndGVtcGxhdGUnKVxuXG52YXIgTWVkaWF0b3IgPSByZXF1aXJlKCdtZWRpYXRvcicpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJ2Jyb3dzZXInKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyICQgPSByZXF1aXJlKCd6ZXB0bycpXG5cbnZhciBvYmplY3RJRSA9ICc8b2JqZWN0IHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIGlkPVwiPCU9IGNpZCAlPlwiIGNsYXNzPVwiaGxzLXBsYXliYWNrXCIgY2xhc3NpZD1cImNsc2lkOmQyN2NkYjZlLWFlNmQtMTFjZi05NmI4LTQ0NDU1MzU0MDAwMFwiIGRhdGEtaGxzPVwiXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPjxwYXJhbSBuYW1lPVwibW92aWVcIiB2YWx1ZT1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9ITFNQbGF5ZXIuc3dmXCI+IDxwYXJhbSBuYW1lPVwicXVhbGl0eVwiIHZhbHVlPVwiYXV0b2hpZ2hcIj4gPHBhcmFtIG5hbWU9XCJzd2xpdmVjb25uZWN0XCIgdmFsdWU9XCJ0cnVlXCI+IDxwYXJhbSBuYW1lPVwiYWxsb3dTY3JpcHRBY2Nlc3NcIiB2YWx1ZT1cImFsd2F5c1wiPiA8cGFyYW0gbmFtZT1cImJnY29sb3JcIiB2YWx1ZT1cIiMwMDExMjJcIj4gPHBhcmFtIG5hbWU9XCJhbGxvd0Z1bGxTY3JlZW5cIiB2YWx1ZT1cImZhbHNlXCI+IDxwYXJhbSBuYW1lPVwid21vZGVcIiB2YWx1ZT1cInRyYW5zcGFyZW50XCI+IDxwYXJhbSBuYW1lPVwidGFiaW5kZXhcIiB2YWx1ZT1cIjFcIj4gPHBhcmFtIG5hbWU9Rmxhc2hWYXJzIHZhbHVlPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPlwiIC8+IDwvb2JqZWN0PidcblxuY2xhc3MgSExTIGV4dGVuZHMgUGxheWJhY2sge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdobHMnIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnb2JqZWN0JyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5obHMgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsYXNzJzogJ2hscy1wbGF5YmFjaycsXG4gICAgICAnZGF0YS1obHMnOiAnJyxcbiAgICAgICd0eXBlJzogJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyxcbiAgICAgICd3aWR0aCc6ICcxMDAlJyxcbiAgICAgICdoZWlnaHQnOiAnMTAwJSdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnNyYyA9IG9wdGlvbnMuc3JjXG4gICAgdGhpcy5iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsO1xuICAgIHRoaXMuZmx1c2hMaXZlVVJMQ2FjaGUgPSAob3B0aW9ucy5mbHVzaExpdmVVUkxDYWNoZSA9PT0gdW5kZWZpbmVkKT8gdHJ1ZTogb3B0aW9ucy5mbHVzaExpdmVVUkxDYWNoZVxuICAgIHRoaXMuY2FwTGV2ZWxUb1N0YWdlID0gKG9wdGlvbnMuY2FwTGV2ZWxUb1N0YWdlID09PSB1bmRlZmluZWQpPyBmYWxzZTogb3B0aW9ucy5jYXBMZXZlbFRvU3RhZ2VcbiAgICB0aGlzLmhpZ2hEZWZpbml0aW9uID0gZmFsc2VcbiAgICB0aGlzLmF1dG9QbGF5ID0gb3B0aW9ucy5hdXRvUGxheVxuICAgIHRoaXMuZGVmYXVsdFNldHRpbmdzID0ge1xuICAgICAgbGVmdDogW1wicGxheXN0b3BcIl0sXG4gICAgICBkZWZhdWx0OiBbJ3NlZWtiYXInXSxcbiAgICAgIHJpZ2h0OiBbXCJmdWxsc2NyZWVuXCIsIFwidm9sdW1lXCIsIFwiaGQtaW5kaWNhdG9yXCJdLFxuICAgICAgc2Vla0VuYWJsZWQ6IGZhbHNlXG4gICAgfVxuICAgIHRoaXMuc2V0dGluZ3MgPSBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdFNldHRpbmdzKVxuICAgIHRoaXMucGxheWJhY2tUeXBlID0gJ2xpdmUnXG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgYWRkTGlzdGVuZXJzKCkge1xuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOmZsYXNocmVhZHknLCAoKSA9PiB0aGlzLmJvb3RzdHJhcCgpKVxuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOnRpbWV1cGRhdGUnLCAoKSA9PiB0aGlzLnVwZGF0ZVRpbWUoKSlcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpwbGF5YmFja3N0YXRlJywgKHN0YXRlKSA9PiB0aGlzLnNldFBsYXliYWNrU3RhdGUoc3RhdGUpKVxuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOmxldmVsY2hhbmdlZCcsIChpc0hEKSA9PiB0aGlzLnVwZGF0ZUhpZ2hEZWZpbml0aW9uKGlzSEQpKVxuICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOnBsYXliYWNrZXJyb3InLCAoKSA9PiB0aGlzLmZsYXNoUGxheWJhY2tFcnJvcigpKVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOnRpbWV1cGRhdGUnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpwbGF5YmFja3N0YXRlJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6bGV2ZWxjaGFuZ2VkJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6cGxheWJhY2tlcnJvcicpXG4gIH1cblxuICBib290c3RyYXAoKSB7XG4gICAgdGhpcy5lbC53aWR0aCA9IFwiMTAwJVwiXG4gICAgdGhpcy5lbC5oZWlnaHQgPSBcIjEwMCVcIlxuICAgIHRoaXMuaXNSZWFkeSA9IHRydWVcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiSURMRVwiXG4gICAgdGhpcy5zZXRGbGFzaFNldHRpbmdzKClcbiAgICB0aGlzLnVwZGF0ZVBsYXliYWNrVHlwZSgpXG4gICAgdGhpcy5hdXRvUGxheSAmJiB0aGlzLnBsYXkoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMubmFtZSlcbiAgfVxuXG4gIHNldEZsYXNoU2V0dGluZ3MoKSB7XG4gICAgdGhpcy5lbC5nbG9ib1BsYXllclNldGZsdXNoTGl2ZVVSTENhY2hlKHRoaXMuZmx1c2hMaXZlVVJMQ2FjaGUpXG4gICAgdGhpcy5lbC5nbG9ib1BsYXllckNhcExldmVsdG9TdGFnZSh0aGlzLmNhcExldmVsVG9TdGFnZSlcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyU2V0bWF4QnVmZmVyTGVuZ3RoKDApXG4gIH1cblxuICB1cGRhdGVIaWdoRGVmaW5pdGlvbihpc0hEKSB7XG4gICAgdGhpcy5oaWdoRGVmaW5pdGlvbiA9IChpc0hEID09PSBcImhkXCIpO1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfSElHSERFRklOSVRJT05VUERBVEUpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CSVRSQVRFLCB7J2JpdHJhdGUnOiB0aGlzLmdldEN1cnJlbnRCaXRyYXRlKCl9KVxuICB9XG5cbiAgdXBkYXRlVGltZSgpIHtcbiAgICB2YXIgZHVyYXRpb24gPSB0aGlzLmdldER1cmF0aW9uKClcbiAgICB2YXIgcG9zaXRpb24gPSBNYXRoLm1pbihNYXRoLm1heCh0aGlzLmVsLmdsb2JvR2V0UG9zaXRpb24oKSwgMCksIGR1cmF0aW9uKVxuICAgIHZhciBwcmV2aW91c0RWUlN0YXR1cyA9IHRoaXMuZHZyRW5hYmxlZFxuICAgIHZhciBsaXZlUGxheWJhY2sgPSAodGhpcy5wbGF5YmFja1R5cGUgPT09ICdsaXZlJylcbiAgICB0aGlzLmR2ckVuYWJsZWQgPSAobGl2ZVBsYXliYWNrICYmIGR1cmF0aW9uID4gMjQwKVxuXG4gICAgaWYgKGR1cmF0aW9uID09PSAxMDAgfHwgbGl2ZVBsYXliYWNrID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kdnJFbmFibGVkICE9PSBwcmV2aW91c0RWUlN0YXR1cykge1xuICAgICAgdGhpcy51cGRhdGVTZXR0aW5ncygpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFLCB0aGlzLm5hbWUpXG4gICAgfVxuXG4gICAgaWYgKGxpdmVQbGF5YmFjayAmJiAoIXRoaXMuZHZyRW5hYmxlZCB8fCAhdGhpcy5kdnJJblVzZSkpIHtcbiAgICAgIHBvc2l0aW9uID0gZHVyYXRpb25cbiAgICB9XG5cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHBvc2l0aW9uLCBkdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gJ1BBVVNFRCcpIHtcbiAgICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJSZXN1bWUoKVxuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50U3RhdGUgIT09IFwiUExBWUlOR1wiKSB7XG4gICAgICB0aGlzLmZpcnN0UGxheSgpXG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUExBWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXliYWNrVHlwZT8gdGhpcy5wbGF5YmFja1R5cGU6IG51bGxcbiAgfVxuXG4gIGdldEN1cnJlbnRCaXRyYXRlKCkge1xuICAgIHZhciBjdXJyZW50TGV2ZWwgPSB0aGlzLmdldExldmVscygpW3RoaXMuZWwuZ2xvYm9HZXRMZXZlbCgpXVxuICAgIHJldHVybiBjdXJyZW50TGV2ZWwuYml0cmF0ZVxuICB9XG5cbiAgZ2V0TGFzdFByb2dyYW1EYXRlKCkge1xuICAgIHZhciBwcm9ncmFtRGF0ZSA9IHRoaXMuZWwuZ2xvYm9HZXRMYXN0UHJvZ3JhbURhdGUoKVxuICAgIC8vIG5vcm1hbGl6aW5nIGZvciBCUlRcbiAgICByZXR1cm4gcHJvZ3JhbURhdGUgLSAxLjA4ZSs3XG4gIH1cblxuICBpc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlnaERlZmluaXRpb25cbiAgfVxuXG4gIGdldExldmVscygpIHtcbiAgICBpZiAoIXRoaXMubGV2ZWxzIHx8IHRoaXMubGV2ZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5sZXZlbHMgPSB0aGlzLmVsLmdsb2JvR2V0TGV2ZWxzKClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubGV2ZWxzXG4gIH1cblxuICBzZXRQbGF5YmFja1N0YXRlKHN0YXRlKSB7XG4gICAgdmFyIGJ1ZmZlckxlbmd0aCA9IHRoaXMuZWwuZ2xvYm9HZXRidWZmZXJMZW5ndGgoKVxuICAgIGlmIChzdGF0ZSA9PT0gXCJQTEFZSU5HX0JVRkZFUklOR1wiICYmIGJ1ZmZlckxlbmd0aCA8IDEpICB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgICAgdGhpcy51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUpXG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gXCJQTEFZSU5HXCIpIHtcbiAgICAgIGlmIChbXCJQTEFZSU5HX0JVRkZFUklOR1wiLCBcIlBBVVNFRFwiLCBcIklETEVcIl0uaW5kZXhPZih0aGlzLmN1cnJlbnRTdGF0ZSkgPj0gMCkge1xuICAgICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsIHRoaXMubmFtZSlcbiAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gXCJQQVVTRURcIikge1xuICAgICAgdGhpcy51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUpXG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gXCJJRExFXCIpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfRU5ERUQsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5lbC5nbG9ib0dldER1cmF0aW9uKCksIHRoaXMubmFtZSlcbiAgICAgIHRoaXMudXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlKVxuICAgIH1cbiAgICB0aGlzLmxhc3RCdWZmZXJMZW5ndGggPSBidWZmZXJMZW5ndGhcbiAgfVxuXG4gIHVwZGF0ZUN1cnJlbnRTdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuY3VycmVudFN0YXRlID0gc3RhdGVcbiAgICB0aGlzLnVwZGF0ZVBsYXliYWNrVHlwZSgpXG4gIH1cblxuICB1cGRhdGVQbGF5YmFja1R5cGUoKSB7XG4gICAgdGhpcy5wbGF5YmFja1R5cGUgPSB0aGlzLmVsLmdsb2JvR2V0VHlwZSgpXG4gICAgaWYgKHRoaXMucGxheWJhY2tUeXBlKSB7XG4gICAgICB0aGlzLnBsYXliYWNrVHlwZSA9IHRoaXMucGxheWJhY2tUeXBlLnRvTG93ZXJDYXNlKClcbiAgICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gJ3ZvZCcpIHtcbiAgICAgICAgdGhpcy5zdGFydFJlcG9ydGluZ1Byb2dyZXNzKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcFJlcG9ydGluZ1Byb2dyZXNzKClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZQkFDS1NUQVRFKVxuICB9XG5cbiAgc3RhcnRSZXBvcnRpbmdQcm9ncmVzcygpIHtcbiAgICBpZiAoIXRoaXMucmVwb3J0aW5nUHJvZ3Jlc3MpIHtcbiAgICAgIHRoaXMucmVwb3J0aW5nUHJvZ3Jlc3MgPSB0cnVlXG4gICAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpmcmFnbWVudGxvYWRlZCcsKCkgPT4gdGhpcy5vbkZyYWdtZW50TG9hZGVkKCkpXG4gICAgfVxuICB9XG5cbiAgc3RvcFJlcG9ydGluZ1Byb2dyZXNzKCkge1xuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzpmcmFnbWVudGxvYWRlZCcsIHRoaXMub25GcmFnbWVudExvYWRlZCwgdGhpcylcbiAgfVxuXG4gIG9uRnJhZ21lbnRMb2FkZWQoKSB7XG4gICAgdmFyIGJ1ZmZlcmVkID0gdGhpcy5lbC5nbG9ib0dldFBvc2l0aW9uKCkgKyB0aGlzLmVsLmdsb2JvR2V0YnVmZmVyTGVuZ3RoKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BST0dSRVNTLCB0aGlzLmVsLmdsb2JvR2V0UG9zaXRpb24oKSwgYnVmZmVyZWQsIHRoaXMuZ2V0RHVyYXRpb24oKSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgZmlyc3RQbGF5KCkge1xuICAgIHRoaXMuc2V0Rmxhc2hTZXR0aW5ncygpIC8vZW5zdXJlIGZsdXNoTGl2ZVVSTENhY2hlIHdpbGwgd29yayAoIzMyNylcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyTG9hZCh0aGlzLnNyYylcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyUGxheSgpXG4gIH1cblxuICB2b2x1bWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5pc1JlYWR5KSB7XG4gICAgICB0aGlzLmVsLmdsb2JvUGxheWVyVm9sdW1lKHZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3RlblRvT25jZSh0aGlzLCBFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgKCkgPT4gdGhpcy52b2x1bWUodmFsdWUpKVxuICAgIH1cbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSAhPT0gJ2xpdmUnIHx8IHRoaXMuZHZyRW5hYmxlZCkge1xuICAgICAgdGhpcy5lbC5nbG9ib1BsYXllclBhdXNlKClcbiAgICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gJ2xpdmUnICYmIHRoaXMuZHZyRW5hYmxlZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUR2cih0cnVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5lbC5nbG9ib1BsYXllclN0b3AoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5uYW1lKVxuICB9XG5cbiAgaXNQbGF5aW5nKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSkge1xuICAgICAgcmV0dXJuICEhKHRoaXMuY3VycmVudFN0YXRlLm1hdGNoKC9wbGF5aW5nL2kpKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGdldER1cmF0aW9uKCkge1xuICAgIHZhciBkdXJhdGlvbiA9IHRoaXMuZWwuZ2xvYm9HZXREdXJhdGlvbigpXG4gICAgaWYgKHRoaXMucGxheWJhY2tUeXBlID09PSAnbGl2ZScpIHtcbiAgICAgIC8vIGVzdGltYXRlIDEwIHNlY29uZHMgb2YgYnVmZmVyIHRpbWUgZm9yIGxpdmUgc3RyZWFtcyBmb3Igc2VlayBwb3NpdGlvbnNcbiAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gLSAxMFxuICAgIH1cbiAgICByZXR1cm4gZHVyYXRpb25cbiAgfVxuXG4gIHNlZWsodGltZSkge1xuICAgIHZhciBkdXJhdGlvbiA9IHRoaXMuZ2V0RHVyYXRpb24oKVxuICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgdGltZSA9IGR1cmF0aW9uICogdGltZSAvIDEwMFxuICAgIH1cblxuICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gJ2xpdmUnKSB7XG4gICAgICAvLyBzZWVrIG9wZXJhdGlvbnMgdG8gYSB0aW1lIHdpdGhpbiA1IHNlY29uZHMgZnJvbSBsaXZlIHN0cmVhbSB3aWxsIHBvc2l0aW9uIHBsYXloZWFkIGJhY2sgdG8gbGl2ZVxuICAgICAgdmFyIGR2ckluVXNlID0gKHRpbWUgPj0gMCAmJiBkdXJhdGlvbiAtIHRpbWUgPiA1KVxuICAgICAgaWYgKCFkdnJJblVzZSkge1xuICAgICAgICB0aW1lID0gLTFcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlRHZyKGR2ckluVXNlKVxuICAgIH1cbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyU2Vlayh0aW1lKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGltZSwgZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0hJR0hERUZJTklUSU9OVVBEQVRFKVxuICB9XG5cbiAgdXBkYXRlRHZyKGR2ckluVXNlKSB7XG4gICAgdmFyIHByZXZpb3VzRHZySW5Vc2UgPSAhIXRoaXMuZHZySW5Vc2VcbiAgICB0aGlzLmR2ckluVXNlID0gZHZySW5Vc2VcbiAgICBpZiAodGhpcy5kdnJJblVzZSAhPT0gcHJldmlvdXNEdnJJblVzZSkge1xuICAgICAgdGhpcy51cGRhdGVTZXR0aW5ncygpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0RWUiwgdGhpcy5kdnJJblVzZSlcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfU1RBVFNfQURELCB7J2R2cic6IHRoaXMuZHZySW5Vc2V9KVxuICAgIH1cbiAgfVxuXG4gIGZsYXNoUGxheWJhY2tFcnJvcigpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1NUT1ApXG4gIH1cblxuICB0aW1lVXBkYXRlKHRpbWUsIGR1cmF0aW9uKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aW1lLCBkdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHRoaXMuJGVsLnJlbW92ZSgpXG4gIH1cblxuICBzZXR1cEZpcmVmb3goKSB7XG4gICAgdmFyICRlbCA9IHRoaXMuJCgnZW1iZWQnKVxuICAgICRlbC5hdHRyKCdkYXRhLWhscycsICcnKVxuICAgIHRoaXMuc2V0RWxlbWVudCgkZWwpXG4gIH1cblxuICBzZXR1cElFKCkge1xuICAgIHRoaXMuc2V0RWxlbWVudCgkKHRlbXBsYXRlKG9iamVjdElFKSh7Y2lkOiB0aGlzLmNpZCwgYmFzZVVybDogdGhpcy5iYXNlVXJsLCBwbGF5YmFja0lkOiB0aGlzLnVuaXF1ZUlkfSkpKVxuICB9XG5cbiAgdXBkYXRlU2V0dGluZ3MoKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0U2V0dGluZ3MpXG4gICAgaWYgKHRoaXMucGxheWJhY2tUeXBlID09PSBcInZvZFwiIHx8IHRoaXMuZHZySW5Vc2UpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MubGVmdCA9IFtcInBsYXlwYXVzZVwiLCBcInBvc2l0aW9uXCIsIFwiZHVyYXRpb25cIl1cbiAgICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSB0cnVlXG4gICAgfSBlbHNlIGlmICh0aGlzLmR2ckVuYWJsZWQpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MubGVmdCA9IFtcInBsYXlwYXVzZVwiXVxuICAgICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgc2V0RWxlbWVudChlbGVtZW50KSB7XG4gICAgdGhpcy4kZWwgPSBlbGVtZW50XG4gICAgdGhpcy5lbCA9IGVsZW1lbnRbMF1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIGlmKEJyb3dzZXIuaXNMZWdhY3lJRSkge1xuICAgICAgdGhpcy5zZXR1cElFKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHtjaWQ6IHRoaXMuY2lkLCBiYXNlVXJsOiB0aGlzLmJhc2VVcmwsIHBsYXliYWNrSWQ6IHRoaXMudW5pcXVlSWR9KSlcbiAgICAgIGlmKEJyb3dzZXIuaXNGaXJlZm94KSB7XG4gICAgICAgIHRoaXMuc2V0dXBGaXJlZm94KClcbiAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc0lFKSB7XG4gICAgICAgIHRoaXMuJCgnZW1iZWQnKS5yZW1vdmUoKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmVsLmlkID0gdGhpcy5jaWRcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5ITFMuY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlKSB7XG4gIHJldHVybiAhIShyZXNvdXJjZS5tYXRjaCgvXmh0dHAoLiopLm0zdTg/LykgJiYgQnJvd3Nlci5oYXNGbGFzaClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBITFNcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5YmFjayA9IHJlcXVpcmUoJ3BsYXliYWNrJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpXG5cbmNsYXNzIEhUTUw1QXVkaW8gZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2h0bWw1X2F1ZGlvJyB9XG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ2F1ZGlvJyB9XG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICd0aW1ldXBkYXRlJzogJ3RpbWVVcGRhdGVkJyxcbiAgICAgICdlbmRlZCc6ICdlbmRlZCcsXG4gICAgICAnY2FucGxheXRocm91Z2gnOiAnYnVmZmVyRnVsbCdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICBzdXBlcihwYXJhbXMpXG4gICAgdGhpcy5lbC5zcmMgPSBwYXJhbXMuc3JjXG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIGxlZnQ6IFsncGxheXBhdXNlJywgJ3Bvc2l0aW9uJywgJ2R1cmF0aW9uJ10sXG4gICAgICByaWdodDogWydmdWxsc2NyZWVuJywgJ3ZvbHVtZSddLFxuICAgICAgZGVmYXVsdDogWydzZWVrYmFyJ11cbiAgICB9XG4gICAgdGhpcy5yZW5kZXIoKVxuICAgIHBhcmFtcy5hdXRvUGxheSAmJiB0aGlzLnBsYXkoKVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVksIHRoaXMucGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BBVVNFLCB0aGlzLnBhdXNlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VFSywgdGhpcy5zZWVrKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfVk9MVU1FLCB0aGlzLnZvbHVtZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMuc3RvcClcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gXCJhb2RcIlxuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLmVsLnBsYXkoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUExBWSk7XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLmVsLnBhdXNlKClcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5wYXVzZSgpXG4gICAgdGhpcy5lbC5jdXJyZW50VGltZSA9IDBcbiAgfVxuXG4gIHZvbHVtZSh2YWx1ZSkge1xuICAgIHRoaXMuZWwudm9sdW1lID0gdmFsdWUgLyAxMDBcbiAgfVxuXG4gIG11dGUoKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSAwXG4gIH1cblxuICB1bm11dGUoKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSAxXG4gIH1cblxuICBpc011dGVkKCkge1xuICAgIHJldHVybiAhIXRoaXMuZWwudm9sdW1lXG4gIH1cblxuICBlbmRlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFLCAwKVxuICB9XG5cbiAgc2VlayhzZWVrQmFyVmFsdWUpIHtcbiAgICB2YXIgdGltZSA9IHRoaXMuZWwuZHVyYXRpb24gKiAoc2Vla0JhclZhbHVlIC8gMTAwKVxuICAgIHRoaXMuZWwuY3VycmVudFRpbWUgPSB0aW1lXG4gIH1cblxuICBnZXRDdXJyZW50VGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5jdXJyZW50VGltZVxuICB9XG5cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwuZHVyYXRpb25cbiAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gIXRoaXMuZWwucGF1c2VkICYmICF0aGlzLmVsLmVuZGVkXG4gIH1cblxuICB0aW1lVXBkYXRlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRoaXMuZWwuY3VycmVudFRpbWUsIHRoaXMuZWwuZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgfVxuXG4gIGJ1ZmZlckZ1bGwoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aGlzLmVsLmN1cnJlbnRUaW1lLCB0aGlzLmVsLmR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMubmFtZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG4gfVxuXG5IVE1MNUF1ZGlvLmNhblBsYXkgPSBmdW5jdGlvbihyZXNvdXJjZSkge1xuICB2YXIgbWltZXR5cGVzID0ge1xuICAgICd3YXYnOiBbJ2F1ZGlvL3dhdiddLFxuICAgICdtcDMnOiBbJ2F1ZGlvL21wMycsICdhdWRpby9tcGVnO2NvZGVjcz1cIm1wM1wiJ10sXG4gICAgJ2FhYyc6IFsnYXVkaW8vbXA0O2NvZGVjcz1cIm1wNGEuNDAuNVwiJ10sXG4gICAgJ29nYSc6IFsnYXVkaW8vb2dnJ11cbiAgfVxuICB2YXIgcmVzb3VyY2VQYXJ0cyA9IHJlc291cmNlLnNwbGl0KCc/JylbMF0ubWF0Y2goLy4qXFwuKC4qKSQvKSB8fCBbXVxuICBpZiAoKHJlc291cmNlUGFydHMubGVuZ3RoID4gMSkgJiYgKG1pbWV0eXBlc1tyZXNvdXJjZVBhcnRzWzFdXSAhPT0gdW5kZWZpbmVkKSkge1xuICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKVxuICAgIHJldHVybiAhIWZpbmQobWltZXR5cGVzW3Jlc291cmNlUGFydHNbMV1dLCAoZXh0KSA9PiB7IHJldHVybiAhIWEuY2FuUGxheVR5cGUoZXh0KS5yZXBsYWNlKC9uby8sICcnKSB9KVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gSFRNTDVBdWRpb1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXliYWNrID0gcmVxdWlyZSgncGxheWJhY2snKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBLaWJvID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9raWJvJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJ2Jyb3dzZXInKVxudmFyIHNlZWtTdHJpbmdUb1NlY29uZHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykuc2Vla1N0cmluZ1RvU2Vjb25kc1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJylcblxuY2xhc3MgSFRNTDVWaWRlbyBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnaHRtbDVfdmlkZW8nIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAndmlkZW8nIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULmh0bWw1X3ZpZGVvIH1cblxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2RhdGEtaHRtbDUtdmlkZW8nOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICd0aW1ldXBkYXRlJzogJ3RpbWVVcGRhdGVkJyxcbiAgICAgICdwcm9ncmVzcyc6ICdwcm9ncmVzcycsXG4gICAgICAnZW5kZWQnOiAnZW5kZWQnLFxuICAgICAgJ3N0YWxsZWQnOiAnc3RhbGxlZCcsXG4gICAgICAnd2FpdGluZyc6ICd3YWl0aW5nJyxcbiAgICAgICdjYW5wbGF5dGhyb3VnaCc6ICdidWZmZXJGdWxsJyxcbiAgICAgICdsb2FkZWRtZXRhZGF0YSc6ICdsb2FkZWRNZXRhZGF0YScsXG4gICAgICAnY2FucGxheSc6ICdyZWFkeScsXG4gICAgICAnZHVyYXRpb25jaGFuZ2UnOiAnZHVyYXRpb25DaGFuZ2UnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5raWJvID0gbmV3IEtpYm8oKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLnNyYyA9IG9wdGlvbnMuc3JjXG4gICAgdGhpcy5lbC5zcmMgPSBvcHRpb25zLnNyY1xuICAgIHRoaXMuZWwubG9vcCA9IG9wdGlvbnMubG9vcFxuICAgIHRoaXMuZmlyc3RCdWZmZXIgPSB0cnVlXG4gICAgdGhpcy5pc0hMUyA9ICh0aGlzLnNyYy5pbmRleE9mKCdtM3U4JykgPiAtMSlcbiAgICB0aGlzLnNldHRpbmdzID0ge2RlZmF1bHQ6IFsnc2Vla2JhciddfVxuICAgIGlmIChCcm93c2VyLmlzU2FmYXJpKSB7XG4gICAgICB0aGlzLnNldHVwU2FmYXJpKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5wcmVsb2FkID0gb3B0aW9ucy5wcmVsb2FkID8gb3B0aW9ucy5wcmVsb2FkOiAnbWV0YWRhdGEnXG4gICAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSB0aGlzLmlzSExTID8gW1wicGxheXN0b3BcIl0gOiBbXCJwbGF5cGF1c2VcIiwgXCJwb3NpdGlvblwiLCBcImR1cmF0aW9uXCJdXG4gICAgdGhpcy5zZXR0aW5ncy5yaWdodCA9IFtcImZ1bGxzY3JlZW5cIiwgXCJ2b2x1bWVcIl1cbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICB9XG5cbiAgc2V0dXBTYWZhcmkoKSB7XG4gICAgdGhpcy5lbC5wcmVsb2FkID0gJ2F1dG8nXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIFsxLDIsMyw0LDUsNiw3LDgsOV0uZm9yRWFjaCgoaSkgPT4geyB0aGlzLmtpYm8uZG93bihpLnRvU3RyaW5nKCksICgpID0+IHRoaXMuc2VlayhpICogMTApKSB9KVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICB0aGlzLmtpYm8ub2ZmKFsxLDIsMyw0LDUsNiw3LDgsOV0pXG4gIH1cblxuICBsb2FkZWRNZXRhZGF0YShlKSB7XG4gICAgdGhpcy5kdXJhdGlvbkNoYW5nZSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19MT0FERURNRVRBREFUQSwgZS50YXJnZXQuZHVyYXRpb24pXG4gICAgdGhpcy5jaGVja0luaXRpYWxTZWVrKClcbiAgfVxuXG4gIGR1cmF0aW9uQ2hhbmdlKCkge1xuICAgIC8vIHdlIGNhbid0IGZpZ3VyZSBvdXQgaWYgaGxzIHJlc291cmNlIGlzIFZvRCBvciBub3QgdW50aWwgaXQgaXMgYmVpbmcgbG9hZGVkIG9yIGR1cmF0aW9uIGhhcyBjaGFuZ2VkLlxuICAgIC8vIHRoYXQncyB3aHkgd2UgY2hlY2sgaXQgYWdhaW4gYW5kIHVwZGF0ZSBtZWRpYSBjb250cm9sIGFjY29yZGluZ2x5LlxuICAgIGlmICh0aGlzLmdldFBsYXliYWNrVHlwZSgpID09PSAndm9kJykge1xuICAgICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gW1wicGxheXBhdXNlXCIsIFwicG9zaXRpb25cIiwgXCJkdXJhdGlvblwiXVxuICAgICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IHRydWVcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19TRVRUSU5HU1VQREFURSlcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0hMUyAmJiBbMCwgdW5kZWZpbmVkLCBJbmZpbml0eV0uaW5kZXhPZih0aGlzLmVsLmR1cmF0aW9uKSA+PSAwID8gJ2xpdmUnIDogJ3ZvZCdcbiAgfVxuXG4gIGlzSGlnaERlZmluaXRpb25JblVzZSgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5lbC5wbGF5KClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BMQVkpO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5lbC5wYXVzZSgpXG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMucGF1c2UoKVxuICAgIGlmICh0aGlzLmVsLnJlYWR5U3RhdGUgIT09IDApIHtcbiAgICAgIHRoaXMuZWwuY3VycmVudFRpbWUgPSAwXG4gICAgfVxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSB2YWx1ZSAvIDEwMFxuICB9XG5cbiAgbXV0ZSgpIHtcbiAgICB0aGlzLmVsLnZvbHVtZSA9IDBcbiAgfVxuXG4gIHVubXV0ZSgpIHtcbiAgICB0aGlzLmVsLnZvbHVtZSA9IDFcbiAgfVxuXG4gIGlzTXV0ZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5lbC52b2x1bWVcbiAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gIXRoaXMuZWwucGF1c2VkICYmICF0aGlzLmVsLmVuZGVkXG4gIH1cblxuICBlbmRlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0VOREVELCB0aGlzLm5hbWUpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCAwLCB0aGlzLmVsLmR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gIH1cblxuICBzdGFsbGVkKCkge1xuICAgIGlmICh0aGlzLmdldFBsYXliYWNrVHlwZSgpID09PSAndm9kJyAmJiB0aGlzLmVsLnJlYWR5U3RhdGUgPCB0aGlzLmVsLkhBVkVfRlVUVVJFX0RBVEEpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSSU5HLCB0aGlzLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgd2FpdGluZygpIHtcbiAgICBpZih0aGlzLmVsLnJlYWR5U3RhdGUgPCB0aGlzLmVsLkhBVkVfRlVUVVJFX0RBVEEpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSSU5HLCB0aGlzLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgYnVmZmVyRnVsbCgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnBvc3RlciAmJiB0aGlzLmZpcnN0QnVmZmVyKSB7XG4gICAgICB0aGlzLmZpcnN0QnVmZmVyID0gZmFsc2VcbiAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcoKSkge1xuICAgICAgICB0aGlzLmVsLnBvc3RlciA9IHRoaXMub3B0aW9ucy5wb3N0ZXJcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5wb3N0ZXIgPSAnJ1xuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsIHRoaXMubmFtZSlcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLnN0b3AoKVxuICAgIHRoaXMuZWwuc3JjID0gJydcbiAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICB9XG5cbiAgc2VlayhzZWVrQmFyVmFsdWUpIHtcbiAgICB2YXIgdGltZSA9IHRoaXMuZWwuZHVyYXRpb24gKiAoc2Vla0JhclZhbHVlIC8gMTAwKVxuICAgIHRoaXMuc2Vla1NlY29uZHModGltZSlcbiAgfVxuXG4gIHNlZWtTZWNvbmRzKHRpbWUpIHtcbiAgICB0aGlzLmVsLmN1cnJlbnRUaW1lID0gdGltZVxuICB9XG5cbiAgY2hlY2tJbml0aWFsU2VlaygpIHtcbiAgICB2YXIgc2Vla1RpbWUgPSBzZWVrU3RyaW5nVG9TZWNvbmRzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgIHRoaXMuc2Vla1NlY29uZHMoc2Vla1RpbWUpXG4gIH1cblxuICBnZXRDdXJyZW50VGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5jdXJyZW50VGltZVxuICB9XG5cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwuZHVyYXRpb25cbiAgfVxuXG4gIHRpbWVVcGRhdGVkKCkge1xuICAgIGlmICh0aGlzLmdldFBsYXliYWNrVHlwZSgpID09PSAnbGl2ZScpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMSwgMSwgdGhpcy5uYW1lKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRoaXMuZWwuY3VycmVudFRpbWUsIHRoaXMuZWwuZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgICB9XG4gIH1cblxuICBwcm9ncmVzcygpIHtcbiAgICBpZiAoIXRoaXMuZWwuYnVmZmVyZWQubGVuZ3RoKSByZXR1cm5cbiAgICB2YXIgYnVmZmVyZWRQb3MgPSAwXG4gICAgZm9yICh2YXIgaSA9IDA7ICBpIDwgdGhpcy5lbC5idWZmZXJlZC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZWwuY3VycmVudFRpbWUgPj0gdGhpcy5lbC5idWZmZXJlZC5zdGFydChpKSAmJiB0aGlzLmVsLmN1cnJlbnRUaW1lIDw9IHRoaXMuZWwuYnVmZmVyZWQuZW5kKGkpKSB7XG4gICAgICAgIGJ1ZmZlcmVkUG9zID0gaVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BST0dSRVNTLCB0aGlzLmVsLmJ1ZmZlcmVkLnN0YXJ0KGJ1ZmZlcmVkUG9zKSwgdGhpcy5lbC5idWZmZXJlZC5lbmQoYnVmZmVyZWRQb3MpLCB0aGlzLmVsLmR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gIH1cblxuICB0eXBlRm9yKHNyYykge1xuICAgIHJldHVybiAoc3JjLmluZGV4T2YoJy5tM3U4JykgPiAwKSA/ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcgOiAndmlkZW8vbXA0J1xuICB9XG5cbiAgcmVhZHkoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpXG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHsgc3JjOiB0aGlzLnNyYywgdHlwZTogdGhpcy50eXBlRm9yKHRoaXMuc3JjKSB9KSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9wdGlvbnMuYXV0b1BsYXkgJiYgdGhpcy5wbGF5KCksIDApO1xuICAgIGlmICh0aGlzLmVsLnJlYWR5U3RhdGUgPT09IHRoaXMuZWwuSEFWRV9FTk9VR0hfREFUQSkge1xuICAgICAgdGhpcy5yZWFkeSgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuSFRNTDVWaWRlby5jYW5QbGF5ID0gZnVuY3Rpb24ocmVzb3VyY2UpIHtcbiAgdmFyIG1pbWV0eXBlcyA9IHtcbiAgICAnbXA0JzogW1wiYXZjMS40MkUwMUVcIiwgXCJhdmMxLjU4QTAxRVwiLCBcImF2YzEuNEQ0MDFFXCIsIFwiYXZjMS42NDAwMUVcIiwgXCJtcDR2LjIwLjhcIiwgXCJtcDR2LjIwLjI0MFwiLCBcIm1wNGEuNDAuMlwiXS5tYXAoXG4gICAgICAoY29kZWMpID0+IHsgcmV0dXJuICd2aWRlby9tcDQ7IGNvZGVjcz1cIicgKyBjb2RlYyArICcsIG1wNGEuNDAuMlwiJ30pLFxuICAgICdvZ2cnOiBbJ3ZpZGVvL29nZzsgY29kZWNzPVwidGhlb3JhLCB2b3JiaXNcIicsICd2aWRlby9vZ2c7IGNvZGVjcz1cImRpcmFjXCInLCAndmlkZW8vb2dnOyBjb2RlY3M9XCJ0aGVvcmEsIHNwZWV4XCInXSxcbiAgICAnM2dwcCc6IFsndmlkZW8vM2dwcDsgY29kZWNzPVwibXA0di4yMC44LCBzYW1yXCInXSxcbiAgICAnd2VibSc6IFsndmlkZW8vd2VibTsgY29kZWNzPVwidnA4LCB2b3JiaXNcIiddLFxuICAgICdta3YnOiBbJ3ZpZGVvL3gtbWF0cm9za2E7IGNvZGVjcz1cInRoZW9yYSwgdm9yYmlzXCInXSxcbiAgICAnbTN1OCc6IFsnYXBwbGljYXRpb24veC1tcGVnVVJMJ11cbiAgfVxuICBtaW1ldHlwZXNbJ29ndiddID0gbWltZXR5cGVzWydvZ2cnXVxuICBtaW1ldHlwZXNbJzNncCddID0gbWltZXR5cGVzWyczZ3BwJ11cblxuICB2YXIgcmVzb3VyY2VQYXJ0cyA9IHJlc291cmNlLnNwbGl0KCc/JylbMF0ubWF0Y2goLy4qXFwuKC4qKSQvKSB8fCBbXVxuICBpZiAoKHJlc291cmNlUGFydHMubGVuZ3RoID4gMSkgJiYgKG1pbWV0eXBlc1tyZXNvdXJjZVBhcnRzWzFdXSAhPT0gdW5kZWZpbmVkKSkge1xuICAgIHZhciB2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgIHJldHVybiAhIWZpbmQobWltZXR5cGVzW3Jlc291cmNlUGFydHNbMV1dLCAoZXh0KSA9PiB7IHJldHVybiAhIXYuY2FuUGxheVR5cGUoZXh0KS5yZXBsYWNlKC9uby8sICcnKSB9KVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhUTUw1VmlkZW9cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5YmFjayA9IHJlcXVpcmUoJ3BsYXliYWNrJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG5cbmNsYXNzIEhUTUxJbWcgZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2h0bWxfaW1nJyB9XG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ2ltZycgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2RhdGEtaHRtbC1pbWcnOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgc3VwZXIocGFyYW1zKVxuICAgIHRoaXMuZWwuc3JjID0gcGFyYW1zLnNyY1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbiB9XG5cbkhUTUxJbWcuY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlKSB7XG4gIHJldHVybiAhIXJlc291cmNlLm1hdGNoKC8oLiopLihwbmd8anBnfGpwZWd8Z2lmfGJtcCkvKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhUTUxJbWdcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9ub19vcCcpO1xuIiwidmFyIFBsYXliYWNrID0gcmVxdWlyZSgncGxheWJhY2snKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcblxuY2xhc3MgTm9PcCBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnbm9fb3AnIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULm5vX29wIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHsnZGF0YS1uby1vcCc6ICcnfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpO1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSk7XG4gICAgdGhpcy5hbmltYXRlKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLm5hbWUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIG5vaXNlKCkge1xuICAgIHZhciBpZGF0YSA9IHRoaXMuY29udGV4dC5jcmVhdGVJbWFnZURhdGEodGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCwgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQpXG4gICAgdmFyIGJ1ZmZlcjMyID0gbmV3IFVpbnQzMkFycmF5KGlkYXRhLmRhdGEuYnVmZmVyKVxuICAgIHZhciBsZW4gPSBidWZmZXIzMi5sZW5ndGhcbiAgICB2YXIgcnVuID0gMFxuICAgIHZhciBjb2xvciA9IDBcbiAgICB2YXIgbSA9IE1hdGgucmFuZG9tKCkgKiA2ICsgNFxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47KSB7XG4gICAgICBpZiAocnVuIDwgMCkge1xuICAgICAgICBydW4gPSBtICogTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdmFyIHAgPSBNYXRoLnBvdyhNYXRoLnJhbmRvbSgpLCAwLjQpO1xuICAgICAgICBjb2xvciA9ICgyNTUgKiBwKSA8PCAyNDtcbiAgICAgIH1cbiAgICAgIHJ1biAtPSAxO1xuICAgICAgYnVmZmVyMzJbaSsrXSA9IGNvbG9yO1xuICAgIH1cbiAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKGlkYXRhLCAwLCAwKTtcbiAgfVxuXG4gIGxvb3AoKSB7XG4gICAgdGhpcy5ub2lzZSgpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMubG9vcCgpKVxuICB9XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICB0aGlzLmNhbnZhcyA9IHRoaXMuJGVsLmZpbmQoJ2NhbnZhc1tkYXRhLW5vLW9wLWNhbnZhc10nKVswXVxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLmxvb3AoKVxuICB9XG59XG5cbk5vT3AuY2FuUGxheSA9IChzb3VyY2UpID0+IHtcbiAgcmV0dXJuIHRydWVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb09wXG4iLCIvL0NvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCdjb250YWluZXJfcGx1Z2luJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jbGFzcyBDbGlja1RvUGF1c2VQbHVnaW4gZXh0ZW5kcyBDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdjbGlja190b19wYXVzZScgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgc3VwZXIob3B0aW9ucylcbiAgICB9XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfQ0xJQ0ssIHRoaXMuY2xpY2spXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TRVRUSU5HU1VQREFURSwgdGhpcy5zZXR0aW5nc1VwZGF0ZSlcbiAgfVxuXG4gIGNsaWNrKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSAhPT0gJ2xpdmUnIHx8IHRoaXMuY29udGFpbmVyLmlzRHZyRW5hYmxlZCgpKSB7XG4gICAgICBpZiAodGhpcy5jb250YWluZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIucGF1c2UoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIucGxheSgpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0dGluZ3NVcGRhdGUoKSB7XG4gICAgdGhpcy5jb250YWluZXIuJGVsLnJlbW92ZUNsYXNzKCdwb2ludGVyLWVuYWJsZWQnKVxuICAgIGlmICh0aGlzLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSAhPT0gJ2xpdmUnIHx8IHRoaXMuY29udGFpbmVyLmlzRHZyRW5hYmxlZCgpKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci4kZWwuYWRkQ2xhc3MoJ3BvaW50ZXItZW5hYmxlZCcpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2xpY2tUb1BhdXNlUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2xpY2tfdG9fcGF1c2UnKVxuIiwidmFyIFVJQ29yZVBsdWdpbiA9IHJlcXVpcmUoJ3VpX2NvcmVfcGx1Z2luJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNsYXNzIERWUkNvbnRyb2xzIGV4dGVuZHMgVUlDb3JlUGx1Z2luIHtcbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULmR2cl9jb250cm9scyB9XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2R2cl9jb250cm9scycgfVxuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xpY2sgLmxpdmUtYnV0dG9uJzogJ2NsaWNrJ1xuICAgIH1cbiAgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsYXNzJzogJ2R2ci1jb250cm9scycsXG4gICAgICAnZGF0YS1kdnItY29udHJvbHMnOiAnJyxcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihjb3JlKSB7XG4gICAgc3VwZXIoY29yZSlcbiAgICB0aGlzLmNvcmUgPSBjb3JlXG4gICAgdGhpcy5zZXR0aW5nc1VwZGF0ZSgpXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb3JlLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9DT05UQUlORVJDSEFOR0VELCB0aGlzLnNldHRpbmdzVXBkYXRlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb3JlLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9SRU5ERVJFRCwgdGhpcy5zZXR0aW5nc1VwZGF0ZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLRFZSU1RBVEVDSEFOR0VELCB0aGlzLmR2ckNoYW5nZWQpXG4gIH1cblxuICBkdnJDaGFuZ2VkKGR2ckVuYWJsZWQpIHtcbiAgICB0aGlzLnNldHRpbmdzVXBkYXRlKClcbiAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5hZGRDbGFzcygnbGl2ZScpXG4gICAgaWYgKGR2ckVuYWJsZWQpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmFkZENsYXNzKCdkdnInKVxuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kZWwuZmluZCgnLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtcG9zaXRpb25dLCAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1kdXJhdGlvbl0nKS5oaWRlKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kZWwucmVtb3ZlQ2xhc3MoJ2R2cicpXG4gICAgfVxuICB9XG5cbiAgY2xpY2soKSB7XG4gICAgaWYgKCF0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkge1xuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIucGxheSgpXG4gICAgfVxuICAgIGlmICh0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5oYXNDbGFzcygnZHZyJykpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldEN1cnJlbnRUaW1lKC0xKVxuICAgIH1cbiAgfVxuXG4gIHNldHRpbmdzVXBkYXRlKCkge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZygpXG4gICAgaWYodGhpcy5zaG91bGRSZW5kZXIoKSkge1xuICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgdGhpcy4kZWwuY2xpY2soKCkgPT4gdGhpcy5jbGljaygpKVxuICAgIH1cbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICB9XG5cbiAgc2hvdWxkUmVuZGVyKCkge1xuICAgIHZhciB1c2VEdnJDb250cm9scyA9IHRoaXMuY29yZS5vcHRpb25zLnVzZUR2ckNvbnRyb2xzID09PSB1bmRlZmluZWQgfHwgISF0aGlzLmNvcmUub3B0aW9ucy51c2VEdnJDb250cm9sc1xuICAgIHJldHVybiB1c2VEdnJDb250cm9scyAmJiB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ2xpdmUnXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSlcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgaWYgKHRoaXMuc2hvdWxkUmVuZGVyKCkpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmFkZENsYXNzKCdsaXZlJylcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJCgnLm1lZGlhLWNvbnRyb2wtbGVmdC1wYW5lbFtkYXRhLW1lZGlhLWNvbnRyb2xdJykuYXBwZW5kKHRoaXMuJGVsKVxuICAgICAgaWYgKHRoaXMuJGR1cmF0aW9uKSB7XG4gICAgICAgIHRoaXMuJGR1cmF0aW9uLnJlbW92ZSgpXG4gICAgICB9XG4gICAgICB0aGlzLiRkdXJhdGlvbiA9ICQoJzxzcGFuIGRhdGEtZHVyYXRpb24+PC9zcGFuPicpXG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLnNlZWtUaW1lLiRlbC5hcHBlbmQodGhpcy4kZHVyYXRpb24pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEVlJDb250cm9sc1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2R2cl9jb250cm9scycpXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgnY29udGFpbmVyX3BsdWdpbicpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNsYXNzIEdvb2dsZUFuYWx5dGljcyBleHRlbmRzIENvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2dvb2dsZV9hbmFseXRpY3MnIH1cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgaWYgKG9wdGlvbnMuZ2FBY2NvdW50KSB7XG4gICAgICB0aGlzLmFjY291bnQgPSBvcHRpb25zLmdhQWNjb3VudFxuICAgICAgdGhpcy50cmFja2VyTmFtZSA9IChvcHRpb25zLmdhVHJhY2tlck5hbWUpID8gb3B0aW9ucy5nYVRyYWNrZXJOYW1lICsgXCIuXCIgOiAnQ2xhcHByLidcbiAgICAgIHRoaXMuY3VycmVudEhEU3RhdGUgPSB1bmRlZmluZWRcbiAgICAgIHRoaXMuZW1iZWRTY3JpcHQoKVxuICAgIH1cbiAgfVxuXG4gIGVtYmVkU2NyaXB0KCkge1xuICAgIGlmICghd2luZG93Ll9nYXQpIHtcbiAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0L2phdmFzY3JpcHRcIilcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJhc3luY1wiLCBcImFzeW5jXCIpXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaHR0cDovL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9nYS5qc1wiKVxuICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIH1cbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWSwgdGhpcy5vblBsYXkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLm9uU3RvcClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BBVVNFLCB0aGlzLm9uUGF1c2UpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcy5vbkVuZGVkKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSSU5HLCB0aGlzLm9uQnVmZmVyaW5nKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSRlVMTCwgdGhpcy5vbkJ1ZmZlckZ1bGwpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcy5vbkVuZGVkKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRVJST1IsIHRoaXMub25FcnJvcilcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLU1RBVEUsIHRoaXMub25QbGF5YmFja0NoYW5nZWQpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9WT0xVTUUsIChldmVudCkgPT4gdGhpcy5vblZvbHVtZUNoYW5nZWQoZXZlbnQpKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VFSywgKGV2ZW50KSA9PiB0aGlzLm9uU2VlayhldmVudCkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9GVUxMX1NDUkVFTiwgdGhpcy5vbkZ1bGxzY3JlZW4pXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9ISUdIREVGSU5JVElPTlVQREFURSwgdGhpcy5vbkhEKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQsIHRoaXMub25EVlIpXG4gICAgX2dhcS5wdXNoKFt0aGlzLnRyYWNrZXJOYW1lICsgJ19zZXRBY2NvdW50JywgdGhpcy5hY2NvdW50XSk7XG4gIH1cblxuICBvblBsYXkoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiUGxheVwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIlN0b3BcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uRW5kZWQoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiRW5kZWRcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIkJ1ZmZlcmluZ1wiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25CdWZmZXJGdWxsKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIkJ1ZmZlcmZ1bGxcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uRXJyb3IoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiRXJyb3JcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uSEQoKSB7XG4gICAgdmFyIHN0YXR1cyA9IHRoaXMuY29udGFpbmVyLmlzSGlnaERlZmluaXRpb25JblVzZSgpPyBcIk9OXCI6IFwiT0ZGXCJcbiAgICBpZiAoc3RhdHVzICE9PSB0aGlzLmN1cnJlbnRIRFN0YXRlKSB7XG4gICAgICB0aGlzLmN1cnJlbnRIRFN0YXRlID0gc3RhdHVzXG4gICAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJIRCAtIFwiICsgc3RhdHVzLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICAgIH1cbiAgfVxuXG5cbiAgb25QbGF5YmFja0NoYW5nZWQoKSB7XG4gICAgdmFyIHR5cGUgPSB0aGlzLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKVxuICAgIGlmICh0eXBlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJQbGF5YmFjayBUeXBlIC0gXCIgKyB0eXBlLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICAgIH1cbiAgfVxuXG4gIG9uRFZSKGR2ckluVXNlKSB7XG4gICAgdmFyIHN0YXR1cyA9IGR2ckluVXNlPyBcIk9OXCI6IFwiT0ZGXCJcbiAgICB0aGlzLnB1c2goW1wiSW50ZXJhY3Rpb25cIiwgXCJEVlIgLSBcIiArIHN0YXR1cywgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uUGF1c2UoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiUGF1c2VcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uU2VlaygpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJTZWVrXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvblZvbHVtZUNoYW5nZWQoKSB7XG4gICAgdGhpcy5wdXNoKFtcIkludGVyYWN0aW9uXCIsIFwiVm9sdW1lXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvbkZ1bGxzY3JlZW4oKSB7XG4gICAgdGhpcy5wdXNoKFtcIkludGVyYWN0aW9uXCIsIFwiRnVsbHNjcmVlblwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cblxuICBwdXNoKGFycmF5KSB7XG4gICAgdmFyIHJlcyA9IFt0aGlzLnRyYWNrZXJOYW1lICsgXCJfdHJhY2tFdmVudFwiXS5jb25jYXQoYXJyYXkpXG4gICAgX2dhcS5wdXNoKHJlcylcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gR29vZ2xlQW5hbHl0aWNzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2dvb2dsZV9hbmFseXRpY3MnKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9sb2cnKTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBLaWJvID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9raWJvJylcblxuY2xhc3MgTG9nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5raWJvID0gbmV3IEtpYm8oKVxuICAgIHRoaXMua2liby5kb3duKFsnY3RybCBzaGlmdCBkJ10sICgpID0+IHRoaXMub25PZmYoKSlcbiAgICB0aGlzLkJMQUNLTElTVCA9IFsncGxheWJhY2s6dGltZXVwZGF0ZScsICdwbGF5YmFjazpwcm9ncmVzcycsICdjb250YWluZXI6aG92ZXInLCAnY29udGFpbmVyOnRpbWV1cGRhdGUnLCAnY29udGFpbmVyOnByb2dyZXNzJ107XG4gIH1cblxuICBpbmZvKGtsYXNzLCBtZXNzYWdlKSB7dGhpcy5sb2coa2xhc3MsICdpbmZvJywgbWVzc2FnZSl9XG4gIHdhcm4oa2xhc3MsIG1lc3NhZ2UpIHt0aGlzLmxvZyhrbGFzcywgJ3dhcm4nLCBtZXNzYWdlKX1cbiAgZGVidWcoa2xhc3MsIG1lc3NhZ2UpIHt0aGlzLmxvZyhrbGFzcywgJ2RlYnVnJywgbWVzc2FnZSl9XG5cbiAgb25PZmYoKSB7XG4gICAgd2luZG93LkRFQlVHID0gIXdpbmRvdy5ERUJVR1xuICAgIGlmICh3aW5kb3cuREVCVUcpIHsgY29uc29sZS5sb2coJ2xvZyBlbmFibGVkJyk7ICB9XG4gICAgZWxzZSB7IGNvbnNvbGUubG9nKCdsb2cgZGlzYWJsZWQnKTsgfVxuICB9XG5cbiAgbG9nKGtsYXNzLCBsZXZlbCwgbWVzc2FnZSkge1xuICAgIGlmICghd2luZG93LkRFQlVHIHx8IHRoaXMuQkxBQ0tMSVNULmluZGV4T2YobWVzc2FnZSkgPj0gMCkgcmV0dXJuXG4gICAgdmFyIGNvbG9yXG4gICAgaWYgKGxldmVsID09PSAnd2FybicpIHsgY29sb3IgPSAnI0ZGODAwMCcgfVxuICAgIGVsc2UgaWYgKGxldmVsID09PSAnaW5mbycpIHsgY29sb3IgPSAnIzAwNjYwMCcgfVxuICAgIGVsc2UgaWYgKGxldmVsID09PSAnZXJyb3InKSB7IGNvbG9yID0gJyNGRjAwMDAnfVxuICAgIGNvbnNvbGUubG9nKFwiJWMgW1wiICsga2xhc3MgKyBcIl0gW1wiICsgbGV2ZWwgKyBcIl0gXCIgKyAgbWVzc2FnZSwgJ2NvbG9yOiAnK2NvbG9yKTtcbiAgfVxufVxuXG5Mb2cuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuX2luc3RhbmNlID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKClcbiAgfVxuICByZXR1cm4gdGhpcy5faW5zdGFuY2Vcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IExvZ1xuIiwiLy9Db3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgVUlDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCd1aV9jb250YWluZXJfcGx1Z2luJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJ21lZGlhdG9yJylcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgncGxheWVyX2luZm8nKVxuXG52YXIgJCA9IHJlcXVpcmUoJ3plcHRvJylcblxuY2xhc3MgUG9zdGVyUGx1Z2luIGV4dGVuZHMgVUlDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdwb3N0ZXInIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULnBvc3RlciB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGFzcyc6ICdwbGF5ZXItcG9zdGVyJyxcbiAgICAgICdkYXRhLXBvc3Rlcic6ICcnXG4gICAgfVxuICB9XG5cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsaWNrJzogJ2NsaWNrZWQnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMuY29udGFpbmVyLmRpc2FibGVNZWRpYUNvbnRyb2woKVxuICAgIHRoaXMucmVuZGVyKClcbiAgICB0aGlzLmJ1ZmZlckZ1bGwgPSBmYWxzZVxuICB9XG5cbiAgbG9hZChzb3VyY2UpIHtcbiAgICB0aGlzLm9wdGlvbnMucG9zdGVyID0gc291cmNlXG4gICAgdGhpcy5yZW5kZXIoKVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORywgdGhpcy5vbkJ1ZmZlcmluZylcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMub25CdWZmZXJmdWxsKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5vblN0b3ApXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLm9uUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0VOREVELCB0aGlzLm9uU3RvcClcbiAgICBNZWRpYXRvci5vbihFdmVudHMuUExBWUVSX1JFU0laRSwgdGhpcy51cGRhdGVTaXplLCB0aGlzKVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICBNZWRpYXRvci5vZmYoRXZlbnRzLlBMQVlFUl9SRVNJWkUsIHRoaXMudXBkYXRlU2l6ZSwgdGhpcylcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIHRoaXMuYnVmZmVyRnVsbCA9IGZhbHNlXG4gICAgdGhpcy5oaWRlUGxheUJ1dHRvbigpXG4gIH1cblxuICBvblBsYXkoKSB7XG4gICAgaWYgKHRoaXMuYnVmZmVyRnVsbCkge1xuICAgICAgdGhpcy4kZWwuaGlkZSgpXG4gICAgICB0aGlzLmNvbnRhaW5lci5lbmFibGVNZWRpYUNvbnRyb2woKVxuICAgIH1cbiAgfVxuXG4gIG9uQnVmZmVyZnVsbCgpIHtcbiAgICB0aGlzLmJ1ZmZlckZ1bGwgPSB0cnVlXG4gICAgaWYgKHRoaXMuY29udGFpbmVyLnBsYXliYWNrLm5hbWUgPT09ICdodG1sNV92aWRlbycgJiYgIXRoaXMuY29udGFpbmVyLmlzUGxheWluZygpKSByZXR1cm5cbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB0aGlzLmNvbnRhaW5lci5lbmFibGVNZWRpYUNvbnRyb2woKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMuJGVsLnNob3coKVxuICAgIHRoaXMuY29udGFpbmVyLmRpc2FibGVNZWRpYUNvbnRyb2woKVxuICAgIHRoaXMuc2hvd1BsYXlCdXR0b24oKVxuICB9XG5cbiAgc2hvd1BsYXlCdXR0b24oKSB7XG4gICAgdGhpcy4kcGxheUJ1dHRvbi5zaG93KClcbiAgICB0aGlzLnVwZGF0ZVNpemUoKVxuICB9XG5cbiAgaGlkZVBsYXlCdXR0b24oKSB7XG4gICAgdGhpcy4kcGxheUJ1dHRvbi5oaWRlKClcbiAgfVxuXG4gIGNsaWNrZWQoKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgdGhpcy5jb250YWluZXIucGxheSgpXG4gICAgICB0aGlzLmhpZGVQbGF5QnV0dG9uKClcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB1cGRhdGVTaXplKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5uYW1lID09PSAnaHRtbF9pbWcnKSByZXR1cm5cbiAgICB2YXIgaGVpZ2h0ID0gUGxheWVySW5mby5jdXJyZW50U2l6ZSA/IFBsYXllckluZm8uY3VycmVudFNpemUuaGVpZ2h0IDogdGhpcy4kZWwuaGVpZ2h0KClcbiAgICB0aGlzLiRlbC5jc3MoeyBmb250U2l6ZTogaGVpZ2h0IH0pXG4gICAgaWYgKHRoaXMuJHBsYXlXcmFwcGVyLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICB0aGlzLiRwbGF5V3JhcHBlci5jc3MoeyBtYXJnaW5Ub3A6IC0odGhpcy4kcGxheVdyYXBwZXIuaGVpZ2h0KCkgLyAyKSB9KVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIucGxheWJhY2submFtZSA9PT0gJ2h0bWxfaW1nJykgcmV0dXJuXG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSwge2Jhc2VVcmw6IHRoaXMub3B0aW9ucy5iYXNlVXJsfSlbMF1cbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wb3N0ZXIpIHtcbiAgICAgIHZhciBpbWdFbCA9ICQoJzxkaXYgZGF0YS1wb3N0ZXIgY2xhc3M9XCJwb3N0ZXItYmFja2dyb3VuZFwiPjwvZGl2PicpXG4gICAgICBpbWdFbC5jc3MoeydiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdGhpcy5vcHRpb25zLnBvc3RlciArICcpJ30pXG4gICAgICB0aGlzLiRlbC5wcmVwZW5kKGltZ0VsKVxuICAgIH1cbiAgICB0aGlzLmNvbnRhaW5lci4kZWwuYXBwZW5kKHRoaXMuZWwpXG4gICAgdGhpcy4kcGxheUJ1dHRvbiA9IHRoaXMuJGVsLmZpbmQoJy5wb3N0ZXItaWNvbicpXG4gICAgdGhpcy4kcGxheVdyYXBwZXIgPSB0aGlzLiRlbC5maW5kKCcucGxheS13cmFwcGVyJylcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlU2l6ZSgpLCAwKVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgdGhpcy5oaWRlUGxheUJ1dHRvbigpXG4gICAgICB0aGlzLiRlbC5jc3MoeydjdXJzb3InOiAnaW5pdGlhbCd9KVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zdGVyUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc3Bpbm5lcl90aHJlZV9ib3VuY2UnKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFVJQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgndWlfY29udGFpbmVyX3BsdWdpbicpO1xudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJyk7XG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcblxuY2xhc3MgU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luIGV4dGVuZHMgVUlDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdzcGlubmVyJyB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZGF0YS1zcGlubmVyJzonJyxcbiAgICAgICdjbGFzcyc6ICdzcGlubmVyLXRocmVlLWJvdW5jZSdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnRlbXBsYXRlID0gSlNULnNwaW5uZXJfdGhyZWVfYm91bmNlXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJJTkcsIHRoaXMub25CdWZmZXJpbmcpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMLCB0aGlzLm9uQnVmZmVyRnVsbClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICAgIHRoaXMucmVuZGVyKClcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIHRoaXMuJGVsLnNob3coKVxuICB9XG5cbiAgb25CdWZmZXJGdWxsKCkge1xuICAgIHRoaXMuJGVsLmhpZGUoKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMuJGVsLmhpZGUoKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcignc3Bpbm5lcl90aHJlZV9ib3VuY2UnKVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy5jb250YWluZXIuJGVsLmFwcGVuZCh0aGlzLiRlbClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3N0YXRzJyk7XG5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCdjb250YWluZXJfcGx1Z2luJyk7XG52YXIgJCA9IHJlcXVpcmUoXCJ6ZXB0b1wiKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcblxuY2xhc3MgU3RhdHNQbHVnaW4gZXh0ZW5kcyBDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdzdGF0cycgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc2V0SW5pdGlhbEF0dHJzKClcbiAgICB0aGlzLnJlcG9ydEludGVydmFsID0gb3B0aW9ucy5yZXBvcnRJbnRlcnZhbCB8fCA1MDAwXG4gICAgdGhpcy5zdGF0ZSA9IFwiSURMRVwiXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19QTEFZLCB0aGlzLm9uUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfREVTVFJPWUVELCB0aGlzLm9uU3RvcClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORywgdGhpcy5vbkJ1ZmZlcmluZylcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMub25CdWZmZXJGdWxsKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVFNfQURELCB0aGlzLm9uU3RhdHNBZGQpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9CSVRSQVRFLCB0aGlzLm9uU3RhdHNBZGQpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lci5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1NUQVRTX0FERCwgdGhpcy5vblN0YXRzQWRkKVxuICB9XG5cbiAgc2V0SW5pdGlhbEF0dHJzKCkge1xuICAgIHRoaXMuZmlyc3RQbGF5ID0gdHJ1ZVxuICAgIHRoaXMuc3RhcnR1cFRpbWUgPSAwXG4gICAgdGhpcy5yZWJ1ZmZlcmluZ1RpbWUgPSAwXG4gICAgdGhpcy53YXRjaGluZ1RpbWUgPSAwXG4gICAgdGhpcy5yZWJ1ZmZlcnMgPSAwXG4gICAgdGhpcy5leHRlcm5hbE1ldHJpY3MgPSB7fVxuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIHRoaXMuc3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgIHRoaXMud2F0Y2hpbmdUaW1lSW5pdCA9IERhdGUubm93KClcbiAgICBpZiAoIXRoaXMuaW50ZXJ2YWxJZCkge1xuICAgICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodGhpcy5yZXBvcnQuYmluZCh0aGlzKSwgdGhpcy5yZXBvcnRJbnRlcnZhbClcbiAgICB9XG4gIH1cblxuICBvblN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpXG4gICAgdGhpcy5pbnRlcnZhbElkID0gdW5kZWZpbmVkXG4gICAgdGhpcy5zdGF0ZSA9IFwiU1RPUFBFRFwiXG4gIH1cblxuICBvbkJ1ZmZlcmluZygpIHtcbiAgICBpZiAodGhpcy5maXJzdFBsYXkpIHtcbiAgICAgIHRoaXMuc3RhcnR1cFRpbWVJbml0ID0gRGF0ZS5ub3coKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlYnVmZmVyaW5nVGltZUluaXQgPSBEYXRlLm5vdygpXG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBcIkJVRkZFUklOR1wiXG4gICAgdGhpcy5yZWJ1ZmZlcnMrK1xuICB9XG5cbiAgb25CdWZmZXJGdWxsKCkge1xuICAgIGlmICh0aGlzLmZpcnN0UGxheSAmJiAhIXRoaXMuc3RhcnR1cFRpbWVJbml0KSB7XG4gICAgICB0aGlzLmZpcnN0UGxheSA9IGZhbHNlXG4gICAgICB0aGlzLnN0YXJ0dXBUaW1lID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnR1cFRpbWVJbml0XG4gICAgICB0aGlzLndhdGNoaW5nVGltZUluaXQgPSBEYXRlLm5vdygpXG4gICAgfSBlbHNlIGlmICghIXRoaXMucmVidWZmZXJpbmdUaW1lSW5pdCkge1xuICAgICAgdGhpcy5yZWJ1ZmZlcmluZ1RpbWUgKz0gdGhpcy5nZXRSZWJ1ZmZlcmluZ1RpbWUoKVxuICAgIH1cbiAgICB0aGlzLnJlYnVmZmVyaW5nVGltZUluaXQgPSB1bmRlZmluZWRcbiAgICB0aGlzLnN0YXRlID0gXCJQTEFZSU5HXCJcbiAgfVxuXG4gIGdldFJlYnVmZmVyaW5nVGltZSgpIHtcbiAgICByZXR1cm4gRGF0ZS5ub3coKSAtIHRoaXMucmVidWZmZXJpbmdUaW1lSW5pdFxuICB9XG5cbiAgZ2V0V2F0Y2hpbmdUaW1lKCkge1xuICAgIHZhciB0b3RhbFRpbWUgPSAoRGF0ZS5ub3coKSAtIHRoaXMud2F0Y2hpbmdUaW1lSW5pdClcbiAgICByZXR1cm4gdG90YWxUaW1lIC0gdGhpcy5yZWJ1ZmZlcmluZ1RpbWVcbiAgfVxuXG4gIGlzUmVidWZmZXJpbmcoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5yZWJ1ZmZlcmluZ1RpbWVJbml0XG4gIH1cblxuICBvblN0YXRzQWRkKG1ldHJpYykge1xuICAgICQuZXh0ZW5kKHRoaXMuZXh0ZXJuYWxNZXRyaWNzLCBtZXRyaWMpXG4gIH1cblxuICBnZXRTdGF0cygpIHtcbiAgICB2YXIgbWV0cmljcyA9IHtcbiAgICAgIHN0YXJ0dXBUaW1lOiAgICAgdGhpcy5zdGFydHVwVGltZSxcbiAgICAgIHJlYnVmZmVyczogICAgICAgdGhpcy5yZWJ1ZmZlcnMsXG4gICAgICByZWJ1ZmZlcmluZ1RpbWU6IHRoaXMuaXNSZWJ1ZmZlcmluZygpPyB0aGlzLnJlYnVmZmVyaW5nVGltZSArIHRoaXMuZ2V0UmVidWZmZXJpbmdUaW1lKCk6IHRoaXMucmVidWZmZXJpbmdUaW1lLFxuICAgICAgd2F0Y2hpbmdUaW1lOiAgICB0aGlzLmlzUmVidWZmZXJpbmcoKT8gdGhpcy5nZXRXYXRjaGluZ1RpbWUoKSAtIHRoaXMuZ2V0UmVidWZmZXJpbmdUaW1lKCk6IHRoaXMuZ2V0V2F0Y2hpbmdUaW1lKClcbiAgICB9XG4gICAgJC5leHRlbmQobWV0cmljcywgdGhpcy5leHRlcm5hbE1ldHJpY3MpXG4gICAgcmV0dXJuIG1ldHJpY3NcbiAgfVxuXG4gIHJlcG9ydCgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5zdGF0c1JlcG9ydCh0aGlzLmdldFN0YXRzKCkpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0c1BsdWdpbjtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi93YXRlcm1hcmsnKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFVJQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgndWlfY29udGFpbmVyX3BsdWdpbicpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jbGFzcyBXYXRlck1hcmtQbHVnaW4gZXh0ZW5kcyBVSUNvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ3dhdGVybWFyaycgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMudGVtcGxhdGUgPSBKU1RbdGhpcy5uYW1lXVxuICAgIHRoaXMucG9zaXRpb24gPSBvcHRpb25zLnBvc2l0aW9uIHx8IFwiYm90dG9tLXJpZ2h0XCJcbiAgICBpZiAob3B0aW9ucy53YXRlcm1hcmspIHtcbiAgICAgIHRoaXMuaW1hZ2VVcmwgPSBvcHRpb25zLndhdGVybWFya1xuICAgICAgdGhpcy5yZW5kZXIoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICAgIH1cbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLm9uUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIGlmICghdGhpcy5oaWRkZW4pXG4gICAgICB0aGlzLiRlbC5zaG93KClcbiAgfVxuXG4gIG9uU3RvcCgpIHtcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB2YXIgdGVtcGxhdGVPcHRpb25zID0ge3Bvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLCBpbWFnZVVybDogdGhpcy5pbWFnZVVybH1cbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUodGVtcGxhdGVPcHRpb25zKSlcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy5jb250YWluZXIuJGVsLmFwcGVuZCh0aGlzLiRlbClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2F0ZXJNYXJrUGx1Z2luXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgdW5pcXVlSWQgPSByZXF1aXJlKCcuL3V0aWxzJykudW5pcXVlSWRcbnZhciBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jbGFzcyBCYXNlT2JqZWN0IGV4dGVuZHMgRXZlbnRzIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucz17fSkge1xuICAgIHRoaXMudW5pcXVlSWQgPSB1bmlxdWVJZCgnbycpXG4gICAgdGhpcy5jb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZU9iamVjdFxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuY2xhc3MgQnJvd3NlciB7XG59XG5cbnZhciBoYXNMb2NhbHN0b3JhZ2UgPSBmdW5jdGlvbigpe1xuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGFwcHInLCAnY2xhcHByJylcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY2xhcHByJylcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG52YXIgaGFzRmxhc2ggPSBmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICB2YXIgZm8gPSBuZXcgQWN0aXZlWE9iamVjdCgnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnKTtcbiAgICByZXR1cm4gISFmbztcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiAhIShuYXZpZ2F0b3IubWltZVR5cGVzICYmIG5hdmlnYXRvci5taW1lVHlwZXNbJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJ10gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBuYXZpZ2F0b3IubWltZVR5cGVzWydhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCddLmVuYWJsZWRQbHVnaW4pO1xuICB9XG59XG5cbkJyb3dzZXIuaXNTYWZhcmkgPSAoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9zYWZhcmkvaSkgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUnKSA9PT0gLTEpXG5Ccm93c2VyLmlzQ2hyb21lID0gISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvY2hyb21lL2kpKVxuQnJvd3Nlci5pc0ZpcmVmb3ggPSAhIShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9maXJlZm94L2kpKVxuQnJvd3Nlci5pc0xlZ2FjeUlFID0gISEod2luZG93LkFjdGl2ZVhPYmplY3QpXG5Ccm93c2VyLmlzSUUgPSBCcm93c2VyLmlzTGVnYWN5SUUgfHwgISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvdHJpZGVudC4qcnY6MVxcZC9pKSlcbkJyb3dzZXIuaXNJRTExID0gISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvdHJpZGVudC4qcnY6MTEvaSkpXG5Ccm93c2VyLmlzTW9iaWxlID0gISEoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fFdpbmRvd3MgUGhvbmV8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpXG5Ccm93c2VyLmlzV2luOEFwcCA9ICEhKC9NU0FwcEhvc3QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKVxuQnJvd3Nlci5pc1dpaVUgPSAhISgvV2lpVS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpXG5Ccm93c2VyLmlzUFM0ID0gISEoL1BsYXlTdGF0aW9uIDQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKVxuQnJvd3Nlci5oYXNMb2NhbHN0b3JhZ2UgPSBoYXNMb2NhbHN0b3JhZ2UoKVxuQnJvd3Nlci5oYXNGbGFzaCA9IGhhc0ZsYXNoKClcblxubW9kdWxlLmV4cG9ydHMgPSBCcm93c2VyXG4iLCJ2YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0JylcblxuY2xhc3MgQ29udGFpbmVyUGx1Z2luIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmJpbmRFdmVudHMoKVxuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29udGFpbmVyJyk7XG4iLCJ2YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0JylcblxuY2xhc3MgQ29yZVBsdWdpbiBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3Rvcihjb3JlKSB7XG4gICAgc3VwZXIoY29yZSlcbiAgICB0aGlzLmNvcmUgPSBjb3JlXG4gIH1cblxuICBnZXRFeHRlcm5hbEludGVyZmFjZSgpIHsgcmV0dXJuIHt9IH1cblxuICBkZXN0cm95KCkge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29yZScpO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIGV4ZWNPbmNlID0gcmVxdWlyZSgnbG9kYXNoLm9uY2UnKVxudmFyIHVuaXF1ZUlkID0gcmVxdWlyZSgnLi91dGlscycpLnVuaXF1ZUlkXG52YXIgTG9nID0gcmVxdWlyZSgnLi4vcGx1Z2lucy9sb2cnKS5nZXRJbnN0YW5jZSgpXG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG5jbGFzcyBFdmVudHMge1xuICBvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXNcbiAgICB0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KVxuICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV0gfHwgKHRoaXMuX2V2ZW50c1tuYW1lXSA9IFtdKVxuICAgIGV2ZW50cy5wdXNoKHtjYWxsYmFjazogY2FsbGJhY2ssIGNvbnRleHQ6IGNvbnRleHQsIGN0eDogY29udGV4dCB8fCB0aGlzfSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgb25jZShuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbmNlJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpc1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIHZhciBvbmNlID0gZXhlY09uY2UoZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLm9mZihuYW1lLCBvbmNlKVxuICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH0pXG4gICAgb25jZS5fY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIG9uY2UsIGNvbnRleHQpXG4gIH1cblxuICBvZmYobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB2YXIgcmV0YWluLCBldiwgZXZlbnRzLCBuYW1lcywgaSwgbCwgaiwga1xuICAgIGlmICghdGhpcy5fZXZlbnRzIHx8ICFldmVudHNBcGkodGhpcywgJ29mZicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pKSByZXR1cm4gdGhpc1xuICAgIGlmICghbmFtZSAmJiAhY2FsbGJhY2sgJiYgIWNvbnRleHQpIHtcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHZvaWQgMFxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXModGhpcy5fZXZlbnRzKVxuICAgIGZvciAoaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG5hbWUgPSBuYW1lc1tpXVxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdXG4gICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50c1tuYW1lXSA9IHJldGFpbiA9IFtdXG4gICAgICAgIGlmIChjYWxsYmFjayB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgZm9yIChqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgIGV2ID0gZXZlbnRzW2pdXG4gICAgICAgICAgICBpZiAoKGNhbGxiYWNrICYmIGNhbGxiYWNrICE9PSBldi5jYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2suX2NhbGxiYWNrKSB8fFxuICAgICAgICAgICAgICAgIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2LmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIGRlbGV0ZSB0aGlzLl9ldmVudHNbbmFtZV1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHRyaWdnZXIobmFtZSkge1xuICAgIHZhciBrbGFzcyA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV1cbiAgICBMb2cuaW5mbyhrbGFzcywgbmFtZSlcbiAgICBpZiAoIXRoaXMuX2V2ZW50cykgcmV0dXJuIHRoaXNcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICd0cmlnZ2VyJywgbmFtZSwgYXJncykpIHJldHVybiB0aGlzXG4gICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXVxuICAgIHZhciBhbGxFdmVudHMgPSB0aGlzLl9ldmVudHMuYWxsXG4gICAgaWYgKGV2ZW50cykgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MpXG4gICAgaWYgKGFsbEV2ZW50cykgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RvcExpc3RlbmluZyhvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGxpc3RlbmluZ1RvID0gdGhpcy5fbGlzdGVuaW5nVG9cbiAgICBpZiAoIWxpc3RlbmluZ1RvKSByZXR1cm4gdGhpc1xuICAgIHZhciByZW1vdmUgPSAhbmFtZSAmJiAhY2FsbGJhY2tcbiAgICBpZiAoIWNhbGxiYWNrICYmIHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JykgY2FsbGJhY2sgPSB0aGlzXG4gICAgaWYgKG9iaikgKGxpc3RlbmluZ1RvID0ge30pW29iai5fbGlzdGVuSWRdID0gb2JqXG4gICAgZm9yICh2YXIgaWQgaW4gbGlzdGVuaW5nVG8pIHtcbiAgICAgIG9iaiA9IGxpc3RlbmluZ1RvW2lkXVxuICAgICAgb2JqLm9mZihuYW1lLCBjYWxsYmFjaywgdGhpcylcbiAgICAgIGlmIChyZW1vdmUgfHwgT2JqZWN0LmtleXMob2JqLl9ldmVudHMpLmxlbmd0aCA9PT0gMCkgZGVsZXRlIHRoaXMuX2xpc3RlbmluZ1RvW2lkXVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbnZhciBldmVudFNwbGl0dGVyID0gL1xccysvXG5cbnZhciBldmVudHNBcGkgPSBmdW5jdGlvbihvYmosIGFjdGlvbiwgbmFtZSwgcmVzdCkge1xuICBpZiAoIW5hbWUpIHJldHVybiB0cnVlXG5cbiAgLy8gSGFuZGxlIGV2ZW50IG1hcHMuXG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgb2JqW2FjdGlvbl0uYXBwbHkob2JqLCBba2V5LCBuYW1lW2tleV1dLmNvbmNhdChyZXN0KSlcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBIYW5kbGUgc3BhY2Ugc2VwYXJhdGVkIGV2ZW50IG5hbWVzLlxuICBpZiAoZXZlbnRTcGxpdHRlci50ZXN0KG5hbWUpKSB7XG4gICAgdmFyIG5hbWVzID0gbmFtZS5zcGxpdChldmVudFNwbGl0dGVyKVxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtuYW1lc1tpXV0uY29uY2F0KHJlc3QpKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbnZhciB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzKSB7XG4gIHZhciBldiwgaSA9IC0xLCBsID0gZXZlbnRzLmxlbmd0aCwgYTEgPSBhcmdzWzBdLCBhMiA9IGFyZ3NbMV0sIGEzID0gYXJnc1syXVxuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7IHJldHVyblxuICAgIGNhc2UgMTogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTsgcmV0dXJuXG4gICAgY2FzZSAyOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTsgcmV0dXJuXG4gICAgY2FzZSAzOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyLCBhMyk7IHJldHVyblxuICAgIGRlZmF1bHQ6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7IHJldHVyblxuICB9XG59XG5cbnZhciBsaXN0ZW5NZXRob2RzID0ge2xpc3RlblRvOiAnb24nLCBsaXN0ZW5Ub09uY2U6ICdvbmNlJ31cblxuT2JqZWN0LmtleXMobGlzdGVuTWV0aG9kcykuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgRXZlbnRzLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBsaXN0ZW5pbmdUbyA9IHRoaXMuX2xpc3RlbmluZ1RvIHx8ICh0aGlzLl9saXN0ZW5pbmdUbyA9IHt9KVxuICAgIHZhciBpZCA9IG9iai5fbGlzdGVuSWQgfHwgKG9iai5fbGlzdGVuSWQgPSB1bmlxdWVJZCgnbCcpKVxuICAgIGxpc3RlbmluZ1RvW2lkXSA9IG9ialxuICAgIGlmICghY2FsbGJhY2sgJiYgdHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXNcbiAgICBvYmpbbGlzdGVuTWV0aG9kc1ttZXRob2RdXShuYW1lLCBjYWxsYmFjaywgdGhpcylcbiAgICByZXR1cm4gdGhpc1xuICB9XG59KTtcblxuLy8gUExBWUVSIEVWRU5UU1xuRXZlbnRzLlBMQVlFUl9SRVNJWkUgPSAncGxheWVyOnJlc2l6ZSdcblxuLy8gUGxheWJhY2sgRXZlbnRzXG5FdmVudHMuUExBWUJBQ0tfUFJPR1JFU1MgPSAncGxheWJhY2s6cHJvZ3Jlc3MnXG5FdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSA9ICdwbGF5YmFjazp0aW1ldXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX1JFQURZID0gJ3BsYXliYWNrOnJlYWR5J1xuRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORyA9ICdwbGF5YmFjazpidWZmZXJpbmcnXG5FdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCA9ICdwbGF5YmFjazpidWZmZXJmdWxsJ1xuRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFID0gJ3BsYXliYWNrOnNldHRpbmdzdXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX0xPQURFRE1FVEFEQVRBID0gJ3BsYXliYWNrOmxvYWRlZG1ldGFkYXRhJ1xuRXZlbnRzLlBMQVlCQUNLX0hJR0hERUZJTklUSU9OVVBEQVRFID0gJ3BsYXliYWNrOmhpZ2hkZWZpbml0aW9udXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX0JJVFJBVEUgPSAncGxheWJhY2s6Yml0cmF0ZSdcbkV2ZW50cy5QTEFZQkFDS19QTEFZQkFDS1NUQVRFID0gJ3BsYXliYWNrOnBsYXliYWNrc3RhdGUnXG5FdmVudHMuUExBWUJBQ0tfRFZSID0gJ3BsYXliYWNrOmR2cidcbkV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRElTQUJMRSA9ICdwbGF5YmFjazptZWRpYWNvbnRyb2w6ZGlzYWJsZSdcbkV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRU5BQkxFID0gJ3BsYXliYWNrOm1lZGlhY29udHJvbDplbmFibGUnXG5FdmVudHMuUExBWUJBQ0tfRU5ERUQgPSAncGxheWJhY2s6ZW5kZWQnXG5FdmVudHMuUExBWUJBQ0tfUExBWSA9ICdwbGF5YmFjazpwbGF5J1xuRXZlbnRzLlBMQVlCQUNLX0VSUk9SID0gJ3BsYXliYWNrOmVycm9yJ1xuRXZlbnRzLlBMQVlCQUNLX1NUQVRTX0FERCA9ICdwbGF5YmFjazpzdGF0czphZGQnXG5cbi8vIENvbnRhaW5lciBFdmVudHNcbkV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tTVEFURSA9ICdjb250YWluZXI6cGxheWJhY2tzdGF0ZSdcbkV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQgPSAnY29udGFpbmVyOmR2cidcbkV2ZW50cy5DT05UQUlORVJfQklUUkFURSA9ICdjb250YWluZXI6Yml0cmF0ZSdcbkV2ZW50cy5DT05UQUlORVJfU1RBVFNfUkVQT1JUID0gJ2NvbnRhaW5lcjpzdGF0czpyZXBvcnQnXG5FdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCA9ICdjb250YWluZXI6ZGVzdHJveWVkJ1xuRXZlbnRzLkNPTlRBSU5FUl9SRUFEWSA9ICdjb250YWluZXI6cmVhZHknXG5FdmVudHMuQ09OVEFJTkVSX0VSUk9SID0gJ2NvbnRhaW5lcjplcnJvcidcbkV2ZW50cy5DT05UQUlORVJfTE9BREVETUVUQURBVEEgPSAnY29udGFpbmVyOmxvYWRlZG1ldGFkYXRhJ1xuRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFID0gJ2NvbnRhaW5lcjp0aW1ldXBkYXRlJ1xuRXZlbnRzLkNPTlRBSU5FUl9QUk9HUkVTUyA9ICdjb250YWluZXI6cHJvZ3Jlc3MnXG5FdmVudHMuQ09OVEFJTkVSX1BMQVkgPSAnY29udGFpbmVyOnBsYXknXG5FdmVudHMuQ09OVEFJTkVSX1NUT1AgPSAnY29udGFpbmVyOnN0b3AnXG5FdmVudHMuQ09OVEFJTkVSX1BBVVNFID0gJ2NvbnRhaW5lcjpwYXVzZSdcbkV2ZW50cy5DT05UQUlORVJfRU5ERUQgPSAnY29udGFpbmVyOmVuZGVkJ1xuRXZlbnRzLkNPTlRBSU5FUl9DTElDSyA9ICdjb250YWluZXI6Y2xpY2snXG5FdmVudHMuQ09OVEFJTkVSX01PVVNFX0VOVEVSID0gJ2NvbnRhaW5lcjptb3VzZWVudGVyJ1xuRXZlbnRzLkNPTlRBSU5FUl9NT1VTRV9MRUFWRSA9ICdjb250YWluZXI6bW91c2VsZWF2ZSdcbkV2ZW50cy5DT05UQUlORVJfU0VFSyA9ICdjb250YWluZXI6c2VlaydcbkV2ZW50cy5DT05UQUlORVJfVk9MVU1FID0gJ2NvbnRhaW5lcjp2b2x1bWUnXG5FdmVudHMuQ09OVEFJTkVSX0ZVTExTQ1JFRU4gPSAnY29udGFpbmVyOmZ1bGxzY3JlZW4nXG5FdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORyA9ICdjb250YWluZXI6c3RhdGU6YnVmZmVyaW5nJ1xuRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMID0gJ2NvbnRhaW5lcjpzdGF0ZTpidWZmZXJmdWxsJ1xuRXZlbnRzLkNPTlRBSU5FUl9TRVRUSU5HU1VQREFURSA9ICdjb250YWluZXI6c2V0dGluZ3N1cGRhdGUnXG5FdmVudHMuQ09OVEFJTkVSX0hJR0hERUZJTklUSU9OVVBEQVRFID0gJ2NvbnRhaW5lcjpoaWdoZGVmaW5pdGlvbnVwZGF0ZSdcbkV2ZW50cy5DT05UQUlORVJfTUVESUFDT05UUk9MX0RJU0FCTEUgPSAnY29udGFpbmVyOm1lZGlhY29udHJvbDpkaXNhYmxlJ1xuRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRU5BQkxFID0gJ2NvbnRhaW5lcjptZWRpYWNvbnRyb2w6ZW5hYmxlJ1xuRXZlbnRzLkNPTlRBSU5FUl9TVEFUU19BREQgPSAnY29udGFpbmVyOnN0YXRzOmFkZCdcblxuLy8gTWVkaWFDb250cm9sIEV2ZW50c1xuRXZlbnRzLk1FRElBQ09OVFJPTF9SRU5ERVJFRCA9ICdtZWRpYWNvbnRyb2w6cmVuZGVyZWQnXG5FdmVudHMuTUVESUFDT05UUk9MX0ZVTExTQ1JFRU4gPSAnbWVkaWFjb250cm9sOmZ1bGxzY3JlZW4nXG5FdmVudHMuTUVESUFDT05UUk9MX1NIT1cgPSAnbWVkaWFjb250cm9sOnNob3cnXG5FdmVudHMuTUVESUFDT05UUk9MX0hJREUgPSAnbWVkaWFjb250cm9sOmhpZGUnXG5FdmVudHMuTUVESUFDT05UUk9MX01PVVNFTU9WRV9TRUVLQkFSID0gJ21lZGlhY29udHJvbDptb3VzZW1vdmU6c2Vla2JhcidcbkV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VMRUFWRV9TRUVLQkFSID0gJ21lZGlhY29udHJvbDptb3VzZWxlYXZlOnNlZWtiYXInXG5FdmVudHMuTUVESUFDT05UUk9MX1BMQVlJTkcgPSAnbWVkaWFjb250cm9sOnBsYXlpbmcnXG5FdmVudHMuTUVESUFDT05UUk9MX05PVFBMQVlJTkcgPSAnbWVkaWFjb250cm9sOm5vdHBsYXlpbmcnXG5FdmVudHMuTUVESUFDT05UUk9MX0NPTlRBSU5FUkNIQU5HRUQgPSAnbWVkaWFjb250cm9sOmNvbnRhaW5lcmNoYW5nZWQnXG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRzXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmxhc2gnKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2hscycpO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaHRtbDVfYXVkaW8nKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2h0bWw1X3ZpZGVvJyk7XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9odG1sX2ltZycpO1xuXG4iLCJ2YXIgS2libyA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudCB8fCB3aW5kb3cuZG9jdW1lbnQ7XG4gIHRoaXMuaW5pdGlhbGl6ZSgpO1xufTtcblxuS2liby5LRVlfTkFNRVNfQllfQ09ERSA9IHtcbiAgODogJ2JhY2tzcGFjZScsIDk6ICd0YWInLCAxMzogJ2VudGVyJyxcbiAgMTY6ICdzaGlmdCcsIDE3OiAnY3RybCcsIDE4OiAnYWx0JyxcbiAgMjA6ICdjYXBzX2xvY2snLFxuICAyNzogJ2VzYycsXG4gIDMyOiAnc3BhY2UnLFxuICAzNzogJ2xlZnQnLCAzODogJ3VwJywgMzk6ICdyaWdodCcsIDQwOiAnZG93bicsXG4gIDQ4OiAnMCcsIDQ5OiAnMScsIDUwOiAnMicsIDUxOiAnMycsIDUyOiAnNCcsIDUzOiAnNScsIDU0OiAnNicsIDU1OiAnNycsIDU2OiAnOCcsIDU3OiAnOScsXG4gIDY1OiAnYScsIDY2OiAnYicsIDY3OiAnYycsIDY4OiAnZCcsIDY5OiAnZScsIDcwOiAnZicsIDcxOiAnZycsIDcyOiAnaCcsIDczOiAnaScsIDc0OiAnaicsIDc1OiAnaycsIDc2OiAnbCcsIDc3OiAnbScsIDc4OiAnbicsIDc5OiAnbycsIDgwOiAncCcsIDgxOiAncScsIDgyOiAncicsIDgzOiAncycsIDg0OiAndCcsIDg1OiAndScsIDg2OiAndicsIDg3OiAndycsIDg4OiAneCcsIDg5OiAneScsIDkwOiAneicsXG4gIDExMjogJ2YxJywgMTEzOiAnZjInLCAxMTQ6ICdmMycsIDExNTogJ2Y0JywgMTE2OiAnZjUnLCAxMTc6ICdmNicsIDExODogJ2Y3JywgMTE5OiAnZjgnLCAxMjA6ICdmOScsIDEyMTogJ2YxMCcsIDEyMjogJ2YxMScsIDEyMzogJ2YxMidcbn07XG5cbktpYm8uS0VZX0NPREVTX0JZX05BTUUgPSB7fTtcbihmdW5jdGlvbigpIHtcbiAgZm9yKHZhciBrZXkgaW4gS2liby5LRVlfTkFNRVNfQllfQ09ERSlcbiAgICBpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoS2liby5LRVlfTkFNRVNfQllfQ09ERSwga2V5KSlcbiAgICAgIEtpYm8uS0VZX0NPREVTX0JZX05BTUVbS2liby5LRVlfTkFNRVNfQllfQ09ERVtrZXldXSA9ICtrZXk7XG59KSgpO1xuXG5LaWJvLk1PRElGSUVSUyA9IFsnc2hpZnQnLCAnY3RybCcsICdhbHQnXTtcblxuS2liby5yZWdpc3RlckV2ZW50ID0gKGZ1bmN0aW9uKCkge1xuICBpZihkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgZnVuYykge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuYywgZmFsc2UpO1xuICAgIH07XG4gIH1cbiAgZWxzZSBpZihkb2N1bWVudC5hdHRhY2hFdmVudCkge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGZ1bmMpIHtcbiAgICAgIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50TmFtZSwgZnVuYyk7XG4gICAgfTtcbiAgfVxufSkoKTtcblxuS2liby51bnJlZ2lzdGVyRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGlmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jLCBmYWxzZSk7XG4gICAgfTtcbiAgfVxuICBlbHNlIGlmKGRvY3VtZW50LmRldGFjaEV2ZW50KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgZnVuYykge1xuICAgICAgZWxlbWVudC5kZXRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCBmdW5jKTtcbiAgICB9O1xuICB9XG59KSgpO1xuXG5LaWJvLnN0cmluZ0NvbnRhaW5zID0gZnVuY3Rpb24oc3RyaW5nLCBzdWJzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5pbmRleE9mKHN1YnN0cmluZykgIT09IC0xO1xufTtcblxuS2liby5uZWF0U3RyaW5nID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpLnJlcGxhY2UoL1xccysvZywgJyAnKTtcbn07XG5cbktpYm8uY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXi4vLCBmdW5jdGlvbihtYXRjaCkgeyByZXR1cm4gbWF0Y2gudG9VcHBlckNhc2UoKTsgfSk7XG59O1xuXG5LaWJvLmlzU3RyaW5nID0gZnVuY3Rpb24od2hhdCkge1xuICByZXR1cm4gS2liby5zdHJpbmdDb250YWlucyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2hhdCksICdTdHJpbmcnKTtcbn07XG5cbktpYm8uYXJyYXlJbmNsdWRlcyA9IChmdW5jdGlvbigpIHtcbiAgaWYoQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgICAgcmV0dXJuIGhheXN0YWNrLmluZGV4T2YobmVlZGxlKSAhPT0gLTE7XG4gICAgfTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oaGF5c3RhY2ssIG5lZWRsZSkge1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGhheXN0YWNrLmxlbmd0aDsgaSsrKVxuICAgICAgICBpZihoYXlzdGFja1tpXSA9PT0gbmVlZGxlKVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH1cbn0pKCk7XG5cbktpYm8uZXh0cmFjdE1vZGlmaWVycyA9IGZ1bmN0aW9uKGtleUNvbWJpbmF0aW9uKSB7XG4gIHZhciBtb2RpZmllcnMsIGlcbiAgbW9kaWZpZXJzID0gW107XG4gIGZvcihpID0gMDsgaSA8IEtpYm8uTU9ESUZJRVJTLmxlbmd0aDsgaSsrKVxuICAgIGlmKEtpYm8uc3RyaW5nQ29udGFpbnMoa2V5Q29tYmluYXRpb24sIEtpYm8uTU9ESUZJRVJTW2ldKSlcbiAgICAgIG1vZGlmaWVycy5wdXNoKEtpYm8uTU9ESUZJRVJTW2ldKTtcbiAgcmV0dXJuIG1vZGlmaWVycztcbn1cblxuS2liby5leHRyYWN0S2V5ID0gZnVuY3Rpb24oa2V5Q29tYmluYXRpb24pIHtcbiAgdmFyIGtleXMsIGk7XG4gIGtleXMgPSBLaWJvLm5lYXRTdHJpbmcoa2V5Q29tYmluYXRpb24pLnNwbGl0KCcgJyk7XG4gIGZvcihpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspXG4gICAgaWYoIUtpYm8uYXJyYXlJbmNsdWRlcyhLaWJvLk1PRElGSUVSUywga2V5c1tpXSkpXG4gICAgICByZXR1cm4ga2V5c1tpXTtcbn07XG5cbktpYm8ubW9kaWZpZXJzQW5kS2V5ID0gZnVuY3Rpb24oa2V5Q29tYmluYXRpb24pIHtcbiAgdmFyIHJlc3VsdCwga2V5O1xuXG4gIGlmKEtpYm8uc3RyaW5nQ29udGFpbnMoa2V5Q29tYmluYXRpb24sICdhbnknKSkge1xuICAgIHJldHVybiBLaWJvLm5lYXRTdHJpbmcoa2V5Q29tYmluYXRpb24pLnNwbGl0KCcgJykuc2xpY2UoMCwgMikuam9pbignICcpO1xuICB9XG5cbiAgcmVzdWx0ID0gS2liby5leHRyYWN0TW9kaWZpZXJzKGtleUNvbWJpbmF0aW9uKTtcblxuICBrZXkgPSBLaWJvLmV4dHJhY3RLZXkoa2V5Q29tYmluYXRpb24pO1xuICBpZihrZXkgJiYgIUtpYm8uYXJyYXlJbmNsdWRlcyhLaWJvLk1PRElGSUVSUywga2V5KSlcbiAgICByZXN1bHQucHVzaChrZXkpO1xuXG4gIHJldHVybiByZXN1bHQuam9pbignICcpO1xufVxuXG5LaWJvLmtleU5hbWUgPSBmdW5jdGlvbihrZXlDb2RlKSB7XG4gIHJldHVybiBLaWJvLktFWV9OQU1FU19CWV9DT0RFW2tleUNvZGUgKyAnJ107XG59O1xuXG5LaWJvLmtleUNvZGUgPSBmdW5jdGlvbihrZXlOYW1lKSB7XG4gIHJldHVybiArS2liby5LRVlfQ09ERVNfQllfTkFNRVtrZXlOYW1lXTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGksIHRoYXQgPSB0aGlzO1xuXG4gIHRoaXMubGFzdEtleUNvZGUgPSAtMTtcbiAgdGhpcy5sYXN0TW9kaWZpZXJzID0ge307XG4gIGZvcihpID0gMDsgaSA8IEtpYm8uTU9ESUZJRVJTLmxlbmd0aDsgaSsrKVxuICAgIHRoaXMubGFzdE1vZGlmaWVyc1tLaWJvLk1PRElGSUVSU1tpXV0gPSBmYWxzZTtcblxuICB0aGlzLmtleXNEb3duID0geyBhbnk6IFtdIH07XG4gIHRoaXMua2V5c1VwID0geyBhbnk6IFtdIH07XG4gIHRoaXMuZG93bkhhbmRsZXIgPSB0aGlzLmhhbmRsZXIoJ2Rvd24nKTtcbiAgdGhpcy51cEhhbmRsZXIgPSB0aGlzLmhhbmRsZXIoJ3VwJyk7XG5cbiAgS2liby5yZWdpc3RlckV2ZW50KHRoaXMuZWxlbWVudCwgJ2tleWRvd24nLCB0aGlzLmRvd25IYW5kbGVyKTtcbiAgS2liby5yZWdpc3RlckV2ZW50KHRoaXMuZWxlbWVudCwgJ2tleXVwJywgdGhpcy51cEhhbmRsZXIpO1xuICBLaWJvLnJlZ2lzdGVyRXZlbnQod2luZG93LCAndW5sb2FkJywgZnVuY3Rpb24gdW5sb2FkZXIoKSB7XG4gICAgS2liby51bnJlZ2lzdGVyRXZlbnQodGhhdC5lbGVtZW50LCAna2V5ZG93bicsIHRoYXQuZG93bkhhbmRsZXIpO1xuICAgIEtpYm8udW5yZWdpc3RlckV2ZW50KHRoYXQuZWxlbWVudCwgJ2tleXVwJywgdGhhdC51cEhhbmRsZXIpO1xuICAgIEtpYm8udW5yZWdpc3RlckV2ZW50KHdpbmRvdywgJ3VubG9hZCcsIHVubG9hZGVyKTtcbiAgfSk7XG59O1xuXG5LaWJvLnByb3RvdHlwZS5oYW5kbGVyID0gZnVuY3Rpb24odXBPckRvd24pIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgIHZhciBpLCByZWdpc3RlcmVkS2V5cywgbGFzdE1vZGlmaWVyc0FuZEtleTtcblxuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcblxuICAgIHRoYXQubGFzdEtleUNvZGUgPSBlLmtleUNvZGU7XG4gICAgZm9yKGkgPSAwOyBpIDwgS2liby5NT0RJRklFUlMubGVuZ3RoOyBpKyspXG4gICAgICB0aGF0Lmxhc3RNb2RpZmllcnNbS2liby5NT0RJRklFUlNbaV1dID0gZVtLaWJvLk1PRElGSUVSU1tpXSArICdLZXknXTtcbiAgICBpZihLaWJvLmFycmF5SW5jbHVkZXMoS2liby5NT0RJRklFUlMsIEtpYm8ua2V5TmFtZSh0aGF0Lmxhc3RLZXlDb2RlKSkpXG4gICAgICB0aGF0Lmxhc3RNb2RpZmllcnNbS2liby5rZXlOYW1lKHRoYXQubGFzdEtleUNvZGUpXSA9IHRydWU7XG5cbiAgICByZWdpc3RlcmVkS2V5cyA9IHRoYXRbJ2tleXMnICsgS2liby5jYXBpdGFsaXplKHVwT3JEb3duKV07XG5cbiAgICBmb3IoaSA9IDA7IGkgPCByZWdpc3RlcmVkS2V5cy5hbnkubGVuZ3RoOyBpKyspXG4gICAgICBpZigocmVnaXN0ZXJlZEtleXMuYW55W2ldKGUpID09PSBmYWxzZSkgJiYgZS5wcmV2ZW50RGVmYXVsdClcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbGFzdE1vZGlmaWVyc0FuZEtleSA9IHRoYXQubGFzdE1vZGlmaWVyc0FuZEtleSgpO1xuICAgIGlmKHJlZ2lzdGVyZWRLZXlzW2xhc3RNb2RpZmllcnNBbmRLZXldKVxuICAgICAgZm9yKGkgPSAwOyBpIDwgcmVnaXN0ZXJlZEtleXNbbGFzdE1vZGlmaWVyc0FuZEtleV0ubGVuZ3RoOyBpKyspXG4gICAgICAgIGlmKChyZWdpc3RlcmVkS2V5c1tsYXN0TW9kaWZpZXJzQW5kS2V5XVtpXShlKSA9PT0gZmFsc2UpICYmIGUucHJldmVudERlZmF1bHQpXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xufTtcblxuS2liby5wcm90b3R5cGUucmVnaXN0ZXJLZXlzID0gZnVuY3Rpb24odXBPckRvd24sIG5ld0tleXMsIGZ1bmMpIHtcbiAgdmFyIGksIGtleXMsIHJlZ2lzdGVyZWRLZXlzID0gdGhpc1sna2V5cycgKyBLaWJvLmNhcGl0YWxpemUodXBPckRvd24pXTtcblxuICBpZihLaWJvLmlzU3RyaW5nKG5ld0tleXMpKVxuICAgIG5ld0tleXMgPSBbbmV3S2V5c107XG5cbiAgZm9yKGkgPSAwOyBpIDwgbmV3S2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleXMgPSBuZXdLZXlzW2ldO1xuICAgIGtleXMgPSBLaWJvLm1vZGlmaWVyc0FuZEtleShrZXlzICsgJycpO1xuXG4gICAgaWYocmVnaXN0ZXJlZEtleXNba2V5c10pXG4gICAgICByZWdpc3RlcmVkS2V5c1trZXlzXS5wdXNoKGZ1bmMpO1xuICAgIGVsc2VcbiAgICAgIHJlZ2lzdGVyZWRLZXlzW2tleXNdID0gW2Z1bmNdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5LaWJvLnByb3RvdHlwZS51bnJlZ2lzdGVyS2V5cyA9IGZ1bmN0aW9uKHVwT3JEb3duLCBuZXdLZXlzLCBmdW5jKSB7XG4gIHZhciBpLCBqLCBrZXlzLCByZWdpc3RlcmVkS2V5cyA9IHRoaXNbJ2tleXMnICsgS2liby5jYXBpdGFsaXplKHVwT3JEb3duKV07XG5cbiAgaWYoS2liby5pc1N0cmluZyhuZXdLZXlzKSlcbiAgICBuZXdLZXlzID0gW25ld0tleXNdO1xuXG4gIGZvcihpID0gMDsgaSA8IG5ld0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXlzID0gbmV3S2V5c1tpXTtcbiAgICBrZXlzID0gS2liby5tb2RpZmllcnNBbmRLZXkoa2V5cyArICcnKTtcblxuICAgIGlmKGZ1bmMgPT09IG51bGwpXG4gICAgICBkZWxldGUgcmVnaXN0ZXJlZEtleXNba2V5c107XG4gICAgZWxzZSB7XG4gICAgICBpZihyZWdpc3RlcmVkS2V5c1trZXlzXSkge1xuICAgICAgICBmb3IoaiA9IDA7IGogPCByZWdpc3RlcmVkS2V5c1trZXlzXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmKFN0cmluZyhyZWdpc3RlcmVkS2V5c1trZXlzXVtqXSkgPT09IFN0cmluZyhmdW5jKSkge1xuICAgICAgICAgICAgcmVnaXN0ZXJlZEtleXNba2V5c10uc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5LaWJvLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihrZXlzKSB7XG4gIHJldHVybiB0aGlzLnVucmVnaXN0ZXJLZXlzKCdkb3duJywga2V5cywgbnVsbCk7XG59XG5cbktpYm8ucHJvdG90eXBlLmRlbGVnYXRlID0gZnVuY3Rpb24odXBPckRvd24sIGtleXMsIGZ1bmMpIHtcbiAgcmV0dXJuIChmdW5jICE9PSBudWxsIHx8IGZ1bmMgIT09IHVuZGVmaW5lZCkgPyB0aGlzLnJlZ2lzdGVyS2V5cyh1cE9yRG93biwga2V5cywgZnVuYykgOiB0aGlzLnVucmVnaXN0ZXJLZXlzKHVwT3JEb3duLCBrZXlzLCBmdW5jKTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmRvd24gPSBmdW5jdGlvbihrZXlzLCBmdW5jKSB7XG4gIHJldHVybiB0aGlzLmRlbGVnYXRlKCdkb3duJywga2V5cywgZnVuYyk7XG59O1xuXG5LaWJvLnByb3RvdHlwZS51cCA9IGZ1bmN0aW9uKGtleXMsIGZ1bmMpIHtcbiAgcmV0dXJuIHRoaXMuZGVsZWdhdGUoJ3VwJywga2V5cywgZnVuYyk7XG59O1xuXG5LaWJvLnByb3RvdHlwZS5sYXN0S2V5ID0gZnVuY3Rpb24obW9kaWZpZXIpIHtcbiAgaWYoIW1vZGlmaWVyKVxuICAgIHJldHVybiBLaWJvLmtleU5hbWUodGhpcy5sYXN0S2V5Q29kZSk7XG5cbiAgcmV0dXJuIHRoaXMubGFzdE1vZGlmaWVyc1ttb2RpZmllcl07XG59O1xuXG5LaWJvLnByb3RvdHlwZS5sYXN0TW9kaWZpZXJzQW5kS2V5ID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXN1bHQsIGk7XG5cbiAgcmVzdWx0ID0gW107XG4gIGZvcihpID0gMDsgaSA8IEtpYm8uTU9ESUZJRVJTLmxlbmd0aDsgaSsrKVxuICAgIGlmKHRoaXMubGFzdEtleShLaWJvLk1PRElGSUVSU1tpXSkpXG4gICAgICByZXN1bHQucHVzaChLaWJvLk1PRElGSUVSU1tpXSk7XG5cbiAgaWYoIUtpYm8uYXJyYXlJbmNsdWRlcyhyZXN1bHQsIHRoaXMubGFzdEtleSgpKSlcbiAgICByZXN1bHQucHVzaCh0aGlzLmxhc3RLZXkoKSk7XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtpYm87XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbWVkaWFfY29udHJvbCcpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIFRoZSBtZWRpYXRvciBpcyBhIHNpbmdsZXRvbiBmb3IgaGFuZGxpbmcgZ2xvYmFsIGV2ZW50cy5cbiAqL1xuXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcblxudmFyIGV2ZW50cyA9IG5ldyBFdmVudHMoKVxuXG5jbGFzcyBNZWRpYXRvciB7XG59XG5cbk1lZGlhdG9yLm9uID0gZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgZXZlbnRzLm9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KVxuICByZXR1cm5cbn1cblxuTWVkaWF0b3Iub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIGV2ZW50cy5vbmNlKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KVxuICByZXR1cm5cbn1cblxuTWVkaWF0b3Iub2ZmID0gZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgZXZlbnRzLm9mZihuYW1lLCBjYWxsYmFjaywgY29udGV4dClcbiAgcmV0dXJuXG59XG5cbk1lZGlhdG9yLnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lLCBvcHRzKSB7XG4gIGV2ZW50cy50cmlnZ2VyKG5hbWUsIG9wdHMpXG4gIHJldHVyblxufVxuXG5NZWRpYXRvci5zdG9wTGlzdGVuaW5nID0gZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICBldmVudHMuc3RvcExpc3RlbmluZyhvYmosIG5hbWUsIGNhbGxiYWNrKVxuICByZXR1cm5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNZWRpYXRvclxuIiwidmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgndWlfb2JqZWN0JylcblxuY2xhc3MgUGxheWJhY2sgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc2V0dGluZ3MgPSB7fVxuICB9XG5cbiAgcGxheSgpIHt9XG5cbiAgcGF1c2UoKSB7fVxuXG4gIHN0b3AoKSB7fVxuXG4gIHNlZWsodGltZSkge31cblxuICBnZXREdXJhdGlvbigpIHsgcmV0dXJuIDAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gJ25vX29wJ1xuICB9XG5cbiAgaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxufVxuXG5QbGF5YmFjay5jYW5QbGF5ID0gKHNvdXJjZSkgPT4ge1xuICByZXR1cm4gZmFsc2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5YmFja1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXllckluZm8gPXtcbiAgb3B0aW9uczoge30sXG4gIHBsYXliYWNrUGx1Z2luczogW10sXG4gIGN1cnJlbnRTaXplOiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllckluZm9cblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3Bvc3RlcicpO1xuXG4iLCIvLyBTaW1wbGUgSmF2YVNjcmlwdCBUZW1wbGF0aW5nXG4vLyBQYXVsIE1pbGxlciAoaHR0cDovL3BhdWxtaWxsci5jb20pXG4vLyBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuLy8gKGMpIDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuKGZ1bmN0aW9uKGdsb2JhbHMpIHtcbiAgLy8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXG4gIC8vIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAgdmFyIHNldHRpbmdzID0ge1xuICAgIGV2YWx1YXRlICAgIDogLzwlKFtcXHNcXFNdKz8pJT4vZyxcbiAgICBpbnRlcnBvbGF0ZSA6IC88JT0oW1xcc1xcU10rPyklPi9nLFxuICAgIGVzY2FwZSAgICAgIDogLzwlLShbXFxzXFxTXSs/KSU+L2dcbiAgfTtcblxuICAvLyBXaGVuIGN1c3RvbWl6aW5nIGB0ZW1wbGF0ZVNldHRpbmdzYCwgaWYgeW91IGRvbid0IHdhbnQgdG8gZGVmaW5lIGFuXG4gIC8vIGludGVycG9sYXRpb24sIGV2YWx1YXRpb24gb3IgZXNjYXBpbmcgcmVnZXgsIHdlIG5lZWQgb25lIHRoYXQgaXNcbiAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXG4gIHZhciBub01hdGNoID0gLyguKV4vO1xuXG4gIC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4gIC8vIHN0cmluZyBsaXRlcmFsLlxuICB2YXIgZXNjYXBlcyA9IHtcbiAgICBcIidcIjogICAgICBcIidcIixcbiAgICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICAgJ1xccic6ICAgICAncicsXG4gICAgJ1xcbic6ICAgICAnbicsXG4gICAgJ1xcdCc6ICAgICAndCcsXG4gICAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ3UyMDI5J1xuICB9O1xuXG4gIHZhciBlc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdHxcXHUyMDI4fFxcdTIwMjkvZztcblxuICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxuICB2YXIgaHRtbEVudGl0aWVzID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjeDI3OydcbiAgfTtcblxuICB2YXIgZW50aXR5UmUgPSBuZXcgUmVnRXhwKCdbJjw+XCJcXCddJywgJ2cnKTtcblxuICB2YXIgZXNjYXBlRXhwciA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIGlmIChzdHJpbmcgPT0gbnVsbCkgcmV0dXJuICcnO1xuICAgIHJldHVybiAoJycgKyBzdHJpbmcpLnJlcGxhY2UoZW50aXR5UmUsIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICByZXR1cm4gaHRtbEVudGl0aWVzW21hdGNoXTtcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgY291bnRlciA9IDA7XG5cbiAgLy8gSmF2YVNjcmlwdCBtaWNyby10ZW1wbGF0aW5nLCBzaW1pbGFyIHRvIEpvaG4gUmVzaWcncyBpbXBsZW1lbnRhdGlvbi5cbiAgLy8gVW5kZXJzY29yZSB0ZW1wbGF0aW5nIGhhbmRsZXMgYXJiaXRyYXJ5IGRlbGltaXRlcnMsIHByZXNlcnZlcyB3aGl0ZXNwYWNlLFxuICAvLyBhbmQgY29ycmVjdGx5IGVzY2FwZXMgcXVvdGVzIHdpdGhpbiBpbnRlcnBvbGF0ZWQgY29kZS5cbiAgdmFyIHRtcGwgPSBmdW5jdGlvbih0ZXh0LCBkYXRhKSB7XG4gICAgdmFyIHJlbmRlcjtcblxuICAgIC8vIENvbWJpbmUgZGVsaW1pdGVycyBpbnRvIG9uZSByZWd1bGFyIGV4cHJlc3Npb24gdmlhIGFsdGVybmF0aW9uLlxuICAgIHZhciBtYXRjaGVyID0gbmV3IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldClcbiAgICAgICAgLnJlcGxhY2UoZXNjYXBlciwgZnVuY3Rpb24obWF0Y2gpIHsgcmV0dXJuICdcXFxcJyArIGVzY2FwZXNbbWF0Y2hdOyB9KTtcblxuICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGVzY2FwZSArIFwiKSk9PW51bGw/Jyc6ZXNjYXBlRXhwcihfX3QpKStcXG4nXCI7XG4gICAgICB9XG4gICAgICBpZiAoaW50ZXJwb2xhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBpbnRlcnBvbGF0ZSArIFwiKSk9PW51bGw/Jyc6X190KStcXG4nXCI7XG4gICAgICB9XG4gICAgICBpZiAoZXZhbHVhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJztcXG5cIiArIGV2YWx1YXRlICsgXCJcXG5fX3ArPSdcIjtcbiAgICAgIH1cbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuICAgIHNvdXJjZSArPSBcIic7XFxuXCI7XG5cbiAgICAvLyBJZiBhIHZhcmlhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIHBsYWNlIGRhdGEgdmFsdWVzIGluIGxvY2FsIHNjb3BlLlxuICAgIGlmICghc2V0dGluZ3MudmFyaWFibGUpIHNvdXJjZSA9ICd3aXRoKG9ianx8e30pe1xcbicgKyBzb3VyY2UgKyAnfVxcbic7XG5cbiAgICBzb3VyY2UgPSBcInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIiArXG4gICAgICBcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIgK1xuICAgICAgc291cmNlICsgXCJyZXR1cm4gX19wO1xcbi8vIyBzb3VyY2VVUkw9L21pY3JvdGVtcGxhdGVzL3NvdXJjZVtcIiArIGNvdW50ZXIrKyArIFwiXVwiO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlbmRlciA9IG5ldyBGdW5jdGlvbihzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJywgJ2VzY2FwZUV4cHInLCBzb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUuc291cmNlID0gc291cmNlO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSkgcmV0dXJuIHJlbmRlcihkYXRhLCBlc2NhcGVFeHByKTtcbiAgICB2YXIgdGVtcGxhdGUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVuZGVyLmNhbGwodGhpcywgZGF0YSwgZXNjYXBlRXhwcik7XG4gICAgfTtcblxuICAgIC8vIFByb3ZpZGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uIHNvdXJjZSBhcyBhIGNvbnZlbmllbmNlIGZvciBwcmVjb21waWxhdGlvbi5cbiAgICB0ZW1wbGF0ZS5zb3VyY2UgPSAnZnVuY3Rpb24oJyArIChzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJykgKyAnKXtcXG4nICsgc291cmNlICsgJ30nO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9O1xuICB0bXBsLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0bXBsO1xuICAgIH0pOyAvLyBSZXF1aXJlSlNcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gdG1wbDsgLy8gQ29tbW9uSlNcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWxzLm1pY3JvdGVtcGxhdGUgPSB0bXBsOyAvLyA8c2NyaXB0PlxuICB9XG59KSh0aGlzKTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBVSU9iamVjdCA9IHJlcXVpcmUoJ3VpX29iamVjdCcpXG5cbmNsYXNzIFVJQ29udGFpbmVyUGx1Z2luIGV4dGVuZHMgVUlPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgICAgIHRoaXMuJGVsLnNob3coKVxuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZSgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVSUNvbnRhaW5lclBsdWdpblxuIiwidmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgndWlfb2JqZWN0JylcblxuY2xhc3MgVUlDb3JlUGx1Z2luIGV4dGVuZHMgVUlPYmplY3Qge1xuICBjb25zdHJ1Y3Rvcihjb3JlKSB7XG4gICAgc3VwZXIoY29yZSlcbiAgICB0aGlzLmNvcmUgPSBjb3JlXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIHRoaXMuYmluZEV2ZW50cygpXG4gICAgdGhpcy5yZW5kZXIoKVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHt9XG5cbiAgZ2V0RXh0ZXJuYWxJbnRlcmZhY2UoKSB7IHJldHVybiB7fSB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmJpbmRFdmVudHMoKVxuICAgICAgdGhpcy4kZWwuc2hvdygpXG4gICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHRoaXMuJGVsLmhpZGUoKVxuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQodGhpcy5zdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKSlcbiAgICB0aGlzLmNvcmUuJGVsLmFwcGVuZCh0aGlzLmVsKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVSUNvcmVQbHVnaW5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciAkID0gcmVxdWlyZSgnemVwdG8nKVxudmFyIHVuaXF1ZUlkID0gcmVxdWlyZSgnLi91dGlscycpLnVuaXF1ZUlkXG52YXIgcmVzdWx0ID0gcmVxdWlyZSgnbG9kYXNoLnJlc3VsdCcpXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJ2Jhc2Vfb2JqZWN0JylcblxudmFyIGRlbGVnYXRlRXZlbnRTcGxpdHRlciA9IC9eKFxcUyspXFxzKiguKikkL1xuXG5jbGFzcyBVSU9iamVjdCBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ2RpdicgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuY2lkID0gdW5pcXVlSWQoJ2MnKTtcbiAgICB0aGlzLl9lbnN1cmVFbGVtZW50KCk7XG4gICAgdGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuICB9XG5cbiAgJChzZWxlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLiRlbC5maW5kKHNlbGVjdG9yKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXRFbGVtZW50KGVsZW1lbnQsIGRlbGVnYXRlKSB7XG4gICAgaWYgKHRoaXMuJGVsKSB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKVxuICAgIHRoaXMuJGVsID0gZWxlbWVudCBpbnN0YW5jZW9mICQgPyBlbGVtZW50IDogJChlbGVtZW50KVxuICAgIHRoaXMuZWwgPSB0aGlzLiRlbFswXVxuICAgIGlmIChkZWxlZ2F0ZSAhPT0gZmFsc2UpIHRoaXMuZGVsZWdhdGVFdmVudHMoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBkZWxlZ2F0ZUV2ZW50cyhldmVudHMpIHtcbiAgICBpZiAoIShldmVudHMgfHwgKGV2ZW50cyA9IHJlc3VsdCh0aGlzLCAnZXZlbnRzJykpKSkgcmV0dXJuIHRoaXNcbiAgICB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKVxuICAgIGZvciAodmFyIGtleSBpbiBldmVudHMpIHtcbiAgICAgIHZhciBtZXRob2QgPSBldmVudHNba2V5XVxuICAgICAgaWYgKChtZXRob2QgJiYgbWV0aG9kLmNvbnN0cnVjdG9yICE9PSBGdW5jdGlvbikpIG1ldGhvZCA9IHRoaXNbZXZlbnRzW2tleV1dXG4gICAgICBpZiAoIW1ldGhvZCkgY29udGludWVcblxuICAgICAgdmFyIG1hdGNoID0ga2V5Lm1hdGNoKGRlbGVnYXRlRXZlbnRTcGxpdHRlcilcbiAgICAgIHZhciBldmVudE5hbWUgPSBtYXRjaFsxXSwgc2VsZWN0b3IgPSBtYXRjaFsyXVxuICAgICAgLy9tZXRob2QgPSBfLmJpbmQobWV0aG9kLCB0aGlzKVxuICAgICAgZXZlbnROYW1lICs9ICcuZGVsZWdhdGVFdmVudHMnICsgdGhpcy5jaWRcbiAgICAgIGlmIChzZWxlY3RvciA9PT0gJycpIHtcbiAgICAgICAgdGhpcy4kZWwub24oZXZlbnROYW1lLCBtZXRob2QuYmluZCh0aGlzKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsLm9uKGV2ZW50TmFtZSwgc2VsZWN0b3IsIG1ldGhvZC5iaW5kKHRoaXMpKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdW5kZWxlZ2F0ZUV2ZW50cygpIHtcbiAgICB0aGlzLiRlbC5vZmYoJy5kZWxlZ2F0ZUV2ZW50cycgKyB0aGlzLmNpZClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgX2Vuc3VyZUVsZW1lbnQoKSB7XG4gICAgaWYgKCF0aGlzLmVsKSB7XG4gICAgICB2YXIgYXR0cnMgPSBhc3NpZ24oe30sIHJlc3VsdCh0aGlzLCAnYXR0cmlidXRlcycpKVxuICAgICAgaWYgKHRoaXMuaWQpIGF0dHJzLmlkID0gcmVzdWx0KHRoaXMsICdpZCcpXG4gICAgICBpZiAodGhpcy5jbGFzc05hbWUpIGF0dHJzWydjbGFzcyddID0gcmVzdWx0KHRoaXMsICdjbGFzc05hbWUnKVxuICAgICAgdmFyICRlbCA9ICQoJzwnICsgcmVzdWx0KHRoaXMsICd0YWdOYW1lJykgKyAnPicpLmF0dHIoYXR0cnMpXG4gICAgICB0aGlzLnNldEVsZW1lbnQoJGVsLCBmYWxzZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRFbGVtZW50KHJlc3VsdCh0aGlzLCAnZWwnKSwgZmFsc2UpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVUlPYmplY3RcbiIsIi8qIFplcHRvIHYxLjEuNC04MC1nYTkxODRiMiAtIHplcHRvIGV2ZW50IGFqYXggY2FsbGJhY2tzIGRlZmVycmVkIHRvdWNoIHNlbGVjdG9yIGllIC0gemVwdG9qcy5jb20vbGljZW5zZSAqL1xudmFyIFplcHRvPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gRCh0KXtyZXR1cm4gbnVsbD09dD9TdHJpbmcodCk6altTLmNhbGwodCldfHxcIm9iamVjdFwifWZ1bmN0aW9uIEwodCl7cmV0dXJuXCJmdW5jdGlvblwiPT1EKHQpfWZ1bmN0aW9uIGsodCl7cmV0dXJuIG51bGwhPXQmJnQ9PXQud2luZG93fWZ1bmN0aW9uIFoodCl7cmV0dXJuIG51bGwhPXQmJnQubm9kZVR5cGU9PXQuRE9DVU1FTlRfTk9ERX1mdW5jdGlvbiAkKHQpe3JldHVyblwib2JqZWN0XCI9PUQodCl9ZnVuY3Rpb24gRih0KXtyZXR1cm4gJCh0KSYmIWsodCkmJk9iamVjdC5nZXRQcm90b3R5cGVPZih0KT09T2JqZWN0LnByb3RvdHlwZX1mdW5jdGlvbiBSKHQpe3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiB0Lmxlbmd0aH1mdW5jdGlvbiBxKHQpe3JldHVybiBzLmNhbGwodCxmdW5jdGlvbih0KXtyZXR1cm4gbnVsbCE9dH0pfWZ1bmN0aW9uIFcodCl7cmV0dXJuIHQubGVuZ3RoPjA/bi5mbi5jb25jYXQuYXBwbHkoW10sdCk6dH1mdW5jdGlvbiB6KHQpe3JldHVybiB0LnJlcGxhY2UoLzo6L2csXCIvXCIpLnJlcGxhY2UoLyhbQS1aXSspKFtBLVpdW2Etel0pL2csXCIkMV8kMlwiKS5yZXBsYWNlKC8oW2EtelxcZF0pKFtBLVpdKS9nLFwiJDFfJDJcIikucmVwbGFjZSgvXy9nLFwiLVwiKS50b0xvd2VyQ2FzZSgpfWZ1bmN0aW9uIEgodCl7cmV0dXJuIHQgaW4gYz9jW3RdOmNbdF09bmV3IFJlZ0V4cChcIihefFxcXFxzKVwiK3QrXCIoXFxcXHN8JClcIil9ZnVuY3Rpb24gXyh0LGUpe3JldHVyblwibnVtYmVyXCIhPXR5cGVvZiBlfHxsW3oodCldP2U6ZStcInB4XCJ9ZnVuY3Rpb24gSSh0KXt2YXIgZSxuO3JldHVybiBmW3RdfHwoZT11LmNyZWF0ZUVsZW1lbnQodCksdS5ib2R5LmFwcGVuZENoaWxkKGUpLG49Z2V0Q29tcHV0ZWRTdHlsZShlLFwiXCIpLmdldFByb3BlcnR5VmFsdWUoXCJkaXNwbGF5XCIpLGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlKSxcIm5vbmVcIj09biYmKG49XCJibG9ja1wiKSxmW3RdPW4pLGZbdF19ZnVuY3Rpb24gVSh0KXtyZXR1cm5cImNoaWxkcmVuXCJpbiB0P2EuY2FsbCh0LmNoaWxkcmVuKTpuLm1hcCh0LmNoaWxkTm9kZXMsZnVuY3Rpb24odCl7cmV0dXJuIDE9PXQubm9kZVR5cGU/dDp2b2lkIDB9KX1mdW5jdGlvbiBYKHQsZSl7dmFyIG4saT10P3QubGVuZ3RoOjA7Zm9yKG49MDtpPm47bisrKXRoaXNbbl09dFtuXTt0aGlzLmxlbmd0aD1pLHRoaXMuc2VsZWN0b3I9ZXx8XCJcIn1mdW5jdGlvbiBCKG4saSxyKXtmb3IoZSBpbiBpKXImJihGKGlbZV0pfHxBKGlbZV0pKT8oRihpW2VdKSYmIUYobltlXSkmJihuW2VdPXt9KSxBKGlbZV0pJiYhQShuW2VdKSYmKG5bZV09W10pLEIobltlXSxpW2VdLHIpKTppW2VdIT09dCYmKG5bZV09aVtlXSl9ZnVuY3Rpb24gVih0LGUpe3JldHVybiBudWxsPT1lP24odCk6bih0KS5maWx0ZXIoZSl9ZnVuY3Rpb24gWSh0LGUsbixpKXtyZXR1cm4gTChlKT9lLmNhbGwodCxuLGkpOmV9ZnVuY3Rpb24gSih0LGUsbil7bnVsbD09bj90LnJlbW92ZUF0dHJpYnV0ZShlKTp0LnNldEF0dHJpYnV0ZShlLG4pfWZ1bmN0aW9uIEcoZSxuKXt2YXIgaT1lLmNsYXNzTmFtZXx8XCJcIixyPWkmJmkuYmFzZVZhbCE9PXQ7cmV0dXJuIG49PT10P3I/aS5iYXNlVmFsOmk6dm9pZChyP2kuYmFzZVZhbD1uOmUuY2xhc3NOYW1lPW4pfWZ1bmN0aW9uIEsodCl7dHJ5e3JldHVybiB0P1widHJ1ZVwiPT10fHwoXCJmYWxzZVwiPT10PyExOlwibnVsbFwiPT10P251bGw6K3QrXCJcIj09dD8rdDovXltcXFtcXHtdLy50ZXN0KHQpP24ucGFyc2VKU09OKHQpOnQpOnR9Y2F0Y2goZSl7cmV0dXJuIHR9fWZ1bmN0aW9uIFEodCxlKXtlKHQpO2Zvcih2YXIgbj0wLGk9dC5jaGlsZE5vZGVzLmxlbmd0aDtpPm47bisrKVEodC5jaGlsZE5vZGVzW25dLGUpfXZhciB0LGUsbixpLE4sUCxyPVtdLG89ci5jb25jYXQscz1yLmZpbHRlcixhPXIuc2xpY2UsdT13aW5kb3cuZG9jdW1lbnQsZj17fSxjPXt9LGw9e1wiY29sdW1uLWNvdW50XCI6MSxjb2x1bW5zOjEsXCJmb250LXdlaWdodFwiOjEsXCJsaW5lLWhlaWdodFwiOjEsb3BhY2l0eToxLFwiei1pbmRleFwiOjEsem9vbToxfSxoPS9eXFxzKjwoXFx3K3whKVtePl0qPi8scD0vXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8sZD0vPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbXFx3Ol0rKVtePl0qKVxcLz4vZ2ksbT0vXig/OmJvZHl8aHRtbCkkL2ksZz0vKFtBLVpdKS9nLHY9W1widmFsXCIsXCJjc3NcIixcImh0bWxcIixcInRleHRcIixcImRhdGFcIixcIndpZHRoXCIsXCJoZWlnaHRcIixcIm9mZnNldFwiXSx5PVtcImFmdGVyXCIsXCJwcmVwZW5kXCIsXCJiZWZvcmVcIixcImFwcGVuZFwiXSx3PXUuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpLHg9dS5jcmVhdGVFbGVtZW50KFwidHJcIiksYj17dHI6dS5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiksdGJvZHk6dyx0aGVhZDp3LHRmb290OncsdGQ6eCx0aDp4LFwiKlwiOnUuY3JlYXRlRWxlbWVudChcImRpdlwiKX0sRT0vY29tcGxldGV8bG9hZGVkfGludGVyYWN0aXZlLyxUPS9eW1xcdy1dKiQvLGo9e30sUz1qLnRvU3RyaW5nLEM9e30sTz11LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksTT17dGFiaW5kZXg6XCJ0YWJJbmRleFwiLHJlYWRvbmx5OlwicmVhZE9ubHlcIixcImZvclwiOlwiaHRtbEZvclwiLFwiY2xhc3NcIjpcImNsYXNzTmFtZVwiLG1heGxlbmd0aDpcIm1heExlbmd0aFwiLGNlbGxzcGFjaW5nOlwiY2VsbFNwYWNpbmdcIixjZWxscGFkZGluZzpcImNlbGxQYWRkaW5nXCIscm93c3BhbjpcInJvd1NwYW5cIixjb2xzcGFuOlwiY29sU3BhblwiLHVzZW1hcDpcInVzZU1hcFwiLGZyYW1lYm9yZGVyOlwiZnJhbWVCb3JkZXJcIixjb250ZW50ZWRpdGFibGU6XCJjb250ZW50RWRpdGFibGVcIn0sQT1BcnJheS5pc0FycmF5fHxmdW5jdGlvbih0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIEFycmF5fTtyZXR1cm4gQy5tYXRjaGVzPWZ1bmN0aW9uKHQsZSl7aWYoIWV8fCF0fHwxIT09dC5ub2RlVHlwZSlyZXR1cm4hMTt2YXIgbj10LndlYmtpdE1hdGNoZXNTZWxlY3Rvcnx8dC5tb3pNYXRjaGVzU2VsZWN0b3J8fHQub01hdGNoZXNTZWxlY3Rvcnx8dC5tYXRjaGVzU2VsZWN0b3I7aWYobilyZXR1cm4gbi5jYWxsKHQsZSk7dmFyIGkscj10LnBhcmVudE5vZGUsbz0hcjtyZXR1cm4gbyYmKHI9TykuYXBwZW5kQ2hpbGQodCksaT1+Qy5xc2EocixlKS5pbmRleE9mKHQpLG8mJk8ucmVtb3ZlQ2hpbGQodCksaX0sTj1mdW5jdGlvbih0KXtyZXR1cm4gdC5yZXBsYWNlKC8tKyguKT8vZyxmdW5jdGlvbih0LGUpe3JldHVybiBlP2UudG9VcHBlckNhc2UoKTpcIlwifSl9LFA9ZnVuY3Rpb24odCl7cmV0dXJuIHMuY2FsbCh0LGZ1bmN0aW9uKGUsbil7cmV0dXJuIHQuaW5kZXhPZihlKT09bn0pfSxDLmZyYWdtZW50PWZ1bmN0aW9uKGUsaSxyKXt2YXIgbyxzLGY7cmV0dXJuIHAudGVzdChlKSYmKG89bih1LmNyZWF0ZUVsZW1lbnQoUmVnRXhwLiQxKSkpLG98fChlLnJlcGxhY2UmJihlPWUucmVwbGFjZShkLFwiPCQxPjwvJDI+XCIpKSxpPT09dCYmKGk9aC50ZXN0KGUpJiZSZWdFeHAuJDEpLGkgaW4gYnx8KGk9XCIqXCIpLGY9YltpXSxmLmlubmVySFRNTD1cIlwiK2Usbz1uLmVhY2goYS5jYWxsKGYuY2hpbGROb2RlcyksZnVuY3Rpb24oKXtmLnJlbW92ZUNoaWxkKHRoaXMpfSkpLEYocikmJihzPW4obyksbi5lYWNoKHIsZnVuY3Rpb24odCxlKXt2LmluZGV4T2YodCk+LTE/c1t0XShlKTpzLmF0dHIodCxlKX0pKSxvfSxDLlo9ZnVuY3Rpb24odCxlKXtyZXR1cm4gbmV3IFgodCxlKX0sQy5pc1o9ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBDLlp9LEMuaW5pdD1mdW5jdGlvbihlLGkpe3ZhciByO2lmKCFlKXJldHVybiBDLlooKTtpZihcInN0cmluZ1wiPT10eXBlb2YgZSlpZihlPWUudHJpbSgpLFwiPFwiPT1lWzBdJiZoLnRlc3QoZSkpcj1DLmZyYWdtZW50KGUsUmVnRXhwLiQxLGkpLGU9bnVsbDtlbHNle2lmKGkhPT10KXJldHVybiBuKGkpLmZpbmQoZSk7cj1DLnFzYSh1LGUpfWVsc2V7aWYoTChlKSlyZXR1cm4gbih1KS5yZWFkeShlKTtpZihDLmlzWihlKSlyZXR1cm4gZTtpZihBKGUpKXI9cShlKTtlbHNlIGlmKCQoZSkpcj1bZV0sZT1udWxsO2Vsc2UgaWYoaC50ZXN0KGUpKXI9Qy5mcmFnbWVudChlLnRyaW0oKSxSZWdFeHAuJDEsaSksZT1udWxsO2Vsc2V7aWYoaSE9PXQpcmV0dXJuIG4oaSkuZmluZChlKTtyPUMucXNhKHUsZSl9fXJldHVybiBDLloocixlKX0sbj1mdW5jdGlvbih0LGUpe3JldHVybiBDLmluaXQodCxlKX0sbi5leHRlbmQ9ZnVuY3Rpb24odCl7dmFyIGUsbj1hLmNhbGwoYXJndW1lbnRzLDEpO3JldHVyblwiYm9vbGVhblwiPT10eXBlb2YgdCYmKGU9dCx0PW4uc2hpZnQoKSksbi5mb3JFYWNoKGZ1bmN0aW9uKG4pe0IodCxuLGUpfSksdH0sQy5xc2E9ZnVuY3Rpb24odCxlKXt2YXIgbixpPVwiI1wiPT1lWzBdLHI9IWkmJlwiLlwiPT1lWzBdLG89aXx8cj9lLnNsaWNlKDEpOmUscz1ULnRlc3Qobyk7cmV0dXJuIHQuZ2V0RWxlbWVudEJ5SWQmJnMmJmk/KG49dC5nZXRFbGVtZW50QnlJZChvKSk/W25dOltdOjEhPT10Lm5vZGVUeXBlJiY5IT09dC5ub2RlVHlwZSYmMTEhPT10Lm5vZGVUeXBlP1tdOmEuY2FsbChzJiYhaSYmdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lP3I/dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG8pOnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSk6dC5xdWVyeVNlbGVjdG9yQWxsKGUpKX0sbi5jb250YWlucz11LmRvY3VtZW50RWxlbWVudC5jb250YWlucz9mdW5jdGlvbih0LGUpe3JldHVybiB0IT09ZSYmdC5jb250YWlucyhlKX06ZnVuY3Rpb24odCxlKXtmb3IoO2UmJihlPWUucGFyZW50Tm9kZSk7KWlmKGU9PT10KXJldHVybiEwO3JldHVybiExfSxuLnR5cGU9RCxuLmlzRnVuY3Rpb249TCxuLmlzV2luZG93PWssbi5pc0FycmF5PUEsbi5pc1BsYWluT2JqZWN0PUYsbi5pc0VtcHR5T2JqZWN0PWZ1bmN0aW9uKHQpe3ZhciBlO2ZvcihlIGluIHQpcmV0dXJuITE7cmV0dXJuITB9LG4uaW5BcnJheT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHIuaW5kZXhPZi5jYWxsKGUsdCxuKX0sbi5jYW1lbENhc2U9TixuLnRyaW09ZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXQ/XCJcIjpTdHJpbmcucHJvdG90eXBlLnRyaW0uY2FsbCh0KX0sbi51dWlkPTAsbi5zdXBwb3J0PXt9LG4uZXhwcj17fSxuLm5vb3A9ZnVuY3Rpb24oKXt9LG4ubWFwPWZ1bmN0aW9uKHQsZSl7dmFyIG4scixvLGk9W107aWYoUih0KSlmb3Iocj0wO3I8dC5sZW5ndGg7cisrKW49ZSh0W3JdLHIpLG51bGwhPW4mJmkucHVzaChuKTtlbHNlIGZvcihvIGluIHQpbj1lKHRbb10sbyksbnVsbCE9biYmaS5wdXNoKG4pO3JldHVybiBXKGkpfSxuLmVhY2g9ZnVuY3Rpb24odCxlKXt2YXIgbixpO2lmKFIodCkpe2ZvcihuPTA7bjx0Lmxlbmd0aDtuKyspaWYoZS5jYWxsKHRbbl0sbix0W25dKT09PSExKXJldHVybiB0fWVsc2UgZm9yKGkgaW4gdClpZihlLmNhbGwodFtpXSxpLHRbaV0pPT09ITEpcmV0dXJuIHQ7cmV0dXJuIHR9LG4uZ3JlcD1mdW5jdGlvbih0LGUpe3JldHVybiBzLmNhbGwodCxlKX0sd2luZG93LkpTT04mJihuLnBhcnNlSlNPTj1KU09OLnBhcnNlKSxuLmVhY2goXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yXCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKHQsZSl7altcIltvYmplY3QgXCIrZStcIl1cIl09ZS50b0xvd2VyQ2FzZSgpfSksbi5mbj17Y29uc3RydWN0b3I6Qy5aLGxlbmd0aDowLGZvckVhY2g6ci5mb3JFYWNoLHJlZHVjZTpyLnJlZHVjZSxwdXNoOnIucHVzaCxzb3J0OnIuc29ydCxzcGxpY2U6ci5zcGxpY2UsaW5kZXhPZjpyLmluZGV4T2YsY29uY2F0OmZ1bmN0aW9uKCl7dmFyIHQsZSxuPVtdO2Zvcih0PTA7dDxhcmd1bWVudHMubGVuZ3RoO3QrKyllPWFyZ3VtZW50c1t0XSxuW3RdPUMuaXNaKGUpP2UudG9BcnJheSgpOmU7cmV0dXJuIG8uYXBwbHkoQy5pc1oodGhpcyk/dGhpcy50b0FycmF5KCk6dGhpcyxuKX0sbWFwOmZ1bmN0aW9uKHQpe3JldHVybiBuKG4ubWFwKHRoaXMsZnVuY3Rpb24oZSxuKXtyZXR1cm4gdC5jYWxsKGUsbixlKX0pKX0sc2xpY2U6ZnVuY3Rpb24oKXtyZXR1cm4gbihhLmFwcGx5KHRoaXMsYXJndW1lbnRzKSl9LHJlYWR5OmZ1bmN0aW9uKHQpe3JldHVybiBFLnRlc3QodS5yZWFkeVN0YXRlKSYmdS5ib2R5P3Qobik6dS5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKCl7dChuKX0sITEpLHRoaXN9LGdldDpmdW5jdGlvbihlKXtyZXR1cm4gZT09PXQ/YS5jYWxsKHRoaXMpOnRoaXNbZT49MD9lOmUrdGhpcy5sZW5ndGhdfSx0b0FycmF5OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KCl9LHNpemU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sZW5ndGh9LHJlbW92ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtudWxsIT10aGlzLnBhcmVudE5vZGUmJnRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKX0pfSxlYWNoOmZ1bmN0aW9uKHQpe3JldHVybiByLmV2ZXJ5LmNhbGwodGhpcyxmdW5jdGlvbihlLG4pe3JldHVybiB0LmNhbGwoZSxuLGUpIT09ITF9KSx0aGlzfSxmaWx0ZXI6ZnVuY3Rpb24odCl7cmV0dXJuIEwodCk/dGhpcy5ub3QodGhpcy5ub3QodCkpOm4ocy5jYWxsKHRoaXMsZnVuY3Rpb24oZSl7cmV0dXJuIEMubWF0Y2hlcyhlLHQpfSkpfSxhZGQ6ZnVuY3Rpb24odCxlKXtyZXR1cm4gbihQKHRoaXMuY29uY2F0KG4odCxlKSkpKX0saXM6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMubGVuZ3RoPjAmJkMubWF0Y2hlcyh0aGlzWzBdLHQpfSxub3Q6ZnVuY3Rpb24oZSl7dmFyIGk9W107aWYoTChlKSYmZS5jYWxsIT09dCl0aGlzLmVhY2goZnVuY3Rpb24odCl7ZS5jYWxsKHRoaXMsdCl8fGkucHVzaCh0aGlzKX0pO2Vsc2V7dmFyIHI9XCJzdHJpbmdcIj09dHlwZW9mIGU/dGhpcy5maWx0ZXIoZSk6UihlKSYmTChlLml0ZW0pP2EuY2FsbChlKTpuKGUpO3RoaXMuZm9yRWFjaChmdW5jdGlvbih0KXtyLmluZGV4T2YodCk8MCYmaS5wdXNoKHQpfSl9cmV0dXJuIG4oaSl9LGhhczpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oKXtyZXR1cm4gJCh0KT9uLmNvbnRhaW5zKHRoaXMsdCk6bih0aGlzKS5maW5kKHQpLnNpemUoKX0pfSxlcTpmdW5jdGlvbih0KXtyZXR1cm4tMT09PXQ/dGhpcy5zbGljZSh0KTp0aGlzLnNsaWNlKHQsK3QrMSl9LGZpcnN0OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpc1swXTtyZXR1cm4gdCYmISQodCk/dDpuKHQpfSxsYXN0OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpc1t0aGlzLmxlbmd0aC0xXTtyZXR1cm4gdCYmISQodCk/dDpuKHQpfSxmaW5kOmZ1bmN0aW9uKHQpe3ZhciBlLGk9dGhpcztyZXR1cm4gZT10P1wib2JqZWN0XCI9PXR5cGVvZiB0P24odCkuZmlsdGVyKGZ1bmN0aW9uKCl7dmFyIHQ9dGhpcztyZXR1cm4gci5zb21lLmNhbGwoaSxmdW5jdGlvbihlKXtyZXR1cm4gbi5jb250YWlucyhlLHQpfSl9KToxPT10aGlzLmxlbmd0aD9uKEMucXNhKHRoaXNbMF0sdCkpOnRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIEMucXNhKHRoaXMsdCl9KTpuKCl9LGNsb3Nlc3Q6ZnVuY3Rpb24odCxlKXt2YXIgaT10aGlzWzBdLHI9ITE7Zm9yKFwib2JqZWN0XCI9PXR5cGVvZiB0JiYocj1uKHQpKTtpJiYhKHI/ci5pbmRleE9mKGkpPj0wOkMubWF0Y2hlcyhpLHQpKTspaT1pIT09ZSYmIVooaSkmJmkucGFyZW50Tm9kZTtyZXR1cm4gbihpKX0scGFyZW50czpmdW5jdGlvbih0KXtmb3IodmFyIGU9W10saT10aGlzO2kubGVuZ3RoPjA7KWk9bi5tYXAoaSxmdW5jdGlvbih0KXtyZXR1cm4odD10LnBhcmVudE5vZGUpJiYhWih0KSYmZS5pbmRleE9mKHQpPDA/KGUucHVzaCh0KSx0KTp2b2lkIDB9KTtyZXR1cm4gVihlLHQpfSxwYXJlbnQ6ZnVuY3Rpb24odCl7cmV0dXJuIFYoUCh0aGlzLnBsdWNrKFwicGFyZW50Tm9kZVwiKSksdCl9LGNoaWxkcmVuOmZ1bmN0aW9uKHQpe3JldHVybiBWKHRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIFUodGhpcyl9KSx0KX0sY29udGVudHM6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZW50RG9jdW1lbnR8fGEuY2FsbCh0aGlzLmNoaWxkTm9kZXMpfSl9LHNpYmxpbmdzOmZ1bmN0aW9uKHQpe3JldHVybiBWKHRoaXMubWFwKGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHMuY2FsbChVKGUucGFyZW50Tm9kZSksZnVuY3Rpb24odCl7cmV0dXJuIHQhPT1lfSl9KSx0KX0sZW1wdHk6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dGhpcy5pbm5lckhUTUw9XCJcIn0pfSxwbHVjazpmdW5jdGlvbih0KXtyZXR1cm4gbi5tYXAodGhpcyxmdW5jdGlvbihlKXtyZXR1cm4gZVt0XX0pfSxzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1wibm9uZVwiPT10aGlzLnN0eWxlLmRpc3BsYXkmJih0aGlzLnN0eWxlLmRpc3BsYXk9XCJcIiksXCJub25lXCI9PWdldENvbXB1dGVkU3R5bGUodGhpcyxcIlwiKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZGlzcGxheVwiKSYmKHRoaXMuc3R5bGUuZGlzcGxheT1JKHRoaXMubm9kZU5hbWUpKX0pfSxyZXBsYWNlV2l0aDpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5iZWZvcmUodCkucmVtb3ZlKCl9LHdyYXA6ZnVuY3Rpb24odCl7dmFyIGU9TCh0KTtpZih0aGlzWzBdJiYhZSl2YXIgaT1uKHQpLmdldCgwKSxyPWkucGFyZW50Tm9kZXx8dGhpcy5sZW5ndGg+MTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKG8pe24odGhpcykud3JhcEFsbChlP3QuY2FsbCh0aGlzLG8pOnI/aS5jbG9uZU5vZGUoITApOmkpfSl9LHdyYXBBbGw6ZnVuY3Rpb24odCl7aWYodGhpc1swXSl7bih0aGlzWzBdKS5iZWZvcmUodD1uKHQpKTtmb3IodmFyIGU7KGU9dC5jaGlsZHJlbigpKS5sZW5ndGg7KXQ9ZS5maXJzdCgpO24odCkuYXBwZW5kKHRoaXMpfXJldHVybiB0aGlzfSx3cmFwSW5uZXI6ZnVuY3Rpb24odCl7dmFyIGU9TCh0KTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGkpe3ZhciByPW4odGhpcyksbz1yLmNvbnRlbnRzKCkscz1lP3QuY2FsbCh0aGlzLGkpOnQ7by5sZW5ndGg/by53cmFwQWxsKHMpOnIuYXBwZW5kKHMpfSl9LHVud3JhcDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnBhcmVudCgpLmVhY2goZnVuY3Rpb24oKXtuKHRoaXMpLnJlcGxhY2VXaXRoKG4odGhpcykuY2hpbGRyZW4oKSl9KSx0aGlzfSxjbG9uZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiB0aGlzLmNsb25lTm9kZSghMCl9KX0saGlkZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIil9LHRvZ2dsZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGk9bih0aGlzKTsoZT09PXQ/XCJub25lXCI9PWkuY3NzKFwiZGlzcGxheVwiKTplKT9pLnNob3coKTppLmhpZGUoKX0pfSxwcmV2OmZ1bmN0aW9uKHQpe3JldHVybiBuKHRoaXMucGx1Y2soXCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nXCIpKS5maWx0ZXIodHx8XCIqXCIpfSxuZXh0OmZ1bmN0aW9uKHQpe3JldHVybiBuKHRoaXMucGx1Y2soXCJuZXh0RWxlbWVudFNpYmxpbmdcIikpLmZpbHRlcih0fHxcIipcIil9LGh0bWw6ZnVuY3Rpb24odCl7cmV0dXJuIDAgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihlKXt2YXIgaT10aGlzLmlubmVySFRNTDtuKHRoaXMpLmVtcHR5KCkuYXBwZW5kKFkodGhpcyx0LGUsaSkpfSk6MCBpbiB0aGlzP3RoaXNbMF0uaW5uZXJIVE1MOm51bGx9LHRleHQ6ZnVuY3Rpb24odCl7cmV0dXJuIDAgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihlKXt2YXIgbj1ZKHRoaXMsdCxlLHRoaXMudGV4dENvbnRlbnQpO3RoaXMudGV4dENvbnRlbnQ9bnVsbD09bj9cIlwiOlwiXCIrbn0pOjAgaW4gdGhpcz90aGlzWzBdLnRleHRDb250ZW50Om51bGx9LGF0dHI6ZnVuY3Rpb24obixpKXt2YXIgcjtyZXR1cm5cInN0cmluZ1wiIT10eXBlb2Ygbnx8MSBpbiBhcmd1bWVudHM/dGhpcy5lYWNoKGZ1bmN0aW9uKHQpe2lmKDE9PT10aGlzLm5vZGVUeXBlKWlmKCQobikpZm9yKGUgaW4gbilKKHRoaXMsZSxuW2VdKTtlbHNlIEoodGhpcyxuLFkodGhpcyxpLHQsdGhpcy5nZXRBdHRyaWJ1dGUobikpKX0pOnRoaXMubGVuZ3RoJiYxPT09dGhpc1swXS5ub2RlVHlwZT8hKHI9dGhpc1swXS5nZXRBdHRyaWJ1dGUobikpJiZuIGluIHRoaXNbMF0/dGhpc1swXVtuXTpyOnR9LHJlbW92ZUF0dHI6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpezE9PT10aGlzLm5vZGVUeXBlJiZ0LnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe0oodGhpcyx0KX0sdGhpcyl9KX0scHJvcDpmdW5jdGlvbih0LGUpe3JldHVybiB0PU1bdF18fHQsMSBpbiBhcmd1bWVudHM/dGhpcy5lYWNoKGZ1bmN0aW9uKG4pe3RoaXNbdF09WSh0aGlzLGUsbix0aGlzW3RdKX0pOnRoaXNbMF0mJnRoaXNbMF1bdF19LGRhdGE6ZnVuY3Rpb24oZSxuKXt2YXIgaT1cImRhdGEtXCIrZS5yZXBsYWNlKGcsXCItJDFcIikudG9Mb3dlckNhc2UoKSxyPTEgaW4gYXJndW1lbnRzP3RoaXMuYXR0cihpLG4pOnRoaXMuYXR0cihpKTtyZXR1cm4gbnVsbCE9PXI/SyhyKTp0fSx2YWw6ZnVuY3Rpb24odCl7cmV0dXJuIDAgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihlKXt0aGlzLnZhbHVlPVkodGhpcyx0LGUsdGhpcy52YWx1ZSl9KTp0aGlzWzBdJiYodGhpc1swXS5tdWx0aXBsZT9uKHRoaXNbMF0pLmZpbmQoXCJvcHRpb25cIikuZmlsdGVyKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2VsZWN0ZWR9KS5wbHVjayhcInZhbHVlXCIpOnRoaXNbMF0udmFsdWUpfSxvZmZzZXQ6ZnVuY3Rpb24odCl7aWYodClyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGUpe3ZhciBpPW4odGhpcykscj1ZKHRoaXMsdCxlLGkub2Zmc2V0KCkpLG89aS5vZmZzZXRQYXJlbnQoKS5vZmZzZXQoKSxzPXt0b3A6ci50b3Atby50b3AsbGVmdDpyLmxlZnQtby5sZWZ0fTtcInN0YXRpY1wiPT1pLmNzcyhcInBvc2l0aW9uXCIpJiYocy5wb3NpdGlvbj1cInJlbGF0aXZlXCIpLGkuY3NzKHMpfSk7aWYoIXRoaXMubGVuZ3RoKXJldHVybiBudWxsO2lmKCFuLmNvbnRhaW5zKHUuZG9jdW1lbnRFbGVtZW50LHRoaXNbMF0pKXJldHVybnt0b3A6MCxsZWZ0OjB9O3ZhciBlPXRoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cmV0dXJue2xlZnQ6ZS5sZWZ0K3dpbmRvdy5wYWdlWE9mZnNldCx0b3A6ZS50b3Ard2luZG93LnBhZ2VZT2Zmc2V0LHdpZHRoOk1hdGgucm91bmQoZS53aWR0aCksaGVpZ2h0Ok1hdGgucm91bmQoZS5oZWlnaHQpfX0sY3NzOmZ1bmN0aW9uKHQsaSl7aWYoYXJndW1lbnRzLmxlbmd0aDwyKXt2YXIgcixvPXRoaXNbMF07aWYoIW8pcmV0dXJuO2lmKHI9Z2V0Q29tcHV0ZWRTdHlsZShvLFwiXCIpLFwic3RyaW5nXCI9PXR5cGVvZiB0KXJldHVybiBvLnN0eWxlW04odCldfHxyLmdldFByb3BlcnR5VmFsdWUodCk7aWYoQSh0KSl7dmFyIHM9e307cmV0dXJuIG4uZWFjaCh0LGZ1bmN0aW9uKHQsZSl7c1tlXT1vLnN0eWxlW04oZSldfHxyLmdldFByb3BlcnR5VmFsdWUoZSl9KSxzfX12YXIgYT1cIlwiO2lmKFwic3RyaW5nXCI9PUQodCkpaXx8MD09PWk/YT16KHQpK1wiOlwiK18odCxpKTp0aGlzLmVhY2goZnVuY3Rpb24oKXt0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KHoodCkpfSk7ZWxzZSBmb3IoZSBpbiB0KXRbZV18fDA9PT10W2VdP2ErPXooZSkrXCI6XCIrXyhlLHRbZV0pK1wiO1wiOnRoaXMuZWFjaChmdW5jdGlvbigpe3RoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkoeihlKSl9KTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dGhpcy5zdHlsZS5jc3NUZXh0Kz1cIjtcIithfSl9LGluZGV4OmZ1bmN0aW9uKHQpe3JldHVybiB0P3RoaXMuaW5kZXhPZihuKHQpWzBdKTp0aGlzLnBhcmVudCgpLmNoaWxkcmVuKCkuaW5kZXhPZih0aGlzWzBdKX0saGFzQ2xhc3M6ZnVuY3Rpb24odCl7cmV0dXJuIHQ/ci5zb21lLmNhbGwodGhpcyxmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy50ZXN0KEcodCkpfSxIKHQpKTohMX0sYWRkQ2xhc3M6ZnVuY3Rpb24odCl7cmV0dXJuIHQ/dGhpcy5lYWNoKGZ1bmN0aW9uKGUpe2lmKFwiY2xhc3NOYW1lXCJpbiB0aGlzKXtpPVtdO3ZhciByPUcodGhpcyksbz1ZKHRoaXMsdCxlLHIpO28uc3BsaXQoL1xccysvZykuZm9yRWFjaChmdW5jdGlvbih0KXtuKHRoaXMpLmhhc0NsYXNzKHQpfHxpLnB1c2godCl9LHRoaXMpLGkubGVuZ3RoJiZHKHRoaXMscisocj9cIiBcIjpcIlwiKStpLmpvaW4oXCIgXCIpKX19KTp0aGlzfSxyZW1vdmVDbGFzczpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKG4pe2lmKFwiY2xhc3NOYW1lXCJpbiB0aGlzKXtpZihlPT09dClyZXR1cm4gRyh0aGlzLFwiXCIpO2k9Ryh0aGlzKSxZKHRoaXMsZSxuLGkpLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24odCl7aT1pLnJlcGxhY2UoSCh0KSxcIiBcIil9KSxHKHRoaXMsaS50cmltKCkpfX0pfSx0b2dnbGVDbGFzczpmdW5jdGlvbihlLGkpe3JldHVybiBlP3RoaXMuZWFjaChmdW5jdGlvbihyKXt2YXIgbz1uKHRoaXMpLHM9WSh0aGlzLGUscixHKHRoaXMpKTtzLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oZSl7KGk9PT10PyFvLmhhc0NsYXNzKGUpOmkpP28uYWRkQ2xhc3MoZSk6by5yZW1vdmVDbGFzcyhlKX0pfSk6dGhpc30sc2Nyb2xsVG9wOmZ1bmN0aW9uKGUpe2lmKHRoaXMubGVuZ3RoKXt2YXIgbj1cInNjcm9sbFRvcFwiaW4gdGhpc1swXTtyZXR1cm4gZT09PXQ/bj90aGlzWzBdLnNjcm9sbFRvcDp0aGlzWzBdLnBhZ2VZT2Zmc2V0OnRoaXMuZWFjaChuP2Z1bmN0aW9uKCl7dGhpcy5zY3JvbGxUb3A9ZX06ZnVuY3Rpb24oKXt0aGlzLnNjcm9sbFRvKHRoaXMuc2Nyb2xsWCxlKX0pfX0sc2Nyb2xsTGVmdDpmdW5jdGlvbihlKXtpZih0aGlzLmxlbmd0aCl7dmFyIG49XCJzY3JvbGxMZWZ0XCJpbiB0aGlzWzBdO3JldHVybiBlPT09dD9uP3RoaXNbMF0uc2Nyb2xsTGVmdDp0aGlzWzBdLnBhZ2VYT2Zmc2V0OnRoaXMuZWFjaChuP2Z1bmN0aW9uKCl7dGhpcy5zY3JvbGxMZWZ0PWV9OmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxUbyhlLHRoaXMuc2Nyb2xsWSl9KX19LHBvc2l0aW9uOmZ1bmN0aW9uKCl7aWYodGhpcy5sZW5ndGgpe3ZhciB0PXRoaXNbMF0sZT10aGlzLm9mZnNldFBhcmVudCgpLGk9dGhpcy5vZmZzZXQoKSxyPW0udGVzdChlWzBdLm5vZGVOYW1lKT97dG9wOjAsbGVmdDowfTplLm9mZnNldCgpO3JldHVybiBpLnRvcC09cGFyc2VGbG9hdChuKHQpLmNzcyhcIm1hcmdpbi10b3BcIikpfHwwLGkubGVmdC09cGFyc2VGbG9hdChuKHQpLmNzcyhcIm1hcmdpbi1sZWZ0XCIpKXx8MCxyLnRvcCs9cGFyc2VGbG9hdChuKGVbMF0pLmNzcyhcImJvcmRlci10b3Atd2lkdGhcIikpfHwwLHIubGVmdCs9cGFyc2VGbG9hdChuKGVbMF0pLmNzcyhcImJvcmRlci1sZWZ0LXdpZHRoXCIpKXx8MCx7dG9wOmkudG9wLXIudG9wLGxlZnQ6aS5sZWZ0LXIubGVmdH19fSxvZmZzZXRQYXJlbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXtmb3IodmFyIHQ9dGhpcy5vZmZzZXRQYXJlbnR8fHUuYm9keTt0JiYhbS50ZXN0KHQubm9kZU5hbWUpJiZcInN0YXRpY1wiPT1uKHQpLmNzcyhcInBvc2l0aW9uXCIpOyl0PXQub2Zmc2V0UGFyZW50O3JldHVybiB0fSl9fSxuLmZuLmRldGFjaD1uLmZuLnJlbW92ZSxbXCJ3aWR0aFwiLFwiaGVpZ2h0XCJdLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIGk9ZS5yZXBsYWNlKC8uLyxmdW5jdGlvbih0KXtyZXR1cm4gdFswXS50b1VwcGVyQ2FzZSgpfSk7bi5mbltlXT1mdW5jdGlvbihyKXt2YXIgbyxzPXRoaXNbMF07cmV0dXJuIHI9PT10P2socyk/c1tcImlubmVyXCIraV06WihzKT9zLmRvY3VtZW50RWxlbWVudFtcInNjcm9sbFwiK2ldOihvPXRoaXMub2Zmc2V0KCkpJiZvW2VdOnRoaXMuZWFjaChmdW5jdGlvbih0KXtzPW4odGhpcykscy5jc3MoZSxZKHRoaXMscix0LHNbZV0oKSkpfSl9fSkseS5mb3JFYWNoKGZ1bmN0aW9uKHQsZSl7dmFyIGk9ZSUyO24uZm5bdF09ZnVuY3Rpb24oKXt2YXIgdCxvLHI9bi5tYXAoYXJndW1lbnRzLGZ1bmN0aW9uKGUpe3JldHVybiB0PUQoZSksXCJvYmplY3RcIj09dHx8XCJhcnJheVwiPT10fHxudWxsPT1lP2U6Qy5mcmFnbWVudChlKX0pLHM9dGhpcy5sZW5ndGg+MTtyZXR1cm4gci5sZW5ndGg8MT90aGlzOnRoaXMuZWFjaChmdW5jdGlvbih0LGEpe289aT9hOmEucGFyZW50Tm9kZSxhPTA9PWU/YS5uZXh0U2libGluZzoxPT1lP2EuZmlyc3RDaGlsZDoyPT1lP2E6bnVsbDt2YXIgZj1uLmNvbnRhaW5zKHUuZG9jdW1lbnRFbGVtZW50LG8pO3IuZm9yRWFjaChmdW5jdGlvbih0KXtpZihzKXQ9dC5jbG9uZU5vZGUoITApO2Vsc2UgaWYoIW8pcmV0dXJuIG4odCkucmVtb3ZlKCk7by5pbnNlcnRCZWZvcmUodCxhKSxmJiZRKHQsZnVuY3Rpb24odCl7bnVsbD09dC5ub2RlTmFtZXx8XCJTQ1JJUFRcIiE9PXQubm9kZU5hbWUudG9VcHBlckNhc2UoKXx8dC50eXBlJiZcInRleHQvamF2YXNjcmlwdFwiIT09dC50eXBlfHx0LnNyY3x8d2luZG93LmV2YWwuY2FsbCh3aW5kb3csdC5pbm5lckhUTUwpfSl9KX0pfSxuLmZuW2k/dCtcIlRvXCI6XCJpbnNlcnRcIisoZT9cIkJlZm9yZVwiOlwiQWZ0ZXJcIildPWZ1bmN0aW9uKGUpe3JldHVybiBuKGUpW3RdKHRoaXMpLHRoaXN9fSksQy5aLnByb3RvdHlwZT1YLnByb3RvdHlwZT1uLmZuLEMudW5pcT1QLEMuZGVzZXJpYWxpemVWYWx1ZT1LLG4uemVwdG89QyxufSgpO3dpbmRvdy5aZXB0bz1aZXB0byx2b2lkIDA9PT13aW5kb3cuJCYmKHdpbmRvdy4kPVplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiBsKHQpe3JldHVybiB0Ll96aWR8fCh0Ll96aWQ9ZSsrKX1mdW5jdGlvbiBoKHQsZSxuLGkpe2lmKGU9cChlKSxlLm5zKXZhciByPWQoZS5ucyk7cmV0dXJuKHNbbCh0KV18fFtdKS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuISghdHx8ZS5lJiZ0LmUhPWUuZXx8ZS5ucyYmIXIudGVzdCh0Lm5zKXx8biYmbCh0LmZuKSE9PWwobil8fGkmJnQuc2VsIT1pKX0pfWZ1bmN0aW9uIHAodCl7dmFyIGU9KFwiXCIrdCkuc3BsaXQoXCIuXCIpO3JldHVybntlOmVbMF0sbnM6ZS5zbGljZSgxKS5zb3J0KCkuam9pbihcIiBcIil9fWZ1bmN0aW9uIGQodCl7cmV0dXJuIG5ldyBSZWdFeHAoXCIoPzpefCApXCIrdC5yZXBsYWNlKFwiIFwiLFwiIC4qID9cIikrXCIoPzogfCQpXCIpfWZ1bmN0aW9uIG0odCxlKXtyZXR1cm4gdC5kZWwmJiF1JiZ0LmUgaW4gZnx8ISFlfWZ1bmN0aW9uIGcodCl7cmV0dXJuIGNbdF18fHUmJmZbdF18fHR9ZnVuY3Rpb24gdihlLGkscixvLGEsdSxmKXt2YXIgaD1sKGUpLGQ9c1toXXx8KHNbaF09W10pO2kuc3BsaXQoL1xccy8pLmZvckVhY2goZnVuY3Rpb24oaSl7aWYoXCJyZWFkeVwiPT1pKXJldHVybiB0KGRvY3VtZW50KS5yZWFkeShyKTt2YXIgcz1wKGkpO3MuZm49cixzLnNlbD1hLHMuZSBpbiBjJiYocj1mdW5jdGlvbihlKXt2YXIgbj1lLnJlbGF0ZWRUYXJnZXQ7cmV0dXJuIW58fG4hPT10aGlzJiYhdC5jb250YWlucyh0aGlzLG4pP3MuZm4uYXBwbHkodGhpcyxhcmd1bWVudHMpOnZvaWQgMH0pLHMuZGVsPXU7dmFyIGw9dXx8cjtzLnByb3h5PWZ1bmN0aW9uKHQpe2lmKHQ9VCh0KSwhdC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpKXt0LmRhdGE9bzt2YXIgaT1sLmFwcGx5KGUsdC5fYXJncz09bj9bdF06W3RdLmNvbmNhdCh0Ll9hcmdzKSk7cmV0dXJuIGk9PT0hMSYmKHQucHJldmVudERlZmF1bHQoKSx0LnN0b3BQcm9wYWdhdGlvbigpKSxpfX0scy5pPWQubGVuZ3RoLGQucHVzaChzKSxcImFkZEV2ZW50TGlzdGVuZXJcImluIGUmJmUuYWRkRXZlbnRMaXN0ZW5lcihnKHMuZSkscy5wcm94eSxtKHMsZikpfSl9ZnVuY3Rpb24geSh0LGUsbixpLHIpe3ZhciBvPWwodCk7KGV8fFwiXCIpLnNwbGl0KC9cXHMvKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2godCxlLG4saSkuZm9yRWFjaChmdW5jdGlvbihlKXtkZWxldGUgc1tvXVtlLmldLFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiaW4gdCYmdC5yZW1vdmVFdmVudExpc3RlbmVyKGcoZS5lKSxlLnByb3h5LG0oZSxyKSl9KX0pfWZ1bmN0aW9uIFQoZSxpKXtyZXR1cm4oaXx8IWUuaXNEZWZhdWx0UHJldmVudGVkKSYmKGl8fChpPWUpLHQuZWFjaChFLGZ1bmN0aW9uKHQsbil7dmFyIHI9aVt0XTtlW3RdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXNbbl09dyxyJiZyLmFwcGx5KGksYXJndW1lbnRzKX0sZVtuXT14fSksKGkuZGVmYXVsdFByZXZlbnRlZCE9PW4/aS5kZWZhdWx0UHJldmVudGVkOlwicmV0dXJuVmFsdWVcImluIGk/aS5yZXR1cm5WYWx1ZT09PSExOmkuZ2V0UHJldmVudERlZmF1bHQmJmkuZ2V0UHJldmVudERlZmF1bHQoKSkmJihlLmlzRGVmYXVsdFByZXZlbnRlZD13KSksZX1mdW5jdGlvbiBqKHQpe3ZhciBlLGk9e29yaWdpbmFsRXZlbnQ6dH07Zm9yKGUgaW4gdCliLnRlc3QoZSl8fHRbZV09PT1ufHwoaVtlXT10W2VdKTtyZXR1cm4gVChpLHQpfXZhciBuLGU9MSxpPUFycmF5LnByb3RvdHlwZS5zbGljZSxyPXQuaXNGdW5jdGlvbixvPWZ1bmN0aW9uKHQpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0fSxzPXt9LGE9e30sdT1cIm9uZm9jdXNpblwiaW4gd2luZG93LGY9e2ZvY3VzOlwiZm9jdXNpblwiLGJsdXI6XCJmb2N1c291dFwifSxjPXttb3VzZWVudGVyOlwibW91c2VvdmVyXCIsbW91c2VsZWF2ZTpcIm1vdXNlb3V0XCJ9O2EuY2xpY2s9YS5tb3VzZWRvd249YS5tb3VzZXVwPWEubW91c2Vtb3ZlPVwiTW91c2VFdmVudHNcIix0LmV2ZW50PXthZGQ6dixyZW1vdmU6eX0sdC5wcm94eT1mdW5jdGlvbihlLG4pe3ZhciBzPTIgaW4gYXJndW1lbnRzJiZpLmNhbGwoYXJndW1lbnRzLDIpO2lmKHIoZSkpe3ZhciBhPWZ1bmN0aW9uKCl7cmV0dXJuIGUuYXBwbHkobixzP3MuY29uY2F0KGkuY2FsbChhcmd1bWVudHMpKTphcmd1bWVudHMpfTtyZXR1cm4gYS5femlkPWwoZSksYX1pZihvKG4pKXJldHVybiBzPyhzLnVuc2hpZnQoZVtuXSxlKSx0LnByb3h5LmFwcGx5KG51bGwscykpOnQucHJveHkoZVtuXSxlKTt0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0ZWQgZnVuY3Rpb25cIil9LHQuZm4uYmluZD1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHRoaXMub24odCxlLG4pfSx0LmZuLnVuYmluZD1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLm9mZih0LGUpfSx0LmZuLm9uZT1mdW5jdGlvbih0LGUsbixpKXtyZXR1cm4gdGhpcy5vbih0LGUsbixpLDEpfTt2YXIgdz1mdW5jdGlvbigpe3JldHVybiEwfSx4PWZ1bmN0aW9uKCl7cmV0dXJuITF9LGI9L14oW0EtWl18cmV0dXJuVmFsdWUkfGxheWVyW1hZXSQpLyxFPXtwcmV2ZW50RGVmYXVsdDpcImlzRGVmYXVsdFByZXZlbnRlZFwiLHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjpcImlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkXCIsc3RvcFByb3BhZ2F0aW9uOlwiaXNQcm9wYWdhdGlvblN0b3BwZWRcIn07dC5mbi5kZWxlZ2F0ZT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHRoaXMub24oZSx0LG4pfSx0LmZuLnVuZGVsZWdhdGU9ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0aGlzLm9mZihlLHQsbil9LHQuZm4ubGl2ZT1mdW5jdGlvbihlLG4pe3JldHVybiB0KGRvY3VtZW50LmJvZHkpLmRlbGVnYXRlKHRoaXMuc2VsZWN0b3IsZSxuKSx0aGlzfSx0LmZuLmRpZT1mdW5jdGlvbihlLG4pe3JldHVybiB0KGRvY3VtZW50LmJvZHkpLnVuZGVsZWdhdGUodGhpcy5zZWxlY3RvcixlLG4pLHRoaXN9LHQuZm4ub249ZnVuY3Rpb24oZSxzLGEsdSxmKXt2YXIgYyxsLGg9dGhpcztyZXR1cm4gZSYmIW8oZSk/KHQuZWFjaChlLGZ1bmN0aW9uKHQsZSl7aC5vbih0LHMsYSxlLGYpfSksaCk6KG8ocyl8fHIodSl8fHU9PT0hMXx8KHU9YSxhPXMscz1uKSwodT09PW58fGE9PT0hMSkmJih1PWEsYT1uKSx1PT09ITEmJih1PXgpLGguZWFjaChmdW5jdGlvbihuLHIpe2YmJihjPWZ1bmN0aW9uKHQpe3JldHVybiB5KHIsdC50eXBlLHUpLHUuYXBwbHkodGhpcyxhcmd1bWVudHMpfSkscyYmKGw9ZnVuY3Rpb24oZSl7dmFyIG4sbz10KGUudGFyZ2V0KS5jbG9zZXN0KHMscikuZ2V0KDApO3JldHVybiBvJiZvIT09cj8obj10LmV4dGVuZChqKGUpLHtjdXJyZW50VGFyZ2V0Om8sbGl2ZUZpcmVkOnJ9KSwoY3x8dSkuYXBwbHkobyxbbl0uY29uY2F0KGkuY2FsbChhcmd1bWVudHMsMSkpKSk6dm9pZCAwfSksdihyLGUsdSxhLHMsbHx8Yyl9KSl9LHQuZm4ub2ZmPWZ1bmN0aW9uKGUsaSxzKXt2YXIgYT10aGlzO3JldHVybiBlJiYhbyhlKT8odC5lYWNoKGUsZnVuY3Rpb24odCxlKXthLm9mZih0LGksZSl9KSxhKToobyhpKXx8cihzKXx8cz09PSExfHwocz1pLGk9bikscz09PSExJiYocz14KSxhLmVhY2goZnVuY3Rpb24oKXt5KHRoaXMsZSxzLGkpfSkpfSx0LmZuLnRyaWdnZXI9ZnVuY3Rpb24oZSxuKXtyZXR1cm4gZT1vKGUpfHx0LmlzUGxhaW5PYmplY3QoZSk/dC5FdmVudChlKTpUKGUpLGUuX2FyZ3M9bix0aGlzLmVhY2goZnVuY3Rpb24oKXtlLnR5cGUgaW4gZiYmXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpc1tlLnR5cGVdP3RoaXNbZS50eXBlXSgpOlwiZGlzcGF0Y2hFdmVudFwiaW4gdGhpcz90aGlzLmRpc3BhdGNoRXZlbnQoZSk6dCh0aGlzKS50cmlnZ2VySGFuZGxlcihlLG4pfSl9LHQuZm4udHJpZ2dlckhhbmRsZXI9ZnVuY3Rpb24oZSxuKXt2YXIgaSxyO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24ocyxhKXtpPWoobyhlKT90LkV2ZW50KGUpOmUpLGkuX2FyZ3M9bixpLnRhcmdldD1hLHQuZWFjaChoKGEsZS50eXBlfHxlKSxmdW5jdGlvbih0LGUpe3JldHVybiByPWUucHJveHkoaSksaS5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpPyExOnZvaWQgMH0pfSkscn0sXCJmb2N1c2luIGZvY3Vzb3V0IGZvY3VzIGJsdXIgbG9hZCByZXNpemUgc2Nyb2xsIHVubG9hZCBjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBjaGFuZ2Ugc2VsZWN0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgZXJyb3JcIi5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihlKXt0LmZuW2VdPWZ1bmN0aW9uKHQpe3JldHVybiAwIGluIGFyZ3VtZW50cz90aGlzLmJpbmQoZSx0KTp0aGlzLnRyaWdnZXIoZSl9fSksdC5FdmVudD1mdW5jdGlvbih0LGUpe28odCl8fChlPXQsdD1lLnR5cGUpO3ZhciBuPWRvY3VtZW50LmNyZWF0ZUV2ZW50KGFbdF18fFwiRXZlbnRzXCIpLGk9ITA7aWYoZSlmb3IodmFyIHIgaW4gZSlcImJ1YmJsZXNcIj09cj9pPSEhZVtyXTpuW3JdPWVbcl07cmV0dXJuIG4uaW5pdEV2ZW50KHQsaSwhMCksVChuKX19KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiBoKGUsbixpKXt2YXIgcj10LkV2ZW50KG4pO3JldHVybiB0KGUpLnRyaWdnZXIocixpKSwhci5pc0RlZmF1bHRQcmV2ZW50ZWQoKX1mdW5jdGlvbiBwKHQsZSxpLHIpe3JldHVybiB0Lmdsb2JhbD9oKGV8fG4saSxyKTp2b2lkIDB9ZnVuY3Rpb24gZChlKXtlLmdsb2JhbCYmMD09PXQuYWN0aXZlKysmJnAoZSxudWxsLFwiYWpheFN0YXJ0XCIpfWZ1bmN0aW9uIG0oZSl7ZS5nbG9iYWwmJiEtLXQuYWN0aXZlJiZwKGUsbnVsbCxcImFqYXhTdG9wXCIpfWZ1bmN0aW9uIGcodCxlKXt2YXIgbj1lLmNvbnRleHQ7cmV0dXJuIGUuYmVmb3JlU2VuZC5jYWxsKG4sdCxlKT09PSExfHxwKGUsbixcImFqYXhCZWZvcmVTZW5kXCIsW3QsZV0pPT09ITE/ITE6dm9pZCBwKGUsbixcImFqYXhTZW5kXCIsW3QsZV0pfWZ1bmN0aW9uIHYodCxlLG4saSl7dmFyIHI9bi5jb250ZXh0LG89XCJzdWNjZXNzXCI7bi5zdWNjZXNzLmNhbGwocix0LG8sZSksaSYmaS5yZXNvbHZlV2l0aChyLFt0LG8sZV0pLHAobixyLFwiYWpheFN1Y2Nlc3NcIixbZSxuLHRdKSx3KG8sZSxuKX1mdW5jdGlvbiB5KHQsZSxuLGkscil7dmFyIG89aS5jb250ZXh0O2kuZXJyb3IuY2FsbChvLG4sZSx0KSxyJiZyLnJlamVjdFdpdGgobyxbbixlLHRdKSxwKGksbyxcImFqYXhFcnJvclwiLFtuLGksdHx8ZV0pLHcoZSxuLGkpfWZ1bmN0aW9uIHcodCxlLG4pe3ZhciBpPW4uY29udGV4dDtuLmNvbXBsZXRlLmNhbGwoaSxlLHQpLHAobixpLFwiYWpheENvbXBsZXRlXCIsW2Usbl0pLG0obil9ZnVuY3Rpb24geCgpe31mdW5jdGlvbiBiKHQpe3JldHVybiB0JiYodD10LnNwbGl0KFwiO1wiLDIpWzBdKSx0JiYodD09Zj9cImh0bWxcIjp0PT11P1wianNvblwiOnMudGVzdCh0KT9cInNjcmlwdFwiOmEudGVzdCh0KSYmXCJ4bWxcIil8fFwidGV4dFwifWZ1bmN0aW9uIEUodCxlKXtyZXR1cm5cIlwiPT1lP3Q6KHQrXCImXCIrZSkucmVwbGFjZSgvWyY/XXsxLDJ9LyxcIj9cIil9ZnVuY3Rpb24gVChlKXtlLnByb2Nlc3NEYXRhJiZlLmRhdGEmJlwic3RyaW5nXCIhPXQudHlwZShlLmRhdGEpJiYoZS5kYXRhPXQucGFyYW0oZS5kYXRhLGUudHJhZGl0aW9uYWwpKSwhZS5kYXRhfHxlLnR5cGUmJlwiR0VUXCIhPWUudHlwZS50b1VwcGVyQ2FzZSgpfHwoZS51cmw9RShlLnVybCxlLmRhdGEpLGUuZGF0YT12b2lkIDApfWZ1bmN0aW9uIGooZSxuLGkscil7cmV0dXJuIHQuaXNGdW5jdGlvbihuKSYmKHI9aSxpPW4sbj12b2lkIDApLHQuaXNGdW5jdGlvbihpKXx8KHI9aSxpPXZvaWQgMCkse3VybDplLGRhdGE6bixzdWNjZXNzOmksZGF0YVR5cGU6cn19ZnVuY3Rpb24gQyhlLG4saSxyKXt2YXIgbyxzPXQuaXNBcnJheShuKSxhPXQuaXNQbGFpbk9iamVjdChuKTt0LmVhY2gobixmdW5jdGlvbihuLHUpe289dC50eXBlKHUpLHImJihuPWk/cjpyK1wiW1wiKyhhfHxcIm9iamVjdFwiPT1vfHxcImFycmF5XCI9PW8/bjpcIlwiKStcIl1cIiksIXImJnM/ZS5hZGQodS5uYW1lLHUudmFsdWUpOlwiYXJyYXlcIj09b3x8IWkmJlwib2JqZWN0XCI9PW8/QyhlLHUsaSxuKTplLmFkZChuLHUpfSl9dmFyIGkscixlPTAsbj13aW5kb3cuZG9jdW1lbnQsbz0vPHNjcmlwdFxcYltePF0qKD86KD8hPFxcL3NjcmlwdD4pPFtePF0qKSo8XFwvc2NyaXB0Pi9naSxzPS9eKD86dGV4dHxhcHBsaWNhdGlvbilcXC9qYXZhc2NyaXB0L2ksYT0vXig/OnRleHR8YXBwbGljYXRpb24pXFwveG1sL2ksdT1cImFwcGxpY2F0aW9uL2pzb25cIixmPVwidGV4dC9odG1sXCIsYz0vXlxccyokLyxsPW4uY3JlYXRlRWxlbWVudChcImFcIik7bC5ocmVmPXdpbmRvdy5sb2NhdGlvbi5ocmVmLHQuYWN0aXZlPTAsdC5hamF4SlNPTlA9ZnVuY3Rpb24oaSxyKXtpZighKFwidHlwZVwiaW4gaSkpcmV0dXJuIHQuYWpheChpKTt2YXIgZixoLG89aS5qc29ucENhbGxiYWNrLHM9KHQuaXNGdW5jdGlvbihvKT9vKCk6byl8fFwianNvbnBcIisgKytlLGE9bi5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpLHU9d2luZG93W3NdLGM9ZnVuY3Rpb24oZSl7dChhKS50cmlnZ2VySGFuZGxlcihcImVycm9yXCIsZXx8XCJhYm9ydFwiKX0sbD17YWJvcnQ6Y307cmV0dXJuIHImJnIucHJvbWlzZShsKSx0KGEpLm9uKFwibG9hZCBlcnJvclwiLGZ1bmN0aW9uKGUsbil7Y2xlYXJUaW1lb3V0KGgpLHQoYSkub2ZmKCkucmVtb3ZlKCksXCJlcnJvclwiIT1lLnR5cGUmJmY/dihmWzBdLGwsaSxyKTp5KG51bGwsbnx8XCJlcnJvclwiLGwsaSxyKSx3aW5kb3dbc109dSxmJiZ0LmlzRnVuY3Rpb24odSkmJnUoZlswXSksdT1mPXZvaWQgMH0pLGcobCxpKT09PSExPyhjKFwiYWJvcnRcIiksbCk6KHdpbmRvd1tzXT1mdW5jdGlvbigpe2Y9YXJndW1lbnRzfSxhLnNyYz1pLnVybC5yZXBsYWNlKC9cXD8oLispPVxcPy8sXCI/JDE9XCIrcyksbi5oZWFkLmFwcGVuZENoaWxkKGEpLGkudGltZW91dD4wJiYoaD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YyhcInRpbWVvdXRcIil9LGkudGltZW91dCkpLGwpfSx0LmFqYXhTZXR0aW5ncz17dHlwZTpcIkdFVFwiLGJlZm9yZVNlbmQ6eCxzdWNjZXNzOngsZXJyb3I6eCxjb21wbGV0ZTp4LGNvbnRleHQ6bnVsbCxnbG9iYWw6ITAseGhyOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3R9LGFjY2VwdHM6e3NjcmlwdDpcInRleHQvamF2YXNjcmlwdCwgYXBwbGljYXRpb24vamF2YXNjcmlwdCwgYXBwbGljYXRpb24veC1qYXZhc2NyaXB0XCIsanNvbjp1LHhtbDpcImFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWxcIixodG1sOmYsdGV4dDpcInRleHQvcGxhaW5cIn0sY3Jvc3NEb21haW46ITEsdGltZW91dDowLHByb2Nlc3NEYXRhOiEwLGNhY2hlOiEwfSx0LmFqYXg9ZnVuY3Rpb24oZSl7dmFyIGEsdSxvPXQuZXh0ZW5kKHt9LGV8fHt9KSxzPXQuRGVmZXJyZWQmJnQuRGVmZXJyZWQoKTtmb3IoaSBpbiB0LmFqYXhTZXR0aW5ncyl2b2lkIDA9PT1vW2ldJiYob1tpXT10LmFqYXhTZXR0aW5nc1tpXSk7ZChvKSxvLmNyb3NzRG9tYWlufHwoYT1uLmNyZWF0ZUVsZW1lbnQoXCJhXCIpLGEuaHJlZj1vLnVybCxhLmhyZWY9YS5ocmVmLG8uY3Jvc3NEb21haW49bC5wcm90b2NvbCtcIi8vXCIrbC5ob3N0IT1hLnByb3RvY29sK1wiLy9cIithLmhvc3QpLG8udXJsfHwoby51cmw9d2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpLCh1PW8udXJsLmluZGV4T2YoXCIjXCIpKT4tMSYmKG8udXJsPW8udXJsLnNsaWNlKDAsdSkpLFQobyk7dmFyIGY9by5kYXRhVHlwZSxoPS9cXD8uKz1cXD8vLnRlc3Qoby51cmwpO2lmKGgmJihmPVwianNvbnBcIiksby5jYWNoZSE9PSExJiYoZSYmZS5jYWNoZT09PSEwfHxcInNjcmlwdFwiIT1mJiZcImpzb25wXCIhPWYpfHwoby51cmw9RShvLnVybCxcIl89XCIrRGF0ZS5ub3coKSkpLFwianNvbnBcIj09ZilyZXR1cm4gaHx8KG8udXJsPUUoby51cmwsby5qc29ucD9vLmpzb25wK1wiPT9cIjpvLmpzb25wPT09ITE/XCJcIjpcImNhbGxiYWNrPT9cIikpLHQuYWpheEpTT05QKG8scyk7dmFyIE4scD1vLmFjY2VwdHNbZl0sbT17fSx3PWZ1bmN0aW9uKHQsZSl7bVt0LnRvTG93ZXJDYXNlKCldPVt0LGVdfSxqPS9eKFtcXHctXSs6KVxcL1xcLy8udGVzdChvLnVybCk/UmVnRXhwLiQxOndpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCxTPW8ueGhyKCksQz1TLnNldFJlcXVlc3RIZWFkZXI7aWYocyYmcy5wcm9taXNlKFMpLG8uY3Jvc3NEb21haW58fHcoXCJYLVJlcXVlc3RlZC1XaXRoXCIsXCJYTUxIdHRwUmVxdWVzdFwiKSx3KFwiQWNjZXB0XCIscHx8XCIqLypcIiksKHA9by5taW1lVHlwZXx8cCkmJihwLmluZGV4T2YoXCIsXCIpPi0xJiYocD1wLnNwbGl0KFwiLFwiLDIpWzBdKSxTLm92ZXJyaWRlTWltZVR5cGUmJlMub3ZlcnJpZGVNaW1lVHlwZShwKSksKG8uY29udGVudFR5cGV8fG8uY29udGVudFR5cGUhPT0hMSYmby5kYXRhJiZcIkdFVFwiIT1vLnR5cGUudG9VcHBlckNhc2UoKSkmJncoXCJDb250ZW50LVR5cGVcIixvLmNvbnRlbnRUeXBlfHxcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKSxvLmhlYWRlcnMpZm9yKHIgaW4gby5oZWFkZXJzKXcocixvLmhlYWRlcnNbcl0pO2lmKFMuc2V0UmVxdWVzdEhlYWRlcj13LFMub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7aWYoND09Uy5yZWFkeVN0YXRlKXtTLm9ucmVhZHlzdGF0ZWNoYW5nZT14LGNsZWFyVGltZW91dChOKTt2YXIgZSxuPSExO2lmKFMuc3RhdHVzPj0yMDAmJlMuc3RhdHVzPDMwMHx8MzA0PT1TLnN0YXR1c3x8MD09Uy5zdGF0dXMmJlwiZmlsZTpcIj09ail7Zj1mfHxiKG8ubWltZVR5cGV8fFMuZ2V0UmVzcG9uc2VIZWFkZXIoXCJjb250ZW50LXR5cGVcIikpLGU9Uy5yZXNwb25zZVRleHQ7dHJ5e1wic2NyaXB0XCI9PWY/KDEsZXZhbCkoZSk6XCJ4bWxcIj09Zj9lPVMucmVzcG9uc2VYTUw6XCJqc29uXCI9PWYmJihlPWMudGVzdChlKT9udWxsOnQucGFyc2VKU09OKGUpKX1jYXRjaChpKXtuPWl9bj95KG4sXCJwYXJzZXJlcnJvclwiLFMsbyxzKTp2KGUsUyxvLHMpfWVsc2UgeShTLnN0YXR1c1RleHR8fG51bGwsUy5zdGF0dXM/XCJlcnJvclwiOlwiYWJvcnRcIixTLG8scyl9fSxnKFMsbyk9PT0hMSlyZXR1cm4gUy5hYm9ydCgpLHkobnVsbCxcImFib3J0XCIsUyxvLHMpLFM7aWYoby54aHJGaWVsZHMpZm9yKHIgaW4gby54aHJGaWVsZHMpU1tyXT1vLnhockZpZWxkc1tyXTt2YXIgUD1cImFzeW5jXCJpbiBvP28uYXN5bmM6ITA7Uy5vcGVuKG8udHlwZSxvLnVybCxQLG8udXNlcm5hbWUsby5wYXNzd29yZCk7Zm9yKHIgaW4gbSlDLmFwcGx5KFMsbVtyXSk7cmV0dXJuIG8udGltZW91dD4wJiYoTj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Uy5vbnJlYWR5c3RhdGVjaGFuZ2U9eCxTLmFib3J0KCkseShudWxsLFwidGltZW91dFwiLFMsbyxzKX0sby50aW1lb3V0KSksUy5zZW5kKG8uZGF0YT9vLmRhdGE6bnVsbCksU30sdC5nZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gdC5hamF4KGouYXBwbHkobnVsbCxhcmd1bWVudHMpKX0sdC5wb3N0PWZ1bmN0aW9uKCl7dmFyIGU9ai5hcHBseShudWxsLGFyZ3VtZW50cyk7cmV0dXJuIGUudHlwZT1cIlBPU1RcIix0LmFqYXgoZSl9LHQuZ2V0SlNPTj1mdW5jdGlvbigpe3ZhciBlPWouYXBwbHkobnVsbCxhcmd1bWVudHMpO3JldHVybiBlLmRhdGFUeXBlPVwianNvblwiLHQuYWpheChlKX0sdC5mbi5sb2FkPWZ1bmN0aW9uKGUsbixpKXtpZighdGhpcy5sZW5ndGgpcmV0dXJuIHRoaXM7dmFyIGEscj10aGlzLHM9ZS5zcGxpdCgvXFxzLyksdT1qKGUsbixpKSxmPXUuc3VjY2VzcztyZXR1cm4gcy5sZW5ndGg+MSYmKHUudXJsPXNbMF0sYT1zWzFdKSx1LnN1Y2Nlc3M9ZnVuY3Rpb24oZSl7ci5odG1sKGE/dChcIjxkaXY+XCIpLmh0bWwoZS5yZXBsYWNlKG8sXCJcIikpLmZpbmQoYSk6ZSksZiYmZi5hcHBseShyLGFyZ3VtZW50cyl9LHQuYWpheCh1KSx0aGlzfTt2YXIgUz1lbmNvZGVVUklDb21wb25lbnQ7dC5wYXJhbT1mdW5jdGlvbihlLG4pe3ZhciBpPVtdO3JldHVybiBpLmFkZD1mdW5jdGlvbihlLG4pe3QuaXNGdW5jdGlvbihuKSYmKG49bigpKSxudWxsPT1uJiYobj1cIlwiKSx0aGlzLnB1c2goUyhlKStcIj1cIitTKG4pKX0sQyhpLGUsbiksaS5qb2luKFwiJlwiKS5yZXBsYWNlKC8lMjAvZyxcIitcIil9fShaZXB0byksZnVuY3Rpb24odCl7dC5DYWxsYmFja3M9ZnVuY3Rpb24oZSl7ZT10LmV4dGVuZCh7fSxlKTt2YXIgbixpLHIsbyxzLGEsdT1bXSxmPSFlLm9uY2UmJltdLGM9ZnVuY3Rpb24odCl7Zm9yKG49ZS5tZW1vcnkmJnQsaT0hMCxhPW98fDAsbz0wLHM9dS5sZW5ndGgscj0hMDt1JiZzPmE7KythKWlmKHVbYV0uYXBwbHkodFswXSx0WzFdKT09PSExJiZlLnN0b3BPbkZhbHNlKXtuPSExO2JyZWFrfXI9ITEsdSYmKGY/Zi5sZW5ndGgmJmMoZi5zaGlmdCgpKTpuP3UubGVuZ3RoPTA6bC5kaXNhYmxlKCkpfSxsPXthZGQ6ZnVuY3Rpb24oKXtpZih1KXt2YXIgaT11Lmxlbmd0aCxhPWZ1bmN0aW9uKG4pe3QuZWFjaChuLGZ1bmN0aW9uKHQsbil7XCJmdW5jdGlvblwiPT10eXBlb2Ygbj9lLnVuaXF1ZSYmbC5oYXMobil8fHUucHVzaChuKTpuJiZuLmxlbmd0aCYmXCJzdHJpbmdcIiE9dHlwZW9mIG4mJmEobil9KX07YShhcmd1bWVudHMpLHI/cz11Lmxlbmd0aDpuJiYobz1pLGMobikpfXJldHVybiB0aGlzfSxyZW1vdmU6ZnVuY3Rpb24oKXtyZXR1cm4gdSYmdC5lYWNoKGFyZ3VtZW50cyxmdW5jdGlvbihlLG4pe2Zvcih2YXIgaTsoaT10LmluQXJyYXkobix1LGkpKT4tMTspdS5zcGxpY2UoaSwxKSxyJiYocz49aSYmLS1zLGE+PWkmJi0tYSl9KSx0aGlzfSxoYXM6ZnVuY3Rpb24oZSl7cmV0dXJuISghdXx8IShlP3QuaW5BcnJheShlLHUpPi0xOnUubGVuZ3RoKSl9LGVtcHR5OmZ1bmN0aW9uKCl7cmV0dXJuIHM9dS5sZW5ndGg9MCx0aGlzfSxkaXNhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIHU9Zj1uPXZvaWQgMCx0aGlzfSxkaXNhYmxlZDpmdW5jdGlvbigpe3JldHVybiF1fSxsb2NrOmZ1bmN0aW9uKCl7cmV0dXJuIGY9dm9pZCAwLG58fGwuZGlzYWJsZSgpLHRoaXN9LGxvY2tlZDpmdW5jdGlvbigpe3JldHVybiFmfSxmaXJlV2l0aDpmdW5jdGlvbih0LGUpe3JldHVybiF1fHxpJiYhZnx8KGU9ZXx8W10sZT1bdCxlLnNsaWNlP2Uuc2xpY2UoKTplXSxyP2YucHVzaChlKTpjKGUpKSx0aGlzfSxmaXJlOmZ1bmN0aW9uKCl7cmV0dXJuIGwuZmlyZVdpdGgodGhpcyxhcmd1bWVudHMpfSxmaXJlZDpmdW5jdGlvbigpe3JldHVybiEhaX19O3JldHVybiBsfX0oWmVwdG8pLGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIG4oZSl7dmFyIGk9W1tcInJlc29sdmVcIixcImRvbmVcIix0LkNhbGxiYWNrcyh7b25jZToxLG1lbW9yeToxfSksXCJyZXNvbHZlZFwiXSxbXCJyZWplY3RcIixcImZhaWxcIix0LkNhbGxiYWNrcyh7b25jZToxLG1lbW9yeToxfSksXCJyZWplY3RlZFwiXSxbXCJub3RpZnlcIixcInByb2dyZXNzXCIsdC5DYWxsYmFja3Moe21lbW9yeToxfSldXSxyPVwicGVuZGluZ1wiLG89e3N0YXRlOmZ1bmN0aW9uKCl7cmV0dXJuIHJ9LGFsd2F5czpmdW5jdGlvbigpe3JldHVybiBzLmRvbmUoYXJndW1lbnRzKS5mYWlsKGFyZ3VtZW50cyksdGhpc30sdGhlbjpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cztyZXR1cm4gbihmdW5jdGlvbihuKXt0LmVhY2goaSxmdW5jdGlvbihpLHIpe3ZhciBhPXQuaXNGdW5jdGlvbihlW2ldKSYmZVtpXTtzW3JbMV1dKGZ1bmN0aW9uKCl7dmFyIGU9YSYmYS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7aWYoZSYmdC5pc0Z1bmN0aW9uKGUucHJvbWlzZSkpZS5wcm9taXNlKCkuZG9uZShuLnJlc29sdmUpLmZhaWwobi5yZWplY3QpLnByb2dyZXNzKG4ubm90aWZ5KTtlbHNle3ZhciBpPXRoaXM9PT1vP24ucHJvbWlzZSgpOnRoaXMscz1hP1tlXTphcmd1bWVudHM7bltyWzBdK1wiV2l0aFwiXShpLHMpfX0pfSksZT1udWxsfSkucHJvbWlzZSgpfSxwcm9taXNlOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT1lP3QuZXh0ZW5kKGUsbyk6b319LHM9e307cmV0dXJuIHQuZWFjaChpLGZ1bmN0aW9uKHQsZSl7dmFyIG49ZVsyXSxhPWVbM107b1tlWzFdXT1uLmFkZCxhJiZuLmFkZChmdW5jdGlvbigpe3I9YX0saVsxXnRdWzJdLmRpc2FibGUsaVsyXVsyXS5sb2NrKSxzW2VbMF1dPWZ1bmN0aW9uKCl7cmV0dXJuIHNbZVswXStcIldpdGhcIl0odGhpcz09PXM/bzp0aGlzLGFyZ3VtZW50cyksdGhpc30sc1tlWzBdK1wiV2l0aFwiXT1uLmZpcmVXaXRofSksby5wcm9taXNlKHMpLGUmJmUuY2FsbChzLHMpLHN9dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlO3Qud2hlbj1mdW5jdGlvbihpKXt2YXIgZixjLGwscj1lLmNhbGwoYXJndW1lbnRzKSxvPXIubGVuZ3RoLHM9MCxhPTEhPT1vfHxpJiZ0LmlzRnVuY3Rpb24oaS5wcm9taXNlKT9vOjAsdT0xPT09YT9pOm4oKSxoPWZ1bmN0aW9uKHQsbixpKXtyZXR1cm4gZnVuY3Rpb24ocil7blt0XT10aGlzLGlbdF09YXJndW1lbnRzLmxlbmd0aD4xP2UuY2FsbChhcmd1bWVudHMpOnIsaT09PWY/dS5ub3RpZnlXaXRoKG4saSk6LS1hfHx1LnJlc29sdmVXaXRoKG4saSl9fTtpZihvPjEpZm9yKGY9bmV3IEFycmF5KG8pLGM9bmV3IEFycmF5KG8pLGw9bmV3IEFycmF5KG8pO28+czsrK3MpcltzXSYmdC5pc0Z1bmN0aW9uKHJbc10ucHJvbWlzZSk/cltzXS5wcm9taXNlKCkuZG9uZShoKHMsbCxyKSkuZmFpbCh1LnJlamVjdCkucHJvZ3Jlc3MoaChzLGMsZikpOi0tYTtyZXR1cm4gYXx8dS5yZXNvbHZlV2l0aChsLHIpLHUucHJvbWlzZSgpfSx0LkRlZmVycmVkPW59KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiB1KHQsZSxuLGkpe3JldHVybiBNYXRoLmFicyh0LWUpPj1NYXRoLmFicyhuLWkpP3QtZT4wP1wiTGVmdFwiOlwiUmlnaHRcIjpuLWk+MD9cIlVwXCI6XCJEb3duXCJ9ZnVuY3Rpb24gZigpe289bnVsbCxlLmxhc3QmJihlLmVsLnRyaWdnZXIoXCJsb25nVGFwXCIpLGU9e30pfWZ1bmN0aW9uIGMoKXtvJiZjbGVhclRpbWVvdXQobyksbz1udWxsfWZ1bmN0aW9uIGwoKXtuJiZjbGVhclRpbWVvdXQobiksaSYmY2xlYXJUaW1lb3V0KGkpLHImJmNsZWFyVGltZW91dChyKSxvJiZjbGVhclRpbWVvdXQobyksbj1pPXI9bz1udWxsLGU9e319ZnVuY3Rpb24gaCh0KXtyZXR1cm4oXCJ0b3VjaFwiPT10LnBvaW50ZXJUeXBlfHx0LnBvaW50ZXJUeXBlPT10Lk1TUE9JTlRFUl9UWVBFX1RPVUNIKSYmdC5pc1ByaW1hcnl9ZnVuY3Rpb24gcCh0LGUpe3JldHVybiB0LnR5cGU9PVwicG9pbnRlclwiK2V8fHQudHlwZS50b0xvd2VyQ2FzZSgpPT1cIm1zcG9pbnRlclwiK2V9dmFyIG4saSxyLG8sYSxlPXt9LHM9NzUwO3QoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7dmFyIGQsbSx5LHcsZz0wLHY9MDtcIk1TR2VzdHVyZVwiaW4gd2luZG93JiYoYT1uZXcgTVNHZXN0dXJlLGEudGFyZ2V0PWRvY3VtZW50LmJvZHkpLHQoZG9jdW1lbnQpLmJpbmQoXCJNU0dlc3R1cmVFbmRcIixmdW5jdGlvbih0KXt2YXIgbj10LnZlbG9jaXR5WD4xP1wiUmlnaHRcIjp0LnZlbG9jaXR5WDwtMT9cIkxlZnRcIjp0LnZlbG9jaXR5WT4xP1wiRG93blwiOnQudmVsb2NpdHlZPC0xP1wiVXBcIjpudWxsO24mJihlLmVsLnRyaWdnZXIoXCJzd2lwZVwiKSxlLmVsLnRyaWdnZXIoXCJzd2lwZVwiK24pKX0pLm9uKFwidG91Y2hzdGFydCBNU1BvaW50ZXJEb3duIHBvaW50ZXJkb3duXCIsZnVuY3Rpb24oaSl7KCEodz1wKGksXCJkb3duXCIpKXx8aChpKSkmJih5PXc/aTppLnRvdWNoZXNbMF0saS50b3VjaGVzJiYxPT09aS50b3VjaGVzLmxlbmd0aCYmZS54MiYmKGUueDI9dm9pZCAwLGUueTI9dm9pZCAwKSxkPURhdGUubm93KCksbT1kLShlLmxhc3R8fGQpLGUuZWw9dChcInRhZ05hbWVcImluIHkudGFyZ2V0P3kudGFyZ2V0OnkudGFyZ2V0LnBhcmVudE5vZGUpLG4mJmNsZWFyVGltZW91dChuKSxlLngxPXkucGFnZVgsZS55MT15LnBhZ2VZLG0+MCYmMjUwPj1tJiYoZS5pc0RvdWJsZVRhcD0hMCksZS5sYXN0PWQsbz1zZXRUaW1lb3V0KGYscyksYSYmdyYmYS5hZGRQb2ludGVyKGkucG9pbnRlcklkKSl9KS5vbihcInRvdWNobW92ZSBNU1BvaW50ZXJNb3ZlIHBvaW50ZXJtb3ZlXCIsZnVuY3Rpb24odCl7KCEodz1wKHQsXCJtb3ZlXCIpKXx8aCh0KSkmJih5PXc/dDp0LnRvdWNoZXNbMF0sYygpLGUueDI9eS5wYWdlWCxlLnkyPXkucGFnZVksZys9TWF0aC5hYnMoZS54MS1lLngyKSx2Kz1NYXRoLmFicyhlLnkxLWUueTIpKX0pLm9uKFwidG91Y2hlbmQgTVNQb2ludGVyVXAgcG9pbnRlcnVwXCIsZnVuY3Rpb24obyl7KCEodz1wKG8sXCJ1cFwiKSl8fGgobykpJiYoYygpLGUueDImJk1hdGguYWJzKGUueDEtZS54Mik+MzB8fGUueTImJk1hdGguYWJzKGUueTEtZS55Mik+MzA/cj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZS5lbC50cmlnZ2VyKFwic3dpcGVcIiksZS5lbC50cmlnZ2VyKFwic3dpcGVcIit1KGUueDEsZS54MixlLnkxLGUueTIpKSxlPXt9fSwwKTpcImxhc3RcImluIGUmJigzMD5nJiYzMD52P2k9c2V0VGltZW91dChmdW5jdGlvbigpe3ZhciBpPXQuRXZlbnQoXCJ0YXBcIik7aS5jYW5jZWxUb3VjaD1sLGUuZWwudHJpZ2dlcihpKSxlLmlzRG91YmxlVGFwPyhlLmVsJiZlLmVsLnRyaWdnZXIoXCJkb3VibGVUYXBcIiksZT17fSk6bj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bj1udWxsLGUuZWwmJmUuZWwudHJpZ2dlcihcInNpbmdsZVRhcFwiKSxlPXt9fSwyNTApfSwwKTplPXt9KSxnPXY9MCl9KS5vbihcInRvdWNoY2FuY2VsIE1TUG9pbnRlckNhbmNlbCBwb2ludGVyY2FuY2VsXCIsbCksdCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsbCl9KSxbXCJzd2lwZVwiLFwic3dpcGVMZWZ0XCIsXCJzd2lwZVJpZ2h0XCIsXCJzd2lwZVVwXCIsXCJzd2lwZURvd25cIixcImRvdWJsZVRhcFwiLFwidGFwXCIsXCJzaW5nbGVUYXBcIixcImxvbmdUYXBcIl0uZm9yRWFjaChmdW5jdGlvbihlKXt0LmZuW2VdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLm9uKGUsdCl9fSl9KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiByKGUpe3JldHVybiBlPXQoZSksISghZS53aWR0aCgpJiYhZS5oZWlnaHQoKSkmJlwibm9uZVwiIT09ZS5jc3MoXCJkaXNwbGF5XCIpfWZ1bmN0aW9uIGYodCxlKXt0PXQucmVwbGFjZSgvPSNcXF0vZywnPVwiI1wiXScpO3ZhciBuLGkscj1zLmV4ZWModCk7aWYociYmclsyXWluIG8mJihuPW9bclsyXV0saT1yWzNdLHQ9clsxXSxpKSl7dmFyIGE9TnVtYmVyKGkpO2k9aXNOYU4oYSk/aS5yZXBsYWNlKC9eW1wiJ118W1wiJ10kL2csXCJcIik6YX1yZXR1cm4gZSh0LG4saSl9dmFyIGU9dC56ZXB0byxuPWUucXNhLGk9ZS5tYXRjaGVzLG89dC5leHByW1wiOlwiXT17dmlzaWJsZTpmdW5jdGlvbigpe3JldHVybiByKHRoaXMpP3RoaXM6dm9pZCAwfSxoaWRkZW46ZnVuY3Rpb24oKXtyZXR1cm4gcih0aGlzKT92b2lkIDA6dGhpc30sc2VsZWN0ZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zZWxlY3RlZD90aGlzOnZvaWQgMH0sY2hlY2tlZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNoZWNrZWQ/dGhpczp2b2lkIDB9LHBhcmVudDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnBhcmVudE5vZGV9LGZpcnN0OmZ1bmN0aW9uKHQpe3JldHVybiAwPT09dD90aGlzOnZvaWQgMH0sbGFzdDpmdW5jdGlvbih0LGUpe3JldHVybiB0PT09ZS5sZW5ndGgtMT90aGlzOnZvaWQgMH0sZXE6ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0PT09bj90aGlzOnZvaWQgMH0sY29udGFpbnM6ZnVuY3Rpb24oZSxuLGkpe3JldHVybiB0KHRoaXMpLnRleHQoKS5pbmRleE9mKGkpPi0xP3RoaXM6dm9pZCAwfSxoYXM6ZnVuY3Rpb24odCxuLGkpe3JldHVybiBlLnFzYSh0aGlzLGkpLmxlbmd0aD90aGlzOnZvaWQgMH19LHM9bmV3IFJlZ0V4cChcIiguKik6KFxcXFx3KykoPzpcXFxcKChbXildKylcXFxcKSk/JFxcXFxzKlwiKSxhPS9eXFxzKj4vLHU9XCJaZXB0b1wiKyArbmV3IERhdGU7ZS5xc2E9ZnVuY3Rpb24oaSxyKXtyZXR1cm4gZihyLGZ1bmN0aW9uKG8scyxmKXt0cnl7dmFyIGM7IW8mJnM/bz1cIipcIjphLnRlc3QobykmJihjPXQoaSkuYWRkQ2xhc3ModSksbz1cIi5cIit1K1wiIFwiK28pO3ZhciBsPW4oaSxvKX1jYXRjaChoKXt0aHJvdyBjb25zb2xlLmVycm9yKFwiZXJyb3IgcGVyZm9ybWluZyBzZWxlY3RvcjogJW9cIixyKSxofWZpbmFsbHl7YyYmYy5yZW1vdmVDbGFzcyh1KX1yZXR1cm4gcz9lLnVuaXEodC5tYXAobCxmdW5jdGlvbih0LGUpe3JldHVybiBzLmNhbGwodCxlLGwsZil9KSk6bH0pfSxlLm1hdGNoZXM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZihlLGZ1bmN0aW9uKGUsbixyKXtyZXR1cm4hKGUmJiFpKHQsZSl8fG4mJm4uY2FsbCh0LG51bGwscikhPT10KX0pfX0oWmVwdG8pLGZ1bmN0aW9uKCl7dHJ5e2dldENvbXB1dGVkU3R5bGUodm9pZCAwKX1jYXRjaCh0KXt2YXIgZT1nZXRDb21wdXRlZFN0eWxlO3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm4gZSh0KX1jYXRjaChuKXtyZXR1cm4gbnVsbH19fX0oKTtcbm1vZHVsZS5leHBvcnRzID0gWmVwdG87XG4iXX0=
