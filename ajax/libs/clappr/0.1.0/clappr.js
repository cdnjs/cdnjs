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
module.exports = { media_control: template("<div class=\"media-control-background\" data-background></div><div class=\"media-control-layer\" data-controls><% var renderBar=function(name) { %><div class=\"bar-container\" data-<%= name %>><div class=\"bar-background\" data-<%= name %>><div class=\"bar-fill-1\" data-<%= name %>></div><div class=\"bar-fill-2\" data-<%= name %>></div><div class=\"bar-hover\" data-<%= name %>></div></div><div class=\"bar-scrubber\" data-<%= name %>><div class=\"bar-scrubber-icon\" data-<%= name %>></div></div></div><% }; %><% var renderSegmentedBar=function(name, segments) { segments=segments || 10; %><div class=\"bar-container\" data-<%= name %>><% for (var i = 0; i < segments; i++) { %><div class=\"segmented-bar-element\" data-<%= name %>></div><% } %></div><% }; %><% var renderDrawer=function(name, renderContent) { %><div class=\"drawer-container\" data-<%= name %>><div class=\"drawer-icon-container\" data-<%= name %>><div class=\"drawer-icon media-control-icon\" data-<%= name %>></div><span class=\"drawer-text\" data-<%= name %>></span></div><% renderContent(name); %></div><% }; %><% var renderIndicator=function(name) { %><div class=\"media-control-indicator\" data-<%= name %>></div><% }; %><% var renderButton=function(name) { %><button class=\"media-control-button media-control-icon\" data-<%= name %>></button><% }; %><% var templates={ bar: renderBar, segmentedBar: renderSegmentedBar, }; var render=function(settingsList) { settingsList.forEach(function(setting) { if(setting === \"seekbar\") { renderBar(setting); } else if (setting === \"volume\") { renderDrawer(setting, settings.volumeBarTemplate ? templates[settings.volumeBarTemplate] : function(name) { return renderSegmentedBar(name); }); } else if (setting === \"duration\" || setting=== \"position\") { renderIndicator(setting); } else { renderButton(setting); } }); }; %><% if (settings.default && settings.default.length) { %><div class=\"media-control-center-panel\" data-media-control><% render(settings.default); %></div><% } %><% if (settings.left && settings.left.length) { %><div class=\"media-control-left-panel\" data-media-control><% render(settings.left); %></div><% } %><% if (settings.right && settings.right.length) { %><div class=\"media-control-right-panel\" data-media-control><% render(settings.right); %></div><% } %></div>"), seek_time: template("<span data-seek-time></span>"), flash: template("<param name=\"movie\" value=\"<%= baseUrl %>/assets/Player.swf\"><param name=\"quality\" value=\"autohigh\"><param name=\"swliveconnect\" value=\"true\"><param name=\"allowScriptAccess\" value=\"always\"><param name=\"bgcolor\" value=\"#001122\"><param name=\"allowFullScreen\" value=\"false\"><param name=\"wmode\" value=\"transparent\"><param name=\"tabindex\" value=\"1\"><param name=FlashVars value=\"playbackId=<%= playbackId %>\" /><embed type=\"application/x-shockwave-flash\" disabled tabindex=\"-1\" enablecontextmenu=\"false\" allowScriptAccess=\"always\" quality=\"autohight\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" wmode=\"transparent\" swliveconnect=\"true\" type=\"application/x-shockwave-flash\" allowfullscreen=\"false\" bgcolor=\"#000000\" FlashVars=\"playbackId=<%= playbackId %>\" src=\"<%= baseUrl %>/assets/Player.swf\"></embed>"), hls: template("<param name=\"movie\" value=\"<%= baseUrl %>/assets/flashlsChromeless.swf?inline=1\"><param name=\"quality\" value=\"autohigh\"><param name=\"swliveconnect\" value=\"true\"><param name=\"allowScriptAccess\" value=\"always\"><param name=\"bgcolor\" value=\"#001122\"><param name=\"allowFullScreen\" value=\"false\"><param name=\"wmode\" value=\"transparent\"><param name=\"tabindex\" value=\"1\"><param name=FlashVars value=\"playbackId=<%= playbackId %>&callback=<%= callbackName %>\" /><embed type=\"application/x-shockwave-flash\" tabindex=\"1\" enablecontextmenu=\"false\" allowScriptAccess=\"always\" quality=\"autohigh\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" wmode=\"transparent\" swliveconnect=\"true\" type=\"application/x-shockwave-flash\" allowfullscreen=\"false\" bgcolor=\"#000000\" FlashVars=\"playbackId=<%= playbackId %>&callback=<%= callbackName %>\" src=\"<%= baseUrl %>/assets/flashlsChromeless.swf\" width=\"100%\" height=\"100%\"></embed>"), html5_video: template("<source src=\"<%=src%>\" type=\"<%=type%>\">"), no_op: template("<canvas data-no-op-canvas></canvas><p data-no-op-msg>Your browser does not support the playback of this video. Try to use a different browser.<p>"), dvr_controls: template("<div class=\"live-info\">LIVE</div><button class=\"live-button\">BACK TO LIVE</button>"), poster: template("<div class=\"play-wrapper\" data-poster><span class=\"poster-icon play\" data-poster/></div>"), spinner_three_bounce: template("<div data-bounce1></div><div data-bounce2></div><div data-bounce3></div>"), watermark: template("<div data-watermark data-watermark-<%=position %>><img src=\"<%= imageUrl %>\"></div>"), CSS: { container: ".container[data-container]{position:absolute;background-color:#000;height:100%;width:100%}.container[data-container].pointer-enabled{cursor:pointer}", core: "[data-player]{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0);position:relative;margin:0;padding:0;border:0;font-style:normal;font-weight:400;text-align:center;overflow:hidden;font-size:100%;font-family:\"lucida grande\",tahoma,verdana,arial,sans-serif;text-shadow:0 0 0;box-sizing:border-box}[data-player] a,[data-player] abbr,[data-player] acronym,[data-player] address,[data-player] applet,[data-player] article,[data-player] aside,[data-player] audio,[data-player] b,[data-player] big,[data-player] blockquote,[data-player] canvas,[data-player] caption,[data-player] center,[data-player] cite,[data-player] code,[data-player] dd,[data-player] del,[data-player] details,[data-player] dfn,[data-player] div,[data-player] dl,[data-player] dt,[data-player] em,[data-player] embed,[data-player] fieldset,[data-player] figcaption,[data-player] figure,[data-player] footer,[data-player] form,[data-player] h1,[data-player] h2,[data-player] h3,[data-player] h4,[data-player] h5,[data-player] h6,[data-player] header,[data-player] hgroup,[data-player] i,[data-player] iframe,[data-player] img,[data-player] ins,[data-player] kbd,[data-player] label,[data-player] legend,[data-player] li,[data-player] mark,[data-player] menu,[data-player] nav,[data-player] object,[data-player] ol,[data-player] output,[data-player] p,[data-player] pre,[data-player] q,[data-player] ruby,[data-player] s,[data-player] samp,[data-player] section,[data-player] small,[data-player] span,[data-player] strike,[data-player] strong,[data-player] sub,[data-player] summary,[data-player] sup,[data-player] table,[data-player] tbody,[data-player] td,[data-player] tfoot,[data-player] th,[data-player] thead,[data-player] time,[data-player] tr,[data-player] tt,[data-player] u,[data-player] ul,[data-player] var,[data-player] video{margin:0;padding:0;border:0;font:inherit;font-size:100%;vertical-align:baseline}[data-player] table{border-collapse:collapse;border-spacing:0}[data-player] caption,[data-player] td,[data-player] th{text-align:left;font-weight:400;vertical-align:middle}[data-player] blockquote,[data-player] q{quotes:none}[data-player] blockquote:after,[data-player] blockquote:before,[data-player] q:after,[data-player] q:before{content:\"\";content:none}[data-player] a img{border:none}[data-player]:focus{outline:0}[data-player] *{max-width:initial;box-sizing:inherit;float:initial}[data-player].fullscreen{width:100%!important;height:100%!important}[data-player].nocursor{cursor:none}.clappr-style{display:none!important}@media screen{[data-player]{opacity:.99}}", media_control: "@font-face{font-family:Player;src:url(\"<%= baseUrl %>/assets/Player-Regular.eot\");src:url(\"<%= baseUrl %>/assets/Player-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"<%= baseUrl %>/assets/Player-Regular.ttf\") format(\"truetype\"),url(\"<%= baseUrl %>/assets/Player-Regular.svg#player\") format(\"svg\")}.media-control-notransition{-webkit-transition:none!important;-webkit-transition-delay:0s;-moz-transition:none!important;-o-transition:none!important;transition:none!important}.media-control[data-media-control]{position:absolute;width:100%;height:100%;z-index:9999;pointer-events:none}.media-control[data-media-control].dragging{pointer-events:auto;cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control].dragging *{cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control] .media-control-background[data-background]{position:absolute;height:40%;width:100%;bottom:0;background-image:-owg(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-webkit(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-moz(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-o(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9));-webkit-transition:opacity .6s;-webkit-transition-delay:ease-out;-moz-transition:opacity .6s ease-out;-o-transition:opacity .6s ease-out;transition:opacity .6s ease-out}.media-control[data-media-control] .media-control-icon{font-family:Player;font-weight:400;font-style:normal;font-size:26px;line-height:32px;letter-spacing:0;speak:none;color:#fff;opacity:.5;vertical-align:middle;text-align:left;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.media-control[data-media-control] .media-control-icon:hover{color:#fff;opacity:.75;text-shadow:rgba(255,255,255,.8) 0 0 5px}.media-control[data-media-control].media-control-hide .media-control-background[data-background]{opacity:0}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls]{bottom:-50px}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls]{position:absolute;bottom:7px;width:100%;height:32px;vertical-align:middle;pointer-events:auto;-webkit-transition:bottom .4s;-webkit-transition-delay:ease-out;-moz-transition:bottom .4s ease-out;-o-transition:bottom .4s ease-out;transition:bottom .4s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-left-panel[data-media-control]{position:absolute;top:0;left:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-center-panel[data-media-control]{height:100%;text-align:center;line-height:32px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-right-panel[data-media-control]{position:absolute;top:0;right:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button{background-color:transparent;border:0;margin:0 6px;padding:0;cursor:pointer;display:inline-block}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button:focus{outline:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]:before{content:\"\\e002\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]:before{content:\"\\e003\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]{float:right;background-color:transparent;border:0;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]:before{content:\"\\e006\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen].shrink:before{content:\"\\e007\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]{cursor:default;float:right;background-color:transparent;border:0;height:100%;opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]:before{content:\"\\e008\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled:hover{opacity:1;text-shadow:none}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].playing:before{content:\"\\e002\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].paused:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].playing:before{content:\"\\e003\"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].stopped:before{content:\"\\e001\"}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration],.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{display:inline-block;font-size:10px;color:#fff;cursor:default;line-height:32px;position:relative}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{margin-left:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]{color:rgba(255,255,255,.5);margin-right:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]:before{content:\"|\";margin:0 3px}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]{position:absolute;top:-20px;left:0;display:inline-block;vertical-align:middle;width:100%;height:25px;cursor:pointer}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar]{width:100%;height:1px;position:relative;top:12px;background-color:#666}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-1[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#c2c2c2;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#005aff;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0;position:absolute;top:-3px;width:5px;height:7px;background-color:rgba(255,255,255,.5);-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled{cursor:default}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{position:absolute;top:2px;left:0;width:20px;height:20px;opacity:1;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] .bar-scrubber-icon[data-seekbar]{position:absolute;left:6px;top:6px;width:8px;height:8px;border-radius:10px;box-shadow:0 0 0 6px rgba(255,255,255,.2);background-color:#fff}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume]{float:right;display:inline-block;height:32px;cursor:pointer;margin:0 6px;box-sizing:border-box}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume]{float:left;bottom:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]{background-color:transparent;border:0;box-sizing:content-box;width:16px;height:32px;margin-right:6px;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:hover{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:before{content:\"\\e004\"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted{opacity:.5}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:hover{opacity:.7}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:before{content:\"\\e005\"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume]{float:left;position:relative;top:6px;width:42px;height:18px;padding:3px 0;overflow:hidden;-webkit-transition:width .2s;-webkit-transition-delay:ease-out;-moz-transition:width .2s ease-out;-o-transition:width .2s ease-out;transition:width .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]{float:left;width:4px;padding-left:2px;height:12px;opacity:.5;-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;-webkit-transition:-webkit-transform .2s;-webkit-transition-delay:ease-out;-moz-transition:-moz-transform .2s ease-out;-o-transition:-o-transform .2s ease-out;transition:transform .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume].fill{-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:nth-of-type(1){padding-left:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:hover{-webkit-transform:scaleY(1.5);-moz-transform:scaleY(1.5);-ms-transform:scaleY(1.5);-o-transform:scaleY(1.5);transform:scaleY(1.5)}.media-control[data-media-control].w320 .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume].volume-bar-hide{height:12px;top:9px;padding:0;width:0}", seek_time: ".seek-time[data-seek-time]{position:absolute;width:auto;height:20px;line-height:20px;bottom:55px;background-color:rgba(2,2,2,.5);z-index:9999;-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.seek-time[data-seek-time].hidden[data-seek-time]{opacity:0}.seek-time[data-seek-time] span[data-seek-time]{position:relative;color:#fff;font-size:10px;padding-left:7px;padding-right:7px}", flash: "[data-flash]{position:absolute;height:100%;width:100%;background-color:#000;display:block;pointer-events:none}", hls: "[data-hls]{position:absolute;display:block;pointer-events:none;top:0}", html5_video: "[data-html5-video]{position:absolute;height:100%;width:100%;display:block}", html_img: "[data-html-img]{max-width:100%;max-height:100%}", no_op: "[data-no-op]{z-index:1000;position:absolute;height:100%;width:100%;text-align:center}[data-no-op] p[data-no-op-msg]{position:absolute;font-size:25px;top:40%;color:#fff}[data-no-op] canvas[data-no-op-canvas]{background-color:#777;height:100%;width:100%}", dvr_controls: "@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local(\"Roboto\"),local(\"Roboto-Regular\"),url(\"<%= baseUrl %>/assets/Roboto.ttf\") format(\"truetype\")}.dvr-controls[data-dvr-controls]{display:inline-block;float:left;color:#fff;line-height:32px;font-size:10px;font-weight:700;margin-left:6px}.dvr-controls[data-dvr-controls] .live-info{cursor:default;font-family:Roboto,\"Open Sans\",Arial,sans-serif}.dvr-controls[data-dvr-controls] .live-info:before{content:\"\";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#ff0101}.dvr-controls[data-dvr-controls] .live-info.disabled{opacity:.3}.dvr-controls[data-dvr-controls] .live-info.disabled:before{background-color:#fff}.dvr-controls[data-dvr-controls] .live-button{cursor:pointer;outline:0;display:none;border:0;color:#fff;background-color:transparent;height:32px;padding:0;opacity:.7;font-family:Roboto,\"Open Sans\",Arial,sans-serif;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.dvr-controls[data-dvr-controls] .live-button:before{content:\"\";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#fff}.dvr-controls[data-dvr-controls] .live-button:hover{opacity:1;text-shadow:rgba(255,255,255,.75) 0 0 5px}.dvr .dvr-controls[data-dvr-controls] .live-info{display:none}.dvr .dvr-controls[data-dvr-controls] .live-button{display:block}.dvr.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#005aff}.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#ff0101}.seek-time[data-seek-time] span[data-duration]{position:relative;color:rgba(255,255,255,.5);font-size:10px;padding-right:7px}.seek-time[data-seek-time] span[data-duration]:before{content:\"|\";margin-right:7px}", poster: "@font-face{font-family:Player;src:url(\"<%= baseUrl %>/assets/Player-Regular.eot\");src:url(\"<%= baseUrl %>/assets/Player-Regular.eot?#iefix\") format(\"embedded-opentype\"),url(\"<%= baseUrl %>/assets/Player-Regular.ttf\") format(\"truetype\"),url(\"<%= baseUrl %>/assets/Player-Regular.svg#player\") format(\"svg\")}.player-poster[data-poster]{cursor:pointer;position:absolute;height:100%;width:100%;z-index:998;top:0}.player-poster[data-poster] .poster-background[data-poster]{width:100%;height:100%;background-size:cover;background-repeat:no-repeat;background-position:50% 50%}.player-poster[data-poster] .play-wrapper[data-poster]{position:absolute;width:100%;height:25%;line-height:100%;font-size:25%;top:50%;text-align:center}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]{font-family:Player;font-weight:400;font-style:normal;line-height:1;letter-spacing:0;speak:none;color:#fff;opacity:.75;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:opacity text-shadow;-webkit-transition-delay:.1s;-moz-transition:opacity text-shadow .1s;-o-transition:opacity text-shadow .1s;transition:opacity text-shadow .1s ease}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster].play[data-poster]:before{content:\"\\e001\"}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]:hover{opacity:1;text-shadow:rgba(255,255,255,.8) 0 0 15px}", spinner_three_bounce: ".spinner-three-bounce[data-spinner]{position:absolute;margin:0 auto;width:70px;text-align:center;z-index:999;top:47%;left:0;right:0}.spinner-three-bounce[data-spinner]>div{width:18px;height:18px;background-color:#FFF;border-radius:100%;display:inline-block;-webkit-animation:bouncedelay 1.4s infinite ease-in-out;-moz-animation:bouncedelay 1.4s infinite ease-in-out;-ms-animation:bouncedelay 1.4s infinite ease-in-out;-o-animation:bouncedelay 1.4s infinite ease-in-out;animation:bouncedelay 1.4s infinite ease-in-out;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both}.spinner-three-bounce[data-spinner] [data-bounce1],.spinner-three-bounce[data-spinner] [data-bounce2]{-webkit-animation-delay:-.32s;-moz-animation-delay:-.32s;-ms-animation-delay:-.32s;-o-animation-delay:-.32s;animation-delay:-.32s}@-moz-keyframes bouncedelay{0%,100%,80%{-moz-transform:scale(0);transform:scale(0)}40%{-moz-transform:scale(1);transform:scale(1)}}@-webkit-keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@-o-keyframes bouncedelay{0%,100%,80%{-o-transform:scale(0);transform:scale(0)}40%{-o-transform:scale(1);transform:scale(1)}}@-ms-keyframes bouncedelay{0%,100%,80%{-ms-transform:scale(0);transform:scale(0)}40%{-ms-transform:scale(1);transform:scale(1)}}@keyframes bouncedelay{0%,100%,80%{transform:scale(0)}40%{transform:scale(1)}}", watermark: "[data-watermark]{position:absolute;margin:100px auto 0;width:70px;text-align:center;z-index:10}[data-watermark-bottom-left]{bottom:10px;left:10px}[data-watermark-bottom-right]{bottom:10px;right:42px}[data-watermark-top-left]{top:-95px;left:10px}[data-watermark-top-right]{top:-95px;right:37px}" } };

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

var extend = function extend(parent, properties) {
  var constructor = function constructor() {
    parent.prototype.constructor.apply(this, arguments);
    if (properties.constructor) {
      properties.constructor.apply(this, arguments);
    }
  };
  constructor.prototype = Object.create(parent.prototype);
  assign(constructor.prototype, properties);
  return constructor;
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
        this.listenTo(this.playback, Events.PLAYBACK_PAUSE, this.paused);
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
    paused: {
      value: function paused() {
        this.trigger(Events.CONTAINER_PAUSE, this.name);
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

},{"../../base/base_object":"base_object","../../playbacks/flash":"flash","../../playbacks/hls":"hls","../../playbacks/html5_audio":"html5_audio","../../playbacks/html5_video":"html5_video","../../playbacks/html_img":"html_img","../../playbacks/no_op":68,"../../plugins/click_to_pause":71,"../../plugins/dvr_controls":73,"../../plugins/google_analytics":75,"../../plugins/poster":"poster","../../plugins/spinner_three_bounce":79,"../../plugins/stats":81,"../../plugins/watermark":83,"../player_info":"player_info","lodash.uniq":32}],58:[function(require,module,exports){
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
        this.trigger(Events.PLAYBACK_PAUSE, this.name);
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

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Mediator = require("../../components/mediator");

var HLSEvents = (function () {
  function HLSEvents(instanceId) {
    _classCallCheck(this, HLSEvents);

    this.instanceId = instanceId;
  }

  _createClass(HLSEvents, {
    ready: {
      value: function ready() {
        Mediator.trigger("" + this.instanceId + ":flashready");
      }
    },
    videoSize: {
      value: function videoSize(width, height) {
        Mediator.trigger("" + this.instanceId + ":videosizechanged", width, height);
      }
    },
    complete: {
      value: function complete() {
        Mediator.trigger("" + this.instanceId + ":complete");
      }
    },
    error: {
      value: function error(code, url, message) {
        Mediator.trigger("" + this.instanceId + ":error", code, url, message);
      }
    },
    manifest: {
      value: function manifest(duration, loadmetrics) {
        Mediator.trigger("" + this.instanceId + ":manifestloaded", duration, loadmetrics);
      }
    },
    audioLevelLoaded: {
      value: function audioLevelLoaded(loadmetrics) {
        Mediator.trigger("" + this.instanceId + ":audiolevelloaded", loadmetrics);
      }
    },
    levelLoaded: {
      value: function levelLoaded(loadmetrics) {
        Mediator.trigger("" + this.instanceId + ":levelloaded", loadmetrics);
      }
    },
    fragmentLoaded: {
      value: function fragmentLoaded(loadmetrics) {
        Mediator.trigger("" + this.instanceId + ":fragmentloaded", loadmetrics);
      }
    },
    fragmentPlaying: {
      value: function fragmentPlaying(playmetrics) {
        Mediator.trigger("" + this.instanceId + ":fragmentplaying", playmetrics);
      }
    },
    position: {
      value: function position(timemetrics) {
        Mediator.trigger("" + this.instanceId + ":timeupdate", timemetrics);
      }
    },
    state: {
      value: function state(newState) {
        Mediator.trigger("" + this.instanceId + ":playbackstate", newState);
      }
    },
    seekState: {
      value: function seekState(newState) {
        Mediator.trigger("" + this.instanceId + ":seekstate", newState);
      }
    },
    "switch": {
      value: function _switch(newLevel) {
        Mediator.trigger("" + this.instanceId + ":levelchanged", newLevel);
      }
    },
    audioTracksListChange: {
      value: function audioTracksListChange(trackList) {
        Mediator.trigger("" + this.instanceId + ":audiotracklistchanged", trackList);
      }
    },
    audioTrackChange: {
      value: function audioTrackChange(trackId) {
        Mediator.trigger("" + this.instanceId + ":audiotrackchanged", trackId);
      }
    }
  });

  return HLSEvents;
})();

module.exports = HLSEvents;

},{"../../components/mediator":"mediator"}],64:[function(require,module,exports){
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

var HLSEvents = require("./flashls_events");

var objectIE = "<object type=\"application/x-shockwave-flash\" id=\"<%= cid %>\" class=\"hls-playback\" classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" data-hls=\"\" width=\"100%\" height=\"100%\"><param name=\"movie\" value=\"<%= baseUrl %>/assets/flashlsChromeless.swf\"> <param name=\"quality\" value=\"autohigh\"> <param name=\"swliveconnect\" value=\"true\"> <param name=\"allowScriptAccess\" value=\"always\"> <param name=\"bgcolor\" value=\"#001122\"> <param name=\"allowFullScreen\" value=\"false\"> <param name=\"wmode\" value=\"transparent\"> <param name=\"tabindex\" value=\"1\"> <param name=FlashVars value=\"playbackId=<%= playbackId %>\" /> </object>";

var HLS = (function (_Playback) {
  function HLS(options) {
    _classCallCheck(this, HLS);

    _get(Object.getPrototypeOf(HLS.prototype), "constructor", this).call(this, options);
    this.src = options.src;
    this.baseUrl = options.baseUrl;
    this.flushLiveURLCache = options.flushLiveURLCache === undefined ? true : options.flushLiveURLCache;
    this.capLevelToStage = options.capLevelToStage === undefined ? false : options.capLevelToStage;
    this.useHardwareVideoDecoder = options.useHardwareVideoDecoder === undefined ? true : options.useHardwareVideoDecoder;
    this.maxBufferLength = options.maxBufferLength === undefined ? 120 : options.maxBufferLength;
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

        Mediator.on(this.cid + ":flashready", function () {
          return _this.bootstrap();
        });
        Mediator.on(this.cid + ":timeupdate", function (timeMetrics) {
          return _this.updateTime(timeMetrics);
        });
        Mediator.on(this.cid + ":playbackstate", function (state) {
          return _this.setPlaybackState(state);
        });
        Mediator.on(this.cid + ":levelchanged", function (level) {
          return _this.updateHighDefinition(level);
        });
        Mediator.on(this.cid + ":playbackerror", function () {
          return _this.flashPlaybackError();
        });
      }
    },
    stopListening: {
      value: function stopListening() {
        _get(Object.getPrototypeOf(HLS.prototype), "stopListening", this).call(this);
        Mediator.off(this.cid + ":flashready");
        Mediator.off(this.cid + ":timeupdate");
        Mediator.off(this.cid + ":playbackstate");
        Mediator.off(this.cid + ":levelchanged");
        Mediator.off(this.cid + ":playbackerror");
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
        this.el.playerSetflushLiveURLCache(this.flushLiveURLCache);
        this.el.playerCapLeveltoStage(this.capLevelToStage);
        this.el.playerSetmaxBufferLength(this.maxBufferLength);
        this.el.playerSetUseHardwareVideoDecoder(this.useHardwareVideoDecoder);
      }
    },
    updateHighDefinition: {
      value: function updateHighDefinition(level) {
        var currentLevel = this.getLevels()[level];
        this.highDefinition = currentLevel.height >= 720 || currentLevel.bitrate / 1000 >= 2000;
        this.trigger(Events.PLAYBACK_HIGHDEFINITIONUPDATE);
        this.trigger(Events.PLAYBACK_BITRATE, { bitrate: this.getCurrentBitrate() });
      }
    },
    updateTime: {
      value: function updateTime(timeMetrics) {
        if (this.currentState === "IDLE") {
          return;
        }var duration = this.normalizeDuration(timeMetrics.duration);
        var position = Math.min(Math.max(timeMetrics.position, 0), duration);
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
          this.el.playerResume();
        } else if (!this.srcLoaded && this.currentState !== "PLAYING") {
          this.firstPlay();
        } else {
          this.el.playerPlay();
        }
      }
    },
    getPlaybackType: {
      value: function getPlaybackType() {
        return this.playbackType ? this.playbackType : null;
      }
    },
    getCurrentBitrate: {
      value: function getCurrentBitrate() {
        var currentLevel = this.getLevels()[this.el.getLevel()];
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
          this.levels = this.el.getLevels();
        }
        return this.levels;
      }
    },
    setPlaybackState: {
      value: function setPlaybackState(state) {
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
          this.trigger(Events.PLAYBACK_TIMEUPDATE, 0, this.el.getDuration(), this.name);
          this.updateCurrentState(state);
        }
      }
    },
    updateCurrentState: {
      value: function updateCurrentState(state) {
        this.currentState = state;
        this.updatePlaybackType();
        if (state === "PLAYING") {
          this.trigger(Events.PLAYBACK_PLAY, this.name);
        } else {
          this.trigger(Events.PLAYBACK_PAUSE, this.name);
        }
      }
    },
    updatePlaybackType: {
      value: function updatePlaybackType() {
        this.playbackType = this.el.getType();
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
          Mediator.on(this.cid + ":fragmentloaded", function () {
            return _this.onFragmentLoaded();
          });
        }
      }
    },
    stopReportingProgress: {
      value: function stopReportingProgress() {
        Mediator.off(this.cid + ":fragmentloaded", this.onFragmentLoaded, this);
      }
    },
    onFragmentLoaded: {
      value: function onFragmentLoaded() {
        var buffered = this.el.getPosition() + this.el.getbufferLength();
        this.trigger(Events.PLAYBACK_PROGRESS, this.el.getPosition(), buffered, this.el.getDuration(), this.name);
      }
    },
    firstPlay: {
      value: function firstPlay() {
        var _this = this;

        this.setFlashSettings(); //ensure flushLiveURLCache will work (#327)
        this.el.playerLoad(this.src);
        Mediator.once(this.cid + ":manifestloaded", function () {
          return _this.el.playerPlay();
        });
        this.srcLoaded = true;
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
        if (this.playbackType !== "live" || this.dvrEnabled) {
          this.el.playerPause();
          if (this.playbackType === "live" && this.dvrEnabled) {
            this.updateDvr(true);
          }
        }
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
        if (this.currentState) {
          return !!this.currentState.match(/playing/i);
        }
        return false;
      }
    },
    normalizeDuration: {
      value: function normalizeDuration(duration) {
        if (this.playbackType === "live") {
          // estimate 10 seconds of buffer time for live streams for seek positions
          duration = duration - 10;
        }
        return duration;
      }
    },
    seek: {
      value: function seek(time) {
        var duration = this.el.getDuration();
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
        this.el.playerSeek(time);
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
    createCallbacks: {
      value: function createCallbacks() {
        var _this = this;

        if (!window.Clappr.flashlsCallbacks) {
          window.Clappr.flashlsCallbacks = {};
        }
        this.flashlsEvents = new HLSEvents(this.cid);
        window.Clappr.flashlsCallbacks[this.cid] = function (eventName, args) {
          _this.flashlsEvents[eventName].apply(_this.flashlsEvents, args);
        };
      }
    },
    render: {
      value: function render() {
        var style = Styler.getStyleFor(this.name);
        if (Browser.isLegacyIE) {
          this.setupIE();
        } else {
          var callbackName = this.createCallbacks();
          this.$el.html(this.template({ cid: this.cid, baseUrl: this.baseUrl, playbackId: this.uniqueId, callbackName: "window.Clappr.flashlsCallbacks." + this.cid }));
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

},{"../../base/events":"events","../../base/jst":47,"../../base/playback":"playback","../../base/styler":48,"../../base/template":"template","../../components/browser":"browser","../../components/mediator":"mediator","./flashls_events":63,"clappr-zepto":"zepto","lodash.assign":1}],65:[function(require,module,exports){
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
          canplaythrough: "bufferFull",
          playing: "playing",
          pause: "paused"
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
        if (this.el.src !== this.options.src) {
          this.el.src = this.options.src;
        }
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
    playing: {
      value: function playing() {
        this.trigger(Events.PLAYBACK_PLAY);
      }
    },
    paused: {
      value: function paused() {
        this.trigger(Events.PLAYBACK_PAUSE);
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

},{"../../base/events":"events","../../base/playback":"playback","lodash.find":12}],66:[function(require,module,exports){
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
          error: "error",
          playing: "playing",
          pause: "paused"
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
    playing: {
      value: function playing() {
        this.trigger(Events.PLAYBACK_PLAY);
      }
    },
    paused: {
      value: function paused() {
        this.trigger(Events.PLAYBACK_PAUSE);
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

},{"../../base/events":"events","../../base/jst":47,"../../base/playback":"playback","../../base/styler":48,"../../base/utils":49,"../../components/browser":"browser","lodash.find":12}],67:[function(require,module,exports){
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

},{"../../base/playback":"playback","../../base/styler":48}],68:[function(require,module,exports){
"use strict";

module.exports = require("./no_op");

},{"./no_op":69}],69:[function(require,module,exports){
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

},{"../../base/events":"events","../../base/jst":47,"../../base/playback":"playback","../../base/styler":48}],70:[function(require,module,exports){
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
var Browser = require("../../components/browser");

var ClickToPausePlugin = (function (_ContainerPlugin) {
  function ClickToPausePlugin(options) {
    _classCallCheck(this, ClickToPausePlugin);

    if (!options.chromeless && !Browser.isMobile) {
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

},{"../../base/container_plugin":"container_plugin","../../base/events":"events","../../components/browser":"browser"}],71:[function(require,module,exports){
"use strict";

module.exports = require("./click_to_pause");

},{"./click_to_pause":70}],72:[function(require,module,exports){
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
        var style = Styler.getStyleFor(this.name, { baseUrl: this.core.options.baseUrl });
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

},{"../../base/events":"events","../../base/jst":47,"../../base/styler":48,"../../base/ui_core_plugin":"ui_core_plugin","clappr-zepto":"zepto"}],73:[function(require,module,exports){
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

},{"../../base/container_plugin":"container_plugin","../../base/events":"events"}],75:[function(require,module,exports){
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

},{"../../base/kibo":"kibo"}],78:[function(require,module,exports){
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

},{"../../base/events":"events","../../base/jst":47,"../../base/styler":48,"../../base/ui_container_plugin":"ui_container_plugin","../../components/mediator":"mediator","../../components/player_info":"player_info","clappr-zepto":"zepto"}],79:[function(require,module,exports){
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

},{"../../base/events":"events","../../base/jst":47,"../../base/styler":48,"../../base/ui_container_plugin":"ui_container_plugin"}],81:[function(require,module,exports){
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

},{"../../base/container_plugin":"container_plugin","../../base/events":"events","clappr-zepto":"zepto"}],83:[function(require,module,exports){
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
var ContainerPlugin = require("./base/container_plugin");
var UIContainerPlugin = require("./base/ui_container_plugin");
var CorePlugin = require("./base/core_plugin");
var UICorePlugin = require("./base/ui_core_plugin");

window.DEBUG = false;

window.Clappr = {
  Player: Player,
  Mediator: Mediator,
  Events: Events,
  ContainerPlugin: ContainerPlugin,
  UIContainerPlugin: UIContainerPlugin,
  CorePlugin: CorePlugin,
  UICorePlugin: UICorePlugin
};
window.Clappr.version = "0.1.0";

module.exports = window.Clappr;

},{"./base/container_plugin":"container_plugin","./base/core_plugin":"core_plugin","./base/events":"events","./base/ui_container_plugin":"ui_container_plugin","./base/ui_core_plugin":"ui_core_plugin","./components/mediator":"mediator","./components/player":59}],"container_plugin":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var BaseObject = require("./base_object");
var extend = require("./utils").extend;

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

ContainerPlugin.extend = function (properties) {
  return extend(ContainerPlugin, properties);
};

module.exports = ContainerPlugin;

},{"./base_object":"base_object","./utils":49}],"container":[function(require,module,exports){
"use strict";

module.exports = require("./container");

},{"./container":50}],"core_plugin":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var BaseObject = require("./base_object");
var extend = require("./utils").extend;

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

CorePlugin.extend = function (properties) {
  return extend(CorePlugin, properties);
};

module.exports = CorePlugin;

},{"./base_object":"base_object","./utils":49}],"core":[function(require,module,exports){
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
Events.PLAYBACK_PAUSE = "playback:pause";
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

},{"../plugins/log":76,"./utils":49,"lodash.once":28}],"flash":[function(require,module,exports){
"use strict";

module.exports = require("./flash");

},{"./flash":62}],"hls":[function(require,module,exports){
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

},{"./html_img":67}],"kibo":[function(require,module,exports){
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

},{"./poster":78}],"template":[function(require,module,exports){
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
var extend = require("./utils").extend;

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

UIContainerPlugin.extend = function (properties) {
  return extend(UIContainerPlugin, properties);
};

module.exports = UIContainerPlugin;

},{"./ui_object":"ui_object","./utils":49}],"ui_core_plugin":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var UIObject = require("./ui_object");
var extend = require("./utils").extend;

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

UICorePlugin.extend = function (properties) {
  return extend(UICorePlugin, properties);
};

module.exports = UICorePlugin;

},{"./ui_object":"ui_object","./utils":49}],"ui_object":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vhc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vjb3B5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzbmF0aXZlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2gua2V5cy9ub2RlX21vZHVsZXMvbG9kYXNoLmlzYXJndW1lbnRzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2FycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlYXNzaWduZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9jcmVhdGVhc3NpZ25lci9ub2RlX21vZHVsZXMvbG9kYXNoLl9iaW5kY2FsbGJhY2svaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9jcmVhdGVhc3NpZ25lci9ub2RlX21vZHVsZXMvbG9kYXNoLl9pc2l0ZXJhdGVlY2FsbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2NyZWF0ZWFzc2lnbmVyL25vZGVfbW9kdWxlcy9sb2Rhc2gucmVzdHBhcmFtL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VjYWxsYmFjay9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZmluZC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlY2FsbGJhY2svbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZpbmQvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWNhbGxiYWNrL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guaXN0eXBlZGFycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VlYWNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VmaW5kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guZmluZGluZGV4L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5maW5kL25vZGVfbW9kdWxlcy9sb2Rhc2guZmluZGluZGV4L25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VmaW5kaW5kZXgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm9uY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm9uY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC5iZWZvcmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnJlc3VsdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gucmVzdWx0L25vZGVfbW9kdWxlcy9sb2Rhc2guaXNmdW5jdGlvbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaW5kZXhvZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNldW5pcS9ub2RlX21vZHVsZXMvbG9kYXNoLl9jYWNoZWluZGV4b2YvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZXVuaXEvbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlY2FjaGUvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvanN0LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3N0eWxlci5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvYmFzZS91dGlscy5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb250YWluZXIvY29udGFpbmVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lcl9mYWN0b3J5L2NvbnRhaW5lcl9mYWN0b3J5LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lcl9mYWN0b3J5L2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvcmUvY29yZS5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb3JlX2ZhY3RvcnkvY29yZV9mYWN0b3J5LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2NvcmVfZmFjdG9yeS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9sb2FkZXIvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9tZWRpYV9jb250cm9sL21lZGlhX2NvbnRyb2wuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvcGxheWVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL3NlZWtfdGltZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9zZWVrX3RpbWUvc2Vla190aW1lLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvZmxhc2gvZmxhc2guanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9obHMvZmxhc2hsc19ldmVudHMuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9obHMvaGxzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfYXVkaW8vaHRtbDVfYXVkaW8uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9odG1sNV92aWRlby9odG1sNV92aWRlby5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWxfaW1nL2h0bWxfaW1nLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3Mvbm9fb3AvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9ub19vcC9ub19vcC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9jbGlja190b19wYXVzZS9jbGlja190b19wYXVzZS5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9jbGlja190b19wYXVzZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9kdnJfY29udHJvbHMvZHZyX2NvbnRyb2xzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL2R2cl9jb250cm9scy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9nb29nbGVfYW5hbHl0aWNzL2dvb2dsZV9hbmFseXRpY3MuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvZ29vZ2xlX2FuYWx5dGljcy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9sb2cvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvbG9nL2xvZy5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy9wb3N0ZXIvcG9zdGVyLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3NwaW5uZXJfdGhyZWVfYm91bmNlL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3NwaW5uZXJfdGhyZWVfYm91bmNlL3NwaW5uZXJfdGhyZWVfYm91bmNlLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3N0YXRzL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3N0YXRzL3N0YXRzLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbHVnaW5zL3dhdGVybWFyay9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGx1Z2lucy93YXRlcm1hcmsvd2F0ZXJtYXJrLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL2Jhc2Vfb2JqZWN0LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL2Jyb3dzZXIuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL21haW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvY29udGFpbmVyX3BsdWdpbi5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvY29tcG9uZW50cy9jb250YWluZXIvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvY29yZV9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvY29yZS9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvYmFzZS9ldmVudHMuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9mbGFzaC9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2hscy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvcGxheWJhY2tzL2h0bWw1X2F1ZGlvL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9wbGF5YmFja3MvaHRtbDVfdmlkZW8vaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsYXliYWNrcy9odG1sX2ltZy9pbmRleC5qcyIsIi9Vc2Vycy9icnVuby93b3Jrc3BhY2UvcGxheWVyL2NsYXBwci9zcmMvYmFzZS9raWJvLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9jb21wb25lbnRzL21lZGlhX2NvbnRyb2wvaW5kZXguanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvbWVkaWF0b3IuanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvcGxheWJhY2suanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2NvbXBvbmVudHMvcGxheWVyX2luZm8uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL3BsdWdpbnMvcG9zdGVyL2luZGV4LmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3RlbXBsYXRlLmpzIiwiL1VzZXJzL2JydW5vL3dvcmtzcGFjZS9wbGF5ZXIvY2xhcHByL3NyYy9iYXNlL3VpX2NvbnRhaW5lcl9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvdWlfY29yZV9wbHVnaW4uanMiLCIvVXNlcnMvYnJ1bm8vd29ya3NwYWNlL3BsYXllci9jbGFwcHIvc3JjL2Jhc2UvdWlfb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NsYXBwci16ZXB0by96ZXB0by5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDckxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hIQSxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDckMsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLGVBQWlCLFFBQVEsQ0FBQyw4d0VBQTh0RSxDQUFDLEVBQUMsV0FBYSxRQUFRLENBQUMsOEJBQThCLENB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QUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxBQUFDLE9BQU07QUFBQSxBQUMxRSxTQUFLLENBQUM7QUFBRSxhQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEFBQzlFLFNBQUssQ0FBQztBQUFFLGFBQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEFBQ2xGO0FBQVMsYUFBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEFBQUMsT0FBTTtBQUFBLEdBQy9FO0NBQ0YsQ0FBQTs7QUFFRCxJQUFJLGFBQWEsR0FBRyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFBOztBQUUxRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLE1BQU0sRUFBRTtBQUNsRCxRQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFVBQVMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDdkQsUUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQSxBQUFDLENBQUE7QUFDL0QsUUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsS0FBSyxHQUFHLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLENBQUE7QUFDekQsZUFBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtBQUNyQixRQUFJLENBQUMsUUFBUSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFBO0FBQzFELE9BQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ2hELFdBQU8sSUFBSSxDQUFBO0dBQ1osQ0FBQTtDQUNGLENBQUMsQ0FBQzs7O0FBR0gsTUFBTSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUE7QUFDL0IsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUE7QUFDM0IsTUFBTSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUE7QUFDN0IsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUE7QUFDM0IsTUFBTSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUE7QUFDN0IsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUE7QUFDM0IsTUFBTSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUE7QUFDN0IsTUFBTSxDQUFDLGlCQUFpQixHQUFHLFlBQVksQ0FBQTs7O0FBR3ZDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQTtBQUM5QyxNQUFNLENBQUMsbUJBQW1CLEdBQUcscUJBQXFCLENBQUE7QUFDbEQsTUFBTSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQTtBQUN4QyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsb0JBQW9CLENBQUE7QUFDaEQsTUFBTSxDQUFDLG1CQUFtQixHQUFHLHFCQUFxQixDQUFBO0FBQ2xELE1BQU0sQ0FBQyx1QkFBdUIsR0FBRyx5QkFBeUIsQ0FBQTtBQUMxRCxNQUFNLENBQUMsdUJBQXVCLEdBQUcseUJBQXlCLENBQUE7QUFDMUQsTUFBTSxDQUFDLDZCQUE2QixHQUFHLCtCQUErQixDQUFBO0FBQ3RFLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQTtBQUM1QyxNQUFNLENBQUMsc0JBQXNCLEdBQUcsd0JBQXdCLENBQUE7QUFDeEQsTUFBTSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUE7QUFDcEMsTUFBTSxDQUFDLDZCQUE2QixHQUFHLCtCQUErQixDQUFBO0FBQ3RFLE1BQU0sQ0FBQyw0QkFBNEIsR0FBRyw4QkFBOEIsQ0FBQTtBQUNwRSxNQUFNLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFBO0FBQ3hDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFBO0FBQ3RDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUE7QUFDeEMsTUFBTSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQTtBQUN4QyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsb0JBQW9CLENBQUE7OztBQUdoRCxNQUFNLENBQUMsdUJBQXVCLEdBQUcseUJBQXlCLENBQUE7QUFDMUQsTUFBTSxDQUFDLGlDQUFpQyxHQUFHLGVBQWUsQ0FBQTtBQUMxRCxNQUFNLENBQUMsaUJBQWlCLEdBQUcsbUJBQW1CLENBQUE7QUFDOUMsTUFBTSxDQUFDLHNCQUFzQixHQUFHLHdCQUF3QixDQUFBO0FBQ3hELE1BQU0sQ0FBQyxtQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQTtBQUNsRCxNQUFNLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFBO0FBQzFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsaUJBQWlCLENBQUE7QUFDMUMsTUFBTSxDQUFDLHdCQUF3QixHQUFHLDBCQUEwQixDQUFBO0FBQzVELE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQTtBQUNwRCxNQUFNLENBQUMsa0JBQWtCLEdBQUcsb0JBQW9CLENBQUE7QUFDaEQsTUFBTSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQTtBQUN4QyxNQUFNLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFBO0FBQ3hDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsaUJBQWlCLENBQUE7QUFDMUMsTUFBTSxDQUFDLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQTtBQUMxQyxNQUFNLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFBO0FBQzFDLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQTtBQUNoRCxNQUFNLENBQUMscUJBQXFCLEdBQUcsc0JBQXNCLENBQUE7QUFDckQsTUFBTSxDQUFDLHFCQUFxQixHQUFHLHNCQUFzQixDQUFBO0FBQ3JELE1BQU0sQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUE7QUFDeEMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLGtCQUFrQixDQUFBO0FBQzVDLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQTtBQUNwRCxNQUFNLENBQUMseUJBQXlCLEdBQUcsMkJBQTJCLENBQUE7QUFDOUQsTUFBTSxDQUFDLDBCQUEwQixHQUFHLDRCQUE0QixDQUFBO0FBQ2hFLE1BQU0sQ0FBQyx3QkFBd0IsR0FBRywwQkFBMEIsQ0FBQTtBQUM1RCxNQUFNLENBQUMsOEJBQThCLEdBQUcsZ0NBQWdDLENBQUE7QUFDeEUsTUFBTSxDQUFDLDhCQUE4QixHQUFHLGdDQUFnQyxDQUFBO0FBQ3hFLE1BQU0sQ0FBQyw2QkFBNkIsR0FBRywrQkFBK0IsQ0FBQTtBQUN0RSxNQUFNLENBQUMsbUJBQW1CLEdBQUcscUJBQXFCLENBQUE7OztBQUdsRCxNQUFNLENBQUMscUJBQXFCLEdBQUcsdUJBQXVCLENBQUE7QUFDdEQsTUFBTSxDQUFDLHVCQUF1QixHQUFHLHlCQUF5QixDQUFBO0FBQzFELE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQTtBQUM5QyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsbUJBQW1CLENBQUE7QUFDOUMsTUFBTSxDQUFDLDhCQUE4QixHQUFHLGdDQUFnQyxDQUFBO0FBQ3hFLE1BQU0sQ0FBQywrQkFBK0IsR0FBRyxpQ0FBaUMsQ0FBQTtBQUMxRSxNQUFNLENBQUMsb0JBQW9CLEdBQUcsc0JBQXNCLENBQUE7QUFDcEQsTUFBTSxDQUFDLHVCQUF1QixHQUFHLHlCQUF5QixDQUFBO0FBQzFELE1BQU0sQ0FBQyw2QkFBNkIsR0FBRywrQkFBK0IsQ0FBQTs7QUFFdEUsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7Ozs7O0FDak52QixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7QUNBcEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7O0FDQWxDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDOzs7OztBQ0ExQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQzs7Ozs7QUNBMUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs7O0FDQXZDLElBQUksSUFBSSxHQUFHLGNBQVMsT0FBTyxFQUFFO0FBQzNCLE1BQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDMUMsTUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0NBQ25CLENBQUM7O0FBRUYsSUFBSSxDQUFDLGlCQUFpQixHQUFHO0FBQ3ZCLEdBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsT0FBTztBQUNyQyxJQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUs7QUFDbEMsSUFBRSxFQUFFLFdBQVc7QUFDZixJQUFFLEVBQUUsS0FBSztBQUNULElBQUUsRUFBRSxPQUFPO0FBQ1gsSUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU07QUFDN0MsSUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUc7QUFDeEYsSUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRztBQUN4TyxLQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUs7Q0FDdEksQ0FB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QyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDNUQsY0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDNUIsTUFBTTtBQUNMLGNBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQTtTQUMzQztPQUNGOzs7O1NBckVHLFFBQVE7R0FBUyxVQUFVOztBQXdFakMsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUE7OztBQ3BGekI7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlQXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlYXNzaWduJyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCdsb2Rhc2guX2NyZWF0ZWFzc2lnbmVyJyk7XG5cbi8qKlxuICogQXNzaWducyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykgdG8gdGhlIGRlc3RpbmF0aW9uXG4gKiBvYmplY3QuIFN1YnNlcXVlbnQgc291cmNlcyBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy5cbiAqIElmIGBjdXN0b21pemVyYCBpcyBwcm92aWRlZCBpdCBpcyBpbnZva2VkIHRvIHByb2R1Y2UgdGhlIGFzc2lnbmVkIHZhbHVlcy5cbiAqIFRoZSBgY3VzdG9taXplcmAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggZml2ZSBhcmd1bWVudHM7XG4gKiAob2JqZWN0VmFsdWUsIHNvdXJjZVZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIGV4dGVuZFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25pbmcgdmFsdWVzLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjdXN0b21pemVyYC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uYXNzaWduKHsgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICdhZ2UnOiA0MCB9LCB7ICd1c2VyJzogJ2ZyZWQnIH0pO1xuICogLy8gPT4geyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IDQwIH1cbiAqXG4gKiAvLyB1c2luZyBhIGN1c3RvbWl6ZXIgY2FsbGJhY2tcbiAqIHZhciBkZWZhdWx0cyA9IF8ucGFydGlhbFJpZ2h0KF8uYXNzaWduLCBmdW5jdGlvbih2YWx1ZSwgb3RoZXIpIHtcbiAqICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJyA/IG90aGVyIDogdmFsdWU7XG4gKiB9KTtcbiAqXG4gKiBkZWZhdWx0cyh7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAnYWdlJzogMzYgfSwgeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2IH1cbiAqL1xudmFyIGFzc2lnbiA9IGNyZWF0ZUFzc2lnbmVyKGJhc2VBc3NpZ24pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMS4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUNvcHkgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2Vjb3B5JyksXG4gICAgaXNOYXRpdmUgPSByZXF1aXJlKCdsb2Rhc2guaXNuYXRpdmUnKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnbG9kYXNoLmtleXMnKTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBpc05hdGl2ZShnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSAmJiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uYXNzaWduYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFyZ3VtZW50IGp1Z2dsaW5nLFxuICogbXVsdGlwbGUgc291cmNlcywgYW5kIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG52YXIgYmFzZUFzc2lnbiA9IGZ1bmN0aW9uKG9iamVjdCwgc291cmNlKSB7XG4gIHJldHVybiBzb3VyY2UgPT0gbnVsbFxuICAgID8gb2JqZWN0XG4gICAgOiBiYXNlQ29weShzb3VyY2UsIGdldFN5bWJvbHMoc291cmNlKSwgYmFzZUNvcHkoc291cmNlLCBrZXlzKHNvdXJjZSksIG9iamVjdCkpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9scyA9ICFnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBjb25zdGFudChbXSkgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyh0b09iamVjdChvYmplY3QpKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBvYmplY3QgaWYgaXQgaXMgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDogT2JqZWN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAoISF2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXR1cm4gZnJvbSB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKiB2YXIgZ2V0dGVyID0gXy5jb25zdGFudChvYmplY3QpO1xuICpcbiAqIGdldHRlcigpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGNvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFzc2lnbjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBjb3B5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNvcHkoc291cmNlLCBwcm9wcywgb2JqZWN0KSB7XG4gIG9iamVjdCB8fCAob2JqZWN0ID0ge30pO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBvYmplY3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNvcHk7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMiAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBbc3BlY2lhbCBjaGFyYWN0ZXJzXShodHRwOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9jaGFyYWN0ZXJzLmh0bWwjc3BlY2lhbCkuXG4gKiBJbiBhZGRpdGlvbiB0byBzcGVjaWFsIGNoYXJhY3RlcnMgdGhlIGZvcndhcmQgc2xhc2ggaXMgZXNjYXBlZCB0byBhbGxvdyBmb3JcbiAqIGVhc2llciBgZXZhbGAgdXNlIGFuZCBgRnVuY3Rpb25gIGNvbXBpbGF0aW9uLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQgaXMgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZXNjYXBlUmVnRXhwKG9ialRvU3RyaW5nKVxuICAucmVwbGFjZSgvdG9TdHJpbmd8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZykge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiL1wiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsXG4gKiBcIipcIiwgXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczpcXC9cXC9sb2Rhc2hcXC5jb21cXC9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOYXRpdmU7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuNyAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FycmF5JyksXG4gICAgaXNOYXRpdmUgPSByZXF1aXJlKCdsb2Rhc2guaXNuYXRpdmUnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gaXNOYXRpdmUobmF0aXZlS2V5cyA9IE9iamVjdC5rZXlzKSAmJiBuYXRpdmVLZXlzO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIEFuIG9iamVjdCBlbnZpcm9ubWVudCBmZWF0dXJlIGZsYWdzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAdHlwZSBPYmplY3RcbiAqL1xudmFyIHN1cHBvcnQgPSB7fTtcblxuKGZ1bmN0aW9uKHgpIHtcbiAgdmFyIEN0b3IgPSBmdW5jdGlvbigpIHsgdGhpcy54ID0geDsgfSxcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICBvYmplY3QgPSB7ICcwJzogeCwgJ2xlbmd0aCc6IHggfSxcbiAgICAgIHByb3BzID0gW107XG5cbiAgQ3Rvci5wcm90b3R5cGUgPSB7ICd2YWx1ZU9mJzogeCwgJ3knOiB4IH07XG4gIGZvciAodmFyIGtleSBpbiBuZXcgQ3RvcikgeyBwcm9wcy5wdXNoKGtleSk7IH1cblxuICAvKipcbiAgICogRGV0ZWN0IGlmIGBhcmd1bWVudHNgIG9iamVjdCBpbmRleGVzIGFyZSBub24tZW51bWVyYWJsZS5cbiAgICpcbiAgICogSW4gRmlyZWZveCA8IDQsIElFIDwgOSwgUGhhbnRvbUpTLCBhbmQgU2FmYXJpIDwgNS4xIGBhcmd1bWVudHNgIG9iamVjdFxuICAgKiBpbmRleGVzIGFyZSBub24tZW51bWVyYWJsZS4gQ2hyb21lIDwgMjUgYW5kIE5vZGUuanMgPCAwLjExLjAgdHJlYXRcbiAgICogYGFyZ3VtZW50c2Agb2JqZWN0IGluZGV4ZXMgYXMgbm9uLWVudW1lcmFibGUgYW5kIGZhaWwgYGhhc093blByb3BlcnR5YFxuICAgKiBjaGVja3MgZm9yIGluZGV4ZXMgdGhhdCBleGNlZWQgdGhlIG51bWJlciBvZiBmdW5jdGlvbiBwYXJhbWV0ZXJzIGFuZFxuICAgKiB3aG9zZSBhc3NvY2lhdGVkIGFyZ3VtZW50IHZhbHVlcyBhcmUgYDBgLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy5zdXBwb3J0XG4gICAqIEB0eXBlIGJvb2xlYW5cbiAgICovXG4gIHRyeSB7XG4gICAgc3VwcG9ydC5ub25FbnVtQXJncyA9ICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKGFyZ3MsIDEpO1xuICB9IGNhdGNoKGUpIHtcbiAgICBzdXBwb3J0Lm5vbkVudW1BcmdzID0gdHJ1ZTtcbiAgfVxufSgxLCAwKSk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGEgW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpXG4gKiB0aGF0IGFmZmVjdHMgU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICt2YWx1ZTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIEEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24gb2YgYE9iamVjdC5rZXlzYCB3aGljaCBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZVxuICogb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIHNoaW1LZXlzKG9iamVjdCkge1xuICB2YXIgcHJvcHMgPSBrZXlzSW4ob2JqZWN0KSxcbiAgICAgIHByb3BzTGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgbGVuZ3RoID0gcHJvcHNMZW5ndGggJiYgb2JqZWN0Lmxlbmd0aDtcblxuICB2YXIgYWxsb3dJbmRleGVzID0gbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IChzdXBwb3J0Lm5vbkVudW1BcmdzICYmIGlzQXJndW1lbnRzKG9iamVjdCkpKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgcHJvcHNMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmICgoYWxsb3dJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAoISF2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbnZhciBrZXlzID0gIW5hdGl2ZUtleXMgPyBzaGltS2V5cyA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICB2YXIgQ3RvciA9IG9iamVjdCAhPSBudWxsICYmIG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgaWYgKCh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QpIHx8XG4gICAgICAodHlwZW9mIG9iamVjdCAhPSAnZnVuY3Rpb24nICYmIGlzQXJyYXlMaWtlKG9iamVjdCkpKSB7XG4gICAgcmV0dXJuIHNoaW1LZXlzKG9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0KG9iamVjdCkgPyBuYXRpdmVLZXlzKG9iamVjdCkgOiBbXTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIGxlbmd0aCA9IChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgKHN1cHBvcnQubm9uRW51bUFyZ3MgJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMiAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgoZ2V0TGVuZ3RoKHZhbHVlKSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBbc3BlY2lhbCBjaGFyYWN0ZXJzXShodHRwOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9jaGFyYWN0ZXJzLmh0bWwjc3BlY2lhbCkuXG4gKiBJbiBhZGRpdGlvbiB0byBzcGVjaWFsIGNoYXJhY3RlcnMgdGhlIGZvcndhcmQgc2xhc2ggaXMgZXNjYXBlZCB0byBhbGxvdyBmb3JcbiAqIGVhc2llciBgZXZhbGAgdXNlIGFuZCBgRnVuY3Rpb25gIGNvbXBpbGF0aW9uLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQgaXMgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZXNjYXBlUmVnRXhwKG9ialRvU3RyaW5nKVxuICAucmVwbGFjZSgvdG9TdHJpbmd8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNBcnJheSA9IGlzTmF0aXZlKG5hdGl2ZUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KSAmJiBuYXRpdmVJc0FycmF5O1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWc7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVJc05hdGl2ZS50ZXN0KGZuVG9TdHJpbmcuY2FsbCh2YWx1ZSkpO1xuICB9XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIHJlSXNIb3N0Q3Rvci50ZXN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBFc2NhcGVzIHRoZSBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMgXCJcXFwiLCBcIi9cIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLFxuICogXCIqXCIsIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6XFwvXFwvbG9kYXNoXFwuY29tXFwvXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjEuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmluZGNhbGxiYWNrJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCdsb2Rhc2guX2lzaXRlcmF0ZWVjYWxsJyksXG4gICAgcmVzdFBhcmFtID0gcmVxdWlyZSgnbG9kYXNoLnJlc3RwYXJhbScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGFzc2lnbnMgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIGEgZ2l2ZW5cbiAqIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGNyZWF0ZSBgXy5hc3NpZ25gLCBgXy5kZWZhdWx0c2AsIGFuZCBgXy5tZXJnZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiByZXN0UGFyYW0oZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2VzKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG9iamVjdCA9PSBudWxsID8gMCA6IHNvdXJjZXMubGVuZ3RoLFxuICAgICAgICBjdXN0b21pemVyID0gbGVuZ3RoID4gMiAmJiBzb3VyY2VzW2xlbmd0aCAtIDJdLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgJiYgc291cmNlc1syXSxcbiAgICAgICAgdGhpc0FyZyA9IGxlbmd0aCA+IDEgJiYgc291cmNlc1tsZW5ndGggLSAxXTtcblxuICAgIGlmICh0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjdXN0b21pemVyID0gYmluZENhbGxiYWNrKGN1c3RvbWl6ZXIsIHRoaXNBcmcsIDUpO1xuICAgICAgbGVuZ3RoIC09IDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSB0eXBlb2YgdGhpc0FyZyA9PSAnZnVuY3Rpb24nID8gdGhpc0FyZyA6IG51bGw7XG4gICAgICBsZW5ndGggLT0gKGN1c3RvbWl6ZXIgPyAxIDogMCk7XG4gICAgfVxuICAgIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzb3VyY2VzWzBdLCBzb3VyY2VzWzFdLCBndWFyZCkpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPCAzID8gbnVsbCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0aGlzQXJnID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZnVuYztcbiAgfVxuICBzd2l0Y2ggKGFyZ0NvdW50KSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRDYWxsYmFjaztcbiIsIi8qKlxuICogbG9kYXNoIDMuMC43IChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGEgW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpXG4gKiB0aGF0IGFmZmVjdHMgU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICt2YWx1ZTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHByb3ZpZGVkIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgID8gKGlzQXJyYXlMaWtlKG9iamVjdCkgJiYgaXNJbmRleChpbmRleCwgb2JqZWN0Lmxlbmd0aCkpXG4gICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdCkpIHtcbiAgICB2YXIgb3RoZXIgPSBvYmplY3RbaW5kZXhdO1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyAodmFsdWUgPT09IG90aGVyKSA6IChvdGhlciAhPT0gb3RoZXIpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICghIXZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSXRlcmF0ZWVDYWxsO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy42LjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlXG4gKiBjcmVhdGVkIGZ1bmN0aW9uIGFuZCBhcmd1bWVudHMgZnJvbSBgc3RhcnRgIGFuZCBiZXlvbmQgcHJvdmlkZWQgYXMgYW4gYXJyYXkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uIHRoZSBbcmVzdCBwYXJhbWV0ZXJdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0Z1bmN0aW9ucy9yZXN0X3BhcmFtZXRlcnMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHNheSA9IF8ucmVzdFBhcmFtKGZ1bmN0aW9uKHdoYXQsIG5hbWVzKSB7XG4gKiAgIHJldHVybiB3aGF0ICsgJyAnICsgXy5pbml0aWFsKG5hbWVzKS5qb2luKCcsICcpICtcbiAqICAgICAoXy5zaXplKG5hbWVzKSA+IDEgPyAnLCAmICcgOiAnJykgKyBfLmxhc3QobmFtZXMpO1xuICogfSk7XG4gKlxuICogc2F5KCdoZWxsbycsICdmcmVkJywgJ2Jhcm5leScsICdwZWJibGVzJyk7XG4gKiAvLyA9PiAnaGVsbG8gZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnXG4gKi9cbmZ1bmN0aW9uIHJlc3RQYXJhbShmdW5jLCBzdGFydCkge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBzdGFydCA9IG5hdGl2ZU1heChzdGFydCA9PT0gdW5kZWZpbmVkID8gKGZ1bmMubGVuZ3RoIC0gMSkgOiAoK3N0YXJ0IHx8IDApLCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIHJlc3QgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHJlc3RbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgc3dpdGNoIChzdGFydCkge1xuICAgICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIHJlc3QpO1xuICAgICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3NbMF0sIHJlc3QpO1xuICAgICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3NbMF0sIGFyZ3NbMV0sIHJlc3QpO1xuICAgIH1cbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICBpbmRleCA9IC0xO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IHJlc3Q7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXN0UGFyYW07XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWNhbGxiYWNrJyksXG4gICAgYmFzZUVhY2ggPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VlYWNoJyksXG4gICAgYmFzZUZpbmQgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VmaW5kJyksXG4gICAgZmluZEluZGV4ID0gcmVxdWlyZSgnbG9kYXNoLmZpbmRpbmRleCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpO1xuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gLCByZXR1cm5pbmcgdGhlIGZpcnN0IGVsZW1lbnRcbiAqIGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvci4gVGhlIHByZWRpY2F0ZSBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kXG4gKiBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gKlxuICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ucHJvcGVydHlcIlxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogSWYgYW4gb2JqZWN0IGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBcIl8ubWF0Y2hlc1wiIHN0eWxlXG4gKiBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlblxuICogb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBkZXRlY3RcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gc2VhcmNoLlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8c3RyaW5nfSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkXG4gKiAgcGVyIGl0ZXJhdGlvbi4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yIG9iamVjdCBpcyBwcm92aWRlZCBpdCBpcyB1c2VkIHRvXG4gKiAgY3JlYXRlIGEgXCJfLnByb3BlcnR5XCIgb3IgXCJfLm1hdGNoZXNcIiBzdHlsZSBjYWxsYmFjayByZXNwZWN0aXZlbHkuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYHByZWRpY2F0ZWAuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWF0Y2hlZCBlbGVtZW50LCBlbHNlIGB1bmRlZmluZWRgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IGZhbHNlIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IHRydWUgfSxcbiAqICAgeyAndXNlcic6ICdwZWJibGVzJywgJ2FnZSc6IDEsICAnYWN0aXZlJzogZmFsc2UgfVxuICogXTtcbiAqXG4gKiBfLnJlc3VsdChfLmZpbmQodXNlcnMsIGZ1bmN0aW9uKGNocikgeyByZXR1cm4gY2hyLmFnZSA8IDQwOyB9KSwgJ3VzZXInKTtcbiAqIC8vID0+ICdiYXJuZXknXG4gKlxuICogLy8gdXNpbmcgdGhlIFwiXy5tYXRjaGVzXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnJlc3VsdChfLmZpbmQodXNlcnMsIHsgJ2FnZSc6IDEgfSksICd1c2VyJyk7XG4gKiAvLyA9PiAncGViYmxlcydcbiAqXG4gKiAvLyB1c2luZyB0aGUgXCJfLnByb3BlcnR5XCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnJlc3VsdChfLmZpbmQodXNlcnMsICdhY3RpdmUnKSwgJ3VzZXInKTtcbiAqIC8vID0+ICdmcmVkJ1xuICovXG5mdW5jdGlvbiBmaW5kKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICBpZiAoaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgIHZhciBpbmRleCA9IGZpbmRJbmRleChjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIHRoaXNBcmcpO1xuICAgIHJldHVybiBpbmRleCA+IC0xID8gY29sbGVjdGlvbltpbmRleF0gOiB1bmRlZmluZWQ7XG4gIH1cbiAgcHJlZGljYXRlID0gYmFzZUNhbGxiYWNrKHByZWRpY2F0ZSwgdGhpc0FyZywgMyk7XG4gIHJldHVybiBiYXNlRmluZChjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIGJhc2VFYWNoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4yLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlSXNFcXVhbCA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWlzZXF1YWwnKSxcbiAgICBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2JpbmRjYWxsYmFjaycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpLFxuICAgIGtleXMgPSByZXF1aXJlKCdsb2Rhc2gua2V5cycpO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxuXFxcXF18XFxcXC4pKj9cXDEpXFxdLyxcbiAgICByZUlzUGxhaW5Qcm9wID0gL15cXHcqJC8sXG4gICAgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXG5cXFxcXXxcXFxcLikqPylcXDIpXFxdL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQgaXMgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jYWxsYmFja2Agd2hpY2ggc3VwcG9ydHMgc3BlY2lmeWluZyB0aGVcbiAqIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gW2Z1bmM9Xy5pZGVudGl0eV0gVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBjYWxsYmFjay5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJhc2VDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBmdW5jO1xuICBpZiAodHlwZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHRoaXNBcmcgPT09IHVuZGVmaW5lZFxuICAgICAgPyBmdW5jXG4gICAgICA6IGJpbmRDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCk7XG4gIH1cbiAgaWYgKGZ1bmMgPT0gbnVsbCkge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBiYXNlTWF0Y2hlcyhmdW5jKTtcbiAgfVxuICByZXR1cm4gdGhpc0FyZyA9PT0gdW5kZWZpbmVkXG4gICAgPyBwcm9wZXJ0eShmdW5jKVxuICAgIDogYmFzZU1hdGNoZXNQcm9wZXJ0eShmdW5jLCB0aGlzQXJnKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0cmluZyBwYXRoc1xuICogYW5kIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3BhdGhLZXldIFRoZSBrZXkgcmVwcmVzZW50YXRpb24gb2YgcGF0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgsIHBhdGhLZXkpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwYXRoS2V5ICE9PSB1bmRlZmluZWQgJiYgcGF0aEtleSBpbiB0b09iamVjdChvYmplY3QpKSB7XG4gICAgcGF0aCA9IFtwYXRoS2V5XTtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiArK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0W3BhdGhbaW5kZXhdXTtcbiAgfVxuICByZXR1cm4gKGluZGV4ICYmIGluZGV4ID09IGxlbmd0aCkgPyBvYmplY3QgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHNvdXJjZSBwcm9wZXJ0eSBuYW1lcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgc291cmNlIHZhbHVlcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IHN0cmljdENvbXBhcmVGbGFncyBTdHJpY3QgY29tcGFyaXNvbiBmbGFncyBmb3Igc291cmNlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBvYmplY3RgIGlzIGEgbWF0Y2gsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTWF0Y2gob2JqZWN0LCBwcm9wcywgdmFsdWVzLCBzdHJpY3RDb21wYXJlRmxhZ3MsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBub0N1c3RvbWl6ZXIgPSAhY3VzdG9taXplcjtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmICgobm9DdXN0b21pemVyICYmIHN0cmljdENvbXBhcmVGbGFnc1tpbmRleF0pXG4gICAgICAgICAgPyB2YWx1ZXNbaW5kZXhdICE9PSBvYmplY3RbcHJvcHNbaW5kZXhdXVxuICAgICAgICAgIDogIShwcm9wc1tpbmRleF0gaW4gb2JqZWN0KVxuICAgICAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaW5kZXggPSAtMTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdLFxuICAgICAgICBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBzcmNWYWx1ZSA9IHZhbHVlc1tpbmRleF07XG5cbiAgICBpZiAobm9DdXN0b21pemVyICYmIHN0cmljdENvbXBhcmVGbGFnc1tpbmRleF0pIHtcbiAgICAgIHZhciByZXN1bHQgPSBvYmpWYWx1ZSAhPT0gdW5kZWZpbmVkIHx8IChrZXkgaW4gb2JqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXkpIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdCA9IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgY3VzdG9taXplciwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNgIHdoaWNoIGRvZXMgbm90IGNsb25lIGBzb3VyY2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzKHNvdXJjZSkge1xuICB2YXIgcHJvcHMgPSBrZXlzKHNvdXJjZSksXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgaWYgKCFsZW5ndGgpIHtcbiAgICByZXR1cm4gY29uc3RhbnQodHJ1ZSk7XG4gIH1cbiAgaWYgKGxlbmd0aCA9PSAxKSB7XG4gICAgdmFyIGtleSA9IHByb3BzWzBdLFxuICAgICAgICB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgaWYgKGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3Rba2V5XSA9PT0gdmFsdWUgJiYgKHZhbHVlICE9PSB1bmRlZmluZWQgfHwgKGtleSBpbiB0b09iamVjdChvYmplY3QpKSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuICB2YXIgdmFsdWVzID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHN0cmljdENvbXBhcmVGbGFncyA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdmFsdWUgPSBzb3VyY2VbcHJvcHNbbGVuZ3RoXV07XG4gICAgdmFsdWVzW2xlbmd0aF0gPSB2YWx1ZTtcbiAgICBzdHJpY3RDb21wYXJlRmxhZ3NbbGVuZ3RoXSA9IGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBiYXNlSXNNYXRjaCh0b09iamVjdChvYmplY3QpLCBwcm9wcywgdmFsdWVzLCBzdHJpY3RDb21wYXJlRmxhZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNQcm9wZXJ0eWAgd2hpY2ggZG9lcyBub3Qgd2hpY2ggZG9lc1xuICogbm90IGNsb25lIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzUHJvcGVydHkocGF0aCwgdmFsdWUpIHtcbiAgdmFyIGlzQXJyID0gaXNBcnJheShwYXRoKSxcbiAgICAgIGlzQ29tbW9uID0gaXNLZXkocGF0aCkgJiYgaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSxcbiAgICAgIHBhdGhLZXkgPSAocGF0aCArICcnKTtcblxuICBwYXRoID0gdG9QYXRoKHBhdGgpO1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBrZXkgPSBwYXRoS2V5O1xuICAgIG9iamVjdCA9IHRvT2JqZWN0KG9iamVjdCk7XG4gICAgaWYgKChpc0FyciB8fCAhaXNDb21tb24pICYmICEoa2V5IGluIG9iamVjdCkpIHtcbiAgICAgIG9iamVjdCA9IHBhdGgubGVuZ3RoID09IDEgPyBvYmplY3QgOiBiYXNlR2V0KG9iamVjdCwgYmFzZVNsaWNlKHBhdGgsIDAsIC0xKSk7XG4gICAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAga2V5ID0gbGFzdChwYXRoKTtcbiAgICAgIG9iamVjdCA9IHRvT2JqZWN0KG9iamVjdCk7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Rba2V5XSA9PT0gdmFsdWVcbiAgICAgID8gKHZhbHVlICE9PSB1bmRlZmluZWQgfHwgKGtleSBpbiBvYmplY3QpKVxuICAgICAgOiBiYXNlSXNFcXVhbCh2YWx1ZSwgb2JqZWN0W2tleV0sIG51bGwsIHRydWUpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVByb3BlcnR5YCB3aGljaCBzdXBwb3J0cyBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eURlZXAocGF0aCkge1xuICB2YXIgcGF0aEtleSA9IChwYXRoICsgJycpO1xuICBwYXRoID0gdG9QYXRoKHBhdGgpO1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIGJhc2VHZXQob2JqZWN0LCBwYXRoLCBwYXRoS2V5KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zbGljZWAgd2l0aG91dCBhbiBpdGVyYXRlZSBjYWxsIGd1YXJkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2xpY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBwb3NpdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kPWFycmF5Lmxlbmd0aF0gVGhlIGVuZCBwb3NpdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgc2xpY2Ugb2YgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVNsaWNlKGFycmF5LCBzdGFydCwgZW5kKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHN0YXJ0ID0gc3RhcnQgPT0gbnVsbCA/IDAgOiAoK3N0YXJ0IHx8IDApO1xuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAtc3RhcnQgPiBsZW5ndGggPyAwIDogKGxlbmd0aCArIHN0YXJ0KTtcbiAgfVxuICBlbmQgPSAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gbGVuZ3RoKSA/IGxlbmd0aCA6ICgrZW5kIHx8IDApO1xuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5ndGg7XG4gIH1cbiAgbGVuZ3RoID0gc3RhcnQgPiBlbmQgPyAwIDogKChlbmQgLSBzdGFydCkgPj4+IDApO1xuICBzdGFydCA+Pj49IDA7XG5cbiAgdmFyIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGFycmF5W2luZGV4ICsgc3RhcnRdO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lIGFuZCBub3QgYSBwcm9wZXJ0eSBwYXRoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXkodmFsdWUsIG9iamVjdCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgaWYgKCh0eXBlID09ICdzdHJpbmcnICYmIHJlSXNQbGFpblByb3AudGVzdCh2YWx1ZSkpIHx8IHR5cGUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSk7XG4gIHJldHVybiByZXN1bHQgfHwgKG9iamVjdCAhPSBudWxsICYmIHZhbHVlIGluIHRvT2JqZWN0KG9iamVjdCkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaWYgc3VpdGFibGUgZm9yIHN0cmljdFxuICogIGVxdWFsaXR5IGNvbXBhcmlzb25zLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlICYmICFpc09iamVjdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBvYmplY3QgaWYgaXQgaXMgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDogT2JqZWN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIHByb3BlcnR5IHBhdGggYXJyYXkgaWYgaXQgaXMgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gdG9QYXRoKHZhbHVlKSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGJhc2VUb1N0cmluZyh2YWx1ZSkucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IG9mIGBhcnJheWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ubGFzdChbMSwgMiwgM10pO1xuICogLy8gPT4gM1xuICovXG5mdW5jdGlvbiBsYXN0KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG4gIHJldHVybiBsZW5ndGggPyBhcnJheVtsZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHR5cGUgPT0gJ2Z1bmN0aW9uJyB8fCAoISF2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXR1cm4gZnJvbSB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKiB2YXIgZ2V0dGVyID0gXy5jb25zdGFudChvYmplY3QpO1xuICpcbiAqIGdldHRlcigpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGNvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgYXQgYHBhdGhgIG9uIGFcbiAqIGdpdmVuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBbXG4gKiAgIHsgJ2EnOiB7ICdiJzogeyAnYyc6IDIgfSB9IH0sXG4gKiAgIHsgJ2EnOiB7ICdiJzogeyAnYyc6IDEgfSB9IH1cbiAqIF07XG4gKlxuICogXy5tYXAob2JqZWN0cywgXy5wcm9wZXJ0eSgnYS5iLmMnKSk7XG4gKiAvLyA9PiBbMiwgMV1cbiAqXG4gKiBfLnBsdWNrKF8uc29ydEJ5KG9iamVjdHMsIF8ucHJvcGVydHkoWydhJywgJ2InLCAnYyddKSksICdhLmIuYycpO1xuICogLy8gPT4gWzEsIDJdXG4gKi9cbmZ1bmN0aW9uIHByb3BlcnR5KHBhdGgpIHtcbiAgcmV0dXJuIGlzS2V5KHBhdGgpID8gYmFzZVByb3BlcnR5KHBhdGgpIDogYmFzZVByb3BlcnR5RGVlcChwYXRoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ2FsbGJhY2s7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuNSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc3R5cGVkYXJyYXknKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnbG9kYXNoLmtleXMnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYHRoaXNgIGJpbmRpbmdcbiAqIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3IgaWRlbnRpY2FsIHZhbHVlcy5cbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciB2YWxUeXBlID0gdHlwZW9mIHZhbHVlLFxuICAgICAgb3RoVHlwZSA9IHR5cGVvZiBvdGhlcjtcblxuICAvLyBFeGl0IGVhcmx5IGZvciB1bmxpa2UgcHJpbWl0aXZlIHZhbHVlcy5cbiAgaWYgKCh2YWxUeXBlICE9ICdmdW5jdGlvbicgJiYgdmFsVHlwZSAhPSAnb2JqZWN0JyAmJiBvdGhUeXBlICE9ICdmdW5jdGlvbicgJiYgb3RoVHlwZSAhPSAnb2JqZWN0JykgfHxcbiAgICAgIHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCkge1xuICAgIC8vIFJldHVybiBgZmFsc2VgIHVubGVzcyBib3RoIHZhbHVlcyBhcmUgYE5hTmAuXG4gICAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJhc2VJc0VxdWFsLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIG9iamVjdHMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWxEZWVwKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgb3RoSXNBcnIgPSBpc0FycmF5KG90aGVyKSxcbiAgICAgIG9ialRhZyA9IGFycmF5VGFnLFxuICAgICAgb3RoVGFnID0gYXJyYXlUYWc7XG5cbiAgaWYgKCFvYmpJc0Fycikge1xuICAgIG9ialRhZyA9IG9ialRvU3RyaW5nLmNhbGwob2JqZWN0KTtcbiAgICBpZiAob2JqVGFnID09IGFyZ3NUYWcpIHtcbiAgICAgIG9ialRhZyA9IG9iamVjdFRhZztcbiAgICB9IGVsc2UgaWYgKG9ialRhZyAhPSBvYmplY3RUYWcpIHtcbiAgICAgIG9iaklzQXJyID0gaXNUeXBlZEFycmF5KG9iamVjdCk7XG4gICAgfVxuICB9XG4gIGlmICghb3RoSXNBcnIpIHtcbiAgICBvdGhUYWcgPSBvYmpUb1N0cmluZy5jYWxsKG90aGVyKTtcbiAgICBpZiAob3RoVGFnID09IGFyZ3NUYWcpIHtcbiAgICAgIG90aFRhZyA9IG9iamVjdFRhZztcbiAgICB9IGVsc2UgaWYgKG90aFRhZyAhPSBvYmplY3RUYWcpIHtcbiAgICAgIG90aElzQXJyID0gaXNUeXBlZEFycmF5KG90aGVyKTtcbiAgICB9XG4gIH1cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiAhKG9iaklzQXJyIHx8IG9iaklzT2JqKSkge1xuICAgIHJldHVybiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIG9ialRhZyk7XG4gIH1cbiAgaWYgKCFpc0xvb3NlKSB7XG4gICAgdmFyIHZhbFdyYXBwZWQgPSBvYmpJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ19fd3JhcHBlZF9fJyksXG4gICAgICAgIG90aFdyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgIGlmICh2YWxXcmFwcGVkIHx8IG90aFdyYXBwZWQpIHtcbiAgICAgIHJldHVybiBlcXVhbEZ1bmModmFsV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LCBvdGhXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgfVxuICB9XG4gIGlmICghaXNTYW1lVGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gZGV0ZWN0aW5nIGNpcmN1bGFyIHJlZmVyZW5jZXMgc2VlIGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jSk8uXG4gIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICBzdGFja0IgfHwgKHN0YWNrQiA9IFtdKTtcblxuICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IG9iamVjdCkge1xuICAgICAgcmV0dXJuIHN0YWNrQltsZW5ndGhdID09IG90aGVyO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgYG9iamVjdGAgYW5kIGBvdGhlcmAgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICBzdGFja0EucHVzaChvYmplY3QpO1xuICBzdGFja0IucHVzaChvdGhlcik7XG5cbiAgdmFyIHJlc3VsdCA9IChvYmpJc0FyciA/IGVxdWFsQXJyYXlzIDogZXF1YWxPYmplY3RzKShvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcblxuICBzdGFja0EucG9wKCk7XG4gIHN0YWNrQi5wb3AoKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBhcnJheXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGgsXG4gICAgICByZXN1bHQgPSB0cnVlO1xuXG4gIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNMb29zZSAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gIHdoaWxlIChyZXN1bHQgJiYgKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF07XG5cbiAgICByZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHJlc3VsdCA9IGlzTG9vc2VcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgpXG4gICAgICAgIDogY3VzdG9taXplcihhcnJWYWx1ZSwgb3RoVmFsdWUsIGluZGV4KTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgaWYgKGlzTG9vc2UpIHtcbiAgICAgICAgdmFyIG90aEluZGV4ID0gb3RoTGVuZ3RoO1xuICAgICAgICB3aGlsZSAob3RoSW5kZXgtLSkge1xuICAgICAgICAgIG90aFZhbHVlID0gb3RoZXJbb3RoSW5kZXhdO1xuICAgICAgICAgIHJlc3VsdCA9IChhcnJWYWx1ZSAmJiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IChhcnJWYWx1ZSAmJiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuICEhcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIC8vIENvZXJjZSBkYXRlcyBhbmQgYm9vbGVhbnMgdG8gbnVtYmVycywgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzIGFuZCBib29sZWFuc1xuICAgICAgLy8gdG8gYDFgIG9yIGAwYCB0cmVhdGluZyBpbnZhbGlkIGRhdGVzIGNvZXJjZWQgdG8gYE5hTmAgYXMgbm90IGVxdWFsLlxuICAgICAgcmV0dXJuICtvYmplY3QgPT0gK290aGVyO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIFRyZWF0IGBOYU5gIHZzLiBgTmFOYCBhcyBlcXVhbC5cbiAgICAgIHJldHVybiAob2JqZWN0ICE9ICtvYmplY3QpXG4gICAgICAgID8gb3RoZXIgIT0gK290aGVyXG4gICAgICAgIDogb2JqZWN0ID09ICtvdGhlcjtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncyBwcmltaXRpdmVzIGFuZCBzdHJpbmdcbiAgICAgIC8vIG9iamVjdHMgYXMgZXF1YWwuIFNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI3gxNS4xMC42LjQgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNMb29zZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBvYmpQcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgIG90aFByb3BzID0ga2V5cyhvdGhlciksXG4gICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzTG9vc2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHNraXBDdG9yID0gaXNMb29zZSxcbiAgICAgIGluZGV4ID0gLTE7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdLFxuICAgICAgICByZXN1bHQgPSBpc0xvb3NlID8ga2V5IGluIG90aGVyIDogaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KTtcblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgcmVzdWx0ID0gaXNMb29zZVxuICAgICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSlcbiAgICAgICAgICA6IGN1c3RvbWl6ZXIob2JqVmFsdWUsIG90aFZhbHVlLCBrZXkpO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgICByZXN1bHQgPSAob2JqVmFsdWUgJiYgb2JqVmFsdWUgPT09IG90aFZhbHVlKSB8fCBlcXVhbEZ1bmMob2JqVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAoIXNraXBDdG9yKSB7XG4gICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIG90aEN0b3IgPSBvdGhlci5jb25zdHJ1Y3RvcjtcblxuICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgKCdjb25zdHJ1Y3RvcicgaW4gb2JqZWN0ICYmICdjb25zdHJ1Y3RvcicgaW4gb3RoZXIpICYmXG4gICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPSB0eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID1cbnR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID1cbnR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzZXRUYWddID1cbnR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4zIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yRWFjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdHxzdHJpbmd9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICovXG52YXIgYmFzZUVhY2ggPSBjcmVhdGVCYXNlRWFjaChiYXNlRm9yT3duKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBiYXNlRWFjaGAgb3IgYGJhc2VFYWNoUmlnaHRgIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlYWNoRnVuYyBUaGUgZnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIGEgY29sbGVjdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUVhY2goZWFjaEZ1bmMsIGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24oY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbiA/IGdldExlbmd0aChjb2xsZWN0aW9uKSA6IDA7XG4gICAgaWYgKCFpc0xlbmd0aChsZW5ndGgpKSB7XG4gICAgICByZXR1cm4gZWFjaEZ1bmMoY29sbGVjdGlvbiwgaXRlcmF0ZWUpO1xuICAgIH1cbiAgICB2YXIgaW5kZXggPSBmcm9tUmlnaHQgPyBsZW5ndGggOiAtMSxcbiAgICAgICAgaXRlcmFibGUgPSB0b09iamVjdChjb2xsZWN0aW9uKTtcblxuICAgIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVbaW5kZXhdLCBpbmRleCwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGJhc2UgZnVuY3Rpb24gZm9yIGBfLmZvckluYCBvciBgXy5mb3JJblJpZ2h0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICB2YXIgaXRlcmFibGUgPSB0b09iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgICAgaW5kZXggPSBmcm9tUmlnaHQgPyBsZW5ndGggOiAtMTtcblxuICAgIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIGluIFNhZmFyaSBvbiBpT1MgOC4xIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIG9iamVjdCBpZiBpdCBpcyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID8gdmFsdWUgOiBPYmplY3QodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICghIXZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VFYWNoO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kYCwgYF8uZmluZExhc3RgLCBgXy5maW5kS2V5YCwgYW5kIGBfLmZpbmRMYXN0S2V5YCxcbiAqIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2sgc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcsIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBjb2xsZWN0aW9uYCB1c2luZyB0aGUgcHJvdmlkZWQgYGVhY2hGdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBgY29sbGVjdGlvbmAuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXRLZXldIFNwZWNpZnkgcmV0dXJuaW5nIHRoZSBrZXkgb2YgdGhlIGZvdW5kIGVsZW1lbnRcbiAqICBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmb3VuZCBlbGVtZW50IG9yIGl0cyBrZXksIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgZWFjaEZ1bmMsIHJldEtleSkge1xuICB2YXIgcmVzdWx0O1xuICBlYWNoRnVuYyhjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSkge1xuICAgICAgcmVzdWx0ID0gcmV0S2V5ID8ga2V5IDogdmFsdWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRmluZDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMi4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUNhbGxiYWNrID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlY2FsbGJhY2snKSxcbiAgICBiYXNlRmluZEluZGV4ID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlZmluZGluZGV4JyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FycmF5Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBfLmZpbmRJbmRleGAgb3IgYF8uZmluZExhc3RJbmRleGAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZmluZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRmluZEluZGV4KGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJyYXksIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgIGlmICghKGFycmF5ICYmIGFycmF5Lmxlbmd0aCkpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgcHJlZGljYXRlID0gYmFzZUNhbGxiYWNrKHByZWRpY2F0ZSwgdGhpc0FyZywgMyk7XG4gICAgcmV0dXJuIGJhc2VGaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgZnJvbVJpZ2h0KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmZpbmRgIGV4Y2VwdCB0aGF0IGl0IHJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdFxuICogZWxlbWVudCBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IgaW5zdGVhZCBvZiB0aGUgZWxlbWVudCBpdHNlbGYuXG4gKlxuICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBgXy5wcm9wZXJ0eWBcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIElmIGEgdmFsdWUgaXMgYWxzbyBwcm92aWRlZCBmb3IgYHRoaXNBcmdgIHRoZSBjcmVhdGVkIGBfLm1hdGNoZXNQcm9wZXJ0eWBcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgYSBtYXRjaGluZyBwcm9wZXJ0eVxuICogdmFsdWUsIGVsc2UgYGZhbHNlYC5cbiAqXG4gKiBJZiBhbiBvYmplY3QgaXMgcHJvdmlkZWQgZm9yIGBwcmVkaWNhdGVgIHRoZSBjcmVhdGVkIGBfLm1hdGNoZXNgIHN0eWxlXG4gKiBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlblxuICogb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fHN0cmluZ30gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZFxuICogIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYHByZWRpY2F0ZWAuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZm91bmQgZWxlbWVudCwgZWxzZSBgLTFgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhY3RpdmUnOiBmYWxzZSB9LFxuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgeyAndXNlcic6ICdwZWJibGVzJywgJ2FjdGl2ZSc6IHRydWUgfVxuICogXTtcbiAqXG4gKiBfLmZpbmRJbmRleCh1c2VycywgZnVuY3Rpb24oY2hyKSB7XG4gKiAgIHJldHVybiBjaHIudXNlciA9PSAnYmFybmV5JztcbiAqIH0pO1xuICogLy8gPT4gMFxuICpcbiAqIC8vIHVzaW5nIHRoZSBgXy5tYXRjaGVzYCBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8uZmluZEluZGV4KHVzZXJzLCB7ICd1c2VyJzogJ2ZyZWQnLCAnYWN0aXZlJzogZmFsc2UgfSk7XG4gKiAvLyA9PiAxXG4gKlxuICogLy8gdXNpbmcgdGhlIGBfLm1hdGNoZXNQcm9wZXJ0eWAgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLmZpbmRJbmRleCh1c2VycywgJ2FjdGl2ZScsIGZhbHNlKTtcbiAqIC8vID0+IDBcbiAqXG4gKiAvLyB1c2luZyB0aGUgYF8ucHJvcGVydHlgIGNhbGxiYWNrIHNob3J0aGFuZFxuICogXy5maW5kSW5kZXgodXNlcnMsICdhY3RpdmUnKTtcbiAqIC8vID0+IDJcbiAqL1xudmFyIGZpbmRJbmRleCA9IGNyZWF0ZUZpbmRJbmRleCgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbmRJbmRleDtcbiIsIi8qKlxuICogbG9kYXNoIDMuNi4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmluZEluZGV4YCBhbmQgYF8uZmluZExhc3RJbmRleGAgd2l0aG91dFxuICogc3VwcG9ydCBmb3IgY2FsbGJhY2sgc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlLCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbVJpZ2h0ID8gbGVuZ3RoIDogLTE7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZpbmRJbmRleDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmVmb3JlID0gcmVxdWlyZSgnbG9kYXNoLmJlZm9yZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGlzIHJlc3RyaWN0ZWQgdG8gaW52b2tpbmcgYGZ1bmNgIG9uY2UuIFJlcGVhdCBjYWxsc1xuICogdG8gdGhlIGZ1bmN0aW9uIHJldHVybiB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGNhbGwuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIGNyZWF0ZWQgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEB0eXBlIEZ1bmN0aW9uXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgcmVzdHJpY3RlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGluaXRpYWxpemUgPSBfLm9uY2UoY3JlYXRlQXBwbGljYXRpb24pO1xuICogaW5pdGlhbGl6ZSgpO1xuICogaW5pdGlhbGl6ZSgpO1xuICogLy8gYGluaXRpYWxpemVgIGludm9rZXMgYGNyZWF0ZUFwcGxpY2F0aW9uYCBvbmNlXG4gKi9cbmZ1bmN0aW9uIG9uY2UoZnVuYykge1xuICByZXR1cm4gYmVmb3JlKGZ1bmMsIDIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9uY2U7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMiAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCwgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgYW5kIGFyZ3VtZW50c1xuICogb2YgdGhlIGNyZWF0ZWQgZnVuY3Rpb24sIHdoaWxlIGl0IGlzIGNhbGxlZCBsZXNzIHRoYW4gYG5gIHRpbWVzLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgY3JlYXRlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2AgaW52b2NhdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGNhbGxzIGF0IHdoaWNoIGBmdW5jYCBpcyBubyBsb25nZXIgaW52b2tlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgcmVzdHJpY3RlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogalF1ZXJ5KCcjYWRkJykub24oJ2NsaWNrJywgXy5iZWZvcmUoNSwgYWRkQ29udGFjdFRvTGlzdCkpO1xuICogLy8gPT4gYWxsb3dzIGFkZGluZyB1cCB0byA0IGNvbnRhY3RzIHRvIHRoZSBsaXN0XG4gKi9cbmZ1bmN0aW9uIGJlZm9yZShuLCBmdW5jKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKHR5cGVvZiBuID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciB0ZW1wID0gbjtcbiAgICAgIG4gPSBmdW5jO1xuICAgICAgZnVuYyA9IHRlbXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGlmICgtLW4gPiAwKSB7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIGlmIChuIDw9IDEpIHtcbiAgICAgIGZ1bmMgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJlZm9yZTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2xvZGFzaC5pc2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIHZhbHVlIG9mIHByb3BlcnR5IGBrZXlgIG9uIGBvYmplY3RgLiBJZiB0aGUgdmFsdWUgb2YgYGtleWAgaXNcbiAqIGEgZnVuY3Rpb24gaXQgaXMgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgb2JqZWN0YCBhbmQgaXRzIHJlc3VsdFxuICogaXMgcmV0dXJuZWQsIGVsc2UgdGhlIHByb3BlcnR5IHZhbHVlIGlzIHJldHVybmVkLiBJZiB0aGUgcHJvcGVydHkgdmFsdWUgaXNcbiAqIGB1bmRlZmluZWRgIHRoZSBgZGVmYXVsdFZhbHVlYCBpcyB1c2VkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byByZXNvbHZlLlxuICogQHBhcmFtIHsqfSBbZGVmYXVsdFZhbHVlXSBUaGUgdmFsdWUgcmV0dXJuZWQgaWYgdGhlIHByb3BlcnR5IHZhbHVlXG4gKiAgcmVzb2x2ZXMgdG8gYHVuZGVmaW5lZGAuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogXy5jb25zdGFudCg0MCkgfTtcbiAqXG4gKiBfLnJlc3VsdChvYmplY3QsICd1c2VyJyk7XG4gKiAvLyA9PiAnZnJlZCdcbiAqXG4gKiBfLnJlc3VsdChvYmplY3QsICdhZ2UnKTtcbiAqIC8vID0+IDQwXG4gKlxuICogXy5yZXN1bHQob2JqZWN0LCAnc3RhdHVzJywgJ2J1c3knKTtcbiAqIC8vID0+ICdidXN5J1xuICpcbiAqIF8ucmVzdWx0KG9iamVjdCwgJ3N0YXR1cycsIF8uY29uc3RhbnQoJ2J1c3knKSk7XG4gKiAvLyA9PiAnYnVzeSdcbiAqL1xuZnVuY3Rpb24gcmVzdWx0KG9iamVjdCwga2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJykge1xuICAgIHZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICB9XG4gIHJldHVybiBpc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlLmNhbGwob2JqZWN0KSA6IHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3VsdDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4zIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIFtzcGVjaWFsIGNoYXJhY3RlcnNdKGh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL2NoYXJhY3RlcnMuaHRtbCNzcGVjaWFsKS5cbiAqIEluIGFkZGl0aW9uIHRvIHNwZWNpYWwgY2hhcmFjdGVycyB0aGUgZm9yd2FyZCBzbGFzaCBpcyBlc2NhcGVkIHRvIGFsbG93IGZvclxuICogZWFzaWVyIGBldmFsYCB1c2UgYW5kIGBGdW5jdGlvbmAgY29tcGlsYXRpb24uXG4gKi9cbnZhciByZVJlZ0V4cENoYXJzID0gL1suKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhcnMgPSBSZWdFeHAocmVSZWdFeHBDaGFycy5zb3VyY2UpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNGdW5jdGlvbmAgd2l0aG91dCBzdXBwb3J0IGZvciBlbnZpcm9ubWVudHNcbiAqIHdpdGggaW5jb3JyZWN0IGB0eXBlb2ZgIHJlc3VsdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBDaGFrcmEgSklUIGJ1ZyBpbiBjb21wYXRpYmlsaXR5IG1vZGVzIG9mIElFIDExLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlL2lzc3Vlcy8xNjIxIGZvciBtb3JlIGRldGFpbHMuXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIFVpbnQ4QXJyYXkgPSBpc05hdGl2ZShVaW50OEFycmF5ID0gZ2xvYmFsLlVpbnQ4QXJyYXkpICYmIFVpbnQ4QXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0Z1bmN0aW9uID0gIShiYXNlSXNGdW5jdGlvbigveC8pIHx8IChVaW50OEFycmF5ICYmICFiYXNlSXNGdW5jdGlvbihVaW50OEFycmF5KSkpID8gYmFzZUlzRnVuY3Rpb24gOiBmdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gb2xkZXIgdmVyc2lvbnMgb2YgQ2hyb21lIGFuZCBTYWZhcmkgd2hpY2ggcmV0dXJuICdmdW5jdGlvbicgZm9yIHJlZ2V4ZXNcbiAgLy8gYW5kIFNhZmFyaSA4IGVxdWl2YWxlbnRzIHdoaWNoIHJldHVybiAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgY29uc3RydWN0b3JzLlxuICByZXR1cm4gb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZztcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZykge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiL1wiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsXG4gKiBcIipcIiwgXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczpcXC9cXC9sb2Rhc2hcXC5jb21cXC9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUNhbGxiYWNrID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlY2FsbGJhY2snKSxcbiAgICBiYXNlVW5pcSA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZXVuaXEnKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJ2xvZGFzaC5faXNpdGVyYXRlZWNhbGwnKTtcblxuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmlxYCBvcHRpbWl6ZWQgZm9yIHNvcnRlZCBhcnJheXMgd2l0aG91dCBzdXBwb3J0XG4gKiBmb3IgY2FsbGJhY2sgc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlLXZhbHVlLWZyZWUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHNvcnRlZFVuaXEoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBzZWVuLFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc0luZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgYXJyYXkpIDogdmFsdWU7XG5cbiAgICBpZiAoIWluZGV4IHx8IHNlZW4gIT09IGNvbXB1dGVkKSB7XG4gICAgICBzZWVuID0gY29tcHV0ZWQ7XG4gICAgICByZXN1bHRbKytyZXNJbmRleF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZHVwbGljYXRlLXZhbHVlLWZyZWUgdmVyc2lvbiBvZiBhbiBhcnJheSB1c2luZyBgU2FtZVZhbHVlWmVyb2BcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy4gUHJvdmlkaW5nIGB0cnVlYCBmb3IgYGlzU29ydGVkYCBwZXJmb3JtcyBhIGZhc3RlclxuICogc2VhcmNoIGFsZ29yaXRobSBmb3Igc29ydGVkIGFycmF5cy4gSWYgYW4gaXRlcmF0ZWUgZnVuY3Rpb24gaXMgcHJvdmlkZWQgaXRcbiAqIGlzIGludm9rZWQgZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGFycmF5IHRvIGdlbmVyYXRlIHRoZSBjcml0ZXJpb24gYnkgd2hpY2hcbiAqIHVuaXF1ZW5lc3MgaXMgY29tcHV0ZWQuIFRoZSBgaXRlcmF0ZWVgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZFxuICogd2l0aCB0aHJlZSBhcmd1bWVudHM7ICh2YWx1ZSwgaW5kZXgsIGFycmF5KS5cbiAqXG4gKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcHJvdmlkZWQgZm9yIGBwcmVkaWNhdGVgIHRoZSBjcmVhdGVkIFwiXy5wcm9wZXJ0eVwiXG4gKiBzdHlsZSBjYWxsYmFjayByZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqXG4gKiBJZiBhbiBvYmplY3QgaXMgcHJvdmlkZWQgZm9yIGBwcmVkaWNhdGVgIHRoZSBjcmVhdGVkIFwiXy5tYXRjaGVzXCIgc3R5bGVcbiAqIGNhbGxiYWNrIHJldHVybnMgYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGdpdmVuXG4gKiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqXG4gKiAqKk5vdGU6KiogYFNhbWVWYWx1ZVplcm9gIGNvbXBhcmlzb25zIGFyZSBsaWtlIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucyxcbiAqIGUuZy4gYD09PWAsIGV4Y2VwdCB0aGF0IGBOYU5gIG1hdGNoZXMgYE5hTmAuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyB1bmlxdWVcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1NvcnRlZF0gU3BlY2lmeSB0aGUgYXJyYXkgaXMgc29ydGVkLlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8c3RyaW5nfSBbaXRlcmF0ZWVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiAgSWYgYSBwcm9wZXJ0eSBuYW1lIG9yIG9iamVjdCBpcyBwcm92aWRlZCBpdCBpcyB1c2VkIHRvIGNyZWF0ZSBhIFwiXy5wcm9wZXJ0eVwiXG4gKiAgb3IgXCJfLm1hdGNoZXNcIiBzdHlsZSBjYWxsYmFjayByZXNwZWN0aXZlbHkuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGl0ZXJhdGVlYC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZS12YWx1ZS1mcmVlIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnVuaXEoWzEsIDIsIDFdKTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIHVzaW5nIGBpc1NvcnRlZGBcbiAqIF8udW5pcShbMSwgMSwgMl0sIHRydWUpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gdXNpbmcgYW4gaXRlcmF0ZWUgZnVuY3Rpb25cbiAqIF8udW5pcShbMSwgMi41LCAxLjUsIDJdLCBmdW5jdGlvbihuKSB7IHJldHVybiB0aGlzLmZsb29yKG4pOyB9LCBNYXRoKTtcbiAqIC8vID0+IFsxLCAyLjVdXG4gKlxuICogLy8gdXNpbmcgdGhlIFwiXy5wcm9wZXJ0eVwiIGNhbGxiYWNrIHNob3J0aGFuZFxuICogXy51bmlxKFt7ICd4JzogMSB9LCB7ICd4JzogMiB9LCB7ICd4JzogMSB9XSwgJ3gnKTtcbiAqIC8vID0+IFt7ICd4JzogMSB9LCB7ICd4JzogMiB9XVxuICovXG5mdW5jdGlvbiB1bmlxKGFycmF5LCBpc1NvcnRlZCwgaXRlcmF0ZWUsIHRoaXNBcmcpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgLy8gSnVnZ2xlIGFyZ3VtZW50cy5cbiAgaWYgKHR5cGVvZiBpc1NvcnRlZCAhPSAnYm9vbGVhbicgJiYgaXNTb3J0ZWQgIT0gbnVsbCkge1xuICAgIHRoaXNBcmcgPSBpdGVyYXRlZTtcbiAgICBpdGVyYXRlZSA9IGlzSXRlcmF0ZWVDYWxsKGFycmF5LCBpc1NvcnRlZCwgdGhpc0FyZykgPyBudWxsIDogaXNTb3J0ZWQ7XG4gICAgaXNTb3J0ZWQgPSBmYWxzZTtcbiAgfVxuICBpdGVyYXRlZSA9IGl0ZXJhdGVlID09IG51bGwgPyBpdGVyYXRlZSA6IGJhc2VDYWxsYmFjayhpdGVyYXRlZSwgdGhpc0FyZywgMyk7XG4gIHJldHVybiAoaXNTb3J0ZWQpXG4gICAgPyBzb3J0ZWRVbmlxKGFycmF5LCBpdGVyYXRlZSlcbiAgICA6IGJhc2VVbmlxKGFycmF5LCBpdGVyYXRlZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdW5pcTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUluZGV4T2YgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VpbmRleG9mJyksXG4gICAgY2FjaGVJbmRleE9mID0gcmVxdWlyZSgnbG9kYXNoLl9jYWNoZWluZGV4b2YnKSxcbiAgICBjcmVhdGVDYWNoZSA9IHJlcXVpcmUoJ2xvZGFzaC5fY3JlYXRlY2FjaGUnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmlxYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrIHNob3J0aGFuZHNcbiAqIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUtdmFsdWUtZnJlZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuaXEoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5kZXhPZiA9IGJhc2VJbmRleE9mLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaXNDb21tb24gPSB0cnVlLFxuICAgICAgaXNMYXJnZSA9IGlzQ29tbW9uICYmIGxlbmd0aCA+PSAyMDAsXG4gICAgICBzZWVuID0gaXNMYXJnZSA/IGNyZWF0ZUNhY2hlKCkgOiBudWxsLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgaWYgKHNlZW4pIHtcbiAgICBpbmRleE9mID0gY2FjaGVJbmRleE9mO1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgaXNMYXJnZSA9IGZhbHNlO1xuICAgIHNlZW4gPSBpdGVyYXRlZSA/IFtdIDogcmVzdWx0O1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgYXJyYXkpIDogdmFsdWU7XG5cbiAgICBpZiAoaXNDb21tb24gJiYgdmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICB2YXIgc2VlbkluZGV4ID0gc2Vlbi5sZW5ndGg7XG4gICAgICB3aGlsZSAoc2VlbkluZGV4LS0pIHtcbiAgICAgICAgaWYgKHNlZW5bc2VlbkluZGV4XSA9PT0gY29tcHV0ZWQpIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGl0ZXJhdGVlKSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGluZGV4T2Yoc2VlbiwgY29tcHV0ZWQsIDApIDwgMCkge1xuICAgICAgaWYgKGl0ZXJhdGVlIHx8IGlzTGFyZ2UpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVW5pcTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMS4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaW5kZXhPZmAgd2l0aG91dCBzdXBwb3J0IGZvciBiaW5hcnkgc2VhcmNoZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICBpZiAodmFsdWUgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIGluZGV4T2ZOYU4oYXJyYXksIGZyb21JbmRleCk7XG4gIH1cbiAgdmFyIGluZGV4ID0gZnJvbUluZGV4IC0gMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBgTmFOYCBpcyBmb3VuZCBpbiBgYXJyYXlgLlxuICogSWYgYGZyb21SaWdodGAgaXMgcHJvdmlkZWQgZWxlbWVudHMgb2YgYGFycmF5YCBhcmUgaXRlcmF0ZWQgZnJvbSByaWdodCB0byBsZWZ0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIGBOYU5gLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGluZGV4T2ZOYU4oYXJyYXksIGZyb21JbmRleCwgZnJvbVJpZ2h0KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IGZyb21JbmRleCArIChmcm9tUmlnaHQgPyAwIDogLTEpO1xuXG4gIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgdmFyIG90aGVyID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmIChvdGhlciAhPT0gb3RoZXIpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJbmRleE9mO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiBgY2FjaGVgIG1pbWlja2luZyB0aGUgcmV0dXJuIHNpZ25hdHVyZSBvZlxuICogYF8uaW5kZXhPZmAgYnkgcmV0dXJuaW5nIGAwYCBpZiB0aGUgdmFsdWUgaXMgZm91bmQsIGVsc2UgYC0xYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBzZWFyY2guXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgMGAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBjYWNoZUluZGV4T2YoY2FjaGUsIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gY2FjaGUuZGF0YSxcbiAgICAgIHJlc3VsdCA9ICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNPYmplY3QodmFsdWUpKSA/IGRhdGEuc2V0Lmhhcyh2YWx1ZSkgOiBkYXRhLmhhc2hbdmFsdWVdO1xuXG4gIHJldHVybiByZXN1bHQgPyAwIDogLTE7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKCEhdmFsdWUgJiYgdHlwZSA9PSAnb2JqZWN0Jyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FjaGVJbmRleE9mO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJ2xvZGFzaC5pc25hdGl2ZScpO1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIFNldCA9IGlzTmF0aXZlKFNldCA9IGdsb2JhbC5TZXQpICYmIFNldDtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVDcmVhdGUgPSBpc05hdGl2ZShuYXRpdmVDcmVhdGUgPSBPYmplY3QuY3JlYXRlKSAmJiBuYXRpdmVDcmVhdGU7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmRhdGEgPSB7ICdoYXNoJzogbmF0aXZlQ3JlYXRlKG51bGwpLCAnc2V0JzogbmV3IFNldCB9O1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICB0aGlzLnB1c2godmFsdWVzW2xlbmd0aF0pO1xuICB9XG59XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgcHVzaFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gY2FjaGVQdXNoKHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5kYXRhO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIGRhdGEuc2V0LmFkZCh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YS5oYXNoW3ZhbHVlXSA9IHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgYFNldGAgY2FjaGUgb2JqZWN0IHRvIG9wdGltaXplIGxpbmVhciBzZWFyY2hlcyBvZiBsYXJnZSBhcnJheXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7bnVsbHxPYmplY3R9IFJldHVybnMgdGhlIG5ldyBjYWNoZSBvYmplY3QgaWYgYFNldGAgaXMgc3VwcG9ydGVkLCBlbHNlIGBudWxsYC5cbiAqL1xudmFyIGNyZWF0ZUNhY2hlID0gIShuYXRpdmVDcmVhdGUgJiYgU2V0KSA/IGNvbnN0YW50KG51bGwpIDogZnVuY3Rpb24odmFsdWVzKSB7XG4gIHJldHVybiBuZXcgU2V0Q2FjaGUodmFsdWVzKTtcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKCEhdmFsdWUgJiYgdHlwZSA9PSAnb2JqZWN0Jyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIGZyb20gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICogdmFyIGdldHRlciA9IF8uY29uc3RhbnQob2JqZWN0KTtcbiAqXG4gKiBnZXR0ZXIoKSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG4vLyBBZGQgZnVuY3Rpb25zIHRvIHRoZSBgU2V0YCBjYWNoZS5cblNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gY2FjaGVQdXNoO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUNhY2hlO1xuIiwiLy9UaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IGJpbi9ob29rLmpzXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHsgJ21lZGlhX2NvbnRyb2wnOiB0ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtYmFja2dyb3VuZFwiIGRhdGEtYmFja2dyb3VuZD48L2Rpdj48ZGl2IGNsYXNzPVwibWVkaWEtY29udHJvbC1sYXllclwiIGRhdGEtY29udHJvbHM+PCUgdmFyIHJlbmRlckJhcj1mdW5jdGlvbihuYW1lKSB7ICU+PGRpdiBjbGFzcz1cImJhci1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJiYXItYmFja2dyb3VuZFwiIGRhdGEtPCU9IG5hbWUgJT4+PGRpdiBjbGFzcz1cImJhci1maWxsLTFcIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjxkaXYgY2xhc3M9XCJiYXItZmlsbC0yXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48ZGl2IGNsYXNzPVwiYmFyLWhvdmVyXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiYmFyLXNjcnViYmVyXCIgZGF0YS08JT0gbmFtZSAlPj48ZGl2IGNsYXNzPVwiYmFyLXNjcnViYmVyLWljb25cIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjwvZGl2PjwvZGl2PjwlIH07ICU+PCUgdmFyIHJlbmRlclNlZ21lbnRlZEJhcj1mdW5jdGlvbihuYW1lLCBzZWdtZW50cykgeyBzZWdtZW50cz1zZWdtZW50cyB8fCAxMDsgJT48ZGl2IGNsYXNzPVwiYmFyLWNvbnRhaW5lclwiIGRhdGEtPCU9IG5hbWUgJT4+PCUgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50czsgaSsrKSB7ICU+PGRpdiBjbGFzcz1cInNlZ21lbnRlZC1iYXItZWxlbWVudFwiIGRhdGEtPCU9IG5hbWUgJT4+PC9kaXY+PCUgfSAlPjwvZGl2PjwlIH07ICU+PCUgdmFyIHJlbmRlckRyYXdlcj1mdW5jdGlvbihuYW1lLCByZW5kZXJDb250ZW50KSB7ICU+PGRpdiBjbGFzcz1cImRyYXdlci1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJkcmF3ZXItaWNvbi1jb250YWluZXJcIiBkYXRhLTwlPSBuYW1lICU+PjxkaXYgY2xhc3M9XCJkcmF3ZXItaWNvbiBtZWRpYS1jb250cm9sLWljb25cIiBkYXRhLTwlPSBuYW1lICU+PjwvZGl2PjxzcGFuIGNsYXNzPVwiZHJhd2VyLXRleHRcIiBkYXRhLTwlPSBuYW1lICU+Pjwvc3Bhbj48L2Rpdj48JSByZW5kZXJDb250ZW50KG5hbWUpOyAlPjwvZGl2PjwlIH07ICU+PCUgdmFyIHJlbmRlckluZGljYXRvcj1mdW5jdGlvbihuYW1lKSB7ICU+PGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yXCIgZGF0YS08JT0gbmFtZSAlPj48L2Rpdj48JSB9OyAlPjwlIHZhciByZW5kZXJCdXR0b249ZnVuY3Rpb24obmFtZSkgeyAlPjxidXR0b24gY2xhc3M9XCJtZWRpYS1jb250cm9sLWJ1dHRvbiBtZWRpYS1jb250cm9sLWljb25cIiBkYXRhLTwlPSBuYW1lICU+PjwvYnV0dG9uPjwlIH07ICU+PCUgdmFyIHRlbXBsYXRlcz17IGJhcjogcmVuZGVyQmFyLCBzZWdtZW50ZWRCYXI6IHJlbmRlclNlZ21lbnRlZEJhciwgfTsgdmFyIHJlbmRlcj1mdW5jdGlvbihzZXR0aW5nc0xpc3QpIHsgc2V0dGluZ3NMaXN0LmZvckVhY2goZnVuY3Rpb24oc2V0dGluZykgeyBpZihzZXR0aW5nID09PSBcInNlZWtiYXJcIikgeyByZW5kZXJCYXIoc2V0dGluZyk7IH0gZWxzZSBpZiAoc2V0dGluZyA9PT0gXCJ2b2x1bWVcIikgeyByZW5kZXJEcmF3ZXIoc2V0dGluZywgc2V0dGluZ3Mudm9sdW1lQmFyVGVtcGxhdGUgPyB0ZW1wbGF0ZXNbc2V0dGluZ3Mudm9sdW1lQmFyVGVtcGxhdGVdIDogZnVuY3Rpb24obmFtZSkgeyByZXR1cm4gcmVuZGVyU2VnbWVudGVkQmFyKG5hbWUpOyB9KTsgfSBlbHNlIGlmIChzZXR0aW5nID09PSBcImR1cmF0aW9uXCIgfHwgc2V0dGluZz09PSBcInBvc2l0aW9uXCIpIHsgcmVuZGVySW5kaWNhdG9yKHNldHRpbmcpOyB9IGVsc2UgeyByZW5kZXJCdXR0b24oc2V0dGluZyk7IH0gfSk7IH07ICU+PCUgaWYgKHNldHRpbmdzLmRlZmF1bHQgJiYgc2V0dGluZ3MuZGVmYXVsdC5sZW5ndGgpIHsgJT48ZGl2IGNsYXNzPVwibWVkaWEtY29udHJvbC1jZW50ZXItcGFuZWxcIiBkYXRhLW1lZGlhLWNvbnRyb2w+PCUgcmVuZGVyKHNldHRpbmdzLmRlZmF1bHQpOyAlPjwvZGl2PjwlIH0gJT48JSBpZiAoc2V0dGluZ3MubGVmdCAmJiBzZXR0aW5ncy5sZWZ0Lmxlbmd0aCkgeyAlPjxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLWxlZnQtcGFuZWxcIiBkYXRhLW1lZGlhLWNvbnRyb2w+PCUgcmVuZGVyKHNldHRpbmdzLmxlZnQpOyAlPjwvZGl2PjwlIH0gJT48JSBpZiAoc2V0dGluZ3MucmlnaHQgJiYgc2V0dGluZ3MucmlnaHQubGVuZ3RoKSB7ICU+PGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtcmlnaHQtcGFuZWxcIiBkYXRhLW1lZGlhLWNvbnRyb2w+PCUgcmVuZGVyKHNldHRpbmdzLnJpZ2h0KTsgJT48L2Rpdj48JSB9ICU+PC9kaXY+JyksJ3NlZWtfdGltZSc6IHRlbXBsYXRlKCc8c3BhbiBkYXRhLXNlZWstdGltZT48L3NwYW4+JyksJ2ZsYXNoJzogdGVtcGxhdGUoJzxwYXJhbSBuYW1lPVwibW92aWVcIiB2YWx1ZT1cIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXIuc3dmXCI+PHBhcmFtIG5hbWU9XCJxdWFsaXR5XCIgdmFsdWU9XCJhdXRvaGlnaFwiPjxwYXJhbSBuYW1lPVwic3dsaXZlY29ubmVjdFwiIHZhbHVlPVwidHJ1ZVwiPjxwYXJhbSBuYW1lPVwiYWxsb3dTY3JpcHRBY2Nlc3NcIiB2YWx1ZT1cImFsd2F5c1wiPjxwYXJhbSBuYW1lPVwiYmdjb2xvclwiIHZhbHVlPVwiIzAwMTEyMlwiPjxwYXJhbSBuYW1lPVwiYWxsb3dGdWxsU2NyZWVuXCIgdmFsdWU9XCJmYWxzZVwiPjxwYXJhbSBuYW1lPVwid21vZGVcIiB2YWx1ZT1cInRyYW5zcGFyZW50XCI+PHBhcmFtIG5hbWU9XCJ0YWJpbmRleFwiIHZhbHVlPVwiMVwiPjxwYXJhbSBuYW1lPUZsYXNoVmFycyB2YWx1ZT1cInBsYXliYWNrSWQ9PCU9IHBsYXliYWNrSWQgJT5cIiAvPjxlbWJlZCB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBkaXNhYmxlZCB0YWJpbmRleD1cIi0xXCIgZW5hYmxlY29udGV4dG1lbnU9XCJmYWxzZVwiIGFsbG93U2NyaXB0QWNjZXNzPVwiYWx3YXlzXCIgcXVhbGl0eT1cImF1dG9oaWdodFwiIHBsdWdpbnNwYWdlPVwiaHR0cDovL3d3dy5tYWNyb21lZGlhLmNvbS9nby9nZXRmbGFzaHBsYXllclwiIHdtb2RlPVwidHJhbnNwYXJlbnRcIiBzd2xpdmVjb25uZWN0PVwidHJ1ZVwiIHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIGFsbG93ZnVsbHNjcmVlbj1cImZhbHNlXCIgYmdjb2xvcj1cIiMwMDAwMDBcIiBGbGFzaFZhcnM9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgc3JjPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci5zd2ZcIj48L2VtYmVkPicpLCdobHMnOiB0ZW1wbGF0ZSgnPHBhcmFtIG5hbWU9XCJtb3ZpZVwiIHZhbHVlPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL2ZsYXNobHNDaHJvbWVsZXNzLnN3Zj9pbmxpbmU9MVwiPjxwYXJhbSBuYW1lPVwicXVhbGl0eVwiIHZhbHVlPVwiYXV0b2hpZ2hcIj48cGFyYW0gbmFtZT1cInN3bGl2ZWNvbm5lY3RcIiB2YWx1ZT1cInRydWVcIj48cGFyYW0gbmFtZT1cImFsbG93U2NyaXB0QWNjZXNzXCIgdmFsdWU9XCJhbHdheXNcIj48cGFyYW0gbmFtZT1cImJnY29sb3JcIiB2YWx1ZT1cIiMwMDExMjJcIj48cGFyYW0gbmFtZT1cImFsbG93RnVsbFNjcmVlblwiIHZhbHVlPVwiZmFsc2VcIj48cGFyYW0gbmFtZT1cIndtb2RlXCIgdmFsdWU9XCJ0cmFuc3BhcmVudFwiPjxwYXJhbSBuYW1lPVwidGFiaW5kZXhcIiB2YWx1ZT1cIjFcIj48cGFyYW0gbmFtZT1GbGFzaFZhcnMgdmFsdWU9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+JmNhbGxiYWNrPTwlPSBjYWxsYmFja05hbWUgJT5cIiAvPjxlbWJlZCB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiB0YWJpbmRleD1cIjFcIiBlbmFibGVjb250ZXh0bWVudT1cImZhbHNlXCIgYWxsb3dTY3JpcHRBY2Nlc3M9XCJhbHdheXNcIiBxdWFsaXR5PVwiYXV0b2hpZ2hcIiBwbHVnaW5zcGFnZT1cImh0dHA6Ly93d3cubWFjcm9tZWRpYS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXJcIiB3bW9kZT1cInRyYW5zcGFyZW50XCIgc3dsaXZlY29ubmVjdD1cInRydWVcIiB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBhbGxvd2Z1bGxzY3JlZW49XCJmYWxzZVwiIGJnY29sb3I9XCIjMDAwMDAwXCIgRmxhc2hWYXJzPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPiZjYWxsYmFjaz08JT0gY2FsbGJhY2tOYW1lICU+XCIgc3JjPVwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL2ZsYXNobHNDaHJvbWVsZXNzLnN3ZlwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj48L2VtYmVkPicpLCdodG1sNV92aWRlbyc6IHRlbXBsYXRlKCc8c291cmNlIHNyYz1cIjwlPXNyYyU+XCIgdHlwZT1cIjwlPXR5cGUlPlwiPicpLCdub19vcCc6IHRlbXBsYXRlKCc8Y2FudmFzIGRhdGEtbm8tb3AtY2FudmFzPjwvY2FudmFzPjxwIGRhdGEtbm8tb3AtbXNnPllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBwbGF5YmFjayBvZiB0aGlzIHZpZGVvLiBUcnkgdG8gdXNlIGEgZGlmZmVyZW50IGJyb3dzZXIuPHA+JyksJ2R2cl9jb250cm9scyc6IHRlbXBsYXRlKCc8ZGl2IGNsYXNzPVwibGl2ZS1pbmZvXCI+TElWRTwvZGl2PjxidXR0b24gY2xhc3M9XCJsaXZlLWJ1dHRvblwiPkJBQ0sgVE8gTElWRTwvYnV0dG9uPicpLCdwb3N0ZXInOiB0ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cInBsYXktd3JhcHBlclwiIGRhdGEtcG9zdGVyPjxzcGFuIGNsYXNzPVwicG9zdGVyLWljb24gcGxheVwiIGRhdGEtcG9zdGVyLz48L2Rpdj4nKSwnc3Bpbm5lcl90aHJlZV9ib3VuY2UnOiB0ZW1wbGF0ZSgnPGRpdiBkYXRhLWJvdW5jZTE+PC9kaXY+PGRpdiBkYXRhLWJvdW5jZTI+PC9kaXY+PGRpdiBkYXRhLWJvdW5jZTM+PC9kaXY+JyksJ3dhdGVybWFyayc6IHRlbXBsYXRlKCc8ZGl2IGRhdGEtd2F0ZXJtYXJrIGRhdGEtd2F0ZXJtYXJrLTwlPXBvc2l0aW9uICU+PjxpbWcgc3JjPVwiPCU9IGltYWdlVXJsICU+XCI+PC9kaXY+JyksQ1NTOiB7J2NvbnRhaW5lcic6ICcuY29udGFpbmVyW2RhdGEtY29udGFpbmVyXXtwb3NpdGlvbjphYnNvbHV0ZTtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0uY29udGFpbmVyW2RhdGEtY29udGFpbmVyXS5wb2ludGVyLWVuYWJsZWR7Y3Vyc29yOnBvaW50ZXJ9JywnY29yZSc6ICdbZGF0YS1wbGF5ZXJdey13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTsta2h0bWwtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7LW8tdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lOy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTstbW96LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCk7LW8tdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApO3Bvc2l0aW9uOnJlbGF0aXZlO21hcmdpbjowO3BhZGRpbmc6MDtib3JkZXI6MDtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo0MDA7dGV4dC1hbGlnbjpjZW50ZXI7b3ZlcmZsb3c6aGlkZGVuO2ZvbnQtc2l6ZToxMDAlO2ZvbnQtZmFtaWx5OlwibHVjaWRhIGdyYW5kZVwiLHRhaG9tYSx2ZXJkYW5hLGFyaWFsLHNhbnMtc2VyaWY7dGV4dC1zaGFkb3c6MCAwIDA7Ym94LXNpemluZzpib3JkZXItYm94fVtkYXRhLXBsYXllcl0gYSxbZGF0YS1wbGF5ZXJdIGFiYnIsW2RhdGEtcGxheWVyXSBhY3JvbnltLFtkYXRhLXBsYXllcl0gYWRkcmVzcyxbZGF0YS1wbGF5ZXJdIGFwcGxldCxbZGF0YS1wbGF5ZXJdIGFydGljbGUsW2RhdGEtcGxheWVyXSBhc2lkZSxbZGF0YS1wbGF5ZXJdIGF1ZGlvLFtkYXRhLXBsYXllcl0gYixbZGF0YS1wbGF5ZXJdIGJpZyxbZGF0YS1wbGF5ZXJdIGJsb2NrcXVvdGUsW2RhdGEtcGxheWVyXSBjYW52YXMsW2RhdGEtcGxheWVyXSBjYXB0aW9uLFtkYXRhLXBsYXllcl0gY2VudGVyLFtkYXRhLXBsYXllcl0gY2l0ZSxbZGF0YS1wbGF5ZXJdIGNvZGUsW2RhdGEtcGxheWVyXSBkZCxbZGF0YS1wbGF5ZXJdIGRlbCxbZGF0YS1wbGF5ZXJdIGRldGFpbHMsW2RhdGEtcGxheWVyXSBkZm4sW2RhdGEtcGxheWVyXSBkaXYsW2RhdGEtcGxheWVyXSBkbCxbZGF0YS1wbGF5ZXJdIGR0LFtkYXRhLXBsYXllcl0gZW0sW2RhdGEtcGxheWVyXSBlbWJlZCxbZGF0YS1wbGF5ZXJdIGZpZWxkc2V0LFtkYXRhLXBsYXllcl0gZmlnY2FwdGlvbixbZGF0YS1wbGF5ZXJdIGZpZ3VyZSxbZGF0YS1wbGF5ZXJdIGZvb3RlcixbZGF0YS1wbGF5ZXJdIGZvcm0sW2RhdGEtcGxheWVyXSBoMSxbZGF0YS1wbGF5ZXJdIGgyLFtkYXRhLXBsYXllcl0gaDMsW2RhdGEtcGxheWVyXSBoNCxbZGF0YS1wbGF5ZXJdIGg1LFtkYXRhLXBsYXllcl0gaDYsW2RhdGEtcGxheWVyXSBoZWFkZXIsW2RhdGEtcGxheWVyXSBoZ3JvdXAsW2RhdGEtcGxheWVyXSBpLFtkYXRhLXBsYXllcl0gaWZyYW1lLFtkYXRhLXBsYXllcl0gaW1nLFtkYXRhLXBsYXllcl0gaW5zLFtkYXRhLXBsYXllcl0ga2JkLFtkYXRhLXBsYXllcl0gbGFiZWwsW2RhdGEtcGxheWVyXSBsZWdlbmQsW2RhdGEtcGxheWVyXSBsaSxbZGF0YS1wbGF5ZXJdIG1hcmssW2RhdGEtcGxheWVyXSBtZW51LFtkYXRhLXBsYXllcl0gbmF2LFtkYXRhLXBsYXllcl0gb2JqZWN0LFtkYXRhLXBsYXllcl0gb2wsW2RhdGEtcGxheWVyXSBvdXRwdXQsW2RhdGEtcGxheWVyXSBwLFtkYXRhLXBsYXllcl0gcHJlLFtkYXRhLXBsYXllcl0gcSxbZGF0YS1wbGF5ZXJdIHJ1YnksW2RhdGEtcGxheWVyXSBzLFtkYXRhLXBsYXllcl0gc2FtcCxbZGF0YS1wbGF5ZXJdIHNlY3Rpb24sW2RhdGEtcGxheWVyXSBzbWFsbCxbZGF0YS1wbGF5ZXJdIHNwYW4sW2RhdGEtcGxheWVyXSBzdHJpa2UsW2RhdGEtcGxheWVyXSBzdHJvbmcsW2RhdGEtcGxheWVyXSBzdWIsW2RhdGEtcGxheWVyXSBzdW1tYXJ5LFtkYXRhLXBsYXllcl0gc3VwLFtkYXRhLXBsYXllcl0gdGFibGUsW2RhdGEtcGxheWVyXSB0Ym9keSxbZGF0YS1wbGF5ZXJdIHRkLFtkYXRhLXBsYXllcl0gdGZvb3QsW2RhdGEtcGxheWVyXSB0aCxbZGF0YS1wbGF5ZXJdIHRoZWFkLFtkYXRhLXBsYXllcl0gdGltZSxbZGF0YS1wbGF5ZXJdIHRyLFtkYXRhLXBsYXllcl0gdHQsW2RhdGEtcGxheWVyXSB1LFtkYXRhLXBsYXllcl0gdWwsW2RhdGEtcGxheWVyXSB2YXIsW2RhdGEtcGxheWVyXSB2aWRlb3ttYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjA7Zm9udDppbmhlcml0O2ZvbnQtc2l6ZToxMDAlO3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfVtkYXRhLXBsYXllcl0gdGFibGV7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlO2JvcmRlci1zcGFjaW5nOjB9W2RhdGEtcGxheWVyXSBjYXB0aW9uLFtkYXRhLXBsYXllcl0gdGQsW2RhdGEtcGxheWVyXSB0aHt0ZXh0LWFsaWduOmxlZnQ7Zm9udC13ZWlnaHQ6NDAwO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX1bZGF0YS1wbGF5ZXJdIGJsb2NrcXVvdGUsW2RhdGEtcGxheWVyXSBxe3F1b3Rlczpub25lfVtkYXRhLXBsYXllcl0gYmxvY2txdW90ZTphZnRlcixbZGF0YS1wbGF5ZXJdIGJsb2NrcXVvdGU6YmVmb3JlLFtkYXRhLXBsYXllcl0gcTphZnRlcixbZGF0YS1wbGF5ZXJdIHE6YmVmb3Jle2NvbnRlbnQ6XCJcIjtjb250ZW50Om5vbmV9W2RhdGEtcGxheWVyXSBhIGltZ3tib3JkZXI6bm9uZX1bZGF0YS1wbGF5ZXJdOmZvY3Vze291dGxpbmU6MH1bZGF0YS1wbGF5ZXJdICp7bWF4LXdpZHRoOmluaXRpYWw7Ym94LXNpemluZzppbmhlcml0O2Zsb2F0OmluaXRpYWx9W2RhdGEtcGxheWVyXS5mdWxsc2NyZWVue3dpZHRoOjEwMCUhaW1wb3J0YW50O2hlaWdodDoxMDAlIWltcG9ydGFudH1bZGF0YS1wbGF5ZXJdLm5vY3Vyc29ye2N1cnNvcjpub25lfS5jbGFwcHItc3R5bGV7ZGlzcGxheTpub25lIWltcG9ydGFudH1AbWVkaWEgc2NyZWVue1tkYXRhLXBsYXllcl17b3BhY2l0eTouOTl9fScsJ21lZGlhX2NvbnRyb2wnOiAnQGZvbnQtZmFjZXtmb250LWZhbWlseTpQbGF5ZXI7c3JjOnVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci5lb3RcIik7c3JjOnVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci5lb3Q/I2llZml4XCIpIGZvcm1hdChcImVtYmVkZGVkLW9wZW50eXBlXCIpLHVybChcIjwlPSBiYXNlVXJsICU+L2Fzc2V0cy9QbGF5ZXItUmVndWxhci50dGZcIikgZm9ybWF0KFwidHJ1ZXR5cGVcIiksdXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLnN2ZyNwbGF5ZXJcIikgZm9ybWF0KFwic3ZnXCIpfS5tZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbnstd2Via2l0LXRyYW5zaXRpb246bm9uZSFpbXBvcnRhbnQ7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OjBzOy1tb3otdHJhbnNpdGlvbjpub25lIWltcG9ydGFudDstby10cmFuc2l0aW9uOm5vbmUhaW1wb3J0YW50O3RyYW5zaXRpb246bm9uZSFpbXBvcnRhbnR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXXtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3otaW5kZXg6OTk5OTtwb2ludGVyLWV2ZW50czpub25lfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0uZHJhZ2dpbmd7cG9pbnRlci1ldmVudHM6YXV0bztjdXJzb3I6LXdlYmtpdC1ncmFiYmluZyFpbXBvcnRhbnQ7Y3Vyc29yOmdyYWJiaW5nIWltcG9ydGFudH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLmRyYWdnaW5nICp7Y3Vyc29yOi13ZWJraXQtZ3JhYmJpbmchaW1wb3J0YW50O2N1cnNvcjpncmFiYmluZyFpbXBvcnRhbnR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1iYWNrZ3JvdW5kW2RhdGEtYmFja2dyb3VuZF17cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjQwJTt3aWR0aDoxMDAlO2JvdHRvbTowO2JhY2tncm91bmQtaW1hZ2U6LW93ZyhsaW5lYXItZ3JhZGllbnQocmdiYSgwLDAsMCwwKSxyZ2JhKDAsMCwwLC45KSkpO2JhY2tncm91bmQtaW1hZ2U6LXdlYmtpdChsaW5lYXItZ3JhZGllbnQocmdiYSgwLDAsMCwwKSxyZ2JhKDAsMCwwLC45KSkpO2JhY2tncm91bmQtaW1hZ2U6LW1veihsaW5lYXItZ3JhZGllbnQocmdiYSgwLDAsMCwwKSxyZ2JhKDAsMCwwLC45KSkpO2JhY2tncm91bmQtaW1hZ2U6LW8obGluZWFyLWdyYWRpZW50KHJnYmEoMCwwLDAsMCkscmdiYSgwLDAsMCwuOSkpKTtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudChyZ2JhKDAsMCwwLDApLHJnYmEoMCwwLDAsLjkpKTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuNnM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IC42cyBlYXNlLW91dDstby10cmFuc2l0aW9uOm9wYWNpdHkgLjZzIGVhc2Utb3V0O3RyYW5zaXRpb246b3BhY2l0eSAuNnMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1pY29ue2ZvbnQtZmFtaWx5OlBsYXllcjtmb250LXdlaWdodDo0MDA7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC1zaXplOjI2cHg7bGluZS1oZWlnaHQ6MzJweDtsZXR0ZXItc3BhY2luZzowO3NwZWFrOm5vbmU7Y29sb3I6I2ZmZjtvcGFjaXR5Oi41O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt0ZXh0LWFsaWduOmxlZnQ7LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGU7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2U7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWljb246aG92ZXJ7Y29sb3I6I2ZmZjtvcGFjaXR5Oi43NTt0ZXh0LXNoYWRvdzpyZ2JhKDI1NSwyNTUsMjU1LC44KSAwIDAgNXB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0ubWVkaWEtY29udHJvbC1oaWRlIC5tZWRpYS1jb250cm9sLWJhY2tncm91bmRbZGF0YS1iYWNrZ3JvdW5kXXtvcGFjaXR5OjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXS5tZWRpYS1jb250cm9sLWhpZGUgLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc117Ym90dG9tOi01MHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0ubWVkaWEtY29udHJvbC1oaWRlIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1zY3J1YmJlcltkYXRhLXNlZWtiYXJde29wYWNpdHk6MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNde3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTo3cHg7d2lkdGg6MTAwJTtoZWlnaHQ6MzJweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7cG9pbnRlci1ldmVudHM6YXV0bzstd2Via2l0LXRyYW5zaXRpb246Ym90dG9tIC40czstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmJvdHRvbSAuNHMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjpib3R0b20gLjRzIGVhc2Utb3V0O3RyYW5zaXRpb246Ym90dG9tIC40cyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWxlZnQtcGFuZWxbZGF0YS1tZWRpYS1jb250cm9sXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjRweDtoZWlnaHQ6MTAwJX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWNlbnRlci1wYW5lbFtkYXRhLW1lZGlhLWNvbnRyb2xde2hlaWdodDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO2xpbmUtaGVpZ2h0OjMycHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1yaWdodC1wYW5lbFtkYXRhLW1lZGlhLWNvbnRyb2xde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjRweDtoZWlnaHQ6MTAwJX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbntiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjowO21hcmdpbjowIDZweDtwYWRkaW5nOjA7Y3Vyc29yOnBvaW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2t9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b246Zm9jdXN7b3V0bGluZTowfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheV17ZmxvYXQ6bGVmdDtoZWlnaHQ6MTAwJTtmb250LXNpemU6MjBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXldOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBhdXNlXXtmbG9hdDpsZWZ0O2hlaWdodDoxMDAlO2ZvbnQtc2l6ZToyMHB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGF1c2VdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDJcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXN0b3Bde2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjIwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1zdG9wXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAzXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1mdWxsc2NyZWVuXXtmbG9hdDpyaWdodDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjowO2hlaWdodDoxMDAlfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtZnVsbHNjcmVlbl06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwNlwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtZnVsbHNjcmVlbl0uc2hyaW5rOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDdcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWhkLWluZGljYXRvcl17Y3Vyc29yOmRlZmF1bHQ7ZmxvYXQ6cmlnaHQ7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MDtoZWlnaHQ6MTAwJTtvcGFjaXR5OjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1oZC1pbmRpY2F0b3JdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDhcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLWhkLWluZGljYXRvcl0uZW5hYmxlZHtvcGFjaXR5OjF9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1oZC1pbmRpY2F0b3JdLmVuYWJsZWQ6aG92ZXJ7b3BhY2l0eToxO3RleHQtc2hhZG93Om5vbmV9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5cGF1c2Vde2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjIwcHh9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5cGF1c2VdOmJlZm9yZXtjb250ZW50OlwiXFxcXGUwMDFcIn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlwYXVzZV0ucGxheWluZzpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAyXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5cGF1c2VdLnBhdXNlZDpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5c3RvcF17ZmxvYXQ6bGVmdDtoZWlnaHQ6MTAwJTtmb250LXNpemU6MjBweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIGJ1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlzdG9wXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5c3RvcF0ucGxheWluZzpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAzXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSBidXR0b24ubWVkaWEtY29udHJvbC1idXR0b25bZGF0YS1wbGF5c3RvcF0uc3RvcHBlZDpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1kdXJhdGlvbl0sLm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1wb3NpdGlvbl17ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC1zaXplOjEwcHg7Y29sb3I6I2ZmZjtjdXJzb3I6ZGVmYXVsdDtsaW5lLWhlaWdodDozMnB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtcG9zaXRpb25de21hcmdpbi1sZWZ0OjZweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLWR1cmF0aW9uXXtjb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC41KTttYXJnaW4tcmlnaHQ6NnB4fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLm1lZGlhLWNvbnRyb2wtaW5kaWNhdG9yW2RhdGEtZHVyYXRpb25dOmJlZm9yZXtjb250ZW50OlwifFwiO21hcmdpbjowIDNweH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl17cG9zaXRpb246YWJzb2x1dGU7dG9wOi0yMHB4O2xlZnQ6MDtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7d2lkdGg6MTAwJTtoZWlnaHQ6MjVweDtjdXJzb3I6cG9pbnRlcn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl17d2lkdGg6MTAwJTtoZWlnaHQ6MXB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxMnB4O2JhY2tncm91bmQtY29sb3I6IzY2Nn0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1maWxsLTFbZGF0YS1zZWVrYmFyXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MDtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiNjMmMyYzI7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dDt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjA7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1jb2xvcjojMDA1YWZmOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dDstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLWJhY2tncm91bmRbZGF0YS1zZWVrYmFyXSAuYmFyLWhvdmVyW2RhdGEtc2Vla2Jhcl17b3BhY2l0eTowO3Bvc2l0aW9uOmFic29sdXRlO3RvcDotM3B4O3dpZHRoOjVweDtoZWlnaHQ6N3B4O2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNSk7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlOy1vLXRyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZTt0cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2V9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdOmhvdmVyIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItaG92ZXJbZGF0YS1zZWVrYmFyXXtvcGFjaXR5OjF9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdLnNlZWstZGlzYWJsZWR7Y3Vyc29yOmRlZmF1bHR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdLnNlZWstZGlzYWJsZWQ6aG92ZXIgLmJhci1iYWNrZ3JvdW5kW2RhdGEtc2Vla2Jhcl0gLmJhci1ob3ZlcltkYXRhLXNlZWtiYXJde29wYWNpdHk6MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1zY3J1YmJlcltkYXRhLXNlZWtiYXJde3Bvc2l0aW9uOmFic29sdXRlO3RvcDoycHg7bGVmdDowO3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNpdGlvbjphbGwgLjFzOy13ZWJraXQtdHJhbnNpdGlvbi1kZWxheTplYXNlLW91dDstbW96LXRyYW5zaXRpb246YWxsIC4xcyBlYXNlLW91dDstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZS1vdXQ7dHJhbnNpdGlvbjphbGwgLjFzIGVhc2Utb3V0fS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmJhci1jb250YWluZXJbZGF0YS1zZWVrYmFyXSAuYmFyLXNjcnViYmVyW2RhdGEtc2Vla2Jhcl0gLmJhci1zY3J1YmJlci1pY29uW2RhdGEtc2Vla2Jhcl17cG9zaXRpb246YWJzb2x1dGU7bGVmdDo2cHg7dG9wOjZweDt3aWR0aDo4cHg7aGVpZ2h0OjhweDtib3JkZXItcmFkaXVzOjEwcHg7Ym94LXNoYWRvdzowIDAgMCA2cHggcmdiYSgyNTUsMjU1LDI1NSwuMik7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVde2Zsb2F0OnJpZ2h0O2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDozMnB4O2N1cnNvcjpwb2ludGVyO21hcmdpbjowIDZweDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV17ZmxvYXQ6bGVmdDtib3R0b206MH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVde2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjA7Ym94LXNpemluZzpjb250ZW50LWJveDt3aWR0aDoxNnB4O2hlaWdodDozMnB4O21hcmdpbi1yaWdodDo2cHg7b3BhY2l0eToxfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV06aG92ZXJ7b3BhY2l0eToxfS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV06YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTAwNFwifS5tZWRpYS1jb250cm9sW2RhdGEtbWVkaWEtY29udHJvbF0gLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbi1jb250YWluZXJbZGF0YS12b2x1bWVdIC5kcmF3ZXItaWNvbltkYXRhLXZvbHVtZV0ubXV0ZWR7b3BhY2l0eTouNX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb24tY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuZHJhd2VyLWljb25bZGF0YS12b2x1bWVdLm11dGVkOmhvdmVye29wYWNpdHk6Ljd9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXS5tdXRlZDpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDA1XCJ9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVde2Zsb2F0OmxlZnQ7cG9zaXRpb246cmVsYXRpdmU7dG9wOjZweDt3aWR0aDo0MnB4O2hlaWdodDoxOHB4O3BhZGRpbmc6M3B4IDA7b3ZlcmZsb3c6aGlkZGVuOy13ZWJraXQtdHJhbnNpdGlvbjp3aWR0aCAuMnM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjp3aWR0aCAuMnMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjp3aWR0aCAuMnMgZWFzZS1vdXQ7dHJhbnNpdGlvbjp3aWR0aCAuMnMgZWFzZS1vdXR9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5zZWdtZW50ZWQtYmFyLWVsZW1lbnRbZGF0YS12b2x1bWVde2Zsb2F0OmxlZnQ7d2lkdGg6NHB4O3BhZGRpbmctbGVmdDoycHg7aGVpZ2h0OjEycHg7b3BhY2l0eTouNTstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1tb3otYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LW1zLWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1vLWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmO2JveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy13ZWJraXQtdHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuMnM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjotbW96LXRyYW5zZm9ybSAuMnMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjotby10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0O3RyYW5zaXRpb246dHJhbnNmb3JtIC4ycyBlYXNlLW91dH0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV0uZmlsbHstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1tb3otYm94LXNoYWRvdzppbnNldCAycHggMCAwICNmZmY7LW1zLWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmOy1vLWJveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmO2JveC1zaGFkb3c6aW5zZXQgMnB4IDAgMCAjZmZmO29wYWNpdHk6MX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdIC5tZWRpYS1jb250cm9sLWxheWVyW2RhdGEtY29udHJvbHNdIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSAuYmFyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV06bnRoLW9mLXR5cGUoMSl7cGFkZGluZy1sZWZ0OjB9Lm1lZGlhLWNvbnRyb2xbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuZHJhd2VyLWNvbnRhaW5lcltkYXRhLXZvbHVtZV0gLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5zZWdtZW50ZWQtYmFyLWVsZW1lbnRbZGF0YS12b2x1bWVdOmhvdmVyey13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSgxLjUpOy1tb3otdHJhbnNmb3JtOnNjYWxlWSgxLjUpOy1tcy10cmFuc2Zvcm06c2NhbGVZKDEuNSk7LW8tdHJhbnNmb3JtOnNjYWxlWSgxLjUpO3RyYW5zZm9ybTpzY2FsZVkoMS41KX0ubWVkaWEtY29udHJvbFtkYXRhLW1lZGlhLWNvbnRyb2xdLnczMjAgLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10gLmRyYXdlci1jb250YWluZXJbZGF0YS12b2x1bWVdIC5iYXItY29udGFpbmVyW2RhdGEtdm9sdW1lXS52b2x1bWUtYmFyLWhpZGV7aGVpZ2h0OjEycHg7dG9wOjlweDtwYWRkaW5nOjA7d2lkdGg6MH0nLCdzZWVrX3RpbWUnOiAnLnNlZWstdGltZVtkYXRhLXNlZWstdGltZV17cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6YXV0bztoZWlnaHQ6MjBweDtsaW5lLWhlaWdodDoyMHB4O2JvdHRvbTo1NXB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgyLDIsMiwuNSk7ei1pbmRleDo5OTk5Oy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC4xczstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6ZWFzZTstbW96LXRyYW5zaXRpb246b3BhY2l0eSAuMXMgZWFzZTstby10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGVhc2U7dHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBlYXNlfS5zZWVrLXRpbWVbZGF0YS1zZWVrLXRpbWVdLmhpZGRlbltkYXRhLXNlZWstdGltZV17b3BhY2l0eTowfS5zZWVrLXRpbWVbZGF0YS1zZWVrLXRpbWVdIHNwYW5bZGF0YS1zZWVrLXRpbWVde3Bvc2l0aW9uOnJlbGF0aXZlO2NvbG9yOiNmZmY7Zm9udC1zaXplOjEwcHg7cGFkZGluZy1sZWZ0OjdweDtwYWRkaW5nLXJpZ2h0OjdweH0nLCdmbGFzaCc6ICdbZGF0YS1mbGFzaF17cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7ZGlzcGxheTpibG9jaztwb2ludGVyLWV2ZW50czpub25lfScsJ2hscyc6ICdbZGF0YS1obHNde3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6YmxvY2s7cG9pbnRlci1ldmVudHM6bm9uZTt0b3A6MH0nLCdodG1sNV92aWRlbyc6ICdbZGF0YS1odG1sNS12aWRlb117cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtkaXNwbGF5OmJsb2NrfScsJ2h0bWxfaW1nJzogJ1tkYXRhLWh0bWwtaW1nXXttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCV9Jywnbm9fb3AnOiAnW2RhdGEtbm8tb3Bde3otaW5kZXg6MTAwMDtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyfVtkYXRhLW5vLW9wXSBwW2RhdGEtbm8tb3AtbXNnXXtwb3NpdGlvbjphYnNvbHV0ZTtmb250LXNpemU6MjVweDt0b3A6NDAlO2NvbG9yOiNmZmZ9W2RhdGEtbm8tb3BdIGNhbnZhc1tkYXRhLW5vLW9wLWNhbnZhc117YmFja2dyb3VuZC1jb2xvcjojNzc3O2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9JywnZHZyX2NvbnRyb2xzJzogJ0Bmb250LWZhY2V7Zm9udC1mYW1pbHk6Um9ib3RvO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjQwMDtzcmM6bG9jYWwoXCJSb2JvdG9cIiksbG9jYWwoXCJSb2JvdG8tUmVndWxhclwiKSx1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUm9ib3RvLnR0ZlwiKSBmb3JtYXQoXCJ0cnVldHlwZVwiKX0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXXtkaXNwbGF5OmlubGluZS1ibG9jaztmbG9hdDpsZWZ0O2NvbG9yOiNmZmY7bGluZS1oZWlnaHQ6MzJweDtmb250LXNpemU6MTBweDtmb250LXdlaWdodDo3MDA7bWFyZ2luLWxlZnQ6NnB4fS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm97Y3Vyc29yOmRlZmF1bHQ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiT3BlbiBTYW5zXCIsQXJpYWwsc2Fucy1zZXJpZn0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1pbmZvOmJlZm9yZXtjb250ZW50OlwiXCI7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6N3B4O2hlaWdodDo3cHg7Ym9yZGVyLXJhZGl1czozLjVweDttYXJnaW4tcmlnaHQ6My41cHg7YmFja2dyb3VuZC1jb2xvcjojZmYwMTAxfS5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm8uZGlzYWJsZWR7b3BhY2l0eTouM30uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1pbmZvLmRpc2FibGVkOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtYnV0dG9ue2N1cnNvcjpwb2ludGVyO291dGxpbmU6MDtkaXNwbGF5Om5vbmU7Ym9yZGVyOjA7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2hlaWdodDozMnB4O3BhZGRpbmc6MDtvcGFjaXR5Oi43O2ZvbnQtZmFtaWx5OlJvYm90byxcIk9wZW4gU2Fuc1wiLEFyaWFsLHNhbnMtc2VyaWY7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMXM7LXdlYmtpdC10cmFuc2l0aW9uLWRlbGF5OmVhc2U7LW1vei10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTstby10cmFuc2l0aW9uOmFsbCAuMXMgZWFzZTt0cmFuc2l0aW9uOmFsbCAuMXMgZWFzZX0uZHZyLWNvbnRyb2xzW2RhdGEtZHZyLWNvbnRyb2xzXSAubGl2ZS1idXR0b246YmVmb3Jle2NvbnRlbnQ6XCJcIjtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo3cHg7aGVpZ2h0OjdweDtib3JkZXItcmFkaXVzOjMuNXB4O21hcmdpbi1yaWdodDozLjVweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtYnV0dG9uOmhvdmVye29wYWNpdHk6MTt0ZXh0LXNoYWRvdzpyZ2JhKDI1NSwyNTUsMjU1LC43NSkgMCAwIDVweH0uZHZyIC5kdnItY29udHJvbHNbZGF0YS1kdnItY29udHJvbHNdIC5saXZlLWluZm97ZGlzcGxheTpub25lfS5kdnIgLmR2ci1jb250cm9sc1tkYXRhLWR2ci1jb250cm9sc10gLmxpdmUtYnV0dG9ue2Rpc3BsYXk6YmxvY2t9LmR2ci5tZWRpYS1jb250cm9sLmxpdmVbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl17YmFja2dyb3VuZC1jb2xvcjojMDA1YWZmfS5tZWRpYS1jb250cm9sLmxpdmVbZGF0YS1tZWRpYS1jb250cm9sXSAubWVkaWEtY29udHJvbC1sYXllcltkYXRhLWNvbnRyb2xzXSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdIC5iYXItYmFja2dyb3VuZFtkYXRhLXNlZWtiYXJdIC5iYXItZmlsbC0yW2RhdGEtc2Vla2Jhcl17YmFja2dyb3VuZC1jb2xvcjojZmYwMTAxfS5zZWVrLXRpbWVbZGF0YS1zZWVrLXRpbWVdIHNwYW5bZGF0YS1kdXJhdGlvbl17cG9zaXRpb246cmVsYXRpdmU7Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNSk7Zm9udC1zaXplOjEwcHg7cGFkZGluZy1yaWdodDo3cHh9LnNlZWstdGltZVtkYXRhLXNlZWstdGltZV0gc3BhbltkYXRhLWR1cmF0aW9uXTpiZWZvcmV7Y29udGVudDpcInxcIjttYXJnaW4tcmlnaHQ6N3B4fScsJ3Bvc3Rlcic6ICdAZm9udC1mYWNle2ZvbnQtZmFtaWx5OlBsYXllcjtzcmM6dXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLmVvdFwiKTtzcmM6dXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLmVvdD8jaWVmaXhcIikgZm9ybWF0KFwiZW1iZWRkZWQtb3BlbnR5cGVcIiksdXJsKFwiPCU9IGJhc2VVcmwgJT4vYXNzZXRzL1BsYXllci1SZWd1bGFyLnR0ZlwiKSBmb3JtYXQoXCJ0cnVldHlwZVwiKSx1cmwoXCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLVJlZ3VsYXIuc3ZnI3BsYXllclwiKSBmb3JtYXQoXCJzdmdcIil9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJde2N1cnNvcjpwb2ludGVyO3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7ei1pbmRleDo5OTg7dG9wOjB9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJdIC5wb3N0ZXItYmFja2dyb3VuZFtkYXRhLXBvc3Rlcl17d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLXNpemU6Y292ZXI7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtcG9zaXRpb246NTAlIDUwJX0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl0gLnBsYXktd3JhcHBlcltkYXRhLXBvc3Rlcl17cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtoZWlnaHQ6MjUlO2xpbmUtaGVpZ2h0OjEwMCU7Zm9udC1zaXplOjI1JTt0b3A6NTAlO3RleHQtYWxpZ246Y2VudGVyfS5wbGF5ZXItcG9zdGVyW2RhdGEtcG9zdGVyXSAucGxheS13cmFwcGVyW2RhdGEtcG9zdGVyXSAucG9zdGVyLWljb25bZGF0YS1wb3N0ZXJde2ZvbnQtZmFtaWx5OlBsYXllcjtmb250LXdlaWdodDo0MDA7Zm9udC1zdHlsZTpub3JtYWw7bGluZS1oZWlnaHQ6MTtsZXR0ZXItc3BhY2luZzowO3NwZWFrOm5vbmU7Y29sb3I6I2ZmZjtvcGFjaXR5Oi43NTstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSB0ZXh0LXNoYWRvdzstd2Via2l0LXRyYW5zaXRpb24tZGVsYXk6LjFzOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IHRleHQtc2hhZG93IC4xczstby10cmFuc2l0aW9uOm9wYWNpdHkgdGV4dC1zaGFkb3cgLjFzO3RyYW5zaXRpb246b3BhY2l0eSB0ZXh0LXNoYWRvdyAuMXMgZWFzZX0ucGxheWVyLXBvc3RlcltkYXRhLXBvc3Rlcl0gLnBsYXktd3JhcHBlcltkYXRhLXBvc3Rlcl0gLnBvc3Rlci1pY29uW2RhdGEtcG9zdGVyXS5wbGF5W2RhdGEtcG9zdGVyXTpiZWZvcmV7Y29udGVudDpcIlxcXFxlMDAxXCJ9LnBsYXllci1wb3N0ZXJbZGF0YS1wb3N0ZXJdIC5wbGF5LXdyYXBwZXJbZGF0YS1wb3N0ZXJdIC5wb3N0ZXItaWNvbltkYXRhLXBvc3Rlcl06aG92ZXJ7b3BhY2l0eToxO3RleHQtc2hhZG93OnJnYmEoMjU1LDI1NSwyNTUsLjgpIDAgMCAxNXB4fScsJ3NwaW5uZXJfdGhyZWVfYm91bmNlJzogJy5zcGlubmVyLXRocmVlLWJvdW5jZVtkYXRhLXNwaW5uZXJde3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbjowIGF1dG87d2lkdGg6NzBweDt0ZXh0LWFsaWduOmNlbnRlcjt6LWluZGV4Ojk5OTt0b3A6NDclO2xlZnQ6MDtyaWdodDowfS5zcGlubmVyLXRocmVlLWJvdW5jZVtkYXRhLXNwaW5uZXJdPmRpdnt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6I0ZGRjtib3JkZXItcmFkaXVzOjEwMCU7ZGlzcGxheTppbmxpbmUtYmxvY2s7LXdlYmtpdC1hbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDstbW96LWFuaW1hdGlvbjpib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0Oy1tcy1hbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDstby1hbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDthbmltYXRpb246Ym91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dDstd2Via2l0LWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDstbW96LWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDstbXMtYW5pbWF0aW9uLWZpbGwtbW9kZTpib3RoOy1vLWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDthbmltYXRpb24tZmlsbC1tb2RlOmJvdGh9LnNwaW5uZXItdGhyZWUtYm91bmNlW2RhdGEtc3Bpbm5lcl0gW2RhdGEtYm91bmNlMV0sLnNwaW5uZXItdGhyZWUtYm91bmNlW2RhdGEtc3Bpbm5lcl0gW2RhdGEtYm91bmNlMl17LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS4zMnM7LW1vei1hbmltYXRpb24tZGVsYXk6LS4zMnM7LW1zLWFuaW1hdGlvbi1kZWxheTotLjMyczstby1hbmltYXRpb24tZGVsYXk6LS4zMnM7YW5pbWF0aW9uLWRlbGF5Oi0uMzJzfUAtbW96LWtleWZyYW1lcyBib3VuY2VkZWxheXswJSwxMDAlLDgwJXstbW96LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9NDAley1tb3otdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19QC13ZWJraXQta2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpfX1ALW8ta2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley1vLXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9NDAley1vLXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fUAtbXMta2V5ZnJhbWVzIGJvdW5jZWRlbGF5ezAlLDEwMCUsODAley1tcy10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfTQwJXstbXMtdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19QGtleWZyYW1lcyBib3VuY2VkZWxheXswJSwxMDAlLDgwJXt0cmFuc2Zvcm06c2NhbGUoMCl9NDAle3RyYW5zZm9ybTpzY2FsZSgxKX19Jywnd2F0ZXJtYXJrJzogJ1tkYXRhLXdhdGVybWFya117cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luOjEwMHB4IGF1dG8gMDt3aWR0aDo3MHB4O3RleHQtYWxpZ246Y2VudGVyO3otaW5kZXg6MTB9W2RhdGEtd2F0ZXJtYXJrLWJvdHRvbS1sZWZ0XXtib3R0b206MTBweDtsZWZ0OjEwcHh9W2RhdGEtd2F0ZXJtYXJrLWJvdHRvbS1yaWdodF17Ym90dG9tOjEwcHg7cmlnaHQ6NDJweH1bZGF0YS13YXRlcm1hcmstdG9wLWxlZnRde3RvcDotOTVweDtsZWZ0OjEwcHh9W2RhdGEtd2F0ZXJtYXJrLXRvcC1yaWdodF17dG9wOi05NXB4O3JpZ2h0OjM3cHh9Jyx9fTsiLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgJCA9IHJlcXVpcmUoJ2NsYXBwci16ZXB0bycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZScpO1xudmFyIEpTVCA9IHJlcXVpcmUoJy4vanN0Jyk7XG5cbnZhciBTdHlsZXIgPSB7XG4gIGdldFN0eWxlRm9yOiBmdW5jdGlvbihuYW1lLCBvcHRpb25zPXtiYXNlVXJsOiAnJ30pIHtcbiAgICByZXR1cm4gJCgnPHN0eWxlIGNsYXNzPVwiY2xhcHByLXN0eWxlXCI+PC9zdHlsZT4nKS5odG1sKHRlbXBsYXRlKEpTVC5DU1NbbmFtZV0pKG9wdGlvbnMpKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZXI7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvYnJvd3NlcicpXG5cbnZhciBleHRlbmQgPSBmdW5jdGlvbihwYXJlbnQsIHByb3BlcnRpZXMpIHtcbiAgdmFyIGNvbnN0cnVjdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgcGFyZW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgaWYgKHByb3BlcnRpZXMuY29uc3RydWN0b3IpIHtcbiAgICAgIHByb3BlcnRpZXMuY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH1cbiAgfVxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudC5wcm90b3R5cGUpXG4gIGFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BlcnRpZXMpXG4gIHJldHVybiBjb25zdHJ1Y3RvclxufVxuXG52YXIgZm9ybWF0VGltZSA9IGZ1bmN0aW9uKHRpbWUpIHtcbiAgICBpZiAoIWlzRmluaXRlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gXCItLTotLVwiXG4gICAgfVxuICAgIHRpbWUgPSB0aW1lICogMTAwMFxuICAgIHRpbWUgPSBwYXJzZUludCh0aW1lLzEwMDApXG4gICAgdmFyIHNlY29uZHMgPSB0aW1lICUgNjBcbiAgICB0aW1lID0gcGFyc2VJbnQodGltZS82MClcbiAgICB2YXIgbWludXRlcyA9IHRpbWUgJSA2MFxuICAgIHRpbWUgPSBwYXJzZUludCh0aW1lLzYwKVxuICAgIHZhciBob3VycyA9IHRpbWUgJSAyNFxuICAgIHZhciBvdXQgPSBcIlwiXG4gICAgaWYgKGhvdXJzICYmIGhvdXJzID4gMCkgb3V0ICs9IChcIjBcIiArIGhvdXJzKS5zbGljZSgtMikgKyBcIjpcIlxuICAgIG91dCArPSAoXCIwXCIgKyBtaW51dGVzKS5zbGljZSgtMikgKyBcIjpcIlxuICAgIG91dCArPSAoXCIwXCIgKyBzZWNvbmRzKS5zbGljZSgtMilcbiAgICByZXR1cm4gb3V0LnRyaW0oKVxufVxuXG52YXIgRnVsbHNjcmVlbiA9IHtcbiAgaXNGdWxsc2NyZWVuOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgfHxcbiAgICAgIGRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlbiB8fFxuICAgICAgZG9jdW1lbnQubW96RnVsbFNjcmVlbiB8fFxuICAgICAgISFkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50XG4gICAgKVxuICB9LFxuICByZXF1ZXN0RnVsbHNjcmVlbjogZnVuY3Rpb24oZWwpIHtcbiAgICBpZihlbC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgZWwucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZihlbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgZWwud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZihlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4oKVxuICAgIH0gZWxzZSBpZihlbC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICBlbC5tc1JlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKGVsLnF1ZXJ5U2VsZWN0b3IgJiYgZWwucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpLndlYmtpdEVudGVyRnVsbFNjcmVlbikge1xuICAgICAgZWwucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpLndlYmtpdEVudGVyRnVsbFNjcmVlbigpXG4gICAgfVxuICB9LFxuICBjYW5jZWxGdWxsc2NyZWVuOiBmdW5jdGlvbigpIHtcbiAgICBpZihkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZihkb2N1bWVudC53ZWJraXRDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICBkb2N1bWVudC53ZWJraXRDYW5jZWxGdWxsU2NyZWVuKClcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpXG4gICAgfSBlbHNlIGlmKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKVxuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBDb25maWcge1xuXG4gIHN0YXRpYyBfZGVmYXVsdENvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdm9sdW1lOiB7XG4gICAgICAgIHZhbHVlOiAxMDAsXG4gICAgICAgIHBhcnNlOiBwYXJzZUludFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBfZGVmYXVsdFZhbHVlRm9yKGtleSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdENvbmZpZygpW2tleV1bJ3BhcnNlJ10odGhpcy5fZGVmYXVsdENvbmZpZygpW2tleV1bJ3ZhbHVlJ10pXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIF9jcmVhdGVfa2V5c3BhY2Uoa2V5KXtcbiAgICByZXR1cm4gJ2NsYXBwci4nICsgZG9jdW1lbnQuZG9tYWluICsgJy4nICsga2V5XG4gIH1cblxuICBzdGF0aWMgcmVzdG9yZShrZXkpIHtcbiAgICBpZiAoQnJvd3Nlci5oYXNMb2NhbHN0b3JhZ2UgJiYgbG9jYWxTdG9yYWdlW3RoaXMuX2NyZWF0ZV9rZXlzcGFjZShrZXkpXSl7XG4gICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdENvbmZpZygpW2tleV1bJ3BhcnNlJ10obG9jYWxTdG9yYWdlW3RoaXMuX2NyZWF0ZV9rZXlzcGFjZShrZXkpXSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRWYWx1ZUZvcihrZXkpXG4gIH1cblxuICBzdGF0aWMgcGVyc2lzdChrZXksIHZhbHVlKSB7XG4gICAgaWYgKEJyb3dzZXIuaGFzTG9jYWxzdG9yYWdlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBsb2NhbFN0b3JhZ2VbdGhpcy5fY3JlYXRlX2tleXNwYWNlKGtleSldID0gdmFsdWVcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudmFyIHNlZWtTdHJpbmdUb1NlY29uZHMgPSBmdW5jdGlvbih1cmwpIHtcbiAgdmFyIGVsZW1lbnRzID0gKHVybC5tYXRjaCgvdD0oWzAtOV0qaCk/KFswLTldKm0pPyhbMC05XSpzKT8vKSB8fCBbXSkuc3BsaWNlKDEpXG4gIHJldHVybiAoISFlbGVtZW50cy5sZW5ndGgpPyBlbGVtZW50cy5tYXAoZnVuY3Rpb24gKGVsKSB7XG4gICAgaWYgKGVsKSB7XG4gICAgICB2YXIgdmFsdWUgPSBwYXJzZUludChlbC5zbGljZSgwLDIpKSB8fCAwXG4gICAgICBzd2l0Y2ggKGVsW2VsLmxlbmd0aC0xXSkge1xuICAgICAgICBjYXNlICdoJzogdmFsdWUgPSB2YWx1ZSAqIDM2MDA7IGJyZWFrXG4gICAgICAgIGNhc2UgJ20nOiB2YWx1ZSA9IHZhbHVlICogNjA7IGJyZWFrXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfSkucmVkdWNlKGZ1bmN0aW9uIChhLGIpIHsgcmV0dXJuIGErYjsgfSk6IDBcbn1cblxudmFyIGlkc0NvdW50ZXIgPSB7fVxuXG52YXIgdW5pcXVlSWQgPSBmdW5jdGlvbihwcmVmaXgpIHtcbiAgaWRzQ291bnRlcltwcmVmaXhdIHx8IChpZHNDb3VudGVyW3ByZWZpeF0gPSAwKVxuICB2YXIgaWQgPSArK2lkc0NvdW50ZXJbcHJlZml4XVxuICByZXR1cm4gcHJlZml4ICsgaWRcbn1cblxudmFyIGlzTnVtYmVyID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlIC0gcGFyc2VGbG9hdCh2YWx1ZSkgKyAxID49IDBcbn1cblxudmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmbikgPT4gd2luZG93LnNldFRpbWVvdXQoZm4sIDEwMDAvNjApXG5cbnZhciBjYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXRcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGV4dGVuZDogZXh0ZW5kLFxuICBmb3JtYXRUaW1lOiBmb3JtYXRUaW1lLFxuICBGdWxsc2NyZWVuOiBGdWxsc2NyZWVuLFxuICBDb25maWc6IENvbmZpZyxcbiAgc2Vla1N0cmluZ1RvU2Vjb25kczogc2Vla1N0cmluZ1RvU2Vjb25kcyxcbiAgdW5pcXVlSWQ6IHVuaXF1ZUlkLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZTogcmVxdWVzdEFuaW1hdGlvbkZyYW1lLFxuICBjYW5jZWxBbmltYXRpb25GcmFtZTogY2FuY2VsQW5pbWF0aW9uRnJhbWVcbn1cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogQ29udGFpbmVyIGlzIHJlc3BvbnNpYmxlIGZvciB0aGUgdmlkZW8gcmVuZGVyaW5nIGFuZCBzdGF0ZVxuICovXG5cbnZhciBVSU9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdWlfb2JqZWN0Jyk7XG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJylcblxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgVUlPYmplY3Qge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdDb250YWluZXInIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7IHJldHVybiB7IGNsYXNzOiAnY29udGFpbmVyJywgJ2RhdGEtY29udGFpbmVyJzogJycgfSB9XG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGljayc6ICdjbGlja2VkJyxcbiAgICAgICdkYmxjbGljayc6ICdkYmxDbGlja2VkJyxcbiAgICAgICdkb3VibGVUYXAnOiAnZGJsQ2xpY2tlZCcsXG4gICAgICAnbW91c2VlbnRlcic6ICdtb3VzZUVudGVyJyxcbiAgICAgICdtb3VzZWxlYXZlJzogJ21vdXNlTGVhdmUnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSAwXG4gICAgdGhpcy5wbGF5YmFjayA9IG9wdGlvbnMucGxheWJhY2s7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMucGxheWJhY2suc2V0dGluZ3M7XG4gICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMucGx1Z2lucyA9IFt0aGlzLnBsYXliYWNrXTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUFJPR1JFU1MsIHRoaXMucHJvZ3Jlc3MpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRoaXMudGltZVVwZGF0ZWQpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLnJlYWR5KTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19CVUZGRVJJTkcsIHRoaXMuYnVmZmVyaW5nKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCB0aGlzLmJ1ZmZlcmZ1bGwpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFLCB0aGlzLnNldHRpbmdzVXBkYXRlKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19MT0FERURNRVRBREFUQSwgdGhpcy5sb2FkZWRNZXRhZGF0YSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfSElHSERFRklOSVRJT05VUERBVEUsIHRoaXMuaGlnaERlZmluaXRpb25VcGRhdGUpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX0JJVFJBVEUsIHRoaXMudXBkYXRlQml0cmF0ZSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUExBWUJBQ0tTVEFURSwgdGhpcy5wbGF5YmFja1N0YXRlQ2hhbmdlZCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfRFZSLCB0aGlzLnBsYXliYWNrRHZyU3RhdGVDaGFuZ2VkKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRElTQUJMRSwgdGhpcy5kaXNhYmxlTWVkaWFDb250cm9sKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRU5BQkxFLCB0aGlzLmVuYWJsZU1lZGlhQ29udHJvbCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfRU5ERUQsIHRoaXMuZW5kZWQpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1BMQVksIHRoaXMucGxheWluZyk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBsYXliYWNrLCBFdmVudHMuUExBWUJBQ0tfUEFVU0UsIHRoaXMucGF1c2VkKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19FUlJPUiwgdGhpcy5lcnJvcik7XG4gIH1cblxuICBwbGF5YmFja1N0YXRlQ2hhbmdlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS1NUQVRFKTtcbiAgfVxuXG4gIHBsYXliYWNrRHZyU3RhdGVDaGFuZ2VkKGR2ckluVXNlKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMucGxheWJhY2suc2V0dGluZ3NcbiAgICB0aGlzLmR2ckluVXNlID0gZHZySW5Vc2VcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCwgZHZySW5Vc2UpXG4gIH1cblxuICB1cGRhdGVCaXRyYXRlKG5ld0JpdHJhdGUpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9CSVRSQVRFLCBuZXdCaXRyYXRlKVxuICB9XG5cbiAgc3RhdHNSZXBvcnQobWV0cmljcykge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NUQVRTX1JFUE9SVCwgbWV0cmljcylcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFjay5nZXRQbGF5YmFja1R5cGUoKVxuICB9XG5cbiAgaXNEdnJFbmFibGVkKCkge1xuICAgIHJldHVybiAhIXRoaXMucGxheWJhY2suZHZyRW5hYmxlZFxuICB9XG5cbiAgaXNEdnJJblVzZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLmR2ckluVXNlXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCwgdGhpcywgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnBsYXliYWNrLmRlc3Ryb3koKTtcbiAgICB0aGlzLnBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiBwbHVnaW4uZGVzdHJveSgpKVxuICAgIHRoaXMuJGVsLnJlbW92ZSgpO1xuICB9XG5cbiAgc2V0U3R5bGUoc3R5bGUpIHtcbiAgICB0aGlzLiRlbC5jc3Moc3R5bGUpO1xuICB9XG5cbiAgYW5pbWF0ZShzdHlsZSwgZHVyYXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy4kZWwuYW5pbWF0ZShzdHlsZSwgZHVyYXRpb24pLnByb21pc2UoKTtcbiAgfVxuXG4gIHJlYWR5KCkge1xuICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUkVBRFksIHRoaXMubmFtZSk7XG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWJhY2suaXNQbGF5aW5nKCk7XG4gIH1cblxuICBnZXRDdXJyZW50VGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VGltZVxuICB9XG5cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWJhY2suZ2V0RHVyYXRpb24oKTtcbiAgfVxuXG4gIGVycm9yKGVycm9yT2JqKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfRVJST1IsIHtlcnJvcjogZXJyb3JPYmosIGNvbnRhaW5lcjogdGhpc30sIHRoaXMubmFtZSk7XG4gIH1cblxuICBsb2FkZWRNZXRhZGF0YShkdXJhdGlvbikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0xPQURFRE1FVEFEQVRBLCBkdXJhdGlvbik7XG4gIH1cblxuICB0aW1lVXBkYXRlZChwb3NpdGlvbiwgZHVyYXRpb24pIHtcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gcG9zaXRpb25cbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFLCBwb3NpdGlvbiwgZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgfVxuXG4gIHByb2dyZXNzKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uLCBkdXJhdGlvbikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BST0dSRVNTLCBzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbiwgZHVyYXRpb24sIHRoaXMubmFtZSk7XG4gIH1cblxuICBwbGF5aW5nKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BMQVksIHRoaXMubmFtZSk7XG4gIH1cblxuICBwYXVzZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfUEFVU0UsIHRoaXMubmFtZSk7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMucGxheWJhY2sucGxheSgpO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucGxheWJhY2suc3RvcCgpO1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSAwXG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLnBsYXliYWNrLnBhdXNlKCk7XG4gIH1cblxuICBlbmRlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcywgdGhpcy5uYW1lKTtcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gMFxuICB9XG5cbiAgY2xpY2tlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9DTElDSywgdGhpcywgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGRibENsaWNrZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfREJMQ0xJQ0ssIHRoaXMsIHRoaXMubmFtZSk7XG4gIH1cblxuICBzZXRDdXJyZW50VGltZSh0aW1lKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfU0VFSywgdGltZSwgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnBsYXliYWNrLnNlZWsodGltZSk7XG4gIH1cblxuICBzZXRWb2x1bWUodmFsdWUpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9WT0xVTUUsIHZhbHVlLCB0aGlzLm5hbWUpO1xuICAgIHRoaXMucGxheWJhY2sudm9sdW1lKHZhbHVlKTtcbiAgfVxuXG4gIGZ1bGxzY3JlZW4oKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5DT05UQUlORVJfRlVMTFNDUkVFTiwgdGhpcy5uYW1lKTtcbiAgfVxuXG4gIGJ1ZmZlcmluZygpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJJTkcsIHRoaXMubmFtZSk7XG4gIH1cblxuICBidWZmZXJmdWxsKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMubmFtZSk7XG4gIH1cblxuICBhZGRQbHVnaW4ocGx1Z2luKSB7XG4gICAgdGhpcy5wbHVnaW5zLnB1c2gocGx1Z2luKTtcbiAgfVxuXG4gIGhhc1BsdWdpbihuYW1lKSB7XG4gICAgcmV0dXJuICEhdGhpcy5nZXRQbHVnaW4obmFtZSk7XG4gIH1cblxuICBnZXRQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiBmaW5kKHRoaXMucGx1Z2lucywgKHBsdWdpbikgPT4geyByZXR1cm4gcGx1Z2luLm5hbWUgPT09IG5hbWUgfSk7XG4gIH1cblxuICBtb3VzZUVudGVyKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX01PVVNFX0VOVEVSKVxuICB9XG5cbiAgbW91c2VMZWF2ZSgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9NT1VTRV9MRUFWRSlcbiAgfVxuXG4gIHNldHRpbmdzVXBkYXRlKCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLnBsYXliYWNrLnNldHRpbmdzO1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1NFVFRJTkdTVVBEQVRFKTtcbiAgfVxuXG4gIGhpZ2hEZWZpbml0aW9uVXBkYXRlKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX0hJR0hERUZJTklUSU9OVVBEQVRFKTtcbiAgfVxuXG4gIGlzSGlnaERlZmluaXRpb25JblVzZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFjay5pc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKVxuICB9XG5cbiAgZGlzYWJsZU1lZGlhQ29udHJvbCgpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbERpc2FibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRElTQUJMRSk7XG4gIH1cblxuICBlbmFibGVNZWRpYUNvbnRyb2woKSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2xEaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9FTkFCTEUpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcignY29udGFpbmVyJyk7XG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKTtcbiAgICB0aGlzLiRlbC5hcHBlbmQodGhpcy5wbGF5YmFjay5yZW5kZXIoKS5lbCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb250YWluZXI7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG4vKipcbiAqIFRoZSBDb250YWluZXJGYWN0b3J5IGlzIHJlc3BvbnNpYmxlIGZvciBtYW5hZ2UgcGxheWJhY2sgYm9vdHN0cmFwIGFuZCBjcmVhdGUgY29udGFpbmVycy5cbiAqL1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpO1xudmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2Jhc2Vfb2JqZWN0Jyk7XG52YXIgQ29udGFpbmVyID0gcmVxdWlyZSgnLi4vY29udGFpbmVyJyk7XG52YXIgJCA9IHJlcXVpcmUoJ2NsYXBwci16ZXB0bycpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJyk7XG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJyk7XG5cbmNsYXNzIENvbnRhaW5lckZhY3RvcnkgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucywgbG9hZGVyKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmxvYWRlciA9IGxvYWRlcjtcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcnMoKSB7XG4gICAgcmV0dXJuICQuRGVmZXJyZWQoKHByb21pc2UpID0+IHtcbiAgICAgIHByb21pc2UucmVzb2x2ZSh0aGlzLm9wdGlvbnMuc291cmNlcy5tYXAoKHNvdXJjZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVDb250YWluZXIoc291cmNlKTtcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRQbGF5YmFja1BsdWdpbihzb3VyY2UpIHtcbiAgICByZXR1cm4gZmluZCh0aGlzLmxvYWRlci5wbGF5YmFja1BsdWdpbnMsIChwKSA9PiB7IHJldHVybiBwLmNhblBsYXkoc291cmNlLnRvU3RyaW5nKCksIHRoaXMub3B0aW9ucy5taW1lVHlwZSkgfSlcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcihzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICBpZiAoISFzb3VyY2UubWF0Y2goL15cXC9cXC8vKSkgc291cmNlID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgc291cmNlXG4gICAgb3B0aW9ucyA9IGFzc2lnbih7fSwgb3B0aW9ucywgdGhpcy5vcHRpb25zLCB7c3JjOiBzb3VyY2UsIGF1dG9QbGF5OiAhIXRoaXMub3B0aW9ucy5hdXRvUGxheX0pXG4gICAgdmFyIHBsYXliYWNrUGx1Z2luID0gdGhpcy5maW5kUGxheWJhY2tQbHVnaW4oc291cmNlKVxuICAgIHZhciBwbGF5YmFjayA9IG5ldyBwbGF5YmFja1BsdWdpbihvcHRpb25zKVxuICAgIHZhciBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyKHtwbGF5YmFjazogcGxheWJhY2t9KVxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKVxuICAgIGRlZmVyLnByb21pc2UoY29udGFpbmVyKVxuICAgIHRoaXMuYWRkQ29udGFpbmVyUGx1Z2lucyhjb250YWluZXIsIHNvdXJjZSlcbiAgICB0aGlzLmxpc3RlblRvT25jZShjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUkVBRFksICgpID0+IGRlZmVyLnJlc29sdmUoY29udGFpbmVyKSlcbiAgICByZXR1cm4gY29udGFpbmVyXG4gIH1cblxuICBhZGRDb250YWluZXJQbHVnaW5zKGNvbnRhaW5lciwgc291cmNlKSB7XG4gICAgdGhpcy5sb2FkZXIuY29udGFpbmVyUGx1Z2lucy5mb3JFYWNoKChQbHVnaW4pID0+IHtcbiAgICAgIHZhciBvcHRpb25zID0gYXNzaWduKHRoaXMub3B0aW9ucywge2NvbnRhaW5lcjogY29udGFpbmVyLCBzcmM6IHNvdXJjZX0pO1xuICAgICAgY29udGFpbmVyLmFkZFBsdWdpbihuZXcgUGx1Z2luKG9wdGlvbnMpKTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhaW5lckZhY3Rvcnk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29udGFpbmVyX2ZhY3RvcnknKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuLyoqXG4gKiBUaGUgQ29yZSBpcyByZXNwb25zaWJsZSB0byBtYW5hZ2UgQ29udGFpbmVycywgdGhlIG1lZGlhdG9yLCBNZWRpYUNvbnRyb2xcbiAqIGFuZCB0aGUgcGxheWVyIHN0YXRlLlxuICovXG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guYXNzaWduJylcbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJylcblxudmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91aV9vYmplY3QnKVxudmFyIENvbnRhaW5lckZhY3RvcnkgPSByZXF1aXJlKCcuLi9jb250YWluZXJfZmFjdG9yeScpXG52YXIgRnVsbHNjcmVlbiA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdXRpbHMnKS5GdWxsc2NyZWVuXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIE1lZGlhQ29udHJvbCA9IHJlcXVpcmUoJy4uL21lZGlhX2NvbnRyb2wnKVxudmFyIFBsYXllckluZm8gPSByZXF1aXJlKCcuLi9wbGF5ZXJfaW5mbycpXG52YXIgTWVkaWF0b3IgPSByZXF1aXJlKCcuLi9tZWRpYXRvcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxudmFyIEJyb3dzZXIgPSByZXF1aXJlKCcuLi9icm93c2VyJylcblxudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpXG52YXIgaXNOdW1iZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykuaXNOdW1iZXJcbnZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG52YXIgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3V0aWxzJykuY2FuY2VsQW5pbWF0aW9uRnJhbWVcblxuY2xhc3MgQ29yZSBleHRlbmRzIFVJT2JqZWN0IHtcbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnOiAnZXhpdCcsXG4gICAgICAnbW91c2Vtb3ZlJzogJ3Nob3dNZWRpYUNvbnRyb2wnLFxuICAgICAgJ21vdXNlbGVhdmUnOiAnaGlkZU1lZGlhQ29udHJvbCdcbiAgICB9XG4gIH1cblxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2RhdGEtcGxheWVyJzogJycsXG4gICAgICB0YWJpbmRleDogOTk5OSxcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICBQbGF5ZXJJbmZvLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMucGx1Z2lucyA9IFtdXG4gICAgdGhpcy5jb250YWluZXJzID0gW11cbiAgICB0aGlzLmNyZWF0ZUNvbnRhaW5lcnMob3B0aW9ucylcbiAgICAvL0ZJWE1FIGZ1bGxzY3JlZW4gYXBpIHN1Y2tzXG4gICAgJChkb2N1bWVudCkuYmluZCgnZnVsbHNjcmVlbmNoYW5nZScsICgpID0+IHRoaXMuZXhpdCgpKVxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ01TRnVsbHNjcmVlbkNoYW5nZScsICgpID0+IHRoaXMuZXhpdCgpKVxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCAoKSA9PiB0aGlzLmV4aXQoKSlcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcnMob3B0aW9ucykge1xuICAgIHRoaXMuZGVmZXIgPSAkLkRlZmVycmVkKClcbiAgICB0aGlzLmRlZmVyLnByb21pc2UodGhpcylcbiAgICB0aGlzLmNvbnRhaW5lckZhY3RvcnkgPSBuZXcgQ29udGFpbmVyRmFjdG9yeShvcHRpb25zLCBvcHRpb25zLmxvYWRlcilcbiAgICB0aGlzLmNvbnRhaW5lckZhY3RvcnlcbiAgICAgIC5jcmVhdGVDb250YWluZXJzKClcbiAgICAgIC50aGVuKChjb250YWluZXJzKSA9PiB0aGlzLnNldHVwQ29udGFpbmVycyhjb250YWluZXJzKSlcbiAgICAgIC50aGVuKChjb250YWluZXJzKSA9PiB0aGlzLnJlc29sdmVPbkNvbnRhaW5lcnNSZWFkeShjb250YWluZXJzKSlcbiAgfVxuXG4gIHVwZGF0ZVNpemUoKSB7XG4gICAgaWYgKEZ1bGxzY3JlZW4uaXNGdWxsc2NyZWVuKCkpIHtcbiAgICAgIHRoaXMuc2V0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0UGxheWVyU2l6ZSgpXG4gICAgfVxuICAgIE1lZGlhdG9yLnRyaWdnZXIoRXZlbnRzLlBMQVlFUl9SRVNJWkUpXG4gIH1cblxuICBzZXRGdWxsc2NyZWVuKCkge1xuICAgIGlmKCFCcm93c2VyLmlzaU9zKSB7XG4gICAgICB0aGlzLiRlbC5hZGRDbGFzcygnZnVsbHNjcmVlbicpXG4gICAgICB0aGlzLiRlbC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICBQbGF5ZXJJbmZvLnByZXZpb3VzU2l6ZSA9IFBsYXllckluZm8uY3VycmVudFNpemVcbiAgICAgIFBsYXllckluZm8uY3VycmVudFNpemUgPSB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfVxuICAgIH1cbiAgfVxuXG4gIHNldFBsYXllclNpemUoKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2Z1bGxzY3JlZW4nKVxuICAgIFBsYXllckluZm8uY3VycmVudFNpemUgPSBQbGF5ZXJJbmZvLnByZXZpb3VzU2l6ZVxuICAgIFBsYXllckluZm8ucHJldmlvdXNTaXplID0geyB3aWR0aDogJCh3aW5kb3cpLndpZHRoKCksIGhlaWdodDogJCh3aW5kb3cpLmhlaWdodCgpIH1cbiAgICB0aGlzLnJlc2l6ZShQbGF5ZXJJbmZvLmN1cnJlbnRTaXplKVxuICB9XG5cbiAgcmVzaXplKG9wdGlvbnMpIHtcbiAgICBpZiAoIWlzTnVtYmVyKG9wdGlvbnMuaGVpZ2h0KSAmJiAhaXNOdW1iZXIob3B0aW9ucy53aWR0aCkpICB7XG4gICAgICB0aGlzLmVsLnN0eWxlLmhlaWdodCA9IGAke29wdGlvbnMuaGVpZ2h0fWA7XG4gICAgICB0aGlzLmVsLnN0eWxlLndpZHRoID0gYCR7b3B0aW9ucy53aWR0aH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsLnN0eWxlLmhlaWdodCA9IGAke29wdGlvbnMuaGVpZ2h0fXB4YDtcbiAgICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBgJHtvcHRpb25zLndpZHRofXB4YDtcbiAgICB9XG4gICAgUGxheWVySW5mby5wcmV2aW91c1NpemUgPSBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplXG4gICAgUGxheWVySW5mby5jdXJyZW50U2l6ZSA9IG9wdGlvbnNcbiAgICBNZWRpYXRvci50cmlnZ2VyKEV2ZW50cy5QTEFZRVJfUkVTSVpFKVxuICB9XG5cbiAgZW5hYmxlUmVzaXplT2JzZXJ2ZXIoKSB7XG4gICAgdmFyIGNoZWNrU2l6ZUNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucmVxQW5pbUZyYW1lKSBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlcUFuaW1GcmFtZSlcbiAgICAgIGlmICh0aGlzLnByZXZpb3VzU2l6ZS53aWR0aCAhPSB0aGlzLiRlbC53aWR0aCgpIHx8XG4gICAgICAgICAgdGhpcy5wcmV2aW91c1NpemUuaGVpZ2h0ICE9IHRoaXMuJGVsLmhlaWdodCgpKSB7XG4gICAgICAgIE1lZGlhdG9yLnRyaWdnZXIoRXZlbnRzLlBMQVlFUl9SRVNJWkUpXG4gICAgICAgIHRoaXMucHJldmlvdXNTaXplID0geyB3aWR0aDogdGhpcy4kZWwud2lkdGgoKSwgaGVpZ2h0OiB0aGlzLiRlbC5oZWlnaHQoKSB9XG4gICAgICB9XG4gICAgICB0aGlzLnJlcUFuaW1GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShjaGVja1NpemVDYWxsYmFjaylcbiAgICB9XG5cbiAgICB0aGlzLnJlcUFuaW1GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShjaGVja1NpemVDYWxsYmFjaylcbiAgfVxuXG4gIGRpc2FibGVSZXNpemVPYnNlcnZlcigpIHtcbiAgICBpZiAodGhpcy5yZXFBbmltRnJhbWUpIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmVxQW5pbUZyYW1lKVxuICB9XG5cbiAgcmVzb2x2ZU9uQ29udGFpbmVyc1JlYWR5KGNvbnRhaW5lcnMpIHtcbiAgICAkLndoZW4uYXBwbHkoJCwgY29udGFpbmVycykuZG9uZSgoKSA9PnRoaXMuZGVmZXIucmVzb2x2ZSh0aGlzKSlcbiAgfVxuXG4gIGFkZFBsdWdpbihwbHVnaW4pIHtcbiAgICB0aGlzLnBsdWdpbnMucHVzaChwbHVnaW4pXG4gIH1cblxuICBoYXNQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiAhIXRoaXMuZ2V0UGx1Z2luKG5hbWUpXG4gIH1cblxuICBnZXRQbHVnaW4obmFtZSkge1xuICAgIHJldHVybiBmaW5kKHRoaXMucGx1Z2lucywgKHBsdWdpbikgPT4gcGx1Z2luLm5hbWUgPT09IG5hbWUpXG4gIH1cblxuICBsb2FkKHNvdXJjZXMsIG1pbWVUeXBlKSB7XG4gICAgdGhpcy5vcHRpb25zLm1pbWVUeXBlID0gbWltZVR5cGVcbiAgICBzb3VyY2VzID0gc291cmNlcyAmJiBzb3VyY2VzLmNvbnN0cnVjdG9yID09PSBBcnJheSA/IHNvdXJjZXMgOiBbc291cmNlcy50b1N0cmluZygpXTtcbiAgICB0aGlzLmNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiBjb250YWluZXIuZGVzdHJveSgpKVxuICAgIHRoaXMuY29udGFpbmVyRmFjdG9yeS5vcHRpb25zID0gYXNzaWduKHRoaXMub3B0aW9ucywge3NvdXJjZXN9KVxuICAgIHRoaXMuY29udGFpbmVyRmFjdG9yeS5jcmVhdGVDb250YWluZXJzKCkudGhlbigoY29udGFpbmVycykgPT4ge1xuICAgICAgdGhpcy5zZXR1cENvbnRhaW5lcnMoY29udGFpbmVycylcbiAgICB9KVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc2FibGVSZXNpemVPYnNlcnZlcigpXG4gICAgdGhpcy5jb250YWluZXJzLmZvckVhY2goKGNvbnRhaW5lcikgPT4gY29udGFpbmVyLmRlc3Ryb3koKSlcbiAgICB0aGlzLnBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiBwbHVnaW4uZGVzdHJveSgpKVxuICAgIHRoaXMuJGVsLnJlbW92ZSgpXG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuZGVzdHJveSgpXG4gICAgJChkb2N1bWVudCkudW5iaW5kKCdmdWxsc2NyZWVuY2hhbmdlJylcbiAgICAkKGRvY3VtZW50KS51bmJpbmQoJ01TRnVsbHNjcmVlbkNoYW5nZScpXG4gICAgJChkb2N1bWVudCkudW5iaW5kKCdtb3pmdWxsc2NyZWVuY2hhbmdlJylcbn1cblxuICBleGl0KCkge1xuICAgIHRoaXMudXBkYXRlU2l6ZSgpXG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuc2hvdygpXG4gIH1cblxuICBzZXRNZWRpYUNvbnRyb2xDb250YWluZXIoY29udGFpbmVyKSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuc2V0Q29udGFpbmVyKGNvbnRhaW5lcilcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5yZW5kZXIoKVxuICB9XG5cbiAgZGlzYWJsZU1lZGlhQ29udHJvbCgpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5kaXNhYmxlKClcbiAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygnbm9jdXJzb3InKVxuICB9XG5cbiAgZW5hYmxlTWVkaWFDb250cm9sKCkge1xuICAgIHRoaXMubWVkaWFDb250cm9sLmVuYWJsZSgpXG4gIH1cblxuICByZW1vdmVDb250YWluZXIoY29udGFpbmVyKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKGNvbnRhaW5lcilcbiAgICB0aGlzLmNvbnRhaW5lcnMgPSB0aGlzLmNvbnRhaW5lcnMuZmlsdGVyKChjKSA9PiBjICE9PSBjb250YWluZXIpXG4gIH1cblxuICBhcHBlbmRDb250YWluZXIoY29udGFpbmVyKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyhjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfREVTVFJPWUVELCB0aGlzLnJlbW92ZUNvbnRhaW5lcilcbiAgICB0aGlzLmVsLmFwcGVuZENoaWxkKGNvbnRhaW5lci5yZW5kZXIoKS5lbClcbiAgICB0aGlzLmNvbnRhaW5lcnMucHVzaChjb250YWluZXIpXG4gIH1cblxuICBzZXR1cENvbnRhaW5lcnMoY29udGFpbmVycykge1xuICAgIGNvbnRhaW5lcnMubWFwKHRoaXMuYXBwZW5kQ29udGFpbmVyLmJpbmQodGhpcykpXG4gICAgdGhpcy5zZXR1cE1lZGlhQ29udHJvbCh0aGlzLmdldEN1cnJlbnRDb250YWluZXIoKSlcbiAgICB0aGlzLnJlbmRlcigpXG4gICAgdGhpcy4kZWwuYXBwZW5kVG8odGhpcy5vcHRpb25zLnBhcmVudEVsZW1lbnQpXG4gICAgcmV0dXJuIGNvbnRhaW5lcnNcbiAgfVxuXG4gIGNyZWF0ZUNvbnRhaW5lcihzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXJGYWN0b3J5LmNyZWF0ZUNvbnRhaW5lcihzb3VyY2UsIG9wdGlvbnMpXG4gICAgdGhpcy5hcHBlbmRDb250YWluZXIoY29udGFpbmVyKVxuICAgIHJldHVybiBjb250YWluZXJcbiAgfVxuXG4gIHNldHVwTWVkaWFDb250cm9sKGNvbnRhaW5lcikge1xuICAgIGlmICh0aGlzLm1lZGlhQ29udHJvbCkge1xuICAgICAgdGhpcy5tZWRpYUNvbnRyb2wuc2V0Q29udGFpbmVyKGNvbnRhaW5lcilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZWRpYUNvbnRyb2wgPSB0aGlzLmNyZWF0ZU1lZGlhQ29udHJvbChhc3NpZ24oe2NvbnRhaW5lcjogY29udGFpbmVyLCBmb2N1c0VsZW1lbnQ6IHRoaXMuZWx9LCB0aGlzLm9wdGlvbnMpKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1lZGlhQ29udHJvbCwgRXZlbnRzLk1FRElBQ09OVFJPTF9GVUxMU0NSRUVOLCB0aGlzLnRvZ2dsZUZ1bGxzY3JlZW4pXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX1NIT1csIHRoaXMub25NZWRpYUNvbnRyb2xTaG93LmJpbmQodGhpcywgdHJ1ZSkpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX0hJREUsIHRoaXMub25NZWRpYUNvbnRyb2xTaG93LmJpbmQodGhpcywgZmFsc2UpKVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZU1lZGlhQ29udHJvbChvcHRpb25zKSB7XG4gICAgaWYob3B0aW9ucy5tZWRpYWNvbnRyb2wgJiYgb3B0aW9ucy5tZWRpYWNvbnRyb2wuZXh0ZXJuYWwpIHtcbiAgICAgIHJldHVybiBuZXcgb3B0aW9ucy5tZWRpYWNvbnRyb2wuZXh0ZXJuYWwob3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgTWVkaWFDb250cm9sKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGdldEN1cnJlbnRDb250YWluZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyc1swXVxuICB9XG5cbiAgdG9nZ2xlRnVsbHNjcmVlbigpIHtcbiAgICBpZiAoIUZ1bGxzY3JlZW4uaXNGdWxsc2NyZWVuKCkpIHtcbiAgICAgIEZ1bGxzY3JlZW4ucmVxdWVzdEZ1bGxzY3JlZW4odGhpcy5lbClcbiAgICAgIGlmKCFCcm93c2VyLmlzaU9zKSB7XG4gICAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdmdWxsc2NyZWVuJylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgRnVsbHNjcmVlbi5jYW5jZWxGdWxsc2NyZWVuKClcbiAgICAgIGlmKCFCcm93c2VyLmlzaU9zKSB7XG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdmdWxsc2NyZWVuIG5vY3Vyc29yJylcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuc2hvdygpXG4gIH1cblxuICBzaG93TWVkaWFDb250cm9sKGV2ZW50KSB7XG4gICAgdGhpcy5tZWRpYUNvbnRyb2wuc2hvdyhldmVudClcbiAgfVxuXG4gIGhpZGVNZWRpYUNvbnRyb2woZXZlbnQpIHtcbiAgICB0aGlzLm1lZGlhQ29udHJvbC5oaWRlKGV2ZW50KVxuICB9XG5cbiAgb25NZWRpYUNvbnRyb2xTaG93KHNob3dpbmcpIHtcbiAgICBpZiAoc2hvd2luZylcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdub2N1cnNvcicpXG4gICAgZWxzZSBpZiAoRnVsbHNjcmVlbi5pc0Z1bGxzY3JlZW4oKSlcbiAgICAgIHRoaXMuJGVsLmFkZENsYXNzKCdub2N1cnNvcicpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKCdjb3JlJylcbiAgICAvL0ZJWE1FXG4gICAgLy90aGlzLiRlbC5lbXB0eSgpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHRoaXMuJGVsLmFwcGVuZCh0aGlzLm1lZGlhQ29udHJvbC5yZW5kZXIoKS5lbClcblxuICAgIHRoaXMub3B0aW9ucy53aWR0aCA9IHRoaXMub3B0aW9ucy53aWR0aCB8fCB0aGlzLiRlbC53aWR0aCgpXG4gICAgdGhpcy5vcHRpb25zLmhlaWdodCA9IHRoaXMub3B0aW9ucy5oZWlnaHQgfHwgdGhpcy4kZWwuaGVpZ2h0KClcbiAgICB2YXIgc2l6ZSA9IHt3aWR0aDogdGhpcy5vcHRpb25zLndpZHRoLCBoZWlnaHQ6IHRoaXMub3B0aW9ucy5oZWlnaHR9XG4gICAgUGxheWVySW5mby5wcmV2aW91c1NpemUgPSBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplID0gc2l6ZVxuICAgIHRoaXMudXBkYXRlU2l6ZSgpXG5cbiAgICB0aGlzLnByZXZpb3VzU2l6ZSA9IHsgd2lkdGg6IHRoaXMuJGVsLndpZHRoKCksIGhlaWdodDogdGhpcy4kZWwuaGVpZ2h0KCkgfVxuXG4gICAgdGhpcy5lbmFibGVSZXNpemVPYnNlcnZlcigpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29yZVxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuLyoqXG4gKiBUaGUgQ29yZSBGYWN0b3J5IGlzIHJlc3BvbnNpYmxlIGZvciBpbnN0YW50aWF0ZSB0aGUgY29yZSBhbmQgaXQncyBwbHVnaW5zLlxuICovXG5cbnZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9iYXNlX29iamVjdCcpO1xudmFyIENvcmUgPSByZXF1aXJlKCcuLi9jb3JlJyk7XG5cbmNsYXNzIENvcmVGYWN0b3J5IGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKHBsYXllciwgbG9hZGVyKSB7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXJcbiAgICB0aGlzLm9wdGlvbnMgPSBwbGF5ZXIub3B0aW9uc1xuICAgIHRoaXMubG9hZGVyID0gbG9hZGVyXG4gICAgdGhpcy5vcHRpb25zLmxvYWRlciA9IHRoaXMubG9hZGVyXG4gIH1cblxuICBjcmVhdGUoKSB7XG4gICAgdGhpcy5jb3JlID0gbmV3IENvcmUodGhpcy5vcHRpb25zKVxuICAgIHRoaXMuY29yZS50aGVuKHRoaXMuYWRkQ29yZVBsdWdpbnMuYmluZCh0aGlzKSlcbiAgICByZXR1cm4gdGhpcy5jb3JlXG4gIH1cblxuICBhZGRDb3JlUGx1Z2lucygpIHtcbiAgICB0aGlzLmxvYWRlci5jb3JlUGx1Z2lucy5mb3JFYWNoKChQbHVnaW4pID0+IHtcbiAgICAgIHZhciBwbHVnaW4gPSBuZXcgUGx1Z2luKHRoaXMuY29yZSlcbiAgICAgIHRoaXMuY29yZS5hZGRQbHVnaW4ocGx1Z2luKVxuICAgICAgdGhpcy5zZXR1cEV4dGVybmFsSW50ZXJmYWNlKHBsdWdpbilcbiAgICB9KVxuICAgIHJldHVybiB0aGlzLmNvcmVcbiAgfVxuXG4gIHNldHVwRXh0ZXJuYWxJbnRlcmZhY2UocGx1Z2luKSB7XG4gICAgdmFyIGV4dGVybmFsRnVuY3Rpb25zID0gcGx1Z2luLmdldEV4dGVybmFsSW50ZXJmYWNlKCk7XG4gICAgZm9yICh2YXIga2V5IGluIGV4dGVybmFsRnVuY3Rpb25zKSB7XG4gICAgICB0aGlzLnBsYXllcltrZXldID0gZXh0ZXJuYWxGdW5jdGlvbnNba2V5XS5iaW5kKHBsdWdpbilcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3JlRmFjdG9yeTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb3JlX2ZhY3RvcnknKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xvYWRlcicpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvYmFzZV9vYmplY3QnKVxudmFyIFBsYXllckluZm8gPSByZXF1aXJlKCcuLi9wbGF5ZXJfaW5mbycpXG52YXIgdW5pcSA9IHJlcXVpcmUoJ2xvZGFzaC51bmlxJylcblxuLyogUGxheWJhY2sgUGx1Z2lucyAqL1xudmFyIEhUTUw1VmlkZW9QbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9odG1sNV92aWRlbycpO1xudmFyIEZsYXNoVmlkZW9QbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9mbGFzaCcpO1xudmFyIEhUTUw1QXVkaW9QbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9odG1sNV9hdWRpbycpO1xudmFyIEhMU1ZpZGVvUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9wbGF5YmFja3MvaGxzJyk7XG52YXIgSFRNTEltZ1BsYXliYWNrID0gcmVxdWlyZSgnLi4vLi4vcGxheWJhY2tzL2h0bWxfaW1nJyk7XG52YXIgTm9PcCA9IHJlcXVpcmUoJy4uLy4uL3BsYXliYWNrcy9ub19vcCcpO1xuXG4vKiBDb250YWluZXIgUGx1Z2lucyAqL1xudmFyIFNwaW5uZXJUaHJlZUJvdW5jZVBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvc3Bpbm5lcl90aHJlZV9ib3VuY2UnKTtcbnZhciBTdGF0c1BsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvc3RhdHMnKTtcbnZhciBXYXRlck1hcmtQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9wbHVnaW5zL3dhdGVybWFyaycpO1xudmFyIFBvc3RlclBsdWdpbiA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvcG9zdGVyJyk7XG52YXIgR29vZ2xlQW5hbHl0aWNzUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9nb29nbGVfYW5hbHl0aWNzJyk7XG52YXIgQ2xpY2tUb1BhdXNlUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vcGx1Z2lucy9jbGlja190b19wYXVzZScpO1xuXG4vKiBDb3JlIFBsdWdpbnMgKi9cbnZhciBEVlJDb250cm9scyA9IHJlcXVpcmUoJy4uLy4uL3BsdWdpbnMvZHZyX2NvbnRyb2xzJyk7XG5cbmNsYXNzIExvYWRlciBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihleHRlcm5hbFBsdWdpbnMpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5wbGF5YmFja1BsdWdpbnMgPSBbSFRNTDVBdWRpb1BsYXliYWNrLCBIVE1MNVZpZGVvUGxheWJhY2ssIEZsYXNoVmlkZW9QbGF5YmFjaywgSExTVmlkZW9QbGF5YmFjaywgSFRNTEltZ1BsYXliYWNrLCBOb09wXVxuICAgIHRoaXMuY29udGFpbmVyUGx1Z2lucyA9IFtTcGlubmVyVGhyZWVCb3VuY2VQbHVnaW4sIFdhdGVyTWFya1BsdWdpbiwgUG9zdGVyUGx1Z2luLCBTdGF0c1BsdWdpbiwgR29vZ2xlQW5hbHl0aWNzUGx1Z2luLCBDbGlja1RvUGF1c2VQbHVnaW5dXG4gICAgdGhpcy5jb3JlUGx1Z2lucyA9IFtEVlJDb250cm9sc11cbiAgICBpZiAoZXh0ZXJuYWxQbHVnaW5zKSB7XG4gICAgICB0aGlzLmFkZEV4dGVybmFsUGx1Z2lucyhleHRlcm5hbFBsdWdpbnMpXG4gICAgfVxuICB9XG5cbiAgYWRkRXh0ZXJuYWxQbHVnaW5zKHBsdWdpbnMpIHtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGZ1bmN0aW9uKHBsdWdpbikgeyByZXR1cm4gcGx1Z2luLnByb3RvdHlwZS5uYW1lIH1cbiAgICBpZiAocGx1Z2lucy5wbGF5YmFjaykgeyB0aGlzLnBsYXliYWNrUGx1Z2lucyA9IHVuaXEocGx1Z2lucy5wbGF5YmFjay5jb25jYXQodGhpcy5wbGF5YmFja1BsdWdpbnMpLCBwbHVnaW5OYW1lKSB9XG4gICAgaWYgKHBsdWdpbnMuY29udGFpbmVyKSB7IHRoaXMuY29udGFpbmVyUGx1Z2lucyA9IHVuaXEocGx1Z2lucy5jb250YWluZXIuY29uY2F0KHRoaXMuY29udGFpbmVyUGx1Z2lucyksIHBsdWdpbk5hbWUpIH1cbiAgICBpZiAocGx1Z2lucy5jb3JlKSB7IHRoaXMuY29yZVBsdWdpbnMgPSB1bmlxKHBsdWdpbnMuY29yZS5jb25jYXQodGhpcy5jb3JlUGx1Z2lucyksIHBsdWdpbk5hbWUpIH1cbiAgICBQbGF5ZXJJbmZvLnBsYXliYWNrUGx1Z2lucyA9IHRoaXMucGxheWJhY2tQbHVnaW5zXG4gIH1cblxuICBnZXRQbHVnaW4obmFtZSkge1xuICAgIHZhciBhbGxQbHVnaW5zID0gdGhpcy5jb250YWluZXJQbHVnaW5zLmNvbmNhdCh0aGlzLnBsYXliYWNrUGx1Z2lucykuY29uY2F0KHRoaXMuY29yZVBsdWdpbnMpXG4gICAgcmV0dXJuIGFsbFBsdWdpbnMuZmluZCgocGx1Z2luKSA9PiB7IHJldHVybiBwbHVnaW4ucHJvdG90eXBlLm5hbWUgPT09IG5hbWUgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogVGhlIE1lZGlhQ29udHJvbCBpcyByZXNwb25zaWJsZSBmb3IgZGlzcGxheWluZyB0aGUgUGxheWVyIGNvbnRyb2xzLlxuICovXG5cbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIFVJT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91aV9vYmplY3QnKVxudmFyIFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJy4uL2Jyb3dzZXInKVxudmFyIFNlZWtUaW1lID0gcmVxdWlyZSgnLi4vc2Vla190aW1lJylcbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJy4uL21lZGlhdG9yJylcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgnLi4vcGxheWVyX2luZm8nKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcbnZhciBLaWJvID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9raWJvJylcblxuY2xhc3MgTWVkaWFDb250cm9sIGV4dGVuZHMgVUlPYmplY3Qge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdNZWRpYUNvbnRyb2wnIH1cblxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3M6ICdtZWRpYS1jb250cm9sJyxcbiAgICAgICdkYXRhLW1lZGlhLWNvbnRyb2wnOiAnJ1xuICAgIH1cbiAgfVxuXG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGljayBbZGF0YS1wbGF5XSc6ICdwbGF5JyxcbiAgICAgICdjbGljayBbZGF0YS1wYXVzZV0nOiAncGF1c2UnLFxuICAgICAgJ2NsaWNrIFtkYXRhLXBsYXlwYXVzZV0nOiAndG9nZ2xlUGxheVBhdXNlJyxcbiAgICAgICdjbGljayBbZGF0YS1zdG9wXSc6ICdzdG9wJyxcbiAgICAgICdjbGljayBbZGF0YS1wbGF5c3RvcF0nOiAndG9nZ2xlUGxheVN0b3AnLFxuICAgICAgJ2NsaWNrIFtkYXRhLWZ1bGxzY3JlZW5dJzogJ3RvZ2dsZUZ1bGxzY3JlZW4nLFxuICAgICAgJ2NsaWNrIC5iYXItY29udGFpbmVyW2RhdGEtc2Vla2Jhcl0nOiAnc2VlaycsXG4gICAgICAnY2xpY2sgLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdJzogJ3ZvbHVtZScsXG4gICAgICAnY2xpY2sgLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXSc6ICd0b2dnbGVNdXRlJyxcbiAgICAgICdtb3VzZWVudGVyIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSc6ICdzaG93Vm9sdW1lQmFyJyxcbiAgICAgICdtb3VzZWxlYXZlIC5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXSc6ICdoaWRlVm9sdW1lQmFyJyxcbiAgICAgICdtb3VzZWRvd24gLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV0nOiAnbW91c2Vkb3duT25Wb2x1bWVCYXInLFxuICAgICAgJ21vdXNlbGVhdmUgLm1lZGlhLWNvbnRyb2wtbGF5ZXInOiAnbW91c2VsZWF2ZU9uVm9sdW1lQmFyJyxcbiAgICAgICdtb3VzZW1vdmUgLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV0nOiAnbW91c2Vtb3ZlT25Wb2x1bWVCYXInLFxuICAgICAgJ21vdXNldXAgLnNlZ21lbnRlZC1iYXItZWxlbWVudFtkYXRhLXZvbHVtZV0nOiAnbW91c2V1cE9uVm9sdW1lQmFyJyxcbiAgICAgICdtb3VzZWRvd24gLmJhci1zY3J1YmJlcltkYXRhLXZvbHVtZV0nOiAnc3RhcnRWb2x1bWVEcmFnJyxcbiAgICAgICdtb3VzZWRvd24gLmJhci1zY3J1YmJlcltkYXRhLXNlZWtiYXJdJzogJ3N0YXJ0U2Vla0RyYWcnLFxuICAgICAgJ21vdXNlbW92ZSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdJzogJ21vdXNlbW92ZU9uU2Vla0JhcicsXG4gICAgICAnbW91c2VsZWF2ZSAuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdJzogJ21vdXNlbGVhdmVPblNlZWtCYXInLFxuICAgICAgJ21vdXNlZW50ZXIgLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10nOiAnc2V0S2VlcFZpc2libGUnLFxuICAgICAgJ21vdXNlbGVhdmUgLm1lZGlhLWNvbnRyb2wtbGF5ZXJbZGF0YS1jb250cm9sc10nOiAncmVzZXRLZWVwVmlzaWJsZSdcbiAgICB9XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBKU1QubWVkaWFfY29udHJvbCB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5zZWVrVGltZSA9IG5ldyBTZWVrVGltZSh0aGlzKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLm11dGUgPSB0aGlzLm9wdGlvbnMubXV0ZVxuICAgIHRoaXMucGVyc2lzdENvbmZpZyA9IHRoaXMub3B0aW9ucy5wZXJzaXN0Q29uZmlnXG4gICAgdGhpcy5jb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuICAgIHZhciBpbml0aWFsVm9sdW1lID0gKHRoaXMucGVyc2lzdENvbmZpZykgPyBVdGlscy5Db25maWcucmVzdG9yZShcInZvbHVtZVwiKSA6IDEwMDtcbiAgICB0aGlzLnNldFZvbHVtZSh0aGlzLm11dGUgPyAwIDogaW5pdGlhbFZvbHVtZSlcbiAgICB0aGlzLmtlZXBWaXNpYmxlID0gZmFsc2VcbiAgICB0aGlzLnZvbHVtZUJhckNsaWNrRG93biA9IGZhbHNlO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICBsZWZ0OiBbJ3BsYXknLCAnc3RvcCcsICdwYXVzZSddLFxuICAgICAgcmlnaHQ6IFsndm9sdW1lJ10sXG4gICAgICBkZWZhdWx0OiBbJ3Bvc2l0aW9uJywgJ3NlZWtiYXInLCAnZHVyYXRpb24nXVxuICAgIH1cbiAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmtleXModGhpcy5jb250YWluZXIuc2V0dGluZ3MpLmxlbmd0aCA9PT0gMCA/IHRoaXMuc2V0dGluZ3MgOiB0aGlzLmNvbnRhaW5lci5zZXR0aW5nc1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgIGlmICh0aGlzLmNvbnRhaW5lci5tZWRpYUNvbnRyb2xEaXNhYmxlZCB8fCB0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9XG4gICAgJChkb2N1bWVudCkuYmluZCgnbW91c2V1cCcsIChldmVudCkgPT4gdGhpcy5zdG9wRHJhZyhldmVudCkpXG4gICAgJChkb2N1bWVudCkuYmluZCgnbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB0aGlzLnVwZGF0ZURyYWcoZXZlbnQpKVxuICAgIE1lZGlhdG9yLm9uKEV2ZW50cy5QTEFZRVJfUkVTSVpFLCAoKSA9PiB0aGlzLnBsYXllclJlc2l6ZSgpKVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QQVVTRSwgdGhpcy5jaGFuZ2VUb2dnbGVQbGF5KVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfREJMQ0xJQ0ssIHRoaXMudG9nZ2xlRnVsbHNjcmVlbilcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1RJTUVVUERBVEUsIHRoaXMudXBkYXRlU2Vla0JhcilcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BST0dSRVNTLCB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VUVElOR1NVUERBVEUsIHRoaXMuc2V0dGluZ3NVcGRhdGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZQkFDS0RWUlNUQVRFQ0hBTkdFRCwgdGhpcy5zZXR0aW5nc1VwZGF0ZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0hJR0hERUZJTklUSU9OVVBEQVRFLCB0aGlzLmhpZ2hEZWZpbml0aW9uVXBkYXRlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfTUVESUFDT05UUk9MX0RJU0FCTEUsIHRoaXMuZGlzYWJsZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9FTkFCTEUsIHRoaXMuZW5hYmxlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRU5ERUQsIHRoaXMuZW5kZWQpXG4gIH1cblxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5oaWRlKClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmNocm9tZWxlc3MpIHJldHVyblxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgIHRoaXMuc2hvdygpXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuY29udGFpbmVyLnBsYXkoKVxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5jb250YWluZXIucGF1c2UoKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5zdG9wKClcbiAgfVxuXG4gIGNoYW5nZVRvZ2dsZVBsYXkoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyLmlzUGxheWluZygpKSB7XG4gICAgICB0aGlzLiRwbGF5UGF1c2VUb2dnbGUucmVtb3ZlQ2xhc3MoJ3BhdXNlZCcpLmFkZENsYXNzKCdwbGF5aW5nJylcbiAgICAgIHRoaXMuJHBsYXlTdG9wVG9nZ2xlLnJlbW92ZUNsYXNzKCdzdG9wcGVkJykuYWRkQ2xhc3MoJ3BsYXlpbmcnKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfUExBWUlORyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJHBsYXlQYXVzZVRvZ2dsZS5yZW1vdmVDbGFzcygncGxheWluZycpLmFkZENsYXNzKCdwYXVzZWQnKVxuICAgICAgdGhpcy4kcGxheVN0b3BUb2dnbGUucmVtb3ZlQ2xhc3MoJ3BsYXlpbmcnKS5hZGRDbGFzcygnc3RvcHBlZCcpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLk1FRElBQ09OVFJPTF9OT1RQTEFZSU5HKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZW1vdmVPblNlZWtCYXIoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuc2V0dGluZ3Muc2Vla0VuYWJsZWQpIHtcbiAgICAgIHZhciBvZmZzZXRYID0gZXZlbnQucGFnZVggLSB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLm9mZnNldCgpLmxlZnQgLSAodGhpcy4kc2Vla0JhckhvdmVyLndpZHRoKCkgLyAyKVxuICAgICAgdGhpcy4kc2Vla0JhckhvdmVyLmNzcyh7bGVmdDogb2Zmc2V0WH0pXG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX01PVVNFTU9WRV9TRUVLQkFSLCBldmVudCk7XG4gIH1cblxuICBtb3VzZWxlYXZlT25TZWVrQmFyKGV2ZW50KSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VMRUFWRV9TRUVLQkFSLCBldmVudCk7XG4gIH1cblxuICBtb3VzZW1vdmVPblZvbHVtZUJhcihldmVudCkge1xuICAgIGlmKHRoaXMudm9sdW1lQmFyQ2xpY2tEb3duKXtcbiAgICAgIHRoaXMudm9sdW1lKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBtb3VzZWRvd25PblZvbHVtZUJhcigpIHtcbiAgICB2YXIgY3Vyc29yU3R5bGVQcm9wZXJ0eSA9ICd1cmwoaHR0cDovL3d3dy5nb29nbGUuY29tL2ludGwvZW5fQUxML21hcGZpbGVzL2Nsb3NlZGhhbmQuY3VyKSwgbW92ZSc7XG4gICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLmNzcygnY3Vyc29yJywgY3Vyc29yU3R5bGVQcm9wZXJ0eSk7XG4gICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLmNzcygnY3Vyc29yJywgJy13ZWJraXQtZ3JhYmJpbmcnKTtcbiAgICB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIuY3NzKCdjdXJzb3InLCAnLW1vei1ncmFiYmluZycpO1xuICAgIHRoaXMudm9sdW1lQmFyQ2xpY2tEb3duID0gdHJ1ZTtcbiAgfVxuXG4gIG1vdXNldXBPblZvbHVtZUJhcigpIHtcbiAgICB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIuY3NzKCAnY3Vyc29yJywgJ3BvaW50ZXInICk7XG4gICAgdGhpcy52b2x1bWVCYXJDbGlja0Rvd24gPSBmYWxzZTtcbiAgfVxuXG4gIG1vdXNlbGVhdmVPblZvbHVtZUJhcihldmVudCkge1xuICAgIHZhciB2b2xPZmZzZXQgPSB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIub2Zmc2V0KCk7XG5cbiAgICB2YXIgb3V0c2lkZUJ5TGVmdCA9IGV2ZW50LnBhZ2VYIDwgdGhpcy4kc2Vla0JhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0O1xuICAgIHZhciBvdXRzaWRlQnlSaWdodCA9IGV2ZW50LnBhZ2VYID4gKHZvbE9mZnNldC5sZWZ0ICsgdm9sT2Zmc2V0LndpZHRoKTtcbiAgICB2YXIgb3V0c2lkZUhvcml6b250YWxseSA9IChvdXRzaWRlQnlMZWZ0IHx8IG91dHNpZGVCeVJpZ2h0KTtcblxuICAgIHZhciBvdXRzaWRlQnlUb3AgPSBldmVudC5wYWdlWSA8IHZvbE9mZnNldC50b3A7XG4gICAgdmFyIG91dHNpZGVCeUJvdHRvbSA9IGV2ZW50LnBhZ2VZID4gKHZvbE9mZnNldC50b3AgKyB2b2xPZmZzZXQuaGVpZ2h0KTtcblxuICAgIHZhciBvdXRzaWRlVmVydGljYWxseSA9IChvdXRzaWRlQnlUb3AgfHwgb3V0c2lkZUJ5Qm90dG9tKTtcblxuICAgIGlmKG91dHNpZGVIb3Jpem9udGFsbHkgfHwgb3V0c2lkZVZlcnRpY2FsbHkpIHtcbiAgICAgIHRoaXMubW91c2V1cE9uVm9sdW1lQmFyKCk7XG4gICAgfVxuICB9XG5cbiAgcGxheWVyUmVzaXplKCkge1xuICAgIGlmIChVdGlscy5GdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpKSB7XG4gICAgICB0aGlzLiRmdWxsc2NyZWVuVG9nZ2xlLmFkZENsYXNzKCdzaHJpbmsnKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRmdWxsc2NyZWVuVG9nZ2xlLnJlbW92ZUNsYXNzKCdzaHJpbmsnKVxuICAgIH1cbiAgICB0aGlzLiRlbC5yZW1vdmVDbGFzcygndzMyMCcpXG4gICAgaWYgKFBsYXllckluZm8uY3VycmVudFNpemUud2lkdGggPD0gMzIwIHx8IHRoaXMub3B0aW9ucy5oaWRlVm9sdW1lQmFyKSB7XG4gICAgICB0aGlzLiRlbC5hZGRDbGFzcygndzMyMCcpXG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlUGxheVBhdXNlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5pc1BsYXlpbmcoKSkge1xuICAgICAgdGhpcy5jb250YWluZXIucGF1c2UoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5wbGF5KClcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB0b2dnbGVQbGF5U3RvcCgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuaXNQbGF5aW5nKCkpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0b3AoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5wbGF5KClcbiAgICB9XG4gIH1cblxuICBzdGFydFNlZWtEcmFnKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkgcmV0dXJuXG4gICAgdGhpcy5kcmFnZ2luZ1NlZWtCYXIgPSB0cnVlXG4gICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2RyYWdnaW5nJylcbiAgICB0aGlzLiRzZWVrQmFyTG9hZGVkLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLW5vdHJhbnNpdGlvbicpXG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgc3RhcnRWb2x1bWVEcmFnKGV2ZW50KSB7XG4gICAgdGhpcy5kcmFnZ2luZ1ZvbHVtZUJhciA9IHRydWVcbiAgICB0aGlzLiRlbC5hZGRDbGFzcygnZHJhZ2dpbmcnKVxuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIHN0b3BEcmFnKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmdTZWVrQmFyKSB7XG4gICAgICB0aGlzLnNlZWsoZXZlbnQpXG4gICAgfVxuICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpXG4gICAgdGhpcy4kc2Vla0JhckxvYWRlZC5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbi5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlci5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24gZHJhZ2dpbmcnKVxuICAgIHRoaXMuZHJhZ2dpbmdTZWVrQmFyID0gZmFsc2VcbiAgICB0aGlzLmRyYWdnaW5nVm9sdW1lQmFyID0gZmFsc2VcbiAgfVxuXG4gIHVwZGF0ZURyYWcoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmdTZWVrQmFyKSB7XG4gICAgICB2YXIgb2Zmc2V0WCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy4kc2Vla0JhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0XG4gICAgICB2YXIgcG9zID0gb2Zmc2V0WCAvIHRoaXMuJHNlZWtCYXJDb250YWluZXIud2lkdGgoKSAqIDEwMFxuICAgICAgcG9zID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heChwb3MsIDApKVxuICAgICAgdGhpcy5zZXRTZWVrUGVyY2VudGFnZShwb3MpXG4gICAgfSBlbHNlIGlmICh0aGlzLmRyYWdnaW5nVm9sdW1lQmFyKSB7XG4gICAgICB0aGlzLnZvbHVtZShldmVudClcbiAgICB9XG4gIH1cblxuICB2b2x1bWUoZXZlbnQpIHtcbiAgICB2YXIgb2Zmc2V0WSA9IGV2ZW50LnBhZ2VYIC0gdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLm9mZnNldCgpLmxlZnRcbiAgICB2YXIgdm9sdW1lRnJvbVVJID0gKG9mZnNldFkgLyB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIud2lkdGgoKSkgKiAxMDBcbiAgICB0aGlzLnNldFZvbHVtZSh2b2x1bWVGcm9tVUkpXG4gIH1cblxuICB0b2dnbGVNdXRlKCkge1xuICAgIGlmICh0aGlzLm11dGUpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRWb2x1bWUgPD0gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSAxMDBcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMuY3VycmVudFZvbHVtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRWb2x1bWUoMClcbiAgICB9XG4gIH1cblxuICBzZXRWb2x1bWUodmFsdWUpIHtcbiAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSBNYXRoLm1pbigxMDAsIE1hdGgubWF4KHZhbHVlLCAwKSlcbiAgICB0aGlzLmNvbnRhaW5lci5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgIHRoaXMuc2V0Vm9sdW1lTGV2ZWwodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgIHRoaXMubXV0ZSA9IHRoaXMuY3VycmVudFZvbHVtZSA9PT0gMFxuICAgIHRoaXMucGVyc2lzdENvbmZpZyAmJiBVdGlscy5Db25maWcucGVyc2lzdChcInZvbHVtZVwiLCB0aGlzLmN1cnJlbnRWb2x1bWUpXG4gIH1cblxuICB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX0ZVTExTQ1JFRU4sIHRoaXMubmFtZSlcbiAgICB0aGlzLmNvbnRhaW5lci5mdWxsc2NyZWVuKClcbiAgICB0aGlzLnJlc2V0S2VlcFZpc2libGUoKVxuICB9XG5cbiAgc2V0Q29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZyh0aGlzLmNvbnRhaW5lcilcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lclxuICAgIHRoaXMuY2hhbmdlVG9nZ2xlUGxheSgpXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpXG4gICAgdGhpcy5zZXR0aW5nc1VwZGF0ZSgpXG4gICAgdGhpcy5jb250YWluZXIudHJpZ2dlcihFdmVudHMuQ09OVEFJTkVSX1BMQVlCQUNLRFZSU1RBVEVDSEFOR0VELCB0aGlzLmNvbnRhaW5lci5pc0R2ckluVXNlKCkpXG4gICAgdGhpcy5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgIGlmICh0aGlzLmNvbnRhaW5lci5tZWRpYUNvbnRyb2xEaXNhYmxlZCkge1xuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfQ09OVEFJTkVSQ0hBTkdFRClcbiAgfVxuXG4gIHNob3dWb2x1bWVCYXIoKSB7XG4gICAgaWYgKHRoaXMuaGlkZVZvbHVtZUlkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlVm9sdW1lSWQpXG4gICAgfVxuICAgIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci5yZW1vdmVDbGFzcygndm9sdW1lLWJhci1oaWRlJylcbiAgfVxuXG4gIGhpZGVWb2x1bWVCYXIoKSB7XG4gICAgdmFyIHRpbWVvdXQgPSA0MDBcbiAgICBpZiAoIXRoaXMuJHZvbHVtZUJhckNvbnRhaW5lcikgcmV0dXJuXG4gICAgaWYgKHRoaXMuZHJhZ2dpbmdWb2x1bWVCYXIpIHtcbiAgICAgIHRoaXMuaGlkZVZvbHVtZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGVWb2x1bWVCYXIoKSwgdGltZW91dClcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuaGlkZVZvbHVtZUlkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVWb2x1bWVJZClcbiAgICAgIH1cbiAgICAgIHRoaXMuaGlkZVZvbHVtZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLiR2b2x1bWVCYXJDb250YWluZXIuYWRkQ2xhc3MoJ3ZvbHVtZS1iYXItaGlkZScpLCB0aW1lb3V0KVxuICAgIH1cbiAgfVxuXG4gIGVuZGVkKCkge1xuICAgIHRoaXMuY2hhbmdlVG9nZ2xlUGxheSgpXG4gIH1cblxuICB1cGRhdGVQcm9ncmVzc0JhcihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbiwgZHVyYXRpb24pIHtcbiAgICB2YXIgbG9hZGVkU3RhcnQgPSBzdGFydFBvc2l0aW9uIC8gZHVyYXRpb24gKiAxMDBcbiAgICB2YXIgbG9hZGVkRW5kID0gZW5kUG9zaXRpb24gLyBkdXJhdGlvbiAqIDEwMFxuICAgIHRoaXMuJHNlZWtCYXJMb2FkZWQuY3NzKHsgbGVmdDogbG9hZGVkU3RhcnQgKyAnJScsIHdpZHRoOiAobG9hZGVkRW5kIC0gbG9hZGVkU3RhcnQpICsgJyUnIH0pXG4gIH1cblxuICB1cGRhdGVTZWVrQmFyKHBvc2l0aW9uLCBkdXJhdGlvbikge1xuICAgIGlmICh0aGlzLmRyYWdnaW5nU2Vla0JhcikgcmV0dXJuXG4gICAgaWYgKHBvc2l0aW9uIDwgMCkgcG9zaXRpb24gPSBkdXJhdGlvblxuICAgIHRoaXMuJHNlZWtCYXJQb3NpdGlvbi5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHRoaXMuJHNlZWtCYXJTY3J1YmJlci5yZW1vdmVDbGFzcygnbWVkaWEtY29udHJvbC1ub3RyYW5zaXRpb24nKVxuICAgIHZhciBzZWVrYmFyVmFsdWUgPSAoMTAwIC8gZHVyYXRpb24pICogcG9zaXRpb25cbiAgICB0aGlzLnNldFNlZWtQZXJjZW50YWdlKHNlZWtiYXJWYWx1ZSlcbiAgICB0aGlzLiQoJ1tkYXRhLXBvc2l0aW9uXScpLmh0bWwoVXRpbHMuZm9ybWF0VGltZShwb3NpdGlvbikpXG4gICAgdGhpcy4kKCdbZGF0YS1kdXJhdGlvbl0nKS5odG1sKFV0aWxzLmZvcm1hdFRpbWUoZHVyYXRpb24pKVxuICB9XG5cbiAgc2VlayhldmVudCkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIuc2V0dGluZ3Muc2Vla0VuYWJsZWQpIHJldHVyblxuICAgIHZhciBvZmZzZXRYID0gZXZlbnQucGFnZVggLSB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLm9mZnNldCgpLmxlZnRcbiAgICB2YXIgcG9zID0gb2Zmc2V0WCAvIHRoaXMuJHNlZWtCYXJDb250YWluZXIud2lkdGgoKSAqIDEwMFxuICAgIHBvcyA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgocG9zLCAwKSlcbiAgICB0aGlzLmNvbnRhaW5lci5zZXRDdXJyZW50VGltZShwb3MpXG4gICAgdGhpcy5zZXRTZWVrUGVyY2VudGFnZShwb3MpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBzZXRLZWVwVmlzaWJsZSgpIHtcbiAgICB0aGlzLmtlZXBWaXNpYmxlID0gdHJ1ZVxuICB9XG5cbiAgcmVzZXRLZWVwVmlzaWJsZSgpIHtcbiAgICB0aGlzLmtlZXBWaXNpYmxlID0gZmFsc2VcbiAgfVxuXG4gIGlzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gIXRoaXMuJGVsLmhhc0NsYXNzKCdtZWRpYS1jb250cm9sLWhpZGUnKVxuICB9XG5cbiAgc2hvdyhldmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm5cbiAgICB2YXIgdGltZW91dCA9IDIwMDBcbiAgICBpZiAoIWV2ZW50IHx8IChldmVudC5jbGllbnRYICE9PSB0aGlzLmxhc3RNb3VzZVggJiYgZXZlbnQuY2xpZW50WSAhPT0gdGhpcy5sYXN0TW91c2VZKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9maXJlZm94L2kpKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlSWQpXG4gICAgICB0aGlzLiRlbC5zaG93KClcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX1NIT1csIHRoaXMubmFtZSlcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdtZWRpYS1jb250cm9sLWhpZGUnKVxuICAgICAgdGhpcy5oaWRlSWQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aW1lb3V0KVxuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubGFzdE1vdXNlWCA9IGV2ZW50LmNsaWVudFhcbiAgICAgICAgdGhpcy5sYXN0TW91c2VZID0gZXZlbnQuY2xpZW50WVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdmFyIHRpbWVvdXQgPSAyMDAwXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZUlkKVxuICAgIGlmICghdGhpcy5pc1Zpc2libGUoKSB8fCB0aGlzLm9wdGlvbnMuaGlkZU1lZGlhQ29udHJvbCA9PT0gZmFsc2UpIHJldHVyblxuICAgIGlmICh0aGlzLmtlZXBWaXNpYmxlIHx8IHRoaXMuZHJhZ2dpbmdTZWVrQmFyIHx8IHRoaXMuZHJhZ2dpbmdWb2x1bWVCYXIpIHtcbiAgICAgIHRoaXMuaGlkZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGltZW91dClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5NRURJQUNPTlRST0xfSElERSwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtaGlkZScpXG4gICAgICB0aGlzLmhpZGVWb2x1bWVCYXIoKVxuICAgIH1cbiAgfVxuXG4gIHNldHRpbmdzVXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5nZXRQbGF5YmFja1R5cGUoKSAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh0aGlzLmNvbnRhaW5lci5zZXR0aW5ncykubGVuZ3RoICE9PSAwKSB7XG4gICAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5jb250YWluZXIuc2V0dGluZ3NcbiAgICAgIHRoaXMucmVuZGVyKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNhYmxlKClcbiAgICB9XG4gIH1cblxuICBoaWdoRGVmaW5pdGlvblVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkpIHtcbiAgICAgIHRoaXMuJGVsLmZpbmQoJ2J1dHRvbltkYXRhLWhkLWluZGljYXRvcl0nKS5hZGRDbGFzcyhcImVuYWJsZWRcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWwuZmluZCgnYnV0dG9uW2RhdGEtaGQtaW5kaWNhdG9yXScpLnJlbW92ZUNsYXNzKFwiZW5hYmxlZFwiKVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUNhY2hlZEVsZW1lbnRzKCkge1xuICAgIHRoaXMuJHBsYXlQYXVzZVRvZ2dsZSA9IHRoaXMuJGVsLmZpbmQoJ2J1dHRvbi5tZWRpYS1jb250cm9sLWJ1dHRvbltkYXRhLXBsYXlwYXVzZV0nKVxuICAgIHRoaXMuJHBsYXlTdG9wVG9nZ2xlID0gdGhpcy4kZWwuZmluZCgnYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtcGxheXN0b3BdJylcbiAgICB0aGlzLiRmdWxsc2NyZWVuVG9nZ2xlID0gdGhpcy4kZWwuZmluZCgnYnV0dG9uLm1lZGlhLWNvbnRyb2wtYnV0dG9uW2RhdGEtZnVsbHNjcmVlbl0nKVxuICAgIHRoaXMuJHNlZWtCYXJDb250YWluZXIgPSB0aGlzLiRlbC5maW5kKCcuYmFyLWNvbnRhaW5lcltkYXRhLXNlZWtiYXJdJylcbiAgICB0aGlzLiRzZWVrQmFyTG9hZGVkID0gdGhpcy4kZWwuZmluZCgnLmJhci1maWxsLTFbZGF0YS1zZWVrYmFyXScpXG4gICAgdGhpcy4kc2Vla0JhclBvc2l0aW9uID0gdGhpcy4kZWwuZmluZCgnLmJhci1maWxsLTJbZGF0YS1zZWVrYmFyXScpXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyID0gdGhpcy4kZWwuZmluZCgnLmJhci1zY3J1YmJlcltkYXRhLXNlZWtiYXJdJylcbiAgICB0aGlzLiRzZWVrQmFySG92ZXIgPSB0aGlzLiRlbC5maW5kKCcuYmFyLWhvdmVyW2RhdGEtc2Vla2Jhcl0nKVxuICAgIHRoaXMuJHZvbHVtZUNvbnRhaW5lciA9IHRoaXMuJGVsLmZpbmQoJy5kcmF3ZXItY29udGFpbmVyW2RhdGEtdm9sdW1lXScpXG4gICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyID0gdGhpcy4kZWwuZmluZCgnLmJhci1jb250YWluZXJbZGF0YS12b2x1bWVdJylcbiAgICB0aGlzLiR2b2x1bWVJY29uID0gdGhpcy4kZWwuZmluZCgnLmRyYXdlci1pY29uW2RhdGEtdm9sdW1lXScpXG4gIH1cblxuICBzZXRWb2x1bWVMZXZlbCh2YWx1ZSkge1xuICAgIGlmICghdGhpcy5jb250YWluZXIuaXNSZWFkeSB8fCAhdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLmxpc3RlblRvT25jZSh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9SRUFEWSwgKCkgPT4gdGhpcy5zZXRWb2x1bWVMZXZlbCh2YWx1ZSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJHZvbHVtZUJhckNvbnRhaW5lci5maW5kKCcuc2VnbWVudGVkLWJhci1lbGVtZW50JykucmVtb3ZlQ2xhc3MoJ2ZpbGwnKVxuICAgICAgdmFyIGl0ZW0gPSBNYXRoLmNlaWwodmFsdWUgLyAxMC4wKVxuICAgICAgdGhpcy4kdm9sdW1lQmFyQ29udGFpbmVyLmZpbmQoJy5zZWdtZW50ZWQtYmFyLWVsZW1lbnQnKS5zbGljZSgwLCBpdGVtKS5hZGRDbGFzcygnZmlsbCcpXG4gICAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgIHRoaXMuJHZvbHVtZUljb24ucmVtb3ZlQ2xhc3MoJ211dGVkJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJHZvbHVtZUljb24uYWRkQ2xhc3MoJ211dGVkJylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRTZWVrUGVyY2VudGFnZSh2YWx1ZSkge1xuICAgIHZhbHVlID0gTWF0aC5taW4odmFsdWUsIDEwMC4wKVxuICAgIHZhciBwb3MgPSAodGhpcy4kc2Vla0JhckNvbnRhaW5lci53aWR0aCgpICogdmFsdWUgLyAxMDAuMCkgLSAodGhpcy4kc2Vla0JhclNjcnViYmVyLndpZHRoKCkgLyAyLjApXG4gICAgdGhpcy5jdXJyZW50U2Vla1BlcmNlbnRhZ2UgPSB2YWx1ZTtcbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24uY3NzKHsgd2lkdGg6IHZhbHVlICsgJyUnIH0pXG4gICAgdGhpcy4kc2Vla0JhclNjcnViYmVyLmNzcyh7IGxlZnQ6IHBvcyB9KVxuICB9XG5cbiAgc2Vla1JlbGF0aXZlKGRlbHRhKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkgcmV0dXJuXG4gICAgdmFyIGN1cnJlbnRUaW1lID0gdGhpcy5jb250YWluZXIuZ2V0Q3VycmVudFRpbWUoKVxuICAgIHZhciBkdXJhdGlvbiA9IHRoaXMuY29udGFpbmVyLmdldER1cmF0aW9uKClcbiAgICB2YXIgcG9zaXRpb24gPSBNYXRoLm1pbihNYXRoLm1heChjdXJyZW50VGltZSArIGRlbHRhLCAwKSwgZHVyYXRpb24pXG4gICAgcG9zaXRpb24gPSBNYXRoLm1pbihwb3NpdGlvbiAqIDEwMCAvIGR1cmF0aW9uLCAxMDApXG4gICAgdGhpcy5jb250YWluZXIuc2V0Q3VycmVudFRpbWUocG9zaXRpb24pXG4gIH1cblxuICBiaW5kS2V5RXZlbnRzKCkge1xuICAgIHRoaXMua2liby5kb3duKFsnc3BhY2UnXSwgKCkgPT4gdGhpcy50b2dnbGVQbGF5UGF1c2UoKSlcbiAgICB0aGlzLmtpYm8uZG93bihbJ2xlZnQnXSwgKCkgPT4gdGhpcy5zZWVrUmVsYXRpdmUoLTE1KSlcbiAgICB0aGlzLmtpYm8uZG93bihbJ3JpZ2h0J10sICgpID0+IHRoaXMuc2Vla1JlbGF0aXZlKDE1KSlcbiAgICB2YXIga2V5cyA9IFsxLDIsMyw0LDUsNiw3LDgsOSwwXVxuICAgIGtleXMuZm9yRWFjaCgoaSkgPT4geyB0aGlzLmtpYm8uZG93bihpLnRvU3RyaW5nKCksICgpID0+IHRoaXMuY29udGFpbmVyLnNldHRpbmdzLnNlZWtFbmFibGVkICYmIHRoaXMuY29udGFpbmVyLnNldEN1cnJlbnRUaW1lKGkgKiAxMCkpIH0pXG4gIH1cblxuICB1bmJpbmRLZXlFdmVudHMoKSB7XG4gICAgdGhpcy5raWJvLm9mZignc3BhY2UnKVxuICAgIHRoaXMua2liby5vZmYoWzEsMiwzLDQsNSw2LDcsOCw5LDBdKVxuICB9XG5cbiAgcGFyc2VDb2xvcnMoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5tZWRpYWNvbnRyb2wpIHtcbiAgICAgIHZhciBidXR0b25zQ29sb3IgPSB0aGlzLm9wdGlvbnMubWVkaWFjb250cm9sLmJ1dHRvbnM7XG4gICAgICB2YXIgc2Vla2JhckNvbG9yID0gdGhpcy5vcHRpb25zLm1lZGlhY29udHJvbC5zZWVrYmFyO1xuICAgICAgdGhpcy4kZWwuZmluZCgnLmJhci1maWxsLTJbZGF0YS1zZWVrYmFyXScpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHNlZWtiYXJDb2xvcilcbiAgICAgIHRoaXMuJGVsLmZpbmQoJ1tkYXRhLW1lZGlhLWNvbnRyb2xdID4gLm1lZGlhLWNvbnRyb2wtaWNvbiwgLmRyYXdlci1pY29uJykuY3NzKCdjb2xvcicsIGJ1dHRvbnNDb2xvcilcbiAgICAgIHRoaXMuJGVsLmZpbmQoJy5zZWdtZW50ZWQtYmFyLWVsZW1lbnRbZGF0YS12b2x1bWVdJykuY3NzKCdib3hTaGFkb3cnLCBcImluc2V0IDJweCAwIDAgXCIgKyBidXR0b25zQ29sb3IpXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAkKGRvY3VtZW50KS51bmJpbmQoJ21vdXNldXAnKVxuICAgICQoZG9jdW1lbnQpLnVuYmluZCgnbW91c2Vtb3ZlJylcbiAgICB0aGlzLnVuYmluZEtleUV2ZW50cygpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHRpbWVvdXQgPSAxMDAwXG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKCdtZWRpYV9jb250cm9sJywge2Jhc2VVcmw6IHRoaXMub3B0aW9ucy5iYXNlVXJsfSk7XG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHsgc2V0dGluZ3M6IHRoaXMuc2V0dGluZ3MgfSkpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHRoaXMuY3JlYXRlQ2FjaGVkRWxlbWVudHMoKVxuICAgIHRoaXMuJHBsYXlQYXVzZVRvZ2dsZS5hZGRDbGFzcygncGF1c2VkJylcbiAgICB0aGlzLiRwbGF5U3RvcFRvZ2dsZS5hZGRDbGFzcygnc3RvcHBlZCcpXG5cbiAgICBpZiAodGhpcy5raWJvKSB7XG4gICAgICB0aGlzLnVuYmluZEtleUV2ZW50cygpXG4gICAgfVxuICAgIHRoaXMua2libyA9IG5ldyBLaWJvKHRoaXMub3B0aW9ucy5mb2N1c0VsZW1lbnQpXG5cbiAgICB0aGlzLmNoYW5nZVRvZ2dsZVBsYXkoKVxuICAgIHRoaXMuaGlkZUlkID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGltZW91dClcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5oaWRlKClcbiAgICB9XG5cbiAgICBpZihCcm93c2VyLmlzU2FmYXJpICYmIEJyb3dzZXIuaXNNb2JpbGUpIHtcbiAgICAgIHRoaXMuJHZvbHVtZUNvbnRhaW5lci5jc3MoJ2Rpc3BsYXknLCdub25lJylcbiAgICB9XG5cbiAgICB0aGlzLiRzZWVrQmFyUG9zaXRpb24uYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcbiAgICB0aGlzLiRzZWVrQmFyU2NydWJiZXIuYWRkQ2xhc3MoJ21lZGlhLWNvbnRyb2wtbm90cmFuc2l0aW9uJylcblxuICAgIGlmICghdGhpcy5jdXJyZW50U2Vla1BlcmNlbnRhZ2UpIHtcbiAgICAgIHRoaXMuY3VycmVudFNlZWtQZXJjZW50YWdlID0gMFxuICAgIH1cbiAgICB0aGlzLnNldFNlZWtQZXJjZW50YWdlKHRoaXMuY3VycmVudFNlZWtQZXJjZW50YWdlKVxuXG4gICAgdGhpcy4kZWwucmVhZHkoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkge1xuICAgICAgICB0aGlzLiRzZWVrQmFyQ29udGFpbmVyLmFkZENsYXNzKCdzZWVrLWRpc2FibGVkJylcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRWb2x1bWUodGhpcy5jdXJyZW50Vm9sdW1lKVxuICAgICAgdGhpcy5iaW5kS2V5RXZlbnRzKClcbiAgICAgIHRoaXMuaGlkZVZvbHVtZUJhcigpXG4gICAgfSlcblxuICAgIHRoaXMucGFyc2VDb2xvcnMoKVxuICAgIHRoaXMuc2Vla1RpbWUucmVuZGVyKClcbiAgICB0aGlzLmhpZ2hEZWZpbml0aW9uVXBkYXRlKClcblxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuTUVESUFDT05UUk9MX1JFTkRFUkVEKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNZWRpYUNvbnRyb2xcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnLi4vYmFzZS9iYXNlX29iamVjdCcpXG52YXIgQ29yZUZhY3RvcnkgPSByZXF1aXJlKCcuL2NvcmVfZmFjdG9yeScpXG52YXIgTG9hZGVyID0gcmVxdWlyZSgnLi9sb2FkZXInKVxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2xvZGFzaC5hc3NpZ24nKVxudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcbnZhciB1bmlxdWVJZCA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbHMnKS51bmlxdWVJZFxudmFyIFBsYXllckluZm8gPSByZXF1aXJlKCcuL3BsYXllcl9pbmZvJylcblxuY2xhc3MgUGxheWVyIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHdpbmRvdy5wID0gdGhpc1xuICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtwbGF5ZXJJZDogdW5pcXVlSWQoXCJcIiksIHBlcnNpc3RDb25maWc6IHRydWUsIHdpZHRoOiA2NDAsIGhlaWdodDogMzYwLCBiYXNlVXJsOiAnaHR0cDovL2Nkbi5jbGFwcHIuaW8vbGF0ZXN0J31cbiAgICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpXG4gICAgdGhpcy5vcHRpb25zLnNvdXJjZXMgPSB0aGlzLm5vcm1hbGl6ZVNvdXJjZXMob3B0aW9ucylcbiAgICB0aGlzLmxvYWRlciA9IG5ldyBMb2FkZXIodGhpcy5vcHRpb25zLnBsdWdpbnMgfHwge30pXG4gICAgdGhpcy5jb3JlRmFjdG9yeSA9IG5ldyBDb3JlRmFjdG9yeSh0aGlzLCB0aGlzLmxvYWRlcilcbiAgICBQbGF5ZXJJbmZvLmN1cnJlbnRTaXplID0ge3dpZHRoOiBvcHRpb25zLndpZHRoLCBoZWlnaHQ6IG9wdGlvbnMuaGVpZ2h0fVxuICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50SWQpIHtcbiAgICAgIHRoaXMuc2V0UGFyZW50SWQodGhpcy5vcHRpb25zLnBhcmVudElkKVxuICAgIH1cbiAgfVxuXG4gIHNldFBhcmVudElkKHBhcmVudElkKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXJlbnRJZClcbiAgICBpZiAoZWwpIHtcbiAgICAgIHRoaXMuYXR0YWNoVG8oZWwpXG4gICAgfVxuICB9XG5cbiAgYXR0YWNoVG8oZWxlbWVudCkge1xuICAgIHRoaXMub3B0aW9ucy5wYXJlbnRFbGVtZW50ID0gZWxlbWVudFxuICAgIHRoaXMuY29yZSA9IHRoaXMuY29yZUZhY3RvcnkuY3JlYXRlKClcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKClcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb3JlLm1lZGlhQ29udHJvbCwgIEV2ZW50cy5NRURJQUNPTlRST0xfQ09OVEFJTkVSQ0hBTkdFRCwgdGhpcy5jb250YWluZXJDaGFuZ2VkKVxuICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lclxuICAgIGlmICghIWNvbnRhaW5lcikge1xuICAgICAgdGhpcy5saXN0ZW5Ubyhjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWSwgdGhpcy5vblBsYXkpXG4gICAgICB0aGlzLmxpc3RlblRvKGNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QQVVTRSwgdGhpcy5vblBhdXNlKVxuICAgICAgdGhpcy5saXN0ZW5Ubyhjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5vblN0b3ApXG4gICAgICB0aGlzLmxpc3RlblRvKGNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FTkRFRCwgdGhpcy5vbkVuZGVkKVxuICAgICAgdGhpcy5saXN0ZW5Ubyhjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VFSywgdGhpcy5vblNlZWspXG4gICAgICB0aGlzLmxpc3RlblRvKGNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9FUlJPUiwgdGhpcy5vbkVycm9yKVxuICAgICAgdGhpcy5saXN0ZW5Ubyhjb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfVElNRVVQREFURSwgdGhpcy5vblRpbWVVcGRhdGUpXG4gICAgfVxuICB9XG5cbiAgY29udGFpbmVyQ2hhbmdlZCgpIHtcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUVSX1BMQVkpXG4gIH1cblxuICBvblBhdXNlKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUVSX1BBVVNFKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUVSX1NUT1AsIHRoaXMuZ2V0Q3VycmVudFRpbWUoKSlcbiAgfVxuXG4gIG9uRW5kZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZRVJfRU5ERUQpXG4gIH1cblxuICBvblNlZWsocGVyY2VudCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUVSX1NFRUssIHBlcmNlbnQpXG4gIH1cblxuICBvblRpbWVVcGRhdGUocG9zaXRpb24sIGR1cmF0aW9uKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZRVJfVElNRVVQREFURSwgcG9zaXRpb24sIGR1cmF0aW9uKVxuICB9XG5cbiAgb25FcnJvcihlcnJvcikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUVSX0VSUk9SLCBlcnJvcilcbiAgfVxuXG4gIGlzKHZhbHVlLCB0eXBlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yID09PSB0eXBlXG4gIH1cblxuICBub3JtYWxpemVTb3VyY2VzKG9wdGlvbnMpIHtcbiAgICB2YXIgc291cmNlcyA9IG9wdGlvbnMuc291cmNlcyB8fCAob3B0aW9ucy5zb3VyY2UgIT09IHVuZGVmaW5lZD8gW29wdGlvbnMuc291cmNlLnRvU3RyaW5nKCldIDogW10pXG4gICAgcmV0dXJuIHNvdXJjZXMubGVuZ3RoID09PSAwID8gWyduby5vcCddIDogc291cmNlc1xuICB9XG5cbiAgcmVzaXplKHNpemUpIHtcbiAgICB0aGlzLmNvcmUucmVzaXplKHNpemUpO1xuICB9XG5cbiAgbG9hZChzb3VyY2VzLCBtaW1lVHlwZSkge1xuICAgIHRoaXMuY29yZS5sb2FkKHNvdXJjZXMsIG1pbWVUeXBlKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmNvcmUuZGVzdHJveSgpXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnBsYXkoKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnBhdXNlKCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnN0b3AoKTtcbiAgfVxuXG4gIHNlZWsodGltZSkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldEN1cnJlbnRUaW1lKHRpbWUpO1xuICB9XG5cbiAgc2V0Vm9sdW1lKHZvbHVtZSkge1xuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICB9XG5cbiAgbXV0ZSgpIHtcbiAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5zZXRWb2x1bWUoMCk7XG4gIH1cblxuICB1bm11dGUoKSB7XG4gICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc2V0Vm9sdW1lKDEwMCk7XG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLmlzUGxheWluZygpO1xuICB9XG5cbiAgZ2V0UGx1Z2luKG5hbWUpIHtcbiAgICB2YXIgcGx1Z2lucyA9IHRoaXMuY29yZS5wbHVnaW5zLmNvbmNhdCh0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5wbHVnaW5zKTtcbiAgICByZXR1cm4gZmluZChwbHVnaW5zLCBmdW5jdGlvbihwbHVnaW4pIHtcbiAgICAgIHJldHVybiBwbHVnaW4ubmFtZSA9PT0gbmFtZTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5nZXRDdXJyZW50VGltZSgpXG4gIH1cblxuICBnZXREdXJhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuZ2V0RHVyYXRpb24oKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc2Vla190aW1lJyk7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgVUlPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3VpX29iamVjdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBmb3JtYXRUaW1lID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91dGlscycpLmZvcm1hdFRpbWVcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG5cbmNsYXNzIFNlZWtUaW1lIGV4dGVuZHMgVUlPYmplY3Qge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdzZWVrX3RpbWUnIH1cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBKU1Quc2Vla190aW1lO1xuICB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAnc2Vlay10aW1lIGhpZGRlbicsXG4gICAgICAnZGF0YS1zZWVrLXRpbWUnOiAnJ1xuICAgIH07XG4gIH1cbiAgY29uc3RydWN0b3IobWVkaWFDb250cm9sKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMubWVkaWFDb250cm9sID0gbWVkaWFDb250cm9sXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpXG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX01PVVNFTU9WRV9TRUVLQkFSLCB0aGlzLnNob3dUaW1lKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5tZWRpYUNvbnRyb2wsIEV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VMRUFWRV9TRUVLQkFSLCB0aGlzLmhpZGVUaW1lKVxuICB9XG5cbiAgc2hvd1RpbWUoZXZlbnQpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZXZlbnQucGFnZVggLSB0aGlzLm1lZGlhQ29udHJvbC4kc2Vla0JhckNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0XG4gICAgdmFyIHRpbWVQb3NpdGlvbiA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoKG9mZnNldCkgLyB0aGlzLm1lZGlhQ29udHJvbC4kc2Vla0JhckNvbnRhaW5lci53aWR0aCgpICogMTAwLCAwKSlcbiAgICB2YXIgcG9pbnRlclBvc2l0aW9uID0gZXZlbnQucGFnZVggLSB0aGlzLm1lZGlhQ29udHJvbC4kZWwub2Zmc2V0KCkubGVmdFxuICAgIHBvaW50ZXJQb3NpdGlvbiA9IE1hdGgubWluKE1hdGgubWF4KDAsIHBvaW50ZXJQb3NpdGlvbiksIHRoaXMubWVkaWFDb250cm9sLiRlbC53aWR0aCgpIC0gdGhpcy4kZWwud2lkdGgoKSlcbiAgICB2YXIgY3VycmVudFRpbWUgPSB0aW1lUG9zaXRpb24gKiB0aGlzLm1lZGlhQ29udHJvbC5jb250YWluZXIuZ2V0RHVyYXRpb24oKSAvIDEwMFxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgdGltZXN0YW1wOiBjdXJyZW50VGltZSxcbiAgICAgIGZvcm1hdHRlZFRpbWU6IGZvcm1hdFRpbWUoY3VycmVudFRpbWUpLFxuICAgICAgcG9pbnRlclBvc2l0aW9uOiBwb2ludGVyUG9zaXRpb25cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZShvcHRpb25zKVxuICB9XG5cbiAgaGlkZVRpbWUoKSB7XG4gICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gICAgdGhpcy4kZWwuY3NzKCdsZWZ0JywgJy0xMDAlJylcbiAgfVxuXG4gIHVwZGF0ZShvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMubWVkaWFDb250cm9sLmNvbnRhaW5lci5zZXR0aW5ncy5zZWVrRW5hYmxlZCkge1xuICAgICAgdGhpcy4kZWwuZmluZCgnW2RhdGEtc2Vlay10aW1lXScpLnRleHQob3B0aW9ucy5mb3JtYXR0ZWRUaW1lKVxuICAgICAgdGhpcy4kZWwuY3NzKCdsZWZ0Jywgb3B0aW9ucy5wb2ludGVyUG9zaXRpb24gLSAodGhpcy4kZWwud2lkdGgoKSAvIDIpKVxuICAgICAgdGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSk7XG4gICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSk7XG4gICAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpO1xuICAgICAgdGhpcy5tZWRpYUNvbnRyb2wuJGVsLmFwcGVuZCh0aGlzLmVsKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlZWtUaW1lO1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXliYWNrID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9wbGF5YmFjaycpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvbWVkaWF0b3InKVxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi4vLi4vYmFzZS90ZW1wbGF0ZScpXG52YXIgJCA9IHJlcXVpcmUoJ2NsYXBwci16ZXB0bycpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnJvd3NlcicpXG52YXIgc2Vla1N0cmluZ1RvU2Vjb25kcyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdXRpbHMnKS5zZWVrU3RyaW5nVG9TZWNvbmRzXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxuXG52YXIgb2JqZWN0SUUgPSAnPG9iamVjdCB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBpZD1cIjwlPSBjaWQgJT5cIiBjbGFzc2lkPVwiY2xzaWQ6ZDI3Y2RiNmUtYWU2ZC0xMWNmLTk2YjgtNDQ0NTUzNTQwMDAwXCIgZGF0YS1mbGFzaC12b2Q9XCJcIj48cGFyYW0gbmFtZT1cIm1vdmllXCIgdmFsdWU9XCI8JT0gYmFzZVVybCAlPi9hc3NldHMvUGxheWVyLnN3ZlwiPiA8cGFyYW0gbmFtZT1cInF1YWxpdHlcIiB2YWx1ZT1cImF1dG9oaWdoXCI+IDxwYXJhbSBuYW1lPVwic3dsaXZlY29ubmVjdFwiIHZhbHVlPVwidHJ1ZVwiPiA8cGFyYW0gbmFtZT1cImFsbG93U2NyaXB0QWNjZXNzXCIgdmFsdWU9XCJhbHdheXNcIj4gPHBhcmFtIG5hbWU9XCJiZ2NvbG9yXCIgdmFsdWU9XCIjMDAxMTIyXCI+IDxwYXJhbSBuYW1lPVwiYWxsb3dGdWxsU2NyZWVuXCIgdmFsdWU9XCJmYWxzZVwiPiA8cGFyYW0gbmFtZT1cIndtb2RlXCIgdmFsdWU9XCJncHVcIj4gPHBhcmFtIG5hbWU9XCJ0YWJpbmRleFwiIHZhbHVlPVwiMVwiPiA8cGFyYW0gbmFtZT1GbGFzaFZhcnMgdmFsdWU9XCJwbGF5YmFja0lkPTwlPSBwbGF5YmFja0lkICU+XCIgLz4gPC9vYmplY3Q+J1xuXG5jbGFzcyBGbGFzaCBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnZmxhc2gnIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnb2JqZWN0JyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5mbGFzaCB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5zcmMgPSBvcHRpb25zLnNyY1xuICAgIHRoaXMuYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybFxuICAgIHRoaXMuYXV0b1BsYXkgPSBvcHRpb25zLmF1dG9QbGF5XG4gICAgdGhpcy5zZXR0aW5ncyA9IHtkZWZhdWx0OiBbJ3NlZWtiYXInXX1cbiAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSBbXCJwbGF5cGF1c2VcIiwgXCJwb3NpdGlvblwiLCBcImR1cmF0aW9uXCJdXG4gICAgdGhpcy5zZXR0aW5ncy5yaWdodCA9IFtcImZ1bGxzY3JlZW5cIiwgXCJ2b2x1bWVcIl1cbiAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gdHJ1ZVxuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlXG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKVxuICB9XG5cblxuICBib290c3RyYXAoKSB7XG4gICAgdGhpcy5lbC53aWR0aCA9IFwiMTAwJVwiXG4gICAgdGhpcy5lbC5oZWlnaHQgPSBcIjEwMCVcIlxuICAgIHRoaXMuaXNSZWFkeSA9IHRydWVcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgPT09ICdQTEFZSU5HJykge1xuICAgICAgdGhpcy5maXJzdFBsYXkoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiSURMRVwiXG4gICAgICB0aGlzLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpXG4gICAgfVxuICAgICQoJzxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJVwiIC8+JykuaW5zZXJ0QWZ0ZXIodGhpcy4kZWwpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiAndm9kJ1xuICB9XG5cbiAgc2V0dXBGaXJlZm94KCkge1xuICAgIHZhciAkZWwgPSB0aGlzLiQoJ2VtYmVkJylcbiAgICAkZWwuYXR0cignZGF0YS1mbGFzaCcsICcnKVxuICAgIHRoaXMuc2V0RWxlbWVudCgkZWxbMF0pXG4gIH1cblxuICBpc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB1cGRhdGVUaW1lKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGhpcy5lbC5nZXRQb3NpdGlvbigpLCB0aGlzLmVsLmdldER1cmF0aW9uKCksIHRoaXMubmFtZSlcbiAgfVxuXG4gIGFkZExpc3RlbmVycygpIHtcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpwcm9ncmVzcycsIHRoaXMucHJvZ3Jlc3MsIHRoaXMpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6dGltZXVwZGF0ZScsIHRoaXMudXBkYXRlVGltZSwgdGhpcylcbiAgICBNZWRpYXRvci5vbih0aGlzLnVuaXF1ZUlkICsgJzpzdGF0ZWNoYW5nZWQnLCB0aGlzLmNoZWNrU3RhdGUsIHRoaXMpXG4gICAgTWVkaWF0b3Iub24odGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScsIHRoaXMuYm9vdHN0cmFwLCB0aGlzKVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6cHJvZ3Jlc3MnKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLnVuaXF1ZUlkICsgJzp0aW1ldXBkYXRlJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6c3RhdGVjaGFuZ2VkJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy51bmlxdWVJZCArICc6Zmxhc2hyZWFkeScpXG4gIH1cblxuICBjaGVja1N0YXRlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gXCJQQVVTRURcIikge1xuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSAhPT0gXCJQTEFZSU5HX0JVRkZFUklOR1wiICYmIHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gXCJQTEFZSU5HX0JVRkZFUklOR1wiKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdfQlVGRkVSSU5HXCJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gXCJQTEFZSU5HXCIpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgIH0gZWxzZSBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpID09PSBcIklETEVcIikge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIklETEVcIlxuICAgIH0gZWxzZSBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpID09PSBcIkVOREVEXCIpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfRU5ERUQsIHRoaXMubmFtZSlcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5lbC5nZXREdXJhdGlvbigpLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiRU5ERURcIlxuICAgIH1cbiAgfVxuXG4gIHByb2dyZXNzKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSAhPT0gXCJJRExFXCIgJiYgdGhpcy5jdXJyZW50U3RhdGUgIT09IFwiRU5ERURcIikge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgMCwgdGhpcy5lbC5nZXRCeXRlc0xvYWRlZCgpLCB0aGlzLmVsLmdldEJ5dGVzVG90YWwoKSwgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIGZpcnN0UGxheSgpIHtcbiAgICBpZiAodGhpcy5lbC5wbGF5ZXJQbGF5KSB7XG4gICAgICB0aGlzLmVsLnBsYXllclBsYXkodGhpcy5zcmMpXG4gICAgICB0aGlzLmxpc3RlblRvT25jZSh0aGlzLCBFdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCwgKCkgPT4gdGhpcy5jaGVja0luaXRpYWxTZWVrKCkpXG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiUExBWUlOR1wiXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdGVuVG9PbmNlKHRoaXMsIEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5maXJzdFBsYXkpXG4gICAgfVxuICB9XG5cbiAgY2hlY2tJbml0aWFsU2VlaygpIHtcbiAgICB2YXIgc2Vla1RpbWUgPSBzZWVrU3RyaW5nVG9TZWNvbmRzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgIGlmIChzZWVrVGltZSAhPT0gMCkge1xuICAgICAgdGhpcy5zZWVrU2Vjb25kcyhzZWVrVGltZSlcbiAgICB9XG4gIH1cblxuICBwbGF5KCkge1xuICAgIGlmICh0aGlzLmVsLmdldFN0YXRlKCkgPT09ICdQQVVTRUQnIHx8IHRoaXMuZWwuZ2V0U3RhdGUoKSA9PT0gJ1BMQVlJTkdfQlVGRkVSSU5HJykge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgICAgdGhpcy5lbC5wbGF5ZXJSZXN1bWUoKVxuICAgIH0gZWxzZSBpZiAodGhpcy5lbC5nZXRTdGF0ZSgpICE9PSAnUExBWUlORycpIHtcbiAgICAgIHRoaXMuZmlyc3RQbGF5KClcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZLCB0aGlzLm5hbWUpXG4gIH1cblxuICB2b2x1bWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5pc1JlYWR5KSB7XG4gICAgICB0aGlzLmVsLnBsYXllclZvbHVtZSh2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5Ub09uY2UodGhpcywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsICgpID0+IHRoaXMudm9sdW1lKHZhbHVlKSlcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiUEFVU0VEXCJcbiAgICB0aGlzLmVsLnBsYXllclBhdXNlKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BBVVNFLCB0aGlzLm5hbWUpXG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZWwucGxheWVyU3RvcCgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCAwLCB0aGlzLm5hbWUpXG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuICEhKHRoaXMuaXNSZWFkeSAmJiB0aGlzLmN1cnJlbnRTdGF0ZS5pbmRleE9mKFwiUExBWUlOR1wiKSA+IC0xKVxuICB9XG5cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwuZ2V0RHVyYXRpb24oKVxuICB9XG5cbiAgc2VlayhzZWVrQmFyVmFsdWUpIHtcbiAgICB2YXIgc2Vla1RvID0gdGhpcy5lbC5nZXREdXJhdGlvbigpICogKHNlZWtCYXJWYWx1ZSAvIDEwMClcbiAgICB0aGlzLnNlZWtTZWNvbmRzKHNlZWtUbylcbiAgfVxuXG4gIHNlZWtTZWNvbmRzKHNlZWtUbykge1xuICAgIHRoaXMuZWwucGxheWVyU2VlayhzZWVrVG8pXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCBzZWVrVG8sIHRoaXMuZWwuZ2V0RHVyYXRpb24oKSwgdGhpcy5uYW1lKVxuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gXCJQQVVTRURcIikge1xuICAgICAgdGhpcy5lbC5wbGF5ZXJQYXVzZSgpXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuYm9vdHN0cmFwSWQpXG4gICAgc3VwZXIuc3RvcExpc3RlbmluZygpXG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxuXG4gIHNldHVwSUUoKSB7XG4gICAgdGhpcy5zZXRFbGVtZW50KCQodGVtcGxhdGUob2JqZWN0SUUpKHsgY2lkOiB0aGlzLmNpZCwgYmFzZVVybDogdGhpcy5iYXNlVXJsLCBwbGF5YmFja0lkOiB0aGlzLnVuaXF1ZUlkIH0pKSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7IGNpZDogdGhpcy5jaWQsIGJhc2VVcmw6IHRoaXMuYmFzZVVybCwgcGxheWJhY2tJZDogdGhpcy51bmlxdWVJZCB9KSlcbiAgICBpZihCcm93c2VyLmlzRmlyZWZveCkge1xuICAgICAgdGhpcy5zZXR1cEZpcmVmb3goKVxuICAgIH0gZWxzZSBpZihCcm93c2VyLmlzTGVnYWN5SUUpIHtcbiAgICAgIHRoaXMuc2V0dXBJRSgpXG4gICAgfVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbkZsYXNoLmNhblBsYXkgPSBmdW5jdGlvbihyZXNvdXJjZSkge1xuICBpZiAoIUJyb3dzZXIuaGFzRmxhc2gpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfSBlbHNlIGlmICgoIUJyb3dzZXIuaXNNb2JpbGUgJiYgQnJvd3Nlci5pc0ZpcmVmb3gpIHx8IEJyb3dzZXIuaXNMZWdhY3lJRSkge1xuICAgIHJldHVybiAocmVzb3VyY2UgJiYgcmVzb3VyY2UuY29uc3RydWN0b3IgPT09IFN0cmluZykgJiYgISFyZXNvdXJjZS5tYXRjaCgvKC4qKVxcLihtcDR8bW92fGY0dnwzZ3BwfDNncCkvKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAocmVzb3VyY2UgJiYgcmVzb3VyY2UuY29uc3RydWN0b3IgPT09IFN0cmluZykgJiYgISFyZXNvdXJjZS5tYXRjaCgvKC4qKVxcLihtb3Z8ZjR2fDNncHB8M2dwKS8pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaFxuIiwidmFyIE1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9tZWRpYXRvcicpXG5cbmNsYXNzIEhMU0V2ZW50cyB7XG4gIGNvbnN0cnVjdG9yKGluc3RhbmNlSWQpIHtcbiAgICB0aGlzLmluc3RhbmNlSWQgPSBpbnN0YW5jZUlkXG4gIH1cbiAgcmVhZHkoKSB7XG4gICAgTWVkaWF0b3IudHJpZ2dlcihgJHt0aGlzLmluc3RhbmNlSWR9OmZsYXNocmVhZHlgKVxuICB9XG4gIHZpZGVvU2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgTWVkaWF0b3IudHJpZ2dlcihgJHt0aGlzLmluc3RhbmNlSWR9OnZpZGVvc2l6ZWNoYW5nZWRgLCB3aWR0aCwgaGVpZ2h0KVxuICB9XG4gIGNvbXBsZXRlKCkge1xuICAgIE1lZGlhdG9yLnRyaWdnZXIoYCR7dGhpcy5pbnN0YW5jZUlkfTpjb21wbGV0ZWApXG4gIH1cbiAgZXJyb3IoY29kZSwgdXJsLCBtZXNzYWdlKSB7XG4gICAgTWVkaWF0b3IudHJpZ2dlcihgJHt0aGlzLmluc3RhbmNlSWR9OmVycm9yYCwgY29kZSwgdXJsLCBtZXNzYWdlKVxuICB9XG4gIG1hbmlmZXN0KGR1cmF0aW9uLCBsb2FkbWV0cmljcykge1xuICAgIE1lZGlhdG9yLnRyaWdnZXIoYCR7dGhpcy5pbnN0YW5jZUlkfTptYW5pZmVzdGxvYWRlZGAsIGR1cmF0aW9uLCBsb2FkbWV0cmljcylcbiAgfVxuICBhdWRpb0xldmVsTG9hZGVkKGxvYWRtZXRyaWNzKSB7XG4gICAgTWVkaWF0b3IudHJpZ2dlcihgJHt0aGlzLmluc3RhbmNlSWR9OmF1ZGlvbGV2ZWxsb2FkZWRgLCBsb2FkbWV0cmljcylcbiAgfVxuICBsZXZlbExvYWRlZChsb2FkbWV0cmljcykge1xuICAgIE1lZGlhdG9yLnRyaWdnZXIoYCR7dGhpcy5pbnN0YW5jZUlkfTpsZXZlbGxvYWRlZGAsIGxvYWRtZXRyaWNzKVxuICB9XG4gIGZyYWdtZW50TG9hZGVkKGxvYWRtZXRyaWNzKSB7XG4gICAgTWVkaWF0b3IudHJpZ2dlcihgJHt0aGlzLmluc3RhbmNlSWR9OmZyYWdtZW50bG9hZGVkYCwgbG9hZG1ldHJpY3MpXG4gIH1cbiAgZnJhZ21lbnRQbGF5aW5nKHBsYXltZXRyaWNzKSB7XG4gICAgTWVkaWF0b3IudHJpZ2dlcihgJHt0aGlzLmluc3RhbmNlSWR9OmZyYWdtZW50cGxheWluZ2AsIHBsYXltZXRyaWNzKVxuICB9XG4gIHBvc2l0aW9uKHRpbWVtZXRyaWNzKSB7XG4gICAgTWVkaWF0b3IudHJpZ2dlcihgJHt0aGlzLmluc3RhbmNlSWR9OnRpbWV1cGRhdGVgLCB0aW1lbWV0cmljcylcbiAgfVxuICBzdGF0ZShuZXdTdGF0ZSkge1xuICAgIE1lZGlhdG9yLnRyaWdnZXIoYCR7dGhpcy5pbnN0YW5jZUlkfTpwbGF5YmFja3N0YXRlYCwgbmV3U3RhdGUpXG4gIH1cbiAgc2Vla1N0YXRlKG5ld1N0YXRlKSB7XG4gICAgTWVkaWF0b3IudHJpZ2dlcihgJHt0aGlzLmluc3RhbmNlSWR9OnNlZWtzdGF0ZWAsIG5ld1N0YXRlKVxuICB9XG4gIHN3aXRjaChuZXdMZXZlbCkge1xuICAgIE1lZGlhdG9yLnRyaWdnZXIoYCR7dGhpcy5pbnN0YW5jZUlkfTpsZXZlbGNoYW5nZWRgLCBuZXdMZXZlbClcbiAgfVxuICBhdWRpb1RyYWNrc0xpc3RDaGFuZ2UodHJhY2tMaXN0KSB7XG4gICAgTWVkaWF0b3IudHJpZ2dlcihgJHt0aGlzLmluc3RhbmNlSWR9OmF1ZGlvdHJhY2tsaXN0Y2hhbmdlZGAsIHRyYWNrTGlzdClcbiAgfVxuICBhdWRpb1RyYWNrQ2hhbmdlKHRyYWNrSWQpIHtcbiAgICBNZWRpYXRvci50cmlnZ2VyKGAke3RoaXMuaW5zdGFuY2VJZH06YXVkaW90cmFja2NoYW5nZWRgLCB0cmFja0lkKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSExTRXZlbnRzXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3BsYXliYWNrJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgYXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLmFzc2lnbicpXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3RlbXBsYXRlJylcblxudmFyIE1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9tZWRpYXRvcicpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnJvd3NlcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJylcblxudmFyIEhMU0V2ZW50cyA9IHJlcXVpcmUoJy4vZmxhc2hsc19ldmVudHMnKVxuXG52YXIgb2JqZWN0SUUgPSAnPG9iamVjdCB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiBpZD1cIjwlPSBjaWQgJT5cIiBjbGFzcz1cImhscy1wbGF5YmFja1wiIGNsYXNzaWQ9XCJjbHNpZDpkMjdjZGI2ZS1hZTZkLTExY2YtOTZiOC00NDQ1NTM1NDAwMDBcIiBkYXRhLWhscz1cIlwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj48cGFyYW0gbmFtZT1cIm1vdmllXCIgdmFsdWU9XCI8JT0gYmFzZVVybCAlPi9hc3NldHMvZmxhc2hsc0Nocm9tZWxlc3Muc3dmXCI+IDxwYXJhbSBuYW1lPVwicXVhbGl0eVwiIHZhbHVlPVwiYXV0b2hpZ2hcIj4gPHBhcmFtIG5hbWU9XCJzd2xpdmVjb25uZWN0XCIgdmFsdWU9XCJ0cnVlXCI+IDxwYXJhbSBuYW1lPVwiYWxsb3dTY3JpcHRBY2Nlc3NcIiB2YWx1ZT1cImFsd2F5c1wiPiA8cGFyYW0gbmFtZT1cImJnY29sb3JcIiB2YWx1ZT1cIiMwMDExMjJcIj4gPHBhcmFtIG5hbWU9XCJhbGxvd0Z1bGxTY3JlZW5cIiB2YWx1ZT1cImZhbHNlXCI+IDxwYXJhbSBuYW1lPVwid21vZGVcIiB2YWx1ZT1cInRyYW5zcGFyZW50XCI+IDxwYXJhbSBuYW1lPVwidGFiaW5kZXhcIiB2YWx1ZT1cIjFcIj4gPHBhcmFtIG5hbWU9Rmxhc2hWYXJzIHZhbHVlPVwicGxheWJhY2tJZD08JT0gcGxheWJhY2tJZCAlPlwiIC8+IDwvb2JqZWN0PidcblxuY2xhc3MgSExTIGV4dGVuZHMgUGxheWJhY2sge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdobHMnIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnb2JqZWN0JyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5obHMgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsYXNzJzogJ2hscy1wbGF5YmFjaycsXG4gICAgICAnZGF0YS1obHMnOiAnJyxcbiAgICAgICd0eXBlJzogJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyxcbiAgICAgICd3aWR0aCc6ICcxMDAlJyxcbiAgICAgICdoZWlnaHQnOiAnMTAwJSdcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnNyYyA9IG9wdGlvbnMuc3JjXG4gICAgdGhpcy5iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsO1xuICAgIHRoaXMuZmx1c2hMaXZlVVJMQ2FjaGUgPSAob3B0aW9ucy5mbHVzaExpdmVVUkxDYWNoZSA9PT0gdW5kZWZpbmVkKSA/IHRydWUgOiBvcHRpb25zLmZsdXNoTGl2ZVVSTENhY2hlXG4gICAgdGhpcy5jYXBMZXZlbFRvU3RhZ2UgPSAob3B0aW9ucy5jYXBMZXZlbFRvU3RhZ2UgPT09IHVuZGVmaW5lZCkgPyBmYWxzZSA6IG9wdGlvbnMuY2FwTGV2ZWxUb1N0YWdlXG4gICAgdGhpcy51c2VIYXJkd2FyZVZpZGVvRGVjb2RlciA9IChvcHRpb25zLnVzZUhhcmR3YXJlVmlkZW9EZWNvZGVyID09PSB1bmRlZmluZWQpID8gdHJ1ZSA6IG9wdGlvbnMudXNlSGFyZHdhcmVWaWRlb0RlY29kZXJcbiAgICB0aGlzLm1heEJ1ZmZlckxlbmd0aCA9IChvcHRpb25zLm1heEJ1ZmZlckxlbmd0aCA9PT0gdW5kZWZpbmVkKSA/IDEyMCA6IG9wdGlvbnMubWF4QnVmZmVyTGVuZ3RoXG4gICAgdGhpcy5oaWdoRGVmaW5pdGlvbiA9IGZhbHNlXG4gICAgdGhpcy5hdXRvUGxheSA9IG9wdGlvbnMuYXV0b1BsYXlcbiAgICB0aGlzLmRlZmF1bHRTZXR0aW5ncyA9IHtcbiAgICAgIGxlZnQ6IFtcInBsYXlzdG9wXCJdLFxuICAgICAgZGVmYXVsdDogWydzZWVrYmFyJ10sXG4gICAgICByaWdodDogW1wiZnVsbHNjcmVlblwiLCBcInZvbHVtZVwiLCBcImhkLWluZGljYXRvclwiXSxcbiAgICAgIHNlZWtFbmFibGVkOiBmYWxzZVxuICAgIH1cbiAgICB0aGlzLnNldHRpbmdzID0gYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRTZXR0aW5ncylcbiAgICB0aGlzLnBsYXliYWNrVHlwZSA9ICdsaXZlJ1xuICAgIHRoaXMuYWRkTGlzdGVuZXJzKClcbiAgfVxuXG4gIGFkZExpc3RlbmVycygpIHtcbiAgICBNZWRpYXRvci5vbih0aGlzLmNpZCArICc6Zmxhc2hyZWFkeScsICgpID0+IHRoaXMuYm9vdHN0cmFwKCkpXG4gICAgTWVkaWF0b3Iub24odGhpcy5jaWQgKyAnOnRpbWV1cGRhdGUnLCAodGltZU1ldHJpY3MpID0+IHRoaXMudXBkYXRlVGltZSh0aW1lTWV0cmljcykpXG4gICAgTWVkaWF0b3Iub24odGhpcy5jaWQgKyAnOnBsYXliYWNrc3RhdGUnLCAoc3RhdGUpID0+IHRoaXMuc2V0UGxheWJhY2tTdGF0ZShzdGF0ZSkpXG4gICAgTWVkaWF0b3Iub24odGhpcy5jaWQgKyAnOmxldmVsY2hhbmdlZCcsIChsZXZlbCkgPT4gdGhpcy51cGRhdGVIaWdoRGVmaW5pdGlvbihsZXZlbCkpXG4gICAgTWVkaWF0b3Iub24odGhpcy5jaWQgKyAnOnBsYXliYWNrZXJyb3InLCAoKSA9PiB0aGlzLmZsYXNoUGxheWJhY2tFcnJvcigpKVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICBNZWRpYXRvci5vZmYodGhpcy5jaWQgKyAnOmZsYXNocmVhZHknKVxuICAgIE1lZGlhdG9yLm9mZih0aGlzLmNpZCArICc6dGltZXVwZGF0ZScpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMuY2lkICsgJzpwbGF5YmFja3N0YXRlJylcbiAgICBNZWRpYXRvci5vZmYodGhpcy5jaWQgKyAnOmxldmVsY2hhbmdlZCcpXG4gICAgTWVkaWF0b3Iub2ZmKHRoaXMuY2lkICsgJzpwbGF5YmFja2Vycm9yJylcbiAgfVxuXG4gIGJvb3RzdHJhcCgpIHtcbiAgICB0aGlzLmVsLndpZHRoID0gXCIxMDAlXCJcbiAgICB0aGlzLmVsLmhlaWdodCA9IFwiMTAwJVwiXG4gICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZVxuICAgIHRoaXMuc3JjTG9hZGVkID0gZmFsc2VcbiAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiSURMRVwiXG4gICAgdGhpcy5zZXRGbGFzaFNldHRpbmdzKClcbiAgICB0aGlzLnVwZGF0ZVBsYXliYWNrVHlwZSgpXG4gICAgdGhpcy5hdXRvUGxheSAmJiB0aGlzLnBsYXkoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMubmFtZSlcbiAgfVxuXG4gIHNldEZsYXNoU2V0dGluZ3MoKSB7XG4gICAgdGhpcy5lbC5wbGF5ZXJTZXRmbHVzaExpdmVVUkxDYWNoZSh0aGlzLmZsdXNoTGl2ZVVSTENhY2hlKVxuICAgIHRoaXMuZWwucGxheWVyQ2FwTGV2ZWx0b1N0YWdlKHRoaXMuY2FwTGV2ZWxUb1N0YWdlKVxuICAgIHRoaXMuZWwucGxheWVyU2V0bWF4QnVmZmVyTGVuZ3RoKHRoaXMubWF4QnVmZmVyTGVuZ3RoKVxuICAgIHRoaXMuZWwucGxheWVyU2V0VXNlSGFyZHdhcmVWaWRlb0RlY29kZXIodGhpcy51c2VIYXJkd2FyZVZpZGVvRGVjb2RlcilcbiAgfVxuXG4gIHVwZGF0ZUhpZ2hEZWZpbml0aW9uKGxldmVsKSB7XG4gICAgdmFyIGN1cnJlbnRMZXZlbCA9IHRoaXMuZ2V0TGV2ZWxzKClbbGV2ZWxdXG4gICAgdGhpcy5oaWdoRGVmaW5pdGlvbiA9IChjdXJyZW50TGV2ZWwuaGVpZ2h0ID49IDcyMCB8fCAoY3VycmVudExldmVsLmJpdHJhdGUgLyAxMDAwKSA+PSAyMDAwKTtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0hJR0hERUZJTklUSU9OVVBEQVRFKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQklUUkFURSwgeydiaXRyYXRlJzogdGhpcy5nZXRDdXJyZW50Qml0cmF0ZSgpfSlcbiAgfVxuXG4gIHVwZGF0ZVRpbWUodGltZU1ldHJpY3MpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgPT09ICdJRExFJykgcmV0dXJuXG5cbiAgICB2YXIgZHVyYXRpb24gPSB0aGlzLm5vcm1hbGl6ZUR1cmF0aW9uKHRpbWVNZXRyaWNzLmR1cmF0aW9uKVxuICAgIHZhciBwb3NpdGlvbiA9IE1hdGgubWluKE1hdGgubWF4KHRpbWVNZXRyaWNzLnBvc2l0aW9uLCAwKSwgZHVyYXRpb24pXG4gICAgdmFyIHByZXZpb3VzRFZSU3RhdHVzID0gdGhpcy5kdnJFbmFibGVkXG4gICAgdmFyIGxpdmVQbGF5YmFjayA9ICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gJ2xpdmUnKVxuICAgIHRoaXMuZHZyRW5hYmxlZCA9IChsaXZlUGxheWJhY2sgJiYgZHVyYXRpb24gPiAyNDApXG5cbiAgICBpZiAoZHVyYXRpb24gPT09IDEwMCB8fCBsaXZlUGxheWJhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmR2ckVuYWJsZWQgIT09IHByZXZpb3VzRFZSU3RhdHVzKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNldHRpbmdzKClcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfU0VUVElOR1NVUERBVEUsIHRoaXMubmFtZSlcbiAgICB9XG5cbiAgICBpZiAobGl2ZVBsYXliYWNrICYmICghdGhpcy5kdnJFbmFibGVkIHx8ICF0aGlzLmR2ckluVXNlKSkge1xuICAgICAgcG9zaXRpb24gPSBkdXJhdGlvblxuICAgIH1cblxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgcG9zaXRpb24sIGR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gIH1cblxuICBwbGF5KCkge1xuICAgIGlmKHRoaXMuY3VycmVudFN0YXRlID09PSAnUEFVU0VEJykge1xuICAgICAgdGhpcy5lbC5wbGF5ZXJSZXN1bWUoKVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuc3JjTG9hZGVkICYmIHRoaXMuY3VycmVudFN0YXRlICE9PSBcIlBMQVlJTkdcIikge1xuICAgICAgdGhpcy5maXJzdFBsYXkoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsLnBsYXllclBsYXkoKVxuICAgIH1cbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5YmFja1R5cGU/IHRoaXMucGxheWJhY2tUeXBlOiBudWxsXG4gIH1cblxuICBnZXRDdXJyZW50Qml0cmF0ZSgpIHtcbiAgICB2YXIgY3VycmVudExldmVsID0gdGhpcy5nZXRMZXZlbHMoKVt0aGlzLmVsLmdldExldmVsKCldXG4gICAgcmV0dXJuIGN1cnJlbnRMZXZlbC5iaXRyYXRlXG4gIH1cblxuICBpc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlnaERlZmluaXRpb25cbiAgfVxuXG4gIGdldExldmVscygpIHtcbiAgICBpZiAoIXRoaXMubGV2ZWxzIHx8IHRoaXMubGV2ZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5sZXZlbHMgPSB0aGlzLmVsLmdldExldmVscygpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxldmVsc1xuICB9XG5cbiAgc2V0UGxheWJhY2tTdGF0ZShzdGF0ZSkge1xuICAgIGlmIChbXCJQTEFZSU5HX0JVRkZFUklOR1wiLCBcIlBBVVNFRF9CVUZGRVJJTkdcIl0uaW5kZXhPZihzdGF0ZSkgPj0gMCkgIHtcbiAgICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfQlVGRkVSSU5HLCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRTdGF0ZShzdGF0ZSlcbiAgICB9IGVsc2UgaWYgKFtcIlBMQVlJTkdcIiwgXCJQQVVTRURcIl0uaW5kZXhPZihzdGF0ZSkgPj0gMCkge1xuICAgICAgaWYgKFtcIlBMQVlJTkdfQlVGRkVSSU5HXCIsIFwiUEFVU0VEX0JVRkZFUklOR1wiLCBcIlBBVVNFRFwiLCBcIklETEVcIl0uaW5kZXhPZih0aGlzLmN1cnJlbnRTdGF0ZSkgPj0gMCkge1xuICAgICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsIHRoaXMubmFtZSlcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlKVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFwiSURMRVwiKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0VOREVELCB0aGlzLm5hbWUpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDAsIHRoaXMuZWwuZ2V0RHVyYXRpb24oKSwgdGhpcy5uYW1lKVxuICAgICAgdGhpcy51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlKSB7XG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZVxuICAgIHRoaXMudXBkYXRlUGxheWJhY2tUeXBlKClcbiAgICBpZiAoc3RhdGUgPT09IFwiUExBWUlOR1wiKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BMQVksIHRoaXMubmFtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QQVVTRSwgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVBsYXliYWNrVHlwZSgpIHtcbiAgICB0aGlzLnBsYXliYWNrVHlwZSA9IHRoaXMuZWwuZ2V0VHlwZSgpXG4gICAgaWYgKHRoaXMucGxheWJhY2tUeXBlKSB7XG4gICAgICB0aGlzLnBsYXliYWNrVHlwZSA9IHRoaXMucGxheWJhY2tUeXBlLnRvTG93ZXJDYXNlKClcbiAgICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gJ3ZvZCcpIHtcbiAgICAgICAgdGhpcy5zdGFydFJlcG9ydGluZ1Byb2dyZXNzKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcFJlcG9ydGluZ1Byb2dyZXNzKClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZQkFDS1NUQVRFKVxuICB9XG5cbiAgc3RhcnRSZXBvcnRpbmdQcm9ncmVzcygpIHtcbiAgICBpZiAoIXRoaXMucmVwb3J0aW5nUHJvZ3Jlc3MpIHtcbiAgICAgIHRoaXMucmVwb3J0aW5nUHJvZ3Jlc3MgPSB0cnVlXG4gICAgICBNZWRpYXRvci5vbih0aGlzLmNpZCArICc6ZnJhZ21lbnRsb2FkZWQnLCgpID0+IHRoaXMub25GcmFnbWVudExvYWRlZCgpKVxuICAgIH1cbiAgfVxuXG4gIHN0b3BSZXBvcnRpbmdQcm9ncmVzcygpIHtcbiAgICBNZWRpYXRvci5vZmYodGhpcy5jaWQgKyAnOmZyYWdtZW50bG9hZGVkJywgdGhpcy5vbkZyYWdtZW50TG9hZGVkLCB0aGlzKVxuICB9XG5cbiAgb25GcmFnbWVudExvYWRlZCgpIHtcbiAgICB2YXIgYnVmZmVyZWQgPSB0aGlzLmVsLmdldFBvc2l0aW9uKCkgKyB0aGlzLmVsLmdldGJ1ZmZlckxlbmd0aCgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgdGhpcy5lbC5nZXRQb3NpdGlvbigpLCBidWZmZXJlZCwgdGhpcy5lbC5nZXREdXJhdGlvbigpLCB0aGlzLm5hbWUpXG4gIH1cblxuICBmaXJzdFBsYXkoKSB7XG4gICAgdGhpcy5zZXRGbGFzaFNldHRpbmdzKCkgLy9lbnN1cmUgZmx1c2hMaXZlVVJMQ2FjaGUgd2lsbCB3b3JrICgjMzI3KVxuICAgIHRoaXMuZWwucGxheWVyTG9hZCh0aGlzLnNyYylcbiAgICBNZWRpYXRvci5vbmNlKHRoaXMuY2lkICsgJzptYW5pZmVzdGxvYWRlZCcsKCkgPT4gdGhpcy5lbC5wbGF5ZXJQbGF5KCkpXG4gICAgdGhpcy5zcmNMb2FkZWQgPSB0cnVlXG4gIH1cblxuICB2b2x1bWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5pc1JlYWR5KSB7XG4gICAgICB0aGlzLmVsLnBsYXllclZvbHVtZSh2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5Ub09uY2UodGhpcywgRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwsICgpID0+IHRoaXMudm9sdW1lKHZhbHVlKSlcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBpZiAodGhpcy5wbGF5YmFja1R5cGUgIT09ICdsaXZlJyB8fCB0aGlzLmR2ckVuYWJsZWQpIHtcbiAgICAgIHRoaXMuZWwucGxheWVyUGF1c2UoKVxuICAgICAgaWYgKHRoaXMucGxheWJhY2tUeXBlID09PSAnbGl2ZScgJiYgdGhpcy5kdnJFbmFibGVkKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRHZyKHRydWUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmVsLnBsYXllclN0b3AoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5uYW1lKVxuICB9XG5cbiAgaXNQbGF5aW5nKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSkge1xuICAgICAgcmV0dXJuICEhKHRoaXMuY3VycmVudFN0YXRlLm1hdGNoKC9wbGF5aW5nL2kpKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIG5vcm1hbGl6ZUR1cmF0aW9uKGR1cmF0aW9uKSB7XG4gICAgaWYgKHRoaXMucGxheWJhY2tUeXBlID09PSAnbGl2ZScpIHtcbiAgICAgIC8vIGVzdGltYXRlIDEwIHNlY29uZHMgb2YgYnVmZmVyIHRpbWUgZm9yIGxpdmUgc3RyZWFtcyBmb3Igc2VlayBwb3NpdGlvbnNcbiAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gLSAxMFxuICAgIH1cbiAgICByZXR1cm4gZHVyYXRpb25cbiAgfVxuXG4gIHNlZWsodGltZSkge1xuICAgIHZhciBkdXJhdGlvbiA9IHRoaXMuZWwuZ2V0RHVyYXRpb24oKVxuICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgdGltZSA9IGR1cmF0aW9uICogdGltZSAvIDEwMFxuICAgIH1cblxuICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gJ2xpdmUnKSB7XG4gICAgICAvLyBzZWVrIG9wZXJhdGlvbnMgdG8gYSB0aW1lIHdpdGhpbiA1IHNlY29uZHMgZnJvbSBsaXZlIHN0cmVhbSB3aWxsIHBvc2l0aW9uIHBsYXloZWFkIGJhY2sgdG8gbGl2ZVxuICAgICAgdmFyIGR2ckluVXNlID0gKHRpbWUgPj0gMCAmJiBkdXJhdGlvbiAtIHRpbWUgPiA1KVxuICAgICAgaWYgKCFkdnJJblVzZSkge1xuICAgICAgICB0aW1lID0gLTFcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlRHZyKGR2ckluVXNlKVxuICAgIH1cbiAgICB0aGlzLmVsLnBsYXllclNlZWsodGltZSlcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRpbWUsIGR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19ISUdIREVGSU5JVElPTlVQREFURSlcbiAgfVxuXG4gIHVwZGF0ZUR2cihkdnJJblVzZSkge1xuICAgIHZhciBwcmV2aW91c0R2ckluVXNlID0gISF0aGlzLmR2ckluVXNlXG4gICAgdGhpcy5kdnJJblVzZSA9IGR2ckluVXNlXG4gICAgaWYgKHRoaXMuZHZySW5Vc2UgIT09IHByZXZpb3VzRHZySW5Vc2UpIHtcbiAgICAgIHRoaXMudXBkYXRlU2V0dGluZ3MoKVxuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19EVlIsIHRoaXMuZHZySW5Vc2UpXG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1NUQVRTX0FERCwgeydkdnInOiB0aGlzLmR2ckluVXNlfSlcbiAgICB9XG4gIH1cblxuICBmbGFzaFBsYXliYWNrRXJyb3IoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19TVE9QKVxuICB9XG5cbiAgdGltZVVwZGF0ZSh0aW1lLCBkdXJhdGlvbikge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgdGltZSwgZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLiRlbC5yZW1vdmUoKVxuICB9XG5cbiAgc2V0dXBGaXJlZm94KCkge1xuICAgIHZhciAkZWwgPSB0aGlzLiQoJ2VtYmVkJylcbiAgICAkZWwuYXR0cignZGF0YS1obHMnLCAnJylcbiAgICB0aGlzLnNldEVsZW1lbnQoJGVsKVxuICB9XG5cbiAgc2V0dXBJRSgpIHtcbiAgICB0aGlzLnNldEVsZW1lbnQoJCh0ZW1wbGF0ZShvYmplY3RJRSkoe2NpZDogdGhpcy5jaWQsIGJhc2VVcmw6IHRoaXMuYmFzZVVybCwgcGxheWJhY2tJZDogdGhpcy51bmlxdWVJZH0pKSlcbiAgfVxuXG4gIHVwZGF0ZVNldHRpbmdzKCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdFNldHRpbmdzKVxuICAgIGlmICh0aGlzLnBsYXliYWNrVHlwZSA9PT0gXCJ2b2RcIiB8fCB0aGlzLmR2ckluVXNlKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSBbXCJwbGF5cGF1c2VcIiwgXCJwb3NpdGlvblwiLCBcImR1cmF0aW9uXCJdXG4gICAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gdHJ1ZVxuICAgIH0gZWxzZSBpZiAodGhpcy5kdnJFbmFibGVkKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSBbXCJwbGF5cGF1c2VcIl1cbiAgICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2Vla0VuYWJsZWQgPSBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHNldEVsZW1lbnQoZWxlbWVudCkge1xuICAgIHRoaXMuJGVsID0gZWxlbWVudFxuICAgIHRoaXMuZWwgPSBlbGVtZW50WzBdXG4gIH1cblxuICBjcmVhdGVDYWxsYmFja3MoKSB7XG4gICAgaWYgKCF3aW5kb3cuQ2xhcHByLmZsYXNobHNDYWxsYmFja3MpIHtcbiAgICAgIHdpbmRvdy5DbGFwcHIuZmxhc2hsc0NhbGxiYWNrcyA9IHt9XG4gICAgfVxuICAgIHRoaXMuZmxhc2hsc0V2ZW50cyA9IG5ldyBITFNFdmVudHModGhpcy5jaWQpXG4gICAgd2luZG93LkNsYXBwci5mbGFzaGxzQ2FsbGJhY2tzW3RoaXMuY2lkXSA9IChldmVudE5hbWUsIGFyZ3MpID0+IHtcbiAgICAgIHRoaXMuZmxhc2hsc0V2ZW50c1tldmVudE5hbWVdLmFwcGx5KHRoaXMuZmxhc2hsc0V2ZW50cywgYXJncylcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSlcbiAgICBpZihCcm93c2VyLmlzTGVnYWN5SUUpIHtcbiAgICAgIHRoaXMuc2V0dXBJRSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjYWxsYmFja05hbWUgPSB0aGlzLmNyZWF0ZUNhbGxiYWNrcygpXG4gICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoe2NpZDogdGhpcy5jaWQsIGJhc2VVcmw6IHRoaXMuYmFzZVVybCwgcGxheWJhY2tJZDogdGhpcy51bmlxdWVJZCwgY2FsbGJhY2tOYW1lOiBgd2luZG93LkNsYXBwci5mbGFzaGxzQ2FsbGJhY2tzLiR7dGhpcy5jaWR9YH0pKVxuICAgICAgaWYoQnJvd3Nlci5pc0ZpcmVmb3gpIHtcbiAgICAgICAgdGhpcy5zZXR1cEZpcmVmb3goKVxuICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzSUUpIHtcbiAgICAgICAgdGhpcy4kKCdlbWJlZCcpLnJlbW92ZSgpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZWwuaWQgPSB0aGlzLmNpZFxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbkhMUy5jYW5QbGF5ID0gZnVuY3Rpb24ocmVzb3VyY2UsIG1pbWVUeXBlKSB7XG4gIHJldHVybiBCcm93c2VyLmhhc0ZsYXNoICYmICghIXJlc291cmNlLm1hdGNoKC9eaHR0cCguKikubTN1OD8vKSB8fCBtaW1lVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3gtbXBlZ1VSTCcpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gSExTXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3BsYXliYWNrJylcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2V2ZW50cycpXG52YXIgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC5maW5kJylcblxuY2xhc3MgSFRNTDVBdWRpbyBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnaHRtbDVfYXVkaW8nIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnYXVkaW8nIH1cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2xvYWRlZG1ldGFkYXRhJzogJ2xvYWRlZE1ldGFkYXRhJyxcbiAgICAgICdzdGFsbGVkJzogJ3N0YWxsZWQnLFxuICAgICAgJ3dhaXRpbmcnOiAnd2FpdGluZycsXG4gICAgICAndGltZXVwZGF0ZSc6ICd0aW1lVXBkYXRlZCcsXG4gICAgICAnZW5kZWQnOiAnZW5kZWQnLFxuICAgICAgJ2NhbnBsYXl0aHJvdWdoJzogJ2J1ZmZlckZ1bGwnLFxuICAgICAgJ3BsYXlpbmcnOiAncGxheWluZycsXG4gICAgICAncGF1c2UnOiAncGF1c2VkJ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHN1cGVyKHBhcmFtcylcbiAgICB0aGlzLm9wdGlvbnMgPSBwYXJhbXNcbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgbGVmdDogWydwbGF5cGF1c2UnLCAncG9zaXRpb24nLCAnZHVyYXRpb24nXSxcbiAgICAgIHJpZ2h0OiBbJ2Z1bGxzY3JlZW4nLCAndm9sdW1lJ10sXG4gICAgICBkZWZhdWx0OiBbJ3NlZWtiYXInXSxcbiAgICAgIHNlZWtFbmFibGVkOiB0cnVlXG4gICAgfVxuICAgIHRoaXMucmVuZGVyKClcbiAgICBwYXJhbXMuYXV0b1BsYXkgJiYgdGhpcy5wbGF5KClcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLnBsYXkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QQVVTRSwgdGhpcy5wYXVzZSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NFRUssIHRoaXMuc2VlaylcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1ZPTFVNRSwgdGhpcy52b2x1bWUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLnN0b3ApXG4gIH1cblxuICBsb2FkZWRNZXRhZGF0YShlKSB7XG4gICAgdGhpcy5kdXJhdGlvbkNoYW5nZSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19MT0FERURNRVRBREFUQSwgZS50YXJnZXQuZHVyYXRpb24pXG4gIH1cblxuICBkdXJhdGlvbkNoYW5nZSgpIHtcbiAgICAvLyB3ZSBjYW4ndCBmaWd1cmUgb3V0IGlmIGhscyByZXNvdXJjZSBpcyBWb0Qgb3Igbm90IHVudGlsIGl0IGlzIGJlaW5nIGxvYWRlZCBvciBkdXJhdGlvbiBoYXMgY2hhbmdlZC5cbiAgICAvLyB0aGF0J3Mgd2h5IHdlIGNoZWNrIGl0IGFnYWluIGFuZCB1cGRhdGUgbWVkaWEgY29udHJvbCBhY2NvcmRpbmdseS5cbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ2FvZCcpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MubGVmdCA9IFtcInBsYXlwYXVzZVwiLCBcInBvc2l0aW9uXCIsIFwiZHVyYXRpb25cIl1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gW1wicGxheXN0b3BcIl1cbiAgICB9XG4gICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IGlzRmluaXRlKHRoaXMuZ2V0RHVyYXRpb24oKSlcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiBbMCwgdW5kZWZpbmVkLCBJbmZpbml0eV0uaW5kZXhPZih0aGlzLmVsLmR1cmF0aW9uKSA+PSAwID8gJ2xpdmUnIDogJ2FvZCdcbiAgfVxuXG4gIHN0YWxsZWQoKSB7XG4gICAgaWYgKHRoaXMuZ2V0UGxheWJhY2tUeXBlKCkgPT09ICd2b2QnICYmIHRoaXMuZWwucmVhZHlTdGF0ZSA8IHRoaXMuZWwuSEFWRV9GVVRVUkVfREFUQSkge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJJTkcsIHRoaXMubmFtZSlcbiAgICB9XG4gIH1cblxuICB3YWl0aW5nKCkge1xuICAgIGlmKHRoaXMuZWwucmVhZHlTdGF0ZSA8IHRoaXMuZWwuSEFWRV9GVVRVUkVfREFUQSkge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJJTkcsIHRoaXMubmFtZSlcbiAgICB9XG4gIH1cblxuICBwbGF5KCkge1xuICAgIGlmICh0aGlzLmVsLnNyYyAhPT0gdGhpcy5vcHRpb25zLnNyYykge1xuICAgICAgdGhpcy5lbC5zcmMgPSB0aGlzLm9wdGlvbnMuc3JjXG4gICAgfVxuICAgIHRoaXMuZWwucGxheSgpXG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QTEFZKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuZWwucGF1c2UoKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnBhdXNlKClcbiAgICB0aGlzLmVsLmN1cnJlbnRUaW1lID0gMFxuICAgIHRoaXMuZWwuc3JjID0gJydcbiAgfVxuXG4gIHZvbHVtZSh2YWx1ZSkge1xuICAgIHRoaXMuZWwudm9sdW1lID0gdmFsdWUgLyAxMDBcbiAgfVxuXG4gIG11dGUoKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSAwXG4gIH1cblxuICB1bm11dGUoKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSAxXG4gIH1cblxuICBpc011dGVkKCkge1xuICAgIHJldHVybiAhIXRoaXMuZWwudm9sdW1lXG4gIH1cblxuICBlbmRlZCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFLCAwKVxuICB9XG5cbiAgc2VlayhzZWVrQmFyVmFsdWUpIHtcbiAgICB2YXIgdGltZSA9IHRoaXMuZWwuZHVyYXRpb24gKiAoc2Vla0JhclZhbHVlIC8gMTAwKVxuICAgIHRoaXMuZWwuY3VycmVudFRpbWUgPSB0aW1lXG4gIH1cblxuICBnZXRDdXJyZW50VGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5jdXJyZW50VGltZVxuICB9XG5cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwuZHVyYXRpb25cbiAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gIXRoaXMuZWwucGF1c2VkICYmICF0aGlzLmVsLmVuZGVkXG4gIH1cblxuICBwbGF5aW5nKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUExBWSk7XG4gIH1cblxuICBwYXVzZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QQVVTRSk7XG4gIH1cblxuICB0aW1lVXBkYXRlZCgpIHtcbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ2xpdmUnKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDEsIDEsIHRoaXMubmFtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aGlzLmVsLmN1cnJlbnRUaW1lLCB0aGlzLmVsLmR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgYnVmZmVyRnVsbCgpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIHRoaXMuZWwuY3VycmVudFRpbWUsIHRoaXMuZWwuZHVyYXRpb24sIHRoaXMubmFtZSlcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUkZVTEwpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19SRUFEWSwgdGhpcy5uYW1lKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbiB9XG5cbkhUTUw1QXVkaW8uY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlLCBtaW1lVHlwZSkge1xuICB2YXIgbWltZXR5cGVzID0ge1xuICAgICd3YXYnOiBbJ2F1ZGlvL3dhdiddLFxuICAgICdtcDMnOiBbJ2F1ZGlvL21wMycsICdhdWRpby9tcGVnO2NvZGVjcz1cIm1wM1wiJ10sXG4gICAgJ2FhYyc6IFsnYXVkaW8vbXA0O2NvZGVjcz1cIm1wNGEuNDAuNVwiJ10sXG4gICAgJ29nYSc6IFsnYXVkaW8vb2dnJ11cbiAgfVxuICB2YXIgcmVzb3VyY2VQYXJ0cyA9IHJlc291cmNlLnNwbGl0KCc/JylbMF0ubWF0Y2goLy4qXFwuKC4qKSQvKSB8fCBbXVxuICBpZiAoKHJlc291cmNlUGFydHMubGVuZ3RoID4gMSkgJiYgKG1pbWV0eXBlc1tyZXNvdXJjZVBhcnRzWzFdXSAhPT0gdW5kZWZpbmVkKSkge1xuICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKVxuICAgIHJldHVybiAhIWZpbmQobWltZXR5cGVzW3Jlc291cmNlUGFydHNbMV1dLCAoZXh0KSA9PiB7IHJldHVybiAhIWEuY2FuUGxheVR5cGUoZXh0KS5yZXBsYWNlKC9uby8sICcnKSB9KVxuICB9IGVsc2UgaWYgKG1pbWVUeXBlKSB7XG4gICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpXG4gICAgcmV0dXJuICEhYS5jYW5QbGF5VHlwZShtaW1lVHlwZSkucmVwbGFjZSgvbm8vLCAnJylcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEhUTUw1QXVkaW9cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvcGxheWJhY2snKVxudmFyIEpTVCA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvanN0JylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgQnJvd3NlciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnJvd3NlcicpXG52YXIgc2Vla1N0cmluZ1RvU2Vjb25kcyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvdXRpbHMnKS5zZWVrU3RyaW5nVG9TZWNvbmRzXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxudmFyIGZpbmQgPSByZXF1aXJlKCdsb2Rhc2guZmluZCcpXG5cbmNsYXNzIEhUTUw1VmlkZW8gZXh0ZW5kcyBQbGF5YmFjayB7XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gJ2h0bWw1X3ZpZGVvJyB9XG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ3ZpZGVvJyB9XG4gIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIEpTVC5odG1sNV92aWRlbyB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkYXRhLWh0bWw1LXZpZGVvJzogJydcbiAgICB9XG4gIH1cblxuICBnZXQgZXZlbnRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAndGltZXVwZGF0ZSc6ICd0aW1lVXBkYXRlZCcsXG4gICAgICAncHJvZ3Jlc3MnOiAncHJvZ3Jlc3MnLFxuICAgICAgJ2VuZGVkJzogJ2VuZGVkJyxcbiAgICAgICdzdGFsbGVkJzogJ3N0YWxsZWQnLFxuICAgICAgJ3dhaXRpbmcnOiAnd2FpdGluZycsXG4gICAgICAnY2FucGxheXRocm91Z2gnOiAnYnVmZmVyRnVsbCcsXG4gICAgICAnbG9hZGVkbWV0YWRhdGEnOiAnbG9hZGVkTWV0YWRhdGEnLFxuICAgICAgJ2NhbnBsYXknOiAncmVhZHknLFxuICAgICAgJ2R1cmF0aW9uY2hhbmdlJzogJ2R1cmF0aW9uQ2hhbmdlJyxcbiAgICAgICdlcnJvcic6ICdlcnJvcicsXG4gICAgICAncGxheWluZyc6ICdwbGF5aW5nJyxcbiAgICAgICdwYXVzZSc6ICdwYXVzZWQnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMuc3JjID0gb3B0aW9ucy5zcmNcbiAgICB0aGlzLmVsLnNyYyA9IG9wdGlvbnMuc3JjXG4gICAgdGhpcy5lbC5sb29wID0gb3B0aW9ucy5sb29wXG4gICAgdGhpcy5maXJzdEJ1ZmZlciA9IHRydWVcbiAgICB0aGlzLnNldHRpbmdzID0ge2RlZmF1bHQ6IFsnc2Vla2JhciddfVxuICAgIGlmIChCcm93c2VyLmlzU2FmYXJpKSB7XG4gICAgICB0aGlzLnNldHVwU2FmYXJpKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5wcmVsb2FkID0gb3B0aW9ucy5wcmVsb2FkID8gb3B0aW9ucy5wcmVsb2FkOiAnbWV0YWRhdGEnXG4gICAgICB0aGlzLnNldHRpbmdzLnNlZWtFbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgICB0aGlzLnNldHRpbmdzLmxlZnQgPSBbXCJwbGF5cGF1c2VcIiwgXCJwb3NpdGlvblwiLCBcImR1cmF0aW9uXCJdXG4gICAgdGhpcy5zZXR0aW5ncy5yaWdodCA9IFtcImZ1bGxzY3JlZW5cIiwgXCJ2b2x1bWVcIl1cbiAgfVxuXG4gIHNldHVwU2FmYXJpKCkge1xuICAgIHRoaXMuZWwucHJlbG9hZCA9ICdhdXRvJ1xuICB9XG5cbiAgbG9hZGVkTWV0YWRhdGEoZSkge1xuICAgIHRoaXMuZHVyYXRpb25DaGFuZ2UoKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfTE9BREVETUVUQURBVEEsIGUudGFyZ2V0LmR1cmF0aW9uKVxuICAgIHRoaXMuY2hlY2tJbml0aWFsU2VlaygpXG4gIH1cblxuICBkdXJhdGlvbkNoYW5nZSgpIHtcbiAgICAvLyB3ZSBjYW4ndCBmaWd1cmUgb3V0IGlmIGhscyByZXNvdXJjZSBpcyBWb0Qgb3Igbm90IHVudGlsIGl0IGlzIGJlaW5nIGxvYWRlZCBvciBkdXJhdGlvbiBoYXMgY2hhbmdlZC5cbiAgICAvLyB0aGF0J3Mgd2h5IHdlIGNoZWNrIGl0IGFnYWluIGFuZCB1cGRhdGUgbWVkaWEgY29udHJvbCBhY2NvcmRpbmdseS5cbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ3ZvZCcpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MubGVmdCA9IFtcInBsYXlwYXVzZVwiLCBcInBvc2l0aW9uXCIsIFwiZHVyYXRpb25cIl1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXR0aW5ncy5sZWZ0ID0gW1wicGxheXN0b3BcIl1cbiAgICB9XG4gICAgdGhpcy5zZXR0aW5ncy5zZWVrRW5hYmxlZCA9IGlzRmluaXRlKHRoaXMuZ2V0RHVyYXRpb24oKSlcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFKVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiBbMCwgdW5kZWZpbmVkLCBJbmZpbml0eV0uaW5kZXhPZih0aGlzLmVsLmR1cmF0aW9uKSA+PSAwID8gJ2xpdmUnIDogJ3ZvZCdcbiAgfVxuXG4gIGlzSGlnaERlZmluaXRpb25JblVzZSgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5lbC5wbGF5KClcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuZWwucGF1c2UoKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnBhdXNlKClcbiAgICBpZiAodGhpcy5lbC5yZWFkeVN0YXRlICE9PSAwKSB7XG4gICAgICB0aGlzLmVsLmN1cnJlbnRUaW1lID0gMFxuICAgIH1cbiAgfVxuXG4gIHZvbHVtZSh2YWx1ZSkge1xuICAgIHRoaXMuZWwudm9sdW1lID0gdmFsdWUgLyAxMDBcbiAgfVxuXG4gIG11dGUoKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSAwXG4gIH1cblxuICB1bm11dGUoKSB7XG4gICAgdGhpcy5lbC52b2x1bWUgPSAxXG4gIH1cblxuICBpc011dGVkKCkge1xuICAgIHJldHVybiAhIXRoaXMuZWwudm9sdW1lXG4gIH1cblxuICBpc1BsYXlpbmcoKSB7XG4gICAgcmV0dXJuICF0aGlzLmVsLnBhdXNlZCAmJiAhdGhpcy5lbC5lbmRlZFxuICB9XG5cbiAgcGxheWluZygpIHtcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1BMQVkpO1xuICB9XG5cbiAgcGF1c2VkKCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUEFVU0UpO1xuICB9XG5cbiAgZW5kZWQoKSB7XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19FTkRFRCwgdGhpcy5uYW1lKVxuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSwgMCwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgc3RhbGxlZCgpIHtcbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ3ZvZCcgJiYgdGhpcy5lbC5yZWFkeVN0YXRlIDwgdGhpcy5lbC5IQVZFX0ZVVFVSRV9EQVRBKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIHdhaXRpbmcoKSB7XG4gICAgaWYodGhpcy5lbC5yZWFkeVN0YXRlIDwgdGhpcy5lbC5IQVZFX0ZVVFVSRV9EQVRBKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORywgdGhpcy5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIGJ1ZmZlckZ1bGwoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wb3N0ZXIgJiYgdGhpcy5maXJzdEJ1ZmZlcikge1xuICAgICAgdGhpcy5maXJzdEJ1ZmZlciA9IGZhbHNlXG4gICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nKCkpIHtcbiAgICAgICAgdGhpcy5lbC5wb3N0ZXIgPSB0aGlzLm9wdGlvbnMucG9zdGVyXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwucG9zdGVyID0gJydcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19CVUZGRVJGVUxMLCB0aGlzLm5hbWUpXG4gIH1cblxuICBlcnJvcihldmVudCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfRVJST1IsIHRoaXMuZWwuZXJyb3IsIHRoaXMubmFtZSlcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wKClcbiAgICB0aGlzLmVsLnNyYyA9ICcnXG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxuXG4gIHNlZWsoc2Vla0JhclZhbHVlKSB7XG4gICAgdmFyIHRpbWUgPSB0aGlzLmVsLmR1cmF0aW9uICogKHNlZWtCYXJWYWx1ZSAvIDEwMClcbiAgICB0aGlzLnNlZWtTZWNvbmRzKHRpbWUpXG4gIH1cblxuICBzZWVrU2Vjb25kcyh0aW1lKSB7XG4gICAgdGhpcy5lbC5jdXJyZW50VGltZSA9IHRpbWVcbiAgfVxuXG4gIGNoZWNrSW5pdGlhbFNlZWsoKSB7XG4gICAgdmFyIHNlZWtUaW1lID0gc2Vla1N0cmluZ1RvU2Vjb25kcyh3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICB0aGlzLnNlZWtTZWNvbmRzKHNlZWtUaW1lKVxuICB9XG5cbiAgZ2V0Q3VycmVudFRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwuY3VycmVudFRpbWVcbiAgfVxuXG4gIGdldER1cmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVsLmR1cmF0aW9uXG4gIH1cblxuICB0aW1lVXBkYXRlZCgpIHtcbiAgICBpZiAodGhpcy5nZXRQbGF5YmFja1R5cGUoKSA9PT0gJ2xpdmUnKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1RJTUVVUERBVEUsIDEsIDEsIHRoaXMubmFtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19USU1FVVBEQVRFLCB0aGlzLmVsLmN1cnJlbnRUaW1lLCB0aGlzLmVsLmR1cmF0aW9uLCB0aGlzLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgcHJvZ3Jlc3MoKSB7XG4gICAgaWYgKCF0aGlzLmVsLmJ1ZmZlcmVkLmxlbmd0aCkgcmV0dXJuXG4gICAgdmFyIGJ1ZmZlcmVkUG9zID0gMFxuICAgIGZvciAodmFyIGkgPSAwOyAgaSA8IHRoaXMuZWwuYnVmZmVyZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmVsLmN1cnJlbnRUaW1lID49IHRoaXMuZWwuYnVmZmVyZWQuc3RhcnQoaSkgJiYgdGhpcy5lbC5jdXJyZW50VGltZSA8PSB0aGlzLmVsLmJ1ZmZlcmVkLmVuZChpKSkge1xuICAgICAgICBidWZmZXJlZFBvcyA9IGlcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKEV2ZW50cy5QTEFZQkFDS19QUk9HUkVTUywgdGhpcy5lbC5idWZmZXJlZC5zdGFydChidWZmZXJlZFBvcyksIHRoaXMuZWwuYnVmZmVyZWQuZW5kKGJ1ZmZlcmVkUG9zKSwgdGhpcy5lbC5kdXJhdGlvbiwgdGhpcy5uYW1lKVxuICB9XG5cbiAgdHlwZUZvcihzcmMpIHtcbiAgICByZXR1cm4gKHNyYy5pbmRleE9mKCcubTN1OCcpID4gMCkgPyAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnIDogJ3ZpZGVvL21wNCdcbiAgfVxuXG4gIHJlYWR5KCkge1xuICAgIHRoaXMudHJpZ2dlcihFdmVudHMuUExBWUJBQ0tfUkVBRFksIHRoaXMubmFtZSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lKVxuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7IHNyYzogdGhpcy5zcmMsIHR5cGU6IHRoaXMudHlwZUZvcih0aGlzLnNyYykgfSkpXG4gICAgdGhpcy4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vcHRpb25zLmF1dG9QbGF5ICYmIHRoaXMucGxheSgpLCAwKTtcbiAgICBpZiAodGhpcy5lbC5yZWFkeVN0YXRlID09PSB0aGlzLmVsLkhBVkVfRU5PVUdIX0RBVEEpIHtcbiAgICAgIHRoaXMucmVhZHkoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbkhUTUw1VmlkZW8uY2FuUGxheSA9IGZ1bmN0aW9uKHJlc291cmNlLCBtaW1lVHlwZSkge1xuICB2YXIgbWltZXR5cGVzID0ge1xuICAgICdtcDQnOiBbXCJhdmMxLjQyRTAxRVwiLCBcImF2YzEuNThBMDFFXCIsIFwiYXZjMS40RDQwMUVcIiwgXCJhdmMxLjY0MDAxRVwiLCBcIm1wNHYuMjAuOFwiLCBcIm1wNHYuMjAuMjQwXCIsIFwibXA0YS40MC4yXCJdLm1hcChcbiAgICAgIChjb2RlYykgPT4geyByZXR1cm4gJ3ZpZGVvL21wNDsgY29kZWNzPVwiJyArIGNvZGVjICsgJywgbXA0YS40MC4yXCInfSksXG4gICAgJ29nZyc6IFsndmlkZW8vb2dnOyBjb2RlY3M9XCJ0aGVvcmEsIHZvcmJpc1wiJywgJ3ZpZGVvL29nZzsgY29kZWNzPVwiZGlyYWNcIicsICd2aWRlby9vZ2c7IGNvZGVjcz1cInRoZW9yYSwgc3BlZXhcIiddLFxuICAgICczZ3BwJzogWyd2aWRlby8zZ3BwOyBjb2RlY3M9XCJtcDR2LjIwLjgsIHNhbXJcIiddLFxuICAgICd3ZWJtJzogWyd2aWRlby93ZWJtOyBjb2RlY3M9XCJ2cDgsIHZvcmJpc1wiJ10sXG4gICAgJ21rdic6IFsndmlkZW8veC1tYXRyb3NrYTsgY29kZWNzPVwidGhlb3JhLCB2b3JiaXNcIiddLFxuICAgICdtM3U4JzogWydhcHBsaWNhdGlvbi94LW1wZWdVUkwnXVxuICB9XG4gIG1pbWV0eXBlc1snb2d2J10gPSBtaW1ldHlwZXNbJ29nZyddXG4gIG1pbWV0eXBlc1snM2dwJ10gPSBtaW1ldHlwZXNbJzNncHAnXVxuXG4gIHZhciByZXNvdXJjZVBhcnRzID0gcmVzb3VyY2Uuc3BsaXQoJz8nKVswXS5tYXRjaCgvLipcXC4oLiopJC8pIHx8IFtdXG4gIGlmICgocmVzb3VyY2VQYXJ0cy5sZW5ndGggPiAxKSAmJiAobWltZXR5cGVzW3Jlc291cmNlUGFydHNbMV1dICE9PSB1bmRlZmluZWQpKSB7XG4gICAgdmFyIHYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgcmV0dXJuICEhZmluZChtaW1ldHlwZXNbcmVzb3VyY2VQYXJ0c1sxXV0sIChleHQpID0+IHsgcmV0dXJuICEhdi5jYW5QbGF5VHlwZShleHQpLnJlcGxhY2UoL25vLywgJycpIH0pXG4gIH0gZWxzZSBpZiAobWltZVR5cGUpIHtcbiAgICB2YXIgdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICByZXR1cm4gISF2LmNhblBsYXlUeXBlKG1pbWVUeXBlKS5yZXBsYWNlKC9uby8sICcnKVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhUTUw1VmlkZW9cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5YmFjayA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvcGxheWJhY2snKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcblxuY2xhc3MgSFRNTEltZyBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnaHRtbF9pbWcnIH1cbiAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnaW1nJyB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZGF0YS1odG1sLWltZyc6ICcnXG4gICAgfVxuICB9XG5cbiAgZ2V0UGxheWJhY2tUeXBlKCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICBzdXBlcihwYXJhbXMpXG4gICAgdGhpcy5lbC5zcmMgPSBwYXJhbXMuc3JjXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuIH1cblxuSFRNTEltZy5jYW5QbGF5ID0gZnVuY3Rpb24ocmVzb3VyY2UpIHtcbiAgcmV0dXJuICEhcmVzb3VyY2UubWF0Y2goLyguKikuKHBuZ3xqcGd8anBlZ3xnaWZ8Ym1wKS8pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gSFRNTEltZ1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL25vX29wJyk7XG4iLCJ2YXIgUGxheWJhY2sgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3BsYXliYWNrJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcblxuY2xhc3MgTm9PcCBleHRlbmRzIFBsYXliYWNrIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnbm9fb3AnIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULm5vX29wIH1cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHsnZGF0YS1uby1vcCc6ICcnfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IFN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpO1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHRoaXMuJGVsLmFwcGVuZChzdHlsZSk7XG4gICAgdGhpcy5hbmltYXRlKClcbiAgICB0aGlzLnRyaWdnZXIoRXZlbnRzLlBMQVlCQUNLX1JFQURZLCB0aGlzLm5hbWUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIG5vaXNlKCkge1xuICAgIHZhciBpZGF0YSA9IHRoaXMuY29udGV4dC5jcmVhdGVJbWFnZURhdGEodGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCwgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQpXG4gICAgdmFyIGJ1ZmZlcjMyID0gbmV3IFVpbnQzMkFycmF5KGlkYXRhLmRhdGEuYnVmZmVyKVxuICAgIHZhciBsZW4gPSBidWZmZXIzMi5sZW5ndGhcbiAgICB2YXIgcnVuID0gMFxuICAgIHZhciBjb2xvciA9IDBcbiAgICB2YXIgbSA9IE1hdGgucmFuZG9tKCkgKiA2ICsgNFxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47KSB7XG4gICAgICBpZiAocnVuIDwgMCkge1xuICAgICAgICBydW4gPSBtICogTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdmFyIHAgPSBNYXRoLnBvdyhNYXRoLnJhbmRvbSgpLCAwLjQpO1xuICAgICAgICBjb2xvciA9ICgyNTUgKiBwKSA8PCAyNDtcbiAgICAgIH1cbiAgICAgIHJ1biAtPSAxO1xuICAgICAgYnVmZmVyMzJbaSsrXSA9IGNvbG9yO1xuICAgIH1cbiAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKGlkYXRhLCAwLCAwKTtcbiAgfVxuXG4gIGxvb3AoKSB7XG4gICAgdGhpcy5ub2lzZSgpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMubG9vcCgpKVxuICB9XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICB0aGlzLmNhbnZhcyA9IHRoaXMuJGVsLmZpbmQoJ2NhbnZhc1tkYXRhLW5vLW9wLWNhbnZhc10nKVswXVxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLmxvb3AoKVxuICB9XG59XG5cbk5vT3AuY2FuUGxheSA9IChzb3VyY2UpID0+IHtcbiAgcmV0dXJuIHRydWVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb09wXG4iLCIvL0NvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL2NvbnRhaW5lcl9wbHVnaW4nKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcbnZhciBCcm93c2VyID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9icm93c2VyJylcblxuY2xhc3MgQ2xpY2tUb1BhdXNlUGx1Z2luIGV4dGVuZHMgQ29udGFpbmVyUGx1Z2luIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnY2xpY2tfdG9fcGF1c2UnIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLmNocm9tZWxlc3MgJiYgIUJyb3dzZXIuaXNNb2JpbGUpIHtcbiAgICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgfVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0NMSUNLLCB0aGlzLmNsaWNrKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VUVElOR1NVUERBVEUsIHRoaXMuc2V0dGluZ3NVcGRhdGUpXG4gIH1cblxuICBjbGljaygpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIuZ2V0UGxheWJhY2tUeXBlKCkgIT09ICdsaXZlJyB8fCB0aGlzLmNvbnRhaW5lci5pc0R2ckVuYWJsZWQoKSkge1xuICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmlzUGxheWluZygpKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnBhdXNlKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnBsYXkoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldHRpbmdzVXBkYXRlKCkge1xuICAgIHRoaXMuY29udGFpbmVyLiRlbC5yZW1vdmVDbGFzcygncG9pbnRlci1lbmFibGVkJylcbiAgICBpZiAodGhpcy5jb250YWluZXIuZ2V0UGxheWJhY2tUeXBlKCkgIT09ICdsaXZlJyB8fCB0aGlzLmNvbnRhaW5lci5pc0R2ckVuYWJsZWQoKSkge1xuICAgICAgdGhpcy5jb250YWluZXIuJGVsLmFkZENsYXNzKCdwb2ludGVyLWVuYWJsZWQnKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENsaWNrVG9QYXVzZVBsdWdpblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2NsaWNrX3RvX3BhdXNlJylcbiIsInZhciBVSUNvcmVQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL3VpX2NvcmVfcGx1Z2luJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJylcblxuY2xhc3MgRFZSQ29udHJvbHMgZXh0ZW5kcyBVSUNvcmVQbHVnaW4ge1xuICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBKU1QuZHZyX2NvbnRyb2xzIH1cbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnZHZyX2NvbnRyb2xzJyB9XG4gIGdldCBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGljayAubGl2ZS1idXR0b24nOiAnY2xpY2snXG4gICAgfVxuICB9XG4gIGdldCBhdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAnZHZyLWNvbnRyb2xzJyxcbiAgICAgICdkYXRhLWR2ci1jb250cm9scyc6ICcnLFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGNvcmUpIHtcbiAgICBzdXBlcihjb3JlKVxuICAgIHRoaXMuY29yZSA9IGNvcmVcbiAgICB0aGlzLnNldHRpbmdzVXBkYXRlKClcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvcmUubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX0NPTlRBSU5FUkNIQU5HRUQsIHRoaXMuc2V0dGluZ3NVcGRhdGUpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvcmUubWVkaWFDb250cm9sLCBFdmVudHMuTUVESUFDT05UUk9MX1JFTkRFUkVELCB0aGlzLnNldHRpbmdzVXBkYXRlKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQsIHRoaXMuZHZyQ2hhbmdlZClcbiAgfVxuXG4gIGR2ckNoYW5nZWQoZHZyRW5hYmxlZCkge1xuICAgIHRoaXMuc2V0dGluZ3NVcGRhdGUoKVxuICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmFkZENsYXNzKCdsaXZlJylcbiAgICBpZiAoZHZyRW5hYmxlZCkge1xuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC4kZWwuYWRkQ2xhc3MoJ2R2cicpXG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5maW5kKCcubWVkaWEtY29udHJvbC1pbmRpY2F0b3JbZGF0YS1wb3NpdGlvbl0sIC5tZWRpYS1jb250cm9sLWluZGljYXRvcltkYXRhLWR1cmF0aW9uXScpLmhpZGUoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLiRlbC5yZW1vdmVDbGFzcygnZHZyJylcbiAgICB9XG4gIH1cblxuICBjbGljaygpIHtcbiAgICBpZiAoIXRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLmlzUGxheWluZygpKSB7XG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLmNvbnRhaW5lci5wbGF5KClcbiAgICB9XG4gICAgaWYgKHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmhhc0NsYXNzKCdkdnInKSkge1xuICAgICAgdGhpcy5jb3JlLm1lZGlhQ29udHJvbC5jb250YWluZXIuc2V0Q3VycmVudFRpbWUoLTEpXG4gICAgfVxuICB9XG5cbiAgc2V0dGluZ3NVcGRhdGUoKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICBpZih0aGlzLnNob3VsZFJlbmRlcigpKSB7XG4gICAgICB0aGlzLnJlbmRlcigpXG4gICAgICB0aGlzLiRlbC5jbGljaygoKSA9PiB0aGlzLmNsaWNrKCkpXG4gICAgfVxuICAgIHRoaXMuYmluZEV2ZW50cygpXG4gIH1cblxuICBzaG91bGRSZW5kZXIoKSB7XG4gICAgdmFyIHVzZUR2ckNvbnRyb2xzID0gdGhpcy5jb3JlLm9wdGlvbnMudXNlRHZyQ29udHJvbHMgPT09IHVuZGVmaW5lZCB8fCAhIXRoaXMuY29yZS5vcHRpb25zLnVzZUR2ckNvbnRyb2xzXG4gICAgcmV0dXJuIHVzZUR2ckNvbnRyb2xzICYmIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuY29udGFpbmVyLmdldFBsYXliYWNrVHlwZSgpID09PSAnbGl2ZSdcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IodGhpcy5uYW1lLCB7IGJhc2VVcmw6IHRoaXMuY29yZS5vcHRpb25zLmJhc2VVcmwgfSlcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgaWYgKHRoaXMuc2hvdWxkUmVuZGVyKCkpIHtcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJGVsLmFkZENsYXNzKCdsaXZlJylcbiAgICAgIHRoaXMuY29yZS5tZWRpYUNvbnRyb2wuJCgnLm1lZGlhLWNvbnRyb2wtbGVmdC1wYW5lbFtkYXRhLW1lZGlhLWNvbnRyb2xdJykuYXBwZW5kKHRoaXMuJGVsKVxuICAgICAgaWYgKHRoaXMuJGR1cmF0aW9uKSB7XG4gICAgICAgIHRoaXMuJGR1cmF0aW9uLnJlbW92ZSgpXG4gICAgICB9XG4gICAgICB0aGlzLiRkdXJhdGlvbiA9ICQoJzxzcGFuIGRhdGEtZHVyYXRpb24+PC9zcGFuPicpXG4gICAgICB0aGlzLmNvcmUubWVkaWFDb250cm9sLnNlZWtUaW1lLiRlbC5hcHBlbmQodGhpcy4kZHVyYXRpb24pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEVlJDb250cm9sc1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2R2cl9jb250cm9scycpXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9jb250YWluZXJfcGx1Z2luJyk7XG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxuXG5jbGFzcyBHb29nbGVBbmFseXRpY3MgZXh0ZW5kcyBDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdnb29nbGVfYW5hbHl0aWNzJyB9XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIGlmIChvcHRpb25zLmdhQWNjb3VudCkge1xuICAgICAgdGhpcy5hY2NvdW50ID0gb3B0aW9ucy5nYUFjY291bnRcbiAgICAgIHRoaXMudHJhY2tlck5hbWUgPSAob3B0aW9ucy5nYVRyYWNrZXJOYW1lKSA/IG9wdGlvbnMuZ2FUcmFja2VyTmFtZSArIFwiLlwiIDogJ0NsYXBwci4nXG4gICAgICB0aGlzLmRvbWFpbk5hbWUgPSBvcHRpb25zLmdhRG9tYWluTmFtZVxuICAgICAgdGhpcy5jdXJyZW50SERTdGF0ZSA9IHVuZGVmaW5lZFxuICAgICAgdGhpcy5lbWJlZFNjcmlwdCgpXG4gICAgfVxuICB9XG5cbiAgZW1iZWRTY3JpcHQoKSB7XG4gICAgaWYgKCF3aW5kb3cuX2dhdCkge1xuICAgICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHQvamF2YXNjcmlwdFwiKVxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcImFzeW5jXCIsIFwiYXN5bmNcIilcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJodHRwOi8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2dhLmpzXCIpXG4gICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4gdGhpcy5hZGRFdmVudExpc3RlbmVycygpXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpXG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1BMQVksIHRoaXMub25QbGF5KVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLm9uU3RvcClcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUEFVU0UsIHRoaXMub25QYXVzZSlcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRU5ERUQsIHRoaXMub25FbmRlZClcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSSU5HLCB0aGlzLm9uQnVmZmVyaW5nKVxuICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVEFURV9CVUZGRVJGVUxMLCB0aGlzLm9uQnVmZmVyRnVsbClcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRU5ERUQsIHRoaXMub25FbmRlZClcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfRVJST1IsIHRoaXMub25FcnJvcilcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tTVEFURSwgdGhpcy5vblBsYXliYWNrQ2hhbmdlZClcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfVk9MVU1FLCAoZXZlbnQpID0+IHRoaXMub25Wb2x1bWVDaGFuZ2VkKGV2ZW50KSlcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU0VFSywgKGV2ZW50KSA9PiB0aGlzLm9uU2VlayhldmVudCkpXG4gICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0ZVTExfU0NSRUVOLCB0aGlzLm9uRnVsbHNjcmVlbilcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfSElHSERFRklOSVRJT05VUERBVEUsIHRoaXMub25IRClcbiAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQsIHRoaXMub25EVlIpXG4gICAgfVxuICAgIF9nYXEucHVzaChbdGhpcy50cmFja2VyTmFtZSArICdfc2V0QWNjb3VudCcsIHRoaXMuYWNjb3VudF0pO1xuICAgIGlmICghIXRoaXMuZG9tYWluTmFtZSlcbiAgICAgIF9nYXEucHVzaChbdGhpcy50cmFja2VyTmFtZSArICdfc2V0RG9tYWluTmFtZScsIHRoaXMuZG9tYWluTmFtZV0pO1xuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIlBsYXlcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uU3RvcCgpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJTdG9wXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvbkVuZGVkKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIkVuZGVkXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvbkJ1ZmZlcmluZygpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJCdWZmZXJpbmdcIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG4gIG9uQnVmZmVyRnVsbCgpIHtcbiAgICB0aGlzLnB1c2goW1wiVmlkZW9cIiwgXCJCdWZmZXJmdWxsXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvbkVycm9yKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIkVycm9yXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvbkhEKCkge1xuICAgIHZhciBzdGF0dXMgPSB0aGlzLmNvbnRhaW5lci5pc0hpZ2hEZWZpbml0aW9uSW5Vc2UoKT8gXCJPTlwiOiBcIk9GRlwiXG4gICAgaWYgKHN0YXR1cyAhPT0gdGhpcy5jdXJyZW50SERTdGF0ZSkge1xuICAgICAgdGhpcy5jdXJyZW50SERTdGF0ZSA9IHN0YXR1c1xuICAgICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiSEQgLSBcIiArIHN0YXR1cywgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgICB9XG4gIH1cblxuXG4gIG9uUGxheWJhY2tDaGFuZ2VkKCkge1xuICAgIHZhciB0eXBlID0gdGhpcy5jb250YWluZXIuZ2V0UGxheWJhY2tUeXBlKClcbiAgICBpZiAodHlwZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiUGxheWJhY2sgVHlwZSAtIFwiICsgdHlwZSwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgICB9XG4gIH1cblxuICBvbkRWUihkdnJJblVzZSkge1xuICAgIHZhciBzdGF0dXMgPSBkdnJJblVzZT8gXCJPTlwiOiBcIk9GRlwiXG4gICAgdGhpcy5wdXNoKFtcIkludGVyYWN0aW9uXCIsIFwiRFZSIC0gXCIgKyBzdGF0dXMsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvblBhdXNlKCkge1xuICAgIHRoaXMucHVzaChbXCJWaWRlb1wiLCBcIlBhdXNlXCIsIHRoaXMuY29udGFpbmVyLnBsYXliYWNrLnNyY10pXG4gIH1cblxuICBvblNlZWsoKSB7XG4gICAgdGhpcy5wdXNoKFtcIlZpZGVvXCIsIFwiU2Vla1wiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25Wb2x1bWVDaGFuZ2VkKCkge1xuICAgIHRoaXMucHVzaChbXCJJbnRlcmFjdGlvblwiLCBcIlZvbHVtZVwiLCB0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5zcmNdKVxuICB9XG5cbiAgb25GdWxsc2NyZWVuKCkge1xuICAgIHRoaXMucHVzaChbXCJJbnRlcmFjdGlvblwiLCBcIkZ1bGxzY3JlZW5cIiwgdGhpcy5jb250YWluZXIucGxheWJhY2suc3JjXSlcbiAgfVxuXG5cbiAgcHVzaChhcnJheSkge1xuICAgIHZhciByZXMgPSBbdGhpcy50cmFja2VyTmFtZSArIFwiX3RyYWNrRXZlbnRcIl0uY29uY2F0KGFycmF5KVxuICAgIF9nYXEucHVzaChyZXMpXG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdvb2dsZUFuYWx5dGljcztcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9nb29nbGVfYW5hbHl0aWNzJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbG9nJyk7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgS2libyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uva2libycpXG5cbnZhciBCT0xEID0gJ2ZvbnQtd2VpZ2h0OiBib2xkOyBmb250LXNpemU6IDEzcHg7JztcbnZhciBJTkZPID0gJ2NvbG9yOiAjMDA2NjAwOycgKyBCT0xEO1xudmFyIERFQlVHID0gJ2NvbG9yOiAjMDAwMGZmOycgKyBCT0xEO1xudmFyIFdBUk4gPSAnY29sb3I6ICNmZjgwMDA7JyArIEJPTEQ7XG52YXIgRVJST1IgPSAnY29sb3I6ICNmZjAwMDA7JyArIEJPTEQ7XG52YXIgREVGQVVMVCA9ICcnO1xuXG5jbGFzcyBMb2cge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmtpYm8gPSBuZXcgS2libygpXG4gICAgdGhpcy5raWJvLmRvd24oWydjdHJsIHNoaWZ0IGQnXSwgKCkgPT4gdGhpcy5vbk9mZigpKVxuICAgIHRoaXMuQkxBQ0tMSVNUID0gWyd0aW1ldXBkYXRlJywgJ3BsYXliYWNrOnRpbWV1cGRhdGUnLCAncGxheWJhY2s6cHJvZ3Jlc3MnLCAnY29udGFpbmVyOmhvdmVyJywgJ2NvbnRhaW5lcjp0aW1ldXBkYXRlJywgJ2NvbnRhaW5lcjpwcm9ncmVzcyddO1xuICB9XG5cbiAgaW5mbyhrbGFzcykge3RoaXMubG9nKGtsYXNzLCAnaW5mbycsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpfVxuICB3YXJuKGtsYXNzKSB7dGhpcy5sb2coa2xhc3MsICd3YXJuJywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSl9XG4gIGRlYnVnKGtsYXNzKSB7dGhpcy5sb2coa2xhc3MsICdkZWJ1ZycsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpfVxuXG4gIG9uT2ZmKCkge1xuICAgIHdpbmRvdy5ERUJVRyA9ICF3aW5kb3cuREVCVUdcbiAgICBpZiAod2luZG93LkRFQlVHKSB7IGNvbnNvbGUubG9nKCdsb2cgZW5hYmxlZCcpOyAgfVxuICAgIGVsc2UgeyBjb25zb2xlLmxvZygnbG9nIGRpc2FibGVkJyk7IH1cbiAgfVxuXG4gIGxvZyhrbGFzcywgbGV2ZWwsIG1lc3NhZ2UpIHtcbiAgICBpZiAoIXdpbmRvdy5ERUJVRyB8fCB0aGlzLkJMQUNLTElTVC5pbmRleE9mKG1lc3NhZ2VbMF0pID49IDApIHJldHVyblxuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgbWVzc2FnZSA9IGtsYXNzXG4gICAgICBrbGFzcyA9IG51bGxcbiAgICB9XG4gICAgdmFyIGNvbG9yXG4gICAgaWYgKGxldmVsID09PSAnd2FybicpIHsgY29sb3IgPSBXQVJOIH1cbiAgICBlbHNlIGlmIChsZXZlbCA9PT0gJ2luZm8nKSB7IGNvbG9yID0gSU5GTyB9XG4gICAgZWxzZSBpZiAobGV2ZWwgPT09ICdkZWJ1ZycpIHsgY29sb3IgPSBERUJVRyB9XG4gICAgZWxzZSBpZiAobGV2ZWwgPT09ICdlcnJvcicpIHsgY29sb3IgPSBFUlJPUiB9XG4gICAgdmFyIGtsYXNzRGVzY3JpcHRpb24gPSBcIlwiXG4gICAgaWYgKGtsYXNzKSB7XG4gICAgICBrbGFzc0Rlc2NyaXB0aW9uID0gXCJbXCIgKyBrbGFzcyArIFwiXVwiXG4gICAgfVxuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIFtcIiVjW1wiICsgbGV2ZWwgKyBcIl1cIiArIGtsYXNzRGVzY3JpcHRpb24sIGNvbG9yXS5jb25jYXQobWVzc2FnZSkpO1xuICB9XG59XG5cbkxvZy5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5faW5zdGFuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKVxuICB9XG4gIHJldHVybiB0aGlzLl9pbnN0YW5jZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvZ1xuIiwiLy9Db3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgVUlDb250YWluZXJQbHVnaW4gPSByZXF1aXJlKCcuLi8uLi9iYXNlL3VpX2NvbnRhaW5lcl9wbHVnaW4nKVxudmFyIFN0eWxlciA9IHJlcXVpcmUoJy4uLy4uL2Jhc2Uvc3R5bGVyJylcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKVxuXG52YXIgTWVkaWF0b3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL21lZGlhdG9yJylcbnZhciBQbGF5ZXJJbmZvID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9wbGF5ZXJfaW5mbycpXG5cbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJylcblxuY2xhc3MgUG9zdGVyUGx1Z2luIGV4dGVuZHMgVUlDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdwb3N0ZXInIH1cbiAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gSlNULnBvc3RlciB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGFzcyc6ICdwbGF5ZXItcG9zdGVyJyxcbiAgICAgICdkYXRhLXBvc3Rlcic6ICcnXG4gICAgfVxuICB9XG5cbiAgZ2V0IGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsaWNrJzogJ2NsaWNrZWQnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMuY29udGFpbmVyLmRpc2FibGVNZWRpYUNvbnRyb2woKVxuICAgIHRoaXMucmVuZGVyKClcbiAgICB0aGlzLmJ1ZmZlckZ1bGwgPSBmYWxzZVxuICB9XG5cbiAgbG9hZChzb3VyY2UpIHtcbiAgICB0aGlzLm9wdGlvbnMucG9zdGVyID0gc291cmNlXG4gICAgdGhpcy5yZW5kZXIoKVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORywgdGhpcy5vbkJ1ZmZlcmluZylcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMub25CdWZmZXJmdWxsKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RPUCwgdGhpcy5vblN0b3ApXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9QTEFZLCB0aGlzLm9uUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX0VOREVELCB0aGlzLm9uU3RvcClcbiAgICBNZWRpYXRvci5vbihFdmVudHMuUExBWUVSX1JFU0laRSwgdGhpcy51cGRhdGVTaXplLCB0aGlzKVxuICB9XG5cbiAgc3RvcExpc3RlbmluZygpIHtcbiAgICBzdXBlci5zdG9wTGlzdGVuaW5nKClcbiAgICBNZWRpYXRvci5vZmYoRXZlbnRzLlBMQVlFUl9SRVNJWkUsIHRoaXMudXBkYXRlU2l6ZSwgdGhpcylcbiAgfVxuXG4gIG9uQnVmZmVyaW5nKCkge1xuICAgIHRoaXMuYnVmZmVyRnVsbCA9IGZhbHNlXG4gICAgdGhpcy5oaWRlUGxheUJ1dHRvbigpXG4gIH1cblxuICBvblBsYXkoKSB7XG4gICAgaWYgKHRoaXMuYnVmZmVyRnVsbCkge1xuICAgICAgdGhpcy4kZWwuaGlkZSgpXG4gICAgICB0aGlzLmNvbnRhaW5lci5lbmFibGVNZWRpYUNvbnRyb2woKVxuICAgIH1cbiAgfVxuXG4gIG9uQnVmZmVyZnVsbCgpIHtcbiAgICB0aGlzLmJ1ZmZlckZ1bGwgPSB0cnVlXG4gICAgaWYgKHRoaXMuY29udGFpbmVyLnBsYXliYWNrLm5hbWUgPT09ICdodG1sNV92aWRlbycgJiYgIXRoaXMuY29udGFpbmVyLmlzUGxheWluZygpKSByZXR1cm5cbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB0aGlzLmNvbnRhaW5lci5lbmFibGVNZWRpYUNvbnRyb2woKVxuICB9XG5cbiAgb25TdG9wKCkge1xuICAgIHRoaXMuJGVsLnNob3coKVxuICAgIHRoaXMuY29udGFpbmVyLmRpc2FibGVNZWRpYUNvbnRyb2woKVxuICAgIHRoaXMuc2hvd1BsYXlCdXR0b24oKVxuICB9XG5cbiAgc2hvd1BsYXlCdXR0b24oKSB7XG4gICAgdGhpcy4kcGxheUJ1dHRvbi5zaG93KClcbiAgICB0aGlzLnVwZGF0ZVNpemUoKVxuICB9XG5cbiAgaGlkZVBsYXlCdXR0b24oKSB7XG4gICAgdGhpcy4kcGxheUJ1dHRvbi5oaWRlKClcbiAgfVxuXG4gIGNsaWNrZWQoKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgdGhpcy5jb250YWluZXIucGxheSgpXG4gICAgICB0aGlzLmhpZGVQbGF5QnV0dG9uKClcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB1cGRhdGVTaXplKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lci5wbGF5YmFjay5uYW1lID09PSAnaHRtbF9pbWcnKSByZXR1cm5cbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy4kZWwuaGVpZ2h0KClcbiAgICB0aGlzLiRlbC5jc3MoeyBmb250U2l6ZTogaGVpZ2h0IH0pXG4gICAgaWYgKHRoaXMuJHBsYXlXcmFwcGVyLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICB0aGlzLiRwbGF5V3JhcHBlci5jc3MoeyBtYXJnaW5Ub3A6IC0odGhpcy4kcGxheVdyYXBwZXIuaGVpZ2h0KCkgLyAyKSB9KVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXIucGxheWJhY2submFtZSA9PT0gJ2h0bWxfaW1nJykgcmV0dXJuXG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSwge2Jhc2VVcmw6IHRoaXMub3B0aW9ucy5iYXNlVXJsfSlbMF1cbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB0aGlzLiRlbC5hcHBlbmQoc3R5bGUpXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wb3N0ZXIpIHtcbiAgICAgIHZhciBpbWdFbCA9ICQoJzxkaXYgZGF0YS1wb3N0ZXIgY2xhc3M9XCJwb3N0ZXItYmFja2dyb3VuZFwiPjwvZGl2PicpXG4gICAgICBpbWdFbC5jc3MoeydiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdGhpcy5vcHRpb25zLnBvc3RlciArICcpJ30pXG4gICAgICB0aGlzLiRlbC5wcmVwZW5kKGltZ0VsKVxuICAgIH1cbiAgICB0aGlzLmNvbnRhaW5lci4kZWwuYXBwZW5kKHRoaXMuZWwpXG4gICAgdGhpcy4kcGxheUJ1dHRvbiA9IHRoaXMuJGVsLmZpbmQoJy5wb3N0ZXItaWNvbicpXG4gICAgdGhpcy4kcGxheVdyYXBwZXIgPSB0aGlzLiRlbC5maW5kKCcucGxheS13cmFwcGVyJylcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlU2l6ZSgpLCAwKVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2hyb21lbGVzcykge1xuICAgICAgdGhpcy5oaWRlUGxheUJ1dHRvbigpXG4gICAgICB0aGlzLiRlbC5jc3MoeydjdXJzb3InOiAnaW5pdGlhbCd9KVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zdGVyUGx1Z2luXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc3Bpbm5lcl90aHJlZV9ib3VuY2UnKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFVJQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91aV9jb250YWluZXJfcGx1Z2luJyk7XG52YXIgU3R5bGVyID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9zdHlsZXInKTtcbnZhciBKU1QgPSByZXF1aXJlKCcuLi8uLi9iYXNlL2pzdCcpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJyk7XG5cbmNsYXNzIFNwaW5uZXJUaHJlZUJvdW5jZVBsdWdpbiBleHRlbmRzIFVJQ29udGFpbmVyUGx1Z2luIHtcbiAgZ2V0IG5hbWUoKSB7IHJldHVybiAnc3Bpbm5lcicgfVxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2RhdGEtc3Bpbm5lcic6JycsXG4gICAgICAnY2xhc3MnOiAnc3Bpbm5lci10aHJlZS1ib3VuY2UnXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy50ZW1wbGF0ZSA9IEpTVC5zcGlubmVyX3RocmVlX2JvdW5jZVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSSU5HLCB0aGlzLm9uQnVmZmVyaW5nKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSRlVMTCwgdGhpcy5vbkJ1ZmZlckZ1bGwpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLm9uU3RvcClcbiAgICB0aGlzLnJlbmRlcigpXG4gIH1cblxuICBvbkJ1ZmZlcmluZygpIHtcbiAgICB0aGlzLnNob3dUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLiRlbC5zaG93KCksIDMwMClcbiAgfVxuXG4gIG9uQnVmZmVyRnVsbCgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGltZW91dClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgfVxuXG4gIG9uU3RvcCgpIHtcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSlcbiAgICB2YXIgc3R5bGUgPSBTdHlsZXIuZ2V0U3R5bGVGb3IoJ3NwaW5uZXJfdGhyZWVfYm91bmNlJylcbiAgICB0aGlzLmNvbnRhaW5lci4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQodGhpcy4kZWwpXG4gICAgdGhpcy4kZWwuaGlkZSgpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNwaW5uZXJUaHJlZUJvdW5jZVBsdWdpbjtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zdGF0cycpO1xuXG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9jb250YWluZXJfcGx1Z2luJyk7XG52YXIgJCA9IHJlcXVpcmUoXCJjbGFwcHItemVwdG9cIik7XG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9ldmVudHMnKTtcblxuY2xhc3MgU3RhdHNQbHVnaW4gZXh0ZW5kcyBDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICdzdGF0cycgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc2V0SW5pdGlhbEF0dHJzKClcbiAgICB0aGlzLnJlcG9ydEludGVydmFsID0gb3B0aW9ucy5yZXBvcnRJbnRlcnZhbCB8fCA1MDAwXG4gICAgdGhpcy5zdGF0ZSA9IFwiSURMRVwiXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIucGxheWJhY2ssIEV2ZW50cy5QTEFZQkFDS19QTEFZLCB0aGlzLm9uUGxheSlcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUT1AsIHRoaXMub25TdG9wKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfREVTVFJPWUVELCB0aGlzLm9uU3RvcClcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUklORywgdGhpcy5vbkJ1ZmZlcmluZylcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29udGFpbmVyLCBFdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwsIHRoaXMub25CdWZmZXJGdWxsKVxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfU1RBVFNfQURELCB0aGlzLm9uU3RhdHNBZGQpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9CSVRSQVRFLCB0aGlzLm9uU3RhdHNBZGQpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lci5wbGF5YmFjaywgRXZlbnRzLlBMQVlCQUNLX1NUQVRTX0FERCwgdGhpcy5vblN0YXRzQWRkKVxuICB9XG5cbiAgc2V0SW5pdGlhbEF0dHJzKCkge1xuICAgIHRoaXMuZmlyc3RQbGF5ID0gdHJ1ZVxuICAgIHRoaXMuc3RhcnR1cFRpbWUgPSAwXG4gICAgdGhpcy5yZWJ1ZmZlcmluZ1RpbWUgPSAwXG4gICAgdGhpcy53YXRjaGluZ1RpbWUgPSAwXG4gICAgdGhpcy5yZWJ1ZmZlcnMgPSAwXG4gICAgdGhpcy5leHRlcm5hbE1ldHJpY3MgPSB7fVxuICB9XG5cbiAgb25QbGF5KCkge1xuICAgIHRoaXMuc3RhdGUgPSBcIlBMQVlJTkdcIlxuICAgIHRoaXMud2F0Y2hpbmdUaW1lSW5pdCA9IERhdGUubm93KClcbiAgICBpZiAoIXRoaXMuaW50ZXJ2YWxJZCkge1xuICAgICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodGhpcy5yZXBvcnQuYmluZCh0aGlzKSwgdGhpcy5yZXBvcnRJbnRlcnZhbClcbiAgICB9XG4gIH1cblxuICBvblN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpXG4gICAgdGhpcy5pbnRlcnZhbElkID0gdW5kZWZpbmVkXG4gICAgdGhpcy5zdGF0ZSA9IFwiU1RPUFBFRFwiXG4gIH1cblxuICBvbkJ1ZmZlcmluZygpIHtcbiAgICBpZiAodGhpcy5maXJzdFBsYXkpIHtcbiAgICAgIHRoaXMuc3RhcnR1cFRpbWVJbml0ID0gRGF0ZS5ub3coKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlYnVmZmVyaW5nVGltZUluaXQgPSBEYXRlLm5vdygpXG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBcIkJVRkZFUklOR1wiXG4gICAgdGhpcy5yZWJ1ZmZlcnMrK1xuICB9XG5cbiAgb25CdWZmZXJGdWxsKCkge1xuICAgIGlmICh0aGlzLmZpcnN0UGxheSAmJiAhIXRoaXMuc3RhcnR1cFRpbWVJbml0KSB7XG4gICAgICB0aGlzLmZpcnN0UGxheSA9IGZhbHNlXG4gICAgICB0aGlzLnN0YXJ0dXBUaW1lID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnR1cFRpbWVJbml0XG4gICAgICB0aGlzLndhdGNoaW5nVGltZUluaXQgPSBEYXRlLm5vdygpXG4gICAgfSBlbHNlIGlmICghIXRoaXMucmVidWZmZXJpbmdUaW1lSW5pdCkge1xuICAgICAgdGhpcy5yZWJ1ZmZlcmluZ1RpbWUgKz0gdGhpcy5nZXRSZWJ1ZmZlcmluZ1RpbWUoKVxuICAgIH1cbiAgICB0aGlzLnJlYnVmZmVyaW5nVGltZUluaXQgPSB1bmRlZmluZWRcbiAgICB0aGlzLnN0YXRlID0gXCJQTEFZSU5HXCJcbiAgfVxuXG4gIGdldFJlYnVmZmVyaW5nVGltZSgpIHtcbiAgICByZXR1cm4gRGF0ZS5ub3coKSAtIHRoaXMucmVidWZmZXJpbmdUaW1lSW5pdFxuICB9XG5cbiAgZ2V0V2F0Y2hpbmdUaW1lKCkge1xuICAgIHZhciB0b3RhbFRpbWUgPSAoRGF0ZS5ub3coKSAtIHRoaXMud2F0Y2hpbmdUaW1lSW5pdClcbiAgICByZXR1cm4gdG90YWxUaW1lIC0gdGhpcy5yZWJ1ZmZlcmluZ1RpbWVcbiAgfVxuXG4gIGlzUmVidWZmZXJpbmcoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5yZWJ1ZmZlcmluZ1RpbWVJbml0XG4gIH1cblxuICBvblN0YXRzQWRkKG1ldHJpYykge1xuICAgICQuZXh0ZW5kKHRoaXMuZXh0ZXJuYWxNZXRyaWNzLCBtZXRyaWMpXG4gIH1cblxuICBnZXRTdGF0cygpIHtcbiAgICB2YXIgbWV0cmljcyA9IHtcbiAgICAgIHN0YXJ0dXBUaW1lOiAgICAgdGhpcy5zdGFydHVwVGltZSxcbiAgICAgIHJlYnVmZmVyczogICAgICAgdGhpcy5yZWJ1ZmZlcnMsXG4gICAgICByZWJ1ZmZlcmluZ1RpbWU6IHRoaXMuaXNSZWJ1ZmZlcmluZygpPyB0aGlzLnJlYnVmZmVyaW5nVGltZSArIHRoaXMuZ2V0UmVidWZmZXJpbmdUaW1lKCk6IHRoaXMucmVidWZmZXJpbmdUaW1lLFxuICAgICAgd2F0Y2hpbmdUaW1lOiAgICB0aGlzLmlzUmVidWZmZXJpbmcoKT8gdGhpcy5nZXRXYXRjaGluZ1RpbWUoKSAtIHRoaXMuZ2V0UmVidWZmZXJpbmdUaW1lKCk6IHRoaXMuZ2V0V2F0Y2hpbmdUaW1lKClcbiAgICB9XG4gICAgJC5leHRlbmQobWV0cmljcywgdGhpcy5leHRlcm5hbE1ldHJpY3MpXG4gICAgcmV0dXJuIG1ldHJpY3NcbiAgfVxuXG4gIHJlcG9ydCgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5zdGF0c1JlcG9ydCh0aGlzLmdldFN0YXRzKCkpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0c1BsdWdpbjtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi93YXRlcm1hcmsnKTtcblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFVJQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgnLi4vLi4vYmFzZS91aV9jb250YWluZXJfcGx1Z2luJylcbnZhciBTdHlsZXIgPSByZXF1aXJlKCcuLi8uLi9iYXNlL3N0eWxlcicpXG52YXIgSlNUID0gcmVxdWlyZSgnLi4vLi4vYmFzZS9qc3QnKVxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uLy4uL2Jhc2UvZXZlbnRzJylcblxuY2xhc3MgV2F0ZXJNYXJrUGx1Z2luIGV4dGVuZHMgVUlDb250YWluZXJQbHVnaW4ge1xuICBnZXQgbmFtZSgpIHsgcmV0dXJuICd3YXRlcm1hcmsnIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnRlbXBsYXRlID0gSlNUW3RoaXMubmFtZV1cbiAgICB0aGlzLnBvc2l0aW9uID0gb3B0aW9ucy5wb3NpdGlvbiB8fCBcImJvdHRvbS1yaWdodFwiXG4gICAgaWYgKG9wdGlvbnMud2F0ZXJtYXJrKSB7XG4gICAgICB0aGlzLmltYWdlVXJsID0gb3B0aW9ucy53YXRlcm1hcmtcbiAgICAgIHRoaXMucmVuZGVyKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgICB9XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250YWluZXIsIEV2ZW50cy5DT05UQUlORVJfUExBWSwgdGhpcy5vblBsYXkpXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbnRhaW5lciwgRXZlbnRzLkNPTlRBSU5FUl9TVE9QLCB0aGlzLm9uU3RvcClcbiAgfVxuXG4gIG9uUGxheSgpIHtcbiAgICBpZiAoIXRoaXMuaGlkZGVuKVxuICAgICAgdGhpcy4kZWwuc2hvdygpXG4gIH1cblxuICBvblN0b3AoKSB7XG4gICAgdGhpcy4kZWwuaGlkZSgpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy4kZWwuaGlkZSgpXG4gICAgdmFyIHRlbXBsYXRlT3B0aW9ucyA9IHtwb3NpdGlvbjogdGhpcy5wb3NpdGlvbiwgaW1hZ2VVcmw6IHRoaXMuaW1hZ2VVcmx9XG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHRlbXBsYXRlT3B0aW9ucykpXG4gICAgdmFyIHN0eWxlID0gU3R5bGVyLmdldFN0eWxlRm9yKHRoaXMubmFtZSlcbiAgICB0aGlzLmNvbnRhaW5lci4kZWwuYXBwZW5kKHN0eWxlKVxuICAgIHRoaXMuY29udGFpbmVyLiRlbC5hcHBlbmQodGhpcy4kZWwpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdhdGVyTWFya1BsdWdpblxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIHVuaXF1ZUlkID0gcmVxdWlyZSgnLi91dGlscycpLnVuaXF1ZUlkXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi9ldmVudHMnKVxuXG5jbGFzcyBCYXNlT2JqZWN0IGV4dGVuZHMgRXZlbnRzIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucz17fSkge1xuICAgIHRoaXMudW5pcXVlSWQgPSB1bmlxdWVJZCgnbycpXG4gICAgdGhpcy5jb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lclxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZU9iamVjdFxuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxuY2xhc3MgQnJvd3NlciB7XG59XG5cbnZhciBoYXNMb2NhbHN0b3JhZ2UgPSBmdW5jdGlvbigpe1xuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGFwcHInLCAnY2xhcHByJylcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY2xhcHByJylcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG52YXIgaGFzRmxhc2ggPSBmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICB2YXIgZm8gPSBuZXcgQWN0aXZlWE9iamVjdCgnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnKTtcbiAgICByZXR1cm4gISFmbztcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiAhIShuYXZpZ2F0b3IubWltZVR5cGVzICYmIG5hdmlnYXRvci5taW1lVHlwZXNbJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJ10gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBuYXZpZ2F0b3IubWltZVR5cGVzWydhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCddLmVuYWJsZWRQbHVnaW4pO1xuICB9XG59XG5cbkJyb3dzZXIuaXNTYWZhcmkgPSAoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9zYWZhcmkvaSkgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUnKSA9PT0gLTEpXG5Ccm93c2VyLmlzQ2hyb21lID0gISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvY2hyb21lL2kpKVxuQnJvd3Nlci5pc0ZpcmVmb3ggPSAhIShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9maXJlZm94L2kpKVxuQnJvd3Nlci5pc0xlZ2FjeUlFID0gISEod2luZG93LkFjdGl2ZVhPYmplY3QpXG5Ccm93c2VyLmlzSUUgPSBCcm93c2VyLmlzTGVnYWN5SUUgfHwgISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvdHJpZGVudC4qcnY6MVxcZC9pKSlcbkJyb3dzZXIuaXNJRTExID0gISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvdHJpZGVudC4qcnY6MTEvaSkpXG5Ccm93c2VyLmlzTW9iaWxlID0gISEoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fFdpbmRvd3MgUGhvbmV8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpXG5Ccm93c2VyLmlzaU9zID0gISEoL2lQYWR8aVBob25lfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKTtcbkJyb3dzZXIuaXNXaW44QXBwID0gISEoL01TQXBwSG9zdC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpXG5Ccm93c2VyLmlzV2lpVSA9ICEhKC9XaWlVL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSlcbkJyb3dzZXIuaXNQUzQgPSAhISgvUGxheVN0YXRpb24gNC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpXG5Ccm93c2VyLmhhc0xvY2Fsc3RvcmFnZSA9IGhhc0xvY2Fsc3RvcmFnZSgpXG5Ccm93c2VyLmhhc0ZsYXNoID0gaGFzRmxhc2goKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJyb3dzZXJcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBQbGF5ZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGxheWVyJylcbnZhciBNZWRpYXRvciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tZWRpYXRvcicpXG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi9iYXNlL2V2ZW50cycpXG52YXIgQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgnLi9iYXNlL2NvbnRhaW5lcl9wbHVnaW4nKVxudmFyIFVJQ29udGFpbmVyUGx1Z2luID0gcmVxdWlyZSgnLi9iYXNlL3VpX2NvbnRhaW5lcl9wbHVnaW4nKVxudmFyIENvcmVQbHVnaW4gPSByZXF1aXJlKCcuL2Jhc2UvY29yZV9wbHVnaW4nKVxudmFyIFVJQ29yZVBsdWdpbiA9IHJlcXVpcmUoJy4vYmFzZS91aV9jb3JlX3BsdWdpbicpXG5cbndpbmRvdy5ERUJVRyA9IGZhbHNlXG5cbndpbmRvdy5DbGFwcHIgPSB7XG4gIFBsYXllcjogUGxheWVyLFxuICBNZWRpYXRvcjogTWVkaWF0b3IsXG4gIEV2ZW50czogRXZlbnRzLFxuICBDb250YWluZXJQbHVnaW46IENvbnRhaW5lclBsdWdpbixcbiAgVUlDb250YWluZXJQbHVnaW46IFVJQ29udGFpbmVyUGx1Z2luLFxuICBDb3JlUGx1Z2luOiBDb3JlUGx1Z2luLFxuICBVSUNvcmVQbHVnaW46IFVJQ29yZVBsdWdpblxufVxud2luZG93LkNsYXBwci52ZXJzaW9uID0gXCJfX1ZFUlNJT05fX1wiXG5cbm1vZHVsZS5leHBvcnRzID0gd2luZG93LkNsYXBwclxuIiwidmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCcuL2Jhc2Vfb2JqZWN0JylcbnZhciBleHRlbmQgPSByZXF1aXJlKCcuL3V0aWxzJykuZXh0ZW5kXG5cbmNsYXNzIENvbnRhaW5lclBsdWdpbiBleHRlbmRzIEJhc2VPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuc3RvcExpc3RlbmluZygpXG4gICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgfVxufVxuXG5Db250YWluZXJQbHVnaW4uZXh0ZW5kID0gZnVuY3Rpb24ocHJvcGVydGllcykge1xuICByZXR1cm4gZXh0ZW5kKENvbnRhaW5lclBsdWdpbiwgcHJvcGVydGllcylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb250YWluZXJQbHVnaW5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb250YWluZXInKTtcbiIsInZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnLi9iYXNlX29iamVjdCcpXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscycpLmV4dGVuZFxuXG5jbGFzcyBDb3JlUGx1Z2luIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKGNvcmUpIHtcbiAgICBzdXBlcihjb3JlKVxuICAgIHRoaXMuY29yZSA9IGNvcmVcbiAgfVxuXG4gIGdldEV4dGVybmFsSW50ZXJmYWNlKCkgeyByZXR1cm4ge30gfVxuXG4gIGRlc3Ryb3koKSB7fVxufVxuXG5Db3JlUGx1Z2luLmV4dGVuZCA9IGZ1bmN0aW9uKHByb3BlcnRpZXMpIHtcbiAgcmV0dXJuIGV4dGVuZChDb3JlUGx1Z2luLCBwcm9wZXJ0aWVzKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvcmVQbHVnaW5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb3JlJyk7XG4iLCIvLyBDb3B5cmlnaHQgMjAxNCBHbG9iby5jb20gUGxheWVyIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZVxuLy8gbGljZW5zZSB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlLlxuXG52YXIgZXhlY09uY2UgPSByZXF1aXJlKCdsb2Rhc2gub25jZScpXG52YXIgdW5pcXVlSWQgPSByZXF1aXJlKCcuL3V0aWxzJykudW5pcXVlSWRcbnZhciBMb2cgPSByZXF1aXJlKCcuLi9wbHVnaW5zL2xvZycpLmdldEluc3RhbmNlKClcblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG5cbmNsYXNzIEV2ZW50cyB7XG4gIG9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKCFldmVudHNBcGkodGhpcywgJ29uJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpc1xuICAgIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pXG4gICAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCAodGhpcy5fZXZlbnRzW25hbWVdID0gW10pXG4gICAgZXZlbnRzLnB1c2goe2NhbGxiYWNrOiBjYWxsYmFjaywgY29udGV4dDogY29udGV4dCwgY3R4OiBjb250ZXh0IHx8IHRoaXN9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBvbmNlKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYgKCFldmVudHNBcGkodGhpcywgJ29uY2UnLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSB8fCAhY2FsbGJhY2spIHJldHVybiB0aGlzXG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgdmFyIG9uY2UgPSBleGVjT25jZShmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIG9uY2UpXG4gICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgfSlcbiAgICBvbmNlLl9jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgb25jZSwgY29udGV4dClcbiAgfVxuXG4gIG9mZihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHZhciByZXRhaW4sIGV2LCBldmVudHMsIG5hbWVzLCBpLCBsLCBqLCBrXG4gICAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIWV2ZW50c0FwaSh0aGlzLCAnb2ZmJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkpIHJldHVybiB0aGlzXG4gICAgaWYgKCFuYW1lICYmICFjYWxsYmFjayAmJiAhY29udGV4dCkge1xuICAgICAgdGhpcy5fZXZlbnRzID0gdm9pZCAwXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyh0aGlzLl9ldmVudHMpXG4gICAgZm9yIChpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgbmFtZSA9IG5hbWVzW2ldXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV1cbiAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzW25hbWVdID0gcmV0YWluID0gW11cbiAgICAgICAgaWYgKGNhbGxiYWNrIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICBmb3IgKGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgZXYgPSBldmVudHNbal1cbiAgICAgICAgICAgIGlmICgoY2FsbGJhY2sgJiYgY2FsbGJhY2sgIT09IGV2LmNhbGxiYWNrICYmIGNhbGxiYWNrICE9PSBldi5jYWxsYmFjay5fY2FsbGJhY2spIHx8XG4gICAgICAgICAgICAgICAgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXYuY29udGV4dCkpIHtcbiAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXYpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkgZGVsZXRlIHRoaXMuX2V2ZW50c1tuYW1lXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdHJpZ2dlcihuYW1lKSB7XG4gICAgdmFyIGtsYXNzID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGtsYXNzID0gdGhpcy5uYW1lXG4gICAgfVxuICAgIExvZy5kZWJ1Zy5hcHBseShMb2csIFtrbGFzc10uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKVxuICAgIGlmICghdGhpcy5fZXZlbnRzKSByZXR1cm4gdGhpc1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgaWYgKCFldmVudHNBcGkodGhpcywgJ3RyaWdnZXInLCBuYW1lLCBhcmdzKSkgcmV0dXJuIHRoaXNcbiAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdXG4gICAgdmFyIGFsbEV2ZW50cyA9IHRoaXMuX2V2ZW50cy5hbGxcbiAgICBpZiAoZXZlbnRzKSB0cmlnZ2VyRXZlbnRzKGV2ZW50cywgYXJncylcbiAgICBpZiAoYWxsRXZlbnRzKSB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdG9wTGlzdGVuaW5nKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgbGlzdGVuaW5nVG8gPSB0aGlzLl9saXN0ZW5pbmdUb1xuICAgIGlmICghbGlzdGVuaW5nVG8pIHJldHVybiB0aGlzXG4gICAgdmFyIHJlbW92ZSA9ICFuYW1lICYmICFjYWxsYmFja1xuICAgIGlmICghY2FsbGJhY2sgJiYgdHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXNcbiAgICBpZiAob2JqKSAobGlzdGVuaW5nVG8gPSB7fSlbb2JqLl9saXN0ZW5JZF0gPSBvYmpcbiAgICBmb3IgKHZhciBpZCBpbiBsaXN0ZW5pbmdUbykge1xuICAgICAgb2JqID0gbGlzdGVuaW5nVG9baWRdXG4gICAgICBvYmoub2ZmKG5hbWUsIGNhbGxiYWNrLCB0aGlzKVxuICAgICAgaWYgKHJlbW92ZSB8fCBPYmplY3Qua2V5cyhvYmouX2V2ZW50cykubGVuZ3RoID09PSAwKSBkZWxldGUgdGhpcy5fbGlzdGVuaW5nVG9baWRdXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxudmFyIGV2ZW50U3BsaXR0ZXIgPSAvXFxzKy9cblxudmFyIGV2ZW50c0FwaSA9IGZ1bmN0aW9uKG9iaiwgYWN0aW9uLCBuYW1lLCByZXN0KSB7XG4gIGlmICghbmFtZSkgcmV0dXJuIHRydWVcblxuICAvLyBIYW5kbGUgZXZlbnQgbWFwcy5cbiAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtrZXksIG5hbWVba2V5XV0uY29uY2F0KHJlc3QpKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIEhhbmRsZSBzcGFjZSBzZXBhcmF0ZWQgZXZlbnQgbmFtZXMuXG4gIGlmIChldmVudFNwbGl0dGVyLnRlc3QobmFtZSkpIHtcbiAgICB2YXIgbmFtZXMgPSBuYW1lLnNwbGl0KGV2ZW50U3BsaXR0ZXIpXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG9ialthY3Rpb25dLmFwcGx5KG9iaiwgW25hbWVzW2ldXS5jb25jYXQocmVzdCkpXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxudmFyIHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MpIHtcbiAgdmFyIGV2LCBpID0gLTEsIGwgPSBldmVudHMubGVuZ3RoLCBhMSA9IGFyZ3NbMF0sIGEyID0gYXJnc1sxXSwgYTMgPSBhcmdzWzJdXG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4KTsgcmV0dXJuXG4gICAgY2FzZSAxOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEpOyByZXR1cm5cbiAgICBjYXNlIDI6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIpOyByZXR1cm5cbiAgICBjYXNlIDM6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIsIGEzKTsgcmV0dXJuXG4gICAgZGVmYXVsdDogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suYXBwbHkoZXYuY3R4LCBhcmdzKTsgcmV0dXJuXG4gIH1cbn1cblxudmFyIGxpc3Rlbk1ldGhvZHMgPSB7bGlzdGVuVG86ICdvbicsIGxpc3RlblRvT25jZTogJ29uY2UnfVxuXG5PYmplY3Qua2V5cyhsaXN0ZW5NZXRob2RzKS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICBFdmVudHMucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGxpc3RlbmluZ1RvID0gdGhpcy5fbGlzdGVuaW5nVG8gfHwgKHRoaXMuX2xpc3RlbmluZ1RvID0ge30pXG4gICAgdmFyIGlkID0gb2JqLl9saXN0ZW5JZCB8fCAob2JqLl9saXN0ZW5JZCA9IHVuaXF1ZUlkKCdsJykpXG4gICAgbGlzdGVuaW5nVG9baWRdID0gb2JqXG4gICAgaWYgKCFjYWxsYmFjayAmJiB0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpc1xuICAgIG9ialtsaXN0ZW5NZXRob2RzW21ldGhvZF1dKG5hbWUsIGNhbGxiYWNrLCB0aGlzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn0pO1xuXG4vLyBQTEFZRVIgRVZFTlRTXG5FdmVudHMuUExBWUVSX1JFU0laRSA9ICdyZXNpemUnXG5FdmVudHMuUExBWUVSX1BMQVkgPSAncGxheSdcbkV2ZW50cy5QTEFZRVJfUEFVU0UgPSAncGF1c2UnXG5FdmVudHMuUExBWUVSX1NUT1AgPSAnc3RvcCdcbkV2ZW50cy5QTEFZRVJfRU5ERUQgPSAnZW5kZWQnXG5FdmVudHMuUExBWUVSX1NFRUsgPSAnc2VlaydcbkV2ZW50cy5QTEFZRVJfRVJST1IgPSAnZXJyb3InXG5FdmVudHMuUExBWUVSX1RJTUVVUERBVEUgPSAndGltZXVwZGF0ZSdcblxuLy8gUGxheWJhY2sgRXZlbnRzXG5FdmVudHMuUExBWUJBQ0tfUFJPR1JFU1MgPSAncGxheWJhY2s6cHJvZ3Jlc3MnXG5FdmVudHMuUExBWUJBQ0tfVElNRVVQREFURSA9ICdwbGF5YmFjazp0aW1ldXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX1JFQURZID0gJ3BsYXliYWNrOnJlYWR5J1xuRXZlbnRzLlBMQVlCQUNLX0JVRkZFUklORyA9ICdwbGF5YmFjazpidWZmZXJpbmcnXG5FdmVudHMuUExBWUJBQ0tfQlVGRkVSRlVMTCA9ICdwbGF5YmFjazpidWZmZXJmdWxsJ1xuRXZlbnRzLlBMQVlCQUNLX1NFVFRJTkdTVVBEQVRFID0gJ3BsYXliYWNrOnNldHRpbmdzdXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX0xPQURFRE1FVEFEQVRBID0gJ3BsYXliYWNrOmxvYWRlZG1ldGFkYXRhJ1xuRXZlbnRzLlBMQVlCQUNLX0hJR0hERUZJTklUSU9OVVBEQVRFID0gJ3BsYXliYWNrOmhpZ2hkZWZpbml0aW9udXBkYXRlJ1xuRXZlbnRzLlBMQVlCQUNLX0JJVFJBVEUgPSAncGxheWJhY2s6Yml0cmF0ZSdcbkV2ZW50cy5QTEFZQkFDS19QTEFZQkFDS1NUQVRFID0gJ3BsYXliYWNrOnBsYXliYWNrc3RhdGUnXG5FdmVudHMuUExBWUJBQ0tfRFZSID0gJ3BsYXliYWNrOmR2cidcbkV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRElTQUJMRSA9ICdwbGF5YmFjazptZWRpYWNvbnRyb2w6ZGlzYWJsZSdcbkV2ZW50cy5QTEFZQkFDS19NRURJQUNPTlRST0xfRU5BQkxFID0gJ3BsYXliYWNrOm1lZGlhY29udHJvbDplbmFibGUnXG5FdmVudHMuUExBWUJBQ0tfRU5ERUQgPSAncGxheWJhY2s6ZW5kZWQnXG5FdmVudHMuUExBWUJBQ0tfUExBWSA9ICdwbGF5YmFjazpwbGF5J1xuRXZlbnRzLlBMQVlCQUNLX1BBVVNFID0gJ3BsYXliYWNrOnBhdXNlJ1xuRXZlbnRzLlBMQVlCQUNLX0VSUk9SID0gJ3BsYXliYWNrOmVycm9yJ1xuRXZlbnRzLlBMQVlCQUNLX1NUQVRTX0FERCA9ICdwbGF5YmFjazpzdGF0czphZGQnXG5cbi8vIENvbnRhaW5lciBFdmVudHNcbkV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tTVEFURSA9ICdjb250YWluZXI6cGxheWJhY2tzdGF0ZSdcbkV2ZW50cy5DT05UQUlORVJfUExBWUJBQ0tEVlJTVEFURUNIQU5HRUQgPSAnY29udGFpbmVyOmR2cidcbkV2ZW50cy5DT05UQUlORVJfQklUUkFURSA9ICdjb250YWluZXI6Yml0cmF0ZSdcbkV2ZW50cy5DT05UQUlORVJfU1RBVFNfUkVQT1JUID0gJ2NvbnRhaW5lcjpzdGF0czpyZXBvcnQnXG5FdmVudHMuQ09OVEFJTkVSX0RFU1RST1lFRCA9ICdjb250YWluZXI6ZGVzdHJveWVkJ1xuRXZlbnRzLkNPTlRBSU5FUl9SRUFEWSA9ICdjb250YWluZXI6cmVhZHknXG5FdmVudHMuQ09OVEFJTkVSX0VSUk9SID0gJ2NvbnRhaW5lcjplcnJvcidcbkV2ZW50cy5DT05UQUlORVJfTE9BREVETUVUQURBVEEgPSAnY29udGFpbmVyOmxvYWRlZG1ldGFkYXRhJ1xuRXZlbnRzLkNPTlRBSU5FUl9USU1FVVBEQVRFID0gJ2NvbnRhaW5lcjp0aW1ldXBkYXRlJ1xuRXZlbnRzLkNPTlRBSU5FUl9QUk9HUkVTUyA9ICdjb250YWluZXI6cHJvZ3Jlc3MnXG5FdmVudHMuQ09OVEFJTkVSX1BMQVkgPSAnY29udGFpbmVyOnBsYXknXG5FdmVudHMuQ09OVEFJTkVSX1NUT1AgPSAnY29udGFpbmVyOnN0b3AnXG5FdmVudHMuQ09OVEFJTkVSX1BBVVNFID0gJ2NvbnRhaW5lcjpwYXVzZSdcbkV2ZW50cy5DT05UQUlORVJfRU5ERUQgPSAnY29udGFpbmVyOmVuZGVkJ1xuRXZlbnRzLkNPTlRBSU5FUl9DTElDSyA9ICdjb250YWluZXI6Y2xpY2snXG5FdmVudHMuQ09OVEFJTkVSX0RCTENMSUNLID0gJ2NvbnRhaW5lcjpkYmxjbGljaydcbkV2ZW50cy5DT05UQUlORVJfTU9VU0VfRU5URVIgPSAnY29udGFpbmVyOm1vdXNlZW50ZXInXG5FdmVudHMuQ09OVEFJTkVSX01PVVNFX0xFQVZFID0gJ2NvbnRhaW5lcjptb3VzZWxlYXZlJ1xuRXZlbnRzLkNPTlRBSU5FUl9TRUVLID0gJ2NvbnRhaW5lcjpzZWVrJ1xuRXZlbnRzLkNPTlRBSU5FUl9WT0xVTUUgPSAnY29udGFpbmVyOnZvbHVtZSdcbkV2ZW50cy5DT05UQUlORVJfRlVMTFNDUkVFTiA9ICdjb250YWluZXI6ZnVsbHNjcmVlbidcbkV2ZW50cy5DT05UQUlORVJfU1RBVEVfQlVGRkVSSU5HID0gJ2NvbnRhaW5lcjpzdGF0ZTpidWZmZXJpbmcnXG5FdmVudHMuQ09OVEFJTkVSX1NUQVRFX0JVRkZFUkZVTEwgPSAnY29udGFpbmVyOnN0YXRlOmJ1ZmZlcmZ1bGwnXG5FdmVudHMuQ09OVEFJTkVSX1NFVFRJTkdTVVBEQVRFID0gJ2NvbnRhaW5lcjpzZXR0aW5nc3VwZGF0ZSdcbkV2ZW50cy5DT05UQUlORVJfSElHSERFRklOSVRJT05VUERBVEUgPSAnY29udGFpbmVyOmhpZ2hkZWZpbml0aW9udXBkYXRlJ1xuRXZlbnRzLkNPTlRBSU5FUl9NRURJQUNPTlRST0xfRElTQUJMRSA9ICdjb250YWluZXI6bWVkaWFjb250cm9sOmRpc2FibGUnXG5FdmVudHMuQ09OVEFJTkVSX01FRElBQ09OVFJPTF9FTkFCTEUgPSAnY29udGFpbmVyOm1lZGlhY29udHJvbDplbmFibGUnXG5FdmVudHMuQ09OVEFJTkVSX1NUQVRTX0FERCA9ICdjb250YWluZXI6c3RhdHM6YWRkJ1xuXG4vLyBNZWRpYUNvbnRyb2wgRXZlbnRzXG5FdmVudHMuTUVESUFDT05UUk9MX1JFTkRFUkVEID0gJ21lZGlhY29udHJvbDpyZW5kZXJlZCdcbkV2ZW50cy5NRURJQUNPTlRST0xfRlVMTFNDUkVFTiA9ICdtZWRpYWNvbnRyb2w6ZnVsbHNjcmVlbidcbkV2ZW50cy5NRURJQUNPTlRST0xfU0hPVyA9ICdtZWRpYWNvbnRyb2w6c2hvdydcbkV2ZW50cy5NRURJQUNPTlRST0xfSElERSA9ICdtZWRpYWNvbnRyb2w6aGlkZSdcbkV2ZW50cy5NRURJQUNPTlRST0xfTU9VU0VNT1ZFX1NFRUtCQVIgPSAnbWVkaWFjb250cm9sOm1vdXNlbW92ZTpzZWVrYmFyJ1xuRXZlbnRzLk1FRElBQ09OVFJPTF9NT1VTRUxFQVZFX1NFRUtCQVIgPSAnbWVkaWFjb250cm9sOm1vdXNlbGVhdmU6c2Vla2JhcidcbkV2ZW50cy5NRURJQUNPTlRST0xfUExBWUlORyA9ICdtZWRpYWNvbnRyb2w6cGxheWluZydcbkV2ZW50cy5NRURJQUNPTlRST0xfTk9UUExBWUlORyA9ICdtZWRpYWNvbnRyb2w6bm90cGxheWluZydcbkV2ZW50cy5NRURJQUNPTlRST0xfQ09OVEFJTkVSQ0hBTkdFRCA9ICdtZWRpYWNvbnRyb2w6Y29udGFpbmVyY2hhbmdlZCdcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudHNcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mbGFzaCcpO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaGxzJyk7XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9odG1sNV9hdWRpbycpO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaHRtbDVfdmlkZW8nKTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2h0bWxfaW1nJyk7XG5cbiIsInZhciBLaWJvID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50IHx8IHdpbmRvdy5kb2N1bWVudDtcbiAgdGhpcy5pbml0aWFsaXplKCk7XG59O1xuXG5LaWJvLktFWV9OQU1FU19CWV9DT0RFID0ge1xuICA4OiAnYmFja3NwYWNlJywgOTogJ3RhYicsIDEzOiAnZW50ZXInLFxuICAxNjogJ3NoaWZ0JywgMTc6ICdjdHJsJywgMTg6ICdhbHQnLFxuICAyMDogJ2NhcHNfbG9jaycsXG4gIDI3OiAnZXNjJyxcbiAgMzI6ICdzcGFjZScsXG4gIDM3OiAnbGVmdCcsIDM4OiAndXAnLCAzOTogJ3JpZ2h0JywgNDA6ICdkb3duJyxcbiAgNDg6ICcwJywgNDk6ICcxJywgNTA6ICcyJywgNTE6ICczJywgNTI6ICc0JywgNTM6ICc1JywgNTQ6ICc2JywgNTU6ICc3JywgNTY6ICc4JywgNTc6ICc5JyxcbiAgNjU6ICdhJywgNjY6ICdiJywgNjc6ICdjJywgNjg6ICdkJywgNjk6ICdlJywgNzA6ICdmJywgNzE6ICdnJywgNzI6ICdoJywgNzM6ICdpJywgNzQ6ICdqJywgNzU6ICdrJywgNzY6ICdsJywgNzc6ICdtJywgNzg6ICduJywgNzk6ICdvJywgODA6ICdwJywgODE6ICdxJywgODI6ICdyJywgODM6ICdzJywgODQ6ICd0JywgODU6ICd1JywgODY6ICd2JywgODc6ICd3JywgODg6ICd4JywgODk6ICd5JywgOTA6ICd6JyxcbiAgMTEyOiAnZjEnLCAxMTM6ICdmMicsIDExNDogJ2YzJywgMTE1OiAnZjQnLCAxMTY6ICdmNScsIDExNzogJ2Y2JywgMTE4OiAnZjcnLCAxMTk6ICdmOCcsIDEyMDogJ2Y5JywgMTIxOiAnZjEwJywgMTIyOiAnZjExJywgMTIzOiAnZjEyJ1xufTtcblxuS2liby5LRVlfQ09ERVNfQllfTkFNRSA9IHt9O1xuKGZ1bmN0aW9uKCkge1xuICBmb3IodmFyIGtleSBpbiBLaWJvLktFWV9OQU1FU19CWV9DT0RFKVxuICAgIGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChLaWJvLktFWV9OQU1FU19CWV9DT0RFLCBrZXkpKVxuICAgICAgS2liby5LRVlfQ09ERVNfQllfTkFNRVtLaWJvLktFWV9OQU1FU19CWV9DT0RFW2tleV1dID0gK2tleTtcbn0pKCk7XG5cbktpYm8uTU9ESUZJRVJTID0gWydzaGlmdCcsICdjdHJsJywgJ2FsdCddO1xuXG5LaWJvLnJlZ2lzdGVyRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGlmKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jLCBmYWxzZSk7XG4gICAgfTtcbiAgfVxuICBlbHNlIGlmKGRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgZnVuYykge1xuICAgICAgZWxlbWVudC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCBmdW5jKTtcbiAgICB9O1xuICB9XG59KSgpO1xuXG5LaWJvLnVucmVnaXN0ZXJFdmVudCA9IChmdW5jdGlvbigpIHtcbiAgaWYoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGZ1bmMpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmMsIGZhbHNlKTtcbiAgICB9O1xuICB9XG4gIGVsc2UgaWYoZG9jdW1lbnQuZGV0YWNoRXZlbnQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICBlbGVtZW50LmRldGFjaEV2ZW50KCdvbicgKyBldmVudE5hbWUsIGZ1bmMpO1xuICAgIH07XG4gIH1cbn0pKCk7XG5cbktpYm8uc3RyaW5nQ29udGFpbnMgPSBmdW5jdGlvbihzdHJpbmcsIHN1YnN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLmluZGV4T2Yoc3Vic3RyaW5nKSAhPT0gLTE7XG59O1xuXG5LaWJvLm5lYXRTdHJpbmcgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xufTtcblxuS2liby5jYXBpdGFsaXplID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eLi8sIGZ1bmN0aW9uKG1hdGNoKSB7IHJldHVybiBtYXRjaC50b1VwcGVyQ2FzZSgpOyB9KTtcbn07XG5cbktpYm8uaXNTdHJpbmcgPSBmdW5jdGlvbih3aGF0KSB7XG4gIHJldHVybiBLaWJvLnN0cmluZ0NvbnRhaW5zKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aGF0KSwgJ1N0cmluZycpO1xufTtcblxuS2liby5hcnJheUluY2x1ZGVzID0gKGZ1bmN0aW9uKCkge1xuICBpZihBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xuICAgIHJldHVybiBmdW5jdGlvbihoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgICByZXR1cm4gaGF5c3RhY2suaW5kZXhPZihuZWVkbGUpICE9PSAtMTtcbiAgICB9O1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBmdW5jdGlvbihoYXlzdGFjaywgbmVlZGxlKSB7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaGF5c3RhY2subGVuZ3RoOyBpKyspXG4gICAgICAgIGlmKGhheXN0YWNrW2ldID09PSBuZWVkbGUpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfVxufSkoKTtcblxuS2liby5leHRyYWN0TW9kaWZpZXJzID0gZnVuY3Rpb24oa2V5Q29tYmluYXRpb24pIHtcbiAgdmFyIG1vZGlmaWVycywgaVxuICBtb2RpZmllcnMgPSBbXTtcbiAgZm9yKGkgPSAwOyBpIDwgS2liby5NT0RJRklFUlMubGVuZ3RoOyBpKyspXG4gICAgaWYoS2liby5zdHJpbmdDb250YWlucyhrZXlDb21iaW5hdGlvbiwgS2liby5NT0RJRklFUlNbaV0pKVxuICAgICAgbW9kaWZpZXJzLnB1c2goS2liby5NT0RJRklFUlNbaV0pO1xuICByZXR1cm4gbW9kaWZpZXJzO1xufVxuXG5LaWJvLmV4dHJhY3RLZXkgPSBmdW5jdGlvbihrZXlDb21iaW5hdGlvbikge1xuICB2YXIga2V5cywgaTtcbiAga2V5cyA9IEtpYm8ubmVhdFN0cmluZyhrZXlDb21iaW5hdGlvbikuc3BsaXQoJyAnKTtcbiAgZm9yKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKylcbiAgICBpZighS2liby5hcnJheUluY2x1ZGVzKEtpYm8uTU9ESUZJRVJTLCBrZXlzW2ldKSlcbiAgICAgIHJldHVybiBrZXlzW2ldO1xufTtcblxuS2liby5tb2RpZmllcnNBbmRLZXkgPSBmdW5jdGlvbihrZXlDb21iaW5hdGlvbikge1xuICB2YXIgcmVzdWx0LCBrZXk7XG5cbiAgaWYoS2liby5zdHJpbmdDb250YWlucyhrZXlDb21iaW5hdGlvbiwgJ2FueScpKSB7XG4gICAgcmV0dXJuIEtpYm8ubmVhdFN0cmluZyhrZXlDb21iaW5hdGlvbikuc3BsaXQoJyAnKS5zbGljZSgwLCAyKS5qb2luKCcgJyk7XG4gIH1cblxuICByZXN1bHQgPSBLaWJvLmV4dHJhY3RNb2RpZmllcnMoa2V5Q29tYmluYXRpb24pO1xuXG4gIGtleSA9IEtpYm8uZXh0cmFjdEtleShrZXlDb21iaW5hdGlvbik7XG4gIGlmKGtleSAmJiAhS2liby5hcnJheUluY2x1ZGVzKEtpYm8uTU9ESUZJRVJTLCBrZXkpKVxuICAgIHJlc3VsdC5wdXNoKGtleSk7XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJyk7XG59XG5cbktpYm8ua2V5TmFtZSA9IGZ1bmN0aW9uKGtleUNvZGUpIHtcbiAgcmV0dXJuIEtpYm8uS0VZX05BTUVTX0JZX0NPREVba2V5Q29kZSArICcnXTtcbn07XG5cbktpYm8ua2V5Q29kZSA9IGZ1bmN0aW9uKGtleU5hbWUpIHtcbiAgcmV0dXJuICtLaWJvLktFWV9DT0RFU19CWV9OQU1FW2tleU5hbWVdO1xufTtcblxuS2liby5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaSwgdGhhdCA9IHRoaXM7XG5cbiAgdGhpcy5sYXN0S2V5Q29kZSA9IC0xO1xuICB0aGlzLmxhc3RNb2RpZmllcnMgPSB7fTtcbiAgZm9yKGkgPSAwOyBpIDwgS2liby5NT0RJRklFUlMubGVuZ3RoOyBpKyspXG4gICAgdGhpcy5sYXN0TW9kaWZpZXJzW0tpYm8uTU9ESUZJRVJTW2ldXSA9IGZhbHNlO1xuXG4gIHRoaXMua2V5c0Rvd24gPSB7IGFueTogW10gfTtcbiAgdGhpcy5rZXlzVXAgPSB7IGFueTogW10gfTtcbiAgdGhpcy5kb3duSGFuZGxlciA9IHRoaXMuaGFuZGxlcignZG93bicpO1xuICB0aGlzLnVwSGFuZGxlciA9IHRoaXMuaGFuZGxlcigndXAnKTtcblxuICBLaWJvLnJlZ2lzdGVyRXZlbnQodGhpcy5lbGVtZW50LCAna2V5ZG93bicsIHRoaXMuZG93bkhhbmRsZXIpO1xuICBLaWJvLnJlZ2lzdGVyRXZlbnQodGhpcy5lbGVtZW50LCAna2V5dXAnLCB0aGlzLnVwSGFuZGxlcik7XG4gIEtpYm8ucmVnaXN0ZXJFdmVudCh3aW5kb3csICd1bmxvYWQnLCBmdW5jdGlvbiB1bmxvYWRlcigpIHtcbiAgICBLaWJvLnVucmVnaXN0ZXJFdmVudCh0aGF0LmVsZW1lbnQsICdrZXlkb3duJywgdGhhdC5kb3duSGFuZGxlcik7XG4gICAgS2liby51bnJlZ2lzdGVyRXZlbnQodGhhdC5lbGVtZW50LCAna2V5dXAnLCB0aGF0LnVwSGFuZGxlcik7XG4gICAgS2liby51bnJlZ2lzdGVyRXZlbnQod2luZG93LCAndW5sb2FkJywgdW5sb2FkZXIpO1xuICB9KTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmhhbmRsZXIgPSBmdW5jdGlvbih1cE9yRG93bikge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGksIHJlZ2lzdGVyZWRLZXlzLCBsYXN0TW9kaWZpZXJzQW5kS2V5O1xuXG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuXG4gICAgdGhhdC5sYXN0S2V5Q29kZSA9IGUua2V5Q29kZTtcbiAgICBmb3IoaSA9IDA7IGkgPCBLaWJvLk1PRElGSUVSUy5sZW5ndGg7IGkrKylcbiAgICAgIHRoYXQubGFzdE1vZGlmaWVyc1tLaWJvLk1PRElGSUVSU1tpXV0gPSBlW0tpYm8uTU9ESUZJRVJTW2ldICsgJ0tleSddO1xuICAgIGlmKEtpYm8uYXJyYXlJbmNsdWRlcyhLaWJvLk1PRElGSUVSUywgS2liby5rZXlOYW1lKHRoYXQubGFzdEtleUNvZGUpKSlcbiAgICAgIHRoYXQubGFzdE1vZGlmaWVyc1tLaWJvLmtleU5hbWUodGhhdC5sYXN0S2V5Q29kZSldID0gdHJ1ZTtcblxuICAgIHJlZ2lzdGVyZWRLZXlzID0gdGhhdFsna2V5cycgKyBLaWJvLmNhcGl0YWxpemUodXBPckRvd24pXTtcblxuICAgIGZvcihpID0gMDsgaSA8IHJlZ2lzdGVyZWRLZXlzLmFueS5sZW5ndGg7IGkrKylcbiAgICAgIGlmKChyZWdpc3RlcmVkS2V5cy5hbnlbaV0oZSkgPT09IGZhbHNlKSAmJiBlLnByZXZlbnREZWZhdWx0KVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsYXN0TW9kaWZpZXJzQW5kS2V5ID0gdGhhdC5sYXN0TW9kaWZpZXJzQW5kS2V5KCk7XG4gICAgaWYocmVnaXN0ZXJlZEtleXNbbGFzdE1vZGlmaWVyc0FuZEtleV0pXG4gICAgICBmb3IoaSA9IDA7IGkgPCByZWdpc3RlcmVkS2V5c1tsYXN0TW9kaWZpZXJzQW5kS2V5XS5sZW5ndGg7IGkrKylcbiAgICAgICAgaWYoKHJlZ2lzdGVyZWRLZXlzW2xhc3RNb2RpZmllcnNBbmRLZXldW2ldKGUpID09PSBmYWxzZSkgJiYgZS5wcmV2ZW50RGVmYXVsdClcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG59O1xuXG5LaWJvLnByb3RvdHlwZS5yZWdpc3RlcktleXMgPSBmdW5jdGlvbih1cE9yRG93biwgbmV3S2V5cywgZnVuYykge1xuICB2YXIgaSwga2V5cywgcmVnaXN0ZXJlZEtleXMgPSB0aGlzWydrZXlzJyArIEtpYm8uY2FwaXRhbGl6ZSh1cE9yRG93bildO1xuXG4gIGlmKEtpYm8uaXNTdHJpbmcobmV3S2V5cykpXG4gICAgbmV3S2V5cyA9IFtuZXdLZXlzXTtcblxuICBmb3IoaSA9IDA7IGkgPCBuZXdLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5cyA9IG5ld0tleXNbaV07XG4gICAga2V5cyA9IEtpYm8ubW9kaWZpZXJzQW5kS2V5KGtleXMgKyAnJyk7XG5cbiAgICBpZihyZWdpc3RlcmVkS2V5c1trZXlzXSlcbiAgICAgIHJlZ2lzdGVyZWRLZXlzW2tleXNdLnB1c2goZnVuYyk7XG4gICAgZWxzZVxuICAgICAgcmVnaXN0ZXJlZEtleXNba2V5c10gPSBbZnVuY107XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbktpYm8ucHJvdG90eXBlLnVucmVnaXN0ZXJLZXlzID0gZnVuY3Rpb24odXBPckRvd24sIG5ld0tleXMsIGZ1bmMpIHtcbiAgdmFyIGksIGosIGtleXMsIHJlZ2lzdGVyZWRLZXlzID0gdGhpc1sna2V5cycgKyBLaWJvLmNhcGl0YWxpemUodXBPckRvd24pXTtcblxuICBpZihLaWJvLmlzU3RyaW5nKG5ld0tleXMpKVxuICAgIG5ld0tleXMgPSBbbmV3S2V5c107XG5cbiAgZm9yKGkgPSAwOyBpIDwgbmV3S2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleXMgPSBuZXdLZXlzW2ldO1xuICAgIGtleXMgPSBLaWJvLm1vZGlmaWVyc0FuZEtleShrZXlzICsgJycpO1xuXG4gICAgaWYoZnVuYyA9PT0gbnVsbClcbiAgICAgIGRlbGV0ZSByZWdpc3RlcmVkS2V5c1trZXlzXTtcbiAgICBlbHNlIHtcbiAgICAgIGlmKHJlZ2lzdGVyZWRLZXlzW2tleXNdKSB7XG4gICAgICAgIGZvcihqID0gMDsgaiA8IHJlZ2lzdGVyZWRLZXlzW2tleXNdLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYoU3RyaW5nKHJlZ2lzdGVyZWRLZXlzW2tleXNdW2pdKSA9PT0gU3RyaW5nKGZ1bmMpKSB7XG4gICAgICAgICAgICByZWdpc3RlcmVkS2V5c1trZXlzXS5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbktpYm8ucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKGtleXMpIHtcbiAgcmV0dXJuIHRoaXMudW5yZWdpc3RlcktleXMoJ2Rvd24nLCBrZXlzLCBudWxsKTtcbn1cblxuS2liby5wcm90b3R5cGUuZGVsZWdhdGUgPSBmdW5jdGlvbih1cE9yRG93biwga2V5cywgZnVuYykge1xuICByZXR1cm4gKGZ1bmMgIT09IG51bGwgfHwgZnVuYyAhPT0gdW5kZWZpbmVkKSA/IHRoaXMucmVnaXN0ZXJLZXlzKHVwT3JEb3duLCBrZXlzLCBmdW5jKSA6IHRoaXMudW5yZWdpc3RlcktleXModXBPckRvd24sIGtleXMsIGZ1bmMpO1xufTtcblxuS2liby5wcm90b3R5cGUuZG93biA9IGZ1bmN0aW9uKGtleXMsIGZ1bmMpIHtcbiAgcmV0dXJuIHRoaXMuZGVsZWdhdGUoJ2Rvd24nLCBrZXlzLCBmdW5jKTtcbn07XG5cbktpYm8ucHJvdG90eXBlLnVwID0gZnVuY3Rpb24oa2V5cywgZnVuYykge1xuICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSgndXAnLCBrZXlzLCBmdW5jKTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmxhc3RLZXkgPSBmdW5jdGlvbihtb2RpZmllcikge1xuICBpZighbW9kaWZpZXIpXG4gICAgcmV0dXJuIEtpYm8ua2V5TmFtZSh0aGlzLmxhc3RLZXlDb2RlKTtcblxuICByZXR1cm4gdGhpcy5sYXN0TW9kaWZpZXJzW21vZGlmaWVyXTtcbn07XG5cbktpYm8ucHJvdG90eXBlLmxhc3RNb2RpZmllcnNBbmRLZXkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc3VsdCwgaTtcblxuICByZXN1bHQgPSBbXTtcbiAgZm9yKGkgPSAwOyBpIDwgS2liby5NT0RJRklFUlMubGVuZ3RoOyBpKyspXG4gICAgaWYodGhpcy5sYXN0S2V5KEtpYm8uTU9ESUZJRVJTW2ldKSlcbiAgICAgIHJlc3VsdC5wdXNoKEtpYm8uTU9ESUZJRVJTW2ldKTtcblxuICBpZighS2liby5hcnJheUluY2x1ZGVzKHJlc3VsdCwgdGhpcy5sYXN0S2V5KCkpKVxuICAgIHJlc3VsdC5wdXNoKHRoaXMubGFzdEtleSgpKTtcblxuICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gS2libztcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tZWRpYV9jb250cm9sJyk7XG5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbi8qKlxuICogVGhlIG1lZGlhdG9yIGlzIGEgc2luZ2xldG9uIGZvciBoYW5kbGluZyBnbG9iYWwgZXZlbnRzLlxuICovXG5cbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi9iYXNlL2V2ZW50cycpXG5cbnZhciBldmVudHMgPSBuZXcgRXZlbnRzKClcblxuY2xhc3MgTWVkaWF0b3Ige1xufVxuXG5NZWRpYXRvci5vbiA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIGV2ZW50cy5vbihuYW1lLCBjYWxsYmFjaywgY29udGV4dClcbiAgcmV0dXJuXG59XG5cbk1lZGlhdG9yLm9uY2UgPSBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICBldmVudHMub25jZShuYW1lLCBjYWxsYmFjaywgY29udGV4dClcbiAgcmV0dXJuXG59XG5cbk1lZGlhdG9yLm9mZiA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIGV2ZW50cy5vZmYobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpXG4gIHJldHVyblxufVxuXG5NZWRpYXRvci50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSwgb3B0cykge1xuICBldmVudHMudHJpZ2dlcihuYW1lLCBvcHRzKVxuICByZXR1cm5cbn1cblxuTWVkaWF0b3Iuc3RvcExpc3RlbmluZyA9IGZ1bmN0aW9uKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgZXZlbnRzLnN0b3BMaXN0ZW5pbmcob2JqLCBuYW1lLCBjYWxsYmFjaylcbiAgcmV0dXJuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWVkaWF0b3JcbiIsInZhciBVSU9iamVjdCA9IHJlcXVpcmUoJy4vdWlfb2JqZWN0JylcblxuY2xhc3MgUGxheWJhY2sgZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuc2V0dGluZ3MgPSB7fVxuICB9XG5cbiAgcGxheSgpIHt9XG5cbiAgcGF1c2UoKSB7fVxuXG4gIHN0b3AoKSB7fVxuXG4gIHNlZWsodGltZSkge31cblxuICBnZXREdXJhdGlvbigpIHsgcmV0dXJuIDAgfVxuXG4gIGlzUGxheWluZygpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGdldFBsYXliYWNrVHlwZSgpIHtcbiAgICByZXR1cm4gJ25vX29wJ1xuICB9XG5cbiAgaXNIaWdoRGVmaW5pdGlvbkluVXNlKCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdm9sdW1lKHZhbHVlKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgfVxufVxuXG5QbGF5YmFjay5jYW5QbGF5ID0gKHNvdXJjZSkgPT4ge1xuICByZXR1cm4gZmFsc2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5YmFja1xuIiwiLy8gQ29weXJpZ2h0IDIwMTQgR2xvYm8uY29tIFBsYXllciBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGVcbi8vIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZS5cblxudmFyIFBsYXllckluZm8gPXtcbiAgb3B0aW9uczoge30sXG4gIHBsYXliYWNrUGx1Z2luczogW10sXG4gIGN1cnJlbnRTaXplOiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllckluZm9cblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3Bvc3RlcicpO1xuXG4iLCIvLyBTaW1wbGUgSmF2YVNjcmlwdCBUZW1wbGF0aW5nXG4vLyBQYXVsIE1pbGxlciAoaHR0cDovL3BhdWxtaWxsci5jb20pXG4vLyBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuLy8gKGMpIDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuKGZ1bmN0aW9uKGdsb2JhbHMpIHtcbiAgLy8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXG4gIC8vIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAgdmFyIHNldHRpbmdzID0ge1xuICAgIGV2YWx1YXRlICAgIDogLzwlKFtcXHNcXFNdKz8pJT4vZyxcbiAgICBpbnRlcnBvbGF0ZSA6IC88JT0oW1xcc1xcU10rPyklPi9nLFxuICAgIGVzY2FwZSAgICAgIDogLzwlLShbXFxzXFxTXSs/KSU+L2dcbiAgfTtcblxuICAvLyBXaGVuIGN1c3RvbWl6aW5nIGB0ZW1wbGF0ZVNldHRpbmdzYCwgaWYgeW91IGRvbid0IHdhbnQgdG8gZGVmaW5lIGFuXG4gIC8vIGludGVycG9sYXRpb24sIGV2YWx1YXRpb24gb3IgZXNjYXBpbmcgcmVnZXgsIHdlIG5lZWQgb25lIHRoYXQgaXNcbiAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXG4gIHZhciBub01hdGNoID0gLyguKV4vO1xuXG4gIC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4gIC8vIHN0cmluZyBsaXRlcmFsLlxuICB2YXIgZXNjYXBlcyA9IHtcbiAgICBcIidcIjogICAgICBcIidcIixcbiAgICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICAgJ1xccic6ICAgICAncicsXG4gICAgJ1xcbic6ICAgICAnbicsXG4gICAgJ1xcdCc6ICAgICAndCcsXG4gICAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ3UyMDI5J1xuICB9O1xuXG4gIHZhciBlc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdHxcXHUyMDI4fFxcdTIwMjkvZztcblxuICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxuICB2YXIgaHRtbEVudGl0aWVzID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjeDI3OydcbiAgfTtcblxuICB2YXIgZW50aXR5UmUgPSBuZXcgUmVnRXhwKCdbJjw+XCJcXCddJywgJ2cnKTtcblxuICB2YXIgZXNjYXBlRXhwciA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIGlmIChzdHJpbmcgPT0gbnVsbCkgcmV0dXJuICcnO1xuICAgIHJldHVybiAoJycgKyBzdHJpbmcpLnJlcGxhY2UoZW50aXR5UmUsIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICByZXR1cm4gaHRtbEVudGl0aWVzW21hdGNoXTtcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgY291bnRlciA9IDA7XG5cbiAgLy8gSmF2YVNjcmlwdCBtaWNyby10ZW1wbGF0aW5nLCBzaW1pbGFyIHRvIEpvaG4gUmVzaWcncyBpbXBsZW1lbnRhdGlvbi5cbiAgLy8gVW5kZXJzY29yZSB0ZW1wbGF0aW5nIGhhbmRsZXMgYXJiaXRyYXJ5IGRlbGltaXRlcnMsIHByZXNlcnZlcyB3aGl0ZXNwYWNlLFxuICAvLyBhbmQgY29ycmVjdGx5IGVzY2FwZXMgcXVvdGVzIHdpdGhpbiBpbnRlcnBvbGF0ZWQgY29kZS5cbiAgdmFyIHRtcGwgPSBmdW5jdGlvbih0ZXh0LCBkYXRhKSB7XG4gICAgdmFyIHJlbmRlcjtcblxuICAgIC8vIENvbWJpbmUgZGVsaW1pdGVycyBpbnRvIG9uZSByZWd1bGFyIGV4cHJlc3Npb24gdmlhIGFsdGVybmF0aW9uLlxuICAgIHZhciBtYXRjaGVyID0gbmV3IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldClcbiAgICAgICAgLnJlcGxhY2UoZXNjYXBlciwgZnVuY3Rpb24obWF0Y2gpIHsgcmV0dXJuICdcXFxcJyArIGVzY2FwZXNbbWF0Y2hdOyB9KTtcblxuICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGVzY2FwZSArIFwiKSk9PW51bGw/Jyc6ZXNjYXBlRXhwcihfX3QpKStcXG4nXCI7XG4gICAgICB9XG4gICAgICBpZiAoaW50ZXJwb2xhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBpbnRlcnBvbGF0ZSArIFwiKSk9PW51bGw/Jyc6X190KStcXG4nXCI7XG4gICAgICB9XG4gICAgICBpZiAoZXZhbHVhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJztcXG5cIiArIGV2YWx1YXRlICsgXCJcXG5fX3ArPSdcIjtcbiAgICAgIH1cbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuICAgIHNvdXJjZSArPSBcIic7XFxuXCI7XG5cbiAgICAvLyBJZiBhIHZhcmlhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIHBsYWNlIGRhdGEgdmFsdWVzIGluIGxvY2FsIHNjb3BlLlxuICAgIGlmICghc2V0dGluZ3MudmFyaWFibGUpIHNvdXJjZSA9ICd3aXRoKG9ianx8e30pe1xcbicgKyBzb3VyY2UgKyAnfVxcbic7XG5cbiAgICBzb3VyY2UgPSBcInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIiArXG4gICAgICBcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIgK1xuICAgICAgc291cmNlICsgXCJyZXR1cm4gX19wO1xcbi8vIyBzb3VyY2VVUkw9L21pY3JvdGVtcGxhdGVzL3NvdXJjZVtcIiArIGNvdW50ZXIrKyArIFwiXVwiO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlbmRlciA9IG5ldyBGdW5jdGlvbihzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJywgJ2VzY2FwZUV4cHInLCBzb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUuc291cmNlID0gc291cmNlO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSkgcmV0dXJuIHJlbmRlcihkYXRhLCBlc2NhcGVFeHByKTtcbiAgICB2YXIgdGVtcGxhdGUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVuZGVyLmNhbGwodGhpcywgZGF0YSwgZXNjYXBlRXhwcik7XG4gICAgfTtcblxuICAgIC8vIFByb3ZpZGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uIHNvdXJjZSBhcyBhIGNvbnZlbmllbmNlIGZvciBwcmVjb21waWxhdGlvbi5cbiAgICB0ZW1wbGF0ZS5zb3VyY2UgPSAnZnVuY3Rpb24oJyArIChzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJykgKyAnKXtcXG4nICsgc291cmNlICsgJ30nO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9O1xuICB0bXBsLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0bXBsO1xuICAgIH0pOyAvLyBSZXF1aXJlSlNcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gdG1wbDsgLy8gQ29tbW9uSlNcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWxzLm1pY3JvdGVtcGxhdGUgPSB0bXBsOyAvLyA8c2NyaXB0PlxuICB9XG59KSh0aGlzKTtcbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciBVSU9iamVjdCA9IHJlcXVpcmUoJy4vdWlfb2JqZWN0JylcbnZhciBleHRlbmQgPSByZXF1aXJlKCcuL3V0aWxzJykuZXh0ZW5kXG5cbmNsYXNzIFVJQ29udGFpbmVyUGx1Z2luIGV4dGVuZHMgVUlPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgICAgIHRoaXMuJGVsLnNob3coKVxuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5zdG9wTGlzdGVuaW5nKClcbiAgICB0aGlzLiRlbC5oaWRlKClcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZSgpXG4gIH1cbn1cblxuVUlDb250YWluZXJQbHVnaW4uZXh0ZW5kID0gZnVuY3Rpb24ocHJvcGVydGllcykge1xuICByZXR1cm4gZXh0ZW5kKFVJQ29udGFpbmVyUGx1Z2luLCBwcm9wZXJ0aWVzKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVJQ29udGFpbmVyUGx1Z2luXG4iLCJ2YXIgVUlPYmplY3QgPSByZXF1aXJlKCcuL3VpX29iamVjdCcpXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscycpLmV4dGVuZFxuXG5jbGFzcyBVSUNvcmVQbHVnaW4gZXh0ZW5kcyBVSU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKGNvcmUpIHtcbiAgICBzdXBlcihjb3JlKVxuICAgIHRoaXMuY29yZSA9IGNvcmVcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgdGhpcy5iaW5kRXZlbnRzKClcbiAgICB0aGlzLnJlbmRlcigpXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge31cblxuICBnZXRFeHRlcm5hbEludGVyZmFjZSgpIHsgcmV0dXJuIHt9IH1cblxuICBlbmFibGUoKSB7XG4gICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuYmluZEV2ZW50cygpXG4gICAgICB0aGlzLiRlbC5zaG93KClcbiAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMuc3RvcExpc3RlbmluZygpXG4gICAgdGhpcy4kZWwuaGlkZSgpXG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2VcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW1vdmUoKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSgpKVxuICAgIHRoaXMuJGVsLmFwcGVuZCh0aGlzLnN0eWxlci5nZXRTdHlsZUZvcih0aGlzLm5hbWUpKVxuICAgIHRoaXMuY29yZS4kZWwuYXBwZW5kKHRoaXMuZWwpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5VSUNvcmVQbHVnaW4uZXh0ZW5kID0gZnVuY3Rpb24ocHJvcGVydGllcykge1xuICByZXR1cm4gZXh0ZW5kKFVJQ29yZVBsdWdpbiwgcHJvcGVydGllcylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVSUNvcmVQbHVnaW5cbiIsIi8vIENvcHlyaWdodCAyMDE0IEdsb2JvLmNvbSBQbGF5ZXIgYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlXG4vLyBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUuXG5cbnZhciAkID0gcmVxdWlyZSgnY2xhcHByLXplcHRvJylcbnZhciB1bmlxdWVJZCA9IHJlcXVpcmUoJy4vdXRpbHMnKS51bmlxdWVJZFxudmFyIHJlc3VsdCA9IHJlcXVpcmUoJ2xvZGFzaC5yZXN1bHQnKVxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2xvZGFzaC5hc3NpZ24nKVxudmFyIEJhc2VPYmplY3QgPSByZXF1aXJlKCcuL2Jhc2Vfb2JqZWN0JylcblxudmFyIGRlbGVnYXRlRXZlbnRTcGxpdHRlciA9IC9eKFxcUyspXFxzKiguKikkL1xuXG5jbGFzcyBVSU9iamVjdCBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ2RpdicgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuY2lkID0gdW5pcXVlSWQoJ2MnKTtcbiAgICB0aGlzLl9lbnN1cmVFbGVtZW50KCk7XG4gICAgdGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuICB9XG5cbiAgJChzZWxlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLiRlbC5maW5kKHNlbGVjdG9yKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlKClcbiAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXRFbGVtZW50KGVsZW1lbnQsIGRlbGVnYXRlKSB7XG4gICAgaWYgKHRoaXMuJGVsKSB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKVxuICAgIHRoaXMuJGVsID0gZWxlbWVudCBpbnN0YW5jZW9mICQgPyBlbGVtZW50IDogJChlbGVtZW50KVxuICAgIHRoaXMuZWwgPSB0aGlzLiRlbFswXVxuICAgIGlmIChkZWxlZ2F0ZSAhPT0gZmFsc2UpIHRoaXMuZGVsZWdhdGVFdmVudHMoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBkZWxlZ2F0ZUV2ZW50cyhldmVudHMpIHtcbiAgICBpZiAoIShldmVudHMgfHwgKGV2ZW50cyA9IHJlc3VsdCh0aGlzLCAnZXZlbnRzJykpKSkgcmV0dXJuIHRoaXNcbiAgICB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKVxuICAgIGZvciAodmFyIGtleSBpbiBldmVudHMpIHtcbiAgICAgIHZhciBtZXRob2QgPSBldmVudHNba2V5XVxuICAgICAgaWYgKChtZXRob2QgJiYgbWV0aG9kLmNvbnN0cnVjdG9yICE9PSBGdW5jdGlvbikpIG1ldGhvZCA9IHRoaXNbZXZlbnRzW2tleV1dXG4gICAgICBpZiAoIW1ldGhvZCkgY29udGludWVcblxuICAgICAgdmFyIG1hdGNoID0ga2V5Lm1hdGNoKGRlbGVnYXRlRXZlbnRTcGxpdHRlcilcbiAgICAgIHZhciBldmVudE5hbWUgPSBtYXRjaFsxXSwgc2VsZWN0b3IgPSBtYXRjaFsyXVxuICAgICAgLy9tZXRob2QgPSBfLmJpbmQobWV0aG9kLCB0aGlzKVxuICAgICAgZXZlbnROYW1lICs9ICcuZGVsZWdhdGVFdmVudHMnICsgdGhpcy5jaWRcbiAgICAgIGlmIChzZWxlY3RvciA9PT0gJycpIHtcbiAgICAgICAgdGhpcy4kZWwub24oZXZlbnROYW1lLCBtZXRob2QuYmluZCh0aGlzKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsLm9uKGV2ZW50TmFtZSwgc2VsZWN0b3IsIG1ldGhvZC5iaW5kKHRoaXMpKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdW5kZWxlZ2F0ZUV2ZW50cygpIHtcbiAgICB0aGlzLiRlbC5vZmYoJy5kZWxlZ2F0ZUV2ZW50cycgKyB0aGlzLmNpZClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgX2Vuc3VyZUVsZW1lbnQoKSB7XG4gICAgaWYgKCF0aGlzLmVsKSB7XG4gICAgICB2YXIgYXR0cnMgPSBhc3NpZ24oe30sIHJlc3VsdCh0aGlzLCAnYXR0cmlidXRlcycpKVxuICAgICAgaWYgKHRoaXMuaWQpIGF0dHJzLmlkID0gcmVzdWx0KHRoaXMsICdpZCcpXG4gICAgICBpZiAodGhpcy5jbGFzc05hbWUpIGF0dHJzWydjbGFzcyddID0gcmVzdWx0KHRoaXMsICdjbGFzc05hbWUnKVxuICAgICAgdmFyICRlbCA9ICQoJzwnICsgcmVzdWx0KHRoaXMsICd0YWdOYW1lJykgKyAnPicpLmF0dHIoYXR0cnMpXG4gICAgICB0aGlzLnNldEVsZW1lbnQoJGVsLCBmYWxzZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRFbGVtZW50KHJlc3VsdCh0aGlzLCAnZWwnKSwgZmFsc2UpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVUlPYmplY3RcbiIsIi8qIFplcHRvIHYxLjEuNC04MC1nYTkxODRiMiAtIHplcHRvIGV2ZW50IGFqYXggY2FsbGJhY2tzIGRlZmVycmVkIHRvdWNoIHNlbGVjdG9yIGllIC0gemVwdG9qcy5jb20vbGljZW5zZSAqL1xudmFyIFplcHRvPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gRCh0KXtyZXR1cm4gbnVsbD09dD9TdHJpbmcodCk6altTLmNhbGwodCldfHxcIm9iamVjdFwifWZ1bmN0aW9uIEwodCl7cmV0dXJuXCJmdW5jdGlvblwiPT1EKHQpfWZ1bmN0aW9uIGsodCl7cmV0dXJuIG51bGwhPXQmJnQ9PXQud2luZG93fWZ1bmN0aW9uIFoodCl7cmV0dXJuIG51bGwhPXQmJnQubm9kZVR5cGU9PXQuRE9DVU1FTlRfTk9ERX1mdW5jdGlvbiAkKHQpe3JldHVyblwib2JqZWN0XCI9PUQodCl9ZnVuY3Rpb24gRih0KXtyZXR1cm4gJCh0KSYmIWsodCkmJk9iamVjdC5nZXRQcm90b3R5cGVPZih0KT09T2JqZWN0LnByb3RvdHlwZX1mdW5jdGlvbiBSKHQpe3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiB0Lmxlbmd0aH1mdW5jdGlvbiBxKHQpe3JldHVybiBzLmNhbGwodCxmdW5jdGlvbih0KXtyZXR1cm4gbnVsbCE9dH0pfWZ1bmN0aW9uIFcodCl7cmV0dXJuIHQubGVuZ3RoPjA/bi5mbi5jb25jYXQuYXBwbHkoW10sdCk6dH1mdW5jdGlvbiB6KHQpe3JldHVybiB0LnJlcGxhY2UoLzo6L2csXCIvXCIpLnJlcGxhY2UoLyhbQS1aXSspKFtBLVpdW2Etel0pL2csXCIkMV8kMlwiKS5yZXBsYWNlKC8oW2EtelxcZF0pKFtBLVpdKS9nLFwiJDFfJDJcIikucmVwbGFjZSgvXy9nLFwiLVwiKS50b0xvd2VyQ2FzZSgpfWZ1bmN0aW9uIEgodCl7cmV0dXJuIHQgaW4gYz9jW3RdOmNbdF09bmV3IFJlZ0V4cChcIihefFxcXFxzKVwiK3QrXCIoXFxcXHN8JClcIil9ZnVuY3Rpb24gXyh0LGUpe3JldHVyblwibnVtYmVyXCIhPXR5cGVvZiBlfHxsW3oodCldP2U6ZStcInB4XCJ9ZnVuY3Rpb24gSSh0KXt2YXIgZSxuO3JldHVybiBmW3RdfHwoZT11LmNyZWF0ZUVsZW1lbnQodCksdS5ib2R5LmFwcGVuZENoaWxkKGUpLG49Z2V0Q29tcHV0ZWRTdHlsZShlLFwiXCIpLmdldFByb3BlcnR5VmFsdWUoXCJkaXNwbGF5XCIpLGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlKSxcIm5vbmVcIj09biYmKG49XCJibG9ja1wiKSxmW3RdPW4pLGZbdF19ZnVuY3Rpb24gVSh0KXtyZXR1cm5cImNoaWxkcmVuXCJpbiB0P2EuY2FsbCh0LmNoaWxkcmVuKTpuLm1hcCh0LmNoaWxkTm9kZXMsZnVuY3Rpb24odCl7cmV0dXJuIDE9PXQubm9kZVR5cGU/dDp2b2lkIDB9KX1mdW5jdGlvbiBYKHQsZSl7dmFyIG4saT10P3QubGVuZ3RoOjA7Zm9yKG49MDtpPm47bisrKXRoaXNbbl09dFtuXTt0aGlzLmxlbmd0aD1pLHRoaXMuc2VsZWN0b3I9ZXx8XCJcIn1mdW5jdGlvbiBCKG4saSxyKXtmb3IoZSBpbiBpKXImJihGKGlbZV0pfHxBKGlbZV0pKT8oRihpW2VdKSYmIUYobltlXSkmJihuW2VdPXt9KSxBKGlbZV0pJiYhQShuW2VdKSYmKG5bZV09W10pLEIobltlXSxpW2VdLHIpKTppW2VdIT09dCYmKG5bZV09aVtlXSl9ZnVuY3Rpb24gVih0LGUpe3JldHVybiBudWxsPT1lP24odCk6bih0KS5maWx0ZXIoZSl9ZnVuY3Rpb24gWSh0LGUsbixpKXtyZXR1cm4gTChlKT9lLmNhbGwodCxuLGkpOmV9ZnVuY3Rpb24gSih0LGUsbil7bnVsbD09bj90LnJlbW92ZUF0dHJpYnV0ZShlKTp0LnNldEF0dHJpYnV0ZShlLG4pfWZ1bmN0aW9uIEcoZSxuKXt2YXIgaT1lLmNsYXNzTmFtZXx8XCJcIixyPWkmJmkuYmFzZVZhbCE9PXQ7cmV0dXJuIG49PT10P3I/aS5iYXNlVmFsOmk6dm9pZChyP2kuYmFzZVZhbD1uOmUuY2xhc3NOYW1lPW4pfWZ1bmN0aW9uIEsodCl7dHJ5e3JldHVybiB0P1widHJ1ZVwiPT10fHwoXCJmYWxzZVwiPT10PyExOlwibnVsbFwiPT10P251bGw6K3QrXCJcIj09dD8rdDovXltcXFtcXHtdLy50ZXN0KHQpP24ucGFyc2VKU09OKHQpOnQpOnR9Y2F0Y2goZSl7cmV0dXJuIHR9fWZ1bmN0aW9uIFEodCxlKXtlKHQpO2Zvcih2YXIgbj0wLGk9dC5jaGlsZE5vZGVzLmxlbmd0aDtpPm47bisrKVEodC5jaGlsZE5vZGVzW25dLGUpfXZhciB0LGUsbixpLE4sUCxyPVtdLG89ci5jb25jYXQscz1yLmZpbHRlcixhPXIuc2xpY2UsdT13aW5kb3cuZG9jdW1lbnQsZj17fSxjPXt9LGw9e1wiY29sdW1uLWNvdW50XCI6MSxjb2x1bW5zOjEsXCJmb250LXdlaWdodFwiOjEsXCJsaW5lLWhlaWdodFwiOjEsb3BhY2l0eToxLFwiei1pbmRleFwiOjEsem9vbToxfSxoPS9eXFxzKjwoXFx3K3whKVtePl0qPi8scD0vXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8sZD0vPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbXFx3Ol0rKVtePl0qKVxcLz4vZ2ksbT0vXig/OmJvZHl8aHRtbCkkL2ksZz0vKFtBLVpdKS9nLHY9W1widmFsXCIsXCJjc3NcIixcImh0bWxcIixcInRleHRcIixcImRhdGFcIixcIndpZHRoXCIsXCJoZWlnaHRcIixcIm9mZnNldFwiXSx5PVtcImFmdGVyXCIsXCJwcmVwZW5kXCIsXCJiZWZvcmVcIixcImFwcGVuZFwiXSx3PXUuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpLHg9dS5jcmVhdGVFbGVtZW50KFwidHJcIiksYj17dHI6dS5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiksdGJvZHk6dyx0aGVhZDp3LHRmb290OncsdGQ6eCx0aDp4LFwiKlwiOnUuY3JlYXRlRWxlbWVudChcImRpdlwiKX0sRT0vY29tcGxldGV8bG9hZGVkfGludGVyYWN0aXZlLyxUPS9eW1xcdy1dKiQvLGo9e30sUz1qLnRvU3RyaW5nLEM9e30sTz11LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksTT17dGFiaW5kZXg6XCJ0YWJJbmRleFwiLHJlYWRvbmx5OlwicmVhZE9ubHlcIixcImZvclwiOlwiaHRtbEZvclwiLFwiY2xhc3NcIjpcImNsYXNzTmFtZVwiLG1heGxlbmd0aDpcIm1heExlbmd0aFwiLGNlbGxzcGFjaW5nOlwiY2VsbFNwYWNpbmdcIixjZWxscGFkZGluZzpcImNlbGxQYWRkaW5nXCIscm93c3BhbjpcInJvd1NwYW5cIixjb2xzcGFuOlwiY29sU3BhblwiLHVzZW1hcDpcInVzZU1hcFwiLGZyYW1lYm9yZGVyOlwiZnJhbWVCb3JkZXJcIixjb250ZW50ZWRpdGFibGU6XCJjb250ZW50RWRpdGFibGVcIn0sQT1BcnJheS5pc0FycmF5fHxmdW5jdGlvbih0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIEFycmF5fTtyZXR1cm4gQy5tYXRjaGVzPWZ1bmN0aW9uKHQsZSl7aWYoIWV8fCF0fHwxIT09dC5ub2RlVHlwZSlyZXR1cm4hMTt2YXIgbj10LndlYmtpdE1hdGNoZXNTZWxlY3Rvcnx8dC5tb3pNYXRjaGVzU2VsZWN0b3J8fHQub01hdGNoZXNTZWxlY3Rvcnx8dC5tYXRjaGVzU2VsZWN0b3I7aWYobilyZXR1cm4gbi5jYWxsKHQsZSk7dmFyIGkscj10LnBhcmVudE5vZGUsbz0hcjtyZXR1cm4gbyYmKHI9TykuYXBwZW5kQ2hpbGQodCksaT1+Qy5xc2EocixlKS5pbmRleE9mKHQpLG8mJk8ucmVtb3ZlQ2hpbGQodCksaX0sTj1mdW5jdGlvbih0KXtyZXR1cm4gdC5yZXBsYWNlKC8tKyguKT8vZyxmdW5jdGlvbih0LGUpe3JldHVybiBlP2UudG9VcHBlckNhc2UoKTpcIlwifSl9LFA9ZnVuY3Rpb24odCl7cmV0dXJuIHMuY2FsbCh0LGZ1bmN0aW9uKGUsbil7cmV0dXJuIHQuaW5kZXhPZihlKT09bn0pfSxDLmZyYWdtZW50PWZ1bmN0aW9uKGUsaSxyKXt2YXIgbyxzLGY7cmV0dXJuIHAudGVzdChlKSYmKG89bih1LmNyZWF0ZUVsZW1lbnQoUmVnRXhwLiQxKSkpLG98fChlLnJlcGxhY2UmJihlPWUucmVwbGFjZShkLFwiPCQxPjwvJDI+XCIpKSxpPT09dCYmKGk9aC50ZXN0KGUpJiZSZWdFeHAuJDEpLGkgaW4gYnx8KGk9XCIqXCIpLGY9YltpXSxmLmlubmVySFRNTD1cIlwiK2Usbz1uLmVhY2goYS5jYWxsKGYuY2hpbGROb2RlcyksZnVuY3Rpb24oKXtmLnJlbW92ZUNoaWxkKHRoaXMpfSkpLEYocikmJihzPW4obyksbi5lYWNoKHIsZnVuY3Rpb24odCxlKXt2LmluZGV4T2YodCk+LTE/c1t0XShlKTpzLmF0dHIodCxlKX0pKSxvfSxDLlo9ZnVuY3Rpb24odCxlKXtyZXR1cm4gbmV3IFgodCxlKX0sQy5pc1o9ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBDLlp9LEMuaW5pdD1mdW5jdGlvbihlLGkpe3ZhciByO2lmKCFlKXJldHVybiBDLlooKTtpZihcInN0cmluZ1wiPT10eXBlb2YgZSlpZihlPWUudHJpbSgpLFwiPFwiPT1lWzBdJiZoLnRlc3QoZSkpcj1DLmZyYWdtZW50KGUsUmVnRXhwLiQxLGkpLGU9bnVsbDtlbHNle2lmKGkhPT10KXJldHVybiBuKGkpLmZpbmQoZSk7cj1DLnFzYSh1LGUpfWVsc2V7aWYoTChlKSlyZXR1cm4gbih1KS5yZWFkeShlKTtpZihDLmlzWihlKSlyZXR1cm4gZTtpZihBKGUpKXI9cShlKTtlbHNlIGlmKCQoZSkpcj1bZV0sZT1udWxsO2Vsc2UgaWYoaC50ZXN0KGUpKXI9Qy5mcmFnbWVudChlLnRyaW0oKSxSZWdFeHAuJDEsaSksZT1udWxsO2Vsc2V7aWYoaSE9PXQpcmV0dXJuIG4oaSkuZmluZChlKTtyPUMucXNhKHUsZSl9fXJldHVybiBDLloocixlKX0sbj1mdW5jdGlvbih0LGUpe3JldHVybiBDLmluaXQodCxlKX0sbi5leHRlbmQ9ZnVuY3Rpb24odCl7dmFyIGUsbj1hLmNhbGwoYXJndW1lbnRzLDEpO3JldHVyblwiYm9vbGVhblwiPT10eXBlb2YgdCYmKGU9dCx0PW4uc2hpZnQoKSksbi5mb3JFYWNoKGZ1bmN0aW9uKG4pe0IodCxuLGUpfSksdH0sQy5xc2E9ZnVuY3Rpb24odCxlKXt2YXIgbixpPVwiI1wiPT1lWzBdLHI9IWkmJlwiLlwiPT1lWzBdLG89aXx8cj9lLnNsaWNlKDEpOmUscz1ULnRlc3Qobyk7cmV0dXJuIHQuZ2V0RWxlbWVudEJ5SWQmJnMmJmk/KG49dC5nZXRFbGVtZW50QnlJZChvKSk/W25dOltdOjEhPT10Lm5vZGVUeXBlJiY5IT09dC5ub2RlVHlwZSYmMTEhPT10Lm5vZGVUeXBlP1tdOmEuY2FsbChzJiYhaSYmdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lP3I/dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG8pOnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSk6dC5xdWVyeVNlbGVjdG9yQWxsKGUpKX0sbi5jb250YWlucz11LmRvY3VtZW50RWxlbWVudC5jb250YWlucz9mdW5jdGlvbih0LGUpe3JldHVybiB0IT09ZSYmdC5jb250YWlucyhlKX06ZnVuY3Rpb24odCxlKXtmb3IoO2UmJihlPWUucGFyZW50Tm9kZSk7KWlmKGU9PT10KXJldHVybiEwO3JldHVybiExfSxuLnR5cGU9RCxuLmlzRnVuY3Rpb249TCxuLmlzV2luZG93PWssbi5pc0FycmF5PUEsbi5pc1BsYWluT2JqZWN0PUYsbi5pc0VtcHR5T2JqZWN0PWZ1bmN0aW9uKHQpe3ZhciBlO2ZvcihlIGluIHQpcmV0dXJuITE7cmV0dXJuITB9LG4uaW5BcnJheT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHIuaW5kZXhPZi5jYWxsKGUsdCxuKX0sbi5jYW1lbENhc2U9TixuLnRyaW09ZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXQ/XCJcIjpTdHJpbmcucHJvdG90eXBlLnRyaW0uY2FsbCh0KX0sbi51dWlkPTAsbi5zdXBwb3J0PXt9LG4uZXhwcj17fSxuLm5vb3A9ZnVuY3Rpb24oKXt9LG4ubWFwPWZ1bmN0aW9uKHQsZSl7dmFyIG4scixvLGk9W107aWYoUih0KSlmb3Iocj0wO3I8dC5sZW5ndGg7cisrKW49ZSh0W3JdLHIpLG51bGwhPW4mJmkucHVzaChuKTtlbHNlIGZvcihvIGluIHQpbj1lKHRbb10sbyksbnVsbCE9biYmaS5wdXNoKG4pO3JldHVybiBXKGkpfSxuLmVhY2g9ZnVuY3Rpb24odCxlKXt2YXIgbixpO2lmKFIodCkpe2ZvcihuPTA7bjx0Lmxlbmd0aDtuKyspaWYoZS5jYWxsKHRbbl0sbix0W25dKT09PSExKXJldHVybiB0fWVsc2UgZm9yKGkgaW4gdClpZihlLmNhbGwodFtpXSxpLHRbaV0pPT09ITEpcmV0dXJuIHQ7cmV0dXJuIHR9LG4uZ3JlcD1mdW5jdGlvbih0LGUpe3JldHVybiBzLmNhbGwodCxlKX0sd2luZG93LkpTT04mJihuLnBhcnNlSlNPTj1KU09OLnBhcnNlKSxuLmVhY2goXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yXCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKHQsZSl7altcIltvYmplY3QgXCIrZStcIl1cIl09ZS50b0xvd2VyQ2FzZSgpfSksbi5mbj17Y29uc3RydWN0b3I6Qy5aLGxlbmd0aDowLGZvckVhY2g6ci5mb3JFYWNoLHJlZHVjZTpyLnJlZHVjZSxwdXNoOnIucHVzaCxzb3J0OnIuc29ydCxzcGxpY2U6ci5zcGxpY2UsaW5kZXhPZjpyLmluZGV4T2YsY29uY2F0OmZ1bmN0aW9uKCl7dmFyIHQsZSxuPVtdO2Zvcih0PTA7dDxhcmd1bWVudHMubGVuZ3RoO3QrKyllPWFyZ3VtZW50c1t0XSxuW3RdPUMuaXNaKGUpP2UudG9BcnJheSgpOmU7cmV0dXJuIG8uYXBwbHkoQy5pc1oodGhpcyk/dGhpcy50b0FycmF5KCk6dGhpcyxuKX0sbWFwOmZ1bmN0aW9uKHQpe3JldHVybiBuKG4ubWFwKHRoaXMsZnVuY3Rpb24oZSxuKXtyZXR1cm4gdC5jYWxsKGUsbixlKX0pKX0sc2xpY2U6ZnVuY3Rpb24oKXtyZXR1cm4gbihhLmFwcGx5KHRoaXMsYXJndW1lbnRzKSl9LHJlYWR5OmZ1bmN0aW9uKHQpe3JldHVybiBFLnRlc3QodS5yZWFkeVN0YXRlKSYmdS5ib2R5P3Qobik6dS5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKCl7dChuKX0sITEpLHRoaXN9LGdldDpmdW5jdGlvbihlKXtyZXR1cm4gZT09PXQ/YS5jYWxsKHRoaXMpOnRoaXNbZT49MD9lOmUrdGhpcy5sZW5ndGhdfSx0b0FycmF5OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KCl9LHNpemU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sZW5ndGh9LHJlbW92ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtudWxsIT10aGlzLnBhcmVudE5vZGUmJnRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKX0pfSxlYWNoOmZ1bmN0aW9uKHQpe3JldHVybiByLmV2ZXJ5LmNhbGwodGhpcyxmdW5jdGlvbihlLG4pe3JldHVybiB0LmNhbGwoZSxuLGUpIT09ITF9KSx0aGlzfSxmaWx0ZXI6ZnVuY3Rpb24odCl7cmV0dXJuIEwodCk/dGhpcy5ub3QodGhpcy5ub3QodCkpOm4ocy5jYWxsKHRoaXMsZnVuY3Rpb24oZSl7cmV0dXJuIEMubWF0Y2hlcyhlLHQpfSkpfSxhZGQ6ZnVuY3Rpb24odCxlKXtyZXR1cm4gbihQKHRoaXMuY29uY2F0KG4odCxlKSkpKX0saXM6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMubGVuZ3RoPjAmJkMubWF0Y2hlcyh0aGlzWzBdLHQpfSxub3Q6ZnVuY3Rpb24oZSl7dmFyIGk9W107aWYoTChlKSYmZS5jYWxsIT09dCl0aGlzLmVhY2goZnVuY3Rpb24odCl7ZS5jYWxsKHRoaXMsdCl8fGkucHVzaCh0aGlzKX0pO2Vsc2V7dmFyIHI9XCJzdHJpbmdcIj09dHlwZW9mIGU/dGhpcy5maWx0ZXIoZSk6UihlKSYmTChlLml0ZW0pP2EuY2FsbChlKTpuKGUpO3RoaXMuZm9yRWFjaChmdW5jdGlvbih0KXtyLmluZGV4T2YodCk8MCYmaS5wdXNoKHQpfSl9cmV0dXJuIG4oaSl9LGhhczpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oKXtyZXR1cm4gJCh0KT9uLmNvbnRhaW5zKHRoaXMsdCk6bih0aGlzKS5maW5kKHQpLnNpemUoKX0pfSxlcTpmdW5jdGlvbih0KXtyZXR1cm4tMT09PXQ/dGhpcy5zbGljZSh0KTp0aGlzLnNsaWNlKHQsK3QrMSl9LGZpcnN0OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpc1swXTtyZXR1cm4gdCYmISQodCk/dDpuKHQpfSxsYXN0OmZ1bmN0aW9uKCl7dmFyIHQ9dGhpc1t0aGlzLmxlbmd0aC0xXTtyZXR1cm4gdCYmISQodCk/dDpuKHQpfSxmaW5kOmZ1bmN0aW9uKHQpe3ZhciBlLGk9dGhpcztyZXR1cm4gZT10P1wib2JqZWN0XCI9PXR5cGVvZiB0P24odCkuZmlsdGVyKGZ1bmN0aW9uKCl7dmFyIHQ9dGhpcztyZXR1cm4gci5zb21lLmNhbGwoaSxmdW5jdGlvbihlKXtyZXR1cm4gbi5jb250YWlucyhlLHQpfSl9KToxPT10aGlzLmxlbmd0aD9uKEMucXNhKHRoaXNbMF0sdCkpOnRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIEMucXNhKHRoaXMsdCl9KTpuKCl9LGNsb3Nlc3Q6ZnVuY3Rpb24odCxlKXt2YXIgaT10aGlzWzBdLHI9ITE7Zm9yKFwib2JqZWN0XCI9PXR5cGVvZiB0JiYocj1uKHQpKTtpJiYhKHI/ci5pbmRleE9mKGkpPj0wOkMubWF0Y2hlcyhpLHQpKTspaT1pIT09ZSYmIVooaSkmJmkucGFyZW50Tm9kZTtyZXR1cm4gbihpKX0scGFyZW50czpmdW5jdGlvbih0KXtmb3IodmFyIGU9W10saT10aGlzO2kubGVuZ3RoPjA7KWk9bi5tYXAoaSxmdW5jdGlvbih0KXtyZXR1cm4odD10LnBhcmVudE5vZGUpJiYhWih0KSYmZS5pbmRleE9mKHQpPDA/KGUucHVzaCh0KSx0KTp2b2lkIDB9KTtyZXR1cm4gVihlLHQpfSxwYXJlbnQ6ZnVuY3Rpb24odCl7cmV0dXJuIFYoUCh0aGlzLnBsdWNrKFwicGFyZW50Tm9kZVwiKSksdCl9LGNoaWxkcmVuOmZ1bmN0aW9uKHQpe3JldHVybiBWKHRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIFUodGhpcyl9KSx0KX0sY29udGVudHM6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZW50RG9jdW1lbnR8fGEuY2FsbCh0aGlzLmNoaWxkTm9kZXMpfSl9LHNpYmxpbmdzOmZ1bmN0aW9uKHQpe3JldHVybiBWKHRoaXMubWFwKGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHMuY2FsbChVKGUucGFyZW50Tm9kZSksZnVuY3Rpb24odCl7cmV0dXJuIHQhPT1lfSl9KSx0KX0sZW1wdHk6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dGhpcy5pbm5lckhUTUw9XCJcIn0pfSxwbHVjazpmdW5jdGlvbih0KXtyZXR1cm4gbi5tYXAodGhpcyxmdW5jdGlvbihlKXtyZXR1cm4gZVt0XX0pfSxzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1wibm9uZVwiPT10aGlzLnN0eWxlLmRpc3BsYXkmJih0aGlzLnN0eWxlLmRpc3BsYXk9XCJcIiksXCJub25lXCI9PWdldENvbXB1dGVkU3R5bGUodGhpcyxcIlwiKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZGlzcGxheVwiKSYmKHRoaXMuc3R5bGUuZGlzcGxheT1JKHRoaXMubm9kZU5hbWUpKX0pfSxyZXBsYWNlV2l0aDpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5iZWZvcmUodCkucmVtb3ZlKCl9LHdyYXA6ZnVuY3Rpb24odCl7dmFyIGU9TCh0KTtpZih0aGlzWzBdJiYhZSl2YXIgaT1uKHQpLmdldCgwKSxyPWkucGFyZW50Tm9kZXx8dGhpcy5sZW5ndGg+MTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKG8pe24odGhpcykud3JhcEFsbChlP3QuY2FsbCh0aGlzLG8pOnI/aS5jbG9uZU5vZGUoITApOmkpfSl9LHdyYXBBbGw6ZnVuY3Rpb24odCl7aWYodGhpc1swXSl7bih0aGlzWzBdKS5iZWZvcmUodD1uKHQpKTtmb3IodmFyIGU7KGU9dC5jaGlsZHJlbigpKS5sZW5ndGg7KXQ9ZS5maXJzdCgpO24odCkuYXBwZW5kKHRoaXMpfXJldHVybiB0aGlzfSx3cmFwSW5uZXI6ZnVuY3Rpb24odCl7dmFyIGU9TCh0KTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGkpe3ZhciByPW4odGhpcyksbz1yLmNvbnRlbnRzKCkscz1lP3QuY2FsbCh0aGlzLGkpOnQ7by5sZW5ndGg/by53cmFwQWxsKHMpOnIuYXBwZW5kKHMpfSl9LHVud3JhcDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnBhcmVudCgpLmVhY2goZnVuY3Rpb24oKXtuKHRoaXMpLnJlcGxhY2VXaXRoKG4odGhpcykuY2hpbGRyZW4oKSl9KSx0aGlzfSxjbG9uZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiB0aGlzLmNsb25lTm9kZSghMCl9KX0saGlkZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIil9LHRvZ2dsZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGk9bih0aGlzKTsoZT09PXQ/XCJub25lXCI9PWkuY3NzKFwiZGlzcGxheVwiKTplKT9pLnNob3coKTppLmhpZGUoKX0pfSxwcmV2OmZ1bmN0aW9uKHQpe3JldHVybiBuKHRoaXMucGx1Y2soXCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nXCIpKS5maWx0ZXIodHx8XCIqXCIpfSxuZXh0OmZ1bmN0aW9uKHQpe3JldHVybiBuKHRoaXMucGx1Y2soXCJuZXh0RWxlbWVudFNpYmxpbmdcIikpLmZpbHRlcih0fHxcIipcIil9LGh0bWw6ZnVuY3Rpb24odCl7cmV0dXJuIDAgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihlKXt2YXIgaT10aGlzLmlubmVySFRNTDtuKHRoaXMpLmVtcHR5KCkuYXBwZW5kKFkodGhpcyx0LGUsaSkpfSk6MCBpbiB0aGlzP3RoaXNbMF0uaW5uZXJIVE1MOm51bGx9LHRleHQ6ZnVuY3Rpb24odCl7cmV0dXJuIDAgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihlKXt2YXIgbj1ZKHRoaXMsdCxlLHRoaXMudGV4dENvbnRlbnQpO3RoaXMudGV4dENvbnRlbnQ9bnVsbD09bj9cIlwiOlwiXCIrbn0pOjAgaW4gdGhpcz90aGlzWzBdLnRleHRDb250ZW50Om51bGx9LGF0dHI6ZnVuY3Rpb24obixpKXt2YXIgcjtyZXR1cm5cInN0cmluZ1wiIT10eXBlb2Ygbnx8MSBpbiBhcmd1bWVudHM/dGhpcy5lYWNoKGZ1bmN0aW9uKHQpe2lmKDE9PT10aGlzLm5vZGVUeXBlKWlmKCQobikpZm9yKGUgaW4gbilKKHRoaXMsZSxuW2VdKTtlbHNlIEoodGhpcyxuLFkodGhpcyxpLHQsdGhpcy5nZXRBdHRyaWJ1dGUobikpKX0pOnRoaXMubGVuZ3RoJiYxPT09dGhpc1swXS5ub2RlVHlwZT8hKHI9dGhpc1swXS5nZXRBdHRyaWJ1dGUobikpJiZuIGluIHRoaXNbMF0/dGhpc1swXVtuXTpyOnR9LHJlbW92ZUF0dHI6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpezE9PT10aGlzLm5vZGVUeXBlJiZ0LnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe0oodGhpcyx0KX0sdGhpcyl9KX0scHJvcDpmdW5jdGlvbih0LGUpe3JldHVybiB0PU1bdF18fHQsMSBpbiBhcmd1bWVudHM/dGhpcy5lYWNoKGZ1bmN0aW9uKG4pe3RoaXNbdF09WSh0aGlzLGUsbix0aGlzW3RdKX0pOnRoaXNbMF0mJnRoaXNbMF1bdF19LGRhdGE6ZnVuY3Rpb24oZSxuKXt2YXIgaT1cImRhdGEtXCIrZS5yZXBsYWNlKGcsXCItJDFcIikudG9Mb3dlckNhc2UoKSxyPTEgaW4gYXJndW1lbnRzP3RoaXMuYXR0cihpLG4pOnRoaXMuYXR0cihpKTtyZXR1cm4gbnVsbCE9PXI/SyhyKTp0fSx2YWw6ZnVuY3Rpb24odCl7cmV0dXJuIDAgaW4gYXJndW1lbnRzP3RoaXMuZWFjaChmdW5jdGlvbihlKXt0aGlzLnZhbHVlPVkodGhpcyx0LGUsdGhpcy52YWx1ZSl9KTp0aGlzWzBdJiYodGhpc1swXS5tdWx0aXBsZT9uKHRoaXNbMF0pLmZpbmQoXCJvcHRpb25cIikuZmlsdGVyKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2VsZWN0ZWR9KS5wbHVjayhcInZhbHVlXCIpOnRoaXNbMF0udmFsdWUpfSxvZmZzZXQ6ZnVuY3Rpb24odCl7aWYodClyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGUpe3ZhciBpPW4odGhpcykscj1ZKHRoaXMsdCxlLGkub2Zmc2V0KCkpLG89aS5vZmZzZXRQYXJlbnQoKS5vZmZzZXQoKSxzPXt0b3A6ci50b3Atby50b3AsbGVmdDpyLmxlZnQtby5sZWZ0fTtcInN0YXRpY1wiPT1pLmNzcyhcInBvc2l0aW9uXCIpJiYocy5wb3NpdGlvbj1cInJlbGF0aXZlXCIpLGkuY3NzKHMpfSk7aWYoIXRoaXMubGVuZ3RoKXJldHVybiBudWxsO2lmKCFuLmNvbnRhaW5zKHUuZG9jdW1lbnRFbGVtZW50LHRoaXNbMF0pKXJldHVybnt0b3A6MCxsZWZ0OjB9O3ZhciBlPXRoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cmV0dXJue2xlZnQ6ZS5sZWZ0K3dpbmRvdy5wYWdlWE9mZnNldCx0b3A6ZS50b3Ard2luZG93LnBhZ2VZT2Zmc2V0LHdpZHRoOk1hdGgucm91bmQoZS53aWR0aCksaGVpZ2h0Ok1hdGgucm91bmQoZS5oZWlnaHQpfX0sY3NzOmZ1bmN0aW9uKHQsaSl7aWYoYXJndW1lbnRzLmxlbmd0aDwyKXt2YXIgcixvPXRoaXNbMF07aWYoIW8pcmV0dXJuO2lmKHI9Z2V0Q29tcHV0ZWRTdHlsZShvLFwiXCIpLFwic3RyaW5nXCI9PXR5cGVvZiB0KXJldHVybiBvLnN0eWxlW04odCldfHxyLmdldFByb3BlcnR5VmFsdWUodCk7aWYoQSh0KSl7dmFyIHM9e307cmV0dXJuIG4uZWFjaCh0LGZ1bmN0aW9uKHQsZSl7c1tlXT1vLnN0eWxlW04oZSldfHxyLmdldFByb3BlcnR5VmFsdWUoZSl9KSxzfX12YXIgYT1cIlwiO2lmKFwic3RyaW5nXCI9PUQodCkpaXx8MD09PWk/YT16KHQpK1wiOlwiK18odCxpKTp0aGlzLmVhY2goZnVuY3Rpb24oKXt0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KHoodCkpfSk7ZWxzZSBmb3IoZSBpbiB0KXRbZV18fDA9PT10W2VdP2ErPXooZSkrXCI6XCIrXyhlLHRbZV0pK1wiO1wiOnRoaXMuZWFjaChmdW5jdGlvbigpe3RoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkoeihlKSl9KTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dGhpcy5zdHlsZS5jc3NUZXh0Kz1cIjtcIithfSl9LGluZGV4OmZ1bmN0aW9uKHQpe3JldHVybiB0P3RoaXMuaW5kZXhPZihuKHQpWzBdKTp0aGlzLnBhcmVudCgpLmNoaWxkcmVuKCkuaW5kZXhPZih0aGlzWzBdKX0saGFzQ2xhc3M6ZnVuY3Rpb24odCl7cmV0dXJuIHQ/ci5zb21lLmNhbGwodGhpcyxmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy50ZXN0KEcodCkpfSxIKHQpKTohMX0sYWRkQ2xhc3M6ZnVuY3Rpb24odCl7cmV0dXJuIHQ/dGhpcy5lYWNoKGZ1bmN0aW9uKGUpe2lmKFwiY2xhc3NOYW1lXCJpbiB0aGlzKXtpPVtdO3ZhciByPUcodGhpcyksbz1ZKHRoaXMsdCxlLHIpO28uc3BsaXQoL1xccysvZykuZm9yRWFjaChmdW5jdGlvbih0KXtuKHRoaXMpLmhhc0NsYXNzKHQpfHxpLnB1c2godCl9LHRoaXMpLGkubGVuZ3RoJiZHKHRoaXMscisocj9cIiBcIjpcIlwiKStpLmpvaW4oXCIgXCIpKX19KTp0aGlzfSxyZW1vdmVDbGFzczpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKG4pe2lmKFwiY2xhc3NOYW1lXCJpbiB0aGlzKXtpZihlPT09dClyZXR1cm4gRyh0aGlzLFwiXCIpO2k9Ryh0aGlzKSxZKHRoaXMsZSxuLGkpLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24odCl7aT1pLnJlcGxhY2UoSCh0KSxcIiBcIil9KSxHKHRoaXMsaS50cmltKCkpfX0pfSx0b2dnbGVDbGFzczpmdW5jdGlvbihlLGkpe3JldHVybiBlP3RoaXMuZWFjaChmdW5jdGlvbihyKXt2YXIgbz1uKHRoaXMpLHM9WSh0aGlzLGUscixHKHRoaXMpKTtzLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oZSl7KGk9PT10PyFvLmhhc0NsYXNzKGUpOmkpP28uYWRkQ2xhc3MoZSk6by5yZW1vdmVDbGFzcyhlKX0pfSk6dGhpc30sc2Nyb2xsVG9wOmZ1bmN0aW9uKGUpe2lmKHRoaXMubGVuZ3RoKXt2YXIgbj1cInNjcm9sbFRvcFwiaW4gdGhpc1swXTtyZXR1cm4gZT09PXQ/bj90aGlzWzBdLnNjcm9sbFRvcDp0aGlzWzBdLnBhZ2VZT2Zmc2V0OnRoaXMuZWFjaChuP2Z1bmN0aW9uKCl7dGhpcy5zY3JvbGxUb3A9ZX06ZnVuY3Rpb24oKXt0aGlzLnNjcm9sbFRvKHRoaXMuc2Nyb2xsWCxlKX0pfX0sc2Nyb2xsTGVmdDpmdW5jdGlvbihlKXtpZih0aGlzLmxlbmd0aCl7dmFyIG49XCJzY3JvbGxMZWZ0XCJpbiB0aGlzWzBdO3JldHVybiBlPT09dD9uP3RoaXNbMF0uc2Nyb2xsTGVmdDp0aGlzWzBdLnBhZ2VYT2Zmc2V0OnRoaXMuZWFjaChuP2Z1bmN0aW9uKCl7dGhpcy5zY3JvbGxMZWZ0PWV9OmZ1bmN0aW9uKCl7dGhpcy5zY3JvbGxUbyhlLHRoaXMuc2Nyb2xsWSl9KX19LHBvc2l0aW9uOmZ1bmN0aW9uKCl7aWYodGhpcy5sZW5ndGgpe3ZhciB0PXRoaXNbMF0sZT10aGlzLm9mZnNldFBhcmVudCgpLGk9dGhpcy5vZmZzZXQoKSxyPW0udGVzdChlWzBdLm5vZGVOYW1lKT97dG9wOjAsbGVmdDowfTplLm9mZnNldCgpO3JldHVybiBpLnRvcC09cGFyc2VGbG9hdChuKHQpLmNzcyhcIm1hcmdpbi10b3BcIikpfHwwLGkubGVmdC09cGFyc2VGbG9hdChuKHQpLmNzcyhcIm1hcmdpbi1sZWZ0XCIpKXx8MCxyLnRvcCs9cGFyc2VGbG9hdChuKGVbMF0pLmNzcyhcImJvcmRlci10b3Atd2lkdGhcIikpfHwwLHIubGVmdCs9cGFyc2VGbG9hdChuKGVbMF0pLmNzcyhcImJvcmRlci1sZWZ0LXdpZHRoXCIpKXx8MCx7dG9wOmkudG9wLXIudG9wLGxlZnQ6aS5sZWZ0LXIubGVmdH19fSxvZmZzZXRQYXJlbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXtmb3IodmFyIHQ9dGhpcy5vZmZzZXRQYXJlbnR8fHUuYm9keTt0JiYhbS50ZXN0KHQubm9kZU5hbWUpJiZcInN0YXRpY1wiPT1uKHQpLmNzcyhcInBvc2l0aW9uXCIpOyl0PXQub2Zmc2V0UGFyZW50O3JldHVybiB0fSl9fSxuLmZuLmRldGFjaD1uLmZuLnJlbW92ZSxbXCJ3aWR0aFwiLFwiaGVpZ2h0XCJdLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIGk9ZS5yZXBsYWNlKC8uLyxmdW5jdGlvbih0KXtyZXR1cm4gdFswXS50b1VwcGVyQ2FzZSgpfSk7bi5mbltlXT1mdW5jdGlvbihyKXt2YXIgbyxzPXRoaXNbMF07cmV0dXJuIHI9PT10P2socyk/c1tcImlubmVyXCIraV06WihzKT9zLmRvY3VtZW50RWxlbWVudFtcInNjcm9sbFwiK2ldOihvPXRoaXMub2Zmc2V0KCkpJiZvW2VdOnRoaXMuZWFjaChmdW5jdGlvbih0KXtzPW4odGhpcykscy5jc3MoZSxZKHRoaXMscix0LHNbZV0oKSkpfSl9fSkseS5mb3JFYWNoKGZ1bmN0aW9uKHQsZSl7dmFyIGk9ZSUyO24uZm5bdF09ZnVuY3Rpb24oKXt2YXIgdCxvLHI9bi5tYXAoYXJndW1lbnRzLGZ1bmN0aW9uKGUpe3JldHVybiB0PUQoZSksXCJvYmplY3RcIj09dHx8XCJhcnJheVwiPT10fHxudWxsPT1lP2U6Qy5mcmFnbWVudChlKX0pLHM9dGhpcy5sZW5ndGg+MTtyZXR1cm4gci5sZW5ndGg8MT90aGlzOnRoaXMuZWFjaChmdW5jdGlvbih0LGEpe289aT9hOmEucGFyZW50Tm9kZSxhPTA9PWU/YS5uZXh0U2libGluZzoxPT1lP2EuZmlyc3RDaGlsZDoyPT1lP2E6bnVsbDt2YXIgZj1uLmNvbnRhaW5zKHUuZG9jdW1lbnRFbGVtZW50LG8pO3IuZm9yRWFjaChmdW5jdGlvbih0KXtpZihzKXQ9dC5jbG9uZU5vZGUoITApO2Vsc2UgaWYoIW8pcmV0dXJuIG4odCkucmVtb3ZlKCk7by5pbnNlcnRCZWZvcmUodCxhKSxmJiZRKHQsZnVuY3Rpb24odCl7bnVsbD09dC5ub2RlTmFtZXx8XCJTQ1JJUFRcIiE9PXQubm9kZU5hbWUudG9VcHBlckNhc2UoKXx8dC50eXBlJiZcInRleHQvamF2YXNjcmlwdFwiIT09dC50eXBlfHx0LnNyY3x8d2luZG93LmV2YWwuY2FsbCh3aW5kb3csdC5pbm5lckhUTUwpfSl9KX0pfSxuLmZuW2k/dCtcIlRvXCI6XCJpbnNlcnRcIisoZT9cIkJlZm9yZVwiOlwiQWZ0ZXJcIildPWZ1bmN0aW9uKGUpe3JldHVybiBuKGUpW3RdKHRoaXMpLHRoaXN9fSksQy5aLnByb3RvdHlwZT1YLnByb3RvdHlwZT1uLmZuLEMudW5pcT1QLEMuZGVzZXJpYWxpemVWYWx1ZT1LLG4uemVwdG89QyxufSgpO3dpbmRvdy5aZXB0bz1aZXB0byx2b2lkIDA9PT13aW5kb3cuJCYmKHdpbmRvdy4kPVplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiBsKHQpe3JldHVybiB0Ll96aWR8fCh0Ll96aWQ9ZSsrKX1mdW5jdGlvbiBoKHQsZSxuLGkpe2lmKGU9cChlKSxlLm5zKXZhciByPWQoZS5ucyk7cmV0dXJuKHNbbCh0KV18fFtdKS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuISghdHx8ZS5lJiZ0LmUhPWUuZXx8ZS5ucyYmIXIudGVzdCh0Lm5zKXx8biYmbCh0LmZuKSE9PWwobil8fGkmJnQuc2VsIT1pKX0pfWZ1bmN0aW9uIHAodCl7dmFyIGU9KFwiXCIrdCkuc3BsaXQoXCIuXCIpO3JldHVybntlOmVbMF0sbnM6ZS5zbGljZSgxKS5zb3J0KCkuam9pbihcIiBcIil9fWZ1bmN0aW9uIGQodCl7cmV0dXJuIG5ldyBSZWdFeHAoXCIoPzpefCApXCIrdC5yZXBsYWNlKFwiIFwiLFwiIC4qID9cIikrXCIoPzogfCQpXCIpfWZ1bmN0aW9uIG0odCxlKXtyZXR1cm4gdC5kZWwmJiF1JiZ0LmUgaW4gZnx8ISFlfWZ1bmN0aW9uIGcodCl7cmV0dXJuIGNbdF18fHUmJmZbdF18fHR9ZnVuY3Rpb24gdihlLGkscixvLGEsdSxmKXt2YXIgaD1sKGUpLGQ9c1toXXx8KHNbaF09W10pO2kuc3BsaXQoL1xccy8pLmZvckVhY2goZnVuY3Rpb24oaSl7aWYoXCJyZWFkeVwiPT1pKXJldHVybiB0KGRvY3VtZW50KS5yZWFkeShyKTt2YXIgcz1wKGkpO3MuZm49cixzLnNlbD1hLHMuZSBpbiBjJiYocj1mdW5jdGlvbihlKXt2YXIgbj1lLnJlbGF0ZWRUYXJnZXQ7cmV0dXJuIW58fG4hPT10aGlzJiYhdC5jb250YWlucyh0aGlzLG4pP3MuZm4uYXBwbHkodGhpcyxhcmd1bWVudHMpOnZvaWQgMH0pLHMuZGVsPXU7dmFyIGw9dXx8cjtzLnByb3h5PWZ1bmN0aW9uKHQpe2lmKHQ9VCh0KSwhdC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpKXt0LmRhdGE9bzt2YXIgaT1sLmFwcGx5KGUsdC5fYXJncz09bj9bdF06W3RdLmNvbmNhdCh0Ll9hcmdzKSk7cmV0dXJuIGk9PT0hMSYmKHQucHJldmVudERlZmF1bHQoKSx0LnN0b3BQcm9wYWdhdGlvbigpKSxpfX0scy5pPWQubGVuZ3RoLGQucHVzaChzKSxcImFkZEV2ZW50TGlzdGVuZXJcImluIGUmJmUuYWRkRXZlbnRMaXN0ZW5lcihnKHMuZSkscy5wcm94eSxtKHMsZikpfSl9ZnVuY3Rpb24geSh0LGUsbixpLHIpe3ZhciBvPWwodCk7KGV8fFwiXCIpLnNwbGl0KC9cXHMvKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2godCxlLG4saSkuZm9yRWFjaChmdW5jdGlvbihlKXtkZWxldGUgc1tvXVtlLmldLFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiaW4gdCYmdC5yZW1vdmVFdmVudExpc3RlbmVyKGcoZS5lKSxlLnByb3h5LG0oZSxyKSl9KX0pfWZ1bmN0aW9uIFQoZSxpKXtyZXR1cm4oaXx8IWUuaXNEZWZhdWx0UHJldmVudGVkKSYmKGl8fChpPWUpLHQuZWFjaChFLGZ1bmN0aW9uKHQsbil7dmFyIHI9aVt0XTtlW3RdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXNbbl09dyxyJiZyLmFwcGx5KGksYXJndW1lbnRzKX0sZVtuXT14fSksKGkuZGVmYXVsdFByZXZlbnRlZCE9PW4/aS5kZWZhdWx0UHJldmVudGVkOlwicmV0dXJuVmFsdWVcImluIGk/aS5yZXR1cm5WYWx1ZT09PSExOmkuZ2V0UHJldmVudERlZmF1bHQmJmkuZ2V0UHJldmVudERlZmF1bHQoKSkmJihlLmlzRGVmYXVsdFByZXZlbnRlZD13KSksZX1mdW5jdGlvbiBqKHQpe3ZhciBlLGk9e29yaWdpbmFsRXZlbnQ6dH07Zm9yKGUgaW4gdCliLnRlc3QoZSl8fHRbZV09PT1ufHwoaVtlXT10W2VdKTtyZXR1cm4gVChpLHQpfXZhciBuLGU9MSxpPUFycmF5LnByb3RvdHlwZS5zbGljZSxyPXQuaXNGdW5jdGlvbixvPWZ1bmN0aW9uKHQpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0fSxzPXt9LGE9e30sdT1cIm9uZm9jdXNpblwiaW4gd2luZG93LGY9e2ZvY3VzOlwiZm9jdXNpblwiLGJsdXI6XCJmb2N1c291dFwifSxjPXttb3VzZWVudGVyOlwibW91c2VvdmVyXCIsbW91c2VsZWF2ZTpcIm1vdXNlb3V0XCJ9O2EuY2xpY2s9YS5tb3VzZWRvd249YS5tb3VzZXVwPWEubW91c2Vtb3ZlPVwiTW91c2VFdmVudHNcIix0LmV2ZW50PXthZGQ6dixyZW1vdmU6eX0sdC5wcm94eT1mdW5jdGlvbihlLG4pe3ZhciBzPTIgaW4gYXJndW1lbnRzJiZpLmNhbGwoYXJndW1lbnRzLDIpO2lmKHIoZSkpe3ZhciBhPWZ1bmN0aW9uKCl7cmV0dXJuIGUuYXBwbHkobixzP3MuY29uY2F0KGkuY2FsbChhcmd1bWVudHMpKTphcmd1bWVudHMpfTtyZXR1cm4gYS5femlkPWwoZSksYX1pZihvKG4pKXJldHVybiBzPyhzLnVuc2hpZnQoZVtuXSxlKSx0LnByb3h5LmFwcGx5KG51bGwscykpOnQucHJveHkoZVtuXSxlKTt0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0ZWQgZnVuY3Rpb25cIil9LHQuZm4uYmluZD1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHRoaXMub24odCxlLG4pfSx0LmZuLnVuYmluZD1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLm9mZih0LGUpfSx0LmZuLm9uZT1mdW5jdGlvbih0LGUsbixpKXtyZXR1cm4gdGhpcy5vbih0LGUsbixpLDEpfTt2YXIgdz1mdW5jdGlvbigpe3JldHVybiEwfSx4PWZ1bmN0aW9uKCl7cmV0dXJuITF9LGI9L14oW0EtWl18cmV0dXJuVmFsdWUkfGxheWVyW1hZXSQpLyxFPXtwcmV2ZW50RGVmYXVsdDpcImlzRGVmYXVsdFByZXZlbnRlZFwiLHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjpcImlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkXCIsc3RvcFByb3BhZ2F0aW9uOlwiaXNQcm9wYWdhdGlvblN0b3BwZWRcIn07dC5mbi5kZWxlZ2F0ZT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHRoaXMub24oZSx0LG4pfSx0LmZuLnVuZGVsZWdhdGU9ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0aGlzLm9mZihlLHQsbil9LHQuZm4ubGl2ZT1mdW5jdGlvbihlLG4pe3JldHVybiB0KGRvY3VtZW50LmJvZHkpLmRlbGVnYXRlKHRoaXMuc2VsZWN0b3IsZSxuKSx0aGlzfSx0LmZuLmRpZT1mdW5jdGlvbihlLG4pe3JldHVybiB0KGRvY3VtZW50LmJvZHkpLnVuZGVsZWdhdGUodGhpcy5zZWxlY3RvcixlLG4pLHRoaXN9LHQuZm4ub249ZnVuY3Rpb24oZSxzLGEsdSxmKXt2YXIgYyxsLGg9dGhpcztyZXR1cm4gZSYmIW8oZSk/KHQuZWFjaChlLGZ1bmN0aW9uKHQsZSl7aC5vbih0LHMsYSxlLGYpfSksaCk6KG8ocyl8fHIodSl8fHU9PT0hMXx8KHU9YSxhPXMscz1uKSwodT09PW58fGE9PT0hMSkmJih1PWEsYT1uKSx1PT09ITEmJih1PXgpLGguZWFjaChmdW5jdGlvbihuLHIpe2YmJihjPWZ1bmN0aW9uKHQpe3JldHVybiB5KHIsdC50eXBlLHUpLHUuYXBwbHkodGhpcyxhcmd1bWVudHMpfSkscyYmKGw9ZnVuY3Rpb24oZSl7dmFyIG4sbz10KGUudGFyZ2V0KS5jbG9zZXN0KHMscikuZ2V0KDApO3JldHVybiBvJiZvIT09cj8obj10LmV4dGVuZChqKGUpLHtjdXJyZW50VGFyZ2V0Om8sbGl2ZUZpcmVkOnJ9KSwoY3x8dSkuYXBwbHkobyxbbl0uY29uY2F0KGkuY2FsbChhcmd1bWVudHMsMSkpKSk6dm9pZCAwfSksdihyLGUsdSxhLHMsbHx8Yyl9KSl9LHQuZm4ub2ZmPWZ1bmN0aW9uKGUsaSxzKXt2YXIgYT10aGlzO3JldHVybiBlJiYhbyhlKT8odC5lYWNoKGUsZnVuY3Rpb24odCxlKXthLm9mZih0LGksZSl9KSxhKToobyhpKXx8cihzKXx8cz09PSExfHwocz1pLGk9bikscz09PSExJiYocz14KSxhLmVhY2goZnVuY3Rpb24oKXt5KHRoaXMsZSxzLGkpfSkpfSx0LmZuLnRyaWdnZXI9ZnVuY3Rpb24oZSxuKXtyZXR1cm4gZT1vKGUpfHx0LmlzUGxhaW5PYmplY3QoZSk/dC5FdmVudChlKTpUKGUpLGUuX2FyZ3M9bix0aGlzLmVhY2goZnVuY3Rpb24oKXtlLnR5cGUgaW4gZiYmXCJmdW5jdGlvblwiPT10eXBlb2YgdGhpc1tlLnR5cGVdP3RoaXNbZS50eXBlXSgpOlwiZGlzcGF0Y2hFdmVudFwiaW4gdGhpcz90aGlzLmRpc3BhdGNoRXZlbnQoZSk6dCh0aGlzKS50cmlnZ2VySGFuZGxlcihlLG4pfSl9LHQuZm4udHJpZ2dlckhhbmRsZXI9ZnVuY3Rpb24oZSxuKXt2YXIgaSxyO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24ocyxhKXtpPWoobyhlKT90LkV2ZW50KGUpOmUpLGkuX2FyZ3M9bixpLnRhcmdldD1hLHQuZWFjaChoKGEsZS50eXBlfHxlKSxmdW5jdGlvbih0LGUpe3JldHVybiByPWUucHJveHkoaSksaS5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpPyExOnZvaWQgMH0pfSkscn0sXCJmb2N1c2luIGZvY3Vzb3V0IGZvY3VzIGJsdXIgbG9hZCByZXNpemUgc2Nyb2xsIHVubG9hZCBjbGljayBkYmxjbGljayBtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBjaGFuZ2Ugc2VsZWN0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgZXJyb3JcIi5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihlKXt0LmZuW2VdPWZ1bmN0aW9uKHQpe3JldHVybiAwIGluIGFyZ3VtZW50cz90aGlzLmJpbmQoZSx0KTp0aGlzLnRyaWdnZXIoZSl9fSksdC5FdmVudD1mdW5jdGlvbih0LGUpe28odCl8fChlPXQsdD1lLnR5cGUpO3ZhciBuPWRvY3VtZW50LmNyZWF0ZUV2ZW50KGFbdF18fFwiRXZlbnRzXCIpLGk9ITA7aWYoZSlmb3IodmFyIHIgaW4gZSlcImJ1YmJsZXNcIj09cj9pPSEhZVtyXTpuW3JdPWVbcl07cmV0dXJuIG4uaW5pdEV2ZW50KHQsaSwhMCksVChuKX19KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiBoKGUsbixpKXt2YXIgcj10LkV2ZW50KG4pO3JldHVybiB0KGUpLnRyaWdnZXIocixpKSwhci5pc0RlZmF1bHRQcmV2ZW50ZWQoKX1mdW5jdGlvbiBwKHQsZSxpLHIpe3JldHVybiB0Lmdsb2JhbD9oKGV8fG4saSxyKTp2b2lkIDB9ZnVuY3Rpb24gZChlKXtlLmdsb2JhbCYmMD09PXQuYWN0aXZlKysmJnAoZSxudWxsLFwiYWpheFN0YXJ0XCIpfWZ1bmN0aW9uIG0oZSl7ZS5nbG9iYWwmJiEtLXQuYWN0aXZlJiZwKGUsbnVsbCxcImFqYXhTdG9wXCIpfWZ1bmN0aW9uIGcodCxlKXt2YXIgbj1lLmNvbnRleHQ7cmV0dXJuIGUuYmVmb3JlU2VuZC5jYWxsKG4sdCxlKT09PSExfHxwKGUsbixcImFqYXhCZWZvcmVTZW5kXCIsW3QsZV0pPT09ITE/ITE6dm9pZCBwKGUsbixcImFqYXhTZW5kXCIsW3QsZV0pfWZ1bmN0aW9uIHYodCxlLG4saSl7dmFyIHI9bi5jb250ZXh0LG89XCJzdWNjZXNzXCI7bi5zdWNjZXNzLmNhbGwocix0LG8sZSksaSYmaS5yZXNvbHZlV2l0aChyLFt0LG8sZV0pLHAobixyLFwiYWpheFN1Y2Nlc3NcIixbZSxuLHRdKSx3KG8sZSxuKX1mdW5jdGlvbiB5KHQsZSxuLGkscil7dmFyIG89aS5jb250ZXh0O2kuZXJyb3IuY2FsbChvLG4sZSx0KSxyJiZyLnJlamVjdFdpdGgobyxbbixlLHRdKSxwKGksbyxcImFqYXhFcnJvclwiLFtuLGksdHx8ZV0pLHcoZSxuLGkpfWZ1bmN0aW9uIHcodCxlLG4pe3ZhciBpPW4uY29udGV4dDtuLmNvbXBsZXRlLmNhbGwoaSxlLHQpLHAobixpLFwiYWpheENvbXBsZXRlXCIsW2Usbl0pLG0obil9ZnVuY3Rpb24geCgpe31mdW5jdGlvbiBiKHQpe3JldHVybiB0JiYodD10LnNwbGl0KFwiO1wiLDIpWzBdKSx0JiYodD09Zj9cImh0bWxcIjp0PT11P1wianNvblwiOnMudGVzdCh0KT9cInNjcmlwdFwiOmEudGVzdCh0KSYmXCJ4bWxcIil8fFwidGV4dFwifWZ1bmN0aW9uIEUodCxlKXtyZXR1cm5cIlwiPT1lP3Q6KHQrXCImXCIrZSkucmVwbGFjZSgvWyY/XXsxLDJ9LyxcIj9cIil9ZnVuY3Rpb24gVChlKXtlLnByb2Nlc3NEYXRhJiZlLmRhdGEmJlwic3RyaW5nXCIhPXQudHlwZShlLmRhdGEpJiYoZS5kYXRhPXQucGFyYW0oZS5kYXRhLGUudHJhZGl0aW9uYWwpKSwhZS5kYXRhfHxlLnR5cGUmJlwiR0VUXCIhPWUudHlwZS50b1VwcGVyQ2FzZSgpfHwoZS51cmw9RShlLnVybCxlLmRhdGEpLGUuZGF0YT12b2lkIDApfWZ1bmN0aW9uIGooZSxuLGkscil7cmV0dXJuIHQuaXNGdW5jdGlvbihuKSYmKHI9aSxpPW4sbj12b2lkIDApLHQuaXNGdW5jdGlvbihpKXx8KHI9aSxpPXZvaWQgMCkse3VybDplLGRhdGE6bixzdWNjZXNzOmksZGF0YVR5cGU6cn19ZnVuY3Rpb24gQyhlLG4saSxyKXt2YXIgbyxzPXQuaXNBcnJheShuKSxhPXQuaXNQbGFpbk9iamVjdChuKTt0LmVhY2gobixmdW5jdGlvbihuLHUpe289dC50eXBlKHUpLHImJihuPWk/cjpyK1wiW1wiKyhhfHxcIm9iamVjdFwiPT1vfHxcImFycmF5XCI9PW8/bjpcIlwiKStcIl1cIiksIXImJnM/ZS5hZGQodS5uYW1lLHUudmFsdWUpOlwiYXJyYXlcIj09b3x8IWkmJlwib2JqZWN0XCI9PW8/QyhlLHUsaSxuKTplLmFkZChuLHUpfSl9dmFyIGkscixlPTAsbj13aW5kb3cuZG9jdW1lbnQsbz0vPHNjcmlwdFxcYltePF0qKD86KD8hPFxcL3NjcmlwdD4pPFtePF0qKSo8XFwvc2NyaXB0Pi9naSxzPS9eKD86dGV4dHxhcHBsaWNhdGlvbilcXC9qYXZhc2NyaXB0L2ksYT0vXig/OnRleHR8YXBwbGljYXRpb24pXFwveG1sL2ksdT1cImFwcGxpY2F0aW9uL2pzb25cIixmPVwidGV4dC9odG1sXCIsYz0vXlxccyokLyxsPW4uY3JlYXRlRWxlbWVudChcImFcIik7bC5ocmVmPXdpbmRvdy5sb2NhdGlvbi5ocmVmLHQuYWN0aXZlPTAsdC5hamF4SlNPTlA9ZnVuY3Rpb24oaSxyKXtpZighKFwidHlwZVwiaW4gaSkpcmV0dXJuIHQuYWpheChpKTt2YXIgZixoLG89aS5qc29ucENhbGxiYWNrLHM9KHQuaXNGdW5jdGlvbihvKT9vKCk6byl8fFwianNvbnBcIisgKytlLGE9bi5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpLHU9d2luZG93W3NdLGM9ZnVuY3Rpb24oZSl7dChhKS50cmlnZ2VySGFuZGxlcihcImVycm9yXCIsZXx8XCJhYm9ydFwiKX0sbD17YWJvcnQ6Y307cmV0dXJuIHImJnIucHJvbWlzZShsKSx0KGEpLm9uKFwibG9hZCBlcnJvclwiLGZ1bmN0aW9uKGUsbil7Y2xlYXJUaW1lb3V0KGgpLHQoYSkub2ZmKCkucmVtb3ZlKCksXCJlcnJvclwiIT1lLnR5cGUmJmY/dihmWzBdLGwsaSxyKTp5KG51bGwsbnx8XCJlcnJvclwiLGwsaSxyKSx3aW5kb3dbc109dSxmJiZ0LmlzRnVuY3Rpb24odSkmJnUoZlswXSksdT1mPXZvaWQgMH0pLGcobCxpKT09PSExPyhjKFwiYWJvcnRcIiksbCk6KHdpbmRvd1tzXT1mdW5jdGlvbigpe2Y9YXJndW1lbnRzfSxhLnNyYz1pLnVybC5yZXBsYWNlKC9cXD8oLispPVxcPy8sXCI/JDE9XCIrcyksbi5oZWFkLmFwcGVuZENoaWxkKGEpLGkudGltZW91dD4wJiYoaD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YyhcInRpbWVvdXRcIil9LGkudGltZW91dCkpLGwpfSx0LmFqYXhTZXR0aW5ncz17dHlwZTpcIkdFVFwiLGJlZm9yZVNlbmQ6eCxzdWNjZXNzOngsZXJyb3I6eCxjb21wbGV0ZTp4LGNvbnRleHQ6bnVsbCxnbG9iYWw6ITAseGhyOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3R9LGFjY2VwdHM6e3NjcmlwdDpcInRleHQvamF2YXNjcmlwdCwgYXBwbGljYXRpb24vamF2YXNjcmlwdCwgYXBwbGljYXRpb24veC1qYXZhc2NyaXB0XCIsanNvbjp1LHhtbDpcImFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWxcIixodG1sOmYsdGV4dDpcInRleHQvcGxhaW5cIn0sY3Jvc3NEb21haW46ITEsdGltZW91dDowLHByb2Nlc3NEYXRhOiEwLGNhY2hlOiEwfSx0LmFqYXg9ZnVuY3Rpb24oZSl7dmFyIGEsdSxvPXQuZXh0ZW5kKHt9LGV8fHt9KSxzPXQuRGVmZXJyZWQmJnQuRGVmZXJyZWQoKTtmb3IoaSBpbiB0LmFqYXhTZXR0aW5ncyl2b2lkIDA9PT1vW2ldJiYob1tpXT10LmFqYXhTZXR0aW5nc1tpXSk7ZChvKSxvLmNyb3NzRG9tYWlufHwoYT1uLmNyZWF0ZUVsZW1lbnQoXCJhXCIpLGEuaHJlZj1vLnVybCxhLmhyZWY9YS5ocmVmLG8uY3Jvc3NEb21haW49bC5wcm90b2NvbCtcIi8vXCIrbC5ob3N0IT1hLnByb3RvY29sK1wiLy9cIithLmhvc3QpLG8udXJsfHwoby51cmw9d2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpLCh1PW8udXJsLmluZGV4T2YoXCIjXCIpKT4tMSYmKG8udXJsPW8udXJsLnNsaWNlKDAsdSkpLFQobyk7dmFyIGY9by5kYXRhVHlwZSxoPS9cXD8uKz1cXD8vLnRlc3Qoby51cmwpO2lmKGgmJihmPVwianNvbnBcIiksby5jYWNoZSE9PSExJiYoZSYmZS5jYWNoZT09PSEwfHxcInNjcmlwdFwiIT1mJiZcImpzb25wXCIhPWYpfHwoby51cmw9RShvLnVybCxcIl89XCIrRGF0ZS5ub3coKSkpLFwianNvbnBcIj09ZilyZXR1cm4gaHx8KG8udXJsPUUoby51cmwsby5qc29ucD9vLmpzb25wK1wiPT9cIjpvLmpzb25wPT09ITE/XCJcIjpcImNhbGxiYWNrPT9cIikpLHQuYWpheEpTT05QKG8scyk7dmFyIE4scD1vLmFjY2VwdHNbZl0sbT17fSx3PWZ1bmN0aW9uKHQsZSl7bVt0LnRvTG93ZXJDYXNlKCldPVt0LGVdfSxqPS9eKFtcXHctXSs6KVxcL1xcLy8udGVzdChvLnVybCk/UmVnRXhwLiQxOndpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCxTPW8ueGhyKCksQz1TLnNldFJlcXVlc3RIZWFkZXI7aWYocyYmcy5wcm9taXNlKFMpLG8uY3Jvc3NEb21haW58fHcoXCJYLVJlcXVlc3RlZC1XaXRoXCIsXCJYTUxIdHRwUmVxdWVzdFwiKSx3KFwiQWNjZXB0XCIscHx8XCIqLypcIiksKHA9by5taW1lVHlwZXx8cCkmJihwLmluZGV4T2YoXCIsXCIpPi0xJiYocD1wLnNwbGl0KFwiLFwiLDIpWzBdKSxTLm92ZXJyaWRlTWltZVR5cGUmJlMub3ZlcnJpZGVNaW1lVHlwZShwKSksKG8uY29udGVudFR5cGV8fG8uY29udGVudFR5cGUhPT0hMSYmby5kYXRhJiZcIkdFVFwiIT1vLnR5cGUudG9VcHBlckNhc2UoKSkmJncoXCJDb250ZW50LVR5cGVcIixvLmNvbnRlbnRUeXBlfHxcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKSxvLmhlYWRlcnMpZm9yKHIgaW4gby5oZWFkZXJzKXcocixvLmhlYWRlcnNbcl0pO2lmKFMuc2V0UmVxdWVzdEhlYWRlcj13LFMub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7aWYoND09Uy5yZWFkeVN0YXRlKXtTLm9ucmVhZHlzdGF0ZWNoYW5nZT14LGNsZWFyVGltZW91dChOKTt2YXIgZSxuPSExO2lmKFMuc3RhdHVzPj0yMDAmJlMuc3RhdHVzPDMwMHx8MzA0PT1TLnN0YXR1c3x8MD09Uy5zdGF0dXMmJlwiZmlsZTpcIj09ail7Zj1mfHxiKG8ubWltZVR5cGV8fFMuZ2V0UmVzcG9uc2VIZWFkZXIoXCJjb250ZW50LXR5cGVcIikpLGU9Uy5yZXNwb25zZVRleHQ7dHJ5e1wic2NyaXB0XCI9PWY/KDEsZXZhbCkoZSk6XCJ4bWxcIj09Zj9lPVMucmVzcG9uc2VYTUw6XCJqc29uXCI9PWYmJihlPWMudGVzdChlKT9udWxsOnQucGFyc2VKU09OKGUpKX1jYXRjaChpKXtuPWl9bj95KG4sXCJwYXJzZXJlcnJvclwiLFMsbyxzKTp2KGUsUyxvLHMpfWVsc2UgeShTLnN0YXR1c1RleHR8fG51bGwsUy5zdGF0dXM/XCJlcnJvclwiOlwiYWJvcnRcIixTLG8scyl9fSxnKFMsbyk9PT0hMSlyZXR1cm4gUy5hYm9ydCgpLHkobnVsbCxcImFib3J0XCIsUyxvLHMpLFM7aWYoby54aHJGaWVsZHMpZm9yKHIgaW4gby54aHJGaWVsZHMpU1tyXT1vLnhockZpZWxkc1tyXTt2YXIgUD1cImFzeW5jXCJpbiBvP28uYXN5bmM6ITA7Uy5vcGVuKG8udHlwZSxvLnVybCxQLG8udXNlcm5hbWUsby5wYXNzd29yZCk7Zm9yKHIgaW4gbSlDLmFwcGx5KFMsbVtyXSk7cmV0dXJuIG8udGltZW91dD4wJiYoTj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Uy5vbnJlYWR5c3RhdGVjaGFuZ2U9eCxTLmFib3J0KCkseShudWxsLFwidGltZW91dFwiLFMsbyxzKX0sby50aW1lb3V0KSksUy5zZW5kKG8uZGF0YT9vLmRhdGE6bnVsbCksU30sdC5nZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gdC5hamF4KGouYXBwbHkobnVsbCxhcmd1bWVudHMpKX0sdC5wb3N0PWZ1bmN0aW9uKCl7dmFyIGU9ai5hcHBseShudWxsLGFyZ3VtZW50cyk7cmV0dXJuIGUudHlwZT1cIlBPU1RcIix0LmFqYXgoZSl9LHQuZ2V0SlNPTj1mdW5jdGlvbigpe3ZhciBlPWouYXBwbHkobnVsbCxhcmd1bWVudHMpO3JldHVybiBlLmRhdGFUeXBlPVwianNvblwiLHQuYWpheChlKX0sdC5mbi5sb2FkPWZ1bmN0aW9uKGUsbixpKXtpZighdGhpcy5sZW5ndGgpcmV0dXJuIHRoaXM7dmFyIGEscj10aGlzLHM9ZS5zcGxpdCgvXFxzLyksdT1qKGUsbixpKSxmPXUuc3VjY2VzcztyZXR1cm4gcy5sZW5ndGg+MSYmKHUudXJsPXNbMF0sYT1zWzFdKSx1LnN1Y2Nlc3M9ZnVuY3Rpb24oZSl7ci5odG1sKGE/dChcIjxkaXY+XCIpLmh0bWwoZS5yZXBsYWNlKG8sXCJcIikpLmZpbmQoYSk6ZSksZiYmZi5hcHBseShyLGFyZ3VtZW50cyl9LHQuYWpheCh1KSx0aGlzfTt2YXIgUz1lbmNvZGVVUklDb21wb25lbnQ7dC5wYXJhbT1mdW5jdGlvbihlLG4pe3ZhciBpPVtdO3JldHVybiBpLmFkZD1mdW5jdGlvbihlLG4pe3QuaXNGdW5jdGlvbihuKSYmKG49bigpKSxudWxsPT1uJiYobj1cIlwiKSx0aGlzLnB1c2goUyhlKStcIj1cIitTKG4pKX0sQyhpLGUsbiksaS5qb2luKFwiJlwiKS5yZXBsYWNlKC8lMjAvZyxcIitcIil9fShaZXB0byksZnVuY3Rpb24odCl7dC5DYWxsYmFja3M9ZnVuY3Rpb24oZSl7ZT10LmV4dGVuZCh7fSxlKTt2YXIgbixpLHIsbyxzLGEsdT1bXSxmPSFlLm9uY2UmJltdLGM9ZnVuY3Rpb24odCl7Zm9yKG49ZS5tZW1vcnkmJnQsaT0hMCxhPW98fDAsbz0wLHM9dS5sZW5ndGgscj0hMDt1JiZzPmE7KythKWlmKHVbYV0uYXBwbHkodFswXSx0WzFdKT09PSExJiZlLnN0b3BPbkZhbHNlKXtuPSExO2JyZWFrfXI9ITEsdSYmKGY/Zi5sZW5ndGgmJmMoZi5zaGlmdCgpKTpuP3UubGVuZ3RoPTA6bC5kaXNhYmxlKCkpfSxsPXthZGQ6ZnVuY3Rpb24oKXtpZih1KXt2YXIgaT11Lmxlbmd0aCxhPWZ1bmN0aW9uKG4pe3QuZWFjaChuLGZ1bmN0aW9uKHQsbil7XCJmdW5jdGlvblwiPT10eXBlb2Ygbj9lLnVuaXF1ZSYmbC5oYXMobil8fHUucHVzaChuKTpuJiZuLmxlbmd0aCYmXCJzdHJpbmdcIiE9dHlwZW9mIG4mJmEobil9KX07YShhcmd1bWVudHMpLHI/cz11Lmxlbmd0aDpuJiYobz1pLGMobikpfXJldHVybiB0aGlzfSxyZW1vdmU6ZnVuY3Rpb24oKXtyZXR1cm4gdSYmdC5lYWNoKGFyZ3VtZW50cyxmdW5jdGlvbihlLG4pe2Zvcih2YXIgaTsoaT10LmluQXJyYXkobix1LGkpKT4tMTspdS5zcGxpY2UoaSwxKSxyJiYocz49aSYmLS1zLGE+PWkmJi0tYSl9KSx0aGlzfSxoYXM6ZnVuY3Rpb24oZSl7cmV0dXJuISghdXx8IShlP3QuaW5BcnJheShlLHUpPi0xOnUubGVuZ3RoKSl9LGVtcHR5OmZ1bmN0aW9uKCl7cmV0dXJuIHM9dS5sZW5ndGg9MCx0aGlzfSxkaXNhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIHU9Zj1uPXZvaWQgMCx0aGlzfSxkaXNhYmxlZDpmdW5jdGlvbigpe3JldHVybiF1fSxsb2NrOmZ1bmN0aW9uKCl7cmV0dXJuIGY9dm9pZCAwLG58fGwuZGlzYWJsZSgpLHRoaXN9LGxvY2tlZDpmdW5jdGlvbigpe3JldHVybiFmfSxmaXJlV2l0aDpmdW5jdGlvbih0LGUpe3JldHVybiF1fHxpJiYhZnx8KGU9ZXx8W10sZT1bdCxlLnNsaWNlP2Uuc2xpY2UoKTplXSxyP2YucHVzaChlKTpjKGUpKSx0aGlzfSxmaXJlOmZ1bmN0aW9uKCl7cmV0dXJuIGwuZmlyZVdpdGgodGhpcyxhcmd1bWVudHMpfSxmaXJlZDpmdW5jdGlvbigpe3JldHVybiEhaX19O3JldHVybiBsfX0oWmVwdG8pLGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIG4oZSl7dmFyIGk9W1tcInJlc29sdmVcIixcImRvbmVcIix0LkNhbGxiYWNrcyh7b25jZToxLG1lbW9yeToxfSksXCJyZXNvbHZlZFwiXSxbXCJyZWplY3RcIixcImZhaWxcIix0LkNhbGxiYWNrcyh7b25jZToxLG1lbW9yeToxfSksXCJyZWplY3RlZFwiXSxbXCJub3RpZnlcIixcInByb2dyZXNzXCIsdC5DYWxsYmFja3Moe21lbW9yeToxfSldXSxyPVwicGVuZGluZ1wiLG89e3N0YXRlOmZ1bmN0aW9uKCl7cmV0dXJuIHJ9LGFsd2F5czpmdW5jdGlvbigpe3JldHVybiBzLmRvbmUoYXJndW1lbnRzKS5mYWlsKGFyZ3VtZW50cyksdGhpc30sdGhlbjpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cztyZXR1cm4gbihmdW5jdGlvbihuKXt0LmVhY2goaSxmdW5jdGlvbihpLHIpe3ZhciBhPXQuaXNGdW5jdGlvbihlW2ldKSYmZVtpXTtzW3JbMV1dKGZ1bmN0aW9uKCl7dmFyIGU9YSYmYS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7aWYoZSYmdC5pc0Z1bmN0aW9uKGUucHJvbWlzZSkpZS5wcm9taXNlKCkuZG9uZShuLnJlc29sdmUpLmZhaWwobi5yZWplY3QpLnByb2dyZXNzKG4ubm90aWZ5KTtlbHNle3ZhciBpPXRoaXM9PT1vP24ucHJvbWlzZSgpOnRoaXMscz1hP1tlXTphcmd1bWVudHM7bltyWzBdK1wiV2l0aFwiXShpLHMpfX0pfSksZT1udWxsfSkucHJvbWlzZSgpfSxwcm9taXNlOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT1lP3QuZXh0ZW5kKGUsbyk6b319LHM9e307cmV0dXJuIHQuZWFjaChpLGZ1bmN0aW9uKHQsZSl7dmFyIG49ZVsyXSxhPWVbM107b1tlWzFdXT1uLmFkZCxhJiZuLmFkZChmdW5jdGlvbigpe3I9YX0saVsxXnRdWzJdLmRpc2FibGUsaVsyXVsyXS5sb2NrKSxzW2VbMF1dPWZ1bmN0aW9uKCl7cmV0dXJuIHNbZVswXStcIldpdGhcIl0odGhpcz09PXM/bzp0aGlzLGFyZ3VtZW50cyksdGhpc30sc1tlWzBdK1wiV2l0aFwiXT1uLmZpcmVXaXRofSksby5wcm9taXNlKHMpLGUmJmUuY2FsbChzLHMpLHN9dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlO3Qud2hlbj1mdW5jdGlvbihpKXt2YXIgZixjLGwscj1lLmNhbGwoYXJndW1lbnRzKSxvPXIubGVuZ3RoLHM9MCxhPTEhPT1vfHxpJiZ0LmlzRnVuY3Rpb24oaS5wcm9taXNlKT9vOjAsdT0xPT09YT9pOm4oKSxoPWZ1bmN0aW9uKHQsbixpKXtyZXR1cm4gZnVuY3Rpb24ocil7blt0XT10aGlzLGlbdF09YXJndW1lbnRzLmxlbmd0aD4xP2UuY2FsbChhcmd1bWVudHMpOnIsaT09PWY/dS5ub3RpZnlXaXRoKG4saSk6LS1hfHx1LnJlc29sdmVXaXRoKG4saSl9fTtpZihvPjEpZm9yKGY9bmV3IEFycmF5KG8pLGM9bmV3IEFycmF5KG8pLGw9bmV3IEFycmF5KG8pO28+czsrK3MpcltzXSYmdC5pc0Z1bmN0aW9uKHJbc10ucHJvbWlzZSk/cltzXS5wcm9taXNlKCkuZG9uZShoKHMsbCxyKSkuZmFpbCh1LnJlamVjdCkucHJvZ3Jlc3MoaChzLGMsZikpOi0tYTtyZXR1cm4gYXx8dS5yZXNvbHZlV2l0aChsLHIpLHUucHJvbWlzZSgpfSx0LkRlZmVycmVkPW59KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiB1KHQsZSxuLGkpe3JldHVybiBNYXRoLmFicyh0LWUpPj1NYXRoLmFicyhuLWkpP3QtZT4wP1wiTGVmdFwiOlwiUmlnaHRcIjpuLWk+MD9cIlVwXCI6XCJEb3duXCJ9ZnVuY3Rpb24gZigpe289bnVsbCxlLmxhc3QmJihlLmVsLnRyaWdnZXIoXCJsb25nVGFwXCIpLGU9e30pfWZ1bmN0aW9uIGMoKXtvJiZjbGVhclRpbWVvdXQobyksbz1udWxsfWZ1bmN0aW9uIGwoKXtuJiZjbGVhclRpbWVvdXQobiksaSYmY2xlYXJUaW1lb3V0KGkpLHImJmNsZWFyVGltZW91dChyKSxvJiZjbGVhclRpbWVvdXQobyksbj1pPXI9bz1udWxsLGU9e319ZnVuY3Rpb24gaCh0KXtyZXR1cm4oXCJ0b3VjaFwiPT10LnBvaW50ZXJUeXBlfHx0LnBvaW50ZXJUeXBlPT10Lk1TUE9JTlRFUl9UWVBFX1RPVUNIKSYmdC5pc1ByaW1hcnl9ZnVuY3Rpb24gcCh0LGUpe3JldHVybiB0LnR5cGU9PVwicG9pbnRlclwiK2V8fHQudHlwZS50b0xvd2VyQ2FzZSgpPT1cIm1zcG9pbnRlclwiK2V9dmFyIG4saSxyLG8sYSxlPXt9LHM9NzUwO3QoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7dmFyIGQsbSx5LHcsZz0wLHY9MDtcIk1TR2VzdHVyZVwiaW4gd2luZG93JiYoYT1uZXcgTVNHZXN0dXJlLGEudGFyZ2V0PWRvY3VtZW50LmJvZHkpLHQoZG9jdW1lbnQpLmJpbmQoXCJNU0dlc3R1cmVFbmRcIixmdW5jdGlvbih0KXt2YXIgbj10LnZlbG9jaXR5WD4xP1wiUmlnaHRcIjp0LnZlbG9jaXR5WDwtMT9cIkxlZnRcIjp0LnZlbG9jaXR5WT4xP1wiRG93blwiOnQudmVsb2NpdHlZPC0xP1wiVXBcIjpudWxsO24mJihlLmVsLnRyaWdnZXIoXCJzd2lwZVwiKSxlLmVsLnRyaWdnZXIoXCJzd2lwZVwiK24pKX0pLm9uKFwidG91Y2hzdGFydCBNU1BvaW50ZXJEb3duIHBvaW50ZXJkb3duXCIsZnVuY3Rpb24oaSl7KCEodz1wKGksXCJkb3duXCIpKXx8aChpKSkmJih5PXc/aTppLnRvdWNoZXNbMF0saS50b3VjaGVzJiYxPT09aS50b3VjaGVzLmxlbmd0aCYmZS54MiYmKGUueDI9dm9pZCAwLGUueTI9dm9pZCAwKSxkPURhdGUubm93KCksbT1kLShlLmxhc3R8fGQpLGUuZWw9dChcInRhZ05hbWVcImluIHkudGFyZ2V0P3kudGFyZ2V0OnkudGFyZ2V0LnBhcmVudE5vZGUpLG4mJmNsZWFyVGltZW91dChuKSxlLngxPXkucGFnZVgsZS55MT15LnBhZ2VZLG0+MCYmMjUwPj1tJiYoZS5pc0RvdWJsZVRhcD0hMCksZS5sYXN0PWQsbz1zZXRUaW1lb3V0KGYscyksYSYmdyYmYS5hZGRQb2ludGVyKGkucG9pbnRlcklkKSl9KS5vbihcInRvdWNobW92ZSBNU1BvaW50ZXJNb3ZlIHBvaW50ZXJtb3ZlXCIsZnVuY3Rpb24odCl7KCEodz1wKHQsXCJtb3ZlXCIpKXx8aCh0KSkmJih5PXc/dDp0LnRvdWNoZXNbMF0sYygpLGUueDI9eS5wYWdlWCxlLnkyPXkucGFnZVksZys9TWF0aC5hYnMoZS54MS1lLngyKSx2Kz1NYXRoLmFicyhlLnkxLWUueTIpKX0pLm9uKFwidG91Y2hlbmQgTVNQb2ludGVyVXAgcG9pbnRlcnVwXCIsZnVuY3Rpb24obyl7KCEodz1wKG8sXCJ1cFwiKSl8fGgobykpJiYoYygpLGUueDImJk1hdGguYWJzKGUueDEtZS54Mik+MzB8fGUueTImJk1hdGguYWJzKGUueTEtZS55Mik+MzA/cj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZS5lbC50cmlnZ2VyKFwic3dpcGVcIiksZS5lbC50cmlnZ2VyKFwic3dpcGVcIit1KGUueDEsZS54MixlLnkxLGUueTIpKSxlPXt9fSwwKTpcImxhc3RcImluIGUmJigzMD5nJiYzMD52P2k9c2V0VGltZW91dChmdW5jdGlvbigpe3ZhciBpPXQuRXZlbnQoXCJ0YXBcIik7aS5jYW5jZWxUb3VjaD1sLGUuZWwudHJpZ2dlcihpKSxlLmlzRG91YmxlVGFwPyhlLmVsJiZlLmVsLnRyaWdnZXIoXCJkb3VibGVUYXBcIiksZT17fSk6bj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bj1udWxsLGUuZWwmJmUuZWwudHJpZ2dlcihcInNpbmdsZVRhcFwiKSxlPXt9fSwyNTApfSwwKTplPXt9KSxnPXY9MCl9KS5vbihcInRvdWNoY2FuY2VsIE1TUG9pbnRlckNhbmNlbCBwb2ludGVyY2FuY2VsXCIsbCksdCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsbCl9KSxbXCJzd2lwZVwiLFwic3dpcGVMZWZ0XCIsXCJzd2lwZVJpZ2h0XCIsXCJzd2lwZVVwXCIsXCJzd2lwZURvd25cIixcImRvdWJsZVRhcFwiLFwidGFwXCIsXCJzaW5nbGVUYXBcIixcImxvbmdUYXBcIl0uZm9yRWFjaChmdW5jdGlvbihlKXt0LmZuW2VdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLm9uKGUsdCl9fSl9KFplcHRvKSxmdW5jdGlvbih0KXtmdW5jdGlvbiByKGUpe3JldHVybiBlPXQoZSksISghZS53aWR0aCgpJiYhZS5oZWlnaHQoKSkmJlwibm9uZVwiIT09ZS5jc3MoXCJkaXNwbGF5XCIpfWZ1bmN0aW9uIGYodCxlKXt0PXQucmVwbGFjZSgvPSNcXF0vZywnPVwiI1wiXScpO3ZhciBuLGkscj1zLmV4ZWModCk7aWYociYmclsyXWluIG8mJihuPW9bclsyXV0saT1yWzNdLHQ9clsxXSxpKSl7dmFyIGE9TnVtYmVyKGkpO2k9aXNOYU4oYSk/aS5yZXBsYWNlKC9eW1wiJ118W1wiJ10kL2csXCJcIik6YX1yZXR1cm4gZSh0LG4saSl9dmFyIGU9dC56ZXB0byxuPWUucXNhLGk9ZS5tYXRjaGVzLG89dC5leHByW1wiOlwiXT17dmlzaWJsZTpmdW5jdGlvbigpe3JldHVybiByKHRoaXMpP3RoaXM6dm9pZCAwfSxoaWRkZW46ZnVuY3Rpb24oKXtyZXR1cm4gcih0aGlzKT92b2lkIDA6dGhpc30sc2VsZWN0ZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zZWxlY3RlZD90aGlzOnZvaWQgMH0sY2hlY2tlZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNoZWNrZWQ/dGhpczp2b2lkIDB9LHBhcmVudDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnBhcmVudE5vZGV9LGZpcnN0OmZ1bmN0aW9uKHQpe3JldHVybiAwPT09dD90aGlzOnZvaWQgMH0sbGFzdDpmdW5jdGlvbih0LGUpe3JldHVybiB0PT09ZS5sZW5ndGgtMT90aGlzOnZvaWQgMH0sZXE6ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0PT09bj90aGlzOnZvaWQgMH0sY29udGFpbnM6ZnVuY3Rpb24oZSxuLGkpe3JldHVybiB0KHRoaXMpLnRleHQoKS5pbmRleE9mKGkpPi0xP3RoaXM6dm9pZCAwfSxoYXM6ZnVuY3Rpb24odCxuLGkpe3JldHVybiBlLnFzYSh0aGlzLGkpLmxlbmd0aD90aGlzOnZvaWQgMH19LHM9bmV3IFJlZ0V4cChcIiguKik6KFxcXFx3KykoPzpcXFxcKChbXildKylcXFxcKSk/JFxcXFxzKlwiKSxhPS9eXFxzKj4vLHU9XCJaZXB0b1wiKyArbmV3IERhdGU7ZS5xc2E9ZnVuY3Rpb24oaSxyKXtyZXR1cm4gZihyLGZ1bmN0aW9uKG8scyxmKXt0cnl7dmFyIGM7IW8mJnM/bz1cIipcIjphLnRlc3QobykmJihjPXQoaSkuYWRkQ2xhc3ModSksbz1cIi5cIit1K1wiIFwiK28pO3ZhciBsPW4oaSxvKX1jYXRjaChoKXt0aHJvdyBjb25zb2xlLmVycm9yKFwiZXJyb3IgcGVyZm9ybWluZyBzZWxlY3RvcjogJW9cIixyKSxofWZpbmFsbHl7YyYmYy5yZW1vdmVDbGFzcyh1KX1yZXR1cm4gcz9lLnVuaXEodC5tYXAobCxmdW5jdGlvbih0LGUpe3JldHVybiBzLmNhbGwodCxlLGwsZil9KSk6bH0pfSxlLm1hdGNoZXM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZihlLGZ1bmN0aW9uKGUsbixyKXtyZXR1cm4hKGUmJiFpKHQsZSl8fG4mJm4uY2FsbCh0LG51bGwscikhPT10KX0pfX0oWmVwdG8pLGZ1bmN0aW9uKCl7dHJ5e2dldENvbXB1dGVkU3R5bGUodm9pZCAwKX1jYXRjaCh0KXt2YXIgZT1nZXRDb21wdXRlZFN0eWxlO3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm4gZSh0KX1jYXRjaChuKXtyZXR1cm4gbnVsbH19fX0oKTtcbm1vZHVsZS5leHBvcnRzID0gWmVwdG87XG4iXX0=
