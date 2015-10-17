require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"lodash._baseassign":2,"lodash._createassigner":8}],2:[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCopy = require('lodash._basecopy'),
    isNative = require('lodash.isnative'),
    keys = require('lodash.keys');

/** Native method references. */
var getOwnPropertySymbols = isNative(getOwnPropertySymbols = Object.getOwnPropertySymbols) && getOwnPropertySymbols;

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
var baseAssign = function(object, source) {
  return source == null
    ? object
    : baseCopy(source, getSymbols(source), baseCopy(source, keys(source), object));
};

/**
 * Creates an array of the own symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !getOwnPropertySymbols ? constant([]) : function(object) {
  return getOwnPropertySymbols(toObject(object));
};

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
  return type == 'function' || (!!value && type == 'object');
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
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = baseAssign;

},{"lodash._basecopy":3,"lodash.isnative":4,"lodash.keys":5}],3:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],4:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

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
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
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
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = isNative;

},{}],5:[function(require,module,exports){
/**
 * lodash 3.0.7 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
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
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
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
  var Ctor = function() { this.x = x; },
      args = arguments,
      object = { '0': x, 'length': x },
      props = [];

  Ctor.prototype = { 'valueOf': x, 'y': x };
  for (var key in new Ctor) { props.push(key); }

  /**
   * Detect if `arguments` object indexes are non-enumerable.
   *
   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
   * checks for indexes that exceed the number of function parameters and
   * whose associated argument values are `0`.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nonEnumArgs = !propertyIsEnumerable.call(args, 1);
  } catch(e) {
    support.nonEnumArgs = true;
  }
}(1, 0));

/**
 * The base implementation of `_.property` without support for deep paths.
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
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

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
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
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
 * @param {Object} object The object to query.
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
  return type == 'function' || (!!value && type == 'object');
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
 * @param {Object} object The object to query.
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
  var Ctor = object != null && object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
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
 * @param {Object} object The object to query.
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

},{"lodash.isarguments":6,"lodash.isarray":7,"lodash.isnative":4}],6:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
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
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * The base implementation of `_.property` without support for deep paths.
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
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
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
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) && objToString.call(value) == argsTag;
}

module.exports = isArguments;

},{}],7:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

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
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
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
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
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
 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var bindCallback = require('lodash._bindcallback'),
    isIterateeCall = require('lodash._isiterateecall'),
    restParam = require('lodash.restparam');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 && sources[length - 2],
        guard = length > 2 && sources[2],
        thisArg = length > 1 && sources[length - 1];

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : null;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? null : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"lodash._bindcallback":9,"lodash._isiterateecall":10,"lodash.restparam":11}],9:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
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
  if (thisArg === undefined) {
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
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = bindCallback;

},{}],10:[function(require,module,exports){
/**
 * lodash 3.0.7 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * The base implementation of `_.property` without support for deep paths.
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
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

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
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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
  return type == 'function' || (!!value && type == 'object');
}

module.exports = isIterateeCall;

},{}],11:[function(require,module,exports){
/**
 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

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

},{"lodash._basecallback":13,"lodash._baseeach":20,"lodash._basefind":24,"lodash.findindex":25,"lodash.isarray":27}],13:[function(require,module,exports){
/**
 * lodash 3.2.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIsEqual = require('lodash._baseisequal'),
    bindCallback = require('lodash._bindcallback'),
    isArray = require('lodash.isarray'),
    keys = require('lodash.keys');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

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
    return thisArg === undefined
      ? func
      : bindCallback(func, thisArg, argCount);
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return thisArg === undefined
    ? property(func)
    : baseMatchesProperty(func, thisArg);
}

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
  var index = -1,
      length = path.length;

  while (object != null && ++index < length) {
    object = object[path[index]];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands and `this` binding.
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
  var index = -1,
      length = props.length,
      noCustomizer = !customizer;

  while (++index < length) {
    if ((noCustomizer && strictCompareFlags[index])
          ? values[index] !== object[props[index]]
          : !(props[index] in object)
        ) {
      return false;
    }
  }
  index = -1;
  while (++index < length) {
    var key = props[index],
        objValue = object[key],
        srcValue = values[index];

    if (noCustomizer && strictCompareFlags[index]) {
      var result = objValue !== undefined || (key in object);
    } else {
      result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (result === undefined) {
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

  if (!length) {
    return constant(true);
  }
  if (length == 1) {
    var key = props[0],
        value = source[key];

    if (isStrictComparable(value)) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === value && (value !== undefined || (key in toObject(object)));
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
    return object != null && baseIsMatch(toObject(object), props, values, strictCompareFlags);
  };
}

/**
 * The base implementation of `_.matchesProperty` which does not which does
 * not clone `value`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} value The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(path, value) {
  var isArr = isArray(path),
      isCommon = isKey(path) && isStrictComparable(value),
      pathKey = (path + '');

  path = toPath(path);
  return function(object) {
    if (object == null) {
      return false;
    }
    var key = pathKey;
    object = toObject(object);
    if ((isArr || !isCommon) && !(key in object)) {
      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
      if (object == null) {
        return false;
      }
      key = last(path);
      object = toObject(object);
    }
    return object[key] === value
      ? (value !== undefined || (key in object))
      : baseIsEqual(value, object[key], null, true);
  };
}

/**
 * The base implementation of `_.property` without support for deep paths.
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
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 */
function basePropertyDeep(path) {
  var pathKey = (path + '');
  path = toPath(path);
  return function(object) {
    return baseGet(object, path, pathKey);
  };
}

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  var type = typeof value;
  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
    return true;
  }
  if (isArray(value)) {
    return false;
  }
  var result = !reIsDeepProp.test(value);
  return result || (object != null && value in toObject(object));
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
  return value === value && !isObject(value);
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
 * Converts `value` to property path array if it is not one.
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

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
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
  return type == 'function' || (!!value && type == 'object');
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
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
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
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function which returns the property value at `path` on a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': 2 } } },
 *   { 'a': { 'b': { 'c': 1 } } }
 * ];
 *
 * _.map(objects, _.property('a.b.c'));
 * // => [2, 1]
 *
 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}

module.exports = baseCallback;

},{"lodash._baseisequal":14,"lodash._bindcallback":16,"lodash.isarray":27,"lodash.keys":17}],14:[function(require,module,exports){
/**
 * lodash 3.0.5 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
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
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
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
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  // Exit early for identical values.
  if (value === other) {
    return true;
  }
  var valType = typeof value,
      othType = typeof other;

  // Exit early for unlike primitive values.
  if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
      value == null || other == null) {
    // Return `false` unless both values are `NaN`.
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
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
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
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
  if (!isLoose) {
    var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (valWrapped || othWrapped) {
      return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
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

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

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
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length,
      result = true;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Deep compare the contents, ignoring non-numeric properties.
  while (result && ++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    result = undefined;
    if (customizer) {
      result = isLoose
        ? customizer(othValue, arrValue, index)
        : customizer(arrValue, othValue, index);
    }
    if (result === undefined) {
      // Recursively compare arrays (susceptible to call stack limits).
      if (isLoose) {
        var othIndex = othLength;
        while (othIndex--) {
          othValue = other[othIndex];
          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          if (result) {
            break;
          }
        }
      } else {
        result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
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
        : object == +other;

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
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var skipCtor = isLoose,
      index = -1;

  while (++index < objLength) {
    var key = objProps[index],
        result = isLoose ? key in other : hasOwnProperty.call(other, key);

    if (result) {
      var objValue = object[key],
          othValue = other[key];

      result = undefined;
      if (customizer) {
        result = isLoose
          ? customizer(othValue, objValue, key)
          : customizer(objValue, othValue, key);
      }
      if (result === undefined) {
        // Recursively compare objects (susceptible to call stack limits).
        result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB);
      }
    }
    if (!result) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
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

},{"lodash.isarray":27,"lodash.istypedarray":15,"lodash.keys":17}],15:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
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
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
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
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{}],16:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}],17:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5,"lodash.isarguments":18,"lodash.isarray":27,"lodash.isnative":19}],18:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],19:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],20:[function(require,module,exports){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var keys = require('lodash.keys');

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
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
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

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
 * The base implementation of `_.property` without support for deep paths.
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
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    var length = collection ? getLength(collection) : 0;
    if (!isLength(length)) {
      return eachFunc(collection, iteratee);
    }
    var index = fromRight ? length : -1,
        iterable = toObject(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * in Safari on iOS 8.1 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
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
  return type == 'function' || (!!value && type == 'object');
}

module.exports = baseEach;

},{"lodash.keys":21}],21:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5,"lodash.isarguments":22,"lodash.isarray":27,"lodash.isnative":23}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],23:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],24:[function(require,module,exports){
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
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback'),
    baseFindIndex = require('lodash._basefindindex'),
    isArray = require('lodash.isarray');

/**
 * Creates a `_.findIndex` or `_.findLastIndex` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new find function.
 */
function createFindIndex(fromRight) {
  return function(array, predicate, thisArg) {
    if (!(array && array.length)) {
      return -1;
    }
    predicate = baseCallback(predicate, thisArg, 3);
    return baseFindIndex(array, predicate, fromRight);
  };
}

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(chr) {
 *   return chr.user == 'barney';
 * });
 * // => 0
 *
 * // using the `_.matches` callback shorthand
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.findIndex(users, 'active', false);
 * // => 0
 *
 * // using the `_.property` callback shorthand
 * _.findIndex(users, 'active');
 * // => 2
 */
var findIndex = createFindIndex();

module.exports = findIndex;

},{"lodash._basecallback":13,"lodash._basefindindex":26,"lodash.isarray":27}],26:[function(require,module,exports){
/**
 * lodash 3.6.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromRight) {
  var length = array.length,
      index = fromRight ? length : -1;

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],27:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],28:[function(require,module,exports){
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

},{"lodash.before":29}],29:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
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
    }
    if (n <= 1) {
      func = null;
    }
    return result;
  };
}

module.exports = before;

},{}],30:[function(require,module,exports){
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

},{"lodash.isfunction":31}],31:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

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
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
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
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],32:[function(require,module,exports){
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

},{"lodash._basecallback":33,"lodash._baseuniq":41,"lodash._isiterateecall":46}],33:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13,"lodash._baseisequal":34,"lodash._bindcallback":36,"lodash.isarray":37,"lodash.keys":38}],34:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14,"lodash.isarray":37,"lodash.istypedarray":35,"lodash.keys":38}],35:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15}],36:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}],37:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],38:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5,"lodash.isarguments":39,"lodash.isarray":37,"lodash.isnative":40}],39:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],40:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],41:[function(require,module,exports){
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
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
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
  return type == 'function' || (!!value && type == 'object');
}

module.exports = cacheIndexOf;

},{}],44:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
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
  return type == 'function' || (!!value && type == 'object');
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
 *
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
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],46:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"dup":10}],47:[function(require,module,exports){
//This file is generated by bin/hook.js
"use strict";

var template = require("./template");
module.exports = { media_control: template("<div class=\"media-control-background\" data-background></div><div class=\"media-control-layer\" data-controls><% var renderBar=function(name) { %><div class=\"bar-container\" data-<%= name %>><div class=\"bar-background\" data-<%= name %>><div class=\"bar-fill-1\" data-<%= name %>></div><div class=\"bar-fill-2\" data-<%= name %>></div><div class=\"bar-hover\" data-<%= name %>></div></div><div class=\"bar-scrubber\" data-<%= name %>><div class=\"bar-scrubber-icon\" data-<%= name %>></div></div></div><% }; %><% var renderSegmentedBar=function(name, segments) { segments=segments || 10; %><div class=\"bar-container\" data-<%= name %>><% for (var i = 0; i < segments; i++) { %><div class=\"segmented-bar-element\" data-<%= name %>></div><% } %></div><% }; %><% var renderDrawer=function(name, renderContent) { %><div class=\"drawer-container\" data-<%= name %>><div class=\"drawer-icon-container\" data-<%= name %>><div class=\"drawer-icon media-control-icon\" data-<%= name %>></div><span class=\"drawer-text\" data-<%= name %>></span></div><% renderContent(name); %></div><% }; %><% var renderIndicator=function(name) { %><div class=\"media-control-indicator\" data-<%= name %>></div><% }; %><% var renderButton=function(name) { %><button class=\"media-control-button media-control-icon\" data-<%= name %>></button><% }; %><% var templates={ bar: renderBar, segmentedBar: renderSegmentedBar, }; var render=function(settingsList) { settingsList.forEach(function(setting) { if(setting === \"seekbar\") { renderBar(setting); } else if (setting === \"volume\") { renderDrawer(setting, settings.volumeBarTemplate ? templates[settings.volumeBarTemplate] : function(name) { return renderSegmentedBar(name); }); } else if (setting === \"duration\" || setting=== \"position\") { renderIndicator(setting); } else { renderButton(setting); } }); }; %><% if (settings.default && settings.default.length) { %><div class=\"media-control-center-panel\" data-media-control><% render(settings.default); %></div><% } %><% if (settings.left && settings.left.length) { %><div class=\"media-control-left-panel\" data-media-control><% render(settings.left); %></div><% } %><% if (settings.right && settings.right.length) { %><div class=\"media-control-right-panel\" data-media-control><% render(settings.right); %></div><% } %></div>"), seek_time: template("<span data-seek-time></span>"), flash: template("<param name=\"movie\" value=\"<%= baseUrl %>/assets/Player.swf\"><param name=\"quality\" value=\"autohigh\"><param name=\"swliveconnect\" value=\"true\"><param name=\"allowScriptAccess\" value=\"always\"><param name=\"bgcolor\" value=\"#001122\"><param name=\"allowFullScreen\" value=\"false\"><param name=\"wmode\" value=\"transparent\"><param name=\"tabindex\" value=\"1\"><param name=FlashVars value=\"playbackId=<%= playbackId %>\" /><embed type=\"application/x-shockwave-flash\" disabled tabindex=\"-1\" enablecontextmenu=\"false\" allowScriptAccess=\"always\" quality=\"autohight\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" wmode=\"transparent\" swliveconnect=\"true\" type=\"application/x-shockwave-flash\" allowfullscreen=\"false\" bgcolor=\"#000000\" FlashVars=\"playbackId=<%= playbackId %>\" src=\"<%= baseUrl %>/assets/Player.swf\"></embed>"), hls: template("<param name=\"movie\" value=\"<%= baseUrl %>/assets/HLSPlayer.swf?inline=1\"><param name=\"quality\" value=\"autohigh\"><param name=\"swliveconnect\" value=\"true\"><param name=\"allowScriptAccess\" value=\"always\"><param name=\"bgcolor\" value=\"#001122\"><param name=\"allowFullScreen\" value=\"false\"><param name=\"wmode\" value=\"transparent\"><param name=\"tabindex\" value=\"1\"><param name=FlashVars value=\"playbackId=<%= playbackId %>\" /><embed type=\"application/x-shockwave-flash\" tabindex=\"1\" enablecontextmenu=\"false\" allowScriptAccess=\"always\" quality=\"autohigh\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" wmode=\"transparent\" swliveconnect=\"true\" type=\"application/x-shockwave-flash\" allowfullscreen=\"false\" bgcolor=\"#000000\" FlashVars=\"playbackId=<%= playbackId %>\" src=\"<%= baseUrl %>/assets/HLSPlayer.swf\" width=\"100%\" height=\"100%\"></embed>"), html5_video: template("<source src=\"<%=src%>\" type=\"<%=type%>\">"), no_op: template("<canvas data-no-op-canvas></canvas><p data-no-op-msg>Your browser does not support the playback of this video. Try to use a different browser.<p>"), dvr_controls: template("<div class=\"live-info\">LIVE</div><button class=\"live-button\">BACK TO LIVE</button>"), poster: template("<div class=\"play-wrapper\" data-poster><span class=\"poster-icon play\" data-poster/></div>"), spinner_three_bounce: template("<div data-bounce1></div><div data-bounce2></div><div data-bounce3></div>"), watermark: template("<div data-watermark data-watermark-<%=position %>><img src=\"<%= imageUrl %>\"></div>"), CSS: { container: ".container[data-container]{position:absolute;background-color:#000;height:100%;width:100%}.container[data-container].pointer-enabled{cursor:pointer}", core: "[data-player]{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0);position:relative;margin:0;padding:0;border:0;font-style:normal;font-weight:400;text-align:center;overflow:hidden;font-size:100%;font-family:\"lucida grande\",tahoma,verdana,arial,sans-serif;text-shadow:0 0 0;box-sizing:border-box}[data-player] a,[data-player] abbr,[data-player] acronym,[data-player] address,[data-player] applet,[data-player] article,[data-player] aside,[data-player] audio,[data-player] b,[data-player] big,[data-player] blockquote,[data-player] canvas,[data-player] caption,[data-player] center,[data-player] cite,[data-player] code,[data-player] dd,[data-player] del,[data-player] details,[data-player] dfn,[data-player] div,[data-player] dl,[data-player] dt,[data-player] em,[data-player] embed,[data-player] fieldset,[data-player] figcaption,[data-player] figure,[data-player] footer,[data-player] form,[data-player] h1,[data-player] h2,[data-player] h3,[data-player] h4,[data-player] h5,[data-player] h6,[data-player] header,[data-player] hgroup,[data-player] i,[data-player] iframe,[data-player] img,[data-player] ins,[data-player] kbd,[data-player] label,[data-player] legend,[data-player] li,[data-player] mark,[data-player] menu,[data-player] nav,[data-player] object,[data-player] ol,[data-player] output,[data-player] p,[data-player] pre,[data-player] q,[data-player] ruby,[data-player] s,[data-player] samp,[data-player] section,[data-player] small,[data-player] span,[data-player] strike,[data-player] strong,[data-player] sub,[data-player] summary,[data-player] sup,[data-player] table,[data-player] tbody,[data-player] td,[data-player] tfoot,[data-player] th,[data-player] thead,[data-player] time,[data-player] tr,[data-player] tt,[data-player] u,[data-player] ul,[data-player] var,[data-player] video{margin:0;padding:0;border:0;font:inherit;font-size:100%;vertical-align:baseline}[data-player] table{border-collapse:collapse;border-spacing:0}[data-player] caption,[data-player] td,[data-player] th{text-align:left;font-weight:400;vertical-align:middle}[data-player] blockquote,[data-player] q{quotes:none}[data-player] blockquote:after,[data-player] blockquote:before,[data-player] q:after,[data-player] q:before{content:\"\";content:none}[data-player] a img{border:none}[data-player]:focus{outline:0}[data-player] *{max-width:initial;box-sizing:inherit;float:initial}[data-player].fullscreen{width:100%!important;height:100%!important}[data-player].nocursor{cursor:none}.clappr-style{display:none!important}@media screen{[data-player]{opacity:.99}}", media_control: "@font-face{font-family:Player;src:url(\"<%= baseUrl %>/assets/Player-Regular.eot\");src:url(\"<%= baseUrl %>/assets/Player-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"<%= baseUrl %>/assets/Player-Regular.ttf\") format(\"truetype\"),url(\"<%= baseUrl %>/assets/Player-Regular.svg#player\") format(\"svg\")}.media-control-notransition{-webkit-transition:none!important;-webkit-transition-delay:0s;-moz-transition:none!important;-o-transition:none!important;transition:none!important}.media-control[data-media-control]{position:absolute;width:100%;height:100%;z-index:9999;pointer-events:none}.media-control[data-media-control].dragging{pointer-events:auto;cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control].dragging *{cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control] .media-control-background[data-background]{position:absolute;height:40%;width:100%;bottom:0;background-image:-owg(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-webkit(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-moz(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-o(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9));-webkit-transition:opacity .6s;-webkit-transition-delay:ease-out;-moz-transition:opacity .6s ease-out;-o-transition:opacity .6s ease-out;transition:opacity .6s ease-out}.media-control[data-media-control] .media-control-icon{font-family:Player;font-weight:400;font-style:normal;font-size:26px;line-height:32px;letter-spacing:0;speak:none;color:#fff;opacity:.5;vertical-align:middle;text-align:left;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.media-control[data-media-control] .media-control-icon:hover{color:#fff;opacity:.75;text-shadow:rgba(255,255,255,.8) 0 0 5px}.media-control[data-media-control].media-control-hide .media-control-background[data-background]{opacity:0}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls]{bottom:-50px}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls]{position:absolute;bottom:7px;width:100%;height:32px;vertical-align:middle;pointer-events:auto;-webkit-transition:bottom .4s;-webkit-transition-delay:ease-out;-moz-transition:bottom .4s ease-out;-o-transition:bottom .4s ease-out;transition:bottom .4s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-left-panel[data-media-control]{position:absolute;top:0;left:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-center-panel[data-media-control]{height:100%;text-align:center;line-height:32px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-right-panel[data-media-control]{position:absolute;top:0;right:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button{background-color:transparent;border:0;margin:0 6px;padding:0;cursor:pointer;display:inline-block}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button:focus{outline:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]:before{content:\"\\e002\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]:before{content:\"\\e003\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]{float:right;background-color:transparent;border:0;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]:before{content:\"\\e006\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen].shrink:before{content:\"\\e007\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]{cursor:default;float:right;background-color:transparent;border:0;height:100%;opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]:before{content:\"\\e008\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled:hover{opacity:1;text-shadow:none}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].playing:before{content:\"\\e002\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].paused:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].playing:before{content:\"\\e003\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].stopped:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration],.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{display:inline-block;font-size:10px;color:#fff;cursor:default;line-height:32px;position:relative}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{margin-left:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]{color:rgba(255,255,255,.5);margin-right:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]:before{content:\"|\";margin:0 3px}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]{position:absolute;top:-20px;left:0;display:inline-block;vertical-align:middle;width:100%;height:25px;cursor:pointer}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar]{width:100%;height:1px;position:relative;top:12px;background-color:#666}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-1[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#c2c2c2;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#005aff;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0;position:absolute;top:-3px;width:5px;height:7px;background-color:rgba(255,255,255,.5);-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled{cursor:default}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{position:absolute;top:2px;left:0;width:20px;height:20px;opacity:1;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] .bar-scrubber-icon[data-seekbar]{position:absolute;left:6px;top:6px;width:8px;height:8px;border-radius:10px;box-shadow:0 0 0 6px rgba(255,255,255,.2);background-color:#fff}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume]{float:right;display:inline-block;height:32px;cursor:pointer;margin:0 6px;box-sizing:border-box}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume]{float:left;bottom:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]{background-color:transparent;border:0;box-sizing:content-box;width:16px;height:32px;margin-right:6px;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:hover{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:before{content:\"\\e004\"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted{opacity:.5}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:hover{opacity:.7}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:before{content:\"\\e005\"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume]{float:left;position:relative;top:6px;width:42px;height:18px;padding:3px 0;overflow:hidden;-webkit-transition:width .2s;-webkit-transition-delay:ease-out;-moz-transition:width .2s ease-out;-o-transition:width .2s ease-out;transition:width .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]{float:left;width:4px;padding-left:2px;height:12px;opacity:.5;-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;-webkit-transition:-webkit-transform .2s;-webkit-transition-delay:ease-out;-moz-transition:-moz-transform .2s ease-out;-o-transition:-o-transform .2s ease-out;transition:transform .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume].fill{-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:nth-of-type(1){padding-left:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:hover{-webkit-transform:scaleY(1.5);-moz-transform:scaleY(1.5);-ms-transform:scaleY(1.5);-o-transform:scaleY(1.5);transform:scaleY(1.5)}.media-control[data-media-control].w320 .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume].volume-bar-hide{height:12px;top:9px;padding:0;width:0}", seek_time: ".seek-time[data-seek-time]{position:absolute;width:auto;height:20px;line-height:20px;bottom:55px;background-color:rgba(2,2,2,.5);z-index:9999;-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.seek-time[data-seek-time].hidden[data-seek-time]{opacity:0}.seek-time[data-seek-time] span[data-seek-time]{position:relative;color:#fff;font-size:10px;padding-left:7px;padding-right:7px}", flash: "[data-flash]{position:absolute;height:100%;width:100%;background-color:#000;display:block;pointer-events:none}", hls: "[data-hls]{position:absolute;display:block;pointer-events:none;top:0}", html5_video: "[data-html5-video]{position:absolute;height:100%;width:100%;display:block}", html_img: "[data-html-img]{max-width:100%;max-height:100%}", no_op: "[data-no-op]{z-index:1000;position:absolute;height:100%;width:100%;text-align:center}[data-no-op] p[data-no-op-msg]{position:absolute;font-size:25px;top:40%;color:#fff}[data-no-op] canvas[data-no-op-canvas]{background-color:#777;height:100%;width:100%}", dvr_controls: "@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local(\"Roboto\"),local(\"Roboto-Regular\"),url(\"<%= baseUrl %>/assets/Roboto.ttf\") format(\"truetype\")}.dvr-controls[data-dvr-controls]{display:inline-block;float:left;color:#fff;line-height:32px;font-size:10px;font-weight:700;margin-left:6px}.dvr-controls[data-dvr-controls] .live-info{cursor:default;font-family:Roboto,\"Open Sans\",Arial,sans-serif}.dvr-controls[data-dvr-controls] .live-info:before{content:\"\";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#ff0101}.dvr-controls[data-dvr-controls] .live-info.disabled{opacity:.3}.dvr-controls[data-dvr-controls] .live-info.disabled:before{background-color:#fff}.dvr-controls[data-dvr-controls] .live-button{cursor:pointer;outline:0;display:none;border:0;color:#fff;background-color:transparent;height:32px;padding:0;opacity:.7;font-family:Roboto,\"Open Sans\",Arial,sans-serif;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.dvr-controls[data-dvr-controls] .live-button:before{content:\"\";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#fff}.dvr-controls[data-dvr-controls] .live-button:hover{opacity:1;text-shadow:rgba(255,255,255,.75) 0 0 5px}.dvr .dvr-controls[data-dvr-controls] .live-info{display:none}.dvr .dvr-controls[data-dvr-controls] .live-button{display:block}.dvr.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#005aff}.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#ff0101}.seek-time[data-seek-time] span[data-duration]{position:relative;color:rgba(255,255,255,.5);font-size:10px;padding-right:7px}.seek-time[data-seek-time] span[data-duration]:before{content:\"|\";margin-right:7px}", poster: "@font-face{font-family:Player;src:url(\"<%= baseUrl %>/assets/Player-Regular.eot\");src:url(\"<%= baseUrl %>/assets/Player-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"<%= baseUrl %>/assets/Player-Regular.ttf\") format(\"truetype\"),url(\"<%= baseUrl %>/assets/Player-Regular.svg#player\") format(\"svg\")}.player-poster[data-poster]{cursor:pointer;position:absolute;height:100%;width:100%;z-index:998;top:0}.player-poster[data-poster] .poster-background[data-poster]{width:100%;height:100%;background-size:cover;background-repeat:no-repeat;background-position:50% 50%}.player-poster[data-poster] .play-wrapper[data-poster]{position:absolute;width:100%;height:25%;line-height:100%;font-size:25%;top:50%;text-align:center}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]{font-family:Player;font-weight:400;font-style:normal;line-height:1;letter-spacing:0;speak:none;color:#fff;opacity:.75;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:opacity text-shadow;-webkit-transition-delay:.1s;-moz-transition:opacity text-shadow .1s;-o-transition:opacity text-shadow .1s;transition:opacity text-shadow .1s ease}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster].play[data-poster]:before{content:\"\\e001\"}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]:hover{opacity:1;text-shadow:rgba(255,255,255,.8) 0 0 15px}", spinner_three_bounce: ".spinner-three-bounce[data-spinner]{position:absolute;margin:0 auto;width:70px;text-align:center;z-index:999;top:47%;left:0;right:0}.spinner-three-bounce[data-spinner]>div{width:18px;height:18px;background-color:#FFF;border-radius:100%;display:inline-block;-webkit-animation:bouncedelay 1.4s infinite ease-in-out;-moz-animation:bouncedelay 1.4s infinite ease-in-out;-ms-animation:bouncedelay 1.4s infinite ease-in-out;-o-animation:bouncedelay 1.4s infinite ease-in-out;animation:bouncedelay 1.4s infinite ease-in-out;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both}.spinner-three-bounce[data-spinner] [data-bounce1],.spinner-three-bounce[data-spinner] [data-bounce2]{-webkit-animation-delay:-.32s;-moz-animation-delay:-.32s;-ms-animation-delay:-.32s;-o-animation-delay:-.32s;animation-delay:-.32s}@-moz-keyframes bouncedelay{0%,100%,80%{-moz-transform:scale(0);transform:scale(0)}40%{-moz-transform:scale(1);transform:scale(1)}}@-webkit-keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@-o-keyframes bouncedelay{0%,100%,80%{-o-transform:scale(0);transform:scale(0)}40%{-o-transform:scale(1);transform:scale(1)}}@-ms-keyframes bouncedelay{0%,100%,80%{-ms-transform:scale(0);transform:scale(0)}40%{-ms-transform:scale(1);transform:scale(1)}}@keyframes bouncedelay{0%,100%,80%{transform:scale(0)}40%{transform:scale(1)}}", watermark: "[data-watermark]{position:absolute;margin:100px auto 0;width:70px;text-align:center;z-index:10}[data-watermark-bottom-left]{bottom:10px;left:10px}[data-watermark-bottom-right]{bottom:10px;right:42px}[data-watermark-top-left]{top:-95px;left:10px}[data-watermark-top-right]{top:-95px;right:37px}" } };

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
  if (!isFinite(time)) {
    return "--:--";
  }
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

},{"../components/browser":"browser","lodash.assign":1}],50:[function(require,module,exports){
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
    this.currentTime = 0;
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
        return {
          click: "clicked",
          dblclick: "dblClicked",
          doubleTap: "dblClicked",
          mouseenter: "mouseEnter",
          mouseleave: "mouseLeave"
        };
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
    getCurrentTime: {
      value: function getCurrentTime() {
        return this.currentTime;
      }
    },
    getDuration: {
      value: function getDuration() {
        return this.playback.getDuration();
      }
    },
    error: {
      value: function error(errorObj) {
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
        this.currentTime = position;
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
        this.currentTime = 0;
      }
    },
    pause: {
      value: function pause() {
        this.playback.pause();
        this.trigger(Events.CONTAINER_PAUSE, this.name);
      }
    },
    ended: {
      value: function ended() {
        this.trigger(Events.CONTAINER_ENDED, this, this.name);
        this.currentTime = 0;
      }
    },
    clicked: {
      value: function clicked() {
        this.trigger(Events.CONTAINER_CLICK, this, this.name);
      }
    },
    dblClicked: {
      value: function dblClicked() {
        this.trigger(Events.CONTAINER_DBLCLICK, this, this.name);
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
        var _this = this;

        return find(this.loader.playbackPlugins, function (p) {
          return p.canPlay(source.toString(), _this.options.mimeType);
        });
      }
    },
    createContainer: {
      value: function createContainer(source, options) {
        if (!!source.match(/^\/\//)) source = window.location.protocol + source;
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

},{"../../base/base_object":"base_object","../../base/events":"events","../container":"container","clappr-zepto":"zepto","lodash.assign":1,"lodash.find":12}],52:[function(require,module,exports){
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
var Browser = require("../browser");

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
          "data-player": "",
          tabindex: 9999 };
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
        if (!Browser.isiOs) {
          this.$el.addClass("fullscreen");
          this.$el.removeAttr("style");
          PlayerInfo.previousSize = PlayerInfo.currentSize;
          PlayerInfo.currentSize = { width: $(window).width(), height: $(window).height() };
        }
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
      value: function load(sources, mimeType) {
        var _this = this;

        this.options.mimeType = mimeType;
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
          this.mediaControl = this.createMediaControl(assign({ container: container, focusElement: this.el }, this.options));
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
          if (!Browser.isiOs) {
            this.$el.addClass("fullscreen");
          }
        } else {
          Fullscreen.cancelFullscreen();
          if (!Browser.isiOs) {
            this.$el.removeClass("fullscreen nocursor");
          }
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

},{"../../base/events":"events","../../base/styler":48,"../../base/ui_object":"ui_object","../../base/utils":49,"../browser":"browser","../container_factory":52,"../media_control":"media_control","../mediator":"mediator","../player_info":"player_info","clappr-zepto":"zepto","lodash.assign":1,"lodash.find":12}],54:[function(require,module,exports){
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
    this.playbackPlugins = [HTML5AudioPlayback, HTML5VideoPlayback, FlashVideoPlayback, HLSVideoPlayback, HTMLImgPlayback, NoOp];
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

},{"../../base/base_object":"base_object","../../playbacks/flash":"flash","../../playbacks/hls":"hls","../../playbacks/html5_audio":"html5_audio","../../playbacks/html5_video":"html5_video","../../playbacks/html_img":"html_img","../../playbacks/no_op":67,"../../plugins/click_to_pause":70,"../../plugins/dvr_controls":72,"../../plugins/google_analytics":74,"../../plugins/poster":"poster","../../plugins/spinner_three_bounce":78,"../../plugins/stats":80,"../../plugins/watermark":82,"../player_info":"player_info","lodash.uniq":32}],58:[function(require,module,exports){
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
    this.seekTime = new SeekTime(this);
    this.options = options;
    this.mute = this.options.mute;
    this.persistConfig = this.options.persistConfig;
    this.container = options.container;
    var initialVolume = this.persistConfig ? Utils.Config.restore("volume") : 100;
    this.setVolume(this.mute ? 0 : initialVolume);
    this.keepVisible = false;
    this.volumeBarClickDown = false;
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
          "mousedown .segmented-bar-element[data-volume]": "mousedownOnVolumeBar",
          "mouseleave .media-control-layer": "mouseleaveOnVolumeBar",
          "mousemove .segmented-bar-element[data-volume]": "mousemoveOnVolumeBar",
          "mouseup .segmented-bar-element[data-volume]": "mouseupOnVolumeBar",
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
        this.listenTo(this.container, Events.CONTAINER_PAUSE, this.changeTogglePlay);
        this.listenTo(this.container, Events.CONTAINER_DBLCLICK, this.toggleFullscreen);
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
    mousemoveOnVolumeBar: {
      value: function mousemoveOnVolumeBar(event) {
        if (this.volumeBarClickDown) {
          this.volume(event);
        }
      }
    },
    mousedownOnVolumeBar: {
      value: function mousedownOnVolumeBar() {
        var cursorStyleProperty = "url(http://www.google.com/intl/en_ALL/mapfiles/closedhand.cur), move";
        this.$volumeBarContainer.css("cursor", cursorStyleProperty);
        this.$volumeBarContainer.css("cursor", "-webkit-grabbing");
        this.$volumeBarContainer.css("cursor", "-moz-grabbing");
        this.volumeBarClickDown = true;
      }
    },
    mouseupOnVolumeBar: {
      value: function mouseupOnVolumeBar() {
        this.$volumeBarContainer.css("cursor", "pointer");
        this.volumeBarClickDown = false;
      }
    },
    mouseleaveOnVolumeBar: {
      value: function mouseleaveOnVolumeBar(event) {
        var volOffset = this.$volumeBarContainer.offset();

        var outsideByLeft = event.pageX < this.$seekBarContainer.offset().left;
        var outsideByRight = event.pageX > volOffset.left + volOffset.width;
        var outsideHorizontally = outsideByLeft || outsideByRight;

        var outsideByTop = event.pageY < volOffset.top;
        var outsideByBottom = event.pageY > volOffset.top + volOffset.height;

        var outsideVertically = outsideByTop || outsideByBottom;

        if (outsideHorizontally || outsideVertically) {
          this.mouseupOnVolumeBar();
        }
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
        value = Math.min(value, 100);
        var pos = this.$seekBarContainer.width() * value / 100 - this.$seekBarScrubber.width() / 2;
        this.currentSeekPercentage = value;
        this.$seekBarPosition.css({ width: value + "%" });
        this.$seekBarScrubber.css({ left: pos });
      }
    },
    seekRelative: {
      value: function seekRelative(delta) {
        if (!this.container.settings.seekEnabled) {
          return;
        }var currentTime = this.container.getCurrentTime();
        var duration = this.container.getDuration();
        var position = Math.min(Math.max(currentTime + delta, 0), duration);
        position = Math.min(position * 100 / duration, 100);
        this.container.setCurrentTime(position);
      }
    },
    bindKeyEvents: {
      value: function bindKeyEvents() {
        var _this = this;

        this.kibo.down(["space"], function () {
          return _this.togglePlayPause();
        });
        this.kibo.down(["left"], function () {
          return _this.seekRelative(-15);
        });
        this.kibo.down(["right"], function () {
          return _this.seekRelative(15);
        });
        var keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        keys.forEach(function (i) {
          _this.kibo.down(i.toString(), function () {
            return _this.container.settings.seekEnabled && _this.container.setCurrentTime(i * 10);
          });
        });
      }
    },
    unbindKeyEvents: {
      value: function unbindKeyEvents() {
        this.kibo.off("space");
        this.kibo.off([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
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

        if (this.kibo) {
          this.unbindKeyEvents();
        }
        this.kibo = new Kibo(this.options.focusElement);

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
var find = require("lodash.find");
var Events = require("events");
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
        this.addEventListeners();
      }
    },
    addEventListeners: {
      value: function addEventListeners() {
        this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_CONTAINERCHANGED, this.containerChanged);
        var container = this.core.mediaControl.container;
        if (!!container) {
          this.listenTo(container, Events.CONTAINER_PLAY, this.onPlay);
          this.listenTo(container, Events.CONTAINER_PAUSE, this.onPause);
          this.listenTo(container, Events.CONTAINER_STOP, this.onStop);
          this.listenTo(container, Events.CONTAINER_ENDED, this.onEnded);
          this.listenTo(container, Events.CONTAINER_SEEK, this.onSeek);
          this.listenTo(container, Events.CONTAINER_ERROR, this.onError);
          this.listenTo(container, Events.CONTAINER_TIMEUPDATE, this.onTimeUpdate);
        }
      }
    },
    containerChanged: {
      value: function containerChanged() {
        this.stopListening();
        this.addEventListeners();
      }
    },
    onPlay: {
      value: function onPlay() {
        this.trigger(Events.PLAYER_PLAY);
      }
    },
    onPause: {
      value: function onPause() {
        this.trigger(Events.PLAYER_PAUSE);
      }
    },
    onStop: {
      value: function onStop() {
        this.trigger(Events.PLAYER_STOP, this.getCurrentTime());
      }
    },
    onEnded: {
      value: function onEnded() {
        this.trigger(Events.PLAYER_ENDED);
      }
    },
    onSeek: {
      value: function onSeek(percent) {
        this.trigger(Events.PLAYER_SEEK, percent);
      }
    },
    onTimeUpdate: {
      value: function onTimeUpdate(position, duration) {
        this.trigger(Events.PLAYER_TIMEUPDATE, position, duration);
      }
    },
    onError: {
      value: function onError(error) {
        this.trigger(Events.PLAYER_ERROR, error);
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
      value: function load(sources, mimeType) {
        this.core.load(sources, mimeType);
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
    getPlugin: {
      value: function getPlugin(name) {
        var plugins = this.core.plugins.concat(this.core.mediaControl.container.plugins);
        return find(plugins, function (plugin) {
          return plugin.name === name;
        });
      }
    },
    getCurrentTime: {
      value: function getCurrentTime() {
        return this.core.mediaControl.container.getCurrentTime();
      }
    },
    getDuration: {
      value: function getDuration() {
        return this.core.mediaControl.container.getDuration();
      }
    }
  });

  return Player;
})(BaseObject);

module.exports = Player;

},{"../base/base_object":"base_object","../base/utils":49,"./core_factory":55,"./loader":56,"./player_info":"player_info","events":"events","lodash.assign":1,"lodash.find":12}],60:[function(require,module,exports){
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
        if (this.mediaControl.container.settings.seekEnabled) {
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
        Mediator.on(this.uniqueId + ":progress", this.progress, this);
        Mediator.on(this.uniqueId + ":timeupdate", this.updateTime, this);
        Mediator.on(this.uniqueId + ":statechanged", this.checkState, this);
        Mediator.on(this.uniqueId + ":flashready", this.bootstrap, this);
      }
    },
    stopListening: {
      value: function stopListening() {
        _get(Object.getPrototypeOf(Flash.prototype), "stopListening", this).call(this);
        Mediator.off(this.uniqueId + ":progress");
        Mediator.off(this.uniqueId + ":timeupdate");
        Mediator.off(this.uniqueId + ":statechanged");
        Mediator.off(this.uniqueId + ":flashready");
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

},{"../../base/events":"events","../../base/jst":47,"../../base/playback":"playback","../../base/styler":48,"../../base/template":"template","../../base/utils":49,"../../components/browser":"browser","../../components/mediator":"mediator","clappr-zepto":"zepto"}],63:[function(require,module,exports){
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
    this.maxBufferLength = options.maxBufferLength || 120;
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
        this.srcLoaded = false;
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
        this.el.globoPlayerSetmaxBufferLength(this.maxBufferLength);
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
        } else if (!this.srcLoaded && this.currentState !== "PLAYING") {
          this.firstPlay();
        } else {
          this.el.globoPlayerPlay();
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
        if (["PLAYING_BUFFERING", "PAUSED_BUFFERING"].indexOf(state) >= 0) {
          this.trigger(Events.PLAYBACK_BUFFERING, this.name);
          this.updateCurrentState(state);
        } else if (["PLAYING", "PAUSED"].indexOf(state) >= 0) {
          if (["PLAYING_BUFFERING", "PAUSED_BUFFERING", "PAUSED", "IDLE"].indexOf(this.currentState) >= 0) {
            this.trigger(Events.PLAYBACK_BUFFERFULL, this.name);
          }
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
        this.srcLoaded = true;
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

HLS.canPlay = function (resource, mimeType) {
  return Browser.hasFlash && (!!resource.match(/^http(.*).m3u8?/) || mimeType === "application/x-mpegURL");
};

module.exports = HLS;

},{"../../base/events":"events","../../base/jst":47,"../../base/playback":"playback","../../base/styler":48,"../../base/template":"template","../../components/browser":"browser","../../components/mediator":"mediator","clappr-zepto":"zepto","lodash.assign":1}],64:[function(require,module,exports){
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
    this.options = params;
    this.settings = {
      left: ["playpause", "position", "duration"],
      right: ["fullscreen", "volume"],
      "default": ["seekbar"],
      seekEnabled: true
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
          loadedmetadata: "loadedMetadata",
          stalled: "stalled",
          waiting: "waiting",
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
    loadedMetadata: {
      value: function loadedMetadata(e) {
        this.durationChange();
        this.trigger(Events.PLAYBACK_LOADEDMETADATA, e.target.duration);
      }
    },
    durationChange: {
      value: function durationChange() {
        // we can't figure out if hls resource is VoD or not until it is being loaded or duration has changed.
        // that's why we check it again and update media control accordingly.
        if (this.getPlaybackType() === "aod") {
          this.settings.left = ["playpause", "position", "duration"];
        } else {
          this.settings.left = ["playstop"];
        }
        this.settings.seekEnabled = isFinite(this.getDuration());
        this.trigger(Events.PLAYBACK_SETTINGSUPDATE);
      }
    },
    getPlaybackType: {
      value: function getPlaybackType() {
        return [0, undefined, Infinity].indexOf(this.el.duration) >= 0 ? "live" : "aod";
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
    play: {
      value: function play() {
        this.el.src = this.options.src;
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
        this.el.src = "";
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
        if (this.getPlaybackType() === "live") {
          this.trigger(Events.PLAYBACK_TIMEUPDATE, 1, 1, this.name);
        } else {
          this.trigger(Events.PLAYBACK_TIMEUPDATE, this.el.currentTime, this.el.duration, this.name);
        }
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

HTML5Audio.canPlay = function (resource, mimeType) {
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
  } else if (mimeType) {
    var a = document.createElement("audio");
    return !!a.canPlayType(mimeType).replace(/no/, "");
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
var Styler = require("../../base/styler");
var Browser = require("../../components/browser");
var seekStringToSeconds = require("../../base/utils").seekStringToSeconds;
var Events = require("../../base/events");
var find = require("lodash.find");

var HTML5Video = (function (_Playback) {
  function HTML5Video(options) {
    _classCallCheck(this, HTML5Video);

    _get(Object.getPrototypeOf(HTML5Video.prototype), "constructor", this).call(this, options);
    this.options = options;
    this.src = options.src;
    this.el.src = options.src;
    this.el.loop = options.loop;
    this.firstBuffer = true;
    this.settings = { "default": ["seekbar"] };
    if (Browser.isSafari) {
      this.setupSafari();
    } else {
      this.el.preload = options.preload ? options.preload : "metadata";
      this.settings.seekEnabled = true;
    }
    this.settings.left = ["playpause", "position", "duration"];
    this.settings.right = ["fullscreen", "volume"];
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
          durationchange: "durationChange",
          error: "error"
        };
      }
    },
    setupSafari: {
      value: function setupSafari() {
        this.el.preload = "auto";
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
        } else {
          this.settings.left = ["playstop"];
        }
        this.settings.seekEnabled = isFinite(this.getDuration());
        this.trigger(Events.PLAYBACK_SETTINGSUPDATE);
      }
    },
    getPlaybackType: {
      value: function getPlaybackType() {
        return [0, undefined, Infinity].indexOf(this.el.duration) >= 0 ? "live" : "vod";
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
    error: {
      value: function error(event) {
        this.trigger(Events.PLAYBACK_ERROR, this.el.error, this.name);
      }
    },
    destroy: {
      value: function destroy() {
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

HTML5Video.canPlay = function (resource, mimeType) {
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
  } else if (mimeType) {
    var v = document.createElement("video");
    return !!v.canPlayType(mimeType).replace(/no/, "");
  }
  return false;
};

module.exports = HTML5Video;

},{"../../base/events":"events","../../base/jst":47,"../../base/playback":"playback","../../base/styler":48,"../../base/utils":49,"../../components/browser":"browser","lodash.find":12}],66:[function(require,module,exports){
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

var BOLD = "font-weight: bold; font-size: 13px;";
var INFO = "color: #006600;" + BOLD;
var DEBUG = "color: #0000ff;" + BOLD;
var WARN = "color: #ff8000;" + BOLD;
var ERROR = "color: #ff0000;" + BOLD;
var DEFAULT = "";

var Log = (function () {
  function Log() {
    var _this = this;

    _classCallCheck(this, Log);

    this.kibo = new Kibo();
    this.kibo.down(["ctrl shift d"], function () {
      return _this.onOff();
    });
    this.BLACKLIST = ["timeupdate", "playback:timeupdate", "playback:progress", "container:hover", "container:timeupdate", "container:progress"];
  }

  _createClass(Log, {
    info: {
      value: function info(klass) {
        this.log(klass, "info", Array.prototype.slice.call(arguments, 1));
      }
    },
    warn: {
      value: function warn(klass) {
        this.log(klass, "warn", Array.prototype.slice.call(arguments, 1));
      }
    },
    debug: {
      value: function debug(klass) {
        this.log(klass, "debug", Array.prototype.slice.call(arguments, 1));
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
        if (!window.DEBUG || this.BLACKLIST.indexOf(message[0]) >= 0) {
          return;
        }if (!message) {
          message = klass;
          klass = null;
        }
        var color;
        if (level === "warn") {
          color = WARN;
        } else if (level === "info") {
          color = INFO;
        } else if (level === "debug") {
          color = DEBUG;
        } else if (level === "error") {
          color = ERROR;
        }
        var klassDescription = "";
        if (klass) {
          klassDescription = "[" + klass + "]";
        }
        console.log.apply(console, ["%c[" + level + "]" + klassDescription, color].concat(message));
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
        var _this = this;

        this.showTimeout = setTimeout(function () {
          return _this.$el.show();
        }, 300);
      }
    },
    onBufferFull: {
      value: function onBufferFull() {
        clearTimeout(this.showTimeout);
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
Browser.isiOs = !!/iPad|iPhone|iPod/i.test(navigator.userAgent);
Browser.isWin8App = !!/MSAppHost/i.test(navigator.userAgent);
Browser.isWiiU = !!/WiiU/i.test(navigator.userAgent);
Browser.isPS4 = !!/PlayStation 4/i.test(navigator.userAgent);
Browser.hasLocalstorage = hasLocalstorage();
Browser.hasFlash = hasFlash();

module.exports = Browser;

},{}],"clappr":[function(require,module,exports){
// Copyright 2014 Globo.com Player authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

"use strict";

var Player = require("./components/player");
var Mediator = require("./components/mediator");
var Events = require("./base/events");

window.DEBUG = false;

window.Clappr = { Player: Player, Mediator: Mediator, Events: Events };
window.Clappr.version = "0.0.115";

module.exports = window.Clappr;

},{"./base/events":"events","./components/mediator":"mediator","./components/player":59}],"container_plugin":[function(require,module,exports){
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
        var klass = this.constructor.name;
        if (this.hasOwnProperty(name)) {
          klass = this.name;
        }
        Log.debug.apply(Log, [klass].concat(Array.prototype.slice.call(arguments)));
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
Events.PLAYER_RESIZE = "resize";
Events.PLAYER_PLAY = "play";
Events.PLAYER_PAUSE = "pause";
Events.PLAYER_STOP = "stop";
Events.PLAYER_ENDED = "ended";
Events.PLAYER_SEEK = "seek";
Events.PLAYER_ERROR = "error";
Events.PLAYER_TIMEUPDATE = "timeupdate";

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
Events.CONTAINER_DBLCLICK = "container:dblclick";
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

},{"../plugins/log":75,"./utils":49,"lodash.once":28}],"flash":[function(require,module,exports){
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

},{"./base_object":"base_object","./utils":49,"clappr-zepto":"zepto","lodash.assign":1,"lodash.result":30}],"zepto":[function(require,module,exports){
/* Zepto v1.1.4-80-ga9184b2 - zepto event ajax callbacks deferred touch selector ie - zeptojs.com/license */
var Zepto=function(){function D(t){return null==t?String(t):j[S.call(t)]||"object"}function L(t){return"function"==D(t)}function k(t){return null!=t&&t==t.window}function Z(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function $(t){return"object"==D(t)}function F(t){return $(t)&&!k(t)&&Object.getPrototypeOf(t)==Object.prototype}function R(t){return"number"==typeof t.length}function q(t){return s.call(t,function(t){return null!=t})}function W(t){return t.length>0?n.fn.concat.apply([],t):t}function z(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function H(t){return t in c?c[t]:c[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function _(t,e){return"number"!=typeof e||l[z(t)]?e:e+"px"}function I(t){var e,n;return f[t]||(e=u.createElement(t),u.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),f[t]=n),f[t]}function U(t){return"children"in t?a.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function X(t,e){var n,i=t?t.length:0;for(n=0;i>n;n++)this[n]=t[n];this.length=i,this.selector=e||""}function B(n,i,r){for(e in i)r&&(F(i[e])||A(i[e]))?(F(i[e])&&!F(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function V(t,e){return null==e?n(t):n(t).filter(e)}function Y(t,e,n,i){return L(e)?e.call(t,n,i):e}function J(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function G(e,n){var i=e.className||"",r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function K(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?n.parseJSON(t):t):t}catch(e){return t}}function Q(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)Q(t.childNodes[n],e)}var t,e,n,i,N,P,r=[],o=r.concat,s=r.filter,a=r.slice,u=window.document,f={},c={},l={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},h=/^\s*<(\w+|!)[^>]*>/,p=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,d=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,m=/^(?:body|html)$/i,g=/([A-Z])/g,v=["val","css","html","text","data","width","height","offset"],y=["after","prepend","before","append"],w=u.createElement("table"),x=u.createElement("tr"),b={tr:u.createElement("tbody"),tbody:w,thead:w,tfoot:w,td:x,th:x,"*":u.createElement("div")},E=/complete|loaded|interactive/,T=/^[\w-]*$/,j={},S=j.toString,C={},O=u.createElement("div"),M={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return C.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~C.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},N=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},P=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},C.fragment=function(e,i,r){var o,s,f;return p.test(e)&&(o=n(u.createElement(RegExp.$1))),o||(e.replace&&(e=e.replace(d,"<$1></$2>")),i===t&&(i=h.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,o=n.each(a.call(f.childNodes),function(){f.removeChild(this)})),F(r)&&(s=n(o),n.each(r,function(t,e){v.indexOf(t)>-1?s[t](e):s.attr(t,e)})),o},C.Z=function(t,e){return new X(t,e)},C.isZ=function(t){return t instanceof C.Z},C.init=function(e,i){var r;if(!e)return C.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&h.test(e))r=C.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=C.qsa(u,e)}else{if(L(e))return n(u).ready(e);if(C.isZ(e))return e;if(A(e))r=q(e);else if($(e))r=[e],e=null;else if(h.test(e))r=C.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=C.qsa(u,e)}}return C.Z(r,e)},n=function(t,e){return C.init(t,e)},n.extend=function(t){var e,n=a.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},C.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],o=i||r?e.slice(1):e,s=T.test(o);return t.getElementById&&s&&i?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:a.call(s&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=u.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=D,n.isFunction=L,n.isWindow=k,n.isArray=A,n.isPlainObject=F,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=N,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.noop=function(){},n.map=function(t,e){var n,r,o,i=[];if(R(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return W(i)},n.each=function(t,e){var n,i;if(R(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={constructor:C.Z,length:0,forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,splice:r.splice,indexOf:r.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=C.isZ(e)?e.toArray():e;return o.apply(C.isZ(this)?this.toArray():this,n)},map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(a.apply(this,arguments))},ready:function(t){return E.test(u.readyState)&&u.body?t(n):u.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?a.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return L(t)?this.not(this.not(t)):n(s.call(this,function(e){return C.matches(e,t)}))},add:function(t,e){return n(P(this.concat(n(t,e))))},is:function(t){return this.length>0&&C.matches(this[0],t)},not:function(e){var i=[];if(L(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):R(e)&&L(e.item)?a.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return $(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!$(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!$(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(C.qsa(this[0],t)):this.map(function(){return C.qsa(this,t)}):n()},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:C.matches(i,t));)i=i!==e&&!Z(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!Z(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return V(e,t)},parent:function(t){return V(P(this.pluck("parentNode")),t)},children:function(t){return V(this.map(function(){return U(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||a.call(this.childNodes)})},siblings:function(t){return V(this.map(function(t,e){return s.call(U(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=L(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=L(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(Y(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=Y(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if($(n))for(e in n)J(this,e,n[e]);else J(this,n,Y(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){J(this,t)},this)})},prop:function(t,e){return t=M[t]||t,1 in arguments?this.each(function(n){this[t]=Y(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(g,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?K(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=Y(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=Y(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;if(!n.contains(u.documentElement,this[0]))return{top:0,left:0};var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r,o=this[0];if(!o)return;if(r=getComputedStyle(o,""),"string"==typeof t)return o.style[N(t)]||r.getPropertyValue(t);if(A(t)){var s={};return n.each(t,function(t,e){s[e]=o.style[N(e)]||r.getPropertyValue(e)}),s}}var a="";if("string"==D(t))i||0===i?a=z(t)+":"+_(t,i):this.each(function(){this.style.removeProperty(z(t))});else for(e in t)t[e]||0===t[e]?a+=z(e)+":"+_(e,t[e])+";":this.each(function(){this.style.removeProperty(z(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(G(t))},H(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var r=G(this),o=Y(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&G(this,r+(r?" ":"")+i.join(" "))}}):this},removeClass:function(e){return this.each(function(n){if("className"in this){if(e===t)return G(this,"");i=G(this),Y(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(H(t)," ")}),G(this,i.trim())}})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=Y(this,e,r,G(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=m.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||u.body;t&&!m.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?k(s)?s["inner"+i]:Z(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,Y(this,r,t,s[e]()))})}}),y.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=D(e),"object"==t||"array"==t||null==e?e:C.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null;var f=n.contains(u.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,a),f&&Q(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),C.Z.prototype=X.prototype=n.fn,C.uniq=P,C.deserializeValue=K,n.zepto=C,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=T(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function T(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=w,r&&r.apply(i,arguments)},e[n]=x}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=w)),e}function j(t){var e,i={originalEvent:t};for(e in t)b.test(e)||t[e]===n||(i[e]=t[e]);return T(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var w=function(){return!0},x=function(){return!1},b=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(u===n||a===!1)&&(u=a,a=n),u===!1&&(u=x),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(j(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=x),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):T(e),e._args=n,this.each(function(){e.type in f&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=j(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),T(n)}}(Zepto),function(t){function h(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function p(t,e,i,r){return t.global?h(e||n,i,r):void 0}function d(e){e.global&&0===t.active++&&p(e,null,"ajaxStart")}function m(e){e.global&&!--t.active&&p(e,null,"ajaxStop")}function g(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||p(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void p(e,n,"ajaxSend",[t,e])}function v(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),p(n,r,"ajaxSuccess",[e,n,t]),w(o,e,n)}function y(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),p(i,o,"ajaxError",[n,i,t||e]),w(e,n,i)}function w(t,e,n){var i=n.context;n.complete.call(i,e,t),p(n,i,"ajaxComplete",[e,n]),m(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function E(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function T(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=E(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function C(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?C(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/,l=n.createElement("a");l.href=window.location.href,t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?v(f[0],l,i,r):y(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),g(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var a,u,o=t.extend({},e||{}),s=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===o[i]&&(o[i]=t.ajaxSettings[i]);d(o),o.crossDomain||(a=n.createElement("a"),a.href=o.url,a.href=a.href,o.crossDomain=l.protocol+"//"+l.host!=a.protocol+"//"+a.host),o.url||(o.url=window.location.toString()),(u=o.url.indexOf("#"))>-1&&(o.url=o.url.slice(0,u)),T(o);var f=o.dataType,h=/\?.+=\?/.test(o.url);if(h&&(f="jsonp"),o.cache!==!1&&(e&&e.cache===!0||"script"!=f&&"jsonp"!=f)||(o.url=E(o.url,"_="+Date.now())),"jsonp"==f)return h||(o.url=E(o.url,o.jsonp?o.jsonp+"=?":o.jsonp===!1?"":"callback=?")),t.ajaxJSONP(o,s);var N,p=o.accepts[f],m={},w=function(t,e){m[t.toLowerCase()]=[t,e]},j=/^([\w-]+:)\/\//.test(o.url)?RegExp.$1:window.location.protocol,S=o.xhr(),C=S.setRequestHeader;if(s&&s.promise(S),o.crossDomain||w("X-Requested-With","XMLHttpRequest"),w("Accept",p||"*/*"),(p=o.mimeType||p)&&(p.indexOf(",")>-1&&(p=p.split(",",2)[0]),S.overrideMimeType&&S.overrideMimeType(p)),(o.contentType||o.contentType!==!1&&o.data&&"GET"!=o.type.toUpperCase())&&w("Content-Type",o.contentType||"application/x-www-form-urlencoded"),o.headers)for(r in o.headers)w(r,o.headers[r]);if(S.setRequestHeader=w,S.onreadystatechange=function(){if(4==S.readyState){S.onreadystatechange=x,clearTimeout(N);var e,n=!1;if(S.status>=200&&S.status<300||304==S.status||0==S.status&&"file:"==j){f=f||b(o.mimeType||S.getResponseHeader("content-type")),e=S.responseText;try{"script"==f?(1,eval)(e):"xml"==f?e=S.responseXML:"json"==f&&(e=c.test(e)?null:t.parseJSON(e))}catch(i){n=i}n?y(n,"parsererror",S,o,s):v(e,S,o,s)}else y(S.statusText||null,S.status?"error":"abort",S,o,s)}},g(S,o)===!1)return S.abort(),y(null,"abort",S,o,s),S;if(o.xhrFields)for(r in o.xhrFields)S[r]=o.xhrFields[r];var P="async"in o?o.async:!0;S.open(o.type,o.url,P,o.username,o.password);for(r in m)C.apply(S,m[r]);return o.timeout>0&&(N=setTimeout(function(){S.onreadystatechange=x,S.abort(),y(null,"timeout",S,o,s)},o.timeout)),S.send(o.data?o.data:null),S},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var S=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(S(e)+"="+S(n))},C(i,e,n),i.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.Callbacks=function(e){e=t.extend({},e);var n,i,r,o,s,a,u=[],f=!e.once&&[],c=function(t){for(n=e.memory&&t,i=!0,a=o||0,o=0,s=u.length,r=!0;u&&s>a;++a)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}r=!1,u&&(f?f.length&&c(f.shift()):n?u.length=0:l.disable())},l={add:function(){if(u){var i=u.length,a=function(n){t.each(n,function(t,n){"function"==typeof n?e.unique&&l.has(n)||u.push(n):n&&n.length&&"string"!=typeof n&&a(n)})};a(arguments),r?s=u.length:n&&(o=i,c(n))}return this},remove:function(){return u&&t.each(arguments,function(e,n){for(var i;(i=t.inArray(n,u,i))>-1;)u.splice(i,1),r&&(s>=i&&--s,a>=i&&--a)}),this},has:function(e){return!(!u||!(e?t.inArray(e,u)>-1:u.length))},empty:function(){return s=u.length=0,this},disable:function(){return u=f=n=void 0,this},disabled:function(){return!u},lock:function(){return f=void 0,n||l.disable(),this},locked:function(){return!f},fireWith:function(t,e){return!u||i&&!f||(e=e||[],e=[t,e.slice?e.slice():e],r?f.push(e):c(e)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!i}};return l}}(Zepto),function(t){function n(e){var i=[["resolve","done",t.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",t.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",t.Callbacks({memory:1})]],r="pending",o={state:function(){return r},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var e=arguments;return n(function(n){t.each(i,function(i,r){var a=t.isFunction(e[i])&&e[i];s[r[1]](function(){var e=a&&a.apply(this,arguments);if(e&&t.isFunction(e.promise))e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else{var i=this===o?n.promise():this,s=a?[e]:arguments;n[r[0]+"With"](i,s)}})}),e=null}).promise()},promise:function(e){return null!=e?t.extend(e,o):o}},s={};return t.each(i,function(t,e){var n=e[2],a=e[3];o[e[1]]=n.add,a&&n.add(function(){r=a},i[1^t][2].disable,i[2][2].lock),s[e[0]]=function(){return s[e[0]+"With"](this===s?o:this,arguments),this},s[e[0]+"With"]=n.fireWith}),o.promise(s),e&&e.call(s,s),s}var e=Array.prototype.slice;t.when=function(i){var f,c,l,r=e.call(arguments),o=r.length,s=0,a=1!==o||i&&t.isFunction(i.promise)?o:0,u=1===a?i:n(),h=function(t,n,i){return function(r){n[t]=this,i[t]=arguments.length>1?e.call(arguments):r,i===f?u.notifyWith(n,i):--a||u.resolveWith(n,i)}};if(o>1)for(f=new Array(o),c=new Array(o),l=new Array(o);o>s;++s)r[s]&&t.isFunction(r[s].promise)?r[s].promise().done(h(s,l,r)).fail(u.reject).progress(h(s,c,f)):--a;return a||u.resolveWith(l,r),u.promise()},t.Deferred=n}(Zepto),function(t){function u(t,e,n,i){return Math.abs(t-e)>=Math.abs(n-i)?t-e>0?"Left":"Right":n-i>0?"Up":"Down"}function f(){o=null,e.last&&(e.el.trigger("longTap"),e={})}function c(){o&&clearTimeout(o),o=null}function l(){n&&clearTimeout(n),i&&clearTimeout(i),r&&clearTimeout(r),o&&clearTimeout(o),n=i=r=o=null,e={}}function h(t){return("touch"==t.pointerType||t.pointerType==t.MSPOINTER_TYPE_TOUCH)&&t.isPrimary}function p(t,e){return t.type=="pointer"+e||t.type.toLowerCase()=="mspointer"+e}var n,i,r,o,a,e={},s=750;t(document).ready(function(){var d,m,y,w,g=0,v=0;"MSGesture"in window&&(a=new MSGesture,a.target=document.body),t(document).bind("MSGestureEnd",function(t){var n=t.velocityX>1?"Right":t.velocityX<-1?"Left":t.velocityY>1?"Down":t.velocityY<-1?"Up":null;n&&(e.el.trigger("swipe"),e.el.trigger("swipe"+n))}).on("touchstart MSPointerDown pointerdown",function(i){(!(w=p(i,"down"))||h(i))&&(y=w?i:i.touches[0],i.touches&&1===i.touches.length&&e.x2&&(e.x2=void 0,e.y2=void 0),d=Date.now(),m=d-(e.last||d),e.el=t("tagName"in y.target?y.target:y.target.parentNode),n&&clearTimeout(n),e.x1=y.pageX,e.y1=y.pageY,m>0&&250>=m&&(e.isDoubleTap=!0),e.last=d,o=setTimeout(f,s),a&&w&&a.addPointer(i.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){(!(w=p(t,"move"))||h(t))&&(y=w?t:t.touches[0],c(),e.x2=y.pageX,e.y2=y.pageY,g+=Math.abs(e.x1-e.x2),v+=Math.abs(e.y1-e.y2))}).on("touchend MSPointerUp pointerup",function(o){(!(w=p(o,"up"))||h(o))&&(c(),e.x2&&Math.abs(e.x1-e.x2)>30||e.y2&&Math.abs(e.y1-e.y2)>30?r=setTimeout(function(){e.el.trigger("swipe"),e.el.trigger("swipe"+u(e.x1,e.x2,e.y1,e.y2)),e={}},0):"last"in e&&(30>g&&30>v?i=setTimeout(function(){var i=t.Event("tap");i.cancelTouch=l,e.el.trigger(i),e.isDoubleTap?(e.el&&e.el.trigger("doubleTap"),e={}):n=setTimeout(function(){n=null,e.el&&e.el.trigger("singleTap"),e={}},250)},0):e={}),g=v=0)}).on("touchcancel MSPointerCancel pointercancel",l),t(window).on("scroll",l)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(t){return this.on(e,t)}})}(Zepto),function(t){function r(e){return e=t(e),!(!e.width()&&!e.height())&&"none"!==e.css("display")}function f(t,e){t=t.replace(/=#\]/g,'="#"]');var n,i,r=s.exec(t);if(r&&r[2]in o&&(n=o[r[2]],i=r[3],t=r[1],i)){var a=Number(i);i=isNaN(a)?i.replace(/^["']|["']$/g,""):a}return e(t,n,i)}var e=t.zepto,n=e.qsa,i=e.matches,o=t.expr[":"]={visible:function(){return r(this)?this:void 0},hidden:function(){return r(this)?void 0:this},selected:function(){return this.selected?this:void 0},checked:function(){return this.checked?this:void 0},parent:function(){return this.parentNode},first:function(t){return 0===t?this:void 0},last:function(t,e){return t===e.length-1?this:void 0},eq:function(t,e,n){return t===n?this:void 0},contains:function(e,n,i){return t(this).text().indexOf(i)>-1?this:void 0},has:function(t,n,i){return e.qsa(this,i).length?this:void 0}},s=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),a=/^\s*>/,u="Zepto"+ +new Date;e.qsa=function(i,r){return f(r,function(o,s,f){try{var c;!o&&s?o="*":a.test(o)&&(c=t(i).addClass(u),o="."+u+" "+o);var l=n(i,o)}catch(h){throw console.error("error performing selector: %o",r),h}finally{c&&c.removeClass(u)}return s?e.uniq(t.map(l,function(t,e){return s.call(t,e,l,f)})):l})},e.matches=function(t,e){return f(e,function(e,n,r){return!(e&&!i(t,e)||n&&n.call(t,null,r)!==t)})}}(Zepto),function(){try{getComputedStyle(void 0)}catch(t){var e=getComputedStyle;window.getComputedStyle=function(t){try{return e(t)}catch(n){return null}}}}();
module.exports = Zepto;

},{}]},{},["clappr"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vhc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vjb3B5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzbmF0aXZlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2gua2V5cy9ub2RlX21vZHVsZXMvbG9kYXNoLmlzYXJndW1lbnRzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2FycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlYXNzaWduZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9jcmVhdGVhc3NpZ25lci9ub2RlX21vZHVsZXMvbG9kYXNoLl9iaW5kY2FsbGJhY2svaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9jcmVhdGVhc3NpZ25lci9ub2RlX21vZHVsZXMvbG9kYXNoLl9pc2l0ZXJhdGVlY2FsbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2NyZWF0ZWFzc2lnbmVyL25vZGVfbW9kdWxlcy9sb2Rhc2gucmVzdHBhcmFtL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VjYWxsYmFjay9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZmluZC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlY2FsbGJhY2svbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWNhbGxiYWNrL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guaXN0eXBlZGFycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VlYWNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VmaW5kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guZmluZGluZGV4L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guZmluZGluZGV4L25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VmaW5kaW5kZXgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm9uY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm9uY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC5iZWZvcmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnJlc3VsdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gucmVzdWx0L25vZGVfbW9kdWxlcy9sb2Rhc2guaXNmdW5jdGlvbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaW5kZXhvZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9jYWNoZWluZGV4b2YvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZXVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlY2FjaGUvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvanN0LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3N0eWxlci5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvYmFzZS91dGlscy5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb250YWluZXIvY29udGFpbmVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lcl9mYWN0b3J5L2NvbnRhaW5lcl9mYWN0b3J5LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lcl9mYWN0b3J5L2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvcmUvY29yZS5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb3JlX2ZhY3RvcnkvY29yZV9mYWN0b3J5LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvcmVfZmFjdG9yeS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9sb2FkZXIvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9tZWRpYV9jb250cm9sL21lZGlhX2NvbnRyb2wuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvcGxheWVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL3NlZWtfdGltZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9zZWVrX3RpbWUvc2Vla190aW1lLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvZmxhc2gvZmxhc2guanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9obHMvaGxzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfYXVkaW8vaHRtbDVfYXVkaW8uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9odG1sNV92aWRlby9odG1sNV92aWRlby5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWxfaW1nL2h0bWxfaW1nLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3Mvbm9fb3AvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9ub19vcC9ub19vcC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9jbGlja190b19wYXVzZS9jbGlja190b19wYXVzZS5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9jbGlja190b19wYXVzZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9kdnJfY29udHJvbHMvZHZyX2NvbnRyb2xzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL2R2cl9jb250cm9scy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9nb29nbGVfYW5hbHl0aWNzL2dvb2dsZV9hbmFseXRpY3MuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvZ29vZ2xlX2FuYWx5dGljcy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9sb2cvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvbG9nL2xvZy5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9wb3N0ZXIvcG9zdGVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3NwaW5uZXJfdGhyZWVfYm91bmNlL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3NwaW5uZXJfdGhyZWVfYm91bmNlL3NwaW5uZXJfdGhyZWVfYm91bmNlLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3N0YXRzL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3N0YXRzL3N0YXRzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3dhdGVybWFyay9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy93YXRlcm1hcmsvd2F0ZXJtYXJrLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL2Jhc2Vfb2JqZWN0LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2Jyb3dzZXIuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL21haW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvY29udGFpbmVyX3BsdWdpbi5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb250YWluZXIvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvY29yZV9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvY29yZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvYmFzZS9ldmVudHMuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9mbGFzaC9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2hscy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWw1X2F1ZGlvL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfdmlkZW8vaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9odG1sX2ltZy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvYmFzZS9raWJvLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL21lZGlhX2NvbnRyb2wvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvbWVkaWF0b3IuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvcGxheWJhY2suanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvcGxheWVyX2luZm8uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvcG9zdGVyL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3RlbXBsYXRlLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3VpX2NvbnRhaW5lcl9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvdWlfY29yZV9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvdWlfb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NsYXBwci16ZXB0by96ZXB0by5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDckxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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R0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEFBQzlFLFNBQUssQ0FBQztBQUFFLGFBQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEFBQ2xGO0FBQVMsYUFBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEdBQy9FO0NBQ0YsQ0FBQTs7QUFFRCxJQUFJLGFBQWEsR0FBRyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFBOztBQUUxRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLE1BQU0sRUFBRTtBQUNsRCxRQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFVBQVMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDdkQsUUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQSxBQUFDLENBQUE7QUFDL0QsUUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsS0FBSyxHQUFHLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLENBQUE7QUFDekQsZUFBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcs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QUFDMUMsZUFBTyxJQUFJLENBQUE7T0FDWjs7QUFFRCxrQkFBYzthQUFBLDBCQUFHO0FBQ2YsWUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDWixjQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQTtBQUNsRCxjQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQzFDLGNBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQTtBQUM5RCxjQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzVELGNBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO1NBQzVCLE1BQU07QUFDTCxjQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDM0M7T0FDRjs7OztTQXJFRyxRQUFRO0dBQVMsVUFBVTs7QUF3RWpDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFBOzs7QUNwRnpCO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUFzc2lnbiA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWFzc2lnbicpLFxuICAgIGNyZWF0ZUFzc2lnbmVyID0gcmVxdWlyZSgnbG9kYXNoLl9jcmVhdGVhc3NpZ25lcicpO1xuXG4vKipcbiAqIEFzc2lnbnMgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIHRoZSBkZXN0aW5hdGlvblxuICogb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKiBJZiBgY3VzdG9taXplcmAgaXMgcHJvdmlkZWQgaXQgaXMgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIGZpdmUgYXJndW1lbnRzO1xuICogKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBleHRlbmRcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmFzc2lnbih7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAnYWdlJzogNDAgfSwgeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnZnJlZCcsICdhZ2UnOiA0MCB9XG4gKlxuICogLy8gdXNpbmcgYSBjdXN0b21pemVyIGNhbGxiYWNrXG4gKiB2YXIgZGVmYXVsdHMgPSBfLnBhcnRpYWxSaWdodChfLmFzc2lnbiwgZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gKiAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcgPyBvdGhlciA6IHZhbHVlO1xuICogfSk7XG4gKlxuICogZGVmYXVsdHMoeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDM2IH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9XG4gKi9cbnZhciBhc3NpZ24gPSBjcmVhdGVBc3NpZ25lcihiYXNlQXNzaWduKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG4iLCIvKipcbiAqIGxvZGFzaCAzLjEuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VDb3B5ID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlY29weScpLFxuICAgIGlzTmF0aXZlID0gcmVxdWlyZSgnbG9kYXNoLmlzbmF0aXZlJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gaXNOYXRpdmUoZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgJiYgZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmFzc2lnbmAgd2l0aG91dCBzdXBwb3J0IGZvciBhcmd1bWVudCBqdWdnbGluZyxcbiAqIG11bHRpcGxlIHNvdXJjZXMsIGFuZCBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VBc3NpZ24gPSBmdW5jdGlvbihvYmplY3QsIHNvdXJjZSkge1xuICByZXR1cm4gc291cmNlID09IG51bGxcbiAgICA/IG9iamVjdFxuICAgIDogYmFzZUNvcHkoc291cmNlLCBnZXRTeW1ib2xzKHNvdXJjZSksIGJhc2VDb3B5KHNvdXJjZSwga2V5cyhzb3VyY2UpLCBvYmplY3QpKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2Ygc3ltYm9scy5cbiAqL1xudmFyIGdldFN5bWJvbHMgPSAhZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gY29uc3RhbnQoW10pIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHModG9PYmplY3Qob2JqZWN0KSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gb2JqZWN0IGlmIGl0IGlzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IE9iamVjdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKCEhdmFsdWUgJiYgdHlwZSA9PSAnb2JqZWN0Jyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIGZyb20gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICogdmFyIGdldHRlciA9IF8uY29uc3RhbnQob2JqZWN0KTtcbiAqXG4gKiBnZXR0ZXIoKSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VBc3NpZ247XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDb3B5KHNvdXJjZSwgcHJvcHMsIG9iamVjdCkge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgb2JqZWN0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDb3B5O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgW3NwZWNpYWwgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpLlxuICogSW4gYWRkaXRpb24gdG8gc3BlY2lhbCBjaGFyYWN0ZXJzIHRoZSBmb3J3YXJkIHNsYXNoIGlzIGVzY2FwZWQgdG8gYWxsb3cgZm9yXG4gKiBlYXNpZXIgYGV2YWxgIHVzZSBhbmQgYEZ1bmN0aW9uYCBjb21waWxhdGlvbi5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhcnMgPSAvWy4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2csXG4gICAgcmVIYXNSZWdFeHBDaGFycyA9IFJlZ0V4cChyZVJlZ0V4cENoYXJzLnNvdXJjZSk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVJc05hdGl2ZS50ZXN0KGZuVG9TdHJpbmcuY2FsbCh2YWx1ZSkpO1xuICB9XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIHJlSXNIb3N0Q3Rvci50ZXN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBFc2NhcGVzIHRoZSBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMgXCJcXFwiLCBcIi9cIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLFxuICogXCIqXCIsIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6XFwvXFwvbG9kYXNoXFwuY29tXFwvXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjcgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpLFxuICAgIGlzTmF0aXZlID0gcmVxdWlyZSgnbG9kYXNoLmlzbmF0aXZlJyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IGlzTmF0aXZlKG5hdGl2ZUtleXMgPSBPYmplY3Qua2V5cykgJiYgbmF0aXZlS2V5cztcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBBbiBvYmplY3QgZW52aXJvbm1lbnQgZmVhdHVyZSBmbGFncy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUgT2JqZWN0XG4gKi9cbnZhciBzdXBwb3J0ID0ge307XG5cbihmdW5jdGlvbih4KSB7XG4gIHZhciBDdG9yID0gZnVuY3Rpb24oKSB7IHRoaXMueCA9IHg7IH0sXG4gICAgICBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgb2JqZWN0ID0geyAnMCc6IHgsICdsZW5ndGgnOiB4IH0sXG4gICAgICBwcm9wcyA9IFtdO1xuXG4gIEN0b3IucHJvdG90eXBlID0geyAndmFsdWVPZic6IHgsICd5JzogeCB9O1xuICBmb3IgKHZhciBrZXkgaW4gbmV3IEN0b3IpIHsgcHJvcHMucHVzaChrZXkpOyB9XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiBgYXJndW1lbnRzYCBvYmplY3QgaW5kZXhlcyBhcmUgbm9uLWVudW1lcmFibGUuXG4gICAqXG4gICAqIEluIEZpcmVmb3ggPCA0LCBJRSA8IDksIFBoYW50b21KUywgYW5kIFNhZmFyaSA8IDUuMSBgYXJndW1lbnRzYCBvYmplY3RcbiAgICogaW5kZXhlcyBhcmUgbm9uLWVudW1lcmFibGUuIENocm9tZSA8IDI1IGFuZCBOb2RlLmpzIDwgMC4xMS4wIHRyZWF0XG4gICAqIGBhcmd1bWVudHNgIG9iamVjdCBpbmRleGVzIGFzIG5vbi1lbnVtZXJhYmxlIGFuZCBmYWlsIGBoYXNPd25Qcm9wZXJ0eWBcbiAgICogY2hlY2tzIGZvciBpbmRleGVzIHRoYXQgZXhjZWVkIHRoZSBudW1iZXIgb2YgZnVuY3Rpb24gcGFyYW1ldGVycyBhbmRcbiAgICogd2hvc2UgYXNzb2NpYXRlZCBhcmd1bWVudCB2YWx1ZXMgYXJlIGAwYC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8uc3VwcG9ydFxuICAgKiBAdHlwZSBib29sZWFuXG4gICAqL1xuICB0cnkge1xuICAgIHN1cHBvcnQubm9uRW51bUFyZ3MgPSAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChhcmdzLCAxKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgc3VwcG9ydC5ub25FbnVtQXJncyA9IHRydWU7XG4gIH1cbn0oMSwgMCkpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhIFtKSVQgYnVnXShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNzkyKVxuICogdGhhdCBhZmZlY3RzIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSArdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2Agd2hpY2ggY3JlYXRlcyBhbiBhcnJheSBvZiB0aGVcbiAqIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBzaGltS2V5cyhvYmplY3QpIHtcbiAgdmFyIHByb3BzID0ga2V5c0luKG9iamVjdCksXG4gICAgICBwcm9wc0xlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IHByb3BzTGVuZ3RoICYmIG9iamVjdC5sZW5ndGg7XG5cbiAgdmFyIGFsbG93SW5kZXhlcyA9IGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCAoc3VwcG9ydC5ub25FbnVtQXJncyAmJiBpc0FyZ3VtZW50cyhvYmplY3QpKSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IHByb3BzTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAoKGFsbG93SW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgfHwgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKCEhdmFsdWUgJiYgdHlwZSA9PSAnb2JqZWN0Jyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG52YXIga2V5cyA9ICFuYXRpdmVLZXlzID8gc2hpbUtleXMgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgdmFyIEN0b3IgPSBvYmplY3QgIT0gbnVsbCAmJiBvYmplY3QuY29uc3RydWN0b3I7XG4gIGlmICgodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0KSB8fFxuICAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICBsZW5ndGggPSAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IChzdXBwb3J0Lm5vbkVudW1BcmdzICYmIGlzQXJndW1lbnRzKG9iamVjdCkpKSAmJiBsZW5ndGgpIHx8IDA7XG5cbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgaXNQcm90byA9IHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCksXG4gICAgICBza2lwSW5kZXhlcyA9IGxlbmd0aCA+IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gKGluZGV4ICsgJycpO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShza2lwSW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgJiZcbiAgICAgICAgIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGEgW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpXG4gKiB0aGF0IGFmZmVjdHMgU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMiAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgW3NwZWNpYWwgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpLlxuICogSW4gYWRkaXRpb24gdG8gc3BlY2lhbCBjaGFyYWN0ZXJzIHRoZSBmb3J3YXJkIHNsYXNoIGlzIGVzY2FwZWQgdG8gYWxsb3cgZm9yXG4gKiBlYXNpZXIgYGV2YWxgIHVzZSBhbmQgYEZ1bmN0aW9uYCBjb21waWxhdGlvbi5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhcnMgPSAvWy4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2csXG4gICAgcmVIYXNSZWdFeHBDaGFycyA9IFJlZ0V4cChyZVJlZ0V4cENoYXJzLnNvdXJjZSk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBpc05hdGl2ZShuYXRpdmVJc0FycmF5ID0gQXJyYXkuaXNBcnJheSkgJiYgbmF0aXZlSXNBcnJheTtcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFycmF5VGFnO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlSXNOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiByZUlzSG9zdEN0b3IudGVzdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXFxcIiwgXCIvXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIixcbiAqIFwiKlwiLCBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOlxcL1xcL2xvZGFzaFxcLmNvbVxcL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4xLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2JpbmRjYWxsYmFjaycpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnbG9kYXNoLl9pc2l0ZXJhdGVlY2FsbCcpLFxuICAgIHJlc3RQYXJhbSA9IHJlcXVpcmUoJ2xvZGFzaC5yZXN0cGFyYW0nKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBhc3NpZ25zIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKSB0byBhIGdpdmVuXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBjcmVhdGUgYF8uYXNzaWduYCwgYF8uZGVmYXVsdHNgLCBhbmQgYF8ubWVyZ2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gcmVzdFBhcmFtKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBvYmplY3QgPT0gbnVsbCA/IDAgOiBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDIgJiYgc291cmNlc1tsZW5ndGggLSAyXSxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyICYmIHNvdXJjZXNbMl0sXG4gICAgICAgIHRoaXNBcmcgPSBsZW5ndGggPiAxICYmIHNvdXJjZXNbbGVuZ3RoIC0gMV07XG5cbiAgICBpZiAodHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3VzdG9taXplciA9IGJpbmRDYWxsYmFjayhjdXN0b21pemVyLCB0aGlzQXJnLCA1KTtcbiAgICAgIGxlbmd0aCAtPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXN0b21pemVyID0gdHlwZW9mIHRoaXNBcmcgPT0gJ2Z1bmN0aW9uJyA/IHRoaXNBcmcgOiBudWxsO1xuICAgICAgbGVuZ3RoIC09IChjdXN0b21pemVyID8gMSA6IDApO1xuICAgIH1cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IG51bGwgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBc3NpZ25lcjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlQ2FsbGJhY2tgIHdoaWNoIG9ubHkgc3VwcG9ydHMgYHRoaXNgIGJpbmRpbmdcbiAqIGFuZCBzcGVjaWZ5aW5nIHRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBiaW5kLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJpbmRDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodGhpc0FyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cbiAgc3dpdGNoIChhcmdDb3VudCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuNyAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhIFtKSVQgYnVnXShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNzkyKVxuICogdGhhdCBhZmZlY3RzIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSArdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwcm92aWRlZCBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpKSB7XG4gICAgdmFyIG90aGVyID0gb2JqZWN0W2luZGV4XTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gKHZhbHVlID09PSBvdGhlcikgOiAob3RoZXIgIT09IG90aGVyKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAoISF2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0l0ZXJhdGVlQ2FsbDtcbiIsIi8qKlxuICogbG9kYXNoIDMuNi4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZVxuICogY3JlYXRlZCBmdW5jdGlvbiBhbmQgYXJndW1lbnRzIGZyb20gYHN0YXJ0YCBhbmQgYmV5b25kIHByb3ZpZGVkIGFzIGFuIGFycmF5LlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvbiB0aGUgW3Jlc3QgcGFyYW1ldGVyXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9GdW5jdGlvbnMvcmVzdF9wYXJhbWV0ZXJzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBzYXkgPSBfLnJlc3RQYXJhbShmdW5jdGlvbih3aGF0LCBuYW1lcykge1xuICogICByZXR1cm4gd2hhdCArICcgJyArIF8uaW5pdGlhbChuYW1lcykuam9pbignLCAnKSArXG4gKiAgICAgKF8uc2l6ZShuYW1lcykgPiAxID8gJywgJiAnIDogJycpICsgXy5sYXN0KG5hbWVzKTtcbiAqIH0pO1xuICpcbiAqIHNheSgnaGVsbG8nLCAnZnJlZCcsICdiYXJuZXknLCAncGViYmxlcycpO1xuICogLy8gPT4gJ2hlbGxvIGZyZWQsIGJhcm5leSwgJiBwZWJibGVzJ1xuICovXG5mdW5jdGlvbiByZXN0UGFyYW0oZnVuYywgc3RhcnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogKCtzdGFydCB8fCAwKSwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICByZXN0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICByZXN0W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIHN3aXRjaCAoc3RhcnQpIHtcbiAgICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCByZXN0KTtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCByZXN0KTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdLCByZXN0KTtcbiAgICB9XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgaW5kZXggPSAtMTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSByZXN0O1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdFBhcmFtO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VjYWxsYmFjaycpLFxuICAgIGJhc2VFYWNoID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlZWFjaCcpLFxuICAgIGJhc2VGaW5kID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlZmluZCcpLFxuICAgIGZpbmRJbmRleCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kaW5kZXgnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKTtcblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYCwgcmV0dXJuaW5nIHRoZSBmaXJzdCBlbGVtZW50XG4gKiBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IuIFRoZSBwcmVkaWNhdGUgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZFxuICogaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICpcbiAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLnByb3BlcnR5XCJcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIElmIGFuIG9iamVjdCBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgXCJfLm1hdGNoZXNcIiBzdHlsZVxuICogY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZ2l2ZW5cbiAqIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgZGV0ZWN0XG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fHN0cmluZ30gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZFxuICogIHBlciBpdGVyYXRpb24uIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcHJvdmlkZWQgaXQgaXMgdXNlZCB0b1xuICogIGNyZWF0ZSBhIFwiXy5wcm9wZXJ0eVwiIG9yIFwiXy5tYXRjaGVzXCIgc3R5bGUgY2FsbGJhY2sgcmVzcGVjdGl2ZWx5LlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBwcmVkaWNhdGVgLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hdGNoZWQgZWxlbWVudCwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0gW1xuICogICB7ICd1c2VyJzogJ2Jhcm5leScsICAnYWdlJzogMzYsICdhY3RpdmUnOiBmYWxzZSB9LFxuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICAnYWdlJzogNDAsICdhY3RpdmUnOiB0cnVlIH0sXG4gKiAgIHsgJ3VzZXInOiAncGViYmxlcycsICdhZ2UnOiAxLCAgJ2FjdGl2ZSc6IGZhbHNlIH1cbiAqIF07XG4gKlxuICogXy5yZXN1bHQoXy5maW5kKHVzZXJzLCBmdW5jdGlvbihjaHIpIHsgcmV0dXJuIGNoci5hZ2UgPCA0MDsgfSksICd1c2VyJyk7XG4gKiAvLyA9PiAnYmFybmV5J1xuICpcbiAqIC8vIHVzaW5nIHRoZSBcIl8ubWF0Y2hlc1wiIGNhbGxiYWNrIHNob3J0aGFuZFxuICogXy5yZXN1bHQoXy5maW5kKHVzZXJzLCB7ICdhZ2UnOiAxIH0pLCAndXNlcicpO1xuICogLy8gPT4gJ3BlYmJsZXMnXG4gKlxuICogLy8gdXNpbmcgdGhlIFwiXy5wcm9wZXJ0eVwiIGNhbGxiYWNrIHNob3J0aGFuZFxuICogXy5yZXN1bHQoXy5maW5kKHVzZXJzLCAnYWN0aXZlJyksICd1c2VyJyk7XG4gKiAvLyA9PiAnZnJlZCdcbiAqL1xuZnVuY3Rpb24gZmluZChjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgaWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICB2YXIgaW5kZXggPSBmaW5kSW5kZXgoY29sbGVjdGlvbiwgcHJlZGljYXRlLCB0aGlzQXJnKTtcbiAgICByZXR1cm4gaW5kZXggPiAtMSA/IGNvbGxlY3Rpb25baW5kZXhdIDogdW5kZWZpbmVkO1xuICB9XG4gIHByZWRpY2F0ZSA9IGJhc2VDYWxsYmFjayhwcmVkaWNhdGUsIHRoaXNBcmcsIDMpO1xuICByZXR1cm4gYmFzZUZpbmQoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBiYXNlRWFjaCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmluZDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMi4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2Vpc2VxdWFsJyksXG4gICAgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnbG9kYXNoLl9iaW5kY2FsbGJhY2snKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnbG9kYXNoLmtleXMnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcblxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sXG4gICAgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvLFxuICAgIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxuXFxcXF18XFxcXC4pKj8pXFwyKVxcXS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY2FsbGJhY2tgIHdoaWNoIHN1cHBvcnRzIHNwZWNpZnlpbmcgdGhlXG4gKiBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IFtmdW5jPV8uaWRlbnRpdHldIFRoZSB2YWx1ZSB0byBjb252ZXJ0IHRvIGEgY2FsbGJhY2suXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcmdDb3VudF0gVGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBiYXNlQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgZnVuYztcbiAgaWYgKHR5cGUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0aGlzQXJnID09PSB1bmRlZmluZWRcbiAgICAgID8gZnVuY1xuICAgICAgOiBiaW5kQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpO1xuICB9XG4gIGlmIChmdW5jID09IG51bGwpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gYmFzZU1hdGNoZXMoZnVuYyk7XG4gIH1cbiAgcmV0dXJuIHRoaXNBcmcgPT09IHVuZGVmaW5lZFxuICAgID8gcHJvcGVydHkoZnVuYylcbiAgICA6IGJhc2VNYXRjaGVzUHJvcGVydHkoZnVuYywgdGhpc0FyZyk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldGAgd2l0aG91dCBzdXBwb3J0IGZvciBzdHJpbmcgcGF0aHNcbiAqIGFuZCBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheX0gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHtzdHJpbmd9IFtwYXRoS2V5XSBUaGUga2V5IHJlcHJlc2VudGF0aW9uIG9mIHBhdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXQob2JqZWN0LCBwYXRoLCBwYXRoS2V5KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGF0aEtleSAhPT0gdW5kZWZpbmVkICYmIHBhdGhLZXkgaW4gdG9PYmplY3Qob2JqZWN0KSkge1xuICAgIHBhdGggPSBbcGF0aEtleV07XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAob2JqZWN0ICE9IG51bGwgJiYgKytpbmRleCA8IGxlbmd0aCkge1xuICAgIG9iamVjdCA9IG9iamVjdFtwYXRoW2luZGV4XV07XG4gIH1cbiAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTWF0Y2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBzb3VyY2UgcHJvcGVydHkgbmFtZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHNvdXJjZSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSBzdHJpY3RDb21wYXJlRmxhZ3MgU3RyaWN0IGNvbXBhcmlzb24gZmxhZ3MgZm9yIHNvdXJjZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgb2JqZWN0YCBpcyBhIG1hdGNoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc01hdGNoKG9iamVjdCwgcHJvcHMsIHZhbHVlcywgc3RyaWN0Q29tcGFyZUZsYWdzLCBjdXN0b21pemVyKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgbm9DdXN0b21pemVyID0gIWN1c3RvbWl6ZXI7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoKG5vQ3VzdG9taXplciAmJiBzdHJpY3RDb21wYXJlRmxhZ3NbaW5kZXhdKVxuICAgICAgICAgID8gdmFsdWVzW2luZGV4XSAhPT0gb2JqZWN0W3Byb3BzW2luZGV4XV1cbiAgICAgICAgICA6ICEocHJvcHNbaW5kZXhdIGluIG9iamVjdClcbiAgICAgICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGluZGV4ID0gLTE7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XSxcbiAgICAgICAgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgc3JjVmFsdWUgPSB2YWx1ZXNbaW5kZXhdO1xuXG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBzdHJpY3RDb21wYXJlRmxhZ3NbaW5kZXhdKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gb2JqVmFsdWUgIT09IHVuZGVmaW5lZCB8fCAoa2V5IGluIG9iamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5KSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQgPSBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIGN1c3RvbWl6ZXIsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2VzIG5vdCBjbG9uZSBgc291cmNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlcyhzb3VyY2UpIHtcbiAgdmFyIHByb3BzID0ga2V5cyhzb3VyY2UpLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIGlmICghbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGNvbnN0YW50KHRydWUpO1xuICB9XG4gIGlmIChsZW5ndGggPT0gMSkge1xuICAgIHZhciBrZXkgPSBwcm9wc1swXSxcbiAgICAgICAgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgIGlmIChpc1N0cmljdENvbXBhcmFibGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqZWN0W2tleV0gPT09IHZhbHVlICYmICh2YWx1ZSAhPT0gdW5kZWZpbmVkIHx8IChrZXkgaW4gdG9PYmplY3Qob2JqZWN0KSkpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgdmFyIHZhbHVlcyA9IEFycmF5KGxlbmd0aCksXG4gICAgICBzdHJpY3RDb21wYXJlRmxhZ3MgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhbHVlID0gc291cmNlW3Byb3BzW2xlbmd0aF1dO1xuICAgIHZhbHVlc1tsZW5ndGhdID0gdmFsdWU7XG4gICAgc3RyaWN0Q29tcGFyZUZsYWdzW2xlbmd0aF0gPSBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgYmFzZUlzTWF0Y2godG9PYmplY3Qob2JqZWN0KSwgcHJvcHMsIHZhbHVlcywgc3RyaWN0Q29tcGFyZUZsYWdzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzUHJvcGVydHlgIHdoaWNoIGRvZXMgbm90IHdoaWNoIGRvZXNcbiAqIG5vdCBjbG9uZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlc1Byb3BlcnR5KHBhdGgsIHZhbHVlKSB7XG4gIHZhciBpc0FyciA9IGlzQXJyYXkocGF0aCksXG4gICAgICBpc0NvbW1vbiA9IGlzS2V5KHBhdGgpICYmIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSksXG4gICAgICBwYXRoS2V5ID0gKHBhdGggKyAnJyk7XG5cbiAgcGF0aCA9IHRvUGF0aChwYXRoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIga2V5ID0gcGF0aEtleTtcbiAgICBvYmplY3QgPSB0b09iamVjdChvYmplY3QpO1xuICAgIGlmICgoaXNBcnIgfHwgIWlzQ29tbW9uKSAmJiAhKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICBvYmplY3QgPSBwYXRoLmxlbmd0aCA9PSAxID8gb2JqZWN0IDogYmFzZUdldChvYmplY3QsIGJhc2VTbGljZShwYXRoLCAwLCAtMSkpO1xuICAgICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGtleSA9IGxhc3QocGF0aCk7XG4gICAgICBvYmplY3QgPSB0b09iamVjdChvYmplY3QpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0W2tleV0gPT09IHZhbHVlXG4gICAgICA/ICh2YWx1ZSAhPT0gdW5kZWZpbmVkIHx8IChrZXkgaW4gb2JqZWN0KSlcbiAgICAgIDogYmFzZUlzRXF1YWwodmFsdWUsIG9iamVjdFtrZXldLCBudWxsLCB0cnVlKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VQcm9wZXJ0eWAgd2hpY2ggc3VwcG9ydHMgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpIHtcbiAgdmFyIHBhdGhLZXkgPSAocGF0aCArICcnKTtcbiAgcGF0aCA9IHRvUGF0aChwYXRoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBiYXNlR2V0KG9iamVjdCwgcGF0aCwgcGF0aEtleSk7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uc2xpY2VgIHdpdGhvdXQgYW4gaXRlcmF0ZWUgY2FsbCBndWFyZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNsaWNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD0wXSBUaGUgc3RhcnQgcG9zaXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2VuZD1hcnJheS5sZW5ndGhdIFRoZSBlbmQgcG9zaXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHNsaWNlIG9mIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBzdGFydCA9IHN0YXJ0ID09IG51bGwgPyAwIDogKCtzdGFydCB8fCAwKTtcbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gLXN0YXJ0ID4gbGVuZ3RoID8gMCA6IChsZW5ndGggKyBzdGFydCk7XG4gIH1cbiAgZW5kID0gKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IGxlbmd0aCkgPyBsZW5ndGggOiAoK2VuZCB8fCAwKTtcbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuZ3RoO1xuICB9XG4gIGxlbmd0aCA9IHN0YXJ0ID4gZW5kID8gMCA6ICgoZW5kIC0gc3RhcnQpID4+PiAwKTtcbiAgc3RhcnQgPj4+PSAwO1xuXG4gIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBhcnJheVtpbmRleCArIHN0YXJ0XTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5KHZhbHVlLCBvYmplY3QpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICgodHlwZSA9PSAnc3RyaW5nJyAmJiByZUlzUGxhaW5Qcm9wLnRlc3QodmFsdWUpKSB8fCB0eXBlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciByZXN1bHQgPSAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpO1xuICByZXR1cm4gcmVzdWx0IHx8IChvYmplY3QgIT0gbnVsbCAmJiB2YWx1ZSBpbiB0b09iamVjdChvYmplY3QpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlmIHN1aXRhYmxlIGZvciBzdHJpY3RcbiAqICBlcXVhbGl0eSBjb21wYXJpc29ucywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSAmJiAhaXNPYmplY3QodmFsdWUpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gb2JqZWN0IGlmIGl0IGlzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IE9iamVjdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBwcm9wZXJ0eSBwYXRoIGFycmF5IGlmIGl0IGlzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHRvUGF0aCh2YWx1ZSkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBiYXNlVG9TdHJpbmcodmFsdWUpLnJlcGxhY2UocmVQcm9wTmFtZSwgZnVuY3Rpb24obWF0Y2gsIG51bWJlciwgcXVvdGUsIHN0cmluZykge1xuICAgIHJlc3VsdC5wdXNoKHF1b3RlID8gc3RyaW5nLnJlcGxhY2UocmVFc2NhcGVDaGFyLCAnJDEnKSA6IChudW1iZXIgfHwgbWF0Y2gpKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGFzdCBlbGVtZW50IG9mIGBhcnJheWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBvZiBgYXJyYXlgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmxhc3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IDNcbiAqL1xuZnVuY3Rpb24gbGFzdChhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICByZXR1cm4gbGVuZ3RoID8gYXJyYXlbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKCEhdmFsdWUgJiYgdHlwZSA9PSAnb2JqZWN0Jyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIGZyb20gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICogdmFyIGdldHRlciA9IF8uY29uc3RhbnQob2JqZWN0KTtcbiAqXG4gKiBnZXR0ZXIoKSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHByb3ZpZGVkIHRvIGl0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICpcbiAqIF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlIGF0IGBwYXRoYCBvbiBhXG4gKiBnaXZlbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gW1xuICogICB7ICdhJzogeyAnYic6IHsgJ2MnOiAyIH0gfSB9LFxuICogICB7ICdhJzogeyAnYic6IHsgJ2MnOiAxIH0gfSB9XG4gKiBdO1xuICpcbiAqIF8ubWFwKG9iamVjdHMsIF8ucHJvcGVydHkoJ2EuYi5jJykpO1xuICogLy8gPT4gWzIsIDFdXG4gKlxuICogXy5wbHVjayhfLnNvcnRCeShvYmplY3RzLCBfLnByb3BlcnR5KFsnYScsICdiJywgJ2MnXSkpLCAnYS5iLmMnKTtcbiAqIC8vID0+IFsxLCAyXVxuICovXG5mdW5jdGlvbiBwcm9wZXJ0eShwYXRoKSB7XG4gIHJldHVybiBpc0tleShwYXRoKSA/IGJhc2VQcm9wZXJ0eShwYXRoKSA6IGJhc2VQcm9wZXJ0eURlZXAocGF0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNhbGxiYWNrO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjUgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXN0eXBlZGFycmF5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aXRob3V0IHN1cHBvcnQgZm9yIGB0aGlzYCBiaW5kaW5nXG4gKiBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIGlkZW50aWNhbCB2YWx1ZXMuXG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgdmFsVHlwZSA9IHR5cGVvZiB2YWx1ZSxcbiAgICAgIG90aFR5cGUgPSB0eXBlb2Ygb3RoZXI7XG5cbiAgLy8gRXhpdCBlYXJseSBmb3IgdW5saWtlIHByaW1pdGl2ZSB2YWx1ZXMuXG4gIGlmICgodmFsVHlwZSAhPSAnZnVuY3Rpb24nICYmIHZhbFR5cGUgIT0gJ29iamVjdCcgJiYgb3RoVHlwZSAhPSAnZnVuY3Rpb24nICYmIG90aFR5cGUgIT0gJ29iamVjdCcpIHx8XG4gICAgICB2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwpIHtcbiAgICAvLyBSZXR1cm4gYGZhbHNlYCB1bmxlc3MgYm90aCB2YWx1ZXMgYXJlIGBOYU5gLlxuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiYXNlSXNFcXVhbCwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBvYmplY3RzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNMb29zZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0I9W11dIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBhcnJheVRhZyxcbiAgICAgIG90aFRhZyA9IGFycmF5VGFnO1xuXG4gIGlmICghb2JqSXNBcnIpIHtcbiAgICBvYmpUYWcgPSBvYmpUb1N0cmluZy5jYWxsKG9iamVjdCk7XG4gICAgaWYgKG9ialRhZyA9PSBhcmdzVGFnKSB7XG4gICAgICBvYmpUYWcgPSBvYmplY3RUYWc7XG4gICAgfSBlbHNlIGlmIChvYmpUYWcgIT0gb2JqZWN0VGFnKSB7XG4gICAgICBvYmpJc0FyciA9IGlzVHlwZWRBcnJheShvYmplY3QpO1xuICAgIH1cbiAgfVxuICBpZiAoIW90aElzQXJyKSB7XG4gICAgb3RoVGFnID0gb2JqVG9TdHJpbmcuY2FsbChvdGhlcik7XG4gICAgaWYgKG90aFRhZyA9PSBhcmdzVGFnKSB7XG4gICAgICBvdGhUYWcgPSBvYmplY3RUYWc7XG4gICAgfSBlbHNlIGlmIChvdGhUYWcgIT0gb2JqZWN0VGFnKSB7XG4gICAgICBvdGhJc0FyciA9IGlzVHlwZWRBcnJheShvdGhlcik7XG4gICAgfVxuICB9XG4gIHZhciBvYmpJc09iaiA9IG9ialRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBvdGhJc09iaiA9IG90aFRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBpc1NhbWVUYWcgPSBvYmpUYWcgPT0gb3RoVGFnO1xuXG4gIGlmIChpc1NhbWVUYWcgJiYgIShvYmpJc0FyciB8fCBvYmpJc09iaikpIHtcbiAgICByZXR1cm4gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcpO1xuICB9XG4gIGlmICghaXNMb29zZSkge1xuICAgIHZhciB2YWxXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAodmFsV3JhcHBlZCB8fCBvdGhXcmFwcGVkKSB7XG4gICAgICByZXR1cm4gZXF1YWxGdW5jKHZhbFdyYXBwZWQgPyBvYmplY3QudmFsdWUoKSA6IG9iamVjdCwgb3RoV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlciwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgIH1cbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIC8vIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIGRldGVjdGluZyBjaXJjdWxhciByZWZlcmVuY2VzIHNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI0pPLlxuICBzdGFja0EgfHwgKHN0YWNrQSA9IFtdKTtcbiAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG5cbiAgdmFyIGxlbmd0aCA9IHN0YWNrQS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChzdGFja0FbbGVuZ3RoXSA9PSBvYmplY3QpIHtcbiAgICAgIHJldHVybiBzdGFja0JbbGVuZ3RoXSA9PSBvdGhlcjtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIGBvYmplY3RgIGFuZCBgb3RoZXJgIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgc3RhY2tBLnB1c2gob2JqZWN0KTtcbiAgc3RhY2tCLnB1c2gob3RoZXIpO1xuXG4gIHZhciByZXN1bHQgPSAob2JqSXNBcnIgPyBlcXVhbEFycmF5cyA6IGVxdWFsT2JqZWN0cykob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG5cbiAgc3RhY2tBLnBvcCgpO1xuICBzdGFja0IucG9wKCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgYXJyYXlzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNMb29zZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gdHJ1ZTtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzTG9vc2UgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBEZWVwIGNvbXBhcmUgdGhlIGNvbnRlbnRzLCBpZ25vcmluZyBub24tbnVtZXJpYyBwcm9wZXJ0aWVzLlxuICB3aGlsZSAocmVzdWx0ICYmICsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdO1xuXG4gICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICByZXN1bHQgPSBpc0xvb3NlXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4KVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgIGlmIChpc0xvb3NlKSB7XG4gICAgICAgIHZhciBvdGhJbmRleCA9IG90aExlbmd0aDtcbiAgICAgICAgd2hpbGUgKG90aEluZGV4LS0pIHtcbiAgICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW290aEluZGV4XTtcbiAgICAgICAgICByZXN1bHQgPSAoYXJyVmFsdWUgJiYgYXJyVmFsdWUgPT09IG90aFZhbHVlKSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSAoYXJyVmFsdWUgJiYgYXJyVmFsdWUgPT09IG90aFZhbHVlKSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiAhIXJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWJlcnMsIGRhdGVzIHRvIG1pbGxpc2Vjb25kcyBhbmQgYm9vbGVhbnNcbiAgICAgIC8vIHRvIGAxYCBvciBgMGAgdHJlYXRpbmcgaW52YWxpZCBkYXRlcyBjb2VyY2VkIHRvIGBOYU5gIGFzIG5vdCBlcXVhbC5cbiAgICAgIHJldHVybiArb2JqZWN0ID09ICtvdGhlcjtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBUcmVhdCBgTmFOYCB2cy4gYE5hTmAgYXMgZXF1YWwuXG4gICAgICByZXR1cm4gKG9iamVjdCAhPSArb2JqZWN0KVxuICAgICAgICA/IG90aGVyICE9ICtvdGhlclxuICAgICAgICA6IG9iamVjdCA9PSArb3RoZXI7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MgcHJpbWl0aXZlcyBhbmQgc3RyaW5nXG4gICAgICAvLyBvYmplY3RzIGFzIGVxdWFsLiBTZWUgaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4MTUuMTAuNi40IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBvYmplY3RzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqUHJvcHMgPSBrZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc0xvb3NlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBza2lwQ3RvciA9IGlzTG9vc2UsXG4gICAgICBpbmRleCA9IC0xO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XSxcbiAgICAgICAgcmVzdWx0ID0gaXNMb29zZSA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSk7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICAgIHJlc3VsdCA9IGlzTG9vc2VcbiAgICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIG9ialZhbHVlLCBrZXkpXG4gICAgICAgICAgOiBjdXN0b21pemVyKG9ialZhbHVlLCBvdGhWYWx1ZSwga2V5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgcmVzdWx0ID0gKG9ialZhbHVlICYmIG9ialZhbHVlID09PSBvdGhWYWx1ZSkgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBza2lwQ3RvciB8fCAoc2tpcEN0b3IgPSBrZXkgPT0gJ2NvbnN0cnVjdG9yJyk7XG4gIH1cbiAgaWYgKCFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID0gdHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID0gdHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID0gdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID0gdHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID0gdHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29ialRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMyAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGtleXMgPSByZXF1aXJlKCdsb2Rhc2gua2V5cycpO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckVhY2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R8c3RyaW5nfSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqL1xudmFyIGJhc2VFYWNoID0gY3JlYXRlQmFzZUVhY2goYmFzZUZvck93bik7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JJbmAgYW5kIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlc1xuICogb3ZlciBgb2JqZWN0YCBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgaW52b2tpbmcgYGl0ZXJhdGVlYCBmb3JcbiAqIGVhY2ggcHJvcGVydHkuIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseVxuICogcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBgYmFzZUVhY2hgIG9yIGBiYXNlRWFjaFJpZ2h0YCBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBhIGNvbGxlY3Rpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VFYWNoKGVhY2hGdW5jLCBmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gICAgdmFyIGxlbmd0aCA9IGNvbGxlY3Rpb24gPyBnZXRMZW5ndGgoY29sbGVjdGlvbikgOiAwO1xuICAgIGlmICghaXNMZW5ndGgobGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIGVhY2hGdW5jKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKTtcbiAgICB9XG4gICAgdmFyIGluZGV4ID0gZnJvbVJpZ2h0ID8gbGVuZ3RoIDogLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gdG9PYmplY3QoY29sbGVjdGlvbik7XG5cbiAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBgXy5mb3JJbmAgb3IgYF8uZm9ySW5SaWdodGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUZvcihmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gICAgdmFyIGl0ZXJhYmxlID0gdG9PYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gZnJvbVJpZ2h0ID8gbGVuZ3RoIDogLTE7XG5cbiAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGEgW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpXG4gKiBpbiBTYWZhcmkgb24gaU9TIDguMSBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBvYmplY3QgaWYgaXQgaXMgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDogT2JqZWN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAoISF2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRWFjaDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmluZGAsIGBfLmZpbmRMYXN0YCwgYF8uZmluZEtleWAsIGFuZCBgXy5maW5kTGFzdEtleWAsXG4gKiB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLCB3aGljaCBpdGVyYXRlc1xuICogb3ZlciBgY29sbGVjdGlvbmAgdXNpbmcgdGhlIHByb3ZpZGVkIGBlYWNoRnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBzZWFyY2guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYGNvbGxlY3Rpb25gLlxuICogQHBhcmFtIHtib29sZWFufSBbcmV0S2V5XSBTcGVjaWZ5IHJldHVybmluZyB0aGUga2V5IG9mIHRoZSBmb3VuZCBlbGVtZW50XG4gKiAgaW5zdGVhZCBvZiB0aGUgZWxlbWVudCBpdHNlbGYuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZm91bmQgZWxlbWVudCBvciBpdHMga2V5LCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBiYXNlRmluZChjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIGVhY2hGdW5jLCByZXRLZXkpIHtcbiAgdmFyIHJlc3VsdDtcbiAgZWFjaEZ1bmMoY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGtleSwgY29sbGVjdGlvbikge1xuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGtleSwgY29sbGVjdGlvbikpIHtcbiAgICAgIHJlc3VsdCA9IHJldEtleSA/IGtleSA6IHZhbHVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZpbmQ7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjIuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWNhbGxiYWNrJyksXG4gICAgYmFzZUZpbmRJbmRleCA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWZpbmRpbmRleCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgXy5maW5kSW5kZXhgIG9yIGBfLmZpbmRMYXN0SW5kZXhgIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZpbmQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUZpbmRJbmRleChmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LCBwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICBpZiAoIShhcnJheSAmJiBhcnJheS5sZW5ndGgpKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIHByZWRpY2F0ZSA9IGJhc2VDYWxsYmFjayhwcmVkaWNhdGUsIHRoaXNBcmcsIDMpO1xuICAgIHJldHVybiBiYXNlRmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21SaWdodCk7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5maW5kYCBleGNlcHQgdGhhdCBpdCByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3RcbiAqIGVsZW1lbnQgYHByZWRpY2F0ZWAgcmV0dXJucyB0cnV0aHkgZm9yIGluc3RlYWQgb2YgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICpcbiAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgYF8ucHJvcGVydHlgXG4gKiBzdHlsZSBjYWxsYmFjayByZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqXG4gKiBJZiBhIHZhbHVlIGlzIGFsc28gcHJvdmlkZWQgZm9yIGB0aGlzQXJnYCB0aGUgY3JlYXRlZCBgXy5tYXRjaGVzUHJvcGVydHlgXG4gKiBzdHlsZSBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIGEgbWF0Y2hpbmcgcHJvcGVydHlcbiAqIHZhbHVlLCBlbHNlIGBmYWxzZWAuXG4gKlxuICogSWYgYW4gb2JqZWN0IGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBgXy5tYXRjaGVzYCBzdHlsZVxuICogY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgZ2l2ZW5cbiAqIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxzdHJpbmd9IFtwcmVkaWNhdGU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWRcbiAqICBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBwcmVkaWNhdGVgLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZvdW5kIGVsZW1lbnQsIGVsc2UgYC0xYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0gW1xuICogICB7ICd1c2VyJzogJ2Jhcm5leScsICAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAgJ2FjdGl2ZSc6IGZhbHNlIH0sXG4gKiAgIHsgJ3VzZXInOiAncGViYmxlcycsICdhY3RpdmUnOiB0cnVlIH1cbiAqIF07XG4gKlxuICogXy5maW5kSW5kZXgodXNlcnMsIGZ1bmN0aW9uKGNocikge1xuICogICByZXR1cm4gY2hyLnVzZXIgPT0gJ2Jhcm5leSc7XG4gKiB9KTtcbiAqIC8vID0+IDBcbiAqXG4gKiAvLyB1c2luZyB0aGUgYF8ubWF0Y2hlc2AgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLmZpbmRJbmRleCh1c2VycywgeyAndXNlcic6ICdmcmVkJywgJ2FjdGl2ZSc6IGZhbHNlIH0pO1xuICogLy8gPT4gMVxuICpcbiAqIC8vIHVzaW5nIHRoZSBgXy5tYXRjaGVzUHJvcGVydHlgIGNhbGxiYWNrIHNob3J0aGFuZFxuICogXy5maW5kSW5kZXgodXNlcnMsICdhY3RpdmUnLCBmYWxzZSk7XG4gKiAvLyA9PiAwXG4gKlxuICogLy8gdXNpbmcgdGhlIGBfLnByb3BlcnR5YCBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8uZmluZEluZGV4KHVzZXJzLCAnYWN0aXZlJyk7XG4gKiAvLyA9PiAyXG4gKi9cbnZhciBmaW5kSW5kZXggPSBjcmVhdGVGaW5kSW5kZXgoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kSW5kZXg7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjYuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbmRJbmRleGAgYW5kIGBfLmZpbmRMYXN0SW5kZXhgIHdpdGhvdXRcbiAqIHN1cHBvcnQgZm9yIGNhbGxiYWNrIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgZnJvbVJpZ2h0KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xO1xuXG4gIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGaW5kSW5kZXg7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJlZm9yZSA9IHJlcXVpcmUoJ2xvZGFzaC5iZWZvcmUnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpcyByZXN0cmljdGVkIHRvIGludm9raW5nIGBmdW5jYCBvbmNlLiBSZXBlYXQgY2FsbHNcbiAqIHRvIHRoZSBmdW5jdGlvbiByZXR1cm4gdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBjYWxsLiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBjcmVhdGVkIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAdHlwZSBGdW5jdGlvblxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byByZXN0cmljdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHJlc3RyaWN0ZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBpbml0aWFsaXplID0gXy5vbmNlKGNyZWF0ZUFwcGxpY2F0aW9uKTtcbiAqIGluaXRpYWxpemUoKTtcbiAqIGluaXRpYWxpemUoKTtcbiAqIC8vIGBpbml0aWFsaXplYCBpbnZva2VzIGBjcmVhdGVBcHBsaWNhdGlvbmAgb25jZVxuICovXG5mdW5jdGlvbiBvbmNlKGZ1bmMpIHtcbiAgcmV0dXJuIGJlZm9yZShmdW5jLCAyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvbmNlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2AsIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIGFuZCBhcmd1bWVudHNcbiAqIG9mIHRoZSBjcmVhdGVkIGZ1bmN0aW9uLCB3aGlsZSBpdCBpcyBjYWxsZWQgbGVzcyB0aGFuIGBuYCB0aW1lcy4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGNyZWF0ZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGludm9jYXRpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBjYWxscyBhdCB3aGljaCBgZnVuY2AgaXMgbm8gbG9uZ2VyIGludm9rZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byByZXN0cmljdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHJlc3RyaWN0ZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIGpRdWVyeSgnI2FkZCcpLm9uKCdjbGljaycsIF8uYmVmb3JlKDUsIGFkZENvbnRhY3RUb0xpc3QpKTtcbiAqIC8vID0+IGFsbG93cyBhZGRpbmcgdXAgdG8gNCBjb250YWN0cyB0byB0aGUgbGlzdFxuICovXG5mdW5jdGlvbiBiZWZvcmUobiwgZnVuYykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICh0eXBlb2YgbiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgdGVtcCA9IG47XG4gICAgICBuID0gZnVuYztcbiAgICAgIGZ1bmMgPSB0ZW1wO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpZiAoLS1uID4gMCkge1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBpZiAobiA8PSAxKSB7XG4gICAgICBmdW5jID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiZWZvcmU7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCdsb2Rhc2guaXNmdW5jdGlvbicpO1xuXG4vKipcbiAqIFJlc29sdmVzIHRoZSB2YWx1ZSBvZiBwcm9wZXJ0eSBga2V5YCBvbiBgb2JqZWN0YC4gSWYgdGhlIHZhbHVlIG9mIGBrZXlgIGlzXG4gKiBhIGZ1bmN0aW9uIGl0IGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYG9iamVjdGAgYW5kIGl0cyByZXN1bHRcbiAqIGlzIHJldHVybmVkLCBlbHNlIHRoZSBwcm9wZXJ0eSB2YWx1ZSBpcyByZXR1cm5lZC4gSWYgdGhlIHByb3BlcnR5IHZhbHVlIGlzXG4gKiBgdW5kZWZpbmVkYCB0aGUgYGRlZmF1bHRWYWx1ZWAgaXMgdXNlZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gcmVzb2x2ZS5cbiAqIEBwYXJhbSB7Kn0gW2RlZmF1bHRWYWx1ZV0gVGhlIHZhbHVlIHJldHVybmVkIGlmIHRoZSBwcm9wZXJ0eSB2YWx1ZVxuICogIHJlc29sdmVzIHRvIGB1bmRlZmluZWRgLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IF8uY29uc3RhbnQoNDApIH07XG4gKlxuICogXy5yZXN1bHQob2JqZWN0LCAndXNlcicpO1xuICogLy8gPT4gJ2ZyZWQnXG4gKlxuICogXy5yZXN1bHQob2JqZWN0LCAnYWdlJyk7XG4gKiAvLyA9PiA0MFxuICpcbiAqIF8ucmVzdWx0KG9iamVjdCwgJ3N0YXR1cycsICdidXN5Jyk7XG4gKiAvLyA9PiAnYnVzeSdcbiAqXG4gKiBfLnJlc3VsdChvYmplY3QsICdzdGF0dXMnLCBfLmNvbnN0YW50KCdidXN5JykpO1xuICogLy8gPT4gJ2J1c3knXG4gKi9cbmZ1bmN0aW9uIHJlc3VsdChvYmplY3QsIGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gIHZhciB2YWx1ZSA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgfVxuICByZXR1cm4gaXNGdW5jdGlvbih2YWx1ZSkgPyB2YWx1ZS5jYWxsKG9iamVjdCkgOiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMyAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBbc3BlY2lhbCBjaGFyYWN0ZXJzXShodHRwOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9jaGFyYWN0ZXJzLmh0bWwjc3BlY2lhbCkuXG4gKiBJbiBhZGRpdGlvbiB0byBzcGVjaWFsIGNoYXJhY3RlcnMgdGhlIGZvcndhcmQgc2xhc2ggaXMgZXNjYXBlZCB0byBhbGxvdyBmb3JcbiAqIGVhc2llciBgZXZhbGAgdXNlIGFuZCBgRnVuY3Rpb25gIGNvbXBpbGF0aW9uLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRnVuY3Rpb25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgZW52aXJvbm1lbnRzXG4gKiB3aXRoIGluY29ycmVjdCBgdHlwZW9mYCByZXN1bHRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgQ2hha3JhIEpJVCBidWcgaW4gY29tcGF0aWJpbGl0eSBtb2RlcyBvZiBJRSAxMS5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZS9pc3N1ZXMvMTYyMSBmb3IgbW9yZSBkZXRhaWxzLlxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBpZiBpdCBpcyBub3Qgb25lLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWRcbiAqIGZvciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogKHZhbHVlICsgJycpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBlc2NhcGVSZWdFeHAob2JqVG9TdHJpbmcpXG4gIC5yZXBsYWNlKC90b1N0cmluZ3woZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBVaW50OEFycmF5ID0gaXNOYXRpdmUoVWludDhBcnJheSA9IGdsb2JhbC5VaW50OEFycmF5KSAmJiBVaW50OEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNGdW5jdGlvbiA9ICEoYmFzZUlzRnVuY3Rpb24oL3gvKSB8fCAoVWludDhBcnJheSAmJiAhYmFzZUlzRnVuY3Rpb24oVWludDhBcnJheSkpKSA/IGJhc2VJc0Z1bmN0aW9uIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpIHdoaWNoIHJldHVybiAnZnVuY3Rpb24nIGZvciByZWdleGVzXG4gIC8vIGFuZCBTYWZhcmkgOCBlcXVpdmFsZW50cyB3aGljaCByZXR1cm4gJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGNvbnN0cnVjdG9ycy5cbiAgcmV0dXJuIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWc7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVJc05hdGl2ZS50ZXN0KGZuVG9TdHJpbmcuY2FsbCh2YWx1ZSkpO1xuICB9XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIHJlSXNIb3N0Q3Rvci50ZXN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBFc2NhcGVzIHRoZSBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMgXCJcXFwiLCBcIi9cIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLFxuICogXCIqXCIsIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6XFwvXFwvbG9kYXNoXFwuY29tXFwvXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWNhbGxiYWNrJyksXG4gICAgYmFzZVVuaXEgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2V1bmlxJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCdsb2Rhc2guX2lzaXRlcmF0ZWVjYWxsJyk7XG5cbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2YgYF8udW5pcWAgb3B0aW1pemVkIGZvciBzb3J0ZWQgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydFxuICogZm9yIGNhbGxiYWNrIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZS12YWx1ZS1mcmVlIGFycmF5LlxuICovXG5mdW5jdGlvbiBzb3J0ZWRVbmlxKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgc2VlbixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXNJbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSA6IHZhbHVlO1xuXG4gICAgaWYgKCFpbmRleCB8fCBzZWVuICE9PSBjb21wdXRlZCkge1xuICAgICAgc2VlbiA9IGNvbXB1dGVkO1xuICAgICAgcmVzdWx0WysrcmVzSW5kZXhdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGR1cGxpY2F0ZS12YWx1ZS1mcmVlIHZlcnNpb24gb2YgYW4gYXJyYXkgdXNpbmcgYFNhbWVWYWx1ZVplcm9gXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuIFByb3ZpZGluZyBgdHJ1ZWAgZm9yIGBpc1NvcnRlZGAgcGVyZm9ybXMgYSBmYXN0ZXJcbiAqIHNlYXJjaCBhbGdvcml0aG0gZm9yIHNvcnRlZCBhcnJheXMuIElmIGFuIGl0ZXJhdGVlIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIGl0XG4gKiBpcyBpbnZva2VkIGZvciBlYWNoIHZhbHVlIGluIHRoZSBhcnJheSB0byBnZW5lcmF0ZSB0aGUgY3JpdGVyaW9uIGJ5IHdoaWNoXG4gKiB1bmlxdWVuZXNzIGlzIGNvbXB1dGVkLiBUaGUgYGl0ZXJhdGVlYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWRcbiAqIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4LCBhcnJheSkuXG4gKlxuICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ucHJvcGVydHlcIlxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogSWYgYW4gb2JqZWN0IGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ubWF0Y2hlc1wiIHN0eWxlXG4gKiBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlblxuICogb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKlxuICogKipOb3RlOioqIGBTYW1lVmFsdWVaZXJvYCBjb21wYXJpc29ucyBhcmUgbGlrZSBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsXG4gKiBlLmcuIGA9PT1gLCBleGNlcHQgdGhhdCBgTmFOYCBtYXRjaGVzIGBOYU5gLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgdW5pcXVlXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbaXNTb3J0ZWRdIFNwZWNpZnkgdGhlIGFycmF5IGlzIHNvcnRlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fHN0cmluZ30gW2l0ZXJhdGVlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcHJvdmlkZWQgaXQgaXMgdXNlZCB0byBjcmVhdGUgYSBcIl8ucHJvcGVydHlcIlxuICogIG9yIFwiXy5tYXRjaGVzXCIgc3R5bGUgY2FsbGJhY2sgcmVzcGVjdGl2ZWx5LlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBpdGVyYXRlZWAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUtdmFsdWUtZnJlZSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy51bmlxKFsxLCAyLCAxXSk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyB1c2luZyBgaXNTb3J0ZWRgXG4gKiBfLnVuaXEoWzEsIDEsIDJdLCB0cnVlKTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIHVzaW5nIGFuIGl0ZXJhdGVlIGZ1bmN0aW9uXG4gKiBfLnVuaXEoWzEsIDIuNSwgMS41LCAyXSwgZnVuY3Rpb24obikgeyByZXR1cm4gdGhpcy5mbG9vcihuKTsgfSwgTWF0aCk7XG4gKiAvLyA9PiBbMSwgMi41XVxuICpcbiAqIC8vIHVzaW5nIHRoZSBcIl8ucHJvcGVydHlcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8udW5pcShbeyAneCc6IDEgfSwgeyAneCc6IDIgfSwgeyAneCc6IDEgfV0sICd4Jyk7XG4gKiAvLyA9PiBbeyAneCc6IDEgfSwgeyAneCc6IDIgfV1cbiAqL1xuZnVuY3Rpb24gdW5pcShhcnJheSwgaXNTb3J0ZWQsIGl0ZXJhdGVlLCB0aGlzQXJnKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIC8vIEp1Z2dsZSBhcmd1bWVudHMuXG4gIGlmICh0eXBlb2YgaXNTb3J0ZWQgIT0gJ2Jvb2xlYW4nICYmIGlzU29ydGVkICE9IG51bGwpIHtcbiAgICB0aGlzQXJnID0gaXRlcmF0ZWU7XG4gICAgaXRlcmF0ZWUgPSBpc0l0ZXJhdGVlQ2FsbChhcnJheSwgaXNTb3J0ZWQsIHRoaXNBcmcpID8gbnVsbCA6IGlzU29ydGVkO1xuICAgIGlzU29ydGVkID0gZmFsc2U7XG4gIH1cbiAgaXRlcmF0ZWUgPSBpdGVyYXRlZSA9PSBudWxsID8gaXRlcmF0ZWUgOiBiYXNlQ2FsbGJhY2soaXRlcmF0ZWUsIHRoaXNBcmcsIDMpO1xuICByZXR1cm4gKGlzU29ydGVkKVxuICAgID8gc29ydGVkVW5pcShhcnJheSwgaXRlcmF0ZWUpXG4gICAgOiBiYXNlVW5pcShhcnJheSwgaXRlcmF0ZWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaXE7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMiAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VJbmRleE9mID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlaW5kZXhvZicpLFxuICAgIGNhY2hlSW5kZXhPZiA9IHJlcXVpcmUoJ2xvZGFzaC5fY2FjaGVpbmRleG9mJyksXG4gICAgY3JlYXRlQ2FjaGUgPSByZXF1aXJlKCdsb2Rhc2guX2NyZWF0ZWNhY2hlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5pcWAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFjayBzaG9ydGhhbmRzXG4gKiBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlLXZhbHVlLWZyZWUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmlxKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluZGV4T2YgPSBiYXNlSW5kZXhPZixcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGlzQ29tbW9uID0gdHJ1ZSxcbiAgICAgIGlzTGFyZ2UgPSBpc0NvbW1vbiAmJiBsZW5ndGggPj0gMjAwLFxuICAgICAgc2VlbiA9IGlzTGFyZ2UgPyBjcmVhdGVDYWNoZSgpIDogbnVsbCxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGlmIChzZWVuKSB7XG4gICAgaW5kZXhPZiA9IGNhY2hlSW5kZXhPZjtcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGlzTGFyZ2UgPSBmYWxzZTtcbiAgICBzZWVuID0gaXRlcmF0ZWUgPyBbXSA6IHJlc3VsdDtcbiAgfVxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSA6IHZhbHVlO1xuXG4gICAgaWYgKGlzQ29tbW9uICYmIHZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgdmFyIHNlZW5JbmRleCA9IHNlZW4ubGVuZ3RoO1xuICAgICAgd2hpbGUgKHNlZW5JbmRleC0tKSB7XG4gICAgICAgIGlmIChzZWVuW3NlZW5JbmRleF0gPT09IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpdGVyYXRlZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpbmRleE9mKHNlZW4sIGNvbXB1dGVkLCAwKSA8IDApIHtcbiAgICAgIGlmIChpdGVyYXRlZSB8fCBpc0xhcmdlKSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVVuaXE7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjEuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmluZGV4T2ZgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYmluYXJ5IHNlYXJjaGVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgaWYgKHZhbHVlICE9PSB2YWx1ZSkge1xuICAgIHJldHVybiBpbmRleE9mTmFOKGFycmF5LCBmcm9tSW5kZXgpO1xuICB9XG4gIHZhciBpbmRleCA9IGZyb21JbmRleCAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYE5hTmAgaXMgZm91bmQgaW4gYGFycmF5YC5cbiAqIElmIGBmcm9tUmlnaHRgIGlzIHByb3ZpZGVkIGVsZW1lbnRzIG9mIGBhcnJheWAgYXJlIGl0ZXJhdGVkIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCBgTmFOYCwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBpbmRleE9mTmFOKGFycmF5LCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMCA6IC0xKTtcblxuICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgIHZhciBvdGhlciA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAob3RoZXIgIT09IG90aGVyKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSW5kZXhPZjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gYGNhY2hlYCBtaW1pY2tpbmcgdGhlIHJldHVybiBzaWduYXR1cmUgb2ZcbiAqIGBfLmluZGV4T2ZgIGJ5IHJldHVybmluZyBgMGAgaWYgdGhlIHZhbHVlIGlzIGZvdW5kLCBlbHNlIGAtMWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSBUaGUgY2FjaGUgdG8gc2VhcmNoLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYDBgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gY2FjaGVJbmRleE9mKGNhY2hlLCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IGNhY2hlLmRhdGEsXG4gICAgICByZXN1bHQgPSAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzT2JqZWN0KHZhbHVlKSkgPyBkYXRhLnNldC5oYXModmFsdWUpIDogZGF0YS5oYXNoW3ZhbHVlXTtcblxuICByZXR1cm4gcmVzdWx0ID8gMCA6IC0xO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICghIXZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhY2hlSW5kZXhPZjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgaXNOYXRpdmUgPSByZXF1aXJlKCdsb2Rhc2guaXNuYXRpdmUnKTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBTZXQgPSBpc05hdGl2ZShTZXQgPSBnbG9iYWwuU2V0KSAmJiBTZXQ7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gaXNOYXRpdmUobmF0aXZlQ3JlYXRlID0gT2JqZWN0LmNyZWF0ZSkgJiYgbmF0aXZlQ3JlYXRlO1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGEgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgbGVuZ3RoID0gdmFsdWVzID8gdmFsdWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5kYXRhID0geyAnaGFzaCc6IG5hdGl2ZUNyZWF0ZShudWxsKSwgJ3NldCc6IG5ldyBTZXQgfTtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdGhpcy5wdXNoKHZhbHVlc1tsZW5ndGhdKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHB1c2hcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlUHVzaCh2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc09iamVjdCh2YWx1ZSkpIHtcbiAgICBkYXRhLnNldC5hZGQodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIGRhdGEuaGFzaFt2YWx1ZV0gPSB0cnVlO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBTZXRgIGNhY2hlIG9iamVjdCB0byBvcHRpbWl6ZSBsaW5lYXIgc2VhcmNoZXMgb2YgbGFyZ2UgYXJyYXlzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICogQHJldHVybnMge251bGx8T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgY2FjaGUgb2JqZWN0IGlmIGBTZXRgIGlzIHN1cHBvcnRlZCwgZWxzZSBgbnVsbGAuXG4gKi9cbnZhciBjcmVhdGVDYWNoZSA9ICEobmF0aXZlQ3JlYXRlICYmIFNldCkgPyBjb25zdGFudChudWxsKSA6IGZ1bmN0aW9uKHZhbHVlcykge1xuICByZXR1cm4gbmV3IFNldENhY2hlKHZhbHVlcyk7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICghIXZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYHZhbHVlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiBmcm9tIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqIHZhciBnZXR0ZXIgPSBfLmNvbnN0YW50KG9iamVjdCk7XG4gKlxuICogZ2V0dGVyKCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gY29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxuLy8gQWRkIGZ1bmN0aW9ucyB0byB0aGUgYFNldGAgY2FjaGUuXG5TZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IGNhY2hlUHVzaDtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDYWNoZTtcbiIsIi8vVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSBiaW4vaG9vay5qc1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZScpO1xubW9kdWxlLmV4cG9ydHMgPSB7ICdtZWRpYV9jb250cm9sJzogdGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLWJhY2tncm91bmRcIiBkYXRhLWJhY2tncm91bmQ+PC9kaXY+PGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtbGF5ZXJcIiBkYXRhLWNvbnRyb2xzPjwlIHZhciByZW5kZXJCYXI9ZnVuY3Rpb24obmFtZSkgeyAlPjxkaXYgY2xhc3M9XCJiYXItY29udGFpbmVyXCIgZGF0YS08JT0gbmFtZSAlPj48ZGl2IGNsYXNzPVwiYmFyLWJhY2tncm91bmRcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJiYXItZmlsbC0xXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48ZGl2IGNsYXNzPVwiYmFyLWZpbGwtMlwiIGRhdGEtPCU9IG5hbWUgJT4+PC9kaXY+PGRpdiBjbGFzcz1cImJhci1ob3ZlclwiIGRhdGEtPCU9IG5hbWUgJT4+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImJhci1zY3J1YmJlclwiIGRhdGEtPCU9IG5hbWUgJT4+PGRpdiBjbGFzcz1cImJhci1zY3J1YmJlci1pY29uXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48L2Rpdj48L2Rpdj48JSB9OyAlPjwlIHZhciByZW5kZXJTZWdtZW50ZWRCYXI9ZnVuY3Rpb24obmFtZSwgc2VnbWVudHMpIHsgc2VnbWVudHM9c2VnbWVudHMgfHwgMTA7ICU+PGRpdiBjbGFzcz1cImJhci1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjwlIGZvciAodmFyIGkgPSAwOyBpIDwgc2VnbWVudHM7IGkrKykgeyAlPjxkaXYgY2xhc3M9XCJzZWdtZW50ZWQtYmFyLWVsZW1lbnRcIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjwlIH0gJT48L2Rpdj48JSB9OyAlPjwlIHZhciByZW5kZXJEcmF3ZXI9ZnVuY3Rpb24obmFtZSwgcmVuZGVyQ29udGVudCkgeyAlPjxkaXYgY2xhc3M9XCJkcmF3ZXItY29udGFpbmVyXCIgZGF0YS08JT0gbmFtZSAlPj48ZGl2IGNsYXNzPVwiZHJhd2VyLWljb24tY29udGFpbmVyXCIgZGF0YS08JT0gbmFtZSAlPj48ZGl2IGNsYXNzPVwiZHJhd2VyLWljb24gbWVkaWEtY29udHJvbC1pY29uXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48c3BhbiBjbGFzcz1cImRyYXdlci10ZXh0XCIgZGF0YS08JT0gbmFtZSAlPj48L3NwYW4+PC9kaXY+PCUgcmVuZGVyQ29udGVudChuYW1lKTsgJT48L2Rpdj48JSB9OyAlPjwlIHZhciByZW5kZXJJbmRpY2F0b3I9ZnVuY3Rpb24obmFtZSkgeyAlPjxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLWluZGljYXRvclwiIGRhdGEtPCU9IG5hbWUgJT4+PC9kaXY+PCUgfTsgJT48JSB2YXIgcmVuZGVyQnV0dG9uPWZ1bmN0aW9uKG5hbWUpIHsgJT48YnV0dG9uIGNsYXNzPVwibWVkaWEtY29udHJvbC1idXR0b24gbWVkaWEtY29udHJvbC1pY29uXCIgZGF0YS08JT0gbmFtZSAlPj48L2J1dHRvbj48JSB9OyAlPjwlIHZhciB0ZW1wbGF0ZXM9eyBiYXI6IHJlbmRlckJhciwgc2VnbWVudGVkQmFyOiByZW5kZXJTZWdtZW50ZWRCYXIsIH07IHZhciByZW5kZXI9ZnVuY3Rpb24oc2V0dGluZ3NMaXN0KSB7IHNldHRpbmdzTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHNldHRpbmcpIHsgaWYoc2V0dGluZyA9PT0gXCJzZWVrYmFyXCIpIHsgcmVuZGVyQmFyKHNldHRpbmcpOyB9IGVsc2UgaWYgKHNldHRpbmcgPT09IFwidm9sdW1lXCIpIHsgcmVuZGVyRHJhd2VyKHNldHRpbmcsIHNldHRpbmdzLnZvbHVtZUJhclRlbXBsYXRlID8gdGVtcGxhdGVzW3NldHRpbmdzLnZvbHVtZUJhclRlbXBsYXRlXSA6IGZ1bmN0aW9uKG5hbWUpIHsgcmV0dXJuIHJlbmRlclNlZ21lbnRlZEJhcihuYW1lKTsgfSk7IH0gZWxzZSBpZiAoc2V0dGluZyA9PT0gXCJkdXJhdGlvblwiIHx8IHNldHRpbmc9PT0gXCJwb3NpdGlvblwiKSB7IHJlbmRlckluZGljYXRvcihzZXR0aW5nKTsgfSBlbHNlIHsgcmVuZGVyQnV0dG9uKHNldHRpbmcpOyB9IH0pOyB9OyAlPjwlIGlmIChzZXR0aW5ncy5kZWZhdWx0ICYmIHNldHRpbmdzLmRlZmF1bHQubGVuZ3RoKSB7ICU+PGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtY2VudGVyLXBhbmVsXCIgZGF0YS1tZWRpYS1jb250cm9sPjwlIHJlbmRlcihzZXR0aW5ncy5kZWZhdWx0KTsgJT48L2Rpdj48JSB9ICU+PCUgaWYgKHNldHRpbmdzLmxlZnQgJiYgc2V0dGluZ3MubGVmdC5sZW5ndGgpIHsgJT48ZGl2IGNsYXNzPVwibWVkaWEtY29udHJvbC1sZWZ0LXBhbmVsXCIgZGF0YS1tZWRpYS1jb250cm9sPjwlIHJlbmRlcihzZXR0aW5ncy5sZWZ0KTsgJT48L2Rpdj48JSB9ICU+PCUgaWYgKHNldHRpbmdzLnJpZ2h0ICYmIHNldHRpbmdzLnJpZ2h0Lmxlbmd0aCkgeyAlPjxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLXJpZ2h0LXBhbmVsXCIgZGF0YS1tZWRpYS1jb250cm9sPjwlIHJlbmRlcihzZXR0aW5ncy5yaWdodCk7ICU+PC9kaXY+PCUgfSAlPjwvZGl2PicpLCdzZWVrX3RpbWUnOiB0ZW1wbGF0ZSgnPHNwYW4gZGF0YS1zZWVrLXRpbWU+PC9zcGFuPicpLCdmbGFzaCc6IHRlbXBsYXRlKCc8cGFyYW0gbmFtZT1cIm1vdmllXCIgdmFsdWU9XCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLnN3ZlwiPjxwYXJhbSBuYW1lPVwicXVhbGl0eVwiIHZhbHVlPVwiYXV0b2hpZ2hcIj48cGFyYW0gbmFtZT1cInN3bGl2ZWNvbm5lY3RcIiB2YWx1ZT1cInRydWVcIj48cGFyYW0gbmFtZT1cImFsbG93U2NyaXB0QWNjZXNzXCIgdmFsdWU9XCJhbHdheXNcIj48cGFyYW0gbmFtZT1cImJnY29sb3JcIiB2YWx1ZT1cIiMwMDExMjJcIj48cGFyYW0gbmFtZT1cImFsbG93RnVsbFNjcmVlblwiIHZhbHVlPVwiZmFsc2VcIj48cGFyYW0gbmFtZT1cIndtb2RlXCIgdmFsdWU9XCJ0cmFuc3BhcmVudFwiPjxwYXJhbSBuYW1lPVwidGFiaW5kZXhcIiB2YWx1ZT1cIjFcIj48cGFyYW0gbmFtZT1GbGFzaFZhcnMgdmFsdWU9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgLz48ZW1iZWQgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIgZGlzYWJsZWQgdGFiaW5kZXg9XCItMVwiIGVuYWJsZWNvbnRleHRtZW51PVwiZmFsc2VcIiBhbGxvd1NjcmlwdEFjY2Vzcz1cImFsd2F5c1wiIHF1YWxpdHk9XCJhdXRvaGlnaHRcIiBwbHVnaW5zcGFnZT1cImh0dHA6Ly93d3cubWFjcm9tZWRpYS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXJcIiB3bW9kZT1cInRyYW5zcGFyZW50XCIgc3dsaXZlY29ubmVjdD1cInRydWVcIiB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBhbGxvd2Z1bGxzY3JlZW49XCJmYWxzZVwiIGJnY29sb3I9XCIjMDAwMDAwXCIgRmxhc2hWYXJzPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPlwiIHNyYz1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXIuc3dmXCI+PC9lbWJlZD4nKSwnaGxzJzogdGVtcGxhdGUoJzxwYXJhbSBuYW1lPVwibW92aWVcIiB2YWx1ZT1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9ITFNQbGF5ZXIuc3dmP2lubGluZT0xXCI+PHBhcmFtIG5hbWU9XCJxdWFsaXR5XCIgdmFsdWU9XCJhdXRvaGlnaFwiPjxwYXJhbSBuYW1lPVwic3dsaXZlY29ubmVjdFwiIHZhbHVlPVwidHJ1ZVwiPjxwYXJhbSBuYW1lPVwiYWxsb3dTY3JpcHRBY2Nlc3NcIiB2YWx1ZT1cImFsd2F5c1wiPjxwYXJhbSBuYW1lPVwiYmdjb2xvclwiIHZhbHVlPVwiIzAwMTEyMlwiPjxwYXJhbSBuYW1lPVwiYWxsb3dGdWxsU2NyZWVuXCIgdmFsdWU9XCJmYWxzZVwiPjxwYXJhbSBuYW1lPVwid21vZGVcIiB2YWx1ZT1cInRyYW5zcGFyZW50XCI+PHBhcmFtIG5hbWU9XCJ0YWJpbmRleFwiIHZhbHVlPVwiMVwiPjxwYXJhbSBuYW1lPUZsYXNoVmFycyB2YWx1ZT1cInBsYXliYWNrSWQ9PCU9IHBsYXliYWNrSWQgJT5cIiAvPjxlbWJlZCB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiB0YWJpbmRleD1cIjFcIiBlbmFibGVjb250ZXh0bWVudT1cImZhbHNlXCIgYWxsb3dTY3JpcHRBY2Nlc3M9XCJhbHdheXNcIiBxdWFsaXR5PVwiYXV0b2hpZ2hcIiBwbHVnaW5zcGFnZT1cImh0dHA6Ly93d3cubWFjcm9tZWRpYS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXJcIiB3bW9kZT1cInRyYW5zcGFyZW50XCIgc3dsaXZlY29ubmVjdD1cInRydWVcIiB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBhbGxvd2Z1bGxzY3JlZW49XCJmYWxzZVwiIGJnY29sb3I9XCIjMDAwMDAwXCIgRmxhc2hWYXJzPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPlwiIHNyYz1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9ITFNQbGF5ZXIuc3dmXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPjwvZW1iZWQ+JyksJ2h0bWw1X3ZpZGVvJzogdGVtcGxhdGUoJzxzb3VyY2Ugc3JjPVwiPCU9c3JjJT5cIiB0eXBlPVwiPCU9dHlwZSU+XCI+JyksJ25vX29wJzogdGVtcGxhdGUoJzxjYW52YXMgZGF0YS1uby1vcC1jYW52YXM+PC9jYW52YXM+PHAgZGF0YS1uby1vcC1tc2c+WW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHBsYXliYWNrIG9mIHRoaXMgdmlkZW8uIFRyeSB0byB1c2UgYSBkaWZmZXJlbnQgYnJvd3Nlci48cD4nKSwnZHZyX2NvbnRyb2xzJzogdGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJsaXZlLWluZm9cIj5MSVZFPC9kaXY+PGJ1dHRvbiBjbGFzcz1cImxpdmUtYnV0dG9uXCI+QkFDSyBUTyBMSVZFPC9idXR0b24+JyksJ3Bvc3Rlcic6IHRlbXBsYXRlKCc8ZGl2IGNsYXNzPVwicGxheS13cmFwcGVyXCIgZGF0YS1wb3N0ZXI+PHNwYW4gY2xhc3M9XCJwb3N0ZXItaWNvbiBwbGF5XCIgZGF0YS1wb3N0ZXIvPjwvZGl2PicpLCdzcGlubmVyX3RocmVlX2JvdW5jZSc6IHRlbXBsYXRlKCc8ZGl2IGRhdGEtYm91bmNlMT48L2Rpdj48ZGl2IGRhdGEtYm91bmNlMj48L2Rpdj48ZGl2IGRhdGEtYm91bmNlMz48L2Rpdj4nKSwnd2F0ZXJtYXJrJzogdGVtcGxhdGUoJzxkaXYgZGF0YS13YXRlcm1hcmsgZGF0YS13YXRlcm1hcmstPCU9cG9zaXRpb24gJT4+PGltZyBzcmM9XCI8JT0gaW1hZ2VVcmwgJT5cIj48L2Rpdj4nKSxDU1M6IHsnY29udGFpbmVyJzogJy5jb250YWluZXJbZGF0YS1jb250YWluZXJde3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtY29sb3I6IzAwMDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5jb250YWluZXJbZGF0YS1jb250YWluZXJdLnBvaW50ZXItZW5hYmxlZHtjdXJzb3I6cG9pbnRlcn0nLCdjb3JlJzogJ1tkYXRhLXBsYXllcl17LXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1raHRtbC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTstby11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApOy1tb3otdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTstby10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7cG9zaXRpb246cmVsYXRpdmU7bWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjQwMDt0ZXh0LWFsaWduOmNlbnRlcjtvdmVyZmxvdzpoaWRkZW47Zm9udC1zaXplOjEwMCU7Zm9udC1mYW1pbHk6XCJsdWNpZGEgZ3JhbmRlXCIsdGFob21hLHZlcmRhbmEsYXJpYWwsc2Fucy1zZXJpZjt0ZXh0LXNoYWRvdzowIDAgMDtib3gtc2l6aW5nOmJvcmRlci1ib3h9W2RhdGEtcGxheWVyXSBhLFtkYXRhLXBsYXllcl0gYWJicixbZGF0YS1wbGF5ZXJdIGFjcm9ueW0sW2RhdGEtcGxheWVyXSBhZGRyZXNzLFtkYXRhLXBsYXllcl0gYXBwbGV0LFtkYXRhLXBsYXllcl0gYXJ0aWNsZSxbZGF0YS1wbGF5ZXJdIGFzaWRlLFtkYXRhLXBsYXllcl0gYXVkaW8sW2RhdGEtcGxheWVyXSBiLFtkYXRhLXBsYXllcl0gYmlnLFtkYXRhLXBsYXllcl0gYmxvY2txdW90ZSxbZGF0YS1wbGF5ZXJdIGNhbnZhcyxbZGF0YS1wbGF5ZXJdIGNhcHRpb24sW2RhdGEtcGxheWVyXSBjZW50ZXIsW2RhdGEtcGxheWVyXSBjaXRlLFtkYXRhLXBsYXllcl0gY29kZSxbZGF0YS1wbGF5ZXJdIGRkLFtkYXRhLXBsYXllcl0gZGVsLFtkYXRhLXBsYXllcl0gZGV0YWlscyxbZGF0YS1wbGF5ZXJdIGRmbixbZGF0YS1wbGF5ZXJdIGRpdixbZGF0YS1wbGF5ZXJdIGRsLFtkYXRhLXBsYXllcl0gZHQsW2RhdGEtcGxheWVyXSBlbSxbZGF0YS1wbGF5ZXJdIGVtYmVkLFtkYXRhLXBsYXllcl0gZmllbGRzZXQsW2RhdGEtcGxheWVyXSBmaWdjYXB0aW9uLFtkYXRhLXBsYXllcl0gZmlndXJlLFtkYXRhLXBsYXllcl0gZm9vdGVyLFtkYXRhLXBsYXllcl0gZm9ybSxbZGF0YS1wbGF5ZXJdIGgxLFtkYXRhLXBsYXllcl0gaDIsW2RhdGEtcGxheWVyXSBoMyxbZGF0YS1wbGF5ZXJdIGg0LFtkYXRhLXBsYXllcl0gaDUsW2RhdGEtcGxheWVyXSBoNixbZGF0YS1wbGF5ZXJdIGhlYWRlcixbZGF0YS1wbGF5ZXJdIGhncm91cCxbZGF0YS1wbGF5ZXJdIGksW2RhdGEtcGxheWVyXSBpZnJhbWUsW2RhdGEtcGxheWVyXSBpbWcsW2RhdGEtcGxheWVyXSBpbnMsW2RhdGEtcGxheWVyXSBrYmQsW2RhdGEtcGxheWVyXSBsYWJlbCxbZGF0YS1wbGF5ZXJdIGxlZ2VuZCxbZGF0YS1wbGF5ZXJdIGxpLFtkYXRhLXBsYXllcl0gbWFyayxbZGF0YS1wbGF5ZXJdIG1lbnUsW2RhdGEtcGxheWVyXSBuYXYsW2RhdGEtcGxheWVyXSBvYmplY3QsW2RhdGEtcGxheWVyXSBvbCxbZGF0YS1wbGF5ZXJdIG91dHB1dCxbZGF0YS1wbGF5ZXJdIHAsW2RhdGEtcGxheWVyXSBwcmUsW2RhdGEtcGxheWVyXSBxLFtkYXRhLXBsYXllcl0gcnVieSxbZGF0YS1wbGF5ZXJdIHMsW2RhdGEtcGxheWVyXSBzYW1wLFtkYXRhLXBsYXllcl0gc2VjdGlvbixbZGF0YS1wbGF5ZXJdIHNtYWxsLFtkYXRhLXBsYXllcl0gc3BhbixbZGF0YS1wbGF5ZXJdIHN0cmlrZSxbZGF0YS1wbGF5ZXJdIHN0cm9uZyxbZGF0YS1wbGF5ZXJdIHN1YixbZGF0YS1wbGF5ZXJdIHN1bW1hcnksW2RhdGEtcGxheWVyXSBzdXAsW2RhdGEtcGxheWVyXSB0YWJsZSxbZGF0YS1wbGF5ZXJdIHRib2R5LFtkYXRhLXBsYXllcl0gdGQsW2RhdGEtcGxheWVyXSB0Zm9vdCxbZGF0YS1wbGF5ZXJdIHRoLFtkYXRhLXBsYXllcl0gdGhlYWQsW2RhdGEtcGxheWVyXSB0aW1lLFtkYXRhLXBsYXllcl0gdHIsW2RhdGEtcGxheWVyXSB0dCxbZGF0YS1wbGF5ZXJdIHUsW2RhdGEtcGxheWVyXSB1bCxbZGF0YS1wbGF5ZXJdIHZhcixbZGF0YS1wbGF5ZXJdIHZpZGVve21hcmdpbjowO3BhZGRpbmc6MDtib3JkZXI6MDtmb250OmluaGVyaXQ7Zm9udC1zaXplOjEwMCU7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9W2RhdGEtcGxheWVyXSB0YWJsZXtib3JkZXItY29sbGFwc2U6Y29sbGFwc2U7Ym9yZGVyLXNwYWNpbmc6MH1bZGF0YS1wbGF5ZXJdIGNhcHRpb24sW2RhdGEtcGxheWVyXSB0ZCxbZGF0YS1wbGF5ZXJdIHRoe3RleHQtYWxpZ246bGVmdDtmb250LXdlaWdodDo0MDA7dmVydGljYWwtYWxpZ246bWlkZGxlfVtkYXRhLXBsYXllcl0gYmxvY2txdW90ZSxbZGF0YS1wbGF5ZXJdIHF7cXVvdGVzOm5vbmV9W2RhdGEtcGxheWVyXSBibG9ja3F1b3RlOmFmdGVyLFtkYXRhLXBsYXllcl0gYmxvY2txdW90ZTpiZWZvcmUsW2RhdGEtcGxheWVyXSBxOmFmdGVyLFtkYXRhLXBsYXllcl0gcTpiZWZvcmV7Y29udGVudDpcIlwiO2NvbnRlbnQ6bm9uZX1bZGF0YS1wbGF5ZXJdIGEgaW1ne2JvcmRlcjpub25lfVtkYXRhLXBsYXllcl06Zm9jdXN7b3V0bGluZTowfVtkYXRhLXBsYXllcl0gKnttYXgtd2lkdGg6aW5pdGlhbDtib3gtc2l6aW5nOmluaGVyaXQ7ZmxvYXQ6aW5pdGlhbH1bZGF0YS1wbGF5ZXJdLmZ1bGxzY3JlZW57d2lkdGg6MTAwJSFpbXBvcnRhbnQ7aGVpZ2h0OjEwMCUhaW1wb3J0YW50fVtkYXRhLXBsYXllcl0ubm9jdXJzb3J7Y3Vyc29yOm5vbmV9LmNsYXBwci1zdHlsZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fUBtZWRpYSBzY3JlZW57W2RhdGEtcGxheWVyXXtvcGFjaXR5Oi45OX19JywnbWVkaWFfY29udHJvbCc6ICdAZm9udC1mYWNle2ZvbnQtZmFtaWx5OlBsYXllcjtzcmM6dXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLmVvdFwiKTtzcmM6dXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLmVvdD8jaWVmaXhcIikgZm9ybWF0KFwiZW1iZWRkZWQtb3BlbnR5cGVcIiksdXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLnR0ZlwiKSBmb3JtYXQoXCJ0cnVldHlwZVwiKSx1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuc3ZnI3BsYXllclwiKSBmb3JtYXQoXCJzdmdcIil9Lm1lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uey13ZWJraXQtdHJhbnNpdGlvbjpub25lIWltcG9ydGFudDstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6MHM7LW1vei10cmFuc2l0aW9uOm5vbmUhaW1wb3J0YW50Oy1vLXRyYW5zaXRpb246bm9uZSFpbXBvcnRhbnQ7dHJhbnNpdGlvbjpub25lIWltcG9ydGFudH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xde3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7ei1pbmRleDo5OTk5O3BvaW50ZXItZXZlbnRzOm5vbmV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS5kcmFnZ2luZ3twb2ludGVyLWV2ZW50czphdXRvO2N1cnNvcjotd2Via2l0LWdyYWJiaW5nIWltcG9ydGFudDtjdXJzb3I6Z3JhYmJpbmchaW1wb3J0YW50fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0uZHJhZ2dpbmcgKntjdXJzb3I6LXdlYmtpdC1ncmFiYmluZyFpbXBvcnRhbnQ7Y3Vyc29yOmdyYWJiaW5nIWltcG9ydGFudH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWJhY2tncm91bmRbZGF0YS1iYWNrZ3JvdW5kXXtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6NDAlO3dpZHRoOjEwMCU7Ym90dG9tOjA7YmFja2dyb3VuZC1pbWFnZTotb3dnKGxpbmVhci1ncmFkaWVudChyZ2JhKDAsMCwwLDApLHJnYmEoMCwwLDAsLjkpKSk7YmFja2dyb3VuZC1pbWFnZTotd2Via2l0KGxpbmVhci1ncmFkaWVudChyZ2JhKDAsMCwwLDApLHJnYmEoMCwwLDAsLjkpKSk7YmFja2dyb3VuZC1pbWFnZTotbW96KGxpbmVhci1ncmFkaWVudChyZ2JhKDAsMCwwLDApLHJnYmEoMCwwLDAsLjkpKSk7YmFja2dyb3VuZC1pbWFnZTotbyhsaW5lYXItZ3JhZGllbnQocmdiYSgwLDAsMCwwKSxyZ2JhKDAsMCwwLC45KSkpO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHJnYmEoMCwwLDAsMCkscmdiYSgwLDAsMCwuOSkpOy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC42czstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjZzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246b3BhY2l0eSAuNnMgZWFzZS1vdXQ7dHJhbnNpdGlvbjpvcGFjaXR5IC42cyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWljb257Zm9udC1mYW1pbHk6UGxheWVyO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXN0eWxlOm5vcm1hbDtmb250LXNpemU6MjZweDtsaW5lLWhlaWdodDozMnB4O2xldHRlci1zcGFjaW5nOjA7c3BlYWs6bm9uZTtjb2xvcjojZmZmO29wYWNpdHk6LjU7dmVydGljYWwtYWxpZ246bWlkZGxlO3RleHQtYWxpZ246bGVmdDstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZTstbW96LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlOy1vLXRyYW5zaXRpb246YWxsIC4xcyBlYXNlO3RyYW5zaXRpb246YWxsIC4xcyBlYXNlfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtaWNvbjpob3Zlcntjb2xvcjojZmZmO29wYWNpdHk6Ljc1O3RleHQtc2hhZG93OnJnYmEoMjU1LDI1NSwyNTUsLjgpIDAgMCA1cHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS5tZWRpYS1jb250cm9sLWhpZGUgLm1lZGlhLWNvbnRyb2wtYmFja2dyb3VuZFtkYXRhLWJhY2tncm91bmRde29wYWNpdHk6MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLm1lZGlhLWNvbnRyb2wtaGlkZSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXXtib3R0b206LTUwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS5tZWRpYS1jb250cm9sLWhpZGUgLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLXNjcnViYmVyW2RhdGEtc2Vla2Jhcl17b3BhY2l0eTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc117cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjdweDt3aWR0aDoxMDAlO2hlaWdodDozMnB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtwb2ludGVyLWV2ZW50czphdXRvOy13ZWJraXQtdHJhbnNpdGlvbjpib3R0b20gLjRzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246Ym90dG9tIC40cyBlYXNlLW91dDstby10cmFuc2l0aW9uOmJvdHRvbSAuNHMgZWFzZS1vdXQ7dHJhbnNpdGlvbjpib3R0b20gLjRzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtbGVmdC1wYW5lbFtkYXRhLW1lZGlhLWNvbnRyb2xde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6NHB4O2hlaWdodDoxMDAlfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtY2VudGVyLXBhbmVsW2RhdGEtbWVkaWEtY29udHJvbF17aGVpZ2h0OjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7bGluZS1oZWlnaHQ6MzJweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLXJpZ2h0LXBhbmVsW2RhdGEtbWVkaWEtY29udHJvbF17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6NHB4O2hlaWdodDoxMDAlfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9ue2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjA7bWFyZ2luOjAgNnB4O3BhZGRpbmc6MDtjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9ja30ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbjpmb2N1c3tvdXRsaW5lOjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5XXtmbG9hdDpsZWZ0O2hlaWdodDoxMDAlO2ZvbnQtc2l6ZToyMHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheV06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGF1c2Vde2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjIwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wYXVzZV06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMlwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtc3RvcF17ZmxvYXQ6bGVmdDtoZWlnaHQ6MTAwJTtmb250LXNpemU6MjBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXN0b3BdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDNcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWZ1bGxzY3JlZW5de2Zsb2F0OnJpZ2h0O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjA7aGVpZ2h0OjEwMCV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1mdWxsc2NyZWVuXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDA2XCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1mdWxsc2NyZWVuXS5zaHJpbms6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwN1wifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXXtjdXJzb3I6ZGVmYXVsdDtmbG9hdDpyaWdodDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjowO2hlaWdodDoxMDAlO29wYWNpdHk6MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWhkLWluZGljYXRvcl06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwOFwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXS5lbmFibGVke29wYWNpdHk6MX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWhkLWluZGljYXRvcl0uZW5hYmxlZDpob3ZlcntvcGFjaXR5OjE7dGV4dC1zaGFkb3c6bm9uZX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlwYXVzZV17ZmxvYXQ6bGVmdDtoZWlnaHQ6MTAwJTtmb250LXNpemU6MjBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlwYXVzZV06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwMVwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXBhdXNlXS5wbGF5aW5nOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDJcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlwYXVzZV0ucGF1c2VkOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlzdG9wXXtmbG9hdDpsZWZ0O2hlaWdodDoxMDAlO2ZvbnQtc2l6ZToyMHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3BdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlzdG9wXS5wbGF5aW5nOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDNcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlzdG9wXS5zdG9wcGVkOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLWR1cmF0aW9uXSwubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLXBvc2l0aW9uXXtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LXNpemU6MTBweDtjb2xvcjojZmZmO2N1cnNvcjpkZWZhdWx0O2xpbmUtaGVpZ2h0OjMycHg7cG9zaXRpb246cmVsYXRpdmV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1wb3NpdGlvbl17bWFyZ2luLWxlZnQ6NnB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtZHVyYXRpb25de2NvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjUpO21hcmdpbi1yaWdodDo2cHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1kdXJhdGlvbl06YmVmb3Jle2NvbnRlbnQ6XCJ8XCI7bWFyZ2luOjAgM3B4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTIwcHg7bGVmdDowO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt3aWR0aDoxMDAlO2hlaWdodDoyNXB4O2N1cnNvcjpwb2ludGVyfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXXt3aWR0aDoxMDAlO2hlaWdodDoxcHg7cG9zaXRpb246cmVsYXRpdmU7dG9wOjEycHg7YmFja2dyb3VuZC1jb2xvcjojNjY2fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWZpbGwtMVtkYXRhLXNlZWtiYXJde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDowO2hlaWdodDoxMDAlO2JhY2tncm91bmQtY29sb3I6I2MyYzJjMjstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0O3RyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1maWxsLTJbZGF0YS1zZWVrYmFyXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MDtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiMwMDVhZmY7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dDt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItaG92ZXJbZGF0YS1zZWVrYmFyXXtvcGFjaXR5OjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOi0zcHg7d2lkdGg6NXB4O2hlaWdodDo3cHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC41KTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2U7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2U7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlO3RyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl06aG92ZXIgLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1ob3ZlcltkYXRhLXNlZWtiYXJde29wYWNpdHk6MX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0uc2Vlay1kaXNhYmxlZHtjdXJzb3I6ZGVmYXVsdH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0uc2Vlay1kaXNhYmxlZDpob3ZlciAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWhvdmVyW2RhdGEtc2Vla2Jhcl17b3BhY2l0eTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLXNjcnViYmVyW2RhdGEtc2Vla2Jhcl17cG9zaXRpb246YWJzb2x1dGU7dG9wOjJweDtsZWZ0OjA7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dDt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItc2NydWJiZXJbZGF0YS1zZWVrYmFyXSAuYmFyLXNjcnViYmVyLWljb25bZGF0YS1zZWVrYmFyXXtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjZweDt0b3A6NnB4O3dpZHRoOjhweDtoZWlnaHQ6OHB4O2JvcmRlci1yYWRpdXM6MTBweDtib3gtc2hhZG93OjAgMCAwIDZweCByZ2JhKDI1NSwyNTUsMjU1LC4yKTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV17ZmxvYXQ6cmlnaHQ7ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjMycHg7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luOjAgNnB4O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXXtmbG9hdDpsZWZ0O2JvdHRvbTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV17YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MDtib3gtc2l6aW5nOmNvbnRlbnQtYm94O3dpZHRoOjE2cHg7aGVpZ2h0OjMycHg7bWFyZ2luLXJpZ2h0OjZweDtvcGFjaXR5OjF9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXTpob3ZlcntvcGFjaXR5OjF9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDA0XCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXS5tdXRlZHtvcGFjaXR5Oi41fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV0ubXV0ZWQ6aG92ZXJ7b3BhY2l0eTouN30ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdLm11dGVkOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDVcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV17ZmxvYXQ6bGVmdDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6NnB4O3dpZHRoOjQycHg7aGVpZ2h0OjE4cHg7cGFkZGluZzozcHggMDtvdmVyZmxvdzpoaWRkZW47LXdlYmtpdC10cmFuc2l0aW9uOndpZHRoIC4yczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOndpZHRoIC4ycyBlYXNlLW91dDstby10cmFuc2l0aW9uOndpZHRoIC4ycyBlYXNlLW91dDt0cmFuc2l0aW9uOndpZHRoIC4ycyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV17ZmxvYXQ6bGVmdDt3aWR0aDo0cHg7cGFkZGluZy1sZWZ0OjJweDtoZWlnaHQ6MTJweDtvcGFjaXR5Oi41Oy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LW1vei1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstbXMtYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LW8tYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7Ym94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LXdlYmtpdC10cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4yczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOi1tb3otdHJhbnNmb3JtIC4ycyBlYXNlLW91dDstby10cmFuc2l0aW9uOi1vLXRyYW5zZm9ybSAuMnMgZWFzZS1vdXQ7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuc2VnbWVudGVkLWJhci1lbGVtZW50W2RhdGEtdm9sdW1lXS5maWxsey13ZWJraXQtYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LW1vei1ib3gtc2hhZG93Omluc2V0IDJweCAwIDAgI2ZmZjstbXMtYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LW8tYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7Ym94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7b3BhY2l0eToxfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuc2VnbWVudGVkLWJhci1lbGVtZW50W2RhdGEtdm9sdW1lXTpudGgtb2YtdHlwZSgxKXtwYWRkaW5nLWxlZnQ6MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV06aG92ZXJ7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKDEuNSk7LW1vei10cmFuc2Zvcm06c2NhbGVZKDEuNSk7LW1zLXRyYW5zZm9ybTpzY2FsZVkoMS41KTstby10cmFuc2Zvcm06c2NhbGVZKDEuNSk7dHJhbnNmb3JtOnNjYWxlWSgxLjUpfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0udzMyMCAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdLnZvbHVtZS1iYXItaGlkZXtoZWlnaHQ6MTJweDt0b3A6OXB4O3BhZGRpbmc6MDt3aWR0aDowfScsJ3NlZWtfdGltZSc6ICcuc2Vlay10aW1lW2RhdGEtc2Vlay10aW1lXXtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDphdXRvO2hlaWdodDoyMHB4O2xpbmUtaGVpZ2h0OjIwcHg7Ym90dG9tOjU1cHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDIsMiwyLC41KTt6LWluZGV4Ojk5OTk7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlOy1vLXRyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZTt0cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2V9LnNlZWstdGltZVtkYXRhLXNlZWstdGltZV0uaGlkZGVuW2RhdGEtc2Vlay10aW1lXXtvcGFjaXR5OjB9LnNlZWstdGltZVtkYXRhLXNlZWstdGltZV0gc3BhbltkYXRhLXNlZWstdGltZV17cG9zaXRpb246cmVsYXRpdmU7Y29sb3I6I2ZmZjtmb250LXNpemU6MTBweDtwYWRkaW5nLWxlZnQ6N3B4O3BhZGRpbmctcmlnaHQ6N3B4fScsJ2ZsYXNoJzogJ1tkYXRhLWZsYXNoXXtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2JhY2tncm91bmQtY29sb3I6IzAwMDtkaXNwbGF5OmJsb2NrO3BvaW50ZXItZXZlbnRzOm5vbmV9JywnaGxzJzogJ1tkYXRhLWhsc117cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpibG9jaztwb2ludGVyLWV2ZW50czpub25lO3RvcDowfScsJ2h0bWw1X3ZpZGVvJzogJ1tkYXRhLWh0bWw1LXZpZGVvXXtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2Rpc3BsYXk6YmxvY2t9JywnaHRtbF9pbWcnOiAnW2RhdGEtaHRtbC1pbWdde21heC13aWR0aDoxMDAlO21heC1oZWlnaHQ6MTAwJX0nLCdub19vcCc6ICdbZGF0YS1uby1vcF17ei1pbmRleDoxMDAwO3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXJ9W2RhdGEtbm8tb3BdIHBbZGF0YS1uby1vcC1tc2dde3Bvc2l0aW9uOmFic29sdXRlO2ZvbnQtc2l6ZToyNXB4O3RvcDo0MCU7Y29sb3I6I2ZmZn1bZGF0YS1uby1vcF0gY2FudmFzW2RhdGEtbm8tb3AtY2FudmFzXXtiYWNrZ3JvdW5kLWNvbG9yOiM3Nzc7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0nLCdkdnJfY29udHJvbHMnOiAnQGZvbnQtZmFjZXtmb250LWZhbWlseTpSb2JvdG87Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NDAwO3NyYzpsb2NhbChcIlJvYm90b1wiKSxsb2NhbChcIlJvYm90by1SZWd1bGFyXCIpLHVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9Sb2JvdG8udHRmXCIpIGZvcm1hdChcInRydWV0eXBlXCIpfS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNde2Rpc3BsYXk6aW5saW5lLWJsb2NrO2Zsb2F0OmxlZnQ7Y29sb3I6I2ZmZjtsaW5lLWhlaWdodDozMnB4O2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OjcwMDttYXJnaW4tbGVmdDo2cHh9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtaW5mb3tjdXJzb3I6ZGVmYXVsdDtmb250LWZhbWlseTpSb2JvdG8sXCJPcGVuIFNhbnNcIixBcmlhbCxzYW5zLXNlcmlmfS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm86YmVmb3Jle2NvbnRlbnQ6XCJcIjtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo3cHg7aGVpZ2h0OjdweDtib3JkZXItcmFkaXVzOjMuNXB4O21hcmdpbi1yaWdodDozLjVweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjAxMDF9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtaW5mby5kaXNhYmxlZHtvcGFjaXR5Oi4zfS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm8uZGlzYWJsZWQ6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6I2ZmZn0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1idXR0b257Y3Vyc29yOnBvaW50ZXI7b3V0bGluZTowO2Rpc3BsYXk6bm9uZTtib3JkZXI6MDtjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7aGVpZ2h0OjMycHg7cGFkZGluZzowO29wYWNpdHk6Ljc7Zm9udC1mYW1pbHk6Um9ib3RvLFwiT3BlbiBTYW5zXCIsQXJpYWwsc2Fucy1zZXJpZjstd2Via2l0LXRyYW5zaXRpb246YWxsIC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZTstbW96LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlOy1vLXRyYW5zaXRpb246YWxsIC4xcyBlYXNlO3RyYW5zaXRpb246YWxsIC4xcyBlYXNlfS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWJ1dHRvbjpiZWZvcmV7Y29udGVudDpcIlwiO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjdweDtoZWlnaHQ6N3B4O2JvcmRlci1yYWRpdXM6My41cHg7bWFyZ2luLXJpZ2h0OjMuNXB4O2JhY2tncm91bmQtY29sb3I6I2ZmZn0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1idXR0b246aG92ZXJ7b3BhY2l0eToxO3RleHQtc2hhZG93OnJnYmEoMjU1LDI1NSwyNTUsLjc1KSAwIDAgNXB4fS5kdnIgLmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtaW5mb3tkaXNwbGF5Om5vbmV9LmR2ciAuZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1idXR0b257ZGlzcGxheTpibG9ja30uZHZyLm1lZGlhLWNvbnRyb2wubGl2ZVtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1maWxsLTJbZGF0YS1zZWVrYmFyXXtiYWNrZ3JvdW5kLWNvbG9yOiMwMDVhZmZ9Lm1lZGlhLWNvbnRyb2wubGl2ZVtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1maWxsLTJbZGF0YS1zZWVrYmFyXXtiYWNrZ3JvdW5kLWNvbG9yOiNmZjAxMDF9LnNlZWstdGltZVtkYXRhLXNlZWstdGltZV0gc3BhbltkYXRhLWR1cmF0aW9uXXtwb3NpdGlvbjpyZWxhdGl2ZTtjb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC41KTtmb250LXNpemU6MTBweDtwYWRkaW5nLXJpZ2h0OjdweH0uc2Vlay10aW1lW2RhdGEtc2Vlay10aW1lXSBzcGFuW2RhdGEtZHVyYXRpb25dOmJlZm9yZXtjb250ZW50OlwifFwiO21hcmdpbi1yaWdodDo3cHh9JywncG9zdGVyJzogJ0Bmb250LWZhY2V7Zm9udC1mYW1pbHk6UGxheWVyO3NyYzp1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuZW90XCIpO3NyYzp1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuZW90PyNpZWZpeFwiKSBmb3JtYXQoXCJlbWJlZGRlZC1vcGVudHlwZVwiKSx1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIudHRmXCIpIGZvcm1hdChcInRydWV0eXBlXCIpLHVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci5zdmcjcGxheWVyXCIpIGZvcm1hdChcInN2Z1wiKX0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl17Y3Vyc29yOnBvaW50ZXI7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTt6LWluZGV4Ojk5ODt0b3A6MH0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl0gLnBvc3Rlci1iYWNrZ3JvdW5kW2RhdGEtcG9zdGVyXXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtc2l6ZTpjb3ZlcjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1wb3NpdGlvbjo1MCUgNTAlfS5wbGF5ZXItcG9zdGVyW2RhdGEtcG9zdGVyXSAucGxheS13cmFwcGVyW2RhdGEtcG9zdGVyXXtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2hlaWdodDoyNSU7bGluZS1oZWlnaHQ6MTAwJTtmb250LXNpemU6MjUlO3RvcDo1MCU7dGV4dC1hbGlnbjpjZW50ZXJ9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJdIC5wbGF5LXdyYXBwZXJbZGF0YS1wb3N0ZXJdIC5wb3N0ZXItaWNvbltkYXRhLXBvc3Rlcl17Zm9udC1mYW1pbHk6UGxheWVyO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXN0eWxlOm5vcm1hbDtsaW5lLWhlaWdodDoxO2xldHRlci1zcGFjaW5nOjA7c3BlYWs6bm9uZTtjb2xvcjojZmZmO29wYWNpdHk6Ljc1Oy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlOy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IHRleHQtc2hhZG93Oy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTouMXM7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgdGV4dC1zaGFkb3cgLjFzOy1vLXRyYW5zaXRpb246b3BhY2l0eSB0ZXh0LXNoYWRvdyAuMXM7dHJhbnNpdGlvbjpvcGFjaXR5IHRleHQtc2hhZG93IC4xcyBlYXNlfS5wbGF5ZXItcG9zdGVyW2RhdGEtcG9zdGVyXSAucGxheS13cmFwcGVyW2RhdGEtcG9zdGVyXSAucG9zdGVyLWljb25bZGF0YS1wb3N0ZXJdLnBsYXlbZGF0YS1wb3N0ZXJdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl0gLnBsYXktd3JhcHBlcltkYXRhLXBvc3Rlcl0gLnBvc3Rlci1pY29uW2RhdGEtcG9zdGVyXTpob3ZlcntvcGFjaXR5OjE7dGV4dC1zaGFkb3c6cmdiYSgyNTUsMjU1LDI1NSwuOCkgMCAwIDE1cHh9Jywnc3Bpbm5lcl90aHJlZV9ib3VuY2UnOiAnLnNwaW5uZXItdGhyZWUtYm91bmNlW2RhdGEtc3Bpbm5lcl17cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luOjAgYXV0bzt3aWR0aDo3MHB4O3RleHQtYWxpZ246Y2VudGVyO3otaW5kZXg6OTk5O3RvcDo0NyU7bGVmdDowO3JpZ2h0OjB9LnNwaW5uZXItdGhyZWUtYm91bmNlW2RhdGEtc3Bpbm5lcl0+ZGl2e3dpZHRoOjE4cHg7aGVpZ2h0OjE4cHg7YmFja2dyb3VuZC1jb2xvcjojRkZGO2JvcmRlci1yYWRpdXM6MTAwJTtkaXNwbGF5OmlubGluZS1ibG9jazstd2Via2l0LWFuaW1hdGlvbjpib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy1tb3otYW5pbWF0aW9uOmJvdW5jZWRlbGF5IDEuNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7LW1zLWFuaW1hdGlvbjpib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy1vLWFuaW1hdGlvbjpib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0O2FuaW1hdGlvbjpib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy13ZWJraXQtYW5pbWF0aW9uLWZpbGwtbW9kZTpib3RoOy1tb3otYW5pbWF0aW9uLWZpbGwtbW9kZTpib3RoOy1tcy1hbmltYXRpb24tZmlsbC1tb2RlOmJvdGg7LW8tYW5pbWF0aW9uLWZpbGwtbW9kZTpib3RoO2FuaW1hdGlvbi1maWxsLW1vZGU6Ym90aH0uc3Bpbm5lci10aHJlZS1ib3VuY2VbZGF0YS1zcGlubmVyXSBbZGF0YS1ib3VuY2UxXSwuc3Bpbm5lci10aHJlZS1ib3VuY2VbZGF0YS1zcGlubmVyXSBbZGF0YS1ib3VuY2UyXXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTotLjMyczstbW96LWFuaW1hdGlvbi1kZWxheTotLjMyczstbXMtYW5pbWF0aW9uLWRlbGF5Oi0uMzJzOy1vLWFuaW1hdGlvbi1kZWxheTotLjMyczthbmltYXRpb24tZGVsYXk6LS4zMnN9QC1tb3ota2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley1tb3otdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX00MCV7LW1vei10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpfX1ALXdlYmtpdC1rZXlmcmFtZXMgYm91bmNlZGVsYXl7MCUsMTAwJSw4MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfTQwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fUAtby1rZXlmcmFtZXMgYm91bmNlZGVsYXl7MCUsMTAwJSw4MCV7LW8tdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX00MCV7LW8tdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19QC1tcy1rZXlmcmFtZXMgYm91bmNlZGVsYXl7MCUsMTAwJSw4MCV7LW1zLXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9NDAley1tcy10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpfX1Aa2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAle3RyYW5zZm9ybTpzY2FsZSgwKX00MCV7dHJhbnNmb3JtOnNjYWxlKDEpfX0nLCd3YXRlcm1hcmsnOiAnW2RhdGEtd2F0ZXJtYXJrXXtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW46MTAwcHggYXV0byAwO3dpZHRoOjcwcHg7dGV4dC1hbGlnbjpjZW50ZXI7ei1pbmRleDoxMH1bZGF0YS13YXRlcm1hcmstYm90dG9tLWxlZnRde2JvdHRvbToxMHB4O2xlZnQ6MTBweH1bZGF0YS13YXRlcm1hcmstYm90dG9tLXJpZ2h0XXtib3R0b206MTBweDtyaWdodDo0MnB4fVtkYXRhLXdhdGVybWFyay10b3AtbGVmdF17dG9wOi05NXB4O2xlZnQ6MTBweH1bZGF0YS13YXRlcm1hcmstdG9wLXJpZ2h0XXt0b3A6LTk1cHg7cmlnaHQ6MzdweH0nLH19OyIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlJyk7XG52YXIgSlNUID0gcmVxdWlyZSgnLi9qc3QnKTtcblxudmFyIFN0eWxlciA9IHtcbiAgZ2V0U3R5bGVGb3I6IGZ1bmN0aW9uKG5hbWUsIG9wdGlvbnM9e2Jhc2VVcmw6ICcnfSkge1xuICAgIHJldHVybiAkKCc8c3R5bGUgY2xhc3M9XCJjbGFwcHItc3R5bGVcIj48L3N0eWxlPicpLmh0bWwodGVtcGxhdGUoSlNULkNTU1tuYW1lXSkob3B0aW9ucykpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlcjtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guYXNzaWduJylcbnZhciBCcm93c2VyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9icm93c2VyJylcblxudmFyIGV4dGVuZCA9IGZ1bmN0aW9uKHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzXG4gIHZhciBjaGlsZFxuXG4gIGlmIChwcm90b1Byb3BzICYmIHByb3RvUHJvcHMuY29uc3RydWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgIGNoaWxkID0gcHJvdG9Qcm9wcy5jb25zdHJ1Y3RvclxuICB9IGVsc2Uge1xuICAgIGNoaWxkID0gZnVuY3Rpb24oKXsgcmV0dXJuIHBhcmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9XG4gIH1cblxuICBhc3NpZ24oY2hpbGQsIHBhcmVudCwgc3RhdGljUHJvcHMpXG5cbiAgdmFyIFN1cnJvZ2F0ZSA9IGZ1bmN0aW9uKCl7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfVxuICBTdXJyb2dhdGUucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZVxuICBjaGlsZC5wcm90b3R5cGUgPSBuZXcgU3Vycm9nYXRlKClcblxuICBpZiAocHJvdG9Qcm9wcykgYXNzaWduKGNoaWxkLnByb3RvdHlwZSwgcHJvdG9Qcm9wcylcblxuICBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlXG5cbiAgY2hpbGQuc3VwZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHBhcmVudC5wcm90b3R5cGVbbmFtZV1cbiAgfVxuXG4gIGNoaWxkLnByb3RvdHlwZS5nZXRDbGFzcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjaGlsZFxuICB9XG5cbiAgcmV0dXJuIGNoaWxkXG59XG5cbnZhciBmb3JtYXRUaW1lID0gZnVuY3Rpb24odGltZSkge1xuICAgIGlmICghaXNGaW5pdGUodGltZSkpIHtcbiAgICAgIHJldHVybiBcIi0tOi0tXCJcbiAgICB9XG4gICAgdGltZSA9IHRpbWUgKiAxMDAwXG4gICAgdGltZSA9IHBhcnNlSW50KHRpbWUvMTAwMClcbiAgICB2YXIgc2Vjb25kcyA9IHRpbWUgJSA2MFxuICAgIHRpbWUgPSBwYXJzZUludCh0aW1lLzYwKVxuICAgIHZhciBtaW51dGVzID0gdGltZSAlIDYwXG4gICAgdGltZSA9IHBhcnNlSW50KHRpbWUvNjApXG4gICAgdmFyIGhvdXJzID0gdGltZSAlIDI0XG4gICAgdmFyIG91dCA9IFwiXCJcbiAgICBpZiAoaG91cnMgJiYgaG91cnMgPiAwKSBvdXQgKz0gKFwiMFwiICsgaG91cnMpLnNsaWNlKC0yKSArIFwiOlwiXG4gICAgb3V0ICs9IChcIjBcIiArIG1pbnV0ZXMpLnNsaWNlKC0yKSArIFwiOlwiXG4gICAgb3V0ICs9IChcIjBcIiArIHNlY29uZHMpLnNsaWNlKC0yKVxuICAgIHJldHVybiBvdXQudHJpbSgpXG59XG5cbnZhciBGdWxsc2NyZWVuID0ge1xuICBpc0Z1bGxzY3JlZW46IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICBkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fFxuICAgICAgZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVuIHx8XG4gICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuIHx8XG4gICAgICAhIWRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnRcbiAgICApXG4gIH0sXG4gIHJlcXVlc3RGdWxsc2NyZWVuOiBmdW5jdGlvbihlbCkge1xuICAgIGlmKGVsLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICBlbC5yZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmKGVsLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICBlbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmKGVsLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICBlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpXG4gICAgfSBlbHNlIGlmKGVsLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGVsLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoZWwucXVlcnlTZWxlY3RvciAmJiBlbC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIikud2Via2l0RW50ZXJGdWxsU2NyZWVuKSB7XG4gICAgICBlbC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIikud2Via2l0RW50ZXJGdWxsU2NyZWVuKClcbiAgICB9XG4gIH0sXG4gIGNhbmNlbEZ1bGxzY3JlZW46IGZ1bmN0aW9uKCkge1xuICAgIGlmKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmKGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4oKVxuICAgIH0gZWxzZSBpZihkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZihkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKClcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xuICAgICAgZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpXG4gICAgfVxuICB9XG59XG5cbmNsYXNzIENvbmZpZyB7XG5cbiAgc3RhdGljIF9kZWZhdWx0Q29uZmlnKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2b2x1bWU6IHtcbiAgICAgICAgdmFsdWU6IDEwMCxcbiAgICAgICAgcGFyc2U6IHBhcnNlSW50XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIF9kZWZhdWx0VmFsdWVGb3Ioa2V5KSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0Q29uZmlnKClba2V5XVsncGFyc2UnXSh0aGlzLl9kZWZhdWx0Q29uZmlnKClba2V5XVsndmFsdWUnXSlcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgX2NyZWF0ZV9rZXlzcGFjZShrZXkpe1xuICAgIHJldHVybiAnY2xhcHByLicgKyBkb2N1bWVudC5kb21haW4gKyAnLicgKyBrZXlcbiAgfVxuXG4gIHN0YXRpYyByZXN0b3JlKGtleSkge1xuICAgIGlmIChCcm93c2VyLmhhc0xvY2Fsc3RvcmFnZSAmJiBsb2NhbFN0b3JhZ2VbdGhpcy5fY3JlYXRlX2tleXNwYWNlKGtleSldKXtcbiAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0Q29uZmlnKClba2V5XVsncGFyc2UnXShsb2NhbFN0b3JhZ2VbdGhpcy5fY3JlYXRlX2tleXNwYWNlKGtleSldKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFZhbHVlRm9yKGtleSlcbiAgfVxuXG4gIHN0YXRpYyBwZXJzaXN0KGtleSwgdmFsdWUpIHtcbiAgICBpZiAoQnJvd3Nlci5oYXNMb2NhbHN0b3JhZ2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZVt0aGlzLl9jcmVhdGVfa2V5c3BhY2Uoa2V5KV0gPSB2YWx1ZVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG52YXIgc2Vla1N0cmluZ1RvU2Vjb25kcyA9IGZ1bmN0aW9uKHVybCkge1xuICB2YXIgZWxlbWVudHMgPSAodXJsLm1hdGNoKC90PShbMC05XSpoKT8oWzAtOV0qbSk/KFswLTldKnMpPy8pIHx8IFtdKS5zcGxpY2UoMSlcbiAgcmV0dXJuICghIWVsZW1lbnRzLmxlbmd0aCk/IGVsZW1lbnRzLm1hcChmdW5jdGlvbiAoZWwpIHtcbiAgICBpZiAoZWwpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHBhcnNlSW50KGVsLnNsaWNlKDAsMikpIHx8IDBcbiAgICAgIHN3aXRjaCAoZWxbZWwubGVuZ3RoLTFdKSB7XG4gICAgICAgIGNhc2UgJ2gnOiB2YWx1ZSA9IHZhbHVlICogMzYwMDsgYnJlYWtcbiAgICAgICAgY2FzZSAnbSc6IHZhbHVlID0gdmFsdWUgKiA2MDsgYnJlYWtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9KS5yZWR1Y2UoZnVuY3Rpb24gKGEsYikgeyByZXR1cm4gYStiOyB9KTogMFxufVxuXG52YXIgaWRzQ291bnRlciA9IHt9XG5cbnZhciB1bmlxdWVJZCA9IGZ1bmN0aW9uKHByZWZpeCkge1xuICBpZHNDb3VudGVyW3ByZWZpeF0gfHwgKGlkc0NvdW50ZXJbcHJlZml4XSA9IDApXG4gIHZhciBpZCA9ICsraWRzQ291bnRlcltwcmVmaXhdXG4gIHJldHVybiBwcmVmaXggKyBpZFxufVxuXG52YXIgaXNOdW1iZXIgPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgLSBwYXJzZUZsb2F0KHZhbHVlKSArIDEgPj0gMFxufVxuXG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZuKSA9PiB3aW5kb3cuc2V0VGltZW91dChmbiwgMTAwMC82MClcblxudmFyIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dFxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIGZvcm1hdFRpbWU6IGZvcm1hdFRpbWUsXG4gIEZ1bGxzY3JlZW46IEZ1bGxzY3JlZW4sXG4gIENvbmZpZzogQ29uZmlnLFxuICBzZWVrU3RyaW5nVG9TZWNvbmRzOiBzZWVrU3RyaW5nVG9TZWNvbmRzLFxuICB1bmlxdWVJZDogdW5pcXVlSWQsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lOiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsXG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lOiBjYW5jZWxBbmltYXRpb25GcmFtZVxufVxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuLyoqXG4gKiBDb250YWluZXIgaXMgcmVzcG9uc2libGUgZm9yIHRoZSB2aWRlbyByZW5kZXJpbmcgYW5kIHN0YXRlXG4gKi9cblxudmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91aV9vYmplY3QnKTtcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcbnZhciBmaW5kID0gcmVxdWlyZSgnbG9kYXNoLmZpbmQnKVxuXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ0NvbnRhaW5lcicgfVxuICBnZXQgYXR0cmlidXRlcygpIHsgcmV0dXJuIHsgY2xhc3M6ICdjb250YWluZXInLCAnZGF0YS1jb250YWluZXInOiAnJyB9IH1cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsaWNrJzogJ2NsaWNrZWQnLFxuICAgICAgJ2RibGNsaWNrJzogJ2RibENsaWNrZWQnLFxuICAgICAgJ2RvdWJsZVRhcCc6ICdkYmxDbGlja2VkJyxcbiAgICAgICdtb3VzZWVudGVyJzogJ21vdXNlRW50ZXInLFxuICAgICAgJ21vdXNlbGVhdmUnOiAnbW91c2VMZWF2ZSdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5jdXJyZW50VGltZSA9IDBcbiAgICB0aGlzLnBsYXliYWNrID0gb3B0aW9ucy5wbGF5YmFjaztcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5wbGF5YmFjay5zZXR0aW5ncztcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLm1lZGlhQ29udHJvbERpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5wbHVnaW5zID0gW3RoaXMucGxheWJhY2tdO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgdGhpcy5wcm9ncmVzcyk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy50aW1lVXBkYXRlZCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMucmVhZHkpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5idWZmZXJpbmcpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsIHRoaXMuYnVmZmVyZnVsbCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfU0VUVElOR1NVUERBVEUsIHRoaXMuc2V0dGluZ3NVcGRhdGUpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0xPQURFRE1FVEFEQVRBLCB0aGlzLmxvYWRlZE1ldGFkYXRhKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19ISUdIREVGSU5JVElPTlVQREFURSwgdGhpcy5oaWdoRGVmaW5pdGlvblVwZGF0ZSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfQklUUkFURSwgdGhpcy51cGRhdGVCaXRyYXRlKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19QTEFZQkFDS1NUQVRFLCB0aGlzLnBsYXliYWNrU3RhdGVDaGFuZ2VkKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19EVlIsIHRoaXMucGxheWJhY2tEdnJTdGF0ZUNoYW5nZWQpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX01FRElBQ09OVFJPTF9ESVNBQkxFLCB0aGlzLmRpc2FibGVNZWRpYUNvbnRyb2wpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX01FRElBQ09OVFJPTF9FTkFCTEUsIHRoaXMuZW5hYmxlTWVkaWFDb250cm9sKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19FTkRFRCwgdGhpcy5lbmRlZCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUExBWSwgdGhpcy5wbGF5aW5nKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19FUlJPUiwgdGhpcy5lcnJvcik7XG4gIH1cblxuICBwbGF5YmFja1N0YXRlQ2hhbmdlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS1NUQVRFKTtcbiAgfVxuXG4gIHBsYXliYWNrRHZyU3RhdGVDaGFuZ2VkKGR2ckluVXNlKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMucGxheWJhY2suc2V0dGluZ3NcbiAgICB0aGlzLmR2ckluVXNlID0gZHZySW5Vc2VcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCwgZHZySW5Vc2UpXG4gIH1cblxuICB1cGRhdGVCaXRyYXRlKG5ld0JpdHJhdGUpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9CSVRSQVRFLCBuZXdCaXRyYXRlKVxuICB9XG5cbiAgc3RhdHNSZXBvcnQobWV0cmljcykge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NUQVRTX1JFUE9SVCwgbWV0cmljcylcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFjay5nZXRQbGF5YmFja1R5cGUoKVxuICB9XG5cbiAgaXNEdnJFbmFibGVkKCkge1xuICAgIHJldHVybiAhIXRoaXMucGxheWJhY2suZHZyRW5hYmxlZFxuICB9XG5cbiAgaXNEdnJJblVzZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmR2ckluVXNlXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCwgdGhpcywgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnBsYXliYWNrLmRlc3Ryb3koKTtcbiAgICB0aGlzLnBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiBwbHVnaW4uZGVzdHJveSgpKVxuICAgIHRoaXMuJGVsLnJlbW92ZSgpO1xuICB9XG5cbiAgc2V0U3R5bGUoc3R5bGUpIHtcbiAgICB0aGlzLiRlbC5jc3Moc3R5bGUpO1xuICB9XG5cbiAgYW5pbWF0ZShzdHlsZSwgZHVyYXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy4kZWwuYW5pbWF0ZShzdHlsZSwgZHVyYXRpb24pLnByb21pc2UoKTtcbiAgfVxuXG4gIHJlYWR5KCkge1xuICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUkVBRFksIHRoaXMubmFtZSk7XG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWJhY2suaXNQbGF5aW5nKCk7XG4gIH1cblxuICBnZXRDdXJyZW50VGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VGltZVxuICB9XG5cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWJhY2suZ2V0RHVyYXRpb24oKTtcbiAgfVxuXG4gIGVycm9yKGVycm9yT2JqKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfRVJST1IsIHtlcnJvcjogZXJyb3JPYmosIGNvbnRhaW5lcjogdGhpc30sIHRoaXMubmFtZSk7XG4gIH1cblxuICBsb2FkZWRNZXRhZGF0YShkdXJhdGlvbikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0xPQURFRE1FVEFEQVRBLCBkdXJhdGlvbik7XG4gIH1cblxuICB0aW1lVXBkYXRlZChwb3NpdGlvbiwgZHVyYXRpb24pIHtcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gcG9zaXRpb25cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFLCBwb3NpdGlvbiwgZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgfVxuXG4gIHByb2dyZXNzKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uLCBkdXJhdGlvbikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BST0dSRVNTLCBzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbiwgZHVyYXRpb24sIHRoaXMubmFtZSk7XG4gIH1cblxuICBwbGF5aW5nKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BMQVksIHRoaXMubmFtZSk7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMucGxheWJhY2sucGxheSgpO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucGxheWJhY2suc3RvcCgpO1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSAwXG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLnBsYXliYWNrLnBhdXNlKCk7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUEFVU0UsIHRoaXMubmFtZSk7XG4gIH1cblxuICBlbmRlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcywgdGhpcy5uYW1lKTtcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gMFxuICB9XG5cbiAgY2xpY2tlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9DTElDSywgdGhpcywgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGRibENsaWNrZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfREJMQ0xJQ0ssIHRoaXMsIHRoaXMubmFtZSk7XG4gIH1cblxuICBzZXRDdXJyZW50VGltZSh0aW1lKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU0VFSywgdGltZSwgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnBsYXliYWNrLnNlZWsodGltZSk7XG4gIH1cblxuICBzZXRWb2x1bWUodmFsdWUpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9WT0xVTUUsIHZhbHVlLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucGxheWJhY2sudm9sdW1lKHZhbHVlKTtcbiAgfVxuXG4gIGZ1bGxzY3JlZW4oKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfRlVMTFNDUkVFTiwgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGJ1ZmZlcmluZygpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJJTkcsIHRoaXMubmFtZSk7XG4gIH1cblxuICBidWZmZXJmdWxsKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMubmFtZSk7XG4gIH1cblxuICBhZGRQbHVnaW4ocGx1Z2luKSB7XG4gICAgdGhpcy5wbHVnaW5zLnB1c2gocGx1Z2luKTtcbiAgfVxuXG4gIGhhc1BsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuICEhdGhpcy5nZXRQbHVnaW4obmFtZSk7XG4gIH1cblxuICBnZXRQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiBmaW5kKHRoaXMucGx1Z2lucywgKHBsdWdpbikgPT4geyByZXR1cm4gcGx1Z2luLm5hbWUgPT09IG5hbWUgfSk7XG4gIH1cblxuICBtb3VzZUVudGVyKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX01PVVNFX0VOVEVSKVxuICB9XG5cbiAgbW91c2VMZWF2ZSgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9NT1VTRV9MRUFWRSlcbiAgfVxuXG4gIHNldHRpbmdzVXBkYXRlKCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLnBsYXliYWNrLnNldHRpbmdzO1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NFVFRJTkdTVVBEQVRFKTtcbiAgfVxuXG4gIGhpZ2hEZWZpbml0aW9uVXBkYXRlKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0hJR0hERUZJTklUSU9OVVBEQVRFKTtcbiAgfVxuXG4gIGlzSGlnaERlZmluaXRpb25JblVzZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFjay5pc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKVxuICB9XG5cbiAgZGlzYWJsZU1lZGlhQ29udHJvbCgpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbERpc2FibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRElTQUJMRSk7XG4gIH1cblxuICBlbmFibGVNZWRpYUNvbnRyb2woKSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9FTkFCTEUpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcignY29udGFpbmVyJyk7XG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKTtcbiAgICB0aGlzLiRlbC5hcHBlbmQodGhpcy5wbGF5YmFjay5yZW5kZXIoKS5lbCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb250YWluZXI7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIFRoZSBDb250YWluZXJGYWN0b3J5IGlzIHJlc3BvbnNpYmxlIGZvciBtYW5hZ2UgcGxheWJhY2sgYm9vdHN0cmFwIGFuZCBjcmVhdGUgY29udGFpbmVycy5cbiAqL1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpO1xudmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2Jhc2Vfb2JqZWN0Jyk7XG52YXIgQ29udGFpbmVyID0gcmVxdWlyZSgnLi4vY29udGFpbmVyJyk7XG52YXIgJCA9IHJlcXVpcmUoJ2NsYXBwci16ZXB0bycpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJyk7XG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJyk7XG5cbmNsYXNzIENvbnRhaW5lckZhY3RvcnkgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucywgbG9hZGVyKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmxvYWRlciA9IGxvYWRlcjtcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcnMoKSB7XG4gICAgcmV0dXJuICQuRGVmZXJyZWQoKHByb21pc2UpID0+IHtcbiAgICAgIHByb21pc2UucmVzb2x2ZSh0aGlzLm9wdGlvbnMuc291cmNlcy5tYXAoKHNvdXJjZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVDb250YWluZXIoc291cmNlKTtcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRQbGF5YmFja1BsdWdpbihzb3VyY2UpIHtcbiAgICByZXR1cm4gZmluZCh0aGlzLmxvYWRlci5wbGF5YmFja1BsdWdpbnMsIChwKSA9PiB7IHJldHVybiBwLmNhblBsYXkoc291cmNlLnRvU3RyaW5nKCksIHRoaXMub3B0aW9ucy5taW1lVHlwZSkgfSlcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcihzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICBpZiAoISFzb3VyY2UubWF0Y2goL15cXC9cXC8vKSkgc291cmNlID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgc291cmNlXG4gICAgb3B0aW9ucyA9IGFzc2lnbih7fSwgb3B0aW9ucywgdGhpcy5vcHRpb25zLCB7c3JjOiBzb3VyY2UsIGF1dG9QbGF5OiAhIXRoaXMub3B0aW9ucy5hdXRvUGxheX0pXG4gICAgdmFyIHBsYXliYWNrUGx1Z2luID0gdGhpcy5maW5kUGxheWJhY2tQbHVnaW4oc291cmNlKVxuICAgIHZhciBwbGF5YmFjayA9IG5ldyBwbGF5YmFja1BsdWdpbihvcHRpb25zKVxuICAgIHZhciBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyKHtwbGF5YmFjazogcGxheWJhY2t9KVxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKVxuICAgIGRlZmVyLnByb21pc2UoY29udGFpbmVyKVxuICAgIHRoaXMuYWRkQ29udGFpbmVyUGx1Z2lucyhjb250YWluZXIsIHNvdXJjZSlcbiAgICB0aGlzLmxpc3RlblRvT25jZShjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUkVBRFksICgpID0+IGRlZmVyLnJlc29sdmUoY29udGFpbmVyKSlcbiAgICByZXR1cm4gY29udGFpbmVyXG4gIH1cblxuICBhZGRDb250YWluZXJQbHVnaW5zKGNvbnRhaW5lciwgc291cmNlKSB7XG4gICAgdGhpcy5sb2FkZXIuY29udGFpbmVyUGx1Z2lucy5mb3JFYWNoKChQbHVnaW4pID0+IHtcbiAgICAgIHZhciBvcHRpb25zID0gYXNzaWduKHRoaXMub3B0aW9ucywge2NvbnRhaW5lcjogY29udGFpbmVyLCBzcmM6IHNvdXJjZX0pO1xuICAgICAgY29udGFpbmVyLmFkZFBsdWdpbihuZXcgUGx1Z2luKG9wdGlvbnMpKTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhaW5lckZhY3Rvcnk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29udGFpbmVyX2ZhY3RvcnknKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuLyoqXG4gKiBUaGUgQ29yZSBpcyByZXNwb25zaWJsZSB0byBtYW5hZ2UgQ29udGFpbmVycywgdGhlIG1lZGlhdG9yLCBNZWRpYUNvbnRyb2xcbiAqIGFuZCB0aGUgcGxheWVyIHN0YXRlLlxuICovXG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guYXNzaWduJylcbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJylcblxudmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91aV9vYmplY3QnKVxudmFyIENvbnRhaW5lckZhY3RvcnkgPSByZXF1aXJlKCcuLi9jb250YWluZXJfZmFjdG9yeScpXG52YXIgRnVsbHNjcmVlbiA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdXRpbHMnKS5GdWxsc2NyZWVuXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIE1lZGlhQ29udHJvbCA9IHJlcXVpcmUoJy4uL21lZGlhX2NvbnRyb2wnKVxudmFyIFBsYXllckluZm8gPSByZXF1aXJlKCcuLi9wbGF5ZXJfaW5mbycpXG52YXIgTWVkaWF0b3IgPSByZXF1aXJlKCcuLi9tZWRpYXRvcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxudmFyIEJyb3dzZXIgPSByZXF1aXJlKCcuLi9icm93c2VyJylcblxudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpXG52YXIgaXNOdW1iZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykuaXNOdW1iZXJcbnZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG52YXIgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykuY2FuY2VsQW5pbWF0aW9uRnJhbWVcblxuY2xhc3MgQ29yZSBleHRlbmRzIFVJT2JqZWN0IHtcbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnOiAnZXhpdCcsXG4gICAgICAnbW91c2Vtb3ZlJzogJ3Nob3dNZWRpYUNvbnRyb2wnLFxuICAgICAgJ21vdXNlbGVhdmUnOiAnaGlkZU1lZGlhQ29udHJvbCdcbiAgICB9XG4gIH1cblxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2RhdGEtcGxheWVyJzogJycsXG4gICAgICB0YWJpbmRleDogOTk5OSxcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICBQbGF5ZXJJbmZvLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMucGx1Z2lucyA9IFtdXG4gICAgdGhpcy5jb250YWluZXJzID0gW11cbiAgICB0aGlzLmNyZWF0ZUNvbnRhaW5lcnMob3B0aW9ucylcbiAgICAvL0ZJWE1FIGZ1bGxzY3JlZW4gYXBpIHN1Y2tzXG4gICAgJChkb2N1bWVudCkuYmluZCgnZnVsbHNjcmVlbmNoYW5nZScsICgpID0+IHRoaXMuZXhpdCgpKVxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ01TRnVsbHNjcmVlbkNoYW5nZScsICgpID0+IHRoaXMuZXhpdCgpKVxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCAoKSA9PiB0aGlzLmV4aXQoKSlcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcnMob3B0aW9ucykge1xuICAgIHRoaXMuZGVmZXIgPSAkLkRlZmVycmVkKClcbiAgICB0aGlzLmRlZmVyLnByb21pc2UodGhpcylcbiAgICB0aGlzLmNvbnRhaW5lckZhY3RvcnkgPSBuZXcgQ29udGFpbmVyRmFjdG9yeShvcHRpb25zLCBvcHRpb25zLmxvYWRlcilcbiAgICB0aGlzLmNvbnRhaW5lckZhY3RvcnlcbiAgICAgIC5jcmVhdGVDb250YWluZXJzKClcbiAgICAgIC50aGVuKChjb250YWluZXJzKSA9PiB0aGlzLnNldHVwQ29udGFpbmVycyhjb250YWluZXJzKSlcbiAgICAgIC50aGVuKChjb250YWluZXJzKSA9PiB0aGlzLnJlc29sdmVPbkNvbnRhaW5lcnNSZWFkeShjb250YWluZXJzKSlcbiAgfVxuXG4gIHVwZGF0ZVNpemUoKSB7XG4gICAgaWYgKEZ1bGxzY3JlZW4uaXNGdWxsc2NyZWVuKCkpIHtcbiAgICAgIHRoaXMuc2V0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0UGxheWVyU2l6ZSgpXG4gICAgfVxuICAgIE1lZGlhdG9yLnRyaWdnZXIoRXZlbnRzLlBMQVlFUl9SRVNJWkUpXG4gIH1cblxuICBzZXRGdWxsc2NyZWVuKCkge1xuICAgIGlmKCFCcm93c2VyLmlzaU9zKSB7XG4gICAgICB0aGlzLiRlbC5hZGRDbGFzcygnZnVsbHNjcmVlbicpXG4gICAgICB0aGlzLiRlbC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICBQbGF5ZXJJbmZvLnByZXZpb3VzU2l6ZSA9IFBsYXllckluZm8uY3VycmVudFNpemVcbiAgICAgIFBsYXllckluZm8uY3VycmVudFNpemUgPSB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfVxuICAgIH1cbiAgfVxuXG4gIHNldFBsYXllclNpemUoKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2Z1bGxzY3JlZW4nKVxuICAgIFBsYXllckluZm8uY3VycmVudFNpemUgPSBQbGF5ZXJJbmZvLnByZXZpb3VzU2l6ZVxuICAgIFBsYXllckluZm8ucHJldmlvdXNTaXplID0geyB3aWR0aDogJCh3aW5kb3cpLndpZHRoKCksIGhlaWdodDogJCh3aW5kb3cpLmhlaWdodCgpIH1cbiAgICB0aGlzLnJlc2l6ZShQbGF5ZXJJbmZvLmN1cnJlbnRTaXplKVxuICB9XG5cbiAgcmVzaXplKG9wdGlvbnMpIHtcbiAgICBpZiAoIWlzTnVtYmVyKG9wdGlvbnMuaGVpZ2h0KSAmJiAhaXNOdW1iZXIob3B0aW9ucy53aWR0aCkpICB7XG4gICAgICB0aGlzLmVsLnN0eWxlLmhlaWdodCA9IGAke29wdGlvbnMuaGVpZ2h0fWA7XG4gICAgICB0aGlzLmVsLnN0eWxlLndpZHRoID0gYCR7b3B0aW9ucy53aWR0aH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsLnN0eWxlLmhlaWdodCA9IGAke29wdGlvbnMuaGVpZ2h0fXB4YDtcbiAgICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBgJHtvcHRpb25zLndpZHRofXB4YDtcbiAgICB9XG4gICAgUGxheWVySW5mby5wcmV2aW91c1NpemUgPSBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplXG4gICAgUGxheWVySW5mby5jdXJyZW50U2l6ZSA9IG9wdGlvbnNcbiAgICBNZWRpYXRvci50cmlnZ2VyKEV2ZW50cy5QTEFZRVJfUkVTSVpFKVxuICB9XG5cbiAgZW5hYmxlUmVzaXplT2JzZXJ2ZXIoKSB7XG4gICAgdmFyIGNoZWNrU2l6ZUNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucmVxQW5pbUZyYW1lKSBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlcUFuaW1GcmFtZSlcbiAgICAgIGlmICh0aGlzLnByZXZpb3VzU2l6ZS53aWR0aCAhPSB0aGlzLiRlbC53aWR0aCgpIHx8XG4gICAgICAgICAgdGhpcy5wcmV2aW91c1NpemUuaGVpZ2h0ICE9IHRoaXMuJGVsLmhlaWdodCgpKSB7XG4gICAgICAgIE1lZGlhdG9yLnRyaWdnZXIoRXZlbnRzLlBMQVlFUl9SRVNJWkUpXG4gICAgICAgIHRoaXMucHJldmlvdXNTaXplID0geyB3aWR0aDogdGhpcy4kZWwud2lkdGgoKSwgaGVpZ2h0OiB0aGlzLiRlbC5oZWlnaHQoKSB9XG4gICAgICB9XG4gICAgICB0aGlzLnJlcUFuaW1GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShjaGVja1NpemVDYWxsYmFjaylcbiAgICB9XG5cbiAgICB0aGlzLnJlcUFuaW1GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShjaGVja1NpemVDYWxsYmFjaylcbiAgfVxuXG4gIGRpc2FibGVSZXNpemVPYnNlcnZlcigpIHtcbiAgICBpZiAodGhpcy5yZXFBbmltRnJhbWUpIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmVxQW5pbUZyYW1lKVxuICB9XG5cbiAgcmVzb2x2ZU9uQ29udGFpbmVyc1JlYWR5KGNvbnRhaW5lcnMpIHtcbiAgICAkLndoZW4uYXBwbHkoJCwgY29udGFpbmVycykuZG9uZSgoKSA9PnRoaXMuZGVmZXIucmVzb2x2ZSh0aGlzKSlcbiAgfVxuXG4gIGFkZFBsdWdpbihwbHVnaW4pIHtcbiAgICB0aGlzLnBsdWdpbnMucHVzaChwbHVnaW4pXG4gIH1cblxuICBoYXNQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiAhIXRoaXMuZ2V0UGx1Z2luKG5hbWUpXG4gIH1cblxuICBnZXRQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiBmaW5kKHRoaXMucGx1Z2lucywgKHBsdWdpbikgPT4gcGx1Z2luLm5hbWUgPT09IG5hbWUpXG4gIH1cblxuICBsb2FkKHNvdXJjZXMsIG1pbWVUeXBlKSB7XG4gICAgdGhpcy5vcHRpb25zLm1pbWVUeXBlID0gbWltZVR5cGVcbiAgICBzb3VyY2VzID0gc291cmNlcyAmJiBzb3VyY2VzLmNvbnN0cnVjdG9yID09PSBBcnJheSA/IHNvdXJjZXMgOiBbc291cmNlcy50b1N0cmluZygpXTtcbiAgICB0aGlzLmNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiBjb250YWluZXIuZGVzdHJveSgpKVxuICAgIHRoaXMuY29udGFpbmVyRmFjdG9yeS5vcHRpb25zID0gYXNzaWduKHRoaXMub3B0aW9ucywge3NvdXJjZXN9KVxuICAgIHRoaXMuY29udGFpbmVyRmFjdG9yeS5jcmVhdGVDb250YWluZXJzKCkudGhlbigoY29udGFpbmVycykgPT4ge1xuICAgICAgdGhpcy5zZXR1cENvbnRhaW5lcnMoY29udGFpbmVycylcbiAgICB9KVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc2FibGVSZXNpemVPYnNlcnZlcigpXG4gICAgdGhpcy5jb250YWluZXJzLmZvckVhY2goKGNvbnRhaW5lcikgPT4gY29udGFpbmVyLmRlc3Ryb3koKSlcbiAgICB0aGlzLnBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiBwbHVnaW4uZGVzdHJveSgpKVxuICAgIHRoaXMuJGVsLnJlbW92ZSgpXG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuZGVzdHJveSgpXG4gICAgJChkb2N1bWVudCkudW5iaW5kKCdmdWxsc2NyZWVuY2hhbmdlJylcbiAgICAkKGRvY3VtZW50KS51bmJpbmQoJ01TRnVsbHNjcmVlbkNoYW5nZScpXG4gICAgJChkb2N1bWVudCkudW5iaW5kKCdtb3pmdWxsc2NyZWVuY2hhbmdlJylcbn1cblxuICBleGl0KCkge1xuICAgIHRoaXMudXBkYXRlU2l6ZSgpXG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuc2hvdygpXG4gIH1cblxuICBzZXRNZWRpYUNvbnRyb2xDb250YWluZXIoY29udGFpbmVyKSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuc2V0Q29udGFpbmVyKGNvbnRhaW5lcilcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5yZW5kZXIoKVxuICB9XG5cbiAgZGlzYWJsZU1lZGlhQ29udHJvbCgpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5kaXNhYmxlKClcbiAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnbm9jdXJzb3InKVxuICB9XG5cbiAgZW5hYmxlTWVkaWFDb250cm9sKCkge1xuICAgIHRoaXMubWVkaWFDb250cm9sLmVuYWJsZSgpXG4gIH1cblxuICByZW1vdmVDb250YWluZXIoY29udGFpbmVyKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKGNvbnRhaW5lcilcbiAgICB0aGlzLmNvbnRhaW5lcnMgPSB0aGlzLmNvbnRhaW5lcnMuZmlsdGVyKChjKSA9PiBjICE9PSBjb250YWluZXIpXG4gIH1cblxuICBhcHBlbmRDb250YWluZXIoY29udGFpbmVyKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyhjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfREVTVFJPWUVELCB0aGlzLnJlbW92ZUNvbnRhaW5lcilcbiAgICB0aGlzLmVsLmFwcGVuZENoaWxkKGNvbnRhaW5lci5yZW5kZXIoKS5lbClcbiAgICB0aGlzLmNvbnRhaW5lcnMucHVzaChjb250YWluZXIpXG4gIH1cblxuICBzZXR1cENvbnRhaW5lcnMoY29udGFpbmVycykge1xuICAgIGNvbnRhaW5lcnMubWFwKHRoaXMuYXBwZW5kQ29udGFpbmVyLmJpbmQodGhpcykpXG4gICAgdGhpcy5zZXR1cE1lZGlhQ29udHJvbCh0aGlzLmdldEN1cnJlbnRDb250YWluZXIoKSlcbiAgICB0aGlzLnJlbmRlcigpXG4gICAgdGhpcy4kZWwuYXBwZW5kVG8odGhpcy5vcHRpb25zLnBhcmVudEVsZW1lbnQpXG4gICAgcmV0dXJuIGNvbnRhaW5lcnNcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcihzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXJGYWN0b3J5LmNyZWF0ZUNvbnRhaW5lcihzb3VyY2UsIG9wdGlvbnMpXG4gICAgdGhpcy5hcHBlbmRDb250YWluZXIoY29udGFpbmVyKVxuICAgIHJldHVybiBjb250YWluZXJcbiAgfVxuXG4gIHNldHVwTWVkaWFDb250cm9sKGNvbnRhaW5lcikge1xuICAgIGlmICh0aGlzLm1lZGlhQ29udHJvbCkge1xuICAgICAgdGhpcy5tZWRpYUNvbnRyb2wuc2V0Q29udGFpbmVyKGNvbnRhaW5lcilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZWRpYUNvbnRyb2wgPSB0aGlzLmNyZWF0ZU1lZGlhQ29udHJvbChhc3NpZ24oe2NvbnRhaW5lcjogY29udGFpbmVyLCBmb2N1c0VsZW1lbnQ6IHRoaXMuZWx9LCB0aGlzLm9wdGlvbnMpKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9GVUxMU0NSRUVOLCB0aGlzLnRvZ2dsZUZ1bGxzY3JlZW4pXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX1NIT1csIHRoaXMub25NZWRpYUNvbnRyb2xTaG93LmJpbmQodGhpcywgdHJ1ZSkpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX0hJREUsIHRoaXMub25NZWRpYUNvbnRyb2xTaG93LmJpbmQodGhpcywgZmFsc2UpKVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZU1lZGlhQ29udHJvbChvcHRpb25zKSB7XG4gICAgaWYob3B0aW9ucy5tZWRpYWNvbnRyb2wgJiYgb3B0aW9ucy5tZWRpYWNvbnRyb2wuZXh0ZXJuYWwpIHtcbiAgICAgIHJldHVybiBuZXcgb3B0aW9ucy5tZWRpYWNvbnRyb2wuZXh0ZXJuYWwob3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgTWVkaWFDb250cm9sKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGdldEN1cnJlbnRDb250YWluZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyc1swXVxuICB9XG5cbiAgdG9nZ2xlRnVsbHNjcmVlbigpIHtcbiAgICBpZiAoIUZ1bGxzY3JlZW4uaXNGdWxsc2NyZWVuKCkpIHtcbiAgICAgIEZ1bGxzY3JlZW4ucmVxdWVzdEZ1bGxzY3JlZW4odGhpcy5lbClcbiAgICAgIGlmKCFCcm93c2VyLmlzaU9zKSB7XG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdmdWxsc2NyZWVuJylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgRnVsbHNjcmVlbi5jYW5jZWxGdWxsc2NyZWVuKClcbiAgICAgIGlmKCFCcm93c2VyLmlzaU9zKSB7XG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdmdWxsc2NyZWVuIG5vY3Vyc29yJylcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuc2hvdygpXG4gIH1cblxuICBzaG93TWVkaWFDb250cm9sKGV2ZW50KSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuc2hvdyhldmVudClcbiAgfVxuXG4gIGhpZGVNZWRpYUNvbnRyb2woZXZlbnQpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5oaWRlKGV2ZW50KVxuICB9XG5cbiAgb25NZWRpYUNvbnRyb2xTaG93KHNob3dpbmcpIHtcbiAgICBpZiAoc2hvd2luZylcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdub2N1cnNvcicpXG4gICAgZWxzZSBpZiAoRnVsbHNjcmVlbi5pc0Z1bGxzY3JlZW4oKSlcbiAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdub2N1cnNvcicpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKCdjb3JlJylcbiAgICAvL0ZJWE1FXG4gICAgLy90aGlzLiRlbC5lbXB0eSgpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHRoaXMuJGVsLmFwcGVuZCh0aGlzLm1lZGlhQ29udHJvbC5yZW5kZXIoKS5lbClcblxuICAgIHRoaXMub3B0aW9ucy53aWR0aCA9IHRoaXMub3B0aW9ucy53aWR0aCB8fCB0aGlzLiRlbC53aWR0aCgpXG4gICAgdGhpcy5vcHRpb25zLmhlaWdodCA9IHRoaXMub3B0aW9ucy5oZWlnaHQgfHwgdGhpcy4kZWwuaGVpZ2h0KClcbiAgICB2YXIgc2l6ZSA9IHt3aWR0aDogdGhpcy5vcHRpb25zLndpZHRoLCBoZWlnaHQ6IHRoaXMub3B0aW9ucy5oZWlnaHR9XG4gICAgUGxheWVySW5mby5wcmV2aW91c1NpemUgPSBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplID0gc2l6ZVxuICAgIHRoaXMudXBkYXRlU2l6ZSgpXG5cbiAgICB0aGlzLnByZXZpb3VzU2l6ZSA9IHsgd2lkdGg6IHRoaXMuJGVsLndpZHRoKCksIGhlaWdodDogdGhpcy4kZWwuaGVpZ2h0KCkgfVxuXG4gICAgdGhpcy5lbmFibGVSZXNpemVPYnNlcnZlcigpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29yZVxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuLyoqXG4gKiBUaGUgQ29yZSBGYWN0b3J5IGlzIHJlc3BvbnNpYmxlIGZvciBpbnN0YW50aWF0ZSB0aGUgY29yZSBhbmQgaXQncyBwbHVnaW5zLlxuICovXG5cbnZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9iYXNlX29iamVjdCcpO1xudmFyIENvcmUgPSByZXF1aXJlKCcuLi9jb3JlJyk7XG5cbmNsYXNzIENvcmVGYWN0b3J5IGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKHBsYXllciwgbG9hZGVyKSB7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXJcbiAgICB0aGlzLm9wdGlvbnMgPSBwbGF5ZXIub3B0aW9uc1xuICAgIHRoaXMubG9hZGVyID0gbG9hZGVyXG4gICAgdGhpcy5vcHRpb25zLmxvYWRlciA9IHRoaXMubG9hZGVyXG4gIH1cblxuICBjcmVhdGUoKSB7XG4gICAgdGhpcy5jb3JlID0gbmV3IENvcmUodGhpcy5vcHRpb25zKVxuICAgIHRoaXMuY29yZS50aGVuKHRoaXMuYWRkQ29yZVBsdWdpbnMuYmluZCh0aGlzKSlcbiAgICByZXR1cm4gdGhpcy5jb3JlXG4gIH1cblxuICBhZGRDb3JlUGx1Z2lucygpIHtcbiAgICB0aGlzLmxvYWRlci5jb3JlUGx1Z2lucy5mb3JFYWNoKChQbHVnaW4pID0+IHtcbiAgICAgIHZhciBwbHVnaW4gPSBuZXcgUGx1Z2luKHRoaXMuY29yZSlcbiAgICAgIHRoaXMuY29yZS5hZGRQbHVnaW4ocGx1Z2luKVxuICAgICAgdGhpcy5zZXR1cEV4dGVybmFsSW50ZXJmYWNlKHBsdWdpbilcbiAgICB9KVxuICAgIHJldHVybiB0aGlzLmNvcmVcbiAgfVxuXG4gIHNldHVwRXh0ZXJuYWxJbnRlcmZhY2UocGx1Z2luKSB7XG4gICAgdmFyIGV4dGVybmFsRnVuY3Rpb25zID0gcGx1Z2luLmdldEV4dGVybmFsSW50ZXJmYWNlKCk7XG4gICAgZm9yICh2YXIga2V5IGluIGV4dGVybmFsRnVuY3Rpb25zKSB7XG4gICAgICB0aGlzLnBsYXllcltrZXldID0gZXh0ZXJuYWxGdW5jdGlvbnNba2V5XS5iaW5kKHBsdWdpbilcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlRmFjdG9yeTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb3JlX2ZhY3RvcnknKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xvYWRlcicpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvYmFzZV9vYmplY3QnKVxudmFyIFBsYXllckluZm8gPSByZXF1aXJlKCcuLi9wbGF5ZXJfaW5mbycpXG52YXIgdW5pcSA9IHJlcXVpcmUoJ2xvZGFzaC51bmlxJylcblxuLyogUGxheWJhY2sgUGx1Z2lucyAqL1xudmFyIEhUTUw1VmlkZW9QbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9odG1sNV92aWRlbycpO1xudmFyIEZsYXNoVmlkZW9QbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9mbGFzaCcpO1xudmFyIEhUTUw1QXVkaW9QbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9odG1sNV9hdWRpbycpO1xudmFyIEhMU1ZpZGVvUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9wbGF5YmFja3MvaGxzJyk7XG52YXIgSFRNTEltZ1BsYXliYWNrID0gcmVxdWlyZSgnLi4vLi4vcGxheWJhY2tzL2h0bWxfaW1nJyk7XG52YXIgTm9PcCA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9ub19vcCcpO1xuXG4vKiBDb250YWluZXIgUGx1Z2lucyAqL1xudmFyIFNwaW5uZXJUaHJlZUJvdW5jZVBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvc3Bpbm5lcl90aHJlZV9ib3VuY2UnKTtcbnZhciBTdGF0c1BsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvc3RhdHMnKTtcbnZhciBXYXRlck1hcmtQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9wbHVnaW5zL3dhdGVybWFyaycpO1xudmFyIFBvc3RlclBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvcG9zdGVyJyk7XG52YXIgR29vZ2xlQW5hbHl0aWNzUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9nb29nbGVfYW5hbHl0aWNzJyk7XG52YXIgQ2xpY2tUb1BhdXNlUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9jbGlja190b19wYXVzZScpO1xuXG4vKiBDb3JlIFBsdWdpbnMgKi9cbnZhciBEVlJDb250cm9scyA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvZHZyX2NvbnRyb2xzJyk7XG5cbmNsYXNzIExvYWRlciBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihleHRlcm5hbFBsdWdpbnMpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5wbGF5YmFja1BsdWdpbnMgPSBbSFRNTDVBdWRpb1BsYXliYWNrLCBIVE1MNVZpZGVvUGxheWJhY2ssIEZsYXNoVmlkZW9QbGF5YmFjaywgSExTVmlkZW9QbGF5YmFjaywgSFRNTEltZ1BsYXliYWNrLCBOb09wXVxuICAgIHRoaXMuY29udGFpbmVyUGx1Z2lucyA9IFtTcGlubmVyVGhyZWVCb3VuY2VQbHVnaW4sIFdhdGVyTWFya1BsdWdpbiwgUG9zdGVyUGx1Z2luLCBTdGF0c1BsdWdpbiwgR29vZ2xlQW5hbHl0aWNzUGx1Z2luLCBDbGlja1RvUGF1c2VQbHVnaW5dXG4gICAgdGhpcy5jb3JlUGx1Z2lucyA9IFtEVlJDb250cm9sc11cbiAgICBpZiAoZXh0ZXJuYWxQbHVnaW5zKSB7XG4gICAgICB0aGlzLmFkZEV4dGVybmFsUGx1Z2lucyhleHRlcm5hbFBsdWdpbnMpXG4gICAgfVxuICB9XG5cbiAgYWRkRXh0ZXJuYWxQbHVnaW5zKHBsdWdpbnMpIHtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGZ1bmN0aW9uKHBsdWdpbikgeyByZXR1cm4gcGx1Z2luLnByb3RvdHlwZS5uYW1lIH1cbiAgICBpZiAocGx1Z2lucy5wbGF5YmFjaykgeyB0aGlzLnBsYXliYWNrUGx1Z2lucyA9IHVuaXEocGx1Z2lucy5wbGF5YmFjay5jb25jYXQodGhpcy5wbGF5YmFja1BsdWdpbnMpLCBwbHVnaW5OYW1lKSB9XG4gICAgaWYgKHBsdWdpbnMuY29udGFpbmVyKSB7IHRoaXMuY29udGFpbmVyUGx1Z2lucyA9IHVuaXEocGx1Z2lucy5jb250YWluZXIuY29uY2F0KHRoaXMuY29udGFpbmVyUGx1Z2lucyksIHBsdWdpbk5hbWUpIH1cbiAgICBpZiAocGx1Z2lucy5jb3JlKSB7IHRoaXMuY29yZVBsdWdpbnMgPSB1bmlxKHBsdWdpbnMuY29yZS5jb25jYXQodGhpcy5jb3JlUGx1Z2lucyksIHBsdWdpbk5hbWUpIH1cbiAgICBQbGF5ZXJJbmZvLnBsYXliYWNrUGx1Z2lucyA9IHRoaXMucGxheWJhY2tQbHVnaW5zXG4gIH1cblxuICBnZXRQbHVnaW4obmFtZSkge1xuICAgIHZhciBhbGxQbHVnaW5zID0gdGhpcy5jb250YWluZXJQbHVnaW5zLmNvbmNhdCh0aGlzLnBsYXliYWNrUGx1Z2lucykuY29uY2F0KHRoaXMuY29yZVBsdWdpbnMpXG4gICAgcmV0dXJuIGFsbFBsdWdpbnMuZmluZCgocGx1Z2luKSA9PiB7IHJldHVybiBwbHVnaW4ucHJvdG90eXBlLm5hbWUgPT09IG5hbWUgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogVGhlIE1lZGlhQ29udHJvbCBpcyByZXNwb25zaWJsZSBmb3IgZGlzcGxheWluZyB0aGUgUGxheWVyIGNvbnRyb2xzLlxuICovXG5cbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91aV9vYmplY3QnKVxudmFyIFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJy4uL2Jyb3dzZXInKVxudmFyIFNlZWtUaW1lID0gcmVxdWlyZSgnLi4vc2Vla190aW1lJylcbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJy4uL21lZGlhdG9yJylcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgnLi4vcGxheWVyX2luZm8nKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcbnZhciBLaWJvID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9raWJvJylcblxuY2xhc3MgTWVkaWFDb250cm9sIGV4dGVuZHMgVUlPYmplY3Qge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdNZWRpYUNvbnRyb2wnIH1cblxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3M6ICdtZWRpYS1jb250cm9sJyxcbiAgICAgICdkYXRhLW1lZGlhLWNvbnRyb2wnOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGljayBbZGF0YS1wbGF5XSc6ICdwbGF5JyxcbiAgICAgICdjbGljayBbZGF0YS1wYXVzZV0nOiAncGF1c2UnLFxuICAgICAgJ2NsaWNrIFtkYXRhLXBsYXlwYXVzZV0nOiAndG9nZ2xlUGxheVBhdXNlJyxcbiAgICAgICdjbGljayBbZGF0YS1zdG9wXSc6ICdzdG9wJyxcbiAgICAgICdjbGljayBbZGF0YS1wbGF5c3RvcF0nOiAndG9nZ2xlUGxheVN0b3AnLFxuICAgICAgJ2NsaWNrIFtkYXRhLWZ1bGxzY3JlZW5dJzogJ3RvZ2dsZUZ1bGxzY3JlZW4nLFxuICAgICAgJ2NsaWNrIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0nOiAnc2VlaycsXG4gICAgICAnY2xpY2sgLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdJzogJ3ZvbHVtZScsXG4gICAgICAnY2xpY2sgLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXSc6ICd0b2dnbGVNdXRlJyxcbiAgICAgICdtb3VzZWVudGVyIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSc6ICdzaG93Vm9sdW1lQmFyJyxcbiAgICAgICdtb3VzZWxlYXZlIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSc6ICdoaWRlVm9sdW1lQmFyJyxcbiAgICAgICdtb3VzZWRvd24gLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV0nOiAnbW91c2Vkb3duT25Wb2x1bWVCYXInLFxuICAgICAgJ21vdXNlbGVhdmUgLm1lZGlhLWNvbnRyb2wtbGF5ZXInOiAnbW91c2VsZWF2ZU9uVm9sdW1lQmFyJyxcbiAgICAgICdtb3VzZW1vdmUgLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV0nOiAnbW91c2Vtb3ZlT25Wb2x1bWVCYXInLFxuICAgICAgJ21vdXNldXAgLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV0nOiAnbW91c2V1cE9uVm9sdW1lQmFyJyxcbiAgICAgICdtb3VzZWRvd24gLmJhci1zY3J1YmJlcltkYXRhLXZvbHVtZV0nOiAnc3RhcnRWb2x1bWVEcmFnJyxcbiAgICAgICdtb3VzZWRvd24gLmJhci1zY3J1YmJlcltkYXRhLXNlZWtiYXJdJzogJ3N0YXJ0U2Vla0RyYWcnLFxuICAgICAgJ21vdXNlbW92ZSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdJzogJ21vdXNlbW92ZU9uU2Vla0JhcicsXG4gICAgICAnbW91c2VsZWF2ZSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdJzogJ21vdXNlbGVhdmVPblNlZWtCYXInLFxuICAgICAgJ21vdXNlZW50ZXIgLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10nOiAnc2V0S2VlcFZpc2libGUnLFxuICAgICAgJ21vdXNlbGVhdmUgLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10nOiAncmVzZXRLZWVwVmlzaWJsZSdcbiAgICB9XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBKU1QubWVkaWFfY29udHJvbCB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5zZWVrVGltZSA9IG5ldyBTZWVrVGltZSh0aGlzKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLm11dGUgPSB0aGlzLm9wdGlvbnMubXV0ZVxuICAgIHRoaXMucGVyc2lzdENvbmZpZyA9IHRoaXMub3B0aW9ucy5wZXJzaXN0Q29uZmlnXG4gICAgdGhpcy5jb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuICAgIHZhciBpbml0aWFsVm9sdW1lID0gKHRoaXMucGVyc2lzdENvbmZpZykgPyBVdGlscy5Db25maWcucmVzdG9yZShcInZvbHVtZVwiKSA6IDEwMDtcbiAgICB0aGlzLnNldFZvbHVtZSh0aGlzLm11dGUgPyAwIDogaW5pdGlhbFZvbHVtZSlcbiAgICB0aGlzLmtlZXBWaXNpYmxlID0gZmFsc2VcbiAgICB0aGlzLnZvbHVtZUJhckNsaWNrRG93biA9IGZhbHNlO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICBsZWZ0OiBbJ3BsYXknLCAnc3RvcCcsICdwYXVzZSddLFxuICAgICAgcmlnaHQ6IFsndm9sdW1lJ10sXG4gICAgICBkZWZhdWx0OiBbJ3Bvc2l0aW9uJywgJ3NlZWtiYXInLCAnZHVyYXRpb24nXVxuICAgIH1cbiAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmtleXModGhpcy5jb250YWluZXIuc2V0dGluZ3MpLmxlbmd0aCA9PT0gMCA/IHRoaXMuc2V0dGluZ3MgOiB0aGlzLmNvbnRhaW5lci5zZXR0aW5nc1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgIGlmICh0aGlzLmNvbnRhaW5lci5tZWRpYUNvbnRyb2xEaXNhYmxlZCB8fCB0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9XG4gICAgJChkb2N1bWVudCkuYmluZCgnbW91c2V1cCcsIChldmVudCkgPT4gdGhpcy5zdG9wRHJhZyhldmVudCkpXG4gICAgJChkb2N1bWVudCkuYmluZCgnbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB0aGlzLnVwZGF0ZURyYWcoZXZlbnQpKVxuICAgIE1lZGlhdG9yLm9uKEV2ZW50cy5QTEFZRVJfUkVTSVpFLCAoKSA9PiB0aGlzLnBsYXllclJlc2l6ZSgpKVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QQVVTRSwgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfREJMQ0xJQ0ssIHRoaXMudG9nZ2xlRnVsbHNjcmVlbilcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1RJTUVVUERBVEUsIHRoaXMudXBkYXRlU2Vla0JhcilcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BST0dSRVNTLCB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VUVElOR1NVUERBVEUsIHRoaXMuc2V0dGluZ3NVcGRhdGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCwgdGhpcy5zZXR0aW5nc1VwZGF0ZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0hJR0hERUZJTklUSU9OVVBEQVRFLCB0aGlzLmhpZ2hEZWZpbml0aW9uVXBkYXRlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfTUVESUFDT05UUk9MX0RJU0FCTEUsIHRoaXMuZGlzYWJsZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9FTkFCTEUsIHRoaXMuZW5hYmxlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRU5ERUQsIHRoaXMuZW5kZWQpXG4gIH1cblxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5oaWRlKClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmNocm9tZWxlc3MpIHJldHVyblxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgIHRoaXMuc2hvdygpXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuY29udGFpbmVyLnBsYXkoKVxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5jb250YWluZXIucGF1c2UoKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5zdG9wKClcbiAgfVxuXG4gIGNoYW5nZVRvZ2dsZVBsYXkoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLmlzUGxheWluZygpKSB7XG4gICAgICB0aGlzLiRwbGF5UGF1c2VUb2dnbGUucmVtb3ZlQ2xhc3MoJ3BhdXNlZCcpLmFkZENsYXNzKCdwbGF5aW5nJylcbiAgICAgIHRoaXMuJHBsYXlTdG9wVG9nZ2xlLnJlbW92ZUNsYXNzKCdzdG9wcGVkJykuYWRkQ2xhc3MoJ3BsYXlpbmcnKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfUExBWUlORyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJHBsYXlQYXVzZVRvZ2dsZS5yZW1vdmVDbGFzcygncGxheWluZycpLmFkZENsYXNzKCdwYXVzZWQnKVxuICAgICAgdGhpcy4kcGxheVN0b3BUb2dnbGUucmVtb3ZlQ2xhc3MoJ3BsYXlpbmcnKS5hZGRDbGFzcygnc3RvcHBlZCcpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9OT1RQTEFZSU5HKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZW1vdmVPblNlZWtCYXIoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuc2V0dGluZ3Muc2Vla0VuYWJsZWQpIHtcbiAgICAgIHZhciBvZmZzZXRYID0gZXZlbnQucGFnZVggLSB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLm9mZnNldCgpLmxlZnQgLSAodGhpcy4kc2Vla0JhckhvdmVyLndpZHRoKCkgLyAyKVxuICAgICAgdGhpcy4kc2Vla0JhckhvdmVyLmNzcyh7bGVmdDogb2Zmc2V0WH0pXG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX01PVVNFTU9WRV9TRUVLQkFSLCBldmVudCk7XG4gIH1cblxuICBtb3VzZWxlYXZlT25TZWVrQmFyKGV2ZW50KSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VMRUFWRV9TRUVLQkFSLCBldmVudCk7XG4gIH1cblxuICBtb3VzZW1vdmVPblZvbHVtZUJhcihldmVudCkge1xuICAgIGlmKHRoaXMudm9sdW1lQmFyQ2xpY2tEb3duKXtcbiAgICAgIHRoaXMudm9sdW1lKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBtb3VzZWRvd25PblZvbHVtZUJhcigpIHtcbiAgICB2YXIgY3Vyc29yU3R5bGVQcm9wZXJ0eSA9ICd1cmwoaHR0cDovL3d3dy5nb29nbGUuY29tL2ludGwvZW5fQUxML21hcGZpbGVzL2Nsb3NlZGhhbmQuY3VyKSwgbW92ZSc7XG4gICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLmNzcygnY3Vyc29yJywgY3Vyc29yU3R5bGVQcm9wZXJ0eSk7XG4gICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLmNzcygnY3Vyc29yJywgJy13ZWJraXQtZ3JhYmJpbmcnKTtcbiAgICB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIuY3NzKCdjdXJzb3InLCAnLW1vei1ncmFiYmluZycpO1xuICAgIHRoaXMudm9sdW1lQmFyQ2xpY2tEb3duID0gdHJ1ZTtcbiAgfVxuXG4gIG1vdXNldXBPblZvbHVtZUJhcigpIHtcbiAgICB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIuY3NzKCAnY3Vyc29yJywgJ3BvaW50ZXInICk7XG4gICAgdGhpcy52b2x1bWVCYXJDbGlja0Rvd24gPSBmYWxzZTtcbiAgfVxuXG4gIG1vdXNlbGVhdmVPblZvbHVtZUJhcihldmVudCkge1xuICAgIHZhciB2b2xPZmZzZXQgPSB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIub2Zmc2V0KCk7XG5cbiAgICB2YXIgb3V0c2lkZUJ5TGVmdCA9IGV2ZW50LnBhZ2VYIDwgdGhpcy4kc2Vla0JhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0O1xuICAgIHZhciBvdXRzaWRlQnlSaWdodCA9IGV2ZW50LnBhZ2VYID4gKHZvbE9mZnNldC5sZWZ0ICsgdm9sT2Zmc2V0LndpZHRoKTtcbiAgICB2YXIgb3V0c2lkZUhvcml6b250YWxseSA9IChvdXRzaWRlQnlMZWZ0IHx8IG91dHNpZGVCeVJpZ2h0KTtcblxuICAgIHZhciBvdXRzaWRlQnlUb3AgPSBldmVudC5wYWdlWSA8IHZvbE9mZnNldC50b3A7XG4gICAgdmFyIG91dHNpZGVCeUJvdHRvbSA9IGV2ZW50LnBhZ2VZID4gKHZvbE9mZnNldC50b3AgKyB2b2xPZmZzZXQuaGVpZ2h0KTtcblxuICAgIHZhciBvdXRzaWRlVmVydGljYWxseSA9IChvdXRzaWRlQnlUb3AgfHwgb3V0c2lkZUJ5Qm90dG9tKTtcblxuICAgIGlmKG91dHNpZGVIb3Jpem9udGFsbHkgfHwgb3V0c2lkZVZlcnRpY2FsbHkpIHtcbiAgICAgIHRoaXMubW91c2V1cE9uVm9sdW1lQmFyKCk7XG4gICAgfVxuICB9XG5cbiAgcGxheWVyUmVzaXplKCkge1xuICAgIGlmIChVdGlscy5GdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpKSB7XG4gICAgICB0aGlzLiRmdWxsc2NyZWVuVG9nZ2xlLmFkZENsYXNzKCdzaHJpbmsnKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRmdWxsc2NyZWVuVG9nZ2xlLnJlbW92ZUNsYXNzKCdzaHJpbmsnKVxuICAgIH1cbiAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygndzMyMCcpXG4gICAgaWYgKFBsYXllckluZm8uY3VycmVudFNpemUud2lkdGggPD0gMzIwIHx8IHRoaXMub3B0aW9ucy5oaWRlVm9sdW1lQmFyKSB7XG4gICAgICB0aGlzLiRlbC5hZGRDbGFzcygndzMyMCcpXG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUGxheVBhdXNlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkge1xuICAgICAgdGhpcy5jb250YWluZXIucGF1c2UoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5wbGF5KClcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB0b2dnbGVQbGF5U3RvcCgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0b3AoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5wbGF5KClcbiAgICB9XG4gIH1cblxuICBzdGFydFNlZWtEcmFnKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkgcmV0dXJuXG4gICAgdGhpcy5kcmFnZ2luZ1NlZWtCYXIgPSB0cnVlXG4gICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2RyYWdnaW5nJylcbiAgICB0aGlzLiRzZWVrQmFyTG9hZGVkLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgc3RhcnRWb2x1bWVEcmFnKGV2ZW50KSB7XG4gICAgdGhpcy5kcmFnZ2luZ1ZvbHVtZUJhciA9IHRydWVcbiAgICB0aGlzLiRlbC5hZGRDbGFzcygnZHJhZ2dpbmcnKVxuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIHN0b3BEcmFnKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmdTZWVrQmFyKSB7XG4gICAgICB0aGlzLnNlZWsoZXZlbnQpXG4gICAgfVxuICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpXG4gICAgdGhpcy4kc2Vla0JhckxvYWRlZC5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbi5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlci5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24gZHJhZ2dpbmcnKVxuICAgIHRoaXMuZHJhZ2dpbmdTZWVrQmFyID0gZmFsc2VcbiAgICB0aGlzLmRyYWdnaW5nVm9sdW1lQmFyID0gZmFsc2VcbiAgfVxuXG4gIHVwZGF0ZURyYWcoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmdTZWVrQmFyKSB7XG4gICAgICB2YXIgb2Zmc2V0WCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy4kc2Vla0JhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0XG4gICAgICB2YXIgcG9zID0gb2Zmc2V0WCAvIHRoaXMuJHNlZWtCYXJDb250YWluZXIud2lkdGgoKSAqIDEwMFxuICAgICAgcG9zID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heChwb3MsIDApKVxuICAgICAgdGhpcy5zZXRTZWVrUGVyY2VudGFnZShwb3MpXG4gICAgfSBlbHNlIGlmICh0aGlzLmRyYWdnaW5nVm9sdW1lQmFyKSB7XG4gICAgICB0aGlzLnZvbHVtZShldmVudClcbiAgICB9XG4gIH1cblxuICB2b2x1bWUoZXZlbnQpIHtcbiAgICB2YXIgb2Zmc2V0WSA9IGV2ZW50LnBhZ2VYIC0gdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLm9mZnNldCgpLmxlZnRcbiAgICB2YXIgdm9sdW1lRnJvbVVJID0gKG9mZnNldFkgLyB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIud2lkdGgoKSkgKiAxMDBcbiAgICB0aGlzLnNldFZvbHVtZSh2b2x1bWVGcm9tVUkpXG4gIH1cblxuICB0b2dnbGVNdXRlKCkge1xuICAgIGlmICh0aGlzLm11dGUpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRWb2x1bWUgPD0gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSAxMDBcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMuY3VycmVudFZvbHVtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRWb2x1bWUoMClcbiAgICB9XG4gIH1cblxuICBzZXRWb2x1bWUodmFsdWUpIHtcbiAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSBNYXRoLm1pbigxMDAsIE1hdGgubWF4KHZhbHVlLCAwKSlcbiAgICB0aGlzLmNvbnRhaW5lci5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgIHRoaXMuc2V0Vm9sdW1lTGV2ZWwodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgIHRoaXMubXV0ZSA9IHRoaXMuY3VycmVudFZvbHVtZSA9PT0gMFxuICAgIHRoaXMucGVyc2lzdENvbmZpZyAmJiBVdGlscy5Db25maWcucGVyc2lzdChcInZvbHVtZVwiLCB0aGlzLmN1cnJlbnRWb2x1bWUpXG4gIH1cblxuICB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX0ZVTExTQ1JFRU4sIHRoaXMubmFtZSlcbiAgICB0aGlzLmNvbnRhaW5lci5mdWxsc2NyZWVuKClcbiAgICB0aGlzLnJlc2V0S2VlcFZpc2libGUoKVxuICB9XG5cbiAgc2V0Q29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZyh0aGlzLmNvbnRhaW5lcilcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lclxuICAgIHRoaXMuY2hhbmdlVG9nZ2xlUGxheSgpXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpXG4gICAgdGhpcy5zZXR0aW5nc1VwZGF0ZSgpXG4gICAgdGhpcy5jb250YWluZXIudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLRFZSU1RBVEVDSEFOR0VELCB0aGlzLmNvbnRhaW5lci5pc0R2ckluVXNlKCkpXG4gICAgdGhpcy5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgIGlmICh0aGlzLmNvbnRhaW5lci5tZWRpYUNvbnRyb2xEaXNhYmxlZCkge1xuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfQ09OVEFJTkVSQ0hBTkdFRClcbiAgfVxuXG4gIHNob3dWb2x1bWVCYXIoKSB7XG4gICAgaWYgKHRoaXMuaGlkZVZvbHVtZUlkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlVm9sdW1lSWQpXG4gICAgfVxuICAgIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci5yZW1vdmVDbGFzcygndm9sdW1lLWJhci1oaWRlJylcbiAgfVxuXG4gIGhpZGVWb2x1bWVCYXIoKSB7XG4gICAgdmFyIHRpbWVvdXQgPSA0MDBcbiAgICBpZiAoIXRoaXMuJHZvbHVtZUJhckNvbnRhaW5lcikgcmV0dXJuXG4gICAgaWYgKHRoaXMuZHJhZ2dpbmdWb2x1bWVCYXIpIHtcbiAgICAgIHRoaXMuaGlkZVZvbHVtZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGVWb2x1bWVCYXIoKSwgdGltZW91dClcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuaGlkZVZvbHVtZUlkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVWb2x1bWVJZClcbiAgICAgIH1cbiAgICAgIHRoaXMuaGlkZVZvbHVtZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIuYWRkQ2xhc3MoJ3ZvbHVtZS1iYXItaGlkZScpLCB0aW1lb3V0KVxuICAgIH1cbiAgfVxuXG4gIGVuZGVkKCkge1xuICAgIHRoaXMuY2hhbmdlVG9nZ2xlUGxheSgpXG4gIH1cblxuICB1cGRhdGVQcm9ncmVzc0JhcihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbiwgZHVyYXRpb24pIHtcbiAgICB2YXIgbG9hZGVkU3RhcnQgPSBzdGFydFBvc2l0aW9uIC8gZHVyYXRpb24gKiAxMDBcbiAgICB2YXIgbG9hZGVkRW5kID0gZW5kUG9zaXRpb24gLyBkdXJhdGlvbiAqIDEwMFxuICAgIHRoaXMuJHNlZWtCYXJMb2FkZWQuY3NzKHsgbGVmdDogbG9hZGVkU3RhcnQgKyAnJScsIHdpZHRoOiAobG9hZGVkRW5kIC0gbG9hZGVkU3RhcnQpICsgJyUnIH0pXG4gIH1cblxuICB1cGRhdGVTZWVrQmFyKHBvc2l0aW9uLCBkdXJhdGlvbikge1xuICAgIGlmICh0aGlzLmRyYWdnaW5nU2Vla0JhcikgcmV0dXJuXG4gICAgaWYgKHBvc2l0aW9uIDwgMCkgcG9zaXRpb24gPSBkdXJhdGlvblxuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbi5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlci5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHZhciBzZWVrYmFyVmFsdWUgPSAoMTAwIC8gZHVyYXRpb24pICogcG9zaXRpb25cbiAgICB0aGlzLnNldFNlZWtQZXJjZW50YWdlKHNlZWtiYXJWYWx1ZSlcbiAgICB0aGlzLiQoJ1tkYXRhLXBvc2l0aW9uXScpLmh0bWwoVXRpbHMuZm9ybWF0VGltZShwb3NpdGlvbikpXG4gICAgdGhpcy4kKCdbZGF0YS1kdXJhdGlvbl0nKS5odG1sKFV0aWxzLmZvcm1hdFRpbWUoZHVyYXRpb24pKVxuICB9XG5cbiAgc2VlayhldmVudCkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIuc2V0dGluZ3Muc2Vla0VuYWJsZWQpIHJldHVyblxuICAgIHZhciBvZmZzZXRYID0gZXZlbnQucGFnZVggLSB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLm9mZnNldCgpLmxlZnRcbiAgICB2YXIgcG9zID0gb2Zmc2V0WCAvIHRoaXMuJHNlZWtCYXJDb250YWluZXIud2lkdGgoKSAqIDEwMFxuICAgIHBvcyA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgocG9zLCAwKSlcbiAgICB0aGlzLmNvbnRhaW5lci5zZXRDdXJyZW50VGltZShwb3MpXG4gICAgdGhpcy5zZXRTZWVrUGVyY2VudGFnZShwb3MpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBzZXRLZWVwVmlzaWJsZSgpIHtcbiAgICB0aGlzLmtlZXBWaXNpYmxlID0gdHJ1ZVxuICB9XG5cbiAgcmVzZXRLZWVwVmlzaWJsZSgpIHtcbiAgICB0aGlzLmtlZXBWaXNpYmxlID0gZmFsc2VcbiAgfVxuXG4gIGlzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gIXRoaXMuJGVsLmhhc0NsYXNzKCdtZWRpYS1jb250cm9sLWhpZGUnKVxuICB9XG5cbiAgc2hvdyhldmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm5cbiAgICB2YXIgdGltZW91dCA9IDIwMDBcbiAgICBpZiAoIWV2ZW50IHx8IChldmVudC5jbGllbnRYICE9PSB0aGlzLmxhc3RNb3VzZVggJiYgZXZlbnQuY2xpZW50WSAhPT0gdGhpcy5sYXN0TW91c2VZKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9maXJlZm94L2kpKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlSWQpXG4gICAgICB0aGlzLiRlbC5zaG93KClcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX1NIT1csIHRoaXMubmFtZSlcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdtZWRpYS1jb250cm9sLWhpZGUnKVxuICAgICAgdGhpcy5oaWRlSWQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aW1lb3V0KVxuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubGFzdE1vdXNlWCA9IGV2ZW50LmNsaWVudFhcbiAgICAgICAgdGhpcy5sYXN0TW91c2VZID0gZXZlbnQuY2xpZW50WVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdmFyIHRpbWVvdXQgPSAyMDAwXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZUlkKVxuICAgIGlmICghdGhpcy5pc1Zpc2libGUoKSB8fCB0aGlzLm9wdGlvbnMuaGlkZU1lZGlhQ29udHJvbCA9PT0gZmFsc2UpIHJldHVyblxuICAgIGlmICh0aGlzLmtlZXBWaXNpYmxlIHx8IHRoaXMuZHJhZ2dpbmdTZWVrQmFyIHx8IHRoaXMuZHJhZ2dpbmdWb2x1bWVCYXIpIHtcbiAgICAgIHRoaXMuaGlkZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGltZW91dClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfSElERSwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtaGlkZScpXG4gICAgICB0aGlzLmhpZGVWb2x1bWVCYXIoKVxuICAgIH1cbiAgfVxuXG4gIHNldHRpbmdzVXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh0aGlzLmNvbnRhaW5lci5zZXR0aW5ncykubGVuZ3RoICE9PSAwKSB7XG4gICAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5jb250YWluZXIuc2V0dGluZ3NcbiAgICAgIHRoaXMucmVuZGVyKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9XG4gIH1cblxuICBoaWdoRGVmaW5pdGlvblVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkpIHtcbiAgICAgIHRoaXMuJGVsLmZpbmQoJ2J1dHRvbltkYXRhLWhkLWluZGljYXRvcl0nKS5hZGRDbGFzcyhcImVuYWJsZWRcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWwuZmluZCgnYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXScpLnJlbW92ZUNsYXNzKFwiZW5hYmxlZFwiKVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUNhY2hlZEVsZW1lbnRzKCkge1xuICAgIHRoaXMuJHBsYXlQYXVzZVRvZ2dsZSA9IHRoaXMuJGVsLmZpbmQoJ2J1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlwYXVzZV0nKVxuICAgIHRoaXMuJHBsYXlTdG9wVG9nZ2xlID0gdGhpcy4kZWwuZmluZCgnYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3BdJylcbiAgICB0aGlzLiRmdWxsc2NyZWVuVG9nZ2xlID0gdGhpcy4kZWwuZmluZCgnYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtZnVsbHNjcmVlbl0nKVxuICAgIHRoaXMuJHNlZWtCYXJDb250YWluZXIgPSB0aGlzLiRlbC5maW5kKCcuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdJylcbiAgICB0aGlzLiRzZWVrQmFyTG9hZGVkID0gdGhpcy4kZWwuZmluZCgnLmJhci1maWxsLTFbZGF0YS1zZWVrYmFyXScpXG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uID0gdGhpcy4kZWwuZmluZCgnLmJhci1maWxsLTJbZGF0YS1zZWVrYmFyXScpXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyID0gdGhpcy4kZWwuZmluZCgnLmJhci1zY3J1YmJlcltkYXRhLXNlZWtiYXJdJylcbiAgICB0aGlzLiRzZWVrQmFySG92ZXIgPSB0aGlzLiRlbC5maW5kKCcuYmFyLWhvdmVyW2RhdGEtc2Vla2Jhcl0nKVxuICAgIHRoaXMuJHZvbHVtZUNvbnRhaW5lciA9IHRoaXMuJGVsLmZpbmQoJy5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXScpXG4gICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyID0gdGhpcy4kZWwuZmluZCgnLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdJylcbiAgICB0aGlzLiR2b2x1bWVJY29uID0gdGhpcy4kZWwuZmluZCgnLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXScpXG4gIH1cblxuICBzZXRWb2x1bWVMZXZlbCh2YWx1ZSkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIuaXNSZWFkeSB8fCAhdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLmxpc3RlblRvT25jZSh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9SRUFEWSwgKCkgPT4gdGhpcy5zZXRWb2x1bWVMZXZlbCh2YWx1ZSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci5maW5kKCcuc2VnbWVudGVkLWJhci1lbGVtZW50JykucmVtb3ZlQ2xhc3MoJ2ZpbGwnKVxuICAgICAgdmFyIGl0ZW0gPSBNYXRoLmNlaWwodmFsdWUgLyAxMC4wKVxuICAgICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLmZpbmQoJy5zZWdtZW50ZWQtYmFyLWVsZW1lbnQnKS5zbGljZSgwLCBpdGVtKS5hZGRDbGFzcygnZmlsbCcpXG4gICAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgIHRoaXMuJHZvbHVtZUljb24ucmVtb3ZlQ2xhc3MoJ211dGVkJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJHZvbHVtZUljb24uYWRkQ2xhc3MoJ211dGVkJylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRTZWVrUGVyY2VudGFnZSh2YWx1ZSkge1xuICAgIHZhbHVlID0gTWF0aC5taW4odmFsdWUsIDEwMC4wKVxuICAgIHZhciBwb3MgPSAodGhpcy4kc2Vla0JhckNvbnRhaW5lci53aWR0aCgpICogdmFsdWUgLyAxMDAuMCkgLSAodGhpcy4kc2Vla0JhclNjcnViYmVyLndpZHRoKCkgLyAyLjApXG4gICAgdGhpcy5jdXJyZW50U2Vla1BlcmNlbnRhZ2UgPSB2YWx1ZTtcbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24uY3NzKHsgd2lkdGg6IHZhbHVlICsgJyUnIH0pXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyLmNzcyh7IGxlZnQ6IHBvcyB9KVxuICB9XG5cbiAgc2Vla1JlbGF0aXZlKGRlbHRhKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkgcmV0dXJuXG4gICAgdmFyIGN1cnJlbnRUaW1lID0gdGhpcy5jb250YWluZXIuZ2V0Q3VycmVudFRpbWUoKVxuICAgIHZhciBkdXJhdGlvbiA9IHRoaXMuY29udGFpbmVyLmdldER1cmF0aW9uKClcbiAgICB2YXIgcG9zaXRpb24gPSBNYXRoLm1pbihNYXRoLm1heChjdXJyZW50VGltZSArIGRlbHRhLCAwKSwgZHVyYXRpb24pXG4gICAgcG9zaXRpb24gPSBNYXRoLm1pbihwb3NpdGlvbiAqIDEwMCAvIGR1cmF0aW9uLCAxMDApXG4gICAgdGhpcy5jb250YWluZXIuc2V0Q3VycmVudFRpbWUocG9zaXRpb24pXG4gIH1cblxuICBiaW5kS2V5RXZlbnRzKCkge1xuICAgIHRoaXMua2liby5kb3duKFsnc3BhY2UnXSwgKCkgPT4gdGhpcy50b2dnbGVQbGF5UGF1c2UoKSlcbiAgICB0aGlzLmtpYm8uZG93bihbJ2xlZnQnXSwgKCkgPT4gdGhpcy5zZWVrUmVsYXRpdmUoLTE1KSlcbiAgICB0aGlzLmtpYm8uZG93bihbJ3JpZ2h0J10sICgpID0+IHRoaXMuc2Vla1JlbGF0aXZlKDE1KSlcbiAgICB2YXIga2V5cyA9IFsxLDIsMyw0LDUsNiw3LDgsOSwwXVxuICAgIGtleXMuZm9yRWFjaCgoaSkgPT4geyB0aGlzLmtpYm8uZG93bihpLnRvU3RyaW5nKCksICgpID0+IHRoaXMuY29udGFpbmVyLnNldHRpbmdzLnNlZWtFbmFibGVkICYmIHRoaXMuY29udGFpbmVyLnNldEN1cnJlbnRUaW1lKGkgKiAxMCkpIH0pXG4gIH1cblxuICB1bmJpbmRLZXlFdmVudHMoKSB7XG4gICAgdGhpcy5raWJvLm9mZignc3BhY2UnKVxuICAgIHRoaXMua2liby5vZmYoWzEsMiwzLDQsNSw2LDcsOCw5LDBdKVxuICB9XG5cbiAgcGFyc2VDb2xvcnMoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5tZWRpYWNvbnRyb2wpIHtcbiAgICAgIHZhciBidXR0b25zQ29sb3IgPSB0aGlzLm9wdGlvbnMubWVkaWFjb250cm9sLmJ1dHRvbnM7XG4gICAgICB2YXIgc2Vla2JhckNvbG9yID0gdGhpcy5vcHRpb25zLm1lZGlhY29udHJvbC5zZWVrYmFyO1xuICAgICAgdGhpcy4kZWwuZmluZCgnLmJhci1maWxsLTJbZGF0YS1zZWVrYmFyXScpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHNlZWtiYXJDb2xvcilcbiAgICAgIHRoaXMuJGVsLmZpbmQoJ1tkYXRhLW1lZGlhLWNvbnRyb2xdID4gLm1lZGlhLWNvbnRyb2wtaWNvbiwgLmRyYXdlci1pY29uJykuY3NzKCdjb2xvcicsIGJ1dHRvbnNDb2xvcilcbiAgICAgIHRoaXMuJGVsLmZpbmQoJy5zZWdtZW50ZWQtYmFyLWVsZW1lbnRbZGF0YS12b2x1bWVdJykuY3NzKCdib3hTaGFkb3cnLCBcImluc2V0IDJweCAwIDAgXCIgKyBidXR0b25zQ29sb3IpXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAkKGRvY3VtZW50KS51bmJpbmQoJ21vdXNldXAnKVxuICAgICQoZG9jdW1lbnQpLnVuYmluZCgnbW91c2Vtb3ZlJylcbiAgICB0aGlzLnVuYmluZEtleUV2ZW50cygpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHRpbWVvdXQgPSAxMDAwXG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKCdtZWRpYV9jb250cm9sJywge2Jhc2VVcmw6IHRoaXMub3B0aW9ucy5iYXNlVXJsfSk7XG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHsgc2V0dGluZ3M6IHRoaXMuc2V0dGluZ3MgfSkpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHRoaXMuY3JlYXRlQ2FjaGVkRWxlbWVudHMoKVxuICAgIHRoaXMuJHBsYXlQYXVzZVRvZ2dsZS5hZGRDbGFzcygncGF1c2VkJylcbiAgICB0aGlzLiRwbGF5U3RvcFRvZ2dsZS5hZGRDbGFzcygnc3RvcHBlZCcpXG5cbiAgICBpZiAodGhpcy5raWJvKSB7XG4gICAgICB0aGlzLnVuYmluZEtleUV2ZW50cygpXG4gICAgfVxuICAgIHRoaXMua2libyA9IG5ldyBLaWJvKHRoaXMub3B0aW9ucy5mb2N1c0VsZW1lbnQpXG5cbiAgICB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkoKVxuICAgIHRoaXMuaGlkZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGltZW91dClcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5oaWRlKClcbiAgICB9XG5cbiAgICBpZihCcm93c2VyLmlzU2FmYXJpICYmIEJyb3dzZXIuaXNNb2JpbGUpIHtcbiAgICAgIHRoaXMuJHZvbHVtZUNvbnRhaW5lci5jc3MoJ2Rpc3BsYXknLCdub25lJylcbiAgICB9XG5cbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24uYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB0aGlzLiRzZWVrQmFyU2NydWJiZXIuYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcblxuICAgIGlmICghdGhpcy5jdXJyZW50U2Vla1BlcmNlbnRhZ2UpIHtcbiAgICAgIHRoaXMuY3VycmVudFNlZWtQZXJjZW50YWdlID0gMFxuICAgIH1cbiAgICB0aGlzLnNldFNlZWtQZXJjZW50YWdlKHRoaXMuY3VycmVudFNlZWtQZXJjZW50YWdlKVxuXG4gICAgdGhpcy4kZWwucmVhZHkoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkge1xuICAgICAgICB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLmFkZENsYXNzKCdzZWVrLWRpc2FibGVkJylcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgICAgdGhpcy5iaW5kS2V5RXZlbnRzKClcbiAgICAgIHRoaXMuaGlkZVZvbHVtZUJhcigpXG4gICAgfSlcblxuICAgIHRoaXMucGFyc2VDb2xvcnMoKVxuICAgIHRoaXMuc2Vla1RpbWUucmVuZGVyKClcbiAgICB0aGlzLmhpZ2hEZWZpbml0aW9uVXBkYXRlKClcblxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX1JFTkRFUkVEKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNZWRpYUNvbnRyb2xcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnLi4vYmFzZS9iYXNlX29iamVjdCcpXG52YXIgQ29yZUZhY3RvcnkgPSByZXF1aXJlKCcuL2NvcmVfZmFjdG9yeScpXG52YXIgTG9hZGVyID0gcmVxdWlyZSgnLi9sb2FkZXInKVxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2xvZGFzaC5hc3NpZ24nKVxudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcbnZhciB1bmlxdWVJZCA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbHMnKS51bmlxdWVJZFxudmFyIFBsYXllckluZm8gPSByZXF1aXJlKCcuL3BsYXllcl9pbmZvJylcblxuY2xhc3MgUGxheWVyIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHdpbmRvdy5wID0gdGhpc1xuICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtwbGF5ZXJJZDogdW5pcXVlSWQoXCJcIiksIHBlcnNpc3RDb25maWc6IHRydWUsIHdpZHRoOiA2NDAsIGhlaWdodDogMzYwLCBiYXNlVXJsOiAnaHR0cDovL2Nkbi5jbGFwcHIuaW8vbGF0ZXN0J31cbiAgICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpXG4gICAgdGhpcy5vcHRpb25zLnNvdXJjZXMgPSB0aGlzLm5vcm1hbGl6ZVNvdXJjZXMob3B0aW9ucylcbiAgICB0aGlzLmxvYWRlciA9IG5ldyBMb2FkZXIodGhpcy5vcHRpb25zLnBsdWdpbnMgfHwge30pXG4gICAgdGhpcy5jb3JlRmFjdG9yeSA9IG5ldyBDb3JlRmFjdG9yeSh0aGlzLCB0aGlzLmxvYWRlcilcbiAgICBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplID0ge3dpZHRoOiBvcHRpb25zLndpZHRoLCBoZWlnaHQ6IG9wdGlvbnMuaGVpZ2h0fVxuICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50SWQpIHtcbiAgICAgIHRoaXMuc2V0UGFyZW50SWQodGhpcy5vcHRpb25zLnBhcmVudElkKVxuICAgIH1cbiAgfVxuXG4gIHNldFBhcmVudElkKHBhcmVudElkKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXJlbnRJZClcbiAgICBpZiAoZWwpIHtcbiAgICAgIHRoaXMuYXR0YWNoVG8oZWwpXG4gICAgfVxuICB9XG5cbiAgYXR0YWNoVG8oZWxlbWVudCkge1xuICAgIHRoaXMub3B0aW9ucy5wYXJlbnRFbGVtZW50ID0gZWxlbWVudFxuICAgIHRoaXMuY29yZSA9IHRoaXMuY29yZUZhY3RvcnkuY3JlYXRlKClcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKClcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb3JlLm1lZGlhQ29udHJvbCwgIEV2ZW50cy5NRURJQUNPTlRST0xfQ09OVEFJTkVSQ0hBTkdFRCwgdGhpcy5jb250YWluZXJDaGFuZ2VkKVxuICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lclxuICAgIGlmICghIWNvbnRhaW5lcikge1xuICAgICAgdGhpcy5saXN0ZW5Ubyhjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWSwgdGhpcy5vblBsYXkpXG4gICAgICB0aGlzLmxpc3RlblRvKGNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QQVVTRSwgdGhpcy5vblBhdXNlKVxuICAgICAgdGhpcy5saXN0ZW5Ubyhjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5vblN0b3ApXG4gICAgICB0aGlzLmxpc3RlblRvKGNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcy5vbkVuZGVkKVxuICAgICAgdGhpcy5saXN0ZW5Ubyhjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VFSywgdGhpcy5vblNlZWspXG4gICAgICB0aGlzLmxpc3RlblRvKGNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FUlJPUiwgdGhpcy5vbkVycm9yKVxuICAgICAgdGhpcy5saXN0ZW5Ubyhjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfVElNRVVQREFURSwgdGhpcy5vblRpbWVVcGRhdGUpXG4gICAgfVxuICB9XG5cbiAgY29udGFpbmVyQ2hhbmdlZCgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUVSX1BMQVkpXG4gIH1cblxuICBvblBhdXNlKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUVSX1BBVVNFKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUVSX1NUT1AsIHRoaXMuZ2V0Q3VycmVudFRpbWUoKSlcbiAgfVxuXG4gIG9uRW5kZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZRVJfRU5ERUQpXG4gIH1cblxuICBvblNlZWsocGVyY2VudCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUVSX1NFRUssIHBlcmNlbnQpXG4gIH1cblxuICBvblRpbWVVcGRhdGUocG9zaXRpb24sIGR1cmF0aW9uKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZRVJfVElNRVVQREFURSwgcG9zaXRpb24sIGR1cmF0aW9uKVxuICB9XG5cbiAgb25FcnJvcihlcnJvcikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUVSX0VSUk9SLCBlcnJvcilcbiAgfVxuXG4gIGlzKHZhbHVlLCB0eXBlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yID09PSB0eXBlXG4gIH1cblxuICBub3JtYWxpemVTb3VyY2VzKG9wdGlvbnMpIHtcbiAgICB2YXIgc291cmNlcyA9IG9wdGlvbnMuc291cmNlcyB8fCAob3B0aW9ucy5zb3VyY2UgIT09IHVuZGVmaW5lZD8gW29wdGlvbnMuc291cmNlLnRvU3RyaW5nKCldIDogW10pXG4gICAgcmV0dXJuIHNvdXJjZXMubGVuZ3RoID09PSAwID8gWyduby5vcCddIDogc291cmNlc1xuICB9XG5cbiAgcmVzaXplKHNpemUpIHtcbiAgICB0aGlzLmNvcmUucmVzaXplKHNpemUpO1xuICB9XG5cbiAgbG9hZChzb3VyY2VzLCBtaW1lVHlwZSkge1xuICAgIHRoaXMuY29yZS5sb2FkKHNvdXJjZXMsIG1pbWVUeXBlKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmNvcmUuZGVzdHJveSgpXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnBsYXkoKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnBhdXNlKCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnN0b3AoKTtcbiAgfVxuXG4gIHNlZWsodGltZSkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldEN1cnJlbnRUaW1lKHRpbWUpO1xuICB9XG5cbiAgc2V0Vm9sdW1lKHZvbHVtZSkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICB9XG5cbiAgbXV0ZSgpIHtcbiAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5zZXRWb2x1bWUoMCk7XG4gIH1cblxuICB1bm11dGUoKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc2V0Vm9sdW1lKDEwMCk7XG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLmlzUGxheWluZygpO1xuICB9XG5cbiAgZ2V0UGx1Z2luKG5hbWUpIHtcbiAgICB2YXIgcGx1Z2lucyA9IHRoaXMuY29yZS5wbHVnaW5zLmNvbmNhdCh0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5wbHVnaW5zKTtcbiAgICByZXR1cm4gZmluZChwbHVnaW5zLCBmdW5jdGlvbihwbHVnaW4pIHtcbiAgICAgIHJldHVybiBwbHVnaW4ubmFtZSA9PT0gbmFtZTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5nZXRDdXJyZW50VGltZSgpXG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuZ2V0RHVyYXRpb24oKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc2Vla190aW1lJyk7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgVUlPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3VpX29iamVjdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBmb3JtYXRUaW1lID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpLmZvcm1hdFRpbWVcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG5cbmNsYXNzIFNlZWtUaW1lIGV4dGVuZHMgVUlPYmplY3Qge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdzZWVrX3RpbWUnIH1cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBKU1Quc2Vla190aW1lO1xuICB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAnc2Vlay10aW1lIGhpZGRlbicsXG4gICAgICAnZGF0YS1zZWVrLXRpbWUnOiAnJ1xuICAgIH07XG4gIH1cbiAgY29uc3RydWN0b3IobWVkaWFDb250cm9sKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMubWVkaWFDb250cm9sID0gbWVkaWFDb250cm9sXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpXG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX01PVVNFTU9WRV9TRUVLQkFSLCB0aGlzLnNob3dUaW1lKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5tZWRpYUNvbnRyb2wsIEV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VMRUFWRV9TRUVLQkFSLCB0aGlzLmhpZGVUaW1lKVxuICB9XG5cbiAgc2hvd1RpbWUoZXZlbnQpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZXZlbnQucGFnZVggLSB0aGlzLm1lZGlhQ29udHJvbC4kc2Vla0JhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0XG4gICAgdmFyIHRpbWVQb3NpdGlvbiA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoKG9mZnNldCkgLyB0aGlzLm1lZGlhQ29udHJvbC4kc2Vla0JhckNvbnRhaW5lci53aWR0aCgpICogMTAwLCAwKSlcbiAgICB2YXIgcG9pbnRlclBvc2l0aW9uID0gZXZlbnQucGFnZVggLSB0aGlzLm1lZGlhQ29udHJvbC4kZWwub2Zmc2V0KCkubGVmdFxuICAgIHBvaW50ZXJQb3NpdGlvbiA9IE1hdGgubWluKE1hdGgubWF4KDAsIHBvaW50ZXJQb3NpdGlvbiksIHRoaXMubWVkaWFDb250cm9sLiRlbC53aWR0aCgpIC0gdGhpcy4kZWwud2lkdGgoKSlcbiAgICB2YXIgY3VycmVudFRpbWUgPSB0aW1lUG9zaXRpb24gKiB0aGlzLm1lZGlhQ29udHJvbC5jb250YWluZXIuZ2V0RHVyYXRpb24oKSAvIDEwMFxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgdGltZXN0YW1wOiBjdXJyZW50VGltZSxcbiAgICAgIGZvcm1hdHRlZFRpbWU6IGZvcm1hdFRpbWUoY3VycmVudFRpbWUpLFxuICAgICAgcG9pbnRlclBvc2l0aW9uOiBwb2ludGVyUG9zaXRpb25cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZShvcHRpb25zKVxuICB9XG5cbiAgaGlkZVRpbWUoKSB7XG4gICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gICAgdGhpcy4kZWwuY3NzKCdsZWZ0JywgJy0xMDAlJylcbiAgfVxuXG4gIHVwZGF0ZShvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMubWVkaWFDb250cm9sLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkge1xuICAgICAgdGhpcy4kZWwuZmluZCgnW2RhdGEtc2Vlay10aW1lXScpLnRleHQob3B0aW9ucy5mb3JtYXR0ZWRUaW1lKVxuICAgICAgdGhpcy4kZWwuY3NzKCdsZWZ0Jywgb3B0aW9ucy5wb2ludGVyUG9zaXRpb24gLSAodGhpcy4kZWwud2lkdGgoKSAvIDIpKVxuICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSk7XG4gICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSk7XG4gICAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpO1xuICAgICAgdGhpcy5tZWRpYUNvbnRyb2wuJGVsLmFwcGVuZCh0aGlzLmVsKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlZWtUaW1lO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXliYWNrID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9wbGF5YmFjaycpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvbWVkaWF0b3InKVxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi4vLi4vYmFzZS90ZW1wbGF0ZScpXG52YXIgJCA9IHJlcXVpcmUoJ2NsYXBwci16ZXB0bycpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnJvd3NlcicpXG52YXIgc2Vla1N0cmluZ1RvU2Vjb25kcyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdXRpbHMnKS5zZWVrU3RyaW5nVG9TZWNvbmRzXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxuXG52YXIgb2JqZWN0SUUgPSAnPG9iamVjdCB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBpZD1cIjwlPSBjaWQgJT5cIiBjbGFzc2lkPVwiY2xzaWQ6ZDI3Y2RiNmUtYWU2ZC0xMWNmLTk2YjgtNDQ0NTUzNTQwMDAwXCIgZGF0YS1mbGFzaC12b2Q9XCJcIj48cGFyYW0gbmFtZT1cIm1vdmllXCIgdmFsdWU9XCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLnN3ZlwiPiA8cGFyYW0gbmFtZT1cInF1YWxpdHlcIiB2YWx1ZT1cImF1dG9oaWdoXCI+IDxwYXJhbSBuYW1lPVwic3dsaXZlY29ubmVjdFwiIHZhbHVlPVwidHJ1ZVwiPiA8cGFyYW0gbmFtZT1cImFsbG93U2NyaXB0QWNjZXNzXCIgdmFsdWU9XCJhbHdheXNcIj4gPHBhcmFtIG5hbWU9XCJiZ2NvbG9yXCIgdmFsdWU9XCIjMDAxMTIyXCI+IDxwYXJhbSBuYW1lPVwiYWxsb3dGdWxsU2NyZWVuXCIgdmFsdWU9XCJmYWxzZVwiPiA8cGFyYW0gbmFtZT1cIndtb2RlXCIgdmFsdWU9XCJncHVcIj4gPHBhcmFtIG5hbWU9XCJ0YWJpbmRleFwiIHZhbHVlPVwiMVwiPiA8cGFyYW0gbmFtZT1GbGFzaFZhcnMgdmFsdWU9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgLz4gPC9vYmplY3Q+J1xuXG5jbGFzcyBGbGFzaCBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnZmxhc2gnIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnb2JqZWN0JyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5mbGFzaCB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5zcmMgPSBvcHRpb25zLnNyY1xuICAgIHRoaXMuYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybFxuICAgIHRoaXMuYXV0b1BsYXkgPSBvcHRpb25zLmF1dG9QbGF5XG4gICAgdGhpcy5zZXR0aW5ncyA9IHtkZWZhdWx0OiBbJ3NlZWtiYXInXX1cbiAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSBbXCJwbGF5cGF1c2VcIiwgXCJwb3NpdGlvblwiLCBcImR1cmF0aW9uXCJdXG4gICAgdGhpcy5zZXR0aW5ncy5yaWdodCA9IFtcImZ1bGxzY3JlZW5cIiwgXCJ2b2x1bWVcIl1cbiAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gdHJ1ZVxuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlXG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKVxuICB9XG5cblxuICBib290c3RyYXAoKSB7XG4gICAgdGhpcy5lbC53aWR0aCA9IFwiMTAwJVwiXG4gICAgdGhpcy5lbC5oZWlnaHQgPSBcIjEwMCVcIlxuICAgIHRoaXMuaXNSZWFkeSA9IHRydWVcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgPT09ICdQTEFZSU5HJykge1xuICAgICAgdGhpcy5maXJzdFBsYXkoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiSURMRVwiXG4gICAgICB0aGlzLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpXG4gICAgfVxuICAgICQoJzxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJVwiIC8+JykuaW5zZXJ0QWZ0ZXIodGhpcy4kZWwpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiAndm9kJ1xuICB9XG5cbiAgc2V0dXBGaXJlZm94KCkge1xuICAgIHZhciAkZWwgPSB0aGlzLiQoJ2VtYmVkJylcbiAgICAkZWwuYXR0cignZGF0YS1mbGFzaCcsICcnKVxuICAgIHRoaXMuc2V0RWxlbWVudCgkZWxbMF0pXG4gIH1cblxuICBpc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB1cGRhdGVUaW1lKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy5lbC5nZXRQb3NpdGlvbigpLCB0aGlzLmVsLmdldER1cmF0aW9uKCksIHRoaXMubmFtZSlcbiAgfVxuXG4gIGFkZExpc3RlbmVycygpIHtcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpwcm9ncmVzcycsIHRoaXMucHJvZ3Jlc3MsIHRoaXMpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6dGltZXVwZGF0ZScsIHRoaXMudXBkYXRlVGltZSwgdGhpcylcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpzdGF0ZWNoYW5nZWQnLCB0aGlzLmNoZWNrU3RhdGUsIHRoaXMpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScsIHRoaXMuYm9vdHN0cmFwLCB0aGlzKVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6cHJvZ3Jlc3MnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzp0aW1ldXBkYXRlJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6c3RhdGVjaGFuZ2VkJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScpXG4gIH1cblxuICBjaGVja1N0YXRlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gXCJQQVVTRURcIikge1xuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSAhPT0gXCJQTEFZSU5HX0JVRkZFUklOR1wiICYmIHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gXCJQTEFZSU5HX0JVRkZFUklOR1wiKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdfQlVGRkVSSU5HXCJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gXCJQTEFZSU5HXCIpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgIH0gZWxzZSBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpID09PSBcIklETEVcIikge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIklETEVcIlxuICAgIH0gZWxzZSBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpID09PSBcIkVOREVEXCIpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfRU5ERUQsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5lbC5nZXREdXJhdGlvbigpLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiRU5ERURcIlxuICAgIH1cbiAgfVxuXG4gIHByb2dyZXNzKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSAhPT0gXCJJRExFXCIgJiYgdGhpcy5jdXJyZW50U3RhdGUgIT09IFwiRU5ERURcIikge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgMCwgdGhpcy5lbC5nZXRCeXRlc0xvYWRlZCgpLCB0aGlzLmVsLmdldEJ5dGVzVG90YWwoKSwgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIGZpcnN0UGxheSgpIHtcbiAgICBpZiAodGhpcy5lbC5wbGF5ZXJQbGF5KSB7XG4gICAgICB0aGlzLmVsLnBsYXllclBsYXkodGhpcy5zcmMpXG4gICAgICB0aGlzLmxpc3RlblRvT25jZSh0aGlzLCBFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgKCkgPT4gdGhpcy5jaGVja0luaXRpYWxTZWVrKCkpXG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiUExBWUlOR1wiXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdGVuVG9PbmNlKHRoaXMsIEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5maXJzdFBsYXkpXG4gICAgfVxuICB9XG5cbiAgY2hlY2tJbml0aWFsU2VlaygpIHtcbiAgICB2YXIgc2Vla1RpbWUgPSBzZWVrU3RyaW5nVG9TZWNvbmRzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgIGlmIChzZWVrVGltZSAhPT0gMCkge1xuICAgICAgdGhpcy5zZWVrU2Vjb25kcyhzZWVrVGltZSlcbiAgICB9XG4gIH1cblxuICBwbGF5KCkge1xuICAgIGlmICh0aGlzLmVsLmdldFN0YXRlKCkgPT09ICdQQVVTRUQnIHx8IHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gJ1BMQVlJTkdfQlVGRkVSSU5HJykge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgICAgdGhpcy5lbC5wbGF5ZXJSZXN1bWUoKVxuICAgIH0gZWxzZSBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpICE9PSAnUExBWUlORycpIHtcbiAgICAgIHRoaXMuZmlyc3RQbGF5KClcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZLCB0aGlzLm5hbWUpXG4gIH1cblxuICB2b2x1bWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5pc1JlYWR5KSB7XG4gICAgICB0aGlzLmVsLnBsYXllclZvbHVtZSh2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5Ub09uY2UodGhpcywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsICgpID0+IHRoaXMudm9sdW1lKHZhbHVlKSlcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiUEFVU0VEXCJcbiAgICB0aGlzLmVsLnBsYXllclBhdXNlKClcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5lbC5wbGF5ZXJTdG9wKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDAsIHRoaXMubmFtZSlcbiAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gISEodGhpcy5pc1JlYWR5ICYmIHRoaXMuY3VycmVudFN0YXRlLmluZGV4T2YoXCJQTEFZSU5HXCIpID4gLTEpXG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5nZXREdXJhdGlvbigpXG4gIH1cblxuICBzZWVrKHNlZWtCYXJWYWx1ZSkge1xuICAgIHZhciBzZWVrVG8gPSB0aGlzLmVsLmdldER1cmF0aW9uKCkgKiAoc2Vla0JhclZhbHVlIC8gMTAwKVxuICAgIHRoaXMuc2Vla1NlY29uZHMoc2Vla1RvKVxuICB9XG5cbiAgc2Vla1NlY29uZHMoc2Vla1RvKSB7XG4gICAgdGhpcy5lbC5wbGF5ZXJTZWVrKHNlZWtUbylcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHNlZWtUbywgdGhpcy5lbC5nZXREdXJhdGlvbigpLCB0aGlzLm5hbWUpXG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXRlID09PSBcIlBBVVNFRFwiKSB7XG4gICAgICB0aGlzLmVsLnBsYXllclBhdXNlKClcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5ib290c3RyYXBJZClcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICB9XG5cbiAgc2V0dXBJRSgpIHtcbiAgICB0aGlzLnNldEVsZW1lbnQoJCh0ZW1wbGF0ZShvYmplY3RJRSkoeyBjaWQ6IHRoaXMuY2lkLCBiYXNlVXJsOiB0aGlzLmJhc2VVcmwsIHBsYXliYWNrSWQ6IHRoaXMudW5pcXVlSWQgfSkpKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpXG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHsgY2lkOiB0aGlzLmNpZCwgYmFzZVVybDogdGhpcy5iYXNlVXJsLCBwbGF5YmFja0lkOiB0aGlzLnVuaXF1ZUlkIH0pKVxuICAgIGlmKEJyb3dzZXIuaXNGaXJlZm94KSB7XG4gICAgICB0aGlzLnNldHVwRmlyZWZveCgpXG4gICAgfSBlbHNlIGlmKEJyb3dzZXIuaXNMZWdhY3lJRSkge1xuICAgICAgdGhpcy5zZXR1cElFKClcbiAgICB9XG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuRmxhc2guY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlKSB7XG4gIGlmICghQnJvd3Nlci5oYXNGbGFzaCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9IGVsc2UgaWYgKCghQnJvd3Nlci5pc01vYmlsZSAmJiBCcm93c2VyLmlzRmlyZWZveCkgfHwgQnJvd3Nlci5pc0xlZ2FjeUlFKSB7XG4gICAgcmV0dXJuIChyZXNvdXJjZSAmJiByZXNvdXJjZS5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nKSAmJiAhIXJlc291cmNlLm1hdGNoKC8oLiopXFwuKG1wNHxtb3Z8ZjR2fDNncHB8M2dwKS8pXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChyZXNvdXJjZSAmJiByZXNvdXJjZS5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nKSAmJiAhIXJlc291cmNlLm1hdGNoKC8oLiopXFwuKG1vdnxmNHZ8M2dwcHwzZ3ApLylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3BsYXliYWNrJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3RlbXBsYXRlJylcblxudmFyIE1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9tZWRpYXRvcicpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnJvd3NlcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJylcblxudmFyIG9iamVjdElFID0gJzxvYmplY3QgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIgaWQ9XCI8JT0gY2lkICU+XCIgY2xhc3M9XCJobHMtcGxheWJhY2tcIiBjbGFzc2lkPVwiY2xzaWQ6ZDI3Y2RiNmUtYWU2ZC0xMWNmLTk2YjgtNDQ0NTUzNTQwMDAwXCIgZGF0YS1obHM9XCJcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PHBhcmFtIG5hbWU9XCJtb3ZpZVwiIHZhbHVlPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL0hMU1BsYXllci5zd2ZcIj4gPHBhcmFtIG5hbWU9XCJxdWFsaXR5XCIgdmFsdWU9XCJhdXRvaGlnaFwiPiA8cGFyYW0gbmFtZT1cInN3bGl2ZWNvbm5lY3RcIiB2YWx1ZT1cInRydWVcIj4gPHBhcmFtIG5hbWU9XCJhbGxvd1NjcmlwdEFjY2Vzc1wiIHZhbHVlPVwiYWx3YXlzXCI+IDxwYXJhbSBuYW1lPVwiYmdjb2xvclwiIHZhbHVlPVwiIzAwMTEyMlwiPiA8cGFyYW0gbmFtZT1cImFsbG93RnVsbFNjcmVlblwiIHZhbHVlPVwiZmFsc2VcIj4gPHBhcmFtIG5hbWU9XCJ3bW9kZVwiIHZhbHVlPVwidHJhbnNwYXJlbnRcIj4gPHBhcmFtIG5hbWU9XCJ0YWJpbmRleFwiIHZhbHVlPVwiMVwiPiA8cGFyYW0gbmFtZT1GbGFzaFZhcnMgdmFsdWU9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgLz4gPC9vYmplY3Q+J1xuXG5jbGFzcyBITFMgZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2hscycgfVxuICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdvYmplY3QnIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULmhscyB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAnaGxzLXBsYXliYWNrJyxcbiAgICAgICdkYXRhLWhscyc6ICcnLFxuICAgICAgJ3R5cGUnOiAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuICAgICAgJ3dpZHRoJzogJzEwMCUnLFxuICAgICAgJ2hlaWdodCc6ICcxMDAlJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc3JjID0gb3B0aW9ucy5zcmNcbiAgICB0aGlzLmJhc2VVcmwgPSBvcHRpb25zLmJhc2VVcmw7XG4gICAgdGhpcy5mbHVzaExpdmVVUkxDYWNoZSA9IChvcHRpb25zLmZsdXNoTGl2ZVVSTENhY2hlID09PSB1bmRlZmluZWQpPyB0cnVlOiBvcHRpb25zLmZsdXNoTGl2ZVVSTENhY2hlXG4gICAgdGhpcy5jYXBMZXZlbFRvU3RhZ2UgPSAob3B0aW9ucy5jYXBMZXZlbFRvU3RhZ2UgPT09IHVuZGVmaW5lZCk/IGZhbHNlOiBvcHRpb25zLmNhcExldmVsVG9TdGFnZVxuICAgIHRoaXMubWF4QnVmZmVyTGVuZ3RoID0gb3B0aW9ucy5tYXhCdWZmZXJMZW5ndGggfHwgMTIwXG4gICAgdGhpcy5oaWdoRGVmaW5pdGlvbiA9IGZhbHNlXG4gICAgdGhpcy5hdXRvUGxheSA9IG9wdGlvbnMuYXV0b1BsYXlcbiAgICB0aGlzLmRlZmF1bHRTZXR0aW5ncyA9IHtcbiAgICAgIGxlZnQ6IFtcInBsYXlzdG9wXCJdLFxuICAgICAgZGVmYXVsdDogWydzZWVrYmFyJ10sXG4gICAgICByaWdodDogW1wiZnVsbHNjcmVlblwiLCBcInZvbHVtZVwiLCBcImhkLWluZGljYXRvclwiXSxcbiAgICAgIHNlZWtFbmFibGVkOiBmYWxzZVxuICAgIH1cbiAgICB0aGlzLnNldHRpbmdzID0gYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRTZXR0aW5ncylcbiAgICB0aGlzLnBsYXliYWNrVHlwZSA9ICdsaXZlJ1xuICAgIHRoaXMuYWRkTGlzdGVuZXJzKClcbiAgfVxuXG4gIGFkZExpc3RlbmVycygpIHtcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpmbGFzaHJlYWR5JywgKCkgPT4gdGhpcy5ib290c3RyYXAoKSlcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzp0aW1ldXBkYXRlJywgKCkgPT4gdGhpcy51cGRhdGVUaW1lKCkpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6cGxheWJhY2tzdGF0ZScsIChzdGF0ZSkgPT4gdGhpcy5zZXRQbGF5YmFja1N0YXRlKHN0YXRlKSlcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpsZXZlbGNoYW5nZWQnLCAoaXNIRCkgPT4gdGhpcy51cGRhdGVIaWdoRGVmaW5pdGlvbihpc0hEKSlcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpwbGF5YmFja2Vycm9yJywgKCkgPT4gdGhpcy5mbGFzaFBsYXliYWNrRXJyb3IoKSlcbiAgfVxuXG4gIHN0b3BMaXN0ZW5pbmcoKSB7XG4gICAgc3VwZXIuc3RvcExpc3RlbmluZygpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOmZsYXNocmVhZHknKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzp0aW1ldXBkYXRlJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6cGxheWJhY2tzdGF0ZScpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOmxldmVsY2hhbmdlZCcpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOnBsYXliYWNrZXJyb3InKVxuICB9XG5cbiAgYm9vdHN0cmFwKCkge1xuICAgIHRoaXMuZWwud2lkdGggPSBcIjEwMCVcIlxuICAgIHRoaXMuZWwuaGVpZ2h0ID0gXCIxMDAlXCJcbiAgICB0aGlzLmlzUmVhZHkgPSB0cnVlXG4gICAgdGhpcy5zcmNMb2FkZWQgPSBmYWxzZVxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJJRExFXCJcbiAgICB0aGlzLnNldEZsYXNoU2V0dGluZ3MoKVxuICAgIHRoaXMudXBkYXRlUGxheWJhY2tUeXBlKClcbiAgICB0aGlzLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgc2V0Rmxhc2hTZXR0aW5ncygpIHtcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyU2V0Zmx1c2hMaXZlVVJMQ2FjaGUodGhpcy5mbHVzaExpdmVVUkxDYWNoZSlcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyQ2FwTGV2ZWx0b1N0YWdlKHRoaXMuY2FwTGV2ZWxUb1N0YWdlKVxuICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJTZXRtYXhCdWZmZXJMZW5ndGgodGhpcy5tYXhCdWZmZXJMZW5ndGgpXG4gIH1cblxuICB1cGRhdGVIaWdoRGVmaW5pdGlvbihpc0hEKSB7XG4gICAgdGhpcy5oaWdoRGVmaW5pdGlvbiA9IChpc0hEID09PSBcImhkXCIpO1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfSElHSERFRklOSVRJT05VUERBVEUpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CSVRSQVRFLCB7J2JpdHJhdGUnOiB0aGlzLmdldEN1cnJlbnRCaXRyYXRlKCl9KVxuICB9XG5cbiAgdXBkYXRlVGltZSgpIHtcbiAgICB2YXIgZHVyYXRpb24gPSB0aGlzLmdldER1cmF0aW9uKClcbiAgICB2YXIgcG9zaXRpb24gPSBNYXRoLm1pbihNYXRoLm1heCh0aGlzLmVsLmdsb2JvR2V0UG9zaXRpb24oKSwgMCksIGR1cmF0aW9uKVxuICAgIHZhciBwcmV2aW91c0RWUlN0YXR1cyA9IHRoaXMuZHZyRW5hYmxlZFxuICAgIHZhciBsaXZlUGxheWJhY2sgPSAodGhpcy5wbGF5YmFja1R5cGUgPT09ICdsaXZlJylcbiAgICB0aGlzLmR2ckVuYWJsZWQgPSAobGl2ZVBsYXliYWNrICYmIGR1cmF0aW9uID4gMjQwKVxuXG4gICAgaWYgKGR1cmF0aW9uID09PSAxMDAgfHwgbGl2ZVBsYXliYWNrID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kdnJFbmFibGVkICE9PSBwcmV2aW91c0RWUlN0YXR1cykge1xuICAgICAgdGhpcy51cGRhdGVTZXR0aW5ncygpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFLCB0aGlzLm5hbWUpXG4gICAgfVxuXG4gICAgaWYgKGxpdmVQbGF5YmFjayAmJiAoIXRoaXMuZHZyRW5hYmxlZCB8fCAhdGhpcy5kdnJJblVzZSkpIHtcbiAgICAgIHBvc2l0aW9uID0gZHVyYXRpb25cbiAgICB9XG5cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHBvc2l0aW9uLCBkdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gJ1BBVVNFRCcpIHtcbiAgICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJSZXN1bWUoKVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuc3JjTG9hZGVkICYmIHRoaXMuY3VycmVudFN0YXRlICE9PSBcIlBMQVlJTkdcIikge1xuICAgICAgdGhpcy5maXJzdFBsYXkoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsLmdsb2JvUGxheWVyUGxheSgpXG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUExBWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXliYWNrVHlwZT8gdGhpcy5wbGF5YmFja1R5cGU6IG51bGxcbiAgfVxuXG4gIGdldEN1cnJlbnRCaXRyYXRlKCkge1xuICAgIHZhciBjdXJyZW50TGV2ZWwgPSB0aGlzLmdldExldmVscygpW3RoaXMuZWwuZ2xvYm9HZXRMZXZlbCgpXVxuICAgIHJldHVybiBjdXJyZW50TGV2ZWwuYml0cmF0ZVxuICB9XG5cbiAgaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkge1xuICAgIHJldHVybiB0aGlzLmhpZ2hEZWZpbml0aW9uXG4gIH1cblxuICBnZXRMZXZlbHMoKSB7XG4gICAgaWYgKCF0aGlzLmxldmVscyB8fCB0aGlzLmxldmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMubGV2ZWxzID0gdGhpcy5lbC5nbG9ib0dldExldmVscygpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxldmVsc1xuICB9XG5cbiAgc2V0UGxheWJhY2tTdGF0ZShzdGF0ZSkge1xuICAgIHZhciBidWZmZXJMZW5ndGggPSB0aGlzLmVsLmdsb2JvR2V0YnVmZmVyTGVuZ3RoKClcbiAgICBpZiAoW1wiUExBWUlOR19CVUZGRVJJTkdcIiwgXCJQQVVTRURfQlVGRkVSSU5HXCJdLmluZGV4T2Yoc3RhdGUpID49IDApICB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgICAgdGhpcy51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUpXG4gICAgfSBlbHNlIGlmIChbXCJQTEFZSU5HXCIsIFwiUEFVU0VEXCJdLmluZGV4T2Yoc3RhdGUpID49IDApIHtcbiAgICAgIGlmIChbXCJQTEFZSU5HX0JVRkZFUklOR1wiLCBcIlBBVVNFRF9CVUZGRVJJTkdcIiwgXCJQQVVTRURcIiwgXCJJRExFXCJdLmluZGV4T2YodGhpcy5jdXJyZW50U3RhdGUpID49IDApIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCB0aGlzLm5hbWUpXG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRTdGF0ZShzdGF0ZSlcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBcIklETEVcIikge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19FTkRFRCwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCAwLCB0aGlzLmVsLmdsb2JvR2V0RHVyYXRpb24oKSwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUpXG4gICAgfVxuICAgIHRoaXMubGFzdEJ1ZmZlckxlbmd0aCA9IGJ1ZmZlckxlbmd0aFxuICB9XG5cbiAgdXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlKSB7XG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZVxuICAgIHRoaXMudXBkYXRlUGxheWJhY2tUeXBlKClcbiAgfVxuXG4gIHVwZGF0ZVBsYXliYWNrVHlwZSgpIHtcbiAgICB0aGlzLnBsYXliYWNrVHlwZSA9IHRoaXMuZWwuZ2xvYm9HZXRUeXBlKClcbiAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUpIHtcbiAgICAgIHRoaXMucGxheWJhY2tUeXBlID0gdGhpcy5wbGF5YmFja1R5cGUudG9Mb3dlckNhc2UoKVxuICAgICAgaWYgKHRoaXMucGxheWJhY2tUeXBlID09PSAndm9kJykge1xuICAgICAgICB0aGlzLnN0YXJ0UmVwb3J0aW5nUHJvZ3Jlc3MoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdG9wUmVwb3J0aW5nUHJvZ3Jlc3MoKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BMQVlCQUNLU1RBVEUpXG4gIH1cblxuICBzdGFydFJlcG9ydGluZ1Byb2dyZXNzKCkge1xuICAgIGlmICghdGhpcy5yZXBvcnRpbmdQcm9ncmVzcykge1xuICAgICAgdGhpcy5yZXBvcnRpbmdQcm9ncmVzcyA9IHRydWVcbiAgICAgIE1lZGlhdG9yLm9uKHRoaXMudW5pcXVlSWQgKyAnOmZyYWdtZW50bG9hZGVkJywoKSA9PiB0aGlzLm9uRnJhZ21lbnRMb2FkZWQoKSlcbiAgICB9XG4gIH1cblxuICBzdG9wUmVwb3J0aW5nUHJvZ3Jlc3MoKSB7XG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMudW5pcXVlSWQgKyAnOmZyYWdtZW50bG9hZGVkJywgdGhpcy5vbkZyYWdtZW50TG9hZGVkLCB0aGlzKVxuICB9XG5cbiAgb25GcmFnbWVudExvYWRlZCgpIHtcbiAgICB2YXIgYnVmZmVyZWQgPSB0aGlzLmVsLmdsb2JvR2V0UG9zaXRpb24oKSArIHRoaXMuZWwuZ2xvYm9HZXRidWZmZXJMZW5ndGgoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUFJPR1JFU1MsIHRoaXMuZWwuZ2xvYm9HZXRQb3NpdGlvbigpLCBidWZmZXJlZCwgdGhpcy5nZXREdXJhdGlvbigpLCB0aGlzLm5hbWUpXG4gIH1cblxuICBmaXJzdFBsYXkoKSB7XG4gICAgdGhpcy5zZXRGbGFzaFNldHRpbmdzKCkgLy9lbnN1cmUgZmx1c2hMaXZlVVJMQ2FjaGUgd2lsbCB3b3JrICgjMzI3KVxuICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJMb2FkKHRoaXMuc3JjKVxuICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJQbGF5KClcbiAgICB0aGlzLnNyY0xvYWRlZCA9IHRydWVcbiAgfVxuXG4gIHZvbHVtZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmlzUmVhZHkpIHtcbiAgICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJWb2x1bWUodmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdGVuVG9PbmNlKHRoaXMsIEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCAoKSA9PiB0aGlzLnZvbHVtZSh2YWx1ZSkpXG4gICAgfVxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgaWYgKHRoaXMucGxheWJhY2tUeXBlICE9PSAnbGl2ZScgfHwgdGhpcy5kdnJFbmFibGVkKSB7XG4gICAgICB0aGlzLmVsLmdsb2JvUGxheWVyUGF1c2UoKVxuICAgICAgaWYgKHRoaXMucGxheWJhY2tUeXBlID09PSAnbGl2ZScgJiYgdGhpcy5kdnJFbmFibGVkKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRHZyKHRydWUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmVsLmdsb2JvUGxheWVyU3RvcCgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCAwLCB0aGlzLm5hbWUpXG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXRlKSB7XG4gICAgICByZXR1cm4gISEodGhpcy5jdXJyZW50U3RhdGUubWF0Y2goL3BsYXlpbmcvaSkpXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgdmFyIGR1cmF0aW9uID0gdGhpcy5lbC5nbG9ib0dldER1cmF0aW9uKClcbiAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUgPT09ICdsaXZlJykge1xuICAgICAgLy8gZXN0aW1hdGUgMTAgc2Vjb25kcyBvZiBidWZmZXIgdGltZSBmb3IgbGl2ZSBzdHJlYW1zIGZvciBzZWVrIHBvc2l0aW9uc1xuICAgICAgZHVyYXRpb24gPSBkdXJhdGlvbiAtIDEwXG4gICAgfVxuICAgIHJldHVybiBkdXJhdGlvblxuICB9XG5cbiAgc2Vlayh0aW1lKSB7XG4gICAgdmFyIGR1cmF0aW9uID0gdGhpcy5nZXREdXJhdGlvbigpXG4gICAgaWYgKHRpbWUgPiAwKSB7XG4gICAgICB0aW1lID0gZHVyYXRpb24gKiB0aW1lIC8gMTAwXG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGxheWJhY2tUeXBlID09PSAnbGl2ZScpIHtcbiAgICAgIC8vIHNlZWsgb3BlcmF0aW9ucyB0byBhIHRpbWUgd2l0aGluIDUgc2Vjb25kcyBmcm9tIGxpdmUgc3RyZWFtIHdpbGwgcG9zaXRpb24gcGxheWhlYWQgYmFjayB0byBsaXZlXG4gICAgICB2YXIgZHZySW5Vc2UgPSAodGltZSA+PSAwICYmIGR1cmF0aW9uIC0gdGltZSA+IDUpXG4gICAgICBpZiAoIWR2ckluVXNlKSB7XG4gICAgICAgIHRpbWUgPSAtMVxuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVEdnIoZHZySW5Vc2UpXG4gICAgfVxuICAgIHRoaXMuZWwuZ2xvYm9QbGF5ZXJTZWVrKHRpbWUpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aW1lLCBkdXJhdGlvbiwgdGhpcy5uYW1lKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfSElHSERFRklOSVRJT05VUERBVEUpXG4gIH1cblxuICB1cGRhdGVEdnIoZHZySW5Vc2UpIHtcbiAgICB2YXIgcHJldmlvdXNEdnJJblVzZSA9ICEhdGhpcy5kdnJJblVzZVxuICAgIHRoaXMuZHZySW5Vc2UgPSBkdnJJblVzZVxuICAgIGlmICh0aGlzLmR2ckluVXNlICE9PSBwcmV2aW91c0R2ckluVXNlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNldHRpbmdzKClcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfRFZSLCB0aGlzLmR2ckluVXNlKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19TVEFUU19BREQsIHsnZHZyJzogdGhpcy5kdnJJblVzZX0pXG4gICAgfVxuICB9XG5cbiAgZmxhc2hQbGF5YmFja0Vycm9yKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfU1RPUClcbiAgfVxuXG4gIHRpbWVVcGRhdGUodGltZSwgZHVyYXRpb24pIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRpbWUsIGR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZygpXG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxuXG4gIHNldHVwRmlyZWZveCgpIHtcbiAgICB2YXIgJGVsID0gdGhpcy4kKCdlbWJlZCcpXG4gICAgJGVsLmF0dHIoJ2RhdGEtaGxzJywgJycpXG4gICAgdGhpcy5zZXRFbGVtZW50KCRlbClcbiAgfVxuXG4gIHNldHVwSUUoKSB7XG4gICAgdGhpcy5zZXRFbGVtZW50KCQodGVtcGxhdGUob2JqZWN0SUUpKHtjaWQ6IHRoaXMuY2lkLCBiYXNlVXJsOiB0aGlzLmJhc2VVcmwsIHBsYXliYWNrSWQ6IHRoaXMudW5pcXVlSWR9KSkpXG4gIH1cblxuICB1cGRhdGVTZXR0aW5ncygpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRTZXR0aW5ncylcbiAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUgPT09IFwidm9kXCIgfHwgdGhpcy5kdnJJblVzZSkge1xuICAgICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gW1wicGxheXBhdXNlXCIsIFwicG9zaXRpb25cIiwgXCJkdXJhdGlvblwiXVxuICAgICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IHRydWVcbiAgICB9IGVsc2UgaWYgKHRoaXMuZHZyRW5hYmxlZCkge1xuICAgICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gW1wicGxheXBhdXNlXCJdXG4gICAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gZmFsc2VcbiAgICB9XG4gIH1cblxuICBzZXRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICB0aGlzLiRlbCA9IGVsZW1lbnRcbiAgICB0aGlzLmVsID0gZWxlbWVudFswXVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpXG4gICAgaWYoQnJvd3Nlci5pc0xlZ2FjeUlFKSB7XG4gICAgICB0aGlzLnNldHVwSUUoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoe2NpZDogdGhpcy5jaWQsIGJhc2VVcmw6IHRoaXMuYmFzZVVybCwgcGxheWJhY2tJZDogdGhpcy51bmlxdWVJZH0pKVxuICAgICAgaWYoQnJvd3Nlci5pc0ZpcmVmb3gpIHtcbiAgICAgICAgdGhpcy5zZXR1cEZpcmVmb3goKVxuICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzSUUpIHtcbiAgICAgICAgdGhpcy4kKCdlbWJlZCcpLnJlbW92ZSgpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZWwuaWQgPSB0aGlzLmNpZFxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbkhMUy5jYW5QbGF5ID0gZnVuY3Rpb24ocmVzb3VyY2UsIG1pbWVUeXBlKSB7XG4gIHJldHVybiBCcm93c2VyLmhhc0ZsYXNoICYmICghIXJlc291cmNlLm1hdGNoKC9eaHR0cCguKikubTN1OD8vKSB8fCBtaW1lVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3gtbXBlZ1VSTCcpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gSExTXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3BsYXliYWNrJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJylcblxuY2xhc3MgSFRNTDVBdWRpbyBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnaHRtbDVfYXVkaW8nIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnYXVkaW8nIH1cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2xvYWRlZG1ldGFkYXRhJzogJ2xvYWRlZE1ldGFkYXRhJyxcbiAgICAgICdzdGFsbGVkJzogJ3N0YWxsZWQnLFxuICAgICAgJ3dhaXRpbmcnOiAnd2FpdGluZycsXG4gICAgICAndGltZXVwZGF0ZSc6ICd0aW1lVXBkYXRlZCcsXG4gICAgICAnZW5kZWQnOiAnZW5kZWQnLFxuICAgICAgJ2NhbnBsYXl0aHJvdWdoJzogJ2J1ZmZlckZ1bGwnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgc3VwZXIocGFyYW1zKVxuICAgIHRoaXMub3B0aW9ucyA9IHBhcmFtc1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICBsZWZ0OiBbJ3BsYXlwYXVzZScsICdwb3NpdGlvbicsICdkdXJhdGlvbiddLFxuICAgICAgcmlnaHQ6IFsnZnVsbHNjcmVlbicsICd2b2x1bWUnXSxcbiAgICAgIGRlZmF1bHQ6IFsnc2Vla2JhciddLFxuICAgICAgc2Vla0VuYWJsZWQ6IHRydWVcbiAgICB9XG4gICAgdGhpcy5yZW5kZXIoKVxuICAgIHBhcmFtcy5hdXRvUGxheSAmJiB0aGlzLnBsYXkoKVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVksIHRoaXMucGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BBVVNFLCB0aGlzLnBhdXNlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VFSywgdGhpcy5zZWVrKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfVk9MVU1FLCB0aGlzLnZvbHVtZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMuc3RvcClcbiAgfVxuXG4gIGxvYWRlZE1ldGFkYXRhKGUpIHtcbiAgICB0aGlzLmR1cmF0aW9uQ2hhbmdlKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0xPQURFRE1FVEFEQVRBLCBlLnRhcmdldC5kdXJhdGlvbilcbiAgfVxuXG4gIGR1cmF0aW9uQ2hhbmdlKCkge1xuICAgIC8vIHdlIGNhbid0IGZpZ3VyZSBvdXQgaWYgaGxzIHJlc291cmNlIGlzIFZvRCBvciBub3QgdW50aWwgaXQgaXMgYmVpbmcgbG9hZGVkIG9yIGR1cmF0aW9uIGhhcyBjaGFuZ2VkLlxuICAgIC8vIHRoYXQncyB3aHkgd2UgY2hlY2sgaXQgYWdhaW4gYW5kIHVwZGF0ZSBtZWRpYSBjb250cm9sIGFjY29yZGluZ2x5LlxuICAgIGlmICh0aGlzLmdldFBsYXliYWNrVHlwZSgpID09PSAnYW9kJykge1xuICAgICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gW1wicGxheXBhdXNlXCIsIFwicG9zaXRpb25cIiwgXCJkdXJhdGlvblwiXVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSBbXCJwbGF5c3RvcFwiXVxuICAgIH1cbiAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gaXNGaW5pdGUodGhpcy5nZXREdXJhdGlvbigpKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfU0VUVElOR1NVUERBVEUpXG4gIH1cblxuICBnZXRQbGF5YmFja1R5cGUoKSB7XG4gICAgcmV0dXJuIFswLCB1bmRlZmluZWQsIEluZmluaXR5XS5pbmRleE9mKHRoaXMuZWwuZHVyYXRpb24pID49IDAgPyAnbGl2ZScgOiAnYW9kJ1xuICB9XG5cbiAgc3RhbGxlZCgpIHtcbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ3ZvZCcgJiYgdGhpcy5lbC5yZWFkeVN0YXRlIDwgdGhpcy5lbC5IQVZFX0ZVVFVSRV9EQVRBKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIHdhaXRpbmcoKSB7XG4gICAgaWYodGhpcy5lbC5yZWFkeVN0YXRlIDwgdGhpcy5lbC5IQVZFX0ZVVFVSRV9EQVRBKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5lbC5zcmMgPSB0aGlzLm9wdGlvbnMuc3JjXG4gICAgdGhpcy5lbC5wbGF5KClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BMQVkpO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5lbC5wYXVzZSgpXG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMucGF1c2UoKVxuICAgIHRoaXMuZWwuY3VycmVudFRpbWUgPSAwXG4gICAgdGhpcy5lbC5zcmMgPSAnJ1xuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSB2YWx1ZSAvIDEwMFxuICB9XG5cbiAgbXV0ZSgpIHtcbiAgICB0aGlzLmVsLnZvbHVtZSA9IDBcbiAgfVxuXG4gIHVubXV0ZSgpIHtcbiAgICB0aGlzLmVsLnZvbHVtZSA9IDFcbiAgfVxuXG4gIGlzTXV0ZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5lbC52b2x1bWVcbiAgfVxuXG4gIGVuZGVkKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1RJTUVVUERBVEUsIDApXG4gIH1cblxuICBzZWVrKHNlZWtCYXJWYWx1ZSkge1xuICAgIHZhciB0aW1lID0gdGhpcy5lbC5kdXJhdGlvbiAqIChzZWVrQmFyVmFsdWUgLyAxMDApXG4gICAgdGhpcy5lbC5jdXJyZW50VGltZSA9IHRpbWVcbiAgfVxuXG4gIGdldEN1cnJlbnRUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLmVsLmN1cnJlbnRUaW1lXG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5kdXJhdGlvblxuICB9XG5cbiAgaXNQbGF5aW5nKCkge1xuICAgIHJldHVybiAhdGhpcy5lbC5wYXVzZWQgJiYgIXRoaXMuZWwuZW5kZWRcbiAgfVxuXG4gIHRpbWVVcGRhdGVkKCkge1xuICAgIGlmICh0aGlzLmdldFBsYXliYWNrVHlwZSgpID09PSAnbGl2ZScpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMSwgMSwgdGhpcy5uYW1lKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRoaXMuZWwuY3VycmVudFRpbWUsIHRoaXMuZWwuZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgICB9XG4gIH1cblxuICBidWZmZXJGdWxsKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy5lbC5jdXJyZW50VGltZSwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLm5hbWUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuIH1cblxuSFRNTDVBdWRpby5jYW5QbGF5ID0gZnVuY3Rpb24ocmVzb3VyY2UsIG1pbWVUeXBlKSB7XG4gIHZhciBtaW1ldHlwZXMgPSB7XG4gICAgJ3dhdic6IFsnYXVkaW8vd2F2J10sXG4gICAgJ21wMyc6IFsnYXVkaW8vbXAzJywgJ2F1ZGlvL21wZWc7Y29kZWNzPVwibXAzXCInXSxcbiAgICAnYWFjJzogWydhdWRpby9tcDQ7Y29kZWNzPVwibXA0YS40MC41XCInXSxcbiAgICAnb2dhJzogWydhdWRpby9vZ2cnXVxuICB9XG4gIHZhciByZXNvdXJjZVBhcnRzID0gcmVzb3VyY2Uuc3BsaXQoJz8nKVswXS5tYXRjaCgvLipcXC4oLiopJC8pIHx8IFtdXG4gIGlmICgocmVzb3VyY2VQYXJ0cy5sZW5ndGggPiAxKSAmJiAobWltZXR5cGVzW3Jlc291cmNlUGFydHNbMV1dICE9PSB1bmRlZmluZWQpKSB7XG4gICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpXG4gICAgcmV0dXJuICEhZmluZChtaW1ldHlwZXNbcmVzb3VyY2VQYXJ0c1sxXV0sIChleHQpID0+IHsgcmV0dXJuICEhYS5jYW5QbGF5VHlwZShleHQpLnJlcGxhY2UoL25vLywgJycpIH0pXG4gIH0gZWxzZSBpZiAobWltZVR5cGUpIHtcbiAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJylcbiAgICByZXR1cm4gISFhLmNhblBsYXlUeXBlKG1pbWVUeXBlKS5yZXBsYWNlKC9uby8sICcnKVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gSFRNTDVBdWRpb1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXliYWNrID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9wbGF5YmFjaycpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBCcm93c2VyID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9icm93c2VyJylcbnZhciBzZWVrU3RyaW5nVG9TZWNvbmRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpLnNlZWtTdHJpbmdUb1NlY29uZHNcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJylcblxuY2xhc3MgSFRNTDVWaWRlbyBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnaHRtbDVfdmlkZW8nIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAndmlkZW8nIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULmh0bWw1X3ZpZGVvIH1cblxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2RhdGEtaHRtbDUtdmlkZW8nOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICd0aW1ldXBkYXRlJzogJ3RpbWVVcGRhdGVkJyxcbiAgICAgICdwcm9ncmVzcyc6ICdwcm9ncmVzcycsXG4gICAgICAnZW5kZWQnOiAnZW5kZWQnLFxuICAgICAgJ3N0YWxsZWQnOiAnc3RhbGxlZCcsXG4gICAgICAnd2FpdGluZyc6ICd3YWl0aW5nJyxcbiAgICAgICdjYW5wbGF5dGhyb3VnaCc6ICdidWZmZXJGdWxsJyxcbiAgICAgICdsb2FkZWRtZXRhZGF0YSc6ICdsb2FkZWRNZXRhZGF0YScsXG4gICAgICAnY2FucGxheSc6ICdyZWFkeScsXG4gICAgICAnZHVyYXRpb25jaGFuZ2UnOiAnZHVyYXRpb25DaGFuZ2UnLFxuICAgICAgJ2Vycm9yJzogJ2Vycm9yJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLnNyYyA9IG9wdGlvbnMuc3JjXG4gICAgdGhpcy5lbC5zcmMgPSBvcHRpb25zLnNyY1xuICAgIHRoaXMuZWwubG9vcCA9IG9wdGlvbnMubG9vcFxuICAgIHRoaXMuZmlyc3RCdWZmZXIgPSB0cnVlXG4gICAgdGhpcy5zZXR0aW5ncyA9IHtkZWZhdWx0OiBbJ3NlZWtiYXInXX1cbiAgICBpZiAoQnJvd3Nlci5pc1NhZmFyaSkge1xuICAgICAgdGhpcy5zZXR1cFNhZmFyaSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwucHJlbG9hZCA9IG9wdGlvbnMucHJlbG9hZCA/IG9wdGlvbnMucHJlbG9hZDogJ21ldGFkYXRhJ1xuICAgICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IHRydWVcbiAgICB9XG4gICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gW1wicGxheXBhdXNlXCIsIFwicG9zaXRpb25cIiwgXCJkdXJhdGlvblwiXVxuICAgIHRoaXMuc2V0dGluZ3MucmlnaHQgPSBbXCJmdWxsc2NyZWVuXCIsIFwidm9sdW1lXCJdXG4gIH1cblxuICBzZXR1cFNhZmFyaSgpIHtcbiAgICB0aGlzLmVsLnByZWxvYWQgPSAnYXV0bydcbiAgfVxuXG4gIGxvYWRlZE1ldGFkYXRhKGUpIHtcbiAgICB0aGlzLmR1cmF0aW9uQ2hhbmdlKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0xPQURFRE1FVEFEQVRBLCBlLnRhcmdldC5kdXJhdGlvbilcbiAgICB0aGlzLmNoZWNrSW5pdGlhbFNlZWsoKVxuICB9XG5cbiAgZHVyYXRpb25DaGFuZ2UoKSB7XG4gICAgLy8gd2UgY2FuJ3QgZmlndXJlIG91dCBpZiBobHMgcmVzb3VyY2UgaXMgVm9EIG9yIG5vdCB1bnRpbCBpdCBpcyBiZWluZyBsb2FkZWQgb3IgZHVyYXRpb24gaGFzIGNoYW5nZWQuXG4gICAgLy8gdGhhdCdzIHdoeSB3ZSBjaGVjayBpdCBhZ2FpbiBhbmQgdXBkYXRlIG1lZGlhIGNvbnRyb2wgYWNjb3JkaW5nbHkuXG4gICAgaWYgKHRoaXMuZ2V0UGxheWJhY2tUeXBlKCkgPT09ICd2b2QnKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSBbXCJwbGF5cGF1c2VcIiwgXCJwb3NpdGlvblwiLCBcImR1cmF0aW9uXCJdXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MubGVmdCA9IFtcInBsYXlzdG9wXCJdXG4gICAgfVxuICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSBpc0Zpbml0ZSh0aGlzLmdldER1cmF0aW9uKCkpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19TRVRUSU5HU1VQREFURSlcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gWzAsIHVuZGVmaW5lZCwgSW5maW5pdHldLmluZGV4T2YodGhpcy5lbC5kdXJhdGlvbikgPj0gMCA/ICdsaXZlJyA6ICd2b2QnXG4gIH1cblxuICBpc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuZWwucGxheSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuZWwucGF1c2UoKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnBhdXNlKClcbiAgICBpZiAodGhpcy5lbC5yZWFkeVN0YXRlICE9PSAwKSB7XG4gICAgICB0aGlzLmVsLmN1cnJlbnRUaW1lID0gMFxuICAgIH1cbiAgfVxuXG4gIHZvbHVtZSh2YWx1ZSkge1xuICAgIHRoaXMuZWwudm9sdW1lID0gdmFsdWUgLyAxMDBcbiAgfVxuXG4gIG11dGUoKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSAwXG4gIH1cblxuICB1bm11dGUoKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSAxXG4gIH1cblxuICBpc011dGVkKCkge1xuICAgIHJldHVybiAhIXRoaXMuZWwudm9sdW1lXG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuICF0aGlzLmVsLnBhdXNlZCAmJiAhdGhpcy5lbC5lbmRlZFxuICB9XG5cbiAgZW5kZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19FTkRFRCwgdGhpcy5uYW1lKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgc3RhbGxlZCgpIHtcbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ3ZvZCcgJiYgdGhpcy5lbC5yZWFkeVN0YXRlIDwgdGhpcy5lbC5IQVZFX0ZVVFVSRV9EQVRBKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIHdhaXRpbmcoKSB7XG4gICAgaWYodGhpcy5lbC5yZWFkeVN0YXRlIDwgdGhpcy5lbC5IQVZFX0ZVVFVSRV9EQVRBKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIGJ1ZmZlckZ1bGwoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wb3N0ZXIgJiYgdGhpcy5maXJzdEJ1ZmZlcikge1xuICAgICAgdGhpcy5maXJzdEJ1ZmZlciA9IGZhbHNlXG4gICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nKCkpIHtcbiAgICAgICAgdGhpcy5lbC5wb3N0ZXIgPSB0aGlzLm9wdGlvbnMucG9zdGVyXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwucG9zdGVyID0gJydcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCB0aGlzLm5hbWUpXG4gIH1cblxuICBlcnJvcihldmVudCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfRVJST1IsIHRoaXMuZWwuZXJyb3IsIHRoaXMubmFtZSlcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wKClcbiAgICB0aGlzLmVsLnNyYyA9ICcnXG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxuXG4gIHNlZWsoc2Vla0JhclZhbHVlKSB7XG4gICAgdmFyIHRpbWUgPSB0aGlzLmVsLmR1cmF0aW9uICogKHNlZWtCYXJWYWx1ZSAvIDEwMClcbiAgICB0aGlzLnNlZWtTZWNvbmRzKHRpbWUpXG4gIH1cblxuICBzZWVrU2Vjb25kcyh0aW1lKSB7XG4gICAgdGhpcy5lbC5jdXJyZW50VGltZSA9IHRpbWVcbiAgfVxuXG4gIGNoZWNrSW5pdGlhbFNlZWsoKSB7XG4gICAgdmFyIHNlZWtUaW1lID0gc2Vla1N0cmluZ1RvU2Vjb25kcyh3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICB0aGlzLnNlZWtTZWNvbmRzKHNlZWtUaW1lKVxuICB9XG5cbiAgZ2V0Q3VycmVudFRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwuY3VycmVudFRpbWVcbiAgfVxuXG4gIGdldER1cmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVsLmR1cmF0aW9uXG4gIH1cblxuICB0aW1lVXBkYXRlZCgpIHtcbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ2xpdmUnKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDEsIDEsIHRoaXMubmFtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aGlzLmVsLmN1cnJlbnRUaW1lLCB0aGlzLmVsLmR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgcHJvZ3Jlc3MoKSB7XG4gICAgaWYgKCF0aGlzLmVsLmJ1ZmZlcmVkLmxlbmd0aCkgcmV0dXJuXG4gICAgdmFyIGJ1ZmZlcmVkUG9zID0gMFxuICAgIGZvciAodmFyIGkgPSAwOyAgaSA8IHRoaXMuZWwuYnVmZmVyZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmVsLmN1cnJlbnRUaW1lID49IHRoaXMuZWwuYnVmZmVyZWQuc3RhcnQoaSkgJiYgdGhpcy5lbC5jdXJyZW50VGltZSA8PSB0aGlzLmVsLmJ1ZmZlcmVkLmVuZChpKSkge1xuICAgICAgICBidWZmZXJlZFBvcyA9IGlcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgdGhpcy5lbC5idWZmZXJlZC5zdGFydChidWZmZXJlZFBvcyksIHRoaXMuZWwuYnVmZmVyZWQuZW5kKGJ1ZmZlcmVkUG9zKSwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgdHlwZUZvcihzcmMpIHtcbiAgICByZXR1cm4gKHNyYy5pbmRleE9mKCcubTN1OCcpID4gMCkgPyAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnIDogJ3ZpZGVvL21wNCdcbiAgfVxuXG4gIHJlYWR5KCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMubmFtZSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7IHNyYzogdGhpcy5zcmMsIHR5cGU6IHRoaXMudHlwZUZvcih0aGlzLnNyYykgfSkpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vcHRpb25zLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpLCAwKTtcbiAgICBpZiAodGhpcy5lbC5yZWFkeVN0YXRlID09PSB0aGlzLmVsLkhBVkVfRU5PVUdIX0RBVEEpIHtcbiAgICAgIHRoaXMucmVhZHkoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbkhUTUw1VmlkZW8uY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlLCBtaW1lVHlwZSkge1xuICB2YXIgbWltZXR5cGVzID0ge1xuICAgICdtcDQnOiBbXCJhdmMxLjQyRTAxRVwiLCBcImF2YzEuNThBMDFFXCIsIFwiYXZjMS40RDQwMUVcIiwgXCJhdmMxLjY0MDAxRVwiLCBcIm1wNHYuMjAuOFwiLCBcIm1wNHYuMjAuMjQwXCIsIFwibXA0YS40MC4yXCJdLm1hcChcbiAgICAgIChjb2RlYykgPT4geyByZXR1cm4gJ3ZpZGVvL21wNDsgY29kZWNzPVwiJyArIGNvZGVjICsgJywgbXA0YS40MC4yXCInfSksXG4gICAgJ29nZyc6IFsndmlkZW8vb2dnOyBjb2RlY3M9XCJ0aGVvcmEsIHZvcmJpc1wiJywgJ3ZpZGVvL29nZzsgY29kZWNzPVwiZGlyYWNcIicsICd2aWRlby9vZ2c7IGNvZGVjcz1cInRoZW9yYSwgc3BlZXhcIiddLFxuICAgICczZ3BwJzogWyd2aWRlby8zZ3BwOyBjb2RlY3M9XCJtcDR2LjIwLjgsIHNhbXJcIiddLFxuICAgICd3ZWJtJzogWyd2aWRlby93ZWJtOyBjb2RlY3M9XCJ2cDgsIHZvcmJpc1wiJ10sXG4gICAgJ21rdic6IFsndmlkZW8veC1tYXRyb3NrYTsgY29kZWNzPVwidGhlb3JhLCB2b3JiaXNcIiddLFxuICAgICdtM3U4JzogWydhcHBsaWNhdGlvbi94LW1wZWdVUkwnXVxuICB9XG4gIG1pbWV0eXBlc1snb2d2J10gPSBtaW1ldHlwZXNbJ29nZyddXG4gIG1pbWV0eXBlc1snM2dwJ10gPSBtaW1ldHlwZXNbJzNncHAnXVxuXG4gIHZhciByZXNvdXJjZVBhcnRzID0gcmVzb3VyY2Uuc3BsaXQoJz8nKVswXS5tYXRjaCgvLipcXC4oLiopJC8pIHx8IFtdXG4gIGlmICgocmVzb3VyY2VQYXJ0cy5sZW5ndGggPiAxKSAmJiAobWltZXR5cGVzW3Jlc291cmNlUGFydHNbMV1dICE9PSB1bmRlZmluZWQpKSB7XG4gICAgdmFyIHYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgcmV0dXJuICEhZmluZChtaW1ldHlwZXNbcmVzb3VyY2VQYXJ0c1sxXV0sIChleHQpID0+IHsgcmV0dXJuICEhdi5jYW5QbGF5VHlwZShleHQpLnJlcGxhY2UoL25vLywgJycpIH0pXG4gIH0gZWxzZSBpZiAobWltZVR5cGUpIHtcbiAgICB2YXIgdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICByZXR1cm4gISF2LmNhblBsYXlUeXBlKG1pbWVUeXBlKS5yZXBsYWNlKC9uby8sICcnKVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhUTUw1VmlkZW9cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvcGxheWJhY2snKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcblxuY2xhc3MgSFRNTEltZyBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnaHRtbF9pbWcnIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnaW1nJyB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZGF0YS1odG1sLWltZyc6ICcnXG4gICAgfVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICBzdXBlcihwYXJhbXMpXG4gICAgdGhpcy5lbC5zcmMgPSBwYXJhbXMuc3JjXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuIH1cblxuSFRNTEltZy5jYW5QbGF5ID0gZnVuY3Rpb24ocmVzb3VyY2UpIHtcbiAgcmV0dXJuICEhcmVzb3VyY2UubWF0Y2goLyguKikuKHBuZ3xqcGd8anBlZ3xnaWZ8Ym1wKS8pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gSFRNTEltZ1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL25vX29wJyk7XG4iLCJ2YXIgUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3BsYXliYWNrJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcblxuY2xhc3MgTm9PcCBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnbm9fb3AnIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULm5vX29wIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHsnZGF0YS1uby1vcCc6ICcnfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpO1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSk7XG4gICAgdGhpcy5hbmltYXRlKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLm5hbWUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIG5vaXNlKCkge1xuICAgIHZhciBpZGF0YSA9IHRoaXMuY29udGV4dC5jcmVhdGVJbWFnZURhdGEodGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCwgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQpXG4gICAgdmFyIGJ1ZmZlcjMyID0gbmV3IFVpbnQzMkFycmF5KGlkYXRhLmRhdGEuYnVmZmVyKVxuICAgIHZhciBsZW4gPSBidWZmZXIzMi5sZW5ndGhcbiAgICB2YXIgcnVuID0gMFxuICAgIHZhciBjb2xvciA9IDBcbiAgICB2YXIgbSA9IE1hdGgucmFuZG9tKCkgKiA2ICsgNFxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47KSB7XG4gICAgICBpZiAocnVuIDwgMCkge1xuICAgICAgICBydW4gPSBtICogTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdmFyIHAgPSBNYXRoLnBvdyhNYXRoLnJhbmRvbSgpLCAwLjQpO1xuICAgICAgICBjb2xvciA9ICgyNTUgKiBwKSA8PCAyNDtcbiAgICAgIH1cbiAgICAgIHJ1biAtPSAxO1xuICAgICAgYnVmZmVyMzJbaSsrXSA9IGNvbG9yO1xuICAgIH1cbiAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKGlkYXRhLCAwLCAwKTtcbiAgfVxuXG4gIGxvb3AoKSB7XG4gICAgdGhpcy5ub2lzZSgpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMubG9vcCgpKVxuICB9XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICB0aGlzLmNhbnZhcyA9IHRoaXMuJGVsLmZpbmQoJ2NhbnZhc1tkYXRhLW5vLW9wLWNhbnZhc10nKVswXVxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLmxvb3AoKVxuICB9XG59XG5cbk5vT3AuY2FuUGxheSA9IChzb3VyY2UpID0+IHtcbiAgcmV0dXJuIHRydWVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb09wXG4iLCIvL0NvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL2NvbnRhaW5lcl9wbHVnaW4nKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcblxuY2xhc3MgQ2xpY2tUb1BhdXNlUGx1Z2luIGV4dGVuZHMgQ29udGFpbmVyUGx1Z2luIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnY2xpY2tfdG9fcGF1c2UnIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLmNocm9tZWxlc3MpIHtcbiAgICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgfVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0NMSUNLLCB0aGlzLmNsaWNrKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VUVElOR1NVUERBVEUsIHRoaXMuc2V0dGluZ3NVcGRhdGUpXG4gIH1cblxuICBjbGljaygpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuZ2V0UGxheWJhY2tUeXBlKCkgIT09ICdsaXZlJyB8fCB0aGlzLmNvbnRhaW5lci5pc0R2ckVuYWJsZWQoKSkge1xuICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmlzUGxheWluZygpKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnBhdXNlKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnBsYXkoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldHRpbmdzVXBkYXRlKCkge1xuICAgIHRoaXMuY29udGFpbmVyLiRlbC5yZW1vdmVDbGFzcygncG9pbnRlci1lbmFibGVkJylcbiAgICBpZiAodGhpcy5jb250YWluZXIuZ2V0UGxheWJhY2tUeXBlKCkgIT09ICdsaXZlJyB8fCB0aGlzLmNvbnRhaW5lci5pc0R2ckVuYWJsZWQoKSkge1xuICAgICAgdGhpcy5jb250YWluZXIuJGVsLmFkZENsYXNzKCdwb2ludGVyLWVuYWJsZWQnKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENsaWNrVG9QYXVzZVBsdWdpblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2NsaWNrX3RvX3BhdXNlJylcbiIsInZhciBVSUNvcmVQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL3VpX2NvcmVfcGx1Z2luJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJylcblxuY2xhc3MgRFZSQ29udHJvbHMgZXh0ZW5kcyBVSUNvcmVQbHVnaW4ge1xuICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBKU1QuZHZyX2NvbnRyb2xzIH1cbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnZHZyX2NvbnRyb2xzJyB9XG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGljayAubGl2ZS1idXR0b24nOiAnY2xpY2snXG4gICAgfVxuICB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAnZHZyLWNvbnRyb2xzJyxcbiAgICAgICdkYXRhLWR2ci1jb250cm9scyc6ICcnLFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGNvcmUpIHtcbiAgICBzdXBlcihjb3JlKVxuICAgIHRoaXMuY29yZSA9IGNvcmVcbiAgICB0aGlzLnNldHRpbmdzVXBkYXRlKClcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvcmUubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX0NPTlRBSU5FUkNIQU5HRUQsIHRoaXMuc2V0dGluZ3NVcGRhdGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvcmUubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX1JFTkRFUkVELCB0aGlzLnNldHRpbmdzVXBkYXRlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQsIHRoaXMuZHZyQ2hhbmdlZClcbiAgfVxuXG4gIGR2ckNoYW5nZWQoZHZyRW5hYmxlZCkge1xuICAgIHRoaXMuc2V0dGluZ3NVcGRhdGUoKVxuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmFkZENsYXNzKCdsaXZlJylcbiAgICBpZiAoZHZyRW5hYmxlZCkge1xuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kZWwuYWRkQ2xhc3MoJ2R2cicpXG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5maW5kKCcubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1wb3NpdGlvbl0sIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLWR1cmF0aW9uXScpLmhpZGUoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5yZW1vdmVDbGFzcygnZHZyJylcbiAgICB9XG4gIH1cblxuICBjbGljaygpIHtcbiAgICBpZiAoIXRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLmlzUGxheWluZygpKSB7XG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5wbGF5KClcbiAgICB9XG4gICAgaWYgKHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmhhc0NsYXNzKCdkdnInKSkge1xuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc2V0Q3VycmVudFRpbWUoLTEpXG4gICAgfVxuICB9XG5cbiAgc2V0dGluZ3NVcGRhdGUoKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICBpZih0aGlzLnNob3VsZFJlbmRlcigpKSB7XG4gICAgICB0aGlzLnJlbmRlcigpXG4gICAgICB0aGlzLiRlbC5jbGljaygoKSA9PiB0aGlzLmNsaWNrKCkpXG4gICAgfVxuICAgIHRoaXMuYmluZEV2ZW50cygpXG4gIH1cblxuICBzaG91bGRSZW5kZXIoKSB7XG4gICAgdmFyIHVzZUR2ckNvbnRyb2xzID0gdGhpcy5jb3JlLm9wdGlvbnMudXNlRHZyQ29udHJvbHMgPT09IHVuZGVmaW5lZCB8fCAhIXRoaXMuY29yZS5vcHRpb25zLnVzZUR2ckNvbnRyb2xzXG4gICAgcmV0dXJuIHVzZUR2ckNvbnRyb2xzICYmIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLmdldFBsYXliYWNrVHlwZSgpID09PSAnbGl2ZSdcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICBpZiAodGhpcy5zaG91bGRSZW5kZXIoKSkge1xuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kZWwuYWRkQ2xhc3MoJ2xpdmUnKVxuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kKCcubWVkaWEtY29udHJvbC1sZWZ0LXBhbmVsW2RhdGEtbWVkaWEtY29udHJvbF0nKS5hcHBlbmQodGhpcy4kZWwpXG4gICAgICBpZiAodGhpcy4kZHVyYXRpb24pIHtcbiAgICAgICAgdGhpcy4kZHVyYXRpb24ucmVtb3ZlKClcbiAgICAgIH1cbiAgICAgIHRoaXMuJGR1cmF0aW9uID0gJCgnPHNwYW4gZGF0YS1kdXJhdGlvbj48L3NwYW4+JylcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuc2Vla1RpbWUuJGVsLmFwcGVuZCh0aGlzLiRkdXJhdGlvbilcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERWUkNvbnRyb2xzXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZHZyX2NvbnRyb2xzJylcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL2NvbnRhaW5lcl9wbHVnaW4nKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG5cbmNsYXNzIEdvb2dsZUFuYWx5dGljcyBleHRlbmRzIENvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2dvb2dsZV9hbmFseXRpY3MnIH1cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgaWYgKG9wdGlvbnMuZ2FBY2NvdW50KSB7XG4gICAgICB0aGlzLmFjY291bnQgPSBvcHRpb25zLmdhQWNjb3VudFxuICAgICAgdGhpcy50cmFja2VyTmFtZSA9IChvcHRpb25zLmdhVHJhY2tlck5hbWUpID8gb3B0aW9ucy5nYVRyYWNrZXJOYW1lICsgXCIuXCIgOiAnQ2xhcHByLidcbiAgICAgIHRoaXMuZG9tYWluTmFtZSA9IG9wdGlvbnMuZ2FEb21haW5OYW1lXG4gICAgICB0aGlzLmN1cnJlbnRIRFN0YXRlID0gdW5kZWZpbmVkXG4gICAgICB0aGlzLmVtYmVkU2NyaXB0KClcbiAgICB9XG4gIH1cblxuICBlbWJlZFNjcmlwdCgpIHtcbiAgICBpZiAoIXdpbmRvdy5fZ2F0KSB7XG4gICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dC9qYXZhc2NyaXB0XCIpXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwiYXN5bmNcIiwgXCJhc3luY1wiKVxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImh0dHA6Ly93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20vZ2EuanNcIilcbiAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKClcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKClcbiAgICB9XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWSwgdGhpcy5vblBsYXkpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QQVVTRSwgdGhpcy5vblBhdXNlKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcy5vbkVuZGVkKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJJTkcsIHRoaXMub25CdWZmZXJpbmcpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMub25CdWZmZXJGdWxsKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcy5vbkVuZGVkKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FUlJPUiwgdGhpcy5vbkVycm9yKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS1NUQVRFLCB0aGlzLm9uUGxheWJhY2tDaGFuZ2VkKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9WT0xVTUUsIChldmVudCkgPT4gdGhpcy5vblZvbHVtZUNoYW5nZWQoZXZlbnQpKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TRUVLLCAoZXZlbnQpID0+IHRoaXMub25TZWVrKGV2ZW50KSlcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRlVMTF9TQ1JFRU4sIHRoaXMub25GdWxsc2NyZWVuKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9ISUdIREVGSU5JVElPTlVQREFURSwgdGhpcy5vbkhEKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCwgdGhpcy5vbkRWUilcbiAgICB9XG4gICAgX2dhcS5wdXNoKFt0aGlzLnRyYWNrZXJOYW1lICsgJ19zZXRBY2NvdW50JywgdGhpcy5hY2NvdW50XSk7XG4gICAgaWYgKCEhdGhpcy5kb21haW5OYW1lKVxuICAgICAgX2dhcS5wdXNoKFt0aGlzLnRyYWNrZXJOYW1lICsgJ19zZXREb21haW5OYW1lJywgdGhpcy5kb21haW5OYW1lXSk7XG4gIH1cblxuICBvblBsYXkoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiUGxheVwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIlN0b3BcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uRW5kZWQoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiRW5kZWRcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIkJ1ZmZlcmluZ1wiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25CdWZmZXJGdWxsKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIkJ1ZmZlcmZ1bGxcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uRXJyb3IoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiRXJyb3JcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uSEQoKSB7XG4gICAgdmFyIHN0YXR1cyA9IHRoaXMuY29udGFpbmVyLmlzSGlnaERlZmluaXRpb25JblVzZSgpPyBcIk9OXCI6IFwiT0ZGXCJcbiAgICBpZiAoc3RhdHVzICE9PSB0aGlzLmN1cnJlbnRIRFN0YXRlKSB7XG4gICAgICB0aGlzLmN1cnJlbnRIRFN0YXRlID0gc3RhdHVzXG4gICAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJIRCAtIFwiICsgc3RhdHVzLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICAgIH1cbiAgfVxuXG5cbiAgb25QbGF5YmFja0NoYW5nZWQoKSB7XG4gICAgdmFyIHR5cGUgPSB0aGlzLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKVxuICAgIGlmICh0eXBlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJQbGF5YmFjayBUeXBlIC0gXCIgKyB0eXBlLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICAgIH1cbiAgfVxuXG4gIG9uRFZSKGR2ckluVXNlKSB7XG4gICAgdmFyIHN0YXR1cyA9IGR2ckluVXNlPyBcIk9OXCI6IFwiT0ZGXCJcbiAgICB0aGlzLnB1c2goW1wiSW50ZXJhY3Rpb25cIiwgXCJEVlIgLSBcIiArIHN0YXR1cywgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uUGF1c2UoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiUGF1c2VcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uU2VlaygpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJTZWVrXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvblZvbHVtZUNoYW5nZWQoKSB7XG4gICAgdGhpcy5wdXNoKFtcIkludGVyYWN0aW9uXCIsIFwiVm9sdW1lXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvbkZ1bGxzY3JlZW4oKSB7XG4gICAgdGhpcy5wdXNoKFtcIkludGVyYWN0aW9uXCIsIFwiRnVsbHNjcmVlblwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cblxuICBwdXNoKGFycmF5KSB7XG4gICAgdmFyIHJlcyA9IFt0aGlzLnRyYWNrZXJOYW1lICsgXCJfdHJhY2tFdmVudFwiXS5jb25jYXQoYXJyYXkpXG4gICAgX2dhcS5wdXNoKHJlcylcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gR29vZ2xlQW5hbHl0aWNzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2dvb2dsZV9hbmFseXRpY3MnKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9sb2cnKTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBLaWJvID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9raWJvJylcblxudmFyIEJPTEQgPSAnZm9udC13ZWlnaHQ6IGJvbGQ7IGZvbnQtc2l6ZTogMTNweDsnO1xudmFyIElORk8gPSAnY29sb3I6ICMwMDY2MDA7JyArIEJPTEQ7XG52YXIgREVCVUcgPSAnY29sb3I6ICMwMDAwZmY7JyArIEJPTEQ7XG52YXIgV0FSTiA9ICdjb2xvcjogI2ZmODAwMDsnICsgQk9MRDtcbnZhciBFUlJPUiA9ICdjb2xvcjogI2ZmMDAwMDsnICsgQk9MRDtcbnZhciBERUZBVUxUID0gJyc7XG5cbmNsYXNzIExvZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMua2libyA9IG5ldyBLaWJvKClcbiAgICB0aGlzLmtpYm8uZG93bihbJ2N0cmwgc2hpZnQgZCddLCAoKSA9PiB0aGlzLm9uT2ZmKCkpXG4gICAgdGhpcy5CTEFDS0xJU1QgPSBbJ3RpbWV1cGRhdGUnLCAncGxheWJhY2s6dGltZXVwZGF0ZScsICdwbGF5YmFjazpwcm9ncmVzcycsICdjb250YWluZXI6aG92ZXInLCAnY29udGFpbmVyOnRpbWV1cGRhdGUnLCAnY29udGFpbmVyOnByb2dyZXNzJ107XG4gIH1cblxuICBpbmZvKGtsYXNzKSB7dGhpcy5sb2coa2xhc3MsICdpbmZvJywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSl9XG4gIHdhcm4oa2xhc3MpIHt0aGlzLmxvZyhrbGFzcywgJ3dhcm4nLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKX1cbiAgZGVidWcoa2xhc3MpIHt0aGlzLmxvZyhrbGFzcywgJ2RlYnVnJywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSl9XG5cbiAgb25PZmYoKSB7XG4gICAgd2luZG93LkRFQlVHID0gIXdpbmRvdy5ERUJVR1xuICAgIGlmICh3aW5kb3cuREVCVUcpIHsgY29uc29sZS5sb2coJ2xvZyBlbmFibGVkJyk7ICB9XG4gICAgZWxzZSB7IGNvbnNvbGUubG9nKCdsb2cgZGlzYWJsZWQnKTsgfVxuICB9XG5cbiAgbG9nKGtsYXNzLCBsZXZlbCwgbWVzc2FnZSkge1xuICAgIGlmICghd2luZG93LkRFQlVHIHx8IHRoaXMuQkxBQ0tMSVNULmluZGV4T2YobWVzc2FnZVswXSkgPj0gMCkgcmV0dXJuXG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICBtZXNzYWdlID0ga2xhc3NcbiAgICAgIGtsYXNzID0gbnVsbFxuICAgIH1cbiAgICB2YXIgY29sb3JcbiAgICBpZiAobGV2ZWwgPT09ICd3YXJuJykgeyBjb2xvciA9IFdBUk4gfVxuICAgIGVsc2UgaWYgKGxldmVsID09PSAnaW5mbycpIHsgY29sb3IgPSBJTkZPIH1cbiAgICBlbHNlIGlmIChsZXZlbCA9PT0gJ2RlYnVnJykgeyBjb2xvciA9IERFQlVHIH1cbiAgICBlbHNlIGlmIChsZXZlbCA9PT0gJ2Vycm9yJykgeyBjb2xvciA9IEVSUk9SIH1cbiAgICB2YXIga2xhc3NEZXNjcmlwdGlvbiA9IFwiXCJcbiAgICBpZiAoa2xhc3MpIHtcbiAgICAgIGtsYXNzRGVzY3JpcHRpb24gPSBcIltcIiArIGtsYXNzICsgXCJdXCJcbiAgICB9XG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgW1wiJWNbXCIgKyBsZXZlbCArIFwiXVwiICsga2xhc3NEZXNjcmlwdGlvbiwgY29sb3JdLmNvbmNhdChtZXNzYWdlKSk7XG4gIH1cbn1cblxuTG9nLmdldEluc3RhbmNlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpXG4gIH1cbiAgcmV0dXJuIHRoaXMuX2luc3RhbmNlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTG9nXG4iLCIvL0NvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBVSUNvbnRhaW5lclBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdWlfY29udGFpbmVyX3BsdWdpbicpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG5cbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvbWVkaWF0b3InKVxudmFyIFBsYXllckluZm8gPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3BsYXllcl9pbmZvJylcblxudmFyICQgPSByZXF1aXJlKCdjbGFwcHItemVwdG8nKVxuXG5jbGFzcyBQb3N0ZXJQbHVnaW4gZXh0ZW5kcyBVSUNvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ3Bvc3RlcicgfVxuICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBKU1QucG9zdGVyIH1cblxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsYXNzJzogJ3BsYXllci1wb3N0ZXInLFxuICAgICAgJ2RhdGEtcG9zdGVyJzogJydcbiAgICB9XG4gIH1cblxuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xpY2snOiAnY2xpY2tlZCdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5jb250YWluZXIuZGlzYWJsZU1lZGlhQ29udHJvbCgpXG4gICAgdGhpcy5yZW5kZXIoKVxuICAgIHRoaXMuYnVmZmVyRnVsbCA9IGZhbHNlXG4gIH1cblxuICBsb2FkKHNvdXJjZSkge1xuICAgIHRoaXMub3B0aW9ucy5wb3N0ZXIgPSBzb3VyY2VcbiAgICB0aGlzLnJlbmRlcigpXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSSU5HLCB0aGlzLm9uQnVmZmVyaW5nKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSRlVMTCwgdGhpcy5vbkJ1ZmZlcmZ1bGwpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLm9uU3RvcClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVksIHRoaXMub25QbGF5KVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRU5ERUQsIHRoaXMub25TdG9wKVxuICAgIE1lZGlhdG9yLm9uKEV2ZW50cy5QTEFZRVJfUkVTSVpFLCB0aGlzLnVwZGF0ZVNpemUsIHRoaXMpXG4gIH1cblxuICBzdG9wTGlzdGVuaW5nKCkge1xuICAgIHN1cGVyLnN0b3BMaXN0ZW5pbmcoKVxuICAgIE1lZGlhdG9yLm9mZihFdmVudHMuUExBWUVSX1JFU0laRSwgdGhpcy51cGRhdGVTaXplLCB0aGlzKVxuICB9XG5cbiAgb25CdWZmZXJpbmcoKSB7XG4gICAgdGhpcy5idWZmZXJGdWxsID0gZmFsc2VcbiAgICB0aGlzLmhpZGVQbGF5QnV0dG9uKClcbiAgfVxuXG4gIG9uUGxheSgpIHtcbiAgICBpZiAodGhpcy5idWZmZXJGdWxsKSB7XG4gICAgICB0aGlzLiRlbC5oaWRlKClcbiAgICAgIHRoaXMuY29udGFpbmVyLmVuYWJsZU1lZGlhQ29udHJvbCgpXG4gICAgfVxuICB9XG5cbiAgb25CdWZmZXJmdWxsKCkge1xuICAgIHRoaXMuYnVmZmVyRnVsbCA9IHRydWVcbiAgICBpZiAodGhpcy5jb250YWluZXIucGxheWJhY2submFtZSA9PT0gJ2h0bWw1X3ZpZGVvJyAmJiAhdGhpcy5jb250YWluZXIuaXNQbGF5aW5nKCkpIHJldHVyblxuICAgIHRoaXMuJGVsLmhpZGUoKVxuICAgIHRoaXMuY29udGFpbmVyLmVuYWJsZU1lZGlhQ29udHJvbCgpXG4gIH1cblxuICBvblN0b3AoKSB7XG4gICAgdGhpcy4kZWwuc2hvdygpXG4gICAgdGhpcy5jb250YWluZXIuZGlzYWJsZU1lZGlhQ29udHJvbCgpXG4gICAgdGhpcy5zaG93UGxheUJ1dHRvbigpXG4gIH1cblxuICBzaG93UGxheUJ1dHRvbigpIHtcbiAgICB0aGlzLiRwbGF5QnV0dG9uLnNob3coKVxuICAgIHRoaXMudXBkYXRlU2l6ZSgpXG4gIH1cblxuICBoaWRlUGxheUJ1dHRvbigpIHtcbiAgICB0aGlzLiRwbGF5QnV0dG9uLmhpZGUoKVxuICB9XG5cbiAgY2xpY2tlZCgpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5jaHJvbWVsZXNzKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5wbGF5KClcbiAgICAgIHRoaXMuaGlkZVBsYXlCdXR0b24oKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHVwZGF0ZVNpemUoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLnBsYXliYWNrLm5hbWUgPT09ICdodG1sX2ltZycpIHJldHVyblxuICAgIHZhciBoZWlnaHQgPSB0aGlzLiRlbC5oZWlnaHQoKVxuICAgIHRoaXMuJGVsLmNzcyh7IGZvbnRTaXplOiBoZWlnaHQgfSlcbiAgICBpZiAodGhpcy4kcGxheVdyYXBwZXIuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgIHRoaXMuJHBsYXlXcmFwcGVyLmNzcyh7IG1hcmdpblRvcDogLSh0aGlzLiRwbGF5V3JhcHBlci5oZWlnaHQoKSAvIDIpIH0pXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5uYW1lID09PSAnaHRtbF9pbWcnKSByZXR1cm5cbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lLCB7YmFzZVVybDogdGhpcy5vcHRpb25zLmJhc2VVcmx9KVswXVxuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICBpZiAodGhpcy5vcHRpb25zLnBvc3Rlcikge1xuICAgICAgdmFyIGltZ0VsID0gJCgnPGRpdiBkYXRhLXBvc3RlciBjbGFzcz1cInBvc3Rlci1iYWNrZ3JvdW5kXCI+PC9kaXY+JylcbiAgICAgIGltZ0VsLmNzcyh7J2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyB0aGlzLm9wdGlvbnMucG9zdGVyICsgJyknfSlcbiAgICAgIHRoaXMuJGVsLnByZXBlbmQoaW1nRWwpXG4gICAgfVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQodGhpcy5lbClcbiAgICB0aGlzLiRwbGF5QnV0dG9uID0gdGhpcy4kZWwuZmluZCgnLnBvc3Rlci1pY29uJylcbiAgICB0aGlzLiRwbGF5V3JhcHBlciA9IHRoaXMuJGVsLmZpbmQoJy5wbGF5LXdyYXBwZXInKVxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVTaXplKCksIDApXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jaHJvbWVsZXNzKSB7XG4gICAgICB0aGlzLmhpZGVQbGF5QnV0dG9uKClcbiAgICAgIHRoaXMuJGVsLmNzcyh7J2N1cnNvcic6ICdpbml0aWFsJ30pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0ZXJQbHVnaW5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zcGlubmVyX3RocmVlX2JvdW5jZScpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgVUlDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL3VpX2NvbnRhaW5lcl9wbHVnaW4nKTtcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpO1xudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0Jyk7XG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKTtcblxuY2xhc3MgU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luIGV4dGVuZHMgVUlDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdzcGlubmVyJyB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZGF0YS1zcGlubmVyJzonJyxcbiAgICAgICdjbGFzcyc6ICdzcGlubmVyLXRocmVlLWJvdW5jZSdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnRlbXBsYXRlID0gSlNULnNwaW5uZXJfdGhyZWVfYm91bmNlXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJJTkcsIHRoaXMub25CdWZmZXJpbmcpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMLCB0aGlzLm9uQnVmZmVyRnVsbClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICAgIHRoaXMucmVuZGVyKClcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIHRoaXMuc2hvd1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuJGVsLnNob3coKSwgMzAwKVxuICB9XG5cbiAgb25CdWZmZXJGdWxsKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnNob3dUaW1lb3V0KVxuICAgIHRoaXMuJGVsLmhpZGUoKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMuJGVsLmhpZGUoKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcignc3Bpbm5lcl90aHJlZV9ib3VuY2UnKVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy5jb250YWluZXIuJGVsLmFwcGVuZCh0aGlzLiRlbClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3Bpbm5lclRocmVlQm91bmNlUGx1Z2luO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3N0YXRzJyk7XG5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL2NvbnRhaW5lcl9wbHVnaW4nKTtcbnZhciAkID0gcmVxdWlyZShcImNsYXBwci16ZXB0b1wiKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpO1xuXG5jbGFzcyBTdGF0c1BsdWdpbiBleHRlbmRzIENvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ3N0YXRzJyB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5zZXRJbml0aWFsQXR0cnMoKVxuICAgIHRoaXMucmVwb3J0SW50ZXJ2YWwgPSBvcHRpb25zLnJlcG9ydEludGVydmFsIHx8IDUwMDBcbiAgICB0aGlzLnN0YXRlID0gXCJJRExFXCJcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lci5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1BMQVksIHRoaXMub25QbGF5KVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5vblN0b3ApXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9ERVNUUk9ZRUQsIHRoaXMub25TdG9wKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSSU5HLCB0aGlzLm9uQnVmZmVyaW5nKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSRlVMTCwgdGhpcy5vbkJ1ZmZlckZ1bGwpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFUU19BREQsIHRoaXMub25TdGF0c0FkZClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0JJVFJBVEUsIHRoaXMub25TdGF0c0FkZClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfU1RBVFNfQURELCB0aGlzLm9uU3RhdHNBZGQpXG4gIH1cblxuICBzZXRJbml0aWFsQXR0cnMoKSB7XG4gICAgdGhpcy5maXJzdFBsYXkgPSB0cnVlXG4gICAgdGhpcy5zdGFydHVwVGltZSA9IDBcbiAgICB0aGlzLnJlYnVmZmVyaW5nVGltZSA9IDBcbiAgICB0aGlzLndhdGNoaW5nVGltZSA9IDBcbiAgICB0aGlzLnJlYnVmZmVycyA9IDBcbiAgICB0aGlzLmV4dGVybmFsTWV0cmljcyA9IHt9XG4gIH1cblxuICBvblBsYXkoKSB7XG4gICAgdGhpcy5zdGF0ZSA9IFwiUExBWUlOR1wiXG4gICAgdGhpcy53YXRjaGluZ1RpbWVJbml0ID0gRGF0ZS5ub3coKVxuICAgIGlmICghdGhpcy5pbnRlcnZhbElkKSB7XG4gICAgICB0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh0aGlzLnJlcG9ydC5iaW5kKHRoaXMpLCB0aGlzLnJlcG9ydEludGVydmFsKVxuICAgIH1cbiAgfVxuXG4gIG9uU3RvcCgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZClcbiAgICB0aGlzLmludGVydmFsSWQgPSB1bmRlZmluZWRcbiAgICB0aGlzLnN0YXRlID0gXCJTVE9QUEVEXCJcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIGlmICh0aGlzLmZpcnN0UGxheSkge1xuICAgICAgdGhpcy5zdGFydHVwVGltZUluaXQgPSBEYXRlLm5vdygpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVidWZmZXJpbmdUaW1lSW5pdCA9IERhdGUubm93KClcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IFwiQlVGRkVSSU5HXCJcbiAgICB0aGlzLnJlYnVmZmVycysrXG4gIH1cblxuICBvbkJ1ZmZlckZ1bGwoKSB7XG4gICAgaWYgKHRoaXMuZmlyc3RQbGF5ICYmICEhdGhpcy5zdGFydHVwVGltZUluaXQpIHtcbiAgICAgIHRoaXMuZmlyc3RQbGF5ID0gZmFsc2VcbiAgICAgIHRoaXMuc3RhcnR1cFRpbWUgPSBEYXRlLm5vdygpIC0gdGhpcy5zdGFydHVwVGltZUluaXRcbiAgICAgIHRoaXMud2F0Y2hpbmdUaW1lSW5pdCA9IERhdGUubm93KClcbiAgICB9IGVsc2UgaWYgKCEhdGhpcy5yZWJ1ZmZlcmluZ1RpbWVJbml0KSB7XG4gICAgICB0aGlzLnJlYnVmZmVyaW5nVGltZSArPSB0aGlzLmdldFJlYnVmZmVyaW5nVGltZSgpXG4gICAgfVxuICAgIHRoaXMucmVidWZmZXJpbmdUaW1lSW5pdCA9IHVuZGVmaW5lZFxuICAgIHRoaXMuc3RhdGUgPSBcIlBMQVlJTkdcIlxuICB9XG5cbiAgZ2V0UmVidWZmZXJpbmdUaW1lKCkge1xuICAgIHJldHVybiBEYXRlLm5vdygpIC0gdGhpcy5yZWJ1ZmZlcmluZ1RpbWVJbml0XG4gIH1cblxuICBnZXRXYXRjaGluZ1RpbWUoKSB7XG4gICAgdmFyIHRvdGFsVGltZSA9IChEYXRlLm5vdygpIC0gdGhpcy53YXRjaGluZ1RpbWVJbml0KVxuICAgIHJldHVybiB0b3RhbFRpbWUgLSB0aGlzLnJlYnVmZmVyaW5nVGltZVxuICB9XG5cbiAgaXNSZWJ1ZmZlcmluZygpIHtcbiAgICByZXR1cm4gISF0aGlzLnJlYnVmZmVyaW5nVGltZUluaXRcbiAgfVxuXG4gIG9uU3RhdHNBZGQobWV0cmljKSB7XG4gICAgJC5leHRlbmQodGhpcy5leHRlcm5hbE1ldHJpY3MsIG1ldHJpYylcbiAgfVxuXG4gIGdldFN0YXRzKCkge1xuICAgIHZhciBtZXRyaWNzID0ge1xuICAgICAgc3RhcnR1cFRpbWU6ICAgICB0aGlzLnN0YXJ0dXBUaW1lLFxuICAgICAgcmVidWZmZXJzOiAgICAgICB0aGlzLnJlYnVmZmVycyxcbiAgICAgIHJlYnVmZmVyaW5nVGltZTogdGhpcy5pc1JlYnVmZmVyaW5nKCk/IHRoaXMucmVidWZmZXJpbmdUaW1lICsgdGhpcy5nZXRSZWJ1ZmZlcmluZ1RpbWUoKTogdGhpcy5yZWJ1ZmZlcmluZ1RpbWUsXG4gICAgICB3YXRjaGluZ1RpbWU6ICAgIHRoaXMuaXNSZWJ1ZmZlcmluZygpPyB0aGlzLmdldFdhdGNoaW5nVGltZSgpIC0gdGhpcy5nZXRSZWJ1ZmZlcmluZ1RpbWUoKTogdGhpcy5nZXRXYXRjaGluZ1RpbWUoKVxuICAgIH1cbiAgICAkLmV4dGVuZChtZXRyaWNzLCB0aGlzLmV4dGVybmFsTWV0cmljcylcbiAgICByZXR1cm4gbWV0cmljc1xuICB9XG5cbiAgcmVwb3J0KCkge1xuICAgIHRoaXMuY29udGFpbmVyLnN0YXRzUmVwb3J0KHRoaXMuZ2V0U3RhdHMoKSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRzUGx1Z2luO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3dhdGVybWFyaycpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgVUlDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL3VpX2NvbnRhaW5lcl9wbHVnaW4nKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxuXG5jbGFzcyBXYXRlck1hcmtQbHVnaW4gZXh0ZW5kcyBVSUNvbnRhaW5lclBsdWdpbiB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ3dhdGVybWFyaycgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMudGVtcGxhdGUgPSBKU1RbdGhpcy5uYW1lXVxuICAgIHRoaXMucG9zaXRpb24gPSBvcHRpb25zLnBvc2l0aW9uIHx8IFwiYm90dG9tLXJpZ2h0XCJcbiAgICBpZiAob3B0aW9ucy53YXRlcm1hcmspIHtcbiAgICAgIHRoaXMuaW1hZ2VVcmwgPSBvcHRpb25zLndhdGVybWFya1xuICAgICAgdGhpcy5yZW5kZXIoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICAgIH1cbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLm9uUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIGlmICghdGhpcy5oaWRkZW4pXG4gICAgICB0aGlzLiRlbC5zaG93KClcbiAgfVxuXG4gIG9uU3RvcCgpIHtcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB2YXIgdGVtcGxhdGVPcHRpb25zID0ge3Bvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLCBpbWFnZVVybDogdGhpcy5pbWFnZVVybH1cbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUodGVtcGxhdGVPcHRpb25zKSlcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgdGhpcy5jb250YWluZXIuJGVsLmFwcGVuZCh0aGlzLiRlbClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2F0ZXJNYXJrUGx1Z2luXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgdW5pcXVlSWQgPSByZXF1aXJlKCcuL3V0aWxzJykudW5pcXVlSWRcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuL2V2ZW50cycpXG5cbmNsYXNzIEJhc2VPYmplY3QgZXh0ZW5kcyBFdmVudHMge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zPXt9KSB7XG4gICAgdGhpcy51bmlxdWVJZCA9IHVuaXF1ZUlkKCdvJylcbiAgICB0aGlzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlT2JqZWN0XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG5jbGFzcyBCcm93c2VyIHtcbn1cblxudmFyIGhhc0xvY2Fsc3RvcmFnZSA9IGZ1bmN0aW9uKCl7XG4gIHRyeSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NsYXBwcicsICdjbGFwcHInKVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjbGFwcHInKVxuICAgIHJldHVybiB0cnVlXG4gIH0gY2F0Y2goZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbnZhciBoYXNGbGFzaCA9IGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHZhciBmbyA9IG5ldyBBY3RpdmVYT2JqZWN0KCdTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaCcpO1xuICAgIHJldHVybiAhIWZvO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuICEhKG5hdmlnYXRvci5taW1lVHlwZXMgJiYgbmF2aWdhdG9yLm1pbWVUeXBlc1snYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIG5hdmlnYXRvci5taW1lVHlwZXNbJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJ10uZW5hYmxlZFBsdWdpbik7XG4gIH1cbn1cblxuQnJvd3Nlci5pc1NhZmFyaSA9ICghIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL3NhZmFyaS9pKSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZScpID09PSAtMSlcbkJyb3dzZXIuaXNDaHJvbWUgPSAhIShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9jaHJvbWUvaSkpXG5Ccm93c2VyLmlzRmlyZWZveCA9ICEhKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2ZpcmVmb3gvaSkpXG5Ccm93c2VyLmlzTGVnYWN5SUUgPSAhISh3aW5kb3cuQWN0aXZlWE9iamVjdClcbkJyb3dzZXIuaXNJRSA9IEJyb3dzZXIuaXNMZWdhY3lJRSB8fCAhIShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC90cmlkZW50LipydjoxXFxkL2kpKVxuQnJvd3Nlci5pc0lFMTEgPSAhIShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC90cmlkZW50LipydjoxMS9pKSlcbkJyb3dzZXIuaXNNb2JpbGUgPSAhISgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8V2luZG93cyBQaG9uZXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSlcbkJyb3dzZXIuaXNpT3MgPSAhISgvaVBhZHxpUGhvbmV8aVBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpO1xuQnJvd3Nlci5pc1dpbjhBcHAgPSAhISgvTVNBcHBIb3N0L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSlcbkJyb3dzZXIuaXNXaWlVID0gISEoL1dpaVUvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKVxuQnJvd3Nlci5pc1BTNCA9ICEhKC9QbGF5U3RhdGlvbiA0L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSlcbkJyb3dzZXIuaGFzTG9jYWxzdG9yYWdlID0gaGFzTG9jYWxzdG9yYWdlKClcbkJyb3dzZXIuaGFzRmxhc2ggPSBoYXNGbGFzaCgpXG5cbm1vZHVsZS5leHBvcnRzID0gQnJvd3NlclxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXllciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9wbGF5ZXInKVxudmFyIE1lZGlhdG9yID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL21lZGlhdG9yJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuL2Jhc2UvZXZlbnRzJylcblxud2luZG93LkRFQlVHID0gZmFsc2Vcblxud2luZG93LkNsYXBwciA9IHsgUGxheWVyOiBQbGF5ZXIsIE1lZGlhdG9yOiBNZWRpYXRvciwgRXZlbnRzOiBFdmVudHMgfVxud2luZG93LkNsYXBwci52ZXJzaW9uID0gXCJfX1ZFUlNJT05fX1wiXG5cbm1vZHVsZS5leHBvcnRzID0gd2luZG93LkNsYXBwclxuIiwidmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCcuL2Jhc2Vfb2JqZWN0JylcblxuY2xhc3MgQ29udGFpbmVyUGx1Z2luIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmJpbmRFdmVudHMoKVxuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29udGFpbmVyJyk7XG4iLCJ2YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJy4vYmFzZV9vYmplY3QnKVxuXG5jbGFzcyBDb3JlUGx1Z2luIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKGNvcmUpIHtcbiAgICBzdXBlcihjb3JlKVxuICAgIHRoaXMuY29yZSA9IGNvcmVcbiAgfVxuXG4gIGdldEV4dGVybmFsSW50ZXJmYWNlKCkgeyByZXR1cm4ge30gfVxuXG4gIGRlc3Ryb3koKSB7fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvcmVQbHVnaW5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb3JlJyk7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgZXhlY09uY2UgPSByZXF1aXJlKCdsb2Rhc2gub25jZScpXG52YXIgdW5pcXVlSWQgPSByZXF1aXJlKCcuL3V0aWxzJykudW5pcXVlSWRcbnZhciBMb2cgPSByZXF1aXJlKCcuLi9wbHVnaW5zL2xvZycpLmdldEluc3RhbmNlKClcblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG5cbmNsYXNzIEV2ZW50cyB7XG4gIG9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKCFldmVudHNBcGkodGhpcywgJ29uJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpc1xuICAgIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pXG4gICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCAodGhpcy5fZXZlbnRzW25hbWVdID0gW10pXG4gICAgZXZlbnRzLnB1c2goe2NhbGxiYWNrOiBjYWxsYmFjaywgY29udGV4dDogY29udGV4dCwgY3R4OiBjb250ZXh0IHx8IHRoaXN9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBvbmNlKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKCFldmVudHNBcGkodGhpcywgJ29uY2UnLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSB8fCAhY2FsbGJhY2spIHJldHVybiB0aGlzXG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgdmFyIG9uY2UgPSBleGVjT25jZShmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIG9uY2UpXG4gICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgfSlcbiAgICBvbmNlLl9jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgb25jZSwgY29udGV4dClcbiAgfVxuXG4gIG9mZihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciByZXRhaW4sIGV2LCBldmVudHMsIG5hbWVzLCBpLCBsLCBqLCBrXG4gICAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIWV2ZW50c0FwaSh0aGlzLCAnb2ZmJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkpIHJldHVybiB0aGlzXG4gICAgaWYgKCFuYW1lICYmICFjYWxsYmFjayAmJiAhY29udGV4dCkge1xuICAgICAgdGhpcy5fZXZlbnRzID0gdm9pZCAwXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyh0aGlzLl9ldmVudHMpXG4gICAgZm9yIChpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgbmFtZSA9IG5hbWVzW2ldXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV1cbiAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzW25hbWVdID0gcmV0YWluID0gW11cbiAgICAgICAgaWYgKGNhbGxiYWNrIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICBmb3IgKGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgZXYgPSBldmVudHNbal1cbiAgICAgICAgICAgIGlmICgoY2FsbGJhY2sgJiYgY2FsbGJhY2sgIT09IGV2LmNhbGxiYWNrICYmIGNhbGxiYWNrICE9PSBldi5jYWxsYmFjay5fY2FsbGJhY2spIHx8XG4gICAgICAgICAgICAgICAgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXYuY29udGV4dCkpIHtcbiAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXYpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkgZGVsZXRlIHRoaXMuX2V2ZW50c1tuYW1lXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdHJpZ2dlcihuYW1lKSB7XG4gICAgdmFyIGtsYXNzID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGtsYXNzID0gdGhpcy5uYW1lXG4gICAgfVxuICAgIExvZy5kZWJ1Zy5hcHBseShMb2csIFtrbGFzc10uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKVxuICAgIGlmICghdGhpcy5fZXZlbnRzKSByZXR1cm4gdGhpc1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgaWYgKCFldmVudHNBcGkodGhpcywgJ3RyaWdnZXInLCBuYW1lLCBhcmdzKSkgcmV0dXJuIHRoaXNcbiAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdXG4gICAgdmFyIGFsbEV2ZW50cyA9IHRoaXMuX2V2ZW50cy5hbGxcbiAgICBpZiAoZXZlbnRzKSB0cmlnZ2VyRXZlbnRzKGV2ZW50cywgYXJncylcbiAgICBpZiAoYWxsRXZlbnRzKSB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdG9wTGlzdGVuaW5nKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgbGlzdGVuaW5nVG8gPSB0aGlzLl9saXN0ZW5pbmdUb1xuICAgIGlmICghbGlzdGVuaW5nVG8pIHJldHVybiB0aGlzXG4gICAgdmFyIHJlbW92ZSA9ICFuYW1lICYmICFjYWxsYmFja1xuICAgIGlmICghY2FsbGJhY2sgJiYgdHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXNcbiAgICBpZiAob2JqKSAobGlzdGVuaW5nVG8gPSB7fSlbb2JqLl9saXN0ZW5JZF0gPSBvYmpcbiAgICBmb3IgKHZhciBpZCBpbiBsaXN0ZW5pbmdUbykge1xuICAgICAgb2JqID0gbGlzdGVuaW5nVG9baWRdXG4gICAgICBvYmoub2ZmKG5hbWUsIGNhbGxiYWNrLCB0aGlzKVxuICAgICAgaWYgKHJlbW92ZSB8fCBPYmplY3Qua2V5cyhvYmouX2V2ZW50cykubGVuZ3RoID09PSAwKSBkZWxldGUgdGhpcy5fbGlzdGVuaW5nVG9baWRdXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxudmFyIGV2ZW50U3BsaXR0ZXIgPSAvXFxzKy9cblxudmFyIGV2ZW50c0FwaSA9IGZ1bmN0aW9uKG9iaiwgYWN0aW9uLCBuYW1lLCByZXN0KSB7XG4gIGlmICghbmFtZSkgcmV0dXJuIHRydWVcblxuICAvLyBIYW5kbGUgZXZlbnQgbWFwcy5cbiAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtrZXksIG5hbWVba2V5XV0uY29uY2F0KHJlc3QpKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIEhhbmRsZSBzcGFjZSBzZXBhcmF0ZWQgZXZlbnQgbmFtZXMuXG4gIGlmIChldmVudFNwbGl0dGVyLnRlc3QobmFtZSkpIHtcbiAgICB2YXIgbmFtZXMgPSBuYW1lLnNwbGl0KGV2ZW50U3BsaXR0ZXIpXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG9ialthY3Rpb25dLmFwcGx5KG9iaiwgW25hbWVzW2ldXS5jb25jYXQocmVzdCkpXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxudmFyIHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MpIHtcbiAgdmFyIGV2LCBpID0gLTEsIGwgPSBldmVudHMubGVuZ3RoLCBhMSA9IGFyZ3NbMF0sIGEyID0gYXJnc1sxXSwgYTMgPSBhcmdzWzJdXG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4KTsgcmV0dXJuXG4gICAgY2FzZSAxOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEpOyByZXR1cm5cbiAgICBjYXNlIDI6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIpOyByZXR1cm5cbiAgICBjYXNlIDM6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIsIGEzKTsgcmV0dXJuXG4gICAgZGVmYXVsdDogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suYXBwbHkoZXYuY3R4LCBhcmdzKTsgcmV0dXJuXG4gIH1cbn1cblxudmFyIGxpc3Rlbk1ldGhvZHMgPSB7bGlzdGVuVG86ICdvbicsIGxpc3RlblRvT25jZTogJ29uY2UnfVxuXG5PYmplY3Qua2V5cyhsaXN0ZW5NZXRob2RzKS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICBFdmVudHMucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGxpc3RlbmluZ1RvID0gdGhpcy5fbGlzdGVuaW5nVG8gfHwgKHRoaXMuX2xpc3RlbmluZ1RvID0ge30pXG4gICAgdmFyIGlkID0gb2JqLl9saXN0ZW5JZCB8fCAob2JqLl9saXN0ZW5JZCA9IHVuaXF1ZUlkKCdsJykpXG4gICAgbGlzdGVuaW5nVG9baWRdID0gb2JqXG4gICAgaWYgKCFjYWxsYmFjayAmJiB0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpc1xuICAgIG9ialtsaXN0ZW5NZXRob2RzW21ldGhvZF1dKG5hbWUsIGNhbGxiYWNrLCB0aGlzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn0pO1xuXG4vLyBQTEFZRVIgRVZFTlRTXG5FdmVudHMuUExBWUVSX1JFU0laRSA9ICdyZXNpemUnXG5FdmVudHMuUExBWUVSX1BMQVkgPSAncGxheSdcbkV2ZW50cy5QTEFZRVJfUEFVU0UgPSAncGF1c2UnXG5FdmVudHMuUExBWUVSX1NUT1AgPSAnc3RvcCdcbkV2ZW50cy5QTEFZRVJfRU5ERUQgPSAnZW5kZWQnXG5FdmVudHMuUExBWUVSX1NFRUsgPSAnc2VlaydcbkV2ZW50cy5QTEFZRVJfRVJST1IgPSAnZXJyb3InXG5FdmVudHMuUExBWUVSX1RJTUVVUERBVEUgPSAndGltZXVwZGF0ZSdcblxuLy8gUGxheWJhY2sgRXZlbnRzXG5FdmVudHMuUExBWUJBQ0tfUFJPR1JFU1MgPSAncGxheWJhY2s6cHJvZ3Jlc3MnXG5FdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSA9ICdwbGF5YmFjazp0aW1ldXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX1JFQURZID0gJ3BsYXliYWNrOnJlYWR5J1xuRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORyA9ICdwbGF5YmFjazpidWZmZXJpbmcnXG5FdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCA9ICdwbGF5YmFjazpidWZmZXJmdWxsJ1xuRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFID0gJ3BsYXliYWNrOnNldHRpbmdzdXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX0xPQURFRE1FVEFEQVRBID0gJ3BsYXliYWNrOmxvYWRlZG1ldGFkYXRhJ1xuRXZlbnRzLlBMQVlCQUNLX0hJR0hERUZJTklUSU9OVVBEQVRFID0gJ3BsYXliYWNrOmhpZ2hkZWZpbml0aW9udXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX0JJVFJBVEUgPSAncGxheWJhY2s6Yml0cmF0ZSdcbkV2ZW50cy5QTEFZQkFDS19QTEFZQkFDS1NUQVRFID0gJ3BsYXliYWNrOnBsYXliYWNrc3RhdGUnXG5FdmVudHMuUExBWUJBQ0tfRFZSID0gJ3BsYXliYWNrOmR2cidcbkV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRElTQUJMRSA9ICdwbGF5YmFjazptZWRpYWNvbnRyb2w6ZGlzYWJsZSdcbkV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRU5BQkxFID0gJ3BsYXliYWNrOm1lZGlhY29udHJvbDplbmFibGUnXG5FdmVudHMuUExBWUJBQ0tfRU5ERUQgPSAncGxheWJhY2s6ZW5kZWQnXG5FdmVudHMuUExBWUJBQ0tfUExBWSA9ICdwbGF5YmFjazpwbGF5J1xuRXZlbnRzLlBMQVlCQUNLX0VSUk9SID0gJ3BsYXliYWNrOmVycm9yJ1xuRXZlbnRzLlBMQVlCQUNLX1NUQVRTX0FERCA9ICdwbGF5YmFjazpzdGF0czphZGQnXG5cbi8vIENvbnRhaW5lciBFdmVudHNcbkV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tTVEFURSA9ICdjb250YWluZXI6cGxheWJhY2tzdGF0ZSdcbkV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQgPSAnY29udGFpbmVyOmR2cidcbkV2ZW50cy5DT05UQUlORVJfQklUUkFURSA9ICdjb250YWluZXI6Yml0cmF0ZSdcbkV2ZW50cy5DT05UQUlORVJfU1RBVFNfUkVQT1JUID0gJ2NvbnRhaW5lcjpzdGF0czpyZXBvcnQnXG5FdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCA9ICdjb250YWluZXI6ZGVzdHJveWVkJ1xuRXZlbnRzLkNPTlRBSU5FUl9SRUFEWSA9ICdjb250YWluZXI6cmVhZHknXG5FdmVudHMuQ09OVEFJTkVSX0VSUk9SID0gJ2NvbnRhaW5lcjplcnJvcidcbkV2ZW50cy5DT05UQUlORVJfTE9BREVETUVUQURBVEEgPSAnY29udGFpbmVyOmxvYWRlZG1ldGFkYXRhJ1xuRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFID0gJ2NvbnRhaW5lcjp0aW1ldXBkYXRlJ1xuRXZlbnRzLkNPTlRBSU5FUl9QUk9HUkVTUyA9ICdjb250YWluZXI6cHJvZ3Jlc3MnXG5FdmVudHMuQ09OVEFJTkVSX1BMQVkgPSAnY29udGFpbmVyOnBsYXknXG5FdmVudHMuQ09OVEFJTkVSX1NUT1AgPSAnY29udGFpbmVyOnN0b3AnXG5FdmVudHMuQ09OVEFJTkVSX1BBVVNFID0gJ2NvbnRhaW5lcjpwYXVzZSdcbkV2ZW50cy5DT05UQUlORVJfRU5ERUQgPSAnY29udGFpbmVyOmVuZGVkJ1xuRXZlbnRzLkNPTlRBSU5FUl9DTElDSyA9ICdjb250YWluZXI6Y2xpY2snXG5FdmVudHMuQ09OVEFJTkVSX0RCTENMSUNLID0gJ2NvbnRhaW5lcjpkYmxjbGljaydcbkV2ZW50cy5DT05UQUlORVJfTU9VU0VfRU5URVIgPSAnY29udGFpbmVyOm1vdXNlZW50ZXInXG5FdmVudHMuQ09OVEFJTkVSX01PVVNFX0xFQVZFID0gJ2NvbnRhaW5lcjptb3VzZWxlYXZlJ1xuRXZlbnRzLkNPTlRBSU5FUl9TRUVLID0gJ2NvbnRhaW5lcjpzZWVrJ1xuRXZlbnRzLkNPTlRBSU5FUl9WT0xVTUUgPSAnY29udGFpbmVyOnZvbHVtZSdcbkV2ZW50cy5DT05UQUlORVJfRlVMTFNDUkVFTiA9ICdjb250YWluZXI6ZnVsbHNjcmVlbidcbkV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSSU5HID0gJ2NvbnRhaW5lcjpzdGF0ZTpidWZmZXJpbmcnXG5FdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwgPSAnY29udGFpbmVyOnN0YXRlOmJ1ZmZlcmZ1bGwnXG5FdmVudHMuQ09OVEFJTkVSX1NFVFRJTkdTVVBEQVRFID0gJ2NvbnRhaW5lcjpzZXR0aW5nc3VwZGF0ZSdcbkV2ZW50cy5DT05UQUlORVJfSElHSERFRklOSVRJT05VUERBVEUgPSAnY29udGFpbmVyOmhpZ2hkZWZpbml0aW9udXBkYXRlJ1xuRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRElTQUJMRSA9ICdjb250YWluZXI6bWVkaWFjb250cm9sOmRpc2FibGUnXG5FdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9FTkFCTEUgPSAnY29udGFpbmVyOm1lZGlhY29udHJvbDplbmFibGUnXG5FdmVudHMuQ09OVEFJTkVSX1NUQVRTX0FERCA9ICdjb250YWluZXI6c3RhdHM6YWRkJ1xuXG4vLyBNZWRpYUNvbnRyb2wgRXZlbnRzXG5FdmVudHMuTUVESUFDT05UUk9MX1JFTkRFUkVEID0gJ21lZGlhY29udHJvbDpyZW5kZXJlZCdcbkV2ZW50cy5NRURJQUNPTlRST0xfRlVMTFNDUkVFTiA9ICdtZWRpYWNvbnRyb2w6ZnVsbHNjcmVlbidcbkV2ZW50cy5NRURJQUNPTlRST0xfU0hPVyA9ICdtZWRpYWNvbnRyb2w6c2hvdydcbkV2ZW50cy5NRURJQUNPTlRST0xfSElERSA9ICdtZWRpYWNvbnRyb2w6aGlkZSdcbkV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VNT1ZFX1NFRUtCQVIgPSAnbWVkaWFjb250cm9sOm1vdXNlbW92ZTpzZWVrYmFyJ1xuRXZlbnRzLk1FRElBQ09OVFJPTF9NT1VTRUxFQVZFX1NFRUtCQVIgPSAnbWVkaWFjb250cm9sOm1vdXNlbGVhdmU6c2Vla2JhcidcbkV2ZW50cy5NRURJQUNPTlRST0xfUExBWUlORyA9ICdtZWRpYWNvbnRyb2w6cGxheWluZydcbkV2ZW50cy5NRURJQUNPTlRST0xfTk9UUExBWUlORyA9ICdtZWRpYWNvbnRyb2w6bm90cGxheWluZydcbkV2ZW50cy5NRURJQUNPTlRST0xfQ09OVEFJTkVSQ0hBTkdFRCA9ICdtZWRpYWNvbnRyb2w6Y29udGFpbmVyY2hhbmdlZCdcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudHNcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mbGFzaCcpO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaGxzJyk7XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9odG1sNV9hdWRpbycpO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaHRtbDVfdmlkZW8nKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2h0bWxfaW1nJyk7XG5cbiIsInZhciBLaWJvID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50IHx8IHdpbmRvdy5kb2N1bWVudDtcbiAgdGhpcy5pbml0aWFsaXplKCk7XG59O1xuXG5LaWJvLktFWV9OQU1FU19CWV9DT0RFID0ge1xuICA4OiAnYmFja3NwYWNlJywgOTogJ3RhYicsIDEzOiAnZW50ZXInLFxuICAxNjogJ3NoaWZ0JywgMTc6ICdjdHJsJywgMTg6ICdhbHQnLFxuICAyMDogJ2NhcHNfbG9jaycsXG4gIDI3OiAnZXNjJyxcbiAgMzI6ICdzcGFjZScsXG4gIDM3OiAnbGVmdCcsIDM4OiAndXAnLCAzOTogJ3JpZ2h0JywgNDA6ICdkb3duJyxcbiAgNDg6ICcwJywgNDk6ICcxJywgNTA6ICcyJywgNTE6ICczJywgNTI6ICc0JywgNTM6ICc1JywgNTQ6ICc2JywgNTU6ICc3JywgNTY6ICc4JywgNTc6ICc5JyxcbiAgNjU6ICdhJywgNjY6ICdiJywgNjc6ICdjJywgNjg6ICdkJywgNjk6ICdlJywgNzA6ICdmJywgNzE6ICdnJywgNzI6ICdoJywgNzM6ICdpJywgNzQ6ICdqJywgNzU6ICdrJywgNzY6ICdsJywgNzc6ICdtJywgNzg6ICduJywgNzk6ICdvJywgODA6ICdwJywgODE6ICdxJywgODI6ICdyJywgODM6ICdzJywgODQ6ICd0JywgODU6ICd1JywgODY6ICd2JywgODc6ICd3JywgODg6ICd4JywgODk6ICd5JywgOTA6ICd6JyxcbiAgMTEyOiAnZjEnLCAxMTM6ICdmMicsIDExNDogJ2YzJywgMTE1OiAnZjQnLCAxMTY6ICdmNScsIDExNzogJ2Y2JywgMTE4OiAnZjcnLCAxMTk6ICdmOCcsIDEyMDogJ2Y5JywgMTIxOiAnZjEwJywgMTIyOiAnZjExJywgMTIzOiAnZjEyJ1xufTtcblxuS2liby5LRVlfQ09ERVNfQllfTkFNRSA9IHt9O1xuKGZ1bmN0aW9uKCkge1xuICBmb3IodmFyIGtleSBpbiBLaWJvLktFWV9OQU1FU19CWV9DT0RFKVxuICAgIGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChLaWJvLktFWV9OQU1FU19CWV9DT0RFLCBrZXkpKVxuICAgICAgS2liby5LRVlfQ09ERVNfQllfTkFNRVtLaWJvLktFWV9OQU1FU19CWV9DT0RFW2tleV1dID0gK2tleTtcbn0pKCk7XG5cbktpYm8uTU9ESUZJRVJTID0gWydzaGlmdCcsICdjdHJsJywgJ2FsdCddO1xuXG5LaWJvLnJlZ2lzdGVyRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGlmKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jLCBmYWxzZSk7XG4gICAgfTtcbiAgfVxuICBlbHNlIGlmKGRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgZnVuYykge1xuICAgICAgZWxlbWVudC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCBmdW5jKTtcbiAgICB9O1xuICB9XG59KSgpO1xuXG5LaWJvLnVucmVnaXN0ZXJFdmVudCA9IChmdW5jdGlvbigpIHtcbiAgaWYoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGZ1bmMpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmMsIGZhbHNlKTtcbiAgICB9O1xuICB9XG4gIGVsc2UgaWYoZG9jdW1lbnQuZGV0YWNoRXZlbnQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICBlbGVtZW50LmRldGFjaEV2ZW50KCdvbicgKyBldmVudE5hbWUsIGZ1bmMpO1xuICAgIH07XG4gIH1cbn0pKCk7XG5cbktpYm8uc3RyaW5nQ29udGFpbnMgPSBmdW5jdGlvbihzdHJpbmcsIHN1YnN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XG59O1xuXG5LaWJvLm5lYXRTdHJpbmcgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xufTtcblxuS2liby5jYXBpdGFsaXplID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eLi8sIGZ1bmN0aW9uKG1hdGNoKSB7IHJldHVybiBtYXRjaC50b1VwcGVyQ2FzZSgpOyB9KTtcbn07XG5cbktpYm8uaXNTdHJpbmcgPSBmdW5jdGlvbih3aGF0KSB7XG4gIHJldHVybiBLaWJvLnN0cmluZ0NvbnRhaW5zKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aGF0KSwgJ1N0cmluZycpO1xufTtcblxuS2liby5hcnJheUluY2x1ZGVzID0gKGZ1bmN0aW9uKCkge1xuICBpZihBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xuICAgIHJldHVybiBmdW5jdGlvbihoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgICByZXR1cm4gaGF5c3RhY2suaW5kZXhPZihuZWVkbGUpICE9PSAtMTtcbiAgICB9O1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBmdW5jdGlvbihoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaGF5c3RhY2subGVuZ3RoOyBpKyspXG4gICAgICAgIGlmKGhheXN0YWNrW2ldID09PSBuZWVkbGUpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfVxufSkoKTtcblxuS2liby5leHRyYWN0TW9kaWZpZXJzID0gZnVuY3Rpb24oa2V5Q29tYmluYXRpb24pIHtcbiAgdmFyIG1vZGlmaWVycywgaVxuICBtb2RpZmllcnMgPSBbXTtcbiAgZm9yKGkgPSAwOyBpIDwgS2liby5NT0RJRklFUlMubGVuZ3RoOyBpKyspXG4gICAgaWYoS2liby5zdHJpbmdDb250YWlucyhrZXlDb21iaW5hdGlvbiwgS2liby5NT0RJRklFUlNbaV0pKVxuICAgICAgbW9kaWZpZXJzLnB1c2goS2liby5NT0RJRklFUlNbaV0pO1xuICByZXR1cm4gbW9kaWZpZXJzO1xufVxuXG5LaWJvLmV4dHJhY3RLZXkgPSBmdW5jdGlvbihrZXlDb21iaW5hdGlvbikge1xuICB2YXIga2V5cywgaTtcbiAga2V5cyA9IEtpYm8ubmVhdFN0cmluZyhrZXlDb21iaW5hdGlvbikuc3BsaXQoJyAnKTtcbiAgZm9yKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKylcbiAgICBpZighS2liby5hcnJheUluY2x1ZGVzKEtpYm8uTU9ESUZJRVJTLCBrZXlzW2ldKSlcbiAgICAgIHJldHVybiBrZXlzW2ldO1xufTtcblxuS2liby5tb2RpZmllcnNBbmRLZXkgPSBmdW5jdGlvbihrZXlDb21iaW5hdGlvbikge1xuICB2YXIgcmVzdWx0LCBrZXk7XG5cbiAgaWYoS2liby5zdHJpbmdDb250YWlucyhrZXlDb21iaW5hdGlvbiwgJ2FueScpKSB7XG4gICAgcmV0dXJuIEtpYm8ubmVhdFN0cmluZyhrZXlDb21iaW5hdGlvbikuc3BsaXQoJyAnKS5zbGljZSgwLCAyKS5qb2luKCcgJyk7XG4gIH1cblxuICByZXN1bHQgPSBLaWJvLmV4dHJhY3RNb2RpZmllcnMoa2V5Q29tYmluYXRpb24pO1xuXG4gIGtleSA9IEtpYm8uZXh0cmFjdEtleShrZXlDb21iaW5hdGlvbik7XG4gIGlmKGtleSAmJiAhS2liby5hcnJheUluY2x1ZGVzKEtpYm8uTU9ESUZJRVJTLCBrZXkpKVxuICAgIHJlc3VsdC5wdXNoKGtleSk7XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJyk7XG59XG5cbktpYm8ua2V5TmFtZSA9IGZ1bmN0aW9uKGtleUNvZGUpIHtcbiAgcmV0dXJuIEtpYm8uS0VZX05BTUVTX0JZX0NPREVba2V5Q29kZSArICcnXTtcbn07XG5cbktpYm8ua2V5Q29kZSA9IGZ1bmN0aW9uKGtleU5hbWUpIHtcbiAgcmV0dXJuICtLaWJvLktFWV9DT0RFU19CWV9OQU1FW2tleU5hbWVdO1xufTtcblxuS2liby5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaSwgdGhhdCA9IHRoaXM7XG5cbiAgdGhpcy5sYXN0S2V5Q29kZSA9IC0xO1xuICB0aGlzLmxhc3RNb2RpZmllcnMgPSB7fTtcbiAgZm9yKGkgPSAwOyBpIDwgS2liby5NT0RJRklFUlMubGVuZ3RoOyBpKyspXG4gICAgdGhpcy5sYXN0TW9kaWZpZXJzW0tpYm8uTU9ESUZJRVJTW2ldXSA9IGZhbHNlO1xuXG4gIHRoaXMua2V5c0Rvd24gPSB7IGFueTogW10gfTtcbiAgdGhpcy5rZXlzVXAgPSB7IGFueTogW10gfTtcbiAgdGhpcy5kb3duSGFuZGxlciA9IHRoaXMuaGFuZGxlcignZG93bicpO1xuICB0aGlzLnVwSGFuZGxlciA9IHRoaXMuaGFuZGxlcigndXAnKTtcblxuICBLaWJvLnJlZ2lzdGVyRXZlbnQodGhpcy5lbGVtZW50LCAna2V5ZG93bicsIHRoaXMuZG93bkhhbmRsZXIpO1xuICBLaWJvLnJlZ2lzdGVyRXZlbnQodGhpcy5lbGVtZW50LCAna2V5dXAnLCB0aGlzLnVwSGFuZGxlcik7XG4gIEtpYm8ucmVnaXN0ZXJFdmVudCh3aW5kb3csICd1bmxvYWQnLCBmdW5jdGlvbiB1bmxvYWRlcigpIHtcbiAgICBLaWJvLnVucmVnaXN0ZXJFdmVudCh0aGF0LmVsZW1lbnQsICdrZXlkb3duJywgdGhhdC5kb3duSGFuZGxlcik7XG4gICAgS2liby51bnJlZ2lzdGVyRXZlbnQodGhhdC5lbGVtZW50LCAna2V5dXAnLCB0aGF0LnVwSGFuZGxlcik7XG4gICAgS2liby51bnJlZ2lzdGVyRXZlbnQod2luZG93LCAndW5sb2FkJywgdW5sb2FkZXIpO1xuICB9KTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmhhbmRsZXIgPSBmdW5jdGlvbih1cE9yRG93bikge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGksIHJlZ2lzdGVyZWRLZXlzLCBsYXN0TW9kaWZpZXJzQW5kS2V5O1xuXG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuXG4gICAgdGhhdC5sYXN0S2V5Q29kZSA9IGUua2V5Q29kZTtcbiAgICBmb3IoaSA9IDA7IGkgPCBLaWJvLk1PRElGSUVSUy5sZW5ndGg7IGkrKylcbiAgICAgIHRoYXQubGFzdE1vZGlmaWVyc1tLaWJvLk1PRElGSUVSU1tpXV0gPSBlW0tpYm8uTU9ESUZJRVJTW2ldICsgJ0tleSddO1xuICAgIGlmKEtpYm8uYXJyYXlJbmNsdWRlcyhLaWJvLk1PRElGSUVSUywgS2liby5rZXlOYW1lKHRoYXQubGFzdEtleUNvZGUpKSlcbiAgICAgIHRoYXQubGFzdE1vZGlmaWVyc1tLaWJvLmtleU5hbWUodGhhdC5sYXN0S2V5Q29kZSldID0gdHJ1ZTtcblxuICAgIHJlZ2lzdGVyZWRLZXlzID0gdGhhdFsna2V5cycgKyBLaWJvLmNhcGl0YWxpemUodXBPckRvd24pXTtcblxuICAgIGZvcihpID0gMDsgaSA8IHJlZ2lzdGVyZWRLZXlzLmFueS5sZW5ndGg7IGkrKylcbiAgICAgIGlmKChyZWdpc3RlcmVkS2V5cy5hbnlbaV0oZSkgPT09IGZhbHNlKSAmJiBlLnByZXZlbnREZWZhdWx0KVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsYXN0TW9kaWZpZXJzQW5kS2V5ID0gdGhhdC5sYXN0TW9kaWZpZXJzQW5kS2V5KCk7XG4gICAgaWYocmVnaXN0ZXJlZEtleXNbbGFzdE1vZGlmaWVyc0FuZEtleV0pXG4gICAgICBmb3IoaSA9IDA7IGkgPCByZWdpc3RlcmVkS2V5c1tsYXN0TW9kaWZpZXJzQW5kS2V5XS5sZW5ndGg7IGkrKylcbiAgICAgICAgaWYoKHJlZ2lzdGVyZWRLZXlzW2xhc3RNb2RpZmllcnNBbmRLZXldW2ldKGUpID09PSBmYWxzZSkgJiYgZS5wcmV2ZW50RGVmYXVsdClcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG59O1xuXG5LaWJvLnByb3RvdHlwZS5yZWdpc3RlcktleXMgPSBmdW5jdGlvbih1cE9yRG93biwgbmV3S2V5cywgZnVuYykge1xuICB2YXIgaSwga2V5cywgcmVnaXN0ZXJlZEtleXMgPSB0aGlzWydrZXlzJyArIEtpYm8uY2FwaXRhbGl6ZSh1cE9yRG93bildO1xuXG4gIGlmKEtpYm8uaXNTdHJpbmcobmV3S2V5cykpXG4gICAgbmV3S2V5cyA9IFtuZXdLZXlzXTtcblxuICBmb3IoaSA9IDA7IGkgPCBuZXdLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5cyA9IG5ld0tleXNbaV07XG4gICAga2V5cyA9IEtpYm8ubW9kaWZpZXJzQW5kS2V5KGtleXMgKyAnJyk7XG5cbiAgICBpZihyZWdpc3RlcmVkS2V5c1trZXlzXSlcbiAgICAgIHJlZ2lzdGVyZWRLZXlzW2tleXNdLnB1c2goZnVuYyk7XG4gICAgZWxzZVxuICAgICAgcmVnaXN0ZXJlZEtleXNba2V5c10gPSBbZnVuY107XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbktpYm8ucHJvdG90eXBlLnVucmVnaXN0ZXJLZXlzID0gZnVuY3Rpb24odXBPckRvd24sIG5ld0tleXMsIGZ1bmMpIHtcbiAgdmFyIGksIGosIGtleXMsIHJlZ2lzdGVyZWRLZXlzID0gdGhpc1sna2V5cycgKyBLaWJvLmNhcGl0YWxpemUodXBPckRvd24pXTtcblxuICBpZihLaWJvLmlzU3RyaW5nKG5ld0tleXMpKVxuICAgIG5ld0tleXMgPSBbbmV3S2V5c107XG5cbiAgZm9yKGkgPSAwOyBpIDwgbmV3S2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleXMgPSBuZXdLZXlzW2ldO1xuICAgIGtleXMgPSBLaWJvLm1vZGlmaWVyc0FuZEtleShrZXlzICsgJycpO1xuXG4gICAgaWYoZnVuYyA9PT0gbnVsbClcbiAgICAgIGRlbGV0ZSByZWdpc3RlcmVkS2V5c1trZXlzXTtcbiAgICBlbHNlIHtcbiAgICAgIGlmKHJlZ2lzdGVyZWRLZXlzW2tleXNdKSB7XG4gICAgICAgIGZvcihqID0gMDsgaiA8IHJlZ2lzdGVyZWRLZXlzW2tleXNdLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYoU3RyaW5nKHJlZ2lzdGVyZWRLZXlzW2tleXNdW2pdKSA9PT0gU3RyaW5nKGZ1bmMpKSB7XG4gICAgICAgICAgICByZWdpc3RlcmVkS2V5c1trZXlzXS5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbktpYm8ucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKGtleXMpIHtcbiAgcmV0dXJuIHRoaXMudW5yZWdpc3RlcktleXMoJ2Rvd24nLCBrZXlzLCBudWxsKTtcbn1cblxuS2liby5wcm90b3R5cGUuZGVsZWdhdGUgPSBmdW5jdGlvbih1cE9yRG93biwga2V5cywgZnVuYykge1xuICByZXR1cm4gKGZ1bmMgIT09IG51bGwgfHwgZnVuYyAhPT0gdW5kZWZpbmVkKSA/IHRoaXMucmVnaXN0ZXJLZXlzKHVwT3JEb3duLCBrZXlzLCBmdW5jKSA6IHRoaXMudW5yZWdpc3RlcktleXModXBPckRvd24sIGtleXMsIGZ1bmMpO1xufTtcblxuS2liby5wcm90b3R5cGUuZG93biA9IGZ1bmN0aW9uKGtleXMsIGZ1bmMpIHtcbiAgcmV0dXJuIHRoaXMuZGVsZWdhdGUoJ2Rvd24nLCBrZXlzLCBmdW5jKTtcbn07XG5cbktpYm8ucHJvdG90eXBlLnVwID0gZnVuY3Rpb24oa2V5cywgZnVuYykge1xuICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSgndXAnLCBrZXlzLCBmdW5jKTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmxhc3RLZXkgPSBmdW5jdGlvbihtb2RpZmllcikge1xuICBpZighbW9kaWZpZXIpXG4gICAgcmV0dXJuIEtpYm8ua2V5TmFtZSh0aGlzLmxhc3RLZXlDb2RlKTtcblxuICByZXR1cm4gdGhpcy5sYXN0TW9kaWZpZXJzW21vZGlmaWVyXTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmxhc3RNb2RpZmllcnNBbmRLZXkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc3VsdCwgaTtcblxuICByZXN1bHQgPSBbXTtcbiAgZm9yKGkgPSAwOyBpIDwgS2liby5NT0RJRklFUlMubGVuZ3RoOyBpKyspXG4gICAgaWYodGhpcy5sYXN0S2V5KEtpYm8uTU9ESUZJRVJTW2ldKSlcbiAgICAgIHJlc3VsdC5wdXNoKEtpYm8uTU9ESUZJRVJTW2ldKTtcblxuICBpZighS2liby5hcnJheUluY2x1ZGVzKHJlc3VsdCwgdGhpcy5sYXN0S2V5KCkpKVxuICAgIHJlc3VsdC5wdXNoKHRoaXMubGFzdEtleSgpKTtcblxuICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gS2libztcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tZWRpYV9jb250cm9sJyk7XG5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogVGhlIG1lZGlhdG9yIGlzIGEgc2luZ2xldG9uIGZvciBoYW5kbGluZyBnbG9iYWwgZXZlbnRzLlxuICovXG5cbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi9iYXNlL2V2ZW50cycpXG5cbnZhciBldmVudHMgPSBuZXcgRXZlbnRzKClcblxuY2xhc3MgTWVkaWF0b3Ige1xufVxuXG5NZWRpYXRvci5vbiA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIGV2ZW50cy5vbihuYW1lLCBjYWxsYmFjaywgY29udGV4dClcbiAgcmV0dXJuXG59XG5cbk1lZGlhdG9yLm9uY2UgPSBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICBldmVudHMub25jZShuYW1lLCBjYWxsYmFjaywgY29udGV4dClcbiAgcmV0dXJuXG59XG5cbk1lZGlhdG9yLm9mZiA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIGV2ZW50cy5vZmYobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpXG4gIHJldHVyblxufVxuXG5NZWRpYXRvci50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSwgb3B0cykge1xuICBldmVudHMudHJpZ2dlcihuYW1lLCBvcHRzKVxuICByZXR1cm5cbn1cblxuTWVkaWF0b3Iuc3RvcExpc3RlbmluZyA9IGZ1bmN0aW9uKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgZXZlbnRzLnN0b3BMaXN0ZW5pbmcob2JqLCBuYW1lLCBjYWxsYmFjaylcbiAgcmV0dXJuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWVkaWF0b3JcbiIsInZhciBVSU9iamVjdCA9IHJlcXVpcmUoJy4vdWlfb2JqZWN0JylcblxuY2xhc3MgUGxheWJhY2sgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc2V0dGluZ3MgPSB7fVxuICB9XG5cbiAgcGxheSgpIHt9XG5cbiAgcGF1c2UoKSB7fVxuXG4gIHN0b3AoKSB7fVxuXG4gIHNlZWsodGltZSkge31cblxuICBnZXREdXJhdGlvbigpIHsgcmV0dXJuIDAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gJ25vX29wJ1xuICB9XG5cbiAgaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxufVxuXG5QbGF5YmFjay5jYW5QbGF5ID0gKHNvdXJjZSkgPT4ge1xuICByZXR1cm4gZmFsc2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5YmFja1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXllckluZm8gPXtcbiAgb3B0aW9uczoge30sXG4gIHBsYXliYWNrUGx1Z2luczogW10sXG4gIGN1cnJlbnRTaXplOiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllckluZm9cblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3Bvc3RlcicpO1xuXG4iLCIvLyBTaW1wbGUgSmF2YVNjcmlwdCBUZW1wbGF0aW5nXG4vLyBQYXVsIE1pbGxlciAoaHR0cDovL3BhdWxtaWxsci5jb20pXG4vLyBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuLy8gKGMpIDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuKGZ1bmN0aW9uKGdsb2JhbHMpIHtcbiAgLy8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXG4gIC8vIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAgdmFyIHNldHRpbmdzID0ge1xuICAgIGV2YWx1YXRlICAgIDogLzwlKFtcXHNcXFNdKz8pJT4vZyxcbiAgICBpbnRlcnBvbGF0ZSA6IC88JT0oW1xcc1xcU10rPyklPi9nLFxuICAgIGVzY2FwZSAgICAgIDogLzwlLShbXFxzXFxTXSs/KSU+L2dcbiAgfTtcblxuICAvLyBXaGVuIGN1c3RvbWl6aW5nIGB0ZW1wbGF0ZVNldHRpbmdzYCwgaWYgeW91IGRvbid0IHdhbnQgdG8gZGVmaW5lIGFuXG4gIC8vIGludGVycG9sYXRpb24sIGV2YWx1YXRpb24gb3IgZXNjYXBpbmcgcmVnZXgsIHdlIG5lZWQgb25lIHRoYXQgaXNcbiAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXG4gIHZhciBub01hdGNoID0gLyguKV4vO1xuXG4gIC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4gIC8vIHN0cmluZyBsaXRlcmFsLlxuICB2YXIgZXNjYXBlcyA9IHtcbiAgICBcIidcIjogICAgICBcIidcIixcbiAgICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICAgJ1xccic6ICAgICAncicsXG4gICAgJ1xcbic6ICAgICAnbicsXG4gICAgJ1xcdCc6ICAgICAndCcsXG4gICAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ3UyMDI5J1xuICB9O1xuXG4gIHZhciBlc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdHxcXHUyMDI4fFxcdTIwMjkvZztcblxuICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxuICB2YXIgaHRtbEVudGl0aWVzID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjeDI3OydcbiAgfTtcblxuICB2YXIgZW50aXR5UmUgPSBuZXcgUmVnRXhwKCdbJjw+XCJcXCddJywgJ2cnKTtcblxuICB2YXIgZXNjYXBlRXhwciA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIGlmIChzdHJpbmcgPT0gbnVsbCkgcmV0dXJuICcnO1xuICAgIHJldHVybiAoJycgKyBzdHJpbmcpLnJlcGxhY2UoZW50aXR5UmUsIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICByZXR1cm4gaHRtbEVudGl0aWVzW21hdGNoXTtcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgY291bnRlciA9IDA7XG5cbiAgLy8gSmF2YVNjcmlwdCBtaWNyby10ZW1wbGF0aW5nLCBzaW1pbGFyIHRvIEpvaG4gUmVzaWcncyBpbXBsZW1lbnRhdGlvbi5cbiAgLy8gVW5kZXJzY29yZSB0ZW1wbGF0aW5nIGhhbmRsZXMgYXJiaXRyYXJ5IGRlbGltaXRlcnMsIHByZXNlcnZlcyB3aGl0ZXNwYWNlLFxuICAvLyBhbmQgY29ycmVjdGx5IGVzY2FwZXMgcXVvdGVzIHdpdGhpbiBpbnRlcnBvbGF0ZWQgY29kZS5cbiAgdmFyIHRtcGwgPSBmdW5jdGlvbih0ZXh0LCBkYXRhKSB7XG4gICAgdmFyIHJlbmRlcjtcblxuICAgIC8vIENvbWJpbmUgZGVsaW1pdGVycyBpbnRvIG9uZSByZWd1bGFyIGV4cHJlc3Npb24gdmlhIGFsdGVybmF0aW9uLlxuICAgIHZhciBtYXRjaGVyID0gbmV3IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldClcbiAgICAgICAgLnJlcGxhY2UoZXNjYXBlciwgZnVuY3Rpb24obWF0Y2gpIHsgcmV0dXJuICdcXFxcJyArIGVzY2FwZXNbbWF0Y2hdOyB9KTtcblxuICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGVzY2FwZSArIFwiKSk9PW51bGw/Jyc6ZXNjYXBlRXhwcihfX3QpKStcXG4nXCI7XG4gICAgICB9XG4gICAgICBpZiAoaW50ZXJwb2xhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBpbnRlcnBvbGF0ZSArIFwiKSk9PW51bGw/Jyc6X190KStcXG4nXCI7XG4gICAgICB9XG4gICAgICBpZiAoZXZhbHVhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJztcXG5cIiArIGV2YWx1YXRlICsgXCJcXG5fX3ArPSdcIjtcbiAgICAgIH1cbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuICAgIHNvdXJjZSArPSBcIic7XFxuXCI7XG5cbiAgICAvLyBJZiBhIHZhcmlhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIHBsYWNlIGRhdGEgdmFsdWVzIGluIGxvY2FsIHNjb3BlLlxuICAgIGlmICghc2V0dGluZ3MudmFyaWFibGUpIHNvdXJjZSA9ICd3aXRoKG9ianx8e30pe1xcbicgKyBzb3VyY2UgKyAnfVxcbic7XG5cbiAgICBzb3VyY2UgPSBcInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIiArXG4gICAgICBcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIgK1xuICAgICAgc291cmNlICsgXCJyZXR1cm4gX19wO1xcbi8vIyBzb3VyY2VVUkw9L21pY3JvdGVtcGxhdGVzL3NvdXJjZVtcIiArIGNvdW50ZXIrKyArIFwiXVwiO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlbmRlciA9IG5ldyBGdW5jdGlvbihzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJywgJ2VzY2FwZUV4cHInLCBzb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUuc291cmNlID0gc291cmNlO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSkgcmV0dXJuIHJlbmRlcihkYXRhLCBlc2NhcGVFeHByKTtcbiAgICB2YXIgdGVtcGxhdGUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVuZGVyLmNhbGwodGhpcywgZGF0YSwgZXNjYXBlRXhwcik7XG4gICAgfTtcblxuICAgIC8vIFByb3ZpZGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uIHNvdXJjZSBhcyBhIGNvbnZlbmllbmNlIGZvciBwcmVjb21waWxhdGlvbi5cbiAgICB0ZW1wbGF0ZS5zb3VyY2UgPSAnZnVuY3Rpb24oJyArIChzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJykgKyAnKXtcXG4nICsgc291cmNlICsgJ30nO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9O1xuICB0bXBsLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0bXBsO1xuICAgIH0pOyAvLyBSZXF1aXJlSlNcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gdG1wbDsgLy8gQ29tbW9uSlNcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWxzLm1pY3JvdGVtcGxhdGUgPSB0bXBsOyAvLyA8c2NyaXB0PlxuICB9XG59KSh0aGlzKTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBVSU9iamVjdCA9IHJlcXVpcmUoJy4vdWlfb2JqZWN0JylcblxuY2xhc3MgVUlDb250YWluZXJQbHVnaW4gZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmJpbmRFdmVudHMoKVxuICAgICAgdGhpcy4kZWwuc2hvdygpXG4gICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHRoaXMuJGVsLmhpZGUoKVxuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge31cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlKClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVJQ29udGFpbmVyUGx1Z2luXG4iLCJ2YXIgVUlPYmplY3QgPSByZXF1aXJlKCcuL3VpX29iamVjdCcpXG5cbmNsYXNzIFVJQ29yZVBsdWdpbiBleHRlbmRzIFVJT2JqZWN0IHtcbiAgY29uc3RydWN0b3IoY29yZSkge1xuICAgIHN1cGVyKGNvcmUpXG4gICAgdGhpcy5jb3JlID0gY29yZVxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICB0aGlzLmJpbmRFdmVudHMoKVxuICAgIHRoaXMucmVuZGVyKClcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7fVxuXG4gIGdldEV4dGVybmFsSW50ZXJmYWNlKCkgeyByZXR1cm4ge30gfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgICAgIHRoaXMuJGVsLnNob3coKVxuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZSgpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKCkpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHRoaXMuc3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSkpXG4gICAgdGhpcy5jb3JlLiRlbC5hcHBlbmQodGhpcy5lbClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVUlDb3JlUGx1Z2luXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgJCA9IHJlcXVpcmUoJ2NsYXBwci16ZXB0bycpXG52YXIgdW5pcXVlSWQgPSByZXF1aXJlKCcuL3V0aWxzJykudW5pcXVlSWRcbnZhciByZXN1bHQgPSByZXF1aXJlKCdsb2Rhc2gucmVzdWx0JylcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guYXNzaWduJylcbnZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnLi9iYXNlX29iamVjdCcpXG5cbnZhciBkZWxlZ2F0ZUV2ZW50U3BsaXR0ZXIgPSAvXihcXFMrKVxccyooLiopJC9cblxuY2xhc3MgVUlPYmplY3QgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcblxuICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdkaXYnIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLmNpZCA9IHVuaXF1ZUlkKCdjJyk7XG4gICAgdGhpcy5fZW5zdXJlRWxlbWVudCgpO1xuICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoKTtcbiAgfVxuXG4gICQoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy4kZWwuZmluZChzZWxlY3RvcilcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuJGVsLnJlbW92ZSgpXG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc2V0RWxlbWVudChlbGVtZW50LCBkZWxlZ2F0ZSkge1xuICAgIGlmICh0aGlzLiRlbCkgdGhpcy51bmRlbGVnYXRlRXZlbnRzKClcbiAgICB0aGlzLiRlbCA9IGVsZW1lbnQgaW5zdGFuY2VvZiAkID8gZWxlbWVudCA6ICQoZWxlbWVudClcbiAgICB0aGlzLmVsID0gdGhpcy4kZWxbMF1cbiAgICBpZiAoZGVsZWdhdGUgIT09IGZhbHNlKSB0aGlzLmRlbGVnYXRlRXZlbnRzKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZGVsZWdhdGVFdmVudHMoZXZlbnRzKSB7XG4gICAgaWYgKCEoZXZlbnRzIHx8IChldmVudHMgPSByZXN1bHQodGhpcywgJ2V2ZW50cycpKSkpIHJldHVybiB0aGlzXG4gICAgdGhpcy51bmRlbGVnYXRlRXZlbnRzKClcbiAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnRzKSB7XG4gICAgICB2YXIgbWV0aG9kID0gZXZlbnRzW2tleV1cbiAgICAgIGlmICgobWV0aG9kICYmIG1ldGhvZC5jb25zdHJ1Y3RvciAhPT0gRnVuY3Rpb24pKSBtZXRob2QgPSB0aGlzW2V2ZW50c1trZXldXVxuICAgICAgaWYgKCFtZXRob2QpIGNvbnRpbnVlXG5cbiAgICAgIHZhciBtYXRjaCA9IGtleS5tYXRjaChkZWxlZ2F0ZUV2ZW50U3BsaXR0ZXIpXG4gICAgICB2YXIgZXZlbnROYW1lID0gbWF0Y2hbMV0sIHNlbGVjdG9yID0gbWF0Y2hbMl1cbiAgICAgIC8vbWV0aG9kID0gXy5iaW5kKG1ldGhvZCwgdGhpcylcbiAgICAgIGV2ZW50TmFtZSArPSAnLmRlbGVnYXRlRXZlbnRzJyArIHRoaXMuY2lkXG4gICAgICBpZiAoc2VsZWN0b3IgPT09ICcnKSB7XG4gICAgICAgIHRoaXMuJGVsLm9uKGV2ZW50TmFtZSwgbWV0aG9kLmJpbmQodGhpcykpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbC5vbihldmVudE5hbWUsIHNlbGVjdG9yLCBtZXRob2QuYmluZCh0aGlzKSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHVuZGVsZWdhdGVFdmVudHMoKSB7XG4gICAgdGhpcy4kZWwub2ZmKCcuZGVsZWdhdGVFdmVudHMnICsgdGhpcy5jaWQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIF9lbnN1cmVFbGVtZW50KCkge1xuICAgIGlmICghdGhpcy5lbCkge1xuICAgICAgdmFyIGF0dHJzID0gYXNzaWduKHt9LCByZXN1bHQodGhpcywgJ2F0dHJpYnV0ZXMnKSlcbiAgICAgIGlmICh0aGlzLmlkKSBhdHRycy5pZCA9IHJlc3VsdCh0aGlzLCAnaWQnKVxuICAgICAgaWYgKHRoaXMuY2xhc3NOYW1lKSBhdHRyc1snY2xhc3MnXSA9IHJlc3VsdCh0aGlzLCAnY2xhc3NOYW1lJylcbiAgICAgIHZhciAkZWwgPSAkKCc8JyArIHJlc3VsdCh0aGlzLCAndGFnTmFtZScpICsgJz4nKS5hdHRyKGF0dHJzKVxuICAgICAgdGhpcy5zZXRFbGVtZW50KCRlbCwgZmFsc2UpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0RWxlbWVudChyZXN1bHQodGhpcywgJ2VsJyksIGZhbHNlKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVJT2JqZWN0XG4iLCIvKiBaZXB0byB2MS4xLjQtODAtZ2E5MTg0YjIgLSB6ZXB0byBldmVudCBhamF4IGNhbGxiYWNrcyBkZWZlcnJlZCB0b3VjaCBzZWxlY3RvciBpZSAtIHplcHRvanMuY29tL2xpY2Vuc2UgKi9cbnZhciBaZXB0bz1mdW5jdGlvbigpe2Z1bmN0aW9uIEQodCl7cmV0dXJuIG51bGw9PXQ/U3RyaW5nKHQpOmpbUy5jYWxsKHQpXXx8XCJvYmplY3RcIn1mdW5jdGlvbiBMKHQpe3JldHVyblwiZnVuY3Rpb25cIj09RCh0KX1mdW5jdGlvbiBrKHQpe3JldHVybiBudWxsIT10JiZ0PT10LndpbmRvd31mdW5jdGlvbiBaKHQpe3JldHVybiBudWxsIT10JiZ0Lm5vZGVUeXBlPT10LkRPQ1VNRU5UX05PREV9ZnVuY3Rpb24gJCh0KXtyZXR1cm5cIm9iamVjdFwiPT1EKHQpfWZ1bmN0aW9uIEYodCl7cmV0dXJuICQodCkmJiFrKHQpJiZPYmplY3QuZ2V0UHJvdG90eXBlT2YodCk9PU9iamVjdC5wcm90b3R5cGV9ZnVuY3Rpb24gUih0KXtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgdC5sZW5ndGh9ZnVuY3Rpb24gcSh0KXtyZXR1cm4gcy5jYWxsKHQsZnVuY3Rpb24odCl7cmV0dXJuIG51bGwhPXR9KX1mdW5jdGlvbiBXKHQpe3JldHVybiB0Lmxlbmd0aD4wP24uZm4uY29uY2F0LmFwcGx5KFtdLHQpOnR9ZnVuY3Rpb24geih0KXtyZXR1cm4gdC5yZXBsYWNlKC86Oi9nLFwiL1wiKS5yZXBsYWNlKC8oW0EtWl0rKShbQS1aXVthLXpdKS9nLFwiJDFfJDJcIikucmVwbGFjZSgvKFthLXpcXGRdKShbQS1aXSkvZyxcIiQxXyQyXCIpLnJlcGxhY2UoL18vZyxcIi1cIikudG9Mb3dlckNhc2UoKX1mdW5jdGlvbiBIKHQpe3JldHVybiB0IGluIGM/Y1t0XTpjW3RdPW5ldyBSZWdFeHAoXCIoXnxcXFxccylcIit0K1wiKFxcXFxzfCQpXCIpfWZ1bmN0aW9uIF8odCxlKXtyZXR1cm5cIm51bWJlclwiIT10eXBlb2YgZXx8bFt6KHQpXT9lOmUrXCJweFwifWZ1bmN0aW9uIEkodCl7dmFyIGUsbjtyZXR1cm4gZlt0XXx8KGU9dS5jcmVhdGVFbGVtZW50KHQpLHUuYm9keS5hcHBlbmRDaGlsZChlKSxuPWdldENvbXB1dGVkU3R5bGUoZSxcIlwiKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZGlzcGxheVwiKSxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZSksXCJub25lXCI9PW4mJihuPVwiYmxvY2tcIiksZlt0XT1uKSxmW3RdfWZ1bmN0aW9uIFUodCl7cmV0dXJuXCJjaGlsZHJlblwiaW4gdD9hLmNhbGwodC5jaGlsZHJlbik6bi5tYXAodC5jaGlsZE5vZGVzLGZ1bmN0aW9uKHQpe3JldHVybiAxPT10Lm5vZGVUeXBlP3Q6dm9pZCAwfSl9ZnVuY3Rpb24gWCh0LGUpe3ZhciBuLGk9dD90Lmxlbmd0aDowO2ZvcihuPTA7aT5uO24rKyl0aGlzW25dPXRbbl07dGhpcy5sZW5ndGg9aSx0aGlzLnNlbGVjdG9yPWV8fFwiXCJ9ZnVuY3Rpb24gQihuLGkscil7Zm9yKGUgaW4gaSlyJiYoRihpW2VdKXx8QShpW2VdKSk/KEYoaVtlXSkmJiFGKG5bZV0pJiYobltlXT17fSksQShpW2VdKSYmIUEobltlXSkmJihuW2VdPVtdKSxCKG5bZV0saVtlXSxyKSk6aVtlXSE9PXQmJihuW2VdPWlbZV0pfWZ1bmN0aW9uIFYodCxlKXtyZXR1cm4gbnVsbD09ZT9uKHQpOm4odCkuZmlsdGVyKGUpfWZ1bmN0aW9uIFkodCxlLG4saSl7cmV0dXJuIEwoZSk/ZS5jYWxsKHQsbixpKTplfWZ1bmN0aW9uIEoodCxlLG4pe251bGw9PW4/dC5yZW1vdmVBdHRyaWJ1dGUoZSk6dC5zZXRBdHRyaWJ1dGUoZSxuKX1mdW5jdGlvbiBHKGUsbil7dmFyIGk9ZS5jbGFzc05hbWV8fFwiXCIscj1pJiZpLmJhc2VWYWwhPT10O3JldHVybiBuPT09dD9yP2kuYmFzZVZhbDppOnZvaWQocj9pLmJhc2VWYWw9bjplLmNsYXNzTmFtZT1uKX1mdW5jdGlvbiBLKHQpe3RyeXtyZXR1cm4gdD9cInRydWVcIj09dHx8KFwiZmFsc2VcIj09dD8hMTpcIm51bGxcIj09dD9udWxsOit0K1wiXCI9PXQ/K3Q6L15bXFxbXFx7XS8udGVzdCh0KT9uLnBhcnNlSlNPTih0KTp0KTp0fWNhdGNoKGUpe3JldHVybiB0fX1mdW5jdGlvbiBRKHQsZSl7ZSh0KTtmb3IodmFyIG49MCxpPXQuY2hpbGROb2Rlcy5sZW5ndGg7aT5uO24rKylRKHQuY2hpbGROb2Rlc1tuXSxlKX12YXIgdCxlLG4saSxOLFAscj1bXSxvPXIuY29uY2F0LHM9ci5maWx0ZXIsYT1yLnNsaWNlLHU9d2luZG93LmRvY3VtZW50LGY9e30sYz17fSxsPXtcImNvbHVtbi1jb3VudFwiOjEsY29sdW1uczoxLFwiZm9udC13ZWlnaHRcIjoxLFwibGluZS1oZWlnaHRcIjoxLG9wYWNpdHk6MSxcInotaW5kZXhcIjoxLHpvb206MX0saD0vXlxccyo8KFxcdyt8ISlbXj5dKj4vLHA9L148KFxcdyspXFxzKlxcLz8+KD86PFxcL1xcMT58KSQvLGQ9LzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW1xcdzpdKylbXj5dKilcXC8+L2dpLG09L14oPzpib2R5fGh0bWwpJC9pLGc9LyhbQS1aXSkvZyx2PVtcInZhbFwiLFwiY3NzXCIsXCJodG1sXCIsXCJ0ZXh0XCIsXCJkYXRhXCIsXCJ3aWR0aFwiLFwiaGVpZ2h0XCIsXCJvZmZzZXRcIl0seT1bXCJhZnRlclwiLFwicHJlcGVuZFwiLFwiYmVmb3JlXCIsXCJhcHBlbmRcIl0sdz11LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKSx4PXUuY3JlYXRlRWxlbWVudChcInRyXCIpLGI9e3RyOnUuY3JlYXRlRWxlbWVudChcInRib2R5XCIpLHRib2R5OncsdGhlYWQ6dyx0Zm9vdDp3LHRkOngsdGg6eCxcIipcIjp1LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIil9LEU9L2NvbXBsZXRlfGxvYWRlZHxpbnRlcmFjdGl2ZS8sVD0vXltcXHctXSokLyxqPXt9LFM9ai50b1N0cmluZyxDPXt9LE89dS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLE09e3RhYmluZGV4OlwidGFiSW5kZXhcIixyZWFkb25seTpcInJlYWRPbmx5XCIsXCJmb3JcIjpcImh0bWxGb3JcIixcImNsYXNzXCI6XCJjbGFzc05hbWVcIixtYXhsZW5ndGg6XCJtYXhMZW5ndGhcIixjZWxsc3BhY2luZzpcImNlbGxTcGFjaW5nXCIsY2VsbHBhZGRpbmc6XCJjZWxsUGFkZGluZ1wiLHJvd3NwYW46XCJyb3dTcGFuXCIsY29sc3BhbjpcImNvbFNwYW5cIix1c2VtYXA6XCJ1c2VNYXBcIixmcmFtZWJvcmRlcjpcImZyYW1lQm9yZGVyXCIsY29udGVudGVkaXRhYmxlOlwiY29udGVudEVkaXRhYmxlXCJ9LEE9QXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBBcnJheX07cmV0dXJuIEMubWF0Y2hlcz1mdW5jdGlvbih0LGUpe2lmKCFlfHwhdHx8MSE9PXQubm9kZVR5cGUpcmV0dXJuITE7dmFyIG49dC53ZWJraXRNYXRjaGVzU2VsZWN0b3J8fHQubW96TWF0Y2hlc1NlbGVjdG9yfHx0Lm9NYXRjaGVzU2VsZWN0b3J8fHQubWF0Y2hlc1NlbGVjdG9yO2lmKG4pcmV0dXJuIG4uY2FsbCh0LGUpO3ZhciBpLHI9dC5wYXJlbnROb2RlLG89IXI7cmV0dXJuIG8mJihyPU8pLmFwcGVuZENoaWxkKHQpLGk9fkMucXNhKHIsZSkuaW5kZXhPZih0KSxvJiZPLnJlbW92ZUNoaWxkKHQpLGl9LE49ZnVuY3Rpb24odCl7cmV0dXJuIHQucmVwbGFjZSgvLSsoLik/L2csZnVuY3Rpb24odCxlKXtyZXR1cm4gZT9lLnRvVXBwZXJDYXNlKCk6XCJcIn0pfSxQPWZ1bmN0aW9uKHQpe3JldHVybiBzLmNhbGwodCxmdW5jdGlvbihlLG4pe3JldHVybiB0LmluZGV4T2YoZSk9PW59KX0sQy5mcmFnbWVudD1mdW5jdGlvbihlLGkscil7dmFyIG8scyxmO3JldHVybiBwLnRlc3QoZSkmJihvPW4odS5jcmVhdGVFbGVtZW50KFJlZ0V4cC4kMSkpKSxvfHwoZS5yZXBsYWNlJiYoZT1lLnJlcGxhY2UoZCxcIjwkMT48LyQyPlwiKSksaT09PXQmJihpPWgudGVzdChlKSYmUmVnRXhwLiQxKSxpIGluIGJ8fChpPVwiKlwiKSxmPWJbaV0sZi5pbm5lckhUTUw9XCJcIitlLG89bi5lYWNoKGEuY2FsbChmLmNoaWxkTm9kZXMpLGZ1bmN0aW9uKCl7Zi5yZW1vdmVDaGlsZCh0aGlzKX0pKSxGKHIpJiYocz1uKG8pLG4uZWFjaChyLGZ1bmN0aW9uKHQsZSl7di5pbmRleE9mKHQpPi0xP3NbdF0oZSk6cy5hdHRyKHQsZSl9KSksb30sQy5aPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIG5ldyBYKHQsZSl9LEMuaXNaPWZ1bmN0aW9uKHQpe3JldHVybiB0IGluc3RhbmNlb2YgQy5afSxDLmluaXQ9ZnVuY3Rpb24oZSxpKXt2YXIgcjtpZighZSlyZXR1cm4gQy5aKCk7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpaWYoZT1lLnRyaW0oKSxcIjxcIj09ZVswXSYmaC50ZXN0KGUpKXI9Qy5mcmFnbWVudChlLFJlZ0V4cC4kMSxpKSxlPW51bGw7ZWxzZXtpZihpIT09dClyZXR1cm4gbihpKS5maW5kKGUpO3I9Qy5xc2EodSxlKX1lbHNle2lmKEwoZSkpcmV0dXJuIG4odSkucmVhZHkoZSk7aWYoQy5pc1ooZSkpcmV0dXJuIGU7aWYoQShlKSlyPXEoZSk7ZWxzZSBpZigkKGUpKXI9W2VdLGU9bnVsbDtlbHNlIGlmKGgudGVzdChlKSlyPUMuZnJhZ21lbnQoZS50cmltKCksUmVnRXhwLiQxLGkpLGU9bnVsbDtlbHNle2lmKGkhPT10KXJldHVybiBuKGkpLmZpbmQoZSk7cj1DLnFzYSh1LGUpfX1yZXR1cm4gQy5aKHIsZSl9LG49ZnVuY3Rpb24odCxlKXtyZXR1cm4gQy5pbml0KHQsZSl9LG4uZXh0ZW5kPWZ1bmN0aW9uKHQpe3ZhciBlLG49YS5jYWxsKGFyZ3VtZW50cywxKTtyZXR1cm5cImJvb2xlYW5cIj09dHlwZW9mIHQmJihlPXQsdD1uLnNoaWZ0KCkpLG4uZm9yRWFjaChmdW5jdGlvbihuKXtCKHQsbixlKX0pLHR9LEMucXNhPWZ1bmN0aW9uKHQsZSl7dmFyIG4saT1cIiNcIj09ZVswXSxyPSFpJiZcIi5cIj09ZVswXSxvPWl8fHI/ZS5zbGljZSgxKTplLHM9VC50ZXN0KG8pO3JldHVybiB0LmdldEVsZW1lbnRCeUlkJiZzJiZpPyhuPXQuZ2V0RWxlbWVudEJ5SWQobykpP1tuXTpbXToxIT09dC5ub2RlVHlwZSYmOSE9PXQubm9kZVR5cGUmJjExIT09dC5ub2RlVHlwZT9bXTphLmNhbGwocyYmIWkmJnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZT9yP3QuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShvKTp0LmdldEVsZW1lbnRzQnlUYWdOYW1lKGUpOnQucXVlcnlTZWxlY3RvckFsbChlKSl9LG4uY29udGFpbnM9dS5kb2N1bWVudEVsZW1lbnQuY29udGFpbnM/ZnVuY3Rpb24odCxlKXtyZXR1cm4gdCE9PWUmJnQuY29udGFpbnMoZSl9OmZ1bmN0aW9uKHQsZSl7Zm9yKDtlJiYoZT1lLnBhcmVudE5vZGUpOylpZihlPT09dClyZXR1cm4hMDtyZXR1cm4hMX0sbi50eXBlPUQsbi5pc0Z1bmN0aW9uPUwsbi5pc1dpbmRvdz1rLG4uaXNBcnJheT1BLG4uaXNQbGFpbk9iamVjdD1GLG4uaXNFbXB0eU9iamVjdD1mdW5jdGlvbih0KXt2YXIgZTtmb3IoZSBpbiB0KXJldHVybiExO3JldHVybiEwfSxuLmluQXJyYXk9ZnVuY3Rpb24odCxlLG4pe3JldHVybiByLmluZGV4T2YuY2FsbChlLHQsbil9LG4uY2FtZWxDYXNlPU4sbi50cmltPWZ1bmN0aW9uKHQpe3JldHVybiBudWxsPT10P1wiXCI6U3RyaW5nLnByb3RvdHlwZS50cmltLmNhbGwodCl9LG4udXVpZD0wLG4uc3VwcG9ydD17fSxuLmV4cHI9e30sbi5ub29wPWZ1bmN0aW9uKCl7fSxuLm1hcD1mdW5jdGlvbih0LGUpe3ZhciBuLHIsbyxpPVtdO2lmKFIodCkpZm9yKHI9MDtyPHQubGVuZ3RoO3IrKyluPWUodFtyXSxyKSxudWxsIT1uJiZpLnB1c2gobik7ZWxzZSBmb3IobyBpbiB0KW49ZSh0W29dLG8pLG51bGwhPW4mJmkucHVzaChuKTtyZXR1cm4gVyhpKX0sbi5lYWNoPWZ1bmN0aW9uKHQsZSl7dmFyIG4saTtpZihSKHQpKXtmb3Iobj0wO248dC5sZW5ndGg7bisrKWlmKGUuY2FsbCh0W25dLG4sdFtuXSk9PT0hMSlyZXR1cm4gdH1lbHNlIGZvcihpIGluIHQpaWYoZS5jYWxsKHRbaV0saSx0W2ldKT09PSExKXJldHVybiB0O3JldHVybiB0fSxuLmdyZXA9ZnVuY3Rpb24odCxlKXtyZXR1cm4gcy5jYWxsKHQsZSl9LHdpbmRvdy5KU09OJiYobi5wYXJzZUpTT049SlNPTi5wYXJzZSksbi5lYWNoKFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvclwiLnNwbGl0KFwiIFwiKSxmdW5jdGlvbih0LGUpe2pbXCJbb2JqZWN0IFwiK2UrXCJdXCJdPWUudG9Mb3dlckNhc2UoKX0pLG4uZm49e2NvbnN0cnVjdG9yOkMuWixsZW5ndGg6MCxmb3JFYWNoOnIuZm9yRWFjaCxyZWR1Y2U6ci5yZWR1Y2UscHVzaDpyLnB1c2gsc29ydDpyLnNvcnQsc3BsaWNlOnIuc3BsaWNlLGluZGV4T2Y6ci5pbmRleE9mLGNvbmNhdDpmdW5jdGlvbigpe3ZhciB0LGUsbj1bXTtmb3IodD0wO3Q8YXJndW1lbnRzLmxlbmd0aDt0KyspZT1hcmd1bWVudHNbdF0sblt0XT1DLmlzWihlKT9lLnRvQXJyYXkoKTplO3JldHVybiBvLmFwcGx5KEMuaXNaKHRoaXMpP3RoaXMudG9BcnJheSgpOnRoaXMsbil9LG1hcDpmdW5jdGlvbih0KXtyZXR1cm4gbihuLm1hcCh0aGlzLGZ1bmN0aW9uKGUsbil7cmV0dXJuIHQuY2FsbChlLG4sZSl9KSl9LHNsaWNlOmZ1bmN0aW9uKCl7cmV0dXJuIG4oYS5hcHBseSh0aGlzLGFyZ3VtZW50cykpfSxyZWFkeTpmdW5jdGlvbih0KXtyZXR1cm4gRS50ZXN0KHUucmVhZHlTdGF0ZSkmJnUuYm9keT90KG4pOnUuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIixmdW5jdGlvbigpe3Qobil9LCExKSx0aGlzfSxnZXQ6ZnVuY3Rpb24oZSl7cmV0dXJuIGU9PT10P2EuY2FsbCh0aGlzKTp0aGlzW2U+PTA/ZTplK3RoaXMubGVuZ3RoXX0sdG9BcnJheTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmdldCgpfSxzaXplOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubGVuZ3RofSxyZW1vdmU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7bnVsbCE9dGhpcy5wYXJlbnROb2RlJiZ0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyl9KX0sZWFjaDpmdW5jdGlvbih0KXtyZXR1cm4gci5ldmVyeS5jYWxsKHRoaXMsZnVuY3Rpb24oZSxuKXtyZXR1cm4gdC5jYWxsKGUsbixlKSE9PSExfSksdGhpc30sZmlsdGVyOmZ1bmN0aW9uKHQpe3JldHVybiBMKHQpP3RoaXMubm90KHRoaXMubm90KHQpKTpuKHMuY2FsbCh0aGlzLGZ1bmN0aW9uKGUpe3JldHVybiBDLm1hdGNoZXMoZSx0KX0pKX0sYWRkOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIG4oUCh0aGlzLmNvbmNhdChuKHQsZSkpKSl9LGlzOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmxlbmd0aD4wJiZDLm1hdGNoZXModGhpc1swXSx0KX0sbm90OmZ1bmN0aW9uKGUpe3ZhciBpPVtdO2lmKEwoZSkmJmUuY2FsbCE9PXQpdGhpcy5lYWNoKGZ1bmN0aW9uKHQpe2UuY2FsbCh0aGlzLHQpfHxpLnB1c2godGhpcyl9KTtlbHNle3ZhciByPVwic3RyaW5nXCI9PXR5cGVvZiBlP3RoaXMuZmlsdGVyKGUpOlIoZSkmJkwoZS5pdGVtKT9hLmNhbGwoZSk6bihlKTt0aGlzLmZvckVhY2goZnVuY3Rpb24odCl7ci5pbmRleE9mKHQpPDAmJmkucHVzaCh0KX0pfXJldHVybiBuKGkpfSxoYXM6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCl7cmV0dXJuICQodCk/bi5jb250YWlucyh0aGlzLHQpOm4odGhpcykuZmluZCh0KS5zaXplKCl9KX0sZXE6ZnVuY3Rpb24odCl7cmV0dXJuLTE9PT10P3RoaXMuc2xpY2UodCk6dGhpcy5zbGljZSh0LCt0KzEpfSxmaXJzdDpmdW5jdGlvbigpe3ZhciB0PXRoaXNbMF07cmV0dXJuIHQmJiEkKHQpP3Q6bih0KX0sbGFzdDpmdW5jdGlvbigpe3ZhciB0PXRoaXNbdGhpcy5sZW5ndGgtMV07cmV0dXJuIHQmJiEkKHQpP3Q6bih0KX0sZmluZDpmdW5jdGlvbih0KXt2YXIgZSxpPXRoaXM7cmV0dXJuIGU9dD9cIm9iamVjdFwiPT10eXBlb2YgdD9uKHQpLmZpbHRlcihmdW5jdGlvbigpe3ZhciB0PXRoaXM7cmV0dXJuIHIuc29tZS5jYWxsKGksZnVuY3Rpb24oZSl7cmV0dXJuIG4uY29udGFpbnMoZSx0KX0pfSk6MT09dGhpcy5sZW5ndGg/bihDLnFzYSh0aGlzWzBdLHQpKTp0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiBDLnFzYSh0aGlzLHQpfSk6bigpfSxjbG9zZXN0OmZ1bmN0aW9uKHQsZSl7dmFyIGk9dGhpc1swXSxyPSExO2ZvcihcIm9iamVjdFwiPT10eXBlb2YgdCYmKHI9bih0KSk7aSYmIShyP3IuaW5kZXhPZihpKT49MDpDLm1hdGNoZXMoaSx0KSk7KWk9aSE9PWUmJiFaKGkpJiZpLnBhcmVudE5vZGU7cmV0dXJuIG4oaSl9LHBhcmVudHM6ZnVuY3Rpb24odCl7Zm9yKHZhciBlPVtdLGk9dGhpcztpLmxlbmd0aD4wOylpPW4ubWFwKGksZnVuY3Rpb24odCl7cmV0dXJuKHQ9dC5wYXJlbnROb2RlKSYmIVoodCkmJmUuaW5kZXhPZih0KTwwPyhlLnB1c2godCksdCk6dm9pZCAwfSk7cmV0dXJuIFYoZSx0KX0scGFyZW50OmZ1bmN0aW9uKHQpe3JldHVybiBWKFAodGhpcy5wbHVjayhcInBhcmVudE5vZGVcIikpLHQpfSxjaGlsZHJlbjpmdW5jdGlvbih0KXtyZXR1cm4gVih0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiBVKHRoaXMpfSksdCl9LGNvbnRlbnRzOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGVudERvY3VtZW50fHxhLmNhbGwodGhpcy5jaGlsZE5vZGVzKX0pfSxzaWJsaW5nczpmdW5jdGlvbih0KXtyZXR1cm4gVih0aGlzLm1hcChmdW5jdGlvbih0LGUpe3JldHVybiBzLmNhbGwoVShlLnBhcmVudE5vZGUpLGZ1bmN0aW9uKHQpe3JldHVybiB0IT09ZX0pfSksdCl9LGVtcHR5OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3RoaXMuaW5uZXJIVE1MPVwiXCJ9KX0scGx1Y2s6ZnVuY3Rpb24odCl7cmV0dXJuIG4ubWFwKHRoaXMsZnVuY3Rpb24oZSl7cmV0dXJuIGVbdF19KX0sc2hvdzpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcIm5vbmVcIj09dGhpcy5zdHlsZS5kaXNwbGF5JiYodGhpcy5zdHlsZS5kaXNwbGF5PVwiXCIpLFwibm9uZVwiPT1nZXRDb21wdXRlZFN0eWxlKHRoaXMsXCJcIikuZ2V0UHJvcGVydHlWYWx1ZShcImRpc3BsYXlcIikmJih0aGlzLnN0eWxlLmRpc3BsYXk9SSh0aGlzLm5vZGVOYW1lKSl9KX0scmVwbGFjZVdpdGg6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuYmVmb3JlKHQpLnJlbW92ZSgpfSx3cmFwOmZ1bmN0aW9uKHQpe3ZhciBlPUwodCk7aWYodGhpc1swXSYmIWUpdmFyIGk9bih0KS5nZXQoMCkscj1pLnBhcmVudE5vZGV8fHRoaXMubGVuZ3RoPjE7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihvKXtuKHRoaXMpLndyYXBBbGwoZT90LmNhbGwodGhpcyxvKTpyP2kuY2xvbmVOb2RlKCEwKTppKX0pfSx3cmFwQWxsOmZ1bmN0aW9uKHQpe2lmKHRoaXNbMF0pe24odGhpc1swXSkuYmVmb3JlKHQ9bih0KSk7Zm9yKHZhciBlOyhlPXQuY2hpbGRyZW4oKSkubGVuZ3RoOyl0PWUuZmlyc3QoKTtuKHQpLmFwcGVuZCh0aGlzKX1yZXR1cm4gdGhpc30sd3JhcElubmVyOmZ1bmN0aW9uKHQpe3ZhciBlPUwodCk7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpKXt2YXIgcj1uKHRoaXMpLG89ci5jb250ZW50cygpLHM9ZT90LmNhbGwodGhpcyxpKTp0O28ubGVuZ3RoP28ud3JhcEFsbChzKTpyLmFwcGVuZChzKX0pfSx1bndyYXA6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wYXJlbnQoKS5lYWNoKGZ1bmN0aW9uKCl7bih0aGlzKS5yZXBsYWNlV2l0aChuKHRoaXMpLmNoaWxkcmVuKCkpfSksdGhpc30sY2xvbmU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jbG9uZU5vZGUoITApfSl9LGhpZGU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpfSx0b2dnbGU6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBpPW4odGhpcyk7KGU9PT10P1wibm9uZVwiPT1pLmNzcyhcImRpc3BsYXlcIik6ZSk/aS5zaG93KCk6aS5oaWRlKCl9KX0scHJldjpmdW5jdGlvbih0KXtyZXR1cm4gbih0aGlzLnBsdWNrKFwicHJldmlvdXNFbGVtZW50U2libGluZ1wiKSkuZmlsdGVyKHR8fFwiKlwiKX0sbmV4dDpmdW5jdGlvbih0KXtyZXR1cm4gbih0aGlzLnBsdWNrKFwibmV4dEVsZW1lbnRTaWJsaW5nXCIpKS5maWx0ZXIodHx8XCIqXCIpfSxodG1sOmZ1bmN0aW9uKHQpe3JldHVybiAwIGluIGFyZ3VtZW50cz90aGlzLmVhY2goZnVuY3Rpb24oZSl7dmFyIGk9dGhpcy5pbm5lckhUTUw7bih0aGlzKS5lbXB0eSgpLmFwcGVuZChZKHRoaXMsdCxlLGkpKX0pOjAgaW4gdGhpcz90aGlzWzBdLmlubmVySFRNTDpudWxsfSx0ZXh0OmZ1bmN0aW9uKHQpe3JldHVybiAwIGluIGFyZ3VtZW50cz90aGlzLmVhY2goZnVuY3Rpb24oZSl7dmFyIG49WSh0aGlzLHQsZSx0aGlzLnRleHRDb250ZW50KTt0aGlzLnRleHRDb250ZW50PW51bGw9PW4/XCJcIjpcIlwiK259KTowIGluIHRoaXM/dGhpc1swXS50ZXh0Q29udGVudDpudWxsfSxhdHRyOmZ1bmN0aW9uKG4saSl7dmFyIHI7cmV0dXJuXCJzdHJpbmdcIiE9dHlwZW9mIG58fDEgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbih0KXtpZigxPT09dGhpcy5ub2RlVHlwZSlpZigkKG4pKWZvcihlIGluIG4pSih0aGlzLGUsbltlXSk7ZWxzZSBKKHRoaXMsbixZKHRoaXMsaSx0LHRoaXMuZ2V0QXR0cmlidXRlKG4pKSl9KTp0aGlzLmxlbmd0aCYmMT09PXRoaXNbMF0ubm9kZVR5cGU/IShyPXRoaXNbMF0uZ2V0QXR0cmlidXRlKG4pKSYmbiBpbiB0aGlzWzBdP3RoaXNbMF1bbl06cjp0fSxyZW1vdmVBdHRyOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXsxPT09dGhpcy5ub2RlVHlwZSYmdC5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbih0KXtKKHRoaXMsdCl9LHRoaXMpfSl9LHByb3A6ZnVuY3Rpb24odCxlKXtyZXR1cm4gdD1NW3RdfHx0LDEgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihuKXt0aGlzW3RdPVkodGhpcyxlLG4sdGhpc1t0XSl9KTp0aGlzWzBdJiZ0aGlzWzBdW3RdfSxkYXRhOmZ1bmN0aW9uKGUsbil7dmFyIGk9XCJkYXRhLVwiK2UucmVwbGFjZShnLFwiLSQxXCIpLnRvTG93ZXJDYXNlKCkscj0xIGluIGFyZ3VtZW50cz90aGlzLmF0dHIoaSxuKTp0aGlzLmF0dHIoaSk7cmV0dXJuIG51bGwhPT1yP0socik6dH0sdmFsOmZ1bmN0aW9uKHQpe3JldHVybiAwIGluIGFyZ3VtZW50cz90aGlzLmVhY2goZnVuY3Rpb24oZSl7dGhpcy52YWx1ZT1ZKHRoaXMsdCxlLHRoaXMudmFsdWUpfSk6dGhpc1swXSYmKHRoaXNbMF0ubXVsdGlwbGU/bih0aGlzWzBdKS5maW5kKFwib3B0aW9uXCIpLmZpbHRlcihmdW5jdGlvbigpe3JldHVybiB0aGlzLnNlbGVjdGVkfSkucGx1Y2soXCJ2YWx1ZVwiKTp0aGlzWzBdLnZhbHVlKX0sb2Zmc2V0OmZ1bmN0aW9uKHQpe2lmKHQpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihlKXt2YXIgaT1uKHRoaXMpLHI9WSh0aGlzLHQsZSxpLm9mZnNldCgpKSxvPWkub2Zmc2V0UGFyZW50KCkub2Zmc2V0KCkscz17dG9wOnIudG9wLW8udG9wLGxlZnQ6ci5sZWZ0LW8ubGVmdH07XCJzdGF0aWNcIj09aS5jc3MoXCJwb3NpdGlvblwiKSYmKHMucG9zaXRpb249XCJyZWxhdGl2ZVwiKSxpLmNzcyhzKX0pO2lmKCF0aGlzLmxlbmd0aClyZXR1cm4gbnVsbDtpZighbi5jb250YWlucyh1LmRvY3VtZW50RWxlbWVudCx0aGlzWzBdKSlyZXR1cm57dG9wOjAsbGVmdDowfTt2YXIgZT10aGlzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3JldHVybntsZWZ0OmUubGVmdCt3aW5kb3cucGFnZVhPZmZzZXQsdG9wOmUudG9wK3dpbmRvdy5wYWdlWU9mZnNldCx3aWR0aDpNYXRoLnJvdW5kKGUud2lkdGgpLGhlaWdodDpNYXRoLnJvdW5kKGUuaGVpZ2h0KX19LGNzczpmdW5jdGlvbih0LGkpe2lmKGFyZ3VtZW50cy5sZW5ndGg8Mil7dmFyIHIsbz10aGlzWzBdO2lmKCFvKXJldHVybjtpZihyPWdldENvbXB1dGVkU3R5bGUobyxcIlwiKSxcInN0cmluZ1wiPT10eXBlb2YgdClyZXR1cm4gby5zdHlsZVtOKHQpXXx8ci5nZXRQcm9wZXJ0eVZhbHVlKHQpO2lmKEEodCkpe3ZhciBzPXt9O3JldHVybiBuLmVhY2godCxmdW5jdGlvbih0LGUpe3NbZV09by5zdHlsZVtOKGUpXXx8ci5nZXRQcm9wZXJ0eVZhbHVlKGUpfSksc319dmFyIGE9XCJcIjtpZihcInN0cmluZ1wiPT1EKHQpKWl8fDA9PT1pP2E9eih0KStcIjpcIitfKHQsaSk6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7dGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eSh6KHQpKX0pO2Vsc2UgZm9yKGUgaW4gdCl0W2VdfHwwPT09dFtlXT9hKz16KGUpK1wiOlwiK18oZSx0W2VdKStcIjtcIjp0aGlzLmVhY2goZnVuY3Rpb24oKXt0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KHooZSkpfSk7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3RoaXMuc3R5bGUuY3NzVGV4dCs9XCI7XCIrYX0pfSxpbmRleDpmdW5jdGlvbih0KXtyZXR1cm4gdD90aGlzLmluZGV4T2Yobih0KVswXSk6dGhpcy5wYXJlbnQoKS5jaGlsZHJlbigpLmluZGV4T2YodGhpc1swXSl9LGhhc0NsYXNzOmZ1bmN0aW9uKHQpe3JldHVybiB0P3Iuc29tZS5jYWxsKHRoaXMsZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMudGVzdChHKHQpKX0sSCh0KSk6ITF9LGFkZENsYXNzOmZ1bmN0aW9uKHQpe3JldHVybiB0P3RoaXMuZWFjaChmdW5jdGlvbihlKXtpZihcImNsYXNzTmFtZVwiaW4gdGhpcyl7aT1bXTt2YXIgcj1HKHRoaXMpLG89WSh0aGlzLHQsZSxyKTtvLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24odCl7bih0aGlzKS5oYXNDbGFzcyh0KXx8aS5wdXNoKHQpfSx0aGlzKSxpLmxlbmd0aCYmRyh0aGlzLHIrKHI/XCIgXCI6XCJcIikraS5qb2luKFwiIFwiKSl9fSk6dGhpc30scmVtb3ZlQ2xhc3M6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihuKXtpZihcImNsYXNzTmFtZVwiaW4gdGhpcyl7aWYoZT09PXQpcmV0dXJuIEcodGhpcyxcIlwiKTtpPUcodGhpcyksWSh0aGlzLGUsbixpKS5zcGxpdCgvXFxzKy9nKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe2k9aS5yZXBsYWNlKEgodCksXCIgXCIpfSksRyh0aGlzLGkudHJpbSgpKX19KX0sdG9nZ2xlQ2xhc3M6ZnVuY3Rpb24oZSxpKXtyZXR1cm4gZT90aGlzLmVhY2goZnVuY3Rpb24ocil7dmFyIG89bih0aGlzKSxzPVkodGhpcyxlLHIsRyh0aGlzKSk7cy5zcGxpdCgvXFxzKy9nKS5mb3JFYWNoKGZ1bmN0aW9uKGUpeyhpPT09dD8hby5oYXNDbGFzcyhlKTppKT9vLmFkZENsYXNzKGUpOm8ucmVtb3ZlQ2xhc3MoZSl9KX0pOnRoaXN9LHNjcm9sbFRvcDpmdW5jdGlvbihlKXtpZih0aGlzLmxlbmd0aCl7dmFyIG49XCJzY3JvbGxUb3BcImluIHRoaXNbMF07cmV0dXJuIGU9PT10P24/dGhpc1swXS5zY3JvbGxUb3A6dGhpc1swXS5wYWdlWU9mZnNldDp0aGlzLmVhY2gobj9mdW5jdGlvbigpe3RoaXMuc2Nyb2xsVG9wPWV9OmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxUbyh0aGlzLnNjcm9sbFgsZSl9KX19LHNjcm9sbExlZnQ6ZnVuY3Rpb24oZSl7aWYodGhpcy5sZW5ndGgpe3ZhciBuPVwic2Nyb2xsTGVmdFwiaW4gdGhpc1swXTtyZXR1cm4gZT09PXQ/bj90aGlzWzBdLnNjcm9sbExlZnQ6dGhpc1swXS5wYWdlWE9mZnNldDp0aGlzLmVhY2gobj9mdW5jdGlvbigpe3RoaXMuc2Nyb2xsTGVmdD1lfTpmdW5jdGlvbigpe3RoaXMuc2Nyb2xsVG8oZSx0aGlzLnNjcm9sbFkpfSl9fSxwb3NpdGlvbjpmdW5jdGlvbigpe2lmKHRoaXMubGVuZ3RoKXt2YXIgdD10aGlzWzBdLGU9dGhpcy5vZmZzZXRQYXJlbnQoKSxpPXRoaXMub2Zmc2V0KCkscj1tLnRlc3QoZVswXS5ub2RlTmFtZSk/e3RvcDowLGxlZnQ6MH06ZS5vZmZzZXQoKTtyZXR1cm4gaS50b3AtPXBhcnNlRmxvYXQobih0KS5jc3MoXCJtYXJnaW4tdG9wXCIpKXx8MCxpLmxlZnQtPXBhcnNlRmxvYXQobih0KS5jc3MoXCJtYXJnaW4tbGVmdFwiKSl8fDAsci50b3ArPXBhcnNlRmxvYXQobihlWzBdKS5jc3MoXCJib3JkZXItdG9wLXdpZHRoXCIpKXx8MCxyLmxlZnQrPXBhcnNlRmxvYXQobihlWzBdKS5jc3MoXCJib3JkZXItbGVmdC13aWR0aFwiKSl8fDAse3RvcDppLnRvcC1yLnRvcCxsZWZ0OmkubGVmdC1yLmxlZnR9fX0sb2Zmc2V0UGFyZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7Zm9yKHZhciB0PXRoaXMub2Zmc2V0UGFyZW50fHx1LmJvZHk7dCYmIW0udGVzdCh0Lm5vZGVOYW1lKSYmXCJzdGF0aWNcIj09bih0KS5jc3MoXCJwb3NpdGlvblwiKTspdD10Lm9mZnNldFBhcmVudDtyZXR1cm4gdH0pfX0sbi5mbi5kZXRhY2g9bi5mbi5yZW1vdmUsW1wid2lkdGhcIixcImhlaWdodFwiXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciBpPWUucmVwbGFjZSgvLi8sZnVuY3Rpb24odCl7cmV0dXJuIHRbMF0udG9VcHBlckNhc2UoKX0pO24uZm5bZV09ZnVuY3Rpb24ocil7dmFyIG8scz10aGlzWzBdO3JldHVybiByPT09dD9rKHMpP3NbXCJpbm5lclwiK2ldOloocyk/cy5kb2N1bWVudEVsZW1lbnRbXCJzY3JvbGxcIitpXToobz10aGlzLm9mZnNldCgpKSYmb1tlXTp0aGlzLmVhY2goZnVuY3Rpb24odCl7cz1uKHRoaXMpLHMuY3NzKGUsWSh0aGlzLHIsdCxzW2VdKCkpKX0pfX0pLHkuZm9yRWFjaChmdW5jdGlvbih0LGUpe3ZhciBpPWUlMjtuLmZuW3RdPWZ1bmN0aW9uKCl7dmFyIHQsbyxyPW4ubWFwKGFyZ3VtZW50cyxmdW5jdGlvbihlKXtyZXR1cm4gdD1EKGUpLFwib2JqZWN0XCI9PXR8fFwiYXJyYXlcIj09dHx8bnVsbD09ZT9lOkMuZnJhZ21lbnQoZSl9KSxzPXRoaXMubGVuZ3RoPjE7cmV0dXJuIHIubGVuZ3RoPDE/dGhpczp0aGlzLmVhY2goZnVuY3Rpb24odCxhKXtvPWk/YTphLnBhcmVudE5vZGUsYT0wPT1lP2EubmV4dFNpYmxpbmc6MT09ZT9hLmZpcnN0Q2hpbGQ6Mj09ZT9hOm51bGw7dmFyIGY9bi5jb250YWlucyh1LmRvY3VtZW50RWxlbWVudCxvKTtyLmZvckVhY2goZnVuY3Rpb24odCl7aWYocyl0PXQuY2xvbmVOb2RlKCEwKTtlbHNlIGlmKCFvKXJldHVybiBuKHQpLnJlbW92ZSgpO28uaW5zZXJ0QmVmb3JlKHQsYSksZiYmUSh0LGZ1bmN0aW9uKHQpe251bGw9PXQubm9kZU5hbWV8fFwiU0NSSVBUXCIhPT10Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCl8fHQudHlwZSYmXCJ0ZXh0L2phdmFzY3JpcHRcIiE9PXQudHlwZXx8dC5zcmN8fHdpbmRvdy5ldmFsLmNhbGwod2luZG93LHQuaW5uZXJIVE1MKX0pfSl9KX0sbi5mbltpP3QrXCJUb1wiOlwiaW5zZXJ0XCIrKGU/XCJCZWZvcmVcIjpcIkFmdGVyXCIpXT1mdW5jdGlvbihlKXtyZXR1cm4gbihlKVt0XSh0aGlzKSx0aGlzfX0pLEMuWi5wcm90b3R5cGU9WC5wcm90b3R5cGU9bi5mbixDLnVuaXE9UCxDLmRlc2VyaWFsaXplVmFsdWU9SyxuLnplcHRvPUMsbn0oKTt3aW5kb3cuWmVwdG89WmVwdG8sdm9pZCAwPT09d2luZG93LiQmJih3aW5kb3cuJD1aZXB0byksZnVuY3Rpb24odCl7ZnVuY3Rpb24gbCh0KXtyZXR1cm4gdC5femlkfHwodC5femlkPWUrKyl9ZnVuY3Rpb24gaCh0LGUsbixpKXtpZihlPXAoZSksZS5ucyl2YXIgcj1kKGUubnMpO3JldHVybihzW2wodCldfHxbXSkuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiEoIXR8fGUuZSYmdC5lIT1lLmV8fGUubnMmJiFyLnRlc3QodC5ucyl8fG4mJmwodC5mbikhPT1sKG4pfHxpJiZ0LnNlbCE9aSl9KX1mdW5jdGlvbiBwKHQpe3ZhciBlPShcIlwiK3QpLnNwbGl0KFwiLlwiKTtyZXR1cm57ZTplWzBdLG5zOmUuc2xpY2UoMSkuc29ydCgpLmpvaW4oXCIgXCIpfX1mdW5jdGlvbiBkKHQpe3JldHVybiBuZXcgUmVnRXhwKFwiKD86XnwgKVwiK3QucmVwbGFjZShcIiBcIixcIiAuKiA/XCIpK1wiKD86IHwkKVwiKX1mdW5jdGlvbiBtKHQsZSl7cmV0dXJuIHQuZGVsJiYhdSYmdC5lIGluIGZ8fCEhZX1mdW5jdGlvbiBnKHQpe3JldHVybiBjW3RdfHx1JiZmW3RdfHx0fWZ1bmN0aW9uIHYoZSxpLHIsbyxhLHUsZil7dmFyIGg9bChlKSxkPXNbaF18fChzW2hdPVtdKTtpLnNwbGl0KC9cXHMvKS5mb3JFYWNoKGZ1bmN0aW9uKGkpe2lmKFwicmVhZHlcIj09aSlyZXR1cm4gdChkb2N1bWVudCkucmVhZHkocik7dmFyIHM9cChpKTtzLmZuPXIscy5zZWw9YSxzLmUgaW4gYyYmKHI9ZnVuY3Rpb24oZSl7dmFyIG49ZS5yZWxhdGVkVGFyZ2V0O3JldHVybiFufHxuIT09dGhpcyYmIXQuY29udGFpbnModGhpcyxuKT9zLmZuLmFwcGx5KHRoaXMsYXJndW1lbnRzKTp2b2lkIDB9KSxzLmRlbD11O3ZhciBsPXV8fHI7cy5wcm94eT1mdW5jdGlvbih0KXtpZih0PVQodCksIXQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSl7dC5kYXRhPW87dmFyIGk9bC5hcHBseShlLHQuX2FyZ3M9PW4/W3RdOlt0XS5jb25jYXQodC5fYXJncykpO3JldHVybiBpPT09ITEmJih0LnByZXZlbnREZWZhdWx0KCksdC5zdG9wUHJvcGFnYXRpb24oKSksaX19LHMuaT1kLmxlbmd0aCxkLnB1c2gocyksXCJhZGRFdmVudExpc3RlbmVyXCJpbiBlJiZlLmFkZEV2ZW50TGlzdGVuZXIoZyhzLmUpLHMucHJveHksbShzLGYpKX0pfWZ1bmN0aW9uIHkodCxlLG4saSxyKXt2YXIgbz1sKHQpOyhlfHxcIlwiKS5zcGxpdCgvXFxzLykuZm9yRWFjaChmdW5jdGlvbihlKXtoKHQsZSxuLGkpLmZvckVhY2goZnVuY3Rpb24oZSl7ZGVsZXRlIHNbb11bZS5pXSxcInJlbW92ZUV2ZW50TGlzdGVuZXJcImluIHQmJnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihnKGUuZSksZS5wcm94eSxtKGUscikpfSl9KX1mdW5jdGlvbiBUKGUsaSl7cmV0dXJuKGl8fCFlLmlzRGVmYXVsdFByZXZlbnRlZCkmJihpfHwoaT1lKSx0LmVhY2goRSxmdW5jdGlvbih0LG4pe3ZhciByPWlbdF07ZVt0XT1mdW5jdGlvbigpe3JldHVybiB0aGlzW25dPXcsciYmci5hcHBseShpLGFyZ3VtZW50cyl9LGVbbl09eH0pLChpLmRlZmF1bHRQcmV2ZW50ZWQhPT1uP2kuZGVmYXVsdFByZXZlbnRlZDpcInJldHVyblZhbHVlXCJpbiBpP2kucmV0dXJuVmFsdWU9PT0hMTppLmdldFByZXZlbnREZWZhdWx0JiZpLmdldFByZXZlbnREZWZhdWx0KCkpJiYoZS5pc0RlZmF1bHRQcmV2ZW50ZWQ9dykpLGV9ZnVuY3Rpb24gaih0KXt2YXIgZSxpPXtvcmlnaW5hbEV2ZW50OnR9O2ZvcihlIGluIHQpYi50ZXN0KGUpfHx0W2VdPT09bnx8KGlbZV09dFtlXSk7cmV0dXJuIFQoaSx0KX12YXIgbixlPTEsaT1BcnJheS5wcm90b3R5cGUuc2xpY2Uscj10LmlzRnVuY3Rpb24sbz1mdW5jdGlvbih0KXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgdH0scz17fSxhPXt9LHU9XCJvbmZvY3VzaW5cImluIHdpbmRvdyxmPXtmb2N1czpcImZvY3VzaW5cIixibHVyOlwiZm9jdXNvdXRcIn0sYz17bW91c2VlbnRlcjpcIm1vdXNlb3ZlclwiLG1vdXNlbGVhdmU6XCJtb3VzZW91dFwifTthLmNsaWNrPWEubW91c2Vkb3duPWEubW91c2V1cD1hLm1vdXNlbW92ZT1cIk1vdXNlRXZlbnRzXCIsdC5ldmVudD17YWRkOnYscmVtb3ZlOnl9LHQucHJveHk9ZnVuY3Rpb24oZSxuKXt2YXIgcz0yIGluIGFyZ3VtZW50cyYmaS5jYWxsKGFyZ3VtZW50cywyKTtpZihyKGUpKXt2YXIgYT1mdW5jdGlvbigpe3JldHVybiBlLmFwcGx5KG4scz9zLmNvbmNhdChpLmNhbGwoYXJndW1lbnRzKSk6YXJndW1lbnRzKX07cmV0dXJuIGEuX3ppZD1sKGUpLGF9aWYobyhuKSlyZXR1cm4gcz8ocy51bnNoaWZ0KGVbbl0sZSksdC5wcm94eS5hcHBseShudWxsLHMpKTp0LnByb3h5KGVbbl0sZSk7dGhyb3cgbmV3IFR5cGVFcnJvcihcImV4cGVjdGVkIGZ1bmN0aW9uXCIpfSx0LmZuLmJpbmQ9ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0aGlzLm9uKHQsZSxuKX0sdC5mbi51bmJpbmQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5vZmYodCxlKX0sdC5mbi5vbmU9ZnVuY3Rpb24odCxlLG4saSl7cmV0dXJuIHRoaXMub24odCxlLG4saSwxKX07dmFyIHc9ZnVuY3Rpb24oKXtyZXR1cm4hMH0seD1mdW5jdGlvbigpe3JldHVybiExfSxiPS9eKFtBLVpdfHJldHVyblZhbHVlJHxsYXllcltYWV0kKS8sRT17cHJldmVudERlZmF1bHQ6XCJpc0RlZmF1bHRQcmV2ZW50ZWRcIixzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246XCJpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZFwiLHN0b3BQcm9wYWdhdGlvbjpcImlzUHJvcGFnYXRpb25TdG9wcGVkXCJ9O3QuZm4uZGVsZWdhdGU9ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0aGlzLm9uKGUsdCxuKX0sdC5mbi51bmRlbGVnYXRlPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdGhpcy5vZmYoZSx0LG4pfSx0LmZuLmxpdmU9ZnVuY3Rpb24oZSxuKXtyZXR1cm4gdChkb2N1bWVudC5ib2R5KS5kZWxlZ2F0ZSh0aGlzLnNlbGVjdG9yLGUsbiksdGhpc30sdC5mbi5kaWU9ZnVuY3Rpb24oZSxuKXtyZXR1cm4gdChkb2N1bWVudC5ib2R5KS51bmRlbGVnYXRlKHRoaXMuc2VsZWN0b3IsZSxuKSx0aGlzfSx0LmZuLm9uPWZ1bmN0aW9uKGUscyxhLHUsZil7dmFyIGMsbCxoPXRoaXM7cmV0dXJuIGUmJiFvKGUpPyh0LmVhY2goZSxmdW5jdGlvbih0LGUpe2gub24odCxzLGEsZSxmKX0pLGgpOihvKHMpfHxyKHUpfHx1PT09ITF8fCh1PWEsYT1zLHM9biksKHU9PT1ufHxhPT09ITEpJiYodT1hLGE9biksdT09PSExJiYodT14KSxoLmVhY2goZnVuY3Rpb24obixyKXtmJiYoYz1mdW5jdGlvbih0KXtyZXR1cm4geShyLHQudHlwZSx1KSx1LmFwcGx5KHRoaXMsYXJndW1lbnRzKX0pLHMmJihsPWZ1bmN0aW9uKGUpe3ZhciBuLG89dChlLnRhcmdldCkuY2xvc2VzdChzLHIpLmdldCgwKTtyZXR1cm4gbyYmbyE9PXI/KG49dC5leHRlbmQoaihlKSx7Y3VycmVudFRhcmdldDpvLGxpdmVGaXJlZDpyfSksKGN8fHUpLmFwcGx5KG8sW25dLmNvbmNhdChpLmNhbGwoYXJndW1lbnRzLDEpKSkpOnZvaWQgMH0pLHYocixlLHUsYSxzLGx8fGMpfSkpfSx0LmZuLm9mZj1mdW5jdGlvbihlLGkscyl7dmFyIGE9dGhpcztyZXR1cm4gZSYmIW8oZSk/KHQuZWFjaChlLGZ1bmN0aW9uKHQsZSl7YS5vZmYodCxpLGUpfSksYSk6KG8oaSl8fHIocyl8fHM9PT0hMXx8KHM9aSxpPW4pLHM9PT0hMSYmKHM9eCksYS5lYWNoKGZ1bmN0aW9uKCl7eSh0aGlzLGUscyxpKX0pKX0sdC5mbi50cmlnZ2VyPWZ1bmN0aW9uKGUsbil7cmV0dXJuIGU9byhlKXx8dC5pc1BsYWluT2JqZWN0KGUpP3QuRXZlbnQoZSk6VChlKSxlLl9hcmdzPW4sdGhpcy5lYWNoKGZ1bmN0aW9uKCl7ZS50eXBlIGluIGYmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXNbZS50eXBlXT90aGlzW2UudHlwZV0oKTpcImRpc3BhdGNoRXZlbnRcImluIHRoaXM/dGhpcy5kaXNwYXRjaEV2ZW50KGUpOnQodGhpcykudHJpZ2dlckhhbmRsZXIoZSxuKX0pfSx0LmZuLnRyaWdnZXJIYW5kbGVyPWZ1bmN0aW9uKGUsbil7dmFyIGkscjtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKHMsYSl7aT1qKG8oZSk/dC5FdmVudChlKTplKSxpLl9hcmdzPW4saS50YXJnZXQ9YSx0LmVhY2goaChhLGUudHlwZXx8ZSksZnVuY3Rpb24odCxlKXtyZXR1cm4gcj1lLnByb3h5KGkpLGkuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKT8hMTp2b2lkIDB9KX0pLHJ9LFwiZm9jdXNpbiBmb2N1c291dCBmb2N1cyBibHVyIGxvYWQgcmVzaXplIHNjcm9sbCB1bmxvYWQgY2xpY2sgZGJsY2xpY2sgbW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmUgY2hhbmdlIHNlbGVjdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGVycm9yXCIuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24oZSl7dC5mbltlXT1mdW5jdGlvbih0KXtyZXR1cm4gMCBpbiBhcmd1bWVudHM/dGhpcy5iaW5kKGUsdCk6dGhpcy50cmlnZ2VyKGUpfX0pLHQuRXZlbnQ9ZnVuY3Rpb24odCxlKXtvKHQpfHwoZT10LHQ9ZS50eXBlKTt2YXIgbj1kb2N1bWVudC5jcmVhdGVFdmVudChhW3RdfHxcIkV2ZW50c1wiKSxpPSEwO2lmKGUpZm9yKHZhciByIGluIGUpXCJidWJibGVzXCI9PXI/aT0hIWVbcl06bltyXT1lW3JdO3JldHVybiBuLmluaXRFdmVudCh0LGksITApLFQobil9fShaZXB0byksZnVuY3Rpb24odCl7ZnVuY3Rpb24gaChlLG4saSl7dmFyIHI9dC5FdmVudChuKTtyZXR1cm4gdChlKS50cmlnZ2VyKHIsaSksIXIuaXNEZWZhdWx0UHJldmVudGVkKCl9ZnVuY3Rpb24gcCh0LGUsaSxyKXtyZXR1cm4gdC5nbG9iYWw/aChlfHxuLGkscik6dm9pZCAwfWZ1bmN0aW9uIGQoZSl7ZS5nbG9iYWwmJjA9PT10LmFjdGl2ZSsrJiZwKGUsbnVsbCxcImFqYXhTdGFydFwiKX1mdW5jdGlvbiBtKGUpe2UuZ2xvYmFsJiYhLS10LmFjdGl2ZSYmcChlLG51bGwsXCJhamF4U3RvcFwiKX1mdW5jdGlvbiBnKHQsZSl7dmFyIG49ZS5jb250ZXh0O3JldHVybiBlLmJlZm9yZVNlbmQuY2FsbChuLHQsZSk9PT0hMXx8cChlLG4sXCJhamF4QmVmb3JlU2VuZFwiLFt0LGVdKT09PSExPyExOnZvaWQgcChlLG4sXCJhamF4U2VuZFwiLFt0LGVdKX1mdW5jdGlvbiB2KHQsZSxuLGkpe3ZhciByPW4uY29udGV4dCxvPVwic3VjY2Vzc1wiO24uc3VjY2Vzcy5jYWxsKHIsdCxvLGUpLGkmJmkucmVzb2x2ZVdpdGgocixbdCxvLGVdKSxwKG4scixcImFqYXhTdWNjZXNzXCIsW2Usbix0XSksdyhvLGUsbil9ZnVuY3Rpb24geSh0LGUsbixpLHIpe3ZhciBvPWkuY29udGV4dDtpLmVycm9yLmNhbGwobyxuLGUsdCksciYmci5yZWplY3RXaXRoKG8sW24sZSx0XSkscChpLG8sXCJhamF4RXJyb3JcIixbbixpLHR8fGVdKSx3KGUsbixpKX1mdW5jdGlvbiB3KHQsZSxuKXt2YXIgaT1uLmNvbnRleHQ7bi5jb21wbGV0ZS5jYWxsKGksZSx0KSxwKG4saSxcImFqYXhDb21wbGV0ZVwiLFtlLG5dKSxtKG4pfWZ1bmN0aW9uIHgoKXt9ZnVuY3Rpb24gYih0KXtyZXR1cm4gdCYmKHQ9dC5zcGxpdChcIjtcIiwyKVswXSksdCYmKHQ9PWY/XCJodG1sXCI6dD09dT9cImpzb25cIjpzLnRlc3QodCk/XCJzY3JpcHRcIjphLnRlc3QodCkmJlwieG1sXCIpfHxcInRleHRcIn1mdW5jdGlvbiBFKHQsZSl7cmV0dXJuXCJcIj09ZT90Oih0K1wiJlwiK2UpLnJlcGxhY2UoL1smP117MSwyfS8sXCI/XCIpfWZ1bmN0aW9uIFQoZSl7ZS5wcm9jZXNzRGF0YSYmZS5kYXRhJiZcInN0cmluZ1wiIT10LnR5cGUoZS5kYXRhKSYmKGUuZGF0YT10LnBhcmFtKGUuZGF0YSxlLnRyYWRpdGlvbmFsKSksIWUuZGF0YXx8ZS50eXBlJiZcIkdFVFwiIT1lLnR5cGUudG9VcHBlckNhc2UoKXx8KGUudXJsPUUoZS51cmwsZS5kYXRhKSxlLmRhdGE9dm9pZCAwKX1mdW5jdGlvbiBqKGUsbixpLHIpe3JldHVybiB0LmlzRnVuY3Rpb24obikmJihyPWksaT1uLG49dm9pZCAwKSx0LmlzRnVuY3Rpb24oaSl8fChyPWksaT12b2lkIDApLHt1cmw6ZSxkYXRhOm4sc3VjY2VzczppLGRhdGFUeXBlOnJ9fWZ1bmN0aW9uIEMoZSxuLGkscil7dmFyIG8scz10LmlzQXJyYXkobiksYT10LmlzUGxhaW5PYmplY3Qobik7dC5lYWNoKG4sZnVuY3Rpb24obix1KXtvPXQudHlwZSh1KSxyJiYobj1pP3I6citcIltcIisoYXx8XCJvYmplY3RcIj09b3x8XCJhcnJheVwiPT1vP246XCJcIikrXCJdXCIpLCFyJiZzP2UuYWRkKHUubmFtZSx1LnZhbHVlKTpcImFycmF5XCI9PW98fCFpJiZcIm9iamVjdFwiPT1vP0MoZSx1LGksbik6ZS5hZGQobix1KX0pfXZhciBpLHIsZT0wLG49d2luZG93LmRvY3VtZW50LG89LzxzY3JpcHRcXGJbXjxdKig/Oig/ITxcXC9zY3JpcHQ+KTxbXjxdKikqPFxcL3NjcmlwdD4vZ2kscz0vXig/OnRleHR8YXBwbGljYXRpb24pXFwvamF2YXNjcmlwdC9pLGE9L14oPzp0ZXh0fGFwcGxpY2F0aW9uKVxcL3htbC9pLHU9XCJhcHBsaWNhdGlvbi9qc29uXCIsZj1cInRleHQvaHRtbFwiLGM9L15cXHMqJC8sbD1uLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO2wuaHJlZj13aW5kb3cubG9jYXRpb24uaHJlZix0LmFjdGl2ZT0wLHQuYWpheEpTT05QPWZ1bmN0aW9uKGkscil7aWYoIShcInR5cGVcImluIGkpKXJldHVybiB0LmFqYXgoaSk7dmFyIGYsaCxvPWkuanNvbnBDYWxsYmFjayxzPSh0LmlzRnVuY3Rpb24obyk/bygpOm8pfHxcImpzb25wXCIrICsrZSxhPW4uY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSx1PXdpbmRvd1tzXSxjPWZ1bmN0aW9uKGUpe3QoYSkudHJpZ2dlckhhbmRsZXIoXCJlcnJvclwiLGV8fFwiYWJvcnRcIil9LGw9e2Fib3J0OmN9O3JldHVybiByJiZyLnByb21pc2UobCksdChhKS5vbihcImxvYWQgZXJyb3JcIixmdW5jdGlvbihlLG4pe2NsZWFyVGltZW91dChoKSx0KGEpLm9mZigpLnJlbW92ZSgpLFwiZXJyb3JcIiE9ZS50eXBlJiZmP3YoZlswXSxsLGkscik6eShudWxsLG58fFwiZXJyb3JcIixsLGksciksd2luZG93W3NdPXUsZiYmdC5pc0Z1bmN0aW9uKHUpJiZ1KGZbMF0pLHU9Zj12b2lkIDB9KSxnKGwsaSk9PT0hMT8oYyhcImFib3J0XCIpLGwpOih3aW5kb3dbc109ZnVuY3Rpb24oKXtmPWFyZ3VtZW50c30sYS5zcmM9aS51cmwucmVwbGFjZSgvXFw/KC4rKT1cXD8vLFwiPyQxPVwiK3MpLG4uaGVhZC5hcHBlbmRDaGlsZChhKSxpLnRpbWVvdXQ+MCYmKGg9c2V0VGltZW91dChmdW5jdGlvbigpe2MoXCJ0aW1lb3V0XCIpfSxpLnRpbWVvdXQpKSxsKX0sdC5hamF4U2V0dGluZ3M9e3R5cGU6XCJHRVRcIixiZWZvcmVTZW5kOngsc3VjY2Vzczp4LGVycm9yOngsY29tcGxldGU6eCxjb250ZXh0Om51bGwsZ2xvYmFsOiEwLHhocjpmdW5jdGlvbigpe3JldHVybiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0fSxhY2NlcHRzOntzY3JpcHQ6XCJ0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL3gtamF2YXNjcmlwdFwiLGpzb246dSx4bWw6XCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsaHRtbDpmLHRleHQ6XCJ0ZXh0L3BsYWluXCJ9LGNyb3NzRG9tYWluOiExLHRpbWVvdXQ6MCxwcm9jZXNzRGF0YTohMCxjYWNoZTohMH0sdC5hamF4PWZ1bmN0aW9uKGUpe3ZhciBhLHUsbz10LmV4dGVuZCh7fSxlfHx7fSkscz10LkRlZmVycmVkJiZ0LkRlZmVycmVkKCk7Zm9yKGkgaW4gdC5hamF4U2V0dGluZ3Mpdm9pZCAwPT09b1tpXSYmKG9baV09dC5hamF4U2V0dGluZ3NbaV0pO2Qobyksby5jcm9zc0RvbWFpbnx8KGE9bi5jcmVhdGVFbGVtZW50KFwiYVwiKSxhLmhyZWY9by51cmwsYS5ocmVmPWEuaHJlZixvLmNyb3NzRG9tYWluPWwucHJvdG9jb2wrXCIvL1wiK2wuaG9zdCE9YS5wcm90b2NvbCtcIi8vXCIrYS5ob3N0KSxvLnVybHx8KG8udXJsPXdpbmRvdy5sb2NhdGlvbi50b1N0cmluZygpKSwodT1vLnVybC5pbmRleE9mKFwiI1wiKSk+LTEmJihvLnVybD1vLnVybC5zbGljZSgwLHUpKSxUKG8pO3ZhciBmPW8uZGF0YVR5cGUsaD0vXFw/Lis9XFw/Ly50ZXN0KG8udXJsKTtpZihoJiYoZj1cImpzb25wXCIpLG8uY2FjaGUhPT0hMSYmKGUmJmUuY2FjaGU9PT0hMHx8XCJzY3JpcHRcIiE9ZiYmXCJqc29ucFwiIT1mKXx8KG8udXJsPUUoby51cmwsXCJfPVwiK0RhdGUubm93KCkpKSxcImpzb25wXCI9PWYpcmV0dXJuIGh8fChvLnVybD1FKG8udXJsLG8uanNvbnA/by5qc29ucCtcIj0/XCI6by5qc29ucD09PSExP1wiXCI6XCJjYWxsYmFjaz0/XCIpKSx0LmFqYXhKU09OUChvLHMpO3ZhciBOLHA9by5hY2NlcHRzW2ZdLG09e30sdz1mdW5jdGlvbih0LGUpe21bdC50b0xvd2VyQ2FzZSgpXT1bdCxlXX0saj0vXihbXFx3LV0rOilcXC9cXC8vLnRlc3Qoby51cmwpP1JlZ0V4cC4kMTp3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wsUz1vLnhocigpLEM9Uy5zZXRSZXF1ZXN0SGVhZGVyO2lmKHMmJnMucHJvbWlzZShTKSxvLmNyb3NzRG9tYWlufHx3KFwiWC1SZXF1ZXN0ZWQtV2l0aFwiLFwiWE1MSHR0cFJlcXVlc3RcIiksdyhcIkFjY2VwdFwiLHB8fFwiKi8qXCIpLChwPW8ubWltZVR5cGV8fHApJiYocC5pbmRleE9mKFwiLFwiKT4tMSYmKHA9cC5zcGxpdChcIixcIiwyKVswXSksUy5vdmVycmlkZU1pbWVUeXBlJiZTLm92ZXJyaWRlTWltZVR5cGUocCkpLChvLmNvbnRlbnRUeXBlfHxvLmNvbnRlbnRUeXBlIT09ITEmJm8uZGF0YSYmXCJHRVRcIiE9by50eXBlLnRvVXBwZXJDYXNlKCkpJiZ3KFwiQ29udGVudC1UeXBlXCIsby5jb250ZW50VHlwZXx8XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIiksby5oZWFkZXJzKWZvcihyIGluIG8uaGVhZGVycyl3KHIsby5oZWFkZXJzW3JdKTtpZihTLnNldFJlcXVlc3RIZWFkZXI9dyxTLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2lmKDQ9PVMucmVhZHlTdGF0ZSl7Uy5vbnJlYWR5c3RhdGVjaGFuZ2U9eCxjbGVhclRpbWVvdXQoTik7dmFyIGUsbj0hMTtpZihTLnN0YXR1cz49MjAwJiZTLnN0YXR1czwzMDB8fDMwND09Uy5zdGF0dXN8fDA9PVMuc3RhdHVzJiZcImZpbGU6XCI9PWope2Y9Znx8YihvLm1pbWVUeXBlfHxTLmdldFJlc3BvbnNlSGVhZGVyKFwiY29udGVudC10eXBlXCIpKSxlPVMucmVzcG9uc2VUZXh0O3RyeXtcInNjcmlwdFwiPT1mPygxLGV2YWwpKGUpOlwieG1sXCI9PWY/ZT1TLnJlc3BvbnNlWE1MOlwianNvblwiPT1mJiYoZT1jLnRlc3QoZSk/bnVsbDp0LnBhcnNlSlNPTihlKSl9Y2F0Y2goaSl7bj1pfW4/eShuLFwicGFyc2VyZXJyb3JcIixTLG8scyk6dihlLFMsbyxzKX1lbHNlIHkoUy5zdGF0dXNUZXh0fHxudWxsLFMuc3RhdHVzP1wiZXJyb3JcIjpcImFib3J0XCIsUyxvLHMpfX0sZyhTLG8pPT09ITEpcmV0dXJuIFMuYWJvcnQoKSx5KG51bGwsXCJhYm9ydFwiLFMsbyxzKSxTO2lmKG8ueGhyRmllbGRzKWZvcihyIGluIG8ueGhyRmllbGRzKVNbcl09by54aHJGaWVsZHNbcl07dmFyIFA9XCJhc3luY1wiaW4gbz9vLmFzeW5jOiEwO1Mub3BlbihvLnR5cGUsby51cmwsUCxvLnVzZXJuYW1lLG8ucGFzc3dvcmQpO2ZvcihyIGluIG0pQy5hcHBseShTLG1bcl0pO3JldHVybiBvLnRpbWVvdXQ+MCYmKE49c2V0VGltZW91dChmdW5jdGlvbigpe1Mub25yZWFkeXN0YXRlY2hhbmdlPXgsUy5hYm9ydCgpLHkobnVsbCxcInRpbWVvdXRcIixTLG8scyl9LG8udGltZW91dCkpLFMuc2VuZChvLmRhdGE/by5kYXRhOm51bGwpLFN9LHQuZ2V0PWZ1bmN0aW9uKCl7cmV0dXJuIHQuYWpheChqLmFwcGx5KG51bGwsYXJndW1lbnRzKSl9LHQucG9zdD1mdW5jdGlvbigpe3ZhciBlPWouYXBwbHkobnVsbCxhcmd1bWVudHMpO3JldHVybiBlLnR5cGU9XCJQT1NUXCIsdC5hamF4KGUpfSx0LmdldEpTT049ZnVuY3Rpb24oKXt2YXIgZT1qLmFwcGx5KG51bGwsYXJndW1lbnRzKTtyZXR1cm4gZS5kYXRhVHlwZT1cImpzb25cIix0LmFqYXgoZSl9LHQuZm4ubG9hZD1mdW5jdGlvbihlLG4saSl7aWYoIXRoaXMubGVuZ3RoKXJldHVybiB0aGlzO3ZhciBhLHI9dGhpcyxzPWUuc3BsaXQoL1xccy8pLHU9aihlLG4saSksZj11LnN1Y2Nlc3M7cmV0dXJuIHMubGVuZ3RoPjEmJih1LnVybD1zWzBdLGE9c1sxXSksdS5zdWNjZXNzPWZ1bmN0aW9uKGUpe3IuaHRtbChhP3QoXCI8ZGl2PlwiKS5odG1sKGUucmVwbGFjZShvLFwiXCIpKS5maW5kKGEpOmUpLGYmJmYuYXBwbHkocixhcmd1bWVudHMpfSx0LmFqYXgodSksdGhpc307dmFyIFM9ZW5jb2RlVVJJQ29tcG9uZW50O3QucGFyYW09ZnVuY3Rpb24oZSxuKXt2YXIgaT1bXTtyZXR1cm4gaS5hZGQ9ZnVuY3Rpb24oZSxuKXt0LmlzRnVuY3Rpb24obikmJihuPW4oKSksbnVsbD09biYmKG49XCJcIiksdGhpcy5wdXNoKFMoZSkrXCI9XCIrUyhuKSl9LEMoaSxlLG4pLGkuam9pbihcIiZcIikucmVwbGFjZSgvJTIwL2csXCIrXCIpfX0oWmVwdG8pLGZ1bmN0aW9uKHQpe3QuQ2FsbGJhY2tzPWZ1bmN0aW9uKGUpe2U9dC5leHRlbmQoe30sZSk7dmFyIG4saSxyLG8scyxhLHU9W10sZj0hZS5vbmNlJiZbXSxjPWZ1bmN0aW9uKHQpe2ZvcihuPWUubWVtb3J5JiZ0LGk9ITAsYT1vfHwwLG89MCxzPXUubGVuZ3RoLHI9ITA7dSYmcz5hOysrYSlpZih1W2FdLmFwcGx5KHRbMF0sdFsxXSk9PT0hMSYmZS5zdG9wT25GYWxzZSl7bj0hMTticmVha31yPSExLHUmJihmP2YubGVuZ3RoJiZjKGYuc2hpZnQoKSk6bj91Lmxlbmd0aD0wOmwuZGlzYWJsZSgpKX0sbD17YWRkOmZ1bmN0aW9uKCl7aWYodSl7dmFyIGk9dS5sZW5ndGgsYT1mdW5jdGlvbihuKXt0LmVhY2gobixmdW5jdGlvbih0LG4pe1wiZnVuY3Rpb25cIj09dHlwZW9mIG4/ZS51bmlxdWUmJmwuaGFzKG4pfHx1LnB1c2gobik6biYmbi5sZW5ndGgmJlwic3RyaW5nXCIhPXR5cGVvZiBuJiZhKG4pfSl9O2EoYXJndW1lbnRzKSxyP3M9dS5sZW5ndGg6biYmKG89aSxjKG4pKX1yZXR1cm4gdGhpc30scmVtb3ZlOmZ1bmN0aW9uKCl7cmV0dXJuIHUmJnQuZWFjaChhcmd1bWVudHMsZnVuY3Rpb24oZSxuKXtmb3IodmFyIGk7KGk9dC5pbkFycmF5KG4sdSxpKSk+LTE7KXUuc3BsaWNlKGksMSksciYmKHM+PWkmJi0tcyxhPj1pJiYtLWEpfSksdGhpc30saGFzOmZ1bmN0aW9uKGUpe3JldHVybiEoIXV8fCEoZT90LmluQXJyYXkoZSx1KT4tMTp1Lmxlbmd0aCkpfSxlbXB0eTpmdW5jdGlvbigpe3JldHVybiBzPXUubGVuZ3RoPTAsdGhpc30sZGlzYWJsZTpmdW5jdGlvbigpe3JldHVybiB1PWY9bj12b2lkIDAsdGhpc30sZGlzYWJsZWQ6ZnVuY3Rpb24oKXtyZXR1cm4hdX0sbG9jazpmdW5jdGlvbigpe3JldHVybiBmPXZvaWQgMCxufHxsLmRpc2FibGUoKSx0aGlzfSxsb2NrZWQ6ZnVuY3Rpb24oKXtyZXR1cm4hZn0sZmlyZVdpdGg6ZnVuY3Rpb24odCxlKXtyZXR1cm4hdXx8aSYmIWZ8fChlPWV8fFtdLGU9W3QsZS5zbGljZT9lLnNsaWNlKCk6ZV0scj9mLnB1c2goZSk6YyhlKSksdGhpc30sZmlyZTpmdW5jdGlvbigpe3JldHVybiBsLmZpcmVXaXRoKHRoaXMsYXJndW1lbnRzKX0sZmlyZWQ6ZnVuY3Rpb24oKXtyZXR1cm4hIWl9fTtyZXR1cm4gbH19KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiBuKGUpe3ZhciBpPVtbXCJyZXNvbHZlXCIsXCJkb25lXCIsdC5DYWxsYmFja3Moe29uY2U6MSxtZW1vcnk6MX0pLFwicmVzb2x2ZWRcIl0sW1wicmVqZWN0XCIsXCJmYWlsXCIsdC5DYWxsYmFja3Moe29uY2U6MSxtZW1vcnk6MX0pLFwicmVqZWN0ZWRcIl0sW1wibm90aWZ5XCIsXCJwcm9ncmVzc1wiLHQuQ2FsbGJhY2tzKHttZW1vcnk6MX0pXV0scj1cInBlbmRpbmdcIixvPXtzdGF0ZTpmdW5jdGlvbigpe3JldHVybiByfSxhbHdheXM6ZnVuY3Rpb24oKXtyZXR1cm4gcy5kb25lKGFyZ3VtZW50cykuZmFpbChhcmd1bWVudHMpLHRoaXN9LHRoZW46ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHM7cmV0dXJuIG4oZnVuY3Rpb24obil7dC5lYWNoKGksZnVuY3Rpb24oaSxyKXt2YXIgYT10LmlzRnVuY3Rpb24oZVtpXSkmJmVbaV07c1tyWzFdXShmdW5jdGlvbigpe3ZhciBlPWEmJmEuYXBwbHkodGhpcyxhcmd1bWVudHMpO2lmKGUmJnQuaXNGdW5jdGlvbihlLnByb21pc2UpKWUucHJvbWlzZSgpLmRvbmUobi5yZXNvbHZlKS5mYWlsKG4ucmVqZWN0KS5wcm9ncmVzcyhuLm5vdGlmeSk7ZWxzZXt2YXIgaT10aGlzPT09bz9uLnByb21pc2UoKTp0aGlzLHM9YT9bZV06YXJndW1lbnRzO25bclswXStcIldpdGhcIl0oaSxzKX19KX0pLGU9bnVsbH0pLnByb21pc2UoKX0scHJvbWlzZTpmdW5jdGlvbihlKXtyZXR1cm4gbnVsbCE9ZT90LmV4dGVuZChlLG8pOm99fSxzPXt9O3JldHVybiB0LmVhY2goaSxmdW5jdGlvbih0LGUpe3ZhciBuPWVbMl0sYT1lWzNdO29bZVsxXV09bi5hZGQsYSYmbi5hZGQoZnVuY3Rpb24oKXtyPWF9LGlbMV50XVsyXS5kaXNhYmxlLGlbMl1bMl0ubG9jayksc1tlWzBdXT1mdW5jdGlvbigpe3JldHVybiBzW2VbMF0rXCJXaXRoXCJdKHRoaXM9PT1zP286dGhpcyxhcmd1bWVudHMpLHRoaXN9LHNbZVswXStcIldpdGhcIl09bi5maXJlV2l0aH0pLG8ucHJvbWlzZShzKSxlJiZlLmNhbGwocyxzKSxzfXZhciBlPUFycmF5LnByb3RvdHlwZS5zbGljZTt0LndoZW49ZnVuY3Rpb24oaSl7dmFyIGYsYyxsLHI9ZS5jYWxsKGFyZ3VtZW50cyksbz1yLmxlbmd0aCxzPTAsYT0xIT09b3x8aSYmdC5pc0Z1bmN0aW9uKGkucHJvbWlzZSk/bzowLHU9MT09PWE/aTpuKCksaD1mdW5jdGlvbih0LG4saSl7cmV0dXJuIGZ1bmN0aW9uKHIpe25bdF09dGhpcyxpW3RdPWFyZ3VtZW50cy5sZW5ndGg+MT9lLmNhbGwoYXJndW1lbnRzKTpyLGk9PT1mP3Uubm90aWZ5V2l0aChuLGkpOi0tYXx8dS5yZXNvbHZlV2l0aChuLGkpfX07aWYobz4xKWZvcihmPW5ldyBBcnJheShvKSxjPW5ldyBBcnJheShvKSxsPW5ldyBBcnJheShvKTtvPnM7KytzKXJbc10mJnQuaXNGdW5jdGlvbihyW3NdLnByb21pc2UpP3Jbc10ucHJvbWlzZSgpLmRvbmUoaChzLGwscikpLmZhaWwodS5yZWplY3QpLnByb2dyZXNzKGgocyxjLGYpKTotLWE7cmV0dXJuIGF8fHUucmVzb2x2ZVdpdGgobCxyKSx1LnByb21pc2UoKX0sdC5EZWZlcnJlZD1ufShaZXB0byksZnVuY3Rpb24odCl7ZnVuY3Rpb24gdSh0LGUsbixpKXtyZXR1cm4gTWF0aC5hYnModC1lKT49TWF0aC5hYnMobi1pKT90LWU+MD9cIkxlZnRcIjpcIlJpZ2h0XCI6bi1pPjA/XCJVcFwiOlwiRG93blwifWZ1bmN0aW9uIGYoKXtvPW51bGwsZS5sYXN0JiYoZS5lbC50cmlnZ2VyKFwibG9uZ1RhcFwiKSxlPXt9KX1mdW5jdGlvbiBjKCl7byYmY2xlYXJUaW1lb3V0KG8pLG89bnVsbH1mdW5jdGlvbiBsKCl7biYmY2xlYXJUaW1lb3V0KG4pLGkmJmNsZWFyVGltZW91dChpKSxyJiZjbGVhclRpbWVvdXQociksbyYmY2xlYXJUaW1lb3V0KG8pLG49aT1yPW89bnVsbCxlPXt9fWZ1bmN0aW9uIGgodCl7cmV0dXJuKFwidG91Y2hcIj09dC5wb2ludGVyVHlwZXx8dC5wb2ludGVyVHlwZT09dC5NU1BPSU5URVJfVFlQRV9UT1VDSCkmJnQuaXNQcmltYXJ5fWZ1bmN0aW9uIHAodCxlKXtyZXR1cm4gdC50eXBlPT1cInBvaW50ZXJcIitlfHx0LnR5cGUudG9Mb3dlckNhc2UoKT09XCJtc3BvaW50ZXJcIitlfXZhciBuLGkscixvLGEsZT17fSxzPTc1MDt0KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe3ZhciBkLG0seSx3LGc9MCx2PTA7XCJNU0dlc3R1cmVcImluIHdpbmRvdyYmKGE9bmV3IE1TR2VzdHVyZSxhLnRhcmdldD1kb2N1bWVudC5ib2R5KSx0KGRvY3VtZW50KS5iaW5kKFwiTVNHZXN0dXJlRW5kXCIsZnVuY3Rpb24odCl7dmFyIG49dC52ZWxvY2l0eVg+MT9cIlJpZ2h0XCI6dC52ZWxvY2l0eVg8LTE/XCJMZWZ0XCI6dC52ZWxvY2l0eVk+MT9cIkRvd25cIjp0LnZlbG9jaXR5WTwtMT9cIlVwXCI6bnVsbDtuJiYoZS5lbC50cmlnZ2VyKFwic3dpcGVcIiksZS5lbC50cmlnZ2VyKFwic3dpcGVcIituKSl9KS5vbihcInRvdWNoc3RhcnQgTVNQb2ludGVyRG93biBwb2ludGVyZG93blwiLGZ1bmN0aW9uKGkpeyghKHc9cChpLFwiZG93blwiKSl8fGgoaSkpJiYoeT13P2k6aS50b3VjaGVzWzBdLGkudG91Y2hlcyYmMT09PWkudG91Y2hlcy5sZW5ndGgmJmUueDImJihlLngyPXZvaWQgMCxlLnkyPXZvaWQgMCksZD1EYXRlLm5vdygpLG09ZC0oZS5sYXN0fHxkKSxlLmVsPXQoXCJ0YWdOYW1lXCJpbiB5LnRhcmdldD95LnRhcmdldDp5LnRhcmdldC5wYXJlbnROb2RlKSxuJiZjbGVhclRpbWVvdXQobiksZS54MT15LnBhZ2VYLGUueTE9eS5wYWdlWSxtPjAmJjI1MD49bSYmKGUuaXNEb3VibGVUYXA9ITApLGUubGFzdD1kLG89c2V0VGltZW91dChmLHMpLGEmJncmJmEuYWRkUG9pbnRlcihpLnBvaW50ZXJJZCkpfSkub24oXCJ0b3VjaG1vdmUgTVNQb2ludGVyTW92ZSBwb2ludGVybW92ZVwiLGZ1bmN0aW9uKHQpeyghKHc9cCh0LFwibW92ZVwiKSl8fGgodCkpJiYoeT13P3Q6dC50b3VjaGVzWzBdLGMoKSxlLngyPXkucGFnZVgsZS55Mj15LnBhZ2VZLGcrPU1hdGguYWJzKGUueDEtZS54Miksdis9TWF0aC5hYnMoZS55MS1lLnkyKSl9KS5vbihcInRvdWNoZW5kIE1TUG9pbnRlclVwIHBvaW50ZXJ1cFwiLGZ1bmN0aW9uKG8peyghKHc9cChvLFwidXBcIikpfHxoKG8pKSYmKGMoKSxlLngyJiZNYXRoLmFicyhlLngxLWUueDIpPjMwfHxlLnkyJiZNYXRoLmFicyhlLnkxLWUueTIpPjMwP3I9c2V0VGltZW91dChmdW5jdGlvbigpe2UuZWwudHJpZ2dlcihcInN3aXBlXCIpLGUuZWwudHJpZ2dlcihcInN3aXBlXCIrdShlLngxLGUueDIsZS55MSxlLnkyKSksZT17fX0sMCk6XCJsYXN0XCJpbiBlJiYoMzA+ZyYmMzA+dj9pPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt2YXIgaT10LkV2ZW50KFwidGFwXCIpO2kuY2FuY2VsVG91Y2g9bCxlLmVsLnRyaWdnZXIoaSksZS5pc0RvdWJsZVRhcD8oZS5lbCYmZS5lbC50cmlnZ2VyKFwiZG91YmxlVGFwXCIpLGU9e30pOm49c2V0VGltZW91dChmdW5jdGlvbigpe249bnVsbCxlLmVsJiZlLmVsLnRyaWdnZXIoXCJzaW5nbGVUYXBcIiksZT17fX0sMjUwKX0sMCk6ZT17fSksZz12PTApfSkub24oXCJ0b3VjaGNhbmNlbCBNU1BvaW50ZXJDYW5jZWwgcG9pbnRlcmNhbmNlbFwiLGwpLHQod2luZG93KS5vbihcInNjcm9sbFwiLGwpfSksW1wic3dpcGVcIixcInN3aXBlTGVmdFwiLFwic3dpcGVSaWdodFwiLFwic3dpcGVVcFwiLFwic3dpcGVEb3duXCIsXCJkb3VibGVUYXBcIixcInRhcFwiLFwic2luZ2xlVGFwXCIsXCJsb25nVGFwXCJdLmZvckVhY2goZnVuY3Rpb24oZSl7dC5mbltlXT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5vbihlLHQpfX0pfShaZXB0byksZnVuY3Rpb24odCl7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZT10KGUpLCEoIWUud2lkdGgoKSYmIWUuaGVpZ2h0KCkpJiZcIm5vbmVcIiE9PWUuY3NzKFwiZGlzcGxheVwiKX1mdW5jdGlvbiBmKHQsZSl7dD10LnJlcGxhY2UoLz0jXFxdL2csJz1cIiNcIl0nKTt2YXIgbixpLHI9cy5leGVjKHQpO2lmKHImJnJbMl1pbiBvJiYobj1vW3JbMl1dLGk9clszXSx0PXJbMV0saSkpe3ZhciBhPU51bWJlcihpKTtpPWlzTmFOKGEpP2kucmVwbGFjZSgvXltcIiddfFtcIiddJC9nLFwiXCIpOmF9cmV0dXJuIGUodCxuLGkpfXZhciBlPXQuemVwdG8sbj1lLnFzYSxpPWUubWF0Y2hlcyxvPXQuZXhwcltcIjpcIl09e3Zpc2libGU6ZnVuY3Rpb24oKXtyZXR1cm4gcih0aGlzKT90aGlzOnZvaWQgMH0saGlkZGVuOmZ1bmN0aW9uKCl7cmV0dXJuIHIodGhpcyk/dm9pZCAwOnRoaXN9LHNlbGVjdGVkOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2VsZWN0ZWQ/dGhpczp2b2lkIDB9LGNoZWNrZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGVja2VkP3RoaXM6dm9pZCAwfSxwYXJlbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wYXJlbnROb2RlfSxmaXJzdDpmdW5jdGlvbih0KXtyZXR1cm4gMD09PXQ/dGhpczp2b2lkIDB9LGxhc3Q6ZnVuY3Rpb24odCxlKXtyZXR1cm4gdD09PWUubGVuZ3RoLTE/dGhpczp2b2lkIDB9LGVxOmZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdD09PW4/dGhpczp2b2lkIDB9LGNvbnRhaW5zOmZ1bmN0aW9uKGUsbixpKXtyZXR1cm4gdCh0aGlzKS50ZXh0KCkuaW5kZXhPZihpKT4tMT90aGlzOnZvaWQgMH0saGFzOmZ1bmN0aW9uKHQsbixpKXtyZXR1cm4gZS5xc2EodGhpcyxpKS5sZW5ndGg/dGhpczp2b2lkIDB9fSxzPW5ldyBSZWdFeHAoXCIoLiopOihcXFxcdyspKD86XFxcXCgoW14pXSspXFxcXCkpPyRcXFxccypcIiksYT0vXlxccyo+Lyx1PVwiWmVwdG9cIisgK25ldyBEYXRlO2UucXNhPWZ1bmN0aW9uKGkscil7cmV0dXJuIGYocixmdW5jdGlvbihvLHMsZil7dHJ5e3ZhciBjOyFvJiZzP289XCIqXCI6YS50ZXN0KG8pJiYoYz10KGkpLmFkZENsYXNzKHUpLG89XCIuXCIrdStcIiBcIitvKTt2YXIgbD1uKGksbyl9Y2F0Y2goaCl7dGhyb3cgY29uc29sZS5lcnJvcihcImVycm9yIHBlcmZvcm1pbmcgc2VsZWN0b3I6ICVvXCIsciksaH1maW5hbGx5e2MmJmMucmVtb3ZlQ2xhc3ModSl9cmV0dXJuIHM/ZS51bmlxKHQubWFwKGwsZnVuY3Rpb24odCxlKXtyZXR1cm4gcy5jYWxsKHQsZSxsLGYpfSkpOmx9KX0sZS5tYXRjaGVzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGYoZSxmdW5jdGlvbihlLG4scil7cmV0dXJuIShlJiYhaSh0LGUpfHxuJiZuLmNhbGwodCxudWxsLHIpIT09dCl9KX19KFplcHRvKSxmdW5jdGlvbigpe3RyeXtnZXRDb21wdXRlZFN0eWxlKHZvaWQgMCl9Y2F0Y2godCl7dmFyIGU9Z2V0Q29tcHV0ZWRTdHlsZTt3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZT1mdW5jdGlvbih0KXt0cnl7cmV0dXJuIGUodCl9Y2F0Y2gobil7cmV0dXJuIG51bGx9fX19KCk7XG5tb2R1bGUuZXhwb3J0cyA9IFplcHRvO1xuIl19
