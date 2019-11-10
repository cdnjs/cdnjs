(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["FlipMove"] = factory(require("react"), require("react-dom"));
	else
		root["FlipMove"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_24__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * React Flip Move
	 * (c) 2016-present Joshua Comeau
	 */
	module.exports = __webpack_require__(5);

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.6 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

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
	 * Checks if `value` is likely an `arguments` object.
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
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null &&
	    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

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
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
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
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isArguments;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isArguments = __webpack_require__(1),
	    isArray = __webpack_require__(2);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
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
	    (isArray(object) || isArguments(object)) && length) || 0;

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

	module.exports = keysIn;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(9);

	var _propConverter = __webpack_require__(10);

	var _propConverter2 = _interopRequireDefault(_propConverter);

	var _domManipulation = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React Flip Move
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * (c) 2016-present Joshua Comeau
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * For information on how this code is laid out, check out CODE_TOUR.md
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	/* eslint-disable react/prop-types */

	var transitionEnd = (0, _domManipulation.whichTransitionEvent)();
	var noBrowserSupport = !transitionEnd;

	var FlipMove = function (_Component) {
	  _inherits(FlipMove, _Component);

	  function FlipMove(props) {
	    _classCallCheck(this, FlipMove);

	    // FlipMove needs to know quite a bit about its children in order to do
	    // its job. We store these as a property on the instance. We're not using
	    // state, because we don't want changes to trigger re-renders, we just
	    // need a place to keep the data for reference, when changes happen.

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FlipMove).call(this, props));

	    _this.childrenData = {
	      /* Populated via callback refs on render. eg
	      userSpecifiedKey1: {
	        domNode: <domNode>,
	        boundingBox: { top, left, right, bottom, width, height },
	      },
	      userSpecifiedKey2: { ... },
	      ...
	      */
	    };

	    // Similarly, track the dom node and box of our parent element.
	    _this.parentData = {
	      domNode: null,
	      boundingBox: null
	    };

	    // If `maintainContainerHeight` prop is set to true, we'll create a
	    // placeholder element which occupies space so that the parent height
	    // doesn't change when items are removed from the document flow (which
	    // happens during leave animations)
	    _this.heightPlaceholderData = {
	      domNode: null
	    };

	    // Copy props.children into state.
	    // To understand why this is important (and not an anti-pattern), consider
	    // how "leave" animations work. An item has "left" when the component
	    // receives a new set of props that do NOT contain the item.
	    // If we just render the props as-is, the item would instantly disappear.
	    // We want to keep the item rendered for a little while, until its animation
	    // can complete. Because we cannot mutate props, we make `state` the source
	    // of truth.
	    _this.state = { children: props.children };

	    // Keep track of remaining animations so we know when to fire the
	    // all-finished callback, and clean up after ourselves.
	    // NOTE: we can't simply use childrenToAnimate.length to track remaining
	    // animations, because we need to maintain the list of animating children,
	    // to pass to the `onFinishAll` handler.
	    _this.remainingAnimations = 0;
	    _this.childrenToAnimate = [];

	    // When leaving items, we apply some over-ride styles to them (position,
	    // top, left). If the item is passed in through props BEFORE the item has
	    // finished leaving, its style will be wrong. So, to prevent any weirdness,
	    // we store the "original" styles here so they can be applied on re-entry.
	    _this.originalDomStyles = {};

	    _this.doesChildNeedToBeAnimated = _this.doesChildNeedToBeAnimated.bind(_this);
	    _this.runAnimation = _this.runAnimation.bind(_this);
	    return _this;
	  }

	  _createClass(FlipMove, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // When the component is handed new props, we need to figure out the
	      // "resting" position of all currently-rendered DOM nodes.
	      // We store that data in this.parent and this.children,
	      // so it can be used later to work out the animation.
	      this.updateBoundingBoxCaches();

	      // Next, we need to update our state, so that it contains our new set of
	      // children. If animation is disabled or unsupported, this is easy;
	      // we just copy our props into state.
	      // Assuming that we can animate, though, we have to do some work.
	      // Essentially, we want to keep just-deleted nodes in the DOM for a bit
	      // longer, so that we can animate them away.
	      var newChildren = this.isAnimationDisabled() ? this.props.children : this.calculateNextSetOfChildren(nextProps.children);

	      this.setState({ children: newChildren });
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(previousProps) {
	      // If the children have been re-arranged, moved, or added/removed,
	      // trigger the main FLIP animation.
	      //
	      // IMPORTANT: We need to make sure that the children have actually changed.
	      // At the end of the transition, we clean up nodes that need to be removed.
	      // We DON'T want this cleanup to trigger another update.
	      var shouldTriggerFLIP = this.props.children !== previousProps.children;

	      if (shouldTriggerFLIP) {
	        this.prepForAnimation();
	        this.runAnimation();
	      }
	    }
	  }, {
	    key: 'calculateNextSetOfChildren',
	    value: function calculateNextSetOfChildren(nextChildren) {
	      var _this2 = this;

	      // We want to:
	      //   - Mark all new children as `entering`
	      //   - Pull in previous children that aren't in nextChildren, and mark them
	      //     as `leaving`
	      //   - Preserve the nextChildren list order, with leaving children in their
	      //     appropriate places.
	      //

	      // Start by marking new children as 'entering'
	      var updatedChildren = nextChildren.map(function (nextChild) {
	        var child = _this2.findChildByKey(nextChild.key);

	        // If the current child did exist, but it was in the midst of leaving,
	        // we want to treat it as though it's entering
	        var isEntering = !child || child.leaving;

	        return _extends({}, nextChild, { entering: isEntering });
	      });

	      // This is tricky. We want to keep the nextChildren's ordering, but with
	      // any just-removed items maintaining their original position.
	      // eg.
	      //   this.state.children  = [ 1, 2, 3, 4 ]
	      //   nextChildren         = [ 3, 1 ]
	      //
	      // In this example, we've removed the '2' & '4'
	      // We want to end up with:  [ 2, 3, 1, 4 ]
	      //
	      // To accomplish that, we'll iterate through this.state.children. whenever
	      // we find a match, we'll append our `leaving` flag to it, and insert it
	      // into the nextChildren in its ORIGINAL position. Note that, as we keep
	      // inserting old items into the new list, the "original" position will
	      // keep incrementing.
	      var numOfChildrenLeaving = 0;
	      this.state.children.forEach(function (child, index) {
	        var isLeaving = !nextChildren.find(function (_ref) {
	          var key = _ref.key;
	          return key === child.key;
	        });

	        // If the child isn't leaving (or, if there is no leave animation),
	        // we don't need to add it into the state children.
	        if (!isLeaving || !_this2.props.leaveAnimation) return;

	        var nextChild = _extends({}, child, { leaving: true });
	        var nextChildIndex = index + numOfChildrenLeaving;

	        updatedChildren.splice(nextChildIndex, 0, nextChild);
	        numOfChildrenLeaving += 1;
	      });

	      return updatedChildren;
	    }
	  }, {
	    key: 'prepForAnimation',
	    value: function prepForAnimation() {
	      var _this3 = this;

	      // Our animation prep consists of:
	      // - remove children that are leaving from the DOM flow, so that the new
	      //   layout can be accurately calculated,
	      // - update the placeholder container height, if needed, to ensure that
	      //   the parent's height doesn't collapse.

	      var _props = this.props;
	      var leaveAnimation = _props.leaveAnimation;
	      var maintainContainerHeight = _props.maintainContainerHeight;
	      var getPosition = _props.getPosition;

	      // we need to make all leaving nodes "invisible" to the layout calculations
	      // that will take place in the next step (this.runAnimation).

	      if (leaveAnimation) {
	        var leavingChildren = this.state.children.filter(function (child) {
	          return !!child.leaving;
	        });

	        leavingChildren.forEach(function (leavingChild) {
	          var childData = _this3.childrenData[leavingChild.key];

	          // We need to take the items out of the "flow" of the document, so that
	          // its siblings can move to take its place.
	          // By setting its position to absolute and positioning it where it is,
	          // we can make it leave in-place while its siblings can calculate where
	          // they need to go.
	          // If, however, the 'leave' is interrupted and they're forced to
	          // re-enter, we want to undo this change, and the only way to do that
	          // is to preserve their current styles.
	          _this3.originalDomStyles[leavingChild.key] = {
	            position: childData.domNode.style.position,
	            top: childData.domNode.style.top,
	            left: childData.domNode.style.left,
	            right: childData.domNode.style.right
	          };

	          (0, _domManipulation.removeNodeFromDOMFlow)(childData);
	        });

	        if (maintainContainerHeight) {
	          (0, _domManipulation.updateHeightPlaceholder)({
	            domNode: this.heightPlaceholderData.domNode,
	            parentData: this.parentData,
	            getPosition: getPosition
	          });
	        }
	      }
	    }
	  }, {
	    key: 'runAnimation',
	    value: function runAnimation() {
	      var _this4 = this;

	      var dynamicChildren = this.state.children.filter(this.doesChildNeedToBeAnimated);

	      dynamicChildren.forEach(function (child, n) {
	        _this4.remainingAnimations += 1;
	        _this4.childrenToAnimate.push(child.key);
	        _this4.animateChild(child, n);
	      });

	      if (this.props.onStartAll) {
	        var _formatChildrenForHoo = this.formatChildrenForHooks();

	        var _formatChildrenForHoo2 = _slicedToArray(_formatChildrenForHoo, 2);

	        var elements = _formatChildrenForHoo2[0];
	        var domNodes = _formatChildrenForHoo2[1];

	        this.props.onStartAll(elements, domNodes);
	      }
	    }
	  }, {
	    key: 'animateChild',
	    value: function animateChild(child, index) {
	      var _this5 = this;

	      var domNode = this.childrenData[child.key].domNode;

	      // Apply the relevant style for this DOM node
	      // This is the offset from its actual DOM position.
	      // eg. if an item has been re-rendered 20px lower, we want to apply a
	      // style of 'transform: translate(-20px)', so that it appears to be where
	      // it started.
	      // In FLIP terminology, this is the 'Invert' stage.

	      (0, _domManipulation.applyStylesToDOMNode)({
	        domNode: domNode,
	        styles: this.computeInitialStyles(child)
	      });

	      // Start by invoking the onStart callback for this child.
	      if (this.props.onStart) this.props.onStart(child, domNode);

	      // Next, animate the item from it's artificially-offset position to its
	      // new, natural position.
	      requestAnimationFrame(function () {
	        requestAnimationFrame(function () {
	          // NOTE, RE: the double-requestAnimationFrame:
	          // Sadly, this is the most browser-compatible way to do this I've found.
	          // Essentially we need to set the initial styles outside of any request
	          // callbacks to avoid batching them. Then, a frame needs to pass with
	          // the styles above rendered. Then, on the second frame, we can apply
	          // our final styles to perform the animation.

	          // Our first order of business is to "undo" the styles applied in the
	          // previous frames, while also adding a `transition` property.
	          // This way, the item will smoothly transition from its old position
	          // to its new position.
	          var styles = {
	            transition: (0, _domManipulation.createTransitionString)(index, _this5.props),
	            transform: '',
	            opacity: ''
	          };

	          if (child.entering && _this5.props.enterAnimation) {
	            styles = _extends({}, styles, _this5.props.enterAnimation.to);
	          } else if (child.leaving && _this5.props.leaveAnimation) {
	            styles = _extends({}, styles, _this5.props.leaveAnimation.to);
	          }

	          // In FLIP terminology, this is the 'Play' stage.
	          (0, _domManipulation.applyStylesToDOMNode)({ domNode: domNode, styles: styles });
	        });
	      });

	      this.bindTransitionEndHandler(child);
	    }
	  }, {
	    key: 'bindTransitionEndHandler',
	    value: function bindTransitionEndHandler(child) {
	      var _this6 = this;

	      var domNode = this.childrenData[child.key].domNode;

	      // The onFinish callback needs to be bound to the transitionEnd event.
	      // We also need to unbind it when the transition completes, so this ugly
	      // inline function is required (we need it here so it closes over
	      // dependent variables `child` and `domNode`)

	      var transitionEndHandler = function transitionEndHandler(ev) {
	        // It's possible that this handler is fired not on our primary transition,
	        // but on a nested transition (eg. a hover effect). Ignore these cases.
	        if (ev.target !== domNode) return;

	        // Remove the 'transition' inline style we added. This is cleanup.
	        domNode.style.transition = '';

	        // Trigger any applicable onFinish/onFinishAll hooks
	        _this6.triggerFinishHooks(child, domNode);

	        domNode.removeEventListener(transitionEnd, transitionEndHandler);
	      };

	      domNode.addEventListener(transitionEnd, transitionEndHandler);
	    }
	  }, {
	    key: 'triggerFinishHooks',
	    value: function triggerFinishHooks(child, domNode) {
	      var _this7 = this;

	      if (this.props.onFinish) this.props.onFinish(child, domNode);

	      // Reduce the number of children we need to animate by 1,
	      // so that we can tell when all children have finished.
	      this.remainingAnimations -= 1;

	      if (this.remainingAnimations === 0) {
	        // Remove any items from the DOM that have left, and reset `entering`.
	        var nextChildren = this.state.children.filter(function (_ref2) {
	          var leaving = _ref2.leaving;
	          return !leaving;
	        }).map(function (item) {
	          return _extends({}, item, {
	            entering: false
	          });
	        });

	        this.originalDomStyles = {};

	        this.setState({ children: nextChildren }, function () {
	          if (typeof _this7.props.onFinishAll === 'function') {
	            var _formatChildrenForHoo3 = _this7.formatChildrenForHooks();

	            var _formatChildrenForHoo4 = _slicedToArray(_formatChildrenForHoo3, 2);

	            var elements = _formatChildrenForHoo4[0];
	            var domNodes = _formatChildrenForHoo4[1];

	            _this7.props.onFinishAll(elements, domNodes);

	            // Reset our variables for the next iteration
	            _this7.childrenToAnimate = [];
	          }
	        });

	        // If the placeholder was holding the container open while elements were
	        // leaving, we we can now set its height to zero.
	        if (this.heightPlaceholderData.domNode !== null) {
	          this.heightPlaceholderData.domNode.style.height = 0;
	        }
	      }
	    }
	  }, {
	    key: 'formatChildrenForHooks',
	    value: function formatChildrenForHooks() {
	      var _this8 = this;

	      var elements = [];
	      var domNodes = [];

	      this.childrenToAnimate.forEach(function (childKey) {
	        // If this was an exit animation, the child may no longer exist.
	        // If so, skip it.
	        var element = _this8.findChildByKey(childKey);

	        if (!element) {
	          return;
	        }

	        elements.push(element);
	        domNodes.push(_this8.childrenData[childKey].domNode);
	      });

	      return [elements, domNodes];
	    }
	  }, {
	    key: 'updateBoundingBoxCaches',
	    value: function updateBoundingBoxCaches() {
	      var _this9 = this;

	      // This is the ONLY place that parentData and childrenData's
	      // bounding boxes are updated. They will be calculated at other times
	      // to be compared to this value, but it's important that the cache is
	      // updated once per update.
	      this.parentData.boundingBox = this.props.getPosition(this.parentData.domNode);

	      this.props.children.forEach(function (child) {
	        // It is possible that a child does not have a `key` property;
	        // Ignore these children, they don't need to be moved.
	        if (!child.key) {
	          return;
	        }

	        _this9.childrenData[child.key].boundingBox = (0, _domManipulation.getRelativeBoundingBox)({
	          childData: _this9.childrenData[child.key],
	          parentData: _this9.parentData,
	          getPosition: _this9.props.getPosition
	        });
	      });
	    }
	  }, {
	    key: 'computeInitialStyles',
	    value: function computeInitialStyles(child) {
	      var style = { transition: '0ms' };

	      if (child.entering) {
	        if (this.props.enterAnimation) {
	          var original = this.originalDomStyles[child.key] || {};
	          style = _extends({}, style, this.props.enterAnimation.from, original);
	        }
	      } else if (child.leaving) {
	        if (this.props.leaveAnimation) {
	          style = _extends({}, style, this.props.leaveAnimation.from);
	        }
	      } else {
	        var _getPositionDelta = (0, _domManipulation.getPositionDelta)({
	          childData: this.childrenData[child.key],
	          parentData: this.parentData,
	          getPosition: this.props.getPosition
	        });

	        var _getPositionDelta2 = _slicedToArray(_getPositionDelta, 2);

	        var dX = _getPositionDelta2[0];
	        var dY = _getPositionDelta2[1];

	        style.transform = 'translate(' + dX + 'px, ' + dY + 'px)';
	      }

	      return style;
	    }
	  }, {
	    key: 'isAnimationDisabled',
	    value: function isAnimationDisabled() {
	      // If the component is explicitly passed a `disableAllAnimations` flag,
	      // we can skip this whole process. Similarly, if all of the numbers have
	      // been set to 0, there is no point in trying to animate; doing so would
	      // only cause a flicker (and the intent is probably to disable animations)
	      // We can also skip this rigamarole if there's no browser support for it.
	      return noBrowserSupport || this.props.disableAllAnimations || this.props.duration === 0 && this.props.delay === 0 && this.props.staggerDurationBy === 0 && this.props.staggerDelayBy === 0;
	    }
	  }, {
	    key: 'doesChildNeedToBeAnimated',
	    value: function doesChildNeedToBeAnimated(child) {
	      // If the child doesn't have a key, it's an immovable child (one that we
	      // do not want to do FLIP stuff to.)
	      if (!child.key) {
	        return false;
	      }

	      var _props2 = this.props;
	      var enterAnimation = _props2.enterAnimation;
	      var leaveAnimation = _props2.leaveAnimation;
	      var getPosition = _props2.getPosition;

	      var isEnteringWithAnimation = child.entering && enterAnimation;
	      var isLeavingWithAnimation = child.leaving && leaveAnimation;

	      if (isEnteringWithAnimation || isLeavingWithAnimation) {
	        return true;
	      }

	      // If it isn't entering/leaving, we want to animate it if it's
	      // on-screen position has changed.

	      var _getPositionDelta3 = (0, _domManipulation.getPositionDelta)({
	        childData: this.childrenData[child.key],
	        parentData: this.parentData,
	        getPosition: getPosition
	      });

	      var _getPositionDelta4 = _slicedToArray(_getPositionDelta3, 2);

	      var dX = _getPositionDelta4[0];
	      var dY = _getPositionDelta4[1];

	      return dX !== 0 || dY !== 0;
	    }
	  }, {
	    key: 'findChildByKey',
	    value: function findChildByKey(key) {
	      return this.state.children.find(function (child) {
	        return child.key === key;
	      });
	    }
	  }, {
	    key: 'createHeightPlaceholder',
	    value: function createHeightPlaceholder() {
	      var _this10 = this;

	      var typeName = this.props.typeName;

	      // If requested, create an invisible element at the end of the list.
	      // Its height will be modified to prevent the container from collapsing
	      // prematurely.

	      var isContainerAList = typeName === 'ul' || typeName === 'ol';
	      var placeholderType = isContainerAList ? 'li' : 'div';

	      return _react2.default.createElement(placeholderType, {
	        key: 'height-placeholder',
	        ref: function ref(domNode) {
	          _this10.heightPlaceholderData.domNode = domNode;
	        },
	        style: { visibility: 'hidden', height: 0 }
	      });
	    }
	  }, {
	    key: 'childrenWithRefs',
	    value: function childrenWithRefs() {
	      var _this11 = this;

	      // We need to clone the provided children, capturing a reference to the
	      // underlying DOM node. Flip Move needs to use the React escape hatches to
	      // be able to do its calculations.
	      return this.state.children.map(function (child) {
	        return _react2.default.cloneElement(child, {
	          ref: function ref(element) {
	            // Stateless Functional Components are not supported by FlipMove,
	            // because they don't have instances.
	            if (!element) {
	              return;
	            }

	            var domNode = (0, _domManipulation.getNativeNode)(element);

	            // If this is the first render, we need to create the data entry
	            if (!_this11.childrenData[child.key]) {
	              _this11.childrenData[child.key] = {};
	            }

	            _this11.childrenData[child.key].domNode = domNode;
	          }
	        });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this12 = this;

	      var _props3 = this.props;
	      var typeName = _props3.typeName;
	      var delegated = _props3.delegated;
	      var leaveAnimation = _props3.leaveAnimation;
	      var maintainContainerHeight = _props3.maintainContainerHeight;

	      var props = _extends({}, delegated, {
	        ref: function ref(node) {
	          _this12.parentData.domNode = node;
	        }
	      });

	      var children = this.childrenWithRefs();
	      if (leaveAnimation && maintainContainerHeight) {
	        children.push(this.createHeightPlaceholder());
	      }

	      return _react2.default.createElement(typeName, props, children);
	    }
	  }]);

	  return FlipMove;
	}(_react.Component);

	exports.default = (0, _propConverter2.default)(FlipMove);
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                   * React Flip Move
	                                                                                                                                                                                                                                                                   * (c) 2016-present Joshua Comeau
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * These methods read from and write to the DOM.
	                                                                                                                                                                                                                                                                   * They almost always have side effects, and will hopefully become the
	                                                                                                                                                                                                                                                                   * only spot in the codebase with impure functions.
	                                                                                                                                                                                                                                                                   */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createTransitionString = exports.getNativeNode = exports.updateHeightPlaceholder = exports.removeNodeFromDOMFlow = exports.getPositionDelta = exports.getRelativeBoundingBox = undefined;
	exports.applyStylesToDOMNode = applyStylesToDOMNode;
	exports.whichTransitionEvent = whichTransitionEvent;

	var _reactDom = __webpack_require__(24);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function applyStylesToDOMNode(_ref) {
	  var domNode = _ref.domNode;
	  var styles = _ref.styles;

	  // Can't just do an object merge because domNode.styles is no regular object.
	  // Need to do it this way for the engine to fire its `set` listeners.
	  Object.keys(styles).forEach(function (key) {
	    // eslint-disable-next-line no-param-reassign
	    domNode.style[key] = styles[key];
	  });
	}

	// Modified from Modernizr
	function whichTransitionEvent() {
	  var transitions = {
	    transition: 'transitionend',
	    OTransition: 'oTransitionEnd',
	    MozTransition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd'
	  };

	  // If we're running in a browserless environment (eg. SSR), it doesn't apply.
	  // Return a placeholder string, for consistent type return.
	  if (typeof document === 'undefined') return '';

	  var el = document.createElement('fakeelement');

	  var match = Object.keys(transitions).find(function (t) {
	    return el.style[t] !== undefined;
	  });

	  // If no `transition` is found, we must be running in a browser so ancient,
	  // React itself won't run. Return an empty string, for consistent type return
	  return match ? transitions[match] : '';
	}

	var getRelativeBoundingBox = exports.getRelativeBoundingBox = function getRelativeBoundingBox(_ref2) {
	  var childData = _ref2.childData;
	  var parentData = _ref2.parentData;
	  var getPosition = _ref2.getPosition;
	  var childDomNode = childData.domNode;
	  var parentDomNode = parentData.domNode;

	  var parentBox = getPosition(parentDomNode);

	  var _getPosition = getPosition(childDomNode);

	  var top = _getPosition.top;
	  var left = _getPosition.left;
	  var right = _getPosition.right;
	  var bottom = _getPosition.bottom;

	  return {
	    top: top - parentBox.top,
	    left: left - parentBox.left,
	    right: parentBox.right - right,
	    bottom: parentBox.bottom - bottom
	  };
	};

	/** getPositionDelta
	 * This method returns the delta between two bounding boxes, to figure out
	 * how mant pixels on each axis the element has moved.
	 *
	 * @param {Object} childData - needs shape { domNode, boundingBox }
	 * @param {Object} parentData - needs shape { domNode, boundingBox }
	 * @param {Function} getPosition - the function called to get bounding boxes
	 * for a DOM node. Defaults to `getBoundingClientRect`.
	 *
	 * @returns [{Number: left}, {Number: top}]
	 */
	var getPositionDelta = exports.getPositionDelta = function getPositionDelta(_ref3) {
	  var childData = _ref3.childData;
	  var parentData = _ref3.parentData;
	  var getPosition = _ref3.getPosition;

	  // TEMP: A mystery bug is sometimes causing unnecessary boundingBoxes to
	  // remain. Until this bug can be solved, this band-aid fix does the job:
	  var defaultBox = { left: 0, top: 0 };

	  var newBoundingBox = getPosition(childData.domNode);
	  var oldBoundingBox = childData.boundingBox || defaultBox;

	  var relativeBox = {
	    top: newBoundingBox.top - parentData.boundingBox.top,
	    left: newBoundingBox.left - parentData.boundingBox.left
	  };

	  return [oldBoundingBox.left - relativeBox.left, oldBoundingBox.top - relativeBox.top];
	};

	/** removeNodeFromDOMFlow
	 * This method does something very sneaky: it removes a DOM node from the
	 * document flow, but without actually changing its on-screen position.
	 *
	 * It works by calculating where the node is, and then applying styles
	 * so that it winds up being positioned absolutely, but in exactly the
	 * same place.
	 *
	 * This is a vital part of the FLIP technique.
	 *
	 * @param {Object} domNode - the node we'll be working with
	 * @param {Object} boundingBox - the node's starting position.
	 *
	 * @returns null
	 */
	var removeNodeFromDOMFlow = exports.removeNodeFromDOMFlow = function removeNodeFromDOMFlow(_ref4) {
	  var domNode = _ref4.domNode;
	  var boundingBox = _ref4.boundingBox;

	  // For this to work, we have to offset any given `margin`.
	  var computed = window.getComputedStyle(domNode);

	  // We need to clean up margins, by converting and removing suffix:
	  // eg. '21px' -> 21
	  var marginAttrs = ['margin-top', 'margin-left', 'margin-right'];
	  var margins = marginAttrs.reduce(function (acc, margin) {
	    var propertyVal = computed.getPropertyValue(margin);

	    return _extends({}, acc, _defineProperty({}, margin, Number(propertyVal.replace('px', ''))));
	  }, {});

	  var styles = {
	    position: 'absolute',
	    top: boundingBox.top - margins['margin-top'] + 'px',
	    left: boundingBox.left - margins['margin-left'] + 'px',
	    right: boundingBox.right - margins['margin-right'] + 'px'
	  };

	  applyStylesToDOMNode({ domNode: domNode, styles: styles });
	};

	/** updateHeightPlaceholder
	 * An optional property to FlipMove is a `maintainContainerHeight` boolean.
	 * This property creates a node that fills space, so that the parent
	 * container doesn't collapse when its children are removed from the
	 * document flow.
	 *
	 * @param {Object} domNode - the node we'll be working with
	 * @param {Object} parentData - needs shape { domNode, boundingBox }
	 * @param {Function} getPosition - the function called to get bounding boxes
	 * for a DOM node. Defaults to `getBoundingClientRect`.
	 *
	 * @returns null
	 */
	var updateHeightPlaceholder = exports.updateHeightPlaceholder = function updateHeightPlaceholder(_ref5) {
	  var domNode = _ref5.domNode;
	  var parentData = _ref5.parentData;
	  var getPosition = _ref5.getPosition;

	  // We need to find the height of the container *without* the placeholder.
	  // Since it's possible that the placeholder might already be present,
	  // we first set its height to 0.
	  // This allows the container to collapse down to the size of just its
	  // content (plus container padding or borders if any).
	  applyStylesToDOMNode({ domNode: domNode, styles: { height: 0 } });

	  // Find the distance by which the container would be collapsed by elements
	  // leaving. We compare the freshly-available parent height with the original,
	  // cached container height.
	  var originalParentHeight = parentData.boundingBox.height;
	  var collapsedParentHeight = getPosition(parentData.domNode).height;
	  var reductionInHeight = originalParentHeight - collapsedParentHeight;

	  // If the container has become shorter, update the padding element's
	  // height to take up the difference. Otherwise set its height to zero,
	  // so that it has no effect.
	  var styles = {
	    height: reductionInHeight > 0 ? reductionInHeight + 'px' : 0
	  };

	  applyStylesToDOMNode({ domNode: domNode, styles: styles });
	};

	var getNativeNode = exports.getNativeNode = function getNativeNode(element) {
	  // When running in a windowless environment, abort!
	  if (typeof HTMLElement !== 'undefined') {
	    return null;
	  }

	  // `element` may already be a native node.
	  if (element instanceof HTMLElement) {
	    return element;
	  }

	  // While ReactDOM's `findDOMNode` is discouraged, it's the only
	  // publicly-exposed way to find the underlying DOM node for
	  // composite components.
	  return (0, _reactDom.findDOMNode)(element);
	};

	var createTransitionString = exports.createTransitionString = function createTransitionString(index, props) {
	  var delay = props.delay;
	  var duration = props.duration;
	  var staggerDurationBy = props.staggerDurationBy;
	  var staggerDelayBy = props.staggerDelayBy;
	  var easing = props.easing;

	  delay += index * staggerDelayBy;
	  duration += index * staggerDurationBy;

	  var cssProperties = ['transform', 'opacity'];

	  return cssProperties.map(function (prop) {
	    return prop + ' ' + duration + 'ms ' + easing + ' ' + delay + 'ms';
	  }).join(', ');
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * React Flip Move | enterLeavePresets
	 * (c) 2016-present Joshua Comeau
	 *
	 * This contains the master list of presets available for enter/leave animations,
	 * along with the mapping between preset and styles.
	 */

	var enterPresets = exports.enterPresets = {
	  elevator: {
	    from: { transform: 'scale(0)', opacity: 0 },
	    to: { transform: '', opacity: '' }
	  },
	  fade: {
	    from: { opacity: 0 },
	    to: { opacity: '' }
	  },
	  accordionVertical: {
	    from: { transform: 'scaleY(0)', transformOrigin: 'center top' },
	    to: { transform: '', transformOrigin: 'center top' }
	  },
	  accordionHorizontal: {
	    from: { transform: 'scaleX(0)', transformOrigin: 'left center' },
	    to: { transform: '', transformOrigin: 'left center' }
	  },
	  none: false
	};

	var leavePresets = exports.leavePresets = {
	  elevator: {
	    from: { transform: 'scale(1)', opacity: 1 },
	    to: { transform: 'scale(0)', opacity: 0 }
	  },
	  fade: {
	    from: { opacity: 1 },
	    to: { opacity: 0 }
	  },
	  accordionVertical: {
	    from: { transform: 'scaleY(1)', transformOrigin: 'center top' },
	    to: { transform: 'scaleY(0)', transformOrigin: 'center top' }
	  },
	  accordionHorizontal: {
	    from: { transform: 'scaleX(1)', transformOrigin: 'left center' },
	    to: { transform: 'scaleX(0)', transformOrigin: 'left center' }
	  },
	  none: false
	};

	// Embarrassingly enough, v2.0 launched with typo'ed preset names.
	// To avoid penning a new major version over something so inconsequential,
	// we're supporting both spellings. In a future version, these alternatives
	// may be deprecated.
	enterPresets.accordianVertical = enterPresets.accordionVertical;
	enterPresets.accordianHorizontal = enterPresets.accordionHorizontal;
	leavePresets.accordianVertical = leavePresets.accordionVertical;
	leavePresets.accordianHorizontal = leavePresets.accordionHorizontal;

	var defaultPreset = exports.defaultPreset = 'elevator';
	var disablePreset = exports.disablePreset = 'none';

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var invalidTypeForTimingProp = exports.invalidTypeForTimingProp = function invalidTypeForTimingProp(_ref) {
	  var prop = _ref.prop;
	  var value = _ref.value;
	  var defaultValue = _ref.defaultValue;
	  return "\n>> Error, via react-flip-move <<\n\nThe prop you provided for '" + prop + "' is invalid. It needs to be a positive integer, or a string that can be resolved to a number. The value you provided is '" + value + "'.\n\nAs a result,  the default value for this parameter will be used, which is '" + defaultValue + "'.\n";
	};

	var deprecatedDisableAnimations = exports.deprecatedDisableAnimations = function deprecatedDisableAnimations() {
	  return "\n>> Warning, via react-flip-move <<\n\nThe 'disableAnimations' prop you provided is deprecated. Please switch to use 'disableAllAnimations'.\n\nThis will become a silent error in future versions of react-flip-move.\n";
	};

	var invalidEnterLeavePreset = exports.invalidEnterLeavePreset = function invalidEnterLeavePreset(_ref2) {
	  var value = _ref2.value;
	  var acceptableValues = _ref2.acceptableValues;
	  var defaultValue = _ref2.defaultValue;
	  return "\n>> Error, via react-flip-move <<\n\nThe enter/leave preset you provided is invalid. We don't currently have a '" + value + " preset.'\n\nAcceptable values are " + acceptableValues + ". The default value of '" + defaultValue + "' will be used.\n";
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * React Flip Move - Polyfills
	 * (c) 2016-present Joshua Comeau
	 */

	/* eslint-disable */

	if (!Array.prototype.find) {
	  Array.prototype.find = function (predicate) {
	    if (this === null) {
	      throw new TypeError('Array.prototype.find called on null or undefined');
	    }
	    if (typeof predicate !== 'function') {
	      throw new TypeError('predicate must be a function');
	    }
	    var list = Object(this);
	    var length = list.length >>> 0;
	    var thisArg = arguments[1];
	    var value = undefined;

	    for (var i = 0; i < length; i++) {
	      value = list[i];
	      if (predicate.call(thisArg, value, i, list)) {
	        return value;
	      }
	    }
	    return undefined;
	  };
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(22);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _errorMessages = __webpack_require__(8);

	var _enterLeavePresets = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * React Flip Move | propConverter
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * (c) 2016-present Joshua Comeau
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Abstracted away a bunch of the messy business with props.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - propTypes and defaultProps
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - Type conversion (We accept 'string' and 'number' values for duration,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     delay, and other fields, but we actually need them to be ints.)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - Children conversion (we need the children to be an array. May not always
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     be, if a single child is passed in.)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   - Resolving animation presets into their base CSS styles
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	function propConverter(ComposedComponent) {
	  var FlipMovePropConverter = function (_Component) {
	    _inherits(FlipMovePropConverter, _Component);

	    function FlipMovePropConverter() {
	      _classCallCheck(this, FlipMovePropConverter);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(FlipMovePropConverter).apply(this, arguments));
	    }

	    _createClass(FlipMovePropConverter, [{
	      key: 'convertProps',
	      value: function convertProps(props) {
	        var propTypes = FlipMovePropConverter.propTypes;
	        var defaultProps = FlipMovePropConverter.defaultProps;

	        // Create a non-immutable working copy

	        var workingProps = _extends({}, props);

	        // Do string-to-int conversion for all timing-related props
	        var timingPropNames = ['duration', 'delay', 'staggerDurationBy', 'staggerDelayBy'];

	        timingPropNames.forEach(function (prop) {
	          var rawValue = workingProps[prop];
	          var value = typeof rawValue === 'string' ? parseInt(rawValue, 10) : rawValue;

	          if (isNaN(value)) {
	            var defaultValue = defaultProps[prop];
	            var errorMessage = (0, _errorMessages.invalidTypeForTimingProp)({
	              prop: prop,
	              value: value,
	              defaultValue: defaultValue
	            });
	            console.error(errorMessage);

	            value = defaultValue;
	          }

	          workingProps[prop] = value;
	        });

	        // Convert the children to a React.Children array.
	        // This is to ensure we're always working with an array, and not
	        // an only child. There's some weirdness with this.
	        // See: https://github.com/facebook/react/pull/3650/files
	        workingProps.children = _react2.default.Children.toArray(this.props.children);

	        // Our enter/leave animations can be specified as boolean (default or
	        // disabled), string (preset name), or object (actual animation values).
	        // Let's standardize this so that they're always objects
	        workingProps.enterAnimation = this.convertAnimationProp(workingProps.enterAnimation, _enterLeavePresets.enterPresets);
	        workingProps.leaveAnimation = this.convertAnimationProp(workingProps.leaveAnimation, _enterLeavePresets.leavePresets);

	        // Accept `disableAnimations`, but add a deprecation warning
	        if (typeof props.disableAnimations !== 'undefined') {
	          console.warn((0, _errorMessages.deprecatedDisableAnimations)());
	          workingProps.disableAnimations = undefined;
	          workingProps.disableAllAnimations = props.disableAnimations;
	        }

	        // Gather any additional props;
	        // they will be delegated to the ReactElement created.
	        var primaryPropKeys = Object.keys(propTypes);
	        var delegatedProps = (0, _lodash2.default)(this.props, primaryPropKeys);

	        // The FlipMove container element needs to have a non-static position.
	        // We use `relative` by default, but it can be overridden by the user.
	        // Now that we're delegating props, we need to merge this in.
	        delegatedProps.style = _extends({
	          position: 'relative'
	        }, delegatedProps.style);

	        workingProps = (0, _lodash2.default)(workingProps, delegatedProps);
	        workingProps.delegated = delegatedProps;

	        return workingProps;
	      }

	      // eslint-disable-next-line class-methods-use-this

	    }, {
	      key: 'convertAnimationProp',
	      value: function convertAnimationProp(animation, presets) {
	        var newAnimation = undefined;

	        switch (typeof animation === 'undefined' ? 'undefined' : _typeof(animation)) {
	          case 'boolean':
	            {
	              // If it's true, we want to use the default preset.
	              // If it's false, we want to use the 'none' preset.
	              newAnimation = presets[animation ? _enterLeavePresets.defaultPreset : _enterLeavePresets.disablePreset];
	              break;
	            }

	          case 'string':
	            {
	              var presetKeys = Object.keys(presets);

	              if (presetKeys.indexOf(animation) === -1) {
	                console.error((0, _errorMessages.invalidEnterLeavePreset)({
	                  value: animation,
	                  acceptableValues: presetKeys.join(', '),
	                  defaultValue: _enterLeavePresets.defaultPreset
	                }));
	                newAnimation = presets[_enterLeavePresets.defaultPreset];
	              } else {
	                newAnimation = presets[animation];
	              }
	              break;
	            }

	          default:
	            {
	              newAnimation = animation;
	              break;
	            }
	        }

	        return newAnimation;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return _react2.default.createElement(ComposedComponent, this.convertProps(this.props));
	      }
	    }]);

	    return FlipMovePropConverter;
	  }(_react.Component);

	  FlipMovePropConverter.propTypes = {
	    children: _react.PropTypes.node,
	    easing: _react.PropTypes.string,
	    duration: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	    delay: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	    staggerDurationBy: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	    staggerDelayBy: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	    onStart: _react.PropTypes.func,
	    onFinish: _react.PropTypes.func,
	    onStartAll: _react.PropTypes.func,
	    onFinishAll: _react.PropTypes.func,
	    typeName: _react.PropTypes.string,
	    enterAnimation: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool, _react.PropTypes.shape({
	      from: _react.PropTypes.object,
	      to: _react.PropTypes.object
	    })]),
	    leaveAnimation: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool, _react.PropTypes.shape({
	      from: _react.PropTypes.object,
	      to: _react.PropTypes.object
	    })]),
	    disableAllAnimations: _react.PropTypes.bool,
	    getPosition: _react.PropTypes.func,
	    maintainContainerHeight: _react.PropTypes.bool.isRequired
	  };

	  FlipMovePropConverter.defaultProps = {
	    easing: 'ease-in-out',
	    duration: 350,
	    delay: 0,
	    staggerDurationBy: 0,
	    staggerDelayBy: 0,
	    typeName: 'div',
	    enterAnimation: _enterLeavePresets.defaultPreset,
	    leaveAnimation: _enterLeavePresets.defaultPreset,
	    disableAllAnimations: false,
	    getPosition: function getPosition(node) {
	      return node.getBoundingClientRect();
	    },
	    maintainContainerHeight: false
	  };

	  return FlipMovePropConverter;
	}

	exports.default = propConverter;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * A specialized version of `_.map` for arrays without support for callback
	 * shorthands or `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseIndexOf = __webpack_require__(15),
	    cacheIndexOf = __webpack_require__(17),
	    createCache = __webpack_require__(18);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of `_.difference` which accepts a single array
	 * of values to exclude.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values) {
	  var length = array ? array.length : 0,
	      result = [];

	  if (!length) {
	    return result;
	  }
	  var index = -1,
	      indexOf = baseIndexOf,
	      isCommon = true,
	      cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
	      valuesLength = values.length;

	  if (cache) {
	    indexOf = cacheIndexOf;
	    isCommon = false;
	    values = cache;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index];

	    if (isCommon && value === value) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === value) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (indexOf(values, value, 0) < 0) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isArguments = __webpack_require__(1),
	    isArray = __webpack_require__(2);

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

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict, result) {
	  result || (result = []);

	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, isDeep, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
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
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = baseFlatten;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

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
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = baseFor;


/***/ },
/* 15 */
/***/ function(module, exports) {

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


/***/ },
/* 16 */
/***/ function(module, exports) {

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


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
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
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = cacheIndexOf;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(19);

	/** Native method references. */
	var Set = getNative(global, 'Set');

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');

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
	function createCache(values) {
	  return (nativeCreate && Set) ? new SetCache(values) : null;
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

	// Add functions to the `Set` cache.
	SetCache.prototype.push = cachePush;

	module.exports = createCache;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

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

	module.exports = getNative;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * A specialized version of `_.pick` which picks `object` properties specified
	 * by `props`.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property names to pick.
	 * @returns {Object} Returns the new object.
	 */
	function pickByArray(object, props) {
	  object = toObject(object);

	  var index = -1,
	      length = props.length,
	      result = {};

	  while (++index < length) {
	    var key = props[index];
	    if (key in object) {
	      result[key] = object[key];
	    }
	  }
	  return result;
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

	module.exports = pickByArray;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseFor = __webpack_require__(14),
	    keysIn = __webpack_require__(3);

	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}

	/**
	 * A specialized version of `_.pick` that picks `object` properties `predicate`
	 * returns truthy for.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Object} Returns the new object.
	 */
	function pickByCallback(object, predicate) {
	  var result = {};
	  baseForIn(object, function(value, key, object) {
	    if (predicate(value, key, object)) {
	      result[key] = value;
	    }
	  });
	  return result;
	}

	module.exports = pickByCallback;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var arrayMap = __webpack_require__(11),
	    baseDifference = __webpack_require__(12),
	    baseFlatten = __webpack_require__(13),
	    bindCallback = __webpack_require__(16),
	    pickByArray = __webpack_require__(20),
	    pickByCallback = __webpack_require__(21),
	    keysIn = __webpack_require__(3),
	    restParam = __webpack_require__(23);

	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable properties of `object` that are not omitted.
	 * Property names may be specified as individual arguments or as arrays of
	 * property names. If `predicate` is provided it is invoked for each property
	 * of `object` omitting the properties `predicate` returns truthy for. The
	 * predicate is bound to `thisArg` and invoked with three arguments:
	 * (value, key, object).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {Function|...(string|string[])} [predicate] The function invoked per
	 *  iteration or property names to omit, specified as individual property
	 *  names or arrays of property names.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'user': 'fred', 'age': 40 };
	 *
	 * _.omit(object, 'age');
	 * // => { 'user': 'fred' }
	 *
	 * _.omit(object, _.isNumber);
	 * // => { 'user': 'fred' }
	 */
	var omit = restParam(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  if (typeof props[0] != 'function') {
	    var props = arrayMap(baseFlatten(props), String);
	    return pickByArray(object, baseDifference(keysIn(object), props));
	  }
	  var predicate = bindCallback(props[0], props[1], 3);
	  return pickByCallback(object, function(value, key, object) {
	    return !predicate(value, key, object);
	  });
	});

	module.exports = omit;


/***/ },
/* 23 */
/***/ function(module, exports) {

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


/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_24__;

/***/ }
/******/ ])
});
;